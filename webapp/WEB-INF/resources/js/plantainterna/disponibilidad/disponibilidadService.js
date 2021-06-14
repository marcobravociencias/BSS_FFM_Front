app.service("disponibilidadService", function ($http) {

    this.consultaDisponibilidad = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDisponibilidad",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.insertarDisponibilidad = function (params) {
        return $http({
            method: "post",
            url: "req/insertarDisponibilidad",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.actualizarDisponibilidad = function (params) {
        return $http({
            method: "post",
            url: "req/actualizarDisponibilidad",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarIntervenciones = function () {
        return $http({
            method: "get",
            url: "req/consultarIntervenciones",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };


});