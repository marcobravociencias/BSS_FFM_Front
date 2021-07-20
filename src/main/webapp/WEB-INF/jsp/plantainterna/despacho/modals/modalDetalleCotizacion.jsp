<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalleCotizacion">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Detalle de la cotizaci&oacute;n  {{}} </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close" >
                </button>
            </div>
			<div class="modal-body modal-body-detallecot">
                <div class="row parent-detallecotizacion">                        
                    <div class="col-4">
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot"> 
                                <b class="titulodetallecotbasico">Folio</b>                                   
                            </div>
                            <div class="container-text-detallecot">   
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.folioPedido" ></h5>                                 
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">  
                                <b class="titulodetallecotbasico">Tipo entrega</b>                                  
                            </div>
                            <div class="container-text-detallecot">     
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.descripcionTipoEntrega" ></h5>                               
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">    
                                <b class="titulodetallecotbasico">Tipo </b>                                
                            </div>
                            <div class="container-text-detallecot">  
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.tipo" ></h5>                                  
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">      
                                <b class="titulodetallecotbasico">Subtipo</b>                              
                            </div>
                            <div class="container-text-detallecot">     
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.subtipo" ></h5>                               
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">Fecha programada</b>                                    
                            </div>
                            <div class="container-text-detallecot"> 
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.fechaHoraProgramada" ></h5>                                   
                            </div>
                        </div>
                        <div class="divide-cotizacion">

                        </div>
                        <h5 class="header-title-cotiz">
                            Costos
                        </h5>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">Fecha estimada</b>
                            </div>
                            <div class="container-text-detallecot"> 
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.fechaEstimadaFinal" ></h5>
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">Tiempo estimado</b>
                            </div>
                            <div class="container-text-detallecot"> 
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.tiempoEstimado" ></h5>
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">Distancia estimada </b>
                            </div>
                            <div class="container-text-detallecot"> 
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.distanciaEstimada" ></h5>
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">Fecha expiraci&oacute;n</b>
                            </div>
                            <div class="container-text-detallecot">
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.fechaExpiracion" ></h5> 
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">Subtotal</b>
                            </div>
                            <div class="container-text-detallecot"> 
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.subTotal" ></h5>
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">IVA</b>
                            </div>
                            <div class="container-text-detallecot"> 
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.iva" ></h5>
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">Descuento</b>
                            </div>
                            <div class="container-text-detallecot"> 
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.descuento" ></h5>
                            </div>
                        </div>
                        <div class="detalle-cot-basico">
                            <div class="container-title-detallecot">
                                <b class="titulodetallecotbasico">Total</b>
                            </div>
                            <div class="container-text-detallecot"> 
                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.total" ></h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div id="mapa-cotizacion-despacho" class="mapa-cotizacion-despacho" style="width:100%;height:100%; border-radius: 10px;">                            
                        </div>
                    </div>
                </div>	

                <div  ng-show="isAbiertoDetalleDireccion" class="container-direcciones-elemento">     
                    <span class="cerrarnoticias far fa-times" ng-click="isAbiertoDetalleDireccion=false"></span>   
                    <div class="row">
                        <div class="col-12 col-cotizacion-tabs">                            
                            <div class="nav nav-tabs  nav-fill text-center" id="v-tabs-tab-detalle-cotizacion" role="tablist" aria-orientation="vertical" >
                                <a class="nav-link active" id="v-tabs-consultagen-cotizacion-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consultagen-detallecot" role="tab" aria-controls="v-tabs-consultagen-cotizacion-tab" 
                                    aria-selected="true" >General</a>
                                <a class="nav-link "
                                    id="v-tabs-consultadeta-coti-tab" data-mdb-toggle="tab" 
                                    href="#v-tabs-consultadeta-coti"  role="tab"  
                                    aria-controls="v-tabs-consultadeta-coti-tab" aria-selected="true" >Direcci&oacute;n</a>
                                <a class="nav-link "
                                    id="v-tabs-productos-coti-tab" data-mdb-toggle="tab" 
                                    href="#v-tabs-productos-coti"  role="tab"  
                                    aria-controls="v-tabs-productos-coti-tab" aria-selected="true" >Productos</a>
                            </div>
                            <div class="tab-content tab-content-direccion" id="v-tabs-tabContent">
                                <div class="tab-pane fade show active"  id="v-tabs-consultagen-detallecot" role="tabpanel" 
                                        aria-labelledby="v-tabs-consultagen-cotizacion-tab" >
                                      
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Acci&oacute;n</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.accionDescripcion" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Estatus</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.descripcionEstatus" ></h5>
                                        </div>
                                    </div>
                                        
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Nombre</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.nombre" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Tel&eacute;fono</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.numeroTelefono" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Direcci&oacute;n</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccion" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Notas</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.notas" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Distancia estimada</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.distanciaEstimada" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Tiempo estimado</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.tiempoEstimado" ></h5>
                                        </div>
                                    </div>
                                        
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Subtotal</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.subTotal" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Descuento</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.descuento" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">IVA</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.iva" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Total</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.total" ></h5>
                                        </div>
                                    </div>                               

                                </div>
                                <div class="tab-pane fade " id="v-tabs-consultadeta-coti" role="tabpanel" 
                                        aria-labelledby="v-tabs-consultadeta-coti-tab" >
                                                                                                                   
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Pa&iacute;s</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.pais" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Estado</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.estado" ></h5>
                                        </div>
                                    </div>  
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Ciudad</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.ciudad" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Delegaci&oacute;n</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.delegacion" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">C&oacute;digo postal</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.codigoPostal" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Colonia</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.colonia" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Calle</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.calle" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">No. interior</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.noInterior" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">No. exterior</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.noExterior" ></h5>
                                        </div>
                                    </div>          
                                 
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Entre calles</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.entreCalles" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Latitud</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.latitud" ></h5>
                                        </div>
                                    </div>
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Longitud</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.direccionDetalle.longitud" ></h5>
                                        </div>
                                    </div>                                  
                                    <div class="detalle-text-parent-basico">
                                        <div class="container-title-generalcot">
                                            <b class="titulogeneralcotbasico">Referencias</b>
                                        </div>
                                        <div class="container-text-generalcot"> 
                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.referencias" ></h5>
                                        </div>
                                    </div>

                                </div>  
                                <div class="tab-pane fade " id="v-tabs-productos-coti" role="tabpanel" 
                                        aria-labelledby="v-tabs-productos-coti-tab" >
                                        <table class="table-productos-cotizacion table table-sm">
                                            <thead>
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Desc.</th>
                                                <th scope="col">Cant.</th>
                                                <th scope="col">Tam.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="prod in elementoDireccion.productos track by $index" >
                                                    <th scope="row"ng-bind="$index+1"></th>
                                                    <td><span class="text-producto"ng-bind="prod.nombre" > </span></td>
                                                    <td><span class="text-producto"ng-bind="prod.cantidad" > </span></td>
                                                    <td><span class="text-producto"ng-bind="prod.tamano" > </span></td>
                                                </tr>
                                            </tbody>
                                        </table>  
                                </div>                                    
                            </div>
                        </div>
                    </div>
                </div>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cerrar
                </button>
           </div>
        </div>
    </div>
</div>