<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="gestionUniversalApp">

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
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/gestionUniversal/mainGestionUniversal.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
    </head>

    <body id="idBody" class="body" ng-controller="gestionUniversalController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container">
            <div class="content-fluid" id="container_gestion_Universal" style="display: none;">
                <div ng-show="!configPermisoAccionConsultaTecnicosPagos && !configPermisoAccionConsultaCambiaContrasena" class="text-accion-nopermiso">
                    <i class="icon-not-permiso fas fa-user-lock"></i>
                    <b class="text-not-permiso">No cuentas con el permiso de consulta.</b>
                </div>
                <div class="container-fluid" style="padding: 0;" ng-show="configPermisoAccionConsultaTecnicosPagos || configPermisoAccionConsultaCambiaContrasena" class="text-accion-nopermiso">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" ng-if="configPermisoAccionConsultaCambiaContrasena">
                            <a class="nav-link active" id="cambiaContrasena-tab" data-toggle="tab"
                                href="#cambiaContrasena" role="tab" aria-controls="cambiaContrasena"
                                aria-selected="false">Cambia
                                contrase&ntilde;a</a>
                        </li>
                        <!--
                               <li class="nav-item">
                            <a class="nav-link" id="gestionCuadrilla-tab" data-toggle="tab" href="#gestionCuadrilla"
                                role="tab" aria-controls="gestionCuadrilla" aria-selected="false">Gesti&oacute;n
                                Cuadrillas</a>
                        </li> 
                        -->
                        <li class="nav-item">
                            <a class="nav-link" id="confiGeografia-tab" data-toggle="tab" href="#confiGeografia"
                                ng-click="consultarCatalogoGeografia()" role="tab" aria-controls="confiGeografia" aria-selected="false">Configuraci&oacute;n
                                Geograf&iacute;a</a>
                        </li>
                        
                        <li class="nav-item" ng-if="configPermisoAccionConsultaTecnicosPagos">
                            <a class="nav-link" id="pagoTecnico-tab" data-toggle="tab" href="#pagoTecnico"
                                ng-click="validaConsultarTecnicosPagos()" role="tab" aria-controls="pagoTecnico"
                                aria-selected="true">Pagos T&eacute;cnicos</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade" ng-show="configPermisoAccionConsultaTecnicosPagos" id="pagoTecnico" role="tabpanel" aria-labelledby="pagoTecnico-tab">
                            <jsp:include page="./content/pagosTecnicos.jsp"></jsp:include>
                        </div>

                        <!--div class="tab-pane fade" id="gestionCuadrilla" role="tabpanel"
                            aria-labelledby="gestionCuadrilla-tab">
                            <jsp:include page="./content/gestionCuadrilla.jsp"></jsp:include>
                        </div-->
                        <div class="tab-pane fade" id="confiGeografia" role="tabpanel"
                            aria-labelledby="confiGeografia-tab">
                            <jsp:include page="./content/configuracionGeografia.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane fade show active" id="cambiaContrasena" role="tabpanel"  ng-show="configPermisoAccionConsultaCambiaContrasena"
                            aria-labelledby="cambiaContrasena-tab">
                            <jsp:include page="./content/cambiaContrasena.jsp"></jsp:include>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/modalFotoTecnico.jsp"></jsp:include>
        <jsp:include page="./modals/modalGeografia-filter.jsp"></jsp:include>
        <jsp:include page="./modals/modalPagosLiberarTecnicos.jsp"></jsp:include>
        <jsp:include page="./modals/modalRestauraContrasena.jsp"></jsp:include>
    </body>
    <!-- Scripts libraries -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <!-- fin -->

    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionUniversal/gestionUniversalController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionUniversal/gestionUniversalService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

    </html>