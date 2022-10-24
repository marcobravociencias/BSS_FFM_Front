
<div class="row" id="">


    <div class="column-style-consulta" style="width: 11%;">
        <label  class="label-filter">Cluster</label>
        <input type="text" id="iCluster" placeholder=""
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label  class="label-filter">Region</label>
        <input type="text"  id="iRegion" placeholder=""
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    
    <div class="column-style-consulta" style="width: 11%;">
      <label class="label-filter">CSP</label>
      <input type="text" id="iCsp" placeholder=""
             class="form-control input-filtro-coordInst form-control-sm">
  </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label  class="label-filter">Fecha</label>
        <input type="text" id="iFecha" placeholder="Ej: 24/05/2022"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label  class="label-filter">Estatus OT</label>
        <input type="text" id="iEstatusOT" placeholder=""
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 85px;">
        <button id="btn-calendarizado-salesforce" ng-click="consultarImplementacion()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
</div>
<br>
<div class="row">
<section class="text-center">
  <div class="row">
    <div class="col-lg-2 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative">
      <h5 class="text-muted fw-bold mb-2">13 oct 2022</h5>
      <h6 class="text-primary mb-0">Hoy</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">20</h5>
      <h6 class="text-primary mb-0">OTs Programadas</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">15</h5>
      <h6 class="text-primary mb-0">OTs en Transito</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">56</h5>
      <h6 class="text-primary mb-0">OTs en Sitio</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">43</h5>
      <h6 class="text-primary mb-0">Terminadas</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">80 %</h5>
      <h6 class="text-primary mb-0">Cumplimiento del D&iacute;a</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

  </div>
</section>
</div>

<div class="row">
    <div class="col-12 table-responsive" style="margin-top: 1em; padding: 0;">
        <table id="tableimplementacion" class="table">
            <thead id="theadimplementacion">
                <tr>
                    <th class="detail">
                        <div class="fht-cell" style="width: 20px;"></div>
                    </th>
                    <th>CSP</th>
                    <th>Cotizacion</th>
                    <th>Idbrm</th>
                    <th>Cuenta factura</th>
                    <th>Tipo cuadrilla</th>
                    <th>Num. OS</th>
                    <th>Estatus de OS</th>
                </tr>
            </thead>
        </table>
    </div>
</div>
