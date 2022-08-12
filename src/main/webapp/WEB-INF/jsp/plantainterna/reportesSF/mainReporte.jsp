<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>

    <!DOCTYPE html>
    <html ng-app="reportesSFApp">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
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
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/reportesSF/mainReportesSF.css?v=${sessionScope.versionDepl}"
            rel="stylesheet" />
    </head>

    <body id="idBody" ng-controller="reportesSFController" style="display: none;">

        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div ng-show="!permisosConfigUser.permisos || permisosConfigUser.permisos.length === 0"
            class="container container-message">
            <div class="text-accion-nopermiso">
                <i class="icon-not-permiso fas fa-user-lock"></i>
                <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
            </div>
        </div>
        <div class="container" id="container_reportes"
            ng-show="permisosConfigUser && permisosConfigUser.permisos.length">
            <div class="row">
                <div class="col-md-12">
                    <ul class="nav nav-tabs left-menu small-menu flex-column" id="opciones-menu" role="tablist"
                        style="margin-left: 0; height: 100%;">
                        <span class="title-nav-header titulo-menu" style="position: initial;" ng-if="boxContentVisible.backlog"><i
                                class="icon-menu-left fas fa-circle"
                                style="font-size: 0.8em;color: #ccc;"></i>&nbsp;BACKLOG</span>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackInstalaciones">
                            <a id="reporteInstalaciones-tab" data-toggle="tab"
                                ng-click="cambiaReporte('instalaciones', true,'reporteInstalaciones')"
                                href="reporteInstalaciones" role="tab" aria-controls="reporteInstalaciones"
                                aria-selected="false"><i class="icon-menu-left fas fa-toolbox"></i>&nbsp;<span
                                    class="titulo-menu">Instalaciones</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackSoportes">
                            <a id="reporteSoportes-tab" data-toggle="tab"
                                ng-click="cambiaReporte('soportes',true,'reporteSoportes')" href="reporteSoportes"
                                role="tab" aria-controls="reporteSoportes" aria-selected="false"><i
                                    class="icon-menu-left fas fa-headset"></i>&nbsp;<span
                                    class="titulo-menu">Soportes</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackRecolecciones">
                            <a id="reporteRecolecciones-tab" data-toggle="tab"
                                ng-click="cambiaReporte('recolecciones',true,'reporteRecolecciones')"
                                href="reporteRecolecciones" role="tab" aria-controls="reporteRecolecciones"
                                aria-selected="false"><i class="icon-menu-left fas fa-box"></i>&nbsp;<span
                                    class="titulo-menu">Recolecciones</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackAddon">
                            <a id="reporteAddon-tab" data-toggle="tab"
                                ng-click="cambiaReporte('addon',true,'reporteAddon')" href="reporteAddon" role="tab"
                                aria-controls="reporteAddon" aria-selected="false">
                                <i class="icon-menu-left fas fa-folder-plus"></i>&nbsp;<span
                                    class="titulo-menu">Addon</span>
                            </a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackEmpresarial">
                            <a id="reporteEmpresarial-tab" data-toggle="tab"
                                ng-click="cambiaReporte('empresarial',true,'reporteEmpresarial')"
                                href="reporteEmpresarial" role="tab" aria-controls="reporteEmpresarial"
                                aria-selected="false">
                                <i class="icon-menu-left fas fa-building"></i>&nbsp;<span
                                    class="titulo-menu">Empresarial</span>
                            </a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackGeneral">
                            <a id="reporteGeneral-tab" data-toggle="tab"
                                ng-click="cambiaReporte('general',true,'reporteGeneral')" href="reporteGeneral"
                                role="tab" aria-controls="reporteGeneral" aria-selected="false">
                                <i class="icon-menu-left fas fa-file-alt"></i>&nbsp;<span
                                    class="titulo-menu">General</span>
                            </a>
                        </li>
                        <hr style="margin: 0.3em 1em;" ng-if="boxContentVisible.ingresos">
                        <span class="title-nav-header titulo-menu" style="position: initial;" ng-if="boxContentVisible.ingresos"><i
                                class="icon-menu-left fas fa-circle"
                                style="font-size: 0.8em;color: #ccc;"></i>&nbsp;INGRESOS</span>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaIngresoSoportes">
                            <a id="reporteSoportesInst-tab" data-toggle="tab"
                                ng-click="cambiaReporte('soportesing', true,'reporteSoportesIng')"
                                href="reporteSoportesIng" role="tab" aria-controls="reporteISoportesIng"
                                aria-selected="false"><i class="icon-menu-left fas fa-headset"></i>&nbsp;<span
                                    class="titulo-menu">Soportes</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaIngresosVentasRes">
                            <a id="reporteVentasRes-tab" data-toggle="tab"
                                ng-click="cambiaReporte('ventasres', true,'reporteVentasRes')" href="reporteVentasRes"
                                role="tab" aria-controls="reporteVentasRes" aria-selected="false"><i
                                    class="icon-menu-left fas fa-home"></i>&nbsp;<span class="titulo-menu">Ventas
                                    residencial</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaIngresosVentasEmp">
                            <a id="reporteVentasEmp-tab" data-toggle="tab"
                                ng-click="cambiaReporte('ventasemp', true,'reporteVentasEmp')" href="reporteVentasEmp"
                                role="tab" aria-controls="reporteVentasEmp" aria-selected="false"><i
                                    class="icon-menu-left fas fa-building"></i>&nbsp;<span class="titulo-menu">Ventas
                                    empresarial</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaIngresosVentasEmpSA">
                            <a id="reporteVentasEmpSA-tab" data-toggle="tab"
                                ng-click="cambiaReporte('ventasempsa', true,'reporteVentasEmpSA')"
                                href="reporteVentasEmpSA" role="tab" aria-controls="reporteVentasEmpSA"
                                aria-selected="false"><i class="icon-menu-left fas fa-book-open"></i>&nbsp;<span
                                    class="titulo-menu">Ventas
                                    empresarial sin agenda</span></a>
                        </li>
                        <hr style="margin: 0.3em 1em;" ng-if="boxContentVisible.completados">
                        <span class="title-nav-header titulo-menu" style="position: initial;" ng-if="boxContentVisible.completados"><i
                                class="icon-menu-left fas fa-circle"
                                style="font-size: 0.8em;color: #ccc;"></i>&nbsp;COMPLETADOS</span>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaCompletadoSoportes">
                            <a id="reporteSoportesComp-tab" data-toggle="tab"
                                ng-click="cambiaReporte('soportescomp', true,'reporteSoportesComp')"
                                href="reporteSoportesComp" role="tab" aria-controls="reporteSoportesComp"
                                aria-selected="false"><i class="icon-menu-left fas fa-headset"></i>&nbsp;<span
                                    class="titulo-menu">Soportes</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaCompletadoRes">
                            <a id="reporteInstRes-tab" data-toggle="tab"
                                ng-click="cambiaReporte('instalacionres', true,'reporteInstRes')"
                                href="reporteInstRes" role="tab" aria-controls="reporteInstRes"
                                aria-selected="false"><i class="icon-menu-left fas fa-tools"></i>&nbsp;<span
                                    class="titulo-menu">Instalaciones residencial</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaCompletadoEmp">
                            <a id="reporteInstEmp-tab" data-toggle="tab"
                                ng-click="cambiaReporte('instalacionemp', true,'reporteInstEmp')"
                                href="reporteInstEmp" role="tab" aria-controls="reporteInstEmp"
                                aria-selected="false"><i class="icon-menu-left fas fa-toolbox"></i>&nbsp;<span
                                    class="titulo-menu">Instalaciones empresarial</span></a>
                        </li>
                    </ul>
                    <div class="right-content tab-content">
                        <div class="row tab-content">
                            <div class="tab-pane fade" id="reporteInstalaciones" role="tabpanel"
                                aria-labelledby="reporteInstalaciones-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte instalaciones</h5>
                                <jsp:include page="./content/reporteInstalaciones.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteSoportes" role="tabpanel"
                                aria-labelledby="reporteSoportes-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte soportes backlog</h5>
                                <jsp:include page="./content/reporteSoportes.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteRecolecciones" role="tabpanel"
                                aria-labelledby="reporteRecolecciones-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte recolecciones
                                </h5>
                                <jsp:include page="./content/reporteRecolecciones.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteAddon" role="tabpanel"
                                aria-labelledby="reporteAddon-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte addon</h5>
                                <jsp:include page="./content/reporteAddon.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteEmpresarial" role="tabpanel"
                                aria-labelledby="reporteEmpresarial-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte empresarial</h5>
                                <jsp:include page="./content/reporteEmpresarial.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteGeneral" role="tabpanel"
                                aria-labelledby="reporteGeneral-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte general</h5>
                                <jsp:include page="./content/reporteGeneral.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteSoportesIng" role="tabpanel"
                                aria-labelledby="reporteSoportesIng-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte soporte ingresos</h5>
                                <jsp:include page="./content/reporteIngresoSoportes.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteVentasRes" role="tabpanel"
                                aria-labelledby="reporteVentasRes-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ventas residencial</h5>
                                <jsp:include page="./content/reporteVentasResidencial.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteVentasEmp" role="tabpanel"
                                aria-labelledby="reporteVentasEmp-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ventas empresarial</h5>
                                <jsp:include page="./content/reporteVentasEmpresarial.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteVentasEmpSA" role="tabpanel"
                                aria-labelledby="reporteVentasEmpSA-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ventas empresarial sin agenda
                                </h5>
                                <jsp:include page="./content/reporteVentasEmpresarialSA.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteSoportesComp" role="tabpanel"
                                aria-labelledby="reporteSoportesComp-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte soportes completados
                                </h5>
                                <jsp:include page="./content/reporteCompletadoSoportes.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteInstRes" role="tabpanel"
                                aria-labelledby="reporteInstRes-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte soportes completados
                                </h5>
                                <jsp:include page="./content/reporteInstalacionRes.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteInstEmp" role="tabpanel"
                                aria-labelledby="reporteInstEmp-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte soportes completados
                                </h5>
                                <jsp:include page="./content/reporteInstalacionEmp.jsp"></jsp:include>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/modalCluster.jsp"></jsp:include>
        <jsp:include page="filtros.jsp"></jsp:include>

    </body>

    <!-- LIBRERIAS -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
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
        src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesSF/reportesSFController.js?v=${sessionScope.versionDepl}"
        charset="UTF-8"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantainterna/reportesSF/reportesSFService.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

    </html>