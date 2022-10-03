
app.noticiasController = function ($scope, $q, busquedaService) {

    $scope.showAdjuntar = false;
    $scope.tipoResponse;
    $scope.banderaShow = false;
    $scope.tipoComentario;
    $scope.noticiaAnterior;
    $scope.mensajeGeneral = '';
    $scope.showEliminarFileGeneral = false;
    $scope.showEliminarSubCom = false;
    $scope.isAbiertoOSNoticias = false
    $scope.tituloNombreArchivoGeneral = ''

    $scope.abrirVentanaNoticias = function () {
        if (!$scope.isAbiertoOSNoticias && !$scope.isConsultaPrimeraVezNoticias) {
            $scope.objectoConsulta()
        }
        $scope.isAbiertoOSNoticias = !$scope.isAbiertoOSNoticias
        $(".container-noticia-elemento").height($(".container-busqueda").height()-45);
        $('.content-noticias-general').css({"maxHeight":$(".container-busqueda").height()-155}); 
        $scope.isConsultaPrimeraVezNoticias = true
    }

    $scope.objectoConsulta = function () {
        $scope.listadoNoticias = [];
        $scope.mensajeGeneral = '';
        $scope.resetFileGeneral();
        if (!swal.isVisible()) {
            swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
            swal.showLoading();
        }
        let params;
        $scope.elemento;
        if ($scope.elemento.keyObject === 'OS') {
            params = {
                objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                objectType: 'OrdenServicio'
            }
        } else if ($scope.elemento.keyObject === 'OP') {
            params = {
                objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                objectType: 'Oportunidad'
            }
        } else {
            params = {
                objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                objectType: 'Ticket'
            }
        }
        $scope.banderaShow = false;
        $scope.noticiaAnterior = undefined;

        busquedaService.consultarComentariosNoticiasSF(params).then((response) => {
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.listadoNoticias = response.data.result.news;
                } else {
                    swal.close();
                    mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n.')
                }
                setTimeout(function () {
                    $(".container-noticia-elemento").animate({ scrollTop: 100000000 }, 500);
                }, 400)
                swal.close();
            } else {
                swal.close();
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }
        }).catch((err) => handleError(err));
    }

    $scope.enviarMesajeGeneral = function () {
        let params;
        if ($scope.elemento.keyObject === 'OS') {
            if ($scope.mensajeGeneral=== '') {
                mostrarMensajeWarningValidacion('Escribir un comentario')
                return false;
            }

            params = {
                objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                text: $scope.mensajeGeneral
            }
            if (document.querySelector('#fileComentarioGeneral').files[0] !== undefined) {


                var myFile = document.querySelector('#fileComentarioGeneral').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {

                    params = {
                        objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                        text: $scope.mensajeGeneral,
                        documentName: document.querySelector('#fileComentarioGeneral').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileComentarioGeneral').files[0].name.split('.')[1],
                        document: reader.result.split(",")[1]
                    }
                    $scope.guardarMensaje(params);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            } else {
                $scope.guardarMensaje(params);
            }

        } else if ($scope.elemento.keyObject === 'OP') {
            if ($scope.mensajeGeneral === '') {
                mostrarMensajeWarningValidacion('Escribir un comentario')
                return false;
            }

            params = {
                objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                text: $scope.mensajeGeneral
            }
            if (document.querySelector('#fileComentarioGeneral').files[0]) {


                var myFile = document.querySelector('#fileComentarioGeneral').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {

                    params = {
                        objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                        text: $scope.mensajeGeneral,
                        documentName: document.querySelector('#fileComentarioGeneral').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileComentarioGeneral').files[0].name.split('.')[1],
                        document: reader.result.split(",")[1]
                    }
                    $scope.guardarMensaje(params);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            } else {
                $scope.guardarMensaje(params);
            }

        } else {
            if ($scope.mensajeGeneral === '') {
                mostrarMensajeWarningValidacion('Escribir un comentario')
                return false;
            }

            params = {
                objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                text: $scope.mensajeGeneral
            }
            if (document.querySelector('#fileComentarioGeneral').files[0] !== undefined) {


                var myFile = document.querySelector('#fileComentarioGeneral').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {

                    params = {
                        objectId: $scope.elemento.detalle.id ? $scope.elemento.detalle.id : $scope.idDetalleObject,
                        text: $scope.mensajeGeneral,
                        documentName: document.querySelector('#fileComentarioGeneral').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileComentarioGeneral').files[0].name.split('.')[1],
                        document: reader.result.split(",")[1]
                    }
                    $scope.guardarMensaje(params);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            } else {
                $scope.guardarMensaje(params);
            }

        }
    }

    $scope.guardarMensaje = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        let tituloAccion = "Crear comentario noticia";
        let mensajeEnvio = 'Ha ocurrido un error al crear el comentario para: ' + $scope.detalle.nombre;
        busquedaService.crearNoticia(params).then((response) => {
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.result === '0') {
                        mensajeEnvio = 'Se ha creado el comentario para: ' + $scope.detalle.nombre;
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                        $scope.resetFileGeneral();
                        $scope.mensajeGeneral = '';
                        $scope.objectoConsulta();
                    } else {
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        mostrarMensajeWarningValidacion(response.data.result.resultDescripcion)
                    }
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                }
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }

        }).catch((err) => handleError(err));
    }


    $scope.responderComentario = function (numero) {
        $scope.showAdjuntar = true;
       
        if ($scope.noticiaAnterior) {
            if ($scope.noticiaAnterior !== numero) {
                $scope.banderaShow = false;
                // document.getElementById('content-subcomentario-os-' + $scope.noticiaAnterior).style.display = 'none';
                // document.getElementById('content-subcomentario-op-' + $scope.noticiaAnterior).style.display = 'none';
                document.getElementById('content-subcomentario-ticket-' + $scope.noticiaAnterior).style.display = 'none';
                $scope.resetFile($scope.noticiaAnterior)
            }
        }
        if ($scope.banderaShow) {
            if ($scope.tipoResponse !== 0) {
                // document.getElementById('texto-subcomentario-os-' + numero).value = '';
                // document.getElementById('texto-subcomentario-op-' + numero).value = '';
                document.getElementById('texto-subcomentario-ticket-' + numero).value = '';
                $scope.tipoResponse = 0;
            } else {
                // document.getElementById('content-subcomentario-os-' + numero).style.display = 'none';
                // document.getElementById('content-subcomentario-op-' + numero).style.display = 'none';
                document.getElementById('content-subcomentario-ticket-' + numero).style.display = 'none';
                $scope.banderaShow = false;
                $scope.tipoResponse = null;
            }
        } else {
            // document.getElementById('content-subcomentario-os-' + numero).style.display = 'block';
            // document.getElementById('content-subcomentario-op-' + numero).style.display = 'block';
            document.getElementById('content-subcomentario-ticket-' + numero).style.display = 'block';
            // document.getElementById('texto-subcomentario-os-' + numero).value = '';
            // document.getElementById('texto-subcomentario-op-' + numero).value = '';
            document.getElementById('texto-subcomentario-ticket-' + numero).value = '';
            $scope.tipoResponse = 0;
            $scope.banderaShow = true;
        }
        $scope.noticiaAnterior = numero;
        $scope.resetFileGeneral();
    }

    $scope.enviarComentario = function (noticia) {
        let params = {}
        if ($scope.elemento.keyObject === 'OS') {
            if ($scope.tipoResponse === 0) {
                if (document.getElementById('texto-subcomentario-ticket-' + noticia).value === '') {
                    mostrarMensajeWarningValidacion('Escribir un comentario')
                    return false;
                }

                params = {
                    newId: noticia,
                    text: document.getElementById('texto-subcomentario-ticket-' + noticia).value
                }

                if (document.querySelector('#fileSubComentarioTicket-' + noticia).files[0] !== undefined) {

                    var myFile = document.querySelector('#fileSubComentarioTicket-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {
                        params = {
                            newId: noticia,
                            text: document.getElementById('texto-subcomentario-ticket-' + noticia).value,
                            documentName: document.querySelector('#fileSubComentarioTicket-' + noticia).files[0].name.split('.')[0],
                            documentExtension: document.querySelector('#fileSubComentarioTicket-' + noticia).files[0].name.split('.')[1],
                            document: reader.result.split(",")[1]
                        }
                       
                        $scope.crearSubComnetario(params);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                } else {
                    $scope.crearSubComnetario(params);
                }


            } else {
                if ($scope.tipoComentario === 0) {
                    if (document.getElementById('texto-comentario-os-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                     = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-os-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-os-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        subNewId: noticia,
                        text: document.getElementById('texto-comentario-os-' + noticia).value
                    }
                    $scope.editComentarioSub(params);
                }

            }
        } else if ($scope.elemento.keyObject === 'OP') {
            if ($scope.tipoResponse === 0) {
                if (document.getElementById('texto-subcomentario-ticket-' + noticia).value === '') {
                    mostrarMensajeWarningValidacion('Escribir un comentario')
                    return false;
                }

                params = {
                    newId: noticia,
                    text: document.getElementById('texto-subcomentario-ticket-' + noticia).value
                }

                if (document.querySelector('#fileSubComentarioTicket-' + noticia).files[0] !== undefined) {


                    var myFile = document.querySelector('#fileSubComentarioTicket-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {

                        params = {
                            newId: noticia,
                            text: document.getElementById('texto-subcomentario-ticket-' + noticia).value,
                            documentName: document.querySelector('#fileSubComentarioTicket-' + noticia).files[0].name.split('.')[0],
                            documentExtension: document.querySelector('#fileSubComentarioTicket-' + noticia).files[0].name.split('.')[1],
                            document: reader.result.split(",")[1]
                        }
                        $scope.crearSubComnetario(params);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                } else {
                    $scope.crearSubComnetario(params);
                }

            } else {
                if ($scope.tipoComentario === 0) {
                    if (document.getElementById('texto-comentario-op-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    params = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-op-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-op-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        subNewId: noticia,
                        text: document.getElementById('texto-comentario-op-' + noticia).value
                    }
                    $scope.editComentarioSub(params);
                }

            }
        } else {
            if ($scope.tipoResponse === 0) {
                if (document.getElementById('texto-subcomentario-ticket-' + noticia).value === '') {
                    mostrarMensajeWarningValidacion('Escribir un comentario')
                    return false;
                }

                params = {
                    newId: noticia,
                    text:  document.getElementById('texto-subcomentario-ticket-' + noticia).value
                }

                if (document.querySelector('#fileSubComentarioTicket-' + noticia).files[0] !== undefined) {
                  
                    var myFile = document.querySelector('#fileSubComentarioTicket-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {
                       // params.append("params.document", reader.result.split(",")[1]);
                        params = {
                            newId: noticia,
                            text: document.getElementById('texto-subcomentario-ticket-' + noticia).value,
                            documentName: document.querySelector('#fileSubComentarioTicket-' + noticia).files[0].name.split('.')[0],
                            documentExtension: document.querySelector('#fileSubComentarioTicket-' + noticia).files[0].name.split('.')[1],
                            document: reader.result.split(",")[1]
                        }
                        $scope.crearSubComnetario(params);
                    };
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                    };
                } else {
                    $scope.crearSubComnetario(params);
                }

            } else {
                if ($scope.tipoComentario === 0) {
                    if (document.getElementById('texto-comentario-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-' + noticia).value === '') {
                        mostrarMensajeWarningValidacion('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        subNewId: noticia,
                        text: document.getElementById('texto-comentario-' + noticia).value
                    }
                    $scope.editComentarioSub(params);
                }

            }
        }
    }

    $scope.crearSubComnetario = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        let tituloAccion = "Crear sub-comentario noticia";
        let mensajeEnvio = 'Ha ocurrido un error al crear el sub-comentario para: ' + $scope.detalle.nombre;
        busquedaService.crearSubNoticia(params).then(function success(response) {
            console.log(response)
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.result === '0') {
                        mensajeEnvio = 'Se ha creado el sub-comentario para: ' + $scope.detalle.nombre;
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                        $scope.resetFile(params.newId);
                        // document.getElementById('texto-subcomentario-os-' + params.newId).value = ''
                        // document.getElementById('texto-subcomentario-op-' + params.newId).value = ''
                        document.getElementById('texto-subcomentario-ticket-' + params.newId).value = ''
                        $scope.objectoConsulta();
                    } else {
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        swal.close()
                    }
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    mostrarMensajeErrorAlert("Hubo un error, por favor de intentar mas tarde.")
                    swal.close()
                }
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                mostrarMensajeErrorAlert(response.data.resultDescription)
                swal.close()
            }

        }).catch((err) => handleError(err));
    }

    $scope.resetFile = function (noticia) {
        //OS
        $(".text_select_archivo").text("Adjuntar archivo");
        $("#fileOs").val("");
        $scope.showEliminarOs = false;

        $(".text_select_archivo_sub").text("Adjuntar archivo");
        $("#fileSubComentarioOs-" + noticia).val("");
        $scope.showEliminarSubOs = false;

        //OPORTUNIDAD
        $(".text_select_archivo").text("Adjuntar archivo");
        $("#fileOportunidad").val("");
        $scope.showEliminarOp = false;

        $(".text_select_archivo_sub").text("Adjuntar archivo");
        $("#fileSubComentarioOp-" + noticia).val("");
        $scope.showEliminarSubOp = false;

        //TICKET
        $(".text_select_archivo").text("Adjuntar archivo");
        $("#fileTicket").val("");
        $scope.showEliminarTicket = false;

        $(".text_select_archivo_sub").text("Adjuntar archivo");
        $("#fileSubComentarioTick-" + noticia).val("");
        $scope.showEliminarSubTick = false;
    }

    $("#fileOs").change(function () {
        if ($('#fileOs').get(0).files[0] === undefined) {
            $(".text_select_archivo").text("Adjuntar archivo");
            $scope.showEliminarOs = false;
        } else {
            $(".text_select_archivo").text($('#fileOs').get(0).files[0].name);
            $scope.showEliminarOs = true;
        }
        $scope.$apply();
    });

    $("#fileOportunidad").change(function () {
        if ($('#fileOportunidad').get(0).files[0] === undefined) {
            $(".text_select_archivo").text("Adjuntar archivo");
            $scope.showEliminarOp = false;
        } else {
            $(".text_select_archivo").text($('#fileOportunidad').get(0).files[0].name);
            $scope.showEliminarOp = true;
        }
        $scope.$apply();
    });

    $("#fileTicket").change(function () {
        if ($('#fileTicket').get(0).files[0] === undefined) {
            $(".text_select_archivo").text("Adjuntar archivo");
            $scope.showEliminarTicket = false;
        } else {
            $(".text_select_archivo").text($('#fileTicket').get(0).files[0].name);
            $scope.showEliminarTicket = true;
        }
        $scope.$apply();
    });

    $scope.eliminarComentario = function (noticia, tipo) {
        swal({
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'S\u00ED',
            cancelButtonText: "No",
            html:
                '<b style="font-weight: bold;">\u00BFEsta seguro de querer eliminar comentario?</b>',
        }).then(function () {
            let params = {};
            if ($scope.elemento.keyObject === 'OS') {
                if (tipo === 0) {
                    params = {
                        objectType: 'OrdenServicio',
                        newId: noticia
                    }
                    $scope.enviarEliminarComentario(params);
                } else {
                    params = {
                        objectType: 'OrdenServicio',
                        subNewId: noticia
                    }
                    $scope.enviarEliminarSub(params);
                }
            } else if ($scope.elemento.keyObject === 'OP') {
                if (tipo === 0) {
                    params = {
                        objectType: 'Oportunidad',
                        newId: noticia
                    }
                    $scope.enviarEliminarComentario(params);
                } else {
                    params = {
                        objectType: 'Oportunidad',
                        subNewId: noticia
                    }
                    $scope.enviarEliminarSub(params);
                }
            } else {
                if (tipo === 0) {
                    params = {
                        objectType: 'Ticket',
                        newId: noticia
                    }
                    $scope.enviarEliminarComentario(params);
                } else {
                    params = {
                        objectType: 'Ticket',
                        subNewId: noticia
                    }
                    $scope.enviarEliminarSub(params);
                }
            }

        }).catch(swal.noop);
    }

    $scope.enviarEliminarComentario = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        let tituloAccion = "Eliminar comentario noticia";
        let mensajeEnvio = 'Ha ocurrido un error al eliminar el comentario para: ' + $scope.detalle.nombre;
        busquedaService.eliminarNoticia(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === "0") {
                        mensajeEnvio = 'Se ha eliminado el comentario para: ' + $scope.detalle.nombre;
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                        $scope.objectoConsulta();
                    } else {
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        swal.close()
                    }
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    mostrarMensajeErrorAlert("Error al consultar")
                    swal.close()
                }
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                mostrarMensajeErrorAlert("Error en el servidor")
                swal.close()
            }

        }, function error(response) {
            console.log(response);
        });
    }

    $scope.enviarEliminarSub = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        let tituloAccion = "Eliminar sub-comentario noticia";
        let mensajeEnvio = 'Ha ocurrido un error al eliminar el sub-comentario para: ' + $scope.detalle.nombre;
        busquedaService.eliminarSubNoticia(params).then(function success(response) {
            console.log(response);
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === "0") {
                        mensajeEnvio = 'Se ha eliminado el sub-comentario para: ' + $scope.detalle.nombre;
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
                        $scope.objectoConsulta();
                    } else {
                        objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                        mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        swal.close()
                    }
                } else {
                    objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                    mostrarMensajeErrorAlert("Error al consultar")
                    swal.close()
                }
            } else {
                objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
                mostrarMensajeErrorAlert("Error en el servidor")
                swal.close()
            }

        }, function error(response) {
            console.log(response);
        });
    }

    cambiar = function(evento) {
        if ($scope.elemento.keyObject === 'OS') {
            if( $('#'+evento.id).get(0).files[0] === undefined ){
                $(".text_select_archivo_sub").text("Adjuntar archivo");
                $scope.showEliminarSubOs = false;
            }else{
                $(".text_select_archivo_sub").text( $('#'+evento.id).get(0).files[0].name );
                $scope.showEliminarSubOs = true;
            }		
            $scope.$apply();  
            
        } else if($scope.elemento.keyObject === 'OP'){
            if( $('#'+evento.id).get(0).files[0] === undefined ){
                $(".text_select_archivo_sub").text("Adjuntar archivo");
                $scope.showEliminarSubOp = false;
            }else{
                $(".text_select_archivo_sub").text( $('#'+evento.id).get(0).files[0].name );
                $scope.showEliminarSubOp = true;
            }		
            $scope.$apply();  
            
        } else {
            if( $('#'+evento.id).get(0).files[0] === undefined ){
                $(".text_select_archivo_sub").text("Adjuntar archivo");
                $scope.showEliminarSubTick = false;
            }else{
                $(".text_select_archivo_sub").text( $('#'+evento.id).get(0).files[0].name );
                $scope.showEliminarSubTick = true;
            }		
            $scope.$apply();  
           
        }
 
    }

    $scope.cerrarNoticiasGeneral = function(){
        $scope.isAbiertoOSNoticias = false
        $scope.mensajeGeneral = ''
    }

    $scope.cambioGeneral = function(){
        if ($('#fileComentarioGeneral').get(0).files[0] === undefined) {
            $scope.tituloNombreArchivoGeneral = ''
            $scope.showEliminarFileGeneral= false
        } else {
            $scope.tituloNombreArchivoGeneral = $('#fileComentarioGeneral').get(0).files[0].name
            $scope.showEliminarFileGeneral = true
        }
    }

    $scope.resetFileGeneral = function(){
        $scope.tituloNombreArchivoGeneral = ''
        $("#fileComentarioGeneral").val("");
        $scope.showEliminarFileGeneral = false;
    }

    cambiar = function (evento) {
        let noticia = evento.id.split('-')[1]
        if ($('#' + evento.id).get(0).files[0] === undefined) {
            // document.getElementById('spnNombreAdSubComentarioOs-' + noticia).innerHTML = ''
            // document.getElementById('spnNombreAdSubComentarioOp-' + noticia).innerHTML = ''
            document.getElementById('spnNombreAdSubComentarioTicket-' + noticia).innerHTML = ''
            $scope.showEliminarSubCom = false;
        } else {
            // document.getElementById('spnNombreAdSubComentarioOs-' + noticia).innerHTML = $('#' + evento.id).get(0).files[0].name
            // document.getElementById('spnNombreAdSubComentarioOp-' + noticia).innerHTML = $('#' + evento.id).get(0).files[0].name
            document.getElementById('spnNombreAdSubComentarioTicket-' + noticia).innerHTML = $('#' + evento.id).get(0).files[0].name
            $scope.showEliminarSubCom = true;
        }
        $scope.$apply();
    }

    $scope.resetFile = function (noticia) {
        $("#fileSubComentarioOs-" + noticia).val("");
        $("#fileSubComentariotOp-" + noticia).val("");
        $("#fileSubComentarioTicket-" + noticia).val("");
        // document.getElementById('spnNombreAdSubComentarioOs-' + noticia).innerHTML = ''
        // document.getElementById('spnNombreAdSubComentarioOp-' + noticia).innerHTML = ''
        document.getElementById('spnNombreAdSubComentarioTicket-' + noticia).innerHTML = ''
        $scope.showEliminarSubCom = false;
    }
}
