<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalCluster">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Geograf&iacute;a</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="input-group input-group-sm contenedorBuscadorGeneral">
								<input id="buscadorGeografiaConsultaIncidencias" type="text" class="form-control txtBusquedaGeneral" placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaConsultaIncidencias()"> 
								<span class="fa fa-search iconoBusquedaGeneral"></span>
							</div>
						</div>
						<div class="col-md-12 "style=" max-height: 300px; overflow: auto;">
							<div class="container-treegeofria">
								<div id="jstree-proton-3" class="proton-demo">
								</div>
							</div>
						</div>
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