var app = angular.module('coordInstalacionesPIApp', []);
app.controller('coordInstPIController', ['$scope','$q','coordInstalacionesPIService' ,'genericService', function($scope, $q, coordInstalacionesPIService, genericService) {

	$scope.vistaCoordinacion = 0;
	$scope.filtrosCatalogo = [];

	var tablePendiente = undefined;
	var tableAsignada = undefined;
	var tableDetenida = undefined;
	var tableTerminada = undefined;
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
							$scope.pintarArbol("#jstree-gestoria", geografia);
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
		$scope.listaEstatusCalendarizada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
			}
		});
		$scope.listaEstadoCalendarizada.map((e)=>{
			if (e.check) {
				$scope.estadoSelect.push(e.id);
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
		$scope.consultarBandejaFFM(params, "#tableCalendarizada", tableCalendarizada);
	}

	$scope.consultarPendientes = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusPendiente.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
			}
		});
		$scope.listaEstadoPendiente.map((e)=>{
			if (e.check) {
				$scope.estadoSelect.push(e.id);
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
		$scope.consultarBandejaFFM(params, "#table_pendiente", tablePendiente);
	}

	$scope.consultarAsignada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusAsignada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
			}
		});
		$scope.listaEstadoAsignada.map((e)=>{
			if (e.check) {
				$scope.estadoSelect.push(e.id);
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
		$scope.consultarBandejaFFM(params, "#tableAsignada", tableAsignada);
	}

	$scope.consultarDetenida = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusDetenida.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
			}
		});
		$scope.listaEstadoDetenida.map((e)=>{
			if (e.check) {
				$scope.estadoSelect.push(e.id);
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
		$scope.consultarBandejaFFM(params, "#tableDetenida", tableDetenida);
	}

	$scope.consultarTerminada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusTerminada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
			}
		});
		$scope.listaEstadoTerminada.map((e)=>{
			if (e.check) {
				$scope.estadoSelect.push(e.id);
			}
		});
		$scope.geografiaSelect = $("#jstree-terminada").jstree("get_selected", true).filter(e=>e.original.nivel>0).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: '',
			folioSistema: '',
			idClaveCliente: '',
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_terminada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_terminada").val()),
			elementosPorPagina: 10
		}
		$scope.consultarBandejaFFM(params, "#tableTerminada", tableTerminada);
	}

	$scope.consultarCancelada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusCancelada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
			}
		});
		$scope.listaEstadoCancelada.map((e)=>{
			if (e.check) {
				$scope.estadoSelect.push(e.id);
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
		$scope.consultarBandejaFFM(params, "#tableCancelada", tableCancelada);
	}

	$scope.consultarCalendarizada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusCalendarizada.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
			}
		});
		$scope.listaEstadoCalendarizada.map((e)=>{
			if (e.check) {
				$scope.estadoSelect.push(e.id);
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
		$scope.consultarBandejaFFM(params, "#tableCalendarizada", tableCalendarizada);
	}

	$scope.consultarGestoria = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.listaEstatusGestoria.map((e)=>{
			if (e.check) {
				$scope.estatusSelect.push(e.id);
			}
		});
		$scope.listaEstadoGestoria.map((e)=>{
			if (e.check) {
				$scope.estadoSelect.push(e.id);
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
		$scope.consultarBandejaFFM(params, "#tableGestoria", tableGestoria);
	}

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

	$scope.consultarBandejaFFM = function(params, table, tablagg) {
		if(tablagg) {
			tablagg.destroy() 
		}
		tablagg = $(table).DataTable({
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
			"columns": [null, null, null, null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});
	}

	$scope.mostrarFiltros = function() {
		console.log("Inicinado estatus");
		//PENDIENTE
		$scope.listaEstatusPendiente = $scope.filtrosCatalogo.filter(e => {return e.id === 1});
		$scope.listaEstadoPendiente = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 1});

		//ASIGNADA
		$scope.listaEstatusAsignada = $scope.filtrosCatalogo.filter(e => {return e.id === 6});
		$scope.listaEstadoAsignada = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 6});

		//DETENIDA
		$scope.listaEstatusDetenida = $scope.filtrosCatalogo.filter(e => {return e.id === 6});
		$scope.listaEstadoDetenida = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 6});

		//TERMINADA
		$scope.listaEstatusTerminada = $scope.filtrosCatalogo.filter(e => {return e.id === 4});
		$scope.listaEstadoTerminada = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 4});

		//CANCELADA
		$scope.listaEstatusCancelada = $scope.filtrosCatalogo.filter(e => {return e.id === 5});
		$scope.listaEstadoCancelada = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 5});

		//CALENDARIZADO
		$scope.listaEstatusCalendarizada = $scope.filtrosCatalogo.filter(e => {return e.id === 6});
		$scope.listaEstadoCalendarizada = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 6});

		//GESTORIA
		$scope.listaEstatusGestoria = $scope.filtrosCatalogo.filter(e => {return e.id === 7});
		$scope.listaEstadoGestoria = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 7});

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
	});


	// -----------------------------------------------------------------------


}]);