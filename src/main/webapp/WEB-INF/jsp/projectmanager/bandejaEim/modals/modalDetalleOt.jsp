<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-detalle-ot" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title modal-title-consulta-ot" style="color: grey;">Detalle de la Orden</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body pl-0">
                <div class="container">
                    <div class="row">
                        <div style="padding-left: 0;" class="col-2">
                            <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-detalle-ot" role="tablist" aria-orientation="vertical">
                                <a data-mdb-toggle="tab" href="#content-ot" class="nav-link active" id="informacion-ot">Informaci&oacute;n</a>
                                <a ng-click="consultaHistoricoOt()" data-mdb-toggle="tab" href="#content-historico" ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1" class="nav-link" id="info_historico">Hist&oacute;rico</a>
                                <a ng-click="consultaChat()" data-mdb-toggle="tab" href="#content-comentarios" ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1" class="nav-link" id="comentarios">Comentarios</a>
                                <a ng-click="consultaMaterialesOT()" data-mdb-toggle="tab" href="#content-materiales-ot" ng-show="permisosModal.indexOf('tabConsultaMaterialesOT') !== -1" class="nav-link" id="dispositivo-Ot">Materiales</a>
                            </div>
                        </div>
                        <div class="col-10">
                            <div id="tab-content-modal-detalle-ot" class="tab-content">
                                <div class="contenedor_detalle row tab-pane fade show active" id="content-ot" role="tabpanel" aria-labelledby="v-tabs-consulta-acciones-tab">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">OT</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.idOrden}}" ng-bind="infoOtDetalle.idOrden || 'Sin dato'"></span> 
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">OS</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.folioSistema}}" ng-bind="infoOtDetalle.folioSistema || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Cuenta</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.claveCliente}}" ng-bind="infoOtDetalle.claveCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Cliente</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.nombreCliente}}" ng-bind="infoOtDetalle.nombreCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Contacto</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.nombreContacto}}" ng-bind="infoOtDetalle.nombreContacto || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Fecha</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.fechaHoraProgramada}}" ng-bind="infoOtDetalle.fechaHoraProgramada || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Estatus</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.Status}}" ng-bind="infoOtDetalle.descripcionEstatus || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Estado</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.Estado}}" ng-bind="infoOtDetalle.descripcionEstado || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Motivo</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.Motivo}}" ng-bind="infoOtDetalle.descripcionMotivo || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Latitud</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.latitud}}" ng-bind="infoOtDetalle.direccion.latitud || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Longitud</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.longitud}}" ng-bind="infoOtDetalle.direccion.longitud || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Carta aceptaci&oacute;n</span></div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" ng-show="!infoOtDetalle.acta" ng-bind="'No se encontr&oacute; carta de aceptaci&oacute;n'"></span>
                                                    <div class="content-descarga-archivo content-descarga-consulta"  ng-show="infoOtDetalle.acta" style="padding-right: calc(var(--bs-gutter-x)/2); padding-left: calc(var(--bs-gutter-x)/2);">
                                                        <a href="{{infoOtDetalle.acta}}" style="cursor: pointer; text-decoration: none;" class="text-title-descarga-adjuntado">
                                                            <i class="iconoDescargaArchivo fas fa-cloud-download-alt"></i>
                                                            <span class="textoTituloCardsConsulta text-descarga-consulta ng-binding">Descargar</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Ciudad </span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.ciudad}}" ng-bind="infoOtDetalle.direccion.ciudad || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Estado</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.estado}}" ng-bind="infoOtDetalle.direccion.estado || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Municipio</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.municipio}}" ng-bind="infoOtDetalle.direccion.municipio || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Colonia</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.colonia}}" ng-bind="infoOtDetalle.direccion.colonia || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Calle</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.calle}}" ng-bind="infoOtDetalle.direccion.calle || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Num. interior</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.numeroInterior}}" ng-bind="infoOtDetalle.direccion.numeroInterior || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Num. exterior</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.numeroExterior}}" ng-bind="infoOtDetalle.direccion.numeroExterior || 'Sin dato'"></span>
                                                </div>
                                            </div>

                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">C&oacute;digo postal</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.codigoPostal}}" ng-bind="infoOtDetalle.direccion.codigoPostal || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Referencia</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.referencias}}" ng-bind="infoOtDetalle.direccion.referencias || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Entre calles</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.entreCalles}}" ng-bind="infoOtDetalle.direccion.entreCalles || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Tel&eacute;fono</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.telefonoCliente}}" ng-bind="infoOtDetalle.telefonoCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle">
                                                    <span class="text-tile-vehiculo">Tel. contacto</span>
                                                </div>
                                                <div class="container-text-content-detalle">
                                                    <span class="text-content-vehiculo" title="{{infoOtDetalle.telefonoContacto}}" ng-bind="infoOtDetalle.telefonoContacto || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-comentarios">
                                    <div class="container">
                                        <jsp:include page="contentTap/modalChat.jsp"></jsp:include>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-historico">
                                    <div class="container">
                                        <jsp:include page="contentTap/modalHistorico.jsp"></jsp:include>
                                    </div>
                                </div>
                                <div class="contenedor_detalle row tab-pane fade" id="content-materiales-ot">
                                    <div class="container container-tabla-dispositivo-consulta-ot">
                                        <jsp:include page="contentTap/materialesOt.jsp"></jsp:include>
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