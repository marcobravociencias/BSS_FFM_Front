<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalNuevoContacto">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Agregar Contacto</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style=" max-height: 300px; overflow: auto;">
                <form novalidate name="formAgregarContacto">
                    <div class="form-row form-row-creacion">
                        <div class="col-4 form-group">
                            <label for="nombreContacto" class="span-form-contacto">Nombre contacto </label>
                            <input type="text" maxlength="50" class="form-control form-control-sm inputContacto" id="nombreContacto" placeholder="Ej. Rom&aacute;n" ng-model="nuevoContactoAg.nombreContacto"/>
                        </div>
                        <div class="col-4 form-group">
                            <label for="aPaternoContacto" class="span-form-contacto">Apellido paterno</label>
                            <input type="text" maxlength="50" class="form-control form-control-sm inputContacto" id="aPaternoContacto" placeholder="Ej. Garc&iacute;a" ng-model="nuevoContactoAg.aPaterno"/>
                        </div>
                        <div class="col-4 form-group">
                            <label for="aMaternoContacto" class="span-form-contacto">Apellido materno </label>
                            <input type="text" maxlength="50" class="form-control form-control-sm inputContacto" id="aMaternoContacto" placeholder="Ej. P&eacute;rez" ng-model="nuevoContactoAg.aMaterno"/>
                        </div>
                    </div>
                    <div class="form-row form-row-creacion">
                        <div class="col-4 form-group">
                            <label for="emailContacto" class="span-form-contacto">Email </label>
                            <input type="email" maxlength="50" class="form-control form-control-sm inputContacto" id="emailContacto" placeholder="Ej. telrme@bmail.com" ng-model="nuevoContactoAg.email"/>
                        </div>
                        <div class="col-4 form-group">
                            <label for="sexoContacto" class="span-form-contacto">Sexo</label>
                            <select class="form-control form-control-sm custom-select inputContacto" id="generoContacto" name="generoContacto" ng-model="nuevoContactoAg.genero">
                                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="Masculino">MASCULINO</option>
                                <option value="Femenino">FEMENINO</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row form-row-creacion">
                        <div class="col-4 form-group">
                            <label for="telefonoFijoContacto" class="span-form-contacto">Tel&eacute;fono fijo</label>
                            <input type="text" onkeypress='return event.charCode >= 48 && event.charCode <= 57' minlength="10" maxlength="10" class="form-control form-control-sm inputContacto" id="telefonoFijoContacto"  ng-model="nuevoContactoAg.numeroFijo"/>
                        </div>
                        <div class="col-4 form-group">
                            <label for="celularContacto" class="span-form-contacto">Celular</label>
                            <input type="text" onkeypress='return event.charCode >= 48 && event.charCode <= 57' minlength="10" maxlength="10" class="form-control form-control-sm inputContacto" id="celularContacto" ng-model="nuevoContactoAg.numeroCelular"/>
                        </div>
                        <div class="col-4 form-group">
                            <label for="extensionContacto" class="span-form-contacto">Ext. </label>
                            <input type="text" maxlength="10" class="form-control form-control-sm" id="extensionContacto" ng-model="nuevoContactoAg.numeroExtension" />
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal" data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" ng-click="agregarContactoAgendamiento(nuevoContactoAg)" class="btn-aceptar-modal btn btn-sm ripple-surface">
                    Aceptar
                </button>
            </div>
        </div>
    </div>
</div>