
<div class="row" id="">
  	<div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Oportunidad</label>
        <input type="text" ng-model="test" ng-change="limpiarCamposCalendarizada(3)" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Regi&oacute;n</label>
        <input type="text" ng-model="test" ng-change="limpiarCamposCalendarizada(1)" id="ot_calendarizado" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Fecha</label>
        <input type="text" ng-model="test" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Estatus de OT</label>
        <input type="text" ng-model="test" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Vertical / C&eacute;lula</label>
        <input type="text" ng-model="test" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">EIM</label>
        <input type="text" ng-model="test" ng-change="limpiarCamposCalendarizada(2)" id="os_calendarizado" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 85px;">
        <button id="btn-calendarizado-salesforce"   ng-model="test" ng-click="consultarCalendarizada()" type="button" class="btn btn-sm waves-effect waves-light btn-primary">
            <i class="fa fa-search" ></i>
        </button>
    </div>
</div>
<br>
<div class="row">
<section class="text-center">
  <div class="row">
    <div class="col-lg-2 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative">
      <h5 class="text-muted fw-bold mb-2">5000+</h5>
      <h6 class="text-primary mb-0">Hoy</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-5 mb-lg-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">490+</h5>
      <h6 class="text-primary mb-0">OTs Programadas</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">100+</h5>
      <h6 class="text-primary mb-0">OTs en Transito</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">28</h5>
      <h6 class="text-primary mb-0">OTs en Sitio</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">28</h5>
      <h6 class="text-primary mb-0">Terminadas</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">28</h5>
      <h6 class="text-primary mb-0">Cumplimiento del D&iacute;a</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

  </div>
</section>
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