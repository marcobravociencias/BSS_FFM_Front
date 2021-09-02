<div ng-show="showDetalleActivar" class="header-back-title col-3">
    <div ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
</div>
<div ng-show="showDetalleActivar" class="header-back-title col-6">
    <div  class="container-estatusactivacion text-center">
        <span class="statusactivacion-top statusactivacion-noactiva"  ng-if="statusActivacion =='false' ||  statusActivacion =='' || statusActivacion === undefined || statusActivacion ==='null' || statusActivacion===null" >La cuenta no esta activa</span>
        <span class="statusactivacion-top statusactivacion-activa"    ng-if="statusActivacion ==='true'" >La cuenta ha sido activada correctamente</span>
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
 
    <div class="content-activacion col-12 row">
        <div class="col-4">                     
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <b class="title-info-services"> Cotizaci&oacute;n:</b> &nbsp; &nbsp;
                    <span id="cuenta_factura" class="nombre-cotservicios content_info_ot style_nota_tint" ng-bind="objetoCotizacion.CotizacionName"> </span>
                </div> 
                        
            </div>  
            <div class="row justify-content-center">              
                <div class="col-md-6">
                    <b class="title-info-services">Megas subida:</b>&nbsp; &nbsp;
                    <span id="nombre_plan" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.MegasSubida | number)"> </span>
                </div>
                <div class="col-md-6">
                    <b class="title-info-services"> Megas bajada:</b> &nbsp; &nbsp;
                    <span id="cuenta_factura" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.MegasBajada | number)"> </span>
                </div>
            </div>
            <div class="row justify-content-center">              
                <div class="col-md-6">
                    <b class="title-info-services">DNS totales:</b>&nbsp; &nbsp;
                    <span id="nombre_plan" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.DNsTotales | number )"> </span>
                </div>
                <div class="col-md-6">
                    <b class="title-info-services"> Ips totales:</b> &nbsp; &nbsp;
                    <span id="cuenta_factura" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.IpsTotales | number )"> </span>
                </div>
            </div>
            <div class="row ">              
                <div class="col-md-6">
                    <span class="noconfigurables" ng-click="openModalNoConfig()" >*</span>
                    <b class="title-info-services"> Pronto pago:</b> &nbsp; &nbsp;
                    <span id="cuenta_factura" class="content_info_ot style_nota_tint" ng-bind="(objetoCotizacion.ProntoPago | currency )"> </span>
                </div>    
            </div>
            <div class="divider-detalle-table"></div>
            <table id="table-resumen-servicios" class="table table-sm">
                <thead>
                    <tr>
                        <th width="15%">Folio </th>
                        <th width="40%">Servicio</th>
                        <th width="30%">Etiqueta BRM</th>
                        <th width="15%">Tipo</th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="detail-trservicio" ng-if="servicio.servicioConfigurable" ng-repeat="servicio in objetoCotizacion.CotPlanServicios track by $index">
                  
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.CotSitioName}}</span></td>
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.CotPlanServicoNServicio}}</span></td>
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.DpPlanEtiquetaBRM}}</span></td>
                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.Tipo}}</span></td>
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
            <!--span ng-if="planActivo !== 'true' && isProcesandoActivacion==='cargando'" class="text-cargandoasincrona">La activaci&oacute;n est&aacute; en proceso</span>
            <span ng-if="planActivo == 'true'" class="text-cargandoasincrona">El plan ya se encuentra activo</span-->

        </div>
        <div class="col-8 style_content_activacion_ord_serv">
            <!--h5 class="style_primer_texto_act_ser">Plan Internet_50</h5-->
            <div class="content-card-servicio" ng-if="cotizacion.servicioConfigurable"  ng-repeat="cotizacion in listaCotizaciones">


                <div class="col-12 row style_content_dn_act_ord_serv" ng-if="cotizacion.servicioDispositivo">
                        <div class="col-12 col-title-header">
                            <div class="row">
                                <div class="col-11">
                                    <span class="style_seg_tex_act_ser" ng-bind="'Equipo *    '+ cotizacion.CotPlanServicoName + ' - ' + cotizacion.CotPlanServicoNServicio"></span>
                                </div>
                                <div class="col-1" style="text-align: right; padding: 0;">
                                    <i class="icon-mostrar-equipo" ng-class="cotizacion.mostrarInfo ? 'fa fa-eye' : 'fa fa-eye-slash'" ng-click="mostrarOcultarInfo(cotizacion)"></i>
                                </div>
                            </div>
                            
                        </div>
                        <span class="text-activacion-warning ng-scope" ng-if="!cotizacion.isConfigurado">Este servicio aun no ha sido configurado</span>
                        <div class="col-12 style_content_equipo_act_ord_serv" ng-show="cotizacion.mostrarInfo">                   
                            <div class="col-12 row style_des_equipo_act_ord_serv">
                                <table class="table style_table_equipo_act_ord_ser">
                                    <thead class="style_thead_table_equipo_act_ord_ser">
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
                            </div>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-sm boton-activacion"  ng-if="planActivo !=='true' && statusActivacion !=='proceso'"  ng-click="configurarDispositivosNuevo(cotizacion)">Configurar </button>
                            <b class="title-info-services dnsmensaje-config activo-cuenta-mensaje"   ng-if="planActivo === 'true'"  >La cuenta ya se encuentra activa.</b>
                    </div>
                </div>
                <div class="col-12 row style_content_dn_act_ord_serv" ng-if="cotizacion.servicioEquipo">
                <!--pre>    {{cotizacion.config | json}}           </pre-->                     
                    <div class="col-12 col-title-header">
                        <div class="row">
                            <div class="col-11">
                                <span class="style_seg_tex_act_ser" ng-bind="'Equipo *    '+ cotizacion.CotPlanServicoName + ' - ' + cotizacion.CotPlanServicoNServicio"></span>
                            </div>
                            <div class="col-1" style="text-align: right; padding: 0;">
                                <i class="icon-mostrar-equipo" ng-class="cotizacion.mostrarInfo ? 'fa fa-eye' : 'fa fa-eye-slash'" ng-click="mostrarOcultarInfo(cotizacion)"></i>
                            </div>
                        </div>
                        
                    </div>
                    <span class="text-activacion-warning ng-scope" ng-if="!cotizacion.isConfigurado">Este servicio aun no ha sido configurado</span>

                    <div class="col-12 style_content_equipo_act_ord_serv" ng-show="cotizacion.mostrarInfo">                   
                        <div class="col-12 row style_des_equipo_act_ord_serv">
                            <table class="table style_table_equipo_act_ord_ser">
                                <thead class="style_thead_table_equipo_act_ord_ser">
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
                                            <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.tipoEquipoSelect" id="select_act_serv_modal" 
                                                ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                                            </select>                    
                                        </td>
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
                                            <div><input type="text" placeholder="Mac" ng-model="cotizacion.config.MAC" ng-keyup="setFormatMacValidacion(cotizacion.config)" maxlength="17" class="input-equipo general-input form-control form-control-sm style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-sm boton-activacion"  ng-if="planActivo !=='true' && statusActivacion !=='proceso'" ng-click="configurarEquipos(cotizacion)">Configurar </button>
                        <b class="title-info-services dnsmensaje-config activo-cuenta-mensaje"   ng-if="planActivo === 'true'"  >La cuenta ya se encuentra activa.</b>

                    </div>
                </div>

                <div class="col-12 style_content_dn_act_ord_serv"     ng-if="cotizacion.servicioTelefonia">
                <!--pre>    {{cotizacion.config | json}}           </pre--> 
                    <div class="col-12 col-title-header">
                        <div class="row">
                            <div class="col-11">
                                <span class="style_seg_tex_act_ser" ng-bind="'DN    '+cotizacion.CotPlanServicoName + ' - ' + cotizacion.CotPlanServicoNServicio"></span>
                            </div>
                            <div class="col-1" style="text-align: right; padding: 0;">
                                <i class="icon-mostrar-equipo" ng-class="cotizacion.mostrarInfo ? 'fa fa-eye' : 'fa fa-eye-slash'" ng-click="mostrarOcultarInfo(cotizacion)"></i>
                            </div>
                        </div>
                    </div>
                    <span class="text-activacion-warning ng-scope" ng-if="!cotizacion.isConfigurado">Este servicio aun no ha sido configurado</span>
                    <div class="row style_seg_span_act_serv" ng-show="cotizacion.mostrarInfo">                     
                        <div class="col-3 no-padding   style_select_act_serv">
                            <span class="title-tipo-elemento">Activacion del servicio</span>
                            
                            <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.tipoEquipoSelect" id="select_act_serv_modal" 
                                ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                            </select>

                        </div>
                    </div>
                    <div class="col-12 row style_content_desc_dn_act_ord_serv" ng-show="cotizacion.mostrarInfo">
                        <div class="col-5 row style_des_dn_act_ord_serv">

                            <table class="table table-sm" class="table_desc_equipo_act_serv" id="table_desc_equipo_act_serv">
                                <thead class="style_thead_table_desc_equipo_act_serv">
                                    <tr>
                                        <th style="width: 8em;">Principal</th>
                                        <th>DN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="dns in cotizacion.config.DN_Conf track by $index">
                                        <td>
                                            <input class="check-dn-generado"  type="checkbox" id="{{'radioDns' + $index}}" style="cursor: pointer;" ng-model="dns.valor" ng-true-value="'1'" ng-false-value="'0'" ng-click="marcarPrincipal(cotizacion.config.DN_Conf, $index)">
                                        </td>
                                        <td>
                                            <label  class="label-dn-generado" ng-click="marcarPrincipal(cotizacion.config.DN_Conf, $index)" style="cursor: pointer;" ng-bind="dns.DN"></label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-7 row ">
                            <div class="col-12 row">
                                <div class="col-6 style_span_text_dn">
                                    <span>C&oacute;digo postal</span>
                                    <input type="text" ng-model="codigopostalplanactivacion" placeholder="14200" class="inputtelefonia general-input form-control form-control-sm" disabled>

                                </div>
                                <div class="col-6 style_span_text_cant_dn">
                                    <span>Cantidad</span>
                                    <input type="text" ng-model="cotizacion.numeroDns" placeholder="1" class="inputtelefonia general-input form-control form-control-sm" disabled>
                                    <button class="btn btn-sm style_btn button-obtenerdns" ng-click="consultarDns(cotizacion)">Obtener DNs</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <b class="title-info-services dnsmensaje-config" ng-show="cotizacion.isConfigurado">Los DNS ya fueron configurados</b>
                        <button class="btn btn-sm boton-activacion" ng-show="!(planActivo ==='true' || cotizacion.isConfigurado || statusActivacion ==='proceso')" ng-click="configurarDns(cotizacion)">Configurar </button>                      
                        <b class="title-info-services dnsmensaje-config activo-cuenta-mensaje"   ng-if="planActivo ==='true'"  >La cuenta ya se encuentra activa.</b>
                       
                    </div>
                </div>

                <div class="col-12 style_content_act_servicio_act_o_s" ng-if="cotizacion.servicioONT">
                <!--pre>    {{cotizacion.config | json}}           </pre--> 
                    <div class="col-12 col-title-header">  
                        <div class="row">
                            <div class="col-11">
                                <span class="style_seg_tex_act_ser" ng-bind="'Equipo*    '+cotizacion.CotPlanServicoName + ' - ' + cotizacion.CotPlanServicoNServicio"></span> 
                            </div>
                            <div class="col-1" style="text-align: right; padding: 0;">
                                <i class="icon-mostrar-equipo" ng-class="cotizacion.mostrarInfo ? 'fa fa-eye' : 'fa fa-eye-slash'" ng-click="mostrarOcultarInfo(cotizacion)"></i>
                            </div>
                        </div>
                    </div>
                    <span class="text-activacion-warning ng-scope" ng-if="!cotizacion.isConfigurado">Este servicio aun no ha sido configurado</span>
                    <div class="row style_seg_span_act_serv" ng-show="cotizacion.mostrarInfo">                     
                        <div class="col-3 no-padding   style_select_act_serv">
                            <span class="title-tipo-elemento">Activacion del servicio</span>
                            
                            <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.tipoEquipoSelect" id="select_act_serv_modal" 
                                ng-options="tipo.nombre for tipo in listadoTipoEquipoActivacion track by tipo.id">
                            </select>

                        </div>
                        <div class="col-3   style_select_act_serv">
                            <span class="title-tipo-elemento">Tipo red</span>
                            
                            <select class="form-control form-control-sm style_primer_select_act_ser" ng-model="cotizacion.config.tipoRedSelect" 
                                ng-options="tipored.Descripcion_Aprovisionamiento for tipored in cotizacion.tipoProvisionamiento  track by tipored.Id_Aprovisionamiento">
                            </select>

                        </div>
                    </div>
                    <div class="row style_seg_span_act_serv" ng-show="cotizacion.mostrarInfo">
                        <div class="no-padding col-12 style_content_table_act_serv">
                            <table class="table table-equipoconfirg" id="table_desc_equipo_act_serv">
                                <thead class="style_thead_table_desc_equipo_act_serv">
                                    <tr>
                                        <th style="width: 8em;">Tipo Equipo *</th>
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
                                                <select class="form-control select_reg_table" ng-model="cotizacion.config.modeloSelect" ng-options="model.Descripcion_Modelo for model in cotizacion.Info_Equipo.Modelo track by model.Id_Modelo">
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="No Serie" ng-model="cotizacion.config.No_Serie" ng-blur="getMacJsonBusqueda(cotizacion.config)" class="form-control style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="MAC" ng-model="cotizacion.config.MAC" ng-keyup="setFormatMacValidacion(cotizacion.config)" maxlength="17" class="form-control style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="OLT" ng-model="cotizacion.config.OLT" class="form-control style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="Id" ng-model="cotizacion.config.Id_OLT" class="form-control style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="Fr" ng-model="cotizacion.config.Frame" class="form-control style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="SI" ng-model="cotizacion.config.Slot" class="form-control style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                        <td>
                                            <div><input type="text" placeholder="PI" ng-model="cotizacion.config.Puerto" class="form-control style_input_table_desc_equipo_act_serv"></div>
                                        </td>
                                      
                                        <td>
                                            <div><button class="btn btn-sm style_btn_bsq_equipo_table_desc_equipo" ng-click="consultarEquipoEspecifico(cotizacion)">Buscar Equipo</button></div>
                                        </td>

                                      
                                    </tr>
                                </tbody>
                            </table>
                            <div class="row row-detalle-equipo">
                                <div class="col-4">
                                    <div class="form-group form-group-mac">
                                        <b class="title-info-services">Tipo equipo:</b>
                                        <span id="nombre_plan" class="content_info_captur ng-binding" ng-bind="cotizacion.config.modeloSelect.Descripcion_Modelo">50</span>
                                    </div>
                                    <div class="form-group form-group-mac">
                                        <b class="title-info-services">Num. serie:</b>
                                        <span id="nombre_plan" class="content_info_captur ng-binding" ng-bind="cotizacion.config.No_Serie || 'Sin info'">50</span>
                                    </div>
                                    <div class="form-group form-group-mac">
                                        <b class="title-info-services">Mac:</b>
                                        <span id="nombre_plan" class="content_info_captur ng-binding" ng-bind="cotizacion.config.MAC || 'Sin info'">50</span>
                                    </div>                             
                                </div>
                                <div class="col-4">
                                    <div class="form-group form-group-mac">
                                        <b class="title-info-services">OLT:</b>
                                        <span id="nombre_plan" class="content_info_captur ng-binding" ng-bind="cotizacion.config.OLT || 'Sin info'">50</span>
                                    </div>
                                    <div class="form-group form-group-mac">
                                        <b class="title-info-services">Id OLT:</b>
                                        <span id="nombre_plan" class="content_info_captur ng-binding" ng-bind="cotizacion.config.Id_OLT || 'Sin info'">50</span>
                                    </div>
                                    <div class="form-group form-group-mac">
                                        <b class="title-info-services">Frame:</b>
                                        <span id="nombre_plan" class="content_info_captur ng-binding" ng-bind="cotizacion.config.Frame || 'Sin info'">50</span>
                                    </div>                             
                                </div>
                                <div class="col-4">
                                    <div class="form-group form-group-mac">
                                        <b class="title-info-services">Slot:</b>
                                        <span id="nombre_plan" class="content_info_captur ng-binding" ng-bind="cotizacion.config.Slot || 'Sin info'">50</span>
                                    </div>
                                    <div class="form-group form-group-mac">
                                        <b class="title-info-services">Puerto:</b>
                                        <span id="nombre_plan" class="content_info_captur ng-binding" ng-bind="cotizacion.config.Puerto || 'Sin info'">50</span>
                                    </div>                         
                                </div>
                             
                            </div>
               
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-sm boton-activacion"  ng-if="planActivo !== 'true' && statusActivacion !=='proceso'"  ng-click="configurarONT(cotizacion)">Configurar </button>
                            <b class="title-info-services dnsmensaje-config activo-cuenta-mensaje"   ng-if="planActivo === 'true'"  >La cuenta ya se encuentra activa.</b>
                        </div>
                    </div>
                
                </div>

  
            </div>

        </div>
    </div>
  
</div>