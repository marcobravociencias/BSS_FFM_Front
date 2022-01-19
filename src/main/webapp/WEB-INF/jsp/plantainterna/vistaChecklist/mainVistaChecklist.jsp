<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <!DOCTYPE html>
    <html lang="es" ng-app="vistaChecklistApp">

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
        <link href="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/css/mdb.min.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/magnific_popup/magnific-popup.css"
            rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/toastr/css/toastr.min.css"
            rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/vistaChecklist/vistaChecklist.css"
            rel="stylesheet">
    </head>

    <body id="idBody" class="body" ng-controller="vistaChecklistController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <div class="container">
            <div class="container-title-header" style="padding: 0 !important;">
                <div class="header-modulo">
                    <h5 class="title-modulo">Vista Checklist</h5>
                    <h1 class="h6 subtitle-modulo">En este m&oacute;dulo podr&aacute;s realizar la busqueda de las
                        evidencias</h1>
                </div>
            </div>
            <div class="row content-fluid">
                <div class="col-2 columna-filtro">
                    <label for="filtro_fecha_inicio" class="label-filter">Geograf&iacute;a</label>
                    <input readonly placeholder="Geograf&iacute;a" type="text" id="filtro_geografia"
                        class="search-filtro input-filtro form-control form-control-sm"
                        ng-click="abrirModalGeografia()">
                </div>
                <div class="col-2 columna-filtro">
                    <label for="filtro_fecha_inicio" class="label-filter">Fecha inicial</label>
                    <input readonly type="text" id="filtro_fecha_inicio"
                        class="datepicker input-filtro form-control form-control-sm" />
                </div>
                <div class="col-2 columna-filtro">
                    <label for="filtro_fecha_fin" class="label-filter">Fecha final</label>
                    <input readonly type="text" id="filtro_fecha_fin"
                        class="datepicker input-filtro form-control form-control-sm" />
                </div>
                <div class="col-1">
                    <button id="btnBuscar" type="button" class="btn btn-primary btnTotal">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="container-fluid" id="container_checklist">
                <div class="row filter-content">
                    <div class="col-2 offset-10 form-group">
                        <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;"
                            class="search-filtro form-control form-control-sm mt-1" id="searchTextGeneral"><i
                            class="fa fa-search icon-search" style="margin-top: -1.5em;"></i>
                    </div>
                </div>
                <div class="content-fluid" style="margin-top: 0.7em;">
                    <table id="evidenciasTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_evidencias">
                            <tr>
                                <th>OT</th>
                                <th>OS</th>
                                <th>DISTRITO</th>
                                <th>NO. CUENTA</th>
                                <th>CLIENTE</th>
                                <th>DIRECCI&Oacute;N</th>
                                <th>REFERENCIA</th>
                                <th>T&Eacute;CNICO</th>
                                <th>ESTATUS</th>
                                <th>DETALLE</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <jsp:include page="./modals/modalDetalleEvidencia.jsp"></jsp:include>
        <jsp:include page="./modals/modalGeografia.jsp"></jsp:include>
    </body>
    <!-- Scripts libraries -->
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/libraries/popper/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/libraries/fullcalendar/moment.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-ui.js"></script>
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
        src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaChecklist/vistaChecklistJson.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaChecklist/vistaChecklistController.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/plantainterna/vistaChecklist/vistaChecklistService.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>

    </html>