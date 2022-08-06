<div class="modal fade" tabindex="-1" aria-hidden="true" id="modalCluster">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title modal-title-reportesPI" id="exampleModalLabel">Geograf&iacute;a</h5>
				<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body" style=" max-height: 300px; overflow: auto;">
        		<div class="input-group input-group-sm content-seach-group" id="seach-jstree-instalaciones" ng-show="tipoReporte == 'instalaciones'">
          			<input id="searchGeo-instalaciones" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
          			<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-soportes" ng-show="tipoReporte == 'soportes'">
          			<input id="searchGeo-soportes" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
          				<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-recolecciones" ng-show="tipoReporte == 'recolecciones'">
					<input id="searchGeo-recolecciones" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-addon" ng-show="tipoReporte == 'addon'">
					<input id="searchGeo-addon" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div id="jstree-proton-instalaciones" class="proton-demo proton-reportes" ng-show="tipoReporte == 'instalaciones'"></div>
				<div id="jstree-proton-soportes" class="proton-demo proton-reportes" ng-show="tipoReporte == 'soportes'"></div>
				<div id="jstree-proton-recolecciones" class="proton-demo proton-reportes" ng-show="tipoReporte == 'recolecciones'"></div>
				<div id="jstree-proton-addon" class="proton-demo proton-reportes" ng-show="tipoReporte == 'addon'"></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
					Cerrar
				</button>
			</div>
		</div>
	</div>
</div>