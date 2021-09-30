<div class="row">
    <div class="col-6">
        <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OT</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.idOrden}}" ng-bind="detalleSoporteObj.idOrden || 'Sin dato'"></span> </div>
        </div>
        <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cliente</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.nombreUsuario}}" ng-bind="detalleSoporteObj.nombreUsuario || 'Sin dato'"></span> </div>
        </div>
        <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cuenta</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.numeroCuenta}}" ng-bind="detalleSoporteObj.numeroCuenta || 'Sin dato'"></span> </div>
        </div>
        
   
    </div>
    <div class="col-6">
        <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Latitud</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.latitud}}" ng-bind="detalleSoporteObj.latitud || 'Sin dato'"></span> </div>
        </div>
        <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Longitud</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.longitud}}" ng-bind="detalleSoporteObj.longitud || 'Sin dato'"></span> </div>
        </div>
        <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Falla</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.descripcionFalla}}" ng-bind="detalleSoporteObj.descripcionFalla || 'Sin dato'"></span> </div>
        </div>
        <div class="container-fluid vehiculo-content">
            <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Comentarios</span></div>
            <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.comentarios}}" ng-bind="detalleSoporteObj.comentarios || 'Sin dato'"></span> </div>
        </div>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-6">
            <div class="container-fluid vehiculo-content">
                <h5>Equipo viejo</h5>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">N&uacute;mero serie</span></div>
                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.equipoViejo.numSerie}}" ng-bind="detalleSoporteObj.equipoViejo.numSerie || 'Sin dato'"></span> </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Descripci&oacute;n</span></div>
                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.equipoViejo.descripcion}}" ng-bind="detalleSoporteObj.equipoViejo.descripcion || 'Sin dato'"></span> </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <img src="{{evidenciaDetalleEquipoV}}" class="img-fluid shadow-2-strong" style="width: 225px;" alt=""/>
            </div>
    </div>
    <div class="col-6">
            <div class="container-fluid vehiculo-content">
                <h5>Equipo nuevo</h5>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">N&uacute;mero serie</span></div>
                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.equipoNuevo.numSerie}}" ng-bind="detalleSoporteObj.equipoViejo.numSerie || 'Sin dato'"></span> </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Descripci&oacute;n</span></div>
                <div class="container-text-content-detalle"><span class="text-content-vehiculo" title="{{detalleSoporteObj.equipoNuevo.descripcion}}" ng-bind="detalleSoporteObj.equipoViejo.descripcion || 'Sin dato'"></span> </div>
            </div>
            <div class="container-fluid vehiculo-content">
                <img src="{{evidenciaDetalleEquipoN}}" class="img-fluid shadow-2-strong" style="width: 225px;" alt=""/>
            </div>
    </div>
</div>