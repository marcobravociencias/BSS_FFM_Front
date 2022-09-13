app.service("disponibilidadService", function ($http) {

    this.consultaDisponibilidad = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDisponibilidad",
            data: params,
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.insertarDisponibilidad = function (params) {
        return $http({
            method: "post",
            url: "req/insertarDisponibilidad",
            data: params,
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.actualizarDisponibilidad = function (params) {
        return $http({
            method: "post",
            url: "req/actualizarDisponibilidad",
            data: params,
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarCatalogosTurnos = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCatalogoTurnosDespachoPI",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaDisponibilidadV2 = function (params) {
        return $http({
            method: "post",
            url: "req/consultaDisponibilidadV2",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

});