var app = angular.module('skillsApp', []);
var tablePermisosDinamica;

app.controller('skillsController', ['$scope','$q','skillsService','genericService','mainDespachoService','$filter', function($scope, $q,skillsService, genericService, mainDespachoService, $filter) {
	$("#moduloSkills").addClass('active');
	var dataTecnicoGlobal=[];
	$scope.tecnicosMostradas = [];
	$scope.listadoIntervenciones = [];
	$scope.listadoIntervencionesFiltro = [];
	$scope.idIntervenciones = [];
	
	
	$scope.listadoIntervencionesTecnico=null;
	$scope.contadorSkillsSeleccionadas = 0;
	$scope.contadorTecnicosEncontrados = 0;
	$scope.listadoIntervencionesSeleccionadas=[];
	$scope.tecnicoSeleccionado = null;
	$scope.idTecnicoSeleccionado = null;
	$scope.valorSlider = 0;
	
	$scope.skillsSeleccionadasIndividual = [];
	$scope.skillsSeleccionadasMultiseleccion = [];
	
	$scope.txtbusq='';
	
	$scope.busquedaT=function(){
		var busq=$scope.txtbusq;
		tablePermisosDinamica.search(busq).draw()
	}
	
	$scope.guardarSkills=function(){
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		console.log("ENTRA A GUARDAR TODOS LOS SKILLS")
		$scope.guardarMultiplesSkills(); 
	}
	
	$(document.body).on('click','.guardarinfo-tecnico',function(){
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		console.log("ENTRA A GUARDAR TODOS LOS SKILLS")
		setTimeout(function() { $scope.guardarMultiplesSkills(); 
		swal("Correcto", "Registros actualizados con exito", "success");
		}, 800);
	});

	$('#jstree-proton-3').on("select_node.jstree", function (e, data) {
		$scope.tecnicosMostradas = [];
		var idGeografia = $('#jstree-proton-3').jstree("get_selected", true);
		let params = {idGeografia:[idGeografia[0].id]};
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		skillsService.consultarTecnico(params).then(function success(response) {
			if (response.data.respuesta) {
				if(response.data.result.usuarios != ""){
					$scope.tecnicosMostradas = response.data.result.usuarios;
				}else{
					toastr.warning('¡No se encontraron técnicos asignados a la geografía seleccionada!');
				}
				$('#contadorTecnicos').text("Técnicos encontrados: " + $scope.tecnicosMostradas.length);
			} else {
					
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
    });
	
	$scope.consultarSkillsAsignadasTecnico = function(idTecnico, nombreTecnico, primerApellido, segundoApellido){
		$scope.contadorSkillsSeleccionadas = 0;
		$scope.idTecnicoSeleccionado = idTecnico;
		$('.checkTecnicoSeleccionado').hide();
		var tecnicoSeleccionado=document.getElementsByClassName("tecnicosDiv");
		for (var i=0; i<tecnicoSeleccionado.length; i++){
			tecnicoSeleccionado[i].style.backgroundColor="white";
		}
		document.getElementById(''+idTecnico).style.backgroundColor = "#DCDEDC";
		$scope.tecnicoSeleccionado = nombreTecnico + " " + primerApellido + " " + segundoApellido;
		
		if($scope.listadoIntervenciones == ""){
        	toastr.warning('¡No existen Skills actualmente!');
        }else{
        	angular.forEach($scope.listadoIntervenciones,function(intervencion,index){
    			intervencion.check = 0;
    		});
    		
    		angular.forEach($scope.tecnicosMostradas,function(tecnico,index){
    			if(idTecnico == tecnico.idUsuario){
    				angular.forEach($scope.listadoIntervenciones,function(intervencion,index){
    					angular.forEach(tecnico.skills,function(skillAsignada,indexSkillAsignada){
    						if(intervencion.id == skillAsignada && intervencion.check == 0){
    							intervencion.check = 1;
    							$scope.contadorSkillsSeleccionadas = $scope.contadorSkillsSeleccionadas + 1;
    						}
    					});
    				});
    			}
    		});
    		
    		$('#divContenedorSkills').show();
    		$('#divBotonGuardarSkills').show();
    		$('#divMensajeSeleccionaTecnico').hide();
    		$('#checkTecnicoSeleccionado'+idTecnico).show();
        }
		
	}
	
	$scope.sumarContador = function(estado){
		if(estado == 0){
			$scope.contadorSkillsSeleccionadas = $scope.contadorSkillsSeleccionadas + 1;
		}else{
			$scope.contadorSkillsSeleccionadas = $scope.contadorSkillsSeleccionadas - 1;
		}
	}
	
	$scope.abrirModalSkillsSeleccionadas = function(){
		if($scope.contadorSkillsSeleccionadas != 0){
			$scope.listadoIntervencionesSeleccionadas = [];
			
			angular.forEach($scope.listadoIntervenciones,function(skillSeleccionada,index){
				if(skillSeleccionada.check == 1){
					$scope.listadoIntervencionesSeleccionadas.push(skillSeleccionada);
				}
			});
			$("#modalSkillsSeleccionadas").modal('show');
		}else{
			toastr.warning('¡No hay skills seleccionadas!');
		}
	}
	
	$scope.cerrarModalSkillsSeleccionadas = function() {
		$("#modalSkillsSeleccionadas").modal('hide');
	}
	
	$scope.mostrarContenedoresMultiseleccion = function(){
		$('#divContenedorSkills').hide();
		$('#divBotonGuardarSkills').hide();
		$('#divMensajeSeleccionaTecnico').show();
		
		$(".checkedTecnicos").prop("checked",true);
		$("#checkTotdosTecnicos").prop("checked",true);
		$("#modalMultiseleccion").modal('show');
		
		angular.forEach($scope.listadoIntervenciones,function(intervencion,index){
			intervencion.check = 0;
		});
		
		$scope.contadorSkillsSeleccionadas = 0;
		$('#contadorTecnicosMultiseleccion').text("Técnicos encontrados: " + $scope.tecnicosMostradas.length);

	}
	
	$scope.regresarContenedorIndividual = function() {
		angular.forEach($scope.listadoIntervenciones,function(intervencion,index){
			intervencion.check = 0;
		});
		var tecnicoSeleccionado=document.getElementsByClassName("tecnicosDiv");
		for (var i=0; i<tecnicoSeleccionado.length; i++){
			tecnicoSeleccionado[i].style.backgroundColor="white";
		}
		$scope.contadorSkillsSeleccionadas = 0;
		$(".checkedTecnicos").prop("checked",false);
		$(".checkTecnicoSeleccionado").hide();
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
	
	$scope.abrirModalGeografiaTabla=function(){
		let params ={
				moduloAccionesUsuario: 'moduloSkills'
	    };
        $q.all([
            skillsService.consulCatalogoGeografiaGeneralDespacho(),
            genericService.consultarConfiguracionDespachoDespacho(params)
        ]).then(function(results) {
            if (results[0].data !== undefined) {
                if(results[0].data.respuesta ){
                    if(results[0].data.result ){
                        if(results[0].data.result.geografia){
                        	var nivelUsuario = results[1].data.result.N_FILTRO_GEOGRAFIA;
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
	                        $scope.listadogeografiacopy = listGeografias;
							geografia=listGeografias;
                            geografia.map((e)=>{
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                return e
                            })       
                            $('#arbolGeografiasVistaTabla').bind('loaded.jstree', function(e, data) {
								//$(this).jstree("open_all");
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
        
        $("#modalGeografiaTabla").modal('show');
    }
	
	$('#arbolGeografiasVistaTabla').on("select_node.jstree", function (e, data) {
		var idGeografia = $('#arbolGeografiasVistaTabla').jstree("get_selected", true);
		var x = [];
		let params = {idGeografia:[idGeografia[0].id]};
		if($scope.listadoIntervenciones == ""){
        	swal("Aviso", "¡No existen Skills actualmente!", "warning");
        }else{
        	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
    		swal.showLoading();
    		skillsService.consultarTecnico(params).then(function success(response) {
    			if (response.data.respuesta) {
    				if(response.data.result.usuarios != ""){
    					$scope.tecnicosMostradas = response.data.result.usuarios;
    					x = response.data.result.usuarios;
    					$("#divMensajeSeleccionaGeografiaVistaTabla").hide();
    					$('#contenedorTablaSkilssVistaTabla').show();
    					$('#tablaSkilssVistaTabla').find("th, td").show();
    					$("#checkOcultarMostrarColumnasTabla").prop("checked",true);
    					$(".checkSkillsVistaTabla").prop("checked",true);
    					var listaSkills =  $scope.listadoIntervenciones;
    					angular.forEach($scope.tecnicosMostradas,function(tecnico,index){
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
    							});
    					});
    					
    				}else{
    					$('#contenedorTablaSkilssVistaTabla').hide();
    					$("#divMensajeSeleccionaGeografiaVistaTabla").show();
    					toastr.warning('¡No se encontraron técnicos asignados a la geografía seleccionada!');
    				}
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
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
        $q.all([
            skillsService.consulCatalogoGeografiaGeneralDespacho(),
            genericService.consultarConfiguracionDespachoDespacho(params),
            mainDespachoService.consultarCatalogoTipoOrdenGeneralDespacho()
        ]).then(function(results) {
            if (results[0].data !== undefined) {
                if(results[0].data.respuesta ){
                    if(results[0].data.result ){
                        if(results[0].data.result.geografia){
                        	var nivelUsuario = results[1].data.result.N_FILTRO_GEOGRAFIA;
                        	var nivelSkill = results[1].data.result.N_FILTRO_INTERVENCIONES;
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
	                        $scope.listadogeografiacopy = listGeografias;
							geografia=listGeografias;
                            geografia.map((e)=>{
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                return e
                            })       
                            $('#jstree-proton-3').bind('loaded.jstree', function(e, data) {
								//$(this).jstree("open_all");
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
                            if(results[2].data.result == null){
                            	toastr.warning('¡No existen Skills actualmente!');
                            }
                            if(nivelSkill !== undefined){
                            	results[2].data.result.forEach(skill =>{
    	                            if (skill.nivel == nivelSkill) {
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
        swal.close();
    }
	
	$scope.busquedaGeografiaIndividual=function(){
		  $("#jstree-proton-3").jstree("search", $('#idBuscadorGeografia').val());
	 }
	
	$scope.guardarAsignacionSkillsIndividual = function() {
		$scope.skillsSeleccionadasIndividual = [];
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		angular.forEach($scope.listadoIntervenciones,function(skillSeleccionada,index){
			if(skillSeleccionada.check === 1){
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
		
		$q.all([
			skillsService.guardarInfoTecnico(params)
		]).then(function(results) {
			if(results[0].data.respuesta){
				angular.forEach($scope.tecnicosMostradas,function(tecnico,index){
					if(tecnico.idUsuario == $scope.idTecnicoSeleccionado){
						tecnico.skills = $scope.skillsSeleccionadasIndividual;
						swal.close();
						swal("Correcto", "¡Registro actualizado con éxito!", "success");
					}
				});
			}
		}).catch(err => handleError(err));
		//alert("ID Técnico: " + $scope.idTecnicoSeleccionado + "\n" +"Skills seleccionadas: " + $scope.skillsSeleccionadasIndividual);
	}
	
	$scope.guardarAsignacionSkillIndividualTabla = function(tecnico) {
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

		$q.all([
			skillsService.guardarInfoTecnico(params)
		]).then(function(results) {
			if(results[0].data.respuesta){
				angular.forEach($scope.tecnicosMostradas,function(tecnicoLista,index){
					if(tecnicoLista.idUsuario == tecnico.idUsuario){
						tecnico.skills = skillsAsignar;
						swal.close();
						swal("Correcto", "¡Registro actualizado con éxito!", "success");
					}
				});
			}
		}).catch(err => handleError(err));
	}
	
	$scope.guardarAsignacionTablaCompleta = function() {
		let params = {
				skills:[]
		};
		var skillsAsignar = [];
		
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		angular.forEach($scope.tecnicosMostradas,function(tecnico,index){
			angular.forEach(tecnico.todasSkills,function(skill,index){
				if(skill.checkTabla){
					skillsAsignar.push(skill.id);
				}
			});
			
			if(skillsAsignar == ""){
				skillsAsignar.push(0);
			}
			
			let objetoTecnico = {
					idUsuario: tecnico.idUsuario,
					skills:skillsAsignar,
					comentarios: "Comentarios"
			}
			
			params.skills.push(objetoTecnico);
			
			skillsAsignar = [];
		});
		
		$q.all([
			skillsService.guardarInfoTecnico(params)
		]).then(function(results) {
			if(results[0].data.respuesta){
				swal.close();
				swal("Correcto", "¡Registros actualizados con éxito!", "success");
			}
		}).catch(err => handleError(err));
	}
	
	$scope.guardarAsignacionSkillsMultiseleccion = function() {
		let params = {
				skills:[]
		};
		
		$scope.skillsSeleccionadasMultiseleccion = [];
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		angular.forEach($scope.listadoIntervenciones,function(skillSeleccionada,index){
			if(skillSeleccionada.check === 1){
				$scope.skillsSeleccionadasMultiseleccion.push(skillSeleccionada.id);
			}
		});
		
		if($scope.skillsSeleccionadasMultiseleccion != ""){
			var checkedTecnicosMultiseleccion = $(".checkedTecnicos");
			for(var check = 0; check < checkedTecnicosMultiseleccion.length; check++){
				if(checkedTecnicosMultiseleccion[check].checked == true){
					let objetoTecnico = {
							idUsuario: checkedTecnicosMultiseleccion[check].value,
							skills:$scope.skillsSeleccionadasMultiseleccion,
							comentarios: "Comentarios"
					}
					params.skills.push(objetoTecnico);
				}
			}
			
			$q.all([
				skillsService.guardarSkillsMultipleTecnicos(params)
			]).then(function(results) {
				if(results[0].data.respuesta){
					swal.close();
					swal("Correcto", "¡Registros guardados con éxito!", "success");
				}
			}).catch(err => handleError(err));
			$("#modalMultiseleccion").modal('hide');
			$("#divBotonGuardarSkills").hide();
			$("#divContadorTecnicos").hide();
			$("#divTecnicos").hide();
			$("#divContenedorSkills").hide();
			$("#divMensajeSeleccionaGeografia").show();
			$("#divMensajeSeleccionaTecnico").show();
			
		}else{
			swal.close();
			swal("Aviso", "¡Selecciona al menos 1 Skill!", "warning");
		}
	}
	
	//-------------------------------------------------- FIN CAMBIOS REYNEL --------------------------------------------------
	
	//$("#moduloSkills").addClass('active')
	$scope.cargarFiltrosGeneric();

	angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");
    });
}]);