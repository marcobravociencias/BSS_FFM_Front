app.service("busquedaService", function($http){

    this.busquedaGeneralSF = function (params) {
		return $http({
			method: "post",
			url: "req/busquedaGeneralSF",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	};

    this.consultaDetalleObjectSF = function (params) {
		return $http({
			method: "post",
			url: "req/consultarDetalleObjectSF",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	};

	this.consultarComentariosNoticiasSF = function(params) {
        return $http({
            method: "post",
            url: "req/consultaComentariosNoticiasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

	this.crearNoticia = function(params) {
        return $http({
            method: "post",
            url: "req/agregarComentariosNoticiaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.crearSubNoticia = function(params) {
        return $http({
            method: "post",
            url: "req/agregarSubComentarioNoticiaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

	this.configurarEquipos = function(params) {
        return $http({
            method: "post",
            url: "req/configurarEquipos",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }


	this.configurarDispositivos = function(params) {
        return $http({
            method: "post",
            url: "req/configurarDispositivos",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

	this.configurarOnt = function(params) {
        return $http({
            method: "post",
            url: "req/configurarOnt",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarEquiposConfigurados = function(params) {
        return $http({
            method: "post",
            url: "req/consultarEquiposConfigurados",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.generalIps = function(params) {
        return $http({
            method: "post",
            url: "req/generalIps",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }


    this.validarActivacion = function(params) {
        return $http({
            method: "post",
            url: "req/consultarEstatusActivacion",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarEquipos = function(params) {
        return $http({
            method: "post",
            url: "req/consultarEquipos",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarCotizacionesEquipos = function(params) {
        return $http({
            method: "post",
            url: "req/consultarCotizacionesEquipos",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarDns = function(params) {
        return $http({
            method: "post",
            url: "req/consultarDns",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarEquipoEspecifico = function(params) {
        return $http({
            method: "post",
            url: "req/consultarEquipoEspecifico",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.activacionEquipos = function(params) {
        return $http({
            method: "post",
            url: "req/activarServicios",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.configurarServicios = function(params) {
        return $http({
            method: "post",
            url: "req/configurarServicios",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.configurarDns = function(params) {
        return $http({
            method: "post",
            url: "req/configurarDns",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarResumenAndServicios = function(params) {
        return $http({
            method: "post",
            url: "req/consultarResumenServicios",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarIps = function(params) {
        return $http({
            method: "post",
            url: "req/consultarIps",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarEstatusOs = function(params) {
        return $http({
            method: "post",
            url: "req/consultarIps",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.eliminarSubNoticia = function (params) {
        return $http({
          method: "post",
          url: "req/eliminarSubNoticiaSF",
          data: JSON.stringify(params),
          headers: {'Content-Type': "application/json; charset=utf-8"},
          transformRequest: angular.identity
        });
    };

    this.eliminarNoticia = function (params) {
        return $http({
          method: "post",
          url: "req/eliminarNoticiaSF",
          data: JSON.stringify(params),
          headers: {'Content-Type': "application/json; charset=utf-8"},
          transformRequest: angular.identity
        });
    };
    this.consultarMacNumeroSerie = function(params) {
        return $http({
            method: "post",
            url: "req/consultarMacNumeroSerie",
            data: JSON.stringify(params),
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
    }

    this.consultarAutofindActivacion = function (params) {
        return $http({
          method: "post",
          url: "req/consultarAutofindActivacion",
          data: JSON.stringify(params),
          headers: {'Content-Type': "application/json; charset=utf-8"},
          transformRequest: angular.identity
        });
    };

    this.consultarSerieExistenteActivacion = function (params) {
        return $http({
          method: "post",
          url: "req/consultarSerieExistenteActivacion",
          data: JSON.stringify(params),
          headers: {'Content-Type': "application/json; charset=utf-8"},
          transformRequest: angular.identity
        });
    };
})