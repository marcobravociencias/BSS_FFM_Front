app.service("inspectorIncidenciaService", function($http) {
    this.consultarFallasInspectorPE = function () {
        return $http({
            method: "get",
            url: "req/consultarFallasInspectorPE",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    this.consultarStatusFallasInspectorPE = function () {
        return $http({
            method: "get",
            url: "req/consultarStatusFallasInspectorPE",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    this.systemColor = function () {
        return $http({
            method: "get",
            url: "req/systemColor",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    this.consultarIncidenciasInspectorPE = function (params) {
        return $http({
            method: "post",
            url: "req/consultarIncidenciasInspectorPE",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        })
    }
});