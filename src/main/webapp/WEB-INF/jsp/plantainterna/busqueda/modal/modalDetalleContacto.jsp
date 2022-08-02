<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalDetalleContacto">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <li class="fa fa-arrow-left retorno-perfil" ng-show="historialUsuario.length > 1" ng-click="regresarHistorialUsuario();"></li>
                <h5 class="modal-title" id="titulo-usuario"> Informaci&oacute;n del usuario</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-xl-6 col-md-6 mb-6 text-center">
                
                            <img  id="img-usuario" class="img-fluid z-depth-1 rounded-circle"
                              alt="Responsive image">
                        
                          </div>
                    </div>
                    <div class="row" style="margin-top: 1em; margin-bottom: 1em;">
                        <div class="col-md-12 crop-text-col text-center">
                            <Span class="titulo-info-usuario" title="{{detalleContacto.nombre}}" ng-bind="detalleContacto.nombre"></Span>
                        </div>
                    </div>
                    <hr>
                    <div class="row" style="margin-top: 1em;">
                        <div class="col-md-6 text-left">
                            <div class="row">
                                <div class="col-1">
                                    <i class="fa fa-address-book"></i>
                                </div>
                                <div class="col-10">
                                    <Span class="info-usuario-modal">Puesto:</Span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 crop-text-col text-center">
                            <Span class="info-usuario-modal" title="{{detalleContacto.puesto}}" ng-bind="detalleContacto.puesto"></Span>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 1em;">
                        <div class="col-md-6 text-left">
                            <div class="row">
                                <div class="col-1">
                                    <i class="fa fa-mobile fa-lg"></i>
                                </div>
                                <div class="col-10">
                                    <Span class="info-usuario-modal">Telefono:</Span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 crop-text-col text-center">
                            <Span class="info-usuario-modal" title="{{detalleContacto.telefono}}" ng-bind="detalleContacto.telefono"></Span>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 1em;">
                        <div class="col-md-6 text-left">
                            <div class="row">
                                <div class="col-1">
                                    <i class="fa fa-envelope"></i>
                                </div>
                                <div class="col-10">
                                    <Span class="info-usuario-modal">E-mail:</Span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 crop-text-col text-center">
                            <Span class="info-usuario-modal" title="{{detalleContacto.email}}" ng-bind="detalleContacto.email"></Span>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 1em;">
                        <div class="col-md-6 text-left">
                            <div class="row">
                                <div class="col-1">
                                    <i class="fa fa-user-circle"></i>
                                </div>
                                <div class="col-10">
                                    <Span class="info-usuario-modal">Jefe inmediato:</Span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 crop-text-col text-center">
                            <Span class="info-usuario-modal" ng-show="detalleContacto.idJefe === undefined">Sin informaci&oacute;n</Span>
                            <a id="consultaInformacion" ng-show="detalleContacto.idJefe !== undefined" ng-click="consultarInformacionVendedor(detalleContacto.idJefe, false)">
                                <Span class="info-usuario-modal-link" title="{{detalleContacto.nombreJefe}}" ng-bind="detalleContacto.nombreJefe"></Span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="display: flex !important;">                                
                <div class="col-md-12 text-right" style="margin-top: 1em;">
                    <Span class="info-usuario-modal">Mas informaci&oacute;n en "Edici&oacute;n de usuario"</Span>
                </div>
            </div>
        </div>
    </div>
</div>