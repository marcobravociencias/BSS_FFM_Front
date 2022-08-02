<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
  id="modal_cluster_arbol_vehiculo">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Geograf&iacute;a</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style=" max-height: 300px; overflow: auto;">

        <div class="form-group">
          <div ng-show="jstreeType == 1">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeoConsulta"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="jstreeType == 2">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeoConsultaInactivo"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="jstreeType == 3">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeoAlta"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
        </div>
        <div id="jstreeconsulta" class="proton-demo jstreeconsulta" ng-show="jstreeType == 1"></div>
        <div id="jstreeconsultainactivos" class="proton-demo jstreeconsultainactivos" ng-show="jstreeType == 2"></div>
        <div id="jstreealta" class="proton-demo jstreealta" ng-show="jstreeType == 3"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>