app.agendamientoMap = function ($scope, bandejasSalesforceService) {

    let markerAg;
    let objectMapaUbiacion;
    var mapAgendamiento;
    $scope.isFactibilidad = false;
    $scope.latitudSelected;
    $scope.longitudSelected;
    $scope.isMapaLoaded = false;

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
    }

    $scope.clearMarkersAgendamiento = function () {
        if (markerAg !== undefined) {
            markerAg.setMap(null);
        }
    }

    $scope.setMarkerAgendamiento = function () {
        mapAgendamiento.setZoom(17);
        mapAgendamiento.setCenter(new google.maps.LatLng($scope.elementoCSP.latitud, $scope.elementoCSP.longitud));

        markerAg = new google.maps.Marker({
            map: mapAgendamiento,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {
                lat: Number($scope.elementoCSP.latitud),
                lng: Number($scope.elementoCSP.longitud)
            }
        });

        google.maps.event.addListener(markerAg, 'dragend', function (event) {
            markerAg.setMap(mapAgendamiento)
            $scope.latitudSelected = this.getPosition().lat();
            $scope.longitudSelected = this.getPosition().lng();
            $scope.$apply()
            $("#search-input-place").val(this.getPosition().lat() + ', ' + this.getPosition().lng());
            $scope.consultarFactibilidadAgendamiento('empresarial', $scope.latitudSelected, $scope.longitudSelected);
        });

        google.maps.event.addListener(mapAgendamiento, 'dblclick', function (e) {
            markerAg.setMap(mapAgendamiento)
            let positionDoubleclick = e.latLng;
            markerAg.setPosition(positionDoubleclick);
            $scope.latitudSelected = markerAg.getPosition().lat();
            $scope.longitudSelected = markerAg.getPosition().lng();
            $scope.$apply()
            $("#search-input-place").val($scope.latitudSelected + ', ' + $scope.longitudSelected);
            $scope.consultarFactibilidadAgendamiento('empresarial', $scope.latitudSelected, $scope.longitudSelected);
        });
    }

    $scope.printInputSearchMap = function () {
        let input = document.getElementById('search-input-place');
        let searchBox = new google.maps.places.SearchBox(input);
        mapAgendamiento.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        mapAgendamiento.addListener('bounds_changed', function () {
            searchBox.setBounds(mapAgendamiento.getBounds());
        });
        searchBox.addListener('places_changed', function () {
            let places = searchBox.getPlaces();
            // console.log(places);
            if (places.length == 0 || places.length > 1) {
                return;
            }
            let bounds = new google.maps.LatLngBounds();
            markerAg.setMap(mapAgendamiento)
            places.forEach(function (place) {
                $scope.latitudSelected = place.geometry.location.lat();
                $scope.longitudSelected = place.geometry.location.lng();
                $scope.$apply()

                markerAg.setPosition(new google.maps.LatLng($scope.latitudSelected, $scope.longitudSelected));
                mapAgendamiento.setZoom(17);
                mapAgendamiento.setCenter(new google.maps.LatLng($scope.latitudSelected, $scope.longitudSelected));
                $scope.consultarFactibilidadAgendamiento('empresarial', $scope.latitudSelected, $scope.longitudSelected);

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            mapAgendamiento.fitBounds(bounds);
        });
    }

    $scope.actualizarFactibilidadBandejas = function () {
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
                $scope.elementoCSP.cluster = $scope.infoFactibilidad.cluster;
                $scope.elementoCSP.region = $scope.infoFactibilidad.region;
                $scope.elementoCSP.ciudad = $scope.infoFactibilidad.ciudad;
                $scope.elementoCSP.distrito = $scope.infoFactibilidad.distrito;
                $scope.elementoCSP.latitud = $scope.infoFactibilidad.latitud;
                $scope.elementoCSP.longitud = $scope.infoFactibilidad.longitud;
                $scope.$apply();
                mostrarMensajeExitoAlert("Ubicaci&oacute;n actualizada");
            }
        }).catch(err => {
        });
    }
};