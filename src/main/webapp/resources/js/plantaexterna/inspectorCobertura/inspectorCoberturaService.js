app.service("inspectorCoberturaService", function($http) {
    this.consultarFallasCoberturaPE = function () {
        return $http({
            method: "get",
            url: "req/consultarFallasCoberturaPE",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarCoberturasPE = function () {
        return $http({
            method: "get",
            url: "req/consultarCoberturasPE",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
});