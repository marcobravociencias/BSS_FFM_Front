<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalGeografia">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Geograf&iacute;a</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style=" max-height: 300px; overflow: auto;">
        <div class="form-group">
          <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;margin-bottom: 1em;"
            class="search-filtro form-control form-control-sm mt-0" id="searchGeoConsulta" ng-show="isTecnicos"><i
            class="fa fa-search icon-search" style="margin-top: -2.7em;"></i>
          <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;margin-bottom: 1em;"
            class="search-filtro form-control form-control-sm mt-0" id="searchGeoConsultaUsuarios"
            ng-show="!isTecnicos"><i class="fa fa-search icon-search" style="margin-top: -2.7em;"></i>
        </div>
        <div id="jstreeConsultaTecnicos" class="proton-demo jstreeconsulta" ng-show="isTecnicos"></div>
        <div id="jstreeConsultaUsuarios" class="proton-demo jstreeconsulta" ng-show="!isTecnicos"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>