<!-- Modal -->
<div class="modal img fade right show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalle">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Detalle evidencia</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="row content-filters">
                    <div class="col-4 content-select">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input radio-evidencias" type="radio" name="inlineRadioOptions"
                                id="aceptar" ng-click="seleciconarTodas('1')" value="option1">
                            <label class="form-check-label" for="aceptar">Aceptar todas</i></label>
                        </div>
                        <div class="form-check form-check-inline radio-evidencias">
                            <input class="form-check-input radio-evidencias" type="radio" name="inlineRadioOptions"
                                id="rechazar" ng-click="seleciconarTodas('0')" value="option2">
                            <label class="form-check-label" for="rechazar">Rechazar todas</label>
                        </div>
                    </div>
                    <div class="row col-5 content-total">
                        <div class="col-4">
                            <span>Total evidencia: <strong ng-bind="detalleEvidencia.length"></strong></span>
                        </div>
                        <div class="col-4">
                            <span>Aceptadas: <strong ng-bind="listaTotal.aceptadas || 0"></strong></span>
                        </div>
                        <div class="col-4">
                            <span>Rechazadas: <strong ng-bind="listaTotal.rechazadas || 0"></strong></span>
                        </div>
                    </div>
                    <div class="col-3" style="padding: 0;margin-top:0.2em">
                        <button type="button" class="btn btn-primary ripple-surface btn-descargar">
                            Descargar carta aceptaci&oacute;n
                        </button>
                    </div>
                </div>
                <div class="col-12" style="height: 23em; overflow-y: auto;">
                    <div class="imagen_content_evidencia" ng-repeat="img in detalleEvidencia">
                        <div class="imagen_content">
                            <div class="form-check">
                                <input type="checkbox" ng-click="changeSelect($event)" id="check_{{img.idEvidencia}}" class="form-check-input checkbox-evidencia">
                            </div>
                            <div class="contenedor_img_evidencia">
                                <a href="{{img.url ? img.url : './resources/img/generic/not_found.png'}}"
                                    class="magnific item imgtipo_{{img.idCatEvidencia}}"
                                    data-title="{{img.nombreEvidencia}}">
                                    <img class="z-depth-1 img_evidencia"
                                        ng-src="{{img.url ? img.url : './resources/img/generic/not_found.png'}}" width="180"
                                        height="130" />
                                </a>
                                <div class="middle_img_evidencia">
                                    <div class="text_img_evidencia">{{img.nombreEvidencia}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cancelar
                </button>
                <button type="button" class="btn btn-primary btn-guardar ripple-surface" style="height: 2.95em">
                   Guardar
                </button>
            </div>
        </div>
    </div>
</div>