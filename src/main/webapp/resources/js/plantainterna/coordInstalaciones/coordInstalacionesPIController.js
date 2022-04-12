var app = angular.module('coordInstalacionesPIApp', []);
var tableTerminada = undefined;
var geografia;
var geografiaPendiente = [];
var geografiaAsignada = [];
var geografiaDetenida = [];
var geografiaTerminada = [];
var geografiaCancelada = [];
var geografiaCalendarizada = [];
var geografiaGestoria = [];
app.controller('coordInstPIController', ['$scope','$q','coordInstalacionesPIService' ,'genericService', function($scope, $q, coordInstalacionesPIService, genericService) {

	app.coordInstalacionesSF($scope,coordInstalacionesPIService,$q,genericService)
	$scope.vistaCoordinacion = 0;
	$scope.filtrosCatalogo = [];
	$scope.listadoTurnosAcciones = [];
	$scope.listadoMotivosReagenda = [];
	$scope.listadoMotivosCalendarizado = [];
	$scope.listadoEstadoGestoria = [];
	$scope.listadoMotivosGestaria = [];

	$scope.filtrosGeneral = {};

	var tablePendiente = undefined;
	var tableAsignada = undefined;
	var tableDetenida = undefined;
	
	var tableCancelada = undefined;
	var tableCalendarizada = undefined;
	var tableGestoria = undefined;
	$scope.nombreBandeja = "";

	$scope.nivelArbol = 0;

	$scope.consultarCatalogos = function() {
		$q.all([
			coordInstalacionesPIService.consultarCatalogoEstatusDespachoPI(),
			coordInstalacionesPIService.consulCatalogoGeografiaUsuarioDespacho(),
			coordInstalacionesPIService.consultarCatalogoTurnosDespachoPI(),
			coordInstalacionesPIService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloCoordInst" })
		]).then(function(results) {
			if (results[3].data !== undefined) {
				if (results[3].data.respuesta) {
					if (results[3].data.result) {
						$scope.elementosConfigGeneral = new Map(Object.entries(results[3].data.result))
						//Configuracion
						let resultConf = results[3].data.result
						if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
							let llavesResult = results[3].data.result.MODULO_ACCIONES_USUARIO.llaves;

							$scope.nivelArbolPendiente = llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTE ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_PENDIENTE) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolAsignada = llavesResult.N_FILTRO_GEOGRAFIA_ASIGNADA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_ASIGNADA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolDetenida = llavesResult.N_FILTRO_GEOGRAFIA_DETENIDA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_DETENIDA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolTerminada = llavesResult.N_FILTRO_GEOGRAFIA_TERMINADA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_TERMINADA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolCancelada = llavesResult.N_FILTRO_GEOGRAFIA_CANCELADA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_CANCELADA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolCalendarizada = llavesResult.N_FILTRO_GEOGRAFIA_CALENDARIZADA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_CALENDARIZADA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);
							$scope.nivelArbolGestoria = llavesResult.N_FILTRO_GEOGRAFIA_GESTORIA ? parseInt(llavesResult.N_FILTRO_GEOGRAFIA_GESTORIA) : parseInt(llavesResult.N_FILTRO_GEOGRAFIA);

							$scope.nivelEstatusPendiente = llavesResult.N_ESTATUS_PENDIENTES_PENDIENTE ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_PENDIENTE) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusAsignada = llavesResult.N_ESTATUS_PENDIENTES_ASIGNADA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_ASIGNADA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusDetenida = llavesResult.N_ESTATUS_PENDIENTES_DETENIDA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_DETENIDA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusTerminada = llavesResult.N_ESTATUS_PENDIENTES_TERMINADA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_TERMINADA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusCancelada = llavesResult.N_ESTATUS_PENDIENTES_CANCELADA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_CANCELADA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							$scope.nivelEstatusCalendarizada = llavesResult.N_ESTATUS_PENDIENTES_CALENDARIZADA ? llavesResult.N_ESTATUS_PENDIENTES_CALENDARIZADA : llavesResult.N_ESTATUS_PENDIENTES;
							$scope.nivelEstatusGestoria = llavesResult.N_ESTATUS_PENDIENTES_GESTORIA ? parseInt(llavesResult.N_ESTATUS_PENDIENTES_GESTORIA) : parseInt(llavesResult.N_ESTATUS_PENDIENTES);
							
							if (llavesResult.N_FILTRO_GEOGRAFIA)
								$scope.nivelArbol = parseInt(llavesResult.N_FILTRO_GEOGRAFIA)

							if (llavesResult.N_ESTATUS_PENDIENTES)
								$scope.nivelEstatusGeneral = parseInt(llavesResult.N_ESTATUS_PENDIENTES)
							
							$scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
							
							if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
								$scope.configPermisoAccionConsultaOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionConsultaOT" })[0] != undefined);
								$scope.configPermisoAccionDescargaReporteOrdenes = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaReporteOT" })[0] != undefined);
							}
							$("#idBody").removeAttr("style");
							validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
							validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;
						}
					} else {
						swal.close();
						toastr.warning('No se encontraron datos para la configuracion');
					}
				} else {
					swal.close();
					toastr.warning(results[3].data.resultDescripcion);
				}
			} else {
				swal.close();
				toastr.error('Ha ocurrido un error en la consulta de configuracion');
			}
			if (results[0].data !== undefined) {
				if (results[0].data.respuesta) {
					if (results[0].data.result) {
						$scope.filtrosGeneral = {};
						$scope.respaldoFiltroCatalogo = [];
						$scope.respaldoFiltroCatalogo = angular.copy(results[0].data.result);
						//$scope.nivelEstatusGeneral = 2;
						$scope.nivelEstatusGeneral = $scope.nivelEstatusGeneral ? $scope.nivelEstatusGeneral : $scope.obtenerUltimoNivelFiltros($scope.respaldoFiltroCatalogo);
						$scope.nivelEstatusPendiente = $scope.nivelEstatusPendiente ? $scope.nivelEstatusPendiente : $scope.obtenerUltimoNivelFiltros($scope.respaldoFiltroCatalogo);
						$scope.nivelEstatusAsignada = $scope.nivelEstatusAsignada ? $scope.nivelEstatusAsignada : $scope.obtenerUltimoNivelFiltros($scope.respaldoFiltroCatalogo);
						$scope.nivelEstatusDetenida = $scope.nivelEstatusDetenida ? $scope.nivelEstatusDetenida : $scope.obtenerUltimoNivelFiltros($scope.respaldoFiltroCatalogo);
						$scope.nivelEstatusTerminada = $scope.nivelEstatusTerminada ? $scope.nivelEstatusTerminada : $scope.obtenerUltimoNivelFiltros($scope.respaldoFiltroCatalogo);
						$scope.nivelEstatusCancelada = $scope.nivelEstatusCancelada ? $scope.nivelEstatusCancelada : $scope.obtenerUltimoNivelFiltros($scope.respaldoFiltroCatalogo);
						$scope.nivelEstatusCalendarizada = $scope.nivelEstatusCalendarizada ? $scope.nivelEstatusCalendarizada : $scope.obtenerUltimoNivelFiltros($scope.respaldoFiltroCatalogo);
						$scope.nivelEstatusGestoria = $scope.nivelEstatusGestoria ? $scope.nivelEstatusGestoria : $scope.obtenerUltimoNivelFiltros($scope.respaldoFiltroCatalogo);
						
						$scope.filtrosCatalogo = $scope.conversionAnidadaRecursiva($scope.respaldoFiltroCatalogo, 1, $scope.nivelEstatusGeneral);
						$scope.filtrosCatalogoPendiente = $scope.conversionAnidadaRecursiva($scope.respaldoFiltroCatalogo, 1, $scope.nivelEstatusPendiente);
						$scope.filtrosCatalogoAsignada = $scope.conversionAnidadaRecursiva($scope.respaldoFiltroCatalogo, 1, $scope.nivelEstatusAsignada);
						$scope.filtrosCatalogoDetenida = $scope.conversionAnidadaRecursiva($scope.respaldoFiltroCatalogo, 1, $scope.nivelEstatusDetenida);
						$scope.filtrosCatalogoTerminada = $scope.conversionAnidadaRecursiva($scope.respaldoFiltroCatalogo, 1, $scope.nivelEstatusTerminada);
						$scope.filtrosCatalogoCancelada = $scope.conversionAnidadaRecursiva($scope.respaldoFiltroCatalogo, 1, $scope.nivelEstatusCancelada);
						$scope.filtrosCatalogoCalendarizada = $scope.conversionAnidadaRecursiva($scope.respaldoFiltroCatalogo, 1, $scope.nivelEstatusCalendarizada);
						$scope.filtrosCatalogoGestoria = $scope.conversionAnidadaRecursiva($scope.respaldoFiltroCatalogo, 1, $scope.nivelEstatusGestoria);

						$scope.filtrosGeneral.estatusPendiente = $scope.filtrosCatalogoPendiente.filter(e => {return e.id === 1});
						$scope.filtrosGeneral.estatusAsignada = $scope.filtrosCatalogoAsignada.filter(e => {return e.id === 2});
						$scope.filtrosGeneral.estatusDetenida = $scope.filtrosCatalogoDetenida.filter(e => {return e.id === 3});
						$scope.filtrosGeneral.estatusTerminada = $scope.filtrosCatalogoTerminada.filter(e => {return e.id === 4});
						$scope.filtrosGeneral.estatusCancelada = $scope.filtrosCatalogoCancelada.filter(e => {return e.id === 5});
						$scope.filtrosGeneral.estatusCalendarizada = $scope.filtrosCatalogoCalendarizada.filter(e => {return e.id === 6});
						$scope.filtrosGeneral.estatusGestoria = $scope.filtrosCatalogoGestoria.filter(e => {return e.id === 7});

						$scope.listadoMotivosReagenda = $scope.respaldoFiltroCatalogo.filter(e => {return e.idPadre === 201})
						$scope.listadoMotivosCalendarizado = $scope.respaldoFiltroCatalogo.filter(e => {return e.idPadre === 243})
						$scope.listadoEstadoGestoria = $scope.respaldoFiltroCatalogo.filter(e => {return e.idPadre === 7});
						$scope.listadoMotivosGestaria = $scope.respaldoFiltroCatalogo.filter(e => {return e.idPadre === 249})
						/*
						$scope.filtrosCatalogo = results[0].data.result;
						$scope.filtrosCatalogo.map((e)=>{
							e.check = true;
						})
						$scope.mostrarFiltros();
						*/
					} else {
						toastr.warning('No se encontraron resultados');
					}
				} else {
					toastr.warning(results[0].data.resultDescripcion);
				}
			}
			if (results[1].data !== undefined) {
				if(results[1].data.respuesta ){
                    if(results[1].data.result ){
                        if(results[1].data.result.geografia){
                            //$scope.listadogeografiacopy=results[1].data.result.geografia
							
                            geografia = angular.copy(results[1].data.result.geografia)

							$scope.nivelArbolPendiente = $scope.nivelArbolPendiente ? $scope.nivelArbolPendiente : $scope.obtenerUltimoNivelFiltros(geografia);
							$scope.nivelArbolAsignada = $scope.nivelArbolAsignada ? $scope.nivelArbolAsignada : $scope.obtenerUltimoNivelFiltros(geografia);
							$scope.nivelArbolDetenida = $scope.nivelArbolDetenida ? $scope.nivelArbolDetenida : $scope.obtenerUltimoNivelFiltros(geografia);
							$scope.nivelArbolTerminada = $scope.nivelArbolTerminada ? $scope.nivelArbolTerminada : $scope.obtenerUltimoNivelFiltros(geografia);
							$scope.nivelArbolCancelada = $scope.nivelArbolCancelada ? $scope.nivelArbolCancelada : $scope.obtenerUltimoNivelFiltros(geografia);
							$scope.nivelArbolCalendarizada = $scope.nivelArbolCalendarizada ? $scope.nivelArbolCalendarizada : $scope.obtenerUltimoNivelFiltros(geografia);
							$scope.nivelArbolGestoria = $scope.nivelArbolGestoria ? $scope.nivelArbolGestoria : $scope.obtenerUltimoNivelFiltros(geografia);

							/*
                            geografiaPendiente = angular.copy(results[1].data.result.geografia)
                            geografiaAsignada = angular.copy(results[1].data.result.geografia)
                            geografiaDetenida = angular.copy(results[1].data.result.geografia)
                            geografiaTerminada = angular.copy(results[1].data.result.geografia) 
                            geografiaCancelada = angular.copy(results[1].data.result.geografia)
                            geografiaCalendarizada = angular.copy(results[1].data.result.geografia)
                            geografiaGestoria = angular.copy(results[1].data.result.geografia)
							*/
							
                            //necesario para agregar el y arbol 
                            geografia.map((e)=>{
								if (e.nivel <= $scope.nivelArbolPendiente) {
									let elemento = {};
									elemento.id = e.id;
									elemento.nivel = e.nivel;
									elemento.parent=e.padre ==undefined ? "#" : e.padre;
									elemento.text= e.nombre;
									elemento.icon= "fa fa-globe";
									elemento.state= { //Este objeto tu no lo necesitas karen! e.state
										opened: false,
										selected: true
									}
									geografiaPendiente.push(elemento);
								}

								if (e.nivel <= $scope.nivelArbolAsignada) {
									let elemento = {};
									elemento.id = e.id;
									elemento.nivel = e.nivel;
									elemento.parent=e.padre ==undefined ? "#" : e.padre;
									elemento.text= e.nombre;
									elemento.icon= "fa fa-globe";
									elemento.state= { //Este objeto tu no lo necesitas karen! e.state
										opened: false,
										selected: true
									}
									geografiaAsignada.push(elemento);
								}

								if (e.nivel <= $scope.nivelArbolDetenida) {
									let elemento = {};
									elemento.id = e.id;
									elemento.nivel = e.nivel;
									elemento.parent=e.padre ==undefined ? "#" : e.padre;
									elemento.text= e.nombre;
									elemento.icon= "fa fa-globe";
									elemento.state= { //Este objeto tu no lo necesitas karen! e.state
										opened: false,
										selected: true
									}
									geografiaDetenida.push(elemento);
								}

								if (e.nivel <= $scope.nivelArbolTerminada) {
									let elemento = {};
									elemento.id = e.id;
									elemento.nivel = e.nivel;
									elemento.parent=e.padre ==undefined ? "#" : e.padre;
									elemento.text= e.nombre;
									elemento.icon= "fa fa-globe";
									elemento.state= { //Este objeto tu no lo necesitas karen! e.state
										opened: false,
										selected: true
									}
									geografiaTerminada.push(elemento);
								}

								if (e.nivel <= $scope.nivelArbolCancelada) {
									let elemento = {};
									elemento.id = e.id;
									elemento.nivel = e.nivel;
									elemento.parent=e.padre ==undefined ? "#" : e.padre;
									elemento.text= e.nombre;
									elemento.icon= "fa fa-globe";
									elemento.state= { //Este objeto tu no lo necesitas karen! e.state
										opened: false,
										selected: true
									}
									geografiaCancelada.push(elemento);
								}

								if (e.nivel <= $scope.nivelArbolCalendarizada) {
									let elemento = {};
									elemento.id = e.id;
									elemento.nivel = e.nivel;
									elemento.parent=e.padre ==undefined ? "#" : e.padre;
									elemento.text= e.nombre;
									elemento.icon= "fa fa-globe";
									elemento.state= { //Este objeto tu no lo necesitas karen! e.state
										opened: false,
										selected: true
									}
									geografiaCalendarizada.push(elemento);
								}

								if (e.nivel <= $scope.nivelArbolGestoria) {
									let elemento = {};
									elemento.id = e.id;
									elemento.nivel = e.nivel;
									elemento.parent=e.padre ==undefined ? "#" : e.padre;
									elemento.text= e.nombre;
									elemento.icon= "fa fa-globe";
									elemento.state= { //Este objeto tu no lo necesitas karen! e.state
										opened: false,
										selected: true
									}
									geografiaGestoria.push(elemento);
								}
                                
                            });

							/*

							geografiaPendiente.map((e)=>{
								if (e.nivel <= $scope.nivelArbolPendiente) {
									e.parent=e.padre ==undefined ? "#" : e.padre;
									e.text= e.nombre;
									e.icon= "fa fa-globe";
									e.state= {opened: false, selected: true}
									return e
								}
                            });

							geografiaAsignada.map((e)=>{
								if (e.nivel <= $scope.nivelArbolAsignada) {
									e.parent=e.padre ==undefined ? "#" : e.padre;
									e.text= e.nombre;
									e.icon= "fa fa-globe";
									e.state= {opened: false, selected: true}
									return e
								}
                            });

							geografiaDetenida.map((e)=>{
								if (e.nivel <= $scope.nivelArbolDetenida) {
									$scope.nivelArbolDetenida = e.nivel;
								}
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                e.state= {opened: false, selected: true}
                                return e
                            });

							geografiaTerminada.map((e)=>{
								if (e.nivel <= $scope.nivelArbolTerminada) {
									$scope.nivelArbolTerminada = e.nivel;
								}
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                e.state= {opened: false, selected: true}
                                return e
                            });

							geografiaCancelada.map((e)=>{
								if (e.nivel <= $scope.nivelArbolCancelada) {
									$scope.nivelArbolCancelada = e.nivel;
								}
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                e.state= {opened: false, selected: true}
                                return e
                            });

							geografiaCalendarizada.map((e)=>{
								if (e.nivel <= $scope.nivelArbolCalendarizada) {
									$scope.nivelArbolCalendarizada = e.nivel;
								}
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                e.state= {opened: false, selected: true}
                                return e
                            });

							geografiaGestoria.map((e)=>{
								if (e.nivel <= $scope.nivelArbolGestoria) {
									$scope.nivelArbolGestoria = e.nivel;
								}
                                e.parent=e.padre ==undefined ? "#" : e.padre;
                                e.text= e.nombre;
                                e.icon= "fa fa-globe";
                                e.state= {opened: false, selected: true}
                                return e
                            });

							*/


							/*
							geografiaPendiente = angular.copy(geografia);
							geografiaAsignada = angular.copy(geografia);
							geografiaDetenida = angular.copy(geografia);
							geografiaTerminada = angular.copy(geografia);
							geografiaCancelada = angular.copy(geografia);
							geografiaCalendarizada = angular.copy(geografia);
							geografiaGestoria = angular.copy(geografia);
							*/
							$scope.cambiarVista(1);
							//$scope.iniciarArboles();
                        }else{
                            toastr.warning( 'No se encontraron datos para la geografia' );                
                        }                        
                    }else{                      
                        toastr.warning( 'No se encontraron datos para la geografia' );                
                    }
                }else{
                    toastr.warning( results[2].data.resultDescripcion );                
                }    
			}

			if (results[2].data !== undefined) {
                if(results[2].data.respuesta ){
                    if(results[2].data.result ){
                        $scope.filtrosGeneral.turnosdisponibles=results[2].data.result
                        $scope.filtrosGeneral.turnosdisponibles.map(e=>{e.checkedOpcion=true; return e;})
						$scope.mostrarTurnos();
                    }else{                      
                        toastr.warning( 'No se encontraron catalogos turnos' );                
                    }
                }else{
                    toastr.warning( results[0].data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }
		}).catch(err => handleError(err));
	}
	$scope.consultarCatalogos();

	$scope.conversionAnidadaRecursiva = function (array, nivelInit, maxNivel) {
		let arrayReturn = [];
		angular.forEach(array.filter(e => e.nivel === nivelInit), function (elem, index) {
			let elemento = angular.copy(elem);
			elemento.checkedOpcion = true;
			if (nivelInit < maxNivel) {
				elemento.children = $scope.conversionAnidadaRecursiva(array, nivelInit + 1, maxNivel).filter(e2 => e2.idPadre === elemento.id);
				elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : [];
			}
			arrayReturn.push(elemento)
		});
		return arrayReturn;
	}

	$scope.obtenerUltimoNivelFiltros = function (array) {
		return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
	}

	$scope.obtenerElementosSeleccionadosFiltro = function (array, nivel) {
		let arrayReturn = [];
		angular.forEach(array, function (elemento, index) {
			if (elemento.nivel == nivel && elemento.checkedOpcion) {
				arrayReturn.push(elemento.id);
			} else {
				arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
			}
		});
		return arrayReturn;
	}

	$scope.seleccionarTodosRecursivo = function (array) {
		array.map(function (e) {
			e.checkedOpcion = true;
			if (e.children !== undefined && e.children.length > 0) {
				$scope.seleccionarTodosRecursivo(e.children);
			}
		});
	}

	$scope.deseleccionarTodosRecursivo = function (array) {
		array.map(function (e) {
			e.checkedOpcion = false;
			if (e.children !== undefined && e.children.length > 0) {
				$scope.deseleccionarTodosRecursivo(e.children);
			}
		});
	}

	$scope.pintarNombreEstatus = function(array, input) {
		let textoEstatus = $scope.mostrarNombresEstatus(array);
		$(input).val(textoEstatus);
		if(textoEstatus.length > 0){
			$(input).css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.mostrarNombresEstatus = function(array) {
		let arrayNombre = [];
		angular.forEach(array, function (elemento, index) {
			if (elemento.checkedOpcion) {
				arrayNombre.push(elemento.nombre);
			}
			if (elemento.children !== undefined && elemento.children.length > 0) {
				arrayNombre = arrayNombre.concat($scope.mostrarNombresEstatus(elemento.children));
			}
		});
		return arrayNombre;
	}

	$scope.setCheckFiltroGenericV2 = function (filtro, principalArray) {
		if (filtro.children !== undefined && filtro.children.length > 0) {
			if (filtro.checkedOpcion) {
				$scope.deseleccionarTodosRecursivo(filtro.children);
			} else {
				$scope.seleccionarTodosRecursivo(filtro.children);
			}
		}
		filtro.checkedOpcion = !filtro.checkedOpcion;
		//$scope.checkPadre(filtro.idPadre, principalArray, principalArray);
	}

	$scope.checkPadre = function (idPadre, array, principalArray) {
		array.map(function (e) {
			if (e.id === idPadre) {
				e.checkedOpcion = e.children.length === e.children.filter(function (e) { return e.checkedOpcion }).length;
				$scope.checkPadre(e.idPadre, principalArray, principalArray);
			} else {
				if (e.children !== undefined && e.children.length > 0) {
					$scope.checkPadre(idPadre, e.children, principalArray);
				}
			}
		});
	}

	$scope.resultPendientes = [];
	$scope.consultarPendientes = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.resultPendientes = [];
		$scope.estatusSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusPendiente, $scope.nivelEstatusPendiente-1);
		$scope.estadoSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusPendiente, $scope.nivelEstatusPendiente);

		$scope.geografiaSelect = $("#jstree-pendiente").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbolPendiente).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoPendiente.ot || $scope.objetoPendiente.ot === "" ? undefined : $scope.objetoPendiente.ot,
			folioSistema: !$scope.objetoPendiente.folio || $scope.objetoPendiente.folio === "" ? undefined : $scope.objetoPendiente.folio,
			idClaveCliente: !$scope.objetoPendiente.claveCliente || $scope.objetoPendiente.claveCliente === "" ? undefined : $scope.objetoPendiente.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_pendiente").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_pendiente").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_pendiente","fecha_fin_pendiente")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tablePendiente) {
				tablePendiente.destroy()
			}
			tablePendiente = $("#table_pendiente").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						if (json.result) {
							$scope.resultPendientes = json.result.ordenes ? json.result.ordenes : [];
						}
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	$scope.consultarAsignada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.estatusSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusAsignada, $scope.nivelEstatusAsignada-1);
		$scope.estadoSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusAsignada, $scope.nivelEstatusAsignada);

		$scope.geografiaSelect = $("#jstree-asignado").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbolAsignada).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoAsignada.ot || $scope.objetoAsignada.ot === "" ? undefined : $scope.objetoAsignada.ot,
			folioSistema: !$scope.objetoAsignada.folio || $scope.objetoAsignada.folio === "" ? undefined : $scope.objetoAsignada.folio,
			idClaveCliente: !$scope.objetoAsignada.claveCliente || $scope.objetoAsignada.claveCliente === "" ? undefined : $scope.objetoAsignada.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_asignada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_asignada").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_asignada","fecha_fin_asignada")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableAsignada) {
				tableAsignada.destroy()
			}
			tableAsignada = $("#tableAsignada").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	$scope.consultarDetenida = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.estatusSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusDetenida, $scope.nivelEstatusDetenida-1);
		$scope.estadoSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusDetenida, $scope.nivelEstatusDetenida);

		$scope.geografiaSelect = $("#jstree-detenido").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbolDetenida).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoDetenida.ot || $scope.objetoDetenida.ot === "" ? undefined : $scope.objetoDetenida.ot,
			folioSistema: !$scope.objetoDetenida.folio || $scope.objetoDetenida.folio === "" ? undefined : $scope.objetoDetenida.folio,
			idClaveCliente: !$scope.objetoDetenida.claveCliente || $scope.objetoDetenida.claveCliente === "" ? undefined : $scope.objetoDetenida.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_detenida").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_detenida").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_detenida","fecha_fin_detenida")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableDetenida) {
				tableDetenida.destroy()
			}
			tableDetenida = $("#tableDetenida").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}
		

	$scope.consultarTerminada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.estatusSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusTerminada, $scope.nivelEstatusTerminada-1);
		$scope.estadoSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusTerminada, $scope.nivelEstatusTerminada);

		$scope.geografiaSelect = $("#jstree-terminada").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbolTerminada).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoTerminadas.ot || $scope.objetoTerminadas.ot === "" ? undefined : $scope.objetoTerminadas.ot,
			folioSistema: !$scope.objetoTerminadas.folio || $scope.objetoTerminadas.folio === "" ? undefined : $scope.objetoTerminadas.folio,
			idClaveCliente: !$scope.objetoTerminadas.claveCliente || $scope.objetoTerminadas.claveCliente === "" ? undefined : $scope.objetoTerminadas.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_terminada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_terminada").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_terminada","fecha_fin_terminada")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableTerminada) {
				tableTerminada.destroy() 
			}
			tableTerminada = $("#tableTerminada").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}
	
	$scope.consultarCancelada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.estatusSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusCancelada, $scope.nivelEstatusCancelada-1);
		$scope.estadoSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusCancelada, $scope.nivelEstatusCancelada);

		$scope.geografiaSelect = $("#jstree-cancelada").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbolCancelada).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoCancelada.ot || $scope.objetoCancelada.ot === "" ? undefined : $scope.objetoCancelada.ot,
			folioSistema: !$scope.objetoCancelada.folio || $scope.objetoCancelada.folio === "" ? undefined : $scope.objetoCancelada.folio,
			idClaveCliente: !$scope.objetoCancelada.claveCliente || $scope.objetoCancelada.claveCliente === "" ? undefined : $scope.objetoCancelada.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_cancelada").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_cancelada").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_cancelada","fecha_fin_cancelada")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera){
			if(tableCancelada) {
				tableCancelada.destroy() 
			}
			tableCancelada = $("#tableCancelada").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	$scope.resultCalendarizada = [];
	$scope.consultarCalendarizada = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.resultCalendarizada = [];
		$scope.estatusSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusCalendarizada, $scope.nivelEstatusCalendarizada-1);
		$scope.estadoSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusCalendarizada, $scope.nivelEstatusCalendarizada);

		$scope.geografiaSelect = $("#jstree-calendarizar").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbolCalendarizada).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoCalendarizada.ot || $scope.objetoCalendarizada.ot === "" ? undefined : $scope.objetoCalendarizada.ot,
			folioSistema: !$scope.objetoCalendarizada.folio || $scope.objetoCalendarizada.folio === "" ? undefined : $scope.objetoCalendarizada.folio,
			idClaveCliente: !$scope.objetoCalendarizada.claveCliente || $scope.objetoCalendarizada.claveCliente === "" ? undefined : $scope.objetoCalendarizada.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_calendarizado").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_calendarizado").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_calendarizado","fecha_fin_calendarizado")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableCalendarizada) {
				tableCalendarizada.destroy() 
			}
			tableCalendarizada = $("#tableCalendarizada").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						if (json.result) {
							$scope.resultCalendarizada = json.result.ordenes ? json.result.ordenes : [];
						}
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
		
	}

	$scope.resultGestoria = [];
	$scope.consultarGestoria = function() {
		$scope.estatusSelect = [];
		$scope.estadoSelect = [];
		$scope.geografiaSelect = [];
		$scope.resultGestoria = [];
		$scope.estatusSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusGestoria, $scope.nivelEstatusGestoria-1);
		$scope.estadoSelect = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusGestoria, $scope.nivelEstatusGestoria);

		$scope.geografiaSelect = $("#jstree-gestoria").jstree("get_selected", true).filter(e=>e.original.nivel === $scope.nivelArbolGestoria).map(e=>parseInt(e.id))
		let params = {
			idOrdenTrabajo: !$scope.objetoGestoria.ot || $scope.objetoGestoria.ot === "" ? undefined : $scope.objetoGestoria.ot,
			folioSistema: !$scope.objetoGestoria.folio || $scope.objetoGestoria.folio === "" ? undefined : $scope.objetoGestoria.folio,
			idClaveCliente: !$scope.objetoGestoria.claveCliente || $scope.objetoGestoria.claveCliente === "" ? undefined : $scope.objetoGestoria.claveCliente,
			idEstatus: $scope.estatusSelect,
			idEstados: $scope.estadoSelect,
			idGeografias: $scope.geografiaSelect,
			fechaInicio: $scope.getFechaFormato($("#fecha_inicio_gestoria").val()),
			fechaFin: $scope.getFechaFormato($("#fecha_fin_gestoria").val()),
			elementosPorPagina: 10,
			fechaSeleccionada: "fechaInicio"
		}

		let mensaje = "";
		let bandera = true;
		if ($scope.estatusSelect.length === 0) {
			mensaje += "<li>Seleccione algun estatus.</li>";
			bandera = false;
		}
		if ($scope.estadoSelect.length === 0) {
			mensaje += "<li>Seleccione algun estado.</li>";
			bandera = false;
		}
		if (!$scope.validarFecha("fecha_inicio_gestoria","fecha_fin_gestoria")) {
			mensaje += "<li>La fecha inicio no puede ser mayor a la fecha fin.</li>";
			bandera = false;
		}

		if (bandera) {
			if(tableGestoria) {
				tableGestoria.destroy() 
			}
			tableGestoria = $("#tableGestoria").DataTable({
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
					"url": "req/consultarBandejaFFM",
					"type": "POST",
					"data": params,
					"beforeSend": function () {
						if(!swal.isVisible() ){
							swal({ text: 'Cargando registros...', allowOutsideClick: false });
							swal.showLoading();
						}
						
					},
					"dataSrc": function (json) {
						if (json.result) {
							$scope.resultGestoria = json.result.ordenes ? json.result.ordenes : [];
						}
						//$scope.elementosRegistro = json.registrosTotales
						return json.data;
					},
					"error":function(xhr, error, thrown){
						handleError(xhr)
					}, 
					"complete": function () {
						swal.close()
					}
				},
				"columns": [null, null, null, null, null, null, null, null, null, null],
				"language": idioma_espanol_not_font
			});
		} else {
			mostrarMensajeWarningValidacion(mensaje);
		}
	}

	$scope.elementCalendarizado = {};
	$scope.elementReagendaOT = {};
	$scope.elementoPlazaComercial = {};
	$scope.cambioStatus = function(tipo){
        let errorMensaje = '<ul>';
        let isValido = true;
        let params = {};
        $scope.tipoaccioncambioestatus=tipo
        if (tipo === 'calendariza') {
            if ($scope.elementCalendarizado.fechaCalendarizado.trim() === '') {
                errorMensaje += '<li>Completa campo fecha</li>'
                isValido = false;
            }
            if (!$scope.elementCalendarizado.turno) {
                errorMensaje += '<li>Seleccione campo turno.</li>'
                isValido = false;
            }
            if (!$scope.elementCalendarizado.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }
            if (!$scope.elementCalendarizado.comentario || $scope.elementCalendarizado.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comnentario.</li>'
                isValido = false;
            }
            if (isValido) {
                let fechaCalendariza = $scope.elementCalendarizado.fechaCalendarizado.split('/')
				params = {
					tipo: tipo,
					ot: $scope.detalleOtSeleccionada.idOrden,
					folioSistema: $scope.detalleOtSeleccionada.folioOrden,
					idFlujo: $scope.detalleOtSeleccionada.idFlujo,
					idTipoOrden: $scope.detalleOtSeleccionada.idtipoOrden,
					idSubTipoOrden: $scope.detalleOtSeleccionada.idSubtipoOrden,
					idOrigenSistema: 1,
					idUsuarioDespacho: 12,
					latitud: $scope.detalleOtSeleccionada.latitud,
					longitud: $scope.detalleOtSeleccionada.longitud,
					comentarios: $scope.elementCalendarizado.comentario,
					idTurno: $scope.elementCalendarizado.turno.id,
					idMotivo: $scope.elementCalendarizado.motivo.id,
					fechaHoraAgenda: fechaCalendariza[2] + '-' + fechaCalendariza[1] + '-' + fechaCalendariza[0]
				}
            }
        } else if (tipo === 'reagendamiento') {
            if (!$scope.elementReagendaOT || $scope.elementReagendaOT.fechaReagendamiento.trim() === '') {
                errorMensaje += '<li>Completa campo fecha.</li>'
                isValido = false;
            }
            if (!$scope.elementReagendaOT || !$scope.elementReagendaOT.turno) {
                errorMensaje += '<li>Seleccione campo turno.</li>'
                isValido = false;
            }
            if (!$scope.elementReagendaOT || !$scope.elementReagendaOT.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }
            if (!$scope.elementReagendaOT.comentario || $scope.elementReagendaOT.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comentario.</li>'
                isValido = false;
            }
            if (isValido) {
                let fechaReagendamiento = $scope.elementReagendaOT.fechaReagendamiento.split('/')
				params = {
					tipo: tipo,
					ot: $scope.detalleOtSeleccionada.idOrden,
					folioSistema: $scope.detalleOtSeleccionada.folioOrden,
					idFlujo: $scope.detalleOtSeleccionada.idFlujo,
					idTipoOrden: $scope.detalleOtSeleccionada.idtipoOrden,
					idSubTipoOrden: $scope.detalleOtSeleccionada.idSubtipoOrden,
					idOrigenSistema: 1,
					idUsuarioDespacho: 12,
					latitud: $scope.detalleOtSeleccionada.latitud,
					longitud: $scope.detalleOtSeleccionada.longitud,
					comentarios: $scope.elementReagendaOT.comentario,
					idTurno: $scope.elementReagendaOT.turno.id,
					idMotivo: $scope.elementReagendaOT.motivo.id,
					fechaHoraAgenda: fechaReagendamiento[2] + '-' + fechaReagendamiento[1] + '-' + fechaReagendamiento[0]
				}
            }
        } else if (tipo === 'gestoria'){
            if (!$scope.elementoPlazaComercial || !$scope.elementoPlazaComercial.estado) {
                errorMensaje += '<li>Seleccione campo estado.</li>'
                isValido = false;
            }
            if (!$scope.elementoPlazaComercial || !$scope.elementoPlazaComercial.motivo) {
                errorMensaje += '<li>Seleccione campo motivo.</li>'
                isValido = false;
            }
            if (!$scope.elementoPlazaComercial.comentario || $scope.elementoPlazaComercial.comentario.trim() === '') {
                errorMensaje += '<li>Completa campo comentario.</li>'
                isValido = false;
            }
            if (isValido) {
				params = {
					tipo: tipo,
					ot: $scope.detalleOtSeleccionada.idOrden,
					folioSistema: $scope.detalleOtSeleccionada.folioOrden,
					idFlujo: $scope.detalleOtSeleccionada.idFlujo,
					idTipoOrden: $scope.detalleOtSeleccionada.idtipoOrden,
					idSubTipoOrden: $scope.detalleOtSeleccionada.idSubtipoOrden,
					idOrigenSistema: 1,
					idUsuarioDespacho: 12,
					latitud: $scope.detalleOtSeleccionada.latitud,
					longitud: $scope.detalleOtSeleccionada.longitud,
					comentarios: $scope.elementoPlazaComercial.comentario,
					idMotivo: $scope.elementoPlazaComercial.motivo.id,
				}
            }
        }
        if (isValido) {
            envioCambioStatus(params);
        } else {
            errorMensaje += '</ul>'
            mostrarMensajeWarningValidacion(errorMensaje)
        }
    }

	envioCambioStatus = function(params) {
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        genericService.cambioStatusOts(params).then(result =>{
            console.log(result);
            swal.close();
            
            if(result.data.respuesta){
                toastr.success( result.data.result.mensaje );
				if ($scope.vistaCoordinacion === 1) {
					$scope.consultarPendientes();
				} else if ($scope.vistaCoordinacion === 6) {
					$scope.consultarCalendarizada();
				} else {
					$scope.consultarGestoria();
				}
                $("#modalDetalleOt").modal('hide');
            }else{
                console.log(result.data.resultDescripcion)
                toastr.warning( result.data.resultDescripcion );
            }
        }).catch(err => handleError(err));
    }

	$scope.objetoPendiente = {};
	$scope.limpiarCamposPendiente = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoPendiente.folio = "";
				$scope.objetoPendiente.claveCliente = "";
				break;
			case 2:
				$scope.objetoPendiente.ot = "";
				$scope.objetoPendiente.claveCliente = "";
				break;
			case 3:
				$scope.objetoPendiente.ot = "";
				$scope.objetoPendiente.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoAsignada = {};
	$scope.limpiarCamposAsignada = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoAsignada.folio = "";
				$scope.objetoAsignada.claveCliente = "";
				break;
			case 2:
				$scope.objetoAsignada.ot = "";
				$scope.objetoAsignada.claveCliente = "";
				break;
			case 3:
				$scope.objetoAsignada.ot = "";
				$scope.objetoAsignada.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoDetenida = {};
	$scope.limpiarCamposDetenida = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoDetenida.folio = "";
				$scope.objetoDetenida.claveCliente = "";
				break;
			case 2:
				$scope.objetoDetenida.ot = "";
				$scope.objetoDetenida.claveCliente = "";
				break;
			case 3:
				$scope.objetoDetenida.ot = "";
				$scope.objetoDetenida.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoTerminadas = {};
	$scope.limpiarCamposTerminada = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoTerminadas.folio = "";
				$scope.objetoTerminadas.claveCliente = "";
				break;
			case 2:
				$scope.objetoTerminadas.ot = "";
				$scope.objetoTerminadas.claveCliente = "";
				break;
			case 3:
				$scope.objetoTerminadas.ot = "";
				$scope.objetoTerminadas.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoCancelada = {};
	$scope.limpiarCamposCancelada = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoCancelada.folio = "";
				$scope.objetoCancelada.claveCliente = "";
				break;
			case 2:
				$scope.objetoCancelada.ot = "";
				$scope.objetoCancelada.claveCliente = "";
				break;
			case 3:
				$scope.objetoCancelada.ot = "";
				$scope.objetoCancelada.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoCalendarizada = {};
	$scope.limpiarCamposCalendarizada = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoCalendarizada.folio = "";
				$scope.objetoCalendarizada.claveCliente = "";
				break;
			case 2:
				$scope.objetoCalendarizada.ot = "";
				$scope.objetoCalendarizada.claveCliente = "";
				break;
			case 3:
				$scope.objetoCalendarizada.ot = "";
				$scope.objetoCalendarizada.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.objetoGestoria = {};
	$scope.limpiarCamposGestoria = function(opcion) {
		switch (opcion) {
			case 1:
				$scope.objetoGestoria.folio = "";
				$scope.objetoGestoria.claveCliente = "";
				break;
			case 2:
				$scope.objetoGestoria.ot = "";
				$scope.objetoGestoria.claveCliente = "";
				break;
			case 3:
				$scope.objetoGestoria.ot = "";
				$scope.objetoGestoria.folio = "";
				break;
			default:
				break;
		}
	}

	$scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

	$scope.consultarBandejaFFM = function(params, table, tablagg) {
		if(tableTerminada) {
			tableTerminada.destroy() 
		}
		tableTerminada = $("#tableTerminada").DataTable({
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
				"url": "req/consultarBandejaFFM",
				"type": "POST",
				"data": params,
				"beforeSend": function () {
					if(!swal.isVisible() ){
						swal({ text: 'Cargando registros...', allowOutsideClick: false });
						swal.showLoading();
					}
					
				},
				"dataSrc": function (json) {
					console.log(json);
					$scope.elementosRegistro = json.registrosTotales
					return json.data;
				},
				"error":function(xhr, error, thrown){
					handleError(xhr)
				}, 
				"complete": function () {
					swal.close()
				}
			},
			"columns": [null, null, null, null, null, null, null, null, null, null],
			"language": idioma_espanol_not_font
		});
	}

	$scope.mostrarFiltros = function() {
		//PENDIENTE
		$scope.listaEstatusPendiente = $scope.filtrosCatalogo.filter(e => {return e.id === 1});
		$scope.listaEstatusPendiente.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});
		$scope.listadoMotivosReagenda = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 201})

		//ASIGNADA
		$scope.listaEstatusAsignada = $scope.filtrosCatalogo.filter(e => {return e.id === 2});
		$scope.listaEstatusAsignada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//DETENIDA
		$scope.listaEstatusDetenida = $scope.filtrosCatalogo.filter(e => {return e.id === 3});
		$scope.listaEstatusDetenida.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//TERMINADA
		$scope.listaEstatusTerminada = $scope.filtrosCatalogo.filter(e => {return e.id === 4});
		$scope.listaEstatusTerminada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//CANCELADA
		$scope.listaEstatusCancelada = $scope.filtrosCatalogo.filter(e => {return e.id === 5});
		$scope.listaEstatusCancelada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});

		//CALENDARIZADO
		$scope.listaEstatusCalendarizada = $scope.filtrosCatalogo.filter(e => {return e.id === 6});
		$scope.listaEstatusCalendarizada.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});
		$scope.listadoMotivosCalendarizado = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 243})

		//GESTORIA
		$scope.listaEstatusGestoria = $scope.filtrosCatalogo.filter(e => {return e.id === 7});
		$scope.listaEstatusGestoria.map((es)=>{
			es.estados = $scope.filtrosCatalogo.filter(e => {return e.idPadre === es.id});
		});
		$scope.listadoEstadoGestoria = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 7});
		$scope.listadoMotivosGestaria = $scope.filtrosCatalogo.filter(e => {return e.idPadre === 249})

	}

	$scope.mostrarTurnos = function() {
		$scope.listadoTurnosAcciones = $scope.filtrosGeneral.turnosdisponibles;
	}

	$scope.banderaGeografiaPendiente = false;
	$scope.banderaGeografiaAsignada = false;
	$scope.banderaGeografiaDetenida = false;
	$scope.banderaGeografiaTerminada = false;
	$scope.banderaGeografiaCancelada = false;
	$scope.banderaGeografiaCalendarizada = false;
	$scope.banderaGeografiaGestoria = false;
	$scope.cambiarVista = function(opcion) {
		
		if (opcion === 1) {
			
			if(!$scope.banderaGeografiaPendiente) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading();
				$("#jstree-pendiente").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaPendiente = true;
					$scope.consultarPendientes();
					$scope.btnAceptarModalGeografiaPendiente();
					$scope.pintarNombreEstatus($scope.filtrosGeneral.estatusPendiente,'#estatusPendiente');
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaPendiente,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			
			$scope.nombreBandeja = "PENDIENTE";
		}
		
		if (opcion === 2) {
			
			if(!$scope.banderaGeografiaAsignada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-asignado").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaAsignada = true;
					$scope.consultarAsignada();
					$scope.btnAceptarModalGeografiaAsignada();
					$scope.pintarNombreEstatus($scope.filtrosGeneral.estatusAsignada,'#estatusAsignada');
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaAsignada,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			
			$scope.nombreBandeja = "ASIGNADA";
		}
		if (opcion === 3) {
			
			if (!$scope.banderaGeografiaDetenida) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-detenido").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaDetenida = true;
					$scope.consultarDetenida();
					$scope.btnAceptarModalGeografiaDetenida();
					$scope.pintarNombreEstatus($scope.filtrosGeneral.estatusDetenida,'#estatusDetenida');
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaDetenida,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			
			$scope.nombreBandeja = "DETENIDA";
		}
		if (opcion === 4) {
			if (!$scope.banderaGeografiaTerminada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-terminada").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaTerminada = true;
					$scope.consultarTerminada();
					$scope.btnAceptarModalGeografiaTerminada();
					$scope.pintarNombreEstatus($scope.filtrosGeneral.estatusTerminada,'#estatusTerminada');
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaTerminada,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			$scope.nombreBandeja = "TERMINADA";
		}
		if (opcion === 5) {
			if (!$scope.banderaGeografiaCancelada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-cancelada").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaCancelada = true;
					$scope.consultarCancelada();
					$scope.btnAceptarModalGeografiaCancelada();
					$scope.pintarNombreEstatus($scope.filtrosGeneral.estatusCancelada,'#estatusCancelada');
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaCancelada,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			$scope.nombreBandeja = "CANCELADA";
		}
		if (opcion === 6) {
			if (!$scope.banderaGeografiaCalendarizada) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-calendarizar").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaCalendarizada = true;
					$scope.consultarCalendarizada();
					$scope.btnAceptarModalGeografiaCalendarizada();
					$scope.pintarNombreEstatus($scope.filtrosGeneral.estatusCalendarizada,'#estatusCalendarizada');
				}).jstree({
					'plugins': ["wholerow", "checkbox", "search"],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaCalendarizada,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			$scope.nombreBandeja = "CALENDARIZADA";
		}
		if (opcion === 7) {
			if (!$scope.banderaGeografiaGestoria) {
				swal({html: '<strong>Espera un momento...</strong>',allowOutsideClick: false}); 
				swal.showLoading(); 
				$("#jstree-gestoria").bind('loaded.jstree', function(e, data) {
					//swal.close();
					$scope.banderaGeografiaGestoria = true;
					$scope.consultarGestoria();
					$scope.btnAceptarModalGeografiaGestoria();
					$scope.pintarNombreEstatus($scope.filtrosGeneral.estatusGestoria,'#estatusGestoria');
				}).jstree({	
					'plugins': ["wholerow", "checkbox", "search"],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaGestoria,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}
			$scope.nombreBandeja = "GESTORIA";
		}
		
		$scope.vistaCoordinacion = opcion;
	}

	$('#modal-geografia-pendiente').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaPendiente();
	});

	$('#modal-geografia-asignada').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaAsignada();
	});

	$('#modal-geografia-detenido').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaDetenida();
	});

	$('#modal-geografia-terminada').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaTerminada();
	});

	$('#modal-geografia-cancelada').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaCancelada();
	});

	$('#modal-geografia-calendarizada').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaCalendarizada();
	});

	$('#modal-geografia-gestoria').on('hidden.bs.modal', function () {
		$scope.btnAceptarModalGeografiaGestoria();
	});

	$scope.btnAceptarModalGeografiaPendiente = function() {
		var geografias = $('#jstree-pendiente').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiaPendiente').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiaPendiente").css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.btnAceptarModalGeografiaAsignada = function() {
		var geografias = $('#jstree-asignado').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiaAsignada').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiaAsignada").css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.btnAceptarModalGeografiaDetenida = function() {
		var geografias = $('#jstree-detenido').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiaDetenida').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiaDetenida").css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.btnAceptarModalGeografiaTerminada = function() {
		var geografias = $('#jstree-terminada').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiaTerminada').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiaTerminada").css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.btnAceptarModalGeografiaCancelada = function() {
		var geografias = $('#jstree-cancelada').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiaCancelada').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiaCancelada").css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.btnAceptarModalGeografiaCalendarizada = function() {
		var geografias = $('#jstree-calendarizar').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiaCalendarizar').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiaCalendarizar").css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.btnAceptarModalGeografiaGestoria = function() {
		var geografias = $('#jstree-gestoria').jstree("get_selected", true);
    	let textoGeografias = [];
		angular.forEach(geografias,(geografia,index) => {
			textoGeografias.push(geografia.text);				
		});
		$('#txtGeografiaGestoria').val(textoGeografias);
		if(textoGeografias.length > 0){
			$("#txtGeografiaGestoria").css("border-bottom", "2px solid #d9d9d9");
		}
	}

	$scope.iniciarArboles = function() {
		$("#jstree-pendiente").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaPendiente = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': geografiaPendiente,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-asignado").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaAsignada = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': geografiaAsignada,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-detenido").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaDetenida = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': geografiaDetenida,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-terminada").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaTerminada = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': geografiaTerminada,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-cancelada").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaCancelada = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': geografiaCancelada,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-calendarizar").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaCalendarizada = true;
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': geografiaCalendarizada,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

		$("#jstree-gestoria").bind('loaded.jstree', function(e, data) {
			swal.close();
			$scope.banderaGeografiaGestoria = true;
			console.log("se crea");
		}).jstree({	
			'plugins': ["wholerow", "checkbox"],
			'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': geografiaGestoria,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});

	}

	$scope.pintarArbol = function(nombreArbol, datos) {
		console.log(nombreArbol);
		$(nombreArbol).bind('loaded.jstree', function(e, data) {
		}).jstree({
			'plugins': ["wholerow", "checkbox"],
			'search': {
				"case_sensitive": false,
				"show_only_matches": true
			},
			'core': {
				'data': datos,
				'themes': {
					'name': 'proton',
					'responsive': true,
					"icons":false        
				}
			}
		});
	}

	$scope.validarFecha = function(fechaInicio, fechaFin) {
		if (document.getElementById(fechaInicio).value.trim() != "" && document.getElementById(fechaFin).value.trim() != "") {
			var inicio = document.getElementById(fechaInicio).value.split('/');
			var fin = document.getElementById(fechaFin).value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio <= date_fin) {
				return true;
			} else {
				return false;
			}
		}
	}

	$scope.showArbol = 0;
	$scope.mostrarArbol = function(opcion) {
		switch (opcion) {
			case 1:
				$("#modal-geografia-pendiente").modal("show");
				setTimeout(function (){
			        $("#searchGeografiaPendiente").focus();
			    }, 750);
				break;
			case 2:
				$("#modal-geografia-asignada").modal("show");
				setTimeout(function (){
			        $("#searchGeografiaAsignada").focus();
				}, 750);
				break;
			case 3:
				$("#modal-geografia-detenido").modal("show");
				setTimeout(function (){
			        $("#searchGeografiaDetenida").focus();
				}, 750);
				break;
			case 4:
				$("#modal-geografia-terminada").modal("show");
				setTimeout(function (){
			        $("#searchGeografiaTerminada").focus();
				}, 750);
				break;
			case 5:
				$("#modal-geografia-cancelada").modal("show");
				setTimeout(function (){
			        $("#searchGeografiaCancelada").focus();
				}, 750);
				break;
			case 6:
				$("#modal-geografia-calendarizada").modal("show");
				setTimeout(function (){
			        $("#searchGeografiaCalendarizada").focus();
				}, 750);
				break;
			case 7:
				$("#modal-geografia-gestoria").modal("show");
				setTimeout(function (){
			        $("#searchGeografiaGestoria").focus();
				}, 750);
				break;
		
		
			default:
				break;
		}
		//$scope.showArbol = opcion;
		
	}

	$scope.detalleOtSeleccionada = {};
	consultaDetalleOt = function(index) {
		if ($scope.vistaCoordinacion === 1 || $scope.vistaCoordinacion === 6 || $scope.vistaCoordinacion === 7) {
			$scope.elementCalendarizado = {};
			$scope.elementReagendaOT = {};
			$scope.elementoPlazaComercial = {};
			$scope.detalleOtSeleccionada = {};
			$scope.$apply();
			$scope.objetoSelecionado = {};
			$scope.objetoSelecionado = $scope.resultPendientes[index];
			$scope.permisosModal=$scope.elementosConfigGeneral.get("MODAL_FLUJO_"+ $scope.objetoSelecionado.idFlujo ).split(",");
			$scope.requestModalInformacion($scope.objetoSelecionado.idOrden);
			/*
			switch ($scope.vistaCoordinacion) {
				case 1:
					$scope.objetoSelecionado = $scope.resultPendientes[index];
					break;
				case 6:
					$scope.objetoSelecionado = $scope.resultCalendarizada[index];
					break;
				case 7:
					$scope.objetoSelecionado = $scope.resultGestoria[index];
					break;
				default:
					break;
			}
			*/

			console.log($scope.objetoSelecionado);
			$scope.detalleOtSeleccionada.idOrden = $scope.objetoSelecionado.idOrden;
			$scope.detalleOtSeleccionada.folioOrden = $scope.objetoSelecionado.folioSistema;
			$scope.detalleOtSeleccionada.idFlujo = $scope.objetoSelecionado.idFlujo;
			$scope.detalleOtSeleccionada.idtipoOrden = $scope.objetoSelecionado.idTipoOrden;
			$scope.detalleOtSeleccionada.idSubtipoOrden = $scope.objetoSelecionado.idSubTipoOrden;
			$scope.detalleOtSeleccionada.latitud = $scope.objetoSelecionado.latitud;
			$scope.detalleOtSeleccionada.longitud = $scope.objetoSelecionado.longitud;
			$("#modalDetalleOt").modal("show");
			$('#fecha-reagendamiento').datepicker('update',new Date());
			$('#fecha-calendarizado').datepicker('update',   moment(new Date()).add('days', 8).toDate() );
			if ($scope.vistaCoordinacion !== 1) {
				document.getElementById('opcion-reagendar').click()
			} else {
				document.getElementById('opcion-plaza').click()
			}
		}
		//$scope.vistaCoordinacion = 
	}

	$scope.idOtSelect = "";
    $scope.requestModalInformacion = function (idparams) {
        $scope.otconsultamodal=
        document.getElementById('v-tabs-consulta-detalleot-tab').click()
        $scope.idOtSelect = idparams;
        $scope.flagComentarios = false;
        $scope.flagHistorico = false;
        $scope.flagPedido = false;
        $scope.comentariosOrdenTrabajo = [];
        $scope.historialOrdenTrabajo = [];
        $scope.infoOtDetalle = {}
        $scope.detalleCotizacion = {}
        $scope.detalleTecnicoOt = {};
		let params = {
            "idOt": idparams
        }
        swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        $q.all([
            coordInstalacionesPIService.consultarDetalleOtDespacho(params),
            coordInstalacionesPIService.consultarDetalleTecnicoOt(params),
        ]).then(function (results) {
            swal.close()
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {
                        if (results[0].data.result.orden) {
                            $scope.infoOtDetalle = results[0].data.result.orden
                            $("#modalDetalleOT").modal({ backdrop: 'static', keyboard: false });
                            $("#modalDetalleOT").modal('show')
                            setTimeout(function(){ 
                                document.getElementsByClassName('permiso-accion-modal')[0].click();
                            },500)

                        } else {
                            toastr.info(results[0].data.result.mensaje);
                        }
                    } else {
                        toastr.warning('No se encontraron datos');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {
                        $scope.detalleTecnicoOt = results[1].data.result;
                    } else {
                        toastr.warning('No se encontraron datos');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
            
            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
                    if (results[2].data.result) {
                        if (results[2].data.result.orden) {
                        	
                        	$scope.infoDetalleOtPe = results[2].data.result.orden;
                        	
                        	$scope.infoDetalleOtPe.tipoOrden = $scope.respaldoTipoOrdenArray.find(e=>{return e.id===$scope.infoDetalleOtPe.idTipoOrden});
                        	$scope.infoDetalleOtPe.subTipoOrden = $scope.respaldoTipoOrdenArray.find(e=>{return e.id===$scope.infoDetalleOtPe.idSubTipoOrden});
                        	$scope.infoDetalleOtPe.estado = $scope.respaldoStatusArray.find(e=>{return e.id===$scope.infoDetalleOtPe.idEstado});
                        	$scope.infoDetalleOtPe.estatus = $scope.respaldoStatusArray.find(e=>{return e.id===$scope.infoDetalleOtPe.idEstatus});
                        	
                        	if($scope.infoDetalleOtPe.detalleCorteMasivo !== undefined){
                        		$scope.tabDetalleCorteMasivo = true;
                        	}else if($scope.infoDetalleOtPe.detalleDetencion !== undefined){
                        		$scope.tabDetalleDetencion = true;
                        	}else if($scope.infoDetalleOtPe.detalleInspeccion !== undefined){
                        	    $scope.tabDetalleInspector = true;
                        	}
                        } else {
                            toastr.info(results[2].data.result.mensaje);
                        }
                    }else {
                        toastr.warning('No se encontraron datos en el detalle de la OT');
                    }
                }else{
                	toastr.warning(results[2].data.resultDescripcion);
                }
            }else {
                toastr.error('Ha ocurrido un error en la consulta del detalle de la OT');
            }
        }).catch(err => handleError(err));
    }

	$scope.flagHistorico = false;
    $scope.historialOrdenTrabajo = [];
    $scope.consultarHistorial = function () {
        if (!$scope.flagHistorico) {
            $scope.historialOrdenTrabajo = [];
            $(".dot-dependencia").remove()
            swal({ text: 'Consultando historial ...', allowOutsideClick: false });
            swal.showLoading();
            let params = {
                "idOt": $scope.idOtSelect
            }
            coordInstalacionesPIService.consultarHistoricoDespachoOT(params).then(function success(response) {
                swal.close()
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalle) {
                                $scope.flagHistorico = true;
                                $scope.historialOrdenTrabajo = response.data.result.detalle//.reverse();
                                setTimeout(function(){
                                    $(".dot-dependencia").remove()
                                    $scope.pintarDependenciasHistorico();
                                },500)
                            }else{
                                toastr.warning( response.data.result.mensaje );                
                            }
                        } else {
                            toastr.warning('No se encontraron resultados');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err))
        }
    }

	$scope.flagComentarios = false;
    $scope.comentariosOrdenTrabajo = [];
    $scope.consultarComentarios = function () {
        if (!$scope.flagComentarios) {
            if (!swal.isVisible()) {
                swal({ text: 'Consultando comentarios ...', allowOutsideClick: false });
                swal.showLoading();
            }

            let params = {
                "idOt": $scope.idOtSelect
            }
            coordInstalacionesPIService.consultarComentariosDespachoOT(params).then(function success(response) {
                swal.close()
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalle) {
                                $scope.flagComentarios = true;
                                $scope.comentariosOrdenTrabajo = response.data.result.detalle;
                                angular.forEach($scope.comentariosOrdenTrabajo, function (comentario, index) {
                                    comentario.fechaComentario = moment(comentario.fecha + ' ' + comentario.hora).format("dddd, D [de] MMMM [de] YYYY hh:mm A");
                                });
                            } else {
                                toastr.warning(response.data.result.mensaje);
                            }
                        } else {
                            toastr.warning('No se encontraron comentarios');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err))
        }
    }

	$scope.seleccionarTodos = function(lista) {
		lista.map((e)=>{
			e.check = true;
		});
	}

	$scope.deseleccionarTodos = function(lista) {
		lista.map((e)=>{
			e.check = false;
		});
	}

	$scope.clickEstatus = function(estatus) {
		estatus.estados.map(function(estado) {
			estado.check = !estatus.check;
		});
	}

	$scope.clickEstado = function(estatus, estado) {
		
	}

	$scope.pintarDependenciasHistorico = function() {
        var couth = 0;
        var contador = 0;
        var height = 0;
        angular.forEach($scope.historialOrdenTrabajo,function(element,index){
            couth++;
            contador++;
            if (contador !== $scope.historialOrdenTrabajo.length) {
                if (couth === 1) {
                    height = $("#content-historial-"+index).height();
                    let posicionOriginal = $("#content-historial-"+index).position();
                    posicionOriginal.top += 70;
                    posicionOriginal.left += (2 + $("#content-historial-"+index).width());
                    if (index === 0) {
                        $("#content-principal-historial").append("<span class='direccionactividad dot-dependencia content-historial-" + index + " fa fa-arrow-left' style='left: " + posicionOriginal.left + "px;top: " + (posicionOriginal.top + 10) + "px'></span>");
                    } else {
                        $("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
                    }
                    $scope.pintarPunto(posicionOriginal, index);
                }
                if (couth === 2) {
                    if ($("#content-historial-"+index).height() > height) {
                        height = $("#content-historial-"+index).height();
                    }
                    let posicionOriginal = $("#content-historial-"+index).position();
                    posicionOriginal.top += 70;
                    posicionOriginal.left += (2 + $("#content-historial-"+index).width());
                    $("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
                    $scope.pintarPunto(posicionOriginal, index);
                }
                if(couth === 3) {
                    if ($("#content-historial-"+index).height() > height) {
                        height = $("#content-historial-"+index).height();
                    }
                    couth = 0;
                    let posicionOriginal = $("#content-historial-"+index).position();
                    height += posicionOriginal.top;
                    posicionOriginal.top += 70;
                    posicionOriginal.left += (2 + $("#content-historial-"+index).width());
                    $("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 5) + "px;top:" + posicionOriginal.top + "px'>.</b>");
                    $scope.pintarPunto(posicionOriginal, index);
                    /*
                    for (let i = 0; i < 8; i++) {
                        posicionOriginal.top += 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    }
                    */
                    
                    height -=25;
                    do {
                        posicionOriginal.top += 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    } while (height > posicionOriginal.top);
                    
                    for (let i = 0; i < 95; i++) {
                        posicionOriginal.left -= 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    }
                    for (let i = 0; i < 9; i++) {
                        posicionOriginal.top += 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    }
                    for (let i = 0; i < 1; i++) {
                        posicionOriginal.left += 10;
                        $scope.pintarPunto(posicionOriginal, index);
                    }
                }
            }
        });
    }

	$scope.addComentariosOt = function () {
        if ($scope.comentarios.trim() !== '' && !/^\s/.test($scope.comentarios)) {

            let params = {
                idOrden: $scope.idOtSelect,
                comentario: $scope.comentarios,
                origenSistema: 1
            }

            swal({ text: 'Espere un momento ...', allowOutsideClick: false });
            swal.showLoading();

            genericService.agregarComentariosOt(params).then(function success(response) {
                swal.close();
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        console.log("############## Comentario agregado")
                        $scope.comentarios = '';
                        $scope.flagComentarios = false;
                        $(".chat-area").scrollTop(0);
                        $scope.consultarComentarios();
                    } else {
                        toastr.error(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error(response.data.resultDescripcion);
                }
            }).catch(err => handleError(err))

        } else {
            $scope.comentarios = '';
            document.getElementById('comentarioOt').value = '';
            toastr.warning('Intoducir un comentario.')
        }
    }

	$scope.pintarPunto = function(posicionOriginal, index) {
        $("#content-principal-historial").append("<b class='content-historial-" + index + " dot-dependencia' style='left:" + (posicionOriginal.left + 15) + "px;top:" + posicionOriginal.top + "px'>.</b>");
    }

	$scope.busquedaGeografiaFiltroPendiente = function () {
        $("#jstree-pendiente").jstree("search", $('#searchGeografiaPendiente').val());
    }
	$scope.busquedaGeografiaFiltroAsignada = function () {
		$("#jstree-asignado").jstree("search", $('#searchGeografiaAsignada').val());
    }
	$scope.busquedaGeografiaFiltroDetenida = function () {
        $("#jstree-detenido").jstree("search", $('#searchGeografiaDetenida').val());
    }
	$scope.busquedaGeografiaFiltroTerminada = function () {
        $("#jstree-terminada").jstree("search", $('#searchGeografiaTerminada').val());
    }
	$scope.busquedaGeografiaFiltroCancelada = function () {
        $("#jstree-cancelada").jstree("search", $('#searchGeografiaCancelada').val());
    }
	$scope.busquedaGeografiaFiltroCalendarizada = function () {
        $("#jstree-calendarizar").jstree("search", $('#searchGeografiaCalendarizada').val());
    }
	$scope.busquedaGeografiaFiltroGestoria = function () {
        $("#jstree-gestoria").jstree("search", $('#searchGeografiaGestoria').val());
    }

	angular.element(document).ready(function () {

		tableCalendarizada=$('#tableCalendarizada').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });
		
		tablePendiente=$('#table_pendiente').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableAsignada=$('#tableAsignada').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableDetenida=$('#tableDetenida').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableTerminada=$('#tableTerminada').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableCancelada=$('#tableCancelada').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });

		tableGestoria=$('#tableGestoria').DataTable({
            "processing": false,
			"ordering": false,
			"scrollX": false,
			"paging": true,
			"lengthChange": false,
			"searching": false,
			"ordering": false,
			"pageLength": 10,
			"language": idioma_espanol_not_font,
			"data": []
        });
				
		$("#btn_mostrar_nav").hide(500);
		$('.datepicker').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: true
		});
		$('.datepicker').datepicker('update', new Date());

		$('#fecha-reagendamiento').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true,
            startDate :  moment(new Date()).toDate()
        });
        $('#fecha-reagendamiento').datepicker('update',new Date());

		$('#fecha-calendarizado').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true,
            startDate :  moment(new Date()).add('days', 8).toDate()
        });
        $('#fecha-calendarizado').datepicker('update',   moment(new Date()).add('days', 8).toDate() );

		$('.drop-down-filters').on("click.bs.dropdown", function (e) {
            e.stopPropagation();
        });

		$("#idBody").removeAttr("style");
		$('#moduloCoordInst').addClass('active');
		$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');

	});


	// -----------------------------------------------------------------------


}]);