app.service("skillsService", function ($http) {
	
	 this.consultarTecnico=function(params){
			return $http({
				method: "post",
				url: "req/consultarBusquedaSkills",
				data:JSON.stringify(params),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
			});
		};
		
		this.guardarInfoTecnico=function(params){
			return $http({
				method: "patch",
				url:"req/guardarSkillsTecn",
				data:JSON.stringify(params),
				headers:{
					'Content-Type':'application/json'
				}
				
			});
		};
		this.consultarCatalogosPlantaInterna=function(params){
			return $http({
				method: "post",
				url: "req/consultarCatalogoSkills",
				data:JSON.stringify(params),
	            headers : {
	                'Content-Type' : 'application/json'
	            }
			});
		};
		
		 this.consultarArbolesCiudades =function(){
				return $http({
					method: "post",
					url: "req/consultarArbolesCiudadesS",
					headers: {'Content-Type': "application/json; charset=utf-8"},
					transformRequest: angular.identity
				});
			};
});