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
    $scope.calendarTec;
    $scope.isEdit;
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

    $scope.convertDate = function (fecha) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(fecha)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    $scope.initCalendario = function (mes, anio) {
        if (mes === undefined && anio === undefined) {
            fecha2 = new Date().toISOString().split('T')[0];
        } else {
            fecha2 = anio + '-' + mes + '-' + '01';
        }
        calendar_gestionTecnicos = document.getElementById('calendar_gestionTecnicos');
        $scope.calendarTec = new FullCalendar.Calendar(calendar_gestionTecnicos, {
            height: 600,
            locale: 'es',
            displayEventTime: true,
            selectable: true,
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
                    console.log("No trabajado")
                    $scope.consultarDetalleJustificacion(idJust);
                } else if ($("#calendar_gestionTecnicos td[data-date=" + $scope.fechaDiaJust + "] div.actividades-contadorac-verde").length > 0) {
                    $scope.consultarDetalleTrabajo();
                    console.log("trabajado");
                } else {
                    console.log("trabajados");
                    $scope.isJustificacion = false;
                    $scope.openModalAgregarJustificacion();
                    $scope.$apply();
                }
            },
            selectable: true,
            datesSet: function () {
                setTimeout(function () {
                    $scope.calendarTec.render()
                }, 1000)
            }
        });
        setTimeout(function () {
            if (eventosDisponibilidad.length > 0) {
                eventosDisponibilidad.forEach(event => {
                    // console.log(event)
                    if (event.tipo === 'TRABAJADO') {
                        // console.log(moment(event.start).format('YYYY-MM-DD'));
                        if (!$('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top div').hasClass('actividades-contadorac-verde')) {
                            $('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top').append('<div class="actividades-contadorac-verde" data-value="' + event.objetodisponibilidad.idJustificacion + '">&nbsp;</div> ')
                        }
                    } else if (event.tipo === 'DIA JUSTIFICADO') {
                        // console.log(moment(event.start).format('YYYY-MM-DD'));
                        $('.fc-daygrid-day[data-date="' + moment(event.start).format('YYYY-MM-DD') + '"] .fc-daygrid-day-frame .fc-daygrid-day-top').append('<div class="actividades-contadorac-gris" data-value="' + event.objetodisponibilidad.idJustificacion + '">&nbsp;</div> ')
                    }
                });
            }
        }, 0500);
        $scope.calendarTec.render();
    }

    $scope.consultarMotivosJustificacion = function () {
        gestionTecnicosService.consultaMotivosGestionTecnicos().then(function success(response) {
            console.log(response)
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.listMotivosJustificacion = arrayCatMotivoJustificacion.data.result.MotivosJustificacion;
                    console.log($scope.listMotivosJustificacion);
                }
            }
        })
    }
    
    $scope.consultarTecnicos = function () {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {}; //se envian clusters
        // gestionTecnicosService.consultaTecnicosGestionTecnicos(params).then(function success(response) {
            // console.log(response)
            // if (response.data.respuesta) {
                // if (response.data.result) {
                    $scope.listTecnicos = arrayListTecnicos.data.result;
                    swal.close();
        //         } else{
        //             swal.close();
        //             mostrarMensajeWarningValidacion("No se encontraron T&eacute;cnicos")
        //         }
        //     } else {
        //         swal.close();
        //         mostrarMensajeWarningValidacion(response.data.resultDescripcion)
        //     }
        // });
    }

    $scope.initGestionTecnicos = function () {
        $scope.initCalendario();
        $scope.consultarMotivosJustificacion();
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
            "language": idioma_espanol_not_font,
            "sDom": 'Rfrtlip',

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
            "language": idioma_espanol_not_font,
            "sDom": 'Rfrtlip',

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
            "language": idioma_espanol_not_font,
            "sDom": 'Rfrtlip',

        });
        tableArchivosJustificacion = $('#tableArchivosJustificacion').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "sDom": 'Rfrtlip',

        });
        tableDetalleTrabajo = $('#tableDetalleTrabajo').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "autoWidth": false,
            "language": idioma_espanol_not_font,
            "sDom": 'Rfrtlip',
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
                if (disponibilidad.Fecha.includes('/')) {
                    fechaInicio = disponibilidad.Fecha.split('/');
                    fechaN = fechaInicio[1] + '/' + fechaInicio[0] + '/' + fechaInicio[2];
                    fetchtl = fechaInicio[2] + '-' + fechaInicio[1] + '-' + fechaInicio[0];
                    newFecha = new Date(fechaN);
                } else {
                    fechaInicio = disponibilidad.Fecha.split('-');
                    let fechaE = fechaI[2].split(' ');
                    fechaN = fechaI[1] + '-' + fechaE[0] + '-' + fechaI[0];
                    newFecha = new Date(fechaN);
                }
                // console.log(fechaN + ' - ' + newFecha)
                let arrayValidacion = eventosDisponibilidad.filter(function (element) { return $scope.convertDate(element.start) === $scope.convertDate(newFecha) });
                if (arrayValidacion.length === 0) {
                    if (disponibilidad.idJustificacion === '0') {
                        if (disponibilidad.Disponible !== undefined) {
                            eventDisponibilidad = {
                                title: "Tiempo Disponible: " + disponibilidad.Disponible,
                                tipo: 'TIEMPONOTRABAJANO',
                                start: newFecha,
                                end: newFecha,
                                tipoevento: 'tiemponotrabajando',
                                usuario: $scope.idTecnico,
                                objetodisponibilidad: disponibilidad
                            }
                            eventosDisponibilidad.push(eventDisponibilidad);
                        }
                        if (disponibilidad.EnTrabajo !== undefined) {
                            eventDisponibilidad = {
                                title: "Tiempo Trabajado: " + disponibilidad.EnTrabajo,
                                tipo: 'TIEMPOTRABAJANO',
                                start: newFecha,
                                end: newFecha,
                                tipoevento: 'tiempotrabajando',
                                usuario: $scope.idTecnico,
                                objetodisponibilidad: disponibilidad
                            }
                            eventosDisponibilidad.push(eventDisponibilidad);
                        }
                        if (disponibilidad.HoraFin !== undefined) {
                            let horaFin = disponibilidad.HoraFin.split(' ');
                            eventDisponibilidad = {
                                height: 800,
                                title: disponibilidad.HoraFin == 'SIN INFORMACION' ? 'sin informacion' : moment(horaFin[0], "hh::mm").format('LT'),
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
                        if (disponibilidad.HoraInicio !== undefined) {
                            let horaInicio = disponibilidad.HoraInicio.split(' ');
                            eventDisponibilidad = {
                                title: disponibilidad.HoraInicio == 'SIN INFORMACION' ? 'sin informacion' : moment(horaInicio[0], "hh::mm").format('LT'),
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
                    }
                }
            });
            /*
            listOts.forEach(ot => {
                console.log(ot);
                let newFecha;
                let fechaInicio;
                let fechaN;
                if (ot.Fecha.includes('/')) {
                    fechaInicio = ot.Fecha.split('/');
                    fechaN = fechaInicio[1] + '/' + fechaInicio[0] + '/' + fechaInicio[2];
                    newFecha = new Date(fechaN);
                } else {
                    fechaInicio = ot.Fecha.split('-');
                    let fechaE = fechaI[2].split(' ');
                    fechaN = fechaI[1] + '-' + fechaE[0] + '-' + fechaI[0];
                    newFecha = new Date(fechaN);
                }
                console.log(fechaN + ' - ' + newFecha)
                eventDisponibilidad = {
                    title: "OTs Atendidas: " + ot.Cantidad,
                    tipo: 'TRABAJADAS',
                    start: fetchtl,
                    end: fetchtl,
                    tipoevento: 'trabajadas',
                    usuario: $scope.idTecnico,
                    objetoOT: ot
                }
                eventosDisponibilidad.push(eventDisponibilidad);
            });
            */
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
            case 'Enero':
                return '01';
            case 'Febrero':
                return '02';
            case 'Marzo':
                return '03';
            case 'Abril':
                return '04';
            case 'Mayo':
                return '05';
            case 'Junio':
                return '06';
            case 'Julio':
                return '07';
            case 'Agosto':
                return '08';
            case 'Septiembre':
                return '09';
            case 'Octubre':
                return '10';
            case 'Noviembre':
                return '11';
            case 'Diciembre':
                return '12';
        }
    }

    $scope.consultarDisponibilidadTecnico = function (tecnico) {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isDetalle = false;
        $scope.tipoConsulta = 'TEC';
        // let paramsTc = {};
        // gestionTecnicosService.consultaDisponibilidadTecGestionTecnicos(params).then(function success(response) {
        // });
        
        if (tecnico !== undefined) {
            $.each($scope.listTecnicos, function (i, elemento) {
                document.getElementById('' + elemento.id).style.backgroundColor = "white";
                document.getElementById('tec-' + elemento.id).style.color = "grey";
                document.getElementById('aux-' + elemento.id).style.color = "grey";
            });
            const fechaActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
            const fechaArray = fechaActual.split(" ");
            const mes = $scope.getMes(fechaArray[0]);
            console.log(mes);
            $scope.tecnicoDisp = tecnico;
            $scope.idTecnico = tecnico.id;
            console.log($scope.tecnicoDisp)
            console.log($scope.idTecnico)
            $("#" + $scope.tecnicoDisp.id).css("background-color", "#DCDEDC");
            $("#tec-" + $scope.tecnicoDisp.id).css("color", "#7716fa");
            
            $scope.resultDisponibilidad = arrayDisponibilidadTec.data.result;
            $scope.pintarDisponibilidad($scope.resultDisponibilidad.Disponibilidad, $scope.resultDisponibilidad.totalOts ? $scope.resultDisponibilidad.totalOts : [], mes, fechaArray[1]);

            $scope.isTecnicoSelected = true;
            $scope.changeView();
        } else {
            if ($scope.tecnicoDisp !== undefined) {
                const fechaActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
                const fechaArray = fechaActual.split(" ");
                const mes = $scope.getMes(fechaArray[0]);
                console.log(mes);
                console.log($scope.tecnicoDisp)
                console.log($scope.idTecnico)
                $("#" + $scope.tecnicoDisp.id).css("background-color", "#DCDEDC");
                $("#tec-" + $scope.tecnicoDisp.id).css("color", "#7716fa");
                $scope.resultDisponibilidad = [];
                $scope.pintarDisponibilidad($scope.resultDisponibilidad.Disponibilidad, $scope.resultDisponibilidad.totalOts ? $scope.resultDisponibilidad.totalOts : [], mes, fechaArray[1]);
                $scope.isTecnicoSelected = true;
                $scope.changeView();

            }
        }
        swal.close();
    }

    $scope.consultarDisponibilidadAux = function (tecnico) {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isDetalle = false;
        $scope.tecnicoDisp = tecnico;
        $scope.tipoConsulta = 'AUX';
        const fechaActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
        const fechaArray = fechaActual.split(" ");
        const mes = $scope.getMes(fechaArray[0]);
        $.each($scope.listTecnicos, function (i, elemento) {
            document.getElementById('' + elemento.id).style.backgroundColor = "white";
            document.getElementById('tec-' + elemento.id).style.color = "grey";
            document.getElementById('aux-' + elemento.id).style.color = "grey";
        });
        $("#" + $scope.tecnicoDisp.id).css("background-color", "#DCDEDC");
        $("#aux-" + $scope.tecnicoDisp.id).css("color", "#7716fa");
        $scope.isTecnicoSelected = true;
        $scope.changeView();
        // console.log($scope.tecnicoDisp);
        $scope.resultDisponibilidad = arrayDisponibilidadTec.data.result;
        $scope.pintarDisponibilidad($scope.resultDisponibilidad.Disponibilidad, $scope.resultDisponibilidad.totalOts ? $scope.resultDisponibilidad.totalOts : [], mes, fechaArray[1]);
        swal.close();
    }

    $scope.pintarTablaOtsTrabajadas = function () {
        let arrayOtsRow = [];
        if (tableOtsTrabajadas) {
            tableOtsTrabajadas.destroy();
        }
        $.each($scope.listJustificaciones, function (i, elemento) {
            let rowOT = [];
            rowOT[0] = elemento.ot;
            rowOT[1] = elemento.os;
            rowOT[2] = elemento.cuenta;
            rowOT[3] = elemento.tipo;
            rowOT[4] = elemento.subtipo;
            rowOT[5] = elemento.fechaInicio;
            rowOT[6] = elemento.fechaFin;
            rowOT[7] = elemento.usuarioAuxiliar;
            rowOT[8] = elemento.nombreAuxiliar;
            rowOT[9] = elemento.puntualidad;
            rowOT[10] = elemento.tiempoTotal;
            rowOT[11] = elemento.tiempoTotal;
            arrayOtsRow.push(rowJ);
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
        });
    }

    $scope.pintarTablaDiasTrabajados = function () {
        let arrayDiasTRow = [];
        if (tableDiasTrabajados) {
            tableDiasTrabajados.destroy();
        }
        $.each($scope.listJustificaciones, function (i, elemento) {
            let rowDT = [];
            rowDT[0] = elemento.fecha;
            rowDT[1] = elemento.horaInicio;
            rowDT[2] = elemento.horaFin;
            rowDT[3] = elemento.ots;
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
        });
    }

    $scope.pintarTablaJustificaciones = function () {
        let arrayJustificacionRow = [];
        if (tableJustificaciones) {
            tableJustificaciones.destroy();
        }
        $.each($scope.listJustificaciones, function (i, elemento) {
            let rowJ = [];
            rowJ[0] = elemento.emp_crea;
            rowJ[1] = elemento.nomb_crea;
            rowJ[2] = elemento.folio;
            rowJ[3] = elemento.inicio;
            rowJ[4] = elemento.fin;
            rowJ[5] = elemento.fecha_registro;
            rowJ[6] = elemento.fecha_modificacion;
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
        });
    }

    $scope.consultarDetalleJustificacion = function (idJustificacion) {
        swal({ text: 'Cargando datos ...', allowOutsideClick: false });
        swal.showLoading();
        // console.log(idJustificacion);
        $scope.isDetalle = true;
        $scope.isJustificacion = true;
        $scope.justificacionDetalle = arrayDetalleJustificacion.data.result.Detalle;
        $scope.$apply();
        // console.log($scope.justificacionDetalle);
        swal.close();
    }

    $scope.consultarDetalleMesTecnico = function () {
        $scope.isDetalleMesTecnico = true;
        const mesActual = document.getElementsByClassName('fc-toolbar-title')[0].innerText;
        $scope.tituloDetalle = mesActual.toUpperCase();
        const fechaArray = mesActual.split(" ");
        $scope.listJustificaciones = arrayTableDetalleJustificacion.data.result;
        $scope.pintarTablaJustificaciones();
    }

    $scope.changeView = function () {
        if ($scope.isDetalleMesTecnico) {
            $scope.isDetalleMesTecnico = false;
        }
        if (!$scope.isCargaArchivos) {
            $scope.isCargaArchivos = true;
        } else {
            $scope.isCargaArchivos = false;
        }
    }

    $scope.consultarComentariosJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.comentariosJustificacion = arrayComentariosJustificacion.data.result.Comentarios;
        // console.log($scope.comentariosJustificacion);
        $("#modal-comentarios-justificacion").modal('show');
        swal.close();
    }

    $scope.consultarArchivosJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isCargaArchivos = false;
        let arrayRow = [];
        if (tableArchivosJustificacion) {
            tableArchivosJustificacion.destroy();
        }
        $scope.listArchivosJustificacion = arrayArchivosJustificacion.data.result.Archivos;
        // console.log($scope.listArchivosJustificacion);
        $.each($scope.listArchivosJustificacion, function (i, elemento) {
            let row = [];
            row[0] = elemento.NombreUsuario;
            row[1] = elemento.Nombre;
            row[2] = elemento.Fecha;
            row[3] = '<span style="background-color: #58b3bf" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" id="descargarArchivo' + elemento.idArchivo + '" onclick="">' +
                '<i class="fas fa-download" title="Descargar Archivo"></i>' +
                '</span> &nbsp;' +
                '<span style="background-color: #58b3bf" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnTables" id="descargarArchivo' + elemento.idArchivo + '" onclick="">' +
                '<i class="far fa-trash-alt" title="Descargar Archivo"></i>' +
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
            "language": idioma_espanol_not_font
        });
        $("#modal-archivos-justificacion").modal('show');
        swal.close();
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
    $("#fileArch").change(function () {
        if ($('#fileArch').get(0).files[0] === undefined) {
            $(".text_select").text("Selecciona un archivo");
            $(".box__dragndrop").text("o arrastra aqu\u00ED");
        } else {
            $(".text_select").text($('#fileArch').get(0).files[0].name);
            $(".box__dragndrop").empty()
        }
    });

    $scope.openModalAgregarJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $("#modal-agregar-justificacion").modal('show');
        swal.close();
    }

    $scope.openModalEditarJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isEdit = true;
        $("#modal-editar-justificacion").modal('show');
        swal.close();
    }

    $scope.editarJustificacion = function () { }

    $scope.openModalEliminarJustificacion = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isEdit = false;
        $("#modal-editar-justificacion").modal('show');
        swal.close();
    }

    $scope.eliminarJustificacion = function () { }

    $scope.consultarDetalleTrabajo = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.isDetalle = false;
        $scope.$apply();
        let arrayRow = [];
        if (tableDetalleTrabajo) {
            tableDetalleTrabajo.destroy();
        }
        $scope.listDetalleTrabajo = arrayDetalleTrabajo.data.result;
        // console.log($scope.listDetalleTrabajo)
        $.each($scope.listDetalleTrabajo, function (i, elemento) {
            let row = [];
            row[0] = elemento.ot;
            row[1] = elemento.os;
            row[2] = elemento.cuenta;
            row[3] = elemento.cliente;
            row[4] = elemento.tipo;
            row[5] = elemento.subtipo;
            row[6] = elemento.puntualidad;
            row[7] = elemento.fechaAgenda;
            row[8] = elemento.fechaInicio;
            row[9] = elemento.fechaFin;
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
        swal.close();
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
                // console.log(droppedFiles[0].name);
                $(".text_select").text(droppedFiles[0].name);
                $(".box__dragndrop").empty()
            });
        });
    });

}]);