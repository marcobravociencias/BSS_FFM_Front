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
            select: function (start, end, jsEvent, view) {

                //if (agrega_sess) {
                var stringdateselected = moment(start.start).format().split('T')
                var stringhoydate = moment(new Date()).format('YYYY-MM-DD');

                if (new Date(stringdateselected[0]) >= new Date(stringhoydate)) {

                    /** Valida si no hay ningun evento lo agrega**/
                    var allEvents = arregloDisponibilidad;//$('#calendar_disponibilidad').fullCalendar('clientEvents');
                    var exists = false;
                    $.each(allEvents, function (index, event) {
                        if (stringdateselected[0] === event.start) {
                            exists = true;
                        }
                    });

                    if (!exists) {
                        console.log("tiene eventos")
                        let tipoIntervencion = $scope.intervencionSelect ? $scope.intervencionSelect.id : 0;

                        let ultimonivel=$scope.obtenerNivelUltimoJerarquia()
                        let clustersparam=$("#jstreeconsulta").jstree("get_selected", true)
                                                               .filter(e=>e.original.nivel== ultimonivel)
                                                               .map(e=>parseInt(e.id))
                        

                        if (tipoIntervencion === 0 || clustersparam.length === 0) {
                            mostrarMensajeWarningValidacion("Para agregar disponibilidad debes seleccionar todos los filtros")
                        } else {
                            swal({
                                title: "\u00BFDeseas agregar disponibilidad en este dia ?",
                                type: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'S\u00ED, agregar',
                                cancelButtonText: "Cancelar",
                            }).then(function () {
                                if ($scope.banderaNocturno) {
                                    document.getElementById('container-noc').style.display = 'block'
                                } else {
                                    document.getElementById('container-noc').style.display = 'none'
                                }
                                var format_mex = stringdateselected[0].split("-")
                                $('#fecha_inicio_adddisp').datepicker("setDate", new Date(format_mex[0], format_mex[1], format_mex[2]));
                                $('#fecha_fin_adddisp').datepicker("setDate", new Date(format_mex[0], format_mex[1], format_mex[2]));

                                $("#fecha_inicio_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);
                                $("#fecha_fin_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);

                                document.getElementById('matutino_adddisp').value = '';
                                document.getElementById('vespertino_adddisp').value = '';
                                document.getElementById('nocturno_adddisp').value = '';
                                document.getElementById('radio_activo_adddisp').checked = false;
                                document.getElementById('radio_inactivo_adddisp').checked = false;
                                $("#moda-add-disponibilidad").modal('show')
                            }).catch(swal.noop);
                        }

                    }
                }
                //}
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