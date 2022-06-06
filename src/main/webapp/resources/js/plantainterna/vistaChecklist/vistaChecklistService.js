app.service("vistaChecklistService", function ($http) {

    this.consultarGeografiaChecklist = function () {
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

    this.consultarEvidencias = function (params) {
        return $http({
            method: "post",
            data: JSON.stringify(params),
            url: "req/consultarEvidencias",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.consultarDetalleEvidencia = function (params) {
        return $http({
            method: "post",
            data: JSON.stringify(params),
            url: "req/consultarDetalleEvidencia",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.guardarEvidencia = function (params) {
        return $http({
            method: "post",
            data: params,
            url: "req/guardarEvidencia",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }



})