var app = angular.module('mainBandejasEimPMApp', []);
var tableTerminada = undefined;
var objectTempAccion;
var geografiaPendiente = [];
var csp  = [];


app.controller('bandejasEimController', ['$scope', '$q', 'coordInstalacionesPIService', 'genericService', 'evidenciaService', function ($scope, $q, coordInstalacionesPIService, genericService, evidenciaService) {
	app.evidenciaController($scope, evidenciaService)
	app.coordInstalacionesSF($scope, coordInstalacionesPIService, $q, genericService)
	$scope.vistaCoordinacion = 0;
	$scope.filtrosCatalogo = [];


	$scope.filtrosGeneral = {};
	var tableCspSinEim = undefined;
	var tablePendientesPorImplementar = undefined;
	$scope.nombreBandeja = "";

	$scope.nivelArbol = 0;
	$scope.tempReporteCspSinEim = [];
	$scope.listadogeografiacopy = [];
	$scope.filtroGeografia = {};
	$scope.data = {};
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

	$scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
		return list.sort(compareGeneric)[0].nivel
	}

		$scope.ordenarGeografia = function (lista, filtro) {
		
		let listaGeografiaTemp = lista.filter(e => e.nivel <= parseInt(filtro));

		let geografia = angular.copy(listaGeografiaTemp);
		geografia.map((e) => {
			e.parent = e.padre == null ? '#' : e.padre;
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

	$scope.getTextGeografia = function (idJsTree, idInput) {
		var geografias = $('#' + idJsTree).jstree("get_selected", true);
		let textoGeografias = [];
		angular.forEach(geografias, (geografia, index) => {
			textoGeografias.push(geografia.text);
		});
	}


	$scope.consultarCatalogos = function () {
		$q.all([
			coordInstalacionesPIService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloBandejasEim" }),
			genericService.consulCatalogoGeografia()
		]).then(function (results) {
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.elementosConfigGeneral = new Map(Object.entries(results[0].data.result))
						//Configuracion
						let resultConf = results[0].data.result
						if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
							let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;

							$scope.nivelArbolCspSinEim = llavesResult.N_FILTRO_GEOGRAFIA_CSPSINEIM;
							$scope.nivelArbolPendientesPorImplementar = llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTESIMPLEMENTAR;
							

							$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

							if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
								$scope.configPermisoAccionAsignarEimCSP = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionAsignarEimCSP" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaCSPSinEim = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaCSPSinEim" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaDependencia = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaDependencias" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaImplementacion = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaEnImplementacion" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaImplementados = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaImplementados" })[0] != undefined);
								$scope.configPermisoAccionConsultarBandejaPendientesPorImplementar = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultarBandejaPendientesPorImplementar" })[0] != undefined);
								objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
								objectTempAccion.inicializarBotonAccionesRecientes();
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
						if (results[1].data.result.geografia) {
							$scope.listadogeografiacopy = results[1].data.result.geografia;

							$scope.nivelArbolCspSinEim = $scope.nivelArbolCspSinEim ? $scope.nivelArbolCspSinEim : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
							$scope.nivelArbolValidacion = $scope.nivelArbolValidacion ? $scope.nivelArbolValidacion : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
							
							$scope.nivelArbolPendientesPorImplementar = $scope.nivelArbolPendientesPorImplementar ? $scope.nivelArbolPendientesPorImplementar : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
							$scope.nivelArbolDependencia = $scope.nivelArbolDependencia ? $scope.nivelArbolDependencia : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
							$scope.nivelArbolImplementacion = $scope.nivelArbolImplementacion ? $scope.nivelArbolImplementacion : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);

							$scope.nivelArbolImplementados = $scope.nivelArbolImplementados ? $scope.nivelArbolImplementados : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
							
							if($scope.configPermisoAccionAsignarEimCSP){
								let geografia = $scope.ordenarGeografia(results[1].data.result.geografia, $scope.nivelArbolCspSinEim);
								$scope.filtroGeografia.cspSinEim = angular.copy(geografia);
							}

							if($scope.configPermisoAccionConsultarBandejaCSPSinEim){
								let geografia = $scope.ordenarGeografia(results[1].data.result.geografia, $scope.nivelArbolValidacion);
								$scope.filtroGeografia.validacion = angular.copy(geografia);
							}

							if($scope.configPermisoAccionConsultarBandejaPendientesPorImplementar){
								let geografia = $scope.ordenarGeografia(results[1].data.result.geografia, $scope.nivelArbolPendientesPorImplementar);
								$scope.filtroGeografia.pendientesPorImplementar = angular.copy(geografia);
							}

							if($scope.configPermisoAccionConsultarBandejaDependencia){
								let geografia = $scope.ordenarGeografia(results[1].data.result.geografia, $scope.nivelArbolDependencia);
								$scope.filtroGeografia.dependencia = angular.copy(geografia);
							}

							if($scope.configPermisoAccionConsultarBandejaImplementacion){
								let geografia = $scope.ordenarGeografia(results[1].data.result.geografia, $scope.nivelArbolImplementacion);
								$scope.filtroGeografia.implementacion = angular.copy(geografia);
							}

							if($scope.configPermisoAccionConsultarBandejaImplementados){
								let geografia = $scope.ordenarGeografia(results[1].data.result.geografia, $scope.nivelArbolImplementados);
								$scope.filtroGeografia.implementados = angular.copy(geografia);
							}
							
							
						} else {
							toastr.info('No se encontraron datos para la geograf\u00EDa');
						}
					} else {
						toastr.info('No se encontraron datos para la geograf\u00EDa');
					}
				} else {
					toastr.warning(results[1].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de la geograf\u00EDa');
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

	$scope.guardarArbol = function (type) {
		let arbolActual = $("#jstreeGeografia-" + type).jstree("get_selected", true)
			.map(e => parseInt(e.id));

		switch (type+"") {
			case '1':
				$scope.filtroGeografia.cspSinEim.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
			case '2':
				$scope.filtroGeografia.validacion.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
			case '3':
				$scope.filtroGeografia.pendientesPorImplementar.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
			case '4':
				$scope.filtroGeografia.dependencia.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
			case '5':
				$scope.filtroGeografia.implementacion.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
			case '6':
				$scope.filtroGeografia.implementados.map((e) => {
					e.state = {
						opened: true,
						selected: arbolActual.find((t) => t == parseInt(e.id)) > 0 ? true : false,
					}
					return e
				});
				break;
		}

	}

	$scope.banderaCspSinEim = false;
	$scope.banderaPendientesPorImplementar = false;
	$scope.banderaValidacionLider = false;
	$scope.banderaDependencia = false;
	$scope.banderaImplementacion = false;
	$scope.banderaImplementados = false;

	$scope.cambiarVista = function (opcion) {
		let geografiaReporte = [];
		
		if (opcion === 1) {
			geografiaReporte = angular.copy($scope.filtroGeografia.cspSinEim);
			if (!$scope.banderaCspSinEim) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
				
			}
			$scope.nombreBandeja = "CSP SIN EIM";
		}
		if (opcion === 2) {
			geografiaReporte = angular.copy($scope.filtroGeografia.validacion);
			if (!$scope.banderaValidacionLider) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
			}
			swal.close();
			$scope.nombreBandeja = "VALIDACIÓN DE LÍDER TÉCNICO Y TORRE DE CONTROL";
		}
		if (opcion === 3) {
			geografiaReporte = angular.copy($scope.filtroGeografia.pendientesPorImplementar);
			if (!$scope.banderaPendientesPorImplementar) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
			}

			$scope.nombreBandeja = "PENDIENTES POR IMPLEMENTAR";
		}
		if (opcion === 4) {
			if (!$scope.banderaDependencia) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
			}
			$scope.nombreBandeja = "DEPENDENCIAS";
		}
		if (opcion === 5) {
			if (!$scope.banderaImplementacion) {
				swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
				swal.showLoading();
			}
			$scope.nombreBandeja = "EN IMPLEMENTACIÓN";
		}

		
		if (geografiaReporte) {
			$scope.guardarArbol($scope.vistaCoordinacion);
			let isJsTree = $('#jstreeGeografia-' + $scope.vistaCoordinacion).jstree('is_loaded')[0] ? true : false;
			if (!isJsTree) {
				$('#jstreeGeografia-' + $scope.vistaCoordinacion).jstree('destroy');
			}

			$scope.vistaCoordinacion = opcion;

			$('#jstreeGeografia-' + opcion).bind('loaded.jstree', function (e, data) {
				switch (opcion) {
					case 1:
						$scope.getTextGeografia('jstreeGeografia-1', 'cluster-cspSinEim');
						if (!$scope.banderaCspSinEim) {
							$scope.banderaCspSinEim = true;
							$scope.consultarSinEimPm();
						}
						break;
					case 2:
						$scope.getTextGeografia('jstreeGeografia-2', 'cluster-validacion');
						if (!$scope.banderaValidacionLider) {
							$scope.banderaValidacionLider = true;
							$scope.consultarValidacion();
						}
						break;
					case 3:
						$scope.getTextGeografia('jstreeGeografia-3', 'cluster-pendientesPorImplementar');
						if (!$scope.banderaPendientesPorImplementar) {
							$scope.banderaPendientesPorImplementar = true;
							$scope.consultarPendientesPorImplementar();
						}
						break;
					case 4:
						$scope.getTextGeografia('jstreeGeografia-4', 'cluster-dependencia');
						if (!$scope.banderaDependencia) {
							$scope.banderaDependencia = true;
							$scope.consultarDependencia();
						}
						break;
					case 5:
						$scope.getTextGeografia('jstreeGeografia-5', 'cluster-implementacion');
						if (!$scope.banderaImplementacion) {
							$scope.banderaImplementacion = true;
							$scope.consultarImplementacion();
						}
						break;
					case 6:
						$scope.getTextGeografia('jstreeGeografia-6', 'cluster-implementados');
						if (!$scope.banderaImplementados) {
							$scope.banderaImplementados = true;
							$scope.consultarImplementados();
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
	//Table Validacion Lider Tecnico
	$scope.consultarValidacion = function(isSwal){
		cotParams = $("#v_cot").val();
		cspParams = $("#v_csp").val();
		cveClienteParams = $("#v_cveCliente").val();
		let params = {
			cot: cotParams,
			csp: cspParams,
			cveCliente: cveClienteParams
		};
		let arraRow = [];
		if (isSwal) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }
		if (tablevalidacion) {
            tablevalidacion.destroy();
        }
		genericService.consultarValidacion(params).then(function success(response){
			if(response.data !== undefined){
				if(response.data.respuesta){
					if (response.data.result) {
						if (response.data.result.puntas) {
							$scope.validacion = response.data.result.puntas;
							$.each(response.data.result.puntas, function (i, elemento){
								let row = [];
								row[0] = '<input type="checkbox" id="check" name="check" value="' + elemento.idCsp + '"/>';
								row[1] = elemento.nombreOportunoidad ? elemento.nombreOportunoidad : 'Sin informaci&oacute;n';
								row[2] = elemento.vertical ? elemento.vertical : 'Sin informaci&oacute;n';
								row[3] = elemento.celula ? elemento.celula : 'Sin informaci&oacute;n';
								row[4] = elemento.cliente ? elemento.cliente : 'Sin informaci&oacute;n';
								row[5] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
								row[6] = elemento.fechaVenta ? elemento.fechaVenta : 'Sin informaci&oacute;n';
								row[7] = elemento.eim ? elemento.eim : 'Sin informaci&oacute;n';
								row[8] = elemento.tipo ? elemento.tipo : 'Sin informaci&oacute;n';
								arraRow.push(row);
							})
						} else{
							toastr.error(response.data.resultDescripcion);
						}
					} else{
						toastr.warning('No se encontraron oportunidades para validar');
					}
				} else{
					toastr.warning(response.data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error al consultar la validacion de lider tecnico y torre de control');
			}
	
			tablevalidacion = $('#tablevalidacion').DataTable({
				"paging": true,
				"searching": false,
				"lengthChange": false,
				"ordering": true,
				"pageLength": 10,
				"info": true,
				"scrollX": false,
				"data": arraRow,
				"autoWidth": false,
				"language": idioma_espanol_not_font,
				"aoColumnDefs": [
					{ "aTargets": [5], "bSortable": false }
				]
			});
			swal.close();
		})
	} 
	
	//Table con metodo get
	$scope.consultarSinEimPm = function(isSwal){
		cotParams = $("#cot").val();
		cspParams = $("#csp").val();
		cveClienteParams = $("#cveCliente").val();
		let params = {
			cot: cotParams,
			csp: cspParams,
			cveCliente: cveClienteParams
		};
		let arraRow = [];
		if (isSwal) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }

        if (tableCspSinEim) {
            tableCspSinEim.destroy();
        }
		genericService.consultarSinEim(params).then(function success(response){
			if(response.data !== undefined){
				if(response.data.respuesta){
					if (response.data.result) {
						if (response.data.result.puntas) {
							$scope.listaSinEim = response.data.result.puntas;
							$.each(response.data.result.puntas, function (i, elemento){
								let row = [];
								row[0] = '<input type="checkbox" id="check" name="check" value="' + elemento.idCsp + '"/>';
								row[1] = elemento.nombreOportunoidad ? elemento.nombreOportunoidad : 'Sin informaci&oacute;n';
								row[2] = elemento.vertical ? elemento.vertical : 'Sin informaci&oacute;n';
								row[3] = elemento.celula ? elemento.celula : 'Sin informaci&oacute;n';
								row[4] = elemento.cliente ? elemento.cliente : 'Sin informaci&oacute;n';
								row[5] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
								row[6] = elemento.fechaVenta ? elemento.fechaVenta : 'Sin informaci&oacute;n';
								arraRow.push(row);
							})
						} else{
							toastr.error(response.data.resultDescripcion);
						}
					} else{
						toastr.warning('No se encontraron Eims');
					}
				} else{
					toastr.warning(response.data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error al consultar los Eims');
			}
	
			tableCspSinEim = $('#tablecspSinEim').DataTable({
				"paging": true,
				"searching": false,
				"lengthChange": false,
				"ordering": true,
				"pageLength": 10,
				"info": true,
				"scrollX": false,
				"data": arraRow,
				"autoWidth": false,
				"language": idioma_espanol_not_font,
				"aoColumnDefs": [
					{ "aTargets": [5], "bSortable": false }
				]
			});
			swal.close();
			
		})
				
	}
	
	$scope.objetoEim = {};
	$scope.limpiarCamposPendiente = function (opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoEim.cot = "";
				$scope.objetoEim.cveCliente = "";
				break;
			case 2:
				$scope.objetoEim.csp = "";
				$scope.objetoEim.cveCliente = "";
				break;
			case 3:
				$scope.objetoEim.csp = "";
				$scope.objetoEim.cot = "";
				break;
			default:
				break;
		}
	}
	$scope.getData = function () {
		$q.all([
			genericService.consultarListaEim()
		]).then(function (results) {
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						if (results[0].data.result.eims.length > 0) {
							
							$scope.data.eims = results[0].data.result.eims;
						} else {
							toastr.info('No se encontr\u00F3 catalogo de Eims');
						}
					} else {
						toastr.info('No se encontr\u00F3 catalogo de Eims');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			}
		}).catch(err => handleError(err));
	}
	$scope.getData();

	$scope.asignarEim = function() {
		
		var eim = $("#eim").val();
		var list = {
			'puntasActulizar' :[]
		  };
	
		var csp = [] ;
		$(":checkbox[name=check]").each(function() {
			if (this.checked) {
			  csp.push($(this).val());
			}
		  });
		  for(var i= 0; i < csp.length; i++) {
		
		   list.puntasActulizar.push({ 
				"idCampo"    : csp[i],
				"valorNuevo"  : eim,
			});
		}
	if ($scope.validateGen(csp)){
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
		$scope.updateEim(list);
		}
	}
	$scope.updateEim = function (list){
		let tituloAccion = "Crear relaci\o00EDn Eims";
		let mensajeEnvio = 'Ha ocurrido un error al crear la relaci\o00EDn Eims' + list;
		genericService.updateEim(list).then(function success(response){
			if(response.data !== undefined){
				if(response.data.respuesta){
					if(response.data.result){
						mensajeEnvio = 'Se ha creado la relaci\o00EDn Eims';
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio,MENSAJE_ACCION_EXITO, tituloAccion);
						toastr.success('Se ha asignado correctamente el EIM');
						
						swal.close();
					} else {
						swal.close();
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						mostrarMensajeErrorAler(response.data.resultDescripcion);
					}
				} else {
				swal.close();
				objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
				mostrarMensajeErrorAler(response.data.resultDescripcion);
			}
		}

		});
		$scope.banderaCspSinEim = false;
		$scope.cambiarVista(1);

	}

	$scope.validateGen = function (csp) {
		let text = "";
		if ($("#eim").val() === "" || $("#eim").val() === undefined) {
			$("#eim").addClass("input-valid-error");
			text += "<li>Asigne un EIM</li>";
		}
		
		if (csp.length === 0 ) {
			$("#check").addClass("input-valid-error");
			text += "<li>Seleccione un CSP</li>";
		}
		if (text !== "") {
			let info = "Verifica los siguientes campos: " + text;
			mostrarMensajeWarningValidacion(info);
			$scope.initWizard();
			return false;
		} else {
			return true;
		}
	}
	

	// PROXIMO A ELIMINAR. 
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
			idEstados: [
				201, 200, 202
			],
			fechaInicio: "2022-09-10",
			fechaFin: "2022-09-23",
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}
		let mensaje = "";
		let bandera = true;
		if (bandera) {
			if (tableCspSinEim) {
				tableCspSinEim.destroy()
			}
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
				"columns": [null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}
	function format(d) {
		return (
			'<div class="col-10 table-responsive" style="margin-top: 1em; padding: 0;">'+
			'<table id="tableDetenida" class="table">' +
			'<thead id="thead_Detenida">'+
			'<tr><th>OT</th><th>Fase</th><th>Subcategoria</th><th>Fecha de Creación</th><th>Estatus</th><th>Solicitante</th></tr>'	+
			'<tr>' +
			'<td>Mensaje OT:</td>' +
			'<td>Mensaje Fase:</td>' +
			'<td>Mensaje Subcategoria:</td>' +
			'<td>Mensaje Fecha:</td>' +
			'<td>Mensaje Estatus:</td>' +
			'<td>' +
			 d[2] +
			'</td>' +
			'</tr>' +

			'<tr>' +
			'<td>Mensaje OT-2:</td>' +
			'<td>Mensaje Fase-2:</td>' +
			'<td>Mensaje Subcategoria-2:</td>' +
			'<td>Mensaje Fecha-2</td>' +
			'<td>Mensaje Estatus-2</td>' +
			'<td>' +
			 d[2] +
			'</td>' +
			'</tr>' +
			
			'</thead>'+
			'</table>'+
			'</div>'
			
		);
	}
	$scope.consultarPendientesPorImplementar = function(isSwal){
		let params = {
			idOrdenTrabajo: "",
			folioSistema: "",
			idClaveCliente: "",
			idEstatus: [
				1
			],
			idEstados: [
				201, 200, 202
			],
			fechaInicio: "2022-09-10",
			fechaFin: "2022-09-23",
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}
		let arraRow = [];
		if (isSwal) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }

        if (tablePendientesPorImplementar) {
            tablePendientesPorImplementar.destroy();
        }
		genericService.bandejaPendientes(params).then(function success(response){
			if(response.data !== undefined){
				if(response.data.respuesta){
					if (response.data.result) {
						if (response.data.result.resultado) {
							
							$scope.listaValidacion = response.data.result.resultado;
							$.each(response.data.result.resultado, function (i, elemento){
								let row = [];
								row[0] = '<a id="mostrar-segundo-nivel-' + elemento.os + '" class="option-mas-implementados segundo-nivel-table-implementados" tag-position="' + elemento.os + '" tag-hide="false"><i id="icono-implementados-' + elemento.id + '" class="icono-implementados fas fa-angle-down" aria-hidden="true"></i></a>';
								row[1] = elemento.vertical ? elemento.vertical : 'Sin informaci&oacute;n';
								row[2] = elemento.celula ? elemento.celula : 'Sin informaci&oacute;n';
								row[3] = elemento.nombreEim ? elemento.nombreEim : 'Sin informaci&oacute;n';
								row[4] = elemento.cliente ? elemento.cliente : 'Sin informaci&oacute;n';
								row[5] = elemento.idCotizacion ? elemento.idCotizacion : 'Sin informaci&oacute;n';
								row[6] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
								row[7] = elemento.os ? elemento.os : 'Sin informaci&oacute;n';
								row[8] = elemento.cuentaFactura ? elemento.cuentaFactura : 'Sin informaci&oacute;n';
								row[9] = elemento.fechaVenta ? elemento.fechaVenta : 'Sin informaci&oacute;n';
								row[10] = elemento.plazaVenta ? elemento.plazaVenta : 'Sin informaci&oacute;n';
								row[11] = elemento.plazaInstalacion ? elemento.plazaInstalacion : 'Sin informaci&oacute;n';
								//monto
								row[12] = elemento.idCuentaFactura ? elemento.idCuentaFactura : 'Sin informaci&oacute;n';
								//estatus
								row[13] = elemento.idOportunidad ? elemento.idOportunidad : 'Sin informaci&oacute;n';
								//fecha compromiso
								row[14] = elemento.fechaAgenda ? elemento.fechaAgenda : 'Sin informaci&oacute;n';
								//cuadrilla
								row[15] = elemento.tipoCuadrilla ? elemento.tipoCuadrilla : 'Sin informaci&oacute;n';
								//tipo de servicio <--
								row[16] = elemento.nombreLiderTecnico ? elemento.nombreLiderTecnico : 'Sin informaci&oacute;n';

								arraRow.push(row);
							})
						} else{
							toastr.error(response.data.resultDescripcion);
						}
					} else{
						toastr.warning('No se encontraron Eims');
					}
				} else{
					toastr.warning(response.data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error al consultar los Eims');
			}
	
			tablePendientesPorImplementar = $('#tablePendientesPorImplementar').DataTable({
				"paging": true,
				"searching": false,
				"lengthChange": false,
				"ordering": true,
				"pageLength": 10,
				"info": true,
				"scrollX": false,
				"data": arraRow,
				"autoWidth": false,
				"language": idioma_espanol_not_font,
				"aoColumnDefs": [
					{ "aTargets": [16], "bSortable": false }
				]
			});
			swal.close();

		})
				
	}

	$scope.consultarDependencia = function(isSwal){
		let params = {
			idOrdenTrabajo: "",
			folioSistema: "",
			idClaveCliente: "",
			idEstatus: [
				1
			],
			idEstados: [
				201, 200, 202
			],
			fechaInicio: "2022-09-10",
			fechaFin: "2022-09-23",
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}
		let arraRow = [];
		if (isSwal) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }

        if (tableDependencia) {
            tableDependencia.destroy();
        }
		genericService.bandejaDependencias(params).then(function success(response){
			if(response.data !== undefined){
				if(response.data.respuesta){
					if (response.data.result) {
						if (response.data.result.resultado) {
							$scope.dependencia = response.data.result.resultado;
							$.each(response.data.result.resultado, function (i, elemento){
								let row = [];
								row[0] = '<a id="mostrar-segundo-nivel-' + elemento.os + '" class="option-mas-implementados segundo-nivel-table-implementados" tag-position="' + elemento.os + '" tag-hide="false"><i id="icono-implementados-' + elemento.os + '" class="icono-implementados fas fa-angle-down" aria-hidden="true"></i></a>';
								//FOLIO
								row[1] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
								//COTIZACION
								row[2] = elemento.idCotizacion ? elemento.idCotizacion : 'Sin informaci&oacute;n';
								//IDBRM
								row[3] = elemento.idVendedor ? elemento.idVendedor : 'Sin informaci&oacute;n';
								//CUENTA FACTURA
								row[4] = elemento.cuentaFactura ? elemento.cuentaFactura : 'Sin informaci&oacute;n';
								//TIPO DE CUADRILLA
								row[5] = elemento.tipoCuadrilla ? elemento.tipoCuadrilla : 'Sin informaci&oacute;n';
								//TIPO DE DEPENDENCIA
								row[6] = elemento.fechaVenta ? elemento.fechaVenta : 'Sin informaci&oacute;n';
								//NUM DE OS
								row[7] = elemento.os ? elemento.os : 'Sin informaci&oacute;n';
								arraRow.push(row);
							})
						} else{
							toastr.error(response.data.resultDescripcion);
						}
					} else{
						toastr.warning('No se encontraron Dependencias');
					}
				} else{
					toastr.warning(response.data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error al consultar los Dependencias');
			}
	
			tableDependencia = $('#tableDependencia').DataTable({
				"paging": true,
				"searching": false,
				"lengthChange": false,
				"ordering": true,
				"pageLength": 10,
				"info": true,
				"scrollX": false,
				"data": arraRow,
				"autoWidth": false,
				"language": idioma_espanol_not_font,
				"aoColumnDefs": [
					{ "aTargets": [7], "bSortable": false }
				]
			});
			swal.close();

		})
				
	}
	//Table Implentacion
	$scope.consultarImplementacion = function(isSwal){
		let params = {
			idOrdenTrabajo: "",
			folioSistema: "",
			idClaveCliente: "",
			idEstatus: [
				1
			],
			idEstados: [
				201, 200, 202
			],
			fechaInicio: "2022-09-10",
			fechaFin: "2022-09-23",
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}
		let arraRow = [];
		if (isSwal) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
        }

        if (tableimplementacion) {
            tableimplementacion.destroy();
        }
		genericService.bandejaImplementacion(params).then(function success(response){
			if(response.data !== undefined){
				if(response.data.respuesta){
					if (response.data.result) {
						if (response.data.result.resultado) {
							$scope.implementacion = response.data.result.resultado;
							$.each(response.data.result.resultado, function (i, elemento){
								let row = [];
								row[0] = '<a id="mostrar-segundo-nivel-' + elemento.os + '" class="option-mas-implementados segundo-nivel-table-implementados" tag-position="' + elemento.os + '" tag-hide="false"><i id="icono-implementados-' + elemento.os + '" class="icono-implementados fas fa-angle-down" aria-hidden="true"></i></a>';
								//FOLIO
								row[1] = elemento.csp ? elemento.csp : 'Sin informaci&oacute;n';
								//COTIZACION
								row[2] = elemento.idCotizacion ? elemento.idCotizacion : 'Sin informaci&oacute;n';
								//IDBRM
								row[3] = elemento.idVendedor ? elemento.idVendedor : 'Sin informaci&oacute;n';
								//CUENTA FACTURA
								row[4] = elemento.cuentaFactura ? elemento.cuentaFactura : 'Sin informaci&oacute;n';
								//TIPO DE CUADRILLA
								row[5] = elemento.tipoCuadrilla ? elemento.tipoCuadrilla : 'Sin informaci&oacute;n';
								//TIPO DE DEPENDENCIA
								row[6] = elemento.os ? elemento.os : 'Sin informaci&oacute;n';
								//ESTATUS
								row[7] = elemento.idLiderTecnico ? elemento.idLiderTecnico : 'Sin informaci&oacute;n';
								arraRow.push(row);
							})
						} else{
							toastr.error(response.data.resultDescripcion);
						}
					} else{
						toastr.warning('No se encontraron Dependencias');
					}
				} else{
					toastr.warning(response.data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error al consultar los Dependencias');
			}
	
			tableimplementacion = $('#tableimplementacion').DataTable({
				"paging": true,
				"searching": false,
				"lengthChange": false,
				"ordering": true,
				"pageLength": 10,
				"info": true,
				"scrollX": false,
				"data": arraRow,
				"autoWidth": false,
				"language": idioma_espanol_not_font,
				"aoColumnDefs": [
					{ "aTargets": [7], "bSortable": false }
				]
			});
			swal.close();

		})
				
	}
	//END
	$scope.consultarPendientesPorImplementarBASH = function () {
		//let clustersparam = [];
		//clustersparam = $("#jstreeGeografia-3").jstree("get_selected", true).filter(e => e.original.nivel == $scope.nivelArbolPendientesPorImplementar).map(e => parseInt(e.id));

		let params = {
			idOrdenTrabajo: "",
			folioSistema: "",
			idClaveCliente: "",
			idEstatus: [
				1
			],
			idGeografias: [
				3427,3428,3429,
				3430,3431,3432,3433,3255,3256,3257,3254,3253,3252,3251,3669,3668,3667,3367,3363,3364,3362,3361,3365,3366,3368,3369,3360,3359,3358,3357,3437,3442,3443,3438,3441,3439,3440,3444,3446,3445,3435,3434,3436,3228,3229,3230,3231,3232,3233,3456,3457,3458,3449,3450,3451,3447,3448,3453,3454,3455,3452,3168,3166,3167,3161,3162,3165,3163,3164,3169,3025,3022,3021,3023,3024,3017,3019,3018,3020,3026,3027,3028,3029,3057,3058,3059,3060,3064,3061,3062,3063,3352,3349,3348,3351,3350,3581,3582,3583,3589,3588,3587,3584,3590,3585,3586,3579,3580,3577,3578,3155,3156,3159,3160,3158,3157,3210,3214,3211,3212,3213,3562,3560,3561,3563,3564,3566,3567,3565,3570,3569,3568,3717,3620,3618,3619,3621,3622,3626,3623,3625,3624,3634,3632,3633,3631,3630,3629,3628,3627,3066,3065,3073,3068,3067,3071,3069,3072,3070,3046,3045,3043,3044,3048,3047,3042,3053,3051,3052,3056,3054,3055,3050,3049,3259,3258,3265,3264,3263,3262,3260,3261,3726,3727,3728,3695,3694,3696,3698,3697,3693,3699,3688,3692,3689,3691,3690,3664,3666,3665,3663,3662,3661,3642,3641,3638,3635,3636,3637,3640,3639,3684,3687,3686,3682,3681,3685,3683,3189,3190,3191,3192,3193,3250,3245,3247,3249,3248,3246,3271,3272,3273,3274,3269,3266,3267,3268,3270,3218,3219,3215,3216,3217,3221,3220,3222,3223,3279,3275,3276,3277,3280,3278,3197,3194,3195,3196,3573,3576,3574,3575,3572,3571,3322,3323,3318,3316,3321,3320,3319,3317,3127,3130,3129,
				3126,3128,3125,3124,3679,3673,3674,3671,3672,3677,3676,3675,3678,3670,3680,3181,3179,3178,3180,3186,3187,3185,3188,3183,3184,3182,3307,3306,3308,3310,3309,3311,3314,3312,3315,3313,3324,3325,3326,3327,3330,3331,3329,3328,3719,3718,3720,3721,3725,3722,3723,3724,3415,3414,3412,3411,3413,3398,3397,3396,3403,3402,3404,3410,3405,3401,3407,3406,3399,3400,3408,3409,3177,3175,3176,3173,3174,3170,3171,3172,3078,3077,3075,3076,3082,3080,3079,3081,3083,3074,3286,3287,3285,3284,3282,3281,3283,3288,3289,3292,3298,3296,3304,3302,3295,3303,3294,3305,3291,3290,3293,3299,3297,3300,3301,3463,3464,3465,3461,3459,3460,3462,3468,3467,3469,3470,3471,3472,3466,3473,3376,3377,3378,3380,3381,3382,3383,3379,3384,3385,3388,3387,3386,3716,3615,3616,3617,3612,3611,3613,3614,3391,3392,3393,3394,3395,3389,3390,3205,3207,3209,3208,3203,3200,3202,3204,3201,3206,3198,3199,3736,3737,3033,3032,3031,3030,3037,3040,3038,3041,3034,3036,3035,3039,3145,3144,3146,3143,3142,3140,3141,3653,3652,3650,3649,3655,3654,3651,3656,3648,3598,3595,3596,3597,3370,3371,3374,3375,3372,3373,3338,3339,3337,3340,3341,3343,3346,3345,3344,3342,3347,3607,3606,3610,3605,3608,3609,3424,3425,3426,3423,3422,3417,3416,3421,3420,3419,3418,3132,3133,3134,3131,3227,3226,3225,3224,3093,3094,3088,3084,3087,3086,3089,3085,3090,3091,3092,3095,3096,3332,3334,3336,3335,3333,3591,3594,3593,3592,3521,3520,3522,3524,3523,3527,3526,3530,3525,3528,3529,3519,3101,3107,3099,3103,3104,3106,3100,3102,3105,3108,3109,3097,3098,3110,3111,3112,3115,3114,3116,3113,3001,3007,3002,3003,3008,3004,3006,3005,3355,3356,3354,3353,3644,3643,3645,3647,3646,3559,3557,3558,3556,3544,3546,3552,3554,3555,3553,3545,3547,3548,3549,3551,3550,3535,3539,3541,3540,3543,3542,3536,3537,3538,3534,3531,3532,3533,3016,3014,3015,3012,3013,3009,3011,3010,3734,3735,3733,3732,3711,3709,3712,3710,3708,3707,3700,3701,3702,3703,3705,3704,3706,3139,3137,3138,3135,3136,3484,3485,3487,3486,3488,3483,3478,3480,3474,3475,3476,3477,3482,3479,3481,3117,3118,3119,3121,3123,3122,3120,3147,3148,3154,3150,3153,3149,3151,3152,3600,3602,3601,3599,3603,3604,3494,3493,3495,3498,3496,3497,3490,3492,3491,3500,3499,3501,3502,3489,3241,3236,3237,3238,3239,3243,3244,3242,3234,3240,3235,3503,3508,3507,3512,3513,3506,3509,3511,3510,3504,3505,3518,3517,3514,3516,3515,11732
			],
			idEstados: [
				201, 200, 202
			],
			fechaInicio: "2022-09-10",
			fechaFin: "2022-09-23",
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}
		let mensaje = "";
		let bandera = true;
		if(bandera){
			if(tablePendientesPorImplementar){
				tablePendientesPorImplementar.destroy()
			}
			tablePendientesPorImplementar = $("#tablePendientesPorImplementar").DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"lengthChange": false,
				"searching": false,
				"pageLength": 10,
				"ajax":{
					"url": "req/consultarPendientesPorImplementar",
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
			"columns": [
				{
					className: 'dt-control',
					orderable: false,
					data: null,
					defaultContent: '',
				},
				null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null
			],
			"language": idioma_espanol_not_font
		});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	//setTimeout(function(){
	//	$('#tablePendientesPorImplementar tbody').on('click', 'td.dt-control', function () {
	//		var tr = $(this).closest('tr');
	//		var row = tablePendientesPorImplementar.row(tr);
	 
	//		if (row.child.isShown()) {
	//			row.child.hide();
	//			tr.find('svg').attr('data-icon', 'plus-circle');
	//		} else {
	//			row.child(format(row.data())).show();
	//			tr.find('svg').attr('data-icon', 'minus-circle');
	//		}
	//	});
	//}, 4000);
	
	$(document).ready(function() {
		$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	});

	
	
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

		tablevalidacion = $('#tablevalidacion').DataTable({
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

		tableDependencia = $('#tableDependencia').DataTable({
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

		tableimplementacion = $('#tableimplementacion').DataTable({
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
		
		tablePendientesPorImplementar = $('#tablePendientesPorImplementar').DataTable({
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
		$('#searchGeo-1').on('keyup', function () {
			$("#jstreeGeografia-1").jstree("search", this.value);
		})

		$('#searchGeo-2').on('keyup', function () {
			$("#jstreeGeografia-3").jstree("search", this.value);
		})

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
		if (typeTable == 'reportevalidacion') {
			$.each(arraySort, function (index, elemento) {
				tablevalidacion.row(index).data(elemento);
			});
		}
		if (typeTable == 'reporteCspSinEim') {
			$.each(arraySort, function (index, elemento) {
				tablePendientesPorImplementar.row(index).data(elemento);
			});
		}
		if (typeTable == 'reporteDependencia') {
			$.each(arraySort, function (index, elemento) {
				tableDependencia.row(index).data(elemento);
			});
		}
		if (typeTable == 'reporteImplementacion') {
			$.each(arraySort, function (index, elemento) {
				tableimplementacion.row(index).data(elemento);
			});
		}
	}

}]);