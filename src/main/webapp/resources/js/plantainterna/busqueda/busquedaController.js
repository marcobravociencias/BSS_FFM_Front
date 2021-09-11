var app = angular.module('busquedaApp', []);

app.controller('busquedaController', ['$scope', 'busquedaService', 'genericService', function ($scope, busquedaService, genericService) {
    $scope.showSearch = true;
    $scope.mostrarCurrentInfo;
    $scope.searchSF = '';

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
        if ($scope.searchSF !== '') {
            $scope.cerrarDetalles();
            let params = {
                parametroBusqueda: $scope.searchSF
            }
            swal({ text: 'Buscando...', allowOutsideClick: false });
            swal.showLoading();
            busquedaService.busquedaGeneralSF(params).then((result) => {
                console.log(result)
                swal.close();
                if (result.data.respuesta) {
                    if (result.data.result) {
                        $scope.resultBusqueda = result.data.result;
                        $scope.showSearch = true;
                    } else {
                        mostrarMensajeErrorAlert("No se encontro resultado")
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
                        mostrarMensajeErrorAlert("No se encontr\u00F3 informaci\u00F3n")
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
                    if (response.data.result.result === '0') {
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
                        mostrarMensajeWarning("No se encontro informaci\u00f3n");
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarning("No se encontro informaci\u00f3n");
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

}])
