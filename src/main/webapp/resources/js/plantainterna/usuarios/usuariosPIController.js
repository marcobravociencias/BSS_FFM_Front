var app = angular.module('usuarioApp', []);
var detalleTable;

app.controller('usuarioController', ['$scope', '$q', 'usuarioPIService', '$filter', function ($scope, $q, usuarioPIService, $filter) {
	$("#moduloUsuarios").addClass('active');
	
	app.editarUsuarioController($scope,usuarioPIService);
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
    $scope.listaUsuarios = [];
    $scope.paginasTotal = [];
    //ELEMENTOS PARA REGISTRO
    let acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    let geografiasNivelCiudad = [];
    var existePadre = false;
    $scope.confirmacionRegistro = {};
    $scope.informacionRegistro = {};
    $scope.listaPermisos = [];
    $scope.listaIntervenciones = [];
    $scope.listaIntervencionesSeleccionadas = [];
    $scope.listaGeografiasSeleccionadas = [];
    $scope.listaPermisosSeleccionados = [];
    
    $scope.listaRegiones = [];
    $scope.listaCiudades = [];
	$scope.respaldoIntervenciones = [];
    $scope.listaClasificacionUsuario = [];

    $scope.mostrarAccesos = true;
    $scope.mostrarTecnicos = true;

    $scope.listaCiudadNatal = [];
    $scope.ciudadNatal = {};
    
    $scope.iniciarModuloUsuarios = function() {
    	let paramsConfiguracionDespacho ={
				moduloAccionesUsuario: 'moduloUsuarios'
	    };
    	let params1 = {idUsuario:10};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarConfiguracionDespachoDespacho(paramsConfiguracionDespacho),
    		usuarioPIService.consultaCompanias(),
    		usuarioPIService.consultaPuestos(),
    		usuarioPIService.consultaPermisos(),
    		usuarioPIService.consultaGeografias(),
    		usuarioPIService.consultaIntervenciones(),
    		usuarioPIService.consultaUsuarioPorId(params1)
        ]).then(function(results) {
        	// *** CONFIGURACIÓN DESPACHO ***
        	var nivelUsuario = results[0].data.result.N_FILTRO_GEOGRAFIA;
        	
        	// *** COMPAÑIAS ***
        	if (results[1].data !== undefined) {
            	if(results[1].data.respuesta){
            		if(results[1].data.result.companias.length > 0){
            			$scope.listaCompanias = results[1].data.result.companias;
                    	$("#compania_select").empty();
                        $("#compania_select_registro").empty();
                        $("#compania_select_modificacion").empty();

                        angular.forEach($scope.listaCompanias,(element,index) => {
                            $("#compania_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
                            $("#compania_select_registro").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
                            $("#compania_select_modificacion").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
                        });
                        
                        $('#compania_select').selectpicker("refresh");
                        $('#compania_select_registro').selectpicker("refresh");
                        $('#compania_select_modificacion').selectpicker("refresh");
            		}else{
                    	toastr.warning('¡No existen compañías actualmente!');
                    }
            	}else{
            		toastr.warning('¡No existen compañías actualmente!');
            	}
            }else{
            	toastr.error('Error interno en el servidor.');
            }
            
            // *** PUESTOS ***
        	if (results[2].data !== undefined) {
            	if(results[2].data.respuesta){
            		if(results[2].data.result.puestos.length > 0){
            			$scope.listaPuestos = results[2].data.result.puestos;

                        $("#puesto_select").empty();
            	        $("#puesto_select_registro").empty();
            	        $("#puesto_select_modificacion").empty();
            	        
            	        angular.forEach($scope.listaPuestos,(element,index) => {
            	        	$("#puesto_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
            	        	$("#puesto_select_registro").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
            	        	$("#puesto_select_modificacion").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
            	        });
            	        
            	        $('#puesto_select').selectpicker("refresh");
            	        $('#puesto_select_registro').selectpicker("refresh");
            	        $('#puesto_select_modificacion').selectpicker("refresh");
            		}else{
            			toastr.warning('¡No existen puestos actualmente!');
            		}
            	}else{
            		toastr.warning('¡No existen puestos actualmente!');
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
            			
            			permisosLista.map((e)=>{
                            e.parent = e.idPadre == undefined ? "#" : e.idPadre;
                            e.text= e.nombre;
                            e.icon= "fa fa-globe";
                            return e
                        })       
						$scope.listaPermisosRespaldo = angular.copy(permisosLista);
                        $('#arbolPermisoRegistro').bind('loaded.jstree', function(e, data) {
							//$(this).jstree("open_all");
                        }).jstree({
                        	'plugins': ['search', 'checkbox'],
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
            			toastr.warning('¡No existen permisos actualmente!');
            		}
            	}else{
            		toastr.warning('¡No existen permisos actualmente!');
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
									$scope.listaGeografiasRespaldo.push(elemento);
	                            }
	                        });
                    	}else{
                    		listGeografias = results[4].data.result.geografia;
                    		$scope.listaGeografias = results[4].data.result.geografia;
                    		$scope.listaGeografiasRespaldo = results[4].data.result.geografia;
                    	}
                    	geografia=listGeografias;
                        geografia.map((e)=>{
                            e.parent=e.padre == undefined ? "#" : e.padre;
                            e.text= e.nombre;
                            e.icon= "fa fa-globe";
                            return e
                        })       
                        $('#arbolGeografiaConsulta').bind('loaded.jstree', function(e, data) {
							//$(this).jstree("open_all");
                        }).jstree({
                        	'plugins': ['search', 'checkbox', 'wholerow'],
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
                    	toastr.warning('¡No existen geografías actualmente!');
                    }
            	}else{
            		toastr.warning('¡No existen geografías actualmente!');
            	}
            }else{
            	toastr.error('Error interno en el servidor.');
            }
            
         // *** INTERVENCIONES ***
            if (results[5].data !== undefined) {
            	if(results[5].data.respuesta){
            		if(results[5].data.result.length > 0){
            			let intervencionesLista = [];
						$scope.respaldoIntervenciones = results[5].data.result;
            			results[5].data.result.forEach(intervencion =>{
                            if (intervencion.nivel == 1) {
                            	intervencionesLista.push(intervencion);
                            	$scope.listaIntervenciones.push(intervencion);
                            }
                        });
            			if(intervencionesLista.length > 0){
            				intervencionesLista.map((e)=>{
                                e.parent = e.idPadre == undefined ? "#" : e.idPadre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                return e
                            })       
                            $('#arbolIntervencionRegistro').bind('loaded.jstree', function(e, data) {
    							//$(this).jstree("open_all");
                            }).jstree({
                            	'plugins': ['search', 'checkbox', 'wholerow'],
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
            				toastr.warning('¡No existen intervenciones actualmente!');
            			}
            		}else{
                    	toastr.warning('¡No existen intervenciones actualmente!');
                    }
            	}else{
            		toastr.warning('¡No existen intervenciones actualmente!');
            	}
            }else{
            	toastr.error('Error interno en el servidor.');
            }
            			
        	swal.close();
        });
	}
    
    $scope.iniciarModuloUsuarios();
    
    $scope.abrirModalGeografiaConsulta = function() {
    	if($scope.listaGeografias != ""){
    		$("#modalGeografiaConsulta").modal('show');
    	}else{
    		toastr.warning('¡No existen geografías actualmente!');
    	}
	}
    
    $scope.cerrarModalGeografiaConsulta = function() {
    	$("#modalGeografiaConsulta").modal('hide');
	}
    
    $scope.busquedaGeografiaConsulta = function() {
    	$("#arbolGeografiaConsulta").jstree("search", $('#buscadorGeografiaConsulta').val());
	}
    
    $scope.busquedaIntervencionRegistro = function() {
    	$("#arbolIntervencionRegistro").jstree("search", $('#buscadorIntervencionRegistro').val());
	}
    
    $scope.busquedaGeografiaRegistro = function() {
    	$("#arbolGeografiaRegistro").jstree("search", $('#buscadorGeografiaRegistro').val());
	}
    
    $scope.busquedaPermisosRegistro = function() {
    	$("#arbolPermisoRegistro").jstree("search", $('#buscadorPermisosRegistro').val());
	}
    
    $scope.consultaUsuariosPorGeoCompPuestos = function() {
    	$scope.listaUsuarios = [];
    	$scope.listaIdGeografias = [];
    	var companiasSeleccionadas = $("#compania_select").val();
    	var puestosSeleccionados = $("#puesto_select").val();
    	var geografias = $('#arbolGeografiaConsulta').jstree("get_selected", true);
    	
    	if(companiasSeleccionadas != ""){
    		if(puestosSeleccionados != ""){
        		if(geografias.length > 0){
        			let textoGeografias = [];
        			angular.forEach(geografias,(geografia,index) => {
        				$scope.listaIdGeografias.push(geografia.id);
        				textoGeografias.push(geografia.text);				
        			});
        			$('#txtGeografiasConsulta').val(textoGeografias);

        			if (tablaUsuarios) {
        				tablaUsuarios.destroy();
        			}
        			
        			let params = {
        	    			geografias: $scope.listaIdGeografias,
        	    			companias: companiasSeleccionadas,
        	    			puestos: puestosSeleccionados,
        	    			elementosPorPagina: $scope.elementosPorPaginaTablaConsulta,
        	    			pagina: $scope.paginaTablaConsulta
        	    	}
        			
        			tablaUsuarios = $('#table-usuario-pi').DataTable({
        				"processing": false,
        				"ordering": false,
        				"serverSide": true,
        				"scrollX": false,
        				"paging": true,
        				"lengthChange": false,
        				"searching": false,
        				"ordering": false,
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
        			$("#contenedorPrincipalTabla").show();
        		}else{
        			toastr.warning('¡Selecciona al menos una geografía!');
        		}
        	}else{
        		toastr.warning('¡Selecciona al menos un puesto!');
        	}
    	}else{
    		toastr.warning('¡Selecciona al menos una compañía!');
    	}
	}
    
    $("#arbolIntervencionRegistro").click(function() {
    	$scope.listaIntervencionesSeleccionadas = [];
    	var intervencionesTree = $('#arbolIntervencionRegistro').jstree("get_selected", true);
    	intervencionesTree.forEach(intervencion =>{
    		$scope.listaIntervencionesSeleccionadas.push(intervencion.text);
    	});
    	$scope.$apply();
    });
    
    $scope.mostrarArbolGeografiaRegistro = function() {
    	var puestoSeleccionado = $("#puesto_select_registro option:selected").text().toLowerCase();
    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
    	var plugins = [];
    	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
    		plugins = ['search'];
    	}else{
    		plugins = ['search', 'checkbox'];
    	}
    	
    	geografiasNivelCiudad = [];
    	angular.forEach($scope.listaGeografias,function(elementoGeografia,index){
    		if(elementoGeografia.nivel < 4){
    			geografiasNivelCiudad.push(elementoGeografia);
    		}
    	});
    	
    	let geografia = geografiasNivelCiudad;
        geografia.map((e)=>{
            e.parent=e.padre == undefined ? "#" : e.padre;
            e.text= e.nombre;
            e.icon= "fa fa-globe";
            return e
        })       
        $('#arbolGeografiaRegistro').bind('loaded.jstree', function(e, data) {
			//$(this).jstree("open_all");
        }).jstree({
        	'plugins': plugins,
			'core': {
				'data': geografia,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons":false        
                }
            }
		});
	}
    
    $scope.cargarInfoConfirmacionRegistro = function() {
    	$scope.confirmacionRegistro.nombre = 
          $scope.informacionRegistro.nombre !== undefined && $scope.informacionRegistro.nombre !== "" &&
          $scope.informacionRegistro.apellidoPaterno !== undefined && $scope.informacionRegistro.apellidoPaterno !== "" &&
          $scope.informacionRegistro.apellidoMaterno !== undefined && $scope.informacionRegistro.apellidoMaterno !== "" ?
          $scope.informacionRegistro.nombre + ' ' + $scope.informacionRegistro.apellidoPaterno + ' ' + $scope.informacionRegistro.apellidoMaterno : "Sin asignar";
    	$scope.confirmacionRegistro.usuario = $scope.informacionRegistro.numEmpleado !== undefined && $scope.informacionRegistro.numEmpleado !== "" ? $scope.informacionRegistro.numEmpleado : "Sin asignar";
    	$scope.confirmacionRegistro.correo = $scope.informacionRegistro.correo !== undefined && $scope.informacionRegistro.correo !== "" ? $scope.informacionRegistro.correo : "Sin asignar";
    	$scope.confirmacionRegistro.contrasena = $scope.informacionRegistro.contrasena !== undefined && $scope.informacionRegistro.contrasena !== "" ? $scope.informacionRegistro.contrasena : "Sin asignar";
    	$scope.confirmacionRegistro.puesto = $("#puesto_select_registro option:selected").text();
    	$scope.confirmacionRegistro.fechaIngreso = $scope.informacionRegistro.fechaIngreso !== undefined && $scope.informacionRegistro.fechaIngreso !== "" ? $scope.informacionRegistro.fechaIngreso : "Sin asignar";
	}
    
    $('#puesto_select_registro').on('change', function() {
    	$('#arbolGeografiaRegistro').jstree("destroy");
    	$('#arbolIntervencionRegistro').jstree("deselect_all");
    	$('#arbolGeografiaRegistro').jstree("deselect_all");
    	$('#arbolPermisoRegistro').jstree("deselect_all");
    	$( "#arbolIntervencionRegistro").jstree('close_all', -1);
    	$( "#arbolGeografiaRegistro").jstree('close_all');
    	$( "#arbolPermisoRegistro").jstree('close_all');
    	
    	$("#buscadorIntervencionRegistro").val("");
    	$("#buscadorGeografiaRegistro").val("");
    	$("#buscadorPermisosRegistro").val("");
    	$scope.listaIntervencionesSeleccionadas = [];
    	$scope.listaGeografiasSeleccionadas = [];
    	$scope.listaPermisosSeleccionados = [];
    	
    	var puestoSeleccionado = $("#puesto_select_registro option:selected").text().toLowerCase();
    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
    	if(puestoSeleccionado == "tecnico"){
    		$("#pestaniaPermisos").hide();
    		$("#pestaniaTecnico").hide();
    	}else{
    		$("#pestaniaPermisos").show();
    		$("#pestaniaTecnico").show();
    	}
    	$scope.$apply();
    });
    
    $("#arbolGeografiaRegistro").click(function() {
    	$scope.listaGeografiasSeleccionadas = [];
    	var geografiasTree = $('#arbolGeografiaRegistro').jstree("get_selected", true);
    	geografiasTree.forEach(geo =>{
    		if(geo.original.nivel == 3){
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
    			existePadre = false;
    		}
    	});
    	$scope.$apply();
    });
    
    $("#arbolPermisoRegistro").click(function() {
    	$scope.listaPermisosSeleccionados = [];
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
    			existePadre = false;
    		}
    	});
    	$scope.$apply();
    });
    
    $scope.registrarUsuario = function() {
    	let paramsRegistro = {
    			  idUsuario: 0,
    			  nombre: "Juan",
    			  apellidoPaterno: "Lopez",
    			  apellidoMaterno: "Perez",
    			  numeroEmpleado: "14102832",
    			  usuario: "usuario324",
    			  password: "12345",
    			  identificacionTributaria: "TURPL901203",
    			  identificacion: "872R987FDIUSFODSF",
    			  genero: "MASCULINO",
    			  fotoPerfil: "{archivo:\"\",\"bucketId\":\"\", \"nombre\":\"\"}",
    			  urlFotoPerfil: "string",
    			  urlFB: "string",
    			  correoElectronico: "usuario@gmail.com",
    			  telefonoCelular: 553289075,
    			  idEstatusUsuario: 0,
    			  idGeografia: 0,
    			  idUsuarioJefe: 1,
    			  llaveExterna: "4532",
    			  tipoUsuario: 1,
    			  idProveedor: 15,
    			  intentosFallidos: 0,
    			  fechaUltimoLogin: "2021-09-02T16:46:58.513Z",
    			  primerIngreso: 0,
    			  fechaBloqueo: "2021-09-02T16:46:58.513Z",
    			  idDispositivo: "string",
    			  fechaAlta: "2021-09-02T16:46:58.513Z",
    			  fechaActualizacion: "2021-09-02T16:46:58.513Z",
    			  activo: 0,
    			  idCiudadNatal: 23,
    			  idUsuarioDespacho: 10,
    			  idUsuarioModifica: 13,
    			  idHorario: 9,
    			  idPerfil: 2,
    			  operarios: [
    			    1
    			  ],
    			  workData: {
    			    idJefeInmediato: "string",
    			    geografias: [
    			      0
    			    ],
    			    idCompania: "string",
    			    idTipoUsuario: 0,
    			    numeroEmpleado: "string",
    			    password: "string",
    			    idClasificacionOperario: 0,
    			    intervenciones: [
    			      0
    			    ],
    			    idOperarios: [
    			      0
    			    ],
    			    permisos: [
    			      0
    			    ],
    			    idAsignacionAutomatica: "string"
    			  },
    			  permisos: [
    			    {
    			      idCatPermiso: 1
    			    }
    			  ],
    			  skills: [
    			    {
    			      idTipoOt: 1
    			    }
    			  ]
    			};
	}
    
    // *** FIN CAMBIOS REYNEL *** 
    
//    $scope.consultarCompanias = function() {
//        var params = new FormData();
//        usuarioPIService.consultarCompanias().then(function success(response) {
//           response.data = resultCompanias; 
//           console.log(response);
//           if (response.data !== undefined) {
//                if(response.data.success) {
//                    $scope.listaCompanias = response.data.result;
//                    $("#compania_select").empty();
//                    $("#compania_select_registro").empty();
//                    $("#compania_select_modificacion").empty();
//
//                    angular.forEach($scope.listaCompanias,(element,index) => {
//                        $("#compania_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//
//                        if(  element.id === '10' ||  element.id === '37'  ) { 
//                            $("#compania_select_registro").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//                            $("#compania_select_modificacion").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//                        }
//                        
//                    });
//
//                    $('#compania_select').selectpicker("refresh");
//                    $('#compania_select_registro').selectpicker("refresh");
//                    $('#compania_select_modificacion').selectpicker("refresh");
//                    $scope.consultarPuestos();
//                } else {
//
//                }
//           } else {
//
//           }
//            
//        }).catch(err => handleError(err));
//    }
//    $scope.consultarCompanias();
//
//
//    $scope.consultarPuestos = function() {
//        usuarioPIService.consultarPuestos().then(function success(response) {
//            response.data = resultPuesto;
//            console.log(response);
//            if(response.data !== undefined) {
//                if(response.data.success) {
//                    $scope.listaPuestos = response.data.result;
//                    $("#puesto_select").empty();
//                    $("#puesto_select_registro").empty();
//                    $("#puesto_select_modificacion").empty();
//                    angular.forEach($scope.listaPuestos,(element,index) => {
//                        $("#puesto_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//                        $("#puesto_select_registro").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//                        $("#puesto_select_modificacion").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//                    });
//                    $('#puesto_select').selectpicker("refresh");
//                    $('#puesto_select_registro').selectpicker("refresh");
//                    $('#puesto_select_modificacion').selectpicker("refresh");
//
//                    $scope.consultarRegionesEstructura();
//                } else {
//
//                }
//            } else {
//
//            }
//        }).catch(err => handleError(err));
//    }
//    //$scope.consultarPuestos();
//
//
//    $scope.consultarRegionesEstructura = function() {
//        usuarioPIService.consultarRegionesEstructura().then(function success(response) {
//            response.data = resultRegionesEstructura;
//            console.log(response);
//            if(response.data !== undefined) {
//                if(response.data.success) {
//                    $scope.listaRegiones = response.data.result;
//                    $("#region_select").empty();
//                    angular.forEach($scope.listaRegiones,(element,index) => {
//                        $("#region_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//                    });
//                    $('#region_select').selectpicker("refresh");
//                } else {
//
//                }
//            } else {
//
//            }
//        }).catch(err => handleError(err));
//    }
//    //$scope.consultarRegionesEstructura();
//
//
//    $scope.consultarClasificacionUsuario = function() {
//        usuarioPIService.consultarClasificacionUsuario().then(function success(response) {
//            response.data = resultClasificacionUsuario;
//            console.log(response);
//            if(response.data !== undefined) {
//                if(response.data.success) {
//                    var idPropietario = "1";
//                    $scope.listaClasificacionUsuario = response.data.result;
//                    $scope.listaClasificacionSesion = [];
//                    $scope.listaClasificacionSesionMod = [];
//                    angular.forEach($scope.listaClasificacionUsuario,(element,index) => {
//                        if(element.id === idPropietario) {
//                            $scope.listaClasificacionSesion.push(element);
//                            $scope.listaClasificacionSesionMod.push(element);
//                        }
//                    });
//                } else {
//
//                }
//            } else {
//
//            }
//        }).catch(err => handleError(err)); 
//    }
//    $scope.consultarClasificacionUsuario();
//
//
//    $scope.listaIntervenciones = [];
//    $scope.consultarIntervencionesPorPropietario = function() {
//        $scope.params = {};
//        $scope.params.id_propietarios = "7";
//        usuarioPIService.consultarIntervencionesPorPropietarios($scope.params).then(function success(response) {
//            response.data = resultIntervencionesPorPropietario;
//            console.log(response);
//            if(response.data !== undefined) {
//                if(response.data.success) {
//                    $scope.listaIntervenciones = response.data.result;
//                    angular.forEach($scope.listaIntervenciones,(element,index) => {
//                        element.select = '0';
//                    });
//                } else {
//
//                }
//            } else {
//
//            }
//        }).catch(err => handleError(err));
//    }
//    $scope.consultarIntervencionesPorPropietario();
//
//
//    $scope.arbolCiudades = [];
//    $scope.consultarArbolesCiudades = function() {
//        usuarioPIService.consultarArbolesCiudades().then(function success(response) {
//            response.data = resultArbolCiudades;
//            if(response.data !== undefined) {
//                if(response.data.success) {
//                    $scope.arbolCiudades = response.data.result;
//                    $scope.pintarArbol("tree_arbol_empresarial", false, ['checkbox'], true);
//                    $scope.pintarArbol("tree_arbol_empresarial_mod", false, ['checkbox'], true);
//                    $scope.deshabilitarArbolEmpresarial("tree_arbol_empresarial");
//                    $scope.deshabilitarArbolEmpresarial("tree_arbol_empresarial_mod");
//                    $("#tree_arbol_empresarial").on('changed.jstree', function (e, data) {
//                        $scope.llenarTablaArabol();
//                        $scope.$apply();
//                    });
//                    $("#tree_arbol_empresarial_mod").on('changed.jstree', function (e, data) {
//                        $scope.llenarTablaArabol();
//                        $scope.$apply();
//                    });
//                } else {
//
//                }
//            } else {
//
//            }
//        }).catch(err => handleError(err));
//    }
//    $scope.consultarArbolesCiudades();
//
//
//
//    $scope.listaTecnicosDisponibles = [];
//    $scope.listaTecnicosAsignados = [];
//    $scope.listaTecnicosAsignadosMod = [];
//    $scope.consultarOperariosPorCiudad = function() {
//        $scope.listaTecnicosDisponibles = [];
//        $scope.listaTecnicosDisponiblesMod = [];
//        $scope.params = {};
//        usuarioPIService.consultarOperariosPorCiudad($scope.params).then(function success(response) {
//            response.data = resultOperariosCiudad;
//            console.log(response);
//            if(response.data !== undefined) {
//                if(response.data.success) {
//                    angular.forEach(response.data.result[0],function(tecnico,index){
//                        $scope.listaTecnicosDisponibles.push({id: tecnico.id, nombre: tecnico.nombre, check: 0});
//                        $scope.listaTecnicosDisponiblesMod.push({id: tecnico.id, nombre: tecnico.nombre, check: 0});
//                    });
//                } else {
//
//                }
//            } else {
//                
//            }
//        }).catch(err => handleError(err));
//    }
//    $scope.consultarOperariosPorCiudad();
//
//    $scope.llenarCompaniasSelect = function(lista) {
//
//        angular.forEach(lista,(element,index) => {
//            $("#compania_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//
//        });
//        $("#compania_select").selectpicker("refresh") ;
//
//
//        /*
//        $.each( companias_consultas_listado , function( index , elementoCatalogo ) {
//			
//			if( is_solo_internos ){
//				if( elementoCatalogo.id === '10' || elementoCatalogo.id === '37'){
//					$("#"+id_select+"").append("<option value='"+elementoCatalogo.id+"'>"+elementoCatalogo.descripcion+"</option>");            
//				}
//			}else{
//				$("#"+id_select+"").append("<option value='"+elementoCatalogo.id+"'>"+elementoCatalogo.descripcion+"</option>");            
//			}
//		});		
//	    $('#'+id_select+'').selectpicker("refresh") ;
//
//		if (   is_solo_internos  ){		
//			$("#numero_empleado_aut").hide({done:function(){
//				$("#numero_empleado").show(200);
//			},duration:200});			
//		}
//        */
//    }
//
//    $scope.showIntervencion = false;
//    $scope.listaIntervencionesSelect = [];
//    $scope.idPropietarioSelect = "";
//    $scope.mostrarIntervenciones = function(propietario) {
//        $scope.listaIntervencionesSelect = [];
//        console.log(propietario);
//        if ($scope.idPropietarioSelect === "") {
//            angular.forEach($scope.listaIntervenciones,(element,index) => {
//                if (element.idpadre === propietario.id) {
//                    $scope.listaIntervencionesSelect.push(angular.copy(element));
//                }
//            });
//            $scope.idPropietarioSelect = propietario.id;
//        } else {
//            if (propietario.id === $scope.idPropietarioSelect) {
//                $scope.idPropietarioSelect = "";
//            } else {
//                angular.forEach($scope.listaIntervenciones,(element,index) => {
//                    if (element.idpadre === propietario.id) {
//                        $scope.listaIntervencionesSelect.push(angular.copy(element));
//                    }
//                });
//                $scope.idPropietarioSelect = propietario.id;
//            }
//            
//        }
//    }
//
//    $scope.seleccionarIntervencion = function(index) {
//        if ($scope.listaIntervencionesSelect[index].select === '0') {
//            $scope.listaIntervencionesSelect[index].select = '1';
//        } else {
//            $scope.listaIntervencionesSelect[index].select = '0';
//        }
//        $scope.consultarPrivilegiosRegistro();
//    }
//
//    $scope.consultarCiudadesEstructura = function() {
//        $scope.params = {};
//        $scope.params.id = $("#region_select").val();
//        usuarioPIService.consultarCiudadesEstructura($scope.params).then(function success(response) {
//            response.data = respuestaCiudades;
//            console.log(response);
//            if(response.data !== undefined) {
//                if(response.data.success) {
//                    $scope.listaCiudades = response.data.result;
//                    $("#ciudad_select").empty();
//                    angular.forEach($scope.listaCiudades,(element,index) => {
//                        $("#ciudad_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//                    });
//                    $('#ciudad_select').selectpicker("refresh");
//                } else {
//
//                }
//            } else {
//
//            }
//            $scope.listaCiudades = response.data.result;
//            $("#ciudad_select").empty();
//            angular.forEach($scope.listaCiudades,(element,index) => {
//                $("#ciudad_select").append("<option value='"+element.id+"'>"+element.descripcion+"</option>");
//            });
//            $('#ciudad_select').selectpicker("refresh");
//            
//        }).catch(err => handleError(err));
//    }
//
//    $scope.consultarUsuarios = function() {
//        $scope.params = {};
//        $scope.params.id_activo = "1";
//        $scope.params.ids_ciudad = $("#ciudad_select").val();
//        $scope.params.ids_companias = $("#compania_select").val();
//        $scope.params.ids_tipo = $("#puesto_select").val();
//
//        usuarioPIService.consultarUsuarios($scope.params).then(function success(response) {
//            response.data = resultConsultarUusarios;
//            console.log(response);
//            if(response.data !== undefined) {
//                if(response.data.success) {
//                    $scope.mostrarTablaUsuarios(response.data.result[0]);
//                } else {
//
//                }
//
//            }
//
//            
//            
//        }).catch(err => handleError(err));
//    }
//
//    $scope.privilegiosPrincipal = [];
//    $scope.privilegiosDisponibles = [];
//    $scope.privilegiosAsignados = [];
//    $scope.consultarPrivilegiosRegistro = function() {
//        $scope.privilegiosPrincipal = [];
//        $scope.privilegiosDisponibles = [];
//        $scope.privilegiosAsignados = [];
//        $scope.params = {};
//        $scope.params.genericId = [];
//        angular.forEach($scope.listaIntervencionesSelect,function(value,index){
//            if (value.select === "1") {
//                $scope.params.genericId.push(value.id);
//            }
//        });
//        
//        if ($scope.params.genericId.length > 0) {
//            $scope.params.puestos = "1";
//            $scope.params.id_propietarios = "1";
//
//            usuarioPIService.consultarPrivilegios($scope.params).then(function success(response) {
//                response.data = resultPrivilegios;
//                console.log(response);
//                
//                if(response.data !== undefined) {
//                    if(response.data.success) {
//                        angular.forEach(response.data.result,function(value,index){
//                            console.log(value);
//                            angular.forEach(value,function(privilegio,indexPrivilegio){
//                                if (indexPrivilegio === 0) {
//                                    $scope.privilegiosPrincipal.push({id: privilegio.id, nombre: privilegio.descripcion, color: index+1, img: privilegio.img});
//                                } else {
//                                    if (privilegio.precarga === "0") {
//                                        $scope.privilegiosDisponibles.push({id: privilegio.id, idPropietario: privilegio.id_propietario, nombre: privilegio.descripcion, color: index+1, img: privilegio.img, check: 0});
//                                    } else {
//                                        $scope.privilegiosAsignados.push({id: privilegio.id, idPropietario: privilegio.id_propietario, nombre: privilegio.descripcion, color: index+1, img: privilegio.img, check: 0});
//                                    }
//                                }
//                            });
//                        });
//                    } else {
//
//                    }
//                } else {
//
//                }
//                
//                
//            }).catch(err => handleError(err));
//        }
//        
//    }
//    $scope.informacionRegistro = {};
//    $scope.confirmacion = {};
//    $scope.mostrarConfirmacionUsuario = function() {
//        $scope.confirmacion = {};
//
//        $scope.confirmacion.nombre = 
//            $scope.informacionRegistro.nombre !== undefined && $scope.informacionRegistro.nombre !== "" &&
//            $scope.informacionRegistro.apellidoPaterno !== undefined && $scope.informacionRegistro.apellidoPaterno !== "" &&
//            $scope.informacionRegistro.apellidoMaterno !== undefined && $scope.informacionRegistro.apellidoMaterno !== "" ?
//            $scope.informacionRegistro.nombre + ' ' + $scope.informacionRegistro.apellidoPaterno + ' ' + $scope.informacionRegistro.apellidoMaterno : "Sin asignar";
//        $scope.confirmacion.usuario = $scope.informacionRegistro.numEmpleado !== undefined && $scope.informacionRegistro.numEmpleado !== "" ? $scope.informacionRegistro.numEmpleado : "Sin asignar";
//        $scope.confirmacion.correo = $scope.informacionRegistro.correo !== undefined && $scope.informacionRegistro.correo !== "" ? $scope.informacionRegistro.correo : "Sin asignar";
//        $scope.confirmacion.contrasena = $scope.informacionRegistro.contrasena !== undefined && $scope.informacionRegistro.contrasena !== "" ? $scope.informacionRegistro.contrasena : "Sin asignar";
//        $scope.confirmacion.puesto = $("#puesto_select_registro option:selected").text();
//        $scope.confirmacion.fechaIngreso = $scope.informacionRegistro.fechaIngreso !== undefined && $scope.informacionRegistro.fechaIngreso !== "" ? $scope.informacionRegistro.fechaIngreso : "Sin asignar";
//    }
//
//    $scope.checkDisponibilidad = function(index) {
//        if ($scope.privilegiosDisponibles[index].check === 1) {
//            $scope.privilegiosDisponibles[index].check = 0;
//        } else {
//            $scope.privilegiosDisponibles[index].check = 1;
//        }
//    }
//
//    $scope.checkAsignado = function(index) {
//        if ($scope.privilegiosAsignados[index].check === 1) {
//            $scope.privilegiosAsignados[index].check = 0;
//        } else {
//            $scope.privilegiosAsignados[index].check = 1;
//        }
//    }
//
//    $scope.asignarPrivilegios = function() {
//        $scope.privilegiosDisponiblesResp = [];
//
//        $scope.privilegiosAsignados.map(function(elemento, index) {
//            elemento.check = 0;
//        });
//
//        $scope.privilegiosDisponibles.map(function(elemento, index) {
//            if (elemento.check === 1) {
//                $scope.element = angular.copy(elemento);
//                $scope.element.check = 0;
//                $scope.privilegiosAsignados.push(angular.copy($scope.element));
//            } else {
//                $scope.privilegiosDisponiblesResp.push(angular.copy(elemento));
//            }
//        });
//        $scope.allDisponible = false;
//        $scope.allAsignado = false;
//        $scope.privilegiosDisponibles = $scope.privilegiosDisponiblesResp;
//    }
//
//    $scope.removerPrivilegios = function() {
//        $scope.listaAsig = [];
//        $scope.privilegiosAsignadosResp = [];
//
//        $scope.privilegiosDisponibles.map(function(elemento, index) {
//            elemento.check = 0;
//        });
//
//        $scope.privilegiosAsignados.map(function(elemento, index) {
//            if (elemento.check === 1) {
//                $scope.element = angular.copy(elemento);
//                $scope.element.check = 0;
//                $scope.privilegiosDisponibles.push(angular.copy($scope.element));
//            } else {
//                $scope.privilegiosAsignadosResp.push(angular.copy(elemento));
//            }
//        });
//        $scope.allDisponible = false;
//        $scope.allAsignado = false;
//        $scope.privilegiosAsignados = $scope.privilegiosAsignadosResp;
//    }
//
//    $scope.allDisponible = false;
//    $scope.selectAllDisponible = function() {
//        if ($scope.allDisponible) {
//            $scope.allDisponible = false;
//            $scope.privilegiosDisponibles.map(function(elemento, index) {
//                elemento.check = 0;
//            });
//        } else {
//            $scope.allDisponible = true;
//            $scope.privilegiosDisponibles.map(function(elemento, index) {
//                elemento.check = 1;
//            });
//        }
//    }
//
//    $scope.allAsignado = false;
//    $scope.selectAllAsignados = function() {
//        if ($scope.allAsignado) {
//            $scope.allAsignado = false;
//            $scope.privilegiosAsignados.map(function(elemento, index) {
//                elemento.check = 0;
//            });
//        } else {
//            $scope.allAsignado = true;
//            $scope.privilegiosAsignados.map(function(elemento, index) {
//                elemento.check = 1;
//            });
//        }
//    }
//
//    $scope.checkTecnicoDisponible = function(element) {
//        if ($scope.listaTecnicosDisponibles[$scope.listaTecnicosDisponibles.indexOf(element)].check === 1) {
//            $scope.listaTecnicosDisponibles[$scope.listaTecnicosDisponibles.indexOf(element)].check = 0;
//        } else {
//            $scope.listaTecnicosDisponibles[$scope.listaTecnicosDisponibles.indexOf(element)].check = 1;
//        }
//    }
//
//    $scope.checkTecnicoAsignado = function(element) {
//        if ($scope.listaTecnicosAsignados[$scope.listaTecnicosAsignados.indexOf(element)].check === 1) {
//            $scope.listaTecnicosAsignados[$scope.listaTecnicosAsignados.indexOf(element)].check = 0;
//        } else {
//            $scope.listaTecnicosAsignados[$scope.listaTecnicosAsignados.indexOf(element)].check = 1;
//        }
//    }
//
//    $scope.asignarTecnicos = function() {
//        $scope.tecnicosDisponiblesRes = [];
//
//        $scope.listaTecnicosAsignados.map(function(elemento, index) {
//            elemento.check = 0;
//        });
//
//        $scope.listaTecnicosDisponibles.map(function(elemento, index) {
//            if (elemento.check === 1) {
//                $scope.element = angular.copy(elemento);
//                $scope.element.check = 0;
//                $scope.listaTecnicosAsignados.push(angular.copy($scope.element));
//            } else {
//                $scope.tecnicosDisponiblesRes.push(angular.copy(elemento));
//            }
//        });
//        $scope.allTecnicosDisponibles = false;
//        $scope.allTecnicosAsignados = false;
//        $scope.listaTecnicosDisponibles = $scope.tecnicosDisponiblesRes;
//    }
//
//    $scope.removerTecnico = function() {
//        $scope.tecnicosAsignadosRes = [];
//
//        $scope.listaTecnicosDisponibles.map(function(elemento, index) {
//            elemento.check = 0;
//        });
//
//        $scope.listaTecnicosAsignados.map(function(elemento, index) {
//            if (elemento.check === 1) {
//                $scope.element = angular.copy(elemento);
//                $scope.element.check = 0;
//                $scope.listaTecnicosDisponibles.push(angular.copy($scope.element));
//            } else {
//                $scope.tecnicosAsignadosRes.push(angular.copy(elemento));
//            }
//        });
//        $scope.allTecnicosDisponibles = false;
//        $scope.allTecnicosAsignados = false;
//        $scope.listaTecnicosAsignados = $scope.tecnicosAsignadosRes;
//    }
//
//    $scope.allTecnicosDisponibles = false;
//    $scope.checkAllTecnicosDisponibles = function() {
//        if ($scope.allTecnicosDisponibles) {
//            $scope.allTecnicosDisponibles = false;
//            $scope.listaTecnicosDisponibles.map(function(elemento, index) {
//                elemento.check = 0;
//            });
//        } else {
//            $scope.allTecnicosDisponibles = true;
//            $scope.listaTecnicosDisponibles.map(function(elemento, index) {
//                elemento.check = 1;
//            });
//        }
//    }
//
//    $scope.allTecnicosAsignados = false;
//    $scope.checkAllTecnicosAsignados = function() {
//        if ($scope.allTecnicosAsignados) {
//            $scope.allTecnicosAsignados = false;
//            $scope.listaTecnicosAsignados.map(function(elemento, index) {
//                elemento.check = 0;
//            });
//        } else {
//            $scope.allTecnicosAsignados = true;
//            $scope.listaTecnicosAsignados.map(function(elemento, index) {
//                elemento.check = 1;
//            });
//        }
//    }
//
//    
//
    $scope.mostrarTablaUsuarios = function(params) {
	
//			console.log(params);
//	
//			tablaUsuarios = $('#table-usuario-pi').DataTable({
//				"processing": false,
//				"ordering": false,
//				"serverSide": true,
//				"scrollX": false,
//				"paging": true,
//				"lengthChange": false,
//				"searching": false,
//				"ordering": false,
//				"pageLength": 10,
//				"ajax": {
//					"url": "req/consultaUsuariosPorGeoCompPuestos",
//					"type": "POST",
//					"data": params,
//					"beforeSend": function () {
//						if(!swal.isVisible() ){
//							swal({ text: 'Cargando registros...', allowOutsideClick: false });
//							swal.showLoading();
//						}
//						
//					},
//					"dataSrc": function (json) {
//						return json.data;
//					},
//					"error":function(xhr, error, thrown){
//						handleError(xhr)
//					}, 
//					"complete": function () {
//						swal.close()
//					}
//				},
//				"columns": [null, null, null, null, null, null, null, null],
//				"language": idioma_espanol_not_font
//			});

//        $scope.viewTableResumen = [];
//        angular.forEach(lista,function(value,index){
//            let  arra=[];
//            arra[0] = value.numeroEmpleado ? value.numeroEmpleado : '';
//            arra[1] = value.usuarioFfm ? value.usuarioFfm : '';
//            arra[2] = value.nombre ? value.nombre : '';
//            arra[3] = value.tipoOperario ? value.tipoOperario : '';
//            arra[4] = value.ciudad ? value.ciudad : '';
//            arra[5] = value.unidadNegocio ? value.unidadNegocio : '';
//            arra[6] = '<div class="text-center"><button type="button" class="btn btn-informacion" onclick="mostrarModalEdicion(' + index + ')"><i class="fa fa-edit"></i></button></div>';
//            arra[7] = '<div class="text-center"><button type="button" class="btn btn-informacion" onclick="mostrarModalEliminar(' + index + ')"><i class="fa fa-remove"></i></button></div>';
//
//            $scope.viewTableResumen.push(arra);
//        });
//        //detalleTable.destroy();
//        detalleTable = $('#table-usuario-pi').DataTable({
//            "paging": true,
//            "lengthChange": true,
//            "searching": true,
//            "ordering": true,
//            "info": true,
//            "scrollCollapse": true,
//            "autoWidth": true,
//            "language": idioma_espanol_not_font,
//            "data": $scope.viewTableResumen, 
//            "recordsTotal": 33,
//            "recordsTotal": 33,
//            "registrosTotales":33,
//            "columns": [{
//                "title": "No. Empleado"
//        
//            }, {
//                "title": "Usuario FFM"
//        
//            }, {
//                "title": "Nombre"
//        
//            }, {
//                "title": "Tipo Usuario"
//        
//            }, {
//                "title": "Ciudad"
//        
//            }, {
//                "title": "Unidad Negocio"
//        
//            }, {
//                "title": "Editar"
//        
//            }, {
//                "title": "Eliminar"
//        
//            }]
//        });
//        alert("Tabla -> " + detalleTable.page.info());
    }
//
//    $scope.pintarArbol = function(idArbol, isInstalador, plugins, deshabilitar) {
//
//        var tree_data = [];
//        var icon_check = '';
//        $('#'+idArbol+'').jstree('destroy');
//
//        angular.forEach($scope.arbolCiudades,(elem,index) => {
//            if (elem.idpadre !== "-1") {
//                switch (elem.nivel ){
//                    case '0':
//                        icon_check='fa fa-building';
//                        break;
//                    case '1':
//                        icon_check='fa fa-globe';
//                        break;
//                    case '2':
//                        icon_check='fa fa-crosshairs';
//                        break;
//                    case '3':
//                        icon_check='fa fa-cubes';
//                        break;
//                    case '4':
//                        icon_check='fa fa-cube';
//                        break;					
//                }
//    
//                if(isInstalador) {
//                    if (elem.nivel <=2) {
//                        tree_data.push({
//                            id: elem.id,
//                            parent: ((elem.idpadre=='nulo' || elem.idpadre=='NULO' || elem.idpadre=='' || elem.idpadre=='null' || elem.idpadre=="-1")?'#':elem.idpadre),
//                            nivel:elem.nivel,
//                            text: elem.descripcion,
//                            icon: icon_check
//                        });
//                    }
//                } else {
//                    tree_data.push({
//                        id: elem.id,
//                        parent: ((elem.idpadre=='nulo' || elem.idpadre=='NULO' || elem.idpadre=='' || elem.idpadre=='null' || elem.idpadre=="-1")?'#':elem.idpadre),
//                        nivel:elem.nivel,
//                        text: elem.descripcion,
//                        icon: icon_check		
//                    });
//                }
//            }
//            
//
//        });
//
//        $('#'+idArbol+'').bind('loaded.jstree', function(e, data) {	  
//            if (deshabilitar) {
//                $scope.deshabilitarArbolEmpresarial(idArbol);
//            }
//        }).jstree({ 
//            core : {
//                data : tree_data,
//                themes: {
//                      name: 'proton',
//                      responsive: true
//                },
//                animation: 100
//            },
//            plugins : plugins 
//        });
//
//    }
//
//    $scope.deshabilitarArbolEmpresarial = function(id_arbol){
//        $("#"+id_arbol+"").jstree('open_all');
//        $("#"+id_arbol+"").jstree("check_all");
//        $("#"+id_arbol+" li").each( function() {
//            $("#"+id_arbol+"").jstree().disable_node(this.id);
//        });
//    }
//
//    $scope.llenarTablaArabol = function() {
//        $scope.arbolTable = [];
//        $scope.listaCiudadNatal = [];
//        $scope.arbolSelect = $('#tree_arbol_empresarial').jstree("get_selected", true);
//        angular.forEach($scope.arbolSelect,function(value,index){
//            if(value.original.nivel === "2") {
//                $scope.arbolTable.push({id: value.id, nombreCiudad: value.text, distritos: []});
//                $scope.listaCiudadNatal.push({id: value.id, nombre: value.text});
//            }
//        })
//
//        angular.forEach($scope.arbolSelect,function(distrito,index){
//            if(distrito.original.nivel === "3") {
//                angular.forEach($scope.arbolTable,function(value,index){
//                    if (distrito.parent === value.id) {
//                        value.distritos.push({id: distrito.id, nombreDistrito: distrito.text});
//                    }
//                });
//            }
//        })
//    }
//
//    $scope.llenarTablaArbolTecnico = function() {
//        $scope.arbolTable = [];
//        $scope.listaCiudadNatal = [];
//        $scope.ciudadNatal = {};
//        $scope.arbolSelect = $('#tree_arbol_empresarial').jstree("get_selected", true);
//        angular.forEach($scope.arbolSelect,function(value,index){
//            if(value.original.nivel === "2") {
//                $scope.arbolTable.push({id: value.id, nombreCiudad: value.text, distritos: []});
//            }
//        })
//    }
//
//
//    $scope.mostrarDistritoRegistro = true;
//    $(document).ready(function(){
//
//        detalleTable = $("#table-usuario-pi").DataTable({
//            "paging": true,
//            "lengthChange": true,
//            "searching": true,
//            "ordering": true,
//            "info": true,
//            "scrollCollapse": true,
//            "autoWidth": true,
//            "language": idioma_espanol_not_font,
//            "columns": [{
//                "title": "No. Empleado"
//        
//            }, {
//                "title": "Usuario FFM"
//        
//            }, {
//                "title": "Nombre"
//        
//            }, {
//                "title": "Tipo Usuario"
//        
//            }, {
//                "title": "Ciudad"
//        
//            }, {
//                "title": "Unidad Negocio"
//        
//            }, {
//                "title": "Editar"
//        
//            }, {
//                "title": "Eliminar"
//        
//            }]
//        });
//        
//        $("#compania_select").change(function() {
//            $scope.consultarUsuarios();
//        });
//
//        $("#puesto_select").change(function() {
//            $scope.consultarUsuarios();
//        });
//
//        $("#region_select").change(function() {
//            $scope.consultarCiudadesEstructura();
//            $scope.consultarUsuarios();
//        });
//
//        $("#ciudad_select").change(function() {
//            $scope.consultarUsuarios();
//        });
//
//        mostarDetalleUsuario = function(index) {
//            console.log(index);
//        }
//
//        mostrarModalEliminar = function(index) {
//            console.log(index);
//        }
//
//        $("#puesto_select_registro").change(function(){
//            console.log($("#puesto_select_registro").val());
//            var idPuestoRegistro = $("#puesto_select_registro").val();
//            $scope.arbolTable = [];
//            $scope.listaCiudadNatal = [];
//            $scope.ciudadNatal = {};
//            if (["1","2","3","5","13"].includes(idPuestoRegistro)) {
//                $scope.mostrarAccesos = true;
//                $scope.mostrarTecnicos = true;
//                $scope.mostrarDistritoRegistro = true;
//                $scope.$apply();
//
//                if (["1"].includes(idPuestoRegistro)) {
//                    $scope.pintarArbol("tree_arbol_empresarial", false, ['checkbox'], true);
//                } else {
//                    $scope.pintarArbol("tree_arbol_empresarial", false, ['checkbox'], false);
//                }
//
//                $("#tree_arbol_empresarial").on('changed.jstree', function (e, data) {
//                    $scope.llenarTablaArabol();
//                    $scope.$apply();
//                });
//                
//            } else if (["7"].includes(idPuestoRegistro)){
//                $scope.mostrarAccesos = false;
//                $scope.mostrarTecnicos = false;
//                $scope.mostrarDistritoRegistro = false;
//                $scope.$apply();
//
//                $scope.pintarArbol("tree_arbol_empresarial", true, [], false);
//
//                $("#tree_arbol_empresarial").on('changed.jstree', function (e, data) {
//                    $scope.llenarTablaArbolTecnico();
//                    $scope.$apply();
//                });
//            }
//        });
//
//        $('#fechaIngresoRegistro').datepicker({
//            format : 'dd/mm/yyyy',
//            autoclose : true,
//            language : 'es',
//            todayHighlight : true
//        });
//        $('#fechaIngresoRegistro').datepicker('update',new Date());
//
//    });
//
//
//    //*********************EDICION****************** */
//
//    mostrarModalEdicion = function() {
//        $("#modalEdicionUsuario").modal('show');
//    }
//
//    $scope.listaIntervencionesSelectMod = [];
//    $scope.idPropietarioSelectMod = "";
//    $scope.mostrarIntervencionesMod = function(propietario) {
//        $scope.listaIntervencionesSelectMod = [];
//        console.log(propietario);
//        if ($scope.idPropietarioSelectMod === "") {
//            angular.forEach($scope.listaIntervenciones,(element,index) => {
//                if (element.idpadre === propietario.id) {
//                    $scope.listaIntervencionesSelectMod.push(angular.copy(element));
//                }
//            });
//            $scope.idPropietarioSelectMod = propietario.id;
//        } else {
//            if (propietario.id === $scope.idPropietarioSelectMod) {
//                $scope.idPropietarioSelectMod = "";
//            } else {
//                angular.forEach($scope.listaIntervenciones,(element,index) => {
//                    if (element.idpadre === propietario.id) {
//                        $scope.listaIntervencionesSelectMod.push(angular.copy(element));
//                    }
//                });
//                $scope.idPropietarioSelectMod = propietario.id;
//            }
//            
//        }
//    }
//
//    $scope.seleccionarIntervencionMod = function(index) {
//        if ($scope.listaIntervencionesSelectMod[index].select === '0') {
//            $scope.listaIntervencionesSelectMod[index].select = '1';
//        } else {
//            $scope.listaIntervencionesSelectMod[index].select = '0';
//        }
//        $scope.consultarPrivilegiosEdicion();
//    }
//
//    $scope.privilegiosPrincipalMod = [];
//    $scope.privilegiosDisponiblesMod = [];
//    $scope.privilegiosAsignadosMod = [];
//    $scope.consultarPrivilegiosEdicion = function() {
//        $scope.privilegiosPrincipalMod = [];
//        $scope.privilegiosDisponiblesMod = [];
//        $scope.privilegiosAsignadosMod = [];
//        $scope.params = {};
//        $scope.params.genericId = [];
//        angular.forEach($scope.listaIntervencionesSelectMod,function(value,index){
//            if (value.select === "1") {
//                $scope.params.genericId.push(value.id);
//            }
//        });
//        
//        if ($scope.params.genericId.length > 0) {
//            $scope.params.puestos = "1";
//            $scope.params.id_propietarios = "1";
//
//            usuarioPIService.consultarPrivilegios($scope.params).then(function success(response) {
//                response.data = resultPrivilegios;
//                console.log(response);
//                if(response.data !== undefined) {
//                    if(response.data.success) {
//                        angular.forEach(response.data.result,function(value,index){
//                            console.log(value);
//                            angular.forEach(value,function(privilegio,indexPrivilegio){
//                                if (indexPrivilegio === 0) {
//                                    $scope.privilegiosPrincipalMod.push({id: privilegio.id, nombre: privilegio.descripcion, color: index+1, img: privilegio.img});
//                                } else {
//                                    if (privilegio.precarga === "0") {
//                                        $scope.privilegiosDisponiblesMod.push({id: privilegio.id, idPropietario: privilegio.id_propietario, nombre: privilegio.descripcion, color: index+1, img: privilegio.img, check: 0});
//                                    } else {
//                                        $scope.privilegiosAsignadosMod.push({id: privilegio.id, idPropietario: privilegio.id_propietario, nombre: privilegio.descripcion, color: index+1, img: privilegio.img, check: 0});
//                                    }
//                                }
//                            });
//                        });
//                    } else {
//
//                    }
//                } else {
//
//                }
//            }).catch(err => handleError(err));
//        }
//        
//    }
//
//    $scope.informacionModificar = {};
//    $scope.mostrarConfirmacionModificacion = function() {
//        $scope.confirmacionMod = {};
//
//        $scope.confirmacionMod.nombre = 
//            $scope.informacionModificar.nombre !== undefined && $scope.informacionModificar.nombre !== "" &&
//            $scope.informacionModificar.apellidoPaterno !== undefined && $scope.informacionModificar.apellidoPaterno !== "" &&
//            $scope.informacionModificar.apellidoMaterno !== undefined && $scope.informacionModificar.apellidoMaterno !== "" ?
//            $scope.informacionModificar.nombre + ' ' + $scope.informacionModificar.apellidoPaterno + ' ' + $scope.informacionModificar.apellidoMaterno : "Sin asignar";
//        $scope.confirmacionMod.usuario = $scope.informacionModificar.numEmpleado !== undefined && $scope.informacionModificar.numEmpleado !== "" ? $scope.informacionModificar.numEmpleado : "Sin asignar";
//        $scope.confirmacionMod.correo = $scope.informacionModificar.correo !== undefined && $scope.informacionModificar.correo !== "" ? $scope.informacionModificar.correo : "Sin asignar";
//        $scope.confirmacionMod.contrasena = $scope.informacionModificar.contrasena !== undefined && $scope.informacionModificar.contrasena !== "" ? $scope.informacionModificar.contrasena : "Sin asignar";
//        $scope.confirmacionMod.puesto = $("#puesto_select_modificacion option:selected").text();
//        $scope.confirmacionMod.fechaIngreso = $scope.informacionModificar.fechaIngreso !== undefined && $scope.informacionModificar.fechaIngreso !== "" ? $scope.informacionModificar.fechaIngreso : "Sin asignar";
//    }
//    
//    $scope.checkDisponibilidadMod = function(index) {
//        if ($scope.privilegiosDisponiblesMod[index].check === 1) {
//            $scope.privilegiosDisponiblesMod[index].check = 0;
//        } else {
//            $scope.privilegiosDisponiblesMod[index].check = 1;
//        }
//    }
//
//    $scope.checkAsignadoMod = function(index) {
//        if ($scope.privilegiosAsignadosMod[index].check === 1) {
//            $scope.privilegiosAsignadosMod[index].check = 0;
//        } else {
//            $scope.privilegiosAsignadosMod[index].check = 1;
//        }
//    }
//
//    $scope.asignarPrivilegiosMod = function() {
//        $scope.privilegiosDisponiblesModResp = [];
//
//        $scope.privilegiosAsignadosMod.map(function(elemento, index) {
//            elemento.check = 0;
//        });
//
//        $scope.privilegiosDisponiblesMod.map(function(elemento, index) {
//            if (elemento.check === 1) {
//                $scope.element = angular.copy(elemento);
//                $scope.element.check = 0;
//                $scope.privilegiosAsignadosMod.push(angular.copy($scope.element));
//            } else {
//                $scope.privilegiosDisponiblesModResp.push(angular.copy(elemento));
//            }
//        });
//        $scope.allDisponibleMod = false;
//        $scope.allAsignadoMod = false;
//        $scope.privilegiosDisponiblesMod = $scope.privilegiosDisponiblesModResp;
//    }
//
//    $scope.removerPrivilegiosMod = function() {
//        $scope.privilegiosAsignadosModResp = [];
//
//        $scope.privilegiosDisponiblesMod.map(function(elemento, index) {
//            elemento.check = 0;
//        });
//
//        $scope.privilegiosAsignadosMod.map(function(elemento, index) {
//            if (elemento.check === 1) {
//                $scope.element = angular.copy(elemento);
//                $scope.element.check = 0;
//                $scope.privilegiosDisponiblesMod.push(angular.copy($scope.element));
//            } else {
//                $scope.privilegiosAsignadosModResp.push(angular.copy(elemento));
//            }
//        });
//        $scope.allDisponibleMod = false;
//        $scope.allAsignadoMod = false;
//        $scope.privilegiosAsignadosMod = $scope.privilegiosAsignadosModResp;
//    }
//
//    $scope.allDisponibleMod = false;
//    $scope.selectAllDisponibleMod = function() {
//        if ($scope.allDisponibleMod) {
//            $scope.allDisponibleMod = false;
//            $scope.privilegiosDisponiblesMod.map(function(elemento, index) {
//                elemento.check = 0;
//            });
//        } else {
//            $scope.allDisponibleMod = true;
//            $scope.privilegiosDisponiblesMod.map(function(elemento, index) {
//                elemento.check = 1;
//            });
//        }
//    }
//
//    $scope.allAsignadoMod = false;
//    $scope.selectAllAsignadosMod = function() {
//        if ($scope.allAsignadoMod) {
//            $scope.allAsignadoMod = false;
//            $scope.privilegiosAsignadosMod.map(function(elemento, index) {
//                elemento.check = 0;
//            });
//        } else {
//            $scope.allAsignadoMod = true;
//            $scope.privilegiosAsignadosMod.map(function(elemento, index) {
//                elemento.check = 1;
//            });
//        }
//    }
//
//
//    $scope.checkTecnicoDisponibleMod = function(element) {
//        if ($scope.listaTecnicosDisponiblesMod[$scope.listaTecnicosDisponiblesMod.indexOf(element)].check === 1) {
//            $scope.listaTecnicosDisponiblesMod[$scope.listaTecnicosDisponiblesMod.indexOf(element)].check = 0;
//        } else {
//            $scope.listaTecnicosDisponiblesMod[$scope.listaTecnicosDisponiblesMod.indexOf(element)].check = 1;
//        }
//    }
//
//    $scope.checkTecnicoAsignadoMod = function(element) {
//        if ($scope.listaTecnicosAsignadosMod[$scope.listaTecnicosAsignadosMod.indexOf(element)].check === 1) {
//            $scope.listaTecnicosAsignadosMod[$scope.listaTecnicosAsignadosMod.indexOf(element)].check = 0;
//        } else {
//            $scope.listaTecnicosAsignadosMod[$scope.listaTecnicosAsignadosMod.indexOf(element)].check = 1;
//        }
//    }
//
//    $scope.asignarTecnicosMod = function() {
//        $scope.tecnicosDisponiblesResMod = [];
//
//        $scope.listaTecnicosAsignadosMod.map(function(elemento, index) {
//            elemento.check = 0;
//        });
//
//        $scope.listaTecnicosDisponiblesMod.map(function(elemento, index) {
//            if (elemento.check === 1) {
//                $scope.element = angular.copy(elemento);
//                $scope.element.check = 0;
//                $scope.listaTecnicosAsignadosMod.push(angular.copy($scope.element));
//            } else {
//                $scope.tecnicosDisponiblesResMod.push(angular.copy(elemento));
//            }
//        });
//        $scope.allTecnicosDisponiblesMod = false;
//        $scope.allTecnicosAsignadosMod = false;
//        $scope.listaTecnicosDisponiblesMod = $scope.tecnicosDisponiblesResMod;
//    }
//
//    $scope.removerTecnicoMod = function() {
//        $scope.tecnicosAsignadosResMod = [];
//
//        $scope.listaTecnicosDisponiblesMod.map(function(elemento, index) {
//            elemento.check = 0;
//        });
//
//        $scope.listaTecnicosAsignadosMod.map(function(elemento, index) {
//            if (elemento.check === 1) {
//                $scope.element = angular.copy(elemento);
//                $scope.element.check = 0;
//                $scope.listaTecnicosDisponiblesMod.push(angular.copy($scope.element));
//            } else {
//                $scope.tecnicosAsignadosResMod.push(angular.copy(elemento));
//            }
//        });
//        $scope.allTecnicosDisponiblesMod = false;
//        $scope.allTecnicosAsignadosMod = false;
//        $scope.listaTecnicosAsignadosMod = $scope.tecnicosAsignadosResMod;
//    }
//
//    $scope.allTecnicosDisponiblesMod = false;
//    $scope.checkAllTecnicosDisponiblesMod = function() {
//        if ($scope.allTecnicosDisponiblesMod) {
//            $scope.allTecnicosDisponiblesMod = false;
//            $scope.listaTecnicosDisponiblesMod.map(function(elemento, index) {
//                elemento.check = 0;
//            });
//        } else {
//            $scope.allTecnicosDisponiblesMod = true;
//            $scope.listaTecnicosDisponiblesMod.map(function(elemento, index) {
//                elemento.check = 1;
//            });
//        }
//    }
//
//    $scope.allTecnicosAsignadosMod = false;
//    $scope.checkAllTecnicosAsignadosMod = function() {
//        if ($scope.allTecnicosAsignadosMod) {
//            $scope.allTecnicosAsignadosMod = false;
//            $scope.listaTecnicosAsignadosMod.map(function(elemento, index) {
//                elemento.check = 0;
//            });
//        } else {
//            $scope.allTecnicosAsignadosMod = true;
//            $scope.listaTecnicosAsignadosMod.map(function(elemento, index) {
//                elemento.check = 1;
//            });
//        }
//    }
//
//    $scope.modoficarInformacionUsuario = function() {
//        if ($scope.allTecnicosDisponiblesMod) {
//            $scope.params = {};
//            $scope.params.id = "";
//            $scope.params.nombre = "";
//            $scope.params.descripcion = "";
//            $scope.params.listaTecnicos = [];
//            $scope.params.compania = "";
//        }
//    }

}]);