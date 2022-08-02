<div class="modal img fade right show" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modal-imagen-ot" aria-hidden="true">
    <div class="modal-dialog img modal-notify" style="min-width: 95%;">
        <div class="modal-content">
            <div class="blue-gradient style_modal_header modal-header modal_header_bg" style="color: #fff; padding: 1em !important;">
                <h5 class="modal-title" style="color: #000000 !important;" id="exampleModalLabel">
                    OT: <span class="idoti"></span>
                </h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <jsp:include page="/WEB-INF/jsp/generic/evidencia/mainEvidencia.jsp"></jsp:include>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" ng-click="closeModal()" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>