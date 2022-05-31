var app = angular.module('vistaConfirmacionApp', []);

app.controller('vistaConfirmacionController', ['$scope', '$q', 'vistaConfirmacionService', '$filter', function ($scope, $q, vistaConfirmacionService, $filter) {
    $scope.detalleOt = {};
    let calendar_disponibilidad;
    $scope.calendarDisp;
    $scope.listadoMotivo = [];
    let arregloDisponibilidad = [];
    $scope.isSelected = false;
    $scope.objConfirmaDesc = {};

    $scope.inicialCalendario = function () {
        calendar_disponibilidad = document.getElementById('calendar_disponibilidad');

        $scope.calendarDisp = new FullCalendar.Calendar(calendar_disponibilidad, {
            height: 550,
            width: 650,
            locale: 'es',
            displayEventTime: true,
            selectable: true,
            eventLimit: true,
            editable: false,
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
                let eventObject = info.event;
                let turno = eventObject._def.title;
                $("#fechaAgendamiento").text(eventObject._def.extendedProps.fecha);
                $("#turnoAgendamiento").text(turno.split(" ")[0]);
                $scope.isSelected = true;
            },
            selectable: true
        });

        $scope.calendarDisp.render();
    }

    $scope.inicialCalendario();

    $scope.muestraDisponibilidadCalendar = function (response) {
        if ($scope.calendarDisp) {
            $scope.calendarDisp.destroy();
        }
        arregloDisponibilidad = [];

        let dato = (response.dias !== undefined && response.dias !== null) ? response.dias !== undefined ? response.dias : [] : [];
        let events;

        $.each(dato, function (index, datosDisponibilidad) {
            $.each(datosDisponibilidad.turnos, function (index2, turnos) {
                if (turnos.cantidad > 0) {
                    events = {
                        height: 800,
                        title: turnos.nombreTurno + ' ' + turnos.cantidad,
                        start: datosDisponibilidad.fecha,
                        end: datosDisponibilidad.fecha,
                        id: index,
                        color: ((datosDisponibilidad.bloqueado)) ? bloq = '#b9bfbc' : bloq = '#1c74bfb3',
                        textColor: 'white',
                        fecha: datosDisponibilidad.fecha,
                        bloqueo: datosDisponibilidad.bloqueado,
                        classNames: 'eventDisponibilidad'
                    }
                }
                arregloDisponibilidad.push(events)
            })
        })

        $scope.inicialCalendario();
    }


    $scope.buscarOS = function () {
        var url = new URL(window.location.href);
        var ot = url.searchParams.get("otconfirma");
        $scope.objConfirmaDesc.idOtConfirmaDesc = ot;
        let params = {
            idOt: ot
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        vistaConfirmacionService.consultarDetalleOT(params).then(function success(response) {
            swal.close();
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        let direccion = response.data.result.orden.direccion.calle + ' ' +
                            response.data.result.orden.direccion.numeroExterior + ' ' +
                            response.data.result.orden.direccion.numeroInterior + '. ' +
                            response.data.result.orden.direccion.colonia + ', ' +
                            response.data.result.orden.direccion.municipio + ', ' +
                            response.data.result.orden.direccion.estado + ' CP.' +
                            response.data.result.orden.direccion.codigoPostal + '. ';

                        response.data.result.orden.direccion = direccion;

                        $scope.detalleOt = response.data.result.orden;
                        $scope.consultaDisponibilidad();
                    } else {
                        toastr.warning('No se encontró la orden de trabajo');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion || 'No se encontr&oacute; informaci&oacute;n');
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta');
            }
        })
    }

    $scope.buscarCatalogoMotivo = function () {
        vistaConfirmacionService.consultarCatalogoEstatus().then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        //$scope.listadoMotivo = response.data.result;
                        $scope.listadoMotivo = response.data.result.filter(e => { return e.idPadre === 201 })
                    } else {
                        toastr.warning('No se encontró ningún valor en catalogo motivo');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion || 'No se encontr&oacute; informaci&oacute;n');
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta');
            }
        })
    }

    $scope.obtenerToken = function() {
        vistaConfirmacionService.obtenerToken().then(function success(response) {
            if (response.data !== undefined) {
                $scope.buscarOS();
                $scope.buscarCatalogoMotivo();
            } else {
                toastr.error('Ha ocurrido un error en la consulta');
            }
        })
    }
    $scope.obtenerToken();

    $scope.mostrarModalConfirmacion = function() {
        $("#modalConfirmaDesconfirma").modal('show');
    }

    $scope.consultaDisponibilidad = function () {
        let params = {
            subtipoIntervencion: 102, //$scope.detalleOt.idSubtipo,
            geografia2: 2047
        }
        vistaConfirmacionService.consultaDisponibilidad(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $scope.muestraDisponibilidadCalendar(response.data.result);
                    } else {
                        toastr.warning('No se encontró ningún valor en catalogo motivo');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta');
            }
        })
    }

    $scope.confirmarDesconfirmarOt = function () {
        if (!$scope.objConfirmaDesc.comentarios) {
            toastr.info("Captura comentarios");
            return false;
        }


        $scope.objConfirmaDesc.procesando = true
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            "idOrden": $scope.objConfirmaDesc.idOtConfirmaDesc,
            "idOrigen": 1,
            "esConfirmada": $scope.objConfirmaDesc.isConfirmadoDesconfirmado ? 1 : 0,
            "comentarios": $scope.objConfirmaDesc.comentarios
        }
        console.log("params", params)
        vistaConfirmacionService.confirmaDesconfirmaOtDespacho(params).then(function success(response) {
            $scope.banderaRegresarCheckbox = true;
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    $("#modalConfirmaDesconfirma").modal('hide')
                    console.log(response);
                    swal.close()
                    toastr.success('Cambio de estatus correcto');
                } else {
                    toastr.info("No se pudo cambiar el estatus de la ot");
                }
            } else {
                toastr.info("No se pudo cambiar el estatus de la ot");
            }
            $scope.objConfirmaDesc.procesando = false
        }).catch(err => handleError(err))
    }

    $scope.reagendar = function(){

        if($("#motivo-agenda").val() == "" || $("#motivo-agenda").val() == undefined){
            toastr.warning('Selecciona motivo');
            return false;
        }

        if($("#comentario-agenda").val() == ""){
            toastr.warning('Ingresa un comentario');
            return false;
        }
        
        if(!$scope.isSelected){
            toastr.warning('Selecciona fecha y turno en el calendario');
            return false;
        }

    }

}])