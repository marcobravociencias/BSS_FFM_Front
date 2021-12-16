<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalPagos">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Liberar pagos</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="content-fluid">
                    <table id="pagosLiberarTable" class="display table" cellspacing="0" width="100%">
                        <thead id="thead_pagos_liberar">
                            <tr>
                                <th>CLAVE CLIENTE</th>
                                <th>FOLIO</th>
                                <th>MONTO</th>
                                <th>FECHA REGISTRO</th>
                                <th>HORA</th>
                                <th>ESTATUS</th>
                                <th>FECHA CIERRE OT</th>
                                <th>INTERVENCI&Oacute;N</th>
                                <th>SUB-INTERVENCI&Oacute;N</th>
                                <th>LIBERAR</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" class="btn btn-primary ripple-surface" data-mdb-dismiss="modal">
                    Liberar
                </button>
            </div>
        </div>
    </div>
</div>