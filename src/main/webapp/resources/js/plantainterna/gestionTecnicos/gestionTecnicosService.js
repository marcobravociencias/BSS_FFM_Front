app.service("gestionTecnicosService", function ($http) {
	
	this.consultaTecnicosGestionTecnicos = function(params){
		return $http({
			method: "post",
			url: "req/consultaTecnicosGestionTecnicos",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaAuxiliaresGestionTecnicos = function(params){
		return $http({
			method: "post",
			url: "req/consultaAuxiliaresGestionTecnicos",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaTecnicosPorDespacho = function(params){
		return $http({
			method: "post",
			url: "req/consultaTecnicosPorDespacho",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaOrdenesTecnicoPorFecha = function(params){
		return $http({
			method: "post",
			url: "req/consultaOrdenesTecnicoPorFecha",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaOrdenesAuxiliarPorFecha = function(params){
		return $http({
			method: "post",
			url: "req/consultaOrdenesAuxiliarPorFecha",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaDisponibilidadTecnico = function(params){
		return $http({
			method: "post",
			url: "req/consultaDisponibilidadTecnico",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaDiasTrabajadosTecnicoPorFecha = function(params){
		return $http({
			method: "post",
			url: "req/consultaDiasTrabajadosTecnicoPorFecha",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaDiasTrabajadosAuxiliarPorFecha = function(params){
		return $http({
			method: "post",
			url: "req/consultaDiasTrabajadosAuxiliarPorFecha",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaJustificacionesTecnico = function(params){
		return $http({
			method: "post",
			url: "req/consultaJustificacionesTecnico",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaMotivosJustificaciones = function(){
		return $http({
			method: "post",
			url: "req/consultaMotivosJustificaciones",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.guardarJustificacionTecnico = function(params){
		return $http({
			method: "post",
			url: "req/guardarJustificacionTecnico",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.eliminarJustificacionTecnico = function(params){
		return $http({
			method: "post",
			url: "req/eliminarJustificacionTecnico",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.modificarJustificacionTecnico = function(params){
		return $http({
			method: "post",
			url: "req/modificarJustificacionTecnico",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultarComentariosJustificacion = function(params){
		return $http({
			method: "post",
			url: "req/consultarComentariosJustificacion",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.agregarComentarioJustificacion = function(params){
		return $http({
			method: "post",
			url: "req/agregarComentarioJustificacion",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

});