var app = angular.module('coordInstalacionesPIApp', []);
app.controller('coordInstPIController', ['$scope','$q','coordInstalacionesPIService' , function($scope, $q, coordInstalacionesPIService) {
let dtBusqGral;
let dtOs;
let dtCotSitoPlan;
$scope.initComponents=function(){
	console.log("Entra a inicializar elementos");					
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
}

//Muestra contenido completo
$("#btn_mostrar_nav").click(function(){
	console.log("Entra a mostrar")
	$(this).hide();
	$("#datos_tablas").attr('class','');
	$("#datos_tablas").addClass("col-sm-10");
	$("#navbar_reportes").show('fade');		
});

//Función para ocultar el nav de los selects
$("#ocultar_nav").click(function(){
	console.log("Entra a ocultar")
    $("#navbar_reportes").hide('fade');
	$('#btn_mostrar_nav').show();
	$("#datos_tablas").attr("class","");
	$("#datos_tablas").addClass("col-sm-12 col-md-12");
});
	
$("#navbar_reportes .elemento_link").click(function(){	
	$(".elemento_link ").removeClass("active");
	$(this).addClass('active');
	switch($(this).attr('id')){			
		case 'link-pendientes-asignar':
			/*if(!isPrimerConsultaPendeintesAsignar){
				consultarCuentasSalesforce()
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesactivar").hide()
			$("#container-calendarizado").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-agendamiento-pendientesasignar").show();
			break;				
		case 'link-rescataventas':
			/*if(!isPrimerConsultaRescataventas){
				consultarCuentasRescataventasSalesforce()
			}*/
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide()
			$("#container-calendarizado").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-agendamiento-rescataventas").show();
			break;				
		case 'link-pendientes-activar':	
		
			/*if(!isPrimerPendientesActivar){
				consultarCuentasActivarSalesforce()
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-calendarizado").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-agendamiento-pendientesactivar").show();
			break;
		case 'link-calendarizado':
			$scope.ajustarHeaderContent();
			/*if(!isPrimerCalendarizado){					
				if(isConsultarFiltrosCalendarizado){
					consultaCalendarizado()
				}else{
					consultarMotivoCalendarizado()
				}
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-calendarizado").show();
			break;
		case 'link-plazas-comerciales':
			$scope.ajustarHeaderContent();
			/*if(!isPrimerPlazasComerciales){
				if(isConsultarFiltrosPlazas){
					consultaPlazasComerciales()
				}else{
					consultarMotivoPlazaComer()
				}
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide();
			$("#container-calendarizado").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-plazas-comerciales").show()
			
			break;
		case 'link-canceladas':
			$scope.ajustarHeaderContent();
			/*if(!isPrimerCanceladas){
				if(isConsultaFiltrosCanzaladas){
					consultaInstalacionesCanceladas()
				}else{
					consultarMotivoCanceladas()
				}
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide();
			$("#container-calendarizado").hide();
			$("#container-plazas-comerciales").hide()
			$("#container-reagenda").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-canceladas").show()
			break;
			
		case 'link-reagenda':
			$scope.ajustarHeaderContent();
			/*if(!isPrimerReagenda){
				if(isConsultaFiltrosReagenda){
					consultaInstalacionesReagenda()
				}else{
					consultarMotivoReagenda()
				}
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-calendarizado").hide();
			$("#container-canceladas").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-reagenda").show()
			break;
		
		case 'link-calendarizado-vencido':
			$scope.ajustarHeaderContent();
			/*if(!isPrimerCalendarizadoVencido){					
				if(isConsultarFiltrosCalendarizadoVencido){
					consultaCalendarizadoVencido()
				}else{
					consultarMotivoCalendarizadoVencido()
				}
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-calendarizado").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-calendarizado_vencido").show()
			break;
			
		case 'link-bsq-general':

			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-calendarizado").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-bsq-general").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").hide()
			$("#container-bsq-general").show()
			break;
		
		case 'link-terminadas':
			$scope.ajustarHeaderContent();
			/*if(!isPrimerTerminadas){					
				consultaTerminadas()
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-calendarizado").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-bsq-general").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-detenidas").hide()
			$("#container-terminadas").show()
			break;
		
		case 'link-detenidas':
			ajustarHeaderContent()
			/*if(!isPrimerConsultaDetenidas){					
				consultaDetenidas()
			}*/
			$("#container-agendamiento-rescataventas").hide()
			$("#container-agendamiento-pendientesasignar").hide()
			$("#container-agendamiento-pendientesactivar").hide();
			$("#container-plazas-comerciales").hide();
			$("#container-calendarizado").hide();
			$("#container-canceladas").hide()
			$("#container-reagenda").hide()
			$("#container-bsq-general").hide()
			$("#container-calendarizado_vencido").hide()
			$("#container-bsq-general").hide()
			$("#container-terminadas").hide()
			$("#container-detenidas").show()
			break;
	}
});

$scope.ajustarHeaderContent=function(){
	$(".dataTable").parent().css("width","100%");
	$(".dataTable").css("width","100%")
}
//Pestaña busqueda general
$scope.consultaBusquedaGeneral=function(){
	$(".element-busqueda-title").addClass("disabledbutton");
	$("#input-element-bsq-general").keypress(function(e) {		
        var code = (e.keyCode ? e.keyCode : e.which);		
        if(code==13){
        	if($.trim($("#input-element-bsq-general").val()) === ''){
				mostrarMensajeWarningValidacion("Introduce Cuenta Factura, Os o bien CSP para obtener informaci\u00F3n");
			}else{
				$scope.realizarBusqGral();
			}
        }
	}); 	
}

$scope.realizarBusqGral=function(){
	if (dtBusqGral) {
		dtBusqGral.destroy();
	}
	if (dtOs) {
		dtOs.destroy();
	}
	if (dtCotSitoPlan) {
		dtCotSitoPlan.destroy();
	}
	let params={
		word:$.trim(document.getElementById('input-element-bsq-general').value),
		cuadrilla:'emp'
	}
	console.log(params);
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		coordInstalacionesPIService.consultaBusqGral(params).then(function success(response) {
			console.log(response);
			swal.close();
		}).catch(err => handleError(err));
}

$scope.inicializarDtBusqGral=function(){
	dtBusqGral = $('#table_info_bsq_general').DataTable({
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

	dtOs = $('#table_info_os_bsq_general').DataTable({
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

	dtCotSitoPlan = $('#table_info_csp_bsq_general').DataTable({
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

//Llamado a funciones
$scope.inicializarDtBusqGral();
$scope.consultaBusquedaGeneral();
$scope.initComponents();
$("#li-coordinador-navbar").addClass('active')

}]);