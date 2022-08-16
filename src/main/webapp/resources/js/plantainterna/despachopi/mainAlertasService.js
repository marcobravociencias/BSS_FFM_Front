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
	
	this.consultarDetalleEvidencia = function (params) {
        return $http({
            method: "post",
            data: JSON.stringify(params),
            url: "req/consultarDetalleEvidencia",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

	this.guardarEvidencia = function (params) {
        return $http({
            method: "post",
            data: params,
            url: "req/guardarEvidencia",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


});