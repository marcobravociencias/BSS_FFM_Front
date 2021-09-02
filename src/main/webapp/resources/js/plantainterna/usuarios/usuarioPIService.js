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

    this.consultarRegionesEstructura =function(){
		return $http({
			method: "post",
			url: "req/consultarRegionesEstructura",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

    this.consultarClasificacionUsuario =function(){
		return $http({
			method: "post",
			url: "req/consultarClasificacionUsuario",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

    this.consultarIntervencionesPorPropietarios =function(params){
		return $http({
			method: "post",
			url: "req/consultarIntervencionesPorPropietarios",
			data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

    this.consultarArbolesCiudades =function(){
		return $http({
			method: "post",
			url: "req/consultarArbolesCiudades",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

    this.consultarOperariosPorCiudad =function(params){
		return $http({
			method: "post",
			url: "req/consultarOperariosPorCiudad",
			data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

	this.consultarCiudadesEstructura =function(params){
		return $http({
			method: "post",
			url: "req/consultarCiudadesEstructura",
			data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

	this.consultarUsuarios =function(params){
		return $http({
			method: "post",
			url: "req/consultarUsuarios",
			data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

});