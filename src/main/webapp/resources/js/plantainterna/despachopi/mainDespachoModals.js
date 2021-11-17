var tableMaterialesDespacho;
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
                "info": false,
                "autoWidth": true,
                "data":arrayOts, 
                "language": idioma_espanol_not_font,
                "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
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

    abrirInformacionMateriales = function (nEmpleado) {
        let tecnicoTemp=angular.copy($scope.listadoTecnicosGeneral.find(e=>{return e.numeroEmpleado===nEmpleado}) )
        console.log("function 15"+nEmpleado)
        let params =  {
            numEmpleado: nEmpleado,
            centro:'NA',
            almacen:'NA',
           // idUsuario:tecnicoTemp.idTecnico ,  
            idUsuario:233 ,
            idFlujo:1        
        }          
        $scope.tecnicoConsultaMateriales=tecnicoTemp
        $scope.$apply()

      /**  **/ 
        if ( tableMaterialesDespacho ) 
            tableMaterialesDespacho .destroy();
      
        swal.showLoading();
        
        $q.all([
            mainDespachoService.consultaMaterialesPorAlmacenUserCentro(params),
            mainDespachoService.consultandoMaterialesPI(params)
        ]).then(function (results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        $("#modalMaterialesOperario").modal('show')        
                        let tempArrayResult=results[0].data.result.materiales
                        $("#table-materiales-temp tbody").empty()
                        angular.forEach(tempArrayResult,function(elem,index){
                            $("#table-materiales-temp tbody").append(`
                                <tr>
                                    <td >${elem.sku} </td>
                                    <td >${elem.descripcion} </td>
                                    <td >${elem.lote} </td>
                                    <td >${elem.cantidad} </td>
                                    <td >${elem.unidadMedida} </td>
                                    <td >${elem.precio} </td>
                                    <td >${elem.familia} </td>
                                    <td >${elem.categoria} </td>
                                    <td >${elem.grupo} </td>
                                </tr>
                            `)
                        })
                        $scope.inicializarTableMateriales()
                    } else {
                        toastr.info('No se encontraron datos');
                    }
                } else {
                    toastr.info(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
            /**
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        
                    } else {
                        toastr.info('No se encontraron datos');
                    }
                } else {
                    toastr.info(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }**/
            swal.close()
        }).catch(err => handleError(err));



        /**
        mainDespachoService.consultaMaterialesPorAlmacenUserCentro(params).then(function success(response) {
           console.log(response)
           if (response.data.respuesta) {
               if (response.data.result) {
                    swal.close()    
                    $("#modalMaterialesOperario").modal('show')        
                    let tempArrayResult=response.data.result.materiales
                    tempArrayResult= tempArrayResult.splice(0,5)
                    $("#table-materiales-temp tbody").empty()
                    angular.forEach(tempArrayResult,function(elem,index){
                        $("#table-materiales-temp tbody").append(`
                            <tr>
                                <td >${elem.sku} </td>
                                <td >${elem.descripcion} </td>
                                <td >${elem.lote} </td>
                                <td >${elem.cantidad} </td>
                                <td >${elem.unidadMedida} </td>
                                <td >${elem.precio} </td>
                                <td >${elem.familia} </td>
                                <td >${elem.categoria} </td>
                                <td >${elem.grupo} </td>
                            </tr>
                        `)
                    })
                    
               } else {
                    swal.close()
                    mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n.')
               }
           } else {
                swal.close()
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
           }
        }).catch(err => handleError(err))

        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultandoMaterialesPI(params).then(function success(response) {
           console.log(response)
           if (response.data.respuesta) {
               if (response.data.result) {
                    $("#modalMaterialesOperario").modal('show')
               } else {
                   swal.close()
                   mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n.')
               }
           } else {
               swal.close()
               mostrarMensajeErrorAlert(response.data.resultDescripcion)
           }
        }).catch(err => handleError(err)) **/
    }

    $scope.inicializarTableMateriales=function(){           
        tableMaterialesDespacho=$('#table-materiales-temp').DataTable({
            "processing": false,
			"ordering": false,
			"serverSide": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"columns": [null, null, null, null, null, null, null, null,null],
            "language":idioma_espanol_not_font
        });        
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
            "idEstatusUsuario": $scope.elementEstatusTecnico.status.id
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
            $scope.seleccionarTodos($scope.filtrosGeneral.tipoOrdenes);
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
        
        setTimeout(function(){
            consultarReporteDiario();
        }, 1000);
        
        $("#modalReporte").modal('show');
    }

    $('#modalReporte').on("hidden.bs.modal", function () {
        if($scope.filtrosGeneral.tipoOrdenes){
            $scope.seleccionarTodos($scope.filtrosGeneral.tipoOrdenes);
        }

        if($scope.filtrosGeneral.estatusdisponibles){
            $scope.seleccionarTodos($scope.filtrosGeneral.estatusdisponibles);
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
            let params = {
               folio: $scope.detalleOtPendienteSelected.folioOrden
               //folio: 'OS-7640234'folioOrden
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