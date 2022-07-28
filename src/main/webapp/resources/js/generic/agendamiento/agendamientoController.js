app.agendamientoController = function ($scope, agendamientoService, $q) {
    app.agendamientoCalendar($scope, agendamientoService);
    app.agendamientoMap($scope, agendamientoService);

    
    $scope.vistaAgendamiento = false;

    mostrarAgendamiento = function(param) {
        $scope.clearMarkersAgendamiento();
        $scope.clearFormAgendamiento();
        
        /*
        $scope.listaIdGeografias = [];
        var geografias = $("#geografiaPendientesAgendar").jstree("get_selected", true);
        angular.forEach(geografias,(geo,index) => {
			$scope.listaIdGeografias.push(geo.id);				
		});
        */
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $q.all([
            agendamientoService.consultarInfoSitioInstalacion(param)
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
        $scope.vistaAgendamiento = true;
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
                subtipoIntervencion: $scope.subtipoIntervencionDisponibilidad != undefined ? $scope.subtipoIntervencionDisponibilidad : 106,
                propietario: "1",
                unidadNegocio: "1"
        };
    	$q.all([
            agendamientoService.consultaDisponibilidadAgendamiento(dataDisp)
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

    $scope.flagConsultandoFactibilidad = false;
    $scope.flagRespuestaFactibilidad = 'noprocess';
    $scope.consultarFactibilidadAgendamiento = function (unidadNegocio, latitud, longitud) {
        $scope.flagConsultandoFactibilidad = true;
        let params = {
            latitud: parseFloat( latitud ),
            longitud: parseFloat( longitud )
        }

        agendamientoService.consultaFactibilidadAgendamiento(params).then(function success(response) {
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

    $scope.cerrarAgendamiento = function() {
        $scope.vistaAgendamiento = false;
    }

    $scope.clearFormAgendamiento = function () {
        $("#opcion-calendarioAgendamiento-tab").trigger("click");
        $("#contactoAgendamiento").val('');
        $("#entreCallesAgendamiento").val('');
        $("#referenciasAgendamiento").val('');
        $("#comentariosAgendamiento").val('');
    }

}