<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-1 columna-filtro-indRR borderFilterR borderAlignR">
                <div class="dropdown">
                    <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="ESTATUS" type="text"
                        id="filtro-estatus-reporte" class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-rep">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodos(filtrosGeneral.estatusdisponibles)" id="todo_filtro"
                                type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodos(filtrosGeneral.estatusdisponibles)" id="ninguno_filtro"
                                type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtrosGeneral.estatusdisponibles " class="element-menu-filter"
                            class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGeneric(filtro) id="filtrotext-{{filtro.id}}"
                                    class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion"
                                    ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2 columna-filtro-indRR borderFilterR" style="width: 130px;">
                <div class="dropdown">
                    <input readonly data-toggle="dropdown" aria-expanded="false" placeholder="INTERVENCI&Oacute;N"
                        type="text" id="filtro-intervencionO" class="input-filtro form-control form-control-sm" />
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

                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-1 borderFilterR" id="borderAlign">
                <input type="text" placeholder="OT" id="idot-reporte" ng-model="repDiario.idOrden"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 borderFilterR">
                <input type="text" placeholder="OS" id="idos-reporte" ng-model="repDiario.folio"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 borderFilterR">
                <input type="text" placeholder="CUENTA" id="cuenta-reporte" ng-model="repDiario.idCuenta"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-2 columna-filtro-indRR borderFilterR" style="width: 130px;">
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="clusterO"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep()" />
            </div>
            <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 170px;">
                <select class="input-filtro form-control form-control-sm" id="tipo_reporte"
                    style="border: 1px solid #dbdbdb !important; background: white !important;"
                    ng-model="repDiario.fechaSeleccionada">
                    <option value="" selected>TIPO FECHA</option>
                    <option value="fechaCreacion">FECHA CREACI&Oacute;N</option>
                    <option value="fechaConfirmacion">FECHA CONFIRMACI&Oacute;N</option>
                    <option value="fechaAgenda">FECHA AGENDA</option>
                    <option value="fechaAtencionInicio">FECHA ATENCI&Oacute;N INICIO</option>
                    <option value="fechaAtencionFin">FECHA ATENCI&Oacute;N FIN</option>
                </select>
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR">
                <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_reporte"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR">
                <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_reporte"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda borderFilterR" style="width: 35px;">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar"
                    style="margin-top: 0; margin: 0 !important; height: 28px;" ng-click="consultarReporteDiario()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="content-table">
        <div class="content-fluid">
            <table id="reporteSeguimientoTable" class="display table" cellspacing="0" width="100%">
                <thead id="thead_reporteSeguimiento">
                    <tr>
                        <th>OT</th>
                        <th>OS</th>
                        <th>TIPO</th>
                        <th>SUBTIPO</th>
                        <th>ESTATUS</th>
                        <th>ESTADO</th>
                        <th>MOTIVO</th>
                        <th>CIUDAD</th>
                        <th>ESTADO</th>
                        <th>#EMPLEADO</th>
                        <th>T&Eacute;CNICO</th>
                        <th>FECHA CREACI&Oacute;N</th>
                        <th>FECHA AGENDA</th>
                        <th>FECHA FIN</th>

                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>