<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="reportesLogApp">

    <head>
        <meta charset="ISO-8859-1" />
        <title>FFM Total play</title>

        <link rel="icon" type="image/png" sizes="192x192"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
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
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/reportesLog/mainReportesLog.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
    </head>

    <body id="idBody" class="body" ng-controller="reportesLogController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container">
            <div class="content-fluid" id="container_logs" style="display: none;">
                <div class="text-accion-nopermiso" ng-show="!configPermisoAccionConsultaLogsUsuario && !configPermisoAccionConsultaLogsGeneral">
                    <i class="icon-not-permiso fas fa-user-lock"></i>
                    <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
                </div>
                <div class="container-fluid" style="padding: 0;" ng-show="configPermisoAccionConsultaLogsUsuario || configPermisoAccionConsultaLogsGeneral">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" ng-if="configPermisoAccionConsultaLogsGeneral">
                            <a class="nav-link active" id="logsGenerico-tab" data-toggle="tab" href="#logsGenerico"
                                role="tab" aria-controls="logsGenerico" aria-selected="false">LOGS GENERAL</a>
                        </li>
                        <li class="nav-item"  ng-if="configPermisoAccionConsultaLogsUsuario">
                            <a class="nav-link" id="logsUsuario-tab" data-toggle="tab" href="#logsUsuario"
                                ng-click="validaConsultarTecnicosPagos()" role="tab" aria-controls="logsUsuario"
                                aria-selected="true">LOGS USUARIO</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade" id="logsUsuario" role="tabpanel" aria-labelledby="logsUsuario-tab" ng-show="configPermisoAccionConsultaLogsUsuario">
                            <jsp:include page="./content/logsUsuario.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade show active" id="logsGenerico" role="tabpanel" ng-show="configPermisoAccionConsultaLogsGeneral"
                            aria-labelledby="logsGenerico-tab">
                            <jsp:include page="./content/logsGenerico.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/modalFotoTecnico.jsp"></jsp:include>
        <jsp:include page="./modals/modalGeografia-filter.jsp"></jsp:include>
        <jsp:include page="./modals/modalLogUsuario.jsp"></jsp:include>
    </body>
    <!-- Scripts libraries -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <!-- fin -->
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>

    <script src="${pageContext.request.contextPath}/resources/libraries/exportExcel/index.min.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesLog/reportesLogController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesLog/reportesLogService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

    </html>