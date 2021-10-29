app.calendarController = function ($scope, ordenesUniversalesService) {

    let arregloDisponibilidad = [];
    let calHeight = 600;
    let calendar_disponibilidad;
    $scope.calendarDisp;


    $scope.inicialCalendario = function () {
        calendar_disponibilidad = document.getElementById('calendar_disponibilidad');
        console.log(arregloDisponibilidad);
        $scope.calendarDisp = new FullCalendar.Calendar(calendar_disponibilidad, {
            height: 650,
            locale: 'es',
            displayEventTime: true,
            selectable: true,
            editable: true,
            eventDurationEditable: false,
            events: arregloDisponibilidad,
            headerToolbar: {
                start: "",
                center: "title",
                end: "prev today next"
            },
            
            eventClick: function (info, jsEvent, view) {
                console.log(info);
                let eventObject = info.event;

                $scope.infoBasica.turno = eventObject._def.extendedProps.tipo + " / " + eventObject.startStr
                $scope.infoBasica.turnotext=eventObject._def.extendedProps.tipo
                $scope.infoBasica.fechaTurnoText=eventObject.startStr
                $scope.infoBasica.idTurnoSeleccion=eventObject._def.extendedProps.idTipoTurno            
                $scope.dateSelectedCalendarEvent=info.event.start

                $scope.$apply()                           
            },
            selectable: true,
            datesSet :function(){
                setTimeout(function(){
                    $scope.calendarDisp.render()
                },1000) 
            }

        });

        $scope.calendarDisp.render();
    }
    $scope.inicialCalendario();

    $scope.muestraDisponibilidadCalendar = function (response) {
        console.log("inicia");
        if ($scope.calendarDisp) 
            $scope.calendarDisp.destroy();
        
        arregloDisponibilidad = [];
        let eventoDisponibilibidadTurno={};
        let arrayDisponibilidad = (response.dias !== undefined && response.dias !== null) ? response.dias !== undefined ? response.dias : [] : [];
        console.log(arrayDisponibilidad);
        $.each(arrayDisponibilidad, function(index, disponibInd){
            
            $.each(disponibInd.turnos,function(indexj,eventInd){               
                if (eventInd.cantidad !== 0) {
                    eventoDisponibilibidadTurno ={
                        title      : eventInd.nombreTurno+': '+eventInd.cantidad,
                        tipo       : eventInd.nombreTurno,
                        start      : disponibInd.fecha,
                        end        : disponibInd.fecha,
                        id         : index,
                        idTipoTurno: eventInd.idCatTurno,
                        color      : ((!disponibInd.bloqueado)) ? bloq = '#08d85c' : bloq = '#b9bfbc' ,
                        textColor  : 'white',
                        matutino   : eventInd.cantidad,
                        className: 'eventDisponibilidad',
                        defaultDate: moment(),
                        objetodisponibilidad:disponibInd
                    }
                    arregloDisponibilidad.push(eventoDisponibilibidadTurno)
                }
            })
            
        })
        $scope.inicialCalendario();
    }

}