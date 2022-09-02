var app = angular.module('traspasosApp', []);
var objectTempAccion;

app.controller('traspasosController', ['$scope', '$q', 'traspasosService', 'genericService', function ($scope, $q, traspasosService, genericService) {
	app.calendarController($scope);
	app.mapController($scope, traspasosService);

	var otsTable;
	var traspasosTable;
	var transferidasTable;
	let is_consulta_info_ot = false;
	let is_consulta_comentarios = false;
	let is_consulta_historico = false;
	$scope.informacionClienteDetalle = {};
	$scope.tipoArbol = '';
	$scope.permisosConfigUser = [];
	$scope.elementosConfigGeneral;
	$scope.nivelIntervenciones;
	$scope.nivelGeografia;
	$scope.nivelEstatusPendientes;
	$scope.nivelIntervencionesBuzon;
	$scope.nivelGeografiaBuzon;
	$scope.nivelEstatusPendientesBuzon;
	$scope.nivelGeografiaHist;
	$scope.nivelEstatusTraspasoFiltro = "";
	$scope.nivelIntervencionTraspasoFiltro = "";
	$scope.filtrosGeneral = {};
	$scope.camposFiltro = {};
	$scope.listEvidenciaImagenes = {};
	$scope.listMotivos = [];
	$scope.infoFactibilidad = {};
	$scope.listImagenesTipo = [];
	$scope.listaOrdenesTransferidas = [];
	$scope.isTraspaso = false;

	$scope.configPermisoAccionConsultaOts = false;
	$scope.configPermisoAccionDescargaOtsRep = false;
	$scope.configPermisoAccionTraspaso = false;
	$scope.configPermisoAccionConsultaTraspasos = false;
	$scope.configPermisoAccionDescargaTraspasosRep = false;
	$scope.configPermisoAccionDescargaHist = false;
	$scope.configPermisoAccionConsultaHist = false;
	$scope.isFactibilidad = false;
	$scope.tempArrayOTS = [];
	$scope.tempArrayTraspasos = [];

	$('.drop-down-filters').on("click.bs.dropdown", function (e) {
		e.stopPropagation();
	});

	$('.drop-down-filters').on("change.bs.dropdown", function (e) {
		$scope.setTextFiltro();
	});

	$('#searchGeografia').on('keyup', function () {
		$("#jstree-proton-3").jstree("search", this.value);
	})

	$('#searchGeografiaTraspaso').on('keyup', function () {
		$("#jstree-proton-tr").jstree("search", this.value);
	})

	$('#searchGeografiaHistorico').on('keyup', function () {
		$("#jstree-proton-ht").jstree("search", this.value);
	})

	$('#horaestimada-form').timepicker({
		format: 'hh:mm:ss a',
		change: function (dateInput) {
			let minutos = dateInput.getMinutes() + ""
			let horas = dateInput.getHours() + ""
			$scope.informacionClienteDetalle.horaEstimada = (horas.padStart(2, '0')) + ':' + (minutos.padStart(2, '0'));
			$scope.$apply()
		}
	})

	$scope.abrirModalCluster = function () {
		$scope.tipoArbol = 'ots';
		$("#jstree-proton-3").jstree("search", '');
		$("#searchGeografia").val('');
		$('#modalCluster').modal('show');
		setTimeout(function () {
			$("#searchGeografia").focus();
		}, 750);
	}

	$scope.abrirModalClusterTraspaso = function () {
		$scope.tipoArbol = 'traspaso';
		$("#jstree-proton-tr").jstree("search", '');
		$("#searchGeografiaTraspaso").val('');
		$('#modalCluster').modal('show');
		setTimeout(function () {
			$("#searchGeografiaTraspaso").focus();
		}, 750);
	}

	$scope.abrirModalClusterHistorico = function () {
		$scope.tipoArbol = 'historico';
		$("#jstree-proton-ht").jstree("search", '');
		$("#searchGeografiaHistorico").val('');
		$('#modalCluster').modal('show');
		setTimeout(function () {
			$("#searchGeografiaHistorico").focus();
		}, 750);
	}

	$(".icon-content-info").on("click", function () {
		if ($(".icon-content-info").hasClass("fa-angle-down")) {
			$(".icon-content-info").removeClass("fa-angle-down");
			$(".icon-content-info").addClass("fa-angle-up");
			$("#content-info-body").css("display", "none");
		} else {
			$(".icon-content-info").removeClass("fa-angle-up");
			$(".icon-content-info").addClass("fa-angle-down");
			$("#content-info-body").css("display", "block");
		}
	})

	$('#modal-detalle-ot').on('hidden.bs.modal', function () {
		is_consulta_info_ot = false;
		is_consulta_comentarios = false;
		is_consulta_historico = false;
		document.querySelector('#informacion-ot').click()

	})

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

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

	$scope.consultaOtsTraspasos = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		$scope.elementosRegistro = 0;

		let estatusOrdenes = []
		estatusOrdenes = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponibles, $scope.nivelEstatusPendientes);

		let subIntTemp = []
		subIntTemp = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nivelIntervenciones);

		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nivelGeografia)
			.map(e => parseInt(e.id))

		if ($.trim(document.getElementById('idot').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuenta').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (estatusOrdenes.length === 0) {
			errorMensaje += '<li>Seleccione estatus.</li>';
			isValido = false
		}

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}

		if (document.getElementById('filtro_fecha_inicio_otsTaspaso').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_otsTaspaso').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha('filtro_fecha_inicio_otsTaspaso', 'filtro_fecha_fin_otsTaspaso')) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}


		if (isValido) {

			let params = {
				idOrden: $.trim(document.getElementById('idot').value),
				folioSistema: $.trim(document.getElementById('idos').value),
				claveCliente: $.trim(document.getElementById('cuenta').value),
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_otsTaspaso').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_otsTaspaso').value),
				elementosPorPagina: 10
			}

			otsTable = $('#otsTable').DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"bDestroy": true,
				"info": true,
				"lengthChange": false,
				"searching": false,
				"pageLength": 10,
				"ajax": {
					"url": "req/consultaTraspasoOt",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if (!swal.isVisible()) {
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}

					},
					"dataSrc": function (json) {
						$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error": function (xhr, error, thrown) {
						handleError(xhr);
					},
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font,
				"drawCallback": function (settings) {
					if (!$scope.configPermisoAccionTraspaso) {
						$(".btn-traspaso").addClass("estiloBlockIconoPermiso");
						$(".btn-traspaso i").removeClass("fa-exchange-alt");
						$(".btn-traspaso i").addClass("fa-unlock");
					}
				}
			});

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}

	$scope.consultaTraspasos = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		$scope.elementosRegistroTraspaso = 0;

		let estatusOrdenes = []
		estatusOrdenes = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponiblesTraspaso, $scope.nivelEstatusPendientes);

		let subIntTemp = []
		subIntTemp = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenesTraspaso, $scope.nivelIntervenciones);

		let clusters = $("#jstree-proton-tr").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nivelGeografiaBuzon)
			.map(e => parseInt(e.id))

		if ($.trim(document.getElementById('idot-tr').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot-tr').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuenta-tr').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta-tr').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (estatusOrdenes.length === 0) {
			errorMensaje += '<li>Seleccione estatus.</li>';
			isValido = false
		}

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}

		if (document.getElementById('filtro_fecha_inicio_traspaso').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_traspaso').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha('filtro_fecha_inicio_traspaso', 'filtro_fecha_fin_traspaso')) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}


		if (isValido) {

			let params = {
				idOrden: $.trim(document.getElementById('idot-tr').value),
				folioSistema: $.trim(document.getElementById('idos-tr').value),
				claveCliente: $.trim(document.getElementById('cuenta-tr').value),
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_traspaso').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_traspaso').value),
				elementosPorPagina: 10
			}

			traspasosTable = $('#traspasosTable').DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"bDestroy": true,
				"paging": true,
				"info": true,
				"lengthChange": false,
				"searching": false,
				"pageLength": 10,
				"ajax": {
					"url": "req/consultaTraspasos",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if (!swal.isVisible()) {
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}

					},
					"dataSrc": function (json) {
						$scope.elementosRegistroTraspaso = json.registrosTotales
						return json.data;
					},
					"error": function (xhr, error, thrown) {
						handleError(xhr);
					},
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null, null,null,null],
				"language": idioma_espanol_not_font
			});

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}

	$scope.consultaHistorico = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		$scope.elementosRegistroHistorico = 0;

		let clusters = $("#jstree-proton-ht").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nivelGeografiaHist)
			.map(e => parseInt(e.id))

		if ($.trim(document.getElementById('idot-ht').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot-ht').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuenta-ht').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta-ht').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}

		if (document.getElementById('filtro_fecha_inicio_historico').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_historico').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha('filtro_fecha_inicio_historico', 'filtro_fecha_fin_historico')) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}

		if (isValido) {
	
			let params = {
				idOrden: $.trim(document.getElementById('idot-ht').value),
				folioSistema: $.trim(document.getElementById('idos-ht').value),
				claveCliente: $.trim(document.getElementById('cuenta-ht').value),
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_historico').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_historico').value),
				elementosPorPagina: 10
			}

			historicoTable = $('#historicoTable').DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"bDestroy": true,
				"info": true,
				"lengthChange": false,
				"searching": false,
				"pageLength": 10,
				"ajax": {
					"url": "req/consultaHistorico",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if (!swal.isVisible()) {
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}

					},
					"dataSrc": function (json) {
						$scope.elementosRegistroHistorico = json.registrosTotales
						return json.data;
					},
					"error": function (xhr, error, thrown) {
						handleError(xhr);
					},
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null, null,null,null],
				"language": idioma_espanol_not_font
			});

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}

	$scope.filtraEstatus = function (listaStatus) {
		let newList = listaStatus;
		let tempList = [];

		if ($scope.nivelEstatusTraspasoFiltro !== "") {
			let statusList = $scope.nivelEstatusTraspasoFiltro.toString().split(",");
			angular.forEach(statusList, (idx, index) => {
				let status = newList.find((t) => Number(t.id) == Number(idx))
				if (status) {
					tempList.push(status);
				}
			});
			newList = tempList;
		}
		return newList;
	}

	$scope.filtraIntervencion = function (listaIntervencion) {
		let newList = listaIntervencion;
		let tempList = [];
		if ($scope.nivelIntervencionTraspasoFiltro !== "") {
			let interList = $scope.nivelIntervencionTraspasoFiltro.toString().split(",");
			angular.forEach(interList, (idx, index) => {
				let status = newList.find((t) => Number(t.id) == Number(idx))
				if (status) {
					tempList.push(status);
				}
			});
			newList = tempList;
		}
		return newList;
	}

	$scope.consultarCatalagosPI = function () {
		$q.all([
			genericService.consultarCatalogoIntervenciones(),
			genericService.consulCatalogoGeografia(),
			genericService.consultarCatalogoEstatusDespachoPI(),
			traspasosService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloTraspasos" }),
			traspasosService.consultarMotivosTraspasos()
		]).then(function (results) {
			if (results[3].data !== undefined) {
				if (results[3].data.respuesta) {
					if (results[3].data.result) {
						$scope.elementosConfigGeneral = new Map(Object.entries(results[3].data.result))

						let resultConf = results[3].data.result
						if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
							let llavesResult = results[3].data.result.MODULO_ACCIONES_USUARIO.llaves;
							if (llavesResult.N_FILTRO_GEOGRAFIA)
								$scope.nivelGeografia = parseInt(llavesResult.N_FILTRO_GEOGRAFIA)

							if (llavesResult.N_FILTRO_INTERVENCIONES)
								$scope.nivelIntervenciones = parseInt(llavesResult.N_FILTRO_INTERVENCIONES)

							if (llavesResult.N_ESTATUS_PENDIENTES)
								$scope.nivelEstatusPendientes = parseInt(llavesResult.N_ESTATUS_PENDIENTES)

							if (llavesResult.N_FILTRO_GEOGRAFIA_BUZON)
								$scope.nivelGeografiaBuzon = parseInt(llavesResult.N_FILTRO_GEOGRAFIA_BUZON)

							if (llavesResult.N_FILTRO_INTERVENCIONES_BUZON)
								$scope.nivelIntervencionesBuzon = parseInt(llavesResult.N_FILTRO_INTERVENCIONES_BUZON)

							if (llavesResult.N_ESTATUS_PENDIENTES_BUZON)
								$scope.nivelEstatusPendientesBuzon = parseInt(llavesResult.N_ESTATUS_PENDIENTES_BUZON)

							if (llavesResult.N_FILTRO_GEOGRAFIA_HIST)
								$scope.nivelGeografiaHist = parseInt(llavesResult.N_FILTRO_GEOGRAFIA_HIST)

							if (llavesResult.N_ESTATUS_TRASPASO_FILTRO)
								$scope.nivelEstatusTraspasoFiltro = parseInt(llavesResult.N_ESTATUS_TRASPASO_FILTRO)

							if (llavesResult.N_INTERVENCION_TRASPASO_FILTRO)
								$scope.nivelIntervencionTraspasoFiltro = parseInt(llavesResult.N_INTERVENCION_TRASPASO_FILTRO)

							$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

							if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
								$scope.configPermisoAccionConsultaOts = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaOTs" })[0] != undefined);
								$scope.configPermisoAccionDescargaOtsRep = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaOTsReporte" })[0] != undefined);
								$scope.configPermisoAccionTraspaso = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionTraspaso" })[0] != undefined);
								$scope.configPermisoAccionConsultaTraspasos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaTraspasos" })[0] != undefined);
								$scope.configPermisoAccionDescargaTraspasosRep = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaTraspasosReporte" })[0] != undefined);
								$scope.configPermisoAccionConsultaHist = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaHistorico" })[0] != undefined);
								$scope.configPermisoAccionDescargaHist = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaHistoricoReporte" })[0] != undefined);
								objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
								objectTempAccion.inicializarBotonAccionesRecientes();
							}
							validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
							validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

							let arrayDefaultKmzElemts = llavesResult.KEY_DEFAULT_KMZ ? llavesResult.KEY_DEFAULT_KMZ.split(",") : null;
							GenericMapa.prototype.callPrototypeMapa(results[3].data.result, arrayDefaultKmzElemts);
							$scope.initializeMap();
		
							if (!$scope.configPermisoAccionConsultaOts 
								&& $scope.configPermisoAccionConsultaTraspasos
								&& !$scope.configPermisoAccionConsultaHist) {
								setTimeout(function () {
									$("#traspasos-tab").click();
								}, 300)
							}

							if (!$scope.configPermisoAccionConsultaOts 
								&& !$scope.configPermisoAccionConsultaTraspasos
								&& $scope.configPermisoAccionConsultaHist) {
								setTimeout(function () {
									$("#historico-tab").click();
								}, 300)
							}
						}

					} else {
						toastr.warning('No se encontraron datos para la configuraci\u00F3n');
					}
				} else {
					toastr.warning(results[3].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de configuraci\u00F3n');
			}
			$("#idBody").removeAttr("style");

			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						let respaldoTipoOrdenArray = [];
						respaldoTipoOrdenArray = angular.copy(results[0].data.result);
						$scope.nivelIntervenciones = $scope.nivelIntervenciones ? $scope.nivelIntervenciones : $scope.obtenerUltimoNivelFiltros(respaldoTipoOrdenArray);
						$scope.nivelIntervencionesBuzon = $scope.nivelIntervencionesBuzon ? $scope.nivelIntervencionesBuzon : $scope.obtenerUltimoNivelFiltros(respaldoTipoOrdenArray);
						$scope.filtrosGeneral.tipoOrdenesTraspaso = $scope.conversionAnidadaRecursiva(respaldoTipoOrdenArray, 1, $scope.nivelIntervencionesBuzon);
						let tipoOrdenesTemp = $scope.conversionAnidadaRecursiva(respaldoTipoOrdenArray, 1, $scope.nivelIntervenciones);
						$scope.filtrosGeneral.tipoOrdenes = $scope.filtraIntervencion(angular.copy(tipoOrdenesTemp));

						$('#filtro-intervencion-tr').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.tipoOrdenesTraspaso, $scope.nivelIntervencionesBuzon));
						$('#filtro-intervencion').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.tipoOrdenes, $scope.nivelIntervenciones));
					} else {
						toastr.warning('No se encontraron  tipo ordenes');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
			}
			if (results[2].data !== undefined) {
				if (results[2].data.respuesta) {
					if (results[2].data.result) {
						let respaldoStatusArray = [];
						respaldoStatusArray = angular.copy(results[2].data.result);
						$scope.nivelEstatusPendientes = $scope.nivelEstatusPendientes ? $scope.nivelEstatusPendientes : $scope.obtenerUltimoNivelFiltros(respaldoStatusArray);
						$scope.nivelEstatusPendientesBuzon = $scope.nivelEstatusPendientesBuzon ? $scope.nivelEstatusPendientesBuzon : $scope.obtenerUltimoNivelFiltros(respaldoStatusArray);
						let estatusDisponiblesTemp = $scope.conversionAnidadaRecursiva(results[2].data.result, 1, $scope.nivelEstatusPendientes);
						$scope.filtrosGeneral.estatusdisponiblesTraspaso = $scope.conversionAnidadaRecursiva(results[2].data.result, 1, $scope.nivelEstatusPendientesBuzon);
						$scope.filtrosGeneral.estatusdisponibles = $scope.filtraEstatus(angular.copy(estatusDisponiblesTemp));
						$('#filtro-estatus-substatus').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.estatusdisponibles, $scope.nivelEstatusPendientes));
						$('#filtro-estatus-substatus-tr').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.estatusdisponiblesTraspaso, $scope.nivelEstatusPendientesBuzon));

					} else {
						toastr.info('No se encontraron catalogo de estatus');
					}
				} else {
					toastr.warning(results[2].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de catalogo de estatus');
			}
			if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						if (results[1].data.result.geografia) {
							$scope.listadogeografiacopy = results[1].data.result.geografia
							let geografiaTemp = results[1].data.result.geografia
							$scope.nivelGeografia = $scope.nivelGeografia ? $scope.nivelGeografia : $scope.obtenerUltimoNivelFiltros(results[1].data.result.geografia);
							$scope.nivelGeografiaBuzon = $scope.nivelGeografiaBuzon ? $scope.nivelGeografiaBuzon : $scope.obtenerUltimoNivelFiltros(results[1].data.result.geografia);
							$scope.nivelGeografiaHist = $scope.nivelGeografiaHist ? $scope.nivelGeografiaHist : $scope.obtenerUltimoNivelFiltros(results[1].data.result.geografia);
							let geografia = angular.copy(geografiaTemp).filter((e) => e.nivel <= $scope.nivelGeografia)
							let geografiaBuzon = angular.copy(geografiaTemp).filter((e) => e.nivel <= $scope.nivelGeografiaBuzon)
							let geografiaHistorico = angular.copy(geografiaTemp).filter((e) => e.nivel <= $scope.nivelGeografiaHist)
							

							if ($scope.configPermisoAccionConsultaOts) {
								geografia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
								geografia.map((e) => {
									e.parent = e.padre == null ? 0 : e.padre;
									e.text = e.nombre;
									e.state = {
										selected: true,
										opened: true
									}
									return e
								})
								$('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
									var geografiasOt = $('#jstree-proton-3').jstree("get_selected", true);
									let textoGeografias = [];
									angular.forEach(geografiasOt, (geografia, index) => {
										textoGeografias.push(geografia.text);
									});
									$('#cluster').val(textoGeografias);
									$scope.consultaOtsTraspasos()
								}).jstree({
									'plugins': ["wholerow", "checkbox", 'search'],
									'search': {
										"case_sensitive": false,
										"show_only_matches": true
									},
									'core': {
										'data': geografia,
										'themes': {
											'name': 'proton',
											'responsive': true,
											'icons': false
										}
									}
								});
							}

							if ($scope.configPermisoAccionConsultaTraspasos) {
								geografiaBuzon.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
								geografiaBuzon.map((e) => {
									e.parent = e.padre == null ? 0 : e.padre;
									e.text = e.nombre;
									e.state = {
										selected: true,
										opened: true
									}
									return e
								})
								$('#jstree-proton-tr').bind('loaded.jstree', function (e, data) {
									var geografiasTas = $('#jstree-proton-tr').jstree("get_selected", true);
									let textoGeografias = [];
									angular.forEach(geografiasTas, (geografia, index) => {
										textoGeografias.push(geografia.text);
									});
									$('#clusterTr').val(textoGeografias);
									$scope.consultaTraspasos()
								}).jstree({
									'plugins': ["wholerow", "checkbox", 'search'],
									'search': {
										"case_sensitive": false,
										"show_only_matches": true
									},
									'core': {
										'data': geografiaBuzon,
										'themes': {
											'name': 'proton',
											'responsive': true,
											'icons': false
										}
									}
								});
							}

							if ($scope.configPermisoAccionConsultaHist) {
								geografiaHistorico.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
								geografiaHistorico.map((e) => {
									e.parent = e.padre == null ? 0 : e.padre;
									e.text = e.nombre;
									e.state = {
										selected: true,
										opened: true
									}
									return e
								})
								$('#jstree-proton-ht').bind('loaded.jstree', function (e, data) {
									var geografiasTas = $('#jstree-proton-ht').jstree("get_selected", true);
									let textoGeografias = [];
									angular.forEach(geografiasTas, (geografia, index) => {
										textoGeografias.push(geografia.text);
									});
									$('#clusterHt').val(textoGeografias);
									$scope.consultaHistorico()
								}).jstree({
									'plugins': ["wholerow", "checkbox", 'search'],
									'search': {
										"case_sensitive": false,
										"show_only_matches": true
									},
									'core': {
										'data': geografiaHistorico,
										'themes': {
											'name': 'proton',
											'responsive': true,
											'icons': false
										}
									}
								});
							}

						} else {
							toastr.warning('No se encontraron datos para la geograf\u00EDa');
						}
					} else {
						toastr.warning('No se encontraron datos para la geograf\u00EDa');
					}
				} else {
					toastr.warning(results[1].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de geograf\u00EDa');
			}

			if (results[4].data !== undefined) {
				if (results[4].data.respuesta) {
					if (results[4].data.result) {
						$scope.listMotivos = results[4].data.result.motivosTransferencia;
					} else {
						mostrarMensajeWarningValidacion('No se encontr&oacute; motivos');
					}
				} else {
					mostrarMensajeWarningValidacion(results[4].data.resultDescripcion);
				}
			} else {
				mostrarMensajeErrorAlert('Ha ocurrido un error al consultar los motivos');
			}





		}).catch(err => handleError(err));
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

	$scope.iniciarTraspasos = function () {

		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: false
		});

		$('.datepicker').datepicker('update', new Date());

		otsTable = $('#otsTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"ordering": false,
			"pageLength": 10,
			"info": true,
			"searching": false,
			"scrollX": false,
			"autoWidth": false,
			"language": idioma_espanol_not_font
		});

		traspasosTable = $('#traspasosTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"ordering": false,
			"pageLength": 10,
			"info": true,
			"searching": false,
			"scrollX": false,
			"autoWidth": false,
			"language": idioma_espanol_not_font
		});

		historicoTable = $('#historicoTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"ordering": false,
			"pageLength": 10,
			"info": true,
			"searching": false,
			"scrollX": false,
			"autoWidth": false,
			"language": idioma_espanol_not_font
		});

		transferidasTable = $('#transferidasTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"ordering": false,
			"pageLength": 5,
			"info": true,
			"searching": false,
			"scrollX": false,
			"autoWidth": false,
			"language": idioma_espanol_not_font
		});


		$scope.consultarCatalagosPI();
	}

	$scope.iniciarTraspasos();

	consultaImagenesOTsTraspasos = function (ot, cuenta) {
		let params = {
			orden: ot,
		}
		$('.idoti').text(ot);
		$('.cuenta').text(cuenta);
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$scope.listEvidenciaImagenes = {};
		traspasosService.consultaImagenesTraspaso(JSON.stringify(params)).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.evidencias) {
							$scope.listEvidenciaImagenes.imagenes = response.data.result.evidencias;
							$scope.listEvidenciaImagenes.tipos = [];
							$scope.listImagenesTipo = response.data.result.evidencias;
							let listaTipos = [];

							var count_cantidad_por_tipo = groupBy(response.data.result.evidencias, 'idCatEvidencia');
							response.data.result.evidencias.map(function (e) {
								let isExist = listaTipos.find((t) => e.idCatEvidencia == t.id);
								if (!isExist) {
									let imagenes = [];
									if (count_cantidad_por_tipo[e.idCatEvidencia].length) {
										imagenes = count_cantidad_por_tipo[e.idCatEvidencia]
									}
									listaTipos.push(
										{
											id: e.idCatEvidencia,
											descripcion: e.tipoEvidencia,
											imagenes: imagenes
										}
									)
								}
							});
							$scope.listEvidenciaImagenes.tipos = listaTipos;
							is_consultar_evidencia = true;
							$('#modal-imagen-ot').modal('show');
							setTimeout(function () {
								$("#categoria_img_0").click();
								$("#categoria_img_0").addClass("tipo-evidencia-selected");
							}, 100);
							swal.close();
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.result.resultDescription)
						}
					} else {
						swal.close();
						mostrarMensajeInformativo("No se encontraron evidencias")
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			} else {
				swal.close();
				mostrarMensajeErrorAlert("Error del servidor");
			}
		}).catch(err => handleError(err));

	}

	$scope.getEvidenciasImagenes = function (tipo) {
		$scope.listImagenesTipo = [];
		if (tipo.toString() === '0') {
			$scope.listImagenesTipo = $scope.listEvidenciaImagenes.imagenes;
		} else {
			$scope.listEvidenciaImagenes.tipos.map(function (e) {
				if (e.id.toString() === tipo.toString()) {
					$scope.listImagenesTipo = e.imagenes;
					return false;
				}
			});
		}
		$(".tipo_evidencia").removeClass("tipo-evidencia-selected");
		$("#categoria_img_" + tipo).addClass("tipo-evidencia-selected");
	}

	$(document.body).on("click", ".btn_categoria_img", function () {
		var id_categoria = $.trim($(this).attr('attr_id_cat'));

		if (id_categoria === '') {
			$(".magnific.item").show();
			$('.imagen_content:hidden').show(400);
			setTimeout(function () { mostarImagenesCategoria(); }, 500);

		} else {
			if ($(".imagen_content:visible").length > 0) {
				$(".imagen_content:visible").hide(150, "linear", function () {

					$(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
					$(".magnific.item.imgtipo_" + id_categoria + "").show();

					$('.content_img_' + id_categoria).show(200);
					//Manda function magnific popup
					mostarImagenesCategoria();
				});
			} else {
				$(".magnific.item:not(.imgtipo_" + id_categoria + ")").hide();
				$(".magnific.item.imgtipo_" + id_categoria + "").show();

				$('.content_img_' + id_categoria).show(200);
				//Manda function magnific popup
				mostarImagenesCategoria();
			}

		}

	});

	let groupBy = function (xs, key) {
		return xs.reduce(function (rv, x) {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	};

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

	$scope.limpiarFactibilidad = function () {
		$scope.isFactibilidad = false;
		$("#search-input-place").val("");
		$scope.informacionClienteDetalle.idTurnoSeleccion = null;
		$scope.informacionClienteDetalle.turno = "";
		$("#horaestimada-form").val(undefined);
		if ($scope.informacionClienteDetalle.factibilidad) {
			$scope.informacionClienteDetalle.factibilidad = null;
		}
	}


	consultaTraspaso = function (id) {
		if ($scope.configPermisoAccionTraspaso) {
			$scope.informacionClienteDetalle = {};
			$scope.infoFactibilidad = {};
			$("#info-factibilidad").css("display", "none");
			$("#search-input-place").val('');
			$scope.isFactibilidad = false;
			$("#wizzard-1").click();
			$scope.datoOt = id;
			$scope.consultarTransferidasOt(id);

		}

	}

	consultaDetalleOtGeneric = function (id, flujo) {
		$scope.datoOt = id;
		let params = {
			id_ot: id
		}
		swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		traspasosService.consultaInfoDetalleTraspaso(JSON.stringify(params)).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result.orden) {
						$scope.infoOtDetalle = response.data.result.orden;
						is_consulta_info_ot = true;
						$scope.permisosModal = $scope.elementosConfigGeneral.get("MODAL_CO_FLUJO_" + flujo).split(",")
						$('#modal-detalle-ot').modal('show');
						swal.close();
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.result.mensaje)
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			} else {
				swal.close();
				mostrarMensajeErrorAlert("Error del servidor");
			}
		}).catch(err => handleError(err));
	}

	$scope.consultaDetalleTraspasoGen = function (id) {
		let params = {
			id_ot: id
		}

		if (!swal.isVisible()) {
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
		}
	
		traspasosService.consultaInfoDetalleTraspaso(JSON.stringify(params)).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result.orden) {
						$scope.informacionClienteDetalle = response.data.result.orden;
						$scope.latitudSelectedMap = response.data.result.orden.latitud;
						$scope.longitudSelectedMap = response.data.result.orden.longitud;
						$scope.abrirOpcionUbicacion();
						//$("#search-input-place").val($scope.latitudSelectedMap + ',' +$scope.longitudSelectedMap);
						$scope.isTraspaso = true;
						swal.close();
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.result.mensaje)
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
				}
			} else {
				swal.close();
				mostrarMensajeErrorAlert("Error del servidor");
			}
		}).catch(err => handleError(err));
	}


	$scope.consultaHistoricoOt = function () {
		if (!is_consulta_historico) {
			let params = {
				idOt: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();


			genericService.consultarHistoricoDespachoOT(params).then(function (result) {
				if (result.data !== undefined) {
					if (result.data.respuesta) {
						if (result.data.result !== undefined) {
							jsonm = result.data;
							if (result.data.result.detalle != undefined && result.data.result.detalle.length > 0) {
								$scope.movimientos = result.data.result.detalle//.reverse()
								is_consulta_historico = true;
								swal.close();
							} else {
								swal.close();
								mostrarMensajeErrorAlert(response.data.result.resultDescription)
							}
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.result.resultDescription)
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert("Error del servidor");
				}
			}).catch(err => handleError(err));
		}
	}

	$scope.consultaChat = function () {
		if (!is_consulta_comentarios) {
			let params = {
				idOt: $scope.datoOt
			}

			if (!swal.isVisible()) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
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
								is_consulta_comentarios = true;
								swal.close();
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
			}).catch(err => handleError(err));
		}
	}

	$scope.addComentariosConsultaOt = function () {
		if (document.getElementById('comentarioConsultaOt').value.trim() !== '' && !/^\s/.test(document.getElementById('comentarioConsultaOt').value)) {

			let params = {
				idOrden: $scope.datoOt,
				comentario: $scope.comentarioConsultaOT,
				origenSistema: 1
			}

			swal({ text: 'Espere un momento ...', allowOutsideClick: false });
			swal.showLoading();

			genericService.agregarComentariosOt(params).then(function success(response) {
				swal.close();
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						$scope.comentarioConsultaOT = '';
						document.getElementById('comentarioConsultaOt').value = '';
						is_consulta_comentarios = false;
						$(".chat-area").scrollTop(0);
						$scope.consultaChat();
					} else {
						toastr.error(response.data.resultDescripcion);
					}
				} else {
					toastr.error(response.data.resultDescripcion);
				}
			}).catch(err => handleError(err))

		} else {
			$scope.comentarioConsultaOT = '';
			document.getElementById('comentarioConsultaOt').value = '';
			toastr.warning('Intoducir un comentario.');
		}
	}
	//Filtros


	$scope.setTextFiltro = function () {
		$('#filtro-intervencion').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.tipoOrdenes, $scope.nivelIntervenciones));
		$('#filtro-intervencion-tr').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.tipoOrdenesTraspaso, $scope.nivelIntervenciones));
		$('#filtro-estatus-substatus').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.estatusdisponibles, $scope.nivelEstatusPendientes));
		$('#filtro-estatus-substatus-tr').val($scope.listaSeleccionSelectGral($scope.filtrosGeneral.estatusdisponiblesTraspaso, $scope.nivelEstatusPendientes));
	}

	$scope.seleccionarTodosRecursivo = function (array, isBtn) {
		array.map(function (e) {
			e.checkedOpcion = true;
			if (e.children !== undefined && e.children.length > 0) {
				$scope.seleccionarTodosRecursivo(e.children);
			}
		});
		if (!isBtn) {
			$scope.setTextFiltro();
		}
	}

	$scope.deseleccionarTodosRecursivo = function (array, isBtn) {
		array.map(function (e) {
			e.checkedOpcion = false;
			if (e.children !== undefined && e.children.length > 0) {
				$scope.deseleccionarTodosRecursivo(e.children);
			}
		});
		if (!isBtn) {
			$scope.setTextFiltro();
		}
	}

	$scope.setCheckFiltroGenericV2 = function (filtro, principalArray) {
		if (filtro.children !== undefined && filtro.children.length > 0) {
			if (filtro.checkedOpcion) {
				$scope.deseleccionarTodosRecursivo(filtro.children, true);
			} else {
				$scope.seleccionarTodosRecursivo(filtro.children, true);
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

	$scope.limpiarCamposFiltro = function (opcion) {
		switch (opcion) {
			case 1:
				$scope.camposFiltro.idos = "";
				$scope.camposFiltro.cuenta = "";
				break;
			case 2:
				$scope.camposFiltro.idot = "";
				$scope.camposFiltro.cuenta = "";
				break;
			case 3:
				$scope.camposFiltro.idot = "";
				$scope.camposFiltro.idos = "";
				break;
			default:
				break;
		}
	}

	$scope.limpiarCamposFiltroTraspaso = function (opcion) {
		switch (opcion) {
			case 1:
				$scope.camposFiltroTraspaso.idos = "";
				$scope.camposFiltroTraspaso.cuenta = "";
				break;
			case 2:
				$scope.camposFiltroTraspaso.idot = "";
				$scope.camposFiltroTraspaso.cuenta = "";
				break;
			case 3:
				$scope.camposFiltroTraspaso.idot = "";
				$scope.camposFiltroTraspaso.idos = "";
				break;
			default:
				break;
		}
	}

	$scope.limpiarCamposFiltroHistorico = function (opcion) {
		switch (opcion) {
			case 1:
				$scope.camposFiltroHistorico.idos = "";
				$scope.camposFiltroHistorico.cuenta = "";
				break;
			case 2:
				$scope.camposFiltroHistorico.idot = "";
				$scope.camposFiltroHistorico.cuenta = "";
				break;
			case 3:
				$scope.camposFiltroHistorico.idot = "";
				$scope.camposFiltroHistorico.idos = "";
				break;
			default:
				break;
		}
	}

	$scope.descargarReporteOts = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;

		let estatusOrdenes = []
		estatusOrdenes = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponibles, $scope.nivelEstatusPendientes);

		let subIntTemp = []
		subIntTemp = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nivelIntervenciones);

		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nivelGeografia)
			.map(e => parseInt(e.id))

		if ($.trim(document.getElementById('idot').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuenta').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (estatusOrdenes.length === 0) {
			errorMensaje += '<li>Seleccione estatus.</li>';
			isValido = false
		}

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}

		if (document.getElementById('filtro_fecha_inicio_otsTaspaso').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_otsTaspaso').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha('filtro_fecha_inicio_otsTaspaso', 'filtro_fecha_fin_otsTaspaso')) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}


		if (isValido) {
			let params = {
				idOrden: $.trim(document.getElementById('idot').value),
				folioSistema: $.trim(document.getElementById('idos').value),
				claveCliente: $.trim(document.getElementById('cuenta').value),
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_otsTaspaso').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_otsTaspaso').value),
				elementosPorPagina: $scope.elementosRegistro,
				pagina: 1,
				tipoExcel: 'traspasos-consultarots-pi',
				headers: ["OT", "CLIENTE", "CUENTA", "CIUDAD", "FECHA AGENDA", "TIPO", "SUBTIPO",
					"ESTATUS", "ESTADO", "MOTIVO"],
				valores: ["idOrden", "nombreCliente", "claveCliente", "ciudad", "fechaAgenda", "descTipo", "descSubTipo",
					"descripcionEstatus", "descripcionEstado", "descripcionMotivo"],
				sheet: "Reporte Consulta OT"
			}
			swal({ text: 'Cargando registros...', allowOutsideClick: false });
			swal.showLoading();
			let tituloAccion = "Descarga reporte ordenes de trabajo";
			let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';


			genericService.enviarParamsReporte(params).then(function success(response) {
				// console.log(response);
				if (response.data.respuesta) {
					var link = document.createElement("a");
					link.href = contex_project + '/req/exporteExcelGenericRequest/reporteOtsTraspaso.xls';
					link.click();
					swal.close();

					mensajeEnvio = 'Se ha descargado el reporte';
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
				} else {
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
					mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
				}
				swal.close();
			});

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}

	$scope.descargarReporteTraspasos = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;

		let estatusOrdenes = []
		estatusOrdenes = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponiblesTraspaso, $scope.nivelEstatusPendientes);

		let subIntTemp = []
		subIntTemp = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenesTraspaso, $scope.nivelIntervenciones);

		let clusters = $("#jstree-proton-tr").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nivelGeografiaBuzon)
			.map(e => parseInt(e.id))

		if ($.trim(document.getElementById('idot-tr').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot-tr').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuenta-tr').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta-tr').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (estatusOrdenes.length === 0) {
			errorMensaje += '<li>Seleccione estatus.</li>';
			isValido = false
		}

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}

		if (document.getElementById('filtro_fecha_inicio_traspaso').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_traspaso').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha('filtro_fecha_inicio_traspaso', 'filtro_fecha_fin_traspaso')) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}


		if (isValido) {

			let params = {
				idOrden: $.trim(document.getElementById('idot-tr').value),
				folioSistema: $.trim(document.getElementById('idos-tr').value),
				claveCliente: $.trim(document.getElementById('cuenta-tr').value),
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_traspaso').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_traspaso').value),
				elementosPorPagina: $scope.elementosRegistroTraspaso,
				pagina: 1,
				tipoExcel: 'traspasos-consultartraspasos-pi',
				headers: ["OT", "OT ORIGINAL", "OS", "CLIENTE", "CUENTA", "GEOGRAFIA", "FECHA AGENDA", "TIPO", "SUBTIPO",
					"MOTIVO", "MOTIVO TRANSFERENCIA", "ESTATUS", "ESTADO"],
				valores: ["idOrdenNueva", "idOrdenOriginal","folioSistema", "nombreCliente", "claveCliente", "geografia", "fechaAgenda", "descTipo", "descSubTipo",
					"descripcionMotivo", "motivoTransferencia", "descripcionEstatus", "descripcionEstado"],
				sheet: "Reporte Traspasos OT"
			}
			swal({ text: 'Cargando registros...', allowOutsideClick: false });
			swal.showLoading();
			let tituloAccion = "Descarga reporte traspasos";
			let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';
			genericService.enviarParamsReporte(params).then(function success(response) {
				 console.log(response);
				if (response.data.respuesta) {
					var link = document.createElement("a");
					link.href = contex_project + '/req/exporteExcelGenericRequest/reporteOtBuzon.xls';
					link.click();
					swal.close();

					mensajeEnvio = 'Se ha descargado el reporte';
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
				} else {
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
					mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
				}
				swal.close();
			});

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}

	$scope.descargarReporteHistorico = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;

		let clusters = $("#jstree-proton-ht").jstree("get_selected", true)
			.filter(e => e.original.nivel == $scope.nivelGeografiaHist)
			.map(e => parseInt(e.id))

		if ($.trim(document.getElementById('idot-ht').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot-ht').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuenta-ht').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta-ht').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}

		if (document.getElementById('filtro_fecha_inicio_historico').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_historico').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha('filtro_fecha_inicio_historico', 'filtro_fecha_fin_historico')) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}


		if (isValido) {

			let params = {
				idOrden: $.trim(document.getElementById('idot-ht').value),
				folioSistema: $.trim(document.getElementById('idos-ht').value),
				claveCliente: $.trim(document.getElementById('cuenta-ht').value),
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_historico').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_historico').value),
				elementosPorPagina: $scope.elementosRegistroHistorico,
				pagina: 1,
				tipoExcel: 'traspasos-consultarhistorico-pi',
				headers: ["OT", "OT ORIGINAL", "OS", "CLIENTE", "CUENTA", "GEOGRAFIA", "FECHA AGENDA", "TIPO", "SUBTIPO",
					"MOTIVO", "MOTIVO TRANSFERENCIA", "ESTATUS", "ESTADO"],
				valores: ["idOrdenNueva", "idOrdenOriginal","folioSistema", "nombreCliente", "claveCliente", "geografia", "fechaAgenda", "descTipo", "descSubTipo",
					"descripcionMotivo", "motivoTransferencia", "descripcionEstatus", "descripcionEstado"],
				sheet: "Reporte Buzon OT"
			}
			swal({ text: 'Cargando registros...', allowOutsideClick: false });
			swal.showLoading();
			let tituloAccion = "Descarga reporte historico";
			let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';
			genericService.enviarParamsReporte(params).then(function success(response) {
				// console.log(response);
				if (response.data.respuesta) {
					var link = document.createElement("a");
					link.href = contex_project + '/req/exporteExcelGenericRequest/reporteOtHistorico.xls';
					link.click();
					swal.close();

					mensajeEnvio = 'Se ha descargado el reporte';
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
				} else {
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
					mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
				}
				swal.close();
			});

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}


	$scope.agendarOt = function () {
		let data = $scope.listMotivos.find((e) => Number(e.id) == Number($scope.informacionClienteDetalle.motivo))

		let params = {
			idunidadNegocio: data.idUnidadNegocioNuevo,
			idPropietario: data.idPropietarioNuevo,
			geografia1: data.idUnidadNegocioNuevo === '1' ? $scope.informacionClienteDetalle.factibilidad.distrito : $scope.informacionClienteDetalle.factibilidad.ciudad,
			geografia2: data.idUnidadNegocioNuevo === '1' ? $scope.informacionClienteDetalle.factibilidad.cluster : $scope.informacionClienteDetalle.factibilidad.distrito,
			idOrden: $scope.informacionClienteDetalle.idOrden,
			idMotivoTransferencia: data.id,
			agendamiento: {
				fechaAgenda: $scope.informacionClienteDetalle.fechaTurnoText,
				idTurno: $scope.informacionClienteDetalle.idTurnoSeleccion,
				hora: $("#horaestimada-form").val().split(' ')[0],
				origen: "1",
				comentarios: $scope.informacionClienteDetalle.comentario
			},
			direccion: {
				latitud: $scope.informacionClienteDetalle.latitud,
				longitud: $scope.informacionClienteDetalle.longitud
			}
		}
		swal({ text: 'Espere...', allowOutsideClick: false });
		swal.showLoading();
		let tituloAccion = "Agendar traspaso de OT";
		let mensajeEnvio = 'Ha ocurrido un error al traspasar la OT: ' + params.idOrden;
		traspasosService.agendarTraspasosOt(params).then(function success(response) {
			swal.close();
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						$scope.isTraspaso = false;
						if (response.data.result.description) {
							mensajeEnvio = response.data.result.description ? response.data.result.description : 'Se ha traspasado la OT: ' + params.idOrden;
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
							toastr.success('Traspaso de orden exitoso: "' + response.data.result.description + '"');
						} else {
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
							toastr.success('Traspaso de orden exitoso');
						}
					} else {
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						mostrarMensajeWarningValidacion('No se traspas&oacute; la orden');
					}
				} else {
					mostrarMensajeWarningValidacion(response.data.resultDescripcion);
				}
			} else {
				mostrarMensajeErrorAlert('Ha ocurrido un error al traspasar la orden');
			}

		}).catch(err => handleError(err));

	}


	//WIZARD

	$scope.validarLatitudLongitudMap = function () {
		let isErrorValidate = false;
		if (!$scope.latitudSelectedMap || !$scope.longitudSelectedMap) {
			isErrorValidate = true
		} else {
			if (!$scope.isLatitude($scope.latitudSelectedMap) || !$scope.isLongitude($scope.longitudSelectedMap)) {
				isErrorValidate = true
			} else if ($scope.validateLatitudLongitudCaracteres($scope.longitudSelectedMap) || $scope.validateLatitudLongitudCaracteres($scope.longitudSelectedMap)) {
				isErrorValidate = true
			} else if (isNaN($scope.latitudSelectedMap) || isNaN($scope.longitudSelectedMap)) {
				isErrorValidate = true
			}
		}
		return isErrorValidate
	}

	$scope.actualizaFactibilidadActual = function () {
		$scope.actualizarFactibilidad();
	}

	$scope.consultarFactibilidad = function (isActualiza, latitud, longitud) {
		let unidadNegocio = $scope.listMotivos.find((e) => Number(e.id) == Number($scope.informacionClienteDetalle.motivo))
		let params = {
			latitud: latitud,
			longitud: longitud,
			factibilidad: unidadNegocio.factibilidad,
		}
		$scope.infoFactibilidad.factibilidad = '0';

		$scope.informacionClienteDetalle.subtipoOrdenes = unidadNegocio.nombreTipo + '/' + unidadNegocio.nombreSubtipo;
		$scope.informacionClienteDetalle.subtipoText = unidadNegocio.nombreSubtipo;
		$scope.informacionClienteDetalle.tipoText = unidadNegocio.nombreTipo;

		swal({ text: 'Espere...', allowOutsideClick: false });
		swal.showLoading();
		traspasosService.consultaFactibilidad(params).then(function success(response) {
			swal.close();
			$("#info-factibilidad").css("display", "block");
			$("#content-info-actual").css("display", "block");
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						let data = {};
						if (Number(unidadNegocio.idUnidadNegocioNuevo) == 2) {
							data = {
								factibilidad: response.data.result.factibilidad,
								region: response.data.result.regionEnlace,
								ciudad: response.data.result.ciudadEnlace,
								distrito: response.data.result.distritoEnlace,
								cluster: response.data.result.clusterTotalplay
							}
						} else {
							data = {
								factibilidad: response.data.result.factibilidad,
								region: response.data.result.regionTotalplay,
								ciudad: response.data.result.ciudadTotalplay,
								distrito: response.data.result.distritoTotalplay,
								cluster: response.data.result.clusterTotalplay
							}
						}

						$scope.infoFactibilidad = data;
						if (!$scope.informacionClienteDetalle.factibilidad) {
							$scope.informacionClienteDetalle.factibilidad = data
						}

						if (isActualiza) {
							if (Number(response.data.result.factibilidad) === 0) {
								mostrarMensajeWarningValidacion('Sin factibilidad en esta ubicaci&oacute;n');
							}
						}
					} else {
						mostrarMensajeWarningValidacion('No se encontr&oacute; factibilidad');
					}
				} else {
					mostrarMensajeWarningValidacion(response.data.resultDescripcion);
				}
			} else {
				mostrarMensajeErrorAlert('Ha ocurrido un error al consultar la factibilidad');
			}
		});

	}


	$scope.actualizarFactibilidad = function () {

		swal({
			title: "\u00BFDesea actualizar la factibilidad?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: '#007bff',
			confirmButtonText: 'Si',
			cancelButtonText: 'No',
			html:
				'<div style="text-align: left;" class="info_ot_detail  ">' +
				'	<div class="col-md-10 offset-md-2">' +
				'		<b class="title_span_detalle"> Regi&oacute;n:</b> &nbsp; &nbsp;' +
				'		<span class="ciudad-detalle-cuenta">' + $scope.infoFactibilidad.region + '</span>' +
				'	</div>' +
				'	<div class="col-md-10 offset-md-2">' +
				'		<b class="title_span_detalle"> Ciudad:</b> &nbsp; &nbsp;' +
				'		<span class="ciudad-detalle-cuenta">' + $scope.infoFactibilidad.ciudad + ' </span>' +
				'	</div>' +
				'	<div class="col-md-10 offset-md-2">' +
				'		<b class="title_span_detalle"> Distrito:</b> &nbsp; &nbsp;' +
				'		<span class="ciudad-detalle-cuenta">' + $scope.infoFactibilidad.distrito + ' </span>' +
				'	</div>' +
				'	<div class="col-md-10 offset-md-2">' +
				'		<b class="title_span_detalle"> Cl&uacute;ster:</b> &nbsp; &nbsp;' +
				'		<span class="ciudad-detalle-cuenta">' + $scope.infoFactibilidad.cluster + ' </span>' +
				'	</div>' +
				'</div>',
		}).then(function (isConfirm) {
			if (isConfirm) {
				$scope.isFactibilidad = true;
				toastr.success("Ubicaci&oacute;n actualizada");
				$scope.latitudSelectedMap = $scope.latitudSelectedMapTemp ? $scope.latitudSelectedMapTemp : $scope.latitudSelectedMap;
				$scope.longitudSelectedMap = $scope.longitudSelectedMapTemp ? $scope.longitudSelectedMapTemp : $scope.longitudSelectedMap;
				$scope.informacionClienteDetalle.geografiaDetalle = $scope.infoFactibilidad.ciudad + '/' + $scope.infoFactibilidad.distrito;
				$scope.informacionClienteDetalle.factibilidad = $scope.infoFactibilidad;
				$scope.$apply();
			}
		}).catch(err => {

		});

	}

	$scope.consultarDisponibilidad = function () {
		swal({ text: 'Espera un momento ...', allowOutsideClick: false });
		swal.showLoading();
		let data = $scope.listMotivos.find((e) => Number(e.id) == Number($scope.informacionClienteDetalle.motivo))


		let params = {
			unidadNegocio: data.idUnidadNegocioNuevo,
			propietario: data.idPropietarioNuevo,
			subtipoIntervencion: data.idSubtipoOT,
			geografia1: data.idUnidadNegocioNuevo === '1' ? $scope.informacionClienteDetalle.factibilidad.distrito : $scope.informacionClienteDetalle.factibilidad.ciudad,
			geografia2: data.idUnidadNegocioNuevo === '1' ? $scope.informacionClienteDetalle.factibilidad.cluster : $scope.informacionClienteDetalle.factibilidad.distrito
		}

		traspasosService.getDisponibilidadServicioRest(params).then(function success(response) {
			swal.close();
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result) {
						$scope.muestraDisponibilidadCalendar(response.data.result);
					} else {
						$scope.muestraDisponibilidadCalendar();
						mostrarMensajeWarningValidacion('No se encontr&oacute; disponibilidad');
					}
				} else {
					$scope.muestraDisponibilidadCalendar();
					mostrarMensajeWarningValidacion(response.data.resultDescripcion);
				}
			} else {
				$scope.muestraDisponibilidadCalendar();
				mostrarMensajeErrorAlert('Ha ocurrido un error al consultar la disponibilidad');
			}

		}).catch(err => handleError(err));
	}

	$scope.consultarTransferidasOt = function (id) {
		$scope.listaOrdenesTransferidas = [];
		swal({ text: 'Espera un momento ...', allowOutsideClick: false });
		swal.showLoading();

		let params = {
			idOrden: id
		}

		traspasosService.consultarTransferidasOt(params).then(function success(response) {
			swal.close();
			let arraRow = [];
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result && response.data.result.transferencias.length) {
						$scope.listaOrdenesTransferidas = response.data.result.transferencias;
						$.each(response.data.result.transferencias, function (i, elemento) {
				
							let row = [];
							row[0] = elemento.folioSistema ? elemento.folioSistema : 'Sin informaci&oacute;n';
							row[1] = elemento.claveCliente ? elemento.claveCliente : 'Sin informaci&oacute;n';
							row[2] = elemento.nombreUsuario ? elemento.nombreUsuario : 'Sin informaci&oacute;n';
							row[3] = elemento.fechaAgenda ? elemento.fechaAgenda : 'Sin informaci&oacute;n';
							row[4] = elemento.descripcionTipo ? elemento.descripcionTipo : 'Sin informaci&oacute;n';
							row[5] = elemento.descripcionSubtipo ? elemento.descripcionSubtipo : 'Sin informaci&oacute;n';
							row[6] = elemento.estado ? elemento.estado : 'Sin informaci&oacute;n';
							row[7] = elemento.estatus ? elemento.estatus : 'Sin informaci&oacute;n';
							row[8] = elemento.geografia ? elemento.geografia : 'Sin informaci&oacute;n';
							row[9] = elemento.motivo ? elemento.motivo : 'Sin informaci&oacute;n';
							
							arraRow.push(row);
						})
						transferidasTable = $('#transferidasTable').DataTable({
							"paging": true,
							"lengthChange": false,
							"ordering": true,
							"pageLength": 5,
							"info": true,
							"bDestroy": true,
							"scrollX": false,
							"data": arraRow,
							"autoWidth": false,
							"language": idioma_espanol_not_font,
						});
						$("#modal-valida-ot").modal('show');

					}else{
						$scope.consultaDetalleTraspasoGen(id);
					}
				} else {
					mostrarMensajeWarningValidacion(response.data.resultDescripcion);
				}
			} else {
				mostrarMensajeErrorAlert('Ha ocurrido un error al consultar las ots tranferidas de la OT:' + id);
			}

		}).catch(err => handleError(err));
	}

	angular.element(document).ready(function () {
		$scope.elementTab = 1;
		$("#wizzard-1").addClass("current");

		$scope.mostrarTab = function (element) {
			let textMessage = "";

			if (element === 2) {
				if (!$scope.informacionClienteDetalle.motivo) {
					textMessage += "<li>Selecciona un motivo</li>";
				}
				if (!$scope.informacionClienteDetalle.comentario) {
					textMessage += "<li>Ingresa comentario</li>";
				}
			}

			if (element === 3 || element === 4) {
				if (!$scope.informacionClienteDetalle.motivo) {
					textMessage += "<li>Selecciona un motivo</li>";
				}
				if (!$scope.informacionClienteDetalle.comentario) {
					textMessage += "<li>Ingresa comentario</li>";
				}
				if (!$scope.isFactibilidad && element !== 2) {
					textMessage += "<li>Actualiza factibilidad</li>";
				}
			}

			if (element === 4) {
				if (!$scope.informacionClienteDetalle.idTurnoSeleccion || $("#horaestimada-form").val() === undefined || $("#horaestimada-form").val() === "") {
					textMessage += "<li>Selecciona disponibilidad</li>";
				}
			}

			if (textMessage !== "") {
				mostrarMensajeWarningValidacion(textMessage);
				return false;
			} else {
				$scope.elementTab = element;
				$("#wizzard-1").removeClass("current");
				$("#wizzard-2").removeClass("current");
				$("#wizzard-3").removeClass("current");
				$("#wizzard-4").removeClass("current");

				$("#wizzard-" + element).addClass("current");
				if (element === 3) {
					$scope.consultarDisponibilidad();
				}
				if (element === 2 && (!$scope.infoFactibilidad.factibilidad || $scope.informacionClienteDetalle.factibilidad === null)) {
					$scope.consultarFactibilidad(false, $scope.latitudSelectedMap, $scope.longitudSelectedMap);
				}
			}
		}

		$("#modalCluster").on("hidden.bs.modal", function () {
			var geografias = $('#jstree-proton-3').jstree("get_selected", true);
			let textoGeografias = [];
			angular.forEach(geografias, (geografia, index) => {
				textoGeografias.push(geografia.text);
			});
			$('#cluster').val(textoGeografias);

			var geografiasTr = $('#jstree-proton-tr').jstree("get_selected", true);
			let textoGeografiasTr = [];
			angular.forEach(geografiasTr, (geografia, index) => {
				textoGeografiasTr.push(geografia.text);
			});
			$('#clusterTr').val(textoGeografiasTr);

			var geografiasHt = $('#jstree-proton-ht').jstree("get_selected", true);
			let textoGeografiasHt = [];
			angular.forEach(geografiasHt, (geografia, index) => {
				textoGeografiasHt.push(geografia.text);
			});
			$('#clusterHt').val(textoGeografiasHt);
		})

		$("#moduloTraspasos").addClass('active');
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

	});

	$(document.body).on("click", ".orderColumnTable", function () {
		let colOrder = $(this).attr('data-idColumn');
		let isNumber = $(this).attr('data-isNumber');
		let typeTable = $(this).attr('data-typeTable');
		if ($(this).hasClass('orderColumnAscTable')) {
			$scope.orderTableByColumnGeneric(colOrder, typeTable, true, isNumber);
			$(this).removeClass('orderColumnAscTable');
			$(this).addClass('orderColumnDescTable');
		} else {
			$scope.orderTableByColumnGeneric(colOrder, typeTable, false, isNumber);
			$(this).addClass('orderColumnAscTable');
			$(this).removeClass('orderColumnDescTable');
		}
	});

	$scope.orderTableByColumnGeneric = function (colNumber, typeTable, isAsc, isNumber) {
		let arraySort = [];
		if (typeTable == 'otTable') {
			arraySort = angular.copy($scope.tempArrayOTS);
		} else if (typeTable == 'traspasoTable') {
			arraySort = angular.copy($scope.tempArrayTraspasos);
		}

		if (isNumber === 'true') {
			arraySort.sort(function (a, b) {
				if (a[colNumber] == '' || a[colNumber] == undefined) {
					a[colNumber] = 0;
				}
				if (b[colNumber] == '' || b[colNumber] == undefined) {
					b[colNumber] = 0;
				}
				if (isAsc) {
					return (Number(a[colNumber]) > Number(b[colNumber])) ? 1 : (Number((a[colNumber]) < Number(b[colNumber])) ? -1 : 0);
				} else {
					return (Number(b[colNumber]) > Number(a[colNumber])) ? 1 : (Number((b[colNumber]) < Number(a[colNumber])) ? -1 : 0);
				}
			});
		} else {
			arraySort.sort(function (a, b) {
				if (a[colNumber] == '' || a[colNumber] == undefined || a[colNumber] == null) {
					a[colNumber] = 'Sin Informaci&oacute;n'
				}
				if (b[colNumber] == '' || b[colNumber] == undefined || b[colNumber] == null) {
					b[colNumber] = 'Sin Informaci&oacute;n'
				}
				if (isAsc) {
					return (a[colNumber].replace(/ /g, '').toLowerCase() > b[colNumber].replace(/ /g, '').toLowerCase()) ? 1 : ((a[colNumber].replace(/ /g, '').toLowerCase() < b[colNumber].replace(/ /g, '').toLowerCase()) ? -1 : 0);
				} else {
					return (b[colNumber].replace(/ /g, '').toLowerCase() > a[colNumber].replace(/ /g, '').toLowerCase()) ? 1 : ((b[colNumber].replace(/ /g, '').toLowerCase() < a[colNumber].replace(/ /g, '').toLowerCase()) ? -1 : 0);
				}
			});
		}

		if (typeTable == 'otTable') {
			$.each(arraySort, function (index, elemento) {
				otsTable.row(index).data(elemento);
			});
		} else if (typeTable == 'traspasoTable') {
			$.each(arraySort, function (index, elemento) {
				traspasosTable.row(index).data(elemento);
			});
		} else if(typeTable == 'historicoTable'){
			$.each(arraySort, function (index, elemento) {
				historicoTable.row(index).data(elemento);
			});
		} 
	}
}])
