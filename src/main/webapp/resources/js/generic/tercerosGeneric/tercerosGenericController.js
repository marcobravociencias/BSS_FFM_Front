var app = angular.module('tercerosGenericApp', []);
app.controller('tercerosGenericController', ['$scope', '$q', '$filter', 'tercerosGenericService', function ($scope, $q, $filter, tercerosGenericService) {
	$("#moduloTercerosGeneric").addClass('active');
	$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

	let tablaOtsConsultaGeneral;
	$scope.mostrarNavAccionesDetalleOtPendiente = false;
	$scope.filtrosGeneral = {};
	$scope.detalleTecnicoOt = {};
	$scope.estatusCambio = [];
	$scope.listadoOts = [];
	$scope.detalleOtPendienteSelected = {};
	$scope.elementosConfigGeneral;
	$scope.estatusModals = '';
	$scope.otModalSelectedGeneric = {};



	$('.drop-down-filters').on("click.bs.dropdown", function (e) {
		e.stopPropagation();
	});

	$('#searchGeo').on('keyup', function () {
		$("#jstree-proton-3").jstree("search", this.value);
	})

	$scope.abrirModalGeografia = function () {
		$('#searchGeo').val('');
		$("#jstree-proton-3").jstree("search", '');
		$("#modal-jerarquia-filtro").modal('show');
		setTimeout(function () {
			$("#searchGeo").focus();
		}, 750);
	}

	$scope.conversionAnidadaRecursiva = function (array, nivelInit, maxNivel) {
		let arrayReturn = [];
		angular.forEach(array.filter(e => e.nivel === nivelInit), function (elem, index) {
			let elemento = angular.copy(elem);
			elemento.checkedOpcion = true;
			if (nivelInit < maxNivel) {
				elemento.children = $scope.conversionAnidadaRecursiva(array, nivelInit + 1, maxNivel).filter(e2 => e2.idPadre === elemento.id);
				elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : [];
			}
			arrayReturn.push(elemento)
		});
		return arrayReturn;
	}

	$scope.obtenerUltimoNivelFiltros = function (array) {
		return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
	}


	$scope.cargarFiltrosGeneric = function () {
		$q.all([
			tercerosGenericService.consultarCatalogosTurnos(),
			tercerosGenericService.consultarCatalogoTipoOrdenUsuario(),
			tercerosGenericService.consulCatalogoGeografiaUsuario(),
			tercerosGenericService.consultarConfiguracion({ "moduloAccionesUsuario": "moduloDespacho" }),
			tercerosGenericService.consultarCatalogoEstatus()
		]).then(function (results) {
			let resultConf = results[3].data.result
			if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
				let llavesResult = results[3].data.result.MODULO_ACCIONES_USUARIO.llaves;

				$scope.nFiltroGeografia = 5//llavesResult.N_FILTRO_GEOGRAFIA
				$scope.nFiltroIntervenciones = llavesResult.N_FILTRO_INTERVENCIONES
				$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
				$scope.nFiltroEstatusArr = llavesResult.N_ESTATUS_ARR_ENVIO;
				$scope.nFiltroEstatus = llavesResult.N_ESTATUS_PENDIENTES;

				validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
				validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
				$scope.elementosConfigGeneral = new Map(Object.entries(resultConf))
			}
			$("#idBody").removeAttr("style");

			if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {

			}
			$scope.estatusCambio = results[4].data.result;
			if (results[4].data !== undefined) {
				if (results[4].data.respuesta) {
					if (results[4].data.result) {
						$scope.respaldoStatusArray = angular.copy(results[4].data.result);
						$scope.nFiltroEstatus = $scope.nFiltroEstatus ? $scope.nFiltroEstatus : $scope.obtenerUltimoNivelFiltros($scope.respaldoStatusArray);
						$scope.filtrosGeneral.estatusdisponibles = $scope.conversionAnidadaRecursiva($scope.respaldoStatusArray, 1, $scope.nFiltroEstatus);
						if ($scope.nFiltroEstatusArr != undefined && $scope.nFiltroEstatusArr) {
							let tempSlice = $scope.nFiltroEstatusArr.split(",").map(e => parseInt(e));
							let tempArray = []
							angular.forEach(tempSlice, function (elm, index) {
								let elemEstatus = angular.copy($scope.filtrosGeneral.estatusdisponibles.find(e => e.id == elm))
								if (!elemEstatus != undefined)
									tempArray.push(elemEstatus)
							});
							$scope.filtrosGeneral.estatusdisponibles = tempArray
						}
					} else {
						toastr.info('No se encontraron catalogo de estatus');
					}
				} else {
					toastr.warning(results[4].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de estatus');
			}

			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.filtrosGeneral.turnosdisponibles = results[0].data.result
						$scope.filtrosGeneral.turnosdisponibles.map(e => { e.checkedOpcion = true; return e; })
					} else {
						toastr.warning('No se encontraron catalogos turnos');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de turnos');
			}

			if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						$scope.respaldoTipoOrdenArray = angular.copy(results[1].data.result);
						$scope.nFiltroIntervenciones = $scope.nFiltroIntervenciones ? $scope.nFiltroIntervenciones : $scope.obtenerUltimoNivelFiltros($scope.respaldoTipoOrdenArray);
						$scope.filtrosGeneral.tipoOrdenes = $scope.conversionAnidadaRecursiva($scope.respaldoTipoOrdenArray, 1, $scope.nFiltroIntervenciones);
						$scope.intervencionesConteo = $scope.conversionAnidadaRecursiva($scope.respaldoTipoOrdenArray, 1, $scope.nFiltroIntervenciones);
					} else {
						toastr.warning('No se encontraron  tipo ordenes');
					}
				} else {
					toastr.warning(results[1].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
			}

			if (results[2].data !== undefined) {
				if (results[2].data.respuesta) {
					if (results[2].data.result) {
						if (results[2].data.result.geografia) {
							$scope.listadogeografiacopy = results[2].data.result.geografia;
							$scope.nFiltroGeografia = $scope.nFiltroGeografia ? $scope.nFiltroGeografia : $scope.obtenerUltimoNivelFiltros($scope.listadogeografiacopy);

							geografia = results[2].data.result.geografia

							geografia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
							geografia.map((e) => {
								e.parent = e.padre == null ? 0 : e.padre;
								e.text = e.nombre;
								e.icon = "fa fa-globe";

								e.state = { //Este objeto tu no lo necesitas karen! e.state
									opened: false,
									selected: true,
								}
								return e
							})
							$('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
								$scope.consultarOTsTercerosGeneric();
							}).jstree({
								'plugins': ["wholerow", "checkbox", "search"],
								'core': {
									'data': geografia,
									'themes': {
										'name': 'proton',
										'responsive': true,
										"icons": false
									}
								},
								"search": {
									"case_sensitive": false,
									"show_only_matches": true
								}
							});

						} else {
							toastr.warning('No se encontraron datos para la geografia');
						}
					} else {
						toastr.warning('No se encontraron datos para la geografia');
					}
				} else {
					toastr.warning(results[2].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de turnos');
			}

		}).catch(err => handleError(err));
	}

	$scope.cargarFiltrosGeneric();

	$scope.iniciarFechasConsulta = function () {
		$('#txtFechaInicioConsulta').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
		});
		$('#txtFechaFinConsulta').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
		});
		$('#txtFechaInicioConsulta').datepicker('update', new Date());
		$('#txtFechaFinConsulta').datepicker('update', new Date());
	}

	$scope.obtenerElementosSeleccionadosFiltro = function (array, nivel) {
		let arrayReturn = [];
		angular.forEach(array, function (elemento, index) {
			if (elemento.nivel == nivel && elemento.checkedOpcion) {
				arrayReturn.push(elemento.id);
			} else {
				arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
			}
		});
		return arrayReturn;
	}

	$scope.inicializarsTableOts = function (data) {

		let window_height = $(window).height();
		let elementsPagina;
		if (window_height <= 670) {
			elementsPagina = 2;
		} else if (window_height <= 870) {
			elementsPagina = 3;
		} else {
			elementsPagina = 4;
		}
		tablaOtsConsultaGeneral = $('#tablaOtsConsultaGeneral').DataTable({
			info: false,
			searching: true,
			bDestroy: true,
			data: data ? data : [],
			pageLength: elementsPagina,
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
			},
			dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
			language: {
				"sProcessing": "Procesando...",
				"sLengthMenu": "Mostrar _MENU_ registros",
				"sZeroRecords": "No se encontraron resultados",
				"sEmptyTable": "Ning\u00fana OT disponible ",
				"sInfo": "",
				"sInfoEmpty": "",
				"sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
				"sInfoPostFix": "",
				"sUrl": "",
				"sInfoThousands": ",",
				"sLoadingRecords": "<br/><br/>Cargando...<br/><br/>",
				"oPaginate": {
					"sFirst": "Primero",
					"sLast": "\u00daltimo",
					"sNext": "Siguiente",
					"sPrevious": "Anterior"
				},
				"oAria": {
					"sSortAscending": ": Activar para ordenar la columna de manera ascendente",
					"sSortDescending": ": Activar para ordenar la columna de manera descendente"
				}
			},
			"drawCallback": function (settings) {
				$(".card-style").css("border-left", "none");
				if($scope.detalleOtPendienteSelected){
					$("#idotpendiente" + $scope.detalleOtPendienteSelected.idOrden).css("border-left", "2px solid  #3942d7");
				}
            }
		})

	}

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

	$scope.randomIntFromInterval = function () {
		return Math.floor(Math.random() * (8 - 0 + 1) + 0)
	}

	$scope.categoriaIconos = function (ordenTrabajo) {
		let iconosText = '';
		iconosText = '';

		if (ordenTrabajo.informacionAdicional != undefined && ordenTrabajo.informacionAdicional.length > 0) {
			$scope.listadoIconosConfig
			let tipoDato = '';

			angular.forEach(ordenTrabajo.informacionAdicional, function (elem, index) {
				if (elem.nombre && elem.nombre.toUpperCase() === 'ICONO') {


					switch (elem.valor) {
						case 'ZteLogo.svg':
							iconosText += ` <div class="content-iconos-ot-pendiente">
										<img class="iconos-ot-pendiente svg"  src="./resources/img/generic/ZteLogo.svg"/></div>`
							break;
						case 'Huawei.svg':
							iconosText += ` <div class="content-iconos-ot-pendiente">
										<img class="iconos-ot-pendiente png" src="./resources/img/generic/Huawei.svg"/></div>`
							break;
						default:
							tipoDato = elem.valor.substring(elem.valor.indexOf(".") + 1, elem.valor.length)
							let iconoEncontradoConfig = $scope.listadoIconosConfig.find(e => { return e.icon === elem.valor })

							if (iconoEncontradoConfig != undefined && iconoEncontradoConfig) {
								iconoEncontradoConfig = iconoEncontradoConfig.value
								switch (tipoDato) {
									case 'svg':
										iconosText += ` <div class="content-iconos-ot-pendiente">
													<img class="iconos-ot-pendiente svg"  src="data:image/svg+xml;base64,${iconoEncontradoConfig}"/></div>`
										break;
									case 'png':
										iconosText += ` <div class="content-iconos-ot-pendiente">
													<img class="iconos-ot-pendiente png" src="data:image/png;base64,${iconoEncontradoConfig}"/></div>`
										break;
									case 'jpg':
										iconosText += ` <div class="content-iconos-ot-pendiente">
													<img class="iconos-ot-pendiente jpg" src="data:image/jpeg;charset=utf-8;base64,${iconoEncontradoConfig}"/></div>`
										break;
									case 'jpeg':
										iconosText += ` <div class="content-iconos-ot-pendiente">
													<img class="iconos-ot-pendiente jpeg" src="data:image/jpeg;charset=utf-8;base64,${iconoEncontradoConfig}"/></div>`
										break;
									default:
								}
							}

					}
				}


			})
		}
		return iconosText;
	}

	$scope.consultarOTsTercerosGeneric = function () {
		let message = '';
		let turnosdisponiblescopy = $scope.filtrosGeneral.turnosdisponibles.filter(e => e.checkedOpcion).map(e => e.id)
		let intervenciones = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nFiltroIntervenciones);
		let estatusDisponiblesCheck = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponibles, $scope.nFiltroEstatus);
		let clustersparam = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nFiltroGeografia)
			.map(e => parseInt(e.id))

		if (!intervenciones.length) {
			message += '<li>Intervenci&oacute;n</li>'
			$("#filtro-intervencion").css("border-bottom", "2px solid #f55756");
		}

		if (!estatusDisponiblesCheck.length) {
			message += '<li>Estatus</li>'
			$("#filtro-estatus").css("border-bottom", "2px solid #f55756");
		}

		if (!turnosdisponiblescopy.length) {
			message += '<li>Turno</li>'
			$("#filtro-turno").css("border-bottom", "2px solid #f55756");
		}

		if (!clustersparam.length) {
			message += '<li>Geograf&iacute;a</li>'
			$("#filtro-geografia").css("border-bottom", "2px solid #f55756");
		}

		let isDate = $scope.validarFechasInicioFin();

		if (message != '' || !isDate) {
			if (!isDate) {
				message += '<li>Fechas</li>'
			}
			let info = "Verifica los siguientes campos: " + message;
			toastr.info(info);
			setTimeout(function () {
				$(".input-filtro-generic").css("border-bottom", "none");
			}, 2000);
			return false;
		}

		$scope.listadoOtsPendientes = [];

		var params = {
			fechaInicio: $scope.getFechaFormato(document.getElementById('txtFechaInicioConsulta').value),
			fechaFin: $scope.getFechaFormato(document.getElementById('txtFechaFinConsulta').value),
			idSubIntervenciones: intervenciones,
			idTurnos: turnosdisponiblescopy,
			idEstatus: estatusDisponiblesCheck,
			idClusters: clustersparam
		}
		let arrayRow = [];
		tercerosGenericService.consultarOrdenes(params).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.detalleOrdenes) {

							$scope.listadoOts = response.data.result.detalleOrdenes
							let indexot = 0
							$scope.listadoOts.map((e) => {
								indexot++
								e.colorOrden = e.colorOrden != undefined && e.colorOrden ? e.colorOrden : arrayColors[$scope.randomIntFromInterval()]
								return e
							})
							let tableelemetn = ''
							let htmlImagenesIconos = ''

							angular.forEach($scope.listadoOts, function (otpendiente, index) {
								htmlImagenesIconos = $scope.categoriaIconos(otpendiente)
								let horas = (otpendiente.horasViva == undefined || otpendiente.horasViva == '') ? -1 : parseInt(otpendiente.horasViva)
								let htmlSemaforoOrden = ''
								let row = [];
								if (horas >= 24 && horas < 48) {
									htmlSemaforoOrden = `
									<div class="content-icon-semaforo-pendiente">
										<img class="iconos-ot-pendiente icon-semaforo-pendiente svg"  src="./resources/img/plantainterna/despacho/semaforo/24.png"/>
									</div>`
								}
								if (horas >= 48 && horas < 72) {
									htmlSemaforoOrden = `
									<div class="content-icon-semaforo-pendiente">
										<img class="iconos-ot-pendiente icon-semaforo-pendiente svg"  src="./resources/img/plantainterna/despacho/semaforo/48.png"/>
									</div>`
								}
								if (horas >= 72) {
									htmlSemaforoOrden = `
									<div class="content-icon-semaforo-pendiente">
										<img class="iconos-ot-pendiente icon-semaforo-pendiente svg"  src="./resources/img/plantainterna/despacho/semaforo/72.png"/>
									</div>`
								}


								tableelemetn = `
							<tr> 
								<td>  
									<div id="idotpendiente${otpendiente.idOrden}" 
										   tag-id-ot="${otpendiente.idOrden}"  class="fullSizeCard card-style" onclick="consultarAccionesOtPendiente(${otpendiente.idOrden})">
										<div class="header-otpendeinte">
											<div class="top-title-ot">
												<div class="content-top-element bars-content">
													<h5  class="title-otpendeinte" >#${otpendiente.claveCliente}</h5>
												</div>
											</div>
											<div class="posiciondos">
												<div class="content-dos-element ">
													<h5  class="title-nombrecliente">${otpendiente.nombreCliente}</h5>
												</div>
											</div>
											<div class="positiontres">
												<div class="content-posiciontres">
													<p class="text-otpendiente-tres-title">FOLIO: </p>
													<p class="text-otpendiente-tres" >${otpendiente.folioOrden}</p>
												</div>
												<div class="content-posiciontres">
													<p class="text-otpendiente-tres-title">OT:</p>
													<p class="text-otpendiente-tres" >${otpendiente.idOrden}</p>
												</div>
											</div>
											<div class="info-content-otpendeinte">
												<div class="line-content-infootpend">
													<b class="title-content">Cita:</b>
													<span class="content-ciudadotpend" >${otpendiente.fechaAgenda}  ${otpendiente.horaAgenda}  </span>

													<b class="title-content">Turno:</b>
													<span class="content-ciudadotpend" >${otpendiente.descripcionTurno}</span>

													<b class="title-content">Geograf&iacute;a.</b>
													<span class="content-ciudadotpend" >${otpendiente.descripcionGeografia}</span>
													
												</div>                                               
											</div>
											<div class="info-content-otpendeinte">
												<div class="line-content-infootpend">
													<b class="title-content">Dir.</b>
													<span class="content-ciudadotpend">${otpendiente.direccion}</span>
												</div>                                             
											</div>
											<div class="info-content-otpendeinte ${otpendiente.telefono ? '' : 'ocultarTelefonoOtPendiente'}">
												<div class="line-content-infootpend">
													<i class="fas fa-phone telefono-icon-pendiente"></i>
													<span class="telefono-text-otpendiente" >${otpendiente.telefono}</span>
												</div>                                             
											</div>
										</div>
										<div class="footer-otpendiente not-permiso-asignacion">
											<div style=" color:${otpendiente.colorOrden}"  class="content-top-element intervencino-elemn intervencion-title"> 
												${otpendiente.descipcionTipoOrden}
											</div>
											<div class="content-iconos elem-not-asignacion">  ${htmlSemaforoOrden}  ${htmlImagenesIconos}</div>                                      
										</div>						   
									</div>
								</td>
							</tr>	
							`
							row[0] = tableelemetn;
							arrayRow.push(row);
							})

						} else {
							toastr.info('No se encontraron OTS pendientes');
						}
					} else {
						toastr.warning('No se encontraron OTS pendientes');
					}
				} else {
					toastr.warning(response.data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de OTS pendientes');
			}
			$scope.inicializarsTableOts(arrayRow)

		}).catch(err => handleError(err))
	}


	$scope.validarFechasInicioFin = function () {
		var respuesta = false;
		var fechaInicio = $("#txtFechaInicioConsulta").val().split('/');
		var fechaFin = $("#txtFechaFinConsulta").val().split('/');
		if (fechaInicio == "" || fechaInicio == null || fechaFin == "" || fechaFin == null) {
			respuesta = true;
		} else {
			var dateInicio = new Date(fechaInicio[2] + '-' + fechaInicio[1] + '-' + fechaInicio[0]);
			var dateFin = new Date(fechaFin[2] + '-' + fechaFin[1] + '-' + fechaFin[0]);
			if (dateInicio <= dateFin) {
				respuesta = true;
			} else {
				$("#txtFechaInicioConsulta").css("border-bottom", "2px solid #f55756");
				$("#txtFechaFinConsulta").css("border-bottom", "2px solid #f55756");
				respuesta = false;
			}
		}
		return respuesta;
	}

	$scope.busquedaOtsConsultaTabla = function (event) {
		if (event.which === 13) {
			let text = $("#txtBuscadorOtsConsultaTabla").val()
			tablaOtsConsultaGeneral.search(text).draw()
			if($scope.detalleOtPendienteSelected){
				$("#idotpendiente" + $scope.detalleOtPendienteSelected.idOrden).css("border-left", "2px solid  #3942d7");
			}
		}
	}

	consultarAccionesOtPendiente = function (ot) {
		$(".card-style").css("border-left", "none");
		$("#idotpendiente" + ot).css("border-left", "2px solid  #3942d7");
		$scope.mostrarNavAccionesDetalleOtPendiente = true;
		$scope.detalleOtPendienteSelected = $scope.listadoOts.find((e) => e.idOrden ==ot)
		$scope.listadoMotivosRescate = $scope.estatusCambio.filter(e => { return e.idPadre === 212 })
        $scope.listadoMotivosCalendarizado = $scope.estatusCambio.filter(e => { return e.idPadre === 243 })
        $scope.listadoMotivosReagenda = $scope.estatusCambio.filter(e => { return e.idPadre === 201 })
        $scope.listadoEstadosTerminado = $scope.estatusCambio.filter(e => { return e.idPadre === 4 })
        $scope.listadoEstadoGestoria = $scope.estatusCambio.filter(e => { return e.idPadre === 7 })
        $scope.listadoTurnosAcciones = $scope.filtrosGeneral.turnosdisponibles;
        $scope.permisosModal = $scope.elementosConfigGeneral.get("MODAL_FLUJO_" + $scope.detalleOtPendienteSelected.idFlujo).split(",")
        $scope.estatusModals = 'PENDIENTE'
        $scope.otModalSelectedGeneric = angular.copy($scope.detalleOtPendienteSelected);
        $scope.requestModalInformacion(ot)

		$scope.$apply();
	}

	$scope.requestModalInformacion = function (id) {
        $scope.otconsultamodal =
            document.getElementById('v-tabs-consulta-detalleot-tab').click()
        $scope.idOtSelect = id;
        $scope.flagComentarios = false;
        $scope.flagHistorico = false;
        $scope.flagPedido = false;
        $scope.consultarDetalleOtPEFlag = false;
        $scope.comentariosOrdenTrabajo = [];
        $scope.historialOrdenTrabajo = [];
        $scope.infoOtDetalle = {}
        $scope.detalleCotizacion = {}
        $scope.detalleTecnicoOt = {};
        $scope.infoDetalleOtPe = {}
        swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
        swal.showLoading();

        let params = {
            "idOt": id,
            "idFlujo": $scope.otModalSelectedGeneric.idFlujo,
        }

        $q.all([
            tercerosGenericService.consultarDetalleOT(params),
            tercerosGenericService.consultarDetalleTecnicoOt(params)
        ]).then(function (results) {
            swal.close()
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        if (results[0].data.result.orden) {
                            $scope.infoOtDetalle = results[0].data.result.orden
                            setTimeout(function () {
                                document.getElementsByClassName('permiso-accion-modal')[0].click();
                                /*
								let isBlock = $scope.keyBloqueoBtn.find((e) => e == $scope.infoOtDetalle.idEstatus)
                                if(isBlock || $scope.dataWindow){
                                    $(".disable-terminada").prop("disabled", true)
                                }else{
                                    $(".disable-terminada").prop("disabled", false)
                                }
								*/
                            }, 500)

                        } else {
                            toastr.info(results[0].data.result.mensaje);
                        }
                    } else {
                        toastr.warning('No se encontraron datos');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        $scope.detalleTecnicoOt = results[1].data.result;
                    } else {
                        toastr.warning('No se encontraron datos');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }


        }).catch(err => handleError(err));

    }

	$scope.seleccionarTodosRecursivo = function (array) {
		array.map(function (e) {
			e.checkedOpcion = true;
			if (e.children !== undefined && e.children.length > 0) {
				$scope.seleccionarTodosRecursivo(e.children);
			}
		});
	}

	$scope.deseleccionarTodosRecursivo = function (array) {
		array.map(function (e) {
			e.checkedOpcion = false;
			if (e.children !== undefined && e.children.length > 0) {
				$scope.deseleccionarTodosRecursivo(e.children);
			}
		});
	}

	$scope.setCheckFiltroGenericV2 = function (filtro, principalArray) {
		if (filtro.children !== undefined && filtro.children.length > 0) {
			if (filtro.checkedOpcion) {
				$scope.deseleccionarTodosRecursivo(filtro.children);
			} else {
				$scope.seleccionarTodosRecursivo(filtro.children);
			}
		}
		filtro.checkedOpcion = !filtro.checkedOpcion;
		$scope.checkPadre(filtro.idPadre, principalArray, principalArray);
	}

	$scope.checkPadre = function (idPadre, array, principalArray) {
		array.map(function (e) {
			if (e.id === idPadre) {
				e.checkedOpcion = e.children.length === e.children.filter(function (e) { return e.checkedOpcion }).length;
				$scope.checkPadre(e.idPadre, principalArray, principalArray);
			} else {
				if (e.children !== undefined && e.children.length > 0) {
					$scope.checkPadre(idPadre, e.children, principalArray);
				}
			}
		});
	}

	$scope.iniciarFechasConsulta();
	$scope.inicializarsTableOts()
}]);