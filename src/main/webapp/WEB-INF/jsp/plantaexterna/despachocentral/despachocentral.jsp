<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
        
        <!-- CSS INTERNAS -->
        <link href="${pageContext.request.contextPath}/resources/css/plantaexterna/despachoCentralPe/despachoCentralPe.css" rel="stylesheet">

        <title>FFM Total play</title>
    </head>
    <body id="idBody" ng-controller="despachoCentralController">
    
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
		<jsp:include page="./modals/modalArbolGeografiaConsulta.jsp"></jsp:include>
		<jsp:include page="./modals/modalConsultaDetalleOT.jsp"></jsp:include> 
		
        <div class="container-fluid">
            <div class="row">
				<div class="col-md-12">
					Despacho central
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div id="" class="container-fluid">
						<div class="row" id="">
							<div class="col-md-1" style="padding-right: 0em; padding-left: .1em;">
								<label class="span-consulta">Status</label>
								<div class="select_content form-group borderFilter bord_style" id="select_opt" style="height: 30px;">
									<select id="status_select_consulta" class="selectpicker form-control-sm select_consulta" multiple data-actions-box="true">
                                    </select>
						  		</div>
							</div>
							<div class="col-md-1" style="padding-right: 0em; padding-left: .1em;">
								<label class="span-consulta">Estado</label>
								<div class="select_content form-group borderFilter bord_style" id="select_opt" style="height: 30px;">
									<select id="estado_select_consulta" class="selectpicker form-control-sm select_consulta" multiple data-actions-box="true">
                                    </select>
						  		</div>
							</div>
							<div class="col-md-1 borderFilter" id="fechaInicio" data-step="12">
								<label class="span-consulta">Fecha inicial</label>
								<div class="input-group" style="height: 30px;">
									<input style="height: 30px;" type="date" class="form-control filter_conf" id="fecha_inicio_corte" aria-describedby="basic-addon1">
								</div>
							</div>
							<div class="col-md-1 borderFilter" id="fechaFin">
								<label class="span-consulta">Fecha fin</label>
								<div class="input-group" style="height: 30px;">
									<input style="height: 30px;" type="date" class="form-control filter_conf" id="fecha_fin_corte" aria-describedby="basic-addon1">
								</div>
							</div>
							<div class="col-md-1 borderFilter bord_style" id="contcidades">
								<label class="span-consulta">Cl&uacute;sters</label>
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"></span>
									<button type="button" style="width: 100%" ng-click="abrirModalArbolGeografiaConsulta()" class="filtro_conj btn btn-secondary btn-Clusters filter_conf input_consulta">Cl&uacute;sters</button>
								</div>
							</div>
							<div class="col-md-1 borderFilter border_conf" id="">
								<label class="span-consulta">TICKET SF</label>
								<input type="text" placeholder="TICKET SF" id="ticket_salesforce" class="ind_filtro f_size_8  form-control filter_conf bord_style input_consulta" >
							</div>
							<div class="col-md-1 borderFilter border_conf" id="">
								<label class="span-consulta">TICKET SD</label>
								<input type="text" placeholder="TICKET SD" id="service_desk" class="ind_filtro f_size_8  form-control filter_conf bord_style input_consulta" >
							</div>
							<div class="col-md-1 borderFilter border_conf" >
								<label class="span-consulta">OT</label>
								<input type="text" placeholder="OT" id="id_ot_corte_masivo" class="ind_filtro f_size_8  form-control filter_conf bord_style input_consulta" >
							</div>
							<div class="col-md-1">
								<span class="tooltip-btn">
									<button style="height: 30px; width: 60px;" id="btn_busqueda_corte_masivo" ng-click="consultarOTs()" type="button" class="btn btn-sm  btn-primary btn_busqueda_bg"><i class="fa fa-search" style="color: #FFFFFF;"></i></button>
								</span>
							</div>
							<div class="col-md-1" >
								<b id="cantidad_notificaciones" style="z-index:2;position: absolute;font-size: .6em;" class="badge red accent-3">1</b>
								<div class="tooltip-btn">
									<button style="padding: .7em 1.3em;background: #0cabf3;" type="button" class="btn btn-sm btn-primary" id="btn_notificaciones_integrador"><i class="fa fa-bell" style="color: #FFFFFF;"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="row" style="margin-top: 0.5em;">
				<div class="col-md-8">
					<table id="table_corte_masivo" class="table">

					</table>
				</div>
				<div class="col-4">		
					<div class="card map-card mb-4">
						<div id="map-container-google-1" class="map-container" style="height: 500px">
							<div id="map_corte_masivo" style="width:100%;height:100%;"></div>
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
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <!-- ARCHIVOS JS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/despachoCentralPe/despachoCentralPeController.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/despachoCentralPe/funcionMapsOT.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/geoxml3/geoxml3.js" charset="UTF-8"></script>

    

</html>

