let objectMapaResumen;
let objectMapaUbiacion;
var map;

app.mapController = function ($scope, traspasosService) {
    var marker;

    var mapResumen;
    var markerRes = [];

    $scope.latitudSelectedMap;
    $scope.longitudSelectedMap;

    $scope.latitudSelectedMapTemp;
    $scope.longitudSelectedMapTemp;
    $scope.initializeMap = function () {
        map = new google.maps.Map(document.getElementById('mapa-ubicacion'), {
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

        objectMapaUbiacion = new GenericMapa(map, 'mapa-ubicacion', 'bottom-right');
        objectMapaUbiacion.inicializar_data()


        map.setZoom(17);      // This will trigger a zoom_changed on the map
        map.setCenter(new google.maps.LatLng(19.33517924674462, -99.19857880597777));

        mapResumen = new google.maps.Map(document.getElementById('mapa-resumen'), {
            center: {
                lat: parseFloat(0),
                lng: parseFloat(0)
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_LEFT
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_LEFT
            }, streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: false,
            zoom: 10,
        });

        mapResumen.setZoom(17);      // This will trigger a zoom_changed on the map
        mapResumen.setCenter(new google.maps.LatLng(19.33517924674462, -99.19857880597777));

        $scope.inicializarMarkers()

        google.maps.event.addListener(marker, 'dragend', function (event) {
            marker.setMap(map)
            markerRes.setMap(mapResumen);

            $scope.latitudSelectedMapTemp = this.getPosition().lat();
            $scope.longitudSelectedMapTemp = this.getPosition().lng();
            $scope.$apply()
            markerRes.setPosition(new google.maps.LatLng($scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp));
            mapResumen.setCenter(new google.maps.LatLng($scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp));
            $("#search-input-place").val(this.getPosition().lat() + ', ' + this.getPosition().lng());
            setTimeout(() => {
                $scope.consultarFactibilidad(true, $scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp)
            }, 800);
        });
        google.maps.event.addListener(map, 'dblclick', function (e) {
            marker.setMap(map)
            markerRes.setMap(mapResumen);

            let positionDoubleclick = e.latLng;
            marker.setPosition(positionDoubleclick);
            markerRes.setPosition(positionDoubleclick);
            mapResumen.setCenter(positionDoubleclick);
            $scope.latitudSelectedMapTemp = marker.getPosition().lat();
            $scope.longitudSelectedMapTemp = marker.getPosition().lng();
            $scope.$apply()
            $("#search-input-place").val($scope.latitudSelectedMapTemp + ', ' + $scope.longitudSelectedMapTemp);
            setTimeout(() => {
                $scope.consultarFactibilidad(true, $scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp)
            }, 800);
        });
        geocoder = new google.maps.Geocoder;
        $scope.addSearchInput()
        /**$.each(arraysKmz,function(index,element){
            var ctaLayer = new google.maps.KmlLayer({
                url: element,
                map: map,
                clickable: false
            });
            kmls_display.push(ctaLayer);
        });**/

    }

    $scope.inicializarMarkers = function () {
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {
                lat: 0,
                lng: 0
            }
        });

        markerRes = new google.maps.Marker({
            map: mapResumen,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: {
                lat: 0,
                lng: 0
            }
        });
    }
    $scope.limpiarMarkers = function () {
        marker.setMap(null)
        markerRes.setMap(null);
    }
    $scope.addSearchInput = function () {
        let input = document.getElementById('search-input-place');
        let searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener('places_changed', function () {
            let places = searchBox.getPlaces();

            if (places.length == 0 || places.length > 1) {
                return;
            }
            let bounds = new google.maps.LatLngBounds();
            marker.setMap(map)
            markerRes.setMap(mapResumen);
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                $scope.latitudSelectedMapTemp = place.geometry.location.lat();
                $scope.longitudSelectedMapTemp = place.geometry.location.lng();
                $scope.$apply()

                marker.setPosition(new google.maps.LatLng($scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp));
                map.setZoom(17);
                map.setCenter(new google.maps.LatLng($scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp));

                markerRes.setPosition(new google.maps.LatLng($scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp));
                mapResumen.setCenter(new google.maps.LatLng($scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp));
                mapResumen.setZoom(17);
                setTimeout(() => {
                    $scope.consultarFactibilidad(true, $scope.latitudSelectedMapTemp, $scope.longitudSelectedMapTemp)
                }, 800);

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);

        });

     
    }
    $scope.abrirOpcionUbicacion = function () {
        let isErrorValidate = $scope.validarLatitudLongitudMap()
        if (!isErrorValidate) {
            var pt = new google.maps.LatLng($scope.latitudSelectedMap, $scope.longitudSelectedMap);
            map.setCenter(pt);
            map.setZoom(17);
            marker.setPosition(new google.maps.LatLng($scope.latitudSelectedMap, $scope.longitudSelectedMap));
        }
    }

    $scope.validateLatitudLongitudCaracteres = function (latitudOrLongintud) {
        let regexLongitud = /[,'Â°`/;#_"$%*]/
        return regexLongitud.test(latitudOrLongintud)
    }

    $scope.isLatitude = function (lat) {
        return isFinite(lat) && Math.abs(lat) <= 90;
    }

    $scope.isLongitude = function (lng) {
        return isFinite(lng) && Math.abs(lng) <= 180;
    }


}