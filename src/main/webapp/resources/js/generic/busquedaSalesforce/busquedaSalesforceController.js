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
        * moduloBandejasSalesforce

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

    //
    $scope.banderaNoticiasTicket = false;
    $scope.banderaNoticiasOportunidad = false;
    $scope.banderaNoticiasOs = false;

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
            $scope.validacionGenerica();
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
            $scope.validacionGenerica();
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
            $scope.validacionGenerica();
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
            $scope.validacionGenerica();
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
            $scope.validacionGenerica();
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
            $scope.validacionGenerica();
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
            $scope.validacionGenerica();
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
            $scope.validacionGenerica();
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
        $("#modalDetalleSalesforce").addClass('scroll-modal-proyect');
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
        $scope.validacionGenerica();
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
            $scope.validacionGenerica();
        } else{
            $scope.validacionGenerica();
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

    //NOTICIAS

    $scope.showAdjuntar = false;
    $scope.tipoResponse;
    $scope.banderaShow = false;
    $scope.tipoComentario;
    $scope.noticiaAnterior;
    $scope.mensajeGeneral = '';
    $scope.showEliminarFileGeneral = false;
    $scope.showEliminarSubCom = false;
    $scope.isAbiertoOSNoticias = false
    $scope.tituloNombreArchivoGeneral = ''

    $scope.abrirVentanaNoticias = function () {
        if (!$scope.isAbiertoOSNoticias && !$scope.isConsultaPrimeraVezNoticias) {
            $scope.objectoConsulta()
        }
        $scope.isAbiertoOSNoticias = !$scope.isAbiertoOSNoticias

        $scope.isConsultaPrimeraVezNoticias = true
    }

    $scope.objectoConsulta = function () {
        $scope.listadoNoticias = [];
        $scope.mensajeGeneral = '';
        $scope.resetFileGeneralBusqueda();
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

        busquedaSalesforceService.consultarComentariosNoticiasSF(params).then((response) => {
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.listadoNoticias = response.data.result.news;
                } else {
                    swal.close();
                    mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n.')
                }
                setTimeout(function () {
                    $(".container-noticia-elemento").animate({ scrollTop: 100000000 }, 500);
                }, 400)
                swal.close();
            } else {
                swal.close();
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }
        }).catch((err) => handleError(err));
    }

    $scope.enviarMesajeGeneralBusqueda = function () {
        let params;
        if ($scope.elemento.keyObject === 'OS') {
            if ($scope.mensajeGeneral=== '') {
                mostrarMensajeWarningValidacion('Escribir un comentario')
                return false;
            }

            params = {
                objectId: $scope.elemento.detalle.id,
                text: $scope.mensajeGeneral
            }
            if (document.querySelector('#fileComentarioGeneralBusqueda').files[0] !== undefined) {


                var myFile = document.querySelector('#fileComentarioGeneralBusqueda').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {

                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: $scope.mensajeGeneral,
                        documentName: document.querySelector('#fileComentarioGeneralBusqueda').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileComentarioGeneralBusqueda').files[0].name.split('.')[1],
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
            if ($scope.mensajeGeneral === '') {
                mostrarMensajeWarningValidacion('Escribir un comentario')
                return false;
            }

            params = {
                objectId: $scope.elemento.detalle.id,
                text: $scope.mensajeGeneral
            }
            if (document.querySelector('#fileComentarioGeneralBusqueda').files[0]) {


                var myFile = document.querySelector('#fileComentarioGeneralBusqueda').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {

                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: $scope.mensajeGeneral,
                        documentName: document.querySelector('#fileComentarioGeneralBusqueda').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileComentarioGeneralBusqueda').files[0].name.split('.')[1],
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
            if ($scope.mensajeGeneral === '') {
                mostrarMensajeWarningValidacion('Escribir un comentario')
                return false;
            }
            console.log("ultima opcion");
            console.log($scope.elemento);
            console.log($scope.elemento.detalle.id);
            params = {
                objectId: $scope.elemento.detalle.id,
                text: $scope.mensajeGeneral
            }
            if (document.querySelector('#fileComentarioGeneralBusqueda').files[0] !== undefined) {


                var myFile = document.querySelector('#fileComentarioGeneralBusqueda').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {

                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: $scope.mensajeGeneral,
                        documentName: document.querySelector('#fileComentarioGeneralBusqueda').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileComentarioGeneralBusqueda').files[0].name.split('.')[1],
                        document: reader.result.split(",")[1]
                    }
                    $scope.guardarMensaje(params);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            } else {
                console.log("bandera 1");
                $scope.guardarMensaje(params);
            }

        }
    }

    $scope.guardarMensaje = function (params) {
        console.log(params);
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        busquedaSalesforceService.crearNoticia(params).then((response) => {
            console.log(response)
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.result === '0') {
                        $scope.resetFileGeneralBusqueda();
                        $scope.mensajeGeneral = '';
                        $scope.objectoConsulta();
                    } else {
                        mostrarMensajeWarningValidacion(response.data.result.resultDescripcion)
                    }
                } else {
                    mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                }
            } else {
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }

        }).catch((err) => handleError(err));
    }


    $scope.responderComentario = function (numero) {
        $scope.showAdjuntar = true;
       
        if ($scope.noticiaAnterior) {
            if ($scope.noticiaAnterior !== numero) {
                $scope.banderaShow = false;
                document.getElementById('content-subcomentario-os-' + $scope.noticiaAnterior).style.display = 'none';
                document.getElementById('content-subcomentario-op-' + $scope.noticiaAnterior).style.display = 'none';
                document.getElementById('content-subcomentario-ticket-' + $scope.noticiaAnterior).style.display = 'none';
                $scope.resetFileBusqueda($scope.noticiaAnterior)
            }
        }
        if ($scope.banderaShow) {
            if ($scope.tipoResponse !== 0) {
                document.getElementById('texto-subcomentario-os-' + numero).value = '';
                document.getElementById('texto-subcomentario-op-' + numero).value = '';
                document.getElementById('texto-subcomentario-ticket-' + numero).value = '';
                $scope.tipoResponse = 0;
            } else {
                document.getElementById('content-subcomentario-os-' + numero).style.display = 'none';
                document.getElementById('content-subcomentario-op-' + numero).style.display = 'none';
                document.getElementById('content-subcomentario-ticket-' + numero).style.display = 'none';
                $scope.banderaShow = false;
                $scope.tipoResponse = null;
            }
        } else {
            document.getElementById('content-subcomentario-os-' + numero).style.display = 'block';
            document.getElementById('content-subcomentario-op-' + numero).style.display = 'block';
            document.getElementById('content-subcomentario-ticket-' + numero).style.display = 'block';
            document.getElementById('texto-subcomentario-os-' + numero).value = '';
            document.getElementById('texto-subcomentario-op-' + numero).value = '';
            document.getElementById('texto-subcomentario-ticket-' + numero).value = '';
            $scope.tipoResponse = 0;
            $scope.banderaShow = true;
        }
        $scope.noticiaAnterior = numero;
        $scope.resetFileGeneralBusqueda();
    }

    $scope.enviarComentarioBusqueda = function (noticia) {
        console.log(noticia);
        let params = {}
        if ($scope.elemento.keyObject === 'OS') {
            if ($scope.tipoResponse === 0) {
                if (document.getElementById('texto-subcomentario-ticket-' + noticia).value === '') {
                    mostrarMensajeWarningValidacion('Escribir un comentario')
                    return false;
                }

                params = {
                    newId: noticia,
                    text: document.getElementById('texto-subcomentario-ticket-' + noticia).value
                }

                if (document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0] !== undefined) {

                    var myFile = document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {
                        params = {
                            newId: noticia,
                            text: document.getElementById('texto-subcomentario-ticket-' + noticia).value,
                            documentName: document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0].name.split('.')[0],
                            documentExtension: document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0].name.split('.')[1],
                            document: reader.result.split(",")[1]
                        }
                       
                        $scope.crearSubComnetarioBusqueda(params);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                } else {
                    $scope.crearSubComnetarioBusqueda(params);
                }


            } else {
                if ($scope.tipoComentario === 0) {
                    if (document.getElementById('texto-comentario-os-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-os-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-os-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        subNewId: noticia,
                        text: document.getElementById('texto-comentario-os-' + noticia).value
                    }
                    $scope.editComentarioSub(params);
                }

            }
        } else if ($scope.elemento.keyObject === 'OP') {
            if ($scope.tipoResponse === 0) {
                if (document.getElementById('texto-subcomentario-ticket-' + noticia).value === '') {
                    mostrarMensajeWarningValidacion('Escribir un comentario')
                    return false;
                }

                params = {
                    newId: noticia,
                    text: document.getElementById('texto-subcomentario-ticket-' + noticia).value
                }

                if (document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0] !== undefined) {


                    var myFile = document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {

                        params = {
                            newId: noticia,
                            text: document.getElementById('texto-subcomentario-ticket-' + noticia).value,
                            documentName: document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0].name.split('.')[0],
                            documentExtension: document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0].name.split('.')[1],
                            document: reader.result.split(",")[1]
                        }
                        $scope.crearSubComnetarioBusqueda(params);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                } else {
                    $scope.crearSubComnetarioBusqueda(params);
                }

            } else {
                if ($scope.tipoComentario === 0) {
                    if (document.getElementById('texto-comentario-op-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    params = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-op-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-op-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        subNewId: noticia,
                        text: document.getElementById('texto-comentario-op-' + noticia).value
                    }
                    $scope.editComentarioSub(params);
                }

            }
        } else {
            if ($scope.tipoResponse === 0) {
                if (document.getElementById('texto-subcomentario-ticket-' + noticia).value === '') {
                    mostrarMensajeWarningValidacion('Escribir un comentario')
                    return false;
                }

                params = {
                    newId: noticia,
                    text:  document.getElementById('texto-subcomentario-ticket-' + noticia).value
                }

                if (document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0] !== undefined) {
                  
                    var myFile = document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {
                       // params.append("params.document", reader.result.split(",")[1]);
                        params = {
                            newId: noticia,
                            text: document.getElementById('texto-subcomentario-ticket-' + noticia).value,
                            documentName: document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0].name.split('.')[0],
                            documentExtension: document.querySelector('#fileSubComentarioTicket2-' + noticia).files[0].name.split('.')[1],
                            document: reader.result.split(",")[1]
                        }
                        $scope.crearSubComnetarioBusqueda(params);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                } else {
                    $scope.crearSubComnetarioBusqueda(params);
                }

            } else {
                if ($scope.tipoComentario === 0) {
                    if (document.getElementById('texto-comentario-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        subNewId: noticia,
                        text: document.getElementById('texto-comentario-' + noticia).value
                    }
                    $scope.editComentarioSub(params);
                }

            }
        }
    }

    $scope.crearSubComnetarioBusqueda = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        busquedaSalesforceService.crearSubNoticia(params).then(function success(response) {
            console.log(response)
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.result === '0') {
                        $scope.resetFileBusqueda(params.newId);
                        document.getElementById('texto-subcomentario-os-' + params.newId).value = ''
                        document.getElementById('texto-subcomentario-op-' + params.newId).value = ''
                        document.getElementById('texto-subcomentario-ticket-' + params.newId).value = ''
                        $scope.objectoConsulta();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlert("Hubo un error, por favor de intentar mas tarde.")
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescription)
            }

        }).catch((err) => handleError(err));
    }

    $scope.resetFileBusqueda = function (noticia) {
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

    $scope.eliminarComentarioBusqueda = function (noticia, tipo) {
        swal({
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'S\u00ED',
            cancelButtonText: "No",
            html:
                '<b style="font-weight: bold;">\u00BFEsta seguro de querer eliminar comentario?</b>',
        }).then(function () {
            let params = {};
            if ($scope.elemento.keyObject === 'OS') {
                if (tipo === 0) {
                    params = {
                        objectType: 'OrdenServicio',
                        newId: noticia
                    }
                    $scope.enviareliminarComentarioBusqueda(params);
                } else {
                    params = {
                        objectType: 'OrdenServicio',
                        subNewId: noticia
                    }
                    $scope.enviarEliminarSubBusqueda(params);
                }
            } else if ($scope.elemento.keyObject === 'OP') {
                if (tipo === 0) {
                    params = {
                        objectType: 'Oportunidad',
                        newId: noticia
                    }
                    $scope.enviareliminarComentarioBusqueda(params);
                } else {
                    params = {
                        objectType: 'Oportunidad',
                        subNewId: noticia
                    }
                    $scope.enviarEliminarSubBusqueda(params);
                }
            } else {
                if (tipo === 0) {
                    params = {
                        objectType: 'Ticket',
                        newId: noticia
                    }
                    $scope.enviareliminarComentarioBusqueda(params);
                } else {
                    params = {
                        objectType: 'Ticket',
                        subNewId: noticia
                    }
                    $scope.enviarEliminarSubBusqueda(params);
                }
            }

        }).catch(swal.noop);
    }

    $scope.enviareliminarComentarioBusqueda = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        busquedaSalesforceService.eliminarNoticia(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === "0") {
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

        }, function error(response) {
            console.log(response);
        });
    }

    $scope.enviarEliminarSubBusqueda = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        busquedaSalesforceService.eliminarSubNoticia(params).then(function success(response) {
            console.log(response);
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === "0") {
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

        }, function error(response) {
            console.log(response);
        });
    }

    cambiarBusqueda = function(evento) {
        console.log("1");
        if ($scope.elemento.keyObject === 'OS') {
            if( $('#'+evento.id).get(0).files[0] === undefined ){
                $(".text_select_archivo_sub").text("Adjuntar archivo");
                $scope.showEliminarSubOs = false;
            }else{
                $(".text_select_archivo_sub").text( $('#'+evento.id).get(0).files[0].name );
                $scope.showEliminarSubOs = true;
            }		
            $scope.$apply();  
            
        } else if($scope.elemento.keyObject === 'OP'){
            if( $('#'+evento.id).get(0).files[0] === undefined ){
                $(".text_select_archivo_sub").text("Adjuntar archivo");
                $scope.showEliminarSubOp = false;
            }else{
                $(".text_select_archivo_sub").text( $('#'+evento.id).get(0).files[0].name );
                $scope.showEliminarSubOp = true;
            }		
            $scope.$apply();  
            
        } else {
            if( $('#'+evento.id).get(0).files[0] === undefined ){
                $(".text_select_archivo_sub").text("Adjuntar archivo");
                $scope.showEliminarSubTick = false;
            }else{
                $(".text_select_archivo_sub").text( $('#'+evento.id).get(0).files[0].name );
                $scope.showEliminarSubTick = true;
            }		
            $scope.$apply();  
           
        }
 
    }

    $scope.cerrarNoticiasGeneral = function(){
        $scope.isAbiertoOSNoticias = false
        $scope.mensajeGeneral = ''
    }

    $scope.cambioGeneralBusqueda = function(){
        if ($('#fileComentarioGeneralBusqueda').get(0).files[0] === undefined) {
            $scope.tituloNombreArchivoGeneral = ''
            $scope.showEliminarFileGeneral= false
        } else {
            $scope.tituloNombreArchivoGeneral = $('#fileComentarioGeneralBusqueda').get(0).files[0].name
            $scope.showEliminarFileGeneral = true
        }
    }

    $scope.resetFileGeneralBusqueda = function(){
        $scope.tituloNombreArchivoGeneral = ''
        $("#fileComentarioGeneralBusqueda").val("");
        $scope.showEliminarFileGeneral = false;
    }

    cambiarBusqueda = function (evento) {
        console.log("2");
        let noticia = evento.id.split('-')[1]
        if ($('#' + evento.id).get(0).files[0] === undefined) {
            document.getElementById('spnNombreAdSubComentarioOs-' + noticia).innerHTML = ''
            document.getElementById('spnNombreAdSubComentarioOp-' + noticia).innerHTML = ''
            document.getElementById('spnNombreAdSubComentarioTicket-' + noticia).innerHTML = ''
            $scope.showEliminarSubCom = false;
        } else {
            document.getElementById('spnNombreAdSubComentarioOs-' + noticia).innerHTML = $('#' + evento.id).get(0).files[0].name
            document.getElementById('spnNombreAdSubComentarioOp-' + noticia).innerHTML = $('#' + evento.id).get(0).files[0].name
            document.getElementById('spnNombreAdSubComentarioTicket-' + noticia).innerHTML = $('#' + evento.id).get(0).files[0].name
            $scope.showEliminarSubCom = true;
        }
        $scope.$apply();
    }

    $scope.resetFileBusqueda = function (noticia) {
        $("#fileSubComentarioOs-" + noticia).val("");
        $("#fileSubComentariotOp-" + noticia).val("");
        $("#fileSubComentarioTicket2-" + noticia).val("");
        document.getElementById('spnNombreAdSubComentarioOs-' + noticia).innerHTML = ''
        document.getElementById('spnNombreAdSubComentarioOp-' + noticia).innerHTML = ''
        document.getElementById('spnNombreAdSubComentarioTicket-' + noticia).innerHTML = ''
        $scope.showEliminarSubCom = false;
    }

    $scope.cerrarModalDetalleContacto = function() {
        $("#modalDetalleContacto").modal('hide');
    }

}