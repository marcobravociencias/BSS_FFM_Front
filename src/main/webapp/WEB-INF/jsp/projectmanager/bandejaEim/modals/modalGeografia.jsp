<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalGeografiaEim">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Geograf&iacute;a</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style=" max-height: 300px; overflow: auto;">
        <div class="form-group">
          <div ng-show="vistaCoordinacion == 1">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeo-1"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="vistaCoordinacion == 2">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeo-2"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="vistaCoordinacion == 3">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeo-3"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="vistaCoordinacion == 4">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeo-4"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="vistaCoordinacion == 5">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeo-5"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="vistaCoordinacion == 6">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
              style=" height: 2em !important;margin-bottom: 0.5em;"
              class="search-filtro form-control form-control-sm mt-0" id="searchGeo-6"><i
              class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
          <div ng-show="vistaCoordinacion == 7">
            <input placeholder="Buscar geograf&iacute;a" type="text" autocomplete="off"
                   style=" height: 2em !important;margin-bottom: 0.5em;"
                   class="search-filtro form-control form-control-sm mt-0" id="searchGeo-7"><i
                  class="fa fa-search icon-search" style="margin-top: -1.9em;"></i>
          </div>
        </div>
        <div id="jstreeGeografia-1" class="proton-demo jstreeconsulta" ng-show="vistaCoordinacion == 1"></div>
        <div id="jstreeGeografia-2" class="proton-demo jstreeconsulta" ng-show="vistaCoordinacion == 2"></div>
        <div id="jstreeGeografia-3" class="proton-demo jstreeconsulta" ng-show="vistaCoordinacion == 3"></div>
        <div id="jstreeGeografia-4" class="proton-demo jstreeconsulta" ng-show="vistaCoordinacion == 4"></div>
        <div id="jstreeGeografia-5" class="proton-demo jstreeconsulta" ng-show="vistaCoordinacion == 5"></div>
        <div id="jstreeGeografia-6" class="proton-demo jstreeconsulta" ng-show="vistaCoordinacion == 6"></div>
        <div id="jstreeGeografia-7" class="proton-demo jstreeconsulta" ng-show="vistaCoordinacion == 7"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>