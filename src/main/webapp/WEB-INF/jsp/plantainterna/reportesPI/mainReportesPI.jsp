<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>

    <!DOCTYPE html>
    <html ng-app="reportesPIApp">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
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
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css"
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
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/reportesPI/mainReportes.css"
            rel="stylesheet" />
    </head>

    <body id="idBody" ng-controller="reportesController" style="display: none;">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container container-title-header" style="padding: 0 !important;">
            <div class="header-modulo">
                <h5 class="title-modulo">Reportes</h5>
                <h1 class="h6 subtitle-modulo">En este m&oacute;dulo podr&aacute;s realizar la busqueda de
                    reportes en general</h1>
            </div>
        </div>
        <div class="container" id="container_reportes">
           
            <div class="row">
                <div class="col-md-12">
                    <ul class="nav nav-tabs left-menu small-menu flex-column" id="opciones-menu" role="tablist"
                        style="margin-left: 0; height: 100%;">
                        <li class="nav-item">
                            <a class="opcion-menu active" id="seguimientoDiario-tab" data-toggle="tab"
                                href="#seguimientoDiario" role="tab" aria-controls="seguimientoDiario"
                                aria-selected="false"><i class="icon-menu-left fas fa-calendar-check"></i>&nbsp;<span
                                    class="titulo-menu">Reporte Seguimiento Diario</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="opcion-menu" id="ordenes-tab" data-toggle="tab" href="#ordenes" role="tab"
                                aria-controls="ordenes" aria-selected="false"><i
                                    class="icon-menu-left fas fa-clipboard-list"></i>&nbsp;<span
                                    class="titulo-menu">Reporte Ordenes de Trabajo PI</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="opcion-menu" id="despacho-tab" data-toggle="tab" href="#despacho" role="tab"
                                aria-controls="despacho" aria-selected="false"><i
                                    class="icon-menu-left fas fa-user-tie"></i>&nbsp;<span class="titulo-menu">Reporte
                                    Coordinador</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="opcion-menu" id="auxiliar-tab" data-toggle="tab" href="#auxiliar" role="tab"
                                aria-controls="auxiliar" aria-selected="false"><i
                                    class="icon-menu-left fas fa-briefcase"></i>&nbsp;<span class="titulo-menu">Reporte
                                    T&eacute;cnico Auxiliar</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="opcion-menu" id="inspector-tab" data-toggle="tab" href="#inspector" role="tab"
                                aria-controls="inspector" aria-selected="false"><i
                                    class="icon-menu-left fas fa-search-location"></i>&nbsp;<span
                                    class="titulo-menu">Reporte Inspector</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="opcion-menu" id="tecnico-tab" data-toggle="tab" href="#tecnico" role="tab"
                                aria-controls="tecnico" aria-selected="false"><i
                                    class="icon-menu-left fas fa-user-alt"></i>&nbsp;<span class="titulo-menu">Reporte
                                    por Tecnico</span></a>
                        </li>

        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/reportesPI/mainReportes.css"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/styleConsultaOT.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/timeLine.css"
        rel="stylesheet" />
</head>
<body id="idBody" ng-controller="reportesController" style="display: none;">
<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
<div class="col-md-12 style_container_reportes">
	
	<div class="row">
		<div class="col-md-2" id="navbar_reportes" style="margin-top: 5px;">
			<div class="align-rigth col-md-12">
				<button id="ocultar_nav" type="button" class="close" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<ul class="list-group-flush list-group">
				<li id="link_reporte_ordenes" class="list-group-item list-group-item-action elemento_link nav-link active">
					<span class="fon_size_menu">OTS Planta Interna</span>
				</li>
				<li id="link_reporte_tecnico" class="list-group-item list-group-item-action elemento_link nav-link">
					<span class="fon_size_menu">T&eacute;cnico</span>
				</li>
				<li id="link_reporte_despacho"  class="list-group-item list-group-item-action elemento_link nav-link">
					<span class="fon_size_menu">Coordinador</span>
				</li>
				<li id="link_reporte_auxiliar" class="list-group-item list-group-item-action elemento_link nav-link">
					<span class="fon_size_menu">T&eacute;cnico Auxiliar</span>
				</li>
				<li id="link_reporte_inspector" class="list-group-item list-group-item-action elemento_link nav-link">
					<span class="fon_size_menu">Reporte Inspector</span>
				</li>
			</ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/modalCluster.jsp"></jsp:include>
    </body>
    <!-- LIBRERIAS -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
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

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesPI/reportesPIController.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesPI/reportesPIService.js"></script>
	<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
    
	
</html>