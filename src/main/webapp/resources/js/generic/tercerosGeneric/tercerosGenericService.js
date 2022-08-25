app.service("tercerosGenericService", function ($http) {
    
    this.consulCatalogoGeografiaUsuario=function(params){
		return $http({
			method: "post",
			url: "req/consulCatalogoGeografiaUsuarioDespacho",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};
	this.consultarCatalogosTurnos=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTurnosDespachoPI",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};

	this.consultarCatalogoEstatus=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoEstatusDespachoPI",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};

    this.consultarCatalogoTipoOrdenUsuario=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTipoOrdenUsuarioDespacho",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};

    this.consultarConfiguracion=function(params){
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

    	
    this.consultarOrdenes=function(params){
		return $http({
			method: "post",
			url: "req/consultarOrdenesPendientes",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};
	
})