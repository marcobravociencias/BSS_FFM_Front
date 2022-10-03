
<div class="row" id="">
  	<div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Oportunidad</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(3)" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Regi&oacute;n</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(1)" id="ot_calendarizado" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Fecha</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Estatus de OT</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Vertical / C&eacute;lula</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">EIM</label>
        <input type="text" ng-model="" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 85px;">
        <button id="btn-calendarizado-salesforce" ng-click="consultarCalendarizada()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
</div>
        


<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tableEnImplementacion" class="table">
            <thead id="theadEnImplementacion">
                <tr>
                    <th data-idColumn="0" data-isNumber="false" data-typeTable="reporteEnImplementacion" class="orderColumnTable orderColumnAscTable">Folio</th>
                    <th data-idColumn="1" data-isNumber="true" data-typeTable="reporteEnImplementacion" class="orderColumnTable orderColumnAscTable">Cotizaci&oacute;n</th>
                    <th data-idColumn="2" data-isNumber="false" data-typeTable="reporteEnImplementacion" class="orderColumnTable orderColumnAscTable">Idbrm</th>
                    <th data-idColumn="3" data-isNumber="false" data-typeTable="reporteEnImplementacion" class="orderColumnTable orderColumnAscTable">Cuenta Factura</th>
                    <th data-idColumn="4" data-isNumber="false" data-typeTable="reporteEnImplementacion" class="orderColumnTable orderColumnAscTable">Tipo de Cuadrilla</th>
                    <th data-idColumn="5" data-isNumber="false" data-typeTable="reporteEnImplementacion" class="orderColumnTable orderColumnAscTable">N&uacute;m OS</th>
                    <th data-idColumn="6" data-isNumber="false" data-typeTable="reporteEnImplementacion" class="orderColumnTable orderColumnAscTable">Estatus de OS</th>    
                </tr>
            </thead>
        </table>
    </div>
</div>