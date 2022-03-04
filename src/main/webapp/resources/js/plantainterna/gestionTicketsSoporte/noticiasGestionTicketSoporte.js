
app.noticiasGestionTicketSoporte = function ($scope, gestionTicketSoporteService) {

    $scope.showEliminarFileTicket = false;
    $scope.showEliminarSubComTicket = false;
    $scope.tipoResponse;
    $scope.banderaShow = false;
    $scope.tipoComentario;
    $scope.noticiaAnterior;
    $scope.mensajeGeneral = '';
    
    $scope.consultarComentariosTicketSoporte = function(){
        let params = {
            objectId: "a153C000000870NQAQ",
            objectType: "OrdenServicio"
        }
        if (!swal.isVisible()) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }
       
        gestionTicketSoporteService.consultarComentariosNoticiasSF(params).then((response) => {
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.listadoNoticias = response.data.result.news;
                    swal.close();
                } else {
                    swal.close();
                    mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n.')
                }
                $scope.isConsultaComentarios = true

                // setTimeout(function () {
                //     $(".container-noticia-elemento").animate({ scrollTop: 1000000 }, 500);
                // }, 400)
                // $(".container-noticia-elemento").show(500);
            } else {
                swal.close();
                $scope.isConsultaComentarios = true
                mostrarMensajeWarningValidacion(response.data.resultDescripcion)
            }
        }).catch((err) => handleError(err));
    }

    $scope.responderComentarioTicket = function (numero) {
        $scope.showAdjuntar = true;
       
        if ($scope.noticiaAnterior) {
            if ($scope.noticiaAnterior !== numero) {
                $scope.banderaShow = false;
                document.getElementById('content-subcomentario-' + $scope.noticiaAnterior).style.display = 'none';
            }
        }
        if ($scope.banderaShow) {
            if ($scope.tipoResponse !== 0) {
                document.getElementById('texto-subcomentario-' + numero).value = '';
                $scope.tipoResponse = 0;
            } else {
                document.getElementById('content-subcomentario-' + numero).style.display = 'none';
                $scope.banderaShow = false;
                $scope.tipoResponse = null;
            }
        } else {
            document.getElementById('content-subcomentario-' + numero).style.display = 'block';
            document.getElementById('texto-subcomentario-' + numero).value = '';
            $scope.tipoResponse = 0;
            $scope.banderaShow = true;
        }
        $scope.noticiaAnterior = numero;
    }

    $scope.resetFile = function (noticia) {
        $(".text_select_archivo_sub").text("");
        $("#fileSubComentarioTicket-" + noticia).val("");
        document.getElementById('textAdjuntar' + noticia).innerHTML = ''
        $scope.showEliminarSubComTicket = false;
    }

    cambiar = function (evento) {
        if ($('#' + evento.id).get(0).files[0] === undefined) {
            $(".text_select_archivo_sub").text("");
            $scope.showEliminarSubComTicket = false;
        } else {
            $(".text_select_archivo_sub").text($('#' + evento.id).get(0).files[0].name);
            $scope.showEliminarSubComTicket = true;
        }
        $scope.$apply();
    }

    $scope.resetFileGeneral = function(){
        $(".text_select_archivo").text("");
        $("#fileComentariosTicket").val("");
        $scope.showEliminarFileTicket = false;
    }

    $scope.enviarMesajeGeneral = function () {
        // let params = new FormData();
        let params;
        console.log($scope.mensajeGeneral)
        if ($scope.mensajeGeneral === '') {
            mostrarMensajeWarningValidacion('Escribir un comentario')
            return false;
        }
        params = {
            objectId: 'a153C0000008EDdQAM',
            text: $scope.mensajeGeneral
        }
        if (document.querySelector('#fileComentariosTicket').files[0] !== undefined) {
            //params.append("params.documentName", document.querySelector('#fileOs').files[0].name.split('.')[0]);
            //params.append("params.documentExtension", document.querySelector('#fileOs').files[0].name.split('.')[1]);


            var myFile = document.querySelector('#fileComentariosTicket').files[0];
            var reader = new FileReader();
            reader.readAsDataURL(myFile);
            console.log(reader)
            reader.onload = function () {
                //params.append("params.document", reader.result.split(",")[1]);
                params = {
                    objectId: 'a153C0000008EDdQAM',
                    text: $scope.mensajeGeneral,
                    documentName: document.querySelector('#fileComentariosTicket').files[0].name.split('.')[0],
                    documentExtension: document.querySelector('#fileComentariosTicket').files[0].name.split('.')[1],
                    document: reader.result.split(",")[1]
                }
                $scope.guardarComentarioTicket(params);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        } else {
            $scope.guardarComentarioTicket(params);
        }

    }

    $scope.guardarComentarioTicket = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.crearNoticia(params).then((response) => {
            console.log(response)
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.result === '0') {
                        $scope.resetFileGeneral();
                        $scope.mensajeGeneral = ''
                        $scope.consultarComentariosTicketSoporte();
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

    $scope.enviarComentario = function (noticia) {
        let params = {}
        if ($scope.tipoResponse === 0) {
            if (document.getElementById('texto-subcomentario-' + noticia).value === '') {
                mostrarMensajeWarningValidacion('Escribir un comentario')
                return false;
            }

            params = {
                newId: noticia,
                text: document.getElementById('texto-subcomentario-' + noticia).value
            }
            //params.append("params.newId", noticia);
            //params.append("params.text", document.getElementById('texto-comentario-os-' + noticia).value);
            //params.append("params.autorId", $scope.autorIdSalect);
            if (document.querySelector('#fileSubComentarioTicket-' + noticia).files[0] !== undefined) {
                //params.append("params.documentName", document.querySelector('#fileSubComentarioOs-' + noticia).files[0].name.split('.')[0]);
                //params.append("params.documentExtension", document.querySelector('#fileSubComentarioOs-' + noticia).files[0].name.split('.')[1]);


                var myFile = document.querySelector('#fileSubComentarioTicket-' + noticia).files[0];
                var reader = new FileReader();
                console.log(myFile)
                reader.readAsDataURL(myFile);
                reader.onload = function () {
                    params = {
                        newId: noticia,
                        text: document.getElementById('texto-subcomentario-' + noticia).value,
                        documentName: document.querySelector('#fileSubComentarioTicket-' + noticia).files[0].name.split('.')[0],
                        documentExtension: document.querySelector('#fileSubComentarioTicket-' + noticia).files[0].name.split('.')[1],
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
                if (document.getElementById('texto-subcomentario-' + noticia).value === '') {
                    mostrarMensajeWarning('Escribir un comentario')
                    return false;
                }
                let params = {
                    newId: noticia,
                    text: document.getElementById('texto-subcomentario-' + noticia).value
                }
                $scope.editComentario(params);
            } else {
                if (document.getElementById('texto-subcomentario-' + noticia).value === '') {
                    mostrarMensajeWarning('Escribir un comentario')
                    return false;
                }
                let params = {
                    subNewId: noticia,
                    text: document.getElementById('texto-subcomentario-' + noticia).value
                }
                $scope.editComentarioSub(params);
            }

        }
         
    }

    $scope.crearSubComnetario = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.crearSubNoticia(params).then(function success(response) {
            console.log(response)
            if (response.data.result) {
                if (response.data.result.result === '0') {
                    document.getElementById('content-subcomentario-' + params.newId).style.display = 'none';
                    $scope.resetFile(params.newId);
                    $scope.banderaShow = false;
                    $scope.tipoResponse = null;
                    $scope.consultarComentariosTicketSoporte();
                } else {
                    mostrarMensajeErrorAlert(response.data.result.resultDescription)
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlert("Hubo un error, por favor de intentar mas tarde.")
                swal.close()
            }

        }).catch((err) => handleError(err));
    }

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
            

        }).catch(swal.noop);
    }

    $scope.enviarEliminarComentario = function (params) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        gestionTicketSoporteService.eliminarNoticia(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === "0") {
                        $scope.consultarComentariosTicketSoporte();
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
        gestionTicketSoporteService.eliminarSubNoticia(params).then(function success(response) {
            console.log(response);
            if (response.data.respuesta) {
                if (response.data.result !== undefined) {
                    if (response.data.result.result === "0") {
                        $scope.consultarComentariosTicketSoporte();
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

    $scope.cambioGeneral = function(){
        if ($('#fileComentariosTicket').get(0).files[0] === undefined) {
            $(".text_select_archivo").text("");
            $scope.showEliminarFileTicket = false
        } else {
            $(".text_select_archivo").text($('#fileComentariosTicket').get(0).files[0].name);
            $scope.showEliminarFileTicket = true
        }
    }
}