<div class="modal fade bd-example-modal-lg" tabindex="-1" aria-labelledby="modalDetalleIncidencia" aria-hidden="true"
    id="modalDetalleIncidencia">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalDetalleIncidencia"> Reporta: {{incidencia.numeroEmpleado}} -
                    {{incidencia.reporta}}</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style=" max-height: 300px; overflow: auto;">
                <div class="container">
                    <div class="" id="acciones"></div>
                    <div class="col-12 row">
                        <div style="padding-left: 0;" class="col-2" ng-show="isNavTab">
                            <div class="nav flex-column nav-tabs text-center" id="v-tabs-tab-incidencia" role="tablist"
                                aria-orientation="vertical">
                                <li class="nav-link active" id="informacion-incidencia">Informaci&oacute;n</li>
                                <li class="nav-link" id="detalle-status">Detalle Status</li>
                            </div>
                        </div>
                        <div class="col-10">
                            <div class="container" id="containerFallas">
                                <!-- <li class="nav-link" id="acciones">Acciones</li> -->
                                <ul class="nav nav-tabs mb-3 nav-fill " id="headers_tab" role="tablist">
                                </ul>
                                <div id="content_tabs" class="tab-content"></div>
                            </div>
                            <div class="container" id="containerStatusFallas" style="display:none">
                                <div class="row">
                                    <div class="col-12">
                                        <div id="conten_table_detalle_status" class="">
                                            <div class="table-wrapper">
                                                <table id="tableDetalleStatus" class="table table-hover" cellspacing="0" width="100%">
                                                    <thead id="thead_detalleincidencia">
                                                        <tr>
                                                            <th>#EMPLEADO</th>
                                                            <th>NOMBRE EMPLEADO</th>
                                                            <th>MOTIVO</th>
                                                            <th>FECHA</th>
                                                            <th>COMENTARIO</th>
                                                            <th><i class="fa fa-download"></i></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="bodyFileDetallestatus">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>