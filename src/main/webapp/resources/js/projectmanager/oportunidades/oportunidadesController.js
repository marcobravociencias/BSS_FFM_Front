var app = angular.module('oportunidadApp', []);

app.controller('oportunidadController', ['$scope', '$q', 'oportunidadesService', 'genericService', function ($scope, $q, oportunidadesService, genericService) {
    $("#idBody").removeAttr("style");
    $scope.showTable = true;

    var tableOportunidad;
    var tableDetalleOportunidad;
    $scope.listaOportunidades = [];
    $scope.contadorGeneral = {};
    
    $scope.consultarOportunidades = function() {
        $scope.params = {
            estatusImplementacion: "",
            numeroOportunidad: "",
            nombreCliente: "",
            fecha: ""
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
                            $scope.mostrarTablaOportunidades($scope.listaOportunidades);
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
    $scope.consultarOportunidades();

    $scope.mostrarTablaOportunidades = function(array) {
        if (tableOportunidad) {
            tableOportunidad.destroy();
        }
        let arrayRow = [];
        $scope.contadorGeneral.numOportunidad = 0;
        $scope.contadorGeneral.numCsp = 0;
        $scope.contadorGeneral.numImplementadas = 0;
        $scope.contadorGeneral.numCanceladas = 0;
        $scope.contadorGeneral.avance = 0;

        angular.forEach(array, function (elemento, index) {
            let row = [];
            row[0] = elemento.numOportunidad ? '<span onclick="mostrarDetalleOportunidad(' + "'" + index + "'" + ')" class="link_table">' + elemento.numOportunidad + '</span>' : "";
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
            row[11] = "NA";
            row[12] = "NA";
            arrayRow.push(row);

            $scope.contadorGeneral.numOportunidad++;
            $scope.contadorGeneral.numCsp = $scope.contadorGeneral.numCsp + elemento.contadores.total;
            $scope.contadorGeneral.numImplementadas = $scope.contadorGeneral.numImplementadas + elemento.contadores.implementados;
            $scope.contadorGeneral.numCanceladas = $scope.contadorGeneral.numCanceladas + elemento.contadores.cancelados;
            $scope.contadorGeneral.avance = ($scope.contadorGeneral.numCsp / 100) * $scope.contadorGeneral.numImplementadas;
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

    $scope.detalleOportunidad = [];
    mostrarDetalleOportunidad = function(index) {
        $scope.oportunidadObject = $scope.listaOportunidades[index];
        $scope.detalleOportunidad = $scope.oportunidadObject.detalleOportunidad;
        $scope.mostrarTablaDetalleOportunidad($scope.detalleOportunidad);
        $scope.showTable = false;
        $scope.$apply();
        
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
            row[0] = "NA";
            row[1] = elemento.folioCsp ? '<span class="link_table">' + elemento.folioCsp + '</span>' : "";
            row[2] = "NA";
            row[3] = "NA";
            row[4] = elemento.nombreCuentaFactura ? elemento.nombreCuentaFactura : "";
            row[5] = elemento.estatusCsp ? elemento.estatusCsp : "";
            row[6] = elemento.estatusOs ? elemento.estatusOs : "";
            row[7] = elemento.folioOs ? elemento.folioOs : "";
            row[8] = "";
            row[9] = "";
            row[10] = "";
            arrayRow.push(row);

            // $scope.contadorGeneral.numOportunidad++;
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

    angular.element(document).ready(function () {

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