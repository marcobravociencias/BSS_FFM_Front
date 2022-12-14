<div class="container-fluid container-tab">
    <div class="container-filtros">
        <div class="row md-form" id="filtros_config">
            <div class="col-md-1 columna-filtro-indR borderFilterR" style="padding: 0;">
                <input readonly placeholder="Fecha Inicial" type="text" id="filtro_fecha_inicio_inspector"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>
            <div class="col-md-1 columna-filtro-indR borderFilterR">
                <input readonly placeholder="Fecha Final" type="text" id="filtro_fecha_fin_inspector"
                    class="datepicker input-filtro form-control form-control-sm" />
            </div>

            <div class="col-md-2 column-style-consulta borderFilterR">
                <input type="text" placeholder="INCIDENCIA" id="inci"
                    class="form-control input-filtro form-control-sm">
            </div>

            <div class="col-md-1 column-style-consulta borderFilterR" style="width: 95px !important;" id="borderAlign">
                <input type="text" placeholder="OT" id="otI"
                    class="form-control input-filtro form-control-sm">
            </div>

            <div class="col-md-2 column-style-consulta borderFilterR">
                <input type="text" placeholder="# EMPLEADO" id="nEmpI"
                    class="form-control input-filtro form-control-sm">
            </div>


            <div class="col-md-2 column-style-consulta columna-filtro-indRR borderFilterR">
                <input readonly placeholder="GEOGRAF&Iacute;A" type="text" id="cluster"
                    class="input-filtro form-control form-control-sm" ng-click="abrirModalGeografiaRep()" />
            </div>
            <div class="col-md-1 column-style-consulta borderFilterR">
                <input type="text" placeholder="OPERARIO" id="nOperario"
                    class="form-control input-filtro form-control-sm">
            </div>
            <div class="col-1 div-btn-busqueda borderFilterR" style="width: 40px;">
                <button id="btn_consultar_ordenes" type="button"
                    class="btn btn-sm  btn-primary  waves-effect waves-light btn_consultar"
                    style="margin-top: 0; margin: 0 !important;" ng-click="consultarReporteInspector()">
                    <i class="fa fa-search"></i>
                </button>
            </div>

        </div>
    </div>
    <div class="content-table">
        <div class="content-fluid">
            <table id="reporteInspectorTable" class="display table " cellspacing="0" width="100%">
                <thead id="thead_reporteInspector">
                    <tr>
                        <th>ID</th>
                        <th>CLUSTER INCIDENCIA</th>
                        <th>NO EMPLEADO</th>
                        <th>NOMBRE OPERARIO</th>
                        <th>FECHA LEVANTAMIENTO</th>
                        <th>HORA</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>