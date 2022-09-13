<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalCluster">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Geograf&iacute;a</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style=" max-height: 300px; overflow: auto;">
                <div ng-show="isPendienteAgendar">
                    <div class="input-group input-group-sm content-seach-group">
                        <input id="buscadorGeografiaPendienteAgendar" type="text" autocomplete="off" class="form-control buscadorGenerico" ng-keyup="busquedaGeografiaConsulta('pendienteAgendar')" placeholder="Buscar geograf&iacute;a">
                        <span class="fa fa-search iconoBusqueda"></span>
                    </div>
                    <div id="geografiaPendientesAgendar" class="proton-demo"></div>
                </div>
                <div ng-show="isRescataventas">
                    <div class="input-group input-group-sm content-seach-group">
                        <input id="buscadorGeografiaRescataventas" type="text" autocomplete="off" class="form-control buscadorGenerico" ng-keyup="busquedaGeografiaConsulta('rescataventas')" placeholder="Buscar geograf&iacute;a">
                        <span class="fa fa-search iconoBusqueda"></span>
                    </div>
                    <div id="geografiaRescataventas" class="proton-demo"></div>
                </div>
                <div ng-show="isPendienteActivar">
                    <div class="input-group input-group-sm content-seach-group">
                        <input id="buscadorGeografiaPendienteActivar" type="text" autocomplete="off" class="form-control buscadorGenerico" ng-keyup="busquedaGeografiaConsultaActivar('pendienteActivar')" placeholder="Buscar geograf&iacute;a">
                        <span class="fa fa-search iconoBusqueda"></span>
                    </div>
                    <div id="geografiaPendientesActivar" class="proton-demo"></div>
                </div>
            </div>
            <div class="modal-footer">
                <div ng-show="isPendienteAgendar">
                    <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" ng-click="btnAceptarGeografiaConsulta('pendientesAgendar')" data-mdb-dismiss="modal">
                        Cerrar
                    </button>
                </div>
                <div ng-show="isRescataventas">
                    <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" ng-click="btnAceptarGeografiaConsulta('rescataventas')" data-mdb-dismiss="modal">
                        Cerrar
                    </button>
                </div>
                <div ng-show="isPendienteActivar">
                    <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" ng-click="btnAceptarGeografiaConsulta('pendientesActivar')" data-mdb-dismiss="modal">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>