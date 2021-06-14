
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
                $("#matutino_actualizar").val(eventObject._def.extendedProps.matutino);
                $("#vespertino_actualizar").val(eventObject._def.extendedProps.vespertino);
                $("#nocturno_actualizar").val(eventObject._def.extendedProps.nocturno);
                $("#fecha_actualizar").val(fecha_modificada[2] + "/" + fecha_modificada[1] + "/" + fecha_modificada[0]);

                let tipo_bloque = (eventObject._def.extendedProps.bloqueo)

                if (tipo_bloque === "0") {
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
                        var distrito_cluster = '-1';

                        var selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
                        var selected_arbol;

                        $.each(selectedElms, function (index, elem) {
                            selected_arbol = elem.original;
                            console.log(elem)
                        });

                        if (selected_arbol !== undefined) {
                            if ($scope.session_propietario === '16') {
                                if (selected_arbol !== undefined && selected_arbol.Nivel === '5') {
                                    distrito_cluster = selected_arbol.id;
                                }
                            } else {
                                if (selected_arbol !== undefined && selected_arbol.Nivel === '3') {
                                    distrito_cluster = selected_arbol.id;
                                }
                            }
                        }

                        if (distrito_cluster === '-1' || $("#compania_select").val() === '-1' || $("#tipo_select").val() === '-1') {
                            $("#filters-dispo").shake({ count: 5, distance: 4, duration: 1000, vertical: false });
                            mostrarMensajeWarning("Para agregar disponibilidad debes seleccionar todos los filtros")
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
                                removerClasesElementosValidacion($scope.arrayIdsElementosValidacionAddDisp);
                                var format_mex = stringdateselected[0].split("-")
                                $('#fecha_inicio_adddisp').datepicker("setDate", new Date(format_mex[0], format_mex[1], format_mex[2]));
                                $('#fecha_fin_adddisp').datepicker("setDate", new Date(format_mex[0], format_mex[1], format_mex[2]));

                                $("#fecha_inicio_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);
                                $("#fecha_fin_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);

                                document.getElementById('matutino_adddisp').value = '';
                                document.getElementById('vespertino_adddisp').value = '';;
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

        let dato = (response.Disponibilidad !== undefined && response.Disponibilidad !== null) ? response.Disponibilidad.Dia !== undefined ? response.Disponibilidad.Dia : [] : [];
        let events;
        $.each(dato, function (index, datosDisponibilidad) {
            let TitleNocturno = ($scope.banderaNocturno) ? 'Nocturno: ' + datosDisponibilidad.Nocturno + '\n' : '';
            events = {
                height: 800,
                title: 'Matutino: ' + datosDisponibilidad.Matutino  + '\nVespertino: ' + datosDisponibilidad.Vespertino + '\n' + TitleNocturno + '  Total: ' + datosDisponibilidad.CapInicioDia,
                start: datosDisponibilidad.Fecha,
                end: datosDisponibilidad.Fecha,
                id: index,
                color: ((datosDisponibilidad.bloqueado) === "0") ? bloq = '#08d85c' : bloq = '#b9bfbc',
                textColor: 'white',
                matutino: datosDisponibilidad.Matutino,
                vespertino: datosDisponibilidad.Vespertino,
                nocturno: datosDisponibilidad.Nocturno,
                bloqueo: datosDisponibilidad.bloqueado,
                classNames: 'eventDisponibilidad'
            }
            arregloDisponibilidad.push(events)
        })
        $scope.inicialCalendario();
    }

}