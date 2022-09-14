<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modalDetalleActivacionJustificacion" aria-hidden="true">
    <div class="modal-dialog modal-lg cascading-modal" >
        <div class="modal-content" >
            <div class="modal-header blue-gradient modal_header_bg" >
                <h5 style="font-weight: bold;" class="modal-title header-title" ng-bind="'Activaci\u00F3n  '+objectglobalactivacion.numeroCuentaFactura"></h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body" >
                <div class="container">          
					<div class="row align-items-center">
                        <div class="col-12">
                            <div class="form-group">
                                <label class="form-label" for="archivo-evidencia">Evidencia:</label>
                                <input ng-class="{ 'invalidate-campo'  : isValidateActivacionError && isValidateFileActivacion }" type="file" class="form-control"
                                 id="archivo-evidencia" onchange="angular.element(this).scope().fileNameChangedActivacion()"/>                                         
                            </div>
                        </div>
						<div class="col-12">
							<div class="form-group">
								<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"  class="fa fa-user-circle-o fa-2x"></i>
								<label class="label-nombreTecnico-estatus" for="justificacion-motivos-activa">Justificaci&oacute;n:</label>
								<select ng-class="{ 'invalidate-campo'  : isValidateActivacionError && !elementActivacion.justificacion }" class="select-status-tecnico form-control" id="justificacion-motivos-activa"
                                    ng-model="elementActivacion.justificacion" ng-options="justif.descripcion for justif in litadoCatalogoJustificacion">
                                    <option value="">Seleccione ...</option>
							    </select>                                               
						  	</div>
						</div>
                        <div class="col-12">
							<div class="form-group">
								<i style="color: #34b5e5 !important;font-size: 1.5em;float: right;"  class="fa fa-user-circle-o fa-2x"></i>
								<label class="label-nombreTecnico-comentarios" for="comentario-justificacion-activa">Comentarios:</label>
                                <textarea ng-class="{ 'invalidate-campo':  isValidateActivacionError && !elementActivacion.comentarios }" ng-model="elementActivacion.comentarios" class="form-control" id="comentario-justificacion-activa" rows="4"></textarea>                            
						  	</div>
						</div>
					</div>		
					
				</div>  
            </div>
            <div class="modal-footer" style="display: flex !important;">                                
                <button  ng-click="activacionEquipos()" type="button" class="btn btn-primary btn-aceptar-modal">
                    Activar
                </button>
                <button type="button" class="btn btn-cerrar-modal cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>	