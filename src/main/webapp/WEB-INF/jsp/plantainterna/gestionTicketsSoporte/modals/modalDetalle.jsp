<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalle">
    <div class="modal-dialog" style="max-width: 700px !important;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Captura</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <span class="title" style="font-size: 1em;">Corroborar la informaci&oacute;n del soporte</span>
                <div class="content-principal">
                    <p class="title">Datos principales - Soporte</p>
                    <div class="container-fluid ticket-content">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">IDC</span></div>
                        <div class="container-text-content-detalle"><span class="text-content-ticket">SISTEMAS SISTEMAS2 VISUET</span></div>
                    </div>
                    <div class="container-fluid ticket-content">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">FOLIO</span></div>
                        <div class="container-text-content-detalle"><span class="text-content-ticket">103430445</span></div>
                    </div>
                    <div class="container-fluid ticket-content">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">PLAZA</span></div>
                        <div class="container-text-content-detalle"><span class="text-content-ticket">CIUDAD DE MEXICO-CENTRO</span></div>
                    </div>
                    <div class="container-fluid ticket-content">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">DISTRITO</span></div>
                        <div class="container-text-content-detalle"><span class="text-content-ticket">CONDESA D</span></div>
                    </div>                     
                    <div class="container-fluid ticket-content">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">TEL&Eacute;FONO</span></div>
                        <div class="container-text-content-detalle"><span class="text-content-ticket">7711828350</span></div>
                    </div>
                    <div class="container-fluid ticket-content">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">ESCALADA POR</span></div>
                        <div class="container-text-content-detalle"><span class="text-content-ticket">SISTEMAS SISTEMAS2 VISUET</span></div>
                    </div>
                    <div class="container-fluid ticket-content content-select-ticket-detalle">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">TIPO ORDEN</span></div>
                        <div class="container-text-content-detalle">
                            <select class="form-control form-controlt form-control-sm custom-select inputTicket" name="tipoOrdenTicketDetalle" id="tipoOrdenTicketDetalle" ng-model="ticketSoporteDetalle.tipoOrden">
                                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="instalacion" selected>INSTALACI&Oacute;N</option>
                                <option value="soporte" selected>SOPORTE</option>
                                <option value="addon" selected>ADDON</option>
                            </select>
                        </div>
                    </div>
                    <div class="container-fluid ticket-content">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">REGI&Oacute;N</span></div>
                        <div class="container-text-content-detalle">
                            <select class="form-control form-controlt form-control-sm custom-select inputTicket" name="regionTicketDetalle" id="regionTicketDetalle" ng-model="ticketSoporteDetalle.region">
                                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                <option value="colombia" selected>COLOMBIA</option>
                                <option value="mexico" selected>M&Eacute;XICO</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="content-checkbox">
                    <p class="title">Dictamen de folio</p>
                    <div class="container-fluid ticket-content">
                        <div class="container-text-title-detalle"><span class="text-tile-ticket">VISITA NECESARIO</span></div>
                        <div class="container-text-content-detalle form-check form-switch">
                            <input class="form-check-input" type="checkbox">
                        </div>
                    </div>
                    <div class="container-fluid ticket-content" ng-repeat="item in accionesDinamicasDetalle">
                        <div class="container-text-title-detalle titulo-acciones-dinamicas"><span class="text-tile-ticket">{{item.descripcion.toUpperCase()}}</span></div>
                        <div class="container-text-content-detalle form-check form-switch">
                            <input class="form-check-input" type="checkbox">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="content-falla">
                    <p class="title">Tipo de falla</p>
                    <div class="container-fluid ticket-content content-select-ticket-detalle">
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
                    <div class="container-fluid ticket-content content-select-ticket-detalle">
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
                    <div class="container-fluid ticket-content">
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
                <hr>            
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
            <div class="modal-footer">
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
                <button type="button" class="btn btn-primary" ng-click="guardarTicketDetalle()">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</div>