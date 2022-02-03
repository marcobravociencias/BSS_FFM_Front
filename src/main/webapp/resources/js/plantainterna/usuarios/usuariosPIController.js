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
    $scope.listaIdsGeografiaCiudadNatalRegistro = [];
    $scope.informacionRegistro.asignacionAutomatica = 0;
    $scope.mostrarAccesos = false;
    $scope.mostrarTecnicos = false;
    $scope.mostrarDespacho = false;
    $scope.validarTamDatos = true;
    $scope.isTecnico = false;
    $scope.idPuestoTecnico = null;
    $scope.idPuestoDespacho = null;
    $scope.fileFotoUsuario = null;
	$scope.respaldoIntervenciones = [];
	
//	CONFIGURACIÓN DE TABS
	$scope.tabInformacion = true;
	$scope.tabIntervenciones = false;
	$scope.tabArbol = false;
	$scope.tabAccesos = false;
	$scope.tabTecnicos = false;
	$scope.tabDespachos = false;
	$scope.tabConfirmacion = false;
	
	$scope.tabInformacionVW_ASIG_AUTOMATICA = true;
	$scope.tabInformacionVL_RFC = true;
	$scope.tabInformacionVL_CURP = true;
	$scope.tabArbol_LB_N1 = "";
	$scope.tabArbol_LB_N2 = "";
	$scope.tabArbol_NV_GEOGRAFIA;
	$scope.tabIntervenciones_NV_INTERVENCIONES;
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
   
	angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
        $("#moduloUsuarios").addClass('active');
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
    });
	
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
    		usuarioPIService.consultaIntervenciones()
        ]).then(function(results) {
        	// *** CONFIGURACIÓN DESPACHO ***
        	var nivelUsuario; 				

			let resultConf= results[0].data.result
			if( resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves){
				let  llavesResult=results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;                    
				nivelUsuario= llavesResult.N_FILTRO_GEOGRAFIA;
				$scope.filtroGeografias = llavesResult.N_FILTRO_GEOGRAFIA;
				$scope.filtroIntervenciones = llavesResult.N_FILTRO_INTERVENCIONES;
				validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
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
	            			$scope.idPuestoTecnico = $scope.listaPuestos.filter(e => {return e.descripcion == "TECNICO"})[0];
	            		    $scope.idPuestoDespacho = $scope.listaPuestos.filter(e => {return e.descripcion == "DESPACHO"})[0];
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
    		        ]
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
        		if($scope.isTecnico){
            		$scope.consultarDespachos();
            	}else{
            		$scope.consultarTecnicos();
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
    	$('#arbolGeografiaRegistro').jstree("deselect_all");
    	$('#arbolPermisoRegistro').jstree("deselect_all");
    	$("#arbolIntervencionRegistro").jstree('close_all');
    	$("#arbolGeografiaRegistro").jstree('close_all');
    	$("#arbolPermisoRegistro").jstree('close_all');
    	$("#buscadorIntervencionRegistro").val("");
    	$("#buscadorGeografiaRegistro").val("");
    	$("#buscadorPermisosRegistro").val("");
    	$("#arbolIntervencionRegistro").jstree('open_node', 0);
    	$("#arbolPermisoRegistro").jstree('open_node', 0);
    	$scope.listaIntervencionesSeleccionadas = [];
    	$scope.listaGeografiasSeleccionadas = [];
    	$scope.informacionRegistro.geografias = [];
    	$scope.listaPermisosSeleccionados = [];
    	$scope.listaTecnicos = [];
        $scope.listaDespachos = [];
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
    	$scope.tabConfirmacion = false;
    	
    	var tabsPuestoSeleccionadoRegistro = $scope.listaPuestos.filter(e => {return e.id == $(this).val()})[0];
    	angular.forEach(tabsPuestoSeleccionadoRegistro.tabs,function(tab,index){
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
            	case "tabConfirmacion":
            		$scope.tabConfirmacion = true;
            		break;
    		}
		});
    	
    	$scope.tabInformacionVW_ASIG_AUTOMATICA = true;
    	$scope.tabInformacionVL_RFC = true;
    	$scope.tabInformacionVL_CURP = true;
    	$scope.tabArbol_LB_N1 = "";
    	$scope.tabArbol_LB_N2 = "";
    	$scope.tabIntervenciones_NV_INTERVENCIONES = null;
    	$scope.tabArbol_NV_GEOGRAFIA = null;
    	angular.forEach(tabsPuestoSeleccionadoRegistro.configuraciones,function(conf,index){
    		if(conf.llave == "tabInformacionVW_ASIG_AUTOMATICA"){
    			if(conf.valor == "false"){
    				$scope.tabInformacionVW_ASIG_AUTOMATICA = false;
    			}
    		}else if(conf.llave == "tabArbol_LB_N1"){
    			$scope.tabArbol_LB_N1 = conf.valor;
    		}else if(conf.llave == "tabArbol_LB_N2"){
    			$scope.tabArbol_LB_N2 = conf.valor;
    		}else if(conf.llave == "tabInformacionVL_RFC"){
    			if(conf.valor+"" == "true"){
    				$scope.tabInformacionVL_RFC = true;
    			}else if(conf.valor+"" == "false"){
    				$scope.tabInformacionVL_RFC = false;
    			}
    		}else if(conf.llave == "tabInformacionVL_CURP"){
    			if(conf.valor+"" == "true"){
    				$scope.tabInformacionVL_CURP = true;
    			}else if(conf.valor+"" == "false"){
    				$scope.tabInformacionVL_CURP = false;
    			}
    		}else if(conf.llave == "tabArbol_NV_GEOGRAFIA"){
    			$scope.tabArbol_NV_GEOGRAFIA = conf.valor;
    		}else if(conf.llave == "tabIntervenciones_NV_INTERVENCIONES"){
    			$scope.tabIntervenciones_NV_INTERVENCIONES = conf.valor;
    		}
    	});
    	
    	$scope.$apply();
    	$scope.cargarArbolIntervenciones();
    	$scope.mostrarArbolGeografiaRegistro();
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
            //$scope.listaIntervencionesRespaldo = angular.copy(intervencionesLista);
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
    			//DADO QUE EN EL SERVICIO SU VALIDACIÓN ES QUE VAYA UN CAMPO U OTRO (idOperarios O idDespachos), SE COMENTAN LAS SIGUIENTES 2 LÍNEAS
//    			idOperarios: $scope.isTecnico == true ? [] : $scope.informacionRegistro.tecnicos,
//    			idDespachos: $scope.isTecnico == true ? $scope.informacionRegistro.despachos : [],
    			permisos: $scope.isTecnico == true ? [] : $scope.informacionRegistro.permisos,
    			idAsignacionAutomatica: $scope.tabInformacionVW_ASIG_AUTOMATICA == true ? $scope.informacionRegistro.asignacionAutomatica : 0
    	};
    	
    	if($scope.isTecnico == true){
    		paramsRegistro.idDespachos = $scope.informacionRegistro.despachos;
    	}else{
    		paramsRegistro.idOperarios = $scope.informacionRegistro.tecnicos;
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
			
			if($scope.informacionRegistro.contrasena === "" || $scope.informacionRegistro.contrasena === undefined){
				$("#form-pasword").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Contraseña";
			}else{
				$("#form-pasword").css("border", "1px solid #bdbdbd");
			}
			
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
        			mensaje = mensaje + "<br/> *Despachos(s)";
        			$("#labelDespachosSeleccionados").css("color", "#f55756");
        			$("#contenedorDespachosRegistro").css("border", "#f55756 solid 1px");
        		}else{
        			$("#labelTecnicosSeleccionadas").css("color", "rgb(70, 88, 107)");
        			$("#contenedorDespachosRegistro").css("border", "white solid 0px");
        		}
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
	
	//VERIFICA EL ESTADO DEL CHECK PARA COLOCAR 'SI' O 'NO', SEGÚN EL ESTADO - PESTAÑA INFORMACIÓN REGISTRO USUARIO
	$scope.cambiarCheckAsignacionAutomatica = function() {
		if($("#form-asignacionAutomatica").prop('checked')){
			$("#checkAsignacionAutomatica").text("  SI");
		}else{
			$("#checkAsignacionAutomatica").text("  NO");
		}
	}
	
	//SELECCIONA O DESELECCIONA EL DESPACHO ELEGIDO - PESTAÑA DESPACHOS REGISTRO USUARIO
	$scope.seleccionarDespachoRegistro = function(desoachoSeleccionado) {
		if(desoachoSeleccionado.checkedOpcion){
			desoachoSeleccionado.checkedOpcion = false;
		}else{
			desoachoSeleccionado.checkedOpcion = true;
			$("#labelDespachosSeleccionados").css("color", "rgb(70, 88, 107)");
			$("#contenedorDespachosRegistro").css("border", "white solid 0px");
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
	}
	
	//SELECCIONA O DESELECCIONA EL TÉCNICO ELEGIDO - PESTAÑA TÉCNICOS REGISTRO USUARIO
	$scope.seleccionarTecnicoRegistro = function(tecnicoSeleccionado) {
		if(tecnicoSeleccionado.checkedOpcion){
			tecnicoSeleccionado.checkedOpcion = false;
		}else{
			tecnicoSeleccionado.checkedOpcion = true;
			$("#labelTecnicosSeleccionadas").css("color", "rgb(70, 88, 107)");
			$("#contenedorTecnicosRegistro").css("border", "white solid 0px");
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
	}
	
	//MÉTODO PARA CONSULTAR LOS DESPACHOS A ASIGNAR AL TÉCNICO QUE SE REGISTRARÁ - PESTAÑA DESPACHOS REGISTRO USUARIO
	$scope.consultarDespachos = function() {
		$scope.listaDespachos = [];
		if($scope.listaIdsGeografiaCiudadNatalRegistro.length > 0){
			let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalRegistro, idTipoUsuario:[$scope.idPuestoDespacho.id]};
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
		let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalRegistro, idTipoUsuario:[$scope.idPuestoTecnico.id]};
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
	
	//MÉTODO PARA VALIDAR SI EXISTEN TÉCNICOS O DESPACHOS SEGÚN SEA EL CASO. Y VALIDA SI POR LO MENOS SE SELECCIONÓ 1 GEOGRAFÍA - REGISTRO USUARIO
	$scope.revisionTecnicosDespachos = function() {
		if($scope.informacionRegistro.geografias !== undefined){
			if($scope.informacionRegistro.geografias.length > 0){
				if($scope.isTecnico){
					if($scope.listaDespachos == ""){
						toastr.info('¡Actualmente no existen despachos!');
					}
				}else{
					if($scope.listaTecnicos == ""){
						toastr.info('¡Actualmente no existen técnicos!');
					}
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
		$scope.tabConfirmacion = false;
		$("#buscadorIntervencionRegistro").val("");
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
		$scope.listaCiudadNatalRegistro = [];
		$scope.listaIdsGeografiaCiudadNatalRegistro = [];
		$('#arbolIntervencionRegistro').jstree("deselect_all");
		$('#arbolIntervencionRegistro').jstree("close_all");
//    	$('#arbolGeografiaRegistro').jstree("deselect_all");
//    	$('#arbolGeografiaRegistro').jstree("close_all");
		$('#arbolGeografiaRegistro').jstree("destroy");
    	$('#arbolPermisoRegistro').jstree("deselect_all");
    	$('#arbolPermisoRegistro').jstree("close_all");
    	$("#arbolIntervencionRegistro").jstree('open_node', 0);
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
    
    //-------------------------------------------------------------------    
    $scope.iniciarModuloUsuarios();
    
    // *** FIN CAMBIOS REYNEL *** 
}]);