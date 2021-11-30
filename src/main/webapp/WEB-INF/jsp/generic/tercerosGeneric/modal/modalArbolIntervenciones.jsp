<div id="modalIntervencionesConsulta" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Intervenciones</h5>
				<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click=""></button>
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="input-group input-group-sm contenedorBuscadorGeneral">
								<input id="buscadorIntervencionConsultaGeneral" type="text" class="form-control txtBusquedaGeneral" placeholder="Buscar intervenci&oacute;n" ng-keyup="busquedaIntervencionConsultaGeneral()"> 
								<span class="fa fa-search iconoBusquedaGeneral"></span>
							</div>
						</div>
						<div class="col-md-12 scrollModalArbolIntervenciones">
							<div class="containerArbolIntervenciones">
								<div id="arbolIntervencionesConsulta" class="proton-demo textoNodosArboles">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal" ng-click="btnAceptarModalIntervencionesConsulta()">ACEPTAR</button>
			</div>
		</div>
	</div>
</div>