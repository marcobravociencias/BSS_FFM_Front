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
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-empresarial" ng-show="tipoReporte == 'empresarial'">
					<input id="searchGeo-empresarial" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-general" ng-show="tipoReporte == 'general'">
					<input id="searchGeo-general" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-soportesing" ng-show="tipoReporte == 'soportesing'">
					<input id="searchGeo-soportesing" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-ventasres" ng-show="tipoReporte == 'ventasres'">
					<input id="searchGeo-ventasres" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-ventasemp" ng-show="tipoReporte == 'ventasemp'">
					<input id="searchGeo-ventasemp" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-ventasempsa" ng-show="tipoReporte == 'ventasempsa'">
					<input id="searchGeo-ventasempsa" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-soportescomp" ng-show="tipoReporte == 'soportescomp'">
					<input id="searchGeo-soportescomp" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-instalacionres" ng-show="tipoReporte == 'instalacionres'">
					<input id="searchGeo-instalacionres" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-instalacionemp" ng-show="tipoReporte == 'instalacionemp'">
					<input id="searchGeo-instalacionemp" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-sitiosfibr" ng-show="tipoReporte == 'sitiosfibr'">
					<input id="searchGeo-sitiosfibr" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-redessoc" ng-show="tipoReporte == 'redessoc'">
					<input id="searchGeo-redessoc" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div class="input-group input-group-sm content-seach-group" id="seach-jstree-generados" ng-show="tipoReporte == 'generados'">
					<input id="searchGeo-generados" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a">
					<span class="fa fa-search iconoBusqueda"></span>
				</div>
				<div id="jstree-proton-instalaciones" class="proton-demo proton-reportes" ng-show="tipoReporte == 'instalaciones'"></div>
				<div id="jstree-proton-soportes" class="proton-demo proton-reportes" ng-show="tipoReporte == 'soportes'"></div>
				<div id="jstree-proton-recolecciones" class="proton-demo proton-reportes" ng-show="tipoReporte == 'recolecciones'"></div>
				<div id="jstree-proton-addon" class="proton-demo proton-reportes" ng-show="tipoReporte == 'addon'"></div>
				<div id="jstree-proton-empresarial" class="proton-demo proton-reportes" ng-show="tipoReporte == 'empresarial'"></div>
				<div id="jstree-proton-general" class="proton-demo proton-reportes" ng-show="tipoReporte == 'general'"></div>
				<div id="jstree-proton-soportesing" class="proton-demo proton-soportesing" ng-show="tipoReporte == 'soportesing'"></div>
				<div id="jstree-proton-ventasres" class="proton-demo proton-ventasres" ng-show="tipoReporte == 'ventasres'"></div>
				<div id="jstree-proton-ventasemp" class="proton-demo proton-ventasemp" ng-show="tipoReporte == 'ventasemp'"></div>
				<div id="jstree-proton-ventasempsa" class="proton-demo proton-ventasempsa" ng-show="tipoReporte == 'ventasempsa'"></div>
				<div id="jstree-proton-soportescomp" class="proton-demo proton-soportescomp" ng-show="tipoReporte == 'soportescomp'"></div>
				<div id="jstree-proton-instalacionres" class="proton-demo proton-instalacionres" ng-show="tipoReporte == 'instalacionres'"></div>
				<div id="jstree-proton-instalacionemp" class="proton-demo proton-instalacionemp" ng-show="tipoReporte == 'instalacionemp'"></div>
				<div id="jstree-proton-sitiosfibr" class="proton-demo proton-sitiosfibr" ng-show="tipoReporte == 'sitiosfibr'"></div>
				<div id="jstree-proton-redessoc" class="proton-demo proton-redessoc" ng-show="tipoReporte == 'redessoc'"></div>
				<div id="jstree-proton-generados" class="proton-demo proton-generados" ng-show="tipoReporte == 'generados'"></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
					Cerrar
				</button>
			</div>
		</div>
	</div>
</div>