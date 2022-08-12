<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-2 columna-filtro-indRR">
                <label class="label-filter">Geograf&iacute;a</label>
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="cluster-recolecciones"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep('recolecciones')" />
            </div>
            <div class="col-md-2 columna-filtro-indR pl-0">
                <label class="label-filter">Tipo fecha</label>
                <select class="input-filtro form-control form-control-sm" id="tipo_reporte_recolecciones"
                    style="border: 1px solid #dbdbdb !important; background: white !important;"  ng-model="reporte.recolecciones" ng-change="changeCalendar(this, 'recolecciones')">
                    <option value="">Selecciona...</option>
                    <option value="dia" selected>D&iacute;a</option>
                    <option value="semana">Semana</option>
                    <option value="mes">Mes</option>
                </select>
            </div>
            <div class="col-md-2 columna-filtro-indR pl-0">
                <label class="label-filter">Fecha</label>
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_dia_recolecciones" style="display: block;"
                    class="datepicker input-filtro form-control form-control-sm" />
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_semana_recolecciones" style="display: none;"
                    class="datepicker input-filtro form-control form-control-sm" />
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_mes_recolecciones" style="display: none;"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda pl-0">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar" style="margin-top: 2.7em;"
                    ng-click="consultarReporteRecolecciones()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="col-1 download-file" ng-if="configPermisoAccionDescargaBackRecolecciones">
                <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                    style="cursor:pointer; margin-top: 1.5em;" ng-click="descargarReporteRecolecciones()">
            </div>
        </div>
    </div>
    <div class="content-fluid mt-2">
        <div class="table-responsive">
            <table id="reporteRecoleccionesTable" class="display table  table-reportesf" cellspacing="0" width="100%">
                <thead id="thead_reporteRecolecciones">
                    <tr>
                        <th data-idColumn="0" data-isNumber="true" class="orderColumnTable orderColumnAscTable">OT</th>
                        <th data-idColumn="1" data-isNumber="false" class="orderColumnTable orderColumnAscTable">OS</th>
                        <th data-idColumn="2" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Cuenta
                        </th>
                        <th data-idColumn="3" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Ticket
                        </th>
                        <th data-idColumn="4" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Regi&oacute;n instalaci&oacute;n
                        </th>
                        <th data-idColumn="5" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Plaza</th>
                        <th data-idColumn="6" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Zona
                        </th>
                        <th data-idColumn="7" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Cluster
                            instalaci&oacute;n</th>
                        <th data-idColumn="8" data-isNumber="true" class="orderColumnTable orderColumnAscTable">
                            Colonia</th>
                        <th data-idColumn="9" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Plaza
                            sitio
                        </th>
                        <th data-idColumn="10" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Distrito sitio</th>
                        <th data-idColumn="11" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Primer fecha agendamiento</th>
                        <th data-idColumn="12" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Fecha
                            agendamiento</th>
                        <th data-idColumn="13" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Turno
                        </th>
                        <th data-idColumn="14" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Fecha
                            activaci&oacute;n</th>
                        <th data-idColumn="15" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Estatus</th>
                        <th data-idColumn="16" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Estado</th>
                        <th data-idColumn="17" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Fecha apertura</th>
                        <th data-idColumn="18" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Propietario</th>
                        <th data-idColumn="19" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Grupo</th>
                        <th data-idColumn="20" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Nivel 1</th>
                        <th data-idColumn="21" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Nivel 2</th>
                        <th data-idColumn="22" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Nivel 3</th>
                        <th data-idColumn="23" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Repetido</th>
                        <th data-idColumn="24" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Tipo orden</th>
                        <th data-idColumn="25" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Subtipo</th>
                        <th data-idColumn="26" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Nuevo segmento</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>