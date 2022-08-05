<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalle">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Detalle</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div ng-if="permiso.nivel == 1">
                    <div class="content-info-general">
                        <h1 class="title-text">M&oacute;dulo</h1>
                        <div class="row">
                            <div class="col-6">
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Nombre</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Color</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Icono</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Unidad negocio</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Clave</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Color hover</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Fecha actualizaci&oacute;n</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Propietario</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="content-info">
                        <h1 class="title-text">Acciones</h1>
                        <div class="row">
                            <div class="col-6">
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Nombre</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                               
                            </div>
                            <div class="col-6">
                                <div class="container-fluid permiso-text">
                                    <div class="container-text-title-detalle"><span
                                            class="text-tile-permiso">Clave</span>
                                    </div>
                                    <div class="container-text-content-detalle"><span class="text-content-permiso"
                                            ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div ng-if="permiso.nivel == 2">
                    <div class="content-info-general">
                        <h1>Acci&oacute;n</h1>
                    </div>
                    <div class="content-info">

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>