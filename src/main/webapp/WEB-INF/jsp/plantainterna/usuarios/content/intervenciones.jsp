<div class="row">
    <div class="col-md-5">
        <h6 class="text-center titulo-opciones">SELECCI&Oacute;N*</h6>
        <hr/>
		<div class="input-group input-group-sm content-seach-group">
			<input id="buscadorIntervencionRegistro" type="text" class="form-control buscadorGenerico" placeholder="Buscar intervenci&oacute;n" ng-keyup="busquedaIntervencionRegistro()"> 
			<span class="fa fa-search iconoBusqueda"></span>
		</div>
		<div class="scrollGeneralArbol">
			<div id="arbolIntervencionRegistro" class="jstree-proton-3 proton-demo">
			</div>
		</div>

    </div>
    <div class="offset-1 col-md-6">
        <h6 id="labelIntervencionesSeleccionadas" class="text-center titulo-opciones">SELECCIONADAS</h6>
        <hr/>
        <div class="col-md-12">
        	<div class="row">
            	<div class="col-md-6">
                	<span class="text-head-table-arbol"><li class="fa fa-cubes"></li>&nbsp;Intervenci&oacute;n:</span>
				</div>
                <div class="col-md-6">
                	<span class="text-head-table-arbol"><li class="fas fa-lock"></li>&nbsp;Subintervenci&oacute;n:</span>
				</div>
			</div>
            <div id="contenedorIntervencionesRegistro" class="scrollGeneralArbol">
	        	<div class="row padding_resumen_ciudades" ng-repeat="intervencion in listaIntervencionesSeleccionadas track by $index">
	            	<div class="col-md-6">
	                	<span class="text-body-table-arbol" ng-bind="intervencion.nombre"></span>
					</div>
	                <div class="col-md-6">
	                	<li class="item_ciudad_resum text-body-table-arbol" ng-repeat="inter in intervencion.hijos" ng-bind="inter.text"></li>
					</div>
				</div>
			</div>
		</div>
    </div>
</div>