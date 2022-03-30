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
    $scope.nTipoOrdenes;
    $scope.nTipoOrdenes;
    $scope.dateSelectedCalendarEvent;
    $scope.dateTodayCalendar = new Date(moment(new Date()).format('MM-DD-YYYY'));

    $scope.isGuardadoProcess = false
    $scope.isGuardadoCreacion = false

    $scope.isValForm = false

    $scope.verAplicaDisponbilidad=true;
    $scope.errorSeleccionIntGeografia=true;
    const FECHA_HOY_DATE=new Date();
    $scope.guardarOrdenUniversal = function () {
        if ($.trim($scope.infoBasica.folio) !== '') {
            if (!$scope.validarFolio())
                return false
        }
        $scope.isValForm = true
        if ($scope.validarPrimerPaso()) {
            $(".tab-step-wizar:first").trigger('click')
        } else if ($scope.validarSegundoPaso()) {
            $(".tab-step-wizar:eq(1)").trigger('click')
        } else if ($scope.validarTercerPaso()) {
            $(".tab-step-wizar:eq(2)").trigger('click')
        } else {
            $scope.isValForm = false
            $scope.guardarOrdenUniversalRegistro()
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
            ordenesUniversalesService.consultarCatalogosOrdenesUniversales(),
            ordenesUniversalesService.consultarPerfilesPorUsuario()

        ]).then(function (results) {
            console.log(results);
            let resultConf = results[0].data.result
            if (resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                let llavesResult = resultConf.MODULO_ACCIONES_USUARIO.llaves;

                console.log("  ----     ################# ------")
                console.log(llavesResult)
                let tempArrayInt = results[2].data.result.tiposOrden;
                let tempArrayGeog = results[1].data.result.geografia;

                $scope.nGeografia = (llavesResult.N_FILTRO_GEOGRAFIA) ? Number(llavesResult.N_FILTRO_GEOGRAFIA) : $scope.obtenerUltimoNivelFiltros(tempArrayGeog);
                $scope.nTipoOrdenes = (llavesResult.N_FILTRO_INTERVENCIONES) ? Number(llavesResult.N_FILTRO_INTERVENCIONES) : $scope.obtenerUltimoNivelFiltros(tempArrayInt);
                $scope.nTipoOrdenesConfig = (llavesResult.N_FILTRO_INTERVENCIONES) ? Number(llavesResult.N_FILTRO_INTERVENCIONES) : $scope.obtenerUltimoNivelFiltros(tempArrayInt);
            } else {
                $scope.nGeografia = $scope.obtenerUltimoNivelFiltros(results[1].data.result.geografia)
                $scope.nTipoOrdenes = $scope.obtenerUltimoNivelFiltros(results[2].data.result.tiposOrden)
                $scope.nTipoOrdenesConfig = $scope.nTipoOrdenes
            }



            GenericMapa.prototype.callPrototypeMapa(results[0].data.result)

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
                        let elementGeog={
                            id: element.id,
                            text: element.nombre,
                            parent: element.padre == undefined ? "#" : element.padre,
                            nivel: element.nivel,
                            state: { opened: false }
                        }
                        if (element.nivel > $scope.nGeografia) {
                            elementGeog.icon = 'fa fa-ban'
                            elementGeog.state = {
                                disabled: true
                            }
                        } else{
                            elementGeog.icon = 'fa fa-instagram'
                        }

                        $scope.listaArbolCiudades.push( elementGeog );
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

            if (results[2].data.respuesta) {
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
                    mostrarMensajeErrorAlert(response.data.result.mensaje)
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                swal.close();
            }

            if(  Array.isArray( results[3].data.result.perfiles ) &&  results[3].data.result.perfiles.length   ){
                //results[3].data.result.perfiles.splice(1,1)
                $scope.listadoTipoOrdenesPerfiles=[]
                angular.forEach(results[3].data.result.perfiles, function (perfil, index) {                            
                    let idPerfil="perfil"+(perfil.id)
                    $scope.listadoTipoOrdenesPerfiles.push( {
                        id: idPerfil,
                        text: perfil.descripcion,
                        parent: "#",
                        icon: 'fa fa-globe',
                        nivel: 0,
                        state: {
                            opened: false
                        }
                    });
            
                    angular.forEach(perfil.intervenciones, function (interv, indexInt) {
                        $scope.listadoTipoOrdenesPerfiles.push( {
                            id: interv.id,
                            text: interv.descripcion,
                            parent: interv.idPadre == undefined ? idPerfil : interv.idPadre,
                            icon: 'fa fa-globe',
                            aplicaDisponibilidad: interv.id == 211 ? 0 : interv.aplicaDisponibilidad ,
                            nivel: parseInt(interv.nivel),
                            state: {
                                opened: false
                            }
                        });
                    });
             
                });   
                /** */             
                $scope.listadoTipoOrdenesPerfiles.push( {
                    id:120,
                    text: "ADDON HARDCODEADO ",
                    parent:16,
                    icon: 'fa fa-globe',
                    nivel: 2,
                    aplicaDisponibilidad: 1,
                    state: {
                        opened: false
                    }
                });

                $('#jstree-tipoordenes').bind('loaded.jstree', function (e, data) {
                    swal.close()
                }).jstree({
                    plugins: ["wholerow", 'search'],
                    core: {
                        data:  $scope.listadoTipoOrdenesPerfiles,
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

        }).catch(err => handleError(err));
    }

    $scope.filtrarSubIntervencion = function (intervencion) {
        console.log(intervencion);
        if (intervencion == undefined) {
            $scope.listaSubIntervencion = []
        } else {
            $scope.listaSubIntervencion = $scope.respaldoCatalogo.filter(e => e.idPadre === intervencion.id);
        }
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
        $scope.elementTab = element;
        $("#wizzard-1").removeClass("current");
        $("#wizzard-2").removeClass("current");
        $("#wizzard-3").removeClass("current");
        $("#wizzard-4").removeClass("current");

        $("#wizzard-" + element).addClass("current");

        if (element != 4) {
            $scope.isGuardadoProcess = false
            $scope.isGuardadoCreacion = false
        }
    }

    $scope.consultaArbol = false;
    $scope.resultArbol = [];
    $scope.resultTipoOrdenes = [];

    $scope.listadoTipoOrdenes = []
    $scope.listaArbolCiudades = [];
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
            if (selected_arbol !== undefined && selected_arbol.nivel === $scope.nGeografia) {
                elementonivel = selected_arbol.id;
            }
        }
        if (elementonivel !== '-1') {
            let textParent = $('#jstree-distrito').jstree(true).get_node(selected_arbol.parent).text
            if (tipomodal == 'arbol' && $scope.infoBasica.distrito == textParent + " / " + selected_arbol.text) {
                isSeleccionadoIgual = true
            }
            $scope.infoBasica.distrito = textParent + " / " + selected_arbol.text
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
            isErrorTipoOrden = false;
        } else {
            $scope.infoBasica.tiposubtipoordentext = ''
            $scope.infoBasica.subTipoOrden = ''

            $scope.infoBasica.tipoordentext = ''
            $scope.infoBasica.subtipoordentext = ''
        }
        if (!isSeleccionadoIgual) {
            if (!isErrorTipoOrden && !isErrorGeograf) {
                $scope.errorSeleccionIntGeografia=false
                $scope.calendarDisp.removeAllEvents()
                $scope.infoBasica.turno = ''                
                if( selected_tipo_orden.aplicaDisponibilidad == 1 ){
                    $scope.verAplicaDisponbilidad=true;
                    $scope.consultarDisponibilidad(elementonivel)
                }else{
                    $scope.verAplicaDisponbilidad=false;
                }
            }else{
                $scope.muestraDisponibilidadCalendar([]);
                $scope.errorSeleccionIntGeografia=true
            }
        }
        $scope.$apply()
    }

    $scope.validarPrimerPaso = function () {
        let isErrorValidate = false;
        let textError = '';

        if (!$scope.infoBasica.subTipoOrden) {
            isErrorValidate = true;
            textError += 'Selecciona subtipo de orden</br>';
        }

        if ($scope.infoBasica.canalVenta == undefined) {
            isErrorValidate = true
            textError += 'Selecciona canal de venta</br>';
        }

        if ($scope.infoBasica.paquete == undefined) {
            isErrorValidate = true
            textError += 'Selecciona un paquete</br>';
        }
        let elementonivel = '-1';
        let selectedElms = $('#jstree-distrito').jstree("get_selected", true);
        let selected_arbol;
        angular.forEach(selectedElms, function (elem, index) {
            selected_arbol = elem.original;
        });
        if (selected_arbol !== undefined) {
            if (selected_arbol !== undefined && selected_arbol.nivel === $scope.nGeografia) {
                elementonivel = selected_arbol.id;
            }
        }



        if (elementonivel === '-1') {
            isErrorValidate = true
            textError += 'Selecciona un elemento valido de la geografia</br>';
        }
        if ($scope.infoBasica.horaEstimada == undefined) {
            isErrorValidate = true
            textError += 'Selecciona una hora estimada</br>';
        }
     
        if( $scope.errorSeleccionIntGeografia ){
            isErrorValidate = true
            textError += 'Selecciona un turno </br>';
            textError += 'Selecciona d&iacute;a agendamiento </br>';
        }else{
            if(  $scope.verAplicaDisponbilidad ){
                if ($scope.infoBasica.turno == undefined || !$scope.infoBasica.turno) {
                    isErrorValidate = true
                    textError += 'Selecciona un turno del calendario</br>';
                }
            }else{
                if ($scope.infoBasica.idTurnoSeleccionAplica == undefined || !$scope.infoBasica.idTurnoSeleccionAplica) {
                    isErrorValidate = true
                    textError += 'Selecciona un turno </br>';
                }
                if ($scope.infoBasica.fechaTurnoTextAplica == undefined || !$scope.infoBasica.fechaTurnoTextAplica) {
                    isErrorValidate = true
                    textError += 'Selecciona un d&acute;a de agendamiento</br>';
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
            textError += 'Captura el nombre del cliente</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.nombre)) {
            isErrorValidate = true
            textError += 'Nombre contacto no v\u00E1lido</br>';
        }


        if (!$scope.informacionCliente.apaterno) {
            isErrorValidate = true
            textError += 'Captura el apellido paterno</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.apaterno)) {
            isErrorValidate = true
            textError += 'Nombre contacto no v\u00E1lido</br>';
        }


        if (!$scope.informacionCliente.amaterno) {
            isErrorValidate = true
            textError += 'Captura apellido materno</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.amaterno)) {
            isErrorValidate = apaterno
            textError += 'Nombre contacto no v\u00E1lido</br>';
        }


        if (!$scope.informacionCliente.calle) {
            isErrorValidate = true
            textError += 'Captura la calle</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.calle)) {
            isErrorValidate = true
            textError += 'Calle no valido</br>';
        }

        if (!$scope.informacionCliente.numeroExt) {
            isErrorValidate = true
            textError += 'Captura el n\u00FAmero exterior</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.numeroExt)) {
            isErrorValidate = true
            textError += 'Numero exterior no v\u00E1lido</br>';
        }


        if (!$scope.informacionCliente.ciudad) {
            isErrorValidate = true
            textError += 'Captura ciudad</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.ciudad)) {
            isErrorValidate = true
            textError += 'Ciudad no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.municipio) {
            isErrorValidate = true
            textError += 'Captura municipio</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.municipio)) {
            isErrorValidate = true
            textError += 'Municipio no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.estado) {
            isErrorValidate = true
            textError += 'Captura estado</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.estado)) {
            isErrorValidate = true
            textError += 'Estado no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.colonia) {
            isErrorValidate = true
            textError += 'Captura colonia</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.colonia)) {
            isErrorValidate = true
            textError += 'Colonia no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.entreCalles) {
            isErrorValidate = true
            textError += 'Captura entre calle</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.entreCalles)) {
            isErrorValidate = true
            textError += 'Entre calle no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.referencias) {
            isErrorValidate = true
            textError += 'Captura referencia</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.referencias)) {
            isErrorValidate = true
            textError += 'Referencias no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.codigoPostal) {
            isErrorValidate = true
            textError += 'Captura c\u00F3digo postal</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.codigoPostal)) {
            isErrorValidate = true
            textError += 'C\u00F3digo no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.telefono) {
            isErrorValidate = true
            textError += 'Captura n\u00FAmero telef\u00f3nico</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.telefono)) {
            isErrorValidate = true
            textError += 'Tel\u00E9fono no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.celular) {
            isErrorValidate = true
            textError += 'Captura n\u00famero de celular</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.celular)) {
            isErrorValidate = true
            textError += 'Celular no v\u00E1lido</br>';
        }


        if (!$scope.informacionCliente.razonsocial) {
            isErrorValidate = true
            textError += 'Captura raz\u00F3n social</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.razonsocial)) {
            isErrorValidate = true
            textError += 'Nombre raz\u00F3n social</br>';
        }

        if (!$scope.informacionCliente.correo) {
            isErrorValidate = true
            textError += 'Captura correo v\u00E1lido</br>';
        } else if (!$scope.emailFormat.test($scope.informacionCliente.correo)) {
            isErrorValidate = true
            textError += 'Captura correo v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.nombreContacto) {
            isErrorValidate = true
            textError += 'Captura el nombre del contacto</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.nombreContacto)) {
            isErrorValidate = true
            textError += 'Nombre contacto no v\u00E1lido</br>';
        }

        if (!$scope.informacionCliente.telefonoContacto) {
            isErrorValidate = true
            textError += 'Captura n\u00famero de tel\u00E9fono</br>';
        } else if (regExpresionEspecialCharacters.test($scope.informacionCliente.telefonoContacto)) {
            isErrorValidate = true
            textError += 'Celular no v\u00E1lido</br>';
        }


        if (isErrorValidate) {
            mostrarMensajeWarningValidacion(textError)
        }
        return isErrorValidate;
    }
    $scope.validarTercerPaso = function () {
        let isValidateLatitudLongitud = $scope.validarLatitudLongitudMap();
        if (isValidateLatitudLongitud) {
            mostrarMensajeWarningValidacion('Selecciona la correcta ubicaci&oacute;n en el mapa</br>')
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


    angular.element(document).ready(function () {
        $("#modal-filtro-arbol").on("hidden.bs.modal", function () {
            $scope.validarModalesTipoIntervencionesGeografia('arbol');
        });

        $("#modal-filtro-tipoordenes").on("hidden.bs.modal", function () {
            $scope.validarModalesTipoIntervencionesGeografia('tipoorden');
        });

        $("#modal-arbol-paquete").on("hidden.bs.modal", function () {
            let paquete = $('#jstree-paquete').jstree("get_selected", true);
            if (paquete.length) {
                $scope.infoBasica.paquete = paquete[0].text;
                $scope.$apply();
            }
        });

        $("#modal-canal-ventas").on("hidden.bs.modal", function () {
            let venta = $('#jstree-canal-ventas').jstree("get_selected", true);
            if (venta.length) {
                $scope.infoBasica.canalVenta = venta[0].text;
                $scope.$apply();
            }
        });

        $('#horaestimada-form').timepicker({
            format: 'hh:mm:ss a',
            change: function (dateInput) {
                let minutos = dateInput.getMinutes() + ""
                let horas = dateInput.getHours() + ""
                $scope.infoBasica.horaEstimada = (horas.padStart(2, '0')) + ':' + (minutos.padStart(2, '0'));
                $scope.$apply()
                console.log($scope.infoBasica.horaEstimada)
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

        let textUltimoNivel = ''
        let idTempActual;
        let objectCiudadSelected
        angular.forEach(selectedElms, function (elem, index) {
            selected_arbol = elem.original;
        });
        if (selected_arbol !== undefined && selected_arbol.nivel === $scope.nGeografia) {
            textUltimoNivel = selected_arbol.text;
            idTempActual = selected_arbol.id;
        }

        let indexLimit = $scope.nGeografia;
        for (let i = indexLimit; i >= 0; i--) {
            //cuando el nivel es 2 
            if (i == 2) {
                objectCiudadSelected = $scope.listaArbolCiudades.find(function (ele) { return ele.id == idTempActual; })
                break;
            } else {
                idTempActual = $scope.listaArbolCiudades.find(function (ele) { return ele.id == idTempActual; }).parent
            }
        }


        const diffTime = Math.abs($scope.dateSelectedCalendarEvent - $scope.dateTodayCalendar);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let paquete = $('#jstree-paquete').jstree("get_selected", true);
        let venta = $('#jstree-canal-ventas').jstree("get_selected", true);
     
        let envioFechaAgenda  =angular.copy( $scope.infoBasica.fechaTurnoText )
        let envioidTurno  =angular.copy( $scope.infoBasica.idTurnoSeleccion )

        
        if( !$scope.verAplicaDisponbilidad  ){
            console.log("no  aplica dispo")
            envioFechaAgenda = angular.copy($scope.infoBasica.fechaTurnoTextAplica)
            envioidTurno     = angular.copy(parseInt($scope.infoBasica.idTurnoSeleccionAplica))            
        }
        let jsonEnvio = {
            "nombreOrden": nombreOrden,   //Ejemplo: Instalación
            "tipoOrden": tipoOrdenId,            //id tipo orden
            "subTipoOrden": subTipoOrden,         //id siubtipo orden   
            "flujo": 8,
            "geografia1": objectCiudadSelected.text, //DESCRIPCION CIUDAD
            "geografia2": textUltimoNivel, //DESCRIPCION ULTIMO NIVEL

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
        console.log("jsonEnvio");
        console.log(jsonEnvio)

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
                        $scope.verAplicaDisponbilidad=true;
                        $scope.errorSeleccionIntGeografia=true;
                      
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
    $scope.informacionCliente = {
        "nombre": "HECTOR ",
        "apaterno": "santamaria",
        "amaterno": "orduna",
        "nombreContacto": "FATMA SA DE CV",
        "calle": "AVENIDA FLORES",
        "numeroExt": "NA",
        "numeroInt": "12",
        "codigoPostal": "926152",
        "comentario": "comentario testing",

        "estado": "MORELOS",
        "municipio": "EMILIANO ZAPATA",
        "entreCalles": "GUERRERO Y DEL CRUCERO",
        "referencias": "ENTRE ASP. 1 Y RED..",
        "ext": "",
        "telefono": "7772804607",
        "celular": "7772771921",
        "ciudad": "CUENRNAA",
        "colonia": "CAPULIN",
        "correo": "hector.stamaria92@gmail.com",
        "telefonoContacto": "777722127",
        "razonsocial": "Total play empresarial DE cv"
    }
    //}

}]);