app.service("reportesPIService", function ($http) {
	
	this.consultarCatalogosPlantaInterna=function(params){
		return $http({
			method: "post",
			url: "req/consultarCatalogoReportesPI",
			data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
		});
	};
	
	 this.consultarReporteTecnicoF=function(params){
			return $http({
				method: "post",
				url: "req/consultarReporteTecnico",
				data:JSON.stringify(params),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
			});
		};
		
		 this.consultarReporteTecnicoAuxF=function(params){
				return $http({
					method: "post",
					url: "req/consultarReporteTecnicoAux",
					data:JSON.stringify(params),
		            headers : {
		                'Content-Type' : 'application/json'
		            }
				});
			};
			
			this.consultarReporteOrdenesTermi=function(params){
				return $http({
					method: "post",
					url: "req/consultarOrdenesTerminadas",
					data:JSON.stringify(params),
		            headers : {
		                'Content-Type' : 'application/json'
		            }
				});
			};
			
			
			this.consultarReporteOrdenesInt=function(params){
				return $http({
					method: "post",
					url: "req/consultarOrdenesIntegrador",
					data:JSON.stringify(params),
		            headers : {
		                'Content-Type' : 'application/json'
		            }
				});
			};
		
		this.consultarReporteOTSPI=function(params){
			return $http({
				method: "post",
				url: "req/consultarReporteOTSPI",
				data:JSON.stringify(params),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
			});
		};
		
		 this.consultarReporteCoordinadorF=function(params){
				return $http({
					method: "post",
					url: "req/consultarReporteCoordinador",
					data:JSON.stringify(params),
		            headers : {
		                'Content-Type' : 'application/json'
		            }
				});
			};
	
});