
<div class="row" id="">
  	<div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Cliente</label>
        <input type="text" id="vcliente" placeholder="Ej: Audi"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">N&uacutem. CSP's</label>
        <input type="text" id="vcsp" placeholder="Ej: 5"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">COT</label>
        <input type="text" id="vcot" placeholder="Ej: COT#######"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    
    <div class="col-md-2" style="width: 85px;">
        <button id="btn-calendarizado-salesforce" ng-click="consultarValidacion()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
    <div class="col-md-2">
    </div>
    <div class="col-md-3">
    </div>
    <div class="col-md-1" style="float:right; width: 42px; padding:27px; border: 3px;">
        <i class="icon-item fas fa-user alt" style="color:#577CE1;" role="button" data-prefix="far" ng-click="solTorreLiderTec(0,'v')" data-toggle="tooltip" data-placement="top" title="Solicitar L&iacute;der T&eacute;cnico y Torre de Control"></i>
    </div>
    <div class="col-md-1" style="float:right; width: 42px; padding:27px; border: 3px;">
        <i class="icon-item fas fa-user-minus alt" style="color:#577CE1;" role="button" data-prefix="far" ng-click="solTorreLiderTec(1, 'v')" data-toggle="tooltip" data-placement="top" title="No Requiere L&iacute;der T&eacute;cnico y Torre de Control"></i>
    </div>

</div>
        


<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tablevalidacion" class="table">
            <thead id="theadvalidacion">
                <tr>
                    <th class="detail">
                        <div class="fht-cell" style="width: 20px;">
                            <input type="checkbox"  id="check_validaciones" name="checkvalidacion" ng-click="validacionMasiva()">
                        </div>
                    </th>
                    <th>Oportunidad</th>
                    <th>Vertical</th>
                    <th>C&eacutelula</th>
                    <th>Cliente</th>
                    <th>COT</th>
                    <th>N&uacutem. CSP's </th>
                    <th>Fecha Venta</th>
                    <th>EIM</th>
                    <th>Tipo</th>
                </tr>
            </thead>
        </table>
    </div>
</div>