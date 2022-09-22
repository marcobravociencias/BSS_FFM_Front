var app = angular.module('mainBandejasEimPMApp', []);
var tableTerminada = undefined;

var geografiaPendiente = [];



app.controller('bandejasEimController', ['$scope', '$q', 'coordInstalacionesPIService', 'genericService', function ($scope, $q, coordInstalacionesPIService, genericService) {

	app.coordInstalacionesSF($scope, coordInstalacionesPIService, $q, genericService)
	$scope.vistaCoordinacion = 0;
	$scope.filtrosCatalogo = [];


	$scope.filtrosGeneral = {};

	$scope.nombreBandeja = "";

	$scope.nivelArbol = 0;
	$scope.tempReporteCspSinEim = [];

	$scope.consultarCatalogos = function () {
		$q.all([
			coordInstalacionesPIService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloBandejasEim" })
		]).then(function (results) {
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.elementosConfigGeneral = new Map(Object.entries(results[0].data.result))
						//Configuracion
						let resultConf = results[0].data.result
						if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
							let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;

							$scope.nivelArbolPendiente = llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTE ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTE) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolAsignada = llavesResult.N_FILTRO_GEOGRAFIA_ASIGNADA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_ASIGNADA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolDetenida = llavesResult.N_FILTRO_GEOGRAFIA_DETENIDA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_DETENIDA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolTerminada = llavesResult.N_FILTRO_GEOGRAFIA_TERMINADA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_TERMINADA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolCancelada = llavesResult.N_FILTRO_GEOGRAFIA_CANCELADA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_CANCELADA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolCalendarizada = llavesResult.N_FILTRO_GEOGRAFIA_CALENDARIZADA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_CALENDARIZADA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolGestoria = llavesResult.N_FILTRO_GEOGRAFIA_GESTORIA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_GESTORIA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);

							$scope.nivelEstatusPendiente = llavesResult.N_ESTATUS_PENDIENTES_PENDIENTE ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_PENDIENTE) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusAsignada = llavesResult.N_ESTATUS_PENDIENTES_ASIGNADA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_ASIGNADA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusDetenida = llavesResult.N_ESTATUS_PENDIENTES_DETENIDA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_DETENIDA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusTerminada = llavesResult.N_ESTATUS_PENDIENTES_TERMINADA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_TERMINADA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusCancelada = llavesResult.N_ESTATUS_PENDIENTES_CANCELADA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_CANCELADA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusCalendarizada = llavesResult.N_ESTATUS_PENDIENTES_CALENDARIZADA ? llavesResult.N_ESTATUS_PENDIENTES_CALENDARIZADA : llavesResult.N_ESTATUS_PENDIENTES;
							$scope.nivelEstatusGestoria = llavesResult.N_ESTATUS_PENDIENTES_GESTORIA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_GESTORIA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);

							$scope.idEstatusPendiente = llavesResult.ID_ESTATUS_PENDIENTE ? parseInt(llavesResult.ID_ESTATUS_PENDIENTE) : 1;
							$scope.idEstatusAsignada = llavesResult.ID_ESTATUS_ASIGNADA ? parseInt(llavesResult.ID_ESTATUS_ASIGNADA) : 2;
							$scope.idEstatusDetenida = llavesResult.ID_ESTATUS_DETENIDA ? parseInt(llavesResult.ID_ESTATUS_DETENIDA) : 3;
							$scope.idEstatusTerminada = llavesResult.ID_ESTATUS_TERMINADA ? parseInt(llavesResult.ID_ESTATUS_TERMINADA) : 4;
							$scope.idEstatusCancelada = llavesResult.ID_ESTATUS_CANCELADA ? parseInt(llavesResult.ID_ESTATUS_CANCELADA) : 5;
							$scope.idEstatusCalendarizada = llavesResult.ID_ESTATUS_CALENDARIZADA ? parseInt(llavesResult.ID_ESTATUS_CALENDARIZADA) : 6;
							$scope.idEstatusGestoria = llavesResult.ID_ESTATUS_GESTORIA ? parseInt(llavesResult.ID_ESTATUS_GESTORIA) : 7;

							if (llavesResult.N_FILTRO_GEOGRAFIA)
								$scope.nivelArbol = parseInt(llavesResult.N_FILTRO_GEOGRAFIA)

							if (llavesResult.N_ESTATUS_PENDIENTES)
								$scope.nivelEstatusGeneral = parseInt(llavesResult.N_ESTATUS_PENDIENTES)

							$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

							if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
								$scope.configPermisoAccionAsignarEimCSP = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionAsignarEimCSP" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaCSPSinEim = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaCSPSinEim" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaDependencias = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaDependencias" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaEnImplementacion = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaEnImplementacion" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaImplementados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaImplementados" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaPendientesPorImplementar = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaPendientesPorImplementar" })[0] != undefined);
							}
							$("#idBody").removeAttr("style");
							validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
							validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
						}
					} else {
						swal.close();
						toastr.warning('No se encontraron datos para la configuracion');
					}
				} else {
					swal.close();
					toastr.warning(results[0].data.resultDescripcion);
				}
			} else {
				swal.close();
				toastr.error('Ha ocurrido un error en la consulta de configuracion');
			}
			if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {

						/*
						$scope.filtrosCatalogo = results[0].data.result;
						$scope.filtrosCatalogo.map((e)=>{
							e.check = true;
						})
						$scope.mostrarFiltros();
						*/
					} else {
						toastr.warning('No se encontraron resultados');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			}
			}).catch(err => handleError(err));
	}
	$scope.consultarCatalogos();

	$scope.obtenerUltimoNivelFiltros = function (array) {
		return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
	}

	$scope.mostrarFiltros = function () {
		//PENDIENTE
		$scope.listaEstatusPendiente = $scope.filtrosCatalogo.filter(e => { return e.id === 1 });
		$scope.listaEstatusPendiente.map((es) => {
			es.estados = $scope.filtrosCatalogo.filter(e => { return e.idPadre === es.id });
		});
		$scope.listadoMotivosReagenda = $scope.filtrosCatalogo.filter(e => { return e.idPadre === 201 })
	}

	$scope.banderaCspSinEim = false;
	$scope.banderaGeografiaAsignada = false;
	$scope.banderaGeografiaDetenida = false;
	$scope.banderaGeografiaTerminada = false;
	$scope.banderaGeografiaCancelada = false;
	$scope.banderaGeografiaCalendarizada = false;
	$scope.banderaGeografiaGestoria = false;
	$scope.cambiarVista = function (opcion) {

		if (opcion === 1) {
			
			if ($scope.configPermisoAccionAsignarEimCSP) {
			if (!$scope.banderaCspSinEim) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				$scope.banderaCspSinEim = true;
				$scope.consultarCspSinEim();
			}
			swal.close();
			$scope.nombreBandeja = "CSP SIN EIM";
		}
		if (!$scope.configPermisoAccionAsignarEimCSP) {
			$scope.nombreBandeja = "Bienvenido al Modulo Bandejas EIM"
		}
		}

		if (opcion === 2) {

			if (!$scope.banderaGeografiaAsignada) {
				console.log("entra 0");
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
				
			}
			swal.close();

			$scope.nombreBandeja = "PENDIENTES POR IMPLEMENTAR";
		}
		if (opcion === 3) {

			if (!$scope.banderaGeografiaDetenida) {
				console.log("entra 0");
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
				
			}
			swal.close();

			$scope.nombreBandeja = "DEPENDENCIAS";
		}
		if (opcion === 4) {
			if (!$scope.banderaGeografiaTerminada) {
				console.log("entra 0");
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
				
			}
			swal.close();
			$scope.nombreBandeja = "EN IMPLEMENTACIÓN";
		}
		if (opcion === 5) {
			if (!$scope.banderaGeografiaCancelada) {
				console.log("entra 0");
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
				
			}
			swal.close();
			$scope.nombreBandeja = "IMPLEMENTADOS";
		}
		
		$scope.vistaCoordinacion = opcion;
	}

	$('#modal-geografia-pendiente').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaPendiente();
	});

	$('#modal-geografia-asignada').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaAsignada();
	});

	$('#modal-geografia-detenido').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaDetenida();
	});

	$('#modal-geografia-terminada').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaTerminada();
	});

	$('#modal-geografia-cancelada').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaCancelada();
	});

	$('#modal-geografia-calendarizada').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaCalendarizada();
	});

	$('#modal-geografia-gestoria').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaGestoria();
	});


	$scope.detalleOtSeleccionada = {};
	consultaDetalleOt = function (id) {

		$scope.elementCalendarizado = {};
		$scope.elementReagendaOT = {};
		$scope.elementoPlazaComercial = {};
		$scope.detalleOtSeleccionada = {};
		$scope.$apply();
		$scope.objetoSelecionado = {};

		switch ($scope.vistaCoordinacion) {
			case 1:
				$scope.objetoSelecionado = $scope.objetoBusqueda.pendiente.find(o => { return Number(o.idOrden) == id });
				break;
			case 2:
				$scope.objetoSelecionado = $scope.objetoBusqueda.asignada.find(o => { return Number(o.idOrden) == id });
				break;
			case 3:
				$scope.objetoSelecionado = $scope.objetoBusqueda.detenida.find(o => { return Number(o.idOrden) == id });
				break;
			case 4:
				$scope.objetoSelecionado = $scope.objetoBusqueda.terminada.find(o => { return Number(o.idOrden) == id });
				break;
			case 5:
				$scope.objetoSelecionado = $scope.objetoBusqueda.cancelada.find(o => { return Number(o.idOrden) == id });
				break;
			case 6:
				$scope.objetoSelecionado = $scope.objetoBusqueda.calendarizada.find(o => { return Number(o.idOrden) == id });
				break;
			case 7:
				$scope.objetoSelecionado = $scope.objetoBusqueda.gestoria.find(o => { return Number(o.idOrden) == id });
				break;
			default:
				break;
		}

		$scope.permisosModal = $scope.elementosConfigGeneral.get("MODAL_FLUJO_" + $scope.objetoSelecionado.idFlujo).split(",");
		$scope.requestModalInformacion($scope.objetoSelecionado.idOrden);
		/*
		switch ($scope.vistaCoordinacion) {
			case 1:
				$scope.objetoSelecionado = $scope.resultPendientes[index];
				break;
			case 6:
				$scope.objetoSelecionado = $scope.resultCalendarizada[index];
				break;
			case 7:
				$scope.objetoSelecionado = $scope.resultGestoria[index];
				break;
			default:
				break;
		}
		*/
		$scope.detalleOtSeleccionada.idOrden = $scope.objetoSelecionado.idOrden;
		$scope.detalleOtSeleccionada.folioOrden = $scope.objetoSelecionado.folioSistema;
		$scope.detalleOtSeleccionada.idFlujo = $scope.objetoSelecionado.idFlujo;
		$scope.detalleOtSeleccionada.idtipoOrden = $scope.objetoSelecionado.idTipoOrden;
		$scope.detalleOtSeleccionada.idSubtipoOrden = $scope.objetoSelecionado.idSubTipoOrden;
		$scope.detalleOtSeleccionada.latitud = $scope.objetoSelecionado.latitud;
		$scope.detalleOtSeleccionada.longitud = $scope.objetoSelecionado.longitud;
		$("#modalDetalleOt").modal("show");
		$('#fecha-reagendamiento').datepicker('update', new Date());
		$('#fecha-calendarizado').datepicker('update', moment(new Date()).add('days', 8).toDate());
		if ($scope.vistaCoordinacion !== 1) {
			document.getElementById('opcion-reagendar').click()
		} else {
			document.getElementById('opcion-plaza').click()
		}

	}

	$scope.idOtSelect = "";
	$scope.requestModalInformacion = function (idparams) {
		$scope.otconsultamodal =
			document.getElementById('v-tabs-consulta-detalleot-tab').click()
		$scope.idOtSelect = idparams;
		$scope.flagComentarios = false;
		$scope.flagHistorico = false;
		$scope.flagPedido = false;
		$scope.comentariosOrdenTrabajo = [];
		$scope.historialOrdenTrabajo = [];
		$scope.infoOtDetalle = {}
		$scope.detalleCotizacion = {}
		$scope.detalleTecnicoOt = {};
		let params = {
			"idOt": idparams
		}
		swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
		swal.showLoading();
		$q.all([
			coordInstalacionesPIService.consultarDetalleOtDespacho(params),
			coordInstalacionesPIService.consultarDetalleTecnicoOt(params),
		]).then(function (results) {
			swal.close()
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						if (results[0].data.result.orden) {
							$scope.infoOtDetalle = results[0].data.result.orden
							$("#modalDetalleOT").modal({ backdrop: 'static', keyboard: false });
							$("#modalDetalleOT").modal('show')
							setTimeout(function () {
								document.getElementsByClassName('permiso-accion-modal')[0].click();
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

			if (results[2].data !== undefined) {
				if (results[2].data.respuesta) {
					if (results[2].data.result) {
						if (results[2].data.result.orden) {

							$scope.infoDetalleOtPe = results[2].data.result.orden;

							$scope.infoDetalleOtPe.tipoOrden = $scope.respaldoTipoOrdenArray.find(e => { return e.id === $scope.infoDetalleOtPe.idTipoOrden });
							$scope.infoDetalleOtPe.subTipoOrden = $scope.respaldoTipoOrdenArray.find(e => { return e.id === $scope.infoDetalleOtPe.idSubTipoOrden });
							$scope.infoDetalleOtPe.estado = $scope.respaldoStatusArray.find(e => { return e.id === $scope.infoDetalleOtPe.idEstado });
							$scope.infoDetalleOtPe.estatus = $scope.respaldoStatusArray.find(e => { return e.id === $scope.infoDetalleOtPe.idEstatus });

							if ($scope.infoDetalleOtPe.detalleCorteMasivo !== undefined) {
								$scope.tabDetalleCorteMasivo = true;
							} else if ($scope.infoDetalleOtPe.detalleDetencion !== undefined) {
								$scope.tabDetalleDetencion = true;
							} else if ($scope.infoDetalleOtPe.detalleInspeccion !== undefined) {
								$scope.tabDetalleInspector = true;
							}
						} else {
							toastr.info(results[2].data.result.mensaje);
						}
					} else {
						toastr.warning('No se encontraron datos en el detalle de la OT');
					}
				} else {
					toastr.warning(results[2].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta del detalle de la OT');
			}
		}).catch(err => handleError(err));
	}

	$scope.consultarCspSinEim = function () {
		let params = {
			elementosPorPagina: 10
		}
		tableCspSinEim = $("#table_cspSinEim").DataTable({
			"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"lengthChange": false,
				"searching": false,
				"pageLength": 10,
				"ajax":{
					"url": "req/consultarBandejaCspSinEim",
					"type": "POST",
					"data": params,
					"beforeSend": function(){
						if (!swal.isVisible()) {
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
					},
					"dataSrc": function (json){
						if(json.result){

						}
						$scope.tempReporteCspSinEim = json.data;
						return json.data;
					},
					"error": function (xhr, error, thrown){
						handleError(xhr)
					},
					"complete": function(){
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
		});
		
	}

	angular.element(document).ready(function () {
		tableCspSinEim = $('#table_cspSinEim').DataTable({
			"processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
		});
		$("#idBody").removeAttr("style");
		$('#moduloBandejasEim').addClass('active');
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

	});
	
	// -----------------------------------------------------------------------
	// ORDENAMIENTO TABLAS
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
		if (typeTable == 'reportePendiente') {
			arraySort = angular.copy($scope.tempReportePendiente);
		} else if (typeTable == 'reporteAsignada') {
			arraySort = angular.copy($scope.tempReporteAsignada);
		} else if (typeTable == 'reporteDetenida') {
			arraySort = angular.copy($scope.tempReporteDetenida);
		} else if (typeTable == 'reporteTerminada') {
			arraySort = angular.copy($scope.tempReporteTerminada);
		} else if (typeTable == 'reporteCancelada') {
			arraySort = angular.copy($scope.tempReporteCancelada);
		} else if (typeTable == 'reporteCalendarizada') {
			arraySort = angular.copy($scope.tempReporteCalendarizada);
		} else if (typeTable == 'reporteGestoria') {
			arraySort = angular.copy($scope.tempReporteGestoria);
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

		if (typeTable == 'reportePendiente') {
			$.each(arraySort, function (index, elemento) {
				tablePendiente.row(index).data(elemento);
			});
		} else if (typeTable == 'reporteAsignada') {
			$.each(arraySort, function (index, elemento) {
				tableAsignada.row(index).data(elemento);
			});
		} else if (typeTable == 'reporteDetenida') {
			$.each(arraySort, function (index, elemento) {
				tableDetenida.row(index).data(elemento);
			});
		} else if (typeTable == 'reporteTerminada') {
			$.each(arraySort, function (index, elemento) {
				tableTerminada.row(index).data(elemento);
			});
		} else if (typeTable == 'reporteCancelada') {
			$.each(arraySort, function (index, elemento) {
				tableCancelada.row(index).data(elemento);
			});
		} else if (typeTable == 'reporteCalendarizada') {
			$.each(arraySort, function (index, elemento) {
				tableCalendarizada.row(index).data(elemento);
			});
		} else if (typeTable == 'reporteGestoria') {
			$.each(arraySort, function (index, elemento) {
				tableGestoria.row(index).data(elemento);
			});
		}
	}

}]);