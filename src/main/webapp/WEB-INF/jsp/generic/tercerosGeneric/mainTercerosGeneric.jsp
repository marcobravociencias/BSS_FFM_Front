<html ng-app="tercerosGenericApp">
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
        <link href="${pageContext.request.contextPath}/resources/css/generic/tercerosGeneric/mainTercerosGeneric.css" rel="stylesheet">
        
	</head>
	<body id="idBody" ng-controller="tercerosGenericController" style="display: none;">
    	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
		<div class="container" id="container_terceros_generic">
			<div class="row">
				<div class="col-md-2">
                	<label class="etiquetasConsulta"><i class="fa fa-cubes"></i> Intervenciones</label>
                    <div>
                    	<input id="txtIntervencionesConsulta" type="text" class="form-control txtsConsultaGeneral" ng-click="abrirModalModalIntervencionesConsulta()" placeholder="NO HAY SELECCI&Oacute;N" readonly autocomplete="off">
					</div>
				</div>
				<div class="col-md-2">
                	<label class="etiquetasConsulta"><i class="fas fa-table"></i> Fecha inicial</label>
                    <div>
                    	<input readonly id="txtFechaInicioConsulta" type="text" class="datepicker form-control txtsConsultaGeneral">
					</div>
				</div>
				<div class="col-md-2">
                	<label class="etiquetasConsulta"><i class="fas fa-table"></i> Fecha final</label>
                    <div>
                    	<input readonly id="txtFechaFinConsulta" type="text" class="datepicker form-control txtsConsultaGeneral">
					</div>
				</div>
				<div class="col-md-2">
					<button  ng-click="consultarOTsTercerosGeneric()" id="btnConsultarOts" type="button" class="btn btn-sm btn-primary">
						<i class="fa fa-search"></i>
					</button>
				</div>
			</div>
			<div class="row contenedoresFila">
				<div class="col-md-3">
					<div class="row">
						<div class="col-md-12 container_informacion_ot">
							<div class="input-group input-group-sm contenedorBuscadorGeneral">
								<input id="txtBuscadorOtsConsultaTabla" type="text" class="form-control txtBusquedaGeneral" placeholder="Buscar OT" ng-keyup="busquedaOtsConsultaTabla($event)"> 
								<span class="fa fa-search iconoBusquedaGeneral"></span>
							</div>
							<div id="scrollTablaOtsPendientesConsulta" class="scrollTablaOtsPendientesConsulta">
								<table id="tablaOtsConsultaGeneral">
			                        <thead>
			                            <tr><th></th></tr>
			                        </thead>
			                    </table>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-2">
					<div class="row">
						<div class="col-md-12 container_nav_informacion_ot">
							<div ng-show="mostrarNavAccionesDetalleOtPendiente" class="nav flex-column nav-tabs text-center" id="" role="tablist" aria-orientation="vertical">
								<a data-mdb-toggle="tab" href="#contentInformacionDetalle" class="nav-link active textoNavDetalleOtPendiente opcionNavDetalleOtPendiente"><p class="parrafoTextoNavDetalleOtPendiente"><i class="fas fa-info-circle"></i></p>Informaci&oacute;n OT</a>
								<a data-mdb-toggle="tab" href="#contentDetalleIncidencia" class="nav-link textoNavDetalleOtPendiente opcionNavDetalleOtPendiente"><p class="parrafoTextoNavDetalleOtPendiente"><i class="fa fa-tasks"></i></p>Detalle incidencia</a>
								<a data-mdb-toggle="tab" href="#contentHistoricoDetalle" class="nav-link textoNavDetalleOtPendiente opcionNavDetalleOtPendiente"><p class="parrafoTextoNavDetalleOtPendiente"><i class="fas fa-heading"></i></p>Hist&oacute;rico</a>
								<a data-mdb-toggle="tab" href="#contentComentariosDettalle" class="nav-link textoNavDetalleOtPendiente opcionNavDetalleOtPendiente"><p class="parrafoTextoNavDetalleOtPendiente"><i class="fas fa-comment-dots"></i></p>Comentarios</a>
								<a data-mdb-toggle="tab" href="#contentArchivosDetalle" class="nav-link textoNavDetalleOtPendiente opcionNavDetalleOtPendiente"><p class="parrafoTextoNavDetalleOtPendiente"><i class="fas fa-archive"></i></p>Archivos</a>
								<a data-mdb-toggle="tab" href="#contentAccionesDetalle" class="nav-link textoNavDetalleOtPendiente opcionNavDetalleOtPendiente"><p class="parrafoTextoNavDetalleOtPendiente"><i class="fas fa-cog"></i></p>Acciones</a>
								<a data-mdb-toggle="tab" href="#contentRechazoDetalle" class="nav-link textoNavDetalleOtPendiente opcionNavDetalleOtPendiente"><p class="parrafoTextoNavDetalleOtPendiente"><i class="fas fa-times"></i></p>Rechazo</a>
								<a data-mdb-toggle="tab" href="#contentPausaDetalle" class="nav-link textoNavDetalleOtPendiente opcionNavDetalleOtPendiente"><p class="parrafoTextoNavDetalleOtPendiente"><i class="fas fa-pause"></i></p>Pausa</a>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-7">
					<div class="row">
					
						<div ng-show="!mostrarNavAccionesDetalleOtPendiente" class="col-md-12 container_sin_informacion_ot">
							<h5 id="tituloInformacionOt"><strong>SIN SELECCI&Oacute;N DE OT</strong></h5>
					        <hr></hr>
					        <p class="parrafoSinInformacionOt">Selecciona una OT y podr&aacute;s visualizar las siguientes opciones:</p>
					        <div id="contenedorParrafosSinInformacionOt">
								<p class="parrafoSinInformacionOt" >Informaci&oacute;n de la OT</p>
								<p class="parrafoSinInformacionOt" >Detalles de la Instalaci&oacute;n</p>
								<p class="parrafoSinInformacionOt" >Hist&oacute;rico</p>
								<p class="parrafoSinInformacionOt" >Comentarios</p>
								<p class="parrafoSinInformacionOt" >Evidencia</p>
								<p class="parrafoSinInformacionOt" >Asignaci&oacute;n de equipos</p>
							</div>
							<p class="parrafoSinInformacionOtFooter">* Si la OT a&uacute;n no se encuentra <FONT COLOR="red">terminada</FONT> solo podr&aacute;s visualizar la Informaci&oacute;n de la OT</p>
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
		</div>
		<jsp:include page="./modal/modalArbolIntervenciones.jsp"></jsp:include>
		<jsp:include page="./modal/modalDetalleInformacionOtPendiente.jsp"></jsp:include>
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
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/tercerosGeneric/tercerosGenericController.js" charset="UTF-8"></script>
	
</html>