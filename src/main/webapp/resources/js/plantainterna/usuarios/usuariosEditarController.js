app.editarUsuarioController=function($scope,usuarioPIService,$q){

	var existePadreMod = false;
    $scope.detalleUsuario = {};
    $scope.respuestaDetalleUsuario = {};
    $scope.listaAccesosSelecionadosMod = [];
    $scope.listaIntervencionesSelecionadasMod = [];
    $scope.confirmacionModificacion = {};
    $scope.listaCiudadesSelecionadasMod = [];
    $scope.puestoRegistrado = [];
    $scope.listaCiudadNatalMod = [];
    $scope.listaTecnicosMod = [];
    $scope.listaDespachosMod = [];
    $scope.listaIngenierosMod = [];
    $scope.listaSupervisoresCentralizadosMod = [];
    $scope.listaCouchsDespachosMod = [];
    $scope.listaSupervisoresMod = [];
    
    $scope.listaIdsGeografiaCiudadNatalMod = [];
    $scope.detalleUsuario.intervencionesId = [];
    $scope.detalleUsuario.geografiasId = [];
    $scope.detalleUsuario.permisosId = [];
    $scope.detalleUsuario.tecnicos = [];
	$scope.detalleUsuario.despachos = [];
    let acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    $scope.mostrarAccesosMod = false;
    $scope.mostrarTecnicosMod = false;
    $scope.mostrarDespachoMod = false;
    $scope.validarTamDatosMod = true;
    $scope.isTecnicoMod = false;
    $scope.contadorCambioArbolGeografias = false;
    $scope.fileFotoUsuarioMod = null;
    
//	CONFIGURACIÓN DE TABS
    $scope.configuracionPuestoRegistradoMod = null;
    
	$scope.tabInformacionMod = true;
	$scope.tabIntervencionesMod = false;
	$scope.tabArbolMod = false;
	$scope.tabAccesosMod = false;
	$scope.tabTecnicosMod = false;
	$scope.tabDespachosMod = false;
	$scope.tabPerfilesMod = false;
	$scope.tabIngenierosMod = false;
	$scope.tabSupervisorCentralizadoMod = false;
	$scope.tabCouchDespachoMod = false;
	$scope.tabSupervisorMod = false;
	$scope.tabConfirmacionMod = false;
	$scope.tabInformacionVW_ASIG_AUTOMATICA_mod = true;
	$scope.tabInformacionVW_CUADRILLA_mod = false;
	$scope.tabInformacionVL_RFC_mod = true;
	$scope.tabInformacionVL_CURP_mod = true;
	$scope.tabArbol_LB_N1_mod = "";
	$scope.tabArbol_LB_N2_mod = "";
	$scope.tabArbol_NV_GEOGRAFIA_mod;
	$scope.tabIntervenciones_NV_INTERVENCIONES_mod;
	$scope.tabTecnicosVL_MULTISELECCION_mod = true;
	$scope.tabDespachosVL_MULTISELECCION_mod = true;
	$scope.tabIngenierosVL_MULTISELECCION_mod = true;
	$scope.tabSupervisorCentralizadoVL_MULTISELECCION_mod = true;
	$scope.tabCouchDespachoVL_MULTISELECCION_mod = true;
	$scope.tabSupervisorVL_MULTISELECCION_mod = true;
	$scope.tabTecnicos_VL_CAMPOS_mod = false;
	$scope.tabDespachos_VL_CAMPOS_mod = false;
	$scope.tabIngenieros_VL_CAMPOS_mod = false;
	$scope.tabSupervisorCentralizado_VL_CAMPOS_mod = false;
	$scope.tabCouchDespacho_VL_CAMPOS_mod = false;
	$scope.tabSupervisor_VL_CAMPOS_mod = false;
	$scope.tabAccesosProhibidosMod = [];
	
	$scope.geoSelectMod = [];
	$scope.intervencionSelectMod = [];
	
	//VALIDACIÓN USUARIO EXISTENTE MOD
	$scope.existeUsuarioValidacionMod = false;

    //MÉTODO QUE REALIZA LA CONSULTA ESPECÍFICA POR ID DE USUARIO (CLIC EN BOTÓN DE MODIFICAR EN LA TABLA DE CONSULTA), Y PREPARA LA VISTA DE MODIFICACIÓN
    consultarDetalleUsuario = function(idUsuario) {
    	if($scope.configPermisoAccionEditaUsuarios){
    		
    		$scope.listaPerfilesArbolMod = [];
            $scope.listaMostrarPerfilesSeleccionadosMod = [];
    		
    		var valPermitirAutoModUsuario = true;
    		if($scope.validacionAutoModUsuario == false){
    			valPermitirAutoModUsuario = true;
    		}else{
    			if($("#idUsuarioSesion").val() == idUsuario){
    				valPermitirAutoModUsuario = false;
    			}else{
    				valPermitirAutoModUsuario = true;
    			}
    		}
    		
    		if(valPermitirAutoModUsuario){
    			swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
                $scope.params = {};
                $scope.params.idUsuario  = idUsuario;
                usuarioPIService.consultaUsuarioPorId($scope.params).then(function success(response) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                        	
                            // ********** PREPARA LOS DATOS DE LA PESTAÑA DE INFORMACION
                            $scope.detalleUsuario = response.data.result.usuario;
                            $("#compania_select_modificacion").val(""+$scope.detalleUsuario.idCompania);
                            $("#sexo_select_modificacion").val(""+$scope.detalleUsuario.genero);
                            if($scope.detalleUsuario.idAsignacionAutomatica == "1"){
                            	$("#checkAsignacionAutomaticaMod").text("  SI");
                            }else{
                            	$("#checkAsignacionAutomaticaMod").text("  NO");
                            }
                            
                            $scope.configuracionPuestoRegistradoMod = $scope.listaPuestos.filter(e => {return e.id == $scope.detalleUsuario.idTipoUsuario})[0];
                            angular.forEach($scope.configuracionPuestoRegistradoMod.tabs,function(tab,index){
                        		switch(tab.llaveFront){
                                	case "tabInformacion":
                                		$scope.tabInformacionMod = true;
                                		break;
                                	case "tabIntervenciones":
                                		$scope.tabIntervencionesMod = true;
                                		break;
                                	case "tabArbol":
                                		$scope.tabArbolMod = true;
                                		break;
                                	case "tabAccesos":
                                		$scope.tabAccesosMod = true;
                                		break;
                                	case "tabTecnicos":
                                		$scope.tabTecnicosMod = true;
                                		break;
                                	case "tabDespachos":
                                		$scope.tabDespachosMod = true;
                                		break;
                                	case "tabPerfiles":
                                		$scope.tabPerfilesMod = true;
                                		break;
                                	case "tabIngenieros":
                                		$scope.tabIngenierosMod = true;
                                		break;
                                	case "tabSupervisorCentralizado":
                                		$scope.tabSupervisorCentralizadoMod = true;
                                		break;
                                	case "tabCouchDespacho":
                                		$scope.tabCouchDespachoMod = true;
                                		break;
                                	case "tabSupervisor":
                                		$scope.tabSupervisorMod = true;
                                		break;
                                	case "tabConfirmacion":
                                		$scope.tabConfirmacionMod = true;
                                		break;
                        		}
                    		});
                            
                            $scope.tabInformacionVW_ASIG_AUTOMATICA_mod = true;
                            $scope.tabInformacionVW_CUADRILLA_mod = false;
                        	$scope.tabInformacionVL_RFC_mod = true;
                        	$scope.tabInformacionVL_CURP_mod = true;
                        	$scope.tabArbol_LB_N1_mod = "";
                        	$scope.tabArbol_LB_N2_mod = "";
                            $scope.tabIntervenciones_NV_INTERVENCIONES_mod = null;
                            $scope.tabTecnicosVL_MULTISELECCION_mod = true;
                        	$scope.tabDespachosVL_MULTISELECCION_mod = true;
                        	$scope.tabIngenierosVL_MULTISELECCION_mod = true;
                        	$scope.tabSupervisorCentralizadoVL_MULTISELECCION_mod = true;
                        	$scope.tabCouchDespachoVL_MULTISELECCION_mod = true;
                        	$scope.tabSupervisorVL_MULTISELECCION_mod = true;
                        	$scope.tabArbol_NV_GEOGRAFIA_mod = null;
                        	$scope.tabTecnicos_VL_CAMPOS_mod = false;
                        	$scope.tabDespachos_VL_CAMPOS_mod = false;
                        	$scope.tabIngenieros_VL_CAMPOS_mod = false;
                        	$scope.tabSupervisorCentralizado_VL_CAMPOS_mod = false;
                        	$scope.tabCouchDespacho_VL_CAMPOS_mod = false;
                        	$scope.tabSupervisor_VL_CAMPOS_mod = false;
                        	$scope.tabAccesosProhibidosMod = [];
                        	
                        	$scope.idPuestoTecnico = null;
                            $scope.idPuestoDespacho = null;
                            $scope.idPuestoIngeniero = null;
                            $scope.idPuestoSupervisorCentralizado = null;
                            $scope.idPuestoCouchDespacho = null;
                            $scope.idPuestoSupervisor = null;
                        	
                        	angular.forEach($scope.configuracionPuestoRegistradoMod.configuraciones,function(conf,index){
                        		
                        		switch(conf.llave){
	                        		case "tabInformacionVW_ASIG_AUTOMATICA":
	                        			if(conf.valor == "false"){
	                        				$scope.tabInformacionVW_ASIG_AUTOMATICA_mod = false;
	                        			}
	                	        		break;
	                	        	case "tabInformacionVW_CUADRILLA":
	                	        		if(conf.valor == "true"){
	                	        			$scope.tabInformacionVW_CUADRILLA_mod = true;
	                	        			if($scope.detalleUsuario.tipoCuadrilla !== undefined && $scope.detalleUsuario.tipoCuadrilla !== null &&$scope.detalleUsuario.tipoCuadrilla !== ""){
	                	        				var txtCuadrilla = $scope.listaResultCuadrillas.find((e) => e.id == $scope.detalleUsuario.tipoCuadrilla);
			                                    $("#cuadrilla_select_mod").val(txtCuadrilla.descripcion);
	                	        			}
	                	    			}
	                	        		break;
	                	        	case "tabArbol_LB_N1":
	                	        		$scope.tabArbol_LB_N1_mod = conf.valor;
	                	        		break;
	                	        	case "tabArbol_LB_N2":
	                	        		$scope.tabArbol_LB_N2_mod = conf.valor;
	                	        		break;
	                	        	case "tabInformacionVL_RFC":
	                	        		if(conf.valor+"" == "true"){
	                        				$scope.tabInformacionVL_RFC_mod = true;
	                        			}else if(conf.valor+"" == "false"){
	                        				$scope.tabInformacionVL_RFC_mod = false;
	                        			}
	                	        		break;
	                	        	case "tabInformacionVL_CURP":
	                	        		if(conf.valor+"" == "true"){
	                        				$scope.tabInformacionVL_CURP_mod = true;
	                        			}else if(conf.valor+"" == "false"){
	                        				$scope.tabInformacionVL_CURP_mod = false;
	                        			}
	                	        		break;
	                	        	case "tabArbol_NV_GEOGRAFIA":
	                	        		$scope.tabArbol_NV_GEOGRAFIA_mod = conf.valor;
	                	        		break;
	                	        	case "tabIntervenciones_NV_INTERVENCIONES":
	                	        		$scope.tabIntervenciones_NV_INTERVENCIONES_mod = conf.valor;
	                	        		break;
	                	        		
	                	        	case "tabTecnicosVL_MULTISELECCION":
	                	        		if(conf.valor+"" == "true"){
	                	        			$scope.tabTecnicosVL_MULTISELECCION_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabTecnicosVL_MULTISELECCION_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabDespachosVL_MULTISELECCION":
	                	        		if(conf.valor+"" == "true"){
	                	        			$scope.tabDespachosVL_MULTISELECCION_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabDespachosVL_MULTISELECCION_mod = false;
	                	    			}
	                	        		break;
	                	        		
	                	        	case "tabIngenierosVL_MULTISELECCION":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabIngenierosVL_MULTISELECCION_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabIngenierosVL_MULTISELECCION_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabSupervisorCentralizadoVL_MULTISELECCION":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabSupervisorCentralizadoVL_MULTISELECCION_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabSupervisorCentralizadoVL_MULTISELECCION_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabCouchDespachoVL_MULTISELECCION":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabCouchDespachoVL_MULTISELECCION_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabCouchDespachoVL_MULTISELECCION_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabSupervisorVL_MULTISELECCION":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabSupervisorVL_MULTISELECCION_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabSupervisorVL_MULTISELECCION_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabTecnicos_FL_TECNICOS":
	                	        		$scope.idPuestoTecnico = conf.valor;
	                	        		break;
	                	        	case "tabDespachos_FL_DESPACHOS":
	                	        		$scope.idPuestoDespacho = conf.valor;
	                	        		break;
	                	        	case "tabIngenieros_FL_INGENIEROS":
	                	        		$scope.idPuestoIngeniero = conf.valor;
	                	        		break;
	                	        	case "tabSupervisorCentralizado_FL_SUPERVISORES_CENTRALIZADOS":
	                	        		$scope.idPuestoSupervisorCentralizado = conf.valor;
	                	        		break;
	                	        	case "tabCouchDespacho_FL_COUCHS_DESPACHOS":
	                	        		$scope.idPuestoCouchDespacho = conf.valor;
	                	        		break;
	                	        	case "tabSupervisor_FL_SUPERVISORES":
	                	        		$scope.idPuestoSupervisor = conf.valor;
	                	        		break;
	                	        	case "tabTecnicos_VL_CAMPOS":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabTecnicos_VL_CAMPOS_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabTecnicos_VL_CAMPOS_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabDespachos_VL_CAMPOS":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabDespachos_VL_CAMPOS_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabDespachos_VL_CAMPOS_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabIngenieros_VL_CAMPOS":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabIngenieros_VL_CAMPOS_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabIngenieros_VL_CAMPOS_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabSupervisorCentralizado_VL_CAMPOS":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabSupervisorCentralizado_VL_CAMPOS_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabSupervisorCentralizado_VL_CAMPOS_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabCouchDespacho_VL_CAMPOS":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabCouchDespacho_VL_CAMPOS_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabCouchDespacho_VL_CAMPOS_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabSupervisor_VL_CAMPOS":
	                	        		if(conf.valor+"" == "true"){
	                	    				$scope.tabSupervisor_VL_CAMPOS_mod = true;
	                	    			}else if(conf.valor+"" == "false"){
	                	    				$scope.tabSupervisor_VL_CAMPOS_mod = false;
	                	    			}
	                	        		break;
	                	        	case "tabAccesosProhibidos":
	                	        		$scope.tabAccesosProhibidosMod = conf.valor.trim().split(",");
	                	        		break;
                        		}
                        		
                        	});
                        	
                        	$scope.existeUsuarioValidacionMod = false;
                            var puestoSeleccionado = "";
                            $scope.puestoRegistrado = [];
                            angular.forEach($scope.listaPuestos,function(puesto,index){
                            	if(puesto.id == $scope.detalleUsuario.idTipoUsuario){
                            		$scope.puestoRegistrado.push(puesto);
                            		$("#puesto_select_modificacion").val(""+$scope.detalleUsuario.idTipoUsuario);
                            		puestoSeleccionado = puesto.descripcion.toLowerCase();
                            		puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
                            		if(puestoSeleccionado == "tecnico"){
                            			$scope.isTecnicoMod = true;
                            			$scope.mostrarAccesosMod = false;
                            		    $scope.mostrarTecnicosMod = false;
                            		    $scope.mostrarDespachoMod = true;
                            		}else{
                            			$scope.isTecnicoMod = false;
                            			$scope.mostrarAccesosMod = true;
                            		    $scope.mostrarTecnicosMod = true;
                            		    $scope.mostrarDespachoMod = false;
                            		}
                            	}
                            });
                            
                            var fecha = $scope.detalleUsuario.fechaIngreso.substring(0, 10).split('-');
                            $scope.detalleUsuario.fechaIngreso = fecha[2] + "/" + fecha[1] + "/" + fecha[0];
                            
                            // ********** PREPARA LOS DATOS DE LA PESTAÑA DE INTERVENCIONES
                            $scope.arbolIntervencionesModificar = [];
                            $scope.arbolIntervencionesModificar = angular.copy($scope.listaIntervencionesRespaldo);
                            $scope.listaIntervencionesRegistradasMod = [];
                            $scope.detalleUsuario.intervencionesId = [];
                            let intervencionesListaMod = [];
                            
                            angular.forEach($scope.arbolIntervencionesModificar,function(intervencion,index){
                                if (intervencion.nivel <= $scope.tabIntervenciones_NV_INTERVENCIONES_mod) {
                                	intervencionesListaMod.push(intervencion);
                                }
                            });
                            
                            intervencionesListaMod.push({id: 0, nombre: "INTERVENCIONES", nivel: 0, idPadre: "#", state:{opened: true}});
                            intervencionesListaMod.map((e)=>{
                                e.parent = e.idPadre == null ? 0 : e.idPadre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                return e
                            }) 
                            
                            angular.forEach(intervencionesListaMod,(element,index) => {
                                angular.forEach($scope.detalleUsuario.intervenciones,(intervencion,index) => {
                                    if(element.id === intervencion.idTipoOrden) {
                                        element.state = {selected: true, opened: true}
                                        $scope.listaIntervencionesRegistradasMod.push(element);
                                    }
                                });
                            });
                            
                            $("#arbolIntervencionMod").jstree('destroy');
                            $('#arbolIntervencionMod').bind('loaded.jstree', function(e, data) {
                                //$(this).jstree("open_all");
                            }).jstree({
                                'plugins': ['search', 'checkbox'],
                                'search': {
        							"case_sensitive": false,
        							"show_only_matches": true
        						},
                                'core': {
                                    'data': intervencionesListaMod,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons":false        
                                    }
                                }
                            });

                            $scope.intervencionSelectMod = [];
                            $scope.listaIntervencionesRegistradasMod.forEach(intervencion =>{
                        		if(intervencion.nivel == $scope.tabIntervenciones_NV_INTERVENCIONES_mod){
                        			
                        			intervencion.intervencionesHijas = $scope.catalogoIntervenciones.filter(e => {return e.idPadre == intervencion.id});
                        			if(intervencion.intervencionesHijas.length < 1){
                        				intervencion.intervencionesHijas = [{nivel: intervencion.nivel, nombre: intervencion.nombre, idPadre: intervencion.idPadre}];
                        			}
                        			$scope.intervencionSelectMod.push(intervencion);
                        			
                        			var idPadre = intervencion.parent;
                        			$scope.listaIntervencionesSelecionadasMod.forEach(intervencionPadre =>{
                        				if(intervencionPadre.id == idPadre){
                        					existePadreMod = true;
                        					intervencionPadre.hijos.push(intervencion);
                        				}
                        			});
                        			if(existePadreMod){
                    				}else{
                    					$scope.listaIntervencionesRespaldo.forEach(intervencionesListaGeneral =>{
                    						if(intervencionesListaGeneral.id == idPadre){
                    							$scope.listaIntervencionesSelecionadasMod.push(intervencionesListaGeneral);
                    						}
                    					});
                    					$scope.listaIntervencionesSelecionadasMod.forEach(intervencionPadre =>{
                    	    				if(intervencionPadre.id == idPadre){
                    	    					intervencionPadre.hijos = [intervencion];
                    	    				}
                    	    			});
                    				}
                        			$scope.detalleUsuario.intervencionesId.push(intervencion.id);
                        			existePadreMod = false;
                        		}
                        	}); 
                            
                         // ********** PREPARA LOS DATOS DE LA PESTAÑA DE PERFILES
                            
                            $scope.listaPerfilesArbolMod = [];
                        	$scope.listaPerfilesArbolMod.push({tipo: "na", idTipo: "na", id: "perfiles", text: "PERFILES", parent: "#", icon: 'fa fa-globe', nivel: 0, state:{opened: true}});
                        	
                        	$scope.respaldoListaPerfilesMod = angular.copy($scope.listaPerfilesMod);
                        	
                        	angular.forEach($scope.respaldoListaPerfilesMod,function(perfil,indexPerfil){
                        		$scope.listaPerfilesArbolMod.push({tipo: "perfil", idTipo: perfil.id, id: perfil.id, text: perfil.descripcion, parent: "perfiles", icon: 'fa fa-globe', nivel: 0});
                        		angular.forEach(perfil.intervenciones,function(intervencion,indexIntervencion){
                        			
                        			angular.forEach($scope.detalleUsuario.idPerfilesOu,(intervencionPerfil,index) => {
                                        if(intervencion.id === intervencionPerfil.idTipoOrden && intervencion.nivel == 2) {
                                        	intervencion.state = {selected: true, opened: true}
                                        }
                                    });
                        			
                        			var idPadrePerfil = "";
                            		if (intervencion.nivel == 1) {
                            			idPadrePerfil = perfil.id;
                            		}else{
                            			idPadrePerfil = (intervencion.idPadre + "_" + (indexPerfil+1));
                            		}
                            		$scope.listaPerfilesArbolMod.push({
                            			tipo: "intervencion",
                        				idTipo: intervencion.id,
                        				id: intervencion.id + "_" + (indexPerfil+1),
                                        text: intervencion.descripcion,
                                        parent: idPadrePerfil,
                                        icon: 'fa fa-globe',
                                        nivel: parseInt(intervencion.nivel),
                                        perfil: perfil.id,
                                        state: intervencion.state
                        			});
                            	});
                        	});
                            
                            $("#arbolIntervencionPerfilMod").jstree('destroy');
                            $('#arbolIntervencionPerfilMod').bind('loaded.jstree', function(e, data) {
                                //$(this).jstree("open_all");
                            }).jstree({
                                'plugins': ['search', 'checkbox'],
                                'search': {
        							"case_sensitive": false,
        							"show_only_matches": true
        						},
                                'core': {
                                    'data': $scope.listaPerfilesArbolMod,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons":false        
                                    }
                                }
                            });
                            
                            setTimeout(function() {
                            	var intervencionesPerfilesTreeMod = $('#arbolIntervencionPerfilMod').jstree("get_selected", true);
                            	var listaPerfilesPadresMod = [];
                            	
                            	$('#arbolPerfilesSeleccionadosMod').jstree("destroy");
                            	if(intervencionesPerfilesTreeMod.length > 0){
                            		
                            		intervencionesPerfilesTreeMod.forEach(intervencion =>{
                                		if(intervencion.original.nivel == 2){
                                			intervencion.parents.forEach(padre =>{
                                    			var existePadre = listaPerfilesPadresMod.find((e) => e.id == padre);
                                    			if(existePadre == undefined){
                                    				var padrePerfil = $scope.listaPerfilesArbolMod.find((e) => e.id == padre);
                                    				if(padrePerfil != undefined){
                                    					listaPerfilesPadresMod.push(padrePerfil);
                                    				}
                                    			}
                                        	});
                                		}
                                	});
                                	
                                	listaPerfilesPadresMod.forEach(padre =>{
                                		var existePadre = intervencionesPerfilesTreeMod.find((e) => e.id == padre.id);
                                		if(existePadre == undefined){
                                			intervencionesPerfilesTreeMod.push(padre);
                                		}
                                	});
                                	
                                	$scope.listaMostrarPerfilesSeleccionadosMod = [];
                                	angular.forEach(intervencionesPerfilesTreeMod,function(intervencion,index){
                                		if(intervencion.original == undefined){
                                    		$scope.listaMostrarPerfilesSeleccionadosMod.push({
                                    			tipo: intervencion.tipo,
                                    			idTipo: intervencion.idTipo,
                                    			id: intervencion.id,
                                                text: intervencion.text,
                                                parent: intervencion.parent,
                                                icon: 'fa fa-globe',
                                                nivel: intervencion.nivel,
                                                perfil: intervencion.perfil
                                    		});
                                		}else{
                                			$scope.listaMostrarPerfilesSeleccionadosMod.push({
                                    			tipo: intervencion.original.tipo,
                                    			idTipo: intervencion.original.idTipo,
                                    			id: intervencion.original.id,
                                                text: intervencion.original.text,
                                                parent: intervencion.original.parent,
                                                icon: 'fa fa-globe',
                                                nivel: intervencion.original.nivel,
                                                perfil: intervencion.original.perfil
                                    		});
                                		}
                                	});
                                	
                                	$scope.listaMostrarPerfilesSeleccionadosMod.find((e) => e.id == "perfiles").text = "PERFILES SELECCIONADOS";
                            		
                            		$('#arbolPerfilesSeleccionadosMod').bind('loaded.jstree', function(e, data) {
                              			$(this).jstree("open_all");
                              			$(this).jstree('select_all');
                              			$(this).jstree().disable_node($(this).jstree().get_selected());
                                    }).jstree({
                                    	'plugins': ['search', 'checkbox', 'wholerow'],
                                    	'search': {
                              				"case_sensitive": false,
                              				"show_only_matches": true
                              			},
                              			'core': {
                              				'data': $scope.listaMostrarPerfilesSeleccionadosMod,
                                            'themes': {
                                                'name': 'proton',
                                                'responsive': true,
                                                "icons":false        
                                            }
                                        }
                              		});
                            		$scope.$apply();
                            	}
		    	        	}, 1000);

                            // ********** PREPARA LOS DATOS DE LA PESTAÑA DE ÁRBOL (GEOGRAFÍAS)
                            var plugins = [];
                        	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
                        		plugins = ['search'];
                        	}else{
                        		plugins = ['search', 'checkbox', 'wholerow'];
                        	}
                            
                            $scope.arbolCiudadesModificar = [];
                            $scope.listaGeografiasRegistradasMod = [];
                            $scope.detalleUsuario.geografiasId = [];
                            
                            $scope.arbolCiudadesModificar.push({id: 0, text: "GEOGRAFÍA", nivel: 0, parent: "#", state:{opened: true}});
                            angular.forEach($scope.listaGeografiasRespaldo,(element,index) => {
                                if(element.nivel <= $scope.tabArbol_NV_GEOGRAFIA_mod){
                                    $scope.arbolCiudadesModificar.push({
                                        id: element.id,
                                        text: element.nombre,
                                        parent: element.padre == null ? 0 : element.padre,
                                        icon: "fa fa-tag",
                                        nivel: element.nivel
                                    });
                                }
                            });

                            angular.forEach($scope.arbolCiudadesModificar,(element,index) => {
                                angular.forEach($scope.detalleUsuario.geogragias,(geogra,index) => {
                                    if(element.id === geogra.idGeografia) {
                                        element.state = {selected: true, opened: true}
                                        $scope.listaGeografiasRegistradasMod.push(element);
                                    }
                                });
                            });

                            $("#arbolGeografiaMod").jstree('destroy');
                            $('#arbolGeografiaMod').bind('loaded.jstree', function(e, data) {
                                //$(this).jstree("open_all");
                            }).jstree({
                            	'plugins': plugins,
                            	'search': {
        							"case_sensitive": false,
        							"show_only_matches": true
        						},
                                'core': {
                                    'data': $scope.arbolCiudadesModificar,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons":false        
                                    }
                                }
                            });

                            $("#arbolGeografiaMod").on('changed.jstree', function (e, data) {
                            	$scope.geoSelectMod = [];
                            	if($scope.detalleUsuario.geogragias.length < 1){
                            		$scope.contadorCambioArbolGeografias = true;
                            	}
                            	if($scope.contadorCambioArbolGeografias == true){
                            		$scope.listaCiudadesSelecionadasMod = [];
                                	$scope.detalleUsuario.geografiasId = [];
                                	$scope.listaCiudadNatalMod = [];
                                	$scope.listaIdsGeografiaCiudadNatalMod = [];
                                	$scope.listaTecnicosMod = [];
                                	$scope.detalleUsuario.ciudadNatal = "";
                                    var geografiaTreeMod = $('#arbolGeografiaMod').jstree("get_selected", true);
                                    geografiaTreeMod.forEach(geo =>{
                                    	if(geo.original.nivel == $scope.tabArbol_NV_GEOGRAFIA_mod){
                                    		
                                    		geo.geoHijas = $scope.catalogoGeografias.filter(e => {return e.padre == geo.id});
                                			if(geo.geoHijas.length < 1){
                                				geo.geoHijas = [{nivel: geo.original.nivel, nombre: geo.original.nombre, padre: geo.original.padre}];
                                			}
                                			$scope.geoSelectMod.push(geo);
                                    		
                                			var idPadre = geo.parent;
                                			$scope.listaCiudadesSelecionadasMod.forEach(geoPadre =>{
                                				if(geoPadre.id == idPadre){
                                					existePadreMod = true;
                                					geoPadre.hijos.push(geo);
                                				}
                                			});
                                			if(existePadreMod){
                            				}else{
                            					$scope.listaGeografiasRespaldo.forEach(geoListaGeneral =>{
                            						if(geoListaGeneral.id == idPadre){
                            							$scope.listaCiudadesSelecionadasMod.push(geoListaGeneral);
                            						}
                            					});
                            					$scope.listaCiudadesSelecionadasMod.forEach(geoPadre =>{
                            	    				if(geoPadre.id == idPadre){
                            	    					geoPadre.hijos = [geo];
                            	    				}
                            	    			});
                            				}

                                			$scope.detalleUsuario.geografiasId.push(geo.id);
                                			existePadreMod = false;
                                		}
                                    });
                                    
                                    $scope.listaCiudadesSelecionadasMod.forEach(geoHija =>{
                                		var geo = geoHija;
                                		while(geo.nivel > 2){
                                			var ciudadPadre = $scope.listaGeografiasRespaldo.filter(e => {return e.id == geo.parent})[0];
                                			geo = ciudadPadre;
                                		}
                                		var existeCiudadNatal = false;
                                		$scope.listaCiudadNatalMod.forEach(ciudadesNatal =>{
                                			if(ciudadesNatal.id == geo.id){
                                				existeCiudadNatal = true;
                                			}
                                		});
                                		if(existeCiudadNatal == false){
                                			$scope.listaCiudadNatalMod.push(geo);
                                			$scope.listaIdsGeografiaCiudadNatalMod.push(geo.id);
                                		}
                                		
                                	});
                                    
                                    $scope.listaCiudadNatalMod.forEach(ciudadesNatal =>{
                            			if(ciudadesNatal.id == $scope.detalleUsuario.idGeografia){
                            				$scope.detalleUsuario.ciudadNatal = $scope.detalleUsuario.idGeografia;
                            				$(".ciudadNatalMod").css("color", "#7c7c7d");
                            			}
                            		});
                                	
                                	if(geografiaTreeMod.length > 0){
                                		
                                		if($scope.tabTecnicosMod){
                                    		$scope.consultarTecnicosMod();
                                    	}
                                		if($scope.tabDespachosMod){
                                			$scope.consultarDespachosMod();
                                    	}
                                		if($scope.tabIngenierosMod){
                                			$scope.consultarIngenierosMod();
                                		}
                                		if($scope.tabSupervisorCentralizadoMod){
                                			$scope.consultarSupervisoresCentralizadosMod();
                                		}
                                		if($scope.tabCouchDespachoMod){
                                			$scope.consultarCouchsDespachoMod();
                                		}
                                		if($scope.tabSupervisorMod){
                                			$scope.consultarSupervisoresMod();
                                		}
                                		
                                	}
                                	
                                	if($scope.listaCiudadesSelecionadasMod.length > 0){
                                		$("#labelGeografiasSeleccionadasMod").css("color", "rgb(70, 88, 107)");
                                		$("#contenedorGeografiasRegistroMod").css("border", "white solid 0px");
                                	}
                                    
                                    $scope.$apply();
                            	}
                            	$scope.contadorCambioArbolGeografias = true;
                            });
                            
                            // ********** PREPARA LOS DATOS DE LA PESTAÑA DE ACCESOS (PERMISOS)
                            
                            $scope.arbolAccesosModificar = angular.copy($scope.listaPermisosRespaldo);
                            $scope.arbolAccesosModificar.push({id: 0, nombre: "PERMISOS", nivel: 0, idPadre: "#", state:{opened: true}});
                            $scope.arbolAccesosModificar.map((e)=>{
                    			e.parent = e.idPadre == null ? 0 : e.idPadre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                return e
                            });
                            
                            $scope.arbolAccesosModificar = $scope.arbolAccesosModificar.filter(item => !$scope.tabAccesosProhibidosMod.includes(item.parent+''));
                            $scope.arbolAccesosModificar = $scope.arbolAccesosModificar.filter(item => !$scope.tabAccesosProhibidosMod.includes(item.id+''));
                            
                            $scope.listaAccesosRegistradosMod = [];
                            $scope.detalleUsuario.permisosId = [];
                            
                            angular.forEach($scope.arbolAccesosModificar,(element,index) => {
                                angular.forEach($scope.detalleUsuario.accesos,(acceso,index) => {
                                    if(element.id === acceso.idPermiso) {
                                        element.state = {selected: true, opened: true}
                                        $scope.listaAccesosRegistradosMod.push(element);
                                    }
                                });
                            });
                            
                            $("#arbolPermisoMod").jstree('destroy');
                            $('#arbolPermisoMod').bind('loaded.jstree', function(e, data) {
                                //$(this).jstree("open_all");
                            }).jstree({
                                'plugins': ['search', 'checkbox'],
                                'search': {
        							"case_sensitive": false,
        							"show_only_matches": true
        						},
                                'core': {
                                    'data': $scope.arbolAccesosModificar,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons":false        
                                    }
                                }
                            });

                            $scope.listaAccesosRegistradosMod.forEach(permiso =>{
                        		if(permiso.nivel == 2){
                        			var idPadre = permiso.parent;
                        			$scope.listaAccesosSelecionadosMod.forEach(permisosPadre =>{
                        				if(permisosPadre.id == idPadre){
                        					existePadreMod = true;
                        					permisosPadre.hijos.push(permiso);
                        				}
                        			});
                        			if(existePadreMod){
                    				}else{
                    					$scope.listaPermisosRespaldo.forEach(permisosListaGeneral =>{
                    						if(permisosListaGeneral.id == idPadre){
                    							$scope.listaAccesosSelecionadosMod.push(permisosListaGeneral);
                    						}
                    					});
                    					$scope.listaAccesosSelecionadosMod.forEach(permisosPadre =>{
                    	    				if(permisosPadre.id == idPadre){
                    	    					permisosPadre.hijos = [permiso];
                    	    				}
                    	    			});
                    				}
                        			$scope.detalleUsuario.permisosId.push(permiso.id);
                        			existePadreMod = false;
                        		}
                        	});

                            // ********** CONFIRMAR USUARIO
                            $scope.detalleUsuario.ciudadNatal = $scope.detalleUsuario.idGeografia;
                            if($scope.detalleUsuario.urlFotoPerfil != null){
                            	$scope.fileFotoUsuarioMod = {};
                            	$scope.fileFotoUsuarioMod.nombre = $scope.detalleUsuario.numeroEmpleado;
            					$scope.fileFotoUsuarioMod.nuevaFoto = false; 
                            	$("#imgFotoUsuarioMod").attr("src", ""+$scope.detalleUsuario.urlFotoPerfil);
                            }else{
                            	$scope.fileFotoUsuarioMod = null;
                            	$("#imgFotoUsuarioMod").attr("src", "./resources/img/plantainterna/despacho/tecnicootasignada.png");
                            }
                            $("#modalEdicionUsuario").modal({ backdrop: 'static', keyboard: false });
                            $("#modalEdicionUsuario").modal('show');
                            $("#cuadrilla_select_mod").val(txtCuadrilla.descripcion);
                        } else {
                        	toastr.warning(response.data.result.mensaje)
                        }
                        swal.close();
                    } else {
                    	toastr.warning(response.data.resultDescripcion);
                        swal.close();
                    }
                    
                }).catch(err => handleError(err));
    		}else{
    			//swal({type: "info", title:"Aviso", text:"No cuentas con el permiso de auto edición."});
    		}
    	}else{
    		swal({type: "warning", title:"Aviso", text:"No cuentas con el permiso de edición."});
    	}
    }
    
    //INICIA EL CAMPO DE FECHA DE INGRESO
    $scope.iniciarFechaMod = function () {
        $('#form-fechaIngreso-mod').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true,
            clearBtn: false
        });
    }
    $scope.iniciarFechaMod();

    //MÉTODO QUE ASIGNA LA/LAS INTERVENCIÓN(ES) SELECCIONADA(S) A LA LISTA PARA MOSTRAR Y MODIFICAR - PESTAÑA INTERVENCIONES MODIFICAR USUARIO
    $("#arbolIntervencionMod").click(function() {
    	$scope.listaIntervencionesSelecionadasMod = [];
    	$scope.detalleUsuario.intervencionesId = [];
    	$scope.intervencionSelectMod = [];
    	
        var intervencionesTree = $('#arbolIntervencionMod').jstree("get_selected", true);
        intervencionesTree.forEach(intervencion =>{
            var existePadreMod = false;
            if(intervencion.original.nivel == $scope.tabIntervenciones_NV_INTERVENCIONES_mod){
            	intervencion.idPadre = intervencion.perent;
            	intervencion.nombre = intervencion.text;
            	
            	intervencion.intervencionesHijas = $scope.catalogoIntervenciones.filter(e => {return e.idPadre == intervencion.id});
    			if(intervencion.intervencionesHijas.length < 1){
    				intervencion.intervencionesHijas = [{nivel: intervencion.nivel, nombre: intervencion.nombre, idPadre: intervencion.idPadre}];
    			}
    			$scope.intervencionSelectMod.push(intervencion);
            	
    			var idPadre = intervencion.original.idPadre;
    			$scope.listaIntervencionesSelecionadasMod.forEach(intervencionPadre =>{
    				if(intervencionPadre.id == idPadre){
    					existePadreMod = true;
    					intervencionPadre.hijos.push(intervencion);
    				}
    			});
    			if(existePadreMod){
				}else{
					$scope.listaIntervencionesRespaldo.forEach(intervencionesListaGeneral =>{
						if(intervencionesListaGeneral.id == idPadre){
							$scope.listaIntervencionesSelecionadasMod.push(intervencionesListaGeneral);
						}
					});
					$scope.listaIntervencionesSelecionadasMod.forEach(intervencionPadre =>{
	    				if(intervencionPadre.id == idPadre){
	    					intervencionPadre.hijos = [intervencion];
	    				}
	    			});
				}

    			$scope.detalleUsuario.intervencionesId.push(intervencion.id);
    			existePadreMod = false;
    		}
        });
        
        if($scope.listaIntervencionesSelecionadasMod.length > 0){
        	$("#labelIntervencionesSeleccionadasMod").css("color", "rgb(70, 88, 107)");
        	$("#contenedorIntervencionesRegistroMod").css("border", "white solid 0px");
        }
        $scope.$apply();
    });

  //MÉTODO QUE ASIGNA LOS PERFILES SELECCIONADOS A LA LISTA PARA MOSTRAR Y MODIFICAR - PESTAÑA PERFILES MODIFICAR USUARIO
    $("#arbolIntervencionPerfilMod").click(function() {
    	var intervencionesPerfilesTreeMod = $('#arbolIntervencionPerfilMod').jstree("get_selected", true);
    	var listaPerfilesPadresMod = [];
    	
    	$('#arbolPerfilesSeleccionadosMod').jstree("destroy");
    	if(intervencionesPerfilesTreeMod.length > 0){
    		
    		intervencionesPerfilesTreeMod.forEach(intervencion =>{
        		if(intervencion.original.nivel == 2){
        			intervencion.parents.forEach(padre =>{
            			var existePadre = listaPerfilesPadresMod.find((e) => e.id == padre);
            			if(existePadre == undefined){
            				var padrePerfil = $scope.listaPerfilesArbolMod.find((e) => e.id == padre);
            				if(padrePerfil != undefined){
            					listaPerfilesPadresMod.push(padrePerfil);
            				}
            			}
                	});
        		}
        	});
        	
        	listaPerfilesPadresMod.forEach(padre =>{
        		var existePadre = intervencionesPerfilesTreeMod.find((e) => e.id == padre.id);
        		if(existePadre == undefined){
        			intervencionesPerfilesTreeMod.push(padre);
        		}
        	});
        	
        	$scope.listaMostrarPerfilesSeleccionadosMod = [];
        	angular.forEach(intervencionesPerfilesTreeMod,function(intervencion,index){
        		if(intervencion.original == undefined){
            		$scope.listaMostrarPerfilesSeleccionadosMod.push({
            			tipo: intervencion.tipo,
            			idTipo: intervencion.idTipo,
            			id: intervencion.id,
                        text: intervencion.text,
                        parent: intervencion.parent,
                        icon: 'fa fa-globe',
                        nivel: intervencion.nivel,
                        perfil: intervencion.perfil
            		});
        		}else{
        			$scope.listaMostrarPerfilesSeleccionadosMod.push({
            			tipo: intervencion.original.tipo,
            			idTipo: intervencion.original.idTipo,
            			id: intervencion.original.id,
                        text: intervencion.original.text,
                        parent: intervencion.original.parent,
                        icon: 'fa fa-globe',
                        nivel: intervencion.original.nivel,
                        perfil: intervencion.original.perfil
            		});
        		}
        	});
        	
        	$scope.listaMostrarPerfilesSeleccionadosMod.find((e) => e.id == "perfiles").text = "PERFILES SELECCIONADOS";
    		
    		$('#arbolPerfilesSeleccionadosMod').bind('loaded.jstree', function(e, data) {
      			$(this).jstree("open_all");
      			$(this).jstree('select_all');
      			$(this).jstree().disable_node($(this).jstree().get_selected());
            }).jstree({
            	'plugins': ['search', 'checkbox', 'wholerow'],
            	'search': {
      				"case_sensitive": false,
      				"show_only_matches": true
      			},
      			'core': {
      				'data': $scope.listaMostrarPerfilesSeleccionadosMod,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons":false        
                    }
                }
      		});
    	}
    	$("#labelIntervencionesPerfilesSeleccionadosMod").css("color", "rgb(70, 88, 107)");
		$("#contenedorIntervencionesPerfilesMod").css("border", "white solid 0px");
        $scope.$apply();
    });
    
    //MÉTODO QUE ASIGNA EL/LOS PERMISO(S) SELECCIONADO(S) A LA LISTA PARA MOSTRAR Y MODIFICAR - PESTAÑA ACCESOS MODIFICAR USUARIO
    $("#arbolPermisoMod").click(function() {
    	$scope.listaAccesosSelecionadosMod = [];
    	$scope.detalleUsuario.permisosId = [];
        var permisos = $('#arbolPermisoMod').jstree("get_selected", true);
        permisos.forEach(permiso =>{
            var existePadreMod = false;
            if(permiso.original.nivel == 2){
    			var idPadre = permiso.original.idPadre;
    			$scope.listaAccesosSelecionadosMod.forEach(permisosPadre =>{
    				if(permisosPadre.id == idPadre){
    					existePadreMod = true;
    					permisosPadre.hijos.push(permiso);
    				}
    			});
    			if(existePadreMod){
				}else{
					$scope.listaPermisosRespaldo.forEach(permisosListaGeneral =>{
						if(permisosListaGeneral.id == idPadre){
							$scope.listaAccesosSelecionadosMod.push(permisosListaGeneral);
						}
					});
					$scope.listaAccesosSelecionadosMod.forEach(permisosPadre =>{
	    				if(permisosPadre.id == idPadre){
	    					permisosPadre.hijos = [permiso];
	    				}
	    			});
				}
    			$scope.detalleUsuario.permisosId.push(permiso.id);
    			existePadreMod = false;
    		}
        });
        
        if($scope.listaAccesosSelecionadosMod.length > 0){
        	$("#labelPermisosSeleccionadasMod").css("color", "rgb(70, 88, 107)");
        	$("#contenedorPermisosRegistroMod").css("border", "white solid 0px");
        }
        $scope.$apply();
    });
    
    //CUANDO SELECCCIONE UNA CIUDAD NATAL LOS RADIOS REGRESAN A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA CONFIRMACIÓN MODIFICACIÓN USUARIO
    $scope.asignarCiudadNatalMod = function() {
    	$(".ciudadNatalMod").css("color", "#7c7c7d");
	}
    
    //MÉTODO PARA VALIDACIÓN DE INFORMACIÓN DE LOS DATOS MOSTRADOS EN LA VISTA - PESTAÑA CONFIRMACIÓN MOD USUARIO
    $scope.cargarInfoConfirmacionModificacion = function() {
    	$scope.confirmacionModificacion.nombre = 
          $scope.detalleUsuario.nombre !== undefined && $scope.detalleUsuario.nombre !== "" &&
          $scope.detalleUsuario.apellidoPaterno !== undefined && $scope.detalleUsuario.apellidoPaterno !== "" &&
          $scope.detalleUsuario.apellidoMaterno !== undefined && $scope.detalleUsuario.apellidoMaterno !== "" ?
          $scope.detalleUsuario.nombre + ' ' + $scope.detalleUsuario.apellidoPaterno + ' ' + $scope.detalleUsuario.apellidoMaterno : "Sin asignar";
    	$scope.confirmacionModificacion.usuario = $scope.detalleUsuario.usuario !== undefined && $scope.detalleUsuario.usuario !== "" ? $scope.detalleUsuario.usuario : "Sin asignar";
    	$scope.confirmacionModificacion.correo = $scope.detalleUsuario.correo !== undefined && $scope.detalleUsuario.correo !== "" ? $scope.detalleUsuario.correo : "Sin asignar";
    	$scope.confirmacionModificacion.contrasena = $scope.detalleUsuario.contrasena !== undefined && $scope.detalleUsuario.contrasena !== "" ? $scope.detalleUsuario.contrasena : "Sin asignar";
    	$scope.confirmacionModificacion.puesto = $("#puesto_select_modificacion option:selected").text();
    	$scope.confirmacionModificacion.fechaIngreso = $scope.detalleUsuario.fechaIngreso !== undefined && $scope.detalleUsuario.fechaIngreso !== "" ? $scope.detalleUsuario.fechaIngreso : "Sin asignar";
    }
    
    //VERIFICA EL ESTADO DEL CHECK PARA COLOCAR 'SI' O 'NO', SEGÚN EL ESTADO - PESTAÑA INFORMACIÓN MODIFICACUÓN USUARIO
	$scope.cambiarCheckAsignacionAutomaticaMod = function() {
		if($("#form-asignacionAutomatica-mod").prop('checked')){
			$("#checkAsignacionAutomaticaMod").text("  SI");
		}else{
			$("#checkAsignacionAutomaticaMod").text("  NO");
		}
	}
	
	//SELECCIONA O DESELECCIONA EL TÉCNICO ELEGIDO - PESTAÑA TÉCNICOS MODIFICACUÓN USUARIO
	$scope.seleccionarTecnicoMod = function(tecnicoSeleccionado) {
		var totalTecSeleccionadosMod = $scope.listaTecnicosMod.filter(tec => tec.checkedOpcion == true).length;
		if(!$scope.tabTecnicosVL_MULTISELECCION_mod && totalTecSeleccionadosMod >0){
			if(tecnicoSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 técnico!');
			}
			tecnicoSeleccionado.checkedOpcion = false;
		}else{
			if(tecnicoSeleccionado.checkedOpcion){
				tecnicoSeleccionado.checkedOpcion = false;
			}else{
				tecnicoSeleccionado.checkedOpcion = true;
				$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorTecnicosMod").css("border", "white solid 0px");
			}
		}
		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
			if(tecnico.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosTecnicosMod").prop("checked",true);
		}else{
			$("#checkTotdosTecnicosMod").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS TÉCNICOS - PESTAÑA TÉCNICOS MODIFICACIÓN USUARIO
	$scope.seleccionarTodosTecnicosMod = function() {
		if($scope.tabTecnicosVL_MULTISELECCION_mod){
			var check;
			if($("#checkTotdosTecnicosMod").prop('checked')){
				check = true;
				$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorTecnicosMod").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
				tecnico.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosTecnicosMod").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 técnico!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL DESPACHO ELEGIDO - PESTAÑA DESPACHOS MODIFICACIÓN USUARIO
	$scope.seleccionarDespachoMod = function(despachoSeleccionado) {
		var totalDesSeleccionadosMod = $scope.listaDespachosMod.filter(des => des.checkedOpcion == true).length;
		if(!$scope.tabDespachosVL_MULTISELECCION_mod && totalDesSeleccionadosMod >0){
			if(despachoSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 despacho!');
			}
			despachoSeleccionado.checkedOpcion = false;
		}else{
			if(despachoSeleccionado.checkedOpcion){
				despachoSeleccionado.checkedOpcion = false;
			}else{
				despachoSeleccionado.checkedOpcion = true;
				$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorDespachosMod").css("border", "white solid 0px");
			}
		}
		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaDespachosMod,function(despacho,index){
			if(despacho.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosDespachoMod").prop("checked",true);
		}else{
			$("#checkTotdosDespachoMod").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS DESPACHOS - PESTAÑA DESPACHOS MODIFICACIÓN USUARIO
	$scope.seleccionarTodosDespachosMod = function() {
		if($scope.tabDespachosVL_MULTISELECCION_mod){
			var check;
			if($("#checkTotdosDespachoMod").prop('checked')){
				check = true;
				$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorDespachosMod").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaDespachosMod,function(despacho,index){
				despacho.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosDespachoMod").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 despacho!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL INGENIERO ELEGIDO - PESTAÑA INGENIEROS MODIFICACIÓN USUARIO
	$scope.seleccionarIngenieroMod = function(ingenieroSeleccionado) {
		
		var totalIngsSeleccionadosMod = $scope.listaIngenierosMod.filter(ing => ing.checkedOpcion == true).length;
		if(!$scope.tabIngenierosVL_MULTISELECCION_mod && totalIngsSeleccionadosMod >0){
			if(ingenieroSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 ingeniero!');
			}
			ingenieroSeleccionado.checkedOpcion = false;
		}else{
			if(ingenieroSeleccionado.checkedOpcion){
				ingenieroSeleccionado.checkedOpcion = false;
			}else{
				ingenieroSeleccionado.checkedOpcion = true;
				$("#labelIngenierosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorIngenierosMod").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaIngenierosMod,function(ingeniero,index){
			if(ingeniero.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosIngenieroMod").prop("checked",true);
		}else{
			$("#checkTotdosIngenieroMod").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS INGENIEROS - PESTAÑA INGENIEROS MODIFICACIÓN USUARIO
	$scope.seleccionarTodosIngenierosMod = function() {
		if($scope.tabIngenierosVL_MULTISELECCION_mod){
			var check;
			if($("#checkTotdosIngenieroMod").prop('checked')){
				check = true;
				$("#labelIngenierosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorIngenierosMod").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaIngenierosMod,function(ingeniero,index){
				ingeniero.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosIngenieroMod").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 ingeniero!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL SUPERVISOR CENTRALIZADO ELEGIDO - PESTAÑA SUPERVISORES CENTRALIZADOS MODIFICACIÓN USUARIO
	$scope.seleccionarSupervisorCentralizadoMod = function(despachoCentralizadoSeleccionado) {
		
		var totalSupCenSeleccionadosMod = $scope.listaSupervisoresCentralizadosMod.filter(supCentr => supCentr.checkedOpcion == true).length;
		if(!$scope.tabSupervisorCentralizadoVL_MULTISELECCION_mod && totalSupCenSeleccionadosMod >0){
			if(despachoCentralizadoSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 supervisor centralizado!');
			}
			despachoCentralizadoSeleccionado.checkedOpcion = false;
		}else{
			if(despachoCentralizadoSeleccionado.checkedOpcion){
				despachoCentralizadoSeleccionado.checkedOpcion = false;
			}else{
				despachoCentralizadoSeleccionado.checkedOpcion = true;
				$("#labelSupervisoresCentralizadosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorSupervisoresCentralizadosMod").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaSupervisoresCentralizadosMod,function(supervisorCentralizado,index){
			if(supervisorCentralizado.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosSupervisorCentralizadoMod").prop("checked",true);
		}else{
			$("#checkTotdosSupervisorCentralizadoMod").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS SUPERVISORES CENTRALIZADOS - PESTAÑA SUPERVISORES CENTRALIZADOS MODIFICACIÓN USUARIO
	$scope.seleccionarTodosSupervisoresCentralizadosMod = function() {
		if($scope.tabSupervisorCentralizadoVL_MULTISELECCION_mod){
			var check;
			if($("#checkTotdosSupervisorCentralizadoMod").prop('checked')){
				check = true;
				$("#labelSupervisoresCentralizadosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorSupervisoresCentralizadosMod").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaSupervisoresCentralizadosMod,function(supervisorCentralizado,index){
				supervisorCentralizado.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosSupervisorCentralizadoMod").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 supervisor centralizado!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL COUCH ELEGIDO - PESTAÑA COUCHS MODIFICACIÓN USUARIO
	$scope.seleccionarCouchMod = function(couchSeleccionado) {
		
		var totalCouchsSeleccionadosMod = $scope.listaCouchsDespachosMod.filter(couch => couch.checkedOpcion == true).length;
		if(!$scope.tabCouchDespachoVL_MULTISELECCION_mod && totalCouchsSeleccionadosMod >0){
			if(couchSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 couch!');
			}
			couchSeleccionado.checkedOpcion = false;
		}else{
			if(couchSeleccionado.checkedOpcion){
				couchSeleccionado.checkedOpcion = false;
			}else{
				couchSeleccionado.checkedOpcion = true;
				$("#labelCouchsSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorCouchsMod").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaCouchsDespachosMod,function(couch,index){
			if(couch.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosCouchMod").prop("checked",true);
		}else{
			$("#checkTotdosCouchMod").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS COUCHS - PESTAÑA COUCHS MODIFICACIÓN USUARIO
	$scope.seleccionarTodosCouchsMod = function() {
		if($scope.tabCouchDespachoVL_MULTISELECCION_mod){
			var check;
			if($("#checkTotdosCouchMod").prop('checked')){
				check = true;
				$("#labelCouchsSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorCouchsMod").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaCouchsDespachosMod,function(couch,index){
				couch.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosCouchMod").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 couch!');
		}
	}
	
	//SELECCIONA O DESELECCIONA EL SUPERVISOR ELEGIDO - PESTAÑA SUPERVISORES MODIFICACIÓN USUARIO
	$scope.seleccionarSupervisorMod = function(supervisorSeleccionado) {
		
		var totalSupSeleccionadosMod = $scope.listaSupervisoresMod.filter(sup => sup.checkedOpcion == true).length;
		if(!$scope.tabSupervisorVL_MULTISELECCION_mod && totalSupSeleccionadosMod >0){
			if(supervisorSeleccionado.checkedOpcion == false){
				toastr.info('¡Solo se permite asignar 1 supervisor!');
			}
			supervisorSeleccionado.checkedOpcion = false;
		}else{
			if(supervisorSeleccionado.checkedOpcion){
				supervisorSeleccionado.checkedOpcion = false;
			}else{
				supervisorSeleccionado.checkedOpcion = true;
				$("#labelSupervisoresSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorSupervisoresMod").css("border", "white solid 0px");
			}
		}

		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaSupervisoresMod,function(supervisor,index){
			if(supervisor.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosSupervisorMod").prop("checked",true);
		}else{
			$("#checkTotdosSupervisorMod").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS SUPERVISORES - PESTAÑA SUPERVISORES MODIFICACIÓN USUARIO
	$scope.seleccionarTodosSupervisoresMod = function() {
		if($scope.tabSupervisorVL_MULTISELECCION_mod){
			var check;
			if($("#checkTotdosSupervisorMod").prop('checked')){
				check = true;
				$("#labelSupervisoresSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorSupervisoresMod").css("border", "white solid 0px");
			}else{
				check = false;
			}
			angular.forEach($scope.listaSupervisoresMod,function(supervisor,index){
				supervisor.checkedOpcion = check;
			});
		}else{
			$("#checkTotdosSupervisorMod").prop('checked',false);
			toastr.info('¡Solo se permite asignar 1 supervisor!');
		}
	}
	
	//MÉTODO QUE VALIDA SI SE SELECCIONÓ POR LO MENOS 1 GEOGRAFÍA Y SI EXISTEN TÉCNICOS O DESPACHOS DE ACUERDO A LA/LAS GEOGRAFÍA(S) SELECCIONADA(S)
	$scope.revisionTecnicosDespachosMod = function(tab) {
		if($scope.detalleUsuario.geografiasId !== undefined){
			if($scope.detalleUsuario.geografiasId.length > 0){
				
				switch(tab){
	            	case "tabTecnicos":
	            		if($scope.listaTecnicosMod == ""){
							toastr.info('¡Actualmente no existen técnicos!');
						}
	            		break;
	            	case "tabDespachos":
	            		if($scope.listaDespachosMod == ""){
							toastr.info('¡Actualmente no existen despachos!');
						}
	            		break;
	            	case "tabIngenieros":
	            		if($scope.listaIngenierosMod == ""){
							toastr.info('¡Actualmente no existen ingenieros!');
						}
	            		break;
	            	case "tabSupervisorCentralizado":
	            		if($scope.listaSupervisoresCentralizadosMod == ""){
							toastr.info('¡Actualmente no existen supervisores centralizados!');
						}
	            		break;
	            	case "tabCouchDespacho":
	            		if($scope.listaCouchsDespachosMod == ""){
							toastr.info('¡Actualmente no existen couchs de despacho!');
						}
	            		break;
	            	case "tabSupervisor":
	            		if($scope.listaSupervisoresMod == ""){
							toastr.info('¡Actualmente no existen supervisores!');
						}
	            		break;
	    		}
				
			}else{
				toastr.info('¡Selecciona al menos una geografía!');
			}
		}else{
			toastr.info('¡Selecciona al menos una geografía!');
		}
	}
	
	//CUANDO SELECCCIONE UNA FECHA VÁLIDA EL INPUT REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#form-fechaIngreso-mod").change(function() {
    	$("#form-fechaIngreso-mod").css("border", "1px solid #bdbdbd");
    });
	
	//MÉTODO PARA CONSULTAR LOS TÉCNICOS A REASIGNAR AL USUARIO (QUE NO SEA TÉCNICO) QUE SE MODIFICARÁ - PESTAÑA TÉCNICOS MODIFICACIÓN USUARIO
	$scope.consultarTecnicosMod = function() {
		$scope.listaTecnicosMod = [];
		let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalMod, idTipoUsuario:[$scope.idPuestoTecnico]};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarUsuariosPorPuesto(params)
        ]).then(function(results) {
        	if (results[0].data !== undefined) {
            	if(results[0].data.respuesta){
            		if(results[0].data.result.usuarios !== null){
	            		if(results[0].data.result.usuarios.length > 0){
	            			$scope.listaTecnicosMod = results[0].data.result.usuarios;
	            			$("#checkTotdosTecnicosMod").prop("checked",false);
	            	    	angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
	            	    		tecnico.checkedOpcion = false;
	            			});
	            	    	angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
	            	    		angular.forEach($scope.detalleUsuario.idOperarios,function(tecnicoRegistrado,index){
	            	    			if(tecnico.idUsuario == tecnicoRegistrado.idOperador){
	            	    				tecnico.checkedOpcion = true;
	            	    			}
	            	    		});
	            			});
	            	    	$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
	            			$("#contenedorTecnicosMod").css("border", "white solid 0px");
	            		}else{
	            			$scope.listaTecnicosMod = [];
	            		}
            		}else{
            			$scope.listaTecnicosMod = [];
            		}
            	}else{
            		$scope.listaTecnicosMod = [];
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
        	swal.close();
        });
	}
	
	//MÉTODO PARA CONSULTAR LOS DESPACHOS A REASIGNAR AL TÉCNICO QUE SE MODIFICARÁ - PESTAÑA DESPACHOS MODIFICACIÓN USUARIO
	$scope.consultarDespachosMod = function() {
		$scope.listaDespachosMod = [];
		if($scope.listaIdsGeografiaCiudadNatalMod.length > 0){
			let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalMod, idTipoUsuario:[$scope.idPuestoDespacho]};
	    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
			swal.showLoading();
	    	$q.all([
	    		usuarioPIService.consultarUsuariosPorPuesto(params)
	        ]).then(function(results) {
	        	if (results[0].data !== undefined) {
	            	if(results[0].data.respuesta){
	            		if(results[0].data.result.usuarios !== null){
		            		if(results[0].data.result.usuarios.length > 0){
		            			$scope.listaDespachosMod = results[0].data.result.usuarios;
		            			$("#checkTotdosDespachosMod").prop("checked",false);
		            	    	angular.forEach($scope.listaDespachosMod,function(despacho,index){
		            	    		despacho.checkedOpcion = false;
		            			});
		            	    	
		            	    	if($scope.detalleUsuario.idTipoUsuario == 7){
		            	    		angular.forEach($scope.listaDespachosMod,function(despacho,index){
			            	    		angular.forEach($scope.detalleUsuario.idDespachos,function(despachoRegistrado,index){
			            	    			if(despacho.idUsuario == despachoRegistrado.idOperador){
			            	    				despacho.checkedOpcion = true;
			            	    			}
			            	    		});
			            			});
		            	    	}
		            	    	
		            	    	if($scope.detalleUsuario.idTipoUsuario == 20){
		            	    		angular.forEach($scope.listaDespachosMod,function(despacho,index){
			            	    		angular.forEach($scope.detalleUsuario.subordinados,function(despachoRegistrado,index){
			            	    			if(despacho.idUsuario == despachoRegistrado.idSubordinado){
			            	    				despacho.checkedOpcion = true;
			            	    			}
			            	    		});
			            			});
		            	    	}
		            	    	
		            	    	$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
		            			$("#contenedorDespachosMod").css("border", "white solid 0px");
		            		}else{
		            			$scope.listaDespachosMod = [];
		            		}
	            		}else{
	            			$scope.listaDespachosMod = [];
	            		}
	            	}else{
	            		$scope.listaDespachosMod = [];
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	        	swal.close();
	        });
		}
	}
	
	//MÉTODO PARA CONSULTAR LOS INGENIEROS A REASIGNAR AL TÉCNICO QUE SE MODIFICARÁ - PESTAÑA INGENIEROS MODIFICACIÓN USUARIO
	$scope.consultarIngenierosMod = function() {
		$scope.listaIngenierosMod = [];
		if($scope.listaIdsGeografiaCiudadNatalMod.length > 0){
			let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalMod, idTipoUsuario:[$scope.idPuestoIngeniero]};
	    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
			swal.showLoading();
	    	$q.all([
	    		usuarioPIService.consultarUsuariosPorPuesto(params)
	        ]).then(function(results) {
	        	if (results[0].data !== undefined) {
	            	if(results[0].data.respuesta){
	            		if(results[0].data.result.usuarios !== null){
		            		if(results[0].data.result.usuarios.length > 0){
		            			$scope.listaIngenierosMod = results[0].data.result.usuarios;
		            			$("#checkTotdosIngenieroMod").prop("checked",false);
		            	    	angular.forEach($scope.listaIngenierosMod,function(ingeniero,index){
		            	    		ingeniero.checkedOpcion = false;
		            			});
		            	    	angular.forEach($scope.listaIngenierosMod,function(ingeniero,index){
		            	    		angular.forEach($scope.detalleUsuario.subordinados,function(ingeRegistrado,index){
		            	    			if(ingeniero.idUsuario == ingeRegistrado.idSubordinado){
		            	    				ingeniero.checkedOpcion = true;
		            	    			}
		            	    		});
		            			});
		            	    	$("#labelIngenierosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
		            			$("#contenedorIngenierosMod").css("border", "white solid 0px");
		            		}else{
		            			$scope.listaIngenierosMod = [];
		            		}
	            		}else{
	            			$scope.listaIngenierosMod = [];
	            		}
	            	}else{
	            		$scope.listaIngenierosMod = [];
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	        	swal.close();
	        });
		}
	}
	
	//MÉTODO PARA CONSULTAR LOS SUPERVISORES CENTRALIZADOS A REASIGNAR AL TÉCNICO QUE SE MODIFICARÁ - PESTAÑA SUPERVISORES CENTRALIZADOS MODIFICACIÓN USUARIO
	$scope.consultarSupervisoresCentralizadosMod = function() {
		$scope.listaSupervisoresCentralizadosMod = [];
		if($scope.listaIdsGeografiaCiudadNatalMod.length > 0){
			let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalMod, idTipoUsuario:[$scope.idPuestoSupervisorCentralizado]};
	    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
			swal.showLoading();
	    	$q.all([
	    		usuarioPIService.consultarUsuariosPorPuesto(params)
	        ]).then(function(results) {
	        	if (results[0].data !== undefined) {
	            	if(results[0].data.respuesta){
	            		if(results[0].data.result.usuarios !== null){
		            		if(results[0].data.result.usuarios.length > 0){
		            			$scope.listaSupervisoresCentralizadosMod = results[0].data.result.usuarios;
		            			$("#checkTotdosSupervisorCentralizadoMod").prop("checked",false);
		            	    	angular.forEach($scope.listaSupervisoresCentralizadosMod,function(supervisorCentralizado,index){
		            	    		supervisorCentralizado.checkedOpcion = false;
		            			});
		            	    	angular.forEach($scope.listaSupervisoresCentralizadosMod,function(supervisorCentralizado,index){
		            	    		angular.forEach($scope.detalleUsuario.supervisores,function(supervisorCentralizadoRegistrado,index){
		            	    			if(supervisorCentralizado.idUsuario == supervisorCentralizadoRegistrado.idSupervisor){
		            	    				supervisorCentralizado.checkedOpcion = true;
		            	    			}
		            	    		});
		            			});
		            	    	$("#labelSupervisoresCentralizadosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
		            			$("#contenedorSupervisoresCentralizadosMod").css("border", "white solid 0px");
		            		}else{
		            			$scope.listaSupervisoresCentralizadosMod = [];
		            		}
	            		}else{
	            			$scope.listaSupervisoresCentralizadosMod = [];
	            		}
	            	}else{
	            		$scope.listaSupervisoresCentralizadosMod = [];
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	        	swal.close();
	        });
		}
	}
	
	//MÉTODO PARA CONSULTAR LOS COUCHS A REASIGNAR AL TÉCNICO QUE SE MODIFICARÁ - PESTAÑA COUCHS MODIFICACIÓN USUARIO
	$scope.consultarCouchsDespachoMod = function() {
		$scope.listaCouchsDespachosMod = [];
		if($scope.listaIdsGeografiaCiudadNatalMod.length > 0){
			let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalMod, idTipoUsuario:[$scope.idPuestoCouchDespacho]};
	    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
			swal.showLoading();
	    	$q.all([
	    		usuarioPIService.consultarUsuariosPorPuesto(params)
	        ]).then(function(results) {
	        	if (results[0].data !== undefined) {
	            	if(results[0].data.respuesta){
	            		if(results[0].data.result.usuarios !== null){
		            		if(results[0].data.result.usuarios.length > 0){
		            			$scope.listaCouchsDespachosMod = results[0].data.result.usuarios;
		            			$("#checkTotdosCouchMod").prop("checked",false);
		            	    	angular.forEach($scope.listaCouchsDespachosMod,function(couch,index){
		            	    		couch.checkedOpcion = false;
		            			});
		            	    	angular.forEach($scope.listaCouchsDespachosMod,function(couch,index){
		            	    		angular.forEach($scope.detalleUsuario.supervisores,function(couchRegistrado,index){
		            	    			if(couch.idUsuario == couchRegistrado.idSupervisor){
		            	    				couch.checkedOpcion = true;
		            	    			}
		            	    		});
		            			});
		            	    	$("#labelCouchsSeleccionadosMod").css("color", "rgb(70, 88, 107)");
		            			$("#contenedorCouchsMod").css("border", "white solid 0px");
		            		}else{
		            			$scope.listaCouchsDespachosMod = [];
		            		}
	            		}else{
	            			$scope.listaCouchsDespachosMod = [];
	            		}
	            	}else{
	            		$scope.listaCouchsDespachosMod = [];
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	        	swal.close();
	        });
		}
	}
	
	//MÉTODO PARA CONSULTAR LOS SUPERVISORES A REASIGNAR AL TÉCNICO QUE SE MODIFICARÁ - PESTAÑA SUPERVISORES MODIFICACIÓN USUARIO
	$scope.consultarSupervisoresMod = function() {
		$scope.listaSupervisoresMod = [];
		if($scope.listaIdsGeografiaCiudadNatalMod.length > 0){
			let params = {idsGeografia:$scope.listaIdsGeografiaCiudadNatalMod, idTipoUsuario:[$scope.idPuestoSupervisor]};
	    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
			swal.showLoading();
	    	$q.all([
	    		usuarioPIService.consultarUsuariosPorPuesto(params)
	        ]).then(function(results) {
	        	if (results[0].data !== undefined) {
	            	if(results[0].data.respuesta){
	            		if(results[0].data.result.usuarios !== null){
		            		if(results[0].data.result.usuarios.length > 0){
		            			$scope.listaSupervisoresMod = results[0].data.result.usuarios;
		            			$("#checkTotdosSupervisorMod").prop("checked",false);
		            	    	angular.forEach($scope.listaSupervisoresMod,function(supervisor,index){
		            	    		supervisor.checkedOpcion = false;
		            			});
		            	    	angular.forEach($scope.listaSupervisoresMod,function(supervisor,index){
		            	    		angular.forEach($scope.detalleUsuario.supervisores,function(supervisorRegistrado,index){
		            	    			if(supervisor.idUsuario == supervisorRegistrado.idSupervisor){
		            	    				supervisor.checkedOpcion = true;
		            	    			}
		            	    		});
		            			});
		            	    	$("#labelSupervisoresSeleccionadosMod").css("color", "rgb(70, 88, 107)");
		            			$("#contenedorSupervisoresMod").css("border", "white solid 0px");
		            		}else{
		            			$scope.listaSupervisoresMod = [];
		            		}
	            		}else{
	            			$scope.listaSupervisoresMod = [];
	            		}
	            	}else{
	            		$scope.listaSupervisoresMod = [];
	            	}
	        	}else{
	        		toastr.error('Error interno en el servidor.');
	        	}
	        	swal.close();
	        });
		}
	}
	
	//MÉTODO QUE REALIZA LA MODIFICACIÓN DE LA INFORMACIÓN DEL USUARIO SELECCIONADO
	$scope.modificarUsuario = function() {
		$scope.detalleUsuario.tecnicos = [];
		$scope.detalleUsuario.despachos = [];
		$scope.detalleUsuario.ingenieros = [];
		$scope.detalleUsuario.supervisoresCentralizados = [];
		$scope.detalleUsuario.couchs = [];
		$scope.detalleUsuario.supervisores = [];
		
		var puestoSeleccionadoMod = $("#puesto_select_modificacion option:selected").val();
    	var companiaSeleccionadaMod = $("#compania_select_modificacion option:selected").val();
		var sexoMod = $("#sexo_select_modificacion option:selected").val();
		var fechaSeleccionadaMod = $scope.detalleUsuario.fechaIngreso.split('/');
		
		angular.forEach($scope.listaDespachosMod,function(despacho,index){
			if(despacho.checkedOpcion == true){
				$scope.detalleUsuario.despachos.push(despacho.idUsuario);
			}
		});
		
		angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
			if(tecnico.checkedOpcion == true){
				$scope.detalleUsuario.tecnicos.push(tecnico.idUsuario);
			}
		});
		
		angular.forEach($scope.listaIngenierosMod,function(ingeniero,index){
			if(ingeniero.checkedOpcion == true){
				$scope.detalleUsuario.ingenieros.push(ingeniero.idUsuario);
			}
		});
    	
    	angular.forEach($scope.listaSupervisoresCentralizadosMod,function(supCentralizado,index){
			if(supCentralizado.checkedOpcion == true){
				$scope.detalleUsuario.supervisoresCentralizados.push(supCentralizado.idUsuario);
			}
		});
    	
    	angular.forEach($scope.listaCouchsDespachosMod,function(couch,index){
			if(couch.checkedOpcion == true){
				$scope.detalleUsuario.couchs.push(couch.idUsuario);
			}
		});
    	
    	angular.forEach($scope.listaSupervisoresMod,function(supervisor,index){
			if(supervisor.checkedOpcion == true){
				$scope.detalleUsuario.supervisores.push(supervisor.idUsuario);
			}
		});
		
		var jsonPerfilesIntervencionesMod = [];
    	angular.forEach($scope.listaMostrarPerfilesSeleccionadosMod,function(perfiles,index){
    		if(perfiles.nivel == 1 ||  perfiles.nivel == 2){
    			jsonPerfilesIntervencionesMod.push(perfiles.idTipo);
    		}
    	});
    	
    	jsonPerfilesIntervencionesMod = jsonPerfilesIntervencionesMod.filter(function(ele , pos){
    	    return jsonPerfilesIntervencionesMod.indexOf(ele) == pos;
    	});
		
		var respuestaValidacionCamposMod = $scope.validarInformacionModificacion();
		
		if(respuestaValidacionCamposMod){
			
			swal({
		        title: "Se actualizará la información del usuario",
		        text: "\u00BFDesea editar la información del usuario?",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: '#007bff',
		        confirmButtonText: 'Si',
		        cancelButtonText: 'Cancelar'
		      }).then(function (isConfirm) {
		        if (isConfirm) {
		        	let paramsMod = {
							id: $scope.detalleUsuario.idUsuario,
							nombre: $scope.detalleUsuario.nombre,
							apellidoPaterno: $scope.detalleUsuario.apellidoPaterno,
							apellidoMaterno: $scope.detalleUsuario.apellidoMaterno,
							numeroEmpleado: $scope.detalleUsuario.numeroEmpleado,
							usuario: $scope.detalleUsuario.usuario,
							rfc: $scope.detalleUsuario.rfc,
							curp: $scope.detalleUsuario.curp,
							genero: sexoMod,
							correoElectronico: $scope.detalleUsuario.correo,
							telefonoCelular: $scope.detalleUsuario.telefonoCelular,
							idGeografia: $scope.detalleUsuario.ciudadNatal,
							llaveExterna: "4532",
							idTipoUsuario: puestoSeleccionadoMod,
							idProveedor: companiaSeleccionadaMod,
							idDispositivo: "string",
							fechaAlta: fechaSeleccionadaMod[2] + '-' + fechaSeleccionadaMod[1] + '-' + fechaSeleccionadaMod[0],
							geografias: $scope.detalleUsuario.geografiasId,
							permisos: $scope.isTecnicoMod == true ? [] : $scope.detalleUsuario.permisosId,
							idAsignacionAutomatica: $scope.detalleUsuario.idAsignacionAutomatica
					}

		        	if($scope.tabPerfilesMod){
		        		paramsMod.perfilesOu = jsonPerfilesIntervencionesMod;
		        	}
		        	
		        	if($scope.tabIntervencionesMod){
		        		paramsMod.intervenciones = $scope.detalleUsuario.intervencionesId;
		        	}
		        	
		        	if($scope.tabTecnicosMod){
		        		paramsMod.idOperarios = $scope.detalleUsuario.tecnicos;
		        	}
		        	
		        	if($scope.tabDespachosMod){
		        		if($scope.detalleUsuario.idTipoUsuario == 7){
		        			paramsMod.idDespachos = $scope.detalleUsuario.despachos;
		        		}
		        		if($scope.detalleUsuario.idTipoUsuario == 20){
		        			paramsMod.subordinados = $scope.detalleUsuario.despachos;
		        		}
		        	}
		        	
		        	if($scope.tabIngenierosMod){
		        		paramsMod.subordinados = $scope.detalleUsuario.ingenieros;
		        	}
		        	
		        	if($scope.tabSupervisorCentralizadoMod){
		        		paramsMod.supervisores = $scope.detalleUsuario.supervisoresCentralizados;
		        	}
		        	
		        	if($scope.tabCouchDespachoMod){
		        		paramsMod.supervisores = $scope.detalleUsuario.couchs;
		        	}

		        	if($scope.tabSupervisorMod){
		        		paramsMod.supervisores = $scope.detalleUsuario.supervisores;
		        	}

		        	if($scope.tabInformacionVW_CUADRILLA_mod){
		        		paramsMod.tipoCuadrilla = $scope.detalleUsuario.tipoCuadrilla;
		        	}

		        	if($scope.fileFotoUsuarioMod != null){
		        		if($scope.fileFotoUsuarioMod.nuevaFoto == true){
		        			paramsMod.fotoPerfil = {
			        				bucketId: $scope.fileFotoUsuarioMod.bucketId,
			        			    archivo: $scope.fileFotoUsuarioMod.archivo,
			        			    nombre: "usuarios/mex/"+$scope.detalleUsuario.numeroEmpleado+"/fotoPerfil"
			        			  }
		        		}
		        	}else{
		        		paramsMod.fotoPerfil = {
		        				bucketId: "",
		        			    archivo: "",
		        			    nombre: ""
		        			  }
		        	}

					swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		    		swal.showLoading();
					let tituloAccion = "Editar usuario";
					let mensajeEnvio = 'Ha ocurrido un error al editar el usuario ' + paramsMod.usuario;
		        	$q.all([
		        		usuarioPIService.modificarUsuario(paramsMod)
		            ]).then(function(results) {
		            	swal.close();
		            	if(results[0].data.respuesta){
							mensajeEnvio = 'Se ha editado el usuario ' + paramsMod.usuario;
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_EXITO, tituloAccion);
		            		swal("Correcto", "¡Modificación realizada con éxito!", "success");
		            		$scope.limpiarDatosModificacion();
		            		$scope.resetearTablaUsuariosConsulta();
		            		setTimeout(function() {
		            			$scope.consultaUsuariosPorGeoCompPuestos();
		    	        	}, 1000);
		            	}else{
							objectTempAccion.guardarAccionesRecientesModulo(mensajeEnvio, MENSAJE_ACCION_ERROR, tituloAccion);
		            		swal("Error", results[0].data.resultDescripcion, "error");
		            	}
		            });
		        }
		      }).catch(err => {

		      });
		}
	}
	
	//VALIDACIÓN GENERAL DE DATOS DEL SUBMÓDULO MODIFICAR USUARIO
    $scope.validarInformacionModificacion = function() {
    	var validacion = true;
    	var validacionInformacionGeneral = true;
    	var validacionIntervenciones = true;
    	var validacionArbol = true;
    	var validacionAccesos = true;
    	var validacionTecnicos = true;
    	var validacionDespachos = true;
    	var validacionPerfiles = true;
    	var validacionIngenieros = true;
    	var validacionSupervisorCentralizado = true;
    	var validacionCouchDespacho = true;
    	var validacionSupervisor = true;
    	var mensaje = "VALIDA LOS SIGUIENTES CAMPOS: ";
    	
    	
    	//PESTAÑA INFORMACIÓN GENERAL
		if($scope.tabInformacionMod){
			if($("#puesto_select_modificacion").val() === "" || $("#puesto_select_modificacion").val() === undefined || $("#puesto_select_modificacion").val() === null){
				$("#puesto_select_modificacion").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Puesto";
			}else{
				$("#puesto_select_modificacion").css("border", "1px solid #bdbdbd");
			}
			
			if($("#compania_select_modificacion").val() === "" || $("#compania_select_modificacion").val() === undefined || $("#compania_select_modificacion").val() === null){
				$("#compania_select_modificacion").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Compañía";
			}else{
				$("#compania_select_modificacion").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.detalleUsuario.numeroEmpleado === "" || $scope.detalleUsuario.numeroEmpleado === undefined){
				$("#form-num-empleado-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Número empleado";
			}else{
				$("#form-num-empleado-mod").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.detalleUsuario.usuario === "" || $scope.detalleUsuario.usuario === undefined){
				$("#form-usuario-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Usuario";
			}else{
				$("#form-usuario-mod").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.detalleUsuario.nombre === "" || $scope.detalleUsuario.nombre === undefined){
				$("#form-nombres-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Nombre";
			}else{
				$("#form-nombres-mod").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.detalleUsuario.apellidoPaterno === "" || $scope.detalleUsuario.apellidoPaterno === undefined){
				$("#form-a-paterno-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Apellido paterno";
			}else{
				$("#form-a-paterno-mod").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.detalleUsuario.apellidoMaterno === "" || $scope.detalleUsuario.apellidoMaterno === undefined){
				$("#form-a-materno-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Apellido materno";
			}else{
				$("#form-a-materno-mod").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.detalleUsuario.curp === "" || $scope.detalleUsuario.curp === undefined){
				$("#form-curp-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *CURP";
			}else{
				if($scope.tabInformacionVL_CURP_mod){
					if($scope.detalleUsuario.curp.length == 18){
						$("#form-curp-mod").css("border", "1px solid #bdbdbd");
					}else{
						$("#form-curp-mod").css("border-bottom", "2px solid #f55756");
						validacionInformacionGeneral = false;
						mensaje = mensaje + "<br/> *Formato de la CURP (18 dígitos)";
					}
				}else{
					$("#form-curp-mod").css("border", "1px solid #bdbdbd");
				}
				
			}
			
			if($scope.detalleUsuario.rfc === "" || $scope.detalleUsuario.rfc === undefined){
				$("#form-rfc-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *RFC";
			}else{
				if($scope.tabInformacionVL_RFC_mod){
					if($scope.detalleUsuario.rfc.length == 12 || $scope.detalleUsuario.rfc.length == 13){
						$("#form-rfc-mod").css("border", "1px solid #bdbdbd");
					}else{
						$("#form-rfc-mod").css("border-bottom", "2px solid #f55756");
						validacionInformacionGeneral = false;
						mensaje = mensaje + "<br/> *Formato del RFC (12-13 dígitos)";
					}
				}else{
					$("#form-rfc-mod").css("border", "1px solid #bdbdbd");
				}
			}
			
			if($scope.detalleUsuario.telefonoCelular === "" || $scope.detalleUsuario.telefonoCelular === undefined){
				$("#form-telefono-contacto-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Teléfono de contacto";
			}else{
				if($scope.validarTamDatosMod){
					if($scope.detalleUsuario.telefonoCelular.length == 10){
						$("#form-telefono-contacto-mod").css("border", "1px solid #bdbdbd");
					}else{
						$("#form-telefono-contacto-mod").css("border-bottom", "2px solid #f55756");
						validacionInformacionGeneral = false;
						mensaje = mensaje + "<br/> *Formato del teléfono (10 dígitos)";
					}
				}else{
					$("#form-telefono-contacto-mod").css("border", "1px solid #bdbdbd");
				}
			}
			
			if($scope.detalleUsuario.correo === "" || $scope.detalleUsuario.correo === undefined){
				$("#form-correo-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Correo electrónico";
			}else{
				if($("#form-correo-mod").val().indexOf('@', 0) == -1 || $("#form-correo-mod").val().indexOf('.', 0) == -1) {
					$("#form-correo-mod").css("border-bottom", "2px solid #f55756");
					validacionInformacionGeneral = false;
					toastr.info("¡Valida el formato del correo electrónico!");
				}else{
					$("#form-correo-mod").css("border", "1px solid #bdbdbd");
				}
			}
			
			if($scope.detalleUsuario.fechaIngreso === "" || $scope.detalleUsuario.fechaIngreso === undefined || $scope.detalleUsuario.fechaIngreso === null || $("#form-fechaIngreso-mod").val() === "" || $("#form-fechaIngreso-mod").val() === null){
				$("#form-fechaIngreso-mod").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Fecha de ingreso";
			}else{
				$("#form-fechaIngreso-mod").css("border", "1px solid #bdbdbd");
			}
			
			if($("#sexo_select_modificacion").val() === "" || $("#sexo_select_modificacion").val() === undefined || $("#sexo_select_modificacion").val() === null){
				$("#sexo_select_modificacion").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				mensaje = mensaje + "<br/> *Sexo";
			}else{
				$("#sexo_select_modificacion").css("border", "1px solid #bdbdbd");
			}
			
			if($scope.tabInformacionVW_CUADRILLA_mod){
				if($scope.detalleUsuario.tipoCuadrilla === "" || $scope.detalleUsuario.tipoCuadrilla === undefined || $scope.detalleUsuario.tipoCuadrilla === null){
					$("#cuadrilla_select_mod").css("border-bottom", "2px solid #f55756");
					validacionInformacionGeneral = false;
					mensaje = mensaje + "<br/> *Cuadrilla";
				}else{
					$("#cuadrilla_select_mod").css("border", "1px solid #bdbdbd");
				}
			}
		}
		
		//PESTAÑA INTERVENCIONES
		if($scope.tabIntervencionesMod){
			if($scope.listaIntervencionesSelecionadasMod == "" || $scope.listaIntervencionesSelecionadasMod == undefined || $scope.listaIntervencionesSelecionadasMod == null){
				validacionIntervenciones = false;
				mensaje = mensaje + "<br/> *Intervención(es)";
				$("#labelIntervencionesSeleccionadasMod").css("color", "#f55756");
				$("#contenedorIntervencionesRegistroMod").css("border", "#f55756 solid 1px");
			}else{
				$("#labelIntervencionesSeleccionadasMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorIntervencionesRegistroMod").css("border", "white solid 0px");
			}
		}
		
		//PESTAÑA ÁRBOL
		if($scope.tabArbolMod){
			if($scope.listaCiudadesSelecionadasMod == "" || $scope.listaCiudadesSelecionadasMod == undefined || $scope.listaCiudadesSelecionadasMod == null){
				validacionArbol = false;
				mensaje = mensaje + "<br/> *Geografía(s)";
				$("#labelGeografiasSeleccionadasMod").css("color", "#f55756");
				$("#contenedorGeografiasRegistroMod").css("border", "#f55756 solid 1px");
			}else{
				$("#labelGeografiasSeleccionadasMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorGeografiasRegistroMod").css("border", "white solid 0px");
			}
		}
		
		//CHECK SI EL PUESTO SELECCIONADO ES TÉCNICO NO VALIDA (TÉCNICOS Y PERMISOS) Y SI NO ES TÉCNICO SI VALIDA DICHA INFORMACIÓN
		if($scope.isTecnicoMod == false){
			//PESTAÑA ACCESOS (PERMISOS)
    		if($scope.tabAccesosMod){
    			if($scope.listaAccesosSelecionadosMod == "" || $scope.listaAccesosSelecionadosMod == undefined || $scope.listaAccesosSelecionadosMod == null){
        			validacionAccesos = false;
        			mensaje = mensaje + "<br/> *Permiso(s)";
        			$("#labelPermisosSeleccionadasMod").css("color", "#f55756");
        			$("#contenedorPermisosRegistroMod").css("border", "#f55756 solid 1px");
        		}else{
        			$("#labelPermisosSeleccionadasMod").css("color", "rgb(70, 88, 107)");
        			$("#contenedorPermisosRegistroMod").css("border", "white solid 0px");
        		}
    		}
    		
    		//PESTAÑA TÉCNICOS
    		//POR EL MOMENTO SE QUITA LA VALIDACIÓN DE TÉCNICOS (NO ES OBLIGATORIA LA SELECCIÓN)
//        	var checkTec = 0;
//    		angular.forEach($scope.listaTecnicosMod,function(tecnico,index){
//    			if(tecnico.checkedOpcion == true){
//    				checkTec++;
//    			}
//    		});
//    		if(checkTec < 1){
//    			validacionTecnicos = false;
//    			mensaje = mensaje + "<br/> *Técnico(s)";
//    			$("#labelTecnicosSeleccionadosMod").css("color", "#f55756");
//    			$("#contenedorTecnicosMod").css("border", "#f55756 solid 1px");
//    		}else{
//    			$("#labelTecnicosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
//    			$("#contenedorTecnicosMod").css("border", "white solid 0px");
//    		}
    		
		}else{
			//PESTAÑA DESPACHOS
        	if($scope.tabDespachos_VL_CAMPOS_mod){
        		var checkDes = 0;
        		angular.forEach($scope.listaDespachosMod,function(despacho,index){
        			if(despacho.checkedOpcion == true){
        				checkDes++;
        			}
        		});
        		if(checkDes < 1){
        			validacionDespachos = false;
        			mensaje = mensaje + "<br/> *Despachos(s)";
        			$("#labelDespachosSeleccionadosMod").css("color", "#f55756");
        			$("#contenedorDespachosMod").css("border", "#f55756 solid 1px");
        		}else{
        			$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
        			$("#contenedorDespachosMod").css("border", "white solid 0px");
        		}
        	}
		}
		
		if($scope.tabPerfilesMod){
			if($('#arbolIntervencionPerfilMod').jstree("get_selected", true).length < 1){
				validacionPerfiles = false;
				mensaje = mensaje + "<br/> *Perfil(es)";
				$("#labelIntervencionesPerfilesSeleccionadosMod").css("color", "#f55756");
				$("#contenedorIntervencionesPerfilesMod").css("border", "#f55756 solid 1px");
			}else{
				$("#labelIntervencionesPerfilesSeleccionadosMod").css("color", "rgb(70, 88, 107)");
				$("#contenedorIntervencionesPerfilesMod").css("border", "white solid 0px");
			}
		}
		
		//PESTAÑA INGENIEROS
    	if($scope.tabIngenieros_VL_CAMPOS_mod){
    		var checkIngs = 0;
    		angular.forEach($scope.listaIngenierosMod,function(ingeniero,index){
    			if(ingeniero.checkedOpcion == true){
    				checkIngs++;
    			}
    		});
    		if(checkIngs < 1){
    			validacionIngenieros = false;
    			mensaje = mensaje + "<br/> *Ingeniero(s)";
    			$("#labelIngenierosSeleccionadosMod").css("color", "#f55756");
    			$("#contenedorIngenierosMod").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelIngenierosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
    			$("#contenedorIngenierosMod").css("border", "white solid 0px");
    		}
    	}
    	
    	//PESTAÑA SUPERVISORES CENTRALIZADOS
    	if($scope.tabSupervisorCentralizado_VL_CAMPOS_mod){
    		var checkSupCentralizados = 0;
    		angular.forEach($scope.listaSupervisoresCentralizadosMod,function(supervisorCentralizado,index){
    			if(supervisorCentralizado.checkedOpcion == true){
    				checkSupCentralizados++;
    			}
    		});
    		if(checkSupCentralizados < 1){
    			validacionSupervisorCentralizado = false;
    			mensaje = mensaje + "<br/> *Supervisor(es) centralizado(s)";
    			$("#labelSupervisoresCentralizadosSeleccionadosMod").css("color", "#f55756");
    			$("#contenedorSupervisoresCentralizadosMod").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelSupervisoresCentralizadosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
    			$("#contenedorSupervisoresCentralizadosMod").css("border", "white solid 0px");
    		}
    	}
    	
    	//PESTAÑA COUCHS
    	if($scope.tabCouchDespacho_VL_CAMPOS_mod){
    		var checkCouchs = 0;
    		angular.forEach($scope.listaCouchsDespachosMod,function(couch,index){
    			if(couch.checkedOpcion == true){
    				checkCouchs++;
    			}
    		});
    		if(checkCouchs < 1){
    			validacionCouchDespacho = false;
    			mensaje = mensaje + "<br/> *Couch(s)";
    			$("#labelCouchsSeleccionadosMod").css("color", "#f55756");
    			$("#contenedorCouchsMod").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelCouchsSeleccionadosMod").css("color", "rgb(70, 88, 107)");
    			$("#contenedorCouchsMod").css("border", "white solid 0px");
    		}
    	}
    	
    	//PESTAÑA SUPERVISORES
    	if($scope.tabSupervisor_VL_CAMPOS_mod){
    		var checkSupervisores = 0;
    		angular.forEach($scope.listaSupervisoresMod,function(supervisor,index){
    			if(supervisor.checkedOpcion == true){
    				checkSupervisores++;
    			}
    		});
    		if(checkSupervisores < 1){
    			validacionSupervisor = false;
    			mensaje = mensaje + "<br/> *Supervisor(es)";
    			$("#labelSupervisoresSeleccionadosMod").css("color", "#f55756");
    			$("#contenedorSupervisoresMod").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelSupervisoresSeleccionadosMod").css("color", "rgb(70, 88, 107)");
    			$("#contenedorSupervisoresMod").css("border", "white solid 0px");
    		}
    	}
    	
    	//PESTAÑA CONFIRMAR USUARIO
    	if($scope.tabConfirmacionMod){
    		if($scope.detalleUsuario.ciudadNatal == "" || $scope.detalleUsuario.ciudadNatal == undefined){
        		$(".ciudadNatalMod").css("color", "#f55756");
        		validacion = false;
    			mensaje = mensaje + "<br/> *Ciudad natal";
        	}else{
        		$(".ciudadNatalMod").css("color", "#7c7c7d");
        	}
    	}
		
		//VALIDACIÓN Y ACTIVACIÓN DE PESTAÑAS
		if(validacionInformacionGeneral == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-informacion-tab-mod").addClass("active");
			$("#pills-informacion-mod").addClass("active show");
		}else if(validacionIntervenciones == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-intervencion-tab-mod").addClass("active");
			$("#pills-intervencion-mod").addClass("active show");
		}else if(validacionArbol == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$('#arbolGeografiaRegistro-mod').jstree("destroy");
	    	$('#arbolGeografiaRegistro-mod').jstree("deselect_all");
			$scope.mostrarArbolGeografiaRegistro();
			$("#pills-arbol-tab-mod").addClass("active");
			$("#pills-arbol-mod").addClass("active show");
		}else if(validacionAccesos == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-accesos-tab-mod").addClass("active");
			$("#pills-accesos-mod").addClass("active show");
		}else if(validacionTecnicos == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-tecnico-tab-mod").addClass("active");
			$("#pills-tecnico-mod").addClass("active show");
		}else if(validacionDespachos == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-despacho-tab-mod").addClass("active");
			$("#pills-despacho-mod").addClass("active show");
		}else if(validacionPerfiles == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-perfiles-tab-mod").addClass("active");
			$("#pills-perfiles-mod").addClass("active show");
		}else if(validacionIngenieros == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-ingenieros-tab-mod").addClass("active");
			$("#pills-ingenieros-mod").addClass("active show");
		}else if(validacionSupervisorCentralizado == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-supervisor-centralizado-tab-mod").addClass("active");
			$("#pills-supervisor-centralizado-mod").addClass("active show");
		}else if(validacionCouchDespacho == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-couch-despacho-tab-mod").addClass("active");
			$("#pills-couch-despacho-mod").addClass("active show");
		}else if(validacionSupervisor == false){
			validacion = false;
			$("#pills-tab-mod li a").removeClass('active');
			$("#pills-tabContent-mod .tab-pane").removeClass('active show');
			$("#pills-supervisor-tab-mod").addClass("active");
			$("#pills-supervisor-mod").addClass("active show");
		}else{
			//...
		}
		
		//SI EXISTE ALGÚN CAMPO FALTANTE, MUESTRA EL MENSAJE
		if(validacion == false){
			toastr.info(mensaje);
		}
		//REGRESA LA RESPUESTA BOLEANA
		return validacion;
	}
    
    //MÉTODO PARA BUSCAR INTERVENCIONES DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA INTERVENCIONES MODIFICACIÓN USUARIO
    $scope.busquedaIntervencionMod = function() {
    	$("#arbolIntervencionMod").jstree("search", $('#buscadorIntervencionMod').val());
	}
    
  //MÉTODO PARA BUSCAR PERFILES DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA PERFILES MODIFICACIÓN USUARIO
    $scope.busquedaIntervencionPerfilMod = function() {
    	$("#arbolIntervencionPerfilMod").jstree("search", $('#buscadorIntervencionPerfilMod').val());
	}
    
  //MÉTODO PARA BUSCAR PERFILES SELECCIONADOS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA PERFILES MODIFICACIÓN USUARIO
    $scope.busquedaPerfileSeleccionadoMod = function() {
    	$("#arbolPerfilesSeleccionadosMod").jstree("search", $('#buscadorPerfileSeleccionadoMod').val());
	}
    
    //MÉTODO PARA BUSCAR GEOGRAFÍAS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA ÁRBOL MODIFICACIÓN USUARIO
    $scope.busquedaGeografiaMod = function() {
    	$("#arbolGeografiaMod").jstree("search", $('#buscadorGeografiaMod').val());
	}
    
    //MÉTODO PARA BUSCAR PERMISOS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA ACCESOS MODIFICACIÓN USUARIO
    $scope.busquedaPermisosMod = function() {
    	$("#arbolPermisoMod").jstree("search", $('#buscadorPermisosMod').val());
	}
    
    $scope.cuadrillaSeleccionMod = function(cuadrillaSeleccionada) {
    	$("#cuadrilla_select_mod").val(cuadrillaSeleccionada.descripcion);
    	$("#cuadrilla_select_mod").css("border-bottom", "2px solid #d9d9d9");
	}
    
    //MÉTODO PARA LIMPIAR TODOS LOS CAMPOS DE TODAS LAS PESTAÑAS DE LA MODIFICACIÓN DE USUARIO
    $scope.limpiarDatosModificacion = function() {
    	$scope.tabInformacionMod = true;
    	$scope.tabIntervencionesMod = false;
    	$scope.tabArbolMod = false;
    	$scope.tabAccesosMod = false;
    	$scope.tabTecnicosMod = false;
    	$scope.tabDespachosMod = false;
    	$scope.tabPerfilesMod = false;
    	$scope.tabIngenierosMod = false;
    	$scope.tabSupervisorCentralizadoMod = false;
    	$scope.tabCouchDespachoMod = false;
    	$scope.tabSupervisorMod = false;
    	$scope.tabConfirmacionMod = false;
    	$("#buscadorIntervencionMod").val("");
    	$("#buscadorGeografiaMod").val("");
    	$("#buscadorPermisosMod").val("");
    	$scope.listaPerfilesArbolMod = [];
        $scope.listaMostrarPerfilesSeleccionadosMod = [];
    	$scope.buscarTecnicoMod = "";
    	$scope.buscarTecnicoSeleccionadoMod = "";
    	$scope.buscarDespachoMod = "";
    	$scope.buscarDespachoSeleccionadoMod = "";
    	$scope.buscarCiudadMod = "";
    	$scope.detalleUsuario.intervencionesId = [];
    	$scope.listaIntervencionesSelecionadasMod = [];
        $scope.detalleUsuario.geografiasId = [];
        $scope.listaCiudadesSelecionadasMod = [];
        $scope.detalleUsuario.permisosId = [];
        $scope.listaAccesosSelecionadosMod = [];
        $scope.detalleUsuario.tecnicos = [];
		$scope.detalleUsuario.despachos = [];
		$scope.listaTecnicosMod = [];
	    $scope.listaDespachosMod = [];
	    $scope.listaIngenierosMod = [];
	    $scope.listaSupervisoresCentralizadosMod = [];
	    $scope.listaCouchsDespachosMod = [];
	    $scope.listaSupervisoresMod = [];
	    $scope.listaCiudadNatalMod = [];
	    $scope.geoSelectMod = [];
	    $scope.listaIdsGeografiaCiudadNatalMod = [];
		$('#arbolIntervencionMod').jstree("destroy");
		$('#arbolIntervencionPerfilMod').jstree("destroy");
		$('#arbolPerfilesSeleccionadosMod').jstree("destroy");
		$('#arbolGeografiaMod').jstree("destroy");
		$('#arbolPermisoMod').jstree("destroy");
		$("#puesto_select_modificacion"). prop("selectedIndex",0);
    	$("#compania_select_modificacion"). prop("selectedIndex",0);
    	$("#sexo_select_modificacion"). prop("selectedIndex",0);
    	$("#checkTotdosTecnicosMod").prop("checked",false);
    	$("#cuadrilla_select_mod").val("");
    	$scope.detalleUsuario.ciudadNatal = "";
    	$scope.detalleUsuario.idAsignacionAutomatica;
    	$scope.detalleUsuario = {};
    	$scope.confirmacionModificacion = {};
    	$scope.mostrarAccesosMod = false;
        $scope.mostrarTecnicosMod = false;
        $scope.mostrarDespachoMod = false;
        $scope.isTecnicoMod = false;
        $scope.contadorCambioArbolGeografias = false;
        $scope.iniciarFechaMod();
        $scope.restablecerDisenioCampos();
        $("#pills-confirmar-tab-mod").removeClass("active");
		$("#pills-confirmar-mod").removeClass("active show");
		$("#pills-supervisor-tab-mod").removeClass("active");
		$("#pills-supervisor-mod").removeClass("active show");
		$("#pills-couch-despacho-tab-mod").removeClass("active");
		$("#pills-couch-despacho-mod").removeClass("active show");
		$("#pills-supervisor-centralizado-tab-mod").removeClass("active");
		$("#pills-supervisor-centralizado-mod").removeClass("active show");
		$("#pills-ingenieros-tab-mod").removeClass("active");
		$("#pills-ingenieros-mod").removeClass("active show");
		$("#pills-perfiles-tab-mod").removeClass("active");
		$("#pills-perfiles-mod").removeClass("active show");
		$("#pills-despacho-tab-mod").removeClass("active");
		$("#pills-despacho-mod").removeClass("active show");
		$("#pills-tecnico-tab-mod").removeClass("active");
		$("#pills-tecnico-mod").removeClass("active show");
		$("#pills-accesos-tab-mod").removeClass("active");
		$("#pills-accesos-mod").removeClass("active show");
		$("#pills-arbol-tab-mod").removeClass("active");
		$("#pills-arbol-mod").removeClass("active show");
		$("#pills-intervencion-tab-mod").removeClass("active");
		$("#pills-intervencion-mod").removeClass("active show");
		$("#pills-informacion-tab-mod").addClass("active");
		$("#pills-informacion-mod").addClass("active show");
		$("#modalEdicionUsuario").modal('hide');
    }
    
    $scope.restablecerDisenioCampos = function() {
    	//Inputs - Tab Información
    	$(".inputFormulario").css("border", "1px solid #bdbdbd");
    	//Intervenciones seleccionadas - Tab Intervenciones
    	$("#labelIntervencionesSeleccionadasMod").css("color", "rgb(70, 88, 107)");
    	$("#contenedorIntervencionesRegistroMod").css("border", "white solid 0px");
    	//Geografías seleccionadas - Tab Árbol
    	$("#labelGeografiasSeleccionadasMod").css("color", "rgb(70, 88, 107)");
		$("#contenedorGeografiasRegistroMod").css("border", "white solid 0px");
		//Permisos seleccionados - Tab Accesos
		$("#labelPermisosSeleccionadasMod").css("color", "rgb(70, 88, 107)");
    	$("#contenedorPermisosRegistroMod").css("border", "white solid 0px");
    	//Despachos seleccionados - Tab Despachos
    	$("#labelDespachosSeleccionadosMod").css("color", "rgb(70, 88, 107)");
		$("#contenedorDespachosMod").css("border", "white solid 0px");
	}
    
    //FUNCIONALIDAD QUE CIERRA EL MODAL DE EDICIÓN Y LIMPIA TODOS LOS CAMPOS DE TODAS LAS PESTAÑAS DE LA MODIFICACIÓN DE USUARIO
    $scope.cerrarModalEdicionUsuario = function() {
    	$scope.limpiarDatosModificacion();
	}
    
    $scope.cargarFotoUsuarioMod = function (e) {
		let labelFile = "";
		if (e.target.files[0]) {
			$(labelFile).text(e.target.files[0].name);
			
			var nombreArchivoMod = "";
	    	if($scope.detalleUsuario.numeroEmpleado === "" || $scope.detalleUsuario.numeroEmpleado === undefined){
	    		nombreArchivoMod = "Foto perfil";
	    	}else{
	    		nombreArchivoMod = $scope.detalleUsuario.numeroEmpleado;
	    	}
			
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				let imgMod = {
					"bucketId": $scope.bucketIdImg,
					"archivo": base64[1],
					"nombre": nombreArchivoMod,
					"nuevaFoto": true 
				}
				
				$scope.fileFotoUsuarioMod = {};
				$scope.fileFotoUsuarioMod = imgMod;
				$("#imgFotoUsuarioMod").attr("src", "data:image/jpeg;base64," + $scope.fileFotoUsuarioMod.archivo);
				$("#fileFotoUsuarioMod").val("");
				$scope.$apply();

			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
	}
    
    $scope.eliminarFotoUsuarioMod = function (e) {
    	if($scope.detalleUsuario.urlFotoPerfil != null){
    		if($scope.fileFotoUsuarioMod.nuevaFoto){
    			$("#imgFotoUsuarioMod").attr("src", ""+$scope.detalleUsuario.urlFotoPerfil);
        		$scope.fileFotoUsuarioMod = {};
        		$scope.fileFotoUsuarioMod.nombre = $scope.detalleUsuario.numeroEmpleado;
    			$scope.fileFotoUsuarioMod.nuevaFoto = false; 
    		}else{
    			$scope.fileFotoUsuarioMod = null;
            	$("#imgFotoUsuarioMod").attr("src", "./resources/img/plantainterna/despacho/tecnicootasignada.png");
    		}
    	}else{
    		$scope.fileFotoUsuarioMod = null;
        	$("#imgFotoUsuarioMod").attr("src", "./resources/img/plantainterna/despacho/tecnicootasignada.png");
    	}
    };
    
    $scope.obtenerFotoTomadaMod = function() {
    	var fotoMod = document.getElementById('canvasMod');
    	var archivoMod = fotoMod.toDataURL().split(",");

    	var nombreArchivoMod = "";
    	if($scope.detalleUsuario.numeroEmpleado === "" || $scope.detalleUsuario.numeroEmpleado === undefined){
    		nombreArchivoMod = "Foto perfil";
    	}else{
    		nombreArchivoMod = $scope.detalleUsuario.numeroEmpleado;
    	}
    	
		let imgMod = {
				"bucketId": $scope.bucketIdImg,
				"archivo": archivoMod[1],
				"nombre": nombreArchivoMod,
				"nuevaFoto": true
			}

		$scope.fileFotoUsuarioMod = imgMod;
		$("#modalTomarFotoUsuarioMod").modal('hide');
	}
    
    $scope.cerrarModalTomarFotoUsuarioMod = function() {
    	$("#modalTomarFotoUsuarioMod").modal('hide');
	}
    
    $("#pills-intervencion-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorIntervencionMod").focus();
    	}, 750);
    });
    
    $("#pills-perfiles-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorIntervencionPerfilMod").focus();
	    }, 750);
    });
    
    $("#pills-arbol-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorGeografiaMod").focus();
    	}, 750);
    });
    
    $("#pills-accesos-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorPermisosMod").focus();
    	}, 750);
    });
    
    $("#pills-tecnico-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorTecnicoMod").focus();
    	}, 750);
    });
    
    $("#pills-despacho-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorDespachoMod").focus();
    	}, 750);
    });
    
    $("#pills-ingenieros-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorIngenieroMod").focus();
    	}, 750);
    });
    
    $("#pills-supervisor-centralizado-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorSupervisorCentralizadoMod").focus();
    	}, 750);
    });
    
    $("#pills-couch-despacho-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorCouchMod").focus();
    	}, 750);
    });
    
    $("#pills-supervisor-tab-mod").click(function() {
    	setTimeout(function (){
	        $("#buscadorSupervisorMod").focus();
    	}, 750);
    });
    
    $(".formValExisteUsuarioMod").change(function() {
    	if($scope.detalleUsuario.numeroEmpleado !== undefined && $scope.detalleUsuario.numeroEmpleado !== "" &&
    	   $scope.detalleUsuario.usuario !== undefined && $scope.detalleUsuario.usuario !== "" &&
    	   $scope.detalleUsuario.nombre !== undefined && $scope.detalleUsuario.nombre !== "" &&
    	   $scope.detalleUsuario.apellidoPaterno !== undefined && $scope.detalleUsuario.apellidoPaterno !== "" &&
    	   $scope.detalleUsuario.apellidoMaterno !== undefined && $scope.detalleUsuario.apellidoMaterno !== "" &&
    	   $scope.detalleUsuario.curp !== undefined && $scope.detalleUsuario.curp !== "" &&
    	   $scope.detalleUsuario.rfc !== undefined && $scope.detalleUsuario.rfc !== ""){
    		
    		let paramsValExisteUserMod = {
    				idUsuario: $scope.detalleUsuario.idUsuario,
    				nombre: $scope.detalleUsuario.nombre,
        			apellidoPaterno: $scope.detalleUsuario.apellidoPaterno,
        			apellidoMaterno: $scope.detalleUsuario.apellidoMaterno,
        			numeroEmpleado: $scope.detalleUsuario.numeroEmpleado,
        			usuario: $scope.detalleUsuario.usuario,
        			rfc: $scope.detalleUsuario.rfc,
        			curp: $scope.detalleUsuario.curp
    		}
    		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
    		swal.showLoading();
        	$q.all([
        		usuarioPIService.validarUsuarioExistente(paramsValExisteUserMod)
            ]).then(function(results) {
            	swal.close();
            	$scope.existeUsuarioValidacionMod = false;
            	$("#form-num-empleado-mod").css("border", "1px solid #bdbdbd");
    			$("#form-usuario-mod").css("border", "1px solid #bdbdbd");
    			$("#form-nombres-mod").css("border", "1px solid #bdbdbd");
    			$("#form-a-paterno-mod").css("border", "1px solid #bdbdbd");
    			$("#form-a-materno-mod").css("border", "1px solid #bdbdbd");
    			$("#form-curp-mod").css("border", "1px solid #bdbdbd");
    			$("#form-rfc-mod").css("border", "1px solid #bdbdbd");
            	if(results[0].data.respuesta){
            		var respuesta = results[0].data.result;
            		var mensajeRespuesta = "";
            		
            		if(respuesta.usuarioCompleto){
            			$scope.existeUsuarioValidacionMod = true;
            			$("#form-num-empleado-mod").css("border-bottom", "2px solid #f55756");
            			$("#form-usuario-mod").css("border-bottom", "2px solid #f55756");
            			$("#form-nombres-mod").css("border-bottom", "2px solid #f55756");
            			$("#form-a-paterno-mod").css("border-bottom", "2px solid #f55756");
            			$("#form-a-materno-mod").css("border-bottom", "2px solid #f55756");
            			$("#form-curp-mod").css("border-bottom", "2px solid #f55756");
            			$("#form-rfc-mod").css("border-bottom", "2px solid #f55756");
            			mensajeRespuesta = mensajeRespuesta + "\n El usuario ya existe.";
            		}else{
            			if(respuesta.usuarioFfm){
                			$scope.existeUsuarioValidacionMod = true;
                			$("#form-usuario-mod").css("border-bottom", "2px solid #f55756");
                			mensajeRespuesta = mensajeRespuesta + "\n El usuario FFM ya existe.";
                		}
                		if(respuesta.curp){
                			$scope.existeUsuarioValidacionMod = true;
                			$("#form-curp-mod").css("border-bottom", "2px solid #f55756");
                			mensajeRespuesta = mensajeRespuesta + "\n La CURP ya existe.";
                		}
            		}
            		
            		if($scope.existeUsuarioValidacionMod){
            			swal({type: "info", title:"Aviso", text:mensajeRespuesta});
            		}
            		
            	}else{
            		swal("Error", results[0].data.resultDescripcion, "error");
            	}
            });
    		
    	}
    });
	
	//LOS SIGUIENTES 2 MÉTODOS SE QUEDAN PENDIENTES POR SI EN ALGÚN MOMENTO SE DECIDE EDITAR TAMBIÉN EL PUESTO DEL USUARIO
//	$('#puesto_select_modificacion').on('change', function() {
//    	$("#puesto_select_modificacion").css("border", "1px solid #bdbdbd");
//    	$('#arbolGeografiaMod').jstree("destroy");
//    	$('#arbolIntervencionMod').jstree("deselect_all");
//    	$('#arbolGeografiaMod').jstree("deselect_all");
//    	$('#arbolPermisoMod').jstree("deselect_all");
//    	$("#arbolIntervencionMod").jstree('close_all');
//    	$("#arbolGeografiaMod").jstree('close_all');
//    	$("#arbolPermisoMod").jstree('close_all');
//    	$("#buscadorIntervencionMod").val("");
//    	$("#buscadorGeografiaMod").val("");
//    	$("#buscadorPermisosMod").val("");
//    	$scope.listaIntervencionesSelecionadasMod = [];
//    	$scope.listaCiudadesSelecionadasMod = [];
//    	$scope.listaAccesosSelecionadosMod = [];
//    	// ----------------------------------------------------------------------------------------------------------------PENDIENTE DE REGISTROS DE ID'S
//    	// ----------------------------------------------------------------------------------------------------------------PENDIENTE DE REGISTROS DE ID'S
//    	// ----------------------------------------------------------------------------------------------------------------PENDIENTE DE REGISTROS DE ID'S
//    	//$scope.informacionRegistro.geografias = [];
//    	
//    	var puestoSeleccionado = $("#puesto_select_modificacion option:selected").text().toLowerCase();
//    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
//    	if(puestoSeleccionado == "tecnico"){
//    		$scope.mostrarAccesosMod = false;
//    	    $scope.mostrarTecnicosMod = false;
//    	    $scope.isTecnicoMod = true;
//    	    $scope.mostrarDespachoMod = true;
//    	}else{
//    		$scope.mostrarAccesosMod = true;
//    	    $scope.mostrarTecnicosMod = true;
//    	    $scope.isTecnicoMod = false;
//    	    $scope.mostrarDespachoMod = false;
//    	}
//    	$scope.$apply();
//    });
//	
//	//MÉTODO QUE MUESTRA EL TIPO DE ÁRBOL DE GEOGRAFÍAS SEGÚN EL PUESTO SELECCIONADO - PESTAÑA ÁRBOL MODIFICAR USUARIO
//    $scope.mostrarArbolGeografiaMod = function() {
//    	var puestoSeleccionado = $("#puesto_select_modificacion option:selected").text().toLowerCase();
//    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
//    	var plugins = [];
//    	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
//    		plugins = ['search'];
//    	}else{
//    		plugins = ['search', 'checkbox', 'wholerow'];
//    	}
//    	
//    	let geografiasNivelCiudad = [];
//    	angular.forEach($scope.listaGeografiasRespaldo,function(elementoGeografia,index){
//    		if(elementoGeografia.nivel <= $scope.filtroGeografias){
//    			geografiasNivelCiudad.push(elementoGeografia);
//    		}
//    	});
//    	
//    	let geografia = geografiasNivelCiudad;
//        geografia.map((e)=>{
//            e.parent=e.padre == undefined ? "#" : e.padre;
//            e.text= e.nombre;
//            e.icon= "fa fa-globe";
//            return e
//        })       
//        $('#arbolGeografiaMod').bind('loaded.jstree', function(e, data) {
//			//$(this).jstree("open_all");
//        }).jstree({
//        	'plugins': plugins,
//			'core': {
//				'data': geografia,
//                'themes': {
//                    'name': 'proton',
//                    'responsive': true,
//                    "icons":false        
//                }
//            }
//		});
//	}
}