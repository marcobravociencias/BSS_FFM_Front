<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>

    <!DOCTYPE html>
    <html ng-app="monitorPMSApp">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
        <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/projectmanager/monitorPMS/styleMonitorPMS.css" rel="stylesheet" />

    </head>

    <body id="idBody" ng-controller="monitorPMSController" style="display: none;">

        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container" id="container_reportes">
            <div class="row">
                <div class="col-md-12">
                    <ul class="nav nav-tabs left-menu small-menu flex-column" id="opciones-menu" role="tablist"
                        style="margin-left: 0; height: 100%;">
                        <li class="nav-item">
                            <a class="opcion-menu active" id="detallePM-tab" data-toggle="tab"
                                href="#detallePM" role="tab" aria-controls="detallePMS"
                                aria-selected="false" ng-click="primerPeticionDetalle()"><i class="icon-menu-left fas fa-bars"></i>&nbsp;<span
                                    class="titulo-menu">Detalle</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="opcion-menu" id="puntaSinEIM-tab" data-toggle="tab" href="#puntaSinEIM" role="tab"
                                aria-controls="puntaSinEIM" aria-selected="false" ng-click="consultaPuntasSinEIM()"><i
                                    class="icon-menu-left fas fa-plus-square"></i>&nbsp;<span
                                    class="titulo-menu">Punta sin EIM</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="opcion-menu" id="segmento-tab" data-toggle="tab" href="#segmento" role="tab"
                                aria-controls="segmento" aria-selected="false" ng-click="consultarsinSegmentoBandeja()"><i
                                    class="icon-menu-left fas fa-file-alt"></i>&nbsp;<span class="titulo-menu">Sin segmento</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="opcion-menu" id="nuevoFolio-tab" data-toggle="tab" href="#nuevoFolio" role="tab"
                                aria-controls="nuevoFolio" aria-selected="false" ng-click="consultarBandejaNuevoFolio()"><i
                                    class="icon-menu-left fas fa-folder-open"></i>&nbsp;<span class="titulo-menu"
                                    style="margin-left: 0.6em;">Nuevos folios</span></a>
                        </li>
                    </ul>
                    <div class="right-content tab-content">
                        <div class="row tab-content">
                            <div class="tab-pane fade show active" id="detallePM" role="tabpanel"
                                aria-labelledby="detallePM-tab">
                                <h5 id="texto_header_reportes" class="text-center">Detalle</h5>
                                <jsp:include page="./content/bandejaDetalle.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="puntaSinEIM" role="tabpanel" aria-labelledby="puntaSinEIM-tab">
                                <h5 id="texto_header_reportes" class="text-center">Punta sin EIM</h5>
                                <jsp:include page="./content/bandejaPuntaEIM.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="segmento" role="tabpanel" aria-labelledby="segmento-tab">
                                <h5 id="texto_header_reportes" class="text-center">Folios sin segmento</h5>
                                <jsp:include page="./content/bandejaSegmento.jsp"></jsp:include>
                            </div>
                            <div class="tab-pane fade" id="nuevoFolio" role="tabpanel" aria-labelledby="nuevoFolio-tab">
                                <h5 id="texto_header_reportes" class="text-center">Nuevos Folios</h5>
                                <jsp:include page="./content/bandejaNuevoFolio.jsp"></jsp:include>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </body>
    <!-- LIBRERIAS -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>
    <!-- -->

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/monitorPMS/monitorPMSController.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/monitorPMS/monitorPMSServices.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/monitorPMS/bandejaDetalleController.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/monitorPMS/mockArrayBandejas.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/monitorPMS/bandejaPuntaEIMController.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/monitorPMS/bandejaSinSegmentoController.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/projectmanager/monitorPMS/bandejaNuevoFolioController.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>

    


    </html>