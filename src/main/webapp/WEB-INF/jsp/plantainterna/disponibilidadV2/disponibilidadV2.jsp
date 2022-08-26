<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="disponibilidadV2App">

<head>
	<meta charset="ISO-8859-1">
	<title>FFM Total play</title>
	<link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
	<link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet">
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
	<link href="${pageContext.request.contextPath}/resources/css/plantainterna/disponibilidadV2/styleDisponibilidadV2.css?v=${sessionScope.versionDepl}" rel="stylesheet">
</head>

<body ng-controller="disponibilidadV2Controller" id="idBody">
	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
	<div class="container">
		<div class="container contenedor_disponibilidad">
            <div class="row col-12" id="filtros_config">
				<div class="col-2 column-style-consulta columna-filtro-ind">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i>
                    <label for="cluster" class="label-filter">Geograf&iacute;a</label>
                    <input readonly placeholder="Seleccione..." type="text" id="cluster" ng-click="abrirModalCluster()" class="input-filtro-consulta form-control form-control-sm">
                </div>
                <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                    <label for="filtro_fecha_inicio_consulta" class="label-filter">Fecha inicial</label>
                    <input readonly type="text" id="filtro_fecha_inicio_consulta" class="datepicker input-filtro-consulta form-control form-control-sm" style="width: 100px;" />
                </div>
                <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                    <label for="filtro_fecha_fin_consulta" class="label-filter">Fecha final</label>
                    <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_consulta" class="datepicker input-filtro-consulta form-control form-control-sm" style="width: 100px;" />
                </div>
				<div class="col-1 div-btn-busqueda" style="width: 65px;">
                    <button id="btn_consultar" type="button" class="btn btn-sm  btn-primary waves-effect waves-light" ng-click="consultaOT()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                <div id="" class="col-1 column-style-consulta" ng-if="configPermisoAccionDescargaReporteOrdenes" style="margin-top: 23px; width: 20px !important;">
                    <a ng-click="consultarReporteGeneric()">
                        <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer">
                    </a>
                </div>
            </div>
			<div class="row col-12" style="margin-top: 1em;">
				<div class="col-3">
					<table id="tableDisponibilidad" class="display table" cellspacing="0" width="100%">
						<thead id="thead_consulta_disponibilidad">
							<tr>
								<th>INTERVENCION</th>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="intervencion in listaIntervenciones">
								<td ng-bind="intervencion.nombre"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-9">
					Tabla
				</div>
			</div>
        </div>
    </div>

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

	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/disponibilidadV2/disponibilidadV2Controller.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/disponibilidadV2/disponibilidadV2Service.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
	<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
</html>