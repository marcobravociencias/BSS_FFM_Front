
<div class="row md-form" id="">
  	<div class="column-style-consulta" style="width: 11%;">
        <label for="os_terminada" class="label-filter">Clave cliente</label>
        <input type="text" ng-model="objetoCalendarizada.claveCliente" ng-change="limpiarCamposCalendarizada(3)" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="ot_calendarizado" class="label-filter">CSP</label>
        <input type="text" ng-model="objetoCalendarizada.ot" ng-change="limpiarCamposCalendarizada(1)" id="ot_calendarizado" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="os_calendarizado" class="label-filter">COT</label>
        <input type="text" ng-model="objetoCalendarizada.folio" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    
    <div class="col-md-1 div-btn-busqueda" style="width: 85px;">
        <button id="btn-calendarizado-salesforce" ng-click="consultarCalendarizada()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
</div>
<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tableCalendarizada" class="table">
            <thead id="thead_calendarizada">
                <tr>
                    <th data-idColumn="0" data-isNumber="true" data-typeTable="reporteCalendarizada" class="orderColumnTable orderColumnAscTable">Oportunidad</th>
                    <th data-idColumn="1" data-isNumber="false" data-typeTable="reporteCalendarizada" class="orderColumnTable orderColumnAscTable">Vertical</th>
                    <th data-idColumn="2" data-isNumber="true" data-typeTable="reporteCalendarizada" class="orderColumnTable orderColumnAscTable">Celula</th>
                    <th data-idColumn="3" data-isNumber="false" data-typeTable="reporteCalendarizada" class="orderColumnTable orderColumnAscTable">Cliente</th>
                    <th data-idColumn="4" data-isNumber="false" data-typeTable="reporteCalendarizada" class="orderColumnTable orderColumnAscTable">CSP</th>
                    <th data-idColumn="5" data-isNumber="false" data-typeTable="reporteCalendarizada" class="orderColumnTable orderColumnAscTable">Fecha Venta</th>      
                    <th style="text-align: center;">EIM</th>
                </tr>
            </thead>
        </table>
    </div>
</div>