<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalStatusOperario">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" > Estatus t&eacute;cnico</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close" >
                </button>
            </div>
			<div class="modal-body">
				<div class="container">
                    <div class="row align-items-center">
						<div class="col-12">
							<div class="form-group-tecnico form-group">
								<label class="label-group-tecnico" ng-bind="elementEstatusTecnico.tecnico.nombreCompleto"></label>							                                             
						  	</div>
						</div>
					</div>	
					<div class="row align-items-center">
						<div class="col-12">
							<div class="form-group">
								<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;" id="icono_operario_status" class="fa fa-user-circle-o fa-2x"></i>
								<label for="id-status-tecnico">Status:</label>
								<select style="border-left:.4em solid {{elementEstatusTecnico.status.hexaColor}}" class="form-control" id="id-status-tecnico" ng-model="elementEstatusTecnico.status" ng-options="estatus.descripcion for estatus in listadoEstatusTecnico">
                                    <option value="">Seleccione ...</option>
							    </select>                                               
						  	</div>
						</div>
					</div>		
					<div class="row">
						<div class="col-12">
							<div class="form-group">
						   		<label for="exampleTextarea">Comentario:</label>
						   		<textarea class="form-control" style=" resize: none" ng-model="elementEstatusTecnico.comentario" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div class="modal-footer">
            
				
				<div ng-show="accionesUserConfigText.indexOf('accionActualizaUS') === -1"  class="text-accion-nopermiso">
					<i class="icon-not-permiso fas fa-user-lock"></i>
					<b class="text-not-permiso">No tienes permiso para est&aacute; acci&oacute;n</b>
				</div>  
				<button ng-show="accionesUserConfigText.indexOf('accionActualizaUS') !== -1"  
						ng-disabled="procesandoEstatusTecnico" ng-click="cambiarEstatusOperario()" type="button" class="btn btn-primary">
                    <b ng-if="!procesandoEstatusTecnico">Cambiar estatus</b>
                    <b ng-if="procesandoEstatusTecnico">Cambiando ...</b>
                </button>

                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cerrar
                </button>

		
           </div>
        </div>
    </div>
</div>