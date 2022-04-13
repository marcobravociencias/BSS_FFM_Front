app.service("traspasosService", function($http){

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

    this.consultaInfoDetalleTraspaso = function (params) {
        return $http({
            method: "post",
            url: "req/consultaInformacionDetalleTraspaso",
            data: params,
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaImagenesTraspaso = function (params) {
        return $http({
            method: "post",
            url: "req/consultaEvidenciaTraspaso",
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

    this.consultaReporteTraspasos = function (params) {
        return $http({
            method: "post",
            url: "req/consultaReporteTraspasos",
            data:JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaReporteTraspasosOts = function (params) {
        return $http({
            method: "post",
            url: "req/consultaReporteOts",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaFactibilidadResidencial = function (params) {
        return $http({
            method: "post",
            url: "req/consultaFactibilidadResidencial",
            data:JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultaFactibilidadEmpresarial = function (params) {
        return $http({
            method: "post",
            url: "req/consultaFactibilidadEmpresarial",
            data:JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.getDisponibilidadServicioRest = function (params) {
        return $http({
            method: "post",
            url: "req/consultaCrmDisponibilidad",
            data:JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.agendarTraspasosOt = function (params) {
        return $http({
            method: "post",
            url: "req/agendarTraspasoOt",
            data:JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };

    this.consultarMotivosTraspasos = function () {
        return $http({
            method: "post",
            url: "req/consultarMotivosTraspasos",
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
})