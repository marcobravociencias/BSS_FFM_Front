<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="inspectorIncidenciaApp">

    <head>
        <meta charset="ISO-8859-1" />
        <title>FFM Total play</title>

        <link rel="icon" type="image/png" sizes="192x192"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png" />

        <!-- Libraries -->
        <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json" />
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
            rel="stylesheet">
        <!-- Libraries -->

        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/plantaexterna/inspectorIncidencia/styleInspectorIncidencia.css?v=${sessionScope.versionDepl}">
    </head>

    <body id="idBody" ng-controller="inspectorIncidenciaController" style="display: none;">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container contenedor-inspectorIncidencia">
            <div class="container-fluid container-filtros-inspectorincidencia">
                <div class="content-fluid">
                    <div class="row md-form" id="filtros_config" ng-show="isPermisoConsultaIncidencias">
                        <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                            <label for="filtro_fecha_inicio_inspectorincidencia" class="label-filter">Fecha
                                inicial</label>
                            <input readonly type="text" id="filtro_fecha_inicio_inspectorincidencia"
                                class="datepicker input-filtro-inspectorincidencia form-control form-control-sm" />
                        </div>
                        <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                            <label for="filtro_fecha_fin_inspectorincidencia" class="label-filter">Fecha final</label>
                            <input readonly placeholder="Fecha Final" type="text"
                                id="filtro_fecha_fin_inspectorincidencia"
                                class="datepicker input-filtro-inspectorincidencia form-control form-control-sm" />
                        </div>
                        <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                            <i class="icono-noseleccion fas fa-exclamation-circle me-2"
                                title="No se encontraron cat&aacute;logo de fallas" ng-show="banderaErrorFallas"></i>
                            <label for="filtro-fallas" class="label-filter">Falla</label>
                            <div class="dropdown">
                                <input readonly data-mdb-toggle="dropdown" aria-expanded="false"
                                    placeholder="Seleccione..." type="text" id="txtFalla"
                                    class="input-filtro-inspectorincidencia form-control form-control-sm" />
                                <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-fallas">
                                    <li style="text-align: center;">
                                        <button
                                            ng-click="seleccionarTodosRecursivo(filtrosInspector.fallas); pintarNombreEstatus(filtrosInspector.fallas,'#txtFalla');"
                                            id="todo_filtro" type="button"
                                            class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
                                        <button
                                            ng-click="deseleccionarTodosRecursivo(filtrosInspector.fallas); pintarNombreEstatus(filtrosInspector.fallas,'#txtFalla');"
                                            id="ninguno_filtro" type="button"
                                            class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
                                    </li>
                                    <li class="elemento_menu dropdown-divider"></li>
                                    <li ng-repeat="filtro in filtrosInspector.fallas" class="element-menu-filter">
                                        <label class="dropdown-item form-check-inputfiltro">
                                            <input
                                                ng-click="setCheckFiltroGenericV2(filtro,filtrosInspector.fallas); pintarNombreEstatus(filtrosInspector.fallas,'#txtFalla');"
                                                id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                                ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                            <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro"
                                                ng-bind="filtro.descripcion"></span>
                                        </label>
                                        <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                            ng-include="'filtroFalla.html'" class="dropdown-menu"></ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                            <i class="icono-noseleccion fas fa-exclamation-circle me-2"
                                title="No se encontraron cat&aacute;logo de estatus" ng-show="banderaErrorEstatus"></i>
                            <label for="filtro-estatus-substatus" class="label-filter">Estatus</label>
                            <div class="dropdown">
                                <input readonly data-mdb-toggle="dropdown" aria-expanded="false"
                                    placeholder="Seleccione..." type="text" id="txtEstatus"
                                    class="input-filtro-inspectorincidencia form-control form-control-sm" />
                                <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">
                                    <li style="text-align: center;">
                                        <button ng-click="seleccionTodos(listCatEstatus,true)" id="todo_filtro"
                                            type="button"
                                            class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                        <button ng-click="seleccionTodos(listCatEstatus,false)" id="ninguno_filtro"
                                            type="button"
                                            class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                    </li>
                                    <li class="elemento_menu dropdown-divider"></li>
                                    <li ng-repeat="filtroS in listCatEstatus" class="element-menu-filter">
                                        <label class="dropdown-item form-check-inputfiltro">
                                            <input ng-change="estatusSeleccion()" id="filtrotext-{{filtroS.id}}"
                                                class="form-check-input" type="checkbox"
                                                ng-model="filtroS.checkedOpcion" ng-checked="filtroS.checkedOpcion" />
                                            <span for="filtrotext-{{filtroS.id}}" class="dropdown-item item-text-filtro"
                                                ng-bind="filtroS.descripcion"></span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                            <i class="icono-noseleccion fas fa-exclamation-circle me-2"
                                title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i>
                            <label for="cluster" class="label-filter">Geograf&iacute;a</label>
                            <input readonly placeholder="Seleccione..." type="text" id="txtGeografiasConsulta"
                                class="input-filtro-inspectorincidencia form-control form-control-sm">
                        </div>
                        <div class="col-1 div-btn-busqueda">
                            <button id="btn_consultar_incidencias" type="button"
                                class="btn btn-sm btn-primary waves-effect waves-light"
                                ng-click="consultarIncidenciasInspector()">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-fluid">
                <div class="row" ng-show="!isPermisoConsultaIncidencias" style="padding: 1em  0;">
                    <div class="text-accion-nopermiso">
                        <i class="icon-not-permiso fas fa-user-lock"></i>
                        <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
                    </div>
                </div>
                <div ng-show="isPermisoConsultaIncidencias">
                    <div class="row" style="text-align: right;">
                        <div style="padding-left: 1.5em; height: 2.5em; line-height: 2.5em;"
                            class="col-12 visualizar-visible">
                            <div class="contenido_color" ng-repeat="color in listCatEstatus">
                                <i class="fa-xs fa fa-circle" style="{{'color:'+ color.hexaColor}}"
                                    aria-hidden="true"></i>
                                <small ng-bind="color.descripcion"></small>
                            </div>
                        </div>
                    </div>
                    <div id="mapaInspectorIncidencia">
                    </div>
                    <div class="accordion-item" id="consulta-incidencias">
                        <div class="card-body-consulta" style="height: 2.3em; top:11em; border-radius: 0.2rem;">
                            <div class="search-incidencia">
                                <i class="fas fa-search"></i>
                                <input type="text" value="" class="form-control form-control-sm"
                                    ng-model="filtroBusqueda" placeholder="Buscar incidencia" />
                                <span class="chevron accordion-button collapsed" data-toggle="collapse"
                                    data-target="#panelsStayOpen-collapseTwo" aria-expanded="true"
                                    aria-controls="panelsStayOpen-collapseTwo"></span>
                            </div>
                        </div>

                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" 
                            aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="card-body-consulta">
                                <div class="content-incidencia"  id="content_mapa" style="display: none;">
                                    <div class="incidencia-card"
                                        ng-repeat="incidencia in incidencias  | filter:filtroBusqueda">
                                        <div class="row">
                                            <div class="col-2" style="text-align:center;">
                                                <img src="{{incidencia.urlFoto}}"
                                                    ng-click="showImage(incidencia.idIncidencia)" alt="Foto" width="35"
                                                    height="35" class="imgFoto">
                                            </div>
                                            <div class="col-8 content-text">
                                                <span class="text-title" title="{{incidencia.usuarioReporta}}"><strong
                                                        ng-bind="incidencia.usuarioReporta"></strong></span>
                                                <p class="text-title" ng-bind="incidencia.numeroEmpleado"></p>
                                            </div>
                                            <div class="col-2 incidencia-options">
                                                <div class="icon-content"
                                                    ng-click="consultarDetalleIncidencia(incidencia.idIncidencia)"
                                                    style="right: 2.5em; border-color: #ccc;">
                                                    <i class="fa fa-bars" title="Detalle"
                                                        id="icon-{{incidencia.idIncidencia}}"
                                                        style="color: #000; font-size: 0.8em;"></i>
                                                </div>
                                                <div class="icon-content" style="border-color: #ccc;"
                                                    ng-click="pintarUbicacionIncidencia(incidencia.idIncidencia)">
                                                    <i class="fas fa-crosshairs" title="Buscar en mapa"
                                                        style="color: #000;"></i>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="info-incidencia">
                                            <div class="rightbox">
                                                <div class="rb-container">
                                                    <ul class="rb">
                                                        <li class="rb-item">
                                                            <div class="item-title"><strong>ID: <span
                                                                        ng-bind="incidencia.idIncidencia"></span></strong>
                                                            </div>
                                                            <div class="item-title"><span
                                                                    ng-bind="incidencia.descEstatus"></span>
                                                            </div>
                                                        </li>
                                                        <li class="rb-item">
                                                            <div class="item-title">
                                                                <span ng-bind="incidencia.desTipoIncidencia"></span>
                                                            </div>
                                                            <div class="item-title">
                                                                <span ng-bind="incidencia.desSupTipoIncidencia"></span>
                                                            </div>
                                                        </li>
                                                        <li class="rb-item">
                                                            <div class="item-title"><span>Registro: </span>
                                                                <span ng-bind="incidencia.fechaRegistro"></span>
                                                                <span ng-bind="incidencia.horaRegistro"></span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style="margin: 0.2em 1em;">
                                    </div>
                                    <div ng-if="!incidencias.length" class="message-nodata">
                                        <span>Ning&uacute;n dato disponible</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-7" ng-show="false">
                        <div class="row" id="colores_estados">
                            <div class="col-12">
                                <div class="contenido_color" ng-repeat="color in filtrosInspector.coloresStatus">
                                    <i class="fa-sm fa fa-circle" style="{{'color:'+ color.id}}" aria-hidden="true"></i>
                                    <small ng-bind="color.descripcion"></small>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!--div class="col-7" ng-show="false">
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
                    </div-->
            </div>
        </div>

        <jsp:include page="modals/modalFoto.jsp"></jsp:include>
        <jsp:include page="modals/modalCluster.jsp"></jsp:include>
        <jsp:include page="modals/modalDetalleIncidencia.jsp"></jsp:include>

    </body>
    <jsp:include page="filtros.jsp"></jsp:include>
    <!-- LIBRERIAS -->
    <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>

    <!-- ARCHIVOS JS -->
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorIncidencia/inspectorIncidenciaController.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorIncidencia/inspectorIncidenciaService.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorIncidencia/jsonInspectorIncidencia.js?v=${sessionScope.versionDepl}"></script>

    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
    <script>
        var context_project = "${pageContext.request.contextPath}/resources"
    </script>

    </html>