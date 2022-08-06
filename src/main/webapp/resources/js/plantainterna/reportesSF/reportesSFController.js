var app = angular.module('reportesSFApp', []);
var fecha_actual_hide_productividad ;
var updating = false;
app.controller('reportesSFController', ['$scope', '$q', 'reportesSFService', 'genericService', function ($scope, $q, reportesSFService, genericService) {
    $scope.listaGeografiaReporte = {};
    $scope.resultReporteInstalaciones = null;
    $scope.resultReporteSoportes = null;
    $scope.resultReporteAddon = null;
    $scope.resultReporteRecolecciones = null;
    $scope.tipoReporte = '';
    $scope.permisosConfigUser = {};
    $scope.listadogeografiacopy = [];
    $scope.reporte = {
        addon: 'dia',
        soportes: 'dia',
        instalaciones: 'dia',
        recolecciones: 'dia'
    };

    angular.element(document).ready(function () {
        $('#searchGeo-instalaciones').on('keyup', function () {
            $("#jstree-proton-instalaciones").jstree("search", this.value);
        });

        $('#searchGeo-soportes').on('keyup', function () {
            $("#jstree-proton-soportes").jstree("search", this.value);
        });

        $('#searchGeo-recolecciones').on('keyup', function () {
            $("#jstree-proton-recolecciones").jstree("search", this.value);
        });

        $('#searchGeo-addon').on('keyup', function () {
            $("#jstree-proton-addon").jstree("search", this.value);
        });

        $("#modalCluster").on("hidden.bs.modal", function () {
            if ($scope.tipoReporte === 'instalaciones') {
                $scope.getTextGeografia('jstree-proton-instalaciones', 'cluster-instalaciones');
            }

            if ($scope.tipoReporte === 'soportes') {
                $scope.getTextGeografia('jstree-proton-soportes', 'cluster-soportes');
            }

            if ($scope.tipoReporte === 'recolecciones') {
                $scope.getTextGeografia('jstree-proton-recolecciones', 'cluster-recolecciones');
            }

            if ($scope.tipoReporte === 'addon') {
                $scope.getTextGeografia('jstree-proton-addon', 'cluster-addon');
            }
        })
        

        let reporteInstalacionesTable = $('#reporteInstalacionesTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteSoportesTable = $('#reporteSoportesTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteRecoleccionesTable = $('#reporteRecoleccionesTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteAddonTable = $('#reporteAddonTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });
    })

    $scope.getTextGeografia = function (idJsTree, idInput) {
        var geografias = $('#' + idJsTree).jstree("get_selected", true);
        let textoGeografias = [];
        angular.forEach(geografias, (geografia, index) => {
            textoGeografias.push(geografia.text);
        });
        $('#' + idInput).val(textoGeografias);
    }

    $scope.loadDate = function(tipo){
        console.log(tipo);
        $scope.initdateSemanal(tipo);
        $scope.initDateMensual(tipo);
        $scope.initDateDia(tipo);
    }
    $scope.initdateSemanal = function (tipo) {
        $('#filtro_fecha_semana_' + tipo).datepicker({
            format: 'dd/mm/yyyy',
            autoclose: false,
            language: 'es',
            calendarWeeks: true,
            todayHighlight: true
        }).on('changeDate', function (e) {
            if (updating)
                return;
            updating = true;
            var date_selected = e.date;
            //var startOfWeek = moment(date_selected).day(1);
            //var endOfWeek = moment(date_selected).day(7);
            $(this).datepicker('clearDate');
            $(this).datepicker('setDates', [
                moment(date_selected).day(1).toDate(),
                moment(date_selected).day(2).toDate(),
                moment(date_selected).day(3).toDate(),
                moment(date_selected).day(4).toDate(),
                moment(date_selected).day(5).toDate(),
                moment(date_selected).day(6).toDate(),
                moment(date_selected).day(7).toDate()
            ]);
            updating = false;
            fecha_actual_hide_productividad = moment(date_selected).format('DD/MM/YYYY');
            $('#filtro_fecha_semana_' + tipo).val(fecha_actual_hide_productividad);
        }).on('hide', function (e) {
            if (fecha_actual_hide_productividad) {
                $('#filtro_fecha_semana_' + tipo).val(fecha_actual_hide_productividad);
            } else {
                $('#filtro_fecha_semana_' + tipo).datepicker('update', new Date());
            }
        });
        $('#filtro_fecha_semana_' + tipo).datepicker('update', new Date());

    }

    $scope.initDateMensual = function (tipo) {
        $('#filtro_fecha_mes_' + tipo).datepicker({
            format: "dd/mm/yyyy",
            startView: "months",
            minViewMode: "months"
        });
        $('#filtro_fecha_mes_' + tipo).datepicker('update', new Date());
    }

    $scope.initDateDia = function (tipo) {
        $('#filtro_fecha_dia_' + tipo).datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('#filtro_fecha_dia_' + tipo).datepicker('update', new Date());
    }

    $scope.guardarArbol = function (type) {
        let arbolActual = $("#jstree-proton-" + type).jstree("get_selected", true)
            .map(e => parseInt(e.id));

        switch (type) {
            case 'instalaciones':
                $scope.listaGeografiaReporte.instalaciones.map((e) => {
                    e.state = {
                        opened: true,
                        selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
                    }
                    return e
                });
                break;
            case 'soportes':
                $scope.listaGeografiaReporte.soportes.map((e) => {
                    e.state = {
                        opened: true,
                        selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
                    }
                    return e
                });
                break;
            case 'recolecciones':
                $scope.listaGeografiaReporte.recolecciones.map((e) => {
                    e.state = {
                        opened: true,
                        selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
                    }
                    return e
                });
                break;
            case 'addon':
                $scope.listaGeografiaReporte.addon.map((e) => {
                    e.state = {
                        opened: true,
                        selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
                    }
                    return e
                });
                break;
        }

    }

    $scope.cambiaReporte = function (type, save, tab) {
        let geografiaReporte = [];
        //Temporal
        $(".tab-pane").removeClass("active show");
        $("#" + tab).addClass("active show");

        switch (type) {
            case 'instalaciones':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.instalaciones);
                if ($scope.resultReporteInstalaciones == null && geografiaReporte) {
                    $scope.loadDate('instalaciones');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'soportes':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.soportes);
                if ($scope.resultReporteSoportes == null && geografiaReporte) {
                    $scope.loadDate('soportes');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'recolecciones':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.recolecciones);
                if ($scope.resultReporteRecolecciones == null && geografiaReporte) {
                    $scope.loadDate('recolecciones');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'addon':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.addon);
                if ($scope.resultReporteAddon == null && geografiaReporte) {
                    $scope.loadDate('addon');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
        }

        if (geografiaReporte) {

            if (save) {
                $scope.guardarArbol($scope.tipoReporte);
            }

            let isJsTree = $('#jstree-proton-' + $scope.tipoReporte).jstree('is_loaded')[0] ? true : false;
            if (!isJsTree) {
                $('#jstree-proton-' + $scope.tipoReporte).jstree('destroy');
            }
            $scope.tipoReporte = type;
            $('#jstree-proton-' + type).bind('loaded.jstree', function (e, data) {
                switch (type) {
                    case 'instalaciones':
                        $scope.getTextGeografia('jstree-proton-instalaciones', 'cluster-instalaciones');
                        if ($scope.resultReporteInstalaciones == null) {
                            $scope.consultarReporteInstalaciones();
                        }
                        break;
                    case 'soportes':
                        $scope.getTextGeografia('jstree-proton-soportes', 'cluster-soportes');
                        if ($scope.resultReporteSoportes == null) {
                            $scope.consultarReporteSoportes();
                        }
                        break;
                    case 'recolecciones':
                        $scope.getTextGeografia('jstree-proton-recolecciones', 'cluster-recolecciones');
                        if ($scope.resultReporteRecolecciones == null) {
                            $scope.consultarReporteRecolecciones();
                        }
                        break;
                    case 'addon':
                        $scope.getTextGeografia('jstree-proton-addon', 'cluster-addon');
                        if ($scope.resultReporteAddon == null) {
                            $scope.consultarReporteAddon();
                        }
                        break;
                }

            }).jstree({
                'plugins': ["wholerow", "checkbox", "search"],
                'core': {
                    'data': geografiaReporte,
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

    $scope.abrirModalGeografiaRep = function (type) {
        $("#jstree-proton-" + type).jstree("search", '');
        $("#searchGeo-" + type).val('');
        $("#modalCluster").modal('show');
        setTimeout(function () {
            $("#searchGeo-" + type).focus();
        }, 750);
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

    $scope.ordenarGeografia = function (lista, filtro) {

        let listaGeografiaTemp = lista.filter(e => e.nivel <= parseInt(filtro));
        listaGeografiaTemp.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });

        let geografia = angular.copy(listaGeografiaTemp);
        geografia.map((e) => {
            e.parent = e.padre == null ? 0 : e.padre;
            e.text = e.nombre;
            e.icon = "fa fa-globe";
            e.state = {
                opened: false,
                selected: true,
            }
            return e
        })

        return geografia
    }

    $scope.consultarCatalagosPI = function () {
        $q.all([
            genericService.consulCatalogoGeografia(),
            genericService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloReportesPI" })
        ]).then(function (results) {
            let resultConf = results[1].data.result
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[1].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            $scope.nfiltrogeografiaInstalaciones = llavesResult.N_FILTRO_GEOGRAFIA_BACKLOG ? llavesResult.N_FILTRO_GEOGRAFIA_BACKLOG : llavesResult.N_FILTRO_GEOGRAFIA_BACKLOG;
                            $scope.nfiltrogeografiaSoportes = llavesResult.N_FILTRO_GEOGRAFIA_NUEVOS ? llavesResult.N_FILTRO_GEOGRAFIA_NUEVOS : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaRecolecciones = llavesResult.N_FILTRO_GEOGRAFIA_ENPROCESO ? llavesResult.N_FILTRO_GEOGRAFIA_ENPROCESO : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaAddon = llavesResult.N_FILTRO_GEOGRAFIA_COMPLETADO ? llavesResult.N_FILTRO_GEOGRAFIA_COMPLETADO : llavesResult.N_FILTRO_GEOGRAFIA;

                            $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

                            validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                            validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;


                            let firstNav = '';

                            //if ($scope.configPermisoAccionConsultaReporteSeguimiento) {
                            //if (firstNav === '') {
                            firstNav = 'reporteInstalaciones-tab';
                            $scope.tipoReporte = 'instalaciones';
                            //}
                            //}
                            /*
                            if ($scope.configPermisoAccionConsultaReporteCierre) {
                                if (firstNav === '') {
                                    firstNav = 'soportes-tab';
                                    $scope.tipoReporte = 'soportes';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaReporteAsignadas) {
                                if (firstNav === '') {
                                    firstNav = 'recolecciones-tab';
                                    $scope.tipoReporte = 'recolecciones';
                                }
                            }
                        	
                            if ($scope.configPermisoAccionConsultaTecnicosTiposOrdenes) {
                                if (firstNav === '') {
                                    firstNav = 'addon-tab';
                                    $scope.tipoReporte = 'addon';
                                }
                            }
                            */
                            if (firstNav === '') {
                                $scope.permisosConfigUser.permisos = [];
                            }

                            //if ($scope.permisosConfigUser.permisos.length > 0) {
                            setTimeout(function () {
                                $('#' + firstNav).click();
                                $scope.cambiaReporte($scope.tipoReporte, false, firstNav.split('-'[0]));
                            }, 300)
                            //}
                        }
                    } else {
                        toastr.info('No se encontraron datos para la configuraci\u00F3n');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('No se encontraron datos para la configuraci\u00F3n');
            }

            $("#idBody").removeAttr("style");

            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        if (results[0].data.result.geografia) {
                            $scope.listadogeografiacopy = results[0].data.result.geografia;
                            $scope.nfiltrogeografiaInstalaciones = $scope.nfiltrogeografiaInstalaciones ? $scope.nfiltrogeografiaInstalaciones : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaSoportes = $scope.nfiltrogeografiaSoportes ? $scope.nfiltrogeografiaSoportes : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaRecolecciones = $scope.nfiltrogeografiaRecolecciones ? $scope.nfiltrogeografiaRecolecciones : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaAddon = $scope.nfiltrogeografiaAddon ? $scope.nfiltrogeografiaAddon : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);

                            //if ($scope.configPermisoAccionConsultaReporteSeguimiento) {
                            let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaInstalaciones);
                            $scope.listaGeografiaReporte.instalaciones = angular.copy(geografia);
                            //}

                            //if ($scope.configPermisoAccionConsultaReporteCierre) {
                            let geografia2 = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaSoportes);
                            $scope.listaGeografiaReporte.soportes = angular.copy(geografia2);
                            //}

                            //if ($scope.configPermisoAccionConsultaReporteAsignadas) {
                            let geografia3 = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaRecolecciones);
                            $scope.listaGeografiaReporte.recolecciones = angular.copy(geografia3);
                            //}

                            //if ($scope.configPermisoAccionConsultaTecnicosTiposOrdenes) {
                            let geografiaTec = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaAddon);
                            $scope.listaGeografiaReporte.addon = angular.copy(geografiaTec);
                            //}

                        } else {
                            toastr.info('No se encontraron datos para la geograf\u00EDa');
                        }
                    } else {
                        toastr.info('No se encontraron datos para la geograf\u00EDa');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de la geograf\u00EDa');
            }

        }).catch(err => handleError(err));
    }

    $scope.consultarCatalagosPI();

    $scope.getFechaFormatoValid = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }

    $scope.changeCalendar = function (data, reporte) {
        let tipo = data.reporte[reporte+""];
        switch (tipo) {
            case 'dia':
                $("#filtro_fecha_dia_" + reporte).show();
                $("#filtro_fecha_semana_" + reporte).hide();
                $("#filtro_fecha_mes_" + reporte).hide();
                break;
            case 'semana':
                $("#filtro_fecha_semana_" + reporte).show();
                $("#filtro_fecha_mes_" + reporte).hide();
                $("#filtro_fecha_dia_" + reporte).hide();
                break;
            case 'mes':
                $("#filtro_fecha_mes_" + reporte).show();
                $("#filtro_fecha_dia_" + reporte).hide();
                $("#filtro_fecha_semana_" + reporte).hide();
                break;

            default:
                break;
        }
        
    }

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        var startDate = moment([fechaPrueba[2], fechaPrueba[1] - 1]);
        var endDate = moment(startDate).endOf('month');
        return { fechaInicio: startDate.format('YYYY-MM-DD'), fechaFin: endDate.format('YYYY-MM-DD') };
    }

    $scope.getFecha = function(type){
        let fechaInicio;
        let fechaFin;
        let tipo = $("#tipo_reporte_" + type).val();
        switch (tipo) {
            case 'dia':
                fechaInicio = $scope.getFechaFormatoValid($("#filtro_fecha_dia_" + type).val())
                fechaFin = $scope.getFechaFormatoValid($("#filtro_fecha_dia_" + type).val())
                break;
            case 'semana':
                let dia = $("#filtro_fecha_semana_" + type).datepicker('getDate');
                let inicio = moment(dia).day(1).toDate();
                let fin = moment(dia).day(7).toDate();
                fechaInicio = inicio.getFullYear() + "-" +("0" + (inicio.getMonth() + 1)).slice(-2) + "-" + ("0" + inicio.getDate()).slice(-2);
                fechaFin = fin.getFullYear() + "-" + ("0" + (fin.getMonth() + 1)).slice(-2) + "-" + ("0" + fin.getDate()).slice(-2);
                break;
            case 'mes':
                let fechas = $scope.getFechaFormato($("#filtro_fecha_mes_" + type).val());
                fechaInicio = fechas.fechaInicio;
                fechaFin = fechas.fechaFin;
                break;

            default:
                break;
        }
        return {fechaInicio: fechaInicio, fechaFin: fechaFin}
    }

    $scope.consultarReporteInstalaciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalaciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstalaciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('instalaciones');
            let params = {
                tiposOrden: [48],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteInstalaciones = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.estatusOs ? elemento.estatusOs : 'Sin informaci&oacute;n';
                                    row[4] = elemento.nombreFamilia ? elemento.nombreFamilia : 'Sin informaci&oacute;n';
                                    row[5] = elemento.confirmada ? 'Si' : 'No';
                                    row[6] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[7] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[8] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    row[9] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[10] = elemento.delegacionMunicipio ? elemento.delegacionMunicipio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[12] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaModificacion ? elemento.fechaModificacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.canalVenta ? elemento.canalVenta : 'Sin informaci&oacute;n';
                                    row[16] = elemento.compania ? elemento.compania : 'Sin informaci&oacute;n';
                                    row[17] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[18] = elemento.subTipoOrden ? elemento.subTipoOrden : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteInstalacionesTable = $('#reporteInstalacionesTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [6], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.consultarReporteSoportes = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-soportes").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaSoportes)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('soportes');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteSoportes = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.ticket ? elemento.ticket : 'Sin informaci&oacute;n';
                                    row[4] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[6] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[7] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[10] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[12] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[14] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[15] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[17] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[18] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                                    row[19] = elemento.grupoCodificador ? elemento.grupoCodificador : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.repetido ? elemento.repetido : 'Sin informaci&oacute;n';
                                    row[24] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[25] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[26] = elemento.nuevoSegmento ? elemento.nuevoSegmento : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteSoportesTable = $('#reporteSoportesTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [26], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.consultarReporteRecolecciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-recolecciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaRecolecciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('recolecciones');
            let params = {
                tiposOrden: [85],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteRecolecciones = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.ticket ? elemento.ticket : 'Sin informaci&oacute;n';
                                    row[4] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[6] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[7] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[10] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[12] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[14] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[15] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[17] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[18] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                                    row[19] = elemento.grupoCodificador ? elemento.grupoCodificador : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.repetido ? elemento.repetido : 'Sin informaci&oacute;n';
                                    row[24] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[25] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[26] = elemento.nuevoSegmento ? elemento.nuevoSegmento : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteRecoleccionesTable = $('#reporteRecoleccionesTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [26], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.consultarReporteAddon = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-addon").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaAddon)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('addon');
            let params = {
                tiposOrden: [65, 130, 95, 136],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteAddon = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.ticket ? elemento.ticket : 'Sin informaci&oacute;n';
                                    row[4] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[6] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[7] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[10] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[12] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[14] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[15] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[17] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[18] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                                    row[19] = elemento.grupoCodificador ? elemento.grupoCodificador : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.repetido ? elemento.repetido : 'Sin informaci&oacute;n';
                                    row[24] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[25] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[26] = elemento.nuevoSegmento ? elemento.nuevoSegmento : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteAddonTable = $('#reporteAddonTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [26], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

}]);