app.service("evidenciaService", function($http){

    this.consultaImagenesOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaEvidencia",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

});