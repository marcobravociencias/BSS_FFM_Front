<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">SUPERVISORES DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorSupervisorRegistro" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarSupervisor" placeholder="Buscar supervisor"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" ng-show="listaSupervisores != ''">
					<div ng-repeat="supervisor in listaSupervisores | filter:buscarSupervisor track by $index" class="tecnico-section" ng-if="supervisor.checkedOpcion == false" ng-click="seleccionarSupervisorRegistro(supervisor)">
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
				<div class="text-accion-nopermiso" style="margin-top: 5em;" ng-show="listaSupervisores == ''">
		        	<i class="icon-not-permiso fas fa-user"></i>
		            <b class="text-not-permiso">No existen supervisores en la geograf&iacute;a seleccionada.</b>
				</div>
			</div>
		</div>
        <div class="col-md-2">
        	<div class=" valign-wrapper" ng-show="tabSupervisorVL_MULTISELECCION">
        		<label class="span-consulta" style="padding-right: .5em;">Todos </label>
				<div class="form-check-sm form-check form-switch">
					<input class="form-check-input form-check-input-sm" type="checkbox" id="checkTotdosSupervisorRegistro" ng-click="seleccionarTodosSupervisoresRegistro()" />
				</div>
			</div>
        </div>
        <div class="col-md-5">
        	<h6 id="labelSupervisoresSeleccionados" class="text-center titulo-opciones">SUPERVISORES SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarSupervisorSeleccionado" placeholder="Buscar supervisor seleccionado"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorSupervisoresRegistro">
					<div ng-repeat="supervisor in listaSupervisores | filter:buscarSupervisorSeleccionado track by $index" class="tecnico-section" ng-if="supervisor.checkedOpcion == true" ng-click="seleccionarSupervisorRegistro(supervisor)">
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