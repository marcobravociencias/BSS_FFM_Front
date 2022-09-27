<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="mainBandejasEimPMApp">
	<head>
		<meta charset="UTF-8" />
		<title>FFM Total play</title>

    	<link rel="icon" type="image/png" sizes="192x192"   href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/typeahead/css/typeaheadjs.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/projectmanager/bandejasEim/styleBandejasEim.css?v=${sessionScope.versionDepl}"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.print.min.css" rel="stylesheet" media="print" />
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/scheduler.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"  rel="stylesheet" />     
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">

        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/style.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/proton/style.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css" rel="stylesheet">
</head>

<body id="idBody" ng-controller="bandejasEimController" style="display: none;">
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
                            <div class="opcion-menu" ng-click="cambiarVista(1);" ng-if="configPermisoAccionAsignarEimCSP">
                                <i ng-class="{'active-iconmenu':vistaCoordinacion==1}" class="icon-menu-left fa fa-users"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==1}" class="titulo-menu">CSP sin EIM</span>
                            </div>
                            <div class="opcion-menu" ng-click="cambiarVista(2);" ng-if="configPermisoAccionAsignarEimCSP">
                                <i ng-class="{'active-iconmenu':vistaCoordinacion==2}" class="icon-menu-left fa fa-chalkboard-teacher"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==2}" class="titulo-menu">Validación de lider ...</span>
                            </div>
                            
                            <div class="opcion-menu" ng-click="cambiarVista(3);" ng-if="configPermisoAccionConsultarBandejaCSPSinEim">
                                <i ng-class="{'active-iconmenu':vistaCoordinacion==3}" class="icon-menu-left fa fa-clock-o"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==3}" class="titulo-menu">Pendientes</span>
                            </div>
                            <div class="opcion-menu" ng-click="cambiarVista(4);" ng-if="configPermisoAccionConsultarBandejaDependencias">
                                <i ng-class="{'active-iconmenu':vistaCoordinacion==4}" class="icon-menu-left fa fa-caret-square-o-left"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==4}" class="titulo-menu">Dependencias</span>
                            </div>
                            <div class="opcion-menu" ng-click="cambiarVista(5);" ng-if="configPermisoAccionConsultarBandejaEnImplementacion">
                                <i ng-class="{'active-iconmenu':vistaCoordinacion==5}" class="icon-menu-left fa fa-retweet"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==5}" class="titulo-menu">En implementaci&oacute;n</span>
                            </div>
                            <div class="opcion-menu" ng-click="cambiarVista(6);" ng-if="configPermisoAccionConsultarBandejaImplementados">
                                <i ng-class="{'active-iconmenu':vistaCoordinacion==6}" class="icon-menu-left fa fa-check"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==6}" class="titulo-menu">Implementados</span>
                            </div>
                        </div>
                        <div    class="right-content">
                            <div class="col-12 text-center">
                                <span class="span-titulo-bandeja" ng-bind="nombreBandeja"></span>
                            </div>
                            <div class="row">
                                <div id="vistaPendiente" class="col-12" ng-show="vistaCoordinacion === 1" ng-if="configPermisoAccionAsignarEimCSP">
                                    <jsp:include page="./content/cspSinEim.jsp"></jsp:include>
                                </div>
                                 <div id="vistaValidacion" class="col-12" ng-show="vistaCoordinacion === 2" ng-if="configPermisoAccionAsignarEimCSP">
                                    <jsp:include page="./content/validacionDeLider.jsp"></jsp:include>
                                </div>
                                <div id="vistaAsignada" class="col-12" ng-show="vistaCoordinacion === 3">
                                    <jsp:include page="./content/pendientesPorImplementar.jsp"></jsp:include>
                                </div>
                                <div id="vistaDetenida" class="col-12" ng-show="vistaCoordinacion === 4">
                                    <jsp:include page="./content/dependencias.jsp"></jsp:include>
                                </div>
                                <div id="vistaTerminada" class="col-12" ng-show="vistaCoordinacion === 5">
                                    <jsp:include page="./content/enImplementacion.jsp"></jsp:include>
                                </div>
                                <div id="vistaCancelada" class="col-12 p-0" ng-show="vistaCoordinacion === 6">
                                    <jsp:include page="./content/implementados.jsp"></jsp:include>
                                </div>
                               
                            </div>
                        </div>
                        
                    </div>
                 
                </div>
            </div>  
        </div>
        <jsp:include page="filtrosEim.jsp"></jsp:include>
</body>
    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>    
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js" ></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/typeahead/js/typeahead.bundle.js" ></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/js/jstree.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>   
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/schedulerPlantaInterna.js" ></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/bandejasEim/bandejasEimController.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/bandejasEim/bandejasEimSFController.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/bandejasEim/implementadosEimController.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/bandejasEim/bandejasEimPMService.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/bandejasEim/busqGral.js?v=${sessionScope.versionDepl}"></script>


    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>	
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>

</html>