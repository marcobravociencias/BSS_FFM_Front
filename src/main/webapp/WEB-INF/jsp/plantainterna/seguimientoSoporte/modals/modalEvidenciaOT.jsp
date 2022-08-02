<div class="modal img fade right show" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-evidenciaOT" aria-hidden="true">
    <div class="modal-dialog img modal-notify" style="min-width: 95%;">
        <div class="modal-content">
            <div class="blue-gradient style_modal_header modal-header modal_header_bg" style="color: #fff; padding: 1em !important;">
                <h5 class="modal-title" style="color: #000000 !important;" id="exampleModalLabel">
                    OT: <span class="idoti"></span>
                </h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div id="categorias_div" class="col-12">
                    <div ng-if="listEvidenciaImagenes.tipos.length">
                        <div class="row">
                            <div class="col-3" ng-if="listImagenesTipo.length">
                                <div class="col-12 content_category content_category_0">
                                    <div id="categoria_img_0" class="btn_categoria_img tipo_evidencia" ng-click="getEvidenciasImagenes(0)">
                                        <div class="total-imagen-evidencia">
                                            <span ng-bind="listEvidenciaImagenes.imagenes.length"></span>
                                        </div>
                                        <span class="label-tipo">TODOS</span>
                                    </div>
                                </div>
                                <div class="col-12 content_category content_category_{{tipo.id}}" ng-repeat="tipo in listEvidenciaImagenes.tipos" ng-click="getEvidenciasImagenes(tipo.id)">
                                    <div id="categoria_img_{{tipo.id}}" class="btn_categoria_img tipo_evidencia">
                                        <div class="total-imagen-evidencia">
                                            <span ng-bind="tipo.imagenes.length"></span>
                                        </div>
                                        <span class="label-tipo">{{tipo.descripcion}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-9 imagenes-evidencia-content" ng-if="listImagenesTipo.length">
                                <div class="imagen_content_evidencia" ng-repeat="img in listImagenesTipo">
                                    <div class="imagen_content">
                                        <div class="contenedor_img_evidencia">
                                            <a href="{{img.url ? img.url : './resources/img/generic/not_found.png'}}" class="magnific item imgtipo_{{img.idCatEvidencia}}" data-title="{{img.nombreEvidencia}}">
                                                <img class="z-depth-1 img_evidencia_ot" ng-src="{{img.url ? img.url : './resources/img/generic/not_found.png'}}" width="180" height="130" />
                                            </a>
                                            <div class="middle_img_evidencia">
                                                <div class="text_img_evidencia">{{img.nombreEvidencia}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 nodata-message" ng-if="!listEvidenciaImagenes.tipos.length">
                        <h5 style="color:#abafae;">
                            <i class="fa fa-exclamation-circle warning-nodata"></i>
                            No se encontr&oacute; evidencia
                        </h5>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" ng-click="closeModal()" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>