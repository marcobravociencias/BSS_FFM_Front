var app = angular.module('controlVehicularApp', []);

app.controller('controlVehicularController', ['$scope', 'controlVehicularService', 'genericService', '$filter', function ($scope, controlVehicularService, genericService, $filter) {
	$('#li-otros-vehicular').addClass('active');


	let vehiculoTable;
	let dataTable = [];
	$scope.marcas = [];
	$scope.marcasTemp = [];
	$scope.lineas = [];
	$scope.data = {};

	$scope.init = function () {

		$scope.getMarcaControlVehicular();
		$scope.getColoresControlVehicular();
		$scope.getSegurosControlVehicular();
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
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"recordsTotal": 100,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"data": dataTable,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
		});
	}

	$scope.getMarcaControlVehicular = function () {
		controlVehicularService.consultarMarcasControlVehicular().then(function success(response) {
			if (response.data.respuesta) {
				if (response.data.result.restulList.length > 0) {
					$scope.data.tipoVehiculos = response.data.result.restulList;

				} else {
					//MENSAJE WARNING
				}
			}
			else {
				//MENSAJE WARNING
			}
		});
	}

	$scope.getColoresControlVehicular = function () {
		controlVehicularService.consultarColoresControlVehicular().then(function success(response) {
			if (response.data.respuesta) {
				if (response.data.result.restulList.length > 0) {
					$scope.data.colores = response.data.result.restulList;
				} else {
					//MENSAJE WARNING
				}
			}
			else {
				//MENSAJE WARNING
			}
		});
	}

	$scope.getSegurosControlVehicular = function () {
		controlVehicularService.consultarSegurosControlVehicular().then(function success(response) {
			if (response.data.respuesta) {
				if (response.data.result.restulList.length > 0) {
					$scope.data.seguros = response.data.result.restulList;
				} else {
					//MENSAJE WARNING
				}
			}
			else {
				//MENSAJE WARNING
			}
		});
	}

	$scope.init();

	$scope.loadMarca = function () {
		let tipo = Number(this.tipo);
		$scope.marcas = [];
		$scope.marcasTemp = [];
		$scope.data.tipoVehiculos.map(function (e) {
			if (tipo === e.idTipoVehiculo) {
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
		let marca = Number(this.marca);
		$scope.lineas = [];
		$scope.marcasTemp.map(function (e) {
			if (marca == e.padre) {
				$scope.lineas.push(e);
			}
		});
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

	$scope.validateFormInsert = function () {
		let text = "";
		var hasNumber = /\d/;
		var hasLetter = /[A-Za-z]/;

		if ($("#linea").val() === "" || $("#linea").val() === undefined) {
			text += "<li>Tipo, Marca y Linea de vehiculo</li>";
		}

		if ($("#anio").val() === "" || $("#anio").val() === undefined) {
			text += "<li>A&ntilde;o del vehiculo</li>";
		}

		if ($("#numMotor").val() === "" || $("#numMotor").val() === undefined) {
			text += "<li>N&uacute;m. del Motor</li>";
		}

		if ($("#numChasis").val() === "" || $("#numChasis").val() === undefined) {
			text += "<li>N&uacute;m. de Chasis</li>";
		}

		if ($("#color").val() === "" || $("#color").val() === undefined) {
			text += "<li>Color</li>";
		}

		if ($("#placa").val() === "" || $("#placa").val() === undefined || hasNumber.test($("#placa").val())) {
			text += "<li>Placas</li>";
		}

		if (text !== "") {
			let info = "Verifica los datos en Datos Generales: " + text;
			mostrarMensajeWarningValidacion(info);
		}

	}
}]);