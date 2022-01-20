<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-editar-justificacion" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" style="color: grey;">Editar Justificaci&oacute;n</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <div id="content_drag_drop" class="mt-4">
                                <div class="col-md-12" style="text-align: right;padding: 0px 25px 10px 15px !important;">       
                                </div> 
                                  <div style="text-align: center; padding-left: 0;" class="col-md-12">
                                    <form id="uploadFormEditaJust" name="13" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                                          <div class="box__input">
                                            <input name="myFile" type="file" class="box__file inputFile" id="fileEditaJust" />
                                            <label for="fileEditaJust" id="etiqueta_archivo_edita_just">
                                              <strong class="text_select">Selecciona un archivo</strong>
                                              <span class="box__dragndrop">o arrastra aqu&iacute;</span>
                                            </label>
                                            <br />
                                          </div>
                                        <div class="box__uploading"><i class="fas fa-cloud-upload-alt" style="display: block;"></i> </div>
                                    </form>
                                  </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="filtro_fecha_inicio_justificacion" class="span-form-tecnicos">Fecha inicio</label>
                                <input readonly type="text" id="filtro_fecha_inicio_justificacion" class="datepicker input-filtro-tecnico form-control form-control-sm" />
                            </div>
                            <div class="form-group">
                                <label for="filtro_fecha_fin_justificacion" class="span-form-tecnicos">Fecha fin</label>
                                <input readonly type="text" id="filtro_fecha_fin_justificacion" class="datepicker input-filtro-tecnico form-control form-control-sm" />
                            </div>
                            <div class="form-group">
                                <label for="motivoJustificacion" class="span-form-tecnicos">Motivo</label>
                                <select class="form-control form-controlt form-control-sm custom-select" name="motivo" id="motivoJustificacion" ng-model="justificacionE.motivo">
                                    <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                    <option value="{{motivo.idMotivo}}" ng-repeat="motivo in listMotivosJustificacion">
                                        {{motivo.Motivo}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-row">
                                <div class="col-12 form-group">
                                    <label class="span-form-tecnicos" for="comentarioEliminar">Comentario </label>
                                    <textarea class="form-control inputTicket content_text form-control-sm" style="resize: none" placeholder="Se sugiere un m&aacute;ximo de 50 caracteres" rows="3" id="comentarioEditar" ng-model="justificacionE.comentario"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-tecnico-ticket">
                <button type="button" class="btn btn-cerrar-modal" data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" class="btn btn-primary btn-justificacion" ng-click="">
                    Aceptar
                </button>
            </div>
        </div>
    </div>
</div>