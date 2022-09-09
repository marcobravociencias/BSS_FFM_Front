var app = angular.module('reportesSFApp', []);
var fecha_actual;
var updating = false;
var objectTempAccion;

app.controller('reportesSFController', ['$scope', '$q', 'reportesSFService', 'genericService', function ($scope, $q, reportesSFService, genericService) {
    $scope.listaGeografiaReporte = {};
    $scope.resultReporteInstalaciones = null;
    $scope.resultReporteSoportes = null;
    $scope.resultReporteAddon = null;
    $scope.resultReporteRecolecciones = null;
    $scope.resultReporteEmpresarial = null;
    $scope.resultReporteBackLogProact = null;
    $scope.resultReporteGeneral = null;
    $scope.resultReporteSoportesIng = null;
    $scope.resultReporteVentasResidencial = null;
    $scope.resultReporteVentasEmpresarial = null;
    $scope.resultReporteVentasEmpresarialSA = null;
    $scope.resultReporteIngresoProact = null;
    $scope.resultReporteSoportesComp = null;
    $scope.resultReporteIntalacionRes = null;
    $scope.resultReporteIntalacionEmp = null;
    $scope.resultReporteComplProact = null;
    $scope.resultReporteComplCambDomic = null;
    $scope.resultReporteComplSoporteEmpr = null;
    $scope.resultReporteSitiosFibr = null;
    $scope.resultReporteRedesSoc = null;
    $scope.resultReporteGenerados = null;
    $scope.resultReporteFactibilCerrados = null;
    $scope.resultReporteFactibilCancelados = null;
    $scope.resultReportePlanningAgendas = null;
    $scope.resultReportePlanningAddon = null;
    $scope.resultReportePlanningNuevosAddon = null;
    $scope.resultReportePlanningCompletosOrdenes = null;
    $scope.resultReportePlanningCompletosAddon = null;
    $scope.resultReporteRecolecGeneradas = null;
    $scope.resultReporteRecolecCerradas = null;
    $scope.resultReporteRecolecAgendadas = null;
    $scope.resultReporteBackLogFactibilidades = null;
    $scope.resultReporteBackLogVoluntarias = null;
    $scope.resultReporteVentasInstalacion = null;
    $scope.resultReporteVentasPrincipal = null;
    $scope.boxContentVisible = {
        backlog: false,
        ingresos: false,
        completados: false
    };
    $scope.tipoReporte = '';
    $scope.permisosConfigUser = {};
    $scope.listadogeografiacopy = [];
    $scope.weekDateObjectReport = {};
    $scope.reporte = {
        addon: 'dia',
        soportes: 'dia',
        instalaciones: 'dia',
        recolecciones: 'dia',
        empresarial: 'dia',
        soportesing: 'dia',
        ventasres: 'dia',
        ventasemp: 'dia',
        ventasempsa: 'dia',
        soportescomp: 'dia',
        instalacionres: 'dia',
        instalacionemp: 'dia',
        sitiosfibr: 'dia',
        redessoc: 'dia',
        generados: 'dia',
        planningagenda: 'dia',
        planningaddon: 'dia',
        compleproact: 'dia',
        complecambdomic: 'dia',
        complesoportempr: 'dia',
        backlogproact: 'dia',
        ingresoproact: 'dia',
        factibilcerrados: 'dia',
        factibilcancelados: 'dia',
        recolecgenerados: 'dia',
        recoleccerrados: 'dia',
        recolecagendadas: 'dia',
        backlogfactib: 'dia',
        backlogvolun: 'dia',
        planningnuevosaddon: 'dia',
        planningcompleord: 'dia',
        planningcompaddon: 'dia',
        ventasinstalacion: 'dia',
        ventasprinc: 'dia'
    };
    $scope.filtrosGeneral = {};

    $scope.configPermisoAccionConsultaBackGeneral = false;
    $scope.configPermisoAccionDescargaBackGeneral = false;
    $scope.configPermisoAccionConsultaBackEmpresarial = false;
    $scope.configPermisoAccionDescargaBackEmpresarial = false;
    $scope.configPermisoAccionConsultaBackAddon = false;
    $scope.configPermisoAccionDescargaBackAddon = false;
    $scope.configPermisoAccionConsultaBackRecolecciones = false;
    $scope.configPermisoAccionDescargaBackRecolecciones = false;
    $scope.configPermisoAccionConsultaBackSoportes = false;
    $scope.configPermisoAccionDescargaBackSoportes = false;
    $scope.configPermisoAccionConsultaBackInstalaciones = false;
    $scope.configPermisoAccionDescargaBackInstalaciones = false;
    $scope.configPermisoAccionConsultaBackProactivo = false;
    $scope.configPermisoAccionDescargaBackProactivo = false;
    $scope.configPermisoAccionConsultaIngresoSoportes = false;
    $scope.configPermisoAccionDescargaIngresoSoportes = false;
    $scope.configPermisoAccionDescargaIngresosVentasRes = false;
    $scope.configPermisoAccionConsultaIngresosVentasRes = false;
    $scope.configPermisoAccionDescargaIngresosVentasEmp = false;
    $scope.configPermisoAccionConsultaIngresosVentasEmp = false;
    $scope.configPermisoAccionDescargaIngresosVentasEmpSA = false;
    $scope.configPermisoAccionConsultaIngresosVentasEmpSA = false;
    $scope.configPermisoAccionConsultaIngresosProactivo = false;
    $scope.configPermisoAccionDescargaIngresosProactivo = false;
    $scope.configPermisoAccionConsultaCompletadoSoportes = false;
    $scope.configPermisoAccionDescargaCompletadoSoportes = false;
    $scope.configPermisoAccionConsultaCompletadoRes = false;
    $scope.configPermisoAccionDescargaCompletadoRes = false;
    $scope.configPermisoAccionConsultaCompletadoEmp = false;
    $scope.configPermisoAccionDescargaCompletadoEmp = false;
    $scope.configPermisoAccionConsultaCompletadoProactivo = false;
    $scope.configPermisoAccionDescargaCompletadoProactivo = false;
    $scope.configPermisoAccionConsultaCompletadoCambioDomicilio = false;
    $scope.configPermisoAccionDescargaCompletadoCambioDomicilio = false;
    $scope.configPermisoAccionConsultaCompletadoSoporteEmpresarial = false;
    $scope.configPermisoAccionDescargaCompletadoSoporteEmpresarial = false;
    $scope.configPermisoAccionConsultaSitiosFibrados = false;
    $scope.configPermisoAccionDescargaSitiosFibrados = false;
    $scope.configPermisoAccionConsultaRedesSociales = false;
    $scope.configPermisoAccionDescargaRedesSociales = false;
    $scope.configPermisoAccionConsultaGenerados = false;
    $scope.configPermisoAccionDescargaGenerados = false;
    $scope.configPermisoAccionConsultaFactibilidadCerrados = false;
    $scope.configPermisoAccionDescargaFactibilidadCerrados = false;
    $scope.configPermisoAccionConsultaFactibilidadCancelados = false;
    $scope.configPermisoAccionDescargaFactibilidadCancelados = false;
    $scope.configPermisoAccionConsultaPlanningAgendas = false;
    $scope.configPermisoAccionDescargaPlanningAgendas = false;
    $scope.configPermisoAccionConsultaPlanningAddon = false;
    $scope.configPermisoAccionDescargaPlanningAddon = false;
    $scope.configPermisoAccionConsultaPlanningNuevosAddon = false;
    $scope.configPermisoAccionDescargaPlanningNuevosAddon = false;
    $scope.configPermisoAccionConsultaPlanningCompletosOrdenes = false;
    $scope.configPermisoAccionDescargaPlanningCompletosOrdenes = false;
    $scope.configPermisoAccionConsultaPlanningCompletadosAddon = false;
    $scope.configPermisoAccionDescargaPlanningCompletadosAddon = false;
    $scope.configPermisoAccionConsultaRecoleccionGeneradas = false;
    $scope.configPermisoAccionDescargaRecoleccionGeneradas = false;
    $scope.configPermisoAccionConsultaRecoleccionCerrados = false;
    $scope.configPermisoAccionDescargaRecoleccionCerrados = false;
    $scope.configPermisoAccionConsultaRecoleccionAgendadas = false;
    $scope.configPermisoAccionDescargaRecoleccionAgendadas = false;
    $scope.configPermisoAccionConsultaBackLogFactibilidades = false;
    $scope.configPermisoAccionDescargaBackLogFactibilidades = false;
    $scope.configPermisoAccionConsultaBackLogVoluntarias = false;
    $scope.configPermisoAccionDescargaBackLogVoluntarias= false;
    $scope.configPermisoAccionConsultaVentasInstalacion = false;
    $scope.configPermisoAccionDescargaVentasInstalacion = false;
    $scope.configPermisoAccionConsultaVentasPrincipal = false;
    $scope.configPermisoAccionDescargaVentasPrincipal = false;

    angular.element(document).ready(function () {
        $('#searchGeo-instalaciones').on('keyup', function () {
            $("#jstree-proton-instalaciones").jstree("search", this.value);
        });

        $('#searchGeo-soportes').on('keyup', function () {
            $("#jstree-proton-soportes").jstree("search", this.value);
        });

        $('#searchGeo-recolecciones').on('keyup', function () {
            $("#jstree-proton-recolecciones").jstree("search", this.value);
        });

        $('#searchGeo-addon').on('keyup', function () {
            $("#jstree-proton-addon").jstree("search", this.value);
        });

        $('#searchGeo-empresarial').on('keyup', function () {
            $("#jstree-proton-empresarial").jstree("search", this.value);
        });

        $('#searchGeo-soportesing').on('keyup', function () {
            $("#jstree-proton-soportesing").jstree("search", this.value);
        });

        $('#searchGeo-ventasres').on('keyup', function () {
            $("#jstree-proton-ventasres").jstree("search", this.value);
        });

        $('#searchGeo-ventasemp').on('keyup', function () {
            $("#jstree-proton-ventasemp").jstree("search", this.value);
        });

        $('#searchGeo-ventasempsa').on('keyup', function () {
            $("#jstree-proton-ventasempsa").jstree("search", this.value);
        });

        $('#searchGeo-soportescomp').on('keyup', function () {
            $("#jstree-proton-soportescomp").jstree("search", this.value);
        });

        $('#searchGeo-instalacionres').on('keyup', function () {
            $("#jstree-proton-instalacionres").jstree("search", this.value);
        });

        $('#searchGeo-instalacionemp').on('keyup', function () {
            $("#jstree-proton-instalacionemp").jstree("search", this.value);
        });

        $('#searchGeo-sitiosfibr').on('keyup', function () {
            $("#jstree-proton-sitiosfibr").jstree("search", this.value);
        });

        $('#searchGeo-redessoc').on('keyup', function () {
            $("#jstree-proton-redessoc").jstree("search", this.value);
        });

        $('#searchGeo-generados').on('keyup', function () {
            $("#jstree-proton-generados").jstree("search", this.value);
        });


        $("#modalCluster").on("hidden.bs.modal", function () {
            $scope.getTextGeografia('jstree-proton-' + $scope.tipoReporte, 'cluster-' + $scope.tipoReporte);
        })


        let reporteInstalacionesTable = $('#reporteInstalacionesTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteSoportesTable = $('#reporteSoportesTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteRecoleccionesTable = $('#reporteRecoleccionesTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteAddonTable = $('#reporteAddonTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteEmpresarialTable = $('#reporteEmpresarialTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteGeneralTable = $('#reporteGeneralTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteSoportesIngTable = $('#reporteSoportesIngTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteVentasResTable = $('#reporteVentasResTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteVentasEmpTable = $('#reporteVentasEmpTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteVentasEmpSATable = $('#reporteVentasEmpSATable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteSoportesCompTable = $('#reporteSoportesCompTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteInstResTable = $('#reporteInstResTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteInstEmpTable = $('#reporteInstEmpTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });
        
        let reporteSitiosFibrados = $('#reporteSitiosFibrados').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteRedesSociales = $('#reporteRedesSociales').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteGenerados = $('#reporteGeneradoss').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reportePlanningAgendaTable = $('#reportePlanningAgendaTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reportePlanningAddonTable = $('#reportePlanningAddonTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteCompletadoProactivoTable = $('#reporteCompletadoProactivoTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteCompletadoCambioDomicilioTable = $('#reporteCompletadoCambioDomicilioTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteCompletadoSoporteEmpresarialTable = $('#reporteCompletadoSoporteEmpresarialTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteBackLogProactivoTable = $('#reporteBackLogProactivoTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteIngresoProactivoTable = $('#reporteIngresoProactivoTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteFactibilidadCerradosTable = $('#reporteFactibilidadCerradosTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteFactibilidadCanceladosTable = $('#reporteFactibilidadCanceladosTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteRecoleccionGeneradosTable = $('#reporteRecoleccionGeneradosTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteRecoleccionCerradosTable = $('#reporteRecoleccionCerradosTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteRecoleccionAgendadasTable = $('#reporteRecoleccionAgendadasTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteBackLogFactibilidadTable = $('#reporteBackLogFactibilidadTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteBackLogVoluntariosTable = $('#reporteBackLogVoluntariosTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reportePlanningNuevosAddonTable = $('#reportePlanningNuevosAddonTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reportePlanningCompletosOrdenesTable = $('#reportePlanningCompletosOrdenesTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reportePlanningCompletadosAddonTable = $('#reportePlanningCompletadosAddonTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteVentasInstalacionTable = $('#reporteVentasInstalacionTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        let reporteVentasPrincipalTable = $('#reporteVentasPrincipalTable').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        
        
        $('.drop-down-filters').on("change.bs.dropdown", function (e) {
            $scope.setTextFiltro();
        });
    })

    $scope.getTextGeografia = function (idJsTree, idInput) {
        var geografias = $('#' + idJsTree).jstree("get_selected", true);
        let textoGeografias = [];
        angular.forEach(geografias, (geografia, index) => {
            textoGeografias.push(geografia.text);
        });
        $('#' + idInput).val(textoGeografias);
    }

    $scope.loadDate = function (tipo) {
        $scope.initdateSemanal(tipo);
        //$scope.initDateMensual(tipo);
        $scope.initDateDia(tipo);
    }
    $scope.initdateSemanal = function (tipo) {
        $('#filtro_fecha_semana_' + tipo).datepicker({
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
            var startOfWeek = moment(date_selected).day(1);
            var endOfWeek = moment(date_selected).day(7);
            let date = {
                inicio: startOfWeek,
                fin: endOfWeek
            }
            $scope.weekDateObjectReport[tipo + ""] = date

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
            fecha_actual = moment(date_selected).format('DD/MM/YYYY');
            $('#filtro_fecha_semana_' + tipo).val(fecha_actual);
        }).on('hide', function (e) {
            if (fecha_actual) {
                $('#filtro_fecha_semana_' + tipo).val(fecha_actual);
            } else {
                $('#filtro_fecha_semana_' + tipo).datepicker('update', new Date());
            }
        });
        $('#filtro_fecha_semana_' + tipo).datepicker('update', new Date());

    }

    $scope.initDateMensual = function (tipo) {
        $('#filtro_fecha_mes_' + tipo).datepicker({
            format: "dd/mm/yyyy",
            startView: "months",
            minViewMode: "months"
        });
        $('#filtro_fecha_mes_' + tipo).datepicker('update', new Date());
    }

    $scope.initDateDia = function (tipo) {
        $('#filtro_fecha_dia_' + tipo).datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('#filtro_fecha_dia_' + tipo).datepicker('update', new Date());
    }

    $scope.guardarArbol = function (type) {
        let arbolActual = $("#jstree-proton-" + type).jstree("get_selected", true)
            .map(e => parseInt(e.id));

        $scope.listaGeografiaReporte[type + ""].map((e) => {
            e.state = {
                opened: true,
                selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
            }
            return e
        });
    }

    $scope.cambiaReporte = function (type, save, tab) {
        let geografiaReporte = [];
        //Temporal
        $(".tab-pane").removeClass("active show");
        $("#" + tab).addClass("active show");

        switch (type) {
            case 'instalaciones':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.instalaciones);
                if ($scope.resultReporteInstalaciones == null && geografiaReporte) {
                    //$scope.loadDate('instalaciones');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'soportes':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.soportes);
                if ($scope.resultReporteSoportes == null && geografiaReporte) {
                    //$scope.loadDate('soportes');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'recolecciones':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.recolecciones);
                if ($scope.resultReporteRecolecciones == null && geografiaReporte) {
                    //$scope.loadDate('recolecciones');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'addon':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.addon);
                if ($scope.resultReporteAddon == null && geografiaReporte) {
                    //$scope.loadDate('addon');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'empresarial':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.empresarial);
                if ($scope.resultReporteEmpresarial == null && geografiaReporte) {
                    //$scope.loadDate('empresarial');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'soportesing':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.soportesing);
                if ($scope.resultReporteSoportesIng == null && geografiaReporte) {
                    $scope.loadDate('soportesing');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'ventasres':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.ventasres);
                if ($scope.resultReporteVentasResidencial == null && geografiaReporte) {
                    $scope.loadDate('ventasres');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'ventasemp':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.ventasemp);
                if ($scope.resultReporteVentasEmpresarial == null && geografiaReporte) {
                    $scope.loadDate('ventasemp');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'ventasempsa':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.ventasempsa);
                if ($scope.resultReporteVentasEmpresarialSA == null && geografiaReporte) {
                    $scope.loadDate('ventasempsa');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'soportescomp':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.soportescomp);
                if ($scope.resultReporteSoportesComp == null && geografiaReporte) {
                    $scope.loadDate('soportescomp');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'instalacionres':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.instalacionres);
                if ($scope.resultReporteIntalacionRes == null && geografiaReporte) {
                    $scope.loadDate('instalacionres');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'instalacionemp':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.instalacionemp);
                if ($scope.resultReporteIntalacionEmp == null && geografiaReporte) {
                    $scope.loadDate('instalacionemp');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'sitiosfibr':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.sitiosfibr);
                if ($scope.resultReporteSitiosFibr == null && geografiaReporte) {
                    $scope.loadDate('sitiosfibr');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'redessoc':
                geografiaReporte = angular.copy($scope.listaGeografiaReporte.redessoc);
                if ($scope.resultReporteRedesSoc == null && geografiaReporte) {
                    $scope.loadDate('redessoc');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'generados':
                //geografiaReporte = angular.copy($scope.listaGeografiaReporte.generados);
                if ($scope.resultReporteGenerados == null) {
                    $scope.loadDate('generados');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'factibilcerrados':
                if ($scope.resultReporteFactibilCerrados == null) {
                    $scope.loadDate('factibilcerrados');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'factibilcancelados':
                if ($scope.resultReporteFactibilCancelados == null) {
                    $scope.loadDate('factibilcancelados');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'planningagenda':
                if ($scope.resultReportePlanningAgendas == null) {
                    $scope.loadDate('planningagenda');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'planningaddon':
                if ($scope.resultReportePlanningAddon == null) {
                    $scope.loadDate('planningaddon');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'planningnuevosaddon':
                if ($scope.resultReportePlanningNuevosAddon == null) {
                    $scope.loadDate('planningnuevosaddon');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'planningcompleord':
                if ($scope.resultReportePlanningCompletosOrdenes == null) {
                    $scope.loadDate('planningcompleord');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'planningcompaddon':
                if ($scope.resultReportePlanningCompletosAddon == null) {
                    $scope.loadDate('planningcompaddon');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'compleproact':
                if ($scope.resultReporteComplProact == null) {
                    $scope.loadDate('compleproact');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'complecambdomic':
                if ($scope.resultReporteComplCambDomic == null) {
                    $scope.loadDate('complecambdomic');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'complesoportempr':
                if ($scope.resultReporteComplSoporteEmpr == null) {
                    $scope.loadDate('complesoportempr');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'backlogproact':
                if ($scope.resultReporteBackLogProact == null) {
                    $scope.loadDate('backlogproact');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'ingresoproact':
                if ($scope.resultReporteIngresoProact == null) {
                    $scope.loadDate('ingresoproact');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'recolecgenerados':
                if ($scope.resultReporteRecolecGeneradas == null) {
                    $scope.loadDate('recolecgenerados');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'recoleccerrados':
                if ($scope.resultReporteRecolecCerradas == null) {
                    $scope.loadDate('recoleccerrados');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'recolecagendadas':
                if ($scope.resultReporteRecolecAgendadas == null) {
                    $scope.loadDate('recolecagendadas');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'backlogfactib':
                if ($scope.resultReporteBackLogFactibilidades == null) {
                    $scope.loadDate('backlogfactib');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'backlogvolun':
                if ($scope.resultReporteBackLogVoluntarias == null) {
                    $scope.loadDate('backlogvolun');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'ventasinstalacion':
                if ($scope.resultReporteVentasInstalacion == null) {
                    $scope.loadDate('ventasinstalacion');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
            case 'ventasprinc':
                if ($scope.resultReporteVentasPrincipal == null) {
                    $scope.loadDate('ventasprinc');
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
                }
                break;
        }
        
        if (geografiaReporte.length > 0) {

            if (save) {
                $scope.guardarArbol($scope.tipoReporte);
            }

            let isJsTree = $('#jstree-proton-' + $scope.tipoReporte).jstree('is_loaded')[0] ? true : false;
            if (!isJsTree) {
                $('#jstree-proton-' + $scope.tipoReporte).jstree('destroy');
            }
            $scope.tipoReporte = type;
            $('#jstree-proton-' + type).bind('loaded.jstree', function (e, data) {
                switch (type) {
                    case 'instalaciones':
                        $scope.getTextGeografia('jstree-proton-instalaciones', 'cluster-instalaciones');
                        if ($scope.resultReporteInstalaciones == null) {
                            $scope.consultarReporteInstalaciones();
                        }
                        break;
                    case 'soportes':
                        $scope.getTextGeografia('jstree-proton-soportes', 'cluster-soportes');
                        if ($scope.resultReporteSoportes == null) {
                            $scope.consultarReporteSoportes();
                        }
                        break;
                    case 'recolecciones':
                        $scope.getTextGeografia('jstree-proton-recolecciones', 'cluster-recolecciones');
                        if ($scope.resultReporteRecolecciones == null) {
                            $scope.consultarReporteRecolecciones();
                        }
                        break;
                    case 'addon':
                        $scope.getTextGeografia('jstree-proton-addon', 'cluster-addon');
                        if ($scope.resultReporteAddon == null) {
                            $scope.consultarReporteAddon();
                        }
                        break;
                    case 'empresarial':
                        $scope.getTextGeografia('jstree-proton-empresarial', 'cluster-empresarial');
                        if ($scope.resultReporteEmpresarial == null) {
                            $scope.consultarReporteEmpresarial();
                        }
                        break;
                    case 'soportesing':
                        $scope.getTextGeografia('jstree-proton-soportesing', 'cluster-soportesing');
                        if ($scope.resultReporteSoportesIng == null) {
                            $scope.consultarReporteSoportesIng();
                        }
                        break;
                    case 'ventasres':
                        $scope.getTextGeografia('jstree-proton-ventasres', 'cluster-ventasres');
                        if ($scope.resultReporteVentasResidencial == null) {
                            $scope.consultarReporteVentasResidencial();
                        }
                        break;
                    case 'ventasemp':
                        $scope.getTextGeografia('jstree-proton-ventasemp', 'cluster-ventasemp');
                        if ($scope.resultReporteVentasEmpresarial == null) {
                            $scope.consultarReporteVentasEmpresarial();
                        }
                        break;
                    case 'ventasempsa':
                        $scope.getTextGeografia('jstree-proton-ventasempsa', 'cluster-ventasempsa');
                        if ($scope.resultReporteVentasEmpresarialSA == null) {
                            $scope.consultarReporteVentasEmpresarialSA();
                        }
                        break;
                    case 'soportescomp':
                        $scope.getTextGeografia('jstree-proton-soportescomp', 'cluster-soportescomp');
                        if ($scope.resultReporteSoportesComp == null) {
                            $scope.consultarReporteSoportesCompletado();
                        }
                        break;
                    case 'instalacionres':
                        $scope.getTextGeografia('jstree-proton-instalacionres', 'cluster-instalacionres');
                        if ($scope.resultReporteIntalacionRes == null) {
                            $scope.consultarReporteInstalacionResidencial();
                        }
                        break;
                    case 'instalacionemp':
                        $scope.getTextGeografia('jstree-proton-instalacionemp', 'cluster-instalacionemp');
                        if ($scope.resultReporteIntalacionEmp == null) {
                            $scope.consultarReporteInstalacionEmpresarial();
                        }
                        break;
                    case 'sitiosfibr':
                        $scope.getTextGeografia('jstree-proton-sitiosfibr', 'cluster-sitiosfibr');
                        if ($scope.resultReporteSitiosFibr == null) {
                            $scope.consultarReporteSitiosFibrados();
                        }
                        break;
                    case 'redessoc':
                        $scope.getTextGeografia('jstree-proton-redessoc', 'cluster-redessoc');
                        if ($scope.resultReporteRedesSoc == null) {
                            $scope.consultarReporteRedesSociales();
                        }
                        break;
                }

            }).jstree({
                'plugins': ["wholerow", "checkbox", "search"],
                'core': {
                    'data': geografiaReporte,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons": false
                    }
                },
                "search": {
                    "case_sensitive": false,
                    "show_only_matches": true
                }
            });
        } else {
            switch (type) {
                case 'planningagenda':
                    if ($scope.resultReportePlanningAgendas == null) {
                        $scope.consultarReportePlanningAgenda();
                    }
                    break;
                case 'planningaddon':
                    if ($scope.resultReportePlanningAddon == null) {
                        $scope.consultarReportePlanningAddon();
                    }
                    break;
                case 'compleproact':
                    if ($scope.resultReporteComplProact == null) {
                        $scope.consultarReporteCompletosProactivos();
                    }
                    break;
                case 'complecambdomic':
                    if ($scope.resultReporteComplCambDomic == null) {
                        $scope.consultarReporteCompletosCambioDomicilio();
                    }
                    break;
                case 'complesoportempr':
                    if ($scope.resultReporteComplSoporteEmpr == null) {
                        $scope.consultarReporteCompletosSoporteEmpresarial();
                    }
                    break;
                case 'backlogproact':
                    if ($scope.resultReporteBackLogProact == null) {
                        $scope.consultarReporteBackLogProactivos();
                    }
                    break;
                case 'ingresoproact':
                    if ($scope.resultReporteIngresoProact == null) {
                        $scope.consultarReporteIngresoProactivos();
                    }
                    break;
                case 'generados':
                    if ($scope.resultReporteGenerados == null) {
                        $scope.consultarReporteGenerados();
                    }
                    break;
                case 'factibilcerrados':
                    if ($scope.resultReporteFactibilCerrados == null) {
                        $scope.consultarReporteFactibilidadCerrados();
                    }
                    break;
                case 'factibilcancelados':
                    if ($scope.resultReporteFactibilCancelados == null) {
                        $scope.consultarReporteFactibilidadCancelados();
                    }
                    break;
                case 'recolecgenerados':
                    if ($scope.resultReporteRecolecGeneradas == null) {
                        $scope.consultarReporteRecoleccionGeneradas();
                    }
                    break;
                case 'recoleccerrados':
                    if ($scope.resultReporteRecolecCerradas == null) {
                        $scope.consultarReporteRecoleccionCerradas();
                    }
                    break;
                case 'recolecagendadas':
                    if ($scope.resultReporteRecolecAgendadas == null) {
                        $scope.consultarReporteRecoleccionAgendadas();
                    }
                    break;
                case 'backlogfactib':
                    if ($scope.resultReporteBackLogFactibilidades == null) {
                        $scope.consultarReporteBackLogFactibilidades();
                    }
                    break;
                case 'backlogvolun':
                    if ($scope.resultReporteBackLogVoluntarias == null) {
                        $scope.consultarReporteBackLogVoluntarias();
                    }
                    break;
                case 'planningnuevosaddon':
                    if ($scope.resultReportePlanningNuevosAddon == null) {
                        $scope.consultarReportePlanningNuevoAddon();
                    }
                    break;
                case 'planningcompleord':
                    if ($scope.resultReportePlanningCompletosOrdenes == null) {
                        $scope.consultarReportePlanningCompletosOrdenes();
                    }
                    break;
                case 'planningcompaddon':
                    if ($scope.resultReportePlanningCompletosAddon == null) {
                        $scope.consultarReportePlanningCompletosAddon();
                    }
                    break;
                case 'ventasinstalacion':
                    if ($scope.resultReporteVentasInstalacion == null) {
                        $scope.consultarReporteVentasInstalacion();
                    }
                    break;
                case 'ventasprinc':
                    if ($scope.resultReporteVentasPrincipal == null) {
                        $scope.consultarReporteVentasPrincipal();
                    }
                    break;
            }
        }

    }

    $scope.abrirModalGeografiaRep = function (type) {
        $("#jstree-proton-" + type).jstree("search", '');
        $("#searchGeo-" + type).val('');
        $("#modalCluster").modal('show');
        setTimeout(function () {
            $("#searchGeo-" + type).focus();
        }, 750);
    }

    function compareGeneric(a, b) {
        let niveluno = a.nivel;
        let niveldos = b.nivel;
        if (niveluno > niveldos) {
            return -1
        } else if (niveluno < niveldos) {
            return 1
        }
        return 0
    }

    $scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
        return list.sort(compareGeneric)[0].nivel
    }

    $scope.ordenarGeografia = function (lista, filtro) {

        let listaGeografiaTemp = lista.filter(e => e.nivel <= parseInt(filtro));
        listaGeografiaTemp.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });

        let geografia = angular.copy(listaGeografiaTemp);
        geografia.map((e) => {
            e.parent = e.padre == null ? 0 : e.padre;
            e.text = e.nombre;
            e.icon = "fa fa-globe";
            e.state = {
                opened: false,
                selected: true,
            }
            return e
        })

        return geografia
    }

    $scope.listaSeleccionSelectGral = function (array, nivel) {
        let arrayReturn = "";
        angular.forEach(array, function (elemento, index) {
            if (elemento.nivel == nivel && elemento.checkedOpcion) {
                if (arrayReturn !== "") {
                    arrayReturn += ',';
                }
                arrayReturn += elemento.nombre.toUpperCase();
            } else {
                arrayReturn = arrayReturn.concat($scope.listaSeleccionSelectGral(elemento.children, nivel));
            }
        });
        return arrayReturn;

    }

    $scope.conversionAnidadaRecursiva = function (array, nivelInit, maxNivel) {
        let arrayReturn = [];
        angular.forEach(array.filter(e => e.nivel === nivelInit), function (elem, index) {
            let elemento = angular.copy(elem);
            elemento.checkedOpcion = true;
            if (nivelInit < maxNivel) {
                elemento.children = $scope.conversionAnidadaRecursiva(array, nivelInit + 1, maxNivel).filter(e2 => e2.idPadre === elemento.id);
                elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : [];
            }
            arrayReturn.push(elemento)
        });
        return arrayReturn;
    }

    $scope.consultarCatalagosPI = function () {
        $q.all([
            genericService.consulCatalogoGeografia(),
            genericService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloReporteSF" }),
            genericService.consultarCatalogoIntervenciones()
        ]).then(function (results) {
            let resultConf = results[1].data.result
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {

                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

                            let llavesResult = results[1].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            $scope.nfiltrogeografiaInstalaciones = llavesResult.N_FILTRO_GEOGRAFIA_BACK_INST ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_INST : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaSoportes = llavesResult.N_FILTRO_GEOGRAFIA_BACK_SOPORTE ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_SOPORTE : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaRecolecciones = llavesResult.N_FILTRO_GEOGRAFIA_BACK_REC ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_REC : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaAddon = llavesResult.N_FILTRO_GEOGRAFIA_BACK_ADDON ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_ADDON : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaEmpresarial = llavesResult.N_FILTRO_GEOGRAFIA_BACK_EMP ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_EMP : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaGeneral = llavesResult.N_FILTRO_GEOGRAFIA_BACK_GENERAL ? llavesResult.N_FILTRO_GEOGRAFIA_BACK_GENERAL : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaSoportesIng = llavesResult.N_FILTRO_GEOGRAFIA_INGR_SOPORTE ? llavesResult.N_FILTRO_INGR_SOPORTE : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaVentasRes = llavesResult.N_FILTRO_INGR_VENTAS_RES ? llavesResult.N_FILTRO_INGR_VENTAS_RES : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaVentasEmp = llavesResult.N_FILTRO_INGR_VENTAS_EMP ? llavesResult.N_FILTRO_INGR_VENTAS_EMP : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaVentasEmpSA = llavesResult.N_FILTRO_INGR_VENTAS_EMP_SA ? llavesResult.N_FILTRO_INGR_VENTAS_EMP_SA : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaSoportesComp = llavesResult.N_FILTRO_COMP_SOPORTE ? llavesResult.N_FILTRO_COMP_SOPORTE : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaInstRes = llavesResult.N_FILTRO_COMP_RESIDENCIAL ? llavesResult.N_FILTRO_COMP_RESIDENCIAL : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaInstEmp = llavesResult.N_FILTRO_COMP_EMPRESARIAL ? llavesResult.N_FILTRO_COMP_EMPRESARIAL : llavesResult.N_FILTRO_GEOGRAFIA;
                            $scope.nfiltrogeografiaSitFibr = llavesResult.N_FILTRO_GEOGRAFIA_SIT_FIBRADOS ? llavesResult.N_FILTRO_GEOGRAFIA_SIT_FIBRADOS : llavesResult.N_FILTRO_GEOGRAFIA_SIT_FIBRADOS;
                            $scope.nfiltrogeografiaRedSoc = llavesResult.N_FILTRO_GEOGRAFIA_RED_SOCIALES ? llavesResult.N_FILTRO_GEOGRAFIA_RED_SOCIALES : llavesResult.N_FILTRO_GEOGRAFIA_RED_SOCIALES;
                            $scope.nfiltrogeografiaGenerados = llavesResult.N_FILTRO_GEOGRAFIA_GENERADOS ? llavesResult.N_FILTRO_GEOGRAFIA_GENERADOS : llavesResult.N_FILTRO_GEOGRAFIA_GENERADOS;

                            $scope.nfiltrointervencionesGeneral = llavesResult.N_FILTRO_INTERVENCIONES_GENERAL ? $scope.nfiltrointervencionesGeneral : null;

                            if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
                                $scope.configPermisoAccionConsultaBackInstalaciones = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogInstalaciones" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackInstalaciones = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogInstalaciones" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackSoportes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogSoportes" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackSoportes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogSoportes" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackRecolecciones = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogRecolecciones" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackRecolecciones = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogRecolecciones" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogAddon" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogAddon" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackEmpresarial = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogEmpresarial" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackEmpresarial = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogEmpresarial" })[0] != undefined);
                                $scope.configPermisoAccionConsultaBackGeneral = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBacklogGeneral" })[0] != undefined);
                                $scope.configPermisoAccionDescargaBackGeneral = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBacklogGeneral" })[0] != undefined);
                                $scope.configPermisoAccionConsultaIngresoSoportes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaIngresoSoportes" })[0] != undefined);
                                $scope.configPermisoAccionDescargaIngresoSoportes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaIngresoSoportes" })[0] != undefined);
                                $scope.configPermisoAccionConsultaIngresosVentasRes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaVentasResidencial" })[0] != undefined);
                                $scope.configPermisoAccionDescargaIngresosVentasRes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaVentasResidencial" })[0] != undefined);
                                $scope.configPermisoAccionConsultaIngresosVentasEmp = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaVentasEmpresarial" })[0] != undefined);
                                $scope.configPermisoAccionDescargaIngresosVentasEmp = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaVentasEmpresarial" })[0] != undefined);
                                $scope.configPermisoAccionConsultaIngresosVentasEmpSA = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaVentasEmpresarialSA" })[0] != undefined);
                                $scope.configPermisoAccionDescargaIngresosVentasEmpSA = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaVentasEmpresarialSA" })[0] != undefined);
                                $scope.configPermisoAccionConsultaCompletadoSoportes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCompletadoSoportes" })[0] != undefined);
                                $scope.configPermisoAccionDescargaCompletadoSoportes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaCompletadoSoportes" })[0] != undefined);
                                $scope.configPermisoAccionConsultaCompletadoRes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCompletadoResidencial" })[0] != undefined);
                                $scope.configPermisoAccionDescargaCompletadoRes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaCompletadoResidencial" })[0] != undefined);
                                $scope.configPermisoAccionConsultaCompletadoEmp = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCompletadoEmpresarial" })[0] != undefined);
                                $scope.configPermisoAccionDescargaCompletadoEmp = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaCompletadoEmpresarial" })[0] != undefined);
                                $scope.configPermisoAccionConsultaSitiosFibrados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaSitiosFibrados" })[0] != undefined);
                                $scope.configPermisoAccionDescargaSitiosFibrados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaSitiosFibrados" })[0] != undefined);
                                $scope.configPermisoAccionConsultaRedesSociales = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaRedesSociales" })[0] != undefined);
                                $scope.configPermisoAccionDescargaRedesSociales = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaRedesSociales" })[0] != undefined);
                                $scope.configPermisoAccionConsultaGenerados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaGenerados" })[0] != undefined);
                                $scope.configPermisoAccionDescargaGenerados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaGenerados" })[0] != undefined);
                                $scope.configPermisoAccionConsultaFactibilidadCerrados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaFactibilidadCerrados" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaFactibilidadCerrados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaFactibilidadCerrados" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaFactibilidadCancelados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaFactibilidadCancelados" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaFactibilidadCancelados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaFactibilidadCancelados" })[0] != undefined);//PENDIENTE

                                $scope.configPermisoAccionConsultaPlanningAgendas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaPlanningAgendas" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaPlanningAgendas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaPlanningAgendas" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaPlanningAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaPlanningAddon" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaPlanningAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaPlanningAddon" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaPlanningNuevosAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaPlanningNuevosAddon" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaPlanningNuevosAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaPlanningNuevosAddon" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaPlanningCompletosOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaPlanningCompletosOrdenes" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaPlanningCompletosOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaPlanningCompletosOrdenes" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaPlanningCompletadosAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaPlanningCompletadosAddon" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaPlanningCompletadosAddon = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaPlanningCompletadosAddon" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaCompletadoProactivo = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCompletadoProactivo" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaCompletadoProactivo = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaCompletadoProactivo" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaCompletadoCambioDomicilio = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCompletadoCambioDomicilio" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaCompletadoCambioDomicilio = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaCompletadoCambioDomicilio" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaCompletadoSoporteEmpresarial = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCompletadoSoporteEmpresarial" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaCompletadoSoporteEmpresarial = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaCompletadoSoporteEmpresarial" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaBackProactivo = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBackProactivo" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaBackProactivo = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBackProactivo" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaIngresosProactivo = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaIngresosProactivo" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaIngresosProactivo = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaIngresosProactivo" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaRecoleccionGeneradas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaRecoleccionGeneradas" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaRecoleccionGeneradas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaRecoleccionGeneradas" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaRecoleccionCerrados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaRecoleccionCerrados" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaRecoleccionCerrados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaRecoleccionCerrados" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaRecoleccionAgendadas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaRecoleccionAgendadas" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaRecoleccionAgendadas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaRecoleccionAgendadas" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaBackLogFactibilidades = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBackLogFactibilidades" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaBackLogFactibilidades = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBackLogFactibilidades" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaBackLogVoluntarias = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaBackLogVoluntarias" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaBackLogVoluntarias = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaBackLogVoluntarias" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaVentasInstalacion = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaVentasInstalacion" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaVentasInstalacion = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaVentasInstalacion" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionConsultaVentasPrincipal = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaVentasPrincipal" })[0] != undefined);//PENDIENTE
                                $scope.configPermisoAccionDescargaVentasPrincipal = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaVentasPrincipal" })[0] != undefined);//PENDIENTE

                                objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
                                objectTempAccion.inicializarBotonAccionesRecientes();

                                if ($scope.configPermisoAccionConsultaBackInstalaciones || $scope.configPermisoAccionConsultaBackSoportes
                                    || $scope.configPermisoAccionConsultaBackRecolecciones || $scope.configPermisoAccionConsultaBackAddon
                                    || $scope.configPermisoAccionConsultaBackEmpresarial || $scope.configPermisoAccionConsultaBackGeneral
                                    || $scope.configPermisoAccionConsultaBackProactivo || $scope.configPermisoAccionConsultaBackLogFactibilidades
                                    || $scope.configPermisoAccionConsultaBackLogVoluntarias) {
                                    $scope.boxContentVisible.backlog = true;
                                }

                                if ($scope.configPermisoAccionConsultaIngresoSoportes || $scope.configPermisoAccionConsultaIngresosVentasRes
                                    || $scope.configPermisoAccionConsultaIngresosVentasEmp || $scope.configPermisoAccionConsultaIngresosVentasEmpSA
                                    || $scope.configPermisoAccionConsultaIngresosProactivo) {
                                    $scope.boxContentVisible.ingresos = true;
                                }

                                if ($scope.configPermisoAccionConsultaCompletadoSoportes || $scope.configPermisoAccionConsultaCompletadoRes
                                    || $scope.configPermisoAccionConsultaCompletadoEmp || $scope.configPermisoAccionConsultaCompletadoProactivo
                                    || $scope.configPermisoAccionConsultaCompletadoCambioDomicilio || $scope.configPermisoAccionConsultaCompletadoSoporteEmpresarial) {
                                    $scope.boxContentVisible.completados = true;
                                }

                                if ($scope.configPermisoAccionConsultaSitiosFibrados || $scope.configPermisoAccionConsultaRedesSociales) {
                                    $scope.boxContentVisible.tickets = true;
                                }

                                if ($scope.configPermisoAccionConsultaGenerados || $scope.configPermisoAccionConsultaFactibilidadCerrados
                                    || configPermisoAccionConsultaFactibilidadCancelados) {
                                    $scope.boxContentVisible.factibilidad = true;
                                }

                                if ($scope.configPermisoAccionConsultaPlanningAgendas || $scope.configPermisoAccionConsultaPlanningAddon
                                    || $scope.configPermisoAccionConsultaPlanningNuevosAddon || $scope.configPermisoAccionConsultaPlanningCompletosOrdenes
                                    || $scope.configPermisoAccionConsultaPlanningCompletadosAddon) {
                                    $scope.boxContentVisible.planning = true;
                                }

                                if ($scope.configPermisoAccionConsultaRecoleccionGeneradas || $scope.configPermisoAccionConsultaRecoleccionCerrados
                                    || $scope.configPermisoAccionConsultaRecoleccionAgendadas) {
                                    $scope.boxContentVisible.recoleccion = true;
                                }

                                if ($scope.configPermisoAccionConsultaVentasInstalacion || $scope.configPermisoAccionConsultaVentasPrincipal) {
                                    $scope.boxContentVisible.ventas = true;
                                }
                            }

                            validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                            validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

                            let firstNav = '';

                            if ($scope.configPermisoAccionConsultaBackInstalaciones) {
                                if (firstNav === '') {
                                    firstNav = 'reporteInstalaciones-tab';
                                    $scope.tipoReporte = 'instalaciones';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackSoportes) {
                                if (firstNav === '') {
                                    firstNav = 'reporteSoportes-tab';
                                    $scope.tipoReporte = 'soportes';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackRecolecciones) {
                                if (firstNav === '') {
                                    firstNav = 'reporteRecolecciones-tab';
                                    $scope.tipoReporte = 'recolecciones';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackAddon) {
                                if (firstNav === '') {
                                    firstNav = 'reporteAddon-tab';
                                    $scope.tipoReporte = 'addon';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackEmpresarial) {
                                if (firstNav === '') {
                                    firstNav = 'reporteEmpresarial-tab';
                                    $scope.tipoReporte = 'empresarial';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackProactivo) {
                                if (firstNav === '') {
                                    firstNav = 'reporteBackLogProact-tab';
                                    $scope.tipoReporte = 'backlogproact';
                                }
                            }


                            if ($scope.configPermisoAccionConsultaIngresoSoportes) {
                                if (firstNav === '') {
                                    firstNav = 'reporteSoportesIng-tab';
                                    $scope.tipoReporte = 'soportesing';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaIngresosVentasRes) {
                                if (firstNav === '') {
                                    firstNav = 'reporteVentasRes-tab';
                                    $scope.tipoReporte = 'ventasres';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaIngresosVentasEmp) {
                                if (firstNav === '') {
                                    firstNav = 'reporteVentasEmp-tab';
                                    $scope.tipoReporte = 'ventasemp';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaIngresosVentasEmpSA) {
                                if (firstNav === '') {
                                    firstNav = 'reporteVentasEmpSA-tab';
                                    $scope.tipoReporte = 'ventasempsa';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaIngresosProactivo) {
                                if (firstNav === '') {
                                    firstNav = 'reporteIngresoProact-tab';
                                    $scope.tipoReporte = 'reporteIngresoProact';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoSoportes) {
                                if (firstNav === '') {
                                    firstNav = 'reporteSoportesComp-tab';
                                    $scope.tipoReporte = 'soportescomp';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoRes) {
                                if (firstNav === '') {
                                    firstNav = 'reporteInstRes-tab';
                                    $scope.tipoReporte = 'instalacionres';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoEmp) {
                                if (firstNav === '') {
                                    firstNav = 'reporteInstEmp-tab';
                                    $scope.tipoReporte = 'instalacionemp';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoProactivo) {
                                if (firstNav === '') {
                                    firstNav = 'reporteCompleProact-tab';
                                    $scope.tipoReporte = 'compleproact';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoCambioDomicilio) {
                                if (firstNav === '') {
                                    firstNav = 'reporteCompleCambDomic-tab';
                                    $scope.tipoReporte = 'complecambdomic';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoSoporteEmpresarial) {
                                if (firstNav === '') {
                                    firstNav = 'reporteCompleSoportEmpr-tab';
                                    $scope.tipoReporte = 'complesoportempr';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaSitiosFibrados) {
                                if (firstNav === '') {
                                    firstNav = 'reporteSitiosFibr-tab';
                                    $scope.tipoReporte = 'sitiosfibr';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaRedesSociales) {
                                if (firstNav === '') {
                                    firstNav = 'reporteRedesSoc-tab';
                                    $scope.tipoReporte = 'redessoc';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaGenerados) {
                                if (firstNav === '') {
                                    firstNav = 'reporteGenerados-tab';
                                    $scope.tipoReporte = 'generados';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaFactibilidadCerrados) {
                                if (firstNav === '') {
                                    firstNav = 'reporteFactibilCerrados-tab';
                                    $scope.tipoReporte = 'factibilcerrados';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaFactibilidadCancelados) {
                                if (firstNav === '') {
                                    firstNav = 'reporteFactibilCancelados-tab';
                                    $scope.tipoReporte = 'factibilcancelados';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaPlanningAgendas) {
                                if (firstNav === '') {
                                    firstNav = 'reportePlanningAgendas-tab';
                                    $scope.tipoReporte = 'planningagendas';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaPlanningAddon) {
                                if (firstNav === '') {
                                    firstNav = 'reportePlanningAddon-tab';
                                    $scope.tipoReporte = 'planningaddon';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaRecoleccionGeneradas) {
                                if (firstNav === '') {
                                    firstNav = 'reporteRecolecGenerados-tab';
                                    $scope.tipoReporte = 'recolecgenerados';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaRecoleccionCerrados) {
                                if (firstNav === '') {
                                    firstNav = 'reporteRecolecCerrados-tab';
                                    $scope.tipoReporte = 'recoleccerrados';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaRecoleccionAgendadas) {
                                if (firstNav === '') {
                                    firstNav = 'reporteRecolecAgendadas-tab';
                                    $scope.tipoReporte = 'recolecagendadas';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackLogFactibilidades) {
                                if (firstNav === '') {
                                    firstNav = 'reporteBackLogFactib-tab';
                                    $scope.tipoReporte = 'backlogfactib';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaBackLogVoluntarias) {
                                if (firstNav === '') {
                                    firstNav = 'reporteBackLogVolun-tab';
                                    $scope.tipoReporte = 'backlogvolun';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaPlanningNuevosAddon) {
                                if (firstNav === '') {
                                    firstNav = 'reportePlanningNuevosAddon-tab';
                                    $scope.tipoReporte = 'planningnuevosaddon';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaPlanningCompletosOrdenes) {
                                if (firstNav === '') {
                                    firstNav = 'reportePlanningCompleOrd-tab';
                                    $scope.tipoReporte = 'planningcompleord';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaPlanningCompletadosAddon) {
                                if (firstNav === '') {
                                    firstNav = 'reportePlanningCompAddon-tab';
                                    $scope.tipoReporte = 'planningcompaddon';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaVentasInstalacion) {
                                if (firstNav === '') {
                                    firstNav = 'reporteVentasInstalacion-tab';
                                    $scope.tipoReporte = 'ventasinstalacion';
                                }
                            }

                            if ($scope.configPermisoAccionConsultaVentasPrincipal) {
                                if (firstNav === '') {
                                    firstNav = 'reporteVentasPrinc-tab';
                                    $scope.tipoReporte = 'ventasprinc';
                                }
                            }

                            if (firstNav === '') {
                                $scope.permisosConfigUser.permisos = [];
                            }
                            if ($scope.permisosConfigUser.permisos.length > 0) {
                                setTimeout(function () {
                                    $('#' + firstNav).click();
                                    $scope.cambiaReporte($scope.tipoReporte, false, firstNav.split('-'[0]));
                                }, 300)
                            }
                        }
                    } else {
                        toastr.info('No se encontraron datos para la configuraci\u00F3n');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('No se encontraron datos para la configuraci\u00F3n');
            }
            $("#idBody").removeAttr("style");
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        if (results[0].data.result.geografia) {
                            $scope.listadogeografiacopy = results[0].data.result.geografia;
                            $scope.nfiltrogeografiaInstalaciones = $scope.nfiltrogeografiaInstalaciones ? $scope.nfiltrogeografiaInstalaciones : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaSoportes = $scope.nfiltrogeografiaSoportes ? $scope.nfiltrogeografiaSoportes : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaRecolecciones = $scope.nfiltrogeografiaRecolecciones ? $scope.nfiltrogeografiaRecolecciones : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaAddon = $scope.nfiltrogeografiaAddon ? $scope.nfiltrogeografiaAddon : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaEmpresarial = $scope.nfiltrogeografiaEmpresarial ? $scope.nfiltrogeografiaEmpresarial : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaGeneral = $scope.nfiltrogeografiaGeneral ? $scope.nfiltrogeografiaGeneral : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaSoportesIng = $scope.nfiltrogeografiaSoportesIng ? $scope.nfiltrogeografiaSoportesIng : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaVentasRes = $scope.nfiltrogeografiaVentasRes ? $scope.nfiltrogeografiaVentasRes : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaVentasEmp = $scope.nfiltrogeografiaVentasEmp ? $scope.nfiltrogeografiaVentasEmp : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaVentasEmpSA = $scope.nfiltrogeografiaVentasEmpSA ? $scope.nfiltrogeografiaVentasEmpSA : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaSoportesComp = $scope.nfiltrogeografiaSoportesComp ? $scope.nfiltrogeografiaSoportesComp : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaInstRes = $scope.nfiltrogeografiaInstRes ? $scope.nfiltrogeografiaInstRes : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaInstEmp = $scope.nfiltrogeografiaInstEmp ? $scope.nfiltrogeografiaInstEmp : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaSitFibr = $scope.nfiltrogeografiaSitFibr ? $scope.nfiltrogeografiaSitFibr : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaRedSoc = $scope.nfiltrogeografiaRedSoc ? $scope.nfiltrogeografiaRedSoc : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);
                            $scope.nfiltrogeografiaGenerados = $scope.nfiltrogeografiaGenerados ? $scope.nfiltrogeografiaGenerados : $scope.obtenerNivelUltimoJerarquiaGeneric(results[0].data.result.geografia);


                            if ($scope.configPermisoAccionConsultaBackInstalaciones) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaInstalaciones);
                                $scope.listaGeografiaReporte.instalaciones = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackSoportes) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaSoportes);
                                $scope.listaGeografiaReporte.soportes = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackRecolecciones) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaRecolecciones);
                                $scope.listaGeografiaReporte.recolecciones = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackAddon) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaAddon);
                                $scope.listaGeografiaReporte.addon = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaBackEmpresarial) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaEmpresarial);
                                $scope.listaGeografiaReporte.empresarial = angular.copy(geografia);
                            }

    
                            if ($scope.configPermisoAccionConsultaIngresoSoportes) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaSoportesIng);
                                $scope.listaGeografiaReporte.soportesing = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaIngresosVentasRes) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaVentasRes);
                                $scope.listaGeografiaReporte.ventasres = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaIngresosVentasEmp) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaVentasEmp);
                                $scope.listaGeografiaReporte.ventasemp = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaIngresosVentasEmpSA) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaVentasEmpSA);
                                $scope.listaGeografiaReporte.ventasempsa = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoSoportes) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaSoportesComp);
                                $scope.listaGeografiaReporte.soportescomp = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoRes) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaInstRes);
                                $scope.listaGeografiaReporte.instalacionres = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaCompletadoEmp) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaInstEmp);
                                $scope.listaGeografiaReporte.instalacionemp = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaSitiosFibrados) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaSitFibr);
                                $scope.listaGeografiaReporte.sitiosfibr = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaRedesSociales) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaRedSoc);
                                $scope.listaGeografiaReporte.redessoc = angular.copy(geografia);
                            }

                            if ($scope.configPermisoAccionConsultaGenerados) {
                                let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaGenerados);
                                $scope.listaGeografiaReporte.generados = angular.copy(geografia);
                            }

                        } else {
                            toastr.info('No se encontraron datos para la geograf\u00EDa');
                        }
                    } else {
                        toastr.info('No se encontraron datos para la geograf\u00EDa');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de la geograf\u00EDa');
            }

            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        $scope.nfiltrointervencionesGeneral = $scope.nfiltrointervencionesGeneral ? $scope.nfiltrointervencionesGeneral : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result);

                    } else {
                        toastr.info('No se encontraron tipo ordenes');
                    }
                } else {
                    toastr.warning(results[2].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
            }


        }).catch(err => handleError(err));
    }

    $scope.consultarCatalagosPI();

    $scope.getFechaFormatoValid = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }

    $scope.changeCalendar = function (data, reporte) {
        let tipo = data.reporte[reporte + ""];
        switch (tipo) {
            case 'dia':
                $("#filtro_fecha_dia_" + reporte).show();
                $("#filtro_fecha_semana_" + reporte).hide();
                $("#filtro_fecha_mes_" + reporte).hide();
                break;
            case 'semana':
                $("#filtro_fecha_semana_" + reporte).show();
                $("#filtro_fecha_mes_" + reporte).hide();
                $("#filtro_fecha_dia_" + reporte).hide();
                break;
            case 'mes':
                $("#filtro_fecha_mes_" + reporte).show();
                $("#filtro_fecha_dia_" + reporte).hide();
                $("#filtro_fecha_semana_" + reporte).hide();
                break;

            default:
                break;
        }

    }

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        var startDate = moment([fechaPrueba[2], fechaPrueba[1] - 1]);
        var endDate = moment(startDate).endOf('month');
        return { fechaInicio: startDate.format('YYYY-MM-DD'), fechaFin: endDate.format('YYYY-MM-DD') };
    }

    $scope.getFecha = function (type) {
        let fechaInicio;
        let fechaFin;
        let tipo = $("#tipo_reporte_" + type).val();
        switch (tipo) {
            case 'dia':
                fechaInicio = $scope.getFechaFormatoValid($("#filtro_fecha_dia_" + type).val())
                let day = $scope.getFechaFormatoValid($("#filtro_fecha_dia_" + type).val())
                let fin = new Date(day);
                fechaFin = moment(fin).add(2, "days").format('YYYY-MM-DD');
                break;
            case 'semana':
                fechaInicio = moment($scope.weekDateObjectReport[type + ""].inicio).format('YYYY-MM-DD');
                fechaFin = moment($scope.weekDateObjectReport[type + ""].fin).add(1, "days").format('YYYY-MM-DD');
                break;
            case 'mes':
                let fechas = $scope.getFechaFormato($("#filtro_fecha_mes_" + type).val());
                fechaInicio = fechas.fechaInicio;
                fechaFin = fechas.fechaFin;
                break;

            default:
                break;
        }
        return { fechaInicio: fechaInicio, fechaFin: fechaFin }
    }

    $scope.seleccionarTodosRecursivo = function (array) {
        array.map(function (e) {
            e.checkedOpcion = true;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.seleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.deseleccionarTodosRecursivo = function (array) {
        array.map(function (e) {
            e.checkedOpcion = false;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.deseleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.setCheckFiltroGenericV2 = function (filtro, principalArray) {
        if (filtro.children !== undefined && filtro.children.length > 0) {
            if (filtro.checkedOpcion) {
                $scope.deseleccionarTodosRecursivo(filtro.children);
            } else {
                $scope.seleccionarTodosRecursivo(filtro.children);
            }
        }
        filtro.checkedOpcion = !filtro.checkedOpcion;
        $scope.checkPadre(filtro.idPadre, principalArray, principalArray);
    }

    $scope.checkPadre = function (idPadre, array, principalArray) {
        array.map(function (e) {
            if (Number(e.id) === Number(idPadre)) {
                e.checkedOpcion = e.children.length === e.children.filter(function (e) { return e.checkedOpcion }).length;
                $scope.checkPadre(e.idPadre, principalArray, principalArray);
            } else {
                if (e.children !== undefined && e.children.length > 0) {
                    $scope.checkPadre(idPadre, e.children, principalArray);
                }
            }
        });
    }

    $scope.obtenerElementosSeleccionadosFiltro = function (array, nivel) {
        let arrayReturn = [];
        angular.forEach(array, function (elemento, index) {
            if (elemento.nivel == nivel && elemento.checkedOpcion) {
                arrayReturn.push(elemento.id);
            } else {
                arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
            }
        });
        return arrayReturn;
    }

    $scope.consultarReporteInstalaciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalaciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstalaciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [48],
                clusters: clustersparam
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteInstalaciones = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.estatusOs ? elemento.estatusOs : 'Sin informaci&oacute;n';
                                    row[4] = elemento.nombreFamilia ? elemento.nombreFamilia : 'Sin informaci&oacute;n';
                                    row[5] = elemento.confirmada == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[6] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[7] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[8] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    row[9] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[10] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[11] = elemento.delegacionMunicipio ? elemento.delegacionMunicipio : 'Sin informaci&oacute;n';
                                    row[12] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    row[15] = elemento.fechaModificacion ? elemento.fechaModificacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.canalVenta ? elemento.canalVenta : 'Sin informaci&oacute;n';
                                    row[17] = elemento.compania ? elemento.compania : 'Sin informaci&oacute;n';
                                    row[18] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[19] = elemento.subTipoOrden ? elemento.subTipoOrden : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteInstalacionesTable = $('#reporteInstalacionesTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [19], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteInstalaciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalaciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstalaciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [48],
                clusters: clustersparam,
                tipoExcel: 'reportesf-backloginstalaciones-pi',
                sheet: "Reporte backlog instalaciones",
                headers: ["OT", "OS", "CUENTA", "ESTATUS", "FAMILIA", "CONFIRMADA", "TURNO",
                    "PLAZA SITIO", "OPERACION","CLUSTER COMERCIAL", "CLUSTER", "DELEGACION", "DISTRITO", "FECHA CREACION", "FECHA AGENDA", "FECHA MODIFICACION",
                    "CANAL VENTA", "COMPANIA", "TIPO ORDEN", "SUBTIPO"],
                valores: ["idOt", "ordenServicio", "numeroCuenta", "estatusOs", "nombreFamilia", "confirmada", "turno",
                    "plazaSitio", "plazaOperacion", "clusterComercial","cluster", "delegacionMunicipio", "distritoSitio", "fechaCreacion",
                    "fechaAgendada", "fechaModificacion", "canalVenta", "compania", "tipoOrden", "subTipoOrden"]
            }
            $scope.downloadReport(params, 'reporteBacklogInstalaciones', 'backlog instalaciones');
            // if ($scope.resultReporteInstalaciones && $scope.resultReporteInstalaciones > 0) {
            //     $scope.downloadReport(params, 'reporteBacklogInstalaciones', 'backlog instalaciones');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteSoportes = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-soportes").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaSoportes)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteSoportes = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.ticket ? elemento.ticket : 'Sin informaci&oacute;n';
                                    row[4] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[6] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[7] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[10] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[12] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[13] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[16] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[17] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[18] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                                    row[19] = elemento.grupoCodificador ? elemento.grupoCodificador : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[24] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[25] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[26] = elemento.nuevoSegmento ? elemento.nuevoSegmento : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteSoportesTable = $('#reporteSoportesTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [26], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteSoportes = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-soportes").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaSoportes)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                tipoExcel: 'reportesf-backlog-pi',
                sheet: "Reporte backlog soportes",
                headers: ["OT", "OS", "CUENTA", "TICKET", "REGION INSTALACION", "PLAZA", "ZONA",
                    "CLUSTER INSTALACION", "COLONIA", "PLAZA SITIO", "DISTRITO SITIO", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "TURNO",
                    "FECHA ACTIVACION", "ESTATUS", "ESTADO", "FECHA APERTURA", "PROPIETARIO", "GRUPO", "NIVEL1", "NIVEL2", "NIVEL3", "REPETIDO",
                    "TIPO ORDEN", "SUBTIPO", "NUEVO SEGMENTO"],
                valores: ["idOt", "ordenServicio", "numeroCuenta", "ticket", "regionInstalacion", "plaza", "zona",
                    "clusterInstalacion", "colonia", "plazaSitio", "distritoSitio", "primerFechaAgendamiento", "fechaAgendamiento", "turno", "fechaActivacion", "estatus", "estado",
                    "fechaApertura", "propietario", "grupoCodificador", "nivel1", "nivel2", "nivel3", "repetido", "tipoOrden", "subTipo", "nuevoSegmento"]
            }
            $scope.downloadReport(params, 'reporteBacklogSoportes', 'backlog soportes');
            // if ($scope.resultReporteSoportes && $scope.resultReporteSoportes > 0) {
            //     $scope.downloadReport(params, 'reporteBacklogSoportes', 'backlog soportes');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteRecolecciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-recolecciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaRecolecciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [85],
                clusters: clustersparam
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteRecolecciones = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.ticket ? elemento.ticket : 'Sin informaci&oacute;n';
                                    row[4] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[6] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[7] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[10] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[12] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[13] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[16] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[17] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[18] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                                    row[19] = elemento.grupoCodificador ? elemento.grupoCodificador : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[24] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[25] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[26] = elemento.nuevoSegmento ? elemento.nuevoSegmento : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteRecoleccionesTable = $('#reporteRecoleccionesTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [26], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteRecolecciones = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-recolecciones").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaRecolecciones)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [85],
                clusters: clustersparam,
                tipoExcel: 'reportesf-backlog-pi',
                sheet: "Reporte backlog recolecciones",
                headers: ["OT", "OS", "CUENTA", "TICKET", "REGION INSTALACION", "PLAZA", "ZONA",
                    "CLUSTER INSTALACION", "COLONIA", "PLAZA SITIO", "DISTRITO SITIO", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "TURNO",
                    "FECHA ACTIVACION", "ESTATUS", "ESTADO", "FECHA APERTURA", "PROPIETARIO", "GRUPO", "NIVEL1", "NIVEL2", "NIVEL3", "REPETIDO",
                    "TIPO ORDEN", "SUBTIPO", "NUEVO SEGMENTO"],
                valores: ["idOt", "ordenServicio", "numeroCuenta", "ticket", "regionInstalacion", "plaza", "zona",
                    "clusterInstalacion", "colonia", "plazaSitio", "distritoSitio", "primerFechaAgendamiento", "fechaAgendamiento", "turno", "fechaActivacion", "estatus", "estado",
                    "fechaApertura", "propietario", "grupoCodificador", "nivel1", "nivel2", "nivel3", "repetido", "tipoOrden", "subTipo", "nuevoSegmento"]
            }
            $scope.downloadReport(params, 'reporteBacklogRecolecciones', 'backlog recolecciones');
            // if ($scope.resultReporteRecolecciones && $scope.resultReporteRecolecciones > 0) {
            //     $scope.downloadReport(params, 'reporteBacklogRecolecciones', 'backlog recolecciones');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteAddon = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-addon").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaAddon)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [65, 130, 95, 136],
                clusters: clustersparam,

            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteAddon = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.ticket ? elemento.ticket : 'Sin informaci&oacute;n';
                                    row[4] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[6] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[7] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[10] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[12] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[13] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[16] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[17] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[18] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                                    row[19] = elemento.grupoCodificador ? elemento.grupoCodificador : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[24] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[25] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[26] = elemento.nuevoSegmento ? elemento.nuevoSegmento : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteAddonTable = $('#reporteAddonTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [26], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteAddon = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-addon").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaAddon)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [65, 130, 95, 136],
                clusters: clustersparam,
                tipoExcel: 'reportesf-backlog-pi',
                sheet: "Reporte backlog addon",
                headers: ["OT", "OS", "CUENTA", "TICKET", "REGION INSTALACION", "PLAZA", "ZONA",
                    "CLUSTER INSTALACION", "COLONIA", "PLAZA SITIO", "DISTRITO SITIO", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "TURNO",
                    "FECHA ACTIVACION", "ESTATUS", "ESTADO", "FECHA APERTURA", "PROPIETARIO", "GRUPO", "NIVEL1", "NIVEL2", "NIVEL3", "REPETIDO",
                    "TIPO ORDEN", "SUBTIPO", "NUEVO SEGMENTO"],
                valores: ["idOt", "ordenServicio", "numeroCuenta", "ticket", "regionInstalacion", "plaza", "zona",
                    "clusterInstalacion", "colonia", "plazaSitio", "distritoSitio", "primerFechaAgendamiento", "fechaAgendamiento", "turno", "fechaActivacion", "estatus", "estado",
                    "fechaApertura", "propietario", "grupoCodificador", "nivel1", "nivel2", "nivel3", "repetido", "tipoOrden", "subTipo", "nuevoSegmento"]

            }
            $scope.downloadReport(params, 'reporteBacklogAddon', 'backlog addon');
            // if ($scope.resultReporteAddon && $scope.resultReporteAddon > 0) {
            //     $scope.downloadReport(params, 'reporteBacklogAddon', 'backlog addon');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteEmpresarial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-empresarial").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaEmpresarial)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [200],
                clusters: clustersparam
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBacklog(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteEmpresarial = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.estatusOs ? elemento.estatusOs : 'Sin informaci&oacute;n';
                                    row[4] = elemento.nombreFamilia ? elemento.nombreFamilia : 'Sin informaci&oacute;n';
                                    row[5] = elemento.confirmada == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[6] = elemento.turno ? elemento.turno : 'Sin informaci&oacute;n';
                                    row[7] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[8] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    row[9] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[10] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[11] = elemento.delegacionMunicipio ? elemento.delegacionMunicipio : 'Sin informaci&oacute;n';
                                    row[12] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    row[15] = elemento.fechaModificacion ? elemento.fechaModificacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.canalVenta ? elemento.canalVenta : 'Sin informaci&oacute;n';
                                    row[17] = elemento.compania ? elemento.compania : 'Sin informaci&oacute;n';
                                    row[18] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[19] = elemento.subTipoOrden ? elemento.subTipoOrden : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteEmpresarialTable = $('#reporteEmpresarialTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [18], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteEmpresarial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-empresarial").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaEmpresarial)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let params = {
                tiposOrden: [200],
                clusters: clustersparam,
                sheet: "Reporte backlog empresarial",
                tipoExcel: 'reportesf-backlog-pi',
                headers: ["OT", "OS", "CUENTA", "ESTATUS", "FAMILIA", "CONFIRMADA", "TURNO",
                    "PLAZA SITIO", "OPERACION", "CLUSTER", "CLUSTER COMERCIAL", "DELEGACION", "DISTRITO", "FECHA CREACION", "FECHA AGENDA",
                    "FECHA MODIFICACION", "CANAL VENTA", "COMPANIA", "TIPO ORDEN", "SUBTIPO"],
                valores: ["idOt", "ordenServicio", "numeroCuenta", "estatusOs", "nombreFamilia", "confirmada", "turno",
                    "plazaSitio", "plazaOperacion","cluster", "clusterComercial", "delegacionMunicipio", "distritoSitio", "fechaCreacion", "fechaAgendada",
                    "fechaModificacion", "canalVenta", "compania", "tipoOrden", "subTipoOrden"]
            }
            $scope.downloadReport(params, 'reporteBacklogEmpresarial', 'backlog empresarial');
        }
    }

    $scope.consultarReporteBackLogProactivos = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_backlogproact").val() == 'semana' && !$scope.weekDateObjectReport.backlogproact) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('backlogproact');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBackLogProactivo(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteBackLogProact = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.caseNumber ? elemento.caseNumber : 'Sin informaci&oacute;n';
                                    row[3] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatusOS ? elemento.estatusOS : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[6] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[7] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[8] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[9] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[10] = elemento.propietarioTicket ? elemento.propietarioTicket : 'Sin informaci&oacute;n';
                                    row[11] = elemento.turnoAg ? elemento.turnoAg : 'Sin informaci&oacute;n';
                                    row[12] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[13] = elemento.coloniaFacturacion ? elemento.coloniaFacturacion : 'Sin informaci&oacute;n';
                                    row[14] = elemento.createdDate ? elemento.createdDate : 'Sin informaci&oacute;n';
                                    row[15] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[16] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[17] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[18] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[19] = elemento.empleadoPropietario ? elemento.empleadoPropietario : 'Sin informaci&oacute;n';
                                    row[20] = elemento.grupo ? elemento.grupo : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[24] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[25] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[26] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[27] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteBackLogProactivoTable = $('#reporteBackLogProactivoTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [27], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.decargarReporteBackLogProactivos = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_backlogproact").val() == 'semana' && !$scope.weekDateObjectReport.backlogproact) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('backlogproact');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte backlog proactivo",
                tipoExcel: 'reportesf-backlogproact-pi',
                headers: ["CUENTA", "OS", "TICKET", "ID OT GIM", "ESTATUS", "ESTADO", "TIPO", "SUBTIPO","PLAZA","ZONA", "PROPIETARIO TICKET", "TURNO AGENDAMIENTO", "CLUSTER INSTALACION", "COLONIA",
                "FECHA/HORA APERTURA", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "FECHA ACTIVACION", "REGION INSTALACION", "FUNCION PROPIETARIO", "GRUPO CODIFICACION",
                "NIVEL 1", "NIVEL 2", "NIVEL 3", "REPETIDO", "DISTRITO SITIO", "CLUSTER COMERCIAL", "PLAZA SITIO"],
                valores: ["idCuentaBRM", "folio", "caseNumber", "idOtGIM", "estatusOS", "estado", "tipoOrden", "subTipo", "plaza", "zona", "propietarioTicket", "turnoAg", "clusterInstalacion", "coloniaFacturacion",
                "createdDate", "primerFechaAgendamiento", "fechaAgendamiento", "fechaActivacion", "regionInstalacion", "empleadoPropietario", "grupo",
                "nivel1", "nivel2", "nivel3", "repetido", "distritoSitio", "clusterComercial", "plazaSitio"]
            }
            $scope.downloadReport(params, 'reporteBackLogProactivos', 'backlogproact');
        }
    }

    $scope.consultarReporteSoportesIng = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-soportesing").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaSoportesIng)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_soportesing").val() == 'semana' && !$scope.weekDateObjectReport.soportesing) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('soportesing');
            let params = {
                tiposOrden: [55],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteIngresoSoporte(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteSoportesIng = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.ticket ? elemento.ticket : 'Sin informaci&oacute;n';
                                    row[4] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[6] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[7] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[9] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[10] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[12] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaCierre ? elemento.fechaCierre : 'Sin informaci&oacute;n';
                                    row[14] = elemento.tsCompletado ? elemento.tsCompletado : 'Sin informaci&oacute;n';
                                    row[15] = elemento.tsCancelado ? elemento.tsCancelado : 'Sin informaci&oacute;n';
                                    row[16] = elemento.turnoAgendamiento ? elemento.turnoAgendamiento : 'Sin informaci&oacute;n';
                                    row[17] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[18] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[19] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                                    row[20] = elemento.grupoCodificador ? elemento.grupoCodificador : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[24] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[25] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[26] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[27] = elemento.repetido60 == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[28] = elemento.instalacionLatitude ? elemento.instalacionLatitude : 'Sin informaci&oacute;n';
                                    row[29] = elemento.instalacionLongitude ? elemento.instalacionLongitude : 'Sin informaci&oacute;n';
                                    row[30] = elemento.origenTicket ? elemento.origenTicket : 'Sin informaci&oacute;n';
                                    row[31] = elemento.descripcion ? elemento.descripcion : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteSoportesIngTable = $('#reporteSoportesIngTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [31], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteSoportesIng = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-soportesing").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaSoportesIng)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_soportesing").val() == 'semana' && !$scope.weekDateObjectReport.soportesing) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('soportesing');
            let params = {
				metodoConsumo:"POST",
                tiposOrden: [55],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte ingresos soportes",
                tipoExcel: 'reportesf-ingresosoportes-pi',
                headers: ["OT", "OS", "CUENTA", "TICKET", "CLUSTER INSTALACION", "ZONA", "PLAZA", "REGION INSTALACION", "FECHA CREACION",
                    "FECHA APERTURA", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "FECHA ACTIVACION", "FECHA CIERRE", "COMPLETADO",
                    "CANCELADO", "TURNO AGENDAMIENTO", "ESTATUS", "ESTADO", "PORPIETARIO", "GRUPO CODIFICADOR", "NIVEL1", "NIVEL2", "NIVEL3", "TIPO ORDEN",
                    "SUBTIPO", "REPETIDO", "REPETIDO60", "LATITUD", "LOGITUD", "ORIGEN", "DESCRIPCION"],
                valores: ["idOt", "ordenServicio", "numeroCuenta", "ticket", "clusterInstalacion", "zona", "plaza",
                    "regionInstalacion", "fechaCreacion", "fechaApertura", "primerFechaAgendamiento", "fechaAgendamiento", "fechaActivacion",
                    "fechaCierre", "tsCompletado", "tsCancelado", "turnoAgendamiento", "estatus", "estado",
                    "propietario", "grupoCodificador", "nivel1", "nivel2", "nivel3", "tipoOrden", "subTipo", "repetido", "repetido60",
                    "instalacionLatitude", "instalacionLongitude", "origenTicket", "descripcion"]

            }
            $scope.downloadReport(params, 'reporteIngresoSoportes', 'ingresos soportes');
            // if ($scope.resultReporteSoportesIng && $scope.resultReporteSoportesIng > 0) {
            //     $scope.downloadReport(params, 'reporteIngresoSoportes', 'ingresos soportes');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteVentasResidencial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-ventasres").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaVentasRes)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_ventasres").val() == 'semana' && !$scope.weekDateObjectReport.ventasres) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasres');
            let params = {
                tiposOrden: [48],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteIngresoResidencial(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteVentasResidencial = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[2] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[3] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[4] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.motivoCancelacion ? elemento.motivoCancelacion : 'Sin informaci&oacute;n';
                                    row[6] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[7] = elemento.origenProspecto ? elemento.origenProspecto : 'Sin informaci&oacute;n';
                                    row[8] = elemento.fechaCierre ? elemento.fechaCierre : 'Sin informaci&oacute;n';
                                    row[9] = elemento.tsGanada ? elemento.tsGanada : 'Sin informaci&oacute;n';
                                    row[10] = elemento.etapa ? elemento.etapa : 'Sin informaci&oacute;n';
                                    row[11] = elemento.tsConfirmado ? elemento.tsConfirmado : 'Sin informaci&oacute;n';
                                    row[12] = elemento.tsCancelado ? elemento.tsCancelado : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteVentasResTable = $('#reporteVentasResTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [12], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteVentasResidencial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-ventasres").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaVentasRes)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_ventasres").val() == 'semana' && !$scope.weekDateObjectReport.ventasres) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasres');
            let params = {
                tiposOrden: [48],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte ingresos ventas residencial",
                tipoExcel: 'reportesf-ingresoresidencial-pi',
                headers: ["CUENTA", "CLUSTER INSTALACION", "ESTATUS", "FECHA CREACION", "FECHA ACTIVACION", "MOTIVO CANCELACION", "FECHA AGENDAMIENTO",
                    "ORIGEN", "FECHA CIERRE", "GANADA", "ETAPA", "CONFIRMADO", "CANCELADO"],
                valores: ["numeroCuenta", "clusterInstalacion", "estatus", "fechaCreacion", "fechaActivacion", "motivoCancelacion", "fechaAgendamiento",
                    "origenProspecto", "fechaCierre", "tsGanada", "etapa", "tsConfirmado", "tsCancelado"]
            }
            $scope.downloadReport(params, 'reporteIngresosVentasResidencial', 'ventas residencial');
            // if ($scope.resultReporteVentasResidencial && $scope.resultReporteVentasResidencial > 0) {
            //     $scope.downloadReport(params, 'reporteVentasResidencial', 'ventas residencial');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteVentasEmpresarial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-ventasemp").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaVentasEmp)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_ventasemp").val() == 'semana' && !$scope.weekDateObjectReport.ventasemp) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasemp');
            let params = {
                tiposOrden: [88],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteIngresoEmpresarial(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteVentasEmpresarial = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];
                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[2] = elemento.cotizacion ? elemento.cotizacion : 'Sin informaci&oacute;n';
                                    row[3] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
                                    row[4] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[5] = elemento.nuevoSegmento ? elemento.nuevoSegmento : 'Sin informaci&oacute;n';
                                    row[6] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[7] = elemento.tsGanada ? elemento.tsGanada : 'Sin informaci&oacute;n';
                                    row[8] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteVentasEmpTable = $('#reporteVentasEmpTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [8], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteVentasEmpresarial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-ventasemp").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaVentasEmp)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_ventasemp").val() == 'semana' && !$scope.weekDateObjectReport.ventasemp) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasemp');
            let params = {
                tiposOrden: [88],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte ingresos ventas empresarial",
                tipoExcel: 'reportesf-ingresoempresarial-pi',
                headers: ["CUENTA", "CLUSTER", "COTIZACION", "CSP", "FECHA AGENDAMIENTO", "NUEVO SEGMENTO", "PLAZA",
                    "GANADA", "TIPO ORDEN"],
                valores: ["numeroCuenta", "clusterInstalacion", "cotizacion", "csp", "fechaAgendamiento", "nuevoSegmento", "plaza",
                    "tsGanada", "tipoOrden"]
            }
            $scope.downloadReport(params, 'reporteIngresosVentasEmpresarial', 'ventas empresarial');
            // if ($scope.resultReporteVentasEmpresarial && $scope.resultReporteVentasEmpresarial > 0) {
            //     $scope.downloadReport(params, 'reporteVentasEmpresarial', 'ventas empresarial');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteVentasEmpresarialSA = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-ventasempsa").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaVentasEmpSA)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_ventasempsa").val() == 'semana' && !$scope.weekDateObjectReport.ventasempsa) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasempsa');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarEmpresarialSinAgenda(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteVentasEmpresarialSA = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.cotizacion ? elemento.cotizacion : 'Sin informaci&oacute;n';
                                    row[1] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
                                    row[2] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[3] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[4] = elemento.tsGanada ? elemento.tsGanada : 'Sin informaci&oacute;n';


                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteVentasEmpSATable = $('#reporteVentasEmpSATable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [4], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteVentasEmpresarialSA = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-ventasempsa").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaVentasEmpSA)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_ventasempsa").val() == 'semana' && !$scope.weekDateObjectReport.ventasemsa) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasempsa');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte ingresos ventas empresarial sin agenda",
                tipoExcel: 'reportesf-ingresoempresarialsa-pi',
                headers: ["COTIZACION", "CSP", "PLAZA", "TIPO ORDEN", "GANADA"],
                valores: ["cotizacion", "csp", "plaza", "tipoOrden", "tsGanada"]
            }
            $scope.downloadReport(params, 'reporteIngresosVentasEmpresarialSinAgenda', 'ventas empresarial sin agenda');
        }
    }

    $scope.consultarReporteIngresoProactivos = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_ingresoproact").val() == 'semana' && !$scope.weekDateObjectReport.ingresoproact) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ingresoproact');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteIngresoProactivo(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteIngresoProact = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.caseNumber ? elemento.caseNumber : 'Sin informaci&oacute;n';
                                    row[3] = elemento.estatusOS ? elemento.estatusOS : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[5] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[6] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[7] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.createdDate ? elemento.createdDate : 'Sin informaci&oacute;n';
                                    row[9] = elemento.closedDate ? elemento.closedDate : 'Sin informaci&oacute;n';
                                    row[10] = elemento.grupo ? elemento.grupo : 'Sin informaci&oacute;n';
                                    row[11] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[12] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[13] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[14] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[17] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[18] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[19] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[20] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[21] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[22] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteIngresoProactivoTable = $('#reporteIngresoProactivoTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [11], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteIngresoProactivos = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_ingresoproact").val() == 'semana' && !$scope.weekDateObjectReport.ingresoproact) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ingresoproact');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte ingresos proactivos",
                tipoExcel: 'reportesf-ingresoproact-pi',
                headers: ["CUENTA", "OS", "TICKET", "ESTATUS", "ESTADO", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "FECHA ACTIVACION","FECHA/HORA APERTURA","FECHA/HORA CIERRE", "GRUPO CODIFICACION", "NIVEL 1", "NIVEL 2", "NIVEL 3",
                "CLUSTER INSTALACION", "REGION INSTALACION", "PLAZA", "REPETIDO", "DISTRITO SITIO", "SUBTIPO", "CLUSTER COMERCIAL", "PLAZA SITIO", "PLAZA OPERACION"],
                valores: ["idCuentaBRM", "folio", "caseNumber", "estatusOS", "estado", "primerFechaAgendamiento", "fechaAgendamiento", "fechaActivacion", "createdDate", "closedDate", "grupo", "nivel1", "nivel2", "nivel3",
                "clusterInstalacion", "regionInstalacion", "plaza", "repetido", "distritoSitio", "subTipo", "clusterComercial", "plazaSitio", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteIngresosProactivos', 'ingresoproact');
        }
    }

    $scope.consultarReporteSoportesCompletado = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-soportescomp").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaSoportesComp)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_soportescomp").val() == 'semana' && !$scope.weekDateObjectReport.soportescomp) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('soportescomp');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteCompletosSoporte(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteSoportesComp = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];


                                    row[0] = elemento.idOt ? elemento.idOt : 'Sin informaci&oacute;n';
                                    row[1] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[3] = elemento.ticket ? elemento.ticket : 'Sin informaci&oacute;n';
                                    row[4] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[5] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[6] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[7] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[9] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[10] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[12] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaCierre ? elemento.fechaCierre : 'Sin informaci&oacute;n';
                                    row[14] = elemento.tsCompletado ? elemento.tsCompletado : 'Sin informaci&oacute;n';
                                    row[15] = elemento.tsCancelado ? elemento.tsCancelado  : 'Sin informaci&oacute;n';
                                    row[16] = elemento.turnoAgendamiento ? elemento.turnoAgendamiento : 'Sin informaci&oacute;n';
                                    row[17] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[18] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[19] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                                    row[20] = elemento.grupoCodificador ? elemento.grupoCodificador : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[24] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[25] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[26] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[27] = elemento.repetido60 == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[28] = elemento.instalacionLatitude ? elemento.instalacionLatitude : 'Sin informaci&oacute;n';
                                    row[29] = elemento.instalacionLongitude ? elemento.instalacionLongitude : 'Sin informaci&oacute;n';
                                    row[30] = elemento.origenTicket ? elemento.origenTicket : 'Sin informaci&oacute;n';
                                    row[31] = elemento.descripcion ? elemento.descripcion : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteSoportesCompTable = $('#reporteSoportesCompTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [26], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteSoportesCompletado = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-soportescomp").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaSoportesComp)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_soportescomp").val() == 'semana' && !$scope.weekDateObjectReport.soportescomp) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('soportescomp');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte completado soportes",
                tipoExcel: 'reportesf-completadosoportes-pi',
                headers: ["OT", "OS", "CUENTA", "TICKET", "CLUSTER INSTALACION", "ZONA", "PLAZA", "REGION INSTALACION", "FECHA CREACION",
                    "FECHA APERTURA", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "FECHA ACTIVACION", "FECHA CIERRE", "COMPLETADO",
                    "CANCELADO", "TURNO AGENDAMIENTO", "ESTATUS", "ESTADO", "PORPIETARIO", "GRUPO CODIFICADOR", "NIVEL1", "NIVEL2", "NIVEL3", "TIPO ORDEN",
                    "SUBTIPO", "REPETIDO", "REPETIDO60", "LATITUD", "LOGITUD", "ORIGEN", "DESCRIPCION"],
                valores: ["idOt", "ordenServicio", "numeroCuenta", "ticket", "clusterInstalacion", "zona", "plaza",
                    "regionInstalacion", "fechaCreacion", "fechaApertura", "primerFechaAgendamiento", "fechaAgendamiento", "fechaActivacion",
                    "fechaCierre", "tsCompletado", "tsCancelado", "turnoAgendamiento", "estatus", "estado",
                    "propietario", "grupoCodificador", "nivel1", "nivel2", "nivel3", "tipoOrden", "subTipo", "repetido", "repetido60",
                    "instalacionLatitude", "instalacionLongitude", "origenTicket", "descripcion"]
            }
            $scope.downloadReport(params, 'reporteCompletadosSoportes', 'completado soportes');
            // if ($scope.resultReporteSoportesComp && $scope.resultReporteSoportesComp > 0) {
            //     $scope.downloadReport(params, 'reporteCompletadoSoportes', 'completado soportes');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteInstalacionResidencial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalacionres").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstRes)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_instalacionres").val() == 'semana' && !$scope.weekDateObjectReport.instalacionres) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('instalacionres');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteCompletosResidencial(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteIntalacionRes = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[1] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[2] = elemento.nombrePlan ? elemento.nombrePlan : 'Sin informaci&oacute;n';
                                    row[3] = elemento.nombreFamilia ? elemento.nombreFamilia : 'Sin informaci&oacute;n';
                                    row[4] = elemento.subcanal ? elemento.subcanal : 'Sin informaci&oacute;n';
                                    row[5] = elemento.aprobarVentaExpress ? elemento.aprobarVentaExpress : 'Sin informaci&oacute;n';
                                    row[6] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[7] = elemento.ventaExpress == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[8] = elemento.fechaCierre ? elemento.fechaCierre : 'Sin informaci&oacute;n';
                                    row[9] = elemento.origenProspecto ? elemento.origenProspecto : 'Sin informaci&oacute;n';
                                    row[10] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[12] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[13] = elemento.numeroEmpleadoActiva ? elemento.numeroEmpleadoActiva : 'Sin informaci&oacute;n';
                                    row[14] = elemento.nombreEmpleadoActiva ? elemento.nombreEmpleadoActiva : 'Sin informaci&oacute;n';
                                    row[15] = elemento.sistemaActivacion ? elemento.sistemaActivacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.activacionLatitude ? elemento.activacionLatitude : 'Sin informaci&oacute;n';
                                    row[17] = elemento.activacionLongitude ? elemento.activacionLongitude : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteInstResTable = $('#reporteInstResTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [17], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteInstalacionResidencial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalacionres").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstRes)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_instalacionres").val() == 'semana' && !$scope.weekDateObjectReport.instalacionres) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('instalacionres');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte instalaciones residencial",
                tipoExcel: 'reportesf-completadoresidencial-pi',
                headers: ["OS", "CUENTA", "PLAN", "FAMILIA", "SUBCANAL", "VENTA APROBADA", "FECHA CREACION", "VENTA EXPRESS", "FECHA CIERRE", "PROSPECTO", "CLUSTER INSTALACION",
                    "FECHA ACTIVACION", "SUBTIPO", "#EMPLEADO ACTIVA", "NOMBRE EMPLEADO", "SISTEMA ACTIVACION", "LATITUD", "LONGITUD"],
                valores: ["ordenServicio", "numeroCuenta", "nombrePlan", "nombreFamilia", "subcanal", "aprobarVentaExpress", "fechaCreacion", "ventaExpress", "fechaCierre", "origenProspecto", "clusterInstalacion",
                    "fechaActivacion", "subTipo", "numeroEmpleadoActiva", "nombreEmpleadoActiva", "sistemaActivacion", "activacionLatitude", "activacionLongitude"]
            }
            $scope.downloadReport(params, 'reporteCompletadosInstalacionResidencial', 'instalacion residencial');
            // if ($scope.resultReporteIntalacionRes && $scope.resultReporteIntalacionRes > 0) {
            //     $scope.downloadReport(params, 'reporteInstalacionResidencial', 'instalacion residencial');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteInstalacionEmpresarial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalacionemp").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstEmp)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_instalacionemp").val() == 'semana' && !$scope.weekDateObjectReport.instalacionemp) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('instalacionemp');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteCompletosEmpresarial(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.data) {
                                $scope.resultReporteIntalacionEmp = response.data.result.data.length;
                                $.each(response.data.result.data, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.ordenServicio ? elemento.ordenServicio : 'Sin informaci&oacute;n';
                                    row[1] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[2] = elemento.cotizacion ? elemento.cotizacion : 'Sin informaci&oacute;n';
                                    row[3] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
                                    row[4] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[5] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[6] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[7] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';

                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteInstEmpTable = $('#reporteInstEmpTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [7], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteInstalacionEmpresarial = function () {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-instalacionemp").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaInstEmp)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_instalacionemp").val() == 'semana' && !$scope.weekDateObjectReport.instalacionemp) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('instalacionemp');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte instalaciones empresarial",
                tipoExcel: 'reportesf-completadoempresarial-pi',
                headers: ["OS", "CUENTA", "COTIZACION", "CSP", "PLAZA", "CLUSTER INSTALACION", "FECHA ACTIVACION", "TIPO ORDEN"],
                valores: ["ordenServicio", "numeroCuenta", "cotizacion", "csp", "plaza", "clusterInstalacion", "fechaActivacion", "tipoOrden"]
            }
            $scope.downloadReport(params, 'reporteCompletadosInstalacionEmpresarial', 'instalacion empresarial');
            // if ($scope.resultReporteIntalacionEmp && $scope.resultReporteIntalacionEmp > 0) {
            //     $scope.downloadReport(params, 'reporteInstalacionEmpresarial', 'instalacion empresarial');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteCompletosProactivos = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_compleproact").val() == 'semana' && !$scope.weekDateObjectReport.compleproact) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('compleproact');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteCompletosProactivo(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteComplProact = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[3] = elemento.estatusOT ? elemento.estatusOT : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[5] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[6] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[7] = elemento.region ? elemento.region : 'Sin informaci&oacute;n';
                                    row[8] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[10] = elemento.tscompletado ? elemento.tscompletado : 'Sin informaci&oacute;n';
                                    row[11] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteCompletadoProactivoTable = $('#reporteCompletadoProactivoTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [11], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteCompletosProactivos = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_compleproact").val() == 'semana' && !$scope.weekDateObjectReport.compleproact) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('compleproact');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte completados proactivos",
                tipoExcel: 'reportesf-compleproact-pi',
                headers: ["CUENTA", "OS", "ID OT GIM", "ESTATUS OT", "ESTATUS", "CLUSTER", "DISTRITO SITIO", "REGION","CLUSTER COMERCIAL","PLAZA SITIO", "TS COMPLETADO", "PLAZA OPERACION"],
                valores: ["idCuentaBRM", "folio", "idOtGIM", "estatusOT", "estatus", "cluster", "distritoSitio", "region", "clusterComercial", "plazaSitio", "tscompletado", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteCompletadosProactivos', 'compleproact');
        }
    }
    
    $scope.consultarReporteCompletosCambioDomicilio = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_complecambdomic").val() == 'semana' && !$scope.weekDateObjectReport.complecambdomic) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('complecambdomic');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteCompletosCambioDomicilio(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteComplCambDomic = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];
                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n'
                                    row[2] = elemento.caseNumber ? elemento.caseNumber : 'Sin informaci&oacute;n';
                                    row[3] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[4] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    row[5] = elemento.tscompletado ? elemento.tscompletado : 'Sin informaci&oacute;n';
                                    row[6] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[7] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[8] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[9] = elemento.grupoCodificacion ? elemento.grupoCodificacion : 'Sin informaci&oacute;n';
                                    row[10] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[11] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[12] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[13] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[14] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[16] = elemento.repetido60 == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[17] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[18] = elemento.createdDate ? elemento.createdDate : 'Sin informaci&oacute;n';
                                    row[19] = elemento.closedDate ? elemento.closedDate : 'Sin informaci&oacute;n';
                                    row[20] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[21] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[22] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteCompletadoCambioDomicilioTable = $('#reporteCompletadoCambioDomicilioTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [22], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteCompletosCambioDomicilio = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_complecambdomic").val() == 'semana' && !$scope.weekDateObjectReport.complecambdomic) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('complecambdomic');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte completados cambio domicilio",
                tipoExcel: 'reportesf-complecambdomic-pi',
                headers: ["CUENTA", "OS", "TICKET", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "TS COMPLETADO", "FECHA ACTIVACION", "ESTATUS", "ESTADO", "GRUPO CODIFICACION", 
                "NIVEL 1", "NIVEL 2", "NIVEL 3", "CLUSTER INSTALACION", "REGION INSTALACION", "PLAZA", "REPETIDO", "DISTRITO SITIO", "FECHA/HORA APERTURA", "FECHA/HORA CIERRE",
                "SUBTIPO", "PLAZA SITIO", "PLAZA OPERACION"],
                valores: ["idCuentaBRM", "folio", "caseNumber", "primerFechaAgendamiento", "fechaAgendada", "tscompletado", "fechaActivacion", "estatus", "estado", "grupoCodificacion", 
                "nivel1", "nivel2", "nivel3", "clusterInstalacion", "regionInstalacion", "plaza", "repetido60", "distritoSitio", "createdDate", "closedDate",
                "subTipo", "plazaSitio", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteCompletadosCambioDomicilio', 'complecambdomic');
        }
    }

    $scope.consultarReporteCompletosSoporteEmpresarial = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_complesoportempr").val() == 'semana' && !$scope.weekDateObjectReport.complesoportempr) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('complesoportempr');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteCompletosSoporteEmpresarial(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteComplSoporteEmpr = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.caseNumber ? elemento.caseNumber : 'Sin informaci&oacute;n';
                                    row[3] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[6] = elemento.createdDate ? elemento.createdDate : 'Sin informaci&oacute;n';
                                    row[7] = elemento.closedDate ? elemento.closedDate : 'Sin informaci&oacute;n';
                                    row[8] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[9] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    row[10] = elemento.turnoAg ? elemento.turnoAg : 'Sin informaci&oacute;n';
                                    row[11] = elemento.tSCompletado ? elemento.tSCompletado : 'Sin informaci&oacute;n';
                                    row[12] = elemento.tSCancelado ? elemento.tSCancelado : 'Sin informaci&oacute;n';
                                    row[13] = elemento.lastModifiedDate ? elemento.lastModifiedDate : 'Sin informaci&oacute;n';
                                    row[14] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[15] = elemento.distrito ? elemento.distrito : 'Sin informaci&oacute;n';
                                    row[16] = elemento.calle ? elemento.calle : 'Sin informaci&oacute;n';
                                    row[17] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[18] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[19] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[20] = elemento.latitud ? elemento.latitud : 'Sin informaci&oacute;n';
                                    row[21] = elemento.longitud ? elemento.longitud : 'Sin informaci&oacute;n';
                                    row[22] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[23] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[24] = elemento.nuevoSegmento ? elemento.nuevoSegmento : 'Sin informaci&oacute;n';
                                    row[25] = elemento.repetido60 === "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteCompletadoSoporteEmpresarialTable = $('#reporteCompletadoSoporteEmpresarialTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [25], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteCompletosSoporteEmpresarial = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_complesoportempr").val() == 'semana' && !$scope.weekDateObjectReport.complesoportempr) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('complesoportempr');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte completados soporte empresarial",
                tipoExcel: 'reportesf-complesoportempr-pi',
                headers: ["CUENTA", "OS", "TICKET", "ID OT GIM", "ESTADO", "ESTATUS", "FECHA/HORA APERTURA", "FECHA/HORA CIERRE", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "TURNO AGENDAMIENTO",
                "TS COMPLETADO", "TS CANCELADO", "FECHA ULTIMA MODIFICACION", "CLUSTER", "DISTRITO", "CALLE", "NIVEL 1", "NIVEL 2", "NIVEL 3", "LATITUD", "LONGITUD", "TIPO ORDEN", "SUBTIPO", "NUEVO SEGMENTO", "REPETIDA"],
                valores: ["numeroCuenta", "folio", "caseNumber", "idOtGIM", "estado", "estatus", "createdDate", "closedDate", "primerFechaAgendamiento", "fechaAgendada", "turnoAg",
                "tSCompletado", "tSCancelado", "lastModifiedDate", "cluster", "distrito", "calle", "nivel1", "nivel2", "nivel3", "latitud", "longitud", "tipoOrden", "subTipo", "nuevoSegmento", "repetido60"]
            }
            $scope.downloadReport(params, 'reporteCompletadosSoporteEmpresarial', 'complesoportempr');
        }
    }

    $scope.consultarReporteSitiosFibrados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        // let clustersparam = $("#jstree-proton-sitiosfibr").jstree("get_selected", true)
        //     .filter(e => e.original.nivel == $scope.nfiltrogeografiaSitFibr)
        //     .map(e => e.original.nombre);

        // if (clustersparam.length === 0) {
        //     mensaje += '<li>Seleccione geograf&iacute;a.</li>';
        //     isValid = false
        // }

        if ($("#tipo_reporte_sitiosfibr").val() == 'semana' && !$scope.weekDateObjectReport.sitiosfibr) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('sitiosfibr');
            let params = {
                // tiposOrden: [55, 91, 93],
                // clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteSitiosFibrados(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteSitiosFibr = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.numeroTicket ? elemento.numeroTicket : 'Sin informaci&oacute;n';
                                    row[2] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[3] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[4] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[5] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[6] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteSitiosFibrados = $('#reporteSitiosFibrados').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [6], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteSitiosFibrados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        // let clustersparam = $("#jstree-proton-sitiosfibr").jstree("get_selected", true)
        //     .filter(e => e.original.nivel == $scope.nfiltrogeografiaSitFibr)
        //     .map(e => e.original.nombre);

        // if (clustersparam.length === 0) {
        //     mensaje += '<li>Seleccione geograf&iacute;a.</li>';
        //     isValid = false
        // }

        if ($("#tipo_reporte_sitiosfibr").val() == 'semana' && !$scope.weekDateObjectReport.sitiosfibr) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('sitiosfibr');
            let params = {
                // tiposOrden: [55, 91, 93],
                // clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte tickets sitios fibrados",
                tipoExcel: 'reportesf-sitiosfibrados-pi',
                headers: ["CUENTA", "TICKET", "FECHA APERTURA", "CLUSTER", "NIVEL 1", "NIVEL 2", "NIVEL 3"],
                valores: ["idCuentaBRM", "numeroTicket", "fechaApertura", "clusterInstalacion", "nivel1", "nivel2", "nivel3"]
            }
            $scope.downloadReport(params, 'reporteTicketsSitiosFibrados', 'sitios fibrados');
            // if ($scope.resultReporteSitiosFibr && $scope.resultReporteSitiosFibr > 0) {
            //     $scope.downloadReport(params, 'reporteSitiosFibrados', 'sitios fibrados');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteRedesSociales = function() {
        let mensaje = '<ul>';
        let isValid = true;

        // let clustersparam = $("#jstree-proton-redessoc").jstree("get_selected", true)
        //     .filter(e => e.original.nivel == $scope.nfiltrogeografiaRedSoc)
        //     .map(e => e.original.nombre);

        // if (clustersparam.length === 0) {
        //     mensaje += '<li>Seleccione geograf&iacute;a.</li>';
        //     isValid = false
        // }

        if ($("#tipo_reporte_redessoc").val() == 'semana' && !$scope.weekDateObjectReport.redessoc) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('redessoc');
            let params = {
                // tiposOrden: [55, 91, 93],
                // clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteRedesSociales(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteRedesSoc = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBrm ? elemento.idCuentaBrm : 'Sin informaci&oacute;n';
                                    row[1] = elemento.numeroTicket ? elemento.numeroTicket : 'Sin informaci&oacute;n';
                                    row[2] = elemento.origenTicket ? elemento.origenTicket : 'Sin informaci&oacute;n';
                                    row[3] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[4] = elemento.fechaCierre ? elemento.fechaCierre : 'Sin informaci&oacute;n';
                                    row[5] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[6] = elemento.creaOs == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[7] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[8] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[9] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[10] = elemento.asunto ? elemento.asunto : 'Sin informaci&oacute;n';
                                    row[11] = elemento.grupoCodificacion ? elemento.grupoCodificacion : 'Sin informaci&oacute;n';
                                    row[12] = elemento.descripcion ? elemento.descripcion : 'Sin informaci&oacute;n';
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteRedesSociales = $('#reporteRedesSociales').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [12], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteRedesSociales = function() {
        let mensaje = '<ul>';
        let isValid = true;

        let clustersparam = $("#jstree-proton-redessoc").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaRedSoc)
            .map(e => e.original.nombre);

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValid = false
        }

        if ($("#tipo_reporte_redessoc").val() == 'semana' && !$scope.weekDateObjectReport.redessoc) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('redessoc');
            let params = {
                tiposOrden: [55, 91, 93],
                clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte tickets redes sociales",
                tipoExcel: 'reportesf-redessociales-pi',
                headers: ["CUENTA", "TICKET", "ORIGEN TICKET", "FECHA APERTURA", "FECHA CIERRE", "CLUSTER INSTALACION", "CREA OS", "NIVEL 1", "NIVEL 2", "NIVEL 3", "ASUNTO", "GRUPO", "DESCRIPCION"],
                valores: ["idCuentaBrm", "numeroTicket", "origenTicket", "fechaApertura", "fechaCierre", "clusterInstalacion", "creaOs", "nivel1", "nivel2", "nivel3", "asunto", "grupoCodificacion", "descripcion"]
            }
            $scope.downloadReport(params, 'reporteTicketsRedesSociales', 'redes sociales');
            // if ($scope.resultReporteRedesSoc && $scope.resultReporteRedesSoc > 0) {
            //     $scope.downloadReport(params, 'reporteRedesSociales', 'redes sociales');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteGenerados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        // let clustersparam = $("#jstree-proton-generados").jstree("get_selected", true)
        //     .filter(e => e.original.nivel == $scope.nfiltrogeografiaGenerados)
        //     .map(e => e.original.nombre);

        // if (clustersparam.length === 0) {
        //     mensaje += '<li>Seleccione geograf&iacute;a.</li>';
        //     isValid = false
        // }

        if ($("#tipo_reporte_generados").val() == 'semana' && !$scope.weekDateObjectReport.generados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('generados');
            let params = {
                // tiposOrden: [55, 91, 93],
                // clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteGenerados(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteGenerados = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];
                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroTicket ? elemento.numeroTicket : 'Sin informaci&oacute;n';
                                    row[3] = elemento.primerfechaAgendada ? elemento.primerfechaAgendada : 'Sin informaci&oacute;n';
                                    row[4] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    row[5] = elemento.tscompletado ? elemento.tscompletado : 'Sin informaci&oacute;n';
                                    row[6] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[7] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[8] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[9] = elemento.grupoCodificacion ? elemento.grupoCodificacion : 'Sin informaci&oacute;n';
                                    row[10] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[11] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[12] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[13] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[14] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[16] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[17] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[18] = elemento.fechaCierre ? elemento.fechaCierre : 'Sin informaci&oacute;n';
                                    row[19] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[20] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[21] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[22] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[23] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteGenerados = $('#reporteGeneradoss').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [23], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteGenerados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        // let clustersparam = $("#jstree-proton-generados").jstree("get_selected", true)
        //     .filter(e => e.original.nivel == $scope.nfiltrogeografiaGenerados)
        //     .map(e => e.original.nombre);

        // if (clustersparam.length === 0) {
        //     mensaje += '<li>Seleccione geograf&iacute;a.</li>';
        //     isValid = false
        // }

        if ($("#tipo_reporte_generados").val() == 'semana' && !$scope.weekDateObjectReport.generados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('generados');
            let params = {
                // tiposOrden: [55, 91, 93],
                // clusters: clustersparam,
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte factibilidad generados",
                tipoExcel: 'reportesf-generados-pi',
                headers: ["CUENTA", "OS", "TICKET", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "TS COMPLETADO", "FECHA ACTIVACION", "ESTATUS", "ESTADO", "GRUPO CODIFICACION", 
                "NIVEL 1", "NIVEL 2", "NIVEL 3", "CLUSTER INSTALACION","REGION INSTALACION", "PLAZA", "REPETIDO", "DISTRITO SITIO", "FECHA CIERRE", "SUBTIPO", "CLUSTER COMERCIAL", "PLAZA SITIO", "FECHA APERTURA", "PLAZA OPERACION"],
                valores: ["numeroCuenta", "folio", "numeroTicket", "primerfechaAgendada", "fechaAgendada", "tscompletado", "fechaActivacion", "estatus", "estado", "grupoCodificacion", 
                "nivel1", "nivel2", "nivel3", "clusterInstalacion", "regionInstalacion", "plaza", "repetido", "distritoSitio", "fechaCierre", "subTipo", "clusterComercial", "plazaSitio", "fechaApertura", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteFactibilidadGenerados', 'generados');
            // if ($scope.resultReporteGenerados && $scope.resultReporteGenerados > 0) {
            //     $scope.downloadReport(params, 'reporteGenerados', 'generados');
            // } else {
            //     toastr.info('No se encontraron datos para la descarga');
            // }
        }
    }

    $scope.consultarReporteFactibilidadCerrados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_factibilcerrados").val() == 'semana' && !$scope.weekDateObjectReport.factibilcerrados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('factibilcerrados');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteFactibilidadCerrados(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteFactibilCerrados = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[3] = elemento.estatusOt ? elemento.estatusOt : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[5] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[6] = elemento.distrito ? elemento.distrito : 'Sin informaci&oacute;n';
                                    row[7] = elemento.region ? elemento.region : 'Sin informaci&oacute;n';
                                    row[8] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[10] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.tsCompletado ? elemento.tsCompletado : 'Sin informaci&oacute;n';
                                    row[12] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteFactibilidadCerradosTable = $('#reporteFactibilidadCerradosTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [12], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteFactibilidadCerrados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_factibilcerrados").val() == 'semana' && !$scope.weekDateObjectReport.factibilcerrados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('factibilcerrados');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte factibilidad cerrados",
                tipoExcel: 'reportesf-factibilcerrados-pi',
                headers: ["CUENTA", "OS", "ID OT GIM", "ESTATUS OT", "ESTATUS", "CLUSTER", "DISTRITO SITIO", "REGION","CLUSTER COMERCIAL","PLAZA", "PLAZA SITIO", "TS COMPLETADO", "PLAZA OPERACION"],
                valores: ["numeroCuenta", "folio", "idOtGIM", "estatusOt", "estatus", "cluster", "distrito", "region", "clusterComercial", "plaza", "plazaSitio", "tsCompletado", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteFactibilidadCerrados', 'factibilcerrados');
        }
    }

    $scope.consultarReporteFactibilidadCancelados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_factibilcancelados").val() == 'semana' && !$scope.weekDateObjectReport.factibilcancelados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('factibilcancelados');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteFactibilidadCancelados(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteFactibilCancelados = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[3] = elemento.estatusOt ? elemento.estatusOt : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[5] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[6] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[7] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[8] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[9] = elemento.region ? elemento.region : 'Sin informaci&oacute;n';
                                    row[10] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[11] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[12] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    row[13] = elemento.tsCancelado ? elemento.tsCancelado : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteFactibilidadCanceladosTable = $('#reporteFactibilidadCanceladosTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [13], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteFactibilidadCancelados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_factibilcancelados").val() == 'semana' && !$scope.weekDateObjectReport.factibilcancelados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('factibilcancelados');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte factibilidad cancelados",
                tipoExcel: 'reportesf-factibilcancelados-pi',
                headers: ["CUENTA", "OS", "ID OT GIM", "ESTATUS OT", "ESTATUS", "PLAZA SITIO", "TIPO ORDEN", "CLUSTER","DISTRITO SITIO","REGION", "CLUSTER COMERCIAL", "PLAZA", "PLAZA OPERACION", "TS CANCELADO"],
                valores: ["numeroCuenta", "folio", "idOtGIM", "estatusOt", "estatus", "plazaSitio", "tipoOrden", "cluster", "distritoSitio", "region", "clusterComercial", "plaza", "plazaOperacion", "tsCancelado"]
            }
            $scope.downloadReport(params, 'reporteFactibilidadCancelados', 'factibilcancelados');
        }
    }

    $scope.consultarReportePlanningAgenda = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningagenda").val() == 'semana' && !$scope.weekDateObjectReport.planningagenda) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningagenda');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReportePlanningAgendas(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReportePlanningAgendas = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.estatusOT ? elemento.estatusOT : 'Sin informaci&oacute;n';
                                    row[3] = elemento.region ? elemento.region : 'Sin informaci&oacute;n';
                                    row[4] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[5] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[6] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[7] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[8] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    row[9] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[10] = elemento.fechaHoraCreacion ? elemento.fechaHoraCreacion : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reportePlanningAgendaTable = $('#reportePlanningAgendaTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [11], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReportePlanningAgenda = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningagenda").val() == 'semana' && !$scope.weekDateObjectReport.planningagenda) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningagenda');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte planning agenda",
                tipoExcel: 'reportesf-planningagenda-pi',
                headers: ["CUENTA", "OS", "ESTATUS OT", "REGION", "DISTRITO", "CLUSTER", "ESTATUS", "PLAZA SITIO","PLAZA OPERACION","FECHA CREACION", "FECHA HORA CREACION", "FECHA AGENDADA"],
                valores: ["idCuentaBRM", "folio", "estatusOT", "region", "distritoSitio", "cluster", "estatus", "plazaSitio", "plazaOperacion", "fechaCreacion", "fechaHoraCreacion", "fechaAgendada"]
            }
            $scope.downloadReport(params, 'reportePlanningAgenda', 'planningagenda');
        }
    }

    $scope.consultarReportePlanningAddon = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningaddon").val() == 'semana' && !$scope.weekDateObjectReport.planningaddon) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningaddon');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReportePlanningAddon(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReportePlanningAddon = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];
                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.caseNumber ? elemento.caseNumber : 'Sin informaci&oacute;n';
                                    row[3] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[6] = elemento.turnoAg ? elemento.turnoAg : 'Sin informaci&oacute;n';
                                    row[7] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[10] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[11] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[12] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[13] = elemento.plazaOrden ? elemento.plazaOrden : 'Sin informaci&oacute;n';
                                    row[14] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.createdDate ? elemento.createdDate : 'Sin informaci&oacute;n';
                                    row[16] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[17] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    row[18] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[19] = elemento.funcionPropietario ? elemento.funcionPropietario : 'Sin informaci&oacute;n';
                                    row[20] = elemento.grupoCodificacion ? elemento.grupoCodificacion : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[23] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[24] = elemento.empleadoPropietario ? elemento.empleadoPropietario : 'Sin informaci&oacute;n';
                                    arraRow.push(row);
                                })
                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reportePlanningAddonTable = $('#reportePlanningAddonTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [24], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReportePlanningAddon = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningaddon").val() == 'semana' && !$scope.weekDateObjectReport.planningaddon) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningaddon');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte planning addon",
                tipoExcel: 'reportesf-planningaddon-pi',
                headers: ["CUENTA", "OS", "TICKET", "OT GIM", "ESTATUS", "ESTADO", "TURNO", "REGION INSTALACION","CLUSTER INSTALACION","PLAZA", "ZONA", "COLONIA", "DISTRITO SITIO", "PLAZA ORDEN", "PLAZA OPERACION", 
                "FECHA CREACION", "FECHA PRIMER AGENDAMIENTO", "FECHA AGENDADA", "FECHA ACTIVACION", "FUNCION PROPIETARIO", "GRUPO CODIFICACION", "NIVEL 1", "NIVEL 2", "NIVEL 3", "EMPLEADO PROPIETARIO"],
                valores: ["idCuentaBRM", "folio", "caseNumber", "idOtGIM", "estado", "estatus", "turnoAg", "regionInstalacion", "clusterInstalacion", "plaza", "zona", "colonia", "distritoSitio", "plazaOrden", "plazaOperacion",
                "createdDate", "primerFechaAgendamiento", "fechaAgendada", "fechaActivacion", "funcionPropietario", "grupoCodificacion", "nivel1", "nivel2", "nivel3", "empleadoPropietario"]
            }
            $scope.downloadReport(params, 'reportePlanningAddon', 'planningaddon');
        }
    }

    $scope.consultarReportePlanningNuevoAddon = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningnuevosaddon").val() == 'semana' && !$scope.weekDateObjectReport.planningnuevosaddon) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningnuevosaddon');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReportePlanningNuevoAddon(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReportePlanningNuevosAddon = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.name ? elemento.name : 'Sin informaci&oacute;n';
                                    row[2] = elemento.caseNumber ? elemento.caseNumber : 'Sin informaci&oacute;n';
                                    row[3] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[4] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[5] = elemento.tSCompletado ? elemento.tSCompletado : 'Sin informaci&oacute;n';
                                    row[6] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[7] = elemento.estatusOS ? elemento.estatusOS : 'Sin informaci&oacute;n';
                                    row[8] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[9] = elemento.grupo ? elemento.grupo : 'Sin informaci&oacute;n';
                                    row[10] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[11] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[12] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[13] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[14] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[16] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[17] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[18] = elemento.createdDate ? elemento.createdDate : 'Sin informaci&oacute;n';
                                    row[19] = elemento.closedDate ? elemento.closedDate : 'Sin informaci&oacute;n';
                                    row[20] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[21] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[22] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[23] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reportePlanningNuevosAddonTable = $('#reportePlanningNuevosAddonTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [23], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReportePlanningNuevoAddon = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningnuevosaddon").val() == 'semana' && !$scope.weekDateObjectReport.planningnuevosaddon) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningnuevosaddon');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte planning nuevos addon",
                tipoExcel: 'reportesf-planningnuevosaddon-pi',
                headers: ["CUENTA", "OS", "TICKET", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "TS COMPLETADO", "FECHA ACTIVACION", "ESTATUS","ESTADO",
                "GRUPO CODIFICACION", "NIVEL 1", "NIVEL 2", "NIVEL 3", "CLUSTER INSTALACION", "REGION INSTALACION", "PLAZA", "REPETIDO", "DISTRITO SITIO", 
                "FECHA/HORA APERTURA", "FECHA/HORA CIERRE", "SUBTIPO", "CLUSTER COMERCIAL", "PLAZA SITIO", "PLAZA OPERACION"],
                valores: ["idCuentaBRM", "name", "caseNumber", "primerFechaAgendamiento", "fechaAgendamiento", "tSCompletado", "fechaActivacion", "estatusOS", "estado", "grupo", 
                "nivel1", "nivel2", "nivel3", "clusterInstalacion", "regionInstalacion", "plaza", "repetido", "distritoSitio", "createdDate", "closedDate", "subTipo",
                "clusterComercial", "plazaSitio", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reportePlanningNuevosAddon', 'planningnuevosaddon');
        }
    }

    $scope.consultarReportePlanningCompletosOrdenes = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningcompleord").val() == 'semana' && !$scope.weekDateObjectReport.planningcompleord) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningcompleord');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReportePlanningCompletosOrdenes(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReportePlanningCompletosOrdenes = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[3] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatusOT ? elemento.estatusOT : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[6] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[7] = elemento.distrito ? elemento.distrito : 'Sin informaci&oacute;n';
                                    row[8] = elemento.canalDeVenta ? elemento.canalDeVenta : 'Sin informaci&oacute;n';
                                    row[9] = elemento.region ? elemento.region : 'Sin informaci&oacute;n';
                                    row[10] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[12] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[13] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    row[14] = elemento.tscompletado ? elemento.tscompletado : 'Sin informaci&oacute;n';
                                    row[15] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reportePlanningCompletosOrdenesTable = $('#reportePlanningCompletosOrdenesTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [15], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReportePlanningCompletosOrdenes = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningcompleord").val() == 'semana' && !$scope.weekDateObjectReport.planningcompleord) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningcompleord');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte planning completos ordenes",
                tipoExcel: 'reportesf-planningcompleord-pi',
                headers: ["CUENTA", "OS", "FECHA CREACION", "ID OT GIM", "ESTATUS OT", "ESTATUS", "CLUSTER", "DISTRITO SITIO", "CANAL VENTA", "REGION", "PLAZA SITIO", "CLUSTER COMERCIAL", "SUBTIPO", "PLAZA OPERACION", "TS COMPLETADO", "TIPO ORDEN"],
                valores: ["numeroCuenta", "folio", "fechaCreacion", "idOtGIM", "estatusOT", "estatus", "cluster", "distrito", "canalDeVenta", "region", "plazaSitio", "clusterComercial", "subTipo", "plazaOperacion", "tscompletado", "tipoOrden"]
            }
            $scope.downloadReport(params, 'reportePlanningCompletosOrdenes', 'planningcompleord');
        }
    }

    $scope.consultarReportePlanningCompletosAddon = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningcompaddon").val() == 'semana' && !$scope.weekDateObjectReport.planningcompaddon) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningcompaddon');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReportePlanningCompletosAddon(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReportePlanningCompletosAddon = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[3] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatusOT ? elemento.estatusOT : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[6] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[7] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[8] = elemento.region ? elemento.region : 'Sin informaci&oacute;n';
                                    row[9] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[10] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    row[11] = elemento.tscompletado ? elemento.tscompletado : 'Sin informaci&oacute;n';
                                    row[12] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reportePlanningCompletadosAddonTable = $('#reportePlanningCompletadosAddonTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [12], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReportePlanningCompletosAddon = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_planningcompaddon").val() == 'semana' && !$scope.weekDateObjectReport.planningcompaddon) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('planningcompaddon');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte planning completos addon",
                tipoExcel: 'reportesf-planningcompaddon-pi',
                headers: ["CUENTA", "OS", "PLAZA SITIO", "ID OT GIM", "ESTATUS OT", "ESTATUS", "CLUSTER", "DISTRITO SITIO", "REGION", "CLUSTER COMERCIAL", "PLAZA OPERACION", "TS COMPLETADO", "TIPO ORDEN"],
                valores: ["numeroCuenta", "folio", "plazaSitio", "idOtGIM", "estatusOT", "estatus", "cluster", "distritoSitio", "region", "clusterComercial", "plazaOperacion", "tscompletado", "tipoOrden"]
            }
            $scope.downloadReport(params, 'reportePlanningCompletosAddon', 'planningcompaddon');
        }
    }



    // ---------------------------------

    $scope.consultarReporteRecoleccionGeneradas = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_recolecgenerados").val() == 'semana' && !$scope.weekDateObjectReport.recolecgenerados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('recolecgenerados');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteRecoleccionGeneradas(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteRecolecGeneradas = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroTicket ? elemento.numeroTicket : 'Sin informaci&oacute;n';
                                    row[3] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[4] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[5] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[6] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[7] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[8] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[9] = elemento.grupoCodificacion ? elemento.grupoCodificacion : 'Sin informaci&oacute;n';
                                    row[10] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[11] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[12] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[13] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[14] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[16] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[17] = elemento.fechaCierre ? elemento.fechaCierre : 'Sin informaci&oacute;n';
                                    row[18] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[19] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[20] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[21] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[22] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteRecoleccionGeneradosTable = $('#reporteRecoleccionGeneradosTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [22], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteRecoleccionGenerados = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_recolecgenerados").val() == 'semana' && !$scope.weekDateObjectReport.recolecgenerados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('recolecgenerados');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte recoleccion generados",
                tipoExcel: 'reportesf-recolecgenerados-pi',
                headers: ["CUENTA", "OS", "TICKET", "PLAZA", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", "FECHA ACTIVACION", "ESTATUS", "ESTADO", "GRUPO CODIFICACION", "NIVEL 1", "NIVEL 2", "NIVEL 3",
                "CLUSTER INSTALACION", "REGION INSTALACION", "REPETIDO", "DISTRITO SITIO", "FECHA/HORA CIERRE", "SUBTIPO", "CLUSTER COMERCIAL", "PLAZA SITIO", "FECHA/HORA APERTURA", "PLAZA OPERACION"],
                valores: ["numeroCuenta", "folio", "numeroTicket", "plaza", "primerFechaAgendamiento", "fechaAgendamiento", "fechaActivacion", "estatus", "estado", "grupoCodificacion", "nivel1", "nivel2", "nivel3",
                "clusterInstalacion", "regionInstalacion", "repetido", "distritoSitio", "fechaCierre", "subTipo", "clusterComercial", "plazaSitio", "fechaApertura", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteRecoleccionGenerados', 'recolecgenerados');
        }
    }

    $scope.consultarReporteRecoleccionCerradas = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_recoleccerrados").val() == 'semana' && !$scope.weekDateObjectReport.recoleccerrados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('recoleccerrados');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteRecoleccionCerradas(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteRecolecCerradas = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[3] = elemento.estatusOt ? elemento.estatusOt : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[5] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[6] = elemento.distrito ? elemento.distrito : 'Sin informaci&oacute;n';
                                    row[7] = elemento.region ? elemento.region : 'Sin informaci&oacute;n';
                                    row[8] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[9] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[10] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[11] = elemento.tsCompletado ? elemento.tsCompletado : 'Sin informaci&oacute;n';
                                    row[12] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteRecoleccionCerradosTable = $('#reporteRecoleccionCerradosTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [12], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteRecoleccionCerradas = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_recoleccerrados").val() == 'semana' && !$scope.weekDateObjectReport.recoleccerrados) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('recoleccerrados');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte recoleccion cerrados",
                tipoExcel: 'reportesf-recoleccerrados-pi',
                headers: ["CUENTA", "OS", "ID OT GIM", "ESTATUS OT", "ESTATUS", "CLUSTER", "DISTRITO", "REGION", "CLUSTER COMERCIAL", "PLAZA", "PLAZA SITIO", "TS COMPLETADO", "PLAZA OPERACION"],
                valores: ["numeroCuenta", "folio", "idOtGIM", "estatusOt", "estatus", "cluster", "distrito", "region", "clusterComercial", "plaza", "plazaSitio", "tsCompletado", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteRecoleccionCerrados', 'recoleccerrados');
        }
    }

    $scope.consultarReporteRecoleccionAgendadas = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_recolecagendadas").val() == 'semana' && !$scope.weekDateObjectReport.recolecagendadas) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('recolecagendadas');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteRecoleccionAgendadas(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteRecolecAgendadas = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroTicket ? elemento.numeroTicket : 'Sin informaci&oacute;n';
                                    row[3] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[6] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[7] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[8] = elemento.nombreCompleto ? elemento.nombreCompleto : 'Sin informaci&oacute;n';
                                    row[9] = elemento.turnoAgendamiento ? elemento.turnoAgendamiento : 'Sin informaci&oacute;n';
                                    row[10] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[11] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[12] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[13] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[15] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[17] = elemento.funcionPropietario ? elemento.funcionPropietario : 'Sin informaci&oacute;n';
                                    row[18] = elemento.grupoCodificacion ? elemento.grupoCodificacion : 'Sin informaci&oacute;n';
                                    row[19] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[23] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[24] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[25] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[26] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[27] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteRecoleccionAgendadasTable = $('#reporteRecoleccionAgendadasTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [27], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteRecoleccionAgendadas = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_recolecagendadas").val() == 'semana' && !$scope.weekDateObjectReport.recolecagendadas) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('recolecagendadas');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte recoleccion agendadas",
                tipoExcel: 'reportesf-recolecagendadas-pi',
                headers: ["CUENTA", "OS", "TICKET", "ID OT GIM", "ESTATUS", "ESTADO", "PLAZA", "ZONA", "PROPIETARIO TICKET", "TURNO AGENDAMIENTO", "CLUSTER INSTALACION", "COLONIA", "FECHA/HORA APERTURA", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", 
                "FECHA ACTIVACION", "REGION INSTALACION", "PROPIETARIO", "GRUPO CODIFICACION", "NIVEL 1", "NIVEL 2", "NIVEL 3", "REPETIDO", "DISTRITO SITIO", "SUBTIPO", "CLUSTER COMERCIAL", "PLAZA SITIO", "PLAZA OPERACION"],
                valores: ["numeroCuenta", "folio", "numeroTicket", "idOtGIM", "estatus", "estado", "plaza", "zona", "nombreCompleto", "turnoAgendamiento", "clusterInstalacion", "colonia", "fechaApertura", "primerFechaAgendamiento", "fechaAgendamiento",
                "fechaActivacion", "regionInstalacion", "funcionPropietario", "grupoCodificacion", "nivel1", "nivel2", "nivel3", "repetido", "distritoSitio", "subTipo", "clusterComercial", "plazaSitio", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteRecoleccionAgendas', 'recolecagendadas');
        }
    }
    // --

    $scope.consultarReporteBackLogFactibilidades = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_backlogfactib").val() == 'semana' && !$scope.weekDateObjectReport.backlogfactib) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('backlogfactib');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBackLogFactibilidades(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteBackLogFactibilidades = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroTicket ? elemento.numeroTicket : 'Sin informaci&oacute;n';
                                    row[3] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[6] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[7] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[8] = elemento.nombreCompleto ? elemento.nombreCompleto : 'Sin informaci&oacute;n';
                                    row[9] = elemento.turnoAgendamiento ? elemento.turnoAgendamiento : 'Sin informaci&oacute;n';
                                    row[10] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[11] = elemento.colonia ? elemento.colonia : 'Sin informaci&oacute;n';
                                    row[12] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[13] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[15] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[17] = elemento.funcionPropietario ? elemento.funcionPropietario : 'Sin informaci&oacute;n';
                                    row[18] = elemento.grupoCodificacion ? elemento.grupoCodificacion : 'Sin informaci&oacute;n';
                                    row[19] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[22] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[23] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[24] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[25] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[26] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteBackLogFactibilidadTable = $('#reporteBackLogFactibilidadTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [26], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteBackLogFactibilidades = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_backlogfactib").val() == 'semana' && !$scope.weekDateObjectReport.backlogfactib) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('backlogfactib');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte backlog factibilidad",
                tipoExcel: 'reportesf-backlogfactib-pi',
                headers: ["CUENTA", "OS", "TICKET", "ID OT GIM", "ESTATUS", "ESTADO", "PLAZA", "ZONA", "PROPIETARIO TICKET", "TURNO AGENDAMIENTO", "CLUSTER INSTALACION", "COLONIA", "FECHA/HORA APERTURA", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", 
                "FECHA ACTIVACION", "REGION INSTALACION", "PROPIETARIO", "GRUPO CODIFICACION", "NIVEL 1", "NIVEL 2", "NIVEL 3", "REPETIDO", "DISTRITO SITIO", "SUBTIPO", "PLAZA SITIO", "PLAZA OPERACION"],
                valores: ["numeroCuenta", "folio", "numeroTicket", "idOtGIM", "estatus", "estado", "plaza", "zona", "nombreCompleto", "turnoAgendamiento", "clusterInstalacion", "colonia", "fechaApertura", "primerFechaAgendamiento", "fechaAgendamiento",
                "fechaActivacion", "regionInstalacion", "funcionPropietario", "grupoCodificacion", "nivel1", "nivel2", "nivel3", "repetido", "distritoSitio", "subTipo", "plazaSitio", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteBackLogFactibilidad', 'backlogfactib');
        }
    }

    $scope.consultarReporteBackLogVoluntarias = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_backlogvolun").val() == 'semana' && !$scope.weekDateObjectReport.backlogvolun) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('backlogvolun');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteBackLogVoluntarias(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteBackLogVoluntarias = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.numeroCuenta ? elemento.numeroCuenta : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.numeroTicket ? elemento.numeroTicket : 'Sin informaci&oacute;n';
                                    row[3] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[4] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
                                    row[6] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[7] = elemento.zona ? elemento.zona : 'Sin informaci&oacute;n';
                                    row[8] = elemento.nombreCompleto ? elemento.nombreCompleto : 'Sin informaci&oacute;n';
                                    row[9] = elemento.turnoAgendamiento ? elemento.turnoAgendamiento : 'Sin informaci&oacute;n';
                                    row[10] = elemento.clusterInstalacion ? elemento.clusterInstalacion : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaApertura ? elemento.fechaApertura : 'Sin informaci&oacute;n';
                                    row[12] = elemento.primerFechaAgendamiento ? elemento.primerFechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[13] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[14] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[15] = elemento.regionInstalacion ? elemento.regionInstalacion : 'Sin informaci&oacute;n';
                                    row[16] = elemento.funcionPropietario ? elemento.funcionPropietario : 'Sin informaci&oacute;n';
                                    row[17] = elemento.grupoCodificacion ? elemento.grupoCodificacion : 'Sin informaci&oacute;n';
                                    row[18] = elemento.nivel1 ? elemento.nivel1 : 'Sin informaci&oacute;n';
                                    row[19] = elemento.nivel2 ? elemento.nivel2 : 'Sin informaci&oacute;n';
                                    row[20] = elemento.nivel3 ? elemento.nivel3 : 'Sin informaci&oacute;n';
                                    row[21] = elemento.repetido == "true" ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" disabled>';
                                    row[22] = elemento.distritoSitio ? elemento.distritoSitio : 'Sin informaci&oacute;n';
                                    row[23] = elemento.subTipo ? elemento.subTipo : 'Sin informaci&oacute;n';
                                    row[24] = elemento.distrito ? elemento.distrito : 'Sin informaci&oacute;n';
                                    row[25] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[26] = elemento.plazaSitio ? elemento.plazaSitio : 'Sin informaci&oacute;n';
                                    row[27] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[28] = elemento.plazaOperacion ? elemento.plazaOperacion : 'Sin informaci&oacute;n';
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteBackLogVoluntariosTable = $('#reporteBackLogVoluntariosTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [28], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteBackLogVoluntarias = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_backlogvolun").val() == 'semana' && !$scope.weekDateObjectReport.backlogvolun) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('backlogvolun');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte backlog voluntarias",
                tipoExcel: 'reportesf-backlogvolun-pi',
                headers: ["CUENTA", "OS", "TICKET", "ID OT GIM", "ESTATUS", "ESTADO", "PLAZA", "ZONA", "PROPIETARIO TICKET", "TURNO AGENDAMIENTO", "CLUSTER INSTALACION", "FECHA/HORA APERTURA", "PRIMER FECHA AGENDAMIENTO", "FECHA AGENDAMIENTO", 
                "FECHA ACTIVACION", "REGION INSTALACION", "PROPIETARIO", "GRUPO CODIFICACION", "NIVEL 1", "NIVEL 2", "NIVEL 3", "REPETIDO", "DISTRITO SITIO", "SUBTIPO", "DISTRITO", "CLUSTER COMERCIAL", "PLAZA SITIO", "TIPO ORDEN", "PLAZA OPERACION"],
                valores: ["numeroCuenta", "folio", "numeroTicket", "idOtGIM", "estatus", "estado", "plaza", "zona", "nombreCompleto", "turnoAgendamiento", "clusterInstalacion", "fechaApertura", "primerFechaAgendamiento", "fechaAgendamiento",
                "fechaActivacion", "regionInstalacion", "funcionPropietario", "grupoCodificacion", "nivel1", "nivel2", "nivel3", "repetido", "distritoSitio", "subTipo", "distrito", "clusterComercial", "plazaSitio", "tipoOrden", "plazaOperacion"]
            }
            $scope.downloadReport(params, 'reporteBackLogVoluntarias', 'backlogvolun');
        }
    }

    // ----------------------------------------

    $scope.consultarReporteVentasInstalacion = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_ventasinstalacion").val() == 'semana' && !$scope.weekDateObjectReport.ventasinstalacion) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasinstalacion');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteVentasInstalacion(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteVentasInstalacion = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.closeDate ? elemento.closeDate : 'Sin informaci&oacute;n';
                                    row[3] = elemento.leadSource ? elemento.leadSource : 'Sin informaci&oacute;n';
                                    row[4] = elemento.canal ? elemento.canal : 'Sin informaci&oacute;n';
                                    row[5] = elemento.subCanal ? elemento.subCanal : 'Sin informaci&oacute;n';
                                    row[6] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[7] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[8] = elemento.empleado ? elemento.empleado : 'Sin informaci&oacute;n';
                                    row[9] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[10] = elemento.motivoCancelacion ? elemento.motivoCancelacion : 'Sin informaci&oacute;n';
                                    row[11] = elemento.fechaAgendada ? elemento.fechaAgendada : 'Sin informaci&oacute;n';
                                    row[12] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[13] = elemento.familiaId ? elemento.familiaId : 'Sin informaci&oacute;n';
                                    row[14] = elemento.dpplan ? elemento.dpplan : 'Sin informaci&oacute;n';
                                    row[15] = elemento.tscancelado ? elemento.tscancelado : 'Sin informaci&oacute;n';
                                    
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteVentasInstalacionTable = $('#reporteVentasInstalacionTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [15], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteVentasInstalacion = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_ventasinstalacion").val() == 'semana' && !$scope.weekDateObjectReport.ventasinstalacion) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasinstalacion');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte ventas instalacion",
                tipoExcel: 'reportesf-ventasinstalacion-pi',
                headers: ["CUENTA BRM", "OS", "FECHA CIERRE", "ORIGEN DEL PROSPECTO", "CANAL", "SUBCANAL", "CLUSTER", "FECHA ACTIVACION", "NOMBRE EMPLEADO", "ESTATUS", "MOTIVO CANCELACION", "FECHA AGENDAMIENTO", "TIPO ORDEN",
                "FAMILIA PLAN", "PLAN", "TS CANCELADO"],
                valores: ["idCuentaBRM", "folio", "closeDate", "leadSource", "canal", "subCanal", "cluster", "fechaActivacion", "empleado", "estatus", "motivoCancelacion", "fechaAgendada", "tipoOrden",
                "familiaId", "dpplan", "tscancelado"]
            }
            $scope.downloadReport(params, 'reporteVentasInstalacion', 'ventasinstalacion');
        }
    }

    $scope.consultarReporteVentasPrincipal = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_ventasprinc").val() == 'semana' && !$scope.weekDateObjectReport.ventasprinc) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }

        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasprinc');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin
            }
            if (!swal.isVisible()) {
                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
            }
            reportesSFService.consultarReporteVentas(params).then(function success(response) {
                swal.close();
                let arraRow = [];
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado) {
                                $scope.resultReporteVentasPrincipal = response.data.result.resultado.length;
                                $.each(response.data.result.resultado, function (i, elemento) {
                                    let row = [];

                                    row[0] = elemento.idCuentaBRM ? elemento.idCuentaBRM : 'Sin informaci&oacute;n';
                                    row[1] = elemento.folio ? elemento.folio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.idOtGIM ? elemento.idOtGIM : 'Sin informaci&oacute;n';
                                    row[3] = elemento.numOportunidad ? elemento.numOportunidad : 'Sin informaci&oacute;n';
                                    row[4] = elemento.nombreCuenta ? elemento.nombreCuenta : 'Sin informaci&oacute;n';
                                    row[5] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
                                    row[6] = elemento.motivoCancelacion ? elemento.motivoCancelacion : 'Sin informaci&oacute;n';
                                    row[7] = elemento.subCanal ? elemento.subCanal : 'Sin informaci&oacute;n';
                                    row[8] = elemento.fechaActivacion ? elemento.fechaActivacion : 'Sin informaci&oacute;n';
                                    row[9] = elemento.jefeVentas ? elemento.jefeVentas : 'Sin informaci&oacute;n';
                                    row[10] = elemento.distrital ? elemento.distrital : 'Sin informaci&oacute;n';
                                    row[11] = elemento.empleado ? elemento.empleado : 'Sin informaci&oacute;n';
                                    row[12] = elemento.canal ? elemento.canal : 'Sin informaci&oacute;n';
                                    row[13] = elemento.canalRecomendador ? elemento.canalRecomendador : 'Sin informaci&oacute;n';
                                    row[14] = elemento.folioEmpleado ? elemento.folioEmpleado : 'Sin informaci&oacute;n';
                                    row[15] = elemento.fechaAgendamiento ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
                                    row[16] = elemento.turnoAgendamiento ? elemento.turnoAgendamiento : 'Sin informaci&oacute;n';
                                    row[17] = elemento.tipoOrden ? elemento.tipoOrden : 'Sin informaci&oacute;n';
                                    row[18] = elemento.sitioEstado ? elemento.sitioEstado : 'Sin informaci&oacute;n';
                                    row[19] = elemento.plaza ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[20] = elemento.distrito ? elemento.distrito : 'Sin informaci&oacute;n';
                                    row[21] = elemento.region ? elemento.region : 'Sin informaci&oacute;n';
                                    row[22] = elemento.fechaCreacion ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    row[23] = elemento.clusterComercial ? elemento.clusterComercial : 'Sin informaci&oacute;n';
                                    row[24] = elemento.fechaCierre ? elemento.fechaCierre : 'Sin informaci&oacute;n';
                                    row[25] = elemento.cluster ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[26] = elemento.sitioplaza ? elemento.sitioplaza : 'Sin informaci&oacute;n';
                                    row[27] = elemento.comentariosGIM ? elemento.comentariosGIM : 'Sin informaci&oacute;n';
                                    arraRow.push(row);
                                })

                            } else {
                                toastr.info('No se encontraron datos');
                            }
                        } else {
                            toastr.warning('No se encontraron datos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error al consultar el reporte');
                }

                reporteVentasPrincipalTable = $('#reporteVentasPrincipalTable').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "ordering": true,
                    "pageLength": 10,
                    "bDestroy": true,
                    "info": true,
                    "scrollX": false,
                    "data": arraRow,
                    "autoWidth": false,
                    "language": idioma_espanol_not_font,
                    "aoColumnDefs": [
                        { "aTargets": [27], "bSortable": false }
                    ]
                });
                swal.close();
            })
        }
    }

    $scope.descargarReporteVentasPrincipal = function() {
        let mensaje = '<ul>';
        let isValid = true;

        if ($("#tipo_reporte_ventasprinc").val() == 'semana' && !$scope.weekDateObjectReport.ventasprinc) {
            mensaje += '<li>Seleccione semana</li>';
            isValid = false
        }


        if (!isValid) {
            swal.close()
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        } else {
            let fechas = $scope.getFecha('ventasprinc');
            let params = {
                fechaInicial: fechas.fechaInicio,
                fechaFinal: fechas.fechaFin,
                sheet: "Reporte ventas principal",
                tipoExcel: 'reportesf-ventasprinc-pi',
                headers: ["CUENTA", "OS", "ID OT GIM", "NUMERO OPORTUNIDAD", "NOMBRE CUENTA", "ESTATUS", "MOTIVO CANCELACION", "SUBCANAL", "FECHA ACTIVACION", "JEFE VENTAS", "DISTRITAL", "EMPLEADO", "CANAL",
                "CANAL RECOMENDADOR", "FOLIO EMPLEADO", "FECHA AGENDAMIENTO", "TURNO AGENDAMIENTO", "TIPO ORDEN", "SITIO ESTADO", "PLAZA", "DISTRITO", "REGION", "FECHA CREACION", "CLUSTER COMERCIAL",
                "FECHA CIERRE", "CLUSTER", "SITIO PLAZA", "COMENTARIO GIM"],
                valores: ["idCuentaBRM", "folio", "idOtGIM", "numOportunidad", "nombreCuenta", "estatus", "motivoCancelacion", "subCanal", "fechaActivacion", "jefeVentas", "distrital", "empleado", "canal",
                "canalRecomendador", "folioEmpleado", "fechaAgendamiento", "turnoAgendamiento", "tipoOrden", "sitioEstado", "plaza", "distrito", "region", "fechaCreacion", "clusterComercial",
                "fechaCierre", "cluster", "sitioplaza", "comentariosGIM"]
            }
            $scope.downloadReport(params, 'reporteVentasPrincipal', 'ventasprinc');
        }
    }


    $scope.downloadReport = function (params, nameFile, report) {
        swal({ text: 'Cargando registros...', allowOutsideClick: false });
        swal.showLoading();

        let tituloAccion = "Descarga reporte " + report;
        let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';

        genericService.enviarParamsReporte(params).then(function success(response) {
            if (response.data.respuesta) {
                var link = document.createElement("a");
                link.href = contex_project + '/req/exporteExcelGenericRequest/' + nameFile + '.xls';
                link.click();
                swal.close();

                mensajeEnvio = 'Se ha descargado el reporte';
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                toastr.info('No se encontraron datos para la descarga');
            }
            swal.close();
        });
    }

}]);