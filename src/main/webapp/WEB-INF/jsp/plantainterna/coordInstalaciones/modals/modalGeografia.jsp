<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modal-geografia">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> &Aacute;rbol geograf&iacute;a</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style=" max-height: 300px; overflow: auto;">
                <div id="jstree-pendiente" class="proton-demo" ng-show="showArbol === 1"></div>
                <div id="jstree-asignado" class="proton-demo" ng-show="showArbol === 2"></div>
                <div id="jstree-detenido" class="proton-demo" ng-show="showArbol === 3"></div>
                <div id="jstree-terminada" class="proton-demo" ng-show="showArbol === 4"></div>
                <div id="jstree-cancelada" class="proton-demo" ng-show="showArbol === 5"></div>
                <div id="jstree-calendarizar" class="proton-demo" ng-show="showArbol === 6"></div>
                <div id="jstree-gestoria" class="proton-demo" ng-show="showArbol === 7"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>