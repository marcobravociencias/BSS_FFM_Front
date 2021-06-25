var app = angular.module('controlVehicularApp', []);

app.controller('controlVehicularController', ['$scope', '$q', 'controlVehicularService', 'genericService', '$filter', function ($scope, $q, controlVehicularService, genericService, $filter) {

	let vehiculoTable;
	let dataTable = [];
	$scope.marcas = [];
	$scope.marcasTemp = [];
	$scope.lineas = [];
	$scope.data = {};

	$scope.init = function () {
		$scope.getData();
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

	$scope.getData = function () {
		swal({ text: 'Espera un momento...', allowOutsideClick: false });
		swal.showLoading();
		$q.all([
			controlVehicularService.consultarMarcasControlVehicular(),
			controlVehicularService.consultarColoresControlVehicular(),
			controlVehicularService.consultarSegurosControlVehicular()
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
			swal.close();

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

	$scope.insertarVehiculo = function(){
		if($scope.validateForm()){
			
		}else{
			
		}

	}

	$scope.modificarVehiculo = function(){

	}

	$scope.validateForm = function () {
		let text = "";
		let hasNumber = /\d/;
		let hasLetter = /[A-Za-z]/;
		let date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
		let year = /^\d{4}$/i;

		let vehiculo;

		if ($("#linea").val() === "" || $("#linea").val() === undefined) {
			text += "<li>Tipo, Marca y Linea de Veh&iacute;culo</li>";
		}

		if ($("#anio").val() === "" || $("#anio").val() === undefined || !year.test($("#anio").val())) {
			text += "<li>A&ntilde;o del Veh&iacute;culo</li>";
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

		if ($("#placa").val() === "" || $("#placa").val() === undefined) {
			text += "<li>Placas</li>";
		} else {
			if (!hasNumber.test($("#placa").val()) || !hasLetter.test($("#placa").val())) {
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

		if ($("#numPoliza").val() === "" || $("#numPoliza").val() === undefined) {
			text += "<li>N&uacute;m. de Poliza</li>";
		}

		if ($("#vencimientotoPoliza").val() === "" || $("#vencimientoPoliza").val() === undefined || !date.test($("#vencimientoPoliza").val())) {
			text += "<li>Fecha Vencimeinto Poliza</li>";
		}

		if ($("#numTarjetaC").val() === "" || $("#numTarjetaC").val() === undefined) {
			text += "<li>N&uacute;m. de Tarjeta de Circulaci&oacute;n</li>";
		}

		if ($("#vencimientoTarjeta").val() === "" || $("#vencimientoTarjeta").val() === undefined || !date.test($("#vencimientoTarjeta").val())) {
			text += "<li>Vencimiento Tarjeta de Circulaci&oacute;n</li>";
		}

		if ($("#numVerificacion").val() === "" || $("#numVerificacion").val() === undefined) {
			text += "<li>N&uacute;m. de Verificaci&oacute;n</li>";
		}

		if ($("#fechaVerificacion").val() === "" || $("#fechaVerificacion").val() === undefined || !date.test($("#fechaVerificacion").val())) {
			text += "<li>Fecha de Verificaci&oacute;n</li>";
		}

		if ($("#clavePension").val() === "" || $("#clavePension").val() === undefined) {
			text += "<li>Clave Pensi&oacute;n</li>";
		}

		if ($("#numTarjetaG").val() === "" || $("#numTarjetaG").val() === undefined) {
			text += "<li>N&uacute;m. de Tarjeta Gasolina</li>";
		}

		if ($("#gps").val() === "" || $("#gps").val() === undefined) {
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

		if (text !== "") {
			let info = "Verifica los siguientes campos: " + text;
			mostrarMensajeWarningValidacion(info);
			return false;
		} else {
			return true;
		}
	}
}]);