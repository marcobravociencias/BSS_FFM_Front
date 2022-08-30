<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-2 columna-filtro-indRR">
                <label class="label-filter">Geograf&iacute;a</label>
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="cluster-generados"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep('generados')" />
            </div>
            <div class="col-md-2 columna-filtro-indR pl-0">
                <label class="label-filter">Tipo fecha</label>
                <select class="input-filtro form-control form-control-sm" id="tipo_reporte_generados"
                    style="border: 1px solid #dbdbdb !important; background: white !important;" ng-model="reporte.generados" ng-change="changeCalendar(this, 'generados')">
                    <option value="">Selecciona...</option>
                    <option value="dia" selected>D&iacute;a</option>
                    <option value="semana">Semana</option>
                </select>
            </div>
            <div class="col-md-2 columna-filtro-indR pl-0">
                <label class="label-filter">Fecha</label>
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_dia_generados" style="display: block;"
                    class="datepicker input-filtro form-control form-control-sm" />
                <input readonly placeholder="Fecha" type="text" id="filtro_fecha_semana_generados" style="display: none;"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-1 div-btn-busqueda pl-0">
                <button id="btn_consultar" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar" style="margin-top: 2.7em;"
                    ng-click="consultarReporteGenerados()">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            <div class="col-1 download-file" ng-if="configPermisoAccionDescargaGenerados">
                <img alt="excel" src="${pageContext.request.contextPath}/resources/img/generic/group-10.png"
                    style="cursor:pointer; margin-top: 1.5em;" ng-click="descargarReporteGenerados()">
            </div>
        </div>
    </div>
    <div class="content-fluid mt-2">
        <div class="table-responsive">
            <table id="reporteGeneradoss" class="display table  table-reportesf" cellspacing="0" width="100%">
                <thead id="thead_reporteGenerados">
                    <tr>
                        <th data-idColumn="0" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Cuenta </th>
                        <th data-idColumn="1" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Ticket </th>
                        <th data-idColumn="2" data-isNumber="true" class="orderColumnTable orderColumnAscTable">OS </th>
                        <th data-idColumn="3" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Primer fecha </th>
                        <th data-idColumn="4" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Fecha agendada </th>
                        <th data-idColumn="5" data-isNumber="true" class="orderColumnTable orderColumnAscTable">TS completado </th>
                        <th data-idColumn="6" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Fecha activaci&oacute;n </th>
                        <th data-idColumn="7" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Estatus </th>
                        <th data-idColumn="8" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Estado </th>
                        <th data-idColumn="9" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Grupo codificaci&oacute;n </th>
                        <th data-idColumn="10" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Nivel 1 </th>
                        <th data-idColumn="11" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Nivel 2 </th>
                        <th data-idColumn="12" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Nivel 3 </th>
                        <th data-idColumn="13" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Cluster instalaci&oacute;n </th>
                        <th data-idColumn="14" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Region instalaci&oacute;n </th>
                        <th data-idColumn="15" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Plaza </th>
                        <th data-idColumn="16" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Repetido </th>
                        <th data-idColumn="17" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Distrito Sitio </th>
                        <th data-idColumn="18" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Fecha Cierre </th>
                        <th data-idColumn="19" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Subtipo </th>
                        <th data-idColumn="20" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Cluster comercial </th>
                        <th data-idColumn="21" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Plaza sitio </th>
                        <th data-idColumn="22" data-isNumber="true" class="orderColumnTable orderColumnAscTable">fecha apertura </th>
                        <th data-idColumn="23" data-isNumber="true" class="orderColumnTable orderColumnAscTable">Plaza operaci&oacute;n </th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</div>