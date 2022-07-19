var app = angular.module('reportesLogApp', []);

app.controller('reportesLogController', ['$scope', '$q', 'reportesLogService', '$filter', function ($scope, $q, reportesLogService, $filter) {
    var regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    var logsUsuarioTable;
    var logsGeneralTable;
    var logsUserTable;
    $scope.permisosConfigUser = {};
    $scope.nGeografiaUsuario = '';
    $scope.nGeografiaGeneral = '';
    $scope.listaGeografia = [];
    $scope.listaPuestos = [];
    $scope.listaUsuarios = [];
    $scope.isGeneral = false;
    $scope.categoriasLogs = [];
    $scope.idDetalle = 0;
    $scope.listModulos = [];

    $scope.configPermisoAccionConsultaLogsGeneral = false;
    $scope.configPermisoAccionConsultaLogsUsuario = false;
    $scope.configPermisoAccionDescargaLogsGeneral = false;
    $scope.configPermisoAccionDescargaLogsUsuario = false;

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    $('.list-filter').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    $('#searchGeoConsultaUsuario').on('keyup', function () {
        $("#jstreeLogsUsuario").jstree("search", this.value);
    })

    $('#searchGeoGeneral').on('keyup', function () {
        $("#jstreeLogsGeneral").jstree("search", this.value);
    })

    logsUsuarioTable = $('#logsUsuarioTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font
    });

    logsUserTable = $('#logsUserTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font
    });

    logsGeneralTable = $('#logsGeneralTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font
    });

    $scope.puestoSeleccion = function () {
        $('#txtPuesto').val($scope.listaSeleccionSelectGral($scope.listaPuestos));
        $("#txtPuesto").css("border-bottom", "2px solid #d9d9d9");
    }

    $scope.seleccionarTodosFiltro = function (list, isCheck) {
        list.map(function (e) {
            e.isShow = isCheck;
        })
        $(".check-input-list").prop("checked", isCheck);

        let arraRow = [];
        $.each($scope.listModulos, function (i, elemento) {
            let isInFilter = $scope.categoriasLogs.find((t) => t.id == elemento.idModulo && t.isShow)
            let row = [];
            if (isInFilter) {
                row[0] = elemento.descripcionModulo ? elemento.descripcionModulo : 'Sin informaci&oacute;n';
                row[1] = elemento.descripcionAccion ? elemento.descripcionAccion : 'Sin informaci&oacute;n';
                row[2] = elemento.descripcionEstatusHttp ?  $scope.getTextEstatus(elemento.descripcionEstatusHttp) : 'Sin informaci&oacute;n';
                row[3] = elemento.descripcionMensajeHttp ? elemento.descripcionMensajeHttp : 'Sin informaci&oacute;n';
                row[4] = elemento.comentarios ? elemento.comentarios : 'Sin informaci&oacute;n';
                row[5] = elemento.fechaRegistro ? elemento.fechaRegistro : 'Sin informaci&oacute;n';
                row[6] = elemento.ip ? elemento.ip : 'Sin informaci&oacute;n';

                arraRow.push(row);
            }

        })
        logsUserTable = $('#logsUserTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 10,
            "bDestroy": true,
            "info": true,
            "scrollX": false,
            "data": arraRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });

    }

    $scope.seleccionarTodos = function (paramFiltroParent) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = true
        })
        $('#txtPuesto').val($scope.listaSeleccionSelectGral(paramFiltroParent));
    }

    $scope.deseleccionarTodos = function (paramFiltroParent) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = false
        })
        $('#txtPuesto').val('');
    }

    $scope.listaSeleccionSelectGral = function (lista) {
        var texto = "";
        angular.forEach(lista, function (list, index) {
            if (list.checkedOpcion) {
                if (texto !== "") {
                    texto = (texto + ", " + list.descripcion);
                } else {
                    texto = (list.descripcion);
                }
            }
        });
        return texto;
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

    $scope.getInformacionGeneral = function () {
        $q.all([
            reportesLogService.consultarConfiguracion({ "moduloAccionesUsuario": "moduloGestionUniversal" }),
            reportesLogService.consulCatalogoGeografiaGeneral(),
            reportesLogService.consultaPuestos()
        ]).then(function (results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        let resultConf = results[0].data.result
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            $scope.nGeografiaUsuario = llavesResult.N_FILTRO_GEOGRAFIA_USUARIO;
                            $scope.nGeografiaGeneral = llavesResult.N_FILTRO_GEOGRAFIA_GENERAL;
                            $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

                            if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
                                $scope.configPermisoAccionConsultaLogsGeneral = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaLogsGeneral" })[0] != undefined);
                                $scope.configPermisoAccionConsultaLogsUsuario = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaLogsUsuario" })[0] != undefined);
                                $scope.configPermisoAccionDescargaLogsGeneral = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaLogsGeneral" })[0] != undefined);
                                $scope.configPermisoAccionDescargaLogsUsuario = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaLogsUsuario" })[0] != undefined);
                            }
                        }

                        if (!$scope.configPermisoAccionConsultaLogsGeneral && $scope.configPermisoAccionConsultaLogsUsuario) {
                            setTimeout(function () {
                                $("#logsUsuario-tab").click();
                            }, 300)
                        }

                    } else {
                        toastr.warning('No se encontraron datos para la configuraci\u00F3n');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de configuraci\u00F3n');
            }

            $("#container_logs").css("display", "block")

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        if (results[1].data.result.geografia || results[1].data.result.geografia.length > 0) {
                            let listGeoLogUsuario = [];
                            let listGeoLogGeneral = [];

                            $scope.nGeografiaUsuario = $scope.nGeografiaUsuario ? $scope.nGeografiaUsuario : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
                            $scope.nGeografiaGeneral = $scope.nGeografiaGeneral ? $scope.nGeografiaGeneral : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);

                            listGeoLogUsuario = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografiaUsuario });
                            listGeoLogGeneral = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografiaGeneral });
                            $scope.listaGeografia = listGeoLogUsuario;

                            let geografia = listGeoLogUsuario;
                            geografia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
                            geografia.map((e) => {
                                e.parent = e.padre == null ? 0 : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: true,
                                    selected: true,
                                }
                                return e
                            })

                            let geografiaGen = listGeoLogGeneral;
                            geografiaGen.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
                            geografiaGen.map((e) => {
                                e.parent = e.padre == null ? 0 : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: true,
                                    selected: true,
                                }
                                return e
                            })


                            $('#jstreeLogsGeneral').bind('loaded.jstree', function (e, data) {
                                var geografiasUser = $('#jstreeLogsGeneral').jstree("get_selected", true);
                                let textoGeografias = [];
                                angular.forEach(geografiasUser, (geografia, index) => {
                                    textoGeografias.push(geografia.text);
                                });
                                $('#inputSearchGeoGeneral').val(textoGeografias);
                                if ($scope.configPermisoAccionConsultaLogsGeneral) {
                                    $scope.consultarLogs();
                                }
                            }).jstree({
                                'plugins': ["wholerow", "checkbox", "search"],
                                'core': {
                                    'data': geografiaGen,
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


                            $('#jstreeLogsUsuario').bind('loaded.jstree', function (e, data) {
                                var geografiasTemp = $('#jstreeLogsUsuario').jstree("get_selected", true);
                                let textoGeografias = [];
                                angular.forEach(geografiasTemp, (geografia, index) => {
                                    textoGeografias.push(geografia.text);
                                });
                                $('#inputSearchGeoUsuario').val(textoGeografias);
                                if ($scope.configPermisoAccionConsultaLogsUsuario) {
                                    $scope.consultarUsuarios();
                                }
                            }).jstree({
                                'plugins': ["wholerow", "checkbox", "search"],
                                'core': {
                                    'data': geografia,
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


                        } else {
                            mostrarMensajeWarningValidacion('No existen geograf\u00EDas actualmente')
                        }
                    } else {
                        toastr.warning('No se encontraron datos para la geograf\u00EDa');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de la geograf\u00EDa');
            }

            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        $scope.listaPuestos = results[2].data.result.puestos;
                        $scope.seleccionarTodos($scope.listaPuestos);
                    } else {
                        toastr.warning('No se encontraron puestos');
                    }
                } else {
                    toastr.warning(results[2].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de puestos');
            }

        }).catch(err => handleError(err));
    }

    $scope.getInformacionGeneral();

    $scope.abrirModalGeografiaBuscarUsuario = function () {
        $scope.isGeneral = false;
        $("#searchGeoConsultaUsuario").val("");
        $("#jstreeLogsUsuario").jstree("search", '');
        $("#modalGeografia").modal('show');
        setTimeout(function () {
            $("#searchGeoConsultaUsuario").focus();
        }, 750);
    }

    $scope.abrirModalGeografiaBuscar = function () {
        $scope.isGeneral = true;
        $("#searchGeoGeneral").val("");
        $("#jstreeLogsGeneral").jstree("search", '');
        $("#modalGeografia").modal('show');
        setTimeout(function () {
            $("#searchGeoGeneral").focus();
        }, 750);
    }

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        if (fechaPrueba.length > 1) {
            return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
        } else {
            return fecha;
        }
    }

    $scope.validarFecha = function (idFechaInicio, idFechaFin) {
        var inicio = document.getElementById(idFechaInicio).value.split('/');
        var fin = document.getElementById(idFechaFin).value.split('/');
        var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
        var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
        if (date_inicio <= date_fin) {
            return true;
        } else {
            return false;
        }
    }

    $scope.descargarLog = function () {
        if (!swal.isVisible()) {
            swal({ text: 'Cargando registros...', allowOutsideClick: false });
            swal.showLoading();
        }

        let params = {
            fechaInicio: new Date().toISOString().split('T')[0],
            fechaFin: new Date().toISOString().split('T')[0],
            idUsuario: $scope.idDetalle
        };

        reportesLogService.consultarReporteLogGeneral(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        const data = JSON.parse(response.data.result).modulos;
                        const fileName = 'Resporte log';
                        const exportType = 'xls';

                        window.exportFromJSON({ data, fileName, exportType })

                    } else {
                        toastr.info('No se encontraron resultados');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error al consultar el log');
            }
            swal.close();
        })

    }

    $scope.consultarUsuarios = function () {
        let clusters = $("#jstreeLogsUsuario").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nGeografiaUsuario)
            .map(e => parseInt(e.id));

        if (clusters.length == 0) {
            toastr.warning('Selecciona geograf&iacute;a');
            return false;
        }

        let puestosCopy = [];
        if ($scope.listaPuestos) {
            angular.forEach($scope.listaPuestos, (e, i) => {
                if (e.checkedOpcion) {
                    puestosCopy.push(e.id);
                }
            })
        }

        if (!puestosCopy.length) {
            toastr.warning('Selecciona al menos un puesto');
            return false;
        }

        if (!swal.isVisible()) {
            swal({ text: 'Cargando registros...', allowOutsideClick: false });
            swal.showLoading();
        }

        let params = { idsGeografia: clusters, idTipoUsuario: puestosCopy };
        let arraRow = [];

        reportesLogService.consultarUsuariosPorPuesto(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.usuarios) {
                            $scope.listaUsuarios = response.data.result.usuarios;

                            let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';

                            $.each(response.data.result.usuarios, function (i, elemento) {
                                let row = [];
                                let url = imgDefault;
                                if (regexUrl.test(elemento.urlFoto)) {
                                    url = elemento.urlFoto;
                                }
                                row[0] = '<img class="imgFoto" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'" + elemento.noEmpleado + "', 'usuario'" + ')"/>';
                                row[1] = elemento.noEmpleado ? elemento.noEmpleado : 'Sin informaci&oacute;n';
                                row[2] = elemento.puesto ? elemento.puesto : 'Sin informaci&oacute;n';
                                row[3] = elemento.usuario ? elemento.usuario : 'Sin informaci&oacute;n';
                                row[4] = elemento.nombreCompleto ? elemento.nombreCompleto : 'Sin informaci&oacute;n';
                                row[5] = elemento.geografia ? elemento.geografia : 'Sin informaci&oacute;n';
                                row[6] = '<span onclick="consultaReporteLogUsuario(' + elemento.idUsuario + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTable"><i class="fa fa-bars" aria-hidden="true"></i></span>';
                                arraRow.push(row);
                            })

                        } else {
                            toastr.error(response.data.resultDescripcion);
                        }
                    } else {
                        toastr.warning('No se encontraron usuarios');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error al consultar los usuarios');
            }

            logsUsuarioTable = $('#logsUsuarioTable').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": false,
                "bDestroy": true,
                "pageLength": 10,
                "info": true,
                "scrollX": false,
                "data": arraRow,
                "autoWidth": false,
                "language": idioma_espanol_not_font,
            });
            swal.close();
        })
    }

    $scope.consultarLogs = function () {
        let clusters = $("#jstreeLogsGeneral").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nGeografiaUsuario)
            .map(e => parseInt(e.id));

        if (clusters.length == 0) {
            toastr.warning('Selecciona geograf&iacute;a');
            return false;
        }

        if (!$scope.validarFecha('filtro_fecha_inicio', 'filtro_fecha_fin')) {
            toastr.warning('Selecciona una fecha v&aacute;lida');
            return false;
        }

        if (!swal.isVisible()) {
            swal({ text: 'Cargando registros...', allowOutsideClick: false });
            swal.showLoading();
        }

        let params = {
            idGeografias: clusters,
            fechaInicio: $scope.getFechaFormato($("#filtro_fecha_inicio").val()),
            fechaFin: $scope.getFechaFormato($("#filtro_fecha_fin").val()),
            elementosPorPagina: 10
        };

        logsGeneralTable = $('#logsGeneralTable').DataTable({
            "processing": false,
            "ordering": false,
            "serverSide": true,
            "scrollX": false,
            "paging": true,
            "info": true,
            "bDestroy": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "ajax": {
                "url": "req/consultarLogGeneral",
                "type": "POST",
                "data": params,
                "beforeSend": function () {
                    if (!swal.isVisible()) {
                        swal({ text: 'Cargando registros...', allowOutsideClick: false });
                        swal.showLoading();
                    }
                },
                "dataSrc": function (json) {
                    return json.data;
                },
                "error": function (xhr, error, thrown) {
                    handleError(xhr);
                },
                "complete": function () {
                    swal.close()
                }
            },
            "columns": [null, null, null, null, null, null, null, null, null],
            "language": idioma_espanol_not_font
        });
    }

    $scope.descargaReporteLogGeneral = function () {
        let clusters = $("#jstreeLogsGeneral").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nGeografiaUsuario)
            .map(e => parseInt(e.id));

        if (clusters.length == 0) {
            toastr.warning('Selecciona geograf&iacute;a');
            return false;
        }

        if (!$scope.validarFecha('filtro_fecha_inicio', 'filtro_fecha_fin')) {
            toastr.warning('Selecciona una fecha v&aacute;lida');
            return false;
        }

        if (!swal.isVisible()) {
            swal({ text: 'Cargando registros...', allowOutsideClick: false });
            swal.showLoading();
        }

        let params = {
            idGeografias: clusters,
            fechaInicio: $scope.getFechaFormato($("#filtro_fecha_inicio").val()),
            fechaFin: $scope.getFechaFormato($("#filtro_fecha_fin").val())
        };

        reportesLogService.consultarReporteLogGeneral(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        const data = JSON.parse(response.data.result).modulos;
                        const fileName = 'Resporte log';
                        const exportType = 'xls';

                        window.exportFromJSON({ data, fileName, exportType })

                    } else {
                        toastr.info('No se encontraron resultados');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error al consultar el log');
            }
            swal.close();
        })
    }

    let groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };


    $scope.getCategoryLogs = function (list) {
        let data = groupBy(list, 'idModulo');
        let listaTipos = [];
        list.map(function (e) {
            let isExist = listaTipos.find((t) => e.idModulo == t.id)
            if (!isExist) {
                listaTipos.push(
                    {
                        id: e.idModulo,
                        descripcion: e.descripcionModulo,
                        isShow: true
                    }
                )
            }
        });
        $scope.categoriasLogs = listaTipos;
        setTimeout(() => {
            $(".check-input-list").prop("checked", true);
        }, 300);

    }

    $scope.changeFilter = function (id) {
        $.each($scope.categoriasLogs, function (i, elemento) {
            if (elemento.id == id) {
                elemento.isShow = $("#check-" + id).is(":checked") ? true : false;
            }
        });

        let arraRow = [];
        $.each($scope.listModulos, function (i, elemento) {
            let isInFilter = $scope.categoriasLogs.find((t) => t.id == elemento.idModulo && t.isShow)
            let row = [];
            if (isInFilter) {
                row[0] = elemento.descripcionModulo ? elemento.descripcionModulo : 'Sin informaci&oacute;n';
                row[1] = elemento.descripcionAccion ? elemento.descripcionAccion : 'Sin informaci&oacute;n';
                row[2] = elemento.descripcionEstatusHttp ?  $scope.getTextEstatus(elemento.descripcionEstatusHttp) : 'Sin informaci&oacute;n';
                row[3] = elemento.descripcionMensajeHttp ? elemento.descripcionMensajeHttp : 'Sin informaci&oacute;n';
                row[4] = elemento.comentarios ? elemento.comentarios : 'Sin informaci&oacute;n';
                row[5] = elemento.fechaRegistro ? elemento.fechaRegistro : 'Sin informaci&oacute;n';
                row[6] = elemento.ip ? elemento.ip : 'Sin informaci&oacute;n';

                arraRow.push(row);
            }

        })
        logsUserTable = $('#logsUserTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 10,
            "bDestroy": true,
            "info": true,
            "scrollX": false,
            "data": arraRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });
    }

    consultaReporteLogUsuario = function (id) {
        $scope.idDetalle = id;
        if (!swal.isVisible()) {
            swal({ text: 'Cargando registros...', allowOutsideClick: false });
            swal.showLoading();
        }

        let params = {
            fechaInicio: new Date().toISOString().split('T')[0],
            fechaFin: new Date().toISOString().split('T')[0],
            idUsuario: id
        };
        let arraRow = [];

        reportesLogService.consultarAccionesRealizadasService(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.modulos.length) {
                            $scope.getCategoryLogs(response.data.result.modulos);
                            $scope.listModulos = response.data.result.modulos;
                            $.each(response.data.result.modulos, function (i, elemento) {
                                let row = [];

                                row[0] = elemento.descripcionModulo ? elemento.descripcionModulo : 'Sin informaci&oacute;n';
                                row[1] = elemento.descripcionAccion ? elemento.descripcionAccion : 'Sin informaci&oacute;n';
                                row[2] = elemento.descripcionEstatusHttp ? $scope.getTextEstatus(elemento.descripcionEstatusHttp) : 'Sin informaci&oacute;n';
                                row[3] = elemento.descripcionMensajeHttp ? elemento.descripcionMensajeHttp : 'Sin informaci&oacute;n';
                                row[4] = elemento.comentarios ? elemento.comentarios : 'Sin informaci&oacute;n';
                                row[5] = elemento.fechaRegistro ? elemento.fechaRegistro : 'Sin informaci&oacute;n';
                                row[6] = elemento.ip ? elemento.ip : 'Sin informaci&oacute;n';

                                arraRow.push(row);
                            })
                            $("#modalLog").modal("show");
                        } else {
                            toastr.info("No se encontraron resultados");
                        }

                    } else {
                        toastr.info('No se encontraron resultados');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error al consultar el log');
            }
            swal.close();
            logsUserTable = $('#logsUserTable').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": false,
                "pageLength": 10,
                "bDestroy": true,
                "info": true,
                "scrollX": false,
                "data": arraRow,
                "autoWidth": false,
                "language": idioma_espanol_not_font,
            });
        })


    }

    $scope.getTextEstatus = function (text) {
        let newText = text;
        switch (text) {
            case "success":
                newText = "&Eacute;xito";
                break;
            case "error":
                newText = "Error";
                break;
            case "warning":
                newText = "Advertencia";
                break;
            case "info":
                newText = "Informativo";
                break;
            default:
                break;
        }

        return newText;
    }


    showImage = function (id, type) {
        let url = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        let usuario = {};
        usuario = $scope.listaUsuarios.find((e) => e.noEmpleado == id);
        if (!regexUrl.test(usuario.urlFoto)) {
            usuario.urlFoto = url;
        }
        $scope.usuarioFoto = usuario;
        $('#img_tec').attr('src', usuario.urlFoto);
        $scope.$apply();
        $('#modalFotoTecnico').modal('show');

    }


    angular.element(document).ready(function () {
        setTimeout(() => {
            $('.datepicker').datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true,
                language: 'es',
                todayHighlight: true,
                clearBtn: false
            });
            $('.datepicker').datepicker('update', new Date());

        }, 300);

        $("#moduloReportesLog").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
    });
}])