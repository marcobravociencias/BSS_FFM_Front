var app = angular.module('skillsApp', []);
var tablePermisosDinamica;

app.controller('skillsController', ['$scope','$q','skillsService','$filter', function($scope, $q,skillsService, $filter) {
	//console.log("#http://localhost:7001/FFM/consultaOT")
	var skillTabla;
	var mapa_reasigna_cluster;
	var dataTecnicoGlobal=[];
	$scope.tecnicosMostradas=jsonTestingOperarios;
	$scope.listadoIntervenciones=jsonIntervenciones;
	$scope.listadoIntervenciones2=jsonIntervenciones;
	$scope.listadoIntervencionesTecnico=null;
	$scope.contadorSkillsSeleccionadas = 0;
	$scope.contadorTecnicosEncontrados = 0;
	$scope.listadoIntervencionesSeleccionadas=[];
	$scope.tecnicoSeleccionado = null;
	
//	$scope.jsonObjetosTree=[
//	       { "id" : "id1", "parent" : "#", "text" : "Ciudad de México" },
//	       { "id" : "id2", "parent" : "id1", "text" : "Iztapalapa" },
//	       { "id" : "id3", "parent" : "id1", "text" : "Coyoacán" },
//	       { "id" : "id4", "parent" : "id3", "text" : "Sección 1" },
//	       { "id" : "id5", "parent" : "id3", "text" : "Sección 2" },
//	       { "id" : "id6", "parent" : "id3", "text" : "Sección 3" },
//	       { "id" : "id7", "parent" : "id2", "text" : "Sección A" },
//	       { "id" : "id8", "parent" : "id2", "text" : "Sección B" },
//	       { "id" : "id9", "parent" : "id2", "text" : "Sección C" },
//	       
//	       { "id" : "id10", "parent" : "id6", "text" : "Colonia Doctores" },
//	       { "id" : "id11", "parent" : "id6", "text" : "Colonia Santo Domingo" },
//	       { "id" : "id12", "parent" : "id6", "text" : "Colonia Cristo" },
//	       { "id" : "id13", "parent" : "id6", "text" : "Ciudad Universitaria" },
//	       
//	       { "id" : "id14", "parent" : "id9", "text" : "Colonia Doctores" },
//	       { "id" : "id15", "parent" : "id9", "text" : "Colonia Santo Domingo" },
//	       { "id" : "id16", "parent" : "id9", "text" : "Colonia Cristo" },
//	       { "id" : "id17", "parent" : "id9", "text" : "Ciudad Universitaria" },
//	       
//	       { "id" : "id18", "parent" : "id17", "text" : "Colonia Doctores" },
//	       { "id" : "id19", "parent" : "id17", "text" : "Colonia Santo Domingo" },
//	       { "id" : "id20", "parent" : "id17", "text" : "Colonia Cristo" },
//	       { "id" : "id21", "parent" : "id17", "text" : "Ciudad Universitaria" }
//	    ];
	
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
		/*setTimeout(function() { $scope.guardarMultiplesSkills(); 
		swal("Correcto", "Registros actualizados con exito", "success");
		}, 800);*/
		
		
	}
	$(document.body).on('click','.guardarinfo-tecnico',function(){
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		console.log("ENTRA A GUARDAR TODOS LOS SKILLS")
		//$scope.guardarMultiplesSkills(); 
		setTimeout(function() { $scope.guardarMultiplesSkills(); 
		swal("Correcto", "Registros actualizados con exito", "success");
		}, 800);
	})
	

	$('#jstree-proton-3').on("click", function (e, data) {
		//$scope.contadorTecnicosEncontrados = 9;
		$('#contadorTecnicos').text("Técnicos encontrados: " + $scope.tecnicosMostradas.result.detalleTecnicos.length);
		$('#divTecnicos').show();
		$('#divContadorTecnicos').show();
		$('#divMensajeSeleccionaGeografia').hide();
		$('#divMensajeSeleccioneElemento').hide();

    });
	
	$scope.consultarSkillsAsignadasTecnico = function(idTecnico, nombreTecnico, primerApellido, segundoApellido){
		$('.checkTecnicoSeleccionado').hide();
		//$(this).css("background-color", "red");
		var tecnicoSeleccionado=document.getElementsByClassName("tecnicosDiv");
		for (var i=0; i<tecnicoSeleccionado.length; i++){
			tecnicoSeleccionado[i].style.backgroundColor="white";
		}
		document.getElementById(''+idTecnico).style.backgroundColor = "#DCDEDC";
		
		$scope.tecnicoSeleccionado = nombreTecnico + " " + primerApellido + " " + segundoApellido;
		
		$scope.listadoIntervencionesTecnico = null;
		if(idTecnico === 11){
			$scope.listadoIntervencionesTecnico = jsonIntervencionesId11;
		}else if(idTecnico === 12){
			$scope.listadoIntervencionesTecnico = jsonIntervencionesId12;
		}else if(idTecnico === 13){
			$scope.listadoIntervencionesTecnico = jsonIntervencionesId13;
		}
		
		if($scope.listadoIntervencionesTecnico != null){
			$scope.contadorSkillsSeleccionadas = $scope.listadoIntervencionesTecnico.length;
		}else{
			$scope.contadorSkillsSeleccionadas = 0;
		}
		
		angular.forEach($scope.listadoIntervenciones,function(intervencion,index){
			intervencion.check = 0;
		});
		
		angular.forEach($scope.listadoIntervencionesTecnico,function(skillAsignada,index){
			angular.forEach($scope.listadoIntervenciones,function(intervencion,index){
				if(intervencion.id == skillAsignada.id){
					intervencion.check = 1;
				}
			});
		});
		
		$('#divContenedorSkills').show();
		$('#divBotonGuardarSkills').show();
		$('#divMensajeSeleccionaTecnico').hide();
		$('#checkTecnicoSeleccionado'+idTecnico).show();
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
				if(skillSeleccionada.check === 1){
					$scope.listadoIntervencionesSeleccionadas.push(skillSeleccionada);
				}
			});
			$("#modalSkillsSeleccionadas").modal('show');
		}else{
			alertify.warning('¡No hay skills seleccionadas!');
		}
	}
	
	$scope.cerrarModalSkillsSeleccionadas = function() {
		$("#modalSkillsSeleccionadas").modal('hide');
	}
	
	$scope.mostrarContenedoresMultiseleccion = function(){
		$(".checkedTecnicos").prop("checked",true);
		$("#checkTotdosTecnicos").prop("checked",true);
		$("#modalMultiseleccion").modal('show');
		
		angular.forEach($scope.listadoIntervenciones,function(intervencion,index){
			intervencion.check = 0;
		});
		
		$scope.contadorSkillsSeleccionadas = 0;
		$('#contadorTecnicosMultiseleccion').text("Técnicos encontrados: " + $scope.tecnicosMostradas.result.detalleTecnicos.length);

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
		$("#divContenedorTabla").hide();
		$("#divContenedorIndividual").show();
	}
	
	$scope.verVistaTabla = function() {
		
		var listaSkills =  $scope.listadoIntervenciones;
		
		//Cada técnico
		angular.forEach($scope.tecnicosMostradas.result.detalleTecnicos,function(tecnico,index){
			if(tecnico.idTecnico == 11){
				tecnico.todasSkills = listaSkills;
				angular.forEach(tecnico.todasSkills,function(skill,indexSkills){
					angular.forEach(tecnico.skills,function(skillAsignada,indexSkillAsignada){
						if(skill.id == skillAsignada){
							skill.checkTabla = true;
						}else{
							if(skill.checkTabla != true){
								skill.checkTabla = false;
							}
						}
					});
				});
			}else{
				tecnico.todasSkills = listaSkills;
			}
			
		});
		
		//alert($scope.tecnicosMostradas.result.detalleTecnicos[1].nombre + "\n" +
			  //$scope.tecnicosMostradas.result.detalleTecnicos[1].todasSkills[0].checkTabla + "\n" +
			  //$scope.tecnicosMostradas.result.detalleTecnicos[1].todasSkills[1].checkTabla + "\n" +
			  //$scope.tecnicosMostradas.result.detalleTecnicos[1].todasSkills[2].checkTabla + "\n" +
			  //$scope.tecnicosMostradas.result.detalleTecnicos[1].todasSkills[3].checkTabla + "\n" +
			  //$scope.tecnicosMostradas.result.detalleTecnicos[1].todasSkills[4].checkTabla + "\n" +
			  //$scope.tecnicosMostradas.result.detalleTecnicos[1].todasSkills[5].checkTabla);
		
		$("#divContenedorIndividual").hide();
		$("#divContenedorTabla").show();
	}
	
	$scope.seleccionarTecnicoMultiseleccion = function (id) {
		if($("#checkTecnicoMultiseleccion"+id).prop('checked')){
			$("#checkTecnicoMultiseleccion"+id).prop("checked",false);
		}else{
			$("#checkTecnicoMultiseleccion"+id).prop("checked",true);
		}
	}
	
	//-------------------------------------------------- FIN CAMBIOS REYNEL --------------------------------------------------
	
	$scope.cargarFiltrosGeneric=function(){
        $q.all([
            skillsService.consulCatalogoGeografiaGeneralDespacho()
        ]).then(function(results) {
        //    console.log("entra de cualquier manera")
            

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
                                e.class = "xd";
                                
                                return e
                            })       
                            $('#jstree-proton-3').bind('loaded.jstree', function(e, data) {
								$(this).jstree("open_all");
                            }).jstree({
								'core': {
                                    //'data': $scope.jsonObjetosTree,
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
	
	$scope.buscTecnico=function(){
		var clusters = [];
			var selectedElms = $('#jstree-proton-3').jstree("get_selected", true);
			$.each(selectedElms, function() {
				clusters.push(this.id); 
		    });
		
	}
	  $scope.busqueda=function(){
		  //var searchString = $.trim($("#text-search-cluster").val());
		  //$('#jstree-proton-3').jstree('search', searchString);
		  //let ultimonivel=$scope.obtenerNivelUltimoJerarquia();
		  //var clusters = [];
		  //var selectedElms = $('#jstree-proton-3').jstree("get_selected", true);
		  //$.each(selectedElms, function() {
			  //clusters.push(this.id); 
		  //});
			//console.log("Busqueda: ",ultimonivel);
		  $("#jstree-proton-3").jstree("search", $('#idBuscadorGeografia').val());
	 }
	 
	
	$scope.guardarMultiplesSkills=function(){
		
		let tecnicosSkills=[]
		angular.forEach(dataTecnicoGlobal,function(elemento,index){
			let tecnicoguardado= {"id":'',"skill":'',"horario":""}
			let intervenciones=[]
			$("#tableSkillCuadrillaV2  .registroTecnico"+elemento.idUsuario+" .checkboxpermiso").each(function(i,e){
				if($(e).is(':checked')){
					intervenciones.push( $(e).attr('intervencionid'))
				}
			})
			tecnicoguardado.id=elemento.idUsuario
			tecnicoguardado.skill=intervenciones+""
			tecnicosSkills.push(tecnicoguardado)
			console.log("tecnico guardado",tecnicoguardado)
			let params = {
					  "skills": [
		   					 {
		     					 "idUsuario": 2,
		      "skills": [
		        			1,100
		      ],
		      "comentarios": "Comentarios"
		    }
		  ]
}
			skillsService.guardarInfoTecnico(params).then(function success(response) {
				//console.log(response);
			}).catch(err => handleError(err));
		})
		
	}
	
	$scope.guardarSkill=function(objectskill){
		
		
	}
	$scope.abrirModalGeografia=function(){
        $("#modal-jerarquia-filtro").modal('show')
    }
	
 
    
    
	$scope.iniciarTabla= function(data){
	
		tablePermisosDinamica = $('#tableSkillCuadrillaV2').DataTable({
			fixedColumns:   {
	            leftColumns: 1,
	            rightColumns: 1
	        },
			"scrollX": true,
			"autoWidth": true,		
			 

			
	        
	        scrollCollapse: true,
	        paging:         true,
	        "pageLength": 10,
			"info": true,
			"autoWidth": true,
			"language" : {
				"sProcessing" : "Procesando...",
				"sLengthMenu" : "Mostrar _MENU_ registros",
				"sZeroRecords" : "No se encontraron resultados",
				"sEmptyTable" : "Ning\u00fan resultado",
				"sEmptyTable" : "Ningun registro encontrado",
				"sInfo" :  "Total de registro filtrados en FFM _TOTAL_",
				"sInfoEmpty" : "Total de registro filtrados en FFM 0",
				"sInfoFiltered" : "(filtrado de un total de _MAX_ registros)",
				"sInfoPostFix" : "",
				"oPaginate" : {
					"sFirst" : "Primero",
					"sLast" : "\u00daltimo",
					"sNext" : "Siguiente",
					"sPrevious" : "Anterior"
				}
			},
			dom: 'Bfrtip',
			"columnDefs": [
				{ "width": "300px", "targets": 0 },
			  ]
		});
		
	}
	$scope.consultarTablaCuadrillasVacia=function(){
		
		let params = {
				idGeografia:[0],
				idTiposUsuarios:[0]
				
			}

			
			//console.log(params);
			swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
				skillsService.consultarTecnico(params).then(function success(response) {
				//console.log(response);
				//$scope.llenarTableDinamic(jsonIntervenciones,jsonUsuarioTest); 
				//dataTecnicoGlobal=jsonUsuarioTest;
				//Cuando el servicio retorne info quitar esta linea y descomentar la sección de abajo
				if (response.data.respuesta) {
					//console.log("###respuesta###",response.data.result);
				//	console.log("p",response.data.result.usuarios);
				//	console.log("a",jsonIntervenciones);
					$scope.llenarTableDinamic(jsonIntervenciones,response.data.result.usuarios);
					dataTecnicoGlobal=response.data.result;
					swal.close();
				
				} else {
					
				}
			}).catch(err => handleError(err));
		
	}
	$scope.consultarTablaCuadrillasv2 = function () {
		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
		let ultimonivel=$scope.obtenerNivelUltimoJerarquia();
		console.log("Ultimo nivel",ultimonivel);
		var clusters = [];
		var nivelC=0;
			var selectedElms = $('#jstree-proton-3').jstree("get_selected", true);
			$.each(selectedElms, function() {
				clusters.push(parseInt(this.id)); 
				
		    });
		    console.log("Nivel",selectedElms);
		  if(selectedElms.length>0){
		    nivelC=selectedElms[0].original.nivel;
		    
		   		if(ultimonivel==nivelC){
						let params = {
						idGeografia:clusters,
						idTiposUsuarios:[1,100]
				
					}

			
						console.log(clusters);
						skillsService.consultarTecnico(params).then(function success(response) {
						
						//$scope.llenarTableDinamic(jsonIntervenciones,jsonUsuarioTest); 
						//dataTecnicoGlobal=jsonUsuarioTest;
						//Cuando el servicio retorne info quitar esta linea y descomentar la sección de abajo
						if (response.data.respuesta) {	
						$scope.llenarTableDinamic(jsonIntervenciones,response.data.result.usuarios);
						dataTecnicoGlobal=response.data.result;
						} 
						swal.close();
						}).catch(err => handleError(err));
			
				}else{
					toastr.error( 'Seleccionar el cluster' ); 
					$scope.consultarTablaCuadrillasVacia();
			
				}
			}else{
				toastr.error( 'Seleccionar el cluster' ); 
				$scope.consultarTablaCuadrillasVacia();
			}
		

		}
	function removeDuplicates(array) {
		return [...new Set(array)]
	  }
	$scope.llenarTableDinamic=function(intervencionesSkillsTemp,tecnicosDisponibles){
		
		$scope.horarios=[{ "id": "41", "descripcion": "06:00-20:57" }, { "id": "42", "descripcion": "07:00-20:57" }, { "id": "1", "descripcion": "08:00-20:57" }, { "id": "43", "descripcion": "08:00-20:57" }, { "id": "21", "descripcion": "09:00-20:57" }, { "id": "44", "descripcion": "09:00-20:57" }, { "id": "45", "descripcion": "10:00-20:57" }, { "id": "46", "descripcion": "11:00-20:57" }, { "id": "2", "descripcion": "11:00-20:57" }, { "id": "47", "descripcion": "12:00-20:57" }, { "id": "48", "descripcion": "13:00-20:57" }, { "id": "49", "descripcion": "14:00-20:57" }];
		intervencionesSkillsTemp.map(function(e){
			e.id=parseInt(e.id);
			e.permiso=false;
			return e;
		})
		
		tecnicosDisponibles.map(function(e){
			e.intervencion=intervencionesSkillsTemp
			return e;
		})
		
		let intervencionesSkills=[]
		angular.forEach(tecnicosDisponibles,function(ele,index){
			ele.intervencion= JSON.parse( JSON.stringify( intervencionesSkillsTemp));
			ele.horarioactualizado=ele.idhorario
			if(ele.skills=== null)
				ele.skills=''
					
			intervencionesSkills=[]
			intervencionesSkills=removeDuplicates(ele.skills)  
				.map(function(e){
					e=parseInt(e)
					return e;
				}) 	
				
				ele.skills=intervencionesSkills;
			
			angular.forEach(ele.skills,function(skillInd,indexj){
				let intervencionEncontrada=_.findWhere(ele.intervencion, {'id': skillInd});
				//console.log(intervencionEncontrada)
				if(intervencionEncontrada!==undefined){
					intervencionEncontrada.permiso=true
					//console.log("entra true")
				}
					
				
			})
					
			
			
		})
			
		//console.log("###### ",tecnicosDisponibles)
		
		
		if( tablePermisosDinamica  )
			tablePermisosDinamica.destroy();

		$("#tableSkillCuadrillaV2 thead").empty()
		$("#tableSkillCuadrillaV2 tbody").empty()
		
		let temphead=''
		
			angular.forEach(intervencionesSkillsTemp,function(el,index){
				temphead+=`
					<th>${el.descripcion}</th>		
			`
				
			})
			
			$("#tableSkillCuadrillaV2 thead").append(
		`<tr class="active" style="height: 32px !important; font-size: 1.2em;">
			<th align="justify" ><small style="font-weight: 800; font-size:1em;">CUADRILLA</small></th> 		
			${temphead}
			<th>HORARIOS  </th>
			<th>GUARDAR</th>
		 </tr>`
			)
			angular.forEach(tecnicosDisponibles,function(tecnico,index){
				let temptdstennicos=''
					angular.forEach(tecnico.intervencion,function(intervencion,indexj){
						temptdstennicos+=`
							<th align=Center><input class="checkboxpermiso"  type="checkbox" intervencionid="${intervencion.id}"  ${intervencion.permiso ? 'checked' : '' } ></th>		
						`
							
					})
					let selectHorario='';
					angular.forEach($scope.horarios,function(horario,indexhorario){
						if(tecnico.horarioactualizado ===horario.id){
							selectHorario+=`<option  selected value="${horario.id}">${horario.descripcion}</option>`;

						}else{
							selectHorario+=`<option  value="${horario.id}">${horario.descripcion}</option>`;

						}
						
					})
					let textoper=`
						<div class="" style="height:35px !important"> 
							<div class="col-xs-2 text-left" style="float:left;margin-right: 20px; margin-top:4px; margin-left:15px;"> 
								<div style="border:.2em solid #36A9FF" class="photo-user">
								<img style="height: 26px; width: 27.5px;" src="./resources/img/operario/operario.svg"></div> 
							</div> 
							<div class="col-xs-9" style="overflow: hidden;"> 
								<div class="row text-left" style="word-wrap: break-word;"><h5 class="nombre_tecnico">${tecnico.nombreCompleto}</h5></div> 
								<div class="row text-left"><small class="numero_empleado">#${tecnico.usuario}</small></div> 
							</div> 
						</div> 
					`
					$("#tableSkillCuadrillaV2 tbody").append(`
						<tr class="registroTecnico${tecnico.idUsuario}">
							 <td align="center" style="background: #8345940a;">${textoper} </td>
							 ${temptdstennicos}
							 <td align=Center> 	
								<select tag-index="${index}" class="form-control selecthorariotecnicochange select-tecnico tecnicohorariosec${tecnico.idUsuario}" >
									${selectHorario}
								</select>
							</td>
							<td align="Center" > <span tag-index="${index}" tag-idtecnico="${tecnico.idUsuario}" class="guardarinfo-tecnico fa fa-floppy-o" aria-hidden="true" id="guardar"> </span> </td>	
						</tr>`)
			
		
				
			})
			
			
			$scope.iniciarTabla()
			
		
	}

	$scope.guardarTecnico=function(){
		
		let tecnicoguardado= {"id":'',"skill":"","horario":"1"}
		let tagindex=parseInt($(this).attr('tag-index'))
		let idtecnico=$(this).attr('tag-idtecnico')
		let idsIntervencion=[]
		$("#tableSkillCuadrillaV2  .registroTecnico"+elemento.idusuario+" .checkboxpermiso").each(function(i,e){
			if($(e).is(':checked')){
				intervenciones.push(parseInt($(e).attr('intervencionid')))
			}
		})
		tecnicoguardado.id=elemento.idusuario
		tecnicoguardado.skill=intervenciones+""
		tecnicosSkills.push(tecnicoguardado)
		console.log("Intervenciones: ",tecnicoguardado.skill)
	}
	
	
	$scope.consultarTablaCuadrillasVacia();
	
    function compareGeneric(a,b){
        let niveluno=a.nivel;
        let niveldos=b.nivel;
        if(niveluno>niveldos){ 
            return -1
        }else if( niveluno < niveldos){
            return 1
        } 
        return 0
    }
    $scope.obtenerNivelUltimoJerarquia=function(){
        return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
    }
    
 //$scope.consultarArbolDesasignaCluster();
	$scope.cargarFiltrosGeneric();
	$("#li-skills-navbar").addClass('active')
}]);