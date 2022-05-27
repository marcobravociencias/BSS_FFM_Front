var app = angular.module('inspectorCoberturaApp', []);
app.controller('inspectorCoberturaController', ['$scope', '$q', 'inspectorCoberturaService', 'genericService', function ($scope, $q, inspectorCoberturaService, genericService) {

    let coberturaTable;
    let markers = [];
    $scope.filtrosInspector = {};
    $scope.incidenciasCobertura = [];
    $scope.listaIncidenciasLigar = [];
    $scope.banderaErrorFallas = false;
    $scope.banderaErrorGeografia = false;
    $scope.isPermisoConsultaIncidencias = false;
    $scope.isPermisoLigarIncidencia = false;

    $scope.initMapaInspectorCobertura = function () {
        map = new google.maps.Map(document.getElementById('mapaInspectorCobertura'), {
            center: {
                lat: parseFloat(19.4326),
                lng: parseFloat(-99.1332)
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }, zoomControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_CENTER
            }, streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            mapTypeControl: true,
            zoom: 15,
            disableDoubleClickZoom: true
        });
    }

    $scope.initInspectorCobertura = function () {
        $('.drop-down-filters').on("click.bs.dropdown", function (e) {
            e.stopPropagation();
        });
        /*
        $("#content_mapa").toggleClass('closed');
        $("#content_mapa").click(function () {
            $(this).toggleClass('closed');
            if ($(this).hasClass('closed')) {
                $("#content-card-selected").hide();
            } else {
                $("#content-card-selected").show();
            }
        });
        */

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

    $scope.conversionAnidadaRecursiva = function (array, nivelInit, maxNivel) {
        let arrayReturn = [];
        angular.forEach(array.filter(e => e.nivel === nivelInit), function (elem, index) {
            let elemento = angular.copy(elem);
            elemento.checkedOpcion = true;
            if (nivelInit < maxNivel) {
                elemento.children = $scope.conversionAnidadaRecursiva(array, nivelInit + 1, maxNivel).filter(e2 => Number(e2.idPadre) === Number(elemento.id));
                elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : [];
            }
            arrayReturn.push(elemento)
        });
        return arrayReturn;
    }

    $scope.obtenerUltimoNivelFiltros = function (array) {
        return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
    }

    $scope.obtenerElementosSeleccionadosFiltro = function (array, nivel) {
        let arrayReturn = [];
        angular.forEach(array, function (elemento, index) {
            if (elemento.nivel == nivel && elemento.checkedOpcion) {
                arrayReturn.push(Number(elemento.id));
            } else {
                arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
            }
        });
        return arrayReturn;
    }

    $scope.seleccionarTodosRecursivo = function (array) {
        array.map(function (e) {
            e.checkedOpcion = true;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.seleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.deseleccionarTodosRecursivo = function (array) {
        array.map(function (e) {
            e.checkedOpcion = false;
            if (e.children !== undefined && e.children.length > 0) {
                $scope.deseleccionarTodosRecursivo(e.children);
            }
        });
    }

    $scope.setCheckFiltroGenericV2 = function (filtro, principalArray) {
        if (filtro.children !== undefined && filtro.children.length > 0) {
            if (filtro.checkedOpcion) {
                $scope.deseleccionarTodosRecursivo(filtro.children);
            } else {
                $scope.seleccionarTodosRecursivo(filtro.children);
            }
        }
        filtro.checkedOpcion = !filtro.checkedOpcion;
        $scope.checkPadre(filtro.idPadre, principalArray, principalArray);
    }

    $scope.checkPadre = function (idPadre, array, principalArray) {
        array.map(function (e) {
            if (Number(e.id) === Number(idPadre)) {
                e.checkedOpcion = e.children.length === e.children.filter(function (e) { return e.checkedOpcion }).length;
                $scope.checkPadre(e.idPadre, principalArray, principalArray);
            } else {
                if (e.children !== undefined && e.children.length > 0) {
                    $scope.checkPadre(idPadre, e.children, principalArray);
                }
            }
        });
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

    $scope.setCheckFiltroGeneric = function (filtroParent) {
        filtroParent.checkedOpcion = !filtroParent.checkedOpcion
        filtroParent.children.map(function (e) {
            e.checkedOpcion = filtroParent.checkedOpcion
            return e
        })
    }

    $scope.setCheckSubFiltroGeneric = function (subFiltro, parentFiltro) {
        subFiltro.checkedOpcion = !subFiltro.checkedOpcion
        let cantidadSubfiltros = parentFiltro.children.length
        let cantidadChecked = parentFiltro.children.filter(function (e) { return e.checkedOpcion }).length
        parentFiltro.checkedOpcion = cantidadSubfiltros !== cantidadChecked ? false : true
    }

    $scope.seleccionTodos = function (paramFiltroParent, banderaChecked) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = banderaChecked;
            return e;
        })
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

    $scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
        return list.sort(compareGeneric)[0].nivel
    }

    $scope.listaSeleccionSelectFalla = function (lista) {
        var texto = "";
        angular.forEach(lista, function (list, index) {
            if (list.children.length) {
                angular.forEach(list.children, function (children, index) {
                    if (children.checkedOpcion) {
                        if (texto !== "") {
                            texto = (texto + ", " + children.descripcion);
                        } else {
                            texto = (children.descripcion);
                        }
                    }
                });
            } else {
                if (list.checkedOpcion) {
                    if (texto !== "") {
                        texto = (texto + ", " + list.descripcion);
                    } else {
                        texto = (list.descripcion);
                    }
                }
            }
        });
        return texto;
    }

    $scope.mostrarNombresEstatus = function (array) {
        let arrayNombre = [];
        angular.forEach(array, function (elemento, index) {
            if (elemento.checkedOpcion) {
                arrayNombre.push(elemento.descripcion);
            }
            if (elemento.children !== undefined && elemento.children.length > 0) {
                arrayNombre = arrayNombre.concat($scope.mostrarNombresEstatus(elemento.children));
            }
        });
        return arrayNombre;
    }

    $scope.pintarNombreEstatus = function (array, input) {
        let textoEstatus = $scope.mostrarNombresEstatus(array);
        $(input).val(textoEstatus);
        if (textoEstatus.length > 0) {
            $(input).css("border-bottom", "2px solid #d9d9d9");
        }
    }

    $scope.consultarCatalogosInspectorCobertura = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $q.all([
            inspectorCoberturaService.consultarConfiguracionDespacho({ "moduloAccionesUsuario": "moduloInspectorCoberturasPE" }),
            inspectorCoberturaService.consultarFallasCoberturaPE(),
            inspectorCoberturaService.consultaCatalogoGeografia(),
        ]).then(function (results) {
            console.log(results);
            let resultConf = results[0].data.result;
            if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                $scope.nfiltrogeografia = llavesResult.N_FILTRO_GEOGRAFIA;
                $scope.nfiltrofallas = llavesResult.N_FILTRO_FALLA;
                validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
            }

            if (resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.permisos && resultConf.MODULO_ACCIONES_USUARIO.permisos != "") {
                $scope.permisosUsuario = resultConf.MODULO_ACCIONES_USUARIO.permisos;
                console.log($scope.permisosUsuario);
                $scope.isPermisoConsultaIncidencias = ($scope.permisosUsuario.filter(e => { return e.clave == "accionConsultarIncidenciasCobertura" })[0] != undefined);
                $scope.isPermisoLigarIncidencia = ($scope.permisosUsuario.filter(e => { return e.clave == "accionLigarIncidenciaInspectorCobertura" })[0] != undefined);
            }

            GenericMapa.prototype.callPrototypeMapa(results[0].data.result);
            $scope.initMapaInspectorCobertura();

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        console.log(results[1].data);
                        $scope.respaldoFallaArray = [];
                        $scope.respaldoFallaArray = angular.copy(results[1].data.result.incidentes);
                        $scope.nfiltrofallas = $scope.nfiltrofallas ? $scope.nfiltrofallas : $scope.obtenerUltimoNivelFiltros($scope.respaldoFallaArray);
                        $scope.filtrosInspector.fallas = $scope.conversionAnidadaRecursiva($scope.respaldoFallaArray, 1, $scope.nfiltrofallas);
                    } else {
                        mostrarMensajeWarningValidacion("<li>No se encontraron datos para el Cat&aacute;alogo de Fallas</i>");
                        $scope.banderaErrorFallas = true;
                    }
                } else {
                    mostrarMensajeWarningValidacion('<li>' + results[2].data.resultDescripcion + '</i>');
                    $scope.banderaErrorFallas = true;
                }
            } else {
                mostrarMensajeWarningValidacion("<li>No se encontraron datos para el Cat&aacute;logo de Fallas</i>");
                $scope.banderaErrorFallas = true;
            }

            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        if (results[2].data.result.geografia) {
                            $scope.listadogeografiacopy = results[2].data.result.geografia;
                            $scope.nfiltrogeografia = $scope.nfiltrogeografia ? $scope.nfiltrogeografia : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result.geografia);
                            $scope.filtrosInspector.listArbol = results[2].data.result.geografia.filter(e => e.nivel <= parseInt($scope.nfiltrogeografia));
                            let geografia = angular.copy($scope.filtrosInspector.listArbol);
                            geografia.map((e) => {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: false,
                                }
                                return e;
                            })
                            $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
                                $scope.consultarCoberturas();
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
                            setTimeout(function () {
                                $scope.pintarNombreEstatus($scope.filtrosInspector.fallas, '#txtFalla');
                                swal.close();
                            }, 500);
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

    $scope.consultarCoberturas = function () {
        if ($scope.isPermisoConsultaIncidencias) {
            let errorMessage = "";
            let isValid = true;

            if (!$scope.validarFecha("filtro_fecha_inicio_inspectorCobertura", "filtro_fecha_fin_inspectorCobertura")) {
                errorMessage += "<li>La fecha inicical debe ser menor a la fecha final</li>";
                isValid = false;
            }

            let fallasSelected = []
            fallasSelected = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosInspector.fallas, $scope.nfiltrofallas);
            if (fallasSelected.length === 0) {
                mensajeError += '<li>Selecciona al menos una falla</li>';
                isValid = false
            }
            if (isValid) {
                $.each(markers, function (i, elemento) {
                    $('#incidencia_' + elemento.id_marker).css('background', '');
                    elemento.setMap(null);
                });
                markers = [];
                map.setCenter({ lat: parseFloat(19.4326), lng: parseFloat(-99.1332) });
                map.setZoom(15);

                $scope.listaIncidenciasLigar = [];
                $scope.incidenciasCobertura = [];
                let params = {
                    idsFallas: fallasSelected,
                    fechaInicio: $scope.getFechaFormato($("#filtro_fecha_inicio_inspectorCobertura").val()),
                    fechaFin: $scope.getFechaFormato($("#filtro_fecha_fin_inspectorCobertura").val())
                }
                // let params = {
                //     "idsFallas": [259, 270, 272],
                //     "fechaInicio": "01-05-2022",
                //     "fechaFin": "11-05-2022"
                // }
                console.log(params);
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                inspectorCoberturaService.consultarIncidenciasCoberturaPE(params).then(function success(response) {
                    swal.close();
                    if (response.data) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                if (response.data.result.detalleIncidencias.length) {
                                    $scope.incidenciasCobertura = response.data.result.detalleIncidencias;

                                    /*let arrayRow = [];
                                    if (coberturaTable) {
                                        coberturaTable.destroy();
                                    }
                                    
                                    $.each($scope.incidenciasCobertura, function (i, elemento) {
                                        let row = [];
                                        row[0] = elemento.idIncidencia && elemento.idIncidencia !== '' ? elemento.idIncidencia : 'Sin informaci&oacute;n';
                                        row[1] = elemento.fechaRegistro && elemento.fechaRegistro !== '' ? elemento.fechaRegistro : 'Sin informaci&oacute;n';
                                        row[2] = elemento.usuarioReporta && elemento.usuarioReporta !== '' ? elemento.usuarioReporta : 'Sin informaci&oacute;n';
                                        row[3] = elemento.desSupTipoIncidencia && elemento.desSupTipoIncidencia !== '' ? elemento.desSupTipoIncidencia : 'Sin informaci&oacute;n';
                                        row[4] = '<div class="text-center">' +
                                            '   <span title="Ubicaci&oacute;n" style="border: 1px solid ' + elemento.colorEstatus + ' !important; background-color: #ffff; cursor: pointer;" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" onclick="pintarUbicacion(' + i + ')">' +
                                            '       <i class="fa fa-globe-americas" style="color: ' + elemento.colorEstatus + ';"></i>' +
                                            '   </span> ' +
                                            '</div>';
                                        arrayRow.push(row);
                                    })
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
                                    })*/
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
            } else {
                swal.close();
                mostrarMensajeWarningValidacion(errorMessage);
            }
        }
    }

    $scope.pintarUbicacion = function (idIncidencia) {
        //$scope.incidenciaSeleccionada = $scope.incidenciasCobertura[indexI];
        $scope.incidenciaSeleccionada = $scope.incidenciasCobertura.find((e) => e.idIncidencia == idIncidencia);
        if (!$("#content_mapa").hasClass('closed')) {
            $("#content_mapa").click();
        }
        let isMarker = false;
        let index = 0;
        $.each(markers, function (i, elemento) {
            if (elemento.id_marker == $scope.incidenciaSeleccionada.idIncidencia) {
                index = i;
                isMarker = true;
                $('#incidencia_' + $scope.incidenciaSeleccionada.idIncidencia).css('background', '');
                elemento.setMap(null);
                return false;
            }
        });

        if (!isMarker) {
            $scope.printMarker($scope.incidenciaSeleccionada);
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
                if (elemento.idIncidencia == $scope.incidenciaSeleccionada.idIncidencia) {
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

    $scope.printMarker = function (incidenciaUb) {
        // $(".gm-ui-hover-effect").click();
        $('#incidencia_' + incidenciaUb.idIncidencia).css('background', '#d3d3d3');
        var infowindows = new google.maps.InfoWindow();
        let isSelected = $scope.listaIncidenciasLigar.find((e) => e.idIncidencia == $scope.incidenciaSeleccionada.idIncidencia);
        var contentString;
        let contentDisabled = isSelected ? 'disabled' : '';
        if (!$scope.isPermisoLigarIncidencia) {
            contentString =
                '<div id="content">' +
                '   <div id="siteNotice"></div>' +
                '   <h5 id="firstHeading" class="firstHeading">' +
                '   <span class="titleHeading">ID: </span>' + incidenciaUb.idIncidencia + '</h5><hr>' +
                '   <div id="bodyContent">' +
                '       <b><strong class="titleBody">Reporta:</strong></b>&nbsp;' + incidenciaUb.usuarioReporta +
                '       <br><br><b><strong class="titleBody">Falla:</strong></b>&nbsp;' + incidenciaUb.desTipoIncidencia +
                '       <br><br><b><strong class="titleBody">Fecha:</strong></b>&nbsp;' + incidenciaUb.fechaRegistro +
                '       <br><br><b><strong class="titleBody">Latitud:</strong></b>&nbsp;' + incidenciaUb.latitud +
                '       <br><br><b><strong class="titleBody">Longitud:</strong></b>&nbsp;' + incidenciaUb.longitud +
                '   </div>' +
                '</div>';
        } else {
            contentString =
                '<div id="content">' +
                '   <div id="siteNotice"></div>' +
                '   <h5 id="firstHeading" class="firstHeading">' +
                '   <span class="titleHeading">ID: </span>' + incidenciaUb.idIncidencia + '</h5><hr>' +
                '   <div id="bodyContent">' +
                '       <b><strong class="titleBody">Reporta:</strong></b>&nbsp;' + incidenciaUb.usuarioReporta +
                '       <br><br><b><strong class="titleBody">Falla:</strong></b>&nbsp;' + incidenciaUb.desTipoIncidencia +
                '       <br><br><b><strong class="titleBody">Fecha:</strong></b>&nbsp;' + incidenciaUb.fechaRegistro +
                '       <br><br><b><strong class="titleBody">Latitud:</strong></b>&nbsp;' + incidenciaUb.latitud +
                '       <br><br><b><strong class="titleBody">Longitud:</strong></b>&nbsp;' + incidenciaUb.longitud +
                '       <br><button ' + contentDisabled + '  id="inc_' + incidenciaUb.idIncidencia + '" class="agregarBtn btn-block btn btn-sm btn-outline-primary" onclick="agregarIncidencia(' + incidenciaUb.idIncidencia + ')">Agregar</button>' +
                '   </div>' +
                '</div>';
        }
        infowindows.setContent(contentString);
        var marker = new google.maps.Marker({
            id_marker: incidenciaUb.idIncidencia,
            position: { lat: parseFloat(incidenciaUb.latitud), lng: parseFloat(incidenciaUb.longitud) },
            map: map,
            animation: google.maps.Animation.DROP,
            title: incidenciaUb.reporta,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5.5,
                fillColor: "#fb0000",
                fillOpacity: 1,
                strokeWeight: 0.4
            },
            infowindow: infowindows,
            inc: incidenciaUb.idIncidencia
        });
        marker.addListener('click', function () {
            infowindows.open(map, marker);
        });

        markers.push(marker);
        map.setCenter(new google.maps.LatLng(incidenciaUb.latitud, incidenciaUb.longitud));
    }

    $scope.openMdlCluster = function(){
        $("#modalCluster").modal('show');
    }

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

    agregarIncidencia = function (idIncidencia) {
        $scope.agregarIncidenciaList(idIncidencia);
        $("#inc_" + idIncidencia).attr("disabled", true);
        $scope.$apply();
    }

    $scope.agregarIncidenciaList = function (idIncidencia) {
        let isSelected = $scope.listaIncidenciasLigar.find((e) => e.idIncidencia == idIncidencia);
        if ($scope.isPermisoLigarIncidencia) {
            if (!isSelected) {
                let incidenciaLigar = $scope.incidenciasCobertura.find((e) => e.idIncidencia == idIncidencia);
                $("#icon-" + idIncidencia).removeClass("fa-plus");
                $("#icon-" + idIncidencia).addClass("fa-check");
                $("#icon-" + idIncidencia).css("color","#51b37d");
                $scope.listaIncidenciasLigar.push(incidenciaLigar);
            }
        }
    }

    $scope.eliminarIncidencia = function (id) {
        $("#content_mapa").click();
        $.each($scope.listaIncidenciasLigar, function (i, elemento) {
            if (elemento.idIncidencia == id) {
                $scope.listaIncidenciasLigar.splice(i, 1);
                $scope.deleteMarker(id);
                $("#icon-" + id).removeClass("fa-check");
                $("#icon-" + id).addClass("fa-plus");
                $("#icon-" + id).css("color","#000");
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
        return $scope.filtrosInspector.listArbol.sort(compareGeneric)[0].nivel
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
        $scope.initInspectorCobertura();
        $scope.consultarCatalogosInspectorCobertura();
        $("#idBody").removeAttr("style");
        $("#moduloInspectorCoberturasPE").addClass('active');
    });

}]);