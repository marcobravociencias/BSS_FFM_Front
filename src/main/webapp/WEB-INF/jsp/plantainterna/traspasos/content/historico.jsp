<div class="row col-12 mb-2">
    <div class="col-1 columna-traspaso">
        <label for="idot-tr" class="label-filter">OT</label>
        <input type="text" id="idot-ht" placeholder="Ej: 65434" ng-model="camposFiltroHistorico.idot"
            ng-change="limpiarCamposFiltroHistorico(1)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-1 columna-traspaso">
        <label for="idos-tr" class="label-filter">OS</label>
        <input type="text" id="idos-ht" placeholder="Ej: 23214" ng-model="camposFiltroHistorico.idos"
            ng-change="limpiarCamposFiltroHistorico(2)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-1 columna-traspaso">
        <label for="cuenta-tr" class="label-filter">Cuenta</label>
        <input type="text" id="cuenta-ht" placeholder="Ej: 009348423" ng-model="camposFiltroHistorico.cuenta"
            ng-change="limpiarCamposFiltroHistorico(3)" class="form-control input-filtro-traspasos form-control-sm">
    </div>
    <div class="col-2 columna-traspaso columna-filtro-ind">
        <label for="cluster" class="label-filter">Geograf&iacute;a <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia"
            ng-show="!listadogeografiacopy.length"></i></label>
        <input readonly placeholder="Seleccione..." type="text" id="clusterHt" ng-click="abrirModalClusterHistorico()"
            class="input-filtro-traspasos form-control form-control-sm">
    </div>
    <div class="col-1 columna-traspaso columna-filtro-ind">
        <label for="filtro_fecha_inicio_historico" class="label-filter">Fecha inicial</label>
        <input readonly type="text" id="filtro_fecha_inicio_historico" placeholder="Fecha inicial"
            class="datepicker input-filtro-traspasos form-control form-control-sm" />
    </div>
    <div class="col-1 columna-traspaso columna-filtro-ind">
        <label for="filtro_fecha_fin_historico" class="label-filter">Fecha final</label>
        <input readonly placeholder="Fecha final" type="text" id="filtro_fecha_fin_historico"
            class="datepicker input-filtro-traspasos form-control form-control-sm" />
    </div>
    <div class="col-1">
        <button id="btn_consultar" type="button" class="btn btn-sm  btn-primary  waves-effect waves-light"
            ng-click="consultaHistorico()">
            <i class="fa fa-search"></i>
        </button>
    </div>
    <div id="" class="col-1" style="margin-top: 23px; width: 20px !important;" ng-if="configPermisoAccionDescargaHist">
        <img alt="excel" src="./resources/img/generic/group-10.png" style="cursor:pointer"
            ng-click="descargarReporteHistorico()">
    </div>
</div>
<div class="content-fluid">
    <div class="table-responsive">
        <table id="historicoTable" class="display table" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th data-idColumn="0" data-isNumber="true" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">OT</th>
                    <th data-idColumn="1" data-isNumber="true" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">OT original</th>
                    <th data-idColumn="2" data-isNumber="true" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">OS</th>
                    <th data-idColumn="3" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Cliente</th>
                    <th data-idColumn="4" data-isNumber="true" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Cuenta</th>
                    <th data-idColumn="5" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Geograf&iacute;a</th>
                    <th data-idColumn="6" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Fecha agenda</th>
                    <th data-idColumn="7" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Tipo</th>
                    <th data-idColumn="8" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Subtipo</th>
                    <th data-idColumn="9" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Estatus</th>
                    <th data-idColumn="10" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Estado</th>
                    <th data-idColumn="11" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Motivo</th>
                    <th data-idColumn="12" data-isNumber="false" data-typeTable="traspasoTable" class="orderColumnTable orderColumnAscTable">Motivo transferencia</th>
                    <th style="text-align: center;">Evidencia</th>
                    <th style="text-align: center;">Detalle</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>