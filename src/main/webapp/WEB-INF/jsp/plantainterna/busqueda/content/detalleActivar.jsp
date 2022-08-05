<div ng-show="showDetalleActivar" class="header-back-title col-3">
    <div ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
</div>
<div ng-show="showDetalleActivar" class="header-back-title col-6   d-flex justify-content-md-center align-items-center ">
    <div  class="container-estatusactivacion text-center ">
        <span class="badge-mensaje-activacion cuenta-noactiva-badge"  ng-if="statusActivacion =='false' ||  statusActivacion =='' || statusActivacion === undefined || statusActivacion ==='null' || statusActivacion===null" >La cuenta no esta activa</span>
        <span class="badge-mensaje-activacion cuenta-activa-badge"  ng-if="statusActivacion ==='true'" >Cuenta activada correctamente</span>
        <span class="statusactivacion-top statusactivacion-enproceso" ng-if="statusActivacion=='proceso'" >La cuenta esta en proceso de activaci&oacute;n</span>
        <span class="statusactivacion-top statusactivacion-error    " ng-if="statusActivacion=='error'" >Error en la activaci&oacute;n</span><br />
        <span class="statusactivacion-top statusactivacion-error    " ng-if="statusActivacion=='error'" ng-bind="Network_code" ></span>
    </div>    
</div>
<div ng-show="showDetalleActivar" class="header-back-title col-3">
   
    <div class="alinear-derecha">
        <div class="iconsf-container">
            <img ng-show="iconActivacion === 0" class="img-csp img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/csp.png" alt="">
            <img ng-show="iconActivacion === 1" class="img-os img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/os.png" alt="">
        </div>
        <div class="textcontainer-header">
            <span class="text-title-elementoh" ng-bind="tituloActivacion"></span>
            <span class="title-regresar-generic" id="id_cot_sitio_plan_detalle_activar"></span>
        </div>
    </div>
</div>

<div ng-show="showDetalleActivar" class="col-12 separador-according style_detalle_activar">
 
    <div class="content-activacion row">
        <div class="col-4">                     
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <b class="title-info-services"> Cotizaci&oacute;n:</b> &nbsp; &nbsp;
                    <span id="cuenta_factura" class="nombre-cotservicios content_info_ot style_nota_tint" ng-bind="objetoCotizacion.nombrePaquete"> </span>
                </div> 
                        
            </div>  
            <div class="row justify-content-center">              
                <div class="col-md-6">
                    <b class="title-info-services">Megas subida:</b>&nbsp; &nbsp;
                    <span id="nombre_plan" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.megasSubida | number)"> </span>
                </div>
                <div class="col-md-6">
                    <b class="title-info-services"> Megas bajada:</b> &nbsp; &nbsp;
                    <span id="cuenta_factura" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.megasBajada | number)"> </span>
                </div>
            </div>
            <div class="row justify-content-center">              
                <div class="col-md-6">
                    <b class="title-info-services">DNS totales:</b>&nbsp; &nbsp;
                    <span id="nombre_plan" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.numDns | number )"> </span>
                </div>
                <div class="col-md-6">
                    <b class="title-info-services"> Ips totales:</b> &nbsp; &nbsp;
                    <span id="cuenta_factura" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.numIps | number )"> </span>
                </div>
            </div>
            <div class="row ">              
                <div class="col-md-12">
                    <span class="noconfigurables" ng-click="openModalNoConfig()" ></span>
                    <b class="title-info-services"> Pronto pago:</b> &nbsp; &nbsp;
                    <span id="cuenta_factura" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.prontoPago ? objetoCotizacion.prontoPago : '0' | currency )"> </span>
                </div>    
            </div>
            <div class="divider-detalle-table"></div>
            <table id="table-resumen-servicios" class="table table-sm dataTable">
                <thead>
                    <tr>
                        <th width="25%">Folio </th>
                        <th width="30%">Servicio</th>
                        <th width="25%">Tipo</th>
                        <th width="20%">Config</th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="detail-trservicio" ng-if="servicio.servicioConfigurable" ng-repeat="servicio in listaServiciosCot track by $index">
                  
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.folio}}</span></td>
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.nombre}}</span></td>
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.tipo}}</span></td>
                        <td class="text-center">                           
                            <i ng-if="servicio.isConfigurado" class="fas fa-check-circle mensaje-servicio-config-table" ></i> 
                            <i ng-if="!servicio.isConfigurado" class="fas fa-exclamation-circle mensaje-servicio-noconfig-table" ></i>     
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--button ng-click="activacionEquipos()"  ng-if="planActivo!== 'true' &&  isProcesandoActivacion!=='cargando'" class="activar-servicios  btn btn-sm">Activar</button-->
            <span  class="text-activacion-warning" ng-if="!isTodosConfigurado">Para activar necesitas configurar todos los servicios</span>
            <button ng-click="activacionEquipos()"  ng-disabled="!isTodosConfigurado || statusActivacion=='proceso'"  ng-if="planActivo !=='true'"  class="activar-servicios  btn btn-sm">Activar</button>
            <!--div ng-if="planActivo !== 'true' && isProcesandoActivacion==='cargando'" class="sk-chase"-->
            <div class="sk-chase" ng-if="statusActivacion=='proceso'">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>

            <span  class="text-cargandoasincrona" ng-if="statusActivacion=='proceso'">La activaci&oacute;n est&aacute; en proceso</span>
            <!--span ng-if="planActivo !== 'true' && isProcesandoActivacion==='cargando'" class="text-cargandoasincrona">La activaci&oacute;n est&aacute; en proceso</span-->
            <span  ng-if="planActivo == 'true'" class="badge-mensaje-activacion cuenta-activa-badge ng-scope" ng-if="statusActivacion ==='true'">El plan ya se encuentra activo</span>
        </div>
        <div class="col-8 style_content_activacion_ord_serv">
            <!--h5 class="style_primer_texto_act_ser">Plan Internet_50</h5-->
            <div class="content-card-servicio" ng-if="servicioIndCot.servicioConfigurable"  ng-repeat="servicioIndCot in listaServiciosCot">


                <div class="style_content_dn_act_ord_serv" ng-if="servicioIndCot.servicioDispositivo">
                        <div ng-click="mostrarOcultarInfo(servicioIndCot)" class="col-title-header">
                            <i ng-if="servicioIndCot.isConfigurado" class="fas fa-check-circle mensaje-servicio-config" ></i> 
                            <i ng-if="!servicioIndCot.isConfigurado" class="fas fa-exclamation-circle mensaje-servicio-noconfig" ></i>         
                            <span class="style_seg_tex_act_ser" ng-bind="'Equipo *    '+servicioIndCot.folio+' - '+ servicioIndCot.nombre"></span>            
                            <!--span class="badge-mensaje-equipo sin-configuracion" >Sin configuraci&oacute;n</span-->

                            <i class="icon-mostrar-equipo" ng-class="servicioIndCot.mostrarInfo ? 'fas fa-angle-down' : 'fas fa-angle-up'" ></i>                                                      
                        </div>
                        <div class="col-content-card-equipo "  ng-if="servicioIndCot.mostrarInfo">
                
                            <table class="table table-equipo-config-ind">
                                <thead>
                                    <tr>
                                        <th scope="col">Tipo Equipo</th>
                                        <th scope="col">No Serie</th>
                                        <th scope="col">MAC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="servicioIndCot.config.modeloSelect" ng-options="model.modelo for model in servicioIndCot.infoEquipoServ.modelo track by model.idModelo">
                                                </select>                                        
                                            </div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="No Serie" ng-model="servicioIndCot.config.numSerie" ng-blur="blurSerieEquipoServicio(servicioIndCot)" class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td>
                                            <div>
                                                <input ng-disabled="true" type="text" placeholder="Mac" ng-model="servicioIndCot.config.mac" maxlength="17"  class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <!--button class="btn btn-sm boton-activacion"  ng-if="planActivo !=='true' && statusActivacion !=='proceso'"  ng-click="configurarDispositivosNuevo(servicioIndCot)">Configurar </button-->
                            </div>
                        </div>   
                        <button ng-if="servicioIndCot.isConfigurado" title="configurar" type="button" class="btn btn-primary btn-floating btn-configuracion-servicio btn-sm" ng-click="configurarEquipos(servicioIndCot)" ><i class="fas fa-wrench"></i></button>                    
                  
                </div>
                <div class="style_content_dn_act_ord_serv" ng-if="servicioIndCot.servicioEquipo">
                <!--pre>    {{servicioIndCot.config | json}}           </pre-->                     
                    <div  ng-click="mostrarOcultarInfo(servicioIndCot)" class="col-title-header">
                        <i ng-if="servicioIndCot.isConfigurado" class="fas fa-check-circle mensaje-servicio-config" ></i> 
                        <i ng-if="!servicioIndCot.isConfigurado" class="fas fa-exclamation-circle mensaje-servicio-noconfig" ></i>         
                        <span class="style_seg_tex_act_ser" ng-bind="'Equipo *    '+servicioIndCot.folio+' - '+ servicioIndCot.nombre"></span>
                        <i class="icon-mostrar-equipo" ng-class="servicioIndCot.mostrarInfo ? 'fas fa-angle-down' : 'fas fa-angle-up'"></i>
                        <!--span class="badge-mensaje-equipo sin-configuracion" >Sin configuraci&oacute;n</span-->
                    </div>
                    <div class="col-content-card-equipo "  ng-if="servicioIndCot.mostrarInfo">

                        <div class="style_content_equipo_act_ord_serv">                   
                            <table class="table table-equipo-config-ind">
                                <thead >
                                    <tr>
                                        <th scope="col">Service Mode</th>
                                        <th scope="col">Tipo Equipo</th>
                                        <th scope="col">No Serie</th>
                                        <th scope="col">MAC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>                                                
                                            <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="servicioIndCot.config.tipoEquipoSelect"  
                                                ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                                            </select>                    
                                        </td>
                                        <td>
                                            <div>
                                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="servicioIndCot.config.modeloSelect" ng-options="model.modelo for model in servicioIndCot.infoEquipoServ.modelo track by model.idModelo">
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div><input type="text" ng-blur="blurSerieEquipoServicio(servicioIndCot)"  ng-model="servicioIndCot.config.numSerie" ng-blur="getMacJsonBusqueda(servicioIndCot.config)" class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv" placeholder="No Serie"></div>
                                        </td>
                                        <td> 
                                            <div><input type="text" ng-disabled="true" ng-model="servicioIndCot.config.mac" maxlength="17" class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv" placeholder="Mac" ></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <button ng-if="servicioIndCot.isConfigurado" title="configurar" type="button" class="btn btn-primary btn-floating btn-configuracion-servicio btn-sm" ng-click="configurarEquipos(servicioIndCot)" ><i class="fas fa-wrench"></i></button>                    
                </div>

                <div class="style_content_dn_act_ord_serv " ng-if="servicioIndCot.servicioTelefonia">
                    <div  ng-click="mostrarOcultarInfo(servicioIndCot)" class="col-title-header">
                        <i ng-if="servicioIndCot.isConfigurado" class="fas fa-check-circle mensaje-servicio-config" ></i> 
                        <i ng-if="!servicioIndCot.isConfigurado" class="fas fa-exclamation-circle mensaje-servicio-noconfig" ></i>        

                        <span class="style_seg_tex_act_ser" ng-bind="'DN    '+servicioIndCot.folio+' - '+servicioIndCot.nombre"></span>
                        <i class="icon-mostrar-equipo" ng-class="servicioIndCot.mostrarInfo ? 'fas fa-angle-down' : 'fas fa-angle-up'"></i>
                        <!--span class="badge-mensaje-equipo sin-configuracion" >Sin configuraci&oacute;n</span-->
                    </div>
                    <div class="col-content-card-equipo contenido-dns-config-parent" ng-if="servicioIndCot.mostrarInfo">
                        <div class="col-izquierda-dns">
                            <div class=" no-padding   style_select_act_serv">
                                <span class="span-dns-config">Activacion del servicio</span>                                
                                <select ng-disabled="keyCantidadDns || keyCantidadDns =='true' || servicioIndCot.isConfigurado" class="form-control form-control-sm style_primer_select_act_ser" ng-model="servicioIndCot.config.tipoEquipoSelect" id="select_act_serv_modal" 
                                    ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                                </select>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <span class="span-dns-config">C&oacute;digo postal</span>
                                    <input maxlength="6" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" ng-disabled="keyCodigoPostalDns || keyCodigoPostalDns =='true' || servicioIndCot.isConfigurado" ng-model="servicioIndCot.codigopostalplanactivacion" placeholder="14200" class="inputtelefonia general-input form-control form-control-sm" >
                                </div>
                                <div class="col-6">
                                    <span class="span-dns-config">Cantidad</span>
                                    <input maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" type="text" ng-disabled="keyCantidadDns || keyCantidadDns =='true' || servicioIndCot.isConfigurado" ng-model="servicioIndCot.numDNS" placeholder="1" class="inputtelefonia general-input form-control form-control-sm" >
                                </div>
                            </div>     
                            <div class="row content-button-obtenerdns">
                                <div class="offset-6 col-6">
                                    <button ng-disabled="keyCantidadDns || keyCantidadDns =='true' || servicioIndCot.isConfigurado" class="btn btn-sm style_btn button-obtenerdns" ng-click="generarDnsActivacion(servicioIndCot)">Generar </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-center-dns">
                            <table class="table table-sm table-dns-config"  >
                                <thead >
                                    <tr>
                                        <th style="width: 8em;">Principal</th>
                                        <th>DN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="dns in servicioIndCot.config.dns track by $index">
                                        <td>
                                            <input class="check-dn-generado"  type="checkbox" id="checkbox-dn{{'radioDns' + $index}}" style="cursor: pointer;" ng-model="dns.principalDn" ng-true-value="'1'" ng-false-value="'0'" ng-click="marcarPrincipal(servicioIndCot.config.dns, $index)">
                                        </td>
                                        <td>
                                            <label for="checkbox-dn{{'radioDns' + $index}}" class="label-dn-generado" ng-click="marcarPrincipal(servicioIndCot.config.dns, $index)" style="cursor: pointer;" ng-bind="dns.dn"></label>
                                        </td>
                                    </tr>
                                    <tr  ng-if="servicioIndCot.config.dns.length <= 0">
                                        <td colspan="2">  
                                              <span class="dns-no-contrados">Sin dns encontrados </span>  
                                        </td>
                                    </tr>
                                </tbody>
                            </table>     
                        </div>                        
                        <div class="col-derecho-dns">
                            <b class="title-info-services dnsmensaje-config" ng-if="servicioIndCot.isConfigurado">Los DNS ya fueron configurados</b>
                            <!--button class="btn btn-sm boton-activacion" ng-show="!(planActivo ==='true' || servicioIndCot.isConfigurado || statusActivacion ==='proceso')" ng-click="configurarDns(servicioIndCot)">Configurar </button-->  
                        </div>

                    </div>
                    <button ng-if="!servicioIndCot.isConfigurado" title="configurar" type="button" class="btn btn-primary btn-floating btn-configuracion-servicio btn-sm"  ng-click="configurarDns(servicioIndCot)" ><i class="fas fa-wrench"></i></button>                    

                </div>

                <div class="style_content_act_servicio_act_o_s" ng-if="servicioIndCot.servicioONT">
                    <div ng-click="mostrarOcultarInfo(servicioIndCot)" class="col-title-header">  
                        <i ng-if="servicioIndCot.isConfigurado" class="fas fa-check-circle mensaje-servicio-config" ></i> 
                        <i ng-if="!servicioIndCot.isConfigurado" class="fas fa-exclamation-circle mensaje-servicio-noconfig" ></i>       

                        <span class="style_seg_tex_act_ser" ng-bind="'Equipo*   '+servicioIndCot.folio+' - '+servicioIndCot.nombre"></span> 
                        <i class="icon-mostrar-equipo" ng-class="servicioIndCot.mostrarInfo ? 'fas fa-angle-down' : 'fas fa-angle-up'" ></i>
                        <!--span class="badge-mensaje-equipo sin-configuracion" >Sin configuraci&oacute;n</span-->
                    </div>
                    <div class="col-content-card-equipo"  ng-if="servicioIndCot.mostrarInfo">
                        <div class="row " >                     
                            <div class="col-3 ">
                                <span class="label-equipo-ont">Activacion del servicio</span>                                
                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="servicioIndCot.config.tipoEquipoSelect" id="select_act_serv_modal" 
                                    ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                                </select>

                            </div>
                            <div class="col-3  ">
                                <span class="label-equipo-ont">Tipo red</span>                                
                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="servicioIndCot.config.tipoRedSelect" 
                                    ng-options="tipored.descripcionAprovisionamiento for tipored in servicioIndCot.tipoProvisionamiento  track by tipored.Id_Aprovisionamiento">
                                </select>

                            </div>
                        </div>
                        <table class="table table-ont-config" >
                            <thead >
                                <tr>
                                    <th>Tipo Equipo *</th>
                                    <th>No Serie</th>
                                    <th>MAC</th>
                                    <th>OLT</th>
                                    <th>IdOLT</th>
                                    <th>Frame</th>
                                    <th>Slot</th>
                                    <th>Puerto</th>
                                    <th style="width: 9em;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <select class="form-control form-control-sm select_reg_table" ng-model="servicioIndCot.config.modeloSelect" ng-options="model.modelo for model in servicioIndCot.infoEquipoServ.modelo track by model.idModelo">
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="No Serie" ng-model="servicioIndCot.config.numSerie"  ng-blur="blurSerieOnt(servicioIndCot)"   class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="MAC" ng-model="servicioIndCot.config.mac" ng-keyup="setFormatMacValidacion(servicioIndCot.config)" maxlength="17" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="OLT" ng-model="servicioIndCot.config.red.nombreOlt" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="Id" ng-model="servicioIndCot.config.red.idOlt" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="Fr" ng-model="servicioIndCot.config.red.frame" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="SI" ng-model="servicioIndCot.config.red.slot" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="PI" ng-model="servicioIndCot.config.red.puerto" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                
                                    <td>
                                        <div><button class="btn btn-sm btn-buscar-equipo" ng-click="consultarEquipoEspecifico(servicioIndCot)">Buscar </button></div>
                                    </td>

                                
                                </tr>
                            </tbody>
                        </table>
                        <div class="row row-detalle-equipo">
                            <div class="col-4">

                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">TIPO EQUIPO</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont" ng-bind="servicioIndCot.config.modeloSelect.modelo  || 'Sin info'" ></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">NUM. SERIE</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont" ng-bind="servicioIndCot.config.numSerie || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">MAC</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont" ng-bind="servicioIndCot.config.mac || 'Sin info'"></span>
                                    </div>
                                </div>
                          
                            </div>
                            <div class="col-4">

                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">OLT</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"  ng-bind="servicioIndCot.config.red.nombreOlt || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">ID OLT</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"  ng-bind="servicioIndCot.config.red.idOlt || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">FRAME</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"  ng-bind="servicioIndCot.config.red.frame || 'Sin info'"></span>
                                    </div>
                                </div>                            
                            </div>
                            <div class="col-4">

                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">SLOT</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont" ng-bind="servicioIndCot.config.red.slot || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">PUERTO:</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"   ng-bind="servicioIndCot.config.red.puerto || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">IP ONT:</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"   ng-bind="servicioIndCot.config.red.ipOlt || 'Sin info'"></span>
                                    </div>
                                </div>
                                                
                            </div>
                        
                        </div>
                        <!--button class="btn btn-sm boton-activacion"  ng-if="planActivo !== 'true' && statusActivacion !=='proceso'" >Configurar </button-->
                       
                    </div>
                    <button title="configurar"   ng-if="servicioIndCot.isConfigurado" type="button" class="btn btn-primary btn-floating btn-configuracion-servicio btn-sm"  ng-click="configurarONT(servicioIndCot)" ><i class="fas fa-wrench"></i></button>

                </div>

  
            </div>

        </div>
    </div>
  
</div>