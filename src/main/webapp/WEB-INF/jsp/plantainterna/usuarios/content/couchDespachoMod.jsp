<div class="col-md-12">
    <div class="row">
        <div class="col-md-5">
        	<h6 class="text-center titulo-opciones">COUCHS DISPONIBLES*</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input id="buscadorCouchMod" type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarCouchMod" placeholder="Buscar couch"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" ng-show="listaCouchsDespachosMod != ''">
					<div ng-repeat="couch in listaCouchsDespachosMod | filter:buscarCouchMod track by $index" class="tecnico-section" ng-if="couch.checkedOpcion == false" ng-click="seleccionarCouchMod(couch)">
						<div class="col-md-1">
							<img src="{{couch.urlFoto != undefined && couch.urlFoto != null && couch.urlFoto != '' ? couch.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{couch.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{couch.nombre}} {{couch.apellidoPaterno}} {{couch.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{couch.noEmpleado ? couch.noEmpleado : 'Sin dato'}} - {{couch.geografia}}</p>
						</div>
						<div class="col-md-1 content-checkbox-operario">
							<i class="fa fa-chevron-right" style="padding-top: .9em;"></i>
						</div>
					</div>	
				</div>
				<div class="text-accion-nopermiso" style="margin-top: 5em;" ng-show="listaCouchsDespachosMod == ''">
		        	<i class="icon-not-permiso fas fa-user"></i>
		            <b class="text-not-permiso">No existen couchs en la geograf&iacute;a seleccionada.</b>
				</div>
			</div>
		</div>
        <div class="col-md-2">
        	<div class=" valign-wrapper" ng-show="tabCouchDespachoVL_MULTISELECCION_mod">
        		<label class="span-consulta" style="padding-right: .5em;">Todos </label>
				<div class="form-check-sm form-check form-switch">
					<input class="form-check-input form-check-input-sm" type="checkbox" id="checkTotdosCouchMod" ng-click="seleccionarTodosCouchsMod()" />
				</div>
			</div>
        </div>
        <div class="col-md-5">
        	<h6 id="labelCouchsSeleccionadosMod" class="text-center titulo-opciones">COUCHS SELECCIONADOS</h6>
            <hr/>
			<div class="input-group input-group-sm content-seach-group">
				<input type="text" class="form-control form-control-sm buscar-input-operario" ng-model="buscarCouchSeleccionadoMod" placeholder="Buscar couch seleccionado"> <span class="search-icon-operario-busq fa fa-search"></span>
			</div>
			<div class="tecnicos-container">
				<div class="scrollListaTecnicos" id="contenedorCouchsMod">
					<div ng-repeat="couch in listaCouchsDespachosMod | filter:buscarCouchSeleccionadoMod track by $index" class="tecnico-section" ng-if="couch.checkedOpcion == true" ng-click="seleccionarCouchMod(couch)">
						<div class="col-md-1 content-checkbox-operario" style="padding-right: 1em;">
								<i class="fa fa-chevron-left" style="padding-top: .9em;"></i>
						</div>
						<div class="col-md-1">
							<img src="{{couch.urlFoto != undefined && couch.urlFoto != null && couch.urlFoto != '' ? couch.urlFoto :'./resources/img/plantainterna/despacho/tecnicootasignada.png'}}" class="circle responsive-img-tecnico">
						</div>
						<div id="{{couch.idUsuario}}" class="col-md-10" style="padding-left: 2em;">
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{couch.nombre}} {{couch.apellidoPaterno}} {{couch.apellidoMaterno}}</p>
							<p class="span-consultaTecnico" style="padding-top: .5em;">{{couch.noEmpleado ? couch.noEmpleado : 'Sin dato'}} - {{couch.geografia}}</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
    </div>
</div>