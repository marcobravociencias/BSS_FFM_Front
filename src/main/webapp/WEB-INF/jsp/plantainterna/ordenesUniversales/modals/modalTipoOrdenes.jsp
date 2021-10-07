<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modal-filtro-tipoordenes">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Tipo ordenes</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" >
                <div class="col-md-12 mb-2">
                    <div class="input-group input-group-sm content-seach-group ">
                        <input id="searhTipoOrdeneslnput" type="text" class="form-control buscadorGenerico" placeholder="Buscar " ng-keyup="busquedaTipoOrdenesFiltro()"> 
                        <span class="fa fa-search iconoBusqueda"></span>
                    </div>
                </div>
                <div class="col-md-12" style=" max-height: 300px; overflow: auto;">
                    <div id="jstree-tipoordenes" class="proton-demo"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-cerrar-modal" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>