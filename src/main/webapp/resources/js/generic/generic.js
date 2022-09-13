
const MENSAJE_ACCION_EXITO = "success"
const MENSAJE_ACCION_ERROR = 'error';
const MENSAJE_ACCION_WARNING = 'warning'
const MENSAJE_ACCION_INFO = 'info'
class GenericMapa {
	/**
	 * 
	 * @param {*} mapa  objeto mapa google maps
	 * @param {*} contenedorId id contenedor mapa Ej: [ mapa-ubicacion ]
	 * @param {*} positionCard position del card , arribaabajo-izquierdaderecha Ej: [ 'bottom-rigth' ] Ej: [ 'top-left' ]
	 */
	constructor(mapa, contenedorId, positionCard) {
		this.mapa = mapa
		this.contenedorId = contenedorId
		this.positionCard = positionCard
		this.arrayKmzLayerMapa = []
	}
	inicializarKmz() {
		let kmzArray = this.arrayKmzLayerMapa
		let mapSet = this.mapa;
		$.each(this.kmzConfigArray, function (index, elemento) {

			let ctaLayer = new google.maps.KmlLayer({
				url: elemento.value,
				map: elemento.banderaDefaultKmz ? mapSet : null,
				clickable: false,
				preserveViewport: true,
				elemento: elemento
			});
			kmzArray.push(ctaLayer)
		})
	}
	inicializar_data() {
		this.inicializarKmz()

		let optionCheckBox = ''
		let tempCont = this.contenedorId

		let textBanderaCheck = ''
		$.each(this.kmzConfigArray, function (index, elm) {
			textBanderaCheck = elm.banderaDefaultKmz ? 'checked' : ''
			optionCheckBox += `
				<div class="form-check form-check-vistamapa">
					<input ${textBanderaCheck} tag-index="${index}" id="${tempCont}-${index}"  type="checkbox" class="form-check-input checkinput-${tempCont}">			
					<label for="${tempCont}-${index}"  class="form-check-label label-form " >${elm.text}</label>
				</div>    
			`
		});
		let postionvertical = this.positionCard.split("-")[0]
		let postionhorizontal = this.positionCard.split("-")[1]

		$('#' + this.contenedorId).parent().append(
			`
					<div style="${postionvertical}:0; ${postionhorizontal}:0 ;" class="card div-contenedor-kmz-buttons">
						<div class="card-header"> 
							<span class="title-tipoot-map-filtros">FILTROS MAPA</span> 
							<span class="icono-hideoptions-${this.contenedorId} icono-accion-card icono-ocultar-mostrar-map fa fa-minus"></span>
						</div>
						<div class="card-body">
							<form class="form-body-filter">
								${optionCheckBox}                             
							</form>
						</div>
					</div>
				`)

		let kmzArray = this.arrayKmzLayerMapa
		let mapaTemp = this.mapa
		setTimeout(function () {
			$(document.body).on('change', '.checkinput-' + tempCont, function () {
				let indexKmz = parseInt($(this).attr('tag-index'));
				let isCheckedInput = $(this).is(':checked')

				if (isCheckedInput) {
					swal({ text: 'Espera ...', allowOutsideClick: false });
					swal.showLoading();
					setTimeout(function () {
						kmzArray[indexKmz].setMap(mapaTemp)
						swal.close()
					}, 1500)
				} else {
					kmzArray[indexKmz].setMap(null)
				}
			});

			$(document.body).on('click', '.icono-hideoptions-' + tempCont, function () {
				if ($(this).hasClass('fa-minus')) {
					$(this).removeClass('fa-minus fa-plus').addClass('fa-plus')
					$(this).closest('.div-contenedor-kmz-buttons').find('.card-body').hide()

				} else {
					$(this).removeClass('fa-plus fa-minus').addClass('fa-minus')
					$(this).closest('.div-contenedor-kmz-buttons').find('.card-body').show()

				}
			});
		}, 1000)
	}
}
GenericMapa.prototype.callPrototypeMapa = function (listadoData, arrayPreseleccionado) {
	let listadoKmzConfig = []
	for (const elm in listadoData) {
		if (elm.toUpperCase().includes("KMZ_")) {

			let banderaDefault = false
			if (arrayPreseleccionado != undefined && arrayPreseleccionado.length > 0 &&
				arrayPreseleccionado.find((e) => e === elm.trim()) != undefined) {
				banderaDefault = true
			}

			listadoKmzConfig.push({
				banderaDefaultKmz: banderaDefault,
				identificador: elm,
				text: elm.substring(elm.indexOf("_") + 1, elm.length).replaceAll('_', ' '),
				value: listadoData[elm]
			});
		}
	}
	GenericMapa.prototype.kmzConfigArray = listadoKmzConfig;
}

class GenericAccionRealizada {

	/**
	 * 
	 * @param {*} idModuloAccion; 
	 * @param {*} posicionBotonAccion; 
	 */

	constructor(idModuloAccion, posicionBotonAccion) {
		this.idModuloAccion = idModuloAccion;
		this.posicionBotonAccion = posicionBotonAccion;
		this.usuarioAccionGestion = document.getElementById('numempleadohidden').value;
	}

	getObjectAccionRealizada(mensajeAccion, tipoMensaje, tituloAccion) {
		return {
			identificadorModulo: this.idModuloAccion,
			mensaje: mensajeAccion,
			tipoMensaje: tipoMensaje,
			usuario: this.usuarioAccionGestion,
			hora: this.formatHora(new Date()),
			fecha: this.formatDateAccion(new Date()),
			sysdateJs: new Date(),
			tituloAccion: tituloAccion
		}
	}

	getObjectAccionRealizadaService(mensajeAccion, tipoMensaje, tituloAccion) {
		return {
			idModulo: this.idModuloAccion,
			comentarios: 'test',
			descripcionEstatusHttp: tipoMensaje,
			descripcionAccion: tituloAccion,
			descripcionMensajeHttp: mensajeAccion,
			idOrigen: 1
		}
	}

	formatHora(date) {
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		let strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

	formatDateAccion(date) {
		return [
			this.padTo2Digits(date.getDate()),
			this.padTo2Digits(date.getMonth() + 1),
			date.getFullYear(),
		].join('/');
	}

	padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	guardarAccionesRecientesModulo(mensajeAccion, tipoMensaje, tituloAccion) {
		let objectGuardado = this.getObjectAccionRealizadaService(mensajeAccion, tipoMensaje, tituloAccion)
		this.guardarAccionesRecientesService(objectGuardado);

		/*
		let accionesList;
		if (localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES')) {
			accionesList = JSON.parse(localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES'))
		} else {
			accionesList = []
		}

		accionesList.push(objectGuardado)
		localStorage.setItem('MODULO_MENSAJES_ACCIONES_RECIENTES', JSON.stringify(accionesList));
		*/
	}

	guardarAccionesRecientesService(params) {
		$.ajax({
			url: 'req/registrarAccionesRealizadasService',
			type: "POST",
			data: JSON.stringify(params),
			dataType: "json",
			headers: {
				'Content-Type': 'application/json'
			},
			success: function (jsonResponse, textStatus, jqXHR) {

			},
			error: function (jqXHR, textStatus, errorThrown) {

			}
		});
	}

	getAccionesRecientesUsuario() {
		//let usuario = document.getElementById('tipo1').value;
		let params = {
			fechaInicio: moment(new Date()).subtract(2, 'd').format('YYYY-MM-DD'),
			fechaFin: moment(new Date()).format("YYYY-MM-DD"),
			idModulo: this.idModuloAccion
		}
		return new Promise((resolve, reject) => {
			 $.ajax({
				url: 'req/consultarAccionesRealizadasService',
				type: "POST",
				data: JSON.stringify(params),
				dataType: "json",
				headers: {
					'Content-Type': 'application/json'
				},
				success: function (data) {
					resolve(data)
				},
				error: function (error) {
					reject(error)
				},
			})
		});

		/*
		if (localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES')) {
			accionesList = JSON.parse(localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES'));
			localStorage.removeItem('MODULO_MENSAJES_ACCIONES_RECIENTES');
			accionesListGeneral = accionesList.filter(e => { return e.identificadorModulo !== this.idModuloAccion });
			accionesListModulo = accionesList.filter(e => { return e.usuario === usuario && e.identificadorModulo === this.idModuloAccion });
			accionesList = [];

			if (accionesListModulo.length > 50) {
				let ultimasAcciones = accionesListModulo.slice(-5);
				$.each(ultimasAcciones, function (i, accion) {
					accionesListGeneral.push(accion);
				});
			} else {
				$.each(accionesListModulo, function (i, accionModulo) {
					accionesListGeneral.push(accionModulo);
				});
			}

			localStorage.setItem('MODULO_MENSAJES_ACCIONES_RECIENTES', JSON.stringify(accionesListGeneral));
			accionesList = JSON.parse(localStorage.getItem('MODULO_MENSAJES_ACCIONES_RECIENTES'));
		} else {
			accionesList = [];
		}
		*/

		//let accionesUsuario = accionesList.filter(e => { return e.usuario === usuario && e.identificadorModulo === this.idModuloAccion });

	}

	ocultarUltimasAcciones() {
		$("#container-ultimasAcciones").hide();
		$("#listAccionesRecientes").empty();

	}

	mostrarUltimasAccionesUsuario() {

		let validarAcci = function (dato) {
			return (dato == undefined || dato == '') ? 'Sin dato' : dato
		}

		$("#container-ultimasAcciones").show();
		$("#loading-data").show();
		//let listaUltimasAcciones = this.getAccionesRecientesUsuario();
		let listaUltimasAcciones = [];
		this.getAccionesRecientesUsuario().then(function (jsonResponse) {
			if (jsonResponse.respuesta) {
				if (jsonResponse.result) {
					if (jsonResponse.result.modulos) {
						listaUltimasAcciones = jsonResponse.result.modulos;
						$("#listAccionesRecientes").empty();
						let contentAcciones = "";
						if (listaUltimasAcciones.length > 0) {
							$.each(listaUltimasAcciones, function (i, accion) {
								if (accion.descripcionEstatusHttp == 'success') {
									contentAcciones += '<li class="timeline-actions timeline-icon-success active">' +
										'					<div class="action-time">' + validarAcci(accion.fechaRegistro) + '</div>' +
										'					<h6 class="action-title">' + validarAcci(accion.descripcionAccion) + '</h6>' +
										'					<p class="action-text">' + validarAcci(accion.descripcionMensajeHttp) + '</p>' +
										'				</li>';
								} else if (accion.descripcionEstatusHttp == 'warning') {
									contentAcciones += '<li class="timeline-actions timeline-icon-warning active">' +
										'					<div class="action-time">' + validarAcci(accion.fechaRegistro) + '</div>' +
										'					<h6 class="action-title">' + validarAcci(accion.descripcionAccion) + '</h6>' +
										'					<p class="action-text">' + validarAcci(accion.descripcionMensajeHttp) + '</p>' +
										'				</li>';
								} else if (accion.descripcionEstatusHttp == 'error') {
									contentAcciones += '<li class="timeline-actions timeline-icon-error active">' +
										'					<div class="action-time">' + validarAcci(accion.fechaRegistro) + '</div>' +
										'					<h6 class="action-title">' + validarAcci(accion.descripcionAccion) + '</h6>' +
										'					<p class="action-text">' + validarAcci(accion.descripcionMensajeHttp) + '</p>' +
										'				</li>';
								} else if (accion.descripcionEstatusHttp == 'info') {
									contentAcciones += '<li class="timeline-actions timeline-icon-info active">' +
										'					<div class="action-time">' + validarAcci(accion.fechaRegistro) + '</div>' +
										'					<h6 class="action-title">' + validarAcci(accion.descripcionAccion) + '</h6>' +
										'					<p class="action-text">' + validarAcci(accion.descripcionMensajeHttp) + '</p>' +
										'				</li>';
								}
							});
							setTimeout(() => {
								$("#listAccionesRecientes").empty();
								$("#loading-data").hide();
								$("#listAccionesRecientes").append(contentAcciones);
							}, 300);

						} else {
							contentAcciones = '<div class="text-no-acciones pt-2" style="padding: 0 !important; font-size:11px !important; padding-top:2em !important">' +
								'	<i class="icon-not-action fas fa-ban"></i>' +
								'	<b class="text-not-action">Sin movimientos para mostrar</b>' +
								'</div>';
							setTimeout(() => {
								$("#listAccionesRecientes").empty();
								$("#loading-data").hide();
								$("#listAccionesRecientes").append(contentAcciones);
							}, 300);

						}
					}
				}
			}
		}).catch(function(error){
			console.log("manejar error")
		});
	}

	pintarBotonAccionesRecientes() {
		$("#menuAccionesRealizadas").empty();
		$("#menuAccionesRealizadas").append(
			'<ul class="nav nav-tabs small-menuAcciones flex-column" id="menu-acciones" style="display: none;" role="tablist">' +
			'<li class="nav-item">' +
			'	<a class="opcion-menuAcciones" id="">' +
			'		<i class="icon-menu-ultimAccion far fa-clock"></i>' +
			'	</a>' +
			'</li>' +
			'</ul>' +
			'<div id="container-ultimasAcciones" class="contenedor-ultimasAcciones" style="display: none;">' +
			'	<div class="content-fluid">' +
			'		<div class="" id="headerUltimasAcciones">' +
			'			<div class="col-12 row" style="padding-right: 0;">' +
			'				<div class="col-10 mt-2">' +
			'					<h5 class="title-movimientos">&Uacute;ltimos movimientos</h5>' +
			'				</div>' +
			'				<div class="col-2" style="text-align: right; padding-right: 0;">' +
			'					<div class="row">' +
			'						<button id="cerrarUltimasAcciones" type="button" class="btn-refreshAcciones">' +
			'							<i class="fas fa-redo-alt"></i>' +
			'						</button> &nbsp;&nbsp;' +
			'						<button id="cerrarUltimasAcciones" type="button" class="btn-close btn-closeAcciones"></button>' +
			'					</div>' +
			'				</div>' +
			'			</div>' +
			'		</div>' +
			'		<div id="ultimasAccionesContent">' +
			'			<div class="activity">' +
			'				<div  id="loading-data" class="spinner-border spinner-cargando-info">' +
			'					<span class="visually-hidden">Loading...</span>' +
			'				</div>' +
			'				<ul id="listAccionesRecientes" class="styleAction action-timeline mb-0">' +
			'				</ul>' +
			'			</div>' +
			'		</div>' +
			'	</div>' +
			'</div>'
		);

		$('#menuAccionesRealizadas').find('.btn-refreshAcciones').on('click', (e) => {
			this.mostrarUltimasAccionesUsuario();
		});

		$('#menuAccionesRealizadas').find('.opcion-menuAcciones').on('click', (e) => {
			this.mostrarUltimasAccionesUsuario();
		});

		$('#menuAccionesRealizadas').find('.btn-closeAcciones').on('click', (e) => {
			this.ocultarUltimasAcciones();
		});
	}

	inicializarBotonAccionesRecientes() {
		this.pintarBotonAccionesRecientes();

		if ($("#menu-acciones").hasClass('left-menuAcciones')) {
			$("#menu-acciones").removeClass('left-menuAcciones');
		}
		if ($("#menu-acciones").hasClass('right-menuAcciones')) {
			$("#menu-acciones").removeClass('rigth-menuAcciones');
		}

		switch (this.posicionBotonAccion) {
			case 'TOP_LEFT':
				$("#menu-acciones").addClass('left-menuAcciones');
				$("#menu-acciones").css('top', '10%');
				break;
			case 'CENTER_LEFT':
				$("#menu-acciones").addClass('left-menuAcciones');
				$("#menu-acciones").css('top', '50%');
				break;
			case 'BOTTOM_LEFT':
				$("#menu-acciones").addClass('left-menuAcciones');
				$("#menu-acciones").css('top', '90%');
				break;
			case 'TOP_RIGHT':
				$("#menu-acciones").addClass('right-menuAcciones');
				$("#menu-acciones").css('top', '10%');
				break;
			case 'CENTER_RIGHT':
				$("#menu-acciones").addClass('right-menuAcciones');
				$("#menu-acciones").css('top', '50%');
				break;
			case 'BOTTOM_RIGHT':
				$("#menu-acciones").addClass('right-menuAcciones');
				$("#menu-acciones").css('top', '90%');
				break;
		}
		$("#menu-acciones").show();
	}
}

class GenericDetallePaquete {

	/**
   *
   * @param {*} idDiv;
   * @param {*} responseServicios;
   * @param {*} idCotSitio;
   * @param {*} isConsultaEquiposModelos;
   * @param {*} listadoEquipos;
   */
 
	constructor(idDiv) {
		this.idDiv = idDiv;
		this.responseServicios = {};
	}

	consultarDetallePaqueteGeneric(os) {
		let instanciaThis = this;
		$(instanciaThis.idDiv).empty();
		var load = 
			'<div class="row parent-detallecotizacion">'+
				'<div class="col-12">'+
					'<div  id="loading-paquete" class="spinner-border spinner-cargando-info">' +
						'<span class="visually-hidden">Loading...</span>' +
					'</div>' +
				'</div>'+
			'</div>'
		$(instanciaThis.idDiv).append(load);
		instanciaThis.idCotSitio = "";
		instanciaThis.isConsultaEquiposModelos=false;
		var params = {
			folio: os
		}
		this.consultarDetallePaqueteService(params).then(function (jsonResponse) {
			if (jsonResponse.respuesta) {
				if (jsonResponse.result) {
					if (jsonResponse.result.resumenPaquete) {
						instanciaThis.responseServicios = jsonResponse.result.resumenPaquete;
						instanciaThis.responseServicios = jsonResponse.result.resumenPaquete;
						instanciaThis.idCotSitio = jsonResponse.result.resumenPaquete.idCotSitio;
						$(instanciaThis.idDiv).empty();
						var contentResumenPaquete = "";
						contentResumenPaquete =
						'<div class="row parent-detallecotizacion">'+
							'<div class="col-12">'+
								'<div class="row">'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Paquete</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.nombrePaquete+'">'+(instanciaThis.responseServicios.nombrePaquete ? instanciaThis.responseServicios.nombrePaquete : 'Sin dato')+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Cuenta factura</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.folioCuentaFactura+'">'+(instanciaThis.responseServicios.folioCuentaFactura ? instanciaThis.responseServicios.folioCuentaFactura : 'Sin dato')+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Folio OS</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.folioOs+'">'+(instanciaThis.responseServicios.folioOs ? instanciaThis.responseServicios.folioOs : 'Sin dato')+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Folio CSP</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.folioCotSitioPlan+'">'+(instanciaThis.responseServicios.folioCotSitioPlan ? instanciaThis.responseServicios.folioCotSitioPlan : 'Sin dato')+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Folio Sitio</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.folioSitio+'">'+(instanciaThis.responseServicios.folioSitio ? instanciaThis.responseServicios.folioSitio : 'Sin dato')+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Num. ips</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.numIps+'">'+instanciaThis.responseServicios.numIps+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Num. dns</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.numDns+'">'+instanciaThis.responseServicios.numDns+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<div class="row">'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Monto primer pago</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.precioProntoPago+'">'+(instanciaThis.responseServicios.precioProntoPago ? '$' + instanciaThis.responseServicios.precioProntoPago : 'Sin dato') +'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="col-md-6">'+
										'<div class="container-fluid vehiculo-content">'+
											'<div class="container-text-title-detalle">'+
												'<span class="text-tile-vehiculo">Pago instalacion</span>'+
											'</div>'+
											'<div class="container-text-content-detalle">'+
												'<span class="text-content-vehiculo" title="'+instanciaThis.responseServicios.pagoEnInstalacion+'">'+(instanciaThis.responseServicios.pagoEnInstalacion ? '$' + instanciaThis.responseServicios.pagoEnInstalacion : 'Sin dato')+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'<br>'+
								'<div class="row">'+
									'<div class="col-7">'+
										'<div class="row justify-content-center">'+
											'<div class="col-md-12">'+
												'<h5 style="color:#767676" class="titlemodalproductos">Servicios a instalar</h5>'+
												'<div class="parent_table_detalle">'+
													'<table class="detalle-productos-table table table-sm">'+
														'<thead class="thead_table_servicios">'+
															'<tr>'+
																'<th>Nombre del Servicio</th>'+
																'<th>Tipo Servicio</th>'+
																'<th>Detalle</th>'+
															'</tr>'+
														'</thead>'+
														'<tbody>';
															var index = 0;
															instanciaThis.responseServicios.resumenServicios.forEach(element => {
																contentResumenPaquete = contentResumenPaquete + 
																'<tr id="trIndex-'+index+'" class="tr-class-remove">'+
																	'<td>'+ element.descripcion+'</td>'+
																	'<td>'+ element.tipo+'</td>'+
																	'<td>'+
																		'<div class="text-center">'+
																			'<button ng-if="servicio.id !== undefined" type="button" tagIndex="'+ index + '" class="btn_detalle_servicio btn btn-info btn-rounded btn-sm my-0 waves-effect waves-light ng-scope">'+
																				'<i tagIndex="'+ index + '" class="fa fa-eye"></i>'+
																			'</button>'+
																		'</div>'+
																	'</td>'+
																'</tr>';
																index++;
															});
															contentResumenPaquete = contentResumenPaquete +
														'</tbody>'+
													'</table>'+
												'</div>'+
											'</div>'+
										'</div>'+
										'<div class="row" id="contentProductosPaquete">'+
											'<div class="col-md-12">'+
												'<h5 style="color:#767676" class="titlemodalproductos"> Productos </h5>'+
												'<div class="parent_table_detalle_productos">'+
													'<table class="table detalle-productos-table table-sm">'+
														'<thead class="thead_table_productos_servicio">'+
															'<tr>'+
																'<th scope="col">Nombre del producto</th>'+
																'<th scope="col">Tipo producto</th>'+
															'</tr>'+
														'</thead>'+
														'<tbody>'+
															'<tr>'+
																'<td class="text-center" colspan="2">No se cuenta con productos</td>'+
															'</tr>'+
														'</tbody>'+
													'</table>'+
												'</div>'+
											'</div>'+
										'</div>'+
										'<div class="row">'+
											'<div class="col-md-12">'+
												'<h5 style="color:#767676" class="titlemodalproductos"> Promociones </h5>'+
												'<div class="parent_table_detalle_productos">'+
													'<table class="table detalle-productos-table table-sm">'+
														'<thead class="thead_table_productos_servicio">'+
															'<tr>'+
																'<th scope="col">Folio de la promocion</th>'+
																'<th scope="col">Nombre de la promocion</th>'+
															'</tr>'+
														'</thead>'+
														'<tbody>';
														if (instanciaThis.responseServicios.promociones.length > 0) {
															instanciaThis.responseServicios.promociones.forEach(element => {
																contentResumenPaquete = contentResumenPaquete + 
																'<tr>'+
																	'<td>'+ element.id+'</td>'+
																	'<td>'+ element.descripcion+'</td>'+
																'</tr>'
															});
														} else {
															contentResumenPaquete = contentResumenPaquete + 
															'<tr>'+
																'<td class="text-center" colspan="2">No se cuenta con promociones</td>'+
															'</tr>'
														}
														
														contentResumenPaquete = contentResumenPaquete +

														'</tbody>'+
													'</table>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div id="info_equipos_detalle" class="col-5">'+
										'<div class="text-center">'+
											'<h5 style="color:#767676" class="text-center titlemodalproductos">Equipo y Modelos</h5>'+
											'<div>'+
												'<div class="text-center not_info_detalle row h-100 justify-content-center">'+
													'<h6 style="color:#abafae;" class="text-noSeleccion">Sin datos para mostrar</h6>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
							'</div>'+
						'</div>'
						$(instanciaThis.idDiv).append(contentResumenPaquete);
						$(instanciaThis.idDiv).find('.btn_detalle_servicio').on('click', (e) => {
							$('.tr-class-remove').removeClass('active-selected-servicio-plan');
							$('#trIndex-'+$(e.target).attr('tagIndex')).addClass('active-selected-servicio-plan');
							instanciaThis.consultarDetalleEquiposBandejasSF($(e.target).attr('tagIndex'));
						});
					}
				}
			}
		}).catch((error) => {
			console.log(error)
		});
	}

	consultarDetalleEquiposBandejasSF(index) {
		let instanciaThis = this;
		var params = {
			idCotSitioPlan: instanciaThis.idCotSitio
		}
		if (!instanciaThis.isConsultaEquiposModelos) {
			swal({ text: 'Espera un momento...', allowOutsideClick: false });
			swal.showLoading();
			this.consultarDetalleEquiposServicios(params).then(function (response) {
				if (response.result) {
					if (response.respuesta) {
						if (response.result) {
							instanciaThis.isConsultaEquiposModelos = true;
							if (response.result.detalleEquipos.length) {
								instanciaThis.listadoEquipos = angular.copy(response.result.detalleEquipos);
								if(instanciaThis.responseServicios!= undefined && 
									instanciaThis.responseServicios.resumenServicios!=undefined && instanciaThis.responseServicios.resumenServicios.length >0){                                
										instanciaThis.responseServicios.resumenServicios=instanciaThis.responseServicios.resumenServicios.map(function(e){
										e.elementoEquipoModelos={}
										e.isTieneEquipoModeos=false;
										return e;
									})
									instanciaThis.listadoEquipos.forEach(function(elem,index){
										let servicioTemp= instanciaThis.responseServicios.resumenServicios.find(function(e){ return e.id==elem.idCotPlanServicio })
										if(servicioTemp!=undefined){
											servicioTemp.elementoEquipoModelos=elem
											servicioTemp.isTieneEquipoModeos=true;
										}
									});                                
								}
								var infoEquip = instanciaThis.listadoEquipos.filter(e => { return e.idCotPlanServicio === instanciaThis.responseServicios.resumenServicios[index].id })
								instanciaThis.actualizarDetalleEquipos(infoEquip);
								swal.close();
							} else {
								mostrarMensajeInformativo("No se encontraron Equipos");
								swal.close();
							}
						} else {
							mostrarMensajeErrorAlert(response.resultDescripcion);
							swal.close();
						}
					} else {
						mostrarMensajeErrorAlert(response.resultDescripcion);
						swal.close();
					}
				} else {
					mostrarMensajeErrorAlert(response.resultDescripcion);
					swal.close();
				}
			}).catch((error) => {
				console.log(error)
			});
		} else {
			var infoEquip = instanciaThis.listadoEquipos.filter(e => { return e.idCotPlanServicio === instanciaThis.responseServicios.resumenServicios[index].id })
			instanciaThis.actualizarDetalleEquipos(infoEquip);
		}
		instanciaThis.actualizarTablaProductos(instanciaThis.responseServicios.resumenServicios[index]);
	}

	actualizarTablaProductos(object) {
		$("#contentProductosPaquete").empty();
		var contentPaquete = 
		'<div class="col-md-12">'+
			'<h5 style="color:#767676" class="titlemodalproductos"> Productos </h5>'+
			'<div class="parent_table_detalle_productos">'+
				'<table class="table detalle-productos-table table-sm">'+
					'<thead class="thead_table_productos_servicio">'+
						'<tr>'+
							'<th scope="col">Nombre del producto</th>'+
							'<th scope="col">Tipo producto</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>';
					object.productos.forEach(element => {
						contentPaquete = contentPaquete + 
						'<tr>'+
							'<td>'+ element.descripcion+'</td>'+
							'<td>'+ element.tipo+'</td>'+
						'</tr>'
					});
					contentPaquete = contentPaquete +
					'</tbody>'+
				'</table>'+
			'</div>'+
		'</div>'
		$("#contentProductosPaquete").append(contentPaquete);
	}

	actualizarDetalleEquipos(infoEquipo) {
		if (infoEquipo.length > 0) {
			var object = infoEquipo[0];
			$("#info_equipos_detalle").empty();
			var contentInfoEquipo = 
				'<div class="text-center">'+
					'<h5 style="color:#767676" class="text-center titlemodalproductos">Equipo y Modelos</h5>'+
				'</div>'+
				'<div>'+
					'<div>'+
						'<div class="content_info_detalle">'+
							'<h6 class="ml-3 mt-2 text-equipo-paquete">'+ object.nombreEquipo +'</h6>'+
							'<div class="ml-4">'+
								'<div class="container-fluid detallePaquete-content">'+
									'<ul style="color: #797979" class="listado_modelos">';
										object.modelo.forEach(element => {
											contentInfoEquipo = contentInfoEquipo +'<li class="li_item_modelo">'+ element.modelo +'</li>'
										});
										contentInfoEquipo = contentInfoEquipo +
									'</ul>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'

			$("#info_equipos_detalle").append(contentInfoEquipo);
		} else {
			$("#info_equipos_detalle").empty();
			var contentInfoEquipo = 
				'<div class="text-center">'+
					'<h5 st<yle="color:#767676" class="text-center titlemodalproductos">Equipo y Modelos</h5>'+
					'<div>'+
						'<div class="text-center not_info_detalle row h-100 justify-content-center">'+
							'<h6 style="color:#abafae;" class="text-noSeleccion">Sin datos para mostrar</h6>'+
						'</div>'+
					'</div>'+
				'</div>'
			$("#info_equipos_detalle").append(contentInfoEquipo);
		}
	}
	
	consultarDetallePaqueteService(params){
		return new Promise((resolve, reject) => {
			$.ajax({
				url: 'req/obtenerResumenPaquete',
				type: "POST",
				data: JSON.stringify(params),
				dataType: "json",
				headers: {
					'Content-Type': 'application/json'
				},
				success: function (data) {
					resolve(data)
				},
				error: function (error) {
					reject(error)
				},
			})
		})
	}

	consultarDetalleEquiposServicios(params) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: 'req/consultarDetalleEquiposBandejasSF',
				type: "POST",
				data: JSON.stringify(params),
				dataType: "json",
				headers: {
					'Content-Type': 'application/json'
				},success: function (data) {
					resolve(data)
				},
				error: function (error) {
					reject(error)
				},
			})
		})
	}

}

var idioma_espanol_not_font = {
	"sProcessing": "Procesando...",
	"sLengthMenu": "Mostrar _MENU_ registros",
	"sZeroRecords": "No se encontrar\u00F3n resultados",
	"sEmptyTable": "Ning\u00Fan dato disponible en esta tabla",
	"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
	"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix": "",
	"sSearch": "Buscar:",
	"sUrl": "",
	"sInfoThousands": ",",
	"sLoadingRecords": "Cargando...",
	"oPaginate": {
		"sFirst": "Primero",
		"sLast": "Último",
		"sNext": "Siguiente",
		"sPrevious": "Anterior"
	},
	"oAria": {
		"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
	}
};

var espanol = {
	"sProcessing": "Procesando...",
	"sLengthMenu": "Mostrar _MENU_ registros",
	"sZeroRecords": "No se encontrar\u00F3n resultados",
	"sEmptyTable": "No se encontrar\u00F3n OT's",
	"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
	"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
	"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
	"sInfoPostFix": "",
	"sSearch": "Buscar:",
	"sUrl": "",
	"sInfoThousands": ",",
	"sLoadingRecords": "Cargando...",
	"oPaginate": {
		"sFirst": "Primero",
		"sLast": "Último",
		"sNext": "<i class='fa fa-chevron-right fa-3' aria-hidden='true'></i>",
		"sPrevious": "<i class='fa fa-chevron-left fa-3' aria-hidden='true'></i>"
	},
	"oAria": {
		"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
	}
};

let guidaDisponibilidad = [
	{
		intro: "<b>Modulo Disponibilidad<b>"
	},
	{
		element: '#opcionesTablero',
		intro: "Opciones para uso del tablero disponibilidad (<em>consta de las siguientes acciones c&oacute;mo consultar, agregar y modificar disponibilidad</em>)<small>"
	},
	{
		element: '#ref_consulta',
		intro: "Opci&oacute;n para desplegar el tablero con caracteristicas de <em>consultar disponibilidad.</em>"
	},
	{
		element: '.titulo_disponibilidad',
		intro: "Nombre del tablero <em>Consulta Disponibilidad.<em>"
	},
	{
		element: '#filtroCompania',
		intro: "Compa&ntilde;ia disponible."
	},
	{
		element: '#filtroRegiones',
		intro: 'Regiones disponibles.'
	},
	{
		element: '#ciudad_campo',
		intro: 'Ciudades disponibles.'
	},
	{
		element: '#distrito_campo',
		intro: 'Distritos disponibles.'
	},
	{
		element: '#tipo_intervencion',
		intro: 'Intervenciones disponibles.'
	},
	{
		element: '#ref_inserta',
		intro: 'Opci&oacute;n para desplegar el tablero con caracteristicas de <em>Agregar disponibilidad.</em>'
	},
	{
		element: '.titulo_disponibilidad',
		intro: "Nombre del tablero <em>Agregar Disponibilidad.</em>"
	},
	{
		element: '#turnoDisponibilidad',
		intro: 'Turnos disponibles para agregar la disponibilidad.'
	},
	{
		element: '#contenido_bloqueo',
		intro: 'Opci&oacute;n estado en que se encuentra la disponibilidad.'
	},
	{
		element: '#rangoFechas',
		intro: 'Rango de fechas para agregar la disponibilidad.'
	},
	{
		element: '#agregar_disponibilidad',
		intro: 'Bot&oacute;n para agregar la disponibilidad.'
	},
	{
		element: '#ref_modifica',
		intro: 'Opci&oacute;n que permite modificar la disponibilidad en las intervenciones de manera general.'
	},
	{
		element: '.titulo_disponibilidad',
		intro: "Nombre del tablero <em>Modificar Disponibilidad.</em>"
	},
	{
		element: '#modificar_disponibilidad',
		intro: 'Bot&oacute;n para modificar la disponibilidad.'
	}
];

/*
 * Función mostrar mensaje de exito  
 * @param mensaje [ mensaje a mostrar ]
 * @returns {undefined}   
 */
function mostrarMensajeExitoAlert(mensaje) {
	toastr.success(mensaje);
}


/*
* Función mostrar mensaje de error  
* @param mensaje [ mensaje a mostrar ]
* @returns {undefined}   
*/
function mostrarMensajeErrorAlert(mensaje) {
	toastr.error(mensaje);
}

mostrarMensajeWarningValidacion = function (mensaje) {
	toastr.warning(mensaje);
}

mostrarMensajeInformativo = function (mensaje) {
	toastr.info(mensaje);
}

var validateCreed;
var validateCreedMask;
var validateCreedText;

cambiarContraseniaUserLogin = function () {
	regex = /^(?=.*[a-z])\S{9,20}$/;
	numero = /(?=.*\d)/;
	allow = /(?=.*[\u0040]|[\u0024]|[\u0021]|[\u0025]|[\u002A]|[\u0023]|[\u003F]|[\u0026])/;
	refuse = /(?=.*[\u0020]|[\u0022]|[\u0027]|[\u0028]|[\u0029]|[\u002B]|[\u002C]|[\u002D]|[\u002E]|[\u002F]|[\u003A]|[\u003B]|[\u003C]|[\u003D]|[\u003E]|[\u007B-\u00FF])/;

	if ($("#newPasswordUserLogin").val() == '' || $("#actualPasswordUserLogin").val() == '') {
		toastr.warning('Todos los campos son obligatorios');
		return false;
	}

	if (validateCreed) {
		if (validateCreedMask !== null && validateCreedText !== '') {
			if (!validateCreedMask.test($("#newPasswordUserLogin").val()) && validateCreedText != '') {
				toastr.warning('Formato invalido');
				return false;
			}
		} else {
			if ($("#newPasswordUserLogin").val().length <= 8 || !regex.test($("#newPasswordUserLogin").val()) || !numero.test($("#newPasswordUserLogin").val())
				|| !allow.test($("#newPasswordUserLogin").val()) || refuse.test($("#newPasswordUserLogin").val())) {
				toastr.warning('Formato invalido');
				return false;
			}
		}
	}


	if ($("#newPasswordUserLogin").val() !== $("#confirmPasswordUserLogin").val()) {
		toastr.warning('Las contrase\u00F1as no coinciden');
		return false;
	}

	let params = {
		idUsuario: null,
		actualCreed: $("#actualPasswordUserLogin").val(),
		nuevoPassword: $("#newPasswordUserLogin").val(),
		newcred: $("#newPasswordUserLogin").val()
	}

	swal({ text: 'Espera un momento...', allowOutsideClick: false });
	swal.showLoading();
	let tituloAccion = "Cambiar constrase\u00F1a sesi\u00F3n";
	let mensajeEnvio = 'Ha ocurrido un error al cambiar la constrase\u00F1a';
	$.ajax({
		url: "req/restaurarContrasena",
		type: "POST",
		data: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json'
		},
		error: function (xhr, error, thrown) {
			handleError(xhr);
			swal.close();
			objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
		},
		complete: function (response) {
			mensajeEnvio = 'Se ha cambiado la constrase\u00F1a';
			objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
			$("#actualPasswordUserLogin").val('');
			$("#newPasswordUserLogin").val('');
			$("#confirmPasswordUserLogin").val('');
			$("#comentariosPasswordUserLogin").val('');
			swal.close();
			if (response.responseJSON.respuesta) {
				$("#modalCambiaContraseniaLogin").modal('hide');
				toastr.success('Contrase\u00F1a restablecida correctamente');
			} else {
				if (response.responseJSON.result === 'credencialInvalida') {
					toastr.warning('La contrase\u00F1a actual no coincide');
				} else {
					toastr.error(response.responseJSON.resultDescripcion);
				}
			}
		}
	})

}

$("#modalCambiaContraseniaLogin").on("shown.bs.modal", function () {
	$("#actualPasswordUserLogin").val('');
	$("#newPasswordUserLogin").val('');
	$("#confirmPasswordUserLogin").val('');
	$("#comentariosPasswordUserLogin").val('');
	$("#msj-valida").css("display", validateCreed ? 'block' : 'none');
	let textValidate = '<i class="fas fa-warning"></i>&nbsp;La contrase&ntilde;a debera tener m&iacute;nimo 9' +
		'caracteres alfanum&eacute;ricos, al menos un n&uacute;mero y un caracter especial' +
		'(@$!%*#?&).'
	if (validateCreedMask !== null && validateCreedText !== '') {
		textValidate = '<i class="fas fa-warning"></i>&nbsp;' + validateCreedText;
	}
	$("#creedText").text(textValidate);
})



$('.dropdown-menu-login-info').on("click.bs.dropdown", function (e) {
	e.stopPropagation();
});

$(document).ready(function () {
	if (window.usuario) {
		function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
		$(".hidenn-nav-menu").css("display", "none");
		$("#otros-nav-menu-temp").css("display", "block");
		$(document).on("keydown", disableF5);
	}
});

inOutImg = function (size) {
	if (size == 'out') {
		$('#content-in-img').css('display', 'none');
		$('#content-out-img').css('display', 'block');

	} else {
		$('#content-out-img').css('display', 'none');
		$('#content-in-img').css('display', 'block');

	}
}

cambiarFotoUsuarioLog = function (evento) {
	var fileFoto = $("#fileFotoUsuarioLog")[0].files[0];
	var idUsuarioLog = $("#empleadohidden").val();
	var nombreFoto = $("#numempleadohidden").val();

	let reader = new FileReader();
	reader.readAsDataURL(fileFoto);
	reader.onload = function () {
		let base64 = reader.result.toString().split(",");
		let imgMod = {
			"archivo": base64[1],
			"nombre": "usuarios/mex/" + nombreFoto + "/fotoPerfil"
		}

		let paramsCambiarFotoUsuarioLog = {
			id: idUsuarioLog,
			fotoPerfil: imgMod
		};

		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$.ajax({
			url: "req/modificarUsuario",
			type: "POST",
			data: JSON.stringify(paramsCambiarFotoUsuarioLog),
			headers: {
				'Content-Type': 'application/json'
			},
			error: function (xhr, error, thrown) {
				handleError(xhr);
				swal.close();
			},
			complete: function (response) {
				swal.close();
				if (response.responseJSON.respuesta) {
					$(".img-user-profile-navbar").attr("src", "data:image/jpeg;base64," + base64[1]);
					toastr.success("\u00a1Fotograf\u00eda actualizada exitosamente!");
				} else {
					mostrarMensajeInformativo(response.responseJSON.resultDescripcion);
				}
			}
		});
	};
}

var monster = document.getElementById('monsterPlay');

function showMonster() {
	if(monster){
		var min = 30, max = 180;
		var rand = Math.floor(Math.random() * (max - min + 1) + min);
		var monsterAnimation = Math.floor(Math.random() * (2 - 0 + 1));
		switch (monsterAnimation) {
			case 0:
				monster.style.animation = 'monster-play 5s 1';
				break;
	
			case 1:
				monster.style.animation = 'monster-show 10s 1';
				break;
	
			case 2:
				monster.style.animation = 'monster-run 5s 1';
				break;
	
			default:
				break;
		}
		setTimeout(showMonster, rand * 1000);
	}
}

showMonster();

cargarEstatusUs = function () {
	let catalogoEstatusUsuarios = {
		"success": true,
		"mensaje": "Se consultaron los datos",
		"result": {
			"catalogoEstatusUsuarios": [
				{
					"id": "5",
					"descripcion": "Activo",
					"color": "#0cd040"
				},
				{
					"id": "6",
					"descripcion": "Comida",
					"color": "#ffb62c"
				},
				{
					"id": "7",
					"descripcion": "Supervision",
					"color": "#458cff"
				},
				{
					"id": "8",
					"descripcion": "Ausente",
					"color": "#848484"
				}
			],
			"infoHorasUser": {
				"horaEntrada": "2021-11-26 11:42:57",
				"ultimoEstatus": "Activo-#0cd040"
			}
		}
	};

	$(".elementosListaEstatus").remove();

	$.each(catalogoEstatusUsuarios.result.catalogoEstatusUsuarios, function (index, value) {
		var etiquetaA = "<a class='dropdown-item elementosListaEstatus' ng-click=''><i class='fas fa-circle' style='color: " + value.color + " ;'></i> " + value.descripcion + "</a>";
		$("#listaEstatusUsuarios").append(etiquetaA);
	});

}


validateLatitudLongitudCaracteresUtil=function(latitudOrLongintud){
	let  regexLongitud=/[,'Â°`/;#_"$%*]/ 
	return regexLongitud.test(latitudOrLongintud)
}

isLatitudeUtil=function(lat) {
	return isFinite(lat) && Math.abs(lat) <= 90;
}

isLongitudeUtil=function(lng) {
	return isFinite(lng) && Math.abs(lng) <= 180;
}

validarLatitudLongitudMapUtil=function(latitud, longitud){
	if( !latitud || !longitud){
		return false;
	}else{
		if( !isLatitudeUtil( latitud ) || !isLongitudeUtil( longitud ) ){
			return false;
		} else if(validateLatitudLongitudCaracteresUtil( longitud ) || validateLatitudLongitudCaracteresUtil( longitud ) ){
			return false;
		}else if( isNaN( latitud ) || isNaN( longitud )){
			return false;
		}
	}   
	return true;
}