<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
	<!DOCTYPE html>
	<html ng-app="tercerosGenericApp">

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>FFM Total play</title>

		<!-- LIBRERIAS CSS -->
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
		<link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css"
			rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css"
			rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css"
			rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css"
			rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css"
			rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
			rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css"
			rel="stylesheet">
		<link
			href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
			rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
			rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
			rel="stylesheet" />
		<!-- CSS INTERNAS -->
		<link
			href="${pageContext.request.contextPath}/resources/css/generic/tercerosGeneric/mainTercerosGeneric.css?v=${sessionScope.versionDepl}"
			rel="stylesheet">

	</head>

	<body id="idBody" ng-controller="tercerosGenericController" style="display: none;">
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
		<div class="container" id="container_terceros_generic">
			<div class="container-fluid container-filtros-generic">
				<div class="row">
					<div style="width: 1em;" ng-if="!filtrosGeneral.tipoOrdenes || !filtrosGeneral.tipoOrdenes.length">
						<i class="icono-noseleccion fas fa-exclamation-circle me-2"
							style="margin-top: .8em;margin-left: -.5em;"
							title="No se encontro el catalogo de Intervencion"></i>
					</div>
					<div class="col-1 columna-filtro-ind">
						<div class="dropdown">
							<input readonly data-mdb-toggle="dropdown" aria-expanded="false"
								placeholder="Intervenci&oacute;n" type="text" id="filtro-intervencion"
								class="input-filtro-generic form-control form-control-sm" />
							<ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">
								<li style="text-align: center;">
									<button ng-click="seleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes)"
										id="todo_filtro" type="button"
										class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
									<button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes)"
										id="ninguno_filtro" type="button"
										class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
								</li>
								<li class="elemento_menu dropdown-divider"></li>
								<li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"
									class="element-menu-filter">
									<label class="dropdown-item form-check-inputfiltro">
										<input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.tipoOrdenes)
											id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
											ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
										<span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro"
											href="#" ng-bind="filtro.nombre"></span>
									</label>
									<ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
										ng-include="'filtroIntervencion.html'" class="dropdown-menu"></ul>
									<ul class="dropdown-menu">
										<!--li  ng-repeat="subfiltro in filtro.children" class="element-menu-filter">
                                        <label  class="dropdown-item form-check-inputfiltro">
                                            <input ng-click=setCheckSubFiltroGeneric(subfiltro,filtro) id="subfiltrotext-{{subfiltro.id}}" class="form-check-input" type="checkbox" ng-model="subfiltro.checkedOpcion" ng-checked="subfiltro.checkedOpcion"    />
                                            <span  for="subfiltrotext-{{subfiltro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltro.nombre"></span>
                                        </label>
                                    </li-->
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<div style="width: 1em;"
						ng-if="!filtrosGeneral.estatusdisponibles || !filtrosGeneral.estatusdisponibles.length">
						<i class="icono-noseleccion fas fa-exclamation-circle me-2"
							style="margin-top: .8em;margin-left: -.5em;"
							title="No se encontro el catalogo de Estatus"></i>
					</div>
					<div class="col-1 columna-filtro-ind">
						<div class="dropdown">
							<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Estatus"
								type="text" id="filtro-estatus"
								class="input-filtro-generic form-control form-control-sm" />
							<ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus">
								<li style="text-align: center;">
									<button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles)"
										id="todo_filtro" type="button"
										class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
									<button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles)"
										id="ninguno_filtro" type="button"
										class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
								</li>
								<li class="elemento_menu dropdown-divider"></li>
								<li ng-repeat="filtro in filtrosGeneral.estatusdisponibles " class="element-menu-filter"
									class="element-menu-filter">
									<label class="dropdown-item form-check-inputfiltro">
										<input
											ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusdisponibles)
											id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
											ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
										<span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro"
											href="#" ng-bind="filtro.nombre"></span>
									</label>
									<ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
										ng-include="'filtroEstatus.html'" class="dropdown-menu"></ul>
								</li>
							</ul>
						</div>
					</div>
					<div style="width: 1em;"
						ng-if="!filtrosGeneral.turnosdisponibles || !filtrosGeneral.turnosdisponibles.length">
						<i class="icono-noseleccion fas fa-exclamation-circle me-2"
							style="margin-top: .8em;margin-left: -.5em;"
							title="No se encontro el catalogo de Turno"></i>
					</div>
					<div class="col-1 columna-filtro-ind">
						<div class="dropdown">
							<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Turno"
								type="text" id="filtro-turno"
								class="input-filtro-generic form-control form-control-sm" />
							<ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-turno">
								<li ng-repeat="turno in filtrosGeneral.turnosdisponibles " class="element-menu-filter"
									class="element-menu-filter">
									<label class="dropdown-item form-check-inputfiltro">
										<input id="filtrotext-turno-{{turno.id}}" class="form-check-input"
											type="checkbox" value="" ng-model="turno.checkedOpcion"
											ng-checked="turno.checkedOpcion" />
										<span for="filtrotext-turno-{{turno.id}}" class="dropdown-item item-text-filtro"
											href="#" ng-bind="turno.nombre"></span>
									</label>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-1 columna-filtro-ind">
						<input readonly placeholder="Selecciona fecha" type="text" id="txtFechaInicioConsulta"
							class="datepicker input-filtro-generic form-control form-control-sm" />
					</div>
					<div class="col-1 columna-filtro-ind">
						<input readonly placeholder="Selecciona fecha" type="text" id="txtFechaFinConsulta"
							class="datepicker input-filtro-generic form-control form-control-sm" />
					</div>
					<div style="width: 1em;" ng-if="!listadogeografiacopy || !listadogeografiacopy.length">
						<i class="icono-noseleccion fas fa-exclamation-circle me-2"
							style="margin-top: .8em;margin-left: -.5em;"
							title="No se encontro el catalogo de Geografia"></i>
					</div>
					<div class="col-1 columna-filtro-ind">
						<input ng-click="abrirModalGeografia()" readonly placeholder="Geograf&iacute;a" type="text"
							id="filtro-geografia" class="input-filtro-generic form-control form-control-sm" />
					</div>
					<div class="col-1 ">
						<button ng-click="consultarOTsTercerosGeneric()" id="buscar-ots" type="button"
							class="btn btn-sm  btn-primary  waves-effect waves-light">
							Buscar
						</button>
					</div>
				</div>
			</div>
			<div class="col-md-12 row contenedoresFila">
				<div class="col-md-4">
					<div class="row">
						<div class="col-md-12 container_informacion_ot">
							<div class="input-group input-group-sm contenedorBuscadorGeneral">
								<input id="txtBuscadorOtsConsultaTabla" type="text"
									class="form-control txtBusquedaGeneral" placeholder="Buscar OT"
									ng-keyup="busquedaOtsConsultaTabla($event)">
								<span class="fa fa-search iconoBusquedaGeneral"></span>
							</div>
							<div id="scrollTablaOtsPendientesConsulta" class="scrollTablaOtsPendientesConsulta">
								<table id="tablaOtsConsultaGeneral">
									<thead>
										<tr>
											<th></th>
										</tr>
									</thead>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-8 p-0 pt-4">
					<div ng-show="!mostrarNavAccionesDetalleOtPendiente" class="col-md-12 container_sin_informacion_ot">
						<h5 id="tituloInformacionOt"><strong>SIN SELECCI&Oacute;N DE OT</strong></h5>
						<hr>
						</hr>
						<p class="parrafoSinInformacionOt">Selecciona una OT y podr&aacute;s visualizar las siguientes
							opciones:</p>
						<div id="contenedorParrafosSinInformacionOt">
							<p class="parrafoSinInformacionOt">Informaci&oacute;n de la OT</p>
							<p class="parrafoSinInformacionOt">Detalles de la Instalaci&oacute;n</p>
							<p class="parrafoSinInformacionOt">Hist&oacute;rico</p>
							<p class="parrafoSinInformacionOt">Comentarios</p>
							<p class="parrafoSinInformacionOt">Evidencia</p>
							<p class="parrafoSinInformacionOt">Asignaci&oacute;n de equipos</p>
						</div>
						<p class="parrafoSinInformacionOtFooter">* Si la OT a&uacute;n no se encuentra <FONT
								COLOR="red">terminada</FONT> solo podr&aacute;s visualizar la Informaci&oacute;n de la
							OT</p>
					</div>
					<div ng-show="mostrarNavAccionesDetalleOtPendiente" class="col-md-12 containerInformacionDetalleOt">
						<div class="tab-content">
							<div class="tab-pane fade show active" id="contentInformacionDetalle">
								<jsp:include page="./content/informacionDetalle.jsp"></jsp:include>
							</div>
							<div class="tab-pane fade" id="contentDetalleIncidencia">
								<jsp:include page="./content/detalleIncidencia.jsp"></jsp:include>
							</div>
							<div class="tab-pane fade" id="contentHistoricoDetalle">
								<h5 id="tituloInformacionOt">Historico</h5>
							</div>
							<div class="tab-pane fade" id="contentComentariosDettalle">
								<h5 id="tituloInformacionOt">Comentrios</h5>
							</div>
							<div class="tab-pane fade" id="contentArchivosDetalle">
								<h5 id="tituloInformacionOt">Archivos</h5>
							</div>
							<div class="tab-pane fade" id="contentAccionesDetalle">
								<h5 id="tituloInformacionOt">Acciones</h5>
							</div>
							<div class="tab-pane fade" id="contentRechazoDetalle">
								<h5 id="tituloInformacionOt">Rechazo</h5>
							</div>
							<div class="tab-pane fade" id="contentPausaDetalle">
								<h5 id="tituloInformacionOt">Pausa</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<jsp:include page="./modal/modalFiltroGeografia.jsp"></jsp:include>
		<jsp:include page="./modal/modalDetalleInformacionOtPendiente.jsp"></jsp:include>
	</body>
	<jsp:include page="../../generic/filtros/filtros.jsp"></jsp:include>


	<!-- LIBRERIAS JS -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>

	<!-- ARCHIVOS JS INTERNOS -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
	<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script
		src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/generic/tercerosGeneric/tercerosGenericController.js?v=${sessionScope.versionDepl}"
		charset="UTF-8"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/generic/tercerosGeneric/tercerosGenericService.js?v=${sessionScope.versionDepl}"
		charset="UTF-8"></script>

	</html>