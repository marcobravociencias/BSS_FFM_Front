var app = angular.module('tercerosGenericApp', []);
app.controller('tercerosGenericController', ['$scope', '$q', '$filter', 'tercerosGenericService', 'genericService', function ($scope, $q, $filter, tercerosGenericService, genericService) {
	app.mapasTercerosController($scope, tercerosGenericService)
	var objectTempAccion;
	let tableOrdenesPlantaExternaOt;
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
	$scope.historialOrdenTrabajo = [];
	$scope.elementoPlazaComercial = {};
	$scope.elementoRescate = {};
	$scope.listadoTecnicosGeneral = [];
	$scope.detencionVistaModal = null;
	$scope.listOrdenesPE = [];
	$scope.listadoArrayOtsLocalizacion = [];
	let tableRegistrosLocalizados;
	$scope.listadoIconosConfig = []
	$scope.listadoDictamen = {};
	$scope.objectDictamen = {};

	var arrayColors = [
		'#D32F2F',
		'#7B1FA2',
		'#303F9F',
		'#00796B',
		'#388E3C',
		'#455A64',
		'#795548',
		'#616161',
		'#0097A7'
	]


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
                let elementosMapa = angular.copy(results[3].data.result);

				$scope.nFiltroGeografia = 5//llavesResult.N_FILTRO_GEOGRAFIA
				$scope.nFiltroIntervenciones = llavesResult.N_FILTRO_INTERVENCIONES
				$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
				$scope.nFiltroEstatusArr = llavesResult.N_ESTATUS_ARR_ENVIO;
				$scope.nFiltroEstatus = llavesResult.N_ESTATUS_PENDIENTES;

				validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
				validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
				$scope.elementosConfigGeneral = new Map(Object.entries(resultConf))

				for (const elm in resultConf) {
					if (elm.toUpperCase().includes("ICONO_")) {
						$scope.listadoIconosConfig.push({
							icon: elm.substring(elm.indexOf("_") + 1, elm.length),
							value: elementosMapa[elm]
						})
					}
				}
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

							let geografia = results[2].data.result.geografia.filter(e => e.nivel <= parseInt($scope.nFiltroGeografia));
							geografia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
							geografia.map((e) => {
								e.parent = e.padre == null ? 0 : e.padre;
								e.text = e.nombre;
								e.icon = "fa fa-globe";
								e.state = { 
									opened: false,
									selected: true,
								}
								return e
							})
							$('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
								$scope.consultarOTsTercerosGeneric();
								$scope.consultarTecnicosDisponibiles();
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

	$scope.consultarTecnicosDisponibiles = function () {
		$scope.listadoTecnicosGeneral = []
		$scope.isCargaTecnicosDisponibles = false;
		tercerosGenericService.consultarTecnicosDisponibiles($scope.dataWindow).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.detalleTecnicos) {
							$scope.listadoTecnicosGeneral = response.data.result.detalleTecnicos
						} else {
							toastr.info('No se encontraron operarios disponibles');

						}
					} else {
						toastr.info('No se encontraron tecnicos ');
					}
				} else {
					toastr.warning(response.data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de tecnicos');
			}
			$scope.isCargaTecnicosDisponibles = true;
			$scope.validarLoadTecnicosOtsAsignadas()
		}).catch(err => handleError(err))
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
		$('#fecha-reagendamiento').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			orientation: 'bottom'
		});
		$('#fecha-calendarizado').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			orientation: 'bottom'
		});

		tableRegistrosLocalizados = $('#table-registrosLocalizados').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": true,
			"ordering": false,
			"pageLength": 10,
			"info": true,
			"autoWidth": true,
			"language": idioma_espanol_not_font
		});
		setTimeout(() => {
			$('#fecha-reagendamiento').datepicker('update', new Date());
			$('#fecha-calendarizado').datepicker('update', new Date());
			tableOrdenesPlantaExternaOt = $('#tableOrdenesPlantaExternaOt').DataTable({
				"paging": true,
				"lengthChange": false,
				"searching": false,
				"ordering": false,
				"pageLength": 10,
				"info": false,
				"autoWidth": true,
				"language": idioma_espanol_not_font
			});
			$scope.listOrdenesPE = [];
		}, 300);
		$('#txtFechaInicioConsulta').datepicker('update', new Date());
		$('#txtFechaFinConsulta').datepicker('update', new Date());
	}

	$scope.cambiarPagTablaSpliters = function (falla, splitter) {
    	$(".spliters" + falla).addClass("ocultarFilaTablaSplitersFallaDetalleDetencion");
        $("#detencion" + falla + splitter).removeClass("ocultarFilaTablaSplitersFallaDetalleDetencion");
        $(".btnPaginadorTablaSpliters" + falla).removeClass("btnPaginadorTablaSplitersActive");
        $(".btnPaginadorTablaSpliters" + falla).addClass("btnPaginadorTablaSplitersNoActive");
        $("#btnPaginador" + falla + splitter).removeClass("btnPaginadorTablaSplitersNoActive");
        $("#btnPaginador" + falla + splitter).addClass("btnPaginadorTablaSplitersActive");
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
				if ($scope.detalleOtPendienteSelected) {
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
		$scope.mostrarNavAccionesDetalleOtPendiente = false;
		$(".card-style").css("border-left", "none");
		$scope.detalleOtPendienteSelected = {};
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
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		tercerosGenericService.consultarOrdenes(params).then(function success(response) {
			swal.close();
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.detalleOrdenes) {
							$scope.listadoOts = response.data.result.detalleOrdenes
							let indexot = 0
							$scope.listadoOts.map((e) => {
								indexot++
								e.colorOrden = e.colorOrden && e.colorOrden != undefined ? e.colorOrden : arrayColors[$scope.randomIntFromInterval()]
								return e
							})
							let tableelemetn = '';
							let htmlImagenesIconos = '';
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
			if ($scope.detalleOtPendienteSelected) {
				$("#idotpendiente" + $scope.detalleOtPendienteSelected.idOrden).css("border-left", "2px solid  #3942d7");
			}
			if ($("#txtBuscadorOtsConsultaTabla").val().trim() !== '') {
                setTimeout(function () {
                    if (tablaOtsConsultaGeneral.page.info().recordsDisplay <= 0)
                        $scope.consultarLocalizacionOtDespacho(text)

                }, 300);
            }
		}
	}

	consultarAccionesOtPendiente = function (ot) {
		$(".card-style").css("border-left", "none");
		$("#idotpendiente" + ot).css("border-left", "2px solid  #3942d7");
		$scope.mostrarNavAccionesDetalleOtPendiente = true;
		$scope.detencionVistaModal = true;
		$scope.detalleOtPendienteSelected = $scope.listadoOts.find((e) => e.idOrden == ot)
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
		$scope.consultarDetalleOtPEFlag = false;
		$scope.comentariosOrdenTrabajo = [];
		$scope.historialOrdenTrabajo = [];
		$scope.infoOtDetalle = {}
		$scope.responseServicios = null;
		$scope.detalleCotizacion = null
		$scope.objectDictamen = {};
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
							/*
							setTimeout(function () {
								document.getElementsByClassName('permiso-accion-modal')[0].click();
								
								let isBlock = $scope.keyBloqueoBtn.find((e) => e == $scope.infoOtDetalle.idEstatus)
								if(isBlock || $scope.dataWindow){
									$(".disable-terminada").prop("disabled", true)
								}else{
									$(".disable-terminada").prop("disabled", false)
								}
								
							}, 500)
							*/

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

	$scope.consultarHistorial = function () {
		if (!$scope.historialOrdenTrabajo.length) {
			$scope.historialOrdenTrabajo = [];
			$(".dot-dependencia").remove()
			swal({ text: 'Consultando historial ...', allowOutsideClick: false });
			swal.showLoading();
			let params = {
				"idOt": $scope.detalleOtPendienteSelected.idOrden
			}
			tercerosGenericService.consultarHistoricoOt(params).then(function success(response) {
				swal.close()
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result) {
							if (response.data.result.detalle) {
								$scope.historialOrdenTrabajo = response.data.result.detalle//.reverse();
								setTimeout(function () {
									$(".dot-dependencia").remove()
									$scope.pintarDependenciasHistorico();
								}, 500)
							} else {
								toastr.warning(response.data.result.mensaje);
							}
						} else {
							toastr.warning('No se encontraron resultados');
						}
					} else {
						toastr.warning(response.data.resultDescripcion);
					}
				} else {
					toastr.warning(response.data.resultDescripcion);
				}
			}).catch(err => handleError(err))
		}
	}

	$scope.pintarDependenciasHistorico = function () {
		var couth = 0;
		var contador = 0;
		var height = 0;
		angular.forEach($scope.historialOrdenTrabajo, function (element, index) {
			couth++;
			contador++;
			if (contador !== $scope.historialOrdenTrabajo.length) {
				if (couth === 1) {
					height = $("#content-historial-" + index).height();
					let posicionOriginal = $("#content-historial-" + index).position();
					posicionOriginal.top += 70;
					posicionOriginal.left += (2 + $("#content-historial-" + index).width());
					if (index === 0) {
						$("#content-principal-historial").append("<span class='direccionactividad dot-dependencia content-historial-" + index + " fa fa-arrow-left' style='left: " + posicionOriginal.left + "px;top: " + (posicionOriginal.top + 10) + "px'></span>");
					} else {
						$("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
					}
					$scope.pintarPunto(posicionOriginal, index);
				}
				if (couth === 2) {
					if ($("#content-historial-" + index).height() > height) {
						height = $("#content-historial-" + index).height();
					}
					let posicionOriginal = $("#content-historial-" + index).position();
					posicionOriginal.top += 70;
					posicionOriginal.left += (2 + $("#content-historial-" + index).width());
					$("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
					$scope.pintarPunto(posicionOriginal, index);
				}
				if (couth === 3) {
					if ($("#content-historial-" + index).height() > height) {
						height = $("#content-historial-" + index).height();
					}
					couth = 0;
					let posicionOriginal = $("#content-historial-" + index).position();
					height += posicionOriginal.top;
					posicionOriginal.top += 70;
					posicionOriginal.left += (2 + $("#content-historial-" + index).width());
					$("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
					$scope.pintarPunto(posicionOriginal, index);
					/*
					for (let i = 0; i < 8; i++) {
						posicionOriginal.top += 10;
						$scope.pintarPunto(posicionOriginal, index);
					}
					*/

					height -= 25;
					do {
						posicionOriginal.top += 10;
						$scope.pintarPunto(posicionOriginal, index);
					} while (height > posicionOriginal.top);

					for (let i = 0; i < 95; i++) {
						posicionOriginal.left -= 10;
						$scope.pintarPunto(posicionOriginal, index);
					}
					for (let i = 0; i < 9; i++) {
						posicionOriginal.top += 10;
						$scope.pintarPunto(posicionOriginal, index);
					}
					for (let i = 0; i < 1; i++) {
						posicionOriginal.left += 10;
						$scope.pintarPunto(posicionOriginal, index);
					}
				}
			}
		});

	}

	$scope.pintarPunto = function (posicionOriginal, index) {
		$("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 15) + "px;top:" + posicionOriginal.top + "px'>.</b>");
	}

	$scope.consultarComentarios = function () {
		if (!$scope.comentariosOrdenTrabajo.length) {
			if (!swal.isVisible()) {
				swal({ text: 'Consultando comentarios ...', allowOutsideClick: false });
				swal.showLoading();
			}

			let params = {
				"idOt": $scope.detalleOtPendienteSelected.idOrden
			}
			genericService.consultarComentariosDespachoOT(params).then(function success(response) {
				swal.close()
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result) {
							if (response.data.result.detalle) {
								$scope.comentariosOrdenTrabajo = response.data.result.detalle;
								angular.forEach($scope.comentariosOrdenTrabajo, function (comentario, index) {
									comentario.fechaComentario = moment(comentario.fecha + ' ' + comentario.hora).format("dddd, D [de] MMMM [de] YYYY hh:mm A");
								});
							} else {
								toastr.warning(response.data.result.mensaje);
							}
						} else {
							toastr.warning('No se encontraron comentarios');
						}
					} else {
						toastr.warning(response.data.resultDescripcion);
					}
				} else {
					toastr.warning(response.data.resultDescripcion);
				}
			}).catch(err => handleError(err))
		}
	}

	$scope.addComentariosOt = function () {
		let comentarios = $("#comentarioOt").val();
		if (comentarios.trim() !== '' && !/^\s/.test(comentarios)) {

			let params = {
				idOrden: $scope.detalleOtPendienteSelected.idOrden,
				comentario: comentarios,
				origenSistema: 1
			}

			swal({ text: 'Espere un momento ...', allowOutsideClick: false });
			swal.showLoading();

			genericService.agregarComentariosOt(params).then(function success(response) {
				swal.close();
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						$("#comentarioOt").val("");
						$scope.comentariosOrdenTrabajo = [];
						$(".chat-area").scrollTop(0);
						$scope.consultarComentarios();
					} else {
						toastr.error(response.data.resultDescripcion);
					}
				} else {
					toastr.error(response.data.resultDescripcion);
				}
			}).catch(err => handleError(err))

		} else {
			$("#comentarioOt").val("");
			document.getElementById('comentarioOt').value = '';
			toastr.warning('Intoducir un comentario.')
		}
	}

	$scope.obtenerPaquete = function () {
		if (!$scope.responseServicios) {
			$scope.selectedEquipoPaquete = null;
			let params = {
				folio: $scope.detalleOtPendienteSelected.folioOrden
			}
			swal({ text: 'Espere un momento ...', allowOutsideClick: false });
			swal.showLoading();
			$scope.responseServicios = {}
			tercerosGenericService.consultarResumenPaquete(params).then(response => {
				swal.close()
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.resumenPaquete != undefined) {
							$scope.responseServicios = response.data.result.resumenPaquete
						} else {
							toastr.warning('No se encontraron datos');
						}
					} else {
						toastr.warning(response.data.resultDescripcion);
					}
				} else {
					toastr.error('Ha ocurrido un error en la consulta de los datos');
				}
			}).catch(err => handleError(err));
		}
	}

	$scope.cambioStatus = function (tipo) {
		let errorMensaje = '<ul>';
		let isValido = true;
		let params = {};
		$scope.tipoaccioncambioestatus = tipo
		let estatusTemp = '';
		if (tipo === 'asigna') {
			estatusTemp = "asignado"
			let horaasignacionInicio = angular.copy($scope.asignacionObject.otInfo.fechahoraasignacion);
			let horaasignacionFin = angular.copy($scope.asignacionObject.otInfo.fechahoraasignacion);
			horaasignacionFin = moment(horaasignacionFin).add(3, 'hours').format();

			let arrayHoraInicio = horaasignacionInicio.split("T")
			arrayHoraInicio[1] = arrayHoraInicio[1].substr(0, 5)
			let formatFechaHoraInicio = arrayHoraInicio[0] + " " + arrayHoraInicio[1]

			let arrayHoraFin = horaasignacionFin.split("T")
			arrayHoraFin[1] = arrayHoraFin[1].substr(0, 5)
			let formatFechaHoraFin = arrayHoraFin[0] + " " + arrayHoraFin[1]

			if ($scope.asignacionObject.comentario.trim() === '') {
				errorMensaje += 'Completa campo comentario.'
				isValido = false;
			}

			params = {
				tipo: tipo,
				ot: $scope.asignacionObject.otInfo.idOrden,
				folioSistema: $scope.asignacionObject.otInfo.folioOrden,
				idFlujo: $scope.asignacionObject.otInfo.idFlujo,
				idTipoOrden: $scope.asignacionObject.otInfo.idtipoOrden,
				idSubTipoOrden: $scope.asignacionObject.otInfo.idSubtipoOrden,
				idOrigenSistema: 1,
				idUsuarioTecnico: $scope.asignacionObject.tecnicoInfo.idTecnico,
				latitud: $scope.asignacionObject.otInfo.latitud,
				longitud: $scope.asignacionObject.otInfo.longitud,
				comentarios: $scope.asignacionObject.comentario,
				idMotivo: 500,
				idTurno: $scope.asignacionObject.otInfo.idTurno,
				fechaHoraAgenda: formatFechaHoraInicio,
				fechaHoraInicio: formatFechaHoraInicio,
				idtipoAsignacion: 2,
				fechaHoraFin: formatFechaHoraFin
			}
		} else if (tipo === 'reasigna') {
			estatusTemp = "reasignado"
			let horaasignacionInicio = angular.copy($scope.reAsignacionObject.otInfo.fechahoraasignacion);
			let horaasignacionFin = angular.copy($scope.reAsignacionObject.otInfo.fechahoraasignacion);
			horaasignacionFin = moment(horaasignacionFin).add(3, 'hours').format();

			let arrayHoraInicio = horaasignacionInicio.split("T")
			arrayHoraInicio[1] = arrayHoraInicio[1].substr(0, 5)
			let formatFechaHoraInicio = arrayHoraInicio[0] + " " + arrayHoraInicio[1]

			let arrayHoraFin = horaasignacionFin.split("T")
			arrayHoraFin[1] = arrayHoraFin[1].substr(0, 5)
			let formatFechaHoraFin = arrayHoraFin[0] + " " + arrayHoraFin[1]

			if ($scope.reAsignacionObject.comentario.trim() === '') {
				errorMensaje += 'Completa campo comentario.'
				isValido = false;
			}

			params = {
				tipo: tipo,
				ot: $scope.reAsignacionObject.otInfo.idOrden,
				folioSistema: $scope.reAsignacionObject.otInfo.folioOrden,
				idFlujo: $scope.reAsignacionObject.otInfo.idFlujo,
				idTipoOrden: $scope.reAsignacionObject.otInfo.idtipoOrden,
				idSubTipoOrden: $scope.reAsignacionObject.otInfo.idSubtipoOrden,
				idOrigenSistema: 1,
				idUsuarioTecnico: $scope.reAsignacionObject.tecnicoInfo.idTecnico,
				latitud: $scope.reAsignacionObject.otInfo.latitud,
				longitud: $scope.reAsignacionObject.otInfo.longitud,
				comentarios: $scope.reAsignacionObject.comentario,
				fechaHoraInicio: formatFechaHoraInicio,
				fechaHoraFin: formatFechaHoraFin,
				idtipoAsignacion: $scope.reAsignacionObject.otInfo.tipoAsignacion
			}
		} else if (tipo === 'desasigna') {
			estatusTemp = "desasignado"
			if (!$scope.elementoDesasigna || $scope.elementoDesasigna.comentario.trim() === '') {
				errorMensaje += 'Completa campo comentario.'
				isValido = false;
			} else {
				params = {
					tipo: tipo,
					ot: $scope.detalleOtAsignadaSelected.idOrden,
					folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
					idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
					idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
					idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
					idOrigenSistema: 1,
					idUsuarioDespacho: 12,
					idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
					latitud: $scope.detalleOtAsignadaSelected.latitud,
					longitud: $scope.detalleOtAsignadaSelected.longitud,
					comentarios: $scope.elementoDesasigna.comentario,
				}
			}



		} else if (tipo === 'calendariza') {
			estatusTemp = "calendarizado"
			if ($scope.elementCalendarizado.fechaCalendarizado.trim() === '') {
				errorMensaje += '<li>Completa campo fecha</li>'
				isValido = false;
			}

			if (!$scope.elementCalendarizado.turno) {
				errorMensaje += '<li>Seleccione campo turno.</li>'
				isValido = false;
			}

			if (!$scope.elementCalendarizado.motivo) {
				errorMensaje += '<li>Seleccione campo motivo.</li>'
				isValido = false;
			}

			if (!$scope.elementCalendarizado.comentario || $scope.elementCalendarizado.comentario.trim() === '') {
				errorMensaje += '<li>Completa campo comnentario.</li>'
				isValido = false;
			}

			if (isValido) {
				let fechaCalendariza = $scope.elementCalendarizado.fechaCalendarizado.split('/')
				if ($scope.estatusModals === 'PENDIENTE') {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtPendienteSelected.idOrden,
						folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
						idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
						idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						latitud: $scope.detalleOtPendienteSelected.latitud,
						longitud: $scope.detalleOtPendienteSelected.longitud,
						comentarios: $scope.elementCalendarizado.comentario,
						idTurno: $scope.elementCalendarizado.turno.id,
						idMotivo: $scope.elementCalendarizado.motivo.id,
						fechaHoraAgenda: fechaCalendariza[2] + '-' + fechaCalendariza[1] + '-' + fechaCalendariza[0]
					}
				} else {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtAsignadaSelected.idOrden,
						folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
						idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
						idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
						latitud: $scope.detalleOtAsignadaSelected.latitud,
						longitud: $scope.detalleOtAsignadaSelected.longitud,
						comentarios: $scope.elementCalendarizado.comentario,
						idTurno: $scope.elementCalendarizado.turno.id,
						idMotivo: $scope.elementCalendarizado.motivo.id,
						fechaHoraAgenda: fechaCalendariza[2] + '-' + fechaCalendariza[1] + '-' + fechaCalendariza[0]
					}
				}
			}
		} else if (tipo === 'cancela') {
			estatusTemp = "enviar a rescate";
			if (!$scope.elementoRescate || !$scope.elementoRescate.motivo) {
				errorMensaje += '<li>Seleccione campo motivo.</li>'
				isValido = false;
			}

			if (!$scope.elementoRescate || !$scope.elementoRescate.comentario || $scope.elementoRescate.comentario.trim() === '') {
				errorMensaje += '<li>Completa campo comnentario.</li>'
				isValido = false;
			}

			if (isValido) {
				if ($scope.estatusModals === 'PENDIENTE') {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtPendienteSelected.idOrden,
						folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
						idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
						idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						latitud: $scope.detalleOtPendienteSelected.latitud,
						longitud: $scope.detalleOtPendienteSelected.longitud,
						comentarios: $scope.elementoRescate.comentario,
						idMotivo: $scope.elementoRescate.motivo.id
					}
				} else {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtAsignadaSelected.idOrden,
						folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
						idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
						idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
						latitud: $scope.detalleOtAsignadaSelected.latitud,
						longitud: $scope.detalleOtAsignadaSelected.longitud,
						comentarios: $scope.elementoRescate.comentario,
						idMotivo: $scope.elementoRescate.motivo.id
					}
				}
			}

		} else if (tipo === 'reagendamiento') {
			estatusTemp = "reagendado"
			if (!$scope.elementReagendaOT || $scope.elementReagendaOT.fechaReagendamiento.trim() === '') {
				errorMensaje += '<li>Completa campo fecha.</li>'
				isValido = false;
			}

			if (!$scope.elementReagendaOT || !$scope.elementReagendaOT.turno) {
				errorMensaje += '<li>Seleccione campo turno.</li>'
				isValido = false;
			}

			if (!$scope.elementReagendaOT || !$scope.elementReagendaOT.motivo) {
				errorMensaje += '<li>Seleccione campo motivo.</li>'
				isValido = false;
			}

			if (!$scope.elementReagendaOT.comentario || $scope.elementReagendaOT.comentario.trim() === '') {
				errorMensaje += '<li>Completa campo comentario.</li>'
				isValido = false;
			}


			if (isValido) {
				let fechaReagendamiento = $scope.elementReagendaOT.fechaReagendamiento.split('/')
				if ($scope.estatusModals === 'PENDIENTE') {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtPendienteSelected.idOrden,
						folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
						idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
						idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						latitud: $scope.detalleOtPendienteSelected.latitud,
						longitud: $scope.detalleOtPendienteSelected.longitud,
						comentarios: $scope.elementReagendaOT.comentario,
						idTurno: $scope.elementReagendaOT.turno.id,
						idMotivo: $scope.elementReagendaOT.motivo.id,
						fechaHoraAgenda: fechaReagendamiento[2] + '-' + fechaReagendamiento[1] + '-' + fechaReagendamiento[0]
					}
				} else {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtAsignadaSelected.idOrden,
						folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
						idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
						idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
						latitud: $scope.detalleOtAsignadaSelected.latitud,
						longitud: $scope.detalleOtAsignadaSelected.longitud,
						comentarios: $scope.elementReagendaOT.comentario,
						idTurno: $scope.elementReagendaOT.turno.id,
						idMotivo: $scope.elementReagendaOT.motivo.id,
						fechaHoraAgenda: fechaReagendamiento[2] + '-' + fechaReagendamiento[1] + '-' + fechaReagendamiento[0]
					}
				}
			}
		} else if (tipo === 'termina') {
			estatusTemp = "terminado"
			if (!$scope.elementTerminar || !$scope.elementTerminar.estado) {
				errorMensaje += '<li>Seleccione campo motivo.</li>'
				isValido = false;
			}

			if (!$scope.elementTerminar || !$scope.elementTerminar.comentario || $scope.elementTerminar.comentario.trim() === '') {
				errorMensaje += '<li>Completa campo comentario.</li>'
				isValido = false;
			}

			if (isValido) {
				if ($scope.estatusModals === 'PENDIENTE') {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtPendienteSelected.idOrden,
						folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
						idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
						idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						latitud: $scope.detalleOtPendienteSelected.latitud,
						longitud: $scope.detalleOtPendienteSelected.longitud,
						comentarios: $scope.elementTerminar.comentario,
						idMotivo: $scope.elementTerminar.estado.id,
					}
				} else {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtAsignadaSelected.idOrden,
						folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
						idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
						idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
						latitud: $scope.detalleOtAsignadaSelected.latitud,
						longitud: $scope.detalleOtAsignadaSelected.longitud,
						comentarios: $scope.elementTerminar.comentario,
						idMotivo: $scope.elementTerminar.estado.id,
					}
				}
			}

		} else if (tipo === 'gestoria') {
			estatusTemp = "enviar a plaza"
			if (!$scope.elementoPlazaComercial || !$scope.elementoPlazaComercial.estado) {
				errorMensaje += '<li>Seleccione campo estado.</li>'
				isValido = false;
			}

			if (!$scope.elementoPlazaComercial || !$scope.elementoPlazaComercial.motivo) {
				errorMensaje += '<li>Seleccione campo motivo.</li>'
				isValido = false;
			}

			if (!$scope.elementoPlazaComercial.comentario || $scope.elementoPlazaComercial.comentario.trim() === '') {
				errorMensaje += '<li>Completa campo comentario.</li>'
				isValido = false;
			}

			if (isValido) {
				if ($scope.estatusModals === 'PENDIENTE') {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtPendienteSelected.idOrden,
						folioSistema: $scope.detalleOtPendienteSelected.folioOrden,
						idFlujo: $scope.detalleOtPendienteSelected.idFlujo,
						idTipoOrden: $scope.detalleOtPendienteSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtPendienteSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						latitud: $scope.detalleOtPendienteSelected.latitud,
						longitud: $scope.detalleOtPendienteSelected.longitud,
						comentarios: $scope.elementoPlazaComercial.comentario,
						idMotivo: $scope.elementoPlazaComercial.motivo.id,
					}
				} else {
					params = {
						tipo: tipo,
						ot: $scope.detalleOtAsignadaSelected.idOrden,
						folioSistema: $scope.detalleOtAsignadaSelected.folioOrden,
						idFlujo: $scope.detalleOtAsignadaSelected.idFlujo,
						idTipoOrden: $scope.detalleOtAsignadaSelected.idtipoOrden,
						idSubTipoOrden: $scope.detalleOtAsignadaSelected.idSubtipoOrden,
						idOrigenSistema: 1,
						idUsuarioDespacho: 12,
						idUsuarioTecnico: $scope.detalleOtAsignadaSelected.idTecnico,
						latitud: $scope.detalleOtAsignadaSelected.latitud,
						longitud: $scope.detalleOtAsignadaSelected.longitud,
						comentarios: $scope.elementoPlazaComercial.comentario,
						idMotivo: $scope.elementoPlazaComercial.motivo.id,
					}
				}
			}

		}
		if (isValido) {
			envioCambioStatus(params, estatusTemp);
		} else {
			errorMensaje += '</ul>'
			mostrarMensajeWarningValidacion(errorMensaje)
		}

	}

	envioCambioStatus = function (params, text) {
		swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
		swal.showLoading();
		let tituloAccion = "Actualizaci\u00F3n estatus orden";
		let tecnicoTemp = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == params.idUsuarioTecnico);
		let mensajeEnvio = tecnicoTemp ? 'Ha ocurrido un error al cambiar el estatus a "' + text + '" de la OT: ' + params.ot + ' para el t\u00E9cnico ' + tecnicoTemp.nombre + ' ' + tecnicoTemp.apellidoPaterno + ' ' + tecnicoTemp.apellidoMaterno : 'Ha ocurrido un error al cambiar el estatus a "' + text + '" de la OT: ' + params.ot;

		genericService.cambioStatusOts(params).then(result => {
			$scope.procesandoAsignacion = false;
			$scope.procesandoReasignacion = false

			swal.close();
			$scope.elementTerminar = {};
			$scope.elementReagendaOT = {};
			$scope.elementoRescate = {};
			$scope.elementoDesasigna = {};
			if (result.data.respuesta) {

				toastr.success(result.data.result.mensaje);
				mensajeEnvio = tecnicoTemp ? 'Se actualiz\u00F3 el estatus a "' + text + '" de la OT: ' + params.ot + ' para el t\u00E9cnico ' + tecnicoTemp.nombre + ' ' + tecnicoTemp.apellidoPaterno + ' ' + tecnicoTemp.apellidoMaterno : 'Se actualizo el estatus a "' + text + '" de la OT: ' + params.ot;
				//objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);

			} else {
				toastr.warning(result.data.resultDescripcion);
				//objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
			}
		}).catch(err => handleError(err));
	}

	$scope.consultarDetalleServicio = function (servicio, idCSP) {
		if (!$scope.selectedEquipoPaquete) {
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			$scope.responseServicios.productos = [];
			$scope.listDetalleEquipos = [];
			$scope.responseServicios.productos = servicio.productos;
			let params = {
				'idCotSitioPlan': idCSP
			}

			//$scope.responseServicios
			tercerosGenericService.consultarDetalleEquiposServicios(params).then(function success(response) {
				if (response.data) {
					if (response.data.respuesta) {
						if (response.data.result) {

							if (response.data.result.detalleEquipos.length) {
								let listadoEquipos = angular.copy(response.data.result.detalleEquipos);
								if ($scope.responseServicios != undefined &&
									$scope.responseServicios.resumenServicios != undefined && $scope.responseServicios.resumenServicios.length > 0) {
									$scope.responseServicios.resumenServicios = $scope.responseServicios.resumenServicios.map(function (e) {
										e.elementoEquipoModelos = {}
										e.isTieneEquipoModeos = false;
										return e;
									})
									listadoEquipos.forEach(function (elem, index) {
										let servicioTemp = $scope.responseServicios.resumenServicios.find(function (e) { return e.id == elem.idCotPlanServicio })
										if (servicioTemp != undefined) {
											servicioTemp.elementoEquipoModelos = elem
											servicioTemp.isTieneEquipoModeos = true;
										}
									});
								}
								swal.close();
							} else {
								mostrarMensajeInformativo("No se encontraron Equipos");
								swal.close();
							}
						} else {
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
							swal.close();
						}
					} else {
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
						swal.close();
					}
				} else {
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
					swal.close();
				}
			});
		}
		$scope.selectedEquipoPaquete = servicio
	}

	$scope.regresarVistaCambioDireccion = function () {
		$scope.verModDireccionOT = false;
	}

	$scope.guardarCambioDireccion = function () {
		let codigoRegex = /^[0-9]{5,6}$/;

		if ($.trim($scope.infoOtDetalle.direccion.codigoPostal) == '' || !codigoRegex.test($scope.infoOtDetalle.direccion.codigoPostal)) {
			toastr.warning('Ingresa un c&oacute;digo postal valido');
			return false;
		}

		swal({
			title: 'Comentarios',
			input: 'textarea',
			closeOnClickOutside: false,
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Guardar'
		}).then((result) => {

			if (result) {
				let params = {
					codigoPostal: $scope.infoOtDetalle.direccion.codigoPostal,
					latitud: $scope.latitudModDireccionOt,
					longitud: $scope.longitudModDireccionOt,
					comentarios: result,
					idOrdenTrabajo: $scope.infoOtDetalle.idOrden,
				}
				swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
				swal.showLoading();
				let tituloAccion = "Cambiar direcci\u00F3n de OT";
				let mensajeEnvio = 'Ha ocurrido un error al cambiar la direcci\u00F3n de la OT: ' + params.idOrdenTrabajo;
				tercerosGenericService.actualizarDireccionOt(params).then(function success(response) {
					swal.close()
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								$scope.infoOtDetalle.direccion.longitud = $scope.longitudModDireccionOt;
								$scope.infoOtDetalle.direccion.latitud = $scope.latitudModDireccionOt;
								$scope.verMapaCambioDireccion($scope.infoOtDetalle.direccion.latitud, $scope.infoOtDetalle.direccion.longitud);
								toastr.success('Direcci\u00F3n actualizada');
								mensajeEnvio = 'Se cambio la direcci\u00F3n de la OT: ' + params.idOrdenTrabajo;
								//objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
								$scope.regresarVistaCambioDireccion()
							} else {
								toastr.warning('No se cambio la direcci&oacute;n');
								//objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
							}
						} else {
							toastr.warning(response.data.resultDescripcion);
							//objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						}
					} else {
						toastr.error('Ha ocurrido un error en el cambio de direcci&oacute;n');
						//objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
					}
				}).catch(err => handleError(err));
			} else {
				toastr.warning('Ingresa el comentario para cambiar la direcci&oacute;n');
			}

		}).catch((result) => {
		})

	}

	$scope.consultarDetalleOtPE = function () {

		$scope.mostrarTooltipDetencion = false;
		var tamContenedorDetencionModal = $("#v-tabs-tabsContent").width();

		if (tamContenedorDetencionModal > 0) {
			if (tamContenedorDetencionModal < 700) {
				$scope.mostrarTooltipDetencion = true;
			}
		}

		if (!$scope.consultarDetalleOtPEFlag) {
			swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
			swal.showLoading();

			let params = {
				"idFlujo": $scope.otModalSelectedGeneric.idFlujo,
				"idOT": $scope.otModalSelectedGeneric.idOrden
			}

			tercerosGenericService.consultaDetalleOtPe(params).then(function success(response) {
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result) {
							if (response.data.result.orden) {
								$scope.consultarDetalleOtPEFlag = true;
								$scope.infoDetalleOtPe = response.data.result.orden;
								$scope.infoDetalleOtPe.tipoOrden = $scope.respaldoTipoOrdenArray.find(e => { return e.id === $scope.infoDetalleOtPe.idTipoOrden });
								$scope.infoDetalleOtPe.subTipoOrden = $scope.respaldoTipoOrdenArray.find(e => { return e.id === $scope.infoDetalleOtPe.idSubTipoOrden });
								$scope.infoDetalleOtPe.estado = $scope.respaldoStatusArray.find(e => { return e.id === $scope.infoDetalleOtPe.idEstado });
								$scope.infoDetalleOtPe.estatus = $scope.respaldoStatusArray.find(e => { return e.id === $scope.infoDetalleOtPe.idEstatus });
							} else {
								toastr.info(response.data.result.mensaje);
							}
						} else {
							toastr.warning('No se encontraron datos en el detalle de la OT');
						}
					} else {
						toastr.warning(response.data.resultDescripcion);
					}
				} else {
					toastr.error('Ha ocurrido un error en la consulta del detalle de la OT');
				}
				swal.close()
			}).catch(err => handleError(err))

		}
	}

    $scope.consultarPedido = function () {
        if (!$scope.detalleCotizacion) {
            $scope.consultarDetalleCotizacion($scope.idOtSelect);
        }
    }

	$scope.pintarTablaOTPEDetalle = function () {
		let arrayRowPE = [];
		if (tableOrdenesPlantaExternaOt) {
			tableOrdenesPlantaExternaOt.destroy();
		}
		$.each($scope.listOrdenesPE, function (i, elemento) {
			let rowPE = [];
			rowPE[0] = elemento.idOrdenPe && elemento.idOrdenPe !== '' ? elemento.idOrdenPe : 'Sin informaci&oacute;n';
			rowPE[1] = elemento.tipoOrden ? elemento.tipoOrden  : 'Sin informaci&oacute;n';
			rowPE[2] = elemento.subTipoOrden && elemento.subTipoOrden !== '' ? elemento.subTipoOrden : 'Sin informaci&oacute;n';
			rowPE[3] = elemento.nombreTecnico && elemento.nombreTecnico !== '' ? elemento.nombreTecnico : 'Sin informaci&oacute;n';
			rowPE[4] = elemento.localizacion && elemento.localizacion !== '' ? elemento.localizacion : 'Sin informaci&oacute;n';
			rowPE[5] = elemento.estatus && elemento.estatus !== '' ? elemento.estatus : 'Sin informaci&oacute;n';
			rowPE[6] = elemento.estado && elemento.estado !== '' ? elemento.estado : 'Sin informaci&oacute;n';
			rowPE[7] = elemento.nivelUrgencia && elemento.nivelUrgencia !== '' ? elemento.nivelUrgencia : 'Sin informaci&oacute;n';
			rowPE[8] = elemento.fechaAgendamiento && elemento.fechaAgendamiento !== '' ? elemento.fechaAgendamiento : 'Sin informaci&oacute;n';
			arrayRowPE.push(rowPE);
		});
		tableOrdenesPlantaExternaOt = $('#tableOrdenesPlantaExternaOt').DataTable({
			"paging": true,
			"lengthChange": false,
			"ordering": false,
			"pageLength": 10,
			"info": true,
			"scrollX": false,
			"data": arrayRowPE,
			"autoWidth": false,
			"language": idioma_espanol_not_font,
			'createdRow': function (row, data, rowIndex) {
				$.each($('td', row), function () {
					$(this).attr('title', $(this).text());
				});
			},
		});
	}

    $scope.consultarOrdenesPlantaExternaOTDetalle = function () {
        if (!$scope.tabOTPlantaExterna) {
            swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
            swal.showLoading();
            $scope.listOrdenesPE = [];
            let params = {
                "idOrden": $scope.idOtSelect
            };

            tercerosGenericService.consultaOrdenesPlantaExternaOt(params).then(function success(response) {
                if (response.data) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleOrdenPe.length) {
                                $scope.listOrdenesPE = angular.copy(response.data.result.detalleOrdenPe);
                                $scope.tabOTPlantaExterna = true;
                                $scope.pintarTablaOTPEDetalle();                              
                                swal.close();
                            } else {
                                $scope.pintarTablaOTPEDetalle();                              
                                mostrarMensajeInformativo("No se encontr&oacute; informaci&oacute;n");
                                swal.close();
                            }
                        } else {
                            $scope.pintarTablaOTPEDetalle();                              
                            mostrarMensajeWarningValidacion("No se encontr&oacute; Informaci&oacute;n");
                            swal.close();
                        }
                    } else {
                        $scope.pintarTablaOTPEDetalle();                              
                        mostrarMensajeWarningValidacion(response.data.result.resultDescripcion);
                        swal.close();
                    }
                } else {
                    $scope.pintarTablaOTPEDetalle();                              
                    mostrarMensajeWarningValidacion(response.data.result.resultDescripcion);
                    swal.close();
                }
            });
        }
    }

	$scope.listadoArrayOtsLocalizacion = []
    $scope.consultarLocalizacionOtDespacho = function (valorbusqueda) {
        $scope.listadoArrayOtsLocalizacion = [];
        swal({ text: 'Consultando registros ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            "yekparam": valorbusqueda
        }
        tercerosGenericService.consultarLocalizacionOtDespacho(params).then(function success(response) {
            swal.close()
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.ordenes && response.data.result.ordenes.length > 0) {
                            let arrayRow = [];
                            if (tableRegistrosLocalizados) {
                                tableRegistrosLocalizados.destroy();
                            }
                            //$scope.listadoTecnicosGeneral=tecnicosAsignacion
                            $scope.listadoArrayOtsLocalizacion = response.data.result.ordenes;

                            $.each($scope.listadoArrayOtsLocalizacion, function (i, elemento) {
                                let row = [];
                                row[0] = elemento.idOrden && elemento.idOrden !== '' ? elemento.idOrden : 'Sin informaci&oacute;n';
                                row[1] = elemento.folioSistema && elemento.folioSistema !== '' ? elemento.folioSistema : 'Sin informaci&oacute;n';
                                row[2] = elemento.claveCliente && elemento.claveCliente !== '' ? elemento.claveCliente : 'Sin informaci&oacute;n';
                                row[3] = elemento.nombreCliente && elemento.nombreCliente !== '' ? elemento.nombreCliente : 'Sin informaci&oacute;n';
                                row[4] = elemento.ciudad && elemento.ciudad !== '' ? elemento.ciudad : 'Sin informaci&oacute;n';
                                row[5] = elemento.cluster && elemento.cluster !== '' ? elemento.cluster : 'Sin informaci&oacute;n';
                                row[6] = elemento.fechaAgenda && elemento.fechaAgenda !== '' ? elemento.fechaAgenda : 'Sin informaci&oacute;n';
                                row[7] = elemento.descripcionEstado && elemento.descripcionEstado !== '' ? elemento.descripcionEstado : 'Sin informaci&oacute;n';
                                row[8] = elemento.descripcionEstatus && elemento.descripcionEstatus !== '' ? elemento.descripcionEstatus : 'Sin informaci&oacute;n';
                                row[9] = elemento.descripcionMotivo && elemento.descripcionMotivo !== '' ? elemento.descripcionMotivo : 'Sin informaci&oacute;n';
                                arrayRow.push(row);
                            });
                            tableRegistrosLocalizados = $('#table-registrosLocalizados').DataTable({
                                "paging": true,
                                "lengthChange": false,
                                "ordering": false,
                                "pageLength": 10,
                                "info": true,
                                "data": arrayRow,
                                "autoWidth": true,
                                "language": idioma_espanol_not_font,
                            });

                            $("#modalRegistrosLocalizados").modal('show')
                        } else {
                            toastr.info(response.data.result.mensaje);
                        }
                    } else {
                        toastr.info('No se encontraron datos');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
        }).catch(err => handleError(err))
    }

	$scope.consultarDictamen = function(){		
		
	}


	angular.element(document).ready(function () {

		$("#moduloTercerosGeneric").addClass('active');
	});
	$scope.verMapaDictamen();
	$scope.iniciarFechasConsulta();
	$scope.inicializarsTableOts()
}]);