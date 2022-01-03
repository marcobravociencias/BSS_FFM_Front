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

    }

    $scope.actualizarNoticia = function() {

    }

}]);