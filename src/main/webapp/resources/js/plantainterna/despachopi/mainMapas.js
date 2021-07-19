app.mapasControllerDespachoPI=function($scope,mainDespachoService){
    let markerUbiacionOperario;
    $scope.isAbiertoDetalleDireccion=false;
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
        }).catch(err => handleError(err))

    }      
    
    $scope.listadomarkerscotizacion=[];
    consultarDetalleCotizacion=function(idot){
        $scope.isAbiertoDetalleDireccion=false;
        $scope.$apply()
        console.log(idot)
        $scope.consultarCotizacionDespacho( idot );
    }
    $scope.consultarCotizacionDespacho=function(idot){
        $scope.limpiarMarkersCotizacion()

        $scope.detalleCotizacion={}
        $scope.detalleCotizacion.detalleOt=angular.copy($scope.listadoOtsPendientes.find((e)=> e.idOrden==117) )
        console.log($scope.detalleCotizacion)
        swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
        swal.showLoading();   
        let params={
            "idOt":129
        }
        if(!mapaucotizaciondetalle){
                
            mapaucotizaciondetalle = new google.maps.Map(document.getElementById("mapa-cotizacion-despacho"),{
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

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(50.124462, -5.539994),
                map: mapaucotizaciondetalle,
                icon: {url:"https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                       size: new google.maps.Size(7,7),
                       anchor: new google.maps.Point(4,4)
                      }
            });
            var marker2 = new google.maps.Marker({
                position: new google.maps.LatLng(50.124461,-5.553726),
                map: mapaucotizaciondetalle,
                draggable: true,
                icon: {url:"https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png",
                       size: new google.maps.Size(7,7),
                       anchor: new google.maps.Point(4,4)
                      }
            });    
        
            /** 
            
            var p1 = mapaucotizaciondetalle.getProjection().fromLatLngToPoint(marker.getPosition());
            var p2 = mapaucotizaciondetalle.getProjection().fromLatLngToPoint(marker2.getPosition());
            var e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y);
            var m = new google.maps.Point(e.x/2, e.y/2);
            var o = new google.maps.Point(0,7);
            var c = new google.maps.Point(m.x + o.x, m.y + o.y);
          
          
            var marcadorCurved = new google.maps.Marker({
                position: new google.maps.LatLng(50.124462, -5.539994),
                icon: {
                    path: "M 0 0 q "+c.x+" "+c.y+" "+e.x+" "+e.y,
                    scale: 8,
                    strokeWeight: 2,
                    fillColor: '#009933',
                    fillOpacity: 0,
                    rotation: 180,
                    clickable: false,
                    anchor: new google.maps.Point(0,0)
                },
            });
            marcadorCurved.setMap(mapaucotizaciondetalle);
            google.maps.event.addListener(map,'zoom_changed',function() {
               
            });
            */

        }  

        mainDespachoService.consultarCotizacionDespacho(params).then(function success(response){
            console.log(response)
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        if(response.data.result.consultaCotizacion){                           
                            $("#modalDetalleCotizacion").modal('show')
                            $scope.detalleCotizacion=response.data.result.consultaCotizacion
                            //mapaucotizaciondetalle.setCenter(new google.maps.LatLng(37.4419, -122.1419));
                            if(response.data.result.consultaCotizacion.direcciones != undefined && response.data.result.consultaCotizacion.direcciones.length>0){
                                angular.forEach(response.data.result.consultaCotizacion.direcciones,function(elem,index){
                                
                                    if(elem.direccionDetalle != undefined){
                                        if( index == 0 ){
                                            //elem.direccionDetalle.latitud="19.327606110757337"
                                            //elem.direccionDetalle.longitud="-99.19763482133813"
                                            mapaucotizaciondetalle.setCenter(new google.maps.LatLng( parseFloat(elem.direccionDetalle.latitud), parseFloat(elem.direccionDetalle.longitud) ));
                                        }                                                                                    
                                        let latitud_ot={
                                                lat : parseFloat(elem.direccionDetalle.latitud),
                                                lng : parseFloat(elem.direccionDetalle.longitud)
                                        };
                                        let marker_ot = new google.maps.Marker({
                                            clickable : false,
                                            position : latitud_ot,
                                            title : "OT",
                                            animation : google.maps.Animation.DROP,
                                            map : mapaucotizaciondetalle,
                                            latitud_ot:parseFloat(elem.direccionDetalle.latitud),
                                            longitud_ot:parseFloat(elem.direccionDetalle.longitud),
                                            icon : {
                                                url: "./resources/img/plantainterna/despacho/repartidor-icon.svg",
                                                scaledSize: new google.maps.Size(37, 43)/**,
                                                origin: new google.maps.Point(0,0),
                                                anchor: new google.maps.Point(0, 0) **/
                                            },
                                            direccionContent:elem
                                        });
                                        marker_ot.addListener("click",(e,i)=>{
                                            $scope.isAbiertoDetalleDireccion=true
                                            $scope.elementoDireccion=marker_ot.direccionContent
                                            console.log(marker_ot.direccionContent)
                                            $scope.$apply()
                                        })
                                        
                                        $scope.listadomarkerscotizacion.push(marker_ot);
                                    }  
                                })
                            }else{
                                toastr.warning( 'No se encontraron direcciones' );                
                            }
                        }else{
                            toastr.warning( 'No se encontraron datos de la cotizacion' );                
                        }                    
                    }else{                      
                        toastr.warning( 'No se encontraron datos de la cotizacion' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de cotizacion' );                
            }
            swal.close()
        }).catch(err=>handleError(err))
    }
    $scope.limpiarMarkersCotizacion=function(){
        $scope.listadomarkerscotizacion.map(function(e){ e.setMap(null);return e ;})
        $scope.listadomarkerscotizacion=[];
    }

//    google.maps.event.addDomListener(window, 'load', init);
   // $scope.consultarCotizacionDespacho(129);
    function init(){
        var curveMarker;
        function updateCurveMarker() {
            var pos1 = markerP1.getPosition(), // latlng
                pos2 = markerP2.getPosition(),
                projection = map.getProjection(),
                p1 = projection.fromLatLngToPoint(pos1), // xy
                p2 = projection.fromLatLngToPoint(pos2);
    
            // Calculate the arc.
            // To simplify the math, these points 
            // are all relative to p1:
            var e = new Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
                m = new Point(e.x / 2, e.y / 2), // midpoint
                o = new Point(e.y, -e.x), // orthogonal
                c = new Point( // curve control point
                    m.x + curvature * o.x,
                    m.y + curvature * o.y);
    
            var pathDef = 'M 0,0 ' +
                'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;
    
            var zoom = map.getZoom(),
                scale = 1 / (Math.pow(2, -zoom));
    
            var symbol = {
                path: pathDef,
                scale: scale,
                strokeWeight: 2,
                fillColor: 'none'
            };
    
            if (!curveMarker) {
                curveMarker = new Marker({
                    position: pos1,
                    clickable: false,
                    icon: symbol,
                    zIndex: 0, // behind the other markers
                    map: map
                });
            } else {
                curveMarker.setOptions({
                    position: pos1,
                    icon: symbol,
                });
            }
        }

        google.maps.event.addListener(map, 'projection_changed', updateCurveMarker);
        google.maps.event.addListener(map, 'zoom_changed', updateCurveMarker);
    }


    
  //  google.maps.event.addDomListener(window, 'load', init);

 
}
