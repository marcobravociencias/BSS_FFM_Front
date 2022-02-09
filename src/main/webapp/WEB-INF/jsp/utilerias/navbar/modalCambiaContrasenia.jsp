<div class="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" id="modalCambiaContraseniaLogin">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Restablecer contrase&ntilde;a</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <form >
                    <div class="col-12 form-group">
                        <label class="label-password mb-0">Contrase&ntilde;a actual</label>
                        <input type="password" autocomplete="new-password" class="form-control form-control-sm" id="actualPasswordUserLogin"
                            maxlength="20" />
                    </div>
                    <div class="col-12 form-group">
                        <label class="label-password mb-0">Nueva contrase&ntilde;a</label>
                        <input type="password" class="form-control form-control-sm" id="newPasswordUserLogin" maxlength="20"
                            autocomplete="new-password" />
                    </div>
                    <div class="col-12 form-group">
                        <label class="label-password mb-0">Confirmar contrase&ntilde;a</label>
                        <input type="password" autocomplete="new-password" class="form-control form-control-sm"
                            id="confirmPasswordUserLogin" maxlength="20" />
                    </div> 
                    <div class="message-password-warning" id="msj-valida" style="display: none;">
                        <span id="creedText"></span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cancelar
                </button>
                <button type="button" onclick="cambiarContraseniaUserLogin()"
                    class="btn btn-primary btn-guardar ripple-surface" style="height: 2.75em; padding: 0.5em 2em;">
                    Restaurar
                </button>
            </div>
        </div>
    </div>
</div>