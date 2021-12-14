<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">DESPACHOS DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorDespachoRegistro" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarDespacho" placeholder="Buscar despacho"> <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="divTecnicos">
					<div ng-repeat="despacho in listaDespachos | filter:buscarDespacho track by $index" class="tecnico-section" ng-if="despacho.checkedOpcion == false" ng-click="seleccionarDespachoRegistro(despacho)">
						<div class="col-md-1">
							<img src="{{despacho.urlFoto != undefined && despacho.urlFoto != null && despacho.urlFoto != '' ? despacho.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{despacho.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{despacho.nombre}} {{despacho.apellidoPaterno}} {{despacho.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{despacho.noEmpleado ? despacho.noEmpleado : 'Sin dato'}} - {{despacho.geografia}}</p>
						</div>
						<div class="col-md-1 content-checkbox-operario">
							<i class="fa fa-chevron-right" style="padding-top: .9em;"></i>
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
        	<h6 id="labelDespachosSeleccionados" class="text-center titulo-opciones">DESPACHOS SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarDespachoSeleccionado" placeholder="Buscar despacho seleccionado"> <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorDespachosRegistro">
					<div ng-repeat="despacho in listaDespachos | filter:buscarDespachoSeleccionado track by $index" class="tecnico-section" ng-if="despacho.checkedOpcion == true" ng-click="seleccionarDespachoRegistro(despacho)">
						<div class="col-md-1 content-checkbox-operario" style="padding-right: 1em;">
								<i class="fa fa-chevron-left" style="padding-top: .9em;"></i>
						</div>
						<div class="col-md-1">
							<img src="{{despacho.urlFoto != undefined && despacho.urlFoto != null && despacho.urlFoto != '' ? despacho.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{despacho.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{despacho.nombre}} {{despacho.apellidoPaterno}} {{despacho.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{despacho.noEmpleado ? despacho.noEmpleado : 'Sin dato'}} - {{despacho.geografia}}</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
    </div>
</div>