<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-detalleOT" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" style="color: grey;">
                    Detalle de la Orden <span id="ot-asignada"></span>
                </h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div style="padding-left: 0;" class="col-2">
                            <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-detalle-ot" role="tablist" aria-orientation="vertical">
                                <a data-mdb-toggle="tab" href="#content-detalle-ot" class="nav-link active" id="informacion-ot">Informaci&oacute;n</li>
                                <a ng-click="consultaHistoricoDetalleOt()" data-mdb-toggle="tab" href="#content-detalle-historico" class="nav-link" id="info_historico_detalleOT">Hist&oacute;rico</a>
                                <a ng-click="consultarPostVentaDetalleOt()" data-mdb-toggle="tab" href="#content-detalle-postVenta" ng-show="permisosModalDetalleOT.indexOf('tabDetalleSoporte') !== -1" class="nav-link" id="postVenta">Detalle Soporte</a>
                                <a ng-click="consultaPagosDetalleOt()" data-mdb-toggle="tab" href="#content-detalle-pagos" ng-show="permisosModalDetalleOT.indexOf('tabConsultaPagos') !== -1" class="nav-link" id="pagos-Ot">Pagos</a>
                                <a ng-click="consultarDispositivosDetalleOt()" data-mdb-toggle="tab" href="#content-detalle-dispositivos" ng-show="permisosModalDetalleOT.indexOf('tabConsultaDispositivos') !== -1" class="nav-link" id="dispositivo-Ot">Dispositivos</a>
                                <a ng-click="consultaMaterialesDetalleOT()" data-mdb-toggle="tab" href="#content-detalle-materiales-ot" ng-show="permisosModalDetalleOT.indexOf('tabConsultaMaterialesOT') !== -1" class="nav-link" id="dispositivo-Ot">Materiales</a>
                                <a ng-click="consultarRecoleccionDetalleOt()" data-mdb-toggle="tab" href="#content-detalle-recoleccion-ot" ng-show="permisosModalDetalleOT.indexOf('tabConsultaRecoleccionOT') !== -1" class="nav-link" id="recoleccion-ot">Recolecci&oacute;n</a>
                            </div>
                        </div>
                        <div class="col-10">
                            <div class="tab-content">
                                <div class="contenedor_detalle row tab-pane fade show active" id="content-detalle-ot" role="tabpanel" aria-labelledby="v-tabs-consulta-acciones-tab">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">OT</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.idOrden}}" ng-bind="infoOtDetalle.idOrden || 'Sin dato'"></span> 
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">OS</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.folioSistema}}" ng-bind="infoOtDetalle.folioSistema || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Cuenta</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.claveCliente}}" ng-bind="infoOtDetalle.claveCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Cliente</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.nombreCliente}}" ng-bind="infoOtDetalle.nombreCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Contacto</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.nombreContacto}}" ng-bind="infoOtDetalle.nombreContacto || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Fecha</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.fechaAgenda}}" ng-bind="infoOtDetalle.fechaAgenda || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Estatus</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.Status}}" ng-bind="infoOtDetalle.descripcionEstatus || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Estado</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.Estado}}" ng-bind="infoOtDetalle.descripcionEstado || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Motivo</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.Motivo}}" ng-bind="infoOtDetalle.descripcionMotivo || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Latitud</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.latitud}}" ng-bind="infoOtDetalle.direccion.latitud || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Longitud</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.longitud}}" ng-bind="infoOtDetalle.direccion.longitud || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Ciudad </span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.ciudad}}" ng-bind="infoOtDetalle.direccion.ciudad || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Estado</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.estado}}" ng-bind="infoOtDetalle.direccion.estado || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Municipio</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.municipio}}" ng-bind="infoOtDetalle.direccion.municipio || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Colonia</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.colonia}}" ng-bind="infoOtDetalle.direccion.colonia || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Calle</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.calle}}" ng-bind="infoOtDetalle.direccion.calle || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Num. interior</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.numeroInterior}}" ng-bind="infoOtDetalle.direccion.numeroInterior || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Num. exterior</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.numeroExterior}}" ng-bind="infoOtDetalle.direccion.entreCalles || 'Sin dato'"></span>
                                                </div>
                                            </div>

                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">C&oacute;digo postal</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.codigoPostal}}" ng-bind="infoOtDetalle.direccion.codigoPostal || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Referencia</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.referencias}}" ng-bind="infoOtDetalle.direccion.referencias || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Entre calles</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.direccion.entreCalles}}" ng-bind="infoOtDetalle.direccion.entreCalles || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Tel&eacute;fono</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.telefonoCliente}}" ng-bind="infoOtDetalle.telefonoCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-title-detalle-ot">Tel. contacto</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-detalle-ot" title="{{infoOtDetalle.telefonoContacto}}" ng-bind="infoOtDetalle.telefonoContacto || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-detalle-historico">
                                    <div class="container">
                                        <jsp:include page="../content/historicoDetalleOT.jsp"></jsp:include>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-detalle-postVenta">
                                    <div class="container">
                                        <jsp:include page="../content/soporteDetalleOT.jsp"></jsp:include>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-detalle-pagos">
                                    <div class="container">
                                        <jsp:include page="../content/pagoDetalleOT.jsp"></jsp:include>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-detalle-dispositivos">
                                    <div class="container container-tabla-dispositivo-detalle-ot ">
                                        <jsp:include page="../content/dispositivosDetalleOT.jsp"></jsp:include>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-detalle-materiales-ot">
                                    <div class="container container-tabla-dispositivo-detalle-ot ">
                                        <jsp:include page="../content/materialesDetalleOT.jsp"></jsp:include>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-detalle-recoleccion-ot">
                                    <div class="container container-tabla-dispositivo-detalle-ot ">
                                        <jsp:include page="../content/recoleccionDetalleOT.jsp"></jsp:include>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>