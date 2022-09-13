<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalFiltroIntervencionDispV2">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Filtrar Intervenciones</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style=" max-height: 300px; overflow: auto;">
                <div class="input-group input-group-sm content-seach-group">
                    <input id="buscadorIntervencion" type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar intervenci&oacute;n" ng-model="searchIntervencion">
                </div>
                <div class="col-12 col-intervenciones">
                    <div class="row">
                        <div class="col-10" ng-click="checkAllIntervencionDispV2()">
                            <span class="label-filtro-intervenciones" for="">Todos</span>
                        </div>
                        <div class="col-2">
                            <div class="checkbox">
                                <input type="checkbox" id="ckeckAllIntervencionDispV2" checked ng-click="checkAllIntervencionDispV2()">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-intervenciones" ng-repeat="intervencion in listaIntervencionesDispV2 | filter:searchIntervencion">
                    <div class="row">
                        <div class="col-10" ng-click="checkIntervencionDispV2(intervencion)">
                            <span class="label-filtro-intervenciones">{{intervencion.nombre}}</span>
                        </div>
                        <div class="col-2">
                            <div class="checkbox">
                                <input type="checkbox" value="true" ng-checked="intervencion.isVisible" ng-click="checkIntervencionDispV2(intervencion)">
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>