var app = angular.module('mainBandejasEimPMApp', []);
var tableTerminada = undefined;

var geografiaPendiente = [];



app.controller('bandejasEimController', ['$scope', '$q', 'coordInstalacionesPIService', 'genericService', function ($scope, $q, coordInstalacionesPIService, genericService) {

	app.coordInstalacionesSF($scope, coordInstalacionesPIService, $q, genericService)
	$scope.vistaCoordinacion = 0;
	$scope.filtrosCatalogo = [];


	$scope.filtrosGeneral = {};
	var tableCspSinEim = undefined;
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

			$scope.nombreBandeja = "VALIDACIÓN DE LÍDER TÉCNICO Y TORRE DE CONTROL";
		}
		if (opcion === 3) {

			if (!$scope.banderaGeografiaDetenida) {
				console.log("entra 0");
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
				
			}
			swal.close();

			$scope.nombreBandeja = "PENDIENTES POR IMPLEMENTAR";
		}
		if (opcion === 4) {
			if (!$scope.banderaGeografiaTerminada) {
				console.log("entra 0");
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
				
			}
			swal.close();
			$scope.nombreBandeja = "DEPENDENCIAS";
		}
		if (opcion === 5) {
			if (!$scope.banderaGeografiaCancelada) {
				console.log("entra 0");
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
				
			}
			swal.close();
			$scope.nombreBandeja = "EN IMPLEMENTACIÓN";
		}
		if (opcion === 6) {
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
	$scope.resultPendientes = [];
	$scope.consultarCspSinEim = function () {
		$scope.resultPendientes = [];
		let params = {
			idOrdenTrabajo: "",
			folioSistema: "",
			idClaveCliente: "",
			idEstatus: [
				1
			 ],
			idGeografias: [
				3427,
				3428,
				3429,
				3430,
				3431,
				3432,
				3433,
				3255,
				3256,
				3257,
				3254,
				3253,
				3252,
				3251,
				3669,
				3668,
				3667,
				3367,
				3363,
				3364,
				3362,
				3361,
				3365,
				3366,
				3368,
				3369,
				3360,
				3359,
				3358,
				3357,
				3437,
				3442,
				3443,
				3438,
				3441,
				3439,
				3440,
				3444,
				3446,
				3445,
				3435,
				3434,
				3436,
				3228,
				3229,
				3230,
				3231,
				3232,
				3233,
				3456,
				3457,
				3458,
				3449,
				3450,
				3451,
				3447,
				3448,
				3453,
				3454,
				3455,
				3452,
				3168,
				3166,
				3167,
				3161,
				3162,
				3165,
				3163,
				3164,
				3169,
				3025,
				3022,
				3021,
				3023,
				3024,
				3017,
				3019,
				3018,
				3020,
				3026,
				3027,
				3028,
				3029,
				3057,
				3058,
				3059,
				3060,
				3064,
				3061,
				3062,
				3063,
				3352,
				3349,
				3348,
				3351,
				3350,
				3581,
				3582,
				3583,
				3589,
				3588,
				3587,
				3584,
				3590,
				3585,
				3586,
				3579,
				3580,
				3577,
				3578,
				3155,
				3156,
				3159,
				3160,
				3158,
				3157,
				3210,
				3214,
				3211,
				3212,
				3213,
				3562,
				3560,
				3561,
				3563,
				3564,
				3566,
				3567,
				3565,
				3570,
				3569,
				3568,
				3717,
				3620,
				3618,
				3619,
				3621,
				3622,
				3626,
				3623,
				3625,
				3624,
				3634,
				3632,
				3633,
				3631,
				3630,
				3629,
				3628,
				3627,
				3066,
				3065,
				3073,
				3068,
				3067,
				3071,
				3069,
				3072,
				3070,
				3046,
				3045,
				3043,
				3044,
				3048,
				3047,
				3042,
				3053,
				3051,
				3052,
				3056,
				3054,
				3055,
				3050,
				3049,
				3259,
				3258,
				3265,
				3264,
				3263,
				3262,
				3260,
				3261,
				3726,
				3727,
				3728,
				3695,
				3694,
				3696,
				3698,
				3697,
				3693,
				3699,
				3688,
				3692,
				3689,
				3691,
				3690,
				3664,
				3666,
				3665,
				3663,
				3662,
				3661,
				3642,
				3641,
				3638,
				3635,
				3636,
				3637,
				3640,
				3639,
				3684,
				3687,
				3686,
				3682,
				3681,
				3685,
				3683,
				3189,
				3190,
				3191,
				3192,
				3193,
				3250,
				3245,
				3247,
				3249,
				3248,
				3246,
				3271,
				3272,
				3273,
				3274,
				3269,
				3266,
				3267,
				3268,
				3270,
				3218,
				3219,
				3215,
				3216,
				3217,
				3221,
				3220,
				3222,
				3223,
				3279,
				3275,
				3276,
				3277,
				3280,
				3278,
				3197,
				3194,
				3195,
				3196,
				3573,
				3576,
				3574,
				3575,
				3572,
				3571,
				3322,
				3323,
				3318,
				3316,
				3321,
				3320,
				3319,
				3317,
				3127,
				3130,
				3129,
				3126,
				3128,
				3125,
				3124,
				3679,
				3673,
				3674,
				3671,
				3672,
				3677,
				3676,
				3675,
				3678,
				3670,
				3680,
				3181,
				3179,
				3178,
				3180,
				3186,
				3187,
				3185,
				3188,
				3183,
				3184,
				3182,
				3307,
				3306,
				3308,
				3310,
				3309,
				3311,
				3314,
				3312,
				3315,
				3313,
				3324,
				3325,
				3326,
				3327,
				3330,
				3331,
				3329,
				3328,
				3719,
				3718,
				3720,
				3721,
				3725,
				3722,
				3723,
				3724,
				3415,
				3414,
				3412,
				3411,
				3413,
				3398,
				3397,
				3396,
				3403,
				3402,
				3404,
				3410,
				3405,
				3401,
				3407,
				3406,
				3399,
				3400,
				3408,
				3409,
				3177,
				3175,
				3176,
				3173,
				3174,
				3170,
				3171,
				3172,
				3078,
				3077,
				3075,
				3076,
				3082,
				3080,
				3079,
				3081,
				3083,
				3074,
				3286,
				3287,
				3285,
				3284,
				3282,
				3281,
				3283,
				3288,
				3289,
				3292,
				3298,
				3296,
				3304,
				3302,
				3295,
				3303,
				3294,
				3305,
				3291,
				3290,
				3293,
				3299,
				3297,
				3300,
				3301,
				3463,
				3464,
				3465,
				3461,
				3459,
				3460,
				3462,
				3468,
				3467,
				3469,
				3470,
				3471,
				3472,
				3466,
				3473,
				3376,
				3377,
				3378,
				3380,
				3381,
				3382,
				3383,
				3379,
				3384,
				3385,
				3388,
				3387,
				3386,
				3716,
				3615,
				3616,
				3617,
				3612,
				3611,
				3613,
				3614,
				3391,
				3392,
				3393,
				3394,
				3395,
				3389,
				3390,
				3205,
				3207,
				3209,
				3208,
				3203,
				3200,
				3202,
				3204,
				3201,
				3206,
				3198,
				3199,
				3736,
				3737,
				3033,
				3032,
				3031,
				3030,
				3037,
				3040,
				3038,
				3041,
				3034,
				3036,
				3035,
				3039,
				3145,
				3144,
				3146,
				3143,
				3142,
				3140,
				3141,
				3653,
				3652,
				3650,
				3649,
				3655,
				3654,
				3651,
				3656,
				3648,
				3598,
				3595,
				3596,
				3597,
				3370,
				3371,
				3374,
				3375,
				3372,
				3373,
				3338,
				3339,
				3337,
				3340,
				3341,
				3343,
				3346,
				3345,
				3344,
				3342,
				3347,
				3607,
				3606,
				3610,
				3605,
				3608,
				3609,
				3424,
				3425,
				3426,
				3423,
				3422,
				3417,
				3416,
				3421,
				3420,
				3419,
				3418,
				3132,
				3133,
				3134,
				3131,
				3227,
				3226,
				3225,
				3224,
				3093,
				3094,
				3088,
				3084,
				3087,
				3086,
				3089,
				3085,
				3090,
				3091,
				3092,
				3095,
				3096,
				3332,
				3334,
				3336,
				3335,
				3333,
				3591,
				3594,
				3593,
				3592,
				3521,
				3520,
				3522,
				3524,
				3523,
				3527,
				3526,
				3530,
				3525,
				3528,
				3529,
				3519,
				3101,
				3107,
				3099,
				3103,
				3104,
				3106,
				3100,
				3102,
				3105,
				3108,
				3109,
				3097,
				3098,
				3110,
				3111,
				3112,
				3115,
				3114,
				3116,
				3113,
				3001,
				3007,
				3002,
				3003,
				3008,
				3004,
				3006,
				3005,
				3355,
				3356,
				3354,
				3353,
				3644,
				3643,
				3645,
				3647,
				3646,
				3559,
				3557,
				3558,
				3556,
				3544,
				3546,
				3552,
				3554,
				3555,
				3553,
				3545,
				3547,
				3548,
				3549,
				3551,
				3550,
				3535,
				3539,
				3541,
				3540,
				3543,
				3542,
				3536,
				3537,
				3538,
				3534,
				3531,
				3532,
				3533,
				3016,
				3014,
				3015,
				3012,
				3013,
				3009,
				3011,
				3010,
				3734,
				3735,
				3733,
				3732,
				3711,
				3709,
				3712,
				3710,
				3708,
				3707,
				3700,
				3701,
				3702,
				3703,
				3705,
				3704,
				3706,
				3139,
				3137,
				3138,
				3135,
				3136,
				3484,
				3485,
				3487,
				3486,
				3488,
				3483,
				3478,
				3480,
				3474,
				3475,
				3476,
				3477,
				3482,
				3479,
				3481,
				3117,
				3118,
				3119,
				3121,
				3123,
				3122,
				3120,
				3147,
				3148,
				3154,
				3150,
				3153,
				3149,
				3151,
				3152,
				3600,
				3602,
				3601,
				3599,
				3603,
				3604,
				3494,
				3493,
				3495,
				3498,
				3496,
				3497,
				3490,
				3492,
				3491,
				3500,
				3499,
				3501,
				3502,
				3489,
				3241,
				3236,
				3237,
				3238,
				3239,
				3243,
				3244,
				3242,
				3234,
				3240,
				3235,
				3503,
				3508,
				3507,
				3512,
				3513,
				3506,
				3509,
				3511,
				3510,
				3504,
				3505,
				3518,
				3517,
				3514,
				3516,
				3515,
				11732
			],
			idEstados: [
				201,200,202
			],
			fechaInicio: "2022-09-10",
			fechaFin: "2022-09-23",
			elementosPorPagina: 10,
			fechaSeleccionada:"fechaInicio"
		}
		let mensaje = "";
		let bandera = true;
		if (bandera) {
		if (tableCspSinEim) {
			tableCspSinEim.destroy()
		}
		console.log("entre antes del ajax");
		tableCspSinEim = $("#tablecspSinEim").DataTable({
			"processing": false,
			"ordering": false,
			"serverSide": true,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"pageLength": 10,
			"ajax": {
				"url": "req/consultarBandejaEim",
				"type": "POST",
				"data": params,
				"beforeSend": function () {
					if (!swal.isVisible()) {
						swal({ text: 'Cargando registros...', allowOutsideClick: false });
						swal.showLoading();
					}

				},
				"dataSrc": function (json) {
					if (json.result) {
						console.log("json result");
					}
					$scope.tempReportePendiente = json.data;
					//$scope.elementosRegistro = json.registrosTotales
					return json.data;
				},
				"error": function (xhr, error, thrown) {
					handleError(xhr)
				},
				"complete": function () {
					swal.close()
				}
			},
			"columns": [null,null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});
	} else{
		mostrarMensajeWarningValidacion(mensaje);
	}
	}

	angular.element(document).ready(function () {

		tableCspSinEim = $('#tablecspSinEim').DataTable({
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
		$("#btn_mostrar_nav").hide(500);
		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: true
		});
		$('.datepicker').datepicker('update', new Date());

		$('#fecha-reagendamiento').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			startDate: moment(new Date()).toDate()
		});
		$('#fecha-reagendamiento').datepicker('update', new Date());

		$('#fecha-calendarizado').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			startDate: moment(new Date()).add('days', 8).toDate()
		});
		$('#fecha-calendarizado').datepicker('update', moment(new Date()).add('days', 8).toDate());

		$('.drop-down-filters').on("click.bs.dropdown", function (e) {
			e.stopPropagation();
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
		if (typeTable == 'reporteCspSinEim') {
			arraySort = angular.copy($scope.tempReporteCspSinEim);
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

		if (typeTable == 'reporteCspSinEim') {
			$.each(arraySort, function (index, elemento) {
				tableCspSinEim.row(index).data(elemento);
			});
		}
	}

}]);