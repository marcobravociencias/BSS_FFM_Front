<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalAsignacionOrdenTrabajo">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Asignaci&oacute;n de orden  </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close" >
                </button>
            </div>
			<div class="modal-body">
				<div class="container">                    
                    <div class="row">
                        <div class="col-12">
                            <div class="container-fluid asignacionmodal-content">
                                <div class="container-text-title-ot">   <span class="text-tile-asignacionmodal">OT</span></div>
                                <div class="container-text-content-ot"> <span class="text-content-asignacionmodal"  ng-bind="asignacionObject.otInfo.idOrden"></span> </div>
                            </div>   
                            <div class="container-fluid asignacionmodal-content">
                                <div class="container-text-title-ot">   <span class="text-tile-asignacionmodal">OS</span></div>
                                <div class="container-text-content-ot"> <span class="text-content-asignacionmodal"  ng-bind="asignacionObject.otInfo.folioOrden"></span> </div>
                            </div>   
                            <div class="container-fluid asignacionmodal-content">
                                <div class="container-text-title-ot">   <span class="text-tile-asignacionmodal">T&eacute;cnico</span></div>
                                <div class="container-text-content-ot"> <span class="text-content-asignacionmodal"  ng-bind="asignacionObject.tecnicoInfo.nombreCompleto"></span> </div>
                            </div>                            
                        </div>
                    </div>
                    <br/>
					<div class="row">
						<div class="col-12">
							<div class="form-group">
						   		<label for="exampleTextarea">Comentario:</label>
						   		<textarea ng-model="asignacionObject.comentario" class="form-control" style=" resize: none" ng-model="elementEstatusTecnico.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div class="modal-footer">
                <button ng-disabled="procesandoAsignacion" ng-click="cambioStatus('asigna')" type="button" class="btn btn-primary">
                    <b ng-if="!procesandoAsignacion">Asignar orden</b>
                    <b ng-if="procesandoAsignacion">Asignando ...</b>
                </button>
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
           </div>
        </div>
    </div>
</div>