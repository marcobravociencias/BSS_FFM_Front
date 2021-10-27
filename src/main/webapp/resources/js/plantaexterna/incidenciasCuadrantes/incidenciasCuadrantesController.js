var app = angular.module('incidenciasCuadrantesApp', []);

app.controller('incidenciasCuadrantesController', ['$scope', '$q', 'incidenciasCuadrantesService', function ($scope, $q, incidenciasCuadrantesService) {

    $scope.tipoFecha = 'semanal';
    let updating = false;
    $scope.fechaTipo = '';
    $scope.filtrosIncidencias = {};
    $scope.listaIncidenciasCuadrantes = [];
    let incidenciasCuadrantesTable;
    $scope.fechaEnvio = $scope.fechaSemana;

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    $scope.initMapa = function () {
        mapaIncidencias = new google.maps.Map(document.getElementById('mapaIncidenciasCuadrantes'), {
            center: {
                lat: parseFloat(19.4326),
                lng: parseFloat(-99.1332)
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_TOP
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }, streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            mapTypeControl: true,
            zoom: 15,
            disableDoubleClickZoom: true
        });
    }

    $scope.seleccionTodos = function (paramFiltroParent, banderaChecked) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = banderaChecked
            return e;
        })
    }

    $scope.consultarFiltrosIncidenciasCuadrantes = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        
        $scope.filtrosIncidencias.estatus = arrayStatus.data.result;
        $scope.filtrosIncidencias.arbolGeografia = arrayFiltersPE.data.result.geografia;

        $scope.seleccionTodos($scope.filtrosIncidencias.estatus, true);

        let geografia = angular.copy($scope.filtrosIncidencias.arbolGeografia);
        geografia.map((e) => {
            e.parent = e.padre == undefined ? "#" : e.padre;
            e.text = e.nombre;
            e.icon = "fa fa-globe";
            e.state = {
                opened: false,
                selected: true,
            }
            return e
        })
        $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {

        }).jstree({
            'plugins': ["wholerow", "checkbox"],
            'core': {
                'data': geografia,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons": false
                }
            }
        });
        $('#texto_cluster_seleccionado').text('Sin selecci\u00F3n');
        swal.close();
    }

    $scope.initFecha = function () {
        console.log(moment(new Date()).day(1).toDate());
        //SEMANA
        var fecha_actual_reporte = moment(new Date()).day(1).format('DD/MM/YYYY');
        $('#fecha_semanal').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: false,
            language: 'es',
            calendarWeeks: true,
            todayHighlight: true
        }).on('changeDate', function (e) {
            if (updating)
                return;
            updating = true;
            var date_selected = e.date;

            $(this).datepicker('clearDate');
            $(this).datepicker('setDates', [
                moment(date_selected).day(1).toDate(),
                moment(date_selected).day(2).toDate(),
                moment(date_selected).day(3).toDate(),
                moment(date_selected).day(4).toDate(),
                moment(date_selected).day(5).toDate(),
                moment(date_selected).day(6).toDate(),
                moment(date_selected).day(7).toDate()
            ]);
            updating = false;
            fecha_actual_reporte = moment(date_selected).day(1).format('DD/MM/YYYY')

            $("#fecha_semanal").val(fecha_actual_reporte)

        }).on('hide', function (e) {
            $("#fecha_semanal").val(fecha_actual_reporte);
        });
        $('#fecha_semanal').datepicker('update', moment(new Date()).day(1).format('DD/MM/YYYY'));
        $scope.fechaSemana = $('#fecha_semanal').val();
        console.log($('#fecha_semanal').val())

        //MENSUAL
        $('#fecha_mes').datepicker({
            format: "dd/mm/yyyy",
            startView: "months",
            minViewMode: "months"
        });
        $('#fecha_mes').datepicker('update', "01/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear());
        $scope.fechaMes = $('#fecha_mes').val();
        banderaFecha = true;
    }

    $scope.initIncidenciasCuadrantes = function () {
        $scope.initMapa();
        $scope.consultarFiltrosIncidenciasCuadrantes();
        $scope.initFecha();

        document.getElementById('cluster').addEventListener('click', function () {
            $('#modalCluster').modal('show');
        });

        incidenciasCuadrantesTable = $('#tableIncidenciasCuadrantes').DataTable({
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

    $scope.initIncidenciasCuadrantes();

    $scope.cambiarTipoFecha = function () {
        if ($scope.tipoFecha === 'semanal') {
            $scope.fechaEnvio = $scope.fechaSemana;
        } else {
            $scope.fechaEnvio = $scope.fechaMes;
        }
    }

    $scope.cambiarFecha = function (fecha) {
        $scope.fechaEnvio = fecha;
    }

    $scope.consultarIncidenciasCuadrantes = function () {
        let mensajeError = '';

        let isSelectedOne = false;
        $.each($scope.filtrosIncidencias.estatus, function (i, elemento) {
            if (elemento.checkedOpcion) {
                isSelectedOne = true;
                return;
            }
        })
        if (!isSelectedOne) {
            mensajeError += "<li>Selecciona al menos un estaus</li>";
        }
        if (mensajeError == '') {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            if (incidenciasCuadrantesTable) {
                incidenciasCuadrantesTable.destroy();
            }
            let arrayRow = [];
            $scope.listaIncidenciasCuadrantes = arrayIncidenciasCuadrantes.data.result.incidents;
            $.each($scope.listaIncidenciasCuadrantes, function (i, elemento) {
                let row = [];
                row[0] = elemento.idOT;
                row[1] = elemento.nombreOperarioOT;
                row[2] = elemento.numeroOperarioOT;
                row[3] = elemento.idPI;
                row[4] = elemento.numeroOperarioPI;
                row[5] = elemento.nombreOperarioPI;
                row[6] = elemento.statusIncidencia;
                row[7] = '<div class="tooltip-btn"> <span class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><th><i class="icono_cons_bg fa fa-bars aria-hidden="true"></i></th></span></div>';
                arrayRow.push(row);
            })
            incidenciasCuadrantesTable = $('#tableIncidenciasCuadrantes').DataTable({
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

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
    });
}]);