<div ng-show="showDetalleActivar" class="header-back-title col-3">
    <div ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
</div>
<div ng-show="showDetalleActivar" class="header-back-title col-6   d-flex justify-content-md-center align-items-center ">
    <div  class="container-estatusactivacion text-center ">
        <span class="statusactivacion-top statusactivacion-noactiva"  ng-if="statusActivacion =='false' ||  statusActivacion =='' || statusActivacion === undefined || statusActivacion ==='null' || statusActivacion===null" >La cuenta no esta activa</span>
        <span class="badge-mensaje-equipo cuenta-activa-badge"  ng-if="statusActivacion ==='true'" >Cuenta activada correctamente</span>
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
            <table id="table-resumen-servicios" class="table table-sm">
                <thead>
                    <tr>
                        <th width="30%">Folio </th>
                        <th width="40%">Servicio</th>
                        <th width="30%">Tipo</th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="detail-trservicio" ng-if="servicio.servicioConfigurable" ng-repeat="servicio in objetoCotizacion.cotPlanServicios track by $index">
                  
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{objetoCotizacion.folioCotSitio}}</span></td>
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.nombre}}</span></td>
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.tipo}}</span></td>
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
            <span  ng-if="planActivo == 'true'" class="badge-mensaje-equipo cuenta-activa-badge ng-scope" ng-if="statusActivacion ==='true'">El plan ya se encuentra activo</span>
        </div>
        <div class="col-8 style_content_activacion_ord_serv">
            <!--h5 class="style_primer_texto_act_ser">Plan Internet_50</h5-->
            <div class="content-card-servicio" ng-if="cotizacion.servicioConfigurable"  ng-repeat="cotizacion in listaCotizaciones">


                <div class="style_content_dn_act_ord_serv" ng-if="cotizacion.servicioDispositivo">
                        <div ng-click="mostrarOcultarInfo(cotizacion)" class="col-title-header">
                           
                            <i class="fas fa-check icono "></i>
                            <span class="style_seg_tex_act_ser" ng-bind="'Equipo *    '+ cotizacion.nombre"></span>            
                            <span class="badge-mensaje-equipo sin-configuracion" >Sin configuraci&oacute;n</span>

                            <i class="icon-mostrar-equipo" ng-class="cotizacion.mostrarInfo ? 'fas fa-angle-down' : 'fas fa-angle-up'" ></i>                                                      
                        </div>
                        <div class="col-content-card-equipo"  ng-show="cotizacion.mostrarInfo">
                            <span class="text-activacion-warning ng-scope" ng-if="!cotizacion.isConfigurado">Este servicio aun no ha sido configurado</span>
                
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
                                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.modeloSelect" ng-options="model.Descripcion_Modelo for model in cotizacion.Info_Equipo.Modelo track by model.Id_Modelo">
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="No Serie" ng-model="cotizacion.config.No_Serie" ng-blur="getMacJsonBusqueda(cotizacion.config)" class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="Mac" ng-model="cotizacion.config.MAC" maxlength="17" ng-keyup="setFormatMacValidacion(cotizacion.config)" class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <button class="btn btn-sm boton-activacion"  ng-if="planActivo !=='true' && statusActivacion !=='proceso'"  ng-click="configurarDispositivosNuevo(cotizacion)">Configurar </button>
                            </div>
                        </div>                     
                </div>
                <div class="style_content_dn_act_ord_serv" ng-if="cotizacion.servicioEquipo">
                <!--pre>    {{cotizacion.config | json}}           </pre-->                     
                    <div  ng-click="mostrarOcultarInfo(cotizacion)" class="col-title-header">
                        <span class="style_seg_tex_act_ser" ng-bind="'Equipo *    '+ cotizacion.nombre"></span>
                        <i class="icon-mostrar-equipo" ng-class="cotizacion.mostrarInfo ? 'fas fa-angle-down' : 'fas fa-angle-up'"></i>
                        <span class="badge-mensaje-equipo sin-configuracion" >Sin configuraci&oacute;n</span>
                    </div>
                    <div class="col-content-card-equipo"  ng-show="cotizacion.mostrarInfo">
                        <span class="text-activacion-warning ng-scope" ng-if="!cotizacion.isConfigurado">Este servicio aun no ha sido configurado</span>

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
                                            <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.tipoEquipoSelect"  
                                                ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                                            </select>                    
                                        </td>
                                        <td>
                                            <div>
                                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.modeloSelect" ng-options="model.modelo for model in cotizacion.Info_Equipo.modelo track by model.idModelo">
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="No Serie" ng-model="cotizacion.config.numSerie" ng-blur="getMacJsonBusqueda(cotizacion.config)" class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td> 
                                            <div><input type="text" placeholder="Mac" ng-model="cotizacion.config.mac" ng-keyup="setFormatMacValidacion(cotizacion.config)" maxlength="17" class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div >
                            <button class="btn btn-sm boton-activacion"  ng-if="planActivo !=='true' && statusActivacion !=='proceso'" ng-click="configurarEquipos(cotizacion)">Configurar </button>
                        </div>
                    </div>
                </div>

                <div class="style_content_dn_act_ord_serv " ng-if="cotizacion.servicioTelefonia">
                    <div  ng-click="mostrarOcultarInfo(cotizacion)" class="col-title-header">
                        <span class="style_seg_tex_act_ser" ng-bind="'DN    '+cotizacion.nombre"></span>
                        <i class="icon-mostrar-equipo" ng-class="cotizacion.mostrarInfo ? 'fas fa-angle-down' : 'fas fa-angle-up'"></i>
                        <span class="badge-mensaje-equipo sin-configuracion" >Sin configuraci&oacute;n</span>
                    </div>
                    <div class="col-content-card-equipo contenido-dns-config-parent" ng-show="cotizacion.mostrarInfo">
                        <span class="text-activacion-warning ng-scope" ng-if="!cotizacion.isConfigurado">Este servicio aun no ha sido configurado</span>                                           
                        <div class="col-izquierda-dns">
                            <div class=" no-padding   style_select_act_serv">
                                <span class="span-dns-config">Activacion del servicio</span>                                
                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.tipoEquipoSelect" id="select_act_serv_modal" 
                                    ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                                </select>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <span class="span-dns-config">C&oacute;digo postal</span>
                                    <input type="text" ng-model="codigopostalplanactivacion" placeholder="14200" class="inputtelefonia general-input form-control form-control-sm" disabled>
                                </div>
                                <div class="col-6">
                                    <span class="span-dns-config">Cantidad</span>
                                    <input type="text" ng-model="cotizacion.numeroDns" placeholder="1" class="inputtelefonia general-input form-control form-control-sm" disabled>
                                </div>
                            </div>     
                            <div class="row content-button-obtenerdns">
                                <div class="offset-6 col-6">
                                    <button class="btn btn-sm style_btn button-obtenerdns" ng-click="consultarDns(cotizacion)">Obtener </button>
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
                                    <tr ng-repeat="dns in cotizacion.config.dns track by $index">
                                        <td>
                                            <input class="check-dn-generado"  type="checkbox" id="{{'radioDns' + $index}}" style="cursor: pointer;" ng-model="dns.valor" ng-true-value="'1'" ng-false-value="'0'" ng-click="marcarPrincipal(cotizacion.config.dns, $index)">
                                        </td>
                                        <td>
                                            <label  class="label-dn-generado" ng-click="marcarPrincipal(cotizacion.config.dns, $index)" style="cursor: pointer;" ng-bind="dns.dn"></label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>     
                        </div>                        
                        <div class="col-derecho-dns">
                            <b class="title-info-services dnsmensaje-config" ng-show="cotizacion.isConfigurado">Los DNS ya fueron configurados</b>
                            <button class="btn btn-sm boton-activacion" ng-show="!(planActivo ==='true' || cotizacion.isConfigurado || statusActivacion ==='proceso')" ng-click="configurarDns(cotizacion)">Configurar </button>                      
                        </div>
                    </div>
                </div>

                <div class="style_content_act_servicio_act_o_s" ng-if="cotizacion.servicioONT">
                    <div ng-click="mostrarOcultarInfo(cotizacion)" class="col-title-header">  
                        <span class="style_seg_tex_act_ser" ng-bind="'Equipo*    '+cotizacion.nombre"></span> 
                        <i class="icon-mostrar-equipo" ng-class="cotizacion.mostrarInfo ? 'fas fa-angle-down' : 'fas fa-angle-up'" ></i>
                        <span class="badge-mensaje-equipo sin-configuracion" >Sin configuraci&oacute;n</span>
                    </div>
                    <div class="col-content-card-equipo"  ng-show="cotizacion.mostrarInfo">
                        <span class="text-activacion-warning ng-scope" ng-if="!cotizacion.isConfigurado">Este servicio aun no ha sido configurado</span>
                        <div class="row " >                     
                            <div class="col-3 ">
                                <span class="label-equipo-ont">Activacion del servicio</span>                                
                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.tipoEquipoSelect" id="select_act_serv_modal" 
                                    ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                                </select>

                            </div>
                            <div class="col-3   ">
                                <span class="label-equipo-ont">Tipo red</span>                                
                                <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.tipoRedSelect" 
                                    ng-options="tipored.descripcionAprovisionamiento for tipored in cotizacion.tipoProvisionamiento  track by tipored.Id_Aprovisionamiento">
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
                                            <select class="form-control form-control-sm select_reg_table" ng-model="cotizacion.config.modeloSelect" ng-options="model.modelo for model in cotizacion.Info_Equipo.modelo track by model.idModelo">
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="No Serie" ng-model="cotizacion.config.numSerie"  ng-blur="blurSerieOnt(cotizacion)"   class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="MAC" ng-model="cotizacion.config.mac" ng-keyup="setFormatMacValidacion(cotizacion.config)" maxlength="17" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="OLT" ng-model="cotizacion.config.red.nombreOlt" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="Id" ng-model="cotizacion.config.red.idOlt" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="Fr" ng-model="cotizacion.config.red.frame" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="SI" ng-model="cotizacion.config.red.slot" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                    <td>
                                        <div><input type="text" placeholder="PI" ng-model="cotizacion.config.red.puerto" class="form-control form-control-sm input-ont-captura"></div>
                                    </td>
                                
                                    <td>
                                        <div><button class="btn btn-sm btn-buscar-equipo" ng-click="consultarEquipoEspecifico(cotizacion)">Buscar </button></div>
                                    </td>

                                
                                </tr>
                            </tbody>
                        </table>
                        <div class="row row-detalle-equipo">
                            <div class="col-4">

                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">Tipo equipo</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont" ng-bind="cotizacion.config.modeloSelect.modelo  || 'Sin info'" ></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">Num. serie</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont" ng-bind="cotizacion.config.numSerie || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">Mac</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont" ng-bind="cotizacion.config.mac || 'Sin info'"></span>
                                    </div>
                                </div>
                          
                            </div>
                            <div class="col-4">

                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">OLT</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"  ng-bind="cotizacion.config.red.nombreOlt || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">Id olt</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"  ng-bind="cotizacion.config.red.idOlt || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">Frame</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"  ng-bind="cotizacion.config.red.frame || 'Sin info'"></span>
                                    </div>
                                </div>                            
                            </div>
                            <div class="col-4">

                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">Slot</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont" ng-bind="cotizacion.config.red.slot || 'Sin info'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid detalle-ont-content">
                                    <div class="container-text-title-detalle-ont">
                                        <span class="text-title-ont">Puerto:</span>
                                    </div>
                                    <div class="container-text-detalle-ont">
                                        <span class="text-content-ont"   ng-bind="cotizacion.config.red.puerto || 'Sin info'"></span>
                                    </div>
                                </div>

                                                
                            </div>
                        
                        </div>
                        <div >
                            <button class="btn btn-sm boton-activacion"  ng-if="planActivo !== 'true' && statusActivacion !=='proceso'"  ng-click="configurarONT(cotizacion)">Configurar </button>
                        </div>
                    </div>
                </div>

  
            </div>

        </div>
    </div>
  
</div>