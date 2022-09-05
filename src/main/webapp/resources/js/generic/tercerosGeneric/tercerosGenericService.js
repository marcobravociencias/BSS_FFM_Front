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

	this.consultarResumenPaquete = function (params) {
		return $http({
			method: "post",
			url: "req/obtenerResumenPaquete",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	};

	this.consultarTecnicosDisponibiles=function(params){
		return $http({
			method: "post",
			url: "req/consultarTecnicosDisponiblesDespachoPI",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	}

	this.consultarDetalleEquiposServicios = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleEquiposBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

	this.actualizarDireccionOt=function(params){
		return $http({
			method: "post",
			url: "req/actualizaDireccionOt",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultaDetalleOtPe=function(params){
		return $http({
			method: "post",
			url: "req/consultaDetalleOtPe",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	this.consultarCotizacionDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarCotizacionDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultaOrdenesPlantaExternaOt = function (params) {
		return $http({
			method: "post",
			url: "req/consultaOrdenesPlantaExternaOt",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	this.consultarLocalizacionOtDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarlocalizacionOtPIDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarCatalogoEstatusDictamen=function(){
		return $http({
			method: "get",
			url: "req/consultarEstatusTerceros",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarCatalogoEstadoDictamen=function(){
		return $http({
			method: "get",
			url: "req/consultarEstadoTerceros",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarCatalogoTiempoDictamen=function(){
		return $http({
			method: "get",
			url: "req/consultarTiempoTerceros",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarCatalogoDistanciaDictamen=function(){
		return $http({
			method: "get",
			url: "req/consultarDistanciaTerceros",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.guardarDictamenTerceros=function(params){
		return $http({
			method: "post",
			url: "req/guardarDictamenTerceros",
			data:JSON.stringify(params),
			headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
		});
	};

})