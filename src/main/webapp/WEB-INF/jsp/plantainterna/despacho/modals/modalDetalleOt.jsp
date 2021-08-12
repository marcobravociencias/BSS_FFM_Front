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
                                        <div class="chat-area">
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
                                        <div class="row float-right col-chat-fotter">
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
                            <div ng-show="permisosModal.indexOf('tabPedidoDespacho') !== -1"  class="tab-pane fade" id="v-tabs-consulta-acciones" role="tabpanel" aria-labelledby="v-tabs-consulta-acciones-tab">
                                <ul class="nav nav-tabs mb-3 nav-fill " id="ex1" role="tablist">
                                    <li ng-show="permisosModal.indexOf('tabCambioEstatusRescateModal') !== -1" class="nav-item" role="presentation">
                                        <a class="nav-link active" data-mdb-toggle="tab"  href="#accion-rescate-ot" >Rescate</a>
                                    </li>
                                    <li ng-show="permisosModal.indexOf('tabCambioEstatusReagendaModal') !== -1" class="nav-item" role="presentation">
                                        <a class="nav-link" data-mdb-toggle="tab" href="#accion-reagendar-ot" >Reagendar</a>
                                    </li>
                                    <li ng-show="permisosModal.indexOf('tabCambioEstatusCalendarizarModal') !== -1"  class="nav-item" role="presentation">
                                        <a class="nav-link" data-mdb-toggle="tab" href="#accion-calendarizar-ot" >Calendarizar</a>
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
                                                        <select class="form-control" ng-model="elementoRescate.motivo" ng-options="motivo.Descripcion for motivo in listadoMotivosRescate">
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
                                                    <button ng-click="enviarRescateOt()" class="btn  btn-primary">Recate</button>
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
                                                        <input type="text" ng-model="elementReagendaOT.fechaReagendamiento" id="fecha-reagendamiento" class="form-control ">                                 
                                                      </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-turno-reagenda">Turno:</label>
                                                        <select class="form-control" id="id-turno-reagenda" ng-model="elementReagendaOT.turno" ng-options="turno.descripcion for turno in listadoTurnosAcciones">
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
                                                        <select class="form-control" id="id-motivo-reagenda" ng-model="elementReagendaOT.motivo" ng-options="motivo.Descripcion for motivo in listadoMotivosReagenda">
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
                                                    <button ng-click="enviarReagendamiento()"  class="btn  btn-primary">Reagendar</button>
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
                                                        <input type="text" id="fecha-calendarizado" ng-model="elementCalendarizado.fechaCalendarizado" class="form-control ">                                 
                                                      </div>
                                                </div>
                                            </div>
                                            <div class="row align-items-center">
                                                <div class="col-12">
                                                    <div class="form-group">
                                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                                        <label for="id-turno-calendarizado">Turno:</label>
                                                        <select class="form-control" id="id-turno-calendarizado" ng-model="elementCalendarizado.turno" ng-options="turno.descripcion for turno in listadoTurnosAcciones">
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
                                                        <select class="form-control" id="id-motivo-calendarizado" ng-model="elementCalendarizado.motivo" ng-options="motivo.Descripcion for motivo in listadoMotivosCalendarizado">
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
                                                    <button ng-click="enviarCalendarizado()"  class="btn  btn-primary">Reagendar</button>
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
                                                        <select class="form-control" id="id-estado-terminar" ng-model="elementTerminar.estado" ng-options="estado.Descripcion for estado in listadoEstadosTerminado">
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
                                                    <button ng-click="enviarTerminadoOT()"  class="btn  btn-primary">Terminar</button>
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
                                                    <button ng-click="enviarDesasignacion()"  class="btn  btn-primary">Desasigna</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div ng-show="permisosModal.indexOf('tabAccionesOrdenDespacho') !== -1"  class="tab-pane fade" id="v-tabs-consulta-pedido" role="tabpanel" aria-labelledby="v-tabs-consulta-acciones-tab">
                                <div class="row parent-detallecotizacion">                        
                                    <div class="col-4">
                                        <b class="text-repartidor-noencontrado" ng-if="detalleTecnicoOt.latitud == undefined || detalleTecnicoOt.latitud == null">No se encontr&oacute; ubicaci&oacute;n del repartidor</b>

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
                                        <div class="divide-cotizacion">
                
                                        </div>
                                        <h5 class="header-title-cotiz">
                                            Costos
                                        </h5>
                                     
                                        <div class="detalle-cot-basico">
                                            <div class="container-title-detallecot">
                                                <b class="titulodetallecotbasico">Subtotal</b>
                                            </div>
                                            <div class="container-text-detallecot"> 
                                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.subTotal | currency:MX$:2" ></h5>
                                            </div>
                                        </div>
                                        <div class="detalle-cot-basico">
                                            <div class="container-title-detallecot">
                                                <b class="titulodetallecotbasico">IVA</b>
                                            </div>
                                            <div class="container-text-detallecot"> 
                                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.iva | currency:MX$:2" ></h5>
                                            </div>
                                        </div>
                                        <div class="detalle-cot-basico">
                                            <div class="container-title-detallecot">
                                                <b class="titulodetallecotbasico">Descuento</b>
                                            </div>
                                            <div class="container-text-detallecot"> 
                                                <h5 class="contentdetallecotbasico" ng-bind="detalleCotizacion.costos.descuento | currency:MX$:2" ></h5>
                                            </div>
                                        </div>
                                        <div class="detalle-cot-basico">
                                            <div class="container-title-detallecot">
                                                <b class="titulodetallecotbasico total-title-prod">Total</b>
                                            </div>
                                            <div class="container-text-detallecot"> 
                                                <h5 class="contentdetallecotbasico total-content-prod" ng-bind="detalleCotizacion.costos.total | currency:MX$:2" ></h5>
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
                                                    <div class="divide-cotizacion">
                
                                                    </div>
                                                    <div class="detalle-text-parent-basico">
                                                        <div class="container-title-generalcot">
                                                            <b class="titulogeneralcotbasico">Subtotal</b>
                                                        </div>
                                                        <div class="container-text-generalcot"> 
                                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.subTotal | currency:MX$:2" ></h5>
                                                        </div>
                                                    </div>
                                                    <div class="detalle-text-parent-basico">
                                                        <div class="container-title-generalcot">
                                                            <b class="titulogeneralcotbasico">Descuento</b>
                                                        </div>
                                                        <div class="container-text-generalcot"> 
                                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.descuento | currency:MX$:2" ></h5>
                                                        </div>
                                                    </div>
                                                    <div class="detalle-text-parent-basico">
                                                        <div class="container-title-generalcot">
                                                            <b class="titulogeneralcotbasico">IVA</b>
                                                        </div>
                                                        <div class="container-text-generalcot"> 
                                                            <h5 class="contentgeneralcotbasico" ng-bind="elementoDireccion.iva | currency:MX$:2" ></h5>
                                                        </div>
                                                    </div>
                                                    <div class="detalle-text-parent-basico">
                                                        <div class="container-title-generalcot">
                                                            <b class="titulogeneralcotbasico  total-title-prod">Total</b>
                                                        </div>
                                                        <div class="container-text-generalcot"> 
                                                            <h5 class="contentgeneralcotbasico  total-content-prod" ng-bind="elementoDireccion.total | currency:MX$:2" ></h5>
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