var app = angular.module('busquedaApp', []);

app.controller('busquedaController', ['$scope', 'busquedaService', 'genericService', function ($scope, busquedaService, genericService) {
    $scope.showSearch = true;
    $scope.mostrarCurrentInfo = 1;
    $scope.searchSF = '';

    // limites
    $scope.limitCotSitio = 10;
    $scope.limitCuentas = 10;
    $scope.limitCuentaFactura = 10;
    $scope.limitCotizacion = 10;
    $scope.limitOs = 10;
    $scope.limitCotSitioPlan = 10;
    $scope.limitOportunidad = 10;
    $scope.limitTickets = 10;

    $scope.limitCotSitioPlanCs = 10;
    $scope.limitCotSitioCot = 10;
    $scope.limitCotSitioPlanCot = 10;
    $scope.limitOsCf = 10;
    $scope.limitTicketCf = 10;
    $scope.limitCuentaFacturaCu = 10;
    $scope.limitOportunidadCu = 10;

    $scope.limitServiciosCsp = 10;
    $scope.limitProductosCsp = 10;
    $scope.limitPromocionesCsp = 10;
    $scope.limitInternetCf = 10;
    $scope.limitTelefoniaCf = 10;
    $scope.limitTvCf = 10;
    $scope.limitIps = 10;

    app.activacionController($scope, busquedaService)

    $scope.consultaPermisos = function () {
        let params = {
            moduloAccionesUsuario: 'moduloBusqueda'
        }
        genericService.consultarConfiguracionDespachoDespacho(params).then((result) => {
            console.log(result)
        }).catch((err) => handleError(err));
    }
    $scope.consultaPermisos();

    $scope.setCurrentTabInfo = function (tipo) {
        $scope.mostrarCurrentInfo = tipo;
    }

    $scope.buscarGeneral = function () {
        if ($scope.searchSF.trim() !== '') {
            $scope.cerrarDetalles();
            let params = {
                busqueda: $scope.searchSF
            }
            swal({ text: 'Buscando...', allowOutsideClick: false });
            swal.showLoading();
            busquedaService.busquedaGeneralSF(params).then((result) => {
                console.log(result)
                swal.close();
                if (result.data.respuesta) {
                    if (result.data.result) {
                        $scope.historial = [];
                        $scope.resultBusqueda = result.data.result;
                        $scope.showSearch = true;
                    } else {
                        mostrarMensajeWarningValidacion("No se encontro resultado")
                    }
                } else {
                    mostrarMensajeErrorAlert(result.data.resultDescripcion)
                }
            }).catch((err) => handleError(err));
        }
    }

    $scope.consultarDetalleObjectosSF = function (id, keyObjeto) {
        console.log("id: " + id + " tipo del objeto: " + keyObjeto)
        swal({ text: 'Buscando datos ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            idObjectSF: id,
            typeObjectSF: keyObjeto
        }
        busquedaService.consultaDetalleObjectSF(params).then((result) => {
            console.log(result)
            swal.close()
            $scope.mostrarTintoreria = false;
            $scope.mostrarNotaCF = false;
            if (result.data.respuesta) {
                switch (keyObjeto) {
                    case "CS":
                        $scope.mostrarDetalleCotSitio(result.data.result.detalleCotSitio, keyObjeto);
                        break;
                    case "CP":
                        $scope.mostrarDetalleCotSitioPlan(result.data.result.detalleCotSitioPlan, keyObjeto);
                        break;
                    case "CO":
                        $scope.mostrarDetalleCotizacion(result.data.result.detalleCotizacion, keyObjeto);
                        break;
                    case "CF":
                        $scope.mostrarDetalleCuentaFactura(result.data.result.detalleCuentaFactura, keyObjeto);
                        break;
                    case "CU":
                        $scope.mostrarDetalleCuenta(result.data.result.detalleCuenta, keyObjeto);
                        break;
                    case "OP":
                        $scope.mostrarDetalleOportunidad(result.data.result.detalleOportunidad, keyObjeto);
                        break;
                    case "OS":
                        $scope.mostrarDetalleOs(result.data.result.detalleOs, keyObjeto);
                        break;
                    case "TK":
                        $scope.mostrarDetalleTicket(result.data.result.detalleTk, keyObjeto);
                        break;
                    default:
                        break;
                }
            } else {
                mostrarMensajeErrorAlert(result.data.resultDescripcion)
            }
        }).catch((err) => handleError(err));
    }

    $scope.mostrarDetalleCuenta = function (detalle, keyObject) {
        if (detalle) {
            $scope.cerrarDetalles();
            $scope.showCuenta = true;
            $scope.showSearch = false;
            $scope.detalle = detalle;
            $scope.showCuenta = true;
            $scope.elemento = {};
            $scope.elemento.detalle = $scope.detalle;
            $scope.elemento.keyObject = keyObject;
            $scope.historial.push($scope.elemento);
        } else {
            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
        }
    }

    $scope.mostrarDetalleCotSitio = function (detalle, keyObject) {
        if (detalle) {
            $scope.cerrarDetalles();
            $scope.showSearch = false;
            $scope.detalle = detalle;
            $scope.showCotSitio = true;
            $scope.elemento = {};
            $scope.elemento.detalle = $scope.detalle;
            $scope.elemento.keyObject = keyObject;
            $scope.historial.push($scope.elemento);
        } else {
            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
        }
    }

    $scope.mostrarDetalleCotSitioPlan = function (detalle, keyObject) {
        if (detalle) {
            $scope.cerrarDetalles();
            $scope.showSearch = false;
            $scope.detalle = detalle;
            $scope.showCotSitioPlan = true;
            $scope.elemento = {};
            $scope.elemento.detalle = $scope.detalle;
            $scope.elemento.keyObject = keyObject;
            $scope.historial.push($scope.elemento);
        } else {
            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
        }
    }

    $scope.mostrarDetalleCotizacion = function (detalle, keyObject) {
        if (detalle) {
            $scope.cerrarDetalles();
            $scope.showSearch = false;
            $scope.detalle = detalle;
            $scope.showCotizacion = true;
            $scope.elemento = {};
            $scope.elemento.detalle = $scope.detalle;
            $scope.elemento.keyObject = keyObject;
            $scope.historial.push($scope.elemento);
        } else {
            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
        }
    }

    $scope.mostrarDetalleCuentaFactura = function (detalle, keyObject) {
        if (detalle) {
            $scope.cerrarDetalles();
            $scope.showSearch = false;
            $scope.detalle = detalle;
            $scope.showCuentaFactura = true;
            $scope.elemento = {};
            $scope.elemento.detalle = $scope.detalle;
            $scope.elemento.keyObject = keyObject;
            $scope.historial.push($scope.elemento);
        } else {
            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
        }
    }

    $scope.mostrarDetalleOportunidad = function (detalle, keyObject) {
        if (detalle) {
            $scope.cerrarDetalles();
            $scope.showSearch = false;
            $scope.detalle = detalle;
            $scope.showOportunidad = true;
            $scope.elemento = {};
            $scope.elemento.detalle = $scope.detalle;
            $scope.elemento.keyObject = keyObject;
            $scope.historial.push($scope.elemento);
        } else {
            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
        }
    }

    $scope.mostrarDetalleOs = function (detalle, keyObject) {
        if (detalle) {
            $scope.cerrarDetalles();
            $scope.showSearch = false;
            $scope.detalle = detalle;
            $scope.showOs = true;
            $scope.elemento = {};
            $scope.elemento.detalle = $scope.detalle;
            $scope.elemento.keyObject = keyObject;
            $scope.historial.push($scope.elemento);
        } else {
            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
        }
    }

    $scope.mostrarDetalleTicket = function (detalle, keyObject) {
        if (detalle) {
            $scope.cerrarDetalles();
            $scope.showSearch = false;
            $scope.detalle = detalle;
            $scope.showTicket = true;
            $scope.elemento = {};
            $scope.elemento.detalle = $scope.detalle;
            $scope.elemento.keyObject = keyObject;
            $scope.historial.push($scope.elemento);
        } else {
            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
        }
    }

    $scope.cerrarDetalles = function () {
        $scope.showCotSitio = false;
        $scope.showCotSitioPlan = false;
        $scope.showCotizacion = false;
        $scope.showCuentaFactura = false;
        $scope.showCuenta = false;
        $scope.showOportunidad = false;
        $scope.showOs = false;
        $scope.showTicket = false;
        $scope.showDetalleActivar = false;
        $scope.showSearch = true;
    }

    $scope.regresarHome = function () {
        $scope.showCotSitio = false;
        $scope.showCotSitioPlan = false;
        $scope.showCotizacion = false;
        $scope.showCuentaFactura = false;
        $scope.showCuenta = false;
        $scope.showOportunidad = false;
        $scope.showOs = false;
        $scope.showTicket = false;
        $scope.showDetalleActivar = false;
        $scope.showSearch = true
        $scope.historial = [];
    }

    $scope.regresarConsulta = function () {
        $scope.consultarValidacionCuentaAsync = true
        $scope.isConsultaPrimeraVezNoticias = false;
        $scope.cerrarDetalles();
        $scope.historial.splice(-1, 1);
        if ($scope.historial.length !== 0) {
            $scope.detalle = $scope.historial.slice(-1).pop().detalle;
            $scope.redirecionarVistaDetalle($scope.historial.slice(-1).pop().keyObject);
        }
    }

    $scope.redirecionarVistaDetalle = function (keyObject) {
        $scope.showSearch = false;
        switch (keyObject) {
            case "CS":
                $scope.showCotSitio = true;
                break;
            case "CP":
                $scope.showCotSitioPlan = true;
                break;
            case "CO":
                $scope.showCotizacion = true;
                break;
            case "CF":
                $scope.showCuentaFactura = true;
                break;
            case "CU":
                $scope.showCuenta = true;
                break;
            case "OP":
                $scope.showOportunidad = true;
                break;
            case "OS":
                $scope.showOs = true;
                break;
            case "TK":
                $scope.showTicket = true;
                break;
            default:

                break;
        }
    }

    $scope.abrirVentanaNoticias = function () {
        if (!$scope.isAbiertoOSNoticias && !$scope.isConsultaPrimeraVezNoticias) {
            $scope.objectoConsulta()
        }
        $scope.isAbiertoOSNoticias = !$scope.isAbiertoOSNoticias

        $scope.isConsultaPrimeraVezNoticias = true
    }

    $scope.objectoConsulta = function () {
        $scope.listadoNoticias = [];
        if (!swal.isVisible()) {
            swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
            swal.showLoading();
        }
        let params;
        $scope.elemento;
        if ($scope.elemento.keyObject === 'OS') {
            params = {
                objectId: $scope.elemento.detalle.id,
                objectType: 'OrdenServicio'
            }
        } else if ($scope.elemento.keyObject === 'OP') {
            params = {
                objectId: $scope.elemento.detalle.id,
                objectType: 'Oportunidad'
            }
        } else {
            params = {
                objectId: $scope.elemento.detalle.id,
                objectType: 'Ticket'
            }
        }
        $scope.banderaShow = false;
        $scope.noticiaAnterior = undefined;

        busquedaService.consultarNoticias(params).then((result) => {
            console.log(result);
            if (result.data !== undefined) {
                if (result.data.respuesta) {
                    if (result.data.result.result === '0') {
                        //$scope.getAutorNoticia();
                        if (result.data.result.news) {
                            $scope.listadoNoticias = result.data.result.news
                        } else {
                            mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
                        }

                        setTimeout(function () {
                            $(".container-noticia-elemento").animate({ scrollTop: 100000000 }, 500);
                        }, 400)
                        console.log(result.data.result)
                        swal.close();
                    } else {
                        mostrarMensajeWarningValidacion("No se encontr\u00F3 informaci\u00F3n")
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlert("Error al consultar la informaci\u00F3n")
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlertmostrarMensajeErrorAlert("Error en el servidor")
                swal.close()
            }
        })
    }


    $scope.enviarMesajeGeneral = function () {
        // let params = new FormData();
        let params;
        if ($scope.elemento.keyObject === 'OS') {
            if (document.getElementById('text-general-os').value === '') {
                mostrarMensajeWarning('Escribir un comentario')
                return false;
            }
            /* params.append("params.objectId", $scope.elemento.detalle.id);
            params.append("params.text", document.getElementById('text-general-os').value);
            params.append("params.autorId", $scope.autorIdSalect); */
            params = {
                objectId: $scope.elemento.detalle.id,
                text: document.getElementById('text-general-os').value
            }
            if (document.querySelector('#fileOs').files[0] !== undefined) {
                //params.append("params.documentName", document.querySelector('#fileOs').files[0].name.split('.')[0]);
                //params.append("params.documentExtension", document.querySelector('#fileOs').files[0].name.split('.')[1]);


                var myFile = document.querySelector('#fileOs').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {
                    //params.append("params.document", reader.result.split(",")[1]);
                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: document.getElementById('text-general-os').value,
                        documentName: document.querySelector('#fileOs').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileOs').files[0].name.split('.')[1],
                        document: reader.result.split(",")[1]
                    }
                    $scope.guardarMensaje(params);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            } else {
                $scope.guardarMensaje(params);
            }

        } else if ($scope.elemento.keyObject === 'OP') {
            if (document.getElementById('text-general-oportunidad').value === '') {
                mostrarMensajeWarning('Escribir un comentario')
                return false;
            }
            //params.append("params.objectId", $scope.idObject);
            //params.append("params.text", document.getElementById('text-general-oportunidad').value);
            //params.append("params.autorId", $scope.autorIdSalect);
            params = {
                objectId: $scope.elemento.detalle.id,
                text: document.getElementById('text-general-oportunidad').value
            }
            if (document.querySelector('#fileOportunidad').files[0]) {
                //params.append("params.documentName", document.querySelector('#fileOportunidad').files[0].name.split('.')[0]);
                //params.append("params.documentExtension", document.querySelector('#fileOportunidad').files[0].name.split('.')[1]);


                var myFile = document.querySelector('#fileOportunidad').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {
                    //params.append("params.document", reader.result.split(",")[1]);
                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: document.getElementById('text-general-oportunidad').value,
                        documentName: document.querySelector('#fileOportunidad').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileOportunidad').files[0].name.split('.')[1],
                        document: reader.result.split(",")[1]
                    }
                    $scope.guardarMensaje(params);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            } else {
                $scope.guardarMensaje(params);
            }

        } else {
            if (document.getElementById('text-general-ticket').value === '') {
                mostrarMensajeWarning('Escribir un comentario')
                return false;
            }

            //params.append("params.objectId", $scope.idObject);
            //params.append("params.text", document.getElementById('text-general-ticket').value);
            //params.append("params.autorId", $scope.autorIdSalect);
            params = {
                objectId: $scope.elemento.detalle.id,
                text: document.getElementById('text-general-ticket').value
            }
            if (document.querySelector('#fileTicket').files[0] !== undefined) {
                //params.append("params.documentName", document.querySelector('#fileTicket').files[0].name.split('.')[0]);
                //params.append("params.documentExtension", document.querySelector('#fileTicket').files[0].name.split('.')[1]);


                var myFile = document.querySelector('#fileTicket').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {
                    //params.append("params.document", reader.result.split(",")[1]);
                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: document.getElementById('text-general-ticket').value,
                        documentName: document.querySelector('#fileTicket').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileTicket').files[0].name.split('.')[1],
                        document: reader.result.split(",")[1]
                    }
                    $scope.guardarMensaje(params);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            } else {
                $scope.guardarMensaje(params);
            }

        }
    }

    $scope.guardarMensaje = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        busquedaService.crearNoticia(params).then((response) => {
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === '0') {
                        $scope.resetFile();
                        if ($scope.elemento.keyObject === 'OS') {
                            document.getElementById('text-general-os').value = ''
                        } else if ($scope.elemento.keyObject === 'OP') {
                            document.getElementById('text-general-oportunidad').value = ''
                        } else {
                            document.getElementById('text-general-ticket').value = ''
                        }
                        $scope.objectoConsulta();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlert("Error al consultar")
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlert("Error en el servidor")
                swal.close()
            }

        });
    }


    $("#fileOs").change(function () {
        if ($('#fileOs').get(0).files[0] === undefined) {
            $(".text_select_archivo").text("Adjuntar archivo");
            $scope.showEliminarOs = false;
        } else {
            $(".text_select_archivo").text($('#fileOs').get(0).files[0].name);
            $scope.showEliminarOs = true;
        }
        $scope.$apply();
    });

    $("#fileOportunidad").change(function () {
        if ($('#fileOportunidad').get(0).files[0] === undefined) {
            $(".text_select_archivo").text("Adjuntar archivo");
            $scope.showEliminarOp = false;
        } else {
            $(".text_select_archivo").text($('#fileOportunidad').get(0).files[0].name);
            $scope.showEliminarOp = true;
        }
        $scope.$apply();
    });

    $("#fileTicket").change(function () {
        if ($('#fileTicket').get(0).files[0] === undefined) {
            $(".text_select_archivo").text("Adjuntar archivo");
            $scope.showEliminarTicket = false;
        } else {
            $(".text_select_archivo").text($('#fileTicket').get(0).files[0].name);
            $scope.showEliminarTicket = true;
        }
        $scope.$apply();
    });

    $scope.resetFile = function (noticia) {
        //OS
        $(".text_select_archivo").text("Adjuntar archivo");
        $("#fileOs").val("");
        $scope.showEliminarOs = false;

        $(".text_select_archivo_sub").text("Adjuntar archivo");
        $("#fileSubComentarioOs-" + noticia).val("");
        $scope.showEliminarSubOs = false;

        //OPORTUNIDAD
        $(".text_select_archivo").text("Adjuntar archivo");
        $("#fileOportunidad").val("");
        $scope.showEliminarOp = false;

        $(".text_select_archivo_sub").text("Adjuntar archivo");
        $("#fileSubComentarioOp-" + noticia).val("");
        $scope.showEliminarSubOp = false;

        //TICKET
        $(".text_select_archivo").text("Adjuntar archivo");
        $("#fileTicket").val("");
        $scope.showEliminarTicket = false;

        $(".text_select_archivo_sub").text("Adjuntar archivo");
        $("#fileSubComentarioTick-" + noticia).val("");
        $scope.showEliminarSubTick = false;
    }

    $scope.mostrarDetalleActivarOs = function (os) {
        $scope.Network_code = ''
        $scope.tipoactivacion = 'os'
        $scope.validarActivacionos = os.id

        console.log(os);
        os.Folio_OS = os.nombre;
        os.id_cotsitioplansf = os.idCsp
        $scope.objectglobalactivacion = os

        $scope.codigopostalplan = ''
        $scope.codigopostalplanactivacion = os.CP
        $scope.idotActivacion = os.idOt

        $("#id_cot_sitio_plan_detalle_activar").text(os.nombre)
        $scope.tituloActivacion = 'OS:';
        $scope.iconActivacion = 1;

        $scope.consultarEquiposConfigurados(os);
        $scope.unidadNegocioActivacion = os.UnidadNegocio

        $scope.consultarValidacionCuentaAsync = false


        $scope.statusActivacion = os.cuentaActiva
        $scope.planActivo = os.cuentaActiva
        $scope.isProcesandoActivacion = 'noshow'
    }

    $scope.mostrarModalDetalleUsuario = function (usuario) {
        $scope.detalleContacto = usuario;
        if ($scope.detalleContacto.urlFoto !== 'NA') {
            $("#img-usuario").attr("src", $scope.detalleContacto.urlFoto);
        } else {
            $("#img-usuario").attr("src", './resources/img/generic/defaultPerfil.png');
        }
        $scope.historialUsuario = [];
        $scope.historialUsuario.push($scope.detalleContacto);
        $("#modalDetalleContacto").modal('show');
    }

    $scope.historialUsuario = [];
    $scope.consultarInformacionVendedor = function (idUsuario, open) {
        swal({ text: 'Buscando datos ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            idObjectSF: idUsuario,
            typeObjectSF: 'US'
        }
        busquedaService.consultaDetalleObjectSF(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.detalleContacto !== undefined) {
                            $scope.detalleContacto = response.data.result.detalleContacto;
                            if ($scope.detalleContacto.urlFoto !== 'NA') {
                                $("#img-usuario").attr("src", $scope.detalleContacto.urlFoto);
                            } else {
                                $("#img-usuario").attr("src", './img/generic/defaultPerfil.png');
                            }
                            $scope.historialUsuario.push($scope.detalleContacto);
                        }
                        swal.close();
                    } else {
                        mostrarMensajeWarningValidacion("No se encontro informaci\u00f3n");
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarningValidacion("No se encontro informaci\u00f3n");
                    swal.close();
                }
            } else {
                swal.close();
            }
        });
    }

    $scope.mostrarNotaCF = false;
    $scope.consultarResumenAndServicios = function (numCuentaFactura) {
        if (!$scope.mostrarNotaCF) {
            swal({ text: 'Buscando datos ...', allowOutsideClick: false });
            swal.showLoading();
            var params = new FormData();
            params.append("params.numeroCuentaFactura", numCuentaFactura); //CAMBIAWR+++++
            busquedaService.consultarResumenAndServicios(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    $scope.mostrarNotaCF = true;
                    if (response.data.resumen.success) {
                        if (response.data.resumen.result.result === '0') {
                            $scope.resumenService = response.data.resumen.result;

                            swal.close();

                        } else {
                            mostrarMensajeWarningValidacion("No se encontro informaci\u00f3n del resumen")
                            swal.close();
                        }
                    } else {
                        mostrarMensajeWarningValidacion("No se encontro informaci\u00f3n del resumen");
                        swal.close();
                    }


                    if (response.data.servicios.success) {
                        if (response.data.servicios.result.result === '0') {
                            $scope.serviciosFacturado = response.data.servicios.result;
                        } else {
                            mostrarMensajeWarningValidacion("No se encontro informaci\u00f3n de servcios");
                            swal.close();
                        }
                    } else {
                        mostrarMensajeWarningValidacion("No se encontro informaci\u00f3n de servcios");
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarningValidacion("No se encontr\u00F3 informaci\u00F3n");
                    swal.close();
                }

                swal.close();
            });
        } else {
            $scope.mostrarNotaCF = false;
        }
    }

    $scope.mostrarIps = false;
    $scope.arregloIps = [];
    $scope.consultarIps = function(numCuentaFactura) {
        $scope.arregloIps = [];
        if (!$scope.mostrarIps) {
            swal({ text: 'Buscando datos ...', allowOutsideClick: false });
            swal.showLoading();
            let params = {
                numeroCuenta: numCuentaFactura
            }
            busquedaService.consultarIps(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.success) {
                        if (response.data.result.result === '0') {
                            $scope.arregloIps = response.data.result.arregloIps;
                            console.log($scope.arregloIps);
                            angular.forEach($scope.arregloIps, function(elemento, index) {
                                elemento.ip = elemento.ip ? apertura(elemento.ip) : '';
                                elemento.gateway = elemento.gateway ? apertura(elemento.gateway) : '';
                                elemento.mascara = elemento.mascara ? apertura(elemento.mascara) : '';
                                elemento.dns1 = elemento.dns1 ? apertura(elemento.dns1) : '';
                                elemento.dns2 = elemento.dns2 ? apertura(elemento.dns2) : '';
                                elemento.subServicio = elemento.subServicio ? apertura(elemento.subServicio) : '';
                            });
                            $scope.mostrarIps = true;
                        } else {
                            alertify.set('notifier', 'position', 'top-right', { delay: 4000 });
                            alertify.warning(response.data.result.resultDescripcion);
                        }
                    } else {
                        alertify.set('notifier', 'position', 'top-right', { delay: 4000 });
                        alertify.warning("No se encontr\u00F3 informaci\u00F3n");
                    }
                } else {
                    alertify.set('notifier', 'position', 'top-right', { delay: 4000 });
                    alertify.warning("No se encontr\u00F3 informaci\u00F3n");
                    swal.close();
                }
                swal.close();
            }, function error(response) {
                swal.close();
            });
        } else {
            $scope.mostrarIps = false;
        }
    }

    $scope.imagenValidar;
    $scope.imagenValidarLista = [];
    $scope.idOt = "";
    $scope.consultaEvidencias = function (ot, estatus) {
        $scope.consultarEvidenciaValidada(ot);
    }

    $scope.consultarEvidenciaValidada = function (ot) {
        for (let index = 0; index < $scope.imagenValidarLista.length; index++) {
            document.getElementById('radioAceptar' + index).checked = false;
            document.getElementById('radioRechazar' + index).checked = false;
        }
        document.getElementById('contentRadio').style.display = 'block';
        document.getElementById('descargarEvidencia').style.display = 'block';
        document.getElementById('guardarValidacionCheck').style.display = 'block';
        document.getElementById('cerrarModalValidacion').style.display = 'none';
        document.getElementById('radioAceptar').checked = false;
        document.getElementById('radioRechazar').checked = false;
        document.getElementById('evidenciaTotal').innerHTML = 0;
        document.getElementById('evidenciaAcaptadas').innerHTML = 0;
        document.getElementById('evidenciaRechazada').innerHTML = 0;
        document.getElementById('contentEvidencia').innerHTML = '';
        $("#descargarEvidencia").attr('href', 'descargarEvidenciaCheck?ot=' + ot)
        //$('#modal-evidencia-busqueda').modal('show');
        $scope.pintarEvidenciaModal(arrayEvidencia.result);
        document.getElementById('evidenciaTotal').innerHTML = arrayEvidencia.result.length;
        //$scope.pintarDocumentoValidado(response.data.result);
        //document.getElementById('evidenciaTotal').innerHTML = response.data.result.length;
       /*  var params = new FormData();
        params.append("paramsRequestEvidencia.idOrden", ot); //
        busquedaService.consultarDocumentosValidado(params).then(function success(response){
            if (response.data.success) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === '1') {
                        mostrarMensajeErrorAlertAjax(response.data.result.resultDescription)
                        swal.close()
                    } else {
                        $("#descargarEvidencia").attr('href', 'descargarEvidenciaCheck?ot=' + ot)
                        $scope.pintarDocumentoValidado(response.data.result);
                        document.getElementById('evidenciaTotal').innerHTML = response.data.result.length;
                    }
                } else {
                    mostrarMensajeErrorAlertAjax("Error al consultar imagenes")
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlertAjax("Error en el servidor")
                swal.close()
            }

        },function error(response){
                console.log(response);
        }); */
    }

    $scope.pintarEvidenciaModal = function (data) {
        let Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
        contenedorEvidencia = '';
        $.each(data, function (index, evidencia) {
            if (index === data.length - 1) {
                contenedorEvidencia += '<div class="imagen_content content_img_21  col-md-3" style="display: block;height: 180px;">';
            } else {
                contenedorEvidencia += '<div class="imagen_content content_img_21  col-md-3" style="display: block;height: 240px;">';
            }

            contenedorEvidencia += '<div class="contenedor_img_evidencia">';
            if (index === 0) {
                var decodedString = Base64.decode(evidencia.urlImagen);
                var lowerCase = decodedString.toLowerCase();
                contenedorEvidencia += '<div id="pdfGrande">';
                if (lowerCase.indexOf('pdf') !== -1) {
                    contenedorEvidencia += '<embed class="z-depth-1 img_evidencia" src="data:application/pdf;base64,' + evidencia.urlImagen + '" type="application/pdf" width="180" height="125" style="margin-left: 20px;"/>';
                } else {
                    contenedorEvidencia += '<img class="z-depth-1 img_evidencia"  src="data:image/jpg;base64,' + evidencia.urlImagen + '" width="180" height="130" style="margin-left: 18px;"/>';
                }


                contenedorEvidencia += '</div>';
            } else {
                contenedorEvidencia += '<a id="showModal" class="magnific item imgtipo_' + index + '" data-title="' + evidencia.name + '" onclick="abrirModalImagen(\'' + evidencia.urlImagen + '\',\'' + evidencia.name + '\',' + index + ')" style="cursor: pointer;">';
                contenedorEvidencia += '<img class="z-depth-1 img_evidencia"  src="data:image/jpg;base64,' + evidencia.urlImagen + '" width="180" height="130" style="margin-left: 18px;"/>';
                contenedorEvidencia += '</a>';
            }

            contenedorEvidencia += '<div class="middle_img_evidencia">';
            if (evidencia.archivoNombre !== undefined) {
                contenedorEvidencia += '<div class="text_img_evidencia">' + evidencia.name + '</div>';
            } else {
                contenedorEvidencia += '<div class="text_img_evidencia">No se encontr&oacute;</div>';
            }

            contenedorEvidencia += '</div>'
            contenedorEvidencia += '</div>';
            contenedorEvidencia += '<div class="funkyradio">';
            contenedorEvidencia += '<div class="col-3 funkyradio-success" style="width: 114px;top: -15px;padding-left: 0px;max-width: none;">';
            contenedorEvidencia += '<input type="radio" name="radio' + index + '" id="radioAceptar' + index + '" onclick="validarEvidnecia(' + index + '\,' + 1 + ')"/>'
            contenedorEvidencia += '<label for="radioAceptar' + index + '" style="width:90px;margin-left:10px;">Aceptar</label>'
            contenedorEvidencia += '</div>';
            contenedorEvidencia += '<div class="col-3 funkyradio-danger" style="width: 114px; top: -61px; margin-left: 100px;max-width: none;">';
            contenedorEvidencia += '<input type="radio" name="radio' + index + '" id="radioRechazar' + index + '" onclick="validarEvidnecia(' + index + '\,' + 0 + ')"/>';
            contenedorEvidencia += '<label for="radioRechazar' + index + '">Rechazar</label>';
            contenedorEvidencia += '</div>';
            contenedorEvidencia += '</div>';
            contenedorEvidencia += '</div>';

            $scope.imagenValidar = {
                index: index,
                path: evidencia.path,
                imgNombre: evidencia.archivoNombre,
                validacion: ''
            };
            $scope.imagenValidarLista.push($scope.imagenValidar);
        });
        console.log($scope.imagenValidarLista);
        $('#contentEvidencia').append(contenedorEvidencia);
        $('#modal-evidencia-busqueda').modal('show');
        
    }

    validarEvidnecia = function(index, validacion){
        if (index !== '') {
            $scope.imagenValidarLista.forEach(evidencia => {
                if (evidencia.index === index) {
                    evidencia.validacion = String(validacion);
                    document.getElementById('radioAceptar').checked = false;
                    document.getElementById('radioRechazar').checked = false;
                }
            });
        } else {
            $scope.imagenValidarLista.forEach(evidencia => {
                evidencia.validacion = String(validacion);
                if (validacion === 1) {
                    document.getElementById('radioAceptar' + evidencia.index).checked = true;
                    document.getElementById('radioRechazar' + evidencia.index).checked = false;
                } else {
                    document.getElementById('radioAceptar' + evidencia.index).checked = false;
                    document.getElementById('radioRechazar' + evidencia.index).checked = true;
                }
            });
        }
        let evidenciaAceptada = $scope.imagenValidarLista.filter(evidencia => { return evidencia.validacion === '1' }).length;
        let evidenciaRechazada = $scope.imagenValidarLista.filter(evidencia => { return evidencia.validacion === '0' }).length;
        document.getElementById('evidenciaAcaptadas').innerHTML = evidenciaAceptada;
        document.getElementById('evidenciaRechazada').innerHTML = evidenciaRechazada;
    }


    $scope.mostrarMasMenosCotSitio = function() {
        if ($scope.limitCotSitio === 10) {
            $scope.limitCotSitio = $scope.resultBusqueda.cotSitios.length;
        } else {
            $scope.limitCotSitio = 10;
        }
    }

    $scope.mostrarMasMenosCuentas = function() {
        if ($scope.limitCuentas === 10) {
            $scope.limitCuentas = $scope.resultBusqueda.cuentas.length;
        } else {
            $scope.limitCuentas = 10;
        }
    }

    $scope.mostrarMasMenosCuentaFactura = function() {
        if ($scope.limitCuentaFactura === 10) {
            $scope.limitCuentaFactura = $scope.resultBusqueda.cuentasFactura.length;
        } else {
            $scope.limitCuentaFactura = 10;
        }
    }

    $scope.mostrarMasMenosCotizacion = function() {
        if ($scope.limitCotizacion === 10) {
            $scope.limitCotizacion = $scope.resultBusqueda.cotizaciones.length;
        } else {
            $scope.limitCotizacion = 10;
        }
    }

    $scope.mostrarMasMenosOs = function() {
        if ($scope.limitOs === 10) {
            $scope.limitOs = $scope.resultBusqueda.ordenesServicio.length;
        } else {
            $scope.limitOs = 10;
        }
    }

    $scope.mostrarMasMenosCotSitioPlan = function() {
        if ($scope.limitCotSitioPlan === 10) {
            $scope.limitCotSitioPlan = $scope.resultBusqueda.cotSitiosPlan.length;
        } else {
            $scope.limitCotSitioPlan = 10;
        }
    }

    $scope.mostrarMasMenosOportunidad = function() {
        if ($scope.limitOportunidad === 10) {
            $scope.limitOportunidad = $scope.resultBusqueda.oportunidades.length;
        } else {
            $scope.limitOportunidad = 10;
        }
    }

    $scope.mostrarMasMenosTickets = function() {
        if ($scope.limitTickets === 10) {
            $scope.limitTickets = $scope.resultBusqueda.tickets.length;
        } else {
            $scope.limitTickets = 10;
        }
    }

    //

    $scope.mostrarMasMenosCotSitioPlanCs = function() {
        if ($scope.limitCotSitioPlanCs === 10) {
            $scope.limitCotSitioPlanCs = $scope.detalle.cotSitioPlanes.length;
        } else {
            $scope.limitCotSitioPlanCs = 10;
        }
    }

    $scope.mostrarMasMenosCotSitioCot = function() {
        if ($scope.limitCotSitioCot === 10) {
            $scope.limitCotSitioCot = $scope.detalle.listCotSitio.length;
        } else {
            $scope.limitCotSitioCot = 10;
        }
    }

    $scope.mostrarMasMenosCotSitioPlanCot = function() {
        if ($scope.limitCotSitioPlanCot === 10) {
            $scope.limitCotSitioPlanCot = $scope.detalle.listCotSitioPlan.length;
        } else {
            $scope.limitCotSitioPlanCot = 10;
        }
    }

    $scope.mostrarMasMenosOsCf = function() {
        if ($scope.limitOsCf === 10) {
            $scope.limitOsCf = $scope.detalle.os.length;
        } else {
            $scope.limitOsCf = 10;
        }
    }

    $scope.mostrarMasMenosTicketCf = function() {
        if ($scope.limitTicketCf === 10) {
            $scope.limitTicketCf = $scope.detalle.tickets.length;
        } else {
            $scope.limitTicketCf = 10;
        }
    }

    $scope.mostrarMasMenosCuentaFacturaCu = function() {
        if ($scope.limitCuentaFacturaCu === 10) {
            $scope.limitCuentaFacturaCu = $scope.detalle.cuentasFacturas.length;
        } else {
            $scope.limitCuentaFacturaCu = 10;
        }
    }

    $scope.mostrarMasMenosOportunidadCu = function() {
        if ($scope.limitOportunidadCu === 10) {
            $scope.limitOportunidadCu = $scope.detalle.oportinidades.length;
        } else {
            $scope.limitOportunidadCu = 10;
        }
    }

    $scope.mostrarMasMenosServicioCsp = function() {
        if ($scope.limitServiciosCsp === 10) {
            $scope.limitServiciosCsp = $scope.responseServicios.Servicios.Servicio.length;
        } else {
            $scope.limitServiciosCsp = 10;
        }
    }

    $scope.mostrarMasMenosProductoCsp = function() {
        if ($scope.limitProductosCsp === 10) {
            $scope.limitProductosCsp = $scope.responseServicios.Productos.Producto.length;
        } else {
            $scope.limitProductosCsp = 10;
        }
    }

    $scope.mostrarMasMenosPromocionesCsp = function() {
        if ($scope.limitPromocionesCsp === 10) {
            $scope.limitPromocionesCsp = $scope.responseServicios.Promociones.Promocion.length;
        } else {
            $scope.limitPromocionesCsp = 10;
        }
    }

    $scope.mostrarMasMenosInternetCf = function() {
        if ($scope.limitInternetCf === 10) {
            $scope.limitInternetCf = $scope.serviciosFacturado.InfoInternet.Internet.length;
        } else {
            $scope.limitInternetCf = 10;
        }
    }

    $scope.mostrarMasMenosTelefoniaCf = function() {
        if ($scope.limitTelefoniaCf === 10) {
            $scope.limitTelefoniaCf = $scope.serviciosFacturado.InfoTelefonia.DNs.length;
        } else {
            $scope.limitTelefoniaCf = 10;
        }
    }

    $scope.mostrarMasMenosTvCf = function() {
        if ($scope.limitTvCf === 10) {
            $scope.limitTvCf = $scope.serviciosFacturado.InfoTelevision.Television.length;
        } else {
            $scope.limitTvCf = 10;
        }
    }

    $scope.mostrarMasMenosIps = function() {
        if ($scope.limitIps === 10) {
            $scope.limitIps = $scope.arregloIps.length;
        } else {
            $scope.limitIps = 10;
        }
    }

    $scope.regresarHistorialUsuario = function() {
        if ($scope.historialUsuario.length !== 0) {
            $scope.historialUsuario.splice(-1, 1);
            $scope.detalleContacto = $scope.historialUsuario.slice(-1).pop();
            $("#img-usuario").attr("src", $scope.detalleContacto.urlFoto);
        } else {
            console.log($scope.historialUsuario);
        }
    }

    angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
        $("#moduloBusqueda").addClass('active')
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
    });

}])
