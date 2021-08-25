app.mapasControllerDespachoPI = function ($scope, mainDespachoService) {
    let markerUbiacionOperario;
    let markerUbicacionRepartidor;
    $scope.isAbiertoDetalleDireccion = false;
    listadoLinesCurves = []
    $scope.markerTecnicos = [];
    $scope.markerOt = [];

    $scope.consultarUbicacionOperario = function (objectParams) {
        console.log(objectParams)
        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            "Fecha_fin": "25/03/2021",
            "Fecha_inicio": "25/02/2021",
            "Id_subIntervencion": "48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno": "1,2,3",
            "Id_cluster": "176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO": "64"
        }
        mainDespachoService.consultarOtsTrabajadasDespacho(params).then(function success(response) {
            console.log(response);
            let latitudRes = parseFloat('19.342848228399788')
            let longitudRes = parseFloat('-98.81238282971054')
            if (!mapubicacionoperario) {

                mapubicacionoperario = new google.maps.Map(document.getElementById("vista_mapa_ubicacion"), {
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

            if (markerUbiacionOperario)
                markerUbiacionOperario.setMap(null)

            markerUbiacionOperario = undefined
            markerUbiacionOperario = new google.maps.Marker({
                map: mapubicacionoperario,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: { lat: latitudRes, lng: longitudRes },
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

    $scope.listadomarkerscotizacion = [];
    $scope.consultarDetalleCotizacion = function (idot) {
        $scope.isAbiertoDetalleDireccion = false;
        //$scope.$apply()
        console.log(idot)
        $scope.consultarCotizacionDespacho(idot);
    }

    $scope.consultarCotizacionDespacho = function (idot) {
        $scope.limpiarMarkersCotizacion()
        // idot="167"
        $scope.detalleCotizacion = {}
        $scope.detalleCotizacion.detalleOt = angular.copy($scope.listadoOtsPendientes.find((e) => e.idOrden == idot))
        console.log($scope.detalleCotizacion)
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


        mainDespachoService.consultarCotizacionDespacho(params).then(function success(response) {
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
                                        if (index == 0) {
                                            elem.direccionDetalle.latitud = "19.327606110757337"
                                            elem.direccionDetalle.longitud = "-99.19763482133813"
                                            mapaucotizaciondetalle.setCenter(new google.maps.LatLng(parseFloat(elem.direccionDetalle.latitud), parseFloat(elem.direccionDetalle.longitud)));
                                        }
                                        let latitud_ot = {
                                            lat: parseFloat(elem.direccionDetalle.latitud),
                                            lng: parseFloat(elem.direccionDetalle.longitud)
                                        };
                                        arrarLatLong.push({
                                            lat: parseFloat(elem.direccionDetalle.latitud),
                                            lng: parseFloat(elem.direccionDetalle.longitud)
                                        })

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
    $scope.colocarMarkerRepartidor = function () {
        if (markerUbiacionOperario != undefined)
            markerUbiacionOperario.setMap(null)

        if ($scope.ubicacionTecnicoObjeto.latitud != undefined && $scope.ubicacionTecnicoObjeto.longitud != undefined) {
            markerUbiacionOperario = new google.maps.Marker({
                clickable: false,
                position: { lat: parseFloat($scope.ubicacionTecnicoObjeto.latitud), lng: parseFloat($scope.ubicacionTecnicoObjeto.longitud) },
                title: "Repartidor",
                animation: google.maps.Animation.DROP,
                map: mapaucotizaciondetalle,
                latitud_ot: parseFloat($scope.ubicacionTecnicoObjeto.latitud),
                longitud_ot: parseFloat($scope.ubicacionTecnicoObjeto.longitud),
                icon: {
                    url: "./resources/img/plantainterna/despacho/repartidor-marker.svg",
                    scaledSize: new google.maps.Size(37, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 20)
                }
            });
        }

    }
    $scope.limpiarMarkersCotizacion = function () {
        $scope.listadomarkerscotizacion.map(function (e) { e.setMap(null); return e; })
        $scope.listadomarkerscotizacion = [];

        listadoLinesCurves.map(function (e) { e.setMap(null); return e; })
        listadoLinesCurves = []
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

    
    $scope.limpiarMakerTecnicos = () => {
        $scope.markerTecnicos.map(e => { e.setMap(null); return e; });
        $scope.markerTecnicos = [];

        listadoLinesCurves.map(function (e) { e.setMap(null); return e; })
        listadoLinesCurves = []

        $scope.markerOt.map(function (e) { e.setMap(null); return e; })
        $scope.markerOt = [];
    }

    $scope.consultarDetalleMapa = function () {
        $scope.limpiarMakerTecnicos();
        if (!mapavistageneral) {

            mapavistageneral = new google.maps.Map(document.getElementById("mapa-vista-general"), {
                center: { 
                    lat: parseFloat('19.335204'),  
                    lng: parseFloat('-99.197374')},
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
        }

        $scope.listadoTecnicosGeneral.forEach(tecnico =>{
            markerUbicacionRepartidor = new google.maps.Marker({
                clickable: false,
                position: {
                    lat: parseFloat(tecnico.latitud),
                    lng: parseFloat(tecnico.longitud)
                },
                title: "Tecnico",
                animation: google.maps.Animation.DROP,
                map: mapavistageneral,
                latitud_ot: parseFloat(tecnico.latitud),
                longitud_ot: parseFloat(tecnico.longitud),
                icon: {
                    url: "./resources/img/plantainterna/despacho/repartidor-marker.svg",
                    scaledSize: new google.maps.Size(37, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 20)
                },
            });
            $scope.markerTecnicos.push(markerUbicacionRepartidor);
        })    
       
    }

    $scope.pintarOtMapTecnicoSeleccionado = function(id) {
        $scope.limpiarMakerTecnicos();
        let tecnicoSelect = $scope.listadoTecnicosGeneral.find(e => { return e.idTecnico === id })
        markerUbicacionRepartidor = new google.maps.Marker({
            clickable: false,
            position: {
                lat: parseFloat(tecnicoSelect.latitud),
                lng: parseFloat(tecnicoSelect.longitud)
            },
            title: "Tecnico",
            animation: google.maps.Animation.DROP,
            map: mapavistageneral,
            latitud_ot: parseFloat(tecnicoSelect.latitud),
            longitud_ot: parseFloat(tecnicoSelect.longitud),
            icon: {
                url: "./resources/img/plantainterna/despacho/repartidor-marker.svg",
                scaledSize: new google.maps.Size(37, 43),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(10, 20)
            },
        });
        mapavistageneral.setCenter(new google.maps.LatLng(parseFloat(tecnicoSelect.latitud), parseFloat(tecnicoSelect.longitud)));
        $scope.markerTecnicos.push(markerUbicacionRepartidor);

        tecnicoSelect.listadoOts.forEach(ot => {
            let marker_ot = new google.maps.Marker({
                clickable: false,
                position: {
                    lat: parseFloat(ot.latitud),
                    lng: parseFloat(ot.longitud)
                },
                title: "OT",
                animation: google.maps.Animation.DROP,
                map: mapavistageneral,
                latitud_ot: parseFloat(ot.latitud),
                longitud_ot: parseFloat(ot.longitud),
                icon: {
                    url: './resources/img/plantainterna/despacho/domicilio-marker.svg',
                    scaledSize: new google.maps.Size(37, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 20)
                },
            });
            $scope.markerOt.push(marker_ot)
            let pointA = new google.maps.LatLng(parseFloat(tecnicoSelect.latitud), parseFloat(tecnicoSelect.longitud)) // basel airport
            let pointB = new google.maps.LatLng(parseFloat(ot.latitud), parseFloat(ot.longitud))
            drawCurve(pointA, pointB, mapavistageneral);
        });
    }
}
