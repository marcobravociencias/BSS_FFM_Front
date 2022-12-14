<div class="row contenedorRowForm">
	<div class="col-md-4">
		<label class="span-consulta"><i class="fas fa-address-card"></i> Puesto*</label>
        <div class="input-group">
        	<select readonly disabled class="form-control custom-select inputSelectFormulario" id="puesto_select_modificacion" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option ng-repeat="puesto in puestoRegistrado" value="{{puesto.id}}">{{puesto.descripcion}}</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-building"></i> Compa&ntilde;&iacute;a*</label>
        <div class="input-group">
        	<select class="form-control custom-select inputSelectFormulario" id="compania_select_modificacion" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option ng-repeat="compania in listaCompanias" value="{{compania.id}}">{{compania.descripcion}}</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4">
    	<label class="span-consulta"><i class="fa fa-list-alt"></i> N?mero de empleado*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario formValExisteUsuarioMod" ng-model="detalleUsuario.numeroEmpleado" id="form-num-empleado-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 15015997">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-user"></i> Usuario*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario formValExisteUsuarioMod" ng-model="detalleUsuario.usuario" id="form-usuario-mod" ng-keyup="quitarEspaciosNombreUsuario('form-usuario-mod')" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. PIRESIDENCIAL">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-id-card"></i> CURP*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario formValExisteUsuarioMod" ng-model="detalleUsuario.curp" id="form-curp-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. FOBR920509HMSLRY05" maxlength="18" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-id-card"></i> RFC*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario formValExisteUsuarioMod" ng-model="detalleUsuario.rfc" id="form-rfc-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. SALJ940309U54" maxlength="13" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
    	<label class="span-consulta"><i class="fas fa-user-tie"></i> Nombre(s)*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario formValExisteUsuarioMod" ng-model="detalleUsuario.nombre" id="form-nombres-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. Jos&eacute; Eduardo">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="far fa-user"></i> Apellido paterno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario formValExisteUsuarioMod" ng-model="detalleUsuario.apellidoPaterno" id="form-a-paterno-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. S&aacute;nchez">
        </div>
    </div>
    <div class="col-md-4">
    	<label class="span-consulta"><i class="far fa-user"></i> Apellido materno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario formValExisteUsuarioMod" ng-model="detalleUsuario.apellidoMaterno" id="form-a-materno-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. Luna">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
	<div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-mobile-phone"></i> Tel&eacute;fono de contacto*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.telefonoCelular" id="form-telefono-contacto-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 5515798000" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="10" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-envelope"></i> Correo electr&oacute;nico*</label>
        <div class="input-group">
        	<input type="email" class="form-control inputFormulario" ng-model="detalleUsuario.correo" id="form-correo-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="josesanchez@totalplay.com.mx">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-calendar"></i> Fecha ingreso*</label>
        <div class="input-group">
        	<input readonly type="text" class="datepicker form-control inputFormulario" ng-model="detalleUsuario.fechaIngreso" id="form-fechaIngreso-mod" aria-describedby="basic-addon3" style="height: 34px;">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-mars"></i> Sexo*</label>
        <div class="input-group">
        	<select class="form-control custom-select inputSelectFormulario" id="sexo_select_modificacion" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option value="MASCULINO">Masculino</option>
        		<option value="FEMENINO">Femenino</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4" ng-show="tabInformacionVW_CUADRILLA_mod">
		<label class="span-consulta"><i class="fa fa-building"></i> Cuadrillas</label>
		<div class="dropdown">
			<input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="NO HAY SELECCI&Oacute;N" type="text" id="cuadrilla_select_mod" class="form-control inputFormulario" style="height: 34px; cursor: pointer;" />
		    <ul class="dropdown-menu drop-down-filters" style="background-color: #F5F5F5; padding: 1em !important; width: 80%; border: 1px solid #d7d7d7 !important;">          
		        <div ng-repeat="cuadrillaPadre in listaCuadrillas track by $index">
		        	<label>{{cuadrillaPadre.descripcion}}</label>
		            <li ng-repeat="cuadrillaHija in cuadrillaPadre.cuadrillasHijas" class="element-menu-filter">
		            	<label class="dropdown-item form-check-inputfiltro">
		                	<input id="" ng-click="cuadrillaSeleccionMod(cuadrillaHija)" class="form-check-input" type="radio" ng-model="detalleUsuario.tipoCuadrilla" ng-value="cuadrillaHija.id" ng-checked="detalleUsuario.tipoCuadrilla == cuadrillaHija.id" />
		                    <span for="" class="dropdown-item item-text-filtro" ng-bind="cuadrillaHija.descripcion"></span>
						</label>
					</li>
		            <li ng-if="!$last" class="elemento_menu dropdown-divider"></li>
				</div>
			</ul>
		</div>
    </div>
    <div class="col-md-4" ng-if="tabInformacionVW_ASIG_AUTOMATICA_mod">
		<label class="span-consulta"><i class="fas fa-sync"></i> Asignaci&oacute;n autom&aacute;tica*</label>
        <div class="input-group">
        	<div class="form-check-sm form-check form-switch" style="padding-top: .5rem;">
				<input class="form-check-input form-check-input-sm" type="checkbox" id="form-asignacionAutomatica-mod" ng-model="detalleUsuario.idAsignacionAutomatica" ng-true-value="1" ng-false-value="0" ng-change="cambiarCheckAsignacionAutomaticaMod()" />
				<span class="text-info-regitro" id="checkAsignacionAutomaticaMod">NO</span>
			</div>
        </div>
    </div>
</div>
