var app = angular.module('reportesPIApp', []);

app.controller('reportesController', ['$scope', '$q', 'reportesPIService', 'genericService', function ($scope, $q, reportesPIService, genericService) {
	app.filtroReportes($scope, reportesPIService)
	$scope.all_cluster = [];
	$scope.listaGeografia = [];
	let reporteOrdenesTabla;
	let reporteTecnicoTabla;
	let reporteDespachoTabla;
	let reporteAuxiliarTabla;
	let reporteInspectorTabla;
	let reporteSeguimientoTable;
	let reporteCierreTable;
	let reporteAsignadasTable;
	$scope.filtrosGeneral = {};
	$scope.repDiario = {};
	$scope.repCierreDiario = {};
	$scope.repAsignadas = {};
	$scope.filtroEstatusInt = {};
	$scope.listaGeografiaReporte = {};

	$scope.tipoReporte = '';

	//Permisos y llaves
	$scope.nfiltrogeografiaSeguimientoDiario = "";
	$scope.nfiltrointervencionesSeguimientoDiario = "";
	$scope.nfiltroestatuspendienteSeguimientoDiario = "";
	$scope.permisosConfigUser = [];
	$scope.configPermisoAccionConsultaReporteSeguimiento = false;
	$scope.configPermisoAccionConsultaReporteCierre = false;
	$scope.configPermisoAccionConsultaReporteAsignadas = false;

	//Total rows en tabla para excel
	$scope.resultReporteDiario = null;
	$scope.resultReporteCierre = null;
	$scope.resultReporteAsignadas = null;


	angular.element(document).ready(function () {
		$('#searchGeo-seguimiento').on('keyup', function () {
			$("#jstree-proton-seguimiento").jstree("search", this.value);
		})

		$('#searchGeo-cierre').on('keyup', function () {
			$("#jstree-proton-cierre").jstree("search", this.value);
		})

		$('#searchGeo-asignadas').on('keyup', function () {
			$("#jstree-proton-asignadas").jstree("search", this.value);
		})

	})



	$scope.abrirModalGeografiaRep = function (type) {
		$("#jstree-proton-" + type).jstree("search", '');
		$("#searchGeo-" + type).val('');
		$("#modalCluster").modal('show');
		setTimeout(function () {
			$("#searchGeo-" + type).focus();
		}, 750);
	}

	$scope.cambiaReporte = function (type, save, tab) {
		let geografiaReporte = [];
		if (save) {
			$scope.guardarArbol($scope.tipoReporte);
		}

		//Temporal
		$(".tab-pane").removeClass("active show");
		$("#"+tab).addClass("active show");

		switch (type) {
			case 'seguimiento':
				geografiaReporte = angular.copy($scope.listaGeografiaReporte.seguimiento);

				break;
			case 'cierre':
				geografiaReporte = angular.copy($scope.listaGeografiaReporte.cierre);

				break;
			case 'asignadas':
				geografiaReporte = angular.copy($scope.listaGeografiaReporte.asignadas);

				break;
		}

		let isJsTree = $('#jstree-proton-' + $scope.tipoReporte).jstree('is_loaded')[0] ? true : false;
		if (!isJsTree) {
			$('#jstree-proton-' + $scope.tipoReporte).jstree('destroy');
		}
		$scope.tipoReporte = type;
		$('#jstree-proton-' + type).bind('loaded.jstree', function (e, data) {
			switch (type) {
				case 'seguimiento':
					if ($scope.resultReporteDiario == null) {
						$scope.consultarReporteDiario();
					}
					break;
				case 'cierre':
					if ($scope.resultReporteCierre == null) {
						$scope.consultarCierreDiario();
					}
					break;
				case 'asignadas':
					if ($scope.resultReporteAsignadas == null) {
						$scope.consultarReporteAsignadasCompensacion();
					}
					break;
			}

		}).jstree({
			'plugins': ["wholerow", "checkbox", "search"],
			'core': {
				'data': geografiaReporte,
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
	}

	$scope.guardarArbol = function (type) {
		let arbolActual = $("#jstree-proton-" + type).jstree("get_selected", true)
			.map(e => parseInt(e.id));

		switch (type) {
			case 'seguimiento':
				$scope.listaGeografiaReporte.seguimiento.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
			case 'cierre':
				$scope.listaGeografiaReporte.cierre.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
			case 'asignadas':
				$scope.listaGeografiaReporte.asignadas.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
		}

	}

	$scope.consultarCatalagosPI = function () {
		$q.all([
			genericService.consulCatalogoGeografia(),
			genericService.consultarCatalogoIntervenciones(),
			genericService.consultarCatalogoEstatusDespachoPI(),
			reportesPIService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloReportesPI" })
		]).then(function (results) {
			let resultConf = results[3].data.result
			if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
				let llavesResult = results[3].data.result.MODULO_ACCIONES_USUARIO.llaves;

				$scope.nfiltrogeografiaSeguimientoDiario = llavesResult.N_FILTRO_GEOGRAFIA_SEGUIMIENTODIARIO;
				$scope.nfiltrointervencionesSeguimientoDiario = llavesResult.N_FILTRO_INTERVENCIONES_SEGUIMIENTODIARIO;
				$scope.nfiltroestatuspendienteSeguimientoDiario = llavesResult.N_ESTATUS_PENDIENTES_SEGUIMIENTODIARIO;
				$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

				validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
				validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

				if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
					$scope.configPermisoAccionConsultaReporteSeguimiento = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaSeguimientoDiario" })[0] != undefined);
					$scope.configPermisoAccionConsultaReporteCierre = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCierreDiario" })[0] != undefined);
					$scope.configPermisoAccionConsultaReporteAsignadas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaAsignadasCompensacion" })[0] != undefined);
				}
			}

			//    console.log("entra de cualquier manera")
			if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						$scope.nfiltrointervencionesSeguimientoDiario = $scope.nfiltrointervencionesSeguimientoDiario ? $scope.nfiltrointervencionesSeguimientoDiario : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result);
						$scope.filtrosGeneral.tipoOrdenes = $scope.conversionAnidadaRecursiva(results[1].data.result, 1, $scope.nfiltrointervencionesSeguimientoDiario);
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
						$scope.nfiltroestatuspendienteSeguimientoDiario = $scope.nfiltroestatuspendienteSeguimientoDiario ? $scope.nfiltroestatuspendienteSeguimientoDiario : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result);
						$scope.filtrosGeneral.estatusdisponibles = $scope.conversionAnidadaRecursiva(results[2].data.result, 1, $scope.nfiltroestatuspendienteSeguimientoDiario);
					} else {
						toastr.info('No se encontraron catalogo de estatus');
					}
				} else {
					toastr.warning(results[2].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de catalogo de estatus');
			}
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						if (results[0].data.result.geografia) {
							$scope.listadogeografiacopy = results[0].data.result.geografia
							let firstNav = '';
							$scope.nfiltrogeografiaSeguimientoDiario = $scope.nfiltrogeografiaSeguimientoDiario ? $scope.nfiltrogeografiaSeguimientoDiario : $scope.obtenerNivelUltimoJerarquia();
							$scope.listaGeografia = results[0].data.result.geografia.filter(e => e.nivel <= parseInt($scope.nfiltrogeografiaSeguimientoDiario));

							let geografia = angular.copy($scope.listaGeografia);
							geografia.map((e) => {
								e.parent = e.padre == undefined ? "#" : e.padre;
								e.text = e.nombre;
								e.icon = "fa fa-globe";
								e.state = {
									opened: false,
									selected: true,
								}
								return e
							})


							if ($scope.configPermisoAccionConsultaReporteSeguimiento) {
								if (firstNav === '') {
									firstNav = 'seguimientoDiario-tab';
									$scope.tipoReporte = 'seguimiento';
								}
								setTimeout(function () {
									$("#tipo_reporte").val('fechaCreacion');
								}, 300)

								$scope.filtroEstatusInt.reporteSeguimiento = {
									estatusdisponibles: angular.copy($scope.filtrosGeneral.estatusdisponibles),
									tipoOrdenes: angular.copy($scope.filtrosGeneral.tipoOrdenes)
								}
								$scope.listaGeografiaReporte.seguimiento = angular.copy(geografia);
							}

							if ($scope.configPermisoAccionConsultaReporteCierre) {
								if (firstNav === '') {
									firstNav = 'cierreDiario-tab';
									$scope.tipoReporte = 'cierre';
								}
								setTimeout(function () {
									$("#tipo_reporte_cierre").val('fechaCreacion');
								}, 300)
								$scope.filtroEstatusInt.reporteCierre = {
									estatusdisponibles: angular.copy($scope.filtrosGeneral.estatusdisponibles),
									tipoOrdenes: angular.copy($scope.filtrosGeneral.tipoOrdenes)
								}
								$scope.listaGeografiaReporte.cierre = angular.copy(geografia);
								//$scope.cargaArbol('cierre', geografia);
							}

							if ($scope.configPermisoAccionConsultaReporteAsignadas) {
								if (firstNav === '') {
									firstNav = 'asignadasCompensacion-tab';
									$scope.tipoReporte = 'asignadas';
								}
								setTimeout(function () {
									$("#tipo_reporte_asignadas").val('fechaCreacion');
								}, 300)
								$scope.filtroEstatusInt.reporteAsignadas = {
									estatusdisponibles: angular.copy($scope.filtrosGeneral.estatusdisponibles),
									tipoOrdenes: angular.copy($scope.filtrosGeneral.tipoOrdenes)
								}
								$scope.listaGeografiaReporte.asignadas = angular.copy(geografia);

								//$scope.cargaArbol('asignadas', geografia);
							}

							if ($scope.permisosConfigUser.permisos.length > 0) {
								setTimeout(function () {
									$('#' + firstNav).click();
									$('.datepicker').datepicker({
										format: 'dd/mm/yyyy',
										autoclose: true,
										language: 'es',
										todayHighlight: true,
										clearBtn: false
									});
									$('.datepicker').datepicker('update', new Date());
									$scope.cambiaReporte($scope.tipoReporte, false, firstNav.split('-'[0]));
									$scope.iniciarReporteOrdenes()
								}, 300)
							}

						} else {
							toastr.warning('No se encontraron datos para la geografia');
						}
					} else {
						toastr.warning('No se encontraron datos para la geografia');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de turnos');
			}

		}).catch(err => handleError(err));
	}


	$scope.cargaArbol = function (type, geografia) {

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

	$scope.setCheckFiltroGeneric = function (filtroParent) {
		console.log(filtroParent.checkedOpcion)
		console.log("#####---------")
		console.log(filtroParent.children)

		filtroParent.checkedOpcion = !filtroParent.checkedOpcion
		filtroParent.children.map(function (e) {
			e.checkedOpcion = filtroParent.checkedOpcion
			return e
		})
		console.log("#####")
		console.log(filtroParent.children)
		console.log(filtroParent.checkedOpcion)
	}
	$scope.setCheckSubFiltroGeneric = function (subFiltro, parentFiltro) {
		subFiltro.checkedOpcion = !subFiltro.checkedOpcion
		let cantidadSubfiltros = parentFiltro.children.length
		let cantidadChecked = parentFiltro.children.filter(function (e) { return e.checkedOpcion }).length
		parentFiltro.checkedOpcion = cantidadSubfiltros !== cantidadChecked ? false : true
	}
	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}
	function compareGeneric(a, b) {
		let niveluno = a.nivel;
		let niveldos = b.nivel;
		if (niveluno > niveldos) {
			return -1
		} else if (niveluno < niveldos) {
			return 1
		}
		return 0
	}
	$scope.obtenerNivelUltimoJerarquia = function () {
		return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
	}

	$scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
		return list.sort(compareGeneric)[0].nivel
	}

	validarFecha = function (inicio, fin) {
		if (document.getElementById(inicio).value.trim() != "" && document.getElementById(fin).value.trim() != "") {
			var inicio = document.getElementById(inicio).value.split('/');
			var fin = document.getElementById(fin).value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}

	$scope.iniciarReporteOrdenes = function () {
		$('.drop-down-filters').on("click.bs.dropdown", function (e) {
			e.stopPropagation();
		});

		reporteSeguimientoTable = $('#reporteSeguimientoTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
		});

		reporteCierreTable = $('#reporteCierreTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
		});

		reporteAsignadasTable = $('#reporteAsignadasTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
		});

	}

	$scope.consultarReporteDiario = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;
		$scope.resultReporteDiario = 0;

		let clusters = $("#jstree-proton-seguimiento").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clusters.length === 0) {
			mensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValid = false
		}

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteSeguimiento.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario);

		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteSeguimiento.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario);

		let paramsTemp = {};

		if (!statuscopy.length) {
			mensaje += '<li>Introducir Estatus</li>';
			isValid = false;
		}

		if (!intervencioncopy.length) {
			mensaje += '<li>Introducir Intervenci\u00F3n</li>';
			isValid = false;
		}

		if (!numerosOnly.test($("#idot-reporte").val())) {
			mensaje += '<li>El campo OT debe ser n&uacute;merico</li>';
			isValid = false;
		}

		if ($("#tipo_reporte").val() == "" || $("#tipo_reporte").val() == undefined) {
			mensaje += '<li>Selecciona Tipo fecha</li>';
			isValid = false;
		} else {
			$scope.repDiario.fechaSeleccionada = $("#tipo_reporte").val()
		}

		if (!validarFecha('filtro_fecha_inicio_reporte', 'filtro_fecha_fin_reporte')) {
			mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
			isValid = false;
		}

		if (!isValid) {
			mensaje += '</ul>';
			mostrarMensajeWarningValidacion(mensaje);
			return false;
		} else {
			paramsTemp.fechaInicio = $scope.getFechaFormato($("#filtro_fecha_inicio_reporte").val());
			paramsTemp.fechaFin = $scope.getFechaFormato($("#filtro_fecha_fin_reporte").val());
			paramsTemp.tipoIntervencion = intervencioncopy;
			paramsTemp.estatusOt = statuscopy;
			paramsTemp.fechaSeleccionada = $scope.repDiario.fechaSeleccionada;
			paramsTemp.elementosPorPagina = 10;
			paramsTemp.pagina = 1;
			paramsTemp.geografias = clusters;
			if ($scope.repDiario.idOrden && $scope.repDiario.idOrden != "") {
				paramsTemp.idOrden = $scope.repDiario.idOrden;
			}

			if ($scope.repDiario.folio && $scope.repDiario.folio != "") {
				paramsTemp.folio = $scope.repDiario.folio;
			}

			if ($scope.repDiario.idCuenta && $scope.repDiario.idCuenta != "") {
				paramsTemp.idCuenta = $scope.repDiario.idCuenta;
			}

			if (reporteSeguimientoTable) {
				reporteSeguimientoTable.destroy()
			}
			reporteSeguimientoTable = $('#reporteSeguimientoTable').DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"lengthChange": false,
				"searching": false,
				"ordering": false,
				"pageLength": 10,
				"info": false,
				"ajax": {
					"url": "req/consultarReporteSeguimientoDiario",
					"type": "POST",
					"data": paramsTemp,
					"beforeSend": function () {
						if (!swal.isVisible()) {
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}

					},
					"dataSrc": function (json) {
						$scope.resultReporteDiario = json.registrosTotales
						return json.data;
					},
					"error": function (xhr, error, thrown) {
						handleError(xhr)
					},
					"complete": function () {
						swal.close()
					}
				},

				"columns": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font,
				"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				dom: 'Bfrtip'

			});

			if (!reporteSeguimientoTable) {
				reporteSeguimientoTable = $('#reporteSeguimientoTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"info": false,
					"autoWidth": true,
					"language": idioma_espanol_not_font,
					"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				});
			}
		}
	}

	downloadExcelReportFile = function () {
		let clustersparam = $("#jstree-proton-seguimiento").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id))

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteSeguimiento.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario);
		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteSeguimiento.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario);

		let paramsR = {
			fechaInicio: $scope.getFechaFormato($('#filtro_fecha_inicio_reporte').val()),
			fechaFin: $scope.getFechaFormato($('#filtro_fecha_fin_reporte').val()),
			tipoIntervencion: intervencioncopy,
			estatusOt: statuscopy,
			geografias: clustersparam,
			fechaSeleccionada: $("#tipo_reporte").val(),
			elementosPorPagina: $scope.resultReporteDiario,
			pagina: 1
		}

		if ($scope.repDiario.idOrden && $scope.repDiario.idOrden != "") {
			paramsR.idOrden = $scope.repDiario.idOrden;
		}

		if ($scope.repDiario.folio && $scope.repDiario.folio != "") {
			paramsR.folio = $scope.repDiario.folio;
		}

		if ($scope.repDiario.idCuenta && $scope.repDiario.idCuenta != "") {
			paramsR.idCuenta = $scope.repDiario.idCuenta;
		}

		swal({ text: 'Cargando registros...', allowOutsideClick: false });
		swal.showLoading();

		reportesPIService.consultaReporteDiario(paramsR).then((result) => {
			swal.close()
			if (result.data.respuesta) {
				const data = JSON.parse(result.data.result).ordenes
				const fileName = 'Resporte Seguimiento Diario'
				const exportType = 'xls'

				window.exportFromJSON({ data, fileName, exportType })
			} else {
				mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
			}

		}).catch(err => handleError(err));
	}

	$scope.consultarCierreDiario = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;
		$scope.resultReporteCierre = 0;

		let clusters = $("#jstree-proton-cierre").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clusters.length === 0) {
			mensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValid = false
		}

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteCierre.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario);

		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteCierre.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario);

		let paramsTemp = {};

		if (!statuscopy.length) {
			mensaje += '<li>Introducir Estatus</li>';
			isValid = false;
		}

		if (!intervencioncopy.length) {
			mensaje += '<li>Introducir Intervenci\u00F3n</li>';
			isValid = false;
		}

		if (!numerosOnly.test($("#idot-reporte-cierre").val())) {
			mensaje += '<li>El campo OT debe ser n&uacute;merico</li>';
			isValid = false;
		}

		if ($("#tipo_reporte_cierre").val() == "" || $("#tipo_reporte_cierre").val() == undefined) {
			mensaje += '<li>Selecciona Tipo fecha</li>';
			isValid = false;
		} else {
			$scope.repCierreDiario.fechaSeleccionada = $("#tipo_reporte_cierre").val()
		}

		if (!validarFecha('filtro_fecha_inicio_reporte_cierre', 'filtro_fecha_fin_reporte_cierre')) {
			mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
			isValid = false;
		}

		if (!isValid) {
			mensaje += '</ul>';
			mostrarMensajeWarningValidacion(mensaje);
			return false;
		} else {
			paramsTemp.fechaInicio = $scope.getFechaFormato($("#filtro_fecha_inicio_reporte_cierre").val());
			paramsTemp.fechaFin = $scope.getFechaFormato($("#filtro_fecha_fin_reporte_cierre").val());
			paramsTemp.tipoIntervencion = intervencioncopy;
			paramsTemp.estatusOt = statuscopy;
			paramsTemp.fechaSeleccionada = $scope.repCierreDiario.fechaSeleccionada;
			paramsTemp.elementosPorPagina = 10;
			paramsTemp.pagina = 1;
			paramsTemp.geografias = clusters;
			if ($scope.repCierreDiario.idOrden && $scope.repCierreDiario.idOrden != "") {
				paramsTemp.idOrden = $scope.repCierreDiario.idOrden;
			}

			if ($scope.repCierreDiario.folio && $scope.repCierreDiario.folio != "") {
				paramsTemp.folio = $scope.repCierreDiario.folio;
			}

			if ($scope.repCierreDiario.idCuenta && $scope.repCierreDiario.idCuenta != "") {
				paramsTemp.idCuenta = $scope.repCierreDiario.idCuenta;
			}

			if (reporteCierreTable) {
				reporteCierreTable.destroy()
			}
			reporteCierreTable = $('#reporteCierreTable').DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"lengthChange": false,
				"searching": false,
				"ordering": false,
				"pageLength": 10,
				"info": false,
				"ajax": {
					"url": "req/consultarReporteCierreDiario",
					"type": "POST",
					"data": paramsTemp,
					"beforeSend": function () {
						if (!swal.isVisible()) {
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}

					},
					"dataSrc": function (json) {
						$scope.resultReporteCierre = json.registrosTotales;
						return json.data;
					},
					"error": function (xhr, error, thrown) {
						handleError(xhr)
					},
					"complete": function () {
						swal.close()
					}
				},

				"columns": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font,
				"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				dom: 'Bfrtip',
				buttons:
					[{
						extend: 'excelHtml5',
						title: 'Reporte Cierre Diario',
						text: 'Exportar Excel'
					}],
			});

			if (!reporteCierreTable) {
				reporteCierreTable = $('#reporteCierreTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"info": false,
					"autoWidth": true,
					"language": idioma_espanol_not_font,
					"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				});
			}
		}
	}

	downloadExcelReportCierreFile = function () {
		let clustersparam = $("#jstree-proton-cierre").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id))

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteSeguimiento.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario);
		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteSeguimiento.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario);

		let paramsR = {
			fechaInicio: $scope.getFechaFormato($('#filtro_fecha_inicio_reporte_cierre').val()),
			fechaFin: $scope.getFechaFormato($('#filtro_fecha_fin_reporte_cierre').val()),
			tipoIntervencion: intervencioncopy,
			estatusOt: statuscopy,
			geografias: clustersparam,
			fechaSeleccionada: $("#tipo_reporte_cierre").val(),
			elementosPorPagina: $scope.resultReporteCierre,
			pagina: 1
		}

		if ($scope.repCierreDiario.idOrden && $scope.repCierreDiario.idOrden != "") {
			paramsR.idOrden = $scope.repCierreDiario.idOrden;
		}

		if ($scope.repCierreDiario.folio && $scope.repCierreDiario.folio != "") {
			paramsR.folio = $scope.repCierreDiario.folio;
		}

		if ($scope.repCierreDiario.idCuenta && $scope.repCierreDiario.idCuenta != "") {
			paramsR.idCuenta = $scope.repCierreDiario.idCuenta;
		}


		swal({ text: 'Cargando registros...', allowOutsideClick: false });
		swal.showLoading();

		reportesPIService.consultaReporteCierreDiario(paramsR).then((result) => {
			swal.close()
			if (result.data.respuesta) {
				const data = JSON.parse(result.data.result).ordenes
				const fileName = 'Resporte Cierre Diario'
				const exportType = 'xls'

				window.exportFromJSON({ data, fileName, exportType })
			} else {
				mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
			}

		}).catch(err => handleError(err));
	}


	$scope.consultarReporteAsignadasCompensacion = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;
		$scope.resultReporteAsignadas = 0;

		let clusters = $("#jstree-proton-asignadas").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clusters.length === 0) {
			mensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValid = false
		}

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteAsignadas.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario);

		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteAsignadas.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario);

		let paramsTemp = {};

		if (!statuscopy.length) {
			mensaje += '<li>Introducir Estatus</li>';
			isValid = false;
		}

		if (!intervencioncopy.length) {
			mensaje += '<li>Introducir Intervenci\u00F3n</li>';
			isValid = false;
		}

		if (!numerosOnly.test($("#idot-reporte-asignadas").val())) {
			mensaje += '<li>El campo OT debe ser n&uacute;merico</li>';
			isValid = false;
		}

		if ($("#tipo_reporte_asignadas").val() == "" || $("#tipo_reporte_asignadas").val() == undefined) {
			mensaje += '<li>Selecciona Tipo fecha</li>';
			isValid = false;
		} else {
			$scope.repCierreDiario.fechaSeleccionada = $("#tipo_reporte_asignadas").val()
		}

		if (!validarFecha('filtro_fecha_inicio_reporte_asignadas', 'filtro_fecha_fin_reporte_asignadas')) {
			mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
			isValid = false;
		}

		if (!isValid) {
			mensaje += '</ul>';
			mostrarMensajeWarningValidacion(mensaje);
			return false;
		} else {
			paramsTemp.fechaInicio = $scope.getFechaFormato($("#filtro_fecha_inicio_reporte_asignadas").val());
			paramsTemp.fechaFin = $scope.getFechaFormato($("#filtro_fecha_fin_reporte_asignadas").val());
			paramsTemp.tipoIntervencion = intervencioncopy;
			paramsTemp.estatusOt = statuscopy;
			paramsTemp.fechaSeleccionada = $("#tipo_reporte_asignadas").val();
			paramsTemp.elementosPorPagina = 10;
			paramsTemp.pagina = 1;
			paramsTemp.geografias = clusters;
			if ($scope.repAsignadas.idOrden && $scope.repAsignadas.idOrden != "") {
				paramsTemp.idOrden = $scope.repAsignadas.idOrden;
			}

			if ($scope.repAsignadas.folio && $scope.repAsignadas.folio != "") {
				paramsTemp.folio = $scope.repAsignadas.folio;
			}

			if ($scope.repAsignadas.idCuenta && $scope.repAsignadas.idCuenta != "") {
				paramsTemp.idCuenta = $scope.repAsignadas.idCuenta;
			}

			if (reporteAsignadasTable) {
				reporteAsignadasTable.destroy()
			}
			reporteAsignadasTable = $('#reporteAsignadasTable').DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"lengthChange": false,
				"searching": false,
				"ordering": false,
				"pageLength": 10,
				"info": false,
				"ajax": {
					"url": "req/consultarReporteAsignadasCompensacion",
					"type": "POST",
					"data": paramsTemp,
					"beforeSend": function () {
						if (!swal.isVisible()) {
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}

					},
					"dataSrc": function (json) {
						$scope.resultReporteAsignadas = json.registrosTotales;
						return json.data;
					},
					"error": function (xhr, error, thrown) {
						handleError(xhr)
					},
					"complete": function () {
						swal.close()
					}
				},

				"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font,
				"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				dom: 'Bfrtip',
				buttons:
					[{
						extend: 'excelHtml5',
						title: 'Reporte Cierre Diario',
						text: 'Exportar Excel'
					}],
			});

			if (!reporteAsignadasTable) {
				reporteAsignadasTable = $('#reporteAsignadasTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"info": false,
					"autoWidth": true,
					"language": idioma_espanol_not_font,
					"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				});
			}
		}
	}

	downloadExcelReportAsignadasFile = function () {
		let clustersparam = $("#jstree-proton-asignadas").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id))

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteAsignadas.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario);
		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteAsignadas.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario);

		let paramsR = {
			fechaInicio: $scope.getFechaFormato($('#filtro_fecha_inicio_reporte_asignadas').val()),
			fechaFin: $scope.getFechaFormato($('#filtro_fecha_fin_reporte_asignadas').val()),
			tipoIntervencion: intervencioncopy,
			estatusOt: statuscopy,
			geografias: clustersparam,
			fechaSeleccionada: $("#tipo_reporte_asignadas").val(),
			elementosPorPagina: $scope.resultReporteAsignadas,
			pagina: 1
		}

		if ($scope.repAsignadas.idOrden && $scope.repAsignadas.idOrden != "") {
			paramsR.idOrden = $scope.repAsignadas.idOrden;
		}

		if ($scope.repAsignadas.folio && $scope.repAsignadas.folio != "") {
			paramsR.folio = $scope.repAsignadas.folio;
		}

		if ($scope.repAsignadas.idCuenta && $scope.repAsignadas.idCuenta != "") {
			paramsR.idCuenta = $scope.repAsignadas.idCuenta;
		}


		swal({ text: 'Cargando registros...', allowOutsideClick: false });
		swal.showLoading();

		reportesPIService.consultaReporteAsignadas(paramsR).then((result) => {
			swal.close()
			if (result.data.respuesta) {
				const data = JSON.parse(result.data.result).ordenes
				const fileName = 'Resporte Asignadas Compensacion'
				const exportType = 'xls'

				window.exportFromJSON({ data, fileName, exportType })
			} else {
				mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
			}

		}).catch(err => handleError(err));
	}

	$scope.consultarCatalagosPI();

	//$scope.initComponents();
	$("#li-reporte-navbar").addClass('active')

	angular.element(document).ready(function () {
		$("#idBody").removeAttr("style");
		$("#moduloReportesPI").addClass('active')
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
	});


}]);