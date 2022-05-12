
var app = angular.module('ticketsSoporteApp', []);

app.controller('ticketsSoporteController', ['$scope', '$q', 'gestionTicketSoporteService', 'genericService', 'busquedaSalesforceService', '$filter', function ($scope, $q, gestionTicketSoporteService, genericService, busquedaSalesforceService, $filter) {
    app.ticketControllerMapa($scope, $q, gestionTicketSoporteService, genericService)
    app.busquedaSalesforce($scope, busquedaSalesforceService)
    var regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    let ticketSoporteTable;
    let tecnicosCuentaTable;
    $scope.listFallasTicket = [];
    $scope.listFallasTicketDetalle = [];
    $scope.listCategoriasTicket = [];
    $scope.listCategoriasTicketDetalle = [];
    $scope.listSubcategoriasTicket = [];
    $scope.listSubcategoriasTicketDetalle = [];
    $scope.catalogoFallasTicketSoporte = [];
    $scope.listMotivoEscala = {};
    $scope.catalogoTickets = [];
    $scope.listadoTecnicosTicket = [];
    $scope.ticketsSoporte = [];
    $scope.detalleCaptura = {};
    $scope.catalogoEstatusUsuarios = infoUsuarioEstatusHoras.result;
    $scope.contadores = {};
    $scope.isBusqueda = false;
    $scope.ticketSoporte = {};
    $scope.ticketSoporteR = {};
    $scope.tecnicoSeleccionado = '';
    $scope.categoriaSoporte = {};
    $scope.listCatTipoOrdenes = [];
    $scope.listCatRegiones = []
    $scope.listOrdenesCuenta = [];
    $scope.catGeografiaGeneral = [];
    $scope.catTipoOrdenesGeneral = [];
    $scope.ticketSoporteDetalle = {};
    $scope.listIngenieros = [];
    $scope.ingenieroSelect = {};
    $scope.isConsultaComentarios = false;
    $scope.nGeografiaConsultaTickets = null
    $scope.filtroBusqueda = {};
    $scope.propietarioSession = 0;
    $scope.equiposList = [];
    $scope.geografiaUsuarioList = [];
    $scope.tecnologiaList = [];
    $scope.estatusList = [];
    $scope.busquedaSf = {};
    $scope.nGeografiaConsultaUsuario = null
    $scope.nPuestoIngeniero = null
    $scope.nIntervencion = null
    $scope.nGeografia = null
    $scope.configPermisoAccionCreaTicket = false;
    $scope.configPermisoAccionConsultaTicket = false;
    $scope.configPermisoAccionModificarTicket = false;
    $scope.filtroBusqueda.tipoFechaConsulta = 'creacion';

    let ingenieroTable = $('#ingenierosTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    $scope.contentprincipal = true
    $scope.contentdetalleticket = false;

    $scope.cambioEquipo = {}
    $scope.agregarNuevoEquipoContent = false;
    $scope.listadoNuevoViejosEquipo = [];
    $scope.isEvaluarNuevoEquipo = false
    $scope.agregarRegistroCambioEquipo = function () {

        let isError = false

        if (!$scope.cambioEquipo.numSerieViejo) {
            isError = true
        }
        if (!$scope.cambioEquipo.numeSerieNuevo) {
            isError = true
        }

        if (!$scope.cambioEquipo.macNueva) {
            isError = true
        }
        if (!$scope.cambioEquipo.macViejo) {
            isError = true
        }

        if (!$scope.cambioEquipo.idTipoEquipo) {
            isError = true
        }

        if (isError) {
            $scope.isEvaluarNuevoEquipo = true
            return false;
        }

        $scope.listadoNuevoViejosEquipo.push({
            numSerieViejo: $scope.cambioEquipo.numSerieViejo,
            macViejo: $scope.cambioEquipo.macViejo,
            macNueva: $scope.cambioEquipo.macNueva,
            numeSerieNuevo: $scope.cambioEquipo.numeSerieNuevo,
            idTipoEquipo: $scope.cambioEquipo.idTipoEquipo,
            descripcion: $scope.equiposList.find((e) => e.id == $scope.cambioEquipo.idTipoEquipo).descripcion,
        })

        $scope.cambioEquipo = {}
        $scope.isEvaluarNuevoEquipo = false

    }

    $scope.changeEstatus = function () {
        $scope.validacionTicketDetalle = false;
        $scope.ticketSoporteDetalle.estado = '';
        $scope.ticketSoporteDetalle.motivo = '';
        $scope.ticketSoporteDetalle.comentarios = '';

    }

    $scope.eliminarRegistro = function (index) {
        swal({
            title: "\u00BFSeguro que desea eliminar el registro?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(function (isConfirm) {
            if (isConfirm) {
                $scope.listadoNuevoViejosEquipo.splice(index, 1);
                $scope.$apply()
            }
        }).catch(err => {

        });
    }
    $scope.mostrarFormularioNuevoEquipo = function () {
        $scope.agregarNuevoEquipoContent = $("#dictamen-2").is(":checked");
    }

    $scope.limpiarContentDetalleTicket = function () {
        $scope.cambioEquipo = {}
        $scope.agregarNuevoEquipoContent = false;
        $scope.listadoNuevoViejosEquipo = [];
        $scope.isEvaluarNuevoEquipo = false
    }
    $scope.cerrarDetalleTicket = function () {
        if ($scope.isBusqueda) {
            $scope.isBusqueda = false;
        } else {
            if ($scope.editTicket.detalleTicketSc.idEstatus !== 4 && $scope.editTicket.detalleTicketSc.idEstatus !== 5) {
                swal({
                    title: "\u00BFSeguro que desea salir del detalle?",
                    text: "Se perder\u00E1n los datos actualizados",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#007bff',
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No'
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        $scope.limpiarContentDetalleTicket();
                        $scope.contentdetalleticket = false;
                        $scope.validacionTicketDetalle = false;
                        $scope.contentprincipal = true;
                        $scope.isConsultaComentarios = false
                        $scope.busquedaSf = {};
                        $scope.$apply();
                    }
                }).catch(err => {

                });
            } else {
                $scope.limpiarContentDetalleTicket();
                $scope.contentdetalleticket = false;
                $scope.contentprincipal = true;
                $scope.isConsultaComentarios = false
            }
        }
    }

    app.noticiasGestionTicketSoporte($scope, gestionTicketSoporteService);


    $('#searchTextTicket').on('keyup', function () {
        $(".user-filter span").removeClass('selected-filter');
        $(".fa-filter").css('color', '#ccc');
        ticketSoporteTable.search(this.value).draw();
    })

    $('#searchTextCuenta').on('keyup', function () {
        $(".user-filter span").removeClass('selected-filter');
        $(".fa-filter").css('color', '#ccc');
        tecnicosCuentaTable.search(this.value).draw();
    })
    $scope.abrirModalGeografiaConsulta = function () {
        $("#searchGeo").val("");
        $("#jstree-consulta-tickets").jstree("search", '');
        $("#modal-jeografia-filtro").modal('show')
        setTimeout(function () {
            $("#searchGeo").focus();
        }, 750);
    }

    $('#searchGeo').on('keyup', function () {
        $("#jstree-consulta-tickets").jstree("search", this.value);
    })

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

    $scope.consultarCatalogosTicketSoporte = function () {
        $q.all([
            genericService.consultarConfiguracionDespachoDespacho({ moduloAccionesUsuario: 'moduloGestionTickets' }),
            gestionTicketSoporteService.consultaFallasTicketSoporte(),
            gestionTicketSoporteService.consultaCatalogoRegionTicketSoporte(),
            gestionTicketSoporteService.consultarCatalogoTipoOrdenTicketSoporte(),
            gestionTicketSoporteService.consulCatalogoGeografiaUsuarioDespacho(),
            gestionTicketSoporteService.consultarAccionesDinamicaDetalle(),
            gestionTicketSoporteService.consultaPropietariosTicketSoporte(),
            gestionTicketSoporteService.consultaEquiposSoporte(),
            gestionTicketSoporteService.consultaEstatusTicketSoporte(),
            gestionTicketSoporteService.consultaTecnologiaTicketSoporte()
        ]).then(function (results) {
            swal.close();
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $scope.elementosConfigGeneral = new Map(Object.entries(results[0].data.result))
                        let resultConf = results[0].data.result
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            let permisosResult = results[0].data.result.MODULO_ACCIONES_USUARIO;

                            $scope.nGeografia = parseInt(llavesResult.N_FILTRO_GEOGRAFIA_GESTION_TICKETS)
                            $scope.nIntervencion = parseInt(llavesResult.N_FILTRO_TIPO_ORDEN_GESTION_TICKETS)
                            $scope.nPuestoIngeniero = llavesResult.N_PUESTO_INGENIERO ? parseInt(llavesResult.N_PUESTO_INGENIERO) : 1;
                            $scope.nGeografiaConsultaTickets = llavesResult.N_FILTRO_GEOGRAFIA_CONSULTA;
                            $scope.nGeografiaConsultaUsuario = llavesResult.N_FILTRO_GEOGRAFIA_TIPO_USUARIO;

                            if (permisosResult != undefined && permisosResult.permisos != undefined && permisosResult.permisos.length > 0) {
                                $scope.configPermisoAccionCreaTicket = (permisosResult.permisos.filter(e => { return e.clave == "accionCreacionTickets" })[0] != undefined);
                                $scope.configPermisoAccionConsultaTicket = (permisosResult.permisos.filter(e => { return e.clave == "accionConsultaTickets" })[0] != undefined);
                                $scope.configPermisoAccionModificarTicket = (permisosResult.permisos.filter(e => { return e.clave == "accionModificaTickets" })[0] != undefined);
                            }

                            if ($scope.configPermisoAccionCreaTicket && !$scope.configPermisoAccionConsultaTicket) {
                                setTimeout(function () {
                                    $("#opcion-creatickets-tab").click();
                                }, 300)
                            }

                            validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                            validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

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
            $("#idBody").css("display", "block")
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        $scope.catalogoTickets = arrayListadoTickets.data.result.catalogoTickets;
                        $scope.catalogoFallasTicketSoporte = angular.copy(results[1].data.result.soportes);
                        let nivel1 = [];
                        $scope.catalogoTickets.map(function (e) {
                            if (e.nivel == "1") {
                                nivel1.push(e);
                            }
                        });
                        $scope.listMotivoEscala.catalogoNivel1 = nivel1;
                        $scope.catalogoFallasTicketSoporte.map(function (e) {
                            if (e.nivel == "1") {
                                $scope.listFallasTicket.push(e);
                                $scope.listFallasTicketDetalle.push(e);
                            }
                        });

                    } else {
                        toastr.warning('No se encontraron fallas');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de fallas');
            }
            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        $scope.catGeografiaGeneral = results[2].data.result.geografia;
                        $scope.nGeografia = $scope.nGeografia ? $scope.nGeografia : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result.geografia);
                        $scope.listCatRegiones = results[2].data.result.geografia.filter(elemento => { return elemento.nivel <= $scope.nGeografia });
                        $scope.nGeografiaConsultaUsuario = $scope.nGeografiaConsultaUsuario ? $scope.nGeografiaConsultaUsuario : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result.geografia);
                        $scope.geografiaUsuarioList = results[2].data.result.geografia.filter(elemento => { return elemento.nivel == $scope.nGeografiaConsultaUsuario });
                    } else {
                        toastr.warning('No se encontraron datos para la region');
                    }
                } else {
                    toastr.warning(results[2].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de la region');
            }
            if (results[3].data !== undefined) {
                if (results[3].data.respuesta) {
                    if (results[3].data.result) {
                        $scope.catTipoOrdenesGeneral = results[3].data.result;
                        $scope.nIntervencion = $scope.nIntervencion ? $scope.nIntervencion : $scope.obtenerNivelUltimoJerarquiaGeneric(results[3].data.result);
                        $scope.listCatTipoOrdenes = results[3].data.result.filter(elemento => { return elemento.nivel <= $scope.nIntervencion });

                    } else {
                        toastr.warning('No se encontraron datos para tipo de ordenes');
                    }
                } else {
                    toastr.warning(results[2].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de las ordenes');
            }

            if (results[4].data !== undefined) {
                if (results[4].data.respuesta) {
                    if (results[4].data.result) {
                        $scope.listadoGeografiaSoporte = results[4].data.result.geografia
                        $scope.nGeografiaConsultaTickets = $scope.nGeografiaConsultaTickets ? $scope.nGeografiaConsultaTickets : $scope.obtenerNivelUltimoJerarquiaGeneric(results[4].data.result.geografia);
                        let listGeografias = results[4].data.result.geografia.filter(elemento => { return elemento.nivel <= $scope.nGeografiaConsultaTickets });

                        let geografia = listGeografias
                        geografia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
                        geografia.map((e) => {
                            e.parent = e.padre == null ? 0 : e.padre;
                            e.text = e.nombre;
                            e.icon = "fa fa-globe";
                            e.state = { opened: true, selected: true }
                            return e
                        })
                        $('#jstree-consulta-tickets').bind('loaded.jstree', function (e, data) {
                            var geografias = $('#jstree-consulta-tickets').jstree("get_selected", true);
                            let textoGeografias = [];
                            angular.forEach(geografias, (geografia, index) => {
                                textoGeografias.push(geografia.text);
                            });
                            $('#txtGeografiasConsulta').val(textoGeografias);
                            if ($scope.configPermisoAccionConsultaTicket) {
                                $scope.consultarTicketsSoporte();
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
                        toastr.warning('No se encontraron datos para la geograf\u00EDa');
                    }
                } else {
                    toastr.warning(results[4].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de las ordenes');
            }
            if (results[5].data.respuesta) {
                if (results[5].data.result) {
                    $scope.accionesDinamicasDetalle = results[5].data.result.acciones
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la consulta de catalogos.')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de catalogos.')
            }
            if (results[6].data.respuesta) {
                if (results[6].data.result) {
                    $scope.escalamientoListDetalle = results[6].data.result.propietarios
                    $scope.estadoEscalamientoDetalle = results[6].data.result.propietarios.filter(elemento => { return Number(elemento.nivel) == 1 })
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la consulta de propietarios.')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de propietarios.')
            }

            if (results[7].data.respuesta) {
                if (results[7].data.result) {
                    $scope.equiposList = results[7].data.result.equipos;
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la consulta de equipos.')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de equipos.')
            }

            if (results[8].data.respuesta) {
                if (results[8].data.result) {
                    $scope.estatusList = results[8].data.result.estatusTicketSC;
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la consulta de estatus.')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de estatus.')
            }

            if (results[9].data.respuesta) {
                if (results[9].data.result) {
                    $scope.tecnologiaList = results[9].data.result.tecnologiaTicketSC;
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la consulta de tecnolog\u00EDas.')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de tecnolog\u00EDas.')
            }
        });
    }

    $("#modal-jeografia-filtro").on("hidden.bs.modal", function () {
        var geografias = $('#jstree-consulta-tickets').jstree("get_selected", true);
        let textoGeografias = [];
        angular.forEach(geografias, (geografia, index) => {
            textoGeografias.push(geografia.text);
        });
        $('#txtGeografiasConsulta').val(textoGeografias);
    })

    $scope.initTicketsSoporte = function () {
        $scope.consultarCatalogosTicketSoporte();
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('.datepicker').datepicker('update', new Date());

        tecnicosCuentaTable = $('#tecnicosCuentaTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
        ticketSoporteTable = $('#tableTicketSoporte').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "searching": false,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
    }


    $scope.initTicketsSoporte();

    $scope.loadCategoriaTicketSoporte = function (type) {
        if (type == 'registro') {
            $scope.listCategoriasTicket = [];
            let idFallaTicket = $("#fallaTicket").val();
            $scope.catalogoFallasTicketSoporte.map(function (c) {
                if (c.idPadre == idFallaTicket) {
                    $scope.listCategoriasTicket.push(c);
                }
            });
        } else {
            $scope.listCategoriasTicketDetalle = [];
            let idFallaTicketD = $("#fallaTicketD").val();
            $scope.catalogoFallasTicketSoporte.map(function (c) {
                if (c.idPadre == idFallaTicketD) {
                    $scope.listCategoriasTicketDetalle.push(c);
                }
            });
        }
    }

    $scope.loadSubcategoriaTicketSoporte = function (type) {
        if (type == 'registro') {
            $scope.listSubcategoriasTicket = [];
            let idCategoriaTicket = $("#categoriaTicket").val()
            $scope.catalogoFallasTicketSoporte.map(function (s) {
                if (s.idPadre == idCategoriaTicket) {
                    $scope.listSubcategoriasTicket.push(s);
                }
            });
        } else {
            $scope.listSubcategoriasTicketDetalle = [];
            let idCategoriaTicketD = $("#categoriaTicketD").val()
            $scope.catalogoFallasTicketSoporte.map(function (s) {
                if (s.idPadre == idCategoriaTicketD) {
                    $scope.listSubcategoriasTicketDetalle.push(s);
                }
            });
        }
    }

    $scope.loadMotivoEscala = function () {
        let nivel2 = [];
        let idEscala = $("#escalarTicket").val();
        $scope.catalogoTickets.map(function (s) {
            if (s.padre == idEscala) {
                nivel2.push(s);
            }
        });
        $scope.listMotivoEscala.catalogoNivel2 = nivel2;
    }

    openModalBusquedaTecnicosTicket = function () {
        $scope.listadoTecnicosTicket = [];
        $("#searchTecnicoTicket").val('');
        $scope.listadoTecnicosTicket = [];
        $scope.tecnicoBusqueda = '';
        $scope.$apply();
        $("#modalBusquedaTecnicosTicket").modal('show');
    }

    $scope.asignarTecnicoTicket = function () {
        $scope.tecnicoAsignado = $scope.listOrdenesCuenta.find(function (elem) { return elem.isChecked == true });
        if ($scope.tecnicoAsignado && $scope.tecnicoAsignado.isChecked) {
            swal({
                title: "\u00BFEst\u00E1 seguro de relacionar la OT FFM seleccionada con el ticket ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(function (isConfirm) {
                if (isConfirm) {

                    //---------------------------------------Código reynel
                    $scope.agregarMarkerMapCrearTicket($scope.tecnicoAsignado.latitud, $scope.tecnicoAsignado.longitud);
                    $scope.tecnicoAsignado.nombreTecnico = $scope.tecnicoAsignado.nombre + " " + $scope.tecnicoAsignado.apellidoPaterno + " " + $scope.tecnicoAsignado.apellidoMaterno;
                    if ($scope.tecnicoAsignado.idUnidadNegocio == 1) {
                        $scope.tecnicoAsignado.unidadNegocio = "Residencial";
                    } else if ($scope.tecnicoAsignado.idUnidadNegocio == 2) {
                        $scope.tecnicoAsignado.unidadNegocio = "Empresarial";
                    } else {
                        $scope.tecnicoAsignado.unidadNegocio = null;
                    }

                    let nombreOrden = $scope.listCatTipoOrdenes.find(e => { return e.id == $scope.tecnicoAsignado.idIntervencion });
                    $scope.tecnicoAsignado.tipoOrden = nombreOrden ? nombreOrden.nombre : 'Sin dato';

                    let geografiaTecnicoAsignadoCluster = $scope.catGeografiaGeneral.find(e => e.id == Number($scope.tecnicoAsignado.idGeografia));
                    if (geografiaTecnicoAsignadoCluster) {
                        let geografiaTecnicoAsignadoZona = $scope.catGeografiaGeneral.find(e => e.id == Number(geografiaTecnicoAsignadoCluster.padre));
                        let geografiaTecnicoAsignadoDistrito = $scope.catGeografiaGeneral.find(e => e.id == Number(geografiaTecnicoAsignadoZona.padre));
                        let geografiaTecnicoAsignadoCiudad = $scope.catGeografiaGeneral.find(e => e.id == Number(geografiaTecnicoAsignadoDistrito.padre));
                        let geografiaTecnicoAsignadoRegion = $scope.catGeografiaGeneral.find(e => e.id == Number(geografiaTecnicoAsignadoCiudad.padre));

                        $scope.tecnicoAsignado.cluster = camelCase(geografiaTecnicoAsignadoCluster.nombre);
                        $scope.tecnicoAsignado.zona = camelCase(geografiaTecnicoAsignadoZona.nombre);
                        $scope.tecnicoAsignado.distrito = camelCase(geografiaTecnicoAsignadoDistrito.nombre);
                        $scope.tecnicoAsignado.ciudad = camelCase(geografiaTecnicoAsignadoCiudad.nombre);
                        $scope.tecnicoAsignado.region = camelCase(geografiaTecnicoAsignadoRegion.nombre);
                        $scope.ticketSoporteR.region = $scope.tecnicoAsignado.idGeografia;
                    }


                    //---------------------------------------Fin código reynel

                    let nombreTecnico = $scope.tecnicoAsignado.nombre + ' ' + $scope.tecnicoAsignado.apellidoPaterno + ' ' + $scope.tecnicoAsignado.apellidoMaterno;
                    $scope.ticketSoporteR.tipoOrden = $scope.tecnicoAsignado.idIntervencion.toString();
                    $scope.ticketSoporteR.tipoNegocio = $scope.tecnicoAsignado.idUnidadNegocio.toString();
                    $scope.ticketSoporteR.tecnico = nombreTecnico;
                    $scope.ticketSoporteR.telefonoTecnico = $scope.tecnicoAsignado.telefono;
                    $scope.ticketSoporteR.idOrden = $scope.tecnicoAsignado.id;
                    $scope.ticketSoporteR.idTecnico = $scope.tecnicoAsignado.idUsuario;
                    $scope.ticketSoporteR.otTicket = $scope.tecnicoAsignado.id;
                    $scope.ticketSoporteR.folioTicket = $scope.tecnicoAsignado.folioSistema;
                    $("#modalBusquedaCuentaTicket").modal('hide');
                    swal.close();
                    $scope.$apply();
                }
            }, function (dismiss) {
                if (dismiss == 'cancel') {
                    $scope.tecnicoAsignado = {};
                    $scope.$apply();
                }
            });
        } else {
            mostrarMensajeInformativo("Debes seleccionar una OT para poder relacionar al ticket");
        }
    }

    changeCheck = function (event) {
        $.each($scope.listOrdenesCuenta, function (i, elemento) {
            if (elemento.isChecked) {
                elemento.isChecked = false;
                $('#tec-' + elemento.id).prop('checked', false);
                $scope.$apply();
            } else {
                if ($(event).attr('id').split('-')[1] == elemento.id) {
                    elemento.isChecked = true;
                }
            }
        })
        $scope.$apply();
    }

    $scope.tempClaveCliente = '';
    $scope.consultarCuentaCliente = function () {
        if ($scope.tempClaveCliente == $('#cuentaTicket').val())
            return false

        if (!$('#cuentaTicket').val().trim()) {
            $scope.tempClaveCliente = $('#cuentaTicket').val()
            return false
        }

        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        $scope.listOrdenesCuenta = [];
        $scope.claveCliente = $('#cuentaTicket').val();
        let paramsCuenta = {
            'claveCliente': $scope.claveCliente
        }
        $scope.tempClaveCliente = $('#cuentaTicket').val()
        gestionTicketSoporteService.consultaCuentaClienteTicketSoporte(paramsCuenta).then(function success(response) {
            let arrayRow = [];
            $scope.ticketSoporteR.idTecnico = ''
            $scope.tecnicoAsignado = {}
            if (tecnicosCuentaTable) {
                tecnicosCuentaTable.destroy();
            }
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.ordenesTrabajo.length) {
                        $scope.listOrdenesCuenta = response.data.result.ordenesTrabajo;
                        $scope.listOrdenesCuenta.map(function (e) { e.isChecked = false; return e; })
                        $.each($scope.listOrdenesCuenta, function (i, elemento) {
                            let row = [];
                            let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';
                            let url = imgDefault;
                            if (elemento.urlFoto) {
                                url = regexUrl.test(elemento.urlFoto) ? elemento.urlFoto : imgDefault;
                            }
                            let nombreCompleto = elemento.nombre + ' ' + elemento.apellidoPaterno + ' ' + elemento.apellidoMaterno;
                            row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="30" height="30"/>';
                            row[1] = elemento.id;
                            row[2] = elemento.folioSistema;
                            row[3] = elemento.numEmpleado;
                            row[4] = elemento.usuarioFFM;
                            row[5] = nombreCompleto;
                            row[6] = elemento.telefono;
                            row[7] = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="form-check-input checkTecnico" onclick="changeCheck(this)" type="checkbox" name="checkTecnico" value="' + i + '" id="tec-' + elemento.id + '">';
                            arrayRow.push(row);
                        });

                        $scope.initTableTecnicosOtsDisp(arrayRow);

                        $("#modalBusquedaCuentaTicket").modal('show');
                    } else {
                        mostrarMensajeWarningValidacion("No se encontraron &Oacute;rdenes de Trabajo asociadas a la Cuenta");
                        $scope.initTableTecnicosOtsDisp(arrayRow);
                    }
                } else {
                    mostrarMensajeWarningValidacion("No se encontraron &Oacute;rdenes de Trabajo asociadas a la Cuenta");
                    $scope.initTableTecnicosOtsDisp(arrayRow);
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion);
                $scope.initTableTecnicosOtsDisp(arrayRow);
            }
            swal.close();
        });
    }
    $scope.initTableTecnicosOtsDisp = function (arrayRow, listadoOrdenes) {

        tecnicosCuentaTable = $('#tecnicosCuentaTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            'fnCreatedRow': function (nRow, aData, iDataIndex) {
                $(nRow).attr('id', 'tecnico_' + aData[1]); // or whatever you choose to set as the id
            },
        });

        if (arrayRow && arrayRow.length > 0) {
            document.getElementById('tecnicosCuentaTable_paginate').addEventListener('click', function () {
                $.each($scope.listOrdenesCuenta, function (i, elemento) {
                    if (!elemento.isChecked) {
                        $('#tec-' + elemento.id).prop('checked', false);
                    }
                    $scope.$apply();
                });
            })
        }
    }

    $scope.isSearchCuenta = false;
    $('#cuentaTicket').keypress(function (e) {
        if (e.which == 13 && !$scope.isSearchCuenta) {
            $scope.isSearchCuenta = true;
            $scope.tempClaveCliente = '';
            $scope.consultarCuentaCliente();
            return false;
        }
    });

    $('#cuentaTicket').blur(function () {
        if (!$scope.isSearchCuenta) {
            $scope.isSearchCuenta = true;
            $scope.tempClaveCliente = '';
            $scope.consultarCuentaCliente();
            return false;
        }
    })



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

    $(".inputTicket").keyup(function () {
        var input = $(this).attr("id");
        if ($(this).val() === "" || $(this).val() === undefined) {
            $("#" + input).addClass("invalid-inputTicket");
        } else {
            $("#" + input).removeClass("invalid-inputTicket");
        }
    });

    $("#fallaTicket").change(function () {
        $("#fallaTicket").removeClass("invalid-inputTicket");
    });

    $("#categoriaTicket").change(function () {
        $("#categoriaTicket").removeClass("invalid-inputTicket");
    });

    $("#subcategoriaTicket").change(function () {
        $("#subcategoriaTicket").removeClass("invalid-inputTicket");
    });
    $("#tecnologiaTicket").change(function () {
        $("#tecnologiaTicket").removeClass("invalid-inputTicket");
    });
    $scope.validacionTicket = false;
    $scope.isGuardadoProcess = false
    $scope.isMensajeSuccessOt = false
    $scope.isMensajeErrorOt = false

    $scope.registrarTicketSoporte = function () {
        $scope.isGuardadoProcess = false
        $scope.isMensajeSuccessOt = false
        $scope.isMensajeErrorOt = false

        $scope.validacionTicket = false;
        let mensajeError = '';
        let isValid = true;

        if ($("#cuentaTicket").val() == undefined || $("#cuentaTicket").val() == '') {
            mensajeError += "<li>Ingrese n&uacute;mero de cuenta</li>";
            $("#cuentaTicket").addClass("invalid-inputTicket");
            isValid = false;
        } else {
            $("#cuentaTicket").removeClass("invalid-inputTicket");
        }

        if ($scope.ticketSoporteR.idTecnico == undefined || !$scope.ticketSoporteR.idTecnico) {
            mensajeError += "<li>Seleccione orden de trabajo</li>";
            $("#cuentaTicket").addClass("invalid-inputTicket");
            isValid = false;
        } else {
            $("#cuentaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#noSerieTicket").val() == undefined || $("#noSerieTicket").val() == '') {
            mensajeError += "<li>Ingrese n&uacute;mero de serie del ticket</li>";
            $("#noSerieTicket").addClass("invalid-inputTicket");
            isValid = false;
        } else {
            $("#noSerieTicket").removeClass("invalid-inputTicket");
        }

        if ($("#descripcionProblemaTicket").val() == undefined || $("#descripcionProblemaTicket").val() == '') {
            $("#descripcionProblemaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Ingrese descripci&oacute;n del problema</li>";
            isValid = false;
        } else {
            $("#descripcionProblemaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#fallaTicket").val() == undefined || $("#fallaTicket").val() == '') {
            $("#fallaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Seleccione falla</li>";
            isValid = false;
        } else {
            $("#fallaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#categoriaTicket").val() == undefined || $("#categoriaTicket").val() == '') {
            $("#categoriaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Seleccione categor&iacute;a</li>";
            isValid = false;
        } else {
            $("#categoriaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#subcategoriaTicket").val() == undefined || $("#subcategoriaTicket").val() == '') {
            $("#subcategoriaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Seleccione subcategor&iacute;a</li>";
            isValid = false;
        } else {
            $("#subcategoriaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#tecnologiaTicket").val() == undefined || $("#tecnologiaTicket").val() == '') {
            $("#tecnologiaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Seleccione tecnolog&iacute;a</li>";
            isValid = false;
        } else {
            $("#tecnologiaTicket").removeClass("invalid-inputTicket");
        }

        if (isValid) {
            swal({
                title: "\u00BFEst\u00E1 seguro de registrar el Ticket?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    $scope.fallaTicketR = $scope.catalogoFallasTicketSoporte.find(function (elem) { return Number(elem.id) == Number($scope.ticketSoporteR.fallaTicket) });
                    $scope.categoriaTicketR = $scope.catalogoFallasTicketSoporte.find(function (elem) { return Number(elem.id) == Number($scope.ticketSoporteR.categoriaTicket) });
                    $scope.subcategoriaTicketR = $scope.catalogoFallasTicketSoporte.find(function (elem) { return Number(elem.id) == Number($scope.ticketSoporteR.subcategoriaTicket) });

                    let paramsTicket = {
                        "idTecnico": Number($scope.ticketSoporteR.idTecnico),
                        "idOrden": $scope.ticketSoporteR.idOrden,
                        "telefonoTecnico": Number($scope.ticketSoporteR.telefonoTecnico),
                        "noCuenta": $scope.ticketSoporteR.cuenta,
                        "idFalla": Number($scope.fallaTicketR.id),
                        "idcodificacionSfFalla": $scope.fallaTicketR.codificacionSf,
                        "idCategoria": Number($scope.categoriaTicketR.id),
                        "idcodificacionSfCategoria": $scope.categoriaTicketR.codificacionSf,
                        "idSubCategoria": Number($scope.subcategoriaTicketR.id),
                        "idcodificacionSfSubCategoria": $scope.subcategoriaTicketR.codificacionSf,
                        "idGrupoCodificacionSf": $scope.subcategoriaTicketR.grupoCodificadorSf,
                        "comentarios": $scope.ticketSoporteR.descripcionProblema,
                        "noSerieOld": $scope.ticketSoporteR.noSerieOld,
                        "noSerieNew": null,
                        "idTipoOrden": Number($scope.ticketSoporteR.tipoOrden),
                        "idTipoNegocio": Number($scope.ticketSoporteR.tipoNegocio),
                        "idRegion": Number($scope.ticketSoporteR.region),
                        "idTecnologia": Number($scope.ticketSoporteR.tecnologia),
                        "idApplication": 1,
                        "informacionAdicional": [{}]
                    }
                    if ($scope.ticketSoporteR.noSerieNew) {
                        paramsTicket.noSerieNew = $scope.ticketSoporteR.noSerieNew
                    }
                    gestionTicketSoporteService.creaTicketSoporte(paramsTicket).then(function success(response) {
                        $scope.isMensajeSuccessOt = false
                        $scope.isMensajeErrorOt = false
                        $scope.isGuardadoProcess = true
                        if (response.data !== undefined) {
                            if (response.data.respuesta) {
                                $scope.tecnicoAsignado = {};
                                if ($scope.configPermisoAccionConsultaTicket) {
                                    $scope.consultarTicketsSoporte();
                                } else {
                                    swal.close();
                                }
                                $scope.cleanForm();
                                toastr.success(response.data.resultDescripcion);
                                $scope.isMensajeSuccessOt = true

                            } else {
                                swal.close();
                                mostrarMensajeErrorAlert(response.data.resultDescripcion);
                                $scope.isMensajeErrorOt = true
                            }
                            $scope.mensajeRequestCreacion = response.data.resultDescripcion

                        } else {
                            swal.close();
                            mostrarMensajeErrorAlert(response.data.resultDescripcion);
                            $scope.mensajeRequestCreacion = response.data.resultDescripcion
                            $scope.isMensajeErrorOt = true
                        }
                    });
                }
            }).catch(err => {
            });
        } else {
            $scope.validacionTicket = true;
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }


    $scope.consultarTicketsSoporte = function () {
        $("#container_noticias_ticket").hide();
        $(".user-filter span").removeClass('selected-filter');
        $(".fa-filter").css('color', '#ccc');
        $("#spanTodos").addClass('selected-filter');
        $("#filterTodos").css('color', '#7716fa');
        let mensajeError = '';
        let isValid = true;
        $scope.ticketSoporte = {};
        $scope.ticketsSoporte = [];
        $scope.contadores.abierto = 0;
        $scope.contadores.cerrado = 0;
        $scope.contadores.escalado = 0;
        $scope.contadores.pendiente = 0;
        $scope.contadores.cancelado = 0;
        if (!$scope.validarFecha('filtro_fecha_inicio_ticket', 'filtro_fecha_fin_ticket')) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
            isValid = false;
        }
        var geografias = $('#jstree-consulta-tickets').jstree("get_selected", true);
        let tempGeografiaNivel = geografias.filter(e => e.original.nivel == $scope.nGeografiaConsultaTickets)
        if (tempGeografiaNivel == undefined || tempGeografiaNivel.length <= 0) {
            mensajeError += "<li>Selecciona un elemento de la geograf&iacute;a</li>";
            isValid = false;
        }
        if (isValid) {
            let params = {
                fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_ticket').value),
                fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_ticket').value),
                tipoFecha: $scope.filtroBusqueda.tipoFechaConsulta,
                idGeografias: tempGeografiaNivel.map(e => parseInt(e.id)),
                folioSistema: $scope.filtroBusqueda.folio ? $scope.filtroBusqueda.folio : "",
                claveCliente: $scope.filtroBusqueda.cuenta ? $scope.filtroBusqueda.cuenta : "",
                elementos: 10
            }
            // console.log(params);
            if (!swal.isVisible()) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
            }
            if (ticketSoporteTable) {
                ticketSoporteTable.destroy();
            }
            ticketSoporteTable = $('#tableTicketSoporte').DataTable({
                "processing": false,
                "ordering": false,
                "serverSide": true,
                "scrollX": false,
                "paging": true,
                "info": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "pageLength": 10,
                "ajax": {
                    "url": "req/consultaTicketsSoporte",
                    "type": "POST",
                    "data": params,
                    "beforeSend": function () {
                        if (!swal.isVisible()) {
                            swal({ text: 'Cargando registros...', allowOutsideClick: false });
                            swal.showLoading();
                        }

                    },
                    "dataSrc": function (json) {
                        $scope.ticketsSoporte = [];
                        if (json.result != undefined && json.result.ordenes != undefined)
                            $scope.ticketsSoporte = json.result.tickets;

                        return json.data;
                    },
                    "error": function (xhr, error, thrown) {
                        handleError(xhr);
                    },
                    "complete": function () {
                        swal.close()
                    }
                },
                "columns": [null, null, null, null, null, null, null, null, null, null, null],
                "language": idioma_espanol_not_font,
                "drawCallback": function (settings) {
                    if (!$scope.configPermisoAccionModificarTicket) {
                        $(".btn-option").addClass("estiloBlockIconoPermiso");
                        $(".btn-option i").removeClass("fa-bars");
                        $(".btn-option i").addClass("fa-unlock");
                    }
                }
            });


        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.accionesDinamicasDetalle = []
    $scope.escalamientoListDetalle = []
    $scope.estadoEscalamientoDetalle = []
    $scope.ticketDetalle = 0

    consultaDetalleTicketSoporte = function (ticket, cliente) {
        if ($scope.configPermisoAccionModificarTicket) {
            $scope.ticketDetalle = ticket;
            $('.dictamen-info').prop('checked', false);
            $scope.ticketSoporteDetalle = {};
            $scope.propietarioSession = $("#prop-session").val().split('_')[0];
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            $scope.consultarDetalleTicketSoporteCentralizado(ticket, cliente)
        }

    }

    function camelCase(text) {
        let arr = text.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].toLowerCase();
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ");
    }

    $scope.editTicket = {}
    $scope.consultarDetalleTicketSoporteCentralizado = function (ticket, cliente) {
        $scope.editTicket = {}
        $scope.contentdetalleticket = false;
        $(".accordion-button").addClass("collapsed");
        $(".accordion-collapse").removeClass("show");
        $("#panelsStayOpen-headingOne .accordion-button").click();
        $("#panelsStayOpen-headingTwo .accordion-button").click();

        $q.all([
            gestionTicketSoporteService.consultarDetalleTicketGestion(ticket),
            gestionTicketSoporteService.consultaCuentaClienteTicketSoporte({ 'claveCliente': cliente })
        ]).then(results => {
            swal.close();
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $scope.limpiarContentDetalleTicket()
                        $scope.contentdetalleticket = true;
                        $scope.contentprincipal = false
                        $scope.editTicket = results[0].data.result.detalleGeneral;
                        $scope.consultaChat();
                        if ($scope.editTicket.detalleTicketSc.falla && $scope.catalogoFallasTicketSoporte.length) {
                            $scope.ticketSoporteDetalle.fallaTicketD = $scope.editTicket.detalleTicketSc.falla + '';
                            $scope.ticketSoporteDetalle.categoriaTicketD = $scope.editTicket.detalleTicketSc.categoria + '';
                            $scope.ticketSoporteDetalle.subcategoriaTicketD = $scope.editTicket.detalleTicketSc.subcategoria + '';
                        }
                        if ($scope.editTicket.detalleTicketSc.idPropietarioSc && $scope.estadoEscalamientoDetalle.length) {
                            $scope.ticketSoporteDetalle.estado = $scope.editTicket.detalleTicketSc.idPropietarioSc + '';
                            $scope.motivosSelectDetalle();
                            setTimeout(() => {
                                $scope.ticketSoporteDetalle.motivo = $scope.editTicket.detalleTicketSc.idMotivoSc + '';
                                $scope.$apply();
                            }, 300);
                        }
                        $scope.listCategoriasTicketDetalle = [];
                        $scope.catalogoFallasTicketSoporte.map(function (c) {
                            if (c.idPadre == $scope.editTicket.detalleTicketSc.falla) {
                                $scope.listCategoriasTicketDetalle.push(c);
                            }
                        });
                        $scope.listSubcategoriasTicketDetalle = [];
                        $scope.catalogoFallasTicketSoporte.map(function (s) {
                            if (s.idPadre == $scope.editTicket.detalleTicketSc.categoria) {
                                $scope.listSubcategoriasTicketDetalle.push(s);
                            }
                        });

                        $scope.ticketSoporteDetalle.estatus = $scope.editTicket.detalleTicketSc.idEstatus == 1 ? '' : $scope.editTicket.detalleTicketSc.idEstatus + '';
                        $scope.ticketSoporteDetalle.comentarios = $scope.editTicket.detalleTicketSc.comentarios;
                        $scope.ticketSoporteDetalle.tecnologia = $scope.editTicket.detalleTicketSc.idTecnologia + '';

                        let urlTec = regexUrl.test($scope.editTicket.detalleOtDetenida.fotoTecnico) ? $scope.editTicket.detalleOtDetenida.fotoTecnico : "./resources/img/plantainterna/despacho/tecnicootasignada.png";
                        let urlIng = regexUrl.test($scope.editTicket.detalleTicketSc.fotoInge) ? $scope.editTicket.detalleTicketSc.fotoInge : "./resources/img/plantainterna/despacho/tecnicootasignada.png";

                        setTimeout(() => {
                            $("#fotoIngeniero").attr("src", urlIng);
                            $("#fotoTecnico").attr("src", urlTec);
                        }, 100);
                        if ($scope.editTicket.detalleTicketSc.acciones.length && $scope.accionesDinamicasDetalle.length) {
                            $scope.editTicket.detalleTicketSc.acciones.map(function (s) {
                                if (Number(s.valor) == 1) {
                                    $("#dictamen-" + s.idAccion).prop('checked', true);
                                    if (Number(s.idAccion) == 2) {
                                        $scope.agregarNuevoEquipoContent = true;
                                        if (s.equipos.length) {
                                            $.each(s.equipos, function (i, equipo) {
                                                equipo.descripcion = $scope.equiposList.find((e) => e.id == equipo.idTipoEquipo).descripcion
                                            })
                                        }
                                        $scope.listadoNuevoViejosEquipo = s.equipos ? s.equipos : [];
                                    }
                                }
                            });
                        }
                        if ($scope.editTicket.detalleTicketSc.idEstatus == 4 || $scope.editTicket.detalleTicketSc.idEstatus == 5 || !$scope.editTicket.detalleTicketSc.usuarioInge) {
                            $(".content-detalle-ticket .inputTicket").prop("disabled", true);
                            $("#detalleTicketAccordion .dictamen-info").prop("disabled", true);
                            $(".btn-disabled").prop("disabled", true);
                            $("#btnGuardarCambios").prop("disabled", true);

                        } else {
                            $(".content-detalle-ticket .inputTicket").prop("disabled", false);
                            $("#detalleTicketAccordion .dictamen-info").prop("disabled", false);
                            $(".btn-disabled").prop("disabled", false);
                            $("#btnGuardarCambios").prop("disabled", false);
                        }

                        let clusterInd = $scope.listadoGeografiaSoporte.find(e => e.id == $scope.editTicket.detalleOtDetenida.idCluster)
                        if (clusterInd) {
                            let zonaInd = $scope.listadoGeografiaSoporte.find(e => e.id == parseInt(clusterInd.padre))
                            let distritoInd = $scope.listadoGeografiaSoporte.find(e => e.id == parseInt(zonaInd.padre))
                            let ciudadInd = $scope.listadoGeografiaSoporte.find(e => e.id == parseInt(distritoInd.padre))
                            let regionInd = $scope.listadoGeografiaSoporte.find(e => e.id == parseInt(ciudadInd.padre))
                            $scope.editTicket.clusterText = camelCase(clusterInd.nombre)
                            $scope.editTicket.zonaText = camelCase(zonaInd.nombre)
                            $scope.editTicket.distritoText = camelCase(distritoInd.nombre)
                            $scope.editTicket.ciudadText = camelCase(ciudadInd.nombre)
                            $scope.editTicket.regionText = camelCase(regionInd.nombre)
                        }

                    } else {
                        mostrarMensajeInformativo("No se encontr&oacute; informaci&oacute;n del ticket");
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del ticket');
            }

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        let tecnicosByCuenta = results[1].data.result.ordenesTrabajo;
                        let tecnico = tecnicosByCuenta.find((e) => e.idUsuario == results[0].data.result.detalleGeneral.detalleOtDetenida.idTecnico);
                        $scope.editTicket.tecnico = tecnico;

                    } else {
                        mostrarMensajeInformativo("No se encontr&oacute; informaci&oacute;n del ticket");
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del ticket');
            }
        }).catch((err) => handleError(err));

    }

    $scope.closeDetalleTicketSoporte = function () {
        $("#container_noticias_ticket").hide();
    }

    asignaTicket = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $("#modalBusquedaTecnicosTicket").modal('show');
        swal.close();
    }

    $scope.filter = function (type) {
        let id = '#filter' + type;
        let idSpan = '#span' + type;
        $(".user-filter span").removeClass('selected-filter');
        $(".fa-filter").css('color', '#ccc');

        $(id).css('color', '#7716fa');
        $(idSpan).addClass('selected-filter');
    }

    $scope.cleanForm = function () {
        $scope.ticketSoporteR = {};
        $scope.tecnicoSeleccionado = {};
        $("#cuentaTicket").val('');
        $("#telefonoTicket").val('');
        $("#noSerieTicket").val('');
        $("#noSerieNuevoEquipo").val('');
        $("#fallaTicket").prop('selectedIndex', 0);
        $("#categoriaTicket").prop('selectedIndex', 0);
        $("#subcategoriaTicket").prop('selectedIndex', 0);
        $("#tipoOrdenTicket").prop('selectedIndex', 0);
        $("#tipoNegocio").prop('selectedIndex', 0);
        $("#regionTicket").prop('selectedIndex', 0);
        $("#tecnologiaTicket").prop('selectedIndex', 0);
        $("#descripcionProblemaTicket").val('');
    }

    $scope.limpiarFormularioTicket = function () {
        swal({
            title: "Cancelar registro de ticket",
            text: '\u00BFEst\u00e1 seguro de limpiar el formulario?',
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(function (isConfirm) {
            if (isConfirm) {
                $scope.isGuardadoProcess = false
                $scope.isMensajeSuccessOt = false
                $scope.isMensajeErrorOt = false
                $scope.validacionTicket = false;
                $scope.cleanForm();
                $("#cuentaTicket").removeClass("invalid-inputTicket");
                $("#tecnicoTicket").removeClass("invalid-inputTicket");
                $("#noSerieTicket").removeClass("invalid-inputTicket");
                $("#fallaTicket").removeClass("invalid-inputTicket");
                $("#categoriaTicket").removeClass("invalid-inputTicket");
                $("#subcategoriaTicket").removeClass("invalid-inputTicket");
                $("#tipoOrdenTicket").removeClass("invalid-inputTicket");
                $("#tipoNegocioTicket").removeClass("invalid-inputTicket");
                $("#regionTicket").removeClass("invalid-inputTicket");
                $("#tecnologiaTicket").removeClass("invalid-inputTicket");
                $("#descripcionProblemaTicket").removeClass("invalid-inputTicket");
                $scope.tecnicoAsignado = {};
                $scope.tempClaveCliente = '';
                $scope.consultarTicketsSoporte();
                markerCreacionTickets.setMap(null)
                markerCreacionTickets = undefined
                $scope.$apply();
            }
        }).catch(swal.noop);
    }

    $scope.consultarOtsTecnicosTicket = function () {
        if ($scope.propietarioSession != $scope.nPuestoIngeniero) {
            let params = {
                idsGeografia: $scope.geografiaUsuarioList.map(function (e) { return e.id }),
                idTipoUsuario: [$scope.nPuestoIngeniero]
            }
            if (ingenieroTable) {
                ingenieroTable.destroy();
            }
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            gestionTicketSoporteService.consultarUsuariosPorPuesto(params).then((response) => {
                swal.close()
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $scope.listIngenieros = response.data.result.usuarios;
                        $scope.listIngenieros.map(function (e) { e.isChecked = false; return e; })
                        $scope.initTableingeniero();
                        $scope.isConsultarOtsTecnicos = true
                        $("#modalAsignarTicket").modal('show');
                    } else {
                        mostrarMensajeWarningValidacion('No hay ingenieros')
                    }
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la operaci&oacute;n')
                }
            }).catch((err) => handleError(err));
        } else {
            swal({
                title: 'Comentarios',
                input: 'textarea',
                closeOnClickOutside: false,
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: $scope.editTicket.detalleTicketSc.numEmpleadoInge ? 'Reasignar' : 'Asignar'
            }).then((result) => {
                $scope.ingenieroSelect = { idUsuario: $("#prop-session").val().split('_')[1] }
                $scope.asignarTicketIngeniero(result)
            }).catch((result) => {
            })
        }
    }

    $scope.initTableingeniero = function () {
        let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        let arraRow = []
        $.each($scope.listIngenieros, function (i, ingeniero) {
            let array = []
            let url = imgDefault
            if (ingeniero.urlFoto) {
                url = regexUrl.test(ingeniero.urlFoto) ? ingeniero.urlFoto : imgDefault;
            }
            array[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'ingeniero','" + ingeniero.noEmpleado + "'" + ')"/>';
            array[1] = ingeniero.noEmpleado ? ingeniero.noEmpleado : 'Sin informaci&oacute;n';
            array[2] = ingeniero.nombreCompleto ? ingeniero.nombreCompleto : 'Sin informaci&oacute;n';
            array[3] = ingeniero.geografia ? ingeniero.geografia : 'Sin informaci&oacute;n';
            array[4] = ingeniero.fechaActualizacion ? ingeniero.fechaActualizacion : 'Sin informaci&oacute;n';
            array[5] = '<input class="form-check-input" type="checkbox" onclick="selectIngeniero(this)" value="' + i + '" id="' + ingeniero.idUsuario + '"/>';
            arraRow.push(array)
        })
        ingenieroTable = $('#ingenierosTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arraRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            'fnCreatedRow': function (nRow, aData, iDataIndex) {
                $(nRow).attr('id', 'ingeniero_' + aData[1]);
            },
        });
        document.getElementById('ingenierosTable_paginate').addEventListener('click', function () {
            $.each($scope.listIngenieros, function (i, elemento) {
                if (!elemento.isChecked) {
                    $('#' + elemento.idUsuario).prop('checked', false);
                }
                $scope.$apply();
            });
        })
    }

    selectIngeniero = function (ingeniero) {
        $.each($scope.listIngenieros, function (i, elemento) {
            if (elemento.isChecked) {
                elemento.isChecked = false;
                $('#' + elemento.idUsuario).prop('checked', false);
                $scope.$apply();
            }
            if ($(ingeniero).attr('id') == elemento.idUsuario) {
                elemento.isChecked = $(ingeniero).is(":checked");
            }
        })
        $scope.$apply();
    }
    $scope.usuarioFoto = {};

    showImage = function (type, numEmpleado) {
        let url = './resources/img/plantainterna/despacho/tecnicootasignada.png';

        let usuario = {};
        if (numEmpleado) {
            usuario = $scope.listIngenieros.find((e) => e.noEmpleado == numEmpleado);
            url = regexUrl.test(usuario.urlFoto) ? usuario.urlFoto : url
            $scope.usuarioFoto.tipo = "Ingeniero";
            $scope.usuarioFoto.noEmpleado = usuario.noEmpleado;
            $scope.usuarioFoto.usuario = usuario.usuario;
        } else {
            if (type == 'tecnico') {
                url = regexUrl.test($scope.editTicket.detalleOtDetenida.fotoTecnico) ? $scope.editTicket.detalleOtDetenida.fotoTecnico : url;
                $scope.usuarioFoto.tipo = "Tecnico";
                $scope.usuarioFoto.noEmpleado = $scope.editTicket.detalleOtDetenida.numEmpleadoTecnico;
                $scope.usuarioFoto.usuario = $scope.editTicket.detalleOtDetenida.tecnico;
            } else if (type == 'ingeniero') {
                url = regexUrl.test($scope.editTicket.detalleTicketSc.fotoInge) ? $scope.editTicket.detalleTicketSc.fotoInge : url;
                $scope.usuarioFoto.tipo = "Ingeniero";
                $scope.usuarioFoto.noEmpleado = $scope.editTicket.detalleTicketSc.numEmpleadoInge;
                $scope.usuarioFoto.usuario = $scope.editTicket.detalleTicketSc.ingeniero;
            }
        }
        $('#img_tec').attr('src', url);
        $scope.$apply();
        $('#modalFoto').modal('show');

    }



    $scope.siguienteAsignar = function () {
        $scope.ingenieroSelect = $scope.listIngenieros.find(function (elem) { return elem.isChecked == true });
        if ($scope.ingenieroSelect) {
            swal({
                title: 'Comentarios',
                input: 'textarea',
                closeOnClickOutside: false,
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: $scope.editTicket.detalleTicketSc.numEmpleadoInge ? 'Reasignar' : 'Asignar'
            }).then((result) => {
                $scope.asignarTicketIngeniero(result)
            }).catch((result) => {
            })
        } else {
            mostrarMensajeInformativo('Seleccione un ingeniero')
        }
    }

    $scope.asignarTicketIngeniero = function (comentario) {
        let params = {
            comentarios: comentario,
            folioSistema: $scope.editTicket.detalleTicketSc.folioSistema,
            otCentralizado: $scope.editTicket.detalleTicketSc.otCentralizado,
            idIngeniero: Number($scope.ingenieroSelect.idUsuario),
            idTicketSc: Number($scope.ticketDetalle)
        }

        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        if ($scope.editTicket.detalleTicketSc.numEmpleadoInge) {
            gestionTicketSoporteService.reasigarTicketIngeniero(params).then((response) => {
                swal.close()
                if (response.data.respuesta) {
                    toastr.success('Ingeniero asignado con exito');
                    $("#modalAsignarTicket").modal('hide');
                    $scope.consultaIngeniero();
                    $(".content-detalle-ticket .inputTicket").prop("disabled", false);
                    $("#detalleTicketAccordion .dictamen-info").prop("disabled", false);
                    $(".btn-disabled").prop("disabled", false);
                    $("#btnGuardarCambios").prop("disabled", false);
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la operaci&oacute;n')
                }
            }).catch((err) => handleError(err));
        } else {
            gestionTicketSoporteService.asigarTicketIngeniero(params).then((response) => {
                swal.close()
                if (response.data.respuesta) {
                    toastr.success('Ingeniero asignado con exito');
                    $("#modalAsignarTicket").modal('hide');
                    $scope.consultaIngeniero();
                    $(".content-detalle-ticket .inputTicket").prop("disabled", false);
                    $("#detalleTicketAccordion .dictamen-info").prop("disabled", false);
                    $(".btn-disabled").prop("disabled", false);
                    $("#btnGuardarCambios").prop("disabled", false);
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la operaci&oacute;n')
                }
            }).catch((err) => handleError(err));
        }

    }

    $scope.consultaIngeniero = function () {
        gestionTicketSoporteService.consultarDetalleTicketGestion($scope.ticketDetalle).then((response) => {
            if (response.data.respuesta) {
                if (response.data.result) {
                    let ingeniero = response.data.result.detalleGeneral.detalleTicketSc;
                    $scope.editTicket.detalleTicketSc.ingeniero = ingeniero.ingeniero;
                    $scope.editTicket.detalleTicketSc.numEmpleadoInge = ingeniero.numEmpleadoInge;
                    $scope.editTicket.detalleTicketSc.usuarioInge = ingeniero.usuarioInge;
                    $scope.editTicket.detalleTicketSc.celularInge = ingeniero.celularInge;
                    let urlIng = regexUrl.test(ingeniero.fotoInge) ? ingeniero.fotoInge : "./resources/img/plantainterna/despacho/tecnicootasignada.png";
                    setTimeout(() => {
                        $("#fotoIngeniero").attr("src", urlIng);
                    }, 100);
                    $scope.ticketSoporteDetalle.estatus = ingeniero.idEstatus == 1 ? '' : ingeniero.idEstatus + '';

                } else {
                    mostrarMensajeWarningValidacion('No se encontraron los datos actualizados')
                }
            } else {
                mostrarMensajeWarningValidacion('No se encontraron los datos actualizados')
            }
        }).catch((err) => handleError(err));
    }

    $scope.fallaList = []
    $scope.categoriaListD = []
    $scope.subcategoriaListD = []
    $scope.iniciarCatalogoFallaDetalle = function () {
        $scope.fallaList = $scope.catalogoFallasTicketSoporte.filter(elemento => { return elemento.nivel === 1 })
    }

    $scope.motivoEscalamientoDetalle = []
    $scope.motivosSelectDetalle = function () {
        $scope.motivoEscalamientoDetalle = $scope.escalamientoListDetalle.filter(elemento => {
            return elemento.idPadre == $scope.ticketSoporteDetalle.estado
        })
    }

    $scope.validacionTicketDetalle = false;
    $scope.guardarTicketDetalle = function () {
        $scope.validacionTicketDetalle = false;

        let stringErrores = ''
        let isErrorDetalle = false

        if (!$scope.ticketSoporteDetalle.fallaTicketD) {
            isErrorDetalle = true
            stringErrores += '<li>Seleccione falla</li>'
        }

        if (!$scope.ticketSoporteDetalle.categoriaTicketD) {
            isErrorDetalle = true
            stringErrores += '<li>Seleccione categor&iacute;a</li>'
        }

        if (!$scope.ticketSoporteDetalle.subcategoriaTicketD) {
            isErrorDetalle = true
            stringErrores += '<li>Seleccione subcategor&iacute;a</li>'
        }
        if (!$scope.ticketSoporteDetalle.estatus) {
            isErrorDetalle = true
            stringErrores += '<li>Seleccione estatus</li>'
        }

        if ($scope.ticketSoporteDetalle.estatus && $scope.ticketSoporteDetalle.estatus == '3') {
            if (!$scope.ticketSoporteDetalle.estado) {
                isErrorDetalle = true
                stringErrores += '<li>Seleccione estado</li>'
            }
            if (!$scope.ticketSoporteDetalle.motivo) {
                isErrorDetalle = true
                stringErrores += '<li>Seleccione motivo</li>'
            }
        }

        if (!$scope.ticketSoporteDetalle.comentarios && $scope.ticketSoporteDetalle.estatus !== '3') {
            isErrorDetalle = true
            stringErrores += '<li>Ingrese comentario del ticket</li>'
        }

        if (!$scope.ticketSoporteDetalle.tecnologia) {
            isErrorDetalle = true
            stringErrores += '<li>Seleccione tecnolog&iacute;a</li>'
        }


        if (isErrorDetalle) {
            mostrarMensajeWarningValidacion(stringErrores)
            $scope.validacionTicketDetalle = true;
            return false
        }

        let arrayAcciones = [];
        $.each($scope.accionesDinamicasDetalle, function (i, e) {
            let accion = $scope.editTicket.detalleTicketSc.acciones.find((s) => Number(s.idAccion) == Number(e.id));
            let isChecked = $("#dictamen-" + e.id).is(":checked");
            let accionTemp = {
                idDictamen: accion ? accion.idDictamen : 0,
                idAccion: e.id,
                valor: isChecked ? 1 : 0,
                comentario: $scope.ticketSoporteDetalle.comentarios,
                equipos: e.id == 2 ? $scope.listadoNuevoViejosEquipo : []
            }
            arrayAcciones.push(accionTemp);

        })
        if ($scope.ticketSoporteDetalle.estatus !== '3') {
            $scope.ticketSoporteDetalle.motivo = null;
            $scope.ticketSoporteDetalle.estado = null;
        }
        let propietario = $scope.escalamientoListDetalle.find((p) => p.id === Number($scope.ticketSoporteDetalle.estado));
        let motivo = $scope.escalamientoListDetalle.find((p) => p.id === Number($scope.ticketSoporteDetalle.motivo));

        let params = {
            otCentralizado: $scope.editTicket.detalleTicketSc.otCentralizado,
            folioSistema: $scope.editTicket.detalleTicketSc.folioSistema,
            idTicketSc: Number($scope.ticketDetalle),
            idEstatus: $scope.ticketSoporteDetalle.estatus,
            idMotivoSc: $scope.ticketSoporteDetalle.motivo,
            idFalla: $scope.ticketSoporteDetalle.fallaTicketD,
            idCategoria: $scope.ticketSoporteDetalle.categoriaTicketD,
            idSubcategoria: $scope.ticketSoporteDetalle.subcategoriaTicketD,
            idTicketSf: $scope.editTicket.detalleTicketSc.idTicketSf,
            idPropietarioSf: propietario ? propietario.idSalesforce : 0,
            idPropietarioSc: $scope.ticketSoporteDetalle.estado,
            idMotivoSf: motivo ? motivo.idSalesforce : 0,
            idTecnologia: $scope.ticketSoporteDetalle.tecnologia,
            comentarios: $scope.ticketSoporteDetalle.comentarios ? $scope.ticketSoporteDetalle.comentarios : "",
            acciones: arrayAcciones
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.guardarTicketDetalle(params).then(response => {
            swal.close()
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.limpiarContentDetalleTicket();
                    $scope.contentdetalleticket = false;
                    $scope.contentprincipal = true;
                    $scope.isConsultaComentarios = false
                    mostrarMensajeExitoAlert(response.data.result.mensaje);
                    $scope.consultarTicketsSoporte();
                } else {
                    mostrarMensajeWarningValidacion(response.data.result.mensaje)
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la operaci&oacute;n')
            }
        }).catch((err) => handleError(err));
    }

    $scope.mostrarChatterSalesforce = function (isFolio) {
        $scope.busquedaSf = {
            type: isFolio ? 'OrdenServicio' : 'Ticket',
            id: isFolio ? $scope.editTicket.detalleTicketSc.idfolioSf : $scope.editTicket.detalleTicketSc.idTicketSf
        }
        if ($scope.busquedaSf.id) {
            $scope.consultarComentariosTicketSoporte();
        } else {
            toastr.warning('No se encontr&oacute; informaci&oacute;n.');
        }
    }

    $scope.closeComentarios = function () {
        $scope.isConsultaComentarios = false
        $scope.isBusqueda = false
    }

    $scope.comentariosOrdenTrabajo = [];
    $scope.consultaChat = function () {
        $scope.comentariosOrdenTrabajo = [];
        let params = {
            idOt: $scope.editTicket.detalleOtDetenida.otGeneraSoporte
        }

        genericService.consultarComentariosDespachoOT(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.detalle) {
                            $scope.comentariosOrdenTrabajo = response.data.result.detalle;
                            angular.forEach($scope.comentariosOrdenTrabajo, function (comentario, index) {
                                comentario.fechaComentario = moment(comentario.fecha + ' ' + comentario.hora).format("dddd, D [de] MMMM [de] YYYY hh:mm A");
                            });
                        } else {
                            toastr.warning(response.data.result.mensaje);
                        }
                    } else {
                        toastr.warning('No se encontraron comentarios');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.warning(response.data.resultDescripcion);
            }
        }).catch(err => handleError(err));
    }
    $scope.comentarioTicket = '';
    $scope.addComentarios = function () {
        if ($('#comentarioTicket').val().trim() !== '' && !/^\s/.test($('#comentarioTicket').val())) {

            let params = {
                idOrden: $scope.editTicket.detalleOtDetenida.otGeneraSoporte,
                comentario: $scope.comentarioTicket,
                origenSistema: 1
            }

            $('.send-comment').prop("disabled", 'disabled');

            genericService.agregarComentariosOt(params).then(function success(response) {
                $('.send-comment').prop("disabled", false);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        $scope.comentarioTicket = '';
                        $('#comentarioTicket').val('');
                        $scope.consultaChat();
                    } else {
                        toastr.error(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err))

        } else {
            $scope.comentarioTicket = '';
            $('#comentarioTicket').val('');
            toastr.warning('Intoducir un comentario.');
        }
    }

    $('.dropup-comments').click(function (e) {
        e.stopPropagation();
    });

    setTimeout(function () {
        $("#tipo_reporte").val('creacion');
    }, 300)


    $('#modalAsignarTicket').on('hidden.bs.modal', function () {

        $scope.listIngenieros.map(function (e) { e.isChecked = false; return e; })
        if (ingenieroTable) {
            ingenieroTable.destroy();
        }
        $scope.initTableingeniero();
    })

    $scope.validacionGenerica = function() {
        if ($scope.historial.length === 1) {
            if ($scope.historial[0].keyObject === 'TK') {
                $scope.banderaNoticiasTicket = true;
            }
            if ($scope.historial[0].keyObject === 'OP') {
                $scope.banderaNoticiasOportunidad = true;
            }
            if ($scope.historial[0].keyObject === 'OS') {
                $scope.banderaNoticiasOs = true;
            }
        } else {
            $scope.banderaNoticiasTicket = false;
            $scope.banderaNoticiasOportunidad = false;
            $scope.banderaNoticiasOs = false;
        }
    }

}]);

angular.element(document).ready(function () {
    $("#moduloGestionTickets").addClass('active');


});
