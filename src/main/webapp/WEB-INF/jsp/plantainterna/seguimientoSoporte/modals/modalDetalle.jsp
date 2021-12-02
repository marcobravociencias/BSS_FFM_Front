<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalle">
    <div class="modal-dialog" style="max-width: 700px !important;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Captura</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <span class="title" style="font-size: 1em;">Corroborar la informaci&oacute;n del soporte</span>
                <div class="content-principal">
                    <p class="title">Datos principales - Soporte</p>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">IDC</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.tecnicoIDC"/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Folio</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.ticket"/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Plaza</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.ciudad"/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Distrito</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.distrito"/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Tel&eacute;fono</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.telefono"/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Escalada por</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.despachoNombre"/>
                    </div>
                </div>
                <hr>
                <div class="content-falla">
                    <p class="title">Tipo de falla</p>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Falla</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.falla"/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Categor&iacute;a</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.categoria"/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Subcategor&iacute;a</label>
                        <input readonly type="text" class="form-control" ng-model="detalleCaptura.subCategoria"/>
                    </div>
                </div>
                <hr>
                <div class="row content-checkbox">
                    <div class="col-12 form-check form-switch">
                        <label class="col-6 label-modal">Se ejecuta aprovisionamiento de la ONT</label>
                        <input class="col-6 form-check-input" type="checkbox" disabled>
                    </div>
                </div>
                <hr>
                <div class="row content-checkbox">
                    <div class="col-12 form-check form-switch form-control-row">
                        <label class="col-6 label-modal">Es necesario cambio de equipo</label>
                        <input class="col-6 form-check-input" type="checkbox" disabled>
                    </div>
                </div>
                <hr>
                <div class="row content-checkbox">
                    <div class="col-12 form-check form-switch form-control-row">
                        <label class="col-6 label-modal">Se realiza un cobro al t&eacute;cnico</label>
                        <input class="col-6 form-check-input" type="checkbox" disabled>
                    </div>
                </div>
                <hr>
                <div class="content-comentarios">
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Comentarios</label>
                        <textarea readonly class="form-control" ng-model="detalleCaptura.comentarios"></textarea>
                    </div>
                </div>
                <hr>
                <div class="content-checkbox">
                    <p class="title">Dictamen de folio</p>
                    <div class="row content-checkbox">
                        <div class="col-12 form-check form-switch form-control-row">
                            <label class="col-6 label-modal">Visita necesaria</label>
                            <input class="col-6 form-check-input" type="checkbox" disabled>
                        </div>
                    </div>
                    <div class="row content-checkbox">
                        <div class="col-12 form-check form-switch form-control-row">
                            <label class="col-6 label-modal">Problema solucinado</label>
                            <input class="col-6 form-check-input" type="checkbox" disabled ng-checked="detalleCaptura.problemaSolucionado == '1' ? true : false">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</div>