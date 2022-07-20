<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html lang="es" ng-app="auditoriaTecnicoApp">

<head>
    <meta charset="ISO-8859-1" />
    <title>FFM Total play</title>

    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png" />

    <!-- Libraries -->
    <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css">
    <!-- Libraries -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/vistaAuditoria/mainVistaAuditoria.css?v=${sessionScope.versionDepl}" />
</head>

<body id="idBody" ng-controller="auditoriaTecnicoController" style="display: none;">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
    <div class="container">
        <div class="container container-title-header" style="padding: 0 !important;">
            <div class="header-modulo">
                <h5 class="title-modulo">Vista Auditor&iacute;a</h5>
                <h1 class="h6 subtitle-modulo"></h1>
            </div>
        </div>
        <div class="form-content">
            <div class="row md-form" id="filtros_config">
                <div class="col-2 columna-filtro-ind">
                    <label for="filtro_fecha_inicio_auditoria" class="label-filter">Fecha inicial</label>
                    <input readonly type="text" id="filtro_fecha_inicio_auditoria" class="datepicker input-filtro-auditoria form-control form-control-sm" />
                </div>
                <div class="col-2 columna-filtro-ind">
                    <label for="filtro_fecha_fin_auditoria" class="label-filter">Fecha final</label>
                    <input readonly type="text" id="filtro_fecha_fin_auditoria" class="datepicker input-filtro-auditoria form-control form-control-sm" />
                </div>
                <div class="col-2 column-style-inspectorincidencia columna-filtro-ind">
                    <label for="cluster" class="label-filter">Geograf&iacute;a</label>
                    <input readonly placeholder="Seleccione..." type="text" id="cluster" class="input-filtro-auditoria form-control form-control-sm">
                </div>
                <div class="col-1">
                    <button id="btn_buscar" type="button" class="btn btn-sm btn-primary waves-effect waves-light btnAuditoria" ng-click="consultarAuditoriasTecnico()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="container-fluid pt-2" id="container_auditoria" ng-show="!isDetalle">
            <table class="display table table-hover" width="100%" id="tableAuditoriaTecnico">
                <thead id="thead_auditoriaTecnico">
                    <tr>
                        <th>No. Empleado</th>
                        <th>Supervisor</th>
                        <th>Distrito</th>
                        <th>Regi&oacute;n</th>
                        <th>Aprobaci&oacute;n de Cuadrillas</th>
                        <th class="text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

        <div class="container-fluid" id="container_detalleAuditoria" ng-show="isDetalle">
            <div class="row filter-content">
                <div class="col-1" style="margin-top: .5em;">
                    <i class="fas fa-arrow-circle-left icon-back" ng-click="changeView()" title="Regresar"></i>
                </div>
                <div class="row col-8 offset-3 filter-tab" style="margin-top: 0.5em;">
                    <div class="col-6 user-info-content user-filter" style="margin-top: 0; color: #7716fa; text-align: right;">
                        <span id="spanSupervisor">
                            {{supervisor.supervisor}}
                        </span>
                    </div>
                    <div class="col-3 user-info-content user-filter" style="margin-top: 0; text-align: center;">
                        Aprobadas: 
                        <span id="spanAprobado" style=" color: #7716fa;">
                            {{contadores.aprobado ? contadores.aprobado : '0'}}
                        </span>
                    </div>
                    <div class="col-3 user-info-content user-filter" style="margin-top: 0; text-align: center;">
                        Desaprobadas: 
                        <span id="spanDesaprobado" style=" color: #7716fa;">
                            {{contadores.desaprobado ? contadores.desaprobado : '0'}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="content-fluid" style="margin-top: 0.7em;">
                <table class="display table table-hover" width="100%" id="tableDetalleAuditoria">
                    <thead id="thead_detalleAuditoria">
                        <tr>
                            <th>Folio</th>
                            <th>OS</th>
                            <th>Fecha y Hora</th>
                            <th>Equipo de T&eacute;cnico</th>
                            <th class="text-center">Estatus</th>
                            <th class="text-center">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <jsp:include page="./modals/modalCluster.jsp"></jsp:include>
    <jsp:include page="./modals/modalDetalleAuditoria.jsp"></jsp:include>
</body>
<!-- Scripts libraries -->
<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
<!-- Scripts libraries -->

<script src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaAuditoria/vistaAuditoriaController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaAuditoria/vistaAuditoriaService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaAuditoria/jsonVistaAuditoria.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

</html>