
app.activacionController=function($scope,busquedaService){
  
    $scope.listaCotizaciones = [];
    $scope.listaEquipos = [];

    $scope.tituloActivacion = '';
    $scope.iconActivacion = 0;

    $scope.listadoTipoEquipoActivacion=[{id:1 ,nombre:'Bridge'},{id:2 ,nombre:'Router'} ]
    $scope.isProcesandoActivacion='noshow'

    $scope.consultarValidacionCuentaAsync=false
    $scope.cspglobalactivar;
    $scope.osglobalactivar;

    
  
    const maxLenMAC = 17; 
    $scope.setFormatMacValidacion = function(config) {
        let valoractual=angular.copy(config.MAC)
        let l=valoractual.length        
        let valornuevostring='';
    
        let cleanstring=valoractual.replace(/[-:]/g, "");
        Array.from(cleanstring).forEach((elemento,index)=>{
            if(index!== 0 && (index%2 ===0) ){
                valornuevostring+=":"           
            }
            valornuevostring+=elemento
        })
        delete config.MAC
        config.MAC= valornuevostring
        console.log(valornuevostring)
    }

    $scope.mostrarDetalleActivar = function(csp) {
        $scope.Network_code=''
        $scope.tipoactivacion='csp'
        $scope.validarActivacionos=csp.Id_OS
        csp.id_cotsitioplansf=csp.id
        $scope.objectglobalactivacion=csp

        console.log(csp)
        $scope.codigopostalplan=''
        $scope.codigopostalplanactivacion=csp.CP
        //$scope.codigopostalplanactivacion='04519'
        $scope.idotActivacion=csp.idOt
        $scope.unidadNegocioActivacion=csp.UnidadNegocio

        $scope.consultarValidacionCuentaAsync=false     

        $scope.planActivo=csp.cuentaActiva
        $scope.isProcesandoActivacion='noshow'
        $scope.statusActivacion=csp.cuentaActiva
        

        if (csp.Folio_OS) {
            $("#id_cot_sitio_plan_detalle_activar").text(csp.nombre)
            $scope.tituloActivacion = 'Cot sitio plan:';
            $scope.iconActivacion = 0;
            $scope.consultarEquiposConfigurados(csp);
           
        } else {
            alertify.set('notifier', 'position', 'top-right', { delay: 4000 });
            alertify.warning("El CSP no cuenta con OS");
        }
    }

    $scope.mostrarDetalleActivarOs = function(os) {
        $scope.Network_code=''
        $scope.tipoactivacion='os'
        $scope.validarActivacionos=os.id
       
        console.log(os);
        os.Folio_OS = os.nombre;
        os.id_cotsitioplansf=os.idCsp
        $scope.objectglobalactivacion=os

        $scope.codigopostalplan=''
        $scope.codigopostalplanactivacion=os.CP
        $scope.idotActivacion=os.idOt

        $("#id_cot_sitio_plan_detalle_activar").text(os.nombre)
        $scope.tituloActivacion = 'OS:';
        $scope.iconActivacion = 1;

        $scope.consultarEquiposConfigurados(os);
        $scope.unidadNegocioActivacion=os.UnidadNegocio

        $scope.consultarValidacionCuentaAsync=false


        $scope.statusActivacion=os.cuentaActiva
        $scope.planActivo=os.cuentaActiva
        $scope.isProcesandoActivacion='noshow'
    }
    
    $scope.objectoOs = {};
    $scope.respaldarObjectoOs = function(object) {
        console.log(object);
        $scope.objectoOs = object;
        $scope.isAbiertoOSNoticias=false;
    }

    $scope.mostrarDetalleActivarDesdeOs = function() {


        $scope.mostrarDetalleActivarOs($scope.objectoOs);
    }
    $scope.listadoInfoDNConfigurados=undefined;
    $scope.listadoInfoEquiposConfigurados=undefined;

    $scope.configurarEquipos = function(servicio) {
        swal({ text: 'Configurando Equipos ...', allowOutsideClick: false });
        swal.showLoading();
        
        console.log("configurarEquipo",servicio)

        let isError=false;
        let mensajeError=""

        if(servicio.config.modeloSelect ==undefined){
            mensajeError+='<li class="mensajeeerror">Seleccciona tipo de equipo</li>'
            isError=true
        }
        if(!servicio.config.No_Serie){
            mensajeError+='<li class="mensajeeerror">N&uacute;mero de serie</li>'
            isError=true
        }

        if(!servicio.config.MAC){
            mensajeError+='<li class="mensajeeerror">MAC</li>'
            isError=true
        }

        if(isError){
            swal({
                title:"Captura los siguientes campos",
                html: mensajeError,
                type: 'error',
                showConfirmButton: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:"Cerrar",
              }).then(function () {
            }).catch(swal.noop);
            return false
        }
    
        swal({ text: 'Configurando  ...', allowOutsideClick: false });
        swal.showLoading();        
        $scope.params =  
            [ {
                "Id_OT"                 : $scope.idotActivacion,
                "Id_Cot_SitioPlan"      : servicio.Info_Equipo.Id_Cot_PlanServicio,
                "Id_Cot_PlanServicio"   : servicio.IdCotPlanServicio,
                "Id_Cot_ModeloEquipo"   : servicio.Info_Equipo.Id_Cot_ModeloEquipo,
                "Tipo_Equipo"           : servicio.Info_Equipo.Dispositivo,
                "SRV_Mode"              : servicio.config.tipoEquipoSelect.nombre,
                "Id_Modelo"             : servicio.config.modeloSelect.Id_Modelo,
                "Modelo"                : servicio.config.modeloSelect.Descripcion_Modelo ,
                "No_Serie"              : servicio.config.No_Serie,
                "MAC"                   : servicio.config.MAC

            }]
        ;

        busquedaService.configurarEquipos($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.success) {
                   if(response.data.result.result === '0'){
                        servicio.isConfigurado=true
                        $scope.validarServiciosConfigurados()
                        mostrarMensajeExitoAlert(response.data.result.resultDescription);
                        swal.close();
                   }else{
                        swal.close();
                        mostrarMensajeErroActivacion(response.data.result.resultDescription)    
                   }
                } else {
                    swal.close();
                    mostrarMensajeErroActivacion('No se pudo activar el plan')                                    
                }
            } else {
                swal.close();
                mostrarMensajeErroActivacion('No se pudo activar el plan')                
            }
        }, function error(response) {
            swal.close();
        });
    }



    $scope.configurarDispositivosNuevo=function(servicio){
        console.log("configurarEquipo",servicio)

        let isError=false;
        let mensajeError=""

        if(servicio.config.modeloSelect ==undefined){
            mensajeError+='<li class="mensajeeerror">Seleccciona tipo de equipo</li>'
            isError=true
        }
        if(!servicio.config.No_Serie){
            mensajeError+='<li class="mensajeeerror">N&uacute;mero de serie</li>'
            isError=true
        }

        if(!servicio.config.MAC){
            mensajeError+='<li class="mensajeeerror">MAC</li>'
            isError=true
        }

        if(isError){
            swal({
                title:"Captura los siguientes campos",
                html: mensajeError,
                type: 'error',
                showConfirmButton: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:"Cerrar",
              }).then(function () {
            }).catch(swal.noop);
            return false
        }
    
        swal({ text: 'Configurando  ...', allowOutsideClick: false });
        swal.showLoading();
        
        $scope.params =  
            [ {

                "Id_OT" : "Id_OT29",
                "Id_Cot_PlanServ"       : servicio.IdCotPlanServicio,
                "Id_Cot_ModeloEquipo"   : servicio.Info_Equipo.Id_Cot_ModeloEquipo,
                "Tipo_Dispositivo"      : servicio.Info_Equipo.Dispositivo,
                "Id_Modelo"             : servicio.config.modeloSelect.Id_Modelo,
                "Modelo"                : servicio.config.modeloSelect.Descripcion_Modelo ,
                "No_Serie"              : servicio.config.No_Serie,
                "MAC"                   : servicio.config.MAC
            }]
        ;

        busquedaService.configurarDispositivos($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.success) {
                   if(response.data.result.result === '0'){
                    servicio.isConfigurado=true
                    $scope.validarServiciosConfigurados()
                    swal.close()
                    swal({
                        text: 'Se configur\u00F3 correctamete ',
                        type: 'success',
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText:"Cerrar",
                      }).then(function () {
                    }).catch(swal.noop);
                   }else{
                        swal.close();
                        mostrarMensajeErroActivacion(response.data.result.resultDescription)    
                   }
                } else {
                    swal.close();
                    mostrarMensajeErroActivacion('No se pudo configurar')                                    
                }
            } else {
                swal.close();
                mostrarMensajeErroActivacion('No se pudo configurar')                
            }
        }, function error(response) {
            swal.close();
        });

        
    }



    $scope.configurarONT=function(servicio){
        console.log("configurarONT",servicio)
        let isError=false;
        let mensajeError=""

        if(servicio.config.modeloSelect ==undefined){
            mensajeError+='<li class="mensajeeerror">Seleccciona tipo de equipo</li>'
            isError=true
        }

        if(servicio.config.tipoRedSelect ==undefined){
            mensajeError+='<li class="mensajeeerror">Seleccciona tipo de red</li>'
            isError=true
        }
       
        if(!servicio.config.No_Serie){
            mensajeError+='<li class="mensajeeerror">Numero serie</li>'
            isError=true
        }

        
        if(!servicio.config.MAC){
            mensajeError+='<li class="mensajeeerror">MAC</li>'
            isError=true
        }

        
        if(!servicio.config.OLT){
            mensajeError+='<li class="mensajeeerror">OLT</li>'
            isError=true
        }

        if(!servicio.config.Id_OLT){
            mensajeError+='<li class="mensajeeerror">Id OLT</li>'
            isError=true
        }

        if(!servicio.config.Frame){
            mensajeError+='<li class="mensajeeerror">Frame</li>'
            isError=true
        }

        if(!servicio.config.Slot){
            mensajeError+='<li class="mensajeeerror">Slot</li>'
            isError=true
        }
        if(!servicio.config.Puerto){
            mensajeError+='<li class="mensajeeerror">Puerto</li>'
            isError=true
        }
        if(isError){
            swal({
                title:"Captura los siguientes campos",
                html: mensajeError,
                type: 'error',
                showConfirmButton: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:"Cerrar",
              }).then(function () {
            }).catch(swal.noop);
            return false
        }
    
        swal({ text: 'Configurando ONT ...', allowOutsideClick: false });
        swal.showLoading();

        $scope.params =  
            [ {
                "Id_OT"               :$scope.idotActivacion,
                "Id_Cot_SitioPlan"    :$scope.objectglobalactivacion.id_cotsitioplansf,
                "Id_Cot_PlanServicio" :servicio.IdCotPlanServicio,
                "Id_Cot_ModeloEquipo" :servicio.Info_Equipo.Id_Cot_ModeloEquipo,
                "Frame"               :servicio.config.Frame,
                "MAC"                 :servicio.config.MAC,
                "Id_Modelo"           :servicio.config.modeloSelect.Id_Modelo ,
                "Modelo"              :servicio.config.modeloSelect.Descripcion_Modelo ,
                "No_Serie"            :servicio.config.No_Serie,
                "Puerto"              :servicio.config.Puerto,
                "Id_OLT"              :servicio.config.Id_OLT,
                "OLT"                 :servicio.config.OLT,
                "Slot"                :servicio.config.Slot,
                "Tipo_Equipo"         :servicio.Info_Equipo.Dispositivo,
                "SRV_Mode"            :servicio.config.tipoEquipoSelect.nombre,
                "Tipo_red"            :servicio.config.tipoRedSelect.Descripcion_Aprovisionamiento
            }]
        ;

        busquedaService.configurarOnt($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.success) {
                   if(response.data.result.result === '0'){
                    swal.close()
                    swal({
                        text: 'Se configur\u00F3 correctamete la ONT',
                        type: 'success',
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText:"Cerrar",
                      }).then(function () {
                    }).catch(swal.noop);
                    servicio.isConfigurado=true
                    $scope.validarServiciosConfigurados()
                    
                   }else{
                        swal.close();
                        mostrarMensajeErroActivacion(response.data.result.resultDescription)    
                   }
                } else {
                    swal.close();
                    mostrarMensajeErroActivacion('No se pudo configurar')                                    
                }
            } else {
                swal.close();
                mostrarMensajeErroActivacion('No se pudo configurar')                
            }
        }, function error(response) {
            swal.close();
        });

    }

    $scope.openModalNoConfig=function(){
        $("#modelNoConfigura").modal()
    }
    $scope.consultarEquiposConfigurados = function(csp) {
        $scope.listadoInfoDNConfigurados=undefined;
        $scope.listadoInfoEquiposConfigurados=undefined;

        swal({ text: 'Configurando Equipos ...', allowOutsideClick: false });
        swal.showLoading();
        
        $scope.params = {};
        $scope.params.Id_Cot_SitioPlan = csp.id_cotsitioplansf;

        busquedaService.consultarEquiposConfigurados($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.success) {
                   if(response.data.result.result === '0'){
                       
                        if(response.data.result.Info_DN_Conf ){
                            angular.forEach( response.data.result.Info_DN_Conf , function(element,index){
                                if(element.DN_Conf !== undefined){
                                    angular.forEach(element.DN_Conf , function(el,indexj){
                                        el.valor=indexj== 0 ? '1':'0'
                                    })
                                }
                            })       
                            console.log("##########33listado dns configurados",response.data.result.Info_DN_Conf)
                            $scope.listadoInfoDNConfigurados=response.data.result.Info_DN_Conf;
                            //$scope.listadoInfoDNConfigurados=[]
                        }

                        if(response.data.result.Info_Equipo_Conf ){
                            console.log("##########listado equipos configurados",response.data.result.Info_Equipo_Conf )
                            $scope.listadoInfoEquiposConfigurados=response.data.result.Info_Equipo_Conf ;
                            //$scope.listadoInfoEquiposConfigurados=[]
                        }

                        $scope.consultarEquipos(csp)
                      //  mostrarMensajeExitoAlert(response.data.result.resultDescription);
                      //  swal.close();
                   }else{
                        swal.close();
                        mostrarMensajeErroActivacion(response.data.result.resultDescription)    
                   }
                } else {
                    swal.close();
                    mostrarMensajeErroActivacion('No se pudo activar el plan')                                    
                }
            } else {
                swal.close();
                mostrarMensajeErroActivacion('No se pudo activar el plan')                
            }
        }, function error(response) {
            swal.close();
        });
    }

    $scope.consultarEquipos = function(csp) {
        console.log(csp);
        $scope.planactivaciontemp=angular.copy(csp)
        /**swal({ text: 'Buscando datos ...', allowOutsideClick: false });
        swal.showLoading();
      
        var params = new FormData();
        params.append("params.Folio_OS", "OS-31919");
        params.append("params.Accion", "0");
        params.append("params.Id_Propietario", "1");
        params.append("params.Id_Cot_SitioPlan", "a0K7e000009bpUnEAI");  **/
    
        var params = new FormData();
        params.append("params.Folio_OS", csp.Folio_OS);
        params.append("params.Accion", "0");
        params.append("params.Id_Propietario", 1);
        params.append("params.Id_Cot_SitioPlan", csp.id_cotsitioplansf);
         
        busquedaService.consultarEquipos(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.success) {
                    if(response.data.result.cotizaciones.result.result==='0'){
                        $scope.listaCotizaciones = response.data.result.cotizaciones.result.CotPlanServicios;
                        $scope.objetoCotizacion=response.data.result.cotizaciones.result
                        $scope.listaEquipos = response.data.result.equipos.result.Info_Equipo;
                        
                  



                        angular.forEach($scope.listaCotizaciones, function(cotizacion, index) {
                            cotizacion.mostrarInfo = true;
                            cotizacion.tipoActiviacion = 'Bridge';
                            angular.forEach($scope.listaEquipos, function(equipo, index) {
                                if (cotizacion.IdCotPlanServicio === equipo.Id_Cot_PlanServicio) {
    
                                    angular.forEach(equipo.Modelo, function(model, index) {
                                        if (equipo.Nombre_Equipo === model.Descripcion_Modelo) {
                                            equipo.modeloSelect = model;
                                        }
                                    });
                                    cotizacion.Info_Equipo = equipo;
                                    cotizacion.tipoProvisionamiento=response.data.result.equipos.result.Tipo_Aprovisionamiento                                
                                }
                            });
                        });
             
                        //Se hace merge de lo configurado con lo consultado
                       // $scope.listadoInfoDNConfigurados=undefined;
                       // $scope.listadoInfoEquiposConfigurados=undefined;
                        if($scope.listadoInfoDNConfigurados !== undefined && $scope.listadoInfoDNConfigurados.length>0){
                            angular.forEach($scope.listadoInfoDNConfigurados,function(elemento,index){
                                let tempServicio= $scope.listaCotizaciones.find( function(elem){ return elem.IdCotPlanServicio === elemento.Id_Cot_PlanServicio} ) ;
                                if(tempServicio !== undefined){
                                    tempServicio.mensajeConfig = true;
                                    tempServicio.config=elemento
                                    tempServicio.isConfigurado=true

                                }
                            })

                        }  
                         
                        if($scope.listadoInfoEquiposConfigurados !== undefined && $scope.listadoInfoEquiposConfigurados.length>0){
                            angular.forEach($scope.listadoInfoEquiposConfigurados,function(elemento,index){
                                let tempServicio= $scope.listaCotizaciones.find( function(servicio){ return servicio.IdCotPlanServicio === elemento.Id_Cot_PlanServicio} ) ;
                                if(tempServicio !== undefined){
                                    tempServicio.config=elemento
                                    tempServicio.isConfigurado=true
                                }
                            })
                        }
                        
                        angular.forEach($scope.listaCotizaciones, function(cotizacion, index) { 
                            if( cotizacion.config !== undefined ){
                                if( cotizacion.Info_Equipo !== undefined ){
                                    angular.forEach( cotizacion.Info_Equipo.Modelo , function( modelo , index ) {
                                        if (cotizacion.config.Id_Modelo === modelo.Id_Modelo) {                                        
                                            cotizacion.config.modeloSelect = angular.copy(modelo);
                                        }
                                    });

                                    if( cotizacion.config.SRV_Mode ){
                                        cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion.find( function (ele) {  return ele.nombre === cotizacion.config.SRV_Mode})  
                                    }else{
                                        cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0]
                                    }  
                                    
                                    if( cotizacion.config.Tipo_Aprovisionamiento ){
                                        if(cotizacion.tipoProvisionamiento !== undefined && cotizacion.tipoProvisionamiento.length>0){
                                            cotizacion.config.tipoRedSelect=cotizacion.tipoProvisionamiento.find( function (ele) {  return ele.Descripcion_Aprovisionamiento === cotizacion.config.Tipo_Aprovisionamiento })  
                                        }
                                    }else{
                                        if(cotizacion.tipoProvisionamiento !== undefined && cotizacion.tipoProvisionamiento.length>0){
                                            cotizacion.config.tipoRedSelect=cotizacion.tipoProvisionamiento[0]
                                        }                                            
                                    }
                                }else{
                                    if( cotizacion.config.SRV_Mode ){
                                        cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion.find( function (ele) {  return ele.nombre === cotizacion.config.SRV_Mode})  
                                    }else{
                                        cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0]
                                    }  
                                }
                            }else{
                                cotizacion.config={}
                                cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0]
                            }    
                                                
                        });

                        //Se agrega la ONT en la primer posicion 
                        let indexDeleteService=-1;
                        let objectFind={}
                        angular.forEach($scope.listaCotizaciones, function(element,index){
                            if (element.Info_Equipo) {
                                if (element.Info_Equipo.Es_Equipo === "1" && element.Info_Equipo.Tiene_Autofind === "true") {
                                    indexDeleteService=index
                                    objectFind=angular.copy(element)
                                }
                            }
                        });
                        //Se agrega la ONT en la primer posicion 
                        if(indexDeleteService !== -1){
                            $scope.listaCotizaciones.splice(indexDeleteService,1);
                            $scope.listaCotizaciones.unshift(objectFind)
                        }


                        //Se agrega bandera para validar los posibles servicios a configurar
                        angular.forEach($scope.listaCotizaciones, function(servicio,index){
                            if(servicio.Tipo && servicio.Tipo.includes('Telefonia') ){
                                servicio.servicioTelefonia=true
                                servicio.servicioConfigurable=true
                            }else {
                                if (servicio.Info_Equipo) {
                                    if( servicio.Info_Equipo.Es_Equipo ==='1' && servicio.Info_Equipo.Tiene_Autofind === 'false' ){
                                        servicio.servicioEquipo=true
                                        servicio.servicioConfigurable=true
                                    } else if( servicio.Info_Equipo.Es_Equipo ==='0' && servicio.Info_Equipo.Tiene_Autofind === 'false'  ) {
                                        servicio.servicioDispositivo=true
                                        servicio.servicioConfigurable=true
                                    }else if(  servicio.Info_Equipo.Es_Equipo ==='1' && servicio.Info_Equipo.Tiene_Autofind === 'true' ){
                                        servicio.servicioONT=true
                                        servicio.servicioConfigurable=true
                                    }
                                }
                            }                       
                        });
                        $scope.validarServiciosConfigurados()
                      

                        console.log($scope.listaCotizaciones);
                        $scope.showSearch = false;
                        $scope.showOs = false;
                        $scope.showSearch = false;
                        $scope.elemento = {};
                        $scope.elemento.detalle = "";
                        $scope.elemento.keyObject = "activacion";
                        $scope.historial.push($scope.elemento);
                        $scope.showDetalleActivar = true;

                    }else{
                        mostrarMensajeWarning(response.data.result.cotizaciones.result.resultDescription);
                        swal.close();
                    }
         
                    swal.close();
                } else {
                    mostrarMensajeWarning("No se encontro informaci\u00f3n");
                    swal.close();
                }
            } else {
                mostrarMensajeWarning("No se encontro informaci\u00f3n");
                swal.close();
            }
        }, function error(response) {
            swal.close();
        });

    }

    $scope.isTodosConfigurado=false
    $scope.validarServiciosConfigurados=function(){    
        let cantidadConfigurables=$scope.listaCotizaciones.filter((e)=> e.servicioConfigurable).length
        let cantidadConfigurados= $scope.listaCotizaciones.filter((e)=> e.isConfigurado).length        
        $scope.isTodosConfigurado=( cantidadConfigurables === cantidadConfigurados  ) ? true :false
    }
    $scope.listaDns = [];
    $scope.consultarDns = function(cotizacion) {
        $scope.listaDns = [];
        swal({ text: 'Buscando datos ...', allowOutsideClick: false });
        swal.showLoading();

        var params = new FormData();
        /**
        params.append("params.CodigoPostal", "04600");
        params.append("params.CantidadDn", "5");
***/
        params.append("params.CodigoPostal", $scope.codigopostalplanactivacion);
        params.append("params.CantidadDn", cotizacion.numeroDns === '1' ? '1.0' : cotizacion.numeroDns);
        
        busquedaService.consultarDns(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.success) {
                    if (response.data.result.Result === "0") {
                        cotizacion.listaDns = response.data.result.ArrDn;
                        
                        if( cotizacion.listaDns !== undefined &&  cotizacion.listaDns.length > 0 ){
                            
                            if(cotizacion.config === undefined)
                                cotizacion.config={}
                            
                            cotizacion.config.DN_Conf=[]

                            angular.forEach(cotizacion.listaDns, function(dn, index) {
                                cotizacion.config.DN_Conf.push({
                                    "DN": dn.Dn,
                                    "Id_Cot_ElementoReservado": "",
                                    "valor": index== 0 ? '1':'0',
                                    "IdStatus": dn.IdStatus,
                                    "IdTransaccion":dn.IdTransaccion
                                })
                            });
                       
                        }
                       
                    }else{
                        mostrarMensajeWarning(response.data.result.ResultDescription);
                    }
                    swal.close();
                } else {
                    mostrarMensajeWarning("No se encontro informaci\u00f3n");
                    swal.close();
                }
            } else {
                mostrarMensajeWarning("No se encontro informaci\u00f3n");
                swal.close();
            }
        }, function error(response) {
            swal.close();
        });

    }

    $scope.consultarEquipoEspecifico = function(servicio) {
        if(servicio.config.No_Serie){
            swal({ text: 'Buscando datos ...', allowOutsideClick: false });
            swal.showLoading();
    
            var params = new FormData();
           // params.append("params.SerialNumber", "485754439B5081A0");
            params.append("params.SerialNumber", servicio.config.No_Serie);
           
            busquedaService.consultarEquipoEspecifico(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.success) {
                        if (response.data.result.Result === "0") {
                            let res=response.data.result                       
                                if(servicio.config === undefined)                            
                                    servicio.config={}
                                    
                                servicio.config.No_Serie =  res.SerialNumber
                                servicio.config.MAC =  ''
                                servicio.config.OLT =  res.OLT
                                servicio.config.Id_OLT =  res.IdOLT
                                servicio.config.Frame = res.Frame 
                                servicio.config.Slot =  res.Slot    
                                servicio.config.Puerto =  res.Port

                        }else{
                            mostrarMensajeWarning(response.data.result.ResultDescription);
                        }
                    } else {
                        mostrarMensajeWarning(response.data.result.ResultDescription);
                    }
                    swal.close();
                } else {
                    mostrarMensajeWarning("No se encontro informaci\u00f3n");
                    swal.close();
                }
            }, function error(response) {
                swal.close();
            });
        }else{
            mostrarMensajeWarning("Captura el n\u00FAmero de serie");
        }       
    }

  

    $scope.activacionEquipos = function(servicio) {
        $scope.consultarValidacionCuentaAsync=false
        $scope.isProcesandoActivacion='error'
        let indexOnt=undefined;
        angular.forEach($scope.listaCotizaciones, function(elemento,index){
            if(elemento.Info_Equipo !== undefined){
                if(elemento.Info_Equipo.Es_Equipo=== '1' && elemento.Info_Equipo.Tiene_Autofind==='true'){
                    indexOnt=index
                }
            }
        })
        if(indexOnt=== undefined){
            mostrarMensajeErroActivacion('No se encontr\u00F3 ONT para la activaci\u00F3n')                               
            return false
        }
        let ontRegistro= $scope.listaCotizaciones[indexOnt]
    
        swal({ text: 'Activando datos ...', allowOutsideClick: false });
        swal.showLoading();
        var params = new FormData();
        params.append("params.MensajeChatter", 'Activacion servicios de '+$scope.planactivaciontemp.nombre);
        params.append("params.IdPlanServicio",  ontRegistro.IdCotPlanServicio);
        params.append("params.Id_OT",  $scope.idotActivacion);
        params.append("params.UnidadNegocio",   $scope.unidadNegocioActivacion);
    
        
        busquedaService.activacionEquipos(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                /**
                response.data.success=true
                response.data.result={}
                response.data.result.result='0'
                response.data.result.Es_asyncrona='true'
                **/
                if (response.data.success) {
                    if(response.data.result.result !== undefined){
                     
                            if(response.data.result.result=='0'){

                                if( $scope.unidadNegocioActivacion === '2'  ){
                                    //$scope.isProcesandoActivacion='cargando'                                   
                                    $scope.statusActivacion='proceso'
                                    setTimeout(function(){
                                        $scope.validarActivacion()
                                    },5000)
                                }else{
                                    if(response.data.result.Es_asyncrona==='true'){
                                        //$scope.isProcesandoActivacion='cargando'                                   
                                        $scope.statusActivacion='proceso'
                                        setTimeout(function(){
                                            $scope.validarActivacion()
                                        },5000)
                                    }
                                   
                                }
                                swal.close()
                                swal({
                                    text:response.data.result.resultDescription,
                                    type: 'success',
                                    timer:3000,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    cancelConfirmText:"Cerrar",
                                    }).then(function () {
                                }).catch(swal.noop);
                            }else{ 
                                swal.close()                                               
                                mostrarMensajeErroActivacion(response.data.result.resultDescription)                
                            }
                    }else{
                        swal.close()
                            mostrarMensajeErroActivacion('No se pudo activar el plan')    
                    }
                } else {
                    swal.close()
                    mostrarMensajeErroActivacion('No se pudo activar el plan')                                    
                }
            } else {
                swal.close()
                mostrarMensajeErroActivacion('No se pudo activar el plan')                
            }
        }, function error(response) {
            swal.close();
        });
        
    }
    $scope.validarActivacion = function() {    
    
        if(!$scope.consultarValidacionCuentaAsync  ){      
            
            var params = new FormData();        
            params.append("params.Id_os_sf", $scope.validarActivacionos);            
            busquedaService.validarActivacion(params).then(function success(response) {
                console.log(response);
          
                if($scope.pruebaPeticionActivacion=='true'){
                    response.data.result.idStatus='3'
                }
                /****/
                if (response.data !== undefined) {
                    if (response.data.success) {
                        if (response.data.result.result === "0") {
                            /**
                            1 - Activación Exitosa
                            2 - En espera (Se reconsume)
                            Cualquier otro caso -  Error en la activación
                            **/
                            if(response.data.result.idStatus ==='1'){
                                $scope.consultarValidacionCuentaAsync=true
                                $scope.statusActivacion='true'    
                                $scope.planActivo='true'                                                                                                
                                $scope.objectglobalactivacion.cuentaActiva='true'

                            }else if(response.data.result.idStatus ==='2' ){
                                setTimeout(function(){
                                    $scope.validarActivacion()
                                },5000)
                            }else{
                                $scope.consultarValidacionCuentaAsync=true
                                $scope.statusActivacion='error'       
                                $scope.Network_code=response.data.result.Network_code                  
                            }
                   
                        
                        }else{
                            mostrarMensajeWarning(response.data.result.resultDescription);
                        }
                    } else {
                        mostrarMensajeWarning(response.data.mensaje);
                    }
                    swal.close();
                } else {
                    mostrarMensajeWarning("No se encontro informaci\u00f3n");
                    swal.close();
                }
            }, function error(response) {
                swal.close();
            });
        }          
    }

    

    $scope.configurarDns = function(servicio) {
        console.log(servicio);
        swal({ text: 'Configurando DNS ...', allowOutsideClick: false });
        swal.showLoading();

        $scope.params = {};
        $scope.listaDn = [];
        angular.forEach(servicio.config.DN_Conf , function(element,index){
            if(element.valor === "1") {
                $scope.params.DN_Principal = element.DN;
            }
            $scope.listaDn.push(element.DN);
        });


        $scope.params.SRV_Mode = servicio.config.tipoEquipoSelect.nombre;

        
        $scope.params.Id_OT =  $scope.idotActivacion;
        $scope.params.Id_Cot_PlanServicio = servicio.IdCotPlanServicio;
        
        
        $scope.params.DN = $scope.listaDn;

        busquedaService.configurarDns($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.success) {
                   if(response.data.result.result === '0'){
                        swal.close();
                        swal({
                            text: 'Se configur\u00F3 correctamete ',
                            type: 'success',
                            showConfirmButton: true,
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText:"Cerrar",
                        }).then(function () {
                        }).catch(swal.noop);

                        servicio.isConfigurado=true
                        $scope.validarServiciosConfigurados()
                   }else{
                        swal.close();
                        mostrarMensajeErroActivacion(response.data.result.resultDescription)    
                   }
                } else {
                    swal.close();
                    mostrarMensajeErroActivacion('No se pudo configurar los dns')                                    
                }
            } else {
                swal.close();
                mostrarMensajeErroActivacion('No se pudo configurar los dns')                
            }
        }, function error(response) {
            swal.close();
        });
    }

    $scope.getMacJsonBusqueda = function(servicio) {
        swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
        swal.showLoading();
        var params = new FormData();
        //params.append("params.SerialNumber", 'M362028F829F8374E2');
        params.append("params.SerialNumber", servicio.No_Serie);
        busquedaService.getMacJson(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.success) {
                    if (response.data.result.mac) {
                        servicio.MAC = response.data.result.mac;
                       // mostrarMensajeExitoAlert(response.data.result.msg);
                    } else {
                        //mostrarMensajeWarning(response.data.result.msg);
                    }
                   swal.close()
                } else {
                    mostrarMensajeErrorAlertAjax("Error al consultar la informacion")
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlertAjax("Error en el servidor")
                swal.close()
            }
        })
    }
   


    $scope.mostrarOcultarInfo = function(info) {
        if (info.mostrarInfo) {
            info.mostrarInfo = false;
        } else {
            info.mostrarInfo = true;
        }
    }

    $scope.marcarPrincipal = function(arr, index) {
        angular.forEach(arr, function(dns, i) {
            dns.valor = '0';
        });
        arr[index].valor = '1';
    }


    mostrarMensajeErroActivacion=function(text){
        swal.close();
        swal({
            text: text,
            type: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:"Cerrar",
          }).then(function () {
        }).catch(swal.noop);
    }
    
}
