<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalleOt">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Informaci&oacute;n de la orden</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div style="padding-left: 0;" class="col-2">
                            <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-detalle-ot" role="tablist"
                                aria-orientation="vertical">
                                <a class="nav-link active" id="v-tabs-consulta-detalleot-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consulta-detalleot" role="tab"
                                    aria-controls="v-tabs-consulta-detalleot-tab"
                                    aria-selected="true">Informaci&oacute;n</a>
                                <a ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1" class="nav-link "
                                    id="v-tabs-consulta-historico-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consulta-historico" role="tab" ng-click="consultarHistorial()"
                                    aria-controls="v-tabs-consulta-historico-tab"
                                    aria-selected="true">Hist&oacute;rico</a>
                                <a ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1" class="nav-link"
                                    id="v-tabs-consulta-mensajeria-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consulta-mensajeria" role="tab" ng-click="consultarComentarios();"
                                    aria-controls="v-tabs-consulta-mensajeria-tab" aria-selected="false">Comentarios</a>
                                <a ng-show="permisosModal.indexOf('tabAccionesOrdenDespacho') !== -1" class="nav-link" id="v-tabs-consulta-acciones-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-acciones" role="tab"
                                    aria-controls="v-tabs-consulta-acciones-tab" aria-selected="false">Acciones</a>
                                <!--a ng-show="permisosModal.indexOf('tabInformacionPaqueteDespacho') !== -1"
                                    class="nav-link" id="v-tabs-consulta-paquete-tab" data-mdb-toggle="tab"
                                    href="#v-tabs-consulta-paquete" ng-click="obtenerPaquete()" role="tab"
                                    aria-controls="v-tabs-consulta-paquete-tab" aria-selected="false">Paquete</a-->
                            </div>
                        </div>
                        <div class="col-10">
                            <div class="tab-content" id="v-tabs-tabContent">
                                <div class="tab-pane fade show active" id="v-tabs-consulta-detalleot" role="tabpanel" aria-labelledby="v-tabs-consulta-detalleot-tab">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">OT</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo" title="{{infoOtDetalle.idOrden}}"
                                                        ng-bind="infoOtDetalle.idOrden || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">OS</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo" title="{{infoOtDetalle.folioSistema}}"
                                                        ng-bind="infoOtDetalle.folioSistema || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Cuenta</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.claveCliente}}"
                                                        ng-bind="infoOtDetalle.claveCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Cliente</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.nombreCliente}}"
                                                        ng-bind="infoOtDetalle.nombreCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Contacto</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.nombreContacto}}"
                                                        ng-bind="infoOtDetalle.nombreContacto || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Fecha</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.fechaAgenda}}"
                                                        ng-bind="infoOtDetalle.fechaAgenda || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Estatus</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo" title="{{infoOtDetalle.Status}}"
                                                        ng-bind="infoOtDetalle.descripcionEstatus || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Estado</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo" title="{{infoOtDetalle.Estado}}"
                                                        ng-bind="infoOtDetalle.descripcionEstado || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Motivo</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo" title="{{infoOtDetalle.Motivo}}"
                                                        ng-bind="infoOtDetalle.descripcionMotivo || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Latitud </span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.latitud}}"
                                                        ng-bind="infoOtDetalle.direccion.latitud || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Longitud</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.longitud}}"
                                                        ng-bind="infoOtDetalle.direccion.longitud || 'Sin dato'"></span>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-6">
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Ciudad </span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.ciudad}}"
                                                        ng-bind="infoOtDetalle.direccion.ciudad || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Estado</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.estado}}"
                                                        ng-bind="infoOtDetalle.direccion.estado || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Municipio</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.municipio}}"
                                                        ng-bind="infoOtDetalle.direccion.municipio || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Colonia</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.colonia}}"
                                                        ng-bind="infoOtDetalle.direccion.colonia || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Calle</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.calle}}"
                                                        ng-bind="infoOtDetalle.direccion.calle || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Num. interior</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.numeroInterior}}"
                                                        ng-bind="infoOtDetalle.direccion.numeroInterior || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Num. exterior</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.numeroExterior}}"
                                                        ng-bind="infoOtDetalle.direccion.numeroExterior || 'Sin dato'"></span>
                                                </div>
                                            </div>

                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">C&oacute;digo postal</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.codigoPostal}}"
                                                        ng-bind="infoOtDetalle.direccion.codigoPostal || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Referencia</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.referencias}}"
                                                        ng-bind="infoOtDetalle.direccion.referencias || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Entre calles</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.direccion.entreCalles}}"
                                                        ng-bind="infoOtDetalle.direccion.entreCalles || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Tel&eacute;fono</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.telefonoCliente}}"
                                                        ng-bind="infoOtDetalle.telefonoCliente || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span
                                                        class="text-tile-vehiculo">Tel. contacto</span></div>
                                                <div class="container-text-content-detalle"><span
                                                        class="text-content-vehiculo"
                                                        title="{{infoOtDetalle.telefonoContacto}}"
                                                        ng-bind="infoOtDetalle.telefonoContacto || 'Sin dato'"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1" class="tab-pane fade " id="v-tabs-consulta-historico" role="tabpanel" aria-labelledby="v-tabs-consulta-historico-tab">
                                    <div ng-if="!historialOrdenTrabajo.length"
                                        style="text-align: center; margin-top: 2em;">
                                        <span style="font-size: 12px !important;color:grey; font-weight: lighter;" class="timeline__day">
                                            <span class="timeline__month">
                                                <i class="fa fa-exclamation-circle warning-nodata"></i>
                                            </span>
                                            NO SE ENCONTRARON DATOS
                                        </span>
                                    </div>
                        
                                    <div class="row content-historico-ot" style="height: 300px; max-height: 300px; overflow: auto;">
                                        <div class="row" ng-repeat="elementHistorico in historialOrdenTrabajo" style="height: fit-content;">
                                            <div class="col-2 line-time-new">
                                                <div style="background-color:white;" class="timeline__date">
                                                    <span style="font-size: 15px !important;color:grey;"
                                                        class="timeline__day">OT</span>
                                                    <span style="font-size: 12px !important;" class="timeline__month">
                                                        <i ng-if="elementHistorico.idEstatusOrden==1"
                                                            class="pendiente-historico  fas fa-pause circle-statushistorico-histo"></i>
                                                        <i ng-if="elementHistorico.idEstatusOrden==2"
                                                            class="asignacion-historico fas fa-arrow-right circle-statushistorico-histo"></i>
                                                        <i ng-if="elementHistorico.idEstatusOrden==3"
                                                            class="detencion-historico far fa-hand-paper circle-statushistorico-histo"></i>
                                                        <i ng-if="elementHistorico.idEstatusOrden==4"
                                                            class="terminar-historico fas fa-check circle-statushistorico-histo"></i>
                                                        <i ng-if="elementHistorico.idEstatusOrden==5"
                                                            class="cancelado-historico fas fa-times circle-statushistorico-histo"></i>
                                                    </span>
                                                </div>
                                            </div>

                                            <div id="content-historial-{{$index}}" class="col-10"
                                                style="display: grid;">
                                                <div class="card-historico card text-center historico-alertas-div">
                                                    <div class="card-body">
                                                        <i ng-if="elementHistorico.idEstatusOrden==1"
                                                            class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
                                                        <i ng-if="elementHistorico.idEstatusOrden==2"
                                                            class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
                                                        <i ng-if="elementHistorico.idEstatusOrden==3"
                                                            class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
                                                        <i ng-if="elementHistorico.idEstatusOrden==4"
                                                            class="terminar-historico fas fa-check circle-statushistorico"></i>
                                                        <i ng-if="elementHistorico.idEstatusOrden==5"
                                                            class="cancelado-historico fas fa-times circle-statushistorico"></i>

                                                        <div class="container-deschistorico">
                                                            <span class="titlehistorico">Estatus:</span>
                                                            <span class="content-titlehistorico"
                                                                ng-bind="elementHistorico.descripcionEstatusOrden || 'SIN DATO'"></span>
                                                        </div>
                                                        <div class="container-deschistorico">
                                                            <span class="titlehistorico">Estado:</span>
                                                            <span class="content-titlehistorico"
                                                                ng-bind="elementHistorico.descripcionEstadoOrden || 'SIN DATO'"></span>
                                                        </div>
                                                        <div class="container-deschistorico">
                                                            <span class="titlehistorico">Motivo:</span>
                                                            <span class="content-titlehistorico"
                                                                ng-bind="elementHistorico.descripcionMotivoOrden  || 'SIN DATO'"></span>
                                                        </div>
                                                        <div class="container-deschistorico">
                                                            <span class="titlehistorico">Despacho:</span>
                                                            <span class="content-titlehistorico"
                                                                ng-bind="elementHistorico.nombreUsuarioDespacho || 'SIN DATO'"></span>
                                                            <p class="footer-card-historico-alerta"
                                                                ng-bind="elementHistorico.fecha+' '+elementHistorico.hora">
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="card-footer text-muted">
                                                        <div class="container-deschistorico">
                                                            <span class="titlehistorico">Usuario:</span>
                                                            <span class="content-titlehistorico"
                                                                ng-bind="elementHistorico.nombreUsuario  || 'SIN DATO'"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1" class="tab-pane fade" id="v-tabs-consulta-mensajeria" role="tabpanel" aria-labelledby="v-tabs-consulta-mensajeria-tab">
                                    <div class="container-mensajes-parent">
                                        <div class="chat-content-area">
                                            <div class="chat-header">
                                            </div>
                                            
                                            <div class="chat-area" style="height: 20em; overflow-y: auto;">
                                                <div ng-if="!comentariosOrdenTrabajo.length"
                                                    style="text-align: center; margin-top: 2em;">
                                                    <span style="font-size: 12px !important;color:grey; font-weight: lighter;" class="timeline__day">
                                                        <span class="timeline__month">
                                                            <i class="fa fa-exclamation-circle warning-nodata"></i>
                                                        </span>
                                                        NO SE ENCONTRARON COMENTARIOS
                                                    </span>
                                                </div>
                                                <div class="chats" ng-repeat="comentario in comentariosOrdenTrabajo">
                                                    <div class="chat" ng-if="comentario.origenSistema === 2">
                                                        <!-- APP-->
                                                        <div class="chat-avatar">
                                                            <a class="avatar"><i
                                                                    class="img-comentarios-chat android-mensaje fab fa-android"
                                                                    style="margin-top: 1em;"></i></a>
                                                        </div>

                                                        <div class="chat-body">
                                                            <span class="text-fecha-comentario"
                                                                ng-bind="comentario.fechaComentario"></span>
                                                            <div class="chat-text">
                                                                <span ng-bind="comentario.comentario"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="chat chat-right" ng-if="comentario.origenSistema !== 2">
                                                        <div class="chat-body">
                                                            <span class="text-fecha-comentario"
                                                                ng-bind="comentario.fechaComentario"></span>
                                                            <div class="chat-text">
                                                                <span ng-bind="comentario.comentario"></span>
                                                            </div>
                                                        </div>
                                                        <div class="chat-avatar">
                                                            <a class="avatar">
                                                                <i class="img-comentarios-chat web-mensaje fas fa-desktop"
                                                                    style="margin-top: 1em;"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row float-right col-chat-fotter"
                                                style="margin-top: 2em; margin-right: 2em;">
                                                <div class="col-6">
                                                    <input id="comentarioOt"
                                                        placeholder="Escribe el mensaje aqu&iacute; ..." type="text"
                                                        class="input-mensaje-chat form-control form-control-sm input-comentario-ot"
                                                        ng-model="comentarios">
                                                </div>
                                                <div class="col-3" style="left: 200px;height: 50px;">
                                                    <button class="btn btn-primary btn-enviar-comentario-ot"
                                                        ng-click="addComentariosOt()">Enviar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div ng-show="permisosModal.indexOf('tabAccionesOrdenDespacho') !== -1" class="tab-pane fade" id="v-tabs-consulta-acciones" role="tabpanel" aria-labelledby="v-tabs-consulta-acciones-tab">
                                    <ul class="nav nav-tabs mb-3 nav-fill tabs-acciones-modal" id="ex1" role="tablist">
                                        <li class="nav-item" role="presentation" ng-show="vistaCoordinacion !== 1">
                                            <a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusReagendaModal') !== -1 }"
                                                id="opcion-reagendar" class="nav-link active" data-mdb-toggle="tab"
                                                href="#accion-reagendar-ot">Reagendar</a>
                                        </li>
                                        <li class="nav-item" role="presentation" ng-show="vistaCoordinacion !== 7">
                                            <a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusGestoriaModal') !== -1 }"
                                                id="opcion-plaza" class="nav-link" data-mdb-toggle="tab"
                                                href="#accion-plaza-comercial-ot">Plaza comercial</a>
                                        </li>
                                        <li class="nav-item" role="presentation" ng-show="vistaCoordinacion !== 6">
                                            <a ng-class="{'permiso-accion-modal' : permisosModal.indexOf('tabCambioEstatusCalendarizarModal') !== -1 }"
                                                id="opcion-calendarizar" class="nav-link" data-mdb-toggle="tab"
                                                href="#accion-calendarizar-ot">Calendarizar</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="ex1-content">
                                        <div class="tab-pane fade show active" id="accion-reagendar-ot">
                                            <div class="container container-accion">
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="fecha-reagendamiento">Fecha
                                                                reagendamiento:</label>
                                                            <input type="text"
                                                                ng-model="elementReagendaOT.fechaReagendamiento"
                                                                id="fecha-reagendamiento" class="form-control" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-turno-reagenda">Turno:</label>
                                                            <select class="form-control" id="id-turno-reagenda"
                                                                ng-model="elementReagendaOT.turno"
                                                                ng-options="turno.nombre for turno in listadoTurnosAcciones">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-motivo-reagenda">Motivo:</label>
                                                            <select class="form-control" id="id-motivo-reagenda"
                                                                ng-model="elementReagendaOT.motivo"
                                                                ng-options="motivo.nombre for motivo in listadoMotivosReagenda">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <label for="exampleTextarea">Comentario:</label>
                                                            <textarea class="form-control" style=" resize: none"
                                                                ng-model="elementReagendaOT.comentario"
                                                                placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                                                                rows="3"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <button ng-show="accionesUserConfigText.indexOf('accionReagendaOT') !== -1" ng-click="cambioStatus('reagendamiento')"
                                                            class="btn  btn-primary">Reagendar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="accion-calendarizar-ot">
                                            <div class="container container-accion">
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="fecha-calendarizado">Fecha
                                                                calendarizado:</label>
                                                            <input type="text" id="fecha-calendarizado"
                                                                ng-model="elementCalendarizado.fechaCalendarizado"
                                                                class="form-control " readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-turno-calendarizado">Turno:</label>
                                                            <select class="form-control" id="id-turno-calendarizado"
                                                                ng-model="elementCalendarizado.turno"
                                                                ng-options="turno.nombre for turno in listadoTurnosAcciones">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-motivo-calendarizado">Motivo:</label>
                                                            <select class="form-control" id="id-motivo-calendarizado"
                                                                ng-model="elementCalendarizado.motivo"
                                                                ng-options="motivo.nombre for motivo in listadoMotivosCalendarizado">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <label for="exampleTextarea">Comentario:</label>
                                                            <textarea class="form-control" style=" resize: none"
                                                                ng-model="elementCalendarizado.comentario"
                                                                placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                                                                rows="3"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <button ng-click="cambioStatus('calendariza')" class="btn btn-primary">Calendarizar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="accion-plaza-comercial-ot">
                                            <div class="container container-accion">
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-turno-calendarizado">Estado:</label>
                                                            <select class="form-control" id="id-estado-plaza-comercial"
                                                                ng-model="elementoPlazaComercial.estado"
                                                                ng-options="turno.nombre for turno in listadoEstadoGestoria">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"
                                                                class="fa fa-user-circle-o fa-2x"></i>
                                                            <label for="id-motivo-calendarizado">Motivo:</label>
                                                            <select class="form-control" id="id-motivo-calendarizado"
                                                                ng-model="elementoPlazaComercial.motivo"
                                                                ng-options="motivo.nombre for motivo in listadoMotivosGestaria">
                                                                <option value="">Seleccione ...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <label for="exampleTextarea">Comentario:</label>
                                                            <textarea class="form-control" style=" resize: none"
                                                                ng-model="elementoPlazaComercial.comentario"
                                                                placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"
                                                                rows="3"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <button ng-click="cambioStatus('gestoria')" class="btn  btn-primary">Plaza</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--div ng-show="permisosModal.indexOf('tabInformacionPaqueteDespacho') !== -1" class="tab-pane fade" id="v-tabs-consulta-paquete" role="tabpanel"
                                    aria-labelledby="v-tabs-consulta-paquete-tab">
                                    Paquete
                                </div-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div-->
        </div>
    </div>
</div>