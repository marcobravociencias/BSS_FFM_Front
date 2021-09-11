app.editarUsuarioController=function($scope,usuarioPIService){

    $scope.detalleUsuario = {};
    $scope.respuestaDetalleUsuario = {};

    consultarDetalleUsuario = function(idUsuario) {
        console.log(idUsuario | 0)
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        // $scope.params.idUsuario  = idUsuario | 0;
        $scope.params.idUsuario  = 2;
        //$scope.params.IdCompany = "2";
        usuarioPIService.consultaUsuarioPorId($scope.params).then(function success(response) {
            console.log(response.data)
            if (response.data.respuesta) {
                if (response.data.result) {
                    
                    // ********** INFORMACION
                    $scope.detalleUsuario = response.data.result.usuario;
                    console.log($scope.detalleUsuario);
                    
                    $("#compania_select_modificacion").val(""+$scope.detalleUsuario.idCompania);
                    $("#compania_select_modificacion").selectpicker('refresh');


                    // ********** INTERVENCIONES
                    $scope.arbolIntervencionesModificar = [];
                    $scope.listaIntervencionesSeleccionadasMod = [];

                    angular.forEach($scope.respaldoIntervenciones,(element,index) => {
                        if (element.nivel == 1) {
                            $scope.arbolIntervencionesModificar.push({
                                id: element.id,
                                text: element.nombre,
                                parent: element.idPadre == undefined ? "#" : element.idPadre,
                                icon: "fa fa-tag"
                            });
                        }
                    });

                    angular.forEach($scope.arbolIntervencionesModificar,(element,index) => {
                        if (element.nivel == 1) {
                            angular.forEach($scope.detalleUsuario.intervenciones,(asignadas,index) => {
                                if(element.id === asignadas.idTipoOrden) {
                                    element.state = {selected: true, opened: true}
                                    $scope.listaIntervencionesSeleccionadasMod.push(element.nombre);
                                }
                            });
                        }
                    });
                    $("#arbolIntervencionModificacion").jstree('destroy');
                    $('#arbolIntervencionModificacion').bind('loaded.jstree', function(e, data) {
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

                    // ********** ARBOL
                    //$scope.listaGeografiasRespaldo
                    $scope.arbolCiudadesModificar = [];
                    $scope.listaCiudadesSelecionadasMod = [];
                    angular.forEach($scope.listaGeografiasRespaldo,(element,index) => {
                        if(element.nivel < 4){
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
                                $scope.listaCiudadesSelecionadasMod.push(element.text);
                            }
                        });
                    });
                    console.log($scope.arbolCiudadesModificar);
                    $("#arbolGeografiaModificacion").jstree('destroy');
                    $('#arbolGeografiaModificacion').bind('loaded.jstree', function(e, data) {
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


                    // ********** ACCESOS
                    //$scope.listaPermisosRespaldo
                    $scope.arbolAccesosModificar = angular.copy($scope.listaPermisosRespaldo);
                    $scope.listaAccesosSelecionadosMod = [];
                    angular.forEach($scope.arbolAccesosModificar,(element,index) => {
                        angular.forEach($scope.detalleUsuario.accesos,(acceso,index) => {
                            if(element.id === acceso.id) {
                                element.state = {selected: true, opened: true}
                                $scope.listaAccesosSelecionadosMod.push(element.text);
                            }
                        });
                    });
                    
                    $("#arbolPermisoModificar").jstree('destroy');
                    $('#arbolPermisoModificar').bind('loaded.jstree', function(e, data) {
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

    $("#arbolIntervencionModificacion").click(function() {
    	$scope.listaIntervencionesSeleccionadasMod = [];
    	var intervencionesTree = $('#arbolIntervencionModificacion').jstree("get_selected", true);
    	intervencionesTree.forEach(intervencion =>{
    		$scope.listaIntervencionesSeleccionadasMod.push(intervencion.text);
    	});
    	$scope.$apply();
    });

    $("#arbolGeografiaModificacion").click(function() {
        var geografia = $('#arbolGeografiaModificacion').jstree("get_selected", true);
        $scope.listaCiudadesSelecionadasMod = [];
        geografia.forEach(geo =>{
            var existePadre = false;
            if (geo.original.nivel === 3) {
                var idPadre = Number(geo.original.parent);
                $scope.listaCiudadesSelecionadasMod.forEach(ciudad =>{
                    if (ciudad.id === idPadre) {
                        existePadre = true;
                        ciudad.distritos.push({id: geo.id, distrito: geo.text});
                    }
                });
                if (!existePadre) {
                    $scope.listaGeografiasRespaldo.forEach(ciudad =>{
                        if (ciudad.id === idPadre) {
                            $scope.listaCiudadesSelecionadasMod.push({id: ciudad.id, nombre: ciudad.nombre, distritos: [{id: geo.id, distrito: geo.text}]});
                        }
                    });
                }
            }
        });
        $scope.$apply();
    });

    $("#arbolPermisoModificar").click(function() {
        var permisos = $('#arbolPermisoModificar').jstree("get_selected", true);
        $scope.listaAccesosSelecionadosMod = [];
        permisos.forEach(permiso =>{
            var existePadre = false;
            if (permiso.original.nivel === 2) {
                var idPadre = permiso.original.idPadre;
                $scope.listaAccesosSelecionadosMod.forEach(acceso =>{
                    if (acceso.id === idPadre) {
                        existePadre = true;
                        acceso.permisos.push({id: permiso.id, nombre: permiso.text});
                    }
                });
                if (!existePadre) {
                    $scope.listaPermisosRespaldo.forEach(permisoRes => {
                        if (permisoRes.id === idPadre) {
                            $scope.listaAccesosSelecionadosMod.push({id: permisoRes.id, nombre: permisoRes.nombre, permisos: [{id: permiso.id, nombre: permiso.text}]});
                        }
                    });
                }
            }
        });
        $scope.$apply();
    });
}