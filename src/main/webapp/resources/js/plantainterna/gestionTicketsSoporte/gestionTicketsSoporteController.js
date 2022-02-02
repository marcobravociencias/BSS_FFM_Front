var app = angular.module('ticketsSoporteApp', []);

app.controller('ticketsSoporteController', ['$scope', '$q', 'gestionTicketSoporteService', 'genericService', function ($scope, $q, gestionTicketSoporteService, genericService) {
    let ticketSoporteTable;
    let tecnicosCuentaTable;
    $scope.listFallasTicket = [];
    $scope.listCategoriasTicket = [];
    $scope.listSubcategoriasTicket = [];
    $scope.catalogoFallasTicketSoporte = [];
    $scope.listMotivoEscala = {};
    $scope.catalogoTickets = [];
    $scope.listadoTecnicosTicket = [];
    $scope.ticketsSoporte = [];
    $scope.detalleCaptura = {};
    $scope.catalogoEstatusUsuarios = infoUsuarioEstatusHoras.result;
    $scope.contadores = {};
    $scope.isBusqueda = 2;
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

    let ingenieroTable = $('#ingenierosTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });

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

    $scope.searchBy = function (type) {
        if (!$("#span" + type).hasClass('selected-filter')) {
            $scope.filter(type);
            ticketSoporteTable.search(type).draw();
        } else {
            $(".user-filter span").removeClass('selected-filter');
            $(".fa-filter").css('color', '#ccc');
            ticketSoporteTable.search('').draw();
        }
    }

    $scope.consultarCatalogosTicketSoporte = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $q.all([
            genericService.consultarConfiguracionDespachoDespacho(),
            gestionTicketSoporteService.consultaFallasTicketSoporte(),
            gestionTicketSoporteService.consultaCatalogoRegionTicketSoporte(),
            gestionTicketSoporteService.consultarCatalogoTipoOrdenTicketSoporte()
        ]).then(function (results) {
            console.log(results)
            if (results[0].data.respuesta) {
                $scope.elementosConfigGeneral = new Map(Object.entries(results[0].data.result))
                let resultConf = results[0].data.result
                if (resultConf.MODULO_GESTION_TICKETS && resultConf.MODULO_GESTION_TICKETS.llaves) {
                    let llavesResult = results[0].data.result.MODULO_GESTION_TICKETS.llaves;
                    if (llavesResult.N_FILTRO_GEOGRAFIA_GESTION_TICKETS)
                        $scope.nGeografia = parseInt(llavesResult.N_FILTRO_GEOGRAFIA_GESTION_TICKETS)

                    if (llavesResult.N_FILTRO_TIPO_ORDEN_GESTION_TICKETS)
                        $scope.nIntervencion = parseInt(llavesResult.N_FILTRO_TIPO_ORDEN_GESTION_TICKETS)

                    if (llavesResult.N_PUESTO_INGENIERO)
                        $scope.nPuestoIngeniero = parseInt(llavesResult.N_PUESTO_INGENIERO)
                } else {
                    $scope.nIntervencion = 1;
                    $scope.nGeografia = 1;
                    $scope.nPuestoIngeniero = 1;
                }
            }
            console.log(results[1].data);
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    $scope.catalogoTickets = arrayListadoTickets.data.result.catalogoTickets;
                    $scope.catalogoFallasTicketSoporte = results[1].data.result.soportes;
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
                        }
                    });
                    swal.close();
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de catalogos.')
            }
            console.log(results[2].data);
            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    $scope.catGeografiaGeneral = results[2].data.result.geografia;
                    if ($scope.nGeografia) {
                        $scope.listCatRegiones = results[2].data.result.geografia.filter(elemento => { return elemento.nivel <= $scope.nGeografia });
                    } else {
                        $scope.listCatRegiones = results[2].data.result.geografia;
                    }
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de catalogos.')
            }
            console.log(results[3].data);
            if (results[3].data !== undefined) {
                if (results[3].data.respuesta) {
                    $scope.catTipoOrdenesGeneral = results[3].data.result;
                    if ($scope.nIntervencion) {
                        $scope.listCatTipoOrdenes = results[3].data.result.filter(elemento => { return elemento.nivel <= $scope.nIntervencion });
                    } else {
                        $scope.listCatTipoOrdenes = results[3].data.result;
                    }
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de catalogos.')
            }
        });
    }

    $scope.initTicketsSoporte = function () {
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
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
        $scope.consultarCatalogosTicketSoporte();
    }


    $scope.initTicketsSoporte();

    $scope.loadCategoriaTicketSoporte = function () {
        $scope.listCategoriasTicket = [];
        let idFallaTicket = $("#fallaTicket").val();
        $scope.catalogoFallasTicketSoporte.map(function (c) {
            if (c.idPadre == idFallaTicket) {
                $scope.listCategoriasTicket.push(c);
            }
        });
    }

    $scope.loadSubcategoriaTicketSoporte = function () {
        $scope.listSubcategoriasTicket = [];
        let idCategoriaTicket = $("#categoriaTicket").val()
        $scope.catalogoFallasTicketSoporte.map(function (s) {
            if (s.idPadre == idCategoriaTicket) {
                $scope.listSubcategoriasTicket.push(s);
            }
        });
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
        if ($scope.tecnicoAsignado.isChecked) {
            swal({
                title: "\u00BFEst\u00E1 seguro de asignar el Tecnico?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    swal({ text: 'Cargando datos ...', allowOutsideClick: false });
                    swal.showLoading();
                    $scope.geografiaTecnico = {};
                    $scope.objPrincipal = $scope.catGeografiaGeneral.find(function (elem) { return elem.id == $scope.tecnicoAsignado.idGeografia });
                    $scope.objSec = angular.copy($scope.objPrincipal);
                    for (let index = 1; index < $scope.objPrincipal.nivel; index++) {
                        $scope.objSec = $scope.catGeografiaGeneral.find(function (elem) { return elem.id == Number($scope.objSec.padre) });
                    }
                    $scope.geografiaTecnico = angular.copy($scope.objSec);
                    let nombreTecnico = $scope.tecnicoAsignado.nombre + ' ' + $scope.tecnicoAsignado.apellidoPaterno + ' ' + $scope.tecnicoAsignado.apellidoMaterno;
                    $scope.ticketSoporteR.tipoOrden = $scope.tecnicoAsignado.idIntervencion.toString();
                    $scope.ticketSoporteR.region = $scope.geografiaTecnico.id.toString();
                    $scope.ticketSoporteR.tipoNegocio = $scope.tecnicoAsignado.idUnidadNegocio.toString();
                    $scope.ticketSoporteR.tecnico = nombreTecnico;
                    $scope.ticketSoporteR.telefonoTecnico = $scope.tecnicoAsignado.telefono;
                    $scope.ticketSoporteR.idOrden = $scope.tecnicoAsignado.id;
                    $scope.ticketSoporteR.idTecnico = $scope.tecnicoAsignado.idUsuario;
                    $("#modalBusquedaCuentaTicket").modal('hide');
                    swal.close();
                    $scope.$apply();
                }
            });
        } else {
            mostrarMensajeWarningValidacion("Debes seleccionar un T&eacute;cnico para poder asignarlo");
        }
    }

    changeCheck = function (event) {
        $.each($scope.listOrdenesCuenta, function (i, elemento) {
            if (elemento.isChecked) {
                elemento.isChecked = false;
                $('#' + elemento.id).prop('checked', elemento.isChecked);
                $scope.$apply();
            }
            if ($(event).attr('id') == elemento.id) {
                elemento.isChecked = $(event).is(":checked");
            }
        })
        $scope.$apply();
    }

    $scope.consultarCuentaCliente = function () {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        $scope.listOrdenesCuenta = [];
        $scope.claveCliente = $('#cuentaTicket').val();
        let paramsCuenta = {
            'claveCliente': $scope.claveCliente
        }
        gestionTicketSoporteService.consultaCuentaClienteTicketSoporte(paramsCuenta).then(function success(response) {
            console.log(response);
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.ordenesTrabajo.length) {
                        let arrayRow = [];
                        if (tecnicosCuentaTable) {
                            tecnicosCuentaTable.destroy();
                        }
                        $scope.listOrdenesCuenta = response.data.result.ordenesTrabajo;
                        $scope.listOrdenesCuenta.map(function (e) { e.isChecked = false; return e; })
                        $.each($scope.listOrdenesCuenta, function (i, elemento) {
                            let row = [];
                            let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';
                            let url = imgDefault;
                            if (elemento.urlFoto) {
                                url = elemento.urlFoto;
                            }
                            let nombreCompleto = elemento.nombre + ' ' + elemento.apellidoPaterno + ' ' + elemento.apellidoMaterno;
                            row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="30" height="30"/>';
                            row[1] = elemento.id;
                            row[2] = elemento.folioSistema;
                            row[3] = elemento.numEmpleado;
                            row[4] = nombreCompleto;
                            row[5] = elemento.telefono;
                            row[6] = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="form-check-input checkTecnico" onclick="changeCheck(this)" type="checkbox" name="checkTecnico" value="' + i + '" id="' + elemento.id + '">';
                            arrayRow.push(row);
                        });
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
                        document.getElementById('tecnicosCuentaTable_paginate').addEventListener('click', function () {
                            $.each($scope.listOrdenesCuenta, function (i, elemento) {
                                if (!elemento.isChecked) {
                                    $('#' + elemento.id).prop('checked', false);
                                }
                                $scope.$apply();
                            });
                        })
                        $("#modalBusquedaCuentaTicket").modal('show');
                    } else {
                        mostrarMensajeWarningValidacion("No se encontraron &Oacute;rdenes de Trabajo asociadas a la Cuenta");
                    }
                } else {
                    mostrarMensajeWarningValidacion("No se encontraron &Oacute;rdenes de Trabajo asociadas a la Cuenta");
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion);
            }
            swal.close();
        });
    }

    $('#cuentaTicket').keypress(function (e) {
        if (e.which == 13) {
            $scope.consultarCuentaCliente();
            return false;
        }
    });

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

    $scope.registrarTicketSoporte = function () {
        let mensajeError = '';
        let isValid = true;

        if ($("#cuentaTicket").val() == undefined || $("#cuentaTicket").val() == '') {
            mensajeError += "<li>Debe ingresar un n&uacute;mero de Cuenta</li>";
            $("#cuentaTicket").addClass("invalid-inputTicket");
            isValid = false;
        } else {
            $("#cuentaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#tecnicoTicket").val() == undefined || $("#tecnicoTicket").val() == '') {
            mensajeError += "<li>Debe seleccionar un T&eacute;cnico</li>";
            $("#tecnicoTicket").addClass("invalid-inputTicket");
            isValid = false;
        } else {
            $("#tecnicoTicket").removeClass("invalid-inputTicket");
        }

        if ($("#noSerieTicket").val() == undefined || $("#noSerieTicket").val() == '') {
            mensajeError += "<li>Debe ingresar un n&uacute;mero de Serie del Ticket</li>";
            $("#noSerieTicket").addClass("invalid-inputTicket");
            isValid = false;
        } else {
            $("#noSerieTicket").removeClass("invalid-inputTicket");
        }

        if ($("#descripcionProblemaTicket").val() == undefined || $("#descripcionProblemaTicket").val() == '') {
            $("#descripcionProblemaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe ingresar una descripci&oacute;n del Problema</li>";
            isValid = false;
        } else {
            $("#descripcionProblemaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#fallaTicket").val() == undefined || $("#fallaTicket").val() == '') {
            $("#fallaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar una Falla</li>";
            isValid = false;
        } else {
            $("#fallaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#categoriaTicket").val() == undefined || $("#categoriaTicket").val() == '') {
            $("#categoriaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar una Categor&iacute;a</li>";
            isValid = false;
        } else {
            $("#categoriaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#subcategoriaTicket").val() == undefined || $("#subcategoriaTicket").val() == '') {
            $("#subcategoriaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar una Subcategor&iacute;a</li>";
            isValid = false;
        } else {
            $("#subcategoriaTicket").removeClass("invalid-inputTicket");
        }

        if ($("#tipoOrdenTicket").val() == undefined || $("#tipoOrdenTicket").val() == '') {
            $("#tipoOrdenTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar un Tipo de Orden</li>";
            isValid = false;
        } else {
            $("#tipoOrdenTicket").removeClass("invalid-inputTicket");
        }

        if ($("#tipoNegocioTicket").val() == undefined || $("#tipoNegocioTicket").val() == '') {
            $("#tipoNegocioTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar un Tipo de Negocio</li>";
            isValid = false;
        } else {
            $("#tipoNegocioTicket").removeClass("invalid-inputTicket");
        }

        if ($("#regionTicket").val() == undefined || $("#regionTicket").val() == '') {
            $("#regionTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar una Regi&oacute;n</li>";
            isValid = false;
        } else {
            $("#regionTicket").removeClass("invalid-inputTicket");
        }

        // if ($("#tecnologiaTicket").val() == undefined || $("#tecnologiaTicket").val() == '') {
        //     $("#tecnologiaTicket").addClass("invalid-inputTicket");
        //     mensajeError += "<li>Debe seleccionar una Tecnolog&iacute;a</li>";
        //     isValid = false;
        // } else {
        //     $("#tecnologiaTicket").removeClass("invalid-inputTicket");
        // }

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
                    $scope.fallaTicketR = $scope.catalogoFallasTicketSoporte.find(function (elem) { return elem.id === Number($scope.ticketSoporteR.fallaTicket) });
                    $scope.categoriaTicketR = $scope.catalogoFallasTicketSoporte.find(function (elem) { return elem.id === Number($scope.ticketSoporteR.categoriaTicket) });
                    $scope.subcategoriaTicketR = $scope.catalogoFallasTicketSoporte.find(function (elem) { return elem.id === Number($scope.ticketSoporteR.subcategoriaTicket) });
                    let paramsTicket = {
                        "idTecnico": Number($scope.ticketSoporteR.idTecnico),
                        "idOrden": $scope.ticketSoporteR.idOrden,
                        "origenSistema": 3,
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
                        "noSerieNew": $scope.ticketSoporteR.noSerieNew,
                        // "idTipoOrden": Number($scope.ticketSoporteR.tipoOrden),
                        // "idTipoNegocio": Number($scope.ticketSoporteR.tipoNegocio),
                        // "idRegion": Number($scope.ticketSoporteR.region),
                        // "idTecnologia": Number($scope.ticketSoporteR.tecnologia),
                        "idApplication": 1,
                        "informacionAdicional": [{}]
                    }
                    // console.log(paramsTicket);
                    gestionTicketSoporteService.creaTicketSoporte(paramsTicket).then(function success(response) {
                        console.log(response);
                        if (response.data !== undefined) {
                            if (response.data.respuesta) {
                                if (response.data.result) {
                                    swal.close();
                                    $scope.consultarTicketsSoporte();
                                    $scope.changeView(2);
                                    $scope.cleanForm();
                                    toastr.success(response.data.resultDescripcion);
                                } else {
                                    swal.close();
                                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                                }
                            } else {
                                swal.close();
                                mostrarMensajeErrorAlert(response.data.resultDescripcion);
                            }
                        } else {
                            swal.close();
                            mostrarMensajeErrorAlert(response.data.resultDescripcion);
                        }
                    });
                }
            }).catch(err => {
            });
        } else {
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

        if (isValid) {
            let params = {
                fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_ticket').value),
                fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_ticket').value),
                tipoFecha: 'creacion'
            }
            // console.log(params);
            if (!swal.isVisible()) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
            }

            gestionTicketSoporteService.consultaTicketsSoporte(params).then(function success(response) {
                console.log(response);
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.tickets.length) {
                            let arrayRow = [];
                            if (ticketSoporteTable) {
                                ticketSoporteTable.destroy();
                            }
                            $scope.ticketsSoporte = response.data.result.tickets;
                            $.each($scope.ticketsSoporte, function (i, elemento) {
                                let row = [];
                                let nombreTecnico = elemento.nombreEmpleadoReporta + " " + elemento.apellidoPaEmpleadoReporta + " " + elemento.apellidoMaEmpleadoReporta;
                                let nombreIngeniero = elemento.nombreEmpleadoIng + " " + elemento.apellidoPaEmpleadoIng + " " + elemento.apellidoMaEmpleadoIng;
                                row[0] = elemento.idOrden !== undefined ? elemento.idOrden : 'Sin informaci&oacute;n';
                                row[1] = elemento.idTicket == null ? 'Sin informaci&oacute;n' : elemento.idTicket !== undefined ? elemento.idTicket : 'Sin informaci&oacute;n';
                                row[2] = elemento.os !== undefined ? elemento.os : 'Sin informaci&oacute;n';
                                row[3] = elemento.fechaCreacion !== undefined ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                row[4] = elemento.descripcionFalla !== undefined ? elemento.descripcionFalla : 'Sin informaci&oacute;n';
                                row[5] = elemento.telefono !== undefined ? elemento.telefono : 'Sin informaci&oacute;n';
                                row[6] = nombreTecnico;
                                row[7] = nombreIngeniero;
                                row[8] = elemento.fechaAsignacion == null ? 'Sin informaci&oacute;n' : elemento.fechaAsignacion !== undefined ? elemento.fechaAsignacion : 'Sin informaci&oacute;n';
                                row[9] = elemento.descripcionEstatus !== undefined ? elemento.descripcionEstatus : 'Sin informaci&oacute;n';
                                row[10] = elemento.tiempoAtencion == null ? 'Sin informaci&oacute;n' : elemento.tiempoAtencion !== undefined ? elemento.tiempoAtencion : 'Sin informaci&oacute;n';
                                row[11] = '<span style="background-color: #7716fa" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" id="detalleIncidencia' + elemento.idTicket + '" onclick="consultaDetalleTicketSoporte(' + "'" + elemento.idTicket + "'" + ')" >' +
                                    '<i class="fa fa-bars" title="Detalle"></i>' +
                                    '</span> &nbsp;' +
                                    '<span style="background-color: #58b3bf" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" id="asignarIngeniero' + elemento.idTicket + '" onclick="abrirModalAsignar(' + "'" + elemento.idTicket + "'" + ')" >' +
                                    '<i class="fa fa-user-circle" title="Asignar"></i>' +
                                    '</span>';

                                arrayRow.push(row);
                                if (elemento.descripcionEstatus === 'Abierto')
                                    $scope.contadores.abierto += 1;

                                if (elemento.descripcionEstatus === 'Cerrado')
                                    $scope.contadores.cerrado += 1;

                                if (elemento.descripcionEstatus === 'Escalado')
                                    $scope.contadores.escalado += 1;

                                if (elemento.descripcionEstatus === 'Pendiente')
                                    $scope.contadores.pendiente += 1;

                                if (elemento.descripcionEstatus === 'Cancelado')
                                    $scope.contadores.cancelado += 1;
                            });
                            ticketSoporteTable = $('#tableTicketSoporte').DataTable({
                                "paging": true,
                                "lengthChange": false,
                                "ordering": false,
                                "pageLength": 10,
                                "info": true,
                                "scrollX": false,
                                "data": arrayRow,
                                "autoWidth": false,
                                "language": idioma_espanol_not_font,
                            });
                            swal.close();
                        } else {
                            ticketSoporteTable.clear();
                            ticketSoporteTable.draw();
                            mostrarMensajeInformativo("No se encontraron Tickets");
                            swal.close();
                        }
                    } else {
                        ticketSoporteTable.clear();
                        ticketSoporteTable.draw();
                        mostrarMensajeInformativo("No se encontraron Tickets");
                        swal.close();
                    }
                } else {
                    ticketSoporteTable.clear();
                    ticketSoporteTable.draw();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.consultarTicketsSoporte();

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

    $scope.accionesDinamicasDetalle = []
    $scope.escalamientoListDetalle = []
    $scope.estadoEscalamientoDetalle = []
    $scope.ticketDetalle = 0
    consultaDetalleTicketSoporte = function (ticket) {
        $scope.ticketDetalle = ticket
        $scope.ticketSoporteDetalle = {}
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        // $scope.changeView(3);
        // $("#container_noticias_ticket").show();
        // $scope.consultarComentariosTicketSoporte();
        $('#modalDetalle').modal('show')
        $q.all([
            gestionTicketSoporteService.consultarAccionesDinamicaDetalle(),
            gestionTicketSoporteService.consultaPropietariosTicketSoporte()
        ]).then(result => {
            console.log(result)
            swal.close();
            if (result[0].data.respuesta) {
                if (result[0].data.result) {
                    $scope.accionesDinamicasDetalle = result[0].data.result.acciones
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la consulta de catalogos.')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de catalogos.')
            }
            if (result[1].data.respuesta) {
                if (result[1].data.result) {
                    $scope.escalamientoListDetalle = result[1].data.result.propietarios
                    $scope.estadoEscalamientoDetalle = result[1].data.result.propietarios.filter(elemento => { return elemento.nivel === 1 })
                } else {
                    mostrarMensajeWarningValidacion('No se pudo realizar la consulta de motivos.')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la consulta de motivos.')
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

    $scope.changeView = function (option) {
        $scope.isBusqueda = option
        if (option === 3) {
            $scope.consultarComentariosTicketSoporte()
        }
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
                $scope.changeView(2);
                $scope.consultarTicketsSoporte();
            }
        }).catch(swal.noop);
    }

    $scope.ticketSelect = '';
    abrirModalAsignar = function (ticket) {
        $scope.ticketSelect = ticket
        let params = {
            idsGeografia: [129, 133, 130, 132, 131, 100, 103, 102, 101, 128, 125, 127, 126, 118, 119, 121, 122, 123, 120, 117, 134, 135, 136, 109, 113, 112, 105, 110, 111, 116, 106, 114, 107, 115, 108],
            idTipoUsuario: [7]
        }
        if (ingenieroTable) {
            ingenieroTable.destroy();
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.consultarUsuariosPorPuesto(params).then((response) => {
            console.log(response)
            swal.close()
            $('#modalAsigarTicket').modal('show')
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.listIngenieros = response.data.result.usuarios;
                    $scope.listIngenieros.map(function (e) { e.isChecked = false; return e; })
                    $scope.initTableingeniero();
                } else {
                    mostrarMensajeWarningValidacion('No hay ingenieros')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la operaci&oacute;n')
            }
        }).catch((err) => handleError(err));

    }

    $scope.initTableingeniero = function () {
        let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        let arraRow = []
        $.each($scope.listIngenieros, function (i, ingeniero) {
            let array = []
            let url = imgDefault
            if (ingeniero.urlFoto) {
                url = ingeniero.urlFoto
            }
            array[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'" + ingeniero.noEmpleado + "', 'usuario'" + ')"/>';
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

    $scope.siguenteAsignar = function () {
        $scope.ingenieroSelect = $scope.listIngenieros.find(function (elem) { return elem.isChecked == true });
        if ($scope.ingenieroSelect) {
            $('#modalAsigarTicket').modal('hide')
            swal({
                title: 'Comentarios',
                input: 'textarea',
                closeOnClickOutside: false,
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Asignar'
            }).then((result) => {
                $scope.asignarTicketIngeniero(result)
            }).catch((result) => {
                $('#modalAsigarTicket').modal('show')
            })
        } else {
            mostrarMensajeWarningValidacion('Seleccione un ingeniero')
        }

    }

    $scope.asignarTicketIngeniero = function (comentario) {
        let params = {
            idTicket: Number($scope.ticketSelect),
            idIngenieroSoporte: Number($scope.ingenieroSelect.idUsuario),
            comentarios: comentario
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.asigarTicketIngeniero(params).then((response) => {
            console.log(response)
            swal.close()
            if (response.data.respuesta) {
                if (response.data.result) {
                    mostrarMensajeExitoAlert(response.data.result.mensaje)
                    $scope.consultarTicketsSoporte();
                } else {
                    mostrarMensajeWarningValidacion('No hay ingenieros')
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la operaci&oacute;n')
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
        $scope.motivoEscalamientoDetalle = $scope.escalamientoListDetalle.filter(elemento => { return elemento.nivel === 2 && elemento.idPadre === $scope.ticketSoporteDetalle.estado.id })
    }

    $scope.guardarTicketDetalle = function () {
        let params;
        if ($scope.ticketSoporteDetalle.estatus) {
            if ($scope.ticketSoporteDetalle.estatus === 'escalacion') {
                params = {
                    idTicket: Number($scope.ticketDetalle),
                    comentarios: $scope.ticketSoporteDetalle.comentarios,
                    idPropietario: $scope.ticketSoporteDetalle.estado.id,
                    idPropietarioSf: $scope.ticketSoporteDetalle.estado.idSalesforce,
                    idMotivoPropietario: $scope.ticketSoporteDetalle.motivo.id,
                    idMotivoSf: $scope.ticketSoporteDetalle.motivo.idSalesforce,
                    tipo: $scope.ticketSoporteDetalle.estatus
                }
            } else {
                params = {
                    idTicket: Number($scope.ticketDetalle),
                    comentarios: $scope.ticketSoporteDetalle.comentarios,
                    tipo: $scope.ticketSoporteDetalle.estatus
                }
            }
        }

        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.guardarTicketDetalle(params).then(response => {
            console.log(response)
            swal.close()
            if (response.data.respuesta) {
                if (response.data.result) {
                    $('#modalDetalle').modal('hide')
                    mostrarMensajeExitoAlert(response.data.result.mensaje)
                } else {
                    mostrarMensajeWarningValidacion(response.data.result.mensaje)
                }
            } else {
                mostrarMensajeWarningValidacion('No se pudo realizar la operaci&oacute;n')
            }
        }).catch((err) => handleError(err));
    }
}]);

angular.element(document).ready(function () {
    $("#moduloGestionTickets").addClass('active');
    $("#idBody").removeAttr("style");
});
