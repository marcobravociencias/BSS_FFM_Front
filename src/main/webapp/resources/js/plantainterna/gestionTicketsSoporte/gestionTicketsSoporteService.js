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
    this.consultarComentariosNoticiasSF = function(params) {
        return $http({
            method: "post",
            url: "req/consultaComentariosNoticiasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.crearNoticia = function(params) {
        return $http({
            method: "post",
            url: "req/agregarComentariosNoticiaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.crearSubNoticia = function(params) {
        return $http({
            method: "post",
            url: "req/agregarSubComentarioNoticiaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }
    /**fin cambios jose */
});