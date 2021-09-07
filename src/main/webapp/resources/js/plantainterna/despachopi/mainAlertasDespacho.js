var tableAlerta;
app.alertasDespachoPrincipal=function($scope,mainAlertasService,genericService){

    console.log("mainAlertasService");
    $scope.otsAlertas = [];
    $scope.vistaDespacho = true;
    $scope.alertaSeleccionada = false;
    $scope.alertaSeleccionadaObject = {};
    $scope.tipoAlertaSeleccionada = {};
    $scope.estatusAlerta = {};



    $scope.getDetalleAlertas = function(alerta) {
        $("#pills-mapa-tab").click();
        $scope.idAlertaSelecionada = '';
        $scope.evidenciaAlertaConsultada = false;
        $scope.historicoAlertaConsultada = false;
        $scope.chatAlertaConsultada = false;
        $scope.showAaccion = false;
        $scope.alertaSeleccionadaObject = {};
        $scope.tipoAlertaSeleccionada = {};
        console.log(alerta);
        deleteMarkers();
        clearMarkers();
        console.log(alerta);
        $scope.alertaSeleccionada = false;
        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();

        var params = {
            "idTipoAlerta": 4
        }        
        console.log("params",params)
        mainAlertasService.getDetalleAlertas(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                $scope.otsAlertas = response.data.result.detalleAlerta;
                $scope.vistaDespacho = false;
                $scope.tipoAlertaSeleccionada = angular.copy(alerta);
                $scope.mostrarDetalleAlertas($scope.otsAlertas);
                swal.close();
            } else {
                swal.close();
            }
        }).catch(err => handleError(err));
        
    }

    $scope.mostrarDetalleAlertas = function(alertas) {
        
        $scope.viewTableResumen = [];
        angular.forEach(alertas,function(value,index){
            let alertaob=value.alerta ;
            let ordenobj=value.orden ;
            let tecnicoObj = value.tecnico;
            let  arra=[];
            arra[0] = alertaob.id ? alertaob.id : '';
            arra[1] = alertaob.folioSistema ? alertaob.folioSistema : '';
            arra[2] = `
                <div class="card card-alertas-pendientes" onclick="consultarAccionesAlerta('${ordenobj.id}', '${ordenobj.folioSistema}', '${alertaob.latitudAlerta}', '${alertaob.longitudAlerta}', '${tecnicoObj.latitud}', '${tecnicoObj.longitud}', '${alertaob.idSubAlerta}', '${ordenobj.idIntervencion}', 
                    '${ordenobj.idSubIntervencion}', '${tecnicoObj.id}', '${alertaob.idRegistroAlerta}')">
                    <div class="card-body card-body-alertas">
                        <div class="row">
                            <div class="col-12">
                                <span class="text-primary-alerta">OT: </span><span class="text-secundary-alerta">  ${ordenobj.id}   </span>
                                <span class="text-primary-alerta">Folio: </span><span class="text-secundary-alerta">  ${ordenobj.folioSistema}  </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">    
                                <span class="text-primary-alerta">Direcci&oacute;n: </span><span class="text-secundary-alerta"> ${ ordenobj.direccion } </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <span class="text-primary-alerta">Fecha y hora: </span><span class="text-secundary-alerta">  ${alertaob.fechaRegistro}  </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-muted card-alertas-pendientes-foot">
                        <div class="row">
                            <div class="col-12">
                                <span class="text-primary-alerta">Alerta: </span><span class="text-secundary-alerta">  ${alertaob.descripcionSubtipoAlerta}  </span>
                            </div>
                        </div>
                    </div>
                </div>
            `
            $scope.viewTableResumen.push(arra);
            
        });
        
        if(tableAlerta) {
            tableAlerta.destroy();
        }

        tableAlerta = $('#table-alertas-pi').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "scrollX": true,
            "info": false,
            "autoWidth": true,
            pageLength : 3,
            "language": idioma_espanol_not_font,
            "data": $scope.viewTableResumen,
            "sDom" : '<"top"f>rt<"bottom"lp><"bottom"r><"clear">',
            "columns": [
                {
                    "title": "",
                    "visible": false,
                }, {
                    "title": "",
                    "visible": false,
                }, {
                    "title": ""
                }]
        });
    }

    $scope.idAlertaSelecionada = '';
    consultarAccionesAlerta = function(ot, os, latAlerta, longAlerta, latTecnico, longTecnico, idSubTipoAlerta, idIntervencion, idSubIntervencion, idTecnico, idAlerta) {
        if ($scope.idAlertaSelecionada !== ot) {
            $scope.idAlertaSelecionada = ot;
            $scope.evidenciaAlertaConsultada = false;
            $scope.historicoAlertaConsultada = false;
            $scope.chatAlertaConsultada = false;
            $scope.showAaccion = false;
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
                idAlerta: idAlerta
            };
            console.log($scope.alertaSeleccionadaObject);
            $scope.$apply();
            $("#pills-mapa-tab").click();
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            var params = {
                "idTipoAlerta": idSubTipoAlerta
            }        
            mainAlertasService.consultaAccionesAlerta(params).then(function success(response) {
                //response.data = accionesOt;
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        $scope.alertaSeleccionada = true;
                    $scope.setMarkets($scope.alertaSeleccionadaObject);
                    $scope.listaOpcionesAlerta = response.data.result.acciones;
                    
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
    $scope.mostrarAccionAlerta = function(accion) {
        /*
        console.log(accion);
        $scope.listaEstadoAlerta = [];
        $scope.listaCampos = [];
        var params = {
            "ID_Propietario": "1"
        }
        //$scope.listaCampos = accion.Campo;
        //console.log($scope.listaCampos);
        mainAlertasService.getCatalogoStatusEstadoMotivo(params).then(function success(response) {
            console.log(response);
            response.data = catalogoEstatusAlerta;
            if (response.data !== undefined) {
                $scope.listaCatalogoEstatusAlerta = response.data.result.Ststus;
                $scope.showAaccion = true;
                $scope.showOpcion = 0;
                $scope.listaEstadoAlerta = $scope.listaCatalogoEstatusAlerta.filter(estatus => estatus.Nivel === "2")
                $scope.mostrarOpcionAlerta(accion);
                swal.close();
            } else {
                swal.close();
            }
        }).catch(err => handleError(err));
        */

        $scope.showAaccion = true;
        $scope.showOpcion = 0;
        $scope.listaMotivosAlerta = [];
        $scope.mostrarOpcionAlerta(accion);
    }

    $scope.showOpcion = 0;
    $scope.mostrarOpcionAlerta = function(accion) {
        console.log(accion);
        switch (accion.id) {
            case "12":
                //RESCATE
                $scope.showOpcion = 1;
                break;
            case 1: 
                //REAGENDAR
                $scope.showOpcion = accion.id;
                $scope.listaMotivosAlerta = $scope.filtrosAlertas.catalogoEstatus.filter(e => {return e.idPadre === 201})
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
    $scope.consultarMotivoAlerta = function(element) {
        console.log(element);
        $scope.listaMotivoEstatus = [];
        $scope.listaMotivoEstatus = $scope.listaCatalogoEstatusAlerta.filter(estatus => estatus.ID_Padre === element.ID);
    }

    $scope.ocultarAccionAlerta = function() {
        $scope.showAaccion = false;
    }

    $scope.cambiarEstatusIntegrador = function() {
        swal({ text: 'Guardando datos ...', allowOutsideClick: false });
            swal.showLoading();
        var params = {
            "Id_estado": $scope.estatusAlerta.estado.ID,
            "Id_motivo": $scope.estatusAlerta.motivo.ID
        }        
        mainAlertasService.cambiarEstatusIntegrador(params).then(function success(response) {
            console.log(response);
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
    $scope.consultarEvidenciaAlerta = function() {
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
                console.log(response);
                
                response = imagenesAlerta;
                console.log(response);
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

    $(document.body).on("click",".btn_categoria_img",function(){

		if( $(this).hasClass('btn-blue-grey') )return false;
	
		var id_categoria=$.trim(  $(this).attr('attr_id_cat') );
		var texto_btn_categoria=$.trim(  $(this).text() );
	
		if(id_categoria===''){
			$(".btn_categoria_img").removeClass('btn-blue-grey').addClass('btn-outline-blue-grey');
			$("#categoria_img_0").removeClass('btn-outline-blue-grey').addClass('btn-blue-grey');
			$(".magnific.item").show();
			$('.imagen_content:hidden').show(400);
			setTimeout(function() {  mostarImagenesCategoria(); }, 500);
	
		}else{
			$(".btn_categoria_img").removeClass('btn-blue-grey').addClass('btn-outline-blue-grey');
			$("#categoria_img_"+id_categoria).removeClass('btn-outline-blue-grey').addClass('btn-blue-grey');
	
			
			if($(".imagen_content:visible").length > 0){
				$(".imagen_content:visible").hide(150,"linear",function(){
	
					$(".magnific.item:not(.imgtipo_"+id_categoria+")").hide();
					$(".magnific.item.imgtipo_"+id_categoria+"").show();
	
					 $('.content_img_'+id_categoria).show(200);
					 //Manda function magnific popup
					 mostarImagenesCategoria();
				});
			}else{
				$(".magnific.item:not(.imgtipo_"+id_categoria+")").hide();
				$(".magnific.item.imgtipo_"+id_categoria+"").show();
	
				 $('.content_img_'+id_categoria).show(200);
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

    limpiarImagenesEvidencia = function () {
		$("#categorias_div .content_category").not(":first").remove();
		$("#contenido_imagenes").empty();

		$("#parent_imagenes").hide();
		$("#not_info_evidencia").show();
	}

    $scope.listaHistoricoAlerta = [];
    $scope.historicoAlertaConsultada = false;
    $scope.consultarHistoricoAlerta = function() {
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
                    console.log(response);
                    if (response.data !== undefined) {
                        if (response.data.respuesta) {
                            if (response.data.result) {
                                if (response.data.result.detalle) {
                                    $scope.listaHistoricoAlerta = response.data.result.detalle.reverse();
                                }else{
                                    toastr.warning( response.data.result.mensaje );                
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
            setTimeout(function(){
                $("#pills-mapa-tab").click();
            }, 0500);
        }
    }

    $scope.listaComentariosAlerta = [];
    $scope.chatAlertaConsultada = false;
    $scope.consultarChatAlerta = function() {
        if ($scope.alertaSeleccionada) {
            if(!$scope.chatAlertaConsultada) {
                $scope.chatAlertaConsultada = true;
                swal({ text: 'Consultando datos ...', allowOutsideClick: false });
                swal.showLoading();
                var params = {
                    //"idOt": "3"//PENDIENTE
                    "idOt": $scope.alertaSeleccionadaObject.IdOT
                }        
                mainAlertasService.consultarComentariosAlertaPI(params).then(function success(response) {
                    console.log(response);
                    if (response.data !== undefined) {
                        if(response.data.respuesta) {
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
            setTimeout(function(){
                $("#pills-mapa-tab").click();
            }, 0500);
        }
        
    }

    $scope.comentarioAlerta = "";
    $scope.agregarComentario = function() {
        if ($scope.comentarioAlerta !== "") {
            var params = {
                "comentario": $scope.comentarioAlerta,
                //"idOrden": "3010",
                "idOrden": $scope.alertaSeleccionadaObject.IdOT,
                "origenSistema": "2"
            }        
            genericService.agregarComentariosOt(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        console.log("Agregando ");
                        toastr.success(response.data.resultDescripcion);
                        $scope.comentarioAlerta = "";
                        $scope.chatAlertaConsultada = false;
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
            toastr.warning( 'Ingrese un comentario.' );  
        }
    }

    $scope.reagendaAlerta = {};
    $scope.rescateAlerta = {};
    $scope.calendarizarAlerta = {};
    $scope.terminarAlerta = {};
    $scope.cambiarEstatusAlertaValidacion = function() {
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

    $scope.cambiarEstatusAlerta = function(params) {

        genericService.cambioStatusOts(params).then(result =>{
            console.log(result);
            swal.close();
            if(result.data.respuesta){
             
                toastr.success( result.data.result.mensaje );
                $("#modalDetalleOT").modal('hide')
                $scope.refrescarBusqueda()
            }else{
                console.log(result.data.resultDescripcion)
                toastr.warning( result.data.resultDescripcion );
                
            }
        }).catch(err => handleError(err));
    }

    var mapaAlerta;
    var markers = [];
    $scope.iniciarMapaAlertas = function() {
        mapaAlerta = new google.maps.Map(document.getElementById("mapAlerta"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    }
    $scope.iniciarMapaAlertas();

    $scope.setMarkets = function(pos){
        mapaAlerta.setCenter({lat:parseFloat(pos.latitudAlerta), lng:parseFloat(pos.longitudAlerta)});
        deleteMarkers();
        clearMarkers();
        var marker = new google.maps.Marker({
            position : {
                lat : parseFloat(pos.latitudTecnico),
                lng : parseFloat(pos.longitudTecnico)
            },
            title : "Tecnico",
            animation : google.maps.Animation.DROP,
            map : mapaAlerta,
            icon : "./resources/img/maps/pin-operario.png"
        });
        markers.push(marker);
        marker = new google.maps.Marker({
            position : {
                lat : parseFloat(pos.latitudAlerta),
                lng : parseFloat(pos.longitudAlerta)
            },
            title : "OT",
            animation : google.maps.Animation.DROP,
            map : mapaAlerta,
            icon : "./resources/img/maps/pin-pendiente.png"
        });
        markers.push(marker);
    }

    clearMarkers = function() {
        setMapOnAll(null);
    }
    setMapOnAll = function(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
    }
    deleteMarkers = function() {
        clearMarkers();
        markers = [];
    }

    let groupBy = function(xs, key) {
		return xs.reduce(function(rv, x) {
		  (rv[x[key]] = rv[x[key]] || []).push(x);
		  return rv;
		}, {});
	};

    $scope.cerrarAlertas = function() {
        $scope.vistaDespacho = true;
        $scope.refrescarBusqueda();
    }

    $scope.initTableOrdenesPendientes = function() {
        console.log($scope.listaOrdenesPendientes);
        /*
        $scope.viewTable = [];
        angular.forEach(listaOrdenes,function(value,key){
            let  arra=[];
            arra[0] = '<div class="col-12 text-center"><i class="fa fa-star star-top-5000"></i></div>';

            $scope.viewTable.push(arra);
        });
        */

        if(tableAlerta) {
            tableAlerta.destroy();
        }

        $('.ot-pendiente-event').each(function(index) {	
            console.log(index);
            let otpendiente=$scope.otsAlertas[index]   
            $(this).data('event', {
                objectevent: otpendiente ,
                stick: true 			
            });		
	    });	

        tableAlerta=$('#table-alertas-pi').DataTable({
            info: false,
            pageLength : 3,
            language: {
                   zeroRecords: "No se encontraron OT\u00B4s",
                   infoEmpty: "No se encontro la OT",
                   infoFiltered: "(OT no encontrada)",
                   paginate: {
                       first:      '<i class="fa fa-fast-backward"></i>',
                       last:       '<i class="fa fa-fast-forward"></i>',
                       next:       ' ',
                       previous:   ' '
                   }
               }
        });


        $('#filterPendiente').keyup( function() {
            console.log("Gg");
            tableOrdenes.draw();
        });

        
    }

    $( document ).ready(function() {

        $('#fecha-reagendamiento-alerta').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true,
            startDate :  moment(FECHA_HOY_DATE).toDate()
        });
        $('#fecha-reagendamiento-alerta').datepicker('update',FECHA_HOY_DATE);

    });

    


};