var app = angular.module('controlVehicularApp', []);

app.controller('controlVehicularController',
	['$scope', '$q', 'controlVehicularService', 'genericService', '$filter',
		function ($scope, $q, controlVehicularService, genericService, $filter) {
			let dataTable = [];
			$scope.marcas = [];
			$scope.marcasTemp = [];
			$scope.lineas = [];
			$scope.motivos = [];
			$scope.data = {};
			$scope.vehiculo = {};
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


			$scope.init = function () {
				//$("#modalHistorico").modal('show');
				$scope.getData();

				setTimeout(function () {
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
				}, 1000);

				$('#vehiculoTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"recordsTotal": dataTable.length,
					"info": false,
					"autoWidth": true,
					"language": idioma_espanol_not_font,
					"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				});

				$('#historicoTable').DataTable({
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

				$("#modal_cluster_arbol_vehiculo").on("hidden.bs.modal", function () {
					let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
					if (selectedElms.length > 0) {
						let selected_arbol;

						selectedElms.forEach(element => {
							selected_arbol = element.text;
						});
						document.getElementById('arbol_vehiculo_consulta').placeholder = selected_arbol
					} else {
						document.getElementById('arbol_vehiculo_consulta').placeholder = '-- Seleccione --';
					}
				})

			}

			$scope.getData = function () {
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
				$q.all([
					controlVehicularService.consultarConfiguracionVehiculo({ "moduloAccionesUsuario": "moduloVehiculos" }),
					controlVehicularService.consultarMarcasControlVehicular(),
					controlVehicularService.consultarColoresControlVehicular(),
					controlVehicularService.consultarSegurosControlVehicular(),
					controlVehicularService.consultarEstatusControlVehicular(),
					controlVehicularService.consulCatalogoGeografiaUsuarioVehiculo()
				]).then(function (results) {

					if (results[0].data && results[0].data.respuesta) {
						$scope.nGeografia = results[0].data.result.N_FILTRO_GEOGRAFIA ? Number(results[0].data.result.N_FILTRO_GEOGRAFIA) : null;
					} else {
						toastr.warning(results[0].data.resultDescripcion);
					}

					if (results[1].data.respuesta && results[1].data.result.restulList.length > 0) {
						$scope.data.tipoVehiculos = results[1].data.result.restulList;
					} else {
						toastr.warning(results[1].data.resultDescripcion);
					}

					if (results[2].data.respuesta && results[2].data.result.restulList.length > 0) {
						$scope.data.colores = results[2].data.result.restulList;
					} else {
						toastr.warning(results[2].data.resultDescripcion);
					}

					if (results[3].data.respuesta && results[3].data.result.restulList.length > 0) {
						$scope.data.seguros = results[3].data.result.restulList;
					} else {
						toastr.warning(results[3].data.resultDescripcion);
					}

					if (results[4].data.respuesta && results[4].data.result.restulList.length > 0) {
						let estatus = [];
						results[4].data.result.restulList.map(function (e) {
							if (e.padre == null) {
								estatus.push(e);
							}
						})
						$scope.data.estatus = estatus;
					} else {
						toastr.warning(results[4].data.resultDescripcion);
					}

					if (results[5].data.respuesta) {
						if (results[5].data.result) {
							if (results[5].data.result.geografia || result[5].data.result.geografia.length > 0) {
								let listGeo = [];

								if ($scope.nGeografia) {
									listGeo = results[5].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });
								} else {
									listGeo = results[5].data.result.geografia;
								}

								$scope.geografiaList = listGeo;
								let geografia = listGeo;
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
							} else {
								mostrarMensajeWarningValidacion('No existen geografias actualmente')
							}
						} else {
							mostrarMensajeErrorAlert(results[5].data.result.mensaje)
						}
					} else {
						mostrarMensajeErrorAlert(results[5].data.resultDescripcion)
					}
					swal.close();
				}).catch(err => handleError(err));
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

			$scope.init();

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

			$scope.loadMarcaLinea = function (tipo, marca) {
				$scope.marcas = [];
				$scope.marcasTemp = [];
				$scope.lineas = [];
				$scope.data.tipoVehiculos.map(function (e) {
					if (tipo === e.idTipoVehiculo) {
						if (e.marcas.length) {
							e.marcas.map(function (m) {
								if (m.nivel == "1") {
									$scope.marcas.push(m);
								} else if (m.nivel == "2" && marca == m.padre) {
									$scope.lineas.push(m);
								}
							})
						}
					}
				});
			}

			getNameText = function () {
				$scope.data.tipoVehiculos.map(function (t) {
					if (t.idTipoVehiculo == Number($scope.vehiculo.idTipo)) {
						$scope.vehiculo.tipoText = t.tipoVehiculo;
					}
				})

				$scope.marcas.map(function (m) {
					if (m.idMarca == Number($scope.vehiculo.idMarca)) {
						$scope.vehiculo.marcaText = m.nombre;
					}
				})

				$scope.lineas.map(function (l) {
					if (l.idMarca == Number($scope.vehiculo.idModelo)) {
						$scope.vehiculo.lineaText = l.nombre;
					}
				})

				$scope.data.colores.map(function (c) {
					if (c.idColor == Number($scope.vehiculo.idColor)) {
						$scope.vehiculo.colorText = c.descripcion;
					}
				})
			}

			$scope.loadMotivo = function () {
				let status = Number($("#estatus").val());
				$scope.motivos = [];
				$scope.data.estatus.map(function (e) {
					if (e.nivel == "2" && status == e.padre) {
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
				return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
			}


			guardarVehiculo = function () {
				if ($scope.validateForm()) {
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
					controlVehicularService.crearVehiculo(paramsTemp).then(function success(response) {

						if (response.data !== undefined) {
							if (response.data.respuesta) {
								if (response.data.result) {
									swal.close();
									toastr.info(response.data.resultDescripcion);
									$scope.clearForm();
								} else {
									swal.close();
									mostrarMensajeErrorAlert(response.data.resultDescripcion);
								}
							} else {
								swal.close();
								$scope.clearForm();
								//mostrarMensajeErrorAlert(response.data.resultDescripcion);
								mostrarMensajeErrorAlert("Error modificar");
							}
						} else {
							swal.close();
							mostrarMensajeErrorAlert(response.data.resultDescripcion);
						}
					});


				}
			}

			$scope.clearForm = function () {
				$scope.vehiculo = {};
				$("#anio").val("");
				$("#fechaVerificacion").val("");
				$("#vencimientoTarjeta").val("");
				$("#vencimientoPoliza").val("");
				document.getElementById('arbol_vehiculo_consulta').placeholder = '-- Seleccione --';
				$("#jstreeconsulta").jstree("destroy");
				$scope.filePlaca = null;
				$scope.fileVehiculo = null;
				$scope.fileCirculacion = null;
				$scope.fileGasolina = null;
				$scope.getData();
			}

			validateFormulario = function () {
				if ($scope.validateForm()) {
					$("#stBtn").click();
				}

			}

			$scope.validateForm = function () {
				let text = "";
				let hasNumber = /\d/;
				let hasLetterAndNumber = /[A-Za-z0-9]/;
				let year = /^\d{4}$/i;
				let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
				let clustersparam = $("#jstreeconsulta").jstree("get_selected", true)
					.filter(e => e.original.nivel == ultimonivel)
					.map(e => parseInt(e.id))

				if ($("#linea").val() === "" || $("#linea").val() === undefined) {
					text += "<li>Tipo, Marca y Linea de Veh&iacute;culo</li>";
				}

				if ($("#anio").val() === "" || $("#anio").val() === undefined || !year.test($("#anio").val())) {
					text += "<li>A&ntilde;o del Veh&iacute;culo</li>";
				}

				if ($("#numMotor").val() && !hasLetterAndNumber.test($("#numMotor").val())) {
					text += "<li>N&uacute;m. del Motor</li>";
				}

				if ($("#numChasis").val() && !hasLetterAndNumber.test($("#numChasis").val())) {
					text += "<li>N&uacute;m. de Chasis</li>";
				}

				if ($("#color").val() === "" || $("#color").val() === undefined) {
					text += "<li>Color</li>";
				}

				if ($("#combustible").val() === "" || $("#combustible").val() === undefined) {
					text += "<li>Combustible</li>";
				}

				if ($("#placa").val() === "" || $("#placa").val() === undefined) {
					text += "<li>Placas</li>";
					allRequired = false;
				} else {
					if (!hasLetterAndNumber.test($("#placa").val())) {
						text += "<li>Placas (alfan&uacute;merico)</li>";
						allRequired = false;
					} else {
						if ($("#tipo").val() == "1" && $("#placa").val().length < 6) {
							text += "<li>Placas (min 6 car&aacute;cteres)</li>";
							allRequired = false;
						} else if ($("#tipo").val() == "2" && $("#placa").val().length !== 5) {
							text += "<li>Placas (5 car&aacute;cteres)</li>";
						}
					}
				}

				if ($("#numPoliza").val() && !hasLetterAndNumber.test($("#numPoliza").val())) {
					text += "<li>N&uacute;m. de Poliza</li>";
				}

				if ($("#numTarjetaC").val() && !hasLetterAndNumber.test($("#numTarjetaC").val())) {
					text += "<li>N&uacute;m. de Tarjeta de Circulaci&oacute;n</li>";
				}

				if ($("#numVerificacion").val() && !hasNumber.test($("#numVerificacion").val())) {
					text += "<li>N&uacute;m. de Verificaci&oacute;n</li>";
				}

				if (($("#numSerie").val() === "" || $("#numSerie").val() === undefined) && !hasNumber.test($("#numSerie").val())) {
					text += "<li>N&uacute;m. de Serie</li>";
					allRequired = false;
				}

				if ($("#clavePension").val() && !hasNumber.test($("#clavePension").val())) {
					text += "<li>Clave Pensi&oacute;n</li>";
				}

				if ($("#numTarjetaG").val() && !hasNumber.test($("#numTarjetaG").val())) {
					text += "<li>N&uacute;m. de Tarjeta Gasolina</li>";
				}

				if ($("#gps").val() && !hasNumber.test($("#gps").val())) {
					text += "<li>Clave GSP</li>";
				}

				if (clustersparam.length == 0 || document.getElementById('arbol_vehiculo_consulta').placeholder == '-- Seleccione --') {
					text += '<li>Seleccione una geografia</li>';
				}

				if ($scope.isEdit) {
					if ($("#motivo").val() === "" || $("#motivo").val() === undefined) {
						text += "<li>Estatus y Motivo</li>";
					}
				}

				if (text !== "") {
					let info = "Verifica los siguientes campos: " + text;
					mostrarMensajeWarningValidacion(info);
					return false;
				} else {
					return true;
				}

			}

			$scope.changeForm = function (type) {
				$scope.isEdit = type;
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


			$scope.abrirModalGeografia = function () {
				$("#modal_cluster_arbol_vehiculo").modal('show')
			}

			getPlaca = function () {
				controlVehicularService.consultaVehiculoPlaca({ "placa": $scope.vehiculo.placa }).then(function success(response) {
					if (response.data !== undefined) {
						if (response.data.respuesta) {
							if (response.data.result) {
								let vehiculo = response.data.result.vehiculo;
								$scope.loadMarcaLinea(vehiculo.idTipo, vehiculo.idMarca);
								$scope.vehiculo = vehiculo;
								$scope.vehiculo.idColor = vehiculo.idColor.toString();
								$scope.vehiculo.idTipo = vehiculo.idTipo.toString();
								$scope.vehiculo.idMarca = vehiculo.idMarca.toString();
								$scope.vehiculo.idModelo = vehiculo.idModelo.toString();

								if (vehiculo.detalle.idAseguradora) {
									$scope.vehiculo.detalle.idAseguradora = vehiculo.detalle.idAseguradora.toString();
								}

								if (vehiculo.idGeografia) {
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
									document.getElementById('arbol_vehiculo_consulta').placeholder = selected_arbol
								}

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

