<div class="row">
    <div class="col-md-5">
        <h6 class="text-center titulo-opciones">SELECCI&Oacute;N*</h6>
        <hr/>
		<div class="input-group input-group-sm content-seach-group">
			<input id="buscadorIntervencionRegistro" type="text" class="form-control buscadorGenerico" placeholder="Buscar intervenci&oacute;n" ng-keyup="busquedaIntervencionRegistro()"> 
			<span class="fa fa-search iconoBusqueda"></span>
		</div>
		<div class="container-treegeofria">
			<div id="arbolIntervencionRegistro" class="proton-demo">
			</div>
		</div>

    </div>
    <div class="offset-1 col-md-6">
        <h6 class="text-center titulo-opciones">SELECCIONADAS</h6>
        <hr/>
        <div class="scrollGeneralArbol">
	    	<div class="row padding_resumen_ciudades" ng-repeat="intervencion in listaIntervencionesSeleccionadas track by $index">
	        	<div class="col-md-6">
	            	<span class="text-body-table-arbol" ng-bind="$index + 1"></span>
	            	<span class="text-body-table-arbol" ng-bind="intervencion"></span>
	            </div>
	        </div>
        </div>
    </div>
</div>