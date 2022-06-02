<div class="row">
    <div class="col-md-5">
        <h6 class="text-center titulo-opciones">SELECCI&Oacute;N*</h6>
        <hr/>
		<div class="input-group input-group-sm content-seach-group">
			<input id="buscadorIntervencionPerfilMod" type="text" class="form-control buscadorGenerico" placeholder="Buscar perfil" ng-keyup="busquedaIntervencionPerfilMod()"> 
			<span class="fa fa-search iconoBusqueda"></span>
		</div>
		<div class="scrollGeneralArbol">
			<div id="arbolIntervencionPerfilMod" class="jstree-proton-3 proton-demo">
			</div>
		</div>

    </div>
    <div class="offset-1 col-md-6">
        <h6 id="labelIntervencionesPerfilesSeleccionadosMod" class="text-center titulo-opciones">SELECCIONADOS</h6>
        <hr/>
        <div class="input-group input-group-sm content-seach-group">
			<input id="buscadorPerfileSeleccionadoMod" type="text"
				class="form-control buscadorGenerico"
				placeholder="Buscar perfil seleccionado"
				ng-keyup="busquedaPerfileSeleccionadoMod()"> <span
				class="fa fa-search iconoBusqueda"></span>
		</div>
		<div class="scrollGeneralArbol" id="contenedorIntervencionesPerfilesMod">
			<div id="arbolPerfilesSeleccionadosMod"
				class="jstree-proton-3 proton-demo"></div>
		</div>
    </div>
</div>