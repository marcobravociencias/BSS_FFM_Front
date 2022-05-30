<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <!DOCTYPE html>

    <html lang="es" ng-app="inspectorCoberturaApp">

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
        <!-- Libraries -->
        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/plantaexterna/inspectorCobertura/styleInspectorCobertura.css?v=${sessionScope.versionDepl}">
    </head>

    <body id="idBody" ng-controller="inspectorCoberturaController" style="display: none;">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="row" ng-show="!isPermisoConsultaIncidencias" style="padding: 1em  0;">
            <div class="text-accion-nopermiso">
                <i class="icon-not-permiso fas fa-user-lock"></i>
                <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
            </div>
        </div>
        <div class="container container-fluid contenedor-inspectorCobertura" ng-show="isPermisoConsultaIncidencias">
            <div class="col-12 row md-form" id="filtros_config">
                <div class="col-2 columna-filtro-ind" style="padding-right: 0px !important;">
                    <label for="filtro_fecha_inicio_inspectorCobertura" class="label-filter">Fecha inicial</label>
                    <input readonly type="text" id="filtro_fecha_inicio_inspectorCobertura" placeholder="Fecha Inicial"
                        class="datepicker input-filtro-inspectorCobertura form-control form-control-sm" />
                </div>
                <div class="col-2 columna-filtro-ind" style="padding-right: 0px !important;">
                    <label for="filtro_fecha_fin_inspectorCobertura" class="label-filter">Fecha final</label>
                    <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_inspectorCobertura"
                        class="datepicker input-filtro-inspectorCobertura form-control form-control-sm" />
                </div>
                <div class="col-2 column-style-inspectorcobertura columna-filtro-ind">
                    <i class="icono-noseleccion fas fa-exclamation-circle me-2"
                        title="No se encontraron cat&aacute;logo de fallas" ng-show="banderaErrorFallas"></i>
                    <label for="filtro-fallas" class="label-filter">Falla</label>
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..."
                            type="text" id="txtFalla"
                            class="input-filtro-inspectorCobertura form-control form-control-sm" />
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
                <div class="col-1 div-btn-busqueda">
                    <button id="btn_consultar_cobertura" type="button"
                        class="btn btn-sm btn-primary waves-effect waves-light" ng-click="consultarCoberturas()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                <div class="col-1 download-file" ng-show="false">
                    <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                        style="cursor:pointer" ng-click="downloadExcelReportFile()">
                </div>
            </div>
            <div class="content-fluid mt-3">
                <div class="row">
                    <div class="col-12">
                        <div class="card map-card">
                            <div id="mapaInspectorCobertura">
                            </div>
                            <div id="content_mapa" class="card-body" ng-if="listaIncidenciasLigar.length">
                                <div class="white-content">
                                    <!--div class="card-header">
                                        <h5 class="card-title">
                                            INCIDENCIAS
                                            <span ng-if="listaIncidenciasLigar.length" style="color: red;"
                                                ng-bind="listaIncidenciasLigar.length"></span>
                                        </h5>
                                    </div-->
                                    <div class="content-card pt-2" id="content-card-selected">
                                        <div class="row">
                                            <div class="col-md-12 card-selected">
                                                <div class="timeline">
                                                    <div class="timeline-container primary"
                                                        ng-repeat="item in listaIncidenciasLigar">
                                                        <div class="timeline-icon">
                                                            <i class="fas fa-check"></i>
                                                        </div>
                                                        <div class="timeline-body">
                                                            <div class="row" style="height: 1.5em;">
                                                                <div class="col-md-10">
                                                                    <h5 class="timeline-title">
                                                                        <span class="badge">ID:
                                                                            {{item.idIncidencia}}</span>

                                                                    </h5>
                                                                </div>
                                                                <div class="col-md-2 icon-content"
                                                                    ng-click="eliminarIncidencia(item.idIncidencia)">
                                                                    <i class="far fa-trash-alt" style="cursor: pointer;"
                                                                        title="Eliminar"></i>
                                                                </div>
                                                            </div>
                                                            <div class="card card-incidencia">
                                                                <div class="row">
                                                                    <div class="col-md-12 text-format">
                                                                        <span
                                                                            class="title_span"><strong>{{item.usuarioReporta}}</strong></span><br>
                                                                        <span
                                                                            class="title_span">{{item.desTipoIncidencia}}</span><br>
                                                                        <small class="title_span"
                                                                            style="color: #039be5;">
                                                                            <b>Fecha: </b>{{item.fechaRegistro}}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="asigna-cluster-link">
                                        <span ng-click="openMdlCluster()">Asignar a
                                            cluster</span>
                                    </div>
                                </div>
                            </div>
                            <div class="pill-counter">
                                <div class="row">
                                    <div class="col-md-2 icon-content-count" style="cursor: auto;">
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <div class="col-md-10 mt-1 p-0" style="margin-left: 2.5em;text-align: center;">
                                        <span>Incidencias seleccionadas <strong><span style="color: #000;"
                                                    ng-bind="listaIncidenciasLigar.length"></span></strong></span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body-consulta" style="height:8%;top:1%;border-radius: 0.2rem;">
                                <div class="search-incidencia">
                                    <i class="fas fa-search"></i>
                                    <input type="text" value="" class="form-control form-control-sm"
                                        ng-model="filtroBusqueda" placeholder="Buscar incidencia" />
                                </div>
                            </div>
                            <div class="card-body-consulta">
                                <div class="content-incidencia">
                                    <div class="incidencia-card"
                                        ng-repeat="incidencia in incidenciasCobertura  | filter:filtroBusqueda">
                                        <div class="row">
                                            <div class="col-2" style="text-align:center;">
                                                <img src="{{incidencia.urlFoto}}" ng-click="showImage(incidencia.idIncidencia)"
                                                    alt="Foto" width="35" height="35" class="imgFoto">
                                            </div>
                                            <div class="col-8 content-text">
                                                <span class="text-title" title="{{incidencia.usuarioReporta}}"><strong
                                                        ng-bind="incidencia.usuarioReporta"></strong></span>
                                                <p class="text-title" ng-bind="incidencia.numeroEmpleado"></p>
                                            </div>
                                            <div class="col-2 incidencia-options">
                                                <div class="icon-content"
                                                    ng-click="agregarIncidenciaList(incidencia.idIncidencia)"
                                                    style="right: 2.5em; border-color: #ccc;">
                                                    <i class="fas fa-check" title="Agregado"
                                                        ng-if="incidencia.isSelected"
                                                        id="icon-{{incidencia.idIncidencia}}"
                                                        style="color: #51b37d; font-size: 0.8em;"></i>
                                                    <i class="fas fa-plus" title="Agregar"
                                                        ng-if="!incidencia.isSelected"
                                                        id="icon-{{incidencia.idIncidencia}}"
                                                        style="color: #000; font-size: 0.8em;"></i>
                                                </div>
                                                <div class="icon-content" style="border-color: #ccc;"
                                                    ng-click="pintarUbicacion(incidencia.idIncidencia)">
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
                                                            <div class="item-title"><span
                                                                    ng-bind="incidencia.descEstatus"></span></div>
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
                                                            <div class="item-title"><span>Registro:</span>
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
                                    <div ng-if="!incidenciasCobertura.length" class="message-nodata">
                                        <span>Ning&uacute;n dato disponible</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="modals/modalCluster.jsp"></jsp:include>
        <jsp:include page="modals/modalFoto.jsp"></jsp:include>
        <jsp:include page="filtros.jsp"></jsp:include>
    </body>

    <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
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
    <script src="${pageContext.request.contextPath}/resources/libraries/exportExcel/index.min.js"></script>

    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorCobertura/inspectorCoberturaController.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorCobertura/inspectorCoberturaService.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorCobertura/jsonInspectorCobertura.js?v=${sessionScope.versionDepl}"></script>
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