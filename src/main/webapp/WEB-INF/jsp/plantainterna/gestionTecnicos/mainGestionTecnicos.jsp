<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html lang="es" ng-app="gestionTecnicosApp">

	<head>
	    <meta charset="ISO-8859-1" />
	    <title>FFM Total play</title>
	
	    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
	    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
	    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
	    <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css">
	    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" />
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/gestionTecnicos/mainGestionTecnicos.css?v=${sessionScope.versionDepl}" />
	
	</head>

	<body id="idBody" class="body" ng-controller="gestionTecnicosController" style="display: none;">
	    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
	    <div class="container">
	        <div class="container container-title-header" style="padding: 0 !important;">
	            <div class="header-modulo">
	                <h5 class="title-modulo">Gesti&oacute;n de T&eacute;cnicos</h5>
	                <h1 class="h6 subtitle-modulo"></h1>
	            </div>
	        </div>
	        <div class="container-fluid" id="container_gestionTecnicos">
	            <div class="content-fluid">
	                <div class="row">
	                    <div class="col-3 mb-2" id="container_busquedaTecnico" style="padding-right: 0;">
	                    	
	                    	<ul class="nav nav-tabs" id="myTab" role="tablist" style="margin: 0.5em;">
		                        <li class="nav-item">
		                            <a class="nav-link active" id="consulta-tecnicos-tab" data-toggle="tab" href="#consulta-tecnicos" role="tab"
		                                aria-controls="opcion-consulta" aria-selected="true" ng-click="consultarTecnicos()">T&eacute;cnicos</a>
		                        </li>
		                        <li class="nav-item">
		                            <a class="nav-link" id="consulta-auxiliares-tab" data-toggle="tab" href="#consulta-auxiliares" role="tab"
		                                aria-controls="opcion-alta" aria-selected="false" ng-click="consultarAuxiliares()">Auxiliares</a>
		                        </li>
		                    </ul>
		                    
		                    <div class="tab-content" id="v-pills-tabContent">
	                        	<div class="tab-pane fade show active" id="consulta-tecnicos" role="tabpanel" aria-labelledby="consulta-tecnicos-tab">
	                        		<div class="col-12" style="margin-top: 1em; margin-bottom: 1em;">
			                            <div class="row">
			                                <div class="col-12">
			                                    <input placeholder="Buscar" type="text" autocomplete="off" class="search-filtro form-control form-control-sm mt-0" id="searchTecnico" ng-model="searchTecnico">
			                                    <i class="fa fa-search icon-search"></i>
			                                </div>
			                            </div>
			                        </div>
			                        <div style="margin-left: 2%;" ng-repeat="tecnico in listTecnicos | filter:searchTecnico">
			                            <div id="{{tecnico.idTecnico}}" class="valign-wrapper tecnicosDiv">
			                                <div class="col-12" style="margin-bottom: 0.1em;">
			                                    <div class="row">
			                                        <div class="col-1 media-image online pr-0" style="padding-left: 0;">
			                                            <img src="./resources/img/plantainterna/despacho/tecnicootasignada.png" class="circle responsive-img-tecnico">
			                                        </div>
			                                        <div id="" class="col-9" style="padding-left: 1.3em;">
			                                            <p class="text-tecnico-nombre">{{tecnico.nombre}}</p>
			                                            <p class="text-adds-teccnico">
			                                                <i style="color:#7716fa" class="fa fa-user"></i> {{tecnico.usuarioFfm}} &nbsp
			                                                <i style="color:#7716fa;" class="fa fa-phone"></i> {{tecnico.telefono}}
			                                            </p>
			                                        </div>
			                                        <div class="col-2 icono_check_tecnico mt-1" >
			                                            <p id="tec-{{tecnico.idTecnico}}" class="text-aux" ng-click="consultarDisponibilidadTecnico(tecnico)">TEC</p>
	<!-- 		                                            <p id="aux-{{tecnico.idTecnico}}" class="text-aux" ng-click="consultarDisponibilidadAux(tecnico)">AUX</p> -->
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                        </div> 
	                        	</div>
	                        	<div class="tab-pane fade" id="consulta-auxiliares" role="tabpanel" aria-labelledby="consulta-auxiliares-tab">
	                        		<div class="col-12" style="margin-top: 1em; margin-bottom: 1em;">
			                            <div class="row">
			                                <div class="col-12">
			                                    <input placeholder="Buscar" type="text" autocomplete="off" class="search-filtro form-control form-control-sm mt-0" id="searchAuxiliar" ng-model="searchAuxiliar">
			                                    <i class="fa fa-search icon-search"></i>
			                                </div>
			                            </div>
			                        </div>
			                        <div style="margin-left: 2%;" ng-repeat="auxiliar in listAuxiliares | filter:searchAuxiliar">
			                            <div id="{{auxiliar.idAuxiliar}}" class="valign-wrapper tecnicosDiv">
			                                <div class="col-12" style="margin-bottom: 0.1em;">
			                                    <div class="row">
			                                        <div class="col-1 media-image online pr-0" style="padding-left: 0;">
			                                            <img src="./resources/img/plantainterna/despacho/tecnicootasignada.png" class="circle responsive-img-tecnico">
			                                        </div>
			                                        <div id="" class="col-9" style="padding-left: 1.3em;">
			                                            <p class="text-tecnico-nombre">{{auxiliar.nombre}}</p>
			                                            <p class="text-adds-teccnico">
			                                                <i style="color:#7716fa" class="fa fa-user"></i> {{auxiliar.usuarioFfm}} &nbsp
			                                                <i style="color:#7716fa;" class="fa fa-phone"></i> {{auxiliar.telefono}}
			                                            </p>
			                                        </div>
			                                        <div class="col-2 icono_check_tecnico mt-1" >
	<!-- 		                                            <p id="tec-{{auxiliar.idAuxiliar}}" class="text-aux" ng-click="consultarDisponibilidadTecnico(tecnico)">TEC</p> -->
			                                            <p id="aux-{{auxiliar.idAuxiliar}}" class="text-aux" ng-click="consultarDisponibilidadTecnico(auxiliar)">AUX</p>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                        </div> 
	                        	</div>
	                        </div>
	                        	                    	
	                         
	                    </div>
	                    <div class="col-9" id="container_calendarioDetalle" ng-show="!isDetalleMesTecnico">
	                        <div class="row">
	                            <div class="col-8" id="container_calendarioActividades" style="padding-right: 0;">
	                                <div class="row">
	                                    <div class="col-12">
	                                        <div class="contenido_color">
	                                            <i class="fa fa-sm fa-circle" style="color: #08d85c;"></i>
	                                            <small> Trabajado</small>
	                                        </div>
	                                        <div class="contenido_color">
	                                            <i class="fa fa-sm fa-circle" style="color: #b9bfbc;"></i>
	                                            <small> D&iacute;a justificado</small>
	                                        </div>
	                                        <div style="float: right;">
	                                            <div class="contenido_color">
	                                                <i class="fas fa-arrow-circle-right icon-back" style="color: #7716fa;"></i>
	                                                <small> Hora ingreso</small>
	                                            </div>
	                                            <div class="contenido_color">
	                                                <i class="fas fa-arrow-circle-left icon-back" style="color: #7716fa;"></i>
	                                                <small> Hora salida</small>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                                <div style="margin-bottom: 1em; margin-top: 1em;" id="calendar_gestionTecnicos"></div>
	                            </div>
	                            <div class="col-4" id="container_detalleTecnico">
	                                <div class="col-12 text-right" ng-class="isTecnicoSelected ? 'mb-0' : 'mb-5'" >
	                                    <div class="container-detalle-tecnico-button" ng-show="isTecnicoSelected">
	                                        <span id="btnDetalleTecnico" ng-click="consultarDetalleMesTecnico()">Detalle T&eacute;cnico</span>
	                                    </div>
	                                </div>
	                                <div class="col-12" id="containerTecnico_vacio" ng-show="!isDetalle">
	                                    <span style="color:#7716fa; font-weight: bold;">SIN SELECCI&Oacute;N DE D&Iacute;A</span>
	                                    <hr>
	                                    Selecciona un d&iacute;a del calendario y podr&aacute;s visualizar el detalle
	                                </div>
	                                <div class="col-12" id="containerTecnico_detalle" ng-show="isDetalle">
	                                    <div style="text-align: center;">
	                                        <span style="color:#7716fa; font-weight: bold;">Detalle Justificaci&oacute;n</span>
	                                    </div>
	                                    <hr>
	                                    <div ng-show="isJustificacion">
	                                        <div class="container-fluid tecnico-content">
	                                            <div class=""><span class="text-title-tecnico">USUARIO QUE CREA</span></div>
	                                            <div class=""><span class="text-content-tecnico">{{justificacionDetalle.usuarioFFM}}</span></div>
	                                        </div>
	                                        <div class="container-fluid tecnico-content">
	                                            <div class=""><span class="text-title-tecnico">NOMBRE QUE CREA</span></div>
	                                            <div class=""><span class="text-content-tecnico">{{justificacionDetalle.nombreDepacho}}</span></div>
	                                        </div>
	                                        <div class="container-fluid tecnico-content">
	                                            <div class=""><span class="text-title-tecnico">FECHA DE REGISTRO</span></div>
	                                            <div class=""><span class="text-content-tecnico">{{justificacionDetalle.fechaCreacion}}</span></div>
	                                        </div>
	                                        <div class="container-fluid tecnico-content">
	                                            <div class=""><span class="text-title-tecnico">MOTIVO DE JUSTIFICACI&Oacute;N</span></div>
	                                            <div class=""><span class="text-content-tecnico">{{justificacionDetalle.justificacion}}</span></div>
	                                        </div>
<!-- 	                                        <div class="container-fluid tecnico-content"> -->
<!-- 	                                            <div class=""><span class="text-title-tecnico">FOLIO DE JUSTIFICACI&Oacute;N</span></div> -->
<!-- 	                                            <div class=""><span class="text-content-tecnico">{{justificacionDetalle.FolioJustificacion}}</span></div> -->
<!-- 	                                        </div> -->
	                                        <div class="container-fluid tecnico-content">
	                                            <div class=""><span class="text-title-tecnico">INICIO DE JUSTIFICACI&Oacute;N</span></div>
	                                            <div class=""><span class="text-content-tecnico">{{justificacionDetalle.fechaInicio}}</span></div>
	                                        </div>
	                                        <div class="container-fluid tecnico-content">
	                                            <div class=""><span class="text-title-tecnico">FIN DE JUSTIFICACI&Oacute;N</span></div>
	                                            <div class=""><span class="text-content-tecnico">{{justificacionDetalle.fechaFin}}</span></div>
	                                        </div>
	                                        <div class="container-fluid tecnico-content text-center mb-1">
	                                            <button class="btn btn-sm btnDetalleJustificacion" ng-click="consultarComentariosJustificacion()"><i class="fa fa-comments"></i></button>
	                                            <button class="btn btn-sm btnDetalleJustificacion" ng-click="consultarArchivosJustificacion()" style="padding: 0.3em 0.7em !important;"><i class="fa fa-file"></i></button>
	                                            <button class="btn btn-sm btnDetalleJustificacion" ng-click="openModalEditarJustificacion(justificacionDetalle)"><i class="fa fa-pencil-square"></i></button>
	                                            <button class="btn btn-sm btnDetalleJustificacion" ng-click="eliminarJustificacionTecnico(justificacionDetalle)"><i class="far fa-trash-alt"></i></button>
	                                        </div>
	                                    </div>
	                                    <div ng-show="!isJustificacion">
	                                        <div style="text-align: center;">
	                                            <span style="color:#7716fa; font-weight: bold;">No se encontr&oacute; informaci&oacute;n</span>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="col-9" id="container_detalleMesTecnico" ng-show="isDetalleMesTecnico">
	                        <div class="row filter-content" style="margin-top: .5em;">
	                            <div class="col-6" style="margin-top: .5em;">
	                                <h5 class="title-modulo" style="margin-left: 3%;">Detalle Mes {{tituloDetalle}}</h5>
	                            </div>
	                            <div class="offset-5 col-1" style="margin-top: .5em;">
	                                <i class="fas fa-arrow-circle-left icon-back" ng-click="changeView()" title="Regresar"></i>
	                            </div>
	                        </div>
	                        <br>
	                        <div class="col-12" style="padding-left: 0;">
	                            <div class="row">
	                                <div class="col-7">
	                                    <div class="container-fluid tecnico-content-detalle">
	                                        <div class="container-text-title-detalle"><span class="text-title-tecnico"># Empleado</span></div>
	                                        <div class="container-text-content-detalle"><span class="text-content-tecnico">{{tecnicoDisp.tecnico}}</span></div>
	                                    </div>
	                                    <div class="container-fluid tecnico-content-detalle">
	                                        <div class="container-text-title-detalle"><span class="text-title-tecnico">T&eacute;cnico</span></div>
	                                        <div class="container-text-content-detalle"><span class="text-content-tecnico">{{tecnicoDisp.nombre}}</span></div>
	                                    </div>
	                                    <div class="container-fluid tecnico-content-detalle">
	                                        <div class="container-text-title-detalle"><span class="text-title-tecnico">OTs trabajadas</span></div>
	                                        <div class="container-text-content-detalle"><span class="text-content-tecnico">{{tecnicoDisp.numots}}</span></div>
	                                    </div>
	                                </div>
	                                <div class="col-5">
	                                    <div class="container-fluid tecnico-content-detalle">
	                                        <div class="container-text-title-detalle"><span class="text-title-tecnico">D&iacute;as justificados</span></div>
	                                        <div class="container-text-content-detalle"><span class="text-content-tecnico">0</span></div>
	                                    </div>
	                                    <div class="container-fluid tecnico-content-detalle">
	                                        <div class="container-text-title-detalle"><span class="text-title-tecnico">D&iacute;as trabajados</span></div>
	                                        <div class="container-text-content-detalle"><span class="text-content-tecnico">0</span></div>
	                                    </div>
	                                </div>
	                            </div>
	                            <br>
	                            <ul class="nav nav-tabs" id="myTab" role="tablist">
	                                <li class="nav-item">
	                                    <a class="nav-link active" id="opcion-dias-tab" data-toggle="tab" href="#opcion-dias" role="tab"
	                                        aria-controls="opcion-dias" aria-selected="true" >D&iacute;as trabajados</a>
	                                </li>
	                                <li class="nav-item">
	                                    <a class="nav-link" id="opcion-ots-tab" data-toggle="tab" href="#opcion-ots" role="tab"
	                                        aria-controls="opcion-ots" aria-selected="false">OTS trabajadas</a>
	                                </li>
	                                <li class="nav-item">
	                                    <a class="nav-link" id="opcion-justificaciones-tab" data-toggle="tab" href="#opcion-justificaciones" role="tab"
	                                        aria-controls="opcion-justificaciones" aria-selected="false">Justificaciones</a>
	                                </li>
	                            </ul>
	                            <div class="tab-content">
	                                <div class="tab-pane fade show active" id="opcion-dias" role="tabpanel" aria-labelledby="opcion-dias-tab">
	                                    <div class="content-fluid" style="margin-top: 0.7em;">
	                                        <div class="table-responsive">
	                                            <table class="display table" width="100%" id="tableDiasTrabajados">
	                                                <thead id="thead_diasTrabajados">
	                                                    <tr>
	                                                        <th>Fecha</th>
	                                                        <th>Hora inicio</th>
	                                                        <th>Hora fin</th>
	                                                        <th>OTS</th>
	                                                    </tr>
	                                                </thead>
	                                                <tbody>
	                                                </tbody>
	                                            </table>
	                                        </div>
	                                    </div>
	                                </div>
	                                <div class="tab-pane fade" id="opcion-ots" role="tabpanel" aria-labelledby="opcion-ots-tab">
	                                    <div class="content-fluid" style="margin-top: 0.7em;">
	                                        <div class="table-responsive">
	                                            <table class="display table" width="100%" id="tableOtsTrabajadas">
	                                                <thead id="thead_otsTrabajadas">
	                                                    <tr>
	                                                        <th>OT</th>
	                                                        <th>OS</th>
	                                                        <th>Cuenta</th>
	                                                        <th>Tipo</th>
	                                                        <th>Subtipo</th>
	                                                        <th>Fecha inicio</th>
	                                                        <th>Fecha fin</th>
	                                                        <th>Usuario auxiliar</th>
	                                                        <th>Auxiliar</th>
	                                                        <th>Puntualidad</th>
	                                                        <th>Tiempo total</th>
	                                                        <th>Opciones</th>
	                                                    </tr>
	                                                </thead>
	                                                <tbody>
	                                                </tbody>
	                                            </table>
	                                        </div>
	                                    </div>
	                                </div>
	                                <div class="tab-pane fade" id="opcion-justificaciones" role="tabpanel" aria-labelledby="opcion-justificaciones-tab">
	                                    <div class="content-fluid" style="margin-top: 0.7em;">
	                                        <div class="table-responsive">
	                                            <table class="display table" width="100%" id="tableJustificaciones">
	                                                <thead id="thead_justificaciones">
	                                                    <tr>
	                                                        <th>#Empleado creador</th>
	                                                        <th>Empleado creador</th>
	                                                        <th>Folio</th>
	                                                        <th>Fecha inicio</th>
	                                                        <th>Falla fin</th>
	                                                        <th>Fecha registro</th>
	                                                        <th>Fecha modificaci&oacute;n</th>
	                                                    </tr>
	                                                </thead>
	                                                <tbody>
	                                                </tbody>
	                                            </table>
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
	    <jsp:include page="./modals/modalComentarios.jsp"></jsp:include>
	    <jsp:include page="./modals/modalArchivos.jsp"></jsp:include>
	    <jsp:include page="./modals/modalEditarJustificacion.jsp"></jsp:include>
	    <jsp:include page="./modals/modalAgregarJustificacion.jsp"></jsp:include>
	    <jsp:include page="./modals/modalDetalleTrabajo.jsp"></jsp:include>
	</body>
	
	<!-- Scripts libraries -->
	<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
	<!-- fin -->
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTecnicos/gestionTecnicosController.js?v=${sessionScope.versionDepl}" charset="UTF-8"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTecnicos/gestionTecnicosService.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTecnicos/jsonGestionTecnicos.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

</html>