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

	//NUEVOS SERVICIOS
	this.consultarConfiguracionDespachoDespacho=function(params){
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
	this.consultarCatalogosTurnosDespachoPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTurnosDespachoPI",
			//data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarCatalogoTipoOrdenUsuarioDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTipoOrdenUsuarioDespacho",
			//data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	
	this.consulCatalogoGeografiaUsuarioDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consulCatalogoGeografiaUsuarioDespacho",
			//data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarOrdenesPendientesDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarOrdenesPendientes",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarConteoAlertasPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarConteoAlertasPI",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.consultarTecnicosDisponibiles=function(){
		return $http({
			method: "post",
			url: "req/consultarTecnicosDisponiblesDespachoPI",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.consultarOrdenesaAsignadasDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarOtsAsignadas",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
});