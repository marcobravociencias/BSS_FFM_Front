
<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modal-jerarquia-filtro">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"> &Aacute;rbol geograf&iacute;a</h5>
        <button
          type="button"
          class="btn-close"
          data-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div style="padding-right=15px;padding-left:15px; max-height: 300px; overflow: auto;" class="modal-body">
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control form-control-sm typeahead" placeholder="Buscar cl&uacute;ster" id="text-search-cluster">
                        <button class="input-group-addon" id="search-arbol-cluster" ng-click="busqueda()" style="color: #bdbdbd; border:1px solid #bdbdbd !important"><i class="fa fa-search"></i></button>
                    												
					</div>
      
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Cerrar
        </button>
      </div>
  </div>
  
</div>