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
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">IDC</label>
                        <input type="text" class="form-control" ng-model="detalleCaptura.tecnicoIDC" readonly/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Folio</label>
                        <input type="text" class="form-control" ng-model="detalleCaptura.ticket" readonly/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Plaza</label>
                        <input type="text" class="form-control" ng-model="detalleCaptura.ciudad" readonly />
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Distrito</label>
                        <input type="text" class="form-control" ng-model="detalleCaptura.distrito" readonly/>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Tel&eacute;fono</label>
                        <input type="text" class="form-control" ng-model="detalleCaptura.telefono" readonly />
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Escalada por</label>
                        <input type="text" class="form-control" ng-model="detalleCaptura.despachoNombre" readonly />
                    </div>
                </div>
                <hr>
                <div class="content-falla">
                    <p class="title">Tipo de falla</p>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Falla</label>
                        <select class="form-control custom-select" id="falla"
                            ng-model="detalleCaptura.nivel1" ng-change="loadCategoriaTicketSoporte()">
                            <option value="{{ falla.id }}" ng-repeat="falla in listFallasTicket">
                                {{ falla.descripcion }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Categor&iacute;a</label>
                        <select class="form-control custom-select" id="categoria"
                            ng-model="detalleCaptura.nivel2" ng-change="loadSubcategoriaTicketSoporte()">
                            <option value="{{ categoria.id }}" ng-repeat="categoria in listCategoriasTicket">
                                {{ categoria.descripcion }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Subcategor&iacute;a</label>
                        <select class="form-control custom-select"
                            ng-model="detalleCaptura.nivel3">
                            <option value="{{ subcategoria.id }}" ng-repeat="subcategoria in listSubcategoriasTicket">
                                {{ subcategoria.descripcion }}
                            </option>
                        </select>
                    </div>
                </div>
                <hr>
                <div class="row content-checkbox">
                    <div class="col-12 form-check form-switch">
                        <label class="col-6 label-modal">Se ejecuta aprovisionamiento de la ONT</label>
                        <input class="col-6 form-check-input" type="checkbox">
                    </div>
                </div>
                <hr>
                <div class="row content-checkbox">
                    <div class="col-12 form-check form-switch form-control-row">
                        <label class="col-6 label-modal">Es necesario cambio de equipo</label>
                        <input class="col-6 form-check-input" type="checkbox">
                    </div>
                </div>
                <hr>
                <div class="row content-checkbox">
                    <div class="col-12 form-check form-switch form-control-row">
                        <label class="col-6 label-modal">Se realiza un cobro al t&eacute;cnico</label>
                        <input class="col-6 form-check-input" type="checkbox">
                    </div>
                </div>
                <hr>
                <div class="content-comentarios">
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Comentarios</label>
                        <textarea class="form-control" ng-model="detalleCaptura.comentarios"></textarea>
                    </div>
                </div>
                <hr>
                <div class="content-checkbox">
                    <p class="title">Dictamen de folio</p>
                    <div class="row content-checkbox">
                        <div class="col-12 form-check form-switch form-control-row">
                            <label class="col-6 label-modal">Visita necesaria</label>
                            <input class="col-6 form-check-input" type="checkbox">
                        </div>
                    </div>
                    <div class="row content-checkbox">
                        <div class="col-12 form-check form-switch form-control-row">
                            <label class="col-6 label-modal">Problema solucinado</label>
                            <input class="col-6 form-check-input" type="checkbox"
                                ng-checked="detalleCaptura.problemaSolucionado == '1' ? true : false">
                        </div>
                    </div>
                </div>
                
                <div class="content-falla" ng-if="detalleCaptura.despachoNombre">
                    <hr>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Escalar ticket</label>
                        <select class="form-control custom-select" id="escalarTicket"
                            ng-model="detalleCaptura.escalarTicket" ng-change="loadMotivoEscala()">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{ escalaUno.id }}" ng-repeat="escalaUno in listMotivoEscala.catalogoNivel1">
                                {{ escalaUno.descripcion }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 form-group form-inline">
                        <label class="form-label label-modal">Motivo escalamiento</label>
                        <select class="form-control custom-select"
                            ng-model="detalleCaptura.motivoEscala">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{ escalaDos.id }}" ng-repeat="escalaDos in listMotivoEscala.catalogoNivel2">
                                {{ escalaDos.descripcion }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
                <button type="button" class="btn btn-primary" >
                    Guardar
                </button>
            </div>
        </div>
    </div>
</div>