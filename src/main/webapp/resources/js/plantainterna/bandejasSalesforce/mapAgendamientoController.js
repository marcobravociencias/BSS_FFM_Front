app.agendamientoMap = function ($scope, bandejasSalesforceService) {

    let markerAg;
    let objectMapaUbiacion;
    var mapAgendamiento;
    $scope.isFactibilidad = false;
    $scope.latitudSelectedMap;
    $scope.longitudSelectedMap;
    $scope.isMapaLoaded = false;
    var searchBox;
    $scope.initMapaAgendamiento = function () {
        mapAgendamiento = new google.maps.Map(document.getElementById('mapa-ubicacion'), {
            center: {
                lat: parseFloat(0),
                lng: parseFloat(0)
            },
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_CENTER
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_CENTER
            }, streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            zoom: 10,
            disableDoubleClickZoom: true
        });

        objectMapaUbiacion = new GenericMapa(mapAgendamiento, 'mapa-ubicacion', 'bottom-right');
        objectMapaUbiacion.inicializar_data()

        geocoder = new google.maps.Geocoder;
        $scope.printInputSearchMap();
        
        //Se agrega marcador
        markerAg = new google.maps.Marker({
            map: mapAgendamiento,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(markerAg, 'dragend',$scope.functionDragEndMap );
        google.maps.event.addListener(mapAgendamiento, 'dblclick', $scope.functiondbclickMap );
        
    }

    $scope.clearMarkersAgendamiento = function () {
        if (markerAg !== undefined) {
            markerAg.setMap(null);
        }
    }
    $scope.functionDragEndMap=function(event){
        console.log("drgend")
            markerAg.setMap(mapAgendamiento)
            $scope.latitudSelectedMap = this.getPosition().lat();
            $scope.longitudSelectedMap = this.getPosition().lng();
            $scope.flagConsultandoFactibilidad = true;
            $scope.$apply()
            $("#search-input-place").val(this.getPosition().lat() + ', ' + this.getPosition().lng());
            $scope.consultarFactibilidadAgendamiento('empresarial', $scope.latitudSelectedMap, $scope.longitudSelectedMap);
    }
    $scope.functiondbclickMap=function(e){
        console.log("dbclock")
        markerAg.setMap(mapAgendamiento)
        let positionDoubleclick = e.latLng;
        markerAg.setPosition(positionDoubleclick);
        $scope.latitudSelectedMap = markerAg.getPosition().lat();
        $scope.longitudSelectedMap = markerAg.getPosition().lng();
        $scope.flagConsultandoFactibilidad = true;

        $scope.$apply()
        $("#search-input-place").val($scope.latitudSelectedMap + ', ' + $scope.longitudSelectedMap);
        $scope.consultarFactibilidadAgendamiento('empresarial', $scope.latitudSelectedMap, $scope.longitudSelectedMap);
    }
    
    $scope.setMarkerAgendamiento = function ( latitud , longitud ) {
        let latitudLongitud=new google.maps.LatLng( parseFloat( latitud  ), parseFloat( longitud ) )
        mapAgendamiento.setZoom(17);        
        mapAgendamiento.setCenter( latitudLongitud ); 
        markerAg.setPosition( latitudLongitud );
        markerAg.setMap( mapAgendamiento )
    }
   
    $scope.placesChangedMap=function(){
        console.log("places_changed ")

        let places = searchBox.getPlaces();
        // console.log(places);
        if (places.length == 0 || places.length > 1) {
            return;
        }
        let bounds = new google.maps.LatLngBounds();
        markerAg.setMap(mapAgendamiento)
        places.forEach(function (place) {
            console.log("places_changed forEach")

            $scope.latitudSelectedMap = place.geometry.location.lat();
            $scope.longitudSelectedMap = place.geometry.location.lng();
            $scope.flagConsultandoFactibilidad = true;
            $scope.$apply()


            markerAg.setPosition(new google.maps.LatLng( $scope.latitudSelectedMap, $scope.longitudSelectedMap) );
            mapAgendamiento.setZoom(17);
            mapAgendamiento.setCenter(new google.maps.LatLng( $scope.latitudSelectedMap, $scope.longitudSelectedMap));
            $scope.consultarFactibilidadAgendamiento('empresarial', $scope.latitudSelectedMap, $scope.longitudSelectedMap);

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        mapAgendamiento.fitBounds(bounds);
    }
    $scope.printInputSearchMap = function () {
        let input = document.getElementById('search-input-place');
        searchBox = new google.maps.places.SearchBox(input);
        mapAgendamiento.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      
        mapAgendamiento.addListener('bounds_changed', function () {
            console.log("bounds_changed ")
            searchBox.setBounds(mapAgendamiento.getBounds());
        });
        searchBox.addListener('places_changed', $scope.placesChangedMap );
    }
    $scope.abrirDisponibilidad=function(){
        $("#opcion-calendarioAgendamiento-tab").click()
    }

    $scope.actualizarFactibilidadBandejas = function () {
        $scope.actualizarFactibilidadEmpresarial()
        if($scope.tipoGeografiaFact =='empresarial ')
            $scope.actualizarFactibilidadEmpresarial()
        
        if($scope.tipoGeografiaFact =='residencial ')
            $scope.actualizarFactibilidadResidencial()

    }
    $scope.actualizarFactibilidadResidencial=function(){
        console.log("acutalizando factibilidad residencial")
    }
    $scope.actualizarFactibilidadEmpresarial=function(){
        swal({
            title: "\u00BFDesea actualizar la factibilidad?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            html:
                '<div style="text-align: left;" class="info_ot_detail  ">' +
                '	<div class="col-md-10 offset-md-2">' +
                '		<b class="title_span_detalle"> Regi&oacute;n:</b> &nbsp; &nbsp;' +
                '		<span class="ciudad-detalle-cuenta">' + $scope.infoFactibilidad.region + '</span>' +
                '	</div>' +
                '	<div class="col-md-10 offset-md-2">' +
                '		<b class="title_span_detalle"> Ciudad:</b> &nbsp; &nbsp;' +
                '		<span class="ciudad-detalle-cuenta">' + $scope.infoFactibilidad.ciudad + ' </span>' +
                '	</div>' +
                '	<div class="col-md-10 offset-md-2">' +
                '		<b class="title_span_detalle"> Distrito:</b> &nbsp; &nbsp;' +
                '		<span class="ciudad-detalle-cuenta">' + $scope.infoFactibilidad.distrito + ' </span>' +
                '	</div>' +
                '	<div class="col-md-10 offset-md-2">' +
                '		<b class="title_span_detalle"> Cl&uacute;ster:</b> &nbsp; &nbsp;' +
                '		<span class="ciudad-detalle-cuenta">' + $scope.infoFactibilidad.cluster + ' </span>' +
                '	</div>' +
                '</div>',
        }).then(function (isConfirm) {
            if (isConfirm) {                         
                $scope.isFactibilidad = true;
                //Se muestra en la vista del plan
                /**
                $scope.elementoCSP.niveluno = $scope.infoFactibilidad.region;
                $scope.elementoCSP.niveldos = $scope.infoFactibilidad.ciudad;
                $scope.elementoCSP.niveltres = $scope.infoFactibilidad.distrito;
                $scope.elementoCSP.nivelcuatro = $scope.infoFactibilidad.cluster;                
                $scope.elementoCSP.latitud = $scope.infoFactibilidad.latitud;
                $scope.elementoCSP.longitud = $scope.infoFactibilidad.longitud;                 
                **/
                $scope.$apply();                           
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();                  
                let params={    
                    "plazaC":               $scope.infoFactibilidad.ciudad,       
                    "zonaInstalacionC":     "",
                    "clusterInstalacionC":  $scope.infoFactibilidad.clusterTotalplay,
                    "distritoInstalacionC": $scope.infoFactibilidad.distrito,
                    "ciudadInstalacionC":   $scope.infoFactibilidad.ciudad,
                    "regionInstalacionC":   $scope.infoFactibilidad.region,
                    "regionInstalacionIdC": $scope.infoFactibilidad.regionIdc,
                    "geolocalizacionInstalacionLatitudeS":  $scope.infoFactibilidad.latitud ,            
                    "geolocalizacionInstalacionLongitudeS": $scope.infoFactibilidad.longitud,
                    "cuenta":               $scope.elementoCSP.infoSitio.numeroCuenta
                }                   
                bandejasSalesforceService.actualizarFactibilidadSitio(params).then(function success(response) {
                    console.log(response);
                    if (response.data !== undefined && response.data.result != undefined) {
                        mostrarMensajeExitoAlert( response.data.result.mensaje )
                        swal.close();                        
                    } else {
                        mostrarMensajeErrorAlert('Ha ocurrido un error al actualizar la factibilidad');
                        swal.close();
                    }
                });
            }
        }).catch(err => {
        });
    }
};