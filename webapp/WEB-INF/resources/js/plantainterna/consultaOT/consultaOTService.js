app.service("consultaOTService", function($http){

	this.consultaOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaOT",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaImagenesOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaImagenesOt",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaInfoDetalle = function (params) {
        return $http({
            method: "post",
            url: "req/consultaInformacionDetalleOt",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaMaterialOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaMaterialesOts",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaComentarios = function (params) {
        return $http({
            method: "post",
            url: "req/getComentariosIntegrador",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaHistorico = function (params) {
        return $http({
            method: "post",
            url: "req/historico",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaActividad = function (params) {
        return $http({
            method: "post",
            url: "req/consultaActividadTecnico",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaTrayectoria = function (params) {
        return $http({
            method: "post",
            url: "req/consultaInfoTrayectoria",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaInfoRed = function (params) {
        return $http({
            method: "post",
            url: "req/consultaInformacionRed",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarcambioDeEquipo = function (params) {
        return $http({
            method: "post",
            url: "req/consultaCambioEquipo",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
})