var app = angular.module('inspectorCoberturaApp', []);

app.controller('inspectorCoberturaController', ['$scope', '$q', 'inspectorCoberturaService', 'genericService', function ($scope, $q, inspectorCoberturaService, genericService) {

    let coberturaTable;
    let markers = [];
    $scope.filtrosCobertura = {};
    $scope.incidencias = [];
    $scope.listaIncidenciasLigar = [];


    $scope.initInspectorCobertura = function () {
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

        document.getElementById('jstree-proton-3').addEventListener('click', function () {
            $("#content_mapa").click();
        });

        coberturaTable = $('#tableCobertura').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
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


    $scope.initInspectorCobertura();

    $scope.initMapaInspectorCobertura = function () {
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

    $scope.initMapaInspectorCobertura();

    $scope.seleccionTodos = function (paramFiltroParent, banderaChecked) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = banderaChecked;
            return e;
        })
    }

    $scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
        return list.sort(compareGeneric)[0].nivel
    }

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

    $scope.consultarCatalogosInspectorCobertura = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();

        $scope.filtrosCobertura.fallas = arrayFallas.data.result;
        // $scope.filtrosCobertura.listArbol = arrayFiltersPE.data.result.listArbolFilter;

        $scope.seleccionTodos($scope.filtrosCobertura.fallas, true);
        // $scope.loadTree();
        // swal.close();
        $q.all([
            inspectorCoberturaService.consultarConfiguracionDespacho({ "moduloAccionesUsuario": "moduloInspectorCoberturasPE" }),
            // genericService.consultarCatalogoEstatusDespachoPI(),
            inspectorCoberturaService.consultaCatalogoGeografia(),
        ]).then(function (results) {
            console.log(results)
            swal.close();
            let resultConf = results[0].data.result;
            if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;

                $scope.nfiltrogeografia = llavesResult.N_FILTRO_GEOGRAFIA;
                $scope.nfiltrofallas = llavesResult.N_FILTRO_FALLA;
                validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
            }
            // if (results[1].data !== undefined) {
            //     if (results[1].data.respuesta) {
            //         if (results[1].data.result) {
            //             $scope.filtrosCobertura.fallas = results[1].data.result;
            //             $scope.seleccionTodos($scope.filtrosCobertura.fallas, true);
            //         } else {
            //             toastr.warning('No se encontraron datos de Fallas');
            //         }
            //     } else {
            //         toastr.warning(results[0].data.resultDescripcion);
            //     }
            // } else {
            //     toastr.error('Ha ocurrido un error en la consulta de Fallas');
            // }

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        if (results[1].data.result.geografia) {
                            $scope.listadogeografiacopy = results[1].data.result.geografia;
                            $scope.nfiltrogeografia = $scope.nfiltrogeografia ? $scope.nfiltrogeografia : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
                            $scope.filtrosCobertura.listArbol = results[1].data.result.geografia.filter(e => e.nivel <= parseInt($scope.nfiltrogeografia));
                           $scope.loadTree()
                        } else {
                            mostrarMensajeWarningValidacion('<li>No se encontraron datos para la geograf&iacute;a</li>Va');
                            $scope.banderaErrorGeografia = true;
                            swal.close();
                        }
                    } else {
                        mostrarMensajeWarningValidacion('<li>No se encontraron datos para la geograf&iacute;a</li>');
                        $scope.banderaErrorGeografia = true;
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarningValidacion('<li>' + results[1].data.resultDescripcion + '</li>');
                    $scope.banderaErrorGeografia = true;
                    swal.close();
                }
            } else {
                mostrarMensajeWarningValidacion('<li>Ha ocurrido un error en la consulta de geograf&iacute;a</li>');
                $scope.banderaErrorGeografia = true;
                swal.close();
            }
        });
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

    $scope.consultarCatalogosInspectorCobertura();

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

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        if (fechaPrueba.length > 1) {
            return fechaPrueba[0] + '-' + fechaPrueba[1] + '-' + fechaPrueba[2];
        } else {
            return fecha;
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
            mostrarMensajeWarningValidacion(errorMessage);
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

            $.each(markers, function (i, elemento) {
                $('#incidencia_' + elemento.id_marker).css('background', '');
                elemento.setMap(null);
            });
            markers = [];
            map.setCenter({ lat: parseFloat(19.4326), lng: parseFloat(-99.1332) });
            map.setZoom(15);

            $scope.listaIncidenciasLigar = [];
            let params = {
                idsFallas: [41, 37, 2, 21, 62, 63, 64, 66, 67, 23],
                fechaInicio: $scope.getFechaFormato($("#filtro_fecha_inicio_inspectorCobertura").val()),
                fechaFin: $scope.getFechaFormato($("#filtro_fecha_fin_inspectorCobertura").val())
            }
            console.log(params);
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            inspectorCoberturaService.consultarIncidenciasCoberturaPE(params).then(function success(response) {
                console.log(response);
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleIncidencias.length) {
                                let arrayRow = [];
                                if (coberturaTable) {
                                    coberturaTable.destroy();
                                }
                                $scope.incidencias = response.data.result.incidencias.detalleIncidencias;
                                $.each($scope.incidencias, function (i, elemento) {
                                    let row = [];
                                    row[0] = elemento.idIncidencia;
                                    row[1] = elemento.fechaRegistro;
                                    row[2] = elemento.usuarioReporta;
                                    row[3] = elemento.descClasificacionIncidente;
                                    row[4] = '<div class="text-center">' +
                                        '   <span title="Ubicaci&oacute;n" style="border: 1px solid red; background-color: #ffff; cursor: pointer;" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" onclick="pintarUbicacion(' + elemento.idIncidencia + ')">' +
                                        '       <i class="fa fa-globe-americas" style="color: red;"></i>' +
                                        '   </span> ' +
                                        '</div>';
                                    arrayRow.push(row);
                                })
                                '<i class="fa fa-globe-americas" style="color:red; cursor:pointer" onclick="pintarUbicacion(' + elemento.idIncidencia + ')"></i>'
                                coberturaTable = $('#tableCobertura').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "searching": true,
                                    "ordering": false,
                                    "pageLength": 10,
                                    "info": false,
                                    "rowId": "idIncidencia",
                                    "data": arrayRow,
                                    "language": idioma_espanol_not_font,
                                    'fnCreatedRow': function (nRow, aData, iDataIndex) {
                                        $(nRow).attr('id', 'incidencia_' + aData[0]); // or whatever you choose to set as the id
                                    },
                                });
                                document.getElementById('tableCobertura_paginate').addEventListener('click', function () {
                                    $('#tableCobertura tbody tr').css('background', '');
                                    $.each(markers, function (i, elemento) {
                                        $('#incidencia_' + elemento.id_marker).css('background', '#d3d3d3');
                                    });
                                    $scope.$apply();
                                })
                                swal.close();
                            } else {
                                mostrarMensajeInformativo("No se encontraron Incidencias");
                                swal.close();
                            }
                        } else {
                            mostrarMensajeErrorAlert(response.data.resultDescripcion);
                            swal.close();
                        }
                    } else {
                        mostrarMensajeInformativo("No se encontraron Incidencias");
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            });
        }

    }

    pintarUbicacion = function (id) {
        if (!$("#content_mapa").hasClass('closed')) {
            $("#content_mapa").click();
        }

        let isMarker = false;
        let index = 0;
        $.each(markers, function (i, elemento) {
            if (elemento.id_marker == id) {
                index = i;
                isMarker = true;
                $('#incidencia_' + id).css('background', '');
                elemento.setMap(null);
                return false;
            }
        });

        if (!isMarker) {
            $scope.printMarker(id);
        } else {
            markers.splice(index, 1);
            $.each(markers, function (i, elemento) {
                if (i == markers.length - 1) {
                    map.setCenter(elemento.position);
                    map.setZoom(15);
                    return false;
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
                $('#incidencia_' + elemento.id_marker).css('background', '');
                elemento.setMap(null);
                markers.splice(i, 1);
                $.each(markers, function (ix, elemento2) {
                    if (ix == markers.length - 1) {
                        map.setCenter(elemento2.position);
                        map.setZoom(15);
                        return false;
                    }
                });
                return false;
            }
        })
    }

    $scope.printMarker = function (id) {
        $(".gm-ui-hover-effect").click();

        let incidencia = $scope.incidencias.find((e) => e.idIncidencia == id);
        $('#incidencia_' + id).css('background', '#d3d3d3');
        var contentString = '<div id="content"><div id="siteNotice"></div>' +
            '<h4 id="firstHeading" class="firstHeading"><span class="titleHeading">ID: </span>' + id + '</h4><hr>' +
            '<div id="bodyContent">' +
            '  <b><strong >Reporta:</strong></b>&nbsp;' + incidencia.usuarioReporta +
            '  <br><br><b><strong >Falla:</strong></b>&nbsp;' + incidencia.descClasificacionIncidente +
            '  <br><br><b><strong >Fecha:</strong></b>&nbsp;' + incidencia.fechaRegistro +
            '  <br><br><b><strong >Latitud:</strong></b>&nbsp;' + incidencia.latitud +
            '  <br><br><b><strong >Longitud:</strong></b>&nbsp;' + incidencia.longitud +
            '  <br><button id="inc_' + id + '" class="agregarBtn btn-block btn btn-sm btn-outline-primary" onclick="agregarIncidencia(' + id + ",'" + incidencia.usuarioReporta + "','" + incidencia.descClasificacionIncidente + "','" + incidencia.fechaRegistro + "'" + ')">Agregar</button></div></div>';

        var infowindows = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            id_marker: id,
            position: { lat: parseFloat(incidencia.latitud), lng: parseFloat(incidencia.longitud) },
            map: map,
            animation: google.maps.Animation.DROP,
            title: incidencia.reporta,
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

        markers.push(marker);
        map.setCenter(new google.maps.LatLng(incidencia.latitud, incidencia.longitud));
    }

    $scope.consultarCoberturas();

    $scope.ligarIncidencias = function () {
        $("#content_mapa").click();
        if (!$scope.listaIncidenciasLigar.length) {
            mostrarMensajeWarningValidacion('Selecciona al menos una incidencia');
            return false;
        }

        let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
        let clustersparam = $("#jstree-proton-3").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id))

        if (clustersparam.length == 0) {
            mostrarMensajeWarningValidacion('Selecciona cluster valido');
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
                mostrarMensajeExitoAlert('Operaci&oacute;n exitosa');
            } else {
                mostrarMensajeWarningValidacion('El comentario es obligatorio para ligar incidencias');
            }

        }).catch(err => {
            mostrarMensajeWarningValidacion('Operaci&oacute;n cancelada');
        });


    }

    agregarIncidencia = function (id, reporta, falla, fecha) {
        $scope.listaIncidenciasLigar.push({ id: id, reporta: reporta, falla: falla, fecha: fecha });
        console.log(id);
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
            idFalla: "41,37,2,21,62,63,64,66,67,23",
            fechaInicio: $scope.getFechaFormato($("#filtro_fecha_inicio_inspectorCobertura").val()),
            fechaFin: $scope.getFechaFormato($("#filtro_fecha_fin_inspectorCobertura").val())
        }
        swal({ text: 'Cargando registros...', allowOutsideClick: false });
        swal.showLoading();
        inspectorCoberturaService.consultarIncidenciasCoberturaPE(params).then(function success(response) {
            swal.close()
            if (response.data.respuesta) {
                const data = JSON.parse(response.data.result)
                const fileName = 'Reporte incidencias cobertura'
                const exportType = 'xls'
     
                window.exportFromJSON({ data, fileName, exportType })
            } else {
                mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
            }
           
        }).catch(err => handleError(err));
        */
    }

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
        $("#moduloInspectorCoberturasPE").addClass('active');
    });

}]);