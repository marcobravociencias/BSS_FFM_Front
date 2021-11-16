<div class="container-fluid container-filtros-consultaot" style="padding-left: 0px; margin-left: 0px;">
    <div style="padding-left: 0;padding-right: 0;" class="content-fluid">
        <div class="row md-form" id="filtros_config">
            <div class="col-lg-2  column-style-consulta columna-filtro-indRR borderFilterR borderAlignR"
                style="width: 100px !important;">
                <div class="dropdown">
                    <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="ESTATUS" type="text"
                        id="filtro-estatus-reporte" class="input-filtro-consultaOT form-control form-control-sm" />
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
            <div class="col-lg-2 column-style-consulta columna-filtro-indRR borderFilterR"
                style="width: 125px !important;">
                <div class="dropdown">
                    <input readonly data-toggle="dropdown" aria-expanded="false" placeholder="INTERVENCI&Oacute;N"
                        type="text" id="filtro-intervencionO"
                        class="input-filtro-consultaOT form-control form-control-sm" />
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
                                <input ng-click=setCheckIntervencion(filtro) id="filtrotext-{{filtro.id}}"
                                    class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion"
                                    ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                            <ul class="dropdown-menu">
                                <li ng-repeat="subfiltro in filtro.children" class="element-menu-filter">
                                    <label class="dropdown-item form-check-inputfiltro">
                                        <input ng-click=setCheckSubIntervencion(subfiltro,filtro)
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
            <div class="col-md-1 column-style-consulta borderFilterR" style="width: 90px !important;"
                id="borderAlign">
                <input type="text" placeholder="OT" id="idot-reporte" ng-model="repDiario.idOrden"
                    class="form-control input-filtro-consultaOT form-control-sm">
            </div>
            <div class="col-md-1 column-style-consulta borderFilterR" style="width: 90px !important;">
                <input type="text" placeholder="OS" id="idos-reporte" ng-model="repDiario.folio"
                    class="form-control input-filtro-consultaOT form-control-sm">
            </div>
            <div class="col-md-1 column-style-consulta borderFilterR" style="width: 90px !important;">
                <input type="text" placeholder="CUENTA" id="cuenta-reporte" ng-model="repDiario.idCuenta"
                    class="form-control input-filtro-consultaOT form-control-sm">
            </div>
            <div class="col-lg-1 column-style-consulta columna-filtro-indRR borderFilterR" style="width: 110px !important;">
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="clusterO"
                class="input-filtro-consultaOT form-control form-control-sm" ng-click="abrirModalGeografiaRep()"/>
            </div>
            <div class="col-md-1 column-style-consulta columna-filtro-indR borderFilterR" style="width: 110px !important; ">
                <select class="input-filtro-consultaOT form-control form-control-sm" id="tipo_reporte" 
                style="border: 1px solid #dbdbdb !important; background: white !important;"
                    ng-model="repDiario.fechaSeleccionada">
                    <option value="" selected>TIPO FECHA</option>
                    <option value="fechaCreacion">Fecha creaci&oacute;n</option>
                    <option value="fechaConfirmacion">Fecha confirmaci&oacute;n</option>
                    <option value="fechaAgenda">Fecha agenda</option>
                    <option value="fechaAtencionInicio">Fecha atenci&oacute;n inicio</option>
                    <option value="fechaAtencionFin">Fecha atenci&oacute;n fin</option>
                </select>
            </div>
            <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 100px !important;">
                <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_reporte"
                    class="datepicker input-filtro-consultaOT form-control form-control-sm" />
            </div>
            <div class="col-md-2 columna-filtro-indR borderFilterR" style="width: 100px !important;">
                <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_reporte" 
                    class="datepicker input-filtro-consultaOT form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda borderFilterR" style="width: 35px;">
                <button id="btn_consultar_ordenes" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light"
                    style="margin-top: 0; margin: 0 !important; height: 28px;" ng-click="consultarReporteDiario()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid contenedor-consultaOT" style="margin-left: 0px; max-width: none;">
    <div class="content-fluid">
        <table id="reporteSeguimientoTable" class="display table table-hover" cellspacing="0" width="100%">
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