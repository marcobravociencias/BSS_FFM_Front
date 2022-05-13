<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">T&Eacute;CNICOS DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorTecnicoRegistro" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarTecnico" placeholder="Buscar t&eacute;cnico"> <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="divTecnicos" ng-show="listaTecnicos != ''">
					<div ng-repeat="tecnico in listaTecnicos | filter:buscarTecnico track by $index" class="tecnico-section" ng-if="tecnico.checkedOpcion == false" ng-click="seleccionarTecnicoRegistro(tecnico)">
						<div class="col-md-1">
							<img src="{{tecnico.urlFoto != undefined && tecnico.urlFoto != null && tecnico.urlFoto != '' ? tecnico.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{tecnico.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{tecnico.noEmpleado ? tecnico.noEmpleado : 'Sin dato'}} - {{tecnico.geografia}}</p>
						</div>
						<div class="col-md-1 content-checkbox-operario">
							<i class="fa fa-chevron-right" style="padding-top: .9em;"></i>
						</div>
					</div>	
				</div>
				<div class="text-accion-nopermiso" style="margin-top: 5em;" ng-show="listaTecnicos == ''">
		        	<i class="icon-not-permiso fas fa-user"></i>
		            <b class="text-not-permiso">No existen t&eacute;cnicos en la geograf&iacute;a seleccionada.</b>
				</div>
			</div>
		</div>
        <div class="col-md-2">
        	<div class=" valign-wrapper" ng-show="tabTecnicosVL_MULTISELECCION">
        		<label class="span-consulta" style="padding-right: .5em;">Todos </label>
				<div class="form-check-sm form-check form-switch">
					<input class="form-check-input form-check-input-sm" type="checkbox" id="checkTotdosTecnicosRegistro" ng-click="seleccionarTodosTecnicosRegistro()" />
				</div>
			</div>
        </div>
        <div class="col-md-5">
        	<h6 id="labelTecnicosSeleccionadas" class="text-center titulo-opciones">T&Eacute;CNICOS SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarTecnicoSeleccionado" placeholder="Buscar t&eacute;cnico seleccionado"> <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorTecnicosRegistro">
					<div ng-repeat="tecnico in listaTecnicos | filter:buscarTecnicoSeleccionado track by $index" class="tecnico-section" ng-if="tecnico.checkedOpcion == true" ng-click="seleccionarTecnicoRegistro(tecnico)">
						<div class="col-md-1 content-checkbox-operario" style="padding-right: 1em;">
								<i class="fa fa-chevron-left" style="padding-top: .9em;"></i>
						</div>
						<div class="col-md-1">
							<img src="{{tecnico.urlFoto != undefined && tecnico.urlFoto != null && tecnico.urlFoto != '' ? tecnico.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{tecnico.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{tecnico.noEmpleado ? tecnico.noEmpleado : 'Sin dato'}} - {{tecnico.geografia}}</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
    </div>
</div>