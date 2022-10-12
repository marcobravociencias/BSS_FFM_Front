
<div class="row" id="">
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Vertical</label>
        <input list="pVerticales" type="text" id="iVertical" placeholder="Vertical"
               class="form-control input-filtro-coordInst form-control-sm">
        <datalist id="pVerticales">
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
        <input list="pCelulas"  id="iCelula"  placeholder="Celula" class="form-control input-filtro-coordInst form-control-sm">
        <datalist id="pCelulas">
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
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Oportunidad</label>
        <input type="text" id="iOportunidad" placeholder="Ej: Nombre Oportunidad"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <!--
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Regi&oacute;n</label>
        <input type="text" id="iRegion" placeholder="Ej: 65434"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    -->
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Fecha</label>
        <input type="text" id="iFecha" placeholder="Ej: DD/MM/AA"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Estatus de OT</label>
        <input type="text" id="iEstatus" placeholder="Ej: Confirmado"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
    <!--div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">Vertical</label>
        <input type="text" id="iVertical" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
       <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">C&eacute;lula</label>
        <input type="text" id="iCelula" placeholder="Ej: 23214"
        class="form-control input-filtro-coordInst form-control-sm">
    </div-->
    <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">EIM</label>
        <input type="text" id="iEim" placeholder="Ej: Nombre EIM"
        class="form-control input-filtro-coordInst form-control-sm">
    </div>
     <div class="col-md-2" style="width: 11%;">
        <label for="" class="label-filter">CSP</label>
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
      <h5 class="text-muted fw-bold mb-2">07 oct 2022</h5>
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
                    <th>Folio</th>
                    <th>Cotizacion</th>
                    <th>Idbrm</th>
                    <th>Cuenta Factura</th>
                    <th>Tipo de Cuadrilla</th>
                    <th>N&uacute;m OS</th>
                    <th>Estatus de Os</th>
                </tr>
            </thead>
        </table>
    </div>
</div>