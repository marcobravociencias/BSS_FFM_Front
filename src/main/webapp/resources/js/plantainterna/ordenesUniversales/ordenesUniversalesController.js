var app = angular.module('ordenesUniversalesApp', []);

app.controller('ordenesUniversalesController', ['$scope', '$q', 'ordenesUniversalesService', 'genericService', function ($scope, $q, ordenesUniversalesService, genericService) {

    app.calendarController($scope, ordenesUniversalesService);
    app.mapController($scope, ordenesUniversalesService);
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.respaldoCatalogo = [];
    $scope.listaIntervencion = [];
    $scope.listaSubIntervencion = [];
    $scope.listaCanalVenta = [];
    $scope.listaPaquete = [];
    $scope.infoBasica = {};
    $scope.informacionCliente = {};
    $scope.nGeografia;
    $scope.nGeografia1;
    $scope.nGeografia2;
    $scope.nTipoOrdenes;
    $scope.nTipoOrdenes;
    $scope.dateSelectedCalendarEvent;
    $scope.dateTodayCalendar = new Date(moment(new Date()).format('MM-DD-YYYY'));
    $scope.isGuardadoProcess = false
    $scope.isGuardadoCreacion = false
    $scope.isValForm = false
    $scope.verAplicaDisponbilidad = true;
    $scope.errorSeleccionIntGeografia = true;
    $scope.isErrorCamposBasicos = true
    const FECHA_HOY_DATE = new Date();
    $scope.consultaArbol = false;
    $scope.resultArbol = [];
    $scope.resultTipoOrdenes = [];
    $scope.listadoTipoOrdenes = [];
    $scope.listaArbolCiudades = [];
    $scope.textParentGeografia = {};

    $scope.validarCamposBasicos = function () {
        let isErrorValidate = false;
        if (!$scope.infoBasica.tiposubtipoordentext) {
            isErrorValidate = true;
        }
        if (!$scope.infoBasica.distrito) {
            isErrorValidate = true;
        }
        if (!$scope.infoBasica.paquete) {
            isErrorValidate = true;
        }
        if (!$scope.infoBasica.canalVenta) {
            isErrorValidate = true;
        }
        if (!$scope.infoBasica.horaEstimada) {
            isErrorValidate = true;
        }
        if ($scope.verAplicaDisponbilidad) {
            if (!$scope.infoBasica.turno) {
                isErrorValidate = true;
            }
        } else {
            if (!$scope.infoBasica.idTurnoSeleccionAplica) {
                isErrorValidate = true;
            }
            if (!$scope.infoBasica.fechaTurnoTextAplica) {
                isErrorValidate = true;
            }
        }
        $scope.isErrorCamposBasicos = isErrorValidate;
        $scope.$apply()
    }

    $scope.guardarOrdenUniversal = function () {
        if ($.trim($scope.infoBasica.folio) !== '') {
            if (!$scope.validarFolio())
                return false;
        }
        $scope.isValForm = true;
        if ($scope.validarPrimerPaso()) {
            $(".tab-step-wizar:first").trigger('click');
        } else if ($scope.validarSegundoPaso()) {
            $(".tab-step-wizar:eq(1)").trigger('click');
        } else if ($scope.validarTercerPaso()) {
            $(".tab-step-wizar:eq(2)").trigger('click');
        } else {
            $scope.isValForm = false;
            $scope.guardarOrdenUniversalRegistro();
        }
    }

    $scope.busquedaGeografiaFiltro = function () {
        $("#jstree-distrito").jstree("search", $('#searhArbolnput').val());
    }
    $scope.busquedaTipoOrdenesFiltro = function () {
        $("#jstree-tipoordenes").jstree("search", $('#searhTipoOrdeneslnput').val());
    }
    $scope.busquedaPaquete = function () {
        $("#jstree-paquete").jstree("search", $('#searhArbolPaquete').val());
    }
    $scope.busquedaCanalVentas = function () {
        $("#jstree-canal-ventas").jstree("search", $('#searhArbolCanalVentas').val());
    }

    $scope.consultarCatalogoOrdenesUniversales = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            moduloAccionesUsuario: 'moduloOrdenesUniversales'
            //moduloAccionesUsuario: 'moduloDisponibilidad'
        }
        $q.all([
            genericService.consultarConfiguracionDespachoDespacho(params),
            genericService.consulCatalogoGeografia(),
            //ordenesUniversalesService.consultarCatalogosOrdenesUniversales(),
            ordenesUniversalesService.consultarPerfilesPorUsuario(),
            ordenesUniversalesService.consultarCatalogoCanalVentas(),
            ordenesUniversalesService.consultarCatalogoPaquete()

        ]).then(function (results) {
            console.log(results);
            let resultConf = results[0].data.result
            if (resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                let llavesResult = resultConf.MODULO_ACCIONES_USUARIO.llaves;

                // console.log("  ----     ################# ------")
                // console.log(llavesResult)
                let tempArrayInt = (results[2].data.result) ? results[2].data.result.tiposOrden : [];
                let tempArrayGeog = results[1].data.result.geografia;

                $scope.nGeografia = (llavesResult.N_FILTRO_GEOGRAFIA) ? Number(llavesResult.N_FILTRO_GEOGRAFIA) : $scope.obtenerUltimoNivelFiltros(tempArrayGeog);
                $scope.nTipoOrdenes = (llavesResult.N_FILTRO_INTERVENCIONES) ? Number(llavesResult.N_FILTRO_INTERVENCIONES) : $scope.obtenerUltimoNivelFiltros(tempArrayInt);
                $scope.nTipoOrdenesConfig = (llavesResult.N_FILTRO_INTERVENCIONES) ? Number(llavesResult.N_FILTRO_INTERVENCIONES) : $scope.obtenerUltimoNivelFiltros(tempArrayInt);
                $scope.nGeografia1 = (llavesResult.N_FILTRO_GEOGRAFIA_UNO) ? Number(llavesResult.N_FILTRO_GEOGRAFIA_UNO) : 2;
                $scope.nGeografia2 = (llavesResult.N_FILTRO_GEOGRAFIA_DOS) ? Number(llavesResult.N_FILTRO_GEOGRAFIA_DOS) : 5;
                // $scope.nGeografia1 = (llavesResult.N_FILTRO_GEOGRAFIA_UNO) ? Number(llavesResult.N_FILTRO_GEOGRAFIA_UNO) : 0;
                // $scope.nGeografia2 = (llavesResult.N_FILTRO_GEOGRAFIA_DOS) ? Number(llavesResult.N_FILTRO_GEOGRAFIA_DOS) : 0;
            } else {
                $scope.nGeografia = $scope.obtenerUltimoNivelFiltros(results[1].data.result.geografia);
                $scope.nTipoOrdenes = $scope.obtenerUltimoNivelFiltros(results[2].data.result.tiposOrden);
                $scope.nTipoOrdenesConfig = $scope.nTipoOrdenes;
                $scope.nGeografia1 = 2;
                $scope.nGeografia2 = 5;
            }

            GenericMapa.prototype.callPrototypeMapa(results[0].data.result);
            $scope.initializeMap();

            // ****************** ARBOL
            if (results[1].data.respuesta) {
                if (results[1].data.result) {
                    $scope.listaArbolCiudades = [];
                    if ($scope.nGeografia) {
                        $scope.resultArbol = results[1].data.result.geografia//.filter(e => { return e.nivel <= $scope.nGeografia });
                    } else {
                        $scope.resultArbol = results[1].data.result.geografia;
                    }
                    angular.forEach($scope.resultArbol, function (element, index) {
                        $scope.consultaArbol = true;
                        let elementGeog = {
                            id: element.id,
                            text: element.nombre,
                            parent: element.padre == undefined ? "#" : element.padre,
                            nivel: element.nivel,
                            icon: 'fa fa-instagram',
                            state: { opened: false }
                        }
                        $scope.listaArbolCiudades.push(elementGeog);
                    });
                    $('#jstree-distrito').bind('loaded.jstree', function (e, data) {
                    }).jstree({
                        'plugins': ["wholerow", 'search'],
                        'search': {
                            "case_sensitive": false,
                            "show_only_matches": true
                        },
                        'core': {
                            'data': $scope.listaArbolCiudades,
                            'themes': {
                                'name': 'proton',
                                'responsive': true,
                                "icons": true
                            }
                        }
                    });
                    swal.close();
                } else {
                    mostrarMensajeErrorAlert(response.data.result.mensaje)
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                swal.close();
            }

            /* if (results[2].data.respuesta) {
                 if (results[2].data.result) {
                     if (results[2].data.result.result == '0') {
                         $scope.listadoCanalVentas = results[2].data.result.canalVentas
                         $scope.listadoPaquete = results[2].data.result.paquetes


                         //Carga arbol paquete

                         let paquetes = results[2].data.result.paquetes;
                         paquetes.map((e) => {
                             e.id = e.Id;
                             e.parent = e.padre == undefined ? "#" : e.padre;
                             e.text = e.Nombre_comercial__c;
                             e.icon = "fa fa-check-circle";
                             e.state = {
                                 opened: false,
                                 selected: false,
                             }
                             return e
                         })

                         $('#jstree-paquete').bind('loaded.jstree', function (e, data) {
                             swal.close()
                         }).jstree({
                             plugins: ["wholerow", 'search'],
                             core: {
                                 data: paquetes,
                                 themes: {
                                     name: 'proton',
                                     responsive: true,
                                     "icons": true
                                 },
                                 animation: 100
                             },
                             "search": {
                                 "case_sensitive": false,
                                 "show_only_matches": true
                             }
                         });

                         //Canal de ventas
                         let canalVentas = results[2].data.result.canalVentas;
                         canalVentas.map((e) => {
                             e.id = e.idCanalVenta;
                             e.parent = e.padre == undefined ? "#" : e.padre;
                             e.text = e.canalVenta;
                             e.icon = "fa fa-check-circle";
                             e.state = {
                                 opened: false,
                                 selected: false,
                             }
                             return e
                         })

                         $('#jstree-canal-ventas').bind('loaded.jstree', function (e, data) {
                             swal.close()
                         }).jstree({
                             plugins: ["wholerow", 'search'],
                             core: {
                                 data: canalVentas,
                                 themes: {
                                     name: 'proton',
                                     responsive: true,
                                     "icons": true
                                 },
                                 animation: 100
                             },
                             "search": {
                                 "case_sensitive": false,
                                 "show_only_matches": true
                             }
                         });

                     }
                     swal.close();
                 } else {
                     mostrarMensajeErrorAlert("Error interno en el servidor.")
                     swal.close();
                 }
             } else {
                 mostrarMensajeErrorAlert(response.data.resultDescripcion)
                 swal.close();
             }*/

            if (Array.isArray(results[2].data.result.perfiles) && results[2].data.result.perfiles.length) {
                $scope.listadoTipoOrdenesPerfiles = []
                if (results[2].data.result.perfiles != undefined && results[2].data.result.perfiles.length > 0) {
                    let mapaIntervenciones = {}
                    angular.forEach(results[2].data.result.perfiles, function (perfil, index) {
                        angular.forEach(perfil.intervenciones, function (interv, indexInt) {
                            mapaIntervenciones[interv.id] = interv;
                        })
                    })
                    // console.log("mapa intervencionesmapaIntervenciones ", mapaIntervenciones);
                    for (const key in mapaIntervenciones) {
                        $scope.listadoTipoOrdenesPerfiles.push(mapaIntervenciones[key]);
                    }
                    // console.log("array listadoTipoOrdenesPerfiles ", $scope.listadoTipoOrdenesPerfiles);
                }

                let arbolIntervenciones = [];
                angular.forEach($scope.listadoTipoOrdenesPerfiles, function (interv, index) {
                    arbolIntervenciones.push({
                        id: interv.id,
                        text: interv.descripcion,
                        parent: interv.idPadre == undefined ? '#' : interv.idPadre,
                        icon: 'fa fa-globe',
                        aplicaDisponibilidad: interv.aplicaDisponibilidad,
                        nivel: parseInt(interv.nivel),
                        state: {
                            opened: false
                        }
                    });
                });

                $('#jstree-tipoordenes').bind('loaded.jstree', function (e, data) {
                    swal.close()
                }).jstree({
                    plugins: ["wholerow", 'search'],
                    core: {
                        data: arbolIntervenciones,
                        themes: {
                            name: 'proton',
                            responsive: true,
                            "icons": false
                        },
                        animation: 100
                    },
                    "search": {
                        "case_sensitive": false,
                        "show_only_matches": true
                    }
                });
            }

            if (results[3].data.respuesta) {
                if (results[3].data.result) {
                    if (results[3].data.result.canalVentas) {
                        $scope.listadoCanalVentas = results[3].data.result.canalVentas
                        //Canal de ventas
                        let canalVentas = results[3].data.result.canalVentas;
                        canalVentas.map((e) => {
                            e.id = e.idCanalVenta;
                            e.parent = e.padre == undefined ? "#" : e.padre;
                            e.text = e.canalVenta;
                            e.icon = "fa fa-check-circle";
                            e.state = {
                                opened: false,
                                selected: false,
                            }
                            return e
                        })
                        $('#jstree-canal-ventas').bind('loaded.jstree', function (e, data) {
                            swal.close()
                        }).jstree({
                            plugins: ["wholerow", 'search'],
                            core: {
                                data: canalVentas,
                                themes: {
                                    name: 'proton',
                                    responsive: true,
                                    "icons": true
                                },
                                animation: 100
                            },
                            "search": {
                                "case_sensitive": false,
                                "show_only_matches": true
                            }
                        });
                    } else {
                        mostrarMensajeWarningValidacion(results[3].data.result.mensaje)
                        swal.close();
                    }
                    swal.close();
                } else {
                    mostrarMensajeErrorAlert("Error interno en el servidor.")
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                swal.close();
            }

            if (results[4].data.respuesta) {
                if (results[4].data.result) {
                    if (results[4].data.result.paquetes) {
                        $scope.listadoPaquete = results[4].data.result.paquetes
                        //Carga arbol paquete
                        let paquetes = results[4].data.result.paquetes;
                        paquetes.map((e) => {
                            e.id = e.id;
                            e.parent = e.padre == undefined ? "#" : e.padre;
                            e.text = e.nombreComercial;
                            e.icon = "fa fa-check-circle";
                            e.state = {
                                opened: false,
                                selected: false,
                            }
                            return e
                        })
                        $('#jstree-paquete').bind('loaded.jstree', function (e, data) {
                            swal.close()
                        }).jstree({
                            plugins: ["wholerow", 'search'],
                            core: {
                                data: paquetes,
                                themes: {
                                    name: 'proton',
                                    responsive: true,
                                    "icons": true
                                },
                                animation: 100
                            },
                            "search": {
                                "case_sensitive": false,
                                "show_only_matches": true
                            }
                        });
                    } else {
                        mostrarMensajeWarningValidacion(results[4].data.result.mensaje)
                        swal.close();
                    }
                    swal.close();
                } else {
                    mostrarMensajeErrorAlert("Error interno en el servidor.")
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                swal.close();
            }
        }).catch(err => handleError(err));
    }

    $scope.filtrarSubIntervencion = function (intervencion) {
        // console.log(intervencion);
        if (intervencion == undefined) {
            $scope.listaSubIntervencion = []
        } else {
            $scope.listaSubIntervencion = $scope.respaldoCatalogo.filter(e => e.idPadre === intervencion.id);
        }
    }

    $scope.obtenerGeografiaLlave = function (llave, geografiaSelected) {
        let objGeografia = angular.copy(geografiaSelected);
        if (llave <= geografiaSelected.nivel) {
            for (let index = llave; index < geografiaSelected.nivel; index++) {
                objGeografia = $scope.listaArbolCiudades.find(function (elem) { return elem.id == Number(objGeografia.parent) });
            }
        }
        return objGeografia;
    }

    $scope.validarFolio = function () {
        let validacionCaracteres = $.trim($scope.infoBasica.folio).substr(0, 2);
        let validacionCaracteresNuevo = $.trim($scope.infoBasica.folio).substr(0, 2);
        if (validacionCaracteres === '02') {
            return true
        } else if (validacionCaracteresNuevo === '1.') {
            return true
        } else if (validacionCaracteresNuevo === '6.') {
            return true
        } else {
            mostrarMensajeWarningValidacion('Formato de folio no valido')
            return false
        }
    }

    $scope.consultarInformacionFolio = function () {
        if ($.trim($scope.infoBasica.folio) !== '') {
            if ($scope.validarFolio()) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                $scope.params = {};
                ordenesUniversalesService.consultarCuentaAsignadaGenerica(JSON.stringify($scope.params)).then(function success(response) {
                    response.data = infoCuenta;
                    console.log(response.data)
                    if (response.data.success) {
                        if (response.data.result) {
                            $scope.infocuenta = {};
                            $scope.infocuenta = response.data.result.Info_cuenta;
                            $scope.informacionCliente.nombre = $scope.infocuenta.Nombre_Cliente;
                            $scope.informacionCliente.nombreContacto = $scope.infocuenta.Nombre_Contacto;
                            $scope.informacionCliente.calle = $scope.infocuenta.Calle;
                            $scope.informacionCliente.numeroExt = $scope.infocuenta.No_Exterior;
                            $scope.informacionCliente.numeroInt = $scope.infocuenta.No_Interior;
                            $scope.informacionCliente.codigoPostal = $scope.infocuenta.Codigo_Postal;
                            $scope.informacionCliente.estado = $scope.infocuenta.Estado;
                            $scope.informacionCliente.municipio = $scope.infocuenta.Municipio;
                            $scope.informacionCliente.entreCalles = $scope.infocuenta.Entre_Calles;
                            $scope.informacionCliente.referencias = $scope.infocuenta.Referencias;
                            $scope.informacionCliente.telefono = $scope.infocuenta.Telefono;
                            $scope.informacionCliente.celular = $scope.infocuenta.Celular;
                            $scope.informacionCliente.ciudad = $scope.infocuenta.Ciudad;
                            $scope.informacionCliente.colonia = $scope.infocuenta.Colonia;
                            $scope.informacionCliente.cuenta = $scope.infocuenta.cuenta;
                            $scope.informacionCliente.os = $scope.infocuenta.os;
                            swal.close();
                        } else {
                            mostrarMensajeErrorAlert(response.data.result.mensaje)
                            swal.close();
                        }
                    } else {
                        mostrarMensajeErrorAlert(response.data.resultDescripcion)
                        swal.close();
                    }
                }).catch(err => handleError(err));
            }
        }
    }

    $scope.elementTab = 1;
    $("#wizzard-1").addClass("current");
    $scope.mostrarTab = function (element) {
        let isError = false;
        if (element == 2) {
            isError = $scope.validarPrimerPaso();
        }

        if (element == 3) {
            isError = $scope.validarPrimerPaso();
            if (!isError) {
                isError = $scope.validarSegundoPaso();
            }
        }

        if (element == 4) {
            isError = $scope.validarPrimerPaso();
            if (!isError) {
                isError = $scope.validarSegundoPaso();
                if (!isError) {
                    isError = $scope.validarTercerPaso();
                }
            }
        }
        if (!isError) {
            $scope.elementTab = element;
            $("#wizzard-1").removeClass("current");
            $("#wizzard-2").removeClass("current");
            $("#wizzard-3").removeClass("current");
            $("#wizzard-4").removeClass("current");
            $("#wizzard-" + element).addClass("current");

            if (element == 3) {
                $scope.abrirOpcionUbicacion();
            }

            if (element != 4) {
                $scope.isGuardadoProcess = false;
                $scope.isGuardadoCreacion = false;
            }
        }
    }

    $scope.mostrarModalArbol = function () {
        $("#searhArbolnput").val("");
        $("#jstree-distrito").jstree("search", '');
        $("#modal-filtro-arbol").modal('show');
        setTimeout(function () {
            $("#searhArbolnput").focus();
        }, 750);
    }

    $scope.mostrarModalSubtipoOrdenes = function () {
        $("#searhTipoOrdeneslnput").val("");
        $("#jstree-tipoordenes").jstree("search", '');
        $("#modal-filtro-tipoordenes").modal('show')
        setTimeout(function () {
            $("#searhTipoOrdeneslnput").focus();
        }, 750);
    }

    $scope.mostrarModalPaquete = function () {
        $("#searhArbolPaquete").val("");
        $("#jstree-paquete").jstree("search", '');
        $("#modal-arbol-paquete").modal('show');
        setTimeout(function () {
            $("#searhArbolPaquete").focus();
        }, 750);
    }

    $scope.mostrarModalCanalVentas = function () {
        $("#searhArbolCanalVentas").val("");
        $("#jstree-canal-ventas").jstree("search", '');
        $("#modal-canal-ventas").modal('show')
        setTimeout(function () {
            $("#searhArbolCanalVentas").focus();
        }, 750);
    }

    $scope.borrarInformacionCliente = function () {
        $scope.informacionCliente = {};
    }

    $scope.consultarDisponibilidad = function (distrito) {
        swal({ text: 'Espera un momento ...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        $scope.params.geografia2 = distrito;

        let selectedElms = $('#jstree-tipoordenes').jstree("get_selected", true)[0].original;
        let isElementIgual = false;
        while (!isElementIgual) {
            if (selectedElms.nivel == $scope.nTipoOrdenesConfig) {
                isElementIgual = true;
            } else {
                selectedElms = $scope.listadoTipoOrdenes.find((e) => e.id === selectedElms.parent)
            }
        }
        $scope.params.subtipoIntervencion = selectedElms.id
        //$scope.params.IdCompany = "2";
        ordenesUniversalesService.getDisponibilidadServicioRest(JSON.stringify($scope.params)).then(function success(response) {
            //response.data = responseDisponibilidad;
            console.log(response.data)
            // (response.data.success) {
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.muestraDisponibilidadCalendar(response.data.result);
                } else {
                    $scope.muestraDisponibilidadCalendar([]);
                }
                swal.close();
            } else {
                mostrarMensajeErrorAlert(response.data.result.mensaje)
                swal.close();
            }
        }).catch(err => handleError(err));
    }

    $scope.validarModalesTipoIntervencionesGeografia = function (tipomodal) {
        let isSeleccionadoIgual = false
        //Valida geografia
        let isErrorGeograf = true;
        let elementonivel = '-1';
        let selectedElms = $('#jstree-distrito').jstree("get_selected", true);
        let selected_arbol;
        angular.forEach(selectedElms, function (elem, index) {
            selected_arbol = elem.original;
        });
        if (selected_arbol !== undefined) {
            if (selected_arbol !== undefined && selected_arbol.nivel == 5) {
                elementonivel = selected_arbol.id;
            }
        }
        if (elementonivel !== '-1') {
            $scope.textParentGeografia = {};
            $scope.textParentGeografia = $scope.obtenerGeografiaLlave($scope.nGeografia, selected_arbol);
            let textDistrito = $('#jstree-distrito').jstree(true).get_node($scope.textParentGeografia.parent).text;
            if (tipomodal == 'arbol' && $scope.infoBasica.distrito == $scope.textParentGeografia.text + " / " + selected_arbol.text) {
                isSeleccionadoIgual = true;
            }
            $scope.infoBasica.distrito = $scope.textParentGeografia.text + " / " + selected_arbol.text;
            $('#distrito-form').removeClass('invalid-inputOrdenesUniversales');
            isErrorGeograf = false;
        } else {
            $scope.infoBasica.distrito = ''
        }

        //Valida subtipoordenes
        let isErrorTipoOrden = true;
        let elementonivelTipoOrden = '-1';
        let selectedElmsTipoOrden = $('#jstree-tipoordenes').jstree("get_selected", true);
        let selected_tipo_orden;
        angular.forEach(selectedElmsTipoOrden, function (elem, index) {
            selected_tipo_orden = elem.original;
        });
        if (selected_tipo_orden !== undefined) {
            if (selected_tipo_orden !== undefined && selected_tipo_orden.nivel === $scope.nTipoOrdenes) {
                elementonivelTipoOrden = selected_tipo_orden.id;
            }
        }

        if (elementonivelTipoOrden !== '-1') {
            let textParent = $('#jstree-tipoordenes').jstree(true).get_node(selected_tipo_orden.parent).text
            if (tipomodal == 'tipoorden' && $scope.infoBasica.tiposubtipoordentext == textParent + " / " + selected_tipo_orden.text) {
                isSeleccionadoIgual = true
            }
            $scope.infoBasica.tiposubtipoordentext = textParent + " / " + selected_tipo_orden.text
            $scope.infoBasica.subTipoOrden = selected_tipo_orden.id

            $scope.infoBasica.tipoordentext = textParent
            $scope.infoBasica.subtipoordentext = selected_tipo_orden.text
            $('#subtipoordenes-form').removeClass('invalid-inputOrdenesUniversales');
            isErrorTipoOrden = false;
        } else {
            $scope.infoBasica.tiposubtipoordentext = ''
            $scope.infoBasica.subTipoOrden = ''

            $scope.infoBasica.tipoordentext = ''
            $scope.infoBasica.subtipoordentext = ''
        }
        if (!isSeleccionadoIgual) {
            if (!isErrorTipoOrden && !isErrorGeograf) {
                $scope.errorSeleccionIntGeografia = false
                $scope.calendarDisp.removeAllEvents()
                $scope.infoBasica.turno = ''
                if (selected_tipo_orden.aplicaDisponibilidad == 1) {
                    $scope.verAplicaDisponbilidad = true;
                    $scope.consultarDisponibilidad($scope.textParentGeografia.id)
                    $scope.validarCamposBasicos();
                } else {
                    $scope.verAplicaDisponbilidad = false;
                    $scope.validarCamposBasicos();
                }
            } else {
                $scope.muestraDisponibilidadCalendar([]);
                $scope.errorSeleccionIntGeografia = true
            }
        }
    }

    $scope.validarPrimerPaso = function () {
        let isErrorValidate = false;
        let textError = '';

        if ($scope.infoBasica.canalVenta == undefined) {
            isErrorValidate = true
            textError += '<li>Selecciona canal de venta</li>';
            $('#canalVenta-form').addClass('invalid-inputOrdenesUniversales');
        }

        if ($scope.infoBasica.paquete == undefined) {
            isErrorValidate = true
            textError += '<li>Selecciona un paquete</li>';
            $('#paquete-form').addClass('invalid-inputOrdenesUniversales');
        }

        let elementonivel = '-1';
        let selectedElms = $('#jstree-distrito').jstree("get_selected", true);
        let selected_arbol;
        angular.forEach(selectedElms, function (elem, index) {
            selected_arbol = elem.original;
        });
        if (selected_arbol !== undefined) {
            if (selected_arbol !== undefined && selected_arbol.nivel === 5) {
                elementonivel = selected_arbol.id;
            }
        }
        if (elementonivel === '-1') {
            isErrorValidate = true
            textError += '<li>Selecciona un elemento v&aacute;lido de la geograf&iacute;a</li>';
            $('#distrito-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.infoBasica.subTipoOrden) {
            isErrorValidate = true;
            textError += '<li>Selecciona Subtipo de orden</li>';
            $('#subtipoordenes-form').addClass('invalid-inputOrdenesUniversales');
        }

        if ($scope.infoBasica.horaEstimada == undefined) {
            isErrorValidate = true
            textError += '<li>Selecciona una hora estimada</li>';
            $('#horaestimada-form').addClass('invalid-inputOrdenesUniversales');
        }

        if ($scope.errorSeleccionIntGeografia) {
            isErrorValidate = true
            textError += '<li>Selecciona un turno </li>';
            textError += '<li>Selecciona d&iacute;a agendamiento </li>';
        } else {
            if ($scope.verAplicaDisponbilidad) {
                if ($scope.infoBasica.turno == undefined || !$scope.infoBasica.turno) {
                    isErrorValidate = true
                    textError += '<li>Selecciona un turno del calendario</li>';
                }
            } else {
                if ($scope.infoBasica.idTurnoSeleccionAplica == undefined || !$scope.infoBasica.idTurnoSeleccionAplica) {
                    isErrorValidate = true
                    textError += '<li>Selecciona un turno </li>';
                }
                if ($scope.infoBasica.fechaTurnoTextAplica == undefined || !$scope.infoBasica.fechaTurnoTextAplica) {
                    isErrorValidate = true
                    textError += '<li>Selecciona un d&acute;a de agendamiento</li>';
                }
            }
        }
        if (isErrorValidate) {
            mostrarMensajeWarningValidacion(textError)
        }
        return isErrorValidate;
    }

    $scope.validarSegundoPaso = function () {
        //02
        let isErrorValidate = false;
        let textError = '';
        let regExpresionEspecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"´\\|<>\/?]/;

        if (!$scope.informacionCliente.nombre) {
            isErrorValidate = true
            textError += '<li>Ingresa el Nombre del Cliente</li>';
            $('#nombre-cliente').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.nombre)) {
            isErrorValidate = true
            textError += '<li>Nombre Contacto no v&aacute;lido</li>';
            $('#nombre-cliente').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.apaterno) {
            isErrorValidate = true
            textError += '<li>Ingresa el Apellido Paterno del Cliente</li>';
            $('#apellidopaterno-cliente').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.apaterno)) {
            isErrorValidate = true
            textError += '<li>Nombre contacto no v&aacute;lido</li>';
            $('#apellidopaterno-cliente').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.amaterno) {
            isErrorValidate = true
            textError += '<li>Ingresa el Apellido Materno del Cliente</li>';
            $('#apellidomaterno-cliente').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.amaterno)) {
            isErrorValidate = apaterno
            textError += '<li>Nombre contacto no v&aacute;lido</li>';
            $('#apellidomaterno-cliente').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.calle) {
            isErrorValidate = true
            textError += '<li>Ingresa La Calle</li>';
            $('#calle-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.calle)) {
            isErrorValidate = true
            textError += '<li>Calle no v&aacute;lido</li>';
            $('#calle-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.numeroExt) {
            isErrorValidate = true
            textError += '<li>Ingresa el N&uacute;mero Exterior</li>';
            $('#num-ext').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.numeroExt)) {
            isErrorValidate = true
            textError += '<li>N&uacute;mero Exterior no v&aacute;lido</li>';
            $('#num-ext').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.ciudad) {
            isErrorValidate = true
            textError += '<li>Ingresa la Ciudad</li>';
            $('#ciudad-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.ciudad)) {
            isErrorValidate = true
            textError += '<li>Ciudad no v&aacute;lido';
            $('#ciudad-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.municipio) {
            isErrorValidate = true
            textError += '<li>Ingresa el Municipio</li>';
            $('#municipio-contacto').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.municipio)) {
            isErrorValidate = true
            textError += '<li>Municipio no v&aacute;lido</li>';
            $('#municipio-contacto').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.estado) {
            isErrorValidate = true
            textError += '<li>Ingresa el Estado</li>';
            $('#estado-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.estado)) {
            isErrorValidate = true
            textError += '<li>Estado no v&aacute;lido</li>';
            $('#estado-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.colonia) {
            isErrorValidate = true
            textError += '<li>Ingresa la colonia</li>';
            $('#colonia-contacto').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.colonia)) {
            isErrorValidate = true
            textError += '<li>Colonia no v&aacute;lida</li>';
            $('#colonia-contacto').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.entreCalles) {
            isErrorValidate = true
            textError += '<li>Ingresa la Referencia Entre Calles </li>';
            $('#entrecalle-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.entreCalles)) {
            isErrorValidate = true
            textError += '<li>Refeferencia Entre Calles no v&aacute;lida</li>';
            $('#entrecalle-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.referencias) {
            isErrorValidate = true
            textError += '<li>Ingresa las Referencias</li>';
            $('#referencias-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.referencias)) {
            isErrorValidate = true
            textError += '<li>Referencias no v&aacute;lidas</li>';
            $('#referencias-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.codigoPostal) {
            isErrorValidate = true
            textError += '<li>Ingresa el C&oacute;digo Postal</li>';
            $('#codigopostal-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.codigoPostal)) {
            isErrorValidate = true
            textError += '<li>C&oacutedigo Postal no v&aacute;lido</li>';
            $('#codigopostal-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.telefono) {
            isErrorValidate = true
            textError += '<li>Ingresa el n&uacute;mero de Tel&eacute;fono</li>';
            $('#telefono-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.telefono)) {
            isErrorValidate = true
            textError += '<li>N&uacute;mero Telef&oacute;nico no v&aacute;lido</li>';
            $('#telefono-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.celular) {
            isErrorValidate = true
            textError += '<li>Ingresa un N&uacute;mero de Celular</li>';
            $('#celular-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.celular)) {
            isErrorValidate = true
            textError += '<li>N&uacute;mero de Celular no v&aacute;lido</li>';
            $('#celular-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.razonsocial) {
            isErrorValidate = true
            textError += '<li>Ingresa la Raz&oacute;n Social</li>';
            $('#rfc-form').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.razonsocial)) {
            isErrorValidate = true
            textError += '<li>Raz&oacute;n Social no v&aacute;lida</li>';
            $('#rfc-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.correo) {
            isErrorValidate = true
            textError += '<li>Ingresa un Correo Electr&oacute;nico v&aacute;lido</li>';
            $('#correo-form').addClass('invalid-inputOrdenesUniversales');
        } else if (!$scope.emailFormat.test($scope.informacionCliente.correo)) {
            isErrorValidate = true
            textError += '<li>Correo Electr&oacute;nico no v&aacute;lido</li>';
            $('#correo-form').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.nombreContacto) {
            isErrorValidate = true
            textError += '<li>Ingresa el Nombre del Contacto</li>';
            $('#nombre-contacto').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.nombreContacto)) {
            isErrorValidate = true
            textError += '<li>Nombre de Contacto no v&aacute;lido</li>';
            $('#nombre-contacto').addClass('invalid-inputOrdenesUniversales');
        }

        if (!$scope.informacionCliente.telefonoContacto) {
            isErrorValidate = true
            textError += '<li>Ingresa el N&uacute;mero de Tel&eacute;fono del Contacto</li>';
            $('#telefono-contacto').addClass('invalid-inputOrdenesUniversales');
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.telefonoContacto)) {
            isErrorValidate = true
            textError += '<li>N&uacute;mero Telef&oacute;nico del Contacto no v&aacute;lido</li>';
            $('#telefono-contacto').addClass('invalid-inputOrdenesUniversales');
        }

        if (isErrorValidate) {
            mostrarMensajeWarningValidacion(textError)
        }
        return isErrorValidate;
    }

    $(".inputCliente").keyup(function () {
        var input = $(this).attr("id");
        if ($(this).val() === "" || $(this).val() === undefined) {
            $("#" + input).addClass("invalid-inputOrdenesUniversales");
        } else {
            $("#" + input).removeClass("invalid-inputOrdenesUniversales");
        }
    });

    $scope.validarTercerPaso = function () {
        let isValidateLatitudLongitud = $scope.validarLatitudLongitudMap();
        if (isValidateLatitudLongitud) {
            mostrarMensajeWarningValidacion('<li>Selecciona la ubicaci&oacute;n en el mapa</li>')
        }
        return isValidateLatitudLongitud;
    }

    $scope.validarLatitudLongitudMap = function () {
        let isErrorValidate = false;
        if (!$scope.latitudSelectedMap || !$scope.longitudSelectedMap) {
            isErrorValidate = true
        } else {
            if (!$scope.isLatitude($scope.latitudSelectedMap) || !$scope.isLongitude($scope.longitudSelectedMap)) {
                isErrorValidate = true
            } else if ($scope.validateLatitudLongitudCaracteres($scope.longitudSelectedMap) || $scope.validateLatitudLongitudCaracteres($scope.longitudSelectedMap)) {
                isErrorValidate = true
            } else if (isNaN($scope.latitudSelectedMap) || isNaN($scope.longitudSelectedMap)) {
                isErrorValidate = true
            }
        }
        return isErrorValidate
    }

    $scope.dirigirSegundaSeccion = function () {
        if (!$scope.isErrorCamposBasicos)
            $("#wizzard-2").click()
    }

    angular.element(document).ready(function () {
        $("#modal-canal-ventas").on("hidden.bs.modal", function () {
            let venta = $('#jstree-canal-ventas').jstree("get_selected", true);
            if (venta.length) {
                $scope.infoBasica.canalVenta = venta[0].text;
                $("#canalVenta-form").removeClass("invalid-inputOrdenesUniversales");
                $scope.$apply();
            }
            $scope.validarCamposBasicos()
        });

        $("#modal-arbol-paquete").on("hidden.bs.modal", function () {
            let paquete = $('#jstree-paquete').jstree("get_selected", true);
            if (paquete.length) {
                $scope.infoBasica.paquete = paquete[0].text;
                $("#paquete-form").removeClass("invalid-inputOrdenesUniversales");
                $scope.$apply();
            }
            $scope.validarCamposBasicos()
        });

        $("#turnoAplicaDisp").change(function () {
            $scope.validarCamposBasicos();
        })
        $("#modal-filtro-arbol").on("hidden.bs.modal", function () {
            $scope.validarModalesTipoIntervencionesGeografia('arbol');
        });

        $("#modal-filtro-tipoordenes").on("hidden.bs.modal", function () {
            $scope.validarModalesTipoIntervencionesGeografia('tipoorden');
        });

        $('#horaestimada-form').timepicker({
            format: 'hh:mm:ss a',
            change: function (dateInput) {
                let minutos = dateInput.getMinutes() + ""
                let horas = dateInput.getHours() + ""
                $scope.infoBasica.horaEstimada = (horas.padStart(2, '0')) + ':' + (minutos.padStart(2, '0'));
                $("#horaestimada-form").removeClass("invalid-inputOrdenesUniversales");
                $scope.$apply()
                // console.log($scope.infoBasica.horaEstimada)
                $scope.validarCamposBasicos()
            }
        })
        $("#moduloOrdenesUniversales").addClass("active");
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

        $('#dia-form-turno').datepicker({
            format: 'yyyy/mm/dd',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            startDate: moment(FECHA_HOY_DATE).toDate()
        }).on('changeDate', function (e) {
            let textCalendar = $('#dia-form-turno').val()
            $scope.infoBasica.fechaTurnoTextAplica = textCalendar;
            $scope.$apply()
        });
        $('#dia-form-turno').datepicker('update', FECHA_HOY_DATE).trigger('change');

        let textCalendar = $('#dia-form-turno').val()
        $scope.infoBasica.fechaTurnoTextAplica = textCalendar;

        $("#idBody").removeAttr("style");
    });

    $scope.validarCampoNA = function (campo) {
        return campo ? campo : 'No aplica';
    }

    $scope.obtenerUltimoNivelFiltros = function (array) {
        return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
    }

    $scope.guardarOrdenUniversalRegistro = function () {
        let selectedElmsTipoOrden = $('#jstree-tipoordenes').jstree("get_selected", true);
        let selected_tipo_orden;
        let subTipoOrden = ''

        angular.forEach(selectedElmsTipoOrden, function (elem, index) {
            selected_tipo_orden = elem.original;
        });
        if (selected_tipo_orden !== undefined) {
            if (selected_tipo_orden !== undefined && selected_tipo_orden.nivel === $scope.nTipoOrdenes) {
                subTipoOrden = selected_tipo_orden.id;
            }
        }
        let tipoOrdenId = $('#jstree-tipoordenes').jstree(true).get_node(selected_tipo_orden.parent).id
        let nombreOrden = $('#jstree-tipoordenes').jstree(true).get_node(selected_tipo_orden.parent).text

        let selectedElms = $('#jstree-distrito').jstree("get_selected", true);
        let selected_arbol;
        let geografia1;
        let geografia2;
        angular.forEach(selectedElms, function (elem, index) {
            selected_arbol = elem.original;
        });

        geografia1 = $scope.obtenerGeografiaLlave($scope.nGeografia1, selected_arbol);
        geografia2 = $scope.obtenerGeografiaLlave($scope.nGeografia2, selected_arbol);

        const diffTime = Math.abs($scope.dateSelectedCalendarEvent - $scope.dateTodayCalendar);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let paquete = $('#jstree-paquete').jstree("get_selected", true);
        let venta = $('#jstree-canal-ventas').jstree("get_selected", true);

        let envioFechaAgenda = angular.copy($scope.infoBasica.fechaTurnoText)
        let envioidTurno = angular.copy($scope.infoBasica.idTurnoSeleccion)

        if (!$scope.verAplicaDisponbilidad) {
            // console.log("no aplica dispo")
            envioFechaAgenda = angular.copy($scope.infoBasica.fechaTurnoTextAplica)
            envioidTurno = angular.copy(parseInt($scope.infoBasica.idTurnoSeleccionAplica))
        }
        let jsonEnvio = {
            "nombreOrden": nombreOrden,   //Ejemplo: Instalación
            "tipoOrden": tipoOrdenId,            //id tipo orden
            "subTipoOrden": subTipoOrden,         //id siubtipo orden
            "flujo": 8,
            "geografia1": geografia1.text, //DESCRIPCION CIUDAD
            "geografia2": geografia2.text, //DESCRIPCION ULTIMO NIVEL
            "folios": [{   // CUANDO LLEVA ORDEN DE SERVICIO
                "folio": "NA",
                "idFolio": "NA",
                "idSistema": 1
            }],
            "cliente": {
                "idClaveCliente": $scope.validarCampoNA($scope.infoBasica.folio), //numero de cuenta factura
                "nombre": $scope.validarCampoNA($scope.informacionCliente.nombre),
                "apellidoPaterno": $scope.validarCampoNA($scope.informacionCliente.apaterno),
                "apellidoMaterno": $scope.validarCampoNA($scope.informacionCliente.amaterno),
                "razonSocial": $scope.validarCampoNA($scope.informacionCliente.razonsocial),
                "telefonoCelular": $scope.validarCampoNA($scope.informacionCliente.celular),
                "telefonoFijo": $scope.validarCampoNA($scope.informacionCliente.telefono),
                "telefonoOficina": $scope.validarCampoNA($scope.informacionCliente.telefono),
                "correoElectronico": $scope.validarCampoNA($scope.informacionCliente.correo),
                "contactos": [{
                    "nombre": $scope.informacionCliente.nombreContacto,
                    "telefono": $scope.informacionCliente.telefonoContacto,
                    "parentesco": "Contacto"
                }]
            },
            "agendamiento": {
                "fechaAgenda": envioFechaAgenda, //formato "2021-07-09"
                "idTurno": envioidTurno,
                "hora": $scope.infoBasica.horaEstimada,  // Formato "19:46"
                "comentarios": $scope.informacionCliente.comentario,
                "origen": 1,
                "confirmada": diffDays == 0 ? 1 : 0  //ESTE VALOR NO LO TENEMOS       0 = false 1 = true       si la fecha de agendamiento es de hoy nace confirmada
            },
            "direccion": {
                "calle": $scope.validarCampoNA($scope.informacionCliente.calle),   //esta
                "numeroInterior": $scope.validarCampoNA($scope.informacionCliente.numeroInt),   //esta
                "numeroExterior": $scope.validarCampoNA($scope.numeroExt),  //esta
                "colonia": $scope.validarCampoNA($scope.informacionCliente.colonia),   //esta
                "municipio": $scope.validarCampoNA($scope.informacionCliente.municipio),
                "ciudad": $scope.validarCampoNA($scope.informacionCliente.ciudad),
                "latitud": $scope.validarCampoNA($scope.latitudSelectedMap),
                "longitud": $scope.validarCampoNA($scope.longitudSelectedMap),    //esta
                "estado": $scope.validarCampoNA($scope.informacionCliente.estado),
                "codigoPostal": $scope.validarCampoNA($scope.informacionCliente.codigoPostal),
                "calleReferencia": $scope.validarCampoNA($scope.informacionCliente.referencias),
                "entreCalles": $scope.validarCampoNA($scope.informacionCliente.calle),
                "pais": "MX",    //ESTE VALOR NO LO TENEMOS
            },
            "informacionAdicional": [
                {
                    "nombre": "paquete",
                    "valor": paquete[0].id
                },
                {
                    "nombre": "canalVenta",
                    "valor": venta[0].id
                }
            ]
        }
        // console.log(jsonEnvio)

        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        ordenesUniversalesService.creacionOrdenTrabajoUniversal(JSON.stringify(jsonEnvio)).then(function success(response) {
            console.log(response.data)
            $scope.isGuardadoProcess = true
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.mensajeRequestGuardado = response.data.result.mensaje
                    if (response.data.result.idOrden) {
                        $scope.isGuardadoCreacion = true
                        $scope.informacionCliente = {}
                        $scope.infoBasica = {}
                        $("#search-input-place").val('')
                        $scope.latitudSelectedMap = ''
                        $scope.longitudSelectedMap = ''
                        $scope.limpiarMarkers()
                        $("#horaestimada-form").val('')
                        $scope.calendarDisp.removeAllEvents()
                        $scope.verAplicaDisponbilidad = true;
                        $scope.errorSeleccionIntGeografia = true;

                        $('#dia-form-turno').datepicker('update', FECHA_HOY_DATE).trigger('change');
                        let textCalendar = $('#dia-form-turno').val()
                        $scope.infoBasica.fechaTurnoTextAplica = textCalendar;

                    } else {
                        $scope.isGuardadoCreacion = false
                    }
                } else {
                    $scope.isGuardadoCreacion = false
                    $scope.mensajeRequestGuardado = response.data.resultDescripcion
                }
                swal.close();
            } else {
                swal.close();
                $scope.isGuardadoCreacion = false
                $scope.mensajeRequestGuardado = response.data.resultDescripcion
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
            }
        }).catch(err => handleError(err));
    }

    //$scope.armarTestCliente=function(){
    // $scope.informacionCliente = {
    //     "nombre": "HECTOR ",
    //     "apaterno": "santamaria",
    //     "amaterno": "orduna",
    //     "nombreContacto": "FATMA SA DE CV",
    //     "calle": "AVENIDA FLORES",
    //     "numeroExt": "NA",
    //     "numeroInt": "12",
    //     "codigoPostal": "926152",
    //     "comentario": "comentario testing",

    //     "estado": "MORELOS",
    //     "municipio": "EMILIANO ZAPATA",
    //     "entreCalles": "GUERRERO Y DEL CRUCERO",
    //     "referencias": "ENTRE ASP. 1 Y RED..",
    //     "ext": "",
    //     "telefono": "7772804607",
    //     "celular": "7772771921",
    //     "ciudad": "CUENRNAA",
    //     "colonia": "CAPULIN",
    //     "correo": "hector.stamaria92@gmail.com",
    //     "telefonoContacto": "777722127",
    //     "razonsocial": "Total play empresarial DE cv"
    // }
    //}
}]);