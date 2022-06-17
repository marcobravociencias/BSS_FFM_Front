<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="vistaChecklistApp">

    <head>
        <meta charset="ISO-8859-1" />
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
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/vistaChecklist/vistaChecklist.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
    </head>

    <body id="idBody" class="body" ng-controller="vistaChecklistController" style="display: none;">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container" id="container_checklist">
            <div ng-show="!configPermisoAccionConsultaOt" class="text-accion-nopermiso">
                <i class="icon-not-permiso fas fa-user-lock"></i>
                <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
            </div>
            <div ng-show="configPermisoAccionConsultaOt">
                <div class="row col-12 content-fluid">
                    <div class="col-1 input-filtro-content">
                        <label for="idot" class="label-filter">OT</label>
                        <input type="text" id="idot" placeholder="Ej: 65434" ng-model="camposFiltro.idot"
                            ng-change="limpiarCamposFiltro(1)" class="form-control input-filtro form-control-sm">
                    </div>
                    <div class="col-1 input-filtro-content">
                        <label for="idos" class="label-filter">OS</label>
                        <input type="text" id="idos" placeholder="Ej: 23214" ng-model="camposFiltro.idos"
                            ng-change="limpiarCamposFiltro(2)" class="form-control input-filtro form-control-sm">
                    </div>
                    <div class="col-1 columna-filtro input-filtro-content">
                        <i class="icono-noseleccion fas fa-exclamation-circle"
                            title="No se encontraron catalogo de estatus" ng-show="!arrayEstatus.length"></i>
                        <label for="filtro-estatus-substatus" class="label-filter">Estatus</label>
                        <div class="dropdown">
                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..."
                                type="text" id="filtro-estatus-substatus"
                                class="input-filtro form-control form-control-sm" />
                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">
                                <li style="text-align: center;">
                                    <button
                                        ng-click="seleccionarTodosRecursivo(arrayEstatus); pintarNombreEstatus(arrayEstatus,'#filtro-estatus-substatus');"
                                        id="todo_filtro" type="button"
                                        class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                    <button
                                        ng-click="deseleccionarTodosRecursivo(arrayEstatus); pintarNombreEstatus(arrayEstatus,'#filtro-estatus-substatus');"
                                        id="ninguno_filtro" type="button"
                                        class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                </li>
                                <li class="elemento_menu dropdown-divider"></li>
                                <li ng-repeat="filtro in arrayEstatus " class="element-menu-filter"
                                    class="element-menu-filter">
                                    <label class="dropdown-item form-check-inputfiltro">
                                        <input
                                            ng-click="setCheckFiltroGenericV2(filtro,arrayEstatus); pintarNombreEstatus(arrayEstatus,'#filtro-estatus-substatus');"
                                            id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                            ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                        <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro"
                                            href="#" ng-bind="filtro.nombre"></span>
                                    </label>
                                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                        ng-include="'filtroEstatus.html'" class="dropdown-menu"></ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-1 columna-filtro input-filtro-content">
                        <i class="icono-noseleccion fas fa-exclamation-circle"
                            title="No se encontraron catalogo de intervenciones"
                            ng-show="!arrayIntervenciones.length"></i>
                        <label for="filtro-intervencion" class="label-filter">Intervenci&oacute;n</label>
                        <div class="dropdown">
                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..."
                                type="text" id="filtro-intervencion"
                                class="input-filtro form-control form-control-sm" />
                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">
                                <li style="text-align: center;">
                                    <button
                                        ng-click="seleccionarTodosRecursivo(arrayIntervenciones); pintarNombreEstatus(arrayIntervenciones,'#filtro-intervencion');"
                                        id="todo_filtro" type="button"
                                        class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                    <button
                                        ng-click="deseleccionarTodosRecursivo(arrayIntervenciones); pintarNombreEstatus(arrayIntervenciones,'#filtro-intervencion');"
                                        id="ninguno_filtro" type="button"
                                        class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                </li>
                                <li class="elemento_menu dropdown-divider"></li>
                                <li ng-repeat="filtro in arrayIntervenciones " class="element-menu-filter">
                                    <label class="dropdown-item form-check-inputfiltro">
                                        <input
                                            ng-click="setCheckFiltroGenericV2(filtro,arrayIntervenciones); pintarNombreEstatus(arrayIntervenciones,'#filtro-intervencion');"
                                            id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                            ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                        <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro"
                                            href="#" ng-bind="filtro.nombre"></span>
                                    </label>
                                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                        ng-include="'filtroIntervencion.html'" class="dropdown-menu"></ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-1 columna-filtro input-filtro-content"> <i
                            class="icono-noseleccion fas fa-exclamation-circle"
                            title="No se encontraron catalogo de intervenciones" ng-show="!listaGeografia.length"></i>
                        <label for="filtro_fecha_inicio" class="label-filter">Geograf&iacute;a</label>
                        <input readonly placeholder="Geograf&iacute;a" type="text" id="filtro_geografia"
                            class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografia()">
                    </div>
                    <div class="col-1 columna-filtro input-filtro-content">
                        <label for="filtro_fecha_inicio" class="label-filter">Fecha inicial</label>
                        <input readonly type="text" id="filtro_fecha_inicio"
                            class="datepicker input-filtro form-control form-control-sm" />
                    </div>
                    <div class="col-1 columna-filtro input-filtro-content">
                        <label for="filtro_fecha_fin" class="label-filter">Fecha final</label>
                        <input readonly type="text" id="filtro_fecha_fin"
                            class="datepicker input-filtro form-control form-control-sm" />
                    </div>
                    <div class="col-1">
                        <button id="btnBuscar" type="button" class="btn btn-primary btnTotal"
                            ng-click="consultaEvidencias()">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <div class="content-fluid p-0" style="margin-top: 1em;">
                    <div class="table-responsive">
                        <table id="evidenciasTable" class="display table" cellspacing="0" width="100%">
                            <thead id="thead_evidencias">
                                <tr>
                                    <th>OT</th>
                                    <th>OS</th>
                                    <th>Cliente</th>
                                    <th>Cuenta</th>
                                    <th>Ciudad</th>
                                    <th>Fecha agenda</th>
                                    <th>Tipo</th>
                                    <th>Subtipo</th>
                                    <th>Estatus</th>
                                    <th>Estado</th>
                                    <th>Motivo</th>
                                    <th style="text-align: center;">Evidencia</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
        <jsp:include page="./modals/modalDetalleEvidencia.jsp"></jsp:include>
        <jsp:include page="./modals/modalGeografia.jsp"></jsp:include>
        <jsp:include page="./modals/modalFoto.jsp"></jsp:include>
        <jsp:include page="contentTap/filtros.jsp"></jsp:include>
    </body>
    <!-- Scripts libraries -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
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
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaChecklist/vistaChecklistJson.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaChecklist/vistaChecklistController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaChecklist/vistaChecklistService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

    </html>