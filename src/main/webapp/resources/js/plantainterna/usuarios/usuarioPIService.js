app.service("usuarioPIService", function ($http) {

    this.consultaCompanias = function(){
		return $http({
			method: "get",
			url: "req/consultaCompanias",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

    this.consultaPuestos = function(){
    	return $http({
			method: "get",
			url: "req/consultaPuestos",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaPermisos = function(){
		return $http({
			method: "get",
			url: "req/consultaPermisos",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaUsuarioPorId = function(params){
		return $http({
			method: "post",
			url: "req/consultaUsuarioPorId",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaUsuariosPorGeoCompPuestos = function(params){
		return $http({
			method: "post",
			url: "req/consultaUsuariosPorGeoCompPuestos",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaGeografias=function(){
		return $http({
			method: "post",
			url: "req/consultaGeografias",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	
	this.consultarConfiguracionDespachoDespacho = function (params) {
        return $http({
            method: "post",
            url: "req/consultarConfiguracionDespachoDespacho",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
    this.consultaIntervenciones = function(){
		return $http({
			method: "post",
			url: "req/consultaIntervenciones",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.guardarUsuario = function (params) {
        return $http({
            method: "post",
            url: "req/guardarUsuario",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
    this.consultarUsuariosPorPuesto=function(params){
		return $http({
			method: "post",
			url: "req/consultarUsuariosPorTipoUsuario",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	
	this.modificarUsuario = function(params){
		return $http({
			method: "post",
			url: "req/modificarUsuario",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.eliminarUsuario = function (params) {
        return $http({
            method: "post",
            url: "req/eliminarUsuario",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
    this.validarUsuarioExistente = function (params) {
        return $http({
            method: "post",
            url: "req/validarUsuarioExistente",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

});