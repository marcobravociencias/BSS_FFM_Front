var app = angular.module('oportunidadApp', []);

app.controller('oportunidadController', ['$scope', '$q', 'oportunidadesService', 'genericService', 'busquedaSalesforceService', function ($scope, $q, oportunidadesService, genericService, busquedaSalesforceService) {
    app.busquedaSalesforce($scope, busquedaSalesforceService)
    $("#idBody").removeAttr("style");
    $scope.showTable = true;

    var tableOportunidad;
    var tableDetalleOportunidad;

    $scope.listaOportunidades = [];
    
    $scope.contadorGeneral = {};
    $scope.camposFiltro = {};

    $scope.initOportunidades = function() {

        $('#fecha_oportunidad').datepicker({
            format: "dd/mm/yyyy",
            startView: "months", 
            minViewMode: "months"
        });
        $('#fecha_oportunidad').datepicker('update', new Date());

        tableOportunidad = $('#oportunidadTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });

        $q.all([
            genericService.consultarConfiguracionDespachoDespacho({ moduloAccionesUsuario: 'moduloOportunidades' })
        ]).then(function(results) {
            $scope.configPermisoAccionConsultaOportunidad = true;
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $scope.elementosConfigGeneral = new Map(Object.entries(results[0].data.result))
                        let resultConf = results[0].data.result;
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            let permisosResult = results[0].data.result.MODULO_ACCIONES_USUARIO;

                            // $scope.nGeografia = parseInt(llavesResult.N_FILTRO_GEOGRAFIA_GESTION_TICKETS)
                            // $scope.nIntervencion = parseInt(llavesResult.N_FILTRO_TIPO_ORDEN_GESTION_TICKETS)
                            // $scope.nPuestoIngeniero = llavesResult.N_PUESTO_INGENIERO ? parseInt(llavesResult.N_PUESTO_INGENIERO) : 1;
                            // $scope.nGeografiaConsultaTickets = llavesResult.N_FILTRO_GEOGRAFIA_CONSULTA;
                            // $scope.nGeografiaConsultaUsuario = llavesResult.N_FILTRO_GEOGRAFIA_TIPO_USUARIO;

                            if (permisosResult != undefined && permisosResult.permisos != undefined && permisosResult.permisos.length > 0) {
                                $scope.configPermisoAccionConsultaOportunidad = (permisosResult.permisos.filter(e => { return e.clave == "accionConsultaOportunidades" })[0] != undefined);
                            }
                        }
                        
                    }
                }
                if ($scope.configPermisoAccionConsultaOportunidad) {
                    $scope.consultarOportunidades();
                }
            }
        })
    }
    
    $scope.consultarOportunidades = function() {
        $scope.params = {
            numeroOportunidad: $scope.camposFiltro.oportunidad ? $scope.camposFiltro.oportunidad : "",
            nombreCliente: $scope.camposFiltro.nombreCliente ? $scope.camposFiltro.nombreCliente : "",
            fechaInicio: moment($("#fecha_oportunidad").val(), 'DD/MM/YYYY').startOf('month').format('YYYY-MM-DD'),
            fechaFin: moment($("#fecha_oportunidad").val(), 'DD/MM/YYYY').endOf('month').format('YYYY-MM-DD')
        };
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		oportunidadesService.consultarOportunidades($scope.params).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.oportunidades) {
                            $scope.listaOportunidades = response.data.result.oportunidades;

                            $scope.contadorGeneral = {};
                            $scope.contadorGeneral.numOportunidad = 0;
                            $scope.contadorGeneral.numCsp = 0;
                            $scope.contadorGeneral.numImplementadas = 0;
                            $scope.contadorGeneral.numCanceladas = 0;
                            $scope.contadorGeneral.avance = 0;

                            angular.forEach($scope.listaOportunidades, function (elemento, index) {
                                $scope.contadorGeneral.numOportunidad++;
                                $scope.contadorGeneral.numCsp = $scope.contadorGeneral.numCsp + elemento.contadores.total;
                                $scope.contadorGeneral.numImplementadas = $scope.contadorGeneral.numImplementadas + elemento.contadores.implementados;
                                $scope.contadorGeneral.numCanceladas = $scope.contadorGeneral.numCanceladas + elemento.contadores.cancelados;
                                $scope.contadorGeneral.avance = (100 / $scope.contadorGeneral.numCsp) * $scope.contadorGeneral.numImplementadas;
                            });

                            $scope.mostrarTablaOportunidades($scope.listaOportunidades);
                        } else {
                            $scope.listaOportunidades = [];
                            $scope.contadorGeneral = {};
                            $scope.mostrarTablaOportunidades([]);
                        }
                        swal.close();
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.result.mensaje)
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			} else {
				swal.close();
				mostrarMensajeErrorAlert("Error del servidor");
			}
		}).catch(err => handleError(err));
    }

    $scope.mostrarTablaOportunidades = function(array) {
        if (tableOportunidad) {
            tableOportunidad.destroy();
        }
        let arrayRow = [];

        angular.forEach(array, function (elemento, index) {
            let row = [];
            row[0] = elemento.numOportunidad ? '<span onclick="consultarDetalleObjectosSF(' + "'" + elemento.idOportunidad + "','OP'" + ')" class="link_table">' + elemento.numOportunidad + '</span>' : "";
            row[1] = elemento.nombreCliente ? elemento.nombreCliente : "";
            row[2] = elemento.eimAsignado ? elemento.eimAsignado : "";
            row[3] = elemento.fechaCierre ? elemento.fechaCierre : "";
            row[4] = "NA";
            row[5] = elemento.contadores.total;
            row[6] = elemento.contadores.implementados;
            row[7] = elemento.contadores.cancelados;
            row[8] = elemento.contadores.avance;
            row[9] = elemento.contadores.residencial;
            row[10] = elemento.contadores.empresarial;
            row[11] = '<input type="checkbox">';
            row[12] = '<input type="checkbox">';
            row[13] = '<div class="tooltip-btn"> <span onclick="mostrarListaCspOportunidad(' + "'" + elemento.numOportunidad + "'," + "'" + index + "'" + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><th><i class="icono_cons_bg fa fa-bars" aria-hidden="true"></i></th></span></div>';
            arrayRow.push(row);
        });
        tableOportunidad = $('#oportunidadTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });
        swal.close();
    }

    $scope.filtrarOportunidades = function(opcion) {
        $scope.listaFiltro = [];
        switch (opcion) {
            case 1:
                $scope.mostrarTablaOportunidades($scope.listaOportunidades);
                break;
            case 2:
                $scope.listaFiltro = $scope.listaOportunidades.filter(e => { return e.contadores.total !== 0 });
                $scope.mostrarTablaOportunidades($scope.listaFiltro);
                break;
            case 3:
                $scope.listaFiltro = $scope.listaOportunidades.filter(e => { return e.contadores.implementados !== 0 });
                $scope.mostrarTablaOportunidades($scope.listaFiltro);
                break;
            case 4:
                $scope.listaFiltro = $scope.listaOportunidades.filter(e => { return e.contadores.cancelados !== 0 });
                $scope.mostrarTablaOportunidades($scope.listaFiltro);
                break;
            
            default:
                break;
        }
    }

    $scope.detalleOportunidad = [];
    mostrarListaCspOportunidad = function(oportunidad, index) {
        $scope.objectOportunidad = $scope.listaOportunidades[index];
        $scope.params = {
            oportunidad: oportunidad
        }
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		oportunidadesService.consultarDetalleOportunidad($scope.params).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.detalleOportunidad) {
                            $scope.detalleOportunidad = response.data.result.detalleOportunidad;
                            $scope.contadorDetalleOportunidad = {};
                            $scope.mostrarTablaDetalleOportunidad($scope.detalleOportunidad);
                            $scope.showTable = false;
                        } else {
                            
                        }
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.result.mensaje)
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			} else {
				swal.close();
				mostrarMensajeErrorAlert("Error del servidor");
			}
		}).catch(err => handleError(err));
    }

    $scope.contadorDetalleOportunidad = {};
    $scope.mostrarTablaDetalleOportunidad = function(array) {
        if (tableDetalleOportunidad) {
            tableDetalleOportunidad.destroy();
        }
        let arrayRow = [];
        $scope.contadorDetalleOportunidad.numCsp = 0;
        $scope.contadorDetalleOportunidad.enviadosInfra = 0;
        $scope.contadorDetalleOportunidad.recibidosInfra = 0;
        $scope.contadorDetalleOportunidad.implementados = 0;
        $scope.contadorDetalleOportunidad.calendarizados = 0;

        angular.forEach(array, function (elemento, index) {
            let row = [];
            row[0] = '<input type="checkbox">';
            row[1] = elemento.folioCsp ? '<span onclick="consultarDetalleObjectosSF(' + "'" + elemento.idCsp + "','CP'" + ')" class="link_table">' + elemento.folioCsp + '</span>' : "";
            row[2] = "NA";
            row[3] = "NA";
            row[4] = elemento.nombreCuentaFactura ? '<span onclick="consultarDetalleObjectosSF(' + "'" + elemento.idCuentaFactura + "','CF'" + ')" class="link_table">' + elemento.nombreCuentaFactura + '</span>' : "";
            row[5] = elemento.estatusCsp ? elemento.estatusCsp : "";
            row[6] = elemento.estatusOs ? elemento.estatusOs : "";
            row[7] = elemento.folioOs ? elemento.folioOs : "";
            row[8] = '<input type="checkbox">';
            row[9] = '<div class="tooltip-btn"> <span class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><th><i class="icono_cons_bg fa fa-calendar" aria-hidden="true"></i></th></span></div>';
            row[10] = '<div class="tooltip-btn"> <span class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><th><i class="icono_cons_bg fa fa-bars" aria-hidden="true"></i></th></span></div>';
            arrayRow.push(row);

            $scope.contadorDetalleOportunidad.numCsp++;
            // $scope.contadorGeneral.numCsp = $scope.contadorGeneral.numCsp + elemento.contadores.total;
            // $scope.contadorGeneral.numImplementadas = $scope.contadorGeneral.numImplementadas + elemento.contadores.implementados;
            // $scope.contadorGeneral.numCanceladas = $scope.contadorGeneral.numCanceladas + elemento.contadores.cancelados;
            // $scope.contadorGeneral.avance = ($scope.contadorGeneral.numCsp / 100) * $scope.contadorGeneral.numImplementadas;
        });
        tableDetalleOportunidad = $('#table_detalle_oportunidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });
        swal.close();
    }

    $scope.regresarPaginaPrincipal = function() {
        $scope.showTable = true;
    }

    $scope.limpiarCamposFiltro = function (opcion) {
		switch (opcion) {
			case 1:
				$scope.camposFiltro.nombreCliente = "";
				break;
			case 2:
				$scope.camposFiltro.oportunidad = "";
				break;
			default:
				break;
		}
	}

    $scope.validacionGenerica = function () {

    }

    angular.element(document).ready(function () {

        tableDetalleOportunidad = $('#table_detalle_oportunidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });

        $('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: false
		});
        $('.datepicker').datepicker('update', new Date());

        
    });


}]);