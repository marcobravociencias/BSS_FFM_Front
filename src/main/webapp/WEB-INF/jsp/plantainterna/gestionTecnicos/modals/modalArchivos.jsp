<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-archivos-justificacion" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" style="color: #7716fa">Archivos</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="content-fluid" ng-show="!isCargaArchivos">
                        <div class="col-12 form-group" style="margin-bottom: 0; padding-left: 0;">
                            <i class="fas fa-plus-circle icon-back" ng-click="changeView()" title="Cargar Archivo"></i>
                            <!-- <span style="margin-bottom: 0.1em;">Cargar Archivo</span> -->
                        </div>
                        <table class="display table table-hover" width="100%" id="tableArchivosJustificacion">
                            <thead id="thead_archivosJustificacion">
                                <tr>
                                    <th>Usuario</th>
                                    <th>Nombre</th>
                                    <th>Fecha de Registro</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="content-fluid" ng-show="isCargaArchivos">
                        <div class="col-12 form-group" style="margin-bottom: 0; text-align: right;">
                            <i class="fas fa-arrow-circle-left icon-back" ng-click="changeView()" title="Regresar"></i>
                        </div>
                        <div id="content_drag_drop">
                            <div class="col-md-12" style="text-align: right;padding: 0px 25px 10px 15px !important;">       
                            </div> 
                              <div style="text-align: center; padding-left: 0;" class="col-md-12">
                                <form id="uploadFormEditaJust" name="13" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                                      <div class="box__input">
                                        <input name="myFile" type="file" class="box__file inputFile" ng-on-change="convertFile($event, 'archivos')" id="fileArch" />
                                        <label for="fileArch" id="etiqueta_archivo_edita_just">
                                          <strong class="text_select">Selecciona un archivo</strong>
                                          <span class="box__dragndrop">o arrastra aqu&iacute;</span>
                                        </label>
                                        <br />
                                        <div class="box__uploading"><i class="fas fa-cloud-upload-alt" style="display: block;"></i> </div>
                                        <br />
                                        <button type="button" ng-click="agregarArchivoJustificacion()" class="btn_subir_archivo btn btn-sm btn-blue-grey">Subir Archivo</button>
                                    </div>
                                </form>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>