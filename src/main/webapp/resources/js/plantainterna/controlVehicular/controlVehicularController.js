var app = angular.module('controlVehicularApp', []);
var objectTempAccion;
app.controller('controlVehicularController',
	['$scope', '$q', 'controlVehicularService', 'genericService', '$filter',
		function ($scope, $q, controlVehicularService, genericService, $filter) {
			$scope.vehiculo = {};
			let vehiculoTable;
			let historicoTable;
			let vehiculoActivaTable;
			$scope.marcas = [];
			$scope.marcasTemp = [];
			$scope.lineas = [];
			$scope.motivos = [];
			$scope.data = {};
			$scope.vehiculos = [];
			$scope.vehiculoText = {};
			$scope.isEdit = false;
			$scope.countDisponibles = 0;
			$scope.countAsignados = 0;
			$scope.countNoDisponibles = 0;
			$scope.countBajas = 0;
			$scope.countTodos = 0;
			$scope.geografiaList = [];
			$scope.nGeografia;
			$scope.llaveEncierroVehiculo;
			$scope.filePlaca;
			$scope.fileVehiculo;
			$scope.fileCirculacion;
			$scope.fileGasolina;
			$scope.fileLicencia;
			$scope.padre;
			$scope.permisosConfigUser = [];
			$scope.accionesUserConfigText = []
			$scope.configPermisoAccionConsultaVehiculos = false;
			$scope.configPermisoAccionCreaVehiculos = false;
			$scope.configPermisoAccionEditaVehiculos = false;
			$scope.configPermisoAccionEliminaVehiculos = false;
			$scope.configPermisoAccionActivaVehiculos = false;
			$scope.configPermisoAccionConsultaActivaVehiculos = false;
			$scope.configPermisoAccionDescargaReporte = false;

			$scope.listVehiculosInactivos = [];

			angular.element(document).ready(function () {
				$("#modal_cluster_arbol_vehiculo").on("hidden.bs.modal", function () {
					if ($scope.jstreeType == 1) {
						var geografias = $('#jstreeconsulta').jstree("get_selected", true);
						let textoGeografias = [];
						angular.forEach(geografias, (geografia, index) => {
							textoGeografias.push(geografia.text);
						});
						$('#geografia-seleccionada-consulta').val(textoGeografias);
					}
					if ($scope.jstreeType == 2) {
						var geografias = $('#jstreeconsultainactivos').jstree("get_selected", true);
						let textoGeografias = [];
						angular.forEach(geografias, (geografia, index) => {
							textoGeografias.push(geografia.text);
						});
						$('#geografia-seleccionada-inactivos').val(textoGeografias);
					}

					if ($scope.jstreeType == 3) {
						let selectedElms = $('#jstreealta').jstree("get_selected", true);
						if (selectedElms.length) {
							document.getElementById('arbol_vehiculo_consulta').placeholder = selectedElms[0].text;
							if (Number(selectedElms[0].original.nivel) !== Number($scope.nGeografia)) {
								toastr.warning('Selecciona una geograf\u00EDa v&aacute;lida');
							} else {
								$scope.vehiculoText.geografiaText = selectedElms[0].text;
								$scope.getParentGeografia(selectedElms[0].id, $scope.llaveEncierroVehiculo);
								$scope.loadEncierros($scope.padre, 0);
							}
						}
					}
				})
				$('.year').datepicker({
					format: 'yyyy',
					viewMode: "years",
					minViewMode: "years",
					autoclose: true,
					language: 'es',
					todayHighlight: true,
					clearBtn: false,
					orientation: "bottom"
				});

				$('.datepickerNormal').datepicker({
					format: 'dd/mm/yyyy',
					autoclose: true,
					language: 'es',
					todayHighlight: true,
					clearBtn: false,
					orientation: "bottom"
				});

				$('.datepickerReporte').datepicker({
					format: 'dd/mm/yyyy',
					autoclose: true,
					language: 'es',
					todayHighlight: true,
					clearBtn: false
				});
				$('.datepickerReporte').datepicker('update', new Date());
			});


			$('#searchGeoConsulta').on('keyup', function () {
				$("#jstreeconsulta").jstree("search", this.value);
			})

			$('#searchGeoConsultaInactivo').on('keyup', function () {
				$("#jstreeconsultainactivos").jstree("search", this.value);
			})

			$('#searchGeoAlta').on('keyup', function () {
				$("#jstreealta").jstree("search", this.value);
			})

			vehiculoTable = $('#vehiculoTable').DataTable({
				"paging": true,
				"lengthChange": false,
				"ordering": true,
				"pageLength": 10,
				"info": true,
				"scrollX": false,
				"autoWidth": false,
				"language": idioma_espanol_not_font,
				"aoColumnDefs": [
					{ "aTargets": [9,10], "bSortable": false },
				]
			});

			vehiculoActivaTable = $('#vehiculoActivaTable').DataTable({
				"paging": true,
				"lengthChange": false,
				"ordering": true,
				"pageLength": 10,
				"info": true,
				"scrollX": false,
				"autoWidth": false,
				"language": idioma_espanol_not_font,
				"aoColumnDefs": [
					{ "aTargets": [9], "bSortable": false },
				]
			});

			historicoTable = $('#historicoTable').DataTable({
				"paging": true,
				"lengthChange": false,
				"ordering": false,
				"pageLength": 10,
				"info": true,
				"scrollX": false,
				"autoWidth": false,
				"language": idioma_espanol_not_font,
			});

			openHistory = function () {
				$("#modalHistorico").modal('show');
			}

			$scope.getConfiguration = function () {

				$q.all([
					controlVehicularService.consultarConfiguracionVehiculo({ "moduloAccionesUsuario": "moduloVehiculos" }),
					controlVehicularService.consulCatalogoGeografiaUsuarioVehiculo()
				]).then(function (results) {
					let resultConf = results[0].data.result
					if (results[0].data !== undefined) {
						if (results[0].data.respuesta) {
							if (results[0].data.result) {
								if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
									let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
									$scope.nGeografia = llavesResult.N_FILTRO_GEOGRAFIA;
									$scope.llaveEncierroVehiculo = llavesResult.N_ENCIERROS;
									$scope.llaveArchivoPath = llavesResult.PATH_ARCHIVOS;
									$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
									validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
									validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
									validateCreedText = llavesResult.KEY_TEXTFORMATO_CREED_RES ? KEY_TEXTFORMATO_CREED_RES : '';
									if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
										$scope.configPermisoAccionConsultaVehiculos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaVehiculos" })[0] != undefined);
										$scope.configPermisoAccionCreaVehiculos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionCreaVehiculos" })[0] != undefined);
										$scope.configPermisoAccionEditaVehiculos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionEditaVehiculos" })[0] != undefined);
										$scope.configPermisoAccionEliminaVehiculos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionEliminaVehiculos" })[0] != undefined);
										$scope.configPermisoAccionActivaVehiculos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionActivaVehiculos" })[0] != undefined);
										$scope.configPermisoAccionConsultaActivaVehiculos = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaActivaVehiculos" })[0] != undefined);
										$scope.configPermisoAccionDescargaReporte = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaReporte" })[0] != undefined);
										objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
										objectTempAccion.inicializarBotonAccionesRecientes();
									}

									if (!$scope.configPermisoAccionConsultaVehiculos && $scope.configPermisoAccionCreaVehiculos) {
										setTimeout(function () {
											$("#alta-tab").click();
										}, 300)
									}

									if (!$scope.configPermisoAccionConsultaVehiculos && !$scope.configPermisoAccionCreaVehiculos && $scope.configPermisoAccionConsultaActivaVehiculos) {
										setTimeout(function () {
											$("#elimina-tab").click();
										}, 300)
									}

								} else {
									toastr.warning('No se encontraron datos para la configuraci\u00F3n');
								}
							} else {
								toastr.info('No se encontraron datos para la configuraci\u00F3n');
							}
						} else {
							toastr.warning(results[0].data.resultDescripcion);
						}
					} else {
						toastr.error('No se encontraron datos para la configuraci\u00F3n');
					}
					$("#container_vehiculos").css("display", "block")

					if (results[1].data !== undefined) {
						if (results[1].data.respuesta) {
							if (results[1].data.result) {
								if (results[1].data.result.geografia.length > 0) {
									let listGeo = [];

									$scope.nGeografia = $scope.nGeografia ? $scope.nGeografia : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);
									$scope.llaveEncierroVehiculo = $scope.llaveEncierroVehiculo ? $scope.llaveEncierroVehiculo : $scope.obtenerNivelUltimoJerarquiaGeneric(results[1].data.result.geografia);

									listGeo = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });

									$scope.geografiaList = listGeo;
									let geografia = angular.copy($scope.geografiaList);
									geografia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
									geografia.map((e) => {
										e.parent = e.padre == null ? 0 : e.padre;
										e.text = e.nombre;
										e.icon = "fa fa-globe";
										e.state = {
											opened: true,
											selected: true,
										}
										return e
									})

									let geografiaAlta = angular.copy($scope.geografiaList);
									geografiaAlta.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
									geografiaAlta.map((e) => {
										e.parent = e.padre == null ? 0 : e.padre;
										e.text = e.nombre;
										e.icon = "fa fa-globe";
										e.state = {
											opened: false,
											selected: false,
										}
										return e
									})

									if ($scope.configPermisoAccionConsultaVehiculos) {
										$('#jstreeconsulta').bind('loaded.jstree', function (e, data) {
											var geografias = $('#jstreeconsulta').jstree("get_selected", true);
											let textoGeografias = [];
											angular.forEach(geografias, (geografia, index) => {
												textoGeografias.push(geografia.text);
											});
											$('#geografia-seleccionada-consulta').val(textoGeografias);
											$scope.getVehiculos(true);
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
									}

									if ($scope.configPermisoAccionConsultaActivaVehiculos) {
										$('#jstreeconsultainactivos').bind('loaded.jstree', function (e, data) {
											var geografias = $('#jstreeconsultainactivos').jstree("get_selected", true);
											let textoGeografias = [];
											angular.forEach(geografias, (geografia, index) => {
												textoGeografias.push(geografia.text);
											});
											$('#geografia-seleccionada-inactivos').val(textoGeografias);
											$scope.getVehiculosInactivos(!$scope.configPermisoAccionConsultaVehiculos);
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
									}


									$scope.loadArbolRegistro(geografiaAlta);


								} else {
									toastr.info('No se encontraron datos para la geograf\u00EDa')
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

			$scope.loadArbolRegistro = function (geografiaAlta) {
				$('#jstreealta').bind('loaded.jstree', function (e, data) {
				}).jstree({
					'plugins': ["search"],
					'core': {
						'data': geografiaAlta,
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

			$scope.getData = function () {
				$q.all([
					controlVehicularService.consultarMarcasControlVehicular(),
					controlVehicularService.consultarColoresControlVehicular(),
					controlVehicularService.consultarSegurosControlVehicular(),
					controlVehicularService.consultarEstatusControlVehicular(),
					controlVehicularService.consultarOperacionesControlVehicular(),
					controlVehicularService.consultarCuadrillaControlVehicular(),
					controlVehicularService.consultarEmpresasControlVehicular(),
					controlVehicularService.consultarCostosControlVehicular(),
				]).then(function (results) {
					if (results[0].data !== undefined) {
						if (results[0].data.respuesta) {
							if (results[0].data.result) {
								if (results[0].data.result.restulList.length > 0) {
									$scope.data.tipoVehiculos = results[0].data.result.restulList;
								} else {
									toastr.info('No se encontr\u00F3 catalogo de tipo veh\u00EDculo');
								}
							} else {
								toastr.info('No se encontr\u00F3 catalogo de tipo veh\u00EDculo');
							}
						} else {
							toastr.warning(results[0].data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta del catalogo de tipo veh\u00EDculo');
					}

					if (results[1].data !== undefined) {
						if (results[1].data.respuesta) {
							if (results[1].data.result) {
								if (results[1].data.result.restulList.length > 0) {
									$scope.data.colores = results[1].data.result.restulList;
								} else {
									toastr.info('No se encontr\u00F3 catalogo de colores');
								}
							} else {
								toastr.info('No se encontr\u00F3 catalogo de colores');
							}
						} else {
							toastr.warning(results[1].data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta del catalogo de colores');
					}

					if (results[2].data !== undefined) {
						if (results[2].data.respuesta) {
							if (results[2].data.result) {
								if (results[2].data.result.restulList.length > 0) {
									$scope.data.seguros = results[2].data.result.restulList;
								} else {
									toastr.info('No se encontr\u00F3 catalogo de seguros');
								}
							} else {
								toastr.info('No se encontr\u00F3 catalogo de seguros');
							}
						} else {
							toastr.warning(results[2].data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta del catalogo de seguros');
					}

					if (results[3].data !== undefined) {
						if (results[3].data.respuesta) {
							if (results[3].data.result) {
								if (results[3].data.result.restulList.length > 0) {
									let estatus = [];
									let motivos = [];
									results[3].data.result.restulList.map(function (e) {
										if (e.padre == null) {
											estatus.push(e);
										} else {
											motivos.push(e);
										}
									})
									$scope.data.estatus = estatus;
									$scope.data.motivos = motivos;
								} else {
									toastr.info('No se encontr\u00F3 catalogo de estatus');
								}
							} else {
								toastr.info('No se encontr\u00F3 catalogo de estatus');
							}
						} else {
							toastr.warning(results[3].data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta del catalogo de estatus');
					}

					if (results[4].data !== undefined) {
						if (results[4].data.respuesta) {
							if (results[4].data.result) {
								if (results[4].data.result.length) {
									$scope.data.operaciones = results[4].data.result;
								} else {
									toastr.info('No se encontr\u00F3 catalogo de operaciones');
								}
							} else {
								toastr.info('No se encontr\u00F3 catalogo de operaciones');
							}
						} else {
							toastr.warning(results[4].data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta del catalogo de operaciones');
					}

					if (results[5].data !== undefined) {
						if (results[5].data.respuesta) {
							if (results[5].data.result) {
								if (results[5].data.result.length > 0) {
									$scope.data.cuadrillas = results[5].data.result;
								} else {
									toastr.info('No se encontr\u00F3 catalogo de tipo cuadrillas');
								}
							} else {
								toastr.info('No se encontr\u00F3 catalogo de tipo cuadrillas');
							}
						} else {
							toastr.warning(results[5].data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta del catalogo de tipo cuadrillas');
					}

					if (results[6].data !== undefined) {
						if (results[6].data.respuesta) {
							if (results[6].data.result) {
								if (results[6].data.result.length > 0) {
									$scope.data.empresas = results[6].data.result;
								} else {
									toastr.info('No se encontr\u00F3 catalogo de empresas');
								}
							} else {
								toastr.info('No se encontr\u00F3 catalogo de empresas');
							}
						} else {
							toastr.warning(results[6].data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta del catalogo de empresas');
					}

					if (results[7].data !== undefined) {
						if (results[7].data.respuesta) {
							if (results[7].data.result) {
								if (results[7].data.result.length > 0) {
									$scope.data.costos = results[7].data.result;
								} else {
									toastr.info('No se encontr\u00F3 catalogo de centro de costos');
								}
							} else {
								toastr.info('No se encontr\u00F3 catalogo de centro de costos');
							}
						} else {
							toastr.warning(results[7].data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta del catalogo de centro de costos');
					}
				}).catch(err => handleError(err));
			}

			$scope.loadEncierros = function (geografia, encierro) {
				if ($scope.vehiculo.detalle && $scope.vehiculo.detalle.idEncierro) {
					$scope.vehiculo.detalle.idEncierro = "";
				}

				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
				$scope.data.encierros = [];
				controlVehicularService.consultarEncierros({ "idGeografia": geografia }).then(function success(response) {
					swal.close();
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								if (response.data.result.encierros.length) {
									$scope.data.encierros = response.data.result.encierros;

									if ($scope.isEdit && encierro != 0) {
										$scope.data.encierros.map(function (e) {
											if (e.id == encierro) {
												$scope.vehiculo.detalle.idEncierro = encierro.toString();
											}

										})
									}

								} else {
									toastr.info('No se encontraron encierros');
								}
							} else {
								toastr.info('No se encontraron encierros');
							}
						} else {
							toastr.warning(response.data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta de encierros');
					}
				})
			}

			$scope.getVehiculos = function (isSwal) {

				$(".etiquetaContadoresEstadosVehiculos").removeClass('active');
				$("#todosVehiculos .nav-link").addClass('active');

				$scope.countDisponibles = 0;
				$scope.countAsignados = 0;
				$scope.countNoDisponibles = 0;
				$scope.countBajas = 0;
				$scope.countTodos = 0;

				let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
					.filter(e => e.original.nivel == $scope.nGeografia)
					.map(e => parseInt(e.id))

				if (clustersparam.length == 0) {
					mostrarMensajeWarningValidacion('Selecciona geograf\u00EDa');
					return false;
				}

				let params = {
					idGeografias: clustersparam,
					idActivo: 1
				}
				if (isSwal) {
					swal({ text: 'Espera un momento...', allowOutsideClick: false });
					swal.showLoading();
				}

				$scope.vehiculos = [];
				controlVehicularService.consultarVehiculos(params).then(function success(response) {

					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								if (response.data.result.vehiculo.length) {
									$scope.vehiculos = angular.copy(response.data.result.vehiculo);

									angular.forEach($scope.vehiculos, function (vehiculo, index) {
										var estadoVehiculo = vehiculo.estatus.toLowerCase();
										if (estadoVehiculo == "asignado") {
											$scope.countAsignados = $scope.countAsignados + 1;
										}

										if (estadoVehiculo == "baja") {
											$scope.countBajas = $scope.countBajas + 1;
										}

										if (estadoVehiculo == "no disponible") {
											$scope.countNoDisponibles = $scope.countNoDisponibles + 1;
										}

										if (estadoVehiculo == "disponible") {
											$scope.countDisponibles = $scope.countDisponibles + 1;
										}
										$scope.countTodos = $scope.countTodos + 1;
									});

									$scope.buildTableVehiculos($scope.vehiculos);
								} else {
									$scope.buildTableVehiculos($scope.vehiculos);
									swal.close();
								}
							} else {
								$scope.buildTableVehiculos($scope.vehiculos);
								toastr.info('No se encontraron veh\u00EDculos');
								swal.close();
							}
						} else {
							$scope.buildTableVehiculos($scope.vehiculos);
							toastr.warning(response.data.resultDescripcion);
							swal.close();
						}
					} else {
						$scope.buildTableVehiculos($scope.vehiculos);
						toastr.error('Ha ocurrido un error en la consulta de veh\u00EDculos');
						swal.close();
					}
				})
			}

			$scope.getVehiculosInactivos = function (isSwal) {

				let clustersparamInc = $("#jstreeconsultainactivos").jstree("get_selected", true)
					.filter(e => e.original.nivel == $scope.nGeografia)
					.map(e => parseInt(e.id))
				if (clustersparamInc.length == 0) {
					mostrarMensajeWarningValidacion('Selecciona geograf\u00EDa');
					return false;
				}

				let params = {
					idGeografias: clustersparamInc,
					idActivo: 0
				}
				if (isSwal) {
					swal({ text: 'Espera un momento...', allowOutsideClick: false });
					swal.showLoading();
				}


				let arrayRow = [];

				if (vehiculoActivaTable) {
					vehiculoActivaTable.destroy();
				}

				controlVehicularService.consultarVehiculos(params).then(function success(response) {
					swal.close();
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								if (response.data.result.vehiculo.length) {
									$scope.listVehiculosInactivos = response.data.result.vehiculo;
									$.each(response.data.result.vehiculo, function (i, elemento) {
										let random = '?' + Math.floor(Math.random() * (10000 - 0));
										let row = [];
										row[0] = elemento.placa;
										row[1] = elemento.tipo;
										row[2] = elemento.marca;
										row[3] = elemento.modelo;
										row[4] = elemento.anio;
										row[5] = elemento.geografia;
										row[6] = elemento.urlFotoPlaca && elemento.urlFotoPlaca.length > 15 ? '<img style="cursor:pointer; border-radius:.5em" src="' + elemento.urlFotoPlaca + random + '" alt="Placa" width="50" height="30" onclick="showImg(' + "'" + elemento.urlFotoPlaca + "'" + ')"/>' : "";
										row[7] = elemento.urlFotoVehiculo && elemento.urlFotoVehiculo.length > 15 ? '<img style="cursor:pointer; border-radius:.5em" src="' + elemento.urlFotoVehiculo + random + '" alt="Vehiculo" width="50"  height="30" onclick="showImg(' + "'" + elemento.urlFotoVehiculo + "'" + ')"/>' : "";
										row[8] = elemento.estatus;
										if ($scope.configPermisoAccionActivaVehiculos) {
											row[9] = '<span onclick="activeCar(' + "'" + elemento.idVehiculo + "'" + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnActivaUsuario"><i class="fas fa-check" aria-hidden="true"></i></span>';
										} else {
											row[9] = '<span  title="No tienes permisos para activar" style="cursor: no-drop; opacity: 0.3 !important;"  class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnActivaUsuario"><i class="fas fa-unlock" aria-hidden="true"></i></span>';
										}

										arrayRow.push(row);
									})
								}
							} else {
								toastr.info('No se encontraron veh\u00EDculos inactivos');
							}
						} else {
							toastr.warning(response.data.resultDescripcion);
						}
					} else {
						toastr.error('Ha ocurrido un error en la consulta de veh\u00EDculos inactivos');
					}

					vehiculoActivaTable = $('#vehiculoActivaTable').DataTable({
						"paging": true,
						"lengthChange": false,
						"ordering": true,
						"pageLength": 10,
						"info": true,
						"scrollX": false,
						"data": arrayRow,
						"autoWidth": false,
						"language": idioma_espanol_not_font,
						"aoColumnDefs": [
							{ "aTargets": [9], "bSortable": false },
						]
					});
				})
			}

			filterByStatus = function (status) {
				let list = [];
				let listVehiculos = angular.copy($scope.vehiculos);
				$.each(listVehiculos, function (i, elemento) {
					if (elemento.idEstatus == status) {
						list.push(elemento);
					}
				})
				$scope.buildTableVehiculos(list);
			}

			$scope.buildTableVehiculos = function (list) {
				if (vehiculoTable) {
					vehiculoTable.destroy();
				}

				let arrayRow = [];
				$.each(list, function (i, elemento) {
					let random = '?' + Math.floor(Math.random() * (10000 - 0));
					let row = [];
					row[0] = elemento.placa;
					row[1] = elemento.tipo;
					row[2] = elemento.marca;
					row[3] = elemento.modelo;
					row[4] = elemento.anio;
					row[5] = elemento.geografia;
					row[6] = elemento.urlFotoPlaca ? '<img style="cursor:pointer; border-radius:.5em" src="' + elemento.urlFotoPlaca + random + '" alt="Placa" width="50" height="30" onclick="showImg(' + "'" + elemento.urlFotoPlaca + "'" + ')"/>' : "";
					row[7] = elemento.urlFotoVehiculo ? '<img style="cursor:pointer; border-radius:.5em" src="' + elemento.urlFotoVehiculo + random + '" alt="Vehiculo" width="50"  height="30" onclick="showImg(' + "'" + elemento.urlFotoVehiculo + "'" + ')"/>' : "";
					row[8] = elemento.estatus;
					if ($scope.configPermisoAccionEditaVehiculos) {
						row[9] = '<span onclick="editCar(' + "'" + elemento.idVehiculo + "'" + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnModificarUsuario"><i class="fas fa-pen" aria-hidden="true"></i></span>';
					} else {
						row[9] = '<span title="No tienes permisos para editar" style="cursor: no-drop; opacity: 0.3 !important;" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnModificarUsuario"><i class="fas fa-unlock" aria-hidden="true"></i></span>';
					}

					if ($scope.configPermisoAccionEliminaVehiculos) {
						row[10] = '<span onclick="deleteCar(' + "'" + elemento.idVehiculo + "'" + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnEliminarUsuario"><i class="fas fa-trash" aria-hidden="true"></i></span>';
					} else {
						row[10] = '<span  title="No tienes permisos para eliminar" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones btnEliminarUsuario" style="cursor: no-drop; opacity: 0.3 !important;"><i class="fas fa-unlock" aria-hidden="true"></i></span>';
					}

					arrayRow.push(row);
				})
				vehiculoTable = $('#vehiculoTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"ordering": true,
					"pageLength": 10,
					"info": true,
					"scrollX": false,
					"data": arrayRow,
					"autoWidth": false,
					"language": idioma_espanol_not_font,
					"aoColumnDefs": [
						{ "aTargets": [9,10], "bSortable": false },
					]
				});

				swal.close();

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

			showImg = function (img) {
				$("#modalFoto").modal('show');
				$("#img_vehiculo").attr("src", img);
			}

			showImgResumen = function (element) {
				$("#modalFoto").modal('show');
				$("#img_vehiculo").attr("src", element.src);
			}

			$scope.obtenerNivelUltimoJerarquiaGeneric = function (list) {
				return list.sort(compareGeneric)[0].nivel
			}

			$scope.getConfiguration();
			$scope.getData();

			$scope.loadMarca = function () {
				let tipoV = Number($("#tipo").val());
				$scope.marcas = [];
				$scope.lineas = [];
				$scope.marcasTemp = [];
				if ($scope.vehiculo.idMarca) {
					$scope.vehiculo.idMarca = null;
				}

				$scope.data.tipoVehiculos.map(function (e) {
					if (tipoV === e.idTipoVehiculo) {
						if (e.marcas.length) {
							e.marcas.map(function (m) {
								if (m.nivel == "1") {
									$scope.marcas.push(m);
								} else if (m.nivel == "2") {
									$scope.marcasTemp.push(m);
								}
							})
						}
					}
				});
			}

			$scope.loadLinea = function () {
				let marcaV = Number($("#marca").val());
				$scope.lineas = [];
				if ($scope.vehiculo.idModelo) {
					$scope.vehiculo.idModelo = null;
				}
				$scope.marcasTemp.map(function (e) {
					if (marcaV == e.padre) {
						$scope.lineas.push(e);
					}
				});
			}

			$scope.loadMarcaLinea = function (tipo, marca, status, modelo) {
				$scope.marcas = [];
				$scope.marcasTemp = [];
				$scope.lineas = [];
				$scope.data.tipoVehiculos.map(function (e) {
					if (tipo === e.idTipoVehiculo) {
						if (e.marcas.length) {
							e.marcas.map(function (m) {
								if (m.nivel == "1") {
									if (m.idMarca == marca) {
										$scope.vehiculo.idMarca = marca.toString();
									}
									$scope.marcas.push(m);
								} else if (m.nivel == "2") {
									$scope.marcasTemp.push(m);
									if (marca == m.padre) {
										if (m.idMarca == modelo) {
											$scope.vehiculo.idModelo = modelo.toString();
										}
										$scope.lineas.push(m);
									}
								}
							})
						}
					}
				});
				$scope.loadMotivo(status);
			}

			getNameText = function () {
				let geografia = $scope.vehiculoText.geografiaText;
				$scope.vehiculoText = {};
				$scope.vehiculoText.geografiaText = geografia;
				$scope.data.tipoVehiculos.map(function (t) {
					if (t.idTipoVehiculo == Number($scope.vehiculo.idTipo)) {
						$scope.vehiculoText.tipoText = t.tipoVehiculo;
					}
				})

				$scope.marcas.map(function (m) {
					if (m.idMarca == Number($scope.vehiculo.idMarca)) {
						$scope.vehiculoText.marcaText = m.nombre;
					}
				})

				$scope.lineas.map(function (l) {
					if (l.idMarca == Number($scope.vehiculo.idModelo)) {
						$scope.vehiculoText.lineaText = l.nombre;
					}
				})

				$scope.data.colores.map(function (c) {
					if (c.idColor == Number($scope.vehiculo.idColor)) {
						$scope.vehiculoText.colorText = c.descripcion.toUpperCase();
					}
				})

				$scope.data.operaciones.map(function (c) {
					if (c.id == Number($scope.vehiculo.idOperacion)) {
						$scope.vehiculoText.operacionText = c.descripcion.toUpperCase();
					}
				})

				$scope.data.costos.map(function (c) {
					if (c.id == Number($scope.vehiculo.idCosto)) {
						$scope.vehiculoText.costoText = c.descripcion.toUpperCase();
					}
				})

				$scope.data.cuadrillas.map(function (c) {
					if (c.id == Number($scope.vehiculo.idTipoCuadrilla)) {
						$scope.vehiculoText.cuadrillaText = c.descripcion.toUpperCase();
					}
				})

				$scope.data.empresas.map(function (c) {
					if (c.id == Number($scope.vehiculo.idEmpresa)) {
						$scope.vehiculoText.empresaText = c.descripcion.toUpperCase();
					}
				})

				$scope.data.seguros.map(function (s) {
					if ($scope.vehiculo.detalle && s.idSeguro == Number($scope.vehiculo.detalle.idAseguradora)) {
						$scope.vehiculoText.aseguradoraText = s.descripcion;
					}
				})

				if ($scope.data.encierros) {
					$scope.data.encierros.map(function (e) {
						if ($scope.vehiculo.detalle && e.id == Number($scope.vehiculo.detalle.idEncierro)) {
							$scope.vehiculoText.encierroText = e.descripcion;
						}
					})
				}


				$scope.vehiculoText.rotulado = false;
				if ($("#rotuladoSi").is(":checked")) {
					$scope.vehiculoText.rotulado = true;
				}

				if ($("#fechaVerificacion").val()) {
					$scope.vehiculoText.fechaVerificacion = $("#fechaVerificacion").val();
				}

				if ($("#vencimientoTarjeta").val()) {
					$scope.vehiculoText.fechaVencimientoTarjeta = $("#vencimientoTarjeta").val();
				}

				if ($("#vencimientoPoliza").val()) {
					$scope.vehiculoText.fechaVencimientoPoliza = $("#vencimientoPoliza").val();
				}
				$scope.vehiculoText.anio = $("#anio").val();

				if ($scope.isEdit) {
					$scope.data.estatus.map(function (e) {
						if ($scope.vehiculo.detalle && e.idEstatus == Number($scope.vehiculo.idEstatus)) {
							$scope.vehiculoText.estatus = e.nombre;
						}
					})

					if (Number($("#motivo").val()) > 0) {
						let motivo = $scope.data.motivos.find(m => { return m.idEstatus === Number($("#motivo").val()) });
						$scope.vehiculoText.motivo = motivo.nombre;
					}
				}
				$scope.printImg();
				$scope.$apply();
			}

			$scope.printImg = function () {
				$("#placaImagen").attr("src", $scope.vehiculo.urlFotoPlaca);
				$("#vehiculoImagen").attr("src", $scope.vehiculo.urlFotoVehiculo);
				if ($scope.vehiculo.detalle) {
					$("#circulacionImagen").attr("src", $scope.vehiculo.detalle.urlFotoTarjetaCirculacion);
					$("#gasolinaImagen").attr("src", $scope.vehiculo.detalle.urlFotoTarjetaGasolina);
					$("#licenciaImagen").attr("src", $scope.vehiculo.detalle.urlFotoIdentificacion);
					if ($scope.vehiculo.detalle.holograma) $scope.vehiculo.detalle.holograma = $scope.vehiculo.detalle.holograma.toUpperCase();
				}

				if ($scope.filePlaca) {
					$("#placaImagen").attr("src", "data:image/jpeg;base64," + $scope.filePlaca.archivo);
				}
				if ($scope.fileVehiculo) {
					$("#vehiculoImagen").attr("src", "data:image/jpeg;base64," + $scope.fileVehiculo.archivo);
				}
				if ($scope.fileCirculacion) {
					$("#circulacionImagen").attr("src", "data:image/jpeg;base64," + $scope.fileCirculacion.archivo);
				}

				if ($scope.fileGasolina) {
					$("#gasolinaImagen").attr("src", "data:image/jpeg;base64," + $scope.fileGasolina.archivo);
				}

				if ($scope.fileLicencia) {
					$("#licenciaImagen").attr("src", "data:image/jpeg;base64," + $scope.fileLicencia.archivo);
				}

			}

			$scope.printImgTab = function () {
				let nameTemp = '?' + $scope.vehiculo.placa;
				$("#placaImagenTab").attr("src", $scope.vehiculo.urlFotoPlaca + nameTemp);
				$("#vehiculoImagenTab").attr("src", $scope.vehiculo.urlFotoVehiculo + nameTemp);
				if ($scope.vehiculo.detalle) {
					$("#circulacionImagenTab").attr("src", $scope.vehiculo.detalle.urlFotoTarjetaCirculacion + nameTemp);
					$("#gasolinaImagenTab").attr("src", $scope.vehiculo.detalle.urlFotoTarjetaGasolina + nameTemp);
					$("#licenciaImagenTab").attr("src", $scope.vehiculo.detalle.urlFotoIdentificacion + nameTemp);
				}
				if ($scope.filePlaca) {
					$("#placaImagenTab").attr("src", "data:image/jpeg;base64," + $scope.filePlaca.archivo);
				}
				if ($scope.fileVehiculo) {
					$("#vehiculoImagenTab").attr("src", "data:image/jpeg;base64," + $scope.fileVehiculo.archivo);
				}
				if ($scope.fileCirculacion) {
					$("#circulacionImagenTab").attr("src", "data:image/jpeg;base64," + $scope.fileCirculacion.archivo);
				}

				if ($scope.fileGasolina) {
					$("#gasolinaImagenTab").attr("src", "data:image/jpeg;base64," + $scope.fileGasolina.archivo);
				}

				if ($scope.fileLicencia) {
					$("#licenciaImagenTab").attr("src", "data:image/jpeg;base64," + $scope.fileLicencia.archivo);
				}

			}


			$scope.loadMotivo = function (st, motivo) {
				let status = Number($("#estatus").val());
				if (st) {
					status = st;
				}

				$scope.motivos = [];
				$scope.data.motivos.map(function (e) {
					if (status == e.padre) {
						$scope.motivos.push(e);
					}
				})

				$scope.data.motivos.map(function (e) {
					if (e.idEstatus == motivo) {
						$scope.vehiculo.idMotivo = motivo.toString();
					}
				})
			}

			$scope.setCheck = function (elementoInt) {
				elementoInt.checkedOpcion = !elementoInt.checkedOpcion
				if (elementoInt.subfiltros) {
					elementoInt.subfiltros.map(function (e) {
						e.checkedOpcion = elementoInt.checkedOpcion
						return e
					})
				}

			}

			$scope.seleccionarTodos = function (list) {
				list.map(function (e) {
					e.checkedOpcion = true;

					if (e.subfiltros) {
						e.subfiltros.map(function (j) {
							j.checkedOpcion = true
							return j
						})
					}

				})

			}

			$scope.deseleccionarTodos = function (list) {
				list.map(function (e) {
					e.checkedOpcion = false;
					if (e.subfiltros) {
						e.subfiltros.map(function (j) {
							j.checkedOpcion = false
							return j
						})
					}
				})
			}

			$scope.getFechaFormato = function (fecha) {
				let fechaPrueba = fecha.split('/');
				if (fechaPrueba.length > 1) {
					return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
				} else {
					return fecha;
				}
			}

			guardarCambios = function () {
				$(".form-control-sm").removeClass("input-valid-error");
				if ($scope.validateFormGen() && $scope.validateFormDocs()) {
					swal({
						title: "Se actualizar\u00E1 la informaci\u00F3n del veh\u00EDculo",
						text: "\u00BFDesea guardar la informaci\u00F3n del veh\u00EDculo?",
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: '#007bff',
						confirmButtonText: 'Si',
						cancelButtonText: 'No'
					}).then(function (isConfirm) {
						if (isConfirm) {
							$scope.guardarVehiculo();
						}
					}).catch(err => {

					});
				}
			}

			$scope.guardarVehiculo = function () {
				let clustersparam = $("#jstreealta").jstree("get_selected", true)
					.filter(e => e.original.nivel == $scope.nGeografia)
					.map(e => parseInt(e.id))
				let paramsTemp = angular.copy($scope.vehiculo);
				let pathImg = $scope.llaveArchivoPath + paramsTemp.placa + '/';

				let deleteObject = {
					"archivo": "",
					"nombre": ""
				}

				let actualObject = {
					"archivo": null,
					"nombre": null
				}

				paramsTemp.fotoPlaca = actualObject;
				paramsTemp.fotoVehiculo = actualObject;
				paramsTemp.detalle.fotoTarjetaCirculacion = actualObject;
				paramsTemp.detalle.fotoTarjetaGasolina = actualObject;
				paramsTemp.detalle.fotoLicencia = actualObject;

				if ($scope.filePlaca) {
					$scope.filePlaca.nombre = pathImg + $scope.filePlaca.nombre;
					paramsTemp.fotoPlaca = $scope.filePlaca;
				}

				if ($scope.fileVehiculo) {
					$scope.fileVehiculo.nombre = pathImg + $scope.fileVehiculo.nombre;
					paramsTemp.fotoVehiculo = $scope.fileVehiculo;
				}


				paramsTemp.idGeografia = clustersparam[0];
				paramsTemp.anio = $("#anio").val();

				if (!paramsTemp.detalle) {
					let detalle = {};
					detalle.rotulado = $("#rotuladoSi").is(":checked");
					paramsTemp.detalle = detalle;
				} else {
					paramsTemp.detalle.rotulado = $("#rotuladoSi").is(":checked");
				}

				if ($scope.fileCirculacion) {
					$scope.fileCirculacion.nombre = pathImg + $scope.fileCirculacion.nombre;
					paramsTemp.detalle.fotoTarjetaCirculacion = $scope.fileCirculacion;
				}

				if ($scope.fileGasolina) {
					$scope.fileGasolina.nombre = pathImg + $scope.fileGasolina.nombre;
					paramsTemp.detalle.fotoTarjetaGasolina = $scope.fileGasolina;
				}

				if ($scope.fileLicencia) {
					$scope.fileLicencia.nombre = pathImg + $scope.fileLicencia.nombre;
					paramsTemp.detalle.fotoLicencia = $scope.fileLicencia;
				}

				if ($("#fechaVerificacion").val()) {
					paramsTemp.detalle.fechaVerificacion = $scope.getFechaFormato($("#fechaVerificacion").val());
				}

				if ($("#vencimientoTarjeta").val()) {
					paramsTemp.detalle.fechaVencimientotarjeta = $scope.getFechaFormato($("#vencimientoTarjeta").val());
				}

				if ($("#vencimientoPoliza").val()) {
					paramsTemp.detalle.fechaVencimientoPoliza = $scope.getFechaFormato($("#vencimientoPoliza").val());
				}

				if ($scope.isEdit) {
					if (!$scope.filePlaca && paramsTemp.urlFotoPlaca == 'delete') {
						paramsTemp.fotoPlaca = deleteObject;
					}

					if (!$scope.fileVehiculo && paramsTemp.urlFotoVehiculo == 'delete') {
						paramsTemp.fotoVehiculo = deleteObject;
					}

					if (!$scope.fileCirculacion && paramsTemp.detalle.urlFotoTarjetaCirculacion == 'delete') {
						paramsTemp.detalle.fotoTarjetaCirculacion = deleteObject;
					}

					if (!$scope.fileGasolina && paramsTemp.detalle.urlFotoTarjetaGasolina == 'delete') {
						paramsTemp.detalle.fotoTarjetaGasolina = deleteObject;
					}

					if (!$scope.fileLicencia && paramsTemp.detalle.urlFotoIdentificacion == 'delete') {
						paramsTemp.detalle.fotoLicencia = deleteObject;
					}
				}
				//console.log(paramsTemp);
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
				if (paramsTemp.idVehiculo) {
					$scope.editarVehiculo(paramsTemp);
				} else {
					$scope.crearVehiculo(paramsTemp);
				}
			}

			$scope.crearVehiculo = function (paramsTemp) {
				let tituloAccion = "Crear vehículo";
				let mensajeEnvio = 'Ha ocurrido un error al crear el vehículo con la placa ' + paramsTemp.placa;
				controlVehicularService.crearVehiculo(paramsTemp).then(function success(response) {
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								$scope.isEdit = false;
								mensajeEnvio = 'Se ha creado el vehículo con la placa ' + paramsTemp.placa;
								objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
								toastr.success('Acci&oacute;n completada');
								if ($scope.configPermisoAccionConsultaVehiculos) {
									setTimeout(function () {
										$("#consulta-tab").click();
										$scope.getVehiculos(false);
									}, 300)
								} else {
									setTimeout(function () {
										$("#alta-tab").click();
										swal.close();
									}, 300)
								}

								$("#jstreealta").jstree("destroy");
								$scope.clearForm();
								$scope.initWizard();
							} else {
								swal.close();
								objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
								mostrarMensajeErrorAlert(response.data.resultDescripcion);
							}
						} else {
							swal.close();
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
						}
					} else {
						swal.close();
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				});

			}

			$scope.editarVehiculo = function (paramsTemp) {
				let tituloAccion = "Editar vehí;culo";
				let mensajeEnvio = 'Ha ocurrido un error al editar el vehículo con la placa ' + paramsTemp.placa;
				controlVehicularService.editarVehiculo(paramsTemp).then(function success(response) {
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								$scope.isEdit = false;
								mensajeEnvio = 'Se ha editado el vehículo con la placa ' + paramsTemp.placa;
								objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
								toastr.success("Acci&oacute;n completada");
								setTimeout(function () {
									$("#consulta-tab").click();
									$scope.getVehiculos(false);
								}, 300)
								$("#jstreealta").jstree("destroy");
								$scope.clearForm();
								$scope.initWizard();
							} else {
								swal.close();
								objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
								mostrarMensajeErrorAlert(response.data.resultDescripcion);
							}
						} else {
							swal.close();
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
						}
					} else {
						swal.close();
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				});

			}

			$scope.clearForm = function () {
				$scope.vehiculo = {};
				$scope.vehiculoText = {};
				$scope.lineas = [];
				$scope.marcas = [];
				$scope.marcasTemp = [];
				$scope.data.encierros = [];
				$scope.padre = null;
				$("#anio").val("");
				$("#fechaVerificacion").val("");
				$("#vencimientoTarjeta").val("");
				$("#vencimientoPoliza").val("");


				$("#fotoPlaca").text('Cargar Imagen');
				$("#filePlaca").val('');

				$("#fileFoto").val('');
				$("#fotoVehiculo").text('Cargar Imagen');

				$("#fotoTarjetaCirculaion").text('Cargar Imagen');
				$("#fileTarjeta").val('');

				$("#fileTarjetaGas").val('');
				$("#fotoTarjetaGasolina").text('Cargar Imagen');

				$("#fileLicencia").val('');
				$("#fotoLicencia").text('Cargar Imagen');

				let geografiaAlta = angular.copy($scope.geografiaList);
				geografiaAlta.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
				geografiaAlta.map((e) => {
					e.parent = e.padre == null ? 0 : e.padre;
					e.text = e.nombre;
					e.icon = "fa fa-globe";
					e.state = {
						opened: false,
						selected: false,
					}
					return e
				})
				$scope.loadArbolRegistro(geografiaAlta);
				document.getElementById('arbol_vehiculo_consulta').placeholder = 'NO HAY SELECCI\u00D3N';
				$scope.filePlaca = null;
				$scope.fileVehiculo = null;
				$scope.fileCirculacion = null;
				$scope.fileGasolina = null;
				$scope.fileLicencia = null;
				$("#rotuladoSi").prop("checked", true);
				$(".form-control-sm").removeClass("input-valid-error");
			}

			$scope.validateFormDocs = function () {
				let text = "";
				let hasNumber = /^[0-9]{2,25}$/;
				let hasLetterAndNumber = /^[a-zA-Z0-9]{2,15}$/;
				if ($("#numMotor").val() && !hasLetterAndNumber.test($("#numMotor").val())) {
					$("#numMotor").addClass("input-valid-error");
					text += "<li>N&uacute;m. del Motor</li>";
				}

				if ($("#numChasis").val() && !hasLetterAndNumber.test($("#numChasis").val())) {
					$("#numChasis").addClass("input-valid-error");
					text += "<li>N&uacute;m. de Chasis</li>";
				}

				if ($("#numPoliza").val() && !hasLetterAndNumber.test($("#numPoliza").val())) {
					$("#numPoliza").addClass("input-valid-error");
					text += "<li>N&uacute;m. de Poliza</li>";
				}

				if ($("#numTarjetaC").val() && !hasLetterAndNumber.test($("#numTarjetaC").val())) {
					$("#numTarjetaC").addClass("input-valid-error");
					text += "<li>N&uacute;m. de Tarjeta de Circulaci&oacute;n</li>";
				}

				if ($("#numVerificacion").val() && !hasNumber.test($("#numVerificacion").val())) {
					$("#numVerificacion").addClass("input-valid-error");
					text += "<li>N&uacute;m. de Verificaci&oacute;n</li>";
				}

				if ($("#clavePension").val() && !hasNumber.test($("#clavePension").val())) {
					$("#clavePension").addClass("input-valid-error");
					text += "<li>Clave Pensi&oacute;n</li>";
				}

				if ($("#numTarjetaG").val() && !hasNumber.test($("#numTarjetaG").val())) {
					$("#numTarjetaG").addClass("input-valid-error");
					text += "<li>N&uacute;m. de Tarjeta Gasolina</li>";
				}

				if ($("#gps").val() && !hasNumber.test($("#gps").val())) {
					$("#gps").addClass("input-valid-error");
					text += "<li>Clave GSP</li>";
				}

				if (text !== "") {
					let info = "Verifica los siguientes campos: " + text;
					mostrarMensajeWarningValidacion(info);
					$("#pills-resumen-tab").removeClass("active");
					$("#pills-resumen").removeClass("active show");
					$("#pills-documentacion-tab").addClass("active");
					$("#pills-documentacion").addClass("active show");
					return false;
				} else {
					return true;
				}

			}

			$scope.validateFormGen = function () {
				let text = "";
				let hasLetterAndNumber = /^[a-zA-Z0-9]{17}$/;
				let isPlaca = /^[a-zA-Z0-9 -]/;
				let year = /^\d{4}$/i;

				let clustersparam = $("#jstreealta").jstree("get_selected", true)
					.filter(e => e.original.nivel == $scope.nGeografia)
					.map(e => parseInt(e.id))

				if ($("#tipo").val() === "" || $("#tipo").val() === undefined) {
					$("#tipo").addClass("input-valid-error");
					text += "<li>Tipo veh&iacute;culo</li>";
				}

				if ($("#marca").val() === "" || $("#marca").val() === undefined) {
					$("#marca").addClass("input-valid-error");
					text += "<li>Marca veh&iacute;culo</li>";
				}

				if ($("#linea").val() === "" || $("#linea").val() === undefined) {
					$("#linea").addClass("input-valid-error");
					text += "<li>L&iacute;nea veh&iacute;culo</li>";
				}

				if ($("#anio").val() === "" || $("#anio").val() === undefined || !year.test($("#anio").val())) {
					$("#anio").addClass("input-valid-error");
					text += "<li>A&ntilde;o del veh&iacute;culo</li>";
				}

				if ($("#color").val() === "" || $("#color").val() === undefined) {
					$("#color").addClass("input-valid-error");
					text += "<li>Color</li>";
				}

				if ($("#operacion").val() === "" || $("#operacion").val() === undefined) {
					$("#operacion").addClass("input-valid-error");
					text += "<li>Tipo operaci&oacute;n</li>";
				}

				if ($("#cuadrilla").val() === "" || $("#cuadrilla").val() === undefined) {
					$("#cuadrilla").addClass("input-valid-error");
					text += "<li>Tipo cuadrilla</li>";
				}

				if ($("#empresa").val() === "" || $("#empresa").val() === undefined) {
					$("#empresa").addClass("input-valid-error");
					text += "<li>Empresa</li>";
				}

				if ($("#color").val() === "" || $("#color").val() === undefined) {
					$("#color").addClass("input-valid-error");
					text += "<li>Color</li>";
				}

				if ($("#centroCostos").val() === "" || $("#centroCostos").val() === undefined) {
					$("#centroCostos").addClass("input-valid-error");
					text += "<li>Centro de costos</li>";
				}

				if ($("#expediente").val() === "" || $("#expediente").val() === undefined) {
					$("#expediente").addClass("input-valid-error");
					text += "<li>Expediente</li>";
				}

				if ($("#placa").val() === "" || $("#placa").val() === undefined) {
					$("#placa").addClass("input-valid-error");
					text += "<li>Placa</li>";
				} else {
					if (!isPlaca.test($("#placa").val())) {
						$("#placa").addClass("input-valid-error");
						text += "<li>Placa (alfan&uacute;merico)</li>";
					} else {
						if (!$("#tipo").val() && $("#placa").val()) {
							text += "<li>Placa (Selecicona tipo veh&iacute;culo)</li>";
						} else {
							if ($("#tipo").val() == "1" && ($("#placa").val().trim().length < 6 || $("#placa").val().trim().length > 7)) {
								$("#placa").addClass("input-valid-error");
								text += "<li>Placa (6 a 7 car&aacute;cteres)</li>";
							} else if ($("#tipo").val() == "2" && ($("#placa").val().trim().length < 5 || $("#placa").val().trim().length > 6)) {
								$("#placa").addClass("input-valid-error");
								text += "<li>Placa (5 a 6 car&aacute;cteres)</li>";
							}
						}
					}
				}

				if (($("#numSerie").val() === "" || $("#numSerie").val() === undefined) || !hasLetterAndNumber.test($("#numSerie").val())) {
					$("#numSerie").addClass("input-valid-error");
					text += "<li>N&uacute;m. de serie (17 car&aacute;cteres)</li>";
				}

				if (clustersparam.length == 0 || document.getElementById('arbol_vehiculo_consulta').placeholder == 'NO HAY SELECCI\u00D3N') {
					$("#arbol_vehiculo_consulta").addClass("input-valid-error");
					text += '<li>Seleccione una geograf\u00EDa</li>';
				}

				if ($("#encierro").val() === "" || $("#encierro").val() === undefined) {
					$("#encierro").addClass("input-valid-error");
					text += "<li>Ubicaci&oacute;n CDO</li>";
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

			editCar = function (id) {
				$scope.getCarById(id);
			}

			deleteCar = function (id) {
				swal({
					title: "Se eliminar\u00E1 el veh\u00EDculo",
					text: "\u00BFDesea eliminar el veh\u00EDculo?",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: '#007bff',
					confirmButtonText: 'Si',
					cancelButtonText: 'No'
				}).then(function (isConfirm) {
					if (isConfirm) {
						$scope.statusVehiculo(0, id);
					}
				}).catch(err => {

				});

			}

			activeCar = function (id) {
				swal({
					title: "Se activar\u00E1 el veh\u00EDculo",
					text: "\u00BFDesea activar el veh\u00EDculo?",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: '#007bff',
					confirmButtonText: 'Si',
					cancelButtonText: 'No'
				}).then(function (isConfirm) {
					if (isConfirm) {
						$scope.statusVehiculo(1, id);
					}
				}).catch(err => {

				});

			}

			$scope.statusVehiculo = function (st, id) {
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
				controlVehicularService.consultarVehiculoUnico({ "idVehiculo": id }).then(function success(response) {
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								let params = response.data.result.vehiculo;
								let actualObject = {
									"archivo": null,
									"nombre": null
								}
								params.fotoPlaca = actualObject;
								params.fotoVehiculo = actualObject;
								if (!params.detalle) {
									params.detalle = {};
								}
								params.detalle.fotoTarjetaCirculacion = actualObject;
								params.detalle.fotoTarjetaGasolina = actualObject;
								params.idActivo = st;
								let placaTemp = st == 1 ? $scope.listVehiculosInactivos.find((v) =>  v.idVehiculo == id ) : $scope.vehiculos.find((v) =>  v.idVehiculo == id );
								let tituloAccion = st ? "Restaurar vehículo" : "Eliminar vehículo";
								let mensajeEnvio = st ? 'Ha ocurrido un error al restaurar el vehículo con la placa ' + placaTemp.placa : 'Ha ocurrido un error al eliminar el veh&iacute;culo con la placa ' + placaTemp.placa;
								controlVehicularService.editarVehiculo(params).then(function success(response) {
									if (response.data !== undefined) {
										if (response.data.respuesta) {
											if (response.data.result) {
												if (st == 1) {
													$scope.getVehiculosInactivos(false);
												} else {
													$scope.getVehiculos(false);
												}
												mensajeEnvio = st ? 'Se restauró; el vehículo con la placa ' + placaTemp.placa : 'Se elimin&oacute; el veh&iacute;culo con la placa ' + placaTemp.placa;
												objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
												toastr.success('Acci&oacute;n completada');
											} else {
												swal.close();
												objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
												mostrarMensajeErrorAlert(response.data.resultDescripcion);
											}
										} else {
											swal.close();
											objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
											mostrarMensajeErrorAlert(response.data.resultDescripcion);
										}
									} else {
										swal.close();
										objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
										mostrarMensajeErrorAlert(response.data.resultDescripcion);
									}
								});
							}
						}
					}
				});
			}

			$scope.subirArchivo = function (e, name) {
				let labelFile = "#" + name;
				if (e.target.files[0]) {
					$(labelFile).text(e.target.files[0].name);
					let reader = new FileReader();
					reader.readAsDataURL(e.target.files[0]);
					reader.onload = function () {
						let base64 = reader.result.toString().split(",");
						let imgExt = (e.target.files[0].name).split('.')[1];
						let img = {
							"archivo": base64[1],
							"nombre": ''
						}
						if (name == 'fotoPlaca') {
							img.nombre = 'placa.' + imgExt;
							$scope.filePlaca = img;
							$("#filePlaca").val("");
						}


						if (name == 'fotoVehiculo') {
							img.nombre = 'vehiculo.' + imgExt;
							$scope.fileVehiculo = img;
							$("#fileFoto").val("");
						}


						if (name == 'fotoTarjetaCirculaion') {
							img.nombre = 'tarjetaCirculacion.' + imgExt;
							$scope.fileCirculacion = img;
							$("#fileTarjeta").val("");
						}

						if (name == 'fotoTarjetaGasolina') {
							img.nombre = 'tarjetaGasolina.' + imgExt;
							$scope.fileGasolina = img;
							$("#fileTarjetaGas").val("");
						}

						if (name == 'fotoLicencia') {
							img.nombre = 'fotoLicencia.' + imgExt;
							$scope.fileLicencia = img;
							$("#fileFotoLicencia").val("");
						}

						$scope.$apply();
						$scope.printImgTab();
						$scope.$apply();

					};
					reader.onerror = function (error) {
						console.log('Error: ', error);
					};
				} else {
					if (name == 'fotoPlaca') {
						$scope.filePlaca = null;
					}


					if (name == 'fotoVehiculo') {
						$scope.fileVehiculo = null;
					}


					if (name == 'fotoTarjetaCirculaion') {
						$scope.fileCirculacion = null;
					}


					if (name == 'fotoTarjetaGasolina') {
						$scope.fileGasolina = null;
					}

					if (name == 'fotoLicencia') {
						$scope.fileLicencia = null;
					}
					$(labelFile).text('Cargar Imagen');
					$scope.$apply();
					$scope.printImgTab();
					$scope.$apply();

				}
			}

			deleteFile = function (name) {
				let labelFile = "#" + name;
				if (name == 'fotoPlaca') {
					$scope.filePlaca = null;
					$("#filePlaca").prop("src", "");
				}

				if (name == 'fotoVehiculo') {
					$scope.fileVehiculo = null;
					$("#fileFoto").prop("src", "");
				}


				if (name == 'fotoTarjetaCirculaion') {
					$scope.fileCirculacion = null;
					$("#fileTarjeta").prop("src", "");
				}


				if (name == 'fotoTarjetaGasolina') {
					$scope.fileGasolina = null;
					$("#fileTarjetaGas").prop("src", "");
				}

				if (name == 'fotoLicencia') {
					$scope.fileLicencia = null;
					$("#fileLicencia").prop("src", "");
				}

				$(labelFile).text('Cargar Imagen');
				$scope.$apply();
				$scope.printImgTab();
				$scope.$apply();
			}

			$scope.deleteFileUrl = function (name) {

				if (name == 'fotoPlaca') {
					$scope.vehiculo.urlFotoPlaca = 'delete';

				}

				if (name == 'fotoVehiculo') {
					$scope.vehiculo.urlFotoVehiculo = 'delete';
				}


				if (name == 'fotoTarjetaCirculaion') {
					$scope.vehiculo.detalle.urlFotoTarjetaCirculacion = 'delete';
				}


				if (name == 'fotoTarjetaGasolina') {
					$scope.vehiculo.detalle.urlFotoTarjetaGasolina = 'delete';
				}

				if (name == 'fotoLicencia') {
					$scope.vehiculo.detalle.urlFotoIdentificacion = 'delete';
				}
			}


			$scope.abrirModalGeografia = function () {
				$scope.jstreeType = 3;
				$('#searchGeoAlta').val('');
				$("#jstreealta").jstree("search", '');
				$("#modal_cluster_arbol_vehiculo").modal('show');
				setTimeout(function () {
					$("#searchGeoAlta").focus();
				}, 750);
			}

			abrirModalGeografiaBuscar = function () {
				$scope.jstreeType = 1;
				$scope.$apply();
				$('#searchGeoConsulta').val('');
				$("#jstreeconsulta").jstree("search", '');
				$("#modal_cluster_arbol_vehiculo").modal('show');
				setTimeout(function () {
					$("#searchGeoConsulta").focus();
				}, 750);
			}

			abrirModalGeografiaInactivos = function () {
				$scope.jstreeType = 2;
				$scope.$apply();
				$('#searchGeoConsultaInactivo').val('');
				$("#jstreeconsultainactivos").jstree("search", '');
				$("#modal_cluster_arbol_vehiculo").modal('show');
				setTimeout(function () {
					$("#searchGeoConsultaInactivo").focus();
				}, 750);
			}



			buscarPlaca = function () {
				if ($("#placa").val().length > 4 && $("#placa").val().length < 8 && $scope.isEdit == false) {
					$scope.getPlaca();
				}
			}

			$scope.getPlaca = function () {
				controlVehicularService.consultaVehiculoPlaca({ "placa": $scope.vehiculo.placa }).then(function success(response) {
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result && response.data.result.vehiculo) {
								if ($scope.configPermisoAccionEditaVehiculos) {
									swal({
										title: "La placa se encuentra registrada",
										text: "\u00BFDesea modificar la placa?",
										type: "warning",
										showCancelButton: true,
										confirmButtonColor: '#007bff',
										confirmButtonText: 'Si',
										cancelButtonText: 'No'
									}).then(function (isConfirm) {
										if (isConfirm) {
											$("#alta-tab").removeClass("active");
											$scope.isEdit = true;
											$scope.$apply();
											$scope.clearForm();
											$scope.applyData(response.data.result.vehiculo);
											setTimeout(function () {
												$("#modifica-tab").click();
												swal.close();
											}, 300)
											$scope.initWizard();
										}
									}).catch(err => {

									});
								} else {
									swal({ title: 'La placa se encuentra registrada', text: 'No tienes permisos para modificarla', type: 'warning' })
								}

							} else if (response.data.result && response.data.result.idActivo == 0) {
								toastr.warning('El veh&iacute;culo ya existe pero se encuentra inactivo');
							} else {
								swal.close();
							}
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				});
			}

			$scope.getCarById = function (id) {
				controlVehicularService.consultarVehiculoUnico({ "idVehiculo": id }).then(function success(response) {
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								if (response.data.result.vehiculo) {
									$scope.clearForm();
									$scope.isEdit = true;
									$scope.applyData(response.data.result.vehiculo);
									$scope.initWizard();
									setTimeout(function () {
										$("#modifica-tab").click();
										swal.close();
									}, 300)
								} else {
									mostrarMensajeErrorAlert('No se encontr&oacute; el veh&iacute;culo');
								}

							} else {
								swal.close();
								mostrarMensajeErrorAlert(response.data.resultDescripcion);
							}
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				});
			}
			$scope.ubicacionEditar = 0;
			$scope.applyData = function (vehiculo) {

				$scope.vehiculo = angular.copy(vehiculo);
				$scope.vehiculo.idMarca = "";
				$scope.vehiculo.idModelo = "";
				$scope.loadMarcaLinea(vehiculo.idTipo, vehiculo.idMarca, vehiculo.idEstatus, vehiculo.idModelo);
				$scope.vehiculo.idColor = vehiculo.idColor.toString();
				$scope.vehiculo.idTipo = vehiculo.idTipo.toString();

				$scope.vehiculo.idEstatus = vehiculo.idEstatus.toString();

				if (!vehiculo.detalle || !vehiculo.detalle.rotulado) {
					$("#rotuladoNo").prop("checked", true);
				}

				if (vehiculo.detalle && vehiculo.detalle.idAseguradora) {
					$scope.vehiculo.detalle.idAseguradora = vehiculo.detalle.idAseguradora.toString();
				}
				if ($scope.vehiculo.anio) {
					$("#anio").val($scope.vehiculo.anio);
				}

				if ($scope.vehiculo.detalle && $scope.vehiculo.detalle.fechaVencimientoTarjeta) {
					$("#vencimientoTarjeta").val($scope.vehiculo.detalle.fechaVencimientoTarjeta);
				}

				if ($scope.vehiculo.detalle && $scope.vehiculo.detalle.fechaVencimientoPoliza) {
					$("#vencimientoPoliza").val($scope.vehiculo.detalle.fechaVencimientoPoliza);
				}

				if ($scope.vehiculo.detalle && $scope.vehiculo.detalle.fechaVerificacion) {
					$("#fechaVerificacion").val($scope.vehiculo.detalle.fechaVerificacion);
				}

				if (vehiculo.idGeografia) {
					$scope.ubicacionEditar = vehiculo.idGeografia;
					$scope.getParentGeografia(vehiculo.idGeografia, $scope.llaveEncierroVehiculo);

					if (vehiculo.detalle) {
						$scope.loadEncierros($scope.padre, vehiculo.detalle.idEncierro ? vehiculo.detalle.idEncierro : 0);
					}

					$("#jstreealta").jstree("destroy");
					let geografia = angular.copy($scope.geografiaList);
					let selected_arbol = "";
					geografia.push({ id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state: { opened: true } });
					geografia.map((e) => {
						e.parent = e.padre == null ? 0 : e.padre;
						e.text = e.nombre;
						e.icon = "fa fa-globe";
						if (e.id == vehiculo.idGeografia) {
							selected_arbol = e.text;
							e.state = {
								opened: true,
								selected: true,
							}
						} else {
							e.state = {
								opened: false,
								selected: false,
							}
						}
						return e
					})
					$scope.loadArbolRegistro(geografia);
					$scope.vehiculoText.geografiaText = selected_arbol;
					document.getElementById('arbol_vehiculo_consulta').placeholder = selected_arbol;
				}

			}

			$scope.getParentGeografia = function (idGeografia, nivel) {
				let list = $scope.geografiaList;
				list.sort(compareGeneric)[0].nivel;
				let padre = idGeografia;
				let hijo = "";
				$.each(list, function (i, elemento) {

					if (elemento.id == padre && elemento.nivel == nivel) {
						$scope.padre = elemento.id
					}

					if (elemento.id == padre) {
						padre = elemento.padre;
						hijo = elemento.id
					}
					/*
					if (elemento.padre == null && elemento.id == padre) {
						padre = elemento.id;
						$scope.padre = hijo;
					}

					if (elemento.id == padre) {
						padre = elemento.padre;
						hijo = elemento.id
					}
					*/
				})
			}

			resetAll = function () {
				if ($scope.isEdit) {
					swal({
						title: "\u00BFSeguro que desea salir del apartado?",
						text: "Se perder\u00E1n los datos actualizados",
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: '#007bff',
						confirmButtonText: 'Si',
						cancelButtonText: 'No'
					}).then(function (isConfirm) {
						if (isConfirm) {
							$scope.isEdit = false;
							$("#jstreealta").jstree("destroy");
							$scope.clearForm();
							$scope.$apply();
							$scope.initWizard();
						}
					}).catch(err => {
						setTimeout(function () {
							$("#modifica-tab").click();
							swal.close();
						}, 300)
					});
				} else {
					$scope.initWizard();
					$scope.$apply();
				}
			}

			$scope.initWizard = function () {
				$(".pills").removeClass("active");
				$(".pills-pane").removeClass("active show");
				$("#pills-general-tab").addClass("active");
				$("#pills-general").addClass("active show");
			}

			angular.element(document).ready(function () {
				$("#idBody").removeAttr("style");
				$("#moduloVehiculos").addClass('active')
				$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

			});

			$scope.busquedaVehiculosEstado = function (estado) {
				let list = [];
				let text = estado.toLowerCase();
				let listVehiculos = angular.copy($scope.vehiculos);
				if (estado == "todos") {
					$scope.buildTableVehiculos(listVehiculos);
				} else {
					$.each(listVehiculos, function (i, elemento) {
						if (elemento.estatus.toLowerCase() == text) {
							list.push(elemento);
						}
					});
					$scope.buildTableVehiculos(list);
				}
			}

			$scope.openModalReporte = function () {
				$('.datepickerReporte').datepicker('update', new Date());
				$("#reporteModal").modal('show');
			}

			$scope.generarReporteControlVehicular = function () {
				let params = {
					fechaInicio: $scope.getFechaFormato($("#filtro_fecha_inicio").val()),
					tipoExcel: 'vehiculos-consultarvehiculos-pi'
				}
				let tituloAccion = "Descarga reporte vehículos";
				let mensajeEnvio = 'Ha ocurrido un error al descargar el reporte';

				genericService.enviarParamsReporte(params).then(function success(response) {
					// console.log(response);
					if (response.data.respuesta) {
						var link = document.createElement("a");
						link.href = contex_project + '/req/exporteExcelGenericRequest/reportevehiculos.xls';
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
			}

		}
	]

);

app.directive('capitalize', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, modelCtrl) {
			var capitalize = function (inputValue) {
				if (inputValue == undefined) inputValue = '';
				var capitalized = inputValue.toUpperCase();
				if (capitalized !== inputValue) {
					var selection = element[0].selectionStart;
					modelCtrl.$setViewValue(capitalized);
					modelCtrl.$render();
					element[0].selectionStart = selection;
					element[0].selectionEnd = selection;
				}
				return capitalized;
			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]);
		}
	};
});

