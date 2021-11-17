<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">T&Eacute;CNICOS DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorTecnicoMod" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarTecnicoMod" placeholder="Buscar t&eacute;cnico"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="divTecnicos">
					<div ng-repeat="tecnico in listaTecnicosMod | filter:buscarTecnicoMod track by $index" class="tecnico-section" ng-if="tecnico.checkedOpcion == false" ng-click="seleccionarTecnicoMod(tecnico)">
						<div class="col-md-1">
							<img src="{{tecnico.urlFotoPerfil !=undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{tecnico.idUsuario}}" class="col-md-10">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}</p>
						</div>
						<div class="col-md-1 content-checkbox-operario">
							<i class="fa fa-chevron-right" style="padding-top: .3em;"></i>
						</div>
					</div>	
				</div>
			</div>
		</div>
        <div class="col-md-2">
        	<div class=" valign-wrapper">
        		<label class="span-consulta" style="padding-right: .5em;">Todos </label>
				<div class="form-check-sm form-check form-switch">
					<input class="form-check-input form-check-input-sm" type="checkbox" id="checkTotdosTecnicosMod" ng-click="seleccionarTodosTecnicosMod()" />
				</div>
			</div>
        </div>
        <div class="col-md-5">
        	<h6 id="labelTecnicosSeleccionadosMod" class="text-center titulo-opciones">T&Eacute;CNICOS SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorTecnicoSeleccionadoMod" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarTecnicoSeleccionadoMod" placeholder="Buscar t&eacute;cnico seleccionado"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorTecnicosMod">
					<div ng-repeat="tecnico in listaTecnicosMod | filter:buscarTecnicoSeleccionadoMod track by $index" class="tecnico-section" ng-if="tecnico.checkedOpcion == true" ng-click="seleccionarTecnicoMod(tecnico)">
						<div class="col-md-1 content-checkbox-operario" style="padding-right: 1em;">
								<i class="fa fa-chevron-left" style="padding-top: .3em;"></i>
						</div>
						<div class="col-md-1">
							<img src="{{tecnico.urlFotoPerfil !=undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{tecnico.idUsuario}}" class="col-md-10">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
    </div>
</div>