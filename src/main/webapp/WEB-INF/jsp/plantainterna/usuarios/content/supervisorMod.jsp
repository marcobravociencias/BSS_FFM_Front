<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">SUPERVISORES DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorSupervisorMod" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarSupervisorMod" placeholder="Buscar supervisor"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" ng-show="listaSupervisoresMod != ''">
					<div ng-repeat="supervisor in listaSupervisoresMod | filter:buscarSupervisorMod track by $index" class="tecnico-section" ng-if="supervisor.checkedOpcion == false" ng-click="seleccionarSupervisorMod(supervisor)">
						<div class="col-md-1">
							<img src="{{supervisor.urlFoto != undefined && supervisor.urlFoto != null && supervisor.urlFoto != '' ? supervisor.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{supervisor.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{supervisor.nombre}} {{supervisor.apellidoPaterno}} {{supervisor.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{supervisor.noEmpleado ? supervisor.noEmpleado : 'Sin dato'}} - {{supervisor.geografia}}</p>
						</div>
						<div class="col-md-1 content-checkbox-operario">
							<i class="fa fa-chevron-right" style="padding-top: .9em;"></i>
						</div>
					</div>	
				</div>
				<div class="text-accion-nopermiso" style="margin-top: 5em;" ng-show="listaSupervisoresMod == ''">
		        	<i class="icon-not-permiso fas fa-user"></i>
		            <b class="text-not-permiso">No existen supervisores en la geograf&iacute;a seleccionada.</b>
				</div>
			</div>
		</div>
        <div class="col-md-2">
        	<div class=" valign-wrapper" ng-show="tabSupervisorVL_MULTISELECCION_mod">
        		<label class="span-consulta" style="padding-right: .5em;">Todos </label>
				<div class="form-check-sm form-check form-switch">
					<input class="form-check-input form-check-input-sm" type="checkbox" id="checkTotdosSupervisorMod" ng-click="seleccionarTodosSupervisoresMod()" />
				</div>
			</div>
        </div>
        <div class="col-md-5">
        	<h6 id="labelSupervisoresSeleccionadosMod" class="text-center titulo-opciones">SUPERVISORES SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarSupervisorSeleccionadoMod" placeholder="Buscar supervisor seleccionado"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorSupervisoresMod">
					<div ng-repeat="supervisor in listaSupervisoresMod | filter:buscarSupervisorSeleccionadoMod track by $index" class="tecnico-section" ng-if="supervisor.checkedOpcion == true" ng-click="seleccionarSupervisorMod(supervisor)">
						<div class="col-md-1 content-checkbox-operario" style="padding-right: 1em;">
								<i class="fa fa-chevron-left" style="padding-top: .9em;"></i>
						</div>
						<div class="col-md-1">
							<img src="{{supervisor.urlFoto != undefined && supervisor.urlFoto != null && supervisor.urlFoto != '' ? supervisor.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{supervisor.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{supervisor.nombre}} {{supervisor.apellidoPaterno}} {{supervisor.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{supervisor.noEmpleado ? supervisor.noEmpleado : 'Sin dato'}} - {{supervisor.geografia}}</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
    </div>
</div>