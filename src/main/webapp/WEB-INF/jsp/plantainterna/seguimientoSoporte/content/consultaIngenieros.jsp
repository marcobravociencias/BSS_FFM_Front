<div class="form-content">
    <div class="col-12 row md-form" id="filtros_config">
        <div class="col-2 columna-filtro-ind">
            <label for="filtro_fecha_inicio" class="label-filter"><i class="fa fa-calendar"></i> Fecha
                inicial</label>
            <input readonly type="text" id="filtro_fecha_inicio"
                class="datepicker input-filtro-seguimiento form-control form-control-sm" />
        </div>
        <div class="col-2 columna-filtro-ind">
            <label class="label-filter"><i class="fa fa-calendar"></i> Fecha
                inicial</label>
            <input readonly type="text" id="filtro_fecha_fin"
                class="datepicker input-filtro-seguimiento form-control form-control-sm" />
        </div>
        <div class="col-2 columna-filtro-ind">  
            <label class="label-filter"><i class="fa fa-calendar"></i> Tipo fecha</label>
            <select class="input-filtro-seguimiento form-control form-control-sm" id="tipo_fecha">
                <option value="" disabled>Seleccione...</option>
                <option value="creacion" selected>Creaci&oacute;n</option>
                <option value="cierre">Cierre</option>
            </select>
        </div>

        <div class="col-1">
            <button id="btn_buscar" type="button"
                class="btn btn-sm btn-primary waves-effect waves-light btnSeguimiento"
                ng-click="consultaSeguimiento()">
                <i class="fa fa-search"></i>
        </div>
    </div>
</div>
<div style="padding: 0" class="col-12">
    <div class="table-responsive">
        <table id="seguimientoTable" class="display table " cellspacing="0" width="100%">
            <thead id="thead_seguimiento">
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>#Empleado</th>
                    <th>Usuario</th>
                    <th>Ciudad</th>
                    <th>Acciones</th>
                    <!--No borrar-->
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th> 
                    <th></th> 
                    <!--No borrar-->
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>