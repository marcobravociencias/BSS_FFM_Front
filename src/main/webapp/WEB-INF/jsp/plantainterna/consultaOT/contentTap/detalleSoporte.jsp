<div ng-if="detalleSoporteList.length == 0" style="text-align: center; margin-top: 2em;">
    <span style="font-size: 12px !important;color:grey; font-weight: lighter;" class="timeline__day">
        <span class="timeline__month">
            <i class="fa fa-exclamation-circle warning-nodata"></i>
        </span>
        NO SE ENCONTR&Oacute; INFORMACI&Oacute;N
    </span>
</div>
<div id="tabsContainer" class="rowTabs" ng-if="detalleSoporteList.length > 0">
    <div id="left-arrow" class="buttonLeftArrow" style="display: none;">
        <i class="fas fa-chevron-left" style="cursor: pointer" onclick="desplazarIzquierdaTabs()"></i>
    </div>
    <div id="containerTabsSoporte" class="pl-0 pr-0 custom-slider-main row" style="width: 100%;">
        <ul class="nav nav-tabs tabHeader" id="myTab" role="tablist">
            <li class="nav-item" style="display: inline-block" ng-repeat="item in detalleSoporteList">
                <a ng-class="{{$index}} == 0 ? 'nav-link active' : 'nav-link'" id="opcion-tab-{{$index + 1}}" data-toggle="tab" data-target="#opcion-{{$index + 1}}" role="tab"
                    aria-controls="opcion-consulta" aria-selected="true">Soporte {{$index + 1}}</a>
            </li>
        </ul>
    </div>
    <div id="right-arrow" class="buttonRightArrow" style="display: none;">
        &nbsp;
        <i class="fas fa-chevron-right" style="cursor: pointer" onclick="desplazarDerechaTabs()"></i>
    </div>
</div>
<div class="tab-content" id="v-pills-tabContent" ng-if="detalleSoporteList.length" style="margin-top: 1em;">
    <div ng-repeat="item in detalleSoporteList" ng-class="{{$index}} == 0 ? 'tab-pane fade show active' : 'tab-pane fade'" id="opcion-{{$index + 1}}" role="tabpanel" aria-labelledby="opcion-tab-{{$index + 1}}">
        <div class="row">
            <div class="col-6">
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-vehiculo">N&uacute;mero empleado</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-vehiculo" ng-bind="item.numEmpleado || 'Sin Informaci&oacute;n'"></span> 
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-vehiculo">Nombre</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-vehiculo" ng-bind="item.nombre || 'Sin Informaci&oacute;n'"></span> 
                    </div>
                </div>
                
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-vehiculo">Clave cliente</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-vehiculo" ng-bind="item.claveCliente || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-vehiculo">Fecha registro</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-vehiculo" ng-bind="item.fechaRegistro || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-vehiculo">Descripci&oacute;n falla</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-vehiculo" ng-bind="item.descripcionFalla || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-vehiculo">Descripci&oacute;n causa falla</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-vehiculo" ng-bind="item.descripcionCausaFalla || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-vehiculo">Descripci&oacute;n soluci&oacute;n</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-vehiculo" ng-bind="item.descripcionSolucion || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-tile-vehiculo">Comentarios</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-vehiculo" ng-bind="item.comentarios || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="col-12 pl-0">
            <ul class="nav nav-tabs" id="tabEquiposSoporte" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="opcion-tab-equipoNuevo{{$index}}" data-toggle="tab" data-target='#tabEquipoNuevo{{$index}}' role="tab" aria-controls="tabEquipoNuevo{{$index}}" aria-selected="true" style="display: none;">Equipo Nuevo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="opcion-tab-equipoViejo{{$index}}" data-toggle="tab" data-target='#tabEquipoViejo{{$index}}' role="tab" aria-controls="#tabEquipoViejo{{$index}}" aria-selected="true" style="display: none;">Equipo Viejo</a>
                </li>
            </ul>
        </div>
        <div class="col-12">
            <div class="tab-content" id="tabContentEquiposSoporte" style="margin-top: 1em;">
                <div class="tab-pane fade show active" id="tabEquipoNuevo{{$index}}" role="tabpanel" aria-labelledby="tabEquipoNuevo">
                    <table id="tablaEquipoNuevo{{$index}}" style="width:100%">
                        <thead id="headerT">
                            <tr><th></th></tr>
                        </thead>
                        <tbody id="mostrarEquipoNuevo{{$index}}">
                        </tbody>
                    </table>
                </div>
                <div class="tab-pane fade" id="tabEquipoViejo{{$index}}" role="tabpanel" aria-labelledby="tabEquipoViejo">
                    <table id="tablaEquipoViejo{{$index}}" style="width:100%">
                        <thead id="headerT">
                            <tr><th></th></tr>
                        </thead>
                        <tbody id="mostrarEquipoViejo{{$index}}">
                        </tbody>
                    </table>
                </div>
            </div>
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