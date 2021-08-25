<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="coordInstalacionesPIApp">
    <head>
        <meta charset="UTF-8" />
        <title>FFM Total play</title>
        <link rel="icon" type="image/png" sizes="192x192"
        href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32"
        href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96"
        href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16"
        href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css"
        rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css"
        rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css"
        rel="stylesheet">
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlkqLjBBERaYT3XXhZiRZIy6nBPN3G0iU&libraries=places" ></script>
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css"
        rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
        rel="stylesheet">
        <link
        href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
        rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
        rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/coordInstalaciones/styleCoordInstalaciones.css"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css" rel="stylesheet">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jQueryTimelinr/css/timelinr.css"/>
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.css' rel='stylesheet' />
        <link href='https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/css/all.css' rel='stylesheet'>
    </head>
    <body id="idBody" ng-controller="coordInstPIController" style="overflow-x: hidden;">
        
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        
        
        <div class="col-md-12 style_container_reportes" id="bodyGral">
            <div class="row">
                <div class="col-md-2">
        
                </div>
                <div class="col-md-10">
                    <div class="container container-title-header" style="padding: 0px !important;">
                        <div class="header-modulo">
                            <h5 class="title-modulo">M&oacute;dulo de coordinador de instalaciones</h5>
                            <h1 class="h6 subtitle-modulo">En este m&oacute;dulo se podr&aacute;n visualizar los reportes correspondientes al coordinador</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2" id="navbar_reportes">
                    <!--div class="align-rigth col-md-12">
                        <button id="ocultar_nav" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div-->
                    <br/>
                    <ul class="list-group-flush list-group">
                        <li id="link-bsq-general" class="list-group-item list-group-item-action elemento_link nav-link active">
                            <span class="fon_size_menu">Busqueda General</span>
                        </li>
                        <li id="link-pendientes-asignar" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Pendientes por agenda</span>
                        </li>
                        <li  id="link-rescataventas"class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Rescataventas</span>
                        </li>
        
                        <li id="link-pendientes-activar" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Pendientes de activar</span>
                        </li>		
                        
                        <li id="link-calendarizado" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Calendarizado</span>
                        </li>	
                        
                        <li id="link-plazas-comerciales" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Plazas Comerciales</span>
                        </li>		
                        
                        <li id="link-canceladas" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Canceladas</span>
                        </li>		
                        <li id="link-reagenda" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Reagenda</span>
                        </li>	
                        <li id="link-calendarizado-vencido" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Calendarizado vencido</span>
                        </li> 
                        <li id="link-terminadas" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Terminadas</span>
                        </li> 
                        <li id="link-detenidas" class="list-group-item list-group-item-action elemento_link nav-link">
                            <span class="fon_size_menu">Detenidas</span>
                        </li> 
                    </ul>
                </div>
                <div class="col-md-10 contentReport" id="datos_tablas">
                    <a class="menuOpt" id="btn_mostrar_nav" style="display:none; position: absolute;">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </a>                  
                    <div class="wraper_table contenedores-general" id="container-bsq-general">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Busqueda General</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <jsp:include page="./content/busqGeneral.jsp"></jsp:include>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-agendamiento-pendientesasignar">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Pendientes por Agenda</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="filtros_pendientes_por_agendar">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_coord_insta" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_coord_insta" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>	
                                    <div class="col-2 column-style-consulta">
                                        <label for="inputPlaceholderEx" class="label-filter">Distrito</label>
                                            <input readonly="" placeholder="Seleccione distrito" 
                                            type="text" id="cluster" class="form-control input-filtro-coordInst form-control-sm"
                                            ng-click="abrirModalGeografiaRep()">
                                        </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn_coordi_instal" ng-click="obtenerPendientesAgenda()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary"  
                                        >
                                        <i class="fa fa-search" ></i>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-pendientes-agenda">
                                <table id="table_coordinador_inst" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead_coordinador_inst">
                                        <tr>
                                                
                                            <th>CSP</th>
                                            <th>CS</th>
                                            <th>Cotizaci&oacute;n</th>
                                            <th>Cuenta</th>
                                            <th>Cuenta Factura</th>
                                            <th>Paquete</th>
                                            <th>Plaza</th>
                                            <th>Distrito</th>
                                            <th>Fecha creaci&oacute;n</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>					   
                                      </tbody>   		
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-agendamiento-rescataventas">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Rescataventas</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_coord_rescataventas" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_coord_rescataventas" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>		
                                    <div class="col-2 column-style-consulta">
                                        <label for="inputPlaceholderEx" class="label-filter">Distrito</label>
                                        <input readonly="" placeholder="Selecciona distrito" 
                                        type="text" id="cluster-rescataventas" class="form-control input-filtro-coordInst form-control-sm"
                                        ng-click="abrirModalGeografiaRep()">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-cuentasrescataventas-salesforce"  
                                        ng-click="obtenerRescataventas()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-rescataventas">
                                <table id="table-rescataventas" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-rescataventas">
                                        <tr>
                                            <th>CSP</th>
                                            <th>CS</th>
                                            <th>Cotizaci&oacute;n</th>
                                            <th>Cuenta</th>
                                            <th>Cuenta Factura</th>
                                            <th>Paquete</th>
                                            <th>Plaza</th>
                                            <th>Distrito</th>
                                            <th>Fecha creaci&oacute;n</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>					   
                                        </tbody>   		
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-agendamiento-pendientesactivar">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Pendientes de activar</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_coord_poractivar" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_coord_poractivar" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>		
                                    <div class="col-2 column-style-consulta">
                                        <label for="inputPlaceholderEx" class="label-filter">Distrito</label>
                                        <input readonly="" placeholder="Selecciona distrito" 
                                        type="text" id="cluster-pendientesactivar" class="form-control input-filtro-coordInst form-control-sm"
                                        ng-click="abrirModalGeografiaRep()">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-cuentasrescataventas-salesforce"  
                                        ng-click="obtenerPendientesActivar()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-pendientes-activar">
                                <table id="tables-pendientes-activar" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-pendientes-activar">
                                        <tr>
                                            <th>CSP</th>
                                            <th>CS</th>
                                            <th>Cotizaci&oacute;n</th>
                                            <th>Cuenta</th>
                                            <th>Cuenta Factura</th>
                                            <th>Paquete</th>
                                            <th>Plaza</th>
                                            <th>Distrito</th>
                                            <th>Fecha creaci&oacute;n</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>					   
                                    </tbody>   		
                                </table>

                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-calendarizado">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Calendarizado</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_calendarizado" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_calendarizado" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="intervencion_calendarizado" class="label-filter">Intervenci&oacute;n</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
                                            type="text" id="intervencion_calendarizado" class="input-filtro-coordInst form-control form-control-sm" />
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
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="selectMotivoCalendarizado" class="label-filter">Motivo</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" 
                                            placeholder="Seleccione..." type="text" id="selectMotivoCalendarizado" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">      
                                                <li style="text-align: center;">
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,true)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,false)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                                </li>     
                                                <li class="elemento_menu dropdown-divider"></li>
                                                <li ng-repeat="filtroE in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                        <input ng-click=checkFiltroEstatus(filtroE) id="filtrotext-{{filtroE.id}}" class="form-check-input" type="checkbox" ng-model="filtroE.checkedOpcion" ng-checked="filtroE.checkedOpcion"  />
                                                        <span  for="filtrotext-{{filtroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtroE.nombre"></span>
                                                    </label>
                                                     <ul  class="dropdown-menu">                     
                                                        <li  ng-repeat="subfiltroE in filtroE.children" class="element-menu-filter">
                                                            <label  class="dropdown-item form-check-inputfiltro">
                                                                <input ng-click=checkFiltroEstatus(subfiltroE) id="subfiltrotext-{{subfiltroE.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroE.checkedOpcion" ng-checked="subfiltroE.checkedOpcion"    />
                                                                <span  for="subfiltrotext-{{subfiltroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroE.nombre"></span>
                                                            </label>
                                                            <ul  class="dropdown-menu">                     
                                                                <li  ng-repeat="subfiltroJ in subfiltroE.children" class="element-menu-filter">
                                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                                        <input ng-click=checkFiltroEstatus(subfiltroJ) id="subfiltrotext-{{subfiltroJ.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroJ.checkedOpcion" ng-checked="subfiltroJ.checkedOpcion"    />
                                                                        <span  for="subfiltrotext-{{subfiltroJ.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroJ.nombre"></span>
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                         </div>
                                    </div>

                                    <div class="col-2 column-style-consulta">
                                        <label for="ot_calendarizado" class="label-filter">OT</label>
                                        <input type="text" id="ot_calendarizado" placeholder="Ej: 65434"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="os_calendarizado" class="label-filter">OS</label>
                                        <input type="text" id="os_calendarizado" placeholder="Ej: 23214"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="cuenta_calendarizado" class="label-filter">Cuenta</label>
                                        <input type="text" id="cuenta_calendarizado" placeholder="Ej: 0093484233"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-calendarizado-salesforce"  
                                        ng-click="obtenerCalendarizado()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-candelarizado">
                                <table id="tables-calendarizado" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-calendarizado">
                                        <tr>
                                            <th>OT</th>
                                            <th>OS</th>
                                            <th>Cuenta</th>
                                            <th>Cliente</th>
                                            <th>Fecha actualizaci&oacute;n</th>
                                            <th>Status</th>
                                            <th>Estado</th>
                                            <th>Descripci&oacute;n</th>
                                            <th>Actualizar Reg</th>
                                            <th>Paquete</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>				   
                                    </tbody>   		
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-plazas-comerciales">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Plazas Comerciales</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_plazas_comer" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_plazas_comer" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="intervencion_plazas_comer" class="label-filter">Intervenci&oacute;n</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
                                            type="text" id="intervencion_plazas_comer" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="intervencion_plazas_comer">      
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
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="selectMotivoPlazas" class="label-filter">Motivo</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" 
                                            placeholder="Seleccione..." type="text" id="selectMotivoPlazas" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="selectMotivoPlazas">      
                                                <li style="text-align: center;">
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,true)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,false)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                                </li>     
                                                <li class="elemento_menu dropdown-divider"></li>
                                                <li ng-repeat="filtroE in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                        <input ng-click=checkFiltroEstatus(filtroE) id="filtrotext-{{filtroE.id}}" class="form-check-input" type="checkbox" ng-model="filtroE.checkedOpcion" ng-checked="filtroE.checkedOpcion"  />
                                                        <span  for="filtrotext-{{filtroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtroE.nombre"></span>
                                                    </label>
                                                     <ul  class="dropdown-menu">                     
                                                        <li  ng-repeat="subfiltroE in filtroE.children" class="element-menu-filter">
                                                            <label  class="dropdown-item form-check-inputfiltro">
                                                                <input ng-click=checkFiltroEstatus(subfiltroE) id="subfiltrotext-{{subfiltroE.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroE.checkedOpcion" ng-checked="subfiltroE.checkedOpcion"    />
                                                                <span  for="subfiltrotext-{{subfiltroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroE.nombre"></span>
                                                            </label>
                                                            <ul  class="dropdown-menu">                     
                                                                <li  ng-repeat="subfiltroJ in subfiltroE.children" class="element-menu-filter">
                                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                                        <input ng-click=checkFiltroEstatus(subfiltroJ) id="subfiltrotext-{{subfiltroJ.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroJ.checkedOpcion" ng-checked="subfiltroJ.checkedOpcion"    />
                                                                        <span  for="subfiltrotext-{{subfiltroJ.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroJ.nombre"></span>
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                         </div>
                                    </div>

                                    <div class="col-2 column-style-consulta">
                                        <label for="ot_plazas_comer" class="label-filter">OT</label>
                                        <input type="text" id="ot_plazas_comer" placeholder="Ej: 65434"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="os_plazas_comer" class="label-filter">OS</label>
                                        <input type="text" id="os_plazas_comer" placeholder="Ej: 23214"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="cuenta_plazas_comer" class="label-filter">Cuenta</label>
                                        <input type="text" id="cuenta_plazas_comer" placeholder="Ej: 0093484233"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-plazascomer-salesforce"  
                                        ng-click="obtenerPlazasComerciales()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-plazas-comerciales">
                                <table id="tables-plazas-comer" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-plazas-comer">
                                        <tr>
                                            <th>OT</th>
                                            <th>OS</th>
                                            <th>Cuenta</th>
                                            <th>Cliente</th>
                                            <th>Fecha actualizaci&oacute;n</th>
                                            <th>Status</th>
                                            <th>Estado</th>
                                            <th>Descripci&oacute;n</th>
                                            <th>Actualizar Reg</th>
                                            <th>Paquete</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>					   
                                    </tbody>   		
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-canceladas">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Canceladas</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_canceladas" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_canceladas" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="intervencion_canceladas" class="label-filter">Intervenci&oacute;n</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
                                            type="text" id="intervencion_canceladas" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="intervencion_canceladas">      
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
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="selectMotivoCancelas" class="label-filter">Motivo</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" 
                                            placeholder="Seleccione..." type="text" id="selectMotivoCancelas" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="selectMotivoCancelas">      
                                                <li style="text-align: center;">
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,true)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,false)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                                </li>     
                                                <li class="elemento_menu dropdown-divider"></li>
                                                <li ng-repeat="filtroE in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                        <input ng-click=checkFiltroEstatus(filtroE) id="filtrotext-{{filtroE.id}}" class="form-check-input" type="checkbox" ng-model="filtroE.checkedOpcion" ng-checked="filtroE.checkedOpcion"  />
                                                        <span  for="filtrotext-{{filtroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtroE.nombre"></span>
                                                    </label>
                                                     <ul  class="dropdown-menu">                     
                                                        <li  ng-repeat="subfiltroE in filtroE.children" class="element-menu-filter">
                                                            <label  class="dropdown-item form-check-inputfiltro">
                                                                <input ng-click=checkFiltroEstatus(subfiltroE) id="subfiltrotext-{{subfiltroE.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroE.checkedOpcion" ng-checked="subfiltroE.checkedOpcion"    />
                                                                <span  for="subfiltrotext-{{subfiltroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroE.nombre"></span>
                                                            </label>
                                                            <ul  class="dropdown-menu">                     
                                                                <li  ng-repeat="subfiltroJ in subfiltroE.children" class="element-menu-filter">
                                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                                        <input ng-click=checkFiltroEstatus(subfiltroJ) id="subfiltrotext-{{subfiltroJ.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroJ.checkedOpcion" ng-checked="subfiltroJ.checkedOpcion"    />
                                                                        <span  for="subfiltrotext-{{subfiltroJ.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroJ.nombre"></span>
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                         </div>
                                    </div>

                                    <div class="col-2 column-style-consulta">
                                        <label for="ot_canceladas" class="label-filter">OT</label>
                                        <input type="text" id="ot_canceladas" placeholder="Ej: 65434"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="os_canceladas" class="label-filter">OS</label>
                                        <input type="text" id="os_canceladas" placeholder="Ej: 23214"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="cuenta_canceladas" class="label-filter">Cuenta</label>
                                        <input type="text" id="cuenta_canceladas" placeholder="Ej: 0093484233"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-canceladas-salesforce"  
                                        ng-click="obtenerCanceladas()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-canceladas">
                                <table id="tables-canceladas" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-canceladas">
                                        <tr>
                                            <th>OT</th>
                                            <th>OS</th>
                                            <th>Cuenta</th>
                                            <th>Cliente</th>
                                            <th>Fecha actualizaci&oacute;n</th>
                                            <th>Status</th>
                                            <th>Estado</th>
                                            <th>Descripci&oacute;n</th>
                                            <th>Actualizar Reg</th>
                                            <th>Paquete</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>					   
                                    </tbody>   		
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-reagenda">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Reagenda</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_reagenda" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_reagenda" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="intervencion_reagenda" class="label-filter">Intervenci&oacute;n</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
                                            type="text" id="intervencion_reagenda" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="intervencion_reagenda">      
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
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="selectMotivoReagenda" class="label-filter">Motivo</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" 
                                            placeholder="Seleccione..." type="text" id="selectMotivoReagenda" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="selectMotivoReagenda">      
                                                <li style="text-align: center;">
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,true)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,false)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                                </li>     
                                                <li class="elemento_menu dropdown-divider"></li>
                                                <li ng-repeat="filtroE in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                        <input ng-click=checkFiltroEstatus(filtroE) id="filtrotext-{{filtroE.id}}" class="form-check-input" type="checkbox" ng-model="filtroE.checkedOpcion" ng-checked="filtroE.checkedOpcion"  />
                                                        <span  for="filtrotext-{{filtroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtroE.nombre"></span>
                                                    </label>
                                                     <ul  class="dropdown-menu">                     
                                                        <li  ng-repeat="subfiltroE in filtroE.children" class="element-menu-filter">
                                                            <label  class="dropdown-item form-check-inputfiltro">
                                                                <input ng-click=checkFiltroEstatus(subfiltroE) id="subfiltrotext-{{subfiltroE.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroE.checkedOpcion" ng-checked="subfiltroE.checkedOpcion"    />
                                                                <span  for="subfiltrotext-{{subfiltroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroE.nombre"></span>
                                                            </label>
                                                            <ul  class="dropdown-menu">                     
                                                                <li  ng-repeat="subfiltroJ in subfiltroE.children" class="element-menu-filter">
                                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                                        <input ng-click=checkFiltroEstatus(subfiltroJ) id="subfiltrotext-{{subfiltroJ.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroJ.checkedOpcion" ng-checked="subfiltroJ.checkedOpcion"    />
                                                                        <span  for="subfiltrotext-{{subfiltroJ.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroJ.nombre"></span>
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                         </div>
                                    </div>

                                    <div class="col-2 column-style-consulta">
                                        <label for="ot_reagenda" class="label-filter">OT</label>
                                        <input type="text" id="ot_reagenda" placeholder="Ej: 65434"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="os_reagenda" class="label-filter">OS</label>
                                        <input type="text" id="os_reagenda" placeholder="Ej: 23214"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="cuenta_reagenda" class="label-filter">Cuenta</label>
                                        <input type="text" id="cuenta_reagenda" placeholder="Ej: 0093484233"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-reagenda-salesforce"  
                                        ng-click="obtenerReagendada()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-reagenda">
                                <table id="tables-reagenda" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-reagenda">
                                        <tr>
                                            <th>OT</th>
                                            <th>OS</th>
                                            <th>Cuenta</th>
                                            <th>Cliente</th>
                                            <th>Fecha actualizaci&oacute;n</th>
                                            <th>Status</th>
                                            <th>Estado</th>
                                            <th>Descripci&oacute;n</th>
                                            <th>Actualizar Reg</th>
                                            <th>Paquete</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>					   
                                    </tbody>   		
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-calendarizado_vencido">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Calendarizado Vencido</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="intervencion_calendarizado_vencido" class="label-filter">Intervenci&oacute;n</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
                                            type="text" id="intervencion_calendarizado_vencido" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="intervencion_calendarizado_vencido">      
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
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="selectMotivoCalendarizadoVencido" class="label-filter">Motivo</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" 
                                            placeholder="Seleccione..." type="text" id="selectMotivoCalendarizadoVencido" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="selectMotivoCalendarizadoVencido">      
                                                <li style="text-align: center;">
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,true)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                                    <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,false)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                                </li>     
                                                <li class="elemento_menu dropdown-divider"></li>
                                                <li ng-repeat="filtroE in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                        <input ng-click=checkFiltroEstatus(filtroE) id="filtrotext-{{filtroE.id}}" class="form-check-input" type="checkbox" ng-model="filtroE.checkedOpcion" ng-checked="filtroE.checkedOpcion"  />
                                                        <span  for="filtrotext-{{filtroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtroE.nombre"></span>
                                                    </label>
                                                     <ul  class="dropdown-menu">                     
                                                        <li  ng-repeat="subfiltroE in filtroE.children" class="element-menu-filter">
                                                            <label  class="dropdown-item form-check-inputfiltro">
                                                                <input ng-click=checkFiltroEstatus(subfiltroE) id="subfiltrotext-{{subfiltroE.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroE.checkedOpcion" ng-checked="subfiltroE.checkedOpcion"    />
                                                                <span  for="subfiltrotext-{{subfiltroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroE.nombre"></span>
                                                            </label>
                                                            <ul  class="dropdown-menu">                     
                                                                <li  ng-repeat="subfiltroJ in subfiltroE.children" class="element-menu-filter">
                                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                                        <input ng-click=checkFiltroEstatus(subfiltroJ) id="subfiltrotext-{{subfiltroJ.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroJ.checkedOpcion" ng-checked="subfiltroJ.checkedOpcion"    />
                                                                        <span  for="subfiltrotext-{{subfiltroJ.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroJ.nombre"></span>
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                         </div>
                                    </div>

                                    <div class="col-2 column-style-consulta">
                                        <label for="ot_calendarizado_vencido" class="label-filter">OT</label>
                                        <input type="text" id="ot_calendarizado_vencido" placeholder="Ej: 65434"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="os_calendarizado_vencido" class="label-filter">OS</label>
                                        <input type="text" id="os_calendarizado_vencido" placeholder="Ej: 23214"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="cuenta_calendarizado_vencido" class="label-filter">Cuenta</label>
                                        <input type="text" id="cuenta_calendarizado_vencido" placeholder="Ej: 0093484233"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-calendarizadovencido-salesforce"  
                                        onclick="consultarCuentasRescataventasSalesforce()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-calendarizado-vencido">
                                <table id="tables-calendarizado-vencido" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-calendarizado-vencido">
                                        <tr>
                                            <th>OT</th>
                                            <th>OS</th>
                                            <th>Cuenta</th>
                                            <th>Cliente</th>
                                            <th>Fecha actualizaci&oacute;n</th>
                                            <th>Status</th>
                                            <th>Estado</th>
                                            <th>Descripci&oacute;n</th>
                                            <th>Actualizar Reg</th>
                                            <th>Paquete</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead> 		
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-terminadas">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Terminadas</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_terminadas" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_terminadas" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="intervencion_terminadas" class="label-filter">Intervenci&oacute;n</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
                                            type="text" id="intervencion_terminadas" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="intervencion_terminadas">      
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

                                    <div class="col-2 column-style-consulta">
                                        <label for="ot_terminadas" class="label-filter">OT</label>
                                        <input type="text" id="ot_terminadas" placeholder="Ej: 65434"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="os_terminadas" class="label-filter">OS</label>
                                        <input type="text" id="os_terminadas" placeholder="Ej: 23214"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="cuenta_terminadas" class="label-filter">Cuenta</label>
                                        <input type="text" id="cuenta_terminadas" placeholder="Ej: 0093484233"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-terminadas-salesforce"  
                                        ng-click="obtenerTerminada()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-terminadas">
                                <table id="tables-terminadas" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-terminadas">
                                        <tr>
                                            <th>OT</th>
                                            <th>OS</th>
                                            <th>Cuenta</th>
                                            <th>Cliente</th>
                                            <th>Fecha actualizaci&oacute;n</th>
                                            <th>Status</th>
                                            <th>Estado</th>
                                            <th>Descripci&oacute;n</th>
                                            <th>Actualizar Reg</th>
                                            <th>Paquete</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead> 		
                                </table>

                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="wraper_table contenedores-general" id="container-detenidas">
                        <div class="col-12">
                            <center><h4 id="text_header_cord_inst">Detenidas</h4></center>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid">
                                <div class="row md-form" id="">
                                    <div class="col-2 column-style-consulta" id="fechaInicio" >	
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha inicial</label>					
                                        <input style="text-align: left;" readonly placeholder="Fecha Inicio" 
                                        type="text" id="fecha_inicio_detenidas" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta" id="fechaFin" >
                                        <label for="inputPlaceholderEx" class="label-filter">Fecha final</label>
                                        <input style="text-align: left;" readonly placeholder="Fecha Fin" 
                                        type="text" id="fecha_fin_detenidas" class="datepicker input-filtro-coordInst form-control form-control-sm">
                                        
                                    </div>
                                    <div class="col-2 column-style-consulta columna-filtro-ind">
                                        <label for="intervencion_detenidas" class="label-filter">Intervenci&oacute;n</label>
                                        <div class="dropdown">
                                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." 
                                            type="text" id="intervencion_detenidas" class="input-filtro-coordInst form-control form-control-sm" />
                                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="intervencion_detenidas">      
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

                                    <div class="col-2 column-style-consulta">
                                        <label for="ot_detenidas" class="label-filter">OT</label>
                                        <input type="text" id="ot_detenidas" placeholder="Ej: 65434"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="os_detenidas" class="label-filter">OS</label>
                                        <input type="text" id="os_detenidas" placeholder="Ej: 23214"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-2 column-style-consulta">
                                        <label for="cuenta_detenidas" class="label-filter">Cuenta</label>
                                        <input type="text" id="cuenta_detenidas" placeholder="Ej: 0093484233"
                                        class="form-control input-filtro-coordInst form-control-sm">
                                    </div>
                                    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
                                        <button id="btn-detenidas-salesforce"  
                                        ng-click="obtenerDetenidas()" 
                                        type="button" class="btn btn-sm waves-effect waves-light btn-primary">
                                        <i class="fa fa-search" ></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="content-fluid contenedor-detenidas">
                                <table id="tables-detenidas" class="display table table-hover" cellspacing="0" width="100%">
                                    <thead id="thead-detenidas">
                                        <tr>
                                            <th>OT</th>
                                            <th>OS</th>
                                            <th>Cuenta</th>
                                            <th>Cliente</th>
                                            <th>Fecha actualizaci&oacute;n</th>
                                            <th>Status</th>
                                            <th>Estado</th>
                                            <th>Descripci&oacute;n</th>
                                            <th>Actualizar Reg</th>
                                            <th>Paquete</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead> 		
                                </table>
                            </div>
                        </div>
                    </div>
                    


                </div>

            </div>
        </div>
        <div class="col-md-12" id="agendamiento" style="display: none; ">
            <div class="row row-regresar">
                <div style="padding:0" class="col-12">
                    <div id="cerrar-agendamiento" class="container-icono-regresar-agenda   p-1 text-center">
                        <span class="icono-regresar-agenda fa fa-x2 fa-arrow-left"></span>
                    </div>
                    <h5 style="font-weight: bold;font-size: 16px;display: inline;margin-left:2em;" class="modal-title header-title">Cliente: <span style="margin-right: 3em; font-size:0.8em;" ng-bind="infoDetalleCuenta.Cuenta"></span>  Cuenta:  <span style="margin-right: 2em;font-size:0.8em;" ng-bind="infoDetalleCuenta.Num_cuenta_factura"></span> </h5>
                </div>

            </div>
            <div class="row">
                
                    <div class="col-md-5" style="padding: 0 !important;">
                        <div  id="info-agendamiento">
                            <div class="info_ot_detail  justify-content-center">
                                <div class="col-md-12 ">
                                    <b class="title_span_detalle title_info_ot"> Paquete:</b> &nbsp; &nbsp;
                                    <span  class="paquete-agenda-cuenta content_cuenta_detalle" ng-bind="infoDetalleCuenta.Paquete"></span>	
                                </div>
                                <div class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> CSP:</b> &nbsp; &nbsp;
                                    <span  class="cotsitiop-inst-agenda-cuenta content_cuenta_detalle" ng-bind="infoDetalleCuenta.CotSitioPlan"></span>
                                </div>
                            </div>
                            <br>
                            <div class="info_ot_detail title-contentedor-info  justify-content-center">
                                <div class="col-md-12 ">
                                    <span class="text-title-contentedor-info">Direcci&oacute;n de la instalaci&oacute;n</span>
                                     <a href="descargarActaAceptacion" id="info-carta-aceptacion"> Descarga carta aceptaci&oacute;n</a>
                                </div>
                            </div>
                            <br>
                            <div class="info_ot_detail  justify-content-center">
                                <div class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> Regi&oacute;n:</b> &nbsp; &nbsp;
                                    <span  class="region-detalle-cuenta content_cuenta_detalle" ng-bind="infoDetalleCuenta.Region"></span>	
                                </div>
                                <div class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> Ciudad:</b> &nbsp; &nbsp;
                                    <span  class="ciudad-detalle-cuenta content_cuenta_detalle" ng-bind="infoDetalleCuenta.Ciudad"> Sin informaci&oacute;n</span>
                                </div>
                            </div>
                            <div class="info_ot_detail justify-content-center">
                                <div class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> Distrito:</b> &nbsp; &nbsp;
                                    <span  class="distrito-detalle-cuenta content_cuenta_detalle" ng-bind="infoDetalleCuenta.Distrito"> Sin informaci&oacute;n</span>	
                                </div>
                                <div class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> Cl&uacute;ster:</b> &nbsp; &nbsp;
                                    <span class="cluster-detalle-cuenta content_cuenta_detalle" ng-bind="infoDetalleCuenta.Cluster"> Sin informaci&oacute;n</span>
                                </div>
                            </div> 
                            <div class="info_ot_detail  justify-content-center">
                                <div class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> Entre calles:</b> &nbsp; &nbsp;
                                    <div style="margin-left: .9em">
                                        <textarea class="form-control" id="entre-calle-detalle-cuenta" rows="2"></textarea>
                                    </div>
        
                                </div>
                                <div class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> Referencias:</b> &nbsp; &nbsp;
                                    <div style="margin-left: .9em">
                                      <textarea class="form-control" id="referencias-calle-detalle-cuenta" rows="2"></textarea>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="info_ot_detail  row mx-auto  justify-content-center">
                                <div class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> Latitud:</b> &nbsp; &nbsp;
                                    <span  class="latitud-detalle-cuenta content_cuenta_detalle" ng-bind="infoDetalleCuenta.Latitud"> Sin informaci&oacute;n</span>
                                    <b class="title_span_detalle title_info_ot"> Longitud:</b> &nbsp; &nbsp;
                                    <span  class="longitud-detalle-cuenta content_cuenta_detalle" ng-bind="infoDetalleCuenta.Longitud"> Sin informaci&oacute;n</span>
                                    <br>
                                    <button id="btn-accion-factibilidad" type="button" class="btn btn-sm btn-outline-danger waves-effect">Factibilidad</button>
                                </div>
                            </div>
                            <br>
                            <div class="info_ot_detail title-contentedor-info  justify-content-center">
                                <div class="col-md-12 ">
                                    <span class="text-title-contentedor-info">Informaci&oacute;n del contacto</span>
                                </div>
                            </div>
                            <br>
                            <div class="info_ot_detail  row mx-auto mt-2 mb-2">
                                <label class="col-2 title_span_contacto col-form-label">Contacto:</label>
                                <div class="col-10">
                                    <select id="select-contactos-agenda" class="browser-default custom-select  custom-select-sm">
                                        <option value="-1" >Selecciona ...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="info_ot_detail row mx-auto  " style="margin-left: 20px !important;">
                                <div class="col-md-6">
                                    <b class="title_span_detalle title_info_ot"> Email:</b> &nbsp; &nbsp;
                                    <span  id="email-contacto-detalle" class="content_cuenta_detalle"> Sin informaci&oacute;n</span>	
                                </div>                      
                            </div> 
                            <div class="info_ot_detail row mx-auto  justify-content-center" style="margin-left: 20px !important;">
                                <div class="col-md-6">
                                    <b class="title_span_detalle title_info_ot"> Celular:</b> &nbsp; &nbsp;
                                    <span  id="celular-contacto-detalle" class="content_cuenta_detalle"> Sin informaci&oacute;n</span>	
                                </div>
                                <div class="col-md-6">
                                    <b class="title_span_detalle title_info_ot"> Tel. fijo:</b> &nbsp; &nbsp;
                                    <span id="telfijo-contacto-detalle" class="content_cuenta_detalle"> Sin informaci&oacute;n</span>
                                </div>                          
                            </div> 
                            <div class="info_ot_detail row mx-auto  justify-content-center" style="margin-left: 20px !important;">     
                                <div class="col-md-6">
                                        <b class="title_span_detalle title_info_ot"> Sexo:</b> &nbsp; &nbsp;
                                        <span id="sexo-contacto-detalle"  class="content_cuenta_detalle"> Sin informaci&oacute;n</span>	
                                </div>   
                                <div class="col-md-6">
                                    <b class="title_span_detalle title_info_ot"> Ext. :</b> &nbsp; &nbsp;
                                    <span id="extension-contacto-detalle" class="content_cuenta_detalle"> Sin informaci&oacute;n</span>
                                </div>  
                            </div> 
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div id="calendar-agenda-content">
                            <h6 id="titulo_sin_disponibilidad" style="display:none">No se encontr&oacute; disponibilidad</h6>
                            <div  id="calendar_disponibilidad">
                            </div>
                        </div>
                        <div style="display: none"  id="mapa-agenda-content" >
                            <div style="margin-top: 1rem;" class="row">
                                <div class="col-12">
                                    <input id="search-input-place" class="controls" type="text" placeholder="B&uacute;scar lugar en mapa">
                                    <div id="mapa-asignacion" style="width:100%;height:400px; "></div>
                                    <!--<button type="button" id="actualizar-factibilidad" class="btn btn-sm btn-primary">Actualizar factiblidad</button>-->
                                </div>
                            </div>                    
                        </div>
                        <div >
                            <div class="info_ot_detail  row mx-auto  justify-content-center">
                                <div style="margin:0;margin-top:1em;padding:0;" class="col-md-12">
                                    <b class="title_span_detalle title_info_ot"> Fecha de agendamiento:</b> &nbsp;
                                    <span  id="fecha-agendamiento-text"  class="content_cuenta_detalle" style="margin-right: 1em;margin-top: 1em;" > Sin informaci&oacute;n</span>
                                    <b class="title_span_detalle title_info_ot"> Turno:</b> &nbsp;
                                    <span  id="turno-agendamiento-text"  class="turno-agendamiento-detalle content_cuenta_detalle"> Sin informaci&oacute;n</span>
                                    <span style="display: none;"  id="abrir-calendario" class="fa fa-calendar-o"></span>
                                    <span style="float: right" id="info-factibilidad-actualiza"><span id="icon-factibilidad-actualiza"  class="fa fa-info-circle"></span> No has actualizado factibilidad</span>
        
                                </div>
                            </div>  
                            <div style="margin-top:1em;" class="  row mx-auto ">
                                <b><label style="font-size:0.9em; font-weight: bolder;" for="exampleFormControlTextarea5">Comentarios:</label></b>
                                <textarea class="form-control" id="comentarios-agendamiento" rows="1"></textarea>
                            </div> 
                            <div class="  row mx-auto ">
                                <div style="padding-left:0;padding-right: 0" class="col-12">
                                      <div id="message-success-agenda" style="display: none;    display: inline-block;" class="alert alert-success" role="alert">                              
                                      </div>
                                      <div id="message-error-agenda" style="display: none;" class="alert alert-danger" role="alert">                                
                                      </div>
                                    <button type="button" id="agendar-cuenta" class="btn btn-primary btn-sm">Agendar</button>
                                   <!-- <button type="button" id="cancelacion-agendamiento" class="btn btn-primary btn-sm">Cancelar</button>-->
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
        <jsp:include page="./modals/modalCluster.jsp"></jsp:include>
        <jsp:include page="./modals/modalDetalleOt.jsp"></jsp:include>
        <jsp:include page="./modals/modalChat.jsp"></jsp:include>
        <jsp:include page="./modals/detalleCuenta.jsp"></jsp:include>
    </body>
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/coordInstalacionesPIController.js?"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/coordInstalacionesPIService.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/busqGral.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/comentariosChat.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/infoCuenta.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/infoSitio.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/historico.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/infoOt.js"></script>
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>	
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
    
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
</html>