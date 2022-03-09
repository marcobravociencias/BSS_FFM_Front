app.service("reportesPIService", function ($http) {
	
	this.consultaReporteOrdenes = function (params) { 
        return $http({ 
            method: "post", 
            url: "req/consultaReporteOrdenes", 
            data: params, 
            headers: {'Content-Type': "application/json; charset=utf-8"}, 
            transformRequest: angular.identity 
        }); 
    }; 
    
    this.consultaReporteTecnico = function (params) { 
        return $http({ 
            method: "post", 
            url: "req/consultaReporteTecnico", 
            data: params, 
            headers: {'Content-Type': "application/json; charset=utf-8"}, 
            transformRequest: angular.identity 
        }); 
    }; 
 
    this.consultaReporteDespacho = function (params) { 
        return $http({ 
            method: "post", 
            url: "req/consultaReporteDespacho", 
            data: params, 
            headers: {'Content-Type': "application/json; charset=utf-8"}, 
            transformRequest: angular.identity 
        }); 
    };
    
    this.consultaReporteDespacho = function (params) { 
        return $http({ 
            method: "post", 
            url: "req/consultaReporteAuxiliar", 
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

    this.consultaReporteDiario = function (params) {
		return $http({
			method: "post",
			url: "req/consultaRepoDiarioEx",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	};

    this.consultaReporteCierreDiario = function(params){
        return $http({
			method: "post",
			url: "req/consultaRepoCierreDiarioEx",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
    }

    this.consultaReporteAsignadas = function(params){
        return $http({
			method: "post",
			url: "req/consultaRepoAsignadasEx",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
    }
	
});