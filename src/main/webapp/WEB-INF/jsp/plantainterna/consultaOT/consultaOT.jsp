<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="es" ng-app="consultaOTApp">

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
    <link href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/styleConsultaOT.css"
        rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/jquery.dataTables.css"
        rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/dataTable/css/dataTables.bootstrap4.min.css"
        rel="stylesheet">
    <link href="${pageContext.request.contextPath}/resources/libraries/font-awesome/css/font-awesome.min.css"
        rel="stylesheet">
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
    <link href="${pageContext.request.contextPath}/resources/css/plantainterna/consultaOT/timeLine.css"
        rel="stylesheet" />
</head>

<body ng-controller="consultaOTController" class="body">
    <jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
    <div class="container container-title-header">
		<div class="header-modulo">
			<h5 class="title-modulo">Consulta ordenes de trabajo</h5>
			<h1 class="h6 subtitle-modulo">En este m&oacute;dulo podr&aacute;s realizar la busqueda de las ordenes de trabajo</h1>
		</div>
	</div>
    <div  class="container-fluid container-filtros-consultaot">
        <div class="content-fluid">
            <div class="row md-form" id="filtros_config">
                <div class="col-2 column-style-consulta">
                    <label for="idot" class="label-filter">OT</label>
                    <input type="text" id="idot" placeholder="Ej: 65434"
                    class="form-control input-filtro-consultaOT form-control-sm">
                </div>
                <div class="col-2 column-style-consulta">
                    <label for="idos" class="label-filter">OS</label>
                    <input type="text" id="idos" placeholder="Ej: 23214"
                    class="form-control input-filtro-consultaOT form-control-sm">
                </div>
                <div class="col-2 column-style-consulta">
                    <label for="cuenta" class="label-filter">Cuenta</label>
                    <input type="text" id="cuenta" placeholder="Ej: 0093484233"
                    class="form-control input-filtro-consultaOT form-control-sm">
                </div>
                <div class="col-2 column-style-consulta columna-filtro-ind">
                    <label for="filtro-estatus-substatus" class="label-filter">Estatus</label>
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text" id="filtro-estatus-substatus" class="input-filtro-consultaOT form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">      
                            <li style="text-align: center;">
                                <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,true)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="seleccionTodosEstatus(filtrosGeneral.estatusdisponibles,false)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                            </li>     
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtroE in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                <label  class="dropdown-item form-check-inputfiltro">
                                    <input ng-click=checkFiltroEstatus(filtroE) id="filtrotext-{{filtroE.id}}" class="form-check-input" type="checkbox" ng-model="filtroE.checkedOpcion" ng-checked="filtroE.checkedOpcion"  />
                                    <span  for="filtrotext-{{filtroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtroE.nombre"></span>
                                </label>
                                 <ul  class="dropdown-menu">                     
                                    <li  ng-repeat="subfiltroE in filtroE.children" class="element-menu-filter">
                                        <label  class="dropdown-item form-check-inputfiltro">
                                            <input ng-click=checkFiltroEstatus(subfiltroE) id="subfiltrotext-{{subfiltroE.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroE.checkedOpcion" ng-checked="subfiltroE.checkedOpcion"    />
                                            <span  for="subfiltrotext-{{subfiltroE.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroE.nombre"></span>
                                        </label>
                                        <ul  class="dropdown-menu">                     
                                            <li  ng-repeat="subfiltroJ in subfiltroE.children" class="element-menu-filter">
                                                <label  class="dropdown-item form-check-inputfiltro">
                                                    <input ng-click=checkFiltroEstatus(subfiltroJ) id="subfiltrotext-{{subfiltroJ.id}}" class="form-check-input" type="checkbox" ng-model="subfiltroJ.checkedOpcion" ng-checked="subfiltroJ.checkedOpcion"    />
                                                    <span  for="subfiltrotext-{{subfiltroJ.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltroJ.nombre"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                     </div>
                </div>
                <div class="col-2 column-style-consulta columna-filtro-ind">
                    <label for="filtro-intervencion" class="label-filter">Intervenci&oacute;n</label>
                    <div class="dropdown">
                        <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text" id="filtro-intervencion" class="input-filtro-consultaOT form-control form-control-sm" />
                        <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
                            <li style="text-align: center;">
                                <button ng-click="seleccionarTodos(filtrosGeneral.tipoOrdenes)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                <button ng-click="deseleccionarTodos(filtrosGeneral.tipoOrdenes)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                            </li>     
                            <li class="elemento_menu dropdown-divider"></li>
                            <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"  class="element-menu-filter">
                                <label  class="dropdown-item form-check-inputfiltro">
                                    <input ng-click=setCheckFiltroGeneric(filtro) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
                                    <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                </label>
                                 <ul  class="dropdown-menu">                     
                                    <li  ng-repeat="subfiltro in filtro.children" class="element-menu-filter">
                                        <label  class="dropdown-item form-check-inputfiltro">
                                            <input ng-click=setCheckSubFiltroGeneric(subfiltro,filtro) id="subfiltrotext-{{subfiltro.id}}" class="form-check-input" type="checkbox" ng-model="subfiltro.checkedOpcion" ng-checked="subfiltro.checkedOpcion"    />
                                            <span  for="subfiltrotext-{{subfiltro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltro.nombre"></span>
                                        </label>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                     </div>
                </div>
                    <div class="col-2 column-style-consulta columna-filtro-ind">
                        <label for="cluster" class="label-filter">Geograf&iacute;a</label>
                        <input readonly placeholder="Seleccione..." type="text" id="cluster"
                        class="input-filtro-consultaOT form-control form-control-sm">
                    </div>
                    <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                        <label for="filtro_fecha_inicio_consultaOt" class="label-filter">Fecha inicial</label>
                        <input readonly type="text" id="filtro_fecha_inicio_consultaOt"
                        class="datepicker input-filtro-consultaOT form-control form-control-sm"
                        style="width: 100px;" />
                    </div>
                    <div class="col-2 columna-filtro-ind" style="width: 110px; padding-right: 0px !important;">
                        <label for="filtro_fecha_fin_consultaOt" class="label-filter">Fecha final</label>
                        <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_consultaOt"
                        class="datepicker input-filtro-consultaOT form-control form-control-sm"
                        style="width: 100px;" />
                    </div>
                    <div class="col-1 div-btn-busqueda" style="width: 85px;">
                        <button id="btn_consultar_ordenes" type="button"
                        class="btn btn-sm  btn-primary  waves-effect waves-light"
                        ng-click="consultaOT()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid contenedor-consultaOT">
        <div class="content-fluid">
            <table id="otTable" class="display table table-hover " cellspacing="0" width="100%">
                <thead id="thead_consultaOT">
                    <tr>
                        <th>OT</th>
                        <!-- <th>OS</th> -->
                        <th>CLIENTE</th>
                        <th>CUENTA</th>
                        <!-- <th>TICKET</th> -->
                        <th>CIUDAD</th>
                        <!-- <th>DISTRITO</th>
                        <th>CREACION</th> -->
                        <th>FECHA AGENDA</th>
                        <!-- <th>TURNO</th> -->
                        <th>MOTIVO</th>
                        <!-- <th>OPERARIO</th> -->
                        <th>STATUS</th>
                        <th>ESTADO</th>
                        <!-- <th>USUARIO CREA</th> -->
                        <!-- <th><i class="fa fa-wrench" id="herramienta"></i></th>
                        <th><i class="fa fa-picture-o" id="muestra_IMG"></i></th> -->
                        <th><i class="fa fa-bars" id="modalDetalleOT"></i></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

    <jsp:include page="modals/modalCluster.jsp"></jsp:include>
    <jsp:include page="modals/modalImagenEvidencia.jsp"></jsp:include>
    <jsp:include page="modals/modalMaterialOt.jsp"></jsp:include>
    <jsp:include page="modals/modalDetalleOt.jsp"></jsp:include>
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
<script src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/magnific_popup/jquery.magnific-popup.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
<!-- Fin -->

<script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/consultaOT/jsonConsultaOt.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/consultaOT/consultaOTController.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/plantainterna/consultaOT/consultaOTService.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/genericService.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>

</html>
