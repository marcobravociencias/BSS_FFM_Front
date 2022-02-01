
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html ng-app="despachoApp">
    <head>
		<link rel="icon" type="image/png" sizes="192x192"  href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">

        <!-- LIBRERIAS -->
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3.min.css" rel="stylesheet">

        <!-- ARCHIVOS CSS -->
        <link href="${pageContext.request.contextPath}/resources/css/plantaexterna/despachope/mainDespachoPE.css?v=${sessionScope.versionDepl}" rel="stylesheet">

        <title>FFM Total play</title>
    </head>
    <body id="idBody" ng-controller="despachoController">
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include> 
        <div class="container-fluid">
            <div class="row">
				<div class="col-12">
					<div class="row">
						<div class="col-2">
							<label class="span-consulta">&nbsp;</label>
							<div class="dropdown">
								<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Selecciona interveci&oacute;n" type="text" id="filtro-intervencion" class="input-filtro-despacho form-control form-control-sm" />
		
								<ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
									<li style="text-align: center;">
										<button ng-click="seleccionarTodos()" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
										<button ng-click="deseleccionarTodos()" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
									</li>     
									<li class="elemento_menu dropdown-divider"></li>
									<li ng-repeat="filtro in listaIntervenciones " class="element-menu-filter">
										<label  class="dropdown-item form-check-inputfiltro">
											<input ng-click=setCheckIntervencion(filtro) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-checked="filtro.check"  />
											<span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.descripcion"></span>
										</label>
										 <ul  class="dropdown-menu">                     
											<li ng-repeat="subfiltro in filtro.listadoSubInter" class="element-menu-filter">
												<label  class="dropdown-item form-check-inputfiltro">
													<input ng-click=setCheckSubIntervencion(subfiltro,filtro) id="subfiltrotext-{{subfiltro.ID}}" class="form-check-input" type="checkbox" ng-checked="subfiltro.check"    />
													<span  for="subfiltrotext-{{subfiltro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltro.descripcion"></span>
												</label>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-2">
							<label class="span-consulta">Fecha inicial</label>
							<div class="input-group mb-3">
								<input type="text" id="fecha-inicial-filter" class="input-filtro-despacho form-control form-control-sm">
							</div>
						</div>
						<div class="col-2">
							<label class="span-consulta">Fecha final</label>
							<div class="input-group mb-3">
								<input type="text" id="fecha-final-filter" class="input-filtro-despacho form-control form-control-sm">
							</div>
						</div>
						<div class="col-2">
							<label class="span-consulta">&nbsp;</label>
							<div class="input-group mb-3">
								<input type="text"id="filtro-cluster" ng-click="mostrarModalCluster()" placeholder="Cluster" class="input-filtro-despacho form-control form-control-sm" readonly>
							</div>
						</div>
						<div class="col-2">
							<label class="span-consulta">&nbsp;</label>
							<div class="input-group mb-3">
								<button ng-disabled="!isCargaOtsPendientes || !isCargaOtsAsignadas" ng-click="refrescarBusqueda()" id="buscar-otsasignadas" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light" style="margin-top: 0; margin: 0 !important;">
									<i ng-if="isCargaOtsPendientes && isCargaOtsAsignadas" class="fa fa-search" style=""></i>
									<div ng-if="!isCargaOtsPendientes || !isCargaOtsAsignadas" class="spinner-border spinner-cargando-info" role="status">
										<span class="visually-hidden">Loading...</span>
									</div>
								</button>  
							</div>           
						</div>
					</div>
				</div>
				<div class="col-12">
					<div class="row">
						<!--div class="col-3">
							<div class="input-group mb-3">
								<input type="text" class="form-control" placeholder="OT/Cluster" aria-describedby="button-addon2">
								<div class="input-group-append">
								  <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
								</div>
							</div>
						</div-->
						<!--div class="col-9">
							<div class="row">
								<div class="col-4">
									<div class="input-group mb-3">
										<input type="text" class="form-control" placeholder="Tecnico" aria-describedby="button-addon2">
										<div class="input-group-append">
										  <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
										</div>
									</div>
								</div>
								<div class="col-1 offset-4">
									<button type="button" class="btn btn-reporte-operacion-diaria"><i class="fa fa-file-text-o"></i></button>
								</div>
								<div class="col-1">
									<button type="button" class="btn btn-notificaciones"><i class="fa fa-bell"></i></button>
								</div>
								<div class="col-1">
									<button type="button" class="btn btn-paleta-colores"><i class="fa fa-info-circle"></i></button>
								</div>
								<div class="col-1">
									<button type="button" class="btn btn-refrescar-filtro"><i class="fa fa-refresh"></i></button>
								</div>
							</div>
						</div-->
					</div>
				</div>
				<div class="col-12">
					<div class="row">
						<div class="col-3">
							<div class="col-12">
								<div class="row">
									<div class="col-12">
										<div class="row" style="background-color: #f3f2f2;">
											<div class="col-12 filter-tecnico-despacho">
												<div class="input-group">
													<input type="text" class="form-control input-search-despacho" id="filterPendiente" ng-model="filterPendientes.id_ot" placeholder="OT/Cluster" aria-describedby="button-addon2">
													<div class="input-group-append">
														<button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<table id="tableOTpendiente" style="width: 100%;">
								<thead>
									<tr><td></td></tr>
								</thead>
								<tbody id="otpendiente">
									<tr done-ots-pendientes ng-repeat="orden in listaOrdenesPendientes | filter: filterPendientes">
										<td>  
											<div id="idotpendiente{{orden.id_ot}}" class="fc-event ot-pendiente-event efecto ui-draggable ui-draggable-handle ">
												<div class="header-otpendeinte">
													<div class="top-title-ot">
														<i class="icono-ot-pendeinte fa fa-bars"></i>
														<h5 class="title-otpendeinte" ng-bind="orden.primerNivel"></h5>
													</div>
													<div class="info-content-otpendeinte">
														<div class="line-content-infootpend">
															<b class="title-ciudad">OT: </b>
															<span class="content-ciudadotpend" ng-bind="orden.id_ot"></span>
														</div>
													</div>
												</div>
												<div class="footer-otpendiente">
													<div class="content-footer">
														<b class="title-footerotpend">Ciudad: </b>
														<span class="content-footerotpend" ng-bind="orden.ciudad"></span>
													</div>
													<div class="content-footer">
														<b class="title-footerotpend">Distrito: </b>
														<span class="content-footerotpend" ng-bind="orden.distrito"></span>
													</div>
													<div class="content-footer">
														<b class="title-footerotpend">Zona:</b>
														<span class="content-footerotpend" ng-bind="orden.zona"></span>
													</div>
													<div class="content-footer">
														<b class="title-footerotpend">Cluster:</b>
														<span class="content-footerotpend" ng-bind="orden.cluster"></span>
													</div>
													<!--span class="badge badge-pill badge-color-opend-tipoint" >T</span>
													<span class="badge badge-pill badge-color-opend" ></span-->
												</div>
										   </div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="col-9">
							<div class="col-12 content-tecnicos-col">
								<div class="row">
									<div class="col-12">
										<div class="row" style="background-color: #f3f2f2;">
											<div class="col-4 filter-tecnico-despacho">
												<div class="input-group">
													<input type="text" class="form-control input-search-despacho" placeholder="Tecnico" aria-describedby="button-addon2">
													<div class="input-group-append">
														<button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
													</div>
												</div>
											</div>
											<div class="col-8">
												<div class="row">
													<div class="col-6 filter-tecnico-despacho">
														<div class="input-group">
															<input type="text" class="form-control input-search-despacho" placeholder="OT Asignada" aria-describedby="button-addon2">
															<div class="input-group-append">
																<button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-12 content-ots-asignadas">
										<div class="row" ng-repeat="operario in listaOperarios">
											<div class="col-4" ng-class="$index === 0 ? 'content-tecnico-index' : 'content-tecnico'"> 
												<div class="row">
													<div class="col-3">
														<div class="text-center">
															<img src="${pageContext.request.contextPath}/resources/img/alertas/tecnico.png" class="img-fluid z-depth-1 rounded-circle img-operario"
																alt="Responsive image">
														</div>
													</div>
													<div class="col-8 content-operario">
														<div class="row">
															<div class="col-12 crop-text-col">
																<span class="text-nombre-tecnico" title="{{operario.nombre}}" ng-bind="operario.nombre"></span>
															</div>
															<div class="col-12">
																<i class="fa fa-user icon-primary-tecnico">&nbsp;</i><span ng-bind="operario.nempleado" class="text-num-tecnico"></span>
																<i class="fa fa-phone icon-primary-tecnico">&nbsp;</i><span ng-bind="operario.telefono" class="text-num-tecnico"></span>
															</div>
															<div>
																<i class="fa fa-eye con-tecnico icon-tecnico-secundary">&nbsp;</i>
																<i class="fa fa-info-circle icon-tecnico-secundary" title="OTS trabajadas" ng-click="consultarOtsTrabajadasInspector(operario)">&nbsp;</i>
																<i class="fa fa-map icon-tecnico-secundary">&nbsp;</i>
															</div>
														</div>
													</div>
													<div class="col-1" style="padding: 0; height: 5.5em;">
														<div class="contadores-tecnicos" style="margin-top: 2em;" ng-click="mostrarModalOtsAsignadas(operario.ordenesAsignadas)">
															<span class="span-contadores-tecnicos" ng-bind="operario.ordenesAsignadas.length"></span>
														</div>
														
													</div>
												</div>
												
											</div>
											<div class="col-8" ng-class="$index === 0 ? 'content-tecnico-index' : 'content-tecnico'">
												<div class="row">
													<div class="col-12">
														<div class="row">
															<div class="col-4 ui-draggable fc-event efecto ui-draggable-handle" id="otAsignada{{ot.idot}}" ng-repeat="ot in operario.ordenesAsignadas" >
																<div class="ot-asignada-event" ondragend="leaveOtPendiente(event,81306)" draggable="true" ondragstart="drag(event,'81306','SINNUMEROEMPLEADO','153','235',1,false)" id="81306">
																	<div class="header-otpendeinte">
																		<div class="row">
																			<div class="col-7 crop-text-col" style="padding-right: 0;">
																				<h5 class="title-ot-asignada" title="{{ot.nivel_uno}}" ng-bind="ot.nivel_uno"></h5>
																			</div>
																			<div class="col-5" style="padding-left: 0;">
																				<i class="icon-ot-asignada fa fa-header"></i>
																				<i class="icon-ot-asignada fa fa-commenting"></i>
																				<i class="icon-ot-asignada fa fa-bars"></i>
																			</div>
																		</div>
																		<div class="row">
																			<div class="col-12">
																				<span class="text-secundario-prin">Ciudad: </span>
																				<span class="text-secundario-sec" ng-bind="ot.ciudad"></span>
																			</div>
																		</div>
																		<div class="row">
																			<div class="col-12">
																				<span class="text-secundario-prin">Distrito: </span>
																				<span class="text-secundario-sec" ng-bind="ot.distrito"></span>
																			</div>
																		</div>
																		<div class="row">
																			<div class="col-4 crop-text-col" style="padding-right: 0;">
																				<span class="text-secundario-prin">Zona: </span>
																				<span class="text-secundario-sec" ng-bind="ot.zona" title="{{ot.zona}}"></span>
																			</div>
																			<div class="col-6 crop-text-col" style="padding-right: 0;">
																				<span class="text-secundario-prin">Cluster: </span>
																				<span class="text-secundario-sec" ng-bind="ot.cluster_text"></span>
																			</div>
																			<div class="col-2">

																			</div>
																		</div>

																		
																		<!--div class="top-title-ot">
																			<h5 class="title-ot-asignada" ng-bind="ot.nivel_uno"></h5>
																			<i class="icon-ot-asignada fa fa-header"></i>
																			<i class="icon-ot-asignada fa fa-commenting"></i>
            																<i class="icon-ot-asignada fa fa-bars"></i>
																		</div-->
																		<!--div class="info-content-ot-asignada">
																			<div class="line-content-infootpend crop-text-col">
																				<b class="text-secundario-prin">Ciudad: </b>
																				<span class="text-secundario-sec" ng-bind="ot.ciudad"></span>
																			</div>
																			<div class="line-content-infootpend">
																				<b class="text-secundario-prin">Distrito: </b>
																				<span class="text-secundario-sec" ng-bind="ot.distrito"></span>
																			</div>
																			<div class="line-content-infootpend">
																				<b class="text-secundario-prin">Zona: </b>
																				<span class="text-secundario-sec" ng-bind="ot.zona"></span>
																			</div>
																		</div-->
																	</div>
																	<div class="footer-ot-asignada">
																		<div class="content-footer">
																			<b class="text-secundario-prin">OT: </b>
																			<span class="text-secundario-sec" ng-bind="ot.idot"></span>
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
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>


		<jsp:include page="./modal/modalClusterFilter.jsp"></jsp:include>
		<jsp:include page="./modal/modalOtsAsignadas.jsp"></jsp:include>
    </body>

    <!-- LIBRERIAS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-2.2.4.js" ></script>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <!-- ARCHIVOS JS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/despachope/despachoPEController.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/despachope/despachoPEService.js?v=${sessionScope.versionDepl}"></script>

    

</html>

