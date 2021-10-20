app.coordInstalacionesSF = function ($scope, coordInstalacionesPIService, $q, genericService) {
    console.log("Inicia salesforce");

    $scope.vistaSf = 0;
    $scope.nombreBandejaSf = "";
    $scope.cambiarVistaSF = function(opcion) {
        if (opcion === 1) {
            $scope.nombreBandejaSf = "PENDIENTES DE AGENDAR";
        }
        if (opcion === 1) {
            $scope.nombreBandejaSf = "RESCATAVENTAS";
        }
        if (opcion === 1) {
            $scope.nombreBandejaSf = "PENDIENTES DE ACTIVAR";
        }
        $scope.vistaSf = opcion;
    }

};