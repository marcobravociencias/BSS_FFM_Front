<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalleInformacionOtPendiente" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

			<div class="modal-header">
                <h5 class="modal-title">Informaci&oacute;n de la OT: {{otPendienteSeleccionada.OTInfo.ID_OT_PE}}</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" ng-click=""></button>
            </div>
            
            <div class="modal-body">
            	<div class="container">
	                <div class="row">
	                	<div class="col-md-7">
	                		<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-4">
									<span class="spanTituloDetalleOtPendienteModal">OT:</span>			                    		
								</div>				               
								<div class="col-md-8">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.ID_OT_PE"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-4">
									<span class="spanTituloDetalleOtPendienteModal">Fecha:</span>			                    		
								</div>				               
								<div class="col-md-8">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Fecha"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-4">
									<span class="spanTituloDetalleOtPendienteModal">Hora:</span>			                    		
								</div>				               
								<div class="col-md-8">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Hora"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-4">
									<span class="spanTituloDetalleOtPendienteModal">Tipo:</span>			                    		
								</div>				               
								<div class="col-md-8">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Tipo"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-4">
									<span class="spanTituloDetalleOtPendienteModal">Subtipo:</span>			                    		
								</div>				               
								<div class="col-md-8">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Subtipo"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-4">
									<span class="spanTituloDetalleOtPendienteModal">Unidad de negocio:</span>			                    		
								</div>				               
								<div class="col-md-8">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.UnidadNegocio"></span>
								</div>
							</div>
	                	</div>
	                	<div class="col-md-5">
	                		<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-3">
									<span class="spanTituloDetalleOtPendienteModal">Estatus:</span>			                    		
								</div>				               
								<div class="col-md-9">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Estatus"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-3">
									<span class="spanTituloDetalleOtPendienteModal">Estado:</span>			                    		
								</div>				               
								<div class="col-md-9">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Estado"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-3">
									<span class="spanTituloDetalleOtPendienteModal">Motivo:</span>			                    		
								</div>				               
								<div class="col-md-9">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Motivo"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-3">
									<span class="spanTituloDetalleOtPendienteModal">Latitud:</span>			                    		
								</div>				               
								<div class="col-md-9">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Latitud"></span>
								</div>
							</div>
							<div class="row filaContenedorDetalleOtPendienteModal">
								<div class="col-md-3">
									<span class="spanTituloDetalleOtPendienteModal">Longitud:</span>			                    		
								</div>				               
								<div class="col-md-9">
									<span class="spanTxtDetalleOtPendienteModal" ng-bind="otPendienteSeleccionada.OTInfo.Longitud"></span>
								</div>
							</div>
	                	</div>
	                </div>
                </div>
            </div>	
            
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-cerrar-modal" ng-click="" data-mdb-dismiss="modal" aria-label="Close">Cerrar</button>
            </div>
        </div>
    </div>
</div>