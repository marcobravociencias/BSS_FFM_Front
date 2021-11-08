<div class="container-fluid content-alertas" ng-show="!vistaDespacho">
    <div class="row">
        <div class="col-12 header-alertas">
            <i class="fa fa-times icon-exit-header-alertas" ng-click="cerrarAlertas()"></i>
        </div>
    </div>
    <div class="row">
        <div class="col-3">
            <div class="card cards-alertas">
                <div class="card-header card-header-alerta-principal">
                    <span class="titulo-alerta-modal">OTS</span>
                </div>
                <div class="card-body card-body-alerta-principal">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group">
                                <input type="text" class="form-control buscadorOT" placeholder="OT/OS">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary btnBuscadorOTAlerta" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
					<div class="scrollTablaAlertasPI">
						<table id="table-alertas-pi">
	                        <thead>
	                            <tr><td></td><td></td><td></td></tr>
	                        </thead>
	                        <tbody>
	                        </tbody>
	                    </table>
					</div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card cards-alertas">
                <div class="card-header card-header-principal card-header-alerta-principal">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas active" id="pills-mapa-tab" data-toggle="pill" href="#pills-mapa" role="tab" aria-controls="pills-mapa" aria-selected="true">Mapa</a>
                        </li>
                        <!--li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-imagenes-tab" data-toggle="pill" href="#pills-imagenes" role="tab" ng-click="consultarEvidenciaAlerta()" aria-controls="pills-imagenes" aria-selected="false">Im&aacute;genes</a>
                        </li-->
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-historico-tab" data-toggle="pill" href="#pills-historico" role="tab" ng-click="consultarHistoricoAlerta()" aria-controls="pills-historico" aria-selected="false">Hist&oacute;rico</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-chat-tab" data-toggle="pill" href="#pills-chat" role="tab" ng-click="consultarChatAlerta()" aria-controls="pills-chat" aria-selected="false">Comentarios</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-chat-tab" data-toggle="pill" href="#pills-detalle" role="tab" ng-click="abirDetalle()" aria-controls="pills-detalle" aria-selected="false">Detalle</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body card-body-alerta-principal">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-mapa" role="tabpanel" aria-labelledby="pills-mapa-tab">
                           <div id="mapAlerta" class="contenido-card" style="width:100%;height:100%; border-radius: 10px;"></div>
                        </div>

                        <div class="tab-pane fade" id="pills-imagenes" role="tabpanel" aria-labelledby="pills-imagenes-tab">
                            <div id="categorias_div" class="container row justify-content-center  text-center " style="margin-top: 1em;">
                                <div class="content_category">
                                  <b class="badge accent-3" id="alerta-p-i">3</b>
                                  <button type="button" class="btn btn-sm  btn-blue-grey waves-effect waves-light"  >
                                    <i class="fa fa-truck"></i>
                                  </button>
                                </div>
                                
                                <div class="content_category">
                                  <b class="badge accent-3" id="alerta-p-i">3</b>
                                    <button type="button" class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light"  >
                                    <i class="fa fa-truck"></i>
                                  </button>
                                </div>
                              
                                <div class="content_category">
                                  <button type="button" class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light"  >
                                    <i class="fa fa-truck"></i>
                                  </button>
                                </div>
                              
                                <div class="content_category">
                                  <b class="badge accent-3" id="alerta-p-i">23</b>
                                  <button type="button" class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light"  >
                                    <i class="fa fa-truck"></i>
                                  </button>
                                </div>
                              
                                <div class="content_category">
                                  <button type="button" class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light"  >
                                    <i class="fa fa-truck"></i>
                                  </button>
                                </div>
                              
                                <div class="content_category">
                                  <b class="badge accent-3" id="alerta-p-i">13</b>
                                  <button type="button" class="btn btn-sm  btn-outline-blue-grey waves-effect waves-light"  >
                                    <i class="fa fa-truck"></i>
                                  </button>
                                </div>
                            </div>
                            <br/>
                            <div class="col-12 magnific-all">
                                <div id="not_info_evidencia" class="row h-100 justify-content-center align-items-center " style="height: 200px !important;">
                                    <h5 id="text_sin_imagenes" style="color:#abafae; padding-top: 9em; ">No se encontr&oacute; evidencia</h5>
                                </div>
	                            <div style="margin-bottom: 1em;" id="contenido_imagenes" class="row justify-content-center ">
	                            </div>                              
                            </div>
                        </div>

                        <div class="tab-pane fade" id="pills-historico" role="tabpanel" aria-labelledby="pills-historico-tab">
                            <div class="container">
                                <div ng-if="!listaHistoricoAlerta.length" style="text-align: center; margin-top: 2em;">
                                    <span style="font-size: 12px !important;color:grey; font-weight: lighter;" class="timeline__day">
                                        <span class="timeline__month">
                                            <i class="fa fa-exclamation-circle warning-nodata"></i>
                                        </span>
                                        NO SE ENCONTRARON DATOS
                                    </span>
                                </div>
                                <div class="row" ng-repeat="elementHistorico in listaHistoricoAlerta">
                                    <div class="col-2 line-time-new">
                                        <div style="background-color:white;" class="timeline__date">
                                            <span style="font-size: 15px !important;color:grey;" class="timeline__day">OT</span>
                                            <span style="font-size: 12px !important;" class="timeline__month">
                                                <i ng-if="elementHistorico.idEstatusOrden==1" class="pendiente-historico  fas fa-pause circle-statushistorico-histo"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico-histo"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==3" class="detencion-historico far fa-hand-paper circle-statushistorico-histo"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==4" class="terminar-historico fas fa-check circle-statushistorico-histo"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==5" class="cancelado-historico fas fa-times circle-statushistorico-histo"></i> 
                                            </span>
                                        </div>
                                    </div>

                                    <div id="content-historial-{{$index}}"  class="col-10" style="display: grid;">
                                        <div  class="card-historico card text-center historico-alertas-div">
                                            <div class="card-body">
                                                <i ng-if="elementHistorico.idEstatusOrden==1" class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==3" class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==4" class="terminar-historico fas fa-check circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==5" class="cancelado-historico fas fa-times circle-statushistorico"></i> 
                                               
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Estatus:</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstatusOrden || 'SIN DATO'"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Estado:</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstadoOrden || 'SIN DATO'"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Motivo:</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.descripcionMotivoOrden  || 'SIN DATO'"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Despacho:</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.nombreUsuarioDespacho || 'SIN DATO'"></span>
                                                    <p class="footer-card-historico-alerta" ng-bind="elementHistorico.fecha+' '+elementHistorico.hora" ></p>
                                                </div>
                                            </div>
                                            <div class="card-footer text-muted">
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Usuario:</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.nombreUsuario  || 'SIN DATO'"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>																								
							</div>
                        </div>

                        <div class="tab-pane fade" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab" style="overflow-y: hidden;">
                            <div class="col-12">
                                <div class="container-mensajes-parent">
                                    <div class="chat-content-area">
                                        <div class="chat-header">
                                        </div>
                                        <div class="chat-area" style="overflow-y: scroll; height: 50vh;">
                                            <div ng-if="!listaComentariosAlerta.length" style="text-align: center; margin-top: 2em;">
                                                <span style="font-size: 12px !important;color:grey; font-weight: lighter;" class="timeline__day">
                                                    <span class="timeline__month">
                                                        <i class="fa fa-exclamation-circle warning-nodata"></i>
                                                    </span>
                                                    NO SE ENCONTRARON COMENTARIOS
                                                </span>
                                            </div>
    
                                            <div class="chats" ng-repeat="comentario in listaComentariosAlerta">
                                                <div class="chat" ng-if="comentario.origenSistema === 2"><!-- APP-->
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
                                                <div class="chat chat-right" ng-if="comentario.origenSistema !== 2">
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
                                        <div class="row col-chat-fotter">
                                            
                                            <!--div class="col-6">
                                                <input id="comentarioOt" placeholder="Escribe el mensaje aqu&iacute; ..." type="text" class="input-mensaje-chat form-control form-control-sm input-comentario-ot" ng-model="comentarioAlerta">
                                            </div>
                                            <div class="col-3" style="left: 200px;height: 50px;">
                                                <button class="btn btn-primary btn-enviar-comentario-ot" ng-click="agregarComentario()">Enviar</button>
                                            </div-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-12" style="margin-top: .5em;">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Escribe el mensaje aqu&iacute; ..." ng-model="comentarioAlerta" style="height: 41px;">
                                    <div class="input-group-append">
                                      <button class="btn btn-primary btn-enviar-comentario-ot" ng-click="agregarComentario()" type="button" id="button-addon2" style="color: white!important;">Enviar</button>
                                    </div>
                                  </div>
                            </div>                          
                        </div>

                        <div class="tab-pane fade" id="pills-detalle" role="tabpanel" aria-labelledby="pills-detalle">
                           <div class="row">
                            <div class="card-header card-header-principal">
                                <ul class="nav nav-pills" id="pills-tab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link options-alertas active" id="pills-detalle-alerta-tab" data-toggle="pill" href="#pills-detalle-alerta" role="tab" aria-controls="pills-detalle-alerta" aria-selected="true">Alerta</a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link options-alertas" style="width: 155px;" id="pills-ot-tab" data-toggle="pill" href="#pills-OT" role="tab" aria-controls="pills-OT" aria-selected="false">Orden de Trabajo</a>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link options-alertas" id="pills-tecnico-tab" data-toggle="pill" href="#pills-tecnico" role="tab" aria-controls="pills-tecnico" aria-selected="false">T&eacute;cnico</a>
                                    </li>
                                </ul>
                            </div>
                           </div>
                           <div class="row">
                               <div class="tab-content" id="pills-detalle-tabContent">

                                <div class="tab-pane fade show active" id="pills-detalle-alerta" role="tabpanel" aria-labelledby="pills-detalle-alerta-tab">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Alerta</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.alerta.descripcionAlerta || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo Alerta</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.alerta.descripcionSubtipoAlerta || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Fecha</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.alerta.fechaRegistro || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Hora</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.alerta.horaRegistro || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tiempo trascurrido</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.alerta.tiempoTranscurrido || 'Sin dato'"></span> </div>
                                            </div>
                                        </div>
                                        <div class="col-6 col-map-datlle">
                                            <div id="mapDetalleAlerta" class="contenido-card" style="width:100%;height:100%; border-radius: 10px;"></div>
                                        </div>
                                    </div>                                  
                                </div>

                                <div class="tab-pane fade" id="pills-OT" role="tabpanel" aria-labelledby="pills-ot-tab">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OT</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.orden.id || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OS</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.orden.folioSistema || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cliente</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.orden.nombreCliente || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cuenta</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.orden.claveCliente || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo orden</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.orden.tipoOrden || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Intervenci&oacute;n</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.orden.descIntervencion || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Subintervenci&oacute;n</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.orden.descSubIntervencion || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Direcci&oacute;n</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.orden.direccion || 'Sin dato'"></span> </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>

                                <div class="tab-pane fade" id="pills-tecnico" role="tabpanel" aria-labelledby="pills-tecnico-tab">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="container-img-tecnico-detalle-alerta">
                                                <img class="efecto imagen_tecnico_detalle_alerta"  ng-src="{{objectDetalleAlerta.tecnico.urlFotoPerfil}}"/>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">T&eacute;cnico</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.tecnico.nombre || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">N&uacute;mero empleado</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.tecnico.numEmpleado || 'Sin dato'"></span> </div>
                                            </div>
                                            <div class="container-fluid vehiculo-content">
                                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tel&eacute;fono</span></div>
                                                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{infoOtDetalle.Id_ot}}" ng-bind="objectDetalleAlerta.tecnico.telefonoContacto || 'Sin dato'"></span> </div>
                                            </div>
                                        </div>
                                        <div class="col-6 col-map-datlle">
                                            <div id="mapDetalleTecnico" class="contenido-card" style="width:100%;height:100%; border-radius: 10px;"></div>
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
        <div class="col-3">
            <div class="card cards-alertas">
                <div class="card-header card-header-alerta-principal">
                    <div class="row">
                        <div class="col-6">
                            <span class="titulo-alerta-modal">Opciones</span>
                        </div>
                        <div class="col-6 text-right">
                            <i class="fa fa-times icon-cancelar-opcion" ng-click="cerrarCamposAccionAlerta()" ng-show="!alertaSeleccionada"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body card-body-alerta-principal">
                    <div class="row" ng-show="alertaSeleccionadaPENDIENTE">
                        <div class="col-12">
                            <div class="card card-alertas-seleccion">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 text-center">
                                            <h4>Selecciona una OT</h4>
                                            <span><i class="fa fa-quote-left"></i> Para poder visualizar las opciones que tiene cada una de ellas.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" ng-show="alertaSeleccionada">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6 text-center">
                                    <span class="text-primary-alerta">OT: </span><span class="text-secundary-alerta" ng-bind="alertaSeleccionadaObject.IdOT"></span>
                                </div>
                                <div class="col-6 text-center">
                                    <span class="text-primary-alerta">OS: </span><span class="text-secundary-alerta" ng-bind="alertaSeleccionadaObject.os"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" style="margin-top: 1em;" ng-repeat="opcion in listaOpcionesAlerta">
                            <button type="button" class="btn btn-outline- btn-opciones-alerta" style="color: {{opcion.hexaColor}}; border: 3px solid {{opcion.hexaColor}};" ng-click="mostrarAccionAlerta(opcion)" ng-bind="opcion.descripcion"></button>
                        </div>
                 
                    </div>

                    <div class="row" ng-repeat="opcion in listaOpcionesAlerta" ng-show="opcion.checkedOpcion">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12" ng-repeat="campo in opcion.campos" ng-switch on="campo.tipoCampo">
                                    
                                    <div class="form-group contenedorCamposOpcion" ng-switch-when="select">
										<!-- <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o"></i> -->
                                        <label class="etiquetaFormOpcion" for="fecha-reagendamiento-alerta" ng-if="campo.esVisible == '1'">{{campo.nombreEtiqueta}}</label>
                                        <select id="{{campo.nombreParamentro}}" class="form-control form-control-sm txtFormOpcion {{campo.esVisible == '0' ? 'desabilitarCampoOpcionAlerta' : ''}} {{campo.nombreParamentro}}" ng-switch on="campo.nombreParamentro" ng-click="cambioOpcionSelectAccionAlerta(campo)">
                                        	<option ng-if="campo.valorDefecto == 'NA'" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                        	<option ng-switch-when="idTurno" ng-repeat="turno in filtrosGeneral.turnosdisponibles" value="{{turno.id}}">{{turno.nombre}}</option>
                                        	<option ng-switch-when="idEstatus" ng-repeat="status in listaStatusAlertaAccion" value="{{status.id}}">{{status.nombre}}</option>
                                        	<option ng-switch-when="idEstado" ng-repeat="estado in listaEstadosAlertaAccion" value="{{estado.id}}">{{estado.nombre}}</option>
                                        	<option ng-switch-when="idMotivo" ng-repeat="motivo in listaMotivosAlertaAccion" value="{{motivo.id}}">{{motivo.nombre}}</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group contenedorCamposOpcion" ng-switch-when="selectpicker">
										<!-- <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o"></i> -->
                                        <label class="etiquetaFormOpcion" for="fecha-reagendamiento-alerta">{{campo.nombreEtiqueta}}</label>
                                       	<input id="{{campo.nombreParamentro}}" type="text" readonly placeholder="Selecciona fecha" class="datepicker campoFecha form-control form-control-sm {{campo.nombreParamentro}}" ng-model="terminarAlerta.fecha" />                               
                                    </div>
                                    <div class="form-group contenedorCamposOpcion" ng-switch-when="textarea">
										<!-- <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o"></i> -->
                                        <label class="etiquetaFormOpcion" for="fecha-reagendamiento-alerta">{{campo.nombreEtiqueta}}</label>
                                        <textarea class="form-control form-control-sm txtFormOpcion {{campo.nombreParamentro}}" style=" resize: none" ng-model="terminarAlerta.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="{{campo.nombreParamentro}}" rows="3" ng-keyup="contadorTextArea(campo.nombreParamentro)"></textarea>                             
                                    	<label style="float: right;" class="etiquetaFormOpcion etiquetaContador">{{contadorCaracteresTextArea}} - 50</label>
                                    </div>
                                    
                                </div>
                                
                                <div class="col-12">
                                    <button class="btn btn-primary btnAccionCamposOpcion" style="width: 100%" ng-click="guardarAccionAlerta(opcion)">{{opcion.descripcion}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
</div>