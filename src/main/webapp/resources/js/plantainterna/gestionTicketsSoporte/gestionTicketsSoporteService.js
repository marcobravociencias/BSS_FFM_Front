app.service("gestionTicketSoporteService", function ($http) {
    this.consultaFallasTicketSoporte = function () {
        return $http({
            method: "get",
            url: "req/consultaFallasTicketSoporte",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaHistoricoTicketSoporte = function (params) {
        return $http({
            method: "post",
            url: "req/consultaHistoricoTicketSoporte",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }

    this.creaTicketSoporte = function (params) {
        return $http({
            method: "post",
            url: "req/creaTicketSoporte",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }


    /**cambios jose */
    this.consultarComentariosNoticiasSF = function (params) {
        return $http({
            method: "post",
            url: "req/consultaComentariosNoticiasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.crearNoticia = function (params) {
        return $http({
            method: "post",
            url: "req/agregarComentariosNoticiaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.crearSubNoticia = function (params) {
        return $http({
            method: "post",
            url: "req/agregarSubComentarioNoticiaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarUsuariosPorPuesto = function (params) {
        return $http({
            method: "post",
            url: "req/consultarUsuariosPorTipoUsuario",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.asigarTicketIngeniero = function (params) {
        return $http({
            method: "post",
            url: "req/asignarIngenieroTicket",
            data: JSON.stringify(params),
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

    this.consultaPropietariosTicketSoporte = function () {
        return $http({
            method: "post",
            url: "req/consultaPropietariosTicketSoporte",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.guardarTicketDetalle = function (params) {
        return $http({
            method: "post",
            url: "req/guardarTicketDetalle",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    /**fin cambios jose */

    this.consultaTicketsSoporte = function (params) {
        return $http({
            method: "post",
            url: "req/consultaTicketsSoporte",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }

    this.consultaCuentaClienteTicketSoporte = function (params) {
        return $http({
            method: "post",
            url: "req/consultaCuentaClienteTicketSoporte",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }

    this.consultaCatalogoRegionTicketSoporte = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaGeneralDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }

    this.consultarCatalogoTipoOrdenTicketSoporte = function () {
        return $http({
            method: "post",
            url: "req/consultarCatalogoTipoOrdenGeneralDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }

    this.eliminarNoticia = function (params) {
        return $http({
            method: "post",
            url: "req/eliminarNoticiaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.eliminarSubNoticia = function (params) {
        return $http({
            method: "post",
            url: "req/eliminarSubNoticiaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
    this.consulCatalogoGeografiaUsuarioDespacho = function (params) {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            //data:JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    this.consultarDetalleTicketGestion = function (params) {
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

    this.reasigarTicketIngeniero = function (params) {
        return $http({
            method: "post",
            url: "req/reasignarIngenieroTicket",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

});