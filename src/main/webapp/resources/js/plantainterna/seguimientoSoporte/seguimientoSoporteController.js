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
                                $scope.configPermisoAccionConsultaSeguimiento =($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaSeguimiento" })[0] != undefined);
                            }
                            $scope.configPermisoAccionConsultaSeguimiento=true
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
                            }else{
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

    if ($scope.configPermisoAccionConsultaSeguimiento) {
        $scope.consultaSeguimiento();
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
    $scope.comentarioTicket = '';
    $scope.addComentarios = function () {
        if ($('#comentarioTicket').val().trim() !== '' && !/^\s/.test($('#comentarioTicket').val())) {

            let params = {
                idOrden: $scope.ticketDetalle.detalleOtDetenida.otGeneraSoporte,
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

    angular.element(document).ready(function () {
        $("#moduloSeguimiento").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

    });
}])