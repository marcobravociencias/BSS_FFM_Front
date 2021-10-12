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
                            var geografia=results[1].data.result.geografia
							
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
							$scope.pintarArbol("#jstree-calendarizar", geografia);
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
		//CALENDARIZADO
		$scope.listaEstatusCalendarizada = $scope.filtrosCatalogo.filter(e => {return e.id === 6});
		$scope.listaEstadoCalendarizada = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 6});


	}

	$scope.cambiarVista = function(opcion) {
		$scope.vistaCoordinacion = opcion;
	}

	$scope.pintarArbol = function(nombreArbol, datos) {
		console.log("inicinado arbol");
		console.log(nombreArbol);
		console.log(datos);
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