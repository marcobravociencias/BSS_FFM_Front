var app = angular.module('bandejasSalesforceApp', []);
app.controller('bandejasSalesforceController', ['$scope','$q','bandejasSalesforceService' ,'genericService', function($scope, $q, bandejasSalesforceService, genericService) {

    $scope.vistaSf = 0;
    $scope.nombreBandejaSf = "";
    $scope.cambiarVistaSF = function(opcion) {
        if (opcion === 1) {
            $scope.nombreBandejaSf = "PENDIENTES DE AGENDAR";
        }
        if (opcion === 2) {
            $scope.nombreBandejaSf = "RESCATAVENTAS";
        }
        if (opcion === 3) {
            $scope.nombreBandejaSf = "PENDIENTES DE ACTIVAR";
        }
        $scope.vistaSf = opcion;
    }
    $scope.cambiarVistaSF(1);
    
    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
		$('#moduloCoordInst').addClass('active');
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
    });
}]);