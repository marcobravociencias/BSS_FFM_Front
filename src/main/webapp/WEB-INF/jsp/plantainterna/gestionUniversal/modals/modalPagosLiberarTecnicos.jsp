<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalPagos">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Liberar pagos</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="padding: 0;">
                <div class="col-3 offset-9">
                    <div class="form-group ">
                        <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;"
                            class="search-filtro form-control form-control-sm mt-0" id="searchTextPagos"><i
                            class="fa fa-search icon-search"></i>
                    </div>
                </div>
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
                                <th>ACCIONES</th>
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
                <button type="button" class="btn btn-primary ripple-surface" ng-click="liberarPago()">
                    Liberar
                </button>
            </div>
        </div>
    </div>
</div>