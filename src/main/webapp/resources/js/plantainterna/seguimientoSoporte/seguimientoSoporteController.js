var app = angular.module('seguimientoSoporteApp', []);

app.controller('seguimientoSoporteController', ['$scope', 'seguimientoSoporteService', '$filter', function ($scope, seguimientoSoporteService, $filter) {
    const FECHA_HOY_DATE = new Date();
    let seguimientoTable;
    let ticketTable;

    $scope.isBusquedaGeneral = true;
    $scope.detalleCaptura = {};
    $scope.infoUsuario = {};
    $scope.catalogoEstatusUsuarios = [];
    $scope.catalogoTicket = [];


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
        "info": false,
        "autoWidth": true,
        "language": idioma_espanol_not_font,
        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
    });

    ticketTable = $('#ticketTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": false,
        "autoWidth": true,
        "language": idioma_espanol_not_font,
        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
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
                "info": false,
                "data": arraRow,
                "autoWidth": true,
                "language": idioma_espanol_not_font,
                "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
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
            "info": false,
            "data": arraRow,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });
        swal.close();
    }

    $scope.backGeneral = function () {
        $scope.isBusquedaGeneral = true;
    }

    consultaDetalle = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.detalleCaptura = ticketDetalle.result.orden;
        $scope.findChildFalla(ticketDetalle.result.orden.nivel1, ticketDetalle.result.orden.nivel2, ticketDetalle.result.orden.nivel3);
        $scope.$apply();
        $("#modalDetalle").modal('show');
        swal.close();
    }

    $scope.consultaSeguimiento();

    $scope.findChildFalla = function (falla, categoria, subCategoria) {

        let listCreacionTicket = catalogoTickets.result.catalogoCreacionTickets;

        $scope.detalleCaptura.falla = listCreacionTicket.find((e) => e.id == parseInt(falla)).descripcion;
        $scope.detalleCaptura.categoria = listCreacionTicket.find((e) => e.id == parseInt(categoria)).descripcion;
        $scope.detalleCaptura.subCategoria = listCreacionTicket.find((e) => e.id == parseInt(subCategoria)).descripcion;
    }

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
        $("#idBody").removeAttr("style");
        $("#moduloSeguimiento").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

    });
}])