<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="coordInstalacionesPIApp">
    <head>
        <meta charset="UTF-8" />
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
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css"
        rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css"
        rel="stylesheet">
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlkqLjBBERaYT3XXhZiRZIy6nBPN3G0iU&libraries=places" ></script>
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css"
        rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
        rel="stylesheet">
        <link
        href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
        rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
        rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/coordInstalaciones/styleCoordInstalaciones.css"  rel="stylesheet"/>
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css" rel="stylesheet">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/jQueryTimelinr/css/timelinr.css"/>
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.css' rel='stylesheet' />
        <link href='https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/css/all.css' rel='stylesheet'>
    </head>
    <body id="idBody" ng-controller="coordInstPIController" style="overflow-x: hidden;">
        
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        
        <br>
        <div class="container" id="container_coordinar_instalaciones">
            <div class="row">
              
                <div class="col-md-12">

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="opcion-ffm-tab" data-toggle="tab" href="#opcion-ffm" role="tab"
                                aria-controls="opcion-ffm" aria-selected="true">Bandejas FFM</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="opcion-salesfoce-tab" data-toggle="tab" href="#opcion-salesfoce" role="tab"
                                aria-controls="opcion-salesfoce" aria-selected="false">Bandejas SalesForce</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="opcion-ffm" role="tabpanel" aria-labelledby="opcion-ffm-tab">
                            <div class="col-12">
                                <div class="row">
                                    <div id="opciones-menu" class="left-menu small-menu" style="margin-left: -.9em;">
                                        <div class="col-md-12 opcion-menu" ng-click="cambiarVista(1);">
                                            <i ng-class="{'active-iconmenu':vistaCoordinacion==1}" class="icon-menu-left fa fa-clock"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==1}" class="titulo-menu">Pendiente</span>
                                        </div>
                                        <div class="col-md-12 opcion-menu" ng-click="cambiarVista(2);">
                                            <i ng-class="{'active-iconmenu':vistaCoordinacion==2}" class="icon-menu-left fa fa-pencil-square"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==2}" class="titulo-menu">Asignada</span>
                                        </div>
                                        <div class="col-md-12 opcion-menu" ng-click="cambiarVista(3);">
                                            <i ng-class="{'active-iconmenu':vistaCoordinacion==3}" class="icon-menu-left fa fa-stop-circle"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==3}" class="titulo-menu">Detenida</span>
                                        </div>
                                        <div class="col-md-12 opcion-menu" ng-click="cambiarVista(4);">
                                            <i ng-class="{'active-iconmenu':vistaCoordinacion==4}" class="icon-menu-left fa fa-check"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==4}" class="titulo-menu">Terminada</span>
                                        </div>
                                        <div class="col-md-12 opcion-menu" ng-click="cambiarVista(5);">
                                            <i ng-class="{'active-iconmenu':vistaCoordinacion==5}" class="icon-menu-left fa fa-times"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==5}" class="titulo-menu">Cancelada</span>
                                        </div>
                                        <div class="col-md-12 opcion-menu" ng-click="cambiarVista(6);">
                                            <i ng-class="{'active-iconmenu':vistaCoordinacion==6}" class="icon-menu-left fa fa-calendar"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==6}" class="titulo-menu">Calendarizada</span>
                                        </div>
                                        <div class="col-md-12 opcion-menu" ng-click="cambiarVista(7);">
                                            <i ng-class="{'active-iconmenu':vistaCoordinacion==7}" class="icon-menu-left fa fa-handshake"></i>&nbsp;&nbsp;<span ng-class="{'active-text-menu':vistaCoordinacion==7}" class="titulo-menu">Gestoria</span>
                                        </div>
                                    </div>
                                    <div class="right-content">
                                        <div class="row">
                                            <div class="col-12" ng-show="vistaCoordinacion === 1">
                                                PENDIENTE
                                                <jsp:include page="./content/tablePendiente.jsp"></jsp:include>
                                            </div>
                                            <div class="col-12" ng-show="vistaCoordinacion === 2">
                                                ASIGNADA
                                                <jsp:include page="./content/tableAsignada.jsp"></jsp:include>
                                            </div>
                                            <div class="col-12" ng-show="vistaCoordinacion === 3">
                                                DETENIDA
                                                <jsp:include page="./content/tableDetenida.jsp"></jsp:include>
                                            </div>
                                            <div class="col-12" ng-show="vistaCoordinacion === 4">
                                                TERMINADA
                                                <jsp:include page="./content/tableTerminada.jsp"></jsp:include>
                                            </div>
                                            <div class="col-12" ng-show="vistaCoordinacion === 5">
                                                CANCELADA
                                                <jsp:include page="./content/tableCancelada.jsp"></jsp:include>
                                            </div>
                                            <div class="col-12" ng-show="vistaCoordinacion === 6">
                                                CALENDARIZADA
                                                <jsp:include page="./content/tableCalendarizado.jsp"></jsp:include>
                                            </div>
                                            <div class="col-12" ng-show="vistaCoordinacion === 7">
                                                GESTORIA
                                                <jsp:include page="./content/tableGestoria.jsp"></jsp:include>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="tab-pane fade" id="opcion-salesfoce" role="tabpanel" aria-labelledby="opcion-salesfoce-tab">
                            SALESFOCE
                        </div>
                    </div>
                </div>
            </div>  
        </div>







        <jsp:include page="./modals/modalCluster.jsp"></jsp:include>
        <jsp:include page="./modals/modalDetalleOt.jsp"></jsp:include>
        <jsp:include page="./modals/modalChat.jsp"></jsp:include>
        <jsp:include page="./modals/detalleCuenta.jsp"></jsp:include>
        <jsp:include page="./modals/modalGeografia.jsp"></jsp:include>
    </body>
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
<script type="text/javascript"
    src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/coordInstalacionesPIController.js?"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/coordInstalacionesPIService.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/busqGral.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/comentariosChat.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/infoCuenta.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/infoSitio.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/historico.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/coordInstalaciones/infoOt.js"></script>
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>	
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
    
	<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
</html>