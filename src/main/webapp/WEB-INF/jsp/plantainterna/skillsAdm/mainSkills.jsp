<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html ng-app="skillsApp">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>FFM Total play</title>
		<link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16"	href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
		<link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet" />
		<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css" />
		<link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.print.min.css" rel="stylesheet" media="print" />
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/scheduler.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/fixedColumns.bootstrap.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/alertify/css/alertify.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/style.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/proton/style.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/loaders.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/css/plantainterna/skillsAdms/styleSkills.css?" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/css/plantainterna/skillsAdms/styleSkillsFeature.css?" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
	</head>
	<body class="body" ng-controller="skillsController">
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
		<jsp:include page="./modals/modalSkillsSeleccionadas.jsp"></jsp:include>
	
		<div class="container container-parent-skills">
			<div class="header-modulo">
				<h5 class="title-modulo">Administraci&oacute;n de Skills</h5>
				<h1 class="h6 subtitle-modulo">En este m&oacute;dulo
					podr&aacute;s realizar la gesti&oacute;n de tus t&eacute;cnicos
					asociados</h1>
			</div>
			<div id="divContenedorIndividual"
				class="row content-gestion-operarios tab-pane fade show active"
				role="tabpanel" aria-labelledby="divContenedorIndividual-tab">
				<header>
					<nav
						class="navbar navbar-expand-lg navbar-light bg-light navbar-menu-generic"
						style="float: right;">
						<ul class="ul-elementos-nav navbar-nav">
							<li id="li-consultaot-navbar" class="nav-item"><a
								class="nav-link a-navlink-navbar pestaniaActivada" href=""
								ng-click="verVistaIndividual()">Individual</a></li>
							<li id="li-skills-navbar" class="nav-item"><a
								class="nav-link a-navlink-navbar" href=""
								ng-click="verVistaTabla()">Vista tabla</a></li>
						</ul>
					</nav>
				</header>
				<div class="col-md-3">
					<div class="input-group input-group-sm content-seach-group">
						<input id="idBuscadorGeografia" type="text"
							class="form-control form-control-sm buscar-input-operario"
							placeholder="Buscar geograf&iacute;a"
							ng-keyup="busquedaGeografiaIndividual()"> <span
							class="search-icon-operario-busq fa fa-search"></span>
					</div>
					<div class="container-treegeofria scrollGeneral">
						<div id="jstree-proton-3" class="proton-demo"></div>
					</div>
					<div id="divMensajeSeleccioneElemento" class="content-noseleccion">
						<i class="icono-noseleccion fas fa-exclamation-circle me-2"></i> <b
							class="text-no-seleccion-geografia">No has seleccionado un
							elemento correcto</b>
					</div>
				</div>
				<div id="divContenedorTecnicos" class="col-md-4">
					<div class="input-group input-group-sm content-seach-group  ">
						<input type="text"
							class="form-control form-control-sm buscar-input-operario"
							ng-model="buscarTecnico" placeholder="Buscar OT"> <span
							class="search-icon-operario-busq fa fa-search"
							id="buscar-operario"></span>
					</div>
	
					<div class="tecnicos-container">
						<div class="scrollGeneral" id="divTecnicos" style="display: none">
							<div
								ng-repeat="tecnico in tecnicosMostradas.result.detalleTecnicos | filter:buscarTecnico track by $index "
								class="user-section">
								<div id="{{tecnico.idTecnico}}"
									class="valign-wrapper tecnicosDiv">
									<div class="col-2 media-image online pr-0">
										<img
											src="{{tecnico.urlFotoPerfil !=undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}"
											class="circle z-depth-2 responsive-img">
									</div>
									<div id="{{tecnico.idTecnico}}" class="col-10 pl-0"
										ng-click="consultarSkillsAsignadasTecnico(tecnico.idTecnico, tecnico.nombre, tecnico.apellidoPaterno, tecnico.apellidoMaterno)">
										<p class="text-tecnico-nombre">{{tecnico.nombre}}</p>
										<p class="text-adds-teccnico">{{tecnico.apellidoPaterno}}
											{{tecnico.apellidoMaterno}}</p>
									</div>
	
									<div id="checkTecnicoSeleccionado{{tecnico.idTecnico}}"
										class="content-checkbox-operario checkTecnicoSeleccionado"
										style="display: none">
										<input class="form-check-input input-operario-checkbox"
											type="checkbox" checked="checked" />
									</div>
	
								</div>
							</div>
						</div>
						<div id="divContadorTecnicos"
							style="margin: 10px; text-align: right; display: none">
							<span id="contadorTecnicos"></span>
						</div>
						<div id="divMensajeSeleccionaGeografia" class="content-noseleccion">
							<i class="icono-noseleccion fas fa-exclamation-circle me-2"></i> <b
								class="text-no-seleccion-geografia">Selecciona una geografía</b>
						</div>
					</div>
				</div>
				<div id="divSkills" class="col-md-5">
					<div class="input-group input-group-sm content-seach-group  ">
						<input type="text"
							class="form-control form-control-sm buscar-input-operario"
							ng-model="buscarSkill" placeholder="Buscar skill"> <span
							class="search-icon-operario-busq fa fa-search"></span>
					</div>
	
					<div id="divContenedorSkills" class="scrollGeneral"
						style="display: none">
						<div style="margin: 10px; text-align: right;">
							<a ng-click="mostrarContenedoresMultiseleccion()" href="">Multiselección</a>
						</div>
						<div class="intervenciones-container">
							<div
								ng-repeat="intervencion in listadoIntervenciones | filter:buscarSkill track by $index"
								class="row ">
								<div class="col-9 intervencion-col">
									<h5 class="text-intervencion-title"
										ng-bind="intervencion.descripcion"></h5>
								</div>
								<div class="col-3 intervencion-col">
									<div class="form-check-sm form-check form-switch">
										<input class="form-check-input form-check-input-sm"
											type="checkbox" id="flexSwitchCheckDefault"
											ng-model="intervencion.check" ng-true-value="1"
											ng-false-value="0"
											ng-click="sumarContador(intervencion.check)" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="divMensajeSeleccionaTecnico" class="content-noseleccion">
						<i class="icono-noseleccion fas fa-exclamation-circle me-2"></i> <b
							class="text-no-seleccion-geografia">Selecciona un técnico</b>
					</div>
					<div id="divBotonGuardarSkills" style="display: none;">
						<div style="margin: 10px; text-align: right;">
							<a ng-click="abrirModalSkillsSeleccionadas()" href="">Skills
								seleccionadas: {{contadorSkillsSeleccionadas}}</a>
						</div>
						<div style="text-align: right;">
							<input type="button" class="btn btn-primary" value="GUARDAR">
						</div>
					</div>
				</div>
	
				<!-- MULTISELECCIÓN -->
	
				<div id="modalMultiseleccion" class="modal fade bd-example-modal-xl"
					tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
					aria-hidden="true">
					<div class="modal-dialog modal-xl">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title">Multiselección</h5>
								<button type="button" class="btn-close" data-mdb-dismiss="modal"
									aria-label="Close" ng-click="regresarContenedorIndividual()"></button>
							</div>
	
							<div class="modal-body">
								<div class="container">
									<div class="row">
										<div class="col-md-5">
											<div class="input-group input-group-sm content-seach-group  ">
												<input type="text"
													class="form-control form-control-sm buscar-input-operario"
													ng-model="buscarTecnico" placeholder="Buscar OT"> <span
													class="search-icon-operario-busq fa fa-search"
													id="buscar-operario"></span>
											</div>
											<div class="tecnicos-container">
												<div class="scrollGeneral" id="divTecnicos">
													<div class=" valign-wrapper">
														<div class="col-12 pl-0">
															<p class="text-todos-nombre">Seleccionar todos</p>
														</div>
														<div class="content-checkbox-operario">
															<input class="form-check-input input-todos-checkbox"
																type="checkbox" id="checkTotdosTecnicos" value="option1"
																ng-click="seleccionarTodosTecnicos()" />
														</div>
													</div>
													<div
														ng-repeat="tecnico in tecnicosMostradas.result.detalleTecnicos | filter:buscarTecnico track by $index "
														class="user-section">
														<div id="{{tecnico.idTecnico}}"
															class="valign-wrapper tecnicosDiv">
															<div class="col-2 media-image online pr-0">
																<img
																	src="{{tecnico.urlFotoPerfil !=undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}"
																	class="circle z-depth-2 responsive-img">
															</div>
															<div id="{{tecnico.idTecnico}}" class="col-10 pl-0"
																ng-click="seleccionarTecnicoMultiseleccion(tecnico.idTecnico)">
																<p class="text-tecnico-nombre">{{tecnico.nombre}}</p>
																<p class="text-adds-teccnico">{{tecnico.apellidoPaterno}}
																	{{tecnico.apellidoMaterno}}</p>
															</div>
															<div class="content-checkbox-operario">
																<input
																	class="form-check-input input-operario-checkbox checkedTecnicos"
																	type="checkbox"
																	id="checkTecnicoMultiseleccion{{tecnico.idTecnico}}"
																	value="option1" />
															</div>
														</div>
													</div>
												</div>
												<div id="divContadorTecnicos"
													style="margin: 10px; text-align: right;">
													<span id="contadorTecnicosMultiseleccion"></span>
												</div>
											</div>
										</div>
										<div class="col-md-1"></div>
										<div class="col-md-6">
											<div class="input-group input-group-sm content-seach-group  ">
												<input type="text"
													class="form-control form-control-sm buscar-input-operario"
													ng-model="buscarSkill" placeholder="Buscar skill"> <span
													class="search-icon-operario-busq fa fa-search"></span>
											</div>
	
											<div id="divContenedorSkills2" class="scrollGeneral">
												<div class="intervenciones-container">
													<div
														ng-repeat="intervencion in listadoIntervenciones | filter:buscarSkill track by $index"
														class="row ">
														<div class="col-10 intervencion-col">
															<h5 class="text-intervencion-title"
																ng-bind="intervencion.descripcion"></h5>
														</div>
														<div class="col-2 intervencion-col">
															<div class="form-check-sm form-check form-switch">
																<input class="form-check-input form-check-input-sm"
																	type="checkbox" id="flexSwitchCheckDefault"
																	ng-model="intervencion.check" ng-true-value="1"
																	ng-false-value="0"
																	ng-click="sumarContador(intervencion.check)" />
															</div>
														</div>
													</div>
												</div>
											</div>
	
											<div id="divBotonGuardarSkills">
												<div style="margin: 10px; text-align: right;">
													<span>Skills seleccionadas:
														{{contadorSkillsSeleccionadas}}</span>
												</div>
												<div class="modal-footer">
													<button type="button"
														class="btn btn-cerrar-modal btn-secondary ripple-surface"
														data-mdb-dismiss="modal"
														ng-click="regresarContenedorIndividual()">CERRAR</button>
													<button class="btn btn-primary">GUARDAR</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	
			<div id="divContenedorTabla" class="row content-gestion-operarios"
				style="display: none">
				<header>
					<nav
						class="navbar navbar-expand-lg navbar-light bg-light navbar-menu-generic"
						style="float: left;">
						<ul class="ul-elementos-nav navbar-nav">
							<li id="li-consultaot-navbar" class="nav-item"><i
								class="fas fa-map-marked iconoGeografia"></i> <a
								class="nav-link a-navlink-navbar linkGeografia" href=""
								ng-click="abrirModalGeografiaTabla()">Geografía</a></li>
						</ul>
					</nav>
					<nav
						class="navbar navbar-expand-lg navbar-light bg-light navbar-menu-generic"
						style="float: right;">
						<ul class="ul-elementos-nav navbar-nav">
							<li id="li-consultaot-navbar" class="nav-item"><a
								class="nav-link a-navlink-navbar" href=""
								ng-click="verVistaIndividual()">Individual</a></li>
							<li id="li-skills-navbar" class="nav-item"><a
								class="nav-link a-navlink-navbar pestaniaActivada" href=""
								ng-click="verVistaTabla()">Vista tabla</a></li>
						</ul>
					</nav>
				</header>
				<div id="contenedorTablaSkilssVistaTabla" class=""
					style="display: none;">
					<div class="row">
						<div class="col-md-3">
							<div class="input-group input-group-sm content-seach-group  ">
								<input type="text"
									class="form-control form-control-sm buscar-input-operario"
									ng-model="buscarTecnicoTabla" placeholder="Buscar Técnico">
								<span class="search-icon-operario-busq fa fa-search"
									id="buscar-operario"></span>
							</div>
						</div>
						<div class="col-md-7" style="text-align: center;">
							<i class="far fa-arrow-alt-circle-left fa-2x iconoFlechaScroll"
								ng-click="moverScrollHorizontalIzquierda()"></i> <i
								class="far fa-arrow-alt-circle-right fa-2x iconoFlechaScroll"
								ng-click="moverScrollHorizontalDerecha()"></i>
						</div>
						<div class="col-md-2">
							<div style="text-align: right;">
								<i class="fas fa-eye iconoOjoVerColumnas"
									ng-click="mostrarTodasColumnasIcono()" data-toggle="tooltip"
									data-placement="top" title="Mostrar todas las columnas"></i> <i
									class="fas fa-columns iconoColumnas"
									ng-click="abrirModalSkillsFiltroTabla()" data-toggle="tooltip"
									data-placement="top" title="Mostrar / ocultar columnas"></i>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="zui-wrapper scrollVerticalTable">
								<div id="divScrollHorizontal" class="zui-scroller">
									<table id="tablaSkilssVistaTabla" class="table zui-table">
										<thead class="thead-table table-nowrap" id="idTheadTabla">
											<tr class="zui-sticky-tr">
												<th class="zui-sticky-col zui-text-cabeceras" scope="col">CUADRILLA</th>
												<th class="zui-text-cabeceras" scope="col"
													style="text-align: center"
													ng-repeat="intervencion in listadoIntervenciones track by $index">{{intervencion.descripcion}}
													<i class="fas fa-eye-slash iconoOjoColumna"
													ng-click="displayColumnaIndividual($index+2)"></i>
												</th>
											</tr>
										</thead>
										<tbody id="bodyTabla">
											<tr
												ng-repeat="tecnico in tecnicosMostradas.result.detalleTecnicos | filter: buscarTecnicoTabla"
												class="zui-sticky-tr">
												<td class="zui-sticky-body zui-text-cabeceras">{{tecnico.nombre}}
													{{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}</td>
												<td ng-repeat="skill in tecnico.todasSkills"
													style="text-align: center" scope="col"><input
													class="form-check-input" type="checkbox"
													ng-model="skill.checkTabla"
													ng-init="check = skill.checkTabla"></td>
												<td class="zui-sticky-body-final">
													<button
														style="background-color: white; border-color: #7716FA;">
														<i class="fa fa-save"></i>
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
	
					<div class="row">
						<div class="col-md-12">
							<div class="slidecontainer">
								<input type="range" min="0" max="100" class="slider" id="myRange"
									ng-change="moverSlider()" ng-model="valorSlider">
							</div>
						</div>
						<div class="col-md-12" style="text-align: right;">
							<button class="btn btn-primary" ng-click="verificar()">GUARDAR
								TODO</button>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div id="divMensajeSeleccionaGeografiaVistaTabla"
							class="content-noseleccion">
							<i class="icono-noseleccion fas fa-exclamation-circle me-2"></i> <b
								class="text-no-seleccion-geografia">Selecciona una
								geografía</b>
						</div>
					</div>
				</div>
	
				<!-- MODAL GEOGRAFÍA VISTA TABLA -->
				<div id="modalGeografiaTabla" class="modal fade" tabindex="-1"
					aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title">Geografía</h5>
								<button type="button" class="btn-close" data-mdb-dismiss="modal"
									aria-label="Close" ng-click="cerrarModalGeografiaTabla()">
								</button>
							</div>
							<div class="modal-body">
								<div class="container">
									<div class="scrollGeneral">
										<div class="input-group input-group-sm content-seach-group">
											<input id="idBuscadorGeografiaVistaTabla" type="text"
												class="form-control form-control-sm buscar-input-operario"
												placeholder="Buscar geograf&iacute;a"
												ng-keyup="busquedaGeografiaVistaTabla()"> <span
												class="search-icon-operario-busq fa fa-search"></span>
										</div>
										<div class="container-treegeofria scrollGeneral">
											<div id="arbolGeografiasVistaTabla" class="proton-demo"
												ng-click="cargarTecnicosVistaTabla()"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button"
									class="btn btn-cerrar-modal btn-secondary ripple-surface"
									data-mdb-dismiss="modal" ng-click="cerrarModalGeografiaTabla()">
									CERRAR</button>
							</div>
						</div>
					</div>
				</div>
	
				<!-- MODAL GEOGRAFÍA VISTA TABLA -->
				<div id="modalSkillsFiltroTabla" class="modal fade" tabindex="-1"
					aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title">Columnas</h5>
								<button type="button" class="btn-close" data-mdb-dismiss="modal"
									aria-label="Close" ng-click="cerrarModalSkillsFiltroTabla()">
								</button>
							</div>
							<div class="modal-body">
								<div class="container">
									<div class="input-group input-group-sm content-seach-group  ">
										<input type="text"
											class="form-control form-control-sm buscar-input-operario"
											ng-model="buscarSkillFiltro" placeholder="Buscar skill">
										<span class="search-icon-operario-busq fa fa-search"></span>
									</div>
	
									<div id="divContenedorSkills" class="scrollGeneral">
										<div class="intervenciones-container">
											<div class="row">
												<div class="col-9 intervencion-col">
													<h5 class="text-intervencion-title">
														<strong>OCULTAR / MOSTRAR TODAS</strong>
													</h5>
												</div>
												<div class="col-3 intervencion-col">
													<div class="form-check-sm form-check form-switch">
														<input id="checkOcultarMostrarColumnasTabla"
															class="form-check-input form-check-input-sm"
															type="checkbox" checked="checked"
															ng-click="ocultarMostrarTodasColumnas()" />
													</div>
												</div>
											</div>
											<div
												ng-repeat="intervencion in listadoIntervencionesFiltro | filter:buscarSkillFiltro track by $index"
												class="row">
												<div class="col-9 intervencion-col">
													<h5 class="text-intervencion-title"
														ng-bind="intervencion.descripcion"></h5>
												</div>
												<div class="col-3 intervencion-col">
													<div class="form-check-sm form-check form-switch">
														<input
															class="form-check-input form-check-input-sm checkSkillsVistaTabla"
															type="checkbox" id="flexSwitchCheckDefault"
															ng-click="displayColumna($index+2)" checked="checked" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button"
									class="btn btn-cerrar-modal btn-secondary ripple-surface"
									data-mdb-dismiss="modal"
									ng-click="cerrarModalSkillsFiltroTabla()">CERRAR</button>
							</div>
						</div>
					</div>
				</div>
	
			</div>
		</div>
	</body>
	<!-- LIBRERIAS -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-2.2.4.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.fixedColumns.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/underscore/underscore.js?"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/alertify/alertify.min.js"></script>
	<!-- ARCHIVOS JS -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/skillsController.js?" charset="UTF-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/skillsService.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/jsonSkills.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<script	src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
</html>