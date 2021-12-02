var app = angular.module('ticketsSoporteApp', []);

app.controller('ticketsSoporteController', ['$scope', '$q', 'gestionTicketSoporteService', function ($scope, $q, gestionTicketSoporteService) {

    $scope.listFallasTicket = [];
    $scope.listCategoriasTicket = [];
    $scope.listSubcategoriasTicket = [];
    $scope.catalogosTicketsSoporte = [];
    let ticketSoporteTable;
    $scope.ticketsSoporte = [];

    $scope.consultarCatalogosTicketSoporte = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        // $q.all([
        //     gestionTicketSoporteService.consultarCatalogoFallasTicketSoporte()
        // ]).then(function (results) {
        //     if (results[0].data !== undefined) {
        //         if (results[0].data.respuesta) {
        //             if (results[0].data.result) {
        $scope.catalogosTicketsSoporte = arrayCatalogosTicket.data.result;
        swal.close();
        console.log($scope.catalogosTicketsSoporte.catalogoCreacionTickets);
        $scope.catalogosTicketsSoporte.catalogoCreacionTickets.map(function (e) {
            if (e.nivel == "1") {
                console.log(e);
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
        let idFallaTicket = $("#fallaTicketR").val();
        $scope.catalogosTicketsSoporte.catalogoCreacionTickets.map(function (c) {
            if (c.idpadre == idFallaTicket) {
                $scope.listCategoriasTicket.push(c);
            }
        });
    }

    $scope.loadSubcategoriaTicketSoporte = function () {
        $scope.listSubcategoriasTicket = [];
        let idCategoriaTicket = $("#categoriaTicketR").val()
        $scope.catalogosTicketsSoporte.catalogoCreacionTickets.map(function (s) {
            if (s.idpadre == idCategoriaTicket) {
                $scope.listSubcategoriasTicket.push(s);
            }
        });
        console.log($scope.listSubcategoriasTicket);
    }

    $scope.consultarTecnicosTickets = function () {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        var paramsRequest = new FormData();
        paramsRequest.append("paramsInfo.busquedaCampo", $scope.tecnicoBusqueda);
        $scope.listadoTecnicosTicket = []
        gestionTicketSoporteService.consultarTecnicosTickets(paramsRequest).then(function success(response) {
            console.log(response);
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
        if (!$scope.validarFecha("filtro_fecha_inicio_ticketsoporte", "filtro_fecha_fin_ticketsoporte")) {
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
            console.log($scope.ticketsSoporte);
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
                row[11] = '<a class="" id="detalleIncidencia' + elemento.ticket + '" >' +
                '<i class="fa fa-bars"></i>' +
                '</a> &nbsp;' +
                '<a class="" id="detalleIncidencia' + elemento.ticket + '" >' +
                '<i class="fas fa-check-circle"></i>' +
                '</a>' 
                arrayRow.push(row);
            })
            ticketSoporteTable = $('#tableTicketSoporte').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "pageLength": 10,
                "info": false,
                "data": arrayRow,
                "language": idioma_espanol_not_font,
                "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">'
            });
            swal.close();
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.consultarTicketsSoporte();
}]);