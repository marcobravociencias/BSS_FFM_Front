app.service("vistaConfirmacionService", function ($http) {

    this.obtenerToken=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "widthoutSesion/obtenerToken",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

    this.consultarDetalleOT=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "widthoutSesion/consultarDetalleDespachoOT",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

    this.consultarCatalogoEstatus=function(){
		return $http({
			method: "post",
			url: "widthoutSesion/consultarCatalogoEstatusDespachoPI",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultaDisponibilidad = function (params) {
        return $http({
            method: "post",
            url: "widthoutSesion/consultarDisponibilidad",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.confirmaDesconfirmaOtDespacho=function(params){
		return $http({
			method: "post",
			url: "widthoutSesion/confirmaDesconfirmaOtDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

})