var tableMaterialesDespacho;
var tablePagosDespacho;
app.modalDespachoPrincipal = function ($scope, mainDespachoService, $q, genericService) {
    $scope.listadoIconografia = undefined

    $scope.listadoEstatusTecnico = []
    $scope.elementEstatusTecnico = {};
    $scope.listadoOtsTrabajadasModal = []
    $scope.listadoTecnicosOtsModal = []
    $scope.vehiculoOperario = {}
    $scope.objectMateriales = {}
    $scope.procesandoAsignacion = false    
    $scope.procesandoReasignacion = false
    $scope.isConfirmadoDesconfirmado = false;
    $scope.idotConfirmacionDesconfirmacion = 0;
    $scope.comentarios = '';
    $scope.elementoPlazaComercial = {};
    $scope.estatusModals = '';
    $scope.flagPaquete = false;
    $scope.verModDireccionOT = false;
    $scope.latitudModDireccionOt;
    $scope.longitudModDireccionOt;
    
    $scope.tabDetalleCorteMasivo = false;
    $scope.tabDetalleDetencion = false;
    $scope.tabDetalleInspector = false;
    $scope.infoDetalleOtPe = {};
    $scope.permisoDescargaSeguimientoDiario = false;



    $scope.listadoCatalogoAcciones = []
    $('#modalAsignacionOrdenTrabajo,#modalReAsignacionOrdenTrabajo,#modalMaterialesOperario,#modalVehiculoOperario,#odalUbicacionOperario,#modalStatusOperario,#modalOtsTrabajadas')
        .on("hidden.bs.modal", function () {
            $("#buscar-otsasignadas").trigger('click')
        });

    $scope.banderaRegresarCheckbox = false
    $('#modalConfirmaDesconfirma').on('hidden.bs.modal', function (event) {
        if (!$scope.banderaRegresarCheckbox) {
            let isChecked = $scope.objConfirmaDesc.isConfirmadoDesconfirmado ? false : true
            $("#switch-" + $scope.objConfirmaDesc.idOtConfirmaDesc).prop('checked', isChecked)
        }
    })

    abrirModalConfirmacionDesconfirmacion = function (instanciaThis, idot) {
        $scope.banderaRegresarCheckbox = false;
        console.log($(instanciaThis).is(':checked'))
        $scope.objConfirmaDesc = {
            isConfirmadoDesconfirmado: $(instanciaThis).is(':checked'),
            idOtConfirmaDesc: idot,
            comentarios:"",
            procesando:false
        }
        $scope.$apply()
        $("#modalConfirmaDesconfirma").modal('show')
    }

    abrirModalDetalleOtPendiente = function (idotpendiente) {
        $scope.flagPaquete = false;
        $scope.listadoMotivosRescate = $scope.estatusCambio.filter(e => {return e.idPadre === 212})
        $scope.listadoMotivosCalendarizado = $scope.estatusCambio.filter(e => {return e.idPadre === 243})
        $scope.listadoMotivosReagenda = $scope.estatusCambio.filter(e => {return e.idPadre === 201})
        $scope.listadoEstadosTerminado = $scope.estatusCambio.filter(e => {return e.idPadre === 4})
        $scope.listadoEstadoGestoria = $scope.estatusCambio.filter(e => {return e.idPadre === 7})
        $scope.listadoTurnosAcciones = $scope.filtrosGeneral.turnosdisponibles;
        $scope.requestModalInformacion(idotpendiente)
        $scope.detalleOtPendienteSelected=$scope.listadoOtsPendientes.find(e=>e.idOrden==idotpendiente)
        $scope.permisosModal=$scope.elementosConfigGeneral.get("MODAL_FLUJO_"+ $scope.detalleOtPendienteSelected.idFlujo ).split(",")
//        $scope.permisosModal.push("tabCambioDireccion");
        console.log("##########permisos " + $scope.permisosModal )
        console.log($scope.detalleOtPendienteSelected)
        $scope.estatusModals = 'PENDIENTE'


    }
    abrirModalInformacion = function (idotasignada) {
        $scope.flagPaquete = false;
        $scope.listadoMotivosRescate = $scope.estatusCambio.filter(e => {return e.idPadre === 212})
        $scope.listadoMotivosCalendarizado = $scope.estatusCambio.filter(e => {return e.idPadre === 243})
        $scope.listadoMotivosReagenda = $scope.estatusCambio.filter(e => {return e.idPadre === 201})
        $scope.listadoEstadosTerminado = $scope.estatusCambio.filter(e => {return e.idPadre === 4})
        $scope.listadoEstadoGestoria = $scope.estatusCambio.filter(e => {return e.idPadre === 7})
        $scope.listadoTurnosAcciones = $scope.filtrosGeneral.turnosdisponibles;
        $scope.requestModalInformacion(idotasignada)
        $scope.detalleOtAsignadaSelected= $scope.listadoOtsAsignadas.find(e=>e.idOrden==idotasignada)
        $scope.permisosModal=$scope.elementosConfigGeneral.get("MODAL_ASIGNADA_" + $scope.detalleOtAsignadaSelected.idFlujo ).split(",")
        console.log($scope.permisosModal )
        console.log($scope.detalleOtAsignadaSelected)
        $scope.estatusModals = 'ASIGNADA'
    }

    $scope.idOtSelect = "";
    $scope.requestModalInformacion = function (idparams) {
        $scope.otconsultamodal=
        document.getElementById('v-tabs-consulta-detalleot-tab').click()
        $scope.idOtSelect = idparams;
        $scope.flagComentarios = false;
        $scope.flagHistorico = false;
        $scope.flagPedido = false;
        $scope.comentariosOrdenTrabajo = [];
        $scope.historialOrdenTrabajo = [];
        $scope.infoOtDetalle = {}
        $scope.detalleCotizacion = {}
        $scope.detalleTecnicoOt = {};
        swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
        swal.showLoading();

        let params = {
            "idOt": idparams
        }
        
        let paramsDetalleOtPe = {
                "idOT": 1234567,
                "idFlujo": 12
            };
        
        let paramsDetalleOtPe2 = {
                "idOT": 222120,
                "idFlujo": 10
            };
        
        let paramsDetalleOtPe3 = {
                "idOT": 481649,
                "idFlujo": 11
            };

        $q.all([
            mainDespachoService.consultarDetalleOtDespacho(params),
            mainDespachoService.consultarDetalleTecnicoOt(params)
//            mainDespachoService.consultaDetalleOtPe(paramsDetalleOtPe)
//            mainDespachoService.consultaDetalleOtPe(paramsDetalleOtPe2)
//            mainDespachoService.consultaDetalleOtPe(paramsDetalleOtPe3)
        ]).then(function (results) {
            swal.close()
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        if (results[0].data.result.orden) {
                            $scope.infoOtDetalle = results[0].data.result.orden
                            $("#modalDetalleOT").modal({ backdrop: 'static', keyboard: false });
                            $("#modalDetalleOT").modal('show')
                            setTimeout(function(){ 
                                document.getElementsByClassName('permiso-accion-modal')[0].click();
                            },500)

                        } else {
                            toastr.info(results[0].data.result.mensaje);
                        }
                    } else {
                        toastr.warning('No se encontraron datos');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        $scope.detalleTecnicoOt = results[1].data.result;
                    } else {
                        toastr.warning('No se encontraron datos');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
            
            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        if (results[2].data.result.orden) {
                        	
                        	$scope.infoDetalleOtPe = results[2].data.result.orden;
                        	
                        	$scope.infoDetalleOtPe.tipoOrden = $scope.respaldoTipoOrdenArray.find(e=>{return e.id===$scope.infoDetalleOtPe.idTipoOrden});
                        	$scope.infoDetalleOtPe.subTipoOrden = $scope.respaldoTipoOrdenArray.find(e=>{return e.id===$scope.infoDetalleOtPe.idSubTipoOrden});
                        	$scope.infoDetalleOtPe.estado = $scope.respaldoStatusArray.find(e=>{return e.id===$scope.infoDetalleOtPe.idEstado});
                        	$scope.infoDetalleOtPe.estatus = $scope.respaldoStatusArray.find(e=>{return e.id===$scope.infoDetalleOtPe.idEstatus});
                        	
                        	if($scope.infoDetalleOtPe.detalleCorteMasivo !== undefined){
                        		$scope.tabDetalleCorteMasivo = true;
                        	}else if($scope.infoDetalleOtPe.detalleDetencion !== undefined){
                        		$scope.tabDetalleDetencion = true;
                        	}else if($scope.infoDetalleOtPe.detalleInspeccion !== undefined){
                        	    $scope.tabDetalleInspector = true;
                        	}
                        	
//############################################ALTERAR ARREGLO PARA MAS FALLAS #####################################################################
                        	
//                        	--------------------------------INSPECTOR--------------------------------
//                        	--------------------------------INSPECTOR--------------------------------
//                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas[0].imagenes[0].url = "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/usuarios%2Fmex%2F15015902%2FfotoPerfil.jpg?alt=media&token=uuidv4()";
//                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas[0].imagenes[1].url = "https://cdn.cienradios.com/wp-content/uploads/sites/2/2019/12/trabajador-escalera-640x415.gif";
//                        	var fallaExtra2 = angular.copy($scope.infoDetalleOtPe.detalleInspeccion.fallas[0]);
//                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas[0].imagenes.push({nombre:"F3", url: "https://i.ytimg.com/vi/GgQ9YRx9r-o/maxresdefault.jpg"});
//                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas[0].imagenes.push({nombre:"F4", url: "https://pbs.twimg.com/media/EpDvjEZW8AIHqRv.jpg"});
//                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas[0].imagenes.push({nombre:"F5", url: "https://cimacnoticias.com.mx/wp-content/uploads/2020/04/FOTOJOS1OK.jpg"});
//                        	
//                        	fallaExtra2.idDetallefalla = 200;
//                        	fallaExtra2.descripcionDetalleFalla = "Falla duplicada";
//                        	
//                        	var fallaExtra3 = angular.copy($scope.infoDetalleOtPe.detalleInspeccion.fallas[0]);
//                        	fallaExtra3.idDetallefalla = 300;
//                        	fallaExtra3.descripcionDetalleFalla = "Falla triplicada";
//                        	fallaExtra3.imagenes.splice(3);
//                        	
//                        	var fallaExtra4 = angular.copy($scope.infoDetalleOtPe.detalleInspeccion.fallas[0]);
//                        	fallaExtra4.idDetallefalla = 400;
//                        	fallaExtra4.descripcionDetalleFalla = "Falla cuadruple";
//                        	fallaExtra4.imagenes.splice(4);
//                        	
//                        	console.log( "Fallas -> ", $scope.infoDetalleOtPe.detalleInspeccion.fallas );
//                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas.push(fallaExtra2);
//                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas.push(fallaExtra3);
//                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas.push(fallaExtra4);
//                        	--------------------------------INSPECTOR--------------------------------
//                        	--------------------------------INSPECTOR--------------------------------
                        	
//                        	--------------------------------DETENCION--------------------------------
//                        	--------------------------------DETENCION--------------------------------
//                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter = [];
//                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter.push({"candado": "candado 1","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://cadenanoticias.com/assets/article/00122895/20211002_lVEOusxIi7.jpeg"},{"nombre": "nombre", "url": "https://ru83nc4.files.wordpress.com/2016/07/falla-en-la-red.jpg"},{"nombre": "nombre", "url": "https://queplan.mx/sites/default/files/inline-images/modems-totalplay.jpg"}],"idGsa": "IDGSA1","numeroCuenta": "numeroCuenta","puertoAsiganado": "1","puertosOcupados": "1","puertosTotales": "1","qr": "qr"},{"candado": "candado 2","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://pbs.twimg.com/media/EtqcHubVEAAiA5u.jpg"}],"idGsa": "IDGSA2","numeroCuenta": "numeroCuenta 2","puertoAsiganado": "2","puertosOcupados": "2","puertosTotales": "2","qr": "qr"},{"candado": "candado3","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://pbs.twimg.com/media/Ej_3pquXcAE5pgu.jpg"},{"nombre": "nombre", "url": "https://static.promodescuentos.com/pepperpdimages/threads/content/pU63G/501850.jpg"},{"nombre": "nombre", "url": "https://muralchiapas.com/images/fotonoticias/cable.jpg"},{"nombre": "nombre", "url": "https://3.bp.blogspot.com/-nJnnmzBgZAU/XN5FKZ3sEBI/AAAAAAAADIw/QST65Nh1YHgjoVKtPHv1kW1MVIDYUELcACLcBGAs/s1600/WhatsApp%2BImage%2B2019-05-17%2Bat%2B12.21.23%2BAM.jpeg"},{"nombre": "nombre", "url": "https://1.bp.blogspot.com/-LQYkZeZGoN8/XN5FKf-hdSI/AAAAAAAADIo/M2jbbaoNvu8kdEwyWsej-rqZgH9GxiM0gCLcBGAs/s1600/WhatsApp%2BImage%2B2019-05-17%2Bat%2B12.21.42%2BAM.jpeg"}],"idGsa": "IDGSA3","numeroCuenta": "numeroCuenta","puertoAsiganado": "3","puertosOcupados": "3","puertosTotales": "3","qr": "qr"},{"candado": "candado4","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://i.blogs.es/3871d1/velocidad-internet-telephono/450_1000.jpg"},{"nombre": "nombre", "url": "https://precoinprevencion.com/wp-content/uploads/2017/03/IMG_0055.jpg"}],"idGsa": "IDGSA4","numeroCuenta": "numeroCuenta","puertoAsiganado": "4","puertosOcupados": "4","puertosTotales": "4","qr": "qr"});
//                        	$scope.infoDetalleOtPe.detalleDetencion.push({"claveCliente": "TEST","detalleSplitter": [{"candado": "candado 5","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://i.eldiario.com.ec/fotos-manabi-ecuador/2017/06/20170628040049_retiran-postes-sin-uso-y-daa-ados.jpg"},{"nombre": "nombre", "url": "https://www.elsoldeirapuato.com.mx/policiaca/v5nynp-camion-derriba-postes-1.jpg/ALTERNATES/LANDSCAPE_768/Cami%C3%B3n-derriba-postes%20%20(1).jpg"},{"nombre": "nombre", "url": "https://images.freeimages.com/images/large-previews/a89/telephone-pole-2-1416522.jpg"},{"nombre": "nombre", "url": "https://previews.123rf.com/images/angelofoto/angelofoto1208/angelofoto120800018/14871321-viejo-poste-de-tel%C3%A9fono-de-madera-contra-un-gradiente-de-cielo-azul.jpg"},{"nombre": "nombre", "url": "https://c8.alamy.com/compes/2ddbh61/no-hay-pelicula-no-hay-video-no-hay-television-no-hay-documental-los-postes-de-telefono-danados-por-el-huracan-katrina-se-lluran-precariamente-sobre-la-calle-principal-de-la-place-louisiana-el-lunes-29-de-agosto-de-2005-foto-de-khampha-bouaphanh-fort-worth-star-telegram-krt-abacapress-com-2ddbh61.jpg"},{"nombre": "nombre", "url": "https://www.eloccidental.com.mx/policiaca/5zencz-poste-c5-danado.jpg/ALTERNATES/LANDSCAPE_1140/Poste%20C5%20da%C3%B1ado.jpg"}],"idGsa": "IDGSA5","numeroCuenta": "numeroCuenta 5","puertoAsiganado": "5","puertosOcupados": "5","puertosTotales": "5","qr": "qr"},{"candado": "candado 6","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://img.gruporeforma.com/imagenes/960x640/5/416/4415795.jpg"},{"nombre": "nombre", "url": ""},{"nombre": "nombre", "url": "https://img.gruporeforma.com/imagenes/960x640/5/416/44157955555555555555555.jpg"},{"nombre": "nombre", "url": "https://i.ytimg.com/vi/GgQ9YRx9r-o/maxresdefault.jpg"},{"nombre": "nombre", "url": "https://img.gruporeforma.com/imagenes/960x640/5/416/44157955555555555555555.jpg"}],"idGsa": "IDGSA6","numeroCuenta": "numeroCuenta 6","puertoAsiganado": "6","puertosOcupados": "6","puertosTotales": "6","qr": "qr"}],"fallaReportada": "Reparacion Poste","fechaReporte": "2022-03-018 13:34","folioSistema": "Folio Sis 002-86060","idOrden": 86060,"nombreEmpleadoReporta": "Reynel Flores Brito","subFallaReportada": "Reparación y Etiquetado","unidadNegocio": "Residencial"});
                        	
                        	
//                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0].evidencias[0].url = "https://cadenanoticias.com/assets/article/00122895/20211002_lVEOusxIi7.jpeg";
//                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0].evidencias[1].url = "https://ru83nc4.files.wordpress.com/2016/07/falla-en-la-red.jpg";
//                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0].evidencias[2].url = "https://queplan.mx/sites/default/files/inline-images/modems-totalplay.jpg";
//                        	
//                        	var detalle2 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[0]);
//                        	detalle2.idOrden = 200;
//                        	detalle2.detalleSplitter[0].idGsa = "IdGsa200";
//                        	$scope.infoDetalleOtPe.detalleDetencion.push(detalle2);
//                        	
//                        	var detalle3 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[0]);
//                        	detalle3.idOrden = 300;
//                        	detalle3.detalleSplitter[0].idGsa = "IdGsa300";
//                        	$scope.infoDetalleOtPe.detalleDetencion.push(detalle3);
//                        	
//                        	var spliter2 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0]);
//                        	spliter2.idGsa = "idSplitterGSA_v2"
//                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter.push(spliter2);
//                        	
//                        	var spliter3 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0]);
//                        	spliter3.idGsa = "idSplitterGSA_v3"
//                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter.push(spliter3);
//                        	
//                        	var spliter2_2 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0]);
//                        	spliter2_2.idGsa = "IdGsa200_v2"
//                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter.push(spliter2_2);
//                        	
//                        	var spliter2_3 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0]);
//                        	spliter2_3.idGsa = "IdGsa200_v3"
//                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter.push(spliter2_3);
//                        	
//                        	var spliter2_4 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0]);
//                        	spliter2_4.idGsa = "IdGsa200_v4"
//                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter.push(spliter2_4);
//                        	
//                        	var spliter2_5 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0]);
//                        	spliter2_5.idGsa = "IdGsa200_v5"
//                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter.push(spliter2_5);
                        	
//                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0].evidencias[0].url = "https://cadenanoticias.com/assets/article/00122895/20211002_lVEOusxIi7.jpeg";
//                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0].evidencias[1].url = "https://ru83nc4.files.wordpress.com/2016/07/falla-en-la-red.jpg";
//                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0].evidencias[2].url = "https://queplan.mx/sites/default/files/inline-images/modems-totalplay.jpg";
                        	
//                        	console.log("DETENCION---> ", $scope.infoDetalleOtPe.detalleDetencion);
//                        	--------------------------------DETENCION--------------------------------
//                        	--------------------------------DETENCION--------------------------------
//############################################ALTERAR ARREGLO PARA MAS FALLAS #####################################################################

                        } else {
                            toastr.info(results[2].data.result.mensaje);
                        }
                    }else {
                        toastr.warning('No se encontraron datos en el detalle de la OT');
                    }
                }else{
                	toastr.warning(results[2].data.resultDescripcion);
                }
            }else {
                toastr.error('Ha ocurrido un error en la consulta del detalle de la OT');
            }
            
        }).catch(err => handleError(err));

    }

    $scope.listadoArrayOtsLocalizacion = []
    $scope.consultarLocalizacionOtDespacho = function (valorbusqueda) {
        $scope.listadoArrayOtsLocalizacion = []

        swal({ text: 'Consultando registros ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            "yekparam": valorbusqueda
        }
        mainDespachoService.consultarLocalizacionOtDespacho(params).then(function success(response) {
            console.log(response);
            swal.close()
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.ordenes && response.data.result.ordenes.length > 0) {
                            //$scope.listadoTecnicosGeneral=tecnicosAsignacion
                            $scope.listadoArrayOtsLocalizacion = response.data.result.ordenes
                            $("#modalRegistrosLocalizados").modal('show')
                        } else {
                            toastr.info(response.data.result.mensaje);
                        }
                    } else {
                        toastr.info('No se encontraron datos');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
        }).catch(err => handleError(err))
    }


    $scope.flagComentarios = false;
    $scope.comentariosOrdenTrabajo = [];
    $scope.consultarComentarios = function () {
        if (!$scope.flagComentarios) {
            if (!swal.isVisible()) {
                swal({ text: 'Consultando comentarios ...', allowOutsideClick: false });
                swal.showLoading();
            }

            let params = {
                "idOt": $scope.idOtSelect
            }
            mainDespachoService.consultarComentariosDespachoOT(params).then(function success(response) {
                swal.close()
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalle) {
                                $scope.flagComentarios = true;
                                $scope.comentariosOrdenTrabajo = response.data.result.detalle;
                                angular.forEach($scope.comentariosOrdenTrabajo, function (comentario, index) {
                                    comentario.fechaComentario = moment(comentario.fecha + ' ' + comentario.hora).format("dddd, D [de] MMMM [de] YYYY hh:mm A");
                                });
                            } else {
                                toastr.warning(response.data.result.mensaje);
                            }
                        } else {
                            toastr.warning('No se encontraron comentarios');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err))
        }
    }

    $scope.flagHistorico = false;
    $scope.historialOrdenTrabajo = [];
    $scope.consultarHistorial = function () {
        if (!$scope.flagHistorico) {
            $scope.historialOrdenTrabajo = [];
            $(".dot-dependencia").remove()
            swal({ text: 'Consultando historial ...', allowOutsideClick: false });
            swal.showLoading();
            let params = {
                "idOt": $scope.idOtSelect
            }
            mainDespachoService.consultarHistoricoDespachoOT(params).then(function success(response) {
                swal.close()
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalle) {
                                $scope.flagHistorico = true;
                                $scope.historialOrdenTrabajo = response.data.result.detalle//.reverse();
                                setTimeout(function(){
                                    $(".dot-dependencia").remove()
                                    $scope.pintarDependenciasHistorico();
                                },500)
                            }else{
                                toastr.warning( response.data.result.mensaje );                
                            }
                        } else {
                            toastr.warning('No se encontraron resultados');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err))
        }
    }

    $scope.isConsultaPrimeraVezEstatus=false;

    abrirCambioEstatusTecnico = function (idOperario) {
        
        if( !$scope.isConsultaPrimeraVezEstatus ){
            let params = {
                "tipoRequest": "estatusTecnico"
            }
            mainDespachoService.consultarCatalogoEstatusTecnico(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result.detalleTiposOrden !== undefined && response.data.result.detalleTiposOrden.length>0) {
                            $scope.isConsultaPrimeraVezEstatus=true;
                            console.log("############## catalogo")
                            //$scope.listadoOtsPendientes=otspendientes           
                            $scope.listadoEstatusTecnico=response.data.result.detalleTiposOrden 
                            $scope.listadoEstatusTecnico=$scope.listadoEstatusTecnico.map(e=>{ e.descripcion = e.nombre;return e;});
                            $scope.elementEstatusTecnico.status = null
                            $scope.elementEstatusTecnico.comentario = ''
                    
                            $scope.elementEstatusTecnico.tecnico = angular.copy(
                                $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == idOperario)
                            );
                    
                            if ($scope.listadoEstatusTecnico && $scope.listadoEstatusTecnico.length > 0) {
                                $("#modalStatusOperario").modal('show')
                                let optionTempSelected = $scope.listadoEstatusTecnico.find(function (e) {
                                    return e.id == parseInt($scope.elementEstatusTecnico.tecnico.idEstatusTecnico);
                                })
                                $scope.elementEstatusTecnico.status = optionTempSelected
                            }
                            console.log($scope.elementEstatusTecnico.tecnico)

                        }   
                    }
                }
            }).catch(err => handleError(err))
        }else{
            $scope.elementEstatusTecnico.status = null
            $scope.elementEstatusTecnico.comentario = ''
    
            $scope.elementEstatusTecnico.tecnico = angular.copy(
                $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == idOperario)
            );
    
            if ($scope.listadoEstatusTecnico && $scope.listadoEstatusTecnico.length > 0) {
                $("#modalStatusOperario").modal('show')
                let optionTempSelected = $scope.listadoEstatusTecnico.find(function (e) {
                    return e.id == parseInt($scope.elementEstatusTecnico.tecnico.idEstatusTecnico);
                })
                $scope.elementEstatusTecnico.status = optionTempSelected
            }
            $scope.$apply()
            console.log($scope.elementEstatusTecnico.tecnico)
        }
      

       
    }

    let tableOtsTecnico;
    abrirOtsTrabajadas = function (idTecnico) {
        let tecnico = $scope.listadoTecnicosGeneral.find(e => { return e.idTecnico == idTecnico })
        if (tecnico.listadoOts.length > 0) {
            console.log(tecnico.listadoOts)
            document.getElementById('nombreTecnico').innerHTML = tecnico.nombreCompleto

            let arrayOts = [];
            tecnico.listadoOts.forEach(ot => {
                let array = [];
                
                array[0] = ot.idOrden ? ot.idOrden : 'Sin dato';
                array[1] = ot.folioOrden ? ot.folioOrden : 'Sin dato';
                array[2] = ot.nombreCliente ? ot.nombreCliente : 'Sin dato';
                array[3] = ot.claveCliente ? ot.claveCliente : 'Sin dato';
                array[4] = ot.direccion ? ot.direccion : 'Sin dato';
                array[5] = ot.telefono ? ot.telefono : 'Sin dato';
                array[6] = ot.descripcionGeografia ? ot.descripcionGeografia : 'Sin dato';
                array[7] = ot.descipcionTipoOrden ? ot.descipcionTipoOrden : 'Sin dato';
                array[8] = ot.descripcionSubtipoOrden ? ot.descripcionSubtipoOrden : 'Sin dato';
                array[9] = ot.fechaInicio ? ot.fechaInicio : 'Sin dato'
                array[10] = ot.fechaFin ? ot.fechaFin : 'Sin dato'

                arrayOts.push(array)
            })



            if (tableOtsTecnico) {
                tableOtsTecnico.destroy() 
            }
            tableOtsTecnico = $('#table-ots-trabajadas-tecnico').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "pageLength": 10,
                "info": true,
                "autoWidth": true,
                "data": arrayOts, 
                "language": idioma_espanol_not_font,
                dom: 'Bfrtip', 
            });
            $('#modalOtTrabajadasTecnico').modal('show')
        } else {
            mostrarMensajeInformativo('El tecnico no cuenta con ots trabajadas el dia de hoy.')
        }

    }


    abrirUbicacionOperario = function (idTecnico) {
        $scope.consultarUbicacionOperario(idTecnico)
    }

    $scope.evidenciaPlaca = '';
    $scope.evidenciaVehiculo = '';
    abrirInformacionVehiculo = function (idTecnico) {
        console.log(idTecnico)
        let params = {
            idTecnico: idTecnico
        }
        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultaInformacionVehiculoTecnico(params).then(function success(response) {
            console.log(response)
            swal.close();
            if (response.data.result) {
                $scope.vehiculoOperario = response.data.result.vehiculo
                $scope.vehiculoOperario.urlFotoPlaca ? $scope.evidenciaPlaca = $scope.vehiculoOperario.urlFotoPlaca : $scope.evidenciaPlaca = './resources/img/generic/not_found.png';
                $scope.vehiculoOperario.urlFotoVehiculo ? $scope.evidenciaVehiculo = $scope.vehiculoOperario.urlFotoVehiculo : $scope.evidenciaVehiculo = './resources/img/generic/not_found.png';
                $('#modalVehiculoOperario').modal('show')
            } else{
                mostrarMensajeWarningValidacion('El t&eacute;cnico no cuenta con vehiculo asignado.')
            }
        }).catch(err => handleError(err))
    }

    abrirInformacionMateriales = function (id) {
        let tecnicoTemp=angular.copy($scope.listadoTecnicosGeneral.find(e=>{return e.idTecnico==id}) )
        let params =  {
            numEmpleado: tecnicoTemp.numeroEmpleado,
            idUsuario:tecnicoTemp.idTecnico   
            //idFlujo:1    
        }          
 
        if ( tableMaterialesDespacho ) 
            tableMaterialesDespacho.destroy();

        $("#table-materiales-temp tbody").empty()

        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultandoMaterialesPI(params).then(function success(response) {
           console.log(response)
           console.log("data materiales ",response.data)           
           if( response.data.respuesta){
                if (response.data.result) {                    
                    params.centro=response.data.result.centro;
                    params.almacen=response.data.result.almacen;
                    tecnicoTemp.centro=params.centro
                    tecnicoTemp.almacen=params.almacen
                    $scope.tecnicoConsultaMateriales=tecnicoTemp
                   
                    $scope.consultarMaterialesPorCentroAlmacenUser(params)

                } else {
                    mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n.')
                    $scope.inicializarTableMateriales()
                    swal.close()
                }
           }else{
                toastr.warning("Ha ocurrido un error al consultar los materiales");
                $scope.inicializarTableMateriales()
                swal.close()
           }
        }).catch(err => handleError(err))
    }

    abrirInformacionPagos = function(id){
        let tecnicoTemp=angular.copy($scope.listadoTecnicosGeneral.find(e=>{return e.idTecnico==id}) )
        let params =  {
            idUsuario:tecnicoTemp.idTecnico   
        }          
 
        if ( tablePagosDespacho ) 
            tablePagosDespacho.destroy();

        $("#table-pagos-temp tbody").empty()

        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        let arrayRow = [];
        /*
        mainDespachoService.consultarInformacionPagos(params).then(function success(response) {
           console.log(response)
           if( response.data.respuesta){
                if (response.data.result) {   
                    swal.close()       
                    if(response.data.result.pagos.length){
                        $.each(response.data.result.pagos, function (i, elemento) {
                            let row = [];
                            row[0] = elemento.idCveCliente ? elemento.idCveCliente : '';
                            row[1] = elemento.folioSistema ? elemento.folioSistema : '';
                            row[2] = elemento.monto ? elemento.monto : '';
                            row[3] = elemento.fechaRegistroPago ? elemento.fechaRegistroPago : '';
                            row[4] = elemento.hora ? elemento.hora : '';
                            row[5] = elemento.descEstatusPago ? elemento.descEstatusPago : '';
                            row[6] = elemento.fechaHoraCierreOT ? elemento.fechaHoraCierreOT : '';
                            row[7] = elemento.tipoIntervencion ? elemento.tipoIntervencion : '';
                            row[8] = elemento.subTipoIntervencion ? elemento.subTipoIntervencion : '';
                            arrayRow.push(row);
                        })
                        $scope.inicializarTablePagos(arrayRow);
                        $("#modalMaterialesOperario").modal('show')   
                    }else{
                        swal({ text: 'Tiene todos sus pagos al corriente', allowOutsideClick: true, type: 'success' });
                    }          
                  
                } else {
                    mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n.')
                    $scope.inicializarTablePagos(arrayRow)
                    swal.close()
                }
           }else{
                toastr.warning("Ha ocurrido un error al consultar los pagos");
                $scope.inicializarTablePagos(arrayRow)
                swal.close()
           }
        }).catch(err => handleError(err))
        */
      
        $.each(JSONArraysPagos.pagos, function (i, elemento) {
            let row = [];
            row[0] = elemento.idCveCliente ? elemento.idCveCliente : '';
            row[1] = elemento.folioSistema ? elemento.folioSistema : '';
            row[2] = elemento.monto ? elemento.monto : '';
            row[3] = elemento.fechaRegistroPago ? elemento.fechaRegistroPago : '';
            row[4] = elemento.hora ? elemento.hora : '';
            row[5] = elemento.descEstatusPago ? elemento.descEstatusPago : '';
            row[6] = elemento.fechaHoraCierreOT ? elemento.fechaHoraCierreOT : '';
            row[7] = elemento.tipoIntervencion ? elemento.tipoIntervencion : '';
            row[8] = elemento.subTipoIntervencion ? elemento.subTipoIntervencion : '';
            arrayRow.push(row);
        })
        $scope.inicializarTablePagos(arrayRow);
        swal.close()
        $("#modalPagos").modal('show');
    
    }

    function transformarTextCantidad(num){
        return  ( num && num != '' && num != '0' ) ?   parseInt( num )  : "0"
	}
	function transformarTextPrecio(num){
		if( ( num && num != '' && num != '0' ) ){
			return ( Math.round( parseFloat( num ) * 100) / 100 ).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }); 
		} else{
			return parseFloat('0.00').toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }); 
		}
	}
    function isNumeric(val) {
        return /^-?\d+$/.test(val);
    }
    $scope.consultarMaterialesPorCentroAlmacenUser=function(params){
        $scope.totalMaterialesModal=0
        mainDespachoService.consultaMaterialesPorAlmacenUserCentro(params).then(function success(response) {
            console.log(response)
            if (response.data.respuesta) {
                if (response.data.result) {
                    let tempArrayResult=response.data.result.materiales
                    
                    angular.forEach(tempArrayResult,function(elem,index){
                        if( !isNaN( elem.precio ) ){
                            $scope.totalMaterialesModal+=  ( Math.round( parseFloat( elem.precio  ) * 100) / 100 )
                        }

                        $("#table-materiales-temp tbody").append(`
                            <tr>
                                <td >${elem.sku} </td>
                                <td >${elem.descripcion} </td>
                                <td >${elem.lote} </td>
                                <td >${ transformarTextCantidad(elem.cantidad) } </td>
                                <td >${elem.unidadMedida} </td>
                                <td >${ transformarTextPrecio(elem.precio) }  </td>
                                <td >${elem.familia} </td>
                                <td >${elem.categoria} </td>
                                <td >${elem.grupo} </td>
                            </tr>
                        `)
                    })
                    $scope.totalMaterialesModal= transformarTextPrecio( $scope.totalMaterialesModal )
                    $scope.inicializarTableMateriales()
                    swal.close()
                    $("#modalMaterialesOperario").modal('show')                            
                } else {
                    swal.close()
                    mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n.')
                    $scope.inicializarTableMateriales()
                    $scope.totalMaterialesModal=transformarTextPrecio( $scope.totalMaterialesModal )


                }
            } else {
                swal.close()
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                $scope.inicializarTableMateriales()
                $scope.totalMaterialesModal=transformarTextPrecio( $scope.totalMaterialesModal )

            }
         }).catch(err => handleError(err))
    }

    $scope.inicializarTableMateriales=function(){           
        tableMaterialesDespacho=$('#table-materiales-temp').DataTable({
            "processing": false,
			"ordering": false,
			"serverSide": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": true,
			"ordering": false,
			"pageLength": 10,
			"columns": [null, null, null, null, null, null, null, null,null],
            "language":idioma_espanol_not_font
        });        
    }

    $scope.inicializarTablePagos=function(arrayRowPagos){           
        tablePagosDespacho=$('#table-pagos-temp').DataTable({
            "processing": false,
			"ordering": false,
			"serverSide": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": true,
			"ordering": false,
            "data": arrayRowPagos,
			"pageLength": 10,
			"columns": [null, null, null, null, null, null, null, null,null],
            "language":idioma_espanol_not_font
        });        
    }
  
    $scope.cambiarEstatusOperario = function () {
        console.log("Entra a cambiar estatus:")
        var n = $('#id-status-tecnico').val();
        console.log(n)
        if ($scope.elementEstatusTecnico.status == null) {
            toastr.warning('Selecciona estatus')
            return false
        }
        let params = {

            "id": $scope.elementEstatusTecnico.tecnico.idTecnico,
            "idEstatusUsuario": $scope.elementEstatusTecnico.status.id
        }

        swal({ text: 'Cambiando estatus ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.cambiarEstatusTecnicoPI(params).then(function success(response) {

            $("#modalStatusOperario").modal('hide')
            console.log("Estatus: ", response.status);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if( response.data.codigoEstatusService == 201 ){
                        toastr.success(response.data.result.description);                       
                    }else{
                        toastr.warning("No se pudo actualizar estatus ");
                    }                    
                } else {
                    toastr.warning(response.data.resultDescripcionn);
                }
            }
            swal.close()
        }).catch(err => handleError(err))
    }

    $scope.confirmarDesconfirmarOt = function () {
        console.log("antes de confirma/desconfirma  ",$scope.objConfirmaDesc)

        if(!$scope.objConfirmaDesc.comentarios){
            toastr.info("Captura comentarios");
            return false;
        }

        $scope.objConfirmaDesc.procesando=true
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            "idOrden": $scope.objConfirmaDesc.idOtConfirmaDesc,
            "idOrigen":1,
            "esConfirmada": $scope.objConfirmaDesc.isConfirmadoDesconfirmado ? 1 :0 ,
            "comentarios": $scope.objConfirmaDesc.comentarios
        }        
        console.log("params",params)
        mainDespachoService.confirmaDesconfirmaOtDespacho(params).then(function success(response) {
            $scope.banderaRegresarCheckbox = true;        
            if (response.data !== undefined) {
                if (response.data.respuesta) {                
                    $("#modalConfirmaDesconfirma").modal('hide')
                    console.log(response);
                    swal.close()
                    toastr.success('Cambio de estatus correcto');
                    $scope.refrescarBusqueda()
                }else{
                    toastr.info("No se pudo cambiar el estatus de la ot");
                }
            }else{
                toastr.info("No se pudo cambiar el estatus de la ot");
            }
            $scope.objConfirmaDesc.procesando=false
        }).catch(err => handleError(err))
    }

    $scope.abrirModalDetalleIconografia = function () {
            
        if( $scope.listadoIconografia ){
            $("#modalIconografiaDespacho").modal('show')       
        }else{
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            mainDespachoService.consultarPaletaColoresService().then(function success(response) {
                swal.close()
                $("#modalIconografiaDespacho").modal('show')  
                $scope.listadoIconografia={}
                
                console.log(response);
                if (response.data !== undefined) {
                        if (response.data[0].respuesta) {
                            if (response.data[0].result.detalleTiposOrden !== undefined && response.data[0].result.detalleTiposOrden.length>0) {
                                console.log("############## catalogo")/** **/
                                $scope.listadoIconografia.tipoIntervencion=response.data[0].result.detalleTiposOrden
                             }  
                        }
                       
                        if (response.data[1].respuesta) {
                            if (response.data[1].result.detalleTiposOrden !== undefined && response.data[1].result.detalleTiposOrden.length>0) {
                                console.log("############## catalogo")/** **/
                                $scope.listadoIconografia.estatusIntervencion=response.data[1].result.detalleTiposOrden
                            }
                        }
    
                        if (response.data[2].respuesta) {
                            if (response.data[2].result.detalleIconos !== undefined && response.data[2].result.detalleIconos.length>0) {
                               console.log("############## catalogo")/** **/
                               $scope.listadoIconografia.estatusIconografia=$scope.retornarBase64Icons(response.data[2].result.detalleIconos)
                            }
                        }

                        
                        if (response.data[3].respuesta) {
                            if (response.data[3].result.detalleTiposOrden !== undefined && response.data[3].result.detalleTiposOrden.length>0) {
                                console.log("############## catalogo")/** **/
                                $scope.listadoIconografia.estatusTecnico=response.data[3].result.detalleTiposOrden
                            }
                        }
                }

                

                    
            }).catch(err => handleError(err))
       }
    }

    $scope.retornarBase64Icons=function(listadoIcons){
        angular.forEach( listadoIcons , function(elem,index){       
            elem.url='';
            elem.base64=false    
            switch(  elem.archivo ){
                case 'ZteLogo.svg':
                    elem.url=`./resources/img/generic/ZteLogo.svg`                                                  
                    break;
                case 'Huawei.svg':
                    elem.url=`./resources/img/generic/Huawei.svg`                                                                             
                    break;   
                default:
                    let tipoDato = elem.archivo.substring( elem.archivo.indexOf(".")+1 , elem.archivo.length )
                    let iconoEncontradoConfig=$scope.listadoIconosConfig.find( e =>{return e.icon=== elem.archivo } ).value
                    switch( tipoDato ){
                        case 'svg':
                            elem.url+=`data:image/svg+xml;base64,${iconoEncontradoConfig}`                            
                            break;
                        case 'png':
                            elem.url+=`data:image/png;base64,${iconoEncontradoConfig}`                           
                            break;
                        case 'jpg':
                            elem.url+=`data:image/jpeg;charset=utf-8;base64,${iconoEncontradoConfig}`                            
                            break;
                        case 'jpeg':
                            elem.url+=`data:image/jpeg;charset=utf-8;base64,${iconoEncontradoConfig}`                            
                            break;
                        default:
                    }
            }        
        })      
        return listadoIcons;
    }

    $scope.abrirModalReAsignacion = function (otinfo, data_tecnico) {
        $scope.reAsignacionObject = {
            'otInfo': otinfo,
            'tecnicoInfo': data_tecnico,
            'comentario': ''
        }
        $scope.$digest()
        $("#modalReAsignacionOrdenTrabajo").modal('show')

    }
    $scope.abrirModalAsignacion = function (otinfo, data_tecnico) {
        $scope.asignacionObject = {
            'otInfo': otinfo,
            'tecnicoInfo': data_tecnico,
            'comentario': ''
        }
        $scope.$digest()
        $('#modalAsignacionOrdenTrabajo').modal('show');
    }
    $scope.asignarOrdenTrabajo = function () {
        if (!$scope.asignacionObject.comentario) {
            toastr.warning('Completa campo de comentario ')
            return false
        }
        let horaasignacionInicio = angular.copy($scope.asignacionObject.otInfo.fechahoraasignacion);
        let horaasignacionFin = angular.copy($scope.asignacionObject.otInfo.fechahoraasignacion);
        horaasignacionFin = moment(horaasignacionFin).add(3, 'hours').format();

        let arrayHoraInicio = horaasignacionInicio.split("T")
        arrayHoraInicio[1] = arrayHoraInicio[1].substr(0, 5)
        let formatFechaHoraInicio = arrayHoraInicio[0] + " " + arrayHoraInicio[1]

        let arrayHoraFin = horaasignacionFin.split("T")
        arrayHoraFin[1] = arrayHoraFin[1].substr(0, 5)
        let formatFechaHoraFin = arrayHoraFin[0] + " " + arrayHoraFin[1]


        let params = {
            "idEstado": 203,
            "idMotivo": 1,
            "fechaHoraInicio": formatFechaHoraInicio,
            "fechaHoraFin": formatFechaHoraFin,
            "idOrigenSistema": 1,
            "idTipoOrden": 1,
            //"idUsuarioDespacho":1202,
            //"latitud": 1651651.5,
            //"longitud": 65465,
            "idUsuarioTecnico": $scope.asignacionObject.tecnicoInfo.id,
            "comentarios": $scope.asignacionObject.comentario,
            "textAccionCambioEstatus": "asignaOrden",
            "idOtEnvio": $scope.asignacionObject.otInfo.idOrden
        }
        $scope.procesandoAsignacion = true
        swal({ text: 'Agendando orden ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.cambiarEstatusOrdenTrabajoPI(params).then(function success(response) {

            $("#modalAsignacionOrdenTrabajo").modal('hide')
            console.log(response);
            swal.close()
            toastr.success('Agendado correctamente');

            $scope.procesandoAsignacion = false

            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                        console.log("############## catalogo")
                        //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))
    }

    $scope.reasignarOrdenTrabajo = function () {
        if (!$scope.reAsignacionObject.comentario) {
            toastr.warning('Completa campo de comentario ')
            return false
        }

        let horaasignacionInicio = angular.copy($scope.reAsignacionObject.otInfo.fechahoraasignacion);
        let horaasignacionFin = angular.copy($scope.reAsignacionObject.otInfo.fechahoraasignacion);
        horaasignacionFin = moment(horaasignacionFin).add(3, 'hours').format();


        let arrayHoraInicio = horaasignacionInicio.split("T")
        arrayHoraInicio[1] = arrayHoraInicio[1].substr(0, 5)
        let formatFechaHoraInicio = arrayHoraInicio[0] + " " + arrayHoraInicio[1]


        let arrayHoraFin = horaasignacionFin.split("T")
        arrayHoraFin[1] = arrayHoraFin[1].substr(0, 5)
        let formatFechaHoraFin = arrayHoraFin[0] + " " + arrayHoraFin[1]


        /**let params = {
            "idEstado": 203,
            "idMotivo": 1,
            "fechaHoraInicio": formatFechaHoraInicio,
            "fechaHoraFin": formatFechaHoraFin,
            "idOrigenSistema": 1,
            "idTipoOrden": 1,
            //"idUsuarioDespacho":1202,
            //"latitud": 1651651.5,
            //"longitud": 65465,
            "idUsuarioTecnico": $scope.reAsignacionObject.tecnicoInfo.id,
            "comentarios": $scope.reAsignacionObject.comentario,
            "textAccionCambioEstatus": "asignaOrden",
            "idOtEnvio": $scope.reAsignacionObject.otInfo.idOrden
        }**/
        $scope.procesandoReasignacion = true
        swal({ text: 'Reagendando orden ...', allowOutsideClick: false });
        swal.showLoading();
        /** mainDespachoService.cambiarEstatusOrdenTrabajoPI(params).then(function success(response) {

            $("#modalAsignacionOrdenTrabajo").modal('hide')
            console.log(response);
            swal.close()
            toastr.success('Reagendadado correctamente');

            $scope.procesandoReasignacion = false

            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.d(ata.result.result === '0') {
                        console.log("############## catalogo")
                        //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))**/
        $scope.cambioStatus('reasigna');
    }

    $scope.consultarCatalogosAcciones = function () {
        mainDespachoService.consultarCatalogoAcciones().then(function success(response) {
            swal.close()
            $scope.listadoCatalogoAcciones = catalogoestatusJSON.result.Ststus
            $scope.listadoTurnosAcciones = catalogoTurnoJSON
            $scope.listadoMotivosRescate = $scope.listadoCatalogoAcciones.filter((e) => e.Nivel === '3' && e.ID_Padre === '7')
            $scope.listadoMotivosReagenda = $scope.listadoCatalogoAcciones.filter((e) => e.Nivel === '3' && e.ID_Padre === '7')
            //$scope.listadoMotivosCalendarizado = $scope.listadoCatalogoAcciones.filter((e) => e.Nivel === '3' && e.ID_Padre === '320')
            $scope.listadoEstadosTerminado = $scope.listadoCatalogoAcciones.filter((e) => e.Nivel === '2' && e.ID_Padre === '4')



            console.log($scope.listadoCatalogoAcciones);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                        console.log("############## catalogo")
                        //$scope.listadoOtsPendientes=otspendientes    
                    }
                }
            }
        }).catch(err => handleError(err))
    }

    abrirModalFoto = function (nombre, url, usuario, telefono, color, estatus) {
        if (url == undefined || url == "") {
            url = "./resources/img/plantainterna/despacho/tecnicootasignada.png";
        }
    
        $("#num_emp").html("<span><strong>N&Uacute;M. EMPLEADO: </strong>" + validarUndefinedVacio( usuario ) + "</span>");
        $("#tel_emp").html("<span><strong>TEL&Eacute;FONO: </strong>" + validarUndefinedVacio( telefono ) + "</span>");
        $("#full_name").html("<span><strong>" + validarUndefinedVacio( nombre ) + "</strong></span>");
        $("#centro").html(`
            <span style="background-color:${color};font-size:.6em;" class="color-badge-paleta color-tecnico-estatus-modal badge badge-pill ">&nbsp;</span>
            <span><strong> ${ validarUndefinedVacio( estatus ) } </strong></span>`
        );
        $("#estatus").html("");
        $("#img_emp").attr("src", url);
        $("#modalFotoUsuario").modal('show');
    }
    validarUndefinedVacio=function(texto){
      return  ( texto == undefined || texto == '' || texto == 'undefined' || texto == null )  ?  'Sin dato' : texto
    }
    $scope.flagPedido = false;
    $scope.consultarPedido = function () {
        if (!$scope.flagPedido) {
            $scope.consultarDetalleCotizacion($scope.idOtSelect);
        }
    }


    $scope.addComentariosOt = function () {
        if ($scope.comentarios.trim() !== '' && !/^\s/.test($scope.comentarios)) {

            let params = {
                idOrden: $scope.idOtSelect,
                comentario: $scope.comentarios,
                origenSistema: 1
            }

            swal({ text: 'Espere un momento ...', allowOutsideClick: false });
            swal.showLoading();

            genericService.agregarComentariosOt(params).then(function success(response) {
                swal.close();
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        console.log("############## Comentario agregado")
                        $scope.comentarios = '';
                        $scope.flagComentarios = false;
                        $(".chat-area").scrollTop(0);
                        $scope.consultarComentarios();
                    } else {
                        toastr.error(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err))

        } else {
            $scope.comentarios = '';
            document.getElementById('comentarioOt').value = '';
            toastr.warning('Intoducir un comentario.')
        }
    }

    $scope.getListOt = function (id) {
        let listOt = [];
        
        angular.forEach($scope.listadoTecnicosGeneral, function (tecnico, index) {
            //$scope.listadoTecnicosOtsModal.push(tecnico);
            if ((!id || tecnico.id == id) && tecnico.listadoOts.length) {
                let  tecnicoObj = {
                    "longitud": tecnico.longitud,
                    "latitud": tecnico.latitud,
                    "idOt": []
                }
                
                angular.forEach(tecnico.listadoOts, function (ot, index) {
                    tecnicoObj.idOt.push(ot.idOrden);
                });

                listOt.push(tecnicoObj);
            }
        });
        $scope.consultarDetalleMapa(listOt);
        return true;
        /*
        if (listOt.length) {
            $scope.consultarDetalleMapa(listOt);
            return true;
        } else {
            return false;
        }*/
    }

    abrirModalVistaMapa = function () {
         $scope.getListOt()
        $(".content-tecnico").removeClass("selected-tecnico");
        $("#modalVistaMapa").modal('show'); 
       /* if ($scope.getListOt()) {
            $(".content-tecnico").removeClass("selected-tecnico");
            $("#modalVistaMapa").modal('show');
        } else {
            swal({ text: 'No hay OTs disponibles para mostrar en mapa', allowOutsideClick: true });
        } */
    }


    $scope.detalleTecnicoRuta = function (id) {
        $(".content-tecnico").removeClass("selected-tecnico");
        $("#mapa-" + id).addClass("selected-tecnico");
        $scope.pintarOtMapTecnicoSeleccionado(id);
        //$scope.getListOt(id);
    }


    $scope.cambioStatus = function(tipo){
        let errorMensaje = '<ul>';
        let isValido = true;
        let params = {};
        $scope.tipoaccioncambioestatus=tipo
        if (tipo === 'asigna') {
            let horaasignacionInicio = angular.copy($scope.asignacionObject.otInfo.fechahoraasignacion);
            let horaasignacionFin = angular.copy($scope.asignacionObject.otInfo.fechahoraasignacion);
            horaasignacionFin = moment(horaasignacionFin).add(3, 'hours').format();

            let arrayHoraInicio = horaasignacionInicio.split("T")
            arrayHoraInicio[1] = arrayHoraInicio[1].substr(0, 5)
            let formatFechaHoraInicio = arrayHoraInicio[0] + " " + arrayHoraInicio[1]

            let arrayHoraFin = horaasignacionFin.split("T")
            arrayHoraFin[1] = arrayHoraFin[1].substr(0, 5)
            let formatFechaHoraFin = arrayHoraFin[0] + " " + arrayHoraFin[1]

            if ($scope.asignacionObject.comentario.trim() === '') {
                errorMensaje += 'Completa campo comentario.'
                isValido = false;
            }

            params = {
                tipo: tipo,
                ot: $scope.asignacionObject.otInfo.idOrden,
                folioSistema: $scope.asignacionObject.otInfo.folioOrden,
                idFlujo: $scope.asignacionObject.otInfo.idFlujo,
                idTipoOrden: $scope.asignacionObject.otInfo.idtipoOrden,
                idSubTipoOrden: $scope.asignacionObject.otInfo.idSubtipoOrden,
                idOrigenSistema: 1,
                idUsuarioTecnico: $scope.asignacionObject.tecnicoInfo.idTecnico,
                latitud: $scope.asignacionObject.otInfo.latitud,
                longitud: $scope.asignacionObject.otInfo.longitud,
                comentarios: $scope.asignacionObject.comentario,
                idMotivo: 500,
                idTurno: $scope.asignacionObject.otInfo.idTurno,
                fechaHoraAgenda: formatFechaHoraInicio,
                fechaHoraInicio: formatFechaHoraInicio,
                idtipoAsignacion: 2,
                fechaHoraFin: formatFechaHoraFin
            }
        } else if (tipo === 'reasigna') {
            let horaasignacionInicio = angular.copy($scope.reAsignacionObject.otInfo.fechahoraasignacion);
            let horaasignacionFin = angular.copy($scope.reAsignacionObject.otInfo.fechahoraasignacion);
            horaasignacionFin = moment(horaasignacionFin).add(3, 'hours').format();

            let arrayHoraInicio = horaasignacionInicio.split("T")
            arrayHoraInicio[1] = arrayHoraInicio[1].substr(0, 5)
            let formatFechaHoraInicio = arrayHoraInicio[0] + " " + arrayHoraInicio[1]

            let arrayHoraFin = horaasignacionFin.split("T")
            arrayHoraFin[1] = arrayHoraFin[1].substr(0, 5)
            let formatFechaHoraFin = arrayHoraFin[0] + " " + arrayHoraFin[1]

            if ($scope.reAsignacionObject.comentario.trim() === '') {
                errorMensaje += 'Completa campo comentario.'
                isValido = false;
            }

            params = {
                tipo: tipo,
                ot: $scope.reAsignacionObject.otInfo.idOrden,
                folioSistema: $scope.reAsignacionObject.otInfo.folioOrden,
                idFlujo: $scope.reAsignacionObject.otInfo.idFlujo,
                idTipoOrden: $scope.reAsignacionObject.otInfo.idtipoOrden,
                idSubTipoOrden: $scope.reAsignacionObject.otInfo.idSubtipoOrden,
                idOrigenSistema: 1,
                idUsuarioTecnico: $scope.reAsignacionObject.tecnicoInfo.idTecnico,
                latitud: $scope.reAsignacionObject.otInfo.latitud,
                longitud: $scope.reAsignacionObject.otInfo.longitud,
                comentarios: $scope.reAsignacionObject.comentario,
                fechaHoraInicio: formatFechaHoraInicio,
                fechaHoraFin: formatFechaHoraFin,
                idtipoAsignacion: $scope.reAsignacionObject.otInfo.tipoAsignacion
            }
        } else if (tipo === 'desasigna') {

            if (!$scope.elementoDesasigna || $scope.elementoDesasigna.comentario.trim() === '') {
                errorMensaje += 'Completa campo comentario.'
                isValido = false;
            } else {
                params = {
                    tipo: tipo,
                    ot: $scope.detalleOtAsignadaSelected.idOrden,
                    folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
                    idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
                    idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
                    idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
                    idOrigenSistema: 1,
                    idUsuarioDespacho: 12,
                    idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
                    latitud: $scope.detalleOtAsignadaSelected.latitud,
                    longitud: $scope.detalleOtAsignadaSelected.longitud,
                    comentarios: $scope.elementoDesasigna.comentario,
                }
            }

                
            
        } else if (tipo === 'calendariza') {

            if ($scope.elementCalendarizado.fechaCalendarizado.trim() === '') {
                errorMensaje += '<li>Completa campo fecha</li>'
                isValido = false;
            }

            if (!$scope.elementCalendarizado.turno) {
                errorMensaje += '<li>Seleccione campo turno.</li>'
                isValido = false;
            }

            if (!$scope.elementCalendarizado.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }

            if (!$scope.elementCalendarizado.comentario || $scope.elementCalendarizado.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comnentario.</li>'
                isValido = false;
            }

            if (isValido) {
                let fechaCalendariza = $scope.elementCalendarizado.fechaCalendarizado.split('/')
                if ($scope.estatusModals === 'PENDIENTE') {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtPendienteSelected.idOrden,
                        folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
                        idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        latitud: $scope.detalleOtPendienteSelected.latitud,
                        longitud: $scope.detalleOtPendienteSelected.longitud,
                        comentarios: $scope.elementCalendarizado.comentario,
                        idTurno: $scope.elementCalendarizado.turno.id,
                        idMotivo: $scope.elementCalendarizado.motivo.id,
                        fechaHoraAgenda: fechaCalendariza[2] + '-' + fechaCalendariza[1] + '-' + fechaCalendariza[0]
                    }
                } else {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtAsignadaSelected.idOrden,
                        folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
                        idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
                        latitud: $scope.detalleOtAsignadaSelected.latitud,
                        longitud: $scope.detalleOtAsignadaSelected.longitud,
                        comentarios: $scope.elementCalendarizado.comentario,
                        idTurno: $scope.elementCalendarizado.turno.id,
                        idMotivo: $scope.elementCalendarizado.motivo.id,
                        fechaHoraAgenda: fechaCalendariza[2] + '-' + fechaCalendariza[1] + '-' + fechaCalendariza[0]
                    }
                }
            }
        } else if (tipo === 'cancela') {

            if (!$scope.elementoRescate ||!$scope.elementoRescate.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }

            if (!$scope.elementoRescate ||!$scope.elementoRescate.comentario || $scope.elementoRescate.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comnentario.</li>'
                isValido = false;
            }

            if (isValido) {
                if ($scope.estatusModals === 'PENDIENTE') {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtPendienteSelected.idOrden,
                        folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
                        idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        latitud: $scope.detalleOtPendienteSelected.latitud,
                        longitud: $scope.detalleOtPendienteSelected.longitud,
                        comentarios: $scope.elementoRescate.comentario,
                        idMotivo: $scope.elementoRescate.motivo.id
                    }
                } else {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtAsignadaSelected.idOrden,
                        folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
                        idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
                        latitud: $scope.detalleOtAsignadaSelected.latitud,
                        longitud: $scope.detalleOtAsignadaSelected.longitud,
                        comentarios: $scope.elementoRescate.comentario,
                        idMotivo: $scope.elementoRescate.motivo.id
                    }
                }
            }
            
        } else if (tipo === 'reagendamiento') {

            if (!$scope.elementReagendaOT || $scope.elementReagendaOT.fechaReagendamiento.trim() === '') {
                errorMensaje += '<li>Completa campo fecha.</li>'
                isValido = false;
            }

            if (!$scope.elementReagendaOT || !$scope.elementReagendaOT.turno) {
                errorMensaje += '<li>Seleccione campo turno.</li>'
                isValido = false;
            }

            if (!$scope.elementReagendaOT || !$scope.elementReagendaOT.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }

            if (!$scope.elementReagendaOT.comentario || $scope.elementReagendaOT.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comentario.</li>'
                isValido = false;
            }


            if (isValido) {
                let fechaReagendamiento = $scope.elementReagendaOT.fechaReagendamiento.split('/')
                if ($scope.estatusModals === 'PENDIENTE') {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtPendienteSelected.idOrden,
                        folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
                        idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        latitud: $scope.detalleOtPendienteSelected.latitud,
                        longitud: $scope.detalleOtPendienteSelected.longitud,
                        comentarios: $scope.elementReagendaOT.comentario,
                        idTurno: $scope.elementReagendaOT.turno.id,
                        idMotivo: $scope.elementReagendaOT.motivo.id,
                        fechaHoraAgenda: fechaReagendamiento[2] + '-' + fechaReagendamiento[1] + '-' + fechaReagendamiento[0]
                    }
                } else {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtAsignadaSelected.idOrden,
                        folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
                        idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
                        latitud: $scope.detalleOtAsignadaSelected.latitud,
                        longitud: $scope.detalleOtAsignadaSelected.longitud,
                        comentarios: $scope.elementReagendaOT.comentario,
                        idTurno: $scope.elementReagendaOT.turno.id,
                        idMotivo: $scope.elementReagendaOT.motivo.id,
                        fechaHoraAgenda: fechaReagendamiento[2] + '-' + fechaReagendamiento[1] + '-' + fechaReagendamiento[0]
                    }
                }
            }
        } else if (tipo === 'termina'){

            if (!$scope.elementTerminar || !$scope.elementTerminar.estado) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }

            if (!$scope.elementTerminar ||!$scope.elementTerminar.comentario || $scope.elementTerminar.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comentario.</li>'
                isValido = false;
            }

            if (isValido) {
                if ($scope.estatusModals === 'PENDIENTE') {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtPendienteSelected.idOrden,
                        folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
                        idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        latitud: $scope.detalleOtPendienteSelected.latitud,
                        longitud: $scope.detalleOtPendienteSelected.longitud,
                        comentarios: $scope.elementTerminar.comentario,
                        idMotivo: $scope.elementTerminar.estado.id,
                    }
                } else {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtAsignadaSelected.idOrden,
                        folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
                        idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
                        latitud: $scope.detalleOtAsignadaSelected.latitud,
                        longitud: $scope.detalleOtAsignadaSelected.longitud,
                        comentarios: $scope.elementTerminar.comentario,
                        idMotivo: $scope.elementTerminar.estado.id,
                    }
                }
            }

        } else if (tipo === 'gestoria'){
            if (!$scope.elementoPlazaComercial || !$scope.elementoPlazaComercial.estado) {
                errorMensaje += '<li>Seleccione campo estado.</li>'
                isValido = false;
            }

            if (!$scope.elementoPlazaComercial || !$scope.elementoPlazaComercial.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }

            if (!$scope.elementoPlazaComercial.comentario || $scope.elementoPlazaComercial.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comentario.</li>'
                isValido = false;
            }

            if (isValido) {
                if ($scope.estatusModals === 'PENDIENTE') {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtPendienteSelected.idOrden,
                        folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
                        idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        latitud: $scope.detalleOtPendienteSelected.latitud,
                        longitud: $scope.detalleOtPendienteSelected.longitud,
                        comentarios: $scope.elementoPlazaComercial.comentario,
                        idMotivo: $scope.elementoPlazaComercial.motivo.id,
                    }
                } else {
                    params = {
                        tipo: tipo,
                        ot: $scope.detalleOtAsignadaSelected.idOrden,
                        folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
                        idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
                        idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
                        idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,
                        idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
                        latitud: $scope.detalleOtAsignadaSelected.latitud,
                        longitud: $scope.detalleOtAsignadaSelected.longitud,
                        comentarios: $scope.elementoPlazaComercial.comentario,
                        idMotivo: $scope.elementoPlazaComercial.motivo.id,
                    }
                }
            }

        }
        if (isValido) {
            envioCambioStatus(params);
        } else {
            errorMensaje += '</ul>'
            mostrarMensajeWarningValidacion(errorMensaje)
        }

    }

    envioCambioStatus = function(params){
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        genericService.cambioStatusOts(params).then(result =>{
            console.log(result);
            $scope.procesandoAsignacion=false;
            $scope.procesandoReasignacion=false
            
            swal.close();
            $scope.elementTerminar = {};
            $scope.elementReagendaOT = {};
            $scope.elementoRescate = {};
            $scope.elementoDesasigna = {};
            if(result.data.respuesta){
             
                toastr.success( result.data.result.mensaje );
                
                switch( $scope.tipoaccioncambioestatus ){
                    case 'asigna':
                        $("#modalAsignacionOrdenTrabajo").modal('hide')
                        break;
                    case 'reasigna': 
                        $("#modalReAsignacionOrdenTrabajo").modal('hide')
                        break;                     
                    default:
                        $("#modalDetalleOT").modal('hide')
                        $scope.refrescarBusqueda()

                }
            }else{
                console.log(result.data.resultDescripcion)
                toastr.warning( result.data.resultDescripcion );
                
            }
        }).catch(err => handleError(err));
    }

    document.getElementById('id-estado-plaza-comercial').addEventListener('change', function(){
        $scope.listadoMotivosGestaria = [];
        let x = document.getElementById('id-estado-plaza-comercial')
        let select = x.options[x.selectedIndex].text
        if (select !== 'Seleccione ...') {
            $scope.listadoMotivosGestaria = $scope.estatusCambio.filter(e => {return e.idPadre === 249})
        }
    });

    abrirModalReporte = function(){
        //$scope.repDiario.fechaSeleccionada = 'fechaCreacion'
       
        if($scope.filtrosGeneral.tipoOrdenes){
            $scope.seleccionarTodosRecursivo($scope.filtrosGeneral.tipoOrdenes);
        }

        if($scope.filtrosGeneral.estatusdisponibles){
            $scope.seleccionarTodosRecursivo($scope.filtrosGeneral.estatusdisponibles);
        }
        $("#jstree-proton-3").jstree("destroy");
        $scope.$apply();
        $scope.resetArbol();

        $("#idot-reporte").val('');
        $("#idos-reporte").val('');
        $("#cuenta-reporte").val('');
        $("#tipo_reporte").val('fechaCreacion');
        $('#filtro_fecha_inicio_reporte').datepicker('update',   moment(FECHA_HOY_DATE).toDate() );
        $('#filtro_fecha_fin_reporte').datepicker('update',   moment(FECHA_HOY_DATE).toDate() );
        
        consultarReporteDiario();
        
        $("#modalReporte").modal('show');
    }

    $('#modalReporte').on("hidden.bs.modal", function () {

        if($scope.filtrosGeneral.tipoOrdenes){
            $scope.seleccionarTodosRecursivo($scope.filtrosGeneral.tipoOrdenes);
        }

        if($scope.filtrosGeneral.estatusdisponibles){
            $scope.seleccionarTodosRecursivo($scope.filtrosGeneral.estatusdisponibles);
        }

        $("#jstree-proton-3").jstree("destroy");
        $scope.$apply();
        $scope.resetArbol();
    });

    $scope.resetArbol = function(){
        let geografia = $scope.listadogeografiacopy;
        $('#jstree-proton-3').bind('loaded.jstree', function(e, data) {
        }).jstree({
            'plugins': ["wholerow", "checkbox", "search"],
            'core': {
                'data': geografia,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons":false        
                }
            },
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        });
    }

    $scope.responseServicios={}
    $scope.obtenerPaquete = function(){
        if (!$scope.flagPaquete) {
            let osOtSelected='';
            if($scope.estatusModals=='PENDIENTE'){
                osOtSelected=$scope.detalleOtPendienteSelected.folioOrden
            }

            if($scope.estatusModals=='ASIGNADA')
               osOtSelected=$scope.detalleOtAsignadaSelected.folioOrden

            let params = {
               folio: osOtSelected 
            }
            swal({ text: 'Espere un momento ...', allowOutsideClick: false });
            swal.showLoading();
            $scope.responseServicios={}
            mainDespachoService.consultarResumenPaquete(params).then(response => {
                console.log(response);
                swal.close()
                $scope.flagPaquete = true;
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if(response.data.result.resumenPaquete != undefined){
                            $scope.responseServicios=response.data.result.resumenPaquete
                        }else{

                        }                        
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion)
                }
            }).catch(err => handleError(err));
        }
    }

    $scope.abrirModalOtsIntervencionres = function(){
        console.log( $scope.intervencionesConteo)
        console.log($scope.listadoOtsPendientes)

        $scope.intervencionesConteo.map(e => {
            e.cantidad = $scope.listadoOtsPendientes.filter(element => { return element.idtipoOrden === e.id }).length
            return e;
        })
        $('#modalOtIntervenciones').modal('show')
    }
    
    $scope.regresarVistaCambioDireccion = function() {
    	$scope.verModDireccionOT = false;
    }
    
    $scope.cambiarIndicadorBtnImg = function(falla,img) {
    	$(".btnImgPorFalla"+falla).removeClass("btnControlImgsSinOpacidad");
		$(".btnImgPorFalla"+falla).addClass("btnControlImgsOpacidad");
		$("#btnIndicadorIndividual"+falla+img).addClass("btnControlImgsSinOpacidad");
	}
    
    $scope.cambiarPagTablaSpliters = function(falla, splitter, index) {
    	$(".filasTablaSpliters"+falla).addClass("ocultarFilaTablaSplitersFallaDetalleDetencion");
    	$("#filaTablaSplitersFallaDetalleDetencion"+falla+splitter).removeClass("ocultarFilaTablaSplitersFallaDetalleDetencion");
    	$(".btnPaginadorTablaSpliters"+falla).removeClass("btnPaginadorTablaSplitersActive");
    	$(".btnPaginadorTablaSpliters"+falla).addClass("btnPaginadorTablaSplitersNoActive");
    	$("#btnPaginadorTablaSpliters"+falla+splitter+index).removeClass("btnPaginadorTablaSplitersNoActive");
    	$("#btnPaginadorTablaSpliters"+falla+splitter+index).addClass("btnPaginadorTablaSplitersActive");
	}
    
    $scope.cerrarModalDetalleOtPe = function() {
    	$("#modalDetalleOT").modal("hide");
    	
    	$scope.tabDetalleCorteMasivo = false;
        $scope.tabDetalleDetencion = false;
        $scope.tabDetalleInspector = false;
	}
    
}
/**

$scope.listadoTecnicosGeneral=[]
$scope.isCargaTecnicosDisponibles=false;
mainDespachoService.consultarTecnicosDisponibiles().then(function success(response) {
    if (response.data !== undefined) {
        if(response.data.respuesta ){
            if(response.data.result ){
                if( response.data.result.detalleTecnicos ){
                    $scope.isCargaTecnicosDisponibles=true;
                    $scope.listadoTecnicosGeneral=response.data.result.detalleTecnicos
                }else{
                    toastr.warning( response.data.result.mensaje );
                }
            }else{
                toastr.warning( 'No se encontraron OTS pendientes' );
            }
        }else{
            toastr.warning( response.data.resultDescripcion );
        }
    }else{
        toastr.error( 'Ha ocurrido un error en la consulta de OTS pendientes' );
    }
    $scope.isCargaTecnicosDisponibles=true;
    $scope.validarLoadTecnicosOtsAsignadas()
})
*/