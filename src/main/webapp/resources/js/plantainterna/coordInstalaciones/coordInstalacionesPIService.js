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
    
    
});