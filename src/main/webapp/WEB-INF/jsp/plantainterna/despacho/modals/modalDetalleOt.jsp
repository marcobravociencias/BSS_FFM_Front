<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalleOT">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Detalle de la orden  {{}} </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close" >
                </button>
            </div>
			<div class="modal-body">
				<div  class="container">                    
                    <div class="row">
                        <div style="padding-left: 0;" class="col-2">
                          <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-detalle-ot" role="tablist" aria-orientation="vertical" >
                                <a class="nav-link active" id="v-tabs-consulta-detalleot-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-detalleot" role="tab" aria-controls="v-tabs-consulta-detalleot-tab" aria-selected="true" >Informaci&oacute;n</a>
                                <a ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1" class="nav-link " id="v-tabs-consulta-historico-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-historico" role="tab" ng-click="consultarHistorial()" aria-controls="v-tabs-consulta-historico-tab" aria-selected="true" >Hist&oacute;rico</a>
                                <a ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1" class="nav-link" id="v-tabs-consulta-mensajeria-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-mensajeria" role="tab" ng-click="consultarComentarios();" aria-controls="v-tabs-consulta-mensajeria-tab" aria-selected="false" >Comentarios</a>
                                <a ng-show="permisosModal.indexOf('tabPedidoDespacho') !== -1" class="nav-link" id="v-tabs-consulta-pedido-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-pedido" role="tab" ng-click="consultarPedido();" aria-controls="v-tabs-consulta-pedido-tab" aria-selected="false" >Pedido</a>                
                                <a ng-show="permisosModal.indexOf('tabAccionesOrdenDespacho') !== -1" class="nav-link" id="v-tabs-consulta-acciones-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-acciones" role="tab" aria-controls="v-tabs-consulta-acciones-tab" aria-selected="false" >Acciones</a>                    
                                <a ng-show="permisosModal.indexOf('tabInformacionPaqueteDespacho') !== -1" class="nav-link" id="v-tabs-consulta-paquete-tab" data-mdb-toggle="tab" href="#v-tabs-consulta-paquete" ng-click="obtenerPaquete()" role="tab" aria-controls="v-tabs-consulta-paquete-tab" aria-selected="false" >Paquete</a>                                                
                            </div>
                        </div>                     
                        <div class="col-10">
                          <div class="tab-content" id="v-tabs-tabContent">
                            <div class="tab-pane fade show active"  id="v-tabs-consulta-detalleot" role="tabpanel" aria-labelledby="v-tabs-consulta-detalleot-tab" >
                                <div class="row">
                                    <div class="col-6">
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OT</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="infoOtDetalle.idOrden || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OS</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Folio_os}}" ng-bind="infoOtDetalle.Folio_os || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cuenta</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.claveCliente}}" ng-bind="infoOtDetalle.claveCliente || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cliente</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.nombreCliente}}" ng-bind="infoOtDetalle.nombreCliente || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Contacto</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.nombreContacto}}" ng-bind="infoOtDetalle.nombreContacto || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Fecha</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.fechaAgenda}}" ng-bind="infoOtDetalle.fechaAgenda || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Estatus</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Status}}" ng-bind="infoOtDetalle.descripcionEstatus || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Estado</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Estado}}" ng-bind="infoOtDetalle.descripcionEstado || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Motivo</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Motivo}}" ng-bind="infoOtDetalle.descripcionMotivo || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Latitud </span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.latitud}}" ng-bind="infoOtDetalle.direccion.latitud || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Longitud</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.longitud}}" ng-bind="infoOtDetalle.direccion.longitud || 'Sin dato'"></span> </div>
                                        </div>
                                   
                                    </div>
                                    <div class="col-6">
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Ciudad </span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.ciudad}}" ng-bind="infoOtDetalle.direccion.ciudad || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Estado</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.estado}}" ng-bind="infoOtDetalle.direccion.estado || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Municipio</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.municipio}}" ng-bind="infoOtDetalle.direccion.municipio || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Colonia</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.colonia}}" ng-bind="infoOtDetalle.direccion.colonia || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Calle</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.calle}}" ng-bind="infoOtDetalle.direccion.calle || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. interior</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.numeroInterior}}" ng-bind="infoOtDetalle.direccion.numeroInterior || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. exterior</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.numeroExterior}}" ng-bind="infoOtDetalle.direccion.entreCalles || 'Sin dato'"></span> </div>
                                        </div>
                                     
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">C&oacute;digo postal</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.codigoPostal}}" ng-bind="infoOtDetalle.direccion.codigoPostal || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Referencia</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.referencias}}" ng-bind="infoOtDetalle.direccion.referencias || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Entre calles</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.direccion.entreCalles}}" ng-bind="infoOtDetalle.direccion.entreCalles || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tel&eacute;fono</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.telefonoCliente}}" ng-bind="infoOtDetalle.telefonoCliente || 'Sin dato'"></span> </div>
                                        </div>
                                        <div class="container-fluid vehiculo-content">
                                            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tel. contacto</span></div>
                                            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.telefonoContacto}}" ng-bind="infoOtDetalle.telefonoContacto || 'Sin dato'"></span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  ng-show="permisosModal.indexOf('tabHistoricoDespacho') !== -1" class="tab-pane fade " id="v-tabs-consulta-historico" role="tabpanel" aria-labelledby="v-tabs-consulta-historico-tab" >
                                <div id="content-principal-historial" class="row">
                                    <div id="content-historial-{{$index}}" done-listado-dependencia-historico ng-repeat="elementHistorico in historialOrdenTrabajo" class="col-4" style="display: grid;">
                                        <div  class="card-historico card text-center">
                                            <div class="card-body">
                                                <i ng-if="elementHistorico.idEstatusOrden==1" class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==3" class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==4" class="terminar-historico fas fa-check circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==5" class="cancelado-historico fas fa-times circle-statushistorico"></i> 

                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Estado</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstatusOrden"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Motivo</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.descripcionMotivoOrden"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Descripci&oacute;n:</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstadoOrden"></span>
                                                </div>
                                            </div>
                                            <div class="card-footer text-muted">
                                                <p class="footer-card-historico" ng-bind="elementHistorico.fecha+' '+elementHistorico.hora" ></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            

                            </div>
                            <div  ng-show="permisosModal.indexOf('tabComentariosDespacho') !== -1" class="tab-pane fade" id="v-tabs-consulta-mensajeria" role="tabpanel" aria-labelledby="v-tabs-consulta-mensajeria-tab">
                                <div class="container-mensajes-parent">
                                    <div class="chat-content-area">
                                        <div class="chat-header">
                                        </div>
                                        <div class="chat-area" style="height: 20em; overflow-y: auto;">
                                            <div class="chats" ng-repeat="comentario in comentariosOrdenTrabajo">
                                                <div class="chat" ng-if="comentario.origenSistema === 1"><!-- APP-->
                                                    <div class="chat-avatar">
                                                        <a class="avatar"><i class="img-comentarios-chat android-mensaje fab fa-android" style="margin-top: 1em;"></i></a>
                                                    </div>
                                                    
                                                    <div class="chat-body">
                                                        <span class="text-fecha-comentario" ng-bind="comentario.fechaComentario"></span>
                                                        <div class="chat-text">
                                                            <p ng-bind="comentario.comentario"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="chat chat-right" ng-if="comentario.origenSistema !== 1">
                                                    <div class="chat-body">
                                                        <span class="text-fecha-comentario" ng-bind="comentario.fechaComentario"></span>
                                                        <div class="chat-text">
                                                            <p ng-bind="comentario.comentario"></p>
                                                        </div>
                                                    </div>
                                                    <div class="chat-avatar">
                                                        <a class="avatar">
                                                            <i class="img-comentarios-chat web-mensaje fas fa-desktop" style="margin-top: 1em;"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row float-right col-chat-fotter" style="margin-top: 2em; margin-right: 2em;">
                                            <div class="col-6">
                                                <input id="comentarioOt" placeholder="Escribe el mensaje aqu&iacute; ..." type="text" class="input-mensaje-chat form-control form-control-sm input-comentario-ot" ng-model="comentarios">
                                            </div>
                                            <div class="col-3" style="left: 200px;height: 50px;">
                                                <button class="btn btn-primary btn-enviar-comentario-ot" ng-click="addComentariosOt()">Enviar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div ng-show="permisosModal.indexOf('tabAccionesOrdenDespacho') !== -1"  class="tab-pane fade" id="v-tabs-consulta-acciones" role="tabpanel" aria-labelledby="v-tabs-consulta-acciones-tab">
                                <ul class="nav nav-tabs mb-3 nav-fill " id="ex1" role="tablist">
                                    <li ng-show="permisosModal.indexOf('tabCambioEstatusRescateModal') !== -1" class="nav-item" role="presentation">
                                        <a class="nav-link active" data-mdb-toggle="tab"  href="#accion-rescate-ot" >Rescate</a>
                                    </li>
                                    <li ng-show="permisosModal.indexOf('tabCambioEstatusReagendaModal') !== -1" class="nav-item" role="presentation">
                                        <a class="nav-link" data-mdb-toggle="tab" href="#accion-reagendar-ot" >Reagendar</a>
                                    </li>
                                    <li ng-show="permisosModal.indexOf('tabCambioEstatusGestoriaModal') !== -1" class="nav-item" role="presentation">
                                        <a class="nav-link" data-mdb-toggle="tab" href="#accion-plaza-comercial-ot" >Plaza comercial</a>
                                    </li>
                                    <li ng-show="permisosModal.indexOf('tabCambioEstatusCalendarizarModal') !== -1"  class="nav-item" role="presentation">
                                        <a class="nav-link" data-mdb-toggle="tab" href="#accion-calendarizar-ot">Calendarizar</a>
                                    </li>
                                    <li  ng-show="permisosModal.indexOf('tabCambioEstatusTerminarModal') !== -1" class="nav-item" role="presentation">
                                        <a class="nav-link" data-mdb-toggle="tab" href="#accion-terminar-ot" >Terminar</a>
                                    </li>   
                                    <li  ng-show="permisosModal.indexOf('tabCambioEstatusDesasignarModal') !== -1" class="nav-item" role="presentation">
                                        <a class="nav-link" data-mdb-toggle="tab" href="#accion-desasignar-ot" >Desasignar</a>
                                    </li>
                                 
                                </ul>
                                <div class="tab-content" id="ex1-content">
                                    <div  ng-show="permisosModal.indexOf('tabCambioEstatusRescateModal') !== -1" class="tab-pane fade show active" id="accion-rescate-ot" >
                                        <div class="container container-accion">
                               
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-status-tecnico">Motivo:</label>
                                                        <select class="form-control" ng-model="elementoRescate.motivo" ng-options="motivo.nombre for motivo in listadoMotivosRescate">
                                                            <option value="">Seleccione ...</option>
                                                        </select>                                               
                                                      </div>
                                                </div>
                                            </div>		
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label for="exampleTextarea">Comentario:</label>
                                                        <textarea class="form-control" style=" resize: none" ng-model="elementoRescate.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres"  rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">                                                    
                                                    <button ng-show="accionesUserConfigText.indexOf('accionCancelaOT') !== -1" 
                                                        ng-click="cambioStatus('cancela')"  class="btn  btn-primary">Recate</button>
                                                        
                                                    <div ng-show="accionesUserConfigText.indexOf('accionCancelaOT') === -1"  class="text-accion-nopermiso">
                                                        <i class="icon-not-permiso fas fa-user-lock"></i>
                                                        <b class="text-not-permiso">No tienes permiso para enviar a rescate</b>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>                                     
                                    </div>
                                    <div  ng-show="permisosModal.indexOf('tabCambioEstatusReagendaModal') !== -1" class="tab-pane fade" id="accion-reagendar-ot" >
                                        <div class="container container-accion">
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="fecha-reagendamiento">Fecha reagendamiento:</label>
                                                        <input type="text" ng-model="elementReagendaOT.fechaReagendamiento" id="fecha-reagendamiento" class="form-control" readonly>                                 
                                                      </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-turno-reagenda">Turno:</label>
                                                        <select class="form-control" id="id-turno-reagenda" ng-model="elementReagendaOT.turno" ng-options="turno.nombre for turno in listadoTurnosAcciones">
                                                            <option value="">Seleccione ...</option>
                                                        </select>                                               
                                                      </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-motivo-reagenda">Motivo:</label>
                                                        <select class="form-control" id="id-motivo-reagenda" ng-model="elementReagendaOT.motivo" ng-options="motivo.nombre for motivo in listadoMotivosReagenda">
                                                            <option value="">Seleccione ...</option>
                                                        </select>                                               
                                                      </div>
                                                </div>
                                            </div>		
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label for="exampleTextarea">Comentario:</label>
                                                        <textarea class="form-control" style=" resize: none" ng-model="elementReagendaOT.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <button ng-show="accionesUserConfigText.indexOf('accionReagendaOT') !== -1" 
                                                        ng-click="cambioStatus('reagendamiento')"  class="btn  btn-primary">Reagendar</button>
                                                        
                                                    <div ng-show="accionesUserConfigText.indexOf('accionReagendaOT') === -1"  class="text-accion-nopermiso">
                                                        <i class="icon-not-permiso fas fa-user-lock"></i>
                                                        <b class="text-not-permiso">No tienes permiso para reagendar ordenes</b>
                                                    </div>                                               
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div  ng-show="permisosModal.indexOf('tabCambioEstatusCalendarizarModal') !== -1" class="tab-pane fade" id="accion-calendarizar-ot" >
                                        <div class="container container-accion">
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="fecha-calendarizado">Fecha calendarizado:</label>
                                                        <input type="text" id="fecha-calendarizado" ng-model="elementCalendarizado.fechaCalendarizado" class="form-control " readonly>                                 
                                                      </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-turno-calendarizado">Turno:</label>
                                                        <select class="form-control" id="id-turno-calendarizado" ng-model="elementCalendarizado.turno" ng-options="turno.nombre for turno in listadoTurnosAcciones">
                                                            <option value="">Seleccione ...</option>
                                                        </select>                                               
                                                      </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-motivo-calendarizado">Motivo:</label>
                                                        <select class="form-control" id="id-motivo-calendarizado" ng-model="elementCalendarizado.motivo" ng-options="motivo.nombre for motivo in listadoMotivosCalendarizado">
                                                            <option value="">Seleccione ...</option>
                                                        </select>                                               
                                                      </div>
                                                </div>
                                            </div>		
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label for="exampleTextarea">Comentario:</label>
                                                        <textarea class="form-control" style=" resize: none" ng-model="elementCalendarizado.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    
                                                    <button ng-show="accionesUserConfigText.indexOf('accionCalendarizaOT') !== -1" 
                                                        ng-click="cambioStatus('calendariza')"  class="btn  btn-primary">Calendarizar</button>
                                                        
                                                    <div ng-show="accionesUserConfigText.indexOf('accionCalendarizaOT') === -1"  class="text-accion-nopermiso">
                                                        <i class="icon-not-permiso fas fa-user-lock"></i>
                                                        <b class="text-not-permiso">No tienes permiso para calendarizar ordenes</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div ng-show="permisosModal.indexOf('tabCambioEstatusGestoriaModal') !== -1"  class="tab-pane fade" id="accion-plaza-comercial-ot" >
                                        <div class="container container-accion">
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-turno-calendarizado">Estado:</label>
                                                        <select class="form-control" id="id-estado-plaza-comercial" ng-model="elementoPlazaComercial.estado" ng-options="turno.nombre for turno in listadoEstadoGestoria">
                                                            <option value="">Seleccione ...</option>
                                                        </select>                                               
                                                      </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-motivo-calendarizado">Motivo:</label>
                                                        <select class="form-control" id="id-motivo-calendarizado" ng-model="elementoPlazaComercial.motivo" ng-options="motivo.nombre for motivo in listadoMotivosGestaria">
                                                            <option value="">Seleccione ...</option>
                                                        </select>                                               
                                                      </div>
                                                </div>
                                            </div>		
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label for="exampleTextarea">Comentario:</label>
                                                        <textarea class="form-control" style=" resize: none" ng-model="elementoPlazaComercial.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <button ng-show="accionesUserConfigText.indexOf('accionGestoriaOT') !== -1" 
                                                        ng-click="cambioStatus('gestoria')"  class="btn  btn-primary">Plaza</button>

                                                    <div ng-show="accionesUserConfigText.indexOf('accionGestoriaOT') === -1"  class="text-accion-nopermiso">
                                                        <i class="icon-not-permiso fas fa-user-lock"></i>
                                                        <b class="text-not-permiso">No tienes permiso para enviar a plaza</b>
                                                    </div>  

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div  ng-show="permisosModal.indexOf('tabCambioEstatusTerminarModal') !== -1" class="tab-pane fade" id="accion-terminar-ot" >
                                        <div class="container container-accion">
                                      

                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-estado-terminar">Estado:</label>
                                                        <select class="form-control" id="id-estado-terminar" ng-model="elementTerminar.estado" ng-options="estado.nombre for estado in listadoEstadosTerminado">
                                                            <option value="">Seleccione ...</option>
                                                        </select>                                               
                                                      </div>
                                                </div>
                                            </div>		
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label for="exampleTextarea">Comentario:</label>
                                                        <textarea class="form-control" style=" resize: none" ng-model="elementTerminar.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">                                                 
                                                    <button ng-show="accionesUserConfigText.indexOf('accionTerminaOT') !== -1" 
                                                        ng-click="cambioStatus('termina')"  class="btn  btn-primary">Terminar</button>
                                                        
                                                    <div ng-show="accionesUserConfigText.indexOf('accionTerminaOT') === -1"  class="text-accion-nopermiso">
                                                        <i class="icon-not-permiso fas fa-user-lock"></i>
                                                        <b class="text-not-permiso">No tienes permiso para terminar ordenes</b>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div  ng-show="permisosModal.indexOf('tabCambioEstatusDesasignarModal') !== -1" class="tab-pane fade" id="accion-desasignar-ot" >
                                        <div class="container container-accion">                                                                                	
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <label for="exampleTextarea">Comentario:</label>
                                                        <textarea class="form-control" style=" resize: none" ng-model="elementoDesasigna.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <button ng-show="accionesUserConfigText.indexOf('accionDesasignaOT') !== -1" 
                                                            ng-click="cambioStatus('desasigna')"  class="btn  btn-primary">Desasigna</button>
                                                            
                                                    <div ng-show="accionesUserConfigText.indexOf('accionDesasignaOT') === -1"  class="text-accion-nopermiso">
                                                        <i class="icon-not-permiso fas fa-user-lock"></i>
                                                        <b class="text-not-permiso">No tienes permiso para desasignar ordenes</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div ng-show="permisosModal.indexOf('tabInformacionPaqueteDespacho') !== -1"  class="tab-pane fade" id="v-tabs-consulta-paquete" role="tabpanel" aria-labelledby="v-tabs-consulta-paquete-tab">
                                <div class="row parent-detallecotizacion">                        
                                    <div class="col-12">
                                        <div class="row justify-content-center">
                                            <div class="col-md-6">
                                                <b class="title-info-services"> Cuenta factura:</b> &nbsp; &nbsp;
                                                <span id="cuenta_factura" class="content_info_ot" ng-bind="actividadSelected.Num_cuenta_factura"> </span>
                                            </div>
                                            <div class="col-md-6">
                                                <b class="title-info-services"> Nombre plan:</b>&nbsp; &nbsp;
                                                <span id="nombre_plan" class="content_info_ot" ng-bind="responseServicios.Nombre_plan"> </span>
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-md-6">
                                                <b class="title-info-services"> Folio cotsitio plan:</b> &nbsp; &nbsp;
                                                <span id="folio_cotsitio" class="content_info_ot" ng-bind="responseServicios.Folio_cotsitio_plan"> </span>
                                            </div>
                                            <div class="col-md-6">
                                                <b class="title-info-services">Num. dns:</b>&nbsp; &nbsp;
                                                <span id="numero_dns" class="content_info_ot" ng-bind="responseServicios.Num_dns"> </span>
                                            </div>
                                        </div>
                                        <div class="row ">
                                            <div class="col-md-6">
                                                <b class="title-info-services"> Monto primer pago:</b> &nbsp; &nbsp;
                                                <span id="monto_primer_pago" class="content_info_ot" ng-bind="responseServicios.Monto_primerpago"> </span>
                                            </div>
                                            <div class="col-md-6">
                                                <b class="title-info-services"> Medio de acceso:</b> &nbsp; &nbsp;
                                                <span id="medio-accceso-nota" class="content_info_ot" ng-bind="responseServicios.MedioAcceso"> </span>
                                            </div>
                                        </div>
                                        <br />
                                        <div class="row">
                                            <div class="col-8">
                                                <div class="row justify-content-center">
                                                    <div class="col-md-12">
                                                        <h5 style="color:#767676" class="">Servicios a instalar</h5>		
                                                        <div class="parent_table_detalle">
                                                            <table class="detalle_table table table-sm">
                                                                <thead class="thead_table_servicios">
                                                                    <tr>
                                                                        <th scope="col">Nombre del Servicio</th>
                                                                        <th scope="col">Tipo Servicio</th>
                                                                        <th scope="col">Detalle</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr ng-repeat="servicio in responseServicios.Servicios.Servicio">
                                                                        <td ng-bind="servicio.Nombre_servicio"></td>
                                                                        <td ng-bind="servicio.Tipo_servicio"></td>
                                                                        <td>
                                                                            <button ng-if="servicio.Id_dpplan_servicio !== undefined" type="button" ng-click="consultarDetalleServicio(servicio)" class="btn_detalle_servicio btn btn-info btn-rounded btn-sm my-0 waves-effect waves-light">
                                                                            <i class="fa fa-eye"></i></button>
                                                                            <span ng-if="servicio.Id_dpplan_servicio === undefined">Sin detalle</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr ng-if="responseServicios.Servicios.Servicio === undefined">
                                                                        <td class="text-center" colspan="2">No se cuenta con servicios</td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <h5 style="color:#767676" class="">Productos </h5>		
                                                        <div class="parent_table_detalle_productos">
                                                            <table class="table detalle-productos-table table-sm">
                                                                <thead class="thead_table_productos">
                                                                    <tr>
                                                                        <th scope="col">Folio</th>
                                                                        <th scope="col">Nombre del producto</th>
                                                                        <th scope="col">Tipo producto</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr ng-repeat="producto in responseServicios.Productos.Producto">
                                                                        <td ng-bind="producto.FolioProducto"></td>
                                                                        <td ng-bind="producto.Nombre_producto"></td>
                                                                        <td ng-bind="producto.Tipo_producto"></td>
                                                                    </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr ng-if="responseServicios.Productos.Producto === undefined">
                                                                        <td class="text-center" colspan="2">No se cuenta con productos</td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row ">
                                                    <div class="col-md-12">
                                                        <h5 style="color:#767676" class="">Promociones </h5>		
                                                        <div class="parent_table_detalle_promociones">
                                                            <table   class="detalle-promociones-table table table-sm">
                                                                <thead class="thead_table_promociones">
                                                                <tr>
                                                                    <th scope="col">Folio promoci&oacute;n</th>
                                                                    <th scope="col">Nombre de la promoci&oacute;n</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr ng-repeat="promocion in responseServicios.Promociones.Promocion">
                                                                    <td ng-bind="promocion.FolioPromocion"></td>
                                                                    <td ng-bind="promocion.Nombre_promocion"></td>
                                                                </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr ng-if="responseServicios.Promociones.Promocion === undefined">
                                                                        <td class="text-center" colspan="2">No se cuenta con promociones</td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <h5 style="color:#767676" class="text-center">Equipo y Modelos</h5>
                                                <div style="display: none;" class="content_info_detalle">
                                                    <h6 style="color: #797979	" class="text_equipo">PBX AVAYA</h6>
                                                    <ul style="color: #797979	" class="listado_modelos">
                                                    </ul>
                                                </div>
                                                <div ng-if="detalleServicio.Modelos.Modelo === undefined" class="not_info_detalle row h-100 justify-content-center">
                                                    <h6 style="color:#abafae;">Sin seleccion de servicio</h6>
                                                </div>
                                                <div ng-if="detalleServicio.Modelos.Modelo !== undefined" class="content_info_detalle">
                                                    <h6 style="color: #797979" class="text_equipo" ng-bind="detalleServicio.Nombre_equipoodispositivo"></h6>
                                                    <ul style="color: #797979" class="listado_modelos">
                                                        <li ng-repeat="modelo in detalleServicio.Modelos.Modelo" class="li_item_modelo" ng-bind="modelo.Nombre_modelo"></li>
                                                    </ul>
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
			</div>
            <!--div class="modal-footer">
                <button   type="button" class="btn btn-primary">
                    <b>Aceptar</b>
                </button>
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
           </div-->
        </div>
    </div>
</div>