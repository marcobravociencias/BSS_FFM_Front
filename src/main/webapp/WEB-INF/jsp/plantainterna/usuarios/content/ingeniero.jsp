<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">INGENIEROS DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorIngenieroRegistro" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarIngeniero" placeholder="Buscar ingeniero"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" ng-show="listaIngenieros != ''">
					<div ng-repeat="ingeniero in listaIngenieros | filter:buscarIngeniero track by $index" class="tecnico-section" ng-if="ingeniero.checkedOpcion == false" ng-click="seleccionarIngenieroRegistro(ingeniero)">
						<div class="col-md-1">
							<img src="{{ingeniero.urlFoto != undefined && ingeniero.urlFoto != null && ingeniero.urlFoto != '' ? ingeniero.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{ingeniero.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{ingeniero.nombre}} {{ingeniero.apellidoPaterno}} {{ingeniero.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{ingeniero.noEmpleado ? ingeniero.noEmpleado : 'Sin dato'}} - {{ingeniero.geografia}}</p>
						</div>
						<div class="col-md-1 content-checkbox-operario">
							<i class="fa fa-chevron-right" style="padding-top: .9em;"></i>
						</div>
					</div>	
				</div>
				<div class="text-accion-nopermiso" style="margin-top: 5em;" ng-show="listaIngenieros == ''">
		        	<i class="icon-not-permiso fas fa-user"></i>
		            <b class="text-not-permiso">Actualmente no existen ingenieros.</b>
				</div>
			</div>
		</div>
        <div class="col-md-2">
        	<div class=" valign-wrapper">
        		<label class="span-consulta" style="padding-right: .5em;">Todos </label>
				<div class="form-check-sm form-check form-switch">
					<input class="form-check-input form-check-input-sm" type="checkbox" id="checkTotdosIngenieroRegistro" ng-click="seleccionarTodosIngenierosRegistro()" />
				</div>
			</div>
        </div>
        <div class="col-md-5">
        	<h6 id="labelIngenierosSeleccionados" class="text-center titulo-opciones">INGENIEROS SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarIngenieroSeleccionado" placeholder="Buscar ingeniero seleccionado"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorIngenierosRegistro">
					<div ng-repeat="ingeniero in listaIngenieros | filter:buscarIngenieroSeleccionado track by $index" class="tecnico-section" ng-if="ingeniero.checkedOpcion == true" ng-click="seleccionarIngenieroRegistro(ingeniero)">
						<div class="col-md-1 content-checkbox-operario" style="padding-right: 1em;">
								<i class="fa fa-chevron-left" style="padding-top: .9em;"></i>
						</div>
						<div class="col-md-1">
							<img src="{{ingeniero.urlFoto != undefined && ingeniero.urlFoto != null && ingeniero.urlFoto != '' ? ingeniero.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{ingeniero.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{ingeniero.nombre}} {{ingeniero.apellidoPaterno}} {{ingeniero.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{ingeniero.noEmpleado ? ingeniero.noEmpleado : 'Sin dato'}} - {{ingeniero.geografia}}</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
    </div>
</div>