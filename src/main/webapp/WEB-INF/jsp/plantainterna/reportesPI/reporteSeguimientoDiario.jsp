<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-1 columna-filtro-indRR borderFilterR borderAlignR">
                <label class="label-filter">Estatus</label>
                <div class="dropdown">
                    <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="ESTATUS" type="text"
                        id="filtro-estatus-reporte" class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodosRecursivo(filtroEstatusInt.reporteSeguimiento.estatusdisponibles)"
                                id="todo_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodosRecursivo(filtroEstatusInt.reporteSeguimiento.estatusdisponibles)"
                                id="ninguno_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtroEstatusInt.reporteSeguimiento.estatusdisponibles" class="element-menu-filter"
                            class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGenericV2(filtro,filtroEstatusInt.reporteSeguimiento.estatusdisponibles)
                                    id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                    ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                            <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                ng-include="'filtroEstatusSeguimiento.html'" class="dropdown-menu"></ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2 columna-filtro-indRR borderFilterR" style="width: 130px;">
                <label class="label-filter">Intervenci&oacute;n</label>
                <div class="dropdown">
                    <input readonly data-toggle="dropdown" aria-expanded="false" placeholder="INTERVENCI&Oacute;N"
                        type="text" id="filtro-intervencionO" class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodosRecursivo(filtroEstatusInt.reporteSeguimiento.tipoOrdenes)" id="todo_filtro"
                                type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodosRecursivo(filtroEstatusInt.reporteSeguimiento.tipoOrdenes)"
                                id="ninguno_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtroEstatusInt.reporteSeguimiento.tipoOrdenes " class="element-menu-filter"
                            class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGenericV2(filtro,filtroEstatusInt.reporteSeguimiento.tipoOrdenes)
                                    id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                    ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                            <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                ng-include="'filtroIntervencionSeguimiento.html'" class="dropdown-menu">

                            </ul>
                            
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-1 borderFilterR" id="borderAlign">
                <label class="label-filter">OT</label>
                <input type="text" placeholder="OT" id="idot-reporte" autocomplete="off" ng-model="repDiario.idOrden" ng-change="repDiario.folio = ''" ng-keypress="repDiario.idCuenta = ''"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 borderFilterR">
                <label class="label-filter">OS</label>
                <input type="text" placeholder="OS" id="idos-reporte"  autocomplete="off" ng-model="repDiario.folio"  ng-change="repDiario.idOrden = ''" ng-keypress="repDiario.idCuenta = ''"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 borderFilterR">
                <label class="label-filter">Cuenta</label>
                <input type="text" placeholder="CUENTA" id="cuenta-reporte" autocomplete="off" ng-model="repDiario.idCuenta" ng-change="repDiario.idOrden = ''" ng-keypress="repDiario.folio = ''"
                    class="form-control input-filtro form-control-sm"> 
            </div>
            <div class="col-md-1 columna-filtro-indRR borderFilterR" style="width: 110px;">
                <label class="label-filter">Geograf&iacute;a</label>
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="clusterO"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep('seguimiento')" />
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR" style="width: 120px;">
                <label class="label-filter">Tipo fecha</label>
                <select class="input-filtro form-control form-control-sm" id="tipo_reporte"
                    style="border: 1px solid #dbdbdb !important; background: white !important;"
                    ng-model="repDiario.fechaSeleccionada">
                    <option value="">Selecciona...</option>
                    <option value="fechaCreacion" selected>FECHA CREACI&Oacute;N</option>
                    <option value="fechaConfirmacion">FECHA CONFIRMACI&Oacute;N</option>
                    <option value="fechaAgenda">FECHA AGENDA</option>
                    <option value="fechaAtencionInicio">FECHA ATENCI&Oacute;N INICIO</option>
                    <option value="fechaAtencionFin">FECHA ATENCI&Oacute;N FIN</option>
                </select>
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR">
                <label class="label-filter">Fecha inicio</label>
                <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_reporte"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR">
                <label class="label-filter">Fecha fin</label>
                <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_reporte"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda borderFilterR" style="width: 55px;">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar"
                    style="margin-top: 2.5em; height: 28px;" ng-click="consultarReporteDiario()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="col-1 download-file" ng-if="configPermisoAccionDescargaReporteSeguimiento">
                <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                    style="cursor:pointer; margin-top: 1.5em;" onclick="downloadExcelReportFile()">
            </div>
        </div>
    </div>
    <div class="content-fluid">
        <div class="table-responsive">
            <table id="reporteSeguimientoTable" class="display table" cellspacing="0" width="100%">
                <thead id="thead_reporteSeguimiento">
                    <tr>
                        <th>OT</th>
                        <th>OS</th>
                        <th>Cuenta</th>
                        <th>Tipo</th>
                        <th>Subtipo</th>
                        <th>Estatus</th>
                        <th>Estado</th>
                        <th>Motivo</th>
                        <th>Ciudad</th>
                        <th>Geograf&iacute;a</th>
                        <th>#Empleado</th>
                        <th>#Usuario</th>
                        <th>T&eacute;cnico</th>
                        <th>Fecha agenda</th>
                        <th>Fecha fin</th>

                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>