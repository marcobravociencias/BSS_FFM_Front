app.service("ordenesUniversalesService", function ($http) {

    this.consultarCatalogoOrdenesUniversales = function () {
        return $http({
            method: "post",
            url: "req/consultarCatalogoTipoOrdenUsuarioDespacho",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consulCatalogoGeografiaUsuarioDespacho = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarCuentaAsignadaGenerica = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCuentaAsignadaGenerica",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.getcatsdispacherintegrador = function (params) {
        return $http({
            method: "post",
            url: "req/getcatsdispacherintegrador",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.getDisponibilidadServicioRest = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDisponibilidad",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    this.creacionOrdenTrabajoUniversal = function (params) {
        return $http({
            method: "post",
            url: "req/creacionOrdenTrabajoGeneric",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    this.consultarCatalogosOrdenesUniversales = function () {
        return $http({
            method: "post",
            url: "req/consultarCatalogoUniversales",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    this.consultarPerfilesPorUsuario = function () {
        return $http({
            method: "post",
            url: "req/consultarPerfilesPorUsuario",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    
    this.consultarCatalogoPaquete = function () {
        return $http({
            method: "post",
            url: "req/consultaPaqueteOrdenesUniversales",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarCatalogoCanalVentas = function () {
        return $http({
            method: "post",
            url: "req/consultaCanalVentas",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    
    this.consultarInfoCliente=function(params){
		return $http({
			method: "post",
			url: "req/consultarInfoCliente",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

});