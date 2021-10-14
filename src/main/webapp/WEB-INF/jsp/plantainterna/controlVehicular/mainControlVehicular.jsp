<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html ng-app="controlVehicularApp">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>

        <link rel="icon" type="image/png" sizes="192x192"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16"
            href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png" />
        <link rel="manifest" href="${pageContext.request.contextPath}/resources/img/iconsistema/manifest.json" />
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css"
            rel="stylesheet" />

        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.css"
            rel="stylesheet" />

        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
            rel="stylesheet" />

        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/style.min.css" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/css/proton/style.css"
            rel="stylesheet" />

        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet" />

        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css"
            rel="stylesheet" />
        <link
            href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
            rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css"
            rel="stylesheet" />
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/controlVehicular/mainControlVehicular.css"
            rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
    </head>

    <body ng-controller="controlVehicularController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <br>
        <div class="container-fluid controlContent " style="margin-top: 1em;">
            <div class="row">
                <div id="datos_tablas" class="col-sm-12">
                    <a id="btn_mostrar_nav" style="display: none; position: absolute">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </a>
                    <div class="content-fluid">
                        <div class="container-fluid">
                            <ul class="nav nav-tabs" id="myTabVehiculo" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="consulta-tab" data-toggle="tab" href="#consulta"
                                        role="tab" aria-controls="consulta" onclick="resetAllSearch()"
                                        aria-selected="true">Consultar
                                        Veh&iacute;culos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="modifica-tab" data-toggle="tab" href="#modifica"
                                        onclick="resetAll()" role="tab" aria-controls="modifica" ng-show="isEdit"
                                        aria-selected="false">Modificar
                                        Veh&iacute;culo</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="alta-tab" data-toggle="tab" href="#alta"
                                        onclick="resetAll()" role="tab" aria-controls="alta" aria-selected="false">Alta
                                        Veh&iacute;culo</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade" id="alta" role="tabpanel" aria-labelledby="alta-tab">
                                    <jsp:include page="./insertarVehiculo.jsp"></jsp:include>
                                </div>
                                <div class="tab-pane fade show active" id="consulta" role="tabpanel"
                                    aria-labelledby="consulta-tab">
                                    <jsp:include page="./consultarVehiculo.jsp"></jsp:include>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/historico.jsp"></jsp:include>
        <jsp:include page="./modals/geografia-mainfiltro.jsp"></jsp:include>
        <jsp:include page="./modals/modalFoto.jsp"></jsp:include>
    </body>
    <!-- LIBRERIAS -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
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
    <!-- ARCHIVOS JS  -->
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/plantainterna/controlVehicular/controlVehicularController.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/controlVehicular/controlVehicularService.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>

    </html>