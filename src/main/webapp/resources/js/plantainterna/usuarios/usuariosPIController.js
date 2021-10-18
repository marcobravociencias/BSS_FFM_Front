var app = angular.module('usuarioApp', []);
var detalleTable;
//EL SIGUIENTE JSON DEBE QUITARSE UNA VEZ QUE SE TENGA EL SERVICIO DE CONSULTAR EL CATÁLOGO DE TÉCNICOS
let jsonTecnicos = [{"apellidoMaterno": "APEIDO MATERNO","apellidoPaterno": "APEIDO PATERNO","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 1,"idUsuario": 1250,"no_empleado": "100","nombre": "NOMBRE","nombreCompleto": "NOMBRE APEIDO PATERNO APEIDO MATERNO","skills": [102, 109],"usuario": "user19"},{"apellidoMaterno": "BRITO","apellidoPaterno": "FLORES","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1251,"no_empleado": "2","nombre": "REYNEL","nombreCompleto": "REYNEL FLORES BRITO","skills": [102, 109],"usuario": "user20"},{"apellidoMaterno": "SANTAMARIA","apellidoPaterno": "ORDUÑA","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1252,"no_empleado": "3","nombre": "HECTOR","nombreCompleto": "HECTOR SANTAMARIA ORDUÑA","skills": [102, 109],"usuario": "user21"},{"apellidoMaterno": "TORRES","apellidoPaterno": "LOPEZ","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1253,"no_empleado": "4","nombre": "JUAN","nombreCompleto": "JUAN LOPEZ TORRES","skills": [102, 109],"usuario": "user22"}
	 ,{"apellidoMaterno": "APEIDO MATERNO","apellidoPaterno": "APEIDO PATERNO","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 1,"idUsuario": 1250,"no_empleado": "100","nombre": "NOMBRE","nombreCompleto": "NOMBRE APEIDO PATERNO APEIDO MATERNO","skills": [102, 109],"usuario": "user19"},{"apellidoMaterno": "BRITO","apellidoPaterno": "FLORES","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1251,"no_empleado": "2","nombre": "REYNEL","nombreCompleto": "REYNEL FLORES BRITO","skills": [102, 109],"usuario": "user20"},{"apellidoMaterno": "SANTAMARIA","apellidoPaterno": "ORDUÑA","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1252,"no_empleado": "3","nombre": "HECTOR","nombreCompleto": "HECTOR SANTAMARIA ORDUÑA","skills": [102, 109],"usuario": "user21"},{"apellidoMaterno": "TORRES","apellidoPaterno": "LOPEZ","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1253,"no_empleado": "4","nombre": "JUAN","nombreCompleto": "JUAN LOPEZ TORRES","skills": [102, 109],"usuario": "user22"},{"apellidoMaterno": "APEIDO MATERNO","apellidoPaterno": "APEIDO PATERNO","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 1,"idUsuario": 1250,"no_empleado": "100","nombre": "NOMBRE","nombreCompleto": "NOMBRE APEIDO PATERNO APEIDO MATERNO","skills": [102, 109],"usuario": "user19"},{"apellidoMaterno": "BRITO","apellidoPaterno": "FLORES","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1251,"no_empleado": "2","nombre": "REYNEL","nombreCompleto": "REYNEL FLORES BRITO","skills": [102, 109],"usuario": "user20"},{"apellidoMaterno": "SANTAMARIA","apellidoPaterno": "ORDUÑA","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1252,"no_empleado": "3","nombre": "HECTOR","nombreCompleto": "HECTOR SANTAMARIA ORDUÑA","skills": [102, 109],"usuario": "user21"},{"apellidoMaterno": "TORRES","apellidoPaterno": "LOPEZ","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1253,"no_empleado": "4","nombre": "JUAN","nombreCompleto": "JUAN LOPEZ TORRES","skills": [102, 109],"usuario": "user22"},{"apellidoMaterno": "APEIDO MATERNO","apellidoPaterno": "APEIDO PATERNO","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 1,"idUsuario": 1250,"no_empleado": "100","nombre": "NOMBRE","nombreCompleto": "NOMBRE APEIDO PATERNO APEIDO MATERNO","skills": [102, 109],"usuario": "user19"},{"apellidoMaterno": "BRITO","apellidoPaterno": "FLORES","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1251,"no_empleado": "2","nombre": "REYNEL","nombreCompleto": "REYNEL FLORES BRITO","skills": [102, 109],"usuario": "user20"},{"apellidoMaterno": "SANTAMARIA","apellidoPaterno": "ORDUÑA","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1252,"no_empleado": "3","nombre": "HECTOR","nombreCompleto": "HECTOR SANTAMARIA ORDUÑA","skills": [102, 109],"usuario": "user21"},{"apellidoMaterno": "TORRES","apellidoPaterno": "LOPEZ","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1253,"no_empleado": "4","nombre": "JUAN","nombreCompleto": "JUAN LOPEZ TORRES","skills": [102, 109],"usuario": "user22"},{"apellidoMaterno": "APEIDO MATERNO","apellidoPaterno": "APEIDO PATERNO","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 1,"idUsuario": 1250,"no_empleado": "100","nombre": "NOMBRE","nombreCompleto": "NOMBRE APEIDO PATERNO APEIDO MATERNO","skills": [102, 109],"usuario": "user19"},{"apellidoMaterno": "BRITO","apellidoPaterno": "FLORES","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1251,"no_empleado": "2","nombre": "REYNEL","nombreCompleto": "REYNEL FLORES BRITO","skills": [102, 109],"usuario": "user20"},{"apellidoMaterno": "SANTAMARIA","apellidoPaterno": "ORDUÑA","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1252,"no_empleado": "3","nombre": "HECTOR","nombreCompleto": "HECTOR SANTAMARIA ORDUÑA","skills": [102, 109],"usuario": "user21"},{"apellidoMaterno": "TORRES","apellidoPaterno": "LOPEZ","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1253,"no_empleado": "4","nombre": "JUAN","nombreCompleto": "JUAN LOPEZ TORRES","skills": [102, 109],"usuario": "user22"},{"apellidoMaterno": "APEIDO MATERNO","apellidoPaterno": "APEIDO PATERNO","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 1,"idUsuario": 1250,"no_empleado": "100","nombre": "NOMBRE","nombreCompleto": "NOMBRE APEIDO PATERNO APEIDO MATERNO","skills": [102, 109],"usuario": "user19"},{"apellidoMaterno": "BRITO","apellidoPaterno": "FLORES","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1251,"no_empleado": "2","nombre": "REYNEL","nombreCompleto": "REYNEL FLORES BRITO","skills": [102, 109],"usuario": "user20"},{"apellidoMaterno": "SANTAMARIA","apellidoPaterno": "ORDUÑA","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1252,"no_empleado": "3","nombre": "HECTOR","nombreCompleto": "HECTOR SANTAMARIA ORDUÑA","skills": [102, 109],"usuario": "user21"},{"apellidoMaterno": "TORRES","apellidoPaterno": "LOPEZ","geografia": "CIUDAD DE MEXICO-CENTRO","geografias": [{"idGeografia": 100, "geografia": "CIUDAD DE MEXICO-CENTRO"}],"idGeografia": 100,"idUsuario": 1253,"no_empleado": "4","nombre": "JUAN","nombreCompleto": "JUAN LOPEZ TORRES","skills": [102, 109],"usuario": "user22"}
	 ];

app.controller('usuarioController', ['$scope', '$q', 'usuarioPIService', '$filter', function ($scope, $q, usuarioPIService, $filter) {
	$("#moduloUsuarios").addClass('active');
	
	app.editarUsuarioController($scope,usuarioPIService);
	//ELEMENTOS PARA CONSULTA
	let tablaUsuarios;
	$scope.listaCompanias = [];
    $scope.listaPuestos = [];
    $scope.listaGeografias = [];
	$scope.listaGeografiasRespaldo = [];
	$scope.listaPermisosRespaldo = [];
    $scope.listaIdGeografias = [];
    $scope.elementosPorPaginaTablaConsulta = 10;
    $scope.paginaTablaConsulta = 1;
    //ELEMENTOS PARA REGISTRO
    let acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    let geografiasNivelCiudad = [];
    var existePadre = false;
    $scope.confirmacionRegistro = {};
    $scope.informacionRegistro = {};
    $scope.listaPermisos = [];
    $scope.listaIntervenciones = [];
    $scope.listaIntervencionesSeleccionadas = [];
    $scope.listaGeografiasSeleccionadas = [];
    $scope.listaPermisosSeleccionados = [];
    $scope.listaTecnicos = [];
    $scope.informacionRegistro.asignacionAutomatica = 0;
    $scope.mostrarAccesos = true;
    $scope.mostrarTecnicos = true;
    //PENDIENTES
	$scope.respaldoIntervenciones = [];
   
    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });
    
    $scope.iniciarModuloUsuarios = function() {
    	let paramsConfiguracionDespacho ={
				moduloAccionesUsuario: 'moduloUsuarios'
	    };
    	let params1 = {idUsuario:10};
    	swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
		swal.showLoading();
    	$q.all([
    		usuarioPIService.consultarConfiguracionDespachoDespacho(paramsConfiguracionDespacho),
    		usuarioPIService.consultaCompanias(),
    		usuarioPIService.consultaPuestos(),
    		usuarioPIService.consultaPermisos(),
    		usuarioPIService.consultaGeografias(),
    		usuarioPIService.consultaIntervenciones(),
    		usuarioPIService.consultaUsuarioPorId(params1)
        ]).then(function(results) {
        	// *** CONFIGURACIÓN DESPACHO ***
        	var nivelUsuario = results[0].data.result.N_FILTRO_GEOGRAFIA;
        	
        	// *** COMPAÑIAS ***
        	if (results[1].data !== undefined) {
            	if(results[1].data.respuesta){
            		if(results[1].data.result.companias.length > 0){
            			$scope.listaCompanias = results[1].data.result.companias;
            		}else{
                    	toastr.warning('¡No existen compañías actualmente!');
                    }
            	}else{
            		toastr.warning('¡No existen compañías actualmente!');
            	}
            }else{
            	toastr.error('Error interno en el servidor.');
            }
            
            // *** PUESTOS ***
        	if (results[2].data !== undefined) {
            	if(results[2].data.respuesta){
            		if(results[2].data.result.puestos.length > 0){
            			$scope.listaPuestos = results[2].data.result.puestos;
            		}else{
            			toastr.warning('¡No existen puestos actualmente!');
            		}
            	}else{
            		toastr.warning('¡No existen puestos actualmente!');
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
            
            // *** PERMISOS ***
        	if (results[3].data !== undefined) {
            	if(results[3].data.respuesta){
            		if(results[3].data.result.permisos.length > 0){
            			let permisosLista = results[3].data.result.permisos;
            			$scope.listaPermisos = results[3].data.result.permisos;
            			
            			permisosLista.map((e)=>{
                            e.parent = e.idPadre == undefined ? "#" : e.idPadre;
                            e.text= e.nombre;
                            e.icon= "fa fa-globe";
                            return e
                        })       
						$scope.listaPermisosRespaldo = angular.copy(permisosLista);
                        $('#arbolPermisoRegistro').bind('loaded.jstree', function(e, data) {
							//$(this).jstree("open_all");
                        }).jstree({
                        	'plugins': ['search', 'checkbox', 'wholerow'],
							'core': {
								'data': permisosLista,
                                'themes': {
                                    'name': 'proton',
                                    'responsive': true,
                                    "icons":false        
                                }
                            }
						});
            		}else{
            			toastr.warning('¡No existen permisos actualmente!');
            		}
            	}else{
            		toastr.warning('¡No existen permisos actualmente!');
            	}
        	}else{
        		toastr.error('Error interno en el servidor.');
        	}
            
            // *** GEOGRAFÍAS ***
            if (results[4].data !== undefined) {
            	if(results[4].data.respuesta){
            		if(results[4].data.result.geografia.length > 0){
            			let listGeografias = [];
                    	if(nivelUsuario !== undefined){
                    		results[4].data.result.geografia.forEach(elemento =>{
	                            if (elemento.nivel <= nivelUsuario) {
	                            	listGeografias.push(elemento);
	                            	$scope.listaGeografias.push(elemento);
									$scope.listaGeografiasRespaldo.push(elemento);
	                            }
	                        });
                    	}else{
                    		listGeografias = results[4].data.result.geografia;
                    		$scope.listaGeografias = results[4].data.result.geografia;
                    		$scope.listaGeografiasRespaldo = results[4].data.result.geografia;
                    	}
                    	geografia=listGeografias;
                        geografia.map((e)=>{
                            e.parent=e.padre == undefined ? "#" : e.padre;
                            e.text= e.nombre;
                            e.icon= "fa fa-globe";
                            return e
                        })       
                        $('#arbolGeografiaConsulta').bind('loaded.jstree', function(e, data) {
							//$(this).jstree("open_all");
                        }).jstree({
                        	'plugins': ['search', 'checkbox', 'wholerow'],
							'core': {
								'data': geografia,
                                'themes': {
                                    'name': 'proton',
                                    'responsive': true,
                                    "icons":false        
                                }
                            }
						});
                    }else{
                    	toastr.warning('¡No existen geografías actualmente!');
                    }
            	}else{
            		toastr.warning('¡No existen geografías actualmente!');
            	}
            }else{
            	toastr.error('Error interno en el servidor.');
            }
            
         // *** INTERVENCIONES ***
            if (results[5].data !== undefined) {
            	if(results[5].data.respuesta){
            		if(results[5].data.result.length > 0){
            			let intervencionesLista = [];
						$scope.respaldoIntervenciones = results[5].data.result;
            			results[5].data.result.forEach(intervencion =>{
                            if (intervencion.nivel == 1) {
                            	intervencionesLista.push(intervencion);
                            	$scope.listaIntervenciones.push(intervencion);
                            }
                        });
            			if(intervencionesLista.length > 0){
            				intervencionesLista.map((e)=>{
                                e.parent = e.idPadre == undefined ? "#" : e.idPadre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                return e
                            })       
                            $('#arbolIntervencionRegistro').bind('loaded.jstree', function(e, data) {
    							//$(this).jstree("open_all");
                            }).jstree({
                            	'plugins': ['search', 'checkbox', 'wholerow'],
    							'core': {
    								'data': intervencionesLista,
                                    'themes': {
                                        'name': 'proton',
                                        'responsive': true,
                                        "icons":false        
                                    }
                                }
    						});
            			}else{
            				toastr.warning('¡No existen intervenciones actualmente!');
            			}
            		}else{
                    	toastr.warning('¡No existen intervenciones actualmente!');
                    }
            	}else{
            		toastr.warning('¡No existen intervenciones actualmente!');
            	}
            }else{
            	toastr.error('Error interno en el servidor.');
            }
        	swal.close();
        });
    	
    	if (tablaUsuarios) {
			tablaUsuarios.destroy();
		}
		
		tablaUsuarios = $('#table-usuario-pi').DataTable({
			"processing": false,
			"ordering": false,
			"serverSide": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"data": [],
			"columns": [null, null, null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});
	}
    
    $scope.iniciarModuloUsuarios();
    
    
  //ABRE EL MODAL DEL ÁRBOL DE LAS GEOGRAFÍAS - VISTA CONSULTA USUARIOS
    $scope.abrirModalGeografiaConsulta = function() {
    	if($scope.listaGeografias != ""){
    		$("#modalGeografiaConsulta").modal('show');
    	}else{
    		toastr.warning('¡No existen geografías actualmente!');
    	}
	}
    
    //CIERRA EL MODAL DEL ÁRBOL DE LAS GEOGRAFÍAS - VISTA CONSULTA USUARIOS
    $scope.cerrarModalGeografiaConsulta = function() {
    	$("#modalGeografiaConsulta").modal('hide');
	}
    
    //MÉTODO PARA BUSCAR GEOGRAFÍAS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - MODAL GEOGRAFÍAS CONSULTA USUARIOS
    $scope.busquedaGeografiaConsulta = function() {
    	$("#arbolGeografiaConsulta").jstree("search", $('#buscadorGeografiaConsulta').val());
	}
    
    //MÉTODO PARA BUSCAR INTERVENCIONES DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA INTERVENCIONES REGISTRO USUARIO
    $scope.busquedaIntervencionRegistro = function() {
    	$("#arbolIntervencionRegistro").jstree("search", $('#buscadorIntervencionRegistro').val());
	}
    
    //MÉTODO PARA BUSCAR GEOGRAFÍAS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA ÁRBOL REGISTRO USUARIO
    $scope.busquedaGeografiaRegistro = function() {
    	$("#arbolGeografiaRegistro").jstree("search", $('#buscadorGeografiaRegistro').val());
	}
    
    //MÉTODO PARA BUSCAR PERMISOS DE ACUERDO AL TEXTO INGRESADO EN EL INPUT DE BÚSQUEDA - PESTAÑA ACCESOS REGISTRO USUARIO
    $scope.busquedaPermisosRegistro = function() {
    	$("#arbolPermisoRegistro").jstree("search", $('#buscadorPermisosRegistro').val());
	}
    
    //MÉTODO QUE CONSULTA LOS USUARIOS DE ACUERDO A LA SELECCIÓN DE COMPAÑÍA(S), PUESTO(S) Y GEOGRAFÍA(S) - VISTA CONSULTA USUARIOS
    $scope.consultaUsuariosPorGeoCompPuestos = function() {
    	$scope.listaIdGeografias = [];
    	let companiasSeleccionadas = [];
    	let puestosSeleccionados = [];
    	var geografias = $('#arbolGeografiaConsulta').jstree("get_selected", true);
		
		angular.forEach($scope.listaCompanias,function(compania,index){
			if(compania.checkedOpcion){
				companiasSeleccionadas.push(compania.id);
			}
		});
		
		angular.forEach($scope.listaPuestos,function(puesto,index){
			if(puesto.checkedOpcion){
				puestosSeleccionados.push(puesto.id);
			}
		});
    	
		angular.forEach(geografias,(geografia,index) => {
			$scope.listaIdGeografias.push(geografia.id);				
		});
	        		
		let params = {
				geografias: $scope.listaIdGeografias,
	        	companias: companiasSeleccionadas,
	        	puestos: puestosSeleccionados,
	        	elementosPorPagina: $scope.elementosPorPaginaTablaConsulta,
	        	pagina: $scope.paginaTablaConsulta
		}
		
		var respuestaValidacion = $scope.validarDatosConsultaUsuarios(params);
	        		
	    if(respuestaValidacion.validacion){
	    	if (tablaUsuarios) {
	    		tablaUsuarios.destroy();
	    	}
	        			
	    	tablaUsuarios = $('#table-usuario-pi').DataTable({
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
		        	"url": "req/consultaUsuariosPorGeoCompPuestos",
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
		        "language": idioma_espanol_not_font,
		        "aoColumnDefs" : [ 
		        	{"aTargets" : [6], "sClass":  "txtTablaConsultaCentrado"},
		            {"aTargets" : [7], "sClass":  "txtTablaConsultaCentrado"}
		        ]
	    	});
	    	$("#modalGeografiaConsulta").modal('hide');
		    $("#contenedorPrincipalTabla").show();
	    }else{
	    	toastr.warning(respuestaValidacion.mensaje);
	    }
	}
    
    //MÉTODO PARA VALIDAR LOS CAMPOS QUE SE REQUIEREN PARA REALIZAR LA CONSULTA DE USUARIOS
    $scope.validarDatosConsultaUsuarios = function(params){
    	let respuesta = {validacion:true, mensaje:""};
    	if(params.companias.length < 1){
    		$("#txtCompania").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Compañía (s)";
    	}else{
    		$("#txtCompania").css("border-bottom", "2px solid #d9d9d9");
    	}
    	if(params.puestos.length < 1){
    		$("#txtPuesto").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Puesto (s)";
    	}else{
    		$("#txtPuesto").css("border-bottom", "2px solid #d9d9d9");
    	}
    	if(params.geografias.length < 1){
    		$("#txtGeografiasConsulta").css("border-bottom", "2px solid #f55756");
    		respuesta.validacion = false;
			respuesta.mensaje = respuesta.mensaje + "<br/> *Geografía (s)";
    	}else{
    		$("#txtGeografiasConsulta").css("border-bottom", "2px solid #d9d9d9");
    	}
    	
    	if(!respuesta.validacion){
			respuesta.mensaje = "VALIDA LOS SIGUIENTES CAMPOS: " + respuesta.mensaje;
		}
    	
    	return respuesta;
    }
    
    //MÉTODO QUE MUESTRA EL TIPO DE ÁRBOL DE GEOGRAFÍAS SEGÚN EL PUESTO SELECCIONADO - PESTAÑA ÁRBOL REGISTRO USUARIO
    $scope.mostrarArbolGeografiaRegistro = function() {
    	var puestoSeleccionado = $("#puesto_select_registro option:selected").text().toLowerCase();
    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
    	var plugins = [];
    	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
    		plugins = ['search'];
    	}else{
    		plugins = ['search', 'checkbox', 'wholerow'];
    	}
    	
    	geografiasNivelCiudad = [];
    	angular.forEach($scope.listaGeografias,function(elementoGeografia,index){
    		if(elementoGeografia.nivel < 4){
    			geografiasNivelCiudad.push(elementoGeografia);
    		}
    	});
    	
    	let geografia = geografiasNivelCiudad;
        geografia.map((e)=>{
            e.parent=e.padre == undefined ? "#" : e.padre;
            e.text= e.nombre;
            e.icon= "fa fa-globe";
            return e
        })       
        $('#arbolGeografiaRegistro').bind('loaded.jstree', function(e, data) {
			//$(this).jstree("open_all");
        }).jstree({
        	'plugins': plugins,
			'core': {
				'data': geografia,
                'themes': {
                    'name': 'proton',
                    'responsive': true,
                    "icons":false        
                }
            }
		});
	}
    
    //MÉTODO PARA VALIDACIÓN DE INFORMACIÓN DE LOS DATOS MOSTRADOS EN LA VISTA - PESTAÑA CONFIRMACIÓN REGISTRO USUARIO
    $scope.cargarInfoConfirmacionRegistro = function() {
    	$scope.confirmacionRegistro.nombre = 
          $scope.informacionRegistro.nombre !== undefined && $scope.informacionRegistro.nombre !== "" &&
          $scope.informacionRegistro.apellidoPaterno !== undefined && $scope.informacionRegistro.apellidoPaterno !== "" &&
          $scope.informacionRegistro.apellidoMaterno !== undefined && $scope.informacionRegistro.apellidoMaterno !== "" ?
          $scope.informacionRegistro.nombre + ' ' + $scope.informacionRegistro.apellidoPaterno + ' ' + $scope.informacionRegistro.apellidoMaterno : "Sin asignar";
    	$scope.confirmacionRegistro.usuario = $scope.informacionRegistro.numEmpleado !== undefined && $scope.informacionRegistro.numEmpleado !== "" ? $scope.informacionRegistro.numEmpleado : "Sin asignar";
    	$scope.confirmacionRegistro.correo = $scope.informacionRegistro.correo !== undefined && $scope.informacionRegistro.correo !== "" ? $scope.informacionRegistro.correo : "Sin asignar";
    	$scope.confirmacionRegistro.contrasena = $scope.informacionRegistro.contrasena !== undefined && $scope.informacionRegistro.contrasena !== "" ? $scope.informacionRegistro.contrasena : "Sin asignar";
    	$scope.confirmacionRegistro.puesto = $("#puesto_select_registro option:selected").text();
    	$scope.confirmacionRegistro.fechaIngreso = $scope.informacionRegistro.fechaIngreso !== undefined && $scope.informacionRegistro.fechaIngreso !== "" ? $scope.informacionRegistro.fechaIngreso : "Sin asignar";
	}
    
    $('#puesto_select_registro').on('change', function() {
    	$("#puesto_select_registro").css("border", "1px solid #d9d9d9");
    	$('#arbolGeografiaRegistro').jstree("destroy");
    	$('#arbolIntervencionRegistro').jstree("deselect_all");
    	$('#arbolGeografiaRegistro').jstree("deselect_all");
    	$('#arbolPermisoRegistro').jstree("deselect_all");
    	$( "#arbolIntervencionRegistro").jstree('close_all', -1);
    	$( "#arbolGeografiaRegistro").jstree('close_all');
    	$( "#arbolPermisoRegistro").jstree('close_all');
    	$("#buscadorIntervencionRegistro").val("");
    	$("#buscadorGeografiaRegistro").val("");
    	$("#buscadorPermisosRegistro").val("");
    	$scope.listaIntervencionesSeleccionadas = [];
    	$scope.listaGeografiasSeleccionadas = [];
    	$scope.listaPermisosSeleccionados = [];
    	
    	var puestoSeleccionado = $("#puesto_select_registro option:selected").text().toLowerCase();
    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
    	if(puestoSeleccionado == "tecnico"){
    		$scope.mostrarAccesos = false;
    	    $scope.mostrarTecnicos = false;
    	}else{
    		$scope.mostrarAccesos = true;
    	    $scope.mostrarTecnicos = true;
    	}
    	$scope.listaTecnicos = jsonTecnicos;
    	$("#checkTotdosTecnicosRegistro").prop("checked",false);
    	angular.forEach($scope.listaTecnicos,function(tecnico,index){
    		tecnico.checkedOpcion = false;
		});
    	
    	$scope.$apply();
    });
    
    //MÉTODO QUE ASIGNA LA/LAS INTERVENCIÓN(ES) SELECCIONADA(S) A LA LISTA DE 'listaIntervencionesSeleccionadas' PARA MOSTRAR - PESTAÑA INTERVENCIONES REGISTRO USUARIO
    $("#arbolIntervencionRegistro").click(function() {
    	$scope.listaIntervencionesSeleccionadas = [];
    	$scope.informacionRegistro.intervenciones = [];
    	var intervencionesTree = $('#arbolIntervencionRegistro').jstree("get_selected", true);
    	intervencionesTree.forEach(intervencion =>{
    		$scope.listaIntervencionesSeleccionadas.push(intervencion.text);
    		$scope.informacionRegistro.intervenciones.push(intervencion.id);
    	});
    	$("#labelIntervencionesSeleccionadas").css("color", "rgb(70, 88, 107)");
		$("#contenedorIntervencionesRegistro").css("border", "white solid 0px");
    	$scope.$apply();
    });
    
    //MÉTODO QUE ASIGNA LA/LAS GEOGRAFÍA(S) SELECCIONADA(S) A LA LISTA DE 'listaGeografiasSeleccionadas' PARA MOSTRAR - PESTAÑA ÁRBOL REGISTRO USUARIO
    $("#arbolGeografiaRegistro").click(function() {
    	$scope.listaGeografiasSeleccionadas = [];
    	$scope.informacionRegistro.geografias = [];
    	var geografiasTree = $('#arbolGeografiaRegistro').jstree("get_selected", true);
    	geografiasTree.forEach(geo =>{
    		if(geo.original.nivel == 3){
    			var idPadre = geo.original.padre;
    			$scope.listaGeografiasSeleccionadas.forEach(geoPadre =>{
    				if(geoPadre.id == idPadre){
    					existePadre = true;
    					geoPadre.hijos.push(geo);
    				}
    			});
    			if(existePadre){
				}else{
					$scope.listaGeografias.forEach(geoListaGeneral =>{
						if(geoListaGeneral.id == idPadre){
							$scope.listaGeografiasSeleccionadas.push(geoListaGeneral);
						}
					});
					$scope.listaGeografiasSeleccionadas.forEach(geoPadre =>{
	    				if(geoPadre.id == idPadre){
	    					geoPadre.hijos = [geo];
	    				}
	    			});
				}
    			$scope.informacionRegistro.geografias.push(geo.id);
    			existePadre = false;
    		}
    	});
    	if($scope.listaGeografiasSeleccionadas.length > 0){
    		$("#labelGeografiasSeleccionadas").css("color", "rgb(70, 88, 107)");
    		$("#contenedorGeografiasRegistro").css("border", "white solid 0px");
    	}
    	$scope.informacionRegistro.ciudadNatal = "";
    	$scope.$apply();
    });
    
    //MÉTODO QUE ASIGNA EL/LOS PERMISO(S) SELECCIONADO(S) A LA LISTA DE 'listaPermisosSeleccionados' PARA MOSTRAR - PESTAÑA ACCESOS REGISTRO USUARIO
    $("#arbolPermisoRegistro").click(function() {
    	$scope.listaPermisosSeleccionados = [];
    	$scope.informacionRegistro.permisos = [];
    	var permisosTree = $('#arbolPermisoRegistro').jstree("get_selected", true);
    	permisosTree.forEach(permiso =>{
    		if(permiso.original.nivel == 2){
    			var idPadre = permiso.original.idPadre;
    			$scope.listaPermisosSeleccionados.forEach(permisosPadre =>{
    				if(permisosPadre.id == idPadre){
    					existePadre = true;
    					permisosPadre.hijos.push(permiso);
    				}
    			});
    			if(existePadre){
				}else{
					$scope.listaPermisos.forEach(permisosListaGeneral =>{
						if(permisosListaGeneral.id == idPadre){
							$scope.listaPermisosSeleccionados.push(permisosListaGeneral);
						}
					});
					$scope.listaPermisosSeleccionados.forEach(permisosPadre =>{
	    				if(permisosPadre.id == idPadre){
	    					permisosPadre.hijos = [permiso];
	    				}
	    			});
				}
    			$scope.informacionRegistro.permisos.push(permiso.id);
    			existePadre = false;
    		}
    	});
    	if($scope.listaPermisosSeleccionados.length > 0){
        	$("#labelPermisosSeleccionadas").css("color", "rgb(70, 88, 107)");
    		$("#contenedorPermisosRegistro").css("border", "white solid 0px");
        }
    	$scope.$apply();
    });
    
    //MÉTODO PARA REGISTRAR USUARIOS NUEVOS
    $scope.guardarUsuario = function() {
    	var puestoSeleccionado = $("#puesto_select_registro option:selected").val();
    	var companiaSeleccionada = $("#compania_select_registro option:selected").val();
    	var sexo = $("#sexo_select_registro option:selected").val();
    	let paramsRegistro = {
    			
    			nombre: $scope.informacionRegistro.nombre,
    			apellidoPaterno: $scope.informacionRegistro.apellidoPaterno,
    			apellidoMaterno: $scope.informacionRegistro.apellidoMaterno,
    			numeroEmpleado: $scope.informacionRegistro.numEmpleado,
    			usuario: $scope.informacionRegistro.usuario,
    			password: $scope.informacionRegistro.contrasena,
    			identificacionTributaria: $scope.informacionRegistro.rfc,
    			identificacion: $scope.informacionRegistro.curp,
    			genero: sexo,
    			
    			urlFotoPerfil: "string",
    			
    			correoElectronico: $scope.informacionRegistro.correo,
    			telefonoCelular: $scope.informacionRegistro.telefonoContacto,
    			idEstatusUsuario: 1,
    			idGeografia: $scope.informacionRegistro.ciudadNatal,
    			idUsuarioJefe: 12,
    			llaveExterna: "4532",
    			idTipoUsuario: puestoSeleccionado,
    			idProveedor: companiaSeleccionada,
    			idDispositivo: "string",
    			fechaAlta: $scope.informacionRegistro.fechaIngreso,
    			geografias: $scope.informacionRegistro.geografias,
    			intervenciones: $scope.informacionRegistro.intervenciones,
    			idOperarios: [],
    			permisos: $scope.informacionRegistro.permisos,
    			idAsignacionAutomatica: $scope.informacionRegistro.asignacionAutomatica
    	};
    	
    	console.log(paramsRegistro);

    	var respuestaValidacionRegistro = $scope.validarInformacionRegistro();
    	if(respuestaValidacionRegistro){
    		swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false});
    		swal.showLoading();
        	$q.all([
        		usuarioPIService.guardarUsuario(paramsRegistro)
            ]).then(function(results) {
            	console.log(results[0].data);
            	swal.close();
            });
    		swal("Correcto", "¡Registro guardado con éxito!", "success");
    	}
	}
    
    //VALIDACIÓN GENERAL DE DATOS DEL SUBMÓDULO REGISTRAR USUARIO
    $scope.validarInformacionRegistro = function() {
    	var validacion = true;
    	var validacionInformacionGeneral = true;
    	var validacionIntervenciones = true;
    	var validacionArbol = true;
    	var validacionAccesos = true;
    	var validacionTecnicos = true;
    	var mensaje = "VALIDA LOS SIGUIENTES CAMPOS: ";
    	
    	
    	//PESTAÑA INFORMACIÓN GENERAL
		if($("#puesto_select_registro").val() === "" || $("#puesto_select_registro").val() === undefined || $("#puesto_select_registro").val() === null){
			$("#puesto_select_registro").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Puesto";
		}else{
			$("#puesto_select_registro").css("border", "1px solid #d9d9d9");
		}
		
		if($("#compania_select_registro").val() === "" || $("#compania_select_registro").val() === undefined || $("#compania_select_registro").val() === null){
			$("#compania_select_registro").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Compañía";
		}else{
			$("#compania_select_registro").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.numEmpleado === "" || $scope.informacionRegistro.numEmpleado === undefined){
			$("#form-num-empleado").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Número empleado";
		}else{
			$("#form-num-empleado").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.usuario === "" || $scope.informacionRegistro.usuario === undefined){
			$("#form-usuario").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Usuario";
		}else{
			$("#form-usuario").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.contrasena === "" || $scope.informacionRegistro.contrasena === undefined){
			$("#form-pasword").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Contraseña";
		}else{
			$("#form-pasword").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.confirContrasena === "" || $scope.informacionRegistro.confirContrasena === undefined){
			$("#form-confir-password").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Confirmación de contraseña";
		}else{
			var password = $("#form-pasword").val();
	    	var confirPassword =  $("#form-confir-password").val();
	    	if(password !== confirPassword){
	    		$("#form-pasword").css("border-bottom", "2px solid #f55756");
	    		$("#form-confir-password").css("border-bottom", "2px solid #f55756");
	    		validacionInformacionGeneral = false;
	    		mensaje = mensaje + "<br/> *Contraseña";
				mensaje = mensaje + "<br/> *Confirmación de contraseña";
	    		toastr.warning("¡Las contraseñas no coinciden!");
	    	}else{
	    		$("#form-pasword").css("border", "1px solid #d9d9d9");
	    		$("#form-confir-password").css("border", "1px solid #d9d9d9");
	    	}
		}
		
		if($scope.informacionRegistro.nombre === "" || $scope.informacionRegistro.nombre === undefined){
			$("#form-nombres").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Nombre";
		}else{
			$("#form-nombres").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.apellidoPaterno === "" || $scope.informacionRegistro.apellidoPaterno === undefined){
			$("#form-a-paterno").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Apellido paterno";
		}else{
			$("#form-a-paterno").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.apellidoMaterno === "" || $scope.informacionRegistro.apellidoMaterno === undefined){
			$("#form-a-materno").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Apellido materno";
		}else{
			$("#form-a-materno").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.posicion === "" || $scope.informacionRegistro.posicion === undefined){
			$("#form-posicion").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Posición";
		}else{
			$("#form-posicion").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.curp === "" || $scope.informacionRegistro.curp === undefined){
			$("#form-curp").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *CURP";
		}else{
			$("#form-curp").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.rfc === "" || $scope.informacionRegistro.rfc === undefined){
			$("#form-rfc").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *RFC";
		}else{
			$("#form-rfc").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.telefonoContacto === "" || $scope.informacionRegistro.telefonoContacto === undefined){
			$("#form-telefono-contacto").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Teléfono de contacto";
		}else{
			$("#form-telefono-contacto").css("border", "1px solid #d9d9d9");
		}
		
		if($scope.informacionRegistro.correo === "" || $scope.informacionRegistro.correo === undefined){
			$("#form-correo").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Correo electrónico";
		}else{
			if($("#form-correo").val().indexOf('@', 0) == -1 || $("#form-correo").val().indexOf('.', 0) == -1) {
				$("#form-correo").css("border-bottom", "2px solid #f55756");
				validacionInformacionGeneral = false;
				toastr.warning("¡Valida el formato del correo electrónico!");
			}else{
				$("#form-correo").css("border", "1px solid #d9d9d9");
			}
		}

		if($scope.informacionRegistro.fechaIngreso === "" || $scope.informacionRegistro.fechaIngreso === undefined || $scope.informacionRegistro.fechaIngreso === null){
			$("#form-fechaIngresoRegistro").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Fecha de ingreso";
		}else{
			$("#form-fechaIngresoRegistro").css("border", "1px solid #d9d9d9");
		}
		
		if($("#sexo_select_registro").val() === "" || $("#sexo_select_registro").val() === undefined || $("#sexo_select_registro").val() === null){
			$("#sexo_select_registro").css("border-bottom", "2px solid #f55756");
			validacionInformacionGeneral = false;
			mensaje = mensaje + "<br/> *Sexo";
		}else{
			$("#sexo_select_registro").css("border", "1px solid #d9d9d9");
		}
		
		//PESTAÑA INTERVENCIONES
		if($scope.listaIntervencionesSeleccionadas == "" || $scope.listaIntervencionesSeleccionadas == undefined || $scope.listaIntervencionesSeleccionadas == null){
			validacionIntervenciones = false;
			mensaje = mensaje + "<br/> *Intervención(es)";
			$("#labelIntervencionesSeleccionadas").css("color", "#f55756");
			$("#contenedorIntervencionesRegistro").css("border", "#f55756 solid 1px");
		}else{
			$("#labelIntervencionesSeleccionadas").css("color", "rgb(70, 88, 107)");
			$("#contenedorIntervencionesRegistro").css("border", "white solid 0px");
		}
		
		//PESTAÑA ÁRBOL
		if($scope.listaGeografiasSeleccionadas == "" || $scope.listaGeografiasSeleccionadas == undefined || $scope.listaGeografiasSeleccionadas == null){
			validacionArbol = false;
			mensaje = mensaje + "<br/> *Geografía(s)";
			$("#labelGeografiasSeleccionadas").css("color", "#f55756");
			$("#contenedorGeografiasRegistro").css("border", "#f55756 solid 1px");
		}else{
			$("#labelGeografiasSeleccionadas").css("color", "rgb(70, 88, 107)");
			$("#contenedorGeografiasRegistro").css("border", "white solid 0px");
		}
		
		//PESTAÑA ACCESOS (PERMISOS)
		var puestoSeleccionado = $("#puesto_select_registro option:selected").text().toLowerCase();
    	puestoSeleccionado = puestoSeleccionado.split('').map( letra => acentos[letra] || letra).join('').toString();
    	if(puestoSeleccionado == "tecnico" || puestoSeleccionado == "auxiliar"){
    		//---
    	}else{
    		if($scope.listaPermisosSeleccionados == "" || $scope.listaPermisosSeleccionados == undefined || $scope.listaPermisosSeleccionados == null){
    			validacionAccesos = false;
    			mensaje = mensaje + "<br/> *Permiso(s)";
    			$("#labelPermisosSeleccionadas").css("color", "#f55756");
    			$("#contenedorPermisosRegistro").css("border", "#f55756 solid 1px");
    		}else{
    			$("#labelPermisosSeleccionadas").css("color", "rgb(70, 88, 107)");
    			$("#contenedorPermisosRegistro").css("border", "white solid 0px");
    		}
    	}
    	
    	//PESTAÑA TÉCNICOS
    	var checkTec = 0;
		angular.forEach($scope.listaTecnicos,function(tecnico,index){
			if(tecnico.checkedOpcion == true){
				checkTec++;
			}
		});
		if(checkTec < 1){
			validacionTecnicos = false;
			mensaje = mensaje + "<br/> *Técnico(s)";
			$("#labelTecnicosSeleccionadas").css("color", "#f55756");
			$("#contenedorTecnicosRegistro").css("border", "#f55756 solid 1px");
		}else{
			$("#labelTecnicosSeleccionadas").css("color", "rgb(70, 88, 107)");
			$("#contenedorTecnicosRegistro").css("border", "white solid 0px");
		}
    	
    	//PESTAÑA CONFIRMAR USUARIO
    	if($scope.informacionRegistro.ciudadNatal == "" || $scope.informacionRegistro.ciudadNatal == undefined){
    		$(".ciudadNatal").css("color", "#f55756");
    		validacion = false;
			mensaje = mensaje + "<br/> *Ciudad natal";
    	}else{
    		$(".ciudadNatal").css("color", "#7c7c7d");
    	}
		
		//VALIDACIÓN Y ACTIVACIÓN DE PESTAÑAS
		if(validacionInformacionGeneral == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-informacion-tab").addClass("active");
			$("#pills-informacion").addClass("active show");
		}else if(validacionIntervenciones == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-intervencion-tab").addClass("active");
			$("#pills-intervencion").addClass("active show");
		}else if(validacionArbol == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$('#arbolGeografiaRegistro').jstree("destroy");
	    	$('#arbolGeografiaRegistro').jstree("deselect_all");
			$scope.mostrarArbolGeografiaRegistro();
			$("#pills-arbol-tab").addClass("active");
			$("#pills-arbol").addClass("active show");
		}else if(validacionAccesos == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-accesos-tab").addClass("active");
			$("#pills-accesos").addClass("active show");
		}else if(validacionTecnicos == false){
			validacion = false;
			$("#pills-confirmar-tab").removeClass("active");
			$("#pills-confirmar").removeClass("active show");
			$("#pills-tecnico-tab").addClass("active");
			$("#pills-tecnico").addClass("active show");
		}else{
			//...
		}
		
		//SI EXISTE ALGÚN CAMPO FALTANTE, MUESTRA EL MENSAJE
		if(validacion == false){
			toastr.warning(mensaje);
		}
		
		//REGRESA LA RESPUESTA BOLEANA
		return validacion;
	}
    
    //CUANDO SELECCCIONE UNA CIUDAD NATAL LOS RADIOS REGRESAN A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA CONFIRMACIÓN REGISTRO USUARIO
    $scope.asignarCiudadNatalRegistro = function() {
    	$(".ciudadNatal").css("color", "#7c7c7d");
	}
    
    //VALIDACIÓN DE CAMPOS INGRESADOS CON LA CLASE 'inputFormulario' - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $(".inputFormulario").keyup(function() {
		var input = $(this).attr("id");
		if( $(this).val()  === "" || $(this).val() === undefined ){
			$("#"+input).css("border-bottom", "2px solid #f55756");
		}else{
			$("#"+input).css("border", "1px solid #d9d9d9");
		}
		if(input === "form-correo"){
			if($("#"+input).val().indexOf('@', 0) == -1 || $("#"+input).val().indexOf('.', 0) == -1) {
				$("#"+input).css("border-bottom", "2px solid #f55756");
			}
		}
		
	});
    
    //VALIDACIÓN DE CONTRASEÑAS (QUE SEAN IGUALES) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#form-confir-password").change(function() {
    	var password = $("#form-pasword").val();
    	var confirPassword =  $("#form-confir-password").val();
    	if(password !== confirPassword){
    		$("#form-pasword").css("border-bottom", "2px solid #f55756");
    		$("#form-confir-password").css("border-bottom", "2px solid #f55756");
    		toastr.warning("¡Las contraseñas no coinciden!");
    	}else{
    		$("#form-pasword").css("border", "1px solid #d9d9d9");
    		$("#form-confir-password").css("border", "1px solid #d9d9d9");
    	}
    });
    
    //CUANDO SELECCCIONE UN PUESTO EL INPUT REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#sexo_select_registro").change(function() {
    	$("#sexo_select_registro").css("border", "1px solid #d9d9d9");
    });
    
    //CUANDO SELECCCIONE UNA COMPANÍA EL INPUT REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#compania_select_registro").change(function() {
    	$("#compania_select_registro").css("border", "1px solid #d9d9d9");
    });
    
    //CUANDO SELECCCIONE UNA FECHA VÁLIDA EL INPUT REGRESA A SU ESTILO NORMAL (VALIDACIÓN) - PESTAÑA INFORMACIÓN REGISTRO USUARIO
    $("#form-fechaIngresoRegistro").change(function() {
    	$("#form-fechaIngresoRegistro").css("border", "1px solid #d9d9d9");
    });
    
    //MÉTODO PARA SELECCIONAR O DESELECCIONAR TODAS LAS OPCIONES DE LOS MULTISELECTS - VISTA CONSULTA USUARIOS
    $scope.seleccionTodos = function (paramFiltroParent, banderaChecked, nombreLista) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = banderaChecked
            return e;
        });
        if(nombreLista == "companias"){
        	$('#txtCompania').val( banderaChecked == true ? $scope.listaSeleccionSelectGral(paramFiltroParent) : "");
        	if(banderaChecked){
        		$("#txtCompania").css("border-bottom", "2px solid #d9d9d9");
        	}
        }else if(nombreLista == "puestos"){
        	$('#txtPuesto').val( banderaChecked == true  ? $scope.listaSeleccionSelectGral(paramFiltroParent) : "");
        	if(banderaChecked){
        		$("#txtPuesto").css("border-bottom", "2px solid #d9d9d9");
        	}
        }
    }
    
    //CREA EL TEXTO CON LAS GEOGRAFÍAS SELECCIONADAS Y SE MUESTRA EN EL INPUT DE GEOGRAFÍASCONSULTA - VISTA CONSULTA USUARIOS
    $scope.btnAceptarModalGeografiaConsulta = function() {
    	var geografias = $('#arbolGeografiaConsulta').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiasConsulta').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiasConsulta").css("border-bottom", "2px solid #d9d9d9");
		}
	}
    
    //SE CREA EL TEXTO CON LAS OPCIONES SELECCIONADAS DE LOS MULTISELECT´S - VISTA CONSULTA USUARIOS
    $scope.listaSeleccionSelectGral = function(lista) {
    	var texto = "";
    	angular.forEach(lista,function(list,index){
			if(list.checkedOpcion){
				if(texto !== ""){
					texto = (texto + ", " + list.descripcion);
				}else{
					texto = (list.descripcion);
				}
			}
		});
    	return texto;
	}
    
    //LLAMA AL MÉTODO 'listaSeleccionSelectGral(lista)' PARA MANDAR EL TEXTO DEVUELTO AL INPUT DEL MULTISELECT DE PUESTOS - VISTA CONSULTA USUARIOS
    $scope.puestoSeleccion = function() {
    	$('#txtPuesto').val($scope.listaSeleccionSelectGral($scope.listaPuestos));
    	$("#txtPuesto").css("border-bottom", "2px solid #d9d9d9");
	}
	
    //LLAMA AL MÉTODO 'listaSeleccionSelectGral(lista)' PARA MANDAR EL TEXTO DEVUELTO AL INPUT DEL MULTISELECT DE COMPAÑÍAS - VISTA CONSULTA USUARIOS
	$scope.companiaSeleccion = function() {
    	$('#txtCompania').val($scope.listaSeleccionSelectGral($scope.listaCompanias));
    	$("#txtCompania").css("border-bottom", "2px solid #d9d9d9");
	}
	
	//VERIFICA EL ESTADO DEL CHECK PARA COLOCAR 'SI' O 'NO', SEGÚN EL ESTADO - PESTAÑA INFORMACIÓN REGISTRO USUARIO
	$scope.cambiarCheckAsignacionAutomatica = function() {
		if($("#form-asignacionAutomatica").prop('checked')){
			$("#checkAsignacionAutomatica").text("  SI");
		}else{
			$("#checkAsignacionAutomatica").text("  NO");
		}
	}
	
	//SELECCIONA O DESELECCIONA EL TÉCNICO ELEGIDO - PESTAÑA TÉCNICOS REGISTRO USUARIO
	$scope.seleccionarTecnicoRegistro = function(tecnicoSeleccionado) {
		if(tecnicoSeleccionado.checkedOpcion){
			tecnicoSeleccionado.checkedOpcion = false;
		}else{
			tecnicoSeleccionado.checkedOpcion = true;
			$("#labelTecnicosSeleccionadas").css("color", "rgb(70, 88, 107)");
			$("#contenedorTecnicosRegistro").css("border", "white solid 0px");
		}
		//Verifica si todos los 'checkedOpcion' son true para activar el check de seleccionar todos
		var check = true;
		angular.forEach($scope.listaTecnicos,function(tecnico,index){
			if(tecnico.checkedOpcion != true){
				check = false;
			}
		});
		if(check){
			$("#checkTotdosTecnicosRegistro").prop("checked",true);
		}else{
			$("#checkTotdosTecnicosRegistro").prop("checked",false);
		}
	}
	
	//SELECCIONA O DESELECCIONA TODOS LOS TÉCNICOS - PESTAÑA TÉCNICOS REGISTRO USUARIO
	$scope.seleccionarTodosTecnicosRegistro = function() {
		var check;
		if($("#checkTotdosTecnicosRegistro").prop('checked')){
			check = true;
			$("#labelTecnicosSeleccionadas").css("color", "rgb(70, 88, 107)");
			$("#contenedorTecnicosRegistro").css("border", "white solid 0px");
		}else{
			check = false;
		}
		angular.forEach($scope.listaTecnicos,function(tecnico,index){
			tecnico.checkedOpcion = check;
		});
	}
	
    // *** FIN CAMBIOS REYNEL *** 
}]);