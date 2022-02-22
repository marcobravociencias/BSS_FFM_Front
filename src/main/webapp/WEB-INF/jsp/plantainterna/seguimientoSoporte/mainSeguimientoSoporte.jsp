<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="seguimientoSoporteApp">

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
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/seguimientoSoporte/mainSeguimientoSoporte.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
        <link
            href="${pageContext.request.contextPath}/resources/css/plantainterna/seguimientoSoporte/mainChatter.css?v=${sessionScope.versionDepl}"
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

    <body id="idBody" class="body" ng-controller="seguimientoSoporteController">

        <div style="display: none;" class="container-chatter-ffm" >
            <div class="content-mensaje-principal">
                <div class="content-icons-mensaje-principal">
                        <i class="icon-accion-principal-accion fas fa-reply"></i>
                        <i class="icon-accion-principal-accion fas fa-times"></i>
                        <!--div class="icon-responder-principal">
                        </div>
                         <div class="icon-eliminar-principal">                    </div-->

                </div>
                <div class="content-mensaje-principal-body">
                    <div class="content-foto-imagen-user">
                        <img class="imagen-mensaje-principal" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNLXMjRwxKb32_iBLR5ouRYFiu0DNjYNR_xg&usqp=CAU"  alt="">
                    </div>  
                    <div class="content-text-principal">
                        <h4 class="mensaje-top-principal">Hector Santamaria
                            <span class="hora-mensaje-principal"> <span class="dot-hora-mensaje-principal"></span>11/02/2022 05:21 PM</span>

                        </h4>
                        <h5 class="mensaje-bottom-principal">Contenido del mensaje ejemplo- texto</h5> 
                    </div>
                </div>
                <div class="content-principal-file">
                    <img  class="principal-file" src="https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen.jpg"  alt="">
                    <div class="principal-text">
                        <b class="text-nombre-archivo"> nombre archivo.doc</b>
                        <b class="text-nombre-archivo-descarga"> descargar</b>
                    </div>
                </div>
            </div>
            <div class="content-mensaje-principal">
                <div class="content-icons-mensaje-principal">
                        <i class="icon-accion-principal-accion fas fa-reply"></i>
                        <i class="icon-accion-principal-accion fas fa-times"></i>
                        <!--div class="icon-responder-principal">
                        </div>
                         <div class="icon-eliminar-principal">                    </div-->

                </div>
                <div class="content-mensaje-principal-body">
                    <div class="content-foto-imagen-user">
                        <img class="imagen-mensaje-principal" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNLXMjRwxKb32_iBLR5ouRYFiu0DNjYNR_xg&usqp=CAU"  alt="">
                    </div>  
                    <div class="content-text-principal">
                        <h4 class="mensaje-top-principal">Hector Santamaria
                            <span class="hora-mensaje-principal"> <span class="dot-hora-mensaje-principal"></span>11/02/2022 05:21 PM</span>
                        </h4>
                        <h5 class="mensaje-bottom-principal">Contenido del mensaje ejemplo- texto</h5> 
                    </div>
                </div>
                <div class="content-principal-file">
                    <img  class="principal-file" src="https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen.jpg"  alt="">
                    <div class="principal-text">
                        <b class="text-nombre-archivo"> nombre archivo.doc</b>
                        <b class="text-nombre-archivo-descarga"> descargar</b>
                    </div>
                </div>
            </div>
            <div class="content-mensaje-icons">
                <textarea class="archivo-text-comentario" rows="3" >
                    At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                </textarea>
                <div class="icons-buttons-agregar-comment">
                    <i class="icono-accion-comentario icon-adjuntar fas fa-images"></i>
                    <i class="icono-accion-comentario icon-adjuntar fas fa-paperclip"></i>
                    <button class="btn enviar-comentario">
                        <i class="fas fa-paper-plane" style=" margin-right: .5em;"></i>
                        Enviar
                    </button>
                </div>
            </div>
        </div>
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container">
            <div class="container container-title-header" style="padding: 0 !important;">
                <div class="header-modulo">
                    <h5 class="title-modulo">Seguimiento Tickets</h5>
                    <h1 class="h6 subtitle-modulo"></h1>
                </div>
            </div>
            <div class="form-content">
                <div class="row md-form" id="filtros_config">
                    <div class="col-2 columna-filtro-ind">
                        <label for="filtro_fecha_inicio" class="label-filter">Fecha inicial</label>
                        <input readonly type="text" id="filtro_fecha_inicio"
                            class="datepicker input-filtro-seguimiento form-control form-control-sm" />
                    </div>
                    <div class="col-2 columna-filtro-ind">
                        <label for="filtro_fecha_fin" class="label-filter">Fecha final</label>
                        <input readonly type="text" id="filtro_fecha_fin"
                            class="datepicker input-filtro-seguimiento form-control form-control-sm" />
                    </div>
                    <div class="col-1">
                        <button id="btn_buscar" type="button"
                            class="btn btn-sm btn-primary waves-effect waves-light btnSeguimiento"
                            ng-click="consultaSeguimiento()">
                            <i class="fa fa-search"></i>
                    </div>
                    <div class="col-1 offset-1 user-info-content">
                        <span>Entrada</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaEntrada ? catalogoEstatusUsuarios.infoHorasUser.horaEntrada : 'Sin datos'}}</span>  
                    </div>
                    <div class="col-1 user-info-content">
                        <span>S/comida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaSalidaComida ? catalogoEstatusUsuarios.infoHorasUser.horaSalidaComida : 'Sin datos'}}</span>  
                    </div>
                    <div class="col-1 user-info-content">
                        <span>LL/comida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaLLegadaComida ? catalogoEstatusUsuarios.infoHorasUser.horaLLegadaComida : 'Sin datos'}}</span>  
                    </div>
                    <div class="col-1 user-info-content">
                        <span>Salida</span></br>
                        <span class="info">{{catalogoEstatusUsuarios.infoHorasUser.horaSalida ? catalogoEstatusUsuarios.infoHorasUser.horaSalida : 'Sin datos'}}</span>  
                    </div>
                    <div class="col-2" style="margin-top: 2.3em;">
                        <li class="nav-item dropdown form-control form-control-sm input-filtro-seguimiento" id="estatusDropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="otros-option-navbar" role="button"
                                data-mdb-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-circle" style="color: {{catalogoEstatusUsuarios.infoHorasUser.ultimoEstatus.split('-')[1]}} ;"></i>
                                {{catalogoEstatusUsuarios.infoHorasUser.ultimoEstatus.split('-')[0]}}
                            </a>
                            <!-- Dropdown menu -->
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <a class="dropdown-item" ng-repeat="estatus in catalogoEstatusUsuarios.catalogoEstatusUsuarios" ng-click="changeEstatus(estatus.id)">
                                        <i class="fas fa-circle" style="color: {{estatus.descripcion.split('-')[1]}} ;"></i>
                                        {{estatus.descripcion.split('-')[0]}}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
            <div class="container-fluid" id="container_seguimiento" ng-show="isBusquedaGeneral">
                <div class="row filter-content">
                    <div class="col-2 offset-10 form-group" style="margin-bottom: 0; margin-top: .5em;">
                        <input placeholder="Buscar" type="text" autocomplete="off"
                            class="search-filtro form-control form-control-sm mt-0" id="searchTextGeneral"><i
                            class="fa fa-search icon-search"></i>
                    </div>
                </div>
                <div class="content-fluid" style="margin-top: 0.7em;">
                    <table id="seguimientoTable" class="display table " cellspacing="0" width="100%">
                        <thead id="thead_seguimiento">
                            <tr>
                                <th>Conexi&oacute;n</th>
                                <th>Nombre</th>
                                <th>Abierto</th>
                                <th>Cerrado</th>
                                <th>Escalado</th>
                                <th>Entrada</th>
                                <th>Comida</th>
                                <th>Salida</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="container-fluid" id="container_ticket" ng-show="!isBusquedaGeneral">
                <div class="row filter-content">
                    <div class="col-1" style="margin-bottom: 0; margin-top: .5em;">
                        <i class="fas fa-arrow-circle-left icon-back" ng-click="backGeneral()"></i>
                    </div>
                    <div class="col-2 offset-9 form-group" style="margin-bottom: 0; margin-top: .5em;">
                        <input placeholder="Buscar" type="text" autocomplete="off"
                            class="search-filtro form-control form-control-sm mt-0" id="searchTextTicket"><i
                            class="fa fa-search icon-search"></i>
                    </div>
                </div>
                <div class="content-fluid" style="margin-top: 0.7em;">
                    <table id="ticketTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_ticket">
                            <tr>
                                <th>OT</th>
                                <th>Ticket</th>
                                <th>OS</th>
                                <th>Fecha creaci&oacute;n</th>
                                <th>Tarea</th>
                                <th>H/A Asignaci&oacute;n</th>
                                <th>Estatus</th>
                                <th>Escalado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
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
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/seguimientoSoporteController.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/seguimientoSoporteService.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/plantainterna/seguimientoSoporte/jsonTemp.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>

    </html>