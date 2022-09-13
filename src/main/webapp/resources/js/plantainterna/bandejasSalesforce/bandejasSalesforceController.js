var app = angular.module('bandejasSalesforceApp', []);
var objectTempAccion;

app.controller('bandejasSalesforceController', ['$scope', '$q', 'bandejasSalesforceService', 'genericService', 'busquedaSalesforceService', function ($scope, $q, bandejasSalesforceService, genericService, busquedaSalesforceService) {
	app.busquedaSalesforce($scope, busquedaSalesforceService)
    $scope.banderaNoticiasTicket = false;
    $scope.banderaNoticiasOportunidad = false;
    $scope.banderaNoticiasOs = false;
    $scope.vistaSf = 0;
    $scope.nombreBandejaSf = "";
    $scope.isPendienteActivar = false;
    $scope.isPendienteAgendar = false;
    $scope.isRescataventas = false;
    let pendientesActivarTable;
    let pendientesAgendarTable;
    let rescataventasTable;
    $scope.listPendientesActivar = [];
    $scope.listRescataventas = [];
    $scope.listPendientesAgendar = [];
    $scope.listadogeografiacopy = [];
    $scope.geografiasPendienteActivar = [];
    $scope.geografiasPendienteAgendar = [];
    $scope.geografiasRescataventas = [];
    let treeAgendar;
    let treeActivar;
    let treeRescataventas;
    $scope.banderaErrorGeografia = false;
    $scope.isAgendamiento = false;
    $scope.elementoCSP = {};
    $scope.contactoSelected = {}
    $scope.listContactosAgendamiento =[]
    $scope.infoFactibilidad = {};
    $scope.isPermisoConsultaPendientesAgendar = false;
    $scope.isPermisoConsultaRescataventas = false;
    $scope.isPermisoConsultaPendientesActivar = false;
    $scope.isPermisoAgendamiento = false;
    $scope.GEOGRAFIA_UNO_AGENDA = null;
    $scope.GEOGRAFIA_DOS_AGENDA = null;
    $scope.GEOGRAFIA_UNO_AGENDA_NOMBRE = null;
    $scope.GEOGRAFIA_DOS_AGENDA_NOMBRE = null;
    
    $scope.llaveTipoIntervencion = null;
    $scope.llaveSubtipoIntervencion = null;
    
    $scope.isCspAgendado = false;
    $scope.mensajeCspAgendado = "";
    $scope.flagCargandoCalendar = true;
    $scope.isDatosFactibilidad = true;

    app.agendamientoCalendar($scope, bandejasSalesforceService);
    app.agendamientoMap($scope, bandejasSalesforceService);

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    $scope.initBandejasSF = function () {
        $('.datepicker').datepicker({
            format: "dd/mm/yyyy",
            startView: "months",
            minViewMode: "months",
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        $('.datepicker').datepicker('update', new Date());
        $scope.reiniciarTablaPendientesAgendar()
        $scope.reiniciarTablaRescataventas()
        pendientesActivarTable = $('#tablePendienteActivar').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
    }

    $scope.busquedaGeografiaConsulta = function (type) {
        if (type == 'pendienteAgendar') {
            $("#geografiaPendientesAgendar").jstree("search", $('#buscadorGeografiaPendienteAgendar').val());
        }
        if (type == 'rescataventas') {
            $("#geografiaRescataventas").jstree("search", $('#buscadorGeografiaRescataventas').val());
        }
        if (type == 'pendienteActivar') {
            $("#geografiaPendientesActivar").jstree("search", $('#buscadorGeografiaPendienteActivar').val());
        }
    }

    $scope.btnAceptarGeografiaConsulta = function (type) {
        if (type == 'pendientesAgendar') {
            var geografias = $('#geografiaPendientesAgendar').jstree("get_selected", true);
            let textoGeografias = [];
            angular.forEach(geografias, (geografia, index) => {
                textoGeografias.push(geografia.text);
            });
            $('#txtGeografiasConsultaAgendar').val(textoGeografias);
            if (textoGeografias.length > 0) {
                $("#txtGeografiasConsultaAgendar").css("border-bottom", "2px solid #d9d9d9");
            }
        }
        if (type == 'rescataventas') {
            var geografias = $('#geografiaRescataventas').jstree("get_selected", true);
            let textoGeografias = [];
            angular.forEach(geografias, (geografia, index) => {
                textoGeografias.push(geografia.text);
            });
            $('#txtGeografiasConsultaRescataventas').val(textoGeografias);
            if (textoGeografias.length > 0) {
                $("#txtGeografiasConsultaRescataventas").css("border-bottom", "2px solid #d9d9d9");
            }
        }
        if (type == 'pendientesActivar') {
            var geografias = $('#geografiaPendientesActivar').jstree("get_selected", true);
            let textoGeografias = [];
            angular.forEach(geografias, (geografia, index) => {
                textoGeografias.push(geografia.text);
            });
            $('#txtGeografiasConsultaActivar').val(textoGeografias);
            if (textoGeografias.length > 0) {
                $("#txtGeografiasConsultaActivar").css("border-bottom", "2px solid #d9d9d9");
            }
        }
    }

    $scope.cambiarVistaSF = function (opcion) {
        if (opcion === 1) {
            if ($scope.isPermisoConsultaPendientesAgendar) {
                $scope.nombreBandejaSf = "PENDIENTES DE AGENDAR";
                $scope.isPendienteAgendar = true;
                $scope.isRescataventas = false;
                $scope.isPendienteActivar = false;
                if (!treeAgendar) {
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    treeAgendar = $('#geografiaPendientesAgendar').bind('loaded.jstree', function (e, data) {
                        $scope.btnAceptarGeografiaConsulta('pendientesAgendar');
                        $scope.consultarPendientesAgendarBandejas();
                        $scope.$apply();
                    }).jstree({
                        'plugins': ["wholerow", "checkbox", "search"],
                        'core': {
                            'data': $scope.geografiasPendienteAgendar,
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
                }
            }
        }
        if (opcion === 2) {
            if ($scope.isPermisoConsultaRescataventas) {
                $scope.nombreBandejaSf = "RESCATAVENTAS";
                $scope.isRescataventas = true;
                $scope.isPendienteActivar = false;
                $scope.isPendienteAgendar = false;
                if (!treeRescataventas) {
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    treeRescataventas = $('#geografiaRescataventas').bind('loaded.jstree', function (e, data) {
                        $scope.btnAceptarGeografiaConsulta('rescataventas');
                        $scope.consultarRescataventasBandejas();
                        $scope.$apply();
                    }).jstree({
                        'plugins': ["wholerow", "checkbox", "search"],
                        'core': {
                            'data': $scope.geografiasRescataventas,
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
                }
            }
        }
        if (opcion === 3) {
            if ($scope.isPermisoConsultaPendientesActivar) {
                $scope.nombreBandejaSf = "PENDIENTES DE ACTIVAR";
                $scope.isPendienteActivar = true;
                $scope.isPendienteAgendar = false;
                $scope.isRescataventas = false;
                if (!treeActivar) {
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    treeActivar = $('#geografiaPendientesActivar').bind('loaded.jstree', function (e, data) {
                        $scope.btnAceptarGeografiaConsulta('pendientesActivar');
                        $scope.consultarPendientesActivarBandejas();
                        //$scope.$apply();
                    }).jstree({
                        'plugins': ["wholerow", "checkbox", "search"],
                        'core': {
                            'data': $scope.geografiasPendienteActivar,
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
                }
            }
        }
        $scope.vistaSf = opcion;
    }

    $scope.abrirModalGeografiaConsulta = function (type) {
        if (type == 'pendientesAgendar') {
            if ($scope.geografiasPendienteAgendar !== "") {
                $("#modalCluster").modal({ backdrop: 'static', keyboard: false });
                $("#modalCluster").modal('show');
                setTimeout(function () {
                    $('#buscadorGeografiaPendienteAgendar').focus();
                }, 750);
            } else {
                toastr.info('¡Actualmente no existen geografías!');
            }
        } else if (type == 'pendientesActivar') {
            if ($scope.geografiaPendienteActivar !== "") {
                $("#modalCluster").modal({ backdrop: 'static', keyboard: false });
                $("#modalCluster").modal('show');
                setTimeout(function () {
                    $('#buscadorGeografiaPendienteActivar').focus();
                }, 750);
            } else {
                toastr.info('¡Actualmente no existen geografías!');
            }
        } else if (type == 'rescataventas') {
            if ($scope.geografiaRescataventas !== "") {
                $("#modalCluster").modal({ backdrop: 'static', keyboard: false });
                $("#modalCluster").modal('show');
                setTimeout(function () {
                    $('#buscadorGeografiaRescataventas').focus();
                }, 750);
            } else {
                toastr.info('¡Actualmente no existen geografías!');
            }
        }
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

    $scope.consultarFiltrosBandejasSF = function () {
        $q.all([
            bandejasSalesforceService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloBandejasSalesforce" }),
            bandejasSalesforceService.consultarCatalogoGeografia()
        ]).then(function (results) {
            let resultConf = results[0].data.result;
            if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;

                if (llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTES_ACTIVAR) {
                    $scope.nfiltrogeografiaPendienteActivar = llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTES_ACTIVAR;
                } else if (llavesResult.N_FILTRO_GEOGRAFIA) {
                    $scope.nfiltrogeografiaPendienteActivar = llavesResult.N_FILTRO_GEOGRAFIA;
                }

                if (llavesResult.N_FILTRO_GEOGRAFIA_RESCATAVENTAS) {
                    $scope.nfiltrogeografiaRescataVentas = llavesResult.N_FILTRO_GEOGRAFIA_RESCATAVENTAS;
                } else if (llavesResult.N_FILTRO_GEOGRAFIA) {
                    $scope.nfiltrogeografiaRescataVentas = llavesResult.N_FILTRO_GEOGRAFIA;
                }

                if (llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTES_AGENDAR) {
                    $scope.nfiltrogeografiaPendienteAgendar = llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTES_AGENDAR;
                } else if (llavesResult.N_FILTRO_GEOGRAFIA) {
                    $scope.nfiltrogeografiaPendienteAgendar = llavesResult.N_FILTRO_GEOGRAFIA;
                }
                
                if(llavesResult.GEOGRAFIA_UNO_AGENDA){
                	$scope.GEOGRAFIA_UNO_AGENDA = llavesResult.GEOGRAFIA_UNO_AGENDA;
                }
                
                if(llavesResult.GEOGRAFIA_DOS_AGENDA){
                	$scope.GEOGRAFIA_DOS_AGENDA = llavesResult.GEOGRAFIA_DOS_AGENDA;
                }
                
                if (llavesResult.KEY_TIPO_INTERVENCION_PENDIENTES) {
                    $scope.llaveTipoIntervencion = llavesResult.KEY_TIPO_INTERVENCION_PENDIENTES;
                }
                
                if (llavesResult.KEY_SUBTIPO_INTERVENCION_PENDIENTES) {
                    $scope.llaveSubtipoIntervencion = llavesResult.KEY_SUBTIPO_INTERVENCION_PENDIENTES;
                }

                validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

                let arrayDefaultKmzElemts=llavesResult.KEY_DEFAULT_KMZ ? llavesResult.KEY_DEFAULT_KMZ.split(",") : null;
                GenericMapa.prototype.callPrototypeMapa(results[0].data.result,arrayDefaultKmzElemts);
                
                $scope.initMapaAgendamiento();
            }

            if (resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.permisos && resultConf.MODULO_ACCIONES_USUARIO.permisos != "") {
                $scope.permisosUsuario = resultConf.MODULO_ACCIONES_USUARIO.permisos;
                $scope.isPermisoConsultaPendientesAgendar = ($scope.permisosUsuario.filter(e => { return e.clave == "accionConsultarPendientesAgendar" })[0] != undefined);
                $scope.isPermisoConsultaRescataventas = ($scope.permisosUsuario.filter(e => { return e.clave == "accionConsultarRescataventas" })[0] != undefined);
                $scope.isPermisoConsultaPendientesActivar = ($scope.permisosUsuario.filter(e => { return e.clave == "accionConsultarPendientesActivar" })[0] != undefined);
                $scope.isPermisoAgendamiento = ($scope.permisosUsuario.filter(e => { return e.clave == "accionAgendamiento" })[0] != undefined);
                objectTempAccion = new GenericAccionRealizada("" +  resultConf.MODULO_ACCIONES_USUARIO.id, 'TOP_RIGHT');
                objectTempAccion.inicializarBotonAccionesRecientes();
            }

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        if (results[1].data.result.geografia) {
                            $scope.listadogeografiacopy = angular.copy(results[1].data.result.geografia);
                            //GEOGRAFIA PENDIENTES ACTIVAR
                            $scope.nfiltrogeografiaPendienteActivar = $scope.nfiltrogeografiaPendienteActivar ? $scope.nfiltrogeografiaPendienteActivar : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.listadogeografiacopy);
                            $scope.geografiasPendienteActivar = $scope.listadogeografiacopy.filter(e => e.nivel <= parseInt($scope.nfiltrogeografiaPendienteActivar));
                            $scope.geografiasPendienteActivar.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
                            $scope.geografiasPendienteActivar.map((e) => {
                                e.parent = e.padre == null ? 0 : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: true,
                                }
                                return e
                            })

                            //GEOGRAFIA PENDIENTES AGENDAR
                            $scope.nfiltrogeografiaPendienteAgendar = $scope.nfiltrogeografiaPendienteAgendar ? $scope.nfiltrogeografiaPendienteAgendar : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.listadogeografiacopy);
                            $scope.geografiasPendienteAgendar = $scope.listadogeografiacopy.filter(e => e.nivel <= parseInt($scope.nfiltrogeografiaPendienteAgendar));
                            $scope.geografiasPendienteAgendar.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
                            $scope.geografiasPendienteAgendar.map((e) => {
                                e.parent = e.padre == null ? 0 : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: true,
                                }
                                return e
                            })

                            //GEOGRAFIA RESCATAVENTAS
                            $scope.nfiltrogeografiaRescataVentas = $scope.nfiltrogeografiaRescataVentas ? $scope.nfiltrogeografiaRescataVentas : $scope.obtenerNivelUltimoJerarquiaGeneric($scope.listadogeografiacopy);
                            $scope.geografiasRescataventas = $scope.listadogeografiacopy.filter(e => e.nivel <= parseInt($scope.nfiltrogeografiaRescataVentas));
                            $scope.geografiasRescataventas.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
                            $scope.geografiasRescataventas.map((e) => {
                                e.parent = e.padre == undefined ? "#" : e.padre;
                                e.text = e.nombre;
                                e.icon = "fa fa-globe";
                                e.state = {
                                    opened: false,
                                    selected: true,
                                }
                                return e
                            })

                            if ($scope.isPermisoConsultaPendientesAgendar) {
                                $scope.cambiarVistaSF(1);
                            } else if ($scope.isPermisoConsultaRescataventas) {
                                $scope.cambiarVistaSF(2);
                            } else if ($scope.isPermisoConsultaPendientesActivar) {
                                $scope.cambiarVistaSF(3);
                            }

                            $("#idBody").removeAttr("style");
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

    $scope.limpiarFormularioNuevoContacto = function () {
        $("#nombreContacto").removeClass("invalid-inputContacto");
        $("#aPaternoContacto").removeClass("invalid-inputContacto");
        $("#aMaternoContacto").removeClass("invalid-inputContacto");
        $("#generoContacto").removeClass("invalid-inputContacto");
        $("#emailContacto").removeClass("invalid-inputContacto");
        $("#telefonoFijoContacto").removeClass("invalid-inputContacto");
        $("#celularContacto").removeClass("invalid-inputContacto");
        $("#nombreContacto").val('');
        $("#aPaternoContacto").val('');
        $("#aMaternoContacto").val('');
        $("#generoContacto").val('');
        $("#emailContacto").val('');
        $("#telefonoFijoContacto").val('');
        $("#celularContacto").val('');
        $("#extensionContacto").val('');
        $scope.$apply();
    }

    $('#modalNuevoContacto').on('hidden.bs.modal', function () {
        $scope.limpiarFormularioNuevoContacto();
    });

    $(".inputContacto").keyup(function () {
        var input = $(this).attr("id");
        if ($(this).val() === "" || $(this).val() === undefined) {
            $("#" + input).addClass("invalid-inputContacto");
        } else {
            $("#" + input).removeClass("invalid-inputContacto");
        }
    });

    $("#generoContacto").change(function () {
        $("#generoContacto").removeClass("invalid-inputContacto");
    });

    $scope.agregarContactoAgendamiento = function (contactoAg) {
        let isValid = true;
        let mensajeError = '';
        $("#nombreContacto").removeClass("invalid-inputContacto");
        $("#aPaternoContacto").removeClass("invalid-inputContacto");
        $("#aMaternoContacto").removeClass("invalid-inputContacto");
        $("#emailContacto").removeClass("invalid-inputContacto");
        $("#generoContacto").removeClass("invalid-inputContacto");
        $("#telefonoFijoContacto").removeClass("invalid-inputContacto");
        $("#celularContacto").removeClass("invalid-inputContacto");

        if ($("#nombreContacto").val() == undefined || $("#nombreContacto").val() == '') {
            $("#nombreContacto").addClass("invalid-inputContacto");
            mensajeError += "<li>Debe ingresar un Nombre de Contacto</li>";
            isValid = false;
        } 
        if ($("#aPaternoContacto").val() == undefined || $("#aPaternoContacto").val() == '') {
            $("#aPaternoContacto").addClass("invalid-inputContacto");
            mensajeError += "<li>Debe ingresar el Apellido Paterno del Contacto</li>";
            isValid = false;
        }

        if ($("#aMaternoContacto").val() == undefined || $("#aMaternoContacto").val() == '') {
            $("#aMaternoContacto").addClass("invalid-inputContacto");
            mensajeError += "<li>Debe ingresar el Apellido Materno del Contacto</li>";
            isValid = false;
        }
        if ($("#emailContacto").val() == undefined || $("#emailContacto").val() == '') {
            $("#emailContacto").addClass("invalid-inputContacto");
            mensajeError += "<li>Debe ingresar el Correo Electr&oacute;nico del Contacto</li>";
            isValid = false;
        } else {
            if ($("#emailContacto").val().indexOf('@', 0) == -1 || $("#emailContacto").val().indexOf('.', 0) == -1) {
                $("#emailContacto").addClass("invalid-inputContacto");
                mensajeError += "<li>Valida el formato del correo electr&oacute;nico</li>";
                isValid = false;
            } 
        }

        if ($("#generoContacto").val() == undefined || $("#generoContacto").val() == '') {
            $("#generoContacto").addClass("invalid-inputContacto");
            mensajeError += "<li>Debe seleccionar un G&eacute;nero</li>";
            isValid = false;
        }

        if ($("#telefonoFijoContacto").val() == undefined || $("#telefonoFijoContacto").val() == '') {
            $("#telefonoFijoContacto").addClass("invalid-inputContacto");
            mensajeError += "<li>Debe ingresar un N&uacute;mero de Tel&eacute;fono Fijo</li>";
            isValid = false;
        } else {
            if ($("#telefonoFijoContacto").val().length < 10) {
                $("#telefonoFijoContacto").addClass("invalid-inputContacto");
                mensajeError += "<li>Debe ingresar un N&uacute;mero de Tel&eacute;fono v&aacute;lido</li>";
                isValid = false;
            } 
        }

        if ($("#celularContacto").val() == undefined || $("#celularContacto").val() == '') {
            $("#celularContacto").addClass("invalid-inputContacto");
            mensajeError += "<li>Debe ingresar un N&uacute;mero de Tel&eacute;fono Celular</li>";
            isValid = false;
        } else {
            if ($("#celularContacto").val().length < 10) {
                $("#celularContacto").addClass("invalid-inputContacto");
                mensajeError += "<li>Debe ingresar un N&uacute;mero de Celular v&aacute;lido</li>";
                isValid = false;
            } 
        }

        if (isValid) {
            $scope.guardarContactoAgendamiento(contactoAg);
            // contactoAg.id = 1;
            // $scope.listContactosAgendamiento.push(contacto);
            // $("#modalNuevoContacto").modal('hide');
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.guardarContactoAgendamiento = function(contacto) {
        contacto.nombreCompleto=contacto.nombre+' '+  contacto.apellidoP+' '+ contacto.apellidoM
        contacto.title = "Jefe"                     
        let params={
            arrayContactos:[ contacto ],
            cuenta:$scope.elementoCSP.infoSitio.numeroCuenta,
            idCsp:$scope.elementoCSP.idCSP
        }          

        let copyContacto=angular.copy(contacto);
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let tituloAccion = "Guardar contacto";
        let mensajeEnvio = 'Ha ocurrido un error al guardar el contacto para la cuenta: ' + params.numeroCuenta;
        bandejasSalesforceService.guardarContactoSalesforce(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.result!=undefined) {
                    if(response.data.result.ids != undefined && response.data.result.ids.length>0){
                        mensajeEnvio = "Se ha guardado el contacto para la cuenta: " + params.numeroCuenta;
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                        copyContacto.id=response.data.result.ids[0]
                        $scope.listContactosAgendamiento.push(copyContacto);
                        $scope.idContactoSelected= copyContacto.id
                        $scope.contactoSelected=angular.copy(copyContacto)
                        $("#modalNuevoContacto").modal('hide');
                        mostrarMensajeExitoAlert("Contacto agregado correctamente");
                        swal.close();
                    }else{
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        mostrarMensajeWarningValidacion('No se pudo guardar el contacto');
                        swal.close();
                    }                 
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                mostrarMensajeErrorAlert('Ha ocurrido un error al consultar la factibilidad');
                swal.close();
            }
        });
    }

    $scope.clearFormAgendamiento = function () {
        $("#opcion-calendarioAgendamiento-tab").trigger("click");
        $("#contactoAgendamiento").val('');
        $("#entreCallesAgendamiento").val('');
        $("#referenciasAgendamiento").val('');
        $("#comentariosAgendamiento").val('');
    }

    $scope.flagConsultandoFactibilidad = false;
    $scope.flagRespuestaFactibilidad = 'noprocess';
    $scope.consultarFactibilidadAgendamiento = function (unidadNegocio, latitud, longitud) {
        $scope.flagConsultandoFactibilidad = true;
        let params = {
            latitud: parseFloat( latitud ),
            longitud: parseFloat( longitud )
        }

        bandejasSalesforceService.consultaFactibilidadAgendamiento(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {                       
                        let respFact = response.data.result;                
                        if (Number(response.data.result.factibilidad) === 0) {
                            mostrarMensajeWarningValidacion('Sin factibilidad en esta ubicaci&oacute;n');
                            $scope.flagRespuestaFactibilidad='noencontrada'
                        }else{
                            let resultFactibilidad = {
                                factibilidad:               respFact.factibilidad,
                                regionIdc:                  respFact.regionEnlace ? respFact.regionEnlace.split("-")[0] : respFact.regionTotalplay ? respFact.regionTotalplay.split("-")[0] : "Sin info",
                                region:                     respFact.regionEnlace ? respFact.regionEnlace.split("-")[1] : respFact.regionTotalplay ? respFact.regionTotalplay.split("-")[1] : "Sin info",
                                ciudad:                     respFact.ciudadEnlace ? respFact.ciudadEnlace : respFact.ciudadTotalplay ? respFact.ciudadTotalplay : "Sin info",
                                distrito:                   respFact.distritoEnlace ? respFact.distritoEnlace : respFact.distritoTotalplay ? respFact.distritoTotalplay : "Sin info",
                                cluster:                    respFact.clusterTotalplay ? respFact.clusterTotalplay : respFact.clusterTotalplay ? respFact.clusterTotalplay : "Sin info",
                                latitud: latitud,
                                longitud: longitud,
                                tipoFibra:                  respFact.tipoFibra,
                                tipoCoberturaMicroonda:     respFact.tipoCoberturaMicroonda,
                                regionEnlace:               respFact.regionEnlace ? respFact.regionEnlace.split("-")[0] : respFact.regionTotalplay ? respFact.regionTotalplay : "Sin info",
                                nombreRadiobase:            respFact.nombreRadiobase,
                                nombreOlt:                  respFact.nombreOlt,
                                infraestructura:            respFact.infraestructura,
                                domicilio:                  respFact.domicilio,
                                distanciaRadiobase:         respFact.distanciaRadiobase,
                                distanciaFo:                respFact.distanciaFo,
                                comentario:                 respFact.comentario,
                                bufferEnlace:               respFact.bufferEnlace,
                            }
                            $scope.infoFactibilidad = resultFactibilidad;
                            $scope.flagRespuestaFactibilidad='exito'
                        }
                        $scope.flagConsultandoFactibilidad = false; 
                        swal.close();
                    } else {
                        $scope.flagConsultandoFactibilidad = false; 
                        $scope.flagRespuestaFactibilidad=='error'
                        mostrarMensajeWarningValidacion('No se encontr&oacute; factibilidad');
                        swal.close();
                    }
                } else {
                    $scope.flagConsultandoFactibilidad = false; 
                    $scope.flagRespuestaFactibilidad=='error'
                    mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                    swal.close();
                }
            } else {
                $scope.flagConsultandoFactibilidad = false; 
                $scope.flagRespuestaFactibilidad=='error'
                mostrarMensajeErrorAlert('Ha ocurrido un error al consultar la factibilidad');
                swal.close();
            }
        });    
    }

    visualizarAgendamiento = function (index) {
    	$scope.flagCargandoCalendar = true;
    	$scope.isDatosFactibilidad = true;
    	$scope.consultarValidacionCSP(index);
    	$scope.indexPendienteSeleccionada = index;
    	$scope.isCspAgendado = false;
        $scope.mensajeCspAgendado = "";
    }
    
    $("#cerrarAgendamiento").click(function() {
    	$("#calendar_agendamiento").css('visibility', 'hidden');
    });
    
    $scope.actualizarCalendario = function() {
    	setTimeout(function () {
    		$scope.calendarAgendamiento.render();
        }, 250);
	}
    
    $scope.validarDatos = function() {
    	$scope.listContactosAgendamiento = []
        $scope.infoFactibilidad = {};	
        $scope.elementoCSP = {};
        $scope.elementoCSP = $scope.listPendientesAgendar[$scope.indexPendienteSeleccionada];
        $scope.clearMarkersAgendamiento();
        $scope.clearFormAgendamiento();
        $scope.GEOGRAFIA_UNO_AGENDA_NOMBRE = null;
        $scope.GEOGRAFIA_DOS_AGENDA_NOMBRE = null;
        
        $scope.listaIdGeografias = [];
        var geografias = $("#geografiaPendientesAgendar").jstree("get_selected", true);
        angular.forEach(geografias,(geo,index) => {
			$scope.listaIdGeografias.push(geo.id);				
		});

        let paramsDetalleSitio={
            cuenta:$scope.elementoCSP.cuentaFacturaSf.noCuenta
        };
        
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();

        $q.all([
            bandejasSalesforceService.consultarInfoSitioInstalacion(paramsDetalleSitio)
        ]).then(function (results) {
            if (results[0].data) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        if (results[0].data.result.resultadoConsulta != undefined) {
                            $scope.elementoCSP.infoSitio = results[0].data.result.resultadoConsulta;
                            $scope.tipoGeografiaFact="empresarial";
                            let latitud=$scope.elementoCSP.infoSitio.geolocalizacionInstalacionLatitudeS;
                            let longitud=$scope.elementoCSP.infoSitio.geolocalizacionInstalacionLongitudeS;
                            $scope.setMarkerAgendamiento( latitud , longitud );                                                            
                            $scope.consultarFactibilidadAgendamiento( '1' , latitud , longitud  );
                            
                            $scope.asignarGeografiasUnoDos();
                            
                        }else{
                            mostrarMensajeInformativo("No se encontr&oacute; informaci&oacute;n del sitio");
                        }                  
                        if ( results[0].data.result.resultadoContactos != undefined && results[0].data.result.resultadoContactos.length > 0 ) {
                            $scope.listContactosAgendamiento= results[0].data.result.resultadoContactos;
                        }
                    } else {
                        mostrarMensajeInformativo("No se encontr&oacute; informaci&oacute;n del sitio");
                    }
                } else {
                    mostrarMensajeErrorAlert(results[0].data.resultDescripcion);
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(results[0].data.resultDescripcion);
                swal.close();
            }
            swal.close()
        });
        $scope.isAgendamiento = true;
        $scope.isFactibilidad = false;
        $scope.isFechaSelected = false;
	}
    
    $scope.asignarGeografiasUnoDos = function() {
		
    	switch($scope.GEOGRAFIA_UNO_AGENDA){
	    	case "cluster":
	    		$scope.GEOGRAFIA_UNO_AGENDA_NOMBRE = $scope.elementoCSP.infoSitio.clusterInstalacionC;
	    		break;
	    	case "ciudad":
	    		$scope.GEOGRAFIA_UNO_AGENDA_NOMBRE = $scope.elementoCSP.infoSitio.plazaC;
	    		break;
	    	case "distrito":
	    		$scope.GEOGRAFIA_UNO_AGENDA_NOMBRE = $scope.elementoCSP.infoSitio.distritoInstalacionC;
	    		break;
	    	case "region":
	    		$scope.GEOGRAFIA_UNO_AGENDA_NOMBRE = $scope.elementoCSP.infoSitio.regionInstalacionC;
	    		break;
	    }
	    
	    switch($scope.GEOGRAFIA_DOS_AGENDA){
	    	case "cluster":
	    		$scope.GEOGRAFIA_DOS_AGENDA_NOMBRE = $scope.elementoCSP.infoSitio.clusterInstalacionC;
	    		break;
	    	case "ciudad":
	    		$scope.GEOGRAFIA_DOS_AGENDA_NOMBRE = $scope.elementoCSP.infoSitio.plazaC;
	    		break;
	    	case "distrito":
	    		$scope.GEOGRAFIA_DOS_AGENDA_NOMBRE = $scope.elementoCSP.infoSitio.distritoInstalacionC;
	    		break;
	    	case "region":
	    		$scope.GEOGRAFIA_DOS_AGENDA_NOMBRE = $scope.elementoCSP.infoSitio.regionInstalacionC;
	    		break;
	    }
	    
	    $scope.consultarDisponibilidad();
    }
    
    $scope.consultarDisponibilidad = function() {
    	
    	$scope.elementoCSP.turnoAgendamiento = '';
        $scope.elementoCSP.fechaAgendamiento = '';
    	
    	let dataDisp={
            	geografia1: $scope.GEOGRAFIA_UNO_AGENDA_NOMBRE != null ? $scope.GEOGRAFIA_UNO_AGENDA_NOMBRE : "CIUDAD DE MEXICO-CENTRO",
                geografia2: $scope.GEOGRAFIA_DOS_AGENDA_NOMBRE != null ? $scope.GEOGRAFIA_DOS_AGENDA_NOMBRE : "NORESTE CENTRO G",
                subtipoIntervencion: $scope.llaveSubtipoIntervencion != undefined ? $scope.llaveSubtipoIntervencion : 106,
                propietario: "1",
                unidadNegocio: "1"
        };
    	$q.all([
            bandejasSalesforceService.consultaDisponibilidadAgendamiento(dataDisp)
        ]).then(function (results) {
            if (results[0].data) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        if (results[0].data.result.dias.length) {
                            $scope.muestraDisponibilidadCalendar(results[0].data.result);
                        } else {
                            $scope.muestraDisponibilidadCalendar([]);
                            mostrarMensajeInformativo("No se encontr&oacute; disponibilidad");
                        }
                    } else {
                        $scope.muestraDisponibilidadCalendar([]);
                        mostrarMensajeInformativo("No se encontr&oacute; disponibilidad");
                    }
                } else {
                    mostrarMensajeErrorAlert(results[0].data.resultDescripcion);
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(results[0].data.resultDescripcion);
                swal.close();
            }
            swal.close()
        });
	}

    $scope.colocarContactoSeleccionado=function(){
    	$("#contactoAgendamiento").removeClass("campoNoValido");
        $scope.contactoSelected={}    
        if($scope.idContactoSelected==undefined)
            return 
        $scope.contactoSelected=angular.copy($scope.listContactosAgendamiento.find(function (elem) { return elem.id === $scope.idContactoSelected  }))
    } 
    
    $scope.abrirModalRegistroContacto=function(){
        $("#modalNuevoContacto").modal('show')
    }

    $scope.agendarCSPBandejas = function () {
        let isValid = true;
        let mensajeError = '';
        var comentarios = $("#comentariosAgendamiento").val();
         

        if ($("#comentariosAgendamiento").val() == undefined || $("#comentariosAgendamiento").val() == '') {
			$("#comentariosAgendamiento").addClass("campoNoValido");
            mensajeError += "<li>Debe ingresar un comentario para Agendar</li>";
            isValid = false;
        }

        if ($scope.elementoCSP.turnoAgendamiento == undefined || $scope.elementoCSP.turnoAgendamiento == '') {
        	$("#etiquetaFechaAgendamiento").addClass("campoLabelNoValido");
        	$("#etiquetaTurnoAgendamiento").addClass("campoLabelNoValido");
            mensajeError += "<li>Debe seleccionar un turno del Calendario</li>";
            isValid = false;
        }
        
        if ($("#entreCallesAgendamiento").val() == undefined || $("#entreCallesAgendamiento").val() == '') {
        	$("#entreCallesAgendamiento").addClass("campoNoValido");
            mensajeError += "<li>Debe ingresar el campo entre calles</li>";
            isValid = false;
        }
        
        if ($("#referenciasAgendamiento").val() == undefined || $("#referenciasAgendamiento").val() == '') {
        	$("#referenciasAgendamiento").addClass("campoNoValido");
            mensajeError += "<li>Debe ingresar la(s) referencias</li>";
            isValid = false;
        }
        
        if (Object.entries($scope.contactoSelected).length === 0) {
        	$("#contactoAgendamiento").addClass("campoNoValido");
            mensajeError += "<li>Debe seleccionar un contacto</li>";
            isValid = false;
        }
        
        if (isValid) {
            let contactoTemp=angular.copy($scope.listContactosAgendamiento.find(e=> e.id== $scope.idContactoSelected))

            let params = {
        		"idFlujo": 1,
        		"turno":$scope.elementoCSP.turnoAgendamiento,
        		"tipo": $scope.llaveTipoIntervencion != undefined ? $scope.llaveTipoIntervencion : 48,
        		"subtipo": $scope.llaveSubtipoIntervencion != undefined ? $scope.llaveSubtipoIntervencion : 106,
        		"numeroCuenta": $scope.elementoCSP.infoSitio.numeroCuenta,
        		"cluster": $scope.elementoCSP.cluster,
        		"comentarios": comentarios,
        		"fechaAgendamiento":$scope.elementoCSP.fechaAgendamiento,
        		"hora": "12:00",
        		"confirmacion":"0", 
        		"distribuidor":"",
        		"idTicketSF": "",
        		"posventa": false,
                "folioCsp":$scope.elementoCSP.name,
                "entrecalles":$scope.elementoCSP.entrecalles,
                "referencias":$scope.elementoCSP.referencias,
                "nombreContacto":contactoTemp.nombreCompleto,
                "numContacto":contactoTemp.telefono
            };  

            swal({
                title: "\u00BFEst\u00E1s seguro de enviar la informaci\u00F3n?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
                html:
                    '<b style="color: #ff5200;font-weight: bold;">Valida los datos porfavor:</b>' +
                    '<div style="text-align: left;" class="info_ot_detail">' +
                    '	<div class="col-md-10 offset-md-2">' +
                    '		<b class="title_span_detalle"> Regi&oacute;n:</b> &nbsp; &nbsp;' +
                    '		<span class="ciudad-detalle-cuenta">' + $scope.elementoCSP.infoSitio.regionInstalacionC + '</span>' +
                    '	</div>' +
                    '	<div class="col-md-10 offset-md-2">' +
                    '		<b class="title_span_detalle"> Ciudad:</b> &nbsp; &nbsp;' +
                    '		<span class="ciudad-detalle-cuenta">' + $scope.elementoCSP.infoSitio.plazaC + ' </span>' +
                    '	</div>' +
                    '	<div class="col-md-10 offset-md-2">' +
                    '		<b class="title_span_detalle"> Distrito:</b> &nbsp; &nbsp;' +
                    '		<span class="ciudad-detalle-cuenta">' + $scope.elementoCSP.infoSitio.distritoInstalacionC + ' </span>' +
                    '	</div>' +
                    '	<div class="col-md-10 offset-md-2">' +
                    '		<b class="title_span_detalle"> Cl&uacute;ster:</b> &nbsp; &nbsp;' +
                    '		<span class="ciudad-detalle-cuenta">' + $scope.elementoCSP.infoSitio.clusterInstalacionC + ' </span>' +
                    '	</div>' +
                    '</div>',
            }).then(function (isConfirm) {
                if (isConfirm) {
                	swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    let tituloAccion = "Agendar "+$scope.elementoCSP.name;
                    let mensajeEnvio = 'Ha ocurrido un error al agendar la OT con la cuenta: ' + params.numeroCuenta;
                	bandejasSalesforceService.agendarPendienteBandejaSF(params).then(function success(response) {
                        if (response.data !== undefined) {
                            if (response.data.respuesta) {
                                mensajeEnvio = "Se agend\u00F3 la orden de trabajo " + response.data.result.idOTFFM + " con la " + response.data.result.ordenServicio;
                                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                                mostrarMensajeExitoAlert("Se agend\u00F3 la orden de trabajo " + response.data.result.idOTFFM + " con la " + response.data.result.ordenServicio + ".");
                            	$scope.isCspAgendado = true;
                                $scope.mensajeCspAgendado = "Se agend\u00F3 la orden de trabajo " + response.data.result.idOTFFM + " con la " + response.data.result.ordenServicio + ".";
                            	$scope.isAgendamiento = false;
                                $scope.cambiarVistaSF(1);
                                $scope.elementoCSP = {};
                                swal.close();
                            }else{
                                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            	//mostrarMensajeInformativo(response.data.resultDescripcion);
                                swal({type: "error", title:"Aviso", text:response.data.resultDescripcion});

                            }
                        }else{
                            objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        	//mostrarMensajeWarningValidacion("Error interno en el servidor.");
                            swal({type: "error", title:"Aviso", text:"Ha ocurrido un error al agendar"});


                        }
                	});
                }
            }).catch(err => {
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }
    
    $(".inputFormAgendamiento").keyup(function() {
		var input = $(this).attr("id");
		if( $(this).val()  === "" || $(this).val() === undefined ){
			$("#"+input).addClass("campoNoValido");
		}else{
			$("#"+input).removeClass("campoNoValido");
		}
	});

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        var startDate = moment([fechaPrueba[2], fechaPrueba[1] - 1]);
        var endDate = moment(startDate).endOf('month');
        return { fechaInicio: startDate.format('YYYY-MM-DD'), fechaFin: endDate.format('YYYY-MM-DD') };
    }

    $scope.consultarPendientesAgendarBandejas = function () {
        let isValid = true;
        let mensajeError = '';

        let clustersSelected = $("#geografiaPendientesAgendar").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaPendienteAgendar)
            .map(e => e.text)

        if (clustersSelected.length == 0) {
            mensajeError += "<li>Selecciona geograf\u00EDa</li>";
            isValid = false;
        }

        if (isValid) {
            if (!swal.isVisible()) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
            }
            let paramsfecha = $scope.getFechaFormato(document.getElementById('fecha_pendientes_agendar').value);
            let params = {
                "geografias": clustersSelected,
                "fechaInicio": paramsfecha.fechaInicio,
                "fechaFin": paramsfecha.fechaFin
                // "fechaInicio": '2021-01-01',
                // "geografias": ["CIUDAD DE MEXICO"], "fechaFin": "2021-01-01", "fechaInicio": "2019-01-01"
            }

            bandejasSalesforceService.consultarPendientesAgendarBandejasSF(params).then(function success(response) {
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado.length) {
                                let arrayAgendarRow = [];
                                if (pendientesAgendarTable) {
                                    pendientesAgendarTable.destroy();
                                }
                                $scope.listPendientesAgendar = angular.copy(response.data.result.resultado);
                                $.each($scope.listPendientesAgendar, function (i, elemento) {
                                    let rowAg = [];
                                    let istop500 = (elemento.top500) ? '<i class="fas fa-star" style="color:#fcba5d;"></i>' : '<i class="fas fa-star" style="color: #b1b1b1;"></i>';
                                    rowAg[0] = istop500 + (elemento.name && elemento.name !== '' ? elemento.name : 'Sin informaci&oacute;n');
                                    rowAg[1] = elemento.cotSitio && elemento.cotSitio.nombreCotSitio && elemento.cotSitio.nombreCotSitio !== '' ? elemento.cotSitio.nombreCotSitio : 'Sin informaci&oacute;n';
                                    rowAg[2] = elemento.cotizacion && elemento.cotizacion.cotizacion && elemento.cotizacion.cotizacion !== '' ? elemento.cotizacion.cotizacion : 'Sin informaci&oacute;n';
                                    rowAg[3] = elemento.cuentaFacturaSf && elemento.cuentaFacturaSf.noCuenta && elemento.cuentaFacturaSf.noCuenta !== '' ? elemento.cuentaFacturaSf.noCuenta : 'Sin informaci&oacute;n';
                                    rowAg[4] = elemento.cuentaFacturaSf && elemento.cuentaFacturaSf.nombreCuentaFactura && elemento.cuentaFacturaSf.nombreCuentaFactura !== '' ? elemento.cuentaFacturaSf.nombreCuentaFactura : 'Sin informaci&oacute;n';
                                    rowAg[5] = elemento.dpPlan && elemento.dpPlan.nameDpPlan && elemento.dpPlan.nameDpPlan !== '' ? elemento.dpPlan.nameDpPlan : 'Sin informaci&oacute;n';
                                    rowAg[6] = elemento.cuadrillaFfm && elemento.cuadrillaFfm !== '' ? elemento.cuadrillaFfm : 'Sin informaci&oacute;n';
                                    rowAg[7] = elemento.cluster && elemento.cluster !== '' ? elemento.cluster : 'Sin informaci&oacute;n';
                                    rowAg[8] = elemento.fechaCreacion && elemento.fechaCreacion !== '' ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    rowAg[9] =
                                        '<div class="text-center">' +
                                        '   <span title="Agendar" id="btnAgendamiento' + elemento.name + '" class="btnAgendamiento btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" onclick="visualizarAgendamiento(' + i + ')">' +
                                        '       <i class="fa fa-calendar-alt .iconAgendamiento"></i>' +
                                        '   </span>' +
                                        '</div>';
                                    arrayAgendarRow.push(rowAg);
                                });

                                pendientesAgendarTable = $('#tablePendientesAgendar').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "ordering": true,
                                    "pageLength": 10,
                                    "info": true,
                                    "data": arrayAgendarRow,
                                    "autoWidth": true,
                                    "language": idioma_espanol_not_font,
                                    "aoColumnDefs" : [ 
                    		        	{"aTargets" : [0], "sClass":  "rowTablaCsp"},
                                        { "aTargets": [9], "bSortable": false }
                    		        ]
                                });
                                if (!$scope.isPermisoAgendamiento) {
                                    $(".btnAgendamiento").addClass("estiloBlockIconoPermiso");
                                }
                                swal.close();
                            } else {
                                mostrarMensajeInformativo("No se encontraron pendientes de agendar");
                                $scope.reiniciarTablaPendientesAgendar();
                                swal.close();
                            }
                        } else {
                            mostrarMensajeInformativo("No se encontraron pendientes de agendar");
                            $scope.reiniciarTablaPendientesAgendar();
                            swal.close();
                        }
                    } else {
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                        $scope.reiniciarTablaPendientesAgendar();
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    $scope.reiniciarTablaPendientesAgendar();
                    swal.close();
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }
    
    $scope.reiniciarTablaPendientesAgendar = function() {
    	if (pendientesAgendarTable) {
            pendientesAgendarTable.destroy();
        }

        pendientesAgendarTable = $('#tablePendientesAgendar').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "data": [],
            "language": idioma_espanol_not_font,
            "aoColumnDefs": [
                { "aTargets": [9], "bSortable": false }
            ]
        });
	}

    $scope.reiniciarTablaRescataventas=function(){
        if (rescataventasTable) {
            rescataventasTable.destroy();
        }
        rescataventasTable = $('#tableRescataventas').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "autoWidth": true,
            "language": idioma_espanol_not_font
        });
    }

    $scope.consultarRescataventasBandejas = function () {
        let isValid = true;
        let mensajeError = '';

        let clustersSelected = $("#geografiaRescataventas").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaPendienteAgendar)
            .map(e => e.text)

        if (clustersSelected.length == 0) {
            mensajeError += "<li>Selecciona geograf\u00EDa</li>";
            isValid = false;
        }

        if (isValid) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            let params = {
                "geografias": clustersSelected,
            }
            $scope.reiniciarTablaRescataventas()
            bandejasSalesforceService.consultarRescataventasBandejasSF(params).then(function success(response) {
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado.length) {
                                let arrayResRow = [];
                                if (rescataventasTable) {
                                    rescataventasTable.destroy();
                                }
                                $scope.listRescataventas = angular.copy(response.data.result.resultado);
                                $.each($scope.listRescataventas, function (i, elemento) {
                                    let rowRes = [];
                                    rowRes[0] = elemento.nombreCsp && elemento.nombreCsp !== '' ? elemento.nombreCsp : 'Sin informaci&oacute;n';
                                    rowRes[1] = elemento.cotSitio && elemento.cotSitio.nombreCotSitio && elemento.cotSitio.nombreCotSitio !== '' ? elemento.cotSitio.nombreCotSitio : 'Sin informaci&oacute;n';
                                    rowRes[2] = elemento.cotizacion && elemento.cotizacion.cotizacion && elemento.cotizacion.cotizacion !== '' ? elemento.cotizacion.cotizacion : 'Sin informaci&oacute;n';
                                    rowRes[3] = elemento.cuentaFacturaSf && elemento.cuentaFacturaSf.nombreCuentaFactura && elemento.cuentaFacturaSf.nombreCuentaFactura !== '' ? elemento.cuentaFacturaSf.nombreCuentaFactura : 'Sin informaci&oacute;n';
                                    rowRes[4] = elemento.dpPlan && elemento.dpPlan.nameDpPlan && elemento.dpPlan.nameDpPlan !== '' ? elemento.dpPlan.nameDpPlan : 'Sin informaci&oacute;n'
                                    rowRes[5] = elemento.plaza && elemento.plaza !== '' ? elemento.plaza : 'Sin informaci&oacute;n';
                                    rowRes[6] = elemento.cluster && elemento.cluster !== '' ? elemento.cluster : 'Sin informaci&oacute;n';
                                    rowRes[7] = elemento.ordenServicio && elemento.ordenServicio.nombreOrdenServicio && elemento.ordenServicio.nombreOrdenServicio !== '' ? elemento.ordenServicio.nombreOrdenServicio : 'Sin informaci&oacute;n';
                                    rowRes[8] = elemento.estatusOs && elemento.estatusOs !== '' ? elemento.estatusOs : 'Sin informaci&oacute;n';
                                    rowRes[9] = elemento.fechaCreacion && elemento.fechaCreacion !== '' ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    // rowRes[10] = "";
                                    arrayResRow.push(rowRes);
                                });
                                rescataventasTable = $('#tableRescataventas').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "ordering": true,
                                    "pageLength": 10,
                                    "info": true,
                                    "data": arrayResRow,
                                    "autoWidth": true,
                                    "language": idioma_espanol_not_font,
                                });
                                swal.close();
                            } else {
                                mostrarMensajeInformativo("No se encontraron rescataventas");
                                swal.close();
                            }
                        } else {
                            mostrarMensajeInformativo("No se encontraron rescataventas");
                            swal.close();
                        }
                    } else {
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.consultarPendientesActivarBandejas = function () {
        let isValid = true;
        let mensajeError = '';

        let clustersSelected = $("#geografiaPendientesActivar").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltrogeografiaPendienteActivar)
            .map(e => e.text)

        if (clustersSelected.length == 0) {
            mensajeError += "<li>Selecciona geograf\u00EDa</li>";
            isValid = false;
        }

        if (isValid) {
            if (!swal.isVisible()) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
            }
            let paramsFecha = $scope.getFechaFormato(document.getElementById('fecha_pendiente_activar').value);
            let params = {
                'geografias': clustersSelected,
                'fechaInicio': paramsFecha.fechaInicio,
                'fechaFin': paramsFecha.fechaFin
            };
            bandejasSalesforceService.consultarPendientesActivarBandejasSF(params).then(function success(response) {
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.resultado.length) {
                                let arrayRow = [];
                                if (pendientesActivarTable) {
                                    pendientesActivarTable.destroy();
                                }
                                $scope.listPendientesActivar = angular.copy(response.data.result.resultado);
                                $.each($scope.listPendientesActivar, function (i, elemento) {
                                    let row = [];
                                    row[0] = elemento.nombreCsp && elemento.nombreCsp !== '' ? elemento.nombreCsp : 'Sin informaci&oacute;n';
                                    row[1] = elemento.cotSitio && elemento.cotSitio.nombreCotSitio && elemento.cotSitio.nombreCotSitio !== '' ? elemento.cotSitio.nombreCotSitio : 'Sin informaci&oacute;n';
                                    row[2] = elemento.cotizacion && elemento.cotizacion.cotizacion && elemento.cotizacion.cotizacion !== '' ? elemento.cotizacion.cotizacion : 'Sin informaci&oacute;n';
                                    row[3] = elemento.cuentaFacturaSf && elemento.cuentaFacturaSf.nombreCuentaFactura && elemento.cuentaFacturaSf.nombreCuentaFactura !== '' ? elemento.cuentaFacturaSf.nombreCuentaFactura : 'Sin informaci&oacute;n';
                                    row[4] = elemento.cuentaFacturaNumero && elemento.cuentaFacturaNumero !== '' ? elemento.cuentaFacturaNumero : 'Sin informaci&oacute;n';
                                    row[5] = elemento.dpPlan && elemento.dpPlan.nameDpPlan && elemento.dpPlan.nameDpPlan !== '' ? elemento.dpPlan.nameDpPlan : 'Sin informaci&oacute;n';
                                    row[6] = elemento.plaza && elemento.plaza !== '' ? elemento.plaza : 'Sin informaci&oacute;n';
                                    row[7] = elemento.cluster && elemento.cluster !== '' ? elemento.cluster : 'Sin informaci&oacute;n';
                                    row[8] = elemento.ordenServicio && elemento.ordenServicio.nombreOrdenServicio && elemento.ordenServicio.nombreOrdenServicio !== '' ? elemento.ordenServicio.nombreOrdenServicio : 'Sin informaci&oacute;n';
                                    row[9] = elemento.estatusOs && elemento.estatusOs !== '' ? elemento.estatusOs : 'Sin informaci&oacute;n';
                                    row[10] = elemento.fechaCreacion && elemento.fechaCreacion !== '' ? elemento.fechaCreacion : 'Sin informaci&oacute;n';
                                    // row[11] = "";
                                    arrayRow.push(row);
                                });
                                pendientesActivarTable = $('#tablePendienteActivar').DataTable({
                                    "paging": true,
                                    "lengthChange": false,
                                    "ordering": true,
                                    "pageLength": 10,
                                    "info": true,
                                    "data": arrayRow,
                                    "autoWidth": true,
                                    "language": idioma_espanol_not_font,
                                });
                                swal.close();
                            } else {
                                mostrarMensajeInformativo("No se encontraron pendientes a activar");
                                swal.close();
                            }
                        } else {
                            mostrarMensajeInformativo("No se encontraron pendientes a activar");
                            swal.close();
                        }
                    } else {
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.validacionGenerica = function() {
    }
    
    $scope.detallePaqueteCSP = {};
    $scope.consultarResumenPaqueteBandejasSFCSP = function (csp) {
        $scope.detallePaqueteCSP={}
        $scope.isConsultaEquiposModelos=false;
        $scope.selectedEquipoPaquete={}

        $scope.listDetalleEquipos = [];
        $scope.detallePaqueteCSP = {};
        if (!swal.isVisible()) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }
        let params = {
            "folioCps": csp.name
        };
        bandejasSalesforceService.consultarResumenPaqueteBandejasSFCsp(params).then(function success(response) {
            if (response.data) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.resumenPaquete) {
                            $scope.detallePaqueteCSP = angular.copy(response.data.result.resumenPaquete);
                            $("#modalDetallePaquete").modal('show');
                            swal.close();
                        }else{
                            mostrarMensajeInformativo('No se encontr\u00F3 informaci\u00F3n del paquete')
                            swal.close()
                        }
                    }else{
                        mostrarMensajeInformativo('No se encontr\u00F3 informaci\u00F3n del paquete')
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion);
                swal.close();
            }
        });
    } 


    $scope.consultarDetalleServicio = function (servicio,idCSP) {
        
        if(!$scope.isConsultaEquiposModelos){
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            $scope.detallePaqueteCSP.productos = [];
            $scope.listDetalleEquipos = [];
            $scope.detallePaqueteCSP.productos = servicio.productos;
            let params = {
                'idCotSitioPlan': idCSP
            }
    
            //$scope.responseServicios
            bandejasSalesforceService.consultarDetalleEquiposBandejasSF(params).then(function success(response) {
                console.log(response)
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            $scope.isConsultaEquiposModelos=true;
                           
                            if (response.data.result.detalleEquipos.length) {
                                let listadoEquipos = angular.copy(response.data.result.detalleEquipos);
                                if($scope.detallePaqueteCSP!= undefined && 
                                    $scope.detallePaqueteCSP.resumenServicios!=undefined && $scope.detallePaqueteCSP.resumenServicios.length >0){                                
                                    $scope.detallePaqueteCSP.resumenServicios=$scope.detallePaqueteCSP.resumenServicios.map(function(e){
                                        e.elementoEquipoModelos={}
                                        e.isTieneEquipoModeos=false;
                                        return e;
                                    })
                                    listadoEquipos.forEach(function(elem,index){
                                        let servicioTemp= $scope.detallePaqueteCSP.resumenServicios.find(function(e){ return e.id==elem.idCotPlanServicio })
                                        if(servicioTemp!=undefined){
                                            servicioTemp.elementoEquipoModelos=elem
                                            servicioTemp.isTieneEquipoModeos=true;
                                        }
                                    });                                
                                }
                                swal.close();
                            } else {
                                mostrarMensajeInformativo("No se encontraron Equipos");
                                swal.close();
                            }
                        } else {
                            mostrarMensajeErrorAlert(response.data.resultDescripcion);
                            swal.close();
                        }
                    } else {
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    swal.close();
                }
            });
        }
        $scope.selectedEquipoPaquete=servicio     
    }

    $scope.listFieldsValidacion = [];
    $scope.listFieldsCopy = [];
    $scope.consultarValidacionCSP = function (index) {
        $scope.listFieldsValidacion = [];
        $scope.listFieldsCopy = [];
        
        if (!swal.isVisible()) { 
            swal({ text: 'Espera un momento...', allowOutsideClick: false }); 
            swal.showLoading(); 
        } 
        let params = { 
            'idCotSitioPlan': $scope.listPendientesAgendar[index].idCSP
        }
        
        bandejasSalesforceService.consultarValidacionCSPBandejasSF(params).then(function success(response) {
            if (response.data) { 
                if (response.data.respuesta) { 
                    if (response.data.result) { 
                        if (response.data.result.fieldsSalesforce.length) { 
                            $scope.listFieldsCopy = angular.copy(response.data.result.fieldsSalesforce);
                            $scope.listFieldsValidacion = $scope.listFieldsCopy.filter(e => { return e.status === 0 });
                            if($scope.listFieldsValidacion.length > 0){
                            	$("#modalValidacionCSP").modal('show'); 
                            }else{
                            	$scope.validarDatos();
                            }
                            swal.close(); 
                        } else { 
                            mostrarMensajeErrorAlert("No se encontr&oacute; informaci&oacute;n"); 
                            swal.close(); 
                        } 
                    } else { 
                        mostrarMensajeErrorAlert("No se encontr&oacute; informaci&oacute;n"); 
                        swal.close(); 
                    } 
                } else { 
                    mostrarMensajeErrorAlert(response.data.resultDescripcion); 
                    swal.close(); 
                } 
            } else { 
                mostrarMensajeErrorAlert(response.data.resultDescripcion); 
                swal.close(); 
            } 
        });
    }
    
    $scope.ocultarDatosFactibilidad = function() {
		if($scope.isDatosFactibilidad){
			$scope.isDatosFactibilidad = false;
		}else{
			$scope.isDatosFactibilidad = true;
		}
	}

    angular.element(document).ready(function () {
        $('#moduloBandejasSalesforce').addClass('active');
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
        $scope.initBandejasSF();
        $scope.consultarFiltrosBandejasSF();
    });
}]);