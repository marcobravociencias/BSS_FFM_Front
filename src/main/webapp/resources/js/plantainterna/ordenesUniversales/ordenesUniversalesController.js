var app = angular.module('ordenesUniversalesApp', []);

app.controller('ordenesUniversalesController', ['$scope', 'ordenesUniversalesService', 'genericService', function ($scope, ordenesUniversalesService, genericService) {

    app.calendarController($scope, ordenesUniversalesService);
    app.mapController($scope, ordenesUniversalesService);

    $scope.respaldoCatalogo = [];
    $scope.listaIntervencion = [];
    $scope.listaSubIntervencion = [];
    $scope.listaCanalVenta = [];
    $scope.listaPaquete = [];

    $scope.infoBasica = {};
    $scope.informacionCliente = {};

    $scope.consultarCatalogoOrdenesUniversales = function() {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        ordenesUniversalesService.consultarCatalogoOrdenesUniversales(JSON.stringify($scope.params)).then(function success(response) {
            response.data = catalogo;
            console.log(response.data)
            if (response.data.success) {
                if (response.data.result) {
                    $scope.respaldoCatalogo = angular.copy(response.data.result.InfoIntervenciones);
                    $scope.listaIntervencion = response.data.result.InfoIntervenciones.filter(e => e.Nivel === "0");
                    $scope.listaCanalVenta = angular.copy(response.data.result.Info_Canal_Venta);
                    $scope.listaPaquete = angular.copy(response.data.result.Info_Paquete);
                    console.log($scope.listaIntervencion);
                    swal.close();
                } else {
                    mostrarMensajeErrorAlert(response.data.result.mensaje)
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                swal.close();
            }
        }).catch(err => handleError(err));
    }

    $scope.filtrarSubIntervencion = function(intervencion) {
        console.log(intervencion);
        $scope.listaSubIntervencion = $scope.respaldoCatalogo.filter(e => e.Id_padre === intervencion.Id_interv);
    }

    $scope.validarFolio = function() {
        if($.trim(  $scope.infoBasica.folio)  !== ''){
			let validacionCaracteres=$.trim( $scope.infoBasica.folio ).substr(0,2);
			let validacionCaracteresNuevo=$.trim( $scope.infoBasica.folio ).substr(0,2);
			if(validacionCaracteres ==='02'){			
				//consultarInfoCuenta($.trim( $("#cuenta-form").val()));
                $scope.consultarInformacionFolio();
			} else if(validacionCaracteresNuevo ==='1.'){
				//consultarInfoCuenta($.trim( $("#cuenta-form").val()));
                $scope.consultarInformacionFolio();					
			} else if(validacionCaracteresNuevo ==='6.'){			
				//consultarInfoCuenta($.trim( $("#cuenta-form").val()));
                $scope.consultarInformacionFolio();		
			} else {
				mostrarMensajeWarningValidacion('Formato de folio no valido')
			}
		} else {
			mostrarMensajeWarningValidacion('Folio requerido')
		}	
    }

    $scope.consultarInformacionFolio = function() {
        if ($scope.infoBasica.folio) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            $scope.params = {};
            ordenesUniversalesService.consultarCuentaAsignadaGenerica(JSON.stringify($scope.params)).then(function success(response) {
                response.data = infoCuenta;
                console.log(response.data)
                if (response.data.success) {
                    if (response.data.result) {
                        $scope.infocuenta = {};
                        $scope.infocuenta = response.data.result.Info_cuenta;
                        $scope.informacionCliente.nombre = $scope.infocuenta.Nombre_Cliente;
                        $scope.informacionCliente.nombreContacto = $scope.infocuenta.Nombre_Contacto;
                        $scope.informacionCliente.calle = $scope.infocuenta.Calle;
                        $scope.informacionCliente.numeroExt = $scope.infocuenta.No_Exterior;
                        $scope.informacionCliente.numeroInt = $scope.infocuenta.No_Interior;
                        $scope.informacionCliente.codigoPostal = $scope.infocuenta.Codigo_Postal;
                        $scope.informacionCliente.estado = $scope.infocuenta.Estado;
                        $scope.informacionCliente.municipio = $scope.infocuenta.Municipio;
                        $scope.informacionCliente.entreCalles = $scope.infocuenta.Entre_Calles;
                        $scope.informacionCliente.referencias = $scope.infocuenta.Referencias;
                        $scope.informacionCliente.telefono = $scope.infocuenta.Telefono;
                        $scope.informacionCliente.celular = $scope.infocuenta.Celular;
                        $scope.informacionCliente.ciudad = $scope.infocuenta.Ciudad;
                        $scope.informacionCliente.colonia = $scope.infocuenta.Colonia;

                        swal.close();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.mensaje)
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion)
                    swal.close();
                }
            }).catch(err => handleError(err));
        } else {

        }
    }

    $scope.elementTab = 1;
    $("#wizzard-1").addClass("current");
    $scope.mostrarTab = function(element) {
        $scope.elementTab = element;
        $("#wizzard-1").removeClass("current");
        $("#wizzard-2").removeClass("current");
        $("#wizzard-3").removeClass("current");
        $("#wizzard-4").removeClass("current");

        $("#wizzard-"+element).addClass("current");
    }

    $scope.consultaArbol = false;
    $scope.resultArbol = [];
    $scope.listaArbolCiudades = [];
    $scope.mostrarModalArbol = function() {
        
        if (!$scope.consultaArbol) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            $scope.params = {};
            ordenesUniversalesService.getcatsdispacherintegrador(JSON.stringify($scope.params)).then(function success(response) {
                response.data = infoArbol;
                console.log(response.data)
                // (response.data.success) {
                    if (response.data.result === "0") {
                        $scope.listaArbolCiudades = [];
                        $scope.resultArbol = response.data.info[0].General_Arbol.arbol;
                        angular.forEach($scope.resultArbol, function (element, index) {
                            $scope.consultaArbol = true;
                            $scope.listaArbolCiudades.push(
                                {
                                    id: element.ID,
                                    text: element.ID_Description,
                                    parent: ((element.ID_Padre=='nulo' || element.ID_Padre=='NULO' || element.ID_Padre=='' || element.ID_Padre=='null')?'#':element.ID_Padre),
                                    icon: 'fa fa-globe',
                                    nivel: element.Nivel,
                                    state:{
                                        opened:false
                                    }
                                }
                            );
                        });
                        $('#jstree-distrito').bind('loaded.jstree', function(e, data) {	
                            swal.close()  
                            $("#modal-filtro-arbol").modal('show');
                        }).jstree({ 
                            core : {
                                data :  $scope.listaArbolCiudades,
                                themes: {
                                      name: 'proton',
                                      responsive: true
                                },
                                animation: 100
                            },
                            plugins : [ ]
                        });
                        swal.close();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.mensaje)
                        swal.close();
                    }
                
            }).catch(err => handleError(err));
        } else {
            $("#modal-filtro-arbol").modal('show');
        }
    }

    $scope.borrarInformacionCliente = function() {
        $scope.informacionCliente = {};
    }

    $scope.consultarDisponibilidad = function(distrito) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        $scope.params.IdCiudad = distrito;
        $scope.params.IdIntervencion = $scope.infoBasica.intervencion.Id_interv;
        $scope.params.IdCompany = "2";
        ordenesUniversalesService.getDisponibilidadServicioRest(JSON.stringify($scope.params)).then(function success(response) {
            response.data = responseDisponibilidad;
            console.log(response.data)
            // (response.data.success) {
            if (response.data.success) {
                console.log(response.data.result);
                console.log();
                $scope.muestraDisponibilidadCalendar(response.data.result);
                swal.close();
            } else {
                mostrarMensajeErrorAlert(response.data.result.mensaje)
                swal.close();
            }
            
        }).catch(err => handleError(err));
    }

    $scope.validarConsultaDisponibilidad = function() {
        var distrito_cluster = '-1';
            var selectedElms = $('#jstree-distrito').jstree("get_selected", true);
            var selected_arbol;
            
            $.each(selectedElms,function(index,elem){
                selected_arbol=elem.original;
            });
            if(selected_arbol!== undefined){
                if(/*session_propietario==='16'*/false){
                    if(selected_arbol !== undefined && selected_arbol.nivel==='5'  ){
                        distrito_cluster=selected_arbol.id;
                    }
                }else{
                    if(selected_arbol !== undefined && selected_arbol.nivel==='3'  ){
                        distrito_cluster=selected_arbol.id;
                    }
                }
            }
            if(  distrito_cluster  === '-1' || $scope.infoBasica.intervencion === undefined ) {
                console.log(distrito_cluster);
                arregloDisponibilidad = [];
                $scope.inicialCalendario();
                $("#distrito-form").val('');
                $("#distrito-form").attr('parentdistritotext','')
                $("#distrito-form").attr('distritotext','')
                $("#distrito-form").attr('iddistrito','')
    
                $("#turno-form").val('')
                $("#turno-form").attr('turno-info','')
                $("#turno-form").attr('fecha-info', '')
            }else{
                var textParent=$('#jstree-distrito').jstree(true).get_node( selected_arbol.parent ).text 
                $("#distrito-form").val(textParent+" / "+selected_arbol.text);
                $scope.infoBasica.distrito = textParent+" / "+selected_arbol.text
                
                /*
                $("#distrito-form").attr('parentdistritotext',textParent)
                $("#distrito-form").attr('distritotext',selected_arbol.text)
                $("#distrito-form").attr('iddistrito',distrito_cluster)
                */
                console.log(distrito_cluster);
                $scope.consultarDisponibilidad(distrito_cluster)	
            }
            if(  distrito_cluster  !== '-1'){
                var textParent=$('#jstree-distrito').jstree(true).get_node( selected_arbol.parent ).text 
                $("#distrito-form").val(textParent+" / "+selected_arbol.text);
                
                /*
                $("#distrito-form").attr('parentdistritotext',textParent)
                $("#distrito-form").attr('distritotext',selected_arbol.text)
                $("#distrito-form").attr('iddistrito',distrito_cluster)
                */
            }
    }

    $(document).ready(function(){
        $("#modal-filtro-arbol").on("hidden.bs.modal", function () {
            $scope.validarConsultaDisponibilidad();        
            $scope.$apply();
        });
    });
    
}]);