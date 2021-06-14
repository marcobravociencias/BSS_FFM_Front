app.service("mainDespachoService", function ($http) {

    this.consultarCatalogosPlantaInterna=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoDesphachoPI",
			data:JSON.stringify(params),
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
	this.consultarCatalogoEstatusTecnico=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoEstatusTecnico",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	this.cambiarEstatusOperarioPI=function(params){
		return $http({
			method: "post",
			url: "req/cambiarEstatusOperarioPI",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	this.consultarOtsTrabajadasDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarOtsTrabajadasDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	
	this.consultarVehiculoOperario=function(params){
		return $http({
			method: "post",
			url: "req/consultarVehiculoOperarioPI",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	
	this.consultandoMaterialesPI=function(params){
		return $http({
			method: "post",
			url: "req/consultandoMaterialesPI",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.cambiarEstatusOrdenTrabajoPI=function(params){
		return $http({
			method: "post",
			url: "req/cambiarEstatusOrdenPI",
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

	this.consultarDetalleDespachoOT=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarDetalleDespachoOT",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

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
	
	this.consultarPaletaColoresService=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarPaletaColores",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	this.consultarCatalogoAcciones=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarCatalogoAccionesDespachoPI",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

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

	
	
});