app.service("organigramaService", function ($http) {

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

	this.restaurarContrasena = function (params) {
        return $http({
            method: "post",
            url: "req/restaurarContrasena",
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
})
