app.service("busquedaSalesforceService", function ($http) {

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

	this.eliminarNoticia = function (params) {
        return $http({
          method: "post",
          url: "req/eliminarNoticiaSF",
          data: JSON.stringify(params),
          headers: {'Content-Type': "application/json; charset=utf-8"},
          transformRequest: angular.identity
        });
    };

	this.eliminarSubNoticia = function (params) {
        return $http({
          method: "post",
          url: "req/eliminarSubNoticiaSF",
          data: JSON.stringify(params),
          headers: {'Content-Type': "application/json; charset=utf-8"},
          transformRequest: angular.identity
        });
    };

});