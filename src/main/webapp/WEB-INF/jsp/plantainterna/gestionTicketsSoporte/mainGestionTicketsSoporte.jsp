<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="ticketsSoporteApp">

    <head>
        <meta charset="ISO-8859-1" />
        <title>FFM Total play</title>

        <link rel="icon" type="image/png" sizes="192x192"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png" />
        <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json" />
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css"
            rel="stylesheet">
        <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.min.js"></script>
        <script type="text/javascript"
            src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css"
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
            href="${pageContext.request.contextPath}/resources/css/plantainterna/gestionTicketsSoporte/mainChatter.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/plantainterna/gestionTicketsSoporte/mainGestionTicketsSoporte.css?v=${sessionScope.versionDepl}" />
        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/plantainterna/gestionTicketsSoporte\noticiasGentionTicket.css?v=${sessionScope.versionDepl}">
    </head>

    <body id="idBody" class="body" ng-controller="ticketsSoporteController" style="display: none;">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container" id="container_gestion_tickets" style="padding: 1em 0;"
            ng-show="!configPermisoAccionCreaTicket && !configPermisoAccionConsultaTicket">
            <div class="text-accion-nopermiso">
                <i class="icon-not-permiso fas fa-user-lock"></i>
                <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
            </div>
        </div>
        <div class="container" id="container_gestion_tickets"
            ng-show="configPermisoAccionCreaTicket || configPermisoAccionConsultaTicket">
            <div ng-show="contentprincipal" class="row row-content-principal">
                <div class="col-md-12">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" ng-if="configPermisoAccionCreaTicket">
                            <a class="nav-link " id="opcion-creatickets-tab" data-toggle="tab"
                                href="#opcion-creatickets" role="tab" aria-controls="opcion-creatickets"
                                aria-selected="true">Creaci&oacute;n de tickets</a>
                        </li>
                        <li class="nav-item" ng-if="configPermisoAccionConsultaTicket">
                            <a class="nav-link active" id="opcion-consultatickets-tab" data-toggle="tab"
                                href="#opcion-consultatickets" role="tab" aria-controls="opcion-consultatickets"
                                aria-selected="false">Consultar tickets</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade " ng-show="configPermisoAccionCreaTicket" id="opcion-creatickets"
                            role="tabpanel" aria-labelledby="opcion-creatickets-tab">
                            <jsp:include page="./content/registrarTicket.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade show active" ng-show="configPermisoAccionConsultaTicket"
                            id="opcion-consultatickets" role="tabpanel" aria-labelledby="opcion-consultatickets-tab">
                            <jsp:include page="./content/consultaTickets.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
            </div>
            <div ng-if="contentdetalleticket" class="row row-content-detalle">
                <div class="col-md-12 content-detalle-ticket">
                    <jsp:include page="./content/opcionesTicket.jsp"></jsp:include>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/modalGeografiaConsulta.jsp"></jsp:include>
        <jsp:include page="./modals/modalBusquedaTecnico.jsp"></jsp:include>
        <jsp:include page="./modals/modalFoto.jsp"></jsp:include>
        <jsp:include page="./modals/modalBusquedaCuenta.jsp"></jsp:include>
        <jsp:include page="./modals/modalAsignarTicket.jsp"></jsp:include>
    </body>
    <!-- Scripts libraries -->
    <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
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

    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/gestionTicketsSoporteController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/gestionTicketMapa.js?v=${sessionScope.versionDepl}"
        charset="UTF-8"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/gestionTicketsSoporteService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/jsonGestionTicketsSoporte.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/noticiasGestionTicketSoporte.js?v=${sessionScope.versionDepl}"></script>

    </html>