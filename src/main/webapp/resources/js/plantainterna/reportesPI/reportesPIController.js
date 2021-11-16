var app = angular.module('reportesPIApp', []);

app.controller('reportesController', ['$scope','$q','reportesPIService', 'genericService' , function($scope, $q, reportesPIService, genericService) {
	$scope.all_cluster = [];
	let reporteOrdenesTabla;
	let reporteTecnicoTabla;
	let reporteDespachoTabla;
	let reporteAuxiliarTabla;
	let reporteInspectorTabla;
	let reporteSeguimientoTable;
	$scope.filtrosGeneral = {};
	$scope.initComponents=function(){
		console.log("Entra a inicializar elementos");
		
							
							
		$('.nav-item').removeClass('active');
 		$('#otros_nav').addClass('active');
		$("#btn_mostrar_nav").hide(500);
		
	}
	$(".elemento_link").click(function(){
			$(".elemento_link ").removeClass("active");
			$(this).addClass('active');
			switch($(this).attr('id')){
				/*
				case 'link_reporte_ordenes':
					console.log("entra ordenes")
					$("#texto_header_reportes").text("Reporte Ordenes de Trabajo Planta Interna"); 
					$('#container_reporte_ordenes').show();
					$('#container_reporte_despacho').hide();
					$('#container_reporte_tecnico').hide();
					$('#container_reporte_auxiliar').hide();
					$('#container_reporte_inspector').hide();
					$('#container_reporte_seguimiento_diario').hide();
					//$('.content_reporte').hide();
					//$("#reporteOrdenesTable").show(); 
					
					
					console.log("sale ordenes")
				break;
				case 'link_reporte_tecnico':
					console.log("entra tecnico")
					$("#texto_header_reportes").text("Reporte por t\u00E9cnico");
					$('#container_reporte_tecnico').show();
					//reporteOrdenesTable.destroy();
					$('#container_reporte_ordenes').hide();
					$('#container_reporte_despacho').hide();
					$('#container_reporte_auxiliar').hide();
					$('#container_reporte_inspector').hide();
					$('#container_reporte_seguimiento_diario').hide();
					//$('#reporteOrdenesTable').hide();
					console.log("sale tecnico")
					
					
				break;
				case 'link_reporte_despacho':
					console.log("entra despacho")
					$("#texto_header_reportes").text("Reporte Coordinador");
					$('#container_reporte_despacho').show();
					$('#container_reporte_tecnico').hide();
					$('#container_reporte_ordenes').hide();
					$('#container_reporte_auxiliar').hide();
					$('#container_reporte_inspector').hide();
					$('#container_reporte_seguimiento_diario').hide();
					//$('#reporteOrdenesTable').hide();
					console.log("sale despacho")
					
				break;
				case 'link_reporte_auxiliar':
					console.log("entra aux")
					$("#texto_header_reportes").text("Reporte T\u00E9cnico Auxiliar");
					$('#container_reporte_auxiliar').show();
					$('#container_reporte_tecnico').hide();
					$('#container_reporte_ordenes').hide();
					$('#container_reporte_despacho').hide();
					$('#container_reporte_inspector').hide();
					$('#container_reporte_seguimiento_diario').hide();
					//$('#reporteOrdenesTable').hide();
					console.log("sale aux")
					
				break;
				case 'link_reporte_inspector':
					$("#texto_header_reportes").text("Reporte Inspector");
					$('#container_reporte_auxiliar').hide();
					$('#container_reporte_tecnico').hide();
					$('#container_reporte_ordenes').hide();
					$('#container_reporte_despacho').hide();
					$('#container_reporte_seguimiento_diario').hide();
					$('#container_reporte_inspector').show();

				break;
				*/
				case 'link_reporte_seguimiento_diario':
					$("#texto_header_reportes").text("Reporte Seguimiento Diario");
					$('#container_reporte_auxiliar').hide();
					$('#container_reporte_tecnico').hide();
					$('#container_reporte_ordenes').hide();
					$('#container_reporte_despacho').hide();
					$('#container_reporte_inspector').hide();
					$('#container_reporte_seguimiento_diario').show();

				break;
					
			}
			
			
		});
	//Muestra contenido completo
$("#btn_mostrar_nav").click(function(){
	$(this).hide();
	
	$("#datos_tablas").attr('class','');
	$("#datos_tablas").addClass("col-sm-10");
	$("#navbar_reportes").show('fade');		
	$("#borderAlign").addClass("borderAlignR");
	$("#borderAlignt").addClass("borderAlignR");
	$("#borderAlignt").removeClass("borderAlignRD");
	$("#borderAlignc").addClass("borderAlignR");
	$("#borderAlignc").removeClass("borderAlignRD");
	$("#borderAligna").addClass("borderAlignR");
	$("#borderAligna").removeClass("borderAlignRD");
});

//Función para ocultar el nav de los selects
$("#ocultar_nav").click(function(){

    $("#navbar_reportes").hide('fade');
	$('#btn_mostrar_nav').show();
	$("#datos_tablas").attr("class","");
	$("#datos_tablas").addClass("col-sm-12 col-md-12");
	$("#borderAlign").removeClass("borderAlignR");
	$("#borderAlignt").removeClass("borderAlign");
	$("#borderAlignt").addClass("borderAlignRD");
	$("#borderAlignc").removeClass("borderAlign");
	$("#borderAlignc").addClass("borderAlignRD");
	$("#borderAligna").removeClass("borderAlign");
	$("#borderAligna").addClass("borderAlignRD");
	
	
});

$scope.abrirModalGeografiaRep=function(){
		console.log("Entra aqui");
        $("#modalCluster").modal('show')
    }
    
	$scope.consultarCatalagosPI = function(){
        $q.all([
            genericService.consulCatalogoGeografia(),
            genericService.consultarCatalogoIntervenciones(),
            genericService.consultarCatalogoEstatusDespachoPI()
        ]).then(function(results) {
        //    console.log("entra de cualquier manera")
            if (results[1].data !== undefined) {
				if (results[1].data.respuesta) {
					if (results[1].data.result) {
						$scope.filtrosGeneral.tipoOrdenes = $scope.realizarConversionAnidado(results[1].data.result)
						
					} else {
						toastr.warning('No se encontraron  tipo ordenes');
					}
				} else {
					toastr.warning(results[1].data.resultDescripcion);
				}
			} else {
				toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
			}
			if (results[2].data !== undefined) {
                if(results[2].data.respuesta ){
                    if(results[2].data.result ){
                        $scope.filtrosGeneral.estatusdisponibles=$scope.realizarConversionAnidado( results[2].data.result)   
                    }else{                      
                        toastr.info( 'No se encontraron catalogo de estatus' );                
                    }
                }else{
                    toastr.warning( results[2].data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de catalogo de estatus' );                
            }
            if (results[0].data !== undefined) {
                if(results[0].data.respuesta ){
                    if(results[0].data.result ){
                        if(results[0].data.result.geografia){
							$scope.listadogeografiacopy=results[0].data.result.geografia
                            //console.log("######")
                            //console.log(results[0].data.result)
                            geografia=results[0].data.result.geografia
                            geografia.map((e)=>{
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                e.state = {
									opened: false,
									selected: true,
								}
                                return e
                            })       
                            $('#jstree-proton-3').bind('loaded.jstree', function(e, data) {
                                
                            }).jstree({
								'core': {
                                    'data': geografia,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons":false        
                                    }
                                },
                                plugins : ['search'],
	            				 "search": {
										"case_sensitive": false,
										"show_only_matches": true
									}
							});
                    
                        }else{
                            toastr.warning( 'No se encontraron datos para la geografia' );                
                        }                        
                    }else{                      
                        toastr.warning( 'No se encontraron datos para la geografia' );                
                    }
                }else{
                    toastr.warning( results[0].data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }           

        }).catch(err => handleError(err));
    }
    
    $scope.realizarConversionAnidado = function (array) {
		let arrayCopy = [];
		angular.forEach(array.filter(e => e.nivel == 1), function (elemento, index) {
			elemento.checkedOpcion = true;
			elemento.children = array.filter(e => e.nivel == 2 && e.idPadre == elemento.id)
			elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : []
			elemento.children.map(e => { e.checkedOpcion = true; return e; })
			arrayCopy.push(elemento)
		})
		return arrayCopy;
	}
	
	$scope.setCheckFiltroGeneric = function (filtroParent) {
		console.log(filtroParent.checkedOpcion)
		console.log("#####---------")
		console.log(filtroParent.children)

		filtroParent.checkedOpcion = !filtroParent.checkedOpcion
		filtroParent.children.map(function (e) {
			e.checkedOpcion = filtroParent.checkedOpcion
			return e
		})
		console.log("#####")
		console.log(filtroParent.children)
		console.log(filtroParent.checkedOpcion)
	}
	$scope.setCheckSubFiltroGeneric = function (subFiltro, parentFiltro) {
		subFiltro.checkedOpcion = !subFiltro.checkedOpcion
		let cantidadSubfiltros = parentFiltro.children.length
		let cantidadChecked = parentFiltro.children.filter(function (e) { return e.checkedOpcion }).length
		parentFiltro.checkedOpcion = cantidadSubfiltros !== cantidadChecked ? false : true
	}
	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
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
		return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
	}
	
	validarFecha = function() {
		if (document.getElementById('filtro_fecha_inicio_consultaOtO').value.trim() != "" && document.getElementById('filtro_fecha_fin_consultaOtO').value.trim() != "") {
			var inicio = document.getElementById('filtro_fecha_inicio_consultaOtO').value.split('/');
			var fin = document.getElementById('filtro_fecha_fin_consultaOtO').value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}
	validarFechaT = function() {
		if (document.getElementById('filtro_fecha_inicio_consultaOtT').value.trim() != "" && document.getElementById('filtro_fecha_fin_consultaOtT').value.trim() != "") {
			var inicio = document.getElementById('filtro_fecha_inicio_consultaOtT').value.split('/');
			var fin = document.getElementById('filtro_fecha_fin_consultaOtT').value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}
	validarFechaD = function() {
		if (document.getElementById('filtro_fecha_inicio_consultaOtD').value.trim() != "" && document.getElementById('filtro_fecha_fin_consultaOtD').value.trim() != "") {
			var inicio = document.getElementById('filtro_fecha_inicio_consultaOtD').value.split('/');
			var fin = document.getElementById('filtro_fecha_fin_consultaOtD').value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}
	validarFechaA = function() {
		if (document.getElementById('filtro_fecha_inicio_consultaOtA').value.trim() != "" && document.getElementById('filtro_fecha_fin_consultaOtA').value.trim() != "") {
			var inicio = document.getElementById('filtro_fecha_inicio_consultaOtA').value.split('/');
			var fin = document.getElementById('filtro_fecha_fin_consultaOtA').value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}
	$scope.iniciarReporteOrdenes=function (){
		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: false
		});
		$('.datepicker').datepicker('update', new Date());
		
		
		reporteOrdenesTabla = $('#reporteOrdenesTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});
		reporteTecnicoTabla = $('#reporteTecnicoTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});
		reporteDespachoTabla = $('#reporteDespachoTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});
		reporteAuxiliarTabla = $('#reporteAuxiliarTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});
		reporteInspectorTabla = $('#reporteInspectorTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',

		});

		reporteSeguimientoTable = $('#reporteSeguimientoTable').DataTable({
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"info": false,
			"autoWidth": true,
			"language": idioma_espanol_not_font,
			"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
		});
		$scope.consultarCatalagosPI();
		
		
	}
	
	
	$scope.consultarReporteOrdenes=function(){
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		
		let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})
		
		let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
			.map(e => parseInt(e.id))
		let selectedElms = $('#jstree').jstree("get_selected", true);
		console.log(selectedElms)
		let estatusOrdenes = []
        angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
			estatusOrdenes.push(e.id); 
        })
        
        $.each(selectedElms, function () {
			clusters.push(this.id);
		});
		if (clusters.length == 0) {
			clusters = $scope.all_cluster;
		}
		
		if ($.trim(document.getElementById('idotO').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('idot').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de OT.</li>';
				isValido = false;
			}
		}

		if ($.trim(document.getElementById('cuentaO').value) !== '') {
			if (!($.isNumeric($.trim(document.getElementById('cuenta').value)))) {
				errorMensaje += '<li>Introduce un n&uacute;mero correcto de cuenta.</li>';
				isValido = false;
			}
		}

		if (estatusOrdenes.length === 0) {
			errorMensaje += '<li>Seleccione estatus.</li>';
			isValido = false
		}

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}
		
		if (document.getElementById('filtro_fecha_inicio_consultaOtO').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_consultaOtO').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFecha()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}
		
		if (isValido) {
			if (reporteOrdenesTabla) {
				reporteOrdenesTabla.destroy();
			}
			let params = {
				idOrden: $.trim(document.getElementById('idotO').value),
				folioSistema: $.trim(document.getElementById('idosO').value),
				claveCliente: $.trim(document.getElementById('cuentaO').value),
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOtO').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOtO').value),
				elementosPorPagina: 10
			}
			
			console.log(reporteOrdenesTabla.page.info())
	
			console.log(params);
			
			reporteOrdenesTabla = $('#reporteOrdenesTable').DataTable({
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
					"url": "req/consultaReporteOrdenes",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
			
		}else{
			mostrarMensajeWarningValidacion(errorMensaje);
		}
		
	}
	
	$scope.consultarReporteTecnico=function(){
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		
		let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})
		
		let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
			.map(e => parseInt(e.id))
		let selectedElms = $('#jstree').jstree("get_selected", true);
		console.log(selectedElms)
		let estatusOrdenes = []
        angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
			estatusOrdenes.push(e.id); 
        })
        
        $.each(selectedElms, function () {
			clusters.push(this.id);
		});
		if (clusters.length == 0) {
			clusters = $scope.all_cluster;
		}
		
		

		

		

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}
		
		if (document.getElementById('filtro_fecha_inicio_consultaOtT').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_consultaOtT').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFechaT()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}
		
		if (isValido) {
			if (reporteTecnicoTabla) {
				reporteTecnicoTabla.destroy();
			}
			let params = {
				idOrden: $.trim(document.getElementById('numEmp').value),
				folioSistema: $.trim(document.getElementById('jInm').value),
				claveCliente: '',
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOtT').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOtT').value),
				elementosPorPagina: 10
			}
			
			console.log(reporteTecnicoTabla.page.info())
	
			console.log(params);
			
			reporteTecnicoTabla = $('#reporteTecnicoTable').DataTable({
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
					"url": "req/consultaReporteTecnico",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
			
		}else{
			mostrarMensajeWarningValidacion(errorMensaje);
		}
		
	}
	
	$scope.consultarReporteCoord=function(){
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		
		let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})
		
		let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
			.map(e => parseInt(e.id))
		let selectedElms = $('#jstree').jstree("get_selected", true);
		console.log(selectedElms)
		let estatusOrdenes = []
        angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
			estatusOrdenes.push(e.id); 
        })
        
        $.each(selectedElms, function () {
			clusters.push(this.id);
		});
		if (clusters.length == 0) {
			clusters = $scope.all_cluster;
		}
		
		

		

		

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}
		
		if (document.getElementById('filtro_fecha_inicio_consultaOtD').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_consultaOtD').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFechaD()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}
		
		if (isValido) {
			if (reporteDespachoTabla) {
				reporteDespachoTabla.destroy();
			}
			let params = {
				idOrden: $.trim(document.getElementById('numEmpD').value),
				folioSistema: $.trim(document.getElementById('nCoord').value),
				claveCliente: '',
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOtD').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOtD').value),
				elementosPorPagina: 10
			}
			
			console.log(reporteDespachoTabla.page.info())
	
			console.log(params);
			
			reporteDespachoTabla = $('#reporteDespachoTable').DataTable({
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
					"url": "req/consultaReporteDespacho",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
			
		}else{
			mostrarMensajeWarningValidacion(errorMensaje);
		}
		
	}
	
	$scope.consultarReporteAux=function(){
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		
		let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})
		
		let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
			.map(e => parseInt(e.id))
		let selectedElms = $('#jstree').jstree("get_selected", true);
		console.log(selectedElms)
		let estatusOrdenes = []
        angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
			estatusOrdenes.push(e.id); 
        })
        
        $.each(selectedElms, function () {
			clusters.push(this.id);
		});
		if (clusters.length == 0) {
			clusters = $scope.all_cluster;
		}
		

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}
		
		if (document.getElementById('filtro_fecha_inicio_consultaOtA').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_consultaOtA').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFechaA()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}
		
		if (isValido) {
			if (reporteAuxiliarTabla) {
				reporteAuxiliarTabla.destroy();
			}
			let params = {
				idOrden: $.trim(document.getElementById('idoA').value),
				folioSistema: $.trim(document.getElementById('numEmpA').value),
				claveCliente: '',
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_consultaOtA').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_consultaOtA').value),
				elementosPorPagina: 10
			}
			
			console.log(reporteAuxiliarTabla.page.info())
	
			console.log(params);
			
			reporteAuxiliarTabla = $('#reporteAuxiliarTable').DataTable({
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
					"url": "req/consultaReporteAuxiliar",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
			
		}else{
			mostrarMensajeWarningValidacion(errorMensaje);
		}
		
	}

	$scope.consultarReporteInspector=function(){
		let isValido = true;
		let errorMensaje = '';
		let isValFecha = true;
		
		let subIntTemp = []
		angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
			e.children.filter(f => f.checkedOpcion).map((k) => { subIntTemp.push(k.id); return k; })
		})
		
		let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
		let clusters = $("#jstree-proton-3").jstree("get_selected", true)
			.filter(e => e.original.nivel == ultimonivel)
			.map(e => parseInt(e.id))
		let selectedElms = $('#jstree').jstree("get_selected", true);
		console.log(selectedElms)
		let estatusOrdenes = []
        angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
			estatusOrdenes.push(e.id); 
        })
        
        $.each(selectedElms, function () {
			clusters.push(this.id);
		});
		if (clusters.length == 0) {
			clusters = $scope.all_cluster;
		}
		

		if (subIntTemp.length === 0) {
			errorMensaje += '<li>Seleccione intervenci&oacute;n.</li>';
			isValido = false
		}

		if (clusters.length === 0) {
			errorMensaje += '<li>Seleccione geograf&iacute;a.</li>';
			isValido = false
		}
		
		if (document.getElementById('filtro_fecha_inicio_inspector').value == '') {
			errorMensaje += '<li>Introduce Fecha Inicial</li>';
			isValFecha = false;
			isValido = false
		}

		if (document.getElementById('filtro_fecha_fin_inspector').value == '') {
			errorMensaje += '<li>Introduce Fecha Final</li>';
			isValFecha = false;
			isValido = false
		}

		if (isValFecha) {
			if (!validarFechaA()) {
				$('.datepicker').datepicker('update', new Date());
				errorMensaje += '<li>La fecha inicial no tiene que ser mayor a la final.</li>';
				isValido = false
			}
		}
		
		if (isValido) {
			if (reporteInspectorTabla) {
				reporteInspectorTabla.destroy();
			}
			let params = {
				idOrden: $.trim(document.getElementById('otI').value),
				folioSistema: $.trim(document.getElementById('nEmpI').value),
				claveCliente: '',
				idSubTipoOrdenes: subIntTemp,
				idEstatus: estatusOrdenes,
				idClusters: clusters,
				fechaInicio: $scope.getFechaFormato(document.getElementById('filtro_fecha_inicio_inspector').value),
				fechaFin: $scope.getFechaFormato(document.getElementById('filtro_fecha_fin_inspector').value),
				elementosPorPagina: 10
			}
			
			console.log(reporteInspectorTabla.page.info())
	
			console.log(params);
			
			reporteInspectorTabla = $('#reporteInspectorTable').DataTable({
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
					"url": "req/consultarReporteInspector",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
			
		}else{
			mostrarMensajeWarningValidacion(errorMensaje);
		}
		
	}	

	$scope.consultarReporteDiario = function(){
        let mensaje = '<ul>';
        let isValid = true;
        let numerosOnly = /^[0-9]*$/i;
        $scope.resultReporteDiario = {};

        let statuscopy = [];
        if($scope.filtrosGeneral.estatusdisponibles){
            angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
                statuscopy.push(e.id); 
            })
        }
        
        let intervencioncopy= [];
        if($scope.filtrosGeneral.tipoOrdenes){
            angular.forEach($scope.filtrosGeneral.tipoOrdenes,(e,i)=>{
                intervencioncopy.push(e.id); 
            })
        }
        
        let paramsTemp = {};
        
        if(!statuscopy.length){
            mensaje += '<li>Introducir Estatus</li>';
            isValid = false;
        }
    
        if(!intervencioncopy.length){
            mensaje += '<li>Introducir Intervenci\u00F3n</li>';
            isValid = false;
        }

        if(!numerosOnly.test($("#idot-reporte").val())){
            mensaje += '<li>El campo OT debe ser n&uacute;merico</li>';
            isValid = false;
        }

        if($("#tipo_reporte").val() == "" || $("#tipo_reporte").val() == undefined){
            mensaje += '<li>Selecciona Tipo fecha</li>';
            isValid = false;
        } else {
            $scope.repDiario.fechaSeleccionada = $("#tipo_reporte").val()
        }

        if(!validarFecha('filtro_fecha_inicio_reporte','filtro_fecha_fin_reporte')){
            mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
            isValid = false;
        }

        if(!isValid){
            mensaje += '</ul>';
            mostrarMensajeWarningValidacion(mensaje);
            return false;
        }else{
            paramsTemp.fechaInicio = $scope.getFechaFormato($("#filtro_fecha_inicio_reporte").val());
            paramsTemp.fechaFin =  $scope.getFechaFormato($("#filtro_fecha_fin_reporte").val());
            paramsTemp.tipoIntervencion =  intervencioncopy;
            paramsTemp.estatusOt = statuscopy;
            paramsTemp.fechaSeleccionada =  $scope.repDiario.fechaSeleccionada;
            paramsTemp.elementosPorPagina = 10;
            paramsTemp.pagina = 1;
			console.log(paramsTemp);
            if($scope.repDiario.idOrden && $scope.repDiario.idOrden != ""){
                paramsTemp.idOrden =  $scope.repDiario.idOrden;
            }

            if($scope.repDiario.folio && $scope.repDiario.folio != ""){
                paramsTemp.folio =  $scope.repDiario.folio;
            }

            if($scope.repDiario.idCuenta && $scope.repDiario.idCuenta != ""){
                paramsTemp.idCuenta =  $scope.repDiario.idCuenta;
            }

            if(reporteSeguimientoTable){                              
                reporteSeguimientoTable.destroy() 
            }   
            reporteSeguimientoTable = $('#reporteSeguimientoTable').DataTable({
                "processing": false,
                "ordering": false,
                "serverSide": true,
                "scrollX": false,
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": false,
                "pageLength": 10,
                "info": false,
                "ajax": {
                    "url": "req/consultarReporteDiario",
                    "type": "POST",
                    "data": paramsTemp,
                    "beforeSend": function () {
                        if(!swal.isVisible() ){
                            swal({ text: 'Cargando registros...', allowOutsideClick: false });
                            swal.showLoading();
                        }
                        
                    },
                    "dataSrc": function (json) {
                        $scope.resultReporteDiario = json.registrosTotales
                        return json.data;
                    },
                    "error":function(xhr, error, thrown){
                        handleError(xhr)
                    }, 
                    "complete": function () {
                        swal.close()
                    }
                },
				
                "columns": [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                "language": idioma_espanol_not_font,
                "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">', 
                dom: 'Bfrtip', 
                buttons:  
                [{ 
                    extend: 'excelHtml5', 
                    title: 'Reporte Seguimiento Diario', 
                    text: 'Exportar Excel' 
                }],
            });

			if(!reporteSeguimientoTable){                              
                reporteSeguimientoTable = $('#reporteSeguimientoTable').DataTable({
					"paging": true,
					"lengthChange": false,
					"searching": false,
					"ordering": false,
					"pageLength": 10,
					"info": false,
					"autoWidth": true,
					"language": idioma_espanol_not_font,
					"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
				});
            }
        }
    }
    

	$scope.iniciarReporteOrdenes();  
	//$scope.initComponents();
	$("#li-reporte-navbar").addClass('active')

	angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
		$("#moduloReportesPI").addClass('active')
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
    });
	
	
	}]);