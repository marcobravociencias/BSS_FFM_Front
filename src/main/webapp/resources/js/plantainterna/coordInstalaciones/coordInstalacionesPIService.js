app.service("coordInstalacionesPIService", function ($http) {

    this.consultaBusqGral=function (params){
        return $http({ 
            method: "post", 
            url: "req/consultaBusquedaGeneral", 
            data: JSON.stringify(params), 
            headers: {
                'Content-Type' : 'application/json'
            }
        }); 

    }
    this.consultaOtBusqGral=function (params){
        return $http({ 
            method: "post", 
            url: "req/consultaDetalleOTBsqGeneral", 
            data: JSON.stringify(params), 
            headers: {
                'Content-Type' : 'application/json'
            }
        }); 

    }
    
    
});