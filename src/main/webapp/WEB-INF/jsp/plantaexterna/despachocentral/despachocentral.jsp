<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html ng-app="despachoCentralApp">
    <head>
		<!-- LIBRERIAS CSS -->
        <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16"	href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
        
        <!-- CSS INTERNAS -->
        <link href="${pageContext.request.contextPath}/resources/css/plantaexterna/despachoCentralPe/despachoCentralPe.css" rel="stylesheet">

        <title>FFM Total play</title>
    </head>
    <body id="idBody" ng-controller="despachoCentralController" style="display: none;">
    
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
		<jsp:include page="./modals/modalArbolGeografiaConsulta.jsp"></jsp:include>
		<jsp:include page="./modals/modalConsultaDetalleOT.jsp"></jsp:include> 
		
        <div class="container-fluid">
        <div class="container-fluid">
			<div class="container-title-header" style="padding: 0 !important;">
                <div class="header-modulo">
                    <h5 class="title-modulo">Despacho central</h5>
                    <h1 class="h6 subtitle-modulo"></h1>
                </div>
            </div>
			<div class="row">
				<div class="col-md-12">
					<div class="row" id="">
						<div class="col-md-1 column-style-despacho-central columna-filtro-ind">
<!-- 		                       <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron status"></i> -->
							<label class="label-filter">Status</label>
		                    <div class="dropdown">
		                    	<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text" id="filtro-status" class="input-filtro-status form-control form-control-sm" />
		                        <ul class="dropdown-menu drop-down-filters">      
		                        	<li style="text-align: center;">
		                            	<button ng-click="seleccionTodos(listaStatus, true)" id="todo_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
		                                <button ng-click="seleccionTodos(listaStatus, false)" id="ninguno_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
									</li>     
		                            <li class="elemento_menu dropdown-divider"></li>
		                            <li ng-repeat="listStat in listaStatus" class="element-menu-filter">
		                            	<label class="dropdown-item form-check-inputfiltro">
		                                	<input id="" class="form-check-input" type="checkbox" ng-model="listStat.checkedOpcion" ng-checked="listStat.checkedOpcion" />
		                                    <span for="" class="dropdown-item item-text-filtro" ng-bind="listStat.nombre"></span>
										</label>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-md-1 column-style-despacho-central columna-filtro-ind">
<!-- 		                        <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron status"></i> -->
							<label class="label-filter">Estado</label>
		                    <div class="dropdown">
								<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text" id="filtro-status" class="input-filtro-status form-control form-control-sm" />
		                        <ul class="dropdown-menu drop-down-filters">      
		                        	<li style="text-align: center;">
		                            	<button ng-click="seleccionTodos(listaEstados, true)" id="todo_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
		                                <button ng-click="seleccionTodos(listaEstados, false)" id="ninguno_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
									</li>     
		                            <li class="elemento_menu dropdown-divider"></li>
		                            <li ng-repeat="listEstado in listaEstados" class="element-menu-filter">
		                            	<label class="dropdown-item form-check-inputfiltro">
		                                	<input id="" class="form-check-input" type="checkbox" ng-model="listEstado.checkedOpcion" ng-checked="listEstado.checkedOpcion"/>
		                                    <span for="" class="dropdown-item item-text-filtro" ng-bind="listEstado.nombre"></span>
										</label>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-md-1 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
		                	<label for="" class="label-filter">Fecha inicial</label>
		                    <input type="text" id="fecha_inicio_corte" class="datepicker input-filtro-status form-control form-control-sm" style="width: 100px;" />
						</div>
		                <div class="col-md-1 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
		                	<label for="" class="label-filter">Fecha fin</label>
		                    <input type="text" id="fecha_fin_corte" class="datepicker input-filtro-status form-control form-control-sm" style="width: 100px;" />
						</div>
						<div class="col-md-1 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
<!-- 		                  <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i> -->
		                	<label for="cluster" class="label-filter">Geograf&iacute;as</label>
		                    <input readonly placeholder="Seleccione..." type="text" id="cluster" class="input-filtro-status form-control form-control-sm" ng-click="abrirModalArbolGeografiaConsulta()">
						</div>
		                <div class="col-md-1" style="width: 110px; padding-right: 0px !important;">
		                	<label for="" class="label-filter">TICKET SF</label>
		                    <input type="text" id="ticket_salesforce" class="input-filtro-status form-control form-control-sm" placeholder="TICKET SF" style="width: 100px;" />
						</div>
						<div class="col-md-1" style="width: 110px; padding-right: 0px !important;">
		                	<label for="" class="label-filter">TICKET SD</label>
		                    <input type="text" id="service_desk" class="input-filtro-status form-control form-control-sm" placeholder="TICKET SD" style="width: 100px;" />
						</div>
		                <div class="col-md-1" style="width: 110px; padding-right: 0px !important;">
		                	<label for="" class="label-filter">OT</label>
		                    <input type="text" id="id_ot_corte_masivo" class="input-filtro-status form-control form-control-sm" placeholder="OT" style="width: 100px;" />
						</div>
		                <div class="col-md-1 div-btn-busqueda" >
		                	<button id="btn_busqueda_corte_masivo" type="button" class="btn btn-sm btn-primary waves-effect waves-light" ng-click="consultarOTs()"><i class="fa fa-search"></i></button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="row" style="margin-top: 0.5em;">
				<div class="col-md-8">
					<table id="table-ot-pe" class="table">

					</table>
				</div>
				<div class="col-md-4">		
					<div class="card map-card mb-4">
						<div id="map-container-google-1" class="map-container" style="height: 500px">
							<div id="map_corte_masivo" style="width:100%;height:100%;"></div>
						</div>
						<div id="content_mapa_estatus"  class="card-body px-0 ">
							<div class="white px-4 pb-4 pt-3-5">
								<h5 id="conteo_cortes_masivos" class="card-title h5 living-coral-text">Ninguna ot encontrada</h5>			      
								<div class="divider"></div>			      			      
								<table id="table_status_corte" class="table" style="display: none;">
							    	<thead id="thead_table_status_corte">
										<tr>
											<th style="width: 80%;">Estado</th>
											<th style="width: 20%;">Total</th>
										</tr>
									</thead>
							       	<tbody class="">
							       		<tr ng-repeat="cont in resumenContadorEstadosOTs">
							       			<td>{{cont.nombre}}</td>
							       			<td>{{cont.contador}}</td>
							       		</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</body>

    <!-- LIBRERIAS -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <!-- ARCHIVOS JS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/despachoCentralPe/despachoCentralPeController.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/despachoCentralPe/funcionMapsOT.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/geoxml3/geoxml3.js" charset="UTF-8"></script>

    

</html>

