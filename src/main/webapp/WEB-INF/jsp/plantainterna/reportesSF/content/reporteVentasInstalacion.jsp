<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-2 columna-filtro-indR">
                <label class="label-filter">Tipo fecha</label>
                <select class="input-filtro form-control form-control-sm" id="tipo_reporte_ventasinstalacion"
                    style="border: 1px solid #dbdbdb !important; background: white !important;" ng-model="reporte.ventasinstalacion" ng-change="changeCalendar(this, 'ventasinstalacion')">
                    <option value="">Selecciona...</option>
                    <option value="dia" selected>D&iacute;a</option>
                    <option value="semana">Semana</option>
                </select>
            </div>
            <div class="col-md-2 columna-filtro-indR pl-0">
                <label class="label-filter">Fecha</label>
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_dia_ventasinstalacion" style="display: block;"
                    class="datepicker input-filtro form-control form-control-sm" />
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_semana_ventasinstalacion" style="display: none;"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda pl-0">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar" style="margin-top: 2.7em;"
                    ng-click="consultarReporteVentasInstalacion()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="col-1 download-file" ng-if="configPermisoAccionDescargaVentasInstalacion">
                <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                    style="cursor:pointer; margin-top: 1.5em;" ng-click="descargarReporteVentasInstalacion()">
            </div>
        </div>
    </div>
    <div class="content-fluid mt-2">
        <div class="table-responsive">
            <table id="reporteVentasInstalacionTable" class="display table  table-reportesf" cellspacing="0" width="100%">
                <thead id="thead_reporteVentasInstalacion">
                    <tr>
                        <th data-idColumn="0" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Cuenta BRM</th>
                        <th data-idColumn="1" data-isNumber="false" class="orderColumnTable orderColumnAscTable">OS</th>
                        <th data-idColumn="2" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Fecha cierre</th>
                        <th data-idColumn="3" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Origen del prospecto</th>
                        <th data-idColumn="4" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Canal</th>
                        <th data-idColumn="5" data-isNumber="true" class="orderColumnTable orderColumnAscTable">SubCanal</th>
                        <th data-idColumn="6" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Cluster</th>
                        <th data-idColumn="7" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Fecha activaci&oacute;n</th>
                        <th data-idColumn="8" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Nombre empleado</th>
                        <th data-idColumn="9" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Estatus</th>
                        <th data-idColumn="10" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Motivo cancelaci&oacute;n</th>
                        <th data-idColumn="11" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Fecha agendamiento</th>
                        <th data-idColumn="12" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Tipo orden</th>
                        <th data-idColumn="13" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Familia plan</th>
                        <th data-idColumn="14" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Plan</th>
                        <th data-idColumn="15" data-isNumber="false" class="orderColumnTable orderColumnAscTable">TS Cancelado</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>