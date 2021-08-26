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
    
});
