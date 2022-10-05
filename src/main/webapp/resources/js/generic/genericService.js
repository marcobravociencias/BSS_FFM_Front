app.service("genericService", function ($http) {

    this.consultarCatalogoIntervenciones = function () {
        return $http({
            method: "post",
            url: "req/consultarCatalogoTipoOrdenUsuarioDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" }
        });
    };

    this.consulCatalogoGeografia = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" }
        });
    };

    this.consultarCatalogoEstatusDespachoPI = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCatalogoEstatusDespachoPI",
            headers: { 'Content-Type': 'application/json' }
        });
    };

    this.consultarHistoricoDespachoOT = function (params) {
        return $http({
            method: "post",
            data: JSON.stringify(params),
            url: "req/consultarHistoricoDespachoOT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultarComentariosDespachoOT = function (params) {
        return $http({
            method: "post",
            url: "req/consultarComentariosDespachoOT",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.agregarComentariosOt = function (params) {
        return $http({
            method: "post",
            url: "req/agregarComentariosOt",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultarConfiguracionDespachoDespacho = function (params) {
        return $http({
            method: "post",
            url: "req/consultarConfiguracionDespachoDespacho",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.cambioStatusOts = function (params) {
        return $http({
            method: "post",
            url: "req/cambioStatusOts",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    this.cambioStatusOtsGeneric = function (params) {
        return $http({
            method: "post",
            url: "req/cambioStatusOtsGeneric",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultarCatalogosTurnos=function(){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTurnosDespachoPI",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.agregarMensajeAccionSession = function (params) {
        return $http({
            method: "post",
            url: "req/agregarMensajeAccionSession",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultarNombreTablas = function () {
        return $http({
            method: "post",
            url: "req/getNombresTablas",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultaRequestQuery = function (params) {
        return $http({
            method: "post",
            url: "req/consultaQuery",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.enviarParamsReporte = function (params) {
        return $http({
            method: "post",
            url: "req/enviarParamsReporte",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultarSinEim = function (params) {
        return $http({
            method: "post",
            url: "req/consultarSinEim",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
        });
    };
    
    this.consultarListaEim = function () {
        return $http({
            method: "get",
            url: "req/consultarListaEim",
            headers: {'Content-Type': "application/json; charset=utf-8"},
        });
    };

    this.updateEim = function (list) {
        return $http({
            method: "post",
            url: "req/updateEim",
            data: JSON.stringify(list),
            headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
        });
    };
    this.consultarValidacion = function (params) {
        return $http({
            method: "post",
            url: "req/consultarValidacion",
            data: JSON.stringify(params),
            headers: {'Content-Type': "application/json; charset=utf-8"},
        });
    };
})