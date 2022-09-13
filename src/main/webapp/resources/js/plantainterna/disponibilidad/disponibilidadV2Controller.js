app.disponibilidadV2Controller = function ($scope, disponibilidadService, genericService) {

    $scope.listaIntervencionesDispV2 = [];
    $scope.listTurnosUsuarioDispV2 = [];
    $scope.mostrarColumnaNoIntervenciones = 0;
    $scope.disponibilidadActV2 = [];
    $scope.intervencionActDispV2 = {};
    $scope.geografiaActV2 = {};
    $scope.resultDisponibilidadV2 = [];
    $scope.totalesDisponibilidadV2 = [];

    $scope.initDisponibilidadv2 = function () {
        $('#filtro_fecha_inicio_disponibilidadv2').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false,
        });
        $('#filtro_fecha_fin_disponibilidadv2').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false,
        });
        $('#fechaInicio_actualizar_Dispv2').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false,
        });
        $('#fechaFin_actualizar_Dispv2').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false,
        });
        $('#fechaInicio_actualizar_Dispv2').datepicker('update', new Date());
        $('#fechaFin_actualizar_Dispv2').datepicker('update', new Date());
        $('#filtro_fecha_inicio_disponibilidadv2').datepicker('update', new Date());
        $('#filtro_fecha_fin_disponibilidadv2').datepicker('update', new Date());
    }

    $scope.initDisponibilidadv2();

    $scope.showDisponibilidadv2 = function () {
        if($scope.isContentDisponibilidadv2){
            $scope.isContentDisponibilidadv2 = false;
        } else {
            $scope.isContentDisponibilidadv2 = true;
        }
    }

    $scope.abrirModalGeografiaDisponibilidadV2 = function () {
        $('#modal_cluster_arbol_diponibilidad').modal('show');
        $scope.isDisponibilidad = false;
        $scope.isDisponibilidadV2 = true;
        setTimeout(function () {
            $("#buscadorGeografiaDispV2").focus();
        }, 750);
    }

    $scope.busquedaGeografiaDisponibilidadV2 = function () {
        $("#geografiaDisponibilidadv2").jstree("search", $('#buscadorGeografiaDispV2').val());
    }

    $scope.filtrarIntervencionesDisponibilidadV2 = function () {
        $('#modalFiltroIntervencionDispV2').modal('show');
    }

    $scope.checkIntervencionDispV2 = function (item) {
        $scope.listaIntervencionesDispV2.map(intervencion => {
            if (item.isVisible) {
                if (intervencion.id === item.id) {
                    intervencion.isVisible = false;
                }
            } else {
                if (intervencion.id === item.id) {
                    intervencion.isVisible = true;
                }
            }
            return intervencion;
        });
        $scope.mostrarColumnaNoIntervenciones = $scope.listaIntervencionesDispV2.filter(intervencion => { return intervencion.isVisible }).length;
    }

    $scope.checkAllIntervencionDispV2 = function () {
        if ($("#ckeckAllIntervencionDispV2").is(":checked")) {
            $scope.listaIntervencionesDispV2.map(intervencion => { return intervencion.isVisible = true })
            $scope.mostrarColumnaNoIntervenciones = $scope.listaIntervencionesDispV2.filter(intervencion => { return intervencion.isVisible }).length;
        } else {
            $scope.listaIntervencionesDispV2.map(intervencion => { return intervencion.isVisible = false })
            $scope.mostrarColumnaNoIntervenciones = $scope.listaIntervencionesDispV2.filter(intervencion => { return intervencion.isVisible }).length;
        }
    }

    $scope.btnAceptarGeografiaConsultaDispV2 = function () {
        var geografias = $('#geografiaDisponibilidadv2').jstree("get_selected", true);
        let textoGeografias = [];
        angular.forEach(geografias, (geografia, index) => {
            textoGeografias.push(geografia.text);
        });
        $('#textGeografiaDispov2').val(textoGeografias);
        if (textoGeografias.length > 0) {
            $("#textGeografiaDispov2").css("border-bottom", "2px solid #d9d9d9");
        }
    }

    $scope.getFechaFormatoDispV2 = function (fecha, accion) {
        if (accion == 'consultaDisponibilidad') {
            let fechaPrueba = fecha.split('/');
            return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
        } else if (accion == 'actualizaDisponibilidad') {
            let fechaPrueba = fecha.split('-');
            return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
        } else if (accion == 'abrirActualizaDisponibilidad') {
            let fechaPrueba = fecha.split('-');
            return fechaPrueba[0] + '/' + fechaPrueba[1] + '/' + fechaPrueba[2];
        } else if (accion == 'pintarDisponibilidad') {
            let fechaPrueba = fecha.split('/');
            return new Date(+fechaPrueba[2], fechaPrueba[1] - 1, +fechaPrueba[0]);
        } else if (accion == 'tablaDisponibilidad') {
            let fechaPrueba = fecha.split('-');
            return new Date(fechaPrueba[0] + '-' + fechaPrueba[1] + '-' + fechaPrueba[2]);
        } else {
            let fechaPrueba = fecha.split('-');
            return new Date(fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0]);
        }
    }

    $scope.validarFechaDispv2 = function (idFechaInicio, idFechaFin) {
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

    padTo2DigitsDV2 = function (num) {
        return num.toString().padStart(2, '0');
    }

    formatDateDV2 = function (date) {
        return [
            padTo2DigitsDV2(date.getDate()),
            padTo2DigitsDV2(date.getMonth() + 1),
            date.getFullYear(),
        ].join('-');
    }

    $scope.getFechasDispV2 = function () {
        let fechaI = $scope.getFechaFormatoDispV2(document.getElementById('filtro_fecha_inicio_disponibilidadv2').value, 'pintarDisponibilidad');
        let fechaF = $scope.getFechaFormatoDispV2(document.getElementById('filtro_fecha_fin_disponibilidadv2').value, 'pintarDisponibilidad');
        let diferencia = (fechaF - fechaI) / (1000 * 60 * 60 * 24)
        let arrayFechas = []
        for (let x = 1; x <= diferencia + 1; x++) {
            if (x === 1) {
                arrayFechas.push(formatDateDV2(fechaI))
            } else {
                let resultSumaFecha = fechaI.setDate(fechaI.getDate() + 1)
                let fechaR = formatDateDV2(new Date(resultSumaFecha))
                arrayFechas.push(fechaR)
            }
        }
        return arrayFechas
    }

    $scope.pintarTablaDisponibilidadV2 = function () {
        document.getElementById('container-table-disponibilidadv2').innerHTML = '';
        let arrayFechaTemporal = $scope.getFechasDispV2();
        let contenido = '';
        let intervencionesTemporal = angular.copy($scope.listaIntervencionesDispV2.filter(intervencion => { return intervencion.isVisible })
            .map(objeto => { return { id: objeto.id, descripcion: objeto.nombre } }));

        $.each(arrayFechaTemporal, function (indexF, fechaTemporal) {
            $scope.arrayDispGeocercas = [];
            $scope.arrayTotalDisp = [];
            let contentDivPrincipal = '<div class="col-table-disponibilidadv2">';
            let contentFinalDivPrincipal = '</div>';
            let principioTablaDisponibilidad = '<table id="disponibilidadv2-table" class="table table-bordered disponibilidadv2-table">';
            let finalTableDisponibilidad = '</table>';
            let theadTable = '';
            let contentTeadGeocercas = '';
            let thGeocercasTurnos = '';
            let tdBodyTable = '';
            let contenidoTbody = '';
            let thTurnosTotal = '';
            $.each(intervencionesTemporal, function (indexI, intervencion) {
                let trInicioBodyTable = '<tr>';
                let trFinBodyTable = '</tr>';
                let tdColumna = '';
                $.each($scope.resultDisponibilidadV2, function (indexD, disp) {
                    let fechaDisp = new Date($scope.getFechaFormatoDispV2(disp.fecha, 'tablaDisponibilidad')).getTime();
                    let fechaTemp = new Date($scope.getFechaFormatoDispV2(fechaTemporal, ' ')).getTime();
                    if (parseInt(disp.idIntervencion) === intervencion.id && fechaDisp == fechaTemp) {
                        $scope.arrayDispGeocercas.push(disp);
                    }
                });
                $.each($scope.listaGeografiaTabla, function (indexG, geografia) {
                    let arrayElementDispo = $scope.arrayDispGeocercas.filter(e => e.idGeografia === geografia.id && e.idIntervencion == intervencion.id);
                    $.each($scope.listTurnosUsuarioDispV2, function (indexTU, turno) {
                        if (arrayElementDispo && arrayElementDispo.length) {
                            let objDispo = arrayElementDispo.find(e => parseInt(e.idTurno) == turno.id);
                            if (objDispo) {
                                tdColumna += '<td class="td-capacidad-geocercas" style="cursor: pointer" onclick="abrirModalActualizarDisponibilidadv2(\'' + fechaTemporal + '\',' + geografia.id + ',' + intervencion.id + ')" title="' + fechaTemporal + ' - ' + geografia.descripcion + ' - ' + turno.nombre + '">' + objDispo.disponibilidadActual + '</td>';
                            } else {
                                tdColumna += '<td class="td-capacidad-geocercas" style="cursor: pointer" onclick="abrirModalActualizarDisponibilidadv2(\'' + fechaTemporal + '\',' + geografia.id + ',' + intervencion.id + ')" title="' + fechaTemporal + ' - ' + geografia.descripcion + ' - ' + turno.nombre + '">0</td>';
                            }
                        } else {
                            tdColumna += '<td class="td-capacidad-geocercas" style="cursor: pointer" onclick="abrirModalActualizarDisponibilidadv2(\'' + fechaTemporal + '\',' + geografia.id + ',' + intervencion.id + ')" title="' + fechaTemporal + ' - ' + geografia.descripcion + ' - ' + turno.nombre + '">0</td>';
                        }
                    });
                });

                $.each($scope.totalesDisponibilidadV2, function (indexTD, totalD) {
                    let fechaDisp = new Date($scope.getFechaFormatoDispV2(totalD.fecha, 'tablaDisponibilidad')).getTime();
                    let fechaTemp = new Date($scope.getFechaFormatoDispV2(fechaTemporal, ' ')).getTime();
                    if (parseInt(totalD.intervencion) === intervencion.id && fechaDisp == fechaTemp) {
                        $scope.arrayTotalDisp.push(totalD);
                    }
                });

                let arrayElementsTotal = $scope.arrayTotalDisp.find(e => parseInt(e.intervencion) == intervencion.id);
                $.each($scope.listTurnosUsuarioDispV2, function (indexG, turno) {
                    if (arrayElementsTotal && arrayElementsTotal.turno && arrayElementsTotal.turno.length) {
                        let objTotal = arrayElementsTotal.turno.find(e => parseInt(e.id) == turno.id);
                        if (objTotal) {
                            tdColumna += '<td class="td-capacidad-geocercas" style="cursor: default" title="' + fechaTemporal + ' - ' + turno.nombre + '">' + objTotal.total + '</td>';
                        } else {
                            tdColumna += '<td class="td-capacidad-geocercas" style="cursor: default" title="' + fechaTemporal + ' - ' + turno.nombre + '">0</td>';
                        }
                    } else {
                        tdColumna += '<td class="td-totales-disponibilidad-turno" style="cursor: default" title="' + fechaTemporal + ' - ' + turno.nombre + '">0</td>';
                    }
                });
                if (arrayElementsTotal && arrayElementsTotal.total) {
                    tdColumna += '<td class="td-totales-disponibilidad" style="cursor: default" title="' + fechaTemporal + '">' + arrayElementsTotal.total + '</td>';
                } else {
                    tdColumna += '<td class="td-totales-disponibilidad" style="cursor: default" title="' + fechaTemporal + '">0</td>';
                }

                contenidoTbody += trInicioBodyTable + tdColumna + trFinBodyTable;
            });
            $.each($scope.listaGeografiaTabla, function (indexG2, geografia2) {
                contentTeadGeocercas += '<th colspan="' + $scope.listTurnosUsuarioDispV2.length + '" class="th-geocercas">' + geografia2.descripcion + '</th>';
                $.each($scope.listTurnosUsuarioDispV2, function (indexG, turno) {
                    thGeocercasTurnos += '<th>' + turno.nombre + '</th>';
                });
            });

            $.each($scope.listTurnosUsuarioDispV2, function (indexG, turno) {
                thTurnosTotal += '<th>' + turno.nombre + '</th>'
            });

            theadTable = '<thead>' +
                '<tr>' +
                '<th colspan="' + $scope.listaGeografiaTabla.length * $scope.listTurnosUsuarioDispV2.length + '">' + fechaTemporal + '</th>' +
                '</tr>' +
                '<tr>' +
                contentTeadGeocercas +
                '<th colspan="' + $scope.listTurnosUsuarioDispV2.length + '">' + 'SUBTOTAL' + '</th>' + '</tr>' +
                '<tr>' +
                thGeocercasTurnos +
                thTurnosTotal +
                '<th>TOTAL</th>' +
                '</tr>' +
                '</tead>';

            tdBodyTable += '<tdbody>' +
                contenidoTbody +
                '</tdbody>';
            contenido += contentDivPrincipal + principioTablaDisponibilidad + theadTable + tdBodyTable + finalTableDisponibilidad + contentFinalDivPrincipal;
        })
        document.getElementById('container-table-disponibilidadv2').innerHTML = contenido;
    }

    $scope.consultarDisponibilidadV2 = function () {
        if (!$scope.banderaErrorTurnos) {
            let isValid = true;
            let mensajeError = '';
            $scope.resultDisponibilidadV2 = [];
            $scope.totalesDisponibilidadV2 = [];

            if ($('#divConsultaDisponibilidadv2').is(':visible')) {
                $('#divConsultaDisponibilidadv2').hide();
            }

            if ($('#divIntervencionesDispv2').attr('style')) {
                $('#divIntervencionesDispv2').removeAttr("style");
            }

            if (!$scope.validarFechaDispv2('filtro_fecha_inicio_disponibilidadv2', 'filtro_fecha_fin_disponibilidadv2')) {
                mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
                isValid = false;
            }

            let clustersparam = $("#geografiaDisponibilidadv2").jstree("get_selected", true)
                .filter(e => e.original.nivel == $scope.nGeografiaDispV2)
                .map(e => e.id)
            if (clustersparam.length == 0) {
                mensajeError += '<li> Selecciona una Geocerca </li>';
                isValid = false;
            }

            let intervencionesParam = $scope.listaIntervencionesDispV2
                .filter(e => { return e.isVisible })
                .map(e => e.id);
            if (!intervencionesParam.length) {
                isValid = false;
                mensajeError += '<li> Selecciona una Intervenci&oacute;n</li>';
            }

            if (isValid) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();

                $scope.listaGeografiaTabla = $("#geografiaDisponibilidadv2").jstree("get_selected", true)
                    .filter(e => e.original.nivel == $scope.nGeografiaDispV2)
                    .map(e => { return { id: e.id, descripcion: e.text } });

                let params = {
                    "idGeografias": clustersparam,
                    "idIntervenciones": intervencionesParam,
                    'fechaInicio': $scope.getFechaFormatoDispV2(document.getElementById('filtro_fecha_inicio_disponibilidadv2').value, 'consultaDisponibilidad'),
                    'fechaFin': $scope.getFechaFormatoDispV2(document.getElementById('filtro_fecha_fin_disponibilidadv2').value, 'consultaDisponibilidad'),
                }

                disponibilidadService.consultaDisponibilidadV2(params).then(function success(response) {
                    if (response.data) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                $scope.resultDisponibilidadV2 = angular.copy(response.data.result.consultaDisponibilidad);
                                $scope.totalesDisponibilidadV2 = angular.copy(response.data.result.totalesDisponibilidads)
                                $scope.pintarTablaDisponibilidadV2();
                                swal.close();
                            } else {
                                swal.close();
                                $scope.pintarTablaDisponibilidadV2();
                                mostrarMensajeWarningValidacion("No se encontr&oacute; Disponibilidad");
                            }
                        } else {
                            swal.close();
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                        }
                    } else {
                        swal.close();
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                    }
                });
                $('#divConsultaDisponibilidadv2').show();
                $('#divIntervencionesDispv2').css('margin-top', '3em');
            } else {
                mostrarMensajeWarningValidacion(mensajeError);
            }
        }
    }

    abrirModalActualizarDisponibilidadv2 = function (fechaAct, idGeografia, idIntervencion) {
        if ($scope.isPermisoActualizarDisponibilidadv2) {
            $scope.intervencionActDispV2 = {};
            $scope.geografiaActV2 = {};
            $scope.disponibilidadActV2 = [];
            $scope.geografiaActV2 = $scope.listaGeografiaTabla.find(e => parseInt(e.id) == idGeografia);
            $scope.intervencionActDispV2 = $scope.listaIntervencionesDispV2.find(e => e.id == idIntervencion);
            $("#fechaActualizarDispv2").text(fechaAct);
            let fechaSplit = fechaAct.split('-')
            let fech = Number(fechaSplit[1]) - 1;
            let fechaMes = fech.length === 1 ? '0'.concat(fech) : String(fech);
            let fechaUpd = new Date(fechaSplit[2], fechaMes, fechaSplit[0]);
            $("#fechaInicio_actualizar_Dispv2").datepicker('setDate', new Date(fechaUpd));
            $("#fechaFin_actualizar_Dispv2").datepicker('setDate', new Date(fechaUpd));
            $("#geografiaActualizarDispv2").text($scope.geografiaActV2.descripcion);
            $("#intervencionActualizarDispv2").text($scope.intervencionActDispV2.nombre);


            $scope.disponibilidadActV2 = $scope.resultDisponibilidadV2.filter(e => parseInt(e.idGeografia) === idGeografia && parseInt(e.idIntervencion) == idIntervencion && e.fecha == $scope.getFechaFormatoDispV2(fechaAct, 'actualizaDisponibilidad'));
            $.each($scope.listTurnosUsuarioDispV2, function (indexG, turno) {
                if ($scope.disponibilidadActV2 && $scope.disponibilidadActV2.length) {
                    let objDispoAct = $scope.disponibilidadActV2.find(e => Number(e.idTurno) == turno.id);
                    if (objDispoAct) {
                        $("#turno_" + turno.id).val(objDispoAct.disponibilidadActual);
                        if (objDispoAct.bloqueado == '0') {
                            document.getElementById('check_activo_actv2').checked = true;
                            document.getElementById('check_inactivo_actv2').checked = false;
                        } else {
                            document.getElementById('check_activo_actv2').checked = false;
                            document.getElementById('check_inactivo_actv2').checked = true;
                        }
                    } else {
                        document.getElementById('check_activo_actv2').checked = true;
                        document.getElementById('check_inactivo_actv2').checked = false;
                        $("#turno_" + turno.id).val(0);
                    }
                } else {
                    document.getElementById('check_activo_actv2').checked = true;
                    document.getElementById('check_inactivo_actv2').checked = false;
                    $("#turno_" + turno.id).val(0);
                }
            });
            $('#modalActualizarDisponibilidadV2').modal('show');
        } else {
            mostrarMensajeWarningValidacion("No cuentas con el permiso para actualizar la Disponibilidad");
        }
    }

    $('#modalFiltroIntervencionDispV2').on('hidden.bs.modal', function (e) {
        $scope.consultarDisponibilidadV2();
    });

    $scope.actualizarDisponibilidadv2 = function () {
        let mensajeError = '';
        let isValid = true;
        let turnosParam = [];

        if (!$scope.validarFechaDispv2('fechaInicio_actualizar_Dispv2', 'fechaFin_actualizar_Dispv2')) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
            isValid = false;
        }

        let paramIsBloqueado = 0;
        if ($('#check_inactivo').is(":checked")) {
            paramIsBloqueado = 1;
        }

        $.each($scope.listTurnosUsuarioDispV2, function (indexG, turno) {
            if ($("#turno_" + turno.id).val() == '') {
                mensajeError += '<li>Introducir cantidad Turno ' + turno.nombre + ' </li>';
                isValid = false;
            } else {
                turnosParam.push({ idCatTurno: turno.id, disponibilidadActual: Number($("#turno_" + turno.id).val()) });
            }
        });

        if (isValid) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            let paramFechaInicio = $scope.getFechaFormatoDispV2(document.getElementById('fechaInicio_actualizar_Dispv2').value, 'consultaDisponibilidad');
            let paramFechaFin = $scope.getFechaFormatoDispV2(document.getElementById('fechaFin_actualizar_Dispv2').value, 'consultaDisponibilidad');
            let params = {
                "subtipoIntervencion": $scope.intervencionActDispV2.id,
                "idGeografia2": $scope.geografiaActV2.id,
                "fechaInicio": paramFechaInicio.concat('T00:00:00.000+0000'),
                "fechaFin": paramFechaFin.concat('T00:00:00.000+0000'),
                "bloqueado": paramIsBloqueado,
                "turnos": turnosParam
            }

            disponibilidadService.actualizarDisponibilidad(JSON.stringify(params)).then(function success(response) {
                console.log(response)
                if (response.data) {
                    if (response.data.respuesta) {
                        swal.close();
                        $('#modalActualizarDisponibilidadV2').modal('hide');
                        $scope.consultarDisponibilidadV2();
                        mostrarMensajeExitoAlert("La Disponibilidad ha sido actualizada correctamente.");
                    } else {
                        swal.close();
                        mostrarMensajeErrorAlert(response.data.resultDescripcion);
                    }
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    $scope.enviarDatosReporteDisponibilidadv2 = function () {
        let params = {
            listDisponibilidad: $scope.arrayTablaExcelDisp,
            tipoExcel: 'reporte-disponibilidadv2-pi',
            headers: $scope.listaHeaders,
            valores: $scope.listaHeaders,
            sheet: "Reporte Disponibilidad"
        }

        genericService.enviarParamsReporte(params).then(function success(response) {
            if (response.data.respuesta) {
                var link = document.createElement("a");
                link.href = contex_project + '/req/exporteExcelGenericRequest/reporteDisponibilidad.xls';
                link.click();
                swal.close();
            } else {
                mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
            }
            swal.close();
        });
    }

    $scope.generarReporteDisponibilidadv2 = function () {
        let isValid = true;
        let mensajeError = '';
        $scope.listaHeaders = [];
        $scope.resultDispEx = [];
        $scope.arrayTablaExcelDisp = [];
        $scope.arrayDispGeocercasEx = [];

        if (!$scope.validarFechaDispv2('filtro_fecha_inicio_disponibilidadv2', 'filtro_fecha_fin_disponibilidadv2')) {
            mensajeError += "<li>La fecha inicical debe ser menor a la fecha final</li>";
            isValid = false;
        }

        let clustersparam = $("#geografiaDisponibilidadv2").jstree("get_selected", true)
            .filter(e => e.original.nivel == $scope.nGeografiaDispV2)
            .map(e => e.id)
        if (clustersparam.length == 0) {
            mensajeError += '<li> Selecciona una Geocerca </li>';
            isValid = false;
        }

        let intervencionesParam = $scope.listaIntervencionesDispV2
            .filter(e => { return e.isVisible })
            .map(e => e.id);
        if (!intervencionesParam.length) {
            isValid = false;
            mensajeError += '<li> Selecciona una Intervenci&oacute;n</li>';
        }

        if (isValid) {
            $scope.listaHeaders = ['Fecha', 'Region', 'Ciudad', 'Distrito', 'Geocerca', 'Turno'];
            $.each($scope.listaIntervencionesDispV2, function (indexIn, interP) {
                if (interP.isVisible) {
                    $scope.listaHeaders.push(interP.nombre)
                }
            });
            let params = {
                "idGeografias": clustersparam,
                "idIntervenciones": intervencionesParam,
                'fechaInicio': $scope.getFechaFormatoDispV2(document.getElementById('filtro_fecha_inicio_disponibilidadv2').value, 'consultaDisponibilidad'),
                'fechaFin': $scope.getFechaFormatoDispV2(document.getElementById('filtro_fecha_fin_disponibilidadv2').value, 'consultaDisponibilidad')
            }

            $scope.listaGeografiaExcel = $("#geografiaDisponibilidadv2").jstree("get_selected", true)
                .filter(e => e.original.nivel == $scope.nGeografiaDispV2)
                .map(e => { return { id: e.id, descripcion: e.text } });

            disponibilidadService.consultaDisponibilidadV2(params).then(function success(response) {
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.consultaDisponibilidad.length) {
                                $scope.resultDispEx = angular.copy(response.data.result.consultaDisponibilidad);
                                let rowEXC = {};
                                if ($scope.resultDispEx && $scope.resultDispEx.length) {
                                    let intervencionesExcel = $scope.listaIntervencionesDispV2.filter(e => { return e.isVisible });
                                    $.each($scope.resultDispEx, function (indexEEx, element) {
                                        $.each($scope.listTurnosUsuarioDispV2, function (indexTEx, turnoExc) {
                                            $.each(intervencionesExcel, function (indexIEx, interExc) {
                                                let elementGeocerca = $scope.listadoGeografiaCopyDV2.find(e => e.id === Number(element.idGeografia));
                                                let elementDistrito = $scope.listadoGeografiaCopyDV2.find(e => e.id == Number(elementGeocerca.padre));
                                                let elementCiudad = $scope.listadoGeografiaCopyDV2.find(e => e.id == Number(elementDistrito.padre));
                                                let elementRegion = $scope.listadoGeografiaCopyDV2.find(e => e.id == Number(elementCiudad.padre));
                                                if (parseInt(element.idTurno) == turnoExc.id) {
                                                    rowEXC.Fecha = element.fecha;
                                                    rowEXC.Region = elementRegion.nombre
                                                    rowEXC.Ciudad = elementCiudad.nombre;
                                                    rowEXC.Distrito = elementDistrito.nombre;
                                                    rowEXC.Geocerca = elementGeocerca.nombre;
                                                    rowEXC.Turno = turnoExc.nombre;
                                                    if (parseInt(element.idIntervencion) === interExc.id) {
                                                        rowEXC[interExc.nombre] = element.disponibilidadActual;
                                                    } else {
                                                        rowEXC[interExc.nombre] = 0;
                                                    }
                                                }
                                            });
                                        });
                                        $scope.arrayTablaExcelDisp.push(rowEXC)
                                        rowEXC = {};
                                    });
                                }
                                if ($scope.arrayTablaExcelDisp.length) {
                                    $scope.enviarDatosReporteDisponibilidadv2();
                                }
                            } else {
                                swal.close();
                                mostrarMensajeWarningValidacion("No se encontr&oacute; Disponibilidad");
                            }
                        } else {
                            swal.close();
                            mostrarMensajeWarningValidacion("No se encontr&oacute; Disponibilidad");
                        }
                    } else {
                        swal.close();
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                    }
                } else {
                    swal.close();
                    mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
        }
    }

    angular.element(document).ready(function () {
        $scope.initDisponibilidadv2();
    });

};