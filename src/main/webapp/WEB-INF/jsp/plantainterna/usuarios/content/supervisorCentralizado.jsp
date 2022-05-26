<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">SUPERVISORES CENTRALIZADOS DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorSupervisorCentralizadoRegistro" type="text" class="form-control buscadorGenerico" ng-model="buscarSupervisorCentralizado" placeholder="Buscar supervisor"> 
				<span class="fa fa-search iconoBusqueda"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" ng-show="listaSupervisoresCentralizados != ''">
					<div ng-repeat="supervisor in listaSupervisoresCentralizados | filter:buscarSupervisorCentralizado track by $index" class="tecnico-section" ng-if="supervisor.checkedOpcion == false" ng-click="seleccionarSupervisorCentralizadoRegistro(supervisor)">
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
				<div class="text-accion-nopermiso" style="margin-top: 5em;" ng-show="listaSupervisoresCentralizados == ''">
		        	<i class="icon-not-permiso fas fa-user"></i>
		            <b class="text-not-permiso">No existen supervisores centralizados en la geograf&iacute;a seleccionada.</b>
				</div>
			</div>
		</div>
        <div class="col-md-2">
        	<div class=" valign-wrapper" ng-show="tabSupervisorCentralizadoVL_MULTISELECCION">
        		<label class="span-consulta" style="padding-right: .5em;">Todos </label>
				<div class="form-check-sm form-check form-switch">
					<input class="form-check-input form-check-input-sm" type="checkbox" id="checkTotdosSupervisorCentralizadoRegistro" ng-click="seleccionarTodosSupervisoresCentralizadosRegistro()" />
				</div>
			</div>
        </div>
        <div class="col-md-5">
        	<h6 id="labelSupervisorCentralizadoSeleccionados" class="text-center titulo-opciones">SUPERVISORES CENTRALIZADOS SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control buscadorGenerico" ng-model="buscarSupervisorCentralizadoSeleccionado" placeholder="Buscar supervisor seleccionado"> 
				<span class="fa fa-search iconoBusqueda"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorSupervisorCentralizadoRegistro">
					<div ng-repeat="supervisor in listaSupervisoresCentralizados | filter:buscarSupervisorCentralizadoSeleccionado track by $index" class="tecnico-section" ng-if="supervisor.checkedOpcion == true" ng-click="seleccionarSupervisorCentralizadoRegistro(supervisor)">
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