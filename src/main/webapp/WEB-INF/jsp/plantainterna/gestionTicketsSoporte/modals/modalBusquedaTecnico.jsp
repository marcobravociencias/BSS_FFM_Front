<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalBusquedaTecnicosTicket" aria-hidden="true" id="modalBusquedaTecnicosTicket">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header header-sin-border">
                <h5 class="modal-title header-title-tec" style="color: #7716fa">Asignar T&eacute;cnico</h5>
                <button type="button" class="close" data-mdb-dismiss="modal" aria-label="Close" id="closeModalTecnico">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <div class="row" style="margin-right: 3%;">
                        <div class="col-11" style="margin-left: 7%;">
                            <input placeholder="Buscar" type="text" autocomplete="off" class="search-filtro form-control form-control-sm mt-0" id="searchTecnicoTicket">
                            <i class="fa fa-search icon-search"></i>
                        </div>
                    </div>
                </div>
                <div ng-repeat="tecnico in listadoTecnicosTicket" style="margin-right: 10%; margin-left: 10%;">
                    <div id="{{tecnico.id}}" class="valign-wrapper tecnicosDiv" ng-class="{'tecnico_seleccionado':ticketSoporteR.idTecnico==tecnico.id}" ng-click="seleccionarTecnicoTicket(tecnico)">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-2 media-image online pr-0" style="padding-left: 0;">
                                    <img src="./resources/img/plantainterna/despacho/tecnicootasignada.png"
                                        class="circle z-depth-2 responsive-img">
                                </div>
                                <div id="{{tecnico.id}}" class="col-8 pl-0">
                                    <p class="text-tecnico-nombre">{{tecnico.nombre}}</p>
                                    <p class="text-adds-teccnico">{{tecnico.telefono}}</p>
                                </div>
                                <div class="col-2 icono_check_tecnico mt-1" style="display:none;">
                                    <i id="checkTecnico" style="color: rgb(0, 128, 0); margin-top: 0.4em; float: right;"
                                        class="fa fa-check fa-2" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-tecnico-ticket">
                <button type="button" class="btn btn-cerrar-modal" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>