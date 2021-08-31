<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fas fa-address-card"></i> Puesto*</label>
        <div class="input-group">
        	<select id="puesto_select_registro" class="selectpicker select_consulta selecRegistro" >	
            </select>
        </div>
    </div>
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="fa fa-building"></i> Compa&ntilde;ia*</label>
        <div class="input-group">
        	<select id="compania_select_registro" class="selectpicker select_consulta selecRegistro" >	
            </select>
        </div>
    </div>
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="fa fa-list-alt"></i> # Empleado*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.numEmpleado" id="form-num-empleado" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-tags"></i> Posici&oacute;n*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.posicion" id="form-ciudad" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="fa fa-unlock-alt"></i> Password*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.contrasena" id="form-pasword" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-unlock-alt"></i> Confirmar Password*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.confirContrasena" id="form-confir-password" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
</div>
<hr/>
<div class="row contenedorRowForm">
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="fa fa-user"></i> Nombre(s)*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.nombre" id="form-nombres" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="far fa-user"></i> Apellido paterno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.apellidoPaterno" id="form-a-paterno" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="far fa-user"></i> Apellido materno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.apellidoMaterno" id="form-a-materno" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-id-card"></i> RFC*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.rfc" id="form-rfc" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-phone"></i> Tel&eacute;fono*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.telefono" id="form-telefono" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-mobile-phone"></i> Tel&eacute;fono de Contacto*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.telefonoContacto" id="form-telefono-contacto" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-envelope"></i> Correo Electr&oacute;nico*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="informacionRegistro.correo" id="correo" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-calendar"></i> Fecha Ingreso*</label>
        <div class="input-group">
        	<input type="date" class="form-control inputFormulario" ng-model="informacionRegistro.fechaIngreso" id="fechaIngresoRegistro" aria-describedby="basic-addon3" style="height: 40px;">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-mars"></i> Sexo*</label>
        <div class="input-group">
        	<select class="form-control inputFormulario" id="sexo" aria-describedby="basic-addon3" style="height: 40px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option>Hombre</option>
        		<option>Mujer</option>
        	</select>
        </div>
    </div>
</div>
