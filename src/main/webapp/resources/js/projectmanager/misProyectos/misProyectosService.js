app.service("misProyectosService", function ($http) {

    this.consultarProyectosPMS = function (params) {
        return $http({
            method: "post",
            url: "req/consultarProyectosPMS",
            data:JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarActividadesPMS = function (params) {
        return $http({
            method: "post",
            url: "req/consultarActividadesPMS",
            data:JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
});