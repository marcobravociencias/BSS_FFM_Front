app.service("controlVehicularService", function($http) {

    this.consultarMarcasControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarMarcas",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarColoresControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarColores",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarSegurosControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarSeguros",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    
});
