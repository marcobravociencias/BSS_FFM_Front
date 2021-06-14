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
				</div>
			</div>
            <div class="modal-footer">
                <button ng-click="cambiarEstatusOperario()" ng-show="objConfirmaDesc.isConfirmadoDesconfirmado" type="button" class="btn btn-primary">
                    Confirmar
                </button>
                <button ng-click="cambiarEstatusOperario()" ng-show="!objConfirmaDesc.isConfirmadoDesconfirmado"  type="button" class="btn btn-primary">
                    Desconfirmar
                </button>
                <button type="button" ng-click="cancelarCambioEstatus()" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
           </div>
        </div>
    </div>
</div>