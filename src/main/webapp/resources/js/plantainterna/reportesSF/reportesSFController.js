var app = angular.module('reportesSFApp', []);
var fecha_actual;
var updating = false;
var objectTempAccion;

app.controller('reportesSFController', ['$scope', '$q', 'reportesSFService', 'genericService', function ($scope, $q, reportesSFService, genericService) {
    $scope.listaGeografiaReporte = {};
    $scope.resultReporteInstalaciones = null;
    $scope.resultReporteSoportes = null;
    $scope.resultReporteAddon = null;
    $scope.resultReporteRecolecciones = null;
    $scope.resultReporteEmpresarial = null;
    $scope.resultReporteGeneral = null;
    $scope.tipoReporte = '';
    $scope.permisosConfigUser = {};
    $scope.listadogeografiacopy = [];
    $scope.weekDateObjectReport = {};
    $scope.reporte = {
        addon: 'dia',
        soportes: 'dia',
        instalaciones: 'dia',
        recolecciones: 'dia',
        empresarial: 'dia',
        general: 'dia'
    };
    $scope.filtrosGeneral = [];

    $scope.configPermisoAccionConsultaBackGeneral = false;
    $scope.configPermisoAccionDescargaBackGeneral = false;
    $scope.configPermisoAccionConsultaBackEmpresarial = false;
    $scope.configPermisoAccionDescargaBackEmpresarial = false;
    $scope.configPermisoAccionConsultaBackAddon = false;
    $scope.configPermisoAccionDescargaBackAddon = false;
    $scope.configPermisoAccionConsultaBackRecolecciones = false;
    $scope.configPermisoAccionDescargaBackRecolecciones = false;
    $scope.configPermisoAccionConsultaBackSoportes = false;
    $scope.configPermisoAccionDescargaBackSoportes = false;
    $scope.configPermisoAccionConsultaBackInstalaciones = false;
    $scope.configPermisoAccionDescargaBackInstalaciones = false;

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

        $('#searchGeo-empresarial').on('keyup', function () {
            $("#jstree-proton-empresarial").jstree("search", this.value);
        });

        $('#searchGeo-general').on('keyup', function () {
            $("#jstree-proton-general").jstree("search", this.value);
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

            if ($scope.tipoReporte === 'empresarial') {
                $scope.getTextGeografia('jstree-proton-empresarial', 'cluster-empresarial');
            }

            if ($scope.tipoReporte === 'general') {
                $scope.getTextGeografia('jstree-proton-general', 'cluster-general');
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

        let reporteEmpresarialTable = $('#reporteEmpresarialTable').DataTable({
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

        let reporteGeneralTable = $('#reporteGeneralTable').DataTable({
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

        $('.drop-down-filters').on("change.bs.dropdown", function (e) {
            $scope.setTextFiltro();
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

    $scope.loadDate = function (tipo) {
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
            var startOfWeek = moment(date_selected).day(1);
            var endOfWeek = moment(date_selected).day(7);
            let date = {
                inicio: startOfWeek,
                fin: endOfWeek
            }
            switch (tipo) {
                case 'instalaciones':
                    $scope.weekDateObjectReport.instalaciones = date
                    break;
                case 'soportes':
                    $scope.weekDateObjectReport.soportes = date
                    break;
                case 'recolecciones':
                    $scope.weekDateObjectReport.recolecciones = date
                    break;
                case 'addon':
                    $scope.weekDateObjectReport.addon = date
                    break;
                case 'empresarial':
                    $scope.weekDateObjectReport.empresarial = date
                    break;
                case 'general':
                    $scope.weekDateObjectReport.general = date
                    break;
                default:
                    break;
            }
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
            fecha_actual = moment(date_selected).format('DD/MM/YYYY');
            $('#filtro_fecha_semana_' + tipo).val(fecha_actual);
        }).on('hide', function (e) {
            if (fecha_actual) {
                $('#filtro_fecha_semana_' + tipo).val(fecha_actual);
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
            case 'empresarial':
                $scope.listaGeografiaReporte.empresarial.map((e) => {
                    e.state = {
                        opened: true,
                        selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
                    }
                    return e
                });
                break;
            case 'general':
                $scope.listaGeografiaReporte.general.map((e) => {
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
            case 'empresarial':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.empresarial);
                if ($scope.resultReporteEmpresarial == null && geografiaReporte) {
                    $scope.loadDate('empresarial');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'general':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.general);
                if ($scope.resultReporteGeneral == null && geografiaReporte) {
                    $scope.loadDate('general');
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
                    case 'empresarial':
                        $scope.getTextGeografia('jstree-proton-empresarial', 'cluster-empresarial');
                        if ($scope.resultReporteEmpresarial == null) {
                            $scope.consultarReporteEmpresarial();
                        }
                        break;
                    case 'general':
                        $scope.getTextGeografia('jstree-proton-general', 'cluster-general');
                        if ($scope.resultReporteGeneral == null) {
                            $scope.consultarReporteGeneral();
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

    $scope.listaSeleccionSelectGral = function (array, nivel) {
        let arrayReturn = "";
        angular.forEach(array, function (elemento, index) {
            if (elemento.nivel == nivel && elemento.checkedOpcion) {
                if (arrayReturn !== "") {
                    arrayReturn += ',';
                }
                arrayReturn += elemento.nombre.toUpperCase();
            } else {
                arrayReturn = arrayReturn.concat($scope.listaSeleccionSelectGral(elemento.children, nivel));
            }
        });
        return arrayReturn;

    }

    $scope.conversionAnidadaRecursiva = function (array, nivelInit, maxNivel) {
        let arrayReturn = [];
        angular.forEach(array.filter(e => e.nivel === nivelInit), function (elem, index) {
            let elemento = angular.copy(elem);
            elemento.checkedOpcion = true;
            if (nivelInit < maxNivel) {
                elemento.children = $scope.conversionAnidadaRecursiva(array, nivelInit + 1, maxNivel).filter(e2 => e2.idPadre === elemento.id);
                elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : [];
            }
            arrayReturn.push(elemento)
        });
        return arrayReturn;
    }

    $scope.consultarCatalagosPI = function () {
        $q.all([
            genericService.consulCatalogoGeografia(),
            genericService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloReportesSF" }),
            genericService.consultarCatalogoIntervenciones()
        ]).then(function (results) {
            let resultConf = results[1].data.result
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[1].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            $scope.nfiltrogeografiaInstalaciones = llavesResult.N_FILTRO_GEOGRAFIA_BACK_INST ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_INST : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaSoportes = llavesResult.N_FILTRO_GEOGRAFIA_BACK_SOPORTE ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_SOPORTE : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaRecolecciones = llavesResult.N_FILTRO_GEOGRAFIA_BACK_REC ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_REC : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaAddon = llavesResult.N_FILTRO_GEOGRAFIA_BACK_ADDON ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_ADDON : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaEmpresarial = llavesResult.N_FILTRO_GEOGRAFIA_BACK_EMP ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_EMP : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaGeneral = llavesResult.N_FILTRO_GEOGRAFIA_BACK_GENERAL ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_GENERAL : llavesResult.N_FILTRO_GEOGRAFIA;

                            $scope.nfiltrointervencionesGeneral = llavesResult.N_FILTRO_INTERVENCIONES_GENERAL ? $scope.nfiltrointervencionesGeneral : null;

                            if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
                                $scope.configPermisoAccionConsultaBackInstalaciones = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogInstalaciones" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackInstalaciones = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogInstalaciones" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackSoportes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogSoportes" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackSoportes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogSoportes" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackRecolecciones = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogRecolecciones" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackRecolecciones = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogRecolecciones" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogAddon" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogAddon" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackEmpresarial = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogEmpresarial" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackEmpresarial = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogEmpresarial" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackGeneral = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogGeneral" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackGeneral = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogGeneral" })[0] != undefined);
                                objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
                                objectTempAccion.inicializarBotonAccionesRecientes();
                            }
                            $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

                            validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                            validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

                            let firstNav = '';

                            if ($scope.configPermisoAccionConsultaBackInstalaciones) {
                                if (firstNav === '') {
                                    firstNav = 'reporteInstalaciones-tab';
                                    $scope.tipoReporte = 'instalaciones';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackSoportes) {
                                if (firstNav === '') {
                                    firstNav = 'reporteSoportes-tab';
                                    $scope.tipoReporte = 'soportes';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackRecolecciones) {
                                if (firstNav === '') {
                                    firstNav = 'reporteRecolecciones-tab';
                                    $scope.tipoReporte = 'recolecciones';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackAddon) {
                                if (firstNav === '') {
                                    firstNav = 'reporteAddon-tab';
                                    $scope.tipoReporte = 'addon';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackEmpresarial) {
                                if (firstNav === '') {
                                    firstNav = 'reporteEmpresarial-tab';
                                    $scope.tipoReporte = 'empresarial';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackGeneral) {
                                if (firstNav === '') {
                                    firstNav = 'reporteGeneral-tab';
                                    $scope.tipoReporte = 'general';
                                }
                            }

                            if (firstNav === '') {
                                $scope.permisosConfigUser.permisos = [];
                            }
                            if ($scope.permisosConfigUser.permisos.length > 0) {
                                setTimeout(function () {
                                    $('#' + firstNav).click();
                                    $scope.cambiaReporte($scope.tipoReporte, false, firstNav.split('-'[0]));
                                }, 300)
                            }
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
                            $scope.nfiltrogeografiaEmpresarial = $scope.nfiltrogeografiaEmpresarial ? $scope.nfiltrogeografiaEmpresarial : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaGeneral = $scope.nfiltrogeografiaGeneral ? $scope.nfiltrogeografiaGeneral : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);


                            if ($scope.configPermisoAccionConsultaBackInstalaciones) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaInstalaciones);
                                $scope.listaGeografiaReporte.instalaciones = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackSoportes) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaSoportes);
                                $scope.listaGeografiaReporte.soportes = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackRecolecciones) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaRecolecciones);
                                $scope.listaGeografiaReporte.recolecciones = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackAddon) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaAddon);
                                $scope.listaGeografiaReporte.addon = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackEmpresarial) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaEmpresarial);
                                $scope.listaGeografiaReporte.empresarial = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackGeneral) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaGeneral);
                                $scope.listaGeografiaReporte.general = angular.copy(geografia);
                            }

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

            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        $scope.nfiltrointervencionesGeneral = $scope.nfiltrointervencionesGeneral ? $scope.nfiltrointervencionesGeneral : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result);
                        $scope.filtrosGeneral.tipoOrdenes = $scope.conversionAnidadaRecursiva(results[2].data.result, 1, $scope.nfiltrointervencionesGeneral)
                        $('#filtro-intervencion-general').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.tipoOrdenes, $scope.nfiltrointervencionesGeneral))

                    } else {
                        toastr.info('No se encontraron tipo ordenes');
                    }
                } else {
                    toastr.warning(results[2].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
            }


        }).catch(err => handleError(err));
    }

    $scope.consultarCatalagosPI();

    $scope.getFechaFormatoValid = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }

    $scope.changeCalendar = function (data, reporte) {
        let tipo = data.reporte[reporte + ""];
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

    $scope.getFecha = function (type) {
        let fechaInicio;
        let fechaFin;
        let tipo = $("#tipo_reporte_" + type).val();
        switch (tipo) {
            case 'dia':
                fechaInicio = $scope.getFechaFormatoValid($("#filtro_fecha_dia_" + type).val())
                fechaFin = $scope.getFechaFormatoValid($("#filtro_fecha_dia_" + type).val())
                break;
            case 'semana':
                switch (type) {
                    case 'instalaciones':
                        fechaInicio = moment($scope.weekDateObjectReport.instalaciones['inicio']).format('YYYY-MM-DD');
                        fechaFin = moment($scope.weekDateObjectReport.instalaciones['fin']).format('YYYY-MM-DD');
                        break;
                    case 'soportes':
                        fechaInicio = moment($scope.weekDateObjectReport.soportes['inicio']).format('YYYY-MM-DD');
                        fechaFin = moment($scope.weekDateObjectReport.soportes['fin']).format('YYYY-MM-DD');
                        break;
                    case 'recolecciones':
                        fechaInicio = moment($scope.weekDateObjectReport.recolecciones['inicio']).format('YYYY-MM-DD');
                        fechaFin = moment($scope.weekDateObjectReport.recolecciones['fin']).format('YYYY-MM-DD');
                        break;
                    case 'addon':
                        fechaInicio = moment($scope.weekDateObjectReport.addon['inicio']).format('YYYY-MM-DD');
                        fechaFin = moment($scope.weekDateObjectReport.addon['fin']).format('YYYY-MM-DD');
                        break;
                    case 'empresarial':
                        fechaInicio = moment($scope.weekDateObjectReport.empresarial['inicio']).format('YYYY-MM-DD');
                        fechaFin = moment($scope.weekDateObjectReport.empresarial['fin']).format('YYYY-MM-DD');
                        break;
                    case 'general':
                        fechaInicio = moment($scope.weekDateObjectReport.general['inicio']).format('YYYY-MM-DD');
                        fechaFin = moment($scope.weekDateObjectReport.general['fin']).format('YYYY-MM-DD');
                        break;
                    default:
                        break;
                }
                break;

            case 'mes':
                let fechas = $scope.getFechaFormato($("#filtro_fecha_mes_" + type).val());
                fechaInicio = fechas.fechaInicio;
                fechaFin = fechas.fechaFin;
                break;

            default:
                break;
        }
        return { fechaInicio: fechaInicio, fechaFin: fechaFin }
    }

    $scope.seleccionarTodosRecursivo = function (array) {
        array.map(function (e) {
            e.checkedOpcion = true;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.seleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.deseleccionarTodosRecursivo = function (array) {
        array.map(function (e) {
            e.checkedOpcion = false;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.deseleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.setCheckFiltroGenericV2 = function (filtro, principalArray) {
        if (filtro.children !== undefined && filtro.children.length > 0) {
            if (filtro.checkedOpcion) {
                $scope.deseleccionarTodosRecursivo(filtro.children);
            } else {
                $scope.seleccionarTodosRecursivo(filtro.children);
            }
        }
        filtro.checkedOpcion = !filtro.checkedOpcion;
        $scope.checkPadre(filtro.idPadre, principalArray, principalArray);
    }

    $scope.checkPadre = function (idPadre, array, principalArray) {
        array.map(function (e) {
            if (Number(e.id) === Number(idPadre)) {
                e.checkedOpcion = e.children.length === e.children.filter(function (e) { return e.checkedOpcion }).length;
                $scope.checkPadre(e.idPadre, principalArray, principalArray);
            } else {
                if (e.children !== undefined && e.children.length > 0) {
                    $scope.checkPadre(idPadre, e.children, principalArray);
                }
            }
        });
    }

    $scope.setTextFiltro = function () {
        $('#filtro-intervencion-general').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.tipoOrdenes, $scope.nfiltrointervencionesGeneral))
    }

    $scope.obtenerElementosSeleccionadosFiltro = function (array, nivel) {
        let arrayReturn = [];
        angular.forEach(array, function (elemento, index) {
            if (elemento.nivel == nivel && elemento.checkedOpcion) {
                arrayReturn.push(elemento.id);
            } else {
                arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
            }
        });
        return arrayReturn;
    }


    $scope.consultarReporteInstalaciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalaciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstalaciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a</li>';
            isValid = false
        }

        if ($("#tipo_reporte_instalaciones").val() == 'semana' && !$scope.weekDateObjectReport.instalaciones) {
            mensaje += '<li>Seleccione semana</li>';
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

    $scope.descargarReporteInstalaciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalaciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstalaciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a</li>';
            isValid = false
        }

        if ($("#tipo_reporte_instalaciones").val() == 'semana' && !$scope.weekDateObjectReport.instalaciones) {
            mensaje += '<li>Seleccione semana</li>';
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
                fechaFinal: fechas.fechaFin,
                tipoExcel: 'reportesf-backloginstalaciones-pi'
            }
            $scope.downloadReport(params, 'reporteBacklogInstalaciones', 'backlog instalaciones');
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

        if ($("#tipo_reporte_soportes").val() == 'semana' && !$scope.weekDateObjectReport.soportes) {
            mensaje += '<li>Seleccione semana</li>';
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

    $scope.descargarReporteSoportes = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-soportes").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaSoportes)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_soportes").val() == 'semana' && !$scope.weekDateObjectReport.soportes) {
            mensaje += '<li>Seleccione semana</li>';
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
                fechaFinal: fechas.fechaFin,
                tipoExcel: 'reportesf-backloggeneral-pi'
            }
            $scope.downloadReport(params, 'reporteBacklogSoportes', 'backlog soportes');
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

        if ($("#tipo_reporte_recolecciones").val() == 'semana' && !$scope.weekDateObjectReport.recolecciones) {
            mensaje += '<li>Seleccione semana</li>';
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

    $scope.descargarReporteRecolecciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-recolecciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaRecolecciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_recolecciones").val() == 'semana' && !$scope.weekDateObjectReport.recolecciones) {
            mensaje += '<li>Seleccione semana</li>';
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
                fechaFinal: fechas.fechaFin,
                tipoExcel: 'reportesf-backloggeneral-pi'
            }
            $scope.downloadReport(params, 'reporteBacklogRecolecciones', 'backlog recolecciones');
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

        if ($("#tipo_reporte_addon").val() == 'semana' && !$scope.weekDateObjectReport.addon) {
            mensaje += '<li>Seleccione semana</li>';
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

    $scope.descargarReporteAddon = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-addon").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaAddon)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_addon").val() == 'semana' && !$scope.weekDateObjectReport.addon) {
            mensaje += '<li>Seleccione semana</li>';
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
                fechaFinal: fechas.fechaFin,
                tipoExcel: 'reportesf-backloggeneral-pi'

            }
            $scope.downloadReport(params, 'reporteBacklogAddon', 'backlog addon');
        }
    }

    $scope.consultarReporteEmpresarial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-empresarial").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaEmpresarial)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_empresarial").val() == 'semana' && !$scope.weekDateObjectReport.empresarial) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('empresarial');
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
                                $scope.resultReporteEmpresarial = response.data.result.data.length;
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

                reporteEmpresarialTable = $('#reporteEmpresarialTable').DataTable({
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
                        { "aTargets": [18], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }


    $scope.descargarReporteEmpresarial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-empresarial").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaEmpresarial)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_empresarial").val() == 'semana' && !$scope.weekDateObjectReport.empresarial) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('empresarial');
            let params = {
                tiposOrden: [65, 130, 95, 136],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                tipoExcel: 'reportesf-backlogempresarial-pi'
            }
            $scope.downloadReport(params, 'reporteBacklogEmpresarial', 'backlog empresarial');
        }
    }

    $scope.consultarReporteGeneral = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-general").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaGeneral)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_general").val() == 'semana' && !$scope.weekDateObjectReport.general) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nfiltrointervencionesGeneral);
        if (!intervencioncopy.length) {
            mensaje += '<li>Introducir Intervenci\u00F3n</li>';
            isValid = false;
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('general');
            let params = {
                tiposOrden: intervencioncopy,
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
                                $scope.resultReporteGeneral = response.data.result.data.length;
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

                reporteGeneralTable = $('#reporteGeneralTable').DataTable({
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

    $scope.descargarReporteGeneral = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-general").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaGeneral)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_general").val() == 'semana' && !$scope.weekDateObjectReport.general) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nfiltrointervencionesGeneral);
        if (!intervencioncopy.length) {
            mensaje += '<li>Introducir Intervenci\u00F3n</li>';
            isValid = false;
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('general');
            let params = {
                tiposOrden: intervencioncopy,
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                tipoExcel: 'reportesf-backloggeneral-pi'
            }
            $scope.downloadReport(params, 'reporteBacklogGeneral', 'backlog general');
        }
    }

    $scope.downloadReport = function (params, nameFile, report) {
        swal({ text: 'Cargando registros...', allowOutsideClick: false });
        swal.showLoading();

        let tituloAccion = "Descarga reporte " + report;
        let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';

        /*genericService.enviarParamsReporte(params).then(function success(response) {
            if (response.data.respuesta) {
                var link = document.createElement("a");
                link.href = contex_project + '/req/exporteExcelGenericRequest/' + nameFile + '.xls';
                link.click();
                swal.close();

                mensajeEnvio = 'Se ha descargado el reporte';
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
            }
            swal.close();
        });*/
    }

}]);