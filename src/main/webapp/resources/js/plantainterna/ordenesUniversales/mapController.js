let objectMapaResumen;
let objectMapaUbiacion;
var map;

app.mapController = function ($scope, ordenesUniversalesService) {
    var marker;
    var mapResumen;
    var markerRes = [];

    $scope.latitudSelectedMap;
    $scope.longitudSelectedMap;
    $scope.initializeMap = function () {
        map = new google.maps.Map(document.getElementById('mapa-ubicacion'), {
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
            zoom: 10,
            disableDoubleClickZoom: true
        });

        objectMapaUbiacion = new GenericMapa(map, 'mapa-ubicacion', 'bottom-right');
        objectMapaUbiacion.inicializar_data()

        map.setZoom(7);      // This will trigger a zoom_changed on the map
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

        mapResumen.setZoom(7);      // This will trigger a zoom_changed on the map
        mapResumen.setCenter(new google.maps.LatLng(19.33517924674462, -99.19857880597777));

        $scope.inicializarMarkers()

    }

    $scope.inicializarMarkers = function () {
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP
        });

        markerRes = new google.maps.Marker({
            map: mapResumen,
            draggable: false,
            animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'dragend', function (event) {
            marker.setMap(map)
            markerRes.setMap(mapResumen);
            $scope.latitudSelectedMap = this.getPosition().lat();
            $scope.longitudSelectedMap = this.getPosition().lng();
            $scope.$apply()
            markerRes.setPosition(new google.maps.LatLng($scope.latitudSelectedMap, $scope.longitudSelectedMap));
            mapResumen.setCenter(new google.maps.LatLng($scope.latitudSelectedMap, $scope.longitudSelectedMap));
            $("#search-input-place").val(this.getPosition().lat() + ', ' + this.getPosition().lng());
        });

        google.maps.event.addListener(map, 'dblclick', function (e) {
            marker.setMap(map)
            markerRes.setMap(mapResumen);

            let positionDoubleclick = e.latLng;
            marker.setPosition(positionDoubleclick);
            markerRes.setPosition(positionDoubleclick);
            mapResumen.setCenter(positionDoubleclick);
            $scope.latitudSelectedMap = marker.getPosition().lat();
            $scope.longitudSelectedMap = marker.getPosition().lng();
            $scope.$apply()
            $("#search-input-place").val($scope.latitudSelectedMap + ', ' + $scope.longitudSelectedMap);

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
            // console.log("bounds_changed")

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
                    // console.log("Returned place contains no geometry");
                    return;
                }
                $scope.latitudSelectedMap = place.geometry.location.lat();
                $scope.longitudSelectedMap = place.geometry.location.lng();
                $scope.$apply()

                marker.setPosition(new google.maps.LatLng($scope.latitudSelectedMap, $scope.longitudSelectedMap));
                map.setZoom(17);
                map.setCenter(new google.maps.LatLng($scope.latitudSelectedMap, $scope.longitudSelectedMap));

                markerRes.setPosition(new google.maps.LatLng($scope.latitudSelectedMap, $scope.longitudSelectedMap));
                mapResumen.setCenter(new google.maps.LatLng($scope.latitudSelectedMap, $scope.longitudSelectedMap));
                mapResumen.setZoom(17);

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
            map.setZoom(5);
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