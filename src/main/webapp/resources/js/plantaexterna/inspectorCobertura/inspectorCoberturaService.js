app.service("inspectorCoberturaService", function($http) {
    this.consultarFallasCoberturaPE = function () {
        return $http({
            method: "get",
            url: "req/consultarFallasCoberturaPE",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarIncidenciasCoberturaPE = function (params) {
        return $http({
            method: "post",
            url: "req/consultarIncidenciasCoberturasPE",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarFiltrosPE = function () {
        return $http({
            method: "get",
            url: "req/consultarFiltrosPE",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.ligarIncidenciasCoberturaPE = function (params) {
        return $http({
            method: "post",
            url: "req/ligarIncidenciasCoberturasPE",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
});