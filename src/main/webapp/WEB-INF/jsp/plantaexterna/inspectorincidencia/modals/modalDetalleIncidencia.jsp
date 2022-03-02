<div class="modal fade bd-example-modal-lg" aria-labelledby="modalDetalleIncidencia" aria-hidden="true"
    id="modalDetalleIncidencia">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalDetalleIncidencia"> Reporta: {{incidenciaDetalle.numeroEmpleado}} -
                    {{incidenciaDetalle.usuarioReporta}}</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style=" max-height: 300px; overflow: auto;">
                <div id="container-detalleIncidencia" class="container">
                    <div class="" id="acciones"></div>
                    <div class="row" style="padding: 0;">
                        <div style="padding-left: 0;" class="col-2" ng-show="isNavTab">
                            <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-incidencia" role="tablist"
                                aria-orientation="vertical">
                                <li class="nav-link active" id="informacion-incidencia">Informaci&oacute;n</li>
                                <li class="nav-link" id="detalle-status">Detalle Estatus</li>
                            </div>
                        </div>
                        <div class="col-10" id="containerModal">
                            <div class="container" id="containerFallas">
                                <!-- <li class="nav-link" id="acciones">Acciones</li> -->
                                <div id="tabsContainer" class="rowTabs">
                                    <div id="left-arrow" class="buttonLeftArrow" style="display: none;">
                                        <i class="fas fa-chevron-left" style="cursor: pointer" onclick="desplazarIzquierdaTabs()"></i>
                                    </div>
                                    <div id="containerTabsFalla" class="pl-0 pr-0 custom-slider-main">
                                        <ul class="nav nav-tabs tabHeader" id="headers_tab" role="tablist"></ul>
                                    </div>
                                    <div id="right-arrow" class="buttonRightArrow" style="display: none;">
                                        &nbsp;
                                        <i class="fas fa-chevron-right" style="cursor: pointer" onclick="desplazarDerechaTabs()"></i>
                                    </div>
                                </div>
                                <div id="content_tabs" class="tab-content"></div>
                            </div>
                            <div class="container" id="containerStatusFallas" style="display:none">
                                <div class="row">
                                    <div id="content_table_detalle_status" class="">
                                        <table id="tableDetalleStatus" class="display table" cellspacing="0"
                                            width="100%">
                                            <thead>
                                                <tr>
                                                    <th>#EMPLEADO</th>
                                                    <th>NOMBRE EMPLEADO</th>
                                                    <th>MOTIVO</th>
                                                    <th>FECHA</th>
                                                    <th>COMENTARIO</th>
                                                    <th><i class="fa fa-download"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="container-declinarIncidencia" class="col-12">
                    <div class="row">
                        <div id="content_drag_drop" class="col-7">
                            <div class="col-md-12" style="text-align: right; padding: 0px 25px 10px 15px !important;">
                            </div>
                            <div style="text-align: center;" class="col-md-12">
                                <form id="uploadFormEditaJust" name="13" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                                    <div class="box__input">
                                      <input name="myFile" type="file" class="box__file inputFile" id="fileArch" />
                                      <label for="fileArch" id="etiqueta_archivo_declina_inc">
                                        <strong class="text_select">Selecciona un archivo</strong>
                                        <span class="box__dragndrop">o arrastra aqu&iacute;</span>
                                      </label>
                                      <br />
                                      <div class="box__uploading"><i class="fas fa-cloud-upload-alt" style="display: block;"></i> </div>
                                  </div>
                              </form>
                            </div>
                        </div>
                        <!-- <div class="col-7" style="display: none;width:96%;" id="content_results">
                            <br />
                            <div class="card card-cascade narrower">
                                <div style="background: #773f85 ;"
                                    class="view view-cascade gradient-card-header  narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <button type="button"
                                            class="ocultar_results btn btn-outline-white btn-rounded btn-sm px-2 waves-effect waves-light">
                                            <i class="fa fa-minus mt-0"></i>
                                        </button>
                                    </div>
                                    <h6 class="white-text mx-3">LISTA DE ARCHIVOS</h6>
                                    <div>
                                        <button id="guardar_registros" type="button"
                                            class="btn btn-outline-white btn-rounded btn-sm px-2 waves-effect waves-light">
                                            <i class="fa fa-save mt-0"></i>
                                        </button>
                                    </div>
                                </div>
                                <div id="conten_table" class="px-4">
                                    <div class="table-wrapper">
                                        <table id="table_results" class="table table-hover mb-0">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Usuario</th>
                                                    <th>Nombre</th>
                                                    <th>FechaRegistro</th>
                                                    <th></th>
                                                    <th class="head_center"></th>
                                                </tr>
                                            </thead>
                                            <tbody id="bodyFile">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <div class="col-5">
                            <div class="col-md-12">
                                <label class="col-form-label">
                                    <p class="title_consulta">Motivo:</p>
                                </label>
                                <br>
                                <select id="select-motivo-rechazar"
                                    class="browser-default custom-select select_consulta" data-actions-box="true"
                                    ng-model="motivoRechazo.motivo"
                                    ng-options="motivo.idMotivo as motivo.motivo for motivo in listadoCatalogoRechazo">
                                    <option value="">Seleccione...</option>
                                </select>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-form-label">
                                        <p class="title_consulta">Comentario:</p>
                                    </label>
                                    <br />
                                    <textarea placeholder="Se sugiere un m&aacute;ximo de 50 caracteres."
                                        class="form-control comentario_modal" rows="3" id="comentariosRechazoPI"
                                        ng-model="motivoRechazo.comentario"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="pull-right">
                    <button type="button" class="btn btn-sm btn-primary btn-detalle-incindencia" ng-show="isRecuperar"
                        ng-click="recuperarIncidencia()">Recuperar</button>
                    <button type="button" class="btn btn-sm btn-primary btn-detalle-incindencia" ng-show="isGenerar"
                        ng-click="generarOTIncidencia()">Generar OT</button>
                    <button type="button" class="btn btn-sm btn-cerrar-modal" ng-show="isDeclinar"
                        ng-click="initDeclinarIncidencia()">Declinar</button>
                </div>
                <div class="pull-right" ng-show="isInitDeclinar">
                    <button type="button" class="btn btn-sm btn-cerrar-modal"
                        ng-click="cancelarDeclinar()">Cancelar</button>
                    <button type="button" class="btn btn-sm btn-primary btn-detalle-incindencia"
                        ng-click="declinarIncidencia(motivoRechazo)">Confirmar</button>
                </div>
            </div>
        </div>
    </div>