
<div class="row filter-content">
    <div class="container-noticia-elemento">
        <img id="btnRefresNoticias" style="cursor: pointer;" alt="Refresh" ng-click="consultarComentariosTicketSoporte()"  src="${pageContext.request.contextPath}/resources/img/generic/actualizar_icon.svg">
        <span class="cerrarnoticias" ng-click="isAbiertoOSNoticias=false">Ocultar noticias</span>
        <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
        <div ng-if="listadoNoticias.length <= 0" class="container mt-5">
            <h5 class="noinfo-noticias">No se encontr&oacute; informaci&oacute;n</h5>
        </div>
        <div class="container-fluid container-mensajes-noticias">
            <div ng-repeat="noticia in listadoNoticias track by $index" class="container-noticias">
                <div class="col-12">
                    <div class="row">
                        <div class="col-12">
                            <div class="image-preview">
                                <img class="img-created-by-comme" src="{{noticia.imgCreatedBy}}" alt="">
                                <div class="div-titelheader-detalle">
                                    <div class="row">
                                        <h1 class="titelheader-detalle" ng-bind="noticia.createdBy"></h1>
                                    </div>
                                    <div class="row">
                                        <h1 class="subtitelheader-detalle" ng-bind="noticia.text"></h1>
                                    </div>
                                    <span class="option-mensajes" ng-click="responderComentarioTicket(noticia.id)">Responder</span>
                                    <!-- <span class="option-mensajes" ng-click="editarComentario(noticia.id, noticia.text, 0)">Editar</span> -->
                                    <span class="option-mensajes" ng-click="eliminarComentario(noticia.id, 0)">Eliminar</span>
                                    <span class="text-fecha-comentario" ng-bind="noticia.createdDate"></span>
                                    <button id="button-subcommet-{{noticia.id}}" type="button" class="btn-close close-enviar-subcomentario" ng-click="responderComentarioTicket(noticia.id)" data-mdb-dismiss="modal" aria-label="Close" style="display: none;"></button>
                                    <div id="content-subcomentario-{{noticia.id}}" class="row content-text-send" style="display: none;">
                                        <div class="col-10">
                                            <input id="texto-subcomentario-{{noticia.id}}" type="text" class="form-control form-control-sm form-send">
                                        </div>
                                        <div class="col-2 col-btn-send">
                                            <button class="btn btn-sm btn-primary btn-send" ng-click="enviarComentario(noticia.id)">Enviar</i></button>
                                        </div>
                                            <div class="col-12 col-adjuntar-archivo" ng-show="showAdjuntar" style="top: -30px;">
                                                <form id="uploadFormSubcomentario-{{noticia.id}}" name="16" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                                                    <div class="box__input">
                                                        <input name="fileSubComentarioTicket" type="file" class="box__file inputFile adjuntar-archivo-os" onchange="cambiar(this)" id="fileSubComentarioTicket-{{noticia.id}}"/>	
                                                        <label for="fileSubComentarioTicket-{{noticia.id}}" id="etiqueta_archivo">
                                                            <span class="text_select_archivo_sub col-content-text-general" style="margin-left: -421px;">Adjuntar archivo</span>
                                                     </div>
                                                </form>
                                            </div>
                                            <div class="col-12 col-adjuntar-arch" ng-show="showAdjuntar">
                                                <span class="eliminar_archivo_sub" ng-show="showEliminarSubComTicket" ng-click="resetFile(noticia.id)" >Eliminar</span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ng-if="noticia.media" class="row">
                        <div class="col-11 offset-1">
                            <div class="row">
                            <div class="file-adjuntado"  ng-switch="noticia.media.type">
                                <img ng-switch-when="JPG"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-adjuntado-noticia" alt="">
                                <img ng-switch-when="JPEG" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-adjuntado-noticia" alt="">
                                <img ng-switch-when="PNG"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-adjuntado-noticia" alt="">
                                <img ng-switch-when="GIF"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-adjuntado-noticia" alt="">
                                <img ng-switch-when="PDF"  src="${pageContext.request.contextPath}/resources/img/iconossf/pdf.png" class="" alt="">                                
                                <img ng-switch-when="POWER_POINT_X" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png" class="" alt="">
                                <img ng-switch-when="PPTX" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png" class="" alt="">
                                <img ng-switch-default src="${pageContext.request.contextPath}/resources/img/iconossf/not-found.jpg" class="imagen-adjuntado-noticianot" alt="">
    
                                <div class="title-file-adjuntado">
                                    <h1 class="text-title-adjuntado" ng-bind="noticia.media.name" ></h1>
                                    <a href="{{noticia.media.downloadLink}}" class="text-title-descarga-adjuntado" >Descargar</a>
                                    <a href="{{noticia.media.preview}}" target="_blank" class="text-title-descarga-adjuntado" >Vista previa</a>
                                </div>
                            </div>                                
                            </div>
                        </div>
                    </div>
        
                    <div ng-repeat="comentario in noticia.subComentarios track by comentario.id" class="container-elementcommes">
                        <div class="col-11 offset-1">
                            <div class="row">
                            <div class="image-preview-owner">
                                <img src="{{noticia.imgCreatedBy}}" class="imagen-comment-owner" alt="">
                                <div class="col-contenttitle-coment">
                                    <h1 class="title-coment" ng-bind="comentario.createdBy"></h1>
                                    <h1 class="title-subcomment" ng-bind="comentario.text"></h1>
                                    <!-- <span class="option-mensajes" ng-click="editarComentario(comentario.id, comentario.text, 1)">Editar</span> -->
                                    <span class="option-mensajes" ng-click="eliminarComentario(comentario.id, 1)">Eliminar</span>
                                    <span class="text-fecha-comentario" ng-bind="comentario.createdDate"></span>
                                    <div id="content-text-e-{{comentario.id}}" class="row content-text-send" style="display: none;">
                                        <div class="col-10">
                                            <input id="texto-comentario-os-{{comentario.id}}" type="text" class="form-control form-control-sm form-send">
                                        </div>
                                        <div class="col-2 col-btn-send">
                                            <button class="btn btn-sm btn-primary btn-send" ng-click="enviarComentario(comentario.id)">Enviar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-10 offset-1" ng-if="comentario.media">
                        <div class="content-archivo-comentario">
                            <div class="imagen-adjuntado-comment" ng-switch="comentario.media.type">
                                <img ng-switch-when="JPG"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-comment-owner" alt="">
                                <img ng-switch-when="JPEG" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-comment-owner" alt="">
                                <img ng-switch-when="PNG"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-comment-owner" alt="">
                                <img ng-switch-when="GIF"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-comment-owner" alt="">
                                <img ng-switch-when="PDF"  src="${pageContext.request.contextPath}/resources/img/iconossf/pdf.png" class="" alt="">
                                <img ng-switch-when="PPTX" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png" class="" alt="">
                                <img ng-switch-when="POWER_POINT_X" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png" class="" alt="">
    
                                <img ng-switch-default src="${pageContext.request.contextPath}/resources/img/iconossf/not-found.jpg" class="imagen-comment-owner" alt="">
    
                                <div class="comment-adjuntado-text">
                                    <h1 class="text-title-comment-top" ng-bind="comentario.media.name"></h1>
                                    <a href="{{comentario.media.downloadLink}}" class="descarga-adjuntadocomment" >Descargar</a>
                                    <a href="{{comentario.media.preview}}" target="_blank" class="descarga-adjuntadocomment" >Vista previa</a>
                                </div>
                            </div>                                        
                        </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
        <div class="row">
            <div class="col-10 col-content-text-general">
                <input id="text-general-ticket" type="text" class="form-control form-control-sm form-send-general">
            </div>
            <div class="col-2 col-btn-send-general">
                <button class="btn btn-sm btn-primary btn-send" ng-click="enviarMesajeGeneral()">Enviar</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <form id="uploadForm" name="13" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                    <div class="box__input">
                        <input name="myFile" type="file" class="box__file inputFile" id="fileComentariosTicket">	
                        <label for="fileComentariosTicket" id="etiqueta_archivo">
                            <span class="text_select_archivo col-content-text-general" style="margin-left: -500px; font-size: 1em;">Adjuntar archivo</span>
                     </div>
                </form>
            </div>
            
        </div>
        <div class="row">
            <div class="col-12" style="top: -12px;">
                <span class="eliminar_archivo" ng-show="showEliminarFileTicket" ng-click="resetFile()" style="margin-left: 40px;">Eliminar</span>
            </div>
        </div>
    </div>
    <div class="col-1" style="margin-top: .5em;">
        <i class="fas fa-arrow-circle-left icon-back" ng-click="changeView(2)" title="Regresar"></i>
    </div>
</div>
<br>
<div class="col-12">
    <div class="form-row">
        <div class="col-3 form-group">
            <label for="cuentaTicket" class="span-form-tickets">Cuenta *</label>
            <input type="text" class="form-control form-control-sm inputTicket" aria-describedby="basic-addon3" id="cuentaTicket" ng-model="ticket.cuenta"/>
        </div>
        <div class="col-3 form-group">
            <label for="tecnicoTicket" class="span-form-tickets">T&eacute;cnico *</label>
            <input style="cursor: pointer;" readonly class="form-control form-control-sm" onclick="openModalBusquedaTecnicosTicket()" id="tecnicoTicket"/>
        </div>
        <div class="col-3 form-group">
            <label for="telefonoTicket" class="span-form-tickets">Tel&eacute;fono </label>
            <input type="text" class="form-control form-control-sm inputTicket" id="telefonoTicket" ng-model="ticket.telefonoTecnico"/>
        </div>
        <div class="col-3 form-group">
            <label for="noSerieTicket" class="span-form-tickets">No. de serie * </label>
            <input type="text" class="form-control form-control-sm inputTicket" id="noSerieTicket" ng-model="ticket.noSerieOld"/>
        </div>
    </div>
    <div class="form-row">
        <div class="col-3 form-group">
            <label for="noSerieNuevoEquipo" class="span-form-tickets">No. de serie-Nuevo equipo </label>
            <input type="text" class="form-control form-control-sm" id="noSerieNuevoEquipo" ng-model="ticket.noSerieNew"/>
        </div>
        <div class="col-3 form-group">
            <label for="fallaTicketR" class="span-form-tickets">Falla *</label>
            <select class="form-control form-control-sm custom-select inputTicket" name="fallaTicketR" id="falla" ng-change="loadCategoriaTicketSoporte()" ng-model="ticket.idFalla">
                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                <option value="{{fallaTicket.id}}" ng-repeat="fallaTicket in listFallasTicket">
                    {{fallaTicket.descripcion}}
                </option>
            </select>
        </div>
        <div class="col-3 form-group">
            <label for="categoriaTicketR" class="span-form-tickets">Categor&iacute;a *</label>
            <select class="form-control form-control-sm custom-select inputTicket" id="categoria" name="categoriaTicketR" ng-change="loadSubcategoriaTicketSoporte()" ng-model="ticket.idCategoria">
                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                <option value="{{categoriaTicket.id}}" ng-repeat="categoriaTicket in listCategoriasTicket">
                    {{categoriaTicket.descripcion}}
                </option>
            </select>
        </div>
        <div class="col-3 form-group">
            <label for="subcategoriaTicketR" class="span-form-tickets">Subcategor&iacute;a *</label>
            <select class="form-control form-control-sm custom-select inputTicket" id="subcategoria" name="subcategoriaTicketR" ng-model="ticket.idSubcategoria">
                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                <option value="{{subcategoriaTicket.id}}" ng-repeat="subcategoriaTicket in listSubcategoriasTicket">
                    {{subcategoriaTicket.descripcion}}
                </option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="col-3 form-group">
            <label for="tipoOrdenTicketR" class="span-form-tickets">Tipo orden *</label>
            <select class="form-control form-control-sm custom-select" name="tipoOrdenTicketR" id="tipoOrden" ng-model="ticket.tipoOrden">
                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                <option value="instalacion" selected>INSTALACI&Oacute;N</option>
                <option value="soporte" selected>SOPORTE</option>
                <option value="addon" selected>ADDON</option>
            </select>
        </div>
        <div class="col-3 form-group">
            <label for="tipoNegocioTicketR" class="span-form-tickets">Tipo de negocio *</label>
            <select class="form-control form-control-sm custom-select" name="tipoNegocioTicketR" id="tipoNegocio" ng-model="ticket.tipoNegocio">
                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                <option value="residencial" selected>RESIDENCIAL</option>
                <option value="empresarial" selected>EMPRESARIAL</option>
            </select>
        </div>
        <div class="col-3 form-group">
            <label for="regionTicketR" class="span-form-tickets">Regi&oacute;n *</label>
            <select class="form-control form-control-sm custom-select" name="regionTicketR" id="region" ng-model="ticket.region">
                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                <option value="colombia" selected>COLOMBIA</option>
                <option value="mexico" selected>M&Eacute;XICO</option>
            </select>
        </div>
        <div class="col-3 form-group">
            <label for="tecnologiaTicketR" class="span-form-tickets">Tecnolog&iacute;a *</label>
            <select class="form-control form-control-sm custom-select" name="tecnologiaTicketR" id="tecnologia" ng-model="ticket.tecnologia">
                <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                <option value="huawei" selected>HUAWEI</option>
                <option value="cte" selected>ZTE</option>
                <option value="fiberhome" selected>FIBER HOME</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="col-12 form-group">
            <label class="span-form-tickets" for="descripcionProblemaTicket">Descripci&oacute;n del Problema * </label>
            <textarea class="form-control form-control-sm inputTicket" id="descripcionProblemaTicket" ng-model="ticket.descripcionProblema"></textarea>
        </div>
    </div>
    <div class="row">
        <div style="text-align: right; margin: 1em 0 0 0;">
            <input type="button" class="btn btn-primary" ng-click="registrarTicketSoporte(ticket)" value="GUARDAR">
        </div> 
    </div>
    <br>
</div>