app.busquedaSalesforce = function ($scope, busquedaSalesforceService) {


    //REQUERIMIENTOS PARA LA IMPLEMENTACION
    /* 
        1. Importar los css de styleMainBusqueda
        2. Importar los jsp : <jsp:include page="/WEB-INF/jsp/generic/busquedaSalesforce/mainBusquedaSalesforce.jsp"></jsp:include>
        3. Importar los js de busquedaSalesforceController y busquedaSalesforceService en el modulo requerido
        4. Agregar busquedaSalesforceService en el app.controller principal
        5. Agregar app.busquedaSalesforce($scope, busquedaSalesforceService) en el controller principal

    Nota: En caso de implementar la funcion en otros modulos favor de agregarlos en la siguiente lista
        * moduloGestionTickets

    */
    $scope.historial = [];
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

    $scope.consultarDetalleObjectosSF = function (id, keyObjeto) {
        console.log("id: " + id + " tipo del objeto: " + keyObjeto)
        $scope.isConsultaPrimeraVezNoticias = false;
        $scope.isAbiertoOSNoticias = false;
        swal({ text: 'Buscando datos ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            idObjectSF: id,
            typeObjectSF: keyObjeto
        }
        busquedaSalesforceService.consultaDetalleObjectSF(params).then((result) => {
            console.log(result)
            swal.close()
            $scope.mostrarTintoreria = false;
            $scope.mostrarNotaCF = false;
            if (result.data.respuesta) {
                if (result.data.result) {
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
                    mostrarMensajeWarningValidacion('No se encontr\u00F3 informaci\u00F3n')
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
            $scope.detalleSalesforceView = true;
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
            $scope.detalleSalesforceView = true;
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
            $scope.detalleSalesforceView = true;
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
            $scope.detalleSalesforceView = true;
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
            $scope.detalleSalesforceView = true;
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
            $scope.detalleSalesforceView = true;
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
            $scope.detalleSalesforceView = true;
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
            $scope.detalleSalesforceView = true;
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
        busquedaSalesforceService.consultaDetalleObjectSF(params).then(function success(response) {
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

    $scope.regresarHistorialUsuario = function() {
        if ($scope.historialUsuario.length !== 0) {
            $scope.historialUsuario.splice(-1, 1);
            $scope.detalleContacto = $scope.historialUsuario.slice(-1).pop();
            $("#img-usuario").attr("src", $scope.detalleContacto.urlFoto);
        } else {
            console.log($scope.historialUsuario);
        }
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

    $scope.detalleSalesforceView = false;
    $scope.vista = function() {
        //$scope.detalleSalesforceView = true;
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

        $scope.detalleSalesforceView = false;
        //$scope.detalleTicketView = true;
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
        $scope.historial = [];

        $scope.detalleSalesforceView = false;
    }

    $scope.regresarConsulta = function () {
        $scope.consultarValidacionCuentaAsync = true
        $scope.isConsultaPrimeraVezNoticias = false;
        $scope.isAbiertoOSNoticias = false
        $scope.cerrarDetalles();
        $scope.historial.splice(-1, 1);
        if ($scope.historial.length !== 0) {
            $scope.detalle = $scope.historial.slice(-1).pop().detalle;
            $scope.redirecionarVistaDetalle($scope.historial.slice(-1).pop().keyObject);
        }
    }

    $scope.redirecionarVistaDetalle = function (keyObject) {
        $scope.detalleSalesforceView = true;
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

    mostrarMensajeWarningValidacion = function (mensaje) {
        toastr.warning(mensaje);
    }

}