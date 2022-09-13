var app = angular.module('disponibilidadApp', []);
var objectTempAccion;

app.controller('disponibilidadController', ['$scope', 'disponibilidadService', 'genericService', '$q', function ($scope, disponibilidadService, genericService, $q) {
    $("#li-disponibilidad-navbar").addClass('active')
    $scope.banderaNocturno = false
    $scope.banderaMatutino = false
    $scope.banderaVespertino = false
    $scope.arrayIntervencion = [];
    $scope.intervencionSelect = undefined;
    $scope.idCompanyActualizar;
    $scope.idTipoActualizar;
    $scope.idCiudadActualizar;
    $scope.geografiaList = [];
    $scope.arrayTitulo = [
        {
            title: 'Fecha Disponibilidad',
            vista: true
        },
        {
            title: 'Matutino',
            vista: false
        },
        {
            title: 'Vespertino',
            vista: false
        },
        {
            title: 'Nocturno',
            vista: false
        },
        {
            title: 'Capacidad d&iacute;a',
            vista: true
        }
        , {
            title: 'Estatus',
            vista: true
        },
        {
            title: 'Editar',
            vista: true
        }
    ];
    $scope.nIntervencion = '';
    $scope.nGeografia = '';
    $scope.permisosDisponibilidad = [];
    $scope.isConsultaDisponibilidad = false
    $scope.arrayTurnosDisponibilidad = [];
    $scope.accessConsultaDisponibilidad = true;
    $scope.accessAgregarDisponibilidad = true;
    $scope.accessEditarDisponibilidad = true;
    let timeTable = 1000;

    $scope.isContentDisponibilidadv2 = false;
    $scope.banderaErrorTurnos = false;
    $scope.listTurnosUsuarioDispV2 = [];

    app.disponibilidadCalendar($scope);
    app.disponibilidadV2Controller($scope, disponibilidadService, genericService);

    $(document).ready(function () {

        $scope.inicioDisponibilidad();
        editarDisponibilidad = function (matutino, vespertino, nocturno, bloqueado, fecha) {
            if ($scope.accessEditarDisponibilidad) {
                if ($scope.banderaMatutino) {
                    document.getElementById('matutino_actualizar').value = matutino;
                }
                if ($scope.banderaVespertino) {
                    document.getElementById('vespertino_actualizar').value = vespertino;
                }

                if ($scope.banderaNocturno) {
                    document.getElementById('nocturno_actualizar').value = nocturno;

                }
                document.getElementById('fecha_actualizar').value = fecha
                let fechaSplit = fecha.split('-')
                let fech = Number(fechaSplit[1]) - 1;
                let fechaMes = fech.length === 1 ? '0'.concat(fech) : String(fech);
                let fechaI = new Date(fechaSplit[0], fechaMes, fechaSplit[2])
                $('#fecha_inicio_updateDis').datepicker("setDate", new Date(fechaI));
                $('#fecha_fin_updateDis').datepicker("setDate", new Date(fechaI));
                if (!bloqueado) {
                    document.getElementById('radio_activo_mod').checked = true
                    document.getElementById('radio_inactivo_mod').checked = false
                } else {
                    document.getElementById('radio_inactivo_mod').checked = true
                    document.getElementById('radio_activo_mod').checked = false
                }

                $("#modificar_disponibilidad_modal").modal('show');
            } else {
                swal({ type: "warning", title: "Aviso", text: "No cuentas con permiso para editar disponibilidad." });
            }

        }
    });


    $scope.inicioDisponibilidad = function () {
        $scope.consultarCatalogos();
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true,
        });
        //$('.datepicker').datepicker('update', new Date());
        document.getElementById('arbol_intervencion').placeholder = 'Seleccione un tipo de orden'
        document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione una geografia';
        let contenTheadDetalle = '';
        setTimeout(() => {
            $scope.arrayTitulo.forEach(function (elemento, index) {
                if (elemento.vista) {
                    contenTheadDetalle += `<th> ${elemento.title} </th>`;
                }
            });
            $('#theadDispo').append(`<tr> ${contenTheadDetalle} </tr>`);
            $('#datatable_disponibilidad').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "pageLength": 10,
                "recordsTotal": 100,
                "info": false,
                "autoWidth": true,
                "data": [],
                "language": idioma_espanol_not_font,
                "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                "aoColumnDefs": [
                    { "aTargets": [5], "bSortable": false }
                ]
            });
        }, timeTable);


        $('#moduloDisponibilidad').addClass('active');
        $("#campos_dinamicos").hide();
        $("#btn_mostrar_nav").hide(500);
    }

    $scope.banderaErrorIntervencion = false;
    $scope.banderaErrorGeografia = false;
    $scope.banderaErrorGeneral = false;

    $scope.obtenerUltimoNivelFiltros = function (array) {
        return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
    }

    $scope.consultarCatalogos = function () {
        $scope.arrayTurnosDisponibilidad = []
        let params = {
            moduloAccionesUsuario: 'moduloDisponibilidad'
        }
        $q.all([
            genericService.consultarConfiguracionDespachoDespacho(params),
            genericService.consultarCatalogoIntervenciones(),
            genericService.consulCatalogoGeografia(),
            genericService.consultarCatalogosTurnos()
        ]).then(result => {
            if (result[0].data.respuesta) {
                let resultConf = result[0].data.result
                if (resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                    $scope.permisosDisponibilidad = resultConf.MODULO_ACCIONES_USUARIO.permisos;
                    $scope.accessConsultaDisponibilidad = $scope.permisosDisponibilidad.filter(elemento => { return elemento.clave === 'accionConsultaDisponibilidad' }).length > 0 ? true : false;
                    $scope.accessAgregarDisponibilidad = $scope.permisosDisponibilidad.filter(elemento => { return elemento.clave === 'accionAgregaDisponibilidad' }).length > 0 ? true : false;
                    $scope.accessEditarDisponibilidad = $scope.permisosDisponibilidad.filter(elemento => { return elemento.clave === 'accionEditaDisponibilidad' }).length > 0 ? true : false;
                    $scope.isPermisoConsultaDisponibilidadv2 = ($scope.permisosDisponibilidad.filter(e => { return e.clave == "accionConsultarDisponibilidadv2" })[0] != undefined);
                    $scope.isPermisoDescargaDisponibilidadv2 = ($scope.permisosDisponibilidad.filter(e => { return e.clave == "accionDescargarReporteDisponibilidadv2" })[0] != undefined);
                    $scope.isPermisoActualizarDisponibilidadv2 = ($scope.permisosDisponibilidad.filter(e => { return e.clave == "accionActualizarDisponibilidadv2" })[0] != undefined);

                    let llavesResult = result[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
                    $scope.nIntervencion = llavesResult.N_FILTRO_INTERVENCIONES ? Number(llavesResult.N_FILTRO_INTERVENCIONES) : null;
                    $scope.nGeografia = llavesResult.N_FILTRO_GEOGRAFIA ? Number(llavesResult.N_FILTRO_GEOGRAFIA) : null

                    if ($scope.nGeografia) {
                        $scope.nGeografiaDispV2 = $scope.nGeografia;
                    } else {
                        $scope.nGeografiaDispV2 = llavesResult.N_FILTRO_GEOGRAFIA_DISPONIBILIDADV2 ? Number(llavesResult.N_FILTRO_GEOGRAFIA_DISPONIBILIDADV2) : null
                    }

                    if ($scope.nIntervencion) {
                        $scope.nIntervencionDispV2 = $scope.nIntervencion;
                    } else {
                        $scope.nIntervencionDispV2 = llavesResult.N_FILTRO_INTERVENCIONES_DISPONIBILIDADV2 ? Number(llavesResult.N_FILTRO_INTERVENCIONES_DISPONIBILIDADV2) : null
                    }

                    $("#idBody").removeAttr("style");
                    if ($scope.accessConsultaDisponibilidad) {
                        $scope.inicialCalendario();
                    }

                    objectTempAccion = new GenericAccionRealizada("" + resultConf.MODULO_ACCIONES_USUARIO.id, 'TOP_RIGHT');
                    objectTempAccion.inicializarBotonAccionesRecientes();

                    validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                    validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

                } else {
                    mostrarMensajeErrorAlert("No se encontraron configuraciones del usuario")
                }
            } else {
                mostrarMensajeErrorAlert(result[0].data.resultDescripcion)
            }
            if (result[1].data.respuesta) {
                if (result[1].data.result) {
                    let intervencionesArray = [];
                    if ($scope.nIntervencion) {
                        intervencionesArray = result[1].data.result.filter(elemento => { return elemento.nivel <= $scope.nIntervencion && elemento.aplicaDisponibilidad === 1 });
                    } else {
                        intervencionesArray = result[1].data.result;
                    }
                    if (intervencionesArray.length === 0) {
                        $scope.banderaErrorIntervencion = true;
                        $scope.banderaErrorGeneral = true;
                    }

                    if (intervencionesArray.length > 0) {
                        intervencionesArray.map((e) => {
                            if (e.nivel === 1) {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.aplicaDisponibilidad = e.aplicaDisponibilidad
                            } else {
                                e.parent = e.idPadre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.aplicaDisponibilidad = e.aplicaDisponibilidad
                            }
                            return e
                        })
                        console.log(intervencionesArray)
                        //let arrayInterven = intervencionesArray.filter(elemento =>{ return elemento.aplicaDisponibilidad === 1 })
                        $scope.arrayIntervencion = intervencionesArray;

                        $('#jstreeIntervencion')
                            .bind('loaded.jstree', function (e, data) {
                            }).jstree({
                                'plugins': ["wholerow", 'search'],
                                'search': {
                                    "case_sensitive": false,
                                    "show_only_matches": true
                                },
                                'core': {
                                    'data': intervencionesArray,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons": false
                                    }
                                },
                            });
                        /*.on("ready.jstree", function (e, data) {

                            var jsonNodes = $('#jstreeIntervencion').jstree(true).get_json('#', { flat: true });
                        
                            $.each(jsonNodes, function (i, val) {
                        
                                var treeNode = document.getElementById($(val).attr('id'));
                                var nodeText = $(val).attr('text');
                        
                                let intervencion = intervencionesArray.find(elemento =>{ return elemento.id ==  val.id})
                                if(intervencion.aplicaDisponibilidad === 0) {
                                    $(treeNode).hide();
                                    //console.log(treeNode + "Found")
                                }
                            })
                        })*/
                        $scope.listaIntervencionesDispV2Copy = angular.copy(result[1].data.result);
                        $scope.nIntervencionDispV2 = $scope.nIntervencionDispV2 ? $scope.nIntervencionDispV2 : $scope.obtenerUltimoNivelFiltros($scope.listaIntervencionesDispV2Copy);
                        $scope.listaIntervencionesDispV2 = result[1].data.result.filter(elemento => { return elemento.nivel === $scope.nIntervencionDispV2 && elemento.aplicaDisponibilidad === 1 });
                        $scope.listaIntervencionesDispV2.map(intervencion => { return intervencion.isVisible = true });
                        $scope.mostrarColumnaNoIntervenciones = $scope.listaIntervencionesDispV2.length;
                    } else {
                        $scope.banderaErrorIntervencion = true;
                        $scope.banderaErrorGeneral = true;
                    }
                } else {
                    mostrarMensajeErrorAlert('No existen intervenciones actualmente');
                    $scope.banderaErrorIntervencion = true;
                    $scope.banderaErrorGeneral = true;
                }
            } else {
                mostrarMensajeErrorAlert(result[1].data.resultDescripcion)
                $scope.banderaErrorIntervencion = true;
                $scope.banderaErrorGeneral = true;
            }

            if (result[2].data.respuesta) {
                if (result[2].data.result) {
                    if (result[2].data.result.geografia || result[2].data.result.geografia.length > 0) {
                        let listGeo = [];
                        /* if ($scope.nGeografia) {
                            listGeo = result[2].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });
                        } else {
                            listGeo = result[2].data.result.geografia;
                        } */
                        listGeo = result[2].data.result.geografia;

                        $scope.geografiaList = listGeo;
                        let geografia = listGeo;
                        if (geografia.length !== 0) {

                            let ultimoN = $scope.obtenerNivelUltimoJerarquia();
                            geografia.map((e) => {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                if (e.nivel > $scope.nGeografia) {
                                    e.icon = 'fa fa-ban',
                                        e.state = {
                                            disabled: true
                                        }
                                } else {
                                    e.icon = 'fa fa-instagram'
                                }
                                return e
                            })

                            $('#jstreeconsulta')
                                .bind('loaded.jstree', function (e, data) { })
                                .jstree({
                                    'plugins': ["wholerow", 'search'],
                                    'search': {
                                        "case_sensitive": false,
                                        "show_only_matches": true
                                    },
                                    'core': {
                                        'data': geografia,
                                        'themes': {
                                            'name': 'proton',
                                            'responsive': true,
                                            "icons": true
                                        }
                                    }
                                });

                            $scope.listadoGeografiaCopyDV2 = angular.copy(result[2].data.result.geografia);
                            $scope.nGeografiaDispV2 = $scope.nGeografiaDispV2 ? $scope.nGeografiaDispV2 : $scope.obtenerUltimoNivelFiltros($scope.listadoGeografiaCopyDV2);
                            let geografiaDv2 = $scope.listadoGeografiaCopyDV2.filter(e => e.nivel <= parseInt($scope.nGeografiaDispV2));
                            geografiaDv2.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
                            geografiaDv2.map((e) => {
                                e.parent = e.padre == null ? 0 : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: true,
                                    selected: true,
                                }
                                return e;
                            });

                            $('#geografiaDisponibilidadv2')
                                .bind('loaded.jstree', function (e, data) {
                                    $scope.btnAceptarGeografiaConsultaDispV2();
                                })
                                .jstree({
                                    'plugins': ["wholerow", "checkbox", "search"],
                                    'core': {
                                        'data': geografiaDv2,
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
                            $scope.banderaErrorGeografia = true;
                            $scope.banderaErrorGeneral = true;
                        }
                    } else {
                        mostrarMensajeWarningValidacion('No existen geografias actualmente')
                        $scope.banderaErrorGeografia = true;
                        $scope.banderaErrorGeneral = true;
                    }
                } else {
                    mostrarMensajeErrorAlert(result[2].data.result.mensaje)
                    $scope.banderaErrorGeografia = true;
                    $scope.banderaErrorGeneral = true;
                }
            } else {
                mostrarMensajeErrorAlert(result[2].data.resultDescripcion)
                $scope.banderaErrorGeografia = true;
                $scope.banderaErrorGeneral = true;
            }

            if (result[3].data.respuesta) {
                if (result[3].data.result) {
                    console.log("Result 3: " + JSON.stringify(result[3].data.result))
                    //$scope.arrayTurnosDisponibilidad = [{"id":2,"nombre":"VESPERTINO"},{"id":3,"nombre":"NOCTURNO"}];
                    $scope.arrayTurnosDisponibilidad = result[3].data.result
                    result[3].data.result.forEach(elemento => {
                        if (parseInt(elemento.id) === 1) {
                            $scope.banderaMatutino = true
                            $scope.arrayTitulo.map(titulo => {
                                if (titulo.title === 'Matutino') {
                                    titulo.vista = true
                                }
                                return titulo
                            })
                        } else if (parseInt(elemento.id) === 2) {
                            $scope.banderaVespertino = true
                            $scope.arrayTitulo.map(titulo => {
                                if (titulo.title === 'Vespertino') {
                                    titulo.vista = true
                                }
                                return titulo
                            })
                        } else {
                            $scope.banderaNocturno = true
                            $scope.arrayTitulo.map(titulo => {
                                if (titulo.title === 'Nocturno') {
                                    titulo.vista = true
                                }
                                return titulo
                            })
                        }
                    })

                    $scope.listTurnosUsuarioDispV2 = angular.copy(result[3].data.result);
                } else {
                    mostrarMensajeErrorAlert(result[2].data.result.mensaje)
                    $scope.banderaErrorTurnos = true;
                    $scope.banderaErrorGeografia = true;
                    $scope.banderaErrorGeneral = true;
                }
            } else {
                mostrarMensajeErrorAlert(result[2].data.resultDescripcion)
                $scope.banderaErrorTurnos = true;
                $scope.banderaErrorGeografia = true;
                $scope.banderaErrorGeneral = true;
            }

        }).catch(err => handleError(err));
    }

    $scope.consultaDisponibilidad = function () {
        let mensaje = '<ul>';
        let isValidado = true;


        let ultimonivel;
        if ($scope.nGeografia) {
            ultimonivel = $scope.nGeografia
        } else {
            ultimonivel = $scope.obtenerNivelUltimoJerarquia() - 1;
        }

        let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id))
        let ultimoNIntervencion = $scope.obtenerUltimoNivelIntervencion();
        let tipo_intervencion = $("#jstreeIntervencion").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimoNIntervencion)
            .map(e => parseInt(e.id))

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione una geografia</li>'
            isValidado = false
        }

        if (tipo_intervencion.length === 0) {
            mensaje += '<li>Seleccione una intervenci&oacute;n</li>'
            isValidado = false
        }

        if (isValidado) {
            if (!swal.isVisible()) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
            }

            let params = {
                subtipoIntervencion: tipo_intervencion[0],
                geografia2: clustersparam[0]
            }
            $('#datatable_disponibilidad').dataTable().fnDestroy();

            $('#consulta_disponibilidad').attr('disabled', true);
            $('#consulta_disponibilidad').text("Cargando ...");
            //calendarDisp.render();
            disponibilidadService.consultaDisponibilidad(JSON.stringify(params)).then(function success(response) {
                console.log(response.data);
                arregloDisponibilidad = [];
                $scope.isConsultaDisponibilidad = true;
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.dias !== undefined) {
                            arrDisponibilidad = [];
                            $scope.muestraDisponibilidadCalendar(response.data.result);
                            $scope.idTipoActualizar = tipo_intervencion[0];
                            $scope.idCiudadActualizar = clustersparam[0];

                            let textoIntervencion = $('#jstreeIntervencion').jstree("get_selected", true);
                            let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
                            let selected_arbol;

                            selectedElms.forEach(element => {
                                selected_arbol = element.text;
                            });


                            document.getElementById('disponibilidad_span').innerHTML = selected_arbol;
                            document.getElementById('intervencion_span').innerHTML = textoIntervencion[0].text;
                            //$("#intervencion_span").text(textoIntervencion.substr(0, 1) + "" + (textoIntervencion.substr(1, textoIntervencion.length - 1)).toLowerCase());

                            let styleHide = ''
                            if (!$scope.banderaNocturno) {
                                styleHide = 'display:none'
                            } else {
                                $('#nocturno_dispo').text(response.data.result.CapacidadNocturno === '' ? 0 : response.data.result.CapacidadNocturno);
                            }

                            $("#total_dispo").text(response.data.result.CapacidadTotal === "" ? 0 : response.data.result.CapacidadTotal);

                            let arrayResult = (response.data.result.dias !== undefined && response.data.result.dias !== null) ? response.data.result.dias !== undefined ? response.data.result.dias : [] : [];
                            console.log("Bandera3");
                            $scope.pintarTablaDisponibilidad(arrayResult);

                            $("#consulta_disponibilidad").attr('disabled', false);
                            $("#consulta_disponibilidad").text("Consultar disponibilidad");
                            swal.close();
                        } else {
                            swal.close();
                            mostrarMensajeErrorAlert(response.data.result.ResultDescription);
                        }
                    } else {
                        swal.close();
                        $scope.muestraDisponibilidadCalendar([])
                        document.getElementById('disponibilidad_span').innerHTML = "Sin info.";
                        $("#intervencion_span").text("Sin info.");
                        $('#datatable_disponibilidad').DataTable({
                            "paging": true,
                            "lengthChange": false,
                            "searching": false,
                            "ordering": true,
                            "pageLength": 10,
                            "recordsTotal": 100,
                            "info": false,
                            "autoWidth": true,
                            "data": [],
                            "language": idioma_espanol_not_font,
                            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                            "aoColumnDefs": [
                                { "aTargets": [5], "bSortable": false }
                            ]
                        });
                        mostrarMensajeWarningValidacion("No hay disponibilidad.");
                    }
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err));
        } else {
            mensaje += '</ul>'
            mostrarMensajeWarningValidacion(mensaje)
        }

    }

    $scope.insertarDisponibilidad = function () {
        let arrayTurno = [];
        let vespertinoCant;
        let matutinoCant;
        let nocturnoCantidad;
        if ($scope.banderaVespertino) {
            vespertinoCant = $.trim(document.getElementById('vespertino_adddisp').value);
        }
        if ($scope.banderaMatutino) {
            matutinoCant = $.trim(document.getElementById('matutino_adddisp').value);
        }
        if ($scope.banderaNocturno) {
            nocturnoCantidad = $.trim(document.getElementById('nocturno_adddisp').value);
        }
        let fechaInicio = $.trim(document.getElementById('fecha_inicio_adddisp').value);
        let fechaFin = $.trim(document.getElementById('fecha_fin_adddisp').value);

        let isValido = true;
        let mensajeError = "<ul>";
        let bloqueo = $("input[name='checkBloque']:checked").val();
        bloqueo = bloqueo === 'true' ? 0 : bloqueo === 'false' ? 1 : undefined;
        let ultimonivel;
        if ($scope.nGeografia) {
            ultimonivel = $scope.nGeografia
        } else {
            ultimonivel = $scope.obtenerNivelUltimoJerarquia() - 1;
        }
        let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id))
        let ultimoNIntervencion = $scope.obtenerUltimoNivelIntervencion();
        let tipoIntervencion = $("#jstreeIntervencion").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimoNIntervencion)
            .map(e => parseInt(e.id))

        if ($scope.banderaMatutino) {
            if (matutinoCant !== '') {
                if ((vespertinoCant === '0' && matutinoCant === '0' && nocturnoCantidad === undefined) || 
                (vespertinoCant === undefined && matutinoCant === '0' && nocturnoCantidad === '0') || 
                (vespertinoCant === '0' && matutinoCant === '0' && nocturnoCantidad === '0') || 
                (vespertinoCant !== '0' && matutinoCant === '0' && nocturnoCantidad === '0') || 
                (vespertinoCant === '0' && matutinoCant === '0' && nocturnoCantidad !== '0')) {
                    mensajeError += '<li>Introducir cantidad turno matutino</li>'
                    isValido = false
                } else {
                    arrayTurno.push({
                        idCatTurno: 1,
                        cantidad: matutinoCant
                    })
                    isValido = true
                }

            } else {
                mensajeError += '<li>Introducir cantidad turno matutino</li>'
                isValido = false
            }
        }

        if ($scope.banderaVespertino) {
            if (vespertinoCant !== '') {
                if ((vespertinoCant === '0' && matutinoCant === '0' && nocturnoCantidad === undefined) || 
                (vespertinoCant === '0' && matutinoCant === undefined && nocturnoCantidad === '0') || 
                (vespertinoCant === '0' && matutinoCant === '0' && nocturnoCantidad === '0') ||
                (vespertinoCant === '0' && matutinoCant !== '0' && nocturnoCantidad === '0') ||
                (vespertinoCant === '0' && matutinoCant === '0' && nocturnoCantidad !== '0')) {
                    mensajeError += '<li>Introducir cantidad turno vespertino</li>'
                    isValido = false
                } else {
                    arrayTurno.push({
                        idCatTurno: 2,
                        cantidad: vespertinoCant
                    })
                    isValido = true
                }
            } else {
                mensajeError += '<li>Introducir cantidad turno vespertino</li>'
                isValido = false
            }
        }

        if ($scope.banderaNocturno) {
            if (nocturnoCantidad !== '') {
                if ((vespertinoCant === undefined && matutinoCant === '0' && nocturnoCantidad === '0') || 
                (vespertinoCant === '0' && matutinoCant === undefined && nocturnoCantidad === '0') || 
                (vespertinoCant === '0' && matutinoCant === '0' && nocturnoCantidad === '0') ||
                (vespertinoCant !== '0' && matutinoCant === '0' && nocturnoCantidad === '0') ||
                (vespertinoCant === '0' && matutinoCant !== '0' && nocturnoCantidad === '0')) {
                    mensajeError += '<li>Introducir cantidad turno nocturno</li>'
                    isValido = false
                } else {
                    arrayTurno.push({
                        idCatTurno: 3,
                        cantidad: nocturnoCantidad
                    })
                    isValido = true
                }

            } else {
                mensajeError += '<li>Introducir cantidad turno nocturno</li>'
                isValido = false
            }
        }


        let fechaInicioSplit = fechaInicio.split('/');
        let fechaFinSplit = fechaFin.split('/');

        if (fechaInicioSplit[0] == "") {
            mensajeError += '<li>Seleccione fecha inicio.</li>'
            isValido = false
        }
        if (fechaFinSplit[0] == "") {
            mensajeError += '<li>Seleccione fecha fin.</li>'
            isValido = false
        }
        if (bloqueo === undefined) {
            mensajeError += '<li>Seleccione bloqueo.</li>'
            isValido = false
        }

        if (new Date(fechaInicioSplit[1] + "/" + fechaInicioSplit[0] + "/" + fechaInicioSplit[2]) >
            new Date(fechaFinSplit[1] + "/" + fechaFinSplit[0] + "/" + fechaFinSplit[2])) {
            isValido = false;
            mensajeError += "<li>La fecha de inicio no puede ser mayor a la de fin</li>";
        }


        if (isValido) {
            let fechaInicioC = fechaInicioSplit[2] + '-' + fechaInicioSplit[1] + '-' + fechaInicioSplit[0]
            let fechaFinC = fechaFinSplit[2] + '-' + fechaFinSplit[1] + '-' + fechaFinSplit[0]
            let params = {
                subtipoIntervencion: tipoIntervencion[0],
                idGeografia2: clustersparam[0],
                fechaInicio: fechaInicioC.concat('T00:00:00.000+0000'),
                fechaFin: fechaFinC.concat('T00:00:00.000+0000'),
                bloqueado: bloqueo,
                turnos: arrayTurno
            };

            console.log(params);

            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            let tituloAccion = "Crear disponibilidad";
            let mensajeEnvio = 'Ha ocurrido un error al crear disponibilidad para las fechas ' + fechaInicioC + ' al ' + fechaFinC;
            disponibilidadService.insertarDisponibilidad(JSON.stringify(params)).then(function success(response) {
                console.log(response.data);
                if (response.data.respuesta) {
                    //removerClasesElementosValidacion(arrayIdsElementosValidacionInsercion)
                    mensajeEnvio = "Se ha creado la disponibilidad para las fechas " + fechaInicioC + ' al ' + fechaFinC;
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                    mostrarMensajeExitoAlert('Se agreg\u00F3 correctamente la disponibilidad');
                    $scope.consultaDisponibilidad();
                    $("#moda-add-disponibilidad").modal('hide')
                    swal.close();
                } else {
                    swal.close();
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err));
        } else {
            mensajeError += '</ul>'
            mostrarMensajeWarningValidacion(mensajeError);
            return false;
        }

    }

    $scope.actualizarDisponibilidad = function () {
        let isValido = true;
        let mensajeError = "<ul>";
        let arrayTurno = [];

        let bloqueo = $("input[name='radio-bloqueo-mod-individual']:checked").val();
        let fechaInicio = $.trim(document.getElementById('fecha_inicio_updateDis').value);
        let fechaFin = $.trim(document.getElementById('fecha_fin_updateDis').value);
        bloqueo = bloqueo === 'true' ? 0 : 1;
        let ultimonivel;
        if ($scope.nGeografia) {
            ultimonivel = $scope.nGeografia
        } else {
            ultimonivel = $scope.obtenerNivelUltimoJerarquia() - 1;
        }
        let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id))
        let ultimoNIntervencion = $scope.obtenerUltimoNivelIntervencion();
        let tipoIntervencion = $("#jstreeIntervencion").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimoNIntervencion)
            .map(e => parseInt(e.id))

        if ($scope.banderaMatutino) {
            let matutinoCant = $.trim(document.getElementById('matutino_actualizar').value);
            if (matutinoCant !== '') {
                arrayTurno.push({
                    idCatTurno: 1,
                    disponibilidadActual: matutinoCant
                })
            } else {
                mensajeError += '<li>Introducir cantidad turno matutino</li>';
                isValido = false;
            }
        }

        if ($scope.banderaVespertino) {
            let vespertinoCant = $.trim(document.getElementById('vespertino_actualizar').value);
            if (vespertinoCant !== '') {
                arrayTurno.push({
                    idCatTurno: 2,
                    disponibilidadActual: vespertinoCant
                })
            } else {
                mensajeError += '<li>Introducir cantidad turno vespertino</li>';
                isValido = false;
            }
        }


        if ($scope.banderaNocturno) {
            let nocturnoCant = $.trim(document.getElementById('nocturno_actualizar').value);
            if (nocturnoCant !== '') {
                arrayTurno.push({
                    idCatTurno: 3,
                    disponibilidadActual: nocturnoCant
                })
            } else {
                mensajeError += '<li>Introducir cantidad turno nocturno</li>';
                isValido = false;
            }
        }

        let fechaInicioSplit = fechaInicio.split('/');
        let fechaFinSplit = fechaFin.split('/');

        if (fechaInicioSplit[0] == "") {
            mensajeError += '<li>Seleccione fecha inicio.</li>'
            isValido = false
        }
        if (fechaFinSplit[0] == "") {
            mensajeError += '<li>Seleccione fecha fin.</li>'
            isValido = false
        }
        if (bloqueo === undefined) {
            mensajeError += '<li>Seleccione bloqueo.</li>'
            isValido = false
        }

        if (new Date(fechaInicioSplit[1] + "/" + fechaInicioSplit[0] + "/" + fechaInicioSplit[2]) >
            new Date(fechaFinSplit[1] + "/" + fechaFinSplit[0] + "/" + fechaFinSplit[2])) {
            isValido = false;
            mensajeError += "<li>La fecha de inicio no puede ser mayor a la de fin</li>";
        }

        if (isValido) {
            let fechaInicioC = fechaInicioSplit[2] + '-' + fechaInicioSplit[1] + '-' + fechaInicioSplit[0]
            let fechaFinC = fechaFinSplit[2] + '-' + fechaFinSplit[1] + '-' + fechaFinSplit[0]
            let params = {
                subtipoIntervencion: tipoIntervencion[0],
                idGeografia2: clustersparam[0],
                fechaInicio: fechaInicioC.concat('T00:00:00.000+0000'),
                fechaFin: fechaFinC.concat('T00:00:00.000+0000'),
                bloqueado: bloqueo,
                turnos: arrayTurno
            };
            console.log(params)

            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            let tituloAccion = "Editar disponibilidad";
            let mensajeEnvio = 'Ha ocurrido un error al editar disponibilidad para las fechas ' + fechaInicioC + ' al ' + fechaFinC;
            disponibilidadService.actualizarDisponibilidad(JSON.stringify(params)).then(function success(response) {
                console.log(response.data);
                $("#modificar_disponibilidad_modal").modal('hide');
                $('#consulta_disponibilidad').trigger('click');
                $('#datatable_disponibilidad').dataTable().fnDestroy();
                if (response.data.respuesta) {
                    mensajeEnvio = "Se ha editado la disponibilidad para las fechas " + fechaInicioC + ' al ' + fechaFinC;
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                    $("#tipo_select").trigger('change');
                    mostrarMensajeExitoAlert("Actualizaci\u00F3n correcta");
                    $scope.consultaDisponibilidad();
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err));
        } else {
            mensajeError += '</ul>'
            mostrarMensajeWarningValidacion(mensajeError)
        }


    }

    $scope.intervencionSelecion = function () {
        if ($scope.intervencionSelect !== undefined) {
            if ($scope.intervencionSelect.NocturnoActivo !== undefined && $scope.intervencionSelect.NocturnoActivo === 'true') {
                $scope.mostrarDisponibilidadNocturno();
            } else {
                $scope.ocultarDisponibilidadNocturno();
            }
        }
    }

    $scope.mostrarDisponibilidadNocturno = function () {
        $scope.banderaNocturno = true;
        document.getElementById('container-nocturno').style.display = 'block'
        document.getElementById('noctuurno_d').style.display = 'block'
        document.getElementById('container-noc').style.display = 'block'

        $('#datatable_disponibilidad tbody').empty()
        $('#theadDispo').empty();
        $('#datatable_disponibilidad').dataTable().fnDestroy(true);
        $("#container_table_disponibilidad").append('<table id="datatable_disponibilidad" class="table table table-hover table-striped"><thead id="theadDispo"></thead><tbody></tbody></table>');
        $scope.arrayTitulo.map(elemento => {
            if (elemento.title === 'Nocturno') {
                elemento.vista = true
            }
            return elemento;
        });
        console.log($scope.arrayTitulo);
        let contenTheadDetalle = '';
        $scope.arrayTitulo.forEach(function (elemento, index) {
            if (elemento.vista) {
                contenTheadDetalle += `<th> ${elemento.title} </th>`;
            }
        });

        $('#theadDispo').append(`<tr> ${contenTheadDetalle} </tr>`);

        $('#datatable_disponibilidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "recordsTotal": 100,
            "info": false,
            "autoWidth": true,
            "data": [],
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
            "aoColumnDefs": [
                { "aTargets": [5], "bSortable": false }
            ]
        });
    }

    $scope.ocultarDisponibilidadNocturno = function () {
        $scope.banderaNocturno = false;
        document.getElementById('container-nocturno').style.display = 'none'
        document.getElementById('noctuurno_d').style.display = 'none'
        document.getElementById('container-noc').style.display = 'none'

        $('#datatable_disponibilidad tbody').empty()
        $('#theadDispo').empty();
        $('#datatable_disponibilidad').dataTable().fnDestroy(true);
        $("#container_table_disponibilidad").append('<table id="datatable_disponibilidad" class="table table table-hover table-striped"><thead id="theadDispo"></thead><tbody></tbody></table>');
        $scope.arrayTitulo.map(elemento => {
            if (elemento.title === 'Nocturno') {
                elemento.vista = false
            }
            return elemento;
        });
        console.log($scope.arrayTitulo);
        let contenTheadDetalle = '';
        $scope.arrayTitulo.forEach(function (elemento, index) {
            if (elemento.vista) {
                contenTheadDetalle += `<th> ${elemento.title} </th>`;
            }
        });

        $('#theadDispo').append(`<tr> ${contenTheadDetalle} </tr>`);
        $('#datatable_disponibilidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "recordsTotal": 100,
            "info": false,
            "autoWidth": true,
            "data": [],
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
            "aoColumnDefs": [
                { "aTargets": [5], "bSortable": false }
            ]
        });
    }

    $("#modal_cluster_arbol_diponibilidad").on("hidden.bs.modal", function () {
        let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
        let activarBusquedaAuto = $('#jstreeIntervencion').jstree("get_selected", true);

        if (selectedElms.length > 0) {
            if ($scope.idCiudadActualizar) {
                if ($scope.idCiudadActualizar !== Number(selectedElms[0].id)) {
                    $scope.muestraDisponibilidadCalendar([])
                    $scope.pintarTablaDisponibilidad([])
                    $scope.isConsultaDisponibilidad = false;
                }
            }
            let selected_arbol;

            selectedElms.forEach(element => {
                selected_arbol = element.text;
            });
            document.getElementById('arbol_disponibilidad_consulta').placeholder = selected_arbol
            if (activarBusquedaAuto.length > 0) {
                $scope.consultaDisponibilidad()
            }
        } else {
            document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione una geografia';
        }

        

    })

    $("#modalArbolIntervencion").on("hidden.bs.modal", function () {
        let selectedElms = $('#jstreeIntervencion').jstree("get_selected", true);
        let activarBusquedaAuto = $('#jstreeconsulta').jstree("get_selected", true);

        if (selectedElms.length > 0) {
            if ($scope.idTipoActualizar) {
                if ($scope.idTipoActualizar !== Number(selectedElms[0].id)) {
                    $scope.muestraDisponibilidadCalendar([])
                    $scope.pintarTablaDisponibilidad([])
                    $scope.isConsultaDisponibilidad = false;
                }
            }
            let selected_arbol;

            selectedElms.forEach(element => {
                selected_arbol = element.text;
            });
            document.getElementById('arbol_intervencion').placeholder = selected_arbol
            if (activarBusquedaAuto.length > 0) {
                $scope.consultaDisponibilidad()
            }
        } else {
            document.getElementById('arbol_intervencion').placeholder = 'Seleccione un tipo de orden';
        }


    })

    document.getElementById('arbol_disponibilidad_consulta').addEventListener('click', function () {
        $('#modal_cluster_arbol_diponibilidad').modal('show');
        $scope.isDisponibilidad = true;
        $scope.isDisponibilidadV2 = false;
        $scope.$apply();
        setTimeout(function () {
            $("#searchGeografia").focus();
        }, 750);
    });

    document.getElementById('arbol_intervencion').addEventListener('click', function () {
        $('#modalArbolIntervencion').modal('show');
        setTimeout(function (){
	        $("#searchIntervencion").focus();
	    }, 750);
    })

    document.getElementById('calendario-tab').addEventListener('click', function () {
        setTimeout(function () {
            $scope.calendarDisp.render();
        }, 1000);
    })

    $scope.closeModalAdd = function () {
        $('#moda-add-disponibilidad').modal('hide');
    }

    $scope.closeModalModificar = function () {
        $('#modificar_disponibilidad_modal').modal('hide')
    }

    compareGeneric = (a, b) => {
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
        return $scope.geografiaList.sort(compareGeneric)[1].nivel
    }

    $scope.obtenerUltimoNivelIntervencion = function () {
        return $scope.arrayIntervencion.sort(compareGeneric)[0].nivel
    }

    $scope.busquedaGeografiaFiltro = function () {
        $("#jstreeconsulta").jstree("search", $('#searchGeografia').val());
    }

    $scope.busquedaIntervencionFiltro = function () {
        $("#jstreeIntervencion").jstree("search", $('#searchIntervencion').val());
    }

    $scope.pintarTablaDisponibilidad = function (data) {
        $('#datatable_disponibilidad').dataTable().fnDestroy();
        $('#datatable_disponibilidad tbody').empty();
        let arraRow = [];
        $.each(data, function (i, elemento) {
            let array = [];
            let totalMatutino = 0;
            let totalVespertino = 0;
            let totalNocturno = 0;
            let totalTurnos = 0;

            elemento.turnos.forEach(turno => {
                if (turno.idCatTurno === 1) {
                    totalMatutino = turno.cantidad;
                    totalTurnos += turno.cantidad;
                }
                if (turno.idCatTurno === 2) {
                    totalVespertino = turno.cantidad;
                    totalTurnos += turno.cantidad;
                }
                if (turno.idCatTurno === 3) {
                    totalNocturno = turno.cantidad;
                    totalTurnos += turno.cantidad;
                }
            })

            array[0] = elemento.fecha;
            array[1] = totalMatutino;
            array[2] = totalVespertino
            if ($scope.banderaNocturno) {
                array[3] = totalNocturno;
                array[4] = totalTurnos;
                array[5] = !elemento.bloqueado ? 'DISPONIBLE' : 'BLOQUEADO';
                array[6] = '<a onclick="editarDisponibilidad(' + totalMatutino + ',' + totalVespertino + ',' + totalNocturno + ',' + elemento.bloqueado + '\,' + '\'' + elemento.fecha + '\')"><i class="cursorEfect edit_disponibilidad_btn fa fa-edit"></i></a>'
            } else {
                array[3] = totalTurnos;
                array[4] = !elemento.bloqueado ? 'DISPONIBLE' : 'BLOQUEADO';
                array[5] = '<a onclick="editarDisponibilidad(' + totalMatutino + ',' + totalVespertino + "," + '\'' + '\'' + ',' + elemento.bloqueado + '\,' + '\'' + elemento.fecha + '\')"><i class="cursorEfect edit_disponibilidad_btn fa fa-edit"></i></a>'
            }
            arraRow.push(array);
        });
        console.log(arraRow);
        $('#datatable_disponibilidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "recordsTotal": 100,
            "info": false,
            "autoWidth": true,
            "data": arraRow,
            "language": idioma_espanol_not_font,
            "aoColumnDefs": [
                { "aTargets": [5], "bSortable": false }
            ]
        });
    }

}]);