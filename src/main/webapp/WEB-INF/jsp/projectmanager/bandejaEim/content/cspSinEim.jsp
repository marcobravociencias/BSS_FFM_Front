
<div class="row" id="">
  	<div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Cliente</label>
        <input type="text" ng-model="objetoEim.cveCliente" id="scliente" placeholder="Ej: Audi"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-3" style="width: 11%;">
        <label for="" class="label-filter">CSP</label>
        <input type="text"  ng-model="objetoEim.csp" id="scsp" placeholder="Ej: CSP#######"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-3" style="width: 11%;">
        <label for="" class="label-filter">COT</label>
        <input type="text"  ng-model="objetoEim.cot" id="scot" placeholder="Ej: COT#######"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 85px;">
        <button id="btn-asignada-salesforce" ng-click="consultarSinEimPm()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
    <div class="col-md-1">
    </div>
    <div class="col-md-3" style="width: 300px;">
        <select class="form-control form-control-sm custom-select" style="    font-size: .775rem;
    line-height: 1.5;
    top: 22px;
    position: absolute;" id="eim" ng-model="eim.Id">
            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
            <option value="{{ eim.Id }}" ng-repeat="eim in data.eims">
                {{ eim.Name }}
            </option>
        </select>
    </div>
    <div class="col-md-2" style="top: 22px;width: 200px; float: left; position: relative;left: 60px;">
        <button type="button" class="btn btn-primary ripple-surface" ng-click="asignarEim()">
            Asignar EIM
        </button>
    </div>
</div>
<tr>
<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tablecspSinEim" class="display table">
            <thead id="theadcspSinEim">
                <tr>
                    <th class="detail">
                       <div class="fht-cell" style="width: 20px;">
                         <input type="checkbox"  id="check_cspsineims" name="checkcspsineim" ng-click="cspsineimMasiva()">
                       </div>
                     </th>
                   <th>Oportunidad</th>
                   <th>Vertical</th>
                   <th>C&eacutelula</th>
                   <th>Cliente</th>
                   <th>COT</th>
                   <th>CSP</th>
                   <th>Fecha Venta</th>
                   <th>EIM</th>

                </tr>
            </thead>
        </table>
    </div>
</div>