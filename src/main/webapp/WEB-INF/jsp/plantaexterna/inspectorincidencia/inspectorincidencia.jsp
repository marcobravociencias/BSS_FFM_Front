<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="inspectorIncidenciaApp">
    <head>
        <meta charset="ISO-8859-1" />
		<link rel="icon" type="image/png" sizes="192x192"  href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">

        <!-- LIBRERIAS -->
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
        
        <link href="${pageContext.request.contextPath}/resources/css/plantaexterna/inspectorIncidencia/styleInspectorIncidencia.css" rel="stylesheet">

        <title>FFM Total play</title>
    </head>
    <body id="idBody" ng-controller="inspectorIncidenciaController">
		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include> 
        <div class="container-fluid container-filtros-inspectorincidencia">
            <div class="container container-title-header" style="padding: 0 !important;">
                <div class="header-modulo">
                    <h5 class="title-modulo">Inspector Incidencias</h5>
                    <h1 class="h6 subtitle-modulo"></h1>
                </div>
            </div>
            <div class="content-fluid">
                <div class="row md-form" id="filtros_config">
                    <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                        <label for="filtro_fecha_inicio_inspectorincidencia" class="label-filter">Fecha inicial</label>
                        <input readonly type="text" id="filtro_fecha_inicio_inspectorincidencia"
                        class="datepicker input-filtro-inspectorincidencia form-control form-control-sm"
                        style="width: 100px;" />
                    </div>
                    <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                        <label for="filtro_fecha_fin_inspectorincidencia" class="label-filter">Fecha final</label>
                        <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_inspectorincidencia"
                        class="datepicker input-filtro-inspectorincidencia form-control form-control-sm"
                        style="width: 100px;" />
                    </div>
                    <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                        <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de fallas" ng-show="banderaErrorEstatus"></i><label for="filtro-fallas" class="label-filter">Falla</label>
                        <div class="dropdown">
                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text" id="filtro-fallas" class="input-filtro-inspectorincidencia form-control form-control-sm" />
                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-fallas">      
                                <li style="text-align: center;">
                                    <button ng-click="seleccionTodos(filtrosInspector.fallas, true)" id="todo_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
                                    <button ng-click="seleccionTodos(filtrosInspector.fallas, false)" id="ninguno_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
                                </li>     
                                <li class="elemento_menu dropdown-divider"></li>
                                <li ng-repeat="filtroFalla in filtrosInspector.fallas" class="element-menu-filter">
                                    <label class="dropdown-item form-check-inputfiltro">
                                        <input id="filtrotext-{{filtroFalla.id}}" class="form-check-input" type="checkbox" ng-model="filtroFalla.checkedOpcion" ng-checked="filtroFalla.checkedOpcion"/>
                                        <span for="filtrotext-{{filtroFalla.id}}" class="dropdown-item item-text-filtro" ng-bind="filtroFalla.descripcion"></span>
                                    </label>
                                </li>
                            </ul>
                         </div>
                    </div>
                    <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                        <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de estatus" ng-show="banderaErrorEstatus"></i><label for="filtro-estatus-substatus" class="label-filter">Estatus</label>
                        <div class="dropdown">
                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text" id="filtro-estatus-substatus" class="input-filtro-inspectorincidencia form-control form-control-sm" />
                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">      
                                <li style="text-align: center;">
                                    <button ng-click="seleccionTodos(filtrosInspector.statusFallas,true)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                    <button ng-click="seleccionTodos(filtrosInspector.statusFallas,false)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                </li>     
                                <li class="elemento_menu dropdown-divider"></li>
                                <li ng-repeat="filtroS in filtrosInspector.statusFallas" class="element-menu-filter">
                                    <label class="dropdown-item form-check-inputfiltro">
                                        <input id="filtrotext-{{filtroS.id}}" class="form-check-input" type="checkbox" ng-model="filtroS.checkedOpcion" ng-checked="filtroS.checkedOpcion"  />
                                        <span for="filtrotext-{{filtroS.id}}" class="dropdown-item item-text-filtro" ng-bind="filtroS.descripcion"></span>
                                    </label>
                                </li>
                            </ul>
                         </div>
                    </div>
                    <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                        <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i><label for="cluster" class="label-filter">Geograf&iacute;a</label>
                        <input readonly placeholder="Seleccione..." type="text" id="cluster"
                        class="input-filtro-inspectorincidencia form-control form-control-sm">
                    </div>
                    <div class="col-1 div-btn-busqueda" >
                        <button id="btn_consultar_incidencias" type="button"
                        class="btn btn-sm btn-primary waves-effect waves-light"
                        ng-click="consultarIndicencias()">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid contenedor-inspectorIncidencia">
            <div class="content-fluid">
                <div class="row">
                    <div class="col-5">
                        <table id="tableIncidencia" class="display table table-hover " cellspacing="0" width="100%">
                            <thead id="thead_incidencia">
                                <tr>
                                    <th>ID</th>
                                    <th>FECHA</th>
                                    <th>CLUSTER</th>
                                    <th>FALLA</th>
                                    <th><i class="far fa-window-restore" style="color:#808080"></i></th>
                                    <th><i class="fas fa-globe-americas" style="color:#808080"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-7">
                        <div class="row" id="colores_estados">
                            <div class="col-12">
                                <div class="contenido_color" ng-repeat="color in filtrosInspector.coloresStatus">
                                    <i class="fa-sm fa fa-circle" style="{{'color:'+ color.id}}" aria-hidden="true"></i>
                                    <small ng-bind="color.descripcion"></small> 
                                </div>			
                            </div>			
                        </div>			
                        <div id="mapaInspectorIncidencia">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <jsp:include page="modals/modalCluster.jsp"></jsp:include>
        <jsp:include page="modals/modalDetalleIncidencia.jsp"></jsp:include>

    </body>
    
    <!-- LIBRERIAS -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
    
    <!-- ARCHIVOS JS -->
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorIncidencia/inspectorIncidenciaController.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorIncidencia/inspectorIncidenciaService.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorIncidencia/jsonInspectorIncidencia.js"></script>
    <script>
        var context_project="${pageContext.request.contextPath}/resources"
    </script> 

    

</html>