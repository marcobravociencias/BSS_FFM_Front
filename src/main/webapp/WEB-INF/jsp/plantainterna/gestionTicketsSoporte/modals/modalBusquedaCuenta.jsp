<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="modalBusquedaCuentaTicket" aria-hidden="true" id="modalBusquedaCuentaTicket">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header header-sin-border">
                <h5 class="modal-title header-title-tec" style="color: #7716fa">Asignar T&eacute;cnico</h5>
                <button type="button" class="close" data-mdb-dismiss="modal" aria-label="Close" id="closeModalTecnico">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid" id="container_pagos_tecnicos">
                    <div class="row filter-content">
                        <div class="col-2 offset-10 form-group">
                            <input placeholder="Buscar" type="text" autocomplete="off" style=" height: 2em !important;"
                                class="search-filtro form-control form-control-sm mt-0" id="searchTextCuenta"><i
                                class="fa fa-search icon-search" style="margin-top: -1.6em;"></i>
                        </div>
                    </div>
                    <div class="content-fluid" style="margin-top: 0.7em;">
                        <table id="tecnicosCuentaTable" class="display table" cellspacing="0" width="100%">
                            <thead id="thead_tecnicosCuenta">
                                <tr>
                                    <th>FOTO</th>
                                    <th>#TICKET</th>
                                    <th>FOLIO</th>
                                    <th>#EMPLEADO</th>
                                    <th>EMPLEADO</th>
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
            <div class="modal-footer border-tecnico-ticket">
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