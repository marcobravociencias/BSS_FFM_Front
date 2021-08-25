<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalReporte">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Reporte seguimiento diario</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row">
                        <div class="col-2  columna-filtro-ind-rep input-box" style="width: 150px !important;">
                            <label for="filtro-estatus-substatus" class="label-filter">Estatus</label>
                            <div class="dropdown">
                                <input readonly data-mdb-toggle="dropdown" aria-expanded="false"
                                    placeholder="Seleccione..." type="text" id="filtro-estatus-reporte"
                                    class="input-filtro-reporte form-control form-control-sm" />
                                <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus-rep">
                                    <li style="text-align: center;">
                                        <button ng-click="seleccionTodos(filtrosGeneral.estatusdisponibles,true)"
                                            id="todo_filtro" type="button"
                                            class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                        <button ng-click="deseleccionarTodos(filtrosGeneral.estatusdisponibles,false)"
                                            id="ninguno_filtro" type="button"
                                            class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                    </li>
                                    <li class="elemento_menu dropdown-divider"></li>
                                    <li ng-repeat="filtro in filtrosGeneral.estatusdisponibles "
                                        class="element-menu-filter" class="element-menu-filter">
                                        <label class="dropdown-item form-check-inputfiltro">
                                            <input ng-click=setCheckFiltroGeneric(filtro) id="filtrotext-{{filtro.id}}"
                                                class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion"
                                                ng-checked="filtro.checkedOpcion" />
                                            <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro"
                                                href="#" ng-bind="filtro.nombre"></span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-2  columna-filtro-ind-rep input-box" style="width: 150px !important;">
                            <label for="filtro-intervencion" class="label-filter">Intervenci&oacute;n</label>
                            <div class="dropdown">
                                <input readonly data-mdb-toggle="dropdown" aria-expanded="false"
                                    placeholder="Seleccione..." type="text" id="filtro-intervencion-reporte"
                                    class="input-filtro-reporte form-control form-control-sm" />
                                <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">
                                    <li style="text-align: center;">
                                        <button ng-click="seleccionarTodos(filtrosGeneral.tipoOrdenes)" id="todo_filtro"
                                            type="button"
                                            class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                        <button ng-click="deseleccionarTodos(filtrosGeneral.tipoOrdenes)"
                                            id="ninguno_filtro" type="button"
                                            class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                    </li>
                                    <li class="elemento_menu dropdown-divider"></li>
                                    <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"
                                        class="element-menu-filter">
                                        <label class="dropdown-item form-check-inputfiltro">
                                            <input ng-click=setCheckFiltroGeneric(filtro) id="filtrotext-{{filtro.id}}"
                                                class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion"
                                                ng-checked="filtro.checkedOpcion" />
                                            <span for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro"
                                                href="#" ng-bind="filtro.nombre"></span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-1 input-box">
                            <label for="idot" class="label-filter">OT</label>
                            <input type="text" id="idot-reporte" placeholder="Ej: 65434" ng-model="repDiario.idot"
                                autocomplete="off" class="form-control input-filtro-reporte form-control-sm">
                        </div>
                        <div class="col-1 input-box">
                            <label for="idos" class="label-filter">OS</label>
                            <input type="text" id="idos-reporte" placeholder="Ej: 23214" ng-model="repDiario.idos"
                                autocomplete="off" class="form-control input-filtro-reporte form-control-sm">
                        </div>
                        <div class="col-1 input-box">
                            <label for="cuenta" class="label-filter">Cuenta</label>
                            <input type="text" id="cuenta-reporte" placeholder="Ej: 0093484" ng-model="repDiario.cuenta"
                                autocomplete="off" class="form-control input-filtro-reporte form-control-sm">
                        </div>
                        <div class="col-2 columna-filtro-ind-rep input-box">
                            <label for="tipo_reporte" class="label-filter">Tipo fecha</label>
                            <select class="input-filtro-reporte form-control form-control-sm" id="tipo_reporte"
                                ng-model="repDiario.tipo">
                                <option value="" selected>Seleccione...</option>
                                <option value="fechaCreacion">Fecha creaci&oacute;n</option>
                                <option value="fechaConfirmacion">Fecha confirmaci&oacute;n</option>
                                <option value="fechaAgenda">Fecha agenda</option>
                                <option value="fechaAtencionInicio">Fecha atenci&oacute;n inicio</option>
                                <option value="fechaAtencionFin">Fecha atenci&oacute;n fin</option>
                            </select>
                        </div>
                        <div class="col-1 columna-filtro-ind-rep input-box">
                            <label for="filtro_fecha_inicio_reporte" class="label-filter">Fecha
                                inicial</label>
                            <input readonly type="text" id="filtro_fecha_inicio_reporte" placeholder="Fecha inicial"
                                ng-model="repDiario.fechaInicio"
                                class="datepicker input-filtro-reporte form-control form-control-sm" />
                        </div>
                        <div class="col-1 columna-filtro-ind-rep input-box">
                            <label for="filtro_fecha_fin_reporte" class="label-filter">Fecha final</label>
                            <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_reporte"
                                ng-model="repDiario.fechaFin"
                                class="datepicker input-filtro-reporte form-control form-control-sm" />
                        </div>

                        <div class="col-1">
                            <button type="button" class="btn btn-sm  btn-primary  waves-effect waves-light"
                                onclick="consultarReporteDiario()" id="buscarReporte">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                        <div class="col-1 download-file">
                            <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png" style="cursor:pointer"
                                onclick="downloadExcelReportFile()">
                        </div>

                    </div>
                    <div class="row">
                        <div class="contenedor-table">
                            <table class="table table-hover" cellspacing="0" id="table-reporte"
                                style="width: 100% !important;">
                                <thead id="head_table">
                                    <tr>
                                        <th>OT</th> 
                                        <th>OS</th>
                                        <th>CUENTA</th>
                                        <th>INTERVENCI&Oacute;N</th>
                                        <th>SUBINTERVENCI&Oacute;N</th>
                                        <th>STATUS</th>
                                        <th>ESTADO</th>
                                        <th>GEOGRAF&Iacute;A</th>
                                        <th>OPERARIO</th>
                                        <th>#EMPLEADO</th>
                                        <th>FECHA ATENCI&Oacute;N</th>
                                        <th>FECHA CREACI&Oacute;N</th>
                                        <th>TURNO</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>