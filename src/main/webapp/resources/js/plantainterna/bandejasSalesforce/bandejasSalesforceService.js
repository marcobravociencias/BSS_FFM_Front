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

    this.consultaFactibilidadAgendamiento = function (params) {
        return $http({
            method: "post",
            url: "req/consultarFactibilidadEmpresarialBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

//    this.consultaDisponibilidadAgendamiento = function (params) {
//        return $http({
//            method: "post",
//            url: "req/consultarDisponibilidad",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    };

    this.consultarInfoSitioInstalacion = function (params) {
        return $http({
            method: "post",
            url: "req/consultarInfoSitioInstalacion",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.guardarContactoSalesforce = function (params) {
        return $http({
            method: "post",
            url: "req/guardarContactoSalesforce",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.agendarOrdenSalesforce = function (params) {
        return $http({
            method: "post",
            url: "req/agendarOrdenSalesforce",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
    this.actualizarFactibilidadSitio = function (params) {
        return $http({
            method: "post",
            url: "req/actualizarFactibilidadSitio",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarDetalleEquiposBandejasSF = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleEquiposBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
    
    this.consultarResumenPaqueteBandejasSF = function (params) {        
        return $http({
            method: "post",
            url: "req/obtenerResumenPaquete",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }
    
    this.consultarValidacionCSPBandejasSF = function (params) {     
        return $http({
            method: "post",
            url: "req/consultarValidacionCSPBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }
    
    this.agendarPendienteBandejaSF = function (params) {
        return $http({
            method: "post",
            url: "req/agendarPendienteBandejaSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
    
    this.consultaDisponibilidadAgendamiento = function (params) {
        return $http({
            method: "post",
            url: "req/consultaCrmDisponibilidad",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
    
});