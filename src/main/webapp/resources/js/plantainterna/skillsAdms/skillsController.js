var app = angular.module('skillsApp', []);
var tablePermisosDinamica;
var objectTempAccion;

app.controller('skillsController', ['$scope','$q','skillsService','genericService','mainDespachoService','$filter', function($scope, $q,skillsService, genericService, mainDespachoService, $filter) {
	$("#moduloSkills").addClass('active');
	var dataTecnicoGlobal=[];
	$scope.tecnicosMostradas = [];
	$scope.listaTecnicosTabla = [];
	$scope.listadoIntervenciones = [];
	$scope.listadoIntervencionesIndividual = [];
	$scope.listadoIntervencionesMultiseleccion = [];
	$scope.listadoIntervencionesFiltro = [];
	$scope.idIntervenciones = [];
	$scope.listaGeografiasIndividual = [];
	$scope.listaGeografiasTabla = [];
	$scope.listadoIntervencionesTecnico=null;
	$scope.contadorSkillsSeleccionadas = 0;
	$scope.contadorSkillsSeleccionadasMultiseleccion = 0;
	$scope.contadorTecnicosEncontrados = 0;
	$scope.listadoIntervencionesSeleccionadas=[];
	$scope.tecnicoSeleccionado = null;
	$scope.idTecnicoSeleccionado = null;
	$scope.valorSlider = 0;
	$scope.skillsSeleccionadasIndividual = [];
	$scope.skillsSeleccionadasMultiseleccion = [];
	$scope.nivelSkill = null;
	$scope.txtbusq='';
	$scope.tipoMultiseleccion = null;
	
	//Funciones pendientes por revisar
	$scope.busquedaT=function(){
		var busq=$scope.txtbusq;
		tablePermisosDinamica.search(busq).draw()
	}
	
	$scope.guardarSkills=function(){
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		$scope.guardarMultiplesSkills(); 
	}
	
	$(document.body).on('click','.guardarinfo-tecnico',function(){
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		setTimeout(function() { $scope.guardarMultiplesSkills(); 
		swal("Correcto", "Registros actualizados con exito", "success");
		}, 800);
	});
	//Fin de funciones pendientes por revisar

	//FUNCIÓN QUE VA A CONSULTAR LOS TÉCNICOS DE ACUERDO A LA GEOGRAFÍA SELECCIONADA
	$('#arbolGeografiasVistaIndividual').on("select_node.jstree", function (e, data) {
		$scope.tecnicosMostradas = [];
		$scope.listaTecnicosTabla = [];
		var idGeografia = $('#arbolGeografiasVistaIndividual').jstree("get_selected", true);
		var nivelGeoSeleccionada = idGeografia[0].original.nivel;
		var idGeoSeleccionada = idGeografia[0].original.id;
		let geografiasCiudades = [];
		let idGeografiasCiudades = [];
		if(nivelGeoSeleccionada == 1){
			geografiasCiudades = $scope.listaGeografiasIndividual.filter(e => {return e.parent == idGeoSeleccionada});
		}else if(nivelGeoSeleccionada > 2){
			var geo = idGeografia[0];
    		geo.nivel = idGeografia[0].original.nivel;
    		while(geo.nivel > 2){
    			geo = $scope.listaGeografiasIndividual.filter(e => {return e.id == geo.parent})[0];
    		}
    		idGeografiasCiudades.push(geo.id);
		}
		angular.forEach(geografiasCiudades,function(geoCiudad,index){
			idGeografiasCiudades.push(geoCiudad.id);
		});
		idGeografiasCiudades.push(idGeoSeleccionada);
		
		let params = {idGeografia:idGeografiasCiudades};
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		skillsService.consultarTecnico(params).then(function success(response) {
			if (response.data.respuesta) {
				if(response.data.result.usuarios != ""){
					$scope.tecnicosMostradas = response.data.result.usuarios;
					var primerTec = $scope.tecnicosMostradas[0];
					
					angular.forEach($scope.tecnicosMostradas,function(tec,index){
						tec.geografias = [];
					});
					
//					----------------------------------------------------------------------------------
					$scope.listaTecnicosTabla = response.data.result.usuarios;
					$("#divMensajeSeleccionaGeografiaVistaTabla").hide();
					$('#contenedorTablaSkilssVistaTabla').show();
					$('#tablaSkilssVistaTabla').find("th, td").show();
					$("#checkOcultarMostrarColumnasTabla").prop("checked",true);
					$(".checkSkillsVistaTabla").prop("checked",true);
					var listaSkills =  $scope.listadoIntervenciones;
					angular.forEach($scope.listaTecnicosTabla,function(tecnico,index){
							tecnico.todasSkills = angular.copy(listaSkills);
							angular.forEach(tecnico.todasSkills,function(skill,indexSkills){
								if(tecnico.skills != ""){
									angular.forEach(tecnico.skills,function(skillAsignada,indexSkillAsignada){
										if(skill.id == skillAsignada){
											skill.checkTabla = true;
										}else{
											if(skill.checkTabla != true){
												skill.checkTabla = false;
											}
										}
									});
								}else{
									skill.checkTabla = false;
								}
								skill.idCheck = "checkTablaTecnico"+tecnico.idUsuario+"Skill"+skill.id;
							});
					});
//					----------------------------------------------------------------------------------
					setTimeout(function (){
						$scope.consultarSkillsAsignadasTecnico(primerTec.idUsuario, primerTec.nombre, primerTec.apellidoPaterno, primerTec.apellidoMaterno);
						$scope.$apply();
					}, 250);
				}else{
					toastr.info('¡No se encontraron técnicos asignados a la geografía seleccionada!');
				}
				$('#contadorTecnicos').text("Técnicos encontrados: " + $scope.tecnicosMostradas.length);
			} else {
				toastr.warning(response.data.resultDescripcion);
			}
			swal.close();
		}).catch(err => handleError(err));
		$('#divContenedorSkills').hide();
		$('#divBotonGuardarSkills').hide();
		$('#divMensajeSeleccionaTecnico').show();
		$('#divTecnicos').show();
		$('#divContadorTecnicos').show();
		$('#divMensajeSeleccionaGeografia').hide();
		$('#divMensajeSeleccioneElemento').hide();
		$scope.$apply();
    });
	
	//FUNCIÓN QUE CARGA EL ÁRBOL DE INTERVENCIONES / SKILLS DEL TÉCNICO SELECCIONADO
	$scope.consultarSkillsAsignadasTecnico = function(idTecnico, nombreTecnico, primerApellido, segundoApellido){
		$("#arbolSkillsVistaIndividual").jstree("destroy");
		$scope.contadorSkillsSeleccionadas = 0;
		$scope.idTecnicoSeleccionado = idTecnico;
		$('.checkTecnicoSeleccionado').hide();
		var tecnicoSeleccionado=document.getElementsByClassName("tecnicosDiv");
		for (var i=0; i<tecnicoSeleccionado.length; i++){
			tecnicoSeleccionado[i].style.backgroundColor="white";
		}
		document.getElementById("contenedorTecnicoConsulta"+idTecnico).style.backgroundColor = "#DCDEDC";
		$scope.tecnicoSeleccionado = nombreTecnico + " " + primerApellido + " " + segundoApellido;
		
		if($scope.listadoIntervenciones == ""){
        	toastr.warning('¡No existen Skills actualmente!');
        }else{
        	let intervencionesListaIndividual = $scope.listadoIntervencionesIndividual;
        	
        	angular.forEach(intervencionesListaIndividual,(intervencion,index) => {
        		intervencion.state = {selected: false, opened: false};
        	});
        	
        	angular.forEach($scope.tecnicosMostradas,function(tecnico,index){
        		if(idTecnico == tecnico.idUsuario){
        			angular.forEach(intervencionesListaIndividual,(intervencion,index) => {
        				angular.forEach(tecnico.skills,function(skillAsignada,indexSkillAsignada){
                            if(intervencion.id == skillAsignada) {
                            	intervencion.state = {selected: true, opened: false};
                            	$scope.contadorSkillsSeleccionadas = $scope.contadorSkillsSeleccionadas + 1;
                            }
                        });
                    });
        		}
        	});
        	
        	intervencionesListaIndividual.map((e)=>{
                e.parent = e.idPadre == null ? 0 : e.idPadre;
                e.text= e.nombre;
                e.icon= "fa fa-globe";
                return e
            })       

            $('#arbolSkillsVistaIndividual').bind('loaded.jstree', function(e, data) {
            	
            }).jstree({
            	'plugins': ['search', 'checkbox', 'wholerow'],
            	'search': {
    				"case_sensitive": false,
    				"show_only_matches": true
    			},
    			'core': {
    				'data': intervencionesListaIndividual,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons":false        
                    }
                }
    		});

        	setTimeout(function (){
        		$("#arbolSkillsVistaIndividual").jstree().close_all();
        		$("#arbolSkillsVistaIndividual").jstree("open_node", 0);
        	}, 100);

    		$('#divContenedorSkills').show();
    		$('#divBotonGuardarSkills').show();
    		$('#divMensajeSeleccionaTecnico').hide();
    		$('#checkTecnicoSeleccionado'+idTecnico).show();
    		$("#buscadorSkillConsultaVistaIndividual").focus();
        }
		
	}
	
	//FUNCIÓN QUE AUMENTA O DISMINUYE EL CONTADOR DE SKILLS SELECCIONADAS
	$scope.sumarContador = function(estado){
		if(estado == 0){
			$scope.contadorSkillsSeleccionadas = $scope.contadorSkillsSeleccionadas + 1;
		}else{
			$scope.contadorSkillsSeleccionadas = $scope.contadorSkillsSeleccionadas - 1;
		}
	}
	
	//FUNCIÓN QUE ABRE EL MODAL DE SKILLS SELECCIONADAS
	$scope.abrirModalSkillsSeleccionadas = function(){
		if($scope.contadorSkillsSeleccionadas != 0){
			$scope.listadoIntervencionesSeleccionadas = [];
			var skills = $('#arbolSkillsVistaIndividual').jstree("get_selected", true);
			
			angular.forEach(skills,function(skillSeleccionada,index){
				if(skillSeleccionada.original.nivel == $scope.nivelSkill){
					$scope.listadoIntervencionesSeleccionadas.push(skillSeleccionada);
				}
			});
			$("#modalSkillsSeleccionadas").modal('show');
		}else{
			toastr.warning('¡No hay skills seleccionadas!');
		}
	}
	
	//FUNCIÓN QUE CIERRA EL MODAL DE SKILLS SELECCIONADAS
	$scope.cerrarModalSkillsSeleccionadas = function() {
		$("#modalSkillsSeleccionadas").modal('hide');
	}
	
	//FUNCIÓN QUE MUESTRA ES APARTADO DE MULTISELECCIÓN PARA REALIZAR LA MULTIASIGNACIÓN DE SKILLS / CARGA EL ÁRBOL DE INTERVENCIONES - SKILLS
	$scope.mostrarContenedoresMultiseleccion = function(tipo){
		$scope.tipoMultiseleccion = tipo;
		$(".checkedTecnicos").prop("checked",true);
		$("#checkTotdosTecnicos").prop("checked",true);
		$("#modalMultiseleccion").modal('show');
		
//		if($scope.tipoMultiseleccion == "1"){
//			$("#textTipoMultiseleccion").text("Seleccionaste la opción de agregar multiples skills.");
//		}else if($scope.tipoMultiseleccion == "0"){
//			$("#textTipoMultiseleccion").text("Seleccionaste la opción de " + '<font color="#f55756">palabra</font>' + " eliminar multiples skills.");
//		}
		
		angular.forEach($scope.listadoIntervencionesMultiseleccion,function(intervencion,index){
			intervencion.check = 0;
		});
		
		let intervencionesLista = $scope.listadoIntervencionesMultiseleccion;
		intervencionesLista.push({id: 0, nombre: "SELECCIONAR TODAS", nivel: 0, idPadre: "#", state:{opened: true}});
		intervencionesLista.map((e)=>{
            e.parent = e.idPadre == null ? 0 : e.idPadre;
            e.text= e.nombre;
            e.icon= "fa fa-globe";
            return e
        })       

        $('#arbolSkillsMultiseleccion').bind('loaded.jstree', function(e, data) {
			//$(this).jstree("open_all");
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

		$scope.contadorSkillsSeleccionadasMultiseleccion = 0;
		$('#contadorTecnicosMultiseleccion').text("Técnicos encontrados: " + $scope.tecnicosMostradas.length);
		
		setTimeout(function (){
	        $("#buscadorSkillsMultiseleccion").focus();
    	}, 750);
		
	}
	
	$scope.regresarContenedorIndividual = function() {
		$("#arbolSkillsMultiseleccion").jstree("deselect_all");
		$("#modalMultiseleccion").modal('hide');
	}
	
	$scope.seleccionarTodosTecnicos = function() {
		if($('#checkTotdosTecnicos').prop('checked')){
			$(".checkedTecnicos").prop("checked",true);
		}else{
			$(".checkedTecnicos").prop("checked",false);
		}
	}
	
	$scope.verVistaIndividual = function() {
		$("#divBotonGuardarSkills").hide();
		$("#divContadorTecnicos").hide();
		$("#divTecnicos").hide();
		$("#divContenedorSkills").hide();
		$("#divContenedorTabla").hide();
		$("#divMensajeSeleccionaGeografia").show();
		$("#divMensajeSeleccionaTecnico").show();
		$("#divContenedorIndividual").show();
	}
	
	$scope.verVistaTabla = function() {
		$("#divContenedorIndividual").hide();
		$("#contenedorTablaSkilssVistaTabla").hide();
		$("#divContenedorTabla").show();
		$("#divMensajeSeleccionaGeografiaVistaTabla").show();
	}
	
	$scope.seleccionarTecnicoMultiseleccion = function(id) {
		if($("#checkTecnicoMultiseleccion"+id).prop('checked')){
			$("#checkTecnicoMultiseleccion"+id).prop("checked",false);
		}else{
			$("#checkTecnicoMultiseleccion"+id).prop("checked",true);
		}
	}
	
	$scope.cargarGeografiasArbolTabla = function() {
		let geografia = $scope.listaGeografiasTabla;
		
        geografia.map((e)=>{
        	e.parent = e.padre == null ? 0 : e.padre;
            e.text= e.nombre;
            e.icon= "fa fa-globe";
            return e
        });       
        $('#arbolGeografiasVistaTabla').bind('loaded.jstree', function(e, data) {
        	$(this).jstree("open_all");
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
	}
	
	$scope.abrirModalGeografiaTabla=function(){
        $("#modalGeografiaTabla").modal('show');
        setTimeout(function (){
	        $("#idBuscadorGeografiaVistaTabla").focus();
	    }, 750);
    }
	
	$('#arbolGeografiasVistaTabla').on("select_node.jstree", function (e, data) {
		$scope.listaTecnicosTabla = [];
		$scope.tecnicosMostradas = [];
		var idGeografia = $('#arbolGeografiasVistaTabla').jstree("get_selected", true);
		
		var nivelGeoSeleccionada = idGeografia[0].original.nivel;
		var idGeoSeleccionada = idGeografia[0].original.id;
		let geografiasCiudades = [];
		let idGeografiasCiudades = [];
		if(nivelGeoSeleccionada == 1){
			geografiasCiudades = $scope.listaGeografiasIndividual.filter(e => {return e.parent == idGeoSeleccionada});
		}else if(nivelGeoSeleccionada > 2){
			var geo = idGeografia[0];
    		geo.nivel = idGeografia[0].original.nivel;
    		while(geo.nivel > 2){
    			geo = $scope.listaGeografiasIndividual.filter(e => {return e.id == geo.parent})[0];
    		}
    		idGeografiasCiudades.push(geo.id);
		}
		angular.forEach(geografiasCiudades,function(geoCiudad,index){
			idGeografiasCiudades.push(geoCiudad.id);
		});
		idGeografiasCiudades.push(idGeoSeleccionada);
		
		let params = {idGeografia:idGeografiasCiudades};
		if($scope.listadoIntervenciones == ""){
        	swal("Aviso", "¡No existen Skills actualmente!", "warning");
        }else{
        	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
    		swal.showLoading();
    		skillsService.consultarTecnico(params).then(function success(response) {
    			if (response.data.respuesta) {
    				if(response.data.result.usuarios != ""){
    					$scope.listaTecnicosTabla = response.data.result.usuarios;
    					setTimeout(function (){
    				        $("#idBuscadorTecnicoTabla").focus();
    				    }, 750);
//    					-----------------------------------------------------------------------------------
    					$scope.tecnicosMostradas = response.data.result.usuarios;
    					
    					angular.forEach($scope.tecnicosMostradas,function(tec,index){
    						tec.geografias = [];
    					});
    					
    					$('#divContenedorSkills').hide();
    					$('#divBotonGuardarSkills').hide();
    					$('#divMensajeSeleccionaTecnico').show();
    					$('#divTecnicos').show();
    					$('#divContadorTecnicos').show();
    					$('#divMensajeSeleccionaGeografia').hide();
    					$('#divMensajeSeleccioneElemento').hide();
//    					-----------------------------------------------------------------------------------
    					$("#divMensajeSeleccionaGeografiaVistaTabla").hide();
    					$('#contenedorTablaSkilssVistaTabla').show();
    					$('#tablaSkilssVistaTabla').find("th, td").show();
    					$("#checkOcultarMostrarColumnasTabla").prop("checked",true);
    					$(".checkSkillsVistaTabla").prop("checked",true);
    					var listaSkills =  $scope.listadoIntervenciones;
    					angular.forEach($scope.listaTecnicosTabla,function(tecnico,index){ 
    							tecnico.todasSkills = angular.copy(listaSkills);
    							angular.forEach(tecnico.todasSkills,function(skill,indexSkills){
    								if(tecnico.skills != ""){
    									angular.forEach(tecnico.skills,function(skillAsignada,indexSkillAsignada){
    										if(skill.id == skillAsignada){
    											skill.checkTabla = true;
    										}else{
    											if(skill.checkTabla != true){
    												skill.checkTabla = false;
    											}
    										}
    									});
    								}else{
    									skill.checkTabla = false;
    								}
    								skill.idCheck = "checkTablaTecnico"+tecnico.idUsuario+"Skill"+skill.id;
    							});
    					});
    				}else{
    					$("#divMensajeSeleccionaGeografiaVistaTabla").show();
    					toastr.warning('¡No se encontraron técnicos asignados a la geografía seleccionada!');
    				}
    				$('#contadorTecnicos').text("Técnicos encontrados: " + $scope.tecnicosMostradas.length);
    			} else {
    					
    			}
    			swal.close();
    		}).catch(err => handleError(err));
        }
		
		$("#modalGeografiaTabla").modal('hide');
	});
	
	$scope.busquedaGeografiaVistaTabla = function() {
		$("#arbolGeografiasVistaTabla").jstree("search", $('#idBuscadorGeografiaVistaTabla').val());
	}
	
	$scope.cerrarModalGeografiaTabla = function() {
		$("#modalGeografiaTabla").modal('hide');
	}
	
	$scope.abrirModalSkillsFiltroTabla = function() {
		$("#modalSkillsFiltroTabla").modal('show');
		setTimeout(function (){
	        $("#txtBusquedaSkillFiltro").focus();
	    }, 750);
	}
	
	$scope.displayColumna = function(col) {
		if($('td:nth-child('+col+'),th:nth-child('+col+')').is(':visible') == true){
			$('td:nth-child('+col+'),th:nth-child('+col+')').hide();
			$("#checkOcultarMostrarColumnasTabla").prop("checked",false);
		}else{
			$('td:nth-child('+col+'),th:nth-child('+col+')').show();
			var numColumnas = $('.checkSkillsVistaTabla');
			var todasCheck = true;
			for(var checkCol = 0; checkCol < numColumnas.length; checkCol++){
				if(numColumnas[checkCol].checked == false){
					todasCheck = false;
				}
			}
			if(todasCheck == true){
				$("#checkOcultarMostrarColumnasTabla").prop("checked",true);
			}
		}
	}
	
	$scope.displayColumnaIndividual = function(col) {
		$('td:nth-child('+col+'),th:nth-child('+col+')').hide();
		$("#checkSkillFiltro"+col).prop("checked",false);
		$("#checkOcultarMostrarColumnasTabla").prop("checked",false);
	}
	
	$scope.cerrarModalSkillsFiltroTabla = function() {
		$("#modalSkillsFiltroTabla").modal('hide');
	}
	
	$scope.mostrarTodasColumnasIcono = function() {
		$('#tablaSkilssVistaTabla').find("th, td").show();
		$(".checkSkillsVistaTabla").prop("checked",true);
		$("#checkOcultarMostrarColumnasTabla").prop("checked",true);
	}
	
	$scope.ocultarMostrarTodasColumnas = function() {
		if($("#checkOcultarMostrarColumnasTabla").prop('checked')){
			$('#tablaSkilssVistaTabla').find("th, td").show();
			$(".checkSkillsVistaTabla").prop("checked",true);
		}else{
			var numColumnas = $("#tablaSkilssVistaTabla th").length;
			for(var col = 2; col <= numColumnas; col++){
				$('td:nth-child('+col+'),th:nth-child('+col+')').hide();
			}
			$(".checkSkillsVistaTabla").prop("checked",false);
		}
	}
	
	$scope.ocultarMostrarTodasColumnasTexto = function() {
		if($("#checkOcultarMostrarColumnasTabla").prop('checked')){
			$("#checkOcultarMostrarColumnasTabla").prop("checked",false);
			var numColumnas = $("#tablaSkilssVistaTabla th").length;
			for(var col = 2; col <= numColumnas; col++){
				$('td:nth-child('+col+'),th:nth-child('+col+')').hide();
			}
			$(".checkSkillsVistaTabla").prop("checked",false);
		}else{
			$("#checkOcultarMostrarColumnasTabla").prop("checked",true);
			$('#tablaSkilssVistaTabla').find("th, td").show();
			$(".checkSkillsVistaTabla").prop("checked",true);
		}
	}
	
	$scope.moverScrollHorizontalDerecha = function() {
		$('#divScrollHorizontal').animate({scrollLeft:'+=200'},250);
		var tamanioContenedorFijo = $('#divScrollHorizontal').width();
		var tamanioScroll = $('#idTheadTabla').width() - tamanioContenedorFijo;
		var movimientoSlider = tamanioScroll / 200;
		var rango = (100 / movimientoSlider);
		var rangoActual = $("#myRange").val();
		var nuevoRango = parseInt(rangoActual) + rango;
		$("#myRange").val(nuevoRango);
	}
	
	$scope.moverScrollHorizontalIzquierda = function() {
		$('#divScrollHorizontal').animate({scrollLeft:'-=200'},250);
		var tamanioContenedorFijo = $('#divScrollHorizontal').width();
		var tamanioScroll = $('#idTheadTabla').width() - tamanioContenedorFijo;
		var movimientoSlider = tamanioScroll / 200;
		var rango = (100 / movimientoSlider);
		var rangoActual = $("#myRange").val();
		var nuevoRango = parseInt(rangoActual) - rango;
		$("#myRange").val(nuevoRango);
	}
	
	$scope.moverSlider = function() {
		var rango = $("#myRange").val();
		var tamanioContenedorFijo = $('#divScrollHorizontal').width();
		var tamanioScroll = $('#idTheadTabla').width() - tamanioContenedorFijo;
		var valorMovimiento = (tamanioScroll / 100) * rango;
		$('#divScrollHorizontal').animate({scrollLeft:valorMovimiento},1);
	}

	$scope.busquedaTecnicoTabla = function() {
		var nombres = $('.nombreTecnico');
	     var buscando = $('#idBuscadorTecnicoTabla').val().toLowerCase();
	     var item='';
	     for( var i = 0; i < nombres.length; i++ ){
	         item = $(nombres[i]).html().toLowerCase();
	          for(var x = 0; x < item.length; x++ ){
	              if( buscando.length == 0 || item.indexOf( buscando ) > -1 ){
	                  $(nombres[i]).parents('.trTecnico').show(); 
	              }else{
	                   $(nombres[i]).parents('.trTecnico').hide();
	              }
	          }
	     }
	}
	
	$scope.busquedaSkillFiltro = function() {
		var skills = $('.nombreSkillFiltro');
	    var txtBuscar = $('#txtBusquedaSkillFiltro').val().toLowerCase();
	    var item='';
	    for( var i = 0; i < skills.length; i++ ){
	    	item = $(skills[i]).html().toLowerCase();
	        for(var x = 0; x < item.length; x++ ){
	        	if( txtBuscar.length == 0 || item.indexOf(txtBuscar) > -1 ){
	        		$(skills[i]).parents('.rowSkillFiltro').show(); 
	            }else{
	            	$(skills[i]).parents('.rowSkillFiltro').hide();
	            }
	        }
	    }
	}
	
	$scope.cargarFiltrosGeneric=function(){
		let params ={
				moduloAccionesUsuario: 'moduloSkills'
	    };		
        $q.all([
            skillsService.consulCatalogoGeografiaGeneralDespacho(),
            genericService.consultarConfiguracionDespachoDespacho(params),
            mainDespachoService.consultarCatalogoTipoOrdenGeneralDespacho()
        ]).then(function(results) {
            if (results[0].data !== undefined) {
                if(results[0].data.respuesta ){
                    if(results[0].data.result ){
                        if(results[0].data.result.geografia){
                        	var nivelUsuario; 
							let resultConf= results[1].data.result
							if( resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves){
								let  llavesResult=results[1].data.result.MODULO_ACCIONES_USUARIO.llaves;
								
								nivelUsuario=llavesResult.N_FILTRO_GEOGRAFIA
								$scope.nivelSkill=llavesResult.N_FILTRO_INTERVENCIONES         
								$scope.permisosConfigUser=resultConf.MODULO_ACCIONES_USUARIO;
								validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                    			validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
							}

							//if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
								objectTempAccion = new GenericAccionRealizada("" + $scope.permisosConfigUser.id, 'TOP_RIGHT');
								objectTempAccion.inicializarBotonAccionesRecientes();
							//}

							let listGeografias = [];
                        	if(nivelUsuario !== undefined){
                        		results[0].data.result.geografia.forEach(elemento =>{
    	                            if (elemento.nivel <= nivelUsuario) {
    	                            	listGeografias.push(elemento);
    	                            }
    	                        });
                        	}else{
                        		listGeografias = results[0].data.result.geografia;
                        	}
                        	$scope.listaGeografiasIndividual = listGeografias;
                        	$scope.listaGeografiasTabla = listGeografias;
							let geografia = $scope.listaGeografiasIndividual;
							
							geografia.push({id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state:{opened: true}});
							
                            geografia.map((e)=>{
                            	e.parent = e.padre == null ? 0 : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                return e
                            })       
                            $('#arbolGeografiasVistaIndividual').bind('loaded.jstree', function(e, data) {
								$(this).jstree("open_all");
								swal.close();
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
                            
                            $scope.cargarGeografiasArbolTabla();
                            
                            if(results[2].data.result == null){
                            	toastr.warning('¡No existen Skills actualmente!');
                            }
                            if($scope.nivelSkill !== undefined){
                            	results[2].data.result.forEach(skill =>{
    	                            if (skill.nivel == $scope.nivelSkill) {
    	                            	$scope.listadoIntervenciones.push(skill);
    	                            	$scope.listadoIntervencionesFiltro.push(skill);
    	                            	$scope.idIntervenciones.push(skill.id);
    	                            }
    	                        });
                            }else{
                            	results[2].data.result.forEach(skill =>{
    	                            	$scope.listadoIntervenciones.push(skill);
    	                            	$scope.listadoIntervencionesFiltro.push(skill);
    	                            	$scope.idIntervenciones.push(skill.id);
    	                        });
                            }
                            $scope.listadoIntervencionesMultiseleccion = angular.copy(results[2].data.result);
                            $scope.listadoIntervencionesIndividual = angular.copy(results[2].data.result);
                            $scope.listadoIntervencionesIndividual.push({id: 0, nombre: "SELECCIONAR TODAS", nivel: 0, idPadre: "#", state:{opened: true}});
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
	
	$scope.busquedaGeografiaIndividual=function(){
		  $("#arbolGeografiasVistaIndividual").jstree("search", $('#idBuscadorGeografia').val());
	 }
	
	$scope.guardarAsignacionSkillsIndividual = function() {
		swal({
	        title: "Se guardará la asignación de skills",
	        text: "\u00BFDesea registrar la asignación?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: '#007bff',
	        confirmButtonText: 'Si',
	        cancelButtonText: 'Cancelar'
	      }).then(function (isConfirm) {
	        if (isConfirm) {
	        	$scope.skillsSeleccionadasIndividual = [];
	    		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
	    		swal.showLoading();
	    		
	    		var skillsArbolIndividual = $('#arbolSkillsVistaIndividual').jstree("get_selected", true);
	    		angular.forEach(skillsArbolIndividual,function(skillSeleccionada,index){
	    			if(skillSeleccionada.original.nivel == $scope.nivelSkill){
	    				$scope.skillsSeleccionadasIndividual.push(skillSeleccionada.id);
	    			}
	    		});
	    		
	    		if($scope.skillsSeleccionadasIndividual == ""){
	    			$scope.skillsSeleccionadasIndividual.push(0);
	    		}

	    		let params = {
	    				skills:[
	    					{
	    						idUsuario: $scope.idTecnicoSeleccionado,
	    						skills:$scope.skillsSeleccionadasIndividual,
	    						comentarios: "Comentarios"
	    					}
	    				]
	    		};
				let tecnicoTemp = $scope.tecnicosMostradas.find((t) => t.idUsuario == params.skills[0].idUsuario)
				let tituloAccion = "Actualizar skill técico";
				let mensajeEnvio = 'Ha ocurrido un error al actualizar el skill del técnico ' + tecnicoTemp.nombreCompleto;
	    		$q.all([
	    			skillsService.guardarInfoTecnico(params)
	    		]).then(function(results) {
					if (results[0].data !== undefined) {
						if (results[0].data.respuesta) {
							angular.forEach($scope.tecnicosMostradas, function (tecnico, index) {
								if (tecnico.idUsuario == $scope.idTecnicoSeleccionado) {
									tecnico.skills = $scope.skillsSeleccionadasIndividual;
									swal.close();
									mensajeEnvio = 'Se ha actualizado el skill del técnico ' + tecnicoTemp.nombreCompleto;
									objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
									swal("Correcto", "¡Registro actualizado con éxito!", "success");
								}
							});

						} else {
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
							mostrarMensajeWarningValidacion(results[0].data.resultDescripcion);
						}
					} else {
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						mostrarMensajeErrorAlert('Ha ocurrido un error actualizar ');
					}
	    			
	    		}).catch(err => handleError(err));
	        }
	      }).catch(err => {

	      });

	}
	
	$scope.guardarAsignacionSkillIndividualTabla = function(tecnico) {
		swal({
	        title: "Se guardará la asignación de skills",
	        text: "\u00BFDesea registrar la asignación?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: '#007bff',
	        confirmButtonText: 'Si',
	        cancelButtonText: 'Cancelar'
	      }).then(function (isConfirm) {
	        if (isConfirm) {
	        	var skillsAsignar = [];
	    		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
	    		swal.showLoading();
	    		angular.forEach(tecnico.todasSkills,function(skill,index){
	    			if(skill.checkTabla){
	    				skillsAsignar.push(skill.id);
	    			}
	    		});
	    		
	    		if(skillsAsignar == ""){
	    			skillsAsignar.push(0);
	    		}

	    		let params = {
	    				skills:[
	    					{
	    						idUsuario: tecnico.idUsuario,
	    						skills:skillsAsignar,
	    						comentarios: "Comentarios"
	    					}
	    				]
	    		};
				let tecnicoTemp = $scope.tecnicosMostradas.find((t) => t.idUsuario == params.skills[0].idUsuario)
				let tituloAccion = "Actualizar skill técico";
				let mensajeEnvio = 'Ha ocurrido un error al actualizar el skill del técnico ' + tecnicoTemp.nombreCompleto;
	    		$q.all([
	    			skillsService.guardarInfoTecnico(params)
	    		]).then(function(results) {
					if (results[0].data !== undefined) {
						if (results[0].data.respuesta) {
							angular.forEach($scope.listaTecnicosTabla,function(tecnicoLista,index){
								if(tecnicoLista.idUsuario == tecnico.idUsuario){
									tecnico.skills = skillsAsignar;
									swal.close();
									mensajeEnvio = 'Se ha actualizado el skill del técnico ' + tecnicoTemp.nombreCompleto;
									objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
									swal("Correcto", "¡Registro actualizado con éxito!", "success");
								}
							});

						} else {
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
							mostrarMensajeWarningValidacion(results[0].data.resultDescripcion);
						}
					} else {
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						mostrarMensajeErrorAlert('Ha ocurrido un error actualizar ');
					}
	    		}).catch(err => handleError(err));
	        }
	      }).catch(err => {

	      });
	}
	
	$scope.guardarAsignacionTablaCompleta = function() {
		swal({
	        title: "Se guardarán las asignaciones de skills",
	        text: "\u00BFDesea registrar la asignación?",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: '#007bff',
	        confirmButtonText: 'Si',
	        cancelButtonText: 'Cancelar'
	      }).then(function (isConfirm) {
	        if (isConfirm) {
	        	let params = {
	    				skills:[]
	    		};
	    		var skillsAsignar = [];
	    		
	    		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
	    		swal.showLoading();
				let strTempName = "";
	    		angular.forEach($scope.listaTecnicosTabla,function(tecnico,index){
	    			angular.forEach(tecnico.todasSkills,function(skill,index){
	    				if(skill.checkTabla){
	    					skillsAsignar.push(skill.id);
	    				}
	    			});
	    			
	    			if(skillsAsignar == ""){
	    				skillsAsignar.push(0);
	    			}

					if($scope.listaTecnicosTabla.length -1 == index){
						strTempName = strTempName.concat(tecnico.nombreCompleto);
					}else{
						strTempName = strTempName.concat(tecnico.nombreCompleto + ", ");
					}
	    			
	    			let objetoTecnico = {
	    					idUsuario: tecnico.idUsuario,
	    					skills:skillsAsignar,
	    					comentarios: "Comentarios"
	    			}
	    			
	    			params.skills.push(objetoTecnico);
	    			
	    			skillsAsignar = [];
	    		});
	    		
				let tituloAccion = "Actualizar skill técicos";
				let mensajeEnvio = 'Ha ocurrido un error al actualizar el skill de los técnicos: ' + strTempName;
	    		$q.all([
	    			skillsService.guardarInfoTecnico(params)
	    		]).then(function(results) {
					if (results[0].data !== undefined) {
						if (results[0].data.respuesta) {
							swal.close();
							mensajeEnvio = 'Se ha actualizado el skill de los técnicos: ' + strTempName;
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
							swal("Correcto", "¡Registros actualizados con éxito!", "success");
						} else {
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
							mostrarMensajeWarningValidacion(results[0].data.resultDescripcion);
						}
					} else {
						objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
						mostrarMensajeErrorAlert('Ha ocurrido un error actualizar ');
					}
	
	    		}).catch(err => handleError(err));
	        }
	      }).catch(err => {

	      });	
	}
	
	$scope.guardarAsignacionSkillsMultiseleccion = function() {
		$scope.skillsSeleccionadasMultiseleccion = [];
		var skillsArbolMultiseleccion = $('#arbolSkillsMultiseleccion').jstree("get_selected", true);
		angular.forEach(skillsArbolMultiseleccion,function(skillSeleccionada,index){
			if(skillSeleccionada.original.nivel == $scope.nivelSkill){
				$scope.skillsSeleccionadasMultiseleccion.push(skillSeleccionada.id);
			}
		});

		if($scope.skillsSeleccionadasMultiseleccion != ""){
			swal({
				title: "Se guardarán las asignaciones de skills",
				text: "\u00BFDesea registrar la asignación?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: '#007bff',
				confirmButtonText: 'Si',
				cancelButtonText: 'Cancelar'
			}).then(function (isConfirm) {
				if (isConfirm) {
					let params = {
							skills:[]
					};
					
					swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
					swal.showLoading();
					
					var checkedTecnicosMultiseleccion = $(".checkedTecnicos");
					let strTempName = "";
					for(var check = 0; check < checkedTecnicosMultiseleccion.length; check++){
						if(checkedTecnicosMultiseleccion[check].checked == true){
							let objetoTecnico = {
									idUsuario: checkedTecnicosMultiseleccion[check].value,
									skills:$scope.skillsSeleccionadasMultiseleccion,
									comentarios: "Comentarios"
							}
							params.skills.push(objetoTecnico);
							let tecnicoTemp = $scope.tecnicosMostradas.find((t) => t.idUsuario == checkedTecnicosMultiseleccion[check].value)
							if(strTempName == ""){
								strTempName = strTempName.concat(tecnicoTemp.nombreCompleto);
							}else{
								strTempName = strTempName.concat(", " + tecnicoTemp.nombreCompleto);
							}	
						}
					}
					
					if($scope.tipoMultiseleccion == "0"){
						params.borrar = 1;
					}

					let tituloAccion = "Actualizar skill multiple";
					let mensajeEnvio = 'Ha ocurrido un error al actualizar los skill a los técnicos: ' + strTempName;
					$q.all([
						skillsService.guardarSkillsMultipleTecnicos(params)
					]).then(function(results) {
						if (results[0].data !== undefined) {
							if (results[0].data.respuesta) {
								swal.close();
								swal("Correcto", "¡Registros guardados con éxito!", "success");
								$('#arbolSkillsMultiseleccion').jstree("deselect_all");
								mensajeEnvio = 'Se ha actualizado los skill a los técnicos: ' + strTempName;
								objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
							} else {
								swal.close();
								$('#arbolSkillsMultiseleccion').jstree("deselect_all");
								objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
								mostrarMensajeWarningValidacion(results[0].data.resultDescripcion);
							}
						} else {
							swal.close();
							$('#arbolSkillsMultiseleccion').jstree("deselect_all");
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
							mostrarMensajeErrorAlert('Ha ocurrido un error actualizar ');
						}
				
					}).catch(err => handleError(err));
					$("#modalMultiseleccion").modal('hide');
					$("#divBotonGuardarSkills").hide();
					$("#divContadorTecnicos").hide();
					$("#divTecnicos").hide();
					$("#divContenedorSkills").hide();
					$("#divMensajeSeleccionaGeografia").show();
					$("#divMensajeSeleccionaTecnico").show();
					$('#arbolGeografiasVistaIndividual').jstree("deselect_all");
				}
			}).catch(err => {

			});
		}else{
			swal.close();
			swal("Aviso", "¡Selecciona al menos 1 Skill!", "warning");
		}
	}
	
	$scope.checkIntervencionTecnicoTabla = function(check) {
		
		if(check.checkTabla){
			$("#"+check.idCheck).prop("checked",false);
			check.checkTabla = false;
		}else{
			$("#"+check.idCheck).prop("checked",true);
			check.checkTabla = true;
		}
	}
	
	$("#vistatabla-tab").click(function() {
    	setTimeout(function (){
	        $("#idBuscadorTecnicoTabla").focus();
	    }, 750);
    });
	
	$scope.seleccionarSkillTodosTecnicos = function(idSkill) {
		var todasSkillCheck = true;
		
		angular.forEach($scope.listaTecnicosTabla,function(tecnico,index){
			angular.forEach(tecnico.todasSkills,function(skill,indexSkills){
				if(skill.id == idSkill){
					if(!skill.checkTabla){
						todasSkillCheck = false;
					}
				}
			});
		});
		angular.forEach($scope.listaTecnicosTabla,function(tecnico,index){
			angular.forEach(tecnico.todasSkills,function(skill,indexSkills){
				if(skill.id == idSkill){
					if(todasSkillCheck){
						skill.checkTabla = false;
					}else{
						skill.checkTabla = true;
					}
				}
			});
		});
	}
	
	$scope.busquedaSkillsMultiseleccion = function() {
    	$("#arbolSkillsMultiseleccion").jstree("search", $('#buscadorSkillsMultiseleccion').val());
	}
	
	$scope.contadorSkillsMultiseleccion = function() {
		var conSkillsArbolMultiseleccion = $('#arbolSkillsMultiseleccion').jstree("get_selected", true).length;
		$scope.contadorSkillsSeleccionadasMultiseleccion = conSkillsArbolMultiseleccion;
	}
	
	$scope.busquedaSkillsIndividual = function() {
    	$("#arbolSkillsVistaIndividual").jstree("search", $('#buscadorSkillConsultaVistaIndividual').val());
	}
	
	$scope.contadorSkillsVistaIndividual = function() {
		var conSkillsArbolIndividual = $('#arbolSkillsVistaIndividual').jstree("get_selected", true).length;
		$scope.contadorSkillsSeleccionadas = conSkillsArbolIndividual;
	}
	
	//-------------------------------------------------- FIN CAMBIOS REYNEL --------------------------------------------------
	$scope.seleccionarTodasSkillsMultiselectCheck = function() {
		if($("#checkTodasSkillsMultiSelect").prop('checked')){
			$("#arbolSkillsMultiseleccion").jstree().check_all(true);
		}else{
			$("#arbolSkillsMultiseleccion").jstree().uncheck_all(true);
		}
		$scope.contadorSkillsMultiseleccion();
	}
	
	$scope.seleccionarTodasSkillsMultiselectText = function() {
		if($("#checkTodasSkillsMultiSelect").prop('checked')){
			$("#checkTodasSkillsMultiSelect").prop("checked",false);
			$("#arbolSkillsMultiseleccion").jstree().uncheck_all(true);
		}else{
			$("#checkTodasSkillsMultiSelect").prop("checked",true);
			$("#arbolSkillsMultiseleccion").jstree().check_all(true);
		}
		$scope.contadorSkillsMultiseleccion();
	}
	
	$scope.seleccionarTodasSkillsVistaIndividualCheck = function() {
		if($("#checkTodasSkillsVistaIndividual").prop('checked')){
			$("#arbolSkillsVistaIndividual").jstree().check_all(true);
		}else{
			$("#arbolSkillsVistaIndividual").jstree().uncheck_all(true);
		}
		$scope.contadorSkillsVistaIndividual();
	}
	
	$scope.seleccionarTodasSkillsVistaIndividualText = function() {
		if($("#checkTodasSkillsVistaIndividual").prop('checked')){
			$("#checkTodasSkillsVistaIndividual").prop("checked",false);
			$("#arbolSkillsVistaIndividual").jstree().uncheck_all(true);
		}else{
			$("#checkTodasSkillsVistaIndividual").prop("checked",true);
			$("#arbolSkillsVistaIndividual").jstree().check_all(true);
		}
		$scope.contadorSkillsVistaIndividual();
	}
	
	$scope.cargarFiltrosGeneric();

	angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
		setTimeout(function (){
	        $("#idBuscadorGeografia").focus();
	    }, 750);
    });
	
}]);