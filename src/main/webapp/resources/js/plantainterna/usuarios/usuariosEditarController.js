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
    $scope.listaIdsGeografiaCiudadNatalMod = [];
    $scope.detalleUsuario.intervencionesId = [];
    $scope.detalleUsuario.geografiasId = [];
    $scope.detalleUsuario.permisosId = [];
    $scope.detalleUsuario.tecnicos = [];
	$scope.detalleUsuario.despachos = [];
    let acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    $scope.mostrarAccesosMod = false;
    $scope.mostrarTecnicosMod = false;
    $scope.mostrarDespachoMod = false;
    $scope.validarTamDatosMod = true;
    $scope.isTecnicoMod = false;
    $scope.contadorCambioArbolGeografias = false;
    $scope.fileFotoUsuarioMod = null;
    
//	CONFIGURACIÓN DE TABS
    $scope.configuracionPuestoRegistradoMod = null;
    
	$scope.tabInformacionMod = true;
	$scope.tabIntervencionesMod = false;
	$scope.tabArbolMod = false;
	$scope.tabAccesosMod = false;
	$scope.tabTecnicosMod = false;
	$scope.tabDespachosMod = false;
	$scope.tabConfirmacionMod = false;
	
	$scope.tabInformacionVW_ASIG_AUTOMATICA_mod = true;
	$scope.tabInformacionVL_RFC_mod = true;
	$scope.tabInformacionVL_CURP_mod = true;
	$scope.tabArbol_LB_N1_mod = "";
	$scope.tabArbol_LB_N2_mod = "";
	$scope.tabArbol_NV_GEOGRAFIA_mod;
	$scope.tabIntervenciones_NV_INTERVENCIONES_mod;
	
	$scope.geoSelectMod = [];
	$scope.intervencionSelectMod = [];

    //MÉTODO QUE REALIZA LA CONSULTA ESPECÍFICA POR ID DE USUARIO (CLIC EN BOTÓN DE MODIFICAR EN LA TABLA DE CONSULTA), Y PREPARA LA VISTA DE MODIFICACIÓN
    consultarDetalleUsuario = function(idUsuario) {
    	if($scope.configPermisoAccionEditaUsuarios){
    		swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            $scope.params = {};
            $scope.params.idUsuario  = idUsuario;
            usuarioPIService.consultaUsuarioPorId($scope.params).then(function success(response) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                    	
                        // ********** PREPARA LOS DATOS DE LA PESTAÑA DE INFORMACION
                        $scope.detalleUsuario = response.data.result.usuario;
                        $("#compania_select_modificacion").val(""+$scope.detalleUsuario.idCompania);
                        $("#sexo_select_modificacion").val(""+$scope.detalleUsuario.genero);
                        if($scope.detalleUsuario.idAsignacionAutomatica == "1"){
                        	$("#checkAsignacionAutomaticaMod").text("  SI");
                        }else{
                        	$("#checkAsignacionAutomaticaMod").text("  NO");
                        }
                        
                        $scope.configuracionPuestoRegistradoMod = $scope.listaPuestos.filter(e => {return e.id == $scope.detalleUsuario.idTipoUsuario})[0];
                        angular.forEach($scope.configuracionPuestoRegistradoMod.tabs,function(tab,index){
                    		switch(tab.llaveFront){
                            	case "tabInformacion":
                            		$scope.tabInformacionMod = true;
                            		break;
                            	case "tabIntervenciones":
                            		$scope.tabIntervencionesMod = true;
                            		break;
                            	case "tabArbol":
                            		$scope.tabArbolMod = true;
                            		break;
                            	case "tabAccesos":
                            		$scope.tabAccesosMod = true;
                            		break;
                            	case "tabTecnicos":
                            		$scope.tabTecnicosMod = true;
                            		break;
                            	case "tabDespachos":
                            		$scope.tabDespachosMod = true;
                            		break;
                            	case "tabConfirmacion":
                            		$scope.tabConfirmacionMod = true;
                            		break;
                    		}
                		});
                        
                        $scope.tabInformacionVW_ASIG_AUTOMATICA_mod = true;
                    	$scope.tabInformacionVL_RFC_mod = true;
                    	$scope.tabInformacionVL_CURP_mod = true;
                    	$scope.tabArbol_LB_N1_mod = "";
                    	$scope.tabArbol_LB_N2_mod = "";
                        $scope.tabIntervenciones_NV_INTERVENCIONES_mod = null;
                    	$scope.tabArbol_NV_GEOGRAFIA_mod = null;
                    	angular.forEach($scope.configuracionPuestoRegistradoMod.configuraciones,function(conf,index){
                    		if(conf.llave == "tabInformacionVW_ASIG_AUTOMATICA"){
                    			if(conf.valor == "false"){
                    				$scope.tabInformacionVW_ASIG_AUTOMATICA_mod = false;
                    			}
                    		}else if(conf.llave == "tabArbol_LB_N1"){
                    			$scope.tabArbol_LB_N1_mod = conf.valor;
                    		}else if(conf.llave == "tabArbol_LB_N2"){
                    			$scope.tabArbol_LB_N2_mod = conf.valor;
                    		}else if(conf.llave == "tabInformacionVL_RFC"){
                    			if(conf.valor+"" == "true"){
                    				$scope.tabInformacionVL_RFC_mod = true;
                    			}else if(conf.valor+"" == "false"){
                    				$scope.tabInformacionVL_RFC_mod = false;
                    			}
                    		}else if(conf.llave == "tabInformacionVL_CURP"){
                    			if(conf.valor+"" == "true"){
                    				$scope.tabInformacionVL_CURP_mod = true;
                    			}else if(conf.valor+"" == "false"){
                    				$scope.tabInformacionVL_CURP_mod = false;
                    			}
                    		}else if(conf.llave == "tabArbol_NV_GEOGRAFIA"){
                    			$scope.tabArbol_NV_GEOGRAFIA_mod = conf.valor;
                    		}else if(conf.llave == "tabIntervenciones_NV_INTERVENCIONES"){
                    			$scope.tabIntervenciones_NV_INTERVENCIONES_mod = conf.valor;
                    		}
                    	});
                        
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
                        
                        // ********** PREPARA LOS DATOS DE LA PESTAÑA DE INTERVENCIONES
                        $scope.arbolIntervencionesModificar = [];
                        $scope.arbolIntervencionesModificar = angular.copy($scope.listaIntervencionesRespaldo);
                        $scope.listaIntervencionesRegistradasMod = [];
                        $scope.detalleUsuario.intervencionesId = [];
                        let intervencionesListaMod = [];
                        
                        angular.forEach($scope.arbolIntervencionesModificar,function(intervencion,index){
                            if (intervencion.nivel <= $scope.tabIntervenciones_NV_INTERVENCIONES_mod) {
                            	intervencionesListaMod.push(intervencion);
                            }
                        });
                        
                        intervencionesListaMod.push({id: 0, nombre: "INTERVENCIONES", nivel: 0, idPadre: "#", state:{opened: true}});
                        intervencionesListaMod.map((e)=>{
                            e.parent = e.idPadre == null ? 0 : e.idPadre;
                            e.text= e.nombre;
                            e.icon= "fa fa-globe";
                            return e
                        }) 
                        
                        angular.forEach(intervencionesListaMod,(element,index) => {
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
                            'search': {
    							"case_sensitive": false,
    							"show_only_matches": true
    						},
                            'core': {
                                'data': intervencionesListaMod,
                                'themes': {
                                    'name': 'proton',
                                    'responsive': true,
                                    "icons":false        
                                }
                            }
                        });

                        $scope.intervencionSelectMod = [];
                        $scope.listaIntervencionesRegistradasMod.forEach(intervencion =>{
                    		if(intervencion.nivel == $scope.tabIntervenciones_NV_INTERVENCIONES_mod){
                    			
                    			intervencion.intervencionesHijas = $scope.catalogoIntervenciones.filter(e => {return e.idPadre == intervencion.id});
                    			if(intervencion.intervencionesHijas.length < 1){
                    				intervencion.intervencionesHijas = [{nivel: intervencion.nivel, nombre: intervencion.nombre, idPadre: intervencion.idPadre}];
                    			}
                    			$scope.intervencionSelectMod.push(intervencion);
                    			
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

                        // ********** PREPARA LOS DATOS DE LA PESTAÑA DE ÁRBOL (GEOGRAFÍAS)
                        var plugins = [];
                    	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
                    		plugins = ['search'];
                    	}else{
                    		plugins = ['search', 'checkbox', 'wholerow'];
                    	}
                        
                        $scope.arbolCiudadesModificar = [];
                        $scope.listaGeografiasRegistradasMod = [];
                        $scope.detalleUsuario.geografiasId = [];
                        
                        $scope.arbolCiudadesModificar.push({id: 0, text: "GEOGRAFÍA", nivel: 0, parent: "#", state:{opened: true}});
                        angular.forEach($scope.listaGeografiasRespaldo,(element,index) => {
                            if(element.nivel <= $scope.tabArbol_NV_GEOGRAFIA_mod){
                                $scope.arbolCiudadesModificar.push({
                                    id: element.id,
                                    text: element.nombre,
                                    parent: element.padre == null ? 0 : element.padre,
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
                        	'search': {
    							"case_sensitive": false,
    							"show_only_matches": true
    						},
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
                            	$scope.listaIdsGeografiaCiudadNatalMod = [];
                            	$scope.listaTecnicosMod = [];
                            	$scope.detalleUsuario.ciudadNatal = "";
                            	$scope.geoSelectMod = [];
                                var geografiaTreeMod = $('#arbolGeografiaMod').jstree("get_selected", true);
                                geografiaTreeMod.forEach(geo =>{
                                	if(geo.original.nivel == $scope.tabArbol_NV_GEOGRAFIA_mod){
                                		
                                		geo.geoHijas = $scope.catalogoGeografias.filter(e => {return e.padre == geo.id});
                            			if(geo.geoHijas.length < 1){
                            				geo.geoHijas = [{nivel: geo.original.nivel, nombre: geo.original.nombre, padre: geo.original.padre}];
                            			}
                            			$scope.geoSelectMod.push(geo);
                                		
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
                            			$scope.listaIdsGeografiaCiudadNatalMod.push(geo.id);
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
                                		$scope.consultarDespachosMod();
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
                        
                        // ********** PREPARA LOS DATOS DE LA PESTAÑA DE ACCESOS (PERMISOS)
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
                            'search': {
    							"case_sensitive": false,
    							"show_only_matches": true
    						},
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

                        // ********** CONFIRMAR USUARIO
                        $scope.detalleUsuario.ciudadNatal = $scope.detalleUsuario.idGeografia;
                        if($scope.detalleUsuario.urlFotoPerfil != null){
                        	$scope.fileFotoUsuarioMod = {};
                        	$scope.fileFotoUsuarioMod.nombre = $scope.detalleUsuario.numeroEmpleado;
        					$scope.fileFotoUsuarioMod.nuevaFoto = false; 
                        	$("#imgFotoUsuarioMod").attr("src", ""+$scope.detalleUsuario.urlFotoPerfil);
                        }else{
                        	$scope.fileFotoUsuarioMod = null;
                        	$("#imgFotoUsuarioMod").attr("src", "./resources/img/plantainterna/despacho/tecnicootasignada.png");
                        }
                        $("#modalEdicionUsuario").modal({ backdrop: 'static', keyboard: false });
                        $("#modalEdicionUsuario").modal('show');
                        
                    } else {
                        
                    }
                    swal.close();
                } else {
                	toastr.warning(response.data.result.mensaje)
                    swal.close();
                }
                
            }).catch(err => handleError(err));
    	}else{
    		swal({type: "warning", title:"Aviso", text:"¡No cuentas con el permiso de edición!"});
    	}
    }
    
    //INICIA EL CAMPO DE FECHA DE INGRESO
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

    //MÉTODO QUE ASIGNA LA/LAS INTERVENCIÓN(ES) SELECCIONADA(S) A LA LISTA PARA MOSTRAR Y MODIFICAR - PESTAÑA INTERVENCIONES MODIFICAR USUARIO
    $("#arbolIntervencionMod").click(function() {
    	$scope.listaIntervencionesSelecionadasMod = [];
    	$scope.detalleUsuario.intervencionesId = [];
    	$scope.intervencionSelectMod = [];
    	
        var intervencionesTree = $('#arbolIntervencionMod').jstree("get_selected", true);
        intervencionesTree.forEach(intervencion =>{
            var existePadreMod = false;
            if(intervencion.original.nivel == $scope.tabIntervenciones_NV_INTERVENCIONES_mod){
            	intervencion.idPadre = intervencion.perent;
            	intervencion.nombre = intervencion.text;
            	
            	intervencion.intervencionesHijas = $scope.catalogoIntervenciones.filter(e => {return e.idPadre == intervencion.id});
    			if(intervencion.intervencionesHijas.length < 1){
    				intervencion.intervencionesHijas = [{nivel: intervencion.nivel, nombre: intervencion.nombre, idPadre: intervencion.idPadre}];
    			}
    			$scope.intervencionSelectMod.push(intervencion);
            	
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

    //MÉTODO QUE ASIGNA EL/LOS PERMISO(S) SELECCIONADO(S) A LA LISTA PARA MOSTRAR Y MODIFICAR - PESTAÑA ACCESOS MODIFICAR USUARIO
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
    	$scope.verBtnModificar = true;
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
    
    //VERIFICA EL ESTADO DEL CHECK PARA COLOCAR 'SI' O 'NO', SEGÚN EL ESTADO - PESTAÑA INFORMACIÓN MODIFICACUÓN USUARIO
	$scope.cambiarCheckAsignacionAutomaticaMod = function() {
		if($("#form-asignacionAutomatica-mod").prop('checked')){
			$("#checkAsignacionAutomaticaMod").text("  SI");
		}else{
			$("#checkAsignacionAutomaticaMod").text("  NO");
		}
	}
	
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
	
	//SELECCIONA O DESELECCIONA TODOS LOS DESPACHOS - PESTAÑA DESPACHOS MODIFICACIÓN USUARIO
	$scope.seleccionarTodosDespachosMod = function() {
		var check;
		if($("#checkTotdosDespachoMod").prop('checked')){
			check = true;
			$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
			$("#contenedorDespachosMod").css("border", "white solid 0px");
		}else{
			check = false;
		}
		angular.forEach($scope.listaDespachosMod,function(despacho,index){
			despacho.checkedOpcion = check;
		});
	}
	
	//SELECCIONA O DESELECCIONA EL DESPACHO ELEGIDO - PESTAÑA DESPACHOS MODIFICACIÓN USUARIO
	$scope.seleccionarDespachoMod = function(desoachoSeleccionado) {
		if(desoachoSeleccionado.checkedOpcion){
			desoachoSeleccionado.checkedOpcion = false;
		}else{
			desoachoSeleccionado.checkedOpcion = true;
			$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
			$("#contenedorDespachosMod").css("border", "white solid 0px");
		}
		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaDespachosMod,function(despacho,index){
			if(despacho.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosDespachoMod").prop("checked",true);
		}else{
			$("#checkTotdosDespachoMod").prop("checked",false);
		}
	}
	
	//MÉTODO QUE VALIDA SI SE SELECCIONÓ POR LO MENOS 1 GEOGRAFÍA Y SI EXISTEN TÉCNICOS O DESPACHOS DE ACUERDO A LA/LAS GEOGRAFÍA(S) SELECCIONADA(S)
	$scope.revisionTecnicosDespachosMod = function() {
		$scope.verBtnModificar = false;
		if($scope.detalleUsuario.geografiasId !== undefined){
			if($scope.detalleUsuario.geografiasId.length > 0){
				if($scope.isTecnicoMod){
					if($scope.listaDespachosMod == ""){
						toastr.info('¡Actualmente no existen despachos!');
					}
				}else{
					if($scope.listaTecnicosMod == ""){
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
	
	//CUANDO SELECCCIONE UNA FECHA VÁLIDA EL INPUT REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#form-fechaIngreso-mod").change(function() {
    	$("#form-fechaIngreso-mod").css("border", "1px solid #bdbdbd");
    });
	
	//MÉTODO PARA CONSULTAR LOS TÉCNICOS A REASIGNAR AL USUARIO (QUE NO SEA TÉCNICO) QUE SE MODIFICARÁ - PESTAÑA TÉCNICOS MODIFICACIÓN USUARIO
	$scope.consultarTecnicosMod = function() {
		$scope.listaTecnicosMod = [];
		let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalMod, idTipoUsuario:[$scope.idPuestoTecnico.id]};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarUsuariosPorPuesto(params)
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
	
	//MÉTODO PARA CONSULTAR LOS DESPACHOS A REASIGNAR AL TÉCNICO QUE SE MODIFICARÁ - PESTAÑA DESPACHOS MODIFICACIÓN USUARIO
	$scope.consultarDespachosMod = function() {
		$scope.listaDespachosMod = [];
		if($scope.listaIdsGeografiaCiudadNatalMod.length > 0){
			let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalMod, idTipoUsuario:[$scope.idPuestoDespacho.id]};
	    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
			swal.showLoading();
	    	$q.all([
	    		usuarioPIService.consultarUsuariosPorPuesto(params)
	        ]).then(function(results) {
	        	if (results[0].data !== undefined) {
	            	if(results[0].data.respuesta){
	            		if(results[0].data.result.usuarios !== null){
		            		if(results[0].data.result.usuarios.length > 0){
		            			$scope.listaDespachosMod = results[0].data.result.usuarios;
		            			$("#checkTotdosDespachosMod").prop("checked",false);
		            	    	angular.forEach($scope.listaDespachosMod,function(despacho,index){
		            	    		despacho.checkedOpcion = false;
		            			});
		            	    	angular.forEach($scope.listaDespachosMod,function(despacho,index){
		            	    		angular.forEach($scope.detalleUsuario.idDespachos,function(despachoRegistrado,index){
		            	    			if(despacho.idUsuario == despachoRegistrado.idOperador){
		            	    				despacho.checkedOpcion = true;
		            	    			}
		            	    		});
		            			});
		            	    	$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
		            			$("#contenedorDespachosMod").css("border", "white solid 0px");
		            		}else{
		            			$scope.listaDespachosMod = [];
		            		}
	            		}else{
	            			$scope.listaDespachosMod = [];
	            		}
	            	}else{
	            		$scope.listaDespachosMod = [];
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	        	swal.close();
	        });
		}
	}
	
	//MÉTODO QUE REALIZA LA MODIFICACIÓN DE LA INFORMACIÓN DEL USUARIO SELECCIONADO
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
							permisos: $scope.isTecnicoMod == true ? [] : $scope.detalleUsuario.permisosId,
							idAsignacionAutomatica: $scope.detalleUsuario.idAsignacionAutomatica
					}
		        	
		        	if($scope.isTecnicoMod == true){
		        		paramsMod.idDespachos = $scope.detalleUsuario.despachos;
		        	}else{
		        		paramsMod.idOperarios = $scope.detalleUsuario.tecnicos;
		        	}
		        	
		        	if($scope.fileFotoUsuarioMod != null){
		        		if($scope.fileFotoUsuarioMod.nuevaFoto == true){
		        			paramsMod.fotoPerfil = {
			        				bucketId: $scope.fileFotoUsuarioMod.bucketId,
			        			    archivo: $scope.fileFotoUsuarioMod.archivo,
			        			    nombre: "usuarios/mex/"+$scope.detalleUsuario.numeroEmpleado+"/fotoPerfil"
			        			  }
		        		}
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
		if($scope.tabInformacionMod){
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
				if($scope.tabInformacionVL_CURP_mod){
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
				if($scope.tabInformacionVL_RFC_mod){
					if($scope.detalleUsuario.rfc.length == 12 || $scope.detalleUsuario.rfc.length == 13){
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
					if($scope.detalleUsuario.telefonoCelular.length == 10){
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
					toastr.info("¡Valida el formato del correo electrónico!");
				}else{
					$("#form-correo-mod").css("border", "1px solid #bdbdbd");
				}
			}
			
			if($scope.detalleUsuario.fechaIngreso === "" || $scope.detalleUsuario.fechaIngreso === undefined || $scope.detalleUsuario.fechaIngreso === null || $("#form-fechaIngreso-mod").val() === "" || $("#form-fechaIngreso-mod").val() === null){
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
		}
		
		//PESTAÑA INTERVENCIONES
		if($scope.tabIntervencionesMod){
			if($scope.listaIntervencionesSelecionadasMod == "" || $scope.listaIntervencionesSelecionadasMod == undefined || $scope.listaIntervencionesSelecionadasMod == null){
				validacionIntervenciones = false;
				mensaje = mensaje + "<br/> *Intervención(es)";
				$("#labelIntervencionesSeleccionadasMod").css("color", "#f55756");
				$("#contenedorIntervencionesRegistroMod").css("border", "#f55756 solid 1px");
			}else{
				$("#labelIntervencionesSeleccionadasMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorIntervencionesRegistroMod").css("border", "white solid 0px");
			}
		}
		
		//PESTAÑA ÁRBOL
		if($scope.tabArbolMod){
			if($scope.listaCiudadesSelecionadasMod == "" || $scope.listaCiudadesSelecionadasMod == undefined || $scope.listaCiudadesSelecionadasMod == null){
				validacionArbol = false;
				mensaje = mensaje + "<br/> *Geografía(s)";
				$("#labelGeografiasSeleccionadasMod").css("color", "#f55756");
				$("#contenedorGeografiasRegistroMod").css("border", "#f55756 solid 1px");
			}else{
				$("#labelGeografiasSeleccionadasMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorGeografiasRegistroMod").css("border", "white solid 0px");
			}
		}
		
		//CHECK SI EL PUESTO SELECCIONADO ES TÉCNICO NO VALIDA (TÉCNICOS Y PERMISOS) Y SI NO ES TÉCNICO SI VALIDA DICHA INFORMACIÓN
		if($scope.isTecnicoMod == false){
			//PESTAÑA ACCESOS (PERMISOS)
    		if($scope.tabAccesosMod){
    			if($scope.listaAccesosSelecionadosMod == "" || $scope.listaAccesosSelecionadosMod == undefined || $scope.listaAccesosSelecionadosMod == null){
        			validacionAccesos = false;
        			mensaje = mensaje + "<br/> *Permiso(s)";
        			$("#labelPermisosSeleccionadasMod").css("color", "#f55756");
        			$("#contenedorPermisosRegistroMod").css("border", "#f55756 solid 1px");
        		}else{
        			$("#labelPermisosSeleccionadasMod").css("color", "rgb(70, 88, 107)");
        			$("#contenedorPermisosRegistroMod").css("border", "white solid 0px");
        		}
    		}
    		
    		//PESTAÑA TÉCNICOS
    		//POR EL MOMENTO SE QUITA LA VALIDACIÓN DE TÉCNICOS (NO ES OBLIGATORIA LA SELECCIÓN)
//        	var checkTec = 0;
//    		angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
//    			if(tecnico.checkedOpcion == true){
//    				checkTec++;
//    			}
//    		});
//    		if(checkTec < 1){
//    			validacionTecnicos = false;
//    			mensaje = mensaje + "<br/> *Técnico(s)";
//    			$("#labelTecnicosSeleccionadosMod").css("color", "#f55756");
//    			$("#contenedorTecnicosMod").css("border", "#f55756 solid 1px");
//    		}else{
//    			$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
//    			$("#contenedorTecnicosMod").css("border", "white solid 0px");
//    		}
    		
		}else{
			//PESTAÑA DESPACHOS
        	if($scope.tabDespachosMod){
        		var checkDes = 0;
        		angular.forEach($scope.listaDespachosMod,function(despacho,index){
        			if(despacho.checkedOpcion == true){
        				checkDes++;
        			}
        		});
        		if(checkDes < 1){
        			validacionDespachos = false;
        			mensaje = mensaje + "<br/> *Despachos(s)";
        			$("#labelDespachosSeleccionadosMod").css("color", "#f55756");
        			$("#contenedorDespachosMod").css("border", "#f55756 solid 1px");
        		}else{
        			$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
        			$("#contenedorDespachosMod").css("border", "white solid 0px");
        		}
        	}
		}
    	
    	//PESTAÑA CONFIRMAR USUARIO
    	if($scope.tabConfirmacionMod){
    		if($scope.detalleUsuario.ciudadNatal == "" || $scope.detalleUsuario.ciudadNatal == undefined){
        		$(".ciudadNatalMod").css("color", "#f55756");
        		validacion = false;
    			mensaje = mensaje + "<br/> *Ciudad natal";
        	}else{
        		$(".ciudadNatalMod").css("color", "#7c7c7d");
        	}
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
			toastr.info(mensaje);
			$scope.ocultarBotonMod();
		}
		//REGRESA LA RESPUESTA BOLEANA
		return validacion;
	}
    
    //MÉTODO PARA BUSCAR INTERVENCIONES DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA INTERVENCIONES MODIFICACIÓN USUARIO
    $scope.busquedaIntervencionMod = function() {
    	$("#arbolIntervencionMod").jstree("search", $('#buscadorIntervencionMod').val());
	}
    
    //MÉTODO PARA BUSCAR GEOGRAFÍAS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA ÁRBOL MODIFICACIÓN USUARIO
    $scope.busquedaGeografiaMod = function() {
    	$("#arbolGeografiaMod").jstree("search", $('#buscadorGeografiaMod').val());
	}
    
    //MÉTODO PARA BUSCAR PERMISOS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA ACCESOS MODIFICACIÓN USUARIO
    $scope.busquedaPermisosMod = function() {
    	$("#arbolPermisoMod").jstree("search", $('#buscadorPermisosMod').val());
	}
    
    //FUNCIONALIDAD QUE SIRVE PARA OCULTAR EL BOTÓN DE 'MODIFICAR' MIENTRAS NO SE ESTÉ EN LA PESTAÑA DE 'CONFIRMAR USUARIO' O MIENTRAS NO ESTÉN VALIDADOS LOS CAMPOS
    $scope.ocultarBotonMod = function() {
    	$scope.verBtnModificar = false;
	}
    
    //MÉTODO PARA LIMPIAR TODOS LOS CAMPOS DE TODAS LAS PESTAÑAS DE LA MODIFICACIÓN DE USUARIO
    $scope.limpiarDatosModificacion = function() {
    	$("#buscadorIntervencionMod").val("");
    	$("#buscadorGeografiaMod").val("");
    	$("#buscadorPermisosMod").val("");
    	$scope.buscarTecnicoMod = "";
    	$scope.buscarTecnicoSeleccionadoMod = "";
    	$scope.buscarDespachoMod = "";
    	$scope.buscarDespachoSeleccionadoMod = "";
    	$scope.buscarCiudadMod = "";
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
	    $scope.listaIdsGeografiaCiudadNatalMod = [];
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
    
    //FUNCIONALIDAD QUE CIERRA EL MODAL DE EDICIÓN Y LIMPIA TODOS LOS CAMPOS DE TODAS LAS PESTAÑAS DE LA MODIFICACIÓN DE USUARIO
    $scope.cerrarModalEdicionUsuario = function() {
    	$scope.limpiarDatosModificacion();
	}
    
    $scope.cargarFotoUsuarioMod = function (e) {
		let labelFile = "";
		if (e.target.files[0]) {
			$(labelFile).text(e.target.files[0].name);
			
			var nombreArchivoMod = "";
	    	if($scope.detalleUsuario.numeroEmpleado === "" || $scope.detalleUsuario.numeroEmpleado === undefined){
	    		nombreArchivoMod = "Foto perfil";
	    	}else{
	    		nombreArchivoMod = $scope.detalleUsuario.numeroEmpleado;
	    	}
			
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				let imgMod = {
					"bucketId": "totalplay-ffm-core-dev.appspot.com",
					"archivo": base64[1],
					"nombre": nombreArchivoMod,
					"nuevaFoto": true 
				}
				
				$scope.fileFotoUsuarioMod = {};
				$scope.fileFotoUsuarioMod = imgMod;
				$("#imgFotoUsuarioMod").attr("src", "data:image/jpeg;base64," + $scope.fileFotoUsuarioMod.archivo);
				$("#fileFotoUsuarioMod").val("");
				$scope.$apply();

			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
	}
    
    $scope.eliminarFotoUsuarioMod = function (e) {
    	if($scope.detalleUsuario.urlFotoPerfil != null){
    		if($scope.fileFotoUsuarioMod.nuevaFoto){
    			$("#imgFotoUsuarioMod").attr("src", ""+$scope.detalleUsuario.urlFotoPerfil);
        		$scope.fileFotoUsuarioMod = {};
        		$scope.fileFotoUsuarioMod.nombre = $scope.detalleUsuario.numeroEmpleado;
    			$scope.fileFotoUsuarioMod.nuevaFoto = false; 
    		}else{
    			$scope.fileFotoUsuarioMod = null;
            	$("#imgFotoUsuarioMod").attr("src", "./resources/img/plantainterna/despacho/tecnicootasignada.png");
    		}
    	}else{
    		$scope.fileFotoUsuarioMod = null;
        	$("#imgFotoUsuarioMod").attr("src", "./resources/img/plantainterna/despacho/tecnicootasignada.png");
    	}
    };
    
    $scope.obtenerFotoTomadaMod = function() {
    	var fotoMod = document.getElementById('canvasMod');
    	var archivoMod = fotoMod.toDataURL().split(",");

    	var nombreArchivoMod = "";
    	if($scope.detalleUsuario.numeroEmpleado === "" || $scope.detalleUsuario.numeroEmpleado === undefined){
    		nombreArchivoMod = "Foto perfil";
    	}else{
    		nombreArchivoMod = $scope.detalleUsuario.numeroEmpleado;
    	}
    	
		let imgMod = {
				"bucketId": "totalplay-ffm-core-dev.appspot.com",
				"archivo": archivoMod[1],
				"nombre": nombreArchivoMod,
				"nuevaFoto": true
			}

		$scope.fileFotoUsuarioMod = imgMod;
		$("#modalTomarFotoUsuarioMod").modal('hide');
	}
    
    $scope.cerrarModalTomarFotoUsuarioMod = function() {
    	$("#modalTomarFotoUsuarioMod").modal('hide');
	}
    
    $("#pills-intervencion-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorIntervencionMod").focus();
    	}, 750);
    });
    
    $("#pills-arbol-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorGeografiaMod").focus();
    	}, 750);
    });
    
    $("#pills-accesos-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorPermisosMod").focus();
    	}, 750);
    });
    
    $("#pills-tecnico-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorTecnicoMod").focus();
    	}, 750);
    });
    
    $("#pills-despacho-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorDespachoMod").focus();
    	}, 750);
    });
	
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