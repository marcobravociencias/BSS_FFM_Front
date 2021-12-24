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
	<body id="idBody" class="body" ng-controller="skillsController" style="display: none;">
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
		<jsp:include page="./modals/modalSkillsSeleccionadas.jsp"></jsp:include>
		<div class="container">				
			<div class="container mt-2">
				<div class="header-modulo">
					<h5 class="title-modulo">Administraci&oacute;n de Skills</h5>
					<h1 class="h6 subtitle-modulo">En este m&oacute;dulo podr&aacute;s realizar la gesti&oacute;n de tus t&eacute;cnicos asociados</h1>
				</div>
			</div>
		</div>
		<div class="container">				
			<div class="container  container-parent-skills">
				<div class="container-icon-geografia">
					<i ng-if="istipovista==2" class="icon-geografia-top fas fa-map-marked iconoGeografia"></i> 
					<a ng-if="istipovista==2" class="text-icon-geografia-top nav-link a-navlink-navbar linkGeografia" href="" ng-click="abrirModalGeografiaTabla()">Geograf&iacute;a</a>			
				</div>
				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item">
						<a ng-click="istipovista=1" class="nav-link active" id="vistaindividual-tab" data-toggle="tab" href="#vistaindividual" role="tab"
							aria-controls="vistaindividual" aria-selected="true">Vista individual</a>
					</li>
					<li class="nav-item">
						<a ng-click="istipovista=2" class="nav-link" id="vistatabla-tab" data-toggle="tab" href="#vistatabla" role="tab"
							aria-controls="vistatabla" aria-selected="false" >Vista tabla</a>
					</li>
				</ul>
				<div class="tab-content" id="myTabContent">
					<div id="vistaindividual" class="row content-gestion-operarios tab-pane fade show active" role="tabpanel" aria-labelledby="vistaindividual-tab">						
						<div class="row">
							<div class="col-md-4">
								<div class="input-group input-group-sm content-seach-group">
									<input id="idBuscadorGeografia" type="text" class="form-control form-control-sm buscar-input-operario" placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaIndividual()"> 
									<span class="search-icon-operario-busq fa fa-search"></span>
								</div>
								<div class="scrollGeneralArbolGeografiaIndividual">
									<div id="arbolGeografiasVistaIndividual" class="proton-demo"></div>
								</div>
								<div id="divMensajeSeleccioneElemento" class="content-noseleccion">
									<i class="icono-noseleccion fas fa-exclamation-circle me-2"></i> <b class="text-no-seleccion-geografia">No has seleccionado un elemento correcto</b>
								</div>
							</div>
							<div id="divContenedorTecnicos" class="col-md-4">
								<div class="input-group input-group-sm content-seach-group">
									<input id="buscadorTecnicoConsultaVistaIndividual" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarTecnico" placeholder="Buscar T&eacute;cnico"> 
									<span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
								</div>
								<div class="tecnicos-container">
									<div class="scrollGeneral" id="divTecnicos" style="display: none">
										<div ng-repeat="tecnico in tecnicosMostradas | filter:buscarTecnico track by $index" class="user-section">
											<div id="{{tecnico.idUsuario}}" class="valign-wrapper tecnicosDiv">
												<div class="col-2 media-image online pr-0">
													<img src="{{tecnico.urlFotoPerfil !=undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle z-depth-2 responsive-img">
												</div>
												<div id="{{tecnico.idUsuario}}" class="col-10 pl-0" ng-click="consultarSkillsAsignadasTecnico(tecnico.idUsuario, tecnico.nombre, tecnico.apellidoPaterno, tecnico.apellidoMaterno)">
													<p class="text-tecnico-nombre">{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}</p>
													<p class="text-adds-teccnico">{{tecnico.no_empleado ? tecnico.no_empleado : 'Sin dato'}} - {{tecnico.geografia}}</p>
												</div>
												<div id="checkTecnicoSeleccionado{{tecnico.idUsuario}}"	class="content-checkbox-operario checkTecnicoSeleccionado" style="display: none">
													<input class="form-check-input input-operario-checkbox" type="checkbox" checked="checked" disabled="disabled" />
												</div>
											</div>
										</div>
									</div>
									<div id="divContadorTecnicos" style="margin: 10px; text-align: right; display: none">
										<span id="contadorTecnicos"></span>
									</div>
									<div id="divMensajeSeleccionaGeografia" class="content-noseleccion">
										<i class="icono-noseleccion fas fa-exclamation-circle me-2"></i> <b class="text-no-seleccion-geografia">Selecciona una geograf&iacute;a</b>
									</div>
								</div>
							</div>
							<div id="divSkills" class="col-md-4">
								<div class="input-group input-group-sm content-seach-group">
									<input id="buscadorSkillConsultaVistaIndividual" type="text" class="form-control form-control-sm buscar-input-operario" placeholder="Buscar skill" ng-keyup="busquedaSkillsIndividual()"> <span class="search-icon-operario-busq fa fa-search"></span>
								</div>
								<div id="divContenedorSkills" style="display: none">
									<div class="row">
										<div class="col-md-7" style="padding-right: 2em;">
										</div>
										<div class="col-md-5">
											<div style=" text-align: right;">
												<a class="multiseleccion-interve" ng-click="mostrarContenedoresMultiseleccion()" href="">Multiselecci&oacute;n</a>
											</div>
										</div>
									</div>
									<div class="intervenciones-container scrollGeneral">
										<div id="arbolSkillsVistaIndividual" class="jstree-proton-3 proton-demo" ng-click="contadorSkillsVistaIndividual()">
										</div>
									</div>
								</div>
								<div id="divMensajeSeleccionaTecnico" class="content-noseleccion">
									<i class="icono-noseleccion fas fa-exclamation-circle me-2"></i> <b class="text-no-seleccion-geografia">Selecciona un t&eacute;cnico</b>
								</div>
								<div id="divBotonGuardarSkills" style="display: none;">
									<div style="margin: 10px; text-align: right;">
										<a id="txtContadorSkillsSeleccionadas" class="seleccion-skills" ng-click="abrirModalSkillsSeleccionadas()" href="">Skills seleccionadas: {{contadorSkillsSeleccionadas}}</a>
									</div>
									<div style="text-align: right;">
										<input type="button" class="btn btn-primary" ng-click="guardarAsignacionSkillsIndividual()" value="GUARDAR">
									</div>
								</div>
							</div>	
						</div>
					</div>
					<div id="vistatabla" class="row content-gestion-operarios tab-pane fade" role="tabpanel" aria-labelledby="vistatabla-tab" >
						<div id="contenedorTablaSkilssVistaTabla" >
							<div class="row">
								<div class="col-md-3">
									<div class="input-group input-group-sm content-seach-group  ">
										<input type="text" id="idBuscadorTecnicoTabla" class="form-control form-control-sm buscar-input-operario" ng-keyup="busquedaTecnicoTabla()" placeholder="Buscar T&eacute;cnico">
										<span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
									</div>
								</div>
								<div class="col-md-7" style="text-align: center;">
									<i class="fas fa-arrow-left  iconoFlechaScroll" ng-click="moverScrollHorizontalIzquierda()"></i> 
									<i class="fas fa-arrow-right  iconoFlechaScroll" ng-click="moverScrollHorizontalDerecha()"></i>
								</div>
								<div class="col-md-2">
									<div style="text-align: right;">
										<i class="fas fa-eye iconoFlechaScroll iconoMostrarColumnas" ng-click="mostrarTodasColumnasIcono()"><span class="tooltipIconoMostrarColumnas">Mostrar todas las columnas</span></i> 
										<i class="fas fa-columns iconoFlechaScroll iconoMostrarOcultarColumnas"	ng-click="abrirModalSkillsFiltroTabla()"><span class="tooltipIconoMostrarOcultarColumnas">Mostrar / ocultar columnas</span></i>
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
														<th class="zui-text-cabeceras" scope="col" style="text-align: center" ng-repeat="intervencion in listadoIntervenciones | orderBy:'nombre' track by $index">
															<span class="txtCabeceraTabla" ng-click="seleccionarSkillTodosTecnicos(intervencion.id)">{{intervencion.nombre}} <span class="tooltipTxtCabeceraTabla">Seleccionar todos</span></span> <i class="fas fa-eye-slash iconoOjoColumna" ng-click="displayColumnaIndividual($index+2)"><span class="tooltipIconoOjoColumna">Ocultar columna</span></i>
														</th>
														<th class="columnheader-table" ></th>
													</tr>
												</thead>
												<tbody id="bodyTabla">
													<tr ng-repeat="tecnico in listaTecnicosTabla | filter: buscarTecnicoTabla" class="zui-sticky-tr trTecnico">
														<td class="zui-sticky-body zui-text-cabeceras nombreTecnico" data-toggle="tooltip" data-placement="top" 
															title="{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}">
															<span class="nombre-tecnico-table">{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}} </span>															
														</td>
														<td class="zui-sticky-cuerpo" ng-repeat="skill in tecnico.todasSkills | orderBy:'nombre' track by $index"  ng-click="checkIntervencionTecnicoTabla(skill)" style="text-align: center" scope="col">
															<input id="{{skill.idCheck}}" class="form-check-input checkbox-intervenciones" type="checkbox" ng-model="skill.checkTabla" ng-init="check = skill.checkTabla" >
														</td>
														<td class="zui-sticky-body-final">
															<button class="btn btn-sm btn-guardar-cambios"  ng-click="guardarAsignacionSkillIndividualTabla(tecnico)">
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
										<input type="range" min="0" max="100" class="slider" id="myRange" ng-change="moverSlider()" ng-model="valorSlider">
									</div>
								</div>
								<div class="col-md-12" style="text-align: right;">
									<button class="btn btn-primary" ng-click="guardarAsignacionTablaCompleta()">GUARDAR TODO</button>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div id="divMensajeSeleccionaGeografiaVistaTabla" class="content-noseleccion">
									<i class="icono-noseleccion fas fa-exclamation-circle me-2"></i> <b class="text-no-seleccion-geografia">Selecciona una geograf&iacute;a</b>
								</div>
							</div>
						</div>		
					</div>
				</div>			
			</div>	
		</div>
	
        <!-- MULTISELECCION -->
        <div id="modalMultiseleccion" class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Multiselecci&oacute;n</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click="regresarContenedorIndividual()"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6" style="padding-right: 2em;">
                                    <div class="input-group input-group-sm content-seach-group  ">
                                        <input id="buscadorTecnicoMultiseleccion" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarTecnico" placeholder="Buscar T&eacute;cnico"> <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
                                    </div>
                                    <div class="tecnicos-container">
                                        <div class="scrollGeneral" id="divTecnicos">
                                            <div class=" valign-wrapper">
                                                <div class="col-12 pl-0">
                                                    <p class="text-todos-nombre">Seleccionar todos</p>
                                                </div>
                                                <div class="content-checkbox-operario">
                                                    <input class="form-check-input input-todos-checkbox" type="checkbox" id="checkTotdosTecnicos" value="option1" ng-click="seleccionarTodosTecnicos()" />
                                                </div>
                                            </div>
                                            <div ng-repeat="tecnico in tecnicosMostradas | filter:buscarTecnico track by $index" class="user-section">
                                                <div id="{{tecnico.idUsuario}}" class="valign-wrapper tecnicosDiv" style="height: 50px;">
                                                    <div class="col-md-2 media-image online pr-0">
                                                        <img src="{{tecnico.urlFotoPerfil !=undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle z-depth-2 responsive-img">
                                                    </div>
                                                    <div id="{{tecnico.idUsuario}}" class="col-md-10 pl-0" ng-click="seleccionarTecnicoMultiseleccion(tecnico.idUsuario)">
                                                        <label   class="text-tecnico-nombre-modal">{{tecnico.nombre}}</label>
														<label   class="text-adds-teccnico-modal">{{tecnico.no_empleado ? tecnico.no_empleado : 'Sin dato'}} - {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}</label>
                                                    </div>
                                                    <div class="content-checkbox-operario">
                                                        <input class="form-check-input input-operario-checkbox checkedTecnicos" type="checkbox"	id="checkTecnicoMultiseleccion{{tecnico.idUsuario}}" value="{{tecnico.idUsuario}}" checked="checked"/>
                                                    </div>
                                                </div>
                                            </div>	
                                        </div>
                                        <div id="divContadorTecnicos" style="margin: 10px; text-align: right;">
                                            <span id="contadorTecnicosMultiseleccion"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6" style="padding-left: 2em;">
                                    <div class="input-group input-group-sm content-seach-group">
                                        <input id="buscadorSkillsMultiseleccion" type="text" class="form-control form-control-sm buscar-input-operario" placeholder="Buscar skill" ng-keyup="busquedaSkillsMultiseleccion()"> 
                                        <span class="search-icon-operario-busq fa fa-search"></span>
                                    </div>
                                    <div id="divContenedorSkills2" class="scrollGeneral">
										<div id="arbolSkillsMultiseleccion" class="jstree-proton-3 proton-demo" ng-click="contadorSkillsMultiseleccion()">
										</div>
                                    </div>

                                    <div id="divBotonGuardarSkills">
                                        <div style="margin: 10px; text-align: right;">
                                            <span id="txtContadorSkillsMultiseleccion">Skills seleccionadas: {{contadorSkillsSeleccionadasMultiseleccion}}</span>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal" ng-click="regresarContenedorIndividual()">CERRAR</button>
                                            <button class="btn btn-primary btn-aceptar-modal" ng-click="guardarAsignacionSkillsMultiseleccion()">GUARDAR</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<!-- MODAL GEOGRAF�A VISTA TABLA -->
		<div id="modalGeografiaTabla" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Geograf&iacute;a</h5>
						<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click="cerrarModalGeografiaTabla()"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="row">
								<div class="col-md-12">
									<div class="input-group input-group-sm content-seach-group">
										<input id="idBuscadorGeografiaVistaTabla" type="text" class="form-control form-control-sm buscar-input-operario" placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaVistaTabla()"> <span class="search-icon-operario-busq fa fa-search"></span>
									</div>
									<div class="scrollGeneral">
										<div id="arbolGeografiasVistaTabla" class="proton-demo">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal" ng-click="cerrarModalGeografiaTabla()">CERRAR</button>
					</div>
				</div>
			</div>
		</div>

		<!-- MODAL SKILLS COLUMNAS VISTA TABLA -->
		<div id="modalSkillsFiltroTabla" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Columnas</h5>
						<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click="cerrarModalSkillsFiltroTabla()"></button>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="input-group input-group-sm content-seach-group">
								<input type="text" id="txtBusquedaSkillFiltro" class="form-control form-control-sm buscar-input-operario" ng-keyup="busquedaSkillFiltro()" placeholder="Buscar skill">
								<span class="search-icon-operario-busq fa fa-search"></span>
							</div>
							<div class="row contenedorCheckTodasSkillsFiltro">
								<div class="col-md-1" style="text-align:right;">
									<input id="checkOcultarMostrarColumnasTabla" type="checkbox" checked="checked" ng-click="ocultarMostrarTodasColumnas()" />
								</div>
								<div class="col-md-11">
									<p class="textoMostrarTodas" ng-click="ocultarMostrarTodasColumnasTexto()"><strong>MOSTRAR TODAS</strong></p>
								</div>
							</div>
							<div id="divContenedorSkills" class="scrollGeneral">
								<div class="intervenciones-container">
									<div ng-repeat="intervencion in listadoIntervencionesFiltro | orderBy:'nombre' track by $index" class="row rowSkillFiltro">
										<div class="col-md-10 intervencion-col">
											<h5 class="text-intervencion-title nombreSkillFiltro" ng-bind="intervencion.nombre"></h5>
										</div>
										<div class="col-md-2 intervencion-col">
											<div class="form-check-sm form-check form-switch">
												<input id="checkSkillFiltro{{$index+2}}" class="form-check-input form-check-input-sm checkSkillsVistaTabla" type="checkbox" ng-click="displayColumna($index+2)" checked="checked" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"	data-mdb-dismiss="modal" ng-click="cerrarModalSkillsFiltroTabla()">CERRAR</button>
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
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
	<!-- ARCHIVOS JS -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/skillsController.js?" charset="UTF-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/skillsService.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/skillsAdms/jsonSkills.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDespachoService.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<script	src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
</html>