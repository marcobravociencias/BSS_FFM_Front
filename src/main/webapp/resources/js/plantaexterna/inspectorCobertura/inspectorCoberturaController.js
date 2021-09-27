var app = angular.module('inspectorCoberturaApp', []);

app.controller('inspectorCoberturaController', ['$scope', '$q', 'inspectorCoberturaService', function ($scope, $q, inspectorCoberturaService) {

    let coberturaTable;
    let markers = [];
    $scope.filtrosCobertura = {};
    $scope.incidencias = [];
    $scope.listaIncidenciasLigar = [];


    $scope.init = function () {
        $('.drop-down-filters').on("click.bs.dropdown", function (e) {
            e.stopPropagation();
        });

        $("#content_mapa_estatus").toggleClass('closed');


        $("#content_mapa_estatus").click(function () {
            $(this).toggleClass('closed');
            if ($(this).hasClass('closed')) {
                $("#content-card-selected").hide();
            } else {
                $("#content-card-selected").show();
            }
        });

        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true
        });
        $('.datepicker').datepicker('update', new Date());

        document.getElementById('cluster').addEventListener('click', function () {
            //Validar al menos una incidencia
            $('#modalCluster').modal('show');
        });

        coberturaTable = $('#tableCobertura').DataTable({
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

        $("#modalCluster").on("hidden.bs.modal", function () {
            let selectedElm = $('#jstree-proton-3').jstree("get_selected", true);
            if (selectedElm.length == 1) {
                $('#texto_cluster_seleccionado').text(selectedElm[0].text);
            } else {
                $('#texto_cluster_seleccionado').text('Sin selecci\u00F3n');
            }
        });
    }


    $scope.init();

    $scope.initMapa = function () {
        map = new google.maps.Map(document.getElementById('mapaInspectorCobertura'), {
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
        markers = [];
    }

    $scope.initMapa();

    $scope.seleccionTodos = function (paramFiltroParent, banderaChecked) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = banderaChecked
            return e;
        })
    }

    $scope.consultarCatalogos = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.filtrosCobertura.fallas = arrayFallas.data.result;
        $scope.filtrosCobertura.listArbol = arrayFiltersPE.data.result.listArbolFilter;

        $scope.seleccionTodos($scope.filtrosCobertura.fallas, true);
        let geografia = $scope.filtrosCobertura.listArbol;
        geografia.map((e) => {
            e.parent = e.padre == undefined ? "#" : e.padre;
            e.text = e.descripcion;
            e.icon = "fa fa-globe";
            return e
        })
        $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
        }).jstree({
            'core': {
                'data': geografia,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons": false
                }
            }
        });
        swal.close();

        /*
        $q.all([
            inspectorCoberturaService.consultarFallasCoberturaPE(),
        ]).then(function (results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $scope.filtrosCobertura.fallas =  $scope.realizarConversionAnidado(results[0].data.result);
                    } else {
                        toastr.warning('No se encontraron datos de Fallas');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de Fallas');
            }
        });*/
    }

    $scope.consultarCatalogos();

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

    $scope.consultarCoberturas = function () {
        let errorMessage = "";
        let listFallas = [];

        if (!$scope.validarFecha("filtro_fecha_inicio_inspectorCobertura", "filtro_fecha_fin_inspectorCobertura")) {
            errorMessage += "<li>La fecha inicical debe ser menor a la fecha final</li>";
        }

        if (!$scope.filtrosCobertura.fallas) {
            errorMessage += "<li>Falla es obligatorio</li>";
        } else {
            let isSelectedOne = false;

            $.each($scope.filtrosCobertura.fallas, function (i, elemento) {
                if (elemento.checkedOpcion) {
                    listFallas.push(elemento.id);
                    isSelectedOne = true;
                }
            })
            if (!isSelectedOne) {
                errorMessage += "<li>Selecciona falla</li>";
            }
        }

        if (errorMessage == "") {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();

            $scope.initMapa();
            $scope.listaIncidenciasLigar = [];

            let params = {
                idFalla: listFallas,
                fechaInicio: $("#filtro_fecha_inicio_inspectorCobertura").val(),
                fechaFin: $("#filtro_fecha_fin_inspectorCobertura").val()
            }

            //inspectorCoberturaService.consultarIncidenciasCoberturaPE(params).then(function success(response) {
            let arrayRow = [];
            $scope.incidencias = arrayCobertura.data.result;
            if (coberturaTable) {
                coberturaTable.destroy();
            }

            $.each($scope.incidencias, function (i, elemento) {
                let row = [];
                row[0] = elemento.idIncidencia;
                row[1] = elemento.fecha;
                row[2] = elemento.reporta;
                row[3] = elemento.catIncidenteDet;
                row[4] = '<i class="fas fa-globe-americas" style="color:red; cursor:pointer" onclick="pintarUbicacion(' + elemento.idIncidencia + "," + elemento.latitud + "," + elemento.longitud + ",'" + elemento.reporta + "','" + elemento.catIncidenteDet + "','" + elemento.fecha + "'" + ')"></i>';
                arrayRow.push(row);
            })
            coberturaTable = $('#tableCobertura').DataTable({
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
            //})
        } else {
            toastr.warning(errorMessage);
        }

    }

    pintarUbicacion = function (id, latitud, longitud, reporta, falla, fecha) {
        let isMarker = false;
        let index = 0;
        $.each(markers, function (i, elemento) {
            if (elemento.id_marker == id) {
                index = i;
                isMarker = true;
                $('#tableCobertura tbody tr:contains("' + id + '")').css('background', '');
                elemento.setMap(null);
                return;
            }
        });

        if (!isMarker) {
            $scope.printMarker(id, latitud, longitud, reporta, falla, fecha);
        } else {
            markers.splice(index, 1);
            $.each(markers, function (i, elemento) {
                if (i == markers.length - 1) {
                    elemento.setAnimation(google.maps.Animation.BOUNCE);
                    map.setCenter(elemento.position);
                    map.setZoom(15);
                }
            });
            $.each($scope.listaIncidenciasLigar, function (i, elemento) {
                if (elemento.id == id) {
                    $scope.listaIncidenciasLigar.splice(i, 1);
                    $scope.$apply();
                    return;
                }
            });
        }
    }

    $scope.deleteMarker = function (id) {
        $.each(markers, function (i, elemento) {
            if (elemento.id_marker == id) {
                $('#tableCobertura tbody tr:contains("' + elemento.id_marker + '")').css('background', '');
                elemento.setMap(null);
                markers.splice(i, 1);
                $.each(markers, function (ix, elemento2) {
                    if (ix == markers.length - 1) {
                        elemento2.setAnimation(google.maps.Animation.BOUNCE);
                        map.setCenter(elemento2.position);
                        map.setZoom(15);
                        return;
                    }
                });
            }
        })
    }

    $scope.printMarker = function (id, latitud, longitud, reporta, falla, fecha) {
        $('#tableCobertura  tbody tr:contains("' + id + '")').css('background', '#e9f5f4');
        var contentString = '<div id="content"><div id="siteNotice"></div>' +
            '<h4 id="firstHeading" class="firstHeading"><span class="titleHeading">ID: </span>' + id + '</h4><hr>' +
            '<div id="bodyContent">' +
            '  <b><strong >Reporta:</strong></b>&nbsp;' + reporta +
            '  <br><br><b><strong >Falla:</strong></b>&nbsp;' + falla +
            '  <br><br><b><strong >Fecha:</strong></b>&nbsp;' + fecha +
            '  <br><br><b><strong >Latitud:</strong></b>&nbsp;' + latitud +
            '  <br><br><b><strong >Longitud:</strong></b>&nbsp;' + longitud +
            '  <br><br><button id="inc_' + id + '" class="agregarBtn btn-block btn btn-sm btn-outline-primary" onclick="agregarIncidencia(' + id + ",'" + reporta + "','" + falla + "','" + fecha + "'" + ')">Agregar</button></div></div>';

        var infowindows = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            id_marker: id,
            position: { lat: parseFloat(latitud), lng: parseFloat(longitud) },
            map: map,
            animation: google.maps.Animation.BOUNCE,
            title: reporta,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5.5,
                fillColor: "#fb0000",
                fillOpacity: 1,
                strokeWeight: 0.4
            },
            infowindow: infowindows,
            inc: id
        });
        marker.addListener('click', function () {
            infowindows.open(map, marker);
        });

        for (i = 0; i < markers.length; i++) {
            markers[i].setAnimation(google.maps.Animation.DROP);
        }

        markers.push(marker);
        map.setCenter(new google.maps.LatLng(latitud, longitud));
    }

    $scope.consultarCoberturas();

    $scope.ligarIncidencias = function () {

    }

    agregarIncidencia = function (id, reporta, falla, fecha) {
        $scope.listaIncidenciasLigar.push({ id: id, reporta: reporta, falla: falla, fecha: fecha });
        $("#inc_" + id).attr("disabled", true);
        $scope.$apply();
    }

    $scope.eliminarIncidencia = function (id) {
        $.each($scope.listaIncidenciasLigar, function (i, elemento) {
            if (elemento.id == id) {
                $scope.listaIncidenciasLigar.splice(i, 1);
                $scope.deleteMarker(id);
                return;
            }
        });
    }

}]);