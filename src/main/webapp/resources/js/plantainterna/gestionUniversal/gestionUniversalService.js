app.service("gestionUniversalService", function ($http) {

    this.consultarTecnico = function (params) {
        return $http({
            method: "post",
            url: "req/consultarBusquedaSkills",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarTecnicosGeografia = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarConfiguracion = function (params) {
        return $http({
            method: "post",
            url: "req/consultarConfiguracionDespachoDespacho",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarPagosLiberar = function (params) {
        return $http({
            method: "post",
            url: "req/consultarPagosTecnico",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.liberarPago = function (params) {
        if (params === undefined)
            params = {}
        return $http({
            method: "post",
            url: "req/liberarPagos",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };


});