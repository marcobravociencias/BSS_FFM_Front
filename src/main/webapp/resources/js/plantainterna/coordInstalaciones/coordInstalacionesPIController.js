var app = angular.module('coordInstalacionesPIApp', []);
var tableTerminada = undefined;
app.controller('coordInstPIController', ['$scope','$q','coordInstalacionesPIService' ,'genericService', function($scope, $q, coordInstalacionesPIService, genericService) {

	$scope.vistaCoordinacion = 0;
	$scope.filtrosCatalogo = [];

	var tablePendiente = undefined;
	var tableAsignada = undefined;
	var tableDetenida = undefined;
	
	var tableCancelada = undefined;
	var tableCalendarizada = undefined;
	var tableGestoria = undefined;

	var geografia;

	$scope.consultarCatalogos = function() {
		$q.all([
			coordInstalacionesPIService.consultarCatalogoEstatusDespachoPI(),
			coordInstalacionesPIService.consulCatalogoGeografiaUsuarioDespacho()
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
                            $scope.listadogeografiacopy=results[1].data.result.geografia
                            geografia=results[1].data.result.geografia
							
                            //necesario para agregar el y arbol 
                            geografia.map((e)=>{
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                               
                                e.state= { //Este objeto tu no lo necesitas karen! e.state
                                    opened: false,
                                    selected: true
                                }
                                return e
                            })     
							/*  
							$scope.pintarArbol("#jstree-pendiente", geografia);
							$scope.pintarArbol("#jstree-asignado", geografia);
							$scope.pintarArbol("#jstree-detenido", geografia);
							$scope.pintarArbol("#jstree-terminada", geografia);
							$scope.pintarArbol("#jstree-cancelada", geografia);
							$scope.pintarArbol("#jstree-calendarizar", geografia);
							$scope.pintarArbol("#jstree-gestoria", geografia);e
							*/
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
		}).catch(err => handleError(err));
	}
	$scope.consultarCatalogos();

	$scope.consultarPendientes = function() {
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
		$scope.geografiaSelect = $("#jstree-pendiente").jstree("get_selected", true).filter(e=>e.original.nivel>0).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: '',
			folioSistema: '',
			idClaveCliente: '',
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_pendiente").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_pendiente").val()),
			elementosPorPagina: 10
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
		$scope.geografiaSelect = $("#jstree-asignado").jstree("get_selected", true).filter(e=>e.original.nivel>0).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: '',
			folioSistema: '',
			idClaveCliente: '',
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_asignada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_asignada").val()),
			elementosPorPagina: 10
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
		$scope.geografiaSelect = $("#jstree-detenido").jstree("get_selected", true).filter(e=>e.original.nivel>0).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: '',
			folioSistema: '',
			idClaveCliente: '',
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_detenida").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_detenida").val()),
			elementosPorPagina: 10
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
		$scope.geografiaSelect = $("#jstree-terminada").jstree("get_selected", true).filter(e=>e.original.nivel === 5).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoTerminadas.ot || $scope.objetoTerminadas.ot === "" ? undefined : $scope.objetoTerminadas.ot,
			folioSistema: !$scope.objetoTerminadas.folio || $scope.objetoTerminadas.folio === "" ? undefined : $scope.objetoTerminadas.folio,
			idClaveCliente: !$scope.objetoTerminadas.claveCliente || $scope.objetoTerminadas.claveCliente === "" ? undefined : $scope.objetoTerminadas.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_terminada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_terminada").val()),
			elementosPorPagina: 10
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
		$scope.geografiaSelect = $("#jstree-cancelada").jstree("get_selected", true).filter(e=>e.original.nivel>0).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: '',
			folioSistema: '',
			idClaveCliente: '',
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_cancelada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_cancelada").val()),
			elementosPorPagina: 10
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
		$scope.geografiaSelect = $("#jstree-calendarizar").jstree("get_selected", true).filter(e=>e.original.nivel>0).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: '',
			folioSistema: '',
			idClaveCliente: '',
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_calendarizado").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_calendarizado").val()),
			elementosPorPagina: 10
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
		$scope.geografiaSelect = $("#jstree-gestoria").jstree("get_selected", true).filter(e=>e.original.nivel>0).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: '',
			folioSistema: '',
			idClaveCliente: '',
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_gestoria").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_gestoria").val()),
			elementosPorPagina: 10
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

	$scope.mostrarFiltros = function() {
		//PENDIENTE
		$scope.listaEstatusPendiente = $scope.filtrosCatalogo.filter(e => {return e.id === 1});
		$scope.listaEstatusPendiente.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//ASIGNADA
		$scope.listaEstatusAsignada = $scope.filtrosCatalogo.filter(e => {return e.id === 6});
		$scope.listaEstatusAsignada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//DETENIDA
		$scope.listaEstatusDetenida = $scope.filtrosCatalogo.filter(e => {return e.id === 6});
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

		//GESTORIA
		$scope.listaEstatusGestoria = $scope.filtrosCatalogo.filter(e => {return e.id === 7});
		$scope.listaEstatusGestoria.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

	}

	$scope.banderaGeografiaPendiente = false;
	$scope.banderaGeografiaAsignada = false;
	$scope.banderaGeografiaDetenida = false;
	$scope.banderaGeografiaTerminada = false;
	$scope.banderaGeografiaCancelada = false;
	$scope.banderaGeografiaCalendarizada = false;
	$scope.banderaGeografiaGestoria = false;
	$scope.cambiarVista = function(opcion) {
		$scope.vistaCoordinacion = opcion;

		if (opcion === 1) {
			if(!$scope.banderaGeografiaPendiente) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-pendiente").bind('loaded.jstree', function(e, data) {
					swal.close();
					$scope.banderaGeografiaPendiente = true;
				}).jstree({
					'plugins': ["wholerow", "checkbox"],
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
		}
		if (opcion === 2) {
			if(!$scope.banderaGeografiaAsignada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-asignado").bind('loaded.jstree', function(e, data) {
					swal.close();
					$scope.banderaGeografiaAsignada = true;
				}).jstree({
					'plugins': ["wholerow", "checkbox"],
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
		}
		if (opcion === 3) {
			if (!$scope.banderaGeografiaDetenida) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-detenido").bind('loaded.jstree', function(e, data) {
					swal.close();
					$scope.banderaGeografiaDetenida = true;
				}).jstree({
					'plugins': ["wholerow", "checkbox"],
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
		}
		if (opcion === 4) {
			if (!$scope.banderaGeografiaTerminada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-terminada").bind('loaded.jstree', function(e, data) {
					swal.close();
					$scope.banderaGeografiaTerminada = true;
				}).jstree({
					'plugins': ["wholerow", "checkbox"],
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
		}
		if (opcion === 5) {
			if (!$scope.banderaGeografiaCancelada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-cancelada").bind('loaded.jstree', function(e, data) {
					swal.close();
					$scope.banderaGeografiaCancelada = true;
				}).jstree({
					'plugins': ["wholerow", "checkbox"],
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
		}
		if (opcion === 6) {
			if (!$scope.banderaGeografiaCalendarizada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-calendarizar").bind('loaded.jstree', function(e, data) {
					swal.close();
					$scope.banderaGeografiaCalendarizada = true;
				}).jstree({
					'plugins': ["wholerow", "checkbox"],
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
		}
		if (opcion === 7) {
			if (!$scope.banderaGeografiaGestoria) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-gestoria").bind('loaded.jstree', function(e, data) {
					swal.close();
					$scope.banderaGeografiaGestoria = true;
				}).jstree({	
					'plugins': ["wholerow", "checkbox"],
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
		}
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
		$scope.showArbol = opcion;
		$("#modal-geografia").modal("show");
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
				
		$('.nav-item').removeClass('active');
		$('#otros_nav').addClass('active');
		$("#btn_mostrar_nav").hide(500);
		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: true
		});
		$('.datepicker').datepicker('update', new Date());

		$('.drop-down-filters').on("click.bs.dropdown", function (e) {
            e.stopPropagation();
        });

		$("#idBody").removeAttr("style");
	});


	// -----------------------------------------------------------------------


}]);