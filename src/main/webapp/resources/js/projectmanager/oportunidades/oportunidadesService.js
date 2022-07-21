app.service("oportunidadesService", function ($http) {

    this.consultarOportunidades = function (params) {
        return $http({
            method: "post",
            url: "req/consultarOportunidades",
            data:JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarDetalleOportunidad = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleOportunidad",
            data:JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

});