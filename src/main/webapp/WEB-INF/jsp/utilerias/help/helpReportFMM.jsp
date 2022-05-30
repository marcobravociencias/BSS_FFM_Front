<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="helpReportFFMApp">

<head>
	<meta charset="ISO-8859-1">
	<title>FFM Total play</title>
	<link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
	<link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/plantainterna/disponibilidad/responsiveComponents.css?v=${sessionScope.versionDepl}" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/generic/helpReportFFM/mainHelpReportFFM.css?v=${sessionScope.versionDepl}" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/alertify/css/alertify.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
	<link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
</head>

<body ng-controller="helpReportFFMController" id="idBody" style="display: none;">
	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
	<div class="container container-title-header">
		
		<div class="header-modulo">
			<h5 class="title-modulo">Reportes</h5>
			<h1 class="h6 subtitle-modulo">En este m&oacute;dulo podr&aacute;s realizar consultas.</h1>
		</div>
	</div>
	<div class="container">

	</div>
	<div class="container">
		<div class="row">
			<div class="col-md-4">
				<!-- <label class="span-consulta"><i class="fas fa-address-card"></i> Puesto*</label> -->
				<div class="input-group">
					<select class="form-control custom-select inputSelectFormulario" id="selectTableQ" onchange="changeSelect()" aria-describedby="basic-addon3" style="height: 34px; cursor: pointer;">
						<option disabled selected>NO HAY SELECCI&Oacute;N</option>
						<option ng-repeat="item in arrayTablaName" value="{{item.toUpperCase()}}">{{item.toUpperCase()}}</option>
					</select>
				</div>
			</div>
			<div class="col-3" style="margin-top: 1.5px;">
				<button id="btn-consultar-query" type="button" class="btn btn-sm btn-primary" ng-click="consultaRequestQuery()" style="margin-top: 0; margin: 0 !important;"><i class="fa fa-search"></i></button>
			</div>
		</div>
		<div class="row" style="margin-top: 0.5em;">
			<div class="col-12">
				<textarea name="" id="" cols="143" rows="8" ng-model="queryArea"></textarea>
			</div>
		</div>
		<div class="row" style="margin-top: 0.5em;">
			<div class="table-responsive">
				<div id="divTableQuery"></div>
			</div>
		</div>
	</div>

</body>

	<!-- Scripts libraries -->
	<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
 	<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script> 
	<script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
	<script type="text/javascript"src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<!-- Fin -->

	<script src="${pageContext.request.contextPath}/resources/js/utilerias/helpReportFFM/helpReportFFMController.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
</html>