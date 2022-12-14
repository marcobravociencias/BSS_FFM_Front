app.service("consultaOTService", function($http){

	this.consultaOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaOT",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaImagenesOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaEvidencia",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaInfoDetalle = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleDespachoOT",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
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

    this.consultaComentarios = function (params) {
        return $http({
            method: "post",
            url: "req/getComentariosIntegrador",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaHistorico = function (params) {
        return $http({
            method: "post",
            url: "req/historico",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaTrayectoria = function (params) {
        return $http({
            method: "post",
            url: "req/consultaInfoTrayectoria",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaReporteConsultaOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaReporteConsultaOt",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaPostVentaOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaDetallePostVenta",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaPagosOt = function (params) {
        return $http({
            method: "post",
            url: "req/consultaPagos",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

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

    this.consultarDispositivosOrden=function(params){
		return $http({
			method: "post",
			url: "req/consultaDispositivos",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultarRecoleccionOt=function(params){
		return $http({
			method: "post",
			url: "req/consultaRecoleccionConsultaOt",
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
	
})