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

	this.consultarDetalleOT=function(params){
		return $http({
			method: "post",
			url: "req/consultarDetalleDespachoOT",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.consultarDetalleTecnicoOt=function(params){
		return $http({
			method: "post",
			url: "req/consultarDetalleTecnicoOt",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarHistoricoOt=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarHistoricoDespachoOT",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.consultarComentariosOt=function(params){
		return $http({
			method: "post",
			url: "req/consultarComentariosDespachoOT",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.agregarComentariosOt = function (params) {
        return $http({
            method: "post",
            url: "req/agregarComentariosOt",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
})