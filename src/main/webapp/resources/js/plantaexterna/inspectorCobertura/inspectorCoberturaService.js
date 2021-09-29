app.service("inspectorCoberturaService", function($http) {
    this.consultarFallasCoberturaPE = function (params) {
        return $http({
            method: "post",
            url: "req/consultarFallasCoberturaPE",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarIncidenciasCoberturaPE = function (params) {
        return $http({
            method: "post",
            url: "req/consultarIncidenciasCoberturaPE",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarFiltrosPE = function (params) {
        return $http({
            method: "post",
            url: "req/consultarFiltrosCoberturaPE",
            data: JSON.stringify(params),
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