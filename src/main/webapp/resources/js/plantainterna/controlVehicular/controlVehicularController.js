var app = angular.module('controlVehicularApp', []);

app.controller('controlVehicularController',
	['$scope', '$q', 'controlVehicularService', 'genericService', '$filter',
		function ($scope, $q, controlVehicularService, genericService, $filter) {
			let vehiculoTable;
			let historicoTable;
			$scope.marcas = [];
			$scope.marcasTemp = [];
			$scope.lineas = [];
			$scope.motivos = [];
			$scope.data = {};
			$scope.vehiculo = {};
			$scope.vehiculos = [];
			$scope.vehiculoText = {};
			$scope.isEdit = false;
			$scope.countDisponibles = 0;
			$scope.countAsignados = 0;
			$scope.countNoDisponibles = 0;
			$scope.banderaErrorGeografia = false;
			$scope.geografiaList = [];
			$scope.nGeografia = "";
			$scope.filePlaca;
			$scope.fileVehiculo;
			$scope.fileCirculacion;
			$scope.fileGasolina;

			$("#modal_cluster_arbol_vehiculo").on("hidden.bs.modal", function () {
				let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
				if (selectedElms.length > 0) {
					document.getElementById('arbol_vehiculo_consulta').placeholder = selectedElms[0].text;
					$scope.vehiculoText.geografiaText = selectedElms[0].text;
					$scope.loadEncierros(selectedElms[0].id);
				} else {
					document.getElementById('arbol_vehiculo_consulta').placeholder = '-- Seleccione --';
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

			vehiculoTable = $('#vehiculoTable').DataTable({
				"paging": true,
				"lengthChange": false,
				"searching": true,
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

					if (results[0].data && results[0].data.respuesta) {
						$scope.nGeografia = results[0].data.result.N_FILTRO_GEOGRAFIA ? Number(results[0].data.result.N_FILTRO_GEOGRAFIA) : null;
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
								$scope.loadArbol();

							} else {
								mostrarMensajeWarningValidacion('No existen geografias actualmente')
							}
						} else {
							mostrarMensajeErrorAlert(results[1].data.result.mensaje)
						}
					} else {
						mostrarMensajeErrorAlert(results[1].data.resultDescripcion)
					}
					swal.close();
				}).catch(err => handleError(err));
			}

			$scope.getData = function () {
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
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
					swal.close();
				}).catch(err => handleError(err));
			}

			$scope.loadEncierros = function (geografia) {
				$scope.data.encierros = [];
				controlVehicularService.consultarEncierros({ "idGeografia": geografia }).then(function success(response) {
					if (response.data.respuesta) {
						if (response.data.result) {
							swal.close();
							if (response.data.result.encierros.length) {
								$scope.data.encierros = response.data.result.encierros
							}
						} else {
							swal.close();
							//$scope.clearForm();
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
						}
					} else {
						swal.close();
						mostrarMensajeErrorAlert(response.data.resultDescripcion);
					}

				})
			}

			$scope.getVehiculos = function () {
				controlVehicularService.consultarVehiculos().then(function success(response) {
					if (response.data.respuesta) {
						if (response.data.result) {
							if (response.data.result.vehiculo.length) {
								$scope.vehiculos = angular.copy(response.data.result.vehiculo);
								if (vehiculoTable) {
									vehiculoTable.destroy();
								}
								let arraRow = [];
								$.each(response.data.result.vehiculo, function (i, elemento) {
									if (elemento.idEstatus == 1) {
										$scope.countDisponibles = $scope.countDisponibles + 1;
									}

									if (elemento.idEstatus == 2) {
										$scope.countAsignados = $scope.countAsignados + 1;
									}

									if (elemento.idEstatus == 2) {
										$scope.countNoDisponibles = $scope.countNoDisponibles + 1;
									}

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
									row[9] = elemento.urlFotoPlaca ? '<img src="' + elemento.urlFotoPlaca + '" alt="Placa" width="50"/>' : "";
									row[10] = elemento.urlFotoVehiculo ? '<img src="' + elemento.urlFotoVehiculo + '" alt="Vehiculo" width="50"/>' : "";
									row[11] = elemento.estatus;
									row[12] = '<i class="fas fa-edit" onclick="editCar(' + "'" + elemento.idVehiculo + "'" + ')"></i>';
									arraRow.push(row);
								})
								vehiculoTable = $('#vehiculoTable').DataTable({
									"paging": true,
									"lengthChange": false,
									"searching": false,
									"ordering": false,
									"pageLength": 10,
									"info": false,
									"data": arraRow,
									"language": idioma_espanol_not_font,
									"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">'
								});
							}
						}
					}

				})
			}

			filterByText = function () {
				console.log($("#searchText").val());
				$scope.getVehiculos();
				/*
				if ($("#searchText").val() !== "") {
					let list = [];
					let listVehiculos = angular.copy($scope.vehiculos);
					$.each(listVehiculos, function (i, elemento) {
						if (elemento.idEstatus == status) {
							list.push(elemento);
						}
					})
					$scope.buidTableVehiculos(list);
				}
				*/

			}

			filterByStatus = function (status) {
				let list = [];
				let listVehiculos = angular.copy($scope.vehiculos);
				$.each(listVehiculos, function (i, elemento) {
					if (elemento.idEstatus == status) {
						list.push(elemento);
					}
				})
				$scope.buidTableVehiculos(list);
			}

			$scope.buidTableVehiculos = function (list) {

				if (vehiculoTable) {
					vehiculoTable.destroy();
				}
				let arraRow = [];
				$.each(list, function (i, elemento) {
					if (elemento.idEstatus == 1) {
						$scope.countDisponibles = $scope.countDisponibles + 1;
					}

					if (elemento.idEstatus == 2) {
						$scope.countAsignados = $scope.countAsignados + 1;
					}

					if (elemento.idEstatus == 2) {
						$scope.countNoDisponibles = $scope.countNoDisponibles + 1;
					}

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
					row[9] = elemento.urlFotoPlaca ? '<img src="' + elemento.urlFotoPlaca + '" alt="Placa" width="50"/>' : "";
					row[10] = elemento.urlFotoVehiculo ? '<img src="' + elemento.urlFotoVehiculo + '" alt="Vehiculo" width="50"/>' : "";
					row[11] = elemento.estatus;
					row[12] = '<i class="fas fa-edit" onclick="editCar(' + "'" + elemento.idVehiculo + "'" + ')"></i>';
					arraRow.push(row);
				})
				vehiculoTable = $('#vehiculoTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"info": false,
					"data": arraRow,
					"language": idioma_espanol_not_font,
					"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">'
				});
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
				return $scope.geografiaList.sort(compareGeneric)[0].nivel
			}

			$scope.getData();
			$scope.getVehiculos();
			$scope.getArbol();

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

			$scope.loadMarcaLinea = function (tipo, marca, status) {
				$scope.marcas = [];
				$scope.marcasTemp = [];
				$scope.lineas = [];
				$scope.data.tipoVehiculos.map(function (e) {
					if (tipo === e.idTipoVehiculo) {
						if (e.marcas.length) {
							e.marcas.map(function (m) {
								if (m.nivel == "1") {
									$scope.marcas.push(m);
								} else if (m.nivel == "2") {
									$scope.marcasTemp.push(m);
									if (marca == m.padre) {
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
						$scope.vehiculoText.colorText = c.descripcion;
					}
				})

				$scope.data.seguros.map(function (s) {
					if ($scope.vehiculo.detalle && s.idSeguro == Number($scope.vehiculo.detalle.idAseguradora)) {
						$scope.vehiculoText.aseguradoraText = s.descripcion;
					}
				})

				$scope.vehiculoText.rotulado = false;
				if ($("#rotuladoSi").is(":checked")) {
					$scope.vehiculoText.rotulado = true;
				}

				if ($("#fechaVerificacion").val()) {
					$scope.vehiculoText.fechaVerificacion = $("#fechaVerificacion").val();
				}

				if ($("#vencimientoTarjeta").val()) {
					$scope.vehiculoText.fechaVencimientotarjeta = $("#vencimientoTarjeta").val();
				}

				if ($("#vencimientoPoliza").val()) {
					$scope.vehiculoText.fechaVencimientoPoliza = $("#vencimientoPoliza").val();
				}

				$scope.vehiculoText.anio = $("#anio").val();
				$scope.$apply();
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

					if ($scope.filePlaca) {
						paramsTemp.fotoPlaca = $scope.filePlaca;
					}
					if ($scope.fileVehiculo) {
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
						paramsTemp.detalle.fotoTarjetaCirculaion = $scope.fileCirculacion;
					}

					if ($scope.fileGasolina) {
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
								toastr.success(response.data.resultDescripcion);
								$scope.clearForm();
								$scope.initWizard();
							} else {
								swal.close();
								mostrarMensajeErrorAlert(response.data.resultDescripcion);
							}
						} else {
							swal.close();
							//$scope.clearForm();
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
								toastr.success(response.data.resultDescripcion);
								$scope.clearForm();
								$scope.isEdit = false;
								$scope.initWizard();

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
				$("#anio").val("");
				$("#fechaVerificacion").val("");
				$("#vencimientoTarjeta").val("");
				$("#vencimientoPoliza").val("");
				$("#jstreeconsulta").jstree("destroy");
				document.getElementById('arbol_vehiculo_consulta').placeholder = '-- Seleccione --';
				$scope.filePlaca = null;
				$scope.fileVehiculo = null;
				$scope.fileCirculacion = null;
				$scope.fileGasolina = null;
				$("#rotuladoSi").attr("checked", true);
				$(".form-control-sm").removeClass("input-valid-error");
				$scope.getArbol();
			}

			$scope.validateFormDocs = function () {
				let text = "";
				let hasNumber = /\d/;
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

				if (clustersparam.length == 0 || document.getElementById('arbol_vehiculo_consulta').placeholder == '-- Seleccione --') {
					$("#arbol_vehiculo_consulta").addClass("input-valid-error");
					text += '<li>Seleccione una geografia</li>';
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
				$("#consulta-tab").removeClass("active");
				$("#consulta").removeClass("active show");
				$scope.$apply();
				$scope.clearForm();
				$scope.isEdit = true;
				$("#alta").addClass("active show");
				$("#modifica-tab").addClass("active");
				$scope.initWizard();
				$scope.getCarById(id);
			}

			$scope.subirArchivo = function (e, name) {
				let labelFile = "#" + name;
				if (e.target.files[0]) {
					$(labelFile).text(e.target.files[0].name);
					let reader = new FileReader();
					reader.readAsDataURL(e.target.files[0]);
					reader.onload = function () {
						//console.log(reader.result);
						let img = {
							"bucketId": "totalplay-ffm-core-dev.appspot.com",
							"archivo": reader.result,
							"nombre": e.target.files[0].name
						}

						if (name == 'fotoPlaca') {
							$scope.filePlaca = img;
						}


						if (name == 'fotoVehiculo') {
							$scope.fileVehiculo = img;
						}


						if (name == 'fotoTarjetaCirculaion') {
							$scope.fileCirculacion = img;
						}


						if (name == 'fotoTarjetaGasolina') {
							$scope.fileGasolina = img;
						}

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
				}
			}

			deleteFile = function (name) {
				let labelFile = "#" + name;
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
			}


			$scope.abrirModalGeografia = function () {
				$("#modal_cluster_arbol_vehiculo").modal('show')
			}

			abrirModalGeografiaBuscar = function () {
				$("#jstreeconsulta").jstree("destroy");
				let geografia = $scope.geografiaList;
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
				$('#jstreeconsulta').bind('loaded.jstree', function (e, data) {
				}).jstree({
					'plugins': ["wholerow", "checkbox"],
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons": false
						}
					}
				});
				$("#modal_cluster_arbol_vehiculo").modal('show')
			}

			buscarPlaca = function () {
				if ($("#placa").val().length > 4 && $("#placa").val().length < 8) {
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
									confirmButtonColor: '#288e07',
									confirmButtonText: 'Si',
									cancelButtonText: 'No'
								}).then(function (isConfirm) {
									if (isConfirm) {
										$scope.applyData(response.data.result.vehiculo);
										$("#alta-tab").removeClass("active");
										$("#modifica-tab").addClass("active");

									}
								}).catch(err => {
									$("#placa").val("");
									$scope.$apply();
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
								$scope.applyData(response.data.result.vehiculo);
								swal.close();
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

			$scope.applyData = function (vehiculo) {
				$scope.loadMarcaLinea(vehiculo.idTipo, vehiculo.idMarca, vehiculo.idEstatus);
				$scope.vehiculo = vehiculo;

				$scope.vehiculo.idColor = vehiculo.idColor.toString();
				$scope.vehiculo.idTipo = vehiculo.idTipo.toString();
				$scope.vehiculo.idMarca = vehiculo.idMarca.toString();
				$scope.vehiculo.idModelo = vehiculo.idModelo.toString();
				$scope.vehiculo.idEstatus = vehiculo.idEstatus.toString();


				if (!vehiculo.detalle.rotulado) {
					$("#rotuladoNo").attr("checked", true);
				}

				if (vehiculo.detalle.idAseguradora) {
					$scope.vehiculo.detalle.idAseguradora = vehiculo.detalle.idAseguradora.toString();
				}

				if (vehiculo.idGeografia) {
					$scope.loadEncierros(vehiculo.idGeografia);
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
					$scope.vehiculoText.geografiaText = selected_arbol;
					document.getElementById('arbol_vehiculo_consulta').placeholder = selected_arbol;
					$scope.isEdit = true;
				}
			}

			resetAll = function () {
				$scope.clearForm();
				$scope.getVehiculos();
				$scope.isEdit = false;
				$scope.initWizard();
			}

			$scope.initWizard = function () {
				$(".pills").removeClass("active");
				$(".pills-pane").removeClass("active show");
				$("#pills-general-tab").addClass("active");
				$("#pills-general").addClass("active show");
				$scope.$apply();
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

