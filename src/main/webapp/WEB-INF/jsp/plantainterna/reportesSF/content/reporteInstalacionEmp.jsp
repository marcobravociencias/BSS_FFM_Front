<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-2 columna-filtro-indRR">
                <label class="label-filter">Geograf&iacute;a</label>
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="cluster-instalacionemp"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep('instalacionemp')" />
            </div>
            <div class="col-md-2 columna-filtro-indR pl-0">
                <label class="label-filter">Tipo fecha</label>
                <select class="input-filtro form-control form-control-sm" id="tipo_reporte_instalacionemp"
                    style="border: 1px solid #dbdbdb !important; background: white !important;" ng-model="reporte.instalacionemp" ng-change="changeCalendar(this, 'instalacionemp')">
                    <option value="">Selecciona...</option>
                    <option value="dia" selected>D&iacute;a</option>
                    <option value="semana">Semana</option>
                </select>
            </div>
            <div class="col-md-2 columna-filtro-indR pl-0">
                <label class="label-filter">Fecha</label>
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_dia_instalacionemp" style="display: block;"
                    class="datepicker input-filtro form-control form-control-sm" />
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_semana_instalacionemp" style="display: none;"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda pl-0">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar" style="margin-top: 2.7em;"
                    ng-click="consultarReporteInstalacionEmpresarial()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="col-1 download-file" ng-if="configPermisoAccionDescargaCompletadoEmp">
                <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                    style="cursor:pointer; margin-top: 1.5em;" ng-click="descargarReporteInstalacionEmpresarial()">
            </div>
        </div>
    </div>
    <div class="content-fluid mt-2">
        <div class="table-responsive">
            <table id="reporteInstEmpTable" class="display table  table-reportesf" cellspacing="0" width="100%">
                <thead id="thead_reporteInstEmp">
                    <tr>
                        <th data-idColumn="0" data-isNumber="true" class="orderColumnTable orderColumnAscTable">OS</th>
                        <th data-idColumn="1" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Cuenta</th>
                        <th data-idColumn="2" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Cotizaci&oacute;n
                        </th>
                        <th data-idColumn="3" data-isNumber="false" class="orderColumnTable orderColumnAscTable">CSP
                        </th>
                        <th data-idColumn="4" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Plaza
                        </th>
                        <th data-idColumn="5" data-isNumber="false" class="orderColumnTable orderColumnAscTable">
                            Cluster instalaci&oacute;n</th>
                        <th data-idColumn="6" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Fecha activaci&oacute;n
                        </th>
                        <th data-idColumn="7" data-isNumber="false" class="orderColumnTable orderColumnAscTable">Tipo orden</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>