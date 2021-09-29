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

        $("#content_mapa").toggleClass('closed');


        $("#content_mapa").click(function () {
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
            $("#content_mapa").click();
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
    }

    $scope.initMapa();

    $scope.seleccionTodos = function (paramFiltroParent, banderaChecked) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = banderaChecked;
            return e;
        })
    }

    $scope.consultarCatalogos = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();

        $scope.filtrosCobertura.fallas = arrayFallas.data.result;
        $scope.filtrosCobertura.listArbol = arrayFiltersPE.data.result.listArbolFilter;

        $scope.seleccionTodos($scope.filtrosCobertura.fallas, true);
        $scope.loadTree();
        swal.close();

        /*
        $q.all([
            inspectorCoberturaService.consultarFallasCoberturaPE(),
            inspectorCoberturaService.consultarFintrosCoberturaPE(),
        ]).then(function (results) {
            swal.close();
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $scope.filtrosCobertura.fallas =  results[0].data.result;
                        $scope.seleccionTodos($scope.filtrosCobertura.fallas, true);
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
                        $scope.filtrosCobertura.listArbol =  results[1].data.result;
                        $scope.loadTree();
                    } else {
                        toastr.warning('No se encontraron datos');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta general');
            }
        });*/
    }

    $scope.loadTree = function () {
        let geografia = angular.copy($scope.filtrosCobertura.listArbol);
        geografia.map((e) => {
            e.parent = e.padre == undefined ? "#" : e.padre;
            e.text = e.descripcion;
            e.icon = "fa fa-globe";
            e.state = {
                opened: false,
                selected: false,
            }
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
        $('#texto_cluster_seleccionado').text('Sin selecci\u00F3n');
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

    $scope.validarBusqueda = function () {
        let errorMessage = "";

        if (!$scope.validarFecha("filtro_fecha_inicio_inspectorCobertura", "filtro_fecha_fin_inspectorCobertura")) {
            errorMessage += "<li>La fecha inicical debe ser menor a la fecha final</li>";
        }

        if (!$scope.filtrosCobertura.fallas) {
            errorMessage += "<li>Falla es obligatorio</li>";
        } else {
            let isSelectedOne = false;

            $.each($scope.filtrosCobertura.fallas, function (i, elemento) {
                if (elemento.checkedOpcion) {
                    isSelectedOne = true;
                    return false;
                }
            })
            if (!isSelectedOne) {
                errorMessage += "<li>Selecciona falla</li>";
            }
        }
        if (errorMessage !== "") {
            toastr.warning(errorMessage);
            return false;
        } else {
            return true;
        }

    }

    $scope.consultarCoberturas = function () {
        let listFallas = [];

        if ($scope.validarBusqueda()) {
            $.each($scope.filtrosCobertura.fallas, function (i, elemento) {
                if (elemento.checkedOpcion) {
                    listFallas.push(elemento.id);
                }
            })

            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();


            $.each(markers, function (i, elemento) {
                $('#tableCobertura tbody tr:contains("' + elemento.id_marker + '")').css('background', '');
                elemento.setMap(null);
            });
            markers = [];
            map.setCenter({ lat: parseFloat(19.4326), lng: parseFloat(-99.1332) });
            map.setZoom(15);

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
                return false;
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
                    return false;
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
                        return false;
                    }
                });
            }
        })
    }

    $scope.printMarker = function (id, latitud, longitud, reporta, falla, fecha) {
        $('#tableCobertura  tbody tr:contains("' + id + '")').css('background', '#d3d3d3');
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

    //$scope.consultarCoberturas();

    $scope.ligarIncidencias = function () {
        $("#content_mapa").click();
        if (!$scope.listaIncidenciasLigar.length) {
            toastr.warning('Selecciona al menos una incidencia');
            return false;
        }

        let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
        let clustersparam = $("#jstree-proton-3").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id))

        if (clustersparam.length == 0) {
            toastr.warning('Selecciona cluster valido');
            return false;
        }

        let selectedElm = $('#jstree-proton-3').jstree("get_selected", true);
        swal({
            title: "Ligar incidencia(s) al cluster " + selectedElm[0].text,
            text: "Comentarios:",
            type: "warning",
            input: "textarea",
            inputPlaceholder: "Comentarios",
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: 'Si, ligar incidencia(s)',
            cancelButtonText: 'Cancelar'
        }).then(function (response) {
            if (response.length) {
                $("#content_mapa").click();
                $scope.consultarCoberturas();
                $('#jstree-proton-3').jstree("destroy");
                $scope.$apply();
                $scope.loadTree();
                toastr.success('Operaci&oacute;n exitosa');
            } else {
                toastr.warning('El comentario es obligatorio para ligar incidencias');
            }

        }).catch(err => {
            toastr.warning('Operaci&oacute;n cancelada');
        });


    }

    agregarIncidencia = function (id, reporta, falla, fecha) {
        $scope.listaIncidenciasLigar.push({ id: id, reporta: reporta, falla: falla, fecha: fecha });
        $("#inc_" + id).attr("disabled", true);
        $scope.$apply();
    }

    $scope.eliminarIncidencia = function (id) {
        $("#content_mapa").click();
        $.each($scope.listaIncidenciasLigar, function (i, elemento) {
            if (elemento.id == id) {
                $scope.listaIncidenciasLigar.splice(i, 1);
                $scope.deleteMarker(id);
                return false;
            }
        });
    }

    function compareGeneric(a, b) {
        let niveluno = a.nivel;
        let niveldos = b.nivel;
        if (niveluno > niveldos) {
            return -1
        } else if (niveluno < niveldos) {
            return 1
        }
        return 0
    }

    $scope.obtenerNivelUltimoJerarquia = function () {
        return $scope.filtrosCobertura.listArbol.sort(compareGeneric)[0].nivel
    }

    $scope.downloadExcelReportFile = function () {
        const data = JSON.parse(JSON.stringify($scope.incidencias));
        const fileName = 'Reporte incidencias cobertura';
        const exportType = 'xls';
        window.exportFromJSON({ data, fileName, exportType });

        /*
        let params = {
                idFalla: listFallas,
                fechaInicio: $("#filtro_fecha_inicio_inspectorCobertura").val(),
                fechaFin: $("#filtro_fecha_fin_inspectorCobertura").val()          
        }
        swal({ text: 'Cargando registros...', allowOutsideClick: false });
        swal.showLoading();
        //inspectorCoberturaService.consultarIncidenciasCoberturaPE(params).then(function success(response) {
            swal.close()
            if (result.data.respuesta) {
                const data = JSON.parse(result.data.result)
                const fileName = 'Reporte incidencias cobertura'
                const exportType = 'xls'
    
                window.exportFromJSON({ data, fileName, exportType })
            } else {
                mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
            }
           
        }).catch(err => handleError(err));
        */
    }

}]);