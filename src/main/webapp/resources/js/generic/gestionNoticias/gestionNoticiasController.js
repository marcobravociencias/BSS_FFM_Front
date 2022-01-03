var app = angular.module('gestionNoticiasApp', []);
app.controller('gestionNoticiasController', ['$scope', '$q', '$filter', 'gestionNoticiasService', function ($scope, $q, $filter, gestionNoticiasService) {
	

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