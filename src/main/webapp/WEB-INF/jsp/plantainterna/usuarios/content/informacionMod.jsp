<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fas fa-address-card"></i> Puesto*</label>
        <div class="input-group">
        	<select id="puesto_select_modificacion" class="selectpicker select_consulta selecRegistro" disabled readonly>	
            </select>
        </div>
    </div>
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="fa fa-building"></i> Compa&ntilde;ia*</label>
        <div class="input-group">
        	<select id="compania_select_modificacion" class="selectpicker select_consulta selecRegistro" disabled readonly>	
            </select>
        </div>
    </div>
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="fa fa-list-alt"></i> # Empleado*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.numeroEmpleado" id="form-num-empleado" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 15015997">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-tags"></i> Posici&oacute;n*</label>
        <div class="">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.posicion" id="form-posicion" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 15015997">
        </div>
    </div>
</div>
<hr/>
<div class="row contenedorRowForm">
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="fa fa-user"></i> Nombre(s)*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.nombre" id="form-nombres" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. Jos&eacute; Eduardo">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="far fa-user"></i> Apellido paterno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.apellidoPaterno" id="form-a-paterno" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. S&aacute;nchez">
        </div>
    </div>
    <div class="col-md-4">
    	<label class="text-info-regitro"><i class="far fa-user"></i> Apellido materno*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.apellidoMaterno" id="form-a-materno" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. Luna">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-id-card"></i> RFC*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.rfc" id="form-rfc" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. SALJ940309U54">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-phone"></i> Tel&eacute;fono*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.telefono" id="form-telefono" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 5515798000">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-mobile-phone"></i> Tel&eacute;fono de Contacto*</label>
        <div class="input-group">
        	<input type="text" class="form-control inputFormulario" ng-model="detalleUsuario.telefonoContacto" id="form-telefono-contacto" aria-describedby="basic-addon3" style="height: 34px;" placeholder="Ej. 5515798000">
        </div>
    </div>
</div>
<div class="row contenedorRowForm">
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-envelope"></i> Correo Electr&oacute;nico*</label>
        <div class="input-group">
        	<input type="email" class="form-control inputFormulario" ng-model="detalleUsuario.correo" id="form-correo" aria-describedby="basic-addon3" style="height: 34px;" placeholder="josesanchez@totalplay.com.mx">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-calendar"></i> Fecha Ingreso*</label>
        <div class="input-group">
        	<input type="date" class="form-control inputFormulario" ng-model="detalleUsuario.fechaIngresoMod" id="form-fechaIngresoRegistro-mod" aria-describedby="basic-addon3" style="height: 34px;">
        </div>
    </div>
    <div class="col-md-4">
		<label class="text-info-regitro"><i class="fa fa-mars"></i> Sexo*</label>
        <div class="input-group">
        	<select class="form-control inputFormulario" id="sexo_select_registro_mod" aria-describedby="basic-addon3" style="height: 34px;">
        		<option disabled selected>NO HAY SELECCI&Oacute;N</option>
        		<option>Hombre</option>
        		<option>Mujer</option>
        	</select>
        </div>
    </div>
</div>
