<div class="container-fluid" ng-show="isContentDisponibilidadv2">
    <div class="col-12">
        <i class="fa fa-times icon-exit-disponibillidadv2" ng-click="showDisponibilidadv2()"></i>
    </div>
    <div class="row" id="filtros_config_dispv2">
        <div class="col-2 column-style-dispv2 columna-filtro-ind_dispv2">
            <i class="icono-noseleccion_dispv2 fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i>
            <label for="textGeografiaDispo" class="label-filter-dispv2">Geograf&iacute;a</label>
            <input readonly placeholder="Seleccione..." type="text" id="textGeografiaDispov2" ng-click="abrirModalGeografiaDisponibilidadV2()" class="input-filtro-dispv2 form-control form-control-sm">
        </div>
        <div class="col-2  columna-filtro-ind_dispv2" style="width: 110px; padding-right: 0px !important;">
            <label for="filtro_fecha_inicio_disponibilidadv2" class="label-filter-dispv2">Fecha inicial</label>
            <input readonly type="text" id="filtro_fecha_inicio_disponibilidadv2" class="datepicker input-filtro-dispv2 form-control form-control-sm" style="width: 100px;" />
        </div>
        <div class="col-2  columna-filtro-ind_dispv2" style="width: 110px; padding-right: 0px !important;">
            <label for="filtro_fecha_fin_disponibilidadv2" class="label-filter-dispv2">Fecha final</label>
            <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_disponibilidadv2" class="datepicker input-filtro-dispv2 form-control form-control-sm" style="width: 100px;" />
        </div>
        <div class="col-1 div-btn-busqueda-dispv2" style="width: 65px;">					
            <label class="label-filter-dispv2"></label>
            <i class="icono-noseleccion_dispv2 fas fa-exclamation-circle" title="El Cat&aacute;logo de Turnos no est&aacute; disponible" ng-show="banderaErrorTurnos" style="margin-top: 0.5em; float: right; font-size: .8em;"></i>
            <button id="btn_consultarDisponibilidadv2" type="button" class="btn btn-sm  btn-primary waves-effect waves-light" ng-click="consultarDisponibilidadV2()">
                <i class="fa fa-search"></i>
            </button>
        </div>	
        <div class="col-1 column-style-dispv2" ng-if="isPermisoDescargaDisponibilidadv2" style="margin-top: 23px; width: 20px !important;">
            <a ng-click="generarReporteDisponibilidadv2()">
                <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer">
            </a>
        </div>
    </div>
</div>
<div class="container-fluid pl-0 pr-0 mr-0 ml-0">
    <div class="content-fluid container-fluid pl-0 pr-0 mr-0 ml-0">
        <div class="col-12 contenedor_consulta_disponibilidadv2">
            <div class="row">
                <div class="col-3" id="divIntervencionesDispv2">
                    <table id="tableIntervenciones" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_table_intervenciones">
                            <tr>
                                <th>
                                    INTERVENCI&Oacute;N
                                    <span id="iconFiltroIntervenciones" class="fa fa-filter pull-right" aria-hidden="true" ng-click="filtrarIntervencionesDisponibilidadV2()"></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-if="mostrarColumnaNoIntervenciones == 0">
                                <td class="text-center">NO HAY INTERVENCIONES</td>
                            </tr>
                            <tr ng-repeat="intervencion in listaIntervencionesDispV2" ng-if="intervencion.isVisible">
                                <td ng-bind="intervencion.nombre"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-9 pl-0" id="divConsultaDisponibilidadv2" style="display:none; overflow-x: auto; max-width: 101em; transform: rotateX(180deg);">
                    <div class="col-12 pl-0">
                        <div id="container-table-disponibilidadv2" style="display: flex; transform: rotateX(180deg);">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>