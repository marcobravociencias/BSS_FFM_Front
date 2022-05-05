var app = angular.module('gestionTecnicosApp', []);

app.controller('gestionTecnicosController', ['$scope', '$q', 'gestionTecnicosService', 'genericService', function ($scope, $q, gestionTecnicosService, genericService) {

    let calendar_gestionTecnicos;
    let tableJustificaciones;
    let tableOtsTrabajadas;
    let tableDiasTrabajados;
    let tableArchivosJustificacion;
    let tableDetalleTrabajo;
    let eventosDisponibilidad = [];
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
                $scope.consultarDetalleTrabajo();
            },
            dateClick: function (info) {
                let idJust;
                $scope.$apply();
                $scope.fechaDiaJust = info.dateStr;
                let FechaJustMod = $scope.fechaDiaJust.split('-');
                let fechaMod = FechaJustMod[2] + '/' + FechaJustMod[1] + '/' + FechaJustMod[0];
                if ($("#calendar_gestionTecnicos td[data-date=" + $scope.fechaDiaJust + "] div.actividades-contadorac-gris").length > 0) {
                    idJust = ($("#calendar_gestionTecnicos td[data-date=" + $scope.fechaDiaJust + "] div.actividades-contadorac-gris").data('value'))
//                    console.log("No trabajado");
                    $scope.consultarDetalleJustificacion(idJust);
                } else if ($("#calendar_gestionTecnicos td[data-date=" + $scope.fechaDiaJust + "] div.actividades-contadorac-verde").length > 0) {
                    $scope.consultarDetalleTrabajo();
//                    console.log("trabajado");
                } else {
//                    console.log("trabajado");
                    $scope.isJustificacion = false;
                    $scope.openModalAgregarJustificacion(info.date);
                    $scope.$apply();
                }
            },
            datesSet: function () {
                setTimeout(function () {
                    $scope.calendarTec.render()
                }, 1000)
            }
        });
        
        $scope.fechaInicioMes = $scope.calendarTec.view.currentStart;
        $scope.fechaFinMes = $scope.calendarTec.view.currentEnd;
        $scope.fechaFinMes.setDate($scope.fechaFinMes.getDate()-1);
        
        $scope.fechaInicioMes = moment($scope.fechaInicioMes).format('YYYY-MM-DD');
        $scope.fechaFinMes = moment($scope.fechaFinMes).format('YYYY-MM-DD');

        setTimeout(function () {
            if (eventosDisponibilidad.length > 0) {
                eventosDisponibilidad.forEach(event => {
                    if (event.tipo === 'TRABAJADO') {
                        if (!$('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top div').hasClass('actividades-contadorac-verde')) {
                            $('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top').append('<div class="actividades-contadorac-verde" data-value="' + event.objetodisponibilidad.idJustificacion + '">&nbsp;</div> ')
                        }
                    } else if (event.tipo === 'DIA JUSTIFICADO') {
                        $('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top').append('<div class="actividades-contadorac-gris" data-value="' + event.objetodisponibilidad.idJustificacion + '">&nbsp;</div> ')
                    }
                });
            }
        }, 0500);
        $scope.calendarTec.render();
    }

    $scope.consultarTecnicos = function () {
    	
    	$scope.limpiarDetalleJustificacion();
    	$scope.changeView();
    	$scope.isTecnicoSelected = false;
    	
    	$.each($scope.listTecnicos, function (i, elemento) {
            $("#"+elemento.idTecnico).css("background-color", "white");
            $("#tec-"+elemento.idTecnico).css("color", "grey");
            $("#aux-"+elemento.idTecnico).css("color", "grey");
        });
    	eventosDisponibilidad = [];
    	if ($scope.calendarTec) {
            $scope.calendarTec.destroy();
        }
    	$scope.initCalendario();
    	
    	if($scope.listTecnicos.length < 1){
    		let paramsServicio1 = {"geografias": ["1", "2", "3"],"idTipoUsuario": ["1", "2"]};
        	let paramsServicio2 = {"tecnicos": [125471, 2, 3]};
        	let paramsServicio3 = {"idDespacho": 17};
        	let paramsServicio4 = {"idTecnico": 2,"fechaInicio": "09-11-2021","fechaFin":"18-03-2022"};
        	let paramsServicio5 = {"idAuxiliar": 13,"fechaInicio": "09-11-2021","fechaFin":"18-03-2022"};
        	let paramsServicio6 = {"idTecnico": 2, "fechaInicio": "01-03-2022","fechaFin":"30-03-2022"};
        	let paramsServicio7 = {"idTecnico": 2,"fechaInicio": "18-03-2022","fechaFin":"22-03-2022"};
        	let paramsServicio8 = {"idAuxiliar": 13,"fechaInicio": "18-03-2022","fechaFin":"22-03-2022"};
        	let paramsServicio9 = {"idUsuario": 13,"fechaInicio": "2022-04-01","fechaFin":"2022-04-30"};
        	let paramsServicio10 = {"idJustificacion": 321};
        	
            swal({ text: 'Cargando datos ...', allowOutsideClick: false });
            swal.showLoading();
            
            $q.all([
            	gestionTecnicosService.consultaTecnicosGestionTecnicos(paramsServicio1),
            	gestionTecnicosService.consultaAuxiliaresGestionTecnicos(paramsServicio2),
            	gestionTecnicosService.consultaTecnicosPorDespacho(paramsServicio3),
            	gestionTecnicosService.consultaOrdenesTecnicoPorFecha(paramsServicio4),
            	gestionTecnicosService.consultaOrdenesAuxiliarPorFecha(paramsServicio5),
            	gestionTecnicosService.consultaDisponibilidadTecnico(paramsServicio6),
            	gestionTecnicosService.consultaDiasTrabajadosTecnicoPorFecha(paramsServicio7),
            	gestionTecnicosService.consultaDiasTrabajadosAuxiliarPorFecha(paramsServicio8),
            	gestionTecnicosService.consultaJustificacionesTecnico(paramsServicio9),
            	gestionTecnicosService.consultaMotivosJustificaciones(),
            	gestionTecnicosService.consultarComentariosJustificacion(paramsServicio10)
            ]).then(function (results) {
            	$scope.listTecnicos = results[2].data.result.tecnicos;
            	$scope.listMotivosJustificaciones = results[9].data.result.motivos;
            	swal.close();
            });
    	}
    }

    $scope.initGestionTecnicos = function () {
        $scope.initCalendario();
        $scope.consultarTecnicos();
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
            "ordering": false,
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
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "autoWidth": false,
            "language": idioma_espanol_not_font
        });
        
        tableJustificaciones = $('#tableJustificaciones').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
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
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": false,
            "language": idioma_espanol_not_font

        });
        
        tableDetalleTrabajo = $('#tableDetalleTrabajo').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
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
                    //fetchtl = fechaInicio[2] + '-' + fechaInicio[1] + '-' + fechaInicio[0];
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
                                title: "Tiempo Trabajado: " + disponibilidad.enTrabajo,
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
                            let horaFin = disponibilidad.horaFin.split(' ');
                            eventDisponibilidad = {
                                height: 800,
                                title: disponibilidad.enTrabajo == 'SIN INFORMACION' ? 'sin informacion' : moment(horaFin[0], "hh::mm").format('LT'),
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
                            let horaInicio = disponibilidad.horaInicio.split(' ');
                            eventDisponibilidad = {
                                title: disponibilidad.horaInicio == 'SIN INFORMACION' ? 'sin informacion' : moment(horaInicio[0], "hh::mm").format('LT'),
                                tipo: 'TRABAJADO',
                                start: newFecha,
                                end: newFecha,
                                tipoevento: 'horaingreso',
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
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        
        $scope.limpiarDetalleJustificacion();
        
        if ($scope.isDetalleMesTecnico) {
            $scope.isDetalleMesTecnico = false;
        }
        
        $scope.tipoConsulta = 'TEC';

        if (tecnico !== undefined) {
        	$scope.tecnicoDisp = {};
        	$scope.tecnicoDisp = tecnico;
            $scope.idTecnico = tecnico.id;
        }

        $.each($scope.listTecnicos, function (i, elemento) {
            $("#"+elemento.idTecnico).css("background-color", "white");
            $("#tec-"+elemento.idTecnico).css("color", "grey");
            $("#aux-"+elemento.idTecnico).css("color", "grey");
        });
        $.each($scope.listAuxiliares, function (i, elemento) {
            $("#"+elemento.idAuxiliar).css("background-color", "white");
            $("#tec-"+elemento.idAuxiliar).css("color", "grey");
            $("#aux-"+elemento.idAuxiliar).css("color", "grey");
        });
        
        const fechaActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
        const fechaArray = fechaActual.split(" ");
        const mes = $scope.getMes(fechaArray[0].toUpperCase());
        
        if($scope.tecnicoDisp.idTecnico !== undefined){
        	$("#" + $scope.tecnicoDisp.idTecnico).css("background-color", "#DCDEDC");
            $("#tec-" + $scope.tecnicoDisp.idTecnico).css("color", "#7716fa");
        }else{
        	$("#" + $scope.tecnicoDisp.idAuxiliar).css("background-color", "#DCDEDC");
            $("#aux-" + $scope.tecnicoDisp.idAuxiliar).css("color", "#7716fa");
        }
        
        let paramsTc = {"idTecnico": 2, "fechaInicio": "01/03-2022","fechaFin":"30-03-2022"};
        $scope.changeView();
        
        let paramsJustificacionesTec = {"idUsuario": 13,"fechaInicio": "2022-05-01","fechaFin":"2022-05-30"};

    	$q.all([
    		gestionTecnicosService.consultaDisponibilidadTecnico(paramsTc),
    		gestionTecnicosService.consultaJustificacionesTecnico(paramsJustificacionesTec)
    	]).then(function (response) {
    		if (response[0].data.respuesta) {
                if (response[0].data.result) {
                    $scope.resultDisponibilidad = response[0].data.result;
                    
                    $scope.resultDisponibilidad.disponibilidad[0].fecha = "02/05/2022";
                    
                    if(response[1].data.result.detalleJustificacion !== undefined){
                    	angular.forEach(response[1].data.result.detalleJustificacion,function(justificacion,index){
                        	justificacion.fecha = justificacion.fechaInicio;
                        	$scope.resultDisponibilidad.disponibilidad.push(justificacion);
                        });
                    	$scope.listJustificaciones = response[1].data.result.detalleJustificacion;
                    }
                    
                    $scope.pintarDisponibilidad($scope.resultDisponibilidad.disponibilidad, $scope.resultDisponibilidad.totalOrdenes ? $scope.resultDisponibilidad.totalOrdenes : [], mes, fechaArray[2]);
                    $scope.isTecnicoSelected = true;
                } else {
                    swal.close();
                }
            } else {
                swal.close();
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }  
    	});
        swal.close();
    }

    $scope.consultarDisponibilidadAux = function (tecnico) {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        $scope.fechaActual = '';
        if ($scope.isDetalleMesTecnico) {
            $scope.isDetalleMesTecnico = false;
            $scope.fechaActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
        } else {
            $scope.fechaActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
        }
        $scope.tecnicoDisp = {};
        $scope.tipoConsulta = 'AUX';

        if (tecnico !== undefined) {
            $scope.auxDisp = {};
            $.each($scope.listTecnicos, function (i, elemento) {
                document.getElementById('' + elemento.id).style.backgroundColor = "white";
                document.getElementById('tec-' + elemento.id).style.color = "grey";
                document.getElementById('aux-' + elemento.id).style.color = "grey";
            });

            const fechaArray = $scope.fechaActual.split(" ");
            const mes = $scope.getMes(fechaArray[0].toUpperCase());
            $scope.auxDisp = tecnico;
            $("#" + $scope.auxDisp.id).css("background-color", "#DCDEDC");
            $("#aux-" + $scope.auxDisp.id).css("color", "#7716fa");
            $scope.changeView();
            let paramsAux = {};
            gestionTecnicosService.consultaDisponibilidadAuxGestionTecnicos(paramsAux).then(function success(response) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $scope.resultDisponibilidad = arrayDisponibilidadTec.data.result;
                        $scope.pintarDisponibilidad($scope.resultDisponibilidad.Disponibilidad, $scope.resultDisponibilidad.totalOts ? $scope.resultDisponibilidad.totalOts : [], mes, fechaArray[2]);
                        $scope.isTecnicoSelected = true;
                    } else {
                        swal.close();
                    }
                } else {
                    swal.close();
                    mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                }
            });
        } else {
            if ($scope.auxDisp !== undefined) {
                const fechaArray = $scope.fechaActual.split(" ");
                const mes = $scope.getMes(fechaArray[0].toUpperCase());
                $("#" + $scope.auxDisp.id).css("background-color", "#DCDEDC");
                $("#aux-" + $scope.auxDisp.id).css("color", "#7716fa");
                $scope.changeView();
                let paramsAux = {};
                gestionTecnicosService.consultaDisponibilidadAuxGestionTecnicos(paramsAux).then(function success(response) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            $scope.resultDisponibilidad = arrayDisponibilidadTec.data.result;
                            $scope.pintarDisponibilidad($scope.resultDisponibilidad.Disponibilidad, $scope.resultDisponibilidad.totalOts ? $scope.resultDisponibilidad.totalOts : [], mes, fechaArray[2]);
                            $scope.isTecnicoSelected = true;
                        } else {
                            swal.close();
                        }
                    } else {
                        swal.close();
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                    }
                });
            }
        }
        swal.close();
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
            rowOT[4] = elemento.subtipo;
            rowOT[5] = elemento.fechaInicio != null ? elemento.fechaInicio.split(" ")[0] : "Sin dato";
            rowOT[6] = elemento.fechaFin != null ? elemento.fechaFin.split(" ")[0] : "Sin dato";
            rowOT[7] = elemento.usuarioffmAux != null ? elemento.usuarioffmAux : "Sin dato";
            rowOT[8] = elemento.nombreAux != null ? elemento.nombreAux : "Sin dato";
            rowOT[9] = elemento.puntualidad;
            rowOT[10] = elemento.tiempoTotal != null ? elemento.tiempoTotal.split(".")[0] : "Sin dato";
            rowOT[11] = "Sin dato";
            arrayOtsRow.push(rowOT);
        });
        tableOtsTrabajadas = $('#tableOtsTrabajadas').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayOtsRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "aoColumnDefs" : [
            	{"aTargets" : [5], "sClass":  "columnasCentradas"},
            	{"aTargets" : [6], "sClass":  "columnasCentradas"},
            	{"aTargets" : [10], "sClass":  "columnasCentradas"},
	        	{"aTargets" : [11], "sClass":  "columnasCentradas"}
	        ]
        });
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
            rowDT[2] = elemento.horaFin;
            rowDT[3] = elemento.cantOrdenes;
            arrayDiasTRow.push(rowDT);
        });
        tableDiasTrabajados = $('#tableDiasTrabajados').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayDiasTRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "aoColumnDefs" : [
            	{"aTargets" : [0], "sClass":  "columnasCentradas"},
            	{"aTargets" : [1], "sClass":  "columnasCentradas"},
            	{"aTargets" : [2], "sClass":  "columnasCentradas"},
	        	{"aTargets" : [3], "sClass":  "columnasCentradas"}
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
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "scrollX": false,
            "data": arrayJustificacionRow,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "aoColumnDefs" : [
            	{"aTargets" : [2], "sClass":  "columnasCentradas"},
            	{"aTargets" : [3], "sClass":  "columnasCentradas"},
            	{"aTargets" : [4], "sClass":  "columnasCentradas"},
	        	{"aTargets" : [5], "sClass":  "columnasCentradas"}
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
    	
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        
        let paramsConsultaDiasTrabajados = {"idTecnico": 2,"fechaInicio": "01-03-2022","fechaFin":"30-04-2022"};
    	let paramsConsultaOrdenes = {"idTecnico": 2,"fechaInicio": "01-03-2022","fechaFin":"30-04-2022"};
        
        $q.all([
        	gestionTecnicosService.consultaDiasTrabajadosTecnicoPorFecha(paramsConsultaDiasTrabajados),
        	gestionTecnicosService.consultaOrdenesTecnicoPorFecha(paramsConsultaOrdenes)
//        	gestionTecnicosService.consultaOrdenesAuxiliarPorFecha(paramsServicio5),
//        	gestionTecnicosService.consultaDiasTrabajadosAuxiliarPorFecha(paramsServicio8),
        ]).then(function (results) {
        	
        	$scope.listDiasTrabajados = [];
        	$scope.listDetalleTrabajo = [];
        	
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
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
        		mostrarMensajeWarningValidacion("Error interno en el servidor.");
        	}
        	
        	if (results[1].data !== undefined) {
            	if(results[1].data.respuesta){
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
        		mostrarMensajeWarningValidacion("Error interno en el servidor.");
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
            row[1] = elemento.nombre + "." + elemento.extension;
            row[2] = elemento.fecha != null ? elemento.fecha : "Sin dato";
            row[3] = '<span hidden style="background-color: #58b3bf" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" id="descargarArchivo' + elemento.idEvidencia + '" onclick="descargarArchivoJustificacion('+"'"+elemento.url+"'"+')">' +
                '<i class="fas fa-download" title="Descargar archivo"></i>' +
                '</span> &nbsp;' +
                '<span style="background-color: #58b3bf" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" id="descargarArchivo' + elemento.idEvidencia + '" onclick="eliminarArchivoJustificacion('+elemento.idEvidencia+')">' +
                '<i class="far fa-trash-alt" title="Eliminar archivo"></i>' +
                '</span> &nbsp;';
            arrayRow.push(row);
        });
        tableArchivosJustificacion = $('#tableArchivosJustificacion').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "data": arrayRow,
            "autoWidth": true,
            "language": idioma_espanol_not_font,
            "aoColumnDefs" : [ 
            	{"aTargets" : [2], "sClass":  "columnasCentradas"},
	        	{"aTargets" : [3], "sClass":  "columnasCentradas"}
	        ]
        });
        $("#modal-archivos-justificacion").modal('show');
        $scope.isCargaArchivos = false;
    }
    
//    descargarArchivoJustificacion = function(urls) {
//    	
//    }
    
    eliminarArchivoJustificacion = function(idEvidencia) {
    	if(idEvidencia != undefined && idEvidencia > 0){
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
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.modificarJustificacionTecnico(paramsEliminarArchivoJustificacion).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	$("#modal-archivos-justificacion").modal('hide');
                                toastr.success('¡Archivo eliminado con éxito!');
                                $scope.consultarDisponibilidadTecnico();
                            } else {
                            }
                        } else {
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
        if ($scope.auxDisp.id !== undefined || $scope.tecnicoDisp.idTecnico !== undefined) {
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
//    	justificaciones/mx/2022/{idJustificaciones}/{idJustificaciones}_
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
        	
        	paramsRegistroJustificacion.idTecnico = 13;
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
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.guardarJustificacionTecnico(paramsRegistroJustificacion).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                $("#modal-agregar-justificacion").modal('hide');
                                toastr.success('¡Justificación registrada con éxito!');
                                $scope.consultarDisponibilidadTecnico();
                            } else {
                            }
                        } else {
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

    //Método que modifica la información de la justificación en selección (solo el archivo es opcional en este caso).
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
        	paramsModJustificacion.idTecnico = 13;
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
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.modificarJustificacionTecnico(paramsModJustificacion).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	$("#modal-editar-justificacion").modal('hide');
                            	$(".text_select").text("Selecciona un archivo");
                            	$(".box__dragndrop").text("o arrastra aqu\u00ED");
                            	$("#fileEditJust").val('');
                                toastr.success('¡Justificación modificada con éxito!');
                                $scope.consultarDisponibilidadTecnico();
                            } else {
                            }
                        } else {
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

    //Método que elimina la justificación en selección, validando e indicando si se eliminará una justificación que abarca más de 1 día.
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
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                gestionTecnicosService.eliminarJustificacionTecnico(paramsEliminarJustificacion).then(function success(response) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                        	toastr.success('¡Justificación eliminada con éxito!');
                        	$scope.consultarDisponibilidadTecnico();
                        } else {
                        }
                    } else {
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                    }
                    swal.close();
                });
            }
        }).catch(err => {
        });
    }

    //Método que agrega 1 o más archivos a la justificación en selección (hace la llamada a la petición de modificar justificación).
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
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.modificarJustificacionTecnico(paramsAgregarArchivoJustificacion).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	$("#modal-archivos-justificacion").modal('hide');
                            	$(".text_select").text("Selecciona un archivo");
                                $(".box__dragndrop").text("o arrastra aqu\u00ED");
                                $("#fileArch").val('');
                                toastr.success('¡Archivo registrado con éxito!');
                                $scope.consultarDisponibilidadTecnico();
                            } else {
                            }
                        } else {
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

    //Método que consulta el detalle de las ordenes trabajadas del día "trabajado" seleccionado.
    $scope.consultarDetalleTrabajo = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isDetalle = false;
        $scope.$apply();
        let arrayRow = [];
        
        if (tableDetalleTrabajo) {
            tableDetalleTrabajo.destroy();
        }

        let paramsOrdenesTecnicos = {"idTecnico": 2,"fechaInicio": "09-11-2021","fechaFin":"30-04-2022"};
        $q.all([
        	gestionTecnicosService.consultaOrdenesTecnicoPorFecha(paramsOrdenesTecnicos)
        ]).then(function(results) {
        	$scope.listDetalleTrabajo = results[0].data.result.ordenes;
        	
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
                "ordering": false,
                "pageLength": 10,
                "info": true,
                "data": arrayRow,
                "autoWidth": true,
                "language": idioma_espanol_not_font
            });
            $("#modal-detalle-trabajo").modal('show');
        	
        });
        swal.close();
    }
    
    //Método que realiza la consulta de auxiliares y valida si ya fueron consultados no hace la llamada a la petición.
    $scope.consultarAuxiliares = function () {
    	$scope.limpiarDetalleJustificacion();
    	$scope.changeView();
    	$scope.isTecnicoSelected = false;
    	$.each($scope.listAuxiliares, function (i, elemento) {
            $("#"+elemento.idAuxiliar).css("background-color", "white");
            $("#tec-"+elemento.idAuxiliar).css("color", "grey");
            $("#aux-"+elemento.idAuxiliar).css("color", "grey");
        });
    	eventosDisponibilidad = [];
    	if ($scope.calendarTec) {
            $scope.calendarTec.destroy();
        }
    	$scope.initCalendario();
    	if($scope.listAuxiliares.length < 1){
    		let paramsAuxiliares = {"tecnicos": [125471, 2, 3]};
            swal({ text: 'Cargando datos ...', allowOutsideClick: false });
            swal.showLoading();
            $q.all([
            	gestionTecnicosService.consultaAuxiliaresGestionTecnicos(paramsAuxiliares)
            ]).then(function (results) {
            	$scope.listAuxiliares = results[0].data.result.tecnicos;
                swal.close();
                
            });
    	}  	
    }
    
    //Método que oculta la vista del detalle del mes y del detalle de justificaciones, para visualizar.
    $scope.limpiarDetalleJustificacion = function() {
    	$scope.isDetalle = false;
        $scope.isJustificacion = false;
        $scope.justificacionDetalle = {};
	}
    
    //Método que agrega un comentario nuevo a la justificación en selección
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
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    gestionTecnicosService.agregarComentarioJustificacion(paramsAgregarComentarioJust).then(function success(response) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                            	let agregarComentarioJustificacion = {idJutificacion: $scope.justificacionDetalle.idJustificacion, comentario: comentarioNuevo, idOrigen: "1", fecha: fechaActualComentario};
                            	$scope.comentariosJustificacion.push(agregarComentarioJustificacion);
                                toastr.success('¡Comentario registrado con éxito!');
                            } else {
                            }
                        } else {
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