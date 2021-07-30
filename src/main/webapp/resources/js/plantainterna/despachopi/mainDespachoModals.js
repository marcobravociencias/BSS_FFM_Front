app.modalDespachoPrincipal=function($scope,mainDespachoService,$q,genericService){
    $scope.listadoIconografia=undefined

    $scope.listadoEstatusTecnico=[]   
    $scope.elementEstatusTecnico={}; 
    $scope.listadoOtsTrabajadasModal=[]  
    $scope.vehiculoOperario={}  
    $scope.objectMateriales={}
    $scope.procesandoAsignacion=false
    $scope.isConfirmadoDesconfirmado=false;
    $scope.idotConfirmacionDesconfirmacion=0;
    $scope.comentarios = '';

    $scope.listadoCatalogoAcciones=[]
    $('#modalAsignacionOrdenTrabajo,#modalMaterialesOperario,#modalVehiculoOperario,#odalUbicacionOperario,#modalStatusOperario,#modalOtsTrabajadas')
        .on("hidden.bs.modal", function () {
       $("#buscar-otsasignadas").trigger('click')
    });

    $scope.banderaRegresarCheckbox=false
    $('#modalConfirmaDesconfirma').on('hidden.bs.modal', function (event) {
        if( !$scope.banderaRegresarCheckbox ){
            let isChecked=$scope.objConfirmaDesc.isConfirmadoDesconfirmado? false:true
            $("#switch-"+$scope.objConfirmaDesc.idOtConfirmaDesc).prop('checked',isChecked)
        }
       console.log("entra")
    })

    abrirModalConfirmacionDesconfirmacion=function(instanciaThis,idot){        
        $scope.banderaRegresarCheckbox=false;
        console.log($(instanciaThis).is(':checked'))
        $scope.objConfirmaDesc={
            isConfirmadoDesconfirmado:$(instanciaThis).is(':checked'),
            idOtConfirmaDesc:idot,
        }
        $scope.$apply()
        $("#modalConfirmaDesconfirma").modal('show')
    }

    abrirModalDetalleOtPendiente=function(idotpendiente){
        $scope.requestModalInformacion(idotpendiente)
    }
    abrirModalInformacion=function(idotasignada){
        $scope.requestModalInformacion(idotasignada)
    }

    $scope.idOtSelect = "";
    $scope.requestModalInformacion=function(idparams){
        document.getElementById('v-tabs-consulta-detalleot-tab').click()
        $scope.idOtSelect = idparams;
        $scope.flagComentarios = false;
        $scope.flagHistorico = false;
        $scope.flagPedido = false;
        $scope.comentariosOrdenTrabajo = [];
        $scope.historialOrdenTrabajo = [];
        $scope.infoOtDetalle={}
        $scope.detalleCotizacion={}
        $scope.detalleTecnicoOt = {};
        swal({ text: 'Consultando detalle de la OT ...', allowOutsideClick: false });
        swal.showLoading();      

        let params =  {
            "idOt": idparams
        }

        $q.all([
            mainDespachoService.consultarDetalleOtDespacho(params),
            mainDespachoService.consultarDetalleTecnicoOt(params)
        ]).then(function(results){
            swal.close()
            if (results[0].data !== undefined) {
                if(results[0].data.respuesta ){
                    if(results[0].data.result ){
                        if( results[0].data.result.orden ){
                            $scope.infoOtDetalle=results[0].data.result.orden 
                            
                            $("#modalDetalleOT").modal('show')
                        }else{
                            toastr.info( results[0].data.result.mensaje );                
                        }
                    }else{                        
                        toastr.warning( 'No se encontraron datos' );                
                    }
                }else{
                    toastr.warning( results[0].data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de los datos' );                
            }
            if (results[1].data !== undefined) {
                if(results[1].data.respuesta ){
                    if(results[1].data.result ){
                        $scope.detalleTecnicoOt=results[1].data.result;
                    }else{                        
                        toastr.warning( 'No se encontraron datos' );                
                    }
                }else{
                    toastr.warning( results[0].data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de los datos' );                
            }
        }).catch(err => handleError(err));

    }

    $scope.listadoArrayOtsLocalizacion=[]
    $scope.consultarLocalizacionOtDespacho=function(valorbusqueda){
        $scope.listadoArrayOtsLocalizacion=[]
        
        swal({ text: 'Consultando registros ...', allowOutsideClick: false });
        swal.showLoading();
        let params =  {
            "yekparam": valorbusqueda
        }
        mainDespachoService.consultarLocalizacionOtDespacho(params).then(function success(response) {
            console.log(response);            
            swal.close()
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        if( response.data.result.ordenes && response.data.result.ordenes.length > 0){
                            //$scope.listadoTecnicosGeneral=tecnicosAsignacion
                            $scope.listadoArrayOtsLocalizacio=response.data.result.ordenes
                            $("#modalRegistrosLocalizados").modal('show')
                        }else{
                            toastr.info( response.data.result.mensaje );                
                        }
                    }else{                        
                        toastr.warning( 'No se encontraron datos' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de los datos' );                
            }
        }).catch(err => handleError(err))
    }


    $scope.flagComentarios = false;
    $scope.comentariosOrdenTrabajo = [];
    $scope.consultarComentarios=function(){
        if (!$scope.flagComentarios) {
            if (!swal.isVisible()) {
                swal({ text: 'Consultando comentarios ...', allowOutsideClick: false });
                swal.showLoading();
            }

            let params =  {
                "idOt" : $scope.idOtSelect
            }
            mainDespachoService.consultarComentariosDespachoOT(params).then(function success(response) {            
                swal.close()        
                if (response.data !== undefined) {
                    if(response.data.respuesta ){
                        if(response.data.result ){
                            if( response.data.result.detalle ){
                                $scope.flagComentarios = true;
                                $scope.comentariosOrdenTrabajo = response.data.result.detalle;
                                angular.forEach($scope.comentariosOrdenTrabajo,function(comentario,index){
                                    comentario.fechaComentario = moment(comentario.fecha + ' ' + comentario.hora).format("dddd, D [de] MMMM [de] YYYY hh:mm A");
                                });
                            }else{
                                toastr.warning( response.data.result.mensaje );                
                            }
                        }else{                        
                            toastr.warning( 'No se encontraron comentarios' );                
                        }
                    }else{
                        toastr.warning( response.data.resultDescripcion );                
                    }               
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }).catch(err => handleError(err))
        }
    }

    $scope.flagHistorico = false;
    $scope.historialOrdenTrabajo = [];
    $scope.consultarHistorial = function(){
        if (!$scope.flagHistorico) {
            $scope.historialOrdenTrabajo = [];
            $(".dot-dependencia").remove()
            swal({ text: 'Consultando historial ...', allowOutsideClick: false });
            swal.showLoading();
            let params =  {
                "idOt" : $scope.idOtSelect
            }
            mainDespachoService.consultarHistoricoDespachoOT(params).then(function success(response) {
                console.log(response);
                swal.close()
                if (response.data !== undefined) {
                    if(response.data.respuesta ){
                        if(response.data.result ){
                            if( response.data.result.detalle ){
                                $scope.flagHistorico = true;
                                $scope.historialOrdenTrabajo = response.data.result.detalle.reverse();
                                setTimeout(function(){
                                    $(".dot-dependencia").remove()
                                    $scope.pintarDependenciasHistorico();
                                },500)
                            }else{
                                toastr.warning( response.data.result.mensaje );                
                            }
                        }else{                        
                            toastr.warning( 'No se encontraron resultados' );                
                        }
                    }else{
                        toastr.warning( response.data.resultDescripcion );                
                    }               
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }).catch(err => handleError(err))
        }
    }
    abrirCambioEstatusTecnico = function (idOperario){
        $scope.elementEstatusTecnico.status=null
        $scope.elementEstatusTecnico.comentario=''
        
        $scope.elementEstatusTecnico.tecnico=angular.copy(
                    $scope.listadoTecnicosGeneral.find((e)=> e.idTecnico==idOperario) 
        );
        
        if($scope.listadoEstatusTecnico && $scope.listadoEstatusTecnico.length >0){                    
            $("#modalStatusOperario").modal('show')
            let optionTempSelected=$scope.listadoEstatusTecnico.find(function(e){
                return e.idEstatus==parseInt( $scope.elementEstatusTecnico.tecnico.idEstatusTecnico);
            })
            $scope.elementEstatusTecnico.status=optionTempSelected
        }

        $scope.$apply()
        console.log($scope.elementEstatusTecnico.tecnico)
    }
    abrirOtsTrabajadas = function (idTecnico,nombreTecnico){
       /** console.log("idTecnico"+idTecnico)
        console.log("nombreTecnico"+nombreTecnico)

        $scope.listadoOtsTrabajadasModal=[]       
        swal({ text: 'Consultando ots trabajadas ...', allowOutsideClick: false });
        swal.showLoading();
        let params =  {
            "Fecha_fin":"25/03/2021",
            "Fecha_inicio":"25/02/2021",
            "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno":"1,2,3",
            "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO":"64"
        }
        mainDespachoService.consultarOtsTrabajadasDespacho(params).then(function success(response) {
            console.log(response);
            $scope.listadoOtsTrabajadasModal=JSONOtsTrabajadas     
            swal.close()
            $("#modalOtsTrabajadas").modal('show')

            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                       console.log("############## ots trabajadas")
                       //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))**/

    }
    abrirUbicacionOperario = function (idTecnico,nombreTecnico){
        /**console.log("idTecnico"+idTecnico)
        console.log("nombreTecnico"+nombreTecnico)
        let objectParams={
            idTecnico:idTecnico,
            nombreTecnico:nombreTecnico
        }
        $scope.consultarUbicacionOperario(objectParams)**/
    }
    abrirInformacionVehiculo = function (idTecnico){
       /**
        console.log("function 14"+idTecnico)
        $scope.vehiculoOperario={}
        let params =  {
            "Fecha_fin":"25/03/2021",
            "Fecha_inicio":"25/02/2021",
            "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno":"1,2,3",
            "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO":"64"
        }
        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultarVehiculoOperario(params).then(function success(response) {
            
            $scope.vehiculoOperario=JSONVehiculoOperario.Vehicle
            $("#modalVehiculoOperario").modal('show')
            console.log(response);
            swal.close()
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                       console.log("############## catalogo")
                       //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))**/
    }
    abrirInformacionMateriales = function (idTecnico){
        /**
        console.log("function 15"+idTecnico)

        let params =  {
            "Fecha_fin":"25/03/2021",
            "Fecha_inicio":"25/02/2021",
            "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno":"1,2,3",
            "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO":"64"
        }

        swal({ text: 'Consultando datos ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultandoMaterialesPI(params).then(function success(response) {
            $scope.objectMateriales=JSONArraysMateriales
            swal.close()
            $("#modalMaterialesOperario").modal('show')
            console.log(response);
                    
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                       console.log("############## catalogo")
                       //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))**/
    }
    $scope.consultarCatalogoEstatusTecnico=function(){
        let params =  {
            "Fecha_fin":"25/03/2021",
            "Fecha_inicio":"25/02/2021",
            "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno":"1,2,3",
            "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO":"64"
        }
        mainDespachoService.consultarCatalogoEstatusTecnico(params).then(function success(response) {
            console.log(response);
            $scope.listadoEstatusTecnico=JSONEstatusTecnico     
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                       console.log("############## catalogo")
                       //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))
    }
    $scope.cambiarEstatusOperario=function(){
        console.log("Entra a cambiar estatus:")
        var n=$('#id-status-tecnico').val();
        console.log(n)
        if($scope.elementEstatusTecnico.status == null || !$scope.elementEstatusTecnico.comentario ){
            toastr.warning('Selecciona estatus y completa campo de comentario.... ')
            return false
        }
        let params =  {
         
            "idUsuario":$scope.elementEstatusTecnico.tecnico.idTecnico,
            "idEstatusUsuario":$scope.elementEstatusTecnico.status.idEstatus
        }

       swal({ text: 'Cambiando estatus ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.cambiarEstatusTecnicoPI(params).then(function success(response) {
          
            $("#modalStatusOperario").modal('hide')
            console.log("Estatus: ",response.status);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.mensaje === '0') {
                       console.log("############## catalogo")
                       //$scope.listadoOtsPendientes=otspendientes 
			            toastr.success(response.data.result.description);                        
                    }else{
                        toastr.warning( response.data.result.description );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcionn );                
                }
            }   
            swal.close()                             
        }).catch(err => handleError(err))
    }
  
    $scope.confirmarDesconfirmarOt=function(){
        console.log( $scope.objConfirmaDesc )    
        swal({ text: 'Cambiando estatus de la OT ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.cambiarEstatusOperarioPI(params).then(function success(response) {
            $scope.banderaRegresarCheckbox=true;
            $("#modalConfirmaDesconfirma").modal('hide')
            console.log(response);
            swal.close()
            toastr.success('Cambio de estatus correcto');
            $scope.refrescarBusqueda()
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                       console.log("############## catalogo")
                       //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))
    }

    $scope.abrirModalDetalleIconografia=function(){ 
        /**     
        if( $scope.listadoIconografia ){
            $("#modalIconografiaDespacho").modal('show')       
        }else{
            swal({ text: 'Consultando datos ...', allowOutsideClick: false });
            swal.showLoading();
            mainDespachoService.consultarPaletaColoresService().then(function success(response) {
                swal.close()
                $("#modalIconografiaDespacho").modal('show')  
                $scope.listadoIconografia=paletaColors.result.Colores                         
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result.result === '0') {
                           console.log("############## catalogo")**/
                           //$scope.listadoOtsPendientes=otspendientes 
                           /**   
                        }
                    }
                }
            }).catch(err => handleError(err))
        }
        **/

    }

    $scope.abrirModalAsignacion = function(otinfo, data_tecnico){
        $scope.asignacionObject={
            'otInfo'      :otinfo,
            'tecnicoInfo' :data_tecnico,
            'comentario'  :''
        }        
        $('#modalAsignacionOrdenTrabajo').modal('show');           
        $scope.$digest()     
    }        
    $scope.asignarOrdenTrabajo=function(){
        if(!$scope.asignacionObject.comentario ){
            toastr.warning('Completa campo de comentario ')
            return false
        }
        let horaasignacionInicio=angular.copy( $scope.asignacionObject.otInfo.fechahoraasignacion );
        let horaasignacionFin=angular.copy( $scope.asignacionObject.otInfo.fechahoraasignacion );
        horaasignacionFin=moment(horaasignacionFin).add(3, 'hours').format();

        let arrayHoraInicio=horaasignacionInicio.split("T")
        arrayHoraInicio[1]=arrayHoraInicio[1].substr(0,5)
        let formatFechaHoraInicio=arrayHoraInicio[0]+" "+arrayHoraInicio[1]

        let arrayHoraFin=horaasignacionFin.split("T")
        arrayHoraFin[1]=arrayHoraFin[1].substr(0,5)
        let formatFechaHoraFin=arrayHoraFin[0]+" "+arrayHoraFin[1]


        let params =  {
            "idEstado": 203,
            "idMotivo": 1,
            "fechaHoraInicio":formatFechaHoraInicio ,
            "fechaHoraFin": formatFechaHoraFin,
            "idOrigenSistema": 1,
            "idTipoOrden": 1,
            //"idUsuarioDespacho":1202,
            //"latitud": 1651651.5,
           //"longitud": 65465,
            "idUsuarioTecnico": $scope.asignacionObject.tecnicoInfo.id,
            "comentarios": $scope.asignacionObject.comentario,
            "textAccionCambioEstatus":"asignaOrden",
            "idOtEnvio":$scope.asignacionObject.otInfo.idOrden
        }
        $scope.procesandoAsignacion=true
        swal({ text: 'Agendando orden ...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.cambiarEstatusOrdenTrabajoPI(params).then(function success(response) {
            
            $("#modalAsignacionOrdenTrabajo").modal('hide')
            console.log(response);
            swal.close()
            toastr.success('Agendado correctamente');
           
            $scope.procesandoAsignacion=false

            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                       console.log("############## catalogo")
                       //$scope.listadoOtsPendientes=otspendientes                         
                    }
                }
            }
        }).catch(err => handleError(err))
    }

    $scope.consultarCatalogosAcciones=function(){
        mainDespachoService.consultarCatalogoAcciones().then(function success(response) {
            swal.close()
            $scope.listadoCatalogoAcciones=catalogoestatusJSON.result.Ststus   
            $scope.listadoTurnosAcciones=catalogoTurnoJSON             
            $scope.listadoMotivosRescate=$scope.listadoCatalogoAcciones.filter(  (e)=> e.Nivel==='3' && e.ID_Padre==='7'  )
            $scope.listadoMotivosReagenda=$scope.listadoCatalogoAcciones.filter(  (e)=> e.Nivel==='3' && e.ID_Padre==='7'  )
            $scope.listadoMotivosCalendarizado=$scope.listadoCatalogoAcciones.filter(  (e)=> e.Nivel==='3' && e.ID_Padre==='320'  )
            $scope.listadoEstadosTerminado=$scope.listadoCatalogoAcciones.filter(  (e)=> e.Nivel==='2' && e.ID_Padre==='4'  )



            console.log($scope.listadoCatalogoAcciones);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                        console.log("############## catalogo")
                        //$scope.listadoOtsPendientes=otspendientes    
                    }
                }
            }
        }).catch(err => handleError(err))
    }

    abrirModalFoto = function(nombre, url, usuario, telefono, centro, estatus){
        if(url == undefined || url == ""){
            url = "./resources/img/plantainterna/despacho/tecnicootasignada.png";
        }

        $("#num_emp").html("<span><strong>N&Uacute;M. EMPLEADO: </strong>"+usuario+"</span>");
        $("#tel_emp").html("<span><strong>TEL&Eacute;FONO: </strong>"+telefono+"</span>");
        $("#full_name").html("<span><strong>"+nombre+"</strong></span>");
        $("#centro").html("<span><strong>"+centro+"</strong></span>");
        $("#estatus").html("<span><strong>"+estatus+"</strong></span>");
        $("#img_emp").attr("src", url);
        $("#modalFotoUsuario").modal('show');
    }

    $scope.flagPedido = false;
    $scope.consultarPedido = function(){
        if (!$scope.flagPedido) {
            $scope.consultarDetalleCotizacion($scope.idOtSelect);
        }
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

}
/** 

$scope.listadoTecnicosGeneral=[]
$scope.isCargaTecnicosDisponibles=false;
mainDespachoService.consultarTecnicosDisponibiles().then(function success(response) {                        
    if (response.data !== undefined) {
        if(response.data.respuesta ){
            if(response.data.result ){
                if( response.data.result.detalleTecnicos ){
                    $scope.isCargaTecnicosDisponibles=true;
                    $scope.listadoTecnicosGeneral=response.data.result.detalleTecnicos
                }else{
                    toastr.warning( response.data.result.mensaje );                
                }
            }else{                        
                toastr.warning( 'No se encontraron OTS pendientes' );                
            }
        }else{
            toastr.warning( response.data.resultDescripcion );                
        }               
    }else{
        toastr.error( 'Ha ocurrido un error en la consulta de OTS pendientes' );                
    }
    $scope.isCargaTecnicosDisponibles=true;
    $scope.validarLoadTecnicosOtsAsignadas()
})
*/