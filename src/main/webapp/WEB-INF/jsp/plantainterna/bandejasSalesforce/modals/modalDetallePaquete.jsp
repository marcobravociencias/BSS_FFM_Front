<div class="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="modalDetallePaquete" aria-hidden="true" id="modalDetallePaquete">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Detalle Paquete</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row ">
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Paquete</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.nombrePaquete}}" ng-bind="detallePaqueteCSP.nombrePaquete || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Cuenta factura</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.folioCuentaFactura}}" ng-bind="detallePaqueteCSP.folioCuentaFactura || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Folio OS</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.folioOs}}" ng-bind="detallePaqueteCSP.folioOs || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Folio CSP</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.folioCotSitioPlan}}" ng-bind="detallePaqueteCSP.folioCotSitioPlan || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Folio Sitio</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.folioSitio}}" ng-bind="detallePaqueteCSP.folioSitio || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Num. ips</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.numIps}}" ng-bind="detallePaqueteCSP.numIps || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Num. dns</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.numDns}}" ng-bind="detallePaqueteCSP.numDns || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Monto primer pago</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.precioProntoPago}}" ng-bind="detallePaqueteCSP.precioProntoPago || 'Sin dato' | currency:MX$:2"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="container-fluid detallePaquete-content">
                                <div class="container-text-title-detalle">
                                    <span class="text-title-detallePaquete">Pago instalaci&oacute;n</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-detallePaquete" title="{{detallePaqueteCSP.pagoEnInstalacion}}" ng-bind="detallePaqueteCSP.pagoEnInstalacion || 'Sin dato' | currency:MX$:2"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <input id="idCSPPaquete" type="hidden" value="{{detallePaqueteCSP.idCSP}}">
                    <div class="row">
                        <div class="col-7">
                            <div class="row justify-content-center">
                                <div class="col-md-12">
                                    <h5 class="title-detallePaquete">Servicios</h5>
                                    <div class="parent_table_detalle">
                                        <table class="detalle-productos-table table table-sm">
                                            <thead class="thead_table_servicios">
                                                <tr>
                                                    <th scope="col">Nombre del Servicio</th>
                                                    <th scope="col">Tipo Servicio</th>
                                                    <th class="text-center" scope="col">Detalle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-class="{'active-selected-servicio-plan': selectedEquipoPaquete == servicio }"
                                                    ng-repeat="servicio in detallePaqueteCSP.resumenServicios">
                                                    <td ng-bind="servicio.descripcion"></td>
                                                    <td ng-bind="servicio.tipo"></td>
                                                    <td>
                                                        <div class="text-center">   
                                                            <button
                                                                ng-if="servicio.id !== undefined"
                                                                type="button"
                                                                ng-click="consultarDetalleServicio(servicio, detallePaqueteCSP.idCotSitio)"
                                                                class="btn_detalleServicio btn btn-info btn-rounded btn-sm my-0 waves-effect waves-light">
                                                                <i class="fa fa-eye"></i></button>
                                                            <span
                                                                ng-if="servicio.id === undefined">Sin
                                                                detalle</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr ng-if="detallePaqueteCSP.resumenServicios === undefined || detallePaqueteCSP.resumenServicios.length <= 0">
                                                    <td class="text-center" colspan="3">No se cuenta con servicios</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <h5 class="title-detallePaquete"> Productos </h5>
                                    <div class="parent_table_detalle_productos">
                                        <table class="table detalle-productos-table table-sm">
                                            <thead class="thead_table_productos_servicio">
                                                <tr>
                                                    <th scope="col">Nombre del producto</th>
                                                    <th scope="col">Tipo producto</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="producto in selectedEquipoPaquete.productos">
                                                    <td ng-bind="producto.descripcion"></td>
                                                    <td ng-bind="producto.tipo"></td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr ng-if="selectedEquipoPaquete.productos === undefined || selectedEquipoPaquete.productos.length <= 0">
                                                    <td class="text-center" colspan="2">No se cuenta con productos</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <h5 class="title-detallePaquete"> Promociones </h5>
                                    <div class="parent_table_detalle_promociones">
                                        <table class="detalle-productos-table table table-sm">
                                            <thead class="thead_table_promociones_servicio">
                                                <tr>
                                                    <th scope="col">Folio promoci&oacute;n</th>
                                                    <th scope="col">Nombre de la promoci&oacute;n</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr  ng-repeat="promocion in detallePaqueteCSP.promociones">
                                                    <td ng-bind="promocion.id"></td>
                                                    <td ng-bind="promocion.descripcion"></td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr ng-if="detallePaqueteCSP.promociones === undefined || detallePaqueteCSP.promociones.length <= 0">
                                                    <td class="text-center" colspan="2">No se cuenta con promociones</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-5" style="overflow-x: auto; max-height: calc(100vh - 225px);">
                            <div class="text-center">
                                <h5 class="text-center title-detallePaquete">Equipo y Modelos</h5>
                            </div>
                            <div>
                                <div ng-if="selectedEquipoPaquete.isTieneEquipoModeos">
                                    <div class="content_info_detalle">
                                        <h6 class="ml-3 mt-2 text-equipo-paquete" ng-bind="selectedEquipoPaquete.elementoEquipoModelos.nombreEquipo"> </h6>
                                        <div class="ml-4">
                                            <!--div class="container-fluid detallePaquete-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detallePaquete">Nombre Servicio</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detallePaquete" title="{{detServicio.nombreServicio}}" ng-bind="detServicio.nombreServicio || 'Sin dato'"></span>
                                                </div>
                                            </div-->                                                         
                                            <div class="container-fluid detallePaquete-content">                                                                   
                                                <ul style="color: #797979" class="listado_modelos">
                                                    <li ng-repeat="modelo in selectedEquipoPaquete.elementoEquipoModelos.modelo" class="li_item_modelo" ng-bind="modelo.modelo">
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- <i class="fa fa-satellite-dish"></i>
                                        <i class="fas fa-desktop"></i> -->
                                        <!-- <span ng-bind="detServicio.nombreServicio"></span>
                                        <span ng-bind="detServicio.flujo"></span>
                                        <span ng-bind="detServicio.tipoDispositivo"></span> -->
                                        <!-- <ul style="color: #797979" class="listado_modelos">
                                            <li ng-repeat="modelo in detServicio.modelo" class="li_item_modelo" ng-bind="modelo.nameModelo">
                                            </li>
                                        </ul> -->
                                    </div>
                                </div>
                                <div ng-if="!selectedEquipoPaquete.isTieneEquipoModeos" class="text-center not_info_detalle row h-100 justify-content-center">
                                    <h6 style="color:#abafae;" class="text-noSeleccion">Sin datos para mostrar</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-tecnico-ticket">
                <button type="button" class="btn btn-cerrar-modal" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>