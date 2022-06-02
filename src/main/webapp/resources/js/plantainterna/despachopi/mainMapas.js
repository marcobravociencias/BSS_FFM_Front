app.mapasControllerDespachoPI = function ($scope, mainDespachoService) {
    let markerUbiacionOperario;
    let markerUbicacionRepartidor;
    let objectVistaGeneral;
    let objectVistaUbicacion;
    $scope.isAbiertoDetalleDireccion = false;
    listadoLinesCurves = []
    $scope.markerTecnicos = [];
    $scope.markerOt = [];
    $scope.isMapaCambioDireccionOTMod = false;
    var mapaCambioDireccionOTMod;
    var markerResMod;

    $scope.consultarUbicacionOperario = function (id) {
        let tecnicoSelect = $scope.listadoTecnicosGeneral.find(e => { return e.idTecnico.toString() === id })
        let latitudRes = parseFloat(tecnicoSelect.latitud)
        let longitudRes = parseFloat(tecnicoSelect.longitud)
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
            objectVistaUbicacion = new GenericMapa(mapubicacionoperario, 'vista_mapa_ubicacion', 'bottom-right');
            objectVistaUbicacion.inicializar_data()
        }
        var pt = new google.maps.LatLng(latitudRes, longitudRes);
        mapubicacionoperario.setCenter(pt);

        if (markerUbiacionOperario)
            markerUbiacionOperario.setMap(null)

        $scope.limpiarMakerTecnicosGeneral();

        markerUbiacionOperario = undefined
        markerUbiacionOperario = new google.maps.Marker({
            map: mapubicacionoperario,
            animation: google.maps.Animation.DROP,
            position: { lat: latitudRes, lng: longitudRes },
            icon: {
                url:"./resources/img/plantainterna/despacho/repartidor-marker.svg",
                scaledSize: new google.maps.Size(37, 43),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(10, 20)
            },
            title : "Tecnico",
        });
        tecnicoSelect.listadoOts.forEach(ot => {
            let marker_ot = new google.maps.Marker({
                clickable: false,
                position: {
                    lat: parseFloat(ot.latitud),
                    lng: parseFloat(ot.longitud)
                },
                title: "OT",
                animation: google.maps.Animation.DROP,
                map: mapubicacionoperario,
                latitud_ot: parseFloat(ot.latitud),
                longitud_ot: parseFloat(ot.longitud),
                icon: {
                    url:'./resources/img/plantainterna/despacho/domicilio-marker.svg',
                    scaledSize: new google.maps.Size(37, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 20)
                },
            });
            $scope.markerOt.push(marker_ot);
            let pointA = new google.maps.LatLng(parseFloat(tecnicoSelect.latitud), parseFloat(tecnicoSelect.longitud)) // basel airport
            let pointB = new google.maps.LatLng(parseFloat(ot.latitud), parseFloat(ot.longitud))
            drawCurve(pointA, pointB, mapubicacionoperario);
        });
        $("#modalUbicacionOperario").modal('show');

        /*
        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
         var params =  {
            "Fecha_inicio": moment( moment($scope.fechaInicioFiltro, 'DD/MM/YYYY').toDate()  ).format('YYYY-MM-DD'),
            "Fecha_fin": moment( moment($scope.fechaFinFiltro , 'DD/MM/YYYY').toDate() ).format('YYYY-MM-DD') ,
            "Id_subIntervencion": envioIntervenciones,
            "Id_turno": turnosdisponiblescopy,  
            "IDSDESPAHCO": 64,
            "Id_cluster": clustersparam
        }
        
        mainDespachoService.consultarOtsTrabajadasDespacho(params).then(function success(response) {
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
                        //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))
        */
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
       }else{
            $scope.detalleCotizacion.detalleOt = angular.copy(  $scope.listadoOtsAsignadas.find((e) => e.idOrden == idot))
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


    $scope.limpiarMakerTecnicosGeneral = () => {
        $scope.markerTecnicos.map(e => { e.setMap(null); return e; });
        $scope.markerTecnicos = [];

        listadoLinesCurves.map(function (e) { e.setMap(null); return e; })
        listadoLinesCurves = []

        $scope.markerOt.map(function (e) { e.setMap(null); return e; })
        $scope.markerOt = [];
    }

    $scope.consultarDetalleMapa = function () {
        $scope.limpiarMakerTecnicosGeneral();
        if (!mapavistageneral) {

            mapavistageneral = new google.maps.Map(document.getElementById("mapa-vista-general"), {
                center: {
                    lat: parseFloat('19.335204'),
                    lng: parseFloat('-99.197374')
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


            objectVistaGeneral = new GenericMapa(mapavistageneral, 'mapa-vista-general', 'bottom-right');
            objectVistaGeneral.inicializar_data()

        }

        $scope.listadoTecnicosGeneral.forEach(tecnico => {
            $scope.pintarMarkers(tecnico.idTecnico);
        })
    }

    $scope.pintarMarkers = function (id) {
        let tecnicoSelect = $scope.listadoTecnicosGeneral.find(e => { return e.idTecnico === id })
        if (tecnicoSelect.cantidadOts > 0) {
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

    $scope.pintarOtMapTecnicoSeleccionado = function (id) {
        $scope.limpiarMakerTecnicosGeneral();
        $scope.pintarMarkers(id);
    }

    let mapaDetalleAlerta;
    let mapaDetalleTecnico;
    $scope.inicializarMapasAlertaDetalle = function () {
        mapaDetalleAlerta = new google.maps.Map(document.getElementById("mapDetalleAlerta"), {
            zoom: 15,
        });

        mapaDetalleTecnico = new google.maps.Map(document.getElementById("mapDetalleTecnico"), {
            zoom: 15,
        });
    }
    let marketsDetalleAlerta = []
    let maDetalleAlerta;
    let mDetalleTecnico;
    $scope.pintarMarkesMapDetalleAlerta = function () {
        $scope.limpiarMakerTecnicos();
        let isDataMarkerTecnico = $scope.validarLatitudLongitudMap($scope.objectDetalleAlerta.tecnico.latitud, $scope.objectDetalleAlerta.tecnico.longitud);
        let isDataMarkerAlerta = $scope.validarLatitudLongitudMap($scope.objectDetalleAlerta.alerta.latitudAlerta, $scope.objectDetalleAlerta.alerta.longitudAlerta);
        
        if(!isDataMarkerAlerta){
          
            maDetalleAlerta = new google.maps.Marker({
                clickable: false,
                position: {
                    lat: parseFloat($scope.objectDetalleAlerta.alerta.latitudAlerta),
                    lng: parseFloat($scope.objectDetalleAlerta.alerta.longitudAlerta)
                },
                animation: google.maps.Animation.DROP,
                map: mapaDetalleAlerta,
                latitud_ot: parseFloat($scope.objectDetalleAlerta.alerta.latitudAlerta),
                longitud_ot: parseFloat($scope.objectDetalleAlerta.alerta.longitudAlerta),
                icon: {
                    url:'./resources/img/plantainterna/despacho/domicilio-marker.svg',
                    scaledSize: new google.maps.Size(37, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 20)
                }

            });
            mapaDetalleAlerta.setCenter(new google.maps.LatLng(parseFloat($scope.objectDetalleAlerta.alerta.latitudAlerta), parseFloat($scope.objectDetalleAlerta.alerta.longitudAlerta)));
            marketsDetalleAlerta.push(maDetalleAlerta)
        }else{
            mapaDetalleAlerta.setCenter(new google.maps.LatLng(19.4326, -99.1332));
            mapaDetalleAlerta.setZoom(5);
        }

        if(!isDataMarkerTecnico){
            mDetalleTecnico = new google.maps.Marker({
                clickable: false,
                position: {
                    lat: parseFloat($scope.objectDetalleAlerta.tecnico.latitud),
                    lng: parseFloat($scope.objectDetalleAlerta.tecnico.longitud)
                },
                animation: google.maps.Animation.DROP,
                map: mapaDetalleTecnico,
                latitud_ot: parseFloat($scope.objectDetalleAlerta.tecnico.latitud),
                longitud_ot: parseFloat($scope.objectDetalleAlerta.tecnico.longitud),
                icon: {
                    url:"./resources/img/plantainterna/despacho/repartidor-marker.svg",
                    scaledSize: new google.maps.Size(37, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 20)
                }

            });
            mapaDetalleTecnico.setCenter(new google.maps.LatLng(parseFloat($scope.objectDetalleAlerta.tecnico.latitud), parseFloat($scope.objectDetalleAlerta.tecnico.longitud)));
            marketsDetalleAlerta.push(mDetalleTecnico);
        }else{
            mapaDetalleTecnico.setCenter(new google.maps.LatLng(19.4326, -99.1332));
            mapaDetalleTecnico.setZoom(5);
        }

    }

    $scope.limpiarMakerTecnicos = () => {
        marketsDetalleAlerta.map(e => { e.setMap(null); return e; });
        marketsDetalleAlerta = [];
    }

    $("#guardar-datos-cuenta").click(function () {
        if ($.trim($("#cuenta-form").val()) !== '') {

            let validacionCaracteres = $.trim($("#cuenta-form").val()).substr(0, 2);
            let validacionCaracteresNuevo = $.trim($("#cuenta-form").val()).substr(0, 2);
            if (validacionCaracteres === '02') {
            } else if (validacionCaracteresNuevo === '1.') {
            } else if (validacionCaracteresNuevo === '6.') {
            } else {
                mostrarMensajeWarning('Formato de folio no valido')
                return false;
            }
        }
        if (validarPrimerPasoBool()) {
            $(".tab-step-wizar:first").trigger('click')
        } else if (validarSegundoPasoBool()) {
            $(".tab-step-wizar:eq(1)").trigger('click')
        } else if (validarTercerPaso()) {
            $(".tab-step-wizar:eq(2)").trigger('click')
        }
        else {
            creacionAsignacionGenerica()

        }
    })

    let X = {
        "nombreOrden": "string",
        "tipoOrden": 0,
        "subTipoOrden": 0,
        "idunidadNegocio": 0,
        "idPropietario": 0,
        "flujo": 1,
        "geografia1": "string",
        "geografia2": "string",
        "folios": [{
            "folio": "string",
            "idFolio": "string",
            "idSistema": 0
        }],
        "cliente": {
            "idClaveCliente": "string",
            "nombre": "string",
            "apellidoPaterno": "string",
            "apellidoMaterno": "string",
            "razonSocial": "string",
            "telefonoCelular": "string",
            "telefonoFijo": "string",
            "telefonoOficina": "string",
            "correoElectronico": "string",
            "contactos": [{
                "nombre": "string",
                "telefono": 0,
                "parentesco": "string"
            }]
        },
        "agendamiento": {
            "fechaAgenda": "string",
            "idTurno": 0,
            "hora": "string",
            "comentarios": "string",
            "origen": "string",
            "confirmada": 0
        },
        "direccion": {
            "calle": "string",
            "numeroInterior": 0,
            "numeroExterior": 0,
            "colonia": "string",
            "municipio": "string",
            "ciudad": "string",
            "latitud": 0,
            "longitud": 0,
            "estado": "string",
            "codigoPostal": 0,
            "calleReferencia": "string",
            "entreCalles": "string",
            "pais": "string"
        },
        "informacionAdicional": [{
            "nombre": "string",
            "valor": "string"
        }]
    }

    $scope.validateLatitudLongitudCaracteres=function(latitudOrLongintud){
        let  regexLongitud=/[,'Â°`/;#_"$%*]/ 
        return regexLongitud.test(latitudOrLongintud)
    }
    
    $scope.isLatitude=function(lat) {
        return isFinite(lat) && Math.abs(lat) <= 90;
    }
    
    $scope.isLongitude=function(lng) {
        return isFinite(lng) && Math.abs(lng) <= 180;
    }

    $scope.validarLatitudLongitudMap=function(latitud, longitud){
        if( !latitud || !longitud){
            return true;
        }else{
            if( !$scope.isLatitude( latitud ) || !$scope.isLongitude( longitud ) ){
                return true;
            } else if($scope.validateLatitudLongitudCaracteres( longitud ) || $scope.validateLatitudLongitudCaracteres( longitud ) ){
                return true;
            }else if( isNaN( latitud ) || isNaN( longitud )){
                return true;
            }
        }   
        return false;
    }
    
    $scope.verMapaCambioDireccion = function(lat, long) {
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
    	     title:"Dirección de la OT",
    	     position: {
    	    	 lat:parseFloat(lat),
    	         lng: parseFloat(long) 
    	     }
    	 });
	}
    
    $scope.mostrarVistaModificarDireccion = function(lat, long) {
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
    	
        if(markerResMod !== undefined && markerResMod !== null){
        	markerResMod.setMap(null);
        	markerResMod = null;
		}
        
    	 markerResMod = new google.maps.Marker({
    		 map: mapaCambioDireccionOTMod,
    	     draggable: true,
    	     animation: google.maps.Animation.DROP,
    	     title:"Dirección de la OT",
    	     position: {
    	    	 lat:parseFloat(lat),
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
    	mapaCambioDireccionOTMod.addListener("bounds_changed", function() {
    		searchBox.setBounds(mapaCambioDireccionOTMod.getBounds());
    	});

    	searchBox.addListener("places_changed", function() {
    		var places = searchBox.getPlaces();
    	    
    	    if (places.length == 0) {
    	    	return;
    	    }
    	    
    	    markerResMod.setMap(null);
    	    markerResMod = null;

    	    var bounds = new google.maps.LatLngBounds();

    	    places.forEach(function(place) {
    	    	if (!place.geometry || !place.geometry.location) {
    	    		console.log("Returned place contains no geometry");
    	    		return;
    	    	}

    	    	markerResMod = new google.maps.Marker({
    	        	map: mapaCambioDireccionOTMod,
        	        draggable: true,
        	        animation: google.maps.Animation.DROP,
        	        title:"Dirección de la OT",
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
    	      
    	    	if(place.geometry.viewport) {
    	    		bounds.union(place.geometry.viewport);
    	    	}else{
    	    		bounds.extend(place.geometry.location);
    	    	}
    	    });
    	    mapaCambioDireccionOTMod.fitBounds(bounds);
    	});
	}

}
