<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-1 columna-filtro-indRR borderFilterR borderAlignR">
                <label class="label-filter">Estatus</label>
                <div class="dropdown">
                    <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="ESTATUS" type="text"
                        id="filtro-estatus-reporte-asignadas" class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodosRecursivo(filtroEstatusInt.reporteAsignadas.estatusdisponibles)"
                                id="todo_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodosRecursivo(filtroEstatusInt.reporteAsignadas.estatusdisponibles)"
                                id="ninguno_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtroEstatusInt.reporteAsignadas.estatusdisponibles " class="element-menu-filter"
                            class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGenericV2(filtro,filtroEstatusInt.reporteAsignadas.estatusdisponibles)
                                    id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                    ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                            <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                ng-include="'filtroEstatusAsignadas.html'" class="dropdown-menu"></ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2 columna-filtro-indRR borderFilterR" style="width: 130px;">
                <label class="label-filter">Intervenci&oacute;n</label>
                <div class="dropdown">
                    <input readonly data-toggle="dropdown" aria-expanded="false" placeholder="INTERVENCI&Oacute;N"
                        type="text" id="filtro-intervencion-reporte-asignadas" class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodosRecursivo(filtroEstatusInt.reporteAsignadas.tipoOrdenes)" id="todo_filtro"
                                type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodosRecursivo(filtroEstatusInt.reporteAsignadas.tipoOrdenes)"
                                id="ninguno_filtro" type="button"
                                class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="filtro in filtroEstatusInt.reporteAsignadas.tipoOrdenes " class="element-menu-filter"
                            class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input ng-click=setCheckFiltroGenericV2(filtro,filtroEstatusInt.reporteAsignadas.tipoOrdenes)
                                    id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox"
                                    ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion" />
                                <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#"
                                    ng-bind="filtro.nombre"></span>
                            </label>
                            <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0"
                                ng-include="'filtroIntervencionAsignadas.html'" class="dropdown-menu"></ul>
                            
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-1 borderFilterR" id="borderAlign">
                <label class="label-filter">OT</label>
                <input type="text" placeholder="OT" id="idot-reporte-asignadas" autocomplete="off" ng-model="repAsignadas.idOrden" ng-change="repAsignadas.folio = ''" ng-keypress="repAsignadas.idCuenta = ''"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 borderFilterR">
                <label class="label-filter">OS</label>
                <input type="text" placeholder="OS" id="idos-reporte-asignadas" autocomplete="off" ng-model="repAsignadas.folio" ng-change="repAsignadas.idOrden = ''" ng-keypress="repAsignadas.idCuenta = ''"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 borderFilterR"> 
                <label class="label-filter">Cuenta</label>
                <input type="text" placeholder="CUENTA" id="cuenta-reporte-asignadas" autocomplete="off" ng-model="repAsignadas.idCuenta" ng-change="repAsignadas.folio = ''" ng-keypress="repAsignadas.idOrden = ''"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-md-1 columna-filtro-indRR borderFilterR" style="width: 110px;">
                <label class="label-filter">Geograf&iacute;a</label>
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="cluster-asignadas"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep('asignadas')" />
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR" style="width: 120px;">
                <label class="label-filter">Tipo fecha</label>
                <select class="input-filtro form-control form-control-sm" id="tipo_reporte_asignadas"
                    style="border: 1px solid #dbdbdb !important; background: white !important;"
                    ng-model="repAsignadas.fechaSeleccionada">
                    <option value="">Selecciona...</option>
                    <option value="fechaCreacion">FECHA CREACI&Oacute;N</option>
                    <option value="fechaConfirmacion">FECHA CONFIRMACI&Oacute;N</option>
                    <option value="fechaAgenda">FECHA AGENDA</option>
                    <option value="fechaAtencionInicio">FECHA ATENCI&Oacute;N INICIO</option>
                    <option value="fechaAtencionFin">FECHA ATENCI&Oacute;N FIN</option>
                </select>
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR">
                <label class="label-filter">Fecha inicio</label>
                <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_reporte_asignadas"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR">
                <label class="label-filter">Fecha fin</label>
                <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_reporte_asignadas"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda borderFilterR" style="width: 55px;">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar"
                    style="margin-top: 2.5em;height: 28px;" ng-click="consultarReporteAsignadasCompensacion()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="col-1 download-file" ng-if="configPermisoAccionDescargaReporteAsignadas">
                <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                    style="cursor:pointer;margin-top: 1.5em;" onclick="downloadExcelReportAsignadasFile()">
            </div>
        </div>
    </div>
    <div class="content-fluid">
        <div class="table-responsive">
            <table id="reporteAsignadasTable" class="display table" cellspacing="0" width="100%">
                <thead id="thead_asignadas">
                    <tr>
                        <th>OT</th>
                        <th>OS</th>
                        <th>Cuenta</th>
                        <th>Tipo</th>
                        <th>Subtipo</th>
                        <th>Proveedor</th>
                        <th>Geograf&iacute;a</th>
                        <th>Geograf&iacute;a</th>
                        <th>#Empleado</th>
                        <th>#Usuario</th>
                        <th>Instalador</th>
                        <th>Fecha creaci&oacute;n</th>
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