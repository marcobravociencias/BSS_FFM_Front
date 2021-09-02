var app = angular.module('busquedaApp', []);

app.controller('busquedaController', ['$scope', 'busquedaService', 'genericService', function ($scope, busquedaService, genericService) {
    $scope.showSearch = true;
    $scope.mostrarCurrentInfo;
    $scope.searchSF = '';

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


}])
