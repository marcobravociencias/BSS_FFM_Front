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

});