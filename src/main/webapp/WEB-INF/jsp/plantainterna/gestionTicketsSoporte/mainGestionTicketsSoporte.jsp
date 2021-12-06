<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="ticketsSoporteApp">

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
            <link href="${pageContext.request.contextPath}/resources/css/plantainterna/gestionTicketsSoporte/mainGestionTicketsSoporte.css" rel="stylesheet" />

    </head>

    <body id="idBody" class="body" ng-controller="ticketsSoporteController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container">
            <div class="form-content">
                <div class="row md-form" id="filtros_config">
                    <div class="col-2 columna-filtro-ind" ng-show="isBusqueda">
                        <label for="filtro_fecha_inicio" class="label-filter">Fecha inicial</label>
                        <input readonly type="text" id="filtro_fecha_inicio"
                            class="datepicker input-filtro-ticket form-control form-control-sm" />
                    </div>
                    <div class="col-2 columna-filtro-ind" ng-show="isBusqueda">
                        <label for="filtro_fecha_fin" class="label-filter">Fecha final</label>
                        <input readonly type="text" id="filtro_fecha_fin"
                            class="datepicker input-filtro-ticket form-control form-control-sm" />
                    </div>
                    <div class="col-1" ng-show="isBusqueda">
                        <button id="btn_buscar" type="button"
                            class="btn btn-sm btn-primary waves-effect waves-light btnTicket"
                            ng-click="consultarTicketsSoporte()">
                            <i class="fa fa-search"></i>
                    </div>
                    <div class="col-1 user-info-content" ng-class="{'offset-1': isBusqueda, 'offset-6': !isBusqueda}">
                        <span>Entrada</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaEntrada ?
                            catalogoEstatusUsuarios.infoHorasUser.horaEntrada : 'Sin datos'}}</span>
                    </div>
                    <div class="col-1 user-info-content">
                        <span>S/comida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaSalidaComida ?
                            catalogoEstatusUsuarios.infoHorasUser.horaSalidaComida : 'Sin datos'}}</span>
                    </div>
                    <div class="col-1 user-info-content">
                        <span>LL/comida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaLLegadaComida ?
                            catalogoEstatusUsuarios.infoHorasUser.horaLLegadaComida : 'Sin datos'}}</span>
                    </div>
                    <div class="col-1 user-info-content">
                        <span>Salida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaSalida ?
                            catalogoEstatusUsuarios.infoHorasUser.horaSalida : 'Sin datos'}}</span>
                    </div>
                    <div class="col-2 columna-filtro-ind" style="margin-top: 2.3em;">
                        <li class="nav-item dropdown form-control form-control-sm input-filtro-ticket"
                            id="estatusDropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="otros-option-navbar" role="button"
                                data-mdb-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-circle"
                                    style="color: {{catalogoEstatusUsuarios.infoHorasUser.ultimoEstatus.split('-')[1]}} ;"></i>
                                {{catalogoEstatusUsuarios.infoHorasUser.ultimoEstatus.split('-')[0]}}
                            </a>
                            <!-- Dropdown menu -->
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a class="dropdown-item"
                                        ng-repeat="estatus in catalogoEstatusUsuarios.catalogoEstatusUsuarios"
                                        ng-click="changeEstatus(estatus.id)">
                                        <i class="fas fa-circle"
                                            style="color: {{estatus.descripcion.split('-')[1]}} ;"></i>
                                        {{estatus.descripcion.split('-')[0]}}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
            <div class="container-fluid" id="container_ticket" ng-show="isBusqueda">
                <div class="row filter-content">
                    <div class="col-2 form-group" style="margin-bottom: 0; margin-top: .5em;">
                            <i class="fas fa-plus-circle icon-back" ng-click="changeView()" title="Nuevo Ticket"></i>
                    </div>
                    <div class="row col-6 filter-tab" style="margin-top: 0.5em;">
                        <div class="col-3 user-info-content user-filter" style="margin-top: 0;">
                            <span ng-click="searchBy('Abierto')" id="spanAbierto"><i class="fa fa-filter" id="filterAbierto"></i>Abierto {{contadores.abierto ? contadores.abierto : '0'}}</span>
                        </div>
                        <div class="col-3 user-info-content user-filter" style="margin-top: 0;">
                            <span ng-click="searchBy('Cerrado')" id="spanCerrado"><i class="fa fa-filter" id="filterCerrado"></i>Cerrado {{contadores.cerrado ? contadores.cerrado : '0'}}</span>
                        </div>
                        <div class="col-3 user-info-content user-filter" style="margin-top: 0;">
                            <span ng-click="searchBy('Escalado')" id="spanEscalado"><i class="fa fa-filter" id="filterEscalado"></i>Escalado {{contadores.escalado ? contadores.escalado : '0'}}</span>
                        </div>
                        <div class="col-3 user-info-content user-filter" style="margin-top: 0;">
                            <span ng-click="searchBy('Pendiente')" id="spanPendiente"><i class="fa fa-filter" id="filterPendiente"></i>Pendiente {{contadores.pendiente ? contadores.pendiente : '0'}}</span>
                        </div>
                    </div>
                    <div class="col-2 offset-2  form-group" style="margin-bottom: 0; margin-top: .5em;">
                        <input placeholder="Buscar" type="text" autocomplete="off"
                            class="search-filtro form-control form-control-sm mt-0" id="searchTextTicket"><i
                            class="fa fa-search icon-search"></i>
                    </div>
                </div>
                <div class="content-fluid" style="margin-top: 0.7em;">
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
            <div class="container-fluid" id="container_ticket_form" ng-show="!isBusqueda">
                <div class="row filter-content">
                    <div class="col-1" style="margin-top: .5em;">
                        <i class="fas fa-arrow-circle-left icon-back" ng-click="changeView()" title="Regresar"></i>
                    </div>
                </div>
                <br>
                <div class="col-12">
                    <div class="form-row">
                        <div class="col-3 form-group">
                            <label for="cuentaTicket" class="span-form-tickets">Cuenta *</label>
                            <input type="text" class="form-control form-control-sm" id="cuentaTicket"/>
                        </div>
                        <div class="col-3 form-group">
                            <label for="tecnicoTicket" class="span-form-tickets">T&eacute;cnico *</label>
                            <input type="text" class="form-control form-control-sm" data-toggle="modal" data-target="#modalBusquedaTecnicosTicket" id="tecnicoTicket"/>
                        </div>
                        <div class="col-3 form-group">
                            <label for="telefonoTicket" class="span-form-tickets">Tel&eacute;fono </label>
                            <input type="text" class="form-control form-control-sm" id="telefonoTicket"/>
                        </div>
                        <div class="col-3 form-group">
                            <label for="noSerieTicket" class="span-form-tickets">No. de serie </label>
                            <input type="text" class="form-control form-control-sm" id="noSerieTicket"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-3 form-group">
                            <label for="noSerieNuevoEquipo" class="span-form-tickets">No. de serie-Nuevo equipo </label>
                            <input type="text" class="form-control form-control-sm" id="noSerieNuevoEquipo"/>
                        </div>
                        <div class="col-3 form-group">
                            <label for="fallaTicketR" class="span-form-tickets">Falla *</label>
                            <select class="form-control form-control-sm custom-select" name="fallaTicketR" id="falla" ng-change="loadCategoriaTicketSoporte()" ng-model="ticket.idFallaTicket">
                                <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="{{fallaTicket.id}}" ng-repeat="fallaTicket in listFallasTicket">
                                    {{fallaTicket.descripcion}}
                                </option>
                            </select>
                        </div>
                        <div class="col-3 form-group">
                            <label for="categoriaTicketR" class="span-form-tickets">Categor&iacute;a *</label>
                            <select class="form-control form-control-sm custom-select" id="categoria" name="categoriaTicketR" ng-change="loadSubcategoriaTicketSoporte()" ng-model="ticket.idCategoriaTicket">
                                <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="{{categoriaTicket.id}}" ng-repeat="categoriaTicket in listCategoriasTicket">
                                    {{categoriaTicket.descripcion}}
                                </option>
                            </select>
                        </div>
                        <div class="col-3 form-group">
                            <label for="subcategoriaTicketR" class="span-form-tickets">Subcategor&iacute;a *</label>
                            <select class="form-control form-control-sm custom-select" id="subcategoria" name="subcategoriaTicketR" ng-model="ticket.idSubcategoriaTicket">
                                <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="{{subcategoriaTicket.id}}" ng-repeat="subcategoriaTicket in listSubcategoriasTicket">
                                    {{subcategoriaTicket.descripcion}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-3 form-group">
                            <label for="tipoOrdenTicketR" class="span-form-tickets">Tipo orden *</label>
                            <select class="form-control form-control-sm custom-select" name="tipoOrdenTicketR" id="tipoOrden" ng-model="ticket.tipoOrden">
                                <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="instalacion" selected>INSTALACI&Oacute;N</option>
                                <option value="soporte" selected>SOPORTE</option>
                                <option value="addon" selected>ADDON</option>
                            </select>
                        </div>
                        <div class="col-3 form-group">
                            <label for="tipoNegocioTicketR" class="span-form-tickets">Tipo de negocio *</label>
                            <select class="form-control form-control-sm custom-select" name="tipoNegocioTicketR" id="tipoNegocio" ng-model="ticket.tipoNegocio">
                                <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="residencial" selected>RESIDENCIAL</option>
                                <option value="empresarial" selected>EMPRESARIAL</option>
                            </select>
                        </div>
                        <div class="col-3 form-group">
                            <label for="regionTicketR" class="span-form-tickets">Regi&oacute;n *</label>
                            <select class="form-control form-control-sm custom-select" name="regionTicketR" id="region" ng-model="ticket.region">
                                <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="colombia" selected>COLOMBIA</option>
                                <option value="mexico" selected>M&Eacute;XICO</option>
                            </select>
                        </div>
                        <div class="col-3 form-group">
                            <label for="tecnologiaTicketR" class="span-form-tickets">Tecnolog&iacute;a *</label>
                            <select class="form-control form-control-sm custom-select" name="tecnologiaTicketR" id="tecnologia" ng-model="ticket.tecnologia">
                                <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="huawei" selected>HUAWEI</option>
                                <option value="cte" selected>ZTE</option>
                                <option value="fiberhome" selected>FIBER HOME</option>
                            </select>
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
                    <br>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/modalBusquedaTecnico.jsp"></jsp:include>
        <jsp:include page="./modals/modalDetalle.jsp"></jsp:include>
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
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js"></script>

    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/gestionTicketsSoporteController.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/gestionTicketsSoporteService.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/gestionTicketsSoporte/jsonGestionTicketsSoporte.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>

    </html>