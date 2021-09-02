app.editarUsuarioController=function($scope,usuarioPIService){

    $scope.detalleUsuario = {};
    $scope.respuestaDetalleUsuario = {};

    consultarDetalleUsuario = function(idUsuario) {
        console.log(idUsuario | 0)
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        $scope.params.idUsuario  = idUsuario | 0;
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

                            angular.forEach($scope.detalleUsuario.intervenciones,(asignadas,index) => {
                                if(element.id === asignadas.idTipoOrden) {
                                    $scope.arbolIntervencionesModificar.push({
                                        id: element.id,
                                        text: element.nombre,
                                        parent: element.idPadre == undefined ? "#" : element.idPadre,
                                        icon: "fa fa-tag",
                                        state: {selected: true, opened: true}
                                    });

                                    $scope.listaIntervencionesSeleccionadasMod.push(element.nombre);
                                } else {
                                    $scope.arbolIntervencionesModificar.push({
                                        id: element.id,
                                        text: element.nombre,
                                        parent: element.idPadre == undefined ? "#" : element.idPadre,
                                        icon: "fa fa-tag"
                                    });
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

                    // ********** ACCESOS

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
}