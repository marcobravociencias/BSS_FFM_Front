<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html ng-app="reportesPIApp">
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
      
        <link rel="icon" type="image/png" sizes="192x192"   href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>

        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.print.min.css" rel="stylesheet" media="print" />
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/scheduler.min.css" rel="stylesheet" />
        
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"  rel="stylesheet" />     

        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">

        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">

        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/style.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/proton/style.css" rel="stylesheet" />
        
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css" rel="stylesheet">
        
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/reportesPI/mainReportes.css"  rel="stylesheet"/>
        
</head>
<body id="idBody" ng-controller="reportesController">
<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
<div class="container-fluid">
	<div class="row">
		<div class="col-2">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link active" id="opcion-otspi-tab" data-toggle="pill" href="#opcion-otspi" role="tab" aria-controls="opcion-otspi" aria-selected="true">OTS Planta Internas</a>
                        <a class="nav-link" id="opcion-tecnico-tab" data-toggle="pill" href="#opcion-tecnico" role="tab" aria-controls="opcion-tecnico" aria-selected="false">T&eacute;cnico</a>
                    	<a class="nav-link" id="opcion-coordinador-tab" data-toggle="pill" href="#opcion-coordinador" role="tab" aria-controls="opcion-coordinador" aria-selected="false">Coordinador</a>
                    	<a class="nav-link" id="opcion-tecnicoaux-tab" data-toggle="pill" href="#opcion-tecnicoaux" role="tab" aria-controls="opcion-tecnicoaux" aria-selected="false">T&eacute;cnico auxiliar</a>
                    	<a class="nav-link" id="opcion-ordenesT-tab" data-toggle="pill" href="#opcion-ordenesT" role="tab" aria-controls="opcion-ordenesT" aria-selected="false">&Oacute;rdenes Terminadas</a>
                    	<a class="nav-link" id="opcion-ordenesI-tab" data-toggle="pill" href="#opcion-ordenesI" role="tab" aria-controls="opcion-ordenesI" aria-selected="false">&Oacute;rdenes Integrador</a>
                    	<!-- <a class="nav-link" id="opcion-ordenesU-tab" data-toggle="pill" href="#opcion-ordenesU" role="tab" aria-controls="opcion-ordenesU" aria-selected="false">&Oacute;rdenes Universales</a>
                    	<a class="nav-link" id="opcion-hist-tab" data-toggle="pill" href="#opcion-hist" role="tab" aria-controls="opcion-hist" aria-selected="false">Reporte Historico OT</a>
                    	<a class="nav-link" id="opcion-detenciones-tab" data-toggle="pill" href="#opcion-detenciones" role="tab" aria-controls="opcion-detenciones" aria-selected="false">Reporte Detenciones</a>  -->
                    	
                    
                    </div>
                </div>
                <div class="col-10">
                    <div class="tab-content" id="v-pills-tabContent">
                    	<div class="tab-pane fade show active" id="opcion-otspi" role="tabpanel" aria-labelledby="opcion-otspi-tab">
                    		<h3 class="text-center">Reporte Ordenes de Trabajo Planta Interna</h3>
                    		<hr/>
                    		<table id="table_ot_pi" class="display table table-hover" cellspacing="0" width="100%"></table>
                    	</div>
                    	<div class="tab-pane fade show" id="opcion-tecnico" role="tabpanel" aria-labelledby="opcion-tecnico-tab">
                    		<h3 class="text-center">Reporte por T&eacute;cnico</h3>
                    		<hr/>
                           
                           <table id="table_reporte_tecnicos" class="display table table-hover" cellspacing="0" width="100%">
                           
                           </table>
                    	</div>
                    	<div class="tab-pane fade show" id="opcion-coordinador" role="tabpanel" aria-labelledby="opcion-coordinador-tab">
                    		<h3 class="text-center">Reporte Coordinador</h3>
                    		<hr/>
                    		<table id="table_coordinador" class="display table table-hover" cellspaciong="0" width="100%">
                    		</table>
                    	</div>
                    	<div class="tab-pane fade show" id="opcion-tecnicoaux" role="tabpanel" aria-labelledby="opcion-tecnicoaux-tab">
                    		<h3 class="text-center">Reporte T&eacute;cnico Auxiliar</h3>
                    		<hr/>
                    		<table id="table_tecnico_aux" class="display table table-hover" cellspaciong="0" width="100%">
                    		</table>
                    	</div>
                    	<div class="tab-pane fade show" id="opcion-ordenesT" role="tabpanel" aria-labelledby="opcion-ordenesT-tab">
                    		<h3 class="text-center">Reporte Ordenes Terminadas</h3>
                    		<hr/>
                    		<table id="table_ordenes_terminadas" class="display table table-hover" cellspaciong="0" width="100%">
                    		</table>
                    	</div>
                    	<div class="tab-pane fade show" id="opcion-hist" role="tabpanel" aria-labelledby="opcion-ordenesI-tab">
                    		<h3 class="text-center">Reporte OT Integrador</h3>
                    		<hr/>
                    		<table id="table_ordenes_integrador" class="display table table-hover" cellspaciong="0" width="100%">
                    		</table>
                    		
                    	</div>
                    	<!-- <div class="tab-pane fade show" id="opcion-ordenesU" role="tabpanel" aria-labelledby="opcion-ordenesU-tab">
                    		<h3 class="text-center">Reporte OT Universal</h3>
                    	</div>
                    	<div class="tab-pane fade show" id="opcion-otspi" role="tabpanel" aria-labelledby="opcion-hist-tab">
                    		<h3 class="text-center">Reporte Historico OT</h3>
                    	</div>
                    	<div class="tab-pane fade show" id="opcion-detenciones" role="tabpanel" aria-labelledby="opcion-detenciones-tab">
                    		<h3 class="text-center">Reporte Detenciones</h3>
                    	</div> -->
                    	
                    </div>
                </div>
		</div>
	</div>
</body>
<!-- LIBRERIAS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <!-- ARCHIVOS JS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesPI/reportesPIController.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesPI/reportesPIService.js"></script>
	<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
</html>