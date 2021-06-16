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
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-imagenes-tab" data-toggle="pill" href="#pills-imagenes" role="tab" ng-click="consultarEvidenciaAlerta()" aria-controls="pills-imagenes" aria-selected="false">Im&aacute;genes</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-historico-tab" data-toggle="pill" href="#pills-historico" role="tab" ng-click="consultarHistoricoAlerta()" aria-controls="pills-historico" aria-selected="false">Hist&oacute;rico</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link options-alertas" id="pills-chat-tab" data-toggle="pill" href="#pills-chat" role="tab" ng-click="consultarChatAlerta()" aria-controls="pills-chat" aria-selected="false">Chat</a>
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
                                <div class="row">
                                    <div ng-repeat="elementHistorico in listaHistoricoAlerta" class="col-6">
                                        <div  class="card-historico card text-center">
                                            <div class="card-body">
                                                <i ng-if="elementHistorico.Id_Estatus==1" class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.Id_Estatus==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.Id_Estatus==3" class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.Id_Estatus==4" class="terminar-historico fas fa-check circle-statushistorico"></i>
                                                <i ng-if="elementHistorico.Id_Estatus==5" class="cancelado-historico fas fa-times circle-statushistorico"></i> 

                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Estado</span>
                                                    <span class="content-titlehistorico-alerta" ng-bind="elementHistorico.EstatusDescripcion"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Motivo</span>
                                                    <span class="content-titlehistorico-alerta" ng-bind="elementHistorico.MotivoDescripcion"></span>
                                                </div>
                                                <div class="container-deschistorico">
                                                    <span class="titlehistorico">Descripci&oacute;n:</span>
                                                    <span class="content-titlehistorico-alerta" ng-bind="elementHistorico.Descripcion"></span>
                                                </div>
                                            </div>
                                            <div class="card-footer text-muted">
                                                <p class="footer-card-historico" ng-bind="elementHistorico.FechaModificacion+' '+elementHistorico.HoraModificacion" ></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>																
								<!--div ng-repeat="historicoInd in listaHistoricoAlerta" class="timeline__group">
									<div class="timeline__box">
										<div style="background-color:white;"  class="timeline__date">
											<span  style="font-size: 15px !important;color:grey;" class="timeline__day">OT</span>
											<span  style="font-size: 12px !important;" class="timeline__month">
												<i ng-if="historicoInd.Id_Estatus === '1'" style="width:25px;height:25px;font-size: 2em; " alt="PENDIENTE" class="fa fa-pause-circle pend"></i>
												<i ng-if="historicoInd.Id_Estatus === '2'" style="width:25px;height:25px;font-size: 2em;" alt="PENDIENTE" class="fa fa-arrow-circle-right asig"></i>
												<i ng-if="historicoInd.Id_Estatus === '3'" style="width:25px;height:25px;font-size: 2em; " alt="PENDIENTE" class="'fa fa-hand-paper-o deten"></i>
												<i ng-if="historicoInd.Id_Estatus === '4'" style="width:25px;height:25px;font-size: 2em; " alt="PENDIENTE" class="fa fa-check-circle term"></i>
												<i ng-if="historicoInd.Id_Estatus === '5'" style="width:25px;height:25px;font-size: 2em; " alt="PENDIENTE" class="fa fa-times-circle cancel"></i>
											</span>
										</div>
										<div class="timeline__post">
											<div class="timeline__content">
											<div class="row">
												<div class="col-md-12">
													<div class="row">
														<div class="col-md-6">
															<div class="col-md-12">
																<b  class="title_span"> OT:</b>
																<span id="ot_detalle" class="content_text">{{historicoInd.OT}}</span>
															</div>
															<div class="col-md-12">
																<b class="title_span"> Estado:</b>
																<span id="ot_detalle" class="content_text">{{historicoInd.EstadoDescripcion}}</span>
															</div>
															<div class="col-md-12">
																<b class="title_span"> Descripci&oacute;n:</b>
																<span id="ot_detalle" class="content_text">{{historicoInd.Descripcion}}</span>
															</div>
														</div>
														<div class="col-md-6">
															<div class="col-md-12">
																<b class="title_span"> Motivo:</b>
																<span id="ot_detalle" class="content_text">{{historicoInd.MotivoDescripcion}}</span>
															</div>
															<div class="col-md-12">
																<b class="title_span"> Fecha:</b>
																<span id="ot_detalle" class="content_text">{{historicoInd.FechaModificacion}}</span>
															</div>
															<div class="col-md-12">
																<b class="title_span"> Hora:</b>
																<span id="ot_detalle" class="content_text">{{historicoInd.HoraModificacion}}</span>
															</div>
														</div>
													</div>
												</div> 
											</div>					     
											</div>
										</div>
									</div>
								</div-->										
							</div>
                        </div>
                        <div class="tab-pane fade" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">

                            <div class="container-mensajes-parent">
                                <div class="chat-content-area">
                                    <div class="chat-header">
                                         

                                    </div>
                                    <div class="chat-area">
                                        <div class="chats" ng-repeat="comentario in listaComentariosAlerta">
                                            <div class="chat" ng-if="comentario.Origen == 'FFM APP'">
                                                <div class="chat-avatar">
                                                    <a class="avatar"><i class="img-comentarios-chat android-mensaje fab fa-android"></i></a>
                                                </div>
                                                <div class="chat-body">
                                                    <div class="chat-text">
                                                        <p ng-bind="comentario.Comentario"></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="chat chat-right" ng-if="comentario.Origen !== 'FFM APP'">
                                                <div class="chat-body">
                                                    <div class="chat-text">
                                                        <p ng-bind="comentario.Comentario"></p>
                                                    </div>
                                                </div>
                                                <div class="chat-avatar">
                                                    <a class="avatar">
                                                        <i class="img-comentarios-chat web-mensaje fas fa-desktop"></i>
                                                    </a>
                                                  </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat-fotter">
                                        <input placeholder="Escribe el mensaje aqu&iacute; ..." type="text" class="input-mensaje-chat form-control form-control-sm">
                                        <button class="btn btn-sm btn-primary" ng-click="agregarComentario()">Enviar</button>
                                    </div>
                                </div>
                            </div>
                            <!--div class="row justify-content-center">
                                <div ng-repeat="comentario in listaComentariosAlerta" class="col-12">	
                                    <div ng-if="comentario.Origen =='FFM APP'"  class="row">
                                        <div class="col-7 offset-md-4 comentario_movil">
                                            <b class="autor_comentario" style="margin-top: 0.4em"> {{comentario.Origen}}  -  {{comentario.NombreCompleto}} </b>
                                            <span > {{comentario.FechaComentario}}</span>
                                            <hr style="margin-top: 0em; border-top: 1px solid #cdcdd6 !important" /> {{comentario.Comentario}} 
                                        </div>
                                        <div class="col-1">
                                            <img class="imagen_chat" alt="web" src="${pageContext.request.contextPath}/resources/img/generic/android.png" style="width: 40px; height: 40px;">
                                        </div>
                                    </div>

                                    <div ng-if="comentario.Origen !== 'FFM APP'" class="row">
                                        <div class="col-1 icono_chat">
                                            <img class="imagen_chat" alt="web" src="${pageContext.request.contextPath}/resources/img/generic/web.png" style="width: 40px; height: 40px;">
                                        </div>
                                        <div class="col-7 comentario_web">
                                            <b  class="autor_comentario" style="margin-top: 0.4em"> {{comentario.Origen}}  - {{comentario.NombreCompleto}} </b>
                                            <span>{{comentario.FechaComentario}}</span>
                                            <hr style="margin-top: 0em; border-top: 1px solid #cdcdd6 !important" />  {{comentario.Comentario}} 
                                        </div>
                                        <div class="col-2 text-left"></div>
                                    </div>								
                                    <div class="col-12"><br></div>
                                </div>
                            </div-->

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
                            <button type="button" class="btn btn-outline- btn-opciones-alerta" style="color: {{opcion.Color}}; border-color: {{opcion.Color}};" ng-click="mostrarAccionAlerta(opcion)" ng-bind="opcion.Descripcion"></button>
                        </div>
                 
                    </div>

                    <div class="row" ng-show="showAaccion">
                        <div class="col-12">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
</div>