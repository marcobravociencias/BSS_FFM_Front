app.mapasControllerDespachoPI=function($scope,mainDespachoService){
    let markerUbiacionOperario;
   
    $scope.consultarUbicacionOperario=function(objectParams){
        console.log(objectParams)
        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        let params =  {
            "Fecha_fin":"25/03/2021",
            "Fecha_inicio":"25/02/2021",
            "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno":"1,2,3",
            "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO":"64"
        }
        mainDespachoService.consultarOtsTrabajadasDespacho(params).then(function success(response) {
            console.log(response);
            let latitudRes = parseFloat('19.342848228399788')
            let longitudRes= parseFloat('-98.81238282971054')
            if(!mapubicacionoperario){
                
                mapubicacionoperario = new google.maps.Map(document.getElementById("vista_mapa_ubicacion"),{
                    //center: { lat: latitudRes,  lng: longitudRes},
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.BOTTOM_LEFT,
                    },
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.BOTTOM_LEFT,
                    },
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_CENTER,
                    },
                    mapTypeControl: false,
                    zoom: 15
                    }
                );
            }   
            var pt = new google.maps.LatLng(latitudRes, longitudRes);
            mapubicacionoperario.setCenter(pt);
           
            if(markerUbiacionOperario )
                markerUbiacionOperario.setMap(null)
            
            markerUbiacionOperario=undefined            
            markerUbiacionOperario=new google.maps.Marker({
                map: mapubicacionoperario,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position:{ lat: latitudRes, lng: longitudRes },
            });
            swal.close()
            $("#modalUbicacionOperario").modal('show')
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                        console.log("############## ots trabajadas")
                        //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        })

    }           
}
