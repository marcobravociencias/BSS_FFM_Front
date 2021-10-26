var app = angular.module('coordInstalacionesPIApp', []);
var tableTerminada = undefined;
var geografia;
var geografiaPendiente;
var geografiaAsignada;
var geografiaDetenida;
var geografiaTerminada;
var geografiaCancelada;
var geografiaCalendarizada;
var geografiaGestoria;
app.controller('coordInstPIController', ['$scope','$q','coordInstalacionesPIService' ,'genericService', function($scope, $q, coordInstalacionesPIService, genericService) {

	app.coordInstalacionesSF($scope,coordInstalacionesPIService,$q,genericService)
	$scope.vistaCoordinacion = 0;
	$scope.filtrosCatalogo = [];
	$scope.listadoTurnosAcciones = [];
	$scope.listadoMotivosReagenda = [];
	$scope.listadoMotivosCalendarizado = [];
	$scope.listadoEstadoGestoria = [];
	$scope.listadoMotivosGestaria = [];

	$scope.filtrosGeneral = {};

	var tablePendiente = undefined;
	var tableAsignada = undefined;
	var tableDetenida = undefined;
	
	var tableCancelada = undefined;
	var tableCalendarizada = undefined;
	var tableGestoria = undefined;
	$scope.nombreBandeja = "";

	$scope.nivelArbol = 0;
	$scope.tipoBandeja = 1;

	$scope.consultarCatalogos = function() {
		$q.all([
			coordInstalacionesPIService.consultarCatalogoEstatusDespachoPI(),
			coordInstalacionesPIService.consulCatalogoGeografiaUsuarioDespacho(),
			coordInstalacionesPIService.consultarCatalogoTurnosDespachoPI()
		]).then(function(results) {  
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.filtrosCatalogo = results[0].data.result;
						$scope.filtrosCatalogo.map((e)=>{
							e.check = true;
						})
						$scope.mostrarFiltros();
					} else {
						toastr.warning('No se encontraron resultados');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			}
			if (results[1].data !== undefined) {
				if(results[1].data.respuesta ){
                    if(results[1].data.result ){
                        if(results[1].data.result.geografia){
                            //$scope.listadogeografiacopy=results[1].data.result.geografia
                            geografia=results[1].data.result.geografia
							
                            //necesario para agregar el y arbol 
                            geografia.map((e)=>{
								if (e.nivel > $scope.nivelArbol) {
									$scope.nivelArbol = e.nivel;
								}
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                               
                                e.state= { //Este objeto tu no lo necesitas karen! e.state
                                    opened: false,
                                    selected: true
                                }
                                return e
                            });
							/*
							geografiaPendiente = angular.copy(geografia);
							geografiaAsignada = angular.copy(geografia);
							geografiaDetenida = angular.copy(geografia);
							geografiaTerminada = angular.copy(geografia);
							geografiaCancelada = angular.copy(geografia);
							geografiaCalendarizada = angular.copy(geografia);
							geografiaGestoria = angular.copy(geografia);
							*/
							$scope.cambiarVista(1);
							//$scope.iniciarArboles();
                        }else{
                            toastr.warning( 'No se encontraron datos para la geografia' );                
                        }                        
                    }else{                      
                        toastr.warning( 'No se encontraron datos para la geografia' );                
                    }
                }else{
                    toastr.warning( results[2].data.resultDescripcion );                
                }    
			}

			if (results[2].data !== undefined) {
                if(results[2].data.respuesta ){
                    if(results[2].data.result ){
                        $scope.filtrosGeneral.turnosdisponibles=results[2].data.result
                        $scope.filtrosGeneral.turnosdisponibles.map(e=>{e.checkedOpcion=true; return e;})
						$scope.mostrarTurnos();
                    }else{                      
                        toastr.warning( 'No se encontraron catalogos turnos' );                
                    }
                }else{
                    toastr.warning( results[0].data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }
		}).catch(err => handleError(err));
	}
	$scope.consultarCatalogos();

	$scope.consultarPendientes = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusPendiente.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
				e.estados.map((es)=>{
					if (es.check) {
						$scope.estadoSelect.push(es.id);
					}
				});
			}
		});
		$scope.geografiaSelect = $("#jstree-pendiente").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbol).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoPendiente.ot || $scope.objetoPendiente.ot === "" ? undefined : $scope.objetoPendiente.ot,
			folioSistema: !$scope.objetoPendiente.folio || $scope.objetoPendiente.folio === "" ? undefined : $scope.objetoPendiente.folio,
			idClaveCliente: !$scope.objetoPendiente.claveCliente || $scope.objetoPendiente.claveCliente === "" ? undefined : $scope.objetoPendiente.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_pendiente").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_pendiente").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_pendiente","fecha_fin_pendiente")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tablePendiente) {
				tablePendiente.destroy()
			}
			tablePendiente = $("#table_pendiente").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	$scope.consultarAsignada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusAsignada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
				e.estados.map((es)=>{
					if (es.check) {
						$scope.estadoSelect.push(es.id);
					}
				});
			}
		});
		$scope.geografiaSelect = $("#jstree-asignado").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbol).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoAsignada.ot || $scope.objetoAsignada.ot === "" ? undefined : $scope.objetoAsignada.ot,
			folioSistema: !$scope.objetoAsignada.folio || $scope.objetoAsignada.folio === "" ? undefined : $scope.objetoAsignada.folio,
			idClaveCliente: !$scope.objetoAsignada.claveCliente || $scope.objetoAsignada.claveCliente === "" ? undefined : $scope.objetoAsignada.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_asignada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_asignada").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_asignada","fecha_fin_asignada")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableAsignada) {
				tableAsignada.destroy()
			}
			tableAsignada = $("#tableAsignada").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	$scope.consultarDetenida = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusDetenida.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
				e.estados.map((es)=>{
					if (es.check) {
						$scope.estadoSelect.push(es.id);
					}
				});
			}
		});
		$scope.geografiaSelect = $("#jstree-detenido").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbol).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoDetenida.ot || $scope.objetoDetenida.ot === "" ? undefined : $scope.objetoDetenida.ot,
			folioSistema: !$scope.objetoDetenida.folio || $scope.objetoDetenida.folio === "" ? undefined : $scope.objetoDetenida.folio,
			idClaveCliente: !$scope.objetoDetenida.claveCliente || $scope.objetoDetenida.claveCliente === "" ? undefined : $scope.objetoDetenida.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_detenida").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_detenida").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_detenida","fecha_fin_detenida")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableDetenida) {
				tableDetenida.destroy()
			}
			tableDetenida = $("#tableDetenida").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}
		

	$scope.consultarTerminada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusTerminada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
				e.estados.map((es)=>{
					if (es.check) {
						$scope.estadoSelect.push(es.id);
					}
				});
			}
		});
		$scope.geografiaSelect = $("#jstree-terminada").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbol).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoTerminadas.ot || $scope.objetoTerminadas.ot === "" ? undefined : $scope.objetoTerminadas.ot,
			folioSistema: !$scope.objetoTerminadas.folio || $scope.objetoTerminadas.folio === "" ? undefined : $scope.objetoTerminadas.folio,
			idClaveCliente: !$scope.objetoTerminadas.claveCliente || $scope.objetoTerminadas.claveCliente === "" ? undefined : $scope.objetoTerminadas.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_terminada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_terminada").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_terminada","fecha_fin_terminada")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableTerminada) {
				tableTerminada.destroy() 
			}
			tableTerminada = $("#tableTerminada").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}
	
	$scope.consultarCancelada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusCancelada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
				e.estados.map((es)=>{
					if (es.check) {
						$scope.estadoSelect.push(es.id);
					}
				});
			}
		});
		$scope.geografiaSelect = $("#jstree-cancelada").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbol).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoCancelada.ot || $scope.objetoCancelada.ot === "" ? undefined : $scope.objetoCancelada.ot,
			folioSistema: !$scope.objetoCancelada.folio || $scope.objetoCancelada.folio === "" ? undefined : $scope.objetoCancelada.folio,
			idClaveCliente: !$scope.objetoCancelada.claveCliente || $scope.objetoCancelada.claveCliente === "" ? undefined : $scope.objetoCancelada.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_cancelada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_cancelada").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_cancelada","fecha_fin_cancelada")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera){
			if(tableCancelada) {
				tableCancelada.destroy() 
			}
			tableCancelada = $("#tableCancelada").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	$scope.consultarCalendarizada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusCalendarizada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
				e.estados.map((es)=>{
					if (es.check) {
						$scope.estadoSelect.push(es.id);
					}
				});
			}
		});
		$scope.geografiaSelect = $("#jstree-calendarizar").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbol).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoCalendarizada.ot || $scope.objetoCalendarizada.ot === "" ? undefined : $scope.objetoCalendarizada.ot,
			folioSistema: !$scope.objetoCalendarizada.folio || $scope.objetoCalendarizada.folio === "" ? undefined : $scope.objetoCalendarizada.folio,
			idClaveCliente: !$scope.objetoCalendarizada.claveCliente || $scope.objetoCalendarizada.claveCliente === "" ? undefined : $scope.objetoCalendarizada.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_calendarizado").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_calendarizado").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_calendarizado","fecha_fin_calendarizado")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableCalendarizada) {
				tableCalendarizada.destroy() 
			}
			tableCalendarizada = $("#tableCalendarizada").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
		
	}

	$scope.consultarGestoria = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusGestoria.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
				e.estados.map((es)=>{
					if (es.check) {
						$scope.estadoSelect.push(es.id);
					}
				});
			}
		});
		$scope.geografiaSelect = $("#jstree-gestoria").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbol).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoGestoria.ot || $scope.objetoGestoria.ot === "" ? undefined : $scope.objetoGestoria.ot,
			folioSistema: !$scope.objetoGestoria.folio || $scope.objetoGestoria.folio === "" ? undefined : $scope.objetoGestoria.folio,
			idClaveCliente: !$scope.objetoGestoria.claveCliente || $scope.objetoGestoria.claveCliente === "" ? undefined : $scope.objetoGestoria.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_gestoria").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_gestoria").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_gestoria","fecha_fin_gestoria")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableGestoria) {
				tableGestoria.destroy() 
			}
			tableGestoria = $("#tableGestoria").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	$scope.elementCalendarizado = {};
	$scope.elementReagendaOT = {};
	$scope.elementoPlazaComercial = {};
	$scope.cambioStatus = function(tipo){
        let errorMensaje = '<ul>';
        let isValido = true;
        let params = {};
        $scope.tipoaccioncambioestatus=tipo
        if (tipo === 'calendariza') {
            if ($scope.elementCalendarizado.fechaCalendarizado.trim() === '') {
                errorMensaje += '<li>Completa campo fecha</li>'
                isValido = false;
            }
            if (!$scope.elementCalendarizado.turno) {
                errorMensaje += '<li>Seleccione campo turno.</li>'
                isValido = false;
            }
            if (!$scope.elementCalendarizado.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }
            if (!$scope.elementCalendarizado.comentario || $scope.elementCalendarizado.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comnentario.</li>'
                isValido = false;
            }
            if (isValido) {
                let fechaCalendariza = $scope.elementCalendarizado.fechaCalendarizado.split('/')
				params = {
					tipo: tipo,
					ot: $scope.detalleOtSeleccionada.idOrden,
					folioSistema: $scope.detalleOtSeleccionada.folioOrden,
					idFlujo: $scope.detalleOtSeleccionada.idFlujo,
					idTipoOrden: $scope.detalleOtSeleccionada.idtipoOrden,
					idSubTipoOrden: $scope.detalleOtSeleccionada.idSubtipoOrden,
					idOrigenSistema: 1,
					idUsuarioDespacho: 12,
					latitud: $scope.detalleOtSeleccionada.latitud,
					longitud: $scope.detalleOtSeleccionada.longitud,
					comentarios: $scope.elementCalendarizado.comentario,
					idTurno: $scope.elementCalendarizado.turno.id,
					idMotivo: $scope.elementCalendarizado.motivo.id,
					fechaHoraAgenda: fechaCalendariza[2] + '-' + fechaCalendariza[1] + '-' + fechaCalendariza[0]
				}
            }
        } else if (tipo === 'reagendamiento') {
            if (!$scope.elementReagendaOT || $scope.elementReagendaOT.fechaReagendamiento.trim() === '') {
                errorMensaje += '<li>Completa campo fecha.</li>'
                isValido = false;
            }
            if (!$scope.elementReagendaOT || !$scope.elementReagendaOT.turno) {
                errorMensaje += '<li>Seleccione campo turno.</li>'
                isValido = false;
            }
            if (!$scope.elementReagendaOT || !$scope.elementReagendaOT.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }
            if (!$scope.elementReagendaOT.comentario || $scope.elementReagendaOT.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comentario.</li>'
                isValido = false;
            }
            if (isValido) {
                let fechaReagendamiento = $scope.elementReagendaOT.fechaReagendamiento.split('/')
				params = {
					tipo: tipo,
					ot: $scope.detalleOtSeleccionada.idOrden,
					folioSistema: $scope.detalleOtSeleccionada.folioOrden,
					idFlujo: $scope.detalleOtSeleccionada.idFlujo,
					idTipoOrden: $scope.detalleOtSeleccionada.idtipoOrden,
					idSubTipoOrden: $scope.detalleOtSeleccionada.idSubtipoOrden,
					idOrigenSistema: 1,
					idUsuarioDespacho: 12,
					latitud: $scope.detalleOtSeleccionada.latitud,
					longitud: $scope.detalleOtSeleccionada.longitud,
					comentarios: $scope.elementReagendaOT.comentario,
					idTurno: $scope.elementReagendaOT.turno.id,
					idMotivo: $scope.elementReagendaOT.motivo.id,
					fechaHoraAgenda: fechaReagendamiento[2] + '-' + fechaReagendamiento[1] + '-' + fechaReagendamiento[0]
				}
            }
        } else if (tipo === 'gestoria'){
            if (!$scope.elementoPlazaComercial || !$scope.elementoPlazaComercial.estado) {
                errorMensaje += '<li>Seleccione campo estado.</li>'
                isValido = false;
            }
            if (!$scope.elementoPlazaComercial || !$scope.elementoPlazaComercial.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }
            if (!$scope.elementoPlazaComercial.comentario || $scope.elementoPlazaComercial.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comentario.</li>'
                isValido = false;
            }
            if (isValido) {
				params = {
					tipo: tipo,
					ot: $scope.detalleOtSeleccionada.idOrden,
					folioSistema: $scope.detalleOtSeleccionada.folioOrden,
					idFlujo: $scope.detalleOtSeleccionada.idFlujo,
					idTipoOrden: $scope.detalleOtSeleccionada.idtipoOrden,
					idSubTipoOrden: $scope.detalleOtSeleccionada.idSubtipoOrden,
					idOrigenSistema: 1,
					idUsuarioDespacho: 12,
					latitud: $scope.detalleOtSeleccionada.latitud,
					longitud: $scope.detalleOtSeleccionada.longitud,
					comentarios: $scope.elementoPlazaComercial.comentario,
					idMotivo: $scope.elementoPlazaComercial.motivo.id,
				}
            }
        }
        if (isValido) {
            envioCambioStatus(params);
        } else {
            errorMensaje += '</ul>'
            mostrarMensajeWarningValidacion(errorMensaje)
        }
    }

	envioCambioStatus = function(params) {
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        genericService.cambioStatusOts(params).then(result =>{
            console.log(result);
            swal.close();
            
            if(result.data.respuesta){
                toastr.success( result.data.result.mensaje );
				if ($scope.vistaCoordinacion === 1) {
					$scope.consultarPendientes();
				} else if ($scope.vistaCoordinacion === 6) {
					$scope.consultarCalendarizada();
				} else {
					$scope.consultarGestoria();
				}
                $("#modalDetalleOt").modal('hide');
            }else{
                console.log(result.data.resultDescripcion)
                toastr.warning( result.data.resultDescripcion );
            }
        }).catch(err => handleError(err));
    }

	$scope.objetoPendiente = {};
	$scope.limpiarCamposPendiente = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoPendiente.folio = "";
				$scope.objetoPendiente.claveCliente = "";
				break;
			case 2:
				$scope.objetoPendiente.ot = "";
				$scope.objetoPendiente.claveCliente = "";
				break;
			case 3:
				$scope.objetoPendiente.ot = "";
				$scope.objetoPendiente.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoAsignada = {};
	$scope.limpiarCamposAsignada = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoAsignada.folio = "";
				$scope.objetoAsignada.claveCliente = "";
				break;
			case 2:
				$scope.objetoAsignada.ot = "";
				$scope.objetoAsignada.claveCliente = "";
				break;
			case 3:
				$scope.objetoAsignada.ot = "";
				$scope.objetoAsignada.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoDetenida = {};
	$scope.limpiarCamposDetenida = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoDetenida.folio = "";
				$scope.objetoDetenida.claveCliente = "";
				break;
			case 2:
				$scope.objetoDetenida.ot = "";
				$scope.objetoDetenida.claveCliente = "";
				break;
			case 3:
				$scope.objetoDetenida.ot = "";
				$scope.objetoDetenida.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoTerminadas = {};
	$scope.limpiarCamposTerminada = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoTerminadas.folio = "";
				$scope.objetoTerminadas.claveCliente = "";
				break;
			case 2:
				$scope.objetoTerminadas.ot = "";
				$scope.objetoTerminadas.claveCliente = "";
				break;
			case 3:
				$scope.objetoTerminadas.ot = "";
				$scope.objetoTerminadas.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoCancelada = {};
	$scope.limpiarCamposCancelada = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoCancelada.folio = "";
				$scope.objetoCancelada.claveCliente = "";
				break;
			case 2:
				$scope.objetoCancelada.ot = "";
				$scope.objetoCancelada.claveCliente = "";
				break;
			case 3:
				$scope.objetoCancelada.ot = "";
				$scope.objetoCancelada.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoCalendarizada = {};
	$scope.limpiarCamposCalendarizada = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoCalendarizada.folio = "";
				$scope.objetoCalendarizada.claveCliente = "";
				break;
			case 2:
				$scope.objetoCalendarizada.ot = "";
				$scope.objetoCalendarizada.claveCliente = "";
				break;
			case 3:
				$scope.objetoCalendarizada.ot = "";
				$scope.objetoCalendarizada.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoGestoria = {};
	$scope.limpiarCamposGestoria = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoGestoria.folio = "";
				$scope.objetoGestoria.claveCliente = "";
				break;
			case 2:
				$scope.objetoGestoria.ot = "";
				$scope.objetoGestoria.claveCliente = "";
				break;
			case 3:
				$scope.objetoGestoria.ot = "";
				$scope.objetoGestoria.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

	$scope.consultarBandejaFFM = function(params, table, tablagg) {
		if(tableTerminada) {
			tableTerminada.destroy() 
		}
		tableTerminada = $("#tableTerminada").DataTable({
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
				"url": "req/consultarBandejaFFM",
				"type": "POST",
				"data": params,
				"beforeSend": function () {
					if(!swal.isVisible() ){
						swal({ text: 'Cargando registros...', allowOutsideClick: false });
						swal.showLoading();
					}
					
				},
				"dataSrc": function (json) {
					console.log(json);
					$scope.elementosRegistro = json.registrosTotales
					return json.data;
				},
				"error":function(xhr, error, thrown){
					handleError(xhr)
				}, 
				"complete": function () {
					swal.close()
				}
			},
			"columns": [null, null, null, null, null, null, null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});
	}

	$scope.cambioTitulo = function(opcion) {
		$scope.tipoBandeja = opcion;
	}

	$scope.mostrarFiltros = function() {
		//PENDIENTE
		$scope.listaEstatusPendiente = $scope.filtrosCatalogo.filter(e => {return e.id === 1});
		$scope.listaEstatusPendiente.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});
		$scope.listadoMotivosReagenda = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 201})

		//ASIGNADA
		$scope.listaEstatusAsignada = $scope.filtrosCatalogo.filter(e => {return e.id === 2});
		$scope.listaEstatusAsignada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//DETENIDA
		$scope.listaEstatusDetenida = $scope.filtrosCatalogo.filter(e => {return e.id === 3});
		$scope.listaEstatusDetenida.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//TERMINADA
		$scope.listaEstatusTerminada = $scope.filtrosCatalogo.filter(e => {return e.id === 4});
		$scope.listaEstatusTerminada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//CANCELADA
		$scope.listaEstatusCancelada = $scope.filtrosCatalogo.filter(e => {return e.id === 5});
		$scope.listaEstatusCancelada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//CALENDARIZADO
		$scope.listaEstatusCalendarizada = $scope.filtrosCatalogo.filter(e => {return e.id === 6});
		$scope.listaEstatusCalendarizada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});
		$scope.listadoMotivosCalendarizado = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 243})

		//GESTORIA
		$scope.listaEstatusGestoria = $scope.filtrosCatalogo.filter(e => {return e.id === 7});
		$scope.listaEstatusGestoria.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});
		$scope.listadoEstadoGestoria = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 7});
		$scope.listadoMotivosGestaria = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 249})

	}

	$scope.mostrarTurnos = function() {
		$scope.listadoTurnosAcciones = $scope.filtrosGeneral.turnosdisponibles;
	}

	$scope.banderaGeografiaPendiente = false;
	$scope.banderaGeografiaAsignada = false;
	$scope.banderaGeografiaDetenida = false;
	$scope.banderaGeografiaTerminada = false;
	$scope.banderaGeografiaCancelada = false;
	$scope.banderaGeografiaCalendarizada = false;
	$scope.banderaGeografiaGestoria = false;
	$scope.cambiarVista = function(opcion) {
		
		if (opcion === 1) {
			
			if(!$scope.banderaGeografiaPendiente) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading();
				$("#jstree-pendiente").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaPendiente = true;
					$scope.consultarPendientes();
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			
			$scope.nombreBandeja = "PENDIENTE";
		}
		
		if (opcion === 2) {
			
			if(!$scope.banderaGeografiaAsignada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-asignado").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaAsignada = true;
					$scope.consultarAsignada();
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			
			$scope.nombreBandeja = "ASIGNADA";
		}
		if (opcion === 3) {
			
			if (!$scope.banderaGeografiaDetenida) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-detenido").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaDetenida = true;
					$scope.consultarDetenida();
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			
			$scope.nombreBandeja = "DETENIDA";
		}
		if (opcion === 4) {
			if (!$scope.banderaGeografiaTerminada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-terminada").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaTerminada = true;
					$scope.consultarTerminada();
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			$scope.nombreBandeja = "TERMINADA";
		}
		if (opcion === 5) {
			if (!$scope.banderaGeografiaCancelada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-cancelada").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaCancelada = true;
					$scope.consultarCancelada();
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			$scope.nombreBandeja = "CANCELADA";
		}
		if (opcion === 6) {
			if (!$scope.banderaGeografiaCalendarizada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-calendarizar").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaCalendarizada = true;
					$scope.consultarCalendarizada();
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			$scope.nombreBandeja = "CALENDARIZADA";
		}
		if (opcion === 7) {
			if (!$scope.banderaGeografiaGestoria) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-gestoria").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaGestoria = true;
					$scope.consultarGestoria();
				}).jstree({	
					'plugins': ["wholerow", "checkbox", "search"],
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			$scope.nombreBandeja = "GESTORIA";
		}
		
		$scope.vistaCoordinacion = opcion;
	}

	$scope.iniciarArboles = function() {
		$("#jstree-pendiente").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaPendiente = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'core': {
				'data': geografiaPendiente,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-asignado").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaAsignada = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'core': {
				'data': geografiaAsignada,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-detenido").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaDetenida = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'core': {
				'data': geografiaDetenida,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-terminada").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaTerminada = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'core': {
				'data': geografiaTerminada,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-cancelada").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaCancelada = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'core': {
				'data': geografiaCancelada,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-calendarizar").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaCalendarizada = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'core': {
				'data': geografiaCalendarizada,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-gestoria").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaGestoria = true;
			console.log("se crea");
		}).jstree({	
			'plugins': ["wholerow", "checkbox"],
			'core': {
				'data': geografiaGestoria,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

	}

	$scope.pintarArbol = function(nombreArbol, datos) {
		console.log(nombreArbol);
		$(nombreArbol).bind('loaded.jstree', function(e, data) {
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'core': {
				'data': datos,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});
	}

	$scope.validarFecha = function(fechaInicio, fechaFin) {
		if (document.getElementById(fechaInicio).value.trim() != "" && document.getElementById(fechaFin).value.trim() != "") {
			var inicio = document.getElementById(fechaInicio).value.split('/');
			var fin = document.getElementById(fechaFin).value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}

	$scope.showArbol = 0;
	$scope.mostrarArbol = function(opcion) {
		switch (opcion) {
			case 1:
				$("#modal-geografia-pendiente").modal("show");
				break;
			case 2:
				$("#modal-geografia-asignada").modal("show");
				break;
			case 3:
				$("#modal-geografia-detenido").modal("show");
				break;
			case 4:
				$("#modal-geografia-terminada").modal("show");
				break;
			case 5:
				$("#modal-geografia-cancelada").modal("show");
				break;
			case 6:
				$("#modal-geografia-calendarizada").modal("show");
				break;
			case 7:
				$("#modal-geografia-gestoria").modal("show");
				break;
		
		
			default:
				break;
		}
		//$scope.showArbol = opcion;
		
	}

	$scope.detalleOtSeleccionada = {};
	consultaDetalleOt = function(idOt, folio, idFlujo, idTipoOrden, idSubtipoOrden, latitud, longitud) {
		if ($scope.vistaCoordinacion === 1 || $scope.vistaCoordinacion === 6 || $scope.vistaCoordinacion === 7) {
			$scope.elementCalendarizado = {};
			$scope.elementReagendaOT = {};
			$scope.elementoPlazaComercial = {};
			$scope.detalleOtSeleccionada = {};
			$scope.$apply();
			$scope.detalleOtSeleccionada.idOrden = idOt;
			$scope.detalleOtSeleccionada.folioOrden = folio;
			$scope.detalleOtSeleccionada.idFlujo = idFlujo;
			$scope.detalleOtSeleccionada.idtipoOrden = idTipoOrden;
			$scope.detalleOtSeleccionada.idSubtipoOrden = idSubtipoOrden;
			$scope.detalleOtSeleccionada.latitud = latitud;
			$scope.detalleOtSeleccionada.longitud = longitud;
			$("#modalDetalleOt").modal("show");
			$('#fecha-reagendamiento').datepicker('update',new Date());
			$('#fecha-calendarizado').datepicker('update',   moment(new Date()).add('days', 8).toDate() );
			if ($scope.vistaCoordinacion !== 1) {
				document.getElementById('opcion-reagendar').click()
			} else {
				document.getElementById('opcion-plaza').click()
			}
		}
		//$scope.vistaCoordinacion = 
	}

	$scope.seleccionarTodos = function(lista) {
		lista.map((e)=>{
			e.check = true;
		});
	}

	$scope.deseleccionarTodos = function(lista) {
		lista.map((e)=>{
			e.check = false;
		});
	}

	$scope.clickEstatus = function(estatus) {
		estatus.estados.map(function(estado) {
			estado.check = !estatus.check;
		});
	}

	$scope.clickEstado = function(estatus, estado) {
		
	}

	$scope.busquedaGeografiaFiltroPendiente = function () {
        $("#jstree-pendiente").jstree("search", $('#searchGeografiaPendiente').val());
    }
	$scope.busquedaGeografiaFiltroAsignada = function () {
		$("#jstree-asignado").jstree("search", $('#searchGeografiaAsignada').val());
    }
	$scope.busquedaGeografiaFiltroDetenida = function () {
        $("#jstree-detenido").jstree("search", $('#searchGeografiaDetenida').val());
    }
	$scope.busquedaGeografiaFiltroTerminada = function () {
        $("#jstree-terminada").jstree("search", $('#searchGeografiaTerminada').val());
    }
	$scope.busquedaGeografiaFiltroCancelada = function () {
        $("#jstree-cancelada").jstree("search", $('#searchGeografiaCancelada').val());
    }
	$scope.busquedaGeografiaFiltroCalendarizada = function () {
        $("#jstree-calendarizar").jstree("search", $('#searchGeografiaCalendarizada').val());
    }
	$scope.busquedaGeografiaFiltroGestoria = function () {
        $("#jstree-gestoria").jstree("search", $('#searchGeografiaGestoria').val());
    }

	angular.element(document).ready(function () {

		tableCalendarizada=$('#tableCalendarizada').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });
		
		tablePendiente=$('#table_pendiente').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableAsignada=$('#tableAsignada').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableDetenida=$('#tableDetenida').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableTerminada=$('#tableTerminada').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableCancelada=$('#tableCancelada').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableGestoria=$('#tableGestoria').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });
				
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
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true,
            startDate :  moment(new Date()).toDate()
        });
        $('#fecha-reagendamiento').datepicker('update',new Date());

		$('#fecha-calendarizado').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true,
            startDate :  moment(new Date()).add('days', 8).toDate()
        });
        $('#fecha-calendarizado').datepicker('update',   moment(new Date()).add('days', 8).toDate() );

		$('.drop-down-filters').on("click.bs.dropdown", function (e) {
            e.stopPropagation();
        });

		$("#idBody").removeAttr("style");
		$('#moduloCoordInst').addClass('active');
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

	});


	// -----------------------------------------------------------------------


}]);