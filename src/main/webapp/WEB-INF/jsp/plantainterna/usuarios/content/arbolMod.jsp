<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
            <h6 class="text-center titulo-opciones">FFM TOTALPLAY EMPRESARIAL *</h6>
            <hr/>
            <div class="col-md-12">
                <div class="row">
                	<div class="col-md-12">
						<div class="input-group input-group-sm content-seach-group">
							<input id="buscadorGeografiaRegistro" type="text" class="form-control buscadorGenerico" placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaRegistro()"> 
							<span class="fa fa-search iconoBusqueda"></span>
						</div>
					</div>
                    <div class="scrollGeneralArbol">
                    	<div id="arbolGeografiaMod" class="jstree-proton-3 proton-demo">											
						</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="offset-1 col-md-6">
            <h6 id="labelGeografiasSeleccionadas" class="text-center titulo-opciones">SELECCIONADAS</h6>
            <hr/>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">
                        <span class="text-head-table-arbol"><li class="fa fa-crosshairs"></li>&nbsp;Ciudades:</span>
                    </div>
                    <div class="col-md-6">
                        <span class="text-head-table-arbol"><li class="fa fa-cubes"></li>&nbsp;Distritos:</span>
                    </div>
                </div>
                <div id="contenedorGeografiasRegistro" class="scrollGeneralArbol">
	                <div class="row padding_resumen_ciudades" ng-repeat="ciudad in listaCiudadesSelecionadasMod track by $index">
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