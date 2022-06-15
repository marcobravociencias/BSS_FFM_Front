var app = angular.module('inspectorCoberturaApp', []);
app.controller('inspectorCoberturaController', ['$scope', '$q', 'inspectorCoberturaService', 'genericService', function ($scope, $q, inspectorCoberturaService, genericService) {
    var objectTempAccion = new GenericAccionRealizada('moduloInspectorCoberturasPE', 'TOP_RIGHT');
    objectTempAccion.inicializarBotonAccionesRecientes();

    var regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    var infowindows = [];
    let markers = [];
    var objectMapaUbiacion;
    let incidenciaTableCobertura;
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
            mapTypeControl: false,
            zoomControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT
            }, streetViewControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            fullscreenControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            zoom: 15,
            disableDoubleClickZoom: true
        });

        objectMapaUbiacion = new GenericMapa(map, 'mapaInspectorCobertura', 'bottom-right');
        objectMapaUbiacion.inicializar_data()
    }

    $('#searchGeografia').on('keyup', function () {
        $("#jstree-proton-3").jstree("search", this.value);
    })

    $scope.initInspectorCobertura = function () {
        $('.drop-down-filters').on("click.bs.dropdown", function (e) {
            e.stopPropagation();
        });

        $("#content_mapa").toggleClass('closed');
        $("#content_mapa").click(function () {
            $(this).toggleClass('closed');
            if ($(this).hasClass('closed')) {
                $("#content-card-consulta").hide();
            } else {
                $("#content-card-consulta").show();
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

        $("#modalCluster").on("hidden.bs.modal", function () {
            let selectedElm = $('#jstree-proton-3').jstree("get_selected", true);
            if (selectedElm.length == 1) {
                $('#texto_cluster_seleccionado').text(selectedElm[0].text);
            } else {
                $('#texto_cluster_seleccionado').text('Sin selecci\u00F3n');
            }
        });

        incidenciaTableCobertura = $('#tableIncidenciaCobertura').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 5,
            "info": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font
        });
    }

    $scope.filterByText = function () {
        let txtBusqueda = $("#filtroBusquedaTabla").val();
        incidenciaTableCobertura.search(txtBusqueda).draw();
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
                $scope.isPermisoConsultaIncidencias = ($scope.permisosUsuario.filter(e => { return e.clave == "accionConsultarIncidenciasCobertura" })[0] != undefined);
                $scope.isPermisoLigarIncidencia = ($scope.permisosUsuario.filter(e => { return e.clave == "accionLigarIncidenciaInspectorCobertura" })[0] != undefined);
            }


            let arrayDefaultKmzElemts = results[0].data.result.KEY_DEFAULT_KMZ ? results[0].data.result.KEY_DEFAULT_KMZ.split(",") : null;
            GenericMapa.prototype.callPrototypeMapa(results[0].data.result, arrayDefaultKmzElemts);
            $scope.initMapaInspectorCobertura();

            $("#idBody").removeAttr("style");

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        $scope.respaldoFallaArray = [];
                        $scope.respaldoFallaArray = angular.copy(results[1].data.result.incidentes);
                        $scope.nfiltrofallas = $scope.nfiltrofallas ? $scope.nfiltrofallas : $scope.obtenerUltimoNivelFiltros($scope.respaldoFallaArray);
                        $scope.filtrosInspector.fallas = $scope.conversionAnidadaRecursiva($scope.respaldoFallaArray, 1, $scope.nfiltrofallas);
                    } else {
                        mostrarMensajeWarningValidacion("<li>No se encontraron datos para el cat&aacute;alogo de Fallas</i>");
                        $scope.banderaErrorFallas = true;
                    }
                } else {
                    mostrarMensajeWarningValidacion('<li>' + results[2].data.resultDescripcion + '</i>');
                    $scope.banderaErrorFallas = true;
                }
            } else {
                mostrarMensajeWarningValidacion("<li>No se encontraron datos para el cat&aacute;logo de Fallas</i>");
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
                                'plugins': ["search"],
                                'core': {
                                    'data': geografia,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons": false
                                    }
                                },
                                "search": {
                                    "case_sensitive": false,
                                    "show_only_matches": true
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

    $scope.createTable = function () {
        let arraRow = [];
        $.each($scope.incidenciasCobertura, function (index, incidencia) {
            let row = [];

            let ligarHtml = `  <div class="icon-content" onclick="agregarIncidencia(` + incidencia.idIncidencia + `)"
            style="right: 2.5em; border-color: #ccc;">
            <i class="fa fa-plus icon-change-plus" title="Agregar" id="icon-plus-`+ incidencia.idIncidencia + `" style="color: #000; font-size: 0.8em;display:block"></i>
            <i class="fa fa-check icon-change-check" title="Agregado" id="icon-check-`+ incidencia.idIncidencia + `" style="color: #51b37d; font-size: 0.8em;display:none"></i>
            </div>`;

            let htmlContent = ` <tr><td><div class="incidencia-card ng-scope">
                <div class="row">
                    <div class="col-2" style="text-align:center;">
                        <img src="` + incidencia.urlFoto + `"
                            onclick="showImage(`+ incidencia.idIncidencia + `)" alt="Foto" width="35" height="35" class="imgFoto">
                    </div>
                    <div class="col-8 content-text">
                        <span class="text-title" title="`+ incidencia.usuarioReporta + `"><strong>` + incidencia.usuarioReporta + `</strong></span>
                        <p class="text-title">`+ incidencia.numeroEmpleado + `</p>
                    </div>
                    <div class="col-2 incidencia-options">`;

            let htmlContentSecond = `<div class="icon-content" style="border-color: #ccc;"
                                onclick="pintarUbicacion(`+ incidencia.idIncidencia + `)">
                                <i class="fas fa-crosshairs icon-change-cross" title="Buscar en mapa" id="icon-cross-`+ incidencia.idIncidencia + `"
                                    style="color:#000;"></i>
                            </div>
                        </div>
                    </div>
                    <div class="info-incidencia">
                        <div class="rightbox">
                            <div class="rb-container">
                                <ul class="rb">
                                    <li class="rb-item">
                                        <div class="item-title"><span>`+ incidencia.descEstatus + `</span>
                                        </div>
                                    </li>
                                    <li class="rb-item">
                                        <div class="item-title">
                                            <span>`+ incidencia.desTipoIncidencia + `</span>
                                        </div>
                                        <div class="item-title">
                                            <span>`+ incidencia.desSupTipoIncidencia + `</span>
                                        </div>
                                    </li>
                                    <li class="rb-item">
                                        <div class="item-title"><span>Registro: </span>
                                            <span>`+ incidencia.fechaRegistro + `</span>
                                            <span>`+ incidencia.horaRegistro + `</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="content-badge-status">
                            <span class="badge badge-status">ID:
                                <span>`+ incidencia.idIncidencia + `</span>
                            </span>

                        </div>
                        <hr style="margin: 0.2em 1em;">
                    </div>
                    </div></td></tr>`;

                row[0] = htmlContent.concat($scope.isPermisoLigarIncidencia ? ligarHtml : '') + htmlContentSecond


                arraRow.push(row);
        })

        incidenciaTableCobertura = $('#tableIncidenciaCobertura').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 5,
            "data": arraRow,
            "info": false,
            "bDestroy": true,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "dom": '<"top"i>rt<"bottom"flp><"clear">',
            "drawCallback": function (settings) {
                $(".icon-change-check").css("display", "none");
                $(".icon-change-plus").css("display", "block");
                $(".icon-change-cross").css("color", "#000");
                $.each($scope.listaIncidenciasLigar, function (i, incidencia) {
                    $("#icon-check-" + incidencia.idIncidencia).css("display", "block");
                    $("#icon-plus-" + incidencia.idIncidencia).css("display", "none");
                })

                $.each(markers, function (i, elemento) {
                    $('#icon-cross-' + elemento.id_marker).css('color', elemento.icon.fillColor);
                });

            },
        });
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

                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                inspectorCoberturaService.consultarIncidenciasCoberturaPE(params).then(function success(response) {
                    $("#tableIncidencia tbody").empty()
                    swal.close();
                    if (response.data) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                $scope.incidenciasCobertura = response.data.result.detalleIncidencias;
                                let url = './resources/img/plantainterna/despacho/tecnicootasignada.png';
                                $.each($scope.incidenciasCobertura, function (i, elemento) {
                                    elemento.urlFoto = regexUrl.test(elemento.urlFoto) ? elemento.urlFoto : url;
                                });
                                $scope.createTable();
                                swal.close();
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
                $("#content_mapa").css("display", "block");
            } else {
                swal.close();
                mostrarMensajeWarningValidacion(errorMessage);
            }
        }
    }

    pintarUbicacion = function (idIncidencia) {
        $scope.incidenciaSeleccionada = $scope.incidenciasCobertura.find((e) => e.idIncidencia == idIncidencia);
        let isMarker = false;
        let index = 0;
        $.each(markers, function (i, elemento) {
            if (elemento.id_marker == $scope.incidenciaSeleccionada.idIncidencia) {
                index = i;
                isMarker = true;
                elemento.setMap(null);
                return false;
            }
        });

        if (!isMarker) {
            $("#icon-cross-" + idIncidencia).css("color", $scope.incidenciaSeleccionada.colorEstatus)
            $scope.printMarker($scope.incidenciaSeleccionada);
        } else {
            $("#icon-cross-" + idIncidencia).css("color", "#000")
            markers.splice(index, 1);
            $.each(markers, function (i, elemento) {
                if (i == markers.length - 1) {
                    map.setCenter(elemento.position);
                    map.setZoom(15);
                    $scope.deleteMarker(idIncidencia);
                    return false;
                }
            });
            /*
            $.each($scope.listaIncidenciasLigar, function (i, elemento) {
                if (elemento.idIncidencia == $scope.incidenciaSeleccionada.idIncidencia) {
                    $scope.listaIncidenciasLigar.splice(i, 1);
                    $scope.$apply();
                    return false;
                }
            });
            */
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

    limpiarAllInfoWindows = function () {
        $.each(infowindows, function (index, elemento) {
            elemento.close();
        });
    }

    $scope.printMarker = function (incidenciaUb) {
        // $(".gm-ui-hover-effect").click();

        if (infowindows) {
            limpiarAllInfoWindows();
        }

        var infowindow = new google.maps.InfoWindow();
        let isSelected = $scope.listaIncidenciasLigar.find((e) => e.idIncidencia == $scope.incidenciaSeleccionada.idIncidencia);
        var contentString;
        let contentDisabled = isSelected ? 'disabled' : '';
        if (!$scope.isPermisoLigarIncidencia) {
            contentString =
                '<div id="content">' +
                '   <div id="siteNotice"></div>' +
                '   <h5 id="firstHeading" class="firstHeading">' +
                '   <span class="titleHeading">ID: </span>' + incidenciaUb.idIncidencia + '</h5><hr style="margin:0.5em">' +
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
                '   <span class="titleHeading">ID: </span>' + incidenciaUb.idIncidencia + '</h5><hr style="margin:0.5em">' +
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
        infowindow.setContent(contentString);
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
            infowindow.open(map, marker);
        });
        infowindow.open(map, marker);
        infowindows.push(infowindow);
        markers.push(marker);
        map.setCenter(new google.maps.LatLng(incidenciaUb.latitud, incidenciaUb.longitud));
    }

    $scope.openMdlCluster = function () {
        $("#jstree-proton-3").jstree("search", '');
        $("#searchGeografia").val('');
        setTimeout(function () {
            $("#searchGeografia").focus();
        }, 750);
        $("#modalCluster").modal('show');
    }

    $scope.ligarIncidenciaPe = function (comentario, cluster, textCluster) {
        let incidenciasArray = $scope.listaIncidenciasLigar.map(e => Number(e.idIncidencia))
        let params = {
            comentario: comentario,
            idsIncidentes: incidenciasArray,
            idGeografia: cluster
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let tituloAccion = "Ligar incidencia a cl&uacute;ster";
        let mensajeEnvio = 'Ha ocurrido un error al ligar las incidencias al cluster: ' + textCluster;
        inspectorCoberturaService.ligarIncidenciasCoberturaPE(params).then(function success(response) {
            if (response.data) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        toastr.success('Operaci&oacute;n &eacute;xitosa');
                        $("#content_mapa").click();
                        $("#modalCluster").modal('hide');
                        $('#jstree-proton-3').jstree("deselect_all");
                        $('#jstree-proton-3').jstree("close_all");
                        mensajeEnvio = 'Se ligaron las incidencias al cluster: ' + textCluster;
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                        $scope.consultarCoberturas();
                    } else {
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                        swal.close();
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    }
                } else {
                    mostrarMensajeErrorAlert("No se pudo ligar al cluster");
                    swal.close();
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion);
                swal.close();
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
            }
        }).catch(err => handleError(err));
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
            mostrarMensajeWarningValidacion('Selecciona cluster v&aacute;lido');
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
                $scope.ligarIncidenciaPe(response, clustersparam[0], selectedElm[0].text);
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
        $("#icon-plus-" + idIncidencia).css("display", "none");
        $("#icon-check-" + idIncidencia).css("display", "block");
        $scope.$apply();
    }

    $scope.agregarIncidenciaList = function (idIncidencia) {
        let isSelected = $scope.listaIncidenciasLigar.find((e) => e.idIncidencia == idIncidencia);
        if ($scope.isPermisoLigarIncidencia) {
            if (!isSelected) {
                $scope.validarSelected(true, idIncidencia);
                let incidenciaLigar = $scope.incidenciasCobertura.find((e) => e.idIncidencia == idIncidencia);
                $scope.listaIncidenciasLigar.push(incidenciaLigar);
            }
        }
    }

    $scope.eliminarIncidencia = function (id) {
        $("#content_mapa").click();
        $.each($scope.listaIncidenciasLigar, function (i, elemento) {
            if (elemento.idIncidencia == id) {
                $scope.validarSelected(false, id);
                $scope.listaIncidenciasLigar.splice(i, 1);
                $scope.deleteMarker(id);
                $("#icon-plus-" + id).css("display", "block");
                $("#icon-check-" + id).css("display", "none");
                $("#icon-cross-" + id).css("color", "#000");
                return false;
            }
        });
    }

    $scope.validarSelected = function (isSelected, id) {
        $.each($scope.incidenciasCobertura, function (i, elemento) {
            if (elemento.idIncidencia == id) {
                elemento.isSelected = isSelected;
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
    $scope.usuarioFoto = {};
    showImage = function (id) {
        let insp = $scope.incidenciasCobertura.find((e) => e.idIncidencia == id);
        $scope.usuarioFoto.tipo = "Ingeniero";
        $scope.usuarioFoto.noEmpleado = insp.numeroEmpleado;
        $scope.usuarioFoto.usuario = insp.usuarioReporta;
        $('#img_tec').attr('src', insp.urlFoto);
        $('#modalFoto').modal('show');
    }

    angular.element(document).ready(function () {
        $scope.initInspectorCobertura();
        $scope.consultarCatalogosInspectorCobertura();
        $(".chevron").click();
        $("#moduloInspectorCoberturasPE").addClass('active');
    });

}]);