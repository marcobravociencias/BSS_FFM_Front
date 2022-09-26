
<div class="row md-form" id="">
  	<div class="column-style-consulta" style="width: 11%;">
        <label for="" class="label-filter">Clave cliente</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(3)" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="" class="label-filter">CSP</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(1)" id="ot_calendarizado" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label for="" class="label-filter">COT</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
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
        <table id="tablecspSinEim" class="table">
            <thead id="theadcspSinEim">
                <tr>
                    <th data-idColumn="0" data-isNumber="false" data-typeTable="reporteCspSinEim" class="orderColumnTable orderColumnAscTable"><input type="checkbox" id="selectAll" class="main"/></th>
                    <th data-idColumn="1" data-isNumber="true" data-typeTable="reporteCspSinEim" class="orderColumnTable orderColumnAscTable">Oportunidad</th>
                    <th data-idColumn="2" data-isNumber="false" data-typeTable="reporteCspSinEim" class="orderColumnTable orderColumnAscTable">Vertical</th>
                    <th data-idColumn="3" data-isNumber="false" data-typeTable="reporteCspSinEim" class="orderColumnTable orderColumnAscTable">Celula</th>
                    <th data-idColumn="4" data-isNumber="false" data-typeTable="reporteCspSinEim" class="orderColumnTable orderColumnAscTable">Cliente</th>
                    <th data-idColumn="5" data-isNumber="false" data-typeTable="reporteCspSinEim" class="orderColumnTable orderColumnAscTable">CSP</th>
                    <th data-idColumn="6" data-isNumber="false" data-typeTable="reporteCspSinEim" class="orderColumnTable orderColumnAscTable">Fecha Venta</th>      
                </tr>
            </thead>
        </table>
    </div>
</div>