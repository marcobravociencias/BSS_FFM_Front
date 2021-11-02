app.editarUsuarioController=function($scope,usuarioPIService,$q){

	var existePadreMod = false;
    $scope.detalleUsuario = {};
    $scope.respuestaDetalleUsuario = {};
    $scope.listaAccesosSelecionadosMod = [];
    $scope.listaIntervencionesSelecionadasMod = [];
    $scope.confirmacionModificacion = {};
    $scope.listaCiudadesSelecionadasMod = [];
    $scope.verBtnModificar = false;
    $scope.puestoRegistrado = [];
    $scope.listaCiudadNatalMod = [];
    $scope.listaTecnicosMod = [];
    $scope.listaDespachosMod = [];
    
    $scope.detalleUsuario.intervencionesId = [];
    $scope.detalleUsuario.geografiasId = [];
    $scope.detalleUsuario.permisosId = [];
    
    $scope.detalleUsuario.tecnicos = [];
	$scope.detalleUsuario.despachos = [];
    
    let acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    $scope.mostrarAccesosMod = false;
    $scope.mostrarTecnicosMod = false;
    $scope.mostrarDespachoMod = false;
    $scope.validarTamDatosMod = false;
    $scope.isTecnicoMod = false;
    
    $scope.contadorCambioArbolGeografias = false;

    consultarDetalleUsuario = function(idUsuario) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        $scope.params.idUsuario  = idUsuario;
        usuarioPIService.consultaUsuarioPorId($scope.params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result) {
                	
                    // ********** INFORMACION
                    $scope.detalleUsuario = response.data.result.usuario;
                    $("#compania_select_modificacion").val(""+$scope.detalleUsuario.idCompania);
                    $("#sexo_select_modificacion").val(""+$scope.detalleUsuario.genero);
                    if($scope.detalleUsuario.idAsignacionAutomatica == "1"){
                    	$("#checkAsignacionAutomaticaMod").text("  SI");
                    }else{
                    	$("#checkAsignacionAutomaticaMod").text("  NO");
                    }
                    var puestoSeleccionado = "";
                    $scope.puestoRegistrado = [];
                    angular.forEach($scope.listaPuestos,function(puesto,index){
                    	if(puesto.id == $scope.detalleUsuario.idTipoUsuario){
                    		$scope.puestoRegistrado.push(puesto);
                    		$("#puesto_select_modificacion").val(""+$scope.detalleUsuario.idTipoUsuario);
                    		puestoSeleccionado = puesto.descripcion.toLowerCase();
                    		puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
                    		if(puestoSeleccionado == "tecnico"){
                    			$scope.isTecnicoMod = true;
                    			$scope.mostrarAccesosMod = false;
                    		    $scope.mostrarTecnicosMod = false;
                    		    $scope.mostrarDespachoMod = true;
                    		}else{
                    			$scope.isTecnicoMod = false;
                    			$scope.mostrarAccesosMod = true;
                    		    $scope.mostrarTecnicosMod = true;
                    		    $scope.mostrarDespachoMod = false;
                    		}
                    	}
                    });
                    
                    var fecha = $scope.detalleUsuario.fechaIngreso.substring(0, 10).split('-');
                    $scope.detalleUsuario.fechaIngreso = fecha[2] + "/" + fecha[1] + "/" + fecha[0];
                    
                    // ********** INTERVENCIONES
                    $scope.arbolIntervencionesModificar = angular.copy($scope.listaIntervencionesRespaldo);
                    $scope.listaIntervencionesRegistradasMod = [];
                    $scope.detalleUsuario.intervencionesId = [];
                    
                    let intervencionesListaMod = [];
                    
                    angular.forEach($scope.arbolIntervencionesModificar,(element,index) => {
                        angular.forEach($scope.detalleUsuario.intervenciones,(intervencion,index) => {
                            if(element.id === intervencion.idTipoOrden) {
                                element.state = {selected: true, opened: true}
                                $scope.listaIntervencionesRegistradasMod.push(element);
                            }
                        });
                    });
                    
                    $("#arbolIntervencionMod").jstree('destroy');
                    $('#arbolIntervencionMod').bind('loaded.jstree', function(e, data) {
                        //$(this).jstree("open_all");
                    }).jstree({
                        'plugins': ['search', 'checkbox'],
                        'core': {
                            'data': $scope.arbolIntervencionesModificar,
                            'themes': {
                                'name': 'proton',
                                'responsive': true,
                                "icons":false        
                            }
                        }
                    });

                    $scope.listaIntervencionesRegistradasMod.forEach(intervencion =>{
                		if(intervencion.nivel == $scope.filtroIntervenciones){
                			var idPadre = intervencion.parent;
                			$scope.listaIntervencionesSelecionadasMod.forEach(intervencionPadre =>{
                				if(intervencionPadre.id == idPadre){
                					existePadreMod = true;
                					intervencionPadre.hijos.push(intervencion);
                				}
                			});
                			if(existePadreMod){
            				}else{
            					$scope.listaIntervencionesRespaldo.forEach(intervencionesListaGeneral =>{
            						if(intervencionesListaGeneral.id == idPadre){
            							$scope.listaIntervencionesSelecionadasMod.push(intervencionesListaGeneral);
            						}
            					});
            					$scope.listaIntervencionesSelecionadasMod.forEach(intervencionPadre =>{
            	    				if(intervencionPadre.id == idPadre){
            	    					intervencionPadre.hijos = [intervencion];
            	    				}
            	    			});
            				}
                			$scope.detalleUsuario.intervencionesId.push(intervencion.id);
                			existePadreMod = false;
                		}
                	});

                    // ********** ÁRBOL
                    var plugins = [];
                	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
                		plugins = ['search'];
                	}else{
                		plugins = ['search', 'checkbox', 'wholerow'];
                	}
                    
                    $scope.arbolCiudadesModificar = [];
                    $scope.listaGeografiasRegistradasMod = [];
                    $scope.detalleUsuario.geografiasId = [];
                    
                    angular.forEach($scope.listaGeografiasRespaldo,(element,index) => {
                        if(element.nivel <= $scope.filtroGeografias){
                            $scope.arbolCiudadesModificar.push({
                                id: element.id,
                                text: element.nombre,
                                parent: element.padre == undefined ? "#" : element.padre,
                                icon: "fa fa-tag",
                                nivel: element.nivel
                            });
                        }
                    });

                    angular.forEach($scope.arbolCiudadesModificar,(element,index) => {
                        angular.forEach($scope.detalleUsuario.geogragias,(geogra,index) => {
                            if(element.id === geogra.idGeografia) {
                                element.state = {selected: true, opened: true}
                                $scope.listaGeografiasRegistradasMod.push(element);
                            }
                        });
                    });

                    $("#arbolGeografiaMod").jstree('destroy');
                    $('#arbolGeografiaMod').bind('loaded.jstree', function(e, data) {
                        //$(this).jstree("open_all");
                    }).jstree({
                    	'plugins': plugins,
                        'core': {
                            'data': $scope.arbolCiudadesModificar,
                            'themes': {
                                'name': 'proton',
                                'responsive': true,
                                "icons":false        
                            }
                        }
                    });

                    $("#arbolGeografiaMod").on('changed.jstree', function (e, data) {
                    	if($scope.contadorCambioArbolGeografias == true){
                    		$scope.listaCiudadesSelecionadasMod = [];
                        	$scope.detalleUsuario.geografiasId = [];
                        	$scope.listaCiudadNatalMod = [];
                        	$scope.listaTecnicosMod = [];
                        	$scope.detalleUsuario.ciudadNatal = "";
                        	
                            var geografiaTreeMod = $('#arbolGeografiaMod').jstree("get_selected", true);
                            geografiaTreeMod.forEach(geo =>{
                            	if(geo.original.nivel == $scope.filtroGeografias){
                        			var idPadre = geo.parent;
                        			$scope.listaCiudadesSelecionadasMod.forEach(geoPadre =>{
                        				if(geoPadre.id == idPadre){
                        					existePadreMod = true;
                        					geoPadre.hijos.push(geo);
                        				}
                        			});
                        			if(existePadreMod){
                    				}else{
                    					$scope.listaGeografiasRespaldo.forEach(geoListaGeneral =>{
                    						if(geoListaGeneral.id == idPadre){
                    							$scope.listaCiudadesSelecionadasMod.push(geoListaGeneral);
                    						}
                    					});
                    					$scope.listaCiudadesSelecionadasMod.forEach(geoPadre =>{
                    	    				if(geoPadre.id == idPadre){
                    	    					geoPadre.hijos = [geo];
                    	    				}
                    	    			});
                    				}

                        			$scope.detalleUsuario.geografiasId.push(geo.id);
                        			existePadreMod = false;
                        		}
                            });
                            
                            $scope.listaCiudadesSelecionadasMod.forEach(geoHija =>{
                        		var geo = geoHija;
                        		while(geo.nivel > 2){
                        			var ciudadPadre = $scope.listaGeografiasRespaldo.filter(e => {return e.id == geo.parent})[0];
                        			geo = ciudadPadre;
                        		}
                        		var existeCiudadNatal = false;
                        		$scope.listaCiudadNatalMod.forEach(ciudadesNatal =>{
                        			if(ciudadesNatal.id == geo.id){
                        				existeCiudadNatal = true;
                        			}
                        		});
                        		if(existeCiudadNatal == false){
                        			$scope.listaCiudadNatalMod.push(geo);
                        		}
                        		
                        	});
                            
                            $scope.listaCiudadNatalMod.forEach(ciudadesNatal =>{
                    			if(ciudadesNatal.id == $scope.detalleUsuario.idGeografia){
                    				$scope.detalleUsuario.ciudadNatal = $scope.detalleUsuario.idGeografia;
                    				$(".ciudadNatalMod").css("color", "#7c7c7d");
                    			}
                    		});
                        	
                        	if(geografiaTreeMod.length > 0){
                        		if($scope.isTecnicoMod){
                            		//$scope.consultarDespachos();
                        			console.log("------");
                            	}else{
                            		$scope.consultarTecnicosMod();
                            	}
                        	}
                        	
                        	if($scope.listaCiudadesSelecionadasMod.length > 0){
                        		$("#labelGeografiasSeleccionadasMod").css("color", "rgb(70, 88, 107)");
                        		$("#contenedorGeografiasRegistroMod").css("border", "white solid 0px");
                        	}
                            
                            $scope.$apply();
                    	}
                    	$scope.contadorCambioArbolGeografias = true;
                    });
                    
                    // ********** ACCESOS
                    $scope.arbolAccesosModificar = angular.copy($scope.listaPermisosRespaldo);
                    $scope.listaAccesosRegistradosMod = [];
                    $scope.detalleUsuario.permisosId = [];
                    
                    angular.forEach($scope.arbolAccesosModificar,(element,index) => {
                        angular.forEach($scope.detalleUsuario.accesos,(acceso,index) => {
                            if(element.id === acceso.idPermiso) {
                                element.state = {selected: true, opened: true}
                                $scope.listaAccesosRegistradosMod.push(element);
                            }
                        });
                    });
                    
                    $("#arbolPermisoMod").jstree('destroy');
                    $('#arbolPermisoMod').bind('loaded.jstree', function(e, data) {
                        //$(this).jstree("open_all");
                    }).jstree({
                        'plugins': ['search', 'checkbox'],
                        'core': {
                            'data': $scope.arbolAccesosModificar,
                            'themes': {
                                'name': 'proton',
                                'responsive': true,
                                "icons":false        
                            }
                        }
                    });

                    $scope.listaAccesosRegistradosMod.forEach(permiso =>{
                		if(permiso.nivel == 2){
                			var idPadre = permiso.parent;
                			$scope.listaAccesosSelecionadosMod.forEach(permisosPadre =>{
                				if(permisosPadre.id == idPadre){
                					existePadreMod = true;
                					permisosPadre.hijos.push(permiso);
                				}
                			});
                			if(existePadreMod){
            				}else{
            					$scope.listaPermisosRespaldo.forEach(permisosListaGeneral =>{
            						if(permisosListaGeneral.id == idPadre){
            							$scope.listaAccesosSelecionadosMod.push(permisosListaGeneral);
            						}
            					});
            					$scope.listaAccesosSelecionadosMod.forEach(permisosPadre =>{
            	    				if(permisosPadre.id == idPadre){
            	    					permisosPadre.hijos = [permiso];
            	    				}
            	    			});
            				}
                			$scope.detalleUsuario.permisosId.push(permiso.id);
                			existePadreMod = false;
                		}
                	});

                    // ********** TECNICO
                    if($scope.detalleUsuario.geografiasId.length > 0){
                    	//$scope.consultarTecnicosMod();
                    }

                    // ********** CONFIRMAR USUARIO
                    $scope.detalleUsuario.ciudadNatal = $scope.detalleUsuario.idGeografia;
                    
                    
                    $("#modalEdicionUsuario").modal('show');
                    
                } else {
                    
                }
                
                swal.close();
            } else {
                mostrarMensajeErrorAlert(response.data.result.mensaje)
                swal.close();
            }
            
        }).catch(err => handleError(err));
    }
    
    $scope.iniciarFechaMod = function () {
        $('#form-fechaIngreso-mod').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true
        });
    }
    $scope.iniciarFechaMod();

    $("#arbolIntervencionMod").click(function() {
    	$scope.listaIntervencionesSelecionadasMod = [];
    	$scope.detalleUsuario.intervencionesId = [];
    	
        var intervencionesTree = $('#arbolIntervencionMod').jstree("get_selected", true);
        intervencionesTree.forEach(intervencion =>{
            var existePadreMod = false;
            if(intervencion.original.nivel == $scope.filtroIntervenciones){
    			var idPadre = intervencion.original.idPadre;
    			$scope.listaIntervencionesSelecionadasMod.forEach(intervencionPadre =>{
    				if(intervencionPadre.id == idPadre){
    					existePadreMod = true;
    					intervencionPadre.hijos.push(intervencion);
    				}
    			});
    			if(existePadreMod){
				}else{
					$scope.listaIntervencionesRespaldo.forEach(intervencionesListaGeneral =>{
						if(intervencionesListaGeneral.id == idPadre){
							$scope.listaIntervencionesSelecionadasMod.push(intervencionesListaGeneral);
						}
					});
					$scope.listaIntervencionesSelecionadasMod.forEach(intervencionPadre =>{
	    				if(intervencionPadre.id == idPadre){
	    					intervencionPadre.hijos = [intervencion];
	    				}
	    			});
				}

    			$scope.detalleUsuario.intervencionesId.push(intervencion.id);
    			existePadreMod = false;
    		}
        });
        
        if($scope.listaIntervencionesSelecionadasMod.length > 0){
        	$("#labelIntervencionesSeleccionadasMod").css("color", "rgb(70, 88, 107)");
        	$("#contenedorIntervencionesRegistroMod").css("border", "white solid 0px");
        }
        $scope.$apply();
    });

    $("#arbolPermisoMod").click(function() {
    	$scope.listaAccesosSelecionadosMod = [];
    	$scope.detalleUsuario.permisosId = [];
        var permisos = $('#arbolPermisoMod').jstree("get_selected", true);
        permisos.forEach(permiso =>{
            var existePadreMod = false;
            if(permiso.original.nivel == 2){
    			var idPadre = permiso.original.idPadre;
    			$scope.listaAccesosSelecionadosMod.forEach(permisosPadre =>{
    				if(permisosPadre.id == idPadre){
    					existePadreMod = true;
    					permisosPadre.hijos.push(permiso);
    				}
    			});
    			if(existePadreMod){
				}else{
					$scope.listaPermisosRespaldo.forEach(permisosListaGeneral =>{
						if(permisosListaGeneral.id == idPadre){
							$scope.listaAccesosSelecionadosMod.push(permisosListaGeneral);
						}
					});
					$scope.listaAccesosSelecionadosMod.forEach(permisosPadre =>{
	    				if(permisosPadre.id == idPadre){
	    					permisosPadre.hijos = [permiso];
	    				}
	    			});
				}
    			$scope.detalleUsuario.permisosId.push(permiso.id);
    			existePadreMod = false;
    		}
        });
        
        if($scope.listaAccesosSelecionadosMod.length > 0){
        	$("#labelPermisosSeleccionadasMod").css("color", "rgb(70, 88, 107)");
        	$("#contenedorPermisosRegistroMod").css("border", "white solid 0px");
        }
        $scope.$apply();
    });
    
  //CUANDO SELECCCIONE UNA CIUDAD NATAL LOS RADIOS REGRESAN A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA CONFIRMACIÓN MODIFICACIÓN USUARIO
    $scope.asignarCiudadNatalMod = function() {
    	$(".ciudadNatalMod").css("color", "#7c7c7d");
	}
    
  //MÉTODO PARA VALIDACIÓN DE INFORMACIÓN DE LOS DATOS MOSTRADOS EN LA VISTA - PESTAÑA CONFIRMACIÓN MOD USUARIO
    $scope.cargarInfoConfirmacionModificacion = function() {
    	$scope.confirmacionModificacion.nombre = 
          $scope.detalleUsuario.nombre !== undefined && $scope.detalleUsuario.nombre !== "" &&
          $scope.detalleUsuario.apellidoPaterno !== undefined && $scope.detalleUsuario.apellidoPaterno !== "" &&
          $scope.detalleUsuario.apellidoMaterno !== undefined && $scope.detalleUsuario.apellidoMaterno !== "" ?
          $scope.detalleUsuario.nombre + ' ' + $scope.detalleUsuario.apellidoPaterno + ' ' + $scope.detalleUsuario.apellidoMaterno : "Sin asignar";
    	$scope.confirmacionModificacion.usuario = $scope.detalleUsuario.usuario !== undefined && $scope.detalleUsuario.usuario !== "" ? $scope.detalleUsuario.usuario : "Sin asignar";
    	$scope.confirmacionModificacion.correo = $scope.detalleUsuario.correo !== undefined && $scope.detalleUsuario.correo !== "" ? $scope.detalleUsuario.correo : "Sin asignar";
    	$scope.confirmacionModificacion.contrasena = $scope.detalleUsuario.contrasena !== undefined && $scope.detalleUsuario.contrasena !== "" ? $scope.detalleUsuario.contrasena : "Sin asignar";
    	$scope.confirmacionModificacion.puesto = $("#puesto_select_modificacion option:selected").text();
    	$scope.confirmacionModificacion.fechaIngreso = $scope.detalleUsuario.fechaIngreso !== undefined && $scope.detalleUsuario.fechaIngreso !== "" ? $scope.detalleUsuario.fechaIngreso : "Sin asignar";
    	
    	$scope.verBtnModificar = true;
    }
    
  //VERIFICA EL ESTADO DEL CHECK PARA COLOCAR 'SI' O 'NO', SEGÚN EL ESTADO - PESTAÑA INFORMACIÓN REGISTRO USUARIO
	$scope.cambiarCheckAsignacionAutomaticaMod = function() {
		if($("#form-asignacionAutomatica-mod").prop('checked')){
			$("#checkAsignacionAutomaticaMod").text("  SI");
		}else{
			$("#checkAsignacionAutomaticaMod").text("  NO");
		}
	}

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
    });
	
	//SELECCIONA O DESELECCIONA EL TÉCNICO ELEGIDO - PESTAÑA TÉCNICOS MODIFICACUÓN USUARIO
	$scope.seleccionarTecnicoMod = function(tecnicoSeleccionado) {
		if(tecnicoSeleccionado.checkedOpcion){
			tecnicoSeleccionado.checkedOpcion = false;
		}else{
			tecnicoSeleccionado.checkedOpcion = true;
			$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
			$("#contenedorTecnicosMod").css("border", "white solid 0px");
		}
		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
			if(tecnico.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosTecnicosMod").prop("checked",true);
		}else{
			$("#checkTotdosTecnicosMod").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS TÉCNICOS - PESTAÑA TÉCNICOS MODIFICACIÓN USUARIO
	$scope.seleccionarTodosTecnicosMod = function() {
		var check;
		if($("#checkTotdosTecnicosMod").prop('checked')){
			check = true;
			$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
			$("#contenedorTecnicosMod").css("border", "white solid 0px");
		}else{
			check = false;
		}
		angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
			tecnico.checkedOpcion = check;
		});
	}
	
	$scope.revisionTecnicosDespachosMod = function() {
		$scope.verBtnModificar = false;
		
		if($scope.detalleUsuario.geografiasId !== undefined){
			if($scope.detalleUsuario.geografiasId.length > 0){
				if($scope.isTecnicoMod){
					if($scope.listaDespachosMod == ""){
						toastr.warning('¡No existen despachos actualmente!');
					}
				}else{
					if($scope.listaTecnicosMod == ""){
						toastr.warning('¡No existen técnicos actualmente!');
					}
				}
			}else{
				toastr.warning('¡Selecciona al menos una geografía!');
			}
		}else{
			toastr.warning('¡Selecciona al menos una geografía!');
		}
	}
	
	$scope.consultarTecnicosMod = function() {
		$scope.listaTecnicosMod = [];
		let params = {idGeografia:$scope.detalleUsuario.geografiasId};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarTecnicos(params)
        ]).then(function(results) {
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
            		if(results[0].data.result.usuarios !== null){
	            		if(results[0].data.result.usuarios.length > 0){
	            			$scope.listaTecnicosMod = results[0].data.result.usuarios;
	            			$("#checkTotdosTecnicosMod").prop("checked",false);
	            	    	angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
	            	    		tecnico.checkedOpcion = false;
	            			});
	            	    	angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
	            	    		angular.forEach($scope.detalleUsuario.idOperarios,function(tecnicoRegistrado,index){
	            	    			if(tecnico.idUsuario == tecnicoRegistrado.idOperador){
	            	    				tecnico.checkedOpcion = true;
	            	    			}
	            	    		});
	            			});
	            	    	$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
	            			$("#contenedorTecnicosMod").css("border", "white solid 0px");
	            		}else{
	            			$scope.listaTecnicosMod = [];
	            		}
            		}else{
            			$scope.listaTecnicosMod = [];
            		}
            	}else{
            		$scope.listaTecnicosMod = [];
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
        	swal.close();
        });
	}
	
	$scope.modificarUsuario = function() {
		$scope.detalleUsuario.tecnicos = [];
		$scope.detalleUsuario.despachos = [];
		var puestoSeleccionadoMod = $("#puesto_select_modificacion option:selected").val();
    	var companiaSeleccionadaMod = $("#compania_select_modificacion option:selected").val();
		var sexoMod = $("#sexo_select_modificacion option:selected").val();
		var fechaSeleccionadaMod = $scope.detalleUsuario.fechaIngreso.split('/');
		
		if($scope.isTecnicoMod){
			angular.forEach($scope.listaDespachosMod,function(despacho,index){
				if(despacho.checkedOpcion == true){
					$scope.detalleUsuario.despachos.push(despacho.idUsuario);
				}
			});
		}else{
			angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
				if(tecnico.checkedOpcion == true){
					$scope.detalleUsuario.tecnicos.push(tecnico.idUsuario);
				}
			});
		}
		
		var respuestaValidacionCamposMod = $scope.validarInformacionModificacion();
		
		if(respuestaValidacionCamposMod){
			
			swal({
		        title: "Se actualizará la información del usuario",
		        text: "\u00BFDesea editar la información del usuario?",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: '#007bff',
		        confirmButtonText: 'Si',
		        cancelButtonText: 'Cancelar'
		      }).then(function (isConfirm) {
		        if (isConfirm) {
		        	let paramsMod = {
							id: $scope.detalleUsuario.idUsuario,
							nombre: $scope.detalleUsuario.nombre,
							apellidoPaterno: $scope.detalleUsuario.apellidoPaterno,
							apellidoMaterno: $scope.detalleUsuario.apellidoMaterno,
							numeroEmpleado: $scope.detalleUsuario.numeroEmpleado,
							usuario: $scope.detalleUsuario.usuario,
							rfc: $scope.detalleUsuario.rfc,
							curp: $scope.detalleUsuario.curp,
							genero: sexoMod,
							fotoPerfil: {
								bucketId: "",
							    archivo: "",
							    nombre: ""
							},
							correoElectronico: $scope.detalleUsuario.correo,
							telefonoCelular: $scope.detalleUsuario.telefonoCelular,
							idGeografia: $scope.detalleUsuario.ciudadNatal,
							llaveExterna: "4532",
							idTipoUsuario: puestoSeleccionadoMod,
							idProveedor: companiaSeleccionadaMod,
							idDispositivo: "string",
							fechaAlta: fechaSeleccionadaMod[2] + '-' + fechaSeleccionadaMod[1] + '-' + fechaSeleccionadaMod[0],
							geografias: $scope.detalleUsuario.geografiasId,
							intervenciones: $scope.detalleUsuario.intervencionesId,
							idOperarios: $scope.isTecnicoMod == true ? $scope.detalleUsuario.despachos : $scope.detalleUsuario.tecnicos,
							permisos: $scope.isTecnicoMod == true ? [] : $scope.detalleUsuario.permisosId,
							idAsignacionAutomatica: $scope.detalleUsuario.idAsignacionAutomatica
					}
					
					swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		    		swal.showLoading();
		        	$q.all([
		        		usuarioPIService.modificarUsuario(paramsMod)
		            ]).then(function(results) {
		            	swal.close();
		            	if(results[0].data.respuesta){
		            		swal("Correcto", "¡Modificación realizada con éxito!", "success");
		            		$scope.limpiarDatosModificacion();
		            		$scope.resetearTablaUsuariosConsulta();
		            	}else{
		            		swal("Error", results[0].data.resultDescripcion, "error");
		            	}
		            });
		        }
		      }).catch(err => {

		      });
		}
		
	}
	
	//VALIDACIÓN GENERAL DE DATOS DEL SUBMÓDULO MODIFICAR USUARIO
    $scope.validarInformacionModificacion = function() {
    	var validacion = true;
    	var validacionInformacionGeneral = true;
    	var validacionIntervenciones = true;
    	var validacionArbol = true;
    	var validacionAccesos = true;
    	var validacionTecnicos = true;
    	var validacionDespachos = true;
    	var mensaje = "VALIDA LOS SIGUIENTES CAMPOS: ";
    	
    	
    	//PESTAÑA INFORMACIÓN GENERAL
		if($("#puesto_select_modificacion").val() === "" || $("#puesto_select_modificacion").val() === undefined || $("#puesto_select_modificacion").val() === null){
			$("#puesto_select_modificacion").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Puesto";
		}else{
			$("#puesto_select_modificacion").css("border", "1px solid #bdbdbd");
		}
		
		if($("#compania_select_modificacion").val() === "" || $("#compania_select_modificacion").val() === undefined || $("#compania_select_modificacion").val() === null){
			$("#compania_select_modificacion").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Compañía";
		}else{
			$("#compania_select_modificacion").css("border", "1px solid #bdbdbd");
		}
		
		if($scope.detalleUsuario.numeroEmpleado === "" || $scope.detalleUsuario.numeroEmpleado === undefined){
			$("#form-num-empleado-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Número empleado";
		}else{
			$("#form-num-empleado-mod").css("border", "1px solid #bdbdbd");
		}
		
		if($scope.detalleUsuario.usuario === "" || $scope.detalleUsuario.usuario === undefined){
			$("#form-usuario-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Usuario";
		}else{
			$("#form-usuario-mod").css("border", "1px solid #bdbdbd");
		}
		
		if($scope.detalleUsuario.nombre === "" || $scope.detalleUsuario.nombre === undefined){
			$("#form-nombres-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Nombre";
		}else{
			$("#form-nombres-mod").css("border", "1px solid #bdbdbd");
		}
		
		if($scope.detalleUsuario.apellidoPaterno === "" || $scope.detalleUsuario.apellidoPaterno === undefined){
			$("#form-a-paterno-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Apellido paterno";
		}else{
			$("#form-a-paterno-mod").css("border", "1px solid #bdbdbd");
		}
		
		if($scope.detalleUsuario.apellidoMaterno === "" || $scope.detalleUsuario.apellidoMaterno === undefined){
			$("#form-a-materno-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Apellido materno";
		}else{
			$("#form-a-materno-mod").css("border", "1px solid #bdbdbd");
		}
		
		if($scope.detalleUsuario.curp === "" || $scope.detalleUsuario.curp === undefined){
			$("#form-curp-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *CURP";
		}else{
			if($scope.validarTamDatosMod){
				if($scope.detalleUsuario.curp.length == 18){
					$("#form-curp-mod").css("border", "1px solid #bdbdbd");
				}else{
					$("#form-curp-mod").css("border-bottom", "2px solid #f55756");
					validacionInformacionGeneral = false;
					mensaje = mensaje + "<br/> *Formato de la CURP (18 dígitos)";
				}
			}else{
				$("#form-curp-mod").css("border", "1px solid #bdbdbd");
			}
			
		}
		
		if($scope.detalleUsuario.rfc === "" || $scope.detalleUsuario.rfc === undefined){
			$("#form-rfc-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *RFC";
		}else{
			if($scope.validarTamDatosMod){
				if($scope.informacionRegistro.rfc.length == 12 || $scope.informacionRegistro.rfc.length == 13){
					$("#form-rfc-mod").css("border", "1px solid #bdbdbd");
				}else{
					$("#form-rfc-mod").css("border-bottom", "2px solid #f55756");
					validacionInformacionGeneral = false;
					mensaje = mensaje + "<br/> *Formato del RFC (12-13 dígitos)";
				}
			}else{
				$("#form-rfc-mod").css("border", "1px solid #bdbdbd");
			}
		}
		
		if($scope.detalleUsuario.telefonoCelular === "" || $scope.detalleUsuario.telefonoCelular === undefined){
			$("#form-telefono-contacto-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Teléfono de contacto";
		}else{
			if($scope.validarTamDatosMod){
				if($scope.informacionRegistro.telefonoContacto.length == 10){
					$("#form-telefono-contacto-mod").css("border", "1px solid #bdbdbd");
				}else{
					$("#form-telefono-contacto-mod").css("border-bottom", "2px solid #f55756");
					validacionInformacionGeneral = false;
					mensaje = mensaje + "<br/> *Formato del teléfono (10 dígitos)";
				}
			}else{
				$("#form-telefono-contacto-mod").css("border", "1px solid #bdbdbd");
			}
		}
		
		if($scope.detalleUsuario.correo === "" || $scope.detalleUsuario.correo === undefined){
			$("#form-correo-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Correo electrónico";
		}else{
			if($("#form-correo-mod").val().indexOf('@', 0) == -1 || $("#form-correo-mod").val().indexOf('.', 0) == -1) {
				$("#form-correo-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				toastr.warning("¡Valida el formato del correo electrónico!");
			}else{
				$("#form-correo-mod").css("border", "1px solid #bdbdbd");
			}
		}

		if($scope.detalleUsuario.fechaIngreso === "" || $scope.detalleUsuario.fechaIngreso === undefined || $scope.detalleUsuario.fechaIngreso === null){
			$("#form-fechaIngreso-mod").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Fecha de ingreso";
		}else{
			$("#form-fechaIngreso-mod").css("border", "1px solid #bdbdbd");
		}
		
		if($("#sexo_select_modificacion").val() === "" || $("#sexo_select_modificacion").val() === undefined || $("#sexo_select_modificacion").val() === null){
			$("#sexo_select_modificacion").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Sexo";
		}else{
			$("#sexo_select_modificacion").css("border", "1px solid #bdbdbd");
		}
		
		//PESTAÑA INTERVENCIONES
		if($scope.listaIntervencionesSelecionadasMod == "" || $scope.listaIntervencionesSelecionadasMod == undefined || $scope.listaIntervencionesSelecionadasMod == null){
			validacionIntervenciones = false;
			mensaje = mensaje + "<br/> *Intervención(es)";
			$("#labelIntervencionesSeleccionadasMod").css("color", "#f55756");
			$("#contenedorIntervencionesRegistroMod").css("border", "#f55756 solid 1px");
		}else{
			$("#labelIntervencionesSeleccionadasMod").css("color", "rgb(70, 88, 107)");
			$("#contenedorIntervencionesRegistroMod").css("border", "white solid 0px");
		}
		
		//PESTAÑA ÁRBOL
		if($scope.listaCiudadesSelecionadasMod == "" || $scope.listaCiudadesSelecionadasMod == undefined || $scope.listaCiudadesSelecionadasMod == null){
			validacionArbol = false;
			mensaje = mensaje + "<br/> *Geografía(s)";
			$("#labelGeografiasSeleccionadasMod").css("color", "#f55756");
			$("#contenedorGeografiasRegistroMod").css("border", "#f55756 solid 1px");
		}else{
			$("#labelGeografiasSeleccionadasMod").css("color", "rgb(70, 88, 107)");
			$("#contenedorGeografiasRegistroMod").css("border", "white solid 0px");
		}
		
		//CHECK SI EL PUESTO SELECCIONADO ES TÉCNICO NO VALIDA (TÉCNICOS Y PERMISOS) Y SI NO ES TÉCNICO SI VALIDA DICHA INFORMACIÓN
		if($scope.isTecnicoMod == false){
			//PESTAÑA ACCESOS (PERMISOS)
    		if($scope.listaAccesosSelecionadosMod == "" || $scope.listaAccesosSelecionadosMod == undefined || $scope.listaAccesosSelecionadosMod == null){
    			validacionAccesos = false;
    			mensaje = mensaje + "<br/> *Permiso(s)";
    			$("#labelPermisosSeleccionadasMod").css("color", "#f55756");
    			$("#contenedorPermisosRegistroMod").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelPermisosSeleccionadasMod").css("color", "rgb(70, 88, 107)");
    			$("#contenedorPermisosRegistroMod").css("border", "white solid 0px");
    		}
    		
    		//PESTAÑA TÉCNICOS
        	var checkTec = 0;
    		angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
    			if(tecnico.checkedOpcion == true){
    				checkTec++;
    			}
    		});
    		if(checkTec < 1){
    			validacionTecnicos = false;
    			mensaje = mensaje + "<br/> *Técnico(s)";
    			$("#labelTecnicosSeleccionadosMod").css("color", "#f55756");
    			$("#contenedorTecnicosMod").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
    			$("#contenedorTecnicosMod").css("border", "white solid 0px");
    		}
		}else{
			//PESTAÑA DESPACHOS
			//--------------------------------PENDIENTE PARA CUANDO ESTÉ EL SERVICIO DE DESPACHOS--------------------------------
//        	var checkDes = 0;
//    		angular.forEach($scope.listaDespachosMod,function(despacho,index){
//    			if(despacho.checkedOpcion == true){
//    				checkDes++;
//    			}
//    		});
//    		if(checkDes < 1){
//    			validacionDespachos = false;
//    			mensaje = mensaje + "<br/> *Despachos(s)";
//    			$("#labelDespachosSeleccionadosMod").css("color", "#f55756");
//    			$("#contenedorDespachosMod").css("border", "#f55756 solid 1px");
//    		}else{
//    			$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
//    			$("#contenedorDespachosMod").css("border", "white solid 0px");
//    		}
		}
    	
    	//PESTAÑA CONFIRMAR USUARIO
    	if($scope.detalleUsuario.ciudadNatal == "" || $scope.detalleUsuario.ciudadNatal == undefined){
    		$(".ciudadNatalMod").css("color", "#f55756");
    		validacion = false;
			mensaje = mensaje + "<br/> *Ciudad natal";
    	}else{
    		$(".ciudadNatalMod").css("color", "#7c7c7d");
    	}
		
		//VALIDACIÓN Y ACTIVACIÓN DE PESTAÑAS
		if(validacionInformacionGeneral == false){
			validacion = false;
			$("#pills-confirmar-tab-mod").removeClass("active");
			$("#pills-confirmar-mod").removeClass("active show");
			$("#pills-informacion-tab-mod").addClass("active");
			$("#pills-informacion-mod").addClass("active show");
		}else if(validacionIntervenciones == false){
			validacion = false;
			$("#pills-confirmar-tab-mod").removeClass("active");
			$("#pills-confirmar-mod").removeClass("active show");
			$("#pills-intervencion-tab-mod").addClass("active");
			$("#pills-intervencion-mod").addClass("active show");
		}else if(validacionArbol == false){
			validacion = false;
			$("#pills-confirmar-tab-mod").removeClass("active");
			$("#pills-confirmar-mod").removeClass("active show");
			$('#arbolGeografiaRegistro-mod').jstree("destroy");
	    	$('#arbolGeografiaRegistro-mod').jstree("deselect_all");
			$scope.mostrarArbolGeografiaRegistro();
			$("#pills-arbol-tab-mod").addClass("active");
			$("#pills-arbol-mod").addClass("active show");
		}else if(validacionAccesos == false){
			validacion = false;
			$("#pills-confirmar-tab-mod").removeClass("active");
			$("#pills-confirmar-mod").removeClass("active show");
			$("#pills-accesos-tab-mod").addClass("active");
			$("#pills-accesos-mod").addClass("active show");
		}else if(validacionTecnicos == false){
			validacion = false;
			$("#pills-confirmar-tab-mod").removeClass("active");
			$("#pills-confirmar-mod").removeClass("active show");
			$("#pills-tecnico-tab-mod").addClass("active");
			$("#pills-tecnico-mod").addClass("active show");
		}else if(validacionDespachos == false){
			validacion = false;
			$("#pills-confirmar-tab-mod").removeClass("active");
			$("#pills-confirmar-mod").removeClass("active show");
			$("#pills-despacho-tab-mod").addClass("active");
			$("#pills-despacho-mod").addClass("active show");
		}else{
			//...
		}
		
		//SI EXISTE ALGÚN CAMPO FALTANTE, MUESTRA EL MENSAJE
		if(validacion == false){
			toastr.warning(mensaje);
		}
		
		//REGRESA LA RESPUESTA BOLEANA
		return validacion;
	}
    
    $scope.ocultarBotonMod = function() {
    	$scope.verBtnModificar = false;
	}
    
    $scope.limpiarDatosModificacion = function() {
    	$scope.detalleUsuario.intervencionesId = [];
    	$scope.listaIntervencionesSelecionadasMod = [];
        $scope.detalleUsuario.geografiasId = [];
        $scope.listaCiudadesSelecionadasMod = [];
        $scope.detalleUsuario.permisosId = [];
        $scope.listaAccesosSelecionadosMod = [];
        $scope.detalleUsuario.tecnicos = [];
		$scope.detalleUsuario.despachos = [];
		$scope.listaTecnicosMod = [];
	    $scope.listaDespachosMod = [];
	    $scope.listaCiudadNatalMod = [];
		$('#arbolIntervencionMod').jstree("destroy");
		$('#arbolGeografiaMod').jstree("destroy");
		$('#arbolPermisoMod').jstree("destroy");
		$("#puesto_select_modificacion"). prop("selectedIndex",0);
    	$("#compania_select_modificacion"). prop("selectedIndex",0);
    	$("#sexo_select_modificacion"). prop("selectedIndex",0);
    	$("#checkTotdosTecnicosMod").prop("checked",false);
    	$scope.detalleUsuario.ciudadNatal = "";
    	$scope.detalleUsuario.idAsignacionAutomatica
    	$scope.detalleUsuario = {};
    	$scope.confirmacionModificacion = {};
    	$scope.mostrarAccesosMod = false;
        $scope.mostrarTecnicosMod = false;
        $scope.mostrarDespachoMod = false;
        $scope.isTecnicoMod = false;
        $scope.verBtnModificar = false;
        $scope.contadorCambioArbolGeografias = false;
        $scope.iniciarFechaMod();
        $("#pills-confirmar-tab-mod").removeClass("active");
		$("#pills-confirmar-mod").removeClass("active show");
		$("#pills-despacho-tab-mod").removeClass("active");
		$("#pills-despacho-mod").removeClass("active show");
		$("#pills-tecnico-tab-mod").removeClass("active");
		$("#pills-tecnico-mod").removeClass("active show");
		$("#pills-accesos-tab-mod").removeClass("active");
		$("#pills-accesos-mod").removeClass("active show");
		$("#pills-arbol-tab-mod").removeClass("active");
		$("#pills-arbol-mod").removeClass("active show");
		$("#pills-intervencion-tab-mod").removeClass("active");
		$("#pills-intervencion-mod").removeClass("active show");
		
		$("#pills-informacion-tab-mod").addClass("active");
		$("#pills-informacion-mod").addClass("active show");
		$("#modalEdicionUsuario").modal('hide');
    }
    
    $scope.cerrarModalEdicionUsuario = function() {
    	$scope.limpiarDatosModificacion();
	}
	
	//LOS SIGUIENTES 2 MÉTODOS SE QUEDAN PENDIENTES POR SI EN ALGÚN MOMENTO SE DECIDE EDITAR TAMBIÉN EL PUESTO DEL USUARIO
//	$('#puesto_select_modificacion').on('change', function() {
//    	$("#puesto_select_modificacion").css("border", "1px solid #bdbdbd");
//    	$('#arbolGeografiaMod').jstree("destroy");
//    	$('#arbolIntervencionMod').jstree("deselect_all");
//    	$('#arbolGeografiaMod').jstree("deselect_all");
//    	$('#arbolPermisoMod').jstree("deselect_all");
//    	$("#arbolIntervencionMod").jstree('close_all');
//    	$("#arbolGeografiaMod").jstree('close_all');
//    	$("#arbolPermisoMod").jstree('close_all');
//    	$("#buscadorIntervencionMod").val("");
//    	$("#buscadorGeografiaMod").val("");
//    	$("#buscadorPermisosMod").val("");
//    	$scope.listaIntervencionesSelecionadasMod = [];
//    	$scope.listaCiudadesSelecionadasMod = [];
//    	$scope.listaAccesosSelecionadosMod = [];
//    	// ----------------------------------------------------------------------------------------------------------------PENDIENTE DE REGISTROS DE ID'S
//    	// ----------------------------------------------------------------------------------------------------------------PENDIENTE DE REGISTROS DE ID'S
//    	// ----------------------------------------------------------------------------------------------------------------PENDIENTE DE REGISTROS DE ID'S
//    	//$scope.informacionRegistro.geografias = [];
//    	
//    	var puestoSeleccionado = $("#puesto_select_modificacion option:selected").text().toLowerCase();
//    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
//    	if(puestoSeleccionado == "tecnico"){
//    		$scope.mostrarAccesosMod = false;
//    	    $scope.mostrarTecnicosMod = false;
//    	    $scope.isTecnicoMod = true;
//    	    $scope.mostrarDespachoMod = true;
//    	}else{
//    		$scope.mostrarAccesosMod = true;
//    	    $scope.mostrarTecnicosMod = true;
//    	    $scope.isTecnicoMod = false;
//    	    $scope.mostrarDespachoMod = false;
//    	}
//    	$scope.$apply();
//    });
//	
//	//MÉTODO QUE MUESTRA EL TIPO DE ÁRBOL DE GEOGRAFÍAS SEGÚN EL PUESTO SELECCIONADO - PESTAÑA ÁRBOL MODIFICAR USUARIO
//    $scope.mostrarArbolGeografiaMod = function() {
//    	var puestoSeleccionado = $("#puesto_select_modificacion option:selected").text().toLowerCase();
//    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
//    	var plugins = [];
//    	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
//    		plugins = ['search'];
//    	}else{
//    		plugins = ['search', 'checkbox', 'wholerow'];
//    	}
//    	
//    	let geografiasNivelCiudad = [];
//    	angular.forEach($scope.listaGeografiasRespaldo,function(elementoGeografia,index){
//    		if(elementoGeografia.nivel <= $scope.filtroGeografias){
//    			geografiasNivelCiudad.push(elementoGeografia);
//    		}
//    	});
//    	
//    	let geografia = geografiasNivelCiudad;
//        geografia.map((e)=>{
//            e.parent=e.padre == undefined ? "#" : e.padre;
//            e.text= e.nombre;
//            e.icon= "fa fa-globe";
//            return e
//        })       
//        $('#arbolGeografiaMod').bind('loaded.jstree', function(e, data) {
//			//$(this).jstree("open_all");
//        }).jstree({
//        	'plugins': plugins,
//			'core': {
//				'data': geografia,
//                'themes': {
//                    'name': 'proton',
//                    'responsive': true,
//                    "icons":false        
//                }
//            }
//		});
//	}
}