<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html lang="es" ng-app="consultaOTApp">

<head>
    <meta charset="ISO-8859-1" />
    <title>FFM Total play</title>

    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/styleConsultaOT.css?v=${sessionScope.versionDepl}">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/evidencia/styleMainEvidencia.css?v=${sessionScope.versionDepl}" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/timeLine.css?v=${sessionScope.versionDepl}" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/responsiveComponentsConsultaOT.css?v=${sessionScope.versionDepl}" />
</head>

<body id="idBody" ng-controller="consultaOTController" class="body" style="display: none;">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
    <div class="container">
        <div class="container container-title-header" style="padding: 0 !important;">
            <div class="header-modulo">
                <h5 class="title-modulo">Consulta ordenes de trabajo</h5>
                <h1 class="h6 subtitle-modulo">
                    En este m&oacute;dulo podr&aacute;s realizar la busqueda de las ordenes de trabajo
                </h1>
            </div>
        </div>
        <div class="content-fluid contenedor-consultaOT" ng-show="!configPermisoAccionConsultaOrdenes">
            <div class="text-accion-nopermiso">
                <i class="icon-not-permiso fas fa-user-lock"></i>
                <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
            </div>
        </div>
        <div class="content-fluid container-filtros-consultaot contenedor-consultaOT" ng-show="configPermisoAccionConsultaOrdenes">
            <div class="row col-12" id="filtros_config">
                <div class="col-2 column-style-consulta">
                    <label for="idot" class="label-filter">OT</label>
                    <input type="text" id="idot" placeholder="Ej: 65434" ng-model="camposFiltro.idot" ng-change="limpiarCamposFiltro(1)" class="form-control input-filtro-consultaOT form-control-sm">
                </div>
                <div class="col-2 column-style-consulta">
                    <label for="idos" class="label-filter">OS</label>
                    <input type="text" id="idos" placeholder="Ej: 23214" ng-model="camposFiltro.idos" ng-change="limpiarCamposFiltro(2)" class="form-control input-filtro-consultaOT form-control-sm">
                </div>
                <div class="col-2 column-style-consulta">
                    <label for="cuenta" class="label-filter">Cuenta</label>
                    <input type="text" id="cuenta" placeholder="Ej: 0093484233" ng-model="camposFiltro.cuenta" ng-change="limpiarCamposFiltro(3)" class="form-control input-filtro-consultaOT form-control-sm">
                </div>
                <div class="col-2 column-style-consulta columna-filtro-ind">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de estatus" ng-show="banderaErrorEstatus"></i>
                    <label for="filtro-estatus-substatus" class="label-filter">Estatus</label>
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text" id="filtro-estatus-substatus" class="input-filtro-consultaOT form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">
                            <li style="text-align: center;">
                                <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles); pintarNombreEstatus(filtrosGeneral.estatusdisponibles,'#filtro-estatus-substatus');" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles); pintarNombreEstatus(filtrosGeneral.estatusdisponibles,'#filtro-estatus-substatus');" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                            </li>
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtro in filtrosGeneral.estatusdisponibles " class="element-menu-filter" class="element-menu-filter">
                                <label class="dropdown-item form-check-inputfiltro">
                                    <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusdisponibles); pintarNombreEstatus(filtrosGeneral.estatusdisponibles,'#filtro-estatus-substatus');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                    <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                </label>
                                <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatus.html'" class="dropdown-menu"></ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-2 column-style-consulta columna-filtro-ind">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de intervenciones" ng-show="banderaErrorIntervencion"></i>
                    <label for="filtro-intervencion" class="label-filter">Intervenci&oacute;n</label>
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text" id="filtro-intervencion" class="input-filtro-consultaOT form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">
                            <li style="text-align: center;">
                                <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes); pintarNombreEstatus(filtrosGeneral.tipoOrdenes,'#filtro-intervencion');" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes); pintarNombreEstatus(filtrosGeneral.tipoOrdenes,'#filtro-intervencion');" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                            </li>
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter" class="element-menu-filter">
                                <label class="dropdown-item form-check-inputfiltro">
                                    <input ng-click="setCheckFiltroGenericV2(filtro,filtrosGeneral.tipoOrdenes); pintarNombreEstatus(filtrosGeneral.tipoOrdenes,'#filtro-intervencion');" id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                    <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                </label>
                                <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroIntervencion.html'" class="dropdown-menu"></ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-2 column-style-consulta columna-filtro-ind">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i>
                    <label for="cluster" class="label-filter">Geograf&iacute;a</label>
                    <input readonly placeholder="Seleccione..." type="text" id="cluster" ng-click="abrirModalCluster()" class="input-filtro-consultaOT form-control form-control-sm">
                </div>
                <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                    <label for="filtro_fecha_inicio_consultaOt" class="label-filter">Fecha inicial</label>
                    <input readonly type="text" id="filtro_fecha_inicio_consultaOt" class="datepicker input-filtro-consultaOT form-control form-control-sm" style="width: 100px;" />
                </div>
                <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                    <label for="filtro_fecha_fin_consultaOt" class="label-filter">Fecha final</label>
                    <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_consultaOt" class="datepicker input-filtro-consultaOT form-control form-control-sm" style="width: 100px;" />
                </div>
                <div class="col-1 div-btn-busqueda" style="width: 65px;">
                    <button id="btn_consultar_ordenes" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light" ng-click="consultaOT()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                <div id="" class="col-1 column-style-consulta" ng-if="configPermisoAccionDescargaReporteOrdenes" style="margin-top: 23px; width: 20px !important;">
                    <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer" ng-click="descargarReporteConsultaOt()">
                </div>
            </div>
            <div class="content-fluid">
                <div class="table-responsive">
                    <table id="otTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_consultaOT">
                            <tr>
                                <th data-idColumn="0" data-isNumber="true" class="orderColumnTable orderColumnAscTable">OT</th>
                                <th data-idColumn="1" data-isNumber="false" class="orderColumnTable orderColumnAscTable">OS</th>
                                <th data-idColumn="2" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Cliente</th>
                                <th data-idColumn="3" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Cuenta</th>
                                <!-- <th>TICKET</th> -->
                                <th data-idColumn="4" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Ciudad</th>
                                <!-- <th>DISTRITO</th>
                                <th>CREACION</th> -->
                                <th data-idColumn="5" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Fecha agenda</th>
                                <!-- <th>TURNO</th> -->
                                <!-- <th>OPERARIO</th> -->
                                <th data-idColumn="6" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Tipo</th>
                                <th data-idColumn="7" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Subtipo</th>
                                <th data-idColumn="8" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Estatus</th>
                                <th data-idColumn="9" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Estado</th>
                                <th data-idColumn="10" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Motivo</th>
                                <!-- <th>USUARIO CREA</th> -->
                                <!-- <th><i class="fa fa-wrench" id="herramienta"></i></th>
                                <th><i class="fa fa-picture-o" id="muestra_IMG"></i></th> -->
                                <th style="text-align: center;">Evidencia</th>
                                <th style="text-align: center;">Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <jsp:include page="modals/modalCluster.jsp"></jsp:include>
    <jsp:include page="modals/modalImagenEvidencia.jsp"></jsp:include>
    <jsp:include page="modals/modalMaterialOt.jsp"></jsp:include>
    <jsp:include page="modals/modalDetalleOt.jsp"></jsp:include>
    <jsp:include page="contentTap/filtros.jsp"></jsp:include>
</body>
<!-- Scripts libraries -->
<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/exportExcel/index.min.js"></script>
<!-- Fin -->

<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/consultaOT/jsonConsultaOt.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/consultaOT/consultaOTController.js?v=${sessionScope.versionDepl}" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/consultaOT/consultaOTService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/evidencia/evidenciaController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/evidencia/evidenciaService.js?v=${sessionScope.versionDepl}"></script>

</html>