app.service("bandejasSalesforceService", function ($http) {

    this.consultarConfiguracionDespachoDespacho = function (params) {
        if (params === undefined)
            params = {}
        return $http({
            method: "post",
            url: "req/consultarConfiguracionDespachoDespacho",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarCatalogoGeografia = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarPendientesActivarBandejasSF = function (params) {
        return $http({
            method: "post",
            url: "req/consultarPendientesActivarBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        })
    }

    this.consultarPendientesAgendarBandejasSF = function (params) {
        return $http({
            method: "post",
            url: "req/consultarPendientesAgendarBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        })
    }

    this.consultarRescataventasBandejasSF = function (params) {
        return $http({
            method: "post",
            url: "req/consultarRescataventasBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        })
    }

    this.consultaFactibilidadResidencialAgendamiento = function (params) {
        return $http({
            method: "post",
            url: "req/consultaFactibilidadResidencial",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaFactibilidadEmpresarialAgendamiento = function (params) {
        return $http({
            method: "post",
            url: "req/consultaFactibilidadEmpresarial",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultaDisponibilidadAgendamiento = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDisponibilidad",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

});