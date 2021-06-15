var tableAlerta;
app.alertasDespachoPrincipal=function($scope,mainAlertasService){

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
            "ID_Tipo_Alerta": "87",
            "ID_Despacho": "6",
            "ID_Intervencion": "48,55,106,112,163,258,259,260,261,262,263,264,265,274,275,276,277,278"
        }        
        mainAlertasService.getDetalleAlertas(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                $scope.otsAlertas = alertas;
                $scope.vistaDespacho = false;
                $scope.tipoAlertaSeleccionada = angular.copy(alerta);
                $scope.mostrarDetalleAlertas($scope.otsAlertas);
                swal.close();
            } else {
                swal.close();
            }
        }, function error(response) {
            //swal.close()
        });
        
    }

    $scope.mostrarDetalleAlertas = function(alertas) {
        $scope.viewTableResumen = [];
        angular.forEach(alertas,function(value,key){
            let  arra=[];
            arra[0] = value.IdOT ? value.IdOT : '';
            arra[1] = value.OrdenServicio ? value.OrdenServicio : '';
            arra[2] = 
                '<div class="card card-alertas-pendientes" onclick="consultarAccionesAlerta(\'' + value.IdOT + '\', \'' + value.OrdenServicio + '\', \''+ value.LatitudAlerta + '\', \'' + value.LongitudAlerta + '\', \'' + value.LatitudTec + '\', \'' + value.LongitudTec +'\')">'
            +       '<div class="card-body card-body-alertas">'
            +           '<div class="row">'
            +               '<div class="col-12">'
            +                   '<span class="text-primary-alerta">OT: </span><span class="text-secundary-alerta">' + value.IdOT + '</span>'
            +                   '<span class="text-primary-alerta">OS: </span><span class="text-secundary-alerta">' + value.OrdenServicio + '</span>'
            +               '</div>'
            +           '</div>'
            +           '<div class="row">'
            +               '<div class="col-12">'
            +                   '<span class="text-primary-alerta">Direcci&oacute;n: </span><span class="text-secundary-alerta">' + value.Direccion + '</span>'
            +               '</div>'
            +           '</div>'
            +           '<div class="row">'
            +               '<div class="col-12">'
            +                   '<span class="text-primary-alerta">Fecha y hora: </span><span class="text-secundary-alerta">' + value.Fecha_Registro + '</span>'
            +               '</div>'
            +           '</div>'
            +       '</div>'
            +       '<div class="card-footer text-muted card-alertas-pendientes-foot">'
            +           '<div class="row">'
            +               '<div class="col-12">'
            +                   '<span class="text-primary-alerta">Alerta: </span><span class="text-secundary-alerta">' + value.SubtipoAlerta + '</span>'
            +               '</div>'
            +           '</div>'
            +       '</div>'
            +   '</div>'


            
            arra[4] = value.plazaVendedor ? value.plazaVendedor : '';
            arra[3] = value.tipoAcceso ? value.tipoAcceso : '';
            arra[21] = value.precioRenta ? '$' + new Intl.NumberFormat("en-US").format(value.precioRenta) : '';
            arra[22] = value.precioRentaConInpuestos ? '$' + new Intl.NumberFormat("en-US").format(value.precioRentaConInpuestos) : '';
            arra[23] = '<div class="text-center"><button type="button" class="btn btn-informacion" onclick="detalleReporte(' + value.topCincomil + ', \''+ value.cliente + '\', \''+ value.folioCotizacion + '\', \''+ value.cuentaFactura + '\', \''+ value.tipoCuadrilla + 
                '\', \''+ value.tipoAcceso + '\', \''+ value.folioCsp + '\', \''+ value.estatusCsp + '\', \''+ value.tipoVenta + '\', \''+ value.tipoplan + '\', \''+ value.folioOs + '\', \''+ value.estatatusOs + 
                '\', \''+ value.idOt + '\', \''+ value.fechaVenta + '\', \'' + value.fechaCerradaGanada + '\', \'' + value.fechaObjetivo + '\', \'' + value.fechaComprometida + '\', \'' + value.fechaAgendamiento + 
                '\', \'' + value.semaforoDesviacion + '\', \'' + value.nombrePm + '\', \'' + value.precioRenta + '\', \'' + value.precioRentaConInpuestos + '\', \'' + value.plazaVendedor +'\')"><i class="fa fa-bars"></i></button></div>';
            
            
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
    consultarAccionesAlerta = function(ot, os, latAlerta, longAlerta, latTecnico, longTecnico) {
        if ($scope.idAlertaSelecionada !== ot) {
            $scope.idAlertaSelecionada = ot;
            $scope.evidenciaAlertaConsultada = false;
            $scope.historicoAlertaConsultada = false;
            $scope.chatAlertaConsultada = false;
            $scope.showAaccion = false;
            $scope.alertaSeleccionadaObject = {IdOT: ot, os: os, latitudAlerta: latAlerta, longitudAlerta: longAlerta, latitudTecnico: latTecnico, longitudTecnico: longTecnico};
            console.log($scope.alertaSeleccionadaObject);
            $scope.$apply();
            $("#pills-mapa-tab").click();
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            var params = {
                "Tipo_Alerta": "87"
            }        
            mainAlertasService.consultaAccionesAlerta(params).then(function success(response) {
                console.log(response);
                response.data = accionesAlerta;
                if (response.data !== undefined) {
                    $scope.alertaSeleccionada = true;
                    $scope.setMarkets($scope.alertaSeleccionadaObject);
                    $scope.listaOpcionesAlerta = response.data.result.Acciones;
                    
                    swal.close();
                } else {
                    swal.close();
                }
            }, function error(response) {
                //swal.close()
            });
        }
        
    }

  


    $scope.showAaccion = false;
    $scope.mostrarAccionAlerta = function(accion) {
        console.log(accion);
        $scope.listaEstadoAlerta = [];

        var params = {
            "ID_Propietario": "87"
        }        
        mainAlertasService.getCatalogoStatusEstadoMotivo(params).then(function success(response) {
            console.log(response);
            response.data = catalogoEstatusAlerta;
            if (response.data !== undefined) {
                $scope.listaCatalogoEstatusAlerta = response.data.result.Ststus;
                $scope.showAaccion = true;
                $scope.listaEstadoAlerta = $scope.listaCatalogoEstatusAlerta.filter(estatus => estatus.Nivel === "2")

                swal.close();
            } else {
                swal.close();
            }
        }, function error(response) {
            //swal.close()
        });
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
        }, function error(response) {
            //swal.close()
        });
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
            }, function error(response) {
                //swal.close()
            });
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
        if (!$scope.historicoAlertaConsultada) {
            $scope.historicoAlertaConsultada = true;
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            var params = {
                "idot": "66169"//PENDIENTE
                //"idot": $scope.alertaSeleccionadaObject.IdOT
            }        
            mainAlertasService.consultarHistoricoAlertaPI(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    $scope.listaHistoricoAlerta = historicoAlerta;
                    swal.close();
                } else {
                    swal.close();
                }
            }, function error(response) {
                //swal.close()
            });
        }
        
    }

    $scope.listaComentariosAlerta = [];
    $scope.chatAlertaConsultada = false;
    $scope.consultarChatAlerta = function() {
        if(!$scope.chatAlertaConsultada) {
            $scope.chatAlertaConsultada = true;
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            var params = {
                "idot": "66169",//PENDIENTE
                //"idot": $scope.alertaSeleccionadaObject.IdOT
                "FechaInicial": "",
                "FechaFinal": ""

            }        
            mainAlertasService.consultarComentariosAlertaPI(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    $scope.listaComentariosAlerta = comentariosAlerta;
                    swal.close();
                } else {
                    swal.close();
                }
            }, function error(response) {
                //swal.close()
            });
        }
        
    }

    $scope.comentarioAlerta = "";
    $scope.agregarComentario = function() {
        var params = {
            "idOT": "87",
            "idUserComenta": "87",
            "comentario": "87",
            "afectaA": "87",
            "origen": "87"
        }        
        mainAlertasService.setComentariosIntegrador(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                toastr.success(response.data.result.resultDescription);
                $scope.comentarioAlerta = "";
                swal.close();
                $scope.consultarChatAlerta();
            } else {
                swal.close();
            }
        }, function error(response) {
            //swal.close()
        });
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


};