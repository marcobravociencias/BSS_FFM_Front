var app = angular.module('inspectorIncidenciaApp', []);
var incidenciaTable = undefined;
var tableDetalleStatus = undefined;
app.controller('inspectorIncidenciaController', ['$scope', '$q', 'inspectorIncidenciaService', 'genericService', function ($scope, $q, inspectorIncidenciaService, genericService) {

    $scope.filtrosInspector = {};
    $scope.incidencias = [];
    $scope.listCatEstatus = [];
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
    $scope.incidenciaSeleccionada = {};
    $scope.incidenciaDetalle = {};
    $scope.fallasIncidenciaDetalle = [];
    $scope.banderaErrorGeografia = false;
    $scope.banderaErrorEstatus = false;
    $scope.banderaErrorFallas = false;
    $scope.nfiltrogeografia = "";
    $scope.incidenciaDeclinar = {};
    $scope.nombreFileDeclinaInc = '';
    $scope.llaveEstatusGeneraOT = [];
    $scope.permisosUsuario = [];
    $scope.isPermisoConsultaIncidencias = false;
    $scope.isPermisoGenerarOTInspector = false;

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    $scope.initInspectorIncidencia = function () {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('.datepicker').datepicker('update', new Date());

        incidenciaTable = $('#tableIncidencia').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });

        tableDetalleStatus = $('#tableDetalleStatus').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 5,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
    }

    document.getElementById('txtGeografiasConsulta').addEventListener('click', function () {
        $('#modalCluster').modal('show');
        setTimeout(function () {
            $('#buscadorGeografiaConsultaIncidencias').focus();
        }, 750);
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


    $scope.listaSeleccionSelectGral = function (lista) {
        var texto = "";
        angular.forEach(lista, function (list, index) {
            if (list.checkedOpcion) {
                if (texto !== "") {
                    texto = (texto + ", " + list.descripcion);
                } else {
                    texto = (list.descripcion);
                }
            }
        });
        return texto;
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

    $scope.estatusSeleccion = function () {
        $('#txtEstatus').val($scope.listaSeleccionSelectGral($scope.listCatEstatus));
        $("#txtEstatus").css("border-bottom", "2px solid #d9d9d9");
    }

    $scope.fallaSeleccion = function () {
        $('#txtFalla').val($scope.listaSeleccionSelectFalla($scope.filtrosInspector.fallas));
        $("#txtFalla").css("border-bottom", "2px solid #d9d9d9");
    }

    $scope.btnAceptarGeografiaConsulta = function () {
        var geografias = $('#jstree-proton-3').jstree("get_selected", true);
        let textoGeografias = [];
        angular.forEach(geografias, (geografia, index) => {
            textoGeografias.push(geografia.text);
        });
        $('#txtGeografiasConsulta').val(textoGeografias);
        if (textoGeografias.length > 0) {
            $("#txtGeografiasConsulta").css("border-bottom", "2px solid #d9d9d9");
        }
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
            if (e.children) {
                e.children.map(function (j) {
                    j.checkedOpcion = banderaChecked;
                    return j;
                })
            }
        })
    }

    $scope.consultarCatalogosInspectorIncidencia = function () {
        $q.all([
            inspectorIncidenciaService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloInspectorIncidenciasPE" }),
            inspectorIncidenciaService.consultaCatalogoEstatusInspectorPE(),
            inspectorIncidenciaService.consultarFallasInspectorPE(),
            inspectorIncidenciaService.consulCatalogoGeografia()
        ]).then(function (results) {
            console.log(results);
            let resultConf = results[0].data.result;
            if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;

                $scope.nfiltrogeografia = llavesResult.N_FILTRO_GEOGRAFIA;
                $scope.nfiltroestatusfalla = llavesResult.N_FILTRO_ESTATUS_FALLA;
                $scope.nfiltrofallas = llavesResult.N_FILTRO_FALLA;
                validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
                $scope.llaveEstatusGeneraOT = llavesResult.KEY_ESTATUS_GENERAR_OT ? llavesResult.KEY_ESTATUS_GENERAR_OT.split(",") : [];//[1]
                $("#idBody").removeAttr("style");
            }
            if (resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.permisos && resultConf.MODULO_ACCIONES_USUARIO.permisos != "") {
                $scope.permisosUsuario = resultConf.MODULO_ACCIONES_USUARIO.permisos;
                console.log($scope.permisosUsuario);
                $scope.isPermisoConsultaIncidencias = ($scope.permisosUsuario.filter(e => { return e.clave == "consultarIncidenciasPEAccion" })[0] != undefined);
                $scope.isPermisoGenerarOTInspector = ($scope.permisosUsuario.filter(e => { return e.clave == "generarOTInspectorPEAccion" })[0] != undefined);
            }

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        $scope.listCatEstatus = angular.copy(results[1].data.result.estatusIncidente);
                        $scope.listCatEstatus.map(function (e) { e.checkedOpcion = true; return e; })
                    } else {
                        mostrarMensajeWarningValidacion("<li>No se encontraron datos para el Estatus</i>");
                        $scope.banderaErrorEstatus = true;
                    }
                } else {
                    mostrarMensajeWarningValidacion('<li>' + results[1].data.resultDescripcion + '</i>');
                    $scope.banderaErrorEstatus = true;
                }
            } else {
                mostrarMensajeWarningValidacion("<li>Ha ocurrido un error en la consulta de cat&aacute;logo de Estatus</i>");
                $scope.banderaErrorEstatus = true;
            }
            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        $scope.nfiltrofallas = $scope.nfiltrofallas ? $scope.nfiltrofallas : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result.incidentes);
                        $scope.filtrosInspector.fallas = $scope.realizarConversionAnidado(results[2].data.result.incidentes.filter(e => e.nivel <= parseInt($scope.nfiltrofallas)));
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
            if (results[3].data !== undefined) {
                if (results[3].data.respuesta) {
                    if (results[3].data.result) {
                        if (results[3].data.result.geografia) {
                            $scope.listadogeografiacopy = results[3].data.result.geografia
                            $scope.nfiltrogeografia = $scope.nfiltrogeografia ? $scope.nfiltrogeografia : $scope.obtenerNivelUltimoJerarquiaGeneric(results[3].data.result.geografia);
                            geografia = results[3].data.result.geografia.filter(e => e.nivel <= parseInt($scope.nfiltrogeografia));
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
                                $scope.btnAceptarGeografiaConsulta();
                                $scope.consultarIncidenciasInspector();
                            }).jstree({
                                'plugins': ["wholerow", "checkbox", "search"],
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
                            setTimeout(function () {
                                $scope.estatusSeleccion();
                                $scope.fallaSeleccion();
                            }, 500);
                        } else {
                            mostrarMensajeWarningValidacion('<li>No se encontraron datos para la geograf&iacute;a</li>Va');
                            $scope.banderaErrorGeografia = true;
                        }
                    } else {
                        mostrarMensajeWarningValidacion('<li>No se encontraron datos para la geograf&iacute;a</li>');
                        $scope.banderaErrorGeografia = true;
                    }
                } else {
                    mostrarMensajeWarningValidacion('<li>' + results[3].data.resultDescripcion + '</li>');
                    $scope.banderaErrorGeografia = true;
                }
            } else {
                mostrarMensajeWarningValidacion('<li>Ha ocurrido un error en la consulta de geograf&iacute;a</li>');
                $scope.banderaErrorGeografia = true;
            }
        });
    }

    mostarImagenesCarousel = function () {
        var $imageLinks = $('.imagen-carousel-falla');
        var items = [];
        $imageLinks.each(function (index, elemento) {
            var $item = $(this);
            var magItem = {
                src: $item.attr('src'),
                type: 'image'
            };
            magItem.title = $item.data('title');
            items.push(magItem);
        });
        $.magnificPopup.open({
            mainClass: 'mfp-fade',
            items: items,
            gallery: {
                enabled: true,
                tPrev: $(this).data('prev-text'),
                tNext: $(this).data('next-text')
            },
            type: 'image',
            callbacks: {
                beforeOpen: function () {
                    var index = $imageLinks.index(this.st.el);
                    if (-1 !== index) {
                        this.goTo(index);
                    }
                },
                open: function () {
                    // Disabling focus enforcement by magnific
                    $.magnificPopup.instance._onFocusIn = function (e) { };
                }
            }
        });
    }

    $(document.body).on("click", ".carousel-item", function () {
        $(".item-carousel").show();
        $('.carousel-inner:hidden').show(400);
        mostarImagenesCarousel();
        // setTimeout(function () { mostarImagenesCarousel(); }, 500);
    });

    retornarFormatoSliders = function (falla, contador) {
        var imgs_blocks = "";
        var indicators_carousel = "";

        $.each(falla.evidencias.detalleEvidencias, function (index, evidencia) {
            indicators_carousel += ' <li class="' + ((index === 0) ? 'active' : '') + '" data-target="#carouselExampleIndicators' + contador + '" data-slide-to="' + index + '" ></li>';
            if (evidencia.url === "") {
                imgs_blocks += '' +
                    '      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + ' ">' +
                    '        <img class="d-block img-fluid imagen-carousel-falla" style="width:100%; min-width: 100%; height: 100% !important;" src="' + contex_project + '/resources/img/generic/not_found.png" alt="First slide">' +
                    '      </div>';
            } else {
                imgs_blocks += '' +
                    '      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + '">' +
                    '        <img class="d-block img-fluid imagen-carousel-falla w-100" style="width:100%; min-width: 100%; height: 100% !important;" src="' + evidencia.url + '"" alt="First slide">' +
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
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + (falla.desUnidadNegocio == '' ? 'Sin informaci&oacute;n' : falla.desUnidadNegocio == null ? 'Sin informaci&oacute;n' : falla.desUnidadNegocio !== undefined ? falla.desUnidadNegocio : 'Sin informaci&oacute;n') + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">ID OT</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + (falla.idOt == 0 ? 'Sin OT' : falla.idOt == null ? 'Sin OT' : falla.idOt !== undefined ? falla.idOt : 'Sin OT') + '</span> </div>' +
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
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + (falla.descTipoFalla == null ? 'Sin informaci&oacute;n' : falla.descTipoFalla !== undefined ? falla.descTipoFalla : 'Sin informaci&oacute;n') + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">Detalle Falla</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + (falla.descSubtipoFalla == null ? 'Sin informaci&oacute;n' : falla.descSubtipoFalla !== undefined ? falla.descSubtipoFalla : 'Sin informaci&oacute;n') + '</span> </div>' +
            '</div>' +
            '<div class="container-fluid incidencia-content">' +
            '   <div class="container-text-title-detalle"><span class="text-title-incidencia">Comentario</span></div>' +
            '   <div class="container-text-content-detalle"><span class="text-content-incidencia">' + (falla.comentarios == null ? 'Sin informaci&oacute;n' : falla.comentarios !== undefined ? falla.comentarios : 'Sin informaci&oacute;n') + '</span> </div>' +
            '</div>';
    }

    desplazarDerechaTabs = function () {
        $('#headers_tab').animate({ scrollLeft: '+=100' }, 150);
    }

    desplazarIzquierdaTabs = function () {
        $('#headers_tab').animate({ scrollLeft: '-=100' }, 150);
    }

    $scope.inicializarDetalleIncidencia = function (latitud, longitud) {
        $("#container-declinarIncidencia").hide();
        $("#headers_tab").empty();
        $("#content_tabs").empty();
        $("#bodyFileDetallestatus tr").empty();
        let header_tabs = "";
        let content_tabs = "";
        $.each($scope.fallasIncidenciaDetalle, function (i, falla) {
            if (falla.evidencias.detalleEvidencias !== undefined && falla.evidencias.detalleEvidencias.length > 0) {
                contenido_imagenes = retornarFormatoSliders(falla, i);
            } else {
                contenido_imagenes =
                    '<h4 id="texto_not_arboles" style="color:#abafae; text-align:center">' +
                    '	SIN IM\u00C1GENES PARA ESTA FALLA' +
                    '</h4>';
            }
            header_tabs += '' +
                '<li class="nav-item" style="display: inline-block">' +
                '   <a class="nav-link ' + ((i === 0) ? "active" : "") + ' " id="header_tab_' + i + '" data-toggle="tab" href="#content_tab_' + i + '" role="tab" aria-controls="content_tab_' + i + '" aria-selected="true">Falla ' + (i + 1) + '</a>' +
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
        if ($scope.incidenciaDetalle.idEstatus == '5' || $scope.incidenciaDetalle.idEstatus == '2') {
            if ($scope.fallasIncidenciaDetalle.length > 5) {
                $('#containerTabsFalla').removeClass('row');
                $("#containerTabsFalla").css('width', '70%');
                $("#left-arrow").show();
                $("#right-arrow").show();
            } else {
                $('#containerTabsFalla').addClass('row');
                $("#left-arrow").hide();
                $("#right-arrow").hide();
                $("#containerTabsFalla").css('width', '100%');
            }
        } else {
            if ($scope.fallasIncidenciaDetalle.length > 9) {
                $('#containerTabsFalla').removeClass('row');
                $("#containerTabsFalla").css('width', '90%');
                $("#left-arrow").show();
                $("#right-arrow").show();
            } else {
                $('#containerTabsFalla').addClass('row');
                $("#left-arrow").hide();
                $("#right-arrow").hide();
                $("#containerTabsFalla").css('width', '100%');
            }
        }

        $("#headers_tab").append(header_tabs);
        $("#content_tabs").append(content_tabs);

        if ($scope.fallasIncidenciaDetalle) {
            $scope.isNavTab = false;
        } else {
            $scope.isNavTab = false;
            // $scope.isNavTab = true;
            let arraRow = [];

            // console.log($scope.fallasIncidenciaDetalle);
            $.each($scope.fallasIncidenciaDetalle, function (i, elemento) {
                let row = [];
                row[0] = elemento.NumEmpleado ? elemento.NumEmpleado : '-';
                row[1] = elemento.Empleado ? elemento.Empleado : '-';
                row[2] = elemento.Motivo ? elemento.Motivo : '-';
                row[3] = elemento.Fecha ? elemento.Fecha : '-';
                row[4] = elemento.Comentario ? elemento.Comentario : '-';
                row[5] = '<i class="fa fa-download style_icono_ajaxDownloadFile" title="Descargar evidencia" onclick="downloadFile(' + elemento.NombreArchivo + ',' + elemento.Url + ')"></i>';
                arraRow.push(row);
            })
            if (tableDetalleStatus) {
                tableDetalleStatus.destroy();
            }
            tableDetalleStatus = $('#tableDetalleStatus').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "pageLength": 5,
                "info": false,
                "data": arraRow,
                "autoWidth": true,
                "language": idioma_espanol_not_font
            });
        }
        swal.close();
    }

    consultarDetalleIncidencia = function (idIncidencia) {
        $scope.isInitDeclinar = false;
        $scope.incidenciaDetalle = $scope.incidencias.find((e) => e.idIncidencia == idIncidencia);
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();

        let params = {
            "idIncidencia": idIncidencia
        }

        inspectorIncidenciaService.consultarDetalleIncidenciaInspectorPE(params).then(function success(response) {
            console.log(response);
            if (response.data) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.detalleIncidentes.length) {
                            $scope.fallasIncidenciaDetalle = angular.copy(response.data.result.detalleIncidentes);
                            $scope.inicializarDetalleIncidencia($scope.incidenciaDetalle.latitud, $scope.incidenciaDetalle.longitud);

                            $scope.isBtnGenerarOT = $scope.llaveEstatusGeneraOT.find(function (elem) { return elem === $scope.incidenciaDetalle.idEstatus });
                            if ($scope.isPermisoGenerarOTInspector) {
                                if ($scope.isBtnGenerarOT !== undefined) {
                                    $scope.isGenerar = true;
                                } else if ($scope.incidenciaDetalle.idEstatus == '1' || $scope.incidenciaDetalle.idEstatus == '4') {
                                    $scope.isGenerar = true;
                                } else {
                                    $scope.isGenerar = false;
                                }
                            } else {
                                $scope.isGenerar = false;
                            }

                            // NUEVA
                            if ($scope.incidenciaDetalle.idEstatus == '1') {
                                $scope.isNavTab = false;
                                $scope.isRecuperar = false;
                                $scope.isDeclinar = true;
                                $("#containerModal").removeClass('col-10');
                                $("#containerModal").addClass('col-12');
                                $("#containerModal").css('margin-left', '1em');
                                $("#container-detalleIncidencia").show();
                                $("#container-declinarIncidencia").hide();
                                $("#containerFallas").show();
                                $("#containerFallas").css('margin-left', '0');
                                $("#containerFallas").css('padding-left', '0');
                                $("#containerStatusFallas").hide();
                            }

                            // DECLINADA
                            if ($scope.incidenciaDetalle.idEstatus == '2') {
                                // $scope.isNavTab = true;
                                $scope.isNavTab = false;
                                $scope.isRecuperar = true;
                                $scope.isDeclinar = false;
                                $("#containerModal").removeClass('col-12');
                                $("#containerModal").addClass('col-10');
                                $("#containerModal").css('margin-left', '0');
                                $("#informacion-incidencia").addClass('active');
                                $("#detalle-status").removeClass('active');
                                $("#container-detalleIncidencia").show();
                                $("#container-declinarIncidencia").hide();
                                $("#containerFallas").show();
                                $("#containerFallas").css('margin-left', '1em');
                            }

                            // GENERADA
                            if ($scope.incidenciaDetalle.idEstatus == '3') {
                                $scope.isNavTab = false;
                                $scope.isRecuperar = false;
                                $scope.isDeclinar = false;
                                $("#containerModal").removeClass('col-10');
                                $("#containerModal").addClass('col-12');
                                $("#containerModal").css('margin-left', '1em');
                                $("#container-detalleIncidencia").show();
                                $("#container-declinarIncidencia").hide();
                                $("#containerFallas").css('margin-left', '0');
                                $("#containerFallas").css('padding-left', '0');
                                $("#containerFallas").show();
                                $("#containerStatusFallas").hide();
                            }

                            // RECUPERADA
                            if ($scope.incidenciaDetalle.idEstatus == '4') {
                                $scope.isNavTab = false;
                                $scope.isRecuperar = false;
                                $scope.isDeclinar = true;
                                $("#containerModal").removeClass('col-10');
                                $("#containerModal").addClass('col-12');
                                $("#containerModal").css('margin-left', '1em');
                                $("#container-detalleIncidencia").show();
                                $("#container-declinarIncidencia").hide();
                                $("#containerFallas").css('margin-left', '1em');
                                $("#containerFallas").show();
                                $("#containerStatusFallas").hide();
                            }

                            // ATENDIDA
                            if ($scope.incidenciaDetalle.idEstatus == '5') {
                                // $scope.isNavTab = true;
                                $scope.isNavTab = false;
                                $scope.isRecuperar = true;
                                $scope.isDeclinar = false;
                                $("#containerModal").removeClass('col-12');
                                $("#containerModal").addClass('col-10');
                                $("#containerModal").css('margin-left', '0');
                                $("#container-detalleIncidencia").show();
                                $("#container-declinarIncidencia").hide();
                                $("#informacion-incidencia").addClass('active');
                                $("#detalle-status").removeClass('active');
                                $("#containerFallas").css('margin-left', '1em');
                                $("#containerFallas").show()
                            }
                            $("#modalDetalleIncidencia").modal('show');
                            $("#container-declinarIncidencia").hide();
                        } else {
                            mostrarMensajeInformativo("No se encontr&oacute; Detalle de la Incidencia");
                            swal.close();
                        }
                    } else {
                        mostrarMensajeWarningValidacion(response.data.result.description);
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarningValidacion(response.data.result.description);
                    swal.close();
                }
            } else {
                mostrarMensajeWarningValidacion(response.data.result.description);
                swal.close();
            }
        })
    }

    pintarUbicacionIncidencia = function (indexI) {
        $scope.mostrarOcultarMapa("pintarUbicacion")
        let isUbicacion = false;
        let index = 0;
        $scope.incidenciaSeleccionada = $scope.incidencias[indexI];
        $.each(markers, function (i, elemento) {
            if (elemento.id_marker == $scope.incidenciaSeleccionada.idIncidencia) {
                index = i;
                $('#incidencia_' + $scope.incidenciaSeleccionada.idIncidencia).css('background', '');
                elemento.setMap(null);
                isUbicacion = true;
                return;
            }
        });

        if (!isUbicacion) {
            $scope.pintarUbicacion($scope.incidenciaSeleccionada);
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

    $scope.pintarUbicacion = function (incidenciaUb) {
        $('#incidencia_' + incidenciaUb.idIncidencia).css('background', '#d3d3d3');
        var myLatlng = new google.maps.LatLng(incidenciaUb.latitud, incidenciaUb.longitud);
        var contentMarker =
            '<div id="content">' +
            '   <div id="siteNotice">' +
            '   </div>' +
            '   <h4 id="firstHeading" class="firstHeading"></h4>' +
            '   <div id="bodyContent">' +
            '       <b><strong style="color:#014c8c;">Reporta:</strong></b>&nbsp;' + incidenciaUb.usuarioReporta + '<br>' +
            '       <br><b><strong style="color:#014c8c;">Falla:</strong></b>&nbsp;' + incidenciaUb.desTipoIncidencia +
            '       <br><br><b><strong style="color:#014c8c;">Fecha:</strong></b>&nbsp;' + incidenciaUb.fechaRegistro +
            '       <br><br><b><strong style="color:#014c8c;">Latitud:</strong></b>&nbsp;' + incidenciaUb.latitud +
            '       <br><br><b><strong style="color:#014c8c;">Longitud:</strong></b>&nbsp;' + incidenciaUb.longitud +
            '       <br><br><button onclick="consultarDetalleIncidencia(' + incidenciaUb.idIncidencia + ')" class="btn-block btn btn-sm btn-outline-primary">Detalle</button>' +
            '   </div>' +
            '</div>';
        var infowindows = new google.maps.InfoWindow({
            content: contentMarker
        });
        mapInspector.setCenter(new google.maps.LatLng(incidenciaUb.latitud, incidenciaUb.longitud));
        mapInspector.setZoom(15);
        marker = new google.maps.Marker({
            id_marker: incidenciaUb.idIncidencia,
            title: incidenciaUb.usuarioReporta,
            map: mapInspector,
            animation: google.maps.Animation.DROP,
            position: myLatlng,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5.5,
                fillColor: incidenciaUb.colorEstatus,
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
        $('#select-motivo-rechazar').val("");
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
        $scope.incidenciaDeclinar.motivoDeclinar = motivoRechazo;
        let mensajeError = "";
        let isValid = true;

        if (!$scope.motivoDeclinar || motivoRechazo === undefined) {
            mensajeError += "<li> Ingresa los campos requeridos </li>";
            isValid = false;
        }
        if (document.querySelector('#file').files[0] === undefined) {
            mensajeError += "<li>Ingrese un archivo</li>";
            isValid = false;
        }
        if ($('#select-motivo-rechazar').val() === undefined || $('#select-motivo-rechazar').val() === "" || !$scope.motivoDeclinar.motivo) {
            mensajeError += "<li>Seleccione un motivo</li>";
            isValid = false;
        }
        if ($('#comentariosRechazoPI').val() === undefined || $('#comentariosRechazoPI').val() === "") {
            mensajeError += "<li>Ingrese un comentario</li>";
            isValid = false;
        }
        if (isValid) {
            swal({
                title: " Descartar\u00E1s la incidencia " + $scope.incidenciaDetalle.idIncidencia + " ",
                showCancelButton: true,
                type: 'warning',
                reverseButtons: true,
                cancelButtonColor: '#A39F9F',
                confirmButtonColor: '#1265EE',
                cancelButtonText: "Cancelar",
                confirmButtonText: 'Confirmar',
            }).then(function () {
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
                inspectorIncidenciaService.cambiarStatusIncidenciaInspectorPE(params).then(function success(respnose) {
                    $('#modalDetalleIncidencia').modal('toggle');
                    swal.close();
                    mostrarMensajeExitoAlert("Incidencia declinada con exito");
                })
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.recuperarIncidencia = function () {
        swal({
            title: " Recuperar\u00E1s la incidencia " + $scope.incidenciaDetalle.idIncidencia + " ",
            text: "Comentarios:",
            type: "warning",
            input: "textarea",
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'S\u00ED, recuperar',
            cancelButtonText: "Cancelar",
        }).then(function (comentarioRecuperar) {
            if (comentarioRecuperar == '') {
                mostrarMensajeWarningValidacion('<li>Para recuperar la Incidencia debe de ingresar un comentario</li>');
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
                    mostrarMensajeExitoAlert("Incidencia recuperada con &eacute;xito");
                });
            }
        }).catch(err => {
            mostrarMensajeWarningValidacion('Operaci&oacute;n cancelada');
        });
    }

    $scope.generarOTIncidencia = function () {
        $('.swal2-container.swal2-shown ').css('background-color', '#fff');
        swal({
            title: "\u00BFDeseas generar la Orden de Trabajo?",
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
                mostrarMensajeWarningValidacion('<li>Para generar la incidencia como OT debe de ingresar un comentario</li>');
            } else {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                let params = {
                    "idIncidencia": Number($scope.incidenciaDetalle.idIncidencia),
                    "idGeografia": Number($scope.incidenciaDetalle.idGeografia),
                    "idOrigenSistema": 1,
                    "idTipoFalla": Number($scope.incidenciaDetalle.idTipoIncidencia),
                    "idSubtipoFalla": Number($scope.incidenciaDetalle.idSubtipoIncidencia),
                    "latitud": Number($scope.incidenciaDetalle.latitud),
                    "longitud": Number($scope.incidenciaDetalle.longitud),
                    "comentarios": comentarioGenerar,
                    "informacionAdicional": [{}]
                }
                // console.log(params);
                inspectorIncidenciaService.generarOTIncidenciaInspectorPE(params).then(function success(response) {
                    console.log(response);
                    if (response.data) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                $('#modalDetalleIncidencia').modal('toggle');
                                $scope.consultarIncidenciasInspector();
                                swal.close();
                                mostrarMensajeExitoAlert("OT generada con &eacute;xito");
                            } else {
                                mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                                swal.close();
                            }
                        } else {
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                            swal.close();
                        }
                    } else {
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                        swal.close();
                    }
                });
            }
        }).catch(err => {
            mostrarMensajeWarningValidacion('Operaci&oacute;n cancelada');
        });
    }

    $scope.convertFile = function (e, type) {
        // console.log(e);
        if (e.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                let fileBase64 = reader.result.toString().split(",")[1];
                // console.log(fileBase64);
                $scope.nombreFileDeclinaInc = e.target.files[0].name;
                $scope.incidenciaDeclinar.file = fileBase64;
                // console.log($scope.incidenciaDeclinar.file)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[0] + '-' + fechaPrueba[1] + '-' + fechaPrueba[2];
    }

    $scope.consultarIncidenciasInspector = function () {
        if ($scope.isPermisoConsultaIncidencias) {
            let mensajeError = '';
            let isValid = true;

            if (!$scope.validarFecha("filtro_fecha_inicio_inspectorincidencia", "filtro_fecha_fin_inspectorincidencia")) {
                mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
                isValid = false;
            }

            let clustersSelected = $("#jstree-proton-3").jstree("get_selected", true)
                .filter(e => e.original.nivel == $scope.nfiltrogeografia)
                .map(e => parseInt(e.id))

            if (clustersSelected.length == 0) {
                mensajeError += "<li>Selecciona geograf\u00EDa</li>";
                isValid = false;
            }

            let fallasSelected = []
            let nivelFalla = $scope.nfiltrofallas;
            angular.forEach($scope.filtrosInspector.fallas, (e, i) => {
                e.children.map((k) => {
                    if (k.checkedOpcion && nivelFalla == k.nivel) {
                        fallasSelected.push(Number(k.id));
                    }
                });
                if (e.checkedOpcion && nivelFalla == e.nivel) {
                    fallasSelected.push(Number(e.id));
                }
            });

            if (fallasSelected.length === 0) {
                mensajeError += '<li>Selecciona al menos una falla</li>';
                isValid = false
            }

            let statusSelected = [];
            let isSelectedOneStatus = false;
            $.each($scope.listCatEstatus, function (i, elemento) {
                if (elemento.checkedOpcion) {
                    statusSelected.push(Number(elemento.id));
                    isSelectedOneStatus = true;
                    return;
                }
            })
            if (!isSelectedOneStatus) {
                mensajeError += "<li>Selecciona al menos un estatus de falla</li>";
                isValid = false;
            }

            if (isValid) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                $scope.initMapa();
                let params = {
                    "idEstatus": statusSelected,
                    "idSubTipoFallas": fallasSelected,
                    "idGeografias": clustersSelected,
                    "fechaInicio": $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_inspectorincidencia').value),
                    "fechaFin": $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_inspectorincidencia').value)
                };
                // console.log(params)
                inspectorIncidenciaService.consultarIncidenciasInspectorPE(params).then(function success(response) {
                    console.log(response);
                    if (response.data) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                if (response.data.result.detalleIncidencias.length) {
                                    let arrayRow = [];
                                    if (incidenciaTable) {
                                        incidenciaTable.destroy();
                                    }
                                    $scope.incidencias = response.data.result.detalleIncidencias;
                                    $.each($scope.incidencias, function (i, elemento) {
                                        let row = [];
                                        row[0] = elemento.idIncidencia ? elemento.idIncidencia : "";
                                        row[1] = elemento.nombreGeografia ? elemento.nombreGeografia : "";
                                        row[2] = elemento.desTipoIncidencia ? elemento.desTipoIncidencia : "";
                                        row[3] = elemento.descEstatus ? elemento.descEstatus : "";
                                        row[4] = elemento.numeroEmpleado ? elemento.numeroEmpleado : "";
                                        row[5] = elemento.usuarioReporta ? elemento.usuarioReporta : "";
                                        row[6] = (elemento.fechaRegistro ? elemento.fechaRegistro : "") + " " + (elemento.horaRegistro ? elemento.horaRegistro : "");
                                        row[7] = '<div class="col-12 text-center">' +
                                            '<div class="row">' +
                                            '   <div class="col-6">' +
                                            '       <span title="Detalle" style="background-color: #7716fa; cursor: pointer; border: 1px solid #7716fa;" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" id="detalleIncidencia' + elemento.idIncidencia + '" onclick="consultarDetalleIncidencia(' + elemento.idIncidencia + ');">' +
                                            '           <i class="fa fa-bars"></i>' +
                                            '       </span>' +
                                            '   </div>' +
                                            '   <div class="col-6">' +
                                            '       <span title="Ubicaci&oacute;n" style="border: 1px solid ' + elemento.colorEstatus + '; background-color: #ffff; cursor: pointer;" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" onclick="pintarUbicacionIncidencia(' + i + ')">' +
                                            '           <i class="fa fa-globe-americas" style="color: ' + elemento.colorEstatus + ';"></i>' +
                                            '       </span> ' +
                                            '   </div>' +
                                            '</div>' +
                                            '</div>';
                                        arrayRow.push(row);
                                    })
                                    incidenciaTable = $('#tableIncidencia').DataTable({
                                        "paging": true,
                                        "lengthChange": false,
                                        "ordering": false,
                                        "pageLength": 10,
                                        "info": true,
                                        "data": arrayRow,
                                        "autoWidth": true,
                                        "language": idioma_espanol_not_font,
                                        'fnCreatedRow': function (nRow, aData, iDataIndex) {
                                            $(nRow).attr('id', 'incidencia_' + aData[0]);
                                        },
                                    });
                                    document.getElementById('tableIncidencia').addEventListener('click', function () {
                                        $('#tableIncidencia tbody tr').css('background', '');
                                        $.each(markers, function (i, elemento) {
                                            $('#incidencia_' + elemento.id_marker).css('background', '#d3d3d3');
                                        });
                                        $scope.$apply();
                                    })
                                    $scope.mostrarOcultarMapa("consultaGeneral");
                                    swal.close();
                                } else {
                                    $scope.mostrarOcultarMapa("consultaGeneral");
                                    mostrarMensajeInformativo("No se encontraron Incidencias");
                                    swal.close();
                                }
                            } else {
                                $scope.mostrarOcultarMapa("consultaGeneral");
                                mostrarMensajeErrorAlert(response.data.resultDescripcion);
                                swal.close();
                            }
                        } else {
                            $scope.mostrarOcultarMapa("consultaGeneral");
                            mostrarMensajeInformativo("No se encontraron Incidencias");
                            swal.close();
                        }
                    } else {
                        $scope.mostrarOcultarMapa("consultaGeneral");
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                        swal.close();
                    }
                })
            } else {
                mostrarMensajeWarningValidacion(mensajeError);
            }
        }
    }

    $scope.widthTable = 95;
    $scope.widthMap = 5;
    $scope.mostrarMapa = false;
    $scope.mostrarOcultarMapa = function (accion) {
        if (accion == 'consultaGeneral') {
            if ($scope.mostrarMapa) {
                incidenciaTable.column(3).visible(false);
                incidenciaTable.column(4).visible(false);
                incidenciaTable.column(5).visible(false);
                $("#tableIncidencia_info").css('white-space', 'normal');
            } else {
                incidenciaTable.column(3).visible(true);
                incidenciaTable.column(4).visible(true);
                incidenciaTable.column(5).visible(true);
                $("#tableIncidencia_info").css('white-space', 'normal');
            }
        } else if (accion == 'mostrarMapa') {
            if ($scope.mostrarMapa) {
                $scope.mostrarMapa = false;
                $scope.mostrarMapa2 = false;
                $scope.widthTable = 95;
                $scope.widthMap = 5;
                incidenciaTable.column(3).visible(true);
                incidenciaTable.column(4).visible(true);
                incidenciaTable.column(5).visible(true);
                $("#tableIncidencia_info").css('white-space', 'normal');
            } else {
                incidenciaTable.column(3).visible(false);
                incidenciaTable.column(4).visible(false);
                incidenciaTable.column(5).visible(false);
                $("#tableIncidencia_info").css('white-space', 'normal');
                $scope.mostrarMapa = true;
                $scope.widthTable = 45;
                $scope.widthMap = 55;
            }
        } else if (accion == 'pintarUbicacion') {
            incidenciaTable.column(3).visible(false);
            incidenciaTable.column(4).visible(false);
            incidenciaTable.column(5).visible(false);
            $("#tableIncidencia_info").css('white-space', 'normal');
            $scope.mostrarMapa = true;
            $scope.widthTable = 45;
            $scope.widthMap = 55;
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

    //MÉTODO PARA BUSCAR GEOGRAFÍAS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - CONSULTA GENERAL DE INCIDENCIAS
    $scope.busquedaGeografiaConsultaIncidencias = function () {
        $("#jstree-proton-3").jstree("search", $('#buscadorGeografiaConsultaIncidencias').val());
    }

    angular.element(document).ready(function () {
        $("#moduloInspectorIncidenciasPE").addClass('active');
        $scope.consultarCatalogosInspectorIncidencia();
        $scope.initMapa();
        $scope.initInspectorIncidencia();
        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            // Get the column API object
            var column = table.column($(this).attr('data-column'));
            // console.log(column);
            // Toggle the visibility
            column.visible(!column.visible());
        });
        var $form = $('.form_drag_drop');
        var droppedFiles = false;
        $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
        }).on('dragover dragenter', function () {
            $form.addClass('is-dragover');
        }).on('dragleave dragend drop', function () {
            $form.removeClass('is-dragover');
        }).on('drop', function (e) {
            droppedFiles = e.originalEvent.dataTransfer.files;
            $form.find('input[type="file"]').prop('files', droppedFiles);
            $(".text_select").text(droppedFiles[0].name);
            $(".box__dragndrop").empty()
        });
    });

    // NUEVO
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

    $("#fileArch").change(function () {
        if ($('#fileArch').get(0).files[0] === undefined) {
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
        } else {
            $(".text_select").text($('#fileArch').get(0).files[0].name);
            $(".box__dragndrop").empty()
        }
    });
}]);