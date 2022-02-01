<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalPagos">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Liberar pagos</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="padding: 0;">
                <div class="col-2 offset-10">
                    <div class="form-group ">
                        <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;"
                            class="search-filtro form-control form-control-sm mt-0" id="searchTextPagos"><i
                            class="fa fa-search icon-search" style="margin-top: -1.5em;"></i>
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
                                <th>LIBERAR</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <div ng-show="accionesUserConfigText.indexOf('liberaPagos') === -1" class="text-accion-nopermiso">
                    <i class="icon-not-permiso fas fa-user-lock"></i>
                    <b class="text-not-permiso" style="font-weight: lighter;">No tienes permiso para liberar pagos</b>
                </div>
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" ng-show="accionesUserConfigText.indexOf('liberaPagos') !== -1" class="btn btn-primary ripple-surface" ng-click="liberarPago()">
                    Liberar
                </button>
            </div>
        </div>
    </div>
</div>