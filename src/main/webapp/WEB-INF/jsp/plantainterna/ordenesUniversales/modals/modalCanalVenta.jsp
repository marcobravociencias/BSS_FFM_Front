<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modal-canal-ventas">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Canal de ventas</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" >
                <div class="col-md-12 mb-1" style="padding: 0;">
                    <div class="input-group input-group-sm content-seach-group ">
                        <input id="searhArbolCanalVentas" type="text" class="form-control buscadorGenerico" placeholder="Buscar canal de ventas" ng-keyup="busquedaCanalVentas()"> 
                        <span class="fa fa-search iconoBusqueda"></span>
                    </div>
                </div>
                <div  style=" max-height: 300px; overflow: auto;padding: 0;">
                    <div id="jstree-canal-ventas" class="proton-demo jstreeconsulta"></div>
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