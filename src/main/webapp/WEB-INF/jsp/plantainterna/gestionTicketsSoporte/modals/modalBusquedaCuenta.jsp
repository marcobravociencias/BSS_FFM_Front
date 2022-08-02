<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="modalBusquedaCuentaTicket"
    aria-hidden="true" id="modalBusquedaCuentaTicket">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header header-sin-border">
                <h5 class="modal-title header-title-tec">Ordenes de trabajo</h5>

                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid" id="container_pagos_tecnicos">
                    <div style="padding: 0" class="col-12">
                        <div class="table-responsive">
                            <table id="tecnicosCuentaTable" class="display table" cellspacing="0" width="100%">
                                <thead id="thead_tecnicosCuenta">
                                    <tr>
                                        <th>FOTO</th>
                                        <th>OT</th>
                                        <th>FOLIO</th>
                                        <th>#EMPLEADO</th>
                                        <th>#USUARIO</th>
                                        <th>NOMBRE</th>
                                        <th>TEL&Eacute;FONO</th>
                                        <th>ASIGNAR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer ">
                <button type="button" class="btn btn-cerrar-modal" data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" class="btn btn-primary btn-asignarTecnico" ng-click="asignarTecnicoTicket()">
                    Asignar
                </button>
            </div>
        </div>
     
    </div>
</div>
</div>