<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="vistaConfirmacionApp">

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
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.css" rel="stylesheet">

        <link
            href="${pageContext.request.contextPath}/resources/css/generic/vistaConfirmacion/vistaConfirmacion.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />

        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
    </head>

    <body id="idBody" class="body" ng-controller="vistaConfirmacionController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container">
            <div class="container-title-header" style="padding: 0 !important;">
                <div class="header-modulo">
                    <h5 class="title-modulo">Vista Confirmaci&oacute;n</h5>
                </div>
            </div>
            <div class="content-fluid" id="container_vista_confirmacion">
                <div class="row container-fluid" style="padding: 0;">
                    <div class="col-3 container-info">
                        <span class="title" style="font-size: 1em;">INFORMACI&Oacute;N</span>
                        <table width="100%" style="margin-top: .5em;">
                            <tr>
                                <td class="detail-title">OT:</td>
                                <td class="detail-info" ng-bind="detalleOt.idOrden || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">ID OS:</td>
                                <td class="detail-info" ng-bind="detalleOt.folioSistema || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">OS:</td>
                                <td class="detail-info" ng-bind="detalleOt.folioSistema || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">TIPO:</td>
                                <td class="detail-info" ng-bind="detalleOt.idTipo || 'Sin datos'">OT</td>
                            </tr>
                            <tr>
                                <td class="detail-title">SUBTIPO:</td>
                                <td class="detail-info" ng-bind="detalleOt.idSubtipo || 'Sin datos'">OT</td>
                            </tr>
                            <tr>
                                <td class="detail-title">NO CUENTA:</td>
                                <td class="detail-info" ng-bind="detalleOt.claveCliente || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">NOMBRE CLIENTE:</td>
                                <td class="detail-info" ng-bind="detalleOt.nombreCliente || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">DIRECCI&Oacute;N:</td>
                                <td class="detail-info" ng-bind="detalleOt.direccion || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">ESTATUS:</td>
                                <td class="detail-info" ng-bind="detalleOt.descripcionEstatus  || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">ESTADO:</td>
                                <td class="detail-info" ng-bind="detalleOt.descripcionEstado  || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">MOTIVO:</td>
                                <td class="detail-info" ng-bind="detalleOt.descripcionMotivo  || 'Sin datos'"></td>
                            </tr>
                            <tr>
                                <td class="detail-title">FECHA AGENDAMIENTO:</td>
                                <td class="detail-info" ng-bind="detalleOt.fechaAgenda  || 'Sin datos' "></td>
                            </tr>
                            <tr>
                                <td class="detail-title">TURNO:</td>
                                <td class="detail-info" ng-bind="detalleOt.turno || 'Sin datos'"></td>
                            </tr>
                        </table>
                        <div class="form-group mt-3">
                            <button id="btnReagendar" ng-click="mostrarModalConfirmacion()" type="button" class="btn btn-primary btnTotal">
                                Desconfirmar
                            </button>
                        </div>

                    </div>
                    <div class="col-6 container-calendar">
                        <div id="calendar_disponibilidad"></div>
                    </div>
                    <div class="col-3 container-agendar">
                        <div class="form-group">
                            <label class="label-agendar">Motivo:</label>
                            <select class="form-control custom-select input-agendar" id="motivo-agenda">
                                <option value="">Seleccione ...</option>
                                <option value="motivo.id" ng-repeat="motivo in listadoMotivo" ng-bind="motivo.nombre">
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="label-agendar">Comentario:</label>
                            <textarea class="form-control input-agendar" style=" resize: none"
                                placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                                id="comentario-agenda" rows="3" maxlength="50"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="label-agendar">Fecha agendamiento:</label>
                            <p class="label-agendar" style="color: #7716FA;" id="fechaAgendamiento">Sin selecci&oacute;n</p>
                        </div>
                        <div class="form-group">
                            <label class="label-agendar">Turno:</label>
                            <p class="label-agendar" style="color: #7716FA;" id="turnoAgendamiento">Sin selecci&oacute;n</p>
                        </div>
                        <div class="form-group">
                            <button id="btnReagendar" ng-click="reagendar()" type="button" class="btn btn-primary btnTotal" style="float: right;">
                                Reagendar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <jsp:include page="./modal/modalConfirmar.jsp"></jsp:include>
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
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/main.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/locales-all.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/jquery-ui.min.js"></script>

    <script
        src="${pageContext.request.contextPath}/resources/js/generic/vistaConfirmacion/vistaConfirmacionController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/vistaConfirmacion/vistaConfirmacionService.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

    </html>