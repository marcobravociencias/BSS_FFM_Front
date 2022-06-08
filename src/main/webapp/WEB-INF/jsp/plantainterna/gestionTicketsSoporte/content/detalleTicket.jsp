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
                        <div class="col-4" ng-if="editTicket.detalleTicketSc.numEmpleadoInge">
                            <span class="text-tile-vehiculo">INGENIERO</span>
                            <div class="row">
                                <div class="col-2">
                                    <img id="fotoIngeniero" src="" alt="Foto" width="55" height="55"
                                        style="margin-top: 50%;" onclick="showImage('ingeniero')" class="imgFoto">
                                </div>
                                <div class="col-10">
                                    <div class="container-fluid vehiculo-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-user"></i><span
                                                class="text-content-vehiculo ng-binding"
                                                ng-bind="editTicket.detalleTicketSc.ingeniero || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid vehiculo-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-hashtag"></i><span
                                                class="text-content-vehiculo ng-binding"
                                                ng-bind="editTicket.detalleTicketSc.numEmpleadoInge || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid vehiculo-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-id-badge"></i><span
                                                class="text-content-vehiculo ng-binding"
                                                ng-bind="editTicket.detalleTicketSc.usuarioInge || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid vehiculo-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-phone-alt"></i><span
                                                class="text-content-vehiculo ng-binding"
                                                ng-bind="editTicket.detalleTicketSc.celularInge || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div
                                        ng-if="editTicket.detalleTicketSc.idEstatus !== 4 && editTicket.detalleTicketSc.idEstatus !== 5">
                                        <span ng-if="propietarioSession != nPuestoIngeniero" class="text-external-link"
                                            ng-click="consultarOtsTecnicosTicket()">REASIGNAR
                                            INGENIERO</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-4" ng-if="!editTicket.detalleTicketSc.numEmpleadoInge">
                            <div style="text-align: center;margin-top: 10%;">
                                <img src="./resources/img/plantainterna/despacho/tecnicootasignada.png" alt="Foto"
                                    width="50" height="50" class="imgFoto" style="cursor: default;"><br>
                                <span ng-if="propietarioSession != nPuestoIngeniero" class="text-external-link"
                                    ng-click="consultarOtsTecnicosTicket()">ASIGNAR
                                    INGENIERO</span>
                                <span ng-if="propietarioSession == nPuestoIngeniero" class="text-external-link"
                                    ng-click="consultarOtsTecnicosTicket()">ASIGNARME
                                    TICKET</span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OT
                                        CENTRALIZADO</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo ng-binding"
                                        ng-bind="editTicket.detalleTicketSc.otCentralizado || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OS</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-vehiculo"
                                        ng-if="!editTicket.detalleTicketSc.folioSistema">Sin dato</span>
                                    <span class="text-content-vehiculo text-external-link"
                                        ng-if="editTicket.detalleTicketSc.folioSistema"
                                        ng-click="consultarDetalleObjectosSF(editTicket.detalleTicketSc.idfolioSf, 'OS')"
                                        ng-bind="editTicket.detalleTicketSc.folioSistema"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">N&uacute;m.
                                        Ticket</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-vehiculo"
                                        ng-if="!editTicket.detalleTicketSc.numTicket">Sin dato</span>
                                    <span class="text-content-vehiculo text-external-link"
                                        ng-if="editTicket.detalleTicketSc.numTicket"
                                        ng-click="consultarDetalleObjectosSF(editTicket.detalleTicketSc.idTicketSf, 'TK')"
                                        ng-bind="editTicket.detalleTicketSc.numTicket"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">TIPO
                                        NEGOCIO</span>
                                </div>
                                <div ng-switch on="editTicket.detalleOtDetenida.tipoNegocio"
                                    class="container-text-content-detalle">
                                    <div ng-switch-when="1">
                                        <span class="text-content-vehiculo">Residencial</span>
                                    </div>
                                    <div ng-switch-when="2">
                                        <span class="text-content-vehiculo">Empresarial</span>
                                    </div>
                                    <div ng-switch-default>
                                        <span class="text-content-vehiculo">Sin datos</span>
                                    </div>
                                </div>

                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">N&uacute;n.
                                        serie ticket</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo ng-binding"
                                        ng-bind="editTicket.detalleTicketSc.noSerieTicket || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="container-fluid ticket-content content-select-ticket-detalle">
                                <div class="container-text-title-detalle"><span class="text-tile-ticket">FALLA<i
                                            ng-if="!catalogoFallasTicketSoporte.length"
                                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                            title="No se encontr&oacute; el catalogo de fallas"></i></span>
                                </div>
                                <div class="container-text-content-detalle inputTicket-select">
                                    <select
                                        ng-class="{'error-captura-input': !ticketSoporteDetalle.fallaTicketD && validacionTicketDetalle}"
                                        class="form-control form-control-sm inputTicket" id="fallaTicketD"
                                        name="fallaTicketD" ng-change="loadCategoriaTicketSoporte('detalle')"
                                        ng-model="ticketSoporteDetalle.fallaTicketD">
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
                                            ng-if="!catalogoFallasTicketSoporte.length"
                                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                            title="No se encontr&oacute; el catalogo de fallas"></i></span>
                                </div>
                                <div class="container-text-content-detalle inputTicket-select">
                                    <select
                                        ng-class="{'error-captura-input': !ticketSoporteDetalle.categoriaTicketD && validacionTicketDetalle}"
                                        class="form-control form-control-sm inputTicket" id="categoriaTicketD"
                                        name="categoriaTicketD" ng-change="loadSubcategoriaTicketSoporte('detalle')"
                                        ng-model="ticketSoporteDetalle.categoriaTicketD">
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
                                            ng-if="!catalogoFallasTicketSoporte.length"
                                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                            title="No se encontr&oacute; el catalogo de fallas"></i></span>
                                </div>
                                <div class="container-text-content-detalle inputTicket-select">
                                    <select
                                        ng-class="{'error-captura-input': !ticketSoporteDetalle.subcategoriaTicketD && validacionTicketDetalle}"
                                        class="form-control form-controlt form-control-sm inputTicket"
                                        id="subcategoriaTicketD" name="subcategoriaTicketD"
                                        ng-model="ticketSoporteDetalle.subcategoriaTicketD">
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
                                        class="text-tile-ticket">TECNOLOG&Iacute;A<i ng-if="!tecnologiaList.length"
                                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                            title="No se encontr&oacute; el catalogo de tecnolog&iacute;as"></i></span>
                                </div>
                                <div class="container-text-content-detalle inputTicket-select">
                                    <select
                                        ng-class="{'error-captura-input': !ticketSoporteDetalle.tecnologia && validacionTicketDetalle}"
                                        class="form-control form-controlt form-control-sm inputTicket"
                                        id="tecnologiaGestor" name="tecnologiaGestor"
                                        ng-model="ticketSoporteDetalle.tecnologia">
                                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                                        <option value="{{tec.id}}" ng-repeat="tec in tecnologiaList">
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
                            <span class="text-tile-vehiculo">T&Eacute;CNICO</span>
                            <div class="row">
                                <div class="col-2">
                                    <img id="fotoTecnico" src="" alt="Foto" width="55" height="55"
                                        style="margin-top: 50%;" onclick="showImage('tecnico')" class="imgFoto">
                                </div>
                                <div class="col-10">
                                    <div class="container-fluid vehiculo-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-user"></i><span
                                                class="text-content-vehiculo ng-binding"
                                                ng-bind="editTicket.detalleOtDetenida.tecnico || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid vehiculo-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-hashtag"></i><span
                                                class="text-content-vehiculo ng-binding"
                                                ng-bind="editTicket.detalleOtDetenida.numEmpleadoTecnico || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid vehiculo-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-id-badge"></i><span
                                                class="text-content-vehiculo ng-binding"
                                                ng-bind="editTicket.detalleOtDetenida.usuarioTecnico || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                    <div class="container-fluid vehiculo-content">
                                        <div class="container-text-content-detalle" style="width: 95%;"><i
                                                class="icon-user-detalle fas fa-phone-alt"></i><span
                                                class="text-content-vehiculo ng-binding"
                                                ng-bind="editTicket.detalleOtDetenida.celularTecnico || 'Sin dato'"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Regi&oacute;n</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo text-camel ng-binding"
                                        ng-bind="editTicket.regionText|| 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Ciudad</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo text-camel ng-binding"
                                        ng-bind="editTicket.ciudadText || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span
                                        class="text-tile-vehiculo">Distrito</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo text-camel ng-binding"
                                        ng-bind="editTicket.distritoText || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Zona</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo text-camel ng-binding"
                                        ng-bind="editTicket.zonaText || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span
                                        class="text-tile-vehiculo">Cluster</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo text-camel ng-binding"
                                        ng-bind="editTicket.clusterText || 'Sin dato'"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OT
                                        FFM</span>
                                </div>
                                <div class="container-text-content-detalle">
                                    <span class="text-content-vehiculo" ng-if="!editTicket.detalleOtDetenida.otGeneraSoporte">Sin dato</span>
                                    <span class="text-content-vehiculo text-external-link"
                                        ng-if="editTicket.detalleOtDetenida.otGeneraSoporte"
                                        ng-click="consultaEvidenciaOTDetalle(editTicket.detalleOtDetenida.otGeneraSoporte)"
                                        ng-bind="editTicket.detalleOtDetenida.otGeneraSoporte"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo
                                        orden</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo ng-binding"
                                        ng-bind="editTicket.detalleOtDetenida.descTipoOrden || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Subtipo
                                        orden</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo ng-binding"
                                        ng-bind="editTicket.detalleOtDetenida.descSubTipoOrden || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title-detalle"><span
                                        class="text-tile-vehiculo">Cliente</span>
                                </div>
                                <div class="container-text-content-detalle"><span
                                        class="text-content-vehiculo ng-binding"
                                        ng-bind="editTicket.detalleOtDetenida.cliente || 'Sin dato'"></span>
                                </div>
                            </div>
                            <div class="dropleft">
                                <span class="fas fa-comments icon-color-comments" title="Comentarios"
                                id="dropupComments" data-toggle="dropdown" aria-expanded="false"></span>
                                <span ng-click="consultaEvidenciaOTDetalle(editTicket.detalleOtDetenida.otGeneraSoporte)" class="fa fa-picture-o icon-color-comments" style="margin-right: .4em;" title="Evidencia"></span>
                                <div class="dropdown-menu dropup-comments">
                                    <div class="box-comments">
                                        <div class="box-comments-header">
                                            <span>Hist&oacute;rico de comentarios</span>
                                        </div>
                                        <div class="container-comments justify-content-center">
                                            <div class="box-content" ng-show="comentariosOrdenTrabajo.length">
                                                <div class="d-flex justify-content-center py-2"
                                                    ng-repeat="comment in comentariosOrdenTrabajo">
                                                    <div class="second py-2 px-2">
                                                        <span class="text1" ng-bind="comment.comentario"></span>
                                                        <div class="d-flex justify-content-between">
                                                            <span class="text2" ng-bind="comment.nombreUsuario"></span>
                                                        </div>
                                                        <span class="text2 text-hora-comments" style="float: right;"
                                                            ng-bind="comment.fechaComentario"></span>
                                                        <div class="avatar">
                                                            <i class="web-mensaje fas fa-desktop"
                                                                ng-if="comment.origenSistema == 1"></i>
                                                            <i class="android-mensaje fab fa-android"
                                                                ng-if="comment.origenSistema == 2"></i>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="box-content" ng-show="!comentariosOrdenTrabajo.length">
                                                <div class="no-comments">
                                                    No se encontraron comentarios
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-center pt-3 pb-2">
                                                <textarea type="text" cols="2" placeholder="Agregar comentario"
                                                    class="form-control form-control-sm inputTicket addtxt"
                                                    id="comentarioTicket" ng-model="comentarioTicket"></textarea>
                                                <div>
                                                    <button ng-click="addComentarios()" type="button"
                                                        class="btn btn-primary btn-editar-cambios ripple-surface btn-disabled mr-0 send-comment"><i
                                                            class="far fa-paper-plane"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                <!--div class="container-fluid ticket-content opciones-checkbox-dictamen">
                                    <div class="container-text-title-dictamen"><span class="text-tile-ticket">VISITA
                                            NECESARIO</span></div>
                                    <div class="container-text-content-dictamen form-check form-switch">
                                        <input class="form-check-input" type="checkbox">
                                    </div>
                                </div-->
                                <div ng-if="!accionesDinamicasDetalle.length" class="no-dictamen">
                                    <i class="icono-noseleccion fas fa-exclamation-circle ml-2"></i>
                                    <span>No se encontr&oacute; el catalogo de dictamen</span>
                                </div>
                                <div class="container-fluid ticket-content opciones-checkbox-dictamen"
                                    ng-if="accionesDinamicasDetalle.length"
                                    ng-repeat="item in accionesDinamicasDetalle track by $index">
                                    <div class="container-text-title-dictamen titulo-acciones-dinamicas"><span
                                            class="text-tile-ticket">{{item.descripcion.toUpperCase()}}</span></div>
                                    <div class="container-text-content-dictamen form-check form-switch">
                                        <input ng-if="$index != 1" class="form-check-input dictamen-info"
                                            id="dictamen-{{item.id}}" type="checkbox">
                                        <input ng-if="$index == 1" ng-click="mostrarFormularioNuevoEquipo()"
                                            ng-model="test" id="dictamen-{{item.id}}"
                                            class="form-check-input dictamen-info" type="checkbox">
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-6">
                            <form ng-show="agregarNuevoEquipoContent">
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                        <label class="label-nuevo-equipo" for="selectTipoEquipoAdd">Tipo</label>
                                        <select
                                            ng-class="{'error-captura-input': !cambioEquipo.idTipoEquipo  && isEvaluarNuevoEquipo}"
                                            ng-model="cambioEquipo.idTipoEquipo"
                                            class="input-filtro form-control form-control-sm inputTicket"
                                            id="selectTipoEquipoAdd">
                                            <option value="" disabled selected>Seleccione ...</option>
                                            <option value="{{equipo.id}}" ng-repeat="equipo in equiposList">
                                                {{equipo.descripcion}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label class="label-nuevo-equipo" for="noSerieAnteriorEquipo">No. Serie</label>
                                        <input
                                            ng-class="{'error-captura-input': !cambioEquipo.numSerieViejo && isEvaluarNuevoEquipo}"
                                            maxlength="30" ng-model="cambioEquipo.numSerieViejo" type="text"
                                            class="form-control form-control-sm inputTicket" id="noSerieAnteriorEquipo"
                                            placeholder="">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label class="label-nuevo-equipo" for="noMacViejoEquipo">MAC</label>
                                        <input
                                            ng-class="{'error-captura-input': !cambioEquipo.macViejo && isEvaluarNuevoEquipo}"
                                            maxlength="30" ng-model="cambioEquipo.macViejo" type="text"
                                            class="form-control form-control-sm inputTicket" id="noMacViejoEquipo"
                                            placeholder="">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label class="label-nuevo-equipo" for="noSerieNuevoEquipo">No. Serie</label>
                                        <input
                                            ng-class="{'error-captura-input': !cambioEquipo.numeSerieNuevo && isEvaluarNuevoEquipo}"
                                            maxlength="30" ng-model="cambioEquipo.numeSerieNuevo" type="text"
                                            class="form-control form-control-sm inputTicket" id="noSerieNuevoEquipo"
                                            placeholder="">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label class="label-nuevo-equipo" for="noMacNuevoEquipo">MAC</label>
                                        <input
                                            ng-class="{'error-captura-input': !cambioEquipo.macNueva && isEvaluarNuevoEquipo}"
                                            maxlength="30" ng-model="cambioEquipo.macNueva" type="text"
                                            class="form-control form-control-sm inputTicket" id="noMacNuevoEquipo"
                                            placeholder="">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <button ng-click="agregarRegistroCambioEquipo()" id="agregarnuevoEquivo"
                                            type="button"
                                            class="btn btn-sm btn-primary btn-lg btn-floating btn-disabled">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <table ng-show="agregarNuevoEquipoContent" id="table-cambio-equipo" class="table table-sm">
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
                            ng-if="!estatusList.length" class="icono-noseleccion fas fa-exclamation-circle ml-2"
                            title="No se encontr&oacute; el catalogo de estatus"></i></span></div>
                <div class="container-text-content-detalle inputTicket-select">
                    <select ng-class="{'error-captura-input': !ticketSoporteDetalle.estatus && validacionTicketDetalle}"
                        class="form-control form-control-sm inputTicket" name="estatusTicketDetalle"
                        id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.estatus" ng-change="changeEstatus()">
                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                        <option value="{{estatus.id}}" ng-repeat="estatus in estatusList">
                            {{estatus.descripcion}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="container-fluid ticket-content content-select-ticket-detalle col-4"
                ng-show="ticketSoporteDetalle.estatus === '3'">
                <div class="container-text-title-detalle"><span class="text-tile-ticket"
                        style="margin-left: 5em;">ESTADO<i ng-if="!estadoEscalamientoDetalle.length"
                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                            title="No se encontr&oacute; el catalogo de propietarios"></i></span></div>
                <div class="container-text-content-detalle inputTicket-select">
                    <select ng-class="{'error-captura-input': !ticketSoporteDetalle.estado && validacionTicketDetalle}"
                        class="form-control form-controlt form-control-sm inputTicket" name="estatusTicketDetalle"
                        id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.estado"
                        ng-change="motivosSelectDetalle()">
                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                        <option value="{{item.id}}" ng-repeat="item in estadoEscalamientoDetalle">
                            {{item.descripcion}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="container-fluid ticket-content content-select-ticket-detalle col-4"
                ng-show="ticketSoporteDetalle.estatus === '3'">
                <div class="container-text-title-detalle"><span class="text-tile-ticket"
                        style="margin-left: 5em;">MOTIVO<i ng-if="!estadoEscalamientoDetalle.length"
                            class="icono-noseleccion fas fa-exclamation-circle ml-2"
                            title="No se encontr&oacute; el catalogo de propietarios"></i></span></div>
                <div class="container-text-content-detalle inputTicket-select">
                    <select ng-class="{'error-captura-input': !ticketSoporteDetalle.motivo && validacionTicketDetalle}"
                        class="form-control form-controlt form-control-sm inputTicket" name="estatusTicketDetalle"
                        id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.motivo">
                        <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                        <option value="{{item.id}}" ng-repeat="item in motivoEscalamientoDetalle">
                            {{item.descripcion}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="container-fluid ticket-content content-select-ticket-detalle offset-2 col-6"
                ng-show="ticketSoporteDetalle.estatus !== '3'">
                <div class="container-text-title-detalle"><span class="text-tile-ticket">COMENTARIO</span></div>
                <textarea class="form-control form-control-sm inputTicket"
                    ng-class="{'error-captura-input': !ticketSoporteDetalle.comentarios && validacionTicketDetalle}"
                    ng-model="ticketSoporteDetalle.comentarios" cols="2"></textarea>
            </div>
        </div>

        <div class="row content-falla">
            <div class="col-4 offset-4" ng-if="!editTicket.detalleTicketSc.numEmpleadoInge">
                <div class="no-ingeniero">
                    <i class="icono-noseleccion fas fa-exclamation-circle ml-2"></i>
                    <span ng-if="propietarioSession != nPuestoIngeniero">Asigna el ticket para continuar</span>
                    <span ng-if="propietarioSession == nPuestoIngeniero">Toma el ticket para continuar</span>
                </div>
            </div>
            <div class="col-4" ng-class="{'offset-8': editTicket.detalleTicketSc.numEmpleadoInge}">
                <button ng-click="guardarTicketDetalle()" type="button" id="btnGuardarCambios"
                    ng-if="editTicket.detalleTicketSc.idEstatus !== 4 && editTicket.detalleTicketSc.idEstatus !== 5"
                    class="btn btn-primary btn-editar-cambios ripple-surface mr-0">
                    <b>Guardar cambios </b>
                </button>
                <button ng-click="cerrarDetalleTicket()" type="button" class="btn cerrar-cancelar-btn  btn-ligh"
                    ng-if="editTicket.detalleTicketSc.idEstatus !== 4 && editTicket.detalleTicketSc.idEstatus !== 5"
                    data-mdb-dismiss="modal">
                    Cancelar
                </button>
                <button ng-click="cerrarDetalleTicket()"
                    ng-if="editTicket.detalleTicketSc.idEstatus === 4 || editTicket.detalleTicketSc.idEstatus === 5"
                    type="button" class="btn cerrar-cancelar-btn  btn-ligh" style="margin: 1em 0;"
                    data-mdb-dismiss="modal">
                    Salir
                </button>
            </div>
        </div>
    </div>
</div>