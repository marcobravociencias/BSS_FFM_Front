<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html ng-app="bandejasSalesforceApp">
<head>
    <meta charset="ISO-8859-1" />
    <title>FFM Total play</title>

    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png" />
    
    <!-- Libraries -->
    <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json" />
    <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" /> 
    <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css" rel="stylesheet">
    <!-- Libraries -->

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/plantainterna/bandejasSalesforce/styleBandejasSalesforce.css?v=${sessionScope.versionDepl}"/>
</head>

<body id="idBody" ng-controller="bandejasSalesforceController" style="display: none;">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
    <br>
    <div class="container" id="container_coordinar_instalaciones">
        <div class="content-fluid">
            <div class="row row-parent-bandejas">
                <div class="col-md-12 col-parent-bandejas">
                    <div class="col-12">
                        <div class="row">
                            <div id="opciones-menu-sf" class="left-menu small-menu small-sf"
                                style="margin-left: -.9em; height: 100%;">
                                <div class="col-md-12 opcion-menu" ng-click="cambiarVistaSF(1);">
                                    <i ng-class="{'active-iconmenu':vistaSf==1}" class="icon-menu-left fa fa-clock"></i>
                                    &nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaSf==1}" class="titulo-menu">Pendiente de agendar</span>
                                </div>
                                <div class="col-md-12 opcion-menu" ng-click="cambiarVistaSF(2);">
                                    <i ng-class="{'active-iconmenu':vistaSf==2}" class="icon-menu-left fa fa-pencil-square"></i>
                                        &nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaSf==2}" class="titulo-menu">Rescataventas</span>
                                </div>
                                <div class="col-md-12 opcion-menu" ng-click="cambiarVistaSF(3);">
                                    <i ng-class="{'active-iconmenu':vistaSf==3}" class="icon-menu-left fa fa-stop-circle"></i>
                                        &nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaSf==3}" class="titulo-menu">Pendiente de activar</span>
                                </div>
                            </div>
                            <div class="right-content">
                                <div class="col-12 text-center">
                                    <span class="span-titulo-bandeja" ng-bind="nombreBandejaSf"></span>
                                </div>
                                <div class="row">
                                    <div id="vistaPendiente" class="col-12" ng-show="vistaSf === 1">
                                        <jsp:include page="./content/tablePendienteAgendar.jsp"></jsp:include>
                                    </div>
                                    <div id="vistaAsignada" class="col-12" ng-show="vistaSf === 2">
                                        <jsp:include page="./content/tableRescataventas.jsp"></jsp:include>
                                    </div>
                                    <div id="vistaDetenida" class="col-12" ng-show="vistaSf === 3">
                                        <jsp:include page="./content/tablePendienteActivar.jsp"></jsp:include>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="./modals/modalGeografiaPendienteActivar.jsp"></jsp:include>
    <jsp:include page="./modals/modalGeografiaPendienteAgendar.jsp"></jsp:include>
    <jsp:include page="./modals/modalGeografiaRescataventas.jsp"></jsp:include>
</body>

<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${googlkeyattrvar['gkeactok']}&libraries=geometry,places"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/typeahead/js/typeahead.bundle.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/js/jstree.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/fullcalendar.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/schedulerPlantaInterna.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>

<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/bandejasSalesforce/bandejasSalesforceController.js?v=${sessionScope.versionDepl}"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/bandejasSalesforce/bandejasSalesforceService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

</html>