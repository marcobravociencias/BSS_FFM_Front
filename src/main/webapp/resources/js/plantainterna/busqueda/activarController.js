
app.activacionController=function($scope, $q, busquedaService){
  
    $scope.listaServiciosCot = [];
    $scope.listaTipoEquipos = [];

    $scope.tituloActivacion = '';
    $scope.iconActivacion = 0;

    $scope.listadoTipoEquipoActivacion=[{id:1 ,nombre:'Bridge'},{id:2 ,nombre:'Router'} ]
    $scope.isProcesandoActivacion='noshow'

    $scope.consultarValidacionCuentaAsync=false
    $scope.cspglobalactivar;
    $scope.osglobalactivar;

    
    $scope.keyCodigoPostalDns=false
    $scope.keyCantidadDns=false


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
        


        $scope.equipo = {};
        $scope.equipo.idOt = $scope.idotActivacion;
        $scope.equipo.idCotSitioPlan = servicio.infoEquipoServ.idCotPlanServicio;
        $scope.equipo.idCotPlanServicio = servicio.id;
        $scope.equipo.idCotModeloEquipo = servicio.infoEquipoServ.idCotModeloEquipo;
        $scope.equipo.tipoEquipo = servicio.infoEquipoServ.tipoDispositivo;
        $scope.equipo.svrMode = servicio.config.tipoEquipoSelect.nombre;
        $scope.equipo.numeroSerie = servicio.config.numSerie;
        $scope.equipo.mac = servicio.config.mac;
        $scope.equipo.idModelo = servicio.config.modeloSelect.idModelo;
        $scope.equipo.modelo = servicio.config.modeloSelect.modelo;

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
                "Id_Cot_ModeloEquipo"   : servicio.infoEquipoServ.Id_Cot_ModeloEquipo,
                "Tipo_Dispositivo"      : servicio.infoEquipoServ.Dispositivo,
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
                "Id_Cot_ModeloEquipo" :servicio.infoEquipoServ.Id_Cot_ModeloEquipo,
                "Frame"               :servicio.config.Frame,//
                "MAC"                 :servicio.config.MAC,
                "Id_Modelo"           :servicio.config.modeloSelect.Id_Modelo ,
                "Modelo"              :servicio.config.modeloSelect.Descripcion_Modelo ,
                "No_Serie"            :servicio.config.No_Serie,
                "Puerto"              :servicio.config.Puerto,//
                "Id_OLT"              :servicio.config.Id_OLT,
                "OLT"                 :servicio.config.OLT,//
                "Slot"                :servicio.config.Slot,//
                "Tipo_Equipo"         :servicio.infoEquipoServ.Dispositivo,
                "SRV_Mode"            :servicio.config.tipoEquipoSelect.nombre,
                "Tipo_red"            :servicio.config.tipoRedSelect.Descripcion_Aprovisionamiento//
            }]
        ;
        */
        
        $scope.ont = {};
        $scope.ont.idOt = $scope.idotActivacion;
        $scope.ont.idCotSitioPlan = servicio.infoEquipoServ.idCotPlanServicio;//
        $scope.ont.idCotPlanServicio = servicio.id;
        $scope.ont.idCotModeloEquipo = servicio.infoEquipoServ.idCotModeloEquipo;
        $scope.ont.tipoEquipo = servicio.infoEquipoServ.tipoDispositivo;
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
        $scope.listaTipoEquipos = [];
        $scope.tipoAprovisionamiento = [];
        $scope.listaServiciosCot = [];

        $q.all([
			busquedaService.consultarEquiposConfigurados($scope.params),
			busquedaService.consultarEquipos($scope.params),
			busquedaService.consultarCotizacionesEquipos($scope.params)
		]).then(function(results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
					if (results[0].data.result) {
                        $scope.listadoInfoEquiposConfigurados = results[0].data.result.equiposConfifurados.servicios ? results[0].data.result.equiposConfifurados.servicios : [];                         
                    }
                }
            }
            
            if (results[1].data !== undefined) {//Consulta de equipos
                if (results[1].data.respuesta) {
					if (results[1].data.result) {
                        $scope.listaTipoEquipos = results[1].data.result.detalleEquipos;
                        $scope.tipoAprovisionamiento = results[1].data.result.tipoAprovisionamiento;
                    }
                }
            }

            if (results[2].data !== undefined) {
                if (results[2].data.respuesta) {
					if (results[2].data.result) {
                        $scope.listaServiciosCot = results[2].data.result.detalleCotizacion.cotPlanServicios;
                        if($scope.listaServiciosCot !=undefined && $scope.listaServiciosCot.length >0){
                            $scope.listaServiciosCot = $scope.listaServiciosCot.map(function(e){e.isConfigurado=false;  ;return e;})                        
                        }
                    }
                }
            }
                
            angular.forEach($scope.listaServiciosCot, function(servicio, index) {
                servicio.mostrarInfo = true;
                servicio.tipoActiviacion = 'Bridge';
                servicio.tipoCotizacion = servicio.nombre.split("-")[1];//PENDIENTE
                angular.forEach($scope.listaTipoEquipos, function(equipo, index) {
                    if (servicio.id === equipo.idCotPlanServicio) {
                        angular.forEach(equipo.modelo, function(model, index) {
                            if (equipo.nombreEquipo === model.modelo) {
                                equipo.modeloSelect = model;
                            }
                        });
                        servicio.infoEquipoServ = equipo;
                        servicio.tipoProvisionamiento = $scope.tipoAprovisionamiento;
                    }
                });
            });

     

            if($scope.listadoInfoEquiposConfigurados !== undefined && $scope.listadoInfoEquiposConfigurados.length>0){
                angular.forEach($scope.listadoInfoEquiposConfigurados,function(elemento,index){
                    let tempServicio= $scope.listaServiciosCot.find( function(servicio){ return servicio.id === elemento.idCotPlanServicio} ) ;
                    if(tempServicio !== undefined){
                        tempServicio.config=elemento;
                        tempServicio.isConfigurado=true;
                    }
                });        
            }

          
           $scope.infoDNConfigurados = results[0].data.result.equiposConfifurados.dns ? results[0].data.result.equiposConfifurados.dns : undefined;
            if($scope.infoDNConfigurados !=undefined && $scope.infoDNConfigurados.dns !=undefined &&  $scope.infoDNConfigurados.dns.length>0){
                angular.forEach($scope.infoDNConfigurados.dns, function(el,indexj){
                    if (el.dn === $scope.infoDNConfigurados.dnPrincipal) {
                        el.principalDn = "1";
                    } else {
                        el.principalDn = "0";
                    }
                });
            }

            if($scope.infoDNConfigurados !== undefined){               
                let tempServicio = $scope.listaServiciosCot.find(function(elem){return elem.id === $scope.infoDNConfigurados.idCotPlanServicio});
                if (tempServicio !== undefined) {
                    tempServicio.mensajeConfig = true;
                    tempServicio.config = $scope.infoDNConfigurados;
                    tempServicio.isConfigurado = true;
                }
            }

            angular.forEach($scope.listaServiciosCot, function(servicioInd, index) { 
                if( servicioInd.config !== undefined ){
                    if( servicioInd.infoEquipoServ !== undefined ){
                        angular.forEach( servicioInd.infoEquipoServ.modelo , function( modelo , index ) {
                            if (servicioInd.config.idEquipo === modelo.idModelo) {                                        
                                servicioInd.config.modeloSelect = angular.copy(modelo);
                            }
                        });

                        if( servicioInd.config.srvMode ){
                            servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion.find( function (ele) {  return ele.nombre === servicioInd.config.srvMode}); 
                        }else{
                            servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0];
                        }

                        if( servicioInd.config.tipoAprovisionamiento ){
                            if(servicioInd.tipoProvisionamiento !== undefined && servicioInd.tipoProvisionamiento.length>0){
                                servicioInd.config.tipoRedSelect=servicioInd.tipoProvisionamiento.find( function (ele) {  return ele.descripcionAprovisionamiento === servicioInd.config.tipoAprovisionamiento });  
                            }
                        } else {
                            if(servicioInd.tipoProvisionamiento !== undefined && servicioInd.tipoProvisionamiento.length>0){
                                servicioInd.config.tipoRedSelect=servicioInd.tipoProvisionamiento[0];
                            }                                            
                        }
                    } else {
                        if( servicioInd.config.srvMode ){
                            servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion.find( function (ele) {  return ele.nombre === servicioInd.config.srvMode});
                        } else {
                            servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0];
                        }
                    }
                } else {
                    servicioInd.config={}
                    servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0];
                }
            });

            //Se agrega la ONT en la primer posicion 
            let indexDeleteService=-1;
            let objectFind={}
            angular.forEach($scope.listaServiciosCot, function(element,index){
                if (element.infoEquipoServ) {
                    if (element.infoEquipoServ.esEquipo && element.infoEquipoServ.tieneAutofind) {
                        indexDeleteService=index
                        objectFind=angular.copy(element)
                    }
                }
            });
            //Se agrega la ONT en la primer posicion 
            if(indexDeleteService !== -1){
                $scope.listaServiciosCot.splice(indexDeleteService,1);
                $scope.listaServiciosCot.unshift(objectFind)
            }

            //Se agrega bandera para validar los posibles servicios a configurar
            angular.forEach($scope.listaServiciosCot, function(servicio,index){
                if(servicio.nombre && servicio.nombre.includes('Telefonia') ){
                    servicio.servicioTelefonia=true
                    servicio.servicioConfigurable=true
                }else {
                    if (servicio.infoEquipoServ) {
                        if( servicio.infoEquipoServ.esEquipo && !servicio.infoEquipoServ.tieneAutofind ){
                            servicio.servicioEquipo=true
                            servicio.servicioConfigurable=true
                        } else if( !servicio.infoEquipoServ.esEquipo && !servicio.infoEquipoServ.tieneAutofind) {
                            servicio.servicioDispositivo=true
                            servicio.servicioConfigurable=true
                        }else if(  servicio.infoEquipoServ.esEquipo && servicio.infoEquipoServ.tieneAutofind){
                            servicio.servicioONT=true
                            servicio.servicioConfigurable=true
                        }
                    }
                }                       
            });
            $scope.validarServiciosConfigurados()

            console.log($scope.listaServiciosCot);
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
                        $scope.listaServiciosCot = response.data.result.cotizaciones.result.CotPlanServicios;
                        $scope.listaTipoEquipos = response.data.result.equipos.result.infoEquipoServ;
                        $scope.objetoCotizacion =              
                        angular.forEach($scope.listaServiciosCot, function(servicioInd, index) {
                            servicioInd.mostrarInfo = true;
                            servicioInd.tipoActiviacion = 'Bridge';
                            angular.forEach($scope.listaTipoEquipos, function(equipo, index) {
                                if (servicioInd.IdCotPlanServicio === equipo.Id_Cot_PlanServicio) {
    
                                    angular.forEach(equipo.Modelo, function(model, index) {
                                        if (equipo.Nombre_Equipo === model.Descripcion_Modelo) {
                                            equipo.modeloSelect = model;                                                                        
                                        }
                                    });
                                    servicioInd.infoEquipoServ = equipo;
                                    servicioInd.tipoProvisionamiento=response.data.result.equipos.result.Tipo_Aprovisionamiento                                
                                }
                            });
                        });
             
                        //Se hace merge de lo configurado con lo consultado
                       // $scope.listadoInfoDNConfigurados=undefined;
                       // $scope.listadoInfoEquiposConfigurados=undefined;
                        if($scope.listadoInfoDNConfigurados !== undefined && $scope.listadoInfoDNConfigurados.length>0){
                            angular.forEach($scope.listadoInfoDNConfigurados,function(elemento,index){
                                let tempServicio= $scope.listaServiciosCot.find( function(elem){ return elem.IdCotPlanServicio === elemento.Id_Cot_PlanServicio} ) ;
                                if(tempServicio !== undefined){
                                    tempServicio.mensajeConfig = true;
                                    tempServicio.config=elemento
                                    tempServicio.isConfigurado=true

                                }
                            })

                        }  
                         
                        if($scope.listadoInfoEquiposConfigurados !== undefined && $scope.listadoInfoEquiposConfigurados.length>0){
                            angular.forEach($scope.listadoInfoEquiposConfigurados,function(elemento,index){
                                let tempServicio= $scope.listaServiciosCot.find( function(servicio){ return servicio.IdCotPlanServicio === elemento.Id_Cot_PlanServicio} ) ;
                                if(tempServicio !== undefined){
                                    tempServicio.config=elemento
                                    tempServicio.isConfigurado=true
                                }
                            })
                        }
                        
                        angular.forEach($scope.listaServiciosCot, function(servicioInd, index) { 
                            if( servicioInd.config !== undefined ){
                                if( servicioInd.infoEquipoServ !== undefined ){
                                    angular.forEach( servicioInd.infoEquipoServ.Modelo , function( modelo , index ) {
                                        if (servicioInd.config.Id_Modelo === modelo.Id_Modelo) {                                        
                                            servicioInd.config.modeloSelect = angular.copy(modelo);
                                        }
                                    });

                                    if( servicioInd.config.SRV_Mode ){
                                        servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion.find( function (ele) {  return ele.nombre === servicioInd.config.SRV_Mode})  
                                    }else{
                                        servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0]
                                    }  
                                    
                                    if( servicioInd.config.Tipo_Aprovisionamiento ){
                                        if(servicioInd.tipoProvisionamiento !== undefined && servicioInd.tipoProvisionamiento.length>0){
                                            servicioInd.config.tipoRedSelect=servicioInd.tipoProvisionamiento.find( function (ele) {  return ele.Descripcion_Aprovisionamiento === servicioInd.config.Tipo_Aprovisionamiento })  
                                        }
                                    }else{
                                        if(servicioInd.tipoProvisionamiento !== undefined && servicioInd.tipoProvisionamiento.length>0){
                                            servicioInd.config.tipoRedSelect=servicioInd.tipoProvisionamiento[0]
                                        }                                            
                                    }
                                }else{
                                    if( servicioInd.config.SRV_Mode ){
                                        servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion.find( function (ele) {  return ele.nombre === servicioInd.config.SRV_Mode})  
                                    }else{
                                        servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0]
                                    }  
                                }
                            }else{
                                servicioInd.config={}
                                servicioInd.config.tipoEquipoSelect=$scope.listadoTipoEquipoActivacion[0]
                            }    
                                                
                        });

                        //Se agrega la ONT en la primer posicion 
                        let indexDeleteService=-1;
                        let objectFind={}
                        angular.forEach($scope.listaServiciosCot, function(element,index){
                            if (element.infoEquipoServ) {
                                if (element.infoEquipoServ.Es_Equipo === "1" && element.infoEquipoServ.Tiene_Autofind === "true") {
                                    indexDeleteService=index
                                    objectFind=angular.copy(element)
                                }
                            }
                        });
                        //Se agrega la ONT en la primer posicion 
                        if(indexDeleteService !== -1){
                            $scope.listaServiciosCot.splice(indexDeleteService,1);
                            $scope.listaServiciosCot.unshift(objectFind)
                        }


                        //Se agrega bandera para validar los posibles servicios a configurar
                        angular.forEach($scope.listaServiciosCot, function(servicio,index){
                            if(servicio.Tipo && servicio.Tipo.includes('Telefonia') ){
                                servicio.servicioTelefonia=true
                                servicio.servicioConfigurable=true
                            }else {
                                if (servicio.infoEquipoServ) {
                                    if( servicio.infoEquipoServ.Es_Equipo ==='1' && servicio.infoEquipoServ.tieneAutofind === 'false' ){
                                        servicio.servicioEquipo=true
                                        servicio.servicioConfigurable=true
                                    } else if( servicio.infoEquipoServ.Es_Equipo ==='0' && servicio.infoEquipoServ.Tiene_Autofind === 'false'  ) {
                                        servicio.servicioDispositivo=true
                                        servicio.servicioConfigurable=true
                                    }else if(  servicio.infoEquipoServ.Es_Equipo ==='1' && servicio.infoEquipoServ.Tiene_Autofind === 'true' ){
                                        servicio.servicioONT=true
                                        servicio.servicioConfigurable=true
                                    }
                                }
                            }                       
                        });
                        $scope.validarServiciosConfigurados()
                      

                        console.log($scope.listaServiciosCot);
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
        let cantidadConfigurables=$scope.listaServiciosCot.filter((e)=> e.servicioConfigurable).length
        let cantidadConfigurados= $scope.listaServiciosCot.filter((e)=> e.isConfigurado).length        
        $scope.isTodosConfigurado=( cantidadConfigurables === cantidadConfigurados  ) ? true :false
    }
    $scope.validarGenerarDns=function(servicio){
        let isErrorDns=false
        var mensaje = "VALIDA LOS SIGUIENTES CAMPOS: ";
        
        if( !servicio.codigopostalplanactivacion ){
            isErrorDns=true
            mensaje += "<br/> * C&oacute;digo postal";
        }

        if( !servicio.numDNS){
            isErrorDns=true
            mensaje += "<br/> * Cantidad dns";
        }

        if( isErrorDns ) {
            mostrarMensajeInformativo( mensaje )
        }
        return isErrorDns;
    }
    $scope.generarDnsActivacion = function(servicio) {
        
        let isValidateDns= $scope.validarGenerarDns(servicio)
        if(!isValidateDns){
            swal({ text: 'Buscando datos ...', allowOutsideClick: false });
            swal.showLoading();
            
            let params={
                'codigoPostal':servicio.codigopostalplanactivacion,
                'cantidad':servicio.numDNS
            }      
            servicio.config.dns=[]  
            busquedaService.generarDnsActivacion(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    if(response.data.codigoEstatusService < 300){
                        if (response.data.respuesta) {
                            if (response.data.result != undefined ) {   
                                let dnsListado=response.data.result.detalleDns
                                if(dnsListado != undefined && dnsListado.length > 0){
                                    
                                    angular.forEach( dnsListado ,function(elem,index){
                                        servicio.config.dns.push({
                                            'dn':elem.dn ,
                                            'principalDn':'0' ,
                                            'idTransaccion':elem.idTransaccion ,
                                            'idStatus':elem.idStatus
                                        })
                                    })
                                    swal.close()
                                    mostrarMensajeExitoAlert('DNS generados correctamente')
                                }else{
                                    mostrarMensajeInformativo('No se encontraron DNS');
                                }                                                                      
                            }else{
                                mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                                swal.close();
                            }
                        } else {
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                            swal.close();
                        }
                    }else{
                        mostrarMensajeInformativo('No se encontraron dns');
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert("Ha ocurrido un error en la consulta de datos");
                    swal.close();
                }
           
            }, function error(response) {
                swal.close();
            });
        }
    

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
        angular.forEach($scope.listaServiciosCot, function(elemento,index){
            if(elemento.infoEquipoServ !== undefined){
                if(elemento.infoEquipoServ.esEquipo && elemento.infoEquipoServ.tieneAutofind){
                    indexOnt=index
                }
            }
        })
        if(indexOnt=== undefined){
            mostrarMensajeErroActivacion('No se encontr\u00F3 ONT para la activaci\u00F3n')                               
            return false
        }
        let ontRegistro= $scope.listaServiciosCot[indexOnt]
    
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

    
    $scope.validarConfiguracionDNS=function(servicio){
        let isErrorDns=false
        var mensaje = "VALIDA LOS SIGUIENTES CAMPOS: ";
        
        if( !servicio.codigopostalplanactivacion ){
            isErrorDns=true
            mensaje += "<br/> * C&oacute;digo postal";
        }

        if( !servicio.numDNS){
            isErrorDns=true
            mensaje += "<br/> * Cantidad dns";
        }
        if( servicio.config.dns !=undefined && servicio.config.dns.length<=0 ){
            isErrorDns=true
            mensaje += "<br/> * Sin dns encontrados";
        }else{
                      
            let principalObj= servicio.config.dns.find(function(e){  
                return e.principalDn=='1'
            })
            
            if( principalObj ==undefined  ){
                isErrorDns=true
                mensaje += "<br/> * Selecciona un dn principal";
            }
        }


        if( isErrorDns ) {
            mostrarMensajeInformativo( mensaje )
        }
        return isErrorDns;
    }
    $scope.configurarDns = function(servicio) {

        let isValidateDns= $scope.validarConfiguracionDNS(servicio)
       
        if( !isValidateDns ){
            console.log(servicio);
            swal({ text: 'Configurando DNS ...', allowOutsideClick: false });
            swal.showLoading();
    
            let params={
                "idOt":$scope.idotActivacion,
                "idPlanServicio": servicio.id,
                "dnPrincipal": '',
                "srvMode": servicio.config.tipoEquipoSelect.nombre,
                "dns": []
            }
    
            angular.forEach(servicio.config.dns , function(element,index){
                if(element.principalDn === "1") 
                    params.dnPrincipal = element.dn;
                
                params.dns.push(element.dn);
            });
    
            busquedaService.configurarDns( params ).then(function success(response) {
                console.log(response);        
                if (response.data !== undefined) {
                    if(response.data.codigoEstatusService < 300){
                        if (response.data.respuesta) {
                            if (response.data.codigoEstatusService == 200 ) {   
                                swal.close();
                                swal({
                                    text: 'Se configuraron correctamete los DNS ',
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
                                mostrarMensajeErrorAlert('Ha ocurrido un error al configurar los DNS');
                                swal.close();
                            }
                        } else {
                            mostrarMensajeErrorAlert('Ha ocurrido un error al configurar los DNS');
                            swal.close();
                        }
                    }else{
                        mostrarMensajeErrorAlert('Ha ocurrido un error al configurar los DNS');
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert('Ha ocurrido un error al configurar los DNS');
                    swal.close();
                }

            }, function error(response) {
                swal.close();
            });
        }
    
    }



    $scope.mostrarOcultarInfo = function(info) {
        if (info.mostrarInfo) {
            info.mostrarInfo = false;
        } else {
            info.mostrarInfo = true;
        }
    }

    $scope.marcarPrincipal = function(dnsListado, index) {
        dnsListado=dnsListado.map((e)=>{e.principalDn='0'; return e;})
        dnsListado[index].dnPrincipal = '1';
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
    /****/
    $scope.showSearch = true;

    $scope.mostrarDetalleActivarOs({
        canalVenta: null,
        comentariosOs: null,
        cp: "04519",
        creadoPor: null,
        cuentaActiva: "false",
        detalleCotSitioPlan: null,
        detalleCotizacion: null,
        detalleCuentaFactura: null,
        detalleOportunidad: null,
        detalleSitio: null,
        editadoPor: null,
        estatus: "Agendado",
        fechaAgendada: null,
        id: "a153C0000015MgSQAU",
        idCsp: "a113C0000008JhlQAE",
        idOt: "368648",
        keyObject: "OS",
        motivoCancelacion: null,
        nombre: "OS-6949902",
        numeroCuentaFactura: "0290003453",
        osConfirmada: null,
        propietario: null,
        propietarioOportunidad: null,
        tipoOrden: null,
        tscompletado: null,
        tsconfirmado: null,
        turnoAg: null,
        unidadNegocio: "2"
    })

    $scope.showDetalleActivar=true;


    $scope.consultarAutofindActivacion = function(servicio) {
        if(servicio.config.numSerie){
            if (!swal.isVisible()) {
                swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
                swal.showLoading();
            }
            let params ={"numeroSerie" : servicio.config.numSerie }

            busquedaService.consultarAutofindActivacion(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    if(response.data.codigoEstatusService < 300){
                        if (response.data.respuesta) {
                            if (response.data.result != undefined ) {   
                                if(response.data.result.detalleAutofind != undefined ){
                                    let autofindres=response.data.result.detalleAutofind;
                                    
                                    servicio.config.numSerie=autofindres.serialNumber
                                    if(servicio.config.red == undefined)
                                        servicio.config.red={}

                                        
                                    servicio.config.red.nombreOlt=autofindres.olt
                                    servicio.config.red.idOlt=autofindres.idOlt
                                    servicio.config.red.frame=autofindres.frame
                                    servicio.config.red.slot=autofindres.slot
                                    servicio.config.red.puerto=autofindres.port
                                    swal.close()
                                    mostrarMensajeExitoAlert('Carga de datos correcta')

                                    //  idModel: "112"
                                    //  ipOlt: "10.180.210.139"
                                    //  model: "HG8145V5"                                
                                    //  version: "V5R019C00S100"
                                }else{
                                    mostrarMensajeWarningValidacion('No se encontraron datos para la serie capturada');
                                    swal.close();  
                                }                                                                                    
                            }else{
                                mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                                swal.close();
                            }
                        } else {
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                            swal.close();
                        }
                    }else{
                        mostrarMensajeWarningValidacion('No se encontraron datos para la serie capturada');
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarningValidacion("No se encontro informaci\u00f3n");
                    swal.close();
                }
            }, function error(response) {
                swal.close();
            });
        }else{
            mostrarMensajeWarningValidacion("Captura el n\u00FAmero de serie");
        }       
    }




    
    $scope.consultarSerieExistenteActivacion = function(servicio,banderaAutofind) {
        if(servicio.config && servicio.config.numSerie){
            if (!swal.isVisible()) {
                swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
                swal.showLoading();
            }
            let  params ={"numeroSerie" : servicio.config.numSerie};
           
            busquedaService.consultarSerieExistenteActivacion(params).then(function success(response) {
                console.log(response);
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result != undefined ) {                            
                            if(response.data.result.detalleNumeroSerie !=undefined){
                                if(response.data.result.detalleNumeroSerie.result=='0'){
                                    $scope.getMacBusquedaPorSerie(servicio,banderaAutofind)
                                }else{                                    
                                    mostrarMensajeWarningValidacion(response.data.result.detalleNumeroSerie.descripcion);
                                }
                            }else{
                                mostrarMensajeWarningValidacion("Ha ocurrido un error al buscar la serie");
                                swal.close();
                            }
                        }else{
                            mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                            swal.close();
                        }
                    } else {
                        mostrarMensajeWarningValidacion(response.data.resultDescripcion);
                        swal.close();
                    }
                } else {
                    mostrarMensajeWarningValidacion("No se encontro informaci\u00f3n");
                    swal.close();
                }
            }, function error(response) {
                swal.close();
            });
        }else{
            mostrarMensajeWarningValidacion("Captura el n\u00FAmero de serie");
        }       
    }
    
    $scope.getMacBusquedaPorSerie = function(servicio,banderaAutofind) {
        if (!swal.isVisible()) {
            swal({ text: 'Cargando informaci\u00f3n ...', allowOutsideClick: false });
            swal.showLoading();
        }
        let params ={"numeroSerie" : servicio.config.numSerie }
        busquedaService.consultarMacNumeroSerie(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result !=undefined) {
                        if(response.data.result.detalleMac != undefined && response.data.result.detalleMac.mac ){
                            servicio.config.mac = response.data.result.detalleMac.mac;
                            if(banderaAutofind){
                                $scope.consultarAutofindActivacion( servicio )
                            }else{
                                swal.close()
                                mostrarMensajeExitoAlert('MAC encontrada')
                            }
                        }else{
                            mostrarMensajeErrorAlertAjax('No se encontraron datos de MAC' )
                            swal.close()
                        }
                    } else {
                        mostrarMensajeErrorAlertAjax('Ha ocurrido un error al consultar la MAC' )
                        swal.close()
                    }
                } else {
                    mostrarMensajeErrorAlertAjax(response.data.resultDescripcion)
                    swal.close()
                }
            } else {
                mostrarMensajeErrorAlertAjax( 'Ha ocurrido un error al consultar la MAC' )
                swal.close()
            }
        })
    }   

    
    $scope.blurSerieOnt=function(servicioConfig){
        let banderaAutofind=true
        $scope.consultarSerieExistenteActivacion(servicioConfig,banderaAutofind)
    }
    $scope.blurSerieEquipoServicio=function(servicioConfig){
        let banderaAutofind=false
        $scope.consultarSerieExistenteActivacion(servicioConfig,banderaAutofind)
    }

}
