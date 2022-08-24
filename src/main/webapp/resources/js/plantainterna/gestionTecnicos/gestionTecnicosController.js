var app = angular.module('gestionTecnicosApp', []);
var objectTempAccion;

app.controller('gestionTecnicosController', ['$scope', '$q', 'gestionTecnicosService', 'genericService', function ($scope, $q, gestionTecnicosService, genericService) {

    let calendar_gestionTecnicos;
    let tableJustificaciones;
    let tableOtsTrabajadas;
    let tableDiasTrabajados;
    let tableArchivosJustificacion;
    let tableDetalleTrabajo;
    let eventosDisponibilidad = [];
    let tableDetalleOtTrabajada;
    $scope.listTecnicos = [];
    $scope.listAuxiliares = [];
    $scope.listMotivosJustificaciones = [];
    $scope.calendarTec;
    $scope.isEdit;
    $scope.archivoAdd;
    $scope.archivoUpd;
    $scope.idTecnico = '';
    $scope.tipoConsulta = '';
    $scope.isDetalle = false;
    $scope.isJustificacion = false;
    $scope.isTecnicoSelected = false;
    $scope.isDetalleMesTecnico = false;
    $scope.isCargaArchivos = false;
    $scope.flagCargandoCalendar = true;
    $scope.flagProcesoConsulta = false;
    $scope.tecnicoDisp = {};
    $scope.auxDisp = {};
    $scope.justificacionDetalle = {};
    $scope.listMotivosJustificacion = []
    $scope.comentariosJustificacion = [];
    $scope.listArchivosJustificacion = [];
    $scope.listDetalleTrabajo = [];
    $scope.listDiasTrabajados = [];
    $scope.listOtsTrabajadas = [];
    $scope.listJustificaciones = [];
    $scope.resultDisponibilidad = {};
    $scope.justificacionA = {};
    $scope.justificacionD = {};
    $scope.justificacionE = {};
    $scope.archivosA = {};
    $scope.nombreFile = '';
    $scope.nombreFileAdd = '';
    $scope.nombreFileUpd = '';
    $scope.nombreFileDel = '';
    $scope.anioActual = new Date().getFullYear();
    $scope.rutaNombreEvidenciasJustificaciones = "justificaciones/mx/"+$scope.anioActual+"/{idJustificaciones}/{idJustificaciones}_";
    $scope.detalleMesTecnico = {};
    $scope.fechaInicioMes = "";
	$scope.fechaFinMes = "";
    $scope.dataWindow = window.usuario ?  {token: window.token, usuario: window.usuario}:null;

    // LLAVES Y PERMISOS
//    $scope.configPermisoAccionConsultaTecnicos = false;
//	$scope.configPermisoAccionConsultaAuxiliares = false;
	$scope.configPermisoAccionCreaJustificacion = false;
	$scope.configPermisoAccionEditaJustificacion = false;
	$scope.configPermisoAccionEliminaJustificacion = false;
	$scope.configPermisoAccionCreaEvidenciaJustificacion = false;
	$scope.configPermisoAccionEliminaEvidenciaJustificacion = false;
	$scope.configPermisoAccionCreaComentarioJustificacion = false;

    $scope.convertDate = function (fecha) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(fecha)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    $scope.initCalendario = function (mes, anio) {
        let fechaCal;
        if (mes === undefined && anio === undefined) {
            fechaCal = new Date().toISOString().split('T')[0];
        } else {
            fechaCal = anio + '-' + mes + '-' + '01';
        }
        
        calendar_gestionTecnicos = document.getElementById('calendar_gestionTecnicos');
        $scope.calendarTec = new FullCalendar.Calendar(calendar_gestionTecnicos, {
            height: 550,
            locale: 'es',
            displayEventTime: true,
            selectable: false,
            initialDate: fechaCal,
            editable: false,
            eventDurationEditable: false,
            dayMaxEventRows: 3,
            events: eventosDisponibilidad,
            moreLinkContent: function (args) {
                return '+' + args.num + ' m\u00E1s';
            },
            headerToolbar: {
                start: "",
                center: "title",
                end: "prev today next"
            },
            eventContent: function (eventObj) {
                var customHtml = '';
                if (eventObj.event._def.extendedProps.tipoevento === 'horaingreso') {
                    customHtml += "<div class='fc-event-title'><span class='ingreso-icon fa fa-arrow-right'></span><span> " + eventObj.event.title + "</span></div>";
                    return { html: customHtml }
                }
                if (eventObj.event._def.extendedProps.tipoevento === 'horasalida') {
                    customHtml += "<div class='fc-event-title'><span class='salida-icon fa fa-arrow-left'></span><span> " + eventObj.event.title + "</span></div>";
                    return { html: customHtml }
                }
            },
            eventClick: function (info, jsEvent, view) {
            	let fechaConsultarOrdenesDiaEvent = moment(info.event.start).format('DD-MM-YYYY'); 
                $scope.consultarDetalleTrabajo(fechaConsultarOrdenesDiaEvent);
            },
            dateClick: function (info) {
                let idJust;
                $scope.$apply();
                $scope.fechaDiaJust = info.dateStr;
                let FechaJustMod = $scope.fechaDiaJust.split('-');
                let fechaMod = FechaJustMod[2] + '/' + FechaJustMod[1] + '/' + FechaJustMod[0];
                let fechaConsultarOrdenesDia = FechaJustMod[2] + '-' + FechaJustMod[1] + '-' + FechaJustMod[0];
                if ($("#calendar_gestionTecnicos td[data-date=" + $scope.fechaDiaJust + "] div.actividades-contadorac-gris").length > 0) {
                    idJust = ($("#calendar_gestionTecnicos td[data-date=" + $scope.fechaDiaJust + "] div.actividades-contadorac-gris").data('value'))
                    $scope.consultarDetalleJustificacion(idJust);
                } else if ($("#calendar_gestionTecnicos td[data-date=" + $scope.fechaDiaJust + "] div.actividades-contadorac-verde").length > 0) {
                    $scope.consultarDetalleTrabajo(fechaConsultarOrdenesDia);
                } else {
                	if($scope.configPermisoAccionCreaJustificacion){
                		$scope.isJustificacion = false;
                        $scope.openModalAgregarJustificacion(info.date);
                        $scope.$apply();
                	}else{
                		mostrarMensajeWarningValidacion("No cuentas con el permiso de crear justificaciones.");
                	}
                }
            },
            datesSet: function () {
                setTimeout(function () {
                	verCalendario();
                }, 1000);
            }
        });

        if (eventosDisponibilidad.length > 0) {
        	setTimeout(function () {
                eventosDisponibilidad.forEach(event => {
                    if (event.tipo === 'TRABAJADO') {
                        if (!$('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top div').hasClass('actividades-contadorac-verde')) {
                            $('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top').append('<div class="actividades-contadorac-verde" data-value="' + event.objetodisponibilidad.idJustificacion + '">&nbsp;</div> ')
                        }
                    } else if (event.tipo === 'DIA JUSTIFICADO') {
                        $('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top').append('<div class="actividades-contadorac-gris" data-value="' + event.objetodisponibilidad.idJustificacion + '">&nbsp;</div> ')
                    }
                });
        	}, 0500);
        }
        $scope.calendarTec.render();
    }
    
    verCalendario = function() {
    	$("#calendar_gestionTecnicos").css('visibility', 'visible');
    	$(".tecnicosDiv").removeClass("tecnicosBloqueados");
    	$scope.flagCargandoCalendar = false;
    	$scope.flagProcesoConsulta = false;
    	$scope.calendarTec.render();
    	$scope.$apply();
	}

    $scope.consultarTecnicos = function () {
    	$("#calendar_gestionTecnicos").css('visibility', 'hidden');
    	eventosDisponibilidad = [];
    	if ($scope.calendarTec) {
            $scope.calendarTec.destroy();
        }
    	$scope.initCalendario();
    	$scope.flagCargandoCalendar = true;
    	$scope.limpiarDetalleJustificacion();
    	$scope.changeView();
    	$scope.isTecnicoSelected = false;
    	$.each($scope.listTecnicos, function (i, elemento) {
            $("#us-"+elemento.idTecnico).css("background-color", "white");
        });
    	
    	if($scope.listTecnicos.length < 1){
    		if (!swal.isVisible()) {
    			swal({ text: 'Cargando datos ...', allowOutsideClick: false });
                swal.showLoading();
    		}
            $q.all([
            	gestionTecnicosService.consultaTecnicosPorDespacho($scope.dataWindow),
            	gestionTecnicosService.consultaMotivosJustificaciones()
            ]).then(function (results) {
            	if (results[0].data !== undefined) {
	            	if(results[0].data.respuesta){
	            		if(results[0].data.result !== null){
	            			if(results[0].data.result.tecnicos.length > 0){
	            				$scope.listTecnicos = results[0].data.result.tecnicos;
		            		}else{
		            			mostrarMensajeInformativo("¡Actualmente no existen técnicos asignados!");
		            		}
	            		}else{
	            			mostrarMensajeInformativo("¡Actualmente no existen técnicos asignados!");
	            		}
	            	}else{
	            		mostrarMensajeInformativo(results[0].data.resultDescripcion);
	            	}
            	}else{
            		mostrarMensajeWarningValidacion("Error interno en el servidor.");
            	}
            	
            	if (results[1].data !== undefined) {
	            	if(results[1].data.respuesta){
	            		if(results[1].data.result !== null){
	            			if(results[1].data.result.motivos.length > 0){
	            				$scope.listMotivosJustificaciones = results[1].data.result.motivos;
		            		}else{
		            			mostrarMensajeInformativo("¡Actualmente no existen motivos!");
		            		}
	            		}else{
	            			mostrarMensajeInformativo("¡Actualmente no existen motivos!");
	            		}
	            	}else{
	            		mostrarMensajeInformativo(results[1].data.resultDescripcion);
	            	}
            	}else{
            		mostrarMensajeWarningValidacion("Error interno en el servidor.");
            	}
            	if($scope.listTecnicos.length > 0){
            		setTimeout(function () {
                		$("#us-"+$scope.listTecnicos[0].idTecnico).trigger('click');
    	    		}, 500);
            	}
            });
    	}
    }

    $scope.initGestionTecnicos = function () {
    	
    	let params ={
				moduloAccionesUsuario: 'moduloGestionTecnicos'
	    };		
        $q.all([
            genericService.consultarConfiguracionDespachoDespacho(params)
        ]).then(function(results) {
            if (results[0].data !== undefined) {
                if(results[0].data.respuesta ){
                    if(results[0].data.result ){
						let resultConf= results[0].data.result;
						if( resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves){
							let  llavesResult = resultConf.MODULO_ACCIONES_USUARIO.llaves;
							validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                			validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
						}
						
						if( resultConf != undefined && resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.permisos && resultConf.MODULO_ACCIONES_USUARIO.permisos != ""){
							$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO.permisos;
//							$scope.configPermisoAccionConsultaTecnicos = ($scope.permisosConfigUser.filter(e => {return e.clave == "accionConsultaTecnicos"})[0] != undefined);
//							$scope.configPermisoAccionConsultaAuxiliares = ($scope.permisosConfigUser.filter(e => {return e.clave == "accionConsultaAuxiliares"})[0] != undefined);
							$scope.configPermisoAccionCreaJustificacion = ($scope.permisosConfigUser.filter(e => {return e.clave == "accionCreaJustificacion"})[0] != undefined);
							$scope.configPermisoAccionEditaJustificacion = ($scope.permisosConfigUser.filter(e => {return e.clave == "accionEditaJustificacion"})[0] != undefined);
							$scope.configPermisoAccionEliminaJustificacion = ($scope.permisosConfigUser.filter(e => {return e.clave == "accionEliminaJustificacion"})[0] != undefined);
							$scope.configPermisoAccionCreaEvidenciaJustificacion = ($scope.permisosConfigUser.filter(e => {return e.clave == "accionCreaEvidenciaJustificacion"})[0] != undefined);
							$scope.configPermisoAccionEliminaEvidenciaJustificacion = ($scope.permisosConfigUser.filter(e => {return e.clave == "accionEliminaEvidenciaJustificacion"})[0] != undefined);
							$scope.configPermisoAccionCreaComentarioJustificacion = ($scope.permisosConfigUser.filter(e => {return e.clave == "accionCreaComentarioJustificacion"})[0] != undefined);
							objectTempAccion = new GenericAccionRealizada("" + resultConf.MODULO_ACCIONES_USUARIO.id, 'TOP_RIGHT');
							objectTempAccion.inicializarBotonAccionesRecientes();
						}
						
						// PERMMISOS TRUE SETTEADOS
//						$scope.configPermisoAccionConsultaTecnicos = true;
//						$scope.configPermisoAccionCreaJustificacion = true;
//						$scope.configPermisoAccionEditaJustificacion = true;
//						$scope.configPermisoAccionEliminaJustificacion = true;
//						$scope.configPermisoAccionCreaEvidenciaJustificacion = true;
//						$scope.configPermisoAccionEliminaEvidenciaJustificacion = true;
//						$scope.configPermisoAccionCreaComentarioJustificacion = true;
						// FIN PERMMISOS TRUE SETTEADOS
						
						$scope.initCalendario();
				        $scope.consultarTecnicos();
						
                    }else{                      
                        toastr.warning( 'No se encontraron datos para la geografia' );                
                    }
                }else{
                    toastr.warning( results[0].data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }           

        }).catch(err => handleError(err));
    	
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
        
        $('.datepicker').datepicker('update', new Date());
        
        tableDiasTrabajados = $('#tableDiasTrabajados').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font

        });
        
        tableOtsTrabajadas = $('#tableOtsTrabajadas').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font
        });
        
        tableDetalleOtTrabajada = $('#tableDetalleOtTrabajada').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "aoColumnDefs": [
                { "aTargets": [9], "bSortable": false }
            ]
        });
        
        tableJustificaciones = $('#tableJustificaciones').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font
        });
        
        tableArchivosJustificacion = $('#tableArchivosJustificacion').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "autoWidth": false,
            "language": idioma_espanol_not_font

        });
        
        tableDetalleTrabajo = $('#tableDetalleTrabajo').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "autoWidth": false,
            "language": idioma_espanol_not_font
        });
    }

    $scope.iniciarNextPrev = function () {
        document.querySelector('button.fc-prev-button').addEventListener('click', function () {
            if ($scope.tipoConsulta === 'TEC') {
                $scope.consultarDisponibilidadTecnico();
            } else {
                $scope.consultarDisponibilidadAux();
            }

        });
        document.querySelector('button.fc-next-button').addEventListener('click', function () {
            if ($scope.tipoConsulta === 'TEC') {
                $scope.consultarDisponibilidadTecnico();
            } else {
                $scope.consultarDisponibilidadAux();
            }
        });
    }

    $scope.pintarDisponibilidad = function (listDisponibilidad, listOts, mes, anio) {
        if ($scope.calendarTec) {
            $scope.calendarTec.destroy();
        }
        eventosDisponibilidad = [];
        let eventDisponibilidad = {};
        if (listDisponibilidad !== undefined) {
            var index = 0;
            listDisponibilidad.forEach(disponibilidad => {
                let newFecha;
                let fechaInicio;
                let fechaN;
                let fetchtl;
                let fechaFin;
                let newFechaFin;
                if (disponibilidad.fecha.includes('/')) {
                    fechaInicio = disponibilidad.fecha.split('/');
                    fechaN = fechaInicio[1] + '/' + fechaInicio[0] + '/' + fechaInicio[2];
                    newFecha = new Date(fechaN);
                } else {
                    fechaInicio = disponibilidad.fecha.split('-');
                    fechaN = fechaInicio[1] + '-' + fechaInicio[0] + '-' + fechaInicio[2];
                    newFecha = new Date(fechaN);
                    fechaFin = disponibilidad.fechaFin.split('-');
                    newFechaFin = new Date(fechaFin[1] + '-' + fechaFin[0] + '-' + fechaFin[2]);
                }
                let arrayValidacion = eventosDisponibilidad.filter(function (element) { return $scope.convertDate(element.start) === $scope.convertDate(newFecha) });
                if (arrayValidacion.length === 0) {
                    if (disponibilidad.idJustificacion === undefined) {
                        if (disponibilidad.disponible !== undefined) {
                            eventDisponibilidad = {
                                title: "Tiempo Disponible: " + disponibilidad.disponible,
                                tipo: 'TIEMPONOTRABAJANO',
                                start: newFecha,
                                end: newFecha,
                                tipoevento: 'tiemponotrabajando',
                                usuario: $scope.idTecnico,
                                objetodisponibilidad: disponibilidad
                            }
                            eventosDisponibilidad.push(eventDisponibilidad);
                        }
                        if (disponibilidad.enTrabajo !== undefined) {
                            eventDisponibilidad = {
                                title: "Tiempo Trabajado: " + (disponibilidad.enTrabajo == null ? 'sin información' : disponibilidad.enTrabajo),
                                tipo: 'TIEMPOTRABAJANO',
                                start: newFecha,
                                end: newFecha,
                                tipoevento: 'tiempotrabajando',
                                usuario: $scope.idTecnico,
                                objetodisponibilidad: disponibilidad
                            }
                            eventosDisponibilidad.push(eventDisponibilidad);
                        }
                        if (disponibilidad.horaFin !== undefined) {
                            let horaFin = disponibilidad.horaFin !== null ? disponibilidad.horaFin.split(' ') : [];
                            eventDisponibilidad = {
                                height: 800,
                                title: disponibilidad.horaFin == 'SIN INFORMACION' || disponibilidad.horaFin == null ? 'Sin información' : moment(horaFin[0], "hh::mm").format('LT'),
                                tipo: 'TRABAJADO',
                                start: newFecha,
                                end: newFecha,
                                tipoevento: 'horasalida',
                                color: '#6da4ff',
                                textColor: 'white',
                                id: index,
                                usuario: $scope.idTecnico,
                                objetodisponibilidad: disponibilidad,
                                classNames: 'evento-calendar'
                            }
                            eventosDisponibilidad.push(eventDisponibilidad);
                        }
                        if (disponibilidad.horaInicio !== undefined) {
                            let horaInicio = disponibilidad.horaInicio !== null ? disponibilidad.horaInicio.split(' ') : [];
                            eventDisponibilidad = {
                                title: disponibilidad.horaInicio == 'SIN INFORMACION' || disponibilidad.horaInicio == null ? 'Sin información' : moment(horaInicio[0], "hh::mm").format('LT'),
                                tipo: 'TRABAJADO',
                                start: newFecha,
                                end: newFecha,
                                tipoevento: 'horaingreso',
                                usuario: $scope.idTecnico,
                                objetodisponibilidad: disponibilidad
                            }
                            eventosDisponibilidad.push(eventDisponibilidad);
                        }
                        
                        if (disponibilidad.cantidad !== undefined) {
                            eventDisponibilidad = {
                                title: "Ots Atendidas: " + (disponibilidad.cantidad == null ? 'sin información' : disponibilidad.cantidad),
                                tipo: 'TIEMPONOTRABAJANO',
                                start: newFecha,
                                end: newFecha,
                                tipoevento: 'tiempotrabajando',
                                usuario: $scope.idTecnico,
                                objetodisponibilidad: disponibilidad
                            }
                            eventosDisponibilidad.push(eventDisponibilidad);
                        }
                        
                    } else {
                    	var valFechaUnica = true;
                    	do {
                    		eventDisponibilidad = {
                                    title: "prueba",
                                    tipo: 'DIA JUSTIFICADO',
                                    start: newFecha,
                                    end: newFecha,
                                    id: disponibilidad.idJustificacion,
                                    className: 'diaNoTrabajado',
                                    usuario: $scope.idTecnico,
                                    objetodisponibilidad: disponibilidad
                    		}
                    		eventosDisponibilidad.push(eventDisponibilidad);
                    		if(newFecha.getDate() == newFechaFin.getDate() && (newFecha.getMonth() + 1) == (newFechaFin.getMonth() + 1)){
                    			valFechaUnica = true;
                    		}else{
                    			var fechaEventRepit = new Date(newFecha);
                        		fechaEventRepit = fechaEventRepit.setDate(fechaEventRepit.getDate()+1);
                        		newFecha = new Date(fechaEventRepit);
                    			valFechaUnica = false;
                    		}
                    	} while (!valFechaUnica);
                    }
                }
            });
          
            $scope.initCalendario(mes, anio);
            document.querySelector('button.fc-prev-button').addEventListener('click', function () {
                if ($scope.tipoConsulta === 'TEC') {
                    $scope.consultarDisponibilidadTecnico();
                } else {
                    $scope.consultarDisponibilidadAux();
                }
            });
            document.querySelector('button.fc-next-button').addEventListener('click', function () {
                if ($scope.tipoConsulta === 'TEC') {
                    $scope.consultarDisponibilidadTecnico();
                } else {
                    $scope.consultarDisponibilidadAux();
                }
            });
        } else {
            $scope.initCalendario(mes, anio);
            $scope.iniciarNextPrev();
            mostrarMensajeWarningValidacion("No se encontraron registros sobre el t\u00E9cnico");
        }
    }

    $scope.getMes = function (mes) {
        switch (mes) {
            case 'ENERO':
                return '01';
            case 'FEBRERO':
                return '02';
            case 'MARZO':
                return '03';
            case 'ABRIL':
                return '04';
            case 'MAYO':
                return '05';
            case 'JUNIO':
                return '06';
            case 'JULIO':
                return '07';
            case 'AGOSTO':
                return '08';
            case 'SEPTIEMBRE':
                return '09';
            case 'OCTUBRE':
                return '10';
            case 'NOVIEMBRE':
                return '11';
            case 'DICIEMBRE':
                return '12';
        }
    }

    $scope.consultarDisponibilidadTecnico = function (tecnico) {
    	if(!$scope.flagProcesoConsulta){
    		$("#calendar_gestionTecnicos").css('visibility', 'hidden');
        	$(".tecnicosDiv").addClass("tecnicosBloqueados");
        	$scope.flagCargandoCalendar = true;
        	$scope.flagProcesoConsulta = true;
            
        	if (!swal.isVisible()) {
    			swal({ text: 'Cargando datos ...', allowOutsideClick: false });
                swal.showLoading();
    		}
            
            $scope.listJustificaciones = [];
            $scope.limpiarDetalleJustificacion();
            
            if ($scope.isDetalleMesTecnico) {
                $scope.isDetalleMesTecnico = false;
            }
            
            $scope.tipoConsulta = 'TEC';

            $.each($scope.listTecnicos, function (i, elemento) {
                $("#us-"+elemento.idTecnico).css("background-color", "white");
            });
            $.each($scope.listAuxiliares, function (i, elemento) {
                $("#us-"+elemento.idAuxiliar).css("background-color", "white");
            });
            
            if (tecnico !== undefined) {
            	$scope.tecnicoDisp = {};
            	$scope.tecnicoDisp = tecnico;
            	
            	if($scope.tecnicoDisp.idTecnico !== undefined){
            		$scope.idTecnico = tecnico.idTecnico;
                }
                
                if($scope.tecnicoDisp.idAuxiliar !== undefined){
                	$scope.idTecnico = tecnico.idAuxiliar;
                }
            }
            
            $("#us-" + $scope.idTecnico).removeClass("tecnicosBloqueados");
            $("#us-" + $scope.idTecnico).css("background-color", "#DCDEDC");
            
            const fechaActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
            const fechaArray = fechaActual.split(" ");
            const mes = $scope.getMes(fechaArray[0].toUpperCase());
            
            $scope.fechaInicioMes = $scope.calendarTec.view.currentStart;
            $scope.fechaFinMes = $scope.calendarTec.view.currentEnd;
            $scope.fechaFinMes.setDate($scope.fechaFinMes.getDate()-1);
            
            $scope.fechaInicioMes = moment($scope.fechaInicioMes).format('DD-MM-YYYY');
            $scope.fechaFinMes = moment($scope.fechaFinMes).format('DD-MM-YYYY');

            let paramsTc = {
            		"idTecnico": $scope.idTecnico, 
            		"fechaInicio": $scope.fechaInicioMes, 
            		"fechaFin":$scope.fechaFinMes
            };
            let paramsJustificacionesTec = {
            		"idUsuario": $scope.idTecnico,
            		"fechaInicio": moment($scope.fechaInicioMes, "DD/MM/YYYY").format("YYYY-MM-DD"),
            		"fechaFin": moment($scope.fechaFinMes, "DD/MM/YYYY").format("YYYY-MM-DD")
            };
            $scope.changeView();
            
        	$q.all([
        		gestionTecnicosService.consultaDisponibilidadTecnico(paramsTc),
        		gestionTecnicosService.consultaJustificacionesTecnico(paramsJustificacionesTec)
        	]).then(function (results) {
        		$scope.resultDisponibilidad.disponibilidad = [];
        		$scope.resultDisponibilidad.totalOrdenes = [];
        		if (results[0].data !== undefined) {
        	        if(results[0].data.respuesta){
        	            if(results[0].data.result !== null){
        	                if(results[0].data.result.disponibilidad.length > 0){
        	                	$scope.resultDisponibilidad = results[0].data.result;
        	                }else{
        	                    mostrarMensajeInformativo("¡Actualmente no existe disponibilidad en el mes!");
        	                }
        	            }else{
        	                mostrarMensajeInformativo("¡Actualmente no existe disponibilidad en el mes!");
        	            }
        	        }else{
        	            mostrarMensajeInformativo(results[0].data.resultDescripcion);
        	        }
        	    }else{
        	        mostrarMensajeWarningValidacion("Error interno en el servidor.");
        	    }
        		
        		if (results[1].data !== undefined) {
        	        if(results[1].data.respuesta){
        	            if(results[1].data.result !== null){
        	                if(results[1].data.result.detalleJustificacion.length > 0){
        	                	angular.forEach(results[1].data.result.detalleJustificacion,function(justificacion,index){
                                	justificacion.fecha = justificacion.fechaInicio;
                                	$scope.resultDisponibilidad.disponibilidad.push(justificacion);
                                });
                            	$scope.listJustificaciones = results[1].data.result.detalleJustificacion;
        	                }else{
        	                    mostrarMensajeInformativo("¡Actualmente no existen justificaciones en el mes!");
        	                }
        	            }else{
        	                mostrarMensajeInformativo("¡Actualmente no existen justificaciones en el mes!");
        	            }
        	        }else{
        	            mostrarMensajeInformativo(results[1].data.resultDescripcion);
        	        }
        	    }else{
        	        mostrarMensajeWarningValidacion("Error interno en el servidor.");
        	    }
        		
        		$scope.pintarDisponibilidad($scope.resultDisponibilidad.disponibilidad, $scope.resultDisponibilidad.totalOrdenes ? $scope.resultDisponibilidad.totalOrdenes : [], mes, fechaArray[2]);
                $scope.isTecnicoSelected = true;
        		
        	});
            swal.close();
    	}
    }

    $scope.pintarTablaOtsTrabajadas = function () {
        let arrayOtsRow = [];
        if (tableOtsTrabajadas) {
            tableOtsTrabajadas.destroy();
        }
        $.each($scope.listDetalleTrabajo, function (i, elemento) {
            let rowOT = [];
            rowOT[0] = elemento.idOrden != null ? elemento.idOrden : "Sin dato";
            rowOT[1] = elemento.folio != null ? elemento.folio : "Sin dato";
            rowOT[2] = elemento.cuenta;
            rowOT[3] = elemento.tipo;
            rowOT[4] = elemento.fechaInicio != null ? elemento.fechaInicio.split(" ")[0] : "Sin dato";
            rowOT[5] = elemento.fechaFin != null ? elemento.fechaFin.split(" ")[0] : "Sin dato";
            rowOT[6] = elemento.usuarioffmAux != null ? elemento.usuarioffmAux : "Sin dato";
            rowOT[7] = elemento.nombreAux != null ? elemento.nombreAux : "Sin dato";
            rowOT[8] = elemento.puntualidad;
            rowOT[9] = '<span onclick="abrirModalDetalleOtTrabajada('+elemento.idOrden+')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light btnDetalleOtTrabajada"><i class="fas fa-bars" aria-hidden="true"></i></span>';
            arrayOtsRow.push(rowOT);
        });
        tableOtsTrabajadas = $('#tableOtsTrabajadas').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayOtsRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "aoColumnDefs" : [
            	{"aTargets" : [4], "sClass":  "columnasCentradas"},
            	{"aTargets" : [5], "sClass":  "columnasCentradas"},
            	{"aTargets" : [8], "sClass":  "columnasCentradas"},
	        	{"aTargets" : [9], "sClass":  "columnasCentradas"},
                { "aTargets": [9], "bSortable": false }
	        ]
        });
    }
    
    abrirModalDetalleOtTrabajada = function (ot) {
    	var otSeleccionadaDetalle = $scope.listDetalleTrabajo.find((e) => e.idOrden == ot);
    	
    	let arrayOtDetalleRows = [];
    	
        if (tableDetalleOtTrabajada) {
            tableDetalleOtTrabajada.destroy();
        }
        
        let rowOT = [];
        rowOT[0] = otSeleccionadaDetalle.subtipo != null ? otSeleccionadaDetalle.subtipo : "Sin dato";
        rowOT[1] = otSeleccionadaDetalle.descEstatus != null ? otSeleccionadaDetalle.descEstatus : "Sin dato";
        rowOT[2] = otSeleccionadaDetalle.fechaInicio != null ? otSeleccionadaDetalle.fechaInicio : "Sin dato";
        rowOT[3] = otSeleccionadaDetalle.fechaFin != null ? otSeleccionadaDetalle.fechaFin : "Sin dato";
        rowOT[4] = otSeleccionadaDetalle.tiempoTotal != null ? otSeleccionadaDetalle.tiempoTotal : "Sin dato";
        arrayOtDetalleRows.push(rowOT);
        
        tableDetalleOtTrabajada = $('#tableDetalleOtTrabajada').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayOtDetalleRows,
            "autoWidth": false,
            "language": idioma_espanol_not_font
        });
    	
    	$("#modal-detalle-ot-trabajada").modal('show');
    }

    $scope.pintarTablaDiasTrabajados = function () {
        let arrayDiasTRow = [];
        if (tableDiasTrabajados) {
            tableDiasTrabajados.destroy();
        }
        $.each($scope.listDiasTrabajados, function (i, elemento) {
            let rowDT = [];
            rowDT[0] = elemento.fecha;
            rowDT[1] = elemento.horaInicio;
            rowDT[2] = elemento.horaFin != null ? elemento.horaFin : "Sin dato";
            rowDT[3] = elemento.cantOrdenes;
            arrayDiasTRow.push(rowDT);
        });
        tableDiasTrabajados = $('#tableDiasTrabajados').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayDiasTRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "aoColumnDefs": [
                { "aTargets": [0], "sClass": "columnasCentradas" },
                { "aTargets": [1], "sClass": "columnasCentradas" },
                { "aTargets": [2], "sClass": "columnasCentradas" },
                { "aTargets": [3], "sClass": "columnasCentradas" }
            ]
        });
    }

    $scope.pintarTablaJustificaciones = function () {
        let arrayJustificacionRow = [];
        if (tableJustificaciones) {
            tableJustificaciones.destroy();
        }
        $.each($scope.listJustificaciones, function (i, elemento) {
            let rowJ = [];
            rowJ[0] = elemento.usuarioFFM;
            rowJ[1] = elemento.nombreDepacho;
            rowJ[2] = elemento.fechaInicio;
            rowJ[3] = elemento.fechaFin;
            rowJ[4] = elemento.fechaCreacion;
            rowJ[5] = elemento.fechaModificacion;
            arrayJustificacionRow.push(rowJ);
        });
        tableJustificaciones = $('#tableJustificaciones').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayJustificacionRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "aoColumnDefs": [
                { "aTargets": [2], "sClass": "columnasCentradas" },
                { "aTargets": [3], "sClass": "columnasCentradas" },
                { "aTargets": [4], "sClass": "columnasCentradas" },
                { "aTargets": [5], "sClass": "columnasCentradas" }
            ]
        });
    }

    $scope.consultarDetalleJustificacion = function (justificacion) {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        $scope.justificacionDetalle = $scope.resultDisponibilidad.disponibilidad.find((e) => e.idJustificacion == justificacion);
        $scope.isDetalle = true;
        $scope.isJustificacion = true;
        swal.close();
        $scope.$apply();
    }

    $scope.consultarDetalleMesTecnico = function () {
    	$scope.detalleMesTecnico = {};
    	
    	$("#myTabDetalle li a").removeClass('active');
		$("#v-pills-tabContent-detalle .tab-pane").removeClass('active show');
		$("#opcion-dias-tab").addClass("active");
		$("#opcion-dias").addClass("active show");
    	
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        
        let paramsConsultaDiasTrabajados = {"idTecnico": $scope.idTecnico,"fechaInicio": $scope.fechaInicioMes,"fechaFin": $scope.fechaFinMes};
    	let paramsConsultaOrdenes = {"idTecnico": $scope.idTecnico,"fechaInicio": $scope.fechaInicioMes,"fechaFin": $scope.fechaFinMes};
        
        $q.all([
        	gestionTecnicosService.consultaDiasTrabajadosTecnicoPorFecha(paramsConsultaDiasTrabajados),
        	gestionTecnicosService.consultaOrdenesTecnicoPorFecha(paramsConsultaOrdenes)
        ]).then(function (results) {
        	
        	$scope.listDiasTrabajados = [];
        	$scope.listDetalleTrabajo = [];
        	$scope.detalleMesTecnico.contadorDiasTrabajados = 0;
        	$scope.detalleMesTecnico.contadorOts = 0;
        	
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
            		if(results[0].data.result !== null){
            			if(results[0].data.result.detalleDias.length > 0){
                			$scope.listDiasTrabajados = results[0].data.result.detalleDias;
                			$scope.detalleMesTecnico.contadorDiasTrabajados = $scope.listDiasTrabajados.length;
                		}else{
                			mostrarMensajeInformativo("¡Actualmente no existen días trabajados!");
                		}
            		}else{
            			mostrarMensajeInformativo("¡Actualmente no existen días trabajados!");
            		}
            	}else{
            		mostrarMensajeInformativo(results[0].data.resultDescripcion);
            	}
        	}else{
        		mostrarMensajeWarningValidacion("Error interno en el servidor.");
        	}
        	
        	if (results[1].data !== undefined) {
            	if(results[1].data.respuesta){
            		if(results[1].data.result !== null){
            			if(results[1].data.result.ordenes.length > 0){
                			$scope.listDetalleTrabajo = results[1].data.result.ordenes;
                			$scope.detalleMesTecnico.contadorOts = $scope.listDetalleTrabajo.length;
                		}else{
                			mostrarMensajeInformativo("¡Actualmente no existen ordenes!");
                		}
            		}else{
            			mostrarMensajeInformativo("¡Actualmente no existen ordenes!");
            		}
            	}else{
            		mostrarMensajeInformativo(results[1].data.resultDescripcion);
            	}
        	}else{
        		mostrarMensajeWarningValidacion("Error interno en el servidor.");
        	}
        	
        	if($scope.listJustificaciones.length < 1){
        		mostrarMensajeInformativo("¡Actualmente no existen justificaciones!");
        	}
        	
        	$scope.isDetalleMesTecnico = true;
            const mesActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
            $scope.tituloDetalle = mesActual.toUpperCase();
            const fechaArray = mesActual.split(" ");
        	
            var totalDiasJustidicados = $scope.calcularDiasJustificados($scope.listJustificaciones);
            $scope.detalleMesTecnico.contadorDiasJustificados = totalDiasJustidicados;
            $scope.pintarTablaDiasTrabajados();
            $scope.pintarTablaOtsTrabajadas();
            $scope.pintarTablaJustificaciones();
            
        	swal.close();
        });

    }
    
    $scope.calcularDiasJustificados = function(diasJustificados) {
    	var contadorDias = 0;
    	angular.forEach(diasJustificados,function(dia,index){
    		var fechaInicioFormat = dia.fechaInicio.split("-");
    		var fechaFinFormat = dia.fechaFin.split("-");
    		var fechaInicioCalcular = moment(fechaInicioFormat[2] + "-" + fechaInicioFormat[1] + "-" + fechaInicioFormat[0]);
    		var fechaFinCalcular = moment(fechaFinFormat[2] + "-" + fechaFinFormat[1] + "-" + fechaFinFormat[0]);
    		contadorDias = contadorDias + (fechaFinCalcular.diff(fechaInicioCalcular, 'days')+1);
    	});
    	return contadorDias;
	}

    $scope.changeView = function () {
        if ($scope.isDetalleMesTecnico) {
            $scope.isDetalleMesTecnico = false;
        }
        if (!$scope.isCargaArchivos) {
            $scope.isCargaArchivos = true;
        } else {
            $scope.isCargaArchivos = false;
            $scope.archivosA = {};
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
            $("#fileArch").val("");
            $("#fileArch").prop("src", "");
        }
    }

    $scope.validarFecha = function (idFechaInicio, idFechaFin) {
        var inicio = document.getElementById(idFechaInicio).value.split('/');
        var fin = document.getElementById(idFechaFin).value.split('/');
        var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
        var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
        if (date_inicio <= date_fin) {
            return true;
        } else {
            return false;
        }
    }

    $scope.consultarComentariosJustificacion = function (justificacion) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let paramsConsultarComentariosJust = {idJustificacion: justificacion.idJustificacion};
        gestionTecnicosService.consultarComentariosJustificacion(paramsConsultarComentariosJust).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result) {
                	if(response.data.result.mensajes.length > 0){
                		$scope.comentariosJustificacion = response.data.result.mensajes;
                	}else{
                		mostrarMensajeInformativo("¡Actualmente no existen comentarios!");
                	}
                } else {
                	mostrarMensajeInformativo("¡Actualmente no existen comentarios!");
                }
            } else {
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }
            $("#modal-comentarios-justificacion").modal('show');
            swal.close();
        });
    }

    $scope.consultarArchivosJustificacion = function () {
    	
    	$(".text_select").text("Selecciona un archivo");
        $(".box__dragndrop").text("o arrastra aqu\u00ED");
        $('#fileArch').val("");
        $("#fileArch").prop("src", "");
    	
    	let arrayRow = [];
        if (tableArchivosJustificacion) {
            tableArchivosJustificacion.destroy();
        }
        
        $.each($scope.justificacionDetalle.evidencias, function (i, elemento) {
            let row = [];
            row[0] = $scope.justificacionDetalle.nombreDepacho;
            row[1] = elemento.nombre + "" + elemento.extension;
            row[2] = elemento.fecha != null ? elemento.fecha : "Sin dato";
            if($scope.configPermisoAccionEliminaEvidenciaJustificacion){
            	row[3] = '<span hidden style="background-color: #58b3bf" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" id="descargarArchivo' + elemento.idEvidencia + '" onclick="descargarArchivoJustificacion('+"'"+elemento.url+"'"+')">' +
                '<i class="fas fa-download" title="Descargar archivo"></i>' +
                '</span> &nbsp;' +
                '<span class="btn-floating btn-option btn-sm btn-secondary btnTables btnEliminarEvidencia" id="descargarArchivo' + elemento.idEvidencia + '" onclick="eliminarArchivoJustificacion('+elemento.idEvidencia+')">' +
                '<i class="far fa-trash-alt" title="Eliminar archivo"></i>' +
                '</span> &nbsp;';
            }else{
            	row[3] = '';
            }
            arrayRow.push(row);
        });
        
        tableArchivosJustificacion = $('#tableArchivosJustificacion').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": true,
            "pageLength": 10,
            "info": true,
            "data": arrayRow,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "aoColumnDefs": ($scope.configPermisoAccionEliminaEvidenciaJustificacion == true ?
            		[{"aTargets": [2], "sClass": "columnasCentradas"},
                     {"aTargets": [3], "sClass": "columnasCentradas"},
                     {"aTargets": [3], "bSortable": false }] : 
                    [{"aTargets": [2], "sClass": "columnasCentradas"}])
        });
        
        $("#modal-archivos-justificacion").modal('show');
        $scope.isCargaArchivos = false;
    }
    
    eliminarArchivoJustificacion = function(idEvidencia) {
    	if(idEvidencia != undefined && idEvidencia > 0){
    		let evidenciaSeleccionadaElim = $scope.justificacionDetalle.evidencias.find((e) => e.idEvidencia == idEvidencia);
    		let paramsEliminarArchivoJustificacion= {};
    		paramsEliminarArchivoJustificacion.idJustificacion = $scope.justificacionDetalle.idJustificacion;
    		paramsEliminarArchivoJustificacion.evidencias = [];
    		paramsEliminarArchivoJustificacion.evidencias.push({
        		idEvidencia: idEvidencia,
        		activo: 0
            });
        	
        	swal({
                title: "\u00BFEst\u00E1 seguro de eliminar el archivo?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(function (isConfirm) {
                if (isConfirm) {
                	let tituloAccion = "Eliminar evidencia";
                	let mensajeEnvio = "Ha ocurrido un error al eliminar la evidencia " + evidenciaSeleccionadaElim.nombre + "" + evidenciaSeleccionadaElim.extension + " de la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.modificarJustificacionTecnico(paramsEliminarArchivoJustificacion).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	mensajeEnvio = "Se ha eliminado la evidencia " + evidenciaSeleccionadaElim.nombre + "" + evidenciaSeleccionadaElim.extension + " de la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                            	$("#modal-archivos-justificacion").modal('hide');
                                toastr.success('¡Archivo eliminado con éxito!');
                                $scope.consultarDisponibilidadTecnico();
                            } else {
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            }
                        } else {
                        	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                        }
                        swal.close();
                    });
                }
            }).catch(err => {
            });
    	}
	}

    $("#fileEditJust").change(function () {
        if ($('#fileEditJust').get(0).files[0] === undefined) {
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
        } else {
            $(".text_select").text($('#fileEditJust').get(0).files[0].name);
            $(".box__dragndrop").empty()
        }
    });

    $("#fileDelJust").change(function () {
        if ($('#fileDelJust').get(0).files[0] === undefined) {
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
        } else {
            $(".text_select").text($('#fileDelJust').get(0).files[0].name);
            $(".box__dragndrop").empty()
        }
    });
    $("#fileAddJust").change(function () {
        if ($('#fileAddJust').get(0).files[0] === undefined) {
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
        } else {
            $(".text_select").text($('#fileAddJust').get(0).files[0].name);
            $(".box__dragndrop").empty()
        }
    });
    $("#fileArch").change(function () {
        if ($('#fileArch').get(0).files[0] === undefined) {
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
        } else {
            $(".text_select").text($('#fileArch').get(0).files[0].name);
            $(".box__dragndrop").empty()
        }
    });

    $scope.convertFile = function (e, type) {
        if (e.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                let fileBase64 = reader.result.toString().split(",")[1];
                if (type == 'agregar') {
                	$scope.cargarNombresArchivos($("#fileAddJust")[0].files);
                }
                if (type == 'editar') {
                	$scope.cargarNombresArchivos($("#fileEditJust")[0].files);
                }
                if (type == 'eliminar') {
                    $scope.nombreFileDel = e.target.files[0].name;
                    $scope.justificacionD.file = fileBase64;
                }
                if (type == 'archivos') {
                    $scope.cargarNombresArchivos($("#fileArch")[0].files);
                }
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }
    
    $scope.cargarNombresArchivos = function(listaArchivos) {
    	if(listaArchivos.length > 1){
        	var nombresArchivosCargados = "";
            angular.forEach(listaArchivos,function(archivoCargado,index){
            	nombresArchivosCargados += "<li class='listaNombresArchivosNuevos'>"+archivoCargado.name+"</li>";
        	});
            $(".tooltipArchivosNuevosOculto").text("");
            $(".tooltipArchivosNuevosOculto").append(nombresArchivosCargados);
            $(".tooltipArchivosNuevosOculto").addClass("tooltipArchivosNuevosNoOculto");
            $(".text_select").text(listaArchivos.length + " archivos cargados...");
            $(".box__dragndrop").empty();
        }else if(listaArchivos.length == 1){
        	$(".tooltipArchivosNuevosOculto").text("");
            $(".tooltipArchivosNuevosOculto").empty();
            $(".tooltipArchivosNuevosOculto").removeClass("tooltipArchivosNuevosNoOculto");
            $(".text_select").text(listaArchivos[0].name);
            $(".box__dragndrop").empty();
        }
	}

    $scope.openModalAgregarJustificacion = function (fechaSeleccionada) {
        if ($scope.tecnicoDisp.idAuxiliar !== undefined || $scope.tecnicoDisp.idTecnico !== undefined) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
            $('#fileAddJust').val("");
            $("#fileAddJust").prop("src", "");
            $('.datepicker').datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true,
                language: 'es',
                todayHighlight: true,
                clearBtn: false
            });
            $('.datepicker').datepicker('update', new Date(fechaSeleccionada));
            $scope.justificacionA = {}
            $("#modal-agregar-justificacion").modal('show');
            swal.close();
        } else {
            mostrarMensajeWarningValidacion("Selecciona un t&eacute;cnico");
        }
    }

    $scope.agregarJustificacion = function () {
        let mensajeError = '';
        let isValid = true;

        if (!$scope.validarFecha('fecha_inicio_justificacion', 'fecha_fin_justificacion')) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
            isValid = false;
        }
        
        if ($scope.justificacionA.motivo === undefined || $scope.justificacionA.motivo === "") {
            isValid = false;
            mensajeError += '<li>Selecciona un motivo</li>';
        }
        
        if ($scope.justificacionA.comentario === undefined || $scope.justificacionA.comentario === "") {
            isValid = false;
            mensajeError += '<li>Ingresa un comentario</li>';
        }

        if ($("#fileAddJust")[0].files.length == 0) {
            isValid = false;
            mensajeError += '<li>Selecciona un archivo</li>';
        }
        
        if (isValid) {
        	var fechaInicioRegistro = $("#fecha_inicio_justificacion").val().split("/");
        	var fechaFinRegistro = $("#fecha_fin_justificacion").val().split("/");
        	let paramsRegistroJustificacion = {};
        	
        	paramsRegistroJustificacion.idTecnico = $scope.idTecnico;
        	paramsRegistroJustificacion.fechaInicio = fechaInicioRegistro[2] + "/" + fechaInicioRegistro[1] + "/" + fechaInicioRegistro[0];
        	paramsRegistroJustificacion.fechaFin = fechaFinRegistro[2] + "/" + fechaFinRegistro[1] + "/" + fechaFinRegistro[0];
        	paramsRegistroJustificacion.idTipoJustificacion = $scope.justificacionA.motivo;
        	paramsRegistroJustificacion.comentarios = $scope.justificacionA.comentario;
        	
        	paramsRegistroJustificacion.evidencias = [];
        	angular.forEach($("#fileAddJust")[0].files,function(archivoCargado,index){
        		let reader = new FileReader();
                reader.readAsDataURL(archivoCargado);
                reader.onload = function () {
                    let fileBase64 = reader.result.toString().split(",")[1];
                    var nombreFile = archivoCargado.name.split(".");
                    paramsRegistroJustificacion.evidencias.push({
                    	archivo: fileBase64,
                    	nombre: $scope.rutaNombreEvidenciasJustificaciones + "" + nombreFile[0],
                    	extension: "."+nombreFile[1]
                    });
                }
        	});
        	
            swal({
                title: "\u00BFEst\u00E1 seguro de registrar la justificaci\u00F3n?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(function (isConfirm) {
                if (isConfirm) {
                	let tituloAccion = "Crear justificación";
					let mensajeEnvio = "Ha ocurrido un error al crear la justificación para: " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.guardarJustificacionTecnico(paramsRegistroJustificacion).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	mensajeEnvio = "Se ha creado la justificación para: " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                            	$("#modal-agregar-justificacion").modal('hide');
                                toastr.success('¡Justificación registrada con éxito!');
                                $scope.consultarDisponibilidadTecnico();
                            } else {
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            }
                        } else {
                        	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                        }
                        swal.close();
                    });
                }
            }).catch(err => {
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.openModalEditarJustificacion = function (justificacion) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isEdit = true;
        $("#comentarioEditar").val('');
        $(".text_select").text("Selecciona un archivo");
        $(".box__dragndrop").text("o arrastra aqu\u00ED");
        $("#fileEditJust").val("");
        $("#fileEditJust").prop("src", "");
        $('#fecha_inicio_justificacion_update').datepicker('update', $scope.justificacionDetalle.fechaInicio);
        $('#fecha_fin_justificacion_update').datepicker('update', $scope.justificacionDetalle.fechaFin);
        $("#motivoJustificacionMod").val(""+$scope.justificacionDetalle.idTipoJustificacion);
        $("#modal-editar-justificacion").modal('show');
        swal.close();
    }

    // Método que modifica la información de la justificación en selección (solo el archivo es opcional en este caso).
    $scope.editarJustificacion = function (eJustificacion) {
        let mensajeError = '';
        let isValid = true;

        if (!$scope.validarFecha('fecha_inicio_justificacion_update', 'fecha_fin_justificacion_update')) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
            isValid = false;
        }

        if ($scope.justificacionDetalle.comentario == "" || $scope.justificacionDetalle.comentario == null) {
            isValid = false;
            mensajeError += '<li>Agrega un comentario</li>';
        }

        if (isValid) {
        	
        	var fechaInicioMod = $("#fecha_inicio_justificacion_update").val().split("/");
        	var fechaFinMod = $("#fecha_fin_justificacion_update").val().split("/");
        	let paramsModJustificacion = {};
        	paramsModJustificacion.idJustificacion = $scope.justificacionDetalle.idJustificacion;
        	paramsModJustificacion.idTecnico = $scope.idTecnico;
        	paramsModJustificacion.fechaInicio = fechaInicioMod[2] + "/" + fechaInicioMod[1] + "/" + fechaInicioMod[0];
        	paramsModJustificacion.fechaFin = fechaFinMod[2] + "/" + fechaFinMod[1] + "/" + fechaFinMod[0];
        	paramsModJustificacion.idTipoJustificacion = $scope.justificacionDetalle.idTipoJustificacion;
        	paramsModJustificacion.comentarios = $scope.justificacionDetalle.comentario;
        	if($("#fileEditJust")[0].files.length > 0){
        		paramsModJustificacion.evidencias = [];
            	angular.forEach($("#fileEditJust")[0].files,function(archivoCargado,index){
            		let reader = new FileReader();
                    reader.readAsDataURL(archivoCargado);
                    reader.onload = function () {
                        let fileBase64 = reader.result.toString().split(",")[1];
                        var nombreFile = archivoCargado.name.split(".");
                        paramsModJustificacion.evidencias.push({
                        	archivo: fileBase64,
                        	nombre: $scope.rutaNombreEvidenciasJustificaciones + "" + nombreFile[0],
                        	extension: "."+nombreFile[1]
                        });
                    }
            	});
        	}
        	
        	swal({
                title: "\u00BFEst\u00E1 seguro de modificar la justificaci\u00F3n?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(function (isConfirm) {
                if (isConfirm) {
                	let tituloAccion = "Editar justificación";
                	let mensajeEnvio = "Ha ocurrido un error al modificar la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.modificarJustificacionTecnico(paramsModJustificacion).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	mensajeEnvio = "Se ha modificado la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                            	$("#modal-editar-justificacion").modal('hide');
                            	$(".text_select").text("Selecciona un archivo");
                            	$(".box__dragndrop").text("o arrastra aqu\u00ED");
                            	$("#fileEditJust").val('');
                                toastr.success('¡Justificación modificada con éxito!');
                                $scope.consultarDisponibilidadTecnico();
                            } else {
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            }
                        } else {
                        	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                        }
                        swal.close();
                    });
                }
            }).catch(err => {
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    // Método que elimina la justificación en selección, validando e indicando si se eliminará una justificación que abarca más de 1 día.
    $scope.eliminarJustificacionTecnico = function (justificacion) {
    	var totalDiasJustidicados = $scope.calcularDiasJustificados([justificacion]);
    	var tituloAlerta = "Se eliminar\u00E1 la justificaci\u00F3n";
    	var txtAlerta = "\u00BFDesea continuar?";
    	if(totalDiasJustidicados > 1){
    		tituloAlerta = "\u00BFDesea continuar?";
    		txtAlerta = "Se eliminar\u00E1 la justificaci\u00F3n del " + justificacion.fechaInicio + " al " + justificacion.fechaFin;
    	}
    	let paramsEliminarJustificacion = {idJustificacion: justificacion.idJustificacion};
    	swal({
            title: tituloAlerta,
	        text: txtAlerta,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(function (isConfirm) {
            if (isConfirm) {
            	let tituloAccion = "Eliminar justificación";
            	let mensajeEnvio = "Ha ocurrido un error al eliminar la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                gestionTecnicosService.eliminarJustificacionTecnico(paramsEliminarJustificacion).then(function success(response) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                        	mensajeEnvio = "Se ha eliminado la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                        	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                        	toastr.success('¡Justificación eliminada con éxito!');
                        	$scope.consultarDisponibilidadTecnico();
                        } else {
                        	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        }
                    } else {
                    	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                    }
                    swal.close();
                });
            }
        }).catch(err => {
        });
    }

    // Método que agrega 1 o más archivos a la justificación en selección (hace la llamada a la petición de modificar justificación).
    $scope.agregarArchivoJustificacion = function () {
    	let mensajeError = '';
        let isValid = true;
        
        if ($("#fileArch")[0].files.length == 0) {
            isValid = false;
            mensajeError += '<li>Selecciona un archivo</li>';
        }

        if (isValid) {
        	let paramsAgregarArchivoJustificacion = {};
        	paramsAgregarArchivoJustificacion.idJustificacion = $scope.justificacionDetalle.idJustificacion;
        	paramsAgregarArchivoJustificacion.evidencias = [];
        	angular.forEach($("#fileArch")[0].files,function(archivoCargado,index){
        		let reader = new FileReader();
                reader.readAsDataURL(archivoCargado);
                reader.onload = function () {
                    let fileBase64 = reader.result.toString().split(",")[1];
                    var nombreFile = archivoCargado.name.split(".");
                    paramsAgregarArchivoJustificacion.evidencias.push({
                    	archivo: fileBase64,
                    	nombre: $scope.rutaNombreEvidenciasJustificaciones + "" + nombreFile[0],
                    	extension: "."+nombreFile[1]
                    });
                }
        	});
        	
        	var tituloAlerta = "\u00BFEst\u00E1 seguro de agregar el archivo?";
        	var numArchivosCargados = $("#fileArch")[0].files.length;
        	if(numArchivosCargados > 1){
        		tituloAlerta = "\u00BFEst\u00E1 seguro de agregar los " + numArchivosCargados + " archivos?";
        	}
        	
        	swal({
                title: tituloAlerta,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(function (isConfirm) {
                if (isConfirm) {
                	let tituloAccion = "Agregar evidencia";
                	let mensajeEnvio = "Ha ocurrido un error al agregar la evidencia a la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.modificarJustificacionTecnico(paramsAgregarArchivoJustificacion).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	mensajeEnvio = "Se ha agregado la evidencia a la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                            	$("#modal-archivos-justificacion").modal('hide');
                            	$(".text_select").text("Selecciona un archivo");
                                $(".box__dragndrop").text("o arrastra aqu\u00ED");
                                $("#fileArch").val('');
                                toastr.success('¡Archivo registrado con éxito!');
                                $scope.consultarDisponibilidadTecnico();
                            } else {
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            }
                        } else {
                        	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                        }
                        swal.close();
                    });
                }
            }).catch(err => {
            });
        }else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    // Método que consulta el detalle de las ordenes trabajadas del día "trabajado" seleccionado.
    $scope.consultarDetalleTrabajo = function (fechaDia) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isDetalle = false;

        let paramsOrdenesTecnicos = {"idTecnico": $scope.idTecnico,"fechaInicio": fechaDia,"fechaFin":fechaDia};
        $q.all([
        	gestionTecnicosService.consultaOrdenesTecnicoPorFecha(paramsOrdenesTecnicos)
        ]).then(function(results) {
        	
        	if (results[0].data !== undefined) {
                if(results[0].data.respuesta){
                    if(results[0].data.result !== null){
                        if(results[0].data.result.ordenes.length > 0){
                        	$scope.listDetalleTrabajo = results[0].data.result.ordenes;
                        	
                        	let arrayRow = [];
                            
                            if (tableDetalleTrabajo) {
                                tableDetalleTrabajo.destroy();
                            }
                        	
                        	$.each($scope.listDetalleTrabajo, function (i, elemento) {
                                let row = [];
                                row[0] = elemento.idOrden;
                                row[1] = elemento.folio;
                                row[2] = elemento.cuenta;
                                row[3] = elemento.cliente;
                                row[4] = elemento.tipo;
                                row[5] = elemento.subtipo;
                                row[6] = elemento.puntualidad;
                                row[7] = elemento.fechaAgenda != null ? elemento.fechaAgenda.split(" ")[0] : "Sin dato";
                                row[8] = elemento.fechaInicio != null ? elemento.fechaInicio.split(" ")[0] : "Sin dato";
                                row[9] = elemento.fechaFin != null ? elemento.fechaFin.split(" ")[0] : "Sin dato";
                                arrayRow.push(row);
                            });
                            tableDetalleTrabajo = $('#tableDetalleTrabajo').DataTable({
                                "paging": true,
                                "lengthChange": false,
                                "ordering": true,
                                "pageLength": 10,
                                "info": true,
                                "data": arrayRow,
                                "autoWidth": true,
                                "language": idioma_espanol_not_font
                            });
                            $("#modal-detalle-trabajo").modal('show');
                        }else{
                            mostrarMensajeInformativo("¡Actualmente no existen ordenes!");
                        }
                    }else{
                        mostrarMensajeInformativo("¡Actualmente no existen ordenes!");
                    }
                }else{
                    mostrarMensajeInformativo(results[0].data.resultDescripcion);
                }
            }else{
                mostrarMensajeWarningValidacion("Error interno en el servidor.");
            }
        });
        swal.close();
    }
    
    // Método que realiza la consulta de auxiliares y valida si ya fueron consultados no hace la llamada a la petición.
    $scope.consultarAuxiliares = function () {
    	
    	$("#calendar_gestionTecnicos").css('visibility', 'hidden');
    	eventosDisponibilidad = [];
    	if ($scope.calendarTec) {
            $scope.calendarTec.destroy();
        }
    	$scope.initCalendario();
    	$scope.flagCargandoCalendar = true;
    	
    	$scope.limpiarDetalleJustificacion();
    	$scope.changeView();
    	$scope.isTecnicoSelected = false;
    	$.each($scope.listAuxiliares, function (i, elemento) {
            $("#us-"+elemento.idAuxiliar).css("background-color", "white");
        });
    	eventosDisponibilidad = [];
    	if ($scope.calendarTec) {
            $scope.calendarTec.destroy();
        }
    	$scope.initCalendario();
    	if($scope.listAuxiliares.length < 1){
    		var idsTecnicos = [];
    		if($scope.listTecnicos.length > 0){
    			angular.forEach($scope.listTecnicos,function(tecnico,index){
    				idsTecnicos.push(tecnico.idTecnico);
                });
    			let paramsAuxiliares = {"tecnicos": idsTecnicos};
                swal({ text: 'Cargando datos ...', allowOutsideClick: false });
                swal.showLoading();
                $q.all([
                	gestionTecnicosService.consultaAuxiliaresGestionTecnicos(paramsAuxiliares)
                ]).then(function (results) {
                	
                	if (results[0].data !== undefined) {
                        if(results[0].data.respuesta){
                            if(results[0].data.result !== null){
                                if(results[0].data.result.tecnicos.length > 0){
                                	$scope.listAuxiliares = results[0].data.result.tecnicos;
                                }else{
                                    mostrarMensajeInformativo("¡Actualmente no existen auxiliares!");
                                }
                            }else{
                                mostrarMensajeInformativo("¡Actualmente no existen auxiliares!");
                            }
                        }else{
                            mostrarMensajeInformativo(results[0].data.resultDescripcion);
                        }
                    }else{
                        mostrarMensajeWarningValidacion("Error interno en el servidor.");
                    }
                    swal.close();
                });
    		}else{
    			mostrarMensajeInformativo("¡Actualmente no existen técnicos para consultar sus auxiliares!");
    		}
    	}  	
    }
    
    // Método que oculta la vista del detalle del mes y del detalle de justificaciones, para visualizar.
    $scope.limpiarDetalleJustificacion = function() {
    	$scope.isDetalle = false;
        $scope.isJustificacion = false;
        $scope.justificacionDetalle = {};
	}
    
    // Método que agrega un comentario nuevo a la justificación en selección
    $scope.agregarComentarioJustificacion = function() {
    	var fechaActualComentario = new Date();
    	fechaActualComentario = moment(fechaActualComentario).format('DD-MM-YYYY');
    	var comentarioNuevo = $("#comentarioNuevoJustificacion").val();
    	let mensajeError = '';
        let isValid = true;
    	
    	if (comentarioNuevo === undefined || comentarioNuevo === "") {
            isValid = false;
            mensajeError += '<li>Ingresa un comentario</li>';
        }
    	
    	if (isValid) {
        	let paramsAgregarComentarioJust = {idJutificacion: $scope.justificacionDetalle.idJustificacion, comentarios: comentarioNuevo};
        	
        	swal({
                title: "\u00BFEst\u00E1 seguro de agregar el comentario?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then(function (isConfirm) {
                if (isConfirm) {
                	let tituloAccion = "Agregar comentario";
                	let mensajeEnvio = "Ha ocurrido un error al agregar el comentario a la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.agregarComentarioJustificacion(paramsAgregarComentarioJust).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	mensajeEnvio = "Se ha agregado un comentario a la justificación con fecha de inicio " + $scope.justificacionDetalle.fechaInicio + " del empleado " + $scope.tecnicoDisp.nombre + " - " + $scope.tecnicoDisp.numeroEmpleado;
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                            	let agregarComentarioJustificacion = {idJutificacion: $scope.justificacionDetalle.idJustificacion, comentario: comentarioNuevo, idOrigen: "1", fecha: fechaActualComentario};
                            	$scope.comentariosJustificacion.push(agregarComentarioJustificacion);
                                toastr.success('¡Comentario registrado con éxito!');
                                $("#comentarioNuevoJustificacion").val("");
                            } else {
                            	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            }
                        } else {
                        	objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                        }
                        swal.close();
                    });
                }
            }).catch(err => {
            });
        	
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
	}

    angular.element(document).ready(function () {
    	$("#moduloGestionTecnicos").addClass('active');
        $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
        $scope.initGestionTecnicos();
        $("#idBody").removeAttr("style");
        angular.element(document).ready(function () {
            $("#idBody").removeAttr("style");
            var $form = $('.form_drag_drop');
            var droppedFiles = false;
            $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }).on('dragover dragenter', function () {
                $form.addClass('is-dragover');
            }).on('dragleave dragend drop', function () {
                $form.removeClass('is-dragover');
            }).on('drop', function (e) {
                droppedFiles = e.originalEvent.dataTransfer.files;
                $form.find('input[type="file"]').prop('files', droppedFiles);
                $scope.cargarNombresArchivos(droppedFiles);
            });
        });
    });

}]);