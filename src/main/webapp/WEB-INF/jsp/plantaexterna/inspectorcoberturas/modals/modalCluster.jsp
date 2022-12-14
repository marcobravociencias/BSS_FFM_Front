<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalCluster">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Geograf&iacute;a</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style=" max-height: 300px; overflow: auto;">
                <div class="col-md-12" style="padding: 0;">
                    <div class="input-group input-group-sm content-seach-group">
                        <input id="searchGeografia" type="text" class="form-control buscadorGenerico"
                            placeholder="Buscar geograf&iacute;a">
                        <i class="fa fa-search iconoBusqueda"></i>
                    </div>
                </div>
                <div id="jstree-proton-3" class="proton-demo"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button class="btn card-footer btn-ligar" ng-disabled="!isPermisoLigarIncidencia"
                    id="btn-ligarIncidencia" ng-click="ligarIncidencias()">
                    LIGAR INCIDENCIAS
                </button>
            </div>
        </div>
    </div>
</div>