<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalle">
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
                            <input class="form-check-input radio-evidencias" type="radio" name="inlineRadioOptions" id="aceptar" ng-click="seleciconarTodas('1')"
                                value="option1">
                            <label class="form-check-label" for="aceptar">Aceptar todas</i></label>
                        </div>
                        <div class="form-check form-check-inline radio-evidencias">
                            <input class="form-check-input radio-evidencias" type="radio" name="inlineRadioOptions" id="rechazar" ng-click="seleciconarTodas('0')"
                                value="option2">
                            <label class="form-check-label" for="rechazar">Rechazar todas</label>
                        </div>
                    </div>
                    <div class="row col-5 content-total">
                        <div class="col-4">
                            <span>Total evidencia: <strong>7</strong></span>
                        </div>
                        <div class="col-4">
                            <span>Aceptadas: <strong>0</strong></span>
                        </div>
                        <div class="col-4">
                            <span>Rechazadas: <strong>0</strong></span>
                        </div>
                    </div>
                    <div class="col-3" style="padding: 0;margin-top:0.2em">
                        <button type="button" class="btn btn-primary ripple-surface btn-descargar">
                            Descargar carta aceptaci&oacute;n
                        </button>
                    </div>
                </div>
                <div class="col-12">
                    <div class="imagen_content_evidencia">
                        <div class="imagen_content">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input checkbox-evidencia" id="exampleCheck1">
                              </div>
                            <div class="contenedor_img_evidencia">
                                <a href="./resources/img/generic/not_found.png" class="magnific item"
                                    data-title="Evidencia principal">
                                    <img class="z-depth-1 img_evidencia" ng-src="./resources/img/generic/not_found.png"
                                        width="180" height="130" />
                                </a>
                                <div class="middle_img_evidencia">
                                    <div class="text_img_evidencia">Evidencia principal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="imagen_content_evidencia">
                        <div class="imagen_content">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input checkbox-evidencia" id="exampleCheck1">
                              </div>
                            <div class="contenedor_img_evidencia">
                                <a href="./resources/img/generic/not_found.png" class="magnific item"
                                    data-title="Evidencia principal">
                                    <img class="z-depth-1 img_evidencia" ng-src="./resources/img/generic/not_found.png"
                                        width="180" height="130" />
                                </a>
                                <div class="middle_img_evidencia">
                                    <div class="text_img_evidencia">Evidencia principal</div>
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
            </div>
        </div>
    </div>
</div>