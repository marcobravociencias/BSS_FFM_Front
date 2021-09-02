<div class="row">
    <div class="offset-1 col-3">
        <h6 class="text-center titulo-opciones">SELECCI&Oacute;N*</h6>
        <hr/>
        <div class="input-group input-group-sm content-seach-group">
			<input id="buscadorIntervencionModificacion" type="text" class="form-control buscadorGenerico" placeholder="Buscar intervenci&oacute;n" ng-keyup="busquedaIntervencionRegistro()"> 
			<span class="fa fa-search iconoBusqueda"></span>
		</div>
		<div class="container-treegeofria">
			<div id="arbolIntervencionModificacion" class="proton-demo">
			</div>
		</div>
    </div>
    <div class="offset-2 col-5">
        <h6 class="text-center titulo-opciones">INTERVENCIONES*</h6>
        <hr/>
        <div class="scrollGeneralArbol">
	    	<div class="row padding_resumen_ciudades" ng-repeat="intervencion in listaIntervencionesSeleccionadasMod track by $index">
	        	<div class="col-md-6">
	            	<span class="text-body-table-arbol" ng-bind="$index + 1"></span>
	            	<span class="text-body-table-arbol" ng-bind="intervencion"></span>
	            </div>
	        </div>
        </div>
    </div>
</div>