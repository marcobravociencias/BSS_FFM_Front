<div class="modal fade" tabindex="-1" aria-hidden="true" id="modal_cluster_arbol_diponibilidad">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Geograf&iacute;a</h5>
				<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="container" ng-show="isDisponibilidad">
					<div class="row">
						<div class="col-md-12">
							<div class="input-group input-group-sm content-seach-group">
								<input id="searchGeografia" type="text" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaFiltro()">
								<span class="fa fa-search iconoBusqueda"></span>
							</div>
						</div>
						<div class="col-md-12 col-conteiner-arbol">
							<div class="container-treegeofria">
								<div id="jstreeconsulta" class="proton-demo"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="container" ng-show="isDisponibilidadV2" style=" max-height: 300px; overflow: auto;">
					<div class="input-group input-group-sm content-seach-group">
						<input id="buscadorGeografiaDispV2" type="text" autocomplete="off" class="form-control buscadorGenerico" ng-keyup="busquedaGeografiaDisponibilidadV2()" placeholder="Buscar geograf&iacute;a">
						<span class="fa fa-search iconoBusqueda"></span>
					</div>
					<div id="geografiaDisponibilidadv2" class="proton-demo"></div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" ng-show="isDisponibilidad" ng-click="btnAceptarGeografiaConsulta()" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
					Cerrar
				</button>
				<button type="button" ng-show="isDisponibilidadV2" ng-click="btnAceptarGeografiaConsultaDispV2()" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
					Cerrar
				</button>
			</div>
		</div>
	</div>
</div>