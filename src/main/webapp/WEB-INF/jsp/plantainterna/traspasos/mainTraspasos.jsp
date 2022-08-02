<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="traspasosApp">

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
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/timeLine.css?v=${sessionScope.versionDepl}"
            rel="stylesheet" />
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/traspasos/traspasos.css?v=${sessionScope.versionDepl}"
            rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/traspasos/traspasoWizard.css?v=${sessionScope.versionDepl}"
            rel="stylesheet" />
    </head>

    <body id="idBody" ng-controller="traspasosController" class="body" style="display: none;">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container">
            <div class="content-fluid contenedor-traspasos">
                <div ng-show="!configPermisoAccionConsultaOts && !configPermisoAccionConsultaTraspasos" class="text-accion-nopermiso">
                    <i class="icon-not-permiso fas fa-user-lock"></i>
                    <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
                </div>
                <div class="container-fluid" style="padding: 0;" ng-show="(configPermisoAccionConsultaOts || configPermisoAccionConsultaTraspasos) && !isTraspaso">
                    <ul class="nav nav-tabs" id="myTabTraspasos" role="tablist">
                        <li class="nav-item" ng-if="configPermisoAccionConsultaOts">
                            <a class="nav-link active" id="ots-tab" data-toggle="tab" href="ots" ng-click="cambiaTab('ots')" role="tab"
                                aria-controls="ots" aria-selected="false">OTs</a>
                        </li>
                        <li class="nav-item" ng-if="configPermisoAccionConsultaTraspasos">
                            <a class="nav-link" id="traspasos-tab" data-toggle="tab" href="traspasos" role="tab" ng-click="cambiaTab('traspasos')"
                                aria-controls="traspasos" aria-selected="true">Traspasos</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane menu-pane fade show active" ng-show="configPermisoAccionConsultaOts" id="ots" role="tabpanel" aria-labelledby="ots-tab">
                            <jsp:include page="./content/otsTraspasos.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane menu-pane fade" id="traspasos" role="tabpanel" ng-show="configPermisoAccionConsultaTraspasos"
                            aria-labelledby="traspasos-tab">
                            <jsp:include page="./content/traspasos.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
                <div ng-show="isTraspaso">
                    <jsp:include page="./content/traspasoForm.jsp"></jsp:include>
                </div>
            </div>
        </div>
        <jsp:include page="modals/modalCluster.jsp"></jsp:include>
        <jsp:include page="modals/modalImagenEvidencia.jsp"></jsp:include>
        <jsp:include page="modals/modalDetalleOt.jsp"></jsp:include>
    </body>
    <jsp:include page="./content/filtroTraspasos.jsp"></jsp:include>
    <!-- Scripts libraries -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>

    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/exportExcel/index.min.js"></script>
    <!-- Fin -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/traspasos/traspasosController.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/plantainterna/traspasos/calendarController.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/plantainterna/traspasos/mapController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/traspasos/traspasosService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

    </html>