<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalGeografia">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Geograf&iacute;a</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style=" max-height: 300px; overflow: auto;">
        <div class="form-group">
          <div ng-show="!isGeneral">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeoConsultaUsuario"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="isGeneral">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeoGeneral"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
        </div>
        <div id="jstreeLogsUsuario" class="proton-demo jstreeconsulta" ng-show="!isGeneral"></div>
        <div id="jstreeLogsGeneral" class="proton-demo jstreeconsulta" ng-show="isGeneral"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>