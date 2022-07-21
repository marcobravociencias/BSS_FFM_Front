<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html lang="es" ng-app="oportunidadApp">

<head>
    <meta charset="ISO-8859-1" />
    <title>FFM Total play</title>

    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css">
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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/generic/busquedaSalesforce\styleMainBusqueda.css?v=${sessionScope.versionDepl}">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/projectmanager/oportunidades/styleOportunidad.css?v=${sessionScope.versionDepl}" />
</head>

<body id="idBody" ng-controller="oportunidadController" ng-init="initOportunidades()" class="body" style="display: none;">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
    <div class="container" ng-show="!detalleSalesforceView">
        <div class="content-fluid container-filtros-oportunidad contenedor-oportunidad" ng-show="showTable">
            <div class="row col-12" id="filtros_config">
                <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                    <label for="fecha_oportunidad" class="label-filter">Fecha</label>
                    <input readonly type="text" id="fecha_oportunidad" class="input-filtro-oportunidad form-control form-control-sm" style="width: 100px;" />
                </div>
                <div class="col-2 column-style-consulta">
                    <label for="idot" class="label-filter">No. Oportunidad</label>
                    <input type="text" id="idot" placeholder="Ej: 65434" ng-model="camposFiltro.oportunidad" ng-change="limpiarCamposFiltro(1)" class="form-control input-filtro-oportunidad form-control-sm">
                </div>
                <div class="col-2 column-style-consulta">
                    <label for="idos" class="label-filter">Nombre cliente</label>
                    <input type="text" id="idos" placeholder="Ej: 23214" ng-model="camposFiltro.nombreCliente" ng-change="limpiarCamposFiltro(2)" class="form-control input-filtro-oportunidad form-control-sm">
                </div>
                <div class="col-1 div-btn-busqueda" style="width: 65px;">
                    <button id="btn_consultar_oportunidades" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light" ng-click="consultarOportunidades()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                <div id="" class="col-1 column-style-consulta" ng-if="configPermisoAccionDescargaReporteOrdenes" style="margin-top: 23px; width: 20px !important;">
                    <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer" ng-click="descargarReporteConsultaOt()">
                </div>
            </div>
            <!--div class="col-12">
                <div class="row">
                    <div class="col-1 content-contador contadores_border_right form-group" style="margin-left:20%;">
                        <span class="valor_contador" ng-bind="contadorGeneral.numOportunidad"></span>
                        <br>
                        <span class="contadores_general">Oportunidades</span>
                    </div>
                    <div class="col-1 content-contador contadores_border_right form-group">
                        <span class="valor_contador" ng-bind="contadorGeneral.numCsp"></span>
                        <br>
                        <span class="contadores_general">CSP</span>
                    </div>
                    <div class="col-1 content-contador contadores_border_right form-group">
                        <span class="valor_contador" ng-bind="contadorGeneral.numImplementadas"></span>
                        <br>
                        <span class="contadores_general">CSP Implementadas</span>
                    </div>
                    <div class="col-1 content-contador contadores_border_right form-group">
                        <span class="valor_contador" ng-bind="contadorGeneral.numCanceladas"></span>
                        <br>
                        <span class="contadores_general">CSP Canceladas</span>
                    </div>
                    <div class="col-1 content-contador form-group">
                        <span class="valor_contador" ng-bind="contadorGeneral.avance +'%'"></span>
                        <br>
                        <span class="contadores_general">Avance</span>
                        
                    </div>
                </div>
            </div-->
            <div class="col-12" id="contentContadoresPrincipal">
                <ul class="nav nav-tabs" id="tabContadorOportunidades" role="tablist">
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="filtrarOportunidades(1)">
                        <label class="nav-link active label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.numOportunidad ? contadorGeneral.numOportunidad : '0'"></p>
                            Oportunidades
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="filtrarOportunidades(2)">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.numCsp ? contadorGeneral.numCsp : '0'"></p>
                            CSP
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="filtrarOportunidades(3)">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.numImplementadas ? contadorGeneral.numImplementadas : '0'"></p>
                            CSP Implementadas
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="filtrarOportunidades(4)">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.numCanceladas ? contadorGeneral.numCanceladas : '0'"></p>
                            CSP Canceladas
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" >
                            <p class="contador_detalle_oportunidad" ng-bind="contadorGeneral.avance ? contadorGeneral.avance +'%' : '0%'"></p>
                            Avance
                        </label>
                    </li>
                </ul>
            </div>
            <div class="content-fluid">
                <div class="table-responsive">
                    <table id="oportunidadTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_oportunidad">
                            <tr>
                                <th>No. Oportunidad</th>
                                <th>Nombre del cliente</th>
                                <th>EIM asignado</th>
                                <th>Fecha de cierre</th>
                                <th>Check list</th>
                                <th>Num. de CSP's</th>
                                <th>Implementadas</th>
                                <th>Canceladas</th>
                                <th>Avance</th>
                                <th><img style="height: 16px;" src="./resources/img/iconsistema/icon_residencial.svg" alt=""></th>
                                <th><img style="height: 16px;" src="./resources/img/iconsistema/icon_empresarial.svg" alt=""></th>
                                <th>Lider tecnico</th>
                                <th>Torre de Control</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="content-fluid container-filtros-oportunidad contenedor-oportunidad" ng-show="!showTable">
           
            <div class="col-12">
                <i ng-click="regresarPaginaPrincipal()" class="fa fa-chevron-circle-left fa-lg icon_regresar_principal"></i>
                <span class="detalle_oportunidad_estatic">Detalle de la oportunidad</span>
                <span class="detalle_oportunidad_dinamic" ng-bind="objectOportunidad.nombreCliente + ' /'"></span>
                <span class="detalle_oportunidad_estatic">Cotizaci&oacute;n</span>
                <span class="detalle_oportunidad_dinamic" ng-bind="objectOportunidad.cotizacion + ' /'"></span>
                <span class="detalle_oportunidad_estatic">CSP ASOCIADOS</span>
                <span class="detalle_oportunidad_dinamic" ng-bind="contadorDetalleOportunidad.numCsp"></span>
            </div>
            <br>
            <div class="col-12" id="contentContadores">
                <ul class="nav nav-tabs" id="tabContadorDetalleOportunidades" role="tablist">
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="busquedaVehiculosEstado('todos')">
                        <label class="nav-link active label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad" ng-bind="contadorDetalleOportunidad.numCsp"></p>
                            CSP
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="busquedaVehiculosEstado('asignado')">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad">0</p>
                            Enviados a Infra
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="busquedaVehiculosEstado('disponible')">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad">0</p>
                            Recibidos de Infra
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad border_contenedor_contador_detalle" ng-click="busquedaVehiculosEstado('no disponible')">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad">0</p>
                            Implementados
                        </label>
                    </li>
                    <li class="nav-item contenedor_contador_detalle_oportunidad" ng-click="busquedaVehiculosEstado('baja')">
                        <label class="nav-link label_contador_detalle_oportunidad" style="padding: 1em; padding-left: 1.5em; padding-right: 1.5em;" data-toggle="tab" href="#" role="tab">
                            <p class="contador_detalle_oportunidad">0</p>
                            Calendarizados
                        </label>
                    </li>
                </ul>
            </div>
            <hr style="margin-top: .1em;">
            <div class="content-fluid">
                <div class="table-responsive">
                    <table id="table_detalle_oportunidad" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_detalle_oportunidad">
                            <tr>
                                <th>Check</th>
                                <th>Folio</th>
                                <th>Cotizaci&oacute;n</th>
                                <th>Idbrm</th>
                                <th>Cuenta Factura</th>
                                <th>Estatus CSP</th>
                                <th>Estatus OS</th>
                                <th>N&uacute;m OS</th>
                                <th>Plaza Com.</th>
                                <th>Agendar</th>
                                <th>Generar OU</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/generic/busquedaSalesforce/mainBusquedaSalesforce.jsp"></jsp:include>
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
<script src="${pageContext.request.contextPath}/resources/js/projectmanager/oportunidades/oportunidadesController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/projectmanager/oportunidades/oportunidadesService.js?v=${sessionScope.versionDepl}" charset="UTF-8"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceController.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/busquedaSalesforce/busquedaSalesforceService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

</html>