<div class="col-md-12 ">

    <div class="row">      
        <div class="col-6">
            <div class="content-falla content-tipo-folio">
                <p class="title title-bloque-detalle">Tipo de falla</p>
                <div class="container-fluid ticket-content content-select-ticket-detalle content-select-">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">FALLA</span></div>
                    <div class="container-text-content-detalle">
                        <select class="form-control form-control-sm custom-select inputTicket" id="fallaTicketD" name="fallaTicketD" ng-change="loadCategoriaTicketSoporte('detalle')" ng-model="ticketSoporteDetalle.fallaTicketD">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{fallaTicketD.id}}" ng-repeat="fallaTicketD in listFallasTicketDetalle">
                                {{fallaTicketD.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content content-select-ticket-detalle content-select-">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">CATEGOR&Iacute;A</span></div>
                    <div class="container-text-content-detalle">
                        <select class="form-control form-control-sm custom-select inputTicket" id="categoriaTicketD" name="categoriaTicketD" ng-change="loadSubcategoriaTicketSoporte('detalle')" ng-model="ticketSoporteDetalle.categoriaTicketD">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{categoriaTicketD.id}}" ng-repeat="categoriaTicketD in listCategoriasTicketDetalle">
                                {{categoriaTicketD.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content content-select-">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">SUBCATEGOR&Iacute;A</span></div>
                    <div class="container-text-content-detalle">
                        <select class="form-control form-controlt form-control-sm custom-select inputTicket" id="subcategoriaTicketD" name="subcategoriaTicketD" ng-model="ticketSoporteDetalle.subcategoriaTicketD">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{subcategoriaTicketD.id}}"  ng-repeat="subcategoriaTicketD in listSubcategoriasTicketDetalle">
                                {{subcategoriaTicketD.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="content-checkbox content-dictamen-folio">
                <p class="title title-bloque-detalle">Dictamen de folio</p>
                <div class="container-fluid ticket-content opciones-checkbox-dictamen">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">VISITA NECESARIO</span></div>
                    <div class="container-text-content-detalle form-check form-switch">
                        <input class="form-check-input" type="checkbox">
                    </div>
                </div>
                <div class="container-fluid ticket-content opciones-checkbox-dictamen" ng-repeat="item in accionesDinamicasDetalle">
                    <div class="container-text-title-detalle titulo-acciones-dinamicas"><span class="text-tile-ticket">{{item.descripcion.toUpperCase()}}</span></div>
                    <div class="container-text-content-detalle form-check form-switch">
                        <input class="form-check-input" type="checkbox">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="content-principal">
                <p class="title title-bloque-detalle">Datos principales - Soporte</p>
                <div class="container-fluid vehiculo-content text-info-ot-text">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OT</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.id || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Folio</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.folioSistema || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. empleado</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.numEmpleado  || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. usuario</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.usuarioFFM  || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">T&eacute;cnico</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.nombreTecnico  || 'Sin dato'">222119</span> </div>
                </div>
              
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo orden</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.tipoOrden || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo negocio</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.unidadNegocio || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Regi&oacute;n</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.region || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Ciudad</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.ciudad || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Distrito</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.distrito || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Zona</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.zona || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cl&uacute;ster</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="tecnicoAsignado.cluster || 'Sin dato'">222119</span> </div>
                </div>
           
            </div>
        </div>
    </div>    
    <hr>
    <div class="row">
        <div class="col-6">

        </div>
        <div class="col-6">
            <div class="content-falla">
                <div class="container-fluid ticket-content content-select-ticket-detalle">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">ESTATUS TICKET</span></div>
                    <div class="container-text-content-detalle">
                        <select class="form-control form-controlt form-control-sm custom-select" name="estatusTicketDetalle" id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.estatus">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="escalacion" selected>ESCALAR</option>
                            <option value="cancela" selected>CANCELAR</option>
                            <option value="completa" selected>COMPLETADA</option>
                            <option value="reasigna" selected>REASIGNAR</option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content content-select-ticket-detalle" ng-show="ticketSoporteDetalle.estatus === 'escalacion'">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">ESTADO</span></div>
                    <div class="container-text-content-detalle">
                        <select class="form-control form-controlt form-control-sm custom-select" name="estatusTicketDetalle" id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.estado" ng-change="motivosSelectDetalle()">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option ng-value="item" ng-repeat="item in estadoEscalamientoDetalle">
                                {{item.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content content-select-ticket-detalle" ng-show="ticketSoporteDetalle.estatus === 'escalacion'">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">MOTIVO</span></div>
                    <div class="container-text-content-detalle">
                        <select class="form-control form-controlt form-control-sm custom-select" name="estatusTicketDetalle" id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.motivo">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option ng-value="item" ng-repeat="item in motivoEscalamientoDetalle">
                                {{item.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">COMENTARIOS</span></div>
                    <div class="container-text-content-detalle">
                        <textarea class="form-control" ng-model="ticketSoporteDetalle.comentarios"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>       
 

    <button type="button" class="btn btn-primary btn-editar-cambios ripple-surface">
        <b >Guardar cambios </b>        
    </button>
    <button ng-click="cerrarDetalleTicket()" type="button" class="btn cerrar-cancelar-btn  btn-ligh" data-mdb-dismiss="modal">
        Cancelar
    </button>
</div>