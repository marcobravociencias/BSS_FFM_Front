<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-comentarios-justificacion" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Comentarios Justificaci&oacute;n <span id="ot-asignada"></span></h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="container-mensajes-parent">
                        <div class="chat-content-area">
                            <div class="chat-header">
                            </div>
                            <div class="chat-area" style="height: 20em; overflow-y: auto;">
                                <div class="chats" ng-repeat="comentario in comentariosJustificacion | orderBy:'id' track by $index"">
                                    <div class="chat" ng-if="comentario.idOrigen == 2"><!-- APP-->
                                        <div class="chat-avatar">
                                            <a class="avatar"><i class="img-comentarios-chat android-mensaje fab fa-android" style="margin-top: 1em;"></i></a>
                                        </div>
                                        <div class="chat-body">
                                            <span class="text-fecha-comentario" ng-bind="comentario.fecha"></span>
                                            <div class="chat-text">
                                                <span ng-bind="comentario.comentario"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat chat-right" ng-if="comentario.idOrigen == 1">
                                        <div class="chat-body">
                                            <span class="text-fecha-comentario" ng-bind="comentario.fecha"></span>
                                            <div class="chat-text">
                                                <span ng-bind="comentario.comentario"></span>
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
                            <div class="row float-right col-chat-fotter" style="margin-top: 2em; margin-right: 2em;" ng-if="configPermisoAccionCreaComentarioJustificacion">
                                <div class="col-6">
                                    <input id="comentarioNuevoJustificacion" placeholder="Escribe el comentario aqu&iacute;..." type="text" class="input-mensaje-chat form-control form-control-sm ng-pristine ng-valid ng-empty ng-touched input-comentario" ng-model="comentario">
                                </div>
                                <div class="col-3" style="left: 200px;height: 50px;">
                                    <button class="btn btn-primary btn-enviar-comentario" ng-click="agregarComentarioJustificacion()">Enviar</button>
                                </div>
                            </div>
                            <div class="row float-right col-chat-fotter" ng-if="!configPermisoAccionCreaComentarioJustificacion">
							    <div class="col-md-12">
									<div class="txtMensajeAlertaValidaciones">
										<span><i class="fas fa-warning"></i>&nbsp; No cuentas con el permiso para agregar comentarios.</span>
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