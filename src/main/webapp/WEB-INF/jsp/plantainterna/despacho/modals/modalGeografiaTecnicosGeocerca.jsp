<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalGeografiaTecnicosGeocerca">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Geograf&iacute;a</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style=" max-height: 300px; overflow: auto;">
                <div class="input-group input-group-sm content-seach-group">
                    <input id="buscadorGeografiaAsignarGeocerca" type="text" autocomplete="off" class="form-control buscadorGenerico" ng-keyup="busquedaGeografiaAsignarGeocerca()" placeholder="Buscar geograf&iacute;a">
                    <span class="fa fa-search iconoBusqueda"></span>
                </div>
                <div id="geografiaTecnicosGeocerca" class="proton-demo"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button class="btn card-footer btn-asignarGeocerca" id="btn-asignarGeocerca" ng-click="asignarTecnicosGeocerca()">
                    ASIGNAR T&Eacute;CNICOS
                </button>
            </div>
        </div>
    </div>
</div>