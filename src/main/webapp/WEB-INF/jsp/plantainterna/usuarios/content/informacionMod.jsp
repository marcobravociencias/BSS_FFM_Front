<div class="row">
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-user-circle-o"></i> Puesto*</label>
            </div>
            <div class="col-8">
                <select id="puesto_select_modificacion" class="selectpicker select_consulta" disabled readonly>	
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
                <select id="compania_select_modificacion" class="selectpicker select_consulta" disabled readonly>	
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
                <span ng-bind="detalleUsuario.numeroEmpleado"></span>
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
                <input type="text" class="form-control" ng-model="detalleUsuario.posicion" id="form-ciudad-mod" aria-describedby="basic-addon3">
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
                <input type="text" class="form-control" ng-model="detalleUsuario.nombre" id="form-nombres-mod" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-user-o"></i> Apellido paterno*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="detalleUsuario.apellidoPaterno" id="form-a-paterno-mod" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-user-o"></i> Apellido materno*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="detalleUsuario.apellidoMaterno" id="form-a-materno-mod" aria-describedby="basic-addon3">
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
                <input type="text" class="form-control" ng-model="detalleUsuario.rfc" id="form-rfc-mod" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-phone"></i> Tel&eacute;fono*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="detalleUsuario.telefono" id="form-telefono-mod" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-mobile-phone"></i> Tel&eacute;fono de Contacto*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="detalleUsuario.telefonoContacto" id="form-telefono-contacto-mod" aria-describedby="basic-addon3">
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
                <input type="text" class="form-control" ng-model="detalleUsuario.correo" id="correo-mod" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-calendar"></i> Fecha Ingreso*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" ng-model="detalleUsuario.fechaIngreso" id="fechaIngresoRegistro-mod" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
    <div class="col-4">
        <div class="row">
            <div class="col-4">
                <label class="text-info-regitro"><i class="fa fa-mars"></i> Sexo*</label>
            </div>
            <div class="col-8">
                <input type="text" class="form-control" id="sexo-mod" aria-describedby="basic-addon3">
            </div>
        </div>
    </div>
</div>
