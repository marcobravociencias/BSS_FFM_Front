app.service("genericService", function ($http) {

    this.consultarCatalogo = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCatalogoDesphachoPI",
            data: params,
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarCatalogoIntervenciones = function () {
        return $http({
            method: "post",
            url: "req/consultarCatalogoTipoOrdenUsuarioDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" }
        });
    };

    this.consulCatalogoGeografia = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" }
        });
    };

    this.consultarCatalogoEstatusDespachoPI = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCatalogoEstatusDespachoPI",
            headers: { 'Content-Type': 'application/json' }
        });
    };

    this.consultarHistoricoDespachoOT = function (params) {
        return $http({
            method: "post",
            data: JSON.stringify(params),
            url: "req/consultarHistoricoDespachoOT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultarComentariosDespachoOT = function (params) {
        return $http({
            method: "post",
            url: "req/consultarComentariosDespachoOT",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.agregarComentariosOt = function (params) {
        return $http({
            method: "post",
            url: "req/agregarComentariosOt",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultarConfiguracionDespachoDespacho = function (params) {
        return $http({
            method: "post",
            url: "req/consultarConfiguracionDespachoDespacho",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.cambioStatusOts = function (params) {
        return $http({
            method: "post",
            url: "req/cambioStatusOts",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    this.cambioStatusOtsGeneric = function (params) {
        return $http({
            method: "post",
            url: "req/cambioStatusOtsGeneric",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

})