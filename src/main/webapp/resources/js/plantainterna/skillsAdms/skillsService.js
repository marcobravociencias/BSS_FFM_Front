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
				method: "PATCH",
				url:"req/guardarSkillsTecn",
				data:JSON.stringify(params),
				headers:{
					'Content-Type':'application/json'
				}
				
			});
		};
		
		this.guardarSkillsMultipleTecnicos = function(params){
			return $http({
				method: "put",
				url:"req/guardarSkillsMultipleTecnicos",
				data:JSON.stringify(params),
				headers:{
					'Content-Type':'application/json'
				}
				
			});
		};
		
		this.consulCatalogoGeografiaGeneralDespacho=function(params){
			return $http({
				method: "post",
				url: "req/consultaCatalogoGeografiaGeneralDespacho",
				//data:JSON.stringify(params),
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