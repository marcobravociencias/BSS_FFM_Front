app.service("agendamientoService", function ($http) {

    this.consultarInfoSitioInstalacion = function (params) {
        return $http({
            method: "post",
            url: "req/consultarInfoSitioInstalacion",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
    
    this.consultaFactibilidadAgendamiento = function (params) {
        return $http({
            method: "post",
            url: "req/consultarFactibilidadEmprResiBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaDisponibilidadAgendamiento = function (params) {
        return $http({
            method: "post",
            url: "req/consultaCrmDisponibilidad",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

});