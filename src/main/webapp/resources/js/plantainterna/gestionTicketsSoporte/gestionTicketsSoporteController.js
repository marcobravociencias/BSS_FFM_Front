var app = angular.module('ticketsSoporteApp', []);

app.controller('ticketsSoporteController', ['$scope', '$q', 'gestionTicketSoporteService', function ($scope, $q, gestionTicketSoporteService) {
    let ticketSoporteTable;
    $scope.listFallasTicket = [];
    $scope.listCategoriasTicket = [];
    $scope.listSubcategoriasTicket = [];
    $scope.catalogosTicketsSoporte = [];
    $scope.listMotivoEscala = {};
    $scope.catalogoTickets = [];

    $scope.ticketsSoporte = [];
    $scope.detalleCaptura = {};
    $scope.catalogoEstatusUsuarios = infoUsuarioEstatusHoras.result;
    $scope.contadores = {};
    $scope.isBusqueda = true;

    ticketSoporteTable = $('#tableTicketSoporte').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": false,
        "autoWidth": true,
        "language": idioma_espanol_not_font,
        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
    });

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
        // $q.all([
        //     gestionTicketSoporteService.consultarCatalogoFallasTicketSoporte()
        // ]).then(function (results) {
        //     if (results[0].data !== undefined) {
        //         if (results[0].data.respuesta) {
        //             if (results[0].data.result) {
        $scope.catalogoTickets = arrayListadoTickets.data.result.catalogoTickets;
        let nivel1 = [];
        $scope.catalogoTickets.map(function (e) {
            if (e.nivel == "1") {
                nivel1.push(e);
            }
        });
        $scope.listMotivoEscala.catalogoNivel1 = nivel1;
        $scope.catalogosTicketsSoporte = arrayCatalogosTicket.data.result;
        swal.close();
        $scope.catalogosTicketsSoporte.catalogoCreacionTickets.map(function (e) {
            if (e.nivel == "1") {
                $scope.listFallasTicket.push(e);
            }
        });
        //             } else {
        //                 toastr.warning('No se encontraron datos de Fallas');
        //             }
        //         } else {
        //             toastr.warning(results[0].data.resultDescripcion);
        //         }
        //     } else {
        //         toastr.error('Ha ocurrido un error en la consulta de Fallas');
        //     }
        // });
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
        $scope.consultarCatalogosTicketSoporte();
    }

    $scope.initTicketsSoporte();

    $scope.loadCategoriaTicketSoporte = function () {
        $scope.listCategoriasTicket = [];
        let idFallaTicket = $("#falla").val();
        $scope.catalogosTicketsSoporte.catalogoCreacionTickets.map(function (c) {
            if (c.idpadre == idFallaTicket) {
                $scope.listCategoriasTicket.push(c);
            }
        });
    }

    $scope.loadSubcategoriaTicketSoporte = function () {
        $scope.listSubcategoriasTicket = [];
        let idCategoriaTicket = $("#categoria").val()
        $scope.catalogosTicketsSoporte.catalogoCreacionTickets.map(function (s) {
            if (s.idpadre == idCategoriaTicket) {
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

    $scope.registrarTicketSoporte = function () {
        let mensajeError = '';
        let isValid = true;

        if ($("#cuentaTicket").val() == undefined || $("#cuentaTicket").val() == '') {
            mensajeError += "<li>Debe ingresar un n&uacute;mero de Cuenta</li>";
            isValid = false;
        }
        if ($("#noSerieTicket").val() == undefined || $("#noSerieTicket").val() == '') {
            mensajeError += "<li>Debe ingresar un n&uacute;mero de Serie del Ticket</li>";
            isValid = false;
        }
        if ($("#descripcionProblemaTicket").val() == undefined || $("#descripcionProblemaTicket").val() == '') {
            mensajeError += "<li>Debe ingresar una descripci&oacute;n del Problema</li>";
            isValid = false;
        }

        if (isValid) {
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.consultarTicketsSoporte = function () {
        let mensajeError = '';
        let isValid = true;
        if (!$scope.validarFecha('filtro_fecha_inicio', 'filtro_fecha_fin')) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
            isValid = false;
        }

        if (isValid) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            if (ticketSoporteTable) {
                ticketSoporteTable.destroy();
            }
            let arrayRow = [];
            $scope.ticketsSoporte = arrayListadoTickets.data.result.tablaTickets;
            $scope.contadores.abierto = 0;
            $scope.contadores.cerrado = 0;
            $scope.contadores.escalado = 0;
            $scope.contadores.pendiente = 0;
            $.each($scope.ticketsSoporte, function (i, elemento) {
                let row = [];
                row[0] = elemento.ot !== undefined ? elemento.ot : 'Sin informaci&oacute;n';
                row[1] = elemento.ticket !== undefined ? elemento.ticket : 'Sin informaci&oacute;n';
                row[2] = elemento.os !== undefined ? elemento.os : 'Sin informaci&oacute;n';
                row[3] = elemento.fecha_creacion !== undefined ? elemento.fecha_creacion : 'Sin informaci&oacute;n';
                row[4] = elemento.falla !== undefined ? elemento.falla : 'Sin informaci&oacute;n';
                row[5] = elemento.telefono !== undefined ? elemento.telefono : 'Sin informaci&oacute;n';
                row[6] = elemento.tecnico !== undefined ? elemento.tecnico : 'Sin informaci&oacute;n';
                row[7] = elemento.ingeniero !== undefined ? elemento.ingeniero : 'Sin informaci&oacute;n';
                row[8] = elemento.horaAsignacion !== undefined ? elemento.horaAsignacion : 'Sin informaci&oacute;n';
                row[9] = elemento.estatus !== undefined ? elemento.estatus : 'Sin informaci&oacute;n';
                row[10] = elemento.tiempoAbierto !== undefined ? elemento.tiempoAbierto : 'Sin informaci&oacute;n';
                row[11] = '<a class="" id="detalleIncidencia' + elemento.ticket + '" onclick="consultaDetalle(' + "'" + elemento.id_conexion + "'" + ')" >' +
                    '<i class="fa fa-bars" style="background-color: #58b3bf" title="Detalle"></i>' +
                    '</a> &nbsp;' +
                    '<a class="" id="detalleIncidencia' + elemento.ticket + '" onclick="asignaTicket(' + "'" + elemento.ticket + "'" + ')">' +
                    '<i class="fas fa-user-check" style="background-color: #7f4c9d" title="Asignar"></i>' +
                    '</a>'
                arrayRow.push(row);
                if(elemento.estatus === 'Abierto')
                     $scope.contadores.abierto += 1;

                if(elemento.estatus === 'Cerrado')
                     $scope.contadores.cerrado += 1;

                if(elemento.estatus === 'Escalado')
                     $scope.contadores.escalado += 1;

                if(elemento.estatus === 'Pendiente')
                     $scope.contadores.pendiente += 1;
                   
            })
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

    $scope.changeView = function () {
        if ($scope.isBusqueda) {
            $scope.isBusqueda = false;
        } else {
            $scope.isBusqueda = true;
        }

    }

    $scope.filter = function (type) {
        let id = '#filter' + type;
        let idSpan = '#span' + type;
        $(".user-filter span").removeClass('selected-filter');
        $(".fa-filter").css('color', '#ccc');

        $(id).css('color', 'white');
        $(idSpan).addClass('selected-filter');
    }



}]);