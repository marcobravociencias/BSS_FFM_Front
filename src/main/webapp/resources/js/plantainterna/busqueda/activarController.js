
app.activacionController=function($scope, $q, busquedaService){
  
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
        $scope.validarActivacionos=csp.idCsp
        csp.id_cotsitioplansf=csp.id
        $scope.objectglobalactivacion=csp

        console.log(csp)
        $scope.codigopostalplan=''
        $scope.codigopostalplanactivacion=csp.cp
        //$scope.codigopostalplanactivacion='04519'
        $scope.idotActivacion=csp.idOt
        $scope.unidadNegocioActivacion=csp.unidadNegocio

        $scope.consultarValidacionCuentaAsync=false     

        $scope.planActivo=csp.cuentaActiva
        $scope.isProcesandoActivacion='noshow'
        $scope.statusActivacion=csp.cuentaActiva
        

        if (csp.folioOs) {
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
        $scope.validarActivacionos=os.idCsp
       
        console.log(os);
        os.Folio_OS = os.nombre;
        os.id_cotsitioplansf=os.idCsp
        $scope.objectglobalactivacion=os

        $scope.codigopostalplan=''
        $scope.codigopostalplanactivacion=os.cp
        $scope.idotActivacion=os.idOt

        $("#id_cot_sitio_plan_detalle_activar").text(os.nombre)
        $scope.tituloActivacion = 'OS:';
        $scope.iconActivacion = 1;

        $scope.consultarEquiposConfigurados(os);
        $scope.unidadNegocioActivacion=os.unidadNegocio

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
    $scope.infoDNConfigurados = {};
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
        if(!servicio.config.numSerie){
            mensajeError+='<li class="mensajeeerror">N&uacute;mero de serie</li>'
            isError=true
        }

        if(!servicio.config.mac){
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
        
        /*
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
        */

        $scope.equipo = {};
        $scope.equipo.idOt = $scope.idotActivacion;
        $scope.equipo.idCotSitioPlan = servicio.Info_Equipo.idCotPlanServicio;
        $scope.equipo.idCotPlanServicio = servicio.id;
        $scope.equipo.idCotModeloEquipo = servicio.Info_Equipo.idCotModeloEquipo;
        $scope.equipo.tipoEquipo = servicio.Info_Equipo.tipoDispositivo;
        $scope.equipo.svrMode = servicio.config.tipoEquipoSelect.nombre;
        $scope.equipo.numeroSerie = servicio.config.numSerie;
        $scope.equipo.mac = servicio.config.mac;
        $scope.equipo.idModelo = servicio.config.modeloSelect.idModelo;
        $scope.equipo.modelo = servicio.config.modeloSelect.modelo;
        //$scope.equipo.llevaAta = servicio.idOt;
        
        /*
        $scope.detalleRed = {};
        $scope.detalleRed.idOnt = servicio.idOt;
        $scope.detalleRed.frame = servicio.idOt;
        $scope.detalleRed.slot = servicio.idOt;
        $scope.detalleRed.puerto = servicio.idOt;
        $scope.detalleRed.idOlt = servicio.idOt;
        $scope.detalleRed.olt = servicio.idOt;
        $scope.detalleRed.ipOlt = servicio.idOt;
        $scope.detalleRed.tipoRed = servicio.idOt;
        $scope.equipo.detalleRed = $scope.detalleRed;

        $scope.informacionSVMRouter = {};
        $scope.informacionSVMRouter.gateWay = servicio.idOt;
        $scope.informacionSVMRouter.segmentoGateway = servicio.idOt;
        $scope.informacionSVMRouter.ip = servicio.idOt;
        $scope.informacionSVMRouter.mask = servicio.idOt;
        $scope.informacionSVMRouter.segmentoMask = servicio.idOt;
        $scope.informacionSVMRouter.segmentoRed = servicio.idOt;
        $scope.informacionSVMRouter.segmentoWildCard = servicio.idOt;
        $scope.equipo.informacionSVMRouter = $scope.informacionSVMRouter;
        */
        $scope.params = {};
        $scope.params.servicios = [];
        $scope.params.servicios.push($scope.equipo);

        busquedaService.configurarServicios($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                   if(response.data.result.mensaje === 'OK'){
                        servicio.isConfigurado=true
                        $scope.validarServiciosConfigurados()
                        mostrarMensajeExitoAlert(response.data.result.description);
                        swal.close();
                   }else{
                        swal.close();
                        mostrarMensajeErroActivacion(response.data.result.description)    
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
       
        if(!servicio.config.numSerie){
            mensajeError+='<li class="mensajeeerror">Numero serie</li>'
            isError=true
        }

        
        if(!servicio.config.mac){
            mensajeError+='<li class="mensajeeerror">MAC</li>'
            isError=true
        }

        
        if(!servicio.config.red.nombreOlt){
            mensajeError+='<li class="mensajeeerror">OLT</li>'
            isError=true
        }

        if(!servicio.config.red.idOlt){
            mensajeError+='<li class="mensajeeerror">Id OLT</li>'
            isError=true
        }

        if(!servicio.config.red.frame){
            mensajeError+='<li class="mensajeeerror">Frame</li>'
            isError=true
        }

        if(!servicio.config.red.slot){
            mensajeError+='<li class="mensajeeerror">Slot</li>'
            isError=true
        }
        if(!servicio.config.red.puerto){
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

        /*
        $scope.params =  
            [ {
                "Id_OT"               :$scope.idotActivacion,
                "Id_Cot_SitioPlan"    :$scope.objectglobalactivacion.id_cotsitioplansf,
                "Id_Cot_PlanServicio" :servicio.IdCotPlanServicio,
                "Id_Cot_ModeloEquipo" :servicio.Info_Equipo.Id_Cot_ModeloEquipo,
                "Frame"               :servicio.config.Frame,//
                "MAC"                 :servicio.config.MAC,
                "Id_Modelo"           :servicio.config.modeloSelect.Id_Modelo ,
                "Modelo"              :servicio.config.modeloSelect.Descripcion_Modelo ,
                "No_Serie"            :servicio.config.No_Serie,
                "Puerto"              :servicio.config.Puerto,//
                "Id_OLT"              :servicio.config.Id_OLT,
                "OLT"                 :servicio.config.OLT,//
                "Slot"                :servicio.config.Slot,//
                "Tipo_Equipo"         :servicio.Info_Equipo.Dispositivo,
                "SRV_Mode"            :servicio.config.tipoEquipoSelect.nombre,
                "Tipo_red"            :servicio.config.tipoRedSelect.Descripcion_Aprovisionamiento//
            }]
        ;
        */
        
        $scope.ont = {};
        $scope.ont.idOt = $scope.idotActivacion;
        $scope.ont.idCotSitioPlan = servicio.Info_Equipo.idCotPlanServicio;//
        $scope.ont.idCotPlanServicio = servicio.id;
        $scope.ont.idCotModeloEquipo = servicio.Info_Equipo.idCotModeloEquipo;
        $scope.ont.tipoEquipo = servicio.Info_Equipo.tipoDispositivo;
        $scope.ont.svrMode = servicio.config.tipoEquipoSelect.nombre;
        $scope.ont.numeroSerie = servicio.config.numSerie;
        $scope.ont.mac = servicio.config.mac;
        $scope.ont.idModelo = servicio.config.modeloSelect.idModelo;
        $scope.ont.modelo = servicio.config.modeloSelect.modelo;

        $scope.detalleRed = {};
        //$scope.detalleRed.idOnt = servicio.config.red.frame;//
        $scope.detalleRed.frame = servicio.config.red.frame;
        $scope.detalleRed.slot = servicio.config.red.slot;
        $scope.detalleRed.puerto = servicio.config.red.puerto;
        $scope.detalleRed.idOlt = servicio.config.red.idOlt;
        $scope.detalleRed.olt = servicio.config.red.nombreOlt;
        //$scope.detalleRed.ipOlt = servicio.config.red.frame;
        $scope.detalleRed.tipoRed = servicio.config.tipoRedSelect.descripcionAprovisionamiento;
        $scope.ont.detalleRed = $scope.detalleRed;
        $scope.params = {};
        $scope.params.servicios = [];
        $scope.params.servicios.push($scope.ont);

        busquedaService.configurarServicios($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                   if(response.data.result.mensaje === 'OK'){
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
        $scope.params.folioOs = csp.Folio_OS;
        $scope.params.idCotSitioPlan = csp.id_cotsitioplansf;

        $scope.infoDNConfigurados = {};
        $scope.listadoInfoEquiposConfigurados = [];
        $scope.listaEquipos = [];
        $scope.tipoAprovisionamiento = [];
        $scope.listaCotizaciones = [];
        $scope.objetoCotizacion = {};

        $q.all([
			busquedaService.consultarEquiposConfigurados($scope.params),
			busquedaService.consultarEquipos($scope.params),
			busquedaService.consultarCotizacionesEquipos($scope.params)
		]).then(function(results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
					if (results[0].data.result) {
                        $scope.infoDNConfigurados = results[0].data.result.equiposConfifurados.dns ? results[0].data.result.equiposConfifurados.dns : [];
                        $scope.listadoInfoEquiposConfigurados = results[0].data.result.equiposConfifurados.servicios ? results[0].data.result.equiposConfifurados.servicios : [];
                        angular.forEach($scope.infoDNConfigurados.dns, function(el,indexj){
                            if (el.dn === results[0].data.result.equiposConfifurados.dns.dnPrincipal) {
                                el.valor = "1";
                            } else {
                                el.valor = "0";
                            }
                        });
                    }
                }
            }
            
            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
					if (results[1].data.result) {
                        $scope.listaEquipos = results[1].data.result.detalleEquipos;
                        $scope.tipoAprovisionamiento = results[1].data.result.tipoAprovisionamiento;
                    }
                }
            }

            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
					if (results[2].data.result) {
                        $scope.listaCotizaciones = results[2].data.result.detalleCotizacion.cotPlanServicios;
                        $scope.objetoCotizacion = results[2].data.result.detalleCotizacion;
                    }
                }
            }
            
            angular.forEach($scope.listaCotizaciones, function(cotizacion, index) {
                cotizacion.mostrarInfo = true;
                cotizacion.tipoActiviacion = 'Bridge';
                cotizacion.tipoCotizacion = cotizacion.nombre.split("-")[1];
                angular.forEach($scope.listaEquipos, function(equipo, index) {
                    if (cotizacion.id === equipo.idCotPlanServicio) {
                        angular.forEach(equipo.modelo, function(model, index) {
                            if (equipo.nombreEquipo === model.modelo) {
                                equipo.modeloSelect = model;
                            }
                        });
                        cotizacion.Info_Equipo = equipo;
                        cotizacion.tipoProvisionamiento = $scope.tipoAprovisionamiento;
                    }
                });
            });

            if($scope.infoDNConfigurados !== undefined){
               
                let tempServicio = $scope.listaCotizaciones.find(function(elem){return elem.id === $scope.infoDNConfigurados.idCotPlanServicio});
                if (tempServicio !== undefined) {
                    tempServicio.mensajeConfig = true;
                    tempServicio.config = $scope.infoDNConfigurados;
                    tempServicio.isConfigurado = true;
                }

            }

            if($scope.listadoInfoEquiposConfigurados !== undefined && $scope.listadoInfoEquiposConfigurados.length>0){
                angular.forEach($scope.listadoInfoEquiposConfigurados,function(elemento,index){
                    let tempServicio= $scope.listaCotizaciones.find( function(servicio){ return servicio.id === elemento.idCotPlanServicio} ) ;
                    if(tempServicio !== undefined){
                        tempServicio.config=elemento;
                        tempServicio.isConfigurado=true;
                    }
                });
            }

            angular.forEach($scope.listaCotizaciones, function(cotizacion, index) { 
                if( cotizacion.config !== undefined ){
                    if( cotizacion.Info_Equipo !== undefined ){
                        angular.forEach( cotizacion.Info_Equipo.modelo , function( modelo , index ) {
                            if (cotizacion.config.idModelo === modelo.idModelo) {                                        
                                cotizacion.config.modeloSelect = angular.copy(modelo);
                            }
                        });

                        if( cotizacion.config.srvMode ){
                            cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion.find( function (ele) {  return ele.nombre === cotizacion.config.srvMode}); 
                        }else{
                            cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0];
                        }

                        if( cotizacion.config.tipoAprovisionamiento ){
                            if(cotizacion.tipoProvisionamiento !== undefined && cotizacion.tipoProvisionamiento.length>0){
                                cotizacion.config.tipoRedSelect=cotizacion.tipoProvisionamiento.find( function (ele) {  return ele.descripcionAprovisionamiento === cotizacion.config.tipoAprovisionamiento });  
                            }
                        } else {
                            if(cotizacion.tipoProvisionamiento !== undefined && cotizacion.tipoProvisionamiento.length>0){
                                cotizacion.config.tipoRedSelect=cotizacion.tipoProvisionamiento[0];
                            }                                            
                        }
                    } else {
                        if( cotizacion.config.srvMode ){
                            cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion.find( function (ele) {  return ele.nombre === cotizacion.config.srvMode});
                        } else {
                            cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0];
                        }
                    }
                } else {
                    cotizacion.config={}
                    cotizacion.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0];
                }
            });

            //Se agrega la ONT en la primer posicion 
            let indexDeleteService=-1;
            let objectFind={}
            angular.forEach($scope.listaCotizaciones, function(element,index){
                if (element.Info_Equipo) {
                    if (element.Info_Equipo.esEquipo && element.Info_Equipo.tieneAutofind) {
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
                if(servicio.tipo && servicio.tipoCotizacion.includes('Telefonia') ){
                    servicio.servicioTelefonia=true
                    servicio.servicioConfigurable=true
                }else {
                    if (servicio.Info_Equipo) {
                        if( servicio.Info_Equipo.esEquipo && !servicio.Info_Equipo.tieneAutofind ){
                            servicio.servicioEquipo=true
                            servicio.servicioConfigurable=true
                        } else if( !servicio.Info_Equipo.esEquipo && !servicio.Info_Equipo.tieneAutofind) {
                            servicio.servicioDispositivo=true
                            servicio.servicioConfigurable=true
                        }else if(  servicio.Info_Equipo.esEquipo && servicio.Info_Equipo.tieneAutofind){
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
            swal.close();
        }).catch(err => handleError(err));

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
            //QUITAR
            response.data = 
            {
                "success": true,
                "result": {
                    "cotizaciones": {
                        "success": true,
                        "result": {
                            "result": "0",
                            "resultDescription": "Operación Exitosa",
                            "Version": "1.0",
                            "Id_os_sf": "a153f000002m3SHAAY",
                            "CotizacionName": "Inicial v6",
                            "ProntoPago": "809.0",
                            "DNsTotales": "1.0",
                            "PrimeraRenta": "false",
                            "Id_Cot_SitioPlan": "a113f000002EGsTAAW",
                            "IpsTotales": "0",
                            "CotPlanServicios": [{
                                "IdCotPlanServicio": "a0z3f000002fB56AAE",
                                "CotSitioName": "CS9797893",
                                "CotSitioPlanName": "CSP11913068",
                                "DpPlanName": "Inicial v6",
                                "CotPlanServicoName": "CSER32533697",
                                "CotPlanServicoNServicio": "INTERNET 20 - Telefonia TP",
                                "DpPlanEtiquetaBRM": "BRM PLAN - Inicial",
                                "Tipo": "Telefonia TP",
                                "numeroDns": "1",
                                "EsAdicional": "false"
                            }, {
                                "IdCotPlanServicio": "a0z3f000002fB57AAE",
                                "CotSitioName": "CS9797893",
                                "CotSitioPlanName": "CSP11913068",
                                "DpPlanName": "Inicial v6",
                                "CotPlanServicoName": "CSER32533698",
                                "CotPlanServicoNServicio": "INTERNET 20 - Internet TP",
                                "DpPlanEtiquetaBRM": "BRM PLAN - Inicial",
                                "Tipo": "Internet TP",
                                "numeroDns": "0",
                                "EsAdicional": "false"
                            }]
                        }
                    },
                    "equipos": {
                        "success": true,
                        "result": {
                            "result": "0",
                            "resultDescription": "Operación Exitosa.",
                            "Version": "1.0",
                            "Info_Equipo": [{
                                "Id_Cot_PlanServicio": "a0z3f000002fB57AAE",
                                "Id_Cot_ModeloEquipo": "a0w3f000003KGSOAA4",
                                "Id_Equipo": "a0W61000002BIusEAG",
                                "Nombre_Equipo": "ONT 8245 H",
                                "Dispositivo": "ONT",
                                "Es_Equipo": "1",
                                "Es_Microonda": "0",
                                "Tiene_Autofind": "true",
                                "Modelo": [{
                                    "Id_Modelo": "a0i3f0000000ApWAAU",
                                    "Descripcion_Modelo": "HH8245H Big Antenna B"
                                }, {
                                    "Id_Modelo": "a0i3f0000000ApXAAU",
                                    "Descripcion_Modelo": "ZTEF660"
                                }, {
                                    "Id_Modelo": "a0i3f0000000ApYAAU",
                                    "Descripcion_Modelo": "ONT 8245"
                                }, {
                                    "Id_Modelo": "a0i3f0000000ApZAAU",
                                    "Descripcion_Modelo": "ONT 8245 H"
                                }, {
                                    "Id_Modelo": "a0i3f0000000ApaAAE",
                                    "Descripcion_Modelo": "AN5506 TP"
                                }, {
                                    "Id_Modelo": "a0i3f0000000ApbAAE",
                                    "Descripcion_Modelo": "HG8145V5 TP"
                                }, {
                                    "Id_Modelo": "a0i3f000000tsJFAAY",
                                    "Descripcion_Modelo": "ZTEF670"
                                }, {
                                    "Id_Modelo": "a0i3f000000wkqhAAA",
                                    "Descripcion_Modelo": "HG6145F"
                                }]
                            }],
                            "Tipo_Aprovisionamiento": [{
                                "Id_Aprovisionamiento": "1",
                                "Descripcion_Aprovisionamiento": "NATIVO"
                            }, {
                                "Id_Aprovisionamiento": "2",
                                "Descripcion_Aprovisionamiento": "SDN"
                            }]
                        }
                    }
                }
            }
            //
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
                                    if( servicio.Info_Equipo.Es_Equipo ==='1' && servicio.Info_Equipo.tieneAutofind === 'false' ){
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
                if(elemento.Info_Equipo.esEquipo && elemento.Info_Equipo.tieneAutofind){
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
        /*
        var params = new FormData();
        params.append("params.MensajeChatter", 'Activacion servicios de '+$scope.planactivaciontemp.nombre);
        params.append("params.IdPlanServicio",  ontRegistro.idCotPlanServicio);
        params.append("params.Id_OT",  $scope.idotActivacion);
        params.append("params.UnidadNegocio",   $scope.unidadNegocioActivacion);
        */

        $scope.params = {};
        $scope.params.idOt = $scope.idotActivacion;
        $scope.params.idCsp = $scope.objectglobalactivacion.idCsp;
        $scope.params.idUsuario;
        $scope.params.idClaveCliente = $scope.objectglobalactivacion.numeroCuentaFactura;
        $scope.params.folioSistema = $scope.objectglobalactivacion.Folio_OS;
        $scope.params.latitud = "1.0";
        $scope.params.longitud = "1.0";
        $scope.params.idFlujo = "1";
        $scope.params.comentarios = 'Activacion servicios de ' + $scope.objectglobalactivacion.nombre;
    
        
        busquedaService.activacionEquipos($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                /**
                response.data.success=true
                response.data.result={}
                response.data.result.result='0'
                response.data.result.Es_asyncrona='true'
                **/
                if (response.data.respuesta) {
                     
                    if(response.data.result.mensaje=='OK'){

                        if( $scope.unidadNegocioActivacion === '2'  ){
                            //$scope.isProcesandoActivacion='cargando'                                   
                            $scope.statusActivacion='proceso'
                            setTimeout(function(){
                                $scope.validarActivacion()
                            },5000)
                        }else{
                            if(response.data.result.esAsincrona){
                                //$scope.isProcesandoActivacion='cargando'                                   
                                $scope.statusActivacion='proceso'
                                setTimeout(function(){
                                    $scope.validarActivacion()
                                },5000)
                            }
                            
                        }
                        swal.close()
                        swal({
                            text:response.data.result.description,
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
            
            /*
            var params = new FormData();        
            params.append("params.Id_os_sf", $scope.validarActivacionos);            
            */
            $scope.params = {};
            $scope.params.idCsp = $scope.validarActivacionos;
            $scope.params.idOt = $scope.idotActivacion;
            busquedaService.validarActivacion($scope.params).then(function success(response) {
                console.log(response);
          
                if($scope.pruebaPeticionActivacion=='true'){
                    response.data.result.estatusActivacion='3'
                }
                /****/
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        
                        /**
                        1 - Activación Exitosa
                        2 - En espera (Se reconsume)
                        Cualquier otro caso -  Error en la activación
                        **/
                        if(response.data.result.estatusActivacion ===1){
                            $scope.consultarValidacionCuentaAsync=true
                            $scope.statusActivacion='true'    
                            $scope.planActivo='true'                                                                                                
                            $scope.objectglobalactivacion.cuentaActiva='true'

                        }else if(response.data.result.estatusActivacion ===2 ){
                            setTimeout(function(){
                                $scope.validarActivacion()
                            },5000)
                        }else{
                            $scope.consultarValidacionCuentaAsync=true
                            $scope.statusActivacion='error'       
                            $scope.Network_code=response.data.result.Network_code                  
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

        /*
        $scope.params = {};
        $scope.listaDn = [];
        angular.forEach(servicio.config.dns , function(element,index){
            if(element.valor === "1") {
                $scope.params.dnPrincipal = element.dn;
            }
            $scope.listaDn.push(element.dn);
        });
        $scope.params.SRV_Mode = servicio.config.tipoEquipoSelect.nombre;
        $scope.params.Id_OT =  $scope.idotActivacion;
        $scope.params.Id_Cot_PlanServicio = servicio.IdCotPlanServicio;
        $scope.params.DN = $scope.listaDn;
        */
        
        $scope.params = {};
        $scope.params.idOt = $scope.idotActivacion;
        $scope.params.idPlanServicio = servicio.id;
        $scope.params.dnPrincipal ;
        $scope.params.srvMode = servicio.config.tipoEquipoSelect.nombre;
        $scope.listaDn = [];
        angular.forEach(servicio.config.dns , function(element,index){
            if(element.valor === "1") {
                $scope.params.dnPrincipal = element.dn;
            }
            $scope.listaDn.push(element.dn);
        });
        $scope.params.dns = $scope.listaDn;

        busquedaService.configurarDns($scope.params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                   if(response.data.result.mensaje === 'OK'){
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
