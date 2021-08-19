var app = angular.module('coordInstalacionesPIApp', []);

app.controller('coordInstPIController', ['$scope','$q','coordInstalacionesPIService' ,'genericService', function($scope, $q, coordInstalacionesPIService, genericService) {
let tempCuenta;
let is_consulta_comentarios = false;
let dtBusqGral;
let dtOs;
let dtCotSitoPlan;
let pendientesAgenda;
let rescataventas;
let pendientesActivar;
let calendarizado;
let plazasComerciales;
let canceladas;
let reagendadas;
let terminadas;
let detenidas;
let tablaOtsDetalle;
let calendarizadoV
let arrayCuentaFactura=[]
let arrayOS=[]
let arrayCSP=[];
var eventosDisponibilidad=[];
var geocoder;
var map;
var kmls_display=[];
let calendar_coordinador;
$scope.all_cluster = [];
$scope.filtrosGeneral = {};
//$scope.infoDetalleCuenta=datosCuenta;

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
$("#btn-accion-factibilidad").click(function(){
	$(this).hide()
	$("#calendar-agenda-content").hide()
	$("#mapa-agenda-content").show()
	$("#abrir-calendario").show()
});
$("#abrir-calendario").click(function(){
	$(this).hide()
	$("#mapa-agenda-content").hide()
	$("#calendar-agenda-content").show()
	$("#btn-accion-factibilidad").show()
});
$scope.initializateMap=function(){
		var latitud=parseInt($scope.infoDetalleCuenta.Latitud);
		var longitud=parseInt($scope.infoDetalleCuenta.Longitud);
		map = new google.maps.Map(document.getElementById("mapa-asignacion"), {
			center: { lat: latitud, lng: longitud},
			zoom: 12,
		  });
		  new google.maps.Marker({
			position: { lat: latitud, lng: longitud},
			map,
			title: "",
		  });

   

}

$scope.inicializarCalendario=function(){
	calendar_coordinador=document.getElementById('calendar_disponibilidad');
	$scope.calendarCoord=new FullCalendar.Calendar(calendar_coordinador,{
		
		height: 550,
		width: 550,
        initialView: 'dayGridMonth',
		themeSystem: 'bootstrap',
		locale: 'es',
		displayEventTime: true,
        selectable: true,
        eventLimit: true,
        editable: true,
        eventDurationEditable: false,
		eventAfterAllRender: function () {
			calendarCoord.render();
		}
       
        
      });
	  $("#message-success-agenda").hide();
		$("#message-error-agenda").hide();
	$scope.calendarCoord.render();
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

$("#contentCuentaFactura").click(function(){
	$(".contentInfoTableBsqGeneral").hide()
	$("#container-cuenta-factura-bsq-general").show()
	$(".element-busqueda-title").removeClass('active')
	$("#contentCuentaFactura").addClass('active')
	
})
$("#contentOS").click(function(){
	$(".contentInfoTableBsqGeneral").hide()
	$("#container-os-bsq-general").show()
	$(".element-busqueda-title").removeClass('active')
	$("#contentOS").addClass('active')
})
$("#contentCSP").click(function(){
	$(".contentInfoTableBsqGeneral").hide()
	$("#container-csp-bsq-general").show()
	$(".element-busqueda-title").removeClass('active')
	$("#contentCSP").addClass('active')
})

$("#navbar_info .itemGeneral").click(function(){
	$(".itemGeneral").removeClass("active");
	$(this).addClass('active');
	switch($(this).attr('id')){
		case 'detallado-cuenta':
			$("#container-sitio").hide();
			$("#container-info").hide();
			$("#container-historico").hide();
			$("#container-nota-general").hide();
			$("#container-servicios-cuenta").hide();
			$("#container-productos-cuenta").hide();
			$("#container-promociones-cuenta").hide();
			$("#container-detalle").show();
			break;
		case 'sitio-instalacion':
			$("#container-detalle").hide();
			$("#container-info").hide();
			$("#container-historico").hide();
			$("#container-nota-general").hide();
			$("#container-servicios-cuenta").hide();
			$("#container-productos-cuenta").hide();
			$("#container-promociones-cuenta").hide();
			$("#container-sitio").show();
			break;
		case 'nota-general':
			$("#container-detalle").hide();
			$("#container-info").hide();
			$("#container-historico").hide();
			$("#container-servicios-cuenta").hide();
			$("#container-productos-cuenta").hide();
			$("#container-promociones-cuenta").hide();
			$("#container-sitio").hide();
			$("#container-nota-general").show();
			break;
		case 'servicios-cuenta':
			$("#container-detalle").hide();
			$("#container-info").hide();
			$("#container-historico").hide();
			$("#container-productos-cuenta").hide();
			$("#container-promociones-cuenta").hide();
			$("#container-sitio").hide();
			$("#container-nota-general").hide();
			$("#container-servicios-cuenta").show();
			break;
		case 'productos-cuenta':
			$("#container-detalle").hide();
			$("#container-info").hide();
			$("#container-historico").hide();
			$("#container-promociones-cuenta").hide();
			$("#container-sitio").hide();
			$("#container-nota-general").hide();
			$("#container-servicios-cuenta").hide();
			$("#container-productos-cuenta").show();
			break;
		case 'promociones-cuenta':
			$("#container-detalle").hide();
			$("#container-info").hide();
			$("#container-historico").hide();
			$("#container-sitio").hide();
			$("#container-nota-general").hide();
			$("#container-servicios-cuenta").hide();
			$("#container-productos-cuenta").hide();
			$("#container-promociones-cuenta").show();
			break;
		case 'info-ot-bandeja':
			$("#container-detalle").hide();
			$("#container-historico").hide();
			$("#container-sitio").hide();
			$("#container-nota-general").hide();
			$("#container-servicios-cuenta").hide();
			$("#container-productos-cuenta").hide();
			$("#container-promociones-cuenta").hide();
			$("#container-info").show();
			break;
		case 'historico-bandeja':
			$("#container-detalle").hide();
			$("#container-sitio").hide();
			$("#container-nota-general").hide();
			$("#container-servicios-cuenta").hide();
			$("#container-productos-cuenta").hide();
			$("#container-promociones-cuenta").hide();
			$("#container-info").hide();
			$("#container-historico").show();
			break;
	}
})

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
			$("#info-ot-bandeja").hide();
			$("#historico-bandeja").hide();
			$("#detallado-cuenta").show();
			$("#sitio-instalacion").show();
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
			$("#info-ot-bandeja").hide();
			$("#historico-bandeja").hide();
			$("#detallado-cuenta").show();
			$("#sitio-instalacion").show();
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
			$("#info-ot-bandeja").hide();
			$("#historico-bandeja").hide();
			$("#detallado-cuenta").show();
			$("#sitio-instalacion").show();
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
			$("#info-ot-bandeja").hide();
			$("#historico-bandeja").hide();
			$("#detallado-cuenta").show();
			$("#sitio-instalacion").show();
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
			$("#info-ot-bandeja").show();
			$("#historico-bandeja").show();
			$("#detallado-cuenta").hide();
			$("#sitio-instalacion").hide();
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
			$("#info-ot-bandeja").show();
			$("#historico-bandeja").show();
			$("#detallado-cuenta").hide();
			$("#sitio-instalacion").hide();
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
			$("#info-ot-bandeja").show();
			$("#historico-bandeja").show();
			$("#detallado-cuenta").hide();
			$("#sitio-instalacion").hide();
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
			$("#info-ot-bandeja").show();
			$("#historico-bandeja").show();
			$("#detallado-cuenta").hide();
			$("#sitio-instalacion").hide();
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
			$("#info-ot-bandeja").show();
			$("#historico-bandeja").show();
			$("#detallado-cuenta").hide();
			$("#sitio-instalacion").hide();
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
			$("#info-ot-bandeja").show();
			$("#historico-bandeja").show();
			$("#detallado-cuenta").hide();
			$("#sitio-instalacion").hide();
			$("#container-terminadas").show()
			break;
		
		case 'link-detenidas':
			$scope.ajustarHeaderContent();
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
			$("#info-ot-bandeja").show();
			$("#historico-bandeja").show();
			$("#detallado-cuenta").hide();
			$("#sitio-instalacion").hide();
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
	if(dtBusqGral)
		dtBusqGral.destroy();
	if(dtCotSitoPlan)
		dtCotSitoPlan.destroy();	
	if(dtOs)
		dtOs.destroy();
	$("#table_info_bsq_general tbody").empty();
    $("#table_info_os_bsq_general tbody").empty();
    $("#table_info_csp_bsq_general tbody").empty();
	var tableHtml="";
    var tableHtmlOS ="";   
    var tableHtmlCSP="";

	let params={
		word:$.trim(document.getElementById('input-element-bsq-general').value),
		cuadrilla:'emp'
	}
		console.log(params);
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		
	//	coordInstalacionesPIService.consultaBusqGral(params).then(function success(response) {
			console.log(jsonBusqGral.resultContent);
			$.each(jsonBusqGral.resultContent,function(index,elemento){  
				if(elemento.fecha && elemento.fecha.trim() !== 'sin fecha'){
					let splitfecha=elemento.fecha.split("-")
					elemento.fecha=splitfecha[2]+"/"+splitfecha[1]+"/"+splitfecha[0];
				}
				if(elemento.id_cf != 0 && elemento.id_cf != '0' && elemento.id_cf != undefined){
					arrayCuentaFactura.push(elemento)
					$("#totalCuentaFactura").html(arrayCuentaFactura.length)
				}else{
					$("#totalCuentaFactura").html('0')
				}
				
				if(elemento.id_os != 0 && elemento.id_os != '0' && elemento.id_os != undefined){
					arrayOS.push(elemento)
					$("#totalOs").html(arrayOS.length)
				}else{
					$("#totalOs").html('0')
				}

				if(elemento.id_csp != 0 && elemento.id_csp != '0' && elemento.id_csp != undefined){
					arrayCSP.push(elemento)
					$("#totalCSP").html(arrayCSP.length)
				}else{
					$("#totalCSP").html('0')
				}
			});	
			
			$.each(arrayCuentaFactura,function(indexCF, cf){
				let name_os=(cf.name_os === undefined || cf.name_os === 'null' || cf.name_os ===null || cf.name_os ) ? '' : cf.name_os;						
				let htmlFactura =''
				if(name_os!=undefined){
					htmlFactura= '<div style="margin-rigth:1em" class="tooltip-btn">'+
						'<span class="tooltiptext-btn">Detalle OS  </span>'+
						'<span tag-estatusos="'+cf.status_os+'" tag_csp='+cf.name_csp+'  tag-tipo="cf" tag-index="'+indexCF+'" class="abrirModalDetalleOTBsqGeneral icono-accion icono-asigancion fa fa-fw fa-tasks"></span>'+
					'</div>';
				}else{
					htmlFactura='<div style="margin-rigth:1em" class="tooltip-btn">'+
						'<span class="tooltiptext-btn">Ir a pendientes  </span>'+
						'<span tag_csp='+cf.name_csp+'  class="abrirPendientes icono-accion icono-asigancion fa fa-fw fa-arrow-circle-right irpendientes"></span>'+
					'</div>';
				}
				tableHtml='<tr>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(cf.name_cf)+'</td>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(cf.id_brm_cf)+'</td>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(cf.ciudadI_cf)+'</td>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(cf.distritoI_cf)+'</td>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(cf.clusterI_cf)+'</td>'+
							'<td style="white-space:nowrap;">'+
							'  '+htmlFactura+' '	+
							'</td>'+						
						'</tr>';                   
				$("#table_info_bsq_general tbody").append( tableHtml );   

			});
			$.each(arrayOS, function(indexOS,os){
				let name_os=(os.name_os === undefined || os.name_os === 'null' || os.name_os ===null || os.name_os ) ? '' : os.name_os;
				let htmlOS=''
				if(name_os!=undefined){
					htmlOS= 	'<div style="margin-rigth:1em" class="tooltip-btn">'+
						'<span class="tooltiptext-btn">Detalle OS  </span>'+
						'<span tag-estatusos="'+os.status_os+'" tag_csp='+os.name_csp+' tag-tipo="os" tag-index="'+indexOS+'"  class="abrirModalDetalleOTBsqGeneral icono-accion icono-asigancion fa fa-fw fa-tasks"></span>'+
					'</div>';
				}else{
					htmlOS= '<div style="margin-rigth:1em" class="tooltip-btn">'+
						'<span class="tooltiptext-btn">Ir a pendientes  </span>'+
						'<span tag_csp='+os.name_csp+'  class="abrirPendientes icono-accion icono-asigancion fa fa-fw fa-arrow-circle-right irpendientes"></span>'+
					'</div>';
				}
				tableHtmlOS='<tr>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(os.name_os)+'</td>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(os.status_os)+'</td>	'+	
							'<td style="white-space:nowrap;">'+
							'  '+htmlOS+' '	+
							'</td>'+						
				'</tr>';                   
				$("#table_info_os_bsq_general tbody").append( tableHtmlOS );   
			});
			$.each(arrayCSP,function(indexCSP,csp){
				let name_os=(csp.name_os === undefined || csp.name_os === 'null' || csp.name_os ===null || csp.name_os ) ? '' : csp.name_os;
				let htmlCSP=''
				if(name_os!=undefined){
					htmlCSP='<div style="margin-rigth:1em" class="tooltip-btn">'+
								'<span class="tooltiptext-btn">Detalle OS  </span>'+
								'<span tag-estatusos="'+csp.status_os+'" tag_csp='+csp.name_csp+' tag-tipo="csp" tag-index="'+indexCSP+'"  class="abrirModalDetalleOTBsqGeneral icono-accion icono-asigancion fa fa-fw fa-tasks"></span>'+
							'</div>';
				}else{
					htmlCSP='<div style="margin-rigth:1em" class="tooltip-btn">'+
						'<span class="tooltiptext-btn">Ir a pendientes  </span>'+
						'<span tag_csp='+csp.name_csp+'  class="abrirPendientes icono-accion icono-asigancion fa fa-fw fa-arrow-circle-right irpendientes"></span>'+
					'</div>';
				}
				tableHtmlCSP='<tr>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(csp.name_csp)+'</td>'+
							'<td style="white-space:nowrap;">'+validarCamposUndefined(csp.nombrePlan_csp)+'</td>'+
							'<td style="white-space:nowrap;">'+
							'  '+htmlCSP+' '	+
							'</td>'+						
						'</tr>';                   
				$("#table_info_csp_bsq_general tbody").append( tableHtmlCSP );   
			});
			$("#container_no_results").hide();
			$("#contentCuentaFactura").trigger('click');
			$(".element-busqueda-title").removeClass("disabledbutton");
			$scope.inicializarDtBusqGral();
			console.log(arrayCuentaFactura);
			swal.close();
		//}).catch(err => handleError(err));
}
function validarCamposUndefined(variable){
	return (variable === undefined || variable === 'null' ||  variable === null ) ? "SIN INFORMACI\u00D3N " : variable;
}
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
	    console.log("entra de cualquier manera",results)
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
						console.log("######")
						console.log(results[0].data.result)
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
$scope.inicializaReportes=function(){
	pendientesAgenda = $('#table_coordinador_inst').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});
	rescataventas = $('#table-rescataventas').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});
	pendientesActivar=$('#tables-pendientes-activar').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});
	calendarizado=$('#tables-calendarizado').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});
	plazasComerciales=$('#tables-plazas-comer').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});
	canceladas=$('#tables-canceladas').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});
	reagendadas=$('#tables-reagenda').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});
	terminadas=$('#tables-terminadas').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font
	});
	detenidas=$('#tables-detenidas').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font
	});

}
$scope.inicializarDtBusqGral=function(data){
	
	dtBusqGral = $('#table_info_bsq_general').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": true,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});

	dtOs = $('#table_info_os_bsq_general').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});

	dtCotSitoPlan = $('#table_info_csp_bsq_general').DataTable({
		"paging": true,
		"lengthChange": false,
		"searching": false,
		"ordering": false,
		"pageLength": 10,
		"info": false,
		"autoWidth": true,
		"language": idioma_espanol_not_font

	});
	
}
$scope.getFechaFormato = function (fecha) {
	let fechaPrueba = fecha.split('/');
	return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
}
//Pendientes por agendas
$scope.obtenerPendientesAgenda=function(){

	if(pendientesAgenda){
		pendientesAgenda.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_coord_insta').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_coord_insta').value),
		elementosPorPagina: 10
	}	
	pendientesAgenda=$('#table_coordinador_inst').DataTable({
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
			"url": "req/consultaPendienteAgenda",
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
		"columns": [null, null, null, null, null, null, null, null,null,null],
		"language": idioma_espanol_not_font
	});
		
}
//Rescataventas
$scope.obtenerRescataventas=function(){

if(rescataventas){
	rescataventas.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_coord_rescataventas').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_coord_rescataventas').value),
		elementosPorPagina: 10
	}	
	rescataventas=$('#table-rescataventas').DataTable({
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
			"url": "req/consultaRescataventas",
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
		"columns": [null, null, null, null, null, null, null, null,null,null],
		"language": idioma_espanol_not_font
	});
		
}
//Pendientes activar
$scope.obtenerPendientesActivar=function(){

	if(pendientesActivar){
		pendientesActivar.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_coord_poractivar').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_coord_poractivar').value),
		elementosPorPagina: 10
	}	
	pendientesActivar=$('#tables-pendientes-activar').DataTable({
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
			"url": "req/consultaPendientesActivar",
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
		"columns": [null, null, null, null, null, null, null, null,null,null],
		"language": idioma_espanol_not_font
	});
		
}
//Calendarizado
$scope.obtenerCalendarizado=function(){

	if(calendarizado){
		calendarizado.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_calendarizado').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_calendarizado').value),
		elementosPorPagina: 10
	}	
	calendarizado=$('#tables-calendarizado').DataTable({
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
			"url": "req/consultaCalendarizado",
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
		"columns": [null, null, null, null, null, null, null, null,null,null,null],
		"language": idioma_espanol_not_font
	});
		
}

//Plazas comerciales
$scope.obtenerPlazasComerciales=function(){

	if(plazasComerciales){
		plazasComerciales.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_plazas_comer').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_plazas_comer').value),
		elementosPorPagina: 10
	}	
	plazasComerciales=$('#tables-plazas-comer').DataTable({
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
			"url": "req/consultaPlazasComerciales",
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
		"columns": [null, null, null, null, null, null, null, null,null,null,null],
		"language": idioma_espanol_not_font
	});
		
}

//Canceladas
$scope.obtenerCanceladas=function(){

	if(canceladas){
		canceladas.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_canceladas').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_canceladas').value),
		elementosPorPagina: 10
	}	
	canceladas=$('#tables-canceladas').DataTable({
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
			"url": "req/consultaCanceladas",
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
		"columns": [null, null, null, null, null, null, null, null,null,null,null],
		"language": idioma_espanol_not_font
	});
		
}

//Reagendadas
$scope.obtenerReagendada=function(){

	if(reagendadas){
		reagendadas.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_reagenda').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_reagenda').value),
		elementosPorPagina: 10
	}	
	reagendadas=$('#tables-reagenda').DataTable({
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
			"url": "req/consultaReagendadas",
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
		"columns": [null, null, null, null, null, null, null, null,null,null,null],
		"language": idioma_espanol_not_font
	});
		
}

//Terminadas
$scope.obtenerTerminada=function(){

	if(terminadas){
		terminadas.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_terminadas').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_terminadas').value),
		elementosPorPagina: 10
	}	
	terminadas=$('#tables-terminadas').DataTable({
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
			"url": "req/consultaTerminadas",
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
		"columns": [null, null, null, null, null, null, null, null,null,null,null],
		"language": idioma_espanol_not_font
	});
		
}
//Detenidas
$scope.obtenerDetenidas=function(){

	if(detenidas){
		detenidas.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: $scope.getFechaFormato(document.getElementById('fecha_inicio_detenidas').value),
		fechaFin: $scope.getFechaFormato(document.getElementById('fecha_fin_detenidas').value),
		elementosPorPagina: 10
	}	
	detenidas=$('#tables-detenidas').DataTable({
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
			"url": "req/consultaDetenidas",
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
		"columns": [null, null, null, null, null, null, null, null,null,null,null],
		"language": idioma_espanol_not_font
	});
		
}

//Calendarizado vencido
$scope.obtenerCalendarizadoV=function(){

	if(calendarizadoV){
		calendarizadoV.destroy();
	}
	let params = {
		idOrden: '',
		folioSistema: '',
		claveCliente: '',
		idSubTipoOrdenes: [100],
		idEstatus: [1],
		idClusters: [3738],
		fechaInicio: "2021-08-02",
		fechaFin: "2021-08-06",
		elementosPorPagina: 10
	}	
	calendarizadoV=$('#tables-calendarizado-vencido').DataTable({
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
			"url": "req/consultaCalendarizadoVencido",
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
		"columns": [null, null, null, null, null, null, null, null,null,null,null],
		"language": idioma_espanol_not_font
	});
		
}
$scope.inicializarDetalleCuenta=function(){
	$scope.infoDetalleCuenta=datosCuenta;
}
$scope.inicializarInfoSitio=function(){
	$scope.infoSitio=sitio.result.Cuentas;
}

$scope.inicializarHistorico=function(){
	$scope.historico=historicoData.result.Movimientos;
	console.log($scope.historico);
}
$scope.inicializarInfoOt=function(){
	$scope.informacionDataOt=informacionOt;
	console.log($scope.informacionDataOt.OT);
}

$("#cerrar-agendamiento").click(function(){
	$('#bodyGral').show();
	$('#agendamiento').hide();
})
consultarAgendamientoFunction=function(){
	$('#bodyGral').hide();
	$('#agendamiento').show();
}
consultarDetalleFunction=function(){
	$scope.infoDetalleCuenta={};
	$scope.infoSitio={};
	$scope.historico={};
	$scope.informacionDataOt={};
	$scope.inicializarDetalleCuenta();
	$scope.inicializarInfoSitio();
	$scope.inicializarInfoOt();
	$scope.inicializarHistorico();
	var headerDetalle='';
	var bodyDetalle='';
	var bodySitio='';
	var bodyHistorico='';
	headerDetalle=''+
				'<h5 class="modal-title" id="exampleModalLabel">Cliente: <span style="margin-right: 3em; font-size:0.7em" id="cliente-detalle-modal">'+$scope.infoDetalleCuenta.Cuenta+'</span>  Cuenta:  <span style="margin-right: 2em; font-size:0.7em" id="cuenta-detalle-modal">'+$scope.infoDetalleCuenta.Num_cuenta_factura+'</span> </h5>';
	$('#headerDt').empty().append(headerDetalle);
	bodyDetalle=''+'<div class="row">'+
					'<div class="col-md-6">'+
						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Calle: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Calle+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Numero interior: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.NumInterior+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Municipio: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Municipio+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Ciudad Inst.: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Ciudad+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Latitud: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Latitud+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Region: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Region+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Distrito: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Distrito+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Entre calles: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Direccion+'</span> </div>'+
						
					'</div>'+
					'<div class="col-md-6">'+
						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Numero exterior: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.NumExterior+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Colonia: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Colonia+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Estado: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Estado+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">CP: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.CP+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Longitud: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Longitud+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Ciudad: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Ciudad+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cluster: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Cluster+'</span> </div>'+

						'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Referencias: </span></div>'+
						'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoDetalleCuenta.Direccion+'</span> </div>'+
						
					'</div>'+
				'</div>';
				$('#container-detalle').empty().append(bodyDetalle);
			
				bodySitio=''+'<div class="row">'+
									'<div class="col-md-6">'+
										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Número de cuenta: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoSitio[0].Numero_cuenta+'</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Nombre de cuenta: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoSitio[0].Nombre_cuenta+'</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Telefono prin.: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">SIN INFO</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Industria: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">SIN INFO</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">RFC: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoSitio[0].RFC+'</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Plazo: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoSitio[0].Plazo+'</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Responsable: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoSitio[0].ResponsableCuentaComercial+'</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo de moneda: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">SIN INFO</span> </div>'+
								'</div>'+
								'<div class="col-md-6">'+
										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Contacto Principal: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">SIN INFO</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Celular: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">SIN INFO</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Email: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">SIN INFO</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo persona: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoSitio[0].TipoPersona+'</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Segmento: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoSitio[0].SegmentoFacturacion+'</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo pago: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">SIN INFO</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Fecha venc.: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">SIN INFO</span> </div>'+

										'<div class="container-text-title-detalle"><span class="text-tile-vehiculo">Método de pago: </span></div>'+
										'<div class="container-text-content-detalle"><span class="text-content-vehiculo">'+$scope.infoSitio[0].Metodo_Pago+'</span> </div>'+
								'</div>'+
							 '</div>';
	$('#container-sitio').empty().append(bodySitio);
	$scope.historico.Trackin.map(function(e){
		e.imagen=''
		return e;
	})
	var img_sta='';
	$.each($scope.historico.Trackin, function(index, hist){
		switch(parseInt(hist.Id_Estatus)){
			case 1:
					img_sta= "fa fa-pause-circle pend";
				break;
			case 2:
					img_sta= "fa fa-arrow-circle-right asig";
				break;
			case 3:
					img_sta= "fa fa-hand-paper-o deten";
				break;
			case 4:
					img_sta= "fa fa-check-circle term";
				break;
			case 5:
					img_sta= "fa fa-times-circle cancel";
				break;
			}
			hist.imagen=img_sta;
			
			
	});
	console.log("Historico_c",$scope.historico);
	$("#detalleCuenta").modal('show');
}
/*$(document.body).on('click','.abrir-modal-detail',function(e){
	
	$scope.infoDetalleCuenta=datosCuenta;
	console.log("p",$scope.infoDetalleCuenta);
	$("#detalleCuenta").modal('show');
});*/

$(document.body).on('click','.abrir-modal-chat',function(e){
	$("#modalOTChat").modal('show');
	if (!is_consulta_comentarios) {
		result=comentarios;
		if(result.success){
			var content_chat='';
			console.log(result.result.Comentario);
			$.each(result.result.Comentario, function(index, valor){
				if(valor.Origen == "FFM APP"){
					content_chat+=''+
					'<div class="row">'+
					'	<div class="col-7 offset-md-3 comentario_movil">'+
					'		<b class="autor_comentario" style="margin-top: 0.4em"> '+valor.Origen + ' - '+valor.NombreCompleto + ' </b>'+
					'		<span > '+valor.FechaComentario+'</span>'+
					'		<hr style="margin-top: 0em; border-top: 1px solid #cdcdd6; !important" /> '+valor.Comentario+' '+
					'	</div>'+
					'	<div class="col-1">'+
					'		<img class="imagen_chat" alt="web" src="./resources/img/generic/android.png" style="width: 40px; height: 40px;">'+
					'	</div>'+
					'</div>'+
					'<div class="col-12"><br></div>';
				}else{
					content_chat+=''+
					'<div class="row">'+
					'	<div class="col-1 icono_chat">'+
					'		<img class="imagen_chat" alt="web" src="./resources/img/generic/web.png" style="width: 40px; height: 40px;">'+
					'	</div>'+
					'	<div class="col-7 comentario_web">'+
					'		<b  class="autor_comentario" style="margin-top: 0.4em"> '+valor.Origen + ' - '+valor.NombreCompleto + ' </b>'+
					'		<span>'+valor.FechaComentario+'</span>'+
					'		<hr style="margin-top: 0em; border-top: 1px solid #cdcdd6; !important" />  '+valor.Comentario+' '+
					'	</div>'+
					'	<div class="col-2 text-left"></div>'+
					'</div>'+
					'<div class="col-12"><br></div>';
				}
				$('#content-chat-ot').empty().append(content_chat);
				
				is_consulta_comentarios=true;
			})
		}
	}
});


$(document.body).on('click','.abrirModalDetalleOTBsqGeneral',function(e){
	tagtipo=$(this).attr('tag-tipo');
	tagindex=Number($(this).attr('tag-index'));
	
	switch(tagtipo){
		case 'os':
			elementoSeleccionado=arrayOS[tagindex]	
			
			break;
		case 'csp':
			elementoSeleccionado=arrayCSP[tagindex]
			
			break;
		case 'cf':
			elementoSeleccionado=arrayCuentaFactura[tagindex]
			
			break;
	}
	arrayOtsDetalle=[]
	    var idaux=  elementoSeleccionado.id_os;
		var id_os = elementoSeleccionado.name_os;
		
		console.log("idaux", idaux);
		console.log("idos",id_os);
		if(idaux === '' || idaux === null || idaux === undefined || idaux=='null' || idaux=='0'	){
			console.log("Entra al if")
			mostrarMensajeErrorAlert("No cuenta con OS el registro");
			//consultarCuentasSalesforce(elementoSeleccionado.name_csp)

		}else{
			let stringcontent='';
			
			let params = {
				name_os: id_os
		}
			//swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
			//swal.showLoading();
			coordInstalacionesPIService.consultaOtBusqGral(params).then(function success(response) {
				if(response.data.respuesta){
					console.log(response.data);
		angular.forEach(response.data.result.resultContent,function(elem,index){
			stringcontent+=`
							<tr><td>
								<div class="container">
									<div class="info_ot_detail row ">
										<div class="col-12">
											<b class="title_span title_info_ot"> OT:</b> &nbsp; &nbsp;
											<span id="detalle_os_ot" class="content_info_ot"> ${validarCamposUndefined(elem.idOt)}</span>	
										</div>
										<div class="col-12">
											<b class="title_span title_info_ot"> Status</b> &nbsp; &nbsp;
											<span id="detalle_os_id_status" class="content_info_ot">${validarCamposUndefined(elem.status)}</span>
										</div>
									</div>
									<div class="info_ot_detail row ">
										<div class="col-12">
											<b class="title_span title_info_ot"> Estado:</b> &nbsp; &nbsp;
											<span id="detalle_os_estado" class="content_info_ot"> ${validarCamposUndefined(elem.estado)}</span>	
										</div>
										<div class="col-12">
											<b class="title_span title_info_ot"> Motivo:</b> 
											<span id="detalle_os_motivo" class="content_info_ot"> ${validarCamposUndefined(elem.motivo)}</span>
										</div>
									</div>
									<div class="info_ot_detail row ">
										<div class="col-12">
											<b class="title_span title_info_ot"> Operario:</b> &nbsp; &nbsp;
											<span id="detalle_os_nom_operario" class="content_info_ot"> ${validarCamposUndefined(elem.nombreOperario)}</span>	
										</div>
										<div class="col-12">
											<b class="title_span title_info_ot"> &Uacute;ltimo operario:</b> &nbsp; &nbsp;
											<span id="detalle_os_ultimo_operario" class="content_info_ot"> ${validarCamposUndefined(elem.nombreUltimoOperario)}</span>
										</div>
									</div>
									<div class="info_ot_detail row ">
										<div class="col-12">
											<b class="title_span title_info_ot"> Fecha Inicio:</b> &nbsp; &nbsp;
											<span id="detalle_os_fecha_inicio" class="content_info_ot"> ${validarCamposUndefined(elem.fechaAgendamiento)}</span>	
										</div>
										<div class="col-12">
											<b class="title_span title_info_ot"> Fecha agendamiento:</b> &nbsp; &nbsp;
											<span id="detalle_os_fecha_agendamiento" class="content_info_ot"> ${validarCamposUndefined(elem.fechaAgendamiento)}</span>	
										</div>
									</div>
									<div class="info_ot_detail row ">
										<div class="col-12">
											<b class="title_span title_info_ot"> Fecha actualizaci&oacute;n:</b> &nbsp; &nbsp;
											<span id="detalle_os_fecha_actualizacion" class="ota-paquete">${validarCamposUndefined(elem.fechaActualizacion)}</span>	
										</div>
										<div class="col-12">
											<b class="title_span title_info_ot"> Fecha final:</b> &nbsp; &nbsp;
											<span id="detalle_os_fecha_final" class="content_info_ot">${validarCamposUndefined(elem.fechaFinalizada)}</span>	
										</div>
									</div>
									<div class="info_ot_detail row ">
										<div class="col-12">
											<a tag-index="${index}" class="link-bandeja-ir-tes"> Ir a bandeja</a> 
										</div>
									</div>
								</div>
							</tr></td>
		`;
					});
					//console.log(stringcontent);
					if (tablaOtsDetalle) {
						tablaOtsDetalle.destroy();
					}
					$("#tableOtsDetalle tbody").empty();
					$("#tableOtsDetalle tbody").append(stringcontent);
					tablaOtsDetalle=$('#tableOtsDetalle').DataTable({
						"processing" : true,
						"ordering" : false,
						"pageLength" : 1,
						"bInfo" : false,
						"bFilter" : true,
						"bAutoWidth" : false,
						"columnDefs" : [ {
							"width" : "3%",
							"targets" : 0
						} ],
						"dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
						"language" : espanol_corte,
						"columns" : [ null ],
						"lengthChange": false
					});
					
					
				}
					
			}).catch(err => handleError(err));			
				
			$("#info_orde_bsq_general").modal('show');
		}
});

$scope.abrirModal=function(){
	
	
}

$scope.consultarCuentasSalesforce=function(textoBuscador){
	
}


//Llamado a funciones
$scope.consultarCatalagosPI();
$scope.inicializarDtBusqGral();
$scope.obtenerCalendarizadoV();
$scope.inicializaReportes();
$scope.consultaBusquedaGeneral();
$scope.inicializarDetalleCuenta();
$scope.inicializarInfoSitio();
$scope.initComponents();
$scope.inicializarCalendario();
$scope.initializateMap();
$scope.inicializarHistorico();
$scope.inicializarInfoOt();
$("#li-coordinador-navbar").addClass('active')

}]);