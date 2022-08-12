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

    this.consultarReporteIngresoSoporte = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteIngresoSoporte",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteIngresoResidencial = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteIngresoResidencial",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteIngresoEmpresarial = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteIngresoEmpresarial",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarEmpresarialSinAgenda = function (params) {
        return $http({
            method: "post",
            url: "req/consultarEmpresarialSinAgenda",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteCompletosSoporte = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteCompletosSoporte",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteCompletosResidencial = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteCompletosResidencial",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteCompletosEmpresarial = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteCompletosEmpresarial",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

})