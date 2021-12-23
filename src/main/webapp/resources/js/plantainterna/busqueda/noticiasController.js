
app.noticiasController = function ($scope, $q, busquedaService) {

    $scope.showAdjuntar = false;
    $scope.tipoResponse;
    $scope.banderaShow = false;
    $scope.tipoComentario;
    $scope.noticiaAnterior;

    $scope.abrirVentanaNoticias = function () {
        if (!$scope.isAbiertoOSNoticias && !$scope.isConsultaPrimeraVezNoticias) {
            $scope.objectoConsulta()
        }
        $scope.isAbiertoOSNoticias = !$scope.isAbiertoOSNoticias

        $scope.isConsultaPrimeraVezNoticias = true
    }

    $scope.objectoConsulta = function () {
        $scope.listadoNoticias = [];
        if (!swal.isVisible()) {
            swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
            swal.showLoading();
        }
        let params;
        $scope.elemento;
        if ($scope.elemento.keyObject === 'OS') {
            params = {
                objectId: $scope.elemento.detalle.id,
                objectType: 'OrdenServicio'
            }
        } else if ($scope.elemento.keyObject === 'OP') {
            params = {
                objectId: $scope.elemento.detalle.id,
                objectType: 'Oportunidad'
            }
        } else {
            params = {
                objectId: $scope.elemento.detalle.id,
                objectType: 'Ticket'
            }
        }
        $scope.banderaShow = false;
        $scope.noticiaAnterior = undefined;

        busquedaService.consultarComentariosNoticiasSF(params).then((response) => {
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.listadoNoticias = response.data.result.news;
                    swal.close();
                } else {
                    swal.close();
                    mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n.')
                }
                setTimeout(function () {
                    $(".container-noticia-elemento").animate({ scrollTop: 100000000 }, 500);
                }, 400)
            } else {
                swal.close();
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }
        }).catch((err) => handleError(err));
    }

    $scope.enviarMesajeGeneral = function () {
        // let params = new FormData();
        let params;
        if ($scope.elemento.keyObject === 'OS') {
            if (document.getElementById('text-general-os').value === '') {
                mostrarMensajeWarning('Escribir un comentario')
                return false;
            }
            /* params.append("params.objectId", $scope.elemento.detalle.id);
            params.append("params.text", document.getElementById('text-general-os').value);
            params.append("params.autorId", $scope.autorIdSalect); */
            params = {
                objectId: $scope.elemento.detalle.id,
                text: document.getElementById('text-general-os').value
            }
            if (document.querySelector('#fileOs').files[0] !== undefined) {
                //params.append("params.documentName", document.querySelector('#fileOs').files[0].name.split('.')[0]);
                //params.append("params.documentExtension", document.querySelector('#fileOs').files[0].name.split('.')[1]);


                var myFile = document.querySelector('#fileOs').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {
                    //params.append("params.document", reader.result.split(",")[1]);
                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: document.getElementById('text-general-os').value,
                        documentName: document.querySelector('#fileOs').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileOs').files[0].name.split('.')[1],
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
            if (document.getElementById('text-general-oportunidad').value === '') {
                mostrarMensajeWarning('Escribir un comentario')
                return false;
            }
            //params.append("params.objectId", $scope.idObject);
            //params.append("params.text", document.getElementById('text-general-oportunidad').value);
            //params.append("params.autorId", $scope.autorIdSalect);
            params = {
                objectId: $scope.elemento.detalle.id,
                text: document.getElementById('text-general-oportunidad').value
            }
            if (document.querySelector('#fileOportunidad').files[0]) {
                //params.append("params.documentName", document.querySelector('#fileOportunidad').files[0].name.split('.')[0]);
                //params.append("params.documentExtension", document.querySelector('#fileOportunidad').files[0].name.split('.')[1]);


                var myFile = document.querySelector('#fileOportunidad').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {
                    //params.append("params.document", reader.result.split(",")[1]);
                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: document.getElementById('text-general-oportunidad').value,
                        documentName: document.querySelector('#fileOportunidad').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileOportunidad').files[0].name.split('.')[1],
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
            if (document.getElementById('text-general-ticket').value === '') {
                mostrarMensajeWarning('Escribir un comentario')
                return false;
            }

            //params.append("params.objectId", $scope.idObject);
            //params.append("params.text", document.getElementById('text-general-ticket').value);
            //params.append("params.autorId", $scope.autorIdSalect);
            params = {
                objectId: $scope.elemento.detalle.id,
                text: document.getElementById('text-general-ticket').value
            }
            if (document.querySelector('#fileTicket').files[0] !== undefined) {
                //params.append("params.documentName", document.querySelector('#fileTicket').files[0].name.split('.')[0]);
                //params.append("params.documentExtension", document.querySelector('#fileTicket').files[0].name.split('.')[1]);


                var myFile = document.querySelector('#fileTicket').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                console.log(reader)
                reader.onload = function () {
                    //params.append("params.document", reader.result.split(",")[1]);
                    params = {
                        objectId: $scope.elemento.detalle.id,
                        text: document.getElementById('text-general-ticket').value,
                        documentName: document.querySelector('#fileTicket').files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileTicket').files[0].name.split('.')[1],
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
        busquedaService.crearNoticia(params).then((response) => {
            console.log(response)
            swal.close()
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.result === '0') {
                        $scope.resetFile();
                        if ($scope.elemento.keyObject === 'OS') {
                            document.getElementById('text-general-os').value = ''
                        } else if ($scope.elemento.keyObject === 'OP') {
                            document.getElementById('text-general-oportunidad').value = ''
                        } else {
                            document.getElementById('text-general-ticket').value = ''
                        }
                        $scope.objectoConsulta();
                    } else {
                        mostrarMensajeWarningValidacion(response.data.result.resultDescripcion)
                    }
                } else {
                    mostrarMensajeWarningValidacion(response.data.resultDescripcion)
                }
            } else {
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }

        }).catch((err) => handleError(err));
    }


    $scope.responderComentario = function (numero) {
        $scope.showAdjuntar = true;
        if ($scope.noticiaAnterior) {
            if ($scope.noticiaAnterior !== numero) {
                $scope.banderaShow = false;
                document.getElementById('content-text-enviar-' + $scope.noticiaAnterior).style.display = 'none';
                document.getElementById('content-text-e-' + $scope.noticiaAnterior).style.display = 'none';
                document.getElementById('content-text-' + $scope.noticiaAnterior).style.display = 'none';
                document.getElementById('button-subcommet-' + $scope.noticiaAnterior).style.display = 'none'
            }
        }
        if ($scope.banderaShow) {
            if ($scope.tipoResponse !== 0) {
                document.getElementById('texto-comentario-op-' + numero).value = '';
                document.getElementById('texto-comentario-' + numero).value = '';
                document.getElementById('texto-comentario-os-' + numero).value = '';
                $scope.tipoResponse = 0;
            } else {
                document.getElementById('content-text-enviar-' + numero).style.display = 'none';
                document.getElementById('content-text-e-' + numero).style.display = 'none';
                document.getElementById('content-text-' + numero).style.display = 'none';
                document.getElementById('button-subcommet-' + numero).style.display = 'none'
                $scope.banderaShow = false;
                $scope.tipoResponse = null;
            }
        } else {
            document.getElementById('content-text-enviar-' + numero).style.display = 'block';
            document.getElementById('content-text-e-' + numero).style.display = 'block';
            document.getElementById('content-text-' + numero).style.display = 'block';
            document.getElementById('button-subcommet-' + numero).style.display = 'block'
            document.getElementById('texto-comentario-op-' + numero).value = '';
            document.getElementById('texto-comentario-' + numero).value = '';
            document.getElementById('texto-comentario-os-' + numero).value = '';
            $scope.tipoResponse = 0;
            $scope.banderaShow = true;
        }
        $scope.noticiaAnterior = numero;
    }

    $scope.enviarComentario = function (noticia) {
        let params = {}
        if ($scope.elemento.keyObject === 'OS') {
            if ($scope.tipoResponse === 0) {
                if (document.getElementById('texto-comentario-os-' + noticia).value === '') {
                    mostrarMensajeWarning('Escribir un comentario')
                    return false;
                }

                params = {
                    newId: noticia,
                    text: document.getElementById('texto-comentario-os-' + noticia).value
                }
                //params.append("params.newId", noticia);
                //params.append("params.text", document.getElementById('texto-comentario-os-' + noticia).value);
                //params.append("params.autorId", $scope.autorIdSalect);
                if (document.querySelector('#fileSubComentarioOs-' + noticia).files[0] !== undefined) {
                    //params.append("params.documentName", document.querySelector('#fileSubComentarioOs-' + noticia).files[0].name.split('.')[0]);
                    //params.append("params.documentExtension", document.querySelector('#fileSubComentarioOs-' + noticia).files[0].name.split('.')[1]);


                    var myFile = document.querySelector('#fileSubComentarioOs-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {
                        params = {
                            newId: noticia,
                            text: document.getElementById('texto-comentario-os-' + noticia).value,
                            documentName: document.querySelector('#fileSubComentarioOs-' + noticia).files[0].name.split('.')[0],
                            documentExtension: document.querySelector('#fileSubComentarioOs-' + noticia).files[0].name.split('.')[1],
                            document: reader.result.split(",")[1]
                        }
                        //params.append("params.document", reader.result.split(",")[1]);
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
                        mostrarMensajeWarning('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-os-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-os-' + noticia).value === '') {
                        mostrarMensajeWarning('Escribir un comentario')
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
                if (document.getElementById('texto-comentario-op-' + noticia).value === '') {
                    mostrarMensajeWarning('Escribir un comentario')
                    return false;
                }
                params.append("params.newId", noticia);
                params.append("params.text", document.getElementById('texto-comentario-op-' + noticia).value);
                //params.append("params.autorId", $scope.autorIdSalect);
                if (document.querySelector('#fileSubComentarioOp-' + noticia).files[0] !== undefined) {
                    params.append("params.documentName", document.querySelector('#fileSubComentarioOp-' + noticia).files[0].name.split('.')[0]);
                    params.append("params.documentExtension", document.querySelector('#fileSubComentarioOp-' + noticia).files[0].name.split('.')[1]);


                    var myFile = document.querySelector('#fileSubComentarioOp-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {
                        params.append("params.document", reader.result.split(",")[1]);
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
                        mostrarMensajeWarning('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-op-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-op-' + noticia).value === '') {
                        mostrarMensajeWarning('Escribir un comentario')
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
                if (document.getElementById('texto-comentario-' + noticia).value === '') {
                    mostrarMensajeWarning('Escribir un comentario')
                    return false;
                }
                params.append("params.newId", noticia);
                params.append("params.text", document.getElementById('texto-comentario-' + noticia).value);
                //params.append("params.autorId", $scope.autorIdSalect);
                if (document.querySelector('#fileSubComentarioTick-' + noticia).files[0] !== undefined) {
                    params.append("params.documentName", document.querySelector('#fileSubComentarioTick-' + noticia).files[0].name.split('.')[0]);
                    params.append("params.documentExtension", document.querySelector('#fileSubComentarioTick-' + noticia).files[0].name.split('.')[1]);


                    var myFile = document.querySelector('#fileSubComentarioTick-' + noticia).files[0];
                    var reader = new FileReader();
                    console.log(myFile)
                    reader.readAsDataURL(myFile);
                    reader.onload = function () {
                        params.append("params.document", reader.result.split(",")[1]);
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
                        mostrarMensajeWarning('Escribir un comentario')
                        return false;
                    }
                    let params = {
                        newId: noticia,
                        text: document.getElementById('texto-comentario-' + noticia).value
                    }
                    $scope.editComentario(params);
                } else {
                    if (document.getElementById('texto-comentario-' + noticia).value === '') {
                        mostrarMensajeWarning('Escribir un comentario')
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
        busquedaService.crearSubNoticia(params).then(function success(response) {
            console.log(response)
            swal.close();
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.result === '0') {
                        $scope.objectoConsulta();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlert("Hubo un error, por favor de intentar mas tarde.")
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescription)
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
        busquedaService.eliminarNoticia(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === "0") {
                        $scope.objectoConsulta();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlert("Error al consultar")
                    swal.close()
                }
            } else {
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
        busquedaService.eliminarSubNoticia(params).then(function success(response) {
            console.log(response);
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === "0") {
                        $scope.objectoConsulta();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.resultDescription)
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlert("Error al consultar")
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlert("Error en el servidor")
                swal.close()
            }

        }, function error(response) {
            console.log(response);
        });
    }
}
