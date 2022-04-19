app.service("gestionTecnicosService", function ($http) {
	
	this.consultaTecnicosGestionTecnicos = function(params){
		return $http({
			method: "post",
			url: "req/consultaTecnicosGestionTecnicos",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaAuxiliaresGestionTecnicos = function(params){
		return $http({
			method: "post",
			url: "req/consultaAuxiliaresGestionTecnicos",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaTecnicosPorDespacho = function(params){
		return $http({
			method: "post",
			url: "req/consultaTecnicosPorDespacho",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaOrdenesTecnicoPorFecha = function(params){
		return $http({
			method: "post",
			url: "req/consultaOrdenesTecnicoPorFecha",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaOrdenesAuxiliarPorFecha = function(params){
		return $http({
			method: "post",
			url: "req/consultaOrdenesAuxiliarPorFecha",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaDisponibilidadTecnico = function(params){
		return $http({
			method: "post",
			url: "req/consultaDisponibilidadTecnico",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaDiasTrabajadosTecnicoPorFecha = function(params){
		return $http({
			method: "post",
			url: "req/consultaDiasTrabajadosTecnicoPorFecha",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaDiasTrabajadosAuxiliarPorFecha = function(params){
		return $http({
			method: "post",
			url: "req/consultaDiasTrabajadosAuxiliarPorFecha",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};
	
	this.consultaJustificacionesTecnico = function(params){
		return $http({
			method: "post",
			url: "req/consultaJustificacionesTecnico",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
			transformRequest: angular.identity
		});
	};

//    this.consultaMotivosGestionTecnicos = function () {
//        return $http({
//            method: "get",
//            url: "req/consultaMotivosGestionTecnicos",
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    };
//
//    this.consultaTecnicosGestionTecnicos = function (params) {
//        return $http({
//            method: "post",
//            url: "req/consultaTecnicosGestionTecnicos",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    };
//
//    this.consultaDisponibilidadTecGestionTecnicos = function (params) {
//        return $http({
//            method: "post",
//            url: "req/consultaDisponibilidadTecGestionTecnicos",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.consultaDisponibilidadAuxGestionTecnicos = function (params) {
//        return $http({
//            method: "post",
//            url: "req/consultaDisponibilidadAuxGestionTecnicos",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.consultaDetalleJustificacionGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/consultaDetalleJustificacionGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.consultaDetalleMesGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/consultaDetalleMesGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.consultaComentariosJustificacionGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/consultaComentariosJustificacionGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.consultaArchivosJustificacionGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/consultaArchivosJustificacionGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.agregarJustificacionGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/agregarJustificacionGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.editarJustificacionGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/editarJustificacionGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.eliminarJustificacionGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/eliminarJustificacionGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.agregarArchivoJustificacionGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/agregarArchivoJustificacionGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
//
//    this.eliminarArchivoJustificacionGestionTec = function (params) {
//        return $http({
//            method: "post",
//            url: "req/eliminarArchivoJustificacionGestionTec",
//            data: JSON.stringify(params),
//            headers: { 'Content-Type': "application/json; charset=utf-8" },
//            transformRequest: angular.identity
//        });
//    }
});