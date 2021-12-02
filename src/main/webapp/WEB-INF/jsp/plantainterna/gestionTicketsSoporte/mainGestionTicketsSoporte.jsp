<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="ticketsSoporteApp">

<head>
    <meta charset="ISO-8859-1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>FFM Total play</title>

    <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16"	href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
    <!-- LIBRERIAS -->
    <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/dataTables.fontAwesome.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/selectPicker/css/bootstrap-select.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/jstree/default/style.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/jstree/themes/proton/style.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/datePicker/css/bootstrap-datepicker3_1.9.0.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/sweetalert/css/sweetalert2.min.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css" rel="stylesheet" />
    <link href="${pageContext.request.contextPath}/resources/libraries/alertify/css/alertify.min.css" rel="stylesheet">
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>

    <link href="${pageContext.request.contextPath}/resources/css/plantainterna/gestionTicketsSoporte/mainGestionTicketsSoporte.css" rel="stylesheet" />
</head>

<body id="idBody"class="body" ng-controller="ticketsSoporteController">
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
                        <div class="container-fluid container-filtros-ticketsoporte">
                            <div class="row md-form" id="filtros_config">
                                <div class="col-4 columna-filtro-ind" style="width: 120px; padding-right: 0px !important;">
                                    <label for="filtro_fecha_inicio_ticketsoporte" class="label-filter">Fecha inicial</label>
                                    <input readonly type="text" id="filtro_fecha_inicio_ticketsoporte"
                                    class="datepicker input-filtro-ticketsoporte form-control form-control-sm"
                                    style="width: 110px;" />
                                </div>
                                <div class="col-4 columna-filtro-ind" style="width: 120px; padding-right: 0px !important;">
                                    <label for="filtro_fecha_fin_ticketsoporte" class="label-filter">Fecha final</label>
                                    <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_ticketsoporte"
                                    class="datepicker input-filtro-ticketsoporte form-control form-control-sm"
                                    style="width: 110px;" />
                                </div>
                                <div class="col-1 div-btn-busqueda" >
                                    <button id="btn_consultar_ticketsSoporte" type="button" class="btn btn-sm btn-primary waves-effect waves-light" ng-click="consultarTicketsSoporte()">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="table-responsive">
                                <table class="display table table-hover" cellspacing="0" width="100%" id="tableTicketSoporte">
                                    <thead id="thead_ticketSoporte">
                                        <tr>
                                            <th>OT</th>
                                            <th>Ticket</th>
                                            <th>OS</th>
                                            <th>Fecha creaci&oacute;n</th>
                                            <th>Falla inicial</th>
                                            <th>Tel&eacute;fono</th>
                                            <th>T&eacute;cnico</th>
                                            <th>Ingeniero</th>
                                            <th>H/A Asignaci&oacute;n</th>
                                            <th>Estatus</th>
                                            <th>Tiempo de atenci&oacute;n</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                 </table>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="opcion-alta-ticket" role="tabpanel" aria-labelledby="opcion-alta-ticket-tab">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-row">
                                    <div class="col-4 form-group">
                                        <label for="cuentaTicket" class="span-form-tickets">Cuenta *</label>
                                        <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label for="fallaTicketR" class="span-form-tickets">Falla *</label>
                                        <select class="form-control form-control-sm custom-select" name="fallaTicketR" id="fallaTicketR" ng-change="loadCategoriaTicketSoporte()" ng-model="ticket.idFallaTicket">
                                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                            <option value="{{fallaTicket.id}}" ng-repeat="fallaTicket in listFallasTicket">
                                                {{fallaTicket.descripcion}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label for="tecnicoTicket" class="span-form-tickets">T&eacute;cnico *</label>
                                        <input type="text" class="form-control form-control-sm" data-toggle="modal" data-target="#modalBusquedaTecnicosTicket" id="tecnicoTicket"/>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-row">
                                    <div class="col-4 form-group">
                                        <label for="categoriaTicketR" class="span-form-tickets">Categor&iacute;a *</label>
                                        <select class="form-control form-control-sm custom-select" id="categoriaTicketR" name="categoriaTicketR" ng-change="loadSubcategoriaTicketSoporte()" ng-model="ticket.idCategoriaTicket">
                                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                            <option value="{{categoriaTicket.id}}" ng-repeat="categoriaTicket in listCategoriasTicket">
                                                {{categoriaTicket.descripcion}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label for="subcategoriaTicketR" class="span-form-tickets">Subcategor&iacute;a *</label>
                                        <select class="form-control form-control-sm custom-select" id="subcategoriaTicketR" name="subcategoriaTicketR" ng-model="ticket.idSubcategoriaTicket">
                                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                            <option value="{{subcategoriaTicket.id}}" ng-repeat="subcategoriaTicket in listSubcategoriasTicket">
                                                {{subcategoriaTicket.descripcion}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label for="telefonoTicket" class="span-form-tickets">Tel&eacute;fono </label>
                                        <input type="text" class="form-control form-control-sm" id="telefonoTicket"/>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-4 form-group">
                                        <label for="noSerieTicket" class="span-form-tickets">No. de serie </label>
                                        <input type="text" class="form-control form-control-sm" id="noSerieTicket"/>
                                    </div>
                                    <div class="col-4 form-group">
                                        <label for="noSerieNuevoEquipo" class="span-form-tickets">No. de serie-Nuevo equipo </label>
                                        <input type="text" class="form-control form-control-sm" id="noSerieNuevoEquipo"/>
                                    </div>
                                    <div class="col-4 form-group">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-12 form-group">
                                        <label class="span-form-tickets" for="descripcionProblemaTicket">Descripci&oacute;n del Problema * </label>
                                        <textarea class="form-control form-control-sm" id="descripcionProblemaTicket"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <div style="text-align: right; margin: 1em 0 0 0;">
                                        <input type="button" class="btn btn-primary" ng-click="registrarTicketSoporte()" value="GUARDAR">
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
<jsp:include page="modals/modalBusquedaTecnico.jsp"></jsp:include>
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
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/gestionTicketsSoporteController.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/gestionTicketsSoporteService.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/jsonGestionTicketsSoporte.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>

</html>
