<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="seguimientoSoporteApp">

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
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/timeLine.css?v=${sessionScope.versionDepl}"/>
        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\styleMainBusqueda.css?v=${sessionScope.versionDepl}">
        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\mainNoticiaBusqueda.css?v=${sessionScope.versionDepl}">
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/seguimientoSoporte/mainSeguimientoSoporte.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/seguimientoSoporte/mainChatter.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">

    </head>

    <body id="idBody" class="body" ng-controller="seguimientoSoporteController" style="display:none;">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container" id="container_seguimiento" style="padding: 1em 0;"
            ng-show="!configPermisoAccionConsultaSeguimiento">
            <div class="text-accion-nopermiso">
                <i class="icon-not-permiso fas fa-user-lock"></i>
                <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
            </div>
        </div>
        <div class="container" id="container_seguimiento" ng-show="!detalleSalesforceView && configPermisoAccionConsultaSeguimiento">
            <i ng-show="!isBusquedaGeneral && !isDetalleTicket" class="fas fa-chevron-circle-left icon-back" title="Regresar" ng-click="backGeneral()"></i>

            <div ng-show="isBusquedaGeneral && !isDetalleTicket">
                <jsp:include page="./content/consultaIngenieros.jsp"></jsp:include>
            </div>
            <div ng-show="!isBusquedaGeneral && !isDetalleTicket">
                <jsp:include page="./content/consultaTickets.jsp"></jsp:include>
            </div>
            <div ng-show="!isBusquedaGeneral && isDetalleTicket && !detalleSalesforceView">
                <div class="message-done badge" ng-if="ticketDetalle.detalleTicketSc.idEstatus == 4">
                    <i class="icono-completado fas fa-check ml-2"></i>
                    <span>TICKET COMPLETADO</span>
                </div>
                <div class="message-done badge" ng-if="ticketDetalle.detalleTicketSc.idEstatus == 5">
                    <i class="icono-cancelado fas fa-times ml-2"></i>
                    <span>TICKET CANCELADO</span>
                </div>
                <div style="text-align: right; padding-top: 0.5em;">
                    <button ng-click="cerrarDetalleTicket()" type="button" style="padding-right: 1em;" class="btn-close" data-mdb-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>

                <jsp:include page="./content/detalleTicket.jsp"></jsp:include>
            </div>
        </div>
        <jsp:include page="/WEB-INF/jsp/generic/busquedaSalesforce/mainBusquedaSalesforce.jsp"></jsp:include>
        <jsp:include page="./modals/modalDetalle.jsp"></jsp:include>
        <jsp:include page="./modals/modalFoto.jsp"></jsp:include>
        <jsp:include page="./modals/modalEvidenciaOT.jsp"></jsp:include>
        <jsp:include page="./modals/modalDetalleOT.jsp"></jsp:include>
    </body>
    <!-- Scripts libraries -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>

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
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>

    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/seguimientoSoporteController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/seguimientoSoporteService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/seguimientoSoporteService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/jsonTemp.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceService.js?v=${sessionScope.versionDepl}"></script>

    </html>