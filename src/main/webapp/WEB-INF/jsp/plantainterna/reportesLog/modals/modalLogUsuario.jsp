<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalLog">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Acciones realizadas</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="padding: 0 !important; margin-top: 0.5em;">
                <div class="content-fluid">
                    <div class="dropdown dropdown-filter">
                        <div class="filter-log" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <i class="fa fa-filter" title="Filtro"></i>
                        </div>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                            <div class="list-filter">
                                <li style="text-align: center;">
                                    <button ng-click="seleccionarTodosFiltro(categoriasLogs ,true)" id="todo_filtro" type="button"
                                        class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
                                    <button ng-click="seleccionarTodosFiltro(categoriasLogs, false)" id="ninguno_filtro" type="button"
                                        class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
                                </li>
                                <li class="elemento_menu dropdown-divider"></li>
                                <li ng-repeat="item in categoriasLogs" class="element-menu-filter"
                                    class="element-menu-filter">
                                    <label class="dropdown-item form-check-inputfiltro">
                                        <input ng-click="changeFilter(item.id)" id="check-{{item.id}}"
                                            class="form-check-input check-input-list" type="checkbox" />
                                        <span for="check-{{item.id}}" class="dropdown-item item-text-filtro" href="#"
                                            ng-bind="item.descripcion"></span>
                                    </label>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div class=" table-responsive">
                        <table id="logsUserTable" class="display table" cellspacing="0" width="100%">
                            <thead id="thead_table">
                                <tr>
                                    <th>M&Oacute;DULO</th>
                                    <th>ACCI&Oacute;N</th>
                                    <th>ESTATUS</th>
                                    <th>MENSAJE</th>
                                    <th>COMENTARIOS</th>
                                    <th>FECHA REGISTRO</th>
                                    <th>IP</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div ng-show="!configPermisoAccionDescargaLogsUsuario" class="text-accion-nopermiso"
                    style="font-size: .6em;">
                    <i class="icon-not-permiso fas fa-user-lock"></i>
                    <b class="text-not-permiso" style="font-weight: lighter;">No tienes permiso para descargar el
                        log</b>
                </div>
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" ng-show="configPermisoAccionDescargaLogsUsuario"
                    class="btn btn-primary ripple-surface btnDescargar" ng-click="descargarLog()">
                    Descargar
                </button>
            </div>
        </div>
    </div>
</div>