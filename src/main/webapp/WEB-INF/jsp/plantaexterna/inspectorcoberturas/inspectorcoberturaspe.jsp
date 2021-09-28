<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <html lang="es" ng-app="inspectorCoberturaApp">

    <head>
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
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link
            href="${pageContext.request.contextPath}/resources/css/plantaexterna/inspectorCobertura/styleInspectorCobertura.css"
            rel="stylesheet">

        <title>FFM Total play</title>
    </head>

    <body ng-controller="inspectorCoberturaController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container-fluid container-filtros-inspectorCobertura">
            <div class="container container-title-header" style="padding: 0 !important;">
                <div class="header-modulo">
                    <h5 class="title-modulo">Inspector Coberturas</h5>
                    <h1 class="h6 subtitle-modulo"></h1>
                </div>
            </div>
            <div class="content-fluid">
                <div class="row md-form" id="filtros_config">
                    <div class="col-2 columna-filtro-ind">
                        <label for="filtro_fecha_inicio_inspectorCobertura" class="label-filter">Fecha inicial</label>
                        <input readonly type="text" id="filtro_fecha_inicio_inspectorCobertura"
                            placeholder="Fecha Inicial"
                            class="datepicker input-filtro-inspectorCobertura form-control form-control-sm" />
                    </div>
                    <div class="col-2 columna-filtro-ind">
                        <label for="filtro_fecha_fin_inspectorCobertura" class="label-filter">Fecha final</label>
                        <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_inspectorCobertura"
                            class="datepicker input-filtro-inspectorCobertura form-control form-control-sm" />
                    </div>
                    <div class="col-2 column-style-inspectorCobertura columna-filtro-ind">
                        <i class="icono-noseleccion fas fa-exclamation-circle me-2"
                            title="No se encontraron catalogo de fallas" ng-show="banderaErrorEstatus"></i><label
                            for="filtro-fallas" class="label-filter">Falla</label>
                        <div class="dropdown">
                            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..."
                                type="text" id="filtro-fallas"
                                class="input-filtro-inspectorCobertura form-control form-control-sm" />
                            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-fallas">
                                <li style="text-align: center;">
                                    <button ng-click="seleccionTodos(filtrosCobertura.fallas, true)" id="todo_filtro"
                                        type="button"
                                        class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
                                    <button ng-click="seleccionTodos(filtrosCobertura.fallas, false)"
                                        id="ninguno_filtro" type="button"
                                        class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
                                </li>
                                <li class="elemento_menu dropdown-divider"></li>
                                <li ng-repeat="filtroFalla in filtrosCobertura.fallas" class="element-menu-filter">
                                    <label class="dropdown-item form-check-inputfiltro">
                                        <input id="filtrotext-{{filtroFalla.id}}" class="form-check-input"
                                            type="checkbox" ng-model="filtroFalla.checkedOpcion"
                                            ng-checked="filtroFalla.checkedOpcion" />
                                        <span for="filtrotext-{{filtroFalla.id}}" class="dropdown-item item-text-filtro"
                                            ng-bind="filtroFalla.descripcion"></span>
                                    </label>
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
                    <div class="col-1 download-file">
                        <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                            style="cursor:pointer" ng-click="downloadExcelReportFile()">
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid contenedor-inspectorCobertura">
            <div class="content-fluid">
                <div class="row">
                    <div class="col-5">
                        <table id="tableCobertura" class="display table table-hover" cellspacing="0"
                            width="100%">
                            <thead id="thead_cobertura">
                                <tr>
                                    <th>ID</th>
                                    <th>FECHA</th>
                                    <th>REPORTA</th>
                                    <th>FALLA</th>
                                    <th><i class="fas fa-plus" style="color:#808080"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-7">
                        <div class="card map-card">
                            <div id="mapaInspectorCobertura">
                            </div>
                            <div id="content_mapa" class="card-body">
                                <div class="white">
                                    <div class="card-header">
                                        <h5 class="card-title">INCIDENCIAS</h5>
                                    </div>
                                    <div class="divider"></div>
                                    <div style="display: none;" class="content-card" id="content-card-selected">
                                        <div class="card-selected">
                                            <div class="col-md-10 offset-md-1"
                                                ng-repeat="item in listaIncidenciasLigar">
                                                <div class="card card-incidencia">
                                                    <div class="row">
                                                        <div class="col-md-10">
                                                            <h5 class="card-title">
                                                                &nbsp;&nbsp;ID: {{item.id}} </h5>
                                                        </div>
                                                        <div class="col-md-2" style="text-align: right; color: red;">
                                                            <i class="fas fa-trash" style="cursor: pointer;" title="Eliminar"
                                                                ng-click="eliminarIncidencia(item.id)"></i>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-9">
                                                            <span class="title_span"><strong>{{item.reporta}}</strong></span><br>
                                                            <span class="title_span">{{item.falla}}</span>
                                                        </div>
                                                        <div class="col-md-3" style="text-align: right;">
                                                            <div class="list-card-label"></div> <span
                                                                class="badge badge-primary badge-inspector">INP</span><br>
                                                            <small class="title_span"><b>Fecha:
                                                                </b>{{item.fecha}}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-bottom">
                                            <div class="row">
                                                <div class="col-6">
                                                    <h6 class="" id="titulo_Cluster">
                                                        <center>Cl&uacute;ster</center>
                                                    </h6>
                                                </div>
                                                <div class="col-6">
                                                    <h6 class="select_cluster" id="cluster"><span
                                                            id="texto_cluster_seleccionado">Sin
                                                            selecci&oacute;n</span></h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="card-footer btn-ligar" ng-click="ligarIncidencias()">
                                                    <span>LIGAR INCIDENCIAS</span>
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
        </div>
        <jsp:include page="modals/modalCluster.jsp"></jsp:include>
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

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorCobertura/inspectorCoberturaController.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorCobertura/inspectorCoberturaService.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantaexterna/inspectorCobertura/jsonInspectorCobertura.js"></script>
    </html>