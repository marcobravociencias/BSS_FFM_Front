
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
      <div style="padding: 0" class="modal-body">
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control form-control-sm typeahead" placeholder="Buscar cl&uacute;ster" id="text-search-cluster">
                        <button class="input-group-addon" id="search-arbol-cluster" ng-click="busqueda()"><i class="fa fa-search"></i></button>
                    												
					</div>
					<div id="tree_arbol_empresarial" class="jstree-proton-3 proton-demo">
                    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>