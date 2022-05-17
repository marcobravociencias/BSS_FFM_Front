<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="seguimientoSoporteApp">

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
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\styleMainBusqueda.css?v=${sessionScope.versionDepl}">
        <link rel="stylesheet"
            href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\mainNoticiaBusqueda.css?v=${sessionScope.versionDepl}">
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/seguimientoSoporte/mainSeguimientoSoporte.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/seguimientoSoporte/mainChatter.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">

    </head>

    <body id="idBody" class="body" ng-controller="seguimientoSoporteController" style="display:none;">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container" id="container_seguimiento" ng-show="!detalleSalesforceView">
            <div class="form-content" ng-show="!isDetalleTicket">
                <div class="col-12 row md-form" id="filtros_config">
                    <div class="col-2 columna-filtro-ind">
                        <label for="filtro_fecha_inicio" class="label-filter"><i class="fa fa-calendar"></i> Fecha
                            inicial</label>
                        <input readonly type="text" id="filtro_fecha_inicio"
                            class="datepicker input-filtro-seguimiento form-control form-control-sm" />
                    </div>
                    <div class="col-2 columna-filtro-ind">
                        <label for="filtro_fecha_fin" class="label-filter"><i class="fa fa-calendar"></i> Fecha
                            inicial</label>
                        <input readonly type="text" id="filtro_fecha_fin"
                            class="datepicker input-filtro-seguimiento form-control form-control-sm" />
                    </div>
                    <div class="col-2">
                        <label for="filtro_fecha_fin" class="label-filter"><i class="fa fa-user"></i> Estatus</label>
                        <li class="nav-item dropdown form-control form-control-sm input-filtro-seguimiento"
                            id="estatusDropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="otros-option-navbar" role="button"
                                data-mdb-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-circle"
                                    style="color: {{catalogoEstatusUsuarios.infoHorasUser.ultimoEstatus.split('-')[1]}} ;"></i>
                                {{catalogoEstatusUsuarios.infoHorasUser.ultimoEstatus.split('-')[0]}}
                            </a>
                            <!-- Dropdown menu -->
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a class="dropdown-item"
                                        ng-repeat="estatus in catalogoEstatusUsuarios.catalogoEstatusUsuarios"
                                        ng-click="changeEstatus(estatus.id)">
                                        <i class="fas fa-circle"
                                            style="color: {{estatus.descripcion.split('-')[1]}} ;"></i>
                                        {{estatus.descripcion.split('-')[0]}}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </div>
                    <div class="col-1">
                        <button id="btn_buscar" type="button"
                            class="btn btn-sm btn-primary waves-effect waves-light btnSeguimiento"
                            ng-click="consultaSeguimiento()">
                            <i class="fa fa-search"></i>
                    </div>
                    <!--div class="col-1 offset-1 user-info-content">
                        <span>Entrada</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaEntrada ?
                            catalogoEstatusUsuarios.infoHorasUser.horaEntrada : 'Sin datos'}}</span>
                    </div>
                    <div class="col-1 user-info-content">
                        <span>S/comida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaSalidaComida ?
                            catalogoEstatusUsuarios.infoHorasUser.horaSalidaComida : 'Sin datos'}}</span>
                    </div>
                    <div class="col-1 user-info-content">
                        <span>LL/comida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaLLegadaComida ?
                            catalogoEstatusUsuarios.infoHorasUser.horaLLegadaComida : 'Sin datos'}}</span>
                    </div>
                    <div class="col-1 user-info-content">
                        <span>Salida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaSalida ?
                            catalogoEstatusUsuarios.infoHorasUser.horaSalida : 'Sin datos'}}</span>
                    </div-->

                </div>
            </div>
            <div ng-show="isBusquedaGeneral && !isDetalleTicket">
                <jsp:include page="./content/consultaIngenieros.jsp"></jsp:include>
            </div>
            <div ng-show="!isBusquedaGeneral && !isDetalleTicket">
                <jsp:include page="./content/consultaTickets.jsp"></jsp:include>
            </div>
            <div ng-show="!isBusquedaGeneral && isDetalleTicket && !detalleSalesforceView">
                <div style="text-align: right; padding-top: 0.5em;">
                    <button ng-click="cerrarDetalleTicket()" type="button" style="padding-right: 1em;" class="btn-close" data-mdb-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>

                <jsp:include page="./content/detalleTicket.jsp"></jsp:include>
            </div>
        </div>
        <jsp:include page="/WEB-INF/jsp/generic/busquedaSalesforce/mainBusquedaSalesforce.jsp"></jsp:include>
        <jsp:include page="./modals/modalDetalle.jsp"></jsp:include>
        <jsp:include page="./modals/modalFoto.jsp"></jsp:include>
    </body>
    <!-- Scripts libraries -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
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

    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/seguimientoSoporteController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/seguimientoSoporteService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/seguimientoSoporteService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/jsonTemp.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceService.js?v=${sessionScope.versionDepl}"></script>

    </html>