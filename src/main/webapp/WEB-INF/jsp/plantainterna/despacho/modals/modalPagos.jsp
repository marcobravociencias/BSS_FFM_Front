<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<div class="modal fade" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalPagos">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title modal-title-despacho-pi" id="exampleModalLabel">Pagos pendientes</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-4">
                            <img  style="border: 0.3em {{tecnicoConsultaPagos.color}} solid;" ng-if="tecnicoConsultaPagos.urlFotoPerfil"   src="{{tecnicoConsultaPagos.urlFotoPerfil}}" height="180"  class="img-tecnico-materiales" alt="">
                            <img  style="border: 0.3em {{tecnicoConsultaPagos.color}} solid;" ng-if="!tecnicoConsultaPagos.urlFotoPerfil"  src="${pageContext.request.contextPath}/resources/img/plantainterna/despacho/tecnicootasignada.png" height="180"  class="img-tecnico-materiales" alt="">                
                        </div>
                        <div class="col-4">
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Estatus t&eacute;cnico</span></div>
                                <div class="container-text-content-detalle">
                                    <span style=" border-bottom: 0.2em solid {{tecnicoConsultaPagos.color}};
                                                font-weight: bold;
                                                color: {{tecnicoConsultaPagos.color}};"
                                        class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaPagos.descipcionEstatusTecnico || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Nombre</span></div>
                                <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaPagos.nombre+' '+tecnicoConsultaPagos.apellidoPaterno+' '+tecnicoConsultaPagos.apellidoMaterno || 'Sin dato'"></span>
                                </div>
                            </div>                        
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. empleado</span></div>
                                <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"  ng-bind="tecnicoConsultaPagos.numeroEmpleado || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Usuario FFM</span></div>
                                <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaPagos.usuarioFFM || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. contacto</span></div>
                                <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoConsultaPagos.numContacto || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4" style="text-align: center;">
                            <div ng-show="!tecnicoConsultaPagos.isPagosPendientes" class="card-icon icon-primary estatus-container-pagos">
                                <i class="fas fa-check"></i>
                            </div>
                            <span ng-show="!tecnicoConsultaPagos.isPagosPendientes" class="sin-pagos-pendientes">
                                Sin pagos pendientes
                            </span>

                            <div ng-show="tecnicoConsultaPagos.isPagosPendientes" class="card-icon icon-primary estatus-container-pagos-pendiente">
                                <i class="fas fa-exclamation"></i>                               
                            </div>
                            <span ng-show="tecnicoConsultaPagos.isPagosPendientes" class="con-pagos-pendientes">
                                Con pagos pendientes
                            </span>
                        </div>
                    </div>  
                    <div class="row">
                        <div class="col-12">

                            <table id="table-pagos-temp" class="display table table-hover" cellspacing="0" width="100%">
                                <thead id="thead_table">
                                    <tr>
                                        <th>Clave cliente</th>
                                        <th>OT</th>
                                        <th>Folio</th>
                                        <th>Fecha registro</th>
                                        <th>Fecha cierre OT</th>                                     
                                        <th>Intervenci&oacute;n</th>
                                        <th>Sub-intervenci&oacute;n</th>
                                        <th>Tiempo</th>
                                        <th>Tipo pago</th>
                                        <th>Monto</th>
                                        <th>Estatus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>



