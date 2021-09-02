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


})