<center>
	<h3 class="subtitulosModalDetalle">Chat</h3>
	<hr style="border: .5px solid #ccc;" />
</center>
<div class="chat">
	<div class="chat-history">
		<ul id="chats_historial">
			<li class="clearfix" ng-repeat="comentario in listaComentariosDetalleOT">
				<div ng-if="comentario.plataforma == 'FFM WEB'" class="message-data align-left">
					<span class="title_span" >{{comentario.plataforma}} - {{comentario.usuario}}</span>
					<span class="content_text" >{{comentario.fecha}}</span> &nbsp; &nbsp;
				</div>
				<div ng-if="comentario.plataforma == 'FFM WEB'" class="content_text">
					{{comentario.comentario}}
				</div>
				
				<div ng-if="comentario.plataforma == 'FFM APP'" class="message-data align-right">
					<span class="title_span" >{{comentario.plataforma}} - {{comentario.usuario}}</span>
					<span class="content_text" >{{comentario.fecha}}</span> &nbsp; &nbsp;
				</div>
				<div ng-if="comentario.plataforma == 'FFM APP'" class="content_text float-right">
					{{comentario.comentario}}
				</div>
			</li>			
		</ul>
    </div>
    <div class="col-md-12">
		<div class="chat-message clearfix">
			<textarea id="areatexto" type="text" placeholder="Escribe tu mensaje..."></textarea> 
			<button style="margin-left: 28px; float: right;" type="button" id="enviar_mensaje" onclick="setComentario();" class="btn btn-sm btn-primary bloqueo">Enviar</button>
        </div> 
    </div> 
</div> 