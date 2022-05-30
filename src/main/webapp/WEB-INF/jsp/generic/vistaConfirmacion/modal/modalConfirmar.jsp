
<!-- Modal -->
<div class="modal fade"  id="modalConfirmaDesconfirma"
    data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
    >
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 ng-show="objConfirmaDesc.isConfirmadoDesconfirmado" class="modal-title" > Confirma OT</h5>
                <h5 ng-show="!objConfirmaDesc.isConfirmadoDesconfirmado" class="modal-title" > Desconfirma OT</h5>

                <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close" >
                </button>
            </div>
			<div class="modal-body">
				<div class="container">
                   <div ng-show="objConfirmaDesc.isConfirmadoDesconfirmado" class="col-12">
                       <h5 class="text-confirmaot" >&#191;Est&aacute;s seguro de confirmar la OT 
                           <p class="ptext-confirma" ng-bind="objConfirmaDesc.idOtConfirmaDesc"></p>?
                        </h5> 
                   </div>
                   <div ng-show="!objConfirmaDesc.isConfirmadoDesconfirmado" class="col-12">
                        <h5 class="text-desconfirmaot" >&#191;Est&aacute;s seguro de desconfirmar la 
                            OT <p class="ptext-desconfirma" ng-bind="objConfirmaDesc.idOtConfirmaDesc"></p >?
                        </h5>
                   </div>
                    <div class="col-12">
                        <div class="form-group">
                               <label for="exampleTextarea">Comentario:</label>
                               <textarea ng-model="objConfirmaDesc.comentarios" class="form-control" style=" resize: none"  placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" id="comentario-status-tecnico" rows="3"></textarea>
                        </div>
                    </div>
				</div>
			</div>
            <div class="modal-footer">
                <button ng-disabled="objConfirmaDesc.procesando" ng-click="confirmarDesconfirmarOt()" ng-show="objConfirmaDesc.isConfirmadoDesconfirmado" type="button" class="btn btn-primary btn-aceptar-modal">
                    {{!objConfirmaDesc.procesando ? 'Confirmar' : 'Procesando ... '}}
                </button>
                <button ng-disabled="objConfirmaDesc.procesando" ng-click="confirmarDesconfirmarOt()" ng-show="!objConfirmaDesc.isConfirmadoDesconfirmado"  type="button" class="btn btn-primary btn-aceptar-modal">
                    {{!objConfirmaDesc.procesando ? 'Desconfirmar' : 'Procesando ... '}}
                </button>
                <button type="button" ng-click="cancelarCambioEstatus()" class="btn cerrar-modal-btn btn-cerrar-modal btn-ligh " data-mdb-dismiss="modal">
                    Cancelar
                </button>
           </div>
        </div>
    </div>
    
</div>