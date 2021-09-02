<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
            <h6 class="text-center titulo-opciones">SELECCI&Oacute;N*</h6>
            <hr/>
            <div class="col-md-12">
                <div class="row">
                	<div class="col-md-12">
						<div class="input-group input-group-sm content-seach-group">
							<input id="buscadorPermisosRegistro" type="text" class="form-control buscadorGenerico" placeholder="Buscar permiso" ng-keyup="busquedaPermisosRegistro()"> 
							<span class="fa fa-search iconoBusqueda"></span>
						</div>
					</div>
                    <div class="scrollGeneralArbol">
                    	<div id="arbolPermisoRegistro" class="jstree-proton-3 proton-demo">											
						</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="offset-1 col-md-6">
            <h6 class="text-center titulo-opciones">SELECCIONADOS</h6>
            <hr/>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <span class="text-head-table-arbol"><li class="fa fa-cubes"></li>&nbsp;M&oacute;dulos:</span>
                    </div>
                    <div class="col-md-6">
                        <span class="text-head-table-arbol"><li class="fas fa-lock"></li>&nbsp;Permisos:</span>
                    </div>
                </div>
                <div class="scrollGeneralArbol">
	                <div class="row padding_resumen_ciudades" ng-repeat="ciudad in listaGeografiasSeleccionadas track by $index">
	                    <div class="col-md-6">
	                        <span class="text-body-table-arbol" ng-bind="ciudad.nombre"></span>
	                    </div>
	                    <div class="col-md-6">
	                        <li class="item_ciudad_resum text-body-table-arbol" ng-repeat="distrito in ciudad.hijos" ng-bind="distrito.text"></li>
	                    </div>
	                </div>
                </div>
            </div>
        </div>
    </div>
</div>