app.service("bandejasSalesforceService", function ($http) {

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

});