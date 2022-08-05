<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <!DOCTYPE html>
    <html ng-app="gestionModulosApp">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
        <!-- LIBRERIAS CSS -->
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
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css"
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
        <!-- CSS INTERNAS -->
        <link
            href="${pageContext.request.contextPath}/resources/css/generic/gestionModulos/mainGestionModulos.css?v=${sessionScope.versionDepl}"
            rel="stylesheet">
    </head>

    <body id="idBody" ng-controller="gestionModulosController">
        <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
        <header class="header-navbar-p">
            <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-menu-generic"></nav>
        </header>
        <div class="container">
            <div class="row col-12">
                <div class="form-group col-md-3 input-select">
                    <label class="label-input" for="selectTipoEquipoAdd">Propietario</label>
                    <select ng-model="permiso.propietario" class="input-filtro form-control form-control-sm input-modulos"
                        id="permisoPropietario">
                        <option value="" disabled selected>Seleccione ...</option>
                        <option value="1">M&oacute;dulo</option>
                        <option value="2">Permiso</option>
                    </select>
                </div>
                <div class="form-group col-md-3 input-select">
                    <label class="label-input" for="selectTipoEquipoAdd">Unidad negocio</label>
                    <select ng-model="permiso.negocio" class="input-filtro form-control form-control-sm input-modulos"
                        id="permisoNegocio">
                        <option value="" disabled selected>Seleccione ...</option>
                        <option value="1">Test</option>
                        <option value="2">Test2</option>
                    </select>
                </div>
                <div class="box-nuevo col-md-6 form-group">
                    <button class="btn btn-nuevo" ng-click="changeModulos()" ng-if="!isModulo"><i class="fa fa-arrow-left"></i></button>
                    <button class="btn btn-nuevo" ng-click="abrirMdlNuevo()"><i class="fa fa-plus"></i></button>
                </div>
            </div>
           
            <div class="content-fluid" ng-if="isModulo">
                <div class="table-responsive">
                    <table id="modulosTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_table">
                            <tr>
                                <th>Nombre</th>
                                <th>Clave</th>
                                <th>Propietario</th>
                                <th>Unidad Negocio</th>
                                <th>Fecha actualizaci&oacute;n</th>
                                <th>Activo</th>
                                <th style="text-align: center;">Editar</th>
                                <th style="text-align: center;">Ver</th>
                                <th style="text-align: center;">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td><span class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btn-default"><i class="fa fa-edit" aria-hidden="true"></i></span></td>
                                <td><span onclick="verDetalle()" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btn-default"><i class="fa fa-bars" aria-hidden="true"></i></span></td>
                                <td><span class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btn-delete"><i class="fa fa-trash" aria-hidden="true"></i></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="content-fluid" ng-if="!isModulo">
                <div class="table-responsive">
                    <table id="accionesTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_table">
                            <tr>
                                <th>Nombre</th>
                                <th>Clave</th>
                                <th>Propietario</th>
                                <th>Unidad Negocio</th>
                                <th>Fecha actualizaci&oacute;n</th>
                                <th>Activo</th>
                                <th style="text-align: center;">Editar</th>
                                <th style="text-align: center;">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                                <td><span class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btn-default"><i class="fa fa-edit" aria-hidden="true"></i></span></td>
                                <td><span class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btn-delete"><i class="fa fa-trash" aria-hidden="true"></i></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <jsp:include page="./modals/modalNuevo.jsp"></jsp:include>
            <jsp:include page="./modals/modalDetalle.jsp"></jsp:include>
        </div>
    </body>
    <!-- LIBRERIAS JS -->
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script
        src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/generic/gestionModulos/gestionModulosController.js?v=${sessionScope.versionDepl}"
        charset="UTF-8"></script>
    <script type="text/javascript"
        src="${pageContext.request.contextPath}/resources/js/generic/gestionModulos/gestionModulosService.js?v=${sessionScope.versionDepl}"
        charset="UTF-8"></script>

    </html>