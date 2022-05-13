<div class="col-12">
    <div class="accordion" id="detalleTicketAccordion">
        <div class="accordion-item mt-4">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button" type="button" data-toggle="collapse"
                    data-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne">
                    Detalle ticket soporte centralizado
                </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                    <div class="row">
                        <div class="col-4">
                            <span class="text-tile-ticket">INGENIERO</span>
                            <div class="row">
                                <div class="col-2">
                                    <img id="fotoIngeniero" src="" alt="Foto" width="55" height="55"
                                        style="margin-top: 50%;" class="imgFoto">
                                </div>
                                <div class="col-10">
                                    <div class="container-fluid detalle-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-user"></i><span
                                                class="text-content-ticket ng-binding" ng-bind="ticketDetalle.detalleTicketSc.ingeniero || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid detalle-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-hashtag"></i><span
                                                class="text-content-ticket ng-binding" ng-bind="ticketDetalle.detalleTicketSc.numEmpleadoInge || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid detalle-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-id-badge"></i><span
                                                class="text-content-ticket ng-binding" ng-bind="ticketDetalle.detalleTicketSc.usuarioInge || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid detalle-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-phone-alt"></i><span
                                                class="text-content-ticket ng-binding" ng-bind="ticketDetalle.detalleTicketSc.celularInge || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">OT
                                        CENTRALIZADO</span>
                                </div>
                                <div class="container-text-content-detalle"><span class="text-content-ticket ng-binding"
                                        ng-bind="ticketDetalle.detalleTicketSc.otCentralizado || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">OS</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-ticket" ng-bind="ticketDetalle.detalleTicketSc.folioSistema || 'Sin dato'"></span>

                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">N&uacute;m.
                                        Ticket</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-ticket"  ng-bind="ticketDetalle.detalleTicketSc.numTicket || 'Sin dato'"></span>

                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">TIPO
                                        NEGOCIO</span>
                                </div>
                                <div ng-switch on="ticketDetalle.detalleOtDetenida.tipoNegocio"
                                    class="container-text-content-detalle">
                                    <div ng-switch-when="1">
                                        <span class="text-content-ticket">Residencial</span>
                                    </div>
                                    <div ng-switch-when="2">
                                        <span class="text-content-ticket">Empresarial</span>
                                    </div>
                                    <div ng-switch-default>
                                        <span class="text-content-ticket">Sin dato</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-4">
                            <div class="container-fluid ticket-content content-select-ticket-detalle">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">FALLA<i
                                            ng-if="!catalogosSeguimiento.fallas.length"
                                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                            title="No se encontr&oacute; el catalogo de fallas"></i></span>
                                </div>
                                <div class="container-text-content-detalle inputTicket-select">
                                    <select class="form-control form-control-sm inputTicket"
                                        >
                                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                        <option value="{{fallaTicketD.id}}"
                                            ng-repeat="fallaTicketD in listFallasTicketDetalle">
                                            {{fallaTicketD.descripcion}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="container-fluid ticket-content content-select-ticket-detalle">
                                <div class="container-text-title-detalle "><span
                                        class="text-tile-ticket">CATEGOR&Iacute;A<i
                                            ng-if="!catalogosSeguimiento.fallas.length"
                                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                            title="No se encontr&oacute; el catalogo de fallas"></i></span>
                                </div>
                                <div class="container-text-content-detalle inputTicket-select">
                                    <select class="form-control form-control-sm inputTicket"
                                       >
                                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                        <option value="{{categoriaTicketD.id}}"
                                            ng-repeat="categoriaTicketD in listCategoriasTicketDetalle">
                                            {{categoriaTicketD.descripcion}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="container-fluid ticket-content content-select-ticket-detalle">
                                <div class="container-text-title-detalle"><span
                                        class="text-tile-ticket">SUBCATEGOR&Iacute;A<i
                                            ng-if="!catalogosSeguimiento.fallas.length"
                                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                            title="No se encontr&oacute; el catalogo de fallas"></i></span>
                                </div>
                                <div class="container-text-content-detalle inputTicket-select">
                                    <select class="form-control form-controlt form-control-sm inputTicket"
                                        >
                                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                        <option value="{{subcategoriaTicketD.id}}"
                                            ng-repeat="subcategoriaTicketD in listSubcategoriasTicketDetalle">
                                            {{subcategoriaTicketD.descripcion}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="container-fluid ticket-content content-select-ticket-detalle">
                                <div class="container-text-title-detalle"><span
                                        class="text-tile-ticket">TECNOLOG&Iacute;A<i
                                            ng-if="!catalogosSeguimiento.tecnologias.length"
                                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                            title="No se encontr&oacute; el catalogo de tecnolog&iacute;as"></i></span>
                                </div>
                                <div class="container-text-content-detalle inputTicket-select">
                                    <select class="form-control form-controlt form-control-sm inputTicket"
                                        >
                                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                        <option value="{{tec.id}}" ng-repeat="tec in catalogosSeguimiento.tecnologias">
                                            {{tec.descripcion}}
                                        </option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-toggle="collapse"
                    data-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo">
                    Detalle orden detenida
                </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body">
                    <div class="row">
                        <div class="col-4">
                            <span class="text-tile-ticket">T&Eacute;CNICO</span>
                            <div class="row">
                                <div class="col-2">
                                    <img id="fotoTecnico" src="" alt="Foto" width="55" height="55"
                                        style="margin-top: 50%;" class="imgFoto">
                                </div>
                                <div class="col-10">
                                    <div class="container-fluid detalle-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-user"></i><span
                                                class="text-content-ticket ng-binding"
                                                ng-bind="ticketDetalle.detalleOtDetenida.tecnico || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid detalle-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-hashtag"></i><span
                                                class="text-content-ticket ng-binding"
                                                ng-bind="ticketDetalle.detalleOtDetenida.numEmpleadoTecnico || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid detalle-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-id-badge"></i><span
                                                class="text-content-ticket ng-binding"
                                                ng-bind="ticketDetalle.detalleOtDetenida.usuarioTecnico || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid detalle-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-phone-alt"></i><span
                                                class="text-content-ticket ng-binding"
                                                ng-bind="ticketDetalle.detalleOtDetenida.celularTecnico || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">Region</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-ticket text-camel ng-binding"
                                        ng-bind="ticketDetalle.geografia.regionText || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">Ciudad</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-ticket text-camel ng-binding"
                                        ng-bind="ticketDetalle.geografia.ciudadText || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">Distrito</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-ticket text-camel ng-binding"
                                        ng-bind="ticketDetalle.geografia.distritoText || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">Zona</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-ticket text-camel ng-binding"
                                        ng-bind="ticketDetalle.geografia.zonaText || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">Cluster</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-ticket text-camel ng-binding"
                                        ng-bind="ticketDetalle.geografia.clusterText || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">OT
                                        FFM</span>
                                </div>
                                <div class="container-text-content-detalle"><span class="text-content-ticket ng-binding"
                                        ng-bind="ticketDetalle.detalleOtDetenida.otGeneraSoporte || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">Tipo
                                        orden</span>
                                </div>
                                <div class="container-text-content-detalle"><span class="text-content-ticket ng-binding"
                                        ng-bind="editicketDetalletTicket.detalleOtDetenida.descTipoOrden || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">Subtipo
                                        orden</span>
                                </div>
                                <div class="container-text-content-detalle"><span class="text-content-ticket ng-binding"
                                        ng-bind="ticketDetalle.detalleOtDetenida.descSubTipoOrden || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid detalle-content">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">Cliente</span>
                                </div>
                                <div class="container-text-content-detalle"><span class="text-content-ticket ng-binding"
                                        ng-bind="ticketDetalle.detalleOtDetenida.cliente || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button class="accordion-button collapsed" type="button" data-toggle="collapse"
                    data-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree">
                    Dictamen
                </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree">
                <div class="accordion-body">
                    <div class="row">
                        <div class="col-6">
                            <div class="content-checkbox content-dictamen-folio">
                                <div ng-if="!catalogosSeguimiento.acciones.length" class="no-dictamen">
                                    <i class="icono-noseleccion fas fa-exclamation-circle ml-2"></i>
                                    <span>No se encontr&oacute; el catalogo de dictamen</span>
                                </div>
                                <div class="container-fluid ticket-content opciones-checkbox-dictamen"
                                    ng-if="catalogosSeguimiento.acciones.length"
                                    ng-repeat="item in catalogosSeguimiento.acciones track by $index">
                                    <div class="container-text-title-dictamen titulo-acciones-dinamicas"><span
                                            class="text-tile-ticket">{{item.descripcion.toUpperCase()}}</span></div>
                                    <div class="container-text-content-dictamen form-check form-switch">
                                        <input class="form-check-input dictamen-info" id="dictamen-{{item.id}}"
                                            type="checkbox">
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-6">
                            <table ng-show="isCambioEquipos" id="table-cambio-equipo" class="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Tipo </th>
                                        <th scope="col">No. serie actual</th>
                                        <th scope="col">MAC actual</th>
                                        <th scope="col">No serie nueva</th>
                                        <th scope="col">MAC nueva</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="itemRegistro in listadoNuevoViejosEquipo track by $index">
                                        <td ng-bind="itemRegistro.descripcion" title="{{itemRegistro.descripcion}}">
                                        </td>
                                        <td ng-bind="itemRegistro.numSerieViejo" title="{{itemRegistro.numSerieViejo}}">
                                        </td>
                                        <td ng-bind="itemRegistro.macViejo" title="{{itemRegistro.macViejo}}"></td>
                                        <td ng-bind="itemRegistro.numeSerieNuevo"
                                            title="{{itemRegistro.numeSerieNuevo}}"></td>
                                        <td ng-bind="itemRegistro.macNueva" title="{{itemRegistro.macNueva}}"></td>
                                        <td>
                                            <button ng-click="eliminarRegistro($index)" type="button"
                                                class="eliminar-registro-cambioequipo btn btn-sm btn-primary ">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr ng-show="listadoNuevoViejosEquipo.length <= 0">
                                        <td class="col-listadoregistros" colspan="6">Sin registros</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row content-falla">
        <div class="row">
            <div class="container-fluid ticket-content content-select-ticket-detalle col-4">
                <div class="container-text-title-detalle"><span class="text-tile-ticket">ESTATUS TICKET<i
                            ng-if="!catalogosSeguimiento.estatus.length" class="icono-noseleccion fas fa-exclamation-circle ml-2"
                            title="No se encontr&oacute; el catalogo de estatus"></i></span></div>
                <div class="container-text-content-detalle inputTicket-select">
                    <select
                        class="form-control form-control-sm inputTicket">
                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                        <option value="{{estatus.id}}" ng-repeat="estatus in catalogosSeguimiento.estatus">
                            {{estatus.descripcion}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="container-fluid ticket-content content-select-ticket-detalle col-4"
                ng-show="ticketDetalle.estatus === '3'">
                <div class="container-text-title-detalle"><span class="text-tile-ticket"
                        style="margin-left: 5em;">ESTADO<i ng-if="!estadoEscalamientoDetalle.length"
                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                            title="No se encontr&oacute; el catalogo de propietarios"></i></span></div>
                <div class="container-text-content-detalle inputTicket-select">
                    <select 
                        class="form-control form-controlt form-control-sm inputTicket" name="estatusTicketDetalle"
                        id="estatusTicketDetalle">
                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                        <option value="{{item.id}}" ng-repeat="item in estadoEscalamientoDetalle">
                            {{item.descripcion}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="container-fluid ticket-content content-select-ticket-detalle col-4"
                ng-show="ticketDetalle.estatus === '3'">
                <div class="container-text-title-detalle"><span class="text-tile-ticket"
                        style="margin-left: 5em;">MOTIVO<i ng-if="!estadoEscalamientoDetalle.length"
                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                            title="No se encontr&oacute; el catalogo de propietarios"></i></span></div>
                <div class="container-text-content-detalle inputTicket-select">
                    <select 
                        class="form-control form-controlt form-control-sm inputTicket" name="estatusTicketDetalle"
                        id="estatusTicketDetalle" >
                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                        <option value="{{item.id}}" ng-repeat="item in motivoEscalamientoDetalle">
                            {{item.descripcion}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="container-fluid ticket-content content-select-ticket-detalle offset-2 col-6"
                ng-show="ticketDetalle.estatus !== '3'">
                <div class="container-text-title-detalle"><span class="text-tile-ticket">COMENTARIO</span></div>
                <textarea class="form-control form-control-sm inputTicket"
                    
                     cols="2"></textarea>
            </div>
        </div>
        <div class="row content-falla" style="text-align: end;">
            <div class="col-4 offset-8">
                <button ng-click="cerrarDetalleTicket()" type="button" class="btn cerrar-cancelar-btn  btn-ligh"
                    style="margin: 1em 0;">
                    Salir
                </button>
            </div>
        </div>
    </div>
</div>