<div class="row contenedorRowForm">
	<div class="col-md-4">
		<label class="span-consulta"><i class="fas fa-address-card"></i> Puesto*</label>
        <div class="input-group">
        	<select class="form-control inputFormulario" id="puesto_select_modificacion" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option ng-repeat="puesto in listaPuestos" value="{{puesto.id}}">{{puesto.descripcion}}</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-building"></i> Compa&ntilde;ia*</label>
        <div class="input-group">
        	<select class="form-control inputFormulario" id="compania_select_modificacion" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option ng-repeat="compania in listaCompanias" value="{{compania.id}}">{{compania.descripcion}}</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4">
    	<label class="span-consulta"><i class="fa fa-list-alt"></i> Número de empleado*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.numeroEmpleado" id="form-num-empleado-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 15015997">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-user"></i> Usuario*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.usuario" id="form-usuario-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. PIRESIDENCIAL">
        </div>
    </div>
    <div class="col-md-4">
    	<label class="span-consulta"><i class="fas fa-lock"></i> Password*</label>
        <div class="">
        	<input type="password" class="form-control inputFormulario" ng-model="detalleUsuario.contrasena" id="form-pasword-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. ********">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fas fa-lock"></i> Confirmar password*</label>
        <div class="">
        	<input type="password" class="form-control inputFormulario" ng-model="detalleUsuario.confirContrasena" id="form-confir-password-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. ********">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
    	<label class="span-consulta"><i class="fas fa-user-tie"></i> Nombre(s)*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.nombre" id="form-nombres-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. Jos&eacute; Eduardo">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="far fa-user"></i> Apellido paterno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.apellidoPaterno" id="form-a-paterno-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. S&aacute;nchez">
        </div>
    </div>
    <div class="col-md-4">
    	<label class="span-consulta"><i class="far fa-user"></i> Apellido materno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.apellidoMaterno" id="form-a-materno-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. Luna">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
	<div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-tags"></i> Posici&oacute;n*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.posicion" id="form-posicion-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 15015997">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-id-card"></i> CURP*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.curp" id="form-curp-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. FOBR920509HMSLRY05">
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-id-card"></i> RFC*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.rfc" id="form-rfc-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. SALJ940309U54">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
	<div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-mobile-phone"></i> Tel&eacute;fono de contacto*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.telefonoContacto" id="form-telefono-contacto-mod" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 5515798000">
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
        	<input type="date" class="form-control inputFormulario" ng-model="detalleUsuario.fechaIngreso" id="form-fechaIngresoRegistro-mod" aria-describedby="basic-addon3" style="height: 34px;">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="span-consulta"><i class="fa fa-mars"></i> Sexo*</label>
        <div class="input-group">
        	<select class="form-control inputFormulario" id="sexo_select_modificacion" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option value="MASCULINO">Hombre</option>
        		<option value="FEMENINO">Mujer</option>
        	</select>
        </div>
    </div>
    <div class="col-md-4">
		<label class="span-consulta"><i class="fas fa-sync"></i> Asignaci&oacute;n autom&aacute;tica*</label>
        <div class="input-group">
        	<div class="form-check-sm form-check form-switch" style="padding-top: .5rem;">
				<input class="form-check-input form-check-input-sm" type="checkbox" id="form-asignacionAutomatica-mod" ng-model="detalleUsuario.asignacionAutomatica" ng-true-value="1" ng-false-value="0" ng-change="cambiarCheckAsignacionAutomatica()" />
				<span class="text-info-regitro" id="checkAsignacionAutomatica">NO</span>
			</div>
        </div>
    </div>
</div>
