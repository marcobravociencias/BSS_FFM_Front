<div class="card-header style_card_header_detallepro separador-according">
    <div class="row">
        <div class="col-md-12 colTitulo">
            <p class="mb-0 header-according">Informaci&oacute;n general</p>
        </div>
    </div>
</div>
<div class="col-12">
    <div class="row">
        <div class="col-6">
            <div class="col-12 row style_detalle_todos">
                <div class="col-6 "><span class="content-first-title-head">Creado por:</span></div>
                <div class="col-6 crop-text-col">
                    <span class="content-first-title-head-answer" ng-show="detalle.creadoPor.nombre === undefined">Sin informaci&oacute;n</span>
                    <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.creadoPor.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.creadoPor)" title="{{detalle.creadoPor.nombre}}" ng-bind="detalle.creadoPor.nombre"></span> 
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="col-12 row style_detalle_todos">
                <div class="col-6 "><span class="content-first-title-head">&Uacute;ltima modifica:</span></div>
                <div class="col-6 crop-text-col">
                    <span class="content-first-title-head-answer" ng-show="detalle.editadoPor.nombre === undefined">Sin informaci&oacute;n</span>
                    <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.editadoPor.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.editadoPor)" title="{{detalle.editadoPor.nombre}}" ng-bind="detalle.editadoPor.nombre"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-6">
        </div>
        <div class="col-6">
            <div class="col-12 row style_detalle_todos">
                <div class="col-6 "><span class="content-first-title-head">Propietario del contacto:</span></div>
                <div class="col-6 crop-text-col">
                    <span class="content-first-title-head-answer" ng-show="detalle.propietario.nombre === undefined">Sin informaci&oacute;n</span>
                    <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.propietario.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.propietario)" title="{{detalle.propietario.nombre}}" ng-bind="detalle.propietario.nombre"></span>
                </div>
            </div>
        </div>
    </div>
</div> 
<!--

<div class="row">
    <div class="col-4">
        <section class="card">
            <div class="card-header style-header-profile">
                <div class="row">
                    <div class="col-3">
                        <img class="align-self-center rounded-circle mr-3" id="gg2" style="width:85px; height:85px;" alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg">
                    </div>
                    <div class="col-8" >
                        <div class="media-body">
                            <h5 class="name-text-profile display-6" ng-bind="detalle.creadoPor.nombre"></h5>
                            <p class="puesto-profile" ng-bind="detalle.creadoPor.puesto"></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 offset-3" style="margin-top: -1.3em;">
                        <span class="basic-info-profile-head">Telefono: </span><span class="basic-info-profile" ng-bind="detalle.creadoPor.telefono"></span>
                        <br>
                        <span class="basic-info-profile-head">Email: </span><span class="basic-info-profile" ng-bind="detalle.creadoPor.email"></span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12 text-center">
                        <span class="descripcion-profile">CREADOR</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="col-4" ng-show="detalle.propietario !== undefined">
        <section class="card">
            <div class="card-header style-header-profile">
                <div class="row">
                    <div class="col-3">
                        <img class="align-self-center rounded-circle mr-3" style="width:85px; height:85px;" alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg">
                    </div>
                    <div class="col-8" >
                        <div class="media-body">
                            <h5 class="name-text-profile display-6" ng-bind="detalle.propietario.nombre"></h5>
                            <p class="puesto-profile" ng-bind="detalle.propietario.puesto"></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 offset-3" style="margin-top: -1.3em;">
                        <span class="basic-info-profile-head">Telefono: </span><span class="basic-info-profile" ng-bind="detalle.propietario.telefono"></span>
                        <br>
                        <span class="basic-info-profile-head">Email: </span><span class="basic-info-profile" ng-bind="detalle.propietario.email"></span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12 text-center">
                        <span class="descripcion-profile">PROPIETARIO</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="col-4" ng-show="detalle.propietarioCuenta !== undefined">
        <section class="card">
            <div class="card-header style-header-profile">
                <div class="row">
                    <div class="col-3">
                        <img class="align-self-center rounded-circle mr-3" style="width:85px; height:85px;" alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg">
                    </div>
                    <div class="col-8" >
                        <div class="media-body">
                            <h5 class="name-text-profile display-6" ng-bind="detalle.propietarioCuenta.nombre"></h5>
                            <p class="puesto-profile" ng-bind="detalle.propietarioCuenta.puesto"></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 offset-3" style="margin-top: -1.3em;">
                        <span class="basic-info-profile-head">Telefono: </span><span class="basic-info-profile" ng-bind="detalle.propietarioCuenta.telefono"></span>
                        <br>
                        <span class="basic-info-profile-head">Email: </span><span class="basic-info-profile" ng-bind="detalle.propietarioCuenta.email"></span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12 text-center">
                        <span class="descripcion-profile">PROPIETARIO</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="col-4" ng-show="detalle.editadoPor !== undefined">
        <section class="card">
            <div class="card-header style-header-profile">
                <div class="row">
                    <div class="col-3">
                        <img class="align-self-center rounded-circle mr-3" style="width:85px; height:85px;" alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg">
                    </div>
                    <div class="col-8" >
                        <div class="media-body">
                            <h5 class="name-text-profile display-6" ng-bind="detalle.editadoPor.nombre"></h5>
                            <p class="puesto-profile" ng-bind="detalle.editadoPor.puesto"></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 offset-3" style="margin-top: -1.3em;">
                        <span class="basic-info-profile-head">Telefono: </span><span class="basic-info-profile" ng-bind="detalle.editadoPor.telefono"></span>
                        <br>
                        <span class="basic-info-profile-head">Email: </span><span class="basic-info-profile" ng-bind="detalle.editadoPor.email"></span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12 text-center">
                        <span class="descripcion-profile">EDITOR</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="col-4" ng-show="detalle.modificadoPor !== undefined">
        <section class="card">
            <div class="card-header style-header-profile">
                <div class="row">
                    <div class="col-3">
                        <img class="align-self-center rounded-circle mr-3" style="width:85px; height:85px;" alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(27).jpg">
                    </div>
                    <div class="col-8" >
                        <div class="media-body">
                            <h5 class="name-text-profile display-6" ng-bind="detalle.modificadoPor.nombre"></h5>
                            <p class="puesto-profile" ng-bind="detalle.modificadoPor.puesto"></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-8 offset-3" style="margin-top: -1.3em;">
                        <span class="basic-info-profile-head">Telefono: </span><span class="basic-info-profile" ng-bind="detalle.modificadoPor.telefono"></span>
                        <br>
                        <span class="basic-info-profile-head">Email: </span><span class="basic-info-profile" ng-bind="detalle.modificadoPor.email"></span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-12 text-center">
                        <span class="descripcion-profile">EDITOR</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

-->