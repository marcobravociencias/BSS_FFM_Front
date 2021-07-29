<div class="modal-body" style="min-height: 300px; max-height: 300px; overflow: auto;overflow-x: hidden;">
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
					<input id="comentarioConsultaOt" placeholder="Escribe el mensaje aqu&iacute; ..." type="text" class="input-mensaje-chat form-control form-control-sm ng-pristine ng-valid ng-empty ng-touched input-comentario-ot" ng-model="comentarioConsultaOT">
				</div>
				<div class="col-3" style="left: 200px;height: 50px;">
					<button class="btn btn-primary btn-enviar-comentario-ot" ng-click="addComentariosConsultaOt()">Enviar</button>
				</div>
			</div>
		</div>
	</div>
</div>
