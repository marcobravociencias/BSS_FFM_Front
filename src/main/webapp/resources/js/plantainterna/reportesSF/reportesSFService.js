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

    this.consultarReporteSitiosFibrados = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteSitiosFibrados",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteRedesSociales = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteRedesSociales",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteGenerados = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteGenerados",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteFactibilidadCerrados = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteFactibilidadCerrados",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteFactibilidadCancelados = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteFactibilidadCancelados",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReportePlanningAgendas = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReportePlanningAgendas",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReportePlanningAddon = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReportePlanningAddon",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteCompletosProactivo = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteCompletosProactivo",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteCompletosCambioDomicilio = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteCompletosCambioDomicilio",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteCompletosSoporteEmpresarial = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteCompletosSoporteEmpresarial",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteBackLogProactivo = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteBackLogProactivo",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteIngresoProactivo = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteIngresoProactivo",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteRecoleccionGeneradas = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteRecoleccionGeneradas",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteRecoleccionCerradas = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteRecoleccionCerradas",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteRecoleccionAgendadas = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteRecoleccionAgendadas",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteBackLogFactibilidades = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteBackLogFactibilidades",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteBackLogVoluntarias = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteBackLogVoluntarias",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteVentas = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteVentas",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReportePlanningNuevoAddon = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReportePlanningNuevoAddon",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReportePlanningCompletosOrdenes = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReportePlanningCompletosOrdenes",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReportePlanningCompletosAddon = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReportePlanningCompletosAddon",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarReporteVentasInstalacion = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteVentasInstalacion",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

})