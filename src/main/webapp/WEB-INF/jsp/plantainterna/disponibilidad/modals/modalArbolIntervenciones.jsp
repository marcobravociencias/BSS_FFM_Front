<div class="modal fade" tabindex="-1" aria-hidden="true" id="modalArbolIntervencion">
	<div class="modal-dialog">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="exampleModalLabel">Intervenciones</h5>
		  <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"
		  ></button>
		</div>
		<div class="modal-body">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
					  <div class="input-group input-group-sm content-seach-group">
						  <input id="searchIntervencion" type="text" class="form-control buscadorGenerico" placeholder="Buscar intervenci&oacute;n" ng-keyup="busquedaIntervencionFiltro()"> 
						  <span class="fa fa-search iconoBusqueda"></span>
					  </div>
					</div>
					<div class="col-md-12 col-conteiner-arbol">
					  <div class="container-treegeofria">
						<div id="jstreeIntervencion" class="proton-demo"></div>
					  </div>
					</div>
				</div>
			</div>
		 
		</div>
		<div class="modal-footer">
		  <button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
			Cerrar
		  </button>
		</div>
	  </div>
	</div>
  </div>