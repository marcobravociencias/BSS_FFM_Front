app.service("reportesSFService", function ($http) {

    this.consultarReporteBacklog = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteBacklog",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

})