var app = angular.module('controlVehicularApp', []);

app.controller('controlVehicularController',
	['$scope', '$q', 'controlVehicularService', 'genericService', '$filter',
		function ($scope, $q, controlVehicularService, genericService, $filter) {
			$("#moduloVehiculos").addClass('active')

			let dataTable = [];
			$scope.marcas = [];
			$scope.marcasTemp = [];
			$scope.lineas = [];
			$scope.motivos = [];
			$scope.data = {};
			$scope.isEdit = false;
			$scope.countDisponibles = 0;
			$scope.countAsignados = 0;
			$scope.countNoDisponibles = 0;
			$scope.files = {};

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
					"recordsTotal":  dataTable.length,
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
					"recordsTotal":100,
					"info": false,
					"autoWidth": true,
					"language": idioma_espanol_not_font,
					"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				});
			}



			$scope.getData = function () {
				swal({ text: 'Espera un momento...', allowOutsideClick: false });
				swal.showLoading();
				$q.all([
					controlVehicularService.consultarMarcasControlVehicular(),
					controlVehicularService.consultarColoresControlVehicular(),
					controlVehicularService.consultarSegurosControlVehicular(),
					controlVehicularService.consultarEstatusControlVehicular()
				]).then(function (results) {
					if (results[0].data.respuesta && results[0].data.result.restulList.length > 0) {
						$scope.data.tipoVehiculos = results[0].data.result.restulList;
					} else {
						toastr.warning(results[0].data.resultDescripcion);
						swal.close();
						return
					}

					if (results[1].data.respuesta && results[1].data.result.restulList.length > 0) {
						$scope.data.colores = results[1].data.result.restulList;
					} else {
						toastr.warning(results[1].data.resultDescripcion);
						swal.close();
						return
					}

					if (results[2].data.respuesta && results[2].data.result.restulList.length > 0) {
						$scope.data.seguros = results[2].data.result.restulList;
					} else {
						toastr.warning(results[2].data.resultDescripcion);
						swal.close();
						return
					}

					if (results[3].data.respuesta && results[3].data.result.restulList.length > 0) {
						let estatus = [];
						results[3].data.result.restulList.map(function (e) {
							if (e.padre == null) {
								estatus.push(e);
							}
						})
						$scope.data.estatus = estatus;
					} else {
						toastr.warning(results[3].data.resultDescripcion);
						swal.close();
						return
					}

					swal.close();

				}).catch(err => handleError(err));
			}

			$scope.init();

			$scope.loadMarca = function () {
				let tipoV = Number(this.tipo);
				$scope.marcas = [];
				$scope.marcasTemp = [];
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
				let marcaV = Number(this.marca);
				$scope.lineas = [];
				$scope.marcasTemp.map(function (e) {
					if (marcaV == e.padre) {
						$scope.lineas.push(e);
					}
				});
			}

			$scope.loadMotivo = function () {
				let status = Number(this.estatus);
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

			$scope.guardarVehiculo = function () {
				if ($scope.validateForm()) {
					//Guardar
				}
			}

			$scope.validateForm = function () {
				let text = "";
				let hasNumber = /\d/;
				let hasLetterAndNumber = /[A-Za-z0-9]/;
				let date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
				let year = /^\d{4}$/i;

				let vehiculo;

				if ($("#linea").val() === "" || $("#linea").val() === undefined) {
					text += "<li>Tipo, Marca y Linea de Veh&iacute;culo</li>";
				}

				if ($("#anio").val() === "" || $("#anio").val() === undefined || !year.test($("#anio").val())) {
					text += "<li>A&ntilde;o del Veh&iacute;culo</li>";
				}

				if ($("#numMotor").val() === "" || $("#numMotor").val() === undefined && !hasLetterAndNumber.test($("#numMotor").val())) {
					text += "<li>N&uacute;m. del Motor</li>";
				}

				if ($("#numChasis").val() === "" || $("#numChasis").val() === undefined && !hasLetterAndNumber.test($("#numChasis").val())) {
					text += "<li>N&uacute;m. de Chasis</li>";
				}

				if ($("#color").val() === "" || $("#color").val() === undefined) {
					text += "<li>Color</li>";
				}

				if ($("#placa").val() === "" || $("#placa").val() === undefined) {
					text += "<li>Placas</li>";
				} else {
					if (!hasLetterAndNumber.test($("#placa").val())) {
						text += "<li>Placas (alfan&uacute;merico)</li>";
					} else {
						if ($("#tipo").val() == "1" && $("#placa").val().length < 6) {
							text += "<li>Placas (min 6 car&aacute;cteres)</li>";
						} else if ($("#tipo").val() == "2" && $("#placa").val().length !== 5) {
							text += "<li>Placas (5 car&aacute;cteres)</li>";
						}
					}
				}

				if ($("#aseguradora").val() === "" || $("#aseguradora").val() === undefined) {
					text += "<li>Aseguradora</li>";
				}

				if ($("#numPoliza").val() === "" || $("#numPoliza").val() === undefined && !hasLetterAndNumber.test($("#numPoliza").val())) {
					text += "<li>N&uacute;m. de Poliza</li>";
				}

				if ($("#vencimientotoPoliza").val() === "" || $("#vencimientoPoliza").val() === undefined || !date.test($("#vencimientoPoliza").val())) {
					text += "<li>Fecha Vencimeinto Poliza</li>";
				}

				if ($("#numTarjetaC").val() === "" || $("#numTarjetaC").val() === undefined && !hasLetterAndNumber.test($("#numTarjetaC").val())) {
					text += "<li>N&uacute;m. de Tarjeta de Circulaci&oacute;n</li>";
				}

				if ($("#vencimientoTarjeta").val() === "" || $("#vencimientoTarjeta").val() === undefined || !date.test($("#vencimientoTarjeta").val())) {
					text += "<li>Vencimiento Tarjeta de Circulaci&oacute;n</li>";
				}

				if ($("#numVerificacion").val() === "" || $("#numVerificacion").val() === undefined && !hasNumber.test($("#numVerificacion").val())) {
					text += "<li>N&uacute;m. de Verificaci&oacute;n</li>";
				}

				if ($("#fechaVerificacion").val() === "" || $("#fechaVerificacion").val() === undefined || !date.test($("#fechaVerificacion").val())) {
					text += "<li>Fecha de Verificaci&oacute;n</li>";
				}

				if ($("#clavePension").val() === "" || $("#clavePension").val() === undefined && !hasNumber.test($("#clavePension").val())) {
					text += "<li>Clave Pensi&oacute;n</li>";
				}

				if ($("#numTarjetaG").val() === "" || $("#numTarjetaG").val() === undefined && !hasNumber.test($("#numTarjetaG").val())) {
					text += "<li>N&uacute;m. de Tarjeta Gasolina</li>";
				}

				if ($("#gps").val() === "" || $("#gps").val() === undefined && !hasNumber.test($("#gps").val())) {
					text += "<li>Clave GSP</li>";
				}

				if ($("#fileLicencia").val() === "" || $("#fileLicencia").val() === undefined) {
					text += "<li>Licencia</li>";
				}

				if ($("#fileTarjeta").val() === "" || $("#fileTarjeta").val() === undefined) {
					text += "<li>Tarjeta Circulaci&oacute;n</li>";
				}

				if ($("#fileFoto").val() === "" || $("#fileFoto").val() === undefined) {
					text += "<li>Foto Veh&iacute;culo</li>";
				}

				if ($("#ubicacion").val() === "" || $("#ubicacion").val() === undefined) {
					text += "<li>Ciudad, Distrito y Ubicaci&oacute;n</li>";
				}

				if ($("#comentarios").val() === "" || $("#comentarios").val() === undefined) {
					text += "<li>Comentarios</li>";
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
						//Llenar objeto files
						console.log(reader.result);
					};
					reader.onerror = function (error) {
						console.log('Error: ', error);
					};
				} else {
					$(labelFile).text('Cargar Imagen');
				}
			}



		}]);

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

