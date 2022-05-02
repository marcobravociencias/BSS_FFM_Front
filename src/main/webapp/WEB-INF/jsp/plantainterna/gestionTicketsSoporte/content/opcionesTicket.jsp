<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
    <button ng-click="cerrarDetalleTicket()" id="cerrar-gestion-ticket" type="button" class="btn-close"
        data-mdb-dismiss="modal" aria-label="Close">
    </button>

    <div class="right-content tab-content mt-5" ng-show="!isBusqueda">
        <jsp:include page="./detalleTicket.jsp"></jsp:include>
    </div>

    <div class="right-content tab-content mt-5" ng-show="isBusqueda" >
        <jsp:include page="./noticiasGestionTicketsSoporte.jsp"></jsp:include>
    </div>