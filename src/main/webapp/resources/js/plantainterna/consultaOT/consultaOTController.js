var app = angular.module('consultaOTApp', []);
var tableMaterialesDespacho;
app.controller('consultaOTController', ['$scope', '$q', 'consultaOTService', 'genericService', function ($scope, $q, consultaOTService, genericService) {

	$("#moduloConsultaOt").addClass('active')

	$scope.all_cluster = [];
	let otTabla;
	let tableRecoleccionOt;
	let is_consulta_info_ot = false;
	let is_consulta_comentarios = false;
	let is_consulta_historico = false;
	let is_consulta_soluciones = false;
	let is_consulta_corte_individual = false;
	let is_consulta_cambio_equipo = false;
	let is_consulta_reubicacion = false;
	let is_consulta_cambio_plan = false;
	let is_consulta_potencia = false;
	let is_consulta_equipos = false;
	let is_consulta_dispositivos = false;
	let is_consulta_ip = false;
	let is_consulta_informacion_Red = false;
	let is_consulta_actividad_tecnico = false;
	let isConsultaRecoleccionOt = false;
	let datatable_Equipos;
	let datatable_Dispositivos;
	let dataTable_IP;
	$scope.filtrosGeneral = {};
	$scope.movimientos = [];
	$scope.comentarioConsultaOT = '';
	$scope.elementosRegistro;
	$scope.detalleSoporteObj = {};
	$scope.detallePagoObj = {};
	let isConsultaDetalleSoporte = false;
	let isConsultaDetallePago = false;
	$scope.evidenciaDetalleEquipoV = '';
	$scope.evidenciaDetalleEquipoN = '';
	let isConsultaDispositivo = false
	let isConsultaMateriales = false;
	$scope.dispositivosArrayTemp = [];
	$scope.listadoConsultaOtsDisponibles = [];
	$scope.listEvidenciaImagenes = {};
	$scope.listImagenesTipo = [];
	$scope.tecnicoConsultaRecoleccion = {};
	$scope.equiposTecnicoRecoleccion = [];
	$scope.permisosConfigUser = [];
	$scope.configPermisoAccionConsultaOrdenes = false;
	$scope.configPermisoAccionDescargaReporteOrdenes = false;
	let dispositivoOtTable;
	let pagosOtTable;
	$scope.tecnicoConsultaMateriales = {
		almacen: "",
		apellidoMaterno: "Calder",
		apellidoPaterno: "Rodrigu",
		cantidadOts: 0,
		centro: "",
		color: "#2424257d",
		descipcionEstatusTecnico: "Fuera De Servicio",
		descripcionTipoUsuario: "Tecnico",
		id: 79647,
		idEstatusTecnico: 5,
		idTecnico: 79647,
		idTipoUsuario: 7,
		latitud: 1,
		listadoOts: [],
		longitud: -1,
		nombre: "Antonio",
		nombreCompleto: "Antonio Rodrigu Calder",
		numContacto: "8888888888",
		numeroEmpleado: "6506734",
		urlFotoPerfil: "https://firebasestorage.googleapis.com/v0/b/totalplay-ffm-core-dev.appspot.com/o/ANTONIO RODRIGU CALDER?alt=media&token=uuidv4()",
		usuarioFFM: "6506734",
	}
	$scope.nivelGeografia = '';
	$scope.nivelIntervenciones = '';
	$scope.nivelEstatusPendientes = '';
	
	$scope.infoDetalleOtPe = {};
	$scope.mostrarTooltipDetencion = false;
	
	let tableOrdenesPlantaExternaOt;
	let isConsultaOrdenesPE = false;
	$scope.listOrdenesPE = [];
	
	$scope.consultaOT = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		$scope.elementosRegistro = 0;

		//nivel estatus
		/*
		let tempNivelEstatus;
		if($scope.nivelEstatusPendientes){
			tempNivelEstatus=$scope.nivelEstatusPendientes
		}else{
			tempNivelEstatus=$scope.obtenerUltimoNivelEstatus()
		}
		*/
		let estatusOrdenes = []
		estatusOrdenes = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponibles, $scope.nivelEstatusPendientes);
		/*
		angular.forEach($scope.filtrosGeneral.estatusdisponibles , (e, i) => {
			e.children.map((k) => { 
				if( k.checkedOpcion && tempNivelEstatus== k.nivel)
					estatusOrdenes.push(k.id)		
					
				k.children.map((l) => { 
					if( l.checkedOpcion && tempNivelEstatus== l.nivel)
						estatusOrdenes.push(l.id)	
					return l
				})
				  return k; 
			})
			if( e.checkedOpcion && tempNivelEstatus== e.nivel)
				estatusOrdenes.push(e.id)				
		})
		*/


		//nivel intervencion
		/*
		let tempNivelInterven;
		if($scope.nivelIntervenciones){
			tempNivelInterven=$scope.nivelIntervenciones
		}else{
			tempNivelInterven=$scope.obtenerUltimoNivelIntervencion()
		}
		*/
		let subIntTemp = []
		subIntTemp = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nivelIntervenciones);
		/*
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.map((k) => { 
				if( k.checkedOpcion && tempNivelInterven== k.nivel)
					subIntTemp.push(k.id)		
					
				k.children.map((l) => { 
					if( l.checkedOpcion && tempNivelInterven== l.nivel)
						subIntTemp.push(l.id)	
					return l
				})
				  return k; 
			})
			if( e.checkedOpcion && tempNivelInterven== e.nivel)
				subIntTemp.push(e.id)				
		})
		*/

		//nivel geografia
		let ultimonivel;
		if ($scope.nivelGeografia) {
			ultimonivel = $scope.nivelGeografia
		} else {
			ultimonivel = $scope.obtenerNivelUltimoJerarquia();
		}
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
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

		if (document.getElementById('filtro_fecha_inicio_consultaOt').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_consultaOt').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}

		if (isValido) {
			if (otTabla) {
				otTabla.destroy();
			}
			let params = {
				idOrden: $.trim(document.getElementById('idot').value),
				folioSistema: $.trim(document.getElementById('idos').value),
				claveCliente: $.trim(document.getElementById('cuenta').value),
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOt').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOt').value),
				elementosPorPagina: 10
			}

			otTabla = $('#otTable').DataTable({
				"processing": false,
				"ordering": false,
				"serverSide": true,
				"scrollX": false,
				"paging": true,
				"lengthChange": false,
				"searching": false,
				"ordering": false,
				"pageLength": 10,
				"ajax": {
					"url": "req/consultaOT",
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
						$scope.listadoConsultaOtsDisponibles = [];
						if (json.result != undefined && json.result.ordenes != undefined)
							$scope.listadoConsultaOtsDisponibles = json.result.ordenes;

						return json.data;
					},
					"error": function (xhr, error, thrown) {
						handleError(xhr);
					},
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null,null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}

	$scope.realizarConversionAnidado = function (array) {
		let arrayCopy = [];
		angular.forEach(array.filter(e => e.nivel == 1), function (elemento, index) {
			elemento.checkedOpcion = true;
			elemento.children = array.filter(e => e.nivel == 2 && e.idPadre == elemento.id)
			elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : []
			elemento.children.map(e => { e.checkedOpcion = true; return e; })
			arrayCopy.push(elemento)
		})
		return arrayCopy;
	}

	$scope.banderaErrorEstatus = false;
	$scope.banderaErrorIntervencion = false;
	$scope.banderaErrorGeografia = false;

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

	$scope.obtenerUltimoNivelIntervencion = function () {
		return $scope.nivelIntervenciones.sort(compareGeneric)[0].nivel
	}

	$scope.obtenerUltimoNivelEstatus = function () {
		return $scope.nivelEstatusPendientes.sort(compareGeneric)[0].nivel
	}

	$scope.mostrarNombresEstatus = function (array) {
		let arrayNombre = [];
		angular.forEach(array, function (elemento, index) {
			if (elemento.checkedOpcion) {
				arrayNombre.push(elemento.nombre);
			}
			if (elemento.children !== undefined && elemento.children.length > 0) {
				arrayNombre = arrayNombre.concat($scope.mostrarNombresEstatus(elemento.children));
			}
		});
		return arrayNombre;
	}

	$scope.pintarNombreEstatus = function (array, input) {
		let textoEstatus = $scope.mostrarNombresEstatus(array);
		$(input).val(textoEstatus);
		if (textoEstatus.length > 0) {
			$(input).css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.btnAceptarGeografiaConsulta = function () {
		var geografias = $('#jstree-proton-3').jstree("get_selected", true);
		let textoGeografias = [];
		angular.forEach(geografias, (geografia, index) => {
			textoGeografias.push(geografia.text);
		});
		$('#cluster').val(textoGeografias);
		if (textoGeografias.length > 0) {
			$("#cluster").css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.consultarCatalagosPI = function () {
		$q.all([
			genericService.consultarCatalogoIntervenciones(),
			genericService.consulCatalogoGeografia(),
			genericService.consultarCatalogoEstatusDespachoPI(),
			consultaOTService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloConsultaOt" }),
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

							$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;

							if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
								$scope.configPermisoAccionConsultaOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaOT" })[0] != undefined);
								$scope.configPermisoAccionDescargaReporteOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaReporteOT" })[0] != undefined);
							}
							$("#idBody").removeAttr("style");
							validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
							validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
						}
					} else {
						swal.close();
						toastr.warning('No se encontraron datos para la geografia');
						$scope.banderaErrorGeografia = true;
					}
				} else {
					swal.close();
					toastr.warning(results[3].data.resultDescripcion);
					$scope.banderaErrorGeografia = true;
				}
			} else {
				swal.close();
				toastr.error('Ha ocurrido un error en la consulta de geografia')
				$scope.banderaErrorGeografia = true;;
			}

			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						//$scope.filtrosGeneral.tipoOrdenes = $scope.realizarConversionAnidado(results[0].data.result)
						$scope.respaldoTipoOrdenArray = [];
						$scope.respaldoTipoOrdenArray = angular.copy(results[0].data.result);
						$scope.nivelIntervenciones = $scope.nivelIntervenciones ? $scope.nivelIntervenciones : $scope.obtenerUltimoNivelFiltros($scope.respaldoTipoOrdenArray);
						$scope.filtrosGeneral.tipoOrdenes = $scope.conversionAnidadaRecursiva($scope.respaldoTipoOrdenArray, 1, $scope.nivelIntervenciones);
					} else {
						toastr.warning('No se encontraron  tipo ordenes');
						$scope.banderaErrorIntervencion = true;
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
					$scope.banderaErrorIntervencion = true;
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
				$scope.banderaErrorIntervencion = true;
			}

			if (results[2].data !== undefined) {
				if (results[2].data.respuesta) {
					if (results[2].data.result) {
						//$scope.filtrosGeneral.estatusdisponibles = $scope.realizarConversionAnidado(results[2].data.result)
						$scope.respaldoStatusArray = [];
						$scope.respaldoStatusArray = angular.copy(results[2].data.result);
						$scope.nivelEstatusPendientes = $scope.nivelEstatusPendientes ? $scope.nivelEstatusPendientes : $scope.obtenerUltimoNivelFiltros($scope.respaldoStatusArray);
						$scope.filtrosGeneral.estatusdisponibles = $scope.conversionAnidadaRecursiva($scope.respaldoStatusArray, 1, $scope.nivelEstatusPendientes);
					} else {
						toastr.info('No se encontraron catalogo de estatus');
						$scope.banderaErrorEstatus = true;
						swal.close();
					}
				} else {
					toastr.warning(results[2].data.resultDescripcion);
					$scope.banderaErrorEstatus = true;
					swal.close();
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de catalogo de estatus');
				$scope.banderaErrorEstatus = true;
				swal.close();
			}

			if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						if (results[1].data.result.geografia) {
							$scope.listadogeografiacopy = results[1].data.result.geografia
							geografia = results[1].data.result.geografia
							if (!$scope.nivelGeografia)
								$scope.nivelGeografia = $scope.obtenerNivelUltimoJerarquia()

							geografia = geografia.filter((e) => e.nivel <= $scope.nivelGeografia)
							geografia.map((e) => {
								e.parent = e.padre == undefined ? "#" : e.padre;
								e.text = e.nombre;
								e.state = {
									selected: true,
								}
								return e
							})
							if ($scope.configPermisoAccionConsultaOrdenes) {
								$('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
									$scope.pintarNombreEstatus($scope.filtrosGeneral.estatusdisponibles, '#filtro-estatus-substatus');
									$scope.pintarNombreEstatus($scope.filtrosGeneral.tipoOrdenes, '#filtro-intervencion');
									$scope.btnAceptarGeografiaConsulta();
									$scope.consultaOT();
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
						} else {
							swal.close();
							toastr.warning('No se encontraron datos para la geografia');
							$scope.banderaErrorGeografia = true;
						}
					} else {
						swal.close();
						toastr.warning('No se encontraron datos para la geografia');
						$scope.banderaErrorGeografia = true;
					}
				} else {
					swal.close();
					toastr.warning(results[1].data.resultDescripcion);
					$scope.banderaErrorGeografia = true;
				}
			} else {
				swal.close();
				toastr.error('Ha ocurrido un error en la consulta de geografia')
				$scope.banderaErrorGeografia = true;;
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

	$scope.realizarConversionAnidado = function (array) {
		let arrayCopy = []
		angular.forEach(array.filter(e => e.nivel == 1), function (elemento, index) {
			elemento.checkedOpcion = true;
			elemento.children = array.filter(e => e.nivel == 2 && e.idPadre == elemento.id)
			elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : []
			elemento.children.map(e => { e.checkedOpcion = true; return e; })

			angular.forEach(elemento.children, function (elementoJ, indexJ) {
				elementoJ.checkedOpcion = true;
				elementoJ.children = array.filter(e => e.nivel == 3 && e.idPadre == elementoJ.id)
				elementoJ.children = (elementoJ.children !== undefined && elementoJ.children.length > 0) ? elementoJ.children : []
				elementoJ.children.map(e => { e.checkedOpcion = true; return e; })
			})
			arrayCopy.push(elemento)
		})
		return arrayCopy;
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

	$scope.seleccionarTodos = function (paramFiltroParent) {
		paramFiltroParent.map(function (e) {
			e.checkedOpcion = true
		})
		paramFiltroParent.map(function (e) {
			e.children.map(function (j) {
				j.checkedOpcion = true
				return j
			})
		})
	}

	$scope.deseleccionarTodos = function (paramFiltroParent) {
		paramFiltroParent.map(function (e) {
			e.checkedOpcion = false
		})
		paramFiltroParent.map(function (e) {
			e.children.map(function (j) {
				j.checkedOpcion = false
				return j
			})
		})
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

	$scope.setCheckIntervencion = function (elementoInt) {
		elementoInt.checkedOpcion = !elementoInt.checkedOpcion
		elementoInt.subfiltros.map(function (e) {
			e.checkedOpcion = elementoInt.checkedOpcion
			return e
		})
	}

	$scope.setCheckSubIntervencion = function (subInt, intervencion) {
		subInt.checkedOpcion = !subInt.checkedOpcion
		let cantidadSubfiltros = intervencion.subfiltros.length
		let cantidadChecked = intervencion.subfiltros.filter(function (e) { return e.checkedOpcion }).length
		intervencion.checkedOpcion = cantidadSubfiltros !== cantidadChecked ? false : true
	}

	$scope.iniciarConsultaOt = function () {
		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: false
		});
		$('.datepicker').datepicker('update', new Date());

		otTabla = $('#otTable').DataTable({
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

		tableRecoleccionOt = $('#table-recoleccion-temp').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font
		});

		dispositivoOtTable = $('#table_dispositovos_ot').DataTable({
			"paging": true,
			"lengthChange": false,
			"info": true,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"autoWidth": true,
			"language": idioma_espanol_not_font,

		});
		pagosOtTable = $('#table_pagos_ot').DataTable({
			"paging": true,
			"lengthChange": false,
			"info": true,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"autoWidth": true,
			"language": idioma_espanol_not_font,

		});
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
		$scope.consultarCatalagosPI();
	}

	$scope.iniciarConsultaOt();

	$scope.abrirModalCluster = function () {
		$('#modalCluster').modal('show');
		setTimeout(function () {
			$("#searchGeografia").focus();
		}, 750);
	}

	consultaImagenesOT = function (ot, cuenta) {
		let params = {
			orden: ot,
		}
		$('.idoti').text(ot);
		$('.cuenta').text(cuenta);
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$scope.listEvidenciaImagenes = {};
		consultaOTService.consultaImagenesOt(JSON.stringify(params)).then(function success(response) {
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
								let isExist = listaTipos.find((t) => e.idCatEvidencia == t.id)
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

	mostarImagenesCarousel = function () {
		var $imageLinks = $('.imagen-carousel-evidencia');
		var items = [];
		$imageLinks.each(function (index, elemento) {
			var $item = $(this);
			var magItem = {
				src: $item.attr('src'),
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
				},
				open: function () {
					// Disabling focus enforcement by magnific
					$.magnificPopup.instance._onFocusIn = function (e) { };
				}
			}
		});
	}

	$(document.body).on("click", ".carousel-item", function () {
		$(".item-carousel").show();
		$('.carousel-inner:hidden').show(400);
		setTimeout(function () { mostarImagenesCarousel(); }, 500);
	});

	$scope.closeModal = function () {
		$('#modal-imagen-ot').modal('hide');
	}

	$scope.datoOt;
	$scope.datoInt;
	$scope.datoSubInt;
	consultaDetalleOt = function (indexOtConsulta) {
		$scope.infoOtDetalle = {};
		$scope.infoDetalleOtPe = {};
		let otConsultaTemp = $scope.listadoConsultaOtsDisponibles[indexOtConsulta]
		$scope.datoOt = otConsultaTemp.idOrden
		is_consulta_info_trayectoria = false;
		$scope.$apply();
		$scope.consultaDetalleOtGeneric(otConsultaTemp);
	}

	$scope.consultaDetalleOtGeneric = function (ordenObject) {
		let params = {
			idOT:  ordenObject.idOrden,
			idOt:  ordenObject.idOrden
		}
		swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
		swal.showLoading();
		consultaOTService.consultaInfoDetalle(JSON.stringify(params)).then(function success(response) {
			if (response.data !== undefined) {
				if (response.data.respuesta) {
					if (response.data.result.orden) {
						$scope.infoOtDetalle = response.data.result.orden
						is_consulta_info_ot = true;
						$scope.permisosModal = $scope.elementosConfigGeneral.get("MODAL_CO_FLUJO_" + ordenObject.idFlujo).split(",")
						$("#modal-detalle-ot").modal({ backdrop: 'static', keyboard: false });
						$("#modal-detalle-ot").modal('show');
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

	$scope.isTecnicoConsultaMateriales = false;
	$scope.consultaMaterialesOT = function () {
		if (!isConsultaMateriales) {
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			$scope.tecnicoConsultaMateriales = {}
			if (tableMaterialesDespacho) {
				tableMaterialesDespacho.destroy();
			}
			consultaOTService.consultaMaterialOt(JSON.stringify({ idOrden: $scope.datoOt })).then(function success(response) {
				$("#table-materiales-ot tbody").empty()
				if (response.data.respuesta) {
					if (response.data.result) {
						if (response.data.result.detalleGeneral != undefined) {
							if (response.data.result.detalleGeneral.detalleMateriales) {
								$scope.isTecnicoConsultaMateriales = true;
								$scope.tecnicoConsultaMateriales = response.data.result.detalleGeneral
								$scope.tecnicoConsultaMateriales.nombreCommpleto = $scope.tecnicoConsultaMateriales.nombre + ' ' + $scope.tecnicoConsultaMateriales.apellidoPaterno + ' ' + $scope.tecnicoConsultaMateriales.apellidoMaterno
								let tempArrayResult = angular.copy(response.data.result.detalleGeneral.detalleMateriales);
								angular.forEach(tempArrayResult, function (elem, index) {
									$("#table-materiales-ot tbody").append(`
										<tr>
											<td >${elem.sku && elem.sku !== '' ? elem.sku : 'Sin informaci&oacute;n'} </td>
											<td >${elem.descripcion && elem.descripcion !== '' ? elem.descripcion : 'Sin informaci&oacute;n'} </td>
											<td >${elem.tipo && elem.tipo !== '' ? elem.tipo : 'Sin informaci&oacute;n'} </td>
											<td >${elem.grupo && elem.grupo !== '' ? elem.grupo : 'Sin informaci&oacute;n'} </td>
											<td >${elem.lote && elem.lote !== '' ? elem.lote : 'Sin informaci&oacute;n'} </td>
											<td >${elem.numSerie && elem.numSerie !== '' ? elem.numSerie : 'Sin informaci&oacute;n'} </td>
											<td >${elem.familia && elem.familia !== '' ? elem.familia : 'Sin informaci&oacute;n'} </td>
											<td >${elem.docSap && elem.docSap !== '' ? elem.docSap : 'Sin informaci&oacute;n'} </td>
											<td >${transformarTextPrecio(elem.precio)} </td>
											<td >${elem.cantidad && elem.cantidad !== '' ? elem.cantidad : 'Sin informaci&oacute;n'} </td>
											<td >${transformarTextPrecio(elem.costo)} </td>
											<td >${elem.unidad && elem.unidad !== '' ? elem.unidad : 'Sin informaci&oacute;n'} </td>
											<td >${elem.comentariosSap && elem.comentariosSap !== '' ? elem.comentariosSap : 'Sin informaci&oacute;n'} </td>
										</tr>
									`)
								})
								$scope.inicializarTableMaterialesOt()
								swal.close()
							} else {
								$scope.inicializarTableMaterialesOt();
								mostrarMensajeInformativo("No se encontraron datos de materiales");
								swal.close()
							}
						} else {
							$scope.inicializarTableMaterialesOt();
							$scope.isTecnicoConsultaMateriales = false;
							mostrarMensajeInformativo("No se encontraron datos de materiales")
							swal.close()
						}
					} else {
						$scope.inicializarTableMaterialesOt();
						$scope.isTecnicoConsultaMateriales = false;
						mostrarMensajeInformativo(response.data.result.description);
						swal.close();
					}
					isConsultaMateriales = true
				} else {
					$scope.inicializarTableMaterialesOt();
					$scope.isTecnicoConsultaMateriales = false;
					mostrarMensajeErrorAlert('Ha ocurrido un error en la consulta de los datos');
					swal.close()
				}
			}).catch(err => handleError(err));
		}
	}

	function transformarTextPrecio(num) {
		if ((num && num != '' && num != '0')) {
			return (Math.round(parseFloat(num) * 100) / 100).toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			});
		} else {
			return parseFloat('0.00').toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			});
		}
	}

	$scope.inicializarTableMaterialesOt = function () {
		tableMaterialesDespacho = $('#table-materiales-ot').DataTable({
			"processing": false,
			"ordering": false,
			"serverSide": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": true,
			"ordering": false,
			"pageLength": 10,
			"bAutoWidth": false,
			"columns": [null, null, null, null, null, null, null, null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});
	}

	$scope.cerrarModalMaterial = function () {
		$('#modal-material-ot').modal('hide');
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

			/*
			consultaOTService.consultaComentarios(JSON.stringify(params)).then(function success(response) {
				response = arrayChat;
				if (response.data !== undefined) {
					// if (response.data.respuesta) {
					if (response.data.success) {
						if (response.data.result.result === '0') {
							var content_chat = "";
							$.each(response.data.result.Comentario, function (index, valor) {
								if (valor.Origen == "FFM APP") {
									content_chat += '' +
										'<div class="chat">' +
										'	<div class="chat-avatar">' +
										'		<a class="avatar">' +
										'			<i class="img-comentarios-chat android-mensaje fab fa-android"></i>' +
										'		</a>' +
										'	</div>' +
										'	<div class="chat-body">' +
										'		<div class="chat-body">' +
										'			<div class="chat-text">' +
										'				<p> ' + valor.Comentario + ' </p>' +
										'			</div>' +
										'		</div>' +
										'	</div>' +
										'</div>';
								} else {
									content_chat += '' +
										'<div class="chat chat-right">' +
										'	<div class="chat-body">' +
										'		<div class="chat-body">' +
										'			<div class="chat-text">' +
										'				<p> ' + valor.Comentario + ' </p>' +
										'			</div>' +
										'		</div>' +
										'	</div>' +
										'	<div class="chat-avatar">' +
										'		<a class="avatar">' +
										'			<i class="img-comentarios-chat web-mensaje fas fa-desktop"></i>' +
										'		</a>' +
										'	</div>' +
										'</div>';
								}
							});
							$('.contenedor_detalle #content-chat-ot').empty().append(content_chat);
							
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
			}).catch(err => handleError(err));*/
		}
	}

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
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

	$scope.consultaActividadTecnico = function () {
		if (!is_consulta_actividad_tecnico) {
			let params = {
				ID_OT: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaActividad(JSON.stringify(params)).then(function success(response) {
				response = arrayEvidenciaOt;
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result.result === '0') {
							var vista_img_actividad_tecnico = ""
							$("#contenido_tabs_img_evidencia").empty()
							$("#nombre_actividad_tecnico").text(response.data.result.Nombre_encargado);
							$("#descripcion_actividad_tec").text(response.data.result.Descripcion);
							$("#fecha_actividad_tecnico").text(response.data.result.Fecha);
							if (response.data.result.Imagenes != null || response.data.result.Imagenes !== undefined && response.data.result.Imagenes.length > 0) {
								var arregloImgActividad = response.data.result.Imagenes;
								$.each(arregloImgActividad, function (index, element) {
									vista_img_actividad_tecnico = retornaFormatoSliderActividadTecnico(arregloImgActividad, index)
								})
							} else {
								vista_img_actividad_tecnico = '<h6  style="color:#abafae;text-align:center; padding: 3em;">' +
									'SIN IMAGENES PARA ESTA OT' +
									'</h6>';
							}
							$("#contenido_tabs_img_evidencia").append(vista_img_actividad_tecnico);
							is_consulta_actividad_tecnico = true;
							swal.close();
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

	$scope.consultaInfoTrayectoria = function () {
		if (!is_consulta_info_trayectoria) {
			$('#table_info_trayectoria').dataTable().fnDestroy();
			$('#table_info_trayectoria tbody').empty();
			let params = {
				idot: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaTrayectoria(JSON.stringify(params)).then(function success(response) {
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						var ltlng = [];
						var ubicaciones = [];
						ubicaciones = response.data.result;
						$.each(ubicaciones, function (index, element) {
							$("#table_info_trayectoria tbody").append("<tr>" +
								"<td>" + element.numEmpleado + "</td>" +
								"<td>" + element.empleado + "</td>" +
								"<td>" + element.estado + "</td>" +
								"<td>" + element.fecha + "</td>" +
								"<td>" + element.motivo + "</td>" +
								"<td>" + element.status + "</td>" +
								'<td onclick="mostrarUbicacion(' + '\'' + element.latitud + '\', \'' + element.longitud + '\')" style="cursor:pointer;">' + '<div class="text-center"><button type="button" class="btn btn-informacion" onclick="mostrarUbicacion(' + '\'' + element.latitud + '\', \'' + element.longitud + '\')"><i class="fa fa-eye"></i></button></div>' + "</td>" +
								"</tr>");
							var elemento = {};

							if (element.Latitud !== 'NA' && element.Longitud !== 'NA') {
								elemento.lat = parseFloat(element.latitud);
								elemento.lng = parseFloat(element.longitud);
								ltlng.push(elemento);
							}
						})
						is_consulta_info_trayectoria = true;

						$('#table_info_trayectoria').DataTable({
							"paging": true,
							"ordering": false,
							"searching": false,
							"info": true,
							"sDom": '<"top"fl>rt<"bottom"pi><"clear">',
							"language": idioma_espanol_not_font
						});

						swal.close();
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

	$scope.consultaInformacionRed = function () {
		if (!is_consulta_informacion_Red) {

			$("#tableInfoRedEquipo tbody").empty()
			if (datatable_Equipos !== undefined) {
				datatable_Equipos.destroy()
			}
			$("#tableInfoDispositivos tbody").empty();
			if (datatable_Dispositivos !== undefined) {
				datatable_Dispositivos.destroy();
			}

			$("#dataTable_IP tbody").empty();
			if (dataTable_IP !== undefined) {
				dataTable_IP.destroy()
			}
			let params = {
				ID_OT: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaInfoRed(JSON.stringify(params)).then(function success(response) {
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result.result === '0') {
							if (!(response.data.result.Equipos === undefined && response.data.result.Dispositivos === undefined && response.data.result.Telefonia === undefined && response.data.result.IP === undefined)) {
								$("#list_telefonia").empty().append(RetornaformatoPintaTelefonia(jsonResponse.result.Telefonia));
								if (!(response.data.result.Equipos === undefined)) {
									$("#tableInfoRedEquipo tbody").empty().append(RetornaFormatoPintaEquipos(response.data.result.Equipos));
									datatable_Equipos = $('#tableInfoRedEquipo').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"flp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_equipos = true;
										}
									});
								} else {
									$("#tableInfoRedEquipo tbody").empty()
									datatable_Equipos = $('#tableInfoRedEquipo').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"i<"clear">>rt<"bottom"flp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_equipos = true;
										}
									});
								}
								//Dispositivos
								if (!(response.data.result.Dispositivos === undefined || response.data.result.Dispositivos === 'undefined')) {
									$("#tableInfoDispositivos tbody").empty().append(RetornaformatoPintaDispositivos(jsonResponse.result.Dispositivos));
									datatable_Dispositivos = $('#tableInfoDispositivos').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_dispositivos = true;
										}
									});
								} else {
									$("#tableInfoDispositivos tbody").empty()
									datatable_Dispositivos = $('#tableInfoDispositivos').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_dispositivos = true;
										}
									});
								}

								//IP
								if (!(response.data.result.IP === undefined)) {
									$("#tableInfoIP tbody").empty().append(RetornaFormatoPintaIP(jsonResponse.result.IP));
									dataTable_IP = $('#tableInfoIP').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_ip = true;
										}
									})
								} else {
									$("#tableInfoIP tbody").empty()
									dataTable_IP = $('#tableInfoIP').DataTable({
										"processing": true,
										"ordering": false,
										"pageLength": 1,
										"bInfo": false,
										"bFilter": true,
										"bAutoWidth": false,
										"columnDefs": [{
											"width": "3%",
											"targets": 0
										}],
										"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
										"language": espanol_instalaciones,
										"columns": [null],
										"lengthChange": false,
										"fnInitComplete": function (oSettings, json) {
											is_consulta_ip = true;
										}
									});
								}
							} else {
								$("#tableInfoRedEquipo tbody").empty()
								datatable_Equipos = $('#tableInfoRedEquipo').DataTable({
									"processing": true,
									"ordering": false,
									"pageLength": 1,
									"bInfo": false,
									"bFilter": true,
									"bAutoWidth": false,
									"columnDefs": [{
										"width": "3%",
										"targets": 0
									}],
									"dom": '<"top"i<"clear">>rt<"bottom"flp<"clear">>',
									"language": espanol_instalaciones,
									"columns": [null],
									"lengthChange": false,
									"fnInitComplete": function (oSettings, json) {
										is_consulta_equipos = true;
									}
								});

								$("#tableInfoDispositivos tbody").empty()
								datatable_Dispositivos = $('#tableInfoDispositivos').DataTable({
									"processing": true,
									"ordering": false,
									"pageLength": 1,
									"bInfo": false,
									"bFilter": true,
									"bAutoWidth": false,
									"columnDefs": [{
										"width": "3%",
										"targets": 0
									}],
									"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
									"language": espanol_instalaciones,
									"columns": [null],
									"lengthChange": false,
									"fnInitComplete": function (oSettings, json) {
										is_consulta_dispositivos = true;
									}
								});

								$("#tableInfoIP tbody").empty()
								dataTable_IP = $('#tableInfoIP').DataTable({
									"processing": true,
									"ordering": false,
									"pageLength": 1,
									"bInfo": false,
									"bFilter": true,
									"bAutoWidth": false,
									"columnDefs": [{
										"width": "3%",
										"targets": 0
									}],
									"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
									"language": espanol_instalaciones,
									"columns": [null],
									"lengthChange": false,
									"fnInitComplete": function (oSettings, json) {
										is_consulta_ip = true;
									}
								});

								mostrarMensajeWarningValidacion("No se encontro informacion de red")
							}
							is_consulta_informacion_Red = true;
							swal.close();
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

	$scope.consultaCambioEquipo = function () {
		if (!is_consulta_info_trayectoria) {
			$('#table_info_trayectoria').dataTable().fnDestroy();
			$('#table_info_trayectoria tbody').empty();
			let params = {
				Id_OT: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultarcambioDeEquipo(JSON.stringify(params)).then(function success(response) {
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result.result === '0') {
							$("#headers_tab_cambio_equipo").empty();
							$('#content_cambio_equipo_tabs').empty();
							var header_tabs_cambio_equipo = "";
							var content_tabs_cambio_equipo = "";
							var contenido_imagenes = "";

							if (response.data.result.CambioEquipo !== undefined) {
								$('#num_equipo').html(response.data.result.CambioEquipo.NumEmpleado);
								$('#empleado').html(response.data.result.CambioEquipo.Empleado);
								if (response.data.result.CambioEquipo.Elemento !== undefined) {
									$.each(response.data.result.CambioEquipo.Elemento, function (index, elemento) {

										header_tabs_cambio_equipo += '' +
											'<li class="nav-item">' +
											'<a class="nav-link ' + ((index === 0) ? "active" : "") + ' " id="header_tab_' + index + '" data-toggle="tab" href="#content_tab_' + index + '" role="tab" aria-controls="content_tab_' + index + '" aria-selected="true">Equipo No.' + (index + 1) + '</a>';
										'</li>';

										content_tabs_cambio_equipo += '' +
											'<div class="tab-pane fade ' + ((index === 0) ? "show active" : "") + ' " id="content_tab_' + index + '" role="tabpanel" aria-labelledby="home-tab">' +
											'<br/>' +
											'<div class="row">' +
											'<div class="col-10 offset-1">' +
											'' + retornarFormatoCamposCambioEquipo(elemento) + ' ' +
											'</div>' +
											'<div class="col-12">' +
											'<br>' +
											'</div>' +
											'</div>' +
											'<br>' +
											'</div>';
									});
									$("#headers_tab_cambio_equipo").append(header_tabs_cambio_equipo);
									$("#content_cambio_equipo_tabs").append(content_tabs_cambio_equipo);
									is_consulta_cambio_equipo = true;
									swal.close();
								} else {
									swal.close();
									mostrarMensajeWarningValidacion('Sin informaci\u00f3n');
								}
							} else {
								swal.close();
								mostrarMensajeWarningValidacion('Sin informaci\u00f3n')
							}
						} else {
							swal.close();
							mostrarMensajeWarningValidacion(response.data.result.resultDescripcion);
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

	$('#modal-detalle-ot').on('hidden.bs.modal', function () {
		is_consulta_info_ot = false;
		is_consulta_comentarios = false;
		is_consulta_historico = false;
		is_consulta_soluciones = false;
		is_consulta_corte_individual = false;
		is_consulta_cambio_equipo = false;
		is_consulta_reubicacion = false;
		is_consulta_cambio_plan = false;
		is_consulta_potencia = false;
		is_consulta_equipos = false;
		is_consulta_dispositivos = false;
		is_consulta_ip = false;
		is_consulta_informacion_Red = false;
		is_consulta_actividad_tecnico = false;
		isConsultaDetalleSoporte = false
		isConsultaDetallePago = false
		isConsultaDispositivo = false
		isConsultaMateriales = false
		isConsultaRecoleccionOt = false;
		isConsultaOrdenesPE = false;
		document.querySelector('#informacion-ot').click()
	})

	$('.drop-down-filters').on("click.bs.dropdown", function (e) {
		e.stopPropagation();
	});

	validarFecha = function () {
		if (document.getElementById('filtro_fecha_inicio_consultaOt').value.trim() != "" && document.getElementById('filtro_fecha_fin_consultaOt').value.trim() != "") {
			var inicio = document.getElementById('filtro_fecha_inicio_consultaOt').value.split('/');
			var fin = document.getElementById('filtro_fecha_fin_consultaOt').value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}

	$scope.seleccionTodosEstatus = function (paramFiltroParent, banderaChecked) {
		paramFiltroParent.map(function (e) {
			e.checkedOpcion = banderaChecked
			e.children.map(function (j) {
				j.checkedOpcion = banderaChecked
				j.children.map(function (k) {
					k.checkedOpcion = banderaChecked
					return k
				})
				return j
			})
		})
	}

	$scope.checkFiltroEstatus = function (filtro) {
		filtro.checkedOpcion = !filtro.checkedOpcion
		filtro.children.map(function (e) {
			e.checkedOpcion = filtro.checkedOpcion
			if (e.children != undefined && e.children.length > 0) {
				e.children.map(function (j) {
					j.checkedOpcion = filtro.checkedOpcion
					if (j.children != undefined && j.children.length > 0) {
						j.children.map(function (k) {
							k.checkedOpcion = filtro.checkedOpcion
							return k
						})
					}
					return j
				})
			}
		})
	}

	$scope.addComentariosConsultaOt = function () {
		if ($scope.comentarioConsultaOT.trim() !== '' && !/^\s/.test($scope.comentarioConsultaOT)) {
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

	$scope.descargarReporteConsultaOt = function () {
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		/*
		let tempNivelEstatus;
		if($scope.nivelEstatusPendientes){
			tempNivelEstatus=$scope.nivelEstatusPendientes
		}else{
			tempNivelEstatus=$scope.obtenerUltimoNivelEstatus()
		}

		let estatusOrdenes = []
		angular.forEach($scope.filtrosGeneral.estatusdisponibles , (e, i) => {
			e.children.map((k) => { 
				if( k.checkedOpcion && tempNivelEstatus== k.nivel)
					estatusOrdenes.push(k.id)		
					
				k.children.map((l) => { 
					if( l.checkedOpcion && tempNivelEstatus== l.nivel)
						estatusOrdenes.push(l.id)	
					return l
				})
				  return k; 
			})
			if( e.checkedOpcion && tempNivelEstatus== e.nivel)
				estatusOrdenes.push(e.id)				
		})
		*/
		let estatusOrdenes = []
		estatusOrdenes = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponibles, $scope.nivelEstatusPendientes);


		//nivel intervencion
		/*
		let tempNivelInterven;
		if($scope.nivelIntervenciones){
			tempNivelInterven=$scope.nivelIntervenciones
		}else{
			tempNivelInterven=$scope.obtenerUltimoNivelIntervencion()
		}
		let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.map((k) => { 
				if( k.checkedOpcion && tempNivelInterven== k.nivel)
					subIntTemp.push(k.id)		
					
				k.children.map((l) => { 
					if( l.checkedOpcion && tempNivelInterven== l.nivel)
						subIntTemp.push(l.id)	
					return l
				})
				  return k; 
			})
			if( e.checkedOpcion && tempNivelInterven== e.nivel)
				subIntTemp.push(e.id)				
		})
		*/
		let subIntTemp = []
		subIntTemp = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nivelIntervenciones);

		//nivel geografia
		let ultimonivel;
		if ($scope.nivelGeografia) {
			ultimonivel = $scope.nivelGeografia
		} else {
			ultimonivel = $scope.obtenerNivelUltimoJerarquia();
		}
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
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
		/**
		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}**/

		if (document.getElementById('filtro_fecha_inicio_consultaOt').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_consultaOt').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}


		if (isValido) {
			let params = {
				idOrden: $.trim(document.getElementById('idot').value) !== '' ? $.trim(document.getElementById('idot').value) : null,
				folioSistema: $.trim(document.getElementById('idos').value) !== '' ? $.trim(document.getElementById('idos').value) : null,
				claveCliente: $.trim(document.getElementById('cuenta').value) !== '' ? $.trim(document.getElementById('cuenta').value) : null,
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOt').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOt').value),
				elementosPorPagina: $scope.elementosRegistro,
				pagina: 1
			}

			consultaOTService.consultaReporteConsultaOt(JSON.stringify(params)).then((result) => {
				if (result.data.respuesta) {
					if (result.data.result) {
						const data = JSON.parse(result.data.result).ordenes
						const fileName = 'Resporte Consulta Ot'
						const exportType = 'xls'

						window.exportFromJSON({ data, fileName, exportType })
					} else {
						mostrarMensajeWarningValidacion('No hay datos en el reporte.')
					}
				} else {
					mostrarMensajeErrorAlert('Ocurrio un erro.')
				}
			}).catch(err => handleError(err))

		} else {
			mostrarMensajeWarningValidacion(errorMensaje);
		}
	}

	desplazarDerechaTabs = function () {
		$('#myTab').animate({ scrollLeft: '+=100' }, 150);
	}

	desplazarIzquierdaTabs = function () {
		$('#myTab').animate({ scrollLeft: '-=100' }, 150);
	}

	$scope.detalleSoporteList = [];
	$scope.consultarPostVentaOt = function () {
		if (!isConsultaDetalleSoporte) {
			$scope.detalleSoporteList = []
			let params = {
				orden: $scope.datoOt
				//orden: 123050
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaPostVentaOt(JSON.stringify(params)).then((result) => {
				isConsultaDetalleSoporte = true
				if (result.data.respuesta) {
					if (result.data.result.length > 0) {
						$scope.detalleSoporteList = angular.copy(result.data.result);

						setTimeout(() => {
							if ($scope.detalleSoporteList.length > 7) {
								$("#left-arrow").css('display', 'block');
								$("#right-arrow").css('display', 'block');
								$("#containerTabsSoporte").removeClass('row');
								$("#containerTabsSoporte").css('width', '94%');
							} else {
								$("#left-arrow").hide();
								$("#right-arrow").hide();
								$('#containerTabsSoporte').addClass('row');
								$("#containerTabsSoporte").css('width', '100%');
							}
							$scope.detalleSoporteList.forEach((elemento, ind) => {
								let html_tmp_eq_nuevo = "";
								let html_tmp_eq_viejo = "";

								if (elemento.equipoNuevo) {
									$("#opcion-tab-equipoNuevo" + ind).show();
									elemento.equipoNuevo.forEach((equipoN, index) => {
										if (equipoN.evidencias && equipoN.evidencias.length) {
											contenido_imagenes_eqnuevo = retornarFormatoSliders(equipoN.evidencias, index);
										} else {
											contenido_imagenes_eqnuevo =
												'<h4 id="texto_not_equipos">' +
												'	SIN IM&Aacute;GENES PARA ESTE EQUIPO' +
												'</h4>';
										}
										html_tmp_eq_nuevo += '' +
											'<tr>' +
											'	<td>' +
											'		<div class="row">' +
											'			<div class="col-md-6 colInformacionTabla">' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b class="title_span_1"> Tipo equipo:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="ot_fallas"  class="content_text" >' + (equipoN.descripcionTipoEquipo && equipoN.descripcionTipoEquipo !== '' ? equipoN.descripcionTipoEquipo : 'Sin informaci&oacute;n') + '</span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b class="title_span_1"> Modelo:</b>	 ' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="tecnico_falla"  class="content_text" > ' + (equipoN.descripcionModelo && equipoN.descripcionModelo !== '' ? equipoN.descripcionModelo : 'Sin informaci&oacute;n') + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1"> N&uacute;mero de Serie:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="status_falla_corte"  class="content_text" > ' + (equipoN.numSerie && equipoN.numSerie !== '' ? equipoN.numSerie : 'Sin informaci&oacute;n') + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'			</div>' +
											'			<div class="col-md-6">' +
											'					<div class="class-12">' +
											contenido_imagenes_eqnuevo +
											'					</div>' +
											'			</div>' +
											'		</div>' +
											'	</tr>' +
											'</td>';
									})
								}
								if (elemento.equipoViejo) {
									$("#opcion-tab-equipoViejo" + ind).show();
									elemento.equipoViejo.forEach((equipoV, index) => {
										if (equipoV.evidencias && equipoV.evidencias.length) {
											contenido_imagenes_eqviejo = retornarFormatoSliders(equipoV.evidencias, index);
										} else {
											contenido_imagenes_eqviejo =
												'<h4 id="texto_not_arboles" style="color:#abafae; text-align:center">' +
												'	SIN IMAGENES PARA ESTA FALLA' +
												'</h4>';
										}
										html_tmp_eq_viejo += '' +
											'<tr>' +
											'	<td>' +
											'		<div class="row">' +
											'			<div class="col-md-6 colInformacionTabla">' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b class="title_span_1"> Tipo equipo:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="ot_fallas"  class="content_text" >' + (equipoV.descripcionTipoEquipo && equipoV.descripcionTipoEquipo !== '' ? equipoV.descripcionTipoEquipo : 'Sin informaci&oacute;n') + '</span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b class="title_span_1"> Modelo:</b>	 ' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="tecnico_falla"  class="content_text" > ' + (equipoV.descripcionModelo && equipoV.descripcionModelo !== '' ? equipoV.descripcionModelo : 'Sin informaci&oacute;n') + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'				<div class="row textFallaOT">' +
											'					<div class="col-md-5">' +
											'						<b  class="title_span_1"> N&uacute;mero de Serie:</b>' +
											'		        	</div>				               ' +
											'		        	<div class="col-md-7">' +
											'		        		<span id="status_falla_corte"  class="content_text" > ' + (equipoV.numSerie && equipoV.numSerie !== '' ? equipoV.numSerie : 'Sin informaci&oacute;n') + ' </span>' +
											'		        	</div>' +
											'				</div>' +
											'			</div>' +
											'			<div class="col-md-6">' +
											'					<div class="class-12">' +
											contenido_imagenes_eqviejo +
											'					</div>' +
											'			</div>' +
											'		</div>' +
											'	</tr>' +
											'</td>';
									})
								}
								$('#tablaEquipoViejo' + ind + ' tbody').empty();
								$('#tablaEquipoViejo' + ind + ' tbody').append(html_tmp_eq_viejo);
								$('#tablaEquipoViejo' + ind).DataTable({
									"processing": false,
									"ordering": false,
									"pageLength": 1,
									"pagingType": "numbers",
									"info": false,
									"bInfo": false,
									"bFilter": false,
									"bAutoWidth": false,
									"language": idioma_espanol_not_font,
									"columns": [null],
									"lengthChange": false,
									"fnDrawCallback": function (oSettings) {
										$(".carousel-item").click();
									}
								});
								$('#tablaEquipoNuevo' + ind + ' tbody').empty();
								$('#tablaEquipoNuevo' + ind + ' tbody').append(html_tmp_eq_nuevo);
								$('#tablaEquipoNuevo' + ind).DataTable({
									"processing": false,
									"ordering": false,
									"pageLength": 1,
									"pagingType": "numbers",
									"info": false,
									"bInfo": false,
									"bFilter": false,
									"bAutoWidth": false,
									"language": idioma_espanol_not_font,
									"columns": [null],
									"lengthChange": false,
									"fnDrawCallback": function (oSettings) {
										$(".carousel-item").click();
									}
								});
							})
							swal.close();
						}, 1000);
					} else {
						swal.close();
						mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n')
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(result.data.resultDescripcion)
				}
			}).catch(err => handleError(err));
		}
	}

	$scope.consultaPagosOt = function () {
		if (!isConsultaDetallePago) {
			let arrayRow = [];
			let params = {
				orden: $scope.datoOt
			}
			$scope.detallePagoObj.isPagosPendientes = false;
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultaPagosOt(JSON.stringify(params)).then((result) => {
				swal.close()
				isConsultaDetallePago = true
				if (result.data.respuesta) {
					if (result.data.result) {
						$scope.detallePagoObj = result.data.result.detallePago
						let estatusIconEstatus=''
						
                        $.each($scope.detallePagoObj, function (i, elemento) {

                            if(elemento.idEstatusPago == 2){
								$scope.detallePagoObj.isPagosPendientes = true;
                                estatusIconEstatus=` <i class="fas fa-exclamation icono-pago-pendiente"></i> `
                            }else{
                                estatusIconEstatus=` <i class="far fa-check-circle icono-pago-liberado"></i> `
                            }
                            let row = [];
                            row[0] = elemento.idCveCliente ? elemento.idCveCliente : '';
                            row[1] = elemento.idOrden ? elemento.idOrden : '';
                            row[2] = elemento.folioSistema ? elemento.folioSistema : '';
                            row[3] = elemento.fechaRegistro ? elemento.fechaRegistro : '';
                            row[4] = elemento.fechaCierreOT ? elemento.fechaCierreOT : '';
                            row[5] = elemento.tipoIntervencion ? elemento.tipoIntervencion : '';
                            row[6] = elemento.subTipoIntervencion ? elemento.subTipoIntervencion : '';
                            row[7] = elemento.tiempo ? elemento.tiempo : '';
                            row[8] = elemento.tipoPago ? elemento.tipoPago : '';
                            row[9] = elemento.monto ? Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(elemento.monto)  : '$ 0.00';
                            row[10] = estatusIconEstatus ;
                            arrayRow.push(row);
                        })

					} else {
						mostrarMensajeWarningValidacion('No se encontro informaci&oacute;n')
					}
				} else {
					mostrarMensajeErrorAlert(result.data.resultDescripcion)
				}
				pagosOtTable = $('#table_pagos_ot').DataTable({
					"processing": false,
					"ordering": false,
					"serverSide": false,
					"scrollX": false,
					"paging": true,
					"lengthChange": false,
					"searching": true,
					"bDestroy": true,
					"ordering": false,
					"data": arrayRow,
					"pageLength": 10,
					"columns": [null, null, null, null, null, null, null, null, null,null,null],
					"language": idioma_espanol_not_font
				});
			}).catch(err => handleError(err));
		}
	}

	$scope.camposFiltro = {};

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

	retornarFormatoSliders = function (imagen, contador) {
		var imgs_blocks = "";
		var indicators_carousel = "";

		imagen.forEach((img, index) => {
			indicators_carousel += ' <li class="' + ((index === 0) ? 'active' : '') + '" data-target="#carouselExampleIndicators' + contador + '" data-slide-to="' + index + '" ></li>';
			if (img.urlEvidencia === "") {
				imgs_blocks += '' +
					'      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + ' ">' +
					'        <img data-title="' + img.nombre + '" class="d-block img-fluid imagen-carousel-evidencia" style="width:100%; min-width: 100%; height: 100% !important;" src="' + contex_project + '/resources/img/generic/not_found.png" alt="First slide" />' +
					'      </div>';
			} else {
				imgs_blocks += '' +
					'      <div class="carousel-item ' + ((index === 0) ? 'active' : '') + '">' +
					'        <img data-title="' + img.nombre + '" class="d-block img-fluid imagen-carousel-evidencia" style="width:100%; min-width: 100%; height: 100% !important;" class="d-block w-100" src="' + img.url + '" alt="First slide" />' +
					'      </div>';
			}
		})

		return '' +
			'  <div id="carouselExampleIndicators' + contador + '" class="carousel_componente carousel slide" data-ride="carousel">' +
			'    <ol class="carousel-indicators">' +
			'     	' + indicators_carousel + ' ' +
			'    </ol>' +
			'    <div class="carousel-inner" role="listbox">' +
			'			' + imgs_blocks + ' ' +
			'    </div>' +
			'    <a class="carousel-control-prev" href="#carouselExampleIndicators' + contador + '" role="button" data-slide="prev">' +
			'      <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
			'      <span class="sr-only">Previous</span>' +
			'    </a>' +
			'    <a class="carousel-control-next" href="#carouselExampleIndicators' + contador + '" role="button" data-slide="next">' +
			'      <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
			'      <span class="sr-only">Next</span>' +
			'    </a>' +
			'  </div>';
	}

	$scope.pintarTablaDispositivoOt = function () {
		if (dispositivoOtTable) {
			dispositivoOtTable.destroy();
		}
		let arrayRow = [];
		$scope.dispositivosArrayTemp.forEach((dispositivo, index) => {
			let array = [];
			array[0] = '<a id="mostrar-segundo-nivel-' + index + '" class="option-mas-dispositivo segundo-nivel-table-dispositivo" tag-position="' + index + '" tag-hide="false"><i id="icono-dispositivo-' + index + '" class="icono-dispositivo-consulta-ot icon-color-table-dispositivo-ot fa fa-plus" aria-hidden="true"></i></a>';
			array[1] = dispositivo.nombreDispositivo ? dispositivo.nombreDispositivo : 'Sin Informaci&oacute;n';
			array[2] = dispositivo.modelo ? dispositivo.modelo : 'Sin Informaci&oacute;n';
			array[3] = dispositivo.serie ? dispositivo.serie : 'Sin Informaci&oacute;n';
			array[4] = dispositivo.mac ? dispositivo.mac : 'Sin Informaci&oacute;n';
			arrayRow.push(array)
		})
		dispositivoOtTable = $('#table_dispositovos_ot').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": true,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": arrayRow
		});
	}

	$scope.isDispositivos = false;
	$scope.consultarDispositivosOt = function () {
		if (!isConsultaDispositivo) {
			let params = {
				//orden: 92070//$scope.datoOt}
				orden: $scope.datoOt
			}
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			consultaOTService.consultarDispositivosOrden(params).then((result) => {
				swal.close()
				isConsultaDispositivo = true
				if (result.data) {
					if (result.data.respuesta) {
						if (result.data.result) {
							$scope.isDispositivos = true;
							$scope.dispositivosArrayTemp = angular.copy(result.data.result.dispositivos);
							$scope.pintarTablaDispositivoOt();
						} else {
							$scope.pintarTablaDispositivoOt();
							mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n')
						}
					} else {
						$scope.isDispositivos = false;
						$scope.pintarTablaDispositivoOt();
						mostrarMensajeWarningValidacion('No se encontr&oacute; informaci&oacute;n');
					}
				} else {
					$scope.isDispositivos = false;
					$scope.pintarTablaDispositivoOt();
					mostrarMensajeErrorAlert(result.data.resultDescripcion);
				}
			}).catch(err => handleError(err));
		}
	}

	$(document.body).on("click", ".segundo-nivel-table-dispositivo", function () {
		let tr = $(this).closest('tr')
		row = dispositivoOtTable.row(tr)
		let index = Number($(this).attr('tag-position'))
		if ($(this).attr('tag-hide') === 'false') {
			$(this).attr('tag-hide', 'true')
			document.getElementById('icono-dispositivo-' + index).classList.remove('fa-plus')
			document.getElementById('icono-dispositivo-' + index).classList.add('fa-window-minimize')
			let dataTable = pintarTablaSecundaria(index)
			row.child(dataTable).show();
		} else {
			$(this).attr('tag-hide', 'false')
			document.getElementById('icono-dispositivo-' + index).classList.add('fa-plus')
			document.getElementById('icono-dispositivo-' + index).classList.remove('fa-window-minimize')
			row.child.hide();
			tr.removeClass('shown');
		}
	});

	pintarTablaSecundaria = function (position) {
		let dispositivo = $scope.dispositivosArrayTemp[position]
		let arrayDetalleRed = [];
		arrayDetalleRed.push(dispositivo.detalleRed)
		let tableHTML = '<div class="details-container">' +
			'<table id="table_dispositovos_ot_nivel2" class="table table-hover table-bordered" cellspacing="0" style="width:100%">' +
			'<thead id="thead_dispositivo_consulta_ot_nivel2">' +
			'<tr>' +
			'<th>NOMBRE OLT</th>' +
			'<th>TIPO APROVISIONAMIENTO</th>' +
			'<th>FRAME</th>' +
			'<th>SLOT</th>' +
			'<th>PUERTO</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody>';

		arrayDetalleRed.forEach(detalle => {
			tableHTML += "<tr>" +
				"<td>" + ((detalle != undefined && detalle.nombreOlt) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.tipoAprovisionamiento) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.frame) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.slot) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"<td>" + ((detalle != undefined && detalle.puerto) ? detalle.nombreOlt : 'Sin dato') + "</td>" +
				"</tr>";

		})
		tableHTML += '</tbody></table>' +
			'</div>';

		return tableHTML;
	}

	//MÉTODO PARA BUSCAR GEOGRAFÍAS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - CONSULTA GENERAL OT
	$scope.busquedaGeografiaConsultaOt = function () {
		$("#jstree-proton-3").jstree("search", $('#searchGeografia').val());
	}

	$scope.isTecnicoConsultaRecoleccion = false;
	$scope.consultarRecoleccionOt = function () {
		if (!isConsultaRecoleccionOt) {
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			let params = {
				"idOrden": $scope.datoOt
				//"idOrden": '1991'
			};
			consultaOTService.consultarRecoleccionOt(params).then(function success(response) {
				if (response.data !== undefined) {
					if (response.data.respuesta) {
						if (response.data.result) {
							$scope.isTecnicoConsultaRecoleccion = true;
							isConsultaRecoleccionOt = true
							$scope.tecnicoConsultaRecoleccion = angular.copy(response.data.result);
							$scope.equiposTecnicoRecoleccion = angular.copy(response.data.result.detalleEquipos);
							let arrayRow = [];
							if (tableRecoleccionOt) {
								tableRecoleccionOt.destroy();
							}
							$.each($scope.equiposTecnicoRecoleccion, function (i, elemento) {
								let row = [];
								row[0] = elemento.numSerie !== undefined ? elemento.numSerie : 'Sin informaci&oacute;n';
								row[1] = elemento.descripcion !== undefined ? elemento.descripcion : 'Sin informaci&oacute;n';
								row[2] = elemento.centro !== undefined ? elemento.centro : 'Sin informaci&oacute;n';
								row[3] = elemento.almacen !== undefined ? elemento.almacen : 'Sin informaci&oacute;n';
								row[4] = elemento.recuperado == 1 ?
									'<span class="content-success-generic">' +
									'<i class="icono-success-generic fas fa-check"></i>' +
									'</span>' : '';
								row[5] = elemento.adicional == 1 ?
									'<span class="content-success-generic">' +
									'<i class="icono-success-generic fas fa-check"></i>' +
									'</span>' : '';
								row[6] = elemento.fechaRegistro !== undefined ? elemento.fechaRegistro : 'Sin informaci&oacute;n';
								arrayRow.push(row);
							});
							tableRecoleccionOt = $('#table-recoleccion-temp').DataTable({
								"paging": true,
								"lengthChange": false,
								"ordering": false,
								"pageLength": 10,
								"info": true,
								"scrollX": false,
								"data": arrayRow,
								"autoWidth": false,
								"language": idioma_espanol_not_font
							});
							swal.close();
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
							$scope.isTecnicoConsultaRecoleccion = false;
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
						$scope.isTecnicoConsultaRecoleccion = false;
					}
				} else {
					swal.close();
					mostrarMensajeErrorAlert(response.data.resultDescripcion);
					$scope.isTecnicoConsultaRecoleccion = false;
				}
			}).catch(err => handleError(err));
		}
	}
	
	$scope.consultarDetalleOtPe = function() {
		
		$scope.mostrarTooltipDetencion = false;
		var tamContenedorDetencion = $("#tab-content-modal-detalle-ot").width();
		if(tamContenedorDetencion < 700){
			$scope.mostrarTooltipDetencion = true;
		}
		
		if(!Object.keys($scope.infoDetalleOtPe).length){
			swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
	        swal.showLoading();
	        
	        let params = {
	            "idFlujo": $scope.infoOtDetalle.idFlujo,
	            "idOT": $scope.infoOtDetalle.idOrden
	        };
	        
	        consultaOTService.consultaDetalleOtPe(params).then(function success(response) {
	            if (response.data !== undefined) {
	                if (response.data.respuesta) {
	                    if (response.data.result) {
	                        if (response.data.result.orden) {
	                            $scope.infoDetalleOtPe = response.data.result.orden;
	                        } else {
	                        	toastr.warning("¡No se encontraron datos en el detalle de la OT!");
	                        }
	                    } else {
	                        toastr.warning(response.data.mensajeException);
	                    }
	                } else {
	                	toastr.warning(response.data.mensajeException);
	                }
	            } else {
	                toastr.error("Ha ocurrido un error en la consulta del detalle de la OT");
	            }
	            swal.close()
	        }).catch(err => handleError(err));
		}
	}
	
	$scope.cambiarIndicadorBtnImg = function (falla, img) {
        $(".btnImgPorFalla" + falla).removeClass("btnControlImgsSinOpacidad");
        $(".btnImgPorFalla" + falla).addClass("btnControlImgsOpacidad");
        $("#btnIndicadorIndividual" + falla + img).addClass("btnControlImgsSinOpacidad");
    }

    $scope.cambiarPagTablaSpliters = function (falla, splitter) {
        $(".spliters" + falla).addClass("ocultarFilaTablaSplitersFallaDetalleDetencion");
        $("#detencion" + falla + splitter).removeClass("ocultarFilaTablaSplitersFallaDetalleDetencion");
        $(".btnPaginadorTablaSpliters" + falla).removeClass("btnPaginadorTablaSplitersActive");
        $(".btnPaginadorTablaSpliters" + falla).addClass("btnPaginadorTablaSplitersNoActive");
        $("#btnPaginador" + falla + splitter).removeClass("btnPaginadorTablaSplitersNoActive");
        $("#btnPaginador" + falla + splitter).addClass("btnPaginadorTablaSplitersActive");
    }

	$scope.pintarTablaOTPE = function () {
		let arrayRowPE = [];
		if (tableOrdenesPlantaExternaOt) {
			tableOrdenesPlantaExternaOt.destroy();
		}
		$.each($scope.listOrdenesPE, function (i, elemento) {
			let rowPE = [];
			rowPE[0] = elemento.idOrdenPe && elemento.idOrdenPe !== '' ? elemento.idOrdenPe : 'Sin informaci&oacute;n';
			rowPE[1] = (elemento.nivelUno) + " / " + (elemento.nivelDos);
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

	$scope.consultarOrdenesPlantaExternaOT = function () {
		if (!isConsultaOrdenesPE) {
			swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
			swal.showLoading();
			$scope.listOrdenesPE = [];
			let params = {
				"idOrden": $scope.datoOt
			};
			consultaOTService.consultaOrdenesPlantaExternaOt(params).then(function success(response) {
				console.log(response);
				if (response.data) {
					if (response.data.respuesta) {
						if (response.data.result) {
							if (response.data.result.detalleOrdenPe.length) {
								$scope.listOrdenesPE = angular.copy(response.data.result.detalleOrdenPe);
								isConsultaOrdenesPE = true;
								$scope.pintarTablaOTPE();
								swal.close();
							} else {
								$scope.pintarTablaOTPE();
								mostrarMensajeInformativo("No se encontr&oacute; Informaci&oacute;n");
								swal.close();
							}
						} else {
							$scope.pintarTablaOTPE();
							mostrarMensajeWarningValidacion("No se encontr&oacute; Informaci&oacute;n");
							swal.close();
						}
					} else {
						$scope.pintarTablaOTPE();
						mostrarMensajeWarningValidacion(response.data.result.resultDescripcion);
						swal.close();
					}
				} else {
					$scope.pintarTablaOTPE();
					mostrarMensajeWarningValidacion(response.data.result.resultDescripcion);
					swal.close();
				}
			});
		}
	}
    
    $scope.cerrarModalDetalleOt = function () {
        $("#modal-detalle-ot").modal("hide");
    }
	
}])