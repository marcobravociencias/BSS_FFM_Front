<div class="row col-12 mb-2">
    <div class="col-1 columna-traspaso">
        <label for="idot-tr" class="label-filter">OT</label>
        <input type="text" id="idot-tr" placeholder="Ej: 65434" ng-model="camposFiltroTraspaso.idot"
            ng-change="limpiarCamposFiltroTraspaso(1)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-1 columna-traspaso">
        <label for="idos-tr" class="label-filter">OS</label>
        <input type="text" id="idos-tr" placeholder="Ej: 23214" ng-model="camposFiltroTraspaso.idos"
            ng-change="limpiarCamposFiltroTraspaso(2)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-1 columna-traspaso">
        <label for="cuenta-tr" class="label-filter">Cuenta</label>
        <input type="text" id="cuenta-tr" placeholder="Ej: 009348423" ng-model="camposFiltroTraspaso.cuenta"
            ng-change="limpiarCamposFiltroTraspaso(3)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-1 columna-traspaso columna-filtro-ind">
        <label for="filtro-estatus-substatus-tr" class="label-filter">Estatus <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de estatus"
            ng-show="!filtrosGeneral.estatusdisponiblesTraspaso.length"></i></label>
        <div class="dropdown">
            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text"
                id="filtro-estatus-substatus-tr" class="input-filtro-traspasos form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus-tr">
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusdisponiblesTraspaso)" id="todo_filtro"
                        type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusdisponiblesTraspaso)"
                        id="ninguno_filtro" type="button"
                        class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtro in filtrosGeneral.estatusdisponiblesTraspaso" class="element-menu-filter"
                    class="element-menu-filter">
                    <label class="dropdown-item form-check-inputfiltro">
                        <input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusdisponiblesTraspaso)
                            id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                            ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                        <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                            ng-bind="filtro.nombre"></span>
                    </label>
                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                        ng-include="'filtroEstatusTraspaso.html'" class="dropdown-menu"></ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="col-2 columna-traspaso columna-filtro-ind">
        <label for="filtro-intervencion-tr"
            class="label-filter">Intervenci&oacute;n <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de intervenciones"
            ng-show="!filtrosGeneral.tipoOrdenesTraspaso.length"></i></label>
        <div class="dropdown">
            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text"
                id="filtro-intervencion-tr" class="input-filtro-traspasos form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion-tr">
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.tipoOrdenesTraspaso)" id="todo_filtro"
                        type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.tipoOrdenesTraspaso)" id="ninguno_filtro"
                        type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtro in filtrosGeneral.tipoOrdenesTraspaso" class="element-menu-filter"
                    class="element-menu-filter">
                    <label class="dropdown-item form-check-inputfiltro">
                        <input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.tipoOrdenesTraspaso)
                            id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                            ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                        <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                            ng-bind="filtro.nombre"></span>
                    </label>
                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                        ng-include="'filtroIntervencionTraspaso.html'" class="dropdown-menu"></ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="col-2 columna-traspaso columna-filtro-ind">
        <label for="cluster" class="label-filter">Geograf&iacute;a <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia"
            ng-show="!listadogeografiacopy.length"></i></label>
        <input readonly placeholder="Seleccione..." type="text" id="clusterTr" ng-click="abrirModalClusterTraspaso()"
            class="input-filtro-traspasos form-control form-control-sm">
    </div>
    <div class="col-1 columna-traspaso columna-filtro-ind">
        <label for="filtro_fecha_inicio_traspaso" class="label-filter">Fecha inicial</label>
        <input readonly type="text" id="filtro_fecha_inicio_traspaso" placeholder="Fecha inicial"
            class="datepicker input-filtro-traspasos form-control form-control-sm" />
    </div>
    <div class="col-1 columna-traspaso columna-filtro-ind">
        <label for="filtro_fecha_fin_traspaso" class="label-filter">Fecha final</label>
        <input readonly placeholder="Fecha final" type="text" id="filtro_fecha_fin_traspaso"
            class="datepicker input-filtro-traspasos form-control form-control-sm" />
    </div>
    <div class="col-1">
        <button id="btn_consultar" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light"
            ng-click="consultaTraspasos()">
            <i class="fa fa-search"></i>
        </button>
    </div>
    <div id="" class="col-1" style="margin-top: 23px; width: 20px !important;" ng-if="configPermisoAccionDescargaTraspasosRep">
        <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer"
            ng-click="descargarReporteTraspasos()">
    </div>
</div>
<div class="content-fluid">
    <div class="table-responsive">
        <table id="traspasosTable" class="display table" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th data-idColumn="0" data-isNumber="true" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">OT</th>
                    <th data-idColumn="1" data-isNumber="true" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">OT original</th>
                    <th data-idColumn="2" data-isNumber="true" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">OS</th>
                    <th data-idColumn="3" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Cliente</th>
                    <th data-idColumn="4" data-isNumber="true" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Cuenta</th>
                    <th data-idColumn="5" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Geograf&iacute;a</th>
                    <th data-idColumn="6" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Fecha agenda</th>
                    <th data-idColumn="7" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Tipo</th>
                    <th data-idColumn="8" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Subtipo</th>
                    <th data-idColumn="9" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Estatus</th>
                    <th data-idColumn="10" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Estado</th>
                    <th data-idColumn="11" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Motivo</th>
                    <th data-idColumn="12" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Motivo transferencia</th>
                    <th style="text-align: center;">Evidencia</th>
                    <th style="text-align: center;">Detalle</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>