<html ng-app="gestionNoticiasApp">
    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
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
        <link href="${pageContext.request.contextPath}/resources/css/generic/gestionNoticias/mainGestionNoticias.css" rel="stylesheet">
	</head>
	<body id="idBody" ng-controller="gestionNoticiasController" style="display: none;">
    	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
		<div class="container" id="container_terceros_generic">
			<div class="row">
				<div class="col-md-12">
					<div class="contenedorTituloModulo">
						<h5 class="tituloModulo">Noticias</h5>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<div id="card" class="card">
			        	<div class="card-body">
			            	<div class="top-title-ot">
			                	<div class="content-top-element bars-content">
						        	<div style="text-align: center; margin-top: 5px;">
						            	<img alt="" ng-src="./resources/img/plantainterna/despacho/tecnicootasignada.png" class="" id="" />
						            </div>
			                    </div>                        
			                </div>
			            </div>
						<div id="" class="card-footer">               
							<div class="row">
								<div class="col-md-12">
									<div class="content_text">
										<div ng-if="" class="file-delete" style="text-align: center;">
						                	<span class="txtPieFoto">{{file.nombre}} </span><i class="fa fa-trash" ng-click=""></i>
										</div>
										<div ng-if="!file" class="file-delete" style="text-align: center;">
											<span class="txtPieFoto">Sin fotograf&iacute;a </span>
										</div>
									</div>
								</div>
							</div>                
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="row">
						<div class="col-md-12">
							<label class="titulos-confirmacion">T&iacute;tulo principal: <span class="respuesta-confirmacion" ng-bind=""></span></label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="titulos-confirmacion">T&iacute;tulo secundario: <span class="respuesta-confirmacion" ng-bind=""></span></label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="titulos-confirmacion">Detalle: <span class="respuesta-confirmacion" ng-bind=""></span></label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="titulos-confirmacion">Archivo adjunto: <span class="respuesta-confirmacion" ng-bind=""></span></label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="titulos-confirmacion">Link externo: <span class="respuesta-confirmacion" ng-bind=""></span></label>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="row">
						<div class="col-md-12">
							<label class="titulos-confirmacion">Es permanente: <span class="respuesta-confirmacion" ng-bind=""></span></label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="titulos-confirmacion">Fecha inicial: <span class="respuesta-confirmacion" ng-bind=""></span></label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<label class="titulos-confirmacion">Fecha final: <span class="respuesta-confirmacion" ng-bind=""></span></label>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<h6 class="text-center titulo-opciones">FFM TOTALPLAY *</h6>
		            <hr/>
		            <div class="col-md-12">
		                <div class="row">
		                	<div class="col-md-12">
								<div class="input-group input-group-sm content-seach-group">
									<input id="buscadorGeografiaRegistro" type="text" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaRegistro()"> 
									<span class="fa fa-search iconoBusqueda"></span>
								</div>
							</div>
		                    <div class="scrollGeneralArbol">
		                    	<div id="arbolGeografiaRegistro" class="jstree-proton-3 proton-demo">										
								</div>
		                    </div>
		                </div>
		            </div>
				</div>
				<div class="col-md-6">
					<h6 id="labelGeografiasSeleccionadas" class="text-center titulo-opciones">SELECCIONADAS</h6>
		            <hr/>
		            <div class="col-md-12">
		                <div class="row">
			                <div id="contenedorGeografiasRegistro" class="scrollGeneralArbol">
				                <div class="row padding_resumen_ciudades" ng-repeat="ciudad in listaGeografiasSeleccionadas track by $index">
				                    <div class="col-md-6">
				                        <span class="text-body-table-arbol" ng-bind="ciudad.nombre"></span>
				                    </div>
				                    <div class="col-md-6">
										<li class="item_ciudad_resum text-body-table-arbol" ng-repeat="distrito in ciudad.hijos" ng-bind="distrito.text"></li>
				                    </div>
				                </div>
			                </div>
			            </div>
					</div>
				</div>
			</div>
		</div>
	</body>
	<!-- LIBRERIAS JS -->
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
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
    <!-- ARCHIVOS JS INTERNOS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/gestionNoticias/gestionNoticiasController.js" charset="UTF-8"></script>
</html>