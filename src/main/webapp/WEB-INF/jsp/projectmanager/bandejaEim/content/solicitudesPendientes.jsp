
<div class="row" id="">
  <div class="col-md-2" style="width: 11%;">
    <label for="" class="label-filter">Cliente</label>
    <input type="text" id="spCliente" placeholder="Ej: Audi"
           class="form-control input-filtro-coordInst form-control-sm">
  </div>
  <div class="col-md-2" style="width: 11%;">
    <label for="" class="label-filter">N&uacutem. CSP's</label>
    <input type="text" id="spCsp" placeholder="Ej: 5"
           class="form-control input-filtro-coordInst form-control-sm">
  </div>
  <div class="col-md-2" style="width: 11%;">
    <label for="" class="label-filter">COT</label>
    <input type="text" id="spCot" placeholder="Ej: COT#######"
           class="form-control input-filtro-coordInst form-control-sm">
  </div>

  <div class="col-md-2" style="width: 85px;">
    <button id="btn-calendarizado-salesforce" ng-click="consultarSolicitudesPendientes()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
      <i class="fa fa-search" ></i>
    </button>
  </div>
</div>



<div class="row">
  <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
    <table id="tablesolicitudespendientes" class="table">
      <thead id="theadsolicitudespendientes">
      <tr>
        <!--th class="detail">
          <div class="fht-cell" style="width: 20px;">
            <input type="checkbox" id="check_solpendientes" name="check">
          </div>
        </th-->
        <th>Oportunidad</th>
        <th>Vertical</th>
        <th>C&eacutelula</th>
        <th>Cliente</th>
        <th>COT</th>
        <th>N&uacutem. CSP's </th>
        <th>Fecha Venta</th>
        <th>EIM</th>
        <th>Tipo</th>
        <th>Fecha Solicitud</th>
        <th>Dilaci&oacuten</th>
      </tr>
      </thead>
    </table>
  </div>
</div>