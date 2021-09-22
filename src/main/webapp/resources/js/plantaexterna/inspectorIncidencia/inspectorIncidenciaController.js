var app = angular.module('inspectorIncidenciaApp', []);

app.controller('inspectorIncidenciaController', ['$scope', '$q', 'inspectorIncidenciaService', function ($scope, $q, inspectorIncidenciaService) {

    $scope.filtrosInspector = {};
    $scope.incidencias = [];
    let incidenciaTable;
    $scope.latIncidencia = "";
    $scope.longIncidencia = "";
    $scope.detalleIncidencia = {};
    $scope.incidencia = {};

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
        map = new google.maps.Map(document.getElementById('mapaInspectorIncidencia'), {
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

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {
        }
    });
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
                                        "icons": false
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

    printIncidencia = function (falla) {
        let detalleTab = "";
        detalleTab = '' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">OT</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">kjdnfkjsd</span> </div>' +
            '</div>'
        return detalleTab;
    }

    $scope.inicializarDetalleIncidencia = function () {
        $scope.detalleIncidencia = detalleIncidencia.data.result.Incidente;
        $("#headers_tab").empty();
        $("#content_tabs").empty();
        let header_tabs = "";
        let content_tabs = "";
        $.each($scope.detalleIncidencia.Falla, function (i, falla) {
            header_tabs += '' +
                '<li class="nav-link ' + ((i === 0) ? "active" : "") + ' " id="header_tab_' + i + '" data-toggle="tab" href="#content_tab_' + i + '" role="tab" aria-controls="content_tab_' + i + '" aria-selected="true">Falla #' + (i + 1);
            '</li>';

            content_tabs += '' +
                '<div class="row">' +
                '   <div class="tab-pane fade ' + ((i === 0) ? "show active " : "") + ' " id="content_tab_' + i + '">' +
                '		<div class="col-md-6" >' +
                '		    ' + printIncidencia(falla) + ' ' +
                '	    </div>' +
                '   </div>' +
                '</div>';
        });
        $("#headers_tab").append(header_tabs);
        $("#content_tabs").append(content_tabs);
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
        console.log($scope.incidencia);
        let params = {

        }
        // inspectorIncidenciaService.consultarDetalleEvidencia(params).then(function success(response){
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        console.log("Ingresa a consulta");
        $scope.inicializarDetalleIncidencia();

        // NUEVA
        if ($scope.incidencia.idStatus == '1') { }

        // DECLINADA
        if ($scope.incidencia.idStatus == '2') { }

        // GENERADA
        if ($scope.incidencia.idStatus == '3') { }

        // RECUPERADA
        if ($scope.incidencia.idStatus == '4') { }

        // ATENDIDA
        if ($scope.incidencia.idStatus == '5') { }

        $("#modalDetalleIncidencia").modal('show');
        $scope.$apply();
        console.log($scope.detalleIncidencia);
        swal.close();
        // })
    }

    pintarUbicacionIncidencia = function (idIncidencia, latIncidencia, longIncidencia, color) {
        $('#tableIncidencia tbody tr').css('background', '');
        $('#tableIncidencia  tbody tr:contains("' + idIncidencia + '")').css('background', '#d3d3d3');
        marker.setPosition(new google.maps.LatLng(latIncidencia, longIncidencia));
        marker.setAnimation(google.maps.Animation.BOUNCE);
        marker.setIcon(color);
        map.setCenter(new google.maps.LatLng(latIncidencia, longIncidencia));
        
    }

    $scope.consultarIndicencias = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        if (incidenciaTable) {
            incidenciaTable.destroy();
        }
        $scope.initMapa();
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {}
        });
        let params={

        }
        inspectorIncidenciaService.consultarIncidenciasInspectorPE(params).then(function success(response) {
            let arrayRow = [];
            $scope.incidencias = arrayIncidenciasInspector.data.result.Incidencias.Info_Incidencias;
            $.each($scope.incidencias, function (i, elemento) {
                let row = [];
                row[0] = elemento.IdIncidencia;
                row[1] = elemento.Fecha;
                row[2] = elemento.Cluster;
                row[3] = elemento.CatIncidenteDet;
                row[4] = '<a class="" id="navbarDropdownMenuLink" onclick="consultarDetalleIncidencia (\'' + elemento.IdIncidencia + '\',\'' + elemento.Reporta + '\',\'' + elemento.NumeroEmpleado + '\',\'' + elemento.CatIncidenteDet + '\',\'' + elemento.Cluster + '\',\'' + elemento.Latitud + '\',\'' + elemento.Longitud + '\',\'' + elemento.IdIncidencia + '\',\'' + elemento.CatIncidenteDet + '\',\'' + elemento.IdCluster + '\',\'' + elemento.ID_Status + '\',\'' + elemento.Status + '\',\'' + elemento.Ot + '\');">' +
                    '<i class="far fa-window-restore"></i>' +
                    '</a>';
                row[5] = '<i class="fas fa-globe-americas" style="color:' + elemento.Color + '" onclick="pintarUbicacionIncidencia(' + elemento.IdIncidencia + "," + elemento.Latitud + "," + elemento.Longitud + "," + elemento.color + ')"></i>';
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
    }
}]);