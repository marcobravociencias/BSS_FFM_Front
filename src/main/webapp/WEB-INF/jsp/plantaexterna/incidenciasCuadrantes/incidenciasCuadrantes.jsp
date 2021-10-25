<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>

<!DOCTYPE html>
<html lang="es" ng-app="incidenciasCuadrantesApp">

<head>
    <meta charset="ISO-8859-1" />
    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
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
    <link href="${pageContext.request.contextPath}/resources/libraries/alertify/css/alertify.min.css" rel="stylesheet">

    <link href="${pageContext.request.contextPath}/resources/css/plantaexterna/incidenciasCuadrantes/styleIncidenciasCuadrantes.css" rel="stylesheet">
    <title>FFM Total play</title>
</head>

<body id="idBody" ng-controller="incidenciasCuadrantesController" style="display: none;">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
    <div class="container-fluid container-filtros-incidenciascuadrantes">
        <div class="container container-title-header" style="padding: 0 !important;">
            <div class="header-modulo">
                <h5 class="title-modulo">Incidencias Cuadrantes</h5>
                <h1 class="h6 subtitle-modulo"></h1>
            </div>
        </div>
        <div class="content-fluid">
            <div class="row md-form" id="filtros_config">
                <div class="col-2 column-style-incidenciascuadrantes columna-filtro-ind">
                    <label for="filtro-tipo-fecha" class="label-filter">Tipo de fecha</label>
                    <select
                        class="ropdown-menu drop-down-filters input-filtro-incidenciascuadrantes form-control form-control-sm select-tipo-fecha .fechaInicial"
                        ng-model="tipoFecha" ng-change="cambiarTipoFecha()" id="tipo-Fecha">
                        <option class="element-menu-filter" value="semanal">Semanal</option>
                        <option class="element-menu-filter" value="mensual">Mensual</option>
                    </select>
                </div>
                <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                    <label for="filtro_fecha_incidenciascuadrantes" class="label-filter">Fecha</label>
                    <input type="text" readonly
                        class="input-filtro-incidenciascuadrantes form-control form-control-sm "
                        ng-model="fechaSemana" ng-show="tipoFecha === 'semanal'"
                        ng-change="cambiarFecha(fechaSemana)" id="fecha_semanal" aria-describedby="basic-addon1">
                    <input type="text" readonly
                        class="input-filtro-incidenciascuadrantes form-control form-control-sm " ng-model="fechaMes"
                        ng-show="tipoFecha === 'mensual'" ng-change="cambiarFecha(fechaMes)" id="fecha_mes"
                        aria-describedby="basic-addon1">
                </div>
                <div class="col-2 column-style-incidenciascuadrantes columna-filtro-ind">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2"
                        title="No se encontraron catalogo de estatus" ng-show="banderaErrorEstatus"></i>
                    <label for="filtro-estatus-substatus" class="label-filter">Estatus</label>
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..."
                            type="text" id="filtro-estatus"
                            class="input-filtro-incidenciascuadrantes form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus">
                            <li style="text-align: center;">
                                <button ng-click="seleccionTodos(filtrosIncidencias.estatus,true)" id="todo_filtro"
                                    type="button"
                                    class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="seleccionTodos(filtrosIncidencias.estatus,false)"
                                    id="ninguno_filtro" type="button"
                                    class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
                            </li>
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtroS in filtrosIncidencias.estatus" class="element-menu-filter">
                                <label class="dropdown-item ">
                                    <input id="filtrotext-{{filtroS.id}}" class="form-check-input" type="checkbox"
                                        ng-model="filtroS.checkedOpcion" ng-checked="filtroS.checkedOpcion" />
                                    <span for="filtrotext-{{filtroS.id}}" class="dropdown-item item-text-filtro"
                                        ng-bind="filtroS.descripcion"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-2 column-style-incidenciascuadrantes columna-filtro-ind">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2"
                        title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i><label
                        for="cluster" class="label-filter">Geograf&iacute;a</label>
                    <input readonly placeholder="Seleccione..." type="text" id="cluster"
                        class="input-filtro-incidenciascuadrantes form-control form-control-sm">
                </div>
                <div class="col-1 div-btn-busqueda">
                    <button id="btn_consultar_incidencias" type="button"
                        class="btn btn-sm btn-primary waves-effect waves-light"
                        ng-click="consultarIncidenciasCuadrantes()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid contenedor-incidenciascuadrantes">
        <div class="content-fluid">
            <div class="row">
                <div class="col-7">
                    <table id="tableIncidenciasCuadrantes" class="display table table-hover " cellspacing="0"
                        width="100%">
                        <thead id="thead_incidenciasCuadrantes">
                            <tr>
                                <th>ID OT</th>
                                <th># OPERARIO OT</th>
                                <th>OPERARIO OT</th>
                                <th>ID PI</th>
                                <th># OPERARIO PI</th>
                                <th>OPERARIO PI</th>
                                <th>ESTATUS</th>
                                <th>DETALLE</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="col-5">
                    <div class="row" id="">
                        <div class="col-12">
                            <div class="contenedor_config pull-right">
                                <i class="fa fa-cog fa-lg" style="cursor: pointer;" aria-hidden="true"
                                    data-toggle="dropdown" aria-expanded="false"></i>
                                <div class="dropdown-menu" style="margin-left: -3em;">
                                    <a class="dropdown-item" ng-click="mostrarUbicaciones()">
                                        <div class="row div-options-incidencias">
                                            <div class="col-9">
                                                <label class="label-options-incidencias" for="checkbox2">Ver
                                                    incidencias</label>
                                            </div>
                                            <div class="col-3">
                                                <input type="checkbox" class="checkbox-options-incidencias"
                                                    ng-model="checkIncidencia" ng-true-value="true"
                                                    ng-false-value="false" disabled>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="dropdown-item" ng-click="mostrarCuadrantes()">
                                        <div class="row div-options-incidencias">
                                            <div class="col-9">
                                                <label class="label-options-incidencias" for="checkbox2">Ver
                                                    cuadrantes</label>
                                            </div>
                                            <div class="col-3">
                                                <input type="checkbox" class="checkbox-options-incidencias"
                                                    ng-model="checkCuadrantes" ng-true-value="true"
                                                    ng-false-value="false" disabled>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="dropdown-item" ng-click="mostrarManchas()">
                                        <div class="row div-options-incidencias">
                                            <div class="col-9">
                                                <label class="label-options-incidencias" for="checkbox2">Ver
                                                    manchas</label>
                                            </div>
                                            <div class="col-3">
                                                <input type="checkbox" class="checkbox-options-incidencias"
                                                    ng-model="checkManchas" ng-true-value="true"
                                                    ng-false-value="false" disabled>
                                            </div>
                                        </div>
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" ng-click="abrirModalKmz()">
                                        <div class="row div-options-incidencias">
                                            <div class="col-12">
                                                <label class="label-options-incidencias" for="checkbox2">Cargar
                                                    KML</label>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="mapaIncidenciasCuadrantes">
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<jsp:include page="modals/modalCluster.jsp"></jsp:include>

<!-- LIBRERIAS -->
<script type="text/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script
    src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>

<!-- ARCHIVOS JS -->
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/js/plantaexterna/incidenciasCuadrantes/incidenciasCuadrantesController.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/js/plantaexterna/incidenciasCuadrantes/incidenciasCuadrantesService.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/js/plantaexterna/incidenciasCuadrantes/jsonIncidenciasCuadrantes.js"></script>
<script>
    var context_project = "${pageContext.request.contextPath}/resources"
</script>

</html>