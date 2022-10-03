<div class="container-fluid container-tab p-0">
    <div class="container-filtros pl-2">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-1 column-style-consulta">
                <label class="label-filter">Oportunidad</label>
                <input type="text" placeholder="Oportunidad" id="idot-implementados" autocomplete="off"
                    ng-model="implementadosEim.oportunidad" ng-change="implementadosEim.eim = ''"
                    ng-keypress="implementadosEim.csp = ''" class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 column-style-consulta">
                <label class="label-filter">EIM</label>
                <input type="text" placeholder="EIM" id="eim-implementados" autocomplete="off"
                    ng-model="implementadosEim.eim" ng-change="implementadosEim.oportunidad = ''"
                    ng-keypress="implementadosEim.csp = ''" class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 column-style-consulta">
                <label class="label-filter">CSP</label>
                <input type="text" placeholder="CSP" id="idos-implementados" autocomplete="off"
                    ng-model="implementadosEim.csp" ng-change="implementadosEim.oportunidad = ''"
                    ng-keypress="implementadosEim.eim = ''" class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-2 column-style-consulta">
                <label class="label-filter"><i class="icono-noseleccion fas fa-exclamation-circle me-2"
                    title="No se encontró catalogo de vertical / c&eacute;lula"
                    ng-show="!filtroGeografia.implementados.length"></i>Geograf&iacute;a</label>
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="cluster-implementados"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografia('6')" />
            </div>
            <div class="col-md-2 column-style-consulta">
                <label class="label-filter">Fecha</label>
                <input readonly placeholder="Fecha" type="text" id="fecha-implementados"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-md-2 column-style-consulta">
                <label class="label-filter"><i class="icono-noseleccion fas fa-exclamation-circle me-2"
                    title="No se encontró catalogo de estatus"
                    ng-show="!filtroImplementados.estatus.length"></i>Estatus</label>
                <div class="dropdown">
                    <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="ESTATUS" type="text"
                        id="filtro-estatus-implementados" class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-implementados">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodosRecursivo(filtroImplementados.estatus)" id="todo_filtro"
                                type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodosRecursivo(filtroImplementados.estatus)"
                                id="ninguno_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtroImplementados.estatus" class="element-menu-filter"
                            class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGenericV2(filtro,filtroImplementados.estatus)
                                    id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                    ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                            <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                ng-include="'filtroEstatusImplementados.html'" class="dropdown-menu"></ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2 column-style-consulta">
                <label class="label-filter"><i class="icono-noseleccion fas fa-exclamation-circle me-2"
                        title="No se encontró catalogo de vertical / c&eacute;lula"
                        ng-show="!filtroImplementados.veticalCelula.length"></i>Vertical / C&eacute;lula</label>
                <div class="dropdown">
                    <input readonly data-mdb-toggle="dropdown" aria-expanded="false"
                        placeholder="VERTICAL/C&Eacute;LULA" type="text" id="filtro-vertical-celula-implementados"
                        class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-vertical-celula-implementados">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodosRecursivo(filtroImplementados.veticalCelula)"
                                id="todo_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodosRecursivo(filtroImplementados.veticalCelula)"
                                id="ninguno_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtroImplementados.veticalCelula " class="element-menu-filter"
                            class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGenericV2(filtro,filtroImplementados.veticalCelula)
                                    id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                    ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                            <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                ng-include="'filtroVerticalCelulaImplementados.html'" class="dropdown-menu"></ul>

                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-1">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar"
                    ng-click="consultarImplementados()">
                    <i class="fa fa-search"></i>
                </button>
            </div>

        </div>
    </div>
    <div class="content-fluid mt-3">
        <div class="table-responsive">
            <table id="implementadosTable" class="display table" cellspacing="0" width="100%">
                <thead id="thead_implementados">
                    <tr>
                        <th class="detail">
                            <div class="fht-cell" style="width: 20px;"></div>
                        </th>
                        <th class="detail">
                            <div class="fht-cell" style="width: 20px;"></div>
                        </th>
                        <th data-idColumn="0" data-isNumber="true" data-typeTable="implementadosEim"
                            class="orderColumnTable orderColumnAscTable">Folio</th>
                        <th data-idColumn="1" data-isNumber="false" data-typeTable="implementadosEim"
                            class="orderColumnTable orderColumnAscTable">Cotizaci&oacute;n</th>
                        <th data-idColumn="2" data-isNumber="true" data-typeTable="implementadosEim"
                            class="orderColumnTable orderColumnAscTable">Idbrm</th>
                        <th data-idColumn="3" data-isNumber="false" data-typeTable="implementadosEim"
                            class="orderColumnTable orderColumnAscTable">Cuenta factura</th>
                        <th data-idColumn="4" data-isNumber="false" data-typeTable="implementadosEim"
                            class="orderColumnTable orderColumnAscTable">Tipo de cuadrilla</th>
                        <th data-idColumn="5" data-isNumber="false" data-typeTable="asignadasCompensacion"
                            class="orderColumnTable orderColumnAscTable">N&uacute;m OS</th>
                        <th data-idColumn="6" data-isNumber="false" data-typeTable="asignadasCompensacion"
                            class="orderColumnTable orderColumnAscTable">Estatus OS</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>