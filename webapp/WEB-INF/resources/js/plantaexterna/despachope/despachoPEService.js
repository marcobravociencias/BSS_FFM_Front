app.service("despachoService", function ($http) {

    this.consultarFiltrosPE =function(params){
		return $http({
			method: "post",
			url: "req/consultarFiltrosPE",
            data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

	this.consultarOperariosPE =function(params){
		return $http({
			method: "post",
			url: "req/consultarOperariosPE",
            data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

	this.consultarOrdenesPendientesPE =function(params){
		return $http({
			method: "post",
			url: "req/consultarOrdenesPendientesPE",
            data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultarOrdenesAsignadasPE =function(params){
		return $http({
			method: "post",
			url: "req/consultarOrdenesAsignadasPE",
            data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

	this.consultarDetalleOTInspector =function(params){
		return $http({
			method: "post",
			url: "req/consultarDetalleOTInspector",
            data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

	this.consultarOtsTrabajadasInspector =function(params){
		return $http({
			method: "post",
			url: "req/consultarOtsTrabajadasInspector",
            data: JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

});