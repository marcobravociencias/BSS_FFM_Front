app.service("consultaService", function($http) {

	this.consultarReporteInspector = function() {
		return $http({
			method: "post",
			url: "/consume3",
			data: JSON.stringify(""),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};
});