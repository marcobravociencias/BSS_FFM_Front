var app = angular.module('tercerosGenericApp', []);
app.controller('tercerosGenericController', ['$scope', '$q', '$filter', function ($scope, $q, $filter) {
	$("#moduloTercerosGeneric").addClass('active');
	$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
	
	let jsonIntervenciones = [{"id":65,"nombre":"ADDON","nivel":1,"idPadre":null,"asignacionAutomatica":null,"horasConfirmacion":null},{"id":48,"nombre":"INSTALACION","nivel":1,"idPadre":null,"asignacionAutomatica":null,"horasConfirmacion":null},{"id":68,"nombre":"RECOLECCION","nivel":1,"idPadre":null,"asignacionAutomatica":null,"horasConfirmacion":null},{"id":55,"nombre":"SOPORTE","nivel":1,"idPadre":null,"asignacionAutomatica":null,"horasConfirmacion":null},{"id":120,"nombre":"ADICIONAL","nivel":2,"idPadre":65,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":121,"nombre":"CAMBIO DE DOMICILIO HUAWEI","nivel":2,"idPadre":65,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":122,"nombre":"CAMBIO DE DOMICILIO ZTE","nivel":2,"idPadre":65,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":123,"nombre":"CAMBIO DE EQUIPO VSB","nivel":2,"idPadre":65,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":124,"nombre":"CAMBIO DE PLAN INS VSB","nivel":2,"idPadre":65,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":125,"nombre":"CAMBIO DE PLAN REC VSB","nivel":2,"idPadre":65,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":102,"nombre":"DISTRIBUIDOR","nivel":2,"idPadre":48,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":104,"nombre":"HOGAR SEGURO","nivel":2,"idPadre":48,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":106,"nombre":"INSTALACION HUAWEI","nivel":2,"idPadre":48,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":105,"nombre":"INSTALACION NUEVA","nivel":2,"idPadre":48,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":107,"nombre":"INSTALACION ZTE","nivel":2,"idPadre":48,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":115,"nombre":"PROFECO","nivel":2,"idPadre":55,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":101,"nombre":"RECOLECCION EQUIPOS","nivel":2,"idPadre":68,"asignacionAutomatica":0,"horasConfirmacion":24},{"id":116,"nombre":"SOPORTE CON POTENCIA HUAWEI","nivel":2,"idPadre":55,"asignacionAutomatica":0,"horasConfirmacion":24}];
	let jsonOtsPendientes = [{"ciudad": "VILLAHERMOSA","clust": "SIN CLUSTER","cluster": "SIN CLUSTER","des_intervencion": "INFRAESTRUCTURA PMP","des_sub_intervencion": "NO HAY LINEA DE VISTA FRANCA PMP","des_subintervencion": "NO HAY LINEA DE VISTA FRANCA PMP","distrito": "VILLAHERMOSA","horas_incidencia": "#dc1c1c","horas_retraso": "#dc1c1c","id_intervencion": "165","id_ot": "1085796","id_sub_intervencion": "168","latitud": "18.4270318","longitud": "-93.1901305","primerNivel": "INFRAESTRUCTURA PMP","primer_nivel": "INFRAESTRUCTURA PMP","region": "VILLAHERMOSA","segundoNivel": "NO HAY LINEA DE VISTA FRANCA PMP","segundonivel": "NO HAY LINEA DE VISTA FRANCA PMP","zona": "SIN ZONA"},{"ciudad": "ZACATECAS","clust": "SIN CLUSTER","cluster": "SIN CLUSTER","des_intervencion": "INFRAESTRUCTURA PMP","des_sub_intervencion": "ANCHO DE BANDA INSUFICIENTE PMP","des_subintervencion": "ANCHO DE BANDA INSUFICIENTE PMP","distrito": "ZACATECAS","horas_incidencia": "#dc1c1c","horas_retraso": "#dc1c1c","id_intervencion": "165","id_ot": "1098389","id_sub_intervencion": "210","latitud": "22.9541482","longitud": "-102.702738","primerNivel": "INFRAESTRUCTURA PMP","primer_nivel": "INFRAESTRUCTURA PMP","region": "BAJIO","segundoNivel": "ANCHO DE BANDA INSUFICIENTE PMP","segundonivel": "ANCHO DE BANDA INSUFICIENTE PMP","zona": "SIN ZONA"},{"ciudad": "ZACATECAS","clust": "SIN CLUSTER","cluster": "SIN CLUSTER","des_intervencion": "INFRAESTRUCTURA PMP","des_sub_intervencion": "ENVIADA DESDE IMPLEMENTACION","des_subintervencion": "ENVIADA DESDE IMPLEMENTACION","distrito": "ZACATECAS","horas_incidencia": "#dc1c1c","horas_retraso": "#dc1c1c","id_intervencion": "165","id_ot": "1142585","id_sub_intervencion": "206","latitud": "22.9535083","longitud": "-102.7023933","primerNivel": "INFRAESTRUCTURA PMP","primer_nivel": "INFRAESTRUCTURA PMP","region": "BAJIO","segundoNivel": "ENVIADA DESDE IMPLEMENTACION","segundonivel": "ENVIADA DESDE IMPLEMENTACION","zona": "SIN ZONA"},{"ciudad": "VILLAHERMOSA","clust": "SIN CLUSTER","cluster": "SIN CLUSTER","des_intervencion": "INFRAESTRUCTURA PMP","des_sub_intervencion": "NO HAY LINEA DE VISTA FRANCA PMP","des_subintervencion": "NO HAY LINEA DE VISTA FRANCA PMP","distrito": "VILLAHERMOSA","horas_incidencia": "#dc1c1c","horas_retraso": "#dc1c1c","id_intervencion": "165","id_ot": "1085800","id_sub_intervencion": "168","latitud": "18.4270318","longitud": "-93.1901305","primerNivel": "INFRAESTRUCTURA PMP","primer_nivel": "INFRAESTRUCTURA PMP","region": "VILLAHERMOSA","segundoNivel": "NO HAY LINEA DE VISTA FRANCA PMP","segundonivel": "NO HAY LINEA DE VISTA FRANCA PMP","zona": "SIN ZONA"},{"ciudad": "ZACATECAS","clust": "SIN CLUSTER","cluster": "SIN CLUSTER","des_intervencion": "INFRAESTRUCTURA PMP","des_sub_intervencion": "ANCHO DE BANDA INSUFICIENTE PMP","des_subintervencion": "ANCHO DE BANDA INSUFICIENTE PMP","distrito": "ZACATECAS","horas_incidencia": "#dc1c1c","horas_retraso": "#dc1c1c","id_intervencion": "165","id_ot": "1298455","id_sub_intervencion": "210","latitud": "22.9541482","longitud": "-102.702738","primerNivel": "INFRAESTRUCTURA PMP","primer_nivel": "INFRAESTRUCTURA PMP","region": "BAJIO","segundoNivel": "ANCHO DE BANDA INSUFICIENTE PMP","segundonivel": "ANCHO DE BANDA INSUFICIENTE PMP","zona": "SIN ZONA"},{"ciudad": "ZACATECAS","clust": "SIN CLUSTER","cluster": "SIN CLUSTER","des_intervencion": "INFRAESTRUCTURA PMP","des_sub_intervencion": "ENVIADA DESDE IMPLEMENTACION","des_subintervencion": "ENVIADA DESDE IMPLEMENTACION","distrito": "ZACATECAS","horas_incidencia": "#dc1c1c","horas_retraso": "#dc1c1c","id_intervencion": "165","id_ot": "1542015","id_sub_intervencion": "206","latitud": "22.9535083","longitud": "-102.7023933","primerNivel": "INFRAESTRUCTURA PMP","primer_nivel": "INFRAESTRUCTURA PMP","region": "BAJIO","segundoNivel": "ENVIADA DESDE IMPLEMENTACION","segundonivel": "ENVIADA DESDE IMPLEMENTACION","zona": "SIN ZONA"}];
	let jsonDetalleOtPendiente = {"OTInfo": {"Estado": "NO ASIGNADA","Estatus": "PENDIENTE","Fecha": "25/11/2021","Hora": "10:40","ID_OT_PE": 1210327,"Latitud": 19.604931851597136,"Longitud": -99.20645713806152,"Motivo": "OT NUEVA","Subtipo": "ENVIADA DESDE IMPLEMENTACION","Tipo": "INFRAESTRUCTURA PMP","UnidadNegocio": "PLANTA EXTERNA"},"OT_PI": {"Cliente": "SIEGFRIED RHEIN S.A DE C.V","CoordinadorEnvia": "JUANA COLIN MENDEZ","Cuenta": "NO APLICA","FechaReporte": "25/11/2021","HoraReporte": "10:40 HRS","ID_OT_PI": 572982,"LatitudCliente": "19.604516","LongitudCliente": "-99.2067399","OS": "NO APLICA","OperarioDetuvo": "CARLOS ALBERTO RIVERA RODRIGUEZ","TelefonoCoordinador": "5518038673","TelefonoTecnico": "5510536413","UnidadNegocio": "TOTALPLAY EMPRESARIAL","InfoRadiobase": {"AnchoBanda": "BAJADA: 100 Mbps - SUBIDA: 100 Mbps","CMS": "85927","Latitud": "19.604931851597136","Longitud": "-99.20645713806152","Paquete": "NO APLICA","Radiobase": "bosques del lago","Sector": "2","Zona": "Norte"},"OT_PI": {"NombreImagen": "photoThree2021_11_24.jpg","UrlImagen": "https://thumbs.dreamstime.com/b/poste-de-tel%C3%A9fono-1682751.jpg"}},"OperarioInfo": {"ID_Operario": 0,"Nombre": ""}};
	
	let tablaOtsConsultaGeneral;
	$scope.listaIntervencionesConsulta = [];
	$scope.listaOtsPendientes = [];
	$scope.listaOtsPendientesTabla = [];
	$scope.otPendienteSeleccionada = {};
	$scope.mostrarNavAccionesDetalleOtPendiente = false;
	
	angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
    });
	
	$scope.iniciarModuloTercerosGeneric = function() {
		$scope.listaIntervencionesConsulta = jsonIntervenciones;
		if($scope.listaIntervencionesConsulta.length > 0){
			$scope.cargarArbolIntervencionesConsulta($scope.listaIntervencionesConsulta);
		}else{
			toastr.warning('¡No existen intervenciones actualmente!');
		}
		$scope.iniciarFechasConsulta();
		$scope.iniciarTabla();
	}
	
	$scope.cargarArbolIntervencionesConsulta = function(listaIntervenciones) {
		let intervencionesLista = listaIntervenciones;
		intervencionesLista.map((e)=>{
            e.parent = e.idPadre == undefined ? "#" : e.idPadre;
            e.text= e.nombre;
            e.icon= "fa fa-globe";
            return e
        })       
        $('#arbolIntervencionesConsulta').bind('loaded.jstree', function(e, data) {
        }).jstree({
        	'plugins': ['search', 'checkbox', 'wholerow'],
        	'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': intervencionesLista,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons":false        
                }
            }
		});
	}
	
	$scope.iniciarFechasConsulta = function () {
		$('#txtFechaInicioConsulta').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true
        });
		$('#txtFechaFinConsulta').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: true
        });
		$('#txtFechaInicioConsulta').datepicker('update', new Date());
        $('#txtFechaFinConsulta').datepicker('update', new Date());
    }
    
    $scope.iniciarTabla = function() {
    	if (tablaOtsConsultaGeneral) {
    		tablaOtsConsultaGeneral.destroy();
		}
    	
    	tablaOtsConsultaGeneral=$('#tablaOtsConsultaGeneral').DataTable({
            info: false,
            pageLength : 3,
            lengthChange: false,
            ordering: false,
            searching: false,
            language: {
                   zeroRecords: "No se encontraron OT\u00B4s",
                   infoEmpty: "No se encontro la OT",
                   infoFiltered: "(OT no encontrada)",
                   paginate: {
                       first:      '<i class="fa fa-fast-backward"></i>',
                       last:       '<i class="fa fa-fast-forward"></i>',
                       next:       ' ',
                       previous:   ' '
                   }
               }
        });
	}
    
    $scope.abrirModalModalIntervencionesConsulta = function() {
    	$("#modalIntervencionesConsulta").modal('show');
    	setTimeout(function (){
	        $("#buscadorIntervencionConsultaGeneral").focus();
	    }, 750);
	}
    
    //MÉTODO PARA BUSCAR INTERVENCIONES DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - MODAL INTERVENCIONES CONSULTA OTS
    $scope.busquedaIntervencionConsultaGeneral = function() {
    	$("#arbolIntervencionesConsulta").jstree("search", $('#buscadorIntervencionConsultaGeneral').val());
	}
    
    //CREA EL TEXTO CON LAS INTERVENCIONES SELECCIONADAS Y SE MUESTRA EN EL INPUT DE 'txtIntervencionesConsulta' - CONSULTA OTS TERCEROS GENERIC
    $scope.btnAceptarModalIntervencionesConsulta = function() {
    	var intervenciones = $("#arbolIntervencionesConsulta").jstree("get_selected", true);
    	let textoIntervenciones = [];
		angular.forEach(intervenciones,(intervencion,index) => {
			textoIntervenciones.push(intervencion.text);				
		});
		$("#txtIntervencionesConsulta").val(textoIntervenciones);
		if(textoIntervenciones.length > 0){
			$("#txtIntervencionesConsulta").css("border-bottom", "1px solid #d9d9d9");
		}
	}
    
    $scope.consultarOTsTercerosGeneric = function() {
    	var intervenciones = $('#arbolIntervencionesConsulta').jstree("get_selected", true);
    	var respuestaValidacionDatos = $scope.validarDatosConsultaGeneral(intervenciones);
    	$scope.listaOtsPendientesTabla = [];
    	if(respuestaValidacionDatos.validacion){
    		
    		$scope.otPendienteSeleccionada = {};
    		$scope.mostrarNavAccionesDetalleOtPendiente = false;
    		
    		$scope.listaOtsPendientes = jsonOtsPendientes;
    		angular.forEach($scope.listaOtsPendientes,function(ot,index){
    			let  cardOt=[];
    			cardOt[0] = `
                    <div id="cardOtPendiente${ot.id_ot}" class="card cardOtsPendientesConsulta cardsOtspendientesStyle" onclick="consultarAccionesOtPendiente('${ot.id_ot}')">
                        <div id="contenedorBodyCardOtsPendientesConsulta" class="card-body">

                            <div class="top-title-ot">
                                <div class="content-top-element bars-content">
                                    <span class="txtTituloCardsOtsPendientesConsulta"><i class="fas fa-bars btnInformacionOtPendienteConsulta" onclick="abrirModalDetalleInformacionOtPendiente('${ot.id_ot}')"></i> ${ot.primerNivel}</span>
                                </div>                        
                            </div>
                            <div class="top-title-ot">
                                <div class="content-top-element bars-content">
                                	<b class="txtCuerpoCardsOtsPendientesConsulta"> INC: ${ot.id_ot} </b> <span class="txtCuerpoCardsOtsPendientesConsulta" > ${ot.segundoNivel}</span>
                                </div>                        
                            </div>
                        </div>
                        
                        <div id="contenedorFootCardOtsPendienteConsulta" class="card-footer">               
							<div class="row">
								<div class="col-md-12">
									<div class="content_text">
										<small class="txtFooterCardsOtsPendientesConsulta"><b>Ciudad: </b>${ot.ciudad}</small> <small class="txtFooterCardsOtsPendientesConsulta"><b>Distrito: </b>${ot.distrito}</small>&nbsp;<small class="txtFooterCardsOtsPendientesConsulta"><b>Zona: </b>${ot.zona} </small><small class="txtFooterCardsOtsPendientesConsulta"><b>Cluster: </b>${ot.cluster}</small>
									</div>
								</div>
							</div>                
						</div>
                        
                    </div>
                `;
    			$scope.listaOtsPendientesTabla.push(cardOt);
    		});
    		
    		var ventana_alto = $(window).height();
    		var cardsPorPagina = 3;
    		if(ventana_alto <= 670){
    			cardsPorPagina = 3;
    		}else if(ventana_alto > 670 && ventana_alto <= 790){
    			cardsPorPagina = 4;
    		}else if(ventana_alto > 790 && ventana_alto <= 980){
    			cardsPorPagina = 5;
    		}else if(ventana_alto > 980){
    			cardsPorPagina = 6;
    		}
    		
    		if(tablaOtsConsultaGeneral) {
    			tablaOtsConsultaGeneral.destroy();
            }

    		tablaOtsConsultaGeneral = $('#tablaOtsConsultaGeneral').DataTable({
                "paging": true,
                "lengthChange": false,
                "ordering": false,
                "scrollX": true,
                "info": false,
                "autoWidth": true,
                "pageLength" : cardsPorPagina,
                "language": idioma_espanol_not_font,
                "data": $scope.listaOtsPendientesTabla,
                "sDom" : '<"top"f>rt<"bottom"lp><"bottom"r><"clear">',
                "columns": [
                    {
                        "title": ""
                    }
                ]
            });
    		
    		setTimeout(function (){
    	        $("#txtBuscadorOtsConsultaTabla").focus();
    	    }, 750);
    		
    	}else{
    		toastr.warning(respuestaValidacionDatos.mensaje);
    	}
	}
    
    $scope.validarDatosConsultaGeneral = function(intervencionesSeleccionadas) {
    	let respuesta = {validacion:true, mensaje:""};
    	
    	if(intervencionesSeleccionadas.length < 1){
    		$("#txtIntervencionesConsulta").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Intervenciones";
    	}else{
    		$("#txtIntervencionesConsulta").css("border-bottom", "1px solid #d9d9d9");
    	}
    	
    	if($("#txtFechaInicioConsulta").val() == null || $("#txtFechaInicioConsulta").val() == ""){
    		$("#txtFechaInicioConsulta").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Fecha inicial";
    	}else{
    		$("#txtFechaInicioConsulta").css("border-bottom", "1px solid #d9d9d9");
    	}
    	
    	if($("#txtFechaFinConsulta").val() == null || $("#txtFechaFinConsulta").val() == ""){
    		$("#txtFechaFinConsulta").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Fecha final";
    	}else{
    		$("#txtFechaFinConsulta").css("border-bottom", "1px solid #d9d9d9");
    	}
    	
    	if(!respuesta.validacion){
			respuesta.mensaje = "VALIDA LOS SIGUIENTES CAMPOS: " + respuesta.mensaje;
		}
    	
    	return respuesta;
	}
    
    //CUANDO SELECCCIONE UNA FECHA VÁLIDA EL INPUT 'txtFechaInicioConsulta' REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - CONSULTA OTS TERCEROS GENERIC
    $("#txtFechaInicioConsulta").change(function() {
    	var respuestaValidarcionFechas = $scope.validarFechasInicioFin();
    	if(respuestaValidarcionFechas){
    		$("#txtFechaInicioConsulta").css("border-bottom", "1px solid #d9d9d9");
    	}else{
    		$("#txtFechaInicioConsulta").val("");
    		$scope.iniciarFechasConsulta();
    		$("#txtFechaInicioConsulta").css("border-bottom", "2px solid #f55756");
    		$("#txtFechaFinConsulta").css("border-bottom", "2px solid #f55756");
    		swal({type: "warning", title:"Aviso", text:"¡La fecha inicial no puede ser mayor a la fecha final!", showConfirmButton: true});
    		setTimeout(function() {
    			$("#txtFechaInicioConsulta").css("border-bottom", "1px solid #d9d9d9");
    			$("#txtFechaFinConsulta").css("border-bottom", "1px solid #d9d9d9");
        	}, 2000);
    	}
    });
    
    //CUANDO SELECCCIONE UNA FECHA VÁLIDA EL INPUT 'txtFechaFinConsulta' REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - CONSULTA OTS TERCEROS GENERIC
    $("#txtFechaFinConsulta").change(function() {
    	var respuestaValidarcionFechas = $scope.validarFechasInicioFin();
    	if(respuestaValidarcionFechas){
    		$("#txtFechaFinConsulta").css("border-bottom", "1px solid #d9d9d9");
    	}else{
    		$("#txtFechaFinConsulta").val("");
    		$scope.iniciarFechasConsulta();
    		$("#txtFechaInicioConsulta").css("border-bottom", "2px solid #f55756");
    		$("#txtFechaFinConsulta").css("border-bottom", "2px solid #f55756");
    		swal({type: "warning", title:"Aviso", text:"¡La fecha final no puede ser menor a la fecha final!", showConfirmButton: true});
    		setTimeout(function() {
    			$("#txtFechaInicioConsulta").css("border-bottom", "1px solid #d9d9d9");
    			$("#txtFechaFinConsulta").css("border-bottom", "1px solid #d9d9d9");
        	}, 2000);
    	}
    });
    
    $scope.validarFechasInicioFin = function() {
    	console.log("---");
    	var respuesta = false;
  		var fechaInicio = $("#txtFechaInicioConsulta").val().split('/');
       	var fechaFin = $("#txtFechaFinConsulta").val().split('/'); 
       	if(fechaInicio == "" || fechaInicio == null || fechaFin == "" || fechaFin == null){
       		respuesta = true;
       	}else{
       		var dateInicio = new Date(fechaInicio[2] + '-' + fechaInicio[1] + '-' + fechaInicio[0]);
    		var dateFin = new Date(fechaFin[2] + '-' + fechaFin[1] + '-' + fechaFin[0]);
            console.log(dateInicio);
            console.log(dateFin);
            if(dateInicio <= dateFin){
            	respuesta = true;
            }else{
            	respuesta = false;
            }
       	}
    	
    	return respuesta;
	}
    
    $scope.busquedaOtsConsultaTabla = function(event) {
    	let txtBusqueda= $("#txtBuscadorOtsConsultaTabla").val();
		tablaOtsConsultaGeneral.search(txtBusqueda).draw();
		console.log(tablaOtsConsultaGeneral.page.info().recordsDisplay);
	}
    
    consultarAccionesOtPendiente = function(ot) {
    	
    	angular.forEach($scope.listaOtsPendientes,function(ots,index){
    		$("#cardOtPendiente"+ots.id_ot).css("border-left", "1px solid #dddddd");
        	$("#cardOtPendiente"+ots.id_ot).css("box-shadow", "0 0 0 0 #ffffff");
        	console.log($("#cardOtPendiente"+ots.id_ot));
    	});
    	
    	$("#cardOtPendiente"+ot).css("border-left", "4px solid #31a7ee");
    	$("#cardOtPendiente"+ot).css("box-shadow", "0 2px 8px 0 rgb(0 0 0 / 16%), 0 2px 8px 0 rgb(0 0 0 / 16%)");
    	$scope.mostrarNavAccionesDetalleOtPendiente = true;
    	$scope.otPendienteSeleccionada = {};
//    	$scope.otPendienteSeleccionada = $scope.listaOtsPendientes.filter(e => {return e.id_ot == ot})[0];
    	$scope.otPendienteSeleccionada = jsonDetalleOtPendiente;
    	$scope.otPendienteSeleccionada.OTInfo.ID_OT_PE = ot;
    	console.log($scope.otPendienteSeleccionada);
    	$scope.$apply();
    }
    
    abrirModalDetalleInformacionOtPendiente = function(ot) {
    	$("#modalDetalleInformacionOtPendiente").modal('show');
    }
	
    $scope.iniciarModuloTercerosGeneric();
}]);