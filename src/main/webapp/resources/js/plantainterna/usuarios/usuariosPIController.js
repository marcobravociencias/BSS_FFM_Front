var app = angular.module('usuarioApp', []);
var detalleTable;

app.controller('usuarioController', ['$scope', '$q', 'usuarioPIService', '$filter', function ($scope, $q, usuarioPIService, $filter) {
	
	app.editarUsuarioController($scope,usuarioPIService,$q);
	//ELEMENTOS PARA CONSULTA
	let tablaUsuarios;
	$scope.listaCompanias = [];
    $scope.listaPuestos = [];
    $scope.listaGeografias = [];
	$scope.listaGeografiasRespaldo = [];
	$scope.listaPermisosRespaldo = [];
    $scope.listaIdGeografias = [];
    $scope.elementosPorPaginaTablaConsulta = 10;
    $scope.paginaTablaConsulta = 1;
    $scope.filtroGeografias;
    $scope.filtroIntervenciones;
    //ELEMENTOS PARA REGISTRO
    let acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    let geografiasNivelCiudad = [];
    var existePadre = false;
    $scope.confirmacionRegistro = {};
    $scope.informacionRegistro = {};
    $scope.listaPermisos = [];
    $scope.listaIntervenciones = [];
    $scope.listaIntervencionesRespaldo = [];
    $scope.listaIntervencionesSeleccionadas = [];
    $scope.listaGeografiasSeleccionadas = [];
    $scope.listaCiudadNatalRegistro = [];
    $scope.listaPermisosSeleccionados = [];
    $scope.listaTecnicos = [];
    $scope.listaDespachos = [];
    $scope.listaIngenieros = [];
    $scope.listaSupervisoresCentralizados = [];
    $scope.listaCouchsDespachos = [];
    $scope.listaSupervisores = [];
    $scope.listaIdsGeografiaCiudadNatalRegistro = [];
    $scope.informacionRegistro.asignacionAutomatica = 0;
    $scope.mostrarAccesos = false;
    $scope.mostrarTecnicos = false;
    $scope.mostrarDespacho = false;
    $scope.validarTamDatos = true;
    $scope.isTecnico = false;
    $scope.idPuestoTecnico = null;
    $scope.idPuestoDespacho = null;
    $scope.idPuestoIngeniero = null;
    $scope.idPuestoSupervisorCentralizado = null;
    $scope.idPuestoCouchDespacho = null;
    $scope.idPuestoSupervisor = null;
    $scope.fileFotoUsuario = null;
	$scope.respaldoIntervenciones = [];
	
//	CONFIGURACIÓN DE TABS
	$scope.tabInformacion = true;
	$scope.tabIntervenciones = false;
	$scope.tabArbol = false;
	$scope.tabAccesos = false;
	$scope.tabTecnicos = false;
	$scope.tabDespachos = false;
	$scope.tabPerfiles = false;
	$scope.tabIngenieros = false;
	$scope.tabSupervisorCentralizado = false;
	$scope.tabCouchDespacho = false;
	$scope.tabSupervisor = false;
	$scope.tabConfirmacion = false;
	
	$scope.tabInformacionVW_ASIG_AUTOMATICA = true;
	$scope.tabInformacionVW_CUADRILLA = true;
	$scope.tabInformacionVL_RFC = true;
	$scope.tabInformacionVL_CURP = true;
	$scope.tabArbol_LB_N1 = "";
	$scope.tabArbol_LB_N2 = "";
	$scope.tabArbol_NV_GEOGRAFIA;
	$scope.tabIntervenciones_NV_INTERVENCIONES;
	$scope.tabTecnicosVL_MULTISELECCION = true;
	$scope.tabDespachosVL_MULTISELECCION = true;
	$scope.tabIngenierosVL_MULTISELECCION = true;
	$scope.tabSupervisorCentralizadoVL_MULTISELECCION = true;
	$scope.tabCouchDespachoVL_MULTISELECCION = true;
	$scope.tabSupervisorVL_MULTISELECCION = true;
	$scope.bucketIdImg = ""; 
	
	$scope.catalogoGeografias = [];
	$scope.geoSelect = [];
	$scope.catalogoIntervenciones = [];
	$scope.intervencionSelect = [];
	
	//CONFIGURACIÓN PERMISOS
	$scope.permisosUsuariosAcciones = [];
	$scope.configPermisoAccionConsultaUsuarios = false;
	$scope.configPermisoAccionCreaUsuarios = false;
	$scope.configPermisoAccionEditaUsuarios = false;
	$scope.configPermisoAccionEliminaUsuarios = false;
	
	//VALIDACIÓN DE CONTRASEÑAS
	$scope.expresionesRegulares = /^(?=.*[a-z])\S{9,20}$/;
	$scope.numeroValPass = /(?=.*\d)/;
	$scope.permitidos = /(?=.*[\u0040]|[\u0024]|[\u0021]|[\u0025]|[\u002A]|[\u0023]|[\u003F]|[\u0026])/;
	$scope.negados = /(?=.*[\u0020]|[\u0022]|[\u0027]|[\u0028]|[\u0029]|[\u002B]|[\u002C]|[\u002D]|[\u002E]|[\u002F]|[\u003A]|[\u003B]|[\u003C]|[\u003D]|[\u003E]|[\u007B-\u00FF])/;
	$scope.txtExpresionValPassword = "";
	
	//VALIDACIÓN USUARIO EXISTENTE
	$scope.existeUsuarioValidacion = false;
	
	
    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });
    
    //MÉTODO QUE INICIA EL MÓDULO Y SUS VISTAS DE USUARIOS
    $scope.iniciarModuloUsuarios = function() {
    	let paramsConfiguracionDespacho ={
				moduloAccionesUsuario: 'moduloUsuarios'
	    };

    	$q.all([
    		usuarioPIService.consultarConfiguracionDespachoDespacho(paramsConfiguracionDespacho),
    		usuarioPIService.consultaCompanias(),
    		usuarioPIService.consultaPuestos(),
    		usuarioPIService.consultaPermisos(),
    		usuarioPIService.consultaGeografias(),
    		usuarioPIService.consultaIntervenciones(),
    		usuarioPIService.consultaPerfiles(),
    		usuarioPIService.consultarCuadrillasGestionUsuarios()
        ]).then(function(results) {
        	
        	var listaResultCuadrillas = results[7].data.result.tipoCuadrillas;
        	$scope.listaCuadrillas = [];
        	angular.forEach(listaResultCuadrillas,function(cuadrllaPadre,index){
        		cuadrllaPadre.checkedOpcion = 0;
    			if(cuadrllaPadre.idPadre == null){
    				cuadrllaPadre.cuadrillasHijas = listaResultCuadrillas.filter(e => {return e.idPadre == cuadrllaPadre.id});
    				$scope.listaCuadrillas.push(cuadrllaPadre);
    			}
    		});
        	console.log($scope.listaCuadrillas);
        	
        	// *** CONFIGURACIÓN DESPACHO ***
        	var nivelUsuario; 				

			let resultConf= results[0].data.result
			if( resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves){
				let  llavesResult=results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;                    
				nivelUsuario= llavesResult.N_FILTRO_GEOGRAFIA;
				$scope.filtroGeografias = llavesResult.N_FILTRO_GEOGRAFIA;
				$scope.filtroIntervenciones = llavesResult.N_FILTRO_INTERVENCIONES;
				
				//llavesResult.VL_AUTO_MODIFICACION = true;
				//llavesResult.VL_AUTO_ELIMINACION = true;
				if(llavesResult.VL_AUTO_MODIFICACION != undefined && llavesResult.VL_AUTO_MODIFICACION){
					$scope.validacionAutoModUsuario = llavesResult.VL_AUTO_MODIFICACION;
	    		}else{
	    			$scope.validacionAutoModUsuario = false;
	    		}
				if(llavesResult.VL_AUTO_ELIMINACION != undefined && llavesResult.VL_AUTO_ELIMINACION){
					$scope.validacionAutoElimUsuario = llavesResult.VL_AUTO_ELIMINACION;
	    		}else{
	    			$scope.validacionAutoElimUsuario = false;
	    		}
				$("#idBody").removeAttr("style");

				validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
                validateCreedText = llavesResult.KEY_TEXTFORMATO_CREED_RES ? KEY_TEXTFORMATO_CREED_RES : '';
//                validateCreed = true;
//                validateCreedMask = "sa";
//                validateCreedText = "Valida todo pass"
//                console.log(validateCreed);
//                console.log(validateCreedMask);
                if(validateCreed){
                	if(validateCreedMask == null){
                		$scope.txtExpresionValPassword = "La contraseña deberá tener mínimo 9 caracteres alfanuméricos, al menos un número y un caracter especial (@$!%*#?&).";
                	}else{
                		$scope.txtExpresionValPassword = validateCreedText;
                	}
                }else{
                	$scope.txtExpresionValPassword = "";
                }
			}else{
				toastr.info("No se encontraron configuraciones del usuario")
			}
			
			// *** CONFIGURACIÓN DE PERMISOS ***
			if( resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.permisos && resultConf.MODULO_ACCIONES_USUARIO.permisos != ""){
				$scope.permisosUsuariosAcciones = resultConf.MODULO_ACCIONES_USUARIO.permisos;
				$scope.configPermisoAccionConsultaUsuarios = ($scope.permisosUsuariosAcciones.filter(e => {return e.clave == "accionConsultaUsuarios"})[0] != undefined);
				$scope.configPermisoAccionCreaUsuarios = ($scope.permisosUsuariosAcciones.filter(e => {return e.clave == "accionCreaUsuarios"})[0] != undefined);
				$scope.configPermisoAccionEditaUsuarios = ($scope.permisosUsuariosAcciones.filter(e => {return e.clave == "accionEditaUsuarios"})[0] != undefined);
				$scope.configPermisoAccionEliminaUsuarios = ($scope.permisosUsuariosAcciones.filter(e => {return e.clave == "accionEliminaUsuarios"})[0] != undefined);
				
				$scope.bucketIdImg = resultConf.BUCKETID_FB;
				
				// *** COMPAÑÍAS ***
	        	if (results[1].data !== undefined) {
	            	if(results[1].data.respuesta){
	            		if(results[1].data.result.companias.length > 0){
	            			$scope.listaCompanias = results[1].data.result.companias;
	            			angular.forEach($scope.listaCompanias,function(companiaCheck,index){
	            				companiaCheck.checkedOpcion = true;
	            			});
	            		}else{
	                    	toastr.info('¡Actualmente no existen compañías!');
	                    }
	            	}else{
	            		toastr.info('¡Actualmente no existen compañías!');
	            	}
	            }else{
	            	toastr.error('Error interno en el servidor.');
	            }
	            
	            // *** PUESTOS ***
	        	if (results[2].data !== undefined) {
	            	if(results[2].data.respuesta){
	            		if(results[2].data.result.puestos.length > 0){
	            			$scope.listaPuestos = results[2].data.result.puestos;
//	            			$scope.idPuestoTecnico = $scope.listaPuestos.filter(e => {return e.descripcion == "TECNICO"})[0];
//	            		    $scope.idPuestoDespacho = $scope.listaPuestos.filter(e => {return e.descripcion == "DESPACHO"})[0];
	            		    angular.forEach($scope.listaPuestos,function(puestoCheck,index){
	            		    	puestoCheck.checkedOpcion = true;
	            			});
	            		}else{
	            			toastr.info('¡Actualmente no existen puestos!');
	            		}
	            	}else{
	            		toastr.info('¡Actualmente no existen puestos!');
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	            
	            // *** PERMISOS ***
	        	if (results[3].data !== undefined) {
	            	if(results[3].data.respuesta){
	            		if(results[3].data.result.permisos.length > 0){
	            			let permisosLista = results[3].data.result.permisos;
	            			$scope.listaPermisos = results[3].data.result.permisos;
	            			permisosLista.push({id: 0, nombre: "PERMISOS", nivel: 0, idPadre: "#", state:{opened: true}});
	            			permisosLista.map((e)=>{
	            				e.parent = e.idPadre == null ? 0 : e.idPadre;
	                            e.text= e.nombre;
	                            e.icon= "fa fa-globe";
	                            return e
	                        })       
							$scope.listaPermisosRespaldo = angular.copy(permisosLista);
	                        $('#arbolPermisoRegistro').bind('loaded.jstree', function(e, data) {
								//$(this).jstree("open_all");
	                        }).jstree({
	                        	'plugins': ['search', 'checkbox', 'wholerow'],
	                        	'search': {
	    							"case_sensitive": false,
	    							"show_only_matches": true
	    						},
								'core': {
									'data': permisosLista,
	                                'themes': {
	                                    'name': 'proton',
	                                    'responsive': true,
	                                    "icons":false        
	                                }
	                            }
							});
	            		}else{
	            			toastr.info('¡Actualmente no existen permisos!');
	            		}
	            	}else{
	            		toastr.info('¡Actualmente no existen permisos!');
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	            
	            // *** GEOGRAFÍAS ***
	            if (results[4].data !== undefined) {
	            	if(results[4].data.respuesta){
	            		if(results[4].data.result.geografia.length > 0){
	            			let listGeografias = [];
	                    	if(nivelUsuario !== undefined){
	                    		results[4].data.result.geografia.forEach(elemento =>{
		                            if (elemento.nivel <= nivelUsuario) {
		                            	listGeografias.push(elemento);
		                            	$scope.listaGeografias.push(elemento);
		                            }
		                        });
	                    	}else{
	                    		listGeografias = results[4].data.result.geografia;
	                    		$scope.listaGeografias = results[4].data.result.geografia;
	                    	}
	                    	$scope.catalogoGeografias = results[4].data.result.geografia;
	                    	geografia=listGeografias;
	                    	geografia.push({id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state:{opened: true}});
	                        geografia.map((e)=>{
	                        	e.parent = e.padre == null ? 0 : e.padre;
	                            e.text= e.nombre;
	                            e.icon= "fa fa-globe";
	                            e.state = {
										opened: true,
										selected: true,
									}
	                            return e
	                        })       
	                        $scope.listaGeografiasRespaldo = angular.copy($scope.listaGeografias);
	                        $('#arbolGeografiaConsulta').bind('loaded.jstree', function(e, data) {
								//$(this).jstree("open_all");
	                        }).jstree({
	                        	'plugins': ['search', 'checkbox', 'wholerow'],
	                        	'search': {
	    							"case_sensitive": false,
	    							"show_only_matches": true
	    						},
								'core': {
									'data': geografia,
	                                'themes': {
	                                    'name': 'proton',
	                                    'responsive': true,
	                                    "icons":false        
	                                }
	                            }
							});
	                    }else{
	                    	toastr.info('¡Actualmente no existen geografías!');
	                    }
	            	}else{
	            		toastr.info('¡Actualmente no existen geografías!');
	            	}
	            }else{
	            	toastr.error('Error interno en el servidor.');
	            }
	            
	            // *** INTERVENCIONES ***
	            if (results[5].data !== undefined) {
	            	if(results[5].data.respuesta){
	            		if(results[5].data.result !== null){
							$scope.respaldoIntervenciones = results[5].data.result;
							$scope.catalogoIntervenciones = results[5].data.result;
							$scope.listaIntervencionesRespaldo = angular.copy($scope.catalogoIntervenciones);
	            		}else{
	                    	toastr.info('¡Actualmente no existen intervenciones!');
	                    }
	            	}else{
	            		toastr.info('¡Actualmente no existen intervenciones!');
	            	}
	            }else{
	            	toastr.error('Error interno en el servidor.');
	            }
	            
	         // *** PERFILES ***
	            if (results[6].data !== undefined) {
	            	if(results[6].data.respuesta){
	            		if(results[6].data.result !== null){
							$scope.listaPerfiles = results[6].data.result.perfiles;
							$scope.listaPerfilesMod = angular.copy(results[6].data.result.perfiles);
	            		}else{
	                    	toastr.info('¡Actualmente no existen intervenciones!');
	                    }
	            	}else{
	            		toastr.info('¡Actualmente no existen intervenciones!');
	            	}
	            }else{
	            	toastr.error('Error interno en el servidor.');
	            }
	            
	        	//swal.close();
	        	setTimeout(function () {
	        		$scope.consultaUsuariosPorGeoCompPuestos();
	        		$scope.companiaSeleccion();
	        		$scope.puestoSeleccion();
	        		$scope.btnAceptarModalGeografiaConsulta();
	    		}, 500);
			}else{
				swal({type: "warning", title:"Aviso", text:"No cuentas con ningún permiso de este módulo."});
			}
        	
        });
    	
    	if (tablaUsuarios) {
			tablaUsuarios.destroy();
		}
		
		tablaUsuarios = $('#table-usuario-pi').DataTable({
			"processing": false,
			"ordering": false,
			"serverSide": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"data": [],
			"columns": [null, null, null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});
	}
    
    $scope.iniciarFechaRegistro = function () {
        $('#form-fechaIngresoRegistro').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('#form-fechaIngresoRegistro').datepicker('update', new Date());
        $scope.informacionRegistro.fechaIngreso = $('#form-fechaIngresoRegistro').val();
    }
    $scope.iniciarFechaRegistro();
    
    
  //ABRE EL MODAL DEL ÁRBOL DE LAS GEOGRAFÍAS - VISTA CONSULTA USUARIOS
    $scope.abrirModalGeografiaConsulta = function() {
    	if($scope.listaGeografias != ""){
    		$("#modalGeografiaConsulta").modal({ backdrop: 'static', keyboard: false });
            $("#modalGeografiaConsulta").modal('show');
    		setTimeout(function (){
    	        $('#buscadorGeografiaConsulta').focus();
    	    }, 750);
    	}else{
    		toastr.info('¡Actualmente no existen geografías!');
    	}
	}
    
    //CIERRA EL MODAL DEL ÁRBOL DE LAS GEOGRAFÍAS - VISTA CONSULTA USUARIOS
    $scope.cerrarModalGeografiaConsulta = function() {
    	$scope.btnAceptarModalGeografiaConsulta();
    	$("#modalGeografiaConsulta").modal('hide');
	}
    
    //MÉTODO PARA BUSCAR GEOGRAFÍAS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - MODAL GEOGRAFÍAS CONSULTA USUARIOS
    $scope.busquedaGeografiaConsulta = function() {
    	$("#arbolGeografiaConsulta").jstree("search", $('#buscadorGeografiaConsulta').val());
	}
    
    //MÉTODO PARA BUSCAR INTERVENCIONES DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA INTERVENCIONES REGISTRO USUARIO
    $scope.busquedaIntervencionRegistro = function() {
    	$("#arbolIntervencionRegistro").jstree("search", $('#buscadorIntervencionRegistro').val());
	}
    
    //MÉTODO PARA BUSCAR PERFILES DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA PERFILES REGISTRO USUARIO
    $scope.busquedaIntervencionPerfilRegistro = function() {
    	$("#arbolIntervencionPerfilRegistro").jstree("search", $('#buscadorIntervencionPerfilRegistro').val());
	}
    
    //MÉTODO PARA BUSCAR PERFILES SELECCIONADOS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA PERFILES REGISTRO USUARIO
    $scope.busquedaPerfileSeleccionadoRegistro = function() {
    	$("#arbolPerfilesSeleccionadosRegistro").jstree("search", $('#buscadorPerfileSeleccionadoRegistro').val());
	}
    
    //MÉTODO PARA BUSCAR GEOGRAFÍAS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA ÁRBOL REGISTRO USUARIO
    $scope.busquedaGeografiaRegistro = function() {
    	$("#arbolGeografiaRegistro").jstree("search", $('#buscadorGeografiaRegistro').val());
	}
    
    //MÉTODO PARA BUSCAR PERMISOS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA ACCESOS REGISTRO USUARIO
    $scope.busquedaPermisosRegistro = function() {
    	$("#arbolPermisoRegistro").jstree("search", $('#buscadorPermisosRegistro').val());
	}
    
    //MÉTODO QUE CONSULTA LOS USUARIOS DE ACUERDO A LA SELECCIÓN DE COMPAÑÍA(S), PUESTO(S) Y GEOGRAFÍA(S) - VISTA CONSULTA USUARIOS
    $scope.consultaUsuariosPorGeoCompPuestos = function() {
    	if($scope.configPermisoAccionConsultaUsuarios){
    		$scope.listaIdGeografias = [];
        	let companiasSeleccionadas = [];
        	let puestosSeleccionados = [];
        	$("#modalGeografiaConsulta").modal({ backdrop: 'static', keyboard: false });
        	var geografias = $('#arbolGeografiaConsulta').jstree("get_selected", true);
    		angular.forEach($scope.listaCompanias,function(compania,index){
    			if(compania.checkedOpcion){
    				companiasSeleccionadas.push(compania.id);
    			}
    		});
    		
    		angular.forEach($scope.listaPuestos,function(puesto,index){
    			if(puesto.checkedOpcion){
    				puestosSeleccionados.push(puesto.id);
    			}
    		});
        	
    		angular.forEach(geografias,(geografia,index) => {
    			$scope.listaIdGeografias.push(geografia.id);				
    		});
    	        		
    		let params = {
    				geografias: $scope.listaIdGeografias,
    	        	companias: companiasSeleccionadas,
    	        	puestos: puestosSeleccionados
    		}
    		
    		var respuestaValidacion = $scope.validarDatosConsultaUsuarios(params);
    	        		
    	    if(respuestaValidacion.validacion){
    	    	if (tablaUsuarios) {
    	    		tablaUsuarios.destroy();
    	    	}
    	        			
    	    	tablaUsuarios = $('#table-usuario-pi').DataTable({
    	    		"processing": false,
    		        "ordering": false,
    		        "serverSide": false,
    		        "scrollX": false,
    		        "paging": true,
    		        "lengthChange": false,
    		        "searching": true,
    		        "ordering": true,
    		        "pageLength": 10,
    		        "ajax": {
    		        	"url": "req/consultaUsuariosPorGeoCompPuestos",
    		        	"type": "POST",
    		        	"data": params,
    		        	"beforeSend": function () {
    		        		if(!swal.isVisible() ){
    		        			swal({ text: 'Cargando registros...', allowOutsideClick: false });
    		        			swal.showLoading();
    		        		}
    		        	},
    		        	"dataSrc": function (json) {
    		        		return json.data;
    		        	},
    		        	"error":function(xhr, error, thrown){
    		        		handleError(xhr)
    		        	}, 
    		        	"complete": function () {
    		        		swal.close()
    		        	}
    		        },
    		        "columns": [null, null, null, null, null, null, null, null],
    		        "language": idioma_espanol_not_font,
    		        "aoColumnDefs" : [ 
    		        	{"aTargets" : [6], "sClass":  "txtTablaConsultaCentrado"},
    		            {"aTargets" : [7], "sClass":  "txtTablaConsultaCentrado"}
    		        ],
    		        "drawCallback": function( settings ) {
    		        	var idUsuarioSesion = $("#idUsuarioSesion").val();
    		        	if($scope.validacionAutoModUsuario){
        		        	$("#btnModUsuario"+idUsuarioSesion).addClass("estiloBlockIconoPermiso");
        		        	$("#iconoBtnModUsuario"+idUsuarioSesion).removeClass("fa-pen");
        		        	$("#iconoBtnModUsuario"+idUsuarioSesion).addClass("fa-unlock");
    		        	}
    		        	if($scope.validacionAutoElimUsuario){
        		        	$("#btnElimUsuario"+idUsuarioSesion).addClass("estiloBlockIconoPermiso");
        		        	$("#iconoBtnElimUsuario"+idUsuarioSesion).removeClass("fa-trash-alt");
        		        	$("#iconoBtnElimUsuario"+idUsuarioSesion).addClass("fa-unlock");
    		        	}
    		        	if(!$scope.configPermisoAccionEditaUsuarios){
    		        		$(".btnModificarUsuario").addClass("estiloBlockIconoPermiso");
    		        		$(".iconoModUsuario").removeClass("fa-pen");
    		        		$(".iconoModUsuario").addClass("fa-unlock");
    		        	}
    		        	if(!$scope.configPermisoAccionEliminaUsuarios){
    		        		$(".btnEliminarUsuario").addClass("estiloBlockIconoPermiso");
    		        		$(".iconoElimUsuario").removeClass("fa-trash-alt");
    		        		$(".iconoElimUsuario").addClass("fa-unlock");
    		        	}
    		        }
    	    	});
    	    	$("#modalGeografiaConsulta").modal('hide');
    	    }else{
    	    	toastr.warning(respuestaValidacion.mensaje);
    	    }
		}else{
			//swal({type: "warning", title:"Aviso", text:"¡No cuentas con el permiso de consulta!"});
		}
	}
    
    //MÉTODO PARA VALIDAR LOS CAMPOS QUE SE REQUIEREN PARA REALIZAR LA CONSULTA DE USUARIOS
    $scope.validarDatosConsultaUsuarios = function(params){
    	let respuesta = {validacion:true, mensaje:""};
    	if(params.companias.length < 1){
    		$("#txtCompania").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Compañía (s)";
    	}else{
    		$("#txtCompania").css("border-bottom", "2px solid #d9d9d9");
    	}
    	if(params.puestos.length < 1){
    		$("#txtPuesto").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Puesto (s)";
    	}else{
    		$("#txtPuesto").css("border-bottom", "2px solid #d9d9d9");
    	}
    	if(params.geografias.length < 1){
    		$("#txtGeografiasConsulta").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Geografía (s)";
    	}else{
    		$("#txtGeografiasConsulta").css("border-bottom", "2px solid #d9d9d9");
    	}
    	
    	if(!respuesta.validacion){
			respuesta.mensaje = "VALIDA LOS SIGUIENTES CAMPOS: " + respuesta.mensaje;
		}
    	
    	return respuesta;
    }
    
    //MÉTODO QUE MUESTRA EL TIPO DE ÁRBOL DE GEOGRAFÍAS SEGÚN EL PUESTO SELECCIONADO - PESTAÑA ÁRBOL REGISTRO USUARIO
    $scope.mostrarArbolGeografiaRegistro = function() {
    	$('#arbolGeografiaRegistro').jstree("destroy");
    	var puestoSeleccionado = $("#puesto_select_registro option:selected").text().toLowerCase();
    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
    	var plugins = [];
    	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
    		plugins = ['search'];
    	}else{
    		plugins = ['search', 'checkbox', 'wholerow'];
    	}
    	
    	geografiasNivelCiudad = [];
    	angular.forEach($scope.listaGeografias,function(elementoGeografia,index){
    		if(elementoGeografia.nivel <= $scope.tabArbol_NV_GEOGRAFIA){
    			geografiasNivelCiudad.push(elementoGeografia);
    		}
    	});
    	
    	let geografia = geografiasNivelCiudad;
    	geografia.push({id: 0, nombre: "GEOGRAFÍA", nivel: 0, padre: "#", state:{opened: true}});
        geografia.map((e)=>{
            e.parent = e.padre == null ? 0 : e.padre;
            e.text= e.nombre;
            e.icon= "fa fa-globe";
            e.state = e.id == 0 ? {opened: true, selected: false} : {opened: false, selected: false};
            return e
        })       
        $('#arbolGeografiaRegistro').bind('loaded.jstree', function(e, data) {
			//$(this).jstree("open_all");
        }).jstree({
        	'plugins': plugins,
        	'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': geografia,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons":false        
                }
            }
		});
        
        //FUNCIÓN DEL MÉTODO (mostrarArbolGeografiaRegistro), LA CUAL ASIGNA LA/LAS GEOGRAFÍA(S) SELECCIONADA(S) A LA LISTA DE 'listaGeografiasSeleccionadas' PARA MOSTRAR - PESTAÑA ÁRBOL REGISTRO USUARIO
        $("#arbolGeografiaRegistro").on('changed.jstree', function (e, data) {
        	$scope.listaGeografiasSeleccionadas = [];
        	$scope.informacionRegistro.geografias = [];
        	$scope.listaCiudadNatalRegistro = [];
        	$scope.listaIdsGeografiaCiudadNatalRegistro = [];
        	$scope.listaTecnicos = [];
        	$scope.listaIngenieros = [];
            $scope.listaSupervisoresCentralizados = [];
            $scope.listaCouchsDespachos = [];
            $scope.listaSupervisores = [];
        	$scope.geoSelect = [];
        	var geografiasTree = $('#arbolGeografiaRegistro').jstree("get_selected", true);
        	geografiasTree.forEach(geo =>{
        		if(geo.original.nivel == $scope.tabArbol_NV_GEOGRAFIA){
        			geo.geoHijas = $scope.catalogoGeografias.filter(e => {return e.padre == geo.id});
        			if(geo.geoHijas.length < 1){
        				geo.geoHijas = [{nivel: geo.original.nivel, nombre: geo.original.nombre, padre: geo.original.padre}];
        			}
        			$scope.geoSelect.push(geo);
        			var idPadre = geo.original.padre;
        			$scope.listaGeografiasSeleccionadas.forEach(geoPadre =>{
        				if(geoPadre.id == idPadre){
        					existePadre = true;
        					geoPadre.hijos.push(geo);
        				}
        			});
        			if(existePadre){
    				}else{
    					$scope.listaGeografias.forEach(geoListaGeneral =>{
    						if(geoListaGeneral.id == idPadre){
    							$scope.listaGeografiasSeleccionadas.push(geoListaGeneral);
    						}
    					});
    					$scope.listaGeografiasSeleccionadas.forEach(geoPadre =>{
    	    				if(geoPadre.id == idPadre){
    	    					geoPadre.hijos = [geo];
    	    				}
    	    			});
    				}
        			$scope.informacionRegistro.geografias.push(geo.id);
        			existePadre = false;
        		}
        	});

        	$scope.listaGeografiasSeleccionadas.forEach(geoHija =>{
        		var geo = geoHija;
        		while(geo.nivel > 2){
        			var ciudadPadre = geografiasNivelCiudad.filter(e => {return e.id == geo.parent})[0];
        			geo = ciudadPadre;
        		}
        		var existeCiudadNatal = false;
        		$scope.listaCiudadNatalRegistro.forEach(ciudadesNatal =>{
        			if(ciudadesNatal.id == geo.id){
        				existeCiudadNatal = true;
        			}
        		});
        		if(existeCiudadNatal == false){
        			$scope.listaCiudadNatalRegistro.push(geo);
        			$scope.listaIdsGeografiaCiudadNatalRegistro.push(geo.id);
        		}
        		
        	});
        	
        	if(geografiasTree.length > 0){
        		if($scope.tabTecnicos){
            		$scope.consultarTecnicos();
            	}
        		if($scope.tabDespachos){
        			$scope.consultarDespachos();
            	}
        		if($scope.tabIngenieros){
        			$scope.consultarIngenieros();
        		}
        		if($scope.tabSupervisorCentralizado){
        			$scope.consultarSupervisoresCentralizados();
        		}
        		if($scope.tabCouchDespacho){
        			$scope.consultarCouchsDespacho();
        		}
        		if($scope.tabSupervisor){
        			$scope.consultarSupervisores();
        		}
        	}
        	    	
        	if($scope.listaGeografiasSeleccionadas.length > 0){
        		$("#labelGeografiasSeleccionadas").css("color", "rgb(70, 88, 107)");
        		$("#contenedorGeografiasRegistro").css("border", "white solid 0px");
        	}
        	$scope.informacionRegistro.ciudadNatal = "";
        	$scope.$apply();
        });
	}
    
    //MÉTODO PARA VALIDACIÓN DE INFORMACIÓN DE LOS DATOS MOSTRADOS EN LA VISTA - PESTAÑA CONFIRMACIÓN REGISTRO USUARIO
    $scope.cargarInfoConfirmacionRegistro = function() {
    	$scope.confirmacionRegistro.nombre = 
          $scope.informacionRegistro.nombre !== undefined && $scope.informacionRegistro.nombre !== "" &&
          $scope.informacionRegistro.apellidoPaterno !== undefined && $scope.informacionRegistro.apellidoPaterno !== "" &&
          $scope.informacionRegistro.apellidoMaterno !== undefined && $scope.informacionRegistro.apellidoMaterno !== "" ?
          $scope.informacionRegistro.nombre + ' ' + $scope.informacionRegistro.apellidoPaterno + ' ' + $scope.informacionRegistro.apellidoMaterno : "Sin asignar";
    	$scope.confirmacionRegistro.usuario = $scope.informacionRegistro.usuario !== undefined && $scope.informacionRegistro.usuario !== "" ? $scope.informacionRegistro.usuario : "Sin asignar";
    	$scope.confirmacionRegistro.correo = $scope.informacionRegistro.correo !== undefined && $scope.informacionRegistro.correo !== "" ? $scope.informacionRegistro.correo : "Sin asignar";
    	$scope.confirmacionRegistro.contrasena = $scope.informacionRegistro.contrasena !== undefined && $scope.informacionRegistro.contrasena !== "" ? $scope.informacionRegistro.contrasena : "Sin asignar";
    	$scope.confirmacionRegistro.puesto = $("#puesto_select_registro option:selected").text();
    	$scope.confirmacionRegistro.fechaIngreso = $scope.informacionRegistro.fechaIngreso !== undefined && $scope.informacionRegistro.fechaIngreso !== "" ? $scope.informacionRegistro.fechaIngreso : "Sin asignar";
	}
    
    //MÉTODO QUE SEGÚN EL PUESTO SELECCIONADO REALIZA LA CONFIGURACIÓN DE PESTAÑAS Y MANDA A LLAMAR EL MÉTODO QUE MUESTRA EL TIPO DE ÁRBOL DE GEOFRAFÍAS
    $('#puesto_select_registro').on('change', function() {
    	$("#puesto_select_registro").css("border", "1px solid #bdbdbd");
    	$('#arbolGeografiaRegistro').jstree("destroy");
    	$('#arbolIntervencionRegistro').jstree("destroy");
    	$('#arbolIntervencionRegistro').jstree("deselect_all");
    	$('#arbolIntervencionPerfilRegistro').jstree("destroy");
    	$('#arbolIntervencionPerfilRegistro').jstree("deselect_all");
    	$('#arbolGeografiaRegistro').jstree("deselect_all");
    	$('#arbolPermisoRegistro').jstree("deselect_all");
    	$("#arbolIntervencionRegistro").jstree('close_all');
    	$("#arbolIntervencionPerfilRegistro").jstree('close_all');
    	$("#arbolGeografiaRegistro").jstree('close_all');
    	$("#arbolPermisoRegistro").jstree('close_all');
    	$("#buscadorIntervencionRegistro").val("");
    	$("#buscadorIntervencionPerfilRegistro").val("");
    	$("#buscadorGeografiaRegistro").val("");
    	$("#buscadorPermisosRegistro").val("");
    	$("#arbolIntervencionRegistro").jstree('open_node', 0);
    	$("#arbolIntervencionPerfilRegistro").jstree('open_node', 0);
    	$("#arbolPermisoRegistro").jstree('open_node', 0);
    	$scope.listaIntervencionesSeleccionadas = [];
    	$scope.listaGeografiasSeleccionadas = [];
    	$scope.informacionRegistro.geografias = [];
    	$scope.listaPermisosSeleccionados = [];
    	$scope.listaTecnicos = [];
        $scope.listaDespachos = [];
        $scope.listaIngenieros = [];
        $scope.listaSupervisoresCentralizados = [];
        $scope.listaCouchsDespachos = [];
        $scope.listaSupervisores = [];
        $scope.geoSelect = [];
    	$scope.intervencionSelect = [];
    	
    	$scope.listaGeografiasSeleccionadas = [];
    	$scope.informacionRegistro.geografias = [];
    	$scope.listaCiudadNatalRegistro = [];
    	$scope.listaIdsGeografiaCiudadNatalRegistro = [];
    	$scope.listaTecnicos = [];
    	
    	var puestoSeleccionado = $("#puesto_select_registro option:selected").text().toLowerCase();
    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
    	if(puestoSeleccionado == "tecnico"){
    		$scope.mostrarAccesos = false;
    	    $scope.mostrarTecnicos = false;
    	    $scope.isTecnico = true;
    	    $scope.mostrarDespacho = true;
    	}else{
    		$scope.mostrarAccesos = true;
    	    $scope.mostrarTecnicos = true;
    	    $scope.isTecnico = false;
    	    $scope.mostrarDespacho = false;
    	}
    	
    	//LLAMADA AL MÉTODO QUE SE ENCARGA DE MOSTRAR EL TIPO DE ÁRBOL SEGÚN EL PUESTO SELECCIONADO
    	$scope.tabInformacion = true;
    	$scope.tabIntervenciones = false;
    	$scope.tabArbol = false;
    	$scope.tabAccesos = false;
    	$scope.tabTecnicos = false;
    	$scope.tabDespachos = false;
    	$scope.tabPerfiles = false;
    	$scope.tabIngenieros = false;
    	$scope.tabSupervisorCentralizado = false;
    	$scope.tabCouchDespacho = false;
    	$scope.tabSupervisor = false;
    	$scope.tabConfirmacion = false;
    	
    	var tabsPuestoSeleccionadoRegistro = $scope.listaPuestos.filter(e => {return e.id == $(this).val()})[0];
//    	console.log("-------------------- TAB's Puesto --------------------");
    	angular.forEach(tabsPuestoSeleccionadoRegistro.tabs,function(tab,index){
//    		console.log(tab.llaveFront);
    		switch(tab.llaveFront){
            	case "tabInformacion":
            		$scope.tabInformacion = true;
            		break;
            	case "tabIntervenciones":
            		$scope.tabIntervenciones = true;
            		break;
            	case "tabArbol":
            		$scope.tabArbol = true;
            		break;
            	case "tabAccesos":
            		$scope.tabAccesos = true;
            		break;
            	case "tabTecnicos":
            		$scope.tabTecnicos = true;
            		break;
            	case "tabDespachos":
            		$scope.tabDespachos = true;
            		break;
            	case "tabPerfiles":
            		$scope.tabPerfiles = true;
            		break;
            	case "tabIngenieros":
            		$scope.tabIngenieros = true;
            		break;
            	case "tabSupervisorCentralizado":
            		$scope.tabSupervisorCentralizado = true;
            		break;
            	case "tabCouchDespacho":
            		$scope.tabCouchDespacho = true;
            		break;
            	case "tabSupervisor":
            		$scope.tabSupervisor = true;
            		break;
            	case "tabConfirmacion":
            		$scope.tabConfirmacion = true;
            		break;
    		}
		});
//    	console.log("------------------------------------------------------");
    	
    	$scope.tabInformacionVW_ASIG_AUTOMATICA = true;
    	$scope.tabInformacionVW_CUADRILLA = true;
    	$scope.tabInformacionVL_RFC = true;
    	$scope.tabInformacionVL_CURP = true;
    	$scope.tabArbol_LB_N1 = "";
    	$scope.tabArbol_LB_N2 = "";
    	$scope.tabIntervenciones_NV_INTERVENCIONES = null;
    	$scope.tabArbol_NV_GEOGRAFIA = null;
    	$scope.tabTecnicosVL_MULTISELECCION = true;
    	$scope.tabDespachosVL_MULTISELECCION = true;
    	$scope.tabIngenierosVL_MULTISELECCION = true;
    	$scope.tabSupervisorCentralizadoVL_MULTISELECCION = true;
    	$scope.tabCouchDespachoVL_MULTISELECCION = true;
    	$scope.tabSupervisorVL_MULTISELECCION = true;
    	$scope.idPuestoTecnico = null;
        $scope.idPuestoDespacho = null;
        $scope.idPuestoIngeniero = null;
        $scope.idPuestoSupervisorCentralizado = null;
        $scope.idPuestoCouchDespacho = null;
        $scope.idPuestoSupervisor = null;
    	
    	angular.forEach(tabsPuestoSeleccionadoRegistro.configuraciones,function(conf,index){
    		
    		switch(conf.llave){
	        	case "tabInformacionVW_ASIG_AUTOMATICA":
	        		if(conf.valor == "false"){
	    				$scope.tabInformacionVW_ASIG_AUTOMATICA = false;
	    			}
	        		break;
	        	case "tabInformacionVW_CUADRILLA":
	        		if(conf.valor == "false"){
	        			$scope.tabInformacionVW_CUADRILLA = false;
	    			}
	        		break;
	        	case "tabArbol_LB_N1":
	        		$scope.tabArbol_LB_N1 = conf.valor;
	        		break;
	        	case "tabArbol_LB_N2":
	        		$scope.tabArbol_LB_N2 = conf.valor;
	        		break;
	        	case "tabInformacionVL_RFC":
	        		if(conf.valor+"" == "true"){
	    				$scope.tabInformacionVL_RFC = true;
	    			}else if(conf.valor+"" == "false"){
	    				$scope.tabInformacionVL_RFC = false;
	    			}
	        		break;
	        	case "tabInformacionVL_CURP":
	        		if(conf.valor+"" == "true"){
	    				$scope.tabInformacionVL_CURP = true;
	    			}else if(conf.valor+"" == "false"){
	    				$scope.tabInformacionVL_CURP = false;
	    			}
	        		break;
	        	case "tabArbol_NV_GEOGRAFIA":
	        		$scope.tabArbol_NV_GEOGRAFIA = conf.valor;
	        		break;
	        	case "tabIntervenciones_NV_INTERVENCIONES":
	        		$scope.tabIntervenciones_NV_INTERVENCIONES = conf.valor;
	        		break;
	        	case "tabTecnicosVL_MULTISELECCION":
	        		$scope.tabTecnicosVL_MULTISELECCION = conf.valor;
	        		break;
	        	case "tabDespachosVL_MULTISELECCION":
	        		$scope.tabDespachosVL_MULTISELECCION = conf.valor;
	        		break;
	        	case "tabIngenierosVL_MULTISELECCION":
	        		$scope.tabIngenierosVL_MULTISELECCION = conf.valor;
	        		break;
	        	case "tabSupervisorCentralizadoVL_MULTISELECCION":
	        		$scope.tabSupervisorCentralizadoVL_MULTISELECCION = conf.valor;
	        		break;
	        	case "tabCouchDespachoVL_MULTISELECCION":
	        		$scope.tabCouchDespachoVL_MULTISELECCION = conf.valor;
	        		break;
	        	case "tabSupervisorVL_MULTISELECCION":
	        		$scope.tabSupervisorVL_MULTISELECCION = conf.valor;
	        		break;
	        	case "tabTecnicos_FL_TECNICOS":
	        		$scope.idPuestoTecnico = conf.valor;
	        		break;
	        	case "tabDespachos_FL_DESPACHOS":
	        		$scope.idPuestoDespacho = conf.valor;
	        		break;
	        	case "tabIngenieros_FL_INGENIEROS":
	        		$scope.idPuestoIngeniero = conf.valor;
	        		break;
	        	case "tabSupervisorCentralizado_FL_SUPERVISORES_CENTRALIZADOS":
	        		$scope.idPuestoSupervisorCentralizado = conf.valor;
	        		break;
	        	case "tabCouchDespacho_FL_COUCHS_DESPACHOS":
	        		$scope.idPuestoCouchDespacho = conf.valor;
	        		break;
	        	case "tabSupervisor_FL_SUPERVISORES":
	        		$scope.idPuestoSupervisor = conf.valor;
	        		break;
			}
    		
//    		if(conf.llave == "tabInformacionVW_ASIG_AUTOMATICA"){
//    			if(conf.valor == "false"){
//    				$scope.tabInformacionVW_ASIG_AUTOMATICA = false;
//    			}
//    		}else if(conf.llave == "tabArbol_LB_N1"){
//    			$scope.tabArbol_LB_N1 = conf.valor;
//    		}else if(conf.llave == "tabArbol_LB_N2"){
//    			$scope.tabArbol_LB_N2 = conf.valor;
//    		}else if(conf.llave == "tabInformacionVL_RFC"){
//    			if(conf.valor+"" == "true"){
//    				$scope.tabInformacionVL_RFC = true;
//    			}else if(conf.valor+"" == "false"){
//    				$scope.tabInformacionVL_RFC = false;
//    			}
//    		}else if(conf.llave == "tabInformacionVL_CURP"){
//    			if(conf.valor+"" == "true"){
//    				$scope.tabInformacionVL_CURP = true;
//    			}else if(conf.valor+"" == "false"){
//    				$scope.tabInformacionVL_CURP = false;
//    			}
//    		}else if(conf.llave == "tabArbol_NV_GEOGRAFIA"){
//    			$scope.tabArbol_NV_GEOGRAFIA = conf.valor;
//    		}else if(conf.llave == "tabIntervenciones_NV_INTERVENCIONES"){
//    			$scope.tabIntervenciones_NV_INTERVENCIONES = conf.valor;
//    		}else if(conf.llave == "tabTecnicosVL_MULTISELECCION"){
//    			$scope.tabTecnicosVL_MULTISELECCION = conf.valor;
//    		}else if(conf.llave == "tabDespachosVL_MULTISELECCION"){
//    			$scope.tabDespachosVL_MULTISELECCION = conf.valor;
//    		}else if(conf.llave == "tabTecnicos_FL_TECNICOS"){
//    			$scope.idPuestoTecnico = conf.valor;
//        		$scope.idPuestoDespacho = conf.valor;
//    		}
    		
    	});
    	
    	//---------------------------------------------------------------------------------------------------------------------------
    	//---------------------------------------------------------------------------------------------------------------------------
    	//---------------------------------------------------------------------------------------------------------------------------
    	//ID estáticos
//    	$scope.idPuestoIngeniero = 7;
//    	$scope.idPuestoSupervisorCentralizado = 7;
//    	$scope.idPuestoCouchDespacho = 7;
//    	$scope.idPuestoDespacho = 6;
    	//MULTISELECCION estática
//    	$scope.tabIngenierosVL_MULTISELECCION = true;
    	//---------------------------------------------------------------------------------------------------------------------------
    	//---------------------------------------------------------------------------------------------------------------------------
    	//---------------------------------------------------------------------------------------------------------------------------
    	
    	$scope.$apply();
    	$scope.cargarArbolIntervenciones();
    	$scope.mostrarArbolGeografiaRegistro();
    	$scope.cargarArbolIntervencionesPerfiles();
    });
    
    $scope.cargarArbolIntervenciones = function() {
    	let intervencionesLista = [];
    	angular.forEach($scope.respaldoIntervenciones,function(intervencion,index){
            if (intervencion.nivel <= $scope.tabIntervenciones_NV_INTERVENCIONES) {
            	intervencionesLista.push(intervencion);
            	$scope.listaIntervenciones.push(intervencion);
            }
        });
		if(intervencionesLista.length > 0){
			intervencionesLista.push({id: 0, nombre: "INTERVENCIONES", nivel: 0, idPadre: "#", state:{opened: true}});
			intervencionesLista.map((e)=>{
                e.parent = e.idPadre == null ? 0 : e.idPadre;
                e.text= e.nombre;
                e.icon= "fa fa-globe";
                return e
            })       
            
            $('#arbolIntervencionRegistro').bind('loaded.jstree', function(e, data) {
				//$(this).jstree("open_all");
            }).jstree({
            	'plugins': ['search', 'checkbox', 'wholerow'],
            	'search': {
					"case_sensitive": false,
					"show_only_matches": true
				},
				'core': {
					'data': intervencionesLista,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons":false        
                    }
                }
			});
		}else{
			toastr.info('¡Actualmente no existen intervenciones!');
		}
	}
    
    $scope.cargarArbolIntervencionesPerfiles = function() {

    	$scope.listaPerfilesArbolRegistro = [];
    	$scope.listaPerfilesArbolRegistro.push({tipo: "na", idTipo: "na", id: "perfiles", text: "PERFILES", parent: "#", icon: 'fa fa-globe', nivel: 0, state:{opened: true}});

    	angular.forEach($scope.listaPerfiles,function(perfil,indexPerfil){
    		$scope.listaPerfilesArbolRegistro.push({tipo: "perfil", idTipo: perfil.id, id: perfil.id, text: perfil.descripcion, parent: "perfiles", icon: 'fa fa-globe', nivel: 0});
    		angular.forEach(perfil.intervenciones,function(intervencion,indexIntervencion){
    			var idPadrePerfil = "";
        		if (intervencion.nivel == 1) {
        			idPadrePerfil = perfil.id;
        		}else{
        			idPadrePerfil = (intervencion.idPadre + "_" + (indexPerfil+1));
        		}
        		$scope.listaPerfilesArbolRegistro.push({
        			tipo: "intervencion",
    				idTipo: intervencion.id,
    				id: intervencion.id + "_" + (indexPerfil+1),
                    text: intervencion.descripcion,
                    parent: idPadrePerfil,
                    icon: 'fa fa-globe',
                    nivel: parseInt(intervencion.nivel),
                    perfil: perfil.id
    			});
        	});
    	});
        
        $('#arbolIntervencionPerfilRegistro').bind('loaded.jstree', function(e, data) {
  			//$(this).jstree("open_all");
        }).jstree({
        	'plugins': ['search', 'checkbox', 'wholerow'],
        	'search': {
  				"case_sensitive": false,
  				"show_only_matches": true
  			},
  			'core': {
  				'data': $scope.listaPerfilesArbolRegistro,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons":false        
                }
            }
  		});
	}
    
    //MÉTODO QUE ASIGNA LA/LAS INTERVENCIÓN(ES) SELECCIONADA(S) A LA LISTA DE 'listaIntervencionesSeleccionadas' PARA MOSTRAR - PESTAÑA INTERVENCIONES REGISTRO USUARIO
    $("#arbolIntervencionRegistro").click(function() {
    	$scope.listaIntervencionesSeleccionadas = [];
    	$scope.informacionRegistro.intervenciones = [];
    	$scope.intervencionSelect = [];
    	var intervencionesTree = $('#arbolIntervencionRegistro').jstree("get_selected", true);
    	
    	intervencionesTree.forEach(intervencion =>{
    		if(intervencion.original.nivel == $scope.tabIntervenciones_NV_INTERVENCIONES){
    			intervencion.intervencionesHijas = $scope.catalogoIntervenciones.filter(e => {return e.idPadre == intervencion.id});
    			if(intervencion.intervencionesHijas.length < 1){
    				intervencion.intervencionesHijas = [{nivel: intervencion.original.nivel, nombre: intervencion.original.nombre, idPadre: intervencion.original.idPadre}];
    			}
    			$scope.intervencionSelect.push(intervencion);
    			
    			var idPadre = intervencion.original.parent;
    			$scope.listaIntervencionesSeleccionadas.forEach(intervencionPadre =>{
    				if(intervencionPadre.id == idPadre){
    					existePadre = true;
    					intervencionPadre.hijos.push(intervencion);
    				}
    			});
    			if(existePadre){
				}else{
					$scope.respaldoIntervenciones.forEach(intervencionListaGeneral =>{
						if(intervencionListaGeneral.id == idPadre){
							$scope.listaIntervencionesSeleccionadas.push(intervencionListaGeneral);
						}
					});
					$scope.listaIntervencionesSeleccionadas.forEach(intervencionPadre =>{
	    				if(intervencionPadre.id == idPadre){
	    					intervencionPadre.hijos = [intervencion];
	    				}
	    			});
				}
    			$scope.informacionRegistro.intervenciones.push(intervencion.id);
    			existePadre = false;
    		}
    	});

    	$("#labelIntervencionesSeleccionadas").css("color", "rgb(70, 88, 107)");
		$("#contenedorIntervencionesRegistro").css("border", "white solid 0px");
    	$scope.$apply();
    });    
    
  //MÉTODO QUE ASIGNA LOS PERFILES SELECCIONADOS A LA LISTA DE 'intervencionPerfilSelect' PARA MOSTRAR - PESTAÑA PERFILES REGISTRO USUARIO
    $("#arbolIntervencionPerfilRegistro").click(function() {
    	$scope.informacionRegistro.perfiles = [];
    	$scope.intervencionPerfilSelect = [];
    	var intervencionesPerfilesTree = $('#arbolIntervencionPerfilRegistro').jstree("get_selected", true);
    	var listaPerfilesPadres = [];
    	
    	$('#arbolPerfilesSeleccionadosRegistro').jstree("destroy");
    	if(intervencionesPerfilesTree.length > 0){
    		
    		intervencionesPerfilesTree.forEach(intervencion =>{
        		if(intervencion.original.nivel == 2){
        			intervencion.parents.forEach(padre =>{
            			var existePadre = listaPerfilesPadres.find((e) => e.id == padre);
            			if(existePadre == undefined){
            				var padrePerfil = $scope.listaPerfilesArbolRegistro.find((e) => e.id == padre);
            				if(padrePerfil != undefined){
            					listaPerfilesPadres.push(padrePerfil);
            				}
            			}
                	});
        		}
        	});
        	
        	listaPerfilesPadres.forEach(padre =>{
        		var existePadre = intervencionesPerfilesTree.find((e) => e.id == padre.id);
        		if(existePadre == undefined){
        			intervencionesPerfilesTree.push(padre);
        		}
        	});
        	
        	$scope.listaMostrarPerfilesSeleccionados = [];
        	angular.forEach(intervencionesPerfilesTree,function(intervencion,index){
        		if(intervencion.original == undefined){
            		$scope.listaMostrarPerfilesSeleccionados.push({
            			tipo: intervencion.tipo,
            			idTipo: intervencion.idTipo,
            			id: intervencion.id,
                        text: intervencion.text,
                        parent: intervencion.parent,
                        icon: 'fa fa-globe',
                        nivel: intervencion.nivel,
                        perfil: intervencion.perfil
            		});
        		}else{
        			$scope.listaMostrarPerfilesSeleccionados.push({
            			tipo: intervencion.original.tipo,
            			idTipo: intervencion.original.idTipo,
            			id: intervencion.original.id,
                        text: intervencion.original.text,
                        parent: intervencion.original.parent,
                        icon: 'fa fa-globe',
                        nivel: intervencion.original.nivel,
                        perfil: intervencion.original.perfil
            		});
        		}
        	});
        	
        	$scope.listaMostrarPerfilesSeleccionados.find((e) => e.id == "perfiles").text = "PERFILES SELECCIONADOS";
    		
    		$('#arbolPerfilesSeleccionadosRegistro').bind('loaded.jstree', function(e, data) {
      			$(this).jstree("open_all");
      			$(this).jstree('select_all');
      			$(this).jstree().disable_node($(this).jstree().get_selected());
            }).jstree({
            	'plugins': ['search', 'checkbox', 'wholerow'],
            	'search': {
      				"case_sensitive": false,
      				"show_only_matches": true
      			},
      			'core': {
      				'data': $scope.listaMostrarPerfilesSeleccionados,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons":false        
                    }
                }
      		});
    	}

    	$("#labelIntervencionesPerfilesSeleccionados").css("color", "rgb(70, 88, 107)");
		$("#contenedorIntervencionesPerfilesRegistro").css("border", "white solid 0px");
    	$scope.$apply();
    });  
    
    //MÉTODO QUE ASIGNA EL/LOS PERMISO(S) SELECCIONADO(S) A LA LISTA DE 'listaPermisosSeleccionados' PARA MOSTRAR - PESTAÑA ACCESOS REGISTRO USUARIO
    $("#arbolPermisoRegistro").click(function() {
    	$scope.listaPermisosSeleccionados = [];
    	$scope.informacionRegistro.permisos = [];
    	var permisosTree = $('#arbolPermisoRegistro').jstree("get_selected", true);
    	permisosTree.forEach(permiso =>{
    		if(permiso.original.nivel == 2){
    			var idPadre = permiso.original.idPadre;
    			$scope.listaPermisosSeleccionados.forEach(permisosPadre =>{
    				if(permisosPadre.id == idPadre){
    					existePadre = true;
    					permisosPadre.hijos.push(permiso);
    				}
    			});
    			if(existePadre){
				}else{
					$scope.listaPermisos.forEach(permisosListaGeneral =>{
						if(permisosListaGeneral.id == idPadre){
							$scope.listaPermisosSeleccionados.push(permisosListaGeneral);
						}
					});
					$scope.listaPermisosSeleccionados.forEach(permisosPadre =>{
	    				if(permisosPadre.id == idPadre){
	    					permisosPadre.hijos = [permiso];
	    				}
	    			});
				}
    			$scope.informacionRegistro.permisos.push(permiso.id);
    			existePadre = false;
    		}
    	});
    	if($scope.listaPermisosSeleccionados.length > 0){
        	$("#labelPermisosSeleccionadas").css("color", "rgb(70, 88, 107)");
    		$("#contenedorPermisosRegistro").css("border", "white solid 0px");
        }
    	$scope.$apply();
    });
    
    //MÉTODO PARA REGISTRAR USUARIOS NUEVOS
    $scope.guardarUsuario = function() {
    	$scope.informacionRegistro.tecnicos = [];
    	$scope.informacionRegistro.despachos = [];
    	$scope.informacionRegistro.ingenieros = [];
    	
    	var puestoSeleccionado = $("#puesto_select_registro option:selected").val();
    	var companiaSeleccionada = $("#compania_select_registro option:selected").val();
    	var sexo = $("#sexo_select_registro option:selected").val();
    	var fechaSeleccionada = $scope.informacionRegistro.fechaIngreso.split('/');
    	
    	angular.forEach($scope.listaDespachos,function(despacho,index){
			if(despacho.checkedOpcion == true){
				$scope.informacionRegistro.despachos.push(despacho.idUsuario);
			}
		});
    	
    	angular.forEach($scope.listaTecnicos,function(tecnico,index){
			if(tecnico.checkedOpcion == true){
				$scope.informacionRegistro.tecnicos.push(tecnico.idUsuario);
			}
		});
    	
    	angular.forEach($scope.listaIngenieros,function(ingeniero,index){
			if(ingeniero.checkedOpcion == true){
				$scope.informacionRegistro.ingenieros.push(ingeniero.idUsuario);
			}
		});
    	
    	var jsonPerfilesIntervenciones = [];
    	angular.forEach($scope.listaMostrarPerfilesSeleccionados,function(perfiles,index){
    		if(perfiles.nivel == 1 ||  perfiles.nivel == 2){
    			jsonPerfilesIntervenciones.push(perfiles.idTipo);
    		}
    	});
    	
    	jsonPerfilesIntervenciones = jsonPerfilesIntervenciones.filter(function(ele , pos){
    	    return jsonPerfilesIntervenciones.indexOf(ele) == pos;
    	});
    	
    	let paramsRegistro = {
    			nombre: $scope.informacionRegistro.nombre,
    			apellidoPaterno: $scope.informacionRegistro.apellidoPaterno,
    			apellidoMaterno: $scope.informacionRegistro.apellidoMaterno,
    			numeroEmpleado: $scope.informacionRegistro.numEmpleado,
    			usuario: $scope.informacionRegistro.usuario,
    			password: $scope.informacionRegistro.contrasena,
    			rfc: $scope.informacionRegistro.rfc,
    			curp: $scope.informacionRegistro.curp,
    			genero: sexo,
    			correoElectronico: $scope.informacionRegistro.correo,
    			telefonoCelular: $scope.informacionRegistro.telefonoContacto,
    			idEstatusUsuario: 1,
    			idGeografia: $scope.informacionRegistro.ciudadNatal,
    			//idUsuarioJefe: 12,
    			llaveExterna: "4532",
    			idTipoUsuario: puestoSeleccionado,
    			idProveedor: companiaSeleccionada,
    			idDispositivo: "string",
    			fechaAlta: fechaSeleccionada[2] + '-' + fechaSeleccionada[1] + '-' + fechaSeleccionada[0],
    			geografias: $scope.informacionRegistro.geografias,
    			intervenciones: $scope.informacionRegistro.intervenciones,
    			perfilesOu: jsonPerfilesIntervenciones,
    			permisos: $scope.isTecnico == true ? [] : $scope.informacionRegistro.permisos,
    			idAsignacionAutomatica: $scope.tabInformacionVW_ASIG_AUTOMATICA == true ? $scope.informacionRegistro.asignacionAutomatica : 0
    	};
    	
    	if($scope.tabTecnicos){
    		paramsRegistro.idOperarios = $scope.informacionRegistro.tecnicos;
    	}
    	
    	if($scope.tabDespachos){
    		paramsRegistro.idDespachos = $scope.informacionRegistro.despachos;
    	}
//    	var llaveIng = "pollos";
//    	if($scope.tabIngenieros){
//    		paramsRegistro.+""llaveIng = $scope.informacionRegistro.ingenieros;
//    	}
    	
    	if($scope.tabInformacionVW_CUADRILLAs){
    		paramsRegistro.tipoCuadrilla = $scope.informacionRegistro.cuadrilla;
    	}
    	
    	if($scope.fileFotoUsuario != null){
    		paramsRegistro.fotoPerfil = {
    				bucketId: $scope.fileFotoUsuario.bucketId,
    			    archivo: $scope.fileFotoUsuario.archivo,
    			    nombre: "usuarios/mex/"+$scope.informacionRegistro.numEmpleado+"/fotoPerfil"
    			  }
    	}else{
    		paramsRegistro.fotoPerfil = {
				bucketId: "",
			    archivo: "",
			    nombre: ""
			  }
    	}

    	var respuestaValidacionRegistro = $scope.validarInformacionRegistro();
    	if(respuestaValidacionRegistro){
    		
    		var respuestaValidacionDatosNoObligadorios = $scope.validarInformacionNoObligatoria();
        	var tituloAlerta = "Se guardará un nuevo usuario";
    		var textoAlerta = "¿Desea registrar al usuario?";
        	if(respuestaValidacionDatosNoObligadorios.validacion == false){
        		tituloAlerta = "¿Desea continuar con el registro?";
        		textoAlerta = ""+respuestaValidacionDatosNoObligadorios.mensaje;
        	}
    		
    		swal({
    	        title: tituloAlerta,
    	        text: textoAlerta,
    	        type: "warning",
    	        showCancelButton: true,
    	        confirmButtonColor: '#007bff',
    	        confirmButtonText: 'Si',
    	        cancelButtonText: 'Cancelar'
    	      }).then(function (isConfirm) {
    	        if (isConfirm) {
    	        	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
    	    		swal.showLoading();
    	        	$q.all([
    	        		usuarioPIService.guardarUsuario(paramsRegistro)
    	            ]).then(function(results) {
    	            	swal.close();
    	            	if(results[0].data.respuesta){
    	            		$scope.limpiarDatosRegistro();
    	            		swal("Correcto", "¡Registro guardado con éxito!", "success");
    	            		$scope.resetearTablaUsuariosConsulta();
		            		setTimeout(function() {
		            			$scope.consultaUsuariosPorGeoCompPuestos();
		    	        	}, 1000);
    	            	}else{
    	            		swal("Error", results[0].data.resultDescripcion, "error");
    	            	}
    	            });
    	        }
    	      }).catch(err => {

    	      });
    	}
	}
    
    $scope.validarInformacionNoObligatoria = function() {
    	let respuesta = {
    			mensaje:"Se realizará el registro sin los siguientes datos: ",
    			validacion: true
    	}
    	if($scope.isTecnico == false){
    		if($scope.informacionRegistro.tecnicos < 1){
    			respuesta.mensaje = respuesta.mensaje + " *Técnicos ";
    			respuesta.validacion = false;
    		}
    	}
		if($scope.fileFotoUsuario == null){
			respuesta.mensaje = respuesta.mensaje + " *Fotografía ";
			respuesta.validacion = false;
		}
		return respuesta;
	}
    
    //VALIDACIÓN GENERAL DE DATOS DEL SUBMÓDULO REGISTRAR USUARIO
    $scope.validarInformacionRegistro = function() {
    	var validacion = true;
    	var validacionInformacionGeneral = true;
    	var validacionIntervenciones = true;
    	var validacionArbol = true;
    	var validacionAccesos = true;
    	var validacionTecnicos = true;
    	var validacionDespachos = true;
    	var validacionPerfiles = true;
    	var validacionIngenieros = true;
    	var validacionSupervisorCentralizado = true;
    	var validacionCouchDespacho = true;
    	var validacionSupervisor = true;
    	var mensaje = "VALIDA LOS SIGUIENTES CAMPOS: ";
    	
    	
    	//PESTAÑA INFORMACIÓN GENERAL
		if($scope.tabInformacion){
			if($("#puesto_select_registro").val() === "" || $("#puesto_select_registro").val() === undefined || $("#puesto_select_registro").val() === null){
				$("#puesto_select_registro").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Puesto";
			}else{
				$("#puesto_select_registro").css("border", "1px solid #bdbdbd");
			}
			
			if($("#compania_select_registro").val() === "" || $("#compania_select_registro").val() === undefined || $("#compania_select_registro").val() === null){
				$("#compania_select_registro").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Compañía";
			}else{
				$("#compania_select_registro").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.informacionRegistro.numEmpleado === "" || $scope.informacionRegistro.numEmpleado === undefined){
				$("#form-num-empleado").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Número empleado";
			}else{
				$("#form-num-empleado").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.informacionRegistro.usuario === "" || $scope.informacionRegistro.usuario === undefined){
				$("#form-usuario").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Usuario";
			}else{
				$("#form-usuario").css("border", "1px solid #bdbdbd");
			}
			
			var valCorrectaFormatoPassword = true;
			if($scope.informacionRegistro.contrasena === "" || $scope.informacionRegistro.contrasena === undefined){
				$("#form-pasword").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Contraseña";
			}else{
				
				if (validateCreed) {
					if (validateCreedMask && validateCreedMask !== null) {
						if (!validateCreedMask.test($scope.informacionRegistro.contrasena)) {
							$("#form-pasword").css("border-bottom", "2px solid #f55756");
							$("#form-confir-password").css("border-bottom", "2px solid #f55756");
							validacionInformacionGeneral = false;
							valCorrectaFormatoPassword = false;
							mensaje = mensaje + "<br/> *Formato de contraseñas";
						}else{
							$("#form-pasword").css("border", "1px solid #bdbdbd");
							$("#form-confir-password").css("border", "1px solid #bdbdbd");
						}
					} else {
						if ($scope.informacionRegistro.contrasena.length <= 8 || !$scope.expresionesRegulares.test($scope.informacionRegistro.contrasena) || 
							!$scope.numeroValPass.test($scope.informacionRegistro.contrasena) || !$scope.permitidos.test($scope.informacionRegistro.contrasena) 
							|| $scope.negados.test($scope.informacionRegistro.contrasena)) {
							$("#form-pasword").css("border-bottom", "2px solid #f55756");
							$("#form-confir-password").css("border-bottom", "2px solid #f55756");
							validacionInformacionGeneral = false;
							valCorrectaFormatoPassword = false;
							mensaje = mensaje + "<br/> *Formato de contraseñas";
						}else{
							$("#form-pasword").css("border", "1px solid #bdbdbd");
							$("#form-confir-password").css("border", "1px solid #bdbdbd");
						}
					}
				}else{
					$("#form-pasword").css("border", "1px solid #bdbdbd");
				}
				
			}
			
			if(valCorrectaFormatoPassword){
				if($scope.informacionRegistro.confirContrasena === "" || $scope.informacionRegistro.confirContrasena === undefined){
					$("#form-confir-password").css("border-bottom", "2px solid #f55756");
					validacionInformacionGeneral = false;
					mensaje = mensaje + "<br/> *Confirmación de contraseña";
				}else{
					var password = $("#form-pasword").val();
			    	var confirPassword =  $("#form-confir-password").val();
			    	if(password !== confirPassword){
			    		$("#form-pasword").css("border-bottom", "2px solid #f55756");
			    		$("#form-confir-password").css("border-bottom", "2px solid #f55756");
			    		validacionInformacionGeneral = false;
			    		mensaje = mensaje + "<br/> *Contraseña";
						mensaje = mensaje + "<br/> *Confirmación de contraseña";
			    		toastr.info("¡Las contraseñas no coinciden!");
			    	}else{
			    		$("#form-pasword").css("border", "1px solid #bdbdbd");
			    		$("#form-confir-password").css("border", "1px solid #bdbdbd");
			    	}
				}
			}
			
			if($scope.informacionRegistro.nombre === "" || $scope.informacionRegistro.nombre === undefined){
				$("#form-nombres").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Nombre";
			}else{
				$("#form-nombres").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.informacionRegistro.apellidoPaterno === "" || $scope.informacionRegistro.apellidoPaterno === undefined){
				$("#form-a-paterno").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Apellido paterno";
			}else{
				$("#form-a-paterno").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.informacionRegistro.apellidoMaterno === "" || $scope.informacionRegistro.apellidoMaterno === undefined){
				$("#form-a-materno").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Apellido materno";
			}else{
				$("#form-a-materno").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.informacionRegistro.posicion === "" || $scope.informacionRegistro.posicion === undefined){
				$("#form-posicion").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Posición";
			}else{
				$("#form-posicion").css("border", "1px solid #bdbdbd");
			}

			if($scope.informacionRegistro.curp === "" || $scope.informacionRegistro.curp === undefined){
				$("#form-curp").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *CURP";
			}else{
				if($scope.tabInformacionVL_CURP){
					if($scope.informacionRegistro.curp.length == 18){
						$("#form-curp").css("border", "1px solid #bdbdbd");
					}else{
						$("#form-curp").css("border-bottom", "2px solid #f55756");
						validacionInformacionGeneral = false;
						mensaje = mensaje + "<br/> *Formato de la CURP (18 dígitos)";
					}
				}else{
					$("#form-curp").css("border", "1px solid #bdbdbd");
				}
				
			}
			
			if($scope.informacionRegistro.rfc === "" || $scope.informacionRegistro.rfc === undefined){
				$("#form-rfc").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *RFC";
			}else{
				if($scope.tabInformacionVL_RFC){
					if($scope.informacionRegistro.rfc.length == 12 || $scope.informacionRegistro.rfc.length == 13){
						$("#form-rfc").css("border", "1px solid #bdbdbd");
					}else{
						$("#form-rfc").css("border-bottom", "2px solid #f55756");
						validacionInformacionGeneral = false;
						mensaje = mensaje + "<br/> *Formato del RFC (12-13 dígitos)";
					}
				}else{
					$("#form-rfc").css("border", "1px solid #bdbdbd");
				}
			}
			
			if($scope.informacionRegistro.telefonoContacto === "" || $scope.informacionRegistro.telefonoContacto === undefined){
				$("#form-telefono-contacto").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Teléfono de contacto";
			}else{
				if($scope.validarTamDatos){
					if($scope.informacionRegistro.telefonoContacto.length == 10){
						$("#form-telefono-contacto").css("border", "1px solid #bdbdbd");
					}else{
						$("#form-telefono-contacto").css("border-bottom", "2px solid #f55756");
						validacionInformacionGeneral = false;
						mensaje = mensaje + "<br/> *Formato del teléfono (10 dígitos)";
					}
				}else{
					$("#form-telefono-contacto").css("border", "1px solid #bdbdbd");
				}
			}
			
			if($scope.informacionRegistro.correo === "" || $scope.informacionRegistro.correo === undefined){
				$("#form-correo").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Correo electrónico";
			}else{
				if($("#form-correo").val().indexOf('@', 0) == -1 || $("#form-correo").val().indexOf('.', 0) == -1) {
					$("#form-correo").css("border-bottom", "2px solid #f55756");
					validacionInformacionGeneral = false;
					toastr.info("¡Valida el formato del correo electrónico!");
				}else{
					$("#form-correo").css("border", "1px solid #bdbdbd");
				}
			}

			if($scope.informacionRegistro.fechaIngreso === "" || $scope.informacionRegistro.fechaIngreso === undefined || $scope.informacionRegistro.fechaIngreso === null){
				$("#form-fechaIngresoRegistro").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Fecha de ingreso";
			}else{
				$("#form-fechaIngresoRegistro").css("border", "1px solid #bdbdbd");
			}
			
			if($("#sexo_select_registro").val() === "" || $("#sexo_select_registro").val() === undefined || $("#sexo_select_registro").val() === null){
				$("#sexo_select_registro").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Sexo";
			}else{
				$("#sexo_select_registro").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.tabInformacionVW_CUADRILLA){
				if($scope.informacionRegistro.cuadrilla === "" || $scope.informacionRegistro.cuadrilla === undefined || $scope.informacionRegistro.cuadrilla === null){
					$("#cuadrilla_select_registro").css("border-bottom", "2px solid #f55756");
					validacionInformacionGeneral = false;
					mensaje = mensaje + "<br/> *Cuadrilla";
				}else{
					$("#cuadrilla_select_registro").css("border", "1px solid #bdbdbd");
				}
			}
		}
		
		//PESTAÑA INTERVENCIONES
		if($scope.tabIntervenciones){
			if($scope.listaIntervencionesSeleccionadas == "" || $scope.listaIntervencionesSeleccionadas == undefined || $scope.listaIntervencionesSeleccionadas == null){
				validacionIntervenciones = false;
				mensaje = mensaje + "<br/> *Intervención(es)";
				$("#labelIntervencionesSeleccionadas").css("color", "#f55756");
				$("#contenedorIntervencionesRegistro").css("border", "#f55756 solid 1px");
			}else{
				$("#labelIntervencionesSeleccionadas").css("color", "rgb(70, 88, 107)");
				$("#contenedorIntervencionesRegistro").css("border", "white solid 0px");
			}
		}
		
		//PESTAÑA ÁRBOL
		if($scope.tabArbol){
			if($scope.listaGeografiasSeleccionadas == "" || $scope.listaGeografiasSeleccionadas == undefined || $scope.listaGeografiasSeleccionadas == null){
				validacionArbol = false;
				mensaje = mensaje + "<br/> *Geografía(s)";
				$("#labelGeografiasSeleccionadas").css("color", "#f55756");
				$("#contenedorGeografiasRegistro").css("border", "#f55756 solid 1px");
			}else{
				$("#labelGeografiasSeleccionadas").css("color", "rgb(70, 88, 107)");
				$("#contenedorGeografiasRegistro").css("border", "white solid 0px");
			}
		}
		
		//CHECK SI EL PUESTO SELECCIONADO ES TÉCNICO NO VALIDA (TÉCNICOS Y PERMISOS) Y SI NO ES TÉCNICO SI VALIDA DICHA INFORMACIÓN
		if($scope.isTecnico == false){
			//PESTAÑA ACCESOS (PERMISOS)
    		if($scope.tabAccesos){
    			if($scope.listaPermisosSeleccionados == "" || $scope.listaPermisosSeleccionados == undefined || $scope.listaPermisosSeleccionados == null){
        			validacionAccesos = false;
        			mensaje = mensaje + "<br/> *Permiso(s)";
        			$("#labelPermisosSeleccionadas").css("color", "#f55756");
        			$("#contenedorPermisosRegistro").css("border", "#f55756 solid 1px");
        		}else{
        			$("#labelPermisosSeleccionadas").css("color", "rgb(70, 88, 107)");
        			$("#contenedorPermisosRegistro").css("border", "white solid 0px");
        		}
    		}
    		
    		//PESTAÑA TÉCNICOS
    		//POR EL MOMENTO SE QUITA LA VALIDACIÓN DE TÉCNICOS (NO ES OBLIGATORIA LA SELECCIÓN)
    		
		}else{
			//PESTAÑA DESPACHOS
        	if($scope.tabDespachos){
        		var checkDes = 0;
        		angular.forEach($scope.listaDespachos,function(despacho,index){
        			if(despacho.checkedOpcion == true){
        				checkDes++;
        			}
        		});
        		if(checkDes < 1){
        			validacionDespachos = false;
        			mensaje = mensaje + "<br/> *Despacho(s)";
        			$("#labelDespachosSeleccionados").css("color", "#f55756");
        			$("#contenedorDespachosRegistro").css("border", "#f55756 solid 1px");
        		}else{
        			$("#labelTecnicosSeleccionadas").css("color", "rgb(70, 88, 107)");
        			$("#contenedorDespachosRegistro").css("border", "white solid 0px");
        		}
        	}
		}
		
		//PESTAÑA PERFILES
		if($scope.tabPerfiles){
			if($('#arbolIntervencionPerfilRegistro').jstree("get_selected", true).length < 1){
				validacionPerfiles = false;
				mensaje = mensaje + "<br/> *Perfil(es)";
				$("#labelIntervencionesPerfilesSeleccionados").css("color", "#f55756");
				$("#contenedorIntervencionesPerfilesRegistro").css("border", "#f55756 solid 1px");
			}else{
				$("#labelIntervencionesPerfilesSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorIntervencionesPerfilesRegistro").css("border", "white solid 0px");
			}
		}
		
		//PESTAÑA INGENIEROS
//    	if($scope.tabIngenieros){
//    		var checkIngs = 0;
//    		angular.forEach($scope.listaIngenieros,function(ingeniero,index){
//    			if(ingeniero.checkedOpcion == true){
//    				checkIngs++;
//    			}
//    		});
//    		if(checkIngs < 1){
//    			validacionIngenieros = false;
//    			mensaje = mensaje + "<br/> *Ingeniero(s)";
//    			$("#labelIngenierosSeleccionados").css("color", "#f55756");
//    			$("#contenedorIngenierosRegistro").css("border", "#f55756 solid 1px");
//    		}else{
//    			$("#labelIngenierosSeleccionados").css("color", "rgb(70, 88, 107)");
//    			$("#contenedorIngenierosRegistro").css("border", "white solid 0px");
//    		}
//    	}
		
		//PESTAÑA SUPERVISORES CENTRALIZADOS
    	if($scope.tabSupervisorCentralizado){
    		var checkSupCentralizados = 0;
    		angular.forEach($scope.listaSupervisoresCentralizados,function(supervisorCentralizado,index){
    			if(supervisorCentralizado.checkedOpcion == true){
    				checkSupCentralizados++;
    			}
    		});
    		if(checkSupCentralizados < 1){
    			validacionSupervisorCentralizado = false;
    			mensaje = mensaje + "<br/> *Supervisor(es) centralizado(s)";
    			$("#labelSupervisorCentralizadoSeleccionados").css("color", "#f55756");
    			$("#contenedorSupervisorCentralizadoRegistro").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelSupervisorCentralizadoSeleccionados").css("color", "rgb(70, 88, 107)");
    			$("#contenedorSupervisorCentralizadoRegistro").css("border", "white solid 0px");
    		}
    	}
    	
    	//PESTAÑA COUCHS
    	if($scope.tabCouchDespacho){
    		var checkCouchs = 0;
    		angular.forEach($scope.listaCouchsDespachos,function(couch,index){
    			if(couch.checkedOpcion == true){
    				checkCouchs++;
    			}
    		});
    		if(checkCouchs < 1){
    			validacionCouchDespacho = false;
    			mensaje = mensaje + "<br/> *Couch(s)";
    			$("#labelCouchsSeleccionados").css("color", "#f55756");
    			$("#contenedorCouchsRegistro").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelCouchsSeleccionados").css("color", "rgb(70, 88, 107)");
    			$("#contenedorCouchsRegistro").css("border", "white solid 0px");
    		}
    	}
    	
    	//PESTAÑA SUPERVISORES
    	if($scope.tabSupervisor){
    		var checkSupervisores = 0;
    		angular.forEach($scope.listaSupervisores,function(supervisor,index){
    			if(supervisor.checkedOpcion == true){
    				checkSupervisores++;
    			}
    		});
    		if(checkSupervisores < 1){
    			validacionSupervisor = false;
    			mensaje = mensaje + "<br/> *Supervisor(es)";
    			$("#labelSupervisoresSeleccionados").css("color", "#f55756");
    			$("#contenedorSupervisoresRegistro").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelSupervisoresSeleccionados").css("color", "rgb(70, 88, 107)");
    			$("#contenedorSupervisoresRegistro").css("border", "white solid 0px");
    		}
    	}
    	
    	//PESTAÑA CONFIRMAR USUARIO
    	if($scope.tabConfirmacion){
    		if($scope.informacionRegistro.ciudadNatal == "" || $scope.informacionRegistro.ciudadNatal == undefined){
        		$(".ciudadNatal").css("color", "#f55756");
        		validacion = false;
    			mensaje = mensaje + "<br/> *Ciudad natal";
        	}else{
        		$(".ciudadNatal").css("color", "#7c7c7d");
        	}
    	}
		
		//VALIDACIÓN Y ACTIVACIÓN DE PESTAÑAS
		if(validacionInformacionGeneral == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-informacion-tab").addClass("active");
			$("#pills-informacion").addClass("active show");
		}else if(validacionIntervenciones == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-intervencion-tab").addClass("active");
			$("#pills-intervencion").addClass("active show");
		}else if(validacionArbol == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$('#arbolGeografiaRegistro').jstree("destroy");
	    	$('#arbolGeografiaRegistro').jstree("deselect_all");
			$scope.mostrarArbolGeografiaRegistro();
			$("#pills-arbol-tab").addClass("active");
			$("#pills-arbol").addClass("active show");
		}else if(validacionAccesos == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-accesos-tab").addClass("active");
			$("#pills-accesos").addClass("active show");
		}else if(validacionTecnicos == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-tecnico-tab").addClass("active");
			$("#pills-tecnico").addClass("active show");
		}else if(validacionDespachos == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-despacho-tab").addClass("active");
			$("#pills-despacho").addClass("active show");
		}else if(validacionPerfiles == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-perfiles-tab").addClass("active");
			$("#pills-perfiles").addClass("active show");
		}else if(validacionIngenieros == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-ingenieros-tab").addClass("active");
			$("#pills-ingenieros").addClass("active show");
		}else if(validacionSupervisorCentralizado == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-supervisor-centralizado-tab").addClass("active");
			$("#pills-supervisor-centralizado").addClass("active show");
		}else if(validacionCouchDespacho == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-couch-despacho-tab").addClass("active");
			$("#pills-couch-despacho").addClass("active show");
		}else if(validacionSupervisor == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-supervisor-tab").addClass("active");
			$("#pills-supervisor").addClass("active show");
		}else{
			//...
		}
		
		//SI EXISTE ALGÚN CAMPO FALTANTE, MUESTRA EL MENSAJE
		if(validacion == false){
			toastr.info(mensaje);
		}
		
		//REGRESA LA RESPUESTA BOLEANA
		return validacion;
	}
    
    //CUANDO SELECCCIONE UNA CIUDAD NATAL LOS RADIOS REGRESAN A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA CONFIRMACIÓN REGISTRO USUARIO
    $scope.asignarCiudadNatalRegistro = function() {
    	$(".ciudadNatal").css("color", "#7c7c7d");
	}
    
    //VALIDACIÓN DE CAMPOS INGRESADOS CON LA CLASE 'inputFormulario' - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $(".inputFormulario").keyup(function() {
		var input = $(this).attr("id");
		
		if( $(this).val()  === "" || $(this).val() === undefined ){
			$("#"+input).css("border-bottom", "2px solid #f55756");
		}else{
			$("#"+input).css("border", "1px solid #bdbdbd");
		}
		
		if(input === "form-correo"){
			if($("#"+input).val().indexOf('@', 0) == -1 || $("#"+input).val().indexOf('.', 0) == -1) {
				$("#"+input).css("border-bottom", "2px solid #f55756");
			}
		}
		
	});
    
    //VALIDACIÓN DE CONTRASEÑAS (QUE SEAN IGUALES) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#form-confir-password").change(function() {
    	var password = $("#form-pasword").val();
    	var confirPassword =  $("#form-confir-password").val();
    	if(password !== confirPassword){
    		$("#form-pasword").css("border-bottom", "2px solid #f55756");
    		$("#form-confir-password").css("border-bottom", "2px solid #f55756");
    		toastr.info("¡Las contraseñas no coinciden!");
    	}else{
    		$("#form-pasword").css("border", "1px solid #bdbdbd");
    		$("#form-confir-password").css("border", "1px solid #bdbdbd");
    	}
    });
    
    //CUANDO SELECCCIONE UN PUESTO EL INPUT REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#sexo_select_registro").change(function() {
    	$("#sexo_select_registro").css("border", "1px solid #bdbdbd");
    });
    
    //CUANDO SELECCCIONE UNA COMPANÍA EL INPUT REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#compania_select_registro").change(function() {
    	$("#compania_select_registro").css("border", "1px solid #bdbdbd");
    });
    
    //CUANDO SELECCCIONE UNA FECHA VÁLIDA EL INPUT REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#form-fechaIngresoRegistro").change(function() {
    	$("#form-fechaIngresoRegistro").css("border", "1px solid #bdbdbd");
    });
    
    //MÉTODO PARA SELECCIONAR O DESELECCIONAR TODAS LAS OPCIONES DE LOS MULTISELECTS - VISTA CONSULTA USUARIOS
    $scope.seleccionTodos = function (paramFiltroParent, banderaChecked, nombreLista) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = banderaChecked
            return e;
        });
        if(nombreLista == "companias"){
        	$('#txtCompania').val( banderaChecked == true ? $scope.listaSeleccionSelectGral(paramFiltroParent) : "");
        	if(banderaChecked){
        		$("#txtCompania").css("border-bottom", "2px solid #d9d9d9");
        	}
        }else if(nombreLista == "puestos"){
        	$('#txtPuesto').val( banderaChecked == true  ? $scope.listaSeleccionSelectGral(paramFiltroParent) : "");
        	if(banderaChecked){
        		$("#txtPuesto").css("border-bottom", "2px solid #d9d9d9");
        	}
        }
    }
    
    //CREA EL TEXTO CON LAS GEOGRAFÍAS SELECCIONADAS Y SE MUESTRA EN EL INPUT DE GEOGRAFÍASCONSULTA - VISTA CONSULTA USUARIOS
    $scope.btnAceptarModalGeografiaConsulta = function() {
    	var geografias = $('#arbolGeografiaConsulta').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiasConsulta').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiasConsulta").css("border-bottom", "2px solid #d9d9d9");
		}
	}
    
    //SE CREA EL TEXTO CON LAS OPCIONES SELECCIONADAS DE LOS MULTISELECT´S - VISTA CONSULTA USUARIOS
    $scope.listaSeleccionSelectGral = function(lista) {
    	var texto = "";
    	angular.forEach(lista,function(list,index){
			if(list.checkedOpcion){
				if(texto !== ""){
					texto = (texto + ", " + list.descripcion);
				}else{
					texto = (list.descripcion);
				}
			}
		});
    	return texto;
	}
    
    //LLAMA AL MÉTODO 'listaSeleccionSelectGral(lista)' PARA MANDAR EL TEXTO DEVUELTO AL INPUT DEL MULTISELECT DE PUESTOS - VISTA CONSULTA USUARIOS
    $scope.puestoSeleccion = function() {
    	$('#txtPuesto').val($scope.listaSeleccionSelectGral($scope.listaPuestos));
    	$("#txtPuesto").css("border-bottom", "2px solid #d9d9d9");
	}
	
    //LLAMA AL MÉTODO 'listaSeleccionSelectGral(lista)' PARA MANDAR EL TEXTO DEVUELTO AL INPUT DEL MULTISELECT DE COMPAÑÍAS - VISTA CONSULTA USUARIOS
	$scope.companiaSeleccion = function() {
    	$('#txtCompania').val($scope.listaSeleccionSelectGral($scope.listaCompanias));
    	$("#txtCompania").css("border-bottom", "2px solid #d9d9d9");
	}
	
	//
	$scope.cuadrillaSeleccion = function(cuadrillaSeleccionada) {
    	$('#cuadrilla_select_registro').val(cuadrillaSeleccionada.descripcion);
    	$("#cuadrilla_select_registro").css("border-bottom", "2px solid #d9d9d9");
//		angular.forEach($scope.listaCuadrillas,function(cuadrillaPadre,index){
//			angular.forEach(cuadrillaPadre.cuadrillasHijas,function(cuadrillaHija,index){
//				if(cuadrillaHija.id == cuadrillaSeleccionada.id){
//					cuadrillaHija.checkedOpcion = 1;
//				}else{
//					cuadrillaHija.checkedOpcion = 0;
//				}
//			});
//		});
	}
	
	//VERIFICA EL ESTADO DEL CHECK PARA COLOCAR 'SI' O 'NO', SEGÚN EL ESTADO - PESTAÑA INFORMACIÓN REGISTRO USUARIO
	$scope.cambiarCheckAsignacionAutomatica = function() {
		if($("#form-asignacionAutomatica").prop('checked')){
			$("#checkAsignacionAutomatica").text("  SI");
		}else{
			$("#checkAsignacionAutomatica").text("  NO");
		}
	}
	
	//SELECCIONA O DESELECCIONA EL DESPACHO ELEGIDO - PESTAÑA DESPACHOS REGISTRO USUARIO
	$scope.seleccionarDespachoRegistro = function(despachoSeleccionado) {
		
		var totalDesSeleccionados = $scope.listaDespachos.filter(des => des.checkedOpcion == true).length;
		if(!$scope.tabDespachosVL_MULTISELECCION && totalDesSeleccionados >0){
			if(despachoSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 despacho!');
			}
			despachoSeleccionado.checkedOpcion = false;
		}else{
			if(despachoSeleccionado.checkedOpcion){
				despachoSeleccionado.checkedOpcion = false;
			}else{
				despachoSeleccionado.checkedOpcion = true;
				$("#labelDespachosSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorDespachosRegistro").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaDespachos,function(despacho,index){
			if(despacho.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosDespachoRegistro").prop("checked",true);
		}else{
			$("#checkTotdosDespachoRegistro").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS DESPACHOS - PESTAÑA DESPACHOS REGISTRO USUARIO
	$scope.seleccionarTodosDespachosRegistro = function() {
		if($scope.tabDespachosVL_MULTISELECCION){
			var check;
			if($("#checkTotdosDespachoRegistro").prop('checked')){
				check = true;
				$("#labelDespachosSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorDespachosRegistro").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaDespachos,function(despacho,index){
				despacho.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosDespachoRegistro").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 despacho!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL TÉCNICO ELEGIDO - PESTAÑA TÉCNICOS REGISTRO USUARIO
	$scope.seleccionarTecnicoRegistro = function(tecnicoSeleccionado) {
		
		var totalTecSeleccionados = $scope.listaTecnicos.filter(tec => tec.checkedOpcion == true).length;
		if(!$scope.tabTecnicosVL_MULTISELECCION && totalTecSeleccionados >0){
			if(tecnicoSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 técnico!');
			}
			tecnicoSeleccionado.checkedOpcion = false;
		}else{
			if(tecnicoSeleccionado.checkedOpcion){
				tecnicoSeleccionado.checkedOpcion = false;
			}else{
				tecnicoSeleccionado.checkedOpcion = true;
				$("#labelTecnicosSeleccionadas").css("color", "rgb(70, 88, 107)");
				$("#contenedorTecnicosRegistro").css("border", "white solid 0px");
			}
		}
		
		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaTecnicos,function(tecnico,index){
			if(tecnico.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosTecnicosRegistro").prop("checked",true);
		}else{
			$("#checkTotdosTecnicosRegistro").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS TÉCNICOS - PESTAÑA TÉCNICOS REGISTRO USUARIO
	$scope.seleccionarTodosTecnicosRegistro = function() {
		if($scope.tabTecnicosVL_MULTISELECCION){
			var check;
			if($("#checkTotdosTecnicosRegistro").prop('checked')){
				check = true;
				$("#labelTecnicosSeleccionadas").css("color", "rgb(70, 88, 107)");
				$("#contenedorTecnicosRegistro").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaTecnicos,function(tecnico,index){
				tecnico.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosTecnicosRegistro").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 técnico!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL INGENIERO ELEGIDO - PESTAÑA INGENIEROS REGISTRO USUARIO
	$scope.seleccionarIngenieroRegistro = function(ingenieroSeleccionado) {
		
		var totalIngsSeleccionados = $scope.listaIngenieros.filter(ing => ing.checkedOpcion == true).length;
		if(!$scope.tabIngenierosVL_MULTISELECCION && totalIngsSeleccionados >0){
			if(ingenieroSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 ingeniero!');
			}
			ingenieroSeleccionado.checkedOpcion = false;
		}else{
			if(ingenieroSeleccionado.checkedOpcion){
				ingenieroSeleccionado.checkedOpcion = false;
			}else{
				ingenieroSeleccionado.checkedOpcion = true;
				$("#labelIngenierosSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorIngenierosRegistro").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaIngenieros,function(ingeniero,index){
			if(ingeniero.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosIngenieroRegistro").prop("checked",true);
		}else{
			$("#checkTotdosIngenieroRegistro").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS INGENIEROS - PESTAÑA INGENIEROS REGISTRO USUARIO
	$scope.seleccionarTodosIngenierosRegistro = function() {
		if($scope.tabIngenierosVL_MULTISELECCION){
			var check;
			if($("#checkTotdosIngenieroRegistro").prop('checked')){
				check = true;
				$("#labelIngenierosSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorIngenierosRegistro").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaIngenieros,function(ingeniero,index){
				ingeniero.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosIngenieroRegistro").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 ingeniero!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL SUPERVISOR CENTRALIZADO ELEGIDO - PESTAÑA SUPERVISORES CENTRALIZADOS REGISTRO USUARIO
	$scope.seleccionarSupervisorCentralizadoRegistro = function(despachoCentralizadoSeleccionado) {
		
		var totalSupCenSeleccionados = $scope.listaSupervisoresCentralizados.filter(supCentr => supCentr.checkedOpcion == true).length;
		if(!$scope.tabSupervisorCentralizadoVL_MULTISELECCION && totalSupCenSeleccionados >0){
			if(despachoCentralizadoSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 supervisor centralizado!');
			}
			despachoCentralizadoSeleccionado.checkedOpcion = false;
		}else{
			if(despachoCentralizadoSeleccionado.checkedOpcion){
				despachoCentralizadoSeleccionado.checkedOpcion = false;
			}else{
				despachoCentralizadoSeleccionado.checkedOpcion = true;
				$("#labelSupervisorCentralizadoSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorSupervisorCentralizadoRegistro").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaSupervisoresCentralizados,function(supervisorCentralizado,index){
			if(supervisorCentralizado.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosSupervisorCentralizadoRegistro").prop("checked",true);
		}else{
			$("#checkTotdosSupervisorCentralizadoRegistro").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS SUPERVISORES CENTRALIZADOS - PESTAÑA SUPERVISORES CENTRALIZADOS REGISTRO USUARIO
	$scope.seleccionarTodosSupervisoresCentralizadosRegistro = function() {
		if($scope.tabSupervisorCentralizadoVL_MULTISELECCION){
			var check;
			if($("#checkTotdosSupervisorCentralizadoRegistro").prop('checked')){
				check = true;
				$("#labelSupervisorCentralizadoSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorSupervisorCentralizadoRegistro").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaSupervisoresCentralizados,function(supervisorCentralizado,index){
				supervisorCentralizado.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosSupervisorCentralizadoRegistro").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 supervisor centralizado!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL COUCH ELEGIDO - PESTAÑA COUCHS REGISTRO USUARIO
	$scope.seleccionarCouchRegistro = function(couchSeleccionado) {
		
		var totalCouchsSeleccionados = $scope.listaCouchsDespachos.filter(couch => couch.checkedOpcion == true).length;
		if(!$scope.tabCouchDespachoVL_MULTISELECCION && totalCouchsSeleccionados >0){
			if(couchSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 couch!');
			}
			couchSeleccionado.checkedOpcion = false;
		}else{
			if(couchSeleccionado.checkedOpcion){
				couchSeleccionado.checkedOpcion = false;
			}else{
				couchSeleccionado.checkedOpcion = true;
				$("#labelCouchsSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorCouchsRegistro").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaCouchsDespachos,function(couch,index){
			if(couch.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosCouchRegistro").prop("checked",true);
		}else{
			$("#checkTotdosCouchRegistro").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS COUCHS - PESTAÑA COUCHS REGISTRO USUARIO
	$scope.seleccionarTodosCouchsRegistro = function() {
		if($scope.tabCouchDespachoVL_MULTISELECCION){
			var check;
			if($("#checkTotdosCouchRegistro").prop('checked')){
				check = true;
				$("#labelCouchsSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorCouchsRegistro").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaCouchsDespachos,function(couch,index){
				couch.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosCouchRegistro").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 couch!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL SUPERVISOR ELEGIDO - PESTAÑA SUPERVISORES REGISTRO USUARIO
	$scope.seleccionarSupervisorRegistro = function(supervisorSeleccionado) {
		
		var totalSupSeleccionados = $scope.listaSupervisores.filter(sup => sup.checkedOpcion == true).length;
		if(!$scope.tabSupervisorVL_MULTISELECCION && totalSupSeleccionados >0){
			if(supervisorSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 supervisor!');
			}
			supervisorSeleccionado.checkedOpcion = false;
		}else{
			if(supervisorSeleccionado.checkedOpcion){
				supervisorSeleccionado.checkedOpcion = false;
			}else{
				supervisorSeleccionado.checkedOpcion = true;
				$("#labelSupervisoresSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorSupervisoresRegistro").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaSupervisores,function(supervisor,index){
			if(supervisor.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosSupervisorRegistro").prop("checked",true);
		}else{
			$("#checkTotdosSupervisorRegistro").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS SUPERVISORES - PESTAÑA SUPERVISORES REGISTRO USUARIO
	$scope.seleccionarTodosSupervisoresRegistro = function() {
		if($scope.tabSupervisorVL_MULTISELECCION){
			var check;
			if($("#checkTotdosSupervisorRegistro").prop('checked')){
				check = true;
				$("#labelSupervisoresSeleccionados").css("color", "rgb(70, 88, 107)");
				$("#contenedorSupervisoresRegistro").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaSupervisores,function(supervisor,index){
				supervisor.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosSupervisorRegistro").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 supervisor!');
		}
	}
	
	//MÉTODO PARA CONSULTAR LOS DESPACHOS A ASIGNAR AL TÉCNICO QUE SE REGISTRARÁ - PESTAÑA DESPACHOS REGISTRO USUARIO
	$scope.consultarDespachos = function() {
		$scope.listaDespachos = [];
		if($scope.listaIdsGeografiaCiudadNatalRegistro.length > 0){
			let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalRegistro, idTipoUsuario:[$scope.idPuestoDespacho]};
	    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
			swal.showLoading();
	    	$q.all([
	    		usuarioPIService.consultarUsuariosPorPuesto(params)
	        ]).then(function(results) {
	        	if (results[0].data !== undefined) {
	            	if(results[0].data.respuesta){
	            		if(results[0].data.result.usuarios !== null){
		            		if(results[0].data.result.usuarios.length > 0){
		            			$scope.listaDespachos = results[0].data.result.usuarios;
		            			$("#checkTotdosDespachoRegistro").prop("checked",false);
		            	    	angular.forEach($scope.listaDespachos,function(despacho,index){
		            	    		despacho.checkedOpcion = false;
		            			});
		            		}else{
		            			$scope.listaDespachos = [];
		            		}
	            		}else{
	            			$scope.listaDespachos = [];
	            		}
	            	}else{
	            		$scope.listaDespachos = [];
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	        	swal.close();
	        });
		}
	}
	
	//MÉTODO PARA CONSULTAR LOS TÉCNICOS A ASIGNAR AL USUARIO (QUE NO SEA TÉCNICO) QUE SE REGISTRARÁ - PESTAÑA TÉCNICOS REGISTRO USUARIO
	$scope.consultarTecnicos = function() {
		$scope.listaTecnicos = [];
		let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalRegistro, idTipoUsuario:[$scope.idPuestoTecnico]};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarUsuariosPorPuesto(params)
        ]).then(function(results) {
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
            		if(results[0].data.result.usuarios !== null){
	            		if(results[0].data.result.usuarios.length > 0){
	            			$scope.listaTecnicos = results[0].data.result.usuarios;
	            			$("#checkTotdosTecnicosRegistro").prop("checked",false);
	            	    	angular.forEach($scope.listaTecnicos,function(tecnico,index){
	            	    		tecnico.checkedOpcion = false;
	            			});
	            		}else{
	            			$scope.listaTecnicos = [];
	            		}
            		}else{
            			$scope.listaTecnicos = [];
            		}
            	}else{
            		$scope.listaTecnicos = [];
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
        	swal.close();
        });
	}
	
	//MÉTODO PARA CONSULTAR LOS INGENIEROS A ASIGNAR AL USUARIO QUE SE REGISTRARÁ - PESTAÑA INGENIEROS REGISTRO USUARIO
	$scope.consultarIngenieros = function() {
		$scope.listaIngenieros = [];
		let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalRegistro, idTipoUsuario:[$scope.idPuestoIngeniero]};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarUsuariosPorPuesto(params)
        ]).then(function(results) {
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
            		if(results[0].data.result.usuarios !== null){
	            		if(results[0].data.result.usuarios.length > 0){
	            			$scope.listaIngenieros = results[0].data.result.usuarios;
	            			$("#checkTotdosIngenieroRegistro").prop("checked",false);
	            	    	angular.forEach($scope.listaIngenieros,function(ingeniero,index){
	            	    		ingeniero.checkedOpcion = false;
	            			});
	            		}else{
	            			$scope.listaIngenieros = [];
	            		}
            		}else{
            			$scope.listaIngenieros = [];
            		}
            	}else{
            		$scope.listaIngenieros = [];
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
        	swal.close();
        });
	}
	
	//MÉTODO PARA CONSULTAR LOS SUPERVISORES CENTRALIZADOS A ASIGNAR AL USUARIO QUE SE REGISTRARÁ - PESTAÑA SUPERVISORES CENTRALIZADOS REGISTRO USUARIO
	$scope.consultarSupervisoresCentralizados = function() {
		$scope.listaSupervisoresCentralizados = [];
		let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalRegistro, idTipoUsuario:[$scope.idPuestoSupervisorCentralizado]};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarUsuariosPorPuesto(params)
        ]).then(function(results) {
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
            		if(results[0].data.result.usuarios !== null){
	            		if(results[0].data.result.usuarios.length > 0){
	            			$scope.listaSupervisoresCentralizados = results[0].data.result.usuarios;
	            			$("#checkTotdosSupervisorCentralizadoRegistro").prop("checked",false);
	            	    	angular.forEach($scope.listaSupervisoresCentralizados,function(supervisor,index){
	            	    		supervisor.checkedOpcion = false;
	            			});
	            		}else{
	            			$scope.listaSupervisoresCentralizados = [];
	            		}
            		}else{
            			$scope.listaSupervisoresCentralizados = [];
            		}
            	}else{
            		$scope.listaSupervisoresCentralizados = [];
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
        	swal.close();
        });
	}
	
	//MÉTODO PARA CONSULTAR LOS COUCH DESPACHO A ASIGNAR AL USUARIO QUE SE REGISTRARÁ - PESTAÑA COUCH REGISTRO USUARIO
	$scope.consultarCouchsDespacho = function() {
		$scope.listaCouchsDespachos = [];
		let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalRegistro, idTipoUsuario:[$scope.idPuestoCouchDespacho]};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarUsuariosPorPuesto(params)
        ]).then(function(results) {
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
            		if(results[0].data.result.usuarios !== null){
	            		if(results[0].data.result.usuarios.length > 0){
	            			$scope.listaCouchsDespachos = results[0].data.result.usuarios;
	            			$("#checkTotdosCouchRegistro").prop("checked",false);
	            	    	angular.forEach($scope.listaCouchsDespachos,function(couch,index){
	            	    		couch.checkedOpcion = false;
	            			});
	            		}else{
	            			$scope.listaCouchsDespachos = [];
	            		}
            		}else{
            			$scope.listaCouchsDespachos = [];
            		}
            	}else{
            		$scope.listaCouchsDespachos = [];
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
        	swal.close();
        });
	}
	
	//MÉTODO PARA CONSULTAR LOS SUPERVISORES A ASIGNAR AL USUARIO QUE SE REGISTRARÁ - PESTAÑA SUPERVISORES REGISTRO USUARIO
	$scope.consultarSupervisores = function() {
		$scope.listaSupervisores = [];
		let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalRegistro, idTipoUsuario:[$scope.idPuestoSupervisor]};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarUsuariosPorPuesto(params)
        ]).then(function(results) {
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
            		if(results[0].data.result.usuarios !== null){
	            		if(results[0].data.result.usuarios.length > 0){
	            			$scope.listaSupervisores = results[0].data.result.usuarios;
	            			$("#checkTotdosSupervisorRegistro").prop("checked",false);
	            	    	angular.forEach($scope.listaSupervisores,function(supervisor,index){
	            	    		supervisor.checkedOpcion = false;
	            			});
	            		}else{
	            			$scope.listaSupervisores = [];
	            		}
            		}else{
            			$scope.listaSupervisores = [];
            		}
            	}else{
            		$scope.listaSupervisores = [];
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
        	swal.close();
        });
	}
	
	//MÉTODO PARA VALIDAR SI EXISTEN TÉCNICOS O DESPACHOS SEGÚN SEA EL CASO. Y VALIDA SI POR LO MENOS SE SELECCIONÓ 1 GEOGRAFÍA - REGISTRO USUARIO
	$scope.revisionTecnicosDespachos = function(tab) {
		if($scope.informacionRegistro.geografias !== undefined){
			if($scope.informacionRegistro.geografias.length > 0){
				
				switch(tab){
	            	case "tabTecnicos":
	            		if($scope.listaTecnicos == ""){
							toastr.info('¡Actualmente no existen técnicos!');
						}
	            		break;
	            	case "tabDespachos":
	            		if($scope.listaDespachos == ""){
							toastr.info('¡Actualmente no existen despachos!');
						}
	            		break;
	            	case "tabIngenieros":
	            		if($scope.listaIngenieros == ""){
							toastr.info('¡Actualmente no existen ingenieros!');
						}
	            		break;
	            	case "tabSupervisorCentralizado":
	            		if($scope.listaSupervisoresCentralizados == ""){
							toastr.info('¡Actualmente no existen supervisores centralizados!');
						}
	            		break;
	            	case "tabCouchDespacho":
	            		if($scope.listaCouchsDespachos == ""){
							toastr.info('¡Actualmente no existen couchs de despacho!');
						}
	            		break;
	            	case "tabSupervisor":
	            		if($scope.listaSupervisores == ""){
							toastr.info('¡Actualmente no existen supervisores!');
						}
	            		break;
	    		}
				
			}else{
				toastr.info('¡Selecciona al menos una geografía!');
			}
		}else{
			toastr.info('¡Selecciona al menos una geografía!');
		}
	}
	
	//MÉTODO PARA LIMPIAR TODOS LOS CAMPOS DE TODAS LAS PESTAÑAS DEL REGISTRO DE USUARIO
	$scope.limpiarDatosRegistro = function() {
		$scope.tabInformacion = true;
		$scope.tabIntervenciones = false;
		$scope.tabArbol = false;
		$scope.tabAccesos = false;
		$scope.tabTecnicos = false;
		$scope.tabDespachos = false;
		$scope.tabPerfiles = false;
		$scope.tabIngenieros = false;
		$scope.tabSupervisorCentralizado = false;
		$scope.tabCouchDespacho = false;
		$scope.tabSupervisor = false;
		$scope.tabConfirmacion = false;
		$("#buscadorIntervencionRegistro").val("");
		$("#buscadorIntervencionPerfilRegistro").val("");
    	$("#buscadorGeografiaRegistro").val("");
    	$("#buscadorPermisosRegistro").val("");
    	$scope.buscarTecnico = "";
    	$scope.buscarTecnicoSeleccionado = "";
    	$scope.buscarDespacho = "";
    	$scope.buscarDespachoSeleccionado = "";
    	$scope.buscarCiudad = "";
		$scope.informacionRegistro.intervenciones = [];
		$scope.listaIntervencionesSeleccionadas = [];
		$scope.intervencionSelect = [];
		$scope.informacionRegistro.geografias = [];
		$scope.listaGeografiasSeleccionadas = [];
		$scope.geoSelect = [];
		$scope.informacionRegistro.permisos = [];
		$scope.listaPermisosSeleccionados = [];
		$scope.informacionRegistro.tecnicos = [];
		$scope.informacionRegistro.despachos = [];
		$scope.listaTecnicos = [];
		$scope.listaDespachos = [];
		$scope.listaIngenieros = [];
	    $scope.listaSupervisoresCentralizados = [];
	    $scope.listaCouchsDespachos = [];
	    $scope.listaSupervisores = [];
		$scope.listaCiudadNatalRegistro = [];
		$scope.listaIdsGeografiaCiudadNatalRegistro = [];
		$('#arbolIntervencionRegistro').jstree("deselect_all");
		$('#arbolIntervencionRegistro').jstree("close_all");
		$('#arbolIntervencionPerfilRegistro').jstree("deselect_all");
		$('#arbolIntervencionPerfilRegistro').jstree("close_all");
		$('#arbolGeografiaRegistro').jstree("destroy");
    	$('#arbolPermisoRegistro').jstree("deselect_all");
    	$('#arbolPermisoRegistro').jstree("close_all");
    	$("#arbolIntervencionRegistro").jstree('open_node', 0);
    	$("#arbolIntervencionPerfilRegistro").jstree('open_node', 0);
    	$("#arbolPermisoRegistro").jstree('open_node', 0);
    	$("#puesto_select_registro"). prop("selectedIndex",0);
    	$("#compania_select_registro"). prop("selectedIndex",0);
    	$("#sexo_select_registro"). prop("selectedIndex",0);
    	$("#checkTotdosTecnicosRegistro").prop("checked",false);
    	$("#imgFotoUsuario").attr("src","./resources/img/plantainterna/despacho/tecnicootasignada.png");
    	$scope.informacionRegistro.ciudadNatal = "";
    	$scope.informacionRegistro.asignacionAutomatica = 0;
		$scope.informacionRegistro = {};
		$scope.confirmacionRegistro = {};
		$scope.mostrarAccesos = false;
	    $scope.mostrarTecnicos = false;
	    $scope.mostrarDespacho = false;
	    $scope.isTecnico = false;
	    $scope.fileFotoUsuario = null;
		$scope.iniciarFechaRegistro();
		$("#pills-confirmar-tab").removeClass("active");
		$("#pills-confirmar").removeClass("active show");
		$("#pills-informacion-tab").addClass("active");
		$("#pills-informacion").addClass("active show");
		$("#opcion-alta-tab").removeClass("active");
		$("#opcion-alta").removeClass("active show");
		$("#opcion-consulta-tab").addClass("active");
		$("#opcion-consulta").addClass("active show");
	}
	
	//MÉTODO QUE SE MANDA A LLAMAR DESDE EL ARCHIVO "usuariosEditarController.js" CUANDO SE REALIZA LA MODIFICACIÓN DE UN USUARIO
	$scope.resetearTablaUsuariosConsulta = function() {
    	if (tablaUsuarios) {
			tablaUsuarios.destroy();
		}
		tablaUsuarios = $('#table-usuario-pi').DataTable({
			"processing": false,
			"ordering": false,
			"serverSide": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"data": [],
			"columns": [null, null, null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});
	}
	
	//MÉTODO PARA ELIMINAR USUARIOS (BAJA LÓGICA)
    eliminarUsuario = function(idUsuario) {
    	if($scope.configPermisoAccionEliminaUsuarios){
    		
    		var valPermitirAutoElimUsuario = true;
    		if($scope.validacionAutoElimUsuario == false){
    			valPermitirAutoElimUsuario = true;
    		}else{
    			if($("#idUsuarioSesion").val() == idUsuario){
    				valPermitirAutoElimUsuario = false;
    			}else{
    				valPermitirAutoElimUsuario = true;
    			}
    		}
    		
    		if(valPermitirAutoElimUsuario){
    			let params = {
            			idUsuarioQueModifica: idUsuario,
            			estatus: 0,
            			comentarios: "Se desactiva al Usuario"
        		};
            	
            	swal({
        	        title: "Se dará de baja al usuario",
        	        text: "\u00BFDesea eliminar el usuario?",
        	        type: "warning",
        	        input: 'text',
        	        inputPlaceholder: "Escribe el motivo",
        	        showCancelButton: true,
        	        confirmButtonColor: '#007bff',
        	        confirmButtonText: 'Si',
        	        cancelButtonText: 'Cancelar',
        	        allowOutsideClick: false
        	      }).then(function (motivo) {
        	        if (motivo) {
        	        	params.comentarios = motivo;
        	        	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
        	    		swal.showLoading();
        	        	$q.all([
        	        		usuarioPIService.eliminarUsuario(params)
        	            ]).then(function(results) {
        	            	swal.close();
        	            	if(results[0].data.respuesta){
        	            		swal("Correcto", "¡Usuario eliminado con éxito!", "success");
        	            		setTimeout(function() {
        	            			$scope.consultaUsuariosPorGeoCompPuestos();
        	    	        	}, 1000);
        	            	}else{
        	            		swal("Error", results[0].data.resultDescripcion, "error");
        	            	}
        	            });
        	        }else{
        	        	swal({type: "warning", title:"Aviso", text:"¡Ingrese el motivo de la baja!", showConfirmButton: false, allowOutsideClick: false, allowEscapeKey : false});
        	        	setTimeout(function() {
        	        		eliminarUsuario(idUsuario);
        	        	}, 2500);
        	        }
        	      }).catch(err => {

        	      });
    		}else{
    			//swal({type: "info", title:"Aviso", text:"No cuentas con el permiso de auto eliminación."});
    		}
    	}else{
    		swal({type: "warning", title:"Aviso", text:"No cuentas con el permiso de eliminación."});
    	}

	}
    
//    --------------------------------------------------------------------------------------------------------
//    ---------------------------FOTO---------------------------
    
    $scope.cargarFotoUsuarioRegistro = function (e) {
		let labelFile = "";
		if (e.target.files[0]) {
			$(labelFile).text(e.target.files[0].name);
			
			var nombreArchivo = "";
	    	if($scope.informacionRegistro.numEmpleado === "" || $scope.informacionRegistro.numEmpleado === undefined){
	    		nombreArchivo = "Foto perfil";
	    	}else{
	    		nombreArchivo = $scope.informacionRegistro.numEmpleado;
	    	}
			
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				let img = {
					"bucketId": $scope.bucketIdImg,
					"archivo": base64[1],
					"nombre": nombreArchivo
				}

				$scope.fileFotoUsuario = img;
				$("#imgFotoUsuario").attr("src", "data:image/jpeg;base64," + $scope.fileFotoUsuario.archivo);
				$("#fileFotoUsuario").val("");
				$scope.$apply();

			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
	}
    
    $scope.eliminarFotoUsuarioRegistro = function (e) {
    	$scope.fileFotoUsuario = null;
    	$("#imgFotoUsuario").attr("src", "./resources/img/plantainterna/despacho/tecnicootasignada.png");
    };
    
    $scope.obtenerFotoTomada = function() {
    	var foto = document.getElementById('canvas');
    	
    	var archivo = foto.toDataURL().split(",");
    	var nombreArchivo = "";
    	if($scope.informacionRegistro.numEmpleado === "" || $scope.informacionRegistro.numEmpleado === undefined){
    		nombreArchivo = "Foto perfil";
    	}else{
    		nombreArchivo = $scope.informacionRegistro.numEmpleado;
    	}

		let img = {
				"bucketId": $scope.bucketIdImg,
				"archivo": archivo[1],
				"nombre": nombreArchivo
			}

		$scope.fileFotoUsuario = img;
		$("#modalTomarFotoUsuario").modal('hide');
	}
    
    $scope.cerrarModalTomarFotoUsuario = function() {
    	$("#modalTomarFotoUsuario").modal('hide');
	}
	
    $("#pills-intervencion-tab").click(function() {
    	setTimeout(function (){
	        $("#buscadorIntervencionRegistro").focus();
	    }, 750);
    });
    
    $("#pills-perfiles-tab").click(function() {
    	setTimeout(function (){
	        $("#buscadorIntervencionPerfilRegistro").focus();
	    }, 750);
    });
    
    $("#pills-arbol-tab").click(function() {
    	setTimeout(function (){
	        $("#buscadorGeografiaRegistro").focus();
    	}, 750);
    });
    
    $("#pills-accesos-tab").click(function() {
    	setTimeout(function (){
	        $("#buscadorPermisosRegistro").focus();
    	}, 750);
    });
    
    $("#pills-tecnico-tab").click(function() {
    	setTimeout(function (){
	        $("#buscadorTecnicoRegistro").focus();
    	}, 750);
    });
    
    $("#pills-despacho-tab").click(function() {
    	setTimeout(function (){
	        $("#buscadorDespachoRegistro").focus();
    	}, 750);
    });
    
    $("#pills-ingenieros-tab").click(function() {
    	setTimeout(function (){
	        $("#buscadorIngenieroRegistro").focus();
    	}, 750);
    });
    
    //------------------------------------------------------------PENDIENTE HASTA QUE ESTÉN LOS TABS--------------------------------------------------------
//    $("#pills-supervisor-centralizado-tab").click(function() {
//    	setTimeout(function (){
//	        $("#buscadorIngenieroRegistro").focus();
//    	}, 750);
//    });
//    
//    $("#pills-couch-despacho-tab").click(function() {
//    	setTimeout(function (){
//	        $("#buscadorIngenieroRegistro").focus();
//    	}, 750);
//    });
//    
//    $("#pills-supervisor-tab").click(function() {
//    	setTimeout(function (){
//	        $("#buscadorIngenieroRegistro").focus();
//    	}, 750);
//    });
    //------------------------------------------------------------------------------------------------------------------------------------------------------
    
    $scope.tabRevisarPermisoCrearUsuario = function() {
    	if($scope.configPermisoAccionCreaUsuarios == false){
    		//swal({type: "warning", title:"Aviso", text:"¡No cuentas con el permiso de registro!"});
    	}
	}
    
    $scope.tabRevisarPermisoConsultarUsuarios = function() {
    	if($scope.configPermisoAccionConsultaUsuarios == false){
    		//swal({type: "warning", title:"Aviso", text:"¡No cuentas con el permiso de consulta!"});
    	}
	}
    
    $scope.quitarEspaciosNombreUsuario = function(campo) {
//    	$scope.informacionRegistro.usuario = $scope.informacionRegistro.usuario.replace(/ /g, "");
    	var valorCampo = $("#"+campo).val().replace(/ /g, "");
    	$("#"+campo).val(valorCampo);
	}
    
//    $(".formValExisteUsuario").blur(function() {
    $(".formValExisteUsuario").change(function() {
    	if($scope.informacionRegistro.numEmpleado !== undefined && $scope.informacionRegistro.numEmpleado !== "" &&
    	   $scope.informacionRegistro.usuario !== undefined && $scope.informacionRegistro.usuario !== "" &&
    	   $scope.informacionRegistro.nombre !== undefined && $scope.informacionRegistro.nombre !== "" &&
    	   $scope.informacionRegistro.apellidoPaterno !== undefined && $scope.informacionRegistro.apellidoPaterno !== "" &&
    	   $scope.informacionRegistro.apellidoMaterno !== undefined && $scope.informacionRegistro.apellidoMaterno !== "" &&
    	   $scope.informacionRegistro.curp !== undefined && $scope.informacionRegistro.curp !== "" &&
    	   $scope.informacionRegistro.rfc !== undefined && $scope.informacionRegistro.rfc !== ""){
    		
    		let paramsValExisteUser = {
    				nombre: $scope.informacionRegistro.nombre,
        			apellidoPaterno: $scope.informacionRegistro.apellidoPaterno,
        			apellidoMaterno: $scope.informacionRegistro.apellidoMaterno,
        			numeroEmpleado: $scope.informacionRegistro.numEmpleado,
        			usuario: $scope.informacionRegistro.usuario,
        			rfc: $scope.informacionRegistro.rfc,
        			curp: $scope.informacionRegistro.curp
    		}
    		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
    		swal.showLoading();
        	$q.all([
        		usuarioPIService.validarUsuarioExistente(paramsValExisteUser)
            ]).then(function(results) {
            	swal.close();
            	$scope.existeUsuarioValidacion = false;
            	$("#form-num-empleado").css("border", "1px solid #bdbdbd");
    			$("#form-usuario").css("border", "1px solid #bdbdbd");
    			$("#form-nombres").css("border", "1px solid #bdbdbd");
    			$("#form-a-paterno").css("border", "1px solid #bdbdbd");
    			$("#form-a-materno").css("border", "1px solid #bdbdbd");
    			$("#form-curp").css("border", "1px solid #bdbdbd");
    			$("#form-rfc").css("border", "1px solid #bdbdbd");
            	if(results[0].data.respuesta){
            		var respuesta = results[0].data.result;
            		var mensajeRespuesta = "";
            		
            		if(respuesta.usuarioCompleto){
            			$scope.existeUsuarioValidacion = true;
            			$("#form-num-empleado").css("border-bottom", "2px solid #f55756");
            			$("#form-usuario").css("border-bottom", "2px solid #f55756");
            			$("#form-nombres").css("border-bottom", "2px solid #f55756");
            			$("#form-a-paterno").css("border-bottom", "2px solid #f55756");
            			$("#form-a-materno").css("border-bottom", "2px solid #f55756");
            			$("#form-curp").css("border-bottom", "2px solid #f55756");
            			$("#form-rfc").css("border-bottom", "2px solid #f55756");
            			mensajeRespuesta = mensajeRespuesta + "\n El usuario ya existe.";
            		}else{
            			if(respuesta.usuarioFfm){
                			$scope.existeUsuarioValidacion = true;
                			$("#form-usuario").css("border-bottom", "2px solid #f55756");
                			mensajeRespuesta = mensajeRespuesta + "\n El usuario FFM ya existe.";
                		}
                		if(respuesta.curp){
                			$scope.existeUsuarioValidacion = true;
                			$("#form-curp").css("border-bottom", "2px solid #f55756");
                			mensajeRespuesta = mensajeRespuesta + "\n La CURP ya existe.";
                		}
            		}
            		
            		if($scope.existeUsuarioValidacion){
            			swal({type: "info", title:"Aviso", text:mensajeRespuesta});
            		}
            		
            	}else{
            		swal("Error", results[0].data.resultDescripcion, "error");
            	}
            });
    		
    	}
    });
    
    //-------------------------------------------------------------------    
    $scope.iniciarModuloUsuarios();
    
    // *** FIN CAMBIOS REYNEL *** 
	angular.element(document).ready(function () {
        $("#moduloUsuarios").addClass('active');
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
    });
}]);