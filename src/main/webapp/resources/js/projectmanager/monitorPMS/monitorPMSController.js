var app = angular.module('monitorPMSApp', []);

app.controller('monitorPMSController', ['$scope', '$q', 'monitorPMSServices', 'genericService', function ($scope, $q, monitorPMSServices, genericService) {
    document.getElementById('idBody').removeAttribute('style')
    app.bandejaDetalleController($scope, monitorPMSServices);
    app.bandejaPuntaEIMController($scope, monitorPMSServices);
    app.bandejaSinSegmentoController($scope, monitorPMSServices);
    app.bandejaNuevoFolioController($scope, monitorPMSServices)
}]);