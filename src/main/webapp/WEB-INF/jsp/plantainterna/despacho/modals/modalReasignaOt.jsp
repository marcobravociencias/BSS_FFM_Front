<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalReAsignacionOrdenTrabajo">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Reasignaci&oacute;n de orden  </h5>
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
                                <div class="container-text-content-ot"> <span class="text-content-asignacionmodal"  ng-bind="reAsignacionObject.otInfo.idOrden"></span> </div>
                            </div>   
                            <div class="container-fluid asignacionmodal-content">
                                <div class="container-text-title-ot">   <span class="text-tile-asignacionmodal">OS</span></div>
                                <div class="container-text-content-ot"> <span class="text-content-asignacionmodal"  ng-bind="reAsignacionObject.otInfo.folioOrden"></span> </div>
                            </div>   
                            <div class="container-fluid asignacionmodal-content">
                                <div class="container-text-title-ot">   <span class="text-tile-asignacionmodal">T&eacute;cnico</span></div>
                                <div class="container-text-content-ot"> <span class="text-content-asignacionmodal"  ng-bind="reAsignacionObject.tecnicoInfo.nombreCompleto"></span> </div>
                            </div>                            
                        </div>
                    </div>
                    <br/>
					<div class="row">
						<div class="col-12">
							<div class="form-group">
						   		<label for="exampleTextarea">Comentario:</label>
						   		<textarea ng-model="reAsignacionObject.comentario" class="form-control" style=" resize: none"  placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div class="modal-footer">
                <button ng-disabled="procesandoReasignacion" ng-click="reasignarOrdenTrabajo()" type="button" class="btn btn-primary">
                    <b ng-if="!procesandoReasignacion">Reasignar orden</b>
                    <b ng-if="procesandoReasignacion">Reasignando ...</b>
                </button>
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
           </div>
        </div>
    </div>
</div>