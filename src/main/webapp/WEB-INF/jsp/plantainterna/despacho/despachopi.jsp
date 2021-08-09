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
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>

        <link href="${pageContext.request.contextPath}/resources/libraries/typeahead/css/typeaheadjs.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.print.min.css" rel="stylesheet" media="print" />
		<link href="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/scheduler.min.css" rel="stylesheet" />
        
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"  rel="stylesheet" />     

        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">

        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">

        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/style.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/proton/style.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css" rel="stylesheet">

        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/loaders.css"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/mainDespachoPI.css"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/despachopi/mainAlertasPI.css"  rel="stylesheet"/>


    </head>
    <body id="controllerdespacho" ng-controller="despachoController">        

    	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>  
        <input style="display: none;" ng-keyup="buscarTecnicoCalendar()" ng-model="buscarTecnicoInput" type="text">
        <div ng-show="vistaDespacho" class="container-fluid container-filtros-despacho">            
            <div class="row">
                <div class="col-1 columna-filtro-ind">
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Intervenci&oacute;n" type="text" id="filtro-intervencion" class="input-filtro-despacho form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
                            <li style="text-align: center;">
                                <button ng-click="seleccionarTodos(filtrosGeneral.tipoOrdenes)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="deseleccionarTodos(filtrosGeneral.tipoOrdenes)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                            </li>     
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"  class="element-menu-filter">
                                <label  class="dropdown-item form-check-inputfiltro">
                                    <input ng-click=setCheckFiltroGeneric(filtro) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
                                    <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                </label>
                                 <ul  class="dropdown-menu">                     
                                    <li  ng-repeat="subfiltro in filtro.children" class="element-menu-filter">
                                        <label  class="dropdown-item form-check-inputfiltro">
                                            <input ng-click=setCheckSubFiltroGeneric(subfiltro,filtro) id="subfiltrotext-{{subfiltro.id}}" class="form-check-input" type="checkbox" ng-model="subfiltro.checkedOpcion" ng-checked="subfiltro.checkedOpcion"    />
                                            <span  for="subfiltrotext-{{subfiltro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltro.nombre"></span>
                                        </label>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                     </div>
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
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Estatus" type="text" id="filtro-estatus-substatus" class="input-filtro-despacho form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">      
                            <li style="text-align: center;">
                                <button ng-click="seleccionarTodos(filtrosGeneral.estatusdisponibles)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="deseleccionarTodos(filtrosGeneral.estatusdisponibles)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                            </li>     
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtro in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                <label  class="dropdown-item form-check-inputfiltro">
                                    <input ng-click=setCheckFiltroGeneric(filtro) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
                                    <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                </label>
                                 <ul  class="dropdown-menu">                     
                                    <li  ng-repeat="subfiltro in filtro.children" class="element-menu-filter">
                                        <label  class="dropdown-item form-check-inputfiltro">
                                            <input ng-click=setCheckSubFiltroGeneric(subfiltro,filtro) id="subfiltrotext-{{subfiltro.id}}" class="form-check-input" type="checkbox" ng-model="subfiltro.checkedOpcion" ng-checked="subfiltro.checkedOpcion"    />
                                            <span  for="subfiltrotext-{{subfiltro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltro.nombre"></span>
                                        </label>
                                    </li>
                                </ul>
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
                <div class="col-1 columna-filtro-ind">
                    <input ng-click="abrirModalGeografia()" readonly  placeholder="Geograf&iacute;a" type="text" id="filtro-geografia" class="input-filtro-despacho form-control form-control-sm" />
                </div>
                <div class="col-2 ">
                    <button ng-disabled="!isCargaOtsPendientes || !isCargaOtsAsignadas" ng-click="refrescarBusqueda()" id="buscar-otsasignadas" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light" >
                        <span ng-if="isCargaOtsPendientes && isCargaOtsAsignadas" >Buscar</span>
                        <div ng-if="!isCargaOtsPendientes  || !isCargaOtsAsignadas" class="spinner-border spinner-cargando-info" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>             
                </div>
                <div class="col-4">
                    <input ng-model="fechaFiltradoCalendar" readonly id="calendar-next-back"  type="text" class="form-control form-control-sm"  />                  
                    <span ng-click="abrirModalDetalleIconografia()" class="paleta-color-despacho fas fa-palette"></span>
                    <span onclick="abrirModalVistaMapa()" class="map-color-despacho fas fa-map"></span>
                </div>
            </div>
        </div>
        <div ng-show="vistaDespacho" class="container-fluid container-calendar-despacho">
            <div class="row">
                <div class="col-3 col-otspendientes">
                    <div  ng-show="isCargaOtsPendientes"  class="container-busquedaotpendientes ">
                        <div class="col-8">
                            <div class="input-group input-group-sm content-seach-group  search-parent-buscarot">
                                <input ng-keyup="buscarOtPendiente($event)" id="buscar-ot-pendiente" type="text" class="form-control form-control-sm buscar-input-otpend"  placeholder="B&uacute;scar OT"  />
                                <!--span ng-click="buscarOtPendienteText();" class="input-group-text fa fa-search" id="buscar-btn-otpend"></span-->
                            </div>
                        </div>
                        <i class="icon-menu-tecnicosdisp fas fa-align-center"></i>                                                
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
        <jsp:include page="./modals/modalComentarios.jsp"></jsp:include>    
        <jsp:include page="./modals/modalDetalleOt.jsp"></jsp:include>    
        <jsp:include page="./modals/modalIconografia.jsp"></jsp:include>    
        <jsp:include page="./modals/modalConfirmaDesconfirma.jsp"></jsp:include>    
        <jsp:include page="./modals/modalLocalizacionRegistros.jsp"></jsp:include>   
        <jsp:include page="./modals/modalFotoUsuario.jsp"></jsp:include>   
        <jsp:include page="modals/modalVistaMapa.jsp"></jsp:include> 
       
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
                <li ng-click="getDetalleAlertas(tipoAlertaConteo)" style="background-color: {{tipoAlertaConteo.hexaColor}}" title="{{tipoAlertaConteo.id}}" class="element-alert" ng-repeat="tipoAlertaConteo in listadoConteoAlertasTipo track by $index"> 
                     <b class="badge-alerta badge red accent-3" ng-bind="tipoAlertaConteo.contador"></b>
                     <i style="color:white" class="icon-alerta-ind {{tipoAlertaConteo.icono}}"></i>
                     <div class="text-tipo-alerta-hide">
                         <b class="text-alertatipo" ng-bind="tipoAlertaConteo.descripcion"></b>
                     </div>
                </li>              
             </ul>
        </div>
        <jsp:include page="./contents/div-alertas-content.jsp"></jsp:include>  
        
    </body>
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

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/jsonotsasignadas.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDespachoPI.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainMapas.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainFiltrosDespacho.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDespachoModals.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDespachoService.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainAlertasDespacho.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainAlertasService.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/despachopi/mainDependencias.js"></script>

    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
</html>


