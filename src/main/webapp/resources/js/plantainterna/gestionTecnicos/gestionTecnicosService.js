app.service("gestionTecnicosService", function ($http) {

    this.consultaMotivosGestionTecnicos = function () {
        return $http({
            method: "get",
            url: "req/consultaMotivosGestionTecnicos",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaTecnicosGestionTecnicos = function (params) {
        return $http({
            method: "get",
            url: "req/consultaTecnicosGestionTecnicos",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaDisponibilidadTecGestionTecnicos = function (params) {
        return $http({
            method: "post",
            url: "req/consultaDisponibilidadTecGestionTecnicos",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }

    this.consultaDisponibilidadAuxGestionTecnicos = function (params) {
        return $http({
            method: "post",
            url: "req/consultaDisponibilidadAuxGestionTecnicos",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }

});