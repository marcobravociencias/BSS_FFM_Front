app.service("disponibilidadV2Service", function ($http) {
    
    this.consultaDisponibilidadV2 = function (params) {
        return $http({
            method: "post",
            url: "req/consultaDisponibilidadV2",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
  
});