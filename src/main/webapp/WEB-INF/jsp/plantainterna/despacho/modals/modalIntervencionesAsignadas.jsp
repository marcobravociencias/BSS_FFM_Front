<!-- Modal -->
<div class="modal fade" tabindex="-1" style="z-index: 1062 !important;" aria-labelledby="exampleModalLabel"
    aria-hidden="true" id="modal-intervencion-asignada">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="border-bottom: 1px solid #fff; padding-bottom: 0;">
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab-asignadas" role="tablist" style="padding-bottom: 1em;">
                        <button class="nav-link active" id="nav-inter-tab" data-toggle="tab" title="Intervenciones"
                            data-target="#nav-inter" type="button" role="tab" aria-controls="nav-inter" ng-click="isGeografia = false"
                            aria-selected="true"><i class="fas fa-briefcase"></i> Intervenciones asignadas</button>
                        <button class="nav-link" id="nav-geo-tab" data-toggle="tab" data-target="#nav-geo" title="Geograf&iacute;as" ng-click="isGeografia = true"
                            type="button" role="tab" aria-controls="nav-geo" aria-selected="false"><i
                                class="fas fa-search-location "></i> Geograf&iacute;as asignadas</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-inter" role="tabpanel"
                        aria-labelledby="nav-inter-tab">
                        <div class="input-group input-group-sm content-seach-group">
                            <input id="searchInterAsig" type="text" autocomplete="off"
                                class="form-control buscadorGenerico mr-1" placeholder="Buscar intervenci&oacute;n">
                            <span class="fa fa-search iconoBusqueda"></span>
                        </div>
                        <div id="jstree-intervencion-asignada" class="proton-demo mt-1"></div>
                    </div>
                    <div class="tab-pane fade" id="nav-geo" role="tabpanel" aria-labelledby="nav-geo-tab">
                        <div class="input-group input-group-sm content-seach-group">
                            <input id="searchGeoAsignadas" type="text" autocomplete="off"
                                class="form-control buscadorGenerico mr-1" placeholder="Buscar geograf&iacute;a">
                            <span class="fa fa-search iconoBusqueda"></span>
                        </div>
                        <div id="jstree-proton-asignadas" class="proton-demo mt-1"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>