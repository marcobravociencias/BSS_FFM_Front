
app.disponibilidadCalendar = function ($scope) {

    let arregloDisponibilidad = [];
    let calHeight = 600;
    let calendar_disponibilidad;
    $scope.calendarDisp;

    $scope.inicialCalendario = function () {
        calendar_disponibilidad = document.getElementById('calendar_disponibilidad');

        $scope.calendarDisp = new FullCalendar.Calendar(calendar_disponibilidad, {
            height: 650,
            width: 650,
            locale: 'es',
            displayEventTime: true,
            selectable: true,
            eventLimit: true,
            editable: true,
            eventDurationEditable: false,
            events: arregloDisponibilidad,
            headerToolbar: {
                start: "",
                center: "title",
                end: "prev today next"
            },
            
            eventAfterAllRender: function () {
                calendarDisp.render();
            },
            eventClick: function (info) {
                console.log(info);
                removerClasesElementosValidacion($scope.arrayIdsModif);
                let eventObject = info.event;
                let fecha_nueva = new Date(eventObject._instance.range.start)
                let todayUTC = (fecha_nueva.getUTCFullYear() + '-' + (fecha_nueva.getUTCMonth() + 1) + '-' + fecha_nueva.getUTCDate());
                let fecha_modificada = (todayUTC).split('-')
                let lengFecha = fecha_modificada[1].length
                $("#matutino_actualizar").val(eventObject._def.extendedProps.matutino);
                $("#vespertino_actualizar").val(eventObject._def.extendedProps.vespertino);
                if ($scope.banderaNocturno) {
                    document.getElementById('contenedor-editar-nocturno').style.display = 'block'
                    $("#nocturno_actualizar").val(eventObject._def.extendedProps.nocturno);
                } else {
                    document.getElementById('contenedor-editar-nocturno').style.display = 'none'
                }
                $("#fecha_actualizar").val(lengFecha > 1 ? fecha_modificada[1] : '0'+fecha_modificada[1] + "-" + fecha_modificada[2] + '-'  + fecha_modificada[0]);

                let tipo_bloque = (eventObject._def.extendedProps.bloqueo)

                if (tipo_bloque) {
                    //$("#radio_activo_mod").trigger('click');
                    document.getElementById('radio_activo_mod').checked = true
                } else {
                    //$("#radio_inactivo_mod").trigger('click');
                    document.getElementById('radio_inactivo_mod').checked = true;
                }
                $("#modificar_disponibilidad_modal").modal('show');
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
                                removerClasesElementosValidacion($scope.arrayIdsElementosValidacionAddDisp);
                                var format_mex = stringdateselected[0].split("-")
                                $('#fecha_inicio_adddisp').datepicker("setDate", new Date(format_mex[0], format_mex[1], format_mex[2]));
                                $('#fecha_fin_adddisp').datepicker("setDate", new Date(format_mex[0], format_mex[1], format_mex[2]));

                                $("#fecha_inicio_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);
                                $("#fecha_fin_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);

                                document.getElementById('matutino_adddisp').value = '';
                                document.getElementById('vespertino_adddisp').value = '';
                                document.getElementById('nocturno_adddisp').value = '';
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

    $scope.muestraDisponibilidadCalendar = function (response) {
        if ($scope.calendarDisp) {
            $scope.calendarDisp.destroy();
        }
        arregloDisponibilidad = [];

        let dato = (response.dias !== undefined && response.dias !== null) ? response.dias !== undefined ? response.dias : [] : [];
        let events;
        let totalMatutino = 0;
        let totalVespertino = 0;
        let totalNocturno = 0;
        $.each(dato, function (index, datosDisponibilidad) {
            let totalMatutinoEvent = 0;
            let totalVespertinoEvent = 0;
            let totalNocturnoEvent = 0;
            let totalTurno = 0;
            datosDisponibilidad.turnos.forEach(turno =>{
                if (turno.idCatTurno === 1) {
                    totalMatutinoEvent = turno.cantidad;
                    totalMatutino += turno.cantidad;
                }
                if (turno.idCatTurno === 2) {
                    totalVespertinoEvent = turno.cantidad;
                    totalVespertino += turno.cantidad;
                }
                if (turno.idCatTurno === 3) {
                    totalNocturnoEvent = turno.cantidad;
                    totalNocturno += turno.cantidad;
                }
            });
            let TitleNocturno = ($scope.banderaNocturno) ? 'Nocturno: ' + totalNocturnoEvent + '\n' : '';
            if ($scope.banderaNocturno) {
                totalTurno = totalMatutinoEvent + totalVespertinoEvent + totalNocturnoEvent;
            } else {
                totalTurno = totalMatutinoEvent + totalVespertinoEvent;
            }
            events = {
                height: 800,
                title: 'Matutino: ' + totalMatutinoEvent  + '\nVespertino: ' + totalVespertinoEvent + '\n' + TitleNocturno + '  Total: ' +  totalTurno,
                start: datosDisponibilidad.fecha,
                end: datosDisponibilidad.fecha,
                id: index,
                color: ((datosDisponibilidad.bloqueado)) ? bloq = '#1c74bfb3' : bloq = '#b9bfbc',
                textColor: 'white',
                matutino: totalMatutinoEvent,
                vespertino: totalVespertinoEvent,
                nocturno: totalNocturnoEvent,
                bloqueo: datosDisponibilidad.bloqueado,
                classNames: 'eventDisponibilidad'
            }
            arregloDisponibilidad.push(events)
        })
        document.getElementById('matutino_dispo').innerHTML = totalMatutino;
        document.getElementById('vespertino_dispo').innerHTML = totalVespertino;
        if ($scope.banderaNocturno) {
            document.getElementById('nocturno_dispo').innerHTML = totalNocturno;
            document.getElementById('total_dispo').innerHTML = totalMatutino + totalVespertino + totalNocturno;
        } else {
            document.getElementById('nocturno_dispo').innerHTML = totalNocturno;
            document.getElementById('total_dispo').innerHTML = totalMatutino + totalVespertino;
        }
        $scope.inicialCalendario();
    }

}