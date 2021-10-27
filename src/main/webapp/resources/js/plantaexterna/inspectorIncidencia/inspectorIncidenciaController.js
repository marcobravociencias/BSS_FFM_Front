var app = angular.module('inspectorIncidenciaApp', []);

app.controller('inspectorIncidenciaController', ['$scope', '$q', 'inspectorIncidenciaService', function ($scope, $q, inspectorIncidenciaService) {

    $scope.filtrosInspector = {};
    $scope.incidencias = [];
    let incidenciaTable;
    $scope.latIncidencia = "";
    $scope.longIncidencia = "";
    $scope.detalleIncidencia = {};
    $scope.incidencia = {};
    let markers = [];
    $scope.isNavTab = false;
    $scope.isRecuperar = false;
    $scope.isGenerar = false;
    $scope.isDeclinar = false;
    $scope.isInitDeclinar = false;
    $scope.motivoDeclinar = {};

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    $scope.initInspectorIncidencia = function () {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true
        });
        $('.datepicker').datepicker('update', new Date());
    }
    $scope.initInspectorIncidencia();

    document.getElementById('cluster').addEventListener('click', function () {
        $('#modalCluster').modal('show');
    });


    $scope.initMapa = function () {
        mapInspector = new google.maps.Map(document.getElementById('mapaInspectorIncidencia'), {
            center: {
                lat: parseFloat(19.4326),
                lng: parseFloat(-99.1332)
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_TOP
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }, streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            mapTypeControl: true,
            zoom: 15,
            disableDoubleClickZoom: true
        });
    }
    $scope.initMapa();

    $scope.realizarConversionAnidado = function (array) {
        let arrayCopy = [];
        angular.forEach(array.filter(e => e.nivel == 1), function (elemento, index) {
            elemento.checkedOpcion = true;
            elemento.children = array.filter(e => e.nivel == 2 && e.idPadre == elemento.id)
            elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : []
            elemento.children.map(e => { e.checkedOpcion = true; return e; })
            arrayCopy.push(elemento)
        })
        return arrayCopy;
    }

    $scope.initCatalogos = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.filtrosInspector.fallas = arrayFallas.data.result;
        $scope.filtrosInspector.fallas.map(function (e) { e.checkedOpcion = true; return e; })
        $scope.filtrosInspector.statusFallas = arrayStatusFallas.data.result;
        $scope.filtrosInspector.statusFallas.map(function (e) { e.checkedOpcion = true; return e; })
        $scope.filtrosInspector.coloresStatus = arrayColoresStatus.data.result[3];
        $scope.filtrosInspector.clusterCopy = arrayFiltersPE.data.result;
        geografia = arrayFiltersPE.data.result.geografia;
        geografia.map((e) => {
            e.parent = e.padre == undefined ? "#" : e.padre;
            e.text = e.nombre;
            e.icon = "fa fa-globe";
            e.state = {
                opened: false,
                selected: true,
            }
            return e
        })
        $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
        }).jstree({
            'plugins': ["wholerow", "checkbox"],
            'core': {
                'data': geografia,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons": false
                }
            }
        });
        console.log("FILTROSSS***********");
        console.log($scope.filtrosInspector);
        console.log("********************");
        swal.close();
        incidenciaTable = $('#tableIncidencia').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": false,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

        });
    }
    $scope.initCatalogos();

    $scope.consultarCatalogosInspectorIncidencia = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $q.all([
            inspectorIncidenciaService.consultarFallasInspectorIncidencia(),
            inspectorIncidenciaService.consultarStatusFallasInspectorIncidencia(),
            inspectorIncidenciaService.systemColor(),
            // inspectorIncidenciaService.systemColor(),
        ]).then(function (results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $scope.filtrosInspector.fallas = $scope.realizarConversionAnidado(results[0].data.result);
                    } else {
                        toastr.warning('No se encontraron datos de Fallas');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de Fallas');
            }
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        $scope.filtrosInspector.statusFallas = $scope.realizarConversionAnidado(results[1].data.result);
                    } else {
                        toastr.warning('No se encontraron statusFallas');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de estatus fallas');
            }
            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        $scope.filtrosInspector.colorStatus = results[2].data.result[3]
                    } else {
                        toastr.warning('No se encontraron statusFallas');
                    }
                } else {
                    toastr.warning(results[2].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de estatus fallas');
            }
            if (results[3].data !== undefined) {
                if (results[3].data.respuesta) {
                    if (results[3].data.result) {
                        if (results[3].data.result.geografia) {
                            $scope.listadogeografiacopy = results[3].data.result.geografia
                            geografia = results[3].data.result.geografia
                            geografia.map((e) => {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: true,
                                }
                                return e
                            })
                            $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {

                            }).jstree({
                                'plugins': ["wholerow", "checkbox"],
                                'core': {
                                    'data': geografia,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons":false        
                                    }
                                }
                            });
                        } else {
                            swal.close();
                            toastr.warning('No se encontraron datos para la geografia');
                            $scope.banderaErrorGeografia = true;
                        }
                    } else {
                        swal.close();
                        toastr.warning('No se encontraron datos para la geografia');
                        $scope.banderaErrorGeografia = true;
                    }
                } else {
                    swal.close();
                    toastr.warning(results[1].data.resultDescripcion);
                    $scope.banderaErrorGeografia = true;
                }
            } else {
                swal.close();
                toastr.error('Ha ocurrido un error en la consulta de geografia')
                $scope.banderaErrorGeografia = true;;
            }
        }).catch(err => handleError(err));
    }

    $scope.seleccionTodos = function (paramFiltroParent, banderaChecked) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = banderaChecked
            return e;
        })
    }

    retornarFormatoSliders = function (falla, contador) {
        var imgs_blocks = "";
        var indicators_carousel = "";

        $.each(falla.Img.Detalleimagenes, function (index, img_ind) {
            indicators_carousel += ' <li class="' + ((index === 0) ? 'active' : '') + '" data-target="#carouselExampleIndicators' + contador + '" data-slide-to="' + index + '" ></li>';

            if (img_ind.URLImg === "") {
                imgs_blocks += '' +
                    '      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + ' ">' +
                    '        <img class="d-block img-fluid" style="width:100%; min-width: 100%; height: 100% !important;" src="' + context_project + '/img/generic/not_found.png" alt="First slide">' +
                    '      </div>';
            } else {
                imgs_blocks += '' +
                    '      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + '">' +
                    '        <img class="d-block img-fluid" style="width:100%; min-width: 100%; height: 100% !important;" class="d-block w-100" src="data:image/png;base64,' + img_ind.URLImg + '"" alt="First slide">' +
                    '      </div>';
            }

        });

        return '' +
            '  <div id="carouselExampleIndicators' + contador + '" class="carousel_componente carousel slide" data-ride="carousel">' +
            '    <ol class="carousel-indicators">' +
            '     	' + indicators_carousel + ' ' +
            '    </ol>' +
            '    <div class="carousel-inner" role="listbox">' +
            '			' + imgs_blocks + ' ' +
            '    </div>' +
            '    <a class="carousel-control-prev" href="#carouselExampleIndicators' + contador + '" role="button" data-slide="prev">' +
            '      <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
            '      <span class="sr-only">Previous</span>' +
            '    </a>' +
            '    <a class="carousel-control-next" href="#carouselExampleIndicators' + contador + '" role="button" data-slide="next">' +
            '      <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
            '      <span class="sr-only">Next</span>' +
            '    </a>' +
            '  </div>';
    }

    printIncidencia = function (falla, latitud, longitud) {
        return '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">Unidad Negocio</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + falla.IdUnidadNegocio + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">ID OT</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + falla.IdOT + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">Latitud</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + latitud + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">Longitud</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + longitud + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">Falla</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + falla.CatFalla + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">Detalle Falla</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + falla.CatFallaDetalle + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">Comentario</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + falla.Comentarios + '</span> </div>' +
            '</div>';
    }

    $scope.inicializarDetalleIncidencia = function (latitud, longitud) {
        $scope.detalleIncidencia = detalleIncidencia.data.result.Incidente;
        $("#container-declinarIncidencia").hide();
        $("#headers_tab").empty();
        $("#content_tabs").empty();
        $("#bodyFileDetallestatus tr").empty();
        var header_tabs = "";
        var content_tabs = "";
        $.each($scope.detalleIncidencia.Falla, function (i, falla) {
            if (falla.Img.Detalleimagenes !== undefined && falla.Img.Detalleimagenes.length > 0) {
                contenido_imagenes = retornarFormatoSliders(falla, i);
            } else {
                contenido_imagenes = '<h4 id="texto_not_arboles" style="color:#abafae; text-align:center">' +
                    '	SIN IMAGENES PARA ESTA FALLA' +
                    '</h4>';
            }
            header_tabs += '' +
                '<li class="nav-item">' +
                '<a class="nav-link ' + ((i === 0) ? "active" : "") + ' " id="header_tab_' + i + '" data-toggle="tab" href="#content_tab_' + i + '" role="tab" aria-controls="content_tab_' + i + '" aria-selected="true">Falla #' + (i + 1) + '</a>';
            '</li>';

            content_tabs += '' +
                '<div class="tab-pane row fade ' + ((i === 0) ? "show active " : "") + ' " id="content_tab_' + i + '" role="tabpanel" aria-labelledby="home-tab">' +
                '	<div class="row">' +
                '		<div class="col-8">' +
                '			' + printIncidencia(falla, latitud, longitud) + ' ' +
                '		</div>' +
                '		<div class="col-4">' +
                '			' + contenido_imagenes + '	' +
                '		</div>' +
                '	</div>' +
                '</div>';
        });
        $("#headers_tab").append(header_tabs);
        $("#content_tabs").append(content_tabs);

        console.log($scope.detalleIncidencia);
        if ($scope.detalleIncidencia.DetalleStatus.length == 0) {
            $scope.isNavTab = true;
            $("#bodyFileDetallestatus").append('<tr><td class="sin_datos" colspan="10" style="text-align:center;">Sin datos para mostrar</td></tr>')
        } else {
            $scope.isNavTab = true;
            var body = $("#bodyFileDetallestatus");
            body.html('');
            let contBody = '';
            $.each($scope.detalleIncidencia.DetalleStatus, function (index, element) {
                contBody += ''
                    + '<tr>'
                    + '<td>' + element.NumEmpleado + '</td>'
                    + '<td>' + element.Empleado + '</td>'
                    + '<td>' + element.Motivo + '</td>'
                    + '<td>' + element.Fecha + '</td>'
                    + '<td>' + element.Comentario + '</td>'
                    + '<td><i class="fa fa-download style_icono_ajaxDownloadFile" onclick=" (\'' + element.NombreArchivo + '\', \'' + $('#idincidenciaI').val() + '\')"></i></td>'
                    + '<td class="head_center"></td>  '
                    + '</tr>';
            });
            body.html(contBody);
        }
    }

    consultarDetalleIncidencia = function (idIncidencia, reporta, numeroEmpleado, descripcion, cluster, latitud, longitud, idFalla, detalleFalla, idCluster, idStatus, statusFalla) {
        $scope.incidencia.idIncidencia = idIncidencia;
        $scope.incidencia.reporta = reporta;
        $scope.incidencia.numeroEmpleado = numeroEmpleado;
        $scope.incidencia.descripcion = descripcion;
        $scope.incidencia.cluster = cluster;
        $scope.incidencia.latitud = latitud;
        $scope.incidencia.longitud = longitud;
        $scope.incidencia.idFalla = idFalla;
        $scope.incidencia.detalleFalla = detalleFalla;
        $scope.incidencia.idCluster = idCluster;
        $scope.incidencia.idStatus = idStatus;
        $scope.incidencia.statusFalla = statusFalla;
        $scope.isInitDeclinar = false;
        console.log($scope.incidencia);
        let params = {

        }
        inspectorIncidenciaService.consultarDetalleIncidenciaInspectorPE(params).then(function success(response) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            $scope.inicializarDetalleIncidencia(latitud, longitud);

            console.log($scope.incidencia.idStatus);
            // NUEVA
            if ($scope.incidencia.idStatus == '1') {
                $scope.isNavTab = false;
                $scope.isRecuperar = false;
                $scope.isGenerar = true;
                $scope.isDeclinar = true;
                $("#containerModal").removeClass('col-10');
                $("#containerModal").addClass('col-12');
                $("#container-detalleIncidencia").show();
                $("#container-declinarIncidencia").hide();
                $("#containerFallas").show();
                $("#containerStatusFallas").hide();
            }

            // DECLINADA
            if ($scope.incidencia.idStatus == '2') {
                $scope.isNavTab = true;
                $scope.isRecuperar = true;
                $scope.isGenerar = false;
                $scope.isDeclinar = false;
                $("#containerModal").removeClass('col-12');
                $("#containerModal").addClass('col-10');
                $("#informacion-incidencia").addClass('active');
                $("#detalle-status").removeClass('active');
                $("#container-detalleIncidencia").show();
                $("#container-declinarIncidencia").hide();
                $("#containerFallas").show();
            }

            // GENERADA
            if ($scope.incidencia.idStatus == '3') {
                $scope.isNavTab = false;
                $scope.isRecuperar = false;
                $scope.isGenerar = false;
                $scope.isDeclinar = false;
                $("#containerModal").removeClass('col-10');
                $("#containerModal").addClass('col-12');
                $("#container-detalleIncidencia").show();
                $("#container-declinarIncidencia").hide();
                $("#containerFallas").show();
                $("#containerStatusFallas").hide();
            }

            // RECUPERADA
            if ($scope.incidencia.idStatus == '4') {
                $scope.isNavTab = false;
                $scope.isRecuperar = false;
                $scope.isGenerar = true;
                $scope.isDeclinar = true;
                $("#containerModal").removeClass('col-10');
                $("#containerModal").addClass('col-12');
                $("#container-detalleIncidencia").show();
                $("#container-declinarIncidencia").hide();
                $("#containerFallas").show();
                $("#containerStatusFallas").hide();
            }

            // ATENDIDA
            if ($scope.incidencia.idStatus == '5') {
                $scope.isNavTab = true;
                $scope.isRecuperar = true;
                $scope.isGenerar = false;
                $scope.isDeclinar = false;
                $("#containerModal").removeClass('col-12');
                $("#containerModal").addClass('col-10');
                $("#container-detalleIncidencia").show();
                $("#container-declinarIncidencia").hide();
                $("#informacion-incidencia").addClass('active')
                $("#detalle-status").removeClass('active')
                $("#containerFallas").show()
            }

            $("#modalDetalleIncidencia").modal('show');
            $("#container-declinarIncidencia").hide();
            swal.close();
        })
    }

    cargarDetalle = function (idIncidencia) {
        $("#detalleIncidencia" + idIncidencia).trigger('click');
    }

    pintarUbicacionIncidencia = function (idIncidencia, latIncidencia, longIncidencia, descripcion, reporta, fecha, color) {
        let isUbicacion = false;
        let index = 0;

        $.each(markers, function (i, elemento) {
            if (elemento.id_incidencia == idIncidencia) {
                index = i;
                $('#tableIncidencia  tbody tr:contains("' + idIncidencia + '")').css('background', '');
                elemento.setMap(null);
                isUbicacion = true;
                return;
            }
        });

        if (!isUbicacion) {
            $scope.pintarUbicacion(idIncidencia, latIncidencia, longIncidencia, descripcion, reporta, fecha, color);
        } else {
            markers.splice(index, 1);
            $.each(markers, function (i, elemento) {
                if (i == markers.length - 1) {
                    mapInspector.setCenter(elemento.position);
                    mapInspector.setZoom(15);
                }
            });
        }
    }


    $scope.pintarUbicacion = function (idIncidencia, latIncidencia, longIncidencia, descripcion, reporta, fecha, color) {
        $('#tableIncidencia  tbody tr:contains("' + idIncidencia + '")').css('background', '#d3d3d3');
        var myLatlng = new google.maps.LatLng(latIncidencia, longIncidencia);
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h4 id="firstHeading" class="firstHeading"></h4>' +
            '<div id="bodyContent">' +
            '  <b><strong style="color:#014c8c;">Reporta:</strong></b>&nbsp;' + reporta + '<br>' +
            '  <br><b><strong style="color:#014c8c;">Falla:</strong></b>&nbsp;' + descripcion +
            '  <br><br><b><strong style="color:#014c8c;">Fecha:</strong></b>&nbsp;' + fecha +
            '  <br><br><b><strong style="color:#014c8c;">Latitud:</strong></b>&nbsp;' + latIncidencia +
            '  <br><br><b><strong style="color:#014c8c;">Longitud:</strong></b>&nbsp;' + longIncidencia +
            '  <br><br><button onclick="cargarDetalle(' + idIncidencia + ')" class="btn-block btn btn-sm btn-outline-primary">Detalle</button>' +
            '   </div>' +
            '</div>';
        var infowindows = new google.maps.InfoWindow({
            content: contentString
        });
        mapInspector.setCenter(new google.maps.LatLng(latIncidencia, longIncidencia));
        mapInspector.setZoom(15);
        marker = new google.maps.Marker({
            id_incidencia: idIncidencia,
            title: reporta,
            map: mapInspector,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: myLatlng,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5.5,
                fillColor: color,
                fillOpacity: 1,
                strokeWeight: 0.4
            },
            infowindow: infowindows,
        });
        marker.addListener('click', function () {
            infowindows.open(mapInspector, marker);
        });
        markers.push(marker);

    }

    $scope.validarFecha = function (idFechaInicio, idFechaFin) {
        var inicio = document.getElementById(idFechaInicio).value.split('/');
        var fin = document.getElementById(idFechaFin).value.split('/');
        var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
        var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
        if (date_inicio <= date_fin) {
            return true;
        } else {
            return false;
        }
    }

    // $scope.descargarReporteDetalle = function (nombreArchivo, urlArchivo) {
    //     swal({ text: 'Descargando Archivo ...', allowOutsideClick: false });
    //     swal.showLoading();
    //     var link = document.createElement("a");
    //     link.download = "";
    //     link.href = "/" + path + "/inspector/downloadFileInspector?paramsCambioStatus.NombreArchivo=" + nombreArchivo + "&paramsCambioStatus.UrlArchivo=" + urlArchivo;
    //     link.click();
    //     setTimeout(function () { swal.close() }, 2500);
    // }

    $("#file").change(function () {
        if ($('#file').get(0).files[0] === undefined) {
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
        } else {
            $(".text_select").text($('#file').get(0).files[0].name);
            $(".box__dragndrop").empty()
        }
    });

    $scope.limpiarArchivo = function () {
        $(".text_select").text("Selecciona un archivo");
        $(".ocultar_results").trigger('click');
        $(".box__dragndrop").text("o arrastra aqu\u00ED");

        if ($('#uploadForm').get(0) !== undefined) {
            $('#uploadForm').get(0).reset();//Elimina archivos seleccionados 
        }
    }

    $scope.initDeclinarIncidencia = function () {
        $scope.limpiarArchivo();
        $scope.isInitDeclinar = true;
        $scope.isRecuperar = false;
        $scope.isGenerar = false;
        $scope.isDeclinar = false;
        let params = {};
        $('#select-motivo-rechazar').val("") 
        $('#select-motivo-rechazar').val() === undefined || $('#select-motivo-rechazar').val() === ""
        $("#container-detalleIncidencia").hide();
        $("#container-declinarIncidencia").show();
        inspectorIncidenciaService.consultarCatalogoRechazoIncidenciaInspectorPE(params).then(function success(response) {
            $scope.listadoCatalogoRechazo = arrayCatalogoRechazo.data.result;
        });
    }

    $scope.cancelarDeclinar = function () {
        $scope.isInitDeclinar = false;
        $scope.isRecuperar = false;
        $scope.isGenerar = true;
        $scope.isDeclinar = true;
        $('#select-motivo-rechazar').val("") 
        $("#container-detalleIncidencia").show();
        $("#container-declinarIncidencia").hide();
    }

    $scope.declinarIncidencia = function (motivoRechazo) {
        $scope.motivoDeclinar = motivoRechazo;
        let mensajeError = "";
        if (!$scope.motivoDeclinar || motivoRechazo === undefined) {
            mensajeError += "<li> Ingresa los campos requeridos </li>"
        }
        if (document.querySelector('#file').files[0] === undefined) {
            mensajeError += "<li>Ingrese un archivo</li>"
        }
        if ($('#select-motivo-rechazar').val() === undefined || $('#select-motivo-rechazar').val() === "" || !$scope.motivoDeclinar.motivo) {
            mensajeError += "<li>Seleccione un motivo</li>"
        }
        if ($('#comentariosRechazoPI').val() === undefined || $('#comentariosRechazoPI').val() === "") {
            mensajeError += "<li>Ingrese un comentario</li>"
        }
        if (mensajeError == '') {
            swal({
                title: " Descartar\u00E1s la incidencia " + $scope.incidencia.idIncidencia + " ",
                showCancelButton: true,
                type: 'warning',
                reverseButtons: true,
                cancelButtonColor: '#A39F9F',
                confirmButtonColor: '#1265EE',
                cancelButtonText: "Cancelar",
                confirmButtonText: 'Confirmar',
            }).then(function () {
                var myFile = document.querySelector('#file').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                reader.onload = function () {
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    let params = {
                        // idIncidencia: $scope.incidencia.idIncidencia,
                        // status: '2',
                        // idDespacho: '',
                        // idComentario: $scope.motivoDeclinar.comentario,
                        // nombreArchivo: document.querySelector('#file').files[0].name,
                        // urlArchivo: reader.result,
                        // idMotivo: $scope.motivoDeclinar.motivo,
                        // propietario: ''
                    }
                    inspectorIncidenciaService.cambiarStatusIncidenciaInspectorPE(params).then(function success(response) {
                        $('#modalDetalleIncidencia').modal('toggle');
                        swal.close();
                        toastr.success("Incidencia declinada con exito");
                    })
                };
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.recuperarIncidencia = function () {
        swal({
            title: " Recuperar\u00E1s la incidencia "+$scope.incidencia.idIncidencia+" ",
			text: "Comentarios:",
            type: "warning",
            input: "textarea",
            reverseButtons: true,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'S\u00ED, recuperar',
			cancelButtonText:"Cancelar",
        }).then(function (comentarioRecuperar) {
            if (comentarioRecuperar == '') {
                toastr.warning('Para recuperar la incidencia debe de ingresar un comentario');
            } else {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                let params = {
                    // idIncidencias: $scope.incidencia.idIncidencia,
                    // idComentario: comentarioRecuperar,
                    // status: '4',
                    // IdDespacho: '',
                    // Propietario: '',
                }
                inspectorIncidenciaService.cambiarStatusIncidenciaInspectorPE(params).then(function success(response) {
                    $('#modalDetalleIncidencia').modal('toggle');
                    swal.close();
                    toastr.success("Incidencia recuperada con exito");
                });
            }
        }).catch(err => {
            toastr.warning('Operaci&oacute;n cancelada');
        });
    }

    $scope.generarOTIncidencia = function () {
        $('.swal2-container.swal2-shown ').css('background-color', '#fff');  
        swal({
            title: " Generar\u00E1s la incidencia " + $scope.incidencia.idIncidencia + " como OT",
            showCancelButton: true,
            type: 'warning',
            text: "Comentarios:",
            type: "warning",
            input: "textarea",
            reverseButtons: true,
            cancelButtonColor: '#A39F9F',
            confirmButtonColor: '#1265EE',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Confirmar',
        }).then(function (comentarioGenerar) {
            if (comentarioGenerar == '') {
                toastr.warning('Para generar la incidencia como OT debe de ingresar un comentario');
            } else {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                let params = {
                    // idIncidencias: $scope.incidencia.idIncidencia,
                    // idComentario: comentarioGenerar,
                    // status: '4',
                    // IdDespacho: '',
                    // Propietario: '',
                }
                inspectorIncidenciaService.cambiarStatusIncidenciaInspectorPE(params).then(function success(response) {
                    $('#modalDetalleIncidencia').modal('toggle');
                    swal.close();
                    toastr.success("Incidencia recuperada con exito");
                });
            }
        }).catch(err => {
            toastr.warning('Operaci&oacute;n cancelada');
        });
    }

    $scope.consultarIndicencias = function () {
        let mensajeError = '';
        if (!$scope.validarFecha("filtro_fecha_inicio_inspectorincidencia", "filtro_fecha_fin_inspectorincidencia")) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
        }

        let isSelectedOne = false;
        $.each($scope.filtrosInspector.fallas, function (i, elemento) {
            if (elemento.checkedOpcion) {
                isSelectedOne = true;
                return;
            }
        })
        if (!isSelectedOne) {
            mensajeError += "<li>Selecciona al menos una falla</li>";
        }

        let isSelectedOneStatus = false;
        $.each($scope.filtrosInspector.statusFallas, function (i, elemento) {
            if (elemento.checkedOpcion) {
                isSelectedOneStatus = true;
                return;
            }
        })
        if (!isSelectedOneStatus) {
            mensajeError += "<li>Selecciona al menos un estatus de falla</li>";
        }

        if (mensajeError == '') {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            if (incidenciaTable) {
                incidenciaTable.destroy();
            }
            $scope.initMapa();
            let params = {

            }
            inspectorIncidenciaService.consultarIncidenciasInspectorPE(params).then(function success(response) {
                let arrayRow = [];
                $scope.incidencias = arrayIncidenciasInspector.data.result.Incidencias.Info_Incidencias;
                console.log($scope.incidencias);
                $.each($scope.incidencias, function (i, elemento) {
                    let row = [];
                    row[0] = elemento.IdIncidencia;
                    row[1] = elemento.Fecha;
                    row[2] = elemento.Cluster;
                    row[3] = elemento.CatIncidenteDet;
                    row[4] = '<a class="" id="detalleIncidencia' + elemento.IdIncidencia + '" onclick="consultarDetalleIncidencia (' + elemento.IdIncidencia + ",'" + elemento.Reporta + "','" + elemento.NumeroEmpleado + "','" + elemento.CatIncidenteDet + "','" + elemento.Cluster + "'," + elemento.Latitud + "," + elemento.Longitud + "," + elemento.IdIncidencia + ",'" + elemento.CatIncidenteDet + "','" + elemento.IdCluster + "','" + elemento.ID_Status + "','" + elemento.Status + "','" + elemento.Ot + "'" + ');">' +
                        '<i class="far fa-window-restore"></i>' +
                        '</a>';
                    row[5] = '<i class="fas fa-globe-americas" style="color:' + elemento.Color + '; cursor: pointer;" onclick="pintarUbicacionIncidencia(' + elemento.IdIncidencia + ',' + elemento.Latitud + ',' + elemento.Longitud + ",'" + elemento.CatIncidenteDet + "','" + elemento.Reporta + "','" + elemento.Fecha + "','" + elemento.Color + "'" + ')"></i>'
                        ;
                    arrayRow.push(row);
                })
                incidenciaTable = $('#tableIncidencia').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": false,
                    "pageLength": 10,
                    "info": false,
                    "data": arrayRow,
                    "language": idioma_espanol_not_font,
                    "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">'
                });
                swal.close();
            })
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $("#informacion-incidencia").click(function () {
        $("#informacion-incidencia").addClass('active');
        $("#detalle-status").removeClass('active');
        $("#containerFallas").show();
        $("#containerStatusFallas").hide();
        $("#container-declinarIncidencia").hide();
    })

    $("#detalle-status").click(function () {
        $("#informacion-incidencia").removeClass('active');
        $("#detalle-status").addClass('active');
        $("#containerFallas").hide();
        $("#containerStatusFallas").show();
        $("#container-declinarIncidencia").hide();
    })

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
        $("#moduloInspectorIncidenciasPE").addClass('active');
    });
}]);