<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
   
		<link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />



        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/reportesPI/mainReportes.css?v=${sessionScope.versionDepl}"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/styleConsultaOT.css?v=${sessionScope.versionDepl}" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/timeLine.css?v=${sessionScope.versionDepl}"rel="stylesheet" />
		
		<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet">
		<link href="/FFMCLOUD/resources/css/plantainterna/generic/navbar.css" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    </head>
    
    <body id="idBody" onload="initElement();" >  
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
    
		<div class="col-md-12 style_container_reportes">
			<!--
			<div class="col-md-2" id="navbar_reportes" style="margin-top: 5px;">
				<div class="align-rigth col-md-12">
					<button id="ocultar_nav" type="button" class="close" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<ul class="list-group-flush list-group">
					<li id="link_parametros" class="list-group-item list-group-item-action elemento_link nav-link active">
						<span class="fon_size_menu">Inicio</span>
					</li>
				</ul>

			</div>
			-->
		
			<div class="col-md-12 col-lg-12 contentReport">
				<h3 class="text-center" id="titulo"></h3>
				
				<div class="wraper_table content_reporte" id="container_reporte_ordenes">
					<div class="container-fluid container-filtros-consultaot" style="padding-left: 0px; margin-left: 0px;">
						<div style="padding-left: 0;padding-right: 0;" class="content-fluid">
						</div>
					</div>
				</div>
			
				<div class="col-md-12 style_container_reportes" style="margin-left: 0px;">
					<div style="padding-left: 0;padding-right: 0;" class="content-fluid">
						<div class="row md-form" id="filtros_config">
							<div class="col-md-1 column-style-consulta borderFilterR borderAlignR" >
								<button id="link_parametros" class="form-control input-filtro-consultaOT form-control-sm btn btn-primary">Inicio</button>
							</div>
							
							<div class="col-md-1 column-style-consulta borderFilterR borderAlignR" style="width: 90px !important;" id="div_selector">
								<select id='modulo_control' class="form-control input-filtro-consultaOT form-control-sm">
									<option>Filtrar</option>
								</select>
							</div>
							
							<div class="col-md-1 column-style-consulta borderFilterR borderAlignR" >
								<button id="link_nuevo" class="form-control input-filtro-consultaOT form-control-sm btn btn-primary">Nuevo</button>
							</div>
							
							<div class="col-md-1 column-style-consulta borderFilterR borderAlignR" >
								<button id="link_eliminados" class="form-control input-filtro-consultaOT form-control-sm btn btn-primary">Eliminados</button>
							</div>
							
							<div class="col-md-1 column-style-consulta borderFilterR borderAlignR" >
								<button id="link_eventos" class="form-control input-filtro-consultaOT form-control-sm btn btn-primary">Log</button>
							</div>
						</div>
					</div>
				</div>

				
			</div>
			
			<div class="col-md-12 col-lg-12 contentReport" id='div_table'>
				<div class="col-md-12 style_container_reportes">
					<div class="container-fluid contenedor-consultaOT" style="margin-left: 0px;">
						<div class="content-fluid" id='rest_table'>
							
						</div>
					</div>
				</div>
			</div>
		</div>
    </body>
  
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosPrincipal.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosLib.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametros.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosDetalles.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosModulo.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosFiltrar.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosVersiones.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosRollback.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosGuardarCambios.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosEliminados.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosEliminar.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosActivar.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosNuevo.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/parametrosasignacion/parametrosLog.js?v=${sessionScope.versionDepl}"></script>
	
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>

	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>

	<script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
</html>
