<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>

    <!DOCTYPE html>
    <html ng-app="reportesPIApp">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>

        <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/reportesPI/mainReportes.css?v=${sessionScope.versionDepl}" rel="stylesheet" />
    </head>

    <body id="idBody" ng-controller="reportesController" style="display: none;">

        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
       <div ng-show="permisosConfigUser.permisos.length === 0" class="container container-message">
        <div  class="text-accion-nopermiso">
            <i class="icon-not-permiso fas fa-user-lock"></i>
            <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
        </div>
       </div>
        <div class="container" id="container_reportes" ng-show="permisosConfigUser.permisos.length > 0">
            <div class="row">
                <div class="col-md-12">
                    <ul class="nav nav-tabs left-menu small-menu flex-column" id="opciones-menu" role="tablist"
                        style="margin-left: 0; height: 100%;">
                        <li class="nav-item" ng-click="cambiaReporte('seguimiento', true,'seguimientoDiario')" ng-if="configPermisoAccionConsultaReporteSeguimiento">
                            <a class="opcion-menu" id="seguimientoDiario-tab" data-toggle="tab" 
                                href="seguimientoDiario" role="tab" aria-controls="seguimientoDiario"
                                aria-selected="false"><i class="icon-menu-left fas fa-calendar-check"></i>&nbsp;<span
                                    class="titulo-menu">Seguimiento Diario</span></a>
                        </li>
                        <li class="nav-item" ng-click="cambiaReporte('cierre',true,'cierreDiario')" ng-if="configPermisoAccionConsultaReporteCierre">
                            <a class="opcion-menu" id="cierreDiario-tab" data-toggle="tab"
                                href="cierreDiario" role="tab" aria-controls="cierreDiario"
                                aria-selected="false"><i class="icon-menu-left fas fa-calendar-week"></i>&nbsp;<span
                                    class="titulo-menu">Cierre Diario</span></a>
                        </li>
                        <li class="nav-item" ng-click="cambiaReporte('asignadas',true,'asignadasCompensacion')" ng-if="configPermisoAccionConsultaReporteAsignadas">
                            <a class="opcion-menu" id="asignadasCompensacion-tab" data-toggle="tab"
                                href="asignadasCompensacion" role="tab" aria-controls="asignadasCompensacion"
                                aria-selected="false"><i class="icon-menu-left fas fa-file-alt"></i>&nbsp;<span
                                    class="titulo-menu">Asignadas Compensaci&oacute;n</span></a>
                        </li>
                    </ul>
                    <div class="right-content tab-content">
                        <div class="row tab-content">
                            <div class="tab-pane fade" id="seguimientoDiario" role="tabpanel" ng-show="configPermisoAccionConsultaReporteSeguimiento"
                                aria-labelledby="seguimientoDiario-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte Seguimiento
                                    Diario</h5>
                                <jsp:include page="./reporteSeguimientoDiario.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="cierreDiario" role="tabpanel" aria-labelledby="cierreDiario-tab" ng-show="configPermisoAccionConsultaReporteCierre">
                                <h5 id="texto_header_reportes" class="text-center">Reporte Cierre Diario</h5>
                                <jsp:include page="./reporteCierreDiario.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="asignadasCompensacion" role="tabpanel" aria-labelledby="asignadasCompensacion-tab" ng-show="configPermisoAccionConsultaReporteAsignadas">
                                <h5 id="texto_header_reportes" class="text-center">Reporte Asignadas Compensaci&oacute;n</h5>
                                <jsp:include page="./reporteAsignadasCompensacion.jsp"></jsp:include>
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/modalCluster.jsp"></jsp:include>
    </body>
    <jsp:include page="./filtroReporte.jsp"></jsp:include>

    <!-- LIBRERIAS -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesPI/reportesPIController.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesPI/reportesPIFilters.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesPI/reportesPIService.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/exportExcel/index.min.js"></script>


    </html>