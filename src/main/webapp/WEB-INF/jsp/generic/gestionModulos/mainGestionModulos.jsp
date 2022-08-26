<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<sec:authentication property="principal" var="userStore" />
<!DOCTYPE html>
<html ng-app="gestionModulosApp">
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
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
        <link href="${pageContext.request.contextPath}/resources/css/generic/gestionModulos/mainGestionModulos.css?v=${sessionScope.versionDepl}" rel="stylesheet" />
        <link href="${pageContext.request.contextPath}/resources/css/plantainterna/generic/navbar.css?v=${sessionScope.versionDepl}" rel="stylesheet" />
    </head>

    <body id="idBody" ng-controller="gestionModulosController">
    	<sec:authorize access="isAuthenticated()">
    		<jsp:include page="../../utilerias/navbar/navbargeneric.jsp"></jsp:include>
			<input id="logPropietario" type="hidden" value="${userStore.idPropietario}" >
			<input id="logUnidadNegocio" type="hidden" value="${userStore.idUnidadNegocio}" >
		</sec:authorize>
        <div class="container">
        	<div class="container-title-header" style="padding: 0 !important;">
                <div class="header-modulo">
                	<div class="row">
                		<div class="col-md-10">
                			<h5 class="title-modulo">Gesti&oacute;n de m&oacute;dulos</h5>
                		</div>
                		<sec:authorize access="!isAuthenticated()">
							<div class="col-md-2" style="text-align: right;">
	                			<a href="javascript:document.getElementById('logout').submit()" class="btn btn-primary btnSalirSinLogin">
			                        <i class="fas fa-sign-out-alt"></i>
			                    </a>
			                    <c:url value="/logout" var="logoutUrl" />
			                    <form id="logout" action="${logoutUrl}" method="S">
			                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			                    </form>
	                		</div>
						</sec:authorize>
                	</div>
                </div>
            </div>
        
            <div class="content-fluid" id="container_gestion_modulos" ng-show="isModulo">
            	<div class="row col-12">
            		<div id="containerTituloVistaModulos" class="col-md-12">
            			<h6 class="title-vista-modulos"><b>Consulta de m&oacute;dulos</b></h6>
            		</div>
            	</div>
            	<div class="row col-12">
	                <div class="form-group col-md-3 input-select">
	                    <label class="label-input" for="selectTipoEquipoAdd">Propietario</label>
	                    <select ng-model="permiso.propietario" class="input-filtro form-control form-control-sm input-modulos" id="moduloPropietario">
	                        <option value="" disabled selected>Seleccione...</option>
	                        <option ng-repeat="prop in listaPropietarios" value="{{prop.id}}">{{prop.nombre}}</option>
	                    </select>
	                </div>
	                <div class="form-group col-md-3 input-select">
	                    <label class="label-input" for="selectTipoEquipoAdd">Unidad de negocio</label>
	                    <select ng-model="permiso.negocio" class="input-filtro form-control form-control-sm input-modulos" id="moduloUnidadNegocio">
	                        <option value="" disabled selected>Seleccione...</option>
	                        <option ng-repeat="unidad in listaUnidadesNegocio" value="{{unidad.id}}">{{unidad.nombre}}</option>
	                    </select>
	                </div>
	                <div class="col-md-2">
	                    <button id="btn-consultar-modulos" type="button" ng-click="consultarModulos()" class="btn btn-sm btn-primary" style="top: 35% !important;">
							<i class="fa fa-search"></i>
						</button>
	                </div>
	                <div class="box-buscador-tabla-modulos col-md-3">
						<div class="input-group input-group-sm content-seach-table">
							<input type="text" id="buscadorTablaModulos" class="form-control form-control-sm buscar-input-operario" ng-model="buscarModulo" placeholder="Buscar m&oacute;dulo">
							<span class="fa fa-search"></span>
						</div>
					</div>
	                <div class="box-nuevo col-md-1">
	                    <div>
	                    	<button id="btnNuevoModulo" class="btn btn-nuevo" ng-click="abrirMdlNuevo()">
	                    		<i class="fa fa-plus"></i>
		                    	<span class="tooltipBtnNuevoModulo">Registrar nuevo m&oacute;dulo</span>
		                    </button>
	                    </div>
	                </div>
	            </div>
                <div class="table-responsive">
                    <table id="modulosTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_table">
                            <tr>
                                <th class="encabezadosTablaModulos">Nombre</th>
                                <th class="encabezadosTablaModulos">Clave</th>
                                <th class="encabezadosTablaModulos">Color</th>
                                <th class="encabezadosTablaModulos">Color hover</th>
                                <th class="encabezadosTablaModulos">Icono</th>
                                <th class="encabezadosTablaModulos" ng-show="!isNuevoModulo && !isEditModulo" style="text-align: center;">Editar</th>
                                <th class="encabezadosTablaModulos" ng-show="!isNuevoModulo && !isEditModulo" style="text-align: center;">Ver</th>
                                <th class="encabezadosTablaModulos" ng-show="!isNuevoModulo && !isEditModulo" style="text-align: center;">Eliminar</th>
                                <th class="encabezadosTablaModulos" ng-show="isNuevoModulo" style="text-align: center;">Cancelar</th>
                                <th class="encabezadosTablaModulos" ng-show="isNuevoModulo" style="text-align: center;">Guardar</th>
                                <th class="encabezadosTablaModulos" ng-show="isNuevoModulo" style="text-align: center;"></th>
                                <th class="encabezadosTablaModulos" ng-show="isEditModulo" style="text-align: center;">Cancelar</th>
                                <th class="encabezadosTablaModulos" ng-show="isEditModulo" style="text-align: center;">Editar</th>
                                <th class="encabezadosTablaModulos" ng-show="isEditModulo" style="text-align: center;"></th>
                            </tr>
                        </thead>
                        <tbody>
                        	<tr id="rowModuloNuevo" ng-show="isNuevoModulo">
                        		<td><input id="nombreModulo" type="text" class="form-control txtNuevoModulo valInputFormulario" /></td>
                        		<td><input id="claveModulo" type="text" class="form-control txtNuevoModulo valInputFormulario" /></td>
                        		<td><input id="colorModulo" type="text" class="form-control txtNuevoModulo valInputFormulario" /></td>
                        		<td><input id="colorHoverModulo" type="text" class="form-control txtNuevoModulo valInputFormulario" /></td>
                        		<td><input id="iconoModulo" type="text" class="form-control txtNuevoModulo valInputFormulario" /></td>
                        		<td>
                        			<span ng-click="cancelarRegistroModulo()" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnCancelarNuevoModulo">
                        				<i class="fa fa-ban" aria-hidden="true"></i>
                        			</span>
                        		</td>
                        		<td>
                        			<span ng-click="guardarNuevoModulo()" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnAgregarNuevoModulo">
                        				<i class="fa fa-check" aria-hidden="true"></i>
                        			</span>
                        		</td>
                        		<td></td>
                        	</tr>
                        	<tr id="rowModuloConsulta{{modulo.id}}" ng-repeat="modulo in listaModulos | filter:buscarModulo track by $index">
                        		<td class="rowConsultaModuloTxt rowConsultaModulo{{modulo.id}}">{{modulo.nombre}}</td>
                        		<td class="rowEditModulo{{modulo.id}}" style="display: none;"><input id="nombreModuloEdit{{modulo.id}}" type="text" class="form-control txtEditModulo valInputFormulario" value="{{modulo.nombre}}" /></td>
                        		<td class="rowConsultaModuloTxt rowConsultaModulo{{modulo.id}}">{{modulo.clave}}</td>
                        		<td class="rowEditModulo{{modulo.id}}" style="display: none;"><input id="claveModuloEdit{{modulo.id}}" type="text" class="form-control txtEditModulo valInputFormulario" value="{{modulo.clave}}" /></td>
                        		<td class="rowConsultaModuloTxt rowConsultaModulo{{modulo.id}}">{{modulo.color}}</td>
                        		<td class="rowEditModulo{{modulo.id}}" style="display: none;"><input id="colorModuloEdit{{modulo.id}}" type="text" class="form-control txtEditModulo valInputFormulario" value="{{modulo.color}}" /></td>
                        		<td class="rowConsultaModuloTxt rowConsultaModulo{{modulo.id}}">{{modulo.colorHover}}</td>
                        		<td class="rowEditModulo{{modulo.id}}" style="display: none;"><input id="colorHoverModuloEdit{{modulo.id}}" type="text" class="form-control txtEditModulo valInputFormulario" value="{{modulo.colorHover}}" /></td>
                        		<td class="rowConsultaModuloTxt rowConsultaModulo{{modulo.id}}">{{modulo.icono}}</td>
                        		<td class="rowEditModulo{{modulo.id}}" style="display: none;"><input id="iconoModuloEdit{{modulo.id}}" type="text" class="form-control txtEditModulo valInputFormulario" value="{{modulo.icono}}" /></td>
                        		<td class="rowConsultaModulo{{modulo.id}}">
                        			<span ng-click="abrirEditarModulo(modulo.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnEditarModulo">
                        				<i class="fa fa-edit" aria-hidden="true"></i>
                        			</span>
                        		</td>
                        		<td class="rowConsultaModulo{{modulo.id}}">
                        			<span ng-click="verDetalle(modulo.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnDetalleModulo">
                        				<i class="fa fa-bars" aria-hidden="true"></i>
                        			</span>
                        		</td>
                        		<td class="rowConsultaModulo{{modulo.id}}">
                        			<span ng-click="eliminarModulo(modulo.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnEliminarModulo">
                        				<i class="fa fa-trash" aria-hidden="true"></i>
                        			</span>
                        		</td>
                        		
                        		<td class="rowEditModulo{{modulo.id}}" style="display: none;">
                        			<span ng-click="cancelarEditModulo(modulo.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnCancelarEditModulo">
                        				<i class="fa fa-ban" aria-hidden="true"></i>
                        			</span>
                        		</td>
                        		<td class="rowEditModulo{{modulo.id}}" style="display: none;">
                        			<span ng-click="modificarModulo(modulo.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnEditModulo">
                        				<i class="fa fa-check" aria-hidden="true"></i>
                        			</span>
                        		</td>
                        		<td class="rowEditModulo{{modulo.id}}" style="display: none;"></td>
                        	</tr>
                        </tbody>
                    </table>
                </div>
                <div class="row" ng-show="!exisModulos">
                	<div class="col-md-12" style="text-align: center;">
                    	<span class="span-no-result">No se encontraron resultados</span>
                    </div>
				</div>
            </div>
            
            <div class="content-fluid" id="container_gestion_modulos_permisos" ng-show="!isModulo">
            	<div class="row col-12">
            		<div id="containerTituloVistaPermisos" class="col-md-8">
            			<h6 class="title-vista-permisos">M&oacute;dulo {{moduloSeleccionado.nombre}} > <b>Permisos</b></h6>
            		</div>
            		<div class="form-group col-md-3">
	                    <div class="input-group input-group-sm content-seach-table-permisos">
							<input type="text" id="buscadorTablaPermisos" class="form-control form-control-sm buscar-input-operario" ng-model="buscarPermiso" placeholder="Buscar permiso">
							<span class="fa fa-search"></span>
						</div>
	                </div>
	                <div class="box-nuevo-permiso col-md-1">
	                	<div class="row">
		                	<div class="col-md-6">
		                		<div>
			                		<button id="btnRegresarVistaModulos" class="btn btn-nuevo-permiso" ng-click="changeVistaModulos()" ng-if="!isModulo">
			                			<i class="fa fa-arrow-left"></i>
			                			<span class="tooltipBtnRegresarVistaModulos">Regresar</span>
			                		</button>
			                	</div>
		                	</div>
		                    <div class="col-md-6">
		                    	<div>
			                    	<button id="btnNuevoPermiso" class="btn btn-nuevo-permiso" ng-click="abrirFormNuevoPermiso()">
			                    		<i class="fa fa-plus"></i>
				                    	<span class="tooltipBtnNuevoPermiso">Registrar nuevo permiso</span>
				                    </button>
			                    </div>
		                    </div>
	                    </div>
	                </div>
	            </div>
	            <div class="row">
            		<div ng-show="exisPermisosModulo" class="col-md-12">
            			<div class="table-responsive">
		                    <table id="accionesTable" class="display table" cellspacing="0" width="100%">
		                        <thead id="thead_table">
		                            <tr>
		                                <th class="encabezadosTablaPermisos">Nombre</th>
		                                <th class="encabezadosTablaPermisos">Clave</th>
		                                <th class="encabezadosTablaPermisos">Color</th>
		                                <th class="encabezadosTablaPermisos">Color hover</th>
		                                <th class="encabezadosTablaPermisos">Icono</th>
		                                <th class="encabezadosTablaPermisos" ng-show="!isNuevoPermiso && !isEditPermiso" style="text-align: center;">Editar</th>
		                                <th class="encabezadosTablaPermisos" ng-show="!isNuevoPermiso && !isEditPermiso" style="text-align: center;">Eliminar</th>
		                                <th class="encabezadosTablaPermisos" ng-show="isNuevoPermiso" style="text-align: center;">Cancelar</th>
		                                <th class="encabezadosTablaPermisos" ng-show="isNuevoPermiso" style="text-align: center;">Guardar</th>
		                                <th class="encabezadosTablaPermisos" ng-show="isEditPermiso" style="text-align: center;">Cancelar</th>
		                                <th class="encabezadosTablaPermisos" ng-show="isEditPermiso" style="text-align: center;">Editar</th>
		                            </tr>
		                        </thead>
		                        <tbody>
		                        	<tr id="rowPermisoNuevo" ng-show="isNuevoPermiso">
		                        		<td><input id="nombrePermiso" type="text" class="form-control txtNuevoPermiso valInputFormulario" /></td>
		                        		<td><input id="clavePermiso" type="text" class="form-control txtNuevoPermiso valInputFormulario" /></td>
		                        		<td><input id="colorPermiso" type="text" class="form-control txtNuevoPermiso valInputFormulario" /></td>
		                        		<td><input id="colorHoverPermiso" type="text" class="form-control txtNuevoPermiso valInputFormulario" /></td>
		                        		<td><input id="iconoPermiso" type="text" class="form-control txtNuevoPermiso valInputFormulario" /></td>
		                        		<td>
		                        			<span ng-click="cancelarRegistroPermiso()" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnCancelarNuevoPermiso">
		                        				<i class="fa fa-ban" aria-hidden="true"></i>
		                        			</span>
		                        		</td>
		                        		<td>
		                        			<span ng-click="guardarNuevoPermiso()" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnAgregarNuevoPermiso">
		                        				<i class="fa fa-check" aria-hidden="true"></i>
		                        			</span>
		                        		</td>
		                        	</tr>
		                        	<tr id="rowPermisoConsulta{{permiso.id}}" ng-repeat="permiso in listaPermisosModulo | filter:buscarPermiso track by $index">
		                        		<td class="rowConsultaPermisoTxt rowConsultaPermiso{{permiso.id}}">{{permiso.nombre}}</td>
		                        		<td class="rowEditPermiso{{permiso.id}}" style="display: none;"><input id="nombrePermisoEdit{{permiso.id}}" type="text" class="form-control txtEditPermiso valInputFormulario" value="{{permiso.nombre}}" /></td>
		                        		<td class="rowConsultaPermisoTxt rowConsultaPermiso{{permiso.id}}">{{permiso.clave}}</td>
		                        		<td class="rowEditPermiso{{permiso.id}}" style="display: none;"><input id="clavePermisoEdit{{permiso.id}}" type="text" class="form-control txtEditPermiso valInputFormulario" value="{{permiso.clave}}" /></td>
		                        		<td class="rowConsultaPermisoTxt rowConsultaPermiso{{permiso.id}}">{{permiso.color}}</td>
		                        		<td class="rowEditPermiso{{permiso.id}}" style="display: none;"><input id="colorPermisoEdit{{permiso.id}}" type="text" class="form-control txtEditPermiso valInputFormulario" value="{{permiso.color}}" /></td>
		                        		<td class="rowConsultaPermisoTxt rowConsultaPermiso{{permiso.id}}">{{permiso.colorHover}}</td>
		                        		<td class="rowEditPermiso{{permiso.id}}" style="display: none;"><input id="colorHoverPermisoEdit{{permiso.id}}" type="text" class="form-control txtEditPermiso valInputFormulario" value="{{permiso.colorHover}}" /></td>
		                        		<td class="rowConsultaPermisoTxt rowConsultaPermiso{{permiso.id}}">{{permiso.icono}}</td>
		                        		<td class="rowEditPermiso{{permiso.id}}" style="display: none;"><input id="iconoPermisoEdit{{permiso.id}}" type="text" class="form-control txtEditPermiso valInputFormulario" value="{{permiso.icono}}" /></td>
                        				<td class="rowConsultaPermiso{{permiso.id}}">
		                        			<span ng-click="abrirEditarPermiso(permiso.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnEditarPermiso">
		                        				<i class="fa fa-edit" aria-hidden="true"></i>
		                        			</span>
		                        		</td>
		                        		<td class="rowConsultaPermiso{{permiso.id}}">
		                        			<span ng-click="eliminarPermiso(permiso.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnEliminarPermiso">
		                        				<i class="fa fa-trash" aria-hidden="true"></i>
		                        			</span>
		                        		</td>
		                        		<td class="rowEditPermiso{{permiso.id}}" style="display: none;">
		                        			<span ng-click="cancelarEditPermiso(permiso.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnCancelarEditPermiso">
		                        				<i class="fa fa-ban" aria-hidden="true"></i>
		                        			</span>
		                        		</td>
		                        		<td class="rowEditPermiso{{permiso.id}}" style="display: none;">
		                        			<span ng-click="modificarPermiso(permiso.id)" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnEditPermiso">
		                        				<i class="fa fa-check" aria-hidden="true"></i>
		                        			</span>
		                        		</td>
		                        	</tr>
		                        </tbody>
		                    </table>
		                </div>
            		</div>
            		<div ng-show="!exisPermisosModulo" class="imagen-no-results">
						<img src="${pageContext.request.contextPath}/resources/img/generic/no-results.png">
						<br>
						<span class="span-no-result">No se encontraron resultados</span>
					</div>
				</div>
            </div>
            <jsp:include page="./modals/modalNuevo.jsp"></jsp:include>
            <jsp:include page="./modals/modalDetalle.jsp"></jsp:include>
        </div>
    </body>
    <!-- LIBRERIAS JS -->
    <script type="text/javascript">let contex_project = "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/resources/libraries/angularjs/js/angular.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jquery/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/selectPicker/js/popper.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/jquery.dataTables.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/dataTable/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/sweetalert/js/sweetalert2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/jstree/jstree.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/mdbootstrap/js/mdb.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/libraries/toastr/js/toastr.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/generic.js?v=${sessionScope.versionDepl}"></script>
    <script src="${pageContext.request.contextPath}/resources/js/generic/handlerError.js?v=${sessionScope.versionDepl}"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/gestionModulos/gestionModulosController.js?v=${sessionScope.versionDepl}" charset="UTF-8"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/generic/gestionModulos/gestionModulosService.js?v=${sessionScope.versionDepl}" charset="UTF-8"></script>
</html>
