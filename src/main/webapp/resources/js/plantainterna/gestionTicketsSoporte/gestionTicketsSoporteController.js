var app = angular.module('ticketsSoporteApp', []);

app.controller('ticketsSoporteController', ['$scope', '$q', 'gestionTicketSoporteService', function ($scope, $q, gestionTicketSoporteService) {
    let ticketSoporteTable;
    $scope.listFallasTicket = [];
    $scope.listCategoriasTicket = [];
    $scope.listSubcategoriasTicket = [];
    $scope.catalogoFallasTicketSoporte = [];
    $scope.listMotivoEscala = {};
    $scope.catalogoTickets = [];

    $scope.ticketsSoporte = [];
    $scope.detalleCaptura = {};
    $scope.catalogoEstatusUsuarios = infoUsuarioEstatusHoras.result;
    $scope.contadores = {};
    $scope.isBusqueda = 2;
    $scope.ticketSoporte = {};
    $scope.ticketSoporteR = {};

    app.noticiasGestionTicketSoporte($scope, gestionTicketSoporteService);

    $('#searchTextTicket').on('keyup', function () {
        $(".user-filter span").removeClass('selected-filter');
        $(".fa-filter").css('color', '#ccc');
        ticketSoporteTable.search(this.value).draw();
    })

    $scope.searchBy = function (type) {
        $scope.filter(type);
        ticketSoporteTable.search(type).draw();
    }

    $scope.consultarCatalogosTicketSoporte = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.consultaFallasTicketSoporte().then(function success(response) {
            console.log(response);
            if (response.data.respuesta) {
                $scope.catalogoTickets = arrayListadoTickets.data.result.catalogoTickets;
                $scope.catalogoFallasTicketSoporte = response.data.result.soportes;
                console.log($scope.catalogoFallasTicketSoporte);
                console.log($scope.catalogoTickets);
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
        });
    }

    $scope.initTicketsSoporte = function () {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true
        });
        $('.datepicker').datepicker('update', new Date());
        ticketSoporteTable = $('#tableTicketSoporte').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": false,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

        });
        $scope.consultarCatalogosTicketSoporte();
    }

    $scope.initTicketsSoporte();

    $scope.loadCategoriaTicketSoporte = function () {
        $scope.listCategoriasTicket = [];
        let idFallaTicket = $("#falla").val();
        $scope.catalogoFallasTicketSoporte.map(function (c) {
            if (c.idPadre == idFallaTicket) {
                $scope.listCategoriasTicket.push(c);
            }
        });
    }

    $scope.loadSubcategoriaTicketSoporte = function () {
        $scope.listSubcategoriasTicket = [];
        let idCategoriaTicket = $("#categoria").val()
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

    $scope.consultarTecnicosTickets = function () {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        var paramsRequest = new FormData();
        paramsRequest.append("paramsInfo.busquedaCampo", $scope.tecnicoBusqueda);
        $scope.listadoTecnicosTicket = []
        gestionTicketSoporteService.consultarTecnicosTickets(paramsRequest).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.success) {
                    if (response.data.result !== undefined && response.data.result.length > 0) {
                        $scope.listadoTecnicosTicket = response.data.result;
                        swal.close()
                    } else {
                        mostrarMensajeWarning("No se encontraron tecnicos con el num. de empleado")
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlertAjax("Error al consultar tecnicos")
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlertAjax("Error en el servidor")
                swal.close()
            }
        });
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

    $(".inputTicket").keyup(function () {
        var input = $(this).attr("id");
        if ($(this).val() === "" || $(this).val() === undefined) {
            $("#" + input).addClass("invalid-inputTicket");
        } else {
            $("#" + input).removeClass("invalid-inputTicket");
        }
    });

    $("#falla").change(function () {
        $("#falla").removeClass("invalid-inputTicket");
    });

    $("#categoria").change(function () {
        $("#categoria").removeClass("invalid-inputTicket");
    });

    $("#subcategoria").change(function () {
        $("#subcategoria").removeClass("invalid-inputTicket");
    });

    $scope.registrarTicketSoporte = function (objTicket) {
        $scope.ticketSoporteR = objTicket;
        console.log($scope.ticketSoporteR);
        let mensajeError = '';
        let isValid = true;

        if ($("#cuentaTicket").val() == undefined || $("#cuentaTicket").val() == '') {
            mensajeError += "<li>Debe ingresar un n&uacute;mero de Cuenta</li>";
            $("#cuentaTicket").addClass("invalid-inputTicket");
            isValid = false;
        } else {
            $("#cuentaTicket").removeClass("invalid-inputTicket");
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

        if ($("#falla").val() == undefined || $("#falla").val() == '') {
            $("#falla").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar una Falla</li>";
            isValid = false;
        } else {
            $("#falla").removeClass("invalid-inputTicket");
        }

        if ($("#categoria").val() == undefined || $("#categoria").val() == '') {
            $("#categoria").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar una Categor&iacute;a</li>";
            isValid = false;
        } else {
            $("#categoria").removeClass("invalid-inputTicket");
        }

        if ($("#subcategoria").val() == undefined || $("#subcategoria").val() == '') {
            $("#subcategoria").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar una Subcategor&iacute;a</li>";
            isValid = false;
        } else {
            $("#subcategoria").removeClass("invalid-inputTicket");
        }
        if (isValid) {
            let params = {
                "idTecnico": 0,
                "telefonoTecnico": $scope.ticketSoporteR.telefonoTecnico,
                "noCuenta": $scope.ticketSoporteR.cuenta,
                "idFalla": Number($scope.ticketSoporteR.idFalla),
                "idCategoria": Number($scope.ticket.idCategoria),
                "idSubcategoria": Number($scope.ticket.idSubcategoria),
                "comentarios": $scope.ticketSoporteR.descripcionProblema,
                "noSerieOld": $scope.ticketSoporteR.noSerieOld,
                "noSerieNew": $scope.ticketSoporteR.noSerieNew,
                "idApplication": 2
            }
            console.log(params);
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            gestionTicketSoporteService.creaTicketSoporte(params).then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            swal.close();
                            $scope.consultarTicketsSoporte();
                            $scope.changeView();
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
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }

    $scope.consultarTicketsSoporte = function () {
        let mensajeError = '';
        let isValid = true;
        if (!$scope.validarFecha('filtro_fecha_inicio_ticket', 'filtro_fecha_fin_ticket')) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
            isValid = false;
        }

        if (isValid) {
            let params = {
                fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_ticket').value),
                fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_ticket').value),
                elementosPorPagina: 10,
                tipoFecha: 'creacion'
            }
            if (ticketSoporteTable) {
                ticketSoporteTable.destroy();
            }
            // console.log(ticketSoporteTable.page.info())
            ticketSoporteTable = $('#tableTicketSoporte').DataTable({
                "processing": false,
                "ordering": false,
                "serverSide": true,
                "scrollX": false,
                "paging": true,
                "info": false,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "pageLength": 10,
                "ajax": {
                    "url": "req/consultaTicketsSoporte",
                    "type": "GET",
                    "data": params,
                    "beforeSend": function () {
                        if (!swal.isVisible()) {
                            swal({ text: 'Cargando registros...', allowOutsideClick: false });
                            swal.showLoading();
                        }
                    },
                    "dataSrc": function (json) {
                        console.log(json)
                        return json.data;
                    },
                    "error": function (xhr, error, thrown) {
                        handleError(xhr)
                    },
                    "complete": function () {
                        swal.close()
                    }
                },
                "columns": [null, null, null, null, null, null, null, null, null, null, null, null],
                "language": idioma_espanol_not_font
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

    openModalBusquedaTecnicosTicket = function () {
        $("#modalBusquedaTecnicosTicket").modal('show');
    }

    consultaDetalle = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.detalleCaptura = ticketDetalle.result.orden;
        $scope.$apply();
        $("#modalDetalle").modal('show');
        swal.close();
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
        $("#cuentaTicket").val('');
        $("#telefonoTicket").val('');
        $("#noSerieTicket").val('');
        $("#noSerieNuevoEquipo").val('');
        $("#noSerieNuevoEquipo").val('');
        $("#falla").prop('selectedIndex', 0);
        $("#categoria").prop('selectedIndex', 0);
        $("#subcategoria").prop('selectedIndex', 0);
        $("#subcategoria").prop('selectedIndex', 0);
        $("#tipoOrden").prop('selectedIndex', 0);
        $("#tipoOrden").prop('selectedIndex', 0);
        $("#tipoNegocio").prop('selectedIndex', 0);
        $("#region").prop('selectedIndex', 0);
        $("#tecnologia").prop('selectedIndex', 0);
        $("#descripcionProblemaTicket").val('');
    }
}]);