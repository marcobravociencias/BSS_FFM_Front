<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>        
<button ng-click="cerrarDetalleTicket()" id="cerrar-gestion-ticket" type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
</button>

<div class="right-content tab-content">
    <ul class="nav nav-tabs" id="tabs-tickets" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="opcion-detalleticket-tab" data-toggle="tab" href="#opcion-detalleticket" role="tab"
                aria-controls="opcion-detalleticket" aria-selected="true" >Detalle del ticket</a>
        </li>
        <li ng-click="consultarOtsTecnicosTicket()" class="nav-item">
            <a class="nav-link " id="opcion-asignacioningenieroticket-tab" data-toggle="tab" href="#opcion-asignacioningenieroticket" role="tab"
                aria-controls="opcion-asignacioningenieroticket" aria-selected="false">Asignar a ingeniero</a>
        </li>
    
        <li class="nav-item">
            <a ng-click="mostrarChatterSalesforce()" class="nav-link " id="opcion-chatter-ticket-tab" data-toggle="tab" href="#opcion-chatter-ticket" role="tab"
                aria-controls="opcion-chatter-ticket" aria-selected="false">Gesti&oacute;n de evidencia</a>
        </li>
    </ul>
    <div class="tab-content" id="v-pills-tabtickets">
        <div class="tab-pane fade show active" id="opcion-detalleticket" role="tabpanel" aria-labelledby="opcion-detalleticket-tab">
            <jsp:include page="./detalleTicket.jsp"></jsp:include>       
        </div>
        <div class="tab-pane fade " id="opcion-asignacioningenieroticket" role="tabpanel" aria-labelledby="opcion-asignacioningenieroticket-tab">
            <jsp:include page="./asignarTicketIngeniero.jsp"></jsp:include>
        </div>
        <div class="tab-pane fade " id="opcion-chatter-ticket" role="tabpanel" aria-labelledby="opcion-chatter-ticket-tab">
            <jsp:include page="./noticiasGestionTicketsSoporte.jsp"></jsp:include>
        </div>
    </div>
</div>

