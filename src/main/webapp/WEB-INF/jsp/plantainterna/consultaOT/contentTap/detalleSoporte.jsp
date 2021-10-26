<div ng-if="!detalleSoporteList.length" style="text-align: center; margin-top: 2em;">
    <span style="font-size: 12px !important;color:grey; font-weight: lighter;" class="timeline__day">
        <span class="timeline__month">
            <i class="fa fa-exclamation-circle warning-nodata"></i>
        </span>
        NO SE ENCONTR&Oacute; INFORMACI&Oacute;N
    </span>
</div>

<ul class="nav nav-tabs" id="myTab" role="tablist" ng-if="detalleSoporteList.length">
    <li class="nav-item" ng-repeat="item in detalleSoporteList">
        <a ng-class="{{$index}} == 0 ? 'nav-link active' : 'nav-link'" id="opcion-tab-{{$index + 1}}" data-toggle="tab" href="#opcion-{{$index + 1}}" role="tab"
            aria-controls="opcion-consulta" aria-selected="true">Soporte {{$index + 1}}</a>
    </li>
</ul>

<div class="tab-content" id="v-pills-tabContent" ng-if="detalleSoporteList.length">
    <div ng-repeat="item in detalleSoporteList" ng-class="{{$index}} == 0 ? 'tab-pane fade show active' : 'tab-pane fade'" id="opcion-{{$index + 1}}" role="tabpanel" aria-labelledby="opcion-tab-{{$index + 1}}">
        <div class="row">
            <div class="col-6">
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">N&uacute;mero empleado</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo" ng-bind="item.numEmpleado || 'Sin dato'"></span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Nombre</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo" ng-bind="item.nombre || 'Sin dato'"></span> </div>
                </div>
                
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Clave cliente</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo" ng-bind="item.claveCliente || 'Sin dato'"></span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Fecha registro</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo" ng-bind="item.fechaRegistro || 'Sin dato'"></span> </div>
                </div>
            </div>
            <div class="col-6">
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Descripci&oacute;n falla</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo" ng-bind="item.descripcionFalla || 'Sin dato'"></span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Descripci&oacute;n causa falla</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo" ng-bind="item.descripcionCausaFalla || 'Sin dato'"></span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Descripci&oacute;n soluci&oacute;n</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo" ng-bind="item.descripcionSolucion || 'Sin dato'"></span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Comentarios</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo" ng-bind="item.comentarios || 'Sin dato'"></span> </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <table id="tablaOTDetalle{{item.idFalla}}" style="width:100%">
                <thead id="headerT">
                    <tr><th></th></tr>
                </thead>
                <tbody id="mostrarOTDetalle{{item.idFalla}}">
                </tbody>
            </table>
        </div>
    </div>
</div>



<!-- <div class="row">
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
</div> -->