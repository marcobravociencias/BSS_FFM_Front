<div class="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="modalAsignarTicket" aria-hidden="true"
    id="modalAsignarTicket">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header header-sin-border">
                <h5 class="modal-title header-title-tec" ng-if="editTicket.detalleTicketSc.numEmpleadoInge">Reasignar
                    ingeniero</h5>
                <h5 class="modal-title header-title-tec" ng-if="!editTicket.detalleTicketSc.numEmpleadoInge">Asignar
                    ingeniero</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid" id="container_tabla_ingenieros">
                    <div style="padding: 0" class="col-12">
                        <div class="table-responsive">
                            <table id="ingenierosTable" class="display table" cellspacing="0" width="100%">
                                <thead id="thead_ingenieros_table">
                                    <tr>
                                        <th>FOTO</th>
                                        <th>#EMPLEADO</th>
                                        <th>NOMBRE</th>
                                        <th>UBICACI&Oacute;N</th>
                                        <th>FECHA ACTUALIZACI&Oacute;N</th>
                                        <th>SELECCIONE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-tecnico-ticket">
                <button type="button" class="btn btn-cerrar-modal" data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" ng-click="siguienteAsignar()"
                    class="btn-aceptar-modal btn_modificar_disp btn btn-sm ripple-surface"><i class="fa fa-user"
                        aria-hidden="true"></i> Siguiente</button>
            </div>
        </div>
    </div>
</div>