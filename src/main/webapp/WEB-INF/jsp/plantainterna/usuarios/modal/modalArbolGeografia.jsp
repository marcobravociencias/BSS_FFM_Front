<div id="modalGeografiaConsulta" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Geograf&iacute;a</h5>
				<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click="cerrarModalGeografiaConsulta()"></button>
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="input-group input-group-sm content-seach-group">
								<input id="buscadorGeografiaConsulta" type="text" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaConsulta()"> 
								<span class="fa fa-search iconoBusqueda"></span>
							</div>
						</div>
						<div class="col-md-12 scrollModalArbolGeografias">
							<div class="container-treegeofria">
								<div id="arbolGeografiaConsulta" class="proton-demo">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal" ng-click="cerrarModalGeografiaConsulta()">CERRAR</button>
				<button class="btn btn-primary" ng-click="consultaUsuariosPorGeoCompPuestos()">CONSULTAR</button>
			</div>
		</div>
	</div>
</div>