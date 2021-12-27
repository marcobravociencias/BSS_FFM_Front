var app = angular.module('ticketsSoporteApp', []);

app.controller('ticketsSoporteController', ['$scope', '$q', 'gestionTicketSoporteService', function ($scope, $q, gestionTicketSoporteService) {
    let ticketSoporteTable;
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

    app.noticiasGestionTicketSoporte($scope, gestionTicketSoporteService);

    $('#searchTextTicket').on('keyup', function () {
        $(".user-filter span").removeClass('selected-filter');
        $(".fa-filter").css('color', '#ccc');
        ticketSoporteTable.search(this.value).draw();
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
        gestionTicketSoporteService.consultaFallasTicketSoporte().then(function success(response) {
            console.log(response);
            if (response.data.respuesta) {
                $scope.catalogoTickets = arrayListadoTickets.data.result.catalogoTickets;
                $scope.catalogoFallasTicketSoporte = response.data.result.soportes;
                // console.log($scope.catalogoFallasTicketSoporte);
                // console.log($scope.catalogoTickets);
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

    openModalBusquedaTecnicosTicket = function () {
        $scope.listadoTecnicosTicket = [];
        $("#searchTecnicoTicket").val('');
        $scope.listadoTecnicosTicket = [];
        $scope.tecnicoBusqueda = '';
        $scope.$apply();
        $("#modalBusquedaTecnicosTicket").modal('show');
    }

    $scope.buscarTecnicoTicket = function () {
        let mensajeError = '';
        let isValid = true;
        $scope.listadoTecnicosTicket = [];
        $scope.tecnicoBusqueda = '';

        if ($("#searchTecnicoTicket").val() == undefined || $("#searchTecnicoTicket").val() == '') {
            mensajeError += "<li>Debe ingresar un n&uacute;mero de Empleado</li>";
            isValid = false;
        }
        if (isValid) {
            swal({ text: 'Cargando datos ...', allowOutsideClick: false });
            swal.showLoading();
            $scope.tecnicoBusqueda = $("#searchTecnicoTicket").val();
            let params = {
                tecnico: $scope.tecnicoBusqueda
            }
            console.log(params)
            $scope.listadoTecnicosTicket = arrayBusquedaTecnicos.data.result;
            console.log($scope.listadoTecnicosTicket);
            swal.close();
            // gestionTicketSoporteService.consultarTecnicosTickets(paramsRequest).then(function success(response) {
            //     if (response.data !== undefined) {
            //         if (response.data.success) {
            //             if (response.data.result !== undefined && response.data.result.length > 0) {
            //                 $scope.listadoTecnicosTicket = response.data.result;
            //                 swal.close()
            //             } else {
            //                 mostrarMensajeWarning("No se encontraron tecnicos con el num. de empleado")
            //                 swal.close()
            //             }
            //         } else {
            //             mostrarMensajeErrorAlertAjax("Error al consultar tecnicos")
            //             swal.close()
            //         }
            //     } else {
            //         mostrarMensajeErrorAlertAjax("Error en el servidor")
            //         swal.close()
            //     }
            // });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $('#searchTecnicoTicket').keypress(function (e) {
        if (e.which == 13) {
            $scope.buscarTecnicoTicket();
            $scope.$apply();
            return false;
        }
    });

    $scope.seleccionarTecnicoTicket = function (tecnico) {
        $scope.tecnicoSeleccionado = angular.copy(tecnico);
        $scope.ticketSoporteR.idTecnico = $scope.tecnicoSeleccionado.id;
        $scope.ticketSoporteR.telefonoTecnico = $scope.tecnicoSeleccionado.telefono;
        $scope.ticketSoporteR.tecnico = $scope.tecnicoSeleccionado.nombre;
        console.log($scope.tecnicoSeleccionado);
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

    $scope.registrarTicketSoporte = function () {
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

        if ($("#tecnologiaTicket").val() == undefined || $("#tecnologiaTicket").val() == '') {
            $("#tecnologiaTicket").addClass("invalid-inputTicket");
            mensajeError += "<li>Debe seleccionar una Tecnolog&iacute;a</li>";
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
                console.log(isConfirm)
                if (isConfirm) {
                    console.log(isConfirm)
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    console.log($scope.ticketSoporteR);
                    let paramsTicket = {
                        "idTecnico": Number($scope.ticketSoporteR.idTecnico),
                        "telefonoTecnico": Number($scope.ticketSoporteR.telefonoTecnico),
                        "noCuenta": Number($scope.ticketSoporteR.cuenta),
                        "idFalla": Number($scope.ticketSoporteR.idFalla),
                        "idCategoria": Number($scope.ticketSoporteR.idCategoria),
                        "idSubcategoria": Number($scope.ticketSoporteR.idSubcategoria),
                        "comentarios": $scope.ticketSoporteR.descripcionProblema,
                        "noSerieOld": $scope.ticketSoporteR.noSerieOld,
                        "noSerieNew": $scope.ticketSoporteR.noSerieNew,
                        // "idTipoOrden": Number($scope.ticketSoporteR.tipoOrden),
                        // "idTipoNegocio": Number($scope.ticketSoporteR.tipoNegocio),
                        // "idRegion": Number($scope.ticketSoporteR.region),
                        // "idTecnologia": Number($scope.ticketSoporteR.tecnologia),
                        "idApplication": 2
                    }
                    console.log(paramsTicket);
                    gestionTicketSoporteService.creaTicketSoporte(paramsTicket).then(function success(response) {
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
            console.log(params);
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
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
                            console.log($scope.ticketsSoporte);
                            $.each($scope.ticketsSoporte, function (i, elemento) {
                                let row = [];
                                row[0] = elemento.idOrden !== undefined ? elemento.idOrden : 'Sin informaci&oacute;n';
                                row[1] = elemento.ticket == null ? 'Sin informaci&oacute;n' : elemento.ticket !== undefined ? elemento.ticket : 'Sin informaci&oacute;n';
                                row[2] = elemento.os !== undefined ? elemento.os : 'Sin informaci&oacute;n';
                                row[3] = elemento.fechaCreacion !== undefined ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                row[4] = elemento.descripcionFalla !== undefined ? elemento.descripcionFalla : 'Sin informaci&oacute;n';
                                row[5] = elemento.telefono !== undefined ? elemento.telefono : 'Sin informaci&oacute;n';
                                row[6] = elemento.nombreEmpleadoReporta + " " + elemento.apellidoPaEmpleadoReporta + " " + elemento.apellidoMaEmpleadoReporta;
                                row[7] = elemento.nombreEmpleadoIng + " " + elemento.apellidoPaEmpleadoIng + " " + elemento.apellidoMaEmpleadoIng;
                                row[8] = elemento.fechaAsignacion == null ? 'Sin informaci&oacute;n' : elemento.fechaAsignacion !== undefined ? elemento.fechaAsignacion : 'Sin informaci&oacute;n';
                                row[9] = elemento.descripcionEstatus !== undefined ? elemento.descripcionEstatus : 'Sin informaci&oacute;n';
                                row[10] = elemento.tiempoAtencion == null ? 'Sin informaci&oacute;n' : elemento.tiempoAtencion !== undefined ? elemento.tiempoAtencion : 'Sin informaci&oacute;n';
                                row[11] = '<a class="" id="detalleIncidencia' + elemento.ticket + '" onclick="consultaDetalleTicketSoporte(' + "'" + elemento.idOrden + "'" + ')" >' +
                                    '<i class="fa fa-bars" style="background-color: #58b3bf" title="Detalle"></i>' +
                                    '</a>';
                                    
                                arrayRow.push(row);
                                if (elemento.descripcionEstatus === 'Abierto')
                                    $scope.contadores.abierto += 1;

                                if (elemento.descripcionEstatus === 'Cerrado')
                                    $scope.contadores.cerrado += 1;

                                if (elemento.descripcionEstatus === 'Escalado')
                                    $scope.contadores.escalado += 1;

                                if (elemento.descripcionEstatus === 'Pendiente')
                                    $scope.contadores.pendiente += 1;
                            });
                            ticketSoporteTable = $('#tableTicketSoporte').DataTable({
                                "paging": true,
                                "lengthChange": false,
                                "ordering": false,
                                "pageLength": 10,
                                "info": false,
                                "data": arrayRow,
                                "autoWidth": true,
                                "language": idioma_espanol_not_font,
                                "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
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
                    console.log("entro")
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

    consultaDetalleTicketSoporte = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        // $scope.changeView(3);
        $("#container_noticias_ticket").show();
        $scope.consultarComentariosTicketSoporte();
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
        $scope.tecnicoSeleccionado = {};
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
}]);

angular.element(document).ready(function () {
    $("#moduloGestionTickets").addClass('active');
    $("#idBody").removeAttr("style");
});
