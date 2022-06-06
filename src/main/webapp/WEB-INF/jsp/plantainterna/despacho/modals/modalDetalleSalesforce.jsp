<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- Modal -->
<div class="modal fade"  aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalleSalesforce">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title modal-title-despacho-pi">Detalle Salesforce </h5>
                <a class="btnCerrarModalDetalleOrdenOt" href="#" ng-click="cerrarModalDetalleSalesforce()"></a>
            </div>
            <div class="modal-body" style="min-height: 30em;">
                <div class="container">
                    <jsp:include page="/WEB-INF/jsp/generic/busquedaSalesforce/mainBusquedaSalesforce.jsp"></jsp:include>
                </div>
            </div>
            <!--div class="modal-footer">
                <button   type="button" class="btn btn-primary">
                    <b>Aceptar</b>
                </button>
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
           </div-->
        </div>
    </div>
</div>