var tableAlerta;
app.alertasDespachoPrincipal = function ($scope, mainAlertasService, genericService) {
    var regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    $scope.otsAlertas = [];
    $scope.vistaDespacho = true;
    $scope.vistaAuditoriaEvidencia = false;
    $scope.alertaSeleccionada = false;
    $scope.opcionesAcciones = true
    $scope.alertaSeleccionadaObject = {};
    $scope.tipoAlertaSeleccionada = {};
    $scope.estatusAlerta = {};
    let objectVistaAlerta;

    $scope.listaOpcionesAlerta = [];

    $scope.listaStatusAlertaAccion = [];
    $scope.listaEstadosAlertaAccion = [];
    $scope.listaMotivosAlertaAccion = [];
    $scope.contadorCaracteresTextArea = 0;
    $scope.listaTotal = { aceptadas: 0, rechazadas: 0 };
    //    $scope.detalleEvidencia = detalleEvidencias.result.evidencias;
    $scope.detalleEvidencia = {};
    $scope.listImagenesTipo = [];


    $scope.getDetalleAlertas = function (alerta) {

        $scope.permisoAtenderAlertas = $scope.permisosConfigUser.permisos.find(e => { return e.clave === 'accionAtiendeAL' });
        $scope.vistaAuditoriaEvidencia = false;
        $scope.detencionVistaModal = false;

        // $("#pills-mapa-tab").click();
        $scope.idAlertaSelecionada = '';
        $scope.evidenciaAlertaConsultada = false;
        $scope.historicoAlertaConsultada = false;
        $scope.chatAlertaConsultada = false;
        $scope.showAaccion = false;
        $scope.alertaSeleccionadaObject = {};
        $scope.tipoAlertaSeleccionada = {};
        $scope.isDetalleAlerta = false;
        deleteMarkers();
        clearMarkers();
        $scope.alertaSeleccionada = false;
        $scope.opcionesAcciones = true
        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();

        var params = {
            "idTipoAlerta": alerta.id
        }

        $scope.listaTotal = { aceptadas: 0, rechazadas: 0 };


        $scope.otsAlertas = [];
        mainAlertasService.getDetalleAlertas(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.result) {

                    //$("#pills-mapa-tab").click();
                    $scope.otsAlertas = response.data.result ? response.data.result.detalleAlerta : [];
                    $scope.vistaDespacho = false;
                    $scope.tipoAlertaSeleccionada = angular.copy(alerta);
                    switch (alerta.id) {
                        case '9':
                            $scope.vistaAuditoriaEvidencia = true;
                            $scope.mostrarDetalleAlertasEvidencia($scope.otsAlertas);
                            break;

                        default:
                            $scope.mostrarDetalleAlertas($scope.otsAlertas);
                            break;
                    }

                    $("#buscador-alertas-ot").val('')
                    //swal.close();
                } else {
                    toastr.warning('No se encontraron resultados');
                    swal.close();
                }

            } else {
                swal.close();
            }
        }).catch(err => handleError(err));

    }

    $scope.mostrarDetalleAlertas = function (alertas) {
        $scope.viewTableResumen = [];
        angular.forEach(alertas, function (value, index) {
            let alertaob = value.alerta;
            let ordenobj = value.orden;
            let tecnicoObj = value.tecnico;

            //            $scope.otModalSelectedGeneric.idFlujo = ordenobj.idFlujo;
            //            $scope.otModalSelectedGeneric.idOrden = ordenobj.id;
            $scope.otModalSelectedGeneric.idFlujo = 10;
            $scope.otModalSelectedGeneric.idOrden = 592525;

            let arra = [];
            arra[0] = alertaob.id ? alertaob.id : '';
            arra[1] = alertaob.folioSistema ? alertaob.folioSistema : '';
            arra[2] = `
                <div id="cardAlerta${ordenobj.id}" class="card card-alertas-pendientes cards-lertas" onclick="consultarAccionesAlerta('${ordenobj.id}', '${ordenobj.folioSistema}', 
                '${alertaob.latitudAlerta}', '${alertaob.longitudAlerta}', '${tecnicoObj.latitud}', '${tecnicoObj.longitud}', 
                '${alertaob.idSubAlerta}', '${ordenobj.idIntervencion}', '${ordenobj.idSubIntervencion}', '${tecnicoObj.id}', 
                '${alertaob.idRegistroAlerta}', '${ordenobj.idFlujo}')">
                    <div class="card-body card-body-alertas">

                        <div class="top-title-ot">
                            <div class="content-top-element bars-content">
                                <p class="text-otpendiente-tres-title">${ordenobj.claveCliente}</p>
                            </div>                        
                        </div>
                        <div class="posiciondos">
                            <div class="content-dos-element ">
                                <p class="text-otpendiente-tres-title">${ordenobj.nombreCliente}</p>
                            </div>
                        </div>
                        <div class="positiontres">
                            <div class="content-posiciontres">
                                <p class="text-otpendiente-tres-title">FOLIO:</p>
                                <p class="text-otpendiente-tres"> ${ordenobj.folioSistema}</p>
                            </div>
                            <div class="content-posiciontres">
                                <p class="text-otpendiente-tres-title">OT:</p>
                                <p class="text-otpendiente-tres"> ${ordenobj.id}  </p>
                            </div>
                        </div>

                        <div class="info-content-otpendeinte">
                            <div class="line-content-infootpend">
                                <b class="text-otpendiente-tres-title">Intevenci&oacute;n:</b>
                                <span class="text-otpendiente-tres">${ordenobj.descSubIntervencion}</span>                               
                            </div> 
                            <div class="line-content-infootpend">
                                <b class="text-otpendiente-tres-title">Subintervenci&oacute;n.</b>
                                <span class="text-otpendiente-tres">${ordenobj.descIntervencion}</span>                                
                            </div>                                               
                        </div>
                                       
                    </div>
                    <div class="card-footer text-muted card-alertas-pendientes-foot">
                        <div class="row">
                            <div class="col-12">
                                <span class="text-otpendiente-tres-title">Alerta: </span><span class="text-otpendiente-tres">  ${alertaob.descripcionSubtipoAlerta}  </span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            `
            $scope.filtrosGeneral.turnosdisponibles;
            $scope.viewTableResumen.push(arra);

        });

        if (tableAlerta) {
            tableAlerta.destroy();
        }

        tableAlerta = $('#table-alertas-pi').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "scrollX": true,
            "info": false,
            "autoWidth": true,
            "pageLength": 3,
            "language": idioma_espanol_not_font,
            "data": $scope.viewTableResumen,
            "sDom": '<"top"f>rt<"bottom"lp><"bottom"r><"clear">',
            "columns": [
                {
                    "title": "",
                    "visible": false,
                }, {
                    "title": "",
                    "visible": false,
                }, {
                    "title": ""
                }
            ],
            "initComplete": function (settings, json) {
                setTimeout(function (e) {
                    let objclic = document.getElementsByClassName('card-alertas-pendientes')[0]
                    if (objclic != undefined)
                        document.getElementsByClassName('card-alertas-pendientes')[0].click();
                    else
                        swal.close()
                }, 500)
            }
        });
    }

    $scope.showImage = function (usuario) {
        let ot = $scope.otsAlertas.find((t) => t.tecnico.id == usuario);
        abrirModalFoto(ot.tecnico.nombre, ot.tecnico.urlFotoPerfil, ot.tecnico.numEmpleado, ot.tecnico.telefonoContacto, '#0B50C4', 'Sin dato')
    }

    consultarEvidencia = function (id, usuario) {
        $(".cards-lertas").css("border-left", "1px solid #dddddd");
        $(".cards-lertas").css("box-shadow", "0 0 0 0 #ffffff");
        $("#cardAlerta_" + id).css("border-left", "4px solid var(--estandar-color)");
        $("#cardAlerta_" + id).css("box-shadow", "0 2px 8px 0 rgb(0 0 0 / 16%), 0 2px 8px 0 rgb(0 0 0 / 16%)");
        let params = {
            idOt: id,
            idUsuario: usuario
        }
        if (!swal.isVisible()) {
            swal({ text: 'Cargando registros...', allowOutsideClick: false });
            swal.showLoading();
        }

        $scope.detalleEvidencia.tipos = [];
        $scope.listImagenesTipo = [];

        mainAlertasService.consultarDetalleEvidencia(params).then(function success(response) {
            swal.close();
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (!response.data.result.evidencias.length) {
                            $scope.detalleEvidencia = {};
                            toastr.info("No se encontraron evidencias");
                            return false;
                        }
                        $scope.detalleEvidencia = response.data.result;
                        $scope.detalleEvidencia.tipos = [];
                        $scope.listImagenesTipo = response.data.result.evidencias;

                        let listaTipos = [];
                        let aceptadas = 0;
                        let rechazadas = 0;
                        let urlTec = regexUrl.test($scope.detalleEvidencia.urlFotoPerfil) ? $scope.detalleEvidencia.urlFotoPerfil : "./resources/img/plantainterna/despacho/tecnicootasignada.png";
                        $("#fotoTecnico").attr("src", urlTec);
                        var count_cantidad_por_tipo = groupBy(response.data.result.evidencias, 'idEvidencia');
                        response.data.result.evidencias.map(function (e) {
                            aceptadas = aceptadas + (e.idEstatus == 2 ? 1 : 0);
                            rechazadas = rechazadas + (e.idEstatus == 3 ? 1 : 0);
                            let isExist = listaTipos.find((t) => e.idEvidencia == t.id)
                            if (!isExist) {
                                let imagenes = [];
                                if (count_cantidad_por_tipo[e.idEvidencia].length) {
                                    imagenes = count_cantidad_por_tipo[e.idEvidencia]
                                }
                                listaTipos.push(
                                    {
                                        id: e.idEvidencia,
                                        descripcion: e.clasificacion,
                                        imagenes: imagenes
                                    }
                                )
                            }
                        });
                        $scope.listaTotal.rechazadas = rechazadas;
                        $scope.listaTotal.aceptadas = aceptadas;
                        $scope.detalleEvidencia.tipos = listaTipos;
                        setTimeout(function () {
                            $("#categoria_img_0").click();
                        }, 100);

                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de evidencias');
            }
            $("#displayContent").css("display", "block");
        }).catch(err => handleError(err));
    }

    $scope.getEvidenciasImagenes = function (tipo) {
        $scope.listImagenesTipo = [];

        if (tipo.toString() === '0') {
            $scope.listImagenesTipo = $scope.detalleEvidencia.evidencias;
        } else {
            $scope.detalleEvidencia.tipos.map(function (e) {
                if (e.id.toString() === tipo.toString()) {
                    $scope.listImagenesTipo = e.imagenes;
                    return false;
                }
            });
        }

        $(".tipo_evidencia").removeClass("tipo-evidencia-selected");
        $("#categoria_img_" + tipo).addClass("tipo-evidencia-selected");
        setTimeout(() => {
            $scope.listImagenesTipo.map(function (e) {
                if (e.idEstatus == 2) {
                    console.log(e);
                    $("#check_" + e.id).prop("checked", true);
                }
            });
        }, 50);
        $scope.applyMagnific();
    }

    $scope.mostrarDetalleAlertasEvidencia = function (alertas) {
        $scope.viewTableResumen = [];
        angular.forEach(alertas, function (value, index) {
            let alertaob = value.alerta;
            let ordenobj = value.orden;
            let tecnicoObj = value.tecnico;

            let arra = [];
            arra[0] = alertaob.id ? alertaob.id : '';
            arra[1] = alertaob.folioSistema ? alertaob.folioSistema : '';
            arra[2] = `
                <div id="cardAlerta_${ordenobj.id}" class="card card-alertas-pendientes cards-lertas" onclick="consultarEvidencia('${ordenobj.id}', '${tecnicoObj.id}')">
                    <div class="card-body card-body-alertas">

                        <div class="top-title-ot">
                            <div class="content-top-element bars-content">
                                <p class="text-otpendiente-tres-title">${ordenobj.claveCliente}</p>
                            </div>                        
                        </div>
                        <div class="posiciondos">
                            <div class="content-dos-element ">
                                <p class="text-otpendiente-tres-title">${ordenobj.nombreCliente}</p>
                            </div>
                        </div>
                        <div class="positiontres">
                            <div class="content-posiciontres">
                                <p class="text-otpendiente-tres-title">FOLIO:</p>
                                <p class="text-otpendiente-tres"> ${ordenobj.folioSistema}</p>
                            </div>
                            <div class="content-posiciontres">
                                <p class="text-otpendiente-tres-title">OT:</p>
                                <p class="text-otpendiente-tres"> ${ordenobj.id}  </p>
                            </div>
                        </div>

                        <div class="info-content-otpendeinte">
                            <div class="line-content-infootpend">
                                <b class="text-otpendiente-tres-title">Intevenci&oacute;n:</b>
                                <span class="text-otpendiente-tres">${ordenobj.descSubIntervencion}</span>                               
                            </div> 
                            <div class="line-content-infootpend">
                                <b class="text-otpendiente-tres-title">Subintervenci&oacute;n.</b>
                                <span class="text-otpendiente-tres">${ordenobj.descIntervencion}</span>                                
                            </div>                                               
                        </div>
                                       
                    </div>
                    <div class="card-footer text-muted card-alertas-pendientes-foot">
                        <div class="row">
                            <div class="col-12">
                                <span class="text-otpendiente-tres-title">Alerta: </span><span class="text-otpendiente-tres">  ${alertaob.descripcionSubtipoAlerta}  </span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            `
            $scope.filtrosGeneral.turnosdisponibles;
            $scope.viewTableResumen.push(arra);

        });

        if (tableAlerta) {
            tableAlerta.destroy();
        }

        tableAlerta = $('#table-alertas-pi').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "scrollX": true,
            "info": false,
            "autoWidth": true,
            pageLength: 3,
            "language": idioma_espanol_not_font,
            "data": $scope.viewTableResumen,
            "sDom": '<"top"f>rt<"bottom"lp><"bottom"r><"clear">',
            "columns": [
                {
                    "title": "",
                    "visible": false,
                }, {
                    "title": "",
                    "visible": false,
                }, {
                    "title": ""
                }
            ],
            "initComplete": function (settings, json) {
                setTimeout(function (e) {
                    let objclic = document.getElementsByClassName('card-alertas-pendientes')[0]
                    if (objclic != undefined)
                        document.getElementsByClassName('card-alertas-pendientes')[0].click();
                    else
                        swal.close()
                }, 500)
            }
        });
    }

    $scope.guardarEvidencia = function () {

        let objectGroup = groupBy($scope.detalleEvidencia.evidencias, 'arreglo');
        let arrayList = Object.keys(objectGroup).map(function (key) { return objectGroup[key]; });
        let newObjectGroup = {};
        let isSelected = false;
        $.each(arrayList, function (e, categoria) {
            let aceptadas = [];
            let rechazadas = [];

            $.each(categoria, function (i, elemento) {
                if ($("#check_" + elemento.id).is(":checked")) {
                    aceptadas.push(elemento.id);
                }
            });

            $.each(categoria, function (i, elemento) {
                if ($("#check_" + elemento.id).hasClass("rechazada-check")) {
                    rechazadas.push(elemento.id);
                }
            });

            if (aceptadas.length || rechazadas.length) {
                let nombreGrupo = arrayList[e][0].arreglo;
                let list = [];

                if (aceptadas.length) {
                    let obj = {
                        idEstatus: 2,
                        idEvidencia: aceptadas,
                    }
                    list.push(obj);
                }

                if (rechazadas.length) {
                    let obj = {
                        idEstatus: 3,
                        idEvidencia: rechazadas
                    }
                    list.push(obj);
                }
                newObjectGroup[nombreGrupo] = list;
                isSelected = true;
            }
        })
        if (!isSelected) {
            toastr.warning('Selecciona la evidencia');
            return false;
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        mainAlertasService.guardarEvidencia(newObjectGroup).then(function success(response) {
            swal.close();
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    toastr.success('Las evidencias se guardaron con &eacute;xito');
                } else {
                    toastr.error('No se guardaron las evidencias');
                }
            } else {
                toastr.error('Ocurri&oacute; un arror al guardar la evidencia');
            }
        }).catch(err => handleError(err));
    }

    $scope.buscarOtAlertaKeyUpOt = function (event) {
        if (event.which === 13) {
            $scope.buscarAlertasDespacho()
        }
        if ($("#buscador-alertas-ot").val().trim() === '')
            $scope.buscarAlertasDespacho()
    }


    $scope.buscarAlertasDespacho = function () {
        let textbusqeuda = $("#buscador-alertas-ot").val()
        tableAlerta.search(textbusqeuda).draw()
    }
    $scope.idAlertaSelecionada = '';
    consultarAccionesAlerta = function (ot, os, latAlerta, longAlerta, latTecnico, longTecnico, idSubTipoAlerta, idIntervencion, idSubIntervencion, idTecnico, idAlerta, idFlujo) {
        if ($scope.idAlertaSelecionada !== ot) {
            $(".cards-lertas").css("border-left", "1px solid #dddddd");
            $(".cards-lertas").css("box-shadow", "0 0 0 0 #ffffff");
            $("#cardAlerta" + ot).css("border-left", "4px solid var(--estandar-color)");
            $("#cardAlerta" + ot).css("box-shadow", "0 2px 8px 0 rgb(0 0 0 / 16%), 0 2px 8px 0 rgb(0 0 0 / 16%)");

            $scope.idAlertaSelecionada = ot;
            $scope.evidenciaAlertaConsultada = false;
            $scope.historicoAlertaConsultada = false;
            $scope.chatAlertaConsultada = false;
            $scope.showAaccion = false;
            $scope.alertaSeleccionada = true;
            $scope.isDetalleAlerta = false;
            $scope.alertaSeleccionadaObject = {
                IdOT: ot,
                os: os,
                latitudAlerta: latAlerta,
                longitudAlerta: longAlerta,
                latitudTecnico: latTecnico,
                longitudTecnico: longTecnico,
                idSubTipoAlerta: idSubTipoAlerta,
                idIntervencion: idIntervencion,
                idSubIntervencion: idSubIntervencion,
                idTecnico: idTecnico,
                idAlerta: idAlerta,
                idFlujo: idFlujo
            };
            $scope.$apply();
            $scope.setMarkets($scope.alertaSeleccionadaObject);

            $("#pills-mapa-tab").click();
            if (!swal.isVisible()) {
                swal({ text: 'Consultando datos ...', allowOutsideClick: false });
                swal.showLoading();
            }

            var params = {
                "idTipoAlerta": idSubTipoAlerta
            }
            mainAlertasService.consultaAccionesAlerta(params).then(function success(response) {
                //response.data = accionesOt;
                if (response.data !== undefined) {
                    if (response.data.respuesta) {

                        $scope.listaOpcionesAlerta = response.data.result.acciones;

                        angular.forEach($scope.listaOpcionesAlerta, function (opcion, index) {
                            opcion.checkedOpcion = false;
                        });

                        //                  --------------------------------------------------------------------------------------------------------------------
                        //                  --------------------EL SIGUIENTE CÓDIGO DEBE QUITARSE UNA VEZ QUE SE CORRIJAN LOS SERVICIOS-------------------------

                        //                    $scope.listaOpcionesAlerta[0].campos[3].valorDefecto = 201;
                        //                    $scope.listaOpcionesAlerta[0].campos[3].valorDefecto = null;

                        //$scope.listaOpcionesAlerta[0].campos[2].esVisible = 1;
                        //$scope.listaOpcionesAlerta[0].campos[2].valorDefecto = null;
                        //                    $scope.listaOpcionesAlerta[0].campos[2].valorDefecto = 4;

                        //                    $scope.listaOpcionesAlerta[0].campos[1].valorDefecto = null;
                        //                    $scope.listaOpcionesAlerta[0].campos[4].valorDefecto = null;

                        //                  ------------------------------HASTA AQUÍ-------------------------------
                        //                  --------------------------------------------------------------------------------------------------------------------

                        swal.close();
                    } else {
                        swal.close();
                    }

                } else {
                    swal.close();
                }
            }).catch(err => handleError(err));
        }

    }

    $scope.showAaccion = false;
    $scope.listaCampos = [];
    $scope.listaMotivosAlerta = [];
    $scope.mostrarAccionAlerta = function (accion) {

        $("#idTituloAccionesAlertas").text("OPCIÓN " + accion.descripcion);

        //$scope.alertaSeleccionada = false;
        $scope.opcionesAcciones = false
        accion.checkedOpcion = true;

        $('.campoFecha').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true
        });
        $('.campoFecha').datepicker('update', new Date());

        $scope.idValorDefectoStatusAlertaAccion = null;
        $scope.idValorDefectoEstadoAlertaAccion = null;
        $scope.listaStatusAlertaAccion = [];
        $scope.listaEstadosAlertaAccion = [];
        $scope.listaMotivosAlertaAccion = [];

        angular.forEach(accion.campos, function (campo, index) {
            if (campo.nombreParamentro == "idEstatus") {
                if (campo.valorDefecto != null && campo.valorDefecto != "" && campo.valorDefecto != "NA") {
                    var valDefectoStatus = campo.valorDefecto;
                    $scope.listaEstadosAlertaAccion = $scope.estatusCambio.filter(e => { return e.idPadre == valDefectoStatus });
                    $scope.listaStatusAlertaAccion = $scope.estatusCambio.filter(e => { return e.id == valDefectoStatus });
                } else {
                    $scope.listaStatusAlertaAccion = $scope.estatusCambio.filter(e => { return e.idPadre == null });
                }
            } else if (campo.nombreParamentro == "idEstado") {
                if (campo.valorDefecto != null && campo.valorDefecto != "" && campo.valorDefecto != "NA") {
                    $scope.idValorDefectoEstadoAlertaAccion = campo.valorDefecto;
                    $scope.listaMotivosAlertaAccion = $scope.estatusCambio.filter(e => { return e.idPadre == $scope.idValorDefectoEstadoAlertaAccion });
                } else {

                }
            }
        });

        $scope.terminarAlerta.comentario = "";
        $(".validarCampoAccionAlerta").css("border-bottom", "1px solid #d9d9d9");
        $scope.contadorCaracteresTextArea = 0;
        $scope.accionOtSeleccionadaAlerta = angular.copy(accion)
    }

    $scope.showOpcion = 0;
    $scope.mostrarOpcionAlerta = function (accion) {
        switch (accion.id) {
            case "12":
                //RESCATE
                $scope.showOpcion = 1;
                break;
            case 1:
                //REAGENDAR
                $scope.showOpcion = accion.id;
                $scope.listaMotivosAlerta = $scope.filtrosAlertas.catalogoEstatus.filter(e => { return e.idPadre === 201 })
                break;
            case "13":
                //CALENDARIZAR
                $scope.showOpcion = 3;
                break;
            case "14":
                //TERMINAR
                $scope.showOpcion = 4;
                break;
            default:
                break;
        }
    }


    $scope.listaMotivoEstatus = [];
    $scope.consultarMotivoAlerta = function (element) {
        $scope.listaMotivoEstatus = [];
        $scope.listaMotivoEstatus = $scope.listaCatalogoEstatusAlerta.filter(estatus => estatus.ID_Padre === element.ID);
    }

    $scope.ocultarAccionAlerta = function () {
        $scope.showAaccion = false;
    }

    $scope.cambiarEstatusIntegrador = function () {
        swal({ text: 'Guardando datos ...', allowOutsideClick: false });
        swal.showLoading();
        var params = {
            "Id_estado": $scope.estatusAlerta.estado.ID,
            "Id_motivo": $scope.estatusAlerta.motivo.ID
        }
        mainAlertasService.cambiarEstatusIntegrador(params).then(function success(response) {
            response.data = catalogoEstatusAlerta;
            if (response.data !== undefined) {
                toastr.success(response.data.result.resultDescription);
                $scope.vistaDespacho = true;
                $scope.refrescarBusqueda();
                swal.close();
            } else {
                swal.close();
            }
        }).catch(err => handleError(err));
    }

    $scope.evidenciaAlertaConsultada = false;
    $scope.consultarEvidenciaAlerta = function () {
        if (!$scope.evidenciaAlertaConsultada) {
            $scope.evidenciaAlertaConsultada = true;
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            var params = {
                "Id_ot": "87",
                "Id_tipo_img": "87",
                "Propietario": "87"
            }
            mainAlertasService.consultarEvidenciaAlertaPI(params).then(function success(response) {
                response = imagenesAlerta;
                if (response.data !== undefined) {
                    $("#categorias_div").empty();
                    $("#contenido_imagenes").empty();
                    if (response.data.result.Imagen !== undefined && response.data.result.Imagen !== null && response.data.result.Imagen.length > 0) {
                        var _HTML_TIPO = '' +
                            '<div class="content_category col-4">' +
                            '	<b class="badge accent-3" id="alerta-p-i">0</b>' +
                            '	<button type="button" id="categoria_img_0" class=" btn_categoria_img categoria_img btn btn-sm btn-fluid btn-outline-blue-grey waves-effect waves-light">' +
                            '	 TODAS ' +
                            '	</button>' +
                            '</div>';
                        var clase_btn = "";


                        $.each(response.data.result.Tipo, function (index, elemento) {
                            _HTML_TIPO += '' +
                                '<div class="content_category col-4">' +
                                '	<b class="badge accent-3" id="alerta-p-i">0</b>' +
                                '	<button attr_id_cat="' + elemento.ID_Tipo + '" type="button" id="categoria_img_' + elemento.ID_Tipo + '" class=" btn_categoria_img categoria_img btn btn-sm btn-fluid  btn-outline-blue-grey waves-effect waves-light">' +
                                '	 ' + elemento.Descripcion + ' ' +
                                '	</button>' +
                                '</div>';
                        });
                        $("#categorias_div").append(_HTML_TIPO);


                        var count_cantidad_por_tipo = groupBy(response.data.result.Imagen, 'tipo_imagen');

                        Object.keys(count_cantidad_por_tipo).forEach(function (key) {
                            value = count_cantidad_por_tipo[key];
                            $("#categoria_img_" + key).parent().find('.badge').text(count_cantidad_por_tipo[key].length);
                        });

                        $("#categoria_img_0").parent().find('.badge').text(response.data.result.Imagen.length);

                        var _HTML_IMG = "";
                        var URL_IMG = "";
                        $.each(response.data.result.Imagen, function (index, elemento) {
                            if (elemento.Path_imagen === "") {
                                URL_IMG = '' +
                                    '<a href="' + './resources/img/generic/not_found.png" class="magnific item imgtipo_' + elemento.Tipo_imagen + '" data-title="' + elemento.Nombre_imagen + '">' +
                                    '	<img class="z-depth-1 img_evidencia"  src="' + './resources/img/generic/not_found.png" width="180" height="130" />' +
                                    ' </a>';
                            } else {
                                URL_IMG = '' +
                                    '<a href="data:image/png;base64,' + elemento.Path_imagen + '"" class="magnific item imgtipo_' + elemento.Tipo_imagen + '" data-title="' + elemento.Nombre_imagen + '">' +
                                    '	<img class="z-depth-1 img_evidencia"  src="data:image/png;base64,' + elemento.Path_imagen + '""  width="180" height="130" />' +
                                    '</a>';
                            }
                            _HTML_IMG += '' +
                                '	<div class="imagen_content content_img_' + elemento.Tipo_imagen + '  col-md-4">' +
                                '     <div class="contenedor_img_evidencia">' +
                                '		' + URL_IMG + ' ' +
                                '       <div class="middle_img_evidencia">' +
                                '         <div class="text_img_evidencia">' + elemento.Nombre_imagen + '  </div>' +
                                '       </div>' +
                                '     </div>' +
                                '   </div>';
                        });

                        $("#contenido_imagenes").append(_HTML_IMG);
                        $(".btn_categoria_img:first ").click().trigger('click')

                        //mostrar contenido evidencia
                        $("#parent_imagenes").show();
                        $("#not_info_evidencia").hide();
                    } else {
                        limpiarImagenesEvidencia();
                        $("#header_categoria_eviden").html('<h5 style="color:#767676" class="text-center">No se encontr\u00F3 evidencia</h5>');

                    }
                    swal.close();
                } else {
                    swal.close();
                }
            }).catch(err => handleError(err));
        }

    }

    $(document.body).on("click", ".btn_categoria_img", function () {

        if ($(this).hasClass('btn-blue-grey')) return false;

        var id_categoria = $.trim($(this).attr('attr_id_cat'));
        var texto_btn_categoria = $.trim($(this).text());

        if (id_categoria === '') {
            $(".btn_categoria_img").removeClass('btn-blue-grey').addClass('btn-outline-blue-grey');
            $("#categoria_img_0").removeClass('btn-outline-blue-grey').addClass('btn-blue-grey');
            $(".magnific.item").show();
            $('.imagen_content:hidden').show(400);
            setTimeout(function () { mostarImagenesCategoria(); }, 500);

        } else {
            $(".btn_categoria_img").removeClass('btn-blue-grey').addClass('btn-outline-blue-grey');
            $("#categoria_img_" + id_categoria).removeClass('btn-outline-blue-grey').addClass('btn-blue-grey');


            if ($(".imagen_content:visible").length > 0) {
                $(".imagen_content:visible").hide(150, "linear", function () {

                    $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                    $(".magnific.item.imgtipo_" + id_categoria + "").show();

                    $('.content_img_' + id_categoria).show(200);
                    //Manda function magnific popup
                    mostarImagenesCategoria();
                });
            } else {
                $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                $(".magnific.item.imgtipo_" + id_categoria + "").show();

                $('.content_img_' + id_categoria).show(200);
                //Manda function magnific popup
                mostarImagenesCategoria();
            }

        }
    });

    mostarImagenesCategoria = function () {

        var $imageLinks = $('.magnific.item:visible');
        var items = [];

        $imageLinks.each(function (index, elemento) {
            var $item = $(this);
            var magItem = {
                src: $item.attr('href'),
                type: 'image'
            };
            magItem.title = $item.data('title');
            items.push(magItem);

        });

        $imageLinks.magnificPopup({
            mainClass: 'mfp-fade',
            items: items,
            gallery: {
                enabled: true,
                tPrev: $(this).data('prev-text'),
                tNext: $(this).data('next-text')
            },
            type: 'image',
            callbacks: {
                beforeOpen: function () {
                    var index = $imageLinks.index(this.st.el);
                    if (-1 !== index) {
                        this.goTo(index);

                    }
                    //  $('#imagenOT').modal('hide');
                },

                open: function () {
                    // Disabling focus enforcement by magnific
                    $.magnificPopup.instance._onFocusIn = function (e) { };

                }
            }

        });
    }


    $scope.applyMagnific = function () {
        var id_categoria = $.trim($(this).attr('attr_id_cat'));

        if (id_categoria === '') {
            $(".magnific.item").show();
            $('.imagen_content:hidden').show(400);
            setTimeout(function () { mostarImagenesCategoria(); }, 500);

        } else {
            if ($(".imagen_content:visible").length > 0) {
                $(".imagen_content:visible").hide(150, "linear", function () {

                    $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                    $(".magnific.item.imgtipo_" + id_categoria + "").show();

                    $('.content_img_' + id_categoria).show(200);
                    //Manda function magnific popup
                    mostarImagenesCategoria();
                });
            } else {
                $(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
                $(".magnific.item.imgtipo_" + id_categoria + "").show();

                $('.content_img_' + id_categoria).show(200);
                //Manda function magnific popup
                mostarImagenesCategoria();
            }

        }

    };

    limpiarImagenesEvidencia = function () {
        $("#categorias_div .content_category").not(":first").remove();
        $("#contenido_imagenes").empty();

        $("#parent_imagenes").hide();
        $("#not_info_evidencia").show();
    }

    $scope.listaHistoricoAlerta = [];
    $scope.historicoAlertaConsultada = false;
    $scope.consultarHistoricoAlerta = function () {
        if ($scope.alertaSeleccionada) {
            if (!$scope.historicoAlertaConsultada) {
                $scope.historicoAlertaConsultada = true;
                swal({ text: 'Consultando datos ...', allowOutsideClick: false });
                swal.showLoading();
                var params = {
                    //"idOt": "3010"//PENDIENTE
                    "idOt": $scope.alertaSeleccionadaObject.IdOT
                }
                mainAlertasService.consultarHistoricoAlertaPI(params).then(function success(response) {
                    if (response.data !== undefined) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                if (response.data.result.detalle) {
                                    $scope.listaHistoricoAlerta = response.data.result.detalle;//.reverse();
                                } else {
                                    toastr.warning(response.data.result.mensaje);
                                }
                            } else {
                                toastr.warning('No se encontraron resultados');
                            }
                        } else {
                            toastr.warning(response.data.resultDescripcion);
                        }
                        swal.close();
                    } else {
                        swal.close();
                    }
                }).catch(err => handleError(err));
            }
        } else {
            setTimeout(function () {
                $("#pills-mapa-tab").click();
            }, 0500);
        }
    }

    $scope.listaComentariosAlerta = [];
    $scope.chatAlertaConsultada = false;
    $scope.consultarChatAlerta = function () {
        if ($scope.alertaSeleccionada) {
            if (!$scope.chatAlertaConsultada) {
                $scope.chatAlertaConsultada = true;
                swal({ text: 'Consultando datos ...', allowOutsideClick: false });
                swal.showLoading();
                var params = {
                    //"idOt": "3"//PENDIENTE
                    "idOt": $scope.alertaSeleccionadaObject.IdOT
                }
                mainAlertasService.consultarComentariosAlertaPI(params).then(function success(response) {
                    if (response.data !== undefined) {
                        if (response.data.respuesta) {
                            // $scope.listaComentariosAlerta = response.data.result.detalle;
                            if (response.data.result.detalle) {
                                //$scope.flagComentarios = true;
                                $scope.listaComentariosAlerta = response.data.result.detalle;
                                angular.forEach($scope.listaComentariosAlerta, function (comentario, index) {
                                    comentario.fechaComentario = moment(comentario.fecha + ' ' + comentario.hora).format("dddd, D [de] MMMM [de] YYYY hh:mm A");
                                });
                            } else {
                                toastr.warning(response.data.result.mensaje);
                            }
                        } else {

                        }
                        swal.close();
                    } else {
                        swal.close();
                    }
                }).catch(err => handleError(err));
            }
        } else {
            setTimeout(function () {
                $("#pills-mapa-tab").click();
            }, 0500);
        }

    }

    $scope.comentarioAlerta = "";
    $scope.agregarComentario = function () {
        if ($scope.comentarioAlerta !== "") {
            var params = {
                "comentario": $scope.comentarioAlerta,
                //"idOrden": "3010",
                "idOrden": $scope.alertaSeleccionadaObject.IdOT,
                "origenSistema": "1"
            }
            genericService.agregarComentariosOt(params).then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        toastr.success(response.data.resultDescripcion);
                        $scope.comentarioAlerta = "";
                        $scope.chatAlertaConsultada = false;
                        $(".chat-area").scrollTop(0);
                        $scope.consultarChatAlerta();
                        swal.close();
                    } else {
                        toastr.error(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error(response.data.resultDescripcion);
                    swal.close();
                }
            }).catch(err => handleError(err));
        } else {
            toastr.warning('Ingrese un comentario.');
        }
    }

    $scope.reagendaAlerta = {};
    $scope.rescateAlerta = {};
    $scope.calendarizarAlerta = {};
    $scope.terminarAlerta = {};
    $scope.cambiarEstatusAlertaValidacion = function () {
        $scope.params = {};
        let errorMensaje = '<ul>';
        let isValido = true;
        switch ($scope.showOpcion) {
            case 1:
                //REAGENDAMIENTO
                if ($scope.reagendaAlerta.fechaReagendamiento.trim() === '') {
                    errorMensaje += '<li>Completa campo fecha.</li>'
                    isValido = false;
                }
                if (!$scope.reagendaAlerta || !$scope.reagendaAlerta.turno) {
                    errorMensaje += '<li>Seleccione campo turno.</li>'
                    isValido = false;
                }
                if (!$scope.reagendaAlerta || !$scope.reagendaAlerta.motivo) {
                    errorMensaje += '<li>Seleccione campo motivo.</li>'
                    isValido = false;
                }
                if (!$scope.reagendaAlerta.comentario || $scope.reagendaAlerta.comentario.trim() === '') {
                    errorMensaje += '<li>Completa campo comentario.</li>'
                    isValido = false;
                }
                if (isValido) {
                    $scope.params = {
                        tipo: 'reagendamiento',
                        ot: $scope.alertaSeleccionadaObject.IdOT,
                        folioSistema: $scope.alertaSeleccionadaObject.os,
                        idFlujo: $scope.alertaSeleccionadaObject.idFlujo,//
                        idTipoOrden: $scope.alertaSeleccionadaObject.idIntervencion,
                        idSubTipoOrden: $scope.alertaSeleccionadaObject.idSubIntervencion,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: 12,//
                        latitud: $scope.alertaSeleccionadaObject.latitudAlerta,
                        longitud: $scope.alertaSeleccionadaObject.longitudAlerta,
                        comentarios: $scope.reagendaAlerta.comentario,
                        idTurno: $scope.reagendaAlerta.turno.id,
                        idMotivo: $scope.reagendaAlerta.motivo.id,
                        fechaHoraAgenda: $scope.reagendaAlerta.fechaReagendamiento,
                        idAccion: $scope.showOpcion,
                        idAlerta: $scope.alertaSeleccionadaObject.idAlerta
                    }
                }
                break;

            case 100:
                //REAGENDAMIENTO
                if ($scope.reagendaAlerta.fechaReagendamiento.trim() === '') {
                    errorMensaje += '<li>Completa campo fecha.</li>'
                    isValido = false;
                }
                if (!$scope.reagendaAlerta || !$scope.reagendaAlerta.turno) {
                    errorMensaje += '<li>Seleccione campo turno.</li>'
                    isValido = false;
                }
                if (!$scope.reagendaAlerta || !$scope.reagendaAlerta.motivo) {
                    errorMensaje += '<li>Seleccione campo motivo.</li>'
                    isValido = false;
                }
                if (!$scope.reagendaAlerta.comentario || $scope.reagendaAlerta.comentario.trim() === '') {
                    errorMensaje += '<li>Completa campo comentario.</li>'
                    isValido = false;
                }
                if (isValido) {
                    $scope.params = {
                        tipo: 'reagendamiento',
                        ot: $scope.alertaSeleccionadaObject.IdOT,
                        folioSistema: $scope.alertaSeleccionadaObject.os,
                        idFlujo: $scope.alertaSeleccionadaObject.idFlujo,//
                        idTipoOrden: $scope.alertaSeleccionadaObject.idIntervencion,
                        idSubTipoOrden: $scope.alertaSeleccionadaObject.idSubIntervencion,
                        idOrigenSistema: 1,
                        idUsuarioDespacho: -1,//este va desde el back
                        latitud: $scope.alertaSeleccionadaObject.latitudAlerta,
                        longitud: $scope.alertaSeleccionadaObject.longitudAlerta,
                        comentarios: $scope.reagendaAlerta.comentario,
                        idTurno: $scope.reagendaAlerta.turno.id,
                        idMotivo: $scope.reagendaAlerta.motivo.id,
                        fechaHoraAgenda: $scope.reagendaAlerta.fechaReagendamiento,
                        idAccion: $scope.showOpcion,
                        idAlerta: $scope.alertaSeleccionadaObject.idAlerta
                    }
                }
                break;
            default:
                break;
        }

        if (isValido) {
            $scope.cambiarEstatusAlerta($scope.params);
        } else {
            errorMensaje += '</ul>'
            mostrarMensajeWarningValidacion(errorMensaje)
        }
    }

    $scope.cambiarEstatusAlerta = function (params) {

        genericService.cambiarEstatusAlertaGeneric(params).then(result => {
            swal.close();
            if (result.data.respuesta) {

                toastr.success(result.data.result.mensaje);
                $("#modalDetalleOT").modal('hide')
                $scope.refrescarBusqueda()
            } else {
                toastr.warning(result.data.resultDescripcion);

            }
        }).catch(err => handleError(err));
    }

    var mapaAlerta;
    var markers = [];
    $scope.iniciarMapaAlertas = function () {
        mapaAlerta = new google.maps.Map(document.getElementById("mapAlerta"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 15,
        });
        objectVistaAlerta = new GenericMapa(mapaAlerta, 'mapAlerta', 'bottom-right');
        objectVistaAlerta.inicializar_data()
    }


    $scope.setMarkets = function (pos) {

        let isDataMarkerTecnico = $scope.validarLatitudLongitudMap(pos.latitudTecnico, pos.longitudTecnico);
        let isDataMarkerAlerta = $scope.validarLatitudLongitudMap(pos.latitudAlerta, pos.longitudAlerta);

        deleteMarkers();

        if (!isDataMarkerTecnico) {
            var marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(pos.latitudTecnico),
                    lng: parseFloat(pos.longitudTecnico)
                },
                title: "Tecnico",
                animation: google.maps.Animation.DROP,
                map: mapaAlerta,
                icon: {
                    url: "./resources/img/plantainterna/despacho/repartidor-marker.svg",
                    scaledSize: new google.maps.Size(37, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 20)
                }
            });
            markers.push(marker);
        }

        if (!isDataMarkerAlerta) {
            marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(pos.latitudAlerta),
                    lng: parseFloat(pos.longitudAlerta)
                },
                title: "OT",
                animation: google.maps.Animation.DROP,
                map: mapaAlerta,
                icon: {
                    url: './resources/img/plantainterna/despacho/domicilio-marker.svg',
                    scaledSize: new google.maps.Size(37, 43),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(10, 20)
                },
            });
            markers.push(marker);
        }

        if (!isDataMarkerTecnico || !isDataMarkerAlerta) {
            if (!isDataMarkerAlerta) {
                mapaAlerta.setCenter(new google.maps.LatLng(parseFloat(pos.latitudAlerta), parseFloat(pos.longitudAlerta)));
            } else {
                mapaAlerta.setCenter(new google.maps.LatLng(parseFloat(pos.latitudTecnico), parseFloat(pos.longitudTecnico)));
            }
        } else {
            mapaAlerta.setCenter(new google.maps.LatLng(19.4326, -99.1332));
            mapaAlerta.setZoom(5);
        }

        listadoLinesCurves.map(function (e) { e.setMap(null); return e; })
        listadoLinesCurves = [];

        if (!isDataMarkerTecnico && !isDataMarkerAlerta) {
            let pointA = new google.maps.LatLng(parseFloat(pos.latitudTecnico), parseFloat(pos.longitudTecnico)) // basel airport
            let pointB = new google.maps.LatLng(parseFloat(pos.latitudAlerta), parseFloat(pos.longitudAlerta))
            $scope.drawCurveExt(pointA, pointB, mapaAlerta);
        }
    }

    clearMarkers = function () {
        setMapOnAll(null);
    }
    setMapOnAll = function (map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    deleteMarkers = function () {
        clearMarkers();
        markers = [];
    }

    let groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    $scope.cerrarAlertas = function () {
        $scope.alertaSeleccionada = false
        $scope.opcionesAcciones = true
        $("#idTituloAccionesAlertas").text("OPCIONES");
        $scope.vistaDespacho = true;
        $scope.listImagenesTipo = [];
        $scope.detalleEvidencia = {};
        $("#displayContent").css("display", "none");
        $scope.refrescarBusqueda();
    }

    $scope.initTableOrdenesPendientes = function () {
        /*
        $scope.viewTable = [];
        angular.forEach(listaOrdenes,function(value,key){
            let  arra=[];
            arra[0] = '<div class="col-12 text-center"><i class="fa fa-star star-top-5000"></i></div>';

            $scope.viewTable.push(arra);
        });
        */

        if (tableAlerta) {
            tableAlerta.destroy();
        }

        $('.ot-pendiente-event').each(function (index) {
            let otpendiente = $scope.otsAlertas[index]
            $(this).data('event', {
                objectevent: otpendiente,
                stick: true
            });
        });

        tableAlerta = $('#table-alertas-pi').DataTable({
            info: false,
            pageLength: 3,
            language: {
                zeroRecords: "No se encontraron OT\u00B4s",
                infoEmpty: "No se encontro la OT",
                infoFiltered: "(OT no encontrada)",
                paginate: {
                    first: '<i class="fa fa-fast-backward"></i>',
                    last: '<i class="fa fa-fast-forward"></i>',
                    next: ' ',
                    previous: ' '
                }
            }
        });


        $('#filterPendiente').keyup(function () {
            tableOrdenes.draw();
        });


    }

    $(document).ready(function () {

        $('#fecha-reagendamiento-alerta').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            startDate: moment(FECHA_HOY_DATE).toDate()
        });
        $('#fecha-reagendamiento-alerta').datepicker('update', FECHA_HOY_DATE);

    });

    $scope.isDetalleAlerta = false;
    $scope.abirDetalle = function () {
        if (!$scope.isDetalleAlerta) {
            $scope.objectDetalleAlerta = $scope.otsAlertas[0]
            $scope.objectDetalleAlerta.tecnico.urlFotoPerfil ? $scope.objectDetalleAlerta.tecnico.urlFotoPerfil : './resources/img/plantainterna/despacho/tecnicootasignada.png';
            $scope.inicializarMapasAlertaDetalle()
            $scope.isDetalleAlerta = true;
        }
        $scope.pintarMarkesMapDetalleAlerta();
    }





    //    ---------------------------------------------------
    //    CAMBIOS REYNEL
    //    ---------------------------------------------------

    $scope.cerrarCamposAccionAlerta = function () {
        $("#idTituloAccionesAlertas").text("OPCIONES");
        angular.forEach($scope.listaOpcionesAlerta, function (opcion, index) {
            opcion.checkedOpcion = false;
        });
        //$scope.alertaSeleccionada = true;
        $scope.opcionesAcciones = true
    }

    $scope.cambioOpcionSelectAccionAlerta = function (campo, accion) {
        var idCampo = $("#" + campo.nombreParamentro + "" + accion.id).val();
        if (idCampo != null) {
            if (campo.nombreParamentro == "idEstatus") {
                $scope.listaEstadosAlertaAccion = $scope.estatusCambio.filter(e => { return e.idPadre == idCampo });
                $("#" + campo.nombreParamentro + "" + accion.id).css("border", "1px solid #d9d9d9");
            } else if (campo.nombreParamentro == "idEstado") {
                $scope.listaMotivosAlertaAccion = $scope.estatusCambio.filter(e => { return e.idPadre == idCampo });
                $("#" + campo.nombreParamentro + "" + accion.id).css("border", "1px solid #d9d9d9");
            } else if (campo.nombreParamentro == "idMotivo") {
                $("#" + campo.nombreParamentro + "" + accion.id).css("border", "1px solid #d9d9d9");
            } else {
                $("#" + campo.nombreParamentro + "" + accion.id).css("border", "1px solid #d9d9d9");
            }
        }
    }

    $scope.contadorTextArea = function (etiqueta) {
        var con = $("#" + etiqueta).val().length;
        if (con > 0) {
            $(".comentarios").css("border", "1px solid #d9d9d9");
            if (con > 50) {
                $(".etiquetaContador").css("color", "#f55756");
            } else {
                $(".etiquetaContador").css("color", "#a2a2a2");
            }
        } else {
            $(".comentarios").css("border-bottom", "2px solid #f55756");
        }

        $scope.contadorCaracteresTextArea = con;
    }

    $scope.guardarAccionAlerta = function (accion) {
        var respuestaValidacion = $scope.validarDatosAccionAlerta(accion);
        if (respuestaValidacion.validacion) {
            let params = {
                ot: $scope.alertaSeleccionadaObject.IdOT,
                folioSistema: $scope.alertaSeleccionadaObject.os,
                idFlujo: $scope.alertaSeleccionadaObject.idFlujo,
                idTipoOrden: $scope.alertaSeleccionadaObject.idIntervencion,
                idSubTipoOrden: $scope.alertaSeleccionadaObject.idSubIntervencion,
                idOrigenSistema: 1,
                idUsuarioDespacho: 12,
                latitud: $scope.alertaSeleccionadaObject.latitudAlerta,
                longitud: $scope.alertaSeleccionadaObject.longitudAlerta,
                idAccion: accion.id,
                idAlerta: $scope.alertaSeleccionadaObject.idAlerta,
                idUsuarioTecnico: $scope.alertaSeleccionadaObject.idTecnico,
                urlServicio: $scope.accionOtSeleccionadaAlerta.urlServicio,
                metodoHttp: $scope.accionOtSeleccionadaAlerta.metodoHttp
            };

            angular.forEach(accion.campos, function (campo, index) {
                if (campo.tipoCampo == "selectpicker") {
                    let fecha = $("#" + campo.nombreParamentro + "" + accion.id).val().split('/');
                    params[campo.nombreParamentro] = fecha[2] + '-' + fecha[1] + '-' + fecha[0];
                } else {
                    params[campo.nombreParamentro] = $("#" + campo.nombreParamentro + "" + accion.id).val();
                }
            });

            swal({ text: 'Cambiando estatus de la OT...', allowOutsideClick: false });
            swal.showLoading();
            genericService.cambioStatusOtsGeneric(params).then(result => {
                swal.close();
                if (result.data.respuesta) {
                    $("#idTituloAccionesAlertas").text("OPCIONES");
                    swal("Correcto", "¡Acción realizada con éxito!", "success");
                    $scope.cerrarAlertas();
                    $scope.consultarConteoAlertasPI();
                } else {
                    toastr.error(result.data.resultDescripcion);
                }
            }).catch(err => handleError(err));

        } else {
            toastr.warning(respuestaValidacion.mensaje);
        }

    }

    $scope.validarDatosAccionAlerta = function (accion) {
        let respuesta = { validacion: true, mensaje: "" };
        angular.forEach(accion.campos, function (campo, index) {
            if (campo.tieneValidacion == 1) {
                var valorCampo = $("#" + campo.nombreParamentro + "" + accion.id).val();
                if (valorCampo == null || valorCampo == "" || valorCampo == undefined) {
                    respuesta.validacion = false;
                    respuesta.mensaje = respuesta.mensaje + "<br/> *" + campo.nombreEtiqueta;
                    $("#" + campo.nombreParamentro + "" + accion.id).css("border-bottom", "2px solid #f55756");
                } else {
                    $("#" + campo.nombreParamentro + "" + accion.id).css("border-bottom", "1px solid #d9d9d9");
                }
            }
        });

        if (!respuesta.validacion) {
            respuesta.mensaje = "VALIDA LOS SIGUIENTES CAMPOS: " + respuesta.mensaje;
        }

        return respuesta;
    }


    $scope.seleciconarTodas = function (isSelected) {
        if (isSelected == '1') {
            $(".checkbox-evidencia").prop("checked", true);
            $(".checkbox-evidencia").removeClass("rechazada-check");
            $scope.listaTotal.aceptadas = $scope.listImagenesTipo.length;
            $scope.listaTotal.rechazadas = 0;
        } else {
            $(".checkbox-evidencia").prop("checked", false);
            $(".checkbox-evidencia").addClass("rechazada-check");
            $scope.listaTotal.rechazadas = $scope.listImagenesTipo.length;
            $scope.listaTotal.aceptadas = 0;
        }
    }

    $scope.changeSelect = function (element) {
        $(".radio-evidencias").prop("checked", false);
        let id = element.target.id;
        $.each($scope.listImagenesTipo, function (e, img) {
            if (id.split('_')[1] == img.id) {
                img.idEstatus = $("#" + id).is(":checked") ? 2 : 3;
            }
        })
        if ($("#" + id).is(":checked")) {
            $("#" + id).removeClass("rechazada-check");
            $scope.listaTotal.rechazadas = $(".rechazada-check").length;
            $scope.listaTotal.aceptadas = $scope.listaTotal.aceptadas + 1;
        } else {
            $("#" + id).addClass("rechazada-check");
            $scope.listaTotal.aceptadas = $scope.listaTotal.aceptadas !== 0 ? $scope.listaTotal.aceptadas - 1 : 0;
            $scope.listaTotal.rechazadas = $(".rechazada-check").length;
        }
    }


};










