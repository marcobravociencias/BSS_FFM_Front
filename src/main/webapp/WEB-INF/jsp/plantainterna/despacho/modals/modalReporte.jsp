<!-- Modal -->
<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalReporte">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title modal-title-despacho-pi">Reporte seguimiento diario</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row">
                        <div class="col-2  columna-filtro-ind-rep input-box" style="width: 100px !important;">
                            <label for="filtro-estatus-substatus" class="label-filter"><i ng-if="filtrosGeneral && !filtrosGeneral.estatusdisponibles.length" class="icono-noseleccion fas fa-exclamation-circle ml-2" title="No se encontr&oacute;o el catalogo de estatus"></i></label>
                            <div class="dropdown">
                                <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Estatus"
                                    type="text" id="filtro-estatus-reporte"
                                    class="input-filtro-reporte form-control form-control-sm" />
                                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-estatus">      
                                        <li style="text-align: center;">
                                            <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                            <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.estatusdisponibles)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                        </li>     
                                        <li class="elemento_menu dropdown-divider"></li>
                                        <li ng-repeat="filtro in filtrosGeneral.estatusdisponibles " class="element-menu-filter"  class="element-menu-filter">
                                            <label  class="dropdown-item form-check-inputfiltro">
                                                <input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.estatusdisponibles) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
                                                <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                            </label>
                                            <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroEstatus.html'" class="dropdown-menu"></ul>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                        <div class="col-2  columna-filtro-ind-rep input-box" style="width: 120px !important;">
                            <label for="filtro-intervencion" class="label-filter"><i ng-if="banderaErrorIntervencion" class="icono-noseleccion fas fa-exclamation-circle ml-2" title="No se encontr&oacute;o el catalogo de intervenci&oacute;n"></i></label>
                            <div class="dropdown">
                                <input readonly data-mdb-toggle="dropdown" aria-expanded="false"
                                    placeholder="Intervenci&oacute;n" type="text" id="filtro-intervencion-reporte"
                                    class="input-filtro-reporte form-control form-control-sm" />
                                    <ul class="dropdown-menu drop-down-filters" aria-labelledby="filtro-intervencion">      
                                        <li style="text-align: center;">
                                            <button ng-click="seleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes)" id="todo_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Todos</button>
                                            <button ng-click="deseleccionarTodosRecursivo(filtrosGeneral.tipoOrdenes)" id="ninguno_filtro" type="button" class="btn btn-indigo  btn-sm waves-effect waves-light">Ninguno</button>
                                        </li>     
                                        <li class="elemento_menu dropdown-divider"></li>
                                        <li ng-repeat="filtro in filtrosGeneral.tipoOrdenes " class="element-menu-filter"  class="element-menu-filter">
                                            <label  class="dropdown-item form-check-inputfiltro">
                                                <input ng-click=setCheckFiltroGenericV2(filtro,filtrosGeneral.tipoOrdenes) id="filtrotext-{{filtro.id}}" class="form-check-input" type="checkbox" ng-model="filtro.checkedOpcion" ng-checked="filtro.checkedOpcion"  />
                                                <span  for="filtrotext-{{filtro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="filtro.nombre"></span>
                                            </label>
                                            <ul ng-if="filtro.children !== undefined &&  filtro.children.length > 0" ng-include="'filtroIntervencion.html'" class="dropdown-menu"></ul>
                                             <ul  class="dropdown-menu">                     
                                                <!--li  ng-repeat="subfiltro in filtro.children" class="element-menu-filter">
                                                    <label  class="dropdown-item form-check-inputfiltro">
                                                        <input ng-click=setCheckSubFiltroGeneric(subfiltro,filtro) id="subfiltrotext-{{subfiltro.id}}" class="form-check-input" type="checkbox" ng-model="subfiltro.checkedOpcion" ng-checked="subfiltro.checkedOpcion"    />
                                                        <span  for="subfiltrotext-{{subfiltro.id}}" class="dropdown-item item-text-filtro" href="#" ng-bind="subfiltro.nombre"></span>
                                                    </label>
                                                </li-->
                                            </ul>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                        <div class="col-1 input-box">
                            <label for="idot" class="label-filter">OT</label>
                            <input type="text" id="idot-reporte" placeholder="Ej: 65434" ng-model="repDiario.idOrden"
                                ng-change="limpiarCamposReporte(2)" autocomplete="off"
                                class="form-control input-filtro-reporte form-control-sm">
                        </div>
                        <div class="col-1 input-box">
                            <label for="idos" class="label-filter">OS</label>
                            <input type="text" id="idos-reporte" placeholder="Ej: 23214" ng-model="repDiario.folio"
                                ng-change="limpiarCamposReporte(1)" autocomplete="off"
                                class="form-control input-filtro-reporte form-control-sm">
                        </div>
                        <div class="col-1 input-box">
                            <label for="cuenta" class="label-filter">Cuenta</label>
                            <input type="text" id="cuenta-reporte" placeholder="Ej: 0093484"
                                ng-model="repDiario.idCuenta" ng-change="limpiarCamposReporte(3)" autocomplete="off"
                                class="form-control input-filtro-reporte form-control-sm">
                        </div>
                        <div class="col-1 input-box">
                            <label for="cuenta" class="label-filter">Geograf&iacute;a<i ng-if="banderaErrorGeografia" class="icono-noseleccion fas fa-exclamation-circle ml-2" title="No se encontr&oacute;o el catalogo de geograf&iacute;a"></i></label>
                            <input ng-click="abrirModalGeografia()" readonly placeholder="Geograf&iacute;a" type="text"
                                id="filtro-geografia" class="form-control input-filtro-reporte form-control-sm" />
                        </div>
                        <div class="col-2 columna-filtro-ind-rep input-box" style="width: 170px;">
                            <label for="tipo_reporte" class="label-filter">Tipo fecha</label>
                            <select class="input-filtro-reporte form-control form-control-sm" id="tipo_reporte"
                                ng-model="repDiario.fechaSeleccionada">
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
                        <div class="col-1 download-file" ng-if="permisoDescargaSeguimientoDiario">
                            <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                                style="cursor:pointer" onclick="downloadExcelReportFile()">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-12 contenedor-table">
                            <table class="display table table-hover" cellspacing="0" width="100%" id="table-reporte">
                                <thead id="head_table">
                                    <tr>
                                        <th>OT</th>
                                        <th>OS</th>
                                        <th>CUENTA</th>
                                        <th>TIPO</th>
                                        <th>SUBTIPO</th>
                                        <th>ESTATUS</th>
                                        <th>ESTADO</th>
                                        <th>MOTIVO</th>
                                        <th>CIUDAD</th>
                                        <th>GEOGRAF&iacute;A</th>
                                        <th>#EMPLEADO</th>
                                        <th>#USUARIO</th>
                                        <th>T&Eacute;CNICO</th>
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