app.service("inspectorIncidenciaService", function($http) {
    this.consultarFallasInspectorIncidencia = function () {
        return $http({
            method: "get",
            url: "req/consultarFallas",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
});