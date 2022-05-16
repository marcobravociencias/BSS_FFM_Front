var app = angular.module('seguimientoSoporteApp', []);

app.controller('seguimientoSoporteController', ['$scope', '$q', 'seguimientoSoporteService', '$filter', function ($scope, $q, seguimientoSoporteService, $filter) {
    const FECHA_HOY_DATE = new Date();
    var regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    let seguimientoTable;
    let ticketTable;

    $scope.isBusquedaGeneral = true;
    $scope.isDetalleTicket = false;
    $scope.isCambioEquipos = false;
    $scope.detalleCaptura = {};
    $scope.infoUsuario = {};
    $scope.catalogoEstatusUsuarios = [];
    $scope.verCambioEstatusUsuario = true;
    $scope.catalogosSeguimiento = {};
    $scope.catalogosSeguimientoGeografia = [];
    $scope.ticketDetalle = {};
    $scope.listadoNuevoViejosEquipo = [];

    $scope.consultarCatalogos = function () {
        $q.all([
            seguimientoSoporteService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloSeguimiento" }),
            seguimientoSoporteService.consultaEstatusTicketSoporte(),
            seguimientoSoporteService.consultaTecnologiaTicketSoporte(),
            seguimientoSoporteService.consultaEquiposSoporte(),
            seguimientoSoporteService.consultaPropietariosTicketSoporte(),
            seguimientoSoporteService.consultarAccionesDinamicaDetalle(),
            seguimientoSoporteService.consultaFallasTicketSoporte(),
            seguimientoSoporteService.consultaCatalogoGeografia()
        ]).then(function (results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $scope.elementosConfigGeneral = new Map(Object.entries(results[0].data.result))
                        let resultConf = results[0].data.result
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            if (llavesResult.N_FILTRO_GEOGRAFIA)
                                $scope.nivelGeografia = parseInt(llavesResult.N_FILTRO_GEOGRAFIA)

                            if (llavesResult.N_ESTATUS_PENDIENTES)
                                $scope.nivelEstatus = parseInt(llavesResult.N_ESTATUS_PENDIENTES)

                            $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

                            if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
                                $scope.configPermisoAccionConsultaOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaOT" })[0] != undefined);
                                $scope.configPermisoAccionDescargaReporteOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaReporteOT" })[0] != undefined);
                            }
                            $("#idBody").removeAttr("style");
                            validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                            validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
                        }
                    } else {
                        swal.close();
                        toastr.warning('No se encontraron datos para la configuracion');
                    }
                } else {
                    swal.close();
                    toastr.warning(results[3].data.resultDescripcion);
                }
            } else {
                swal.close();
                toastr.error('Ha ocurrido un error en la consulta de configuracion');
            }
            $("#idBody").css("display", "block");
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        $scope.catalogosSeguimiento.estatus = results[1].data.result.estatusTicketSC;

                    } else {
                        toastr.warning('No se encontr&oacute; el catalogo de estatus');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de estatus');
            }
            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        $scope.catalogosSeguimiento.tecnologias = results[2].data.result.tecnologiaTicketSC;

                    } else {
                        toastr.warning('No se encontr&oacute; el catalogo de tecnolog\u00EDas');
                    }
                } else {
                    toastr.warning(results[2].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de tecnolog\u00EDas');
            }

            if (results[3].data !== undefined) {
                if (results[3].data.respuesta) {
                    if (results[3].data.result) {
                        $scope.catalogosSeguimiento.equipos = results[3].data.result.equipos;

                    } else {
                        toastr.warning('No se encontr&oacute; el catalogo de equipos');
                    }
                } else {
                    toastr.warning(results[3].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de equipos');
            }

            if (results[4].data !== undefined) {
                if (results[4].data.respuesta) {
                    if (results[4].data.result) {
                        $scope.catalogosSeguimiento.propietarios = results[4].data.result.propietarios;

                    } else {
                        toastr.warning('No se encontr&oacute; el catalogo de propietarios');
                    }
                } else {
                    toastr.warning(results[4].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de propietarios');
            }

            if (results[5].data !== undefined) {
                if (results[5].data.respuesta) {
                    if (results[5].data.result) {
                        $scope.catalogosSeguimiento.acciones = results[5].data.result.acciones;

                    } else {
                        toastr.warning('No se encontr&oacute; el catalogo de dictamen');
                    }
                } else {
                    toastr.warning(results[5].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de dictamen');
            }

            if (results[6].data !== undefined) {
                if (results[6].data.respuesta) {
                    if (results[6].data.result) {
                        $scope.catalogosSeguimiento.fallas = results[6].data.result.soportes;

                    } else {
                        toastr.warning('No se encontr&oacute; el catalogo de fallas');
                    }
                } else {
                    toastr.warning(results[6].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de fallas');
            }

            if (results[7].data !== undefined) {
                if (results[7].data.respuesta) {
                    if (results[7].data.result) {
                        $scope.catalogosSeguimientoGeografia = results[7].data.result.geografia;

                    } else {
                        toastr.warning('No se encontr&oacute; el catalogo de fallas');
                    }
                } else {
                    toastr.warning(results[6].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de fallas');
            }
        }).catch(err => handleError(err));
    }
    $scope.consultarCatalogos();


    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'es',
        todayHighlight: true,
        clearBtn: false
    });

    $('#filtro_fecha_inicio').datepicker('update', moment(FECHA_HOY_DATE).toDate());
    $('#filtro_fecha_fin').datepicker('update', moment(FECHA_HOY_DATE).toDate());

    seguimientoTable = $('#seguimientoTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font,
    });

    ticketTable = $('#ticketTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font,
    });

    $('#searchTextGeneral').on('keyup', function () {
        seguimientoTable.search(this.value).draw();
    })

    $('#searchTextTicket').on('keyup', function () {
        ticketTable.search(this.value).draw();
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

    $scope.consultaCatalogoInfoUsuario = function () {
        $scope.catalogoEstatusUsuarios = infoUsuarioEstatusHoras.result;
    }

    $scope.cerrarDetalleTicket = function () {
        $scope.isDetalleTicket = false
    }

    $scope.consultaCatalogoInfoUsuario();

    $scope.consultaSeguimiento = function () {
        let mensaje = '<ul>';
        let isValid = true;

        if (!$scope.validarFecha('filtro_fecha_inicio', 'filtro_fecha_fin')) {
            mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
            isValid = false;
        }

        if (!isValid) {
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();

            if (seguimientoTable) {
                seguimientoTable.destroy();
            }

            let arraRow = [];
            $.each(listGeneral.result, function (i, elemento) {
                let row = [];
                let color = elemento.conexion.split('-');
                row[0] = '<i class="fas fa-circle icon-conexion" style="color:' + color[1] + '"></i>';
                row[1] = elemento.tecnico;
                row[2] = elemento.abierto;
                row[3] = elemento.cerrado;
                row[4] = elemento.escalado;
                row[5] = elemento.entrada;
                row[6] = elemento.comida ? elemento.comida : 'Sin informaci&oacute;n';
                row[7] = elemento.salida ? elemento.salida : 'Sin informaci&oacute;n';
                row[8] = '<i class="fas fa-ticket-alt icon-table" title="Tickets" style="background-color: #7f4c9d" onclick="consultaTicket(' + "'" + elemento.id_conexion + "'" + ')"></i>';
                arraRow.push(row);
            })
            seguimientoTable = $('#seguimientoTable').DataTable({
                "paging": true,
                "lengthChange": false,
                "ordering": false,
                "pageLength": 10,
                "info": true,
                "scrollX": false,
                "data": arraRow,
                "autoWidth": false,
                "language": idioma_espanol_not_font,
            });
            swal.close();
        }
    }

    consultaTicket = function (conexion) {
        $scope.isBusquedaGeneral = false;
        $scope.$apply();

        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();

        if (ticketTable) {
            ticketTable.destroy();
        }

        let arraRow = [];
        $.each(listTitcket.result.tablaTickets, function (i, elemento) {
            let row = [];
            row[0] = elemento.ot;
            row[1] = elemento.ticket;
            row[2] = elemento.os;
            row[3] = elemento.fecha_creacion;
            row[4] = elemento.tarea ? elemento.tarea : 'Sin informaci&oacute;n';
            row[5] = elemento.na_asignacion;
            row[6] = elemento.estatus;
            row[7] = elemento.escalado ? elemento.escalado : 'Sin informaci&oacute;n';
            row[8] = '<i class="fas fa-bars icon-table" title="Detalle" style="background-color: #58b3bf" onclick="consultaDetalle()"></i>';
            arraRow.push(row);
        })
        ticketTable = $('#ticketTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arraRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
        });
        swal.close();
    }

    function camelCase(text) {
        let arr = text.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].toLowerCase();
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ");
    }


    $scope.backGeneral = function () {
        $scope.isBusquedaGeneral = true;
    }

    consultaDetalle = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        seguimientoSoporteService.consultaDetalleSoporte(18).then((response) => {
            swal.close()
            if (response.data.respuesta) {
                if (response.data.result) {
                  
                    let geografia = {};
                    $scope.ticketDetalle = response.data.result.detalleGeneral;
                    $scope.ticketDetalle.detalleTicketSc.fallaTxt = $scope.catalogosSeguimiento.fallas.find((e) => e.id == $scope.ticketDetalle.detalleTicketSc.falla).descripcion
                    $scope.ticketDetalle.detalleTicketSc.categoriaTxt = $scope.catalogosSeguimiento.fallas.find((e) => e.id == $scope.ticketDetalle.detalleTicketSc.categoria).descripcion
                    $scope.ticketDetalle.detalleTicketSc.subcategoriaTxt = $scope.catalogosSeguimiento.fallas.find((e) => e.id == $scope.ticketDetalle.detalleTicketSc.subcategoria).descripcion
                    $scope.ticketDetalle.detalleTicketSc.propietarioTxt = $scope.catalogosSeguimiento.propietarios.find((e) => e.id == $scope.ticketDetalle.detalleTicketSc.idPropietarioSc).descripcion
                    $scope.ticketDetalle.detalleTicketSc.motivoTxt = $scope.catalogosSeguimiento.propietarios.find((e) => e.id == $scope.ticketDetalle.detalleTicketSc.idMotivoSc).descripcion
                    
                    $scope.ticketDetalle.detalleTicketSc.idTecnologia = $scope.ticketDetalle.detalleTicketSc.idTecnologia + '';
                    $scope.ticketDetalle.detalleTicketSc.idEstatus = $scope.ticketDetalle.detalleTicketSc.idEstatus + '';

                    let urlTec = regexUrl.test($scope.ticketDetalle.detalleOtDetenida.fotoTecnico) ? $scope.ticketDetalle.detalleOtDetenida.fotoTecnico : "./resources/img/plantainterna/despacho/tecnicootasignada.png";
                    let urlIng = regexUrl.test($scope.ticketDetalle.detalleTicketSc.fotoInge) ? $scope.ticketDetalle.detalleTicketSc.fotoInge : "./resources/img/plantainterna/despacho/tecnicootasignada.png";

                    setTimeout(() => {
                        $("#fotoIngeniero").attr("src", urlIng);
                        $("#fotoTecnico").attr("src", urlTec);
                        $scope.isDetalleTicket = true;
                        $scope.$apply();
                    }, 100);

                    let clusterInd = $scope.catalogosSeguimientoGeografia.find(e => e.id == $scope.ticketDetalle.detalleOtDetenida.idCluster)
                    if (clusterInd) {
                        let zonaInd = $scope.catalogosSeguimientoGeografia.find(e => e.id == parseInt(clusterInd.padre))
                        let distritoInd = $scope.catalogosSeguimientoGeografia.find(e => e.id == parseInt(zonaInd.padre))
                        let ciudadInd = $scope.catalogosSeguimientoGeografia.find(e => e.id == parseInt(distritoInd.padre))
                        let regionInd = $scope.catalogosSeguimientoGeografia.find(e => e.id == parseInt(ciudadInd.padre))
                        geografia = {
                            clusterText: camelCase(clusterInd.nombre),
                            zonaText: camelCase(zonaInd.nombre),
                            distritoText: camelCase(distritoInd.nombre),
                            ciudadText: camelCase(ciudadInd.nombre),
                            regionText: camelCase(regionInd.nombre),
                        }
                    }
                    $scope.ticketDetalle.geografia = geografia;

                    if ($scope.ticketDetalle.detalleTicketSc.acciones.length && $scope.catalogosSeguimiento.acciones.length) {
                        $scope.ticketDetalle.detalleTicketSc.acciones.map(function (s) {
                            if (Number(s.valor) == 1) {
                                $("#dictamen-" + s.idAccion).prop('checked', true);
                                if (Number(s.idAccion) == 2) {
                                    $scope.isCambioEquipos = true;
                                    if (s.detalleSeries.length) {
                                        $.each(s.detalleSeries, function (i, equipo) {
                                            equipo.descripcion = $scope.catalogosSeguimiento.equipos.find((e) => e.id == equipo.idTipoEquipo).descripcion
                                        })
                                    }
                                    $scope.listadoNuevoViejosEquipo = s.detalleSeries ? s.detalleSeries : [];
                                }
                            }
                        });
                    }

                  

                } else {
                    mostrarMensajeWarningValidacion('No se encontr&oacute; el detalle del ticket')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta')
            }
        }).catch((err) => handleError(err));

    }

    $scope.consultaSeguimiento();

    $scope.changeEstatus = function (idEstatus) {
        let status = $scope.catalogoEstatusUsuarios.catalogoEstatusUsuarios.find((e) => parseInt(e.id) == parseInt(idEstatus));

        swal({
            title: "Cambio de status",
            text: '\u00BFEsta seguro de cambiar el status a ' + status.descripcion.split("-")[0] + '?',
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(function (isConfirm) {
            if (isConfirm) {
                $scope.catalogoEstatusUsuarios.infoHorasUser.ultimoEstatus = status.descripcion;
                $scope.$apply();
            }
        }).catch(swal.noop);
    }

    angular.element(document).ready(function () {
        $("#moduloSeguimiento").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

    });
}])