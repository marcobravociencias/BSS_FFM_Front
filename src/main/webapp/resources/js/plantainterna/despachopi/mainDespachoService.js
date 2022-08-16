app.service("mainDespachoService", function ($http) {
    this.testingServiceEureka=function(params){
		return $http({
			method: "post",
			url: "req/testingNameService",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	
	this.consultarConfiguracionDespachoDespacho=function(params){
		if(params=== undefined)
			params={}
		return $http({
			method: "post",
			url: "req/consultarConfiguracionDespachoDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	this.consultarCatalogoTipoOrdenGeneralDespacho=function(){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTipoOrdenGeneralDespacho",
			//data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	this.consultarCatalogoTipoOrdenUsuarioDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTipoOrdenUsuarioDespacho",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};
	
	this.consulCatalogoGeografiaUsuarioDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consulCatalogoGeografiaUsuarioDespacho",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};
	this.consulCatalogoGeografiaGeneralDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consulCatalogoGeografiaGeneralDespacho",
			//data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	this.consultarCatalogosTurnosDespachoPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoTurnosDespachoPI",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};

	this.consultarCatalogoEstatusDespachoPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoEstatusDespachoPI",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};
	
    this.consultarOrdenesPendientesDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarOrdenesPendientes",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};
	this.consultarOrdenesaAsignadasDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarOtsAsignadas",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	};
	this.consultarConteoAlertasPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarConteoAlertasPI",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	}
	this.consultarCatalogoEstatusTecnico=function(params){
		return $http({
			method: "post",
			url: "req/consultarComplementosDespachoIdentificador",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	this.confirmaDesconfirmaOtDespacho=function(params){
		return $http({
			method: "post",
			url: "req/confirmaDesconfirmaOtDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	
	this.consultandoMaterialesPI=function(params){
		return $http({
			method: "post",
			url: "req/consultarCentroAlmacenByNumeroEmpleado",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	this.consultaMaterialesPorAlmacenUserCentro=function(params){
		return $http({
			method: "post",
			url: "req/consultaMaterialesTecnico",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	

	this.cambiarEstatusOrdenTrabajoPI=function(params){
		return $http({
			method: "post",
			url: "req/cambiarEstatusOrdenPI",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.consultarTecnicosDisponibiles=function(params){
		return $http({
			method: "post",
			url: "req/consultarTecnicosDisponiblesDespachoPI",
			data:JSON.stringify(params),
			headers: {'Content-Type': "application/json; charset=utf-8"},
            transformRequest: angular.identity
		});
	}
	this.consultarComentariosDespachoOT=function(params){
		return $http({
			method: "post",
			url: "req/consultarComentariosDespachoOT",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.consultarDetalleDespachoOT=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarDetalleDespachoOT",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.consultarHistoricoDespachoOT=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarHistoricoDespachoOT",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	
	this.consultarPaletaColoresService=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarComplementosDespacho",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}
	this.consultarCatalogoAcciones=function(params){
		return $http({
			method: "post",
			data:JSON.stringify(params),
			url: "req/consultarCatalogoAccionesDespachoPI",
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	}

	this.consultarDetalleOtDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarDetalleDespachoOT",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	this.consultarLocalizacionOtDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarlocalizacionOtPIDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	this.consultarCotizacionDespacho=function(params){
		return $http({
			method: "post",
			url: "req/consultarCotizacionDespacho",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarDetalleTecnicoOt=function(params){
		return $http({
			method: "post",
			url: "req/consultarDetalleTecnicoOt",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	
	this.cambiarEstatusTecnicoPI=function(params){
		return $http({
			method:"post",
			url:"req/modificarUsuario",
			data:JSON.stringify(params),
			headers:{
				'Content-Type':'application/json'
			}
		})
	};
	
	this.consultarReporteDiario=function(params){
		return $http({
			method:"post",
			url:"req/consultarReporteDiario",
			data:JSON.stringify(params),
			headers:{
				'Content-Type':'application/json'
			}
		})
	};

	this.consultarResumenPaquete = function (params) {
		return $http({
			method: "post",
			url: "req/obtenerResumenPaquete",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	};

	this.consultaReporteDiario = function (params) {
		return $http({
			method: "post",
			url: "req/consultaRepoDiarioEx",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	};

	this.consultaInformacionVehiculoTecnico = function (params) {
		return $http({
			method: "post",
			url: "req/consultaInformacionVehiculoTecnico",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	};

	this.consultarInformacionPagos = function (params) {
        return $http({
            method: "post",
            url: "req/consultaPagosTecnico",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
    this.consultaDetalleOtPe=function(params){
		return $http({
			method: "post",
			url: "req/consultaDetalleOtPe",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.actualizarDireccionOt=function(params){
		return $http({
			method: "post",
			url: "req/actualizaDireccionOt",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultarJerarquiaOrganigrama=function(params){
		return $http({
			method: "post",
			url: "req/consultarJerarquiaOrganigrama",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};

	this.consultaOrdenesPlantaExternaOt = function (params) {
		return $http({
			method: "post",
			url: "req/consultaOrdenesPlantaExternaOt",
			data: JSON.stringify(params),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	this.consultarDetalleEquiposServicios = function (params) {
        return $http({
            method: "post",
            url: "req/consultarDetalleEquiposBandejasSF",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };

	this.asignarTecnicoGeocerca = function (params) {
        return $http({
            method: "post",
            url: "req/asignarTecnicoGeocerca",
            data: JSON.stringify(params),
            headers: { 'Content-Type': "application/json; charset=utf-8" },
            transformRequest: angular.identity
        });
    };
	
});