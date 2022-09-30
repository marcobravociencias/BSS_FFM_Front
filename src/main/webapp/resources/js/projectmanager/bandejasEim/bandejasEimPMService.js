app.service("coordInstalacionesPIService", function ($http) {

    this.consultaBusqGral=function (params){
        return $http({ 
            method: "post", 
            url: "req/consultaBusquedaGeneral", 
            data: JSON.stringify(params), 
            headers: {
                'Content-Type' : 'application/json'
            }
        }); 
    }

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

    this.consultaOtBusqGral=function (params){
        return $http({ 
            method: "post", 
            url: "req/consultaDetalleOTBsqGeneral", 
            data: JSON.stringify(params), 
            headers: {
                'Content-Type' : 'application/json'
            }
        }); 
    }

    this.consultarCatalogoEstatusDespachoPI = function() {
        return $http({ 
            method: "post", 
            url: "req/consultarCatalogoEstatusDespachoPI",
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    }

    this.consulCatalogoGeografiaUsuarioDespacho = function() {
        return $http({ 
            method: "post", 
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    }

    this.consultarCatalogoTurnosDespachoPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTurnosDespachoPI",
			//data:JSON.stringify(params),
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

    this.consultarDetalleOtDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarDetalleDespachoOT",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultarHistoricoDespachoOT=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarHistoricoDespachoOT",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

    this.consultarComentariosDespachoOT=function(params){
		return $http({
			method: "post",
			url: "req/consultarComentariosDespachoOT",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
    
    this.consultarImplementadosEim=function(params){
		return $http({
			method: "post",
			url: "req/consultarImplementadosEim",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

    this.consultaInfoDetalleOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleDespachoOT",
            data: params,
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaMaterialOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaMaterialesOts",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
});