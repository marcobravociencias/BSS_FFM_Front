app.service("gestionUniversalService", function ($http) {

    this.consultaPuestos = function () {
        return $http({
            method: "get",
            url: "req/consultaPuestos",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarTecnico = function (params) {
        return $http({
            method: "post",
            url: "req/consultarBusquedaSkills",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarTecnicosGeografia = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarConfiguracion = function (params) {
        return $http({
            method: "post",
            url: "req/consultarConfiguracionDespachoDespacho",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarPagosLiberar = function (params) {
        return $http({
            method: "post",
            url: "req/consultarPagosTecnico",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.liberarPago = function (params) {
        return $http({
            method: "post",
            url: "req/liberarPagos",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.restaurarContrasena = function (params) {
        return $http({
            method: "post",
            url: "req/restaurarContrasena",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarUsuariosPorPuesto = function (params) {
        return $http({
            method: "post",
            url: "req/consultarUsuariosPorTipoUsuario",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.actualizarGeocerca = function (params) {
        return $http({
            method: "post",
            url: "req/gestionGeocercas",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
});