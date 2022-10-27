app.service("oportunidadesService", function ($http) {

    this.consultarOportunidades = function (params) {
        return $http({
            method: "post",
            url: "req/consultarOportunidades",
            data:JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarDetalleOportunidad = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleOportunidad",
            data:JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };


    this.consultarSolicitudTorreControl = function (params) {
            return $http({
                method: "post",
                url: "req/consultarLiderTorreControlList",
                data:JSON.stringify(params),
                headers: { 'Content-Type': "application/json; charset=utf-8" },
                transformRequest: angular.identity
            });
        };

        this.consultarEnImplementacion = function (params) {
            return $http({
                method: "post",
                url: "req/consultarEnImplementacion",
                data:JSON.stringify(params),
                headers: { 'Content-Type': "application/json; charset=utf-8" },
                transformRequest: angular.identity
            });
        };

        this.actualizarEnImplementacion = function (params) {
            return $http({
                method: "post",
                url: "req/actualizarEnImplementacion",
                data:JSON.stringify(params),
                headers: { 'Content-Type': "application/json; charset=utf-8" },
                transformRequest: angular.identity
            });
        };

        this.updateTorreControlRechazado = function (params) {
            return $http({
                method: "post",
                url: "req/updateTorreControlRechazado",
                data:JSON.stringify(params),
                headers: { 'Content-Type': "application/json; charset=utf-8" },
                transformRequest: angular.identity
            });
        };
});