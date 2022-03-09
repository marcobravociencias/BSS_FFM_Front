app.service("inspectorIncidenciaService", function ($http) {
    this.consultarFallasInspectorPE = function () {
        return $http({
            method: "get",
            url: "req/consultarFallasInspectorPE",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.systemColor = function () {
        return $http({
            method: "get",
            url: "req/systemColor",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarIncidenciasInspectorPE = function (params) {
        return $http({
            method: "post",
            url: "req/consultarIncidenciasInspectorPE",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        })
    }

    this.consultarDetalleIncidenciaInspectorPE = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleIncidenciaInspectorPE",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        })
    }

    this.consultarCatalogoRechazoIncidenciaInspectorPE = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCatalogoRechazoIncidenciaInspectorPE",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        })
    }

    this.cambiarStatusIncidenciaInspectorPE = function (params) {
        return $http({
            method: "post",
            url: "req/cambiarStatusIncidenciaInspectorPE",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        })
    }
    
    this.consultarConfiguracionDespachoDespacho = function (params) {
        if (params === undefined)
        params = {}
        return $http({
            method: "post",
            url: "req/consultarConfiguracionDespachoDespacho",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
    this.consulCatalogoGeografia = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
    
    this.generarOTIncidenciaInspectorPE = function (params) {
        return $http({
            method: "post",
            url: "req/generarOTIncidenciaInspectorPE",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        })
    }

    this.consultaCatalogoEstatusInspectorPE = function () {
        return $http({
            method: "get",
            url: "req/consultaCatalogoEstatusInspectorPE",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
});