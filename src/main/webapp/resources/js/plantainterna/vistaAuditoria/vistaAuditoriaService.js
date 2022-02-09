app.service("vistaAuditoriaService", function ($http) {
    this.consultaAuditoriasVistaAuditoria = function (params) {
        return $http({
            method: "post",
            url: "req/consultaAuditoriasVistaAuditoria",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }
    this.consultaDetalleAuditoriaTecnicoVistaAuditoria = function (params) {
        return $http({
            method: "post",
            url: "req/consultaDetalleAuditoriaTecnicoVistaAuditoria",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }
    this.consultaDetalleAuditoriaVistaAuditoria = function (params) {
        return $http({
            method: "post",
            url: "req/consultaDetalleAuditoriaVistaAuditoria",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    }
});