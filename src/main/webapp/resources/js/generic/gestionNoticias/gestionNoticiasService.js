app.service("gestionNoticiasService", function ($http) {

    this.consultarNoticiasGeneric = function () {
        return $http({
            method: "post",
            url: "req/consultarNoticiasGeneric",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.registrarNoticia = function (params) {
        return $http({
            method: "post",
            url: "req/registrarNoticia",
            data:JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.actualizarNoticia = function (params) {
        return $http({
            method: "post",
            url: "req/actualizarNoticia",
            data:JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
});