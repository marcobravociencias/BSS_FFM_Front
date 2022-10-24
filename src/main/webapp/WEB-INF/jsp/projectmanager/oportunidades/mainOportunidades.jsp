<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="oportunidadApp">
	<head>
		<meta charset="UTF-8" />
		<title>FFM Total play</title>

        <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\styleMainBusqueda.css?v=${sessionScope.versionDepl}">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/agendamiento\styleMainAgendamiento.css?v=${sessionScope.versionDepl}">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/projectmanager/oportunidades/styleOportunidad.css?v=${sessionScope.versionDepl}" />
        
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/evidencia/styleMainEvidencia.css?v=${sessionScope.versionDepl}" />

        
</head>

<body id="idBody" ng-controller="oportunidadController" style="display: none;">
<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
	 <br>
<div class="container" id="container_coordinar_instalaciones">
            <div class="content-fluid">
                <div class="row">
                    <!--div class="col-12 text-center">
                        <span class="span-titulo-bandeja" ng-bind="nombreBandeja"></span>
                    </div-->
                    <div class="col-12">
                        <div id="opciones-menu" class="left-menu small-menu small-sf" style="margin-left: 0em; height: 100%;">
                            <div class="opcion-menu" ng-click="cambiarVista(1);">
                                <i ng-class="{'active-iconmenu':vistaCoordinacion==1}" class="icon-menu-left fa fa-users"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==1}" class="titulo-menu">Home</span>
                            </div>
                            <div class="opcion-menu" ng-click="cambiarVista(2);">
                                <i ng-class="{'active-iconmenu':vistaCoordinacion==2}" class="icon-menu-left fa fa-chalkboard-teacher"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==2}" class="titulo-menu">En Implementacion</span>
                            </div>
                        </div>
                        <div    class="right-content">
                            <div class="col-12 text-center">
                                <span class="span-titulo-bandeja" ng-bind="nombreBandeja"></span>
                            </div>
                            <div class="row">
                                <div id="vistaPendiente" class="col-12" ng-show="vistaCoordinacion === 1">
                                    <jsp:include page="./content/oportunidades.jsp"></jsp:include>
                                </div>
                                 <div id="vistaValidacion" class="col-12" ng-show="vistaCoordinacion === 2">
                                    <jsp:include page="./content/enImplementacion.jsp"></jsp:include>
                                </div>
                               
                            </div>
                        </div>
                        
                    </div>
                 
                </div>
            </div>  
        </div>
        <jsp:include page="modals/modalGeografia.jsp"></jsp:include>
        <jsp:include page="./modals/modalOportunidades.jsp"></jsp:include>
        <jsp:include page="modals/modalImagenEvidencia.jsp"></jsp:include>
        <jsp:include page="modals/modalDetalle.jsp"></jsp:include> 
</body>
   
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/exportExcel/index.min.js"></script>
<!-- Fin -->

<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
<script src="${pageContext.request.contextPath}/resources/js/projectmanager/oportunidades/oportunidadesController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/projectmanager/oportunidades/oportunidadesService.js?v=${sessionScope.versionDepl}" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/agendamiento/agendamientoController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/agendamiento/agendamientoService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/agendamiento/calendarAgendamientoController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/agendamiento/mapAgendamientoController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

<script src="${pageContext.request.contextPath}/resources/js/generic/evidencia/evidenciaController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/evidencia/evidenciaService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/consultaOT/consultaOTService.js?v=${sessionScope.versionDepl}"></script>
</html>