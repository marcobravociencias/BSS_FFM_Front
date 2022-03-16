<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modal-arbol-paquete">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Paquete</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" >
                <div class="col-md-12 mb-1" style="padding: 0;">
                    <div class="input-group input-group-sm content-seach-group ">
                        <input id="searhArbolPaquete" type="text" class="form-control buscadorGenerico" placeholder="Buscar paquete" ng-keyup="busquedaPaquete()"> 
                        <span class="fa fa-search iconoBusqueda"></span>
                    </div>
                </div>
                <div style=" max-height: 300px; overflow: auto;padding: 0;">
                    <div id="jstree-paquete" class="proton-demo jstreeconsulta"></div>
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