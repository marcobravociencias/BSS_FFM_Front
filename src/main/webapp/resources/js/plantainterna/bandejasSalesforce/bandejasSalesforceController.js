var app = angular.module('bandejasSalesforceApp', []);
app.controller('bandejasSalesforceController', ['$scope', '$q', 'bandejasSalesforceService', 'genericService', function ($scope, $q, bandejasSalesforceService, genericService) {

    $scope.vistaSf = 0;
    $scope.nombreBandejaSf = "";
    $scope.isPendienteActivar = false;
    $scope.isPendienteAgendar = false;
    $scope.isRescataventas = false;
    let pendientesActivarTable;
    let pendientesAgendarTable;
    let rescataventasTable;
    $scope.listPendientesActivar = [];
    $scope.listRescataventas = [];
    $scope.listPendientesAgendar = [];
    $scope.listadogeografiacopy = [];
    $scope.geografiasPendienteActivar = [];
    $scope.geografiasPendienteAgendar = [];
    $scope.geografiasRescataventas = [];
    let treeAgendar;
    let treeActivar;
    let treeRescataventas;
    $scope.banderaErrorGeografia = false;

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    $scope.initBandejasSF = function () {
        $('.datepicker').datepicker({
            format: "dd/mm/yyyy",
            startView: "months",
            minViewMode: "months",
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('.datepicker').datepicker('update', new Date());
        pendientesAgendarTable = $('#tablePendientesAgendar').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
        rescataventasTable = $('#tableRescataventas').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
        pendientesActivarTable = $('#tablePendienteActivar').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
    }

    $scope.busquedaGeografiaConsultaAgendar = function () {
        $("#geografiaPendientesAgendar").jstree("search", $('#buscadorGeografiaPendienteAgendar').val());
    }

    $scope.busquedaGeografiaConsultaRescataventas = function () {
        $("#geografiaRescataventas").jstree("search", $('#buscadorGeografiaRescataventas').val());
    }

    $scope.busquedaGeografiaConsultaActivar = function () {
        $("#geografiaPendientesActivar").jstree("search", $('#buscadorGeografiaPendienteActivar').val());
    }

    $scope.btnAceptarGeografiaConsulta = function (type) {
        if (type == 'pendientesAgendar') {
            var geografias = $('#geografiaPendientesAgendar').jstree("get_selected", true);
            let textoGeografias = [];
            angular.forEach(geografias, (geografia, index) => {
                textoGeografias.push(geografia.text);
            });
            $('#txtGeografiasConsultaAgendar').val(textoGeografias);
            if (textoGeografias.length > 0) {
                $("#txtGeografiasConsultaAgendar").css("border-bottom", "2px solid #d9d9d9");
            }
        }
        if (type == 'rescataventas') {
            var geografias = $('#geografiaRescataventas').jstree("get_selected", true);
            let textoGeografias = [];
            angular.forEach(geografias, (geografia, index) => {
                textoGeografias.push(geografia.text);
            });
            $('#txtGeografiasConsultaRescataventas').val(textoGeografias);
            if (textoGeografias.length > 0) {
                $("#txtGeografiasConsultaRescataventas").css("border-bottom", "2px solid #d9d9d9");
            }
        }
        if (type == 'pendientesActivar') {
            var geografias = $('#geografiaPendientesActivar').jstree("get_selected", true);
            let textoGeografias = [];
            angular.forEach(geografias, (geografia, index) => {
                textoGeografias.push(geografia.text);
            });
            $('#txtGeografiasConsultaActivar').val(textoGeografias);
            if (textoGeografias.length > 0) {
                $("#txtGeografiasConsultaActivar").css("border-bottom", "2px solid #d9d9d9");
            }
        }
    }

    $scope.cambiarVistaSF = function (opcion) {
        if (opcion === 1) {
            $scope.nombreBandejaSf = "PENDIENTES DE AGENDAR";
            $scope.isPendienteAgendar = true;
            $scope.isRescataventas = false;
            $scope.isPendienteActivar = false;
            if (!treeAgendar) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                treeAgendar = $('#geografiaPendientesAgendar').bind('loaded.jstree', function (e, data) {
                    $scope.btnAceptarGeografiaConsulta('pendientesAgendar');
                    $scope.consultarPendientesAgendarBandejas();
                    $scope.$apply();
                    swal.close();
                }).jstree({
                    'plugins': ["wholerow", "checkbox", "search"],
                    'core': {
                        'data': $scope.geografiasPendienteAgendar,
                        'themes': {
                            'name': 'proton',
                            'responsive': true,
                            "icons": false
                        }
                    },
                    "search": {
                        "case_sensitive": false,
                        "show_only_matches": true
                    }
                });
            }
        }
        if (opcion === 2) {
            $scope.nombreBandejaSf = "RESCATAVENTAS";
            $scope.isRescataventas = true;
            $scope.isPendienteActivar = false;
            $scope.isPendienteAgendar = false;
            if (!treeRescataventas) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                treeRescataventas = $('#geografiaRescataventas').bind('loaded.jstree', function (e, data) {
                    $scope.btnAceptarGeografiaConsulta('rescataventas');
                    $scope.consultarRescataventasBandejas();
                    $scope.$apply();
                    swal.close();
                }).jstree({
                    'plugins': ["wholerow", "checkbox", "search"],
                    'core': {
                        'data': $scope.geografiasRescataventas,
                        'themes': {
                            'name': 'proton',
                            'responsive': true,
                            "icons": false
                        }
                    },
                    "search": {
                        "case_sensitive": false,
                        "show_only_matches": true
                    }
                });
            }
        }
        if (opcion === 3) {
            $scope.nombreBandejaSf = "PENDIENTES DE ACTIVAR";
            $scope.isPendienteActivar = true;
            $scope.isPendienteAgendar = false;
            $scope.isRescataventas = false;
            if (!treeActivar) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                treeActivar = $('#geografiaPendientesActivar').bind('loaded.jstree', function (e, data) {
                    $scope.btnAceptarGeografiaConsulta('pendientesActivar');
                    $scope.consultarPendientesActivarBandejas();
                    $scope.$apply();
                    swal.close();
                }).jstree({
                    'plugins': ["wholerow", "checkbox", "search"],
                    'core': {
                        'data': $scope.geografiasPendienteActivar,
                        'themes': {
                            'name': 'proton',
                            'responsive': true,
                            "icons": false
                        }
                    },
                    "search": {
                        "case_sensitive": false,
                        "show_only_matches": true
                    }
                });
            }
        }
        $scope.vistaSf = opcion;
    }

    $scope.abrirModalGeografiaConsulta = function (type) {
        if (type == 'pendientesAgendar') {
            if ($scope.geografiasPendienteAgendar !== "") {
                $("#modalCluster").modal({ backdrop: 'static', keyboard: false });
                $("#modalCluster").modal('show');
                setTimeout(function () {
                    $('#buscadorGeografiaPendienteAgendar').focus();
                }, 750);
            } else {
                toastr.info('¡Actualmente no existen geografías!');
            }
        } else if (type == 'pendientesActivar') {
            if ($scope.geografiaPendienteActivar !== "") {
                $("#modalCluster").modal({ backdrop: 'static', keyboard: false });
                $("#modalCluster").modal('show');
                setTimeout(function () {
                    $('#buscadorGeografiaPendienteActivar').focus();
                }, 750);
            } else {
                toastr.info('¡Actualmente no existen geografías!');
            }
        } else if (type == 'rescataventas') {
            if ($scope.geografiaRescataventas !== "") {
                $("#modalCluster").modal({ backdrop: 'static', keyboard: false });
                $("#modalCluster").modal('show');
                setTimeout(function () {
                    $('#buscadorGeografiaRescataventas').focus();
                }, 750);
            } else {
                toastr.info('¡Actualmente no existen geografías!');
            }
        }
    }

    function compareGeneric(a, b) {
        let niveluno = a.nivel;
        let niveldos = b.nivel;
        if (niveluno > niveldos) {
            return -1
        } else if (niveluno < niveldos) {
            return 1
        }
        return 0
    }

    $scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
        return list.sort(compareGeneric)[0].nivel
    }

    $scope.consultarFiltrosBandejasSF = function () {
        $q.all([
            bandejasSalesforceService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloBandejasSalesforce" }),
            bandejasSalesforceService.consultarCatalogoGeografia()
        ]).then(function (results) {
            console.log(results);
            let resultConf = results[0].data.result;
            if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;

                if (llavesResult.N_FILTRO_GEOGRAFIA) {
                    $scope.nfiltrogeografiaPendienteActivar = llavesResult.N_FILTRO_GEOGRAFIA;
                    $scope.nfiltrogeografiaRescataVentas = llavesResult.N_FILTRO_GEOGRAFIA;
                    $scope.nfiltrogeografiaPendienteAgendar = llavesResult.N_FILTRO_GEOGRAFIA;
                } else {
                    $scope.nfiltrogeografiaPendienteActivar = llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTES_ACTIVAR;
                    $scope.nfiltrogeografiaRescataVentas = llavesResult.N_FILTRO_GEOGRAFIA_RESCATAVENTAS;
                    $scope.nfiltrogeografiaPendienteAgendar = llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTES_AGENDAR;
                }
                validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
            }

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        if (results[1].data.result.geografia) {
                            $scope.listadogeografiacopy = angular.copy(results[1].data.result.geografia);
                            //GEOGRAFIA PENDIENTES ACTIVAR
                            $scope.nfiltrogeografiaPendienteActivar = $scope.nfiltrogeografiaPendienteActivar ? $scope.nfiltrogeografiaPendienteActivar : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.listadogeografiacopy);
                            $scope.geografiasPendienteActivar = $scope.listadogeografiacopy.filter(e => e.nivel <= parseInt($scope.nfiltrogeografiaPendienteActivar));
                            $scope.geografiasPendienteActivar.map((e) => {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: true,
                                }
                                return e
                            })

                            //GEOGRAFIA PENDIENTES AGENDAR
                            $scope.nfiltrogeografiaPendienteAgendar = $scope.nfiltrogeografiaPendienteAgendar ? $scope.nfiltrogeografiaPendienteAgendar : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.listadogeografiacopy);
                            $scope.geografiasPendienteAgendar = $scope.listadogeografiacopy.filter(e => e.nivel <= parseInt($scope.nfiltrogeografiaPendienteAgendar));
                            $scope.geografiasPendienteAgendar.map((e) => {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: true,
                                }
                                return e
                            })

                            //GEOGRAFIA RESCATAVENTAS
                            $scope.nfiltrogeografiaRescataVentas = $scope.nfiltrogeografiaRescataVentas ? $scope.nfiltrogeografiaRescataVentas : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.listadogeografiacopy);
                            $scope.geografiasRescataventas = $scope.listadogeografiacopy.filter(e => e.nivel <= parseInt($scope.nfiltrogeografiaRescataVentas));
                            $scope.geografiasRescataventas.map((e) => {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: true,
                                }
                                return e
                            })

                            $scope.cambiarVistaSF(1);
                            $("#idBody").removeAttr("style");
                            swal.close();
                        } else {
                            mostrarMensajeWarningValidacion('<li>No se encontraron datos para la geograf&iacute;a</li>Va');
                            $scope.banderaErrorGeografia = true;
                            swal.close();
                        }
                    } else {
                        mostrarMensajeWarningValidacion('<li>No se encontraron datos para la geograf&iacute;a</li>');
                        $scope.banderaErrorGeografia = true;
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarningValidacion('<li>' + results[1].data.resultDescripcion + '</li>');
                    $scope.banderaErrorGeografia = true;
                    swal.close();
                }
            } else {
                mostrarMensajeWarningValidacion('<li>Ha ocurrido un error en la consulta de geograf&iacute;a</li>');
                $scope.banderaErrorGeografia = true;
                swal.close();
            }
        });
    }

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        var startDate = moment([fechaPrueba[2], fechaPrueba[1] - 1]);
        var endDate = moment(startDate).endOf('month');
        return { fechaInicio: startDate.format('YYYY-MM-DD'), fechaFin: endDate.format('YYYY-MM-DD') };
    }

    $scope.consultarPendientesAgendarBandejas = function () {
        let isValid = true;
        let mensajeError = '';

        let clustersSelected = $("#geografiaPendientesAgendar").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaPendienteAgendar)
            .map(e => e.text)

        if (clustersSelected.length == 0) {
            mensajeError += "<li>Selecciona geograf\u00EDa</li>";
            isValid = false;
        }

        if (isValid) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            let paramsfecha = $scope.getFechaFormato(document.getElementById('fecha_pendientes_agendar').value);
            let params = {
                "geografias": clustersSelected,
                "fechaInicio": paramsfecha.fechaInicio,
                "fechaFin": paramsfecha.fechaFin
            }
            // console.log(params);
            swal.close();
            bandejasSalesforceService.consultarPendientesAgendarBandejasSF(params).then(function success(response) {
                console.log(response);
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado.length) {
                                let arrayAgendarRow = [];
                                if (pendientesAgendarTable) {
                                    pendientesAgendarTable.destroy();
                                }
                                $scope.listPendientesAgendar = angular.copy(response.data.result.resultado);
                                $.each($scope.listPendientesAgendar, function (i, elemento) {
                                    let rowAg = [];
                                    rowAg[0] = elemento.name == null ? 'Sin informaci&oacute;n' : elemento.name !== undefined ? elemento.name : 'Sin informaci&oacute;n';
                                    rowAg[1] = elemento.cotSitio.nombreCotSitio == null ? 'Sin informaci&oacute;n' : elemento.cotSitio.nombreCotSitio !== undefined ? elemento.cotSitio.nombreCotSitio : 'Sin informaci&oacute;n';
                                    rowAg[2] = elemento.cotizacion.cotizacion == null ? 'Sin informaci&oacute;n' : elemento.cotizacion.cotizacion !== undefined ? elemento.cotizacion.cotizacion : 'Sin informaci&oacute;n';
                                    rowAg[3] = elemento.cuentaFacturaSf.nombreCuentaFactura == null ? 'Sin informaci&oacute;n' : elemento.cuentaFacturaSf.nombreCuentaFactura !== undefined ? elemento.cuentaFacturaSf.nombreCuentaFactura : 'Sin informaci&oacute;n';
                                    rowAg[4] = elemento.dpPlan.nameDpPlan == null ? 'Sin informaci&oacute;n' : elemento.dpPlan.nameDpPlan !== undefined ? elemento.dpPlan.nameDpPlan : 'Sin informaci&oacute;n';
                                    rowAg[5] = elemento.cuadrillaFfm == null ? 'Sin informaci&oacute;n' : elemento.cuadrillaFfm !== undefined ? elemento.cuadrillaFfm : 'Sin informaci&oacute;n';
                                    rowAg[6] = elemento.cluster == null ? 'Sin informaci&oacute;n' : elemento.cluster !== undefined ? elemento.cluster : 'Sin informaci&oacute;n';
                                    rowAg[7] = elemento.ordenServicio == null ? 'Sin informaci&oacute;n' : elemento.ordenServicio !== undefined ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    rowAg[8] = elemento.estatusOs == null ? 'Sin informaci&oacute;n' : elemento.estatusOs !== undefined ? elemento.estatusOs : 'Sin informaci&oacute;n';
                                    rowAg[9] = elemento.fechaCreacion == null ? 'Sin informaci&oacute;n' : elemento.fechaCreacion !== undefined ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    rowAg[10] = "";
                                    arrayAgendarRow.push(rowAg);
                                });
                                pendientesAgendarTable = $('#tablePendientesAgendar').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "ordering": false,
                                    "pageLength": 10,
                                    "info": true,
                                    "data": arrayAgendarRow,
                                    "autoWidth": true,
                                    "language": idioma_espanol_not_font,
                                });
                                swal.close();
                            } else {
                                mostrarMensajeInformativo("No se encontraron Pendientes de Agendar");
                                swal.close();
                            }
                        } else {
                            mostrarMensajeErrorAlert(response.data.resultDescripcion);
                            swal.close();
                        }
                    } else {
                        mostrarMensajeInformativo("No se encontraron Pendientes de Agendar");
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.consultarRescataventasBandejas = function () {
        let isValid = true;
        let mensajeError = '';

        let clustersSelected = $("#geografiaRescataventas").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaPendienteAgendar)
            .map(e => e.text)

        if (clustersSelected.length == 0) {
            mensajeError += "<li>Selecciona geograf\u00EDa</li>";
            isValid = false;
        }

        if (isValid) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            let params = {
                "geografias": clustersSelected,
            }
            // console.log(params);
            bandejasSalesforceService.consultarRescataventasBandejasSF(params).then(function success(response) {
                console.log(response);
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado.length) {
                                let arrayResRow = [];
                                if (rescataventasTable) {
                                    rescataventasTable.destroy();
                                }
                                $scope.listRescataventas = angular.copy(response.data.result.resultado);
                                $.each($scope.listRescataventas, function (i, elemento) {
                                    let rowRes = [];
                                    rowRes[0] = elemento.nombreCsp == null ? 'Sin informaci&oacute;n' : elemento.nombreCsp !== undefined ? elemento.nombreCsp : 'Sin informaci&oacute;n';
                                    rowRes[1] = elemento.cotSitio.nombreCotSitio == null ? 'Sin informaci&oacute;n' : elemento.cotSitio.nombreCotSitio !== undefined ? elemento.cotSitio.nombreCotSitio : 'Sin informaci&oacute;n';
                                    rowRes[2] = elemento.cotizacion.cotizacion == null ? 'Sin informaci&oacute;n' : elemento.cotizacion.cotizacion !== undefined ? elemento.cotizacion.cotizacion : 'Sin informaci&oacute;n';
                                    rowRes[3] = elemento.cuentaFacturaSf.nombreCuentaFactura == null ? 'Sin informaci&oacute;n' : elemento.cuentaFacturaSf.nombreCuentaFactura !== undefined ? elemento.cuentaFacturaSf.nombreCuentaFactura : 'Sin informaci&oacute;n';
                                    rowRes[4] = elemento.dpPlan.nameDpPlan == null ? 'Sin informaci&oacute;n' : elemento.dpPlan.nameDpPlan !== undefined ? elemento.dpPlan.nameDpPlan : 'Sin informaci&oacute;n';
                                    rowRes[5] = elemento.plaza == null ? 'Sin informaci&oacute;n' : elemento.plaza !== undefined ? elemento.plaza : 'Sin informaci&oacute;n';
                                    rowRes[6] = elemento.cluster == null ? 'Sin informaci&oacute;n' : elemento.cluster !== undefined ? elemento.cluster : 'Sin informaci&oacute;n';
                                    rowRes[7] = elemento.ordenServicio.nombreOrdenServicio == null ? 'Sin informaci&oacute;n' : elemento.ordenServicio.nombreOrdenServicio !== undefined ? elemento.ordenServicio.nombreOrdenServicio : 'Sin informaci&oacute;n';
                                    rowRes[8] = elemento.estatusOs == null ? 'Sin informaci&oacute;n' : elemento.estatusOs !== undefined ? elemento.estatusOs : 'Sin informaci&oacute;n';
                                    rowRes[9] = elemento.fechaCreacion == null ? 'Sin informaci&oacute;n' : elemento.fechaCreacion !== undefined ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    // rowRes[10] = "";
                                    arrayResRow.push(rowRes);
                                });
                                rescataventasTable = $('#tableRescataventas').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "ordering": false,
                                    "pageLength": 10,
                                    "info": true,
                                    "data": arrayResRow,
                                    "autoWidth": true,
                                    "language": idioma_espanol_not_font,
                                });
                                swal.close();
                            } else {
                                mostrarMensajeInformativo("No se encontraron Rescataventas");
                                swal.close();
                            }
                        } else {
                            mostrarMensajeErrorAlert(response.data.resultDescripcion);
                            swal.close();
                        }
                    } else {
                        mostrarMensajeInformativo("No se encontraron Rescataventas");
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.consultarPendientesActivarBandejas = function () {
        let isValid = true;
        let mensajeError = '';

        let clustersSelected = $("#geografiaPendientesActivar").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaPendienteActivar)
            .map(e => e.text)

        if (clustersSelected.length == 0) {
            mensajeError += "<li>Selecciona geograf\u00EDa</li>";
            isValid = false;
        }

        if (isValid) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();

            let paramsFecha = $scope.getFechaFormato(document.getElementById('fecha_pendiente_activar').value);
            let params = {
                'geografias': clustersSelected,
                'fechaInicio': paramsFecha.fechaInicio,
                'fechaFin': paramsFecha.fechaFin
            };
            // console.log(params);
            bandejasSalesforceService.consultarPendientesActivarBandejasSF(params).then(function success(response) {
                console.log(response);
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado.length) {
                                let arrayRow = [];
                                if (pendientesActivarTable) {
                                    pendientesActivarTable.destroy();
                                }
                                $scope.listPendientesActivar = angular.copy(response.data.result.resultado);
                                $.each($scope.listPendientesActivar, function (i, elemento) {
                                    let row = [];
                                    row[0] = elemento.nombreCsp == null ? 'Sin informaci&oacute;n' : elemento.nombreCsp !== undefined ? elemento.nombreCsp : 'Sin informaci&oacute;n';
                                    row[1] = elemento.cotSitio.nombreCotSitio == null ? 'Sin informaci&oacute;n' : elemento.cotSitio.nombreCotSitio !== undefined ? elemento.cotSitio.nombreCotSitio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.cotizacion.cotizacion == null ? 'Sin informaci&oacute;n' : elemento.cotizacion.cotizacion !== undefined ? elemento.cotizacion.cotizacion : 'Sin informaci&oacute;n';
                                    row[3] = elemento.cuentaFacturaSf.nombreCuentaFactura == null ? 'Sin informaci&oacute;n' : elemento.cuentaFacturaSf.nombreCuentaFactura !== undefined ? elemento.cuentaFacturaSf.nombreCuentaFactura : 'Sin informaci&oacute;n';
                                    row[4] = elemento.cuentaFacturaNumero == null ? 'Sin informaci&oacute;n' : elemento.cuentaFacturaNumero !== undefined ? elemento.cuentaFacturaNumero : 'Sin informaci&oacute;n';
                                    row[5] = elemento.dpPlan.nameDpPlan == null ? 'Sin informaci&oacute;n' : elemento.dpPlan.nameDpPlan !== undefined ? elemento.dpPlan.nameDpPlan : 'Sin informaci&oacute;n';
                                    row[6] = elemento.plaza == null ? 'Sin informaci&oacute;n' : elemento.plaza !== undefined ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[7] = elemento.cluster == null ? 'Sin informaci&oacute;n' : elemento.cluster !== undefined ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[8] = elemento.ordenServicio.nombreOrdenServicio == null ? 'Sin informaci&oacute;n' : elemento.ordenServicio.nombreOrdenServicio !== undefined ? elemento.ordenServicio.nombreOrdenServicio : 'Sin informaci&oacute;n';
                                    row[9] = elemento.estatusOs == null ? 'Sin informaci&oacute;n' : elemento.estatusOs !== undefined ? elemento.estatusOs : 'Sin informaci&oacute;n';
                                    row[10] = elemento.fechaCreacion == null ? 'Sin informaci&oacute;n' : elemento.fechaCreacion !== undefined ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    // row[11] = "";
                                    arrayRow.push(row);
                                });
                                pendientesActivarTable = $('#tablePendienteActivar').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "ordering": false,
                                    "pageLength": 10,
                                    "info": true,
                                    "data": arrayRow,
                                    "autoWidth": true,
                                    "language": idioma_espanol_not_font,
                                });
                                swal.close();
                            } else {
                                mostrarMensajeInformativo("No se encontraron Pendientes a Activar");
                                swal.close();
                            }
                        } else {
                            mostrarMensajeErrorAlert(response.data.resultDescripcion);
                            swal.close();
                        }
                    } else {
                        mostrarMensajeInformativo("No se encontraron Pendientes a Activar");
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    angular.element(document).ready(function () {
        $('#moduloCoordInst').addClass('active');
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
        $scope.initBandejasSF();
        $scope.consultarFiltrosBandejasSF();
    });
}]);