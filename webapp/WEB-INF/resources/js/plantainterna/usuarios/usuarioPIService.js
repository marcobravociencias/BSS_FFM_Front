app.service("usuarioPIService", function ($http) {

    this.consultarCompanias =function(){
		return $http({
			method: "post",
			url: "req/consultarCompanias",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

    this.consultarPuestos =function(){
		return $http({
			method: "post",
			url: "req/consultarPuestos",
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

	this.consultarPrivilegios =function(params){
		return $http({
			method: "post",
			url: "req/consultarPrivilegios",
			data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

});