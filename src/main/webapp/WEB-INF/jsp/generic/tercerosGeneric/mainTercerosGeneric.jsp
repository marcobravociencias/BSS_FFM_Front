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
		<link
			href="${pageContext.request.contextPath}/resources/css/generic/tercerosGeneric/modalDetalleOt.css?v=${sessionScope.versionDepl}"
			rel="stylesheet">

	</head>

	<body id="idBody" ng-controller="tercerosGenericController" style="display: none;">
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
		<div class="container-fluid container-filtros-generic" id="container_terceros_generic">
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
									<span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
										ng-bind="filtro.nombre"></span>
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
						style="margin-top: .8em;margin-left: -.5em;" title="No se encontro el catalogo de Estatus"></i>
				</div>
				<div class="col-1 columna-filtro-ind">
					<div class="dropdown">
						<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Estatus"
							type="text" id="filtro-estatus" class="input-filtro-generic form-control form-control-sm" />
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
									<input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusdisponibles)
										id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
										ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
									<span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
										ng-bind="filtro.nombre"></span>
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
						style="margin-top: .8em;margin-left: -.5em;" title="No se encontro el catalogo de Turno"></i>
				</div>
				<div class="col-1 columna-filtro-ind">
					<div class="dropdown">
						<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Turno" type="text"
							id="filtro-turno" class="input-filtro-generic form-control form-control-sm" />
						<ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-turno">
							<li ng-repeat="turno in filtrosGeneral.turnosdisponibles " class="element-menu-filter"
								class="element-menu-filter">
								<label class="dropdown-item form-check-inputfiltro">
									<input id="filtrotext-turno-{{turno.id}}" class="form-check-input" type="checkbox"
										value="" ng-model="turno.checkedOpcion" ng-checked="turno.checkedOpcion" />
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
			<div class="row" style="background: #e4e6f2;">
				<div class="col-md-3 offset-md-9 input-group input-group-sm contenedorBuscadorGeneral">
					<input id="txtBuscadorOtsConsultaTabla" type="text" class="form-control txtBusquedaGeneral"
						placeholder="Buscar OT" ng-keyup="busquedaOtsConsultaTabla($event)">
					<span class="fa fa-search iconoBusquedaGeneral"></span>
				</div>
			</div>
			<div class="row contenedoresFila">
				<div class="col-md-3 p-0">
					<div class="col-md-12 container_informacion_ot">
						<div id="scrollTablaOtsPendientesConsulta" class="scrollTablaOtsPendientesConsulta">
							<table id="tablaOtsConsultaGeneral" style="width: 100%;">
								<thead>
									<tr>
										<th></th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
				<div class="col-md-9 mt-4">
					<div ng-show="!mostrarNavAccionesDetalleOtPendiente" class="col-md-12 container_sin_informacion_ot">
						<h5 id="tituloInformacionOt"><strong>SIN SELECCI&Oacute;N DE OT</strong></h5>
						<hr>
						</hr>
						<p class="parrafoSinInformacionOt">Selecciona una OT y podr&aacute;s visualizar la siguiente
							informaci&oacute;n:</p>
						<div id="contenedorParrafosSinInformacionOt">
							<p class="parrafoSinInformacionOt">Detalle de la OT</p>
							<p class="parrafoSinInformacionOt">Detalles de la Instalaci&oacute;n</p>
							<p class="parrafoSinInformacionOt">Hist&oacute;rico</p>
							<p class="parrafoSinInformacionOt">Comentarios</p>
							<p class="parrafoSinInformacionOt">Evidencia</p>
						</div>
					</div>
					<div ng-show="mostrarNavAccionesDetalleOtPendiente"
						class="col-md-12 containerInformacionDetalleOt p-0">
						<div class="container mr-0 ml-3">
							<div class="row">
								<div class="col-2 content-nav-menu p-0">
									<div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-detalle-ot"
										role="tablist">
										<a class="nav-link active" id="v-tabs-consulta-detalleot-tab"
											data-mdb-toggle="tab" href="#v-tabs-consulta-detalleot" role="tab"
											aria-controls="v-tabs-consulta-detalleot-tab"
											aria-selected="true">Informaci&oacute;n</a>
										<a ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1"
											class="nav-link " id="v-tabs-consulta-historico-tab" data-mdb-toggle="tab"
											href="#v-tabs-consulta-historico" role="tab" ng-click="consultarHistorial()"
											aria-controls="v-tabs-consulta-historico-tab"
											aria-selected="true">Hist&oacute;rico</a>
										<a ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1"
											class="nav-link" id="v-tabs-consulta-mensajeria-tab" data-mdb-toggle="tab"
											href="#v-tabs-consulta-mensajeria" role="tab"
											ng-click="consultarComentarios();"
											aria-controls="v-tabs-consulta-mensajeria-tab"
											aria-selected="false">Comentarios</a>
										<a class="nav-link" ng-show="permisosModal.indexOf('tabPedidoDespacho') !== -1"
											id="v-tabs-consulta-pedido-tab" data-mdb-toggle="tab"
											href="#v-tabs-consulta-pedido" role="tab" ng-click="consultarPedido();"
											aria-controls="v-tabs-consulta-pedido-tab" aria-selected="false">Pedido</a>
										<a ng-show="permisosModal.indexOf('tabInformacionPaqueteDespacho') !== -1"
											class="nav-link" id="v-tabs-consulta-paquete-tab" data-mdb-toggle="tab"
											href="#v-tabs-consulta-paquete" ng-click="obtenerPaquete()" role="tab"
											aria-controls="v-tabs-consulta-paquete-tab"
											aria-selected="false">Paquete</a>
										<a ng-show="permisosModal.indexOf('tabCambioDireccion') !== -1" class="nav-link"
											id="v-tabs-consulta-cambio-direccion-tab" data-mdb-toggle="tab"
											href="#v-tabs-consulta-cambio-direccion"
											ng-click="verMapaCambioDireccion(infoOtDetalle.direccion.latitud, infoOtDetalle.direccion.longitud)"
											role="tab" aria-controls="v-tabs-consulta-cambio-direccion-tab"
											aria-selected="false">Cambio direcci&oacute;n</a>
										<a  ng-click="consultarDetalleOtPE();" ng-show="permisosModal.indexOf('tabInspectorRed') !== -1" class="nav-link" id="v-tabs-consulta-detalle-inspector-tab" data-mdb-toggle="tab" 
											href="#v-tabs-consulta-detalle-inspector" role="tab" aria-controls="v-tabs-consulta-detalle-inspector-tab" 
											aria-selected="false">Detalle inspector</a>
										<a  ng-click="consultarDetalleOtPE();" ng-show="permisosModal.indexOf('tabOperacionDiaria') !== -1"  class="nav-link" id="v-tabs-consulta-info-gral-ot-detalle-detencion-tab" data-mdb-toggle="tab" 
											href="#v-tabs-consulta-info-gral-ot-detalle-detencion" role="tab" aria-controls="v-tabs-consulta-info-gral-ot-detalle-detencion-tab" 
											aria-selected="false">Orden detenida</a>
										<a  ng-click="consultarDetalleOtPE();" ng-show="permisosModal.indexOf('tabCorteMasivo') !== -1" class="nav-link" id="v-tabs-consulta-detalle-corte-masivo-tab" data-mdb-toggle="tab" 
											href="#v-tabs-consulta-detalle-corte-masivo" role="tab" aria-controls="v-tabs-consulta-detalle-corte-masivo-tab" 
											aria-selected="false">Detalle corte masivo</a>
										<a  ng-click="consultarDetalleOtPE();" ng-show="permisosModal.indexOf('tabOperacionDiaria') !== -1"  class="nav-link" id="v-tabs-consulta-detalle-detencion-tab" data-mdb-toggle="tab" 
											href="#v-tabs-consulta-detalle-detencion" role="tab" aria-controls="v-tabs-consulta-detalle-detencion-tab" 
											aria-selected="false">Detalle detenci&oacute;n</a>
										<a  ng-show="infoOtDetalle.idEstado =='206' || infoOtDetalle.idEstado ==206" class="nav-link"
											ng-click="consultarOrdenesPlantaExternaOTDetalle()" data-mdb-toggle="tab" href="#v-tabs-consulta-ordenesPE"
											aria-controls="v-tabs-consulta-ordenesPE-tab" aria-selected="false" id="v-tabs-consulta-ordenesPE-tab">OT planta
											externa</a>
										<a  class="nav-link"
											ng-click="consultarDictamen()" data-mdb-toggle="tab" href="#v-tabs-consulta-dictamen"
											aria-controls="v-tabs-consulta-dictamen-tab" aria-selected="false" id="v-tabs-consulta-dictamen-tab">Dictamen</a>
										<a ng-show="permisosModal.indexOf('tabAccionesOrdenDespacho') !== -1"
											class="nav-link" id="v-tabs-consulta-acciones-tab" data-mdb-toggle="tab"
											href="#v-tabs-consulta-acciones" role="tab"
											aria-controls="v-tabs-consulta-acciones-tab"
											aria-selected="false">Acciones</a>
										
									</div>
								</div>
								<div class="col-10">
									<div class="tab-content" id="v-tabs-tabsContent" style="height: 80vh;">
										<div class="tab-pane fade show active" id="v-tabs-consulta-detalleot"
											role="tabpanel" aria-labelledby="v-tabs-consulta-detalleot-tab">
											<div class="row">
												<div class="col-6">
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">OT</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.idOrden}}"
																ng-bind="infoOtDetalle.idOrden || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">OS</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.folioSistema}}"
																ng-bind="infoOtDetalle.folioSistema || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Cuenta</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.claveCliente}}"
																ng-bind="infoOtDetalle.claveCliente || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Cliente</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.nombreCliente}}"
																ng-bind="infoOtDetalle.nombreCliente || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Contacto</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.nombreContacto}}"
																ng-bind="infoOtDetalle.nombreContacto || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Fecha</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.fechaHoraProgramada}}"
																ng-bind="infoOtDetalle.fechaHoraProgramada || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Estatus</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.Status}}"
																ng-bind="infoOtDetalle.descripcionEstatus || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Estado</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.Estado}}"
																ng-bind="infoOtDetalle.descripcionEstado || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Motivo</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.Motivo}}"
																ng-bind="infoOtDetalle.descripcionMotivo || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Latitud </span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.latitud}}"
																ng-bind="infoOtDetalle.direccion.latitud || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Longitud</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.longitud}}"
																ng-bind="infoOtDetalle.direccion.longitud || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Carta
																aceptaci&oacute;n</span></div>
														<div class="container-text-content-detalle">
															<span class="text-content-terceros"
																ng-show="!infoOtDetalle.acta"
																ng-bind="'No se encontr&oacute; carta de aceptaci&oacute;n'"></span>
															<div class="content-descarga-archivo content-descarga-consulta"
																ng-show="infoOtDetalle.acta"
																style="padding-right: calc(var(--bs-gutter-x)/2); padding-left: calc(var(--bs-gutter-x)/2);">
																<a href="{{infoOtDetalle.acta}}"
																	style="cursor: pointer; text-decoration: none;"
																	class="text-title-descarga-adjuntado">
																	<i
																		class="iconoDescargaArchivo fas fa-cloud-download-alt"></i>
																	<span
																		class="textoTituloCardsConsulta text-descarga-consulta ng-binding">Descargar</span>
																</a>
															</div>
															<!--div style="padding: .5em 1em .5em .4em; width: 100%; display: flex;">
																<img src="${pageContext.request.contextPath}/resources/img/iconossf/pdf.png" style="width: 1em; height: 1em;" class="imagen-adjuntado-comentarios" alt="">
																<div class="title-file-adjuntado">
																	<a href="{{infoOtDetalle.acta}}" class="text-title-descarga-adjuntado" >Descargar</a>
																</div>
															</div-->
														</div>
													</div>

												</div>
												<div class="col-6">
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Ciudad </span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.ciudad}}"
																ng-bind="infoOtDetalle.direccion.ciudad || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Estado</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.estado}}"
																ng-bind="infoOtDetalle.direccion.estado || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Municipio</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.municipio}}"
																ng-bind="infoOtDetalle.direccion.municipio || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Colonia</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.colonia}}"
																ng-bind="infoOtDetalle.direccion.colonia || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Calle</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.calle}}"
																ng-bind="infoOtDetalle.direccion.calle || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Num. interior</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.numeroInterior}}"
																ng-bind="infoOtDetalle.direccion.numeroInterior || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Num. exterior</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.numeroExterior}}"
																ng-bind="infoOtDetalle.direccion.numeroExterior || 'Sin dato'"></span>
														</div>
													</div>

													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">C&oacute;digo postal</span>
														</div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.codigoPostal}}"
																ng-bind="infoOtDetalle.direccion.codigoPostal || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Referencia</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.referencias}}"
																ng-bind="infoOtDetalle.direccion.referencias || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Entre calles</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.direccion.entreCalles}}"
																ng-bind="infoOtDetalle.direccion.entreCalles || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Tel&eacute;fono</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.telefonoCliente}}"
																ng-bind="infoOtDetalle.telefonoCliente || 'Sin dato'"></span>
														</div>
													</div>
													<div class="container-fluid terceros-content">
														<div class="container-text-title-detalle"><span
																class="text-tile-terceros">Tel. contacto</span></div>
														<div class="container-text-content-detalle"><span
																class="text-content-terceros"
																title="{{infoOtDetalle.telefonoContacto}}"
																ng-bind="infoOtDetalle.telefonoContacto || 'Sin dato'"></span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1"
											class="tab-pane fade " id="v-tabs-consulta-historico" role="tabpanel"
											aria-labelledby="v-tabs-consulta-historico-tab">
											<div ng-if="!historialOrdenTrabajo.length"
												style="text-align: center; margin-top: 2em;">
												<span
													style="font-size: 12px !important;color:grey; font-weight: lighter;"
													class="timeline__day">
													<span class="timeline__month">
														<i class="fa fa-exclamation-circle warning-nodata"></i>
													</span>
													NO SE ENCONTRARON DATOS
												</span>
											</div>

											<div class="row content-historico-ot" style="overflow: auto;">
												<div class="row" ng-repeat="elementHistorico in historialOrdenTrabajo"
													style="height: fit-content;">
													<div class="col-2 line-time-new">
														<div style="background-color:white;" class="timeline__date">
															<span class="timeline-day-detalleOT timeline__day">OT</span>
															<span style="font-size: 12px !important;"
																class="timeline__month">
																<i ng-if="elementHistorico.idEstatusOrden==1"
																	class="pendiente-historico  fas fa-pause circle-statushistorico-histo"></i>
																<i ng-if="elementHistorico.idEstatusOrden==2"
																	class="asignacion-historico fas fa-arrow-right circle-statushistorico-histo"></i>
																<i ng-if="elementHistorico.idEstatusOrden==3"
																	class="detencion-historico far fa-hand-paper circle-statushistorico-histo"></i>
																<i ng-if="elementHistorico.idEstatusOrden==4"
																	class="terminar-historico fas fa-check circle-statushistorico-histo"></i>
																<i ng-if="elementHistorico.idEstatusOrden==5"
																	class="cancelado-historico fas fa-times circle-statushistorico-histo"></i>
															</span>
														</div>
													</div>

													<div id="content-historial-{{$index}}" class="col-10"
														style="display: grid;">
														<div
															class="card-historico card text-center historico-alertas-div">
															<div class="card-body">
																<i ng-if="elementHistorico.idEstatusOrden==1"
																	class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
																<i ng-if="elementHistorico.idEstatusOrden==2"
																	class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
																<i ng-if="elementHistorico.idEstatusOrden==3"
																	class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
																<i ng-if="elementHistorico.idEstatusOrden==4"
																	class="terminar-historico fas fa-check circle-statushistorico"></i>
																<i ng-if="elementHistorico.idEstatusOrden==5"
																	class="cancelado-historico fas fa-times circle-statushistorico"></i>

																<div class="container-deschistorico">
																	<span class="titlehistorico">Estatus:</span>
																	<span class="content-titlehistorico"
																		ng-bind="elementHistorico.descripcionEstatusOrden || 'SIN DATO'"></span>
																</div>
																<div class="container-deschistorico">
																	<span class="titlehistorico">Estado:</span>
																	<span class="content-titlehistorico"
																		ng-bind="elementHistorico.descripcionEstadoOrden || 'SIN DATO'"></span>
																</div>
																<div class="container-deschistorico">
																	<span class="titlehistorico">Motivo:</span>
																	<span class="content-titlehistorico"
																		ng-bind="elementHistorico.descripcionMotivoOrden  || 'SIN DATO'"></span>
																</div>
																<div class="container-deschistorico">
																	<span class="titlehistorico">Despacho:</span>
																	<span class="content-titlehistorico"
																		ng-bind="elementHistorico.nombreUsuarioDespacho || 'SIN DATO'"></span>
																	<p class="footer-card-historico-alerta"
																		ng-bind="elementHistorico.fecha+' '+elementHistorico.hora">
																	</p>
																</div>
															</div>
															<div class="card-footer text-muted">
																<div class="container-deschistorico">
																	<span class="titlehistorico">Usuario:</span>
																	<span class="content-titlehistorico"
																		ng-bind="elementHistorico.nombreUsuario  || 'SIN DATO'"></span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-mensajeria" role="tabpanel"
											aria-labelledby="v-tabs-consulta-mensajeria-tab">
											<div class="container-mensajes-parent">
												<div class="chat-content-area">
													<div class="chat-header">
													</div>

													<div class="chat-area" style="overflow-y: auto;">
														<div ng-if="!comentariosOrdenTrabajo.length"
															style="text-align: center; margin-top: 2em;">
															<span
																style="font-size: 12px !important;color:grey; font-weight: lighter;"
																class="timeline__day">
																<span class="timeline__month">
																	<i
																		class="fa fa-exclamation-circle warning-nodata"></i>
																</span>
																NO SE ENCONTRARON COMENTARIOS
															</span>
														</div>
														<div class="chats"
															ng-repeat="comentario in comentariosOrdenTrabajo">
															<div class="chat" ng-if="comentario.origenSistema === 2">
																<!-- APP-->
																<div class="chat-avatar">
																	<a class="avatar">
																		<i class="img-comentarios-chat android-mensaje fab fa-android"
																			style="margin-top: 1em;"></i>
																	</a>
																</div>

																<div class="chat-body">
																	<span class="text-fecha-comentario"
																		ng-bind="comentario.fechaComentario"></span>
																	<div class="chat-text">
																		<span ng-bind="comentario.comentario"></span>
																	</div>
																</div>
															</div>
															<div class="chat chat-right"
																ng-if="comentario.origenSistema !== 2">
																<div class="chat-body">
																	<span class="text-fecha-comentario"
																		ng-bind="comentario.fechaComentario"></span>
																	<div class="chat-text">
																		<span ng-bind="comentario.comentario"></span>
																	</div>
																</div>
																<div class="chat-avatar">
																	<a class="avatar">
																		<i class="img-comentarios-chat web-mensaje fas fa-desktop"
																			style="margin-top: 1em;"></i>
																	</a>
																</div>
															</div>
														</div>
													</div>
													<div class="row float-right col-chat-fotter"
														style="margin-top: 2em; margin-right: 2em;">
														<div class="col-9">
															<input id="comentarioOt"
																placeholder="Escribe el mensaje aqu&iacute; ..."
																type="text"
																class="input-mensaje-chat form-control form-control-sm input-comentario-ot"
																ng-model="comentarios">
														</div>
														<div class="col-3" style="height: 50px;">
															<button class="btn btn-primary btn-enviar-comentario-ot"
																ng-click="addComentariosOt()">Enviar</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div ng-show="permisosModal.indexOf('tabAccionesOrdenDespacho') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-acciones" role="tabpanel"
											aria-labelledby="v-tabs-consulta-acciones-tab">
											<ul class="nav nav-tabs mb-3 nav-fill tabs-acciones-modal" id="ex1"
												role="tablist">
												<li ng-show="permisosModal.indexOf('tabCambioEstatusRescateModal') !== -1"
													class="nav-item" role="presentation">
													<a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusRescateModal') !== -1 }"
														class="nav-link active" data-mdb-toggle="tab"
														href="#accion-rescate-ot">Rescate</a>
												</li>
												<li ng-show="permisosModal.indexOf('tabCambioEstatusReagendaModal') !== -1"
													class="nav-item" role="presentation">
													<a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusReagendaModal') !== -1 }"
														class="nav-link" data-mdb-toggle="tab"
														href="#accion-reagendar-ot">Reagendar</a>
												</li>
												<li ng-show="permisosModal.indexOf('tabCambioEstatusGestoriaModal') !== -1"
													class="nav-item" role="presentation">
													<a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusGestoriaModal') !== -1 }"
														class="nav-link" data-mdb-toggle="tab"
														href="#accion-plaza-comercial-ot">Plaza comercial</a>
												</li>
												<li ng-show="permisosModal.indexOf('tabCambioEstatusCalendarizarModal') !== -1"
													class="nav-item" role="presentation">
													<a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusCalendarizarModal') !== -1 }"
														class="nav-link" data-mdb-toggle="tab"
														href="#accion-calendarizar-ot">Calendarizar</a>
												</li>
												<li ng-show="permisosModal.indexOf('tabCambioEstatusTerminarModal') !== -1"
													class="nav-item" role="presentation">
													<a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusTerminarModal') !== -1 }"
														class="nav-link" data-mdb-toggle="tab"
														href="#accion-terminar-ot">Terminar</a>
												</li>
												<li ng-show="permisosModal.indexOf('tabCambioEstatusDesasignarModal') !== -1"
													class="nav-item" role="presentation">
													<a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusDesasignarModal') !== -1 }"
														class="nav-link" data-mdb-toggle="tab"
														href="#accion-desasignar-ot">Desasignar</a>
												</li>

											</ul>
											<div class="tab-content" id="ex1-content">
												<div ng-show="permisosModal.indexOf('tabCambioEstatusRescateModal') !== -1"
													class="tab-pane fade show active" id="accion-rescate-ot">
													<div class="container container-accion">

														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		id="icono_operario_status"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="id-status-tecnico">Motivo:</label>
																	<select class="input-acciones form-control-sm form-control"
																		ng-model="elementoRescate.motivo"
																		ng-options="motivo.nombre for motivo in listadoMotivosRescate">
																		<option value="">Seleccione ...</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<div class="form-group">
																	<label class="label-acciones"
																		for="exampleTextarea">Comentario:</label>
																	<textarea class="input-acciones form-control-sm form-control"
																		style=" resize: none"
																		ng-model="elementoRescate.comentario"
																		placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
																		rows="3"></textarea>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<button
																	ng-show="accionesUserConfigText.indexOf('accionCancelaOT') !== -1"
																	ng-click="cambioStatus('cancela')"
																	class="btn btn-modalAcciones btn-primary disable-terminada">Rescate</button>
																<span class="text-terminada"
																	ng-if="keyBloqueoBtn.includes(infoOtDetalle.idEstatus)"><i
																		class="fas fa-exclamation-circle"></i> La
																	acci&oacute;n no esta disponible</span>
																<div ng-show="accionesUserConfigText.indexOf('accionCancelaOT') === -1"
																	class="text-accion-nopermiso">
																	<i class="icon-not-permiso fas fa-user-lock"></i>
																	<b class="text-not-permiso">No tienes permiso para
																		enviar a
																		rescate</b>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div ng-show="permisosModal.indexOf('tabCambioEstatusReagendaModal') !== -1"
													class="tab-pane fade" id="accion-reagendar-ot">
													<div class="container container-accion">
														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="fecha-reagendamiento">Fecha
																		reagendamiento:</label>
																	<input type="text"
																		ng-model="elementReagendaOT.fechaReagendamiento"
																		id="fecha-reagendamiento"
																		class="datepicker input-acciones form-control-sm form-control" readonly>
																</div>
															</div>
														</div>
														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="id-turno-reagenda">Turno:</label>
																	<select class="input-acciones form-control-sm form-control"
																		id="id-turno-reagenda"
																		ng-model="elementReagendaOT.turno"
																		ng-options="turno.nombre for turno in listadoTurnosAcciones">
																		<option value="">Seleccione ...</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="id-motivo-reagenda">Motivo:</label>
																	<select class="input-acciones form-control-sm form-control"
																		id="id-motivo-reagenda"
																		ng-model="elementReagendaOT.motivo"
																		ng-options="motivo.nombre for motivo in listadoMotivosReagenda">
																		<option value="">Seleccione ...</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<div class="form-group">
																	<label class="label-acciones"
																		for="exampleTextarea">Comentario:</label>
																	<textarea class="input-acciones form-control-sm form-control"
																		style=" resize: none"
																		ng-model="elementReagendaOT.comentario"
																		placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
																		rows="3"></textarea>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<button
																	ng-show="accionesUserConfigText.indexOf('accionReagendaOT') !== -1"
																	ng-click="cambioStatus('reagendamiento')"
																	class="btn btn-modalAcciones btn-primary disable-terminada">Reagendar</button>
																<span class="text-terminada"
																	ng-if="keyBloqueoBtn.includes(infoOtDetalle.idEstatus)"><i
																		class="fas fa-exclamation-circle"></i> La
																	acci&oacute;n no esta disponible</span>
																<div ng-show="accionesUserConfigText.indexOf('accionReagendaOT') === -1"
																	class="text-accion-nopermiso">
																	<i class="icon-not-permiso fas fa-user-lock"></i>
																	<b class="text-not-permiso">No tienes permiso para
																		reagendar
																		ordenes</b>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div ng-show="permisosModal.indexOf('tabCambioEstatusCalendarizarModal') !== -1"
													class="tab-pane fade" id="accion-calendarizar-ot">
													<div class="container container-accion">
														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="fecha-calendarizado">Fecha
																		calendarizado:</label>
																	<input type="text" id="fecha-calendarizado"
																		ng-model="elementCalendarizado.fechaCalendarizado"
																		class="datepicker input-acciones form-control-sm form-control " readonly>
																</div>
															</div>
														</div>
														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="id-turno-calendarizado">Turno:</label>
																	<select class="input-acciones form-control-sm form-control"
																		id="id-turno-calendarizado"
																		ng-model="elementCalendarizado.turno"
																		ng-options="turno.nombre for turno in listadoTurnosAcciones">
																		<option value="">Seleccione ...</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="id-motivo-calendarizado">Motivo:</label>
																	<select class="input-acciones form-control-sm form-control"
																		id="id-motivo-calendarizado"
																		ng-model="elementCalendarizado.motivo"
																		ng-options="motivo.nombre for motivo in listadoMotivosCalendarizado">
																		<option value="">Seleccione ...</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<div class="form-group">
																	<label class="label-acciones"
																		for="exampleTextarea">Comentario:</label>
																	<textarea class="input-acciones form-control-sm form-control"
																		style=" resize: none"
																		ng-model="elementCalendarizado.comentario"
																		placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
																		rows="3"></textarea>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">

																<button
																	ng-show="accionesUserConfigText.indexOf('accionCalendarizaOT') !== -1"
																	ng-click="cambioStatus('calendariza')"
																	class="btn btn-primary btn-modalAcciones disable-terminada">Calendarizar</button>
																<span class="text-terminada"
																	ng-if="keyBloqueoBtn.includes(infoOtDetalle.idEstatus)"><i
																		class="fas fa-exclamation-circle"></i> La
																	acci&oacute;n no esta disponible</span>
																<div ng-show="accionesUserConfigText.indexOf('accionCalendarizaOT') === -1"
																	class="text-accion-nopermiso">
																	<i class="icon-not-permiso fas fa-user-lock"></i>
																	<b class="text-not-permiso">No tienes permiso para
																		calendarizar ordenes</b>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div ng-show="permisosModal.indexOf('tabCambioEstatusGestoriaModal') !== -1"
													class="tab-pane fade" id="accion-plaza-comercial-ot">
													<div class="container container-accion">
														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="id-turno-calendarizado">Estado:</label>
																	<select class="input-acciones form-control-sm form-control"
																		id="id-estado-plaza-comercial"
																		ng-model="elementoPlazaComercial.estado"
																		ng-options="turno.nombre for turno in listadoEstadoGestoria">
																		<option value="">Seleccione ...</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="id-motivo-calendarizado">Motivo:</label>
																	<select class="input-acciones form-control-sm form-control"
																		id="id-motivo-calendarizado"
																		ng-model="elementoPlazaComercial.motivo"
																		ng-options="motivo.nombre for motivo in listadoMotivosGestaria">
																		<option value="">Seleccione ...</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<div class="form-group">
																	<label class="label-acciones"
																		for="exampleTextarea">Comentario:</label>
																	<textarea class="input-acciones form-control-sm form-control"
																		style=" resize: none"
																		ng-model="elementoPlazaComercial.comentario"
																		placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
																		rows="3"></textarea>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<button
																	ng-show="accionesUserConfigText.indexOf('accionGestoriaOT') !== -1"
																	ng-click="cambioStatus('gestoria')"
																	class="btn btn-modalAcciones btn-primary disable-terminada">Plaza</button>
																<span class="text-terminada"
																	ng-if="keyBloqueoBtn.includes(infoOtDetalle.idEstatus)"><i
																		class="fas fa-exclamation-circle"></i> La
																	acci&oacute;n no esta disponible</span>
																<div ng-show="accionesUserConfigText.indexOf('accionGestoriaOT') === -1"
																	class="text-accion-nopermiso">
																	<i class="icon-not-permiso fas fa-user-lock"></i>
																	<b class="text-not-permiso">No tienes permiso para
																		enviar a
																		plaza</b>
																</div>

															</div>
														</div>
													</div>
												</div>
												<div ng-show="permisosModal.indexOf('tabCambioEstatusTerminarModal') !== -1"
													class="tab-pane fade" id="accion-terminar-ot">
													<div class="container container-accion">


														<div class="row align-items-center">
															<div class="col-12">
																<div class="form-group input-acciones-select">
																	<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
																		class="fa fa-user-circle-o fa-2x"></i>
																	<label class="label-acciones"
																		for="id-estado-terminar">Estado:</label>
																	<select class="input-acciones form-control-sm form-control"
																		id="id-estado-terminar"
																		ng-model="elementTerminar.estado"
																		ng-options="estado.nombre for estado in listadoEstadosTerminado">
																		<option value="">Seleccione ...</option>
																	</select>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<div class="form-group">
																	<label class="label-acciones"
																		for="exampleTextarea">Comentario:</label>
																	<textarea class="input-acciones form-control-sm form-control"
																		style=" resize: none"
																		ng-model="elementTerminar.comentario"
																		placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
																		rows="3"></textarea>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<button
																	ng-show="accionesUserConfigText.indexOf('accionTerminaOT') !== -1"
																	ng-click="cambioStatus('termina')"
																	class="btn btn-modalAcciones btn-primary disable-terminada">Terminar</button>
																<span class="text-terminada"
																	ng-if="keyBloqueoBtn.includes(infoOtDetalle.idEstatus)"><i
																		class="fas fa-exclamation-circle"></i> La
																	acci&oacute;n no esta disponible</span>
																<div ng-show="accionesUserConfigText.indexOf('accionTerminaOT') === -1"
																	class="text-accion-nopermiso">
																	<i class="icon-not-permiso fas fa-user-lock"></i>
																	<b class="text-not-permiso">No tienes permiso para
																		terminar
																		ordenes</b>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div ng-show="permisosModal.indexOf('tabCambioEstatusDesasignarModal') !== -1"
													class="tab-pane fade" id="accion-desasignar-ot">
													<div class="container container-accion">
														<div class="row">
															<div class="col-12">
																<div class="form-group">
																	<label class="label-acciones"
																		for="exampleTextarea">Comentario:</label>
																	<textarea class="input-acciones form-control-sm form-control"
																		style=" resize: none"
																		ng-model="elementoDesasigna.comentario"
																		placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
																		rows="3"></textarea>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<button
																	ng-show="accionesUserConfigText.indexOf('accionDesasignaOT') !== -1"
																	ng-click="cambioStatus('desasigna')"
																	class="btn btn-modalAcciones btn-primary disable-terminada">Desasigna</button>
																<span class="text-terminada"
																	ng-if="keyBloqueoBtn.includes(infoOtDetalle.idEstatus)"><i
																		class="fas fa-exclamation-circle"></i> La
																	acci&oacute;n no esta disponible</span>
																<div ng-show="accionesUserConfigText.indexOf('accionDesasignaOT') === -1"
																	class="text-accion-nopermiso">
																	<i class="icon-not-permiso fas fa-user-lock"></i>
																	<b class="text-not-permiso">No tienes permiso para
																		desasignar ordenes</b>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>
										</div>
										<div ng-show="permisosModal.indexOf('tabInformacionPaqueteDespacho') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-paquete" role="tabpanel"
											aria-labelledby="v-tabs-consulta-paquete-tab">
											<div class="row parent-detallecotizacion">
												<div class="col-12">
													<div class="row ">
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Paquete</span></div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.nombrePaquete}}"
																		ng-bind="responseServicios.nombrePaquete || 'Sin dato'"></span>
																</div>
															</div>
														</div>
													</div>
													<div class="row justify-content-center">
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Cuenta factura</span>
																</div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.folioCuentaFactura}}"
																		ng-bind="responseServicios.folioCuentaFactura || 'Sin dato'"></span>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Folio OS</span></div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.folioOs}}"
																		ng-bind="responseServicios.folioOs || 'Sin dato'"></span>
																</div>
															</div>
														</div>
													</div>

													<div class="row justify-content-center">
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Folio CSP</span>
																</div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.folioCotSitioPlan}}"
																		ng-bind="responseServicios.folioCotSitioPlan || 'Sin dato'"></span>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Folio Sitio</span>
																</div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.folioSitio}}"
																		ng-bind="responseServicios.folioSitio || 'Sin dato'"></span>
																</div>
															</div>
														</div>
													</div>
													<div class="row justify-content-center">
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Num. ips</span></div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.numIps}}"
																		ng-bind="responseServicios.numIps || 'Sin dato'"></span>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Num. dns</span></div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.numDns}}"
																		ng-bind="responseServicios.numDns || 'Sin dato'"></span>
																</div>
															</div>
														</div>
													</div>

													<div class="row justify-content-center">
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Monto primer
																		pago</span>
																</div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.precioProntoPago}}"
																		ng-bind="responseServicios.precioProntoPago || 'Sin dato' | currency:MX$:2"></span>
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="container-fluid terceros-content">
																<div class="container-text-title-detalle"><span
																		class="text-tile-terceros">Pago
																		instalaci&oacute;n</span></div>
																<div class="container-text-content-detalle"><span
																		class="text-content-terceros"
																		title="{{responseServicios.pagoEnInstalacion}}"
																		ng-bind="responseServicios.pagoEnInstalacion || 'Sin dato' | currency:MX$:2"></span>
																</div>
															</div>
														</div>
													</div>
													<br />
													<div class="row">
														<div class="col-7">
															<div class="row justify-content-center">
																<div class="col-md-12">
																	<h5 style="color:#767676"
																		class="titlemodalproductos">
																		Servicios a instalar</h5>
																	<div class="parent_table_detalle">
																		<table
																			class="detalle-productos-table table table-sm">
																			<thead class="thead_table_servicios">
																				<tr>
																					<th scope="col">Nombre del Servicio
																					</th>
																					<th scope="col">Tipo Servicio</th>
																					<th class="text-center" scope="col">
																						Detalle</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr ng-class="{'active-selected-servicio-plan': selectedEquipoPaquete == servicio }"
																					ng-repeat="servicio in responseServicios.resumenServicios">
																					<td ng-bind="servicio.descripcion">
																					</td>
																					<td ng-bind="servicio.tipo"></td>
																					<td>
																						<div class="text-center">
																							<button
																								ng-if="servicio.id !== undefined"
																								type="button"
																								ng-click="consultarDetalleServicio(servicio, responseServicios.idCotSitio)"
																								class="btn_detalle_servicio btn btn-info btn-rounded btn-sm my-0 waves-effect waves-light">
																								<i
																									class="fa fa-eye"></i></button>
																							<span
																								ng-if="servicio.id === undefined">Sin
																								detalle</span>
																						</div>
																					</td>
																				</tr>
																			</tbody>
																			<tfoot>
																				<tr
																					ng-if="responseServicios.resumenServicios === undefined || responseServicios.resumenServicios.length <= 0">
																					<td class="text-center" colspan="3">
																						No se cuenta con servicios</td>
																				</tr>
																			</tfoot>
																		</table>
																	</div>
																</div>
															</div>
															<div class="row">
																<div class="col-md-12">
																	<h5 style="color:#767676"
																		class="titlemodalproductos"> Productos </h5>
																	<div class="parent_table_detalle_productos">
																		<table
																			class="table detalle-productos-table table-sm">
																			<thead
																				class="thead_table_productos_servicio">
																				<tr>
																					<th scope="col">Nombre del producto
																					</th>
																					<th scope="col">Tipo producto</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr
																					ng-repeat="producto in selectedEquipoPaquete.productos">
																					<td ng-bind="producto.descripcion">
																					</td>
																					<td ng-bind="producto.tipo"></td>
																				</tr>
																			</tbody>
																			<tfoot>
																				<tr
																					ng-if="selectedEquipoPaquete.productos === undefined || selectedEquipoPaquete.productos.length <= 0">
																					<td class="text-center" colspan="2">
																						No se cuenta con productos</td>
																				</tr>
																			</tfoot>
																		</table>
																	</div>
																</div>
															</div>
															<div class="row ">
																<div class="col-md-12">
																	<h5 style="color:#767676"
																		class="titlemodalproductos"> Promociones </h5>
																	<div class="parent_table_detalle_promociones">
																		<table
																			class="detalle-productos-table table table-sm">
																			<thead
																				class="thead_table_promociones_servicio">
																				<tr>
																					<th scope="col">Folio
																						promoci&oacute;n</th>
																					<th scope="col">Nombre de la
																						promoci&oacute;n</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr
																					ng-repeat="promocion in responseServicios.promociones">
																					<td ng-bind="promocion.id"></td>
																					<td ng-bind="promocion.descripcion">
																					</td>
																				</tr>
																			</tbody>
																			<tfoot>
																				<tr
																					ng-if="responseServicios.promociones === undefined || responseServicios.promociones.length <= 0">
																					<td class="text-center" colspan="2">
																						No se cuenta con promociones
																					</td>
																				</tr>
																			</tfoot>
																		</table>
																	</div>
																</div>
															</div>
														</div>
														<div class="col-5"
															style="overflow-x: auto; max-height: calc(100vh - 225px);">
															<div class="text-center">
																<h5 style="color:#767676"
																	class="text-center titlemodalproductos">Equipo y
																	Modelos</h5>
															</div>
															<div>
																<div ng-if="selectedEquipoPaquete.isTieneEquipoModeos">
																	<div class="content_info_detalle">
																		<h6 class="ml-5 mt-2 text-equipo-paquete"
																			ng-bind="selectedEquipoPaquete.elementoEquipoModelos.nombreEquipo">
																		</h6>
																		<div class="ml-4">
																			<!--div class="container-fluid detallePaquete-content">
																			<div class="container-text-title-detalle">
																				<span class="text-title-detallePaquete">Nombre Servicio</span>
																			</div>
																			<div class="container-text-content-detalle">
																				<span class="text-content-detallePaquete" title="{{detServicio.nombreServicio}}" ng-bind="detServicio.nombreServicio || 'Sin dato'"></span>
																			</div>
																		</div-->
																			<div
																				class="container-fluid detallePaquete-content">
																				<ul style="color: #797979"
																					class="listado_modelos">
																					<li ng-repeat="modelo in selectedEquipoPaquete.elementoEquipoModelos.modelo"
																						class="li_item_modelo"
																						ng-bind="modelo.modelo">
																					</li>
																				</ul>
																			</div>
																		</div>
																		<!-- <i class="fa fa-satellite-dish"></i>
																	<i class="fas fa-desktop"></i> -->
																		<!-- <span ng-bind="detServicio.nombreServicio"></span>
																	<span ng-bind="detServicio.flujo"></span>
																	<span ng-bind="detServicio.tipoDispositivo"></span> -->
																		<!-- <ul style="color: #797979" class="listado_modelos">
																		<li ng-repeat="modelo in detServicio.modelo" class="li_item_modelo" ng-bind="modelo.nameModelo">
																		</li>
																	</ul> -->
																	</div>
																</div>
																<div ng-if="!selectedEquipoPaquete.isTieneEquipoModeos"
																	class="text-center not_info_detalle row h-100 justify-content-center">
																	<h6 style="color:#abafae;" class="text-noSeleccion">
																		Sin datos para mostrar</h6>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div ng-show="permisosModal.indexOf('tabCambioDireccion') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-cambio-direccion" role="tabpanel"
											aria-labelledby="v-tabs-consulta-cambio-direccion-tab">
											<jsp:include page="./content/div-cambio-direccion-ot.jsp"></jsp:include>
										</div>
										<div ng-show="permisosModal.indexOf('tabCorteMasivo') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-detalle-corte-masivo"
											role="tabpanel" aria-labelledby="v-tabs-consulta-detalle-corte-masivo-tab">
											<jsp:include page="./content/div-info-general-detalle-ot-pe.jsp"></jsp:include>
											<hr />
											<jsp:include page="./content/div-info-detalle-corte-masivo-ot-pe.jsp"></jsp:include>
										</div>
										<div ng-show="permisosModal.indexOf('tabPedidoDespacho') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-pedido" role="tabpanel"
											aria-labelledby="v-tabs-consulta-pedido-tab">
											<div class="row parent-detallecotizacion">
												<div class="col-4">
													<b class="text-repartidor-noencontrado"
														ng-if="detalleTecnicoOt.latitud == undefined || detalleTecnicoOt.latitud == null">No
														se encontr&oacute; ubicaci&oacute;n del repartidor</b>

													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Folio</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.folioPedido"></h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Tipo entrega</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.descripcionTipoEntrega"></h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Tipo </b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.tipo"></h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Subtipo</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.subtipo"></h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Fecha programada</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.fechaHoraProgramada"></h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Fecha estimada</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.costos.fechaEstimadaFinal">
															</h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Tiempo estimado</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.costos.tiempoEstimado"></h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Distancia estimada </b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.costos.distanciaEstimada">
															</h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Fecha
																expiraci&oacute;n</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.costos.fechaExpiracion"></h5>
														</div>
													</div>
													<div class="divide-cotizacion">

													</div>
													<h5 class="header-title-cotiz">
														Costos
													</h5>

													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Subtotal</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.costos.subTotal | currency:MX$:2">
															</h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">IVA</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.costos.iva | currency:MX$:2">
															</h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico">Descuento</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico"
																ng-bind="detalleCotizacion.costos.descuento | currency:MX$:2">
															</h5>
														</div>
													</div>
													<div class="detalle-cot-basico">
														<div class="container-title-detallecot">
															<b class="titulodetallecotbasico total-title-prod">Total</b>
														</div>
														<div class="container-text-detallecot">
															<h5 class="contentdetallecotbasico total-content-prod"
																ng-bind="detalleCotizacion.costos.total | currency:MX$:2">
															</h5>
														</div>
													</div>
												</div>
												<div class="col-8">

													<div id="mapa-cotizacion-despacho" class="mapa-cotizacion-despacho"
														style="width:100%;height:100%; border-radius: 10px;">
													</div>
												</div>
											</div>
											<div ng-show="isAbiertoDetalleDireccion"
												class="container-direcciones-elemento">
												<span class="cerrarnoticias far fa-times"
													ng-click="isAbiertoDetalleDireccion=false"></span>
												<div class="row">
													<div class="col-12 col-cotizacion-tabs">
														<div class="nav nav-tabs  nav-fill text-center"
															id="v-tabs-tab-detalle-cotizacion" role="tablist"
															aria-orientation="vertical">
															<a class="nav-link active"
																id="v-tabs-consultagen-cotizacion-tab"
																data-mdb-toggle="tab"
																href="#v-tabs-consultagen-detallecot" role="tab"
																aria-controls="v-tabs-consultagen-cotizacion-tab"
																aria-selected="true">General</a>
															<a class="nav-link " id="v-tabs-consultadeta-coti-tab"
																data-mdb-toggle="tab" href="#v-tabs-consultadeta-coti"
																role="tab" aria-controls="v-tabs-consultadeta-coti-tab"
																aria-selected="true">Direcci&oacute;n</a>
															<a class="nav-link " id="v-tabs-productos-coti-tab"
																data-mdb-toggle="tab" href="#v-tabs-productos-coti"
																role="tab" aria-controls="v-tabs-productos-coti-tab"
																aria-selected="true">Productos</a>
														</div>
														<div class="tab-content tab-content-direccion"
															id="v-tabs-tabContent">
															<div class="tab-pane fade show active"
																id="v-tabs-consultagen-detallecot" role="tabpanel"
																aria-labelledby="v-tabs-consultagen-cotizacion-tab">

																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b
																			class="titulogeneralcotbasico">Acci&oacute;n</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.accionDescripcion">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Estatus</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.descripcionEstatus">
																		</h5>
																	</div>
																</div>

																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Nombre</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.nombre"></h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b
																			class="titulogeneralcotbasico">Tel&eacute;fono</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.numeroTelefono">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b
																			class="titulogeneralcotbasico">Direcci&oacute;n</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccion"></h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Notas</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.notas"></h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Distancia
																			estimada</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.distanciaEstimada">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Tiempo
																			estimado</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.tiempoEstimado">
																		</h5>
																	</div>
																</div>
																<div class="divide-cotizacion">

																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Subtotal</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.subTotal | currency:MX$:2">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Descuento</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.descuento | currency:MX$:2">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">IVA</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.iva | currency:MX$:2">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b
																			class="titulogeneralcotbasico  total-title-prod">Total</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico  total-content-prod"
																			ng-bind="elementoDireccion.total | currency:MX$:2">
																		</h5>
																	</div>
																</div>

															</div>
															<div class="tab-pane fade " id="v-tabs-consultadeta-coti"
																role="tabpanel"
																aria-labelledby="v-tabs-consultadeta-coti-tab">

																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b
																			class="titulogeneralcotbasico">Pa&iacute;s</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.pais">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Estado</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.estado">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Ciudad</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.ciudad">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b
																			class="titulogeneralcotbasico">Delegaci&oacute;n</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.delegacion">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">C&oacute;digo
																			postal</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.codigoPostal">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Colonia</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.colonia">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Calle</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.calle">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">No.
																			interior</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.noInterior">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">No.
																			exterior</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.noExterior">
																		</h5>
																	</div>
																</div>

																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Entre
																			calles</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.entreCalles">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Latitud</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.latitud">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b class="titulogeneralcotbasico">Longitud</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.direccionDetalle.longitud">
																		</h5>
																	</div>
																</div>
																<div class="detalle-text-parent-basico">
																	<div class="container-title-generalcot">
																		<b
																			class="titulogeneralcotbasico">Referencias</b>
																	</div>
																	<div class="container-text-generalcot">
																		<h5 class="contentgeneralcotbasico"
																			ng-bind="elementoDireccion.referencias">
																		</h5>
																	</div>
																</div>

															</div>
															<div class="tab-pane fade " id="v-tabs-productos-coti"
																role="tabpanel"
																aria-labelledby="v-tabs-productos-coti-tab">
																<table
																	class="table-productos-cotizacion table table-sm">
																	<thead>
																		<tr>
																			<th scope="col">#</th>
																			<th scope="col">Desc.</th>
																			<th scope="col">Cant.</th>
																			<th scope="col">Tam.</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr
																			ng-repeat="prod in elementoDireccion.productos track by $index">
																			<th scope="row" ng-bind="$index+1"></th>
																			<td><span class="text-producto"
																					ng-bind="prod.nombre"> </span></td>
																			<td><span class="text-producto"
																					ng-bind="prod.cantidad"> </span>
																			</td>
																			<td><span class="text-producto"
																					ng-bind="prod.tamano"> </span></td>
																		</tr>
																	</tbody>
																</table>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div ng-show="permisosModal.indexOf('tabOperacionDiaria') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-info-gral-ot-detalle-detencion"
											role="tabpanel"
											aria-labelledby="v-tabs-consulta-info-gral-ot-detalle-detencion-tab">
											<jsp:include page="./content/div-info-general-detalle-ot-pe.jsp"></jsp:include>
										</div>
										<div ng-show="permisosModal.indexOf('tabOperacionDiaria') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-detalle-detencion" role="tabpanel"
											aria-labelledby="v-tabs-consulta-detalle-detencion-tab">
											<div ng-if="detencionVistaModal">
												<jsp:include page="./content/div-info-detalle-detencion-ot-pe.jsp"></jsp:include>
											</div>
										</div>
										<div ng-show="permisosModal.indexOf('tabInspectorRed') !== -1"
											class="tab-pane fade" id="v-tabs-consulta-detalle-inspector" role="tabpanel"
											aria-labelledby="v-tabs-consulta-detalle-inspector-tab">
											<jsp:include page="./content/div-info-general-detalle-ot-pe.jsp"></jsp:include>
											<hr />
											<jsp:include page="./content/div-info-detalle-inspector-ot-pe.jsp"></jsp:include>
										</div>
										<div ng-show="infoOtDetalle.idEstado =='206' || infoOtDetalle.idEstado ==206"
											class="tab-pane fade" id="v-tabs-consulta-ordenesPE" role="tabpanel"
											aria-labelledby="v-tabs-consulta-ordenesPE-tab">
											<jsp:include page="./content/ordenesPlantaExternaOt.jsp"></jsp:include>
										</div>
										<div 
											class="tab-pane fade" id="v-tabs-consulta-dictamen" role="tabpanel"
											aria-labelledby="v-tabs-consulta-dictamen-tab">
											<jsp:include page="./content/div-info-dictamen.jsp"></jsp:include>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<jsp:include page="./modal/modalFiltroGeografia.jsp"></jsp:include>
		<jsp:include page="./modal/modalDetalleInformacionOtPendiente.jsp"></jsp:include>
		<jsp:include page="./modal/modalLocalizacionRegistros.jsp"></jsp:include>
	</body>
	<jsp:include page="../../generic/filtros/filtros.jsp"></jsp:include>


	<!-- LIBRERIAS JS -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
	<script type="text/javascript"
		src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
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
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/generic/tercerosGeneric/mainMaps.js?v=${sessionScope.versionDepl}"
		charset="UTF-8"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>

	</html>