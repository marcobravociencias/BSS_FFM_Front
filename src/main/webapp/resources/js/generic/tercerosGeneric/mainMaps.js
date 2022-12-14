app.mapasTercerosController = function ($scope, tercerosGenericService) {
    $scope.isAbiertoDetalleDireccion = false;
    $scope.isMapaCambioDireccionOTMod = false;
    var mapaCambioDireccionOTMod;
    var mapaucotizaciondetalle;
    var mapaDictamen;
    var markerResMod;
    var markerRes;
    var markerDictamen;
    listadoLinesCurves = []

    $scope.verMapaDictamen = function () {

        mapaDictamen = new google.maps.Map(document.getElementById('content-mapa-dictamen'), {
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

        mapaDictamen.setZoom(17);    
        mapaDictamen.setCenter(new google.maps.LatLng(19.33517924674462, -99.19857880597777));

        markerDictamen = new google.maps.Marker({
            map: mapaDictamen,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {
                lat: 0,
                lng: 0
            }
        });

        google.maps.event.addListener(markerDictamen, 'dragend', function (event) {
            markerDictamen.setMap(mapaDictamen)
            $scope.objectDictamen.latitud = this.getPosition().lat();
            $scope.objectDictamen.longitud = this.getPosition().lng();
            $scope.$apply();
            $("#search-input-place").val(this.getPosition().lat() + ', ' + this.getPosition().lng());           
        });
        google.maps.event.addListener(mapaDictamen, 'dblclick', function (e) {
            markerDictamen.setMap(mapaDictamen)
            let positionDoubleclick = e.latLng;
            markerDictamen.setPosition(positionDoubleclick);
            mapaDictamen.setCenter(positionDoubleclick);
            $scope.objectDictamen.latitud = markerDictamen.getPosition().lat();
            $scope.objectDictamen.longitud = markerDictamen.getPosition().lng();
            $scope.$apply();
            $("#search-input-place").val($scope.objectDictamen.latitud + ', ' +  $scope.objectDictamen.longitud);
        });
        geocoder = new google.maps.Geocoder;
        $scope.addSearchInput()
    }

    $scope.addSearchInput = function () {
        let input = document.getElementById('search-input-place');
        let searchBox = new google.maps.places.SearchBox(input);
        mapaDictamen.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        mapaDictamen.addListener('bounds_changed', function () {
            searchBox.setBounds(mapaDictamen.getBounds());
        });
        searchBox.addListener('places_changed', function () {
            let places = searchBox.getPlaces();
            if (places.length == 0 || places.length > 1) {
                return;
            }
            let bounds = new google.maps.LatLngBounds();
            markerDictamen.setMap(mapaDictamen)
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                $scope.objectDictamen.latitud = place.geometry.location.lat();
                $scope.objectDictamen.longitud = place.geometry.location.lng();
                $scope.$apply()

                markerDictamen.setPosition(new google.maps.LatLng($scope.objectDictamen.latitud,  $scope.objectDictamen.longitud));
                mapaDictamen.setZoom(17);
                mapaDictamen.setCenter(new google.maps.LatLng($scope.objectDictamen.latitud,  $scope.objectDictamen.longitud));

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            mapaDictamen.fitBounds(bounds);

        });
    }

    $scope.verMapaCambioDireccion = function (lat, long) {
        $scope.verModDireccionOT = false;
        mapaCambioDireccionOT = new google.maps.Map(document.getElementById("content-mapa-cambio-direccion"), {
            center: {
                lat: parseFloat(lat),
                lng: parseFloat(long)
            },
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
        });

        markerRes = new google.maps.Marker({
            map: mapaCambioDireccionOT,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: "Direcci??n de la OT",
            position: {
                lat: parseFloat(lat),
                lng: parseFloat(long)
            }
        });
    }

    $scope.mostrarVistaModificarDireccion = function (lat, long) {
        $("#txtBuscadorDireccionMap").val("");
        $scope.verModDireccionOT = true;
        $scope.latitudModDireccionOt = lat;
        $scope.longitudModDireccionOt = long;

        if (!$scope.isMapaCambioDireccionOTMod) {
            $scope.isMapaCambioDireccionOTMod = true;

            mapaCambioDireccionOTMod = new google.maps.Map(document.getElementById("content-mapa-cambio-direccion-mod"), {
                center: {
                    lat: parseFloat(lat),
                    lng: parseFloat(long)
                },
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
            });
            mostrarMarkerBusquedaDireccion();
        }
        console.log(markerResMod);
        if (markerResMod !== undefined && markerResMod !== null) {
            markerResMod.setMap(null);
            markerResMod = null;
        }

        markerResMod = new google.maps.Marker({
            map: mapaCambioDireccionOTMod,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: "Direcci??n de la OT",
            position: {
                lat: parseFloat(lat),
                lng: parseFloat(long)
            }
        });

        var ubicacionCenter = new google.maps.LatLng(lat, long);
        mapaCambioDireccionOTMod.setCenter(ubicacionCenter);
        mapaCambioDireccionOTMod.setZoom(15);

        google.maps.event.addListener(markerResMod, "dragend", function (event) {
            $("#txtBuscadorDireccionMap").val(this.getPosition().lat() + ", " + this.getPosition().lng());
            $scope.latitudModDireccionOt = this.getPosition().lat();
            $scope.longitudModDireccionOt = this.getPosition().lng();
            $scope.$apply();
        });
    }

    function mostrarMarkerBusquedaDireccion() {
        var input = document.getElementById("txtBuscadorDireccionMap");
        var searchBox = new google.maps.places.SearchBox(input);

        mapaCambioDireccionOTMod.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        mapaCambioDireccionOTMod.addListener("bounds_changed", function () {
            searchBox.setBounds(mapaCambioDireccionOTMod.getBounds());
        });

        searchBox.addListener("places_changed", function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            markerResMod.setMap(null);
            markerResMod = null;

            var bounds = new google.maps.LatLngBounds();

            places.forEach(function (place) {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                markerResMod = new google.maps.Marker({
                    map: mapaCambioDireccionOTMod,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    title: "Direcci??n de la OT",
                    position: place.geometry.location,
                });

                $scope.latitudModDireccionOt = place.geometry.location.lat();
                $scope.longitudModDireccionOt = place.geometry.location.lng();
                $scope.$apply();

                google.maps.event.addListener(markerResMod, "dragend", function (event) {
                    $("#txtBuscadorDireccionMap").val(this.getPosition().lat() + ", " + this.getPosition().lng());
                    $scope.latitudModDireccionOt = this.getPosition().lat();
                    $scope.longitudModDireccionOt = this.getPosition().lng();
                    $scope.$apply();
                });

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            mapaCambioDireccionOTMod.fitBounds(bounds);
        });
    }

    $scope.listadomarkerscotizacion = [];
    $scope.consultarDetalleCotizacion = function (idot) {
        $scope.isAbiertoDetalleDireccion = false;
        $scope.consultarCotizacionDespacho(idot);
    }

    $scope.consultarCotizacionDespacho = function (idot) {
        $scope.limpiarMarkersCotizacion()
        // idot="167"
        $scope.detalleCotizacion = {}
       if($scope.estatusModals === 'PENDIENTE '){
            $scope.detalleCotizacion.detalleOt = angular.copy($scope.listadoOtsPendientes.find((e) => e.idOrden == idot))
       }
        /**
        $scope.estatusModals = 'PENDIENTE'
        $scope.estatusModals = 'ASIGNADA'
        */
        swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            "idOt": idot
        }

        
        if (!mapaucotizaciondetalle) {

            mapaucotizaciondetalle = new google.maps.Map(document.getElementById("mapa-cotizacion-despacho"), {
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


        tercerosGenericService.consultarCotizacionDespacho(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.consultaCotizacion != undefined) {
                            $scope.detalleCotizacion = response.data.result.consultaCotizacion
                            let arrarLatLong = []
                            //mapaucotizaciondetalle.setCenter(new google.maps.LatLng(37.4419, -122.1419));
                            if (response.data.result.consultaCotizacion.direcciones != undefined && response.data.result.consultaCotizacion.direcciones.length > 0) {
                                angular.forEach(response.data.result.consultaCotizacion.direcciones, function (elem, index) {

                                    if (elem.direccionDetalle != undefined) {
                                     
                                        let latitud_ot = {
                                            lat: parseFloat(elem.direccionDetalle.latitud),
                                            lng: parseFloat(elem.direccionDetalle.longitud)
                                        };
                                        arrarLatLong.push({
                                            lat: parseFloat(elem.direccionDetalle.latitud),
                                            lng: parseFloat(elem.direccionDetalle.longitud)
                                        })
                                        mapaucotizaciondetalle.setCenter(new google.maps.LatLng(parseFloat(elem.direccionDetalle.latitud), parseFloat(elem.direccionDetalle.longitud)));

                                        let urlTemp = ""
                                        switch (elem.accion) {
                                            case 1:
                                                urlTemp = "./resources/img/plantainterna/despacho/negocio-marker.svg"
                                                break;
                                            case 2:
                                                urlTemp = "./resources/img/plantainterna/despacho/domicilio-marker.svg"
                                                break;
                                            case 3:
                                                urlTemp = "./resources/img/plantainterna/despacho/repartidor-icon.svg"
                                                break;
                                            default:
                                                urlTemp = "./resources/img/plantainterna/despacho/repartidor-marker.svg"
                                        }

                                        let marker_ot = new google.maps.Marker({
                                            clickable: false,
                                            position: latitud_ot,
                                            title: "OT",
                                            animation: google.maps.Animation.DROP,
                                            map: mapaucotizaciondetalle,
                                            latitud_ot: parseFloat(elem.direccionDetalle.latitud),
                                            longitud_ot: parseFloat(elem.direccionDetalle.longitud),
                                            icon: {
                                                url: urlTemp,
                                                scaledSize: new google.maps.Size(37, 43),
                                                origin: new google.maps.Point(0, 0),
                                                anchor: new google.maps.Point(10, 20)
                                            },
                                            direccionContent: elem
                                        });
                                        marker_ot.addListener("click", (e, i) => {

                                            $scope.listadomarkerscotizacion.map(function (e) {
                                                if (marker_ot.direccionContent.idDireccion !== e.direccionContent.idDireccion)
                                                    e.setAnimation(null);
                                                return e
                                            })
                                            $scope.isAbiertoDetalleDireccion = true
                                            $scope.elementoDireccion = marker_ot.direccionContent

                                            $scope.$apply()
                                            if (marker_ot.getAnimation() === null)
                                                marker_ot.setAnimation(google.maps.Animation.BOUNCE);

                                        })

                                        $scope.listadomarkerscotizacion.push(marker_ot);
                                    }
                                })

                                let paresLatLong = []
                                if (arrarLatLong.length > 1) {
                                    if (arrarLatLong.length % 2 !== 0)
                                        arrarLatLong.pop()

                                    for (i = 0; i < arrarLatLong.length; i += 2) {
                                        if (!(i == arrarLatLong.length)) {
                                            paresLatLong.push({
                                                puntoA: arrarLatLong[i],
                                                puntoB: arrarLatLong[i + 1]
                                            })
                                        }
                                    }
                                }
                                if (paresLatLong.length > 0) {
                                    angular.forEach(paresLatLong, function (elem, index) {
                                        let pointA = new google.maps.LatLng(elem.puntoA.lat, elem.puntoA.lng) // basel airport
                                        let pointB = new google.maps.LatLng(elem.puntoB.lat, elem.puntoB.lng)
                                        drawCurve(pointA, pointB, mapaucotizaciondetalle);
                                    })
                                }

                                if (markerUbicacionRepartidor != null)
                                    markerUbicacionRepartidor.setMap(null)


                                markerUbicacionRepartidor = new google.maps.Marker({
                                    clickable: false,
                                    position: {
                                        lat: parseFloat($scope.detalleTecnicoOt.latitud),
                                        lng: parseFloat($scope.detalleTecnicoOt.longitud)
                                    },
                                    title: "Repartidor",
                                    animation: google.maps.Animation.DROP,
                                    map: mapaucotizaciondetalle,
                                    latitud_ot: parseFloat($scope.detalleTecnicoOt.latitud),
                                    longitud_ot: parseFloat($scope.detalleTecnicoOt.longitud),
                                    icon: {
                                        url: "./resources/img/plantainterna/despacho/repartidor-marker.svg",
                                        scaledSize: new google.maps.Size(37, 43),
                                        origin: new google.maps.Point(0, 0),
                                        anchor: new google.maps.Point(10, 20)
                                    },
                                });
                                $scope.flagPedido = true;
                                $scope.llamarIntervalo()
                            } else {
                                toastr.warning('No se encontraron datos');
                            }
                        } else {
                            toastr.warning(response.data.result.description);
                        }
                    } else {
                        toastr.warning('No se encontraron datos de la cotizacion');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de cotizacion');
            }
            swal.close()
        }).catch(err => handleError(err))
    }
   
    $scope.limpiarMarkersCotizacion = function () {
        $scope.listadomarkerscotizacion.map(function (e) { e.setMap(null); return e; })
        $scope.listadomarkerscotizacion = [];

        listadoLinesCurves.map(function (e) { e.setMap(null); return e; })
        listadoLinesCurves = []
    }

    $scope.drawCurveExt = function(p1,p2,map){
        drawCurve(p1, p2, map);
    }

    function drawCurve(P1, P2, map) {

        var lineLength = google.maps.geometry.spherical.computeDistanceBetween(P1, P2);
        var lineHeading = google.maps.geometry.spherical.computeHeading(P1, P2);

        if (lineHeading < 0) {
            var lineHeading1 = lineHeading + 45;
            var lineHeading2 = lineHeading + 135;
        } else {
            var lineHeading1 = lineHeading + -45;
            var lineHeading2 = lineHeading + -135;
        }

        var pA = google.maps.geometry.spherical.computeOffset(P1, lineLength / 2.2, lineHeading1);
        var pB = google.maps.geometry.spherical.computeOffset(P2, lineLength / 2.2, lineHeading2);

        var curvedLine = new GmapsCubicBezier(P1, pA, pB, P2, 0.01, map);
    }


    var GmapsCubicBezier = function (latlong1, latlong2, latlong3, latlong4, resolution, map) {
        var lat1 = latlong1.lat();
        var long1 = latlong1.lng();
        var lat2 = latlong2.lat();
        var long2 = latlong2.lng();
        var lat3 = latlong3.lat();
        var long3 = latlong3.lng();
        var lat4 = latlong4.lat();
        var long4 = latlong4.lng();

        var points = [];

        for (var it = 0; it <= 1; it += resolution) {
            points.push(this.getBezier({
                x: lat1,
                y: long1
            }, {
                x: lat2,
                y: long2
            }, {
                x: lat3,
                y: long3
            }, {
                x: lat4,
                y: long4
            }, it));
        }
        var path = [];
        for (var i = 0; i < points.length - 1; i++) {
            path.push(new google.maps.LatLng(points[i].x, points[i].y));
            path.push(new google.maps.LatLng(points[i + 1].x, points[i + 1].y, false));
        }
        var FlightLine = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#1266f1',
            strokeOpacity: 0,
            strokeWeight: 3,

            icons: [{
                icon: {
                    path: 'M 0,-1 0,1',
                    strokeOpacity: .8,
                    scale: 3
                },
                offset: '0',
                repeat: '16px'
            }],
        });

        FlightLine.setMap(map);
        listadoLinesCurves.push(FlightLine)

        return FlightLine;
    };


    GmapsCubicBezier.prototype = {

        B1: function (t) {
            return t * t * t;
        },
        B2: function (t) {
            return 3 * t * t * (1 - t);
        },
        B3: function (t) {
            return 3 * t * (1 - t) * (1 - t);
        },
        B4: function (t) {
            return (1 - t) * (1 - t) * (1 - t);
        },
        getBezier: function (C1, C2, C3, C4, percent) {
            var pos = {};
            pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
            pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
            return pos;
        }
    };


    $scope.isCOnsultaInterval = false;
    $scope.llamarIntervalo = () => {
        if (!$scope.isCOnsultaInterval) {
            $scope.isCOnsultaInterval = true;
            setInterval(() => {
                if (document.getElementById('modalDetalleOT').style.display === 'block') {
                    if (document.getElementById('v-tabs-consulta-pedido-tab').className.split(' ').length === 2) {
                        if ($scope.flagPedido) {
                            let params = {
                                "idOt": $scope.idOtSelect
                            }
                            mainDespachoService.consultarDetalleTecnicoOt(params).then(function (result) {
                                if (result.data !== undefined) {
                                    if (result.data.respuesta) {
                                        if (result.data.result) {
                                            $scope.detalleTecnicoOt = result.data.result;
                                            if (markerUbicacionRepartidor != null)
                                                markerUbicacionRepartidor.setMap(null)


                                            markerUbicacionRepartidor = new google.maps.Marker({
                                                clickable: false,
                                                position: {
                                                    lat: parseFloat($scope.detalleTecnicoOt.latitud),
                                                    lng: parseFloat($scope.detalleTecnicoOt.longitud)
                                                },
                                                title: "Repartidor",
                                                animation: google.maps.Animation.DROP,
                                                map: mapaucotizaciondetalle,
                                                latitud_ot: parseFloat($scope.detalleTecnicoOt.latitud),
                                                longitud_ot: parseFloat($scope.detalleTecnicoOt.longitud),
                                                icon: {
                                                    url: "./resources/img/plantainterna/despacho/repartidor-marker.svg",
                                                    scaledSize: new google.maps.Size(37, 43),
                                                    origin: new google.maps.Point(0, 0),
                                                    anchor: new google.maps.Point(10, 20)
                                                },
                                            });


                                        } else {
                                            toastr.warning('No se encontraron datos');
                                        }
                                    } else {
                                        toastr.warning(results[0].data.resultDescripcion);
                                    }
                                } else {
                                    toastr.error('Ha ocurrido un error en la consulta de los datos');
                                }
                            }).catch(err => handleError(err));
                        }
                    }
                }
            }, 10000);
        }

    }


}
