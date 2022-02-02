app.service("vistaConfirmacionService", function ($http) {

    this.consultarDetalleOT=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarDetalleDespachoOT",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

    this.consultarCatalogoEstatus=function(){
		return $http({
			method: "post",
			url: "req/consultarCatalogoEstatusDespachoPI",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultaDisponibilidad = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDisponibilidad",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

})