app.service("genericService", function ($http) {

    this.consultarCatalogo = function (params) {
        return $http({
            method: "post",
            url: "req/consultarCatalogoDesphachoPI",
            data: params,
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

    this.consultarCatalogoIntervenciones = function () {
        return $http({
            method: "post",
            url: "req/consultarCatalogoTipoOrdenUsuarioDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" }
        });
    };

    this.consulCatalogoGeografia=function(){
		return $http({
			method: "post",
			url: "req/consulCatalogoGeografiaUsuarioDespacho",
            headers: { 'Content-Type': "application/json; charset=utf-8" }
		});
	};

})