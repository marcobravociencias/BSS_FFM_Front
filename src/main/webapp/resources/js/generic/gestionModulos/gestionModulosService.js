app.service("gestionModulosService", function ($http) {
	
	this.consultarPropietarios = function(){
		return $http({
			method: "post",
			url: "req/consultarPropietarios",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultarUnidadesNegocio = function(){
		return $http({
			method: "post",
			url: "req/consultarUnidadesNegocio",
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultarModulosPermisos = function(params){
		return $http({
			method: "post",
			url: "req/consultarModulosPermisos",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.guardarModuloPermiso = function(params){
		return $http({
			method: "post",
			url: "req/guardarModuloPermiso",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.modificarModuloPermiso = function(params){
		return $http({
			method: "post",
			url: "req/modificarModuloPermiso",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.eliminarModuloPermiso = function(params){
		return $http({
			method: "post",
			url: "req/eliminarModuloPermiso",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
//    this.consultarPermisos=function(){
//		return $http({
//			method: "get",
//			url: "req/consultarMarcas",
//            headers : {
//                'Content-Type' : 'application/json'
//            }
//		});
//	};
//
//    this.consultarUnidadNegocio=function(){
//		return $http({
//			method: "get",
//			url: "req/consultarMarcas",
//            headers : {
//                'Content-Type' : 'application/json'
//            }
//		});
//	};
//
//    this.consultarPropietarios=function(){
//		return $http({
//			method: "get",
//			url: "req/consultarMarcas",
//            headers : {
//                'Content-Type' : 'application/json'
//            }
//		});
//	};
//
//    this.consultarPermisoUnico=function(params){
//		return $http({
//			method: "post",
//			url: "req/consultarPermisoUnico",
//            data: JSON.stringify(params),
//            headers : {
//                'Content-Type' : 'application/json'
//            }
//		});
//	};
//
//    this.editarPermiso=function(params){
//		return $http({
//			method: "post",
//			url: "req/consultarPermisoUnico",
//            data: JSON.stringify(params),
//            headers : {
//                'Content-Type' : 'application/json'
//            }
//		});
//	};
//
//    this.crearPermiso=function(params){
//		return $http({
//			method: "post",
//			url: "req/consultarPermisoUnico",
//            data: JSON.stringify(params),
//            headers : {
//                'Content-Type' : 'application/json'
//            }
//		});
//	};
//
//    this.eliminarPermiso=function(params){
//		return $http({
//			method: "post",
//			url: "req/consultarPermisoUnico",
//            data: JSON.stringify(params),
//            headers : {
//                'Content-Type' : 'application/json'
//            }
//		});
//	};
});