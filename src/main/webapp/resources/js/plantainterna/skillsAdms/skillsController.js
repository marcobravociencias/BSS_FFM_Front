var app = angular.module('skillsApp', []);
var tablePermisosDinamica;

app.controller('skillsController', ['$scope','$q','skillsService','$filter', function($scope, $q,skillsService, $filter) {
	//console.log("#http://localhost:7001/FFM/consultaOT")
	var skillTabla;
	var mapa_reasigna_cluster;
	var dataTecnicoGlobal=[];
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

        });
    }
	
	$scope.buscTecnico=function(){
		var clusters = [];
			var selectedElms = $('#jstree-proton-3').jstree("get_selected", true);
			$.each(selectedElms, function() {
				clusters.push(this.id); 
		    });
		
	}
	  $scope.busqueda=function(){
		 var searchString = $.trim($("#text-search-cluster").val());
			$('#jstree-proton-3').jstree('search', searchString);
			let ultimonivel=$scope.obtenerNivelUltimoJerarquia();
			var clusters = [];
			var selectedElms = $('#jstree-proton-3').jstree("get_selected", true);
			$.each(selectedElms, function() {
				clusters.push(this.id); 
		    });
			 console.log("Busqueda: ",ultimonivel);
		 
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
			});
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
	
	$scope.consultarTablaCuadrillasv2 = function () {
		/*var clusters = [];
			var selectedElms = $('#jstree-proton-3').jstree("get_selected", true);
			$.each(selectedElms, function() {
				clusters.push(parseInt(this.id)); 
		    });*/
		   // console.log("Clus",clusters)
		let params = {
				idGeografia:[3302,3363,3461,3581,3582,3583,3584,3585],
				idTiposUsuarios:[1,100]
				
			}

			
			//console.log(params);
				skillsService.consultarTecnico(params).then(function success(response) {
				//console.log(response);
				$scope.llenarTableDinamic(jsonIntervenciones,jsonUsuarioTest); 
				dataTecnicoGlobal=jsonUsuarioTest;
				//Cuando el servicio retorne info quitar esta linea y descomentar la sección de abajo
				/*if (response.data.respuesta) {
					//console.log("###respuesta###",response.data.result);
				//	console.log("p",response.data.result.usuarios);
				//	console.log("a",jsonIntervenciones);
					$scope.llenarTableDinamic(jsonIntervenciones,response.data.result.usuarios);
					dataTecnicoGlobal=response.data.result;
					
				
				} else {
					
				}*/
			});

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
	
	
	$scope.consultarTablaCuadrillasv2();
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