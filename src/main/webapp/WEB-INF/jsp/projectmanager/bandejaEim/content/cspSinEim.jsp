
<div class="row" id="">
  	<div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Clave cliente</label>
        <input type="text" ng-model="objetoEim.cveCliente" id="cveCliente" placeholder="Ej: 23214"
        class="form-control form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">CSP</label>
        <input type="text"  ng-model="objetoEim.csp" id="csp" placeholder="Ej: 65434"
        class="form-control form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">COT</label>
        <input type="text"  ng-model="objetoEim.cot" id="cot" placeholder="Ej: 23214"
        class="form-control form-control-sm">
    </div>
    <div class="col-md-2" style="width: 85px;">
        <button id="btn-asignada-salesforce" ng-click="consultarSinEimPm()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
    <div class="col-md-2">
    </div>
    <div class="col-md-1">
    </div>
    <div class="col-md-2" style="width: 227px;">
                        <select class="form-control form-control-sm custom-select" id="eim" ng-model="eim.Id">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{ eim.Id }}" ng-repeat="eim in data.eims">
                                {{ eim.Name }}
                            </option>
                        </select>
    </div>
    <div class="col-md-2" style="width: 165px">
            <button type="button" class="btn btn-primary ripple-surface" ng-click="asignarEim()">
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