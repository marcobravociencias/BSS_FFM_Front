var app = angular.module('gestionTecnicosApp', []);

app.controller('gestionTecnicosController', ['$scope', '$q', 'gestionTecnicosService', 'genericService', function ($scope, $q, gestionTecnicosService, genericService) {

    let calendar_gestionTecnicos;
    let tableJustificaciones;
    let tableOtsTrabajadas;
    let tableDiasTrabajados;
    let tableArchivosJustificacion;
    let tableDetalleTrabajo;
    $scope.listTecnicos = [];
    $scope.calendarTec;
    $scope.isDetalle = false;
    $scope.isTecnicoSelected = false;
    $scope.isDetalleMesTecnico = false;
    $scope.tecnicoDisp = {};
    $scope.auxDisp = {};
    $scope.listMotivosJustificacion = []
    $scope.comentariosJustificacion = [];
    $scope.listArchivosJustificacion = [];
    $scope.listDetalleTrabajo = [];

    $scope.initCalendario = function () {
        calendar_gestionTecnicos = document.getElementById('calendar_gestionTecnicos');
        $scope.calendarTec = new FullCalendar.Calendar(calendar_gestionTecnicos, {
            height: 500,
            locale: 'es',
            displayEventTime: true,
            selectable: false,
            editable: false,
            eventDurationEditable: false,
            headerToolbar: {
                start: "",
                center: "title",
                end: "prev today next"
            },
            eventClick: function (info, jsEvent, view) {
                console.log(info)
            },
            dateClick: function (info) {
                $scope.fechaDiaJust = info.dateStr;
                let FechaJustMod = $scope.fechaDiaJust.split('-');
                let fechaMod = FechaJustMod[2] + '/' + FechaJustMod[1] + '/' + FechaJustMod[0];
                console.log(FechaJustMod)
                console.log(fechaMod)
            },
            selectable: false,
            datesSet: function () {
                setTimeout(function () {
                    $scope.calendarTec.render()
                }, 1000)
            }
        });
        $scope.calendarTec.render();
    }

    $scope.consultarCatalogosGestionTecnicos = function(){
        $scope.listMotivosJustificacion = arrayCatMotivoJustificacion.data.result.MotivosJustificacion;
    }

    $scope.initGestionTecnicos = function () {
        $scope.initCalendario();
        $scope.listMotivosJustificacion();
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('.datepicker').datepicker('update', new Date());
        tableDiasTrabajados = $('#tableDiasTrabajados').DataTable({
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
        tableOtsTrabajadas = $('#tableOtsTrabajadas').DataTable({
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
        tableJustificaciones = $('#tableJustificaciones').DataTable({
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
        tableArchivosJustificacion = $('#tableArchivosJustificacion').DataTable({
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
        tableDetalleTrabajo = $('#tableDetalleTrabajo').DataTable({
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
    }
    $scope.initGestionTecnicos();

    $scope.consultarTecnicos = function () {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        $scope.listTecnicos = arrayListTecnicos.data.result;
        swal.close();
    }
    $scope.consultarTecnicos();

    $scope.consultarDisponibilidadTecnico = function (tecnico) {
        $scope.tecnicoDisp = {};
        $scope.tecnicoDisp = tecnico;
        $scope.isTecnicoSelected = true;
        $scope.changeView();
        console.log($scope.tecnicoDisp);
    }

    $scope.consultarDisponibilidadAux = function (tecnico) {
        $scope.tecnicoDisp = {};
        $scope.tecnicoDisp = tecnico;
        $scope.isTecnicoSelected = true;
        $scope.changeView();
        console.log($scope.tecnicoDisp);
    }

    $scope.consultarDetalleTecnico = function () {
        $scope.isDetalleMesTecnico = true;
        console.log($scope.tecnicoDisp)

    }

    $scope.changeView = function () {
        if ($scope.isDetalleMesTecnico) {
            $scope.isDetalleMesTecnico = false;
        }
    }

    $scope.consultarComentariosJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.comentariosJustificacion = arrayComentariosJustificacion.data.result.Comentarios;
        console.log($scope.comentariosJustificacion);
        $("#modal-comentarios-justificacion").modal('show');
        swal.close();
    }

    $scope.consultarArchivosJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let arrayRow = [];
        if (tableArchivosJustificacion) {
            tableArchivosJustificacion.destroy();
        }
        $scope.listArchivosJustificacion = arrayArchivosJustificacion.data.result.Archivos;
        console.log($scope.listArchivosJustificacion);
        $.each($scope.listArchivosJustificacion, function (i, elemento) {
            let row = [];
            row[0] = elemento.NombreUsuario;
            row[1] = elemento.Nombre;
            row[2] = elemento.Fecha;
            row[3] = '<a class="icon-table" id="descargarArchivo' + elemento.idArchivo + '" onclick="">' +
                '<i class="fas fa-download" style="background-color: #58b3bf" title="Descargar Archivo"></i>' +
                '</a> &nbsp;' +
                '<a class="icon-table" id="eliminarArchivo' + elemento.idArchivo + '" onclick="">' +
                '<i class="far fa-trash-alt" style="background-color: #58b3bf" title="Eliminar Archivo"></i>' +
                '</a>';
            arrayRow.push(row);
        });
        tableArchivosJustificacion = $('#tableArchivosJustificacion').DataTable({
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
        $("#modal-archivos-justificacion").modal('show');
        swal.close();
    }

    $scope.editarJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $("#modal-editar-justificacion").modal('show');
        swal.close();
    }

    $scope.eliminarJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $("#modal-eliminar-justificacion").modal('show');
        swal.close();
    }

    $scope.consultarDetalleTrabajo = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let arrayRow = [];
        if (tableDetalleTrabajo) {
            tableDetalleTrabajo.destroy();
        }
        $scope.listDetalleTrabajo = arrayDetalleTrabajo.data.result;
        console.log($scope.listDetalleTrabajo)
        $.each($scope.listDetalleTrabajo, function (i, elemento) {
            let row = [];
            row[0] = elemento.ot;
            row[1] = elemento.os;
            row[2] = elemento.cuenta;
            row[3] = elemento.cliente;
            row[4] = elemento.tipo;
            row[5] = elemento.subtipo;
            row[6] = elemento.puntualidad;
            row[7] = elemento.fechaAgenda;
            row[8] = elemento.fechaInicio;
            row[9] = elemento.fechaFin;
            arrayRow.push(row);
        });
        tableDetalleTrabajo = $('#tableDetalleTrabajo').DataTable({
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
        $("#modal-detalle-trabajo").modal('show');
        swal.close();
    }

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
    });

}]);