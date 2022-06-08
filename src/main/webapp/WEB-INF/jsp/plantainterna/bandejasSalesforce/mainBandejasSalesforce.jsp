<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html ng-app="bandejasSalesforceApp">

<head>
    <meta charset="ISO-8859-1" />
    <title>FFM Total play</title>

    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png" />

    <!-- Libraries -->
    <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css">
    <!-- Libraries -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\styleMainBusqueda.css?v=${sessionScope.versionDepl}">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/bandejasSalesforce/styleBandejasSalesforce.css?v=${sessionScope.versionDepl}" />
</head>

<body id="idBody" ng-controller="bandejasSalesforceController" style="display: none;">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
    <br>
    <div class="container" id="container_bandejas_salesforce">
        <div class="content-fluid" ng-show="!isAgendamiento && !detalleSalesforceView">
            <div class="row" ng-show="!isPermisoConsultaPendientesAgendar && !isPermisoConsultaRescataventas && !isPermisoConsultaPendientesActivar" style="padding: 1em  0;">
                <div class="text-accion-nopermiso">
                    <i class="icon-not-permiso fas fa-user-lock"></i>
                    <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
                </div>
            </div>
            <div class="row" ng-show="isPermisoConsultaPendientesAgendar || isPermisoConsultaRescataventas || isPermisoConsultaPendientesActivar">
                <div class="col-12">
                    <div id="opciones-menu-sf" class="left-menu small-menu small-sf" style="margin-left: 0; height: 100%;">
                        <div class="opcion-menu" ng-click="cambiarVistaSF(1);" ng-if="isPermisoConsultaPendientesAgendar">
                            <i ng-class="{'active-iconmenu':vistaSf==1}" class="icon-menu-left fa fa-clock"></i>
                            &nbsp;&nbsp;
                            <span ng-class="{'active-text-menu':vistaSf==1}" class="titulo-menu">Pendiente de agendar</span>
                        </div>
                        <div class="opcion-menu" ng-click="cambiarVistaSF(2);" ng-if="isPermisoConsultaRescataventas">
                            <i ng-class="{'active-iconmenu':vistaSf==2}" class="icon-menu-left fa fa-pencil-square"></i>
                            &nbsp;&nbsp;
                            <span ng-class="{'active-text-menu':vistaSf==2}" class="titulo-menu">Rescataventas</span>
                        </div>
                        <div class="opcion-menu" ng-click="cambiarVistaSF(3);" ng-if="isPermisoConsultaPendientesActivar">
                            <i ng-class="{'active-iconmenu':vistaSf==3}" class="icon-menu-left fa fa-stop-circle"></i>
                            &nbsp;&nbsp;
                            <span ng-class="{'active-text-menu':vistaSf==3}" class="titulo-menu">Pendiente de activar</span>
                        </div>
                    </div>
                    <div class="right-content">
                        <div class="row">
                            <div class="col-12 text-center">
                                <span class="span-titulo-bandeja" ng-bind="nombreBandejaSf"></span>
                            </div>
                            <div class="row" style="padding-right: 0;">
                                <div id="vistaPendiente" class="col-12" ng-show="vistaSf === 1 && isPermisoConsultaPendientesAgendar">
                                    <jsp:include page="./content/tablePendienteAgendar.jsp"></jsp:include>
                                </div>
                                <div id="vistaAsignada" class="col-12" ng-show="vistaSf === 2 && isPermisoConsultaRescataventas">
                                    <jsp:include page="./content/tableRescataventas.jsp"></jsp:include>
                                </div>
                                <div id="vistaDetenida" class="col-12" ng-show="vistaSf === 3 && isPermisoConsultaPendientesActivar">
                                    <jsp:include page="./content/tablePendienteActivar.jsp"></jsp:include>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-fluid" ng-show="isAgendamiento && !detalleSalesforceView">
            <div class="row row-parent-bandejas">
                <div class="col-12 col-parent-bandejas mb-3">
                    <div class="col-12">
                        <jsp:include page="./content/contentAgendamiento.jsp"></jsp:include>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <jsp:include page="/WEB-INF/jsp/generic/busquedaSalesforce/mainBusquedaSalesforce.jsp"></jsp:include>

    <jsp:include page="./modals/modalGeografia.jsp"></jsp:include>
    <jsp:include page="./modals/modalNuevoContacto.jsp"></jsp:include>
    <jsp:include page="./modals/modalDetallePaquete.jsp"></jsp:include>
</body>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>

<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/bandejasSalesforce/bandejasSalesforceController.js?v=${sessionScope.versionDepl}"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/bandejasSalesforce/calendarAgendamientoController.js?v=${sessionScope.versionDepl}"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/bandejasSalesforce/mapAgendamientoController.js?v=${sessionScope.versionDepl}"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/bandejasSalesforce/bandejasSalesforceService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

</html>