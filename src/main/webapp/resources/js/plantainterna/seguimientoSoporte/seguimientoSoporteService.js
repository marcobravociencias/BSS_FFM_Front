app.service("seguimientoSoporteService", function ($http) {

    this.consultarConfiguracionDespachoDespacho = function (params) {
        if (params === undefined)
            params = {}
        return $http({
            method: "post",
            url: "req/consultarConfiguracionDespachoDespacho",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

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

    this.consultaDetalleSoporte = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleTicketGestion",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };


    this.consultaEstatusTicketSoporte = function () {
        return $http({
            method: "get",
            url: "req/consultaEstatusTicketSoporte",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultaTecnologiaTicketSoporte = function () {
        return $http({
            method: "get",
            url: "req/consultaTecnologiaTicketSoporte",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultaEquiposSoporte = function () {
        return $http({
            method: "get",
            url: "req/consultaEquiposSoporte",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultaPropietariosTicketSoporte = function () {
        return $http({
            method: "post",
            url: "req/consultaPropietariosTicketSoporte",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };


    this.consultarAccionesDinamicaDetalle = function () {
        return $http({
            method: "post",
            url: "req/consultarAccionesDinamicaDetalle",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultaFallasTicketSoporte = function () {
        return $http({
            method: "get",
            url: "req/consultaFallasTicketSoporte",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaCatalogoGeografia = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaGeneralDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }
});