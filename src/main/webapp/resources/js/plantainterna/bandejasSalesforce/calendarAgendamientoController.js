app.agendamientoCalendar = function ($scope, bandejasSalesforceService) {

    let calendar_agendamiento;
    $scope.calendarAgendamiento;
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
        $scope.calendarAgendamiento = new FullCalendar.Calendar(calendar_agendamiento, {
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
                $scope.$apply();
            },
            dateClick: function (info) {
            },
            datesSet: function () {
                setTimeout(function () {
                    $scope.calendarAgendamiento.render()
                }, 1000)
            }
        });
        setTimeout(function () {
        }, 0500);
        $scope.calendarAgendamiento.render();
    }

    $scope.muestraDisponibilidadCalendar = function (listDisponibilidad) {
        if ($scope.calendarAgendamiento) {
            $scope.calendarAgendamiento.destroy();
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

    $scope.consultarDisponibilidadBandejas = function () {
        swal({ text: 'Espera un momento ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            subtipoIntervencion: 121,
            geografia2: 2047
        }
        bandejasSalesforceService.consultaDisponibilidadAgendamiento(params).then(function success(response) {
            console.log(response);
            if (response.data) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.dias.length) {
                            swal.close();
                            $scope.muestraDisponibilidadCalendar(response.data.result);
                        } else {
                            $scope.muestraDisponibilidadCalendar([]);
                            mostrarMensajeInformativo("No se encontr&oacute; Disponibilidad");
                            swal.close();
                        }
                    } else {
                        $scope.muestraDisponibilidadCalendar([]);
                        mostrarMensajeInformativo("No se encontr&oacute; Disponibilidad");
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
}