<div class="row row-datos-creacion">
    <div class="col-6">
        <div class="form-row form-row-creacion">
            <div class="col-4 form-group">
                <label for="cuentaTicket" class="span-form-tickets">Cuenta *</label>
                <input type="text" autocomplete="off" ng-click="isSearchCuenta = false" ng-change="isSearchCuenta = false"
                    class="form-control form-control-sm inputTicket" aria-describedby="basic-addon3" id="cuentaTicket"
                    ng-model="ticketSoporteR.cuenta" />
            </div>
            <div class="col-4 form-group">
                <label for="telefonoTicket" class="span-form-tickets">Tel&eacute;fono </label>
                <input type="text" autocomplete="off" class="form-control form-control-sm  inputTicket" id="telefonoTicket"
                    ng-model="ticketSoporteR.telefonoTecnico"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="10" />
            </div>
            <div class="col-4 form-group inputTicket-select">
                <label for="tecnologiaTicket" class="span-form-tickets">Tecnolog&iacute;a gestor*</label>
                <!-- <input readonly style="cursor: default;" class="form-control form-control-sm " name="tecnologiaTicket" id="tecnologiaTicket" ng-model="ticketSoporteR.tecnologia"/> -->
                <select class="form-control form-control-sm inputTicket" name="tecnologiaTicket" id="tecnologiaTicket"
                    ng-model="ticketSoporteR.tecnologia">
                    <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                    <option value="36" selected>HUAWEI</option>
                    <option value="37" selected>NCE</option>
                    <option value="38" selected>ZTE</option>
                    <option value="39" selected>FIBER HOME</option>
                </select>
            </div>

        </div>
        <div class="form-row form-row-creacion">
            <div class="col-4 form-group form-gruponoserie">
                <label for="noSerieTicket" class="span-form-tickets">No. de serie * </label>
                <input type="text" autocomplete="off" class="form-control form-control-sm  inputTicket" id="noSerieTicket"
                    ng-model="ticketSoporteR.noSerieOld" />
            </div>
            <div class="col-4 form-group inputTicket-select" style="height: auto;">
                <label for="fallaTicket" class="span-form-tickets">Falla *<i ng-if="!catalogoFallasTicketSoporte.length"
                        class="icono-noseleccion fas fa-exclamation-circle ml-2"
                        title="No se encontr&oacute;o el catalogo de geograf&iacute;a"></i></label>
                <select class="form-control form-control-sm inputTicket" name="fallaTicket" id="fallaTicket"
                    ng-change="loadCategoriaTicketSoporte('registro')" ng-model="ticketSoporteR.fallaTicket">
                    <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                    <option value="{{fallaTicket.id}}" ng-repeat="fallaTicket in listFallasTicket">
                        {{fallaTicket.descripcion}}
                    </option>
                </select>
            </div>
            <div class="col-4 form-group inputTicket-select">
                <label for="categoriaTicket" class="span-form-tickets">Categor&iacute;a *</label>
                <select class="form-control form-control-sm inputTicket" id="categoriaTicket" name="categoriaTicket"
                    ng-change="loadSubcategoriaTicketSoporte('registro')" ng-model="ticketSoporteR.categoriaTicket">
                    <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                    <option value="{{categoriaTicket.id}}" ng-repeat="categoriaTicket in listCategoriasTicket">
                        {{categoriaTicket.descripcion}}
                    </option>
                </select>
            </div>

        </div>
        <div class="form-row form-row-creacion">
            <div class="col-4 form-group inputTicket-select">
                <label for="subcategoriaTicket" class="span-form-tickets">Subcategor&iacute;a *</label>
                <select class="form-control form-control-sm inputTicket" id="subcategoriaTicket"
                    name="subcategoriaTicket" ng-model="ticketSoporteR.subcategoriaTicket">
                    <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                    <option value="{{subcategoriaTicket.id}}" ng-repeat="subcategoriaTicket in listSubcategoriasTicket">
                        {{subcategoriaTicket.descripcion}}
                    </option>
                </select>
            </div>
            <div class="col-8 form-group">
                <label class="span-form-tickets" for="descripcionProblemaTicket">Descripci&oacute;n del Problema *
                </label>
                <textarea class="form-control inputTicket content_text " rows="2" id="descripcionProblemaTicket"
                    ng-model="ticketSoporteR.descripcionProblema"></textarea>
            </div>
        </div>

        <div class="row content-botones-creacion">
            <div style=" margin: 1em 0 0 0;">
                <input type="button" class="btn btn-primary btn-editar-cambios ripple-surface"
                    ng-click="registrarTicketSoporte(ticket)" value="GUARDAR">
                <button type="button" class="btn limpiar-btn btn-ligh"
                    ng-click="limpiarFormularioTicket()">LIMPIAR</button>
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="form-row form-row-creacion">
            <div class="col-6">
                <div class="container-fluid vehiculo-content text-info-ot-text">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OT</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.id || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Folio</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.folioSistema || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. empleado</span>
                    </div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.numEmpleado  || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. usuario</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.usuarioFFM  || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">T&eacute;cnico</span>
                    </div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.nombreTecnico  || 'Sin dato'">222119</span> </div>
                </div>

                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo orden</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.tipoOrden || 'Sin dato'">222119</span> </div>
                </div>
            </div>
            <div class="col-6">
                <div class="container-fluid vehiculo-content text-info-ot-text">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo negocio</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.unidadNegocio || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Regi&oacute;n</span>
                    </div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.region || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Ciudad</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.ciudad || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Distrito</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.distrito || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Zona</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.zona || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cl&uacute;ster</span>
                    </div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding"
                            ng-bind="tecnicoAsignado.cluster || 'Sin dato'">222119</span> </div>
                </div>

            </div>
        </div>
        <div class="form-row form-row-creacion">
            <div class="col-12">
                <div id="content-mapa-creacion-ticket"></div>
            </div>
        </div>
    </div>

</div>