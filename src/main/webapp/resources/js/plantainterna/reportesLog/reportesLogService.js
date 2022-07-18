app.service("reportesLogService", function ($http) {
    this.consultaPuestos = function () {
        return $http({
            method: "get",
            url: "req/consultaPuestos",
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consulCatalogoGeografiaGeneral = function () {
        return $http({
            method: "post",
            url: "req/consulCatalogoGeografiaGeneralDespacho",
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

    this.consultarReporteLogGeneral = function (params) {
        return $http({
            method: "post",
            url: "req/consultarReporteLogGeneral",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.consultarAccionesRealizadasService = function (params) {
        return $http({
            method: "post",
            url: "req/consultarAccionesRealizadasService",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

   
})
