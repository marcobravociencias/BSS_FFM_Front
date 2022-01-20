var app = angular.module('controlVehicularApp', []);

app.controller('controlVehicularController',
	['$scope', '$q', 'controlVehicularService', 'genericService', '$filter',
		function ($scope, $q, controlVehicularService, genericService, $filter) {
			$scope.vehiculo = {};
			let vehiculoTable;
			let historicoTable;
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
			$scope.banderaErrorGeografia = false;
			$scope.geografiaList = [];
			$scope.nGeografia = "";
			$scope.bucketImg = "";
			$scope.filePlaca;
			$scope.fileVehiculo;
			$scope.fileCirculacion;
			$scope.fileGasolina;
			$scope.padre;
			$scope.listSelected = [];
			$scope.permisosConfigUser = [];
			$scope.accionesUserConfigText = []

			$("#modal_cluster_arbol_vehiculo").on("hidden.bs.modal", function () {
				let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
				if (selectedElms.length > 0 && $('#jstreeconsulta').jstree().settings.plugins.length == 1) {
					document.getElementById('arbol_vehiculo_consulta').placeholder = selectedElms[0].text;
					$scope.vehiculoText.geografiaText = selectedElms[0].text;
					if ($('#jstreeconsulta').jstree().settings.plugins.length == 1) {
						if ($scope.ubicacionEditar.toString() !== selectedElms[0].id.toString()) {
							$scope.getParentGeografia(selectedElms[0].id, $scope.llaveEncierroVehiculo);
							$scope.loadEncierros($scope.padre, 0);
						}
					}
				} else {
					document.getElementById('arbol_vehiculo_consulta').placeholder = 'NO HAY SELECCI\u00D3N';
				}
			})

			$('.year').datepicker({
				format: 'yyyy',
				viewMode: "years",
				minViewMode: "years",
				autoclose: true,
				language: 'es',
				todayHighlight: true,
				clearBtn: true
			});

			$('.datepickerNormal').datepicker({
				format: 'dd/mm/yyyy',
				autoclose: true,
				language: 'es',
				todayHighlight: true,
				clearBtn: true
			});

			$(".datepicker").on("click", function () {
				$(".datepicker-dropdown").removeClass("datepicker-orient-top");
				$(".datepicker-dropdown").addClass("datepicker-orient-bottom");
			});

			$('#searchText').on('keyup', function () {
				vehiculoTable.search(this.value).draw();
			});

			$('#searchGeo').on('keyup', function () {
				$("#jstreeconsulta").jstree("search", this.value);
			})

			vehiculoTable = $('#vehiculoTable').DataTable({
				"paging": true,
				"lengthChange": false,
				"ordering": false,
				"pageLength": 10,
				"info": false,
				"autoWidth": true,
				"language": idioma_espanol_not_font,
				"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
			});

			historicoTable = $('#historicoTable').DataTable({
				"paging": true,
				"lengthChange": false,
				"ordering": false,
				"pageLength": 10,
				"recordsTotal": 100,
				"info": false,
				"autoWidth": true,
				"language": idioma_espanol_not_font,
				"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
			});

			openHistory = function () {
				$("#modalHistorico").modal('show');
			}

			$scope.loadArbol = function () {
				let geografia = $scope.geografiaList;
				if (geografia.length !== 0) {

					geografia.map((e) => {
						e.parent = e.padre == undefined ? "#" : e.padre;
						e.text = e.nombre;
						e.icon = "fa fa-globe";
						e.state = {
							opened: false,
							selected: false,
						}
						return e
					})
					$('#jstreeconsulta').bind('loaded.jstree', function (e, data) {
					}).jstree({
						'core': {
							'data': geografia,
							'themes': {
								'name': 'proton',
								'responsive': true,
								"icons": false
							}
						},
						plugins: ['search'],
						"search": {
							"case_sensitive": false,
							"show_only_matches": true
						}
					});
				}
			}

			$scope.getArbol = function () {

				$q.all([
					controlVehicularService.consultarConfiguracionVehiculo({ "moduloAccionesUsuario": "moduloVehiculos" }),
					controlVehicularService.consulCatalogoGeografiaUsuarioVehiculo()
				]).then(function (results) {

					let resultConf = results[0].data.result
					if (results[0].data && results[0].data.respuesta) {
						if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
							let llavesResult = results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;
							$scope.nGeografia = llavesResult.N_FILTRO_GEOGRAFIA ? Number(llavesResult.N_FILTRO_GEOGRAFIA) : 4;
							$scope.bucketImg = resultConf.BUCKETID_FB;
							$scope.llaveEncierroVehiculo = llavesResult.N_ENCIERROS;
							$scope.llaveArchivoPath = llavesResult.PATH_ARCHIVOS;
							$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO.permisos;
							if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
								$scope.permisosConfigUser.permisos.map(e => { e.banderaPermiso = true; return e; });
								$scope.accionesUserConfigText = $scope.permisosConfigUser.permisos.map(e => { return e.clave })

							}

							if ($scope.accionesUserConfigText.indexOf('accionConsultaVehiculos') !== -1) {
								$("#alta").addClass("active show");
								$("#alta-tab").addClass("active");
							}
							$("#container_vehiculos").css("display", "block")
						} else {
							toastr.warning(results[0].data.resultDescripcion);
						}
					} else {
						toastr.warning(results[0].data.resultDescripcion);
					}

					if (results[1].data.respuesta) {
						if (results[1].data.result) {
							if (results[1].data.result.geografia || results[1].data.result.geografia.length > 0) {
								let listGeo = [];

								if ($scope.nGeografia) {
									listGeo = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });
								} else {
									listGeo = results[1].data.result.geografia;
								}
								$scope.geografiaList = listGeo;

								$("#jstreeconsulta").jstree("destroy");
								$scope.loadArbolBuscar();
								setTimeout(function () {
									$scope.getVehiculos();
								}, 300)

							} else {
								mostrarMensajeWarningValidacion('No existen geografias actualmente')
							}
						} else {
							mostrarMensajeErrorAlert(results[1].data.result.mensaje)
						}
					} else {
						mostrarMensajeErrorAlert(results[1].data.resultDescripcion)
					}
				}).catch(err => handleError(err));
			}

			$scope.getData = function () {
				$q.all([
					controlVehicularService.consultarMarcasControlVehicular(),
					controlVehicularService.consultarColoresControlVehicular(),
					controlVehicularService.consultarSegurosControlVehicular(),
					controlVehicularService.consultarEstatusControlVehicular(),
				]).then(function (results) {

					if (results[0].data.respuesta && results[0].data.result.restulList.length > 0) {
						$scope.data.tipoVehiculos = results[0].data.result.restulList;
					} else {
						toastr.warning(results[0].data.resultDescripcion);
					}

					if (results[1].data.respuesta && results[1].data.result.restulList.length > 0) {
						$scope.data.colores = results[1].data.result.restulList;
					} else {
						toastr.warning(results[1].data.resultDescripcion);
					}

					if (results[2].data.respuesta && results[2].data.result.restulList.length > 0) {
						$scope.data.seguros = results[2].data.result.restulList;
					} else {
						toastr.warning(results[2].data.resultDescripcion);
					}

					if (results[3].data.respuesta && results[3].data.result.restulList.length > 0) {
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
						toastr.warning(results[3].data.resultDescripcion);
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
					if (response.data.respuesta) {
						if (response.data.result) {
							swal.close();
							if (response.data.result.encierros.length) {
								$scope.data.encierros = response.data.result.encierros;

								if ($scope.isEdit && encierro != 0) {
									$scope.data.encierros.map(function (e) {
										if (e.id == encierro) {
											$scope.vehiculo.detalle.idEncierro = encierro.toString();
										}

									})
								}

							}
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}
				})
			}

			$scope.getVehiculos = function () {
				$scope.countDisponibles = 0;
				$scope.countAsignados = 0;
				$scope.countNoDisponibles = 0;
				$scope.countBajas = 0;
				$scope.countTodos = 0;

				let selectedElements = $("#jstreeconsulta").jstree("get_selected", true)
					.map(e => e.id.toString());
				$scope.listSelected = selectedElements;

				let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
				let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
					.filter(e => e.original.nivel == ultimonivel)
					.map(e => parseInt(e.id))

				if (clustersparam.length == 0) {
					mostrarMensajeWarningValidacion('Selecciona geograf\u00EDa');
					return false;
				}

				let params = {
					idGeografias: clustersparam
				}
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
				$scope.vehiculos = [];
				controlVehicularService.consultarVehiculos(params).then(function success(response) {
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
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
							swal.close();
						}

					} else {
						$scope.buildTableVehiculos($scope.vehiculos);
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
						swal.close();
					}
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
				let arraRow = [];
				$.each(list, function (i, elemento) {
					let row = [];
					row[0] = elemento.placa;
					row[1] = elemento.tipo;
					row[2] = elemento.marca;
					row[3] = elemento.modelo;
					row[4] = elemento.anio;
					row[5] = elemento.color;
					row[6] = elemento.combustible;
					row[7] = elemento.numeroSerie;
					row[8] = elemento.geografia;
					row[9] = elemento.urlFotoPlaca && elemento.urlFotoPlaca.length > 15 ? '<img style="cursor:pointer; border-radius:.5em" src="' + elemento.urlFotoPlaca + '" alt="Placa" width="50" height="30" onclick="showImg(' + "'" + elemento.urlFotoPlaca + "'" + ')"/>' : "";
					row[10] = elemento.urlFotoVehiculo && elemento.urlFotoVehiculo.length > 15 ? '<img style="cursor:pointer; border-radius:.5em" src="' + elemento.urlFotoVehiculo + '" alt="Vehiculo" width="50"  height="30" onclick="showImg(' + "'" + elemento.urlFotoVehiculo + "'" + ')"/>' : "";
					row[11] = elemento.estatus;
					if ($scope.accionesUserConfigText.indexOf('accionEditaVehiculos') === -1) {
						row[12] = '<i class="fas fa-edit icon-table" title="Editar" onclick="editCar(' + "'" + elemento.idVehiculo + "'" + ')"></i>';
					} else {
						row[12] = '<i class="fas fa-edit icon-table" title="No tienes permisos para editar" style="cursor: not-allowed; background: #9d9ea2 !important;"></i>';

					}
					arraRow.push(row);
				})
				vehiculoTable = $('#vehiculoTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"ordering": false,
					"pageLength": 10,
					"info": false,
					"data": arraRow,
					"language": idioma_espanol_not_font,
					"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">'
				});
				swal.close();

				console.log("Dispo: " + $scope.countDisponibles);
				console.log("Asig: " + $scope.countAsignados);
				console.log("No dispo: " + $scope.countNoDisponibles);
				console.log("Bajas: " + $scope.countBajas);
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

			$scope.obtenerNivelUltimoJerarquia = function () {
				return $scope.geografiaList.sort(compareGeneric)[0].nivel
			}
			$scope.getArbol();
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
				$scope.printImg();
				$scope.$apply();
			}

			$scope.printImg = function () {
				$("#placaImagen").attr("src", $scope.vehiculo.urlFotoPlaca);
				$("#vehiculoImagen").attr("src", $scope.vehiculo.urlFotoVehiculo);
				if ($scope.vehiculo.detalle) {
					$("#circulacionImagen").attr("src", $scope.vehiculo.detalle.urlFotoTarjetaCirculacion);
					$("#gasolinaImagen").attr("src", $scope.vehiculo.detalle.urlFotoTarjetaGasolina);
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

			}

			$scope.printImgTab = function () {
				$("#placaImagenTab").attr("src", $scope.vehiculo.urlFotoPlaca);
				$("#vehiculoImagenTab").attr("src", $scope.vehiculo.urlFotoVehiculo);
				if ($scope.vehiculo.detalle) {
					$("#circulacionImagenTab").attr("src", $scope.vehiculo.detalle.urlFotoTarjetaCirculacion);
					$("#gasolinaImagenTab").attr("src", $scope.vehiculo.detalle.urlFotoTarjetaGasolina);
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

			}


			$scope.loadMotivo = function (st) {
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


			guardarVehiculo = function () {

				$(".form-control-sm").removeClass("input-valid-error");
				if ($scope.validateFormGen() && $scope.validateFormDocs()) {
					let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
					let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
						.filter(e => e.original.nivel == ultimonivel)
						.map(e => parseInt(e.id))
					let paramsTemp = angular.copy($scope.vehiculo);
					let pathImg = $scope.llaveArchivoPath + paramsTemp.placa + '/';

					if (!$scope.isEdit) {
						paramsTemp.fotoPlaca = {
							"bucketId": "",
							"archivo": "",
							"nombre": ""
						};

						paramsTemp.fotoVehiculo = {
							"bucketId": "",
							"archivo": "",
							"nombre": ""
						}
					}

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

					if ($("#fechaVerificacion").val()) {
						paramsTemp.detalle.fechaVerificacion = $scope.getFechaFormato($("#fechaVerificacion").val());
					}

					if ($("#vencimientoTarjeta").val()) {
						paramsTemp.detalle.fechaVencimientotarjeta = $scope.getFechaFormato($("#vencimientoTarjeta").val());
					}

					if ($("#vencimientoPoliza").val()) {
						paramsTemp.detalle.fechaVencimientoPoliza = $scope.getFechaFormato($("#vencimientoPoliza").val());
					}

					swal({ text: 'Espera un momento...', allowOutsideClick: false });
					swal.showLoading();
					if (paramsTemp.idVehiculo) {
						$scope.editarVehiculo(paramsTemp);
					} else {
						$scope.crearVehiculo(paramsTemp);
					}

				}
			}

			$scope.crearVehiculo = function (paramsTemp) {
				controlVehicularService.crearVehiculo(paramsTemp).then(function success(response) {

					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								swal.close();
								$("#searchText").val("");
								$("#jstreeconsulta").jstree("destroy");
								$scope.isEdit = false;
								toastr.success(response.data.resultDescripcion);
								$("#alta").removeClass("active show");
								$("#alta-tab").removeClass("active");
								$("#consulta-tab").addClass("active");
								$("#consulta").addClass("active show");
								$scope.listSelected = [];
								$scope.loadArbolBuscar();

								$scope.clearForm();

								$scope.initWizard();
								setTimeout(function () {
									$scope.getVehiculos();
								}, 300)
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

			$scope.editarVehiculo = function (paramsTemp) {
				controlVehicularService.editarVehiculo(paramsTemp).then(function success(response) {
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								swal.close();
								$("#searchText").val("");
								$("#jstreeconsulta").jstree("destroy");
								$scope.isEdit = false;
								toastr.success(response.data.resultDescripcion);
								$("#alta").removeClass("active show");
								$("#consulta-tab").addClass("active");
								$("#consulta").addClass("active show");
								$scope.listSelected = [];
								$scope.loadArbolBuscar();

								$scope.clearForm();

								$scope.initWizard();
								setTimeout(function () {
									$scope.getVehiculos();
								}, 300)

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

				document.getElementById('arbol_vehiculo_consulta').placeholder = 'NO HAY SELECCI\u00D3N';
				$scope.filePlaca = null;
				$scope.fileVehiculo = null;
				$scope.fileCirculacion = null;
				$scope.fileGasolina = null;
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
				let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
				let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
					.filter(e => e.original.nivel == ultimonivel)
					.map(e => parseInt(e.id))

				if ($("#tipo").val() === "" || $("#tipo").val() === undefined) {
					$("#tipo").addClass("input-valid-error");
					text += "<li>Tipo Veh&iacute;culo</li>";
				}

				if ($("#marca").val() === "" || $("#marca").val() === undefined) {
					$("#marca").addClass("input-valid-error");
					text += "<li>Marca Veh&iacute;culo</li>";
				}

				if ($("#linea").val() === "" || $("#linea").val() === undefined) {
					$("#linea").addClass("input-valid-error");
					text += "<li>Linea Veh&iacute;culo</li>";
				}

				if ($("#anio").val() === "" || $("#anio").val() === undefined || !year.test($("#anio").val())) {
					$("#anio").addClass("input-valid-error");
					text += "<li>A&ntilde;o del Veh&iacute;culo</li>";
				}

				if ($("#color").val() === "" || $("#color").val() === undefined) {
					$("#color").addClass("input-valid-error");
					text += "<li>Color</li>";
				}

				if ($("#combustible").val() === "" || $("#combustible").val() === undefined) {
					$("#combustible").addClass("input-valid-error");
					text += "<li>Combustible</li>";
				}

				if ($("#placa").val() === "" || $("#placa").val() === undefined) {
					$("#placa").addClass("input-valid-error");
					text += "<li>Placas</li>";
					allRequired = false;
				} else {
					if (!isPlaca.test($("#placa").val())) {
						$("#placa").addClass("input-valid-error");
						text += "<li>Placas (alfan&uacute;merico)</li>";
						allRequired = false;
					} else {
						if ($("#tipo").val() == "1" && $("#placa").val().length !== 6) {
							$("#placa").addClass("input-valid-error");
							text += "<li>Placas (6 car&aacute;cteres)</li>";
							allRequired = false;
						} else if ($("#tipo").val() == "2" && $("#placa").val().length !== 5) {
							$("#placa").addClass("input-valid-error");
							text += "<li>Placas (5 car&aacute;cteres)</li>";
						}
					}
				}

				if (($("#numSerie").val() === "" || $("#numSerie").val() === undefined) || !hasLetterAndNumber.test($("#numSerie").val())) {
					$("#numSerie").addClass("input-valid-error");
					text += "<li>N&uacute;m. de Serie (17 car&aacute;cteres)</li>";
					allRequired = false;
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
				$scope.isEdit = true;
				$scope.getCarById(id);
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
							"bucketId": $scope.bucketImg,
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
							$("#fileVehiculo").val("");
						}


						if (name == 'fotoTarjetaCirculaion') {
							img.nombre = 'tarjetaCirculacion.' + imgExt;
							$scope.fileCirculacion = img;
							$("#fileCirculacion").val("");
						}

						if (name == 'fotoTarjetaGasolina') {
							img.nombre = 'tarjetaGasolina.' + imgExt;
							$scope.fileGasolina = img;
							$("#fileGasolina").val("");
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
					$("#filePlaca").attr("src", "");
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
				$(labelFile).text('Cargar Imagen');
				$scope.$apply();
				$scope.printImgTab();
				$scope.$apply();
			}


			$scope.abrirModalGeografia = function () {
				$('#searchGeo').val('');
				$("#modal_cluster_arbol_vehiculo").modal('show');
				setTimeout(function () {
					$("#searchGeo").focus();
				}, 750);
			}

			abrirModalGeografiaBuscar = function () {
				$('#searchGeo').val('');
				$("#modal_cluster_arbol_vehiculo").modal('show');
				setTimeout(function () {
					$("#searchGeo").focus();
				}, 750);
			}

			$scope.loadArbolBuscar = function () {
				let geografia = $scope.geografiaList;
				geografia.map((e) => {
					let list = angular.copy($scope.listSelected);
					let isSelected = true;
					if ($scope.listSelected.length) {
						let selected = list.find(f => { return f === e.id.toString() });
						isSelected = selected ? true : false;
					}
					e.parent = e.padre == undefined ? "#" : e.padre;
					e.text = e.nombre;
					e.icon = "fa fa-globe";
					e.state = {
						opened: false,
						selected: isSelected,
					}
					return e
				})
				$('#jstreeconsulta').bind('loaded.jstree', function (e, data) {
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

			buscarPlaca = function () {
				if ($("#placa").val().length > 4 && $("#placa").val().length < 8 && $scope.isEdit == false) {
					$scope.getPlaca();
				}
			}

			$scope.getPlaca = function () {
				controlVehicularService.consultaVehiculoPlaca({ "placa": $scope.vehiculo.placa }).then(function success(response) {
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
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
										$("#modifica-tab").addClass("active show");
										$scope.$apply();
										$scope.clearForm();
										$scope.isEdit = true;
										$scope.applyData(response.data.result.vehiculo);
										$("#alta").addClass("active show");
										$("#modifica-tab").addClass("active");

										$scope.initWizard();
									}
								}).catch(err => {

								});
							} else {
								swal.close();
								mostrarMensajeErrorAlert(response.data.resultDescripcion);
							}
						} else {
							swal.close();
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
								$("#consulta-tab").removeClass("active");
								$("#consulta").removeClass("active show");
								$scope.clearForm();
								$scope.isEdit = true;
								$scope.applyData(response.data.result.vehiculo);
								$("#alta").addClass("active show");
								$("#modifica-tab").addClass("active");
								$scope.initWizard();

								swal.close();
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
					$scope.loadEncierros($scope.padre, vehiculo.detalle.idEncierro);

					$("#jstreeconsulta").jstree("destroy")
					let geografia = $scope.geografiaList;
					let selected_arbol = "";
					geografia.map((e) => {
						e.parent = e.padre == undefined ? "#" : e.padre;
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
					$('#jstreeconsulta').bind('loaded.jstree', function (e, data) {
					}).jstree({
						'core': {
							'data': geografia,
							'themes': {
								'name': 'proton',
								'responsive': true,
								"icons": false
							}
						},
						plugins: ['search'],
						"search": {
							"case_sensitive": false,
							"show_only_matches": true
						}
					})
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
							$("#jstreeconsulta").jstree("destroy");
							$scope.clearForm();
							$scope.$apply();
							$scope.loadArbol();
							$scope.initWizard();
						}
					}).catch(err => {
						$("#alta-tab").removeClass("active");
						$("#modifica-tab").addClass("active show");
						$scope.$apply();
						$("#alta").addClass("active show");
						$("#modifica-tab").addClass("active");
					});
				} else {
					$("#jstreeconsulta").jstree("destroy");
					$("#consulta-tab").removeClass("active");
					$scope.$apply();
					$scope.loadArbol();
					$scope.initWizard();
				}
			}

			resetAllSearch = function () {
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
							$("#jstreeconsulta").jstree("destroy");
							$scope.clearForm();
							$scope.loadArbolBuscar();
							$scope.buildTableVehiculos($scope.vehiculos);
							$scope.initWizard();
							$scope.$apply();
						}
					}).catch(err => {
						$("#consulta-tab").removeClass("active");
						$("#modifica-tab").addClass("active show");
						$("#consulta").removeClass("active show");
						$("#alta").addClass("active show");
						$scope.$apply();
					});
				} else {
					$scope.initWizard();
					$("#searchText").val("");
					$("#jstreeconsulta").jstree("destroy");
					$("#alta-tab").removeClass("active");
					$scope.loadArbolBuscar();
					$scope.buildTableVehiculos($scope.vehiculos);
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
				$("#searchText").val("");
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

