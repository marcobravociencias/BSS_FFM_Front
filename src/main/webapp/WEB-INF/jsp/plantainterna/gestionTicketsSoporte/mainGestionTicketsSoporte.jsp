<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="ISO-8859-1" />
    <title>FFM Total play</title>

    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16"	href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css">
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
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>

    <link href="${pageContext.request.contextPath}/resources/css/plantainterna/gestionTicketsSoporte/mainGestionTicketsSoporte.css" rel="stylesheet" />
</head>

<body id="idBody"class="body">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>    
    <br>
    <div class="container" id="container_tickets_alta_consulta">
        <div class="row">
            <div class="col-md-12">
                <ul class="nav nav-tabs" id="myTabTickets" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="opcion-consulta-ticket-tab" data-toggle="tab" href="#opcion-consulta-ticket" role="tab"
                        aria-controls="opcion-consulta-ticket" aria-selected="true">Consultar tickets</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="opcion-alta-ticket-tab" data-toggle="tab" href="#opcion-alta-ticket" role="tab"
                            aria-controls="opcion-alta-ticket" aria-selected="false">Crear ticket</a>
                    </li>
                </ul>
                <div class="tab-content" id="tabContent-tickets">
                    <div class="tab-pane fade show active" id="opcion-consulta-ticket" role="tabpanel" aria-labelledby="opcion-consulta-ticket-tab">
                        <div class="row">
                        </div>
                    </div>
                    <div class="tab-pane fade" id="opcion-alta-ticket" role="tabpanel" aria-labelledby="opcion-alta-ticket-tab">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-row">
                                    <div class="col-4 form-group">
                                        <label class="">Cuenta </label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label class="">Falla </label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label class="">T&eacute;cnico </label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-4 form-group">
                                        <label class="">Categor&iacute;a </label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label class="">Subcategor&iacute;a </label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label class="">Tel&eacute;fono </label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-4 form-group">
                                        <label class="">No. de serie </label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label class="">No. de serie-Nuevo equipo </label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                    <div class="col-4 form-group">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-12 form-group">
                                        <label class="">Descripci&oacute;n del Problema </label>
                                        <textarea class="form-control form-control-sm"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<!-- Scripts libraries -->
<script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/popper\popper.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/exportExcel/index.min.js"></script>
<!-- Fin -->

<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>

</html>
