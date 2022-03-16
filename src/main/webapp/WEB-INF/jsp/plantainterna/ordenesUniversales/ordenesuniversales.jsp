<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="ordenesUniversalesApp">

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
	<link href="${pageContext.request.contextPath}/resources/css/plantainterna/ordenesUniversales/styleOrdenesUniversales.css?v=${sessionScope.versionDepl}" rel="stylesheet">
</head>

<body id="idBody" ng-controller="ordenesUniversalesController" ng-init="consultarCatalogoOrdenesUniversales()" style="display: none;">
	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
	
    <div class="container contenedor-steps">
        <div class="row">
            <div class="wizard-v1-content">
                <div class="wizard-form">
                    <div class="form-register" id="form-register" action="#" method="post" novalidate="novalidate">
						<div id="form-total" role="application" class="wizard clearfix">
							<div class="steps clearfix">
								<ul role="tablist">
									<li role="tab" id="wizzard-1" class="tab-step-wizar first" aria-disabled="false" aria-selected="true" ng-click="mostrarTab(1)">
										<a id="form-total-t-0" href="" aria-controls="form-total-p-0">
											<span class="current-info audible"> </span>
											<div class="title">
												<span class="step-icon"><i class="fa fa-edit"></i></span>
												<span class="step-text">Informaci&oacute;n b&aacute;sica</span>
											</div>
										</a>
									</li>
									<li role="tab" id="wizzard-2" class="tab-step-wizar" aria-disabled="false" aria-selected="false" ng-click="mostrarTab(2)">
										<a id="form-total-t-1" href="" aria-controls="form-total-p-1">
											<div class="title">
												<span class="step-icon"><i class="fa fa-info"></i></span>
												<span class="step-text">Informaci&oacute;n cliente</span>
											</div>
										</a>
									</li>

									<li role="tab"  id="wizzard-3" class="tab-step-wizar" aria-disabled="false" aria-selected="false" style="padding-right: 0% !important;" 
										ng-click="mostrarTab(3);abrirOpcionUbicacion();">
										<a id="form-total-t-2" href="" aria-controls="form-total-p-2">
											<div class="title">
												<span class="step-icon"><i class="fa fa-map-marker"></i></span>
												<span class="step-text">Ubicaci&oacute;n</span>
											</div>
										</a>
									</li>									
									
									<li role="tab" id="wizzard-4" class="tab-step-wizar last " aria-disabled="false" aria-selected="false" style="margin-left: 63px !important;" ng-click="mostrarTab(4)">
										<a id="form-total-t-3" href="" aria-controls="form-total-p-3">
											<div class="title">
												<span class="step-icon"><i class="fa fa-list-alt"></i></span>
												<span class="step-text">Resumen</span>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<form name="guardadoForm" >
						<div class="contenedor-steps">
							<div class="content-steps text-center border border-light p-5" style="padding: 1em!important; border-color: white!important;" ng-show="elementTab === 1">
								<jsp:include page="./content/informacionBasica.jsp"></jsp:include>					
							</div>
							<div class="content-steps text-center border border-light p-5" style="padding: 1em!important;" ng-show="elementTab === 2">
								<jsp:include page="./content/informacionCliente.jsp"></jsp:include>			
							</div>
							<div class="content-steps text-center border border-light p-5" style="padding: 1em!important;" ng-show="elementTab === 3">
								<jsp:include page="./content/ubicacion.jsp"></jsp:include>
							</div>						
							<div class="content-steps text-center border border-light p-5" style="padding: 1em!important;" ng-show="elementTab === 4">
								<jsp:include page="./content/resumen.jsp"></jsp:include>	
							</div>
						</div>
					</form>
                </div>
            </div>
        </div>
    </div>

	<jsp:include page="./modals/modalArbol.jsp"></jsp:include>
	<jsp:include page="./modals/modalTipoOrdenes.jsp"></jsp:include>
	<jsp:include page="./modals/modalPaquete.jsp"></jsp:include>
	<jsp:include page="./modals/modalCanalVenta.jsp"></jsp:include>
	<div class="row">
		<div class="col-2">
				
		</div>
	</div>


</body>

	<!-- Scripts libraries -->
	<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
 	<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script> 
	<script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>	
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/timepicker/js/toastr.min.js"></script>

	<!-- Fin -->

	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>

	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/ordenesUniversales/ordenesUniversalesController.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/ordenesUniversales/calendarController.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/ordenesUniversales/mapController.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/ordenesUniversales/ordenesUniversalesService.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/ordenesUniversales/jsonResult.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
	<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
</html>