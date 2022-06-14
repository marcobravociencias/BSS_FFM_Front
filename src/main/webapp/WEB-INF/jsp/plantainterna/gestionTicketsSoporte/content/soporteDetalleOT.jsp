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
        <ul class="nav nav-tabs tabHeader" id="myTabSoporteDetalle" role="tablist">
            <li class="nav-item" style="display: inline-block" ng-repeat="item in detalleSoporteList">
                <a ng-class="{{$index}} == 0 ? 'nav-link active' : 'nav-link'" id="opcion-tab-{{$index + 1}}" data-toggle="tab" href="#opcion-{{$index + 1}}" role="tab"
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
                        <span class="text-title-detalle-ot">N&uacute;mero empleado</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-detalle-ot" title="{{item.numEmpleado || 'Sin Informaci&oacute;n'}}" ng-bind="item.numEmpleado || 'Sin Informaci&oacute;n'"></span> 
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-title-detalle-ot">Nombre</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-detalle-ot" title="{{item.nombre || 'Sin Informaci&oacute;n'}}" ng-bind="item.nombre || 'Sin Informaci&oacute;n'"></span> 
                    </div>
                </div>
                
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-title-detalle-ot">Clave cliente</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-detalle-ot" title="{{item.claveCliente || 'Sin Informaci&oacute;n'}}" ng-bind="item.claveCliente || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-title-detalle-ot">Fecha registro</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-detalle-ot" title="{{item.fechaRegistro || 'Sin Informaci&oacute;n'}}" ng-bind="item.fechaRegistro || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-title-detalle-ot">Descripci&oacute;n falla</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-detalle-ot" title="{{item.descripcionFalla || 'Sin Informaci&oacute;n'}}" ng-bind="item.descripcionFalla || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-title-detalle-ot">Descripci&oacute;n causa falla</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-detalle-ot" title="{{item.descripcionCausaFalla || 'Sin Informaci&oacute;n'}}" ng-bind="item.descripcionCausaFalla || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-title-detalle-ot">Descripci&oacute;n soluci&oacute;n</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-detalle-ot" title="{{item.descripcionSolucion || 'Sin Informaci&oacute;n'}}" ng-bind="item.descripcionSolucion || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle">
                        <span class="text-title-detalle-ot">Comentarios</span>
                    </div>
                    <div class="container-text-content-detalle">
                        <span class="text-content-detalle-ot" title="{{item.comentarios || 'Sin Informaci&oacute;n'}}" ng-bind="item.comentarios || 'Sin Informaci&oacute;n'"></span>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <table id="tablaOTDetalle{{$index}}" style="width:100%">
                <thead id="headerT">
                    <tr><th></th></tr>
                </thead>
                <tbody id="mostrarOTDetalle{{$index}}">
                </tbody>
            </table>
        </div>
    </div>
</div>