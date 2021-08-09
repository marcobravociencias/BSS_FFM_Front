app.service("ordenesUniversalesService", function ($http) {

    this.consultarCatalogoOrdenesUniversales = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCatalogoOrdenesUniversales",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarCuentaAsignadaGenerica = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCuentaAsignadaGenerica",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.getcatsdispacherintegrador = function (params) {
        return $http({
            method: "post",
            url: "req/getcatsdispacherintegrador",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.getcatsdispacherintegrador = function (params) {
        return $http({
            method: "post",
            url: "req/getcatsdispacherintegrador",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.getDisponibilidadServicioRest = function (params) {
        return $http({
            method: "post",
            url: "req/getDisponibilidadServicioRest",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

});