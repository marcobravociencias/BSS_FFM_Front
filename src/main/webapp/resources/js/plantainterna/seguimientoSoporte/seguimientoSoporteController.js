var app = angular.module('seguimientoSoporteApp', []);

app.controller('seguimientoSoporteController', ['$scope', '$q', 'seguimientoSoporteService', '$filter', 'genericService', 'busquedaSalesforceService', function ($scope, $q, seguimientoSoporteService, $filter, genericService, busquedaSalesforceService) {
    app.busquedaSalesforce($scope, busquedaSalesforceService)

    var maxColumnsSeguimiento = 13; //Si cambias el numero debes cambiar las columnas en jsp
    const FECHA_HOY_DATE = new Date();
    var regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    let seguimientoTable;
    let ticketTable;

    $scope.isBusquedaGeneral = true;
    $scope.isDetalleTicket = false;
    $scope.isCambioEquipos = false;
    $scope.isNoticias = false;
    $scope.detalleCaptura = {};
    $scope.infoUsuario = {};
    $scope.catalogoEstatusUsuarios = [];
    $scope.verCambioEstatusUsuario = true;
    $scope.catalogosSeguimiento = {};
    $scope.catalogosSeguimientoGeografia = [];
    $scope.ticketDetalle = {};
    $scope.listadoNuevoViejosEquipo = [];
    $scope.usuarioFoto = {};
    $scope.idIngeniero = '';
    $scope.listIngenieros = [];
    $scope.configPermisoAccionConsultaSeguimiento = false;

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

    let tableRecoleccionDetalleOT = $('#tableRecoleccionDetalleOT').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    let tablePagosDetalleOT = $('#tablePagosDetalleOT').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    let tableDispositivosDetalleOT = $('#tableDispositivosDetalleOT').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    let tableMaterialesDetalleOT = $('#tableMaterialesDetalleOT').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

    // MODAL DETALLE OT

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
                                $scope.configPermisoAccionConsultaSeguimiento = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaSeguimiento" })[0] != undefined);
                            }
                            $scope.configPermisoAccionConsultaSeguimiento = true
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

            if ($scope.configPermisoAccionConsultaSeguimiento) {
                $scope.consultaSeguimiento();
            }

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
                    toastr.warning(results[7].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de fallas');
            }
        }).catch(err => handleError(err));
    }
    $scope.consultarCatalogos();

    $('.dropup-comments').click(function (e) {
        e.stopPropagation();
    });


    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'es',
        todayHighlight: true,
        clearBtn: false
    });

    $('#filtro_fecha_inicio').datepicker('update', moment(FECHA_HOY_DATE).toDate());
    $('#filtro_fecha_fin').datepicker('update', moment(FECHA_HOY_DATE).toDate());
    $('#filtro_fecha_inicio_ticket').datepicker('update', moment(FECHA_HOY_DATE).toDate());
    $('#filtro_fecha_fin_ticket').datepicker('update', moment(FECHA_HOY_DATE).toDate());

    seguimientoTable = $('#seguimientoTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "scrollX": false,
        "autoWidth": false,
        "columns": [null, null, null, null, null, null, { "visible": false }, { "visible": false }, { "visible": false }, { "visible": false }, { "visible": false }, { "visible": false }, { "visible": false }],
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

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }

    $scope.consultaSeguimiento = function () {
        let mensaje = '<ul>';
        let isValid = true;
        $scope.listIngenieros = [];

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

            let params = {
                fechaInicio: $scope.getFechaFormato($("#filtro_fecha_inicio").val()),
                fechaFin: $scope.getFechaFormato($("#filtro_fecha_fin").val()),
                tipoFecha: $("#tipo_fecha").val(),
                idSupervisor: $("#prop-session").val().split('_')[1]
            }

            let arraRow = [];
            let columns = [
                { "title": "Foto" },
                { "title": "Nombre" },
                { "title": "#Empleado" },
                { "title": "Usuario" },
                { "title": "Ciudad" },
                { "title": "Acciones" },
                { "visible": false },
                { "visible": false },
                { "visible": false },
                { "visible": false },
                { "visible": false },
                { "visible": false },
                { "visible": false }
            ];
            seguimientoSoporteService.consultaSeguimientoGeneral(params).then(function success(response) {

                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.seguimientoDetalle.length) {
                                $scope.listIngenieros = response.data.result.seguimientoDetalle;
                                $.each(response.data.result.seguimientoDetalle, function (i, elemento) {
                                    let row = [];
                                    let urlFoto = regexUrl.test(elemento.urlFoto) ? elemento.urlFoto : './resources/img/plantainterna/despacho/tecnicootasignada.png';
                                    row[0] = '<img class="imgFoto" src="' + urlFoto + '" alt="Foto" width="30" height="30" onclick="showImageIng(' + "'" + elemento.numeroIngeniero + "'" + ')"/>';
                                    row[1] = elemento.nombreCompletoIngeniero ? elemento.nombreCompletoIngeniero : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroIngeniero ? elemento.numeroIngeniero : 'Sin informaci&oacute;n';
                                    row[3] = elemento.usuarioIngeniero ? elemento.usuarioIngeniero : 'Sin informaci&oacute;n';
                                    row[4] = elemento.ciudad ? elemento.ciudad : 'Sin informaci&oacute;n';
                                    let count = 5;
                                    if (elemento.contadores) {
                                        $.map(elemento.contadores, function (total, contador) {
                                            row[count] = total;
                                            columns[count] = { "title": contador };
                                            count = count + 1;
                                        })
                                    }

                                    //LLenando columnas y filas vacias
                                    if (row.length < maxColumnsSeguimiento) {
                                        for (let index = row.length + 1; index < maxColumnsSeguimiento; index++) {
                                            columns[index] = { "visible": false };
                                            row[index] = '-';
                                        }
                                    }

                                    columns[count] = { "title": "Acciones" };
                                    row[count] = '<i class="fas fa-ticket-alt icon-table" title="Tickets" onclick="consultaTicket(' + "'" + elemento.idIngeniero + "', true" + ')"></i>';
                                    arraRow.push(row);
                                })
                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.info('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }

                seguimientoTable = $('#seguimientoTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": false,
                    "pageLength": 10,
                    "info": true,
                    "data": arraRow,
                    "autoWidth": false,
                    "bDestroy": true,
                    "columns": columns,
                    "language": idioma_espanol_not_font
                });
                swal.close();
            }).catch(err => handleError(err));
        }
    }


    $scope.consultaTicketFecha = function () {
        consultaTicket($scope.idIngeniero, false);
    }

    consultaTicket = function (ingeniero, isSetDate) {
        let mensaje = '<ul>';
        let isValid = true;

        if (!$scope.validarFecha('filtro_fecha_inicio_ticket', 'filtro_fecha_fin_ticket')) {
            mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
            isValid = false;
        }

        if (!isValid) {
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            $scope.idIngeniero = ingeniero;
            $scope.isBusquedaGeneral = false;

            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();

            if (ticketTable) {
                ticketTable.destroy();
            }

            if (isSetDate) {
                $("#filtro_fecha_inicio_ticket").val($("#filtro_fecha_inicio").val());
                $("#filtro_fecha_fin_ticket").val($("#filtro_fecha_fin").val());
                $("#tipo_fecha_ticket").val($("#tipo_fecha").val());
            }

            let params = {
                fechaInicio: $scope.getFechaFormato($("#filtro_fecha_inicio_ticket").val()),
                fechaFin: $scope.getFechaFormato($("#filtro_fecha_fin_ticket").val()),
                tipoFecha: $("#tipo_fecha_ticket").val(),
                idIngeniero: ingeniero
            }


            let arraRow = [];
            seguimientoSoporteService.consultaTicketGeneral(params).then(function success(response) {
                swal.close();
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            $.each(response.data.result.detalleIngeniero, function (i, elemento) {
                                let row = [];
                                row[0] = elemento.otCentralizado ? elemento.otCentralizado : 'Sin informaci&oacute;n';
                                row[1] = elemento.folioSistema ? elemento.folioSistema : 'Sin informaci&oacute;n';
                                row[2] = elemento.claveCliente ? elemento.claveCliente : 'Sin informaci&oacute;n';
                                row[3] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                row[4] = elemento.nombreCompletoIngeniero ? elemento.nombreCompletoIngeniero : 'Sin informaci&oacute;n';
                                row[5] = elemento.numeroEmpleadoIngeniero ? elemento.numeroEmpleadoIngeniero : 'Sin informaci&oacute;n';
                                row[6] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                row[7] = elemento.fallaReportada ? elemento.fallaReportada : 'Sin informaci&oacute;n';
                                row[8] = '<i class="fas fa-bars icon-table" title="Detalle" onclick="consultaDetalle(' + "'" + elemento.idTicket + "'" + ')"></i>';
                                arraRow.push(row);
                            })
                        } else {
                            toastr.warning('No se encontraron tickets');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
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
            }).catch(err => handleError(err));
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


    $scope.backGeneral = function () {
        $scope.isBusquedaGeneral = true;
    }

    consultaDetalle = function (ticket) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        seguimientoSoporteService.consultaDetalleSoporte(Number(ticket)).then((response) => {
            swal.close()
            if (response.data.respuesta) {
                if (response.data.result) {
                    let geografia = {};
                    $(".accordion-button").addClass("collapsed");
                    $(".accordion-collapse").removeClass("show");
                    $("#panelsStayOpen-headingOne .accordion-button").click();
                    $("#panelsStayOpen-headingTwo .accordion-button").click();
                    $scope.ticketDetalle = response.data.result.detalleGeneral;
                    $scope.consultaChat(); 
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




    $scope.showImage = function (type) {
        let url = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        if (type == 'tecnico') {
            url = regexUrl.test($scope.ticketDetalle.detalleOtDetenida.fotoTecnico) ? $scope.ticketDetalle.detalleOtDetenida.fotoTecnico : url;
            $scope.usuarioFoto.tipo = "Tecnico";
            $scope.usuarioFoto.noEmpleado = $scope.ticketDetalle.detalleOtDetenida.numEmpleadoTecnico;
            $scope.usuarioFoto.usuario = $scope.ticketDetalle.detalleOtDetenida.tecnico;
        } else if (type == 'ingeniero') {
            url = regexUrl.test($scope.ticketDetalle.detalleTicketSc.fotoInge) ? $scope.ticketDetalle.detalleTicketSc.fotoInge : url;
            $scope.usuarioFoto.tipo = "Ingeniero";
            $scope.usuarioFoto.noEmpleado = $scope.ticketDetalle.detalleTicketSc.numEmpleadoInge;
            $scope.usuarioFoto.usuario = $scope.ticketDetalle.detalleTicketSc.ingeniero;
        }

        $('#img_tec').attr('src', url);
        $('#modalFoto').modal('show');

    }

    showImageIng = function (numeroIngeniero) {
        let url = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        let ing = $scope.listIngenieros.find((e) => e.numeroIngeniero == numeroIngeniero);
        url = regexUrl.test(ing.urlFoto) ? ing.urlFoto : url;
        $scope.usuarioFoto.tipo = "Ingeniero";
        $scope.usuarioFoto.noEmpleado = numeroIngeniero;
        $scope.usuarioFoto.usuario = ing.nombreCompletoIngeniero;
        $scope.$apply();
        $('#img_tec').attr('src', url);
        $('#modalFoto').modal('show');
    }

    $scope.comentariosOrdenTrabajo = []; 
    $scope.consultaChat = function () { 
        $scope.comentariosOrdenTrabajo = []; 
        let params = { 
            idOt: $scope.ticketDetalle.detalleOtDetenida.otGeneraSoporte 
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

    // EVIDENCIA OT
    mostarImagenesCategoriaEvidenciaOT = function () {
        var $imageLinks = $('.magnific.item:visible');
        var items = [];

        $imageLinks.each(function (index, elemento) {
            var $item = $(this);
            var magItem = {
                src: $item.attr('href'),
                type: 'image'
            };
            magItem.title = $item.data('title');
            items.push(magItem);
        });
        $imageLinks.magnificPopup({
            mainClass: 'mfp-fade',
            items: items,
            gallery: {
                enabled: true,
                tPrev: $(this).data('prev-text'),
                tNext: $(this).data('next-text')
            },
            type: 'image',
            callbacks: {
                beforeOpen: function () {
                    var index = $imageLinks.index(this.st.el);
                    if (-1 !== index) {
                        this.goTo(index);

                    }
                },
                open: function () {
                    $.magnificPopup.instance._onFocusIn = function (e) { };
                }
            }
        });
    }

    $(document.body).on("click", ".btn_categoria_img", function () {
        var id_categoria = $.trim($(this).attr('attr_id_cat'));
        if (id_categoria === '') {
            $(".magnific.item").show();
            $('.imagen_content:hidden').show(400);
            setTimeout(function () { mostarImagenesCategoriaEvidenciaOT(); }, 500);
        } else {
            if ($(".imagen_content:visible").length > 0) {
                $(".imagen_content:visible").hide(150, "linear", function () {

                    $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                    $(".magnific.item.imgtipo_" + id_categoria + "").show();

                    $('.content_img_' + id_categoria).show(200);
                    //Manda function magnific popup
                    mostarImagenesCategoriaEvidenciaOT();
                });
            } else {
                $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                $(".magnific.item.imgtipo_" + id_categoria + "").show();

                $('.content_img_' + id_categoria).show(200);
                //Manda function magnific popup
                mostarImagenesCategoriaEvidenciaOT();
            }
        }
    });

    $scope.getEvidenciasImagenes = function (tipo) {
        $scope.listImagenesTipo = [];
        if (tipo.toString() === '0') {
            $scope.listImagenesTipo = $scope.listEvidenciaImagenes.imagenes;
        } else {
            $scope.listEvidenciaImagenes.tipos.map(function (e) {
                if (e.id.toString() === tipo.toString()) {
                    $scope.listImagenesTipo = e.imagenes;
                    return false;
                }
            });
        }
        $(".tipo_evidencia").removeClass("tipo-evidencia-selected");
        $("#categoria_img_" + tipo).addClass("tipo-evidencia-selected");
    }

    let groupByEvidencias = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    $scope.listEvidenciaImagenes = {};
    $scope.consultaEvidenciaOTDetalle = function (ot) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.listEvidenciaImagenes = {};
        let params = {
            orden: ot,
        }
        $('.idoti').text(ot);
        seguimientoSoporteService.consultaEvidenciaOT(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.evidencias) {
                            $scope.listEvidenciaImagenes.imagenes = response.data.result.evidencias;
                            $scope.listEvidenciaImagenes.tipos = [];
                            $scope.listImagenesTipo = response.data.result.evidencias;
                            let listaTipos = [];

                            var count_cantidad_por_tipo = groupByEvidencias(response.data.result.evidencias, 'idCatEvidencia');
                            $scope.listEvidenciaImagenes.imagenes.map(function (e) {
                                let isExist = listaTipos.find((t) => e.idCatEvidencia == t.id)
                                if (!isExist) {
                                    let imagenes = [];
                                    if (count_cantidad_por_tipo[e.idCatEvidencia].length) {
                                        imagenes = count_cantidad_por_tipo[e.idCatEvidencia]
                                    }
                                    listaTipos.push({
                                        id: e.idCatEvidencia,
                                        descripcion: e.tipoEvidencia,
                                        imagenes: imagenes
                                    });
                                }
                            });
                            $scope.listEvidenciaImagenes.tipos = listaTipos;
                            is_consultar_evidencia = true;
                            $('#modal-evidenciaOT').modal('show');
                            setTimeout(function () {
                                $("#categoria_img_0").click();
                                $("#categoria_img_0").addClass("tipo-evidencia-selected");
                            }, 100);
                            swal.close();
                        } else {
                            swal.close();
                            mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        }
                    } else {
                        swal.close();
                        mostrarMensajeInformativo("No se encontraron evidencias")
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
    // EVIDENCIA OT

    // MODAL DETALLE OT 
    $scope.consultaDetalleOT = function (idOrden) {
        $scope.infoOtDetalle = {};
        let params = {
            Id_ot: idOrden
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        seguimientoSoporteService.consultaDetalleOT(params).then(function success(response) {
            console.log(response);
            if (response.data) {
                if (response.data.respuesta) {
                    if (response.data.result.orden) {
                        $scope.infoOtDetalle = angular.copy(response.data.result.orden);
                        $scope.permisosModalDetalleOT = $scope.elementosConfigGeneral.get("MODAL_CO_FLUJO_" + $scope.infoOtDetalle.idFlujo).split(",");
                        console.log($scope.permisosModalDetalleOT);
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
			seguimientoSoporteService.consultaDetallePostVentaOt(params).then((result) => {
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
								let html_tmp = "";
								if (elemento.detalleCambioEquipo) {
									elemento.detalleCambioEquipo.forEach((detalle, index) => {
										if (detalle.evidencias && detalle.evidencias.length) {
											contenido_imagenes = retornarFormatoSliders(detalle.evidencias, index);
										} else {
											contenido_imagenes =
												'<h4 id="texto_not_arboles" style="color:#abafae; text-align:center">' +
												'	SIN IMAGENES PARA ESTA FALLA' +
												'</h4>';
										}
										html_tmp += '' +
											'<tr>' +
											'	<td>' +
											'		<div class="row">' +
											'			<div class="col-md-6 colInformacionTabla">' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1"> Tipo equipo:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="ot_fallas"  class="content_text" >' + detalle.descTipoEquipo + '</span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1"> Modelo anterior:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="tipo_falla_corte"  class="content_text" > ' + detalle.descModeloViejo + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1"> Modelo nuevo:</b>	 ' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="tecnico_falla"  class="content_text" > ' + detalle.descModeloNuevo + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1"> N&uacute;m. serie equipo anterior:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="status_falla_corte"  class="content_text" > ' + detalle.numSerieModeloViejo + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1">N&uacute;mero serie equipo nuevo:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="comentarios_falla"  class="content_text" > ' + detalle.numSerieModeloNuevo + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'			</div>' +
											'			<div class="col-md-6">' +
											'					<div class="class-12">' +
											contenido_imagenes +
											'					</div>' +
											'			</div>' +
											'		</div>' +
											'	</tr>' +
											'</td>';
									})
								}
								$('#tablaOTDetalle' + ind + ' tbody').empty().append(html_tmp);
								$('#tablaOTDetalle' + ind).DataTable({
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
            seguimientoSoporteService.consultaDetallePagosOT(params).then((result) => {
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
                                "ordering": false,
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
			seguimientoSoporteService.consultaDetalleDispositivosOT(params).then((result) => {
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
                                    "ordering": false,
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
			seguimientoSoporteService.consultaDetalleMaterialesOT(params).then(function success(response) {
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
                                        "ordering": false,
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
    
    $scope.consultarRecoleccionDetalleOt = function () {
        if (!is_consulta_detalle_recoleccion) {
            $scope.tecnicoConsultaRecoleccion = {};
            $scope.equiposTecnicoRecoleccion = [];
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            let params = {
                "idOrden": $scope.infoOtDetalle.idOrden
            };
            seguimientoSoporteService.consultarDetalleRecoleccionOT(params).then(function success(response) {
                console.log(response);
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleEquipos.length) {
                                $scope.isTecnicoConsultaRecoleccion = true;
                                is_consulta_detalle_recoleccion = true;
                                $scope.tecnicoConsultaRecoleccion = angular.copy(response.data.result);
                                $scope.equiposTecnicoRecoleccion = angular.copy(response.data.result.detalleEquipos);
                                console.log($scope.tecnicoConsultaRecoleccion);
                                console.log($scope.equiposTecnicoRecoleccion);

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
                                        '<div class="text-center">'+
                                        '<span class="content-success-generic">' +
                                        '<i class="icono-success-generic fas fa-check"></i>' +
                                        '</span>'+
                                        '</div>' : '';
                                    row[5] = elemento.adicional == 1 ?
                                        '<div class="text-center">'+
                                        '<span class="content-success-generic">' +
                                        '<i class="icono-success-generic fas fa-check"></i>' +
                                        '</span>'+
                                        '</div>' : '';
                                    row[6] = elemento.fechaRegistro !== undefined ? elemento.fechaRegistro : 'Sin informaci&oacute;n';
                                    arrayRow.push(row);
                                });

                                tableRecoleccionDetalleOT = $('#tableRecoleccionDetalleOT').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "ordering": false,
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
    // MODAL DETALLE OT 

    angular.element(document).ready(function () {
        $("#moduloSeguimiento").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

    });
}])