
var app = angular.module('ticketsSoporteApp', []);

var objectTempAccion;

app.controller('ticketsSoporteController', ['$scope', '$q', 'gestionTicketSoporteService', 'genericService', 'busquedaSalesforceService', 'evidenciaService', '$filter', function ($scope, $q, gestionTicketSoporteService, genericService, busquedaSalesforceService, evidenciaService, $filter) {
    app.ticketControllerMapa($scope, $q, gestionTicketSoporteService, genericService)
    app.busquedaSalesforce($scope, busquedaSalesforceService)
    app.evidenciaController($scope, evidenciaService)
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
    $scope.estatusListOriginal = [];
    $scope.busquedaSf = {};
    $scope.nGeografiaConsultaUsuario = null
    $scope.nPuestoIngeniero = null
    $scope.nIntervencion = null
    $scope.nGeografia = null
    $scope.configPermisoAccionCreaTicket = false;
    $scope.configPermisoAccionConsultaTicket = false;
    $scope.configPermisoAccionModificarTicket = false;
    $scope.filtroBusqueda.tipoFechaConsulta = 'creacion';
    $scope.modelosList = [];

    let ingenieroTable = $('#ingenierosTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font,
        "aoColumnDefs": [
            { "aTargets": [5], "bSortable": false }
        ]
    });

    $scope.contentprincipal = true
    $scope.contentdetalleticket = false;

    $scope.cambioEquipo = {}
    $scope.agregarNuevoEquipoContent = false;
    $scope.listadoNuevoViejosEquipo = [];
    $scope.isEvaluarNuevoEquipo = false

    // MODAL DETALLE OT
    $scope.listEvidenciaImagenes = {};
    $scope.infoOtDetalle = {};
    $scope.movimientos = [];
    $scope.detalleSoporteList = [];
    $scope.detallePagoObj = {};
    $scope.isDispositivosDetalleOT = false;
    $scope.listDispositivosDetalle = [];
    $scope.isTecnicoConsultaMateriales = false;
    $scope.tecnicoConsultaMateriales = {};
    $scope.listaMaterialesDetalleOT = [];
    $scope.equiposTecnicoRecoleccion = [];
    $scope.tecnicoConsultaRecoleccion = {};
    $scope.isTecnicoConsultaRecoleccion = false;
    let is_consulta_detalle_materiales = false;
    let is_consulta_detalle_soporte = false;
    let is_consulta_info_ot = false;
    let is_consulta_historico = false;
    let is_consulta_detalle_pagos = false;
    let is_consulta_detalle_dispositivos = false;
    let is_consulta_detalle_recoleccion = false;

    $scope.isNuevo = false;

    angular.element(document).ready(function () {
        $("#modal-arbol-modelo").on("hidden.bs.modal", function () {
            var modelo = $('#jstree-modelo').jstree("get_selected", true);
            if($scope.isNuevo){
                $scope.cambioEquipo.modeloNuevo = modelo[0].text;
                $scope.cambioEquipo.idNuevo = modelo[0].id.split("_")[0];
                $scope.cambioEquipo.idArbolNuevo = modelo[0].id;
            }else{
                $scope.cambioEquipo.modeloViejo = modelo[0].text;
                $scope.cambioEquipo.idViejo = modelo[0].id.split("_")[0];
                $scope.cambioEquipo.idArbolViejo = modelo[0].id;
            }
            $scope.$apply();
        })
    });

    $scope.busquedaPaquete = function () {
        $("#jstree-modelo").jstree("search", $('#searhArbolModelo').val());
    }

    let tableRecoleccionDetalleOT = $('#tableRecoleccionDetalleOT').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    let tablePagosDetalleOT = $('#tablePagosDetalleOT').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    let tableDispositivosDetalleOT = $('#tableDispositivosDetalleOT').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    let tableMaterialesDetalleOT = $('#tableMaterialesDetalleOT').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    // MODAL DETALLE OT

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

        if (!$scope.cambioEquipo.modeloNuevo) {
            isError = true
        }
        if (!$scope.cambioEquipo.modeloViejo) {
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
            modeloNuevo: $scope.cambioEquipo.modeloNuevo,
            modeloViejo: $scope.cambioEquipo.modeloViejo,
            idNuevo: $scope.cambioEquipo.idNuevo,
            idViejo: $scope.cambioEquipo.idViejo,
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
                        $scope.consultarTicketsSoporte()
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
            gestionTicketSoporteService.consultaTecnologiaTicketSoporte(),
            gestionTicketSoporteService.consultarModelosSoporte()
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
                                objectTempAccion = new GenericAccionRealizada(""+permisosResult.id, 'TOP_RIGHT');
                                objectTempAccion.inicializarBotonAccionesRecientes();
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
                    $scope.estatusListOriginal = results[8].data.result.estatusTicketSC;
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

            if (results[10].data.respuesta) {
                if (results[10].data.result) {
                    $scope.modelosList = results[10].data.result.modelos;
                    let modelos = results[10].data.result.modelos;
                    let index = 0
                    modelos.map((e) => {
                        e.id =  e.id + '_' +index;
                        e.parent = e.padre == undefined ? "#" : e.padre;
                        e.text = e.description;
                        e.icon = "fa fa-check-circle";
                        e.state = {
                            opened: false,
                            selected: false,
                        }
                        index++;
                        return e
                    })
                    $('#jstree-modelo').bind('loaded.jstree', function (e, data) {
                    }).jstree({
                        plugins: ["wholerow", 'search'],
                        core: {
                            data: modelos,
                            themes: {
                                name: 'proton',
                                responsive: true,
                                "icons": true
                            },
                            animation: 100
                        },
                        "search": {
                            "case_sensitive": false,
                            "show_only_matches": true
                        }
                    });
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la consulta de los modelos.')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de los modelos.')
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
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "aoColumnDefs": [
                { "aTargets": [7], "bSortable": false }
            ],
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

                    //---------------------------------------C??digo reynel
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


                    //---------------------------------------Fin c??digo reynel

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
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "aoColumnDefs": [
                { "aTargets": [7], "bSortable": false }
            ],
            'fnCreatedRow': function (nRow, aData, iDataIndex) {
                $(nRow).attr('id', 'tecnico_' + aData[1]); // or whatever you choose to set as the id
            }
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
                        let tituloAccion = 'Creaci\u00F3n de ticket'
                        if (response.data !== undefined) {
                            if (response.data.respuesta) {
                                $scope.tecnicoAsignado = {};
                                if ($scope.configPermisoAccionConsultaTicket) {
                                    $scope.consultarTicketsSoporte();
                                } else {
                                    swal.close();
                                }
                                $scope.cleanForm();
                                toastr.success('El ticket se cre\u00F3 con la OT: ' + response.data.result.idTicketFFM);
                                objectTempAccion.guardarAccionesRecientesModulo('El ticket se cre\u00F3 con la OT: ' + response.data.result.idTicketFFM, MENSAJE_ACCION_EXITO, tituloAccion);
                                $scope.isMensajeSuccessOt = true

                            } else {
                                swal.close();
                                mostrarMensajeErrorAlert(response.data.resultDescripcion);
                                $scope.isMensajeErrorOt = true
                                let mensajeEnvio = 'Ha ocurrido un error al crear el ticket con la cuenta ' + $scope.ticketSoporteR.cuenta
                                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            }
                            $scope.mensajeRequestCreacion = response.data.resultDescripcion

                        } else {
                            let mensajeEnvio = 'Ha ocurrido un error al crear el ticket con la cuenta ' + $scope.ticketSoporteR.cuenta
                            objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);

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
                        $scope.tempTicketsSoporte = [];
                        $scope.ticketsSoporte = [];
                        if (json.result != undefined && json.result.tickets != undefined) {
                            $scope.ticketsSoporte = json.result.tickets;
                            $scope.tempTicketsSoporte = json.data;
                        }
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
                },
                'createdRow': function (row, data, rowIndex) {
                    $.each($('td', row), function (colIndex) {
                        if (colIndex == 4 || colIndex == 6 || colIndex == 7) {
                            $(this).attr('title', $(this).text());
                        }
                    });
                },
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
        $scope.estatusList = angular.copy($scope.estatusListOriginal);
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
                        if ($scope.editTicket.detalleTicketSc.idEstatus !== 2 && $scope.editTicket.detalleTicketSc.idEstatus !== 1) {
                            $scope.estatusList = $scope.estatusList.filter((e) => { return e.id != 2 });
                        }
                        if ($scope.editTicket.detalleTicketSc.idEstatus != 6) {
                            $scope.estatusList = $scope.estatusList.filter((e) => { return e.id != 6 });
                        }


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
                        $scope.ticketSoporteDetalle.tecnologia = $scope.editTicket.detalleTicketSc.idTecnologia + '';

                        let urlTec = regexUrl.test($scope.editTicket.detalleOtDetenida.fotoTecnico) ? $scope.editTicket.detalleOtDetenida.fotoTecnico : "./resources/img/plantainterna/despacho/tecnicootasignada.png";
                        let urlIng = regexUrl.test($scope.editTicket.detalleTicketSc.fotoInge) ? $scope.editTicket.detalleTicketSc.fotoInge : "./resources/img/plantainterna/despacho/tecnicootasignada.png";

                       
                        if ($scope.editTicket.detalleTicketSc.acciones.length && $scope.accionesDinamicasDetalle.length) {
                            $scope.editTicket.detalleTicketSc.acciones.map(function (s) {
                                if (Number(s.valor) == 1) {
                                    $("#dictamen-" + s.idAccion).prop('checked', true);
                                    if (Number(s.idAccion) == 2) {
                                        $scope.agregarNuevoEquipoContent = true;
                                        if (s.detalleSeries.length) {
                                            $.each(s.detalleSeries, function (i, equipo) {
                                                equipo.descripcion = $scope.equiposList.find((e) => e.id == equipo.idTipoEquipo).descripcion
                                            })
                                        }
                                        $scope.listadoNuevoViejosEquipo = s.detalleSeries ? s.detalleSeries : [];
                                    }
                                }
                            });
                        }

                        setTimeout(() => {
                            $("#fotoIngeniero").attr("src", urlIng);
                            $("#fotoTecnico").attr("src", urlTec);

                            if ($scope.editTicket.detalleTicketSc.idEstatus == 4 || $scope.editTicket.detalleTicketSc.idEstatus == 5 || !$scope.editTicket.detalleTicketSc.usuarioInge) {
                                $(".content-detalle-ticket .inputTicket").prop("disabled", true);
                                $("#detalleTicketAccordion .dictamen-info").prop("disabled", true);
                                $(".btn-disabled").prop("disabled", true);
                                $("#btnGuardarCambios").prop("disabled", true);
                                $scope.ticketSoporteDetalle.comentarios = $scope.editTicket.detalleTicketSc.comentarioTicket;
                            } else {
                                $(".content-detalle-ticket .inputTicket").prop("disabled", false);
                                $("#detalleTicketAccordion .dictamen-info").prop("disabled", false);
                                $(".btn-disabled").prop("disabled", false);
                                $("#btnGuardarCambios").prop("disabled", false);
                            }
                            
                        }, 100);
                       

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
                idSupervisor: $("#prop-session").val().split('_')[1]
            }
            if (ingenieroTable) {
                ingenieroTable.destroy();
            }
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            gestionTicketSoporteService.consultarIngenierosSoporte(params).then((response) => {
                swal.close()
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.usuarios.length) {
                            $scope.listIngenieros = response.data.result.usuarios;
                            $scope.listIngenieros.map(function (e) { e.isChecked = false; return e; })
                            $scope.initTableingeniero();
                            $scope.isConsultarOtsTecnicos = true
                            $("#modalAsignarTicket").modal('show');
                        } else {
                            mostrarMensajeInformativo('No se encontraron ingenieros')
                        }
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
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arraRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            'fnCreatedRow': function (nRow, aData, iDataIndex) {
                $(nRow).attr('id', 'ingeniero_' + aData[1]);
            },
            "aoColumnDefs": [
                { "aTargets": [5], "bSortable": false }
            ]
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
            let tituloAccion = "Reasignar ingeniero";
			let mensajeEnvio = 'Ha ocurrido un error al reasignar el ingeniero ' + $scope.ingenieroSelect.nombreCompleto +' a la OS : ' + $scope.editTicket.detalleTicketSc.folioSistema;
            gestionTicketSoporteService.reasigarTicketIngeniero(params).then((response) => {
                swal.close()
                $scope.estatusList = angular.copy($scope.estatusListOriginal);
                if (response.data.respuesta) {
                    mensajeEnvio = 'Se ha reasignado el ingeniero ' + $scope.ingenieroSelect.nombreCompleto +' a la OS : ' + $scope.editTicket.detalleTicketSc.folioSistema;
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                    $scope.estatusList = $scope.estatusList.filter((e) => { return e.id != 2 });

                    toastr.success('Ingeniero reasignado con &eacute;xito');
                    $("#modalAsignarTicket").modal('hide');
                    $scope.consultaIngeniero();
                    $(".content-detalle-ticket .inputTicket").prop("disabled", false);
                    $("#detalleTicketAccordion .dictamen-info").prop("disabled", false);
                    $(".btn-disabled").prop("disabled", false);
                    $("#btnGuardarCambios").prop("disabled", false);
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    mostrarMensajeWarningValidacion('No se pudo realizar la operaci&oacute;n')
                }
            }).catch((err) => handleError(err));
        } else {
            let tituloAccion = "Asignar ingeniero";
			let mensajeEnvio = 'Ha ocurrido un error al asignar el ingeniero ' + $scope.ingenieroSelect.nombreCompleto +' a la OS : ' + $scope.editTicket.detalleTicketSc.folioSistema;
            gestionTicketSoporteService.asigarTicketIngeniero(params).then((response) => {
                swal.close()
                if (response.data.respuesta) {
                    mensajeEnvio = 'Se ha asignado el ingeniero ' + $scope.ingenieroSelect.nombreCompleto +' a la OS : ' + $scope.editTicket.detalleTicketSc.folioSistema;
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                    toastr.success('Ingeniero asignado con &eacute;xito');
                    $("#modalAsignarTicket").modal('hide');
                    $scope.consultaIngeniero();
                    $(".content-detalle-ticket .inputTicket").prop("disabled", false);
                    $("#detalleTicketAccordion .dictamen-info").prop("disabled", false);
                    $(".btn-disabled").prop("disabled", false);
                    $("#btnGuardarCambios").prop("disabled", false);
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
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
        let tituloAccion = "Editar detalle ticket";
		let mensajeEnvio = 'Ha ocurrido un error al editar el detalle de la OS: '+ params.folioSistema;
        gestionTicketSoporteService.guardarTicketDetalle(params).then(response => {
            swal.close()
            if (response.data.respuesta) {
                if (response.data.result) {
                    mensajeEnvio = 'Se ha editado el detalle de la OS: '+ params.folioSistema;
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                    $scope.limpiarContentDetalleTicket();
                    $scope.contentdetalleticket = false;
                    $scope.contentprincipal = true;
                    $scope.isConsultaComentarios = false
                    mostrarMensajeExitoAlert(response.data.result.mensaje);
                    $scope.consultarTicketsSoporte();
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    mostrarMensajeWarningValidacion(response.data.result.mensaje)
                }
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
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

    $scope.validacionGenerica = function () {
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

    // mostarImagenesCategoriaEvidenciaOT = function () {
    //     var $imageLinks = $('.magnific.item:visible');
    //     var items = [];

    //     $imageLinks.each(function (index, elemento) {
    //         var $item = $(this);
    //         var magItem = {
    //             src: $item.attr('href'),
    //             type: 'image'
    //         };
    //         magItem.title = $item.data('title');
    //         items.push(magItem);
    //     });
    //     $imageLinks.magnificPopup({
    //         mainClass: 'mfp-fade',
    //         items: items,
    //         gallery: {
    //             enabled: true,
    //             tPrev: $(this).data('prev-text'),
    //             tNext: $(this).data('next-text')
    //         },
    //         type: 'image',
    //         callbacks: {
    //             beforeOpen: function () {
    //                 var index = $imageLinks.index(this.st.el);
    //                 if (-1 !== index) {
    //                     this.goTo(index);

    //                 }
    //             },
    //             open: function () {
    //                 $.magnificPopup.instance._onFocusIn = function (e) { };
    //             }
    //         }
    //     });
    // }

    // $(document.body).on("click", ".btn_categoria_img", function () {
    //     var id_categoria = $.trim($(this).attr('attr_id_cat'));
    //     if (id_categoria === '') {
    //         $(".magnific.item").show();
    //         $('.imagen_content:hidden').show(400);
    //         setTimeout(function () { mostarImagenesCategoriaEvidenciaOT(); }, 500);
    //     } else {
    //         if ($(".imagen_content:visible").length > 0) {
    //             $(".imagen_content:visible").hide(150, "linear", function () {

    //                 $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
    //                 $(".magnific.item.imgtipo_" + id_categoria + "").show();

    //                 $('.content_img_' + id_categoria).show(200);
    //                 //Manda function magnific popup
    //                 mostarImagenesCategoriaEvidenciaOT();
    //             });
    //         } else {
    //             $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
    //             $(".magnific.item.imgtipo_" + id_categoria + "").show();

    //             $('.content_img_' + id_categoria).show(200);
    //             //Manda function magnific popup
    //             mostarImagenesCategoriaEvidenciaOT();
    //         }
    //     }
    // });

    // $scope.getEvidenciasImagenes = function (tipo) {
    //     $scope.listImagenesTipo = [];
    //     if (tipo.toString() === '0') {
    //         $scope.listImagenesTipo = $scope.listEvidenciaImagenes.imagenes;
    //     } else {
    //         $scope.listEvidenciaImagenes.tipos.map(function (e) {
    //             if (e.id.toString() === tipo.toString()) {
    //                 $scope.listImagenesTipo = e.imagenes;
    //                 return false;
    //             }
    //         });
    //     }
    //     $(".tipo_evidencia").removeClass("tipo-evidencia-selected");
    //     $("#categoria_img_" + tipo).addClass("tipo-evidencia-selected");
    // }

    // let groupByEvidencias = function (xs, key) {
    //     return xs.reduce(function (rv, x) {
    //         (rv[x[key]] = rv[x[key]] || []).push(x);
    //         return rv;
    //     }, {});
    // };

    
    // $scope.consultaEvidenciaOTDetalle = function (ot) {
    //     swal({ text: 'Espera un momento...', allowOutsideClick: false });
    //     swal.showLoading();
    //     $scope.listEvidenciaImagenes = {};
    //     let params = {
    //         orden: ot,
    //     }
    //     $('.idoti').text(ot);
    //     gestionTicketSoporteService.consultaEvidenciaOT(params).then(function success(response) {
    //         if (response.data !== undefined) {
    //             if (response.data.respuesta) {
    //                 if (response.data.result) {
    //                     if (response.data.result.evidencias) {
    //                         $scope.listEvidenciaImagenes.imagenes = response.data.result.evidencias;
    //                         $scope.listEvidenciaImagenes.tipos = [];
    //                         $scope.listImagenesTipo = response.data.result.evidencias;
    //                         let listaTipos = [];

    //                         var count_cantidad_por_tipo = groupByEvidencias(response.data.result.evidencias, 'idCatEvidencia');
    //                         $scope.listEvidenciaImagenes.imagenes.map(function (e) {
    //                             let isExist = listaTipos.find((t) => e.idCatEvidencia == t.id)
    //                             if (!isExist) {
    //                                 let imagenes = [];
    //                                 if (count_cantidad_por_tipo[e.idCatEvidencia].length) {
    //                                     imagenes = count_cantidad_por_tipo[e.idCatEvidencia]
    //                                 }
    //                                 listaTipos.push({
    //                                     id: e.idCatEvidencia,
    //                                     descripcion: e.tipoEvidencia,
    //                                     imagenes: imagenes
    //                                 });
    //                             }
    //                         });
    //                         $scope.listEvidenciaImagenes.tipos = listaTipos;
    //                         is_consultar_evidencia = true;
    //                         $('#modal-evidenciaOT').modal('show');
    //                         setTimeout(function () {
    //                             $("#categoria_img_0").click();
    //                             $("#categoria_img_0").addClass("tipo-evidencia-selected");
    //                         }, 100);
    //                         swal.close();
    //                     } else {
    //                         swal.close();
    //                         mostrarMensajeErrorAlert(response.data.result.resultDescription)
    //                     }
    //                 } else {
    //                     swal.close();
    //                     mostrarMensajeInformativo("No se encontraron evidencias")
    //                 }
    //             } else {
    //                 swal.close();
    //                 mostrarMensajeErrorAlert(response.data.resultDescripcion);
    //             }
    //         } else {
    //             swal.close();
    //             mostrarMensajeErrorAlert("Error del servidor");
    //         }
    //     }).catch(err => handleError(err));
    // }
    

    $scope.consultaDetalleOT = function (idOrden) {
        $scope.infoOtDetalle = {};
        let params = {
            Id_ot: idOrden
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.consultaDetalleOT(params).then(function success(response) {
            console.log(response);
            if (response.data) {
                if (response.data.respuesta) {
                    if (response.data.result.orden) {
                        $scope.infoOtDetalle = angular.copy(response.data.result.orden);
                        $scope.permisosModalDetalleOT = $scope.elementosConfigGeneral.get("MODAL_CO_FLUJO_" + $scope.infoOtDetalle.idFlujo).split(",");
                        // console.log($scope.permisosModalDetalleOT);
                        is_consulta_info_ot = true;
                        $('#modal-detalleOT').modal('show');
                        swal.close();
                    } else {
                        swal.close();
                        mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
                    }
                } else {
                    swal.close();
                    mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
                }
            } else {
                swal.close();
                mostrarMensajeErrorAlert(response.data.resultDescripcion);
            }
        });
    }

    $scope.consultaHistoricoDetalleOt = function () {
        if (!is_consulta_historico) {
            $scope.movimientos = [];
            let params = {
                idOt: $scope.infoOtDetalle.idOrden
            }
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            genericService.consultarHistoricoDespachoOT(params).then(function (result) {
                console.log(result);
                if (result.data) {
                    if (result.data.respuesta) {
                        if (result.data.result) {
                            jsonm = result.data;
                            if (result.data.result.detalle != undefined && result.data.result.detalle.length > 0) {
                                $scope.movimientos = angular.copy(result.data.result.detalle);
                                is_consulta_historico = true;
                                swal.close();
                            } else {
                                swal.close();
                                mostrarMensajeWarningValidacion("No se encontr&oacute; informaci&oacute;n");
                            }
                        } else {
                            swal.close();
                            mostrarMensajeWarningValidacion("No se encontr&oacute; informaci&oacute;n");
                        }
                    } else {
                        swal.close();
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    }
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err));
        }
    }

    retornarFormatoSliders = function (imagen, contador) {
        var imgs_blocks = "";
        var indicators_carousel = "";

        imagen.forEach((img, index) => {
            indicators_carousel += ' <li class="' + ((index === 0) ? 'active' : '') + '" data-target="#carouselExampleIndicators' + contador + '" data-slide-to="' + index + '" ></li>';
            if (img.urlEvidencia === "") {
                imgs_blocks += '' +
                    '      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + ' ">' +
                    '        <img data-title="' + img.nombre + '" class="d-block img-fluid imagen-carousel-evidencia" style="width:100%; min-width: 100%; height: 100% !important;" src="' + contex_project + '/resources/img/generic/not_found.png" alt="First slide" />' +
                    '      </div>';
            } else {
                imgs_blocks += '' +
                    '      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + '">' +
                    '        <img data-title="' + img.nombre + '" class="d-block img-fluid imagen-carousel-evidencia" style="width:100%; min-width: 100%; height: 100% !important;" class="d-block w-100" src="' + img.url + '" alt="First slide" />' +
                    '      </div>';
            }
        })

        return '' +
            '  <div id="carouselExampleIndicators' + contador + '" class="carousel_componente carousel slide" data-ride="carousel">' +
            '    <ol class="carousel-indicators">' +
            '     	' + indicators_carousel + ' ' +
            '    </ol>' +
            '    <div class="carousel-inner" role="listbox">' +
            '			' + imgs_blocks + ' ' +
            '    </div>' +
            '    <a class="carousel-control-prev" href="#carouselExampleIndicators' + contador + '" role="button" data-slide="prev">' +
            '      <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
            '      <span class="sr-only">Previous</span>' +
            '    </a>' +
            '    <a class="carousel-control-next" href="#carouselExampleIndicators' + contador + '" role="button" data-slide="next">' +
            '      <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
            '      <span class="sr-only">Next</span>' +
            '    </a>' +
            '  </div>';
    }

    desplazarDerechaTabs = function () {
		$('#myTabSoporteDetalle').animate({ scrollLeft: '+=100' }, 150);
	}

	desplazarIzquierdaTabs = function () {
		$('#myTabSoporteDetalle').animate({ scrollLeft: '-=100' }, 150);
	}

    $scope.consultarPostVentaDetalleOt = function () {
        if (!is_consulta_detalle_soporte) {
			$scope.detalleSoporteList = [];
			let params = {
				orden: $scope.infoOtDetalle.idOrden
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			gestionTicketSoporteService.consultaDetallePostVentaOt(params).then((result) => {
				console.log(result)
				isConsultaDetalleSoporte = true
				if (result.data.respuesta) {
					if (result.data.result.length) {
						$scope.detalleSoporteList = angular.copy(result.data.result);

						setTimeout(() => {
							if ($scope.detalleSoporteList.length > 7) {
								$("#left-arrow").css('display', 'block');
								$("#right-arrow").css('display', 'block');
								$("#containerTabsSoporte").removeClass('row');
								$("#containerTabsSoporte").css('width', '94%');
							} else {
								$("#left-arrow").hide();
								$("#right-arrow").hide();
								$('#containerTabsSoporte').addClass('row');
								$("#containerTabsSoporte").css('width', '100%');
							}
							$scope.detalleSoporteList.forEach((elemento, ind) => {
								let html_tmp_eq_nuevo = "";
								let html_tmp_eq_viejo = "";

                                $("#opcion-tab-equipoNuevo" + ind).show();
                                $("#opcion-tab-equipoViejo" + ind).show();
								if (elemento.equipoNuevo) {
									elemento.equipoNuevo.forEach((equipoN, index) => {
										if (equipoN.evidencias && equipoN.evidencias.length) {
											contenido_imagenes_eqnuevo = retornarFormatoSliders(equipoN.evidencias, index);
										} else {
											contenido_imagenes_eqnuevo =
												'<h4 id="texto_not_equipos">' +
												'	SIN IM&Aacute;GENES PARA ESTE EQUIPO' +
												'</h4>';
										}
										html_tmp_eq_nuevo += '' +
											'<tr>' +
											'	<td>' +
											'		<div class="row">' +
											'			<div class="col-md-6 colInformacionTabla">' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b class="title_span_1"> Tipo equipo:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="ot_fallas"  class="content_text" >' + (equipoN.descripcionTipoEquipo && equipoN.descripcionTipoEquipo !== '' ? equipoN.descripcionTipoEquipo : 'Sin informaci&oacute;n') + '</span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b class="title_span_1"> Modelo:</b>	 ' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="tecnico_falla"  class="content_text" > ' + (equipoN.descripcionModelo && equipoN.descripcionModelo !== '' ? equipoN.descripcionModelo : 'Sin informaci&oacute;n') + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1"> N&uacute;mero de Serie:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="status_falla_corte"  class="content_text" > ' + (equipoN.numSerie && equipoN.numSerie !== '' ? equipoN.numSerie : 'Sin informaci&oacute;n') + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'			</div>' +
											'			<div class="col-md-6">' +
											'					<div class="class-12">' +
											contenido_imagenes_eqnuevo +
											'					</div>' +
											'			</div>' +
											'		</div>' +
											'	</tr>' +
											'</td>';
									})
								}
								if (elemento.equipoViejo) {
									elemento.equipoViejo.forEach((equipoV, index) => {
										if (equipoV.evidencias && equipoV.evidencias.length) {
											contenido_imagenes_eqviejo = retornarFormatoSliders(equipoV.evidencias, index);
										} else {
											contenido_imagenes_eqviejo =
												'<h4 id="texto_not_arboles" style="color:#abafae; text-align:center">' +
												'	SIN IMAGENES PARA ESTA FALLA' +
												'</h4>';
										}
										html_tmp_eq_viejo += '' +
											'<tr>' +
											'	<td>' +
											'		<div class="row">' +
											'			<div class="col-md-6 colInformacionTabla">' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b class="title_span_1"> Tipo equipo:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="ot_fallas"  class="content_text" >' + (equipoV.descripcionTipoEquipo && equipoV.descripcionTipoEquipo !== '' ? equipoV.descripcionTipoEquipo : 'Sin informaci&oacute;n') + '</span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b class="title_span_1"> Modelo:</b>	 ' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="tecnico_falla"  class="content_text" > ' + (equipoV.descripcionModelo && equipoV.descripcionModelo !== '' ? equipoV.descripcionModelo : 'Sin informaci&oacute;n') + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1"> N&uacute;mero de Serie:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="status_falla_corte"  class="content_text" > ' + (equipoV.numSerie && equipoV.numSerie !== '' ? equipoV.numSerie : 'Sin informaci&oacute;n') + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'			</div>' +
											'			<div class="col-md-6">' +
											'					<div class="class-12">' +
											contenido_imagenes_eqviejo +
											'					</div>' +
											'			</div>' +
											'		</div>' +
											'	</tr>' +
											'</td>';
									})
								}
								$('#tablaEquipoViejo' + ind + ' tbody').empty();
								$('#tablaEquipoViejo' + ind + ' tbody').append(html_tmp_eq_viejo);
								$('#tablaEquipoViejo' + ind).DataTable({
									"processing": false,
									"ordering": false,
									"pageLength": 1,
									"pagingType": "numbers",
									"info": false,
									"bInfo": false,
									"bFilter": false,
									"bAutoWidth": false,
									"language": idioma_espanol_not_font,
									"columns": [null],
									"lengthChange": false,
									"fnDrawCallback": function (oSettings) {
										$(".carousel-item").click();
									}
								});
								$('#tablaEquipoNuevo' + ind + ' tbody').empty();
								$('#tablaEquipoNuevo' + ind + ' tbody').append(html_tmp_eq_nuevo);
								$('#tablaEquipoNuevo' + ind).DataTable({
									"processing": false,
									"ordering": false,
									"pageLength": 1,
									"pagingType": "numbers",
									"info": false,
									"bInfo": false,
									"bFilter": false,
									"bAutoWidth": false,
									"language": idioma_espanol_not_font,
									"columns": [null],
									"lengthChange": false,
									"fnDrawCallback": function (oSettings) {
										$(".carousel-item").click();
									}
								});
							})
							swal.close();
						}, 1000);
					} else {
						swal.close();
						mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(result.data.resultDescripcion)
				}
			}).catch(err => handleError(err));
		}
    }

    $scope.consultaPagosDetalleOt = function () {
        if (!is_consulta_detalle_pagos) {
            $scope.detallePagoObj = {};
            let params = {
                orden: $scope.infoOtDetalle.idOrden
            }
            $scope.detallePagoObj.isPagosPendientes = false;
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            gestionTicketSoporteService.consultaDetallePagosOT(params).then((result) => {
                swal.close()
                is_consulta_detalle_pagos = true;
                if (result.data.respuesta) {
                    if (result.data.result) {
                        if (result.data.result.detallePago.length) {
                            $scope.detallePagoObj = angular.copy(result.data.result.detallePago);
                            let estatusIconEstatus = '';

                            let arrayRow = [];
                            if (tablePagosDetalleOT) {
                                tablePagosDetalleOT.destroy();
                            }
                            $.each($scope.detallePagoObj, function (i, elemento) {
                                if (elemento.idEstatusPago == 2) {
                                    $scope.detallePagoObj.isPagosPendientes = true;
                                    estatusIconEstatus = ` <i class="fas fa-exclamation icono-pago-pendiente"></i> `
                                } else {
                                    estatusIconEstatus = ` <i class="far fa-check-circle icono-pago-liberado"></i> `
                                }
                                let row = [];
                                row[0] = elemento.idCveCliente ? elemento.idCveCliente : '';
                                row[1] = elemento.idOrden ? elemento.idOrden : '';
                                row[2] = elemento.folioSistema ? elemento.folioSistema : '';
                                row[3] = elemento.fechaRegistro ? elemento.fechaRegistro : '';
                                row[4] = elemento.fechaCierreOT ? elemento.fechaCierreOT : '';
                                row[5] = elemento.tipoIntervencion ? elemento.tipoIntervencion : '';
                                row[6] = elemento.subTipoIntervencion ? elemento.subTipoIntervencion : '';
                                row[7] = elemento.tiempo ? elemento.tiempo : '';
                                row[8] = elemento.tipoPago ? elemento.tipoPago : '';
                                row[9] = elemento.monto ? Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(elemento.monto) : '$ 0.00';
                                row[10] = '<div class="text-center">' +
                                    estatusIconEstatus +
                                    '</div>';
                                arrayRow.push(row);
                            })

                            tablePagosDetalleOT = $('#tablePagosDetalleOT').DataTable({
                                "paging": true,
                                "lengthChange": false,
                                "ordering": true,
                                "pageLength": 10,
                                "info": true,
                                "data": arrayRow,
                                "autoWidth": true,
                                "language": idioma_espanol_not_font,
                            });
                        } else {
                            mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
                        }
                    } else {
                        mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
                    }
                } else {
                    mostrarMensajeErrorAlert(result.data.resultDescripcion)
                }
            }).catch(err => handleError(err));
        }
    }
    
    $scope.consultarDispositivosDetalleOt = function () {
        if (!is_consulta_detalle_dispositivos) {
            $scope.listDispositivosDetalle = [];
            let params = {
				orden: $scope.infoOtDetalle.idOrden
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			gestionTicketSoporteService.consultaDetalleDispositivosOT(params).then((result) => {
				swal.close()
				console.log(result)
				is_consulta_detalle_dispositivos = true
				if (result.data) {
					if (result.data.respuesta) {
                        if (result.data.result) {
                            if (result.data.result.dispositivos.length) {
                                $scope.isDispositivosDetalleOT = true;
                                $scope.listDispositivosDetalle = angular.copy(result.data.result.dispositivos);
                                if (tableDispositivosDetalleOT) {
                                    tableDispositivosDetalleOT.destroy();
                                }
                                let arrayRow = [];
                                $scope.listDispositivosDetalle.forEach((dispositivo, index) => {
                                    let array = [];
                                    array[0] = '<a id="mostrar-segundo-nivel-' + index + '" class="option-mas-dispositivo segundo-nivel-table-dispositivo" tag-position="' + index + '" tag-hide="false"><i id="icono-dispositivo-' + index + '" class="icono-dispositivo-detalle-ot icon-color-table-dispositivo-ot fa fa-plus" aria-hidden="true"></i></a>';
                                    array[1] = dispositivo.nombreDispositivo ? dispositivo.nombreDispositivo : 'Sin Informaci&oacute;n';
                                    array[2] = dispositivo.modelo ? dispositivo.modelo : 'Sin Informaci&oacute;n';
                                    array[3] = dispositivo.serie ? dispositivo.serie : 'Sin Informaci&oacute;n';
                                    array[4] = dispositivo.mac ? dispositivo.mac : 'Sin Informaci&oacute;n';
                                    arrayRow.push(array)
                                })
                                tableDispositivosDetalleOT = $('#tableDispositivosDetalleOT').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "searching": false,
                                    "ordering": true,
                                    "pageLength": 10,
                                    "info": true,
                                    "autoWidth": true,
                                    "language": idioma_espanol_not_font,
                                    "data": arrayRow
                                });
                            } else {
                                $scope.isDispositivosDetalleOT = false;
                                mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
                            }
                        } else {
                            $scope.isDispositivosDetalleOT = false;
                            mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
                        }
					} else {
                        $scope.isDispositivosDetalleOT = false;
						mostrarMensajeWarningValidacion(result.data.resultDescripcion);
					}
                    is_consulta_detalle_dispositivos = true;
				} else {
					$scope.isDispositivosDetalleOT = false;
					mostrarMensajeErrorAlert(result.data.resultDescripcion);
				}
			}).catch(err => handleError(err));
		}
    }

    $(document.body).on("click", ".segundo-nivel-table-dispositivo", function () {
		let tr = $(this).closest('tr')
		row = tableDispositivosDetalleOT.row(tr)
		let index = Number($(this).attr('tag-position'))
		if ($(this).attr('tag-hide') === 'false') {
			$(this).attr('tag-hide', 'true')
			document.getElementById('icono-dispositivo-' + index).classList.remove('fa-plus')
			document.getElementById('icono-dispositivo-' + index).classList.add('fa-window-minimize')
			let dataTable = pintarTablaSecundaria(index)
			row.child(dataTable).show();
		} else {
			$(this).attr('tag-hide', 'false')
			document.getElementById('icono-dispositivo-' + index).classList.add('fa-plus')
			document.getElementById('icono-dispositivo-' + index).classList.remove('fa-window-minimize')
			row.child.hide();
			tr.removeClass('shown');
		}
	});

	pintarTablaSecundaria = function (position) {
		let dispositivo = $scope.listDispositivosDetalle[position]
		let arrayDetalleRed = [];
		arrayDetalleRed.push(dispositivo.detalleRed)
		let tableHTML = '<div class="details-container">' +
			'<table id="table_dispositovos_ot_nivel2" class="table table-hover table-bordered" cellspacing="0" style="width:100%">' +
			'<thead id="thead_dispositivo_consulta_ot_nivel2">' +
			'<tr>' +
			'<th>NOMBRE OLT</th>' +
			'<th>TIPO APROVISIONAMIENTO</th>' +
			'<th>FRAME</th>' +
			'<th>SLOT</th>' +
			'<th>PUERTO</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody>';

		arrayDetalleRed.forEach(detalle => {
			tableHTML += "<tr>" +
				"<td>" + ((detalle != undefined && detalle.nombreOlt) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.tipoAprovisionamiento) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.frame) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.slot) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.puerto) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"</tr>";

		})
		tableHTML += '</tbody></table>' +
			'</div>';
		return tableHTML;
	}

    function transformarTextPrecio(num) {
		if ((num && num != '' && num != '0')) {
			return (Math.round(parseFloat(num) * 100) / 100).toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			});
		} else {
			return parseFloat('0.00').toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			});
		}
	}

    $scope.consultaMaterialesDetalleOT = function () {
        if (!is_consulta_detalle_materiales) {
			$scope.tecnicoConsultaMateriales = {};
            $scope.listaMaterialesDetalleOT = [];
            let params = {
                idOrden : $scope.infoOtDetalle.idOrden
            };
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
			gestionTicketSoporteService.consultaDetalleMaterialesOT(params).then(function success(response) {
				console.log(response);
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleGeneral) {
                                if (response.data.result.detalleGeneral.detalleMateriales.length) {
                                    $scope.isTecnicoConsultaMateriales = true;
                                    $scope.tecnicoConsultaMateriales = response.data.result.detalleGeneral;
                                    $scope.tecnicoConsultaMateriales.nombreCommpleto = $scope.tecnicoConsultaMateriales.nombre + ' ' + $scope.tecnicoConsultaMateriales.apellidoPaterno + ' ' + $scope.tecnicoConsultaMateriales.apellidoMaterno
                                    $scope.listaMaterialesDetalleOT = angular.copy(response.data.result.detalleGeneral.detalleMateriales);

                                    let arrayRow = [];
                                    if (tableMaterialesDetalleOT) {
                                        tableMaterialesDetalleOT.destroy();
                                    }
                                    $.each($scope.listaMaterialesDetalleOT, function (i, elemento) {
                                        let row = [];
                                        row[0] = elemento.sku && elemento.sku !== '' ? elemento.sku : 'Sin informaci&oacute;n';
                                        row[1] = elemento.descripcion && elemento.descripcion !== '' ? elemento.descripcion : 'Sin informaci&oacute;n';
                                        row[2] = elemento.tipo && elemento.tipo !== '' ? elemento.tipo : 'Sin informaci&oacute;n';
                                        row[3] = elemento.grupo && elemento.grupo !== '' ? elemento.grupo : 'Sin informaci&oacute;n';
                                        row[4] = elemento.lote && elemento.lote !== '' ? elemento.lote : 'Sin informaci&oacute;n'
                                        row[5] = elemento.numSerie && elemento.numSerie !== '' ? elemento.numSerie : 'Sin informaci&oacute;n';
                                        row[6] = elemento.familia && elemento.familia !== '' ? elemento.familia : 'Sin informaci&oacute;n';
                                        row[7] = elemento.docSap && elemento.docSap !== '' ? elemento.docSap : 'Sin informaci&oacute;n';
                                        row[8] = transformarTextPrecio(elemento.precio);
                                        row[9] = elemento.cantidad && elemento.cantidad !== '' ? elemento.cantidad : 'Sin informaci&oacute;n';
                                        row[10] = transformarTextPrecio(elemento.costo);
                                        row[11] = elemento.unidad && elemento.unidad !== '' ? elemento.unidad : 'Sin informaci&oacute;n';
                                        row[12] = elemento.comentariosSap && elemento.comentariosSap !== '' ? elemento.comentariosSap : 'Sin informaci&oacute;n';
                                        arrayRow.push(row);
                                    });
                                    tableMaterialesDetalleOT = $('#tableMaterialesDetalleOT').DataTable({
                                        "paging": true,
                                        "lengthChange": false,
                                        "ordering": true,
                                        "pageLength": 10,
                                        "info": true,
                                        "data": arrayRow,
                                        "autoWidth": true,
                                        "language": idioma_espanol_not_font,
                                    });
                                    swal.close()
                                } else {
                                    mostrarMensajeInformativo("No se encontraron datos de materiales");
                                    swal.close()
                                }
                            } else {
                                $scope.isTecnicoConsultaMateriales = false;
                                mostrarMensajeInformativo("No se encontraron datos de materiales")
                                swal.close()
                            }
                        } else {
                            $scope.isTecnicoConsultaMateriales = false;
                            mostrarMensajeInformativo(response.data.result.description);
                            swal.close();
                        }
                        is_consulta_detalle_materiales = true;
                    } else {
                        $scope.isTecnicoConsultaMateriales = false;
                        mostrarMensajeErrorAlert('Ha ocurrido un error en la consulta de los datos');
                        swal.close()
                    }
                } else {
                    $scope.isTecnicoConsultaMateriales = false;
                    mostrarMensajeErrorAlert('Ha ocurrido un error en la consulta de los datos');
                    swal.close()
                }
			}).catch(err => handleError(err));
		}
    }

    $scope.abrirModalModelos = function(isNuevo){
        $scope.isNuevo = isNuevo;
        $('#jstree-modelo').jstree("deselect_all");
        $("#searhArbolModelo").val("");
        $("#jstree-modelo").jstree("search", '');
        if($scope.cambioEquipo.idArbolNuevo && isNuevo){
            $('#jstree-modelo').jstree('select_node', $scope.cambioEquipo.idArbolNuevo);
        }else if($scope.cambioEquipo.idArbolViejo && !isNuevo){
            $('#jstree-modelo').jstree('select_node', $scope.cambioEquipo.idArbolViejo);
        }
        $("#modal-arbol-modelo").modal('show');
        setTimeout(function () {
            $("#searhArbolModelo").focus();
        }, 750);
    }
    
    $scope.consultarRecoleccionDetalleOt = function () {
        if (!is_consulta_detalle_recoleccion) {
            $scope.tecnicoConsultaRecoleccion = {};
            $scope.equiposTecnicoRecoleccion = [];
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            let params = {
                "idOrden": $scope.infoOtDetalle.idOrden
            };
            gestionTicketSoporteService.consultarDetalleRecoleccionOT(params).then(function success(response) {
                console.log(response);
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleEquipos.length) {
                                $scope.isTecnicoConsultaRecoleccion = true;
                                is_consulta_detalle_recoleccion = true;
                                $scope.tecnicoConsultaRecoleccion = angular.copy(response.data.result);
                                $scope.equiposTecnicoRecoleccion = angular.copy(response.data.result.detalleEquipos);
                                let arrayRow = [];
                                if (tableRecoleccionDetalleOT) {
                                    tableRecoleccionDetalleOT.destroy();
                                }
                                $.each($scope.equiposTecnicoRecoleccion, function (i, elemento) {
                                    let row = [];
                                    row[0] = elemento.numSerie !== undefined ? elemento.numSerie : 'Sin informaci&oacute;n';
                                    row[1] = elemento.descripcion !== undefined ? elemento.descripcion : 'Sin informaci&oacute;n';
                                    row[2] = elemento.centro !== undefined ? elemento.centro : 'Sin informaci&oacute;n';
                                    row[3] = elemento.almacen !== undefined ? elemento.almacen : 'Sin informaci&oacute;n';
                                    row[4] = elemento.recuperado == 1 ?
                                        '<span class="content-success-generic">' +
                                        '<i class="icono-success-generic fas fa-check"></i>' +
                                        '</span>' : '';
                                    row[5] = elemento.adicional == 1 ?
                                        '<span class="content-success-generic">' +
                                        '<i class="icono-success-generic fas fa-check"></i>' +
                                        '</span>' : '';
                                    row[6] = elemento.fechaRegistro !== undefined ? elemento.fechaRegistro : 'Sin informaci&oacute;n';
                                    arrayRow.push(row);
                                });

                                tableRecoleccionDetalleOT = $('#tableRecoleccionDetalleOT').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "ordering": true    ,
                                    "pageLength": 10,
                                    "info": true,
                                    "scrollX": false,
                                    "data": arrayRow,
                                    "autoWidth": false,
                                    "language": idioma_espanol_not_font
                                });
                                swal.close();
                            } else {
                                swal.close();
                                mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
                                $scope.isTecnicoConsultaRecoleccion = false;
                            }
                        } else {
                            swal.close();
                            mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
                            $scope.isTecnicoConsultaRecoleccion = false;
                        }
                    } else {
                        swal.close();
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                        $scope.isTecnicoConsultaRecoleccion = false;
                    }
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    $scope.isTecnicoConsultaRecoleccion = false;
                }
            }).catch(err => handleError(err));
        }
    }

    $('#modal-detalleOT').on('hidden.bs.modal', function () {
        is_consulta_info_ot = false;
        is_consulta_historico = false;
        is_consulta_detalle_soporte = false;
        is_consulta_detalle_materiales = false;
        is_consulta_detalle_pagos = false;
        is_consulta_detalle_dispositivos = false;
        is_consulta_detalle_recoleccion = false;
        document.querySelector('#informacion-ot').click();
    });

    $(document.body).on("click", ".orderColumnTable", function () {
        let colOrder = $(this).attr('data-idColumn');
        let isNumber = $(this).attr('data-isNumber');
        if ($(this).hasClass('orderColumnAscTable')) {
            $scope.orderTableByColumnGeneric(colOrder, true, isNumber);
            $(this).removeClass('orderColumnAscTable');
            $(this).addClass('orderColumnDescTable');
        } else {
            $scope.orderTableByColumnGeneric(colOrder, false, isNumber);
            $(this).addClass('orderColumnAscTable');
            $(this).removeClass('orderColumnDescTable');
        }
    });

    $scope.orderTableByColumnGeneric = function (colNumber, isAsc, isNumber) {
        $scope.arrayTicketSort = [];
        $scope.arrayTicketSort = angular.copy($scope.tempTicketsSoporte);
        if (isNumber === 'true') {
            $scope.arrayTicketSort.sort(function (a, b) {
                if (a[colNumber] == '' || a[colNumber] == undefined) {
                    a[colNumber] = 0;
                }
                if (b[colNumber] == '' || b[colNumber] == undefined) {
                    b[colNumber] = 0;
                }
                if (isAsc) {
                    return (Number(a[colNumber]) > Number(b[colNumber])) ? 1 : (Number((a[colNumber]) < Number(b[colNumber])) ? -1 : 0);
                } else {
                    return (Number(b[colNumber]) > Number(a[colNumber])) ? 1 : (Number((b[colNumber]) < Number(a[colNumber])) ? -1 : 0);
                }
            });
        } else {
            $scope.arrayTicketSort.sort(function (a, b) {
                if (a[colNumber] == '' || a[colNumber] == undefined || a[colNumber] == null) {
                    a[colNumber] = 'Sin Informaci&oacute;n'
                }
                if (b[colNumber] == '' || b[colNumber] == undefined || b[colNumber] == null) {
                    b[colNumber] = 'Sin Informaci&oacute;n'
                }
                if (isAsc) {
                    return (a[colNumber].replace(/ /g, '').toLowerCase() > b[colNumber].replace(/ /g, '').toLowerCase()) ? 1 : ((a[colNumber].replace(/ /g, '').toLowerCase() < b[colNumber].replace(/ /g, '').toLowerCase()) ? -1 : 0);
                } else {
                    return (b[colNumber].replace(/ /g, '').toLowerCase() > a[colNumber].replace(/ /g, '').toLowerCase()) ? 1 : ((b[colNumber].replace(/ /g, '').toLowerCase() < a[colNumber].replace(/ /g, '').toLowerCase()) ? -1 : 0);
                }
            });
        }

        $.each($scope.arrayTicketSort, function (index, elemento) {
            ticketSoporteTable.row(index).data(elemento);
        });
    }

}]);


angular.element(document).ready(function () {
    $("#moduloGestionTickets").addClass('active');


});
