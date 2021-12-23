<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalRestablecerContrasena">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Restablecer contrase&ntilde;a</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12 form-group">
                    <label class="label-password">Nueva contrase&ntilde;a</label>
                    <input type="password" class="form-control form-control-sm" id="newPassword" maxlength="15"
                        autocomplete="new-password" />
                </div>
                <div class="col-12 form-group">
                    <label class="label-password">Confirmar contrase&ntilde;a</label>
                    <input type="password" autocomplete="new-password" class="form-control form-control-sm"
                        id="confirmPassword" maxlength="15" />
                </div>
                <div class="col-12 form-group">
                    <label class="label-password">Comentarios</label>
                    <textarea type="text" class="form-control form-control-sm" id="comentariosPassword"
                        maxlength="200"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" class="btn btn-primary ripple-surface" ng-click="restablecer()">
                    Restaurar
                </button>
            </div>
        </div>
    </div>
</div>