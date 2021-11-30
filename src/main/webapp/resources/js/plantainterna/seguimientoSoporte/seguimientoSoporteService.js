app.service("seguimientoSoporteService", function ($http) {

    this.consultaSeguimientoGeneral = function (params) {
        return $http({
            method: "post",
            url: "req/consultaSeguimientoSoporte",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaTicketGeneral = function (params) {
        return $http({
            method: "post",
            url: "req/consultaTicketSoporte",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaDetalleSoprote = function (params) {
        return $http({
            method: "post",
            url: "req/consultaDetalleSoporte",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaInfoUsuario = function () {
        return $http({
            method: "get",
            url: "req/consultaInfoUsuarioEstatus",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaCatalogosTicket = function () {
        return $http({
            method: "get",
            url: "req/consultaCatalogosTicketSoporte",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
});