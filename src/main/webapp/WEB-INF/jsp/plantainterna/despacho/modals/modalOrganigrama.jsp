<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- Modal -->
<div class="modal fade"  aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalOrganigrama">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title modal-title-despacho-pi">Organigrama</h5>
                <a class="btnCerrarModalDetalleOrdenOt" href="#" ng-click="cerrarModalOrganigrama()"></a>
            </div>
            <div class="modal-body" style="min-height: 30em;">
                <div class="container">
                    <div style="width:100%; height:500px;" id="tree"> </div>
                </div>
            </div>
        </div>
    </div>
</div>