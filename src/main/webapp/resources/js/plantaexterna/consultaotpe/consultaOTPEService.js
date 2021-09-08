app.service("consultaService", function ($http) {
    
    this.consultarReporteInspector=function(params){
        return $http({
            method: "post",
            url: "req/consultarOTInspector",
            data:JSON.stringify(params),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
    };
    this.consultarReporteMasivo=function(params){
        return $http({
            method: "post",
            url: "req/consultarOTMasivo",
            data:JSON.stringify(params),
            headers:{
                'Content-Type':'application/json'
            }
        });
        
    };
    this.consultarReporteDiario=function(params){
        return $http({
            method:"post",
            url:"req/consultarOTDiario",
            data:JSON.stringify(params),
            headers:{
                'Content-Type':'application/json'
            }
        });
    };
    this.consultarHistorico=function(params){
        return $http({
            method:"post",
            url:"req/consultarHistorico",
            data:JSON.stringify(params),
            headers:{
                'Content-Type':'application/json'
            }
        })
    };
    this.consultarMateriales=function(params){
        return $http({
            method:"post",
            url:"req/consultarMateriales",
            data:JSON.stringify(params),
            headers:{
                'Content-Type':'application/json'
            }
        })
    };
    
    this.consultarFallas=function(params){
        return $http({
            method:"post",
            url:"req/consultarFallas",
            data:JSON.stringify(params),
            headers:{
                'Content-Type':'application/json'
            }
        })
    };

    this.consultarComentarios=function(params){
        return $http({
            method:"post",
            url:"req/consultarComentarios",
            data:JSON.stringify(params),
            headers:{
                'Content-Type':'application/json'
            }
        })
    };

    this.consultarImagenes=function(params){
        return $http({
            method:"post",
            url:"req/consultarImagenes",
            data:JSON.stringify(params),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
});