app.service("controlVehicularService", function($http) {

    this.consultarMarcasControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarMarcas",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarColoresControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarColores",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarSegurosControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarSeguros",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarEstatusControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarEstatus",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarOperacionesControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarOperaciones",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarCuadrillaControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarTipoCuadrilla",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarEmpresasControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarEmpresas",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarCostosControlVehicular = function () {
        return $http({
            method: "get",
            url: "req/consultarCentroCostos",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.crearVehiculo = function (params) {
        return $http({
            method: "post",
            url: "req/crearVehiculo",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consulCatalogoGeografiaUsuarioVehiculo=function(){
		return $http({
			method: "post",
			url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultarConfiguracionVehiculo=function(params){
		if(params=== undefined)
			params={}
		return $http({
			method: "post",
			url: "req/consultarConfiguracionDespachoDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultaVehiculoPlaca = function (params) {
        return $http({
            method: "post",
            url: "req/consultarVehiculoPlaca",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarVehiculoUnico = function (params) {
        return $http({
            method: "post",
            url: "req/consultarVehiculoUnico",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarVehiculos = function (params) {
        return $http({
            method: "post",
            url: "req/consultarVehiculos",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.editarVehiculo = function (params) {
        return $http({
            method: "post",
            url: "req/editarVehiculo",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarEncierros = function (params) {
        return $http({
            method: "post",
            url: "req/consultarEncierros",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarHistorialVehicular = function (params) {
        return $http({
            method: "post",
            url: "req/consultarHistorialVehiculo",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.eliminarVehiculo = function (params) {
        return $http({
            method: "post",
            url: "req/eliminarVehiculo",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.generarReporteControlVehicular = function (params) {
        return $http({
            method: "post",
            url: "req/generarReporteControlVehicular",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };


});
