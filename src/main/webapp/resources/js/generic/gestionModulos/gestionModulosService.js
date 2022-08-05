app.service("gestionModulosService", function ($http) {
    this.consultarPermisos=function(){
		return $http({
			method: "get",
			url: "req/consultarMarcas",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultarUnidadNegocio=function(){
		return $http({
			method: "get",
			url: "req/consultarMarcas",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultarPropietarios=function(){
		return $http({
			method: "get",
			url: "req/consultarMarcas",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.consultarPermisoUnico=function(params){
		return $http({
			method: "post",
			url: "req/consultarPermisoUnico",
            data: JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.editarPermiso=function(params){
		return $http({
			method: "post",
			url: "req/consultarPermisoUnico",
            data: JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.crearPermiso=function(params){
		return $http({
			method: "post",
			url: "req/consultarPermisoUnico",
            data: JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

    this.eliminarPermiso=function(params){
		return $http({
			method: "post",
			url: "req/consultarPermisoUnico",
            data: JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
});