<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-1 column-style-consulta borderFilterR borderAlignR" id="borderAligna">
                <input type="text" placeholder="OT" id="idoA"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 column-style-consulta borderFilterR">
                <input type="text" placeholder="# EMPLEADO" id="numEmpA"
                    class="form-control input-filtro form-control-sm">
            </div>

            <div class="col-lg-2 column-style-consulta columna-filtro-indRR borderFilterR">
                <div class="dropdown">
                    <input readonly data-toggle="dropdown" aria-expanded="false" placeholder="Intervenci&oacute;n"
                        type="text" id="filtro-intervencion"
                        class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodos(filtrosGeneral.tipoOrdenes)" id="todo_filtro"
                                type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodos(filtrosGeneral.tipoOrdenes)" id="ninguno_filtro"
                                type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"
                            class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGeneric(filtro) id="filtrotext-{{filtro.id}}"
                                    class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion"
                                    ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                            <ul class="dropdown-menu">
                                <li ng-repeat="subfiltro in filtro.children" class="element-menu-filter">
                                    <label class="dropdown-item form-check-inputfiltro">
                                        <input ng-click=setCheckSubFiltroGeneric(subfiltro,filtro)
                                            id="subfiltrotext-{{subfiltro.id}}" class="form-check-input" type="checkbox"
                                            ng-model="subfiltro.checkedOpcion" ng-checked="subfiltro.checkedOpcion" />
                                        <span for="subfiltrotext-{{subfiltro.id}}"
                                            class="dropdown-item item-text-filtro" href="#"
                                            ng-bind="subfiltro.nombre"></span>
                                    </label>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-2 column-style-consulta columna-filtro-indRR borderFilterR">
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="cluster"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep()" />
            </div>
            <div class="col-md-2 columna-filtro-indR borderFilterR">
                <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_consultaOtA"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-md-2 columna-filtro-indR borderFilterR">
                <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_consultaOtA"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda borderFilterR" style="width: 40px;">
                <button id="btn_consultar_ordenes" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar"
                    style="margin-top: 0; margin: 0 !important;" ng-click="consultarReporteAux()">
                    <i class="fa fa-search"></i>
                </button>
            </div>

        </div>
    </div>
    <div class="content-table">
        <div class="content-fluid">
            <table id="reporteAuxiliarTable" class="display table table-hover " cellspacing="0" width="100%">
                <thead id="thead_reporteAuxiliar">
                    <tr>
                        <th>OT</th>
                        <th>CLIENTE</th>
                        <th>CUENTA</th>
                        <th>CIUDAD</th>
                        <th>FECHA AGENDA</th>
                        <th>MOTIVO</th>
                        <th>STATUS</th>
                        <th>ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>