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
        }
        $scope.$apply()
        $("#modalConfirmaDesconfirma").modal('show')
    }

    abrirModalDetalleOtPendiente = function (idotpendiente) {
        $scope.listadoMotivosRescate = $scope.estatusCambio.filter(e => {return e.idPadre === 212})
        $scope.listadoMotivosCalendarizado = $scope.estatusCambio.filter(e => {return e.idPadre === 243})
        $scope.listadoMotivosReagenda = $scope.estatusCambio.filter(e => {return e.idPadre === 201})
        $scope.listadoEstadosTerminado = $scope.estatusCambio.filter(e => {return e.idPadre === 4})
        $scope.listadoEstadoGestoria = $scope.estatusCambio.filter(e => {return e.idPadre === 7})
        $scope.listadoTurnosAcciones = $scope.filtrosGeneral.turnosdisponibles;
        $scope.requestModalInformacion(idotpendiente)
        $scope.detalleOtPendienteSelected=$scope.listadoOtsPendientes.find(e=>e.idOrden==idotpendiente)
        $scope.permisosModal=$scope.elementosConfigGeneral.get("MODAL_FLUJO_"+ $scope.detalleOtPendienteSelected.idFlujo ).split(",")
        console.log("##########permisos " + $scope.permisosModal )
        console.log($scope.detalleOtPendienteSelected)
        $scope.estatusModals = 'PENDIENTE'

    }
    abrirModalInformacion = function (idotasignada) {
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

                            $("#modalDetalleOT").modal('show')
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
                            $scope.listadoArrayOtsLocalizacio = response.data.result.ordenes
                            $("#modalRegistrosLocalizados").modal('show')
                        } else {
                            toastr.info(response.data.result.mensaje);
                        }
                    } else {
                        toastr.warning('No se encontraron datos');
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
                                $scope.historialOrdenTrabajo = response.data.result.detalle.reverse();
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
    abrirCambioEstatusTecnico = function (idOperario) {
        $scope.elementEstatusTecnico.status = null
        $scope.elementEstatusTecnico.comentario = ''

        $scope.elementEstatusTecnico.tecnico = angular.copy(
            $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == idOperario)
        );

        if ($scope.listadoEstatusTecnico && $scope.listadoEstatusTecnico.length > 0) {
            $("#modalStatusOperario").modal('show')
            let optionTempSelected = $scope.listadoEstatusTecnico.find(function (e) {
                return e.idEstatus == parseInt($scope.elementEstatusTecnico.tecnico.idEstatusTecnico);
            })
            $scope.elementEstatusTecnico.status = optionTempSelected
        }

        $scope.$apply()
        console.log($scope.elementEstatusTecnico.tecnico)
    }
    abrirOtsTrabajadas = function (idTecnico, nombreTecnico) {
        /** console.log("idTecnico"+idTecnico)
         console.log("nombreTecnico"+nombreTecnico)
 
         $scope.listadoOtsTrabajadasModal=[]       
         swal({ text: 'Consultando ots trabajadas ...', allowOutsideClick: false });
         swal.showLoading();
         let params =  {
             "Fecha_fin":"25/03/2021",
             "Fecha_inicio":"25/02/2021",
             "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
             "Id_turno":"1,2,3",
             "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
             "IDSDESPAHCO":"64"
         }
         mainDespachoService.consultarOtsTrabajadasDespacho(params).then(function success(response) {
             console.log(response);
             $scope.listadoOtsTrabajadasModal=JSONOtsTrabajadas     
             swal.close()
             $("#modalOtsTrabajadas").modal('show')
 
             if (response.data !== undefined) {
                 if (response.data.respuesta) {
                     if (response.data.result.result === '0') {
                        console.log("############## ots trabajadas")
                        //$scope.listadoOtsPendientes=otspendientes                         
                     }
                 }
             }
         }).catch(err => handleError(err))**/

    }
    abrirUbicacionOperario = function (idTecnico, nombreTecnico) {
        /**console.log("idTecnico"+idTecnico)
        console.log("nombreTecnico"+nombreTecnico)
        let objectParams={
            idTecnico:idTecnico,
            nombreTecnico:nombreTecnico
        }
        $scope.consultarUbicacionOperario(objectParams)**/
    }
    abrirInformacionVehiculo = function (idTecnico) {
        /**
         console.log("function 14"+idTecnico)
         $scope.vehiculoOperario={}
         let params =  {
             "Fecha_fin":"25/03/2021",
             "Fecha_inicio":"25/02/2021",
             "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
             "Id_turno":"1,2,3",
             "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
             "IDSDESPAHCO":"64"
         }
         swal({ text: 'Consultando datos ...', allowOutsideClick: false });
         swal.showLoading();
         mainDespachoService.consultarVehiculoOperario(params).then(function success(response) {
             
             $scope.vehiculoOperario=JSONVehiculoOperario.Vehicle
             $("#modalVehiculoOperario").modal('show')
             console.log(response);
             swal.close()
             if (response.data !== undefined) {
                 if (response.data.respuesta) {
                     if (response.data.result.result === '0') {
                        console.log("############## catalogo")
                        //$scope.listadoOtsPendientes=otspendientes                         
                     }
                 }
             }
         }).catch(err => handleError(err))**/
    }
    abrirInformacionMateriales = function (idTecnico) {
        /**
        console.log("function 15"+idTecnico)

        let params =  {
            "Fecha_fin":"25/03/2021",
            "Fecha_inicio":"25/02/2021",
            "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno":"1,2,3",
            "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO":"64"
        }

        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultandoMaterialesPI(params).then(function success(response) {
            $scope.objectMateriales=JSONArraysMateriales
            swal.close()
            $("#modalMaterialesOperario").modal('show')
            console.log(response);
                    
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                       console.log("############## catalogo")
                       //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))**/
    }
    $scope.consultarCatalogoEstatusTecnico = function () {
        let params = {
            "Fecha_fin": "25/03/2021",
            "Fecha_inicio": "25/02/2021",
            "Id_subIntervencion": "48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno": "1,2,3",
            "Id_cluster": "176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO": "64"
        }
        mainDespachoService.consultarCatalogoEstatusTecnico(params).then(function success(response) {
            console.log(response);
            $scope.listadoEstatusTecnico = JSONEstatusTecnico
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
    $scope.cambiarEstatusOperario = function () {
        console.log("Entra a cambiar estatus:")
        var n = $('#id-status-tecnico').val();
        console.log(n)
        if ($scope.elementEstatusTecnico.status == null || !$scope.elementEstatusTecnico.comentario) {
            toastr.warning('Selecciona estatus y completa campo de comentario.... ')
            return false
        }
        let params = {

            "idUsuario": $scope.elementEstatusTecnico.tecnico.idTecnico,
            "idEstatusUsuario": $scope.elementEstatusTecnico.status.idEstatus
        }

        swal({ text: 'Cambiando estatus ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.cambiarEstatusTecnicoPI(params).then(function success(response) {

            $("#modalStatusOperario").modal('hide')
            console.log("Estatus: ", response.status);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.mensaje === '0') {
                        console.log("############## catalogo")
                        //$scope.listadoOtsPendientes=otspendientes 
                        toastr.success(response.data.result.description);
                    } else {
                        toastr.warning(response.data.result.description);
                    }
                } else {
                    toastr.warning(response.data.resultDescripcionn);
                }
            }
            swal.close()
        }).catch(err => handleError(err))
    }

    $scope.confirmarDesconfirmarOt = function () {
        console.log($scope.objConfirmaDesc)
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.cambiarEstatusOperarioPI(params).then(function success(response) {
            $scope.banderaRegresarCheckbox = true;
            $("#modalConfirmaDesconfirma").modal('hide')
            console.log(response);
            swal.close()
            toastr.success('Cambio de estatus correcto');
            $scope.refrescarBusqueda()
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

    $scope.abrirModalDetalleIconografia = function () {
        /**     
        if( $scope.listadoIconografia ){
            $("#modalIconografiaDespacho").modal('show')       
        }else{
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            mainDespachoService.consultarPaletaColoresService().then(function success(response) {
                swal.close()
                $("#modalIconografiaDespacho").modal('show')  
                $scope.listadoIconografia=paletaColors.result.Colores                         
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result.result === '0') {
                           console.log("############## catalogo")**/
        //$scope.listadoOtsPendientes=otspendientes 
        /**   
     }
 }
}
}).catch(err => handleError(err))
}
**/

    }
    $scope.abrirModalReAsignacion = function (otinfo, data_tecnico) {
        $scope.reAsignacionObject = {
            'otInfo': otinfo,
            'tecnicoInfo': data_tecnico,
            'comentario': ''
        }
        $("#modalReAsignacionOrdenTrabajo").modal('show')
        $scope.$digest()
    }
    $scope.abrirModalAsignacion = function (otinfo, data_tecnico) {
        $scope.asignacionObject = {
            'otInfo': otinfo,
            'tecnicoInfo': data_tecnico,
            'comentario': ''
        }
        $('#modalAsignacionOrdenTrabajo').modal('show');
        $scope.$digest()
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
                    if (response.data.result.result === '0') {
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

    abrirModalFoto = function (nombre, url, usuario, telefono, centro, estatus) {
        if (url == undefined || url == "") {
            url = "./resources/img/plantainterna/despacho/tecnicootasignada.png";
        }

        $("#num_emp").html("<span><strong>N&Uacute;M. EMPLEADO: </strong>" + usuario + "</span>");
        $("#tel_emp").html("<span><strong>TEL&Eacute;FONO: </strong>" + telefono + "</span>");
        $("#full_name").html("<span><strong>" + nombre + "</strong></span>");
        $("#centro").html("<span><strong>" + centro + "</strong></span>");
        $("#estatus").html("<span><strong>" + estatus + "</strong></span>");
        $("#img_emp").attr("src", url);
        $("#modalFotoUsuario").modal('show');
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
        $scope.listadoTecnicosOtsModal = [];
        
        angular.forEach($scope.listadoTecnicosGeneral, function (tecnico, index) {
            if (tecnico.listadoOts.length) {
                $scope.listadoTecnicosOtsModal.push(tecnico);
            }
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
        if (listOt.length) {
            $scope.consultarDetalleMapa(listOt);
            return true;
        } else {
            return false;
        }
    }

    abrirModalVistaMapa = function () {
        if ($scope.getListOt()) {
            $(".content-tecnico").removeClass("selected-tecnico");
            $("#modalVistaMapa").modal('show');
        } else {
            swal({ text: 'No hay OTs disponibles para mostrar en mapa', allowOutsideClick: true });
        }
    }


    detalleTecnicoRuta = function (id) {
        $(".content-tecnico").removeClass("selected-tecnico");
        $("#" + id).addClass("selected-tecnico");

        $scope.getListOt(id);
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
                        fechaHoraAgenda: $scope.elementCalendarizado.fechaCalendarizado
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
                        fechaHoraAgenda: $scope.elementCalendarizado.fechaCalendarizado
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
                        fechaHoraAgenda: $scope.elementReagendaOT.fechaReagendamiento
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
                        fechaHoraAgenda: $scope.elementReagendaOT.fechaReagendamiento
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
        if($scope.filtrosGeneral.tipoOrdenes){
            $scope.seleccionarTodos($scope.filtrosGeneral.tipoOrdenes);
        }
        $scope.$apply();
        $("#idot-reporte").val('');
        $("#idos-reporte").val('');
        $("#cuenta-reporte").val('');
        $('#filtro_fecha_inicio_reporte').datepicker('update',   moment(FECHA_HOY_DATE).toDate() );
        $('#filtro_fecha_fin_reporte').datepicker('update',   moment(FECHA_HOY_DATE).toDate() );
        $("#modalReporte").modal('show');
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