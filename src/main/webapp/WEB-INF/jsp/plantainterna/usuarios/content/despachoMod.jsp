<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">DESPACHOS DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarTecnico" placeholder="Buscar despacho"> <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="divTecnicos">
					<div ng-repeat="despacho in listaDespachos | filter:buscarTecnico track by $index" class="tecnico-section" ng-if="despacho.checkedOpcion == false" ng-click="seleccionarDespachoRegistro(despacho)">
						<div class="col-md-1">
							<img src="{{despacho.urlFotoPerfil !=undefined && despacho.urlFotoPerfil ? despacho.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{despacho.idUsuario}}" class="col-md-10">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{despacho.nombre}} {{despacho.apellidoPaterno}} {{despacho.apellidoMaterno}}</p>
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
					<input class="form-check-input form-check-input-sm" type="checkbox" id="checkTotdosDespachoRegistro" ng-click="seleccionarTodosDespachosRegistro()" />
				</div>
			</div>
        </div>
        <div class="col-md-5">
        	<h6 id="labelDespachosSeleccionadosMod" class="text-center titulo-opciones">DESPACHOS SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarTecnicoSeleccionado" placeholder="Buscar despacho seleccionado"> <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorDespachosMod">
					<div ng-repeat="despacho in listaDespachos | filter:buscarTecnicoSeleccionado track by $index" class="tecnico-section" ng-if="despacho.checkedOpcion == true" ng-click="seleccionarDespachoRegistro(despacho)">
						<div class="col-md-1 content-checkbox-operario" style="padding-right: 1em;">
								<i class="fa fa-chevron-left" style="padding-top: .3em;"></i>
						</div>
						<div class="col-md-1">
							<img src="{{despacho.urlFotoPerfil !=undefined && despacho.urlFotoPerfil ? despacho.urlFotoPerfil :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{despacho.idUsuario}}" class="col-md-10">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{despacho.nombre}} {{despacho.apellidoPaterno}} {{despacho.apellidoMaterno}}</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
    </div>
</div>