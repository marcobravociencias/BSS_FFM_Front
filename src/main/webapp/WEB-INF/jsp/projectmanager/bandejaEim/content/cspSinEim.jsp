
<div class="row" id="">
  	<div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Clave cliente</label>
        <input type="text" ng-model="" ng-change="" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
        
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">CSP</label>
        <input type="text" ng-model="" ng-change="" id="ot_calendarizado" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">COT</label>
        <input type="text" ng-model="" ng-change="" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 85px;">
        <button id="btn-calendarizado-salesforce" ng-click="consultarSinEimPm()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
    <div class="col-md-2">
    </div>
    <div class="col-md-1">
    </div>
    <div class="col-md-2" style="width: 227px;">
                        <select class="form-control form-control-sm custom-select" name="eim" id="eim">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{ eim.Id }}" ng-repeat="eim in data.eims">
                                {{ eim.Name }}
                            </option>
                        </select>
    </div>
    <div class="col-md-2" style="width: 165px">
            <button type="button" class="btn btn-primary ripple-surface" ng-click="">
                    Asignar EIM
            </button>
    </div>
</div>
<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tablecspSinEim" class="display table">
            <thead id="theadcspSinEim">
                <tr>
                   <th><input type="checkbox" id="selectAll" class="main"/></th>
                   <th>Oportunidad</th>
                   <th>Vertical</th>
                   <th>Celula</th>
                   <th>Cliente</th>
                   <th>CSP</th>
                   <th>Fecha Venta</th>
                </tr>
            </thead>
        </table>
    </div>
</div>