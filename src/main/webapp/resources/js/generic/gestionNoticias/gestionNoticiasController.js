var app = angular.module('gestionNoticiasApp', []);
app.controller('gestionNoticiasController', ['$scope', '$q', '$filter', 'gestionNoticiasService', function ($scope, $q, $filter, gestionNoticiasService) {
	



	$scope.listaGeografias=[]
	
	$scope.initConsultaMetodo = function() {
		let paramsConfiguracionDespacho ={
			moduloAccionesUsuario: 'moduloUsuarios'
		};
		$q.all([
			gestionNoticiasService.consultaGeografias(),
			gestionNoticiasService.consultarConfiguracionDespachoDespacho(paramsConfiguracionDespacho),
	
		]).then(function(results) {
			console.log(results);			
			var nivelUsuario = results[1].data.result.N_FILTRO_GEOGRAFIA;
	
			if(results[0].data.result.geografia.length > 0){
				let listGeografias = [];
				if(nivelUsuario !== undefined){
					results[0].data.result.geografia.forEach(elemento =>{
						if (elemento.nivel <= nivelUsuario) {
							listGeografias.push(elemento);
							$scope.listaGeografias.push(elemento);
						}
					});
				}else{
					listGeografias = results[4].data.result.geografia;
					$scope.listaGeografias = results[4].data.result.geografia;
				}
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
				$('#jstre-content-geofrafia').bind('loaded.jstree', function(e, data) {
					$(this).jstree("open_all");
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
				toastr.warning('¡No existen geografías actualmente!');
			}
	
		});
	}
	
	$scope.initConsultaMetodo()
	

    $scope.cosultarNoticia = function() {
        $q.all([
    		gestionNoticiasService.consultarNoticiasGeneric()
        ]).then(function(results) {
            console.log(results);
        });
    }
    $scope.cosultarNoticia();

    $scope.registrarNoticia = function() {

        $scope.params = {};
        $scope.params.tituloPrincipal = "Prueba Registro";
        $scope.params.tituloSecundario = "Titulo Secundario";
        $scope.params.archivoBanner = "";
        $scope.params.nombreBanner = "baner";
        $scope.params.archivoArchivo = "";
        $scope.params.nombreArchivo = "archivo";
        $scope.params.detalle = "detalle2";
        $scope.params.urlLinkExterno = "www.linkexterno2.com";
        $scope.params.fechaInicio = "2022-01-03";
        $scope.params.fechaExpiracion = "2022-01-23";
        $scope.params.permanente = 0;
        $scope.params.idGeografias = [1,2,3];
        gestionNoticiasService.registrarNoticia($scope.params).then((result) => {
            console.log(result);
            if (result.data !== undefined) {
                if (result.data.respuesta) {
                    toastr.success(result.data.result.description);
                } else {
                    console.log(result.data.resultDescripcion)
                    toastr.warning( result.data.resultDescripcion )
                }
            } else {
                console.log(result.data.resultDescripcion)
                toastr.warning( result.data.resultDescripcion )
            }
        }).catch((err) => handleError(err));
    }

    $scope.actualizarNoticia = function() {

        $scope.params = {};
        $scope.params.idNoticia = 90;
        $scope.params.tituloPrincipal = "Titulo Principal";
        $scope.params.tituloSecundario = "Titulo Secundario";
        $scope.params.detalle = "detalle";
        $scope.params.urlLinkExterno = "www.linkexterno.com";
        $scope.params.fechaInicio = "2022-01-03";
        $scope.params.fechaExpiracion = "2022-01-23";
        $scope.params.permanente = 0;
        $scope.params.idActivoNot = 1;
        $scope.params.idActivoCon = 1;
        $scope.params.idGeografias = [1,2,3];
        gestionNoticiasService.actualizarNoticia($scope.params).then((result) => {
            console.log(result);
            if (result.data !== undefined) {
                if (result.data.respuesta) {
                    toastr.success(result.data.result.description);
                } else {
                    console.log(result.data.resultDescripcion)
                    toastr.warning( result.data.resultDescripcion )
                }
            } else {
                console.log(result.data.resultDescripcion)
                toastr.warning( result.data.resultDescripcion )
            }
        }).catch((err) => handleError(err));

    }

}]);