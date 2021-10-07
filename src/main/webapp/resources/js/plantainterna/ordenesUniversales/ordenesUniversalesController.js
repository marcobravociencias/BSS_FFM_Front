var app = angular.module('ordenesUniversalesApp', []);

app.controller('ordenesUniversalesController', ['$scope', '$q', 'ordenesUniversalesService', 'genericService', function ($scope, $q, ordenesUniversalesService, genericService) {

    app.calendarController($scope, ordenesUniversalesService);
    app.mapController($scope, ordenesUniversalesService);

    $scope.respaldoCatalogo = [];
    $scope.listaIntervencion = [];
    $scope.listaSubIntervencion = [];
    $scope.listaCanalVenta = [];
    $scope.listaPaquete = [];

    $scope.infoBasica = {};
    $scope.informacionCliente = {};
    $scope.nGeografia = "";
    $scope.nTipoOrdenes = "";
    $scope.guardarOrdenUniversal=function(){
        if($.trim(  $scope.infoBasica.folio )  !== ''){
            if(!$scope.validarFolio())
                return false            
        }
        if( $scope.validarPrimerPaso() ){
            $(".tab-step-wizar:first").trigger('click')
        } else if( $scope.validarSegundoPaso() ) { 
			$(".tab-step-wizar:eq(1)").trigger('click')
		}else  if( $scope.validarTercerPaso() ) { 
			$(".tab-step-wizar:eq(2)").trigger('click')
        }
    }
    
    $scope.busquedaGeografiaFiltro = function() {
    	$("#jstree-distrito").jstree("search", $('#searhArbolnput').val());
	}
    $scope.busquedaTipoOrdenesFiltro = function() {
    	$("#jstree-tipoordenes").jstree("search", $('#searhTipoOrdeneslnput').val());
	}    
    $scope.consultarCatalogoOrdenesUniversales = function() {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let params ={
            //moduloAccionesUsuario: 'moduloOrdenesUniversales'
            moduloAccionesUsuario: 'moduloDisponibilidad'
        }  
        $q.all([
            genericService.consultarConfiguracionDespachoDespacho(params),
            genericService.consultarCatalogoIntervenciones(),
            genericService.consulCatalogoGeografia()
        ]).then(function(results) { 
            console.log(results);

            // ****************** CONFIGURACIÓN
            if (results[0].data.respuesta) {
                if (results[0].data.result) {
                    $scope.nGeografia = results[0].data.result.N_FILTRO_GEOGRAFIA ? Number(results[0].data.result.N_FILTRO_GEOGRAFIA) : null;
                    $scope.nTipoOrdenes = results[0].data.result.N_FILTRO_INTERVENCIONES ? Number(results[0].data.result.N_FILTRO_INTERVENCIONES) : null;

                }
            }
            
            // ****************** INTERVENCIONES
            if (results[1].data.respuesta) {
                if (results[1].data.result) {
                    if ( $scope.nTipoOrdenes) {
                        $scope.resultTipoOrdenes = results[1].data.result.filter(e => { return e.nivel <= $scope.nTipoOrdenes });
                    } else {
                        $scope.resultTipoOrdenes = results[1].data.result;
                    }
                    angular.forEach($scope.resultTipoOrdenes, function (element, index) {
                        $scope.listadoTipoOrdenes.push(
                            {
                                id: element.id,
                                text: element.nombre,
                                parent: element.idPadre ==undefined ? "#" : element.idPadre,
                                icon: 'fa fa-globe',
                                nivel: element.nivel,
                                state:{
                                    opened:false
                                }
                            }
                        );
                    });
                    $('#jstree-tipoordenes').bind('loaded.jstree', function(e, data) {	
                        swal.close()  
                    }).jstree({ 
                        plugins: ["wholerow", 'search'],
                        core : {
                            data :  $scope.listadoTipoOrdenes,
                            themes: {
                                name: 'proton',
                                responsive: true,
                                "icons":false  
                            },
                            animation: 100
                        }
                    });

                } else {
                    mostrarMensajeErrorAlert(response.data.result.mensaje)
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                swal.close();
            }

            // ****************** ARBOL
            if (results[2].data.respuesta) {
                if (results[2].data.result) {
                    $scope.listaArbolCiudades = [];
                    if ( $scope.nGeografia) {
                        $scope.resultArbol = results[2].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });
                    } else {
                        $scope.resultArbol = results[2].data.result.geografia;
                    }
                    
                    angular.forEach($scope.resultArbol, function (element, index) {
                        $scope.consultaArbol = true;
                        $scope.listaArbolCiudades.push(
                            {
                                id: element.id,
                                text: element.nombre,
                                parent: element.padre ==undefined ? "#" : element.padre,
                                icon: 'fa fa-globe',
                                nivel: element.nivel,
                                state:{
                                    opened:false
                                }
                            }
                        );
                    });
                    $('#jstree-distrito').bind('loaded.jstree', function(e, data) {	
                        swal.close()  
                    }).jstree({ 
                        plugins: ["wholerow", 'search'],
                        core : {
                            data :  $scope.listaArbolCiudades,
                            themes: {
                                name: 'proton',
                                responsive: true,
                                "icons":false  
                            },
                            animation: 100
                        }
                    });
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
        if(intervencion ==undefined){
            $scope.listaSubIntervencion=[]
        }else{
            $scope.listaSubIntervencion = $scope.respaldoCatalogo.filter(e => e.idPadre === intervencion.id);
        }
    }

    $scope.validarFolio = function() {
        
        let validacionCaracteres=$.trim( $scope.infoBasica.folio ).substr(0,2);
        let validacionCaracteresNuevo=$.trim( $scope.infoBasica.folio ).substr(0,2);
        if(validacionCaracteres ==='02'){	
            return true		
        } else if(validacionCaracteresNuevo ==='1.'){
            return true
        } else if(validacionCaracteresNuevo ==='6.'){
            return true			                	
        } else {
            mostrarMensajeWarningValidacion('Formato de folio no valido')
            return false
        }
		
    }
    

    $scope.consultarInformacionFolio = function() {
        if($.trim(  $scope.infoBasica.folio )  !== ''){
            if ($scope.validarFolio()) {
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
            }
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
    $scope.resultTipoOrdenes = [];

    $scope.listadoTipoOrdenes=[]
    $scope.listaArbolCiudades = [];
    $scope.mostrarModalArbol = function() {        
        $("#modal-filtro-arbol").modal('show');
    }
    $scope.mostrarModalSubtipoOrdenes = function() {
        $("#modal-filtro-tipoordenes").modal('show')
    }

    $scope.borrarInformacionCliente = function() {
        $scope.informacionCliente = {};
    }

    $scope.consultarDisponibilidad = function(distrito) {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        $scope.params.geografia2  = distrito;
        $scope.params.subtipoIntervencion = $scope.infoBasica.subIntervencion.id;
        //$scope.params.IdCompany = "2";
        ordenesUniversalesService.getDisponibilidadServicioRest(JSON.stringify($scope.params)).then(function success(response) {
            //response.data = responseDisponibilidad;
            console.log(response.data)
            // (response.data.success) {
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.muestraDisponibilidadCalendar(response.data.result);
                } else {
                    $scope.muestraDisponibilidadCalendar([]);
                }
                
                swal.close();
            } else {
                mostrarMensajeErrorAlert(response.data.result.mensaje)
                swal.close();
            }
            
        }).catch(err => handleError(err));
    }

    $scope.validarModalGeografia = function() { 

        let isErrorGeograf=true;

        let elementonivel = '-1';
        let selectedElms = $('#jstree-distrito').jstree("get_selected", true);
        let selected_arbol;
        angular.forEach(selectedElms,function(elem,index){
            selected_arbol=elem.original;
        });
        if(selected_arbol!== undefined){
            if(selected_arbol !== undefined && selected_arbol.nivel===$scope.nGeografia  ){
                elementonivel=selected_arbol.id;
            }          
        }
        if(  elementonivel  !== '-1'){
            let textParent=$('#jstree-distrito').jstree(true).get_node( selected_arbol.parent ).text 
            $scope.infoBasica.distrito=textParent+" / "+selected_arbol.text
            isErrorGeograf=false;
        }else{
            $scope.infoBasica.distrito=''
        }         
        if( !isErrorGeograf && $scope.infoBasica.subIntervencion  !== undefined){
            $scope.consultarDisponibilidad(elementonivel)	
        }

    }


    $scope.validarPrimerPaso=function(){
        let isErrorValidate=false;
        let textError='';
    
        if(  $scope.infoBasica.intervencion   == undefined){
            isErrorValidate=true
            textError+='Captura intervenci&oacute;n</br>';
        }
    
        if(  $scope.infoBasica.subIntervencion   == undefined){
            isErrorValidate=true;
            textError+='Selecciona subintervenci&oacute;n</br>';
        }
    
        if(  $scope.infoBasica.canalVenta  == undefined){
            isErrorValidate=true
            textError+='Selecciona canal de venta</br>';
        }
    
        if(   $scope.infoBasica.paquete   == undefined){
            isErrorValidate=true
            textError+='Selecciona un paquete</br>';
        }    
        let elementonivel = '-1';
        let selectedElms = $('#jstree-distrito').jstree("get_selected", true);
        let selected_arbol;
        angular.forEach(selectedElms,function(elem,index){
            selected_arbol=elem.original;
        });
        if(selected_arbol!== undefined){
            if(selected_arbol !== undefined && selected_arbol.nivel===$scope.nGeografia  ){
                elementonivel=selected_arbol.id;
            }          
        }
        if(  elementonivel  === '-1' ) {
            isErrorValidate=true
            textError+='Selecciona un elemento valido de la geografia</br>';         
        }
    
        if(  $scope.infoBasica.turno  == undefined){
            isErrorValidate=true
            textError+='Selecciona un turno del calendario';
        }
    
        if(isErrorValidate){
            mostrarMensajeWarningValidacion( textError )
        }
        return isErrorValidate;
    }
    $scope.validarSegundoPaso=function(){
        
        //02
        let isErrorValidate=false;
        let textError='';
        let regExpresionEspecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"´\\|<>\/?]/;

        if( !$scope.informacionCliente.nombreContacto ){
            isErrorValidate=true
            textError+='Captura el nombre del contacto</br>';
        }else if(regExpresionEspecialCharacters.test($scope.informacionCliente.nombreContacto   )){
            isErrorValidate=true
            textError+='Nombre contacto no valido</br>';
        }
            
        if( !$scope.informacionCliente.calle ){
            isErrorValidate=true
            textError+='Captura la calle</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.calle   )){
            isErrorValidate=true
            textError+='Calle no valido</br>';
        }
        
        if(!$scope.informacionCliente.numeroExt  ){
            isErrorValidate=true
            textError+='Captura el numero exterior</br>';
        }	else if(regExpresionEspecialCharacters.test($scope.informacionCliente.numeroExt )){
            isErrorValidate=true
            textError+='Numero exterior no valido</br>';
        }
        

        if(	!$scope.informacionCliente.ciudad ){
            isErrorValidate=true
            textError+='Captura ciudad</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.ciudad   )){
            isErrorValidate=true
            textError+='Ciudad no valido</br>';
        }
        
        if(	!$scope.informacionCliente.municipio ){
            isErrorValidate=true
            textError+='Captura municipio</br>';
        }else if(regExpresionEspecialCharacters.test(  $scope.informacionCliente.municipio   )){
            isErrorValidate=true
            textError+='Municipio no valido</br>';
        }
        
        if( !$scope.informacionCliente.estado ){
            isErrorValidate=true
            textError+='Captura estado</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.estado )){
            isErrorValidate=true
            textError+='Estado no valido</br>';
        }

        if(	!$scope.informacionCliente.colonia ){
            isErrorValidate=true
            textError+='Captura colonia</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.colonia  )){
            isErrorValidate=true
            textError+='Colonia no valido</br>';
        }

        if( !$scope.informacionCliente.entreCalles ){
            isErrorValidate=true
            textError+='Captura entre calle</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.entreCalles )){
            isErrorValidate=true
            textError+='Entre calle no valido</br>';
        }
        
        if(	!$scope.informacionCliente.referencias ){
            isErrorValidate=true
            textError+='Captura referencia</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.referencias )){
            isErrorValidate=true
            textError+='Referencias no valido</br>';
        }
        
        if(	!$scope.informacionCliente.codigoPostal ){
            isErrorValidate=true
            textError+='Captura c\u00F3digo postal</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.codigoPostal )){
            isErrorValidate=true
            textError+='C\u00F3digo no valido</br>';
        }

        if(	!$scope.informacionCliente.telefono ){
            isErrorValidate=true
            textError+='Captura n\u00famero telef\u00f3nico</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.telefono  )){
            isErrorValidate=true
            textError+='Telefono no valido</br>';
        }
        
        if(	!$scope.informacionCliente.celular ){
            isErrorValidate=true
            textError+='Captura n\u00famero de celular</br>';
        }else if(regExpresionEspecialCharacters.test( $scope.informacionCliente.celular )){
            isErrorValidate=true
            textError+='Celular no valido</br>';
        }
        

        if(isErrorValidate){
            mostrarMensajeWarningValidacion( textError )
        }
        return isErrorValidate;
    } 
    $scope.validarTercerPaso=function(){                
        let isValidateLatitudLongitud=$scope.validarLatitudLongitudMap();
        if( isValidateLatitudLongitud ){
            mostrarMensajeWarningValidacion( 'Selecciona la correcta ubicaci&oacute;n en el mapa</br>' )
        }
        return isValidateLatitudLongitud;
    }
    $scope.validarLatitudLongitudMap=function(){
        let isErrorValidate=false;
        if( !$scope.latitudSelectedMap ||  !$scope.longitudSelectedMap){
            isErrorValidate=true
        }else{
            if( !$scope.isLatitude( $scope.latitudSelectedMap ) || !$scope.isLongitude( $scope.longitudSelectedMap ) ){
                isErrorValidate=true
            } else if($scope.validateLatitudLongitudCaracteres( $scope.longitudSelectedMap ) || $scope.validateLatitudLongitudCaracteres( $scope.longitudSelectedMap ) ){
                isErrorValidate=true
            }else if( isNaN(  $scope.latitudSelectedMap ) || isNaN( $scope.longitudSelectedMap )){
                isErrorValidate=true
            }
        }   
        return isErrorValidate
    }

    $(document).ready(function(){
        $("#modal-filtro-arbol").on("hidden.bs.modal", function () {
            $scope.validarModalGeografia();        
            $scope.$apply();
        });
    });
    
}]);