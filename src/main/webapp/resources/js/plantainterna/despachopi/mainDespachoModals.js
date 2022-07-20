var tableMaterialesDespacho;
var tablePagosDespacho;
const formatterMonto = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})
app.modalDespachoPrincipal = function ($scope, mainDespachoService, $q, genericService) {
    $scope.listadoIconografia = undefined
    
    $scope.otModalSelectedGeneric = {};
    $scope.detencionVistaModal = null;

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
    $scope.mostrarTooltipDetencion = false;
    $scope.tabOTPlantaExterna = false;
    let tableOrdenesPlantaExternaOt = $('#tableOrdenesPlantaExternaOt').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "pageLength": 10,
        "info": false,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });
    $scope.listOrdenesPE = [];

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

    // MODAL ASIGNAR TECNICO GEOCERCA
    $scope.isTreeTecnicosGeocerca = false;
    $scope.listaTecnicosAsignar = [];
    // MODAL ASIGNAR TECNICO GEOCERCA

    abrirModalConfirmacionDesconfirmacion = function (instanciaThis, idot) {
        $scope.banderaRegresarCheckbox = false;
        $scope.objConfirmaDesc = {
            isConfirmadoDesconfirmado: $(instanciaThis).is(':checked'),
            idOtConfirmaDesc: idot,
            comentarios: "",
            procesando: false
        }
        $scope.$apply()
        $("#modalConfirmaDesconfirma").modal('show')
    }

    abrirModalDetalleOtPendiente = function (idotpendiente) {
        $scope.flagPaquete = false;
        $scope.detencionVistaModal = true;
        $scope.listadoMotivosRescate = $scope.estatusCambio.filter(e => { return e.idPadre === 212 })
        $scope.listadoMotivosCalendarizado = $scope.estatusCambio.filter(e => { return e.idPadre === 243 })
        $scope.listadoMotivosReagenda = $scope.estatusCambio.filter(e => { return e.idPadre === 201 })
        $scope.listadoEstadosTerminado = $scope.estatusCambio.filter(e => { return e.idPadre === 4 })
        $scope.listadoEstadoGestoria = $scope.estatusCambio.filter(e => { return e.idPadre === 7 })
        $scope.listadoTurnosAcciones = $scope.filtrosGeneral.turnosdisponibles;
        $scope.detalleOtPendienteSelected = $scope.listadoOtsPendientes.find(e => e.idOrden == idotpendiente)
        $scope.permisosModal = $scope.elementosConfigGeneral.get("MODAL_FLUJO_" + $scope.detalleOtPendienteSelected.idFlujo).split(",")
        //        $scope.permisosModal.push("tabCambioDireccion");
        $scope.estatusModals = 'PENDIENTE'
        $scope.otModalSelectedGeneric = angular.copy($scope.detalleOtPendienteSelected);
        $scope.requestModalInformacion(idotpendiente)
    }
    
    abrirModalInformacion = function (idotasignada) {
        $scope.flagPaquete = false;
        $scope.detencionVistaModal = true;
        $scope.listadoMotivosRescate = $scope.estatusCambio.filter(e => { return e.idPadre === 212 })
        $scope.listadoMotivosCalendarizado = $scope.estatusCambio.filter(e => { return e.idPadre === 243 })
        $scope.listadoMotivosReagenda = $scope.estatusCambio.filter(e => { return e.idPadre === 201 })
        $scope.listadoEstadosTerminado = $scope.estatusCambio.filter(e => { return e.idPadre === 4 })
        $scope.listadoEstadoGestoria = $scope.estatusCambio.filter(e => { return e.idPadre === 7 })
        $scope.listadoTurnosAcciones = $scope.filtrosGeneral.turnosdisponibles;
        $scope.detalleOtAsignadaSelected = $scope.listadoOtsAsignadas.find(e => e.idOrden == idotasignada)
        $scope.permisosModal = $scope.elementosConfigGeneral.get("MODAL_ASIGNADA_" + $scope.detalleOtAsignadaSelected.idFlujo).split(",")
        $scope.estatusModals = 'ASIGNADA'
        $scope.otModalSelectedGeneric = angular.copy($scope.detalleOtAsignadaSelected);
        $scope.requestModalInformacion(idotasignada)
    }

    $scope.idOtSelect = "";
    $scope.requestModalInformacion = function (idparams) {
        $scope.otconsultamodal =
            document.getElementById('v-tabs-consulta-detalleot-tab').click()
        $scope.idOtSelect = idparams;
        $scope.flagComentarios = false;
        $scope.flagHistorico = false;
        $scope.flagPedido = false;
        $scope.consultarDetalleOtPEFlag = false;
        $scope.comentariosOrdenTrabajo = [];
        $scope.historialOrdenTrabajo = [];
        $scope.infoOtDetalle = {}
        $scope.detalleCotizacion = {}
        $scope.detalleTecnicoOt = {};
        $scope.infoDetalleOtPe = {}
        swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
        swal.showLoading();

        let params = {
            "idOt": idparams,
            "idFlujo": $scope.otModalSelectedGeneric.idFlujo,
            "idOT": idparams
        }

        $q.all([
            mainDespachoService.consultarDetalleOtDespacho(params),
            mainDespachoService.consultarDetalleTecnicoOt(params)
        ]).then(function (results) {
            swal.close()
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        if (results[0].data.result.orden) {
                            $scope.infoOtDetalle = results[0].data.result.orden
                            $("#modalDetalleOT").modal({ backdrop: 'static', keyboard: false });
                            $("#modalDetalleOT").modal('show')
                            setTimeout(function () {
                                document.getElementsByClassName('permiso-accion-modal')[0].click();
                                let isBlock = $scope.keyBloqueoBtn.find((e) => e == $scope.infoOtDetalle.idEstatus)
                                if(isBlock || $scope.dataWindow){
                                    $(".disable-terminada").prop("disabled", true)
                                }else{
                                    $(".disable-terminada").prop("disabled", false)
                                }
                            }, 500)

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


        }).catch(err => handleError(err));

    }
    $scope.consultarDetalleOtPEFlag = false;

    $scope.consultarDetalleOtPE = function () {
    	
    	$scope.mostrarTooltipDetencion = false;
		var tamContenedorDetencionModal = $("#v-tabs-tabsContent").width();
		var tamContenedorDetencionAlerta = $("#v-tabs-tabsContent-alertas").width();
		
		if(tamContenedorDetencionModal > 0){
			if(tamContenedorDetencionModal < 700){
				$scope.mostrarTooltipDetencion = true;
			}
		}else{
			if(tamContenedorDetencionAlerta < 700){
				$scope.mostrarTooltipDetencion = true;
			}
		}
    	
        if (!$scope.consultarDetalleOtPEFlag) {
            swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
            swal.showLoading();

            let params = {
                "idFlujo": $scope.otModalSelectedGeneric.idFlujo,
                "idOT": $scope.otModalSelectedGeneric.idOrden
            }
            
            /**
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
            };**/

            mainDespachoService.consultaDetalleOtPe(params).then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.orden) {
                                $scope.consultarDetalleOtPEFlag = true;
                                $scope.infoDetalleOtPe = response.data.result.orden;
                                $scope.infoDetalleOtPe.tipoOrden = $scope.respaldoTipoOrdenArray.find(e => { return e.id === $scope.infoDetalleOtPe.idTipoOrden });
                                $scope.infoDetalleOtPe.subTipoOrden = $scope.respaldoTipoOrdenArray.find(e => { return e.id === $scope.infoDetalleOtPe.idSubTipoOrden });
                                $scope.infoDetalleOtPe.estado = $scope.respaldoStatusArray.find(e => { return e.id === $scope.infoDetalleOtPe.idEstado });
                                $scope.infoDetalleOtPe.estatus = $scope.respaldoStatusArray.find(e => { return e.id === $scope.infoDetalleOtPe.idEstatus });

                                /**
                                if($scope.infoDetalleOtPe.detalleCorteMasivo !== undefined){
                                    $scope.tabDetalleCorteMasivo = true;
                                }else if($scope.infoDetalleOtPe.detalleDetencion !== undefined){
                                    $scope.tabDetalleDetencion = true;
                                }else if($scope.infoDetalleOtPe.detalleInspeccion !== undefined){
                                    $scope.tabDetalleInspector = true;
                                }
                                **/
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
                                //                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas.push(fallaExtra2);
                                //                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas.push(fallaExtra3);
                                //                        	$scope.infoDetalleOtPe.detalleInspeccion.fallas.push(fallaExtra4);
                                //                        	--------------------------------INSPECTOR--------------------------------
                                //                        	--------------------------------INSPECTOR--------------------------------

                                //                        	--------------------------------DETENCION--------------------------------
                                //                        	--------------------------------DETENCION--------------------------------
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter = [];
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter.push({"candado": "candado 1","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://cadenanoticias.com/assets/article/00122895/20211002_lVEOusxIi7.jpeg"},{"nombre": "nombre", "url": "https://ru83nc4.files.wordpress.com/2016/07/falla-en-la-red.jpg"},{"nombre": "nombre", "url": "https://queplan.mx/sites/default/files/inline-images/modems-totalplay.jpg"}],"idGsa": "IDGSA1","numeroCuenta": "numeroCuenta","puertoAsiganado": "1","puertosOcupados": "1","puertosTotales": "1","qr": "qr"},{"candado": "candado 2","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://pbs.twimg.com/media/EtqcHubVEAAiA5u.jpg"}],"idGsa": "IDGSA2","numeroCuenta": "numeroCuenta 2","puertoAsiganado": "2","puertosOcupados": "2","puertosTotales": "2","qr": "qr"},{"candado": "candado3","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://pbs.twimg.com/media/Ej_3pquXcAE5pgu.jpg"},{"nombre": "nombre", "url": "https://static.promodescuentos.com/pepperpdimages/threads/content/pU63G/501850.jpg"},{"nombre": "nombre", "url": "https://muralchiapas.com/images/fotonoticias/cable.jpg"},{"nombre": "nombre", "url": "https://3.bp.blogspot.com/-nJnnmzBgZAU/XN5FKZ3sEBI/AAAAAAAADIw/QST65Nh1YHgjoVKtPHv1kW1MVIDYUELcACLcBGAs/s1600/WhatsApp%2BImage%2B2019-05-17%2Bat%2B12.21.23%2BAM.jpeg"},{"nombre": "nombre", "url": "https://1.bp.blogspot.com/-LQYkZeZGoN8/XN5FKf-hdSI/AAAAAAAADIo/M2jbbaoNvu8kdEwyWsej-rqZgH9GxiM0gCLcBGAs/s1600/WhatsApp%2BImage%2B2019-05-17%2Bat%2B12.21.42%2BAM.jpeg"}],"idGsa": "IDGSA3","numeroCuenta": "numeroCuenta","puertoAsiganado": "3","puertosOcupados": "3","puertosTotales": "3","qr": "qr"},{"candado": "candado4","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://i.blogs.es/3871d1/velocidad-internet-telephono/450_1000.jpg"},{"nombre": "nombre", "url": "https://precoinprevencion.com/wp-content/uploads/2017/03/IMG_0055.jpg"}],"idGsa": "IDGSA4","numeroCuenta": "numeroCuenta","puertoAsiganado": "4","puertosOcupados": "4","puertosTotales": "4","qr": "qr"});
//                                                        	$scope.infoDetalleOtPe.detalleDetencion.push({"claveCliente": "TEST","detalleSplitter": [{"candado": "candado 5","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://i.eldiario.com.ec/fotos-manabi-ecuador/2017/06/20170628040049_retiran-postes-sin-uso-y-daa-ados.jpg"},{"nombre": "nombre", "url": "https://www.elsoldeirapuato.com.mx/policiaca/v5nynp-camion-derriba-postes-1.jpg/ALTERNATES/LANDSCAPE_768/Cami%C3%B3n-derriba-postes%20%20(1).jpg"},{"nombre": "nombre", "url": "https://images.freeimages.com/images/large-previews/a89/telephone-pole-2-1416522.jpg"},{"nombre": "nombre", "url": "https://previews.123rf.com/images/angelofoto/angelofoto1208/angelofoto120800018/14871321-viejo-poste-de-tel%C3%A9fono-de-madera-contra-un-gradiente-de-cielo-azul.jpg"},{"nombre": "nombre", "url": "https://c8.alamy.com/compes/2ddbh61/no-hay-pelicula-no-hay-video-no-hay-television-no-hay-documental-los-postes-de-telefono-danados-por-el-huracan-katrina-se-lluran-precariamente-sobre-la-calle-principal-de-la-place-louisiana-el-lunes-29-de-agosto-de-2005-foto-de-khampha-bouaphanh-fort-worth-star-telegram-krt-abacapress-com-2ddbh61.jpg"},{"nombre": "nombre", "url": "https://www.eloccidental.com.mx/policiaca/5zencz-poste-c5-danado.jpg/ALTERNATES/LANDSCAPE_1140/Poste%20C5%20da%C3%B1ado.jpg"}],"idGsa": "IDGSA5","numeroCuenta": "numeroCuenta 5","puertoAsiganado": "5","puertosOcupados": "5","puertosTotales": "5","qr": "qr"},{"candado": "candado 6","estatus": "2","evidencias": [{"nombre": "nombre", "url": "https://img.gruporeforma.com/imagenes/960x640/5/416/4415795.jpg"},{"nombre": "nombre", "url": ""},{"nombre": "nombre", "url": "https://img.gruporeforma.com/imagenes/960x640/5/416/44157955555555555555555.jpg"},{"nombre": "nombre", "url": "https://i.ytimg.com/vi/GgQ9YRx9r-o/maxresdefault.jpg"},{"nombre": "nombre", "url": "https://img.gruporeforma.com/imagenes/960x640/5/416/44157955555555555555555.jpg"}],"idGsa": "IDGSA6","numeroCuenta": "numeroCuenta 6","puertoAsiganado": "6","puertosOcupados": "6","puertosTotales": "6","qr": "qr"}],"fallaReportada": "Reparacion Poste","fechaReporte": "2022-03-018 13:34","folioSistema": "Folio Sis 002-86060","idOrden": 86060,"nombreEmpleadoReporta": "Reynel Flores Brito","subFallaReportada": "Reparación y Etiquetado","unidadNegocio": "Residencial"});
//
//
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0].evidencias[0].url = "https://cadenanoticias.com/assets/article/00122895/20211002_lVEOusxIi7.jpeg";
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0].evidencias[1].url = "https://ru83nc4.files.wordpress.com/2016/07/falla-en-la-red.jpg";
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0].evidencias[2].url = "https://queplan.mx/sites/default/files/inline-images/modems-totalplay.jpg";
//                                                        	
//                                                        	var detalle2 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[0]);
//                                                        	detalle2.idOrden = 200;
//                                                        	detalle2.detalleSplitter[0].idGsa = "IdGsa200";
//                                                        	$scope.infoDetalleOtPe.detalleDetencion.push(detalle2);
//                                                        	
//                                                        	var detalle3 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[0]);
//                                                        	detalle3.idOrden = 300;
//                                                        	detalle3.detalleSplitter[0].idGsa = "IdGsa300";
//                                                        	$scope.infoDetalleOtPe.detalleDetencion.push(detalle3);
//                                                        	
//                                                        	var spliter2 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0]);
//                                                        	spliter2.idGsa = "idSplitterGSA_v2"
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter.push(spliter2);
//                                                        	
//                                                        	var spliter3 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter[0]);
//                                                        	spliter3.idGsa = "idSplitterGSA_v3"
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[0].detalleSplitter.push(spliter3);
//                                                        	
//                                                        	var spliter2_2 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0]);
//                                                        	spliter2_2.idGsa = "IdGsa200_v2"
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter.push(spliter2_2);
//                                                        	
//                                                        	var spliter2_3 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0]);
//                                                        	spliter2_3.idGsa = "IdGsa200_v3"
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter.push(spliter2_3);
//                                                        	
//                                                        	var spliter2_4 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0]);
//                                                        	spliter2_4.idGsa = "IdGsa200_v4"
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter.push(spliter2_4);
//                                                        	
//                                                        	var spliter2_5 = angular.copy($scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0]);
//                                                        	spliter2_5.idGsa = "IdGsa200_v5"
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter.push(spliter2_5);
//
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0].evidencias[0].url = "https://cadenanoticias.com/assets/article/00122895/20211002_lVEOusxIi7.jpeg";
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0].evidencias[1].url = "https://ru83nc4.files.wordpress.com/2016/07/falla-en-la-red.jpg";
//                                                        	$scope.infoDetalleOtPe.detalleDetencion[1].detalleSplitter[0].evidencias[2].url = "https://queplan.mx/sites/default/files/inline-images/modems-totalplay.jpg";
                                //                        	--------------------------------DETENCION--------------------------------
                                //                        	--------------------------------DETENCION--------------------------------
                                //############################################ALTERAR ARREGLO PARA MAS FALLAS #####################################################################

                            } else {
                                toastr.info(results[2].data.result.mensaje);
                            }
                        } else {
                            toastr.warning('No se encontraron datos en el detalle de la OT');
                        }
                    } else {
                        toastr.warning(results[2].data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta del detalle de la OT');
                }
                swal.close()
            }).catch(err => handleError(err))

        }
    }

    let tableRegistrosLocalizados;

    tableRegistrosLocalizados = $('#table-registrosLocalizados').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "pageLength": 10,
        "info": true,
        "autoWidth": true,
        "language": idioma_espanol_not_font
    });


    $scope.listadoArrayOtsLocalizacion = []
    $scope.consultarLocalizacionOtDespacho = function (valorbusqueda) {
        $scope.listadoArrayOtsLocalizacion = [];
        swal({ text: 'Consultando registros ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            "yekparam": valorbusqueda
        }
        mainDespachoService.consultarLocalizacionOtDespacho(params).then(function success(response) {
            swal.close()
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.ordenes && response.data.result.ordenes.length > 0) {
                            let arrayRow = [];
                            if (tableRegistrosLocalizados) {
                                tableRegistrosLocalizados.destroy();
                            }
                            //$scope.listadoTecnicosGeneral=tecnicosAsignacion
                            $scope.listadoArrayOtsLocalizacion = response.data.result.ordenes;

                            $.each($scope.listadoArrayOtsLocalizacion, function (i, elemento) {
                                let row = [];
                                row[0] = elemento.idOrden && elemento.idOrden !== '' ? elemento.idOrden : 'Sin informaci&oacute;n';
                                row[1] = elemento.folioSistema && elemento.folioSistema !== '' ? elemento.folioSistema : 'Sin informaci&oacute;n';
                                row[2] = elemento.claveCliente && elemento.claveCliente !== '' ? elemento.claveCliente : 'Sin informaci&oacute;n';
                                row[3] = elemento.nombreCliente && elemento.nombreCliente !== '' ? elemento.nombreCliente : 'Sin informaci&oacute;n';
                                row[4] = elemento.ciudad && elemento.ciudad !== '' ? elemento.ciudad : 'Sin informaci&oacute;n';
                                row[5] = elemento.cluster && elemento.cluster !== '' ? elemento.cluster : 'Sin informaci&oacute;n';
                                row[6] = elemento.fechaAgenda && elemento.fechaAgenda !== '' ? elemento.fechaAgenda : 'Sin informaci&oacute;n';
                                row[7] = elemento.descripcionEstado && elemento.descripcionEstado !== '' ? elemento.descripcionEstado : 'Sin informaci&oacute;n';
                                row[8] = elemento.descripcionEstatus && elemento.descripcionEstatus !== '' ? elemento.descripcionEstatus : 'Sin informaci&oacute;n';
                                row[9] = elemento.descripcionMotivo && elemento.descripcionMotivo !== '' ? elemento.descripcionMotivo : 'Sin informaci&oacute;n';
                                arrayRow.push(row);
                            });
                            tableRegistrosLocalizados = $('#table-registrosLocalizados').DataTable({
                                "paging": true,
                                "lengthChange": false,
                                "ordering": false,
                                "pageLength": 10,
                                "info": true,
                                "data": arrayRow,
                                "autoWidth": true,
                                "language": idioma_espanol_not_font,
                            });

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
                                setTimeout(function () {
                                    $(".dot-dependencia").remove()
                                    $scope.pintarDependenciasHistorico();
                                }, 500)
                            } else {
                                toastr.warning(response.data.result.mensaje);
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

    $scope.isConsultaPrimeraVezEstatus = false;

    abrirCambioEstatusTecnico = function (idOperario) {

        if (!$scope.isConsultaPrimeraVezEstatus) {
            let params = {
                "tipoRequest": "estatusTecnico"
            }
            mainDespachoService.consultarCatalogoEstatusTecnico(params).then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result.detalleTiposOrden !== undefined && response.data.result.detalleTiposOrden.length > 0) {
                            $scope.isConsultaPrimeraVezEstatus = true;
                            //$scope.listadoOtsPendientes=otspendientes           
                            $scope.listadoEstatusTecnico = response.data.result.detalleTiposOrden
                            $scope.listadoEstatusTecnico = $scope.listadoEstatusTecnico.map(e => { e.descripcion = e.nombre; return e; });
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
                        }
                    }
                }
            }).catch(err => handleError(err))
        } else {
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
                $scope.elementEstatusTecnico.status = optionTempSelected;
            }
            $scope.$apply();
        }



    }

    let tableOtsTecnico;
    abrirOtsTrabajadas = function (idTecnico) {
        let tecnico = $scope.listadoTecnicosGeneral.find(e => { return e.idTecnico == idTecnico })
        if (tecnico.listadoOts.length > 0) {
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
        let params = {
            idTecnico: idTecnico
        }
        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultaInformacionVehiculoTecnico(params).then(function success(response) {
            swal.close();
            if (response.data.result) {
                $scope.vehiculoOperario = response.data.result.vehiculo
                $scope.vehiculoOperario.urlFotoPlaca ? $scope.evidenciaPlaca = $scope.vehiculoOperario.urlFotoPlaca : $scope.evidenciaPlaca = './resources/img/generic/not_found.png';
                $scope.vehiculoOperario.urlFotoVehiculo ? $scope.evidenciaVehiculo = $scope.vehiculoOperario.urlFotoVehiculo : $scope.evidenciaVehiculo = './resources/img/generic/not_found.png';
                $('#modalVehiculoOperario').modal('show')
            } else {
                mostrarMensajeWarningValidacion('El t&eacute;cnico no cuenta con vehiculo asignado.')
            }
        }).catch(err => handleError(err))
    }

    abrirInformacionMateriales = function (id) {
        let tecnicoTemp = angular.copy($scope.listadoTecnicosGeneral.find(e => { return e.idTecnico == id }))
        let params = {
            numEmpleado: tecnicoTemp.numeroEmpleado,
            idUsuario: tecnicoTemp.idTecnico
            //idFlujo:1    
        }

        if (tableMaterialesDespacho)
            tableMaterialesDespacho.destroy();

        $("#table-materiales-temp tbody").empty()

        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultandoMaterialesPI(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result) {
                    params.centro = response.data.result.centro;
                    params.almacen = response.data.result.almacen;
                    tecnicoTemp.centro = params.centro
                    tecnicoTemp.almacen = params.almacen
                    $scope.tecnicoConsultaMateriales = tecnicoTemp

                    $scope.consultarMaterialesPorCentroAlmacenUser(params)

                } else {
                    mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n.')
                    $scope.inicializarTableMateriales()
                    swal.close()
                }
            } else {
                toastr.warning("Ha ocurrido un error al consultar los materiales");
                $scope.inicializarTableMateriales()
                swal.close()
            }
        }).catch(err => handleError(err))
    }
    abrirInformacionPagos = function (id) {
        let tecnicoTemp = angular.copy($scope.listadoTecnicosGeneral.find(e => { return e.idTecnico == id }))
        $scope.tecnicoConsultaPagos = angular.copy(tecnicoTemp)

        if (tablePagosDespacho)
            tablePagosDespacho.destroy();

        $("#table-pagos-temp tbody").empty()

        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        let arrayRow = [];
        let fechaFormatConsulta = moment(new Date()).format('YYYY-MM-DD');
        let fechaInicioConsulta = moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD');
        let params = {
            idTecnico : tecnicoTemp.idTecnico,
            fechaInicio : fechaInicioConsulta,
            fechaFin : fechaFormatConsulta
        }
        console.log(params)
        mainDespachoService.consultarInformacionPagos(params).then(function success(response) {
           $scope.tecnicoConsultaPagos.isPagosPendientes=false
           console.log(response);
           if( response.data.respuesta){
                if (response.data.result) {   
                    swal.close()       
                    if(response.data.result.detallePago!=undefined && response.data.result.detallePago.length){
                        let estatusIconEstatus=''

                        $.each(response.data.result.detallePago, function (i, elemento) {
                            estatusIconEstatus=''
                     
                            if(elemento.idEstatusPago == 2){
                                estatusIconEstatus=` <i class="fas fa-exclamation icono-pago-pendiente"></i> `
                                $scope.tecnicoConsultaPagos.isPagosPendientes=true
                            }else{
                                estatusIconEstatus=` <i class="far fa-check-circle icono-pago-liberado"></i> `
                            }
                            let row = [];
                            row[0] = elemento.idCveCliente ? elemento.idCveCliente : '';
                            row[1] = elemento.idOrden ? elemento.idOrden : '';
                            row[2] = elemento.folioSistema ? elemento.folioSistema : '';
                            row[3] = elemento.fechaRegistro ? elemento.fechaRegistro : '';
                            row[4] = elemento.fechaCierreOT ? elemento.fechaCierreOT : '';
                            row[5] = elemento.tipoIntervencion ? elemento.tipoIntervencion : '';
                            row[6] = elemento.subTipoIntervencion ? elemento.subTipoIntervencion : '';
                            row[7] = elemento.tiempo ? elemento.tiempo : '';
                            row[8] = elemento.tipoPago ? elemento.tipoPago : '';
                            row[9] = elemento.monto ? formatterMonto.format( elemento.monto )   : '$ 0.0';
                            row[10] = estatusIconEstatus ;
                            arrayRow.push(row);
                        })
                        $scope.inicializarTablePagos(arrayRow);
                        $("#modalPagos").modal('show');                  
                    }else{
                        $scope.inicializarTablePagos(arrayRow);
                    }                                                 
                } else {
                    mostrarMensajeInformativo('No se encontr&oacute; informaci&oacute;n.')
                    $scope.inicializarTablePagos(arrayRow)
                    swal.close()
                }
           }else{
                mostrarMensajeInformativo('No se encontr&oacute; informaci&oacute;n.')
                $scope.inicializarTablePagos(arrayRow)
                swal.close()
           }
        }).catch(err => handleError(err))

     

    }

    mostrarIntervencionesTecnico = function (tecnico) {
        let data_tecnico = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == parseInt(tecnico))
        $('#searchInterAsig').val('');
        $scope.arrayIntervenciones = [];
        $scope.arrayIntervenciones = data_tecnico.idSubIntervenciones;
        $scope.treeIntervencion = angular.copy($scope.arbolIntervenciones);
        $scope.treeIntervencion.map((intervencion) => {
            intervencion.check = ($scope.arrayIntervenciones.filter(e => { return Number(e) === intervencion.id })[0] != undefined);
        });
        $scope.treeIntervencion.map((e) => {
            e.parent = e.idPadre == undefined ? "#" : e.idPadre;
            e.text = e.nombre;
            e.icon = "fa fa-globe";

            e.state = {
                opened: false,
                selected: e.check,
            }
            return e
        })

        $("#jstree-intervencion-asignada").jstree("destroy");
        $('#jstree-intervencion-asignada').bind('loaded.jstree', function (e, data) {         
            $('#jstree-intervencion-asignada >ul > li').each( function() {
                disable( this.id );        
             })
            $("#modal-intervencion-asignada").modal('show');
        }).jstree({
            'plugins': ["wholerow", "checkbox", "search"],
            'core': {
                'data': $scope.treeIntervencion,
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

        let geografia = angular.copy($scope.listadogeografiacopy);
        let selectedGeografia = data_tecnico.idClusters;
        geografia.map((geo) => {
            geo.check = (selectedGeografia.filter(e => { return Number(e) === geo.id })[0] != undefined);
        });
        geografia.map((e) => {
            e.parent = e.padre == undefined ? "#" : e.padre;
            e.text = e.nombre;
            e.icon = "fa fa-globe";

            e.state = { 
                opened: false,
                selected: e.check,
            }
            return e
        })

        $("#jstree-proton-asignadas").jstree("destroy");
        $('#jstree-proton-asignadas').bind('loaded.jstree', function (e, data) {
            setInterval(() => {
                $('#jstree-proton-asignadas li').each( function() {
                    $('#jstree-proton-asignadas').jstree().disable_node( this.id );        
                })
            }, 100);
        }).jstree({
            'plugins': ["wholerow", "checkbox", "search"],
            'core': {
                'data': geografia,
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


    function disable(node_id) {
        var node = $("#jstree-intervencion-asignada").jstree().get_node( node_id );
        $("#jstree-intervencion-asignada").jstree().disable_node(node); 
        node.children.forEach( function(child_id) {            
          disable( child_id );
        })
    }

    $('#searchInterAsig').on('keyup', function () {
        $("#jstree-intervencion-asignada").jstree("search", this.value);
    })

    function transformarTextCantidad(num) {
        return (num && num != '' && num != '0') ? parseInt(num) : "0"
    }
    function transformarTextPrecio(num) {
        if ((num && num != '' && num != '0')) {
            return (Math.round(parseFloat(num) * 100) / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        } else {
            return parseFloat('0.00').toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        }
    }
    function isNumeric(val) {
        return /^-?\d+$/.test(val);
    }
    $scope.consultarMaterialesPorCentroAlmacenUser = function (params) {
        $scope.totalMaterialesModal = 0
        mainDespachoService.consultaMaterialesPorAlmacenUserCentro(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result) {
                    let tempArrayResult = response.data.result.materiales

                    angular.forEach(tempArrayResult, function (elem, index) {
                        if (!isNaN(elem.precio)) {
                            $scope.totalMaterialesModal += (Math.round(parseFloat(elem.precio) * 100) / 100)
                        }

                        $("#table-materiales-temp tbody").append(`
                            <tr>
                                <td >${elem.sku} </td>
                                <td >${elem.descripcion} </td>
                                <td >${elem.lote} </td>
                                <td >${transformarTextCantidad(elem.cantidad)} </td>
                                <td >${elem.unidadMedida} </td>
                                <td >${transformarTextPrecio(elem.precio)}  </td>
                                <td >${elem.familia} </td>
                                <td >${elem.categoria} </td>
                                <td >${elem.grupo} </td>
                            </tr>
                        `)
                    })
                    $scope.totalMaterialesModal = transformarTextPrecio($scope.totalMaterialesModal)
                    $scope.inicializarTableMateriales()
                    swal.close()
                    $("#modalMaterialesOperario").modal('show')
                } else {
                    swal.close()
                    mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n.')
                    $scope.inicializarTableMateriales()
                    $scope.totalMaterialesModal = transformarTextPrecio($scope.totalMaterialesModal)


                }
            } else {
                swal.close()
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                $scope.inicializarTableMateriales()
                $scope.totalMaterialesModal = transformarTextPrecio($scope.totalMaterialesModal)

            }
        }).catch(err => handleError(err))
    }

    $scope.inicializarTableMateriales = function () {
        tableMaterialesDespacho = $('#table-materiales-temp').DataTable({
            "processing": false,
            "ordering": false,
            "serverSide": false,
            "scrollX": false,
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "pageLength": 10,
            "columns": [null, null, null, null, null, null, null, null, null],
            "language": idioma_espanol_not_font
        });
    }

    $scope.inicializarTablePagos = function (arrayRowPagos) {
        tablePagosDespacho = $('#table-pagos-temp').DataTable({
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
            "columns": [null, null, null, null, null, null, null, null, null,null,null],
            "language": idioma_espanol_not_font
        });
    }

    $scope.cambiarEstatusOperario = function () {
        var n = $('#id-status-tecnico').val();
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
        let tituloAccion = "Cambiar estatus t&eacute;cnico";
        let mensajeEnvio = 'Ha ocurrido un error al cambiar el estatus del t&eacute;cnico ' + $scope.elementEstatusTecnico.tecnico.nombreCompleto + ' a ' + $scope.elementEstatusTecnico.status.descripcion;
        mainDespachoService.cambiarEstatusTecnicoPI(params).then(function success(response) {

            $("#modalStatusOperario").modal('hide')
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.codigoEstatusService == 201) {
                        mensajeEnvio = 'Se cambi&oacute; el estatus del t&eacute;cnico ' + $scope.elementEstatusTecnico.tecnico.nombreCompleto + ' a ' + $scope.elementEstatusTecnico.status.descripcion;
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                        toastr.success(response.data.result.description);
                    } else {
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        toastr.warning("No se pudo actualizar estatus ");
                    }
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    toastr.warning(response.data.resultDescripcionn);
                }
            }
            swal.close()
        }).catch(err => handleError(err))
    }

    $scope.confirmarDesconfirmarOt = function () {

        if (!$scope.objConfirmaDesc.comentarios) {
            toastr.info("Captura comentarios");
            return false;
        }

        $scope.objConfirmaDesc.procesando = true
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            "idOrden": $scope.objConfirmaDesc.idOtConfirmaDesc,
            "idOrigen": 1,
            "esConfirmada": $scope.objConfirmaDesc.isConfirmadoDesconfirmado ? 1 : 0,
            "comentarios": $scope.objConfirmaDesc.comentarios
        }
        let textTemp = $scope.objConfirmaDesc.isConfirmadoDesconfirmado ? "confirmar" : "desconfirmar";
        let tituloAccion = $scope.objConfirmaDesc.isConfirmadoDesconfirmado ? "Confirmar OT" : "Desconfirmar OT";
        let mensajeEnvio = 'Ha ocurrido un error al ' + textTemp + ' la OT: ' + params.idOrden;
        mainDespachoService.confirmaDesconfirmaOtDespacho(params).then(function success(response) {
            $scope.banderaRegresarCheckbox = true;
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    $("#modalConfirmaDesconfirma").modal('hide')
                    swal.close()
                    toastr.success('Cambio de estatus correcto');
                    $scope.refrescarBusqueda()
                    textTemp = $scope.objConfirmaDesc.isConfirmadoDesconfirmado ? "confirm&oacute;" : "desconfirm&oacute;" ;
                    mensajeEnvio = 'Se ' + textTemp + ' la OT: ' + params.idOrden;
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    toastr.info("No se pudo cambiar el estatus de la ot");
                }
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                toastr.info("No se pudo cambiar el estatus de la ot");
            }
            $scope.objConfirmaDesc.procesando = false
        }).catch(err => handleError(err))
    }

    $scope.abrirModalDetalleIconografia = function () {

        if ($scope.listadoIconografia) {
            $("#modalIconografiaDespacho").modal('show')
        } else {
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            mainDespachoService.consultarPaletaColoresService().then(function success(response) {
                swal.close()
                $("#modalIconografiaDespacho").modal('show')
                $scope.listadoIconografia = {}

                if (response.data !== undefined) {
                    if (response.data[0].respuesta) {
                        if (response.data[0].result.detalleTiposOrden !== undefined && response.data[0].result.detalleTiposOrden.length > 0) {
                            $scope.listadoIconografia.tipoIntervencion = response.data[0].result.detalleTiposOrden
                        }
                    }

                    if (response.data[1].respuesta) {
                        if (response.data[1].result.detalleTiposOrden !== undefined && response.data[1].result.detalleTiposOrden.length > 0) {
                            $scope.listadoIconografia.estatusIntervencion = response.data[1].result.detalleTiposOrden
                        }
                    }

                    if (response.data[2].respuesta) {
                        if (response.data[2].result.detalleIconos !== undefined && response.data[2].result.detalleIconos.length > 0) {
                            $scope.listadoIconografia.estatusIconografia = $scope.retornarBase64Icons(response.data[2].result.detalleIconos)
                        }
                    }


                    if (response.data[3].respuesta) {
                        if (response.data[3].result.detalleTiposOrden !== undefined && response.data[3].result.detalleTiposOrden.length > 0) {
                            $scope.listadoIconografia.estatusTecnico = response.data[3].result.detalleTiposOrden
                        }
                    }
                }




            }).catch(err => handleError(err))
        }
    }

    $scope.retornarBase64Icons = function (listadoIcons) {
        angular.forEach(listadoIcons, function (elem, index) {
            elem.url = '';
            elem.base64 = false
            switch (elem.archivo) {
                case 'ZteLogo.svg':
                    elem.url = `./resources/img/generic/ZteLogo.svg`
                    break;
                case 'Huawei.svg':
                    elem.url = `./resources/img/generic/Huawei.svg`
                    break;
                default:
                    let tipoDato = elem.archivo.substring(elem.archivo.indexOf(".") + 1, elem.archivo.length)
                    let iconoEncontradoConfig = $scope.listadoIconosConfig.find(e => { return e.icon === elem.archivo }).value
                    switch (tipoDato) {
                        case 'svg':
                            elem.url += `data:image/svg+xml;base64,${iconoEncontradoConfig}`
                            break;
                        case 'png':
                            elem.url += `data:image/png;base64,${iconoEncontradoConfig}`
                            break;
                        case 'jpg':
                            elem.url += `data:image/jpeg;charset=utf-8;base64,${iconoEncontradoConfig}`
                            break;
                        case 'jpeg':
                            elem.url += `data:image/jpeg;charset=utf-8;base64,${iconoEncontradoConfig}`
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
            swal.close()
            toastr.success('Agendado correctamente');
            $scope.procesandoAsignacion = false

            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
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
            swal.close()
            toastr.success('Reagendadado correctamente');

            $scope.procesandoReasignacion = false

            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.d(ata.result.result === '0') {
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

            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
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

        $("#num_emp").html("<span><strong>N&Uacute;M. EMPLEADO: </strong>" + validarUndefinedVacio(usuario) + "</span>");
        $("#tel_emp").html("<span><strong>TEL&Eacute;FONO: </strong>" + validarUndefinedVacio(telefono) + "</span>");
        $("#full_name").html("<span><strong>" + validarUndefinedVacio(nombre) + "</strong></span>");
        $("#centro").html(`
            <span style="background-color:${color};font-size:.6em;" class="color-badge-paleta color-tecnico-estatus-modal badge badge-pill ">&nbsp;</span>
            <span><strong> ${validarUndefinedVacio(estatus)} </strong></span>`
        );
        $("#estatus").html("");
        $("#img_emp").attr("src", url);
        $("#modalFotoUsuario").modal('show');
    }
    validarUndefinedVacio = function (texto) {
        return (texto == undefined || texto == '' || texto == 'undefined' || texto == null) ? 'Sin dato' : texto
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
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
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
                let tecnicoObj = {
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


    $scope.cambioStatus = function (tipo) {
        let errorMensaje = '<ul>';
        let isValido = true;
        let params = {};
        $scope.tipoaccioncambioestatus = tipo
        let estatusTemp = '';
        if (tipo === 'asigna') {
            estatusTemp = "asignado"
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
            estatusTemp = "reasignado"
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
            estatusTemp = "desasignado"
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
            estatusTemp = "calendarizado"
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
            estatusTemp = "enviar a rescate";
            if (!$scope.elementoRescate || !$scope.elementoRescate.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }

            if (!$scope.elementoRescate || !$scope.elementoRescate.comentario || $scope.elementoRescate.comentario.trim() === '') {
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
            estatusTemp = "reagendado"
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
        } else if (tipo === 'termina') {
            estatusTemp = "terminado"
            if (!$scope.elementTerminar || !$scope.elementTerminar.estado) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }

            if (!$scope.elementTerminar || !$scope.elementTerminar.comentario || $scope.elementTerminar.comentario.trim() === '') {
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

        } else if (tipo === 'gestoria') {
            estatusTemp = "enviar a plaza"
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
            envioCambioStatus(params, estatusTemp);
        } else {
            errorMensaje += '</ul>'
            mostrarMensajeWarningValidacion(errorMensaje)
        }

    }

    envioCambioStatus = function (params, text) {
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        let tituloAccion = "Actualizaci&oacute;n estatus orden";
        let tecnicoTemp = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == params.idUsuarioTecnico);
        let mensajeEnvio = tecnicoTemp ? 'Ha ocurrido un error al cambiar el estatus a "' + text + '" de la OT: ' + params.ot + ' para el t&eacute;cnico ' + tecnicoTemp.nombre + ' ' + tecnicoTemp.apellidoPaterno + ' ' + tecnicoTemp.apellidoMaterno : 'Ha ocurrido un error al cambiar el estatus a "' + text + '" de la OT: ' + params.ot;
        
        genericService.cambioStatusOts(params).then(result => {
            $scope.procesandoAsignacion = false;
            $scope.procesandoReasignacion = false

            swal.close();
            $scope.elementTerminar = {};
            $scope.elementReagendaOT = {};
            $scope.elementoRescate = {};
            $scope.elementoDesasigna = {};
            if (result.data.respuesta) {

                toastr.success(result.data.result.mensaje);
                mensajeEnvio = tecnicoTemp ? 'Se actualiz&oacute; el estatus a "' + text + '" de la OT: ' + params.ot + ' para el t&eacute;cnico ' + tecnicoTemp.nombre + ' ' + tecnicoTemp.apellidoPaterno + ' ' + tecnicoTemp.apellidoMaterno : 'Se actualiz&oacute; el estatus a "' + text + '" de la OT: ' + params.ot;
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                switch ($scope.tipoaccioncambioestatus) {
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
            } else {
                toastr.warning(result.data.resultDescripcion);
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
            }
        }).catch(err => handleError(err));
    }

    document.getElementById('id-estado-plaza-comercial').addEventListener('change', function () {
        $scope.listadoMotivosGestaria = [];
        let x = document.getElementById('id-estado-plaza-comercial')
        let select = x.options[x.selectedIndex].text
        if (select !== 'Seleccione ...') {
            $scope.listadoMotivosGestaria = $scope.estatusCambio.filter(e => { return e.idPadre === 249 })
        }
    });

    abrirModalReporte = function () {
        //$scope.repDiario.fechaSeleccionada = 'fechaCreacion'

        if ($scope.filtrosGeneral.tipoOrdenes) {
            $scope.seleccionarTodosRecursivo($scope.filtrosGeneral.tipoOrdenes);
        }

        if ($scope.filtrosGeneral.estatusdisponibles) {
            $scope.seleccionarTodosRecursivo($scope.filtrosGeneral.estatusdisponibles);
        }
        $("#jstree-proton-3").jstree("destroy");
        $scope.$apply();
        $scope.resetArbol();

        $("#idot-reporte").val('');
        $("#idos-reporte").val('');
        $("#cuenta-reporte").val('');
        $("#tipo_reporte").val('fechaCreacion');
        $('#filtro_fecha_inicio_reporte').datepicker('update', moment(FECHA_HOY_DATE).toDate());
        $('#filtro_fecha_fin_reporte').datepicker('update', moment(FECHA_HOY_DATE).toDate());

        consultarReporteDiario();

        $("#modalReporte").modal('show');
    }

    $('#modalReporte').on("hidden.bs.modal", function () {

        if ($scope.filtrosGeneral.tipoOrdenes) {
            $scope.seleccionarTodosRecursivo($scope.filtrosGeneral.tipoOrdenes);
        }

        if ($scope.filtrosGeneral.estatusdisponibles) {
            $scope.seleccionarTodosRecursivo($scope.filtrosGeneral.estatusdisponibles);
        }

        $("#jstree-proton-3").jstree("destroy");
        $scope.$apply();
        $scope.resetArbol();
    });

    $scope.resetArbol = function () {
        let geografia = $scope.listadogeografiacopy;
        $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
        }).jstree({
            'plugins': ["wholerow", "checkbox", "search"],
            'core': {
                'data': geografia,
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

    $scope.responseServicios = {}
    $scope.obtenerPaquete = function () {
        if (!$scope.flagPaquete) {
            $scope.listDetalleEquipos = [];
            let osOtSelected = '';
            if ($scope.estatusModals == 'PENDIENTE') {
                osOtSelected = $scope.detalleOtPendienteSelected.folioOrden
            }

            if ($scope.estatusModals == 'ASIGNADA')
                osOtSelected = $scope.detalleOtAsignadaSelected.folioOrden

            let params = {
                folio: osOtSelected
            }
            swal({ text: 'Espere un momento ...', allowOutsideClick: false });
            swal.showLoading();
            $scope.responseServicios = {}
            mainDespachoService.consultarResumenPaquete(params).then(response => {
                swal.close()
                $scope.flagPaquete = true;
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.resumenPaquete != undefined) {
                            $scope.responseServicios = response.data.result.resumenPaquete
                        } else {

                        }
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion)
                }
            }).catch(err => handleError(err));
        }
    }

    $scope.abrirModalOtsIntervencionres = function () {
        $scope.intervencionesConteo.map(e => {
            e.cantidad = $scope.listadoOtsPendientes.filter(element => { return element.idtipoOrden === e.id }).length
            return e;
        })
        $('#modalOtIntervenciones').modal('show')
    }

    $scope.regresarVistaCambioDireccion = function () {
        $scope.verModDireccionOT = false;
    }

    $scope.cambiarIndicadorBtnImg = function (falla, img) {
    	$(".btnImgPorFalla" + falla).removeClass("btnControlImgsSinOpacidad");
        $(".btnImgPorFalla" + falla).addClass("btnControlImgsOpacidad");
        $("#btnIndicadorIndividual" + falla + img).addClass("btnControlImgsSinOpacidad");
    }

    $scope.cambiarPagTablaSpliters = function (falla, splitter) {
    	$(".spliters" + falla).addClass("ocultarFilaTablaSplitersFallaDetalleDetencion");
        $("#detencion" + falla + splitter).removeClass("ocultarFilaTablaSplitersFallaDetalleDetencion");
        $(".btnPaginadorTablaSpliters" + falla).removeClass("btnPaginadorTablaSplitersActive");
        $(".btnPaginadorTablaSpliters" + falla).addClass("btnPaginadorTablaSplitersNoActive");
        $("#btnPaginador" + falla + splitter).removeClass("btnPaginadorTablaSplitersNoActive");
        $("#btnPaginador" + falla + splitter).addClass("btnPaginadorTablaSplitersActive");
    }

    $scope.cerrarModalDetalleOtPe = function () {
        $("#modalDetalleOT").modal("hide");

        $scope.tabDetalleCorteMasivo = false;
        $scope.tabDetalleDetencion = false;
        $scope.tabDetalleInspector = false;
        $scope.tabOTPlantaExterna = false;
    }

    $scope.guardarCambioDireccion = function () {
        let codigoRegex = /^[0-9]{5,6}$/;

        if($.trim($scope.infoOtDetalle.direccion.codigoPostal) == '' || !codigoRegex.test($scope.infoOtDetalle.direccion.codigoPostal)){
            toastr.warning('Ingresa un c&oacute;digo postal valido');
            return false;
        }

        swal({
            title: 'Comentarios',
            input: 'textarea',
            closeOnClickOutside: false,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar'
        }).then((result) => {

            if (result) {
                let params = {
                    codigoPostal: $scope.infoOtDetalle.direccion.codigoPostal,
                    latitud: $scope.latitudModDireccionOt,
                    longitud: $scope.longitudModDireccionOt,
                    comentarios: result,
                    idOrdenTrabajo: $scope.infoOtDetalle.idOrden,
                }
                swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
                swal.showLoading();
                let tituloAccion = "Cambiar direcci&oacute;n de OT";
                let mensajeEnvio = 'Ha ocurrido un error al cambiar la direcci&oacute;n de la OT: ' + params.idOrdenTrabajo;
                mainDespachoService.actualizarDireccionOt(params).then(function success(response) {
                    swal.close()
                    if (response.data !== undefined) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                $scope.infoOtDetalle.direccion.longitud = $scope.longitudModDireccionOt;
                                $scope.infoOtDetalle.direccion.latitud = $scope.latitudModDireccionOt;
                                $scope.verMapaCambioDireccion($scope.infoOtDetalle.direccion.latitud, $scope.infoOtDetalle.direccion.longitud);
                                toastr.success('Direcci&oacute;n actualizada');
                                mensajeEnvio = 'Se cambio la direcci&oacute;n de la OT: ' + params.idOrdenTrabajo;
                                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                                $scope.regresarVistaCambioDireccion()
                            } else {
                                toastr.warning('No se cambio la direcci&oacute;n');
                                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            }
                        } else {
                            toastr.warning(response.data.resultDescripcion);
                            objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        }
                    } else {
                        toastr.error('Ha ocurrido un error en el cambio de direcci&oacute;n');
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    }
                }).catch(err => handleError(err));
            } else {
                toastr.warning('Ingresa el comentario para cambiar la direcci&oacute;n');
            }

        }).catch((result) => {
        })

    }

    //ORGCHARTJS
    $scope.cerrarModalOrganigrama = function() {
 
        $("#modalOrganigrama").modal('hide');
    
    }

    $scope.listaSubordinados = [];
    $scope.mostrarModalOrganigrama = function() {
        swal({ text: 'Espere un momento ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            idSupervisor: "156896"
        }

        mainDespachoService.consultarJerarquiaOrganigrama(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.subordinados) {
                            $scope.listaSubordinados = response.data.result.subordinados;

                            $scope.nodes = [];
                            $scope.nodes.push({ 
                                id: $("#empleadohidden").val(), 
                                pid: null, 
                                Nombre: $("#nombreempleadohidden").val()+' '+$("#primerapempleadohidden").val()+' '+$("#segundoapempleadohidden").val(), 
                                Puesto: $("#puestoempleadohidden").val(), 
                                img: $("#fotoempleadohidden").val() ? $("#fotoempleadohidden").val() : './resources/img/generic/defaultPerfil.png'
                            });
                            angular.forEach($scope.listaSubordinados, function (elemento, index) {
                                $scope.nodes.push({ 
                                    id: elemento.idTecnico, 
                                    pid: $("#empleadohidden").val(), 
                                    Nombre: elemento.nombre+' '+elemento.apellidoPaterno+' '+elemento.apellidoMaterno, 
                                    Puesto: elemento.descripcionTipoUsuario, 
                                    img: elemento.urlFotoPerfil ? elemento.urlFotoPerfil : './resources/img/generic/defaultPerfil.png'
                                });
                            });
                            OrgChart.templates.ula.field_0 = 
                            '<text data-width="240" text-anchor="middle" style="font-size: 14px;" fill="#039BE5" x="125" y="85">{val}</text>';
                            OrgChart.templates.ula.field_1 = 
                            '<text data-width="240" text-anchor="middle" data-text-overflow="multiline" style="font-size: 12px;" fill="#afafaf" x="125" y="100">{val}</text>';
                            OrgChart.templates.ula.node = 
                            '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect>'
                            + '<line x1="0" y1="120" x2="0" y2="0" stroke-width="4" stroke="rgb(22, 103, 184)"></line>';
                            OrgChart.templates.ula.img_0 = 
                            '<clipPath id="{randId}"><circle cx="125" cy="40" r="30"></circle></clipPath>'
                            + '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="95" y="10" width="60" height="60"></image>';
                            var chart = new OrgChart(document.getElementById("tree"), {
                                enableSearch: false,
                                orientation: OrgChart.orientation.top,
                                mouseScrool: OrgChart.action.none,
                                template: "ula",
                                
                                nodeBinding: {
                                    field_0: "Nombre",
                                    field_1: "Puesto",
                                    img_0: "img"
                                },
                                nodes: $scope.nodes
                            });
                            chart.on('click', function(sender, args){
 
                                //sender.editUI.show(args.node.id, false); 
                            
                                // sender.editUI.show(args.node.id, true);  details mode
                            
                                return false; //to cansel the click event
                            
                            });



                            swal.close()
                            $("#modalOrganigrama").modal('show');
                        }
                    } else {
                        swal.close();
                        toastr.info('No se encontraron datos');
                    }
                } else {
                    swal.close();
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                swal.close();
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
        }).catch(err => handleError(err));      
    }

    $scope.pintarTablaOTPEDetalle = function () {
		let arrayRowPE = [];
		if (tableOrdenesPlantaExternaOt) {
			tableOrdenesPlantaExternaOt.destroy();
		}
		$.each($scope.listOrdenesPE, function (i, elemento) {
			let rowPE = [];
			rowPE[0] = elemento.idOrdenPe && elemento.idOrdenPe !== '' ? elemento.idOrdenPe : 'Sin informaci&oacute;n';
			rowPE[1] = (elemento.nivelUno) + " / " + (elemento.nivelDos);
			rowPE[2] = elemento.subTipoOrden && elemento.subTipoOrden !== '' ? elemento.subTipoOrden : 'Sin informaci&oacute;n';
			rowPE[3] = elemento.nombreTecnico && elemento.nombreTecnico !== '' ? elemento.nombreTecnico : 'Sin informaci&oacute;n';
			rowPE[4] = elemento.localizacion && elemento.localizacion !== '' ? elemento.localizacion : 'Sin informaci&oacute;n';
			rowPE[5] = elemento.estatus && elemento.estatus !== '' ? elemento.estatus : 'Sin informaci&oacute;n';
			rowPE[6] = elemento.estado && elemento.estado !== '' ? elemento.estado : 'Sin informaci&oacute;n';
			rowPE[7] = elemento.nivelUrgencia && elemento.nivelUrgencia !== '' ? elemento.nivelUrgencia : 'Sin informaci&oacute;n';
			rowPE[8] = elemento.fechaAgendamiento && elemento.fechaAgendamiento !== '' ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
			arrayRowPE.push(rowPE);
		});
		tableOrdenesPlantaExternaOt = $('#tableOrdenesPlantaExternaOt').DataTable({
			"paging": true,
			"lengthChange": false,
			"ordering": false,
			"pageLength": 10,
			"info": true,
			"scrollX": false,
			"data": arrayRowPE,
			"autoWidth": false,
			"language": idioma_espanol_not_font,
			'createdRow': function (row, data, rowIndex) {
				$.each($('td', row), function () {
					$(this).attr('title', $(this).text());
				});
			},
		});
	}

    $scope.consultarOrdenesPlantaExternaOTDetalle = function () {
        if (!$scope.tabOTPlantaExterna) {
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            $scope.listOrdenesPE = [];
            let params = {
                "idOrden": $scope.idOtSelect
            };

            mainDespachoService.consultaOrdenesPlantaExternaOt(params).then(function success(response) {
                console.log(response);
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleOrdenPe.length) {
                                $scope.listOrdenesPE = angular.copy(response.data.result.detalleOrdenPe);
                                $scope.tabOTPlantaExterna = true;
                                $scope.pintarTablaOTPEDetalle();                              
                                swal.close();
                            } else {
                                $scope.pintarTablaOTPEDetalle();                              
                                mostrarMensajeWarningValidacion("No se encontr&oacute; Informaci&oacute;n");
                                swal.close();
                            }
                        } else {
                            $scope.pintarTablaOTPEDetalle();                              
                            mostrarMensajeWarningValidacion("No se encontr&oacute; Informaci&oacute;n");
                            swal.close();
                        }
                    } else {
                        $scope.pintarTablaOTPEDetalle();                              
                        mostrarMensajeWarningValidacion(response.data.result.resultDescripcion);
                        swal.close();
                    }
                } else {
                    $scope.pintarTablaOTPEDetalle();                              
                    mostrarMensajeWarningValidacion(response.data.result.resultDescripcion);
                    swal.close();
                }
            });
        }
    }

    $scope.consultarDetalleServicio = function (servicio, idCSP) {
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
        swal.showLoading();
        $scope.responseServicios.productos = [];
        $scope.listDetalleEquipos = [];
        $scope.responseServicios.productos = servicio.productos;
        let params = {
            'idCotSitioPlan': idCSP
        }
        mainDespachoService.consultarDetalleEquiposServicios(params).then(function success(response) {
            console.log(response)
            if (response.data) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.detalleEquipos.length) {
                            $scope.listDetalleEquipos = angular.copy(response.data.result.detalleEquipos);
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

    $scope.loadGeografiaTecnicosGeocerca = function () {
        if (!$scope.isTreeTecnicosGeocerca) {
            $scope.geografiaTecnicosGeocerca = $scope.listadogeografiacopy;
            geografiaTecnicos = $scope.geografiaTecnicosGeocerca.filter(e => e.nivel <= parseInt($scope.nfiltroGeografiaGeocercaT));
            geografiaTecnicos.map((e) => {
                e.parent = e.padre == undefined ? "#" : e.padre;
                e.text = e.nombre;
                e.icon = "fa fa-globe";
                e.state = {
                    opened: false,
                    selected: false,
                }
                return e;
            })
            $('#geografiaTecnicosGeocerca').bind('loaded.jstree', function (e, data) {
                $scope.abrirAsignaTecnicosGeocerca();
                $scope.isTreeTecnicosGeocerca = true;
            }).jstree({
                'plugins': ["search"],
                'core': {
                    'data': geografiaTecnicos,
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

    $scope.abrirAsignaTecnicosGeocerca = function () {
        $scope.isAsignacionTecnicosGeocerca = true;
        $(".col-otspendientes").addClass('disabledDivBlur');
        $(".container-filtros-despacho").addClass('disabledDivBlur');
        $(".fc-time-area").addClass('disabledDivBlur');
        $(".content-alert-parent").addClass('disabledDivBlur');
        $(".header-navbar-p").addClass('disabledDivBlur');
        // $(".fc-widget-header").addClass('disabledDivBlur');
        $(".content-icons-operario").hide();
        $(".icon-content-tecnico-geocerca").show();
        $("#contentAsignarTecnicosGeocerca").show();
    }

    $scope.closeAsignaTecnicosGeocerca = function () {
        if ($scope.isTreeTecnicosGeocerca) {
            $("#geografiaTecnicosGeocerca").jstree('destroy');
            $scope.isTreeTecnicosGeocerca = false;
        }
        $scope.isAsignacionTecnicosGeocerca = false;
        $scope.listaTecnicosAsignar = [];
        $scope.listadoTecnicosGeneral.map(e => { e.isSelectedGeocerca = false; return e; })
        $(".icon-change-check").css("display", "none");
        $(".icon-change-plus").css("display", "block");
        $(".col-otspendientes").removeClass('disabledDivBlur');
        $(".container-filtros-despacho").removeClass('disabledDivBlur');
        $(".fc-time-area").removeClass('disabledDivBlur');
        $(".content-alert-parent").removeClass('disabledDivBlur');
        $(".header-navbar-p").removeClass('disabledDivBlur');
        // $(".fc-widget-header").removeClass('disabledDivBlur');
        $(".content-icons-operario").show();
        $(".icon-content-tecnico-geocerca").hide();
        $("#contentAsignarTecnicosGeocerca").hide();
    }

    agregarTecnicoGeocerca = function (idTecnico) {
        $scope.agregarTecnicoGeocercaList(idTecnico);
        $scope.$apply();
    }

    $scope.agregarTecnicoGeocercaList = function (idTecnico) {
        let isSelectedGeocerca = $scope.listaTecnicosAsignar.find((e) => e.idTecnico == idTecnico);
        if (!isSelectedGeocerca) {
            $scope.validarSelectedTecnicoGeocerca(true, idTecnico);
            let tecnicoGeocerca = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == idTecnico);
            $scope.listaTecnicosAsignar.push(tecnicoGeocerca);
        } else {
            $scope.eliminarTecnicoGeocerca(idTecnico);
        }
    }

    $scope.eliminarTecnicoGeocerca = function (id) {
        $.each($scope.listaTecnicosAsignar, function (i, elemento) {
            if (elemento.idTecnico == id) {
                $scope.validarSelectedTecnicoGeocerca(false, id);
                $scope.listaTecnicosAsignar.splice(i, 1);
                return false;
            }
        });
    }

    $scope.validarSelectedTecnicoGeocerca = function (isSelectedGeocerca, id) {
        $.each($scope.listadoTecnicosGeneral, function (i, elemento) {
            if (elemento.idTecnico == id) {
                elemento.isSelectedGeocerca = isSelectedGeocerca;
                if (isSelectedGeocerca) {
                    $("#icon-plus-" + id).hide();
                    $("#icon-check-" + id).show();
                } else {
                    $("#icon-plus-" + id).show();
                    $("#icon-check-" + id).hide();
                }
            }
        });
    }

    $scope.validarListSelectedTecnicoGeocerca = function () {
        $.each($scope.listadoTecnicosGeneral, function (i, elemento) {
            if (elemento.isSelectedGeocerca) {
                $("#icon-plus-" + elemento.idTecnico).hide();
                $("#icon-check-" + elemento.idTecnico).show();
            } else {
                $("#icon-plus-" + elemento.idTecnico).show();
                $("#icon-check-" + elemento.idTecnico).hide();
            }
        });
    }

    $scope.openModalGeografiaTecnicos = function () {
        $("#modalGeografiaTecnicosGeocerca").modal({ backdrop: 'static', keyboard: false });
        $("#modalGeografiaTecnicosGeocerca").modal('show');
        setTimeout(function () {
            $('#buscadorGeografiaAsignarGeocerca').focus();
        }, 750);
    }

    $scope.asignarListTecnicosGeocerca = function (comentario, listGeocerca) {
        let listParamTecnico = $scope.listaTecnicosAsignar.map(e => { return e.idTecnico.toString(); })
        let params = {
            'idTecnico': listParamTecnico,
            'idGeografia': listGeocerca,
            'comentario': comentario
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.asignarTecnicoGeocerca(params).then(function success(response) {
            // console.log(response);
            if (response.data) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        mostrarMensajeExitoAlert("T&eacute;cnico(s) asignado(s) con &eacute;xito")
                        $scope.closeAsignaTecnicosGeocerca();
                        $("#modalGeografiaTecnicosGeocerca").modal('hide');
                        swal.close();
                    } else {
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                    swal.close();
                }
            } else {
                mostrarMensajeWarningValidacion("Ha ocurrido un error al asignar los T&eacute;cnicos");
                swal.close();
            }
        });
    }

    $scope.asignarTecnicosGeocerca = function () {
        if (!$scope.listaTecnicosAsignar.length) {
            mostrarMensajeWarningValidacion('Selecciona al menos un T&eacute;cnico');
            return false;
        }
        let clustersparam = $("#geografiaTecnicosGeocerca").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nfiltroGeografiaGeocercaT)
            .map(e => e.id)
        if (clustersparam.length == 0) {
            mostrarMensajeWarningValidacion('Selecciona una Geocerca');
            return false;
        }

        swal({
            title: "Asignar t&eacute;cnico(s) a Geocerca",
            text: "Comentarios:",
            type: "warning",
            input: "textarea",
            inputPlaceholder: "Comentarios",
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: 'Asignar',
            cancelButtonText: 'Cancelar'
        }).then(function (response) {
            console.log(response);
            if (response.length) {
                $scope.asignarListTecnicosGeocerca(response, clustersparam);
            } else {
                mostrarMensajeWarningValidacion('El comentario es obligatorio para Asignar T&eacute;cnicos');
            }
        }).catch(err => {
            mostrarMensajeWarningValidacion('Operaci&oacute;n cancelada');
        });
    }

    $scope.busquedaGeografiaAsignarGeocerca = function () {
        $("#geografiaTecnicosGeocerca").jstree("search", $('#buscadorGeografiaAsignarGeocerca').val());
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