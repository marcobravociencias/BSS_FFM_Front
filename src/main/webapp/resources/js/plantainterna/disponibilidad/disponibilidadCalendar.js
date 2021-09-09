
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
                if ($scope.permisosDisponibilidad.filter(elemt => { return elemt.clave === 'accionEditaDisponibilidad'}).length === 1) {
                    console.log(info);
                    let eventObject = info.event;
    
                    $("#matutino_actualizar").val(eventObject._def.extendedProps.matutino);
                    $("#vespertino_actualizar").val(eventObject._def.extendedProps.vespertino);
                    if ($scope.banderaNocturno) {
                        document.getElementById('contenedor-editar-nocturno').style.display = 'block'
                        $("#nocturno_actualizar").val(eventObject._def.extendedProps.nocturno);
                    } else {
                        document.getElementById('contenedor-editar-nocturno').style.display = 'none'
                    }
                    $("#fecha_actualizar").val(eventObject._def.extendedProps.fecha);
    
                    let tipo_bloque = (eventObject._def.extendedProps.bloqueo)
    
                    if (!tipo_bloque) {
                        //$("#radio_activo_mod").trigger('click');
                        document.getElementById('radio_activo_mod').checked = true
                    } else {
                        //$("#radio_inactivo_mod").trigger('click');
                        document.getElementById('radio_inactivo_mod').checked = true;
                    }
                    $("#modificar_disponibilidad_modal").modal('show');
                }

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
                       
                        let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
                        let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
                            .filter(e => e.original.nivel == ultimonivel)
                            .map(e => parseInt(e.id))
                        let ultimoNIntervencion = $scope.obtenerUltimoNivelIntervencion();
                        let tipo_intervencion = $("#jstreeIntervencion").jstree("get_selected", true)
                            .filter(e => e.original.nivel == ultimoNIntervencion)
                            .map(e => parseInt(e.id))


                        if (tipo_intervencion.length === 0 || clustersparam.length === 0) {
                            mostrarMensajeWarningValidacion("Para agregar disponibilidad debes seleccionar todos los filtros")
                        } else {
                            if ($scope.permisosDisponibilidad.filter(elem => {return elem.clave === 'accionAgregaDisponibilidad'}).length === 1) {
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
                                    let fech = Number(format_mex[1]) - 1;
                                    let fechaMes = fech.length === 1 ? '0'.concat(fech) : String(fech);
                                    let fechaI = new Date(format_mex[0], fechaMes, format_mex[2])
                                    $('#fecha_inicio_adddisp').datepicker("setDate", new Date(fechaI));
                                    $('#fecha_fin_adddisp').datepicker("setDate", new Date(fechaI));
    
                                    //$("#fecha_inicio_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);
                                    //$("#fecha_fin_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);
    
                                    document.getElementById('matutino_adddisp').value = '';
                                    document.getElementById('vespertino_adddisp').value = '';
                                    document.getElementById('nocturno_adddisp').value = '';
                                    document.getElementById('radio_activo_adddisp').checked = true;
                                    document.getElementById('radio_inactivo_adddisp').checked = false;
                                    $("#moda-add-disponibilidad").modal('show')
                                }).catch(swal.noop);
                            }
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
                title: 'Matutino: ' + totalMatutinoEvent  + '\nVespertino: ' + totalVespertinoEvent + '\n' + TitleNocturno + 'Total: ' +  totalTurno,
                start: datosDisponibilidad.fecha,
                end: datosDisponibilidad.fecha,
                id: index,
                color: ((datosDisponibilidad.bloqueado)) ? bloq = '#b9bfbc' : bloq =  '#1c74bfb3',
                textColor: 'white',
                fecha: datosDisponibilidad.fecha,
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