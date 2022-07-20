var app = angular.module('reportesPIApp', []);
var objectTempAccion;

app.controller('reportesController', ['$scope', '$q', 'reportesPIService', 'genericService', function ($scope, $q, reportesPIService, genericService) {
	app.filtroReportes($scope, reportesPIService)
	$scope.all_cluster = [];
	$scope.listaGeografia = [];
	let reporteSeguimientoTable;
	let reporteCierreTable;
	let reporteAsignadasTable;
	let tableTecnicosTiposOrdenes;
	$scope.filtrosGeneral = {};
	$scope.repDiario = {};
	$scope.repCierreDiario = {};
	$scope.repAsignadas = {};
	$scope.filtroEstatusInt = {};
	$scope.listaGeografiaReporte = {};
	$scope.listaTecnicos = [];
	$scope.isTablaTecnicos = false;

	$scope.tipoReporte = '';

	//Permisos y llaves
	$scope.nfiltrogeografiaSeguimientoDiario = "";
	$scope.nfiltrogeografiaTecnicosTiposOrdenes = "";
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
	$scope.configPermisoAccionConsultaTecnicosTiposOrdenes = false;
	$scope.configPermisoAccionGenerarReporteTecnicosTiposOrdenes = false;

	//Total rows en tabla para excel
	$scope.resultReporteDiario = null;
	$scope.resultReporteCierre = null;
	$scope.resultReporteAsignadas = null;

	$scope.tempSeguimientoDiario = [];
	$scope.tempReporteCierre = [];
	$scope.tempReporteAsignadas = [];

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
		});

		$('#searchGeo-cierre').on('keyup', function () {
			$("#jstree-proton-cierre").jstree("search", this.value);
		});

		$('#searchGeo-asignadas').on('keyup', function () {
			$("#jstree-proton-asignadas").jstree("search", this.value);
		});
		
		$('#searchGeo-tecnicos').on('keyup', function () {
			$("#jstree-proton-tecnicos").jstree("search", this.value);
		});
		
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
			
			if ($scope.tipoReporte === 'tecnicos') {
				$scope.getTextGeografia('jstree-proton-tecnicos', 'cluster-tecnicos');
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
	
	$scope.consultarTecnicosTiposOrdenes = function() {
		
		$scope.isTablaTecnicos = false;
		$scope.listaSkills = [];
		$scope.listaTecnicos = [];
		
		if($scope.nfiltrogeografiaTecnicosTiposOrdenes === undefined || $scope.nfiltrogeografiaTecnicosTiposOrdenes === null || $scope.nfiltrogeografiaTecnicosTiposOrdenes === ""){
			$scope.nfiltrogeografiaTecnicosTiposOrdenes = $scope.obtenerNivelUltimoJerarquia();
//			$scope.nfiltrogeografiaTecnicosTiposOrdenes = 2;
		}
		
		let clustersparam = $("#jstree-proton-tecnicos").jstree("get_selected", true).filter(e => e.original.nivel == $scope.nfiltrogeografiaTecnicosTiposOrdenes).map(e => parseInt(e.id));
		let params = {"idGeografias": clustersparam};
		
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        reportesPIService.consultarTecnicosTiposOrdenes(params).then(function success(response) {
            if (response.data !== undefined) {
            	if (response.data.respuesta) {
                	if (response.data.result !== undefined) {
                		if(response.data.result.tecnicos !== null){
    	            		if(response.data.result.tecnicos.length > 0){
    	            			$scope.listaSkills = response.data.result.encabezados;
    	            			$scope.listaTecnicos = response.data.result.tecnicos;
    	            			$scope.isTablaTecnicos = true;
    	            			$scope.pintarDatosTablaTecnicos();
    	            		}else{
    	            			mostrarMensajeInformativo("¡Actualmente no existen técnicos!");
    	            		}
                		}else{
                			mostrarMensajeInformativo("¡Actualmente no existen técnicos!");
                		}
                    }else{
                    	mostrarMensajeInformativo("¡Actualmente no existen técnicos!");
                    }                 
                } else {
                	mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                }
            } else {
                mostrarMensajeErrorAlert("Error interno en el servidor.");
            }
            swal.close();
        });
	}
	
	$scope.pintarDatosTablaTecnicos = function() {
		if (tableTecnicosTiposOrdenes) {
			tableTecnicosTiposOrdenes.destroy()
		}
		angular.forEach($scope.listaTecnicos,function(tec,index){
			var skillsRegistradas = [];
			skillsRegistradas = tec.skills.replace(/ /g, "").split(",");
			tec.listaSkills = angular.copy($scope.listaSkills);
			angular.forEach(tec.listaSkills,function(skill,index){
				var isSkillRegistrada = skillsRegistradas.find((e) => e == skill.id) != undefined;
				if(isSkillRegistrada){
					skill.isRegistrada = true;
				}else{
					skill.isRegistrada = false;
				}
			});
		});
		
		var dataTecnicos = [];
		
		angular.forEach($scope.listaTecnicos,function(tec,index){
			let rowTec = [];
			rowTec[0] = tec.nombretecnico;
			rowTec[1] = tec.usuario;
			angular.forEach(tec.listaSkills,function(skills,index){
				if(skills.isRegistrada){
					rowTec[index + 2] = "<i class='fa fa-check'></i>";
				}else{
					rowTec[index + 2] = "";
				}
			});
            dataTecnicos.push(rowTec);
        });

		var titulos = [{ "title": "Cuadrilla", "sClass": "rowCuadrillaTecnico", "targets": 0 },{ "title": "Usuario FFM", "sClass": "rowUsuarioFFMTecnico", "targets": 1 }];
		
		angular.forEach($scope.listaSkills,function(skill,index){
			var pos = index + 2;
			titulos.push({ "title": skill.descripcion, "sClass": "cuerpoTablaTecnicos", "targets": pos });
		});
		
		tableTecnicosTiposOrdenes = $('#tableTecnicosTiposOrdenes').DataTable({
            "paging": true,
            "lengthChange": false,
            "ordering": false,
            "pageLength": 10,
            "info": true,
            "searching": true,
//            "scrollX": true,
            "columnDefs": titulos,
            "data": dataTecnicos,
            "autoWidth": false,
            "language": idioma_espanol_not_font
        });
		
	}
	
	$scope.generarReporteTecnicosTiposOrdenes = function() {
		if($scope.listaTecnicos.length > 0){
			let params = {
					"tecnicos" : $scope.listaTecnicos
			}
			
			swal({ text: 'Espera un momento...', allowOutsideClick: false });
	        swal.showLoading();
	        reportesPIService.generarReporteTecnicosTiposOrdenes(params).then((result) => {
				swal.close()
				if (result.data.respuesta) {
					const data = JSON.parse(result.data.result).tecnicos;
					const fileName = 'Reporte skills instaladores';
					const exportType = 'xls';

					window.exportFromJSON({ data, fileName, exportType });
				} else {
					mostrarMensajeErrorAlert("Ocurrió un error al generar el reporte.");
				}
				swal.close();
			}).catch(err => handleError(err));
		}else{
			mostrarMensajeInformativo("¡Actualmente no existen técnicos para generar el reporte!");
		}
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
			case 'tecnicos':
				geografiaReporte = angular.copy($scope.listaGeografiaReporte.tecnicos);
				//$scope.consultarTecnicosTiposOrdenes();
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
					case 'tecnicos':
						$scope.getTextGeografia('jstree-proton-tecnicos', 'cluster-tecnicos');
//						if ($scope.resultReporteAsignadas == null) {
							$scope.consultarTecnicosTiposOrdenes();
//						}
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
			case 'tecnicos':
				$scope.listaGeografiaReporte.tecnicos.map((e) => {
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
							$scope.nfiltrogeografiaTecnicosTiposOrdenes = llavesResult.N_FILTRO_GEOGRAFIA_TECNICOS_TIPOS_ORDENES ? llavesResult.N_FILTRO_GEOGRAFIA_TECNICOS_TIPOS_ORDENES : llavesResult.N_FILTRO_GEOGRAFIA;
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
								$scope.configPermisoAccionConsultaTecnicosTiposOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaTecnicosTiposOrdenes" })[0] != undefined);
								$scope.configPermisoAccionGenerarReporteTecnicosTiposOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaReporteTecnicosTiposOrdenes" })[0] != undefined);
								objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
								objectTempAccion.inicializarBotonAccionesRecientes();
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
							
							if ($scope.configPermisoAccionConsultaTecnicosTiposOrdenes) {
								if (firstNav === '') {
									firstNav = 'tecnicosTiposOrdenes-tab';
									$scope.tipoReporte = 'tecnicos';
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
							
							if ($scope.configPermisoAccionConsultaTecnicosTiposOrdenes) {
								let geografiaTec = $scope.ordenarGeografia(results[0].data.result.geografia, $scope.nfiltrogeografiaAsignadas);
								$scope.listaGeografiaReporte.tecnicos = angular.copy(geografiaTec);
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
		filtroParent.checkedOpcion = !filtroParent.checkedOpcion
		filtroParent.children.map(function (e) {
			e.checkedOpcion = filtroParent.checkedOpcion
			return e
		})
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
		
//		tableTecnicosTiposOrdenes = $('#tableTecnicosTiposOrdenes').DataTable({
//			"paging": true,
//			"lengthChange": false,
//			"bSort": false,
//			"searching": false,
//			"ordering": false,
//			"pageLength": 10,
//			"info": true,
//			"autoWidth": true,
//			"language": idioma_espanol_not_font,
//			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">'
//		});

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
						$scope.tempSeguimientoDiario = json.data;
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
			let tituloAccion = "Descarga reporte seguimiento diario";
			let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';

			reportesPIService.consultaReporteDiario(paramsR).then((result) => {
				swal.close()
				if (result.data.respuesta) {
					const data = JSON.parse(result.data.result).ordenes
					const fileName = 'Resporte Seguimiento Diario'
					const exportType = 'xls'
					mensajeEnvio = 'Se ha descargado el reporte';
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
					window.exportFromJSON({ data, fileName, exportType })
				} else {
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
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
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaCierre)
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
						$scope.tempReporteCierre = json.data;
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
			.filter(e => e.original.nivel == $scope.nfiltrogeografiaAsignadas)
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
			let tituloAccion = "Descarga reporte cierre diario";
			let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';
			reportesPIService.consultaReporteCierreDiario(paramsR).then((result) => {
				swal.close()
				if (result.data.respuesta) {
					const data = JSON.parse(result.data.result).ordenes
					const fileName = 'Resporte Cierre Diario'
					const exportType = 'xls'
					mensajeEnvio = 'Se ha descargado el reporte';
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
					window.exportFromJSON({ data, fileName, exportType })
				} else {
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
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
						$scope.tempReporteAsignadas = json.data;
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
			let tituloAccion = "Descarga reporte asignadas compensaci&oacute;n";
			let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';
			reportesPIService.consultaReporteAsignadas(paramsR).then((result) => {
				swal.close()
				if (result.data.respuesta) {
					const data = JSON.parse(result.data.result).ordenes
					const fileName = 'Resporte Asignadas Compensacion'
					const exportType = 'xls'
					mensajeEnvio = 'Se ha descargado el reporte';
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
					window.exportFromJSON({ data, fileName, exportType })
				} else {
					objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
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
		if (typeTable == 'seguimientoDiario') {
			arraySort = angular.copy($scope.tempSeguimientoDiario);
		} else if (typeTable == 'cierreDiario') {
			arraySort = angular.copy($scope.tempReporteCierre); 
		} else if (typeTable == 'asignadasCompensacion') {
			arraySort = angular.copy($scope.tempReporteAsignadas); 
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

		if (typeTable == 'seguimientoDiario') {
			$.each(arraySort, function (index, elemento) {
				reporteSeguimientoTable.row(index).data(elemento);
			});
		} else if (typeTable == 'cierreDiario') {
			$.each(arraySort, function (index, elemento) {
				reporteCierreTable.row(index).data(elemento);
			});
		} else if (typeTable == 'asignadasCompensacion') {
			$.each(arraySort, function (index, elemento) {
				reporteAsignadasTable.row(index).data(elemento);
			}); 
		}
	}

}]);