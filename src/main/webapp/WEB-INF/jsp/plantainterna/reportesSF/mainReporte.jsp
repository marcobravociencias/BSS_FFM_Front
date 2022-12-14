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
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackProactivo">
                            <a id="reporteBackLogProact-tab" data-toggle="tab"
                                ng-click="cambiaReporte('backlogproact',true,'reporteBackLogProact')" href="reporteBackLogProact" role="tab"
                                aria-controls="reporteBackLogProact" aria-selected="false">
                                <i class="icon-menu-left fas fa-gears"></i>&nbsp;<span
                                    class="titulo-menu">Proactivos</span>
                            </a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackLogFactibilidades">
                            <a id="reporteBackLogFactib-tab" data-toggle="tab"
                                ng-click="cambiaReporte('backlogfactib',true,'reporteBackLogFactib')" href="reporteBackLogFactib" role="tab"
                                aria-controls="reporteBackLogFactib" aria-selected="false">
                                <i class="icon-menu-left fas fa-bar-chart"></i>&nbsp;<span
                                    class="titulo-menu">Factibilidades</span>
                            </a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaBackLogVoluntarias">
                            <a id="reporteBackLogVolun-tab" data-toggle="tab"
                                ng-click="cambiaReporte('backlogvolun',true,'reporteBackLogVolun')" href="reporteBackLogVolun" role="tab"
                                aria-controls="reporteBackLogVolun" aria-selected="false">
                                <i class="icon-menu-left fas fa-hand-paper-o"></i>&nbsp;<span
                                    class="titulo-menu">Voluntarias</span>
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
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaIngresosProactivo">
                            <a id="reporteIngresoProact-tab" data-toggle="tab"
                                ng-click="cambiaReporte('ingresoproact',true,'reporteIngresoProact')" href="reporteIngresoProact" role="tab"
                                aria-controls="reporteIngresoProact" aria-selected="false">
                                <i class="icon-menu-left fas fa-gears"></i>&nbsp;<span
                                    class="titulo-menu">Proactivos</span>
                            </a>
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
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaCompletadoProactivo">
                            <a id="reporteCompleProact-tab" data-toggle="tab"
                                ng-click="cambiaReporte('compleproact', true,'reporteCompleProact')"
                                href="reporteCompleProact" role="tab" aria-controls="reporteCompleProact"
                                aria-selected="false"><i class="icon-menu-left fas fa-gears"></i>&nbsp;<span
                                    class="titulo-menu">Proactivos</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaCompletadoCambioDomicilio">
                            <a id="reporteCompleCambDomic-tab" data-toggle="tab"
                                ng-click="cambiaReporte('complecambdomic', true,'reporteCompleCambDomic')"
                                href="reporteCompleCambDomic" role="tab" aria-controls="reporteCompleCambDomic"
                                aria-selected="false"><i class="icon-menu-left fas fa-home"></i>&nbsp;<span
                                    class="titulo-menu">Cambio Domicilio</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaCompletadoSoporteEmpresarial">
                            <a id="reporteCompleSoportEmpr-tab" data-toggle="tab"
                                ng-click="cambiaReporte('complesoportempr', true,'reporteCompleSoportEmpr')"
                                href="reporteCompleSoportEmpr" role="tab" aria-controls="reporteCompleSoportEmpr"
                                aria-selected="false"><i class="icon-menu-left fas fa-city"></i>&nbsp;<span
                                    class="titulo-menu">Soporte Empresarial</span></a>
                        </li>

                        <hr style="margin: 0.3em 1em;" ng-if="boxContentVisible.tickets">
                        <span class="title-nav-header titulo-menu" style="position: initial;" ng-if="boxContentVisible.tickets"><i
                                class="icon-menu-left fas fa-circle"
                                style="font-size: 0.8em;color: #ccc;"></i>&nbsp;TICKETS</span>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaSitiosFibrados">
                            <a id="reporteSitiosFibr-tab" data-toggle="tab"
                                ng-click="cambiaReporte('sitiosfibr', true,'reporteSitiosFibr')"
                                href="reporteSitiosFibr" role="tab" aria-controls="reporteSitiosFibr"
                                aria-selected="false"><i class="icon-menu-left fas fa-signal"></i>&nbsp;<span
                                    class="titulo-menu">Sitios fibrados</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaRedesSociales">
                            <a id="reporteRedesSoc-tab" data-toggle="tab"
                                ng-click="cambiaReporte('redessoc', true,'reporteRedesSoc')"
                                href="reporteRedesSoc" role="tab" aria-controls="reporteRedesSoc"
                                aria-selected="false"><i class="icon-menu-left fas fa-thumbs-up"></i>&nbsp;<span
                                    class="titulo-menu">Redes sociales</span></a>
                        </li>
                        <hr style="margin: 0.3em 1em;" ng-if="boxContentVisible.factibilidad">
                        <span class="title-nav-header titulo-menu" style="position: initial;" ng-if="boxContentVisible.factibilidad"><i
                                class="icon-menu-left fas fa-circle"
                                style="font-size: 0.8em;color: #ccc;"></i>&nbsp;FACTIBILIDAD</span>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaGenerados">
                            <a id="reporteGenerados-tab" data-toggle="tab"
                                ng-click="cambiaReporte('generados', true,'reporteGenerados')"
                                href="reporteGenerados" role="tab" aria-controls="reporteGenerados"
                                aria-selected="false"><i class="icon-menu-left fas fa-plus"></i>&nbsp;<span
                                    class="titulo-menu">Generados</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaFactibilidadCerrados">
                            <a id="reporteFactibilCerrados-tab" data-toggle="tab"
                                ng-click="cambiaReporte('factibilcerrados', true,'reporteFactibilCerrados')"
                                href="reporteFactibilCerrados" role="tab" aria-controls="reporteFactibilCerrados"
                                aria-selected="false"><i class="icon-menu-left fas fa-lock"></i>&nbsp;<span
                                    class="titulo-menu">Cerrados</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaFactibilidadCancelados">
                            <a id="reporteFactibilCancelados-tab" data-toggle="tab"
                                ng-click="cambiaReporte('factibilcancelados', true,'reporteFactibilCancelados')"
                                href="reporteFactibilCancelados" role="tab" aria-controls="reporteFactibilCancelados"
                                aria-selected="false"><i class="icon-menu-left fas fa-times"></i>&nbsp;<span
                                    class="titulo-menu">Cancelados</span></a>
                        </li>
                        <hr style="margin: 0.3em 1em;" ng-if="boxContentVisible.planning">
                        <span class="title-nav-header titulo-menu" style="position: initial;" ng-if="boxContentVisible.planning"><i
                                class="icon-menu-left fas fa-circle"
                                style="font-size: 0.8em;color: #ccc;"></i>&nbsp;PLANNING</span>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaPlanningAgendas">
                            <a id="reportePlanningAgenda-tab" data-toggle="tab"
                                ng-click="cambiaReporte('planningagenda', true,'reportePlanningAgenda')"
                                href="reportePlanningAgenda" role="tab" aria-controls="reportePlanningAgenda"
                                aria-selected="false"><i class="icon-menu-left fas fa-book"></i>&nbsp;<span
                                    class="titulo-menu">Agendas</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaPlanningAddon">
                            <a id="reportePlanningAddon-tab" data-toggle="tab"
                                ng-click="cambiaReporte('planningaddon', true,'reportePlanningAddon')"
                                href="reportePlanningAddon" role="tab" aria-controls="reportePlanningAddon"
                                aria-selected="false"><i class="icon-menu-left fas fa-folder-plus"></i>&nbsp;<span
                                    class="titulo-menu">Addon</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaPlanningNuevosAddon">
                            <a id="reportePlanningNuevosAddon-tab" data-toggle="tab"
                                ng-click="cambiaReporte('planningnuevosaddon', true,'reportePlanningNuevosAddon')"
                                href="reportePlanningNuevosAddon" role="tab" aria-controls="reportePlanningNuevosAddon"
                                aria-selected="false"><i class="icon-menu-left fas fa-file"></i>&nbsp;<span
                                    class="titulo-menu">Nuevos Addon</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaPlanningCompletosOrdenes">
                            <a id="reportePlanningCompleOrd-tab" data-toggle="tab"
                                ng-click="cambiaReporte('planningcompleord', true,'reportePlanningCompleOrd')"
                                href="reportePlanningCompleOrd" role="tab" aria-controls="reportePlanningCompleOrd"
                                aria-selected="false"><i class="icon-menu-left fas fa-flag"></i>&nbsp;<span
                                    class="titulo-menu">Completos ordenes OP</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaPlanningCompletadosAddon">
                            <a id="reportePlanningCompAddon-tab" data-toggle="tab"
                                ng-click="cambiaReporte('planningcompaddon', true,'reportePlanningCompAddon')"
                                href="reportePlanningCompAddon" role="tab" aria-controls="reportePlanningCompAddon"
                                aria-selected="false"><i class="icon-menu-left fas fa-flag-checkered"></i>&nbsp;<span
                                    class="titulo-menu">Completos Addon</span></a>
                        </li>

                        <hr style="margin: 0.3em 1em;" ng-if="boxContentVisible.recoleccion">
                        <span class="title-nav-header titulo-menu" style="position: initial;" ng-if="boxContentVisible.recoleccion"><i
                                class="icon-menu-left fas fa-circle"
                                style="font-size: 0.8em;color: #ccc;"></i>&nbsp;RECOLECCI&Oacute;N</span>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaRecoleccionGeneradas">
                            <a id="reporteRecolecGenerados-tab" data-toggle="tab"
                                ng-click="cambiaReporte('recolecgenerados', true,'reporteRecolecGenerados')"
                                href="reporteRecolecGenerados" role="tab" aria-controls="reporteRecolecGenerados"
                                aria-selected="false"><i class="icon-menu-left fas fa-plus"></i>&nbsp;<span
                                    class="titulo-menu">Generados</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaRecoleccionCerrados">
                            <a id="reporteRecolecCerrados-tab" data-toggle="tab"
                                ng-click="cambiaReporte('recoleccerrados', true,'reporteRecolecCerrados')"
                                href="reporteRecolecCerrados" role="tab" aria-controls="reporteRecolecCerrados"
                                aria-selected="false"><i class="icon-menu-left fas fa-lock"></i>&nbsp;<span
                                    class="titulo-menu">Cerrados</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaRecoleccionAgendadas">
                            <a id="reporteRecolecAgendadas-tab" data-toggle="tab"
                                ng-click="cambiaReporte('recolecagendadas', true,'reporteRecolecAgendadas')"
                                href="reporteRecolecAgendadas" role="tab" aria-controls="reporteRecolecAgendadas"
                                aria-selected="false"><i class="icon-menu-left fas fa-book"></i>&nbsp;<span
                                    class="titulo-menu">Agendadas</span></a>
                        </li>

                        <hr style="margin: 0.3em 1em;" ng-if="boxContentVisible.ventas">
                        <span class="title-nav-header titulo-menu" style="position: initial;" ng-if="boxContentVisible.ventas"><i
                                class="icon-menu-left fas fa-circle"
                                style="font-size: 0.8em;color: #ccc;"></i>&nbsp;VENTAS</span>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaVentasPrincipal">
                            <a id="reporteVentasPrinc-tab" data-toggle="tab"
                                ng-click="cambiaReporte('ventasprinc', true,'reporteVentasPrinc')"
                                href="reporteVentasPrinc" role="tab" aria-controls="reporteVentasPrinc"
                                aria-selected="false"><i class="icon-menu-left fas fa-money"></i>&nbsp;<span
                                    class="titulo-menu">Ventas</span></a>
                        </li>
                        <li class="nav-item opcion-menu" ng-if="configPermisoAccionConsultaVentasInstalacion">
                            <a id="reporteVentasInstalacion-tab" data-toggle="tab"
                                ng-click="cambiaReporte('ventasinstalacion', true,'reporteVentasInstalacion')"
                                href="reporteVentasInstalacion" role="tab" aria-controls="reporteVentasInstalacion"
                                aria-selected="false"><i class="icon-menu-left fas fa-tools"></i>&nbsp;<span
                                    class="titulo-menu">Instalaci&oacute;n</span></a>
                        </li>

                    </ul>
                    <div class="right-content tab-content">
                        <div class="row tab-content">
                            <div class="tab-pane fade" id="reporteInstalaciones" role="tabpanel"
                                aria-labelledby="reporteInstalaciones-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte backlog instalaciones</h5>
                                <jsp:include page="./content/reporteInstalaciones.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteSoportes" role="tabpanel"
                                aria-labelledby="reporteSoportes-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte backlog soportes</h5>
                                <jsp:include page="./content/reporteSoportes.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteRecolecciones" role="tabpanel"
                                aria-labelledby="reporteRecolecciones-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte backlog recolecciones
                                </h5>
                                <jsp:include page="./content/reporteRecolecciones.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteAddon" role="tabpanel"
                                aria-labelledby="reporteAddon-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte backlog addon</h5>
                                <jsp:include page="./content/reporteAddon.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteEmpresarial" role="tabpanel"
                                aria-labelledby="reporteEmpresarial-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte backlog empresarial</h5>
                                <jsp:include page="./content/reporteEmpresarial.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteBackLogProact" role="tabpanel"
                                aria-labelledby="reporteBackLogProact-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte backlog Proactivos</h5>
                                <jsp:include page="./content/reporteBackLogProactivo.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteBackLogFactib" role="tabpanel"
                                aria-labelledby="reporteBackLogFactib-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte backlog factibilidad</h5>
                                <jsp:include page="./content/reporteBackLogFactibilidad.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteBackLogVolun" role="tabpanel"
                                aria-labelledby="reporteBackLogVolun-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte backlog voluntarios</h5>
                                <jsp:include page="./content/reporteBackLogVoluntarios.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteSoportesIng" role="tabpanel"
                                aria-labelledby="reporteSoportesIng-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ingresos soporte</h5>
                                <jsp:include page="./content/reporteIngresoSoportes.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteVentasRes" role="tabpanel"
                                aria-labelledby="reporteVentasRes-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ingresos ventas residencial</h5>
                                <jsp:include page="./content/reporteVentasResidencial.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteVentasEmp" role="tabpanel"
                                aria-labelledby="reporteVentasEmp-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ingresos ventas empresarial</h5>
                                <jsp:include page="./content/reporteVentasEmpresarial.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteVentasEmpSA" role="tabpanel"
                                aria-labelledby="reporteVentasEmpSA-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ventas empresarial sin agenda
                                </h5>
                                <jsp:include page="./content/reporteVentasEmpresarialSA.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteIngresoProact" role="tabpanel"
                                aria-labelledby="reporteIngresoProact-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ingresos proactivos
                                </h5>
                                <jsp:include page="./content/reporteIngresoProactivo.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteSoportesComp" role="tabpanel"
                                aria-labelledby="reporteSoportesComp-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte completados soportes
                                </h5>
                                <jsp:include page="./content/reporteCompletadoSoportes.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteInstRes" role="tabpanel"
                                aria-labelledby="reporteInstRes-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte completados residencial
                                </h5>
                                <jsp:include page="./content/reporteInstalacionRes.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteInstEmp" role="tabpanel"
                                aria-labelledby="reporteInstEmp-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte completados empresarial
                                </h5>
                                <jsp:include page="./content/reporteInstalacionEmp.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteCompleProact" role="tabpanel"
                                aria-labelledby="reporteCompleProact-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte completados proactivos
                                </h5>
                                <jsp:include page="./content/reporteCompletadoProactivo.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteCompleCambDomic" role="tabpanel"
                                aria-labelledby="reporteCompleCambDomic-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte completados cambio domicilio
                                </h5>
                                <jsp:include page="./content/reporteCompletadoCambioDomicilio.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteCompleSoportEmpr" role="tabpanel"
                                aria-labelledby="reporteCompleSoportEmpr-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte completados soporte empresarial
                                </h5>
                                <jsp:include page="./content/reporteCompletadoSoporteEmpresarial.jsp"></jsp:include>
                            </div>
                            
                            <div class="tab-pane fade" id="reporteSitiosFibr" role="tabpanel"
                                aria-labelledby="reporteSitiosFibr-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte sitios fibrados
                                </h5>
                                <jsp:include page="./content/reporteSitiosFibrados.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteRedesSoc" role="tabpanel"
                                aria-labelledby="reporteRedesSoc-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte tickets redes sociales
                                </h5>
                                <jsp:include page="./content/reporteRedesSociales.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteGenerados" role="tabpanel"
                                aria-labelledby="reporteGenerados-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte factibilidad generados
                                </h5>
                                <jsp:include page="./content/reporteGenerados.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteFactibilCerrados" role="tabpanel"
                                aria-labelledby="reporteFactibilCerrados-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte factibilidad cerrados
                                </h5>
                                <jsp:include page="./content/reporteFactibilidadCerrados.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteFactibilCancelados" role="tabpanel"
                                aria-labelledby="reporteFactibilCancelados-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte factibilidad cancelados
                                </h5>
                                <jsp:include page="./content/reporteFactibilidadCancelados.jsp"></jsp:include>
                            </div>

                            <div class="tab-pane fade" id="reportePlanningAgenda" role="tabpanel"
                                aria-labelledby="reportePlanningAgenda-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte planning agendas
                                </h5>
                                <jsp:include page="./content/reportePlanningAgenda.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reportePlanningAddon" role="tabpanel"
                                aria-labelledby="reportePlanningAddon-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte planning addon
                                </h5>
                                <jsp:include page="./content/reportePlanningAddon.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reportePlanningNuevosAddon" role="tabpanel"
                                aria-labelledby="reportePlanningNuevosAddon-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte planning nuevos addon
                                </h5>
                                <jsp:include page="./content/reportePlanningNuevosAddon.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reportePlanningCompleOrd" role="tabpanel"
                                aria-labelledby="reportePlanningCompleOrd-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte planning completos ordenes
                                </h5>
                                <jsp:include page="./content/reportePlanningCompletosOrdenesOp.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reportePlanningCompAddon" role="tabpanel"
                                aria-labelledby="reportePlanningCompAddon-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte planning completados addon
                                </h5>
                                <jsp:include page="./content/reportePlanningCompletadosAddon.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteRecolecGenerados" role="tabpanel"
                                aria-labelledby="reporteRecolecGenerados-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte recolecci&oacute;n generados
                                </h5>
                                <jsp:include page="./content/reporteRecoleccionGenerados.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteRecolecCerrados" role="tabpanel"
                                aria-labelledby="reporteRecolecCerrados-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte recolecci&oacute;n cerrados
                                </h5>
                                <jsp:include page="./content/reporteRecoleccionCerrados.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteRecolecAgendadas" role="tabpanel"
                                aria-labelledby="reporteRecolecAgendadas-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte recolecci&oacute;n agendadas
                                </h5>
                                <jsp:include page="./content/reporteRecoleccionAgendadas.jsp"></jsp:include>
                            </div>

                            <div class="tab-pane fade" id="reporteVentasInstalacion" role="tabpanel"
                                aria-labelledby="reporteVentasInstalacion-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ventas instalaci&oacute;n
                                </h5>
                                <jsp:include page="./content/reporteVentasInstalacion.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="reporteVentasPrinc" role="tabpanel"
                                aria-labelledby="reporteVentasPrinc-tab">
                                <h5 id="texto_header_reportes" class="text-center">Reporte ventas
                                </h5>
                                <jsp:include page="./content/reporteVentasPrincipal.jsp"></jsp:include>
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