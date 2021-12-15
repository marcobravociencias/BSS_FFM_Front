app.service("gestionUniversalService", function ($http) {

    this.consultarTecnicos = function (params) {
        return $http({
            method: "post",
            url: "req/consultaTecnicos",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

});