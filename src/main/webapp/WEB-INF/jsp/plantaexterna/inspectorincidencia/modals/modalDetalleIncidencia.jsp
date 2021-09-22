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
                    <div class="row">
                        <div style="padding-left: 0;" class="col-2">
                            <div id="headers_tab" class="nav flex-column nav-tabs text-center" role="tablist"
                                aria-orientation="vertical">
                            </div>
                        </div>
                        <div class="col-10"id="content_tabs">
                            <div class="contenedor_detalle row" id="content_tabs">
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