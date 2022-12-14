<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>


<!DOCTYPE HTML>
<html ng-app="despacho">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
      
        <link rel="icon" type="image/png" sizes="192x192"   href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16"     href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css">

        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/typeahead/css/typeaheadjs.css" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.css"/>
		<link rel="stylesheet" media="print" href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.print.min.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/scheduler.min.css" />
        
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"/>     

        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css">
        
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css">

        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/css/style.min.css" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/css/proton/style.css" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css">

        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\styleMainBusqueda.css?v=${sessionScope.versionDepl}">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\mainNoticiaBusqueda.css?v=${sessionScope.versionDepl}">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/evidencia/styleMainEvidencia.css?v=${sessionScope.versionDepl}" /> 
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/loaders.css?v=${sessionScope.versionDepl}"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/mainAlertasPI.css?v=${sessionScope.versionDepl}"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/mainDespachoPI.css?v=${sessionScope.versionDepl}"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/mainModalInfoDetalleOtPe.css?v=${sessionScope.versionDepl}"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/responsiveComponents.css?v=${sessionScope.versionDepl}"/>

    </head>
    <body id="idBody" ng-controller="despachoController" style="display: none;">        

          
    	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>  
        <input style="display: none;" ng-keyup="buscarTecnicoCalendar()" ng-model="buscarTecnicoInput" type="text">
        <div ng-show="vistaDespacho" class="container-fluid container-filtros-despacho">            
            <div class="row">
                <div style="width: 1em;" ng-show="banderaErrorIntervencion">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2" style="margin-top: .8em;margin-left: -.5em;" title="No se encontro el catalogo de Intervencion"></i>
                </div>   
                <div class="col-1 columna-filtro-ind">
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Intervenci&oacute;n" type="text" id="filtro-intervencion" class="input-filtro-despacho form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
                            <li style="text-align: center;">
                                <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                            </li>     
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"  class="element-menu-filter">
                                <label  class="dropdown-item form-check-inputfiltro">
                                    <input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.tipoOrdenes) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
                                    <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                </label>
                                <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroIntervencion.html'" class="dropdown-menu"></ul>
                                 <ul  class="dropdown-menu">                     
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
                <div class="col-1 columna-filtro-ind">
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Estatus" type="text" id="filtro-estatus" class="input-filtro-despacho form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus">      
                            <li style="text-align: center;">
                                <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                            </li>     
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtro in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                <label  class="dropdown-item form-check-inputfiltro">
                                    <input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusdisponibles) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
                                    <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                </label>
                                <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatus.html'" class="dropdown-menu"></ul>
                            </li>
                        </ul>
                     </div>
                </div>
                <div style="width: 1em;" ng-show="banderaErrorTurno">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2" style="margin-top: .8em;margin-left: -.5em;" title="No se encontro el catalogo de Turno"></i>
                </div>
                <div class="col-1 columna-filtro-ind">
                    <div class="dropdown">
                        <input readonly  data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Turno" type="text" id="filtro-turno" class="input-filtro-despacho form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-turno">                                 
                            <li ng-repeat="turno in filtrosGeneral.turnosdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                <label  class="dropdown-item form-check-inputfiltro">
                                    <input id="filtrotext-turno-{{turno.id}}" class="form-check-input" type="checkbox" value="" ng-model="turno.checkedOpcion" ng-checked="turno.checkedOpcion"  />
                                    <span  for="filtrotext-turno-{{turno.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="turno.nombre"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>        
                <div class="col-1 columna-filtro-ind">
                    <input readonly ng-model="fechaInicioFiltro" placeholder="Selecciona fecha" type="text" id="filtro-fechainicio" class="datepicker input-filtro-despacho form-control form-control-sm" />
                </div>
                <div class="col-1 columna-filtro-ind">
                    <input readonly ng-model="fechaFinFiltro" placeholder="Selecciona fecha" type="text" id="filtro-fechafin" class="datepicker input-filtro-despacho form-control form-control-sm" />
                </div>
                <div style="width: 1em;" ng-show="banderaErrorGeografia">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2" style="margin-top: .8em;margin-left: -.5em;" title="No se encontro el catalogo de Geografia"></i>
                </div>
                <div class="col-1 columna-filtro-ind">
                    <input ng-click="abrirModalGeografia()" readonly  placeholder="Geograf&iacute;a" type="text" id="filtro-geografia" class="input-filtro-despacho form-control form-control-sm" />
                </div>
                <div class="col-1 ">
                    <button ng-disabled="!isCargaOtsPendientes || !isCargaOtsAsignadas" ng-click="refrescarBusqueda()" id="buscar-otsasignadas" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light" >
                        <span ng-if="isCargaOtsPendientes && isCargaOtsAsignadas" >Buscar</span>
                        <div ng-if="!isCargaOtsPendientes  || !isCargaOtsAsignadas" class="spinner-border spinner-cargando-info" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>             
                </div>
                <div class="col-2">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2" ng-show="banderaErrorGeneral" style="margin-top: .8em;"></i> <b ng-show="banderaErrorGeneral" class="text-no-seleccion-geografia">Algunos cat&aacute;logos no han sido encontrados</b>
                </div>
                <div class="col-3">                    
                    <button ng-disabled="!isCargaOtsPendientes || !isCargaOtsAsignadas" ng-click="refrescarBusqueda()" id="refrescar-otsasignadas" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light" >
                        <i ng-if="isCargaOtsPendientes && isCargaOtsAsignadas" class="fas fa-redo"></i>
                        <div ng-if="!isCargaOtsPendientes  || !isCargaOtsAsignadas" class="spinner-border spinner-cargando-info" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>  
                    <input ng-model="fechaFiltradoCalendar" readonly id="calendar-next-back"  type="text" class="form-control form-control-sm"  />                  
                    <div class="tooltip-btn">
                        <span ng-click="abrirModalDetalleIconografia()" class="paleta-color-despacho fas fa-palette">
                            <span class="tooltiptext-btn">Paleta de Colores</span>
                        </span>
                    </div>
                    <div class="tooltip-btn">
                        <span onclick="abrirModalReporte()" class="reporte-color-despacho icon-color-despacho fas fa-file-alt">
                            <span class="tooltiptext-btn">Reporte Operaci&oacute;n Diaria</span>
                        </span>
                    </div>
                    <div class="tooltip-btn">
                        <span onclick="abrirModalVistaMapa()" class="map-color-despacho icon-color-despacho fas fa-map">
                            <span class="tooltiptext-btn">Vista Mapa</span>
                        </span>
                    </div>
                    <div class="tooltip-btn">
                        <span ng-show="accionAsignarTecnicosGeocerca && isCargaOtsPendientes && isCargaOtsAsignadas" ng-click="loadGeografiaTecnicosGeocerca()" class="asignacion-color-despacho icon-color-despacho fa fa-exchange-alt">
                            <span class="tooltiptext-btn">Asignaci&oacute;n T&eacute;cnicos Geocerca</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div ng-show="vistaDespacho" class="container-fluid container-calendar-despacho">
            <div class="row">
                <div class="col-3 col-otspendientes">
                    <div ng-show="isCargaOtsPendientes"  class="container-busquedaotpendientes ">
                        <div class="col-8">
                            <div class="input-group input-group-sm content-seach-group search-parent-buscarot" style="position: absolute;">
                                <input ng-keyup="buscarOtPendiente($event)" id="buscar-ot-pendiente" type="text" class="form-control form-control-sm buscar-input-otpend"  placeholder="Buscar OT"  />
                                <!--span ng-click="buscarOtPendienteText();" class="input-group-text fa fa-search" id="buscar-btn-otpend"></span-->
                            </div>
                        </div>
                        <i class="icon-menu-tecnicosdisp fas fa-align-center icon_buscarOT" ng-click="abrirModalOtsIntervencionres()"></i>
                    </div>
                    <div ng-show="!isCargaOtsPendientes" class="cargando-otspendientes ">
                        <div class="wrapper"> 
                            <jsp:include page="./loaders/cargandootpendientes.jsp"></jsp:include>  
                            <jsp:include page="./loaders/cargandootpendientes.jsp"></jsp:include> 
                            <jsp:include page="./loaders/cargandootpendientes.jsp"></jsp:include> 
                            <jsp:include page="./loaders/cargandootpendientes.jsp"></jsp:include> 
                        </div>                                
                    </div>
                    <table ng-show="isCargaOtsPendientes" id="table-ot-pendientes" width="100%">
                        <thead>
                            <tr><td></td></tr>
                        </thead>
                        <tbody >  
                        	
                        </tbody>
                    </table>
                </div>
                <div class="col-9 col-otsasignadas">
                    <div class="row  container-fluid">
                        <div ng-if="!renderCalendario" class="cargando-tecnicos col-4">
                            <div class="wrapper">
                    
                                <jsp:include page="./loaders/cargandotecnicos.jsp"></jsp:include>  
                                <jsp:include page="./loaders/cargandotecnicos.jsp"></jsp:include>  
                                <jsp:include page="./loaders/cargandotecnicos.jsp"></jsp:include>  
                                <jsp:include page="./loaders/cargandotecnicos.jsp"></jsp:include> 
                                <jsp:include page="./loaders/cargandotecnicos.jsp"></jsp:include> 
                                <jsp:include page="./loaders/cargandotecnicos.jsp"></jsp:include> 
                            </div>    
                        </div>
                        <div ng-if="!renderCalendario" class="content-ots-cargando col-8">
                            <div class="wrapper-asignadas">
                                <jsp:include page="./loaders/cargandootsasignadas.jsp"></jsp:include>  
                                <jsp:include page="./loaders/cargandootsasignadas.jsp"></jsp:include>  
                                <jsp:include page="./loaders/cargandootsasignadas.jsp"></jsp:include>  
                                <jsp:include page="./loaders/cargandootsasignadas.jsp"></jsp:include>  
                                <jsp:include page="./loaders/cargandootsasignadas.jsp"></jsp:include>  
                                <jsp:include page="./loaders/cargandootsasignadas.jsp"></jsp:include> 
                            </div>
                        </div>
                    </div>
                       
                    <div ng-show="renderCalendario" id='calendar'></div>
                </div>
            </div>
        </div>
      
        <jsp:include page="./modals/geografia-mainfiltro.jsp"></jsp:include>    
        <jsp:include page="./modals/modalTecnicoEstatus.jsp"></jsp:include>    
        <jsp:include page="./modals/modalOtsTrabajadas.jsp"></jsp:include>  
        <jsp:include page="./modals/modalUbicacionOperario.jsp"></jsp:include>      
        <jsp:include page="./modals/modalVehiculoOperario.jsp"></jsp:include>    
        <jsp:include page="./modals/modalMateriales.jsp"></jsp:include>    
        <jsp:include page="./modals/modalAsignaOt.jsp"></jsp:include>    
        <jsp:include page="./modals/modalReasignaOt.jsp"></jsp:include>    

        <jsp:include page="./modals/modalComentarios.jsp"></jsp:include>    
        <jsp:include page="./modals/modalDetalleOt.jsp"></jsp:include>    
        <jsp:include page="./modals/modalIconografia.jsp"></jsp:include>    
        <jsp:include page="./modals/modalConfirmaDesconfirma.jsp"></jsp:include>    
        <jsp:include page="./modals/modalLocalizacionRegistros.jsp"></jsp:include>   
        <jsp:include page="./modals/modalFotoUsuario.jsp"></jsp:include>   
        <jsp:include page="./modals/modalVistaMapa.jsp"></jsp:include> 
        <jsp:include page="./modals/modalReporte.jsp"></jsp:include>
        <jsp:include page="./modals/modalDetalleOtsTecnico.jsp"></jsp:include>
        <jsp:include page="./modals/modalOtIntervenciones.jsp"></jsp:include>
        <jsp:include page="./modals/modalPagos.jsp"></jsp:include>
        <jsp:include page="./modals/modalDetalleSalesforce.jsp"></jsp:include>
        <jsp:include page="./modals/modalIntervencionesAsignadas.jsp"></jsp:include>
        <jsp:include page="./modals/modalOrganigrama.jsp"></jsp:include>
        <jsp:include page="./modals/modalEvidencia.jsp"></jsp:include>
        <jsp:include page="./modals/modalGeografiaTecnicosGeocerca.jsp"></jsp:include>
       
        <!--div ng-show="vistaDespacho" class="container-fluid d-flex justify-content-center">    
            <ul class="wall content-alert-parent">
                <li ng-click="getDetalleAlertas(tipoAlertaConteo)" style="background-color: {{tipoAlertaConteo.bgalerta}}" title="{{tipoAlertaConteo.IdDescripcion}}" class="element-alert" ng-repeat="tipoAlertaConteo in listadoConteoAlertasTipo track by $index"> 
                     <b class="badge-alerta badge red accent-3" ng-bind="tipoAlertaConteo.Contador"></b>
                     <i style="color:{{tipoAlertaConteo.calerta}}" class="icon-alerta-ind {{tipoAlertaConteo.IdIcono}}"></i>
                     <div class="text-tipo-alerta-hide">
                         <b class="text-alertatipo" ng-bind="tipoAlertaConteo.IdDescripcion"></b>
                     </div>
                </li>              
             </ul>         
        </div-->
        <div ng-show="vistaDespacho" class="container-fluid d-flex justify-content-center">    
            <ul class="wall content-alert-parent">
                <li ng-click="getDetalleAlertas(tipoAlertaConteo)" style="background-color: {{tipoAlertaConteo.hexaColor}}" title="{{tipoAlertaConteo.descripcion}}" class="element-alert" ng-repeat="tipoAlertaConteo in listadoConteoAlertasTipo track by $index"> 
                     <b class="badge-alerta badge red accent-3" ng-bind="tipoAlertaConteo.contador"></b>
                     <i style="color:{{tipoAlertaConteo.bgHexaColor}}" class="icon-alerta-ind {{tipoAlertaConteo.icono}}"></i>
                     <div class="text-tipo-alerta-hide">
                         <b class="text-alertatipo" ng-bind="tipoAlertaConteo.descripcion"></b>
                     </div>
                </li>              
             </ul>
        </div>
        <div id="contentAsignarTecnicosGeocerca" style="display: none;">
            <button type="button" ng-click="closeAsignaTecnicosGeocerca()" class="btn-close btn-close-tecnicosGeocerca"></button>
            <div>
                <div class="card-body-selected-tecnicoGeocerca">
                    <div class="col-md-12 card-selected-tecnicoGeocerca">
                        <div class="timeline_tecnicosGeocerca">
                            <div class="timeline-container primary" ng-repeat="item in listaTecnicosAsignar">
                                <div class="timeline-icon">
                                    <!-- <i class="fas fa-check"></i> -->
                                    <img class="efecto imagen_operario_foto" src="{{(item.urlFotoPerfil != undefined && item.urlFotoPerfil ? item.urlFotoPerfil:'./resources/img/plantainterna/despacho/tecnicootasignada.png' )}}"/>
                                </div>
                                <div class="timeline-body">
                                    <div class="row" style="height: 1.5em;">
                                        <div class="col-md-10">
                                            <span class="title_span" style="font-size: .8em;">{{item.usuarioFFM}}</span>
                                        </div>
                                        <div class="col-md-2 icon-eliminar-tecnico-geocerca" ng-click="eliminarTecnicoGeocerca(item.idTecnico)">
                                            <i class="far fa-trash-alt" style="cursor: pointer;" title="Eliminar"></i>
                                        </div>
                                    </div>
                                    <div class="card card-tecnicoGeocerca">
                                        <div class="row">
                                            <div class="col-md-12 text-format">
                                                <span class="title_span">
                                                    <strong>{{item.nombreCompleto}}</strong>
                                                </span><br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="asigna-geocerca-link" ng-if="listaTecnicosAsignar.length">
                        <span ng-click="openModalGeografiaTecnicos()">Asignar a Geocerca</span>
                    </div>
                    <div ng-if="!listaTecnicosAsignar.length" class="message-nodata">
                        <span>Ning&uacute;n T&eacute;cnico seleccionado</span>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="./contents/div-alertas-content.jsp"></jsp:include>  
        
    </body>
    <jsp:include page="../../generic/filtros/filtros.jsp"></jsp:include>
    <!--script type="text/javascript" src="http://code.jquery.com/jquery-2.1.1.js"></script
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script-->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-2.2.4.js" ></script>    
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js" ></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/typeahead/js/typeahead.bundle.js" ></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/js/jstree.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>

	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/schedulerPlantaInterna.js" ></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/orgChartJS/orgchart.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/jsonotsasignadas.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDespachoPI.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainMapas.js?v=${sessionScope.versionDepl}" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainFiltrosDespacho.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDespachoModals.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDespachoService.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainAlertasDespacho.js?v=${sessionScope.versionDepl}" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainAlertasService.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDependencias.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceController.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceService.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/evidencia/evidenciaController.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/evidencia/evidenciaService.js?v=${sessionScope.versionDepl}"></script> 
    
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/FileSaver.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.7.1/js/buttons.print.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/exportExcel/index.min.js"></script>
</html>


