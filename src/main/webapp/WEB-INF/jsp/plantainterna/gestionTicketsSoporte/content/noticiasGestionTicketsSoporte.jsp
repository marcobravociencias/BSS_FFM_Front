<div  class="container-noticia-elemento">
    <div class="row">
        <div class="col-8 contenido-escribir-mensaje">
            <!--form id="uploadForm" name="13" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                <div class="box__input">
                    <input name="myFile" type="file" class="box__file inputFile" id="fileOs">	
                    <label for="fileOs" id="etiqueta_archivo">
                    <span class="text_select_archivo col-content-text-general">Adjuntar archivo</span>
                 </div>
            </form-->
            <div class="input-group ">
                <input type="text" id="text-general" class="form-control form-send-general" placeholder="Escribe aqu&iacute; tu mensaje" aria-label="Recipient's username"aria-describedby="basic-addon2" ng-model="mensajeGeneral"/>
                <input name="myFile" type="file" ng-on-change="cambioGeneral()" class="box__file inputFile" id="fileComentariosTicket">
                <label for="fileComentariosTicket" class="lbl-adjuntar-ticket"><i class="input-group-text icono-adjuntar-archivo fas fa-paperclip" id="basic-addon2"></i></label>
                <div class="badge badge-dot badge-dot-sm status-adjunto badge-warning" ng-show="!showEliminarFileTicket"></div>
                <div class="badge badge-dot badge-dot-sm status-adjunto badge-success" ng-show="showEliminarFileTicket"></div>
            </div>
            <button class="btn-send-mensaje " ng-click="enviarMesajeGeneral()">
                <i class="fas fa-paper-plane"></i>
            </button>
            
        </div> 
        <div class="col-4 content-button-regrescar-comentarios">
            <img id="btnRefresNoticias" style="cursor: pointer;" alt="Refresh" ng-click="consultarComentariosTicketSoporte()"  
                src="${pageContext.request.contextPath}/resources/img/generic/actualizar_icon.svg">
        </div>       
    </div>
    <div class="row">
        <div class="col-12 col-input-adjunto">
            <span id="spnNombreArchivo" class="spn-titulo-adjunto"></span>
            <i class="fas fa-trash-alt icon-eliminar-adjunto" ng-show="showEliminarFileTicket" ng-click="resetFileGeneral()"></i>
        </div>
    </div>
 
    <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
    <div class="row" >
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
                                <button id="button-subcommet-{{noticia.id}}" type="button" class="btn-close close-enviar-subcomentario" ng-click="responderComentario(noticia.id)" aria-label="Close" style="display: none;"></button>
                                <div id="content-subcomentario-{{noticia.id}}" class="row container-text-subcomentarios" style="display: none;">
                                    <div class="col-8 col-input-text-subcomentarios" style="width: 90%;">
                                        <div class="input-group input-group-subcomentarios">
                                            <input type="text" id="texto-subcomentario-{{noticia.id}}" class="form-control form-send-general text-subcomentario-ticket" placeholder="Escribe aqu&iacute; tu mensaje" aria-label="Recipient's username"aria-describedby="basic-addon2"/>
                                            <input type="file" class="box__file inputFile" id="fileSubComentarioTicket-{{noticia.id}}" onchange="cambiar(this)"/>
                                            <label for="fileSubComentarioTicket-{{noticia.id}}" class="lbl-adjuntar-ticket"><i class="input-group-text icon-adjuntar-subcomentarios fas fa-paperclip" id="basic-addon2"></i></label>
                                            <div class="badge badge-dot badge-dot-sm status-adjunto badge-warning" ng-show="!showEliminarSubComTicket"></div>
                                            <div class="badge badge-dot badge-dot-sm status-adjunto badge-success" ng-show="showEliminarSubComTicket"></div>
                                        </div>
                                    </div>
                                    <div class="col-2" style="top: -34px; left: 34em;">
                                        <button class="btn-send-mensaje" ng-click="enviarComentario(noticia.id)" style="height: 2.2em;">
                                            <i class="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                    <div class="col-2 adjuntar-archivo-subcomentario">
                                        <span id="spnNombreAdSubComentario-{{noticia.id}}" class="spn-titulo-adjunto"></span>
                                        <i class="fas fa-trash-alt icon-eliminar-adjunto" ng-show="showEliminarSubComTicket" ng-click="resetFile(noticia.id)"></i>
                                    </div>
                                </div>
                                <div class="row">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ng-if="noticia.media" class="row row-adjunto-principal">
                    <div class="col-12 col-adjunto-principal">
                        <div class="row">
                            <div class="file-adjuntado"  ng-switch="noticia.media.type">
                                <img ng-switch-when="JPG"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-adjuntado-comentarios" alt="">
                                <img ng-switch-when="JPEG" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-adjuntado-comentarios" alt="">
                                <img ng-switch-when="PNG"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-adjuntado-comentarios" alt="">
                                <img ng-switch-when="GIF"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="imagen-adjuntado-comentarios" alt="">
                                <img ng-switch-when="PDF"  src="${pageContext.request.contextPath}/resources/img/iconossf/pdf.png" class="imagen-adjuntado-comentarios" alt="">                                
                                <img ng-switch-when="POWER_POINT_X" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png" class="imagen-adjuntado-comentarios" alt="">
                                <img ng-switch-when="PPTX" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png" class="imagen-adjuntado-comentarios" alt="">
                                <img ng-switch-default src="${pageContext.request.contextPath}/resources/img/iconossf/not-found.jpg" class="imagen-adjuntado-comentarios" alt="">

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
                            <img ng-switch-when="JPG"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="img-adjunto-subcomentarios" alt="">
                            <img ng-switch-when="JPEG" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="img-adjunto-subcomentarios" alt="">
                            <img ng-switch-when="PNG"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="img-adjunto-subcomentarios" alt="">
                            <img ng-switch-when="GIF"  src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" class="img-adjunto-subcomentarios" alt="">
                            <img ng-switch-when="PDF"  src="${pageContext.request.contextPath}/resources/img/iconossf/pdf.png" class="img-adjunto-subcomentarios" alt="">
                            <img ng-switch-when="PPTX" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png" class="img-adjunto-subcomentarios" alt="">
                            <img ng-switch-when="POWER_POINT_X" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png" class="img-adjunto-subcomentarios" alt="">

                            <img ng-switch-default src="${pageContext.request.contextPath}/resources/img/iconossf/not-found.jpg" class="img-adjunto-subcomentarios" alt="">

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

    
</div>