<div class="row">
	<div class="col-md-5">
		<h6 class="text-center titulo-opciones">SELECCI&Oacute;N*</h6>
		<hr />
		<div class="input-group input-group-sm content-seach-group">
			<input id="buscadorIntervencionPerfilRegistro" type="text"
				class="form-control buscadorGenerico"
				placeholder="Buscar perfil"
				ng-keyup="busquedaIntervencionPerfilRegistro()"> <span
				class="fa fa-search iconoBusqueda"></span>
		</div>
		<div class="scrollGeneralArbol">
			<div id="arbolIntervencionPerfilRegistro"
				class="jstree-proton-3 proton-demo"></div>
		</div>

	</div>
	<div class="offset-1 col-md-6">
		<h6 id="labelIntervencionesPerfilesSeleccionados"
			class="text-center titulo-opciones">SELECCIONADOS</h6>
		<hr />
		<div class="input-group input-group-sm content-seach-group">
			<input id="buscadorPerfileSeleccionadoRegistro" type="text"
				class="form-control buscadorGenerico"
				placeholder="Buscar perfil seleccionado"
				ng-keyup="busquedaPerfileSeleccionadoRegistro()"> <span
				class="fa fa-search iconoBusqueda"></span>
		</div>
		<div class="scrollGeneralArbol" id="contenedorIntervencionesPerfilesRegistro">
			<div id="arbolPerfilesSeleccionadosRegistro"
				class="jstree-proton-3 proton-demo"></div>
		</div>
	</div>
</div>