<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="disponibilidadApp">

<head>
	<meta charset="ISO-8859-1">
	<title>FFM Total play</title>
	<link rel="icon" type="image/png" sizes="192x192"
		href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32"
		href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96"
		href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16"
		href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
	<link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/plantainterna/disponibilidad/styleDisponibilidad.css"
		rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/css/plantainterna/disponibilidad/responsiveComponents.css"
		rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css"
		rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css"
		rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css"
		rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
		rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/alertify/css/alertify.min.css" rel="stylesheet">
	<link
		href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
		rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
	<link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
</head>

<body ng-controller="disponibilidadController">
	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>

	<div class="container-fluid container-filtros-disponibilidad" id="container_consulta_disponbilidad">
		<div class="container-fluid">
			<div class="row md-form" id="filters-dispo">
				<div class="col-sm-3 columna-filtro-ind" data-step="11"
					data-intro="Opci&oacute;n compa&ntilde;ia" id="filtroCompania">
					<select id="compania_select"
						class="form-control-sm input-filtro-disponibilidad form-control"
						placeholder="Compañia" required>
						<option value="-1">Seleccione Compa&ntilde;&iacute;a...</option>
						<option value="2">TotalPlay Empresarial </option>
					</select>
				</div>
				<div id="tipo_intervencion" class="col-sm-3 columna-filtro-ind"
					data-intro="Opci&oacute;n tipo de intervenci&oacute;n">
					<select id="tipo_select"
						class="form-control-sm input-filtro-disponibilidad form-control"
						ng-model="intervencionSelect" ng-change="intervencionSelecion()"
						ng-options="elemento.Descripcion for elemento in arrayIntervencion" required>
						<option value="">Seleccione Intervenci&oacute;n...</option>
					</select>
				</div>
				<div id="container_arbol_dispo_consulta" class="col-sm-3 columna-filtro-ind"
					data-intro="Opci&oacute;n tipo de intervenci&oacute;n">
					<input type="text" readonly id="arbol_disponibilidad_consulta"
						style="background: white;cursor: pointer"
						class="input-filtro-disponibilidad form-control form-control-sm"
						aria-describedby="emailHelp" placeholder="Seleccione">
				</div>
				<div class="col-3" style="margin-top: 1.5px;">
					<button id="btn-consultar-disponibilidad" type="button"
					class="btn btn-sm btn-primary"
					style="margin-top: 0; margin: 0 !important;">
						<i class="fa fa-search"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
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
										<br />
										<div class="container-fluid">
											<div class="row justify-content-between disponibilidad active">
												<div class="col-12">
													<h6 class="fontStyleAzul alineacion_inline ">Disponibilidad:</h5>
														<h6 class="alineacion_inline info-disp-sec"
															id="disponibilidad_span">Sin info.</h6>
												</div>
												<div class="col-12 ">
													<h6 class="fontStyleAzul alineacion_inline ">Intervenci&oacute;n:</h5>
														<h6 class="alineacion_inline info-disp-sec" id="intervencion_span">
															Sin info.</h6>
												</div>
											</div>
											<br />
											<div class="row align-items-start">
												<div class="col-12">
													<strong class="fontStyleAzul alineacion_inline ">Matutino:
													</strong><small class="alineacion_inline info-disp-sec"
														id="matutino_dispo">Sin info.</small>
												</div>
												<div class="col-12 ">
													<strong class="fontStyleAzul alineacion_inline ">Vespertino:
													</strong><small class="alineacion_inline info-disp-sec"
														id="vespertino_dispo">Sin info.</small>
												</div>
												<div class="col-12 ">
													<strong class="fontStyleAzul alineacion_inline ">Nocturno:
													</strong><small class="alineacion_inline info-disp-sec"
														id="nocturno_dispo">Sin info.</small>
												</div>
												<div class="col-12 a">
													<strong class="fontStyleAzul alineacion_inline ">Total Capacidad:
													</strong><small class="alineacion_inline info-disp-sec"
														id="total_dispo">Sin info.</small>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
								<br />
								<div id="container_table_disponibilidad">
									<div class="table-responsive">
										<table id="datatable_disponibilidad" class="table table table-hover table-striped">
											<thead>
												<tr>
													<th>Fecha Disponibilidad</th>
													<th>Matutino </th>
													<th>Vespertino</th>
													<th id="theadnocturno">Nocturno</th>
													<th>Capacidad d&iacute;a</th>
													<th>Estatus</th>
													<th>Agendado ( M )</th>
													<th>Agendado ( V )</th>
													<th id="theadnocturnoporcentaje">Nocturno ( N )</th>
													<th>Total Agendado </th>
													<th>Editar</th>
												</tr>
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

	<!-- Scripts libraries -->
	<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/alertify/alertify.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<!-- Fin -->

	<script
		src="${pageContext.request.contextPath}/resources/js/plantainterna/disponibilidad/disponibilidadController.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/plantainterna/disponibilidad/disponibilidadService.js"></script>
	<script
		src="${pageContext.request.contextPath}/resources/js/plantainterna/disponibilidad/disponibilidadCalendar.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>

</body>

</html>