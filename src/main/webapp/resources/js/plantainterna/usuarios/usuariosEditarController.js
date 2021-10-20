app.editarUsuarioController=function($scope,usuarioPIService){

	var existePadreMod = false;
    $scope.detalleUsuario = {};
    $scope.respuestaDetalleUsuario = {};
    $scope.listaAccesosSelecionadosMod = [];
    $scope.confirmacionModificacion = {};
    $scope.listaCiudadesSelecionadasMod = [];
    $scope.verBtnModificar = false;

    consultarDetalleUsuario = function(idUsuario) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        // $scope.params.idUsuario  = idUsuario | 0;
        $scope.params.idUsuario  = idUsuario;
        //$scope.params.IdCompany = "2";
        usuarioPIService.consultaUsuarioPorId($scope.params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result) {
                    
                    // ********** INFORMACION
                    $scope.detalleUsuario = response.data.result.usuario;
                    $("#compania_select_modificacion").val(""+$scope.detalleUsuario.idCompania);
                    $("#puesto_select_modificacion").val(""+$scope.detalleUsuario.idTipoOperario);
                    $("#sexo_select_modificacion").val(""+$scope.detalleUsuario.genero);
                    


                    // ********** INTERVENCIONES
                    $scope.arbolIntervencionesModificar = [];
                    $scope.listaIntervencionesSeleccionadasMod = [];
                    let intervencionesListaMod = [];
                    
                    angular.forEach($scope.respaldoIntervenciones,(element,index) => {
                        if (element.nivel == 1) {
                        	intervencionesListaMod.push(element);
                        }
                    });
                    
                    angular.forEach(intervencionesListaMod,(element,index) => {
                        if (element.nivel == 1) {
                            angular.forEach($scope.detalleUsuario.intervenciones,(asignadas,index) => {
                                if(element.id === asignadas.idTipoOrden) {
                                    element.state = {selected: true, opened: true}
                                    $scope.listaIntervencionesSeleccionadasMod.push(element.nombre);
                                }
                            });
                        }
                    });
                    
                    intervencionesListaMod.map((e)=>{
                        e.parent = e.idPadre == undefined ? "#" : e.idPadre;
                        e.text= e.nombre;
                        e.icon= "fa fa-globe";
                        return e
                    });    
                    $("#arbolIntervencionMod").jstree('destroy');
                    $('#arbolIntervencionMod').bind('loaded.jstree', function(e, data) {
						//$(this).jstree("open_all");
                    }).jstree({
                    	'plugins': ['search', 'checkbox', 'wholerow'],
						'core': {
							'data': intervencionesListaMod,
                            'themes': {
                                'name': 'proton',
                                'responsive': true,
                                "icons":false        
                            }
                        }
					});

                    // ********** ARBOL
                    //$scope.listaGeografiasRespaldo
                    $scope.arbolCiudadesModificar = [];
                    $scope.listaGeografiasRegistradasMod = [];
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
                        'plugins': ['search', 'checkbox'],
                        'core': {
                            'data': $scope.arbolCiudadesModificar,
                            'themes': {
                                'name': 'proton',
                                'responsive': true,
                                "icons":false        
                            }
                        }
                    });

                    $scope.listaGeografiasRegistradasMod.forEach(geo =>{
                		if(geo.nivel == $scope.filtroGeografias){
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
                			//$scope.informacionRegistro.geografias.push(geo.id);
                			existePadreMod = false;
                		}
                	});
                    console.log($scope.listaCiudadesSelecionadasMod);
                    
                    // ********** ACCESOS
                    //$scope.listaPermisosRespaldo
                    $scope.arbolAccesosModificar = angular.copy($scope.listaPermisosRespaldo);
                    $scope.listaAccesosRegistradosMod = [];
                    
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
                			//$scope.informacionRegistro.permisos.push(permiso.id);
                			existePadreMod = false;
                		}
                	});

                    // ********** TECNICO

                    // ********** CONFIRMAR USUARIO

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

    $("#arbolIntervencionMod").click(function() {
    	$scope.listaIntervencionesSeleccionadasMod = [];
    	var intervencionesTree = $('#arbolIntervencionMod').jstree("get_selected", true);
    	intervencionesTree.forEach(intervencion =>{
    		$scope.listaIntervencionesSeleccionadasMod.push(intervencion.text);
    	});
    	$scope.$apply();
    });

    $("#arbolGeografiaMod").click(function() {
    	$scope.listaCiudadesSelecionadasMod = [];
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
    			
    			//$scope.informacionRegistro.geografias.push(geo.id);
    			existePadreMod = false;
    		}
        });
        $scope.$apply();
    });

    $("#arbolPermisoMod").click(function() {
    	$scope.listaAccesosSelecionadosMod = [];
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
    			//$scope.informacionRegistro.permisos.push(permiso.id);
    			existePadreMod = false;
    		}
        });
        $scope.$apply();
    });
    
  //MÉTODO PARA VALIDACIÓN DE INFORMACIÓN DE LOS DATOS MOSTRADOS EN LA VISTA - PESTAÑA CONFIRMACIÓN MOD USUARIO
    $scope.cargarInfoConfirmacionModificacion = function() {
    	$scope.confirmacionModificacion.nombre = 
          $scope.detalleUsuario.nombre !== undefined && $scope.detalleUsuario.nombre !== "" &&
          $scope.detalleUsuario.apellidoPaterno !== undefined && $scope.detalleUsuario.apellidoPaterno !== "" &&
          $scope.detalleUsuario.apellidoMaterno !== undefined && $scope.detalleUsuario.apellidoMaterno !== "" ?
          $scope.detalleUsuario.nombre + ' ' + $scope.detalleUsuario.apellidoPaterno + ' ' + $scope.detalleUsuario.apellidoMaterno : "Sin asignar";
    	$scope.confirmacionModificacion.usuario = $scope.detalleUsuario.usuarioFfm !== undefined && $scope.detalleUsuario.usuarioFfm !== "" ? $scope.detalleUsuario.usuarioFfm : "Sin asignar";
    	$scope.confirmacionModificacion.correo = $scope.detalleUsuario.correo !== undefined && $scope.detalleUsuario.correo !== "" ? $scope.detalleUsuario.correo : "Sin asignar";
    	$scope.confirmacionModificacion.contrasena = $scope.detalleUsuario.contrasena !== undefined && $scope.detalleUsuario.contrasena !== "" ? $scope.detalleUsuario.contrasena : "Sin asignar";
    	$scope.confirmacionModificacion.puesto = $("#puesto_select_modificacion option:selected").text();
    	$scope.confirmacionModificacion.fechaIngreso = $scope.detalleUsuario.fechaIngreso !== undefined && $scope.detalleUsuario.fechaIngreso !== "" ? $scope.detalleUsuario.fechaIngreso : "Sin asignar";
    	
    	$scope.verBtnModificar = true;
    }
}