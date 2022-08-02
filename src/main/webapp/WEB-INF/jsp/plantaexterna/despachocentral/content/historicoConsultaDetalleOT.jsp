<center>                                          
  <h3 class="subtitulosModalDetalle">Hist&oacute;rico</h3>
  <hr style="border: .5px solid #ccc;" />
</center>
<div class="container">
	<div class="row scrollGeneralListas">
		<div class="col-md-12" ng-repeat="hist in listaHistoricoOT" style="padding: .5em;">
			<div class="row contenedorHistorico">
				<div class="col-md-6">
					<div class="col-md-12">
						<b  class="title_span"> OT:</b>
	                    <span id="ot_detalle" class="content_text">{{hist.ot}}</span>
					</div>
	                <div class="col-md-12">
	                	<b class="title_span"> Estado:</b>
	                    <span id="ot_detalle" class="content_text">{{hist.estdo}}</span>
					</div>
					<div class="col-md-12">
						<b class="title_span"> Descripci&oacute;n:</b>
						<span id="ot_detalle" class="content_text">{{hist.descripcion}}</span>
					</div>
				</div>
				<div class="col-md-6">
					<div class="col-md-12">
						<b class="title_span"> Motivo:</b>
						<span id="ot_detalle" class="content_text">{{hist.motivo}}</span>
					</div>
					<div class="col-md-12">
						<b class="title_span"> Fecha:</b>
						<span id="ot_detalle" class="content_text">{{hist.fecha}}</span>
					</div>
					<div class="col-md-12">
						<b class="title_span"> Hora:</b>
						<span id="ot_detalle" class="content_text">{{hist.hora}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>