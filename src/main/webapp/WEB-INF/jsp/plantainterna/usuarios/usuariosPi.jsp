<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html ng-app="usuarioApp">
    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>FFM Total play</title>
    
        <!-- LIBRERIAS CSS -->
        <link rel="icon" type="image/png" sizes="192x192" href="${pageContext.request.contextPath}/resources/img/iconsistema/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16"	href="${pageContext.request.contextPath}/resources/img/iconsistema/favicon-16x16.png">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/libraries/bootstrap/css/bootstrap-select.min.css" rel="stylesheet">
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
		<!-- CSS INTERNAS -->
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/usuarios/usuariosPi.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/resources/css/plantainterna/skillsAdms/styleSkillsFeature.css?" rel="stylesheet" />
		
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
    	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    	
    </head>
    <body id="idBody" ng-controller="usuarioController" style="display: none;">
    	<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>    
        <br>
        <div class="container" id="container_usuarios_alta_consulta">
            <div class="row">
                <div class="col-md-12">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="opcion-consulta-tab" data-toggle="tab" href="#opcion-consulta" role="tab"
                                aria-controls="opcion-consulta" aria-selected="true">Consultar usuarios</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="opcion-alta-tab" data-toggle="tab" href="#opcion-alta" role="tab"
                                aria-controls="opcion-alta" aria-selected="false">Alta usuarios</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="opcion-consulta" role="tabpanel" aria-labelledby="opcion-consulta-tab">
                            <!--h3 class="text-center">Consulta Usuarios</h3-->
                            <div class="row">
                                <div class="col-md-3 column-style-usuarios columna-filtro-usuarios">
									<label class="span-consulta"><i class="fa fa-building"></i> Compa&ntilde;&iacute;as</label>
				                    <div class="dropdown">
				                    	<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="SELECCIONE..." type="text" id="txtCompania" class="input-filtro-status form-control" />
				                        <ul class="dropdown-menu drop-down-filters scrollGeneralSelectsConsulta">      
				                        	<li style="text-align: center;">
				                            	<button ng-click="seleccionTodos(listaCompanias, true, 'companias')" id="todo_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
				                                <button ng-click="seleccionTodos(listaCompanias, false, 'companias')" id="ninguno_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
											</li>     
				                            <li class="elemento_menu dropdown-divider"></li>
				                            <li ng-repeat="compania in listaCompanias" class="element-menu-filter">
				                            	<label class="dropdown-item form-check-inputfiltro">
				                                	<input id="" ng-change="companiaSeleccion()" class="form-check-input" type="checkbox" ng-model="compania.checkedOpcion" ng-checked="compania.checkedOpcion" />
				                                    <span for="" class="dropdown-item item-text-filtro" ng-bind="compania.descripcion"></span>
												</label>
											</li>
										</ul>
									</div>
								</div>
                                <div class="col-md-3 column-style-usuarios columna-filtro-usuarios">
									<label class="span-consulta"><i class="fas fa-address-card"></i> Puesto</label>
				                    <div class="dropdown">
				                    	<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="SELECCIONE..." type="text" id="txtPuesto" class="input-filtro-status form-control" />
				                        <ul class="dropdown-menu drop-down-filters scrollGeneralSelectsConsulta">      
				                        	<li style="text-align: center;">
				                            	<button ng-click="seleccionTodos(listaPuestos, true, 'puestos')" id="todo_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
				                                <button ng-click="seleccionTodos(listaPuestos, false, 'puestos')" id="ninguno_filtro" type="button" class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
											</li>     
				                            <li class="elemento_menu dropdown-divider"></li>
				                            <li ng-repeat="puesto in listaPuestos" class="element-menu-filter">
				                            	<label class="dropdown-item form-check-inputfiltro">
				                                	<input id="" ng-change="puestoSeleccion()" class="form-check-input" type="checkbox" ng-model="puesto.checkedOpcion" ng-checked="puesto.checkedOpcion" />
				                                    <span for="" class="dropdown-item item-text-filtro" ng-bind="puesto.descripcion"></span>
												</label>
											</li>
										</ul>
									</div>
								</div>
                                <div class="col-md-3 column-style-usuarios columna-filtro-usuarios">
                                    <label class="span-consulta"><i class="fas fa-map-marked"></i> Geograf&iacute;a</label>
                                    <div class="dropdown">
                                    	<input id="txtGeografiasConsulta" type="text" class="input-filtro-status form-control" ng-click="abrirModalGeografiaConsulta()" placeholder="NO HAY SELECCI&Oacute;N" readonly autocomplete="off">
                                	</div>
                                </div>
                                <div class="col-md-2">
                                    <button  ng-click="consultaUsuariosPorGeoCompPuestos()" id="btn-consultar-disponibilidad" type="button" class="btn btn-sm btn-primary" ng-click="consultaDisponibilidad()" style="top: 46% !important;">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
				            <div class="row">
								<div class="columna-principal-users col-md-12">
									<div class="table-responsive">
				                    	<table class="table" id="table-usuario-pi">
				                        	<thead>
				                            	<tr>
				                                	<th class="txtTablaConsultaJustificado">N&uacute;m. empleado</th>
				                                    <th class="txtTablaConsultaJustificado">Usuario FFM</th>
				                                    <th class="txtTablaConsultaJustificado">Nombre</th>
				                                    <th class="txtTablaConsultaJustificado">Tipo usuario</th>
				                                    <th class="txtTablaConsultaJustificado">Ciudad</th>
				                                    <th class="txtTablaConsultaJustificado">Uni. negocio</th>
				                                    <th class="txtTablaConsultaCentrado">Editar</th>
				                                    <th class="txtTablaConsultaCentrado">Eliminar</th>
												</tr>
											</thead>
				                         </table>
									</div>
								</div>
							</div>
                        </div>
                        <div class="tab-pane fade" id="opcion-alta" role="tabpanel" aria-labelledby="opcion-alta-tab">
                            <!--h3 class="text-center">Alta Usuarios</h3>
                            <hr/-->
                            <div class="row row-datos-confirmacion">
                                <div class="col-12">
                                    <ul class="nav nav-pills mb-3" id="pills-tab-crearuser" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" id="pills-informacion-tab" data-toggle="pill" href="#pills-informacion" role="tab" aria-controls="pills-informacion" aria-selected="true">Informaci&oacute;n</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-intervencion-tab" data-toggle="pill" href="#pills-intervencion" role="tab" aria-controls="pills-intervencion" aria-selected="false">Intervenciones</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-arbol-tab" data-toggle="pill" href="#pills-arbol" role="tab" aria-controls="pills-arbol" aria-selected="false">&Aacute;rbol</a>
                                        </li>
                                        <li id="pestaniaPermisos" class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-accesos-tab" data-toggle="pill" href="#pills-accesos" ng-show="mostrarAccesos" role="tab" aria-controls="pills-accesos" aria-selected="false">Accesos</a>
                                        </li>
                                        <li id="pestaniaTecnico" class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-tecnico-tab" ng-click="revisionTecnicosDespachos()" data-toggle="pill" href="#pills-tecnico" ng-show="mostrarTecnicos" role="tab" aria-controls="pills-tecnico" aria-selected="false">T&eacute;cnicos</a>
                                        </li>
                                        <li id="pestaniaDespacho" class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-despacho-tab" ng-click="revisionTecnicosDespachos()" data-toggle="pill" href="#pills-despacho" ng-show="mostrarDespacho" role="tab" aria-controls="pills-despacho" aria-selected="false">Despachos</a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" id="pills-confirmar-tab" ng-click="cargarInfoConfirmacionRegistro()" data-toggle="pill" ng-click="mostrarConfirmacionUsuario()" href="#pills-confirmar" role="tab" aria-controls="pills-confirmar" aria-selected="false">Confirmar Usuario</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-informacion" role="tabpanel" aria-labelledby="pills-informacion-tab">
                                            <jsp:include page="./content/informacion.jsp"></jsp:include> 
                                        </div>
                                        <div class="tab-pane fade" id="pills-intervencion" role="tabpanel" aria-labelledby="pills-intervencion-tab">
                                            <jsp:include page="./content/intervenciones.jsp"></jsp:include>
                                        </div>
                                        <div class="tab-pane fade" id="pills-arbol" role="tabpanel" aria-labelledby="pills-arbol-tab">
                                            <jsp:include page="./content/arbol.jsp"></jsp:include>
                                        </div>
                                        <div class="tab-pane fade show" id="pills-accesos" role="tabpanel" aria-labelledby="pills-accesos-tab">
                                            <jsp:include page="./content/accesos.jsp"></jsp:include>
                                        </div>
                                        <div class="tab-pane fade" id="pills-tecnico" role="tabpanel" aria-labelledby="pills-tecnico-tab">
                                            <jsp:include page="./content/tecnico.jsp"></jsp:include>
                                        </div>
                                        <div class="tab-pane fade" id="pills-despacho" role="tabpanel" aria-labelledby="pills-despacho-tab">
                                            <jsp:include page="./content/despacho.jsp"></jsp:include>
                                        </div>
                                        <div class="tab-pane fade" id="pills-confirmar" role="tabpanel" aria-labelledby="pills-confirmar-tab">
                                            <jsp:include page="./content/confirmacion.jsp"></jsp:include>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        <jsp:include page="./modal/modalEdicion.jsp"></jsp:include>
        <jsp:include page="./modal/modalArbolGeografia.jsp"></jsp:include>
    </body>

    <!-- LIBRERIAS JS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/bootstrap-select.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/i18n/defaults-es_ES.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker_1.9.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/datePicker/js/bootstrap-datepicker.es.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.min.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/fullcalendaremp/lib/moment.es.js" ></script>
    
    <!-- ARCHIVOS JS INTERNOS -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/generic.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/usuarios/usuariosPIController.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/usuarios/usuariosEditarController.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/usuarios/usuarioPIService.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plantainterna/usuarios/jsonResult.js"></script>
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js"></script>
    

</html>