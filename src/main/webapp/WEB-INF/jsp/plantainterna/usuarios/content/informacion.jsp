<div class="row contenedorRowForm">
	<div class="col-md-4">
		<label class="span-consulta"><i class="fas fa-address-card"></i> Puesto*</label>
        <div class="input-group">
        	<select class="form-control custom-select inputSelectFormulario" id="puesto_select_registro" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option ng-repeat="puesto in listaPuestos" value="{{puesto.id}}">{{puesto.descripcion}}</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-building"></i> Compa&ntilde;&iacute;a*</label>
        <div class="input-group">
        	<select class="form-control custom-select inputSelectFormulario" id="compania_select_registro" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option ng-repeat="compania in listaCompanias" value="{{compania.id}}">{{compania.descripcion}}</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4">
    	<label class="span-consulta"><i class="fa fa-list-alt"></i> N&uacute;mero de empleado*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.numEmpleado" id="form-num-empleado" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 15015997">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-user"></i> Usuario*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.usuario" id="form-usuario" ng-keyup="quitarEspaciosNombreUsuario('form-usuario')" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. PIRESIDENCIAL">
        </div>
    </div>
    <div class="col-md-4">
    	<label class="span-consulta"><i class="fas fa-lock"></i> Contrase&ntilde;a*</label>
        <div class="">
        	<input type="password" autocomplete="new-password" class="form-control inputFormulario" ng-model="informacionRegistro.contrasena" id="form-pasword" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. ********">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fas fa-lock"></i> Confirmar contrase&ntilde;a*</label>
        <div class="">
        	<input type="password" autocomplete="new-password" class="form-control inputFormulario" ng-model="informacionRegistro.confirContrasena" id="form-confir-password" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. ********">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
    	<label class="span-consulta"><i class="fas fa-user-tie"></i> Nombre(s)*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.nombre" id="form-nombres" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. Jos&eacute; Eduardo">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="far fa-user"></i> Apellido paterno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.apellidoPaterno" id="form-a-paterno" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. S&aacute;nchez">
        </div>
    </div>
    <div class="col-md-4">
    	<label class="span-consulta"><i class="far fa-user"></i> Apellido materno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.apellidoMaterno" id="form-a-materno" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. Luna">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
	<div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-tags"></i> Posici&oacute;n*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.posicion" id="form-posicion" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 15015997">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-id-card"></i> CURP*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.curp" id="form-curp" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. FOBR920509HMSLRY05" maxlength="18" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-id-card"></i> RFC*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.rfc" id="form-rfc" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. SALJ940309U54" maxlength="13" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
	<div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-mobile-phone"></i> Tel&eacute;fono de contacto*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.telefonoContacto" id="form-telefono-contacto" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 5515798000" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="10" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-envelope"></i> Correo electr&oacute;nico*</label>
        <div class="input-group">
        	<input type="email" class="form-control inputFormulario" ng-model="informacionRegistro.correo" id="form-correo" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. josesanchez@totalplay.com.mx">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-calendar"></i> Fecha ingreso*</label>
        <div class="input-group">
        	<input readonly type="text" class="datepicker datepickerNormal form-control inputFormulario" ng-model="informacionRegistro.fechaIngreso" id="form-fechaIngresoRegistro" aria-describedby="basic-addon3" style="height: 34px;">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-mars"></i> Sexo*</label>
        <div class="input-group">
        	<select class="form-control custom-select inputSelectFormulario" id="sexo_select_registro" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option value="MASCULINO">Hombre</option>
        		<option value="FEMENINO">Mujer</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4" ng-if="tabInformacionVW_ASIG_AUTOMATICA">
		<label class="span-consulta"><i class="fas fa-sync"></i> Asignaci&oacute;n autom&aacute;tica*</label>
        <div class="input-group">
        	<div class="form-check-sm form-check form-switch" style="padding-top: .5rem;">
				<input class="form-check-input form-check-input-sm" type="checkbox" id="form-asignacionAutomatica" ng-model="informacionRegistro.asignacionAutomatica" ng-true-value="1" ng-false-value="0" ng-change="cambiarCheckAsignacionAutomatica()" />
				<span class="text-info-regitro" id="checkAsignacionAutomatica">NO</span>
			</div>
        </div>
    </div>
</div>
<div class="row" style="margin-top: 1em; text-align: right;" ng-show="txtExpresionValPassword">
    <div class="col-md-12">
		<div class="message-password-warning">
			<span><i class="fas fa-warning"></i>&nbsp; {{txtExpresionValPassword}}</span>
		</div>
	</div>
</div>