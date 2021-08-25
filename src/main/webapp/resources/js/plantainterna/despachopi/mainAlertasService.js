app.service("mainAlertasService", function ($http) {

    this.getDetalleAlertas=function(params){
		return $http({
			method: "post",
			url: "req/getDetalleAlertas",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultaAccionesAlerta=function(params){
		return $http({
			method: "post",
			url: "req/consultaAccionesAlerta",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.getCatalogoStatusEstadoMotivo=function(params){
		return $http({
			method: "post",
			url: "req/getCatalogoStatusEstadoMotivo",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarEvidenciaAlertaPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarEvidenciaAlertaPI",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarHistoricoAlertaPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarHistoricoDespachoOT",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	
	this.consultarComentariosAlertaPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarComentariosDespachoOT",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.cambiarEstatusIntegrador=function(params){
		return $http({
			method: "post",
			url: "req/cambiarEstatusIntegrador",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.setComentariosIntegrador=function(params){
		return $http({
			method: "post",
			url: "req/setComentariosIntegrador",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

});