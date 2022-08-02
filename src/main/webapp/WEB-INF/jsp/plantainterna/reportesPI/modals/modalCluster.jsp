<div class="modal fade" tabindex="-1" aria-hidden="true" id="modalCluster">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title modal-title-reportesPI" id="exampleModalLabel">Geograf&iacute;a</h5>
				<button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body" style=" max-height: 300px; overflow: auto;">
        		<div class="input-group input-group-sm content-seach-group" id="seach-jstree-seguimiento" ng-show="tipoReporte == 'seguimiento'">
          			<input id="searchGeo-seguimiento" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
          			<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-cierre" ng-show="tipoReporte == 'cierre'">
          			<input id="searchGeo-cierre" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
          				<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-asignadas" ng-show="tipoReporte == 'asignadas'">
					<input id="searchGeo-asignadas" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-tecnicos" ng-show="tipoReporte == 'tecnicos'">
					<input id="searchGeo-tecnicos" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div id="jstree-proton-seguimiento" class="proton-demo proton-reportes" ng-show="tipoReporte == 'seguimiento'"></div>
				<div id="jstree-proton-cierre" class="proton-demo proton-reportes" ng-show="tipoReporte == 'cierre'"></div>
				<div id="jstree-proton-asignadas" class="proton-demo proton-reportes" ng-show="tipoReporte == 'asignadas'"></div>
				<div id="jstree-proton-tecnicos" class="proton-demo proton-reportes" ng-show="tipoReporte == 'tecnicos'"></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
					Cerrar
				</button>
			</div>
		</div>
	</div>
</div>