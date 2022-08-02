<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="reporteModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Reporte veh&iacute;culos</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row">
                        <div class="col-8 offset-2 search-form form-group columna-filtro-ind-rep">
                            <label class="span-consulta"><i class="far fa-calendar"></i> Fecha inicio</label>
                            <input readonly type="text" placeholder="Fecha inicio"  id="filtro_fecha_inicio" class="datepicker datepickerReporte input-filtro form-control form-control-sm" style="border-radius: .5em !important;" />
                        </div>
                       
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button  ng-click="generarReporteControlVehicular()" type="button" class="btn btn-primary btn-aceptar-modal">
                    Generar
                </button>
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>