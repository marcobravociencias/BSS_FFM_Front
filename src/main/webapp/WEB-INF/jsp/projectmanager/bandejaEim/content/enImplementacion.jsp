
<div class="row" id="">

    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Vertical</label>
        <input list="iVerticales" type="text" id="iVertical" placeholder="Vertical"
               class="form-control input-filtro-coordInst form-control-sm">
        <datalist id="iVerticales">
            <option value="Carriers">
            <option value="Gobierno Federal">
            <option value="Estatre&aacute;gicas I">
            <option value="Estatre&aacute;gicas II">
            <option value="Estatre&aacute;gicas III">
            <option value="Estatre&aacute;gicas IV">
        </datalist>
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label class="label-filter">Celula</label>
        <input list="iCelulas"  id="iCelula"  placeholder="Celula" class="form-control input-filtro-coordInst form-control-sm">
        <datalist id="iCelulas">
            <option value="Carriers">
            <option value="Gobierno Federal">
            <option value="Gobierno Federal">
            <option value="Finanaciero">
            <option value="Educacio&aacute;n">
            <option value="Retail y Hospitalidad">
            <option value="Noreste">
            <option value="Noroeste">
            <option value="Occidente">
            <option value="Toluca">
            <option value="CDMX">
            <option value="Bajio">
        </datalist>
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label  class="label-filter">EIM</label>
        <input type="text" id="iEim" placeholder="Ej: Nombre EIM"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label  class="label-filter">Cliente</label>
        <input type="text"  id="iCliente" placeholder="Ej: Audi"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label  class="label-filter">Tipo de Sitio</label>
        <input type="text" id="iTipoSitio" placeholder="Ej: Tipo de Sitio"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label  class="label-filter">COT</label>
        <input type="text" id="iCot" placeholder="COT#######"
               class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="column-style-consulta" style="width: 11%;">
        <label class="label-filter">CSP</label>
        <input type="text" id="iCsp" placeholder="Ej: CSP#######"
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
      <h5 class="text-muted fw-bold mb-3">{{data.detalleOS[0].asignada}}</h5>
      <h6 class="text-primary mb-0">OTs Programadas</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">{{data.detalleOS[0].transito}}</h5>
      <h6 class="text-primary mb-0">OTs en Transito</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">{{data.detalleOS[0].sitio}}</h5>
      <h6 class="text-primary mb-0">OTs en Sitio</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">{{data.detalleOS[0].terminado}}</h5>
      <h6 class="text-primary mb-0">Terminadas</h6>
      <div class="vr vr-blurry position-absolute my-0 h-100 d-none d-md-block top-0 end-0"></div>
    </div>

    <div class="col-lg-2 col-md-6 mb-5 mb-md-0 position-relative">
      <h5 class="text-muted fw-bold mb-3">{{(data.detalleOS[0].porcentaje.substr(0,4))}} %</h5>
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
                    <th>Vertical</th>
                    <th>Celula</th>
                    <th>EIM</th>
                    <th>Cliente</th>
                    <th>COT</th>
                    <th>CSP</th>
                    <th>OT</th>
                    <th>Cuenta</th>
                    <th>Fecha Venta</th>
                    <th>Tipo de Venta</th>
                    <th>Tipo de Sitio</th>
                    <th>Monto</th>
                    <th>Estatus</th>
                    <th>Fecha de Compromiso</th>
                    <th>Cuadrilla</th>
                    <th>Tipo de Servicio</th>
                </tr>
            </thead>
        </table>
    </div>
</div>