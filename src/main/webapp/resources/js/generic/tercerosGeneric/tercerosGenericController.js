var app = angular.module('tercerosGenericApp', []);
app.controller('tercerosGenericController', ['$scope', '$q', '$filter', 'tercerosGenericService', function ($scope, $q, $filter, tercerosGenericService) {
	$("#moduloTercerosGeneric").addClass('active');
	$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

	let jsonIntervenciones = [{ "id": 65, "nombre": "ADDON", "nivel": 1, "idPadre": null, "asignacionAutomatica": null, "horasConfirmacion": null }, { "id": 48, "nombre": "INSTALACION", "nivel": 1, "idPadre": null, "asignacionAutomatica": null, "horasConfirmacion": null }, { "id": 68, "nombre": "RECOLECCION", "nivel": 1, "idPadre": null, "asignacionAutomatica": null, "horasConfirmacion": null }, { "id": 55, "nombre": "SOPORTE", "nivel": 1, "idPadre": null, "asignacionAutomatica": null, "horasConfirmacion": null }, { "id": 120, "nombre": "ADICIONAL", "nivel": 2, "idPadre": 65, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 121, "nombre": "CAMBIO DE DOMICILIO HUAWEI", "nivel": 2, "idPadre": 65, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 122, "nombre": "CAMBIO DE DOMICILIO ZTE", "nivel": 2, "idPadre": 65, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 123, "nombre": "CAMBIO DE EQUIPO VSB", "nivel": 2, "idPadre": 65, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 124, "nombre": "CAMBIO DE PLAN INS VSB", "nivel": 2, "idPadre": 65, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 125, "nombre": "CAMBIO DE PLAN REC VSB", "nivel": 2, "idPadre": 65, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 102, "nombre": "DISTRIBUIDOR", "nivel": 2, "idPadre": 48, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 104, "nombre": "HOGAR SEGURO", "nivel": 2, "idPadre": 48, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 106, "nombre": "INSTALACION HUAWEI", "nivel": 2, "idPadre": 48, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 105, "nombre": "INSTALACION NUEVA", "nivel": 2, "idPadre": 48, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 107, "nombre": "INSTALACION ZTE", "nivel": 2, "idPadre": 48, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 115, "nombre": "PROFECO", "nivel": 2, "idPadre": 55, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 101, "nombre": "RECOLECCION EQUIPOS", "nivel": 2, "idPadre": 68, "asignacionAutomatica": 0, "horasConfirmacion": 24 }, { "id": 116, "nombre": "SOPORTE CON POTENCIA HUAWEI", "nivel": 2, "idPadre": 55, "asignacionAutomatica": 0, "horasConfirmacion": 24 }];
	let jsonOtsPendientes = [{ "ciudad": "VILLAHERMOSA", "clust": "SIN CLUSTER", "cluster": "SIN CLUSTER", "des_intervencion": "INFRAESTRUCTURA PMP", "des_sub_intervencion": "NO HAY LINEA DE VISTA FRANCA PMP", "des_subintervencion": "NO HAY LINEA DE VISTA FRANCA PMP", "distrito": "VILLAHERMOSA", "horas_incidencia": "#dc1c1c", "horas_retraso": "#dc1c1c", "id_intervencion": "165", "id_ot": "1085796", "id_sub_intervencion": "168", "latitud": "18.4270318", "longitud": "-93.1901305", "primerNivel": "INFRAESTRUCTURA PMP", "primer_nivel": "INFRAESTRUCTURA PMP", "region": "VILLAHERMOSA", "segundoNivel": "NO HAY LINEA DE VISTA FRANCA PMP", "segundonivel": "NO HAY LINEA DE VISTA FRANCA PMP", "zona": "SIN ZONA" }, { "ciudad": "ZACATECAS", "clust": "SIN CLUSTER", "cluster": "SIN CLUSTER", "des_intervencion": "INFRAESTRUCTURA PMP", "des_sub_intervencion": "ANCHO DE BANDA INSUFICIENTE PMP", "des_subintervencion": "ANCHO DE BANDA INSUFICIENTE PMP", "distrito": "ZACATECAS", "horas_incidencia": "#dc1c1c", "horas_retraso": "#dc1c1c", "id_intervencion": "165", "id_ot": "1098389", "id_sub_intervencion": "210", "latitud": "22.9541482", "longitud": "-102.702738", "primerNivel": "INFRAESTRUCTURA PMP", "primer_nivel": "INFRAESTRUCTURA PMP", "region": "BAJIO", "segundoNivel": "ANCHO DE BANDA INSUFICIENTE PMP", "segundonivel": "ANCHO DE BANDA INSUFICIENTE PMP", "zona": "SIN ZONA" }, { "ciudad": "ZACATECAS", "clust": "SIN CLUSTER", "cluster": "SIN CLUSTER", "des_intervencion": "INFRAESTRUCTURA PMP", "des_sub_intervencion": "ENVIADA DESDE IMPLEMENTACION", "des_subintervencion": "ENVIADA DESDE IMPLEMENTACION", "distrito": "ZACATECAS", "horas_incidencia": "#dc1c1c", "horas_retraso": "#dc1c1c", "id_intervencion": "165", "id_ot": "1142585", "id_sub_intervencion": "206", "latitud": "22.9535083", "longitud": "-102.7023933", "primerNivel": "INFRAESTRUCTURA PMP", "primer_nivel": "INFRAESTRUCTURA PMP", "region": "BAJIO", "segundoNivel": "ENVIADA DESDE IMPLEMENTACION", "segundonivel": "ENVIADA DESDE IMPLEMENTACION", "zona": "SIN ZONA" }, { "ciudad": "VILLAHERMOSA", "clust": "SIN CLUSTER", "cluster": "SIN CLUSTER", "des_intervencion": "INFRAESTRUCTURA PMP", "des_sub_intervencion": "NO HAY LINEA DE VISTA FRANCA PMP", "des_subintervencion": "NO HAY LINEA DE VISTA FRANCA PMP", "distrito": "VILLAHERMOSA", "horas_incidencia": "#dc1c1c", "horas_retraso": "#dc1c1c", "id_intervencion": "165", "id_ot": "1085800", "id_sub_intervencion": "168", "latitud": "18.4270318", "longitud": "-93.1901305", "primerNivel": "INFRAESTRUCTURA PMP", "primer_nivel": "INFRAESTRUCTURA PMP", "region": "VILLAHERMOSA", "segundoNivel": "NO HAY LINEA DE VISTA FRANCA PMP", "segundonivel": "NO HAY LINEA DE VISTA FRANCA PMP", "zona": "SIN ZONA" }, { "ciudad": "ZACATECAS", "clust": "SIN CLUSTER", "cluster": "SIN CLUSTER", "des_intervencion": "INFRAESTRUCTURA PMP", "des_sub_intervencion": "ANCHO DE BANDA INSUFICIENTE PMP", "des_subintervencion": "ANCHO DE BANDA INSUFICIENTE PMP", "distrito": "ZACATECAS", "horas_incidencia": "#dc1c1c", "horas_retraso": "#dc1c1c", "id_intervencion": "165", "id_ot": "1298455", "id_sub_intervencion": "210", "latitud": "22.9541482", "longitud": "-102.702738", "primerNivel": "INFRAESTRUCTURA PMP", "primer_nivel": "INFRAESTRUCTURA PMP", "region": "BAJIO", "segundoNivel": "ANCHO DE BANDA INSUFICIENTE PMP", "segundonivel": "ANCHO DE BANDA INSUFICIENTE PMP", "zona": "SIN ZONA" }, { "ciudad": "ZACATECAS", "clust": "SIN CLUSTER", "cluster": "SIN CLUSTER", "des_intervencion": "INFRAESTRUCTURA PMP", "des_sub_intervencion": "ENVIADA DESDE IMPLEMENTACION", "des_subintervencion": "ENVIADA DESDE IMPLEMENTACION", "distrito": "ZACATECAS", "horas_incidencia": "#dc1c1c", "horas_retraso": "#dc1c1c", "id_intervencion": "165", "id_ot": "1542015", "id_sub_intervencion": "206", "latitud": "22.9535083", "longitud": "-102.7023933", "primerNivel": "INFRAESTRUCTURA PMP", "primer_nivel": "INFRAESTRUCTURA PMP", "region": "BAJIO", "segundoNivel": "ENVIADA DESDE IMPLEMENTACION", "segundonivel": "ENVIADA DESDE IMPLEMENTACION", "zona": "SIN ZONA" }];
	let jsonDetalleOtPendiente = { "OTInfo": { "Estado": "NO ASIGNADA", "Estatus": "PENDIENTE", "Fecha": "25/11/2021", "Hora": "10:40", "ID_OT_PE": 1210327, "Latitud": 19.604931851597136, "Longitud": -99.20645713806152, "Motivo": "OT NUEVA", "Subtipo": "ENVIADA DESDE IMPLEMENTACION", "Tipo": "INFRAESTRUCTURA PMP", "UnidadNegocio": "PLANTA EXTERNA" }, "OT_PI": { "Cliente": "SIEGFRIED RHEIN S.A DE C.V", "CoordinadorEnvia": "JUANA COLIN MENDEZ", "Cuenta": "NO APLICA", "FechaReporte": "25/11/2021", "HoraReporte": "10:40 HRS", "ID_OT_PI": 572982, "LatitudCliente": "19.604516", "LongitudCliente": "-99.2067399", "OS": "NO APLICA", "OperarioDetuvo": "CARLOS ALBERTO RIVERA RODRIGUEZ", "TelefonoCoordinador": "5518038673", "TelefonoTecnico": "5510536413", "UnidadNegocio": "TOTALPLAY EMPRESARIAL", "InfoRadiobase": { "AnchoBanda": "BAJADA: 100 Mbps - SUBIDA: 100 Mbps", "CMS": "85927", "Latitud": "19.604931851597136", "Longitud": "-99.20645713806152", "Paquete": "NO APLICA", "Radiobase": "bosques del lago", "Sector": "2", "Zona": "Norte" }, "OT_PI": { "NombreImagen": "photoThree2021_11_24.jpg", "UrlImagen": "https://thumbs.dreamstime.com/b/poste-de-tel%C3%A9fono-1682751.jpg" } }, "OperarioInfo": { "ID_Operario": 0, "Nombre": "" } };

	let tablaOtsConsultaGeneral;
	$scope.listaOtsPendientes = [];
	$scope.listaOtsPendientesTabla = [];
	$scope.otPendienteSeleccionada = {};
	$scope.mostrarNavAccionesDetalleOtPendiente = false;
	$scope.filtrosGeneral = {};


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

	$scope.iniciarModuloTercerosGeneric = function () {
		$scope.iniciarFechasConsulta();
		$scope.inicializarsTableOts();
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
			}
			$("#idBody").removeAttr("style");

			if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {

			}

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

	$scope.inicializarsTableOts = function () {

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
			searching: false,
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
			}
		})

		let arrayBusqueda = [];
		angular.forEach($scope.listadoOtsPendientes, function (e) {
			arrayBusqueda.push(e.idOrden)
			arrayBusqueda.push(e.claveCliente)
			arrayBusqueda.push(e.folioOrden)
		})
	}

	$scope.consultarOTsTercerosGeneric = function () {


		var ventana_alto = $(window).height();
		var cardsPorPagina = 3;
		if (ventana_alto <= 670) {
			cardsPorPagina = 3;
		} else if (ventana_alto > 670 && ventana_alto <= 790) {
			cardsPorPagina = 4;
		} else if (ventana_alto > 790 && ventana_alto <= 980) {
			cardsPorPagina = 5;
		} else if (ventana_alto > 980) {
			cardsPorPagina = 6;
		}

		if (tablaOtsConsultaGeneral) {
			tablaOtsConsultaGeneral.destroy();
		}

		tablaOtsConsultaGeneral = $('#tablaOtsConsultaGeneral').DataTable({
			"paging": true,
			"lengthChange": false,
			"ordering": false,
			"scrollX": true,
			"info": false,
			"autoWidth": true,
			"pageLength": cardsPorPagina,
			"language": idioma_espanol_not_font,
			"data": $scope.listaOtsPendientesTabla,
			"sDom": '<"top"f>rt<"bottom"lp><"bottom"r><"clear">',
			"columns": [
				{
					"title": ""
				}
			]
		});

		setTimeout(function () {
			$("#txtBuscadorOtsConsultaTabla").focus();
		}, 750);
	}

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

	$scope.randomIntFromInterval = function () { // min and max included 
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

		if (tablaOtsConsultaGeneral)
			tablaOtsConsultaGeneral.destroy()

		var params = {
			fechaInicio: $scope.getFechaFormato(document.getElementById('txtFechaInicioConsulta').value),
			fechaFin: $scope.getFechaFormato(document.getElementById('txtFechaFinConsulta').value),
			idSubIntervenciones: intervenciones,
			idTurnos: turnosdisponiblescopy,
			idEstatus: estatusDisponiblesCheck,
			idClusters: clustersparam
		}


		tercerosGenericService.consultarOrdenes(params).then(function success(response) {
			$("#tablaOtsConsultaGeneral tbody").empty()
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
							let htmlAsignacionPermiso = '';


							angular.forEach($scope.listadoOts, function (otpendiente, index) {
								htmlImagenesIconos = $scope.categoriaIconos(otpendiente)
								let horas = (otpendiente.horasViva == undefined || otpendiente.horasViva == '') ? -1 : parseInt(otpendiente.horasViva)
								let htmlSemaforoOrden = ''

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
										   tag-id-ot="${otpendiente.idOrden}"  class="fullSizeCard card-style">
										<div class="header-otpendeinte">
											<div class="top-title-ot">
												<div class="content-top-element bars-content">
													<i onclick="abrirModalDetalleOtPendiente(${otpendiente.idOrden})" class="icono-ot-pendeinte fa fa-bars"></i>
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
													<p class="text-otpendiente-tres-title">FOLIO: </p>`;
								tableelemetn = tableelemetn + (($scope.accionDetalleSalesforce && otpendiente.folioOrden && otpendiente.folioOrden.substr(0, 3) === "OS-") ? `<p class="text-otpendiente-tres link-busqueda-salesforce" onclick="mostrarModalDetalleSf('${otpendiente.folioOrden}', '${otpendiente.idFolioOrden}')">${otpendiente.folioOrden}</p>` : `<p class="text-otpendiente-tres" >${otpendiente.folioOrden}</p>`);
								tableelemetn = tableelemetn + `</div>
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
										<div class="footer-otpendiente ${$scope.accionAsignacionOtPermiso ? "permiso-asignacion" : "not-permiso-asignacion"}">
											<div style=" color:${otpendiente.colorOrden}"  class="content-top-element intervencino-elemn intervencion-title"> 
												${otpendiente.descipcionTipoOrden}
											</div>
											<div class="content-iconos ${$scope.accionAsignacionOtPermiso ? "elem-asignacion" : "elem-not-asignacion"} ">  ${htmlSemaforoOrden}  ${htmlImagenesIconos}</div>   
										   ${htmlAsignacionPermiso}                                       
											${htmlAsignacionPermiso}                                       
										   ${htmlAsignacionPermiso}                                       
										</div>
									  
																		   
									</div>
								</td>
							</tr>	
							`
								//

								$("#tablaOtsConsultaGeneral tbody").append(tableelemetn)
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
			$scope.inicializarsTableOts()

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
			let textbusqeuda = $("#txtBuscadorOtsConsultaTabla").val()
			tablaOtsConsultaGeneral.search(textbusqeuda).draw()
		}
	}

	consultarAccionesOtPendiente = function (ot) {

		angular.forEach($scope.listaOtsPendientes, function (ots, index) {
			$("#cardOtPendiente" + ots.id_ot).css("border-left", "1px solid #dddddd");
			$("#cardOtPendiente" + ots.id_ot).css("box-shadow", "0 0 0 0 #ffffff");
		});

		$("#cardOtPendiente" + ot).css("border-left", "4px solid #31a7ee");
		$("#cardOtPendiente" + ot).css("box-shadow", "0 2px 8px 0 rgb(0 0 0 / 16%), 0 2px 8px 0 rgb(0 0 0 / 16%)");
		$scope.mostrarNavAccionesDetalleOtPendiente = true;
		$scope.otPendienteSeleccionada = {};
		//    	$scope.otPendienteSeleccionada = $scope.listaOtsPendientes.filter(e => {return e.id_ot == ot})[0];
		$scope.otPendienteSeleccionada = jsonDetalleOtPendiente;
		$scope.otPendienteSeleccionada.OTInfo.ID_OT_PE = ot;
		$scope.$apply();
	}

	abrirModalDetalleInformacionOtPendiente = function (ot) {
		$("#modalDetalleInformacionOtPendiente").modal('show');
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

	$scope.iniciarModuloTercerosGeneric();
}]);