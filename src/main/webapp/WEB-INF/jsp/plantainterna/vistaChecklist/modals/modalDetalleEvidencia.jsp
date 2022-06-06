<!-- Modal -->
<div class="modal img fade right show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    id="modalDetalle">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Detalle evidencia</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="row content-filters">
                    <div class="col-3 offset-2 content-select">
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
                            <span>Total evidencia: <strong ng-bind="detalleEvidencia.evidencias.length"></strong></span>
                        </div>
                        <div class="col-4">
                            <span>Aceptadas: <strong ng-bind="listaTotal.aceptadas || 0"></strong></span>
                        </div>
                        <div class="col-4">
                            <span>Rechazadas: <strong ng-bind="listaTotal.rechazadas || 0"></strong></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="col-12 content_category content_category_0">
                            <div id="categoria_img_0" class="btn_categoria_img tipo_evidencia"
                                ng-click="getEvidenciasImagenes(0)">
                                <div class="total-imagen-evidencia">
                                    <span ng-bind="detalleEvidencia.evidencias.length"></span>
                                </div>
                                <span class="label-tipo">TODOS</span>
                            </div>
                        </div>
                        <div class="col-12 content_category content_category_{{tipo.id}}"
                            ng-repeat="tipo in detalleEvidencia.tipos" ng-click="getEvidenciasImagenes(tipo.id)">
                            <div id="categoria_img_{{tipo.id}}" class="btn_categoria_img tipo_evidencia">
                                <div class="total-imagen-evidencia">
                                    <span ng-bind="tipo.imagenes.length"></span>
                                </div>
                                <span class="label-tipo">{{tipo.descripcion}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-7" style="height: 23em; overflow-y: auto;direction: rtl;text-align: center;">
                        <div class="imagen_content_evidencia" ng-repeat="img in listImagenesTipo">
                            <div class="imagen_content">
                                <div class="form-check">
                                    <input type="checkbox" ng-click="changeSelect($event)" id="check_{{img.id}}"
                                        class="form-check-input checkbox-evidencia" ng-class="{'rechazada-check':img.idEstatus == 3}">
                                </div>
                                <div class="contenedor_img_evidencia">
                                    <a href="{{img.url ? img.url : './resources/img/generic/not_found.png'}}"
                                        class="magnific item imgtipo_{{img.idEvidencia}}"
                                        data-title="{{img.nombreEvidencia}}">
                                        <img class="z-depth-1 img_evidencia"
                                            ng-src="{{img.url ? img.url : './resources/img/generic/not_found.png'}}"
                                            width="180" height="130" />
                                    </a>
                                    <div class="middle_img_evidencia">
                                        <div class="text_img_evidencia">{{img.clasificacion}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 p-0">
                        <div class="content-img">
                            <img id="fotoTecnico" src="" alt="Foto" width="70" height="70" class="imgFoto"
                                ng-click="showImage('tecnico')">
                        </div>
                        <div class="content-info mt-2" style="text-align: center;">
                            <div class="container-text-content-detalle"><span class="text-content ng-binding"
                                    ng-bind="detalleEvidencia.nombreCompleto || 'Sin dato'"></span>
                            </div>
                            <div class="container-text-content-detalle"><i
                                    class="icon-user-detalle fas fa-hashtag"></i><span class="text-content ng-binding"
                                    ng-bind="detalleEvidencia.numeroEmpleado || 'Sin dato'"></span>
                            </div>
                            <div class="container-text-content-detalle"><i
                                    class="icon-user-detalle fas fa-id-badge"></i><span class="text-content ng-binding"
                                    ng-bind="detalleEvidencia.usuario || 'Sin dato'"></span>
                            </div>
                            <div class="container-text-content-detalle"><i
                                    class="icon-user-detalle fas fa-phone-alt"></i><span class="text-content ng-binding"
                                    ng-bind="detalleEvidencia.numeroCelular || 'Sin dato'"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <span class="text-content text-external-link">Descargar carta aceptaci&oacute;n</span>
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cancelar
                </button>
                <button type="button" ng-click="guardarEvidencia()" class="btn btn-primary btn-guardar ripple-surface"
                    style="height: 2.95em">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</div>