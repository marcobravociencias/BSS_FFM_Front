app.agendamientoCalendar = function ($scope, bandejasSalesforceService) {

    let calendar_agendamiento;
    var calendarAgendamiento;
    let arregloDisponibilidad;
    $scope.isFechaSelected = false;

    $scope.initCalendarioAgendamiento = function (mes, anio) {
        let fechaCal;
        if (mes === undefined && anio === undefined) {
            fechaCal = new Date().toISOString().split('T')[0];
        } else {
            fechaCal = anio + '-' + mes + '-' + '01';
        }
        
        calendar_agendamiento = document.getElementById('calendar_agendamiento');
        calendarAgendamiento = new FullCalendar.Calendar(calendar_agendamiento, {
            height: 550,
            locale: 'es',
            displayEventTime: true,
            selectable: false,
            initialDate: fechaCal,
            editable: false,
            eventDurationEditable: false,
            dayMaxEventRows: 3,
            events: arregloDisponibilidad,
            moreLinkContent: function (args) {
                return '+' + args.num + ' m\u00E1s';
            },
            headerToolbar: {
                start: "",
                center: "title",
                end: "prev today next"
            },
            eventContent: function (eventObj) {
            },
            eventClick: function (info, jsEvent, view) {
                $scope.isFechaSelected = true;
                $scope.elementoCSP.turnoAgendamiento = info.event._def.extendedProps.tipo;
                $scope.elementoCSP.fechaAgendamiento = info.event._def.extendedProps.objetodisponibilidad.fecha;
            },
            dateClick: function (info) {
            },
            datesSet: function(info) {
            	verCalendario();
            }
        });
        calendarAgendamiento.render();
    }
    
    verCalendario = function() {
    	$("#calendar_agendamiento").css('visibility', 'visible');
    	$scope.flagCargandoCalendar = false;
	}	

    $scope.muestraDisponibilidadCalendar = function (listDisponibilidad) {
        if (calendarAgendamiento) {
            calendarAgendamiento.destroy();
        }
        arregloDisponibilidad = [];
        let eventoDisponibilibidadTurno = {};
        let arrayDisponibilidad = (listDisponibilidad.dias !== undefined && listDisponibilidad.dias !== null) ? listDisponibilidad.dias !== undefined ? listDisponibilidad.dias : [] : [];
        $.each(arrayDisponibilidad, function (indexD, elementDisp) {
            $.each(elementDisp.turnos, function (indexT, elementTurno) {
                if (elementTurno.cantidad !== 0) {
                    eventoDisponibilibidadTurno = {
                        title: elementTurno.nombreTurno + ': ' + elementTurno.cantidad,
                        tipo: elementTurno.nombreTurno,
                        start: elementDisp.fecha,
                        end: elementDisp.fecha,
                        id: indexD,
                        idTipoTurno: elementTurno.idCatTurno,
                        color: ((!elementDisp.bloqueado)) ? bloq = '#28a745' : bloq = '#b9bfbc',
                        textColor: 'white',
                        matutino: elementTurno.cantidad,
                        className: 'eventDisponibilidad',
                        defaultDate: moment(),
                        objetodisponibilidad: elementDisp
                    }
                    arregloDisponibilidad.push(eventoDisponibilibidadTurno)
                }
            })
        })
        $scope.initCalendarioAgendamiento();
    }

 
}