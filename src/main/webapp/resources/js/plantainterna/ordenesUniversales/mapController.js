app.mapController = function ($scope, ordenesUniversalesService) {

    //let map;
    //let mapResumen;

    $scope.initMap = function () {
        map = new google.maps.Map(document.getElementById("mapa-ubicacion"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });

        mapResumen = new google.maps.Map(document.getElementById("mapa-resumen"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    }

    //$scope.initMap();

    
    var arraysKmz=[
        'http://www.totalplay.com.mx/web/mapas/sf/Ciudades.kmz?cobertura='+ parseInt(Math.random()*99999999),//var kmlCiudad = 
        'http://www.totalplay.com.mx/web/mapas/sf/Restricciones.kmz',// var restriccion = 
        'http://www.totalplay.com.mx/web/mapas/sf/Blueholes.kmz',//var blueholes =
        'http://www.totalplay.com.mx/web/mapas/sf/ciudadesTPE_FO.kmz',//var kmlCiudades= 
        'http://www.totalplay.com.mx/web/mapas/sf/ciudadesTPE_PMP.kmz'//var kmlCiudades2= 
    ];
    var kmls_display=[];
    var geocoder ;
    var map;
    var mapResumen;
    var markerRes=[];

    function  cambioUbicacion(latitud, longitud){
        markerRes.setPosition(new google.maps.LatLng(latitud, longitud));
        mapResumen.setCenter(new google.maps.LatLng(latitud, longitud));
    //	if(markerRes.length >= 1){
    //    for (var i = 0; i < markers.length; i++) {
    //    	markerRes[i].setMap(null);
    //      }
    //    clearMarkers(latitud, longitud);
    //	}else{
    //		clearMarkers(latitud, longitud);
    //	}
    }

    function setUbicacion(latitud, longitud) {
        marker.setPosition(new google.maps.LatLng(latitud, longitud));
        map.setCenter(new google.maps.LatLng(latitud, longitud));
    }

    function clearMarkers(latitud, longitud) {
            
    /* carga mapa 
    *   mapResumen = new google.maps.Map(document.getElementById('mapa-resumen'), {
            center : {
                lat : parseFloat( latitud ),
                lng : parseFloat( longitud )
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_LEFT             
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_LEFT
            },streetViewControlOptions :{
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: false,
            zoom :  19,
            styles : jsonMap
        });*/

        markerRes = new google.maps.Marker({
            map: mapResumen,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: {
                lat:parseFloat(  latitud ),
                lng: parseFloat( longitud ) 
            }
        });
    }

    function initializeMap(){

        map = new google.maps.Map(document.getElementById('mapa-ubicacion'), {
            center : {
                lat : parseFloat( 0 ),
                lng : parseFloat( 0 )
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_LEFT             
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_LEFT
            },streetViewControlOptions :{
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            zoom :  10 ,
            //styles : jsonMap,
            disableDoubleClickZoom: true
        });

        mapResumen = new google.maps.Map(document.getElementById('mapa-resumen'), {
            center : {
                lat : parseFloat( 0 ),
                lng : parseFloat( 0 )
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_LEFT             
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_LEFT
            },streetViewControlOptions :{
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: false,
            zoom : 20,
            //styles : jsonMap
        });

        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {
            }
        });

        markerRes = new google.maps.Marker({
            map: mapResumen,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: {
            }
        });

        

        google.maps.event.addListener(marker, 'dragend', function (event) {
            $("#latitud-asignacion").text(this.getPosition().lat() )
            $("#longtiud-asignacion").text(  this.getPosition().lng() )        
            geocodeLatLng( this.getPosition().lat() , this.getPosition().lng())
            
            cambioUbicacion(this.getPosition().lat(), this.getPosition().lng());
            $("#latitud-resumen").html(this.getPosition().lat());
            $("#longitud-resumen").html(this.getPosition().lng());
            
            $("#search-input-place").val(this.getPosition().lat()+', '+this.getPosition().lng());
            $("#latitud-label").text(this.getPosition().lat());
            $("#longitud-label").text(this.getPosition().lng());
        });
        google.maps.event.addListener(map, 'dblclick', function(e) {
            var positionDoubleclick = e.latLng;
            marker.setPosition(positionDoubleclick);
            markerRes.setPosition(positionDoubleclick);
            mapResumen.setCenter(positionDoubleclick);
            $("#latitud-resumen").html(marker.getPosition().lat());
            $("#longitud-resumen").html(marker.getPosition().lng());
            
            $("#search-input-place").val(marker.getPosition().lat()+', '+marker.getPosition().lng());
            $("#latitud-label").text(marker.getPosition().lat());
            $("#longitud-label").text(marker.getPosition().lng());
            // if you don't do this, the map will zoom in
    //        e.stopPropagation();
            console.log("ERROR")
        });

        geocoder = new google.maps.Geocoder;

        addSearchInput()
        $.each(arraysKmz,function(index,element){
            var ctaLayer = new google.maps.KmlLayer({
                url: element,
                map: map,
                clickable: false
            });
            kmls_display.push(ctaLayer);
        });
        
    }

    initializeMap();


    function addSearchInput(){
        var input = document.getElementById('search-input-place');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0 || places.length > 1) {
            return;
            }
        
            // Clear out the old markers.
            marker.setMap(null);
            marker=undefined;

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                marker = new google.maps.Marker({
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: place.geometry.location
                });

                //consultarFactiblidad( place.geometry.location.lat() , place.geometry.location.lng() ) 
                cambioUbicacion(place.geometry.location.lat(), place.geometry.location.lng());
                    $("#latitud-resumen").html(place.geometry.location.lat());
                    $("#longitud-resumen").html(place.geometry.location.lng());
                    
                    $("#latitud-label").text(place.geometry.location.lat());
                    $("#longitud-label").text(place.geometry.location.lng());

                
                google.maps.event.addListener(marker, 'dragend', function (event) {
                    $("#latitud-asignacion").text(this.getPosition().lat() )
                    $("#longtiud-asignacion").text(  this.getPosition().lng() )        
                    geocodeLatLng( this.getPosition().lat() , this.getPosition().lng())
                    
                    cambioUbicacion(this.getPosition().lat(), this.getPosition().lng());
                    $("#latitud-resumen").html(this.getPosition().lat());
                    $("#longitud-resumen").html(this.getPosition().lng());
                    
                    $("#search-input-place").val(this.getPosition().lat()+', '+this.getPosition().lng());
                    $("#latitud-label").text(this.getPosition().lat());
                    $("#longitud-label").text(this.getPosition().lng());
                });
                
    //            $("#mapa-asignacion").dblclick(function(){
    //            	console.log("dsf")
    //            })

        google.maps.event.addListener(map, 'dblclick', function(e) {
            var positionDoubleclick = e.latLng;
            marker.setPosition(positionDoubleclick);
            markerRes.setPosition(positionDoubleclick);
            mapResumen.setCenter(positionDoubleclick);
            $("#latitud-resumen").html(marker.getPosition().lat());
            $("#longitud-resumen").html(marker.getPosition().lng());
            
            $("#search-input-place").val(marker.getPosition().lat()+', '+marker.getPosition().lng());
            $("#latitud-label").text(marker.getPosition().lat());
            $("#longitud-label").text(marker.getPosition().lng());
            // if you don't do this, the map will zoom in
    //        e.stopPropagation();
            console.log("ERROR")
        });
                
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        
    }



    function geocodeLatLng( latitud,longitud) {
        
        //consultarFactiblidad( latitud , longitud )

    }


    $(".tab-step-wizar:eq(2)").click(function(){
        
        if($("#latitud-resumen").text()=='' || $("#longitud-resumen").text() == ''){
            var pt = new google.maps.LatLng( parseFloat( $("#latitudSession").val()),parseFloat( $("#longitudSession").val() ));
            map.setCenter(pt);
            map.setZoom(5);
        }else{
            var pt = new google.maps.LatLng($("#latitud-resumen").text(), $("#longitud-resumen").text());
            map.setCenter(pt);
            map.setZoom(14);
        }
    })


    function ocultarKMLCoberturas(controlDiv) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#39455b';
        controlUI.style.border = '2px solid #39455b';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '10px';
        controlUI.style.marginRight = '10px';

        controlUI.style.marginTop = '10px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = '#ffffff';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '13px';
        controlText.style.lineHeight = '28px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.style.margingTop = '5px';

        string_text='Validar datos de direccion'
        htmlAppend=$.parseHTML( string_text )[0].data;

        controlText.innerHTML = htmlAppend;
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {

            
            if( $(this).hasClass('validar_datos') ){            

                if(isFactibilidadCorrecta ){
                    actualizarFactiblidad()
                }else{
                    mostrarMensajeWarning('No se encontr\u00f3 factibilidad en la ubicaci\u00f3n, mueve el marcador en el mapa')
                }    
        
            }else{

                $("#agendar-cuenta").attr('disabled',false)
                $(this).find('div').html("Actualizar factibilidad")      
                $(this).toggleClass('validar_datos');
                            
            }

        });
    }
    
}