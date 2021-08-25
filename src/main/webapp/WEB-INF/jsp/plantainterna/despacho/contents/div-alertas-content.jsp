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
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group">
                                <input type="text" class="form-control input-search-despacho" placeholder="OT/OS"
                                    aria-describedby="button-addon2">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                        <div  class="card-historico card text-center">
                                            <div class="card-body">
                                                <i ng-if="elementHistorico.idEstatusOrden==1" class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==3" class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==4" class="terminar-historico fas fa-check circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.idEstatusOrden==5" class="cancelado-historico fas fa-times circle-statushistorico"></i> 

                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Estado:</span>
                                                    <span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstatusOrden"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Motivo:</span>
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
                        </div>
                        <div class="tab-pane fade" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab" style="overflow-y: hidden;">
                            <div class="col-12">
                                <div class="container-mensajes-parent">
                                    <div class="chat-content-area">
                                        <div class="chat-header">
                                             
    
                                        </div>
                                        <div class="chat-area" style="overflow-y: scroll; height: 50vh;">
                                            
    
                                            <div class="chats" ng-repeat="comentario in listaComentariosAlerta">
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
                            <i class="fa fa-times icon-cancelar-opcion" ng-click="ocultarAccionAlerta()" ng-show="showAaccion"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body card-body-alerta-principal">
                    <div class="row" ng-show="!alertaSeleccionada">
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
                    <div class="row" ng-show="alertaSeleccionada && !showAaccion">
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
                            <button type="button" class="btn btn-outline- btn-opciones-alerta" style="color: {{opcion.hexaColor}}; border-color: {{opcion.hexaColor}};" ng-click="mostrarAccionAlerta(opcion)" ng-bind="opcion.descripcion"></button>
                        </div>
                 
                    </div>

                    <div class="row" ng-show="showAaccion">
                        <!--div class="col-12" ng-repeat="campo in listaCampos | orderBy:'ID_Campo'">
							<div class="form-group" ng-if="campo.Descripcion === 'ESTADO'">
								<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
								<label class="span-opciones-status-alerta">Estado:</label>
								<select class="form-control" id="id-status-tecnico" ng-model="estatusAlerta.estado" ng-options="estatus.Descripcion for estatus in listaEstadoAlerta" ng-change="consultarMotivoAlerta(estatusAlerta.estado)">
                                    <option value="">Seleccione ...</option>
							    </select>                                               
						  	</div>
                            <div class="form-group" ng-if="campo.Descripcion === 'MOTIVO'">
								<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
								<label class="span-opciones-status-alerta">Motivo:</label>
								<select class="form-control" id="id-status-tecnico" ng-model="estatusAlerta.motivo" ng-options="estatus.Descripcion for estatus in listaMotivoEstatus">
                                    <option value="">Seleccione ...</option>
							    </select>                                               
						  	</div>
                            <div class="form-group" ng-if="campo.Descripcion === 'COMENTARIOS'">
                                <label class="span-opciones-status-alerta">Comentario:</label>
                                <textarea class="form-control" style=" resize: none" ng-model="estatusAlerta.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
                            </div>
						</div-->
                        <!--div class="col-12">
							<div class="form-group">
								<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
								<label class="span-opciones-status-alerta">Estado:</label>
								<select class="form-control" id="id-status-tecnico" ng-model="estatusAlerta.estado" ng-options="estatus.Descripcion for estatus in listaEstadoAlerta" ng-change="consultarMotivoAlerta(estatusAlerta.estado)">
                                    <option value="">Seleccione ...</option>
							    </select>                                               
						  	</div>
						</div>
                        <div class="col-12">
							<div class="form-group">
								<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
								<label class="span-opciones-status-alerta">Motivo:</label>
								<select class="form-control" id="id-status-tecnico" ng-model="estatusAlerta.motivo" ng-options="estatus.Descripcion for estatus in listaMotivoEstatus">
                                    <option value="">Seleccione ...</option>
							    </select>                                               
						  	</div>
						</div>
                        <div class="col-12">
							<div class="form-group">
						   		<label class="span-opciones-status-alerta">Comentario:</label>
						   		<textarea class="form-control" style=" resize: none" ng-model="estatusAlerta.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
							</div>
						</div>
                        <div class="col-12">
                            <button type="button" class="btn btn-primary btn-lg btn-block" ng-click="cambiarEstatusIntegrador()">ACEPTAR</button>
                        </div-->
                        <div class="col-12" ng-show="showOpcion === 2">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
                                        <label class="span-opciones-status-alerta">Motivo:</label>
                                        <select class="form-control" id="id-status-tecnico" ng-model="rescateAlerta.motivo" ng-options="motivo.nombre for motivo in listaMotivosAlerta">
                                            <option value="">Seleccione ...</option>
                                        </select>                                               
                                      </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                           <label class="span-opciones-status-alerta">Comentario:</label>
                                           <textarea class="form-control" style=" resize: none" ng-model="rescateAlerta.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn  btn-primary" ng-click="cambiarEstatusAlertaValidacion()">Rescate</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" ng-show="showOpcion === 1">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group" style="margin-bottom: .5rem;">
                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                        <label for="fecha-reagendamiento-alerta">Fecha reagendamiento:</label>
                                        <input type="text" ng-model="reagendaAlerta.fechaReagendamiento" id="fecha-reagendamiento-alerta" class="form-control ">                                 
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group" style="margin-bottom: .5rem;">
                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
                                        <label class="span-opciones-status-alerta">Turno:</label>
                                        <select class="form-control" id="id-status-tecnico" ng-model="reagendaAlerta.turno" ng-options="turno.nombre for turno in filtrosAlertas.turnos">
                                            <option value="">Seleccione ...</option>
                                        </select>                                               
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group" style="margin-bottom: .5rem;">
                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
                                        <label class="span-opciones-status-alerta">Motivo:</label>
                                        <select class="form-control" id="id-status-tecnico" ng-model="reagendaAlerta.motivo" ng-options="motivo.nombre for motivo in listaMotivosAlerta">
                                            <option value="">Seleccione ...</option>
                                        </select>                                               
                                      </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group" style="margin-bottom: 1rem;">
                                        <label class="span-opciones-status-alerta">Comentario:</label>
                                        <textarea class="form-control" style=" resize: none" ng-model="reagendaAlerta.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn  btn-primary" ng-click="cambiarEstatusAlertaValidacion()">Reagendar</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" ng-show="showOpcion === 3">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" class="fa fa-user-circle-o fa-2x"></i>
                                        <label for="fecha-reagendamiento">Fecha calendarizado:</label>
                                        <input type="text" ng-model="calendarizarAlerta.fechaReagendamiento" id="fecha-reagendamiento" class="form-control ">                                 
                                      </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
                                        <label class="span-opciones-status-alerta">Turno:</label>
                                        <select class="form-control" id="id-status-tecnico" ng-model="calendarizarAlerta.motivo" ng-options="turno.nombre for turno in filtrosAlertas.turnos">
                                            <option value="">Seleccione ...</option>
                                        </select>                                               
                                      </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
                                        <label class="span-opciones-status-alerta">Motivo:</label>
                                        <select class="form-control" id="id-status-tecnico" ng-model="calendarizarAlerta.motivo" ng-options="estatus.Descripcion for estatus in listaMotivoEstatus">
                                            <option value="">Seleccione ...</option>
                                        </select>                                               
                                      </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label class="span-opciones-status-alerta">Comentario:</label>
                                        <textarea class="form-control" style=" resize: none" ng-model="calendarizarAlerta.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12" ng-show="showOpcion === 4">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
                                        <label class="span-opciones-status-alerta">Estado:</label>
                                        <select class="form-control" id="id-status-tecnico" ng-model="terminarAlerta.motivo" ng-options="estatus.Descripcion for estatus in listaMotivoEstatus">
                                            <option value="">Seleccione ...</option>
                                        </select>                                               
                                      </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                           <label class="span-opciones-status-alerta">Comentario:</label>
                                           <textarea class="form-control" style=" resize: none" ng-model="terminarAlerta.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
                                    </div>
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