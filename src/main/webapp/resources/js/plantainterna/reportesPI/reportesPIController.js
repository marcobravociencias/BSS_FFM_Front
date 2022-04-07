var app = angular.module('reportesPIApp', []);

app.controller('reportesController', ['$scope', '$q', 'reportesPIService', 'genericService', function ($scope, $q, reportesPIService, genericService) {
	app.filtroReportes($scope, reportesPIService)
	$scope.all_cluster = [];
	$scope.listaGeografia = [];
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

	$scope.nfiltrogeografiaCierre = "";
	$scope.nfiltrointervencionesCierre = "";
	$scope.nfiltroestatuspendienteCierre = "";

	$scope.nfiltrogeografiaAsignadas = "";
	$scope.nfiltrointervencionesAsignadas = "";
	$scope.nfiltroestatuspendienteAsignadas = "";

	$scope.permisosConfigUser;
	$scope.configPermisoAccionConsultaReporteSeguimiento = false;
	$scope.configPermisoAccionDescargaReporteSeguimiento = false;
	$scope.configPermisoAccionConsultaReporteCierre = false;
	$scope.configPermisoAccionDescargaReporteCierre = false;
	$scope.configPermisoAccionConsultaReporteAsignadas = false;
	$scope.configPermisoAccionDescargaReporteAsignadas = false;

	//Total rows en tabla para excel
	$scope.resultReporteDiario = null;
	$scope.resultReporteCierre = null;
	$scope.resultReporteAsignadas = null;

	$scope.getTextGeografia = function (idJsTree, idInput) {
		var geografias = $('#' + idJsTree).jstree("get_selected", true);
		let textoGeografias = [];
		angular.forEach(geografias, (geografia, index) => {
			textoGeografias.push(geografia.text);
		});
		$('#' + idInput).val(textoGeografias);
	}

	
	$scope.setTextFiltro = function () {
		if ($scope.tipoReporte === 'seguimiento') {
			$('#filtro-estatus-reporte').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteSeguimiento.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario));
			$('#filtro-intervencionO').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteSeguimiento.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario))
		}

		if ($scope.tipoReporte === 'cierre') {
			$('#filtro-estatus-reporte-cierre').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteCierre.estatusdisponibles, $scope.nfiltroestatuspendienteCierre))
			$('#filtro-intervencion-cierre').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteCierre.tipoOrdenes, $scope.nfiltrointervencionesCierre))
		}

		if ($scope.tipoReporte === 'asignadas') {
			$('#filtro-estatus-reporte-asignadas').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteAsignadas.estatusdisponibles, $scope.nfiltroestatuspendienteAsignadas));
			$('#filtro-intervencion-reporte-asignadas').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteAsignadas.tipoOrdenes, $scope.nfiltrointervencionesAsignadas));
		}
	}

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
		$("#modalCluster").on("hidden.bs.modal", function () {
			if ($scope.tipoReporte === 'seguimiento') {
				$scope.getTextGeografia('jstree-proton-seguimiento', 'clusterO');
			}

			if ($scope.tipoReporte === 'cierre') {
				$scope.getTextGeografia('jstree-proton-cierre', 'cluster-cierre');
			}

			if ($scope.tipoReporte === 'asignadas') {
				$scope.getTextGeografia('jstree-proton-asignadas', 'cluster-asignadas');
			}
		})
		$('.drop-down-filters').on("change.bs.dropdown", function (e) {
			$scope.setTextFiltro();
		});

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
		//Temporal
		$(".tab-pane").removeClass("active show");
		$("#" + tab).addClass("active show");

		switch (type) {
			case 'seguimiento':
				geografiaReporte = angular.copy($scope.listaGeografiaReporte.seguimiento);
				if ($scope.resultReporteDiario == null && geografiaReporte) {
					swal({ text: 'Cargando registros...', allowOutsideClick: false });
					swal.showLoading();
				}
				break;
			case 'cierre':
				geografiaReporte = angular.copy($scope.listaGeografiaReporte.cierre);
				if ($scope.resultReporteCierre == null && geografiaReporte) {
					swal({ text: 'Cargando registros...', allowOutsideClick: false });
					swal.showLoading();
				}
				break;
			case 'asignadas':
				geografiaReporte = angular.copy($scope.listaGeografiaReporte.asignadas);
				if ($scope.resultReporteAsignadas == null && geografiaReporte) {
					swal({ text: 'Cargando registros...', allowOutsideClick: false });
					swal.showLoading();
				}
				break;
		}

		if (geografiaReporte) {

			if (save) {
				$scope.guardarArbol($scope.tipoReporte);
			}

			let isJsTree = $('#jstree-proton-' + $scope.tipoReporte).jstree('is_loaded')[0] ? true : false;
			if (!isJsTree) {
				$('#jstree-proton-' + $scope.tipoReporte).jstree('destroy');
			}
			$scope.tipoReporte = type;
			$('#jstree-proton-' + type).bind('loaded.jstree', function (e, data) {
				switch (type) {
					case 'seguimiento':
						$scope.getTextGeografia('jstree-proton-seguimiento', 'clusterO');
						if ($scope.resultReporteDiario == null) {
							$scope.consultarReporteDiario();
						}
						break;
					case 'cierre':
						$scope.getTextGeografia('jstree-proton-cierre', 'cluster-cierre');
						if ($scope.resultReporteCierre == null) {
							$scope.consultarCierreDiario();
						}
						break;
					case 'asignadas':
						$scope.getTextGeografia('jstree-proton-asignadas', 'cluster-asignadas');
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

	$scope.listaSeleccionSelectGral = function (array, nivel) {
		let arrayReturn = "";
		angular.forEach(array, function (elemento, index) {
			if (elemento.nivel == nivel && elemento.checkedOpcion) {
				if (arrayReturn !== "") {
					arrayReturn += ',';
				}
				arrayReturn += elemento.nombre.toUpperCase();
			} else {
				arrayReturn = arrayReturn.concat($scope.listaSeleccionSelectGral(elemento.children, nivel));
			}
		});
		return arrayReturn;

	}

	$scope.ordenarGeografia = function (lista, filtro) {

		let listaGeografiaTemp = lista.filter(e => e.nivel <= parseInt(filtro));

		let geografia = angular.copy(listaGeografiaTemp);
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

		return geografia
	}

	$scope.consultarCatalagosPI = function () {
		$q.all([
			genericService.consulCatalogoGeografia(),
			genericService.consultarCatalogoIntervenciones(),
			genericService.consultarCatalogoEstatusDespachoPI(),
			reportesPIService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloReportesPI" })
		]).then(function (results) {
			let resultConf = results[3].data.result
			if (results[3].data !== undefined) {
				if (results[3].data.respuesta) {
					if (results[3].data.result) {
						
						if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
							let llavesResult = results[3].data.result.MODULO_ACCIONES_USUARIO.llaves;

							$scope.nfiltrogeografiaSeguimientoDiario = llavesResult.N_FILTRO_GEOGRAFIA_SEGUIMIENTODIARIO ? llavesResult.N_FILTRO_GEOGRAFIA_SEGUIMIENTODIARIO : llavesResult.N_FILTRO_GEOGRAFIA;
							$scope.nfiltrointervencionesSeguimientoDiario = llavesResult.N_FILTRO_INTERVENCIONES_SEGUIMIENTODIARIO ? llavesResult.N_FILTRO_INTERVENCIONES_SEGUIMIENTODIARIO : llavesResult.N_FILTRO_INTERVENCIONES;
							$scope.nfiltroestatuspendienteSeguimientoDiario = llavesResult.N_ESTATUS_PENDIENTES_SEGUIMIENTODIARIO ? llavesResult.N_ESTATUS_PENDIENTES_SEGUIMIENTODIARIO : llavesResult.N_ESTATUS_PENDIENTES;

							$scope.nfiltrogeografiaCierre = llavesResult.N_FILTRO_GEOGRAFIA_CIERREDIARIO ? llavesResult.N_FILTRO_GEOGRAFIA_CIERREDIARIO : llavesResult.N_FILTRO_GEOGRAFIA;
							$scope.nfiltrointervencionesCierre = llavesResult.N_FILTRO_INTERVENCIONES_CIERREDIARIO ? llavesResult.N_FILTRO_INTERVENCIONES_CIERREDIARIO : llavesResult.N_FILTRO_INTERVENCIONES;
							$scope.nfiltroestatuspendienteCierre = llavesResult.N_ESTATUS_PENDIENTES_CIERREDIARIO ? llavesResult.N_ESTATUS_PENDIENTES_CIERREDIARIO : llavesResult.N_ESTATUS_PENDIENTES;

							$scope.nfiltrogeografiaAsignadas = llavesResult.N_FILTRO_GEOGRAFIA_ASIGNADAS ? llavesResult.N_FILTRO_GEOGRAFIA_ASIGNADAS : llavesResult.N_FILTRO_GEOGRAFIA;
							$scope.nfiltrointervencionesAsignadas = llavesResult.N_FILTRO_INTERVENCIONES_ASIGNADAS ? llavesResult.N_FILTRO_INTERVENCIONES_ASIGNADAS : llavesResult.N_FILTRO_INTERVENCIONES;
							$scope.nfiltroestatuspendienteAsignadas = llavesResult.N_ESTATUS_PENDIENTES_ASIGNADAS ? llavesResult.N_ESTATUS_PENDIENTES_ASIGNADAS : llavesResult.N_ESTATUS_PENDIENTES;

							$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

							validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
							validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

							if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
								$scope.configPermisoAccionConsultaReporteSeguimiento = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaSeguimientoDiario" })[0] != undefined);
								$scope.configPermisoAccionDescargaReporteSeguimiento = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaSeguimientoDiario" })[0] != undefined);
								$scope.configPermisoAccionConsultaReporteCierre = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaCierreDiario" })[0] != undefined);
								$scope.configPermisoAccionDescargaReporteCierre = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaCierreDiario" })[0] != undefined);
								$scope.configPermisoAccionConsultaReporteAsignadas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaAsignadasCompensacion" })[0] != undefined);
								$scope.configPermisoAccionDescargaReporteAsignadas = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaAsignadasCompensacion" })[0] != undefined);
							}

							let firstNav = '';

							if ($scope.configPermisoAccionConsultaReporteSeguimiento) {
								if (firstNav === '') {
									firstNav = 'seguimientoDiario-tab';
									$scope.tipoReporte = 'seguimiento';
								}
							}

							if ($scope.configPermisoAccionConsultaReporteCierre) {
								if (firstNav === '') {
									firstNav = 'cierreDiario-tab';
									$scope.tipoReporte = 'cierre';
								}
							}

							if ($scope.configPermisoAccionConsultaReporteAsignadas) {
								if (firstNav === '') {
									firstNav = 'asignadasCompensacion-tab';
									$scope.tipoReporte = 'asignadas';
								}
							}

							if (firstNav === '') {
								$scope.permisosConfigUser.permisos = [];
							}
							if ($scope.permisosConfigUser.permisos.length > 0) {
								setTimeout(function () {
									$('#' + firstNav).click();
									$scope.cambiaReporte($scope.tipoReporte, false, firstNav.split('-'[0]));
								}, 300)
							}
						}
					} else {
						toastr.info('No se encontraron datos para la configuraci\u00F3n');
					}
				} else {
					toastr.warning(results[3].data.resultDescripcion);
				}
			} else {
				toastr.error('No se encontraron datos para la configuraci\u00F3n');
			}

			$("#idBody").removeAttr("style");

			if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						$scope.nfiltrointervencionesSeguimientoDiario = $scope.nfiltrointervencionesSeguimientoDiario ? $scope.nfiltrointervencionesSeguimientoDiario : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result);
						$scope.nfiltrointervencionesCierre = $scope.nfiltrointervencionesCierre ? $scope.nfiltrointervencionesCierre : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result);
						$scope.nfiltrointervencionesAsignadas = $scope.nfiltrointervencionesAsignadas ? $scope.nfiltrointervencionesAsignadas : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result);
					} else {
						toastr.info('No se encontraron  tipo ordenes');
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
						$scope.nfiltroestatuspendienteCierre = $scope.nfiltroestatuspendienteCierre ? $scope.nfiltroestatuspendienteCierre : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result);
						$scope.nfiltroestatuspendienteAsignadas = $scope.nfiltroestatuspendienteAsignadas ? $scope.nfiltroestatuspendienteAsignadas : $scope.obtenerNivelUltimoJerarquiaGeneric(results[2].data.result);

						if ($scope.configPermisoAccionConsultaReporteSeguimiento) {
							$scope.filtroEstatusInt.reporteSeguimiento = {
								estatusdisponibles: $scope.conversionAnidadaRecursiva(results[2].data.result, 1, $scope.nfiltroestatuspendienteSeguimientoDiario),
								tipoOrdenes: $scope.conversionAnidadaRecursiva(results[1].data.result, 1, $scope.nfiltrointervencionesSeguimientoDiario)

							}
							$('#filtro-estatus-reporte').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteSeguimiento.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario));
							$('#filtro-intervencionO').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteSeguimiento.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario))
						}

						if ($scope.configPermisoAccionConsultaReporteCierre) {
							$scope.filtroEstatusInt.reporteCierre = {
								estatusdisponibles: $scope.conversionAnidadaRecursiva(results[2].data.result, 1, $scope.nfiltroestatuspendienteCierre),
								tipoOrdenes: $scope.conversionAnidadaRecursiva(results[1].data.result, 1, $scope.nfiltrointervencionesCierre)
							}
							$('#filtro-estatus-reporte-cierre').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteCierre.estatusdisponibles, $scope.nfiltroestatuspendienteCierre))
							$('#filtro-intervencion-cierre').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteCierre.tipoOrdenes, $scope.nfiltrointervencionesCierre))
						}

						if ($scope.configPermisoAccionConsultaReporteAsignadas) {
							$scope.filtroEstatusInt.reporteAsignadas = {
								estatusdisponibles: $scope.conversionAnidadaRecursiva(results[2].data.result, 1, $scope.nfiltroestatuspendienteAsignadas),
								tipoOrdenes: $scope.conversionAnidadaRecursiva(results[1].data.result, 1, $scope.nfiltrointervencionesAsignadas)
							}
							$('#filtro-estatus-reporte-asignadas').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteAsignadas.estatusdisponibles, $scope.nfiltroestatuspendienteAsignadas));
							$('#filtro-intervencion-reporte-asignadas').val($scope.listaSeleccionSelectGral($scope.filtroEstatusInt.reporteAsignadas.tipoOrdenes, $scope.nfiltrointervencionesAsignadas));

						}
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
							$scope.nfiltrogeografiaSeguimientoDiario = $scope.nfiltrogeografiaSeguimientoDiario ? $scope.nfiltrogeografiaSeguimientoDiario : $scope.obtenerNivelUltimoJerarquia();
							$scope.nfiltrogeografiaCierre = $scope.nfiltrogeografiaCierre ? $scope.nfiltrogeografiaCierre : $scope.obtenerNivelUltimoJerarquia();
							$scope.nfiltrogeografiaAsignadas = $scope.nfiltrogeografiaAsignadas ? $scope.nfiltrogeografiaAsignadas : $scope.obtenerNivelUltimoJerarquia();


							if ($scope.configPermisoAccionConsultaReporteSeguimiento) {
								let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaSeguimientoDiario);
								$scope.listaGeografiaReporte.seguimiento = angular.copy(geografia);
							}

							if ($scope.configPermisoAccionConsultaReporteCierre) {
								let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaCierre);
								$scope.listaGeografiaReporte.cierre = angular.copy(geografia);
							}

							if ($scope.configPermisoAccionConsultaReporteAsignadas) {
								let geografia = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaAsignadas);
								$scope.listaGeografiaReporte.asignadas = angular.copy(geografia);
							}

						} else {
							toastr.info('No se encontraron datos para la geograf\u00EDa');
						}
					} else {
						toastr.info('No se encontraron datos para la geograf\u00EDa');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de la geograf\u00EDa');
			}

		}).catch(err => handleError(err));
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
		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: false
		});
		$('.datepicker').datepicker('update', new Date());

		setTimeout(function () {
			$("#tipo_reporte_cierre").val('fechaCreacion');
			$("#tipo_reporte").val('fechaCreacion');
			$("#tipo_reporte_asignadas").val('fechaCreacion');
		}, 300)

		reporteSeguimientoTable = $('#reporteSeguimientoTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": true,
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
			"info": true,
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
			"info": true,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
		});

	}

	$scope.iniciarReporteOrdenes();

	$scope.consultarReporteDiario = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;
		$scope.resultReporteDiario = 0;

		let clustersparam = $("#jstree-proton-seguimiento").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clustersparam.length === 0) {
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
			swal.close()
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
			paramsTemp.geografias = clustersparam;
			if ($scope.repDiario.idOrden && $scope.repDiario.idOrden != "") {
				paramsTemp.idOrden = $.trim($scope.repDiario.idOrden);
			}

			if ($scope.repDiario.folio && $scope.repDiario.folio != "") {
				paramsTemp.folio = $.trim($scope.repDiario.folio);
			}

			if ($scope.repDiario.idCuenta && $scope.repDiario.idCuenta != "") {
				paramsTemp.idCuenta = $.trim($scope.repDiario.idCuenta);
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
				"info": true,
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
				"language": idioma_espanol_not_font

			});

			if (!reporteSeguimientoTable) {
				reporteSeguimientoTable = $('#reporteSeguimientoTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"info": true,
					"autoWidth": true,
					"language": idioma_espanol_not_font,
				});
			}
		}
	}

	downloadExcelReportFile = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;

		let clustersparam = $("#jstree-proton-seguimiento").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clustersparam.length === 0) {
			mensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValid = false
		}

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteSeguimiento.estatusdisponibles, $scope.nfiltroestatuspendienteSeguimientoDiario);

		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteSeguimiento.tipoOrdenes, $scope.nfiltrointervencionesSeguimientoDiario);

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
			swal.close();
			mensaje += '</ul>';
			mostrarMensajeWarningValidacion(mensaje);
			return false;
		} else {
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
				paramsR.idOrden = $.trim($scope.repDiario.idOrden);
			}

			if ($scope.repDiario.folio && $scope.repDiario.folio != "") {
				paramsR.folio = $.trim($scope.repDiario.folio);
			}

			if ($scope.repDiario.idCuenta && $scope.repDiario.idCuenta != "") {
				paramsR.idCuenta = $.trim($scope.repDiario.idCuenta);
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
	}

	$scope.consultarCierreDiario = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;
		$scope.resultReporteCierre = 0;

		let clustersparam = $("#jstree-proton-cierre").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clustersparam.length === 0) {
			mensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValid = false
		}

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteCierre.estatusdisponibles, $scope.nfiltroestatuspendienteCierre);

		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteCierre.tipoOrdenes, $scope.nfiltrointervencionesCierre);

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
			swal.close();
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
			paramsTemp.geografias = clustersparam;
			if ($scope.repCierreDiario.idOrden && $scope.repCierreDiario.idOrden != "") {
				paramsTemp.idOrden = $.trim($scope.repCierreDiario.idOrden);
			}

			if ($scope.repCierreDiario.folio && $scope.repCierreDiario.folio != "") {
				paramsTemp.folio = $.trim($scope.repCierreDiario.folio);
			}

			if ($scope.repCierreDiario.idCuenta && $scope.repCierreDiario.idCuenta != "") {
				paramsTemp.idCuenta = $.trim($scope.repCierreDiario.idCuenta);
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
				"info": true,
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

				"columns": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font

			});

			if (!reporteCierreTable) {
				reporteCierreTable = $('#reporteCierreTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"info": true,
					"autoWidth": true,
					"language": idioma_espanol_not_font
				});
			}
		}
	}

	downloadExcelReportCierreFile = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;

		let clustersparam = $("#jstree-proton-cierre").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clustersparam.length === 0) {
			mensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValid = false
		}

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteCierre.estatusdisponibles, $scope.nfiltroestatuspendienteCierre);

		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteCierre.tipoOrdenes, $scope.nfiltrointervencionesCierre);

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
			swal.close();
			mensaje += '</ul>';
			mostrarMensajeWarningValidacion(mensaje);
			return false;
		} else {

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
				paramsR.idOrden = $.trim($scope.repCierreDiario.idOrden);
			}

			if ($scope.repCierreDiario.folio && $scope.repCierreDiario.folio != "") {
				paramsR.folio = $.trim($scope.repCierreDiario.folio);
			}

			if ($scope.repCierreDiario.idCuenta && $scope.repCierreDiario.idCuenta != "") {
				paramsR.idCuenta = $.trim($scope.repCierreDiario.idCuenta);
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
	}


	$scope.consultarReporteAsignadasCompensacion = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;
		$scope.resultReporteAsignadas = 0;

		let clustersparam = $("#jstree-proton-asignadas").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clustersparam.length === 0) {
			mensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValid = false
		}

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteAsignadas.estatusdisponibles, $scope.nfiltroestatuspendienteAsignadas);

		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteAsignadas.tipoOrdenes, $scope.nfiltrointervencionesAsignadas);

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
			swal.close();
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
			paramsTemp.geografias = clustersparam;
			if ($scope.repAsignadas.idOrden && $scope.repAsignadas.idOrden != "") {
				paramsTemp.idOrden = $.trim($scope.repAsignadas.idOrden);
			}

			if ($scope.repAsignadas.folio && $scope.repAsignadas.folio != "") {
				paramsTemp.folio = $.trim($scope.repAsignadas.folio);
			}

			if ($scope.repAsignadas.idCuenta && $scope.repAsignadas.idCuenta != "") {
				paramsTemp.idCuenta = $.trim($scope.repAsignadas.idCuenta);
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
				"info": true,
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

				"columns": [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font

			});

			if (!reporteAsignadasTable) {
				reporteAsignadasTable = $('#reporteAsignadasTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"info": true,
					"autoWidth": true,
					"language": idioma_espanol_not_font
				});
			}
		}
	}

	downloadExcelReportAsignadasFile = function () {
		let mensaje = '<ul>';
		let isValid = true;
		let numerosOnly = /^[0-9]*$/i;

		let clustersparam = $("#jstree-proton-asignadas").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaSeguimientoDiario)
			.map(e => parseInt(e.id));

		if (clustersparam.length === 0) {
			mensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValid = false
		}

		let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteAsignadas.estatusdisponibles, $scope.nfiltroestatuspendienteAsignadas);

		let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtroEstatusInt.reporteAsignadas.tipoOrdenes, $scope.nfiltrointervencionesAsignadas);

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
			swal.close();
			mensaje += '</ul>';
			mostrarMensajeWarningValidacion(mensaje);
			return false;
		} else {

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
				paramsR.idOrden = $.trim($scope.repAsignadas.idOrden);
			}

			if ($scope.repAsignadas.folio && $scope.repAsignadas.folio != "") {
				paramsR.folio = $.trim($scope.repAsignadas.folio);
			}

			if ($scope.repAsignadas.idCuenta && $scope.repAsignadas.idCuenta != "") {
				paramsR.idCuenta = $.trim($scope.repAsignadas.idCuenta);
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
	}

	$scope.consultarCatalagosPI();

	//$scope.initComponents();
	$("#li-reporte-navbar").addClass('active')

	angular.element(document).ready(function () {
		$("#moduloReportesPI").addClass('active')
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
	});


}]);