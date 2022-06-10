var app = angular.module('vistaChecklistApp', []);

app.controller('vistaChecklistController', ['$scope', '$q', 'vistaChecklistService', '$filter', 'genericService', function ($scope, $q, vistaChecklistService, $filter, genericService) {
    var regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    let evidenciasTable;
    $scope.listaEvidencias = [];
    $scope.detalleEvidencia = [];
    $scope.nGeografia = '';
    $scope.listaGeografia = [];
    $scope.listImagenesTipo = [];
    $scope.listaTotal = { aceptadas: 0, rechazadas: 0 };
    $scope.nInterveciones = '';
    $scope.arrayIntervenciones = []
    $scope.arrayEstatus = []
    $scope.nFiltroEstatus = ''
    $scope.respaldoArrayEstatus = []
    $scope.camposFiltro = {
        idot: '',
        idos: ''
    }

    $scope.configPermisoAccionActualizaEvidencia = false;
    $scope.configPermisoAccionConsultaEvidencia = false;
    $scope.configPermisoAccionConsultaOt = false;

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    angular.element(document).ready(function () {
        $("#modalGeografia").on("hidden.bs.modal", function () {
            var geografias = $('#jstreeConsulta').jstree("get_selected", true);
            let textoGeografias = [];
            angular.forEach(geografias, (geografia, index) => {
                textoGeografias.push(geografia.text);
            });
            $('#filtro_geografia').val(textoGeografias);
        })
    });


    evidenciasTable = $('#evidenciasTable').DataTable({
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

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        language: 'es',
        todayHighlight: true,
        clearBtn: false
    });
    $('.datepicker').datepicker('update', new Date());

    $('#searchTextGeneral').on('keyup', function () {
        evidenciasTable.search(this.value).draw();
    })

    $('#searchGeoConsulta').on('keyup', function () {
        $("#jstreeConsulta").jstree("search", this.value);
    })

    $("#modalDetalle").on("hidden.bs.modal", function () {
        $(".radio-evidencias").prop("checked", false);
        $(".checkbox-evidencia").prop("checked", false);
        $(".checkbox-evidencia").removeClass("rechazada-check");
        $scope.listaTotal = { aceptadas: 0, rechazadas: 0 };
    })


    $scope.obtenerNivelUltimoJerarquia = function (data) {
        return data.sort(compareGeneric)[0].nivel
    }

    $scope.respaldoIntervecionesArray = [];
    $scope.getInformacionGeneral = function () {
        $q.all([
            vistaChecklistService.consultarConfiguracion({ "moduloAccionesUsuario": "moduloChecklist" }),
            vistaChecklistService.consultarGeografiaChecklist(),
            genericService.consultarCatalogoIntervenciones(),
            genericService.consultarCatalogoEstatusDespachoPI()
        ]).then(function (results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        let resultConf = results[0].data.result
                        if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                            let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                            $scope.nGeografia = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_FILTRO_GEOGRAFIA ? Number(results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_FILTRO_GEOGRAFIA) : null;
                            $scope.nInterveciones = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_FILTRO_INTERVENCIONES ? Number(results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_FILTRO_INTERVENCIONES) : null;
                            $scope.nfiltroestatusDisponbiles = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_ESTATUS_ARRAY ? results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_ESTATUS_ARRAY : null;
                            $scope.nFiltroEstatus = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_ESTATUS_PENDIENTES ? Number(results[0].data.result.MODULO_ACCIONES_USUARIO.llaves.N_ESTATUS_PENDIENTES) : null;
                            $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
                            validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                            validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
                            validateCreedText = llavesResult.KEY_TEXTFORMATO_CREED_RES ? KEY_TEXTFORMATO_CREED_RES : '';                           
                        }
                        if (resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.permisos && resultConf.MODULO_ACCIONES_USUARIO.permisos != "") {
                            $scope.configPermisoAccionConsultaOt = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaOtChecklist" })[0] != undefined);
                            $scope.configPermisoAccionConsultaEvidencia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaEvidenciaChecklist" })[0] != undefined);
                            $scope.configPermisoAccionActualizaEvidencia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionActualizaEvidenciaChecklist" })[0] != undefined);
                        }
                        $("#idBody").css("display", "block");



                    } else {
                        toastr.warning('No se encontraron datos para la configuraci\u00F3n');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de configuraci\u00F3n');
            }

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        if (results[1].data.result.geografia || results[1].data.result.geografia.length > 0) {

                            $scope.nGeografia = $scope.nGeografia ? $scope.nGeografia : $scope.obtenerNivelUltimoJerarquia(results[1].data.result.geografia);
                            let listGeo = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });
                            $scope.listaGeografia = listGeo;
                            let geografia = listGeo;
                            geografia.map((e) => {
                                e.parent = e.padre == null ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: true,
                                    selected: true,
                                }
                                return e
                            })
                            $('#jstreeConsulta').bind('loaded.jstree', function (e, data) {
                                var geografias = $('#jstreeConsulta').jstree("get_selected", true);
                                let textoGeografias = [];
                                angular.forEach(geografias, (geografia, index) => {
                                    textoGeografias.push(geografia.text);
                                });
                                $('#filtro_geografia').val(textoGeografias);
                                if ($scope.configPermisoAccionConsultaOt) {
                                    $scope.consultaEvidencias();
                                }

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

                        } else {
                            mostrarMensajeWarningValidacion('No existen geograf\u00EDas actualmente')
                        }
                    } else {
                        toastr.warning('No se encontraron datos para la geograf\u00EDa');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de la geograf\u00EDa');
            }

            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        $scope.respaldoIntervecionesArray = results[2].data.result
                        $scope.nInterveciones = $scope.nInterveciones ? $scope.nInterveciones : $scope.obtenerNivelUltimoJerarquia(results[2].data.result);

                        $scope.arrayIntervenciones = $scope.conversionAnidadaRecursiva($scope.respaldoIntervecionesArray, 1, $scope.nInterveciones)

                        $scope.pintarNombreEstatus($scope.arrayIntervenciones, '#filtro-intervencion');

                    } else {
                        toastr.info('No se encontraron intervenciones');
                    }
                } else {
                    toastr.warning(results[2].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de intervenciones');
            }

            if (results[3].data !== undefined) {
                if (results[3].data.respuesta) {
                    if (results[3].data.result) {
                        $scope.respaldoArrayEstatus = results[3].data.result
                        $scope.nFiltroEstatus = $scope.nFiltroEstatus ? $scope.nFiltroEstatus : $scope.obtenerNivelUltimoJerarquia(results[3].data.result);
                        console.log($scope.nfiltroestatusDisponbiles);
                        if ($scope.nfiltroestatusDisponbiles != undefined && $scope.nfiltroestatusDisponbiles) {
                            let tempSlice = $scope.nfiltroestatusDisponbiles.split(",").map(e => parseInt(e));
                            let tempArray = []
                            angular.forEach(tempSlice, function (elm, index) {
                                let elemEstatus = angular.copy(results[3].data.result.find(e => e.id == elm))
                                if (!elemEstatus != undefined)
                                    tempArray.push(elemEstatus)
                            });
                        } else {
                            $scope.arrayEstatus = $scope.conversionAnidadaRecursiva(results[3].data.result, 1, $scope.nFiltroEstatus)
                            console.log($scope.arrayEstatus);
                        }
                        $scope.pintarNombreEstatus($scope.arrayEstatus, '#filtro-estatus-substatus');

                    } else {
                        toastr.info('No se encontraron estatus');
                    }
                } else {
                    toastr.warning(results[3].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de estatus');
            }


        }).catch(err => handleError(err));
    }

    $scope.getInformacionGeneral();

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }

    validarFecha = function () {
        if (document.getElementById('filtro_fecha_inicio').value.trim() != "" && document.getElementById('filtro_fecha_fin').value.trim() != "") {
            var inicio = document.getElementById('filtro_fecha_inicio').value.split('/');
            var fin = document.getElementById('filtro_fecha_fin').value.split('/');
            var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
            var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
            if (date_inicio <= date_fin) {
                return true;
            } else {
                return false;
            }
        }
    }

    $scope.consultaEvidencias = function () {
        let isValido = true;
        let errorMensaje = '';

        let intervenciones = []
        if ($scope.nInterveciones) {
            intervenciones = $scope.obtenerElementosSeleccionadosFiltro($scope.arrayIntervenciones, $scope.nInterveciones);
        } else {
            let ultimoNivel = $scope.obtenerNivelUltimoJerarquia($scope.respaldoIntervecionesArray)
            intervenciones = $scope.obtenerElementosSeleccionadosFiltro($scope.arrayIntervenciones, ultimoNivel);
        }


        let estatusDisponiblesCheck = [];
        if ($scope.nFiltroEstatus) {
            estatusDisponiblesCheck = $scope.obtenerElementosSeleccionadosFiltro($scope.arrayEstatus, $scope.nFiltroEstatus);
        } else {
            let ultimoNivelEstatus = $scope.obtenerNivelUltimoJerarquia($scope.respaldoArrayEstatus)
            estatusDisponiblesCheck = $scope.obtenerElementosSeleccionadosFiltro($scope.arrayEstatus, ultimoNivelEstatus);
        }


        let clustersparam = []
        if ($scope.nGeografia) {
            clustersparam = $("#jstreeConsulta").jstree("get_selected", true)
                .filter(e => e.original.nivel == $scope.nGeografia)
                .map(e => parseInt(e.id))
        } else {
            let nivelBusquedaArbol = $scope.obtenerNivelUltimoJerarquia($scope.listaGeografia)
            clustersparam = $("#jstreeConsulta").jstree("get_selected", true)
                .filter(e => e.original.nivel == nivelBusquedaArbol)
                .map(e => parseInt(e.id))
        }

        if ($.trim(document.getElementById('idot').value) !== '') {
            if (!($.isNumeric($.trim(document.getElementById('idot').value)))) {
                errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
                isValido = false;
            }
        }

        if (estatusDisponiblesCheck.length === 0) {
            errorMensaje += '<li>Seleccione estatus.</li>';
            isValido = false
        }

        if (intervenciones.length === 0) {
            errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
            isValido = false
        }

        if (clustersparam.length === 0) {
            errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
            isValido = false
        }

        if (!validarFecha()) {
            $('.datepicker').datepicker('update', new Date());
            errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
            isValido = false
        }


        if (isValido) {
            let params = {
                idOrden: $scope.camposFiltro.idot,
                folioSistema: $scope.camposFiltro.idos,
                idSubTipoOrdenes: intervenciones,
                idEstatus: estatusDisponiblesCheck,
                idClusters: clustersparam,
                fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio').value),
                fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin').value),
                elementosPorPagina: 10
            }

            evidenciasTable = $('#evidenciasTable').DataTable({
                "processing": false,
                "ordering": false,
                "serverSide": true,
                "scrollX": false,
                "bDestroy": true,
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "ajax": {
                    "url": "req/consultarEvidencias",
                    "type": "POST",
                    "data": params,
                    "beforeSend": function () {
                        if (!swal.isVisible()) {
                            swal({ text: 'Cargando registros...', allowOutsideClick: false });
                            swal.showLoading();
                        }
                    },
                    "dataSrc": function (json) {
                        return json.data;
                    },
                    "error": function (xhr, error, thrown) {
                        handleError(xhr);
                    },
                    "complete": function () {
                        swal.close()
                    }
                },
                "language": idioma_espanol_not_font,
                "drawCallback": function (settings) {
                    if (!$scope.configPermisoAccionConsultaEvidencia) {
                        $(".btn-evidencia").addClass("estiloBlockIconoPermiso");
                        $(".btn-evidencia i").removeClass("fa-exchange-alt");
                        $(".btn-evidencia i").addClass("fa-unlock");
                    }
                }
            });
        } else {
            mostrarMensajeWarningValidacion(errorMensaje);
        }
    }

    let groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };


    consultaDetalle = function (id, usuario) {
        if ($scope.configPermisoAccionConsultaEvidencia) {
            let params = {
                idOt: id,
                idUsuario: usuario
            }
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            vistaChecklistService.consultarDetalleEvidencia(params).then(function success(response) {
                swal.close();
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            $scope.detalleEvidencia = response.data.result;
                            $scope.detalleEvidencia.tipos = [];
                            $scope.listImagenesTipo = response.data.result.evidencias;

                            let listaTipos = [];
                            let aceptadas = 0;
                            let rechazadas = 0;
                            let urlTec = regexUrl.test($scope.detalleEvidencia.urlFotoPerfil) ? $scope.detalleEvidencia.urlFotoPerfil : "./resources/img/plantainterna/despacho/tecnicootasignada.png";
                            $("#fotoTecnico").attr("src", urlTec);
                            var count_cantidad_por_tipo = groupBy(response.data.result.evidencias, 'idEvidencia');
                            response.data.result.evidencias.map(function (e) {
                                aceptadas = aceptadas + (e.idEstatus == 2 ? 1 : 0);
                                rechazadas = rechazadas + (e.idEstatus == 3 ? 1 : 0);
                                let isExist = listaTipos.find((t) => e.idEvidencia == t.id)
                                if (!isExist) {
                                    let imagenes = [];
                                    if (count_cantidad_por_tipo[e.idEvidencia].length) {
                                        imagenes = count_cantidad_por_tipo[e.idEvidencia]
                                    }
                                    listaTipos.push(
                                        {
                                            id: e.idEvidencia,
                                            descripcion: e.clasificacion,
                                            imagenes: imagenes
                                        }
                                    )
                                }
                            });
                            $scope.listaTotal.rechazadas = rechazadas;
                            $scope.listaTotal.aceptadas = aceptadas;
                            $scope.detalleEvidencia.tipos = listaTipos;

                            $("#modalDetalle").modal('show');
                            setTimeout(function () {
                                $("#categoria_img_0").click();
                            }, 100);

                        } else {
                            toastr.info('No se encontraron evidencias');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta');
                }
            }).catch(err => handleError(err));
        }

    }


    $scope.abrirModalGeografia = function () {
        $("#searchGeoConsulta").val("");
        $("#jstreeConsultaTecnicos").jstree("search", '');
        $("#modalGeografia").modal('show');
        setTimeout(function () {
            $("#searchGeoConsulta").focus();
        }, 750);
    }

    $scope.seleciconarTodas = function (isSelected) {
        if (isSelected == '1') {
            $(".checkbox-evidencia").prop("checked", true);
            $(".checkbox-evidencia").removeClass("rechazada-check");
            $scope.listaTotal.aceptadas = $scope.detalleEvidencia.evidencias.length;
            $scope.listaTotal.rechazadas = 0;
        } else {
            $(".checkbox-evidencia").prop("checked", false);
            $(".checkbox-evidencia").addClass("rechazada-check");
            $scope.listaTotal.rechazadas = $scope.detalleEvidencia.evidencias.length;
            $scope.listaTotal.aceptadas = 0;
        }
    }

    $scope.changeSelect = function (element) {
        if ($scope.configPermisoAccionActualizaEvidencia) {
            $(".radio-evidencias").prop("checked", false);
            let id = element.target.id;
            $.each($scope.listImagenesTipo, function (e, img) {
                if (id.split('_')[1] == img.id) {
                    img.idEstatus = $("#" + id).is(":checked") ? 2 : 3;
                }
            })
            if ($("#" + id).is(":checked")) {
                $("#" + id).removeClass("rechazada-check");
                $scope.listaTotal.rechazadas = $(".rechazada-check").length;
                $scope.listaTotal.aceptadas = $scope.listaTotal.aceptadas + 1;
            } else {
                $("#" + id).addClass("rechazada-check");
                $scope.listaTotal.aceptadas = $scope.listaTotal.aceptadas !== 0 ? $scope.listaTotal.aceptadas - 1 : 0;
                $scope.listaTotal.rechazadas = $(".rechazada-check").length;
            }
        }

    }

    $scope.guardarEvidencia = function () {

        let objectGroup = groupBy($scope.detalleEvidencia.evidencias, 'arreglo');
        let arrayList = Object.keys(objectGroup).map(function (key) { return objectGroup[key]; });
        let newObjectGroup = {};
        let isSelected = false;
        $.each(arrayList, function (e, categoria) {
            let aceptadas = [];
            let rechazadas = [];

            $.each(categoria, function (i, elemento) {
                if ($("#check_" + elemento.id).is(":checked")) {
                    aceptadas.push(elemento.id);
                }
            });

            $.each(categoria, function (i, elemento) {
                if ($("#check_" + elemento.id).hasClass("rechazada-check")) {
                    rechazadas.push(elemento.id);
                }
            });

            if (aceptadas.length || rechazadas.length) {
                let nombreGrupo = arrayList[e][0].arreglo;
                let list = [];

                if (aceptadas.length) {
                    let obj = {
                        idEstatus: 2,
                        idEvidencia: aceptadas,
                    }
                    list.push(obj);
                }

                if (rechazadas.length) {
                    let obj = {
                        idEstatus: 3,
                        idEvidencia: rechazadas
                    }
                    list.push(obj);
                }
                newObjectGroup[nombreGrupo] = list;
                isSelected = true;
            }
        })
        if (!isSelected) {
            toastr.warning('Selecciona la evidencia');
            return false;
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        vistaChecklistService.guardarEvidencia(newObjectGroup).then(function success(response) {
            swal.close();
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    toastr.success('Las evidencias se guardaron con &eacute;xito');
                    $("#modalDetalle").modal('hide');
                } else {
                    toastr.error('No se guardaron las evidencias');
                }
            } else {
                toastr.error('Ocurri&oacute; un arror al guardar la evidencia');
            }
        }).catch(err => handleError(err));
    }


    $scope.applyMagnific = function () {
        var id_categoria = $.trim($(this).attr('attr_id_cat'));

        if (id_categoria === '') {
            $(".magnific.item").show();
            $('.imagen_content:hidden').show(400);
            setTimeout(function () { mostarImagenesCategoria(); }, 500);

        } else {
            if ($(".imagen_content:visible").length > 0) {
                $(".imagen_content:visible").hide(150, "linear", function () {

                    $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                    $(".magnific.item.imgtipo_" + id_categoria + "").show();

                    $('.content_img_' + id_categoria).show(200);
                    //Manda function magnific popup
                    mostarImagenesCategoria();
                });
            } else {
                $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                $(".magnific.item.imgtipo_" + id_categoria + "").show();

                $('.content_img_' + id_categoria).show(200);
                //Manda function magnific popup
                mostarImagenesCategoria();
            }

        }

    };

    mostarImagenesCategoria = function () {
        var $imageLinks = $('.magnific.item:visible');
        var items = [];

        $imageLinks.each(function (index, elemento) {
            var $item = $(this);
            var magItem = {
                src: $item.attr('href'),
                type: 'image'
            };
            magItem.title = $item.data('title');
            items.push(magItem);
        });
        $imageLinks.magnificPopup({
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
                    //  $('#imagenOT').modal('hide');
                },

                open: function () {
                    // Disabling focus enforcement by magnific
                    $.magnificPopup.instance._onFocusIn = function (e) { };

                }
            }

        });
    }

    $scope.getEvidenciasImagenes = function (tipo) {
        $scope.listImagenesTipo = [];

        if (tipo.toString() === '0') {
            $scope.listImagenesTipo = $scope.detalleEvidencia.evidencias;
        } else {
            $scope.detalleEvidencia.tipos.map(function (e) {
                if (e.id.toString() === tipo.toString()) {
                    $scope.listImagenesTipo = e.imagenes;
                    return false;
                }
            });
        }

        $(".tipo_evidencia").removeClass("tipo-evidencia-selected");
        $("#categoria_img_" + tipo).addClass("tipo-evidencia-selected");
        setTimeout(() => {
            if (!$scope.configPermisoAccionActualizaEvidencia) {
                $(".checkbox-evidencia").prop("disabled", 'disabled');
            }
            $scope.listImagenesTipo.map(function (e) {
                if (e.idEstatus == 2) {
                    console.log(e);
                    $("#check_" + e.id).prop("checked", true);
                }
            });

        }, 50);
        $scope.applyMagnific();
    }

    angular.element(document).ready(function () {
        $("#moduloChecklist").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

    });

    $scope.conversionAnidadaRecursiva = function (array, nivelInit, maxNivel) {
        let arrayReturn = [];
        angular.forEach(array.filter(e => e.nivel === nivelInit), function (elem, index) {
            let elemento = angular.copy(elem);
            elemento.checkedOpcion = true;
            if (nivelInit < maxNivel) {
                elemento.children = $scope.conversionAnidadaRecursiva(array, nivelInit + 1, maxNivel).filter(e2 => e2.idPadre === elemento.id);
                elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : [];
            }
            arrayReturn.push(elemento)
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
            if (e.id === idPadre) {
                e.checkedOpcion = e.children.length === e.children.filter(function (e) { return e.checkedOpcion }).length;
                $scope.checkPadre(e.idPadre, principalArray, principalArray);
            } else {
                if (e.children !== undefined && e.children.length > 0) {
                    $scope.checkPadre(idPadre, e.children, principalArray);
                }
            }
        });
    }

    $scope.pintarNombreEstatus = function (array, input) {
        let textoEstatus = $scope.mostrarNombresEstatus(array);
        $(input).val(textoEstatus);
        if (textoEstatus.length > 0) {
            $(input).css("border-bottom", "2px solid #d9d9d9");
        }
    }

    $scope.mostrarNombresEstatus = function (array) {
        let arrayNombre = [];
        angular.forEach(array, function (elemento, index) {
            if (elemento.checkedOpcion) {
                arrayNombre.push(elemento.nombre);
            }
            if (elemento.children !== undefined && elemento.children.length > 0) {
                arrayNombre = arrayNombre.concat($scope.mostrarNombresEstatus(elemento.children));
            }
        });
        return arrayNombre;
    }

    $scope.obtenerUltimoNivelFiltros = function (array) {
        return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
    }

    $scope.limpiarCamposFiltro = function (opcion) {
        switch (opcion) {
            case 1:
                $scope.camposFiltro.idos = "";
                break;
            case 2:
                $scope.camposFiltro.idot = "";
                break;
            case 3:
                $scope.camposFiltro.idot = "";
                $scope.camposFiltro.idos = "";
                break;
            default:
                break;
        }
    }

    $scope.obtenerElementosSeleccionadosFiltro = function (array, nivel) {
        let arrayReturn = [];
        angular.forEach(array, function (elemento, index) {
            if (elemento.nivel == nivel && elemento.checkedOpcion) {
                arrayReturn.push(elemento.id);
            } else {
                arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
            }
        });
        return arrayReturn;
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

}])