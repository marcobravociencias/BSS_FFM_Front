<div class="modal-body" style="min-height: 300px; max-height: 300px;">
	<div class="container-mensajes-parent">
		<div class="chat-content-area">
			<div class="chat-header">
			</div>
			<div class="chat-area" style="height: 20em; overflow-y: auto;">
				<div ng-if="!comentariosOrdenTrabajo.length" style="text-align: center; margin-top: 2em;">
					<span style="font-size: 12px !important;color:grey; font-weight: lighter;" class="timeline__day">
						<span class="timeline__month">
							<i class="fa fa-exclamation-circle warning-nodata"></i>
						</span>
						NO SE ENCONTRARON COMENTARIOS
					</span>
				</div>
				<div class="chats" ng-repeat="comentario in comentariosOrdenTrabajo">
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
			<div class="row float-right col-chat-fotter" style="margin-top: 2em; margin-right: 2em;">
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
