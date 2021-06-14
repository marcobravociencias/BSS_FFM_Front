<div class="row">
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-user-circle-o"></i> Puesto*</label>
            </div>
            <div class="col-8">
                <select id="puesto_select_registro" class="selectpicker select_consulta" >	
                </select>
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-building"></i> Compa&ntilde;ia*</label>
            </div>
            <div class="col-8">
                <select id="compania_select_registro" class="selectpicker select_consulta" >	
                </select>
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-list-alt"></i> # Empleado*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.numEmpleado" id="form-num-empleado" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-tags"></i> Posici&oacute;n*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.posicion" id="form-ciudad" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-unlock-alt"></i> Password*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.contrasena" id="form-pasword" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-unlock-alt"></i> Confirmar Password*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.confirContrasena" id="form-confir-password" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
</div>
<hr/>
<div class="row">
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-user"></i> Nombre(s)*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.nombre" id="form-nombres" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-user-o"></i> Apellido paterno*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.apellidoPaterno" id="form-a-paterno" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-user-o"></i> Apellido materno*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.apellidoMaterno" id="form-a-materno" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-id-card"></i> RFC*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.rfc" id="form-rfc" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-phone"></i> Tel&eacute;fono*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.telefono" id="form-telefono" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-mobile-phone"></i> Tel&eacute;fono de Contacto*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.telefonoContacto" id="form-telefono-contacto" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-envelope"></i> Correo Electr&oacute;nico*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.correo" id="correo" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-calendar"></i> Fecha Ingreso*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="informacionRegistro.fechaIngreso" id="fechaIngresoRegistro" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-mars"></i> Sexo*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" id="sexo" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
</div>
