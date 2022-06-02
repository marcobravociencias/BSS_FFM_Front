<div class="row col-12 mb-2">
    <div class="col-1 columna-traspaso">
        <label for="idot" class="label-filter">OT</label>
        <input type="text" id="idot" placeholder="Ej: 65434" ng-model="camposFiltro.idot"
            ng-change="limpiarCamposFiltro(1)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-1 columna-traspaso">
        <label for="idos" class="label-filter">OS</label>
        <input type="text" id="idos" placeholder="Ej: 23214" ng-model="camposFiltro.idos"
            ng-change="limpiarCamposFiltro(2)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-1 columna-traspaso">
        <label for="cuenta" class="label-filter">Cuenta</label>
        <input type="text" id="cuenta" placeholder="Ej: 009348423" ng-model="camposFiltro.cuenta"
            ng-change="limpiarCamposFiltro(3)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-1 columna-traspaso columna-filtro-ind">
        <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de estatus"
            ng-show="!filtrosGeneral.estatusdisponibles.length"></i><label for="filtro-estatus-substatus" class="label-filter">Estatus</label>
        <div class="dropdown">
            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text"
                id="filtro-estatus-substatus" class="input-filtro-traspasos form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-substatus">
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles)" id="todo_filtro"
                        type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles)"
                        id="ninguno_filtro" type="button"
                        class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtro in filtrosGeneral.estatusdisponibles " class="element-menu-filter"
                    class="element-menu-filter">
                    <label class="dropdown-item form-check-inputfiltro">
                        <input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusdisponibles)
                            id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                            ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                        <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                            ng-bind="filtro.nombre"></span>
                    </label>
                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                        ng-include="'filtroEstatusOts.html'" class="dropdown-menu"></ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="col-2 columna-traspaso columna-filtro-ind">
        <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de intervenciones"
            ng-show="!filtrosGeneral.tipoOrdenes.length"></i><label for="filtro-intervencion"
            class="label-filter">Intervenci&oacute;n</label>
        <div class="dropdown">
            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Seleccione..." type="text"
                id="filtro-intervencion" class="input-filtro-traspasos form-control form-control-sm" />
            <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">
                <li style="text-align: center;">
                    <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes)" id="todo_filtro"
                        type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                    <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes)" id="ninguno_filtro"
                        type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                </li>
                <li class="elemento_menu dropdown-divider"></li>
                <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"
                    class="element-menu-filter">
                    <label class="dropdown-item form-check-inputfiltro">
                        <input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.tipoOrdenes)
                            id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                            ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                        <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                            ng-bind="filtro.nombre"></span>
                    </label>
                    <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                        ng-include="'filtroIntervencionOts.html'" class="dropdown-menu"></ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="col-2 columna-traspaso columna-filtro-ind">
        <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia"
            ng-show="!listadogeografiacopy.length"></i><label for="cluster" class="label-filter">Geograf&iacute;a</label>
        <input readonly placeholder="Seleccione..." type="text" id="cluster" ng-click="abrirModalCluster()"
            class="input-filtro-traspasos form-control form-control-sm">
    </div>
    <div class="col-1 columna-traspaso columna-filtro-ind">
        <label for="filtro_fecha_inicio_otsTaspaso" class="label-filter">Fecha inicial</label>
        <input readonly type="text" id="filtro_fecha_inicio_otsTaspaso" placeholder="Fecha inicial"
            class="datepicker input-filtro-traspasos form-control form-control-sm" />
    </div>
    <div class="col-1 columna-traspaso columna-filtro-ind">
        <label for="filtro_fecha_fin_otsTaspaso" class="label-filter">Fecha final</label>
        <input readonly placeholder="Fecha final" type="text" id="filtro_fecha_fin_otsTaspaso"
            class="datepicker input-filtro-traspasos form-control form-control-sm" />
    </div>
    <div class="col-1">
        <button id="btn_consultar" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light"
            ng-click="consultaOtsTraspasos()">
            <i class="fa fa-search"></i>
        </button>
    </div>
    <div id="" class="col-1" style="margin-top: 23px; width: 20px !important;" ng-if="configPermisoAccionDescargaOtsRep">
        <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer"
            ng-click="descargarReporteOts()">
    </div>
</div>
<div class="content-fluid">
    <div class="table-responsive">
        <table id="otsTable" class="display table" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>OT</th>
                    <th>Cliente</th>
                    <th>Cuenta</th>
                    <th>Ciudad</th>
                    <th>Fecha agenda</th>
                    <th>Tipo</th>
                    <th>Subtipo</th>
                    <th>Estatus</th>
                    <th>Estado</th>
                    <th>Motivo</th>
                    <th style="text-align: center;">Evidencia</th>
                    <th style="text-align: center;">Detalle</th>
                    <th style="text-align: center;">Traspaso</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>