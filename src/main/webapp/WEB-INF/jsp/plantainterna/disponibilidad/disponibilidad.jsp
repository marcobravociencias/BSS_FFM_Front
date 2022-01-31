<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="disponibilidadApp">

<head>
	<meta charset="ISO-8859-1">
	<title>FFM Total play</title>
	<link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
	<link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/plantainterna/disponibilidad/styleDisponibilidad.css?v=${sessionScope.versionDepl}" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/plantainterna/disponibilidad/responsiveComponents.css?v=${sessionScope.versionDepl}" rel="stylesheet">
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

<body ng-controller="disponibilidadController" id="idBody" style="display: none;">
	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
	<div class="container container-title-header">
		<div class="header-modulo">
			<h5 class="title-modulo">Administraci&oacute;n de disponibilidad</h5>
			<h1 class="h6 subtitle-modulo">En este m&oacute;dulo podr&aacute;s realizar la gesti&oacute;n de disponibilidad de tus cuadrillas</h1>
		</div>
	</div>
	<div class="container container-filtros-disponibilidad" id="container_consulta_disponbilidad">
		<div class="container-fluid">
			<div class="row md-form" id="filters-dispo">
				<div id="container_arbol_dispo_consulta" class="col-sm-2 columna-filtro-ind"
					data-intro="Opci&oacute;n tipo de intervenci&oacute;n">
					<label for="arbol_disponibilidad_consulta" class="label-filter">Geograf&iacute;a</label>
					<input type="text" readonly id="arbol_disponibilidad_consulta" style="background: white;cursor: pointer" class="input-filtro-disponibilidad form-control form-control-sm" aria-describedby="emailHelp" placeholder="Seleccione">
				</div>
				<div id="tipo_intervencion" class="col-sm-2 columna-filtro-ind"
					data-intro="Opci&oacute;n tipo de intervenci&oacute;n">
					<i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontro el catalogo de Intervencion" ng-show="banderaErrorIntervencion"></i><label for="tipo_select" class="label-filter">Tipo de ordenes</label>
					<input type="text" readonly id="arbol_intervencion" style="background: white;cursor: pointer" class="input-filtro-disponibilidad form-control form-control-sm" aria-describedby="emailHelp" placeholder="Seleccione">
				</div>
				<div class="col-3" style="margin-top: 1.5px;">
					<label for="tipo_select" class="label-filter" style="visibility: hidden;">Tipo de ordenes</label>
					<button id="btn-consultar-disponibilidad" type="button"
					class="btn btn-sm btn-primary"
					ng-click="consultaDisponibilidad()"
					style="margin-top: 0; margin: 0 !important;">
						<i class="fa fa-search"></i>
					</button>
				</div>
				<div class="col-4" ng-show="banderaErrorGeneral">
					<i class="icono-noseleccion fas fa-exclamation-circle me-2" style="margin-top: 1.8em;"></i> <b class="text-no-seleccion-geografia">Algunos cat&aacute;logos no han sido encontrados</b>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="container contenedor_disponibilidad">
			<div class="row">
				<div id="datos_tablas" class="col-sm-12">
					<a id="btn_mostrar_nav" class="menuOpt" style="display:none; position: absolute;">
						<i class="fa fa-bars" aria-hidden="true"></i>
					</a>
					<div class="content-fluid">
						<div style="height: 730px" class="container-fluid" id="disponibilidad_datos_inferior">
							<ul class="nav nav-tabs" id="myTab" role="tablist">
								<li class="nav-item">
									<a class="nav-link active" id="calendario-tab" data-toggle="tab" href="#home" role="tab"
										aria-controls="home" aria-selected="true">Calendario</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
										aria-controls="profile" aria-selected="false">Tabla</a>
								</li>
							</ul>
							<div class="tab-content" id="myTabContent">
								<div class="tab-pane fade show active" id="home" role="tabpanel"
									aria-labelledby="calendario-tab">
									<div class="row">
										<div class="col-9">
											<div id="calendar_disponibilidad"></div>
										</div>
										<div class="col-3">
											<table class="table table-bordered" id="tableData">
												<tbody>
													<tr>
														<td>
															<span>Disponibilidad:</span>
															<span id="disponibilidad_span" class="spanTable">Sin info.</span>
														</td>
													</tr>
													<tr>
														<td>
															<span>Tipo de orden:</span>
															<span id="intervencion_span" class="spanTable">Sin info.</span>
														</td>
													</tr>
													<tr ng-repeat="item in arrayTurnosDisponibilidad">
														<td>
															<span>{{item.nombre}}</span>
															<span id="{{item.nombre.toLowerCase()}}_disponibilidad" class="spanTable">Sin info.</span>
														</td>
													</tr>
													<tr style="background: #f4f5fc;">
														<td>
															<span>Total Capacidad:</span>
															<span id="total_dispo" class="spanTable">Sin info.</span>
														</td>
													</tr>
												</tbody>
											</table>											
										</div>
									</div>
								</div>
								<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
									<br />
									<div id="container_table_disponibilidad" class="table-responsive">
										<table id="datatable_disponibilidad" class="table table table-hover table-striped">
											<thead id="theadDispo">
												
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	

	<jsp:include page="./modals/modal_actualizar_capacidad.jsp"></jsp:include>
	<jsp:include page="./modals/modal_modifica_disponibilidad_ind.jsp"></jsp:include>
	<jsp:include page="./modals/modalClusterAgrega.jsp"></jsp:include>
	<jsp:include page="./modals/modalClusterModifica.jsp"></jsp:include>
	<jsp:include page="./modals/modalClusterConsulta.jsp"></jsp:include>
	<jsp:include page="./modals/modalArbolIntervenciones.jsp"></jsp:include>

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

	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/disponibilidad/disponibilidadController.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/disponibilidad/disponibilidadService.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/disponibilidad/disponibilidadCalendar.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
	<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
</html>