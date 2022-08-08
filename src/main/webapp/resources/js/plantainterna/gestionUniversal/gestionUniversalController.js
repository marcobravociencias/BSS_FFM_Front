var app = angular.module('gestionUniversalApp', []);
var objectTempAccion;

app.controller('gestionUniversalController', ['$scope', '$q', 'gestionUniversalService', '$filter', function ($scope, $q, gestionUniversalService, $filter) {
    $scope.nGeografiaPagos = '';
    $scope.nGeografiaContrasenia = ''
    $scope.listaGeografia = [];
    $scope.listaPuestos = [];
    $scope.listaTecnicosPagos = [];
    $scope.listaUsuarios = [];
    $scope.idUsuario = '';
    $scope.usuarioFoto = {};
    $scope.isTecnicos = false;
    $scope.tecnicoPagos = {};
    let pagosTecnicosTable;
    let pagosLiberarTable;
    let usuariosCambiaContrasena;
    $scope.listaStatus = [];
    $scope.configPermisoAccionLiberaPagos = false;
    $scope.configPermisoAccionConsultaCambiaContrasena = false;
    $scope.configPermisoAccionConsultaTecnicosPagos = false;
    $scope.configPermisoAccionCambiaContrasena = false;
    $scope.configPermisoAccionConsultaPagos = false;
    $scope.configPermisoAccionRegistrarNodoGeografia = false;
    $scope.configPermisoAccionModificarNodoGeografia = false;
    $scope.configPermisoAccionEliminarNodoGeografia = false;


    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    pagosTecnicosTable = $('#pagosTecnicosTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font,
        "aoColumnDefs": [
            { "aTargets": [5], "bSortable": false }
        ]
    });


    pagosLiberarTable = $('#pagosLiberarTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "pageLength": 5,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font,
        "aoColumnDefs": [
            { "aTargets": [9], "bSortable": false }
        ]
    });

    usuariosCambiaContrasena = $('#cambiaContrasenaTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font,
        "aoColumnDefs": [
            { "aTargets": [6], "bSortable": false }
        ]
    });

    $('#searchTextGeneral').on('keyup', function () {
        pagosTecnicosTable.search(this.value).draw();
    })

    $('#searchTextPagos').on('keyup', function () {
        pagosLiberarTable.search(this.value).draw();
    })

    $('#searchTextUsuario').on('keyup', function () {
        usuariosCambiaContrasena.search(this.value).draw();
    })

    $('#searchGeo').on('keyup', function () {
        $("#jstreeConfig").jstree("search", this.value);
    })

    $('#searchGeoOriginal').on('keyup', function () {
        $("#jstreeConfigOriginal").jstree("search", this.value);
    })

    $('#searchGeoConsulta').on('keyup', function () {
        $("#jstreeConsultaTecnicos").jstree("search", this.value);
    })

    $('#searchGeoConsultaUsuarios').on('keyup', function () {
        $("#jstreeConsultaUsuarios").jstree("search", this.value);
    })

    angular.element(document).ready(function () {
        $("#modalGeografia").on("hidden.bs.modal", function () {
            var geografias = $('#jstreeConsultaTecnicos').jstree("get_selected", true);
            let textoGeografias = [];
            angular.forEach(geografias, (geografia, index) => {
                textoGeografias.push(geografia.text);
            });
            $('#inputSearchGeoTecnico').val(textoGeografias);

            var geografiasUser = $('#jstreeConsultaUsuarios').jstree("get_selected", true);
            let textoGeografiasUser = [];
            angular.forEach(geografiasUser, (geografiaUser, index) => {
                textoGeografiasUser.push(geografiaUser.text);
            });
            $('#inputSearchGeoUsuario').val(textoGeografiasUser);
        })
    });

    $scope.puestoSeleccion = function () {
        $('#txtPuesto').val($scope.listaSeleccionSelectGral($scope.listaPuestos));
        $("#txtPuesto").css("border-bottom", "2px solid #d9d9d9");
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

    showImage = function (id, type) {
        let url = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        let usuario = {};
        if (type == 'tecnico') {
            usuario = $scope.listaTecnicosPagos.find((e) => e.numEmpleado == id);
            usuario.nombreCompleto = usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno;
            usuario.puesto = 'T\u00C9CNICO';
            usuario.noEmpleado = usuario.numEmpleado;
            usuario.usuario = usuario.usuarioFFM;
        } else {
            usuario = $scope.listaUsuarios.find((e) => e.noEmpleado == id);
        }
        if (usuario) {
            if (!usuario.urlFoto) {
                usuario.urlFoto = url;
            }
            $scope.usuarioFoto = usuario;
            $('#img_tec').attr('src', usuario.urlFoto);
            $scope.$apply();
            $('#modalFotoTecnico').modal('show');
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

    $scope.consultarTecnicosPagos = function (isSwal) {

        let clusters = $("#jstreeConsultaTecnicos").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nGeografiaPagos)
            .map(e => parseInt(e.id));

        if (clusters.length == 0) {
            toastr.warning('Selecciona geograf&iacute;a');
            swal.close();
            return false;
        }

        let params = { idGeografias: clusters, idEstatusPagos: $scope.listaStatus };
        let arraRow = [];
        if (isSwal) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }

        if (pagosTecnicosTable) {
            pagosTecnicosTable.destroy();
        }
        gestionUniversalService.consultarPagosLiberar(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.usuarios) {
                            $scope.listaTecnicosPagos = response.data.result.usuarios;
                            $.each(response.data.result.usuarios, function (i, elemento) {
                                let row = [];
                                let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';
                                let url = imgDefault;
                                if (elemento.urlFoto) {
                                    url = elemento.urlFoto;
                                }
                                let nombreCompleto = elemento.nombre + ' ' + elemento.apellidoPaterno + ' ' + elemento.apellidoMaterno;

                                row[0] = '<img class="imgFoto" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'" + elemento.numEmpleado + "', 'tecnico'" + ')"/>';
                                row[1] = elemento.numEmpleado ? elemento.numEmpleado : 'Sin informaci&oacute;n';
                                row[2] = elemento.usuarioFFM ? elemento.usuarioFFM : 'Sin informaci&oacute;n';
                                row[3] = nombreCompleto ? nombreCompleto : 'Sin informaci&oacute;n';
                                row[4] = elemento.ciudadOrigen ? elemento.ciudadOrigen : 'Sin informaci&oacute;n';
                                row[5] = '<span onclick="consultarPagos(' + "'" + elemento.numEmpleado + "'" + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnLiberarPagosTabla" style="padding:4px 0px !important"><i class="fas fa-check-double" aria-hidden="true"></i></span>';
                                if (!$scope.configPermisoAccionConsultaPagos) {
                                    row[5] = '<span title="No tienes permisos para consultar" style="cursor: no-drop; opacity: 0.3 !important;padding:4px 0px !important" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnLiberarPagosTabla"><i class="fas fa-unlock" aria-hidden="true"></i></span>';
                                }
                                arraRow.push(row);
                            })
                        } else {
                            toastr.error(response.data.resultDescripcion);
                        }
                    } else {
                        toastr.warning('No se encontraron t\u00E9cnicos');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error al consultar los t\u00E9cnicos');
            }

            pagosTecnicosTable = $('#pagosTecnicosTable').DataTable({
                "paging": true,
                "lengthChange": false,
                "ordering": true,
                "pageLength": 10,
                "info": true,
                "scrollX": false,
                "data": arraRow,
                "autoWidth": false,
                "language": idioma_espanol_not_font,
                "aoColumnDefs": [
                    { "aTargets": [5], "bSortable": false }
                ]
            });
            swal.close();
        })
    }

    $scope.validaConsultarTecnicosPagos = function () {
        if (!$scope.listaTecnicosPagos.length) {
            $scope.consultarTecnicosPagos(true);
        }
    }

    $scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
        return list.sort(compareGeneric)[0].nivel
    }

    $scope.getInformacionGeneral = function () {
        $q.all([
            gestionUniversalService.consultarConfiguracion({ "moduloAccionesUsuario": "moduloGestionUniversal" }),
            gestionUniversalService.consultarTecnicosGeografia(),
            gestionUniversalService.consultaPuestos()
        ]).then(function (results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        let resultConf = results[0].data.result
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            $scope.nGeografiaPagos = llavesResult.N_FILTRO_GEOGRAFIA_PAGOS_TECNICOS;
                            $scope.nGeografiaContrasenia = llavesResult.N_FILTRO_GEOGRAFIA_CAMBIOCONTRASENIA;
                            $scope.nEstatusPagosTecnicos = llavesResult.N_ESTATUS_PAGOS_TECNICOS ? llavesResult.N_ESTATUS_PAGOS_TECNICOS : null;
                            $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
                            validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                            validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
                            validateCreedText = llavesResult.KEY_TEXTFORMATO_CREED_RES ? KEY_TEXTFORMATO_CREED_RES : '';

                            if ($scope.nEstatusPagosTecnicos !== null) {
                                let statusList = $scope.nEstatusPagosTecnicos.split(",");
                                $scope.listaStatus = statusList;
                            }

                            if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
                                $scope.configPermisoAccionLiberaPagos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "liberaPagos" })[0] != undefined);
                                $scope.configPermisoAccionConsultaCambiaContrasena = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCambiaContrasenaPlanning" })[0] != undefined);
                                $scope.configPermisoAccionConsultaTecnicosPagos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaTecnicosPagosPlanning" })[0] != undefined);
                                $scope.configPermisoAccionConsultaPagos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaPagosPlanning" })[0] != undefined);
                                $scope.configPermisoAccionCambiaContrasena = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionCambiaContrasenaPlanning" })[0] != undefined);
                                $scope.configPermisoAccionRegistrarNodoGeografia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionRegistrarNodoGeografiaPlanning" })[0] != undefined);
                                $scope.configPermisoAccionModificarNodoGeografia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionModificarNodoGeografiaPlanning" })[0] != undefined);
                                $scope.configPermisoAccionEliminarNodoGeografia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionEliminarNodoGeografiaPlanning" })[0] != undefined);
                                objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
				                objectTempAccion.inicializarBotonAccionesRecientes();
                            }

                            if (!$scope.configPermisoAccionConsultaCambiaContrasena && $scope.configPermisoAccionConsultaTecnicosPagos) {
                                setTimeout(function () {
                                    $("#pagoTecnico-tab").click();
                                    $scope.consultarTecnicosPagos(true);
                                }, 300)
                            }

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

            $("#container_gestion_Universal").css("display", "block")

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        if (results[1].data.result.geografia || results[1].data.result.geografia.length > 0) {
                            let listGeoPagos = [];
                            let listGeoCambia = [];

                            $scope.nGeografiaPagos = $scope.nGeografiaPagos ? $scope.nGeografiaPagos : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
                            $scope.nGeografiaContrasenia = $scope.nGeografiaContrasenia ? $scope.nGeografiaContrasenia : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);

                            listGeoPagos = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografiaPagos });

                            $scope.listaGeografia = listGeoPagos;
                            //$scope.loadArbol();
                            let geografia = listGeoPagos;
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

                            listGeoCambia = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografiaContrasenia });


                            $scope.listaGeografia = listGeoCambia;
                            let geografiaCambia = listGeoCambia;
                            geografiaCambia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
                            geografiaCambia.map((e) => {
                                e.parent = e.padre == null ? 0 : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: true,
                                    selected: true,
                                }
                                return e
                            })
                            $('#jstreeConsultaTecnicos').bind('loaded.jstree', function (e, data) {
                                var geografias = $('#jstreeConsultaTecnicos').jstree("get_selected", true);
                                let textoGeografias = [];
                                angular.forEach(geografias, (geografia, index) => {
                                    textoGeografias.push(geografia.text);
                                });
                                $('#inputSearchGeoTecnico').val(textoGeografias);
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
                            if ($scope.configPermisoAccionConsultaCambiaContrasena) {
                                $('#jstreeConsultaUsuarios').bind('loaded.jstree', function (e, data) {
                                    var geografiasUser = $('#jstreeConsultaUsuarios').jstree("get_selected", true);
                                    let textoGeografiasUser = [];
                                    angular.forEach(geografiasUser, (geografiaUser, index) => {
                                        textoGeografiasUser.push(geografiaUser.text);
                                    });
                                    $('#inputSearchGeoUsuario').val(textoGeografiasUser);
                                    $scope.consultarUsuariosContrasena(true);
                                }).jstree({
                                    'plugins': ["wholerow", "checkbox", "search"],
                                    'core': {
                                        'data': geografiaCambia,
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
    //$scope.consultarTecnicosPagos();

    consultarPagos = function (tecnico) {
        $scope.idUsuario = tecnico;
        $scope.tecnicoPagos = $scope.listaTecnicosPagos.find((e) => e.numEmpleado == tecnico)
        $.each($scope.tecnicoPagos.pagos, function (i, elemento) {
            elemento.isChecked = false;
        })
        if ($scope.tecnicoPagos.pagos.length) {
            let arraRow = [];
            if (pagosLiberarTable) {
                pagosLiberarTable.destroy();
            }
            $.each($scope.tecnicoPagos.pagos, function (i, elemento) {
                let clase = 'init';
                if (elemento.idEstatusPago == 3) {
                    clase = "free";
                }

                let row = [];
                row[0] = elemento.idCveCliente ? elemento.idCveCliente : 'Sin informaci&oacute;n';
                row[1] = elemento.folioSistema ? elemento.folioSistema : 'Sin informaci&oacute;n';
                row[2] = elemento.monto ? Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(elemento.monto) : 'Sin informaci&oacute;n';
                row[3] = elemento.fechaRegistro ? elemento.fechaRegistro : 'Sin informaci&oacute;n';
                row[4] = elemento.tiempo ? elemento.tiempo : 'Sin informaci&oacute;n';
                row[5] = elemento.estatusPago ? elemento.estatusPago : 'Sin informaci&oacute;n';
                row[6] = elemento.fechaCierreOT ? elemento.fechaCierreOT : 'Sin informaci&oacute;n';
                row[7] = elemento.tipoIntervencion ? elemento.tipoIntervencion : 'Sin informaci&oacute;n';
                row[8] = elemento.subTipoIntervencion ? elemento.subTipoIntervencion : 'Sin informaci&oacute;n';
                row[9] = '<div class="icon-status"><span class="fas ' + clase + '" id="' + elemento.folioSistema + '" onclick="changeLock(' + "'" + elemento.folioSistema + "'," + elemento.idEstatusPago + ')"></span></div>'
                if (elemento.idEstatusPago == 2) {
                    row[9] = '<input type="checkbox" onclick="changeCheck(this)" class="form-check-input pagos-selected" id="' + elemento.idPago + '"/>';
                }
                arraRow.push(row);
            })
            pagosLiberarTable = $('#pagosLiberarTable').DataTable({
                "paging": true,
                "lengthChange": false,
                "ordering": true,
                "pageLength": 5,
                "info": true,
                "scrollX": false,
                "data": arraRow,
                "autoWidth": false,
                "language": idioma_espanol_not_font,
                "aoColumnDefs": [
                    { "aTargets": [9], "bSortable": false }
                ]
            });
            $('#modalPagos').modal('show');
        } else {
            toastr.warning('No se encontraron pagos para mostrar');
        }

    }

    changeCheck = function (event) {
        $.each($scope.tecnicoPagos.pagos, function (i, elemento) {
            if ($(event).attr('id') == elemento.idPago) {
                elemento.isChecked = $(event).is(":checked");
            }
        })
    }

    $scope.liberarPago = function () {
        let ids = [];
        $.each($scope.tecnicoPagos.pagos, function (i, elemento) {
            if (elemento.isChecked) {
                ids.push(elemento.idPago);
            }
        })
        if (ids.length) {
            swal({
                title: "Liberar pago(s)",
                text: "Comentario:",
                type: "info",
                input: "textarea",
                reverseButtons: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Liberar',
                cancelButtonText: "Cancelar",
            }).then(function (comentario) {
                if (comentario == '') {
                    toastr.warning('Para liberar los pagos debe ingresar un comentario');
                } else {
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    let params = {
                        idsPagos: ids,
                        comentarios: comentario
                    }
                    let tituloAccion = "Liberar pagos";
					let mensajeEnvio = 'Ha ocurrido un error al liberar '+ ids.length+' pago(s) del usuario ' + $scope.tecnicoPagos.usuarioFFM;
                    gestionUniversalService.liberarPago(params).then(function success(response) {
                        swal.close();
                        if (response.data !== undefined) {
                            if (response.data.respuesta) {
                                if (response.data.result) {
                                    $('#modalPagos').modal('hide');
                                    $scope.consultarTecnicosPagos(false);
                                    toastr.success('Se han liberado los pagos correctamente');
                                    mensajeEnvio = 'Se ha liberado '+ ids.length+' pago(s) del usuario ' + $scope.tecnicoPagos.usuarioFFM;
							        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);

                                } else {
                                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                                    toastr.warning('No se liberaron los pagos');
                                }
                            } else {
                                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                                toastr.warning(response.data.resultDescripcion);
                            }
                        } else {
                            objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            toastr.error('Ha ocurrido un error al liberar el pago');
                        }
                    })
                }
            }).catch(err => {
                toastr.warning('Operaci&oacute;n cancelada');
            });
        } else {
            toastr.warning('Selecciona al menos un pago');
        }
    }

    $scope.abrirModalGeografiaBuscar = function () {
        $scope.isTecnicos = true;
        $("#searchGeoConsulta").val("");
        $("#jstreeConsultaTecnicos").jstree("search", '');
        $("#modalGeografia").modal('show');
        setTimeout(function () {
            $("#searchGeoConsulta").focus();
        }, 750);
    }


    //MODULO CAMBIA CONTRASEÑA

    $scope.abrirModalGeografiaBuscarUsuario = function () {
        $scope.isTecnicos = false;
        $("#searchGeoConsultaUsuarios").val("");
        $("#jstreeConsultaUsuarios").jstree("search", '');
        $("#modalGeografia").modal('show');
        setTimeout(function () {
            $("#searchGeoConsultaUsuarios").focus();
        }, 750);
    }

    $scope.consultarUsuariosContrasena = function (isSwal) {

        let clusters = $("#jstreeConsultaUsuarios").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nGeografiaContrasenia)
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

        if (isSwal) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }

        let params = { idsGeografia: clusters, idTipoUsuario: puestosCopy };
        let arraRow = [];
        if (usuariosCambiaContrasena) {
            usuariosCambiaContrasena.destroy();
        }
        gestionUniversalService.consultarUsuariosPorPuesto(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.usuarios) {
                            $scope.listaUsuarios = response.data.result.usuarios;

                            let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';

                            $.each(response.data.result.usuarios, function (i, elemento) {
                                let row = [];
                                let url = imgDefault;
                                if (elemento.urlFoto) {
                                    url = elemento.urlFoto;
                                }
                                row[0] = '<img class="imgFoto" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'" + elemento.noEmpleado + "', 'usuario'" + ')"/>';
                                row[1] = elemento.noEmpleado ? elemento.noEmpleado : 'Sin informaci&oacute;n';
                                row[2] = elemento.puesto ? elemento.puesto : 'Sin informaci&oacute;n';
                                row[3] = elemento.usuario ? elemento.usuario : 'Sin informaci&oacute;n';
                                row[4] = elemento.nombreCompleto ? elemento.nombreCompleto : 'Sin informaci&oacute;n';
                                row[5] = elemento.geografia ? elemento.geografia : 'Sin informaci&oacute;n';
                                row[6] = '<span onclick="restablecerContrasena(' + elemento.idUsuario + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnCambiaContrasena"><i class="fa fa-key" aria-hidden="true"></i></span>';
                                if (!$scope.configPermisoAccionCambiaContrasena) {
                                    row[6] = '<span title="No tienes permisos para editar" style="cursor: no-drop; opacity: 0.3 !important;" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnCambiaContrasena"><i class="fa fa-unlock" aria-hidden="true"></i></span>';
                                }
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

            usuariosCambiaContrasena = $('#cambiaContrasenaTable').DataTable({
                "paging": true,
                "lengthChange": false,
                "ordering": true,
                "pageLength": 10,
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


    restablecerContrasena = function (idUser) {
        $scope.idUsuario = idUser;
        $("#newPassword").val('');
        $("#confirmPassword").val('');
        $("#comentariosPassword").val('');
        $("#modalRestablecerContrasena").modal('show');
    }


    $scope.restablecer = function () {
        regex = /^(?=.*[a-z])\S{9,20}$/;
        numero = /(?=.*\d)/;
        allow = /(?=.*[\u0040]|[\u0024]|[\u0021]|[\u0025]|[\u002A]|[\u0023]|[\u003F]|[\u0026])/;
        refuse = /(?=.*[\u0020]|[\u0022]|[\u0027]|[\u0028]|[\u0029]|[\u002B]|[\u002C]|[\u002D]|[\u002E]|[\u002F]|[\u003A]|[\u003B]|[\u003C]|[\u003D]|[\u003E]|[\u007B-\u00FF])/;

        if ($("#newPassword").val() == '' || $("#comentariosPassword").val() == '') {
            toastr.warning('Todos los campos son obligatorios');
            return false;
        }

        if (validateCreed) {
            if (validateCreedMask !== null && validateCreedText !== '') {
                if (!validateCreedMask.test($("#newPasswordUserLogin").val())) {
                    toastr.warning('Formato invalido');
                    return false;
                }
            } else {
                if ($("#newPassword").val().length <= 8 || !regex.test($("#newPassword").val()) || !numero.test($("#newPassword").val())
                    || !allow.test($("#newPassword").val()) || refuse.test($("#newPassword").val())) {
                    toastr.warning('Formato invalido');
                    return false;
                }
            }
        }


        if ($("#newPassword").val() !== $("#confirmPassword").val()) {
            toastr.warning('Las contrase\u00F1as no coinciden');
            return false;
        }

        let params = {
            idUsuario: $scope.idUsuario,
            nuevoPassword: $("#newPassword").val(),
            comentarios: $("#comentariosPassword").val()
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let userTemp = $scope.listaUsuarios.find((u) => u.idUsuario == $scope.idUsuario)
        let tituloAccion = "Cambiar constrase\u00F1a";
        let mensajeEnvio = 'Ha ocurrido un error al cambiar la constrase\u00F1a del usuario ' + userTemp.nombreCompleto;
        gestionUniversalService.restaurarContrasena(params).then(function success(response) {
            swal.close();
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $("#modalRestablecerContrasena").modal('hide');
                        toastr.success('Contrase\u00F1a restablecida correctamente');
                        $scope.consultarUsuariosContrasena(false);
                        mensajeEnvio = 'Se ha cambiado la constrase\u00F1a del usuario ' + userTemp.nombreCompleto;
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                    } else {
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        toastr.warning('No se restablecio la contrase\u00F1a');
                    }
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                toastr.error('Ha ocurrido un error al restablecer la contrase\u00F1a');
            }
        })

    }
    //MODULO CONFIGURACION GEOGRAFIA

    $scope.getIconGeografia = function (nivel) {
        let icon = "";
        switch (true) {
            case (nivel == 2):
                icon = "fas fa-map";
                break
            case (nivel == 3):
                icon = "fas fa-map-marked-alt";
                break
            case (nivel == 4):
                icon = "fas fa-map-marker-alt"
                break
            case (nivel == 5):
                icon = "fas fa-map-pin";
                break
            default:
                icon = "fas fa-globe"
                break
        }
        return icon;
    }

    $scope.loadArbol = function () {
        let geografia = $scope.listaGeografia;
        if (geografia.length !== 0) {
            geografia.map((e) => {
                let icon = $scope.getIconGeografia(e.nivel);
                e.parent = e.padre == null ? "#" : e.padre;
                e.text = e.nombre;
                e.icon = icon;
                e.state = {
                    opened: e.nivel == 1 || e.nivel == 2 ? true : false,
                    selected: false,
                }
                return e
            })
            $('#jstreeConfigOriginal').jstree({
                'core': {
                    "check_callback": true,
                    'data': geografia,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons": true
                    }
                },
                plugins: ["contextmenu", "unique", "dnd", "search"],
                "contextmenu": {
                    "items": function ($node) {
                        var tree = $("#jstreeConfigOriginal").jstree(true);
                        return {
                            "Create": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Crear",
                                "icon": "fas fa-plus",
                                "action": function (obj) {
                                    $node = tree.create_node($node);
                                    tree.edit($node);
                                }
                            },
                            "Rename": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Editar",
                                "icon": "fas fa-pen-fancy",
                                "action": function (obj) {
                                    tree.edit($node);
                                }
                            },
                            "Remove": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Borrar",
                                "icon": "fas fa-trash",
                                "action": function (obj) {
                                    swal({
                                        title: "",
                                        text: "\u00BFSeguro que desea eliminar el nodo?",
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: '#007bff',
                                        confirmButtonText: 'Si',
                                        cancelButtonText: 'No'
                                    }).then(function (isConfirm) {
                                        if (isConfirm) {
                                            tree.delete_node($node);
                                        }
                                    }).catch(err => {

                                    });

                                }
                            }
                        };
                    }
                },
                "search": {
                    "case_sensitive": false,
                    "show_only_matches": true
                }
            }).bind('move_node.jstree', function (e, data) {
                console.log(data);
                $scope.moverNodo(data);
            }).on('keyup.jstree', function (e, dta) {
                let text = $('.jstree-rename-input').val();
                console.log(text);
            });
            $('#jstreeConfig').jstree({
                'core': {
                    "check_callback": true,
                    'data': geografia,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons": true
                    }
                },
                plugins: ["contextmenu", "unique", "dnd", "search"],
                "contextmenu": {
                    "items": function ($node) {
                        var tree = $("#jstreeConfigOriginal").jstree(true);
                        return {
                            "Create": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Crear",
                                "icon": "fas fa-plus",
                                "action": function (obj) {
                                    $node = tree.create_node($node);
                                    tree.edit($node);
                                }
                            },
                            "Rename": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Editar",
                                "icon": "fas fa-pen-fancy",
                                "action": function (obj) {
                                    tree.edit($node);
                                }
                            },
                            "Remove": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Borrar",
                                "icon": "fas fa-trash",
                                "action": function (obj) {
                                    swal({
                                        title: "",
                                        text: "\u00BFSeguro que desea eliminar el nodo?",
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: '#007bff',
                                        confirmButtonText: 'Si',
                                        cancelButtonText: 'No'
                                    }).then(function (isConfirm) {
                                        if (isConfirm) {
                                            tree.delete_node($node);
                                        }
                                    }).catch(err => {

                                    });

                                }
                            }
                        };
                    }
                },
                "search": {
                    "case_sensitive": false,
                    "show_only_matches": true
                }
            }).bind('move_node.jstree', function (e, data) {
                console.log(data);
                $scope.moverNodo(data);
            }).on('keyup.jstree', function (e, dta) {
                let text = $('.jstree-rename-input').val();
                console.log(text);
            });
        }
    }

    $scope.listaGeografiaConfiguracion = [];
    $scope.banderaConsultaGeografia = false;
    $scope.consultarCatalogoGeografia = function() {
        if (!$scope.banderaConsultaGeografia) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            gestionUniversalService.consultaGeografias().then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            $scope.listaGeografiaConfiguracion = response.data.result.geografia;
                            
                            $scope.listaGeografiaConfiguracion.map((e) => {
                                e.parent = e.padre == null ? 0 : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: false
                                }
                                return e
                            })
                            $scope.listaGeografiaConfiguracion.push({ id: 0, text: "TOTALPLAY", nivel: 0, parent: "#", state: { opened: true, selected: true } });

                            $scope.banderaConsultaGeografia = true;
                            $scope.agregarOpcionesGeografiaConfiguracion($scope.listaGeografiaConfiguracion);
                            swal.close();
                        } else {
                            toastr.warning('No se encontraron usuarios');
                            swal.close();
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                        swal.close();
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar los usuarios');
                }
                swal.close();
            })
        }
    }

    $scope.agregarOpcionesGeografiaConfiguracion = function(array) {
        $('#jstreeConfig').jstree("destroy");
        $('#jstreeConfig').bind('loaded.jstree', function (e, data) {
            
        }).jstree({
            'plugins': ["wholerow", 'search', 'contextmenu'],
            'search': {
                "case_sensitive": false,
                "show_only_matches": true
            },
            'core': {
                "check_callback": true,
                'data': array,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    'icons': false
                }
            },
            "contextmenu" : {
                "items" :  function (o, cb){
                    var opciones = {};
                    if ($scope.configPermisoAccionRegistrarNodoGeografia) {
                        opciones.create = {};
                        opciones.create = 
                        {
                            "icon" : 'fa fa-plus',
                            "label"	: "Nueva Rama",
                            "_disabled" : false,
                            "action": function (data) {
                                var inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                               var  type = "";
                                inst.create_node(obj, {
                                   'text' : 'Nombre',
                                   'type' : type
                                }, "last", function (new_node) {
                                   try {
                                       inst.edit(new_node);
                                   } catch (ex) {
                                       setTimeout(function () { 
                                           inst.edit(new_node);
                                       },0);
                                   }
                                });
                            }
                        }
                    }
                    if ($scope.configPermisoAccionModificarNodoGeografia) {
                        opciones.rename = {};
                        opciones.rename = 
                        {
                            "separator_before"	: false,
                            "separator_after"	: false,
                            "_disabled"			: false,
                            "label"				: "Cambiar Nombre",
                            "shortcut_label"	: 'F2',
                            "icon"				: "fa fa-pen-fancy",
                            "action"			: function (data) { 
                                inst = $.jstree.reference(data.reference);
                                obj = inst.get_node(data.reference);
                                inst.edit(obj)
                            }
                        }
                    }
                    if ($scope.configPermisoAccionEliminarNodoGeografia) {
                        opciones.delete = {};
                        opciones.delete = 
                        {
                            "icon" : 'fa fa-trash',
                            "label" : "Borrar Rama",
                            "action"	: function (data) { 
                                var inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference)
                                bajaElemento(obj);
                            }
                        }
                    }
                    return opciones;
                }
            }
        });
        console.log("termina");
    }

    addReanameNode = function(rama){
        var isnum = /^\d+$/.test(rama.id);
        if(isnum){
            swal({
                title: "Se actualizar\u00E1 la informaci\u00F3n del nodo",
                text: "\u00BFDesea guardar la informaci\u00F3n?",
                type: "info",
                reverseButtons: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: "Cancelar",
            }).then(function (isConfirm) {
                if (isConfirm) {
                    let params = {};
                    params.geografia = [];
                    params.geografia.push({
                        id: rama.original.id,
                        descripcion: rama.text,
                        idPadre: rama.original.padre,
                        nivel: rama.original.nivel
                    });
                    $scope.gestionarGeocerca(params);
                }
            }).catch(err => {
                $scope.banderaConsultaGeografia = false;
                $scope.consultarCatalogoGeografia();
                toastr.warning('Operaci&oacute;n cancelada');
                $("#searchGeo").val("");
            });
        }else{
            swal({
                title: "Se agregar\u00E1 la informaci\u00F3n del nodo",
                text: "\u00BFDesea guardar la informaci\u00F3n?",
                type: "info",
                reverseButtons: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: "Cancelar",
            }).then(function (isConfirm) {
                if (isConfirm) {
                    let padre = $scope.listaGeografiaConfiguracion.find((e) => e.id == rama.parent);
                    let params = {};
                    params.geografia = [];
                    params.geografia.push({
                        id: "",
                        descripcion: rama.text,
                        idPadre: rama.parent,
                        nivel: (padre.nivel+1)
                    });
                    $scope.gestionarGeocerca(params);
                }
            }).catch(err => {
                $scope.banderaConsultaGeografia = false;
                $scope.consultarCatalogoGeografia();
                toastr.warning('Operaci&oacute;n cancelada');
                $("#searchGeo").val("");
            });
        }
    }

    function bajaElemento(rama){
        console.log(rama);
        swal({
            title: "Se eliminar\u00E1 la informaci\u00F3n del nodo",
            text: "\u00BFDesea eliminar la informaci\u00F3n?",
            type: "info",
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: "Cancelar",
        }).then(function (isConfirm) {
            if (isConfirm) {
                let params = {};
                params.id = rama.original.id;
                $scope.eliminarGeocerca(params);
            }
        }).catch(err => {
            $scope.banderaConsultaGeografia = false;
            $scope.consultarCatalogoGeografia();
            toastr.warning('Operaci&oacute;n cancelada');
            $("#searchGeo").val("");
        });
    }

    $scope.gestionarGeocerca = function(params) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionUniversalService.gestionGeocercas(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $scope.banderaConsultaGeografia = false;
                        $scope.consultarCatalogoGeografia();
                        toastr.success(response.data.result.mensaje);
                    } else {
                        toastr.warning('No se encontraron usuarios');
                    }
                    swal.close();
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
                swal.close();
            } else {
                toastr.error('Ha ocurrido un error al consultar los usuarios');
            }
            swal.close();
        })
    }

    $scope.eliminarGeocerca = function(params) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionUniversalService.eliminarGeocerca(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $scope.banderaConsultaGeografia = false;
                        $scope.consultarCatalogoGeografia();
                        toastr.success(response.data.result.mensaje);
                    } else {
                        toastr.warning('No se encontraron usuarios');
                    }
                    swal.close();
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
                swal.close();
            } else {
                toastr.error('Ha ocurrido un error al consultar los usuarios');
            }
            swal.close();
        })
    }

    $scope.crearNodo = function () {

    }

    $scope.modificarNodo = function () {

    }

    $scope.eliminarNodo = function () {

    }

    $scope.moverNodo = function (data) {

    }

    $scope.actualizarGeocerca = function () {
        let geografia = [];
        let params = {
            "id": 0,
            "descripcion": "string",
            "nivel": 0,
            "idPadre": 0,
            "ultimoNivel": true,
            "comentarios": "string"
        }


    }

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
        $("#moduloGestionUniversal").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

    });


}])