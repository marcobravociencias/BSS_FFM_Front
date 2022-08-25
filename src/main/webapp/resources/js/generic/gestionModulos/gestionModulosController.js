var app = angular.module('gestionModulosApp', []);

app.controller('gestionModulosController', ['$scope', '$q', '$filter', 'gestionModulosService', function ($scope, $q, $filter, gestionModulosService) {

//    var modulosTable;
//    var accionesTable;
	
    $scope.isModulo = true;
    $scope.exisModulos = false;
    $scope.exisPermisosModulo = false;
    $scope.isNuevoModulo = false;
    $scope.isEditModulo = false;
    $scope.isNuevoPermiso = false;
    $scope.isEditPermiso = false;
    
    $scope.moduloSeleccionado = {};
    $scope.procesoEnEjecucion = "";
    $scope.idPropietario = null;
    $scope.idUnidadNegocio = null;
    
    $scope.idModuloEdit = null;
    $scope.idPermisoEdit = null;
    
    $scope.listaModulos = [];
    $scope.listaPermisosModulo = [];
    $scope.listaPropietarios = [];
    $scope.listaUnidadesNegocio = [];
    
    $scope.jsonListaModulos = [{"id":"1","nombre":"Usuarios","clave":"moduloUsuarios","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-users","idPadre":null,"nivel":"1"},{"id":"2","nombre":"Vehículos","clave":"moduloVehiculos","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-cars","idPadre":null,"nivel":"1"},{"id":"3","nombre":"Skills","clave":"moduloSkills","propietario":"1","unidadNegocio":"Empresarial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-work","idPadre":null,"nivel":"1"},{"id":"4","nombre":"Despacho","clave":"moduloDespacho","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#f2f2f2","colorHover":"#f3f3f3","icono":"fa fa-desk","idPadre":null,"nivel":"1"},{"id":"5","nombre":"Consulta OT","clave":"moduloConsultaOT","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#121212","colorHover":"#333","icono":"fa fa-read","idPadre":null,"nivel":"1"},{"id":"6","nombre":"Reportes PI","clave":"moduloReportes","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#e3e3e3","colorHover":"#f0f0f0","icono":"fa fa-report","idPadre":null,"nivel":"1"}];
    $scope.jsonListaPermisosModulo = [{"id":"7","nombre":"Crear usuario","clave":"crearUsuario","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-users","idPadre":"1","nivel":"2"},{"id":"8","nombre":"Consultar usuarios","clave":"consultaUsuarios","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-users","idPadre":"1","nivel":"2"},{"id":"9","nombre":"Modificar usuario","clave":"modificarUsuario","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-users","idPadre":"1","nivel":"2"},{"id":"10","nombre":"Eliminar usuarios","clave":"eliminarUsuario","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-users","idPadre":"1","nivel":"2"},{"id":"11","nombre":"Consultar vechículos","clave":"consultaVehiculos","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-cars","idPadre":"2","nivel":"2"},{"id":"12","nombre":"Crear vehículo","clave":"crearVehiculo","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-cars","idPadre":"2","nivel":"2"},{"id":"13","nombre":"Eliminar vehículo","clave":"eliminarVehiculo","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-cars","idPadre":"2","nivel":"2"},{"id":"14","nombre":"Modificar vehículo","clave":"modificarVehiculo","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#ffffff","colorHover":"#000000","icono":"fa fa-cars","idPadre":"2","nivel":"2"},{"id":"15","nombre":"Descarga seguimiento diario","clave":"descargaSeguimientoDiario","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#d0d0d0","colorHover":"#f5f5f5","icono":"fa fa-desk","idPadre":"4","nivel":"2"},{"id":"16","nombre":"Confirma Orden","clave":"confirmaOrden","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#d0d0d0","colorHover":"#f5f5f5","icono":"fa fa-desk","idPadre":"4","nivel":"2"},{"id":"17","nombre":"Desconfirma Orden","clave":"desconfirmaOrden","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#d0d0d0","colorHover":"#f5f5f5","icono":"fa fa-desk","idPadre":"4","nivel":"2"},{"id":"18","nombre":"Asigna Orden","clave":"asignaOrden","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#d0d0d0","colorHover":"#f5f5f5","icono":"fa fa-desk","idPadre":"4","nivel":"2"},{"id":"19","nombre":"Desasigna Orden","clave":"desasignaOrden","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#d0d0d0","colorHover":"#f5f5f5","icono":"fa fa-desk","idPadre":"4","nivel":"2"},{"id":"20","nombre":"Reasigna Orden","clave":"reasignaOrden","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#d0d0d0","colorHover":"#f5f5f5","icono":"fa fa-desk","idPadre":"4","nivel":"2"},{"id":"21","nombre":"Reagenda Orden","clave":"reagendaOrden","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#d0d0d0","colorHover":"#f5f5f5","icono":"fa fa-desk","idPadre":"4","nivel":"2"},{"id":"22","nombre":"Calendariza Orden","clave":"calendarizaOrden","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#d0d0d0","colorHover":"#f5f5f5","icono":"fa fa-desk","idPadre":"4","nivel":"2"},{"id":"23","nombre":"Consulta Seguimiento Diario","clave":"consultaSeguimientoDiario","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#3942d7","colorHover":"#f55756","icono":"fa fa-report","idPadre":"6","nivel":"2"},{"id":"24","nombre":"Consulta Cierre Diario","clave":"consultaCierreDiario","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#3942d7","colorHover":"#f55756","icono":"fa fa-report","idPadre":"6","nivel":"2"},{"id":"25","nombre":"Consulta Asignadas Compensacion","clave":"consultaAsignadasCompensacion","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#3942d7","colorHover":"#f55756","icono":"fa fa-report","idPadre":"6","nivel":"2"},{"id":"26","nombre":"Descarga Cierre Diario","clave":"descargaCierreDiario","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#3942d7","colorHover":"#f55756","icono":"fa fa-report","idPadre":"6","nivel":"2"},{"id":"27","nombre":"Descarga Reporte Tecnicos Tipos Ordenes","clave":"descargaReporteTecnicosTiposOrdenes","propietario":"1","unidadNegocio":"Residencial","fechaActualizacion":"08/08/2022","color":"#3942d7","colorHover":"#f55756","icono":"fa fa-report","idPadre":"6","nivel":"2"}];
    $scope.jsonListaPropietarios = [{"id":"1","nombre":"PI Mexico"},{"id":"2","nombre":"PE Distrital Mexíco"},{"id":"3","nombre":"PE CORE Mexíco"},{"id":"4","nombre":"PMO Mexíco"},{"id":"5","nombre":"Delivery Mexíco"},{"id":"6","nombre":"PI Colombia"}];
    $scope.jsonListaUnidadesNegocio = [{"id":"1","nombre":"Residencial"},{"id":"2","nombre":"Empresarial"},{"id":"3","nombre":"Planta Externa"},{"id":"4","nombre":"Delivery"}];
    $scope.contadorId = 50;
    $scope.contadorIdPermisos = 100;
    
//    modulosTable = $('#modulosTable').DataTable({
//        "paging": true,
//        "lengthChange": false,
//        "searching": false,
//        "ordering": false,
//        "pageLength": 5,
//        "info": false,
//        "autoWidth": false,
//        "language": idioma_espanol_not_font
//    });

//    accionesTable = $('#accionesTable').DataTable({
//        "paging": true,
//        "lengthChange": false,
//        "searching": false,
//        "ordering": false,
//        "pageLength": 5,
//        "info": false,
//        "autoWidth": false,
//        "language": idioma_espanol_not_font
//    });

    $scope.abrirMdlNuevo = function () {
    	if($scope.validateFormConsulta()){
    		if($scope.isNuevoModulo || $scope.isEditModulo){
        		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
        		if($scope.isNuevoModulo){
        			$("#rowModuloNuevo").addClass("bordeRowProcesoEnEjecucion");
        			setTimeout(function () {
        				$("#rowModuloNuevo").removeClass("bordeRowProcesoEnEjecucion");
        	        }, 2000);
        		}
        		if($scope.isEditModulo && $scope.idModuloEdit != null){
        			$("#rowModuloConsulta"+$scope.idModuloEdit).addClass("bordeRowProcesoEnEjecucion");
        			setTimeout(function () {
        				$("#rowModuloConsulta"+$scope.idModuloEdit).removeClass("bordeRowProcesoEnEjecucion");
        	        }, 2000);
        		}
        	}else{
        		$(".title-vista-modulos").remove();
        		$("#containerTituloVistaModulos").append("<h6 class='title-vista-modulos'>Módulos > <b>Registro</b></h6>");
        		
    	    	$scope.isNuevoModulo = true;
    	    	$scope.procesoEnEjecucion = "registro";
    	    	$("#buscadorTablaModulos").prop("disabled",true);
    	    	$("#buscadorTablaModulos").addClass("inputsBloqueados");
    	    	$("#moduloPropietario").prop("disabled",true);
    	    	$("#moduloPropietario").addClass("inputsBloqueados");
    	    	$("#moduloUnidadNegocio").prop("disabled",true);
    	    	$("#moduloUnidadNegocio").addClass("inputsBloqueados");
    	    	$("#btn-consultar-modulos").addClass("btnsBloqueados");
    	    	$(".btnEditarModulo").addClass("btnsBloqueados");
    	    	$(".btnDetalleModulo").addClass("btnsBloqueados");
    	    	$(".btnEliminarModulo").addClass("btnsBloqueados");
    	    	$("#btnNuevoModulo").addClass("btnsBloqueados");
    	    	$(".rowConsultaModuloTxt").addClass("rowsTablaModulosBloqueados");
    	    	$(".encabezadosTablaModulos").addClass("encabezadosTablas");
        	}
    	}
    }

//    abrirMdlEditar = function (id) {
//        $scope.isCrear = false;
//        $scope.permiso = {};
//        $("#modalNuevo").modal('show');
//    }

    $scope.getInformation = function () {
//        $q.all([
//    		  gestionModulosService.consultarPropietarios(),
//            gestionModulosService.consultarUnidadNegocio()
//        ]).then(function (results) {
//            if (results[0].data !== undefined) {
//                if (results[0].data.respuesta) {
//                    if (results[0].data.result) {
    					$scope.listaPropietarios = $scope.jsonListaPropietarios;
//                    } else {
//                        toastr.info('No se encontr\u00F3 catalogo de unidades de negocio');
//                    }
//                } else {
//                    toastr.warning(results[0].data.resultDescripcion);
//                }
//            } else {
//                toastr.error('Ha ocurrido un error en la consulta de unidades de negocio');
//            }
//
//            if (results[1].data !== undefined) {
//                if (results[1].data.respuesta) {
//                    if (results[1].data.result) {
    					$scope.listaUnidadesNegocio = $scope.jsonListaUnidadesNegocio;
//                    } else {
//                        toastr.info('No se encontr\u00F3 catalogo de propietarios');
//                    }
//                } else {
//                    toastr.warning(results[1].data.resultDescripcion);
//                }
//            } else {
//                toastr.error('Ha ocurrido un error en la consulta del catalogo de propietarios');
//            }
//
//        }).catch(err => handleError(err));
        
        setTimeout(function () {
        	$scope.idPropietario = $("#logPropietario").val();
            $scope.idUnidadNegocio = $("#logUnidadNegocio").val();
            
            if($scope.idPropietario != undefined){
            	$("#moduloPropietario").val(""+$scope.idPropietario);
            }
            
            if($scope.idUnidadNegocio != undefined){
            	$("#moduloUnidadNegocio").val(""+$scope.idUnidadNegocio);
            }
            
            if($scope.idPropietario != undefined && $scope.idUnidadNegocio != undefined){
            	$scope.consultarModulos();
            	$scope.$apply();
            }
		}, 300);
        
    }

    $scope.consultarModulos = function () {
    	if($scope.isNuevoModulo || $scope.isEditModulo){
    		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
    		if($scope.isNuevoModulo){
    			$("#rowModuloNuevo").addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowModuloNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    		if($scope.isEditModulo && $scope.idModuloEdit != null){
    			$("#rowModuloConsulta"+$scope.idModuloEdit).addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowModuloConsulta"+$scope.idModuloEdit).removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    	}else{
    		if($scope.validateFormConsulta()){
        		
        		$scope.listaModulos = [];
        		
        		let params = {
        				"idPropietario":$("#moduloPropietario").val(),
        				"idUnidadNegocio":$("#moduloUnidadNegocio").val()
        		};
        		
        		console.log(params);
        		
        		swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
//                gestionModulosService.consultarModulos(params).then(function success(response) {
                    swal.close();
//                    if (response.data !== undefined) {
//                        if (response.data.respuesta) {
//                            if (response.data.result) {
                    			$scope.listaModulos = $scope.jsonListaModulos;
                    			$scope.exisModulos = $scope.listaModulos.length > 0 ? true : false;
                    			if($scope.isNuevoModulo){
                    				setTimeout(function () {
                    					$(".btnEditarModulo").addClass("btnsBloqueados");
                            	    	$(".btnDetalleModulo").addClass("btnsBloqueados");
                            	    	$(".btnEliminarModulo").addClass("btnsBloqueados");
                        	        }, 300);
                    			}
//                            } else {
//                                toastr.info('No se encontraron permisos');
//                            }
//                        } else {
//                            toastr.warning(response.data.resultDescripcion);
//                        }
//                    } else {
//                        toastr.error('Ha ocurrido un error en la consulta de permisos');
//                    }
//                    modulosTable = $('#modulosTable').DataTable({
//                        "paging": true,
//                        "lengthChange": false,
//                        "ordering": true,
//                        "pageLength": 10,
//                        "info": true,
//                        "searching": false,
//                        "bDestroy": true,
//                        "scrollX": false,
//                        "data": arraRow,
//                        "autoWidth": false,
//                        "language": idioma_espanol_not_font,
//                        "aoColumnDefs": [
////                            { "aTargets": [11], "bSortable": false }
//                        ]
//                    });
//                }); 
        	}
    	}
    }
    
    $scope.validateFormConsulta = function() {
    	let text = "";
    	
        if ($("#moduloPropietario").val() === null  || $("#moduloPropietario").val() === "" || $("#moduloPropietario").val() === undefined) {
            $("#moduloPropietario").addClass("input-valid-error");
            text += "<li>Propietario</li>";
        }else{
        	$("#moduloPropietario").removeClass("input-valid-error");
        }
        
        if ($("#moduloUnidadNegocio").val() === null  || $("#moduloUnidadNegocio").val() === "" || $("#moduloUnidadNegocio").val() === undefined) {
            $("#moduloUnidadNegocio").addClass("input-valid-error");
            text += "<li>Unidad de negocio</li>";
        }else{
        	$("#moduloUnidadNegocio").removeClass("input-valid-error");
        }
        
        if (text !== "") {
            let info = "Verifica los siguientes campos: " + text;
            mostrarMensajeInformativo(info);
            return false;
        } else {
        	return true;
        }
	}

//    $scope.editarPermiso = function () {
//
//    }

    $scope.verDetalle = function (idModulo) {
    	
    	if($scope.isNuevoModulo || $scope.isEditModulo){
    		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
    		if($scope.isNuevoModulo){
    			$("#rowModuloNuevo").addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowModuloNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    		if($scope.isEditModulo && $scope.idModuloEdit != null){
    			$("#rowModuloConsulta"+$scope.idModuloEdit).addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowModuloConsulta"+$scope.idModuloEdit).removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    	}else{
    		$scope.isModulo = false;
            $scope.exisPermisosModulo = false;
            $scope.listaPermisosModulo = [];
            $scope.moduloSeleccionado = $scope.listaModulos.find((e) => e.id == idModulo);
            $(".title-vista-permisos").remove();
        	$("#containerTituloVistaPermisos").append("<h6 class='title-vista-permisos'>Módulo " + $scope.moduloSeleccionado.nombre + " > <b>Permisos</b></h6>");
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
//            gestionModulosService.consultarPermisos().then(function success(response) {
                swal.close();
//                if (response.data !== undefined) {
//                    if (response.data.respuesta) {
//                        if (response.data.result) {
                            
                			$scope.listaPermisosModulo = $scope.jsonListaPermisosModulo.filter(e => {return e.idPadre == idModulo});
                			$scope.exisPermisosModulo = $scope.listaPermisosModulo.length > 0 ? true : false;
                			
//                        } else {
//                            toastr.info('No se encontraron permisos');
//                        }
//                    } else {
//                        toastr.warning(response.data.resultDescripcion);
//                    }
//                } else {
//                    toastr.error('Ha ocurrido un error en la consulta de permisos');
//                }
//            });
    	}
    }

//    eliminarPermiso = function () {
//
//    }

//    $scope.guardarPermiso = function () {
//        if ($scope.validateForm()) {
//
//        }
//    }
    
    $scope.guardarNuevoModulo = function() {
    	if ($scope.validateForm()) {
    		
    		swal({
		        title: "Se guardará un nuevo módulo",
		        text: "\u00BFDesea registrar el módulo?",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: '#007bff',
		        confirmButtonText: 'Si',
		        cancelButtonText: 'Cancelar'
		      }).then(function (isConfirm) {
		        if (isConfirm) {
		        	let params = {
		    				"id":$scope.contadorId,
		    				"nombre":$("#nombreModulo").val(),
		    				"clave":$("#claveModulo").val(),
		    				"color":$("#colorModulo").val(),
		    				"colorHover":$("#colorHoverModulo").val(),
		    				"icono":$("#iconoModulo").val(),
		    				"idPadre":null,
		    				"nivel":"1"
		    		};
		    		
		    		$scope.contadorId = ($scope.contadorId + 1);
		    		
		            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		            swal.showLoading();
//		            gestionModulosService.guardarNuevoModulo(params).then(function success(response) {
		                swal.close();
//		                if (response.data !== undefined) {
//		                    if (response.data.respuesta) {
//		                        if (response.data.result) {
		                            
		                			$scope.listaModulos.push(params);
		                			$scope.limpiarDatosNuevoModulo();
		                			mostrarMensajeExitoAlert("Registro guardado con éxito.");
		                			$scope.$apply();
		                			
//		                        } else {
//		                            toastr.info('No se encontraron permisos');
//		                        }
//		                    } else {
//		                        toastr.warning(response.data.resultDescripcion);
//		                    }
//		                } else {
//		                    toastr.error('Ha ocurrido un error en la consulta de permisos');
//		                }
//		            });
		        }
		      }).catch(err => {

		      });
        }
	}

    $scope.validateForm = function () {
        let text = "";
        if ($("#nombreModulo").val() === null  || $("#nombreModulo").val() === "" || $("#nombreModulo").val() === undefined) {
            $("#nombreModulo").addClass("input-valid-error");
            text += "<li>Nombre</li>";
        }else{
        	$("#nombreModulo").removeClass("input-valid-error");
        }
        
        if ($("#claveModulo").val() === null  || $("#claveModulo").val() === "" || $("#claveModulo").val() === undefined) {
            $("#claveModulo").addClass("input-valid-error");
            text += "<li>Clave</li>";
        }else{
        	$("#claveModulo").removeClass("input-valid-error");
        }
        
        if ($("#colorModulo").val() === null  || $("#colorModulo").val() === "" || $("#colorModulo").val() === undefined) {
            $("#colorModulo").addClass("input-valid-error");
            text += "<li>Color</li>";
        }else{
        	$("#colorModulo").removeClass("input-valid-error");
        }
        
        if ($("#colorHoverModulo").val() === null  || $("#colorHoverModulo").val() === "" || $("#colorHoverModulo").val() === undefined) {
            $("#colorHoverModulo").addClass("input-valid-error");
            text += "<li>Color hover</li>";
        }else{
        	$("#colorHoverModulo").removeClass("input-valid-error");
        }
        
        if ($("#iconoModulo").val() === null  || $("#iconoModulo").val() === "" || $("#iconoModulo").val() === undefined) {
            $("#iconoModulo").addClass("input-valid-error");
            text += "<li>Ícono</li>";
        }else{
        	$("#iconoModulo").removeClass("input-valid-error");
        }

        if (text !== "") {
            let info = "Verifica los siguientes campos: " + text;
            mostrarMensajeInformativo(info);
            return false;
        } else {
            return true;
        }
    }
    
    $scope.cancelarRegistroModulo = function() {
    	$scope.limpiarDatosNuevoModulo();
	}
    
    $scope.limpiarDatosNuevoModulo = function() {
    	$(".title-vista-modulos").remove();
		$("#containerTituloVistaModulos").append("<h6 class='title-vista-modulos'><b>Consulta de módulos</b></h6>");
		$("#rowModuloNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	$scope.isNuevoModulo = false;
    	$("#nombreModulo").val("");
		$("#claveModulo").val("");
		$("#colorModulo").val("");
		$("#colorHoverModulo").val("");
		$("#iconoModulo").val("");
		$("#nombreModulo").removeClass("input-valid-error");
		$("#claveModulo").removeClass("input-valid-error");
		$("#colorModulo").removeClass("input-valid-error");
		$("#colorHoverModulo").removeClass("input-valid-error");
		$("#iconoModulo").removeClass("input-valid-error");
		$("#buscadorTablaModulos").prop("disabled",false);
		$("#buscadorTablaModulos").removeClass("inputsBloqueados");
		$("#moduloPropietario").prop("disabled",false);
    	$("#moduloPropietario").removeClass("inputsBloqueados");
    	$("#moduloUnidadNegocio").prop("disabled",false);
    	$("#moduloUnidadNegocio").removeClass("inputsBloqueados");
    	$("#btn-consultar-modulos").removeClass("btnsBloqueados");
    	$(".btnEditarModulo").removeClass("btnsBloqueados");
    	$(".btnDetalleModulo").removeClass("btnsBloqueados");
    	$(".btnEliminarModulo").removeClass("btnsBloqueados");
    	$("#btnNuevoModulo").removeClass("btnsBloqueados");
    	$(".rowConsultaModuloTxt").removeClass("rowsTablaModulosBloqueados");
    	$(".encabezadosTablaModulos").removeClass("encabezadosTablas");
	}
    
    $scope.abrirEditarModulo = function(id) {
    	if($scope.isNuevoModulo || $scope.isEditModulo){
    		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
    		if($scope.isNuevoModulo){
    			$("#rowModuloNuevo").addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowModuloNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    		if($scope.isEditModulo && $scope.idModuloEdit != null){
    			$("#rowModuloConsulta"+$scope.idModuloEdit).addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowModuloConsulta"+$scope.idModuloEdit).removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    	}else{
    		$(".title-vista-modulos").remove();
    		$("#containerTituloVistaModulos").append("<h6 class='title-vista-modulos'>Módulos > <b>Modificación</b></h6>");
	    	$scope.isEditModulo = true;
	    	$scope.procesoEnEjecucion = "modificación";
	    	$scope.idModuloEdit = id;
	    	$("#buscadorTablaModulos").prop("disabled",true);
	    	$("#buscadorTablaModulos").addClass("inputsBloqueados");
	    	$("#moduloPropietario").prop("disabled",true);
	    	$("#moduloPropietario").addClass("inputsBloqueados");
	    	$("#moduloUnidadNegocio").prop("disabled",true);
	    	$("#moduloUnidadNegocio").addClass("inputsBloqueados");
	    	$("#btn-consultar-modulos").addClass("btnsBloqueados");
	    	$(".btnEditarModulo").addClass("btnsBloqueados");
	    	$(".btnDetalleModulo").addClass("btnsBloqueados");
	    	$(".btnEliminarModulo").addClass("btnsBloqueados");
	    	$("#btnNuevoModulo").addClass("btnsBloqueados");
	    	$(".rowConsultaModuloTxt").addClass("rowsTablaModulosBloqueados");
			$(".rowConsultaModulo"+id).hide();
			$(".rowEditModulo"+id).show();
			$(".encabezadosTablaModulos").addClass("encabezadosTablas");
			
			$(".valInputFormulario").keyup(function() {
				var input = $(this).attr("id");
				if( $(this).val()  === "" || $(this).val() === undefined ){
					$("#"+input).addClass("input-valid-error");
				}else{
					$("#"+input).removeClass("input-valid-error");
				}
			});
			
    	}
	}
    
    $scope.modificarModulo = function(id) {
    	if ($scope.validateFormEdit(id)) {
    		swal({
		        title: "Se actualizará la información del módulo",
		        text: "\u00BFDesea editar la información del módulo?",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: '#007bff',
		        confirmButtonText: 'Si',
		        cancelButtonText: 'Cancelar'
		      }).then(function (isConfirm) {
		        if (isConfirm) {
		        	let params = {
		    				"id":id,
		    				"nombre":$("#nombreModuloEdit"+id).val(),
		    				"clave":$("#claveModuloEdit"+id).val(),
		    				"color":$("#colorModuloEdit"+id).val(),
		    				"colorHover":$("#colorHoverModuloEdit"+id).val(),
		    				"icono":$("#iconoModuloEdit"+id).val(),
		    				"idPadre":null,
		    				"nivel":"1"
		    		};
		    		
		            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		            swal.showLoading();
//		            gestionModulosService.modificarModulo(params).then(function success(response) {
		                swal.close();
//		                if (response.data !== undefined) {
//		                    if (response.data.respuesta) {
//		                        if (response.data.result) {
		                			var moduloSeleccionadoEdit = $scope.listaModulos.find((e) => e.id == id);
		                			moduloSeleccionadoEdit.nombre = $("#nombreModuloEdit"+id).val();
		                			moduloSeleccionadoEdit.clave = $("#claveModuloEdit"+id).val();
		                			moduloSeleccionadoEdit.color = $("#colorModuloEdit"+id).val();
		                			moduloSeleccionadoEdit.colorHover = $("#colorHoverModuloEdit"+id).val();
		                			moduloSeleccionadoEdit.icono = $("#iconoModuloEdit"+id).val();
		                			$scope.limpiarDatosEditModulo(id);
		                			mostrarMensajeExitoAlert("Modificación realizada con éxito.");
		                			$scope.$apply();
//		                        } else {
//		                            toastr.info('No se encontraron permisos');
//		                        }
//		                    } else {
//		                        toastr.warning(response.data.resultDescripcion);
//		                    }
//		                } else {
//		                    toastr.error('Ha ocurrido un error en la consulta de permisos');
//		                }
//		            });
		        }
		      }).catch(err => {

		      });
        }
	}
    
    $scope.validateFormEdit = function (id) {
        let text = "";
        if ($("#nombreModuloEdit"+id).val() === null  || $("#nombreModuloEdit"+id).val() === "" || $("#nombreModuloEdit"+id).val() === undefined) {
            $("#nombreModuloEdit"+id).addClass("input-valid-error");
            text += "<li>Nombre</li>";
        }else{
        	$("#nombreModuloEdit"+id).removeClass("input-valid-error");
        }
        
        if ($("#claveModuloEdit"+id).val() === null  || $("#claveModuloEdit"+id).val() === "" || $("#claveModuloEdit"+id).val() === undefined) {
            $("#claveModuloEdit"+id).addClass("input-valid-error");
            text += "<li>Clave</li>";
        }else{
        	$("#claveModuloEdit"+id).removeClass("input-valid-error");
        }
        
        if ($("#colorModuloEdit"+id).val() === null  || $("#colorModuloEdit"+id).val() === "" || $("#colorModuloEdit"+id).val() === undefined) {
            $("#colorModuloEdit"+id).addClass("input-valid-error");
            text += "<li>Color</li>";
        }else{
        	$("#colorModuloEdit"+id).removeClass("input-valid-error");
        }
        
        if ($("#colorHoverModuloEdit"+id).val() === null  || $("#colorHoverModuloEdit"+id).val() === "" || $("#colorHoverModuloEdit"+id).val() === undefined) {
            $("#colorHoverModuloEdit"+id).addClass("input-valid-error");
            text += "<li>Color hover</li>";
        }else{
        	$("#colorHoverModuloEdit"+id).removeClass("input-valid-error");
        }
        
        if ($("#iconoModuloEdit"+id).val() === null  || $("#iconoModuloEdit"+id).val() === "" || $("#iconoModuloEdit"+id).val() === undefined) {
            $("#iconoModuloEdit"+id).addClass("input-valid-error");
            text += "<li>Ícono</li>";
        }else{
        	$("#iconoModuloEdit"+id).removeClass("input-valid-error");
        }

        if (text !== "") {
            let info = "Verifica los siguientes campos: " + text;
            mostrarMensajeInformativo(info);
            return false;
        } else {
            return true;
        }
    }
    
    $scope.cancelarEditModulo = function(id) {
    	var moduloSeleccionado = $scope.listaModulos.find((e) => e.id == id);
    	
    	$("#nombreModuloEdit"+id).val(moduloSeleccionado.nombre);
		$("#claveModuloEdit"+id).val(moduloSeleccionado.clave);
		$("#colorModuloEdit"+id).val(moduloSeleccionado.color);
		$("#colorHoverModuloEdit"+id).val(moduloSeleccionado.colorHover);
		$("#iconoModuloEdit"+id).val(moduloSeleccionado.icono);
		
		$scope.limpiarDatosEditModulo(id);
	}
    
    $scope.limpiarDatosEditModulo = function(id) {
    	$("#rowModuloConsulta"+$scope.idModuloEdit).removeClass("bordeRowProcesoEnEjecucion");
    	$scope.idModuloEdit = null;
    	$(".title-vista-modulos").remove();
		$("#containerTituloVistaModulos").append("<h6 class='title-vista-modulos'><b>Consulta de módulos</b></h6>");
    	$scope.isEditModulo = false;
		$("#nombreModuloEdit"+id).removeClass("input-valid-error");
		$("#claveModuloEdit"+id).removeClass("input-valid-error");
		$("#colorModuloEdit"+id).removeClass("input-valid-error");
		$("#colorHoverModuloEdit"+id).removeClass("input-valid-error");
		$("#iconoModuloEdit"+id).removeClass("input-valid-error");
		$("#buscadorTablaModulos").prop("disabled",false);
		$("#buscadorTablaModulos").removeClass("inputsBloqueados");
		$("#moduloPropietario").prop("disabled",false);
    	$("#moduloPropietario").removeClass("inputsBloqueados");
    	$("#moduloUnidadNegocio").prop("disabled",false);
    	$("#moduloUnidadNegocio").removeClass("inputsBloqueados");
    	$("#btn-consultar-modulos").removeClass("btnsBloqueados");
		$(".btnEditarModulo").removeClass("btnsBloqueados");
    	$(".btnDetalleModulo").removeClass("btnsBloqueados");
    	$(".btnEliminarModulo").removeClass("btnsBloqueados");
    	$("#btnNuevoModulo").removeClass("btnsBloqueados");
    	$(".rowConsultaModuloTxt").removeClass("rowsTablaModulosBloqueados");
		$(".rowConsultaModulo"+id).show();
		$(".rowEditModulo"+id).hide();
		$(".encabezadosTablaModulos").removeClass("encabezadosTablas");
    }
    
    $scope.eliminarModulo = function(id) {
    	if($scope.isNuevoModulo || $scope.isEditModulo){
    		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
    		if($scope.isNuevoModulo){
    			$("#rowModuloNuevo").addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowModuloNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    		if($scope.isEditModulo && $scope.idModuloEdit != null){
    			$("#rowModuloConsulta"+$scope.idModuloEdit).addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowModuloConsulta"+$scope.idModuloEdit).removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    	}else{
    		swal({
		        title: "Se dará de baja el módulo",
		        text: "\u00BFDesea eliminar el módulo?",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: '#007bff',
		        confirmButtonText: 'Si',
		        cancelButtonText: 'Cancelar'
		      }).then(function (isConfirm) {
		        if (isConfirm) {
		        	let params = {
		    				"id":id
		    		};
		            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		            swal.showLoading();
//		            gestionModulosService.eliminarModulo(params).then(function success(response) {
		                swal.close();
//		                if (response.data !== undefined) {
//		                    if (response.data.respuesta) {
//		                        if (response.data.result) {
		                			$scope.listaModulos = $scope.listaModulos.filter(e => {return e.id != id});
		                			$scope.exisModulos = $scope.listaModulos.length > 0 ? true : false;
		                			mostrarMensajeExitoAlert("Módulo eliminado con éxito.");
		                			$scope.$apply();
//		                        } else {
//		                            toastr.info('No se encontraron permisos');
//		                        }
//		                    } else {
//		                        toastr.warning(response.data.resultDescripcion);
//		                    }
//		                } else {
//		                    toastr.error('Ha ocurrido un error en la consulta de permisos');
//		                }
//		            });
		        }
		      }).catch(err => {

		      });
    	}
	}
    
    $("#moduloPropietario").change(function() {
    	$("#moduloPropietario").removeClass("input-valid-error");
    });
    
    $("#moduloUnidadNegocio").change(function() {
    	$("#moduloUnidadNegocio").removeClass("input-valid-error");
    });
    
    $(".valInputFormulario").keyup(function() {
		var input = $(this).attr("id");
		if( $(this).val()  === "" || $(this).val() === undefined ){
			$("#"+input).addClass("input-valid-error");
		}else{
			$("#"+input).removeClass("input-valid-error");
		}
	});
    
    //GESTIÓN ACCIONES DE PERMISOS
    
    $scope.changeVistaModulos = function (){
    	if($scope.isNuevoPermiso || $scope.isEditPermiso){
    		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
    		if($scope.isNuevoPermiso){
    			$("#rowPermisoNuevo").addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowPermisoNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    		if($scope.isEditPermiso && $scope.idPermisoEdit != null){
    			$("#rowPermisoConsulta"+$scope.idPermisoEdit).addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowPermisoConsulta"+$scope.idPermisoEdit).removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    	}else{
    		$("#buscadorTablaPermisos").val("");
    		$scope.buscarPermiso = "";
    		$scope.isModulo = true;
    	}
    }
    
    $scope.abrirFormNuevoPermiso = function () {
    	
    	if(!$scope.exisPermisosModulo){
    		$scope.exisPermisosModulo = true;
    	}
    	
    	if($scope.isNuevoPermiso || $scope.isEditPermiso){
    		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
    		if($scope.isNuevoPermiso){
    			$("#rowPermisoNuevo").addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowPermisoNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    		if($scope.isEditPermiso && $scope.idPermisoEdit != null){
    			$("#rowPermisoConsulta"+$scope.idPermisoEdit).addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowPermisoConsulta"+$scope.idPermisoEdit).removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    	}else{
    		$(".title-vista-permisos").remove();
    		$("#containerTituloVistaPermisos").append("<h6 class='title-vista-permisos'>Módulo " + $scope.moduloSeleccionado.nombre + " > Permisos > <b>Registro</b></h6>");
    		
	    	$scope.isNuevoPermiso = true;
	    	$scope.procesoEnEjecucion = "registro";
	    	$("#buscadorTablaPermisos").prop("disabled",true);
	    	$("#buscadorTablaPermisos").addClass("inputsBloqueados");
	    	$("#btnRegresarVistaModulos").addClass("btnsBloqueados");
	    	$("#btnNuevoPermiso").addClass("btnsBloqueados");
	    	
	    	$(".btnEditarPermiso").addClass("btnsBloqueados");
	    	$(".btnEliminarPermiso").addClass("btnsBloqueados");
	    	$(".rowConsultaPermisoTxt").addClass("rowsTablaModulosBloqueados");
	    	
	    	$(".encabezadosTablaPermisos").addClass("encabezadosTablas");
    	}
    }
    
    $scope.guardarNuevoPermiso = function() {
    	if ($scope.validateFormRegistroPermiso()) {
    		
    		swal({
		        title: "Se guardará un nuevo permiso",
		        text: "\u00BFDesea registrar el permiso al módulo "+ $scope.moduloSeleccionado.nombre + "?",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: '#007bff',
		        confirmButtonText: 'Si',
		        cancelButtonText: 'Cancelar'
		      }).then(function (isConfirm) {
		        if (isConfirm) {
		        	let params = {
		    				"id":$scope.contadorIdPermisos,
		    				"nombre":$("#nombrePermiso").val(),
		    				"clave":$("#clavePermiso").val(),
		    				"color":$("#colorPermiso").val(),
		    				"colorHover":$("#colorHoverPermiso").val(),
		    				"icono":$("#iconoPermiso").val(),
		    				"idPadre":$scope.moduloSeleccionado.id,
		    				"nivel":"2"
		    		};
		    		
		        	$scope.contadorIdPermisos = ($scope.contadorIdPermisos + 1);
		    		
		            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		            swal.showLoading();
//		            gestionModulosService.guardarNuevoModulo(params).then(function success(response) {
		                swal.close();
//		                if (response.data !== undefined) {
//		                    if (response.data.respuesta) {
//		                        if (response.data.result) {
		                            
		                			$scope.listaPermisosModulo.push(params);
		                			$scope.limpiarDatosNuevoPermiso();
		                			mostrarMensajeExitoAlert("Registro guardado con éxito.");
		                			$scope.$apply();
		                			
//		                        } else {
//		                            toastr.info('No se encontraron permisos');
//		                        }
//		                    } else {
//		                        toastr.warning(response.data.resultDescripcion);
//		                    }
//		                } else {
//		                    toastr.error('Ha ocurrido un error en la consulta de permisos');
//		                }
//		            });
		        }
		      }).catch(err => {

		      });
        }
	}
    
    $scope.validateFormRegistroPermiso = function () {
        let text = "";
        if ($("#nombrePermiso").val() === null  || $("#nombrePermiso").val() === "" || $("#nombrePermiso").val() === undefined) {
            $("#nombrePermiso").addClass("input-valid-error");
            text += "<li>Nombre</li>";
        }else{
        	$("#nombrePermiso").removeClass("input-valid-error");
        }
        
        if ($("#clavePermiso").val() === null  || $("#clavePermiso").val() === "" || $("#clavePermiso").val() === undefined) {
            $("#clavePermiso").addClass("input-valid-error");
            text += "<li>Clave</li>";
        }else{
        	$("#clavePermiso").removeClass("input-valid-error");
        }
        
        if ($("#colorPermiso").val() === null  || $("#colorPermiso").val() === "" || $("#colorPermiso").val() === undefined) {
            $("#colorPermiso").addClass("input-valid-error");
            text += "<li>Color</li>";
        }else{
        	$("#colorPermiso").removeClass("input-valid-error");
        }
        
        if ($("#colorHoverPermiso").val() === null  || $("#colorHoverPermiso").val() === "" || $("#colorHoverPermiso").val() === undefined) {
            $("#colorHoverPermiso").addClass("input-valid-error");
            text += "<li>Color hover</li>";
        }else{
        	$("#colorHoverPermiso").removeClass("input-valid-error");
        }
        
        if ($("#iconoPermiso").val() === null  || $("#iconoPermiso").val() === "" || $("#iconoPermiso").val() === undefined) {
            $("#iconoPermiso").addClass("input-valid-error");
            text += "<li>Ícono</li>";
        }else{
        	$("#iconoPermiso").removeClass("input-valid-error");
        }

        if (text !== "") {
            let info = "Verifica los siguientes campos: " + text;
            mostrarMensajeInformativo(info);
            return false;
        } else {
            return true;
        }
    }
    
    $scope.cancelarRegistroPermiso = function() {
    	$scope.limpiarDatosNuevoPermiso();
    	$scope.exisPermisosModulo = $scope.listaPermisosModulo.length > 0 ? true : false;
	}
    
    $scope.limpiarDatosNuevoPermiso = function() {
    	
    	$(".title-vista-permisos").remove();
    	$("#containerTituloVistaPermisos").append("<h6 class='title-vista-permisos'>Módulo " + $scope.moduloSeleccionado.nombre + " > <b>Permisos</b></h6>");
    	$("#rowPermisoNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	
    	$scope.isNuevoPermiso = false;
    	$("#nombrePermiso").val("");
		$("#clavePermiso").val("");
		$("#colorPermiso").val("");
		$("#colorHoverPermiso").val("");
		$("#iconoPermiso").val("");
		
		$("#nombrePermiso").removeClass("input-valid-error");
		$("#clavePermiso").removeClass("input-valid-error");
		$("#colorPermiso").removeClass("input-valid-error");
		$("#colorHoverPermiso").removeClass("input-valid-error");
		$("#iconoPermiso").removeClass("input-valid-error");
		
		$("#buscadorTablaPermisos").prop("disabled",false);
		$("#buscadorTablaPermisos").removeClass("inputsBloqueados");
		$("#btnRegresarVistaModulos").removeClass("btnsBloqueados");
    	$("#btnNuevoPermiso").removeClass("btnsBloqueados");

    	$(".btnEditarPermiso").removeClass("btnsBloqueados");
    	$(".btnEliminarPermiso").removeClass("btnsBloqueados");
    	$(".rowConsultaPermisoTxt").removeClass("rowsTablaModulosBloqueados");
    	$(".encabezadosTablaPermisos").removeClass("encabezadosTablas");
	}
    
    $scope.abrirEditarPermiso = function(id) {
    	if($scope.isNuevoPermiso || $scope.isEditPermiso){
    		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
    		if($scope.isNuevoPermiso){
    			$("#rowPermisoNuevo").addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowPermisoNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    		if($scope.isEditPermiso && $scope.idPermisoEdit != null){
    			$("#rowPermisoConsulta"+$scope.idPermisoEdit).addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowPermisoConsulta"+$scope.idPermisoEdit).removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    	}else{
    		$(".title-vista-permisos").remove();
    		$("#containerTituloVistaPermisos").append("<h6 class='title-vista-permisos'>Módulo " + $scope.moduloSeleccionado.nombre + " > Permisos > <b>Modificación</b></h6>");
    		
	    	$scope.isEditPermiso = true;
	    	$scope.procesoEnEjecucion = "modificación";
	    	$scope.idPermisoEdit = id;
	    	$("#buscadorTablaPermisos").prop("disabled",true);
	    	$("#buscadorTablaPermisos").addClass("inputsBloqueados");
	    	$("#btnRegresarVistaModulos").addClass("btnsBloqueados");
	    	$("#btnNuevoPermiso").addClass("btnsBloqueados");
	    	$(".btnEditarPermiso").addClass("btnsBloqueados");
	    	$(".btnEliminarPermiso").addClass("btnsBloqueados");
	    	$(".rowConsultaPermisoTxt").addClass("rowsTablaModulosBloqueados");
			$(".rowConsultaPermiso"+id).hide();
			$(".rowEditPermiso"+id).show();
			$(".encabezadosTablaPermisos").addClass("encabezadosTablas");
			$(".valInputFormulario").keyup(function() {
				var input = $(this).attr("id");
				if( $(this).val()  === "" || $(this).val() === undefined ){
					$("#"+input).addClass("input-valid-error");
				}else{
					$("#"+input).removeClass("input-valid-error");
				}
			});
    	}
	}
    
    $scope.cancelarEditPermiso = function(id) {
    	var permisoSeleccionado = $scope.listaPermisosModulo.find((e) => e.id == id);
    	$("#nombrePermisoEdit"+id).val(permisoSeleccionado.nombre);
		$("#clavePermisoEdit"+id).val(permisoSeleccionado.clave);
		$("#colorPermisoEdit"+id).val(permisoSeleccionado.color);
		$("#colorHoverPermisoEdit"+id).val(permisoSeleccionado.colorHover);
		$("#iconoPermisoEdit"+id).val(permisoSeleccionado.icono);
		$scope.limpiarDatosEditPermiso(id);
	}
    
    $scope.limpiarDatosEditPermiso = function(id) {
    	$("#rowPermisoConsulta"+$scope.idPermisoEdit).removeClass("bordeRowProcesoEnEjecucion");
    	$scope.idPermisoEdit = null;
    	$(".title-vista-permisos").remove();
    	$("#containerTituloVistaPermisos").append("<h6 class='title-vista-permisos'>Módulo " + $scope.moduloSeleccionado.nombre + " > <b>Permisos</b></h6>");
    	
    	$scope.isEditPermiso = false;
    	
		$("#nombrePermisoEdit"+id).removeClass("input-valid-error");
		$("#clavePermisoEdit"+id).removeClass("input-valid-error");
		$("#colorPermisoEdit"+id).removeClass("input-valid-error");
		$("#colorHoverPermisoEdit"+id).removeClass("input-valid-error");
		$("#iconoPermisoEdit"+id).removeClass("input-valid-error");
		$("#buscadorTablaPermisos").prop("disabled",false);
		$("#buscadorTablaPermisos").removeClass("inputsBloqueados");
		$("#btnRegresarVistaModulos").removeClass("btnsBloqueados");
    	$("#btnNuevoPermiso").removeClass("btnsBloqueados");
		$(".btnEditarPermiso").removeClass("btnsBloqueados");
    	$(".btnEliminarPermiso").removeClass("btnsBloqueados");
    	$(".rowConsultaPermisoTxt").removeClass("rowsTablaModulosBloqueados");
		$(".rowConsultaPermiso"+id).show();
		$(".rowEditPermiso"+id).hide();
		$(".encabezadosTablaPermisos").removeClass("encabezadosTablas");
    }
    
    $scope.eliminarPermiso = function(id) {
    	if($scope.isNuevoPermiso || $scope.isEditPermiso){
    		mostrarMensajeInformativo("Tienes un proceso de " + $scope.procesoEnEjecucion +" pendiente.");
    		if($scope.isNuevoPermiso){
    			$("#rowPermisoNuevo").addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowPermisoNuevo").removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    		if($scope.isEditPermiso && $scope.idPermisoEdit != null){
    			$("#rowPermisoConsulta"+$scope.idPermisoEdit).addClass("bordeRowProcesoEnEjecucion");
    			setTimeout(function () {
    				$("#rowPermisoConsulta"+$scope.idPermisoEdit).removeClass("bordeRowProcesoEnEjecucion");
    	        }, 2000);
    		}
    	}else{
    		swal({
		        title: "Se dará de baja el permiso",
		        text: "\u00BFDesea eliminar el permiso?",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: '#007bff',
		        confirmButtonText: 'Si',
		        cancelButtonText: 'Cancelar'
		      }).then(function (isConfirm) {
		        if (isConfirm) {
		        	let params = {
		    				"id":id
		    		};
		            swal({ text: 'Espera un momento...', allowOutsideClick: false });
		            swal.showLoading();
//		            gestionModulosService.eliminarModulo(params).then(function success(response) {
		                swal.close();
//		                if (response.data !== undefined) {
//		                    if (response.data.respuesta) {
//		                        if (response.data.result) {
		                			$scope.listaPermisosModulo = $scope.listaPermisosModulo.filter(e => {return e.id != id});
		                			$scope.exisPermisosModulo = $scope.listaPermisosModulo.length > 0 ? true : false;
		                			mostrarMensajeExitoAlert("Permiso eliminado con éxito.");
		                			$scope.$apply();
//		                        } else {
//		                            toastr.info('No se encontraron permisos');
//		                        }
//		                    } else {
//		                        toastr.warning(response.data.resultDescripcion);
//		                    }
//		                } else {
//		                    toastr.error('Ha ocurrido un error en la consulta de permisos');
//		                }
//		            });
		        }
		      }).catch(err => {

		      });
    	}
	}

    $scope.getInformation();
    
}]);

