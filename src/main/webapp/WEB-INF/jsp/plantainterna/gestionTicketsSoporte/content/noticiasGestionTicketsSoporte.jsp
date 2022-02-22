<div class="content-fluid" ng-show="isConsultaComentarios">
    <div class="container-noticia-elemento">
        <ul class="nav nav-tabs" id="myTab" role="tablist" style="margin-bottom: 0px;margin-top: 10px;">
            <li class="nav-item" style="margin-left: 10px;">
               <h6 class="titulo-comentarios-ticket">COMENTARIOS</h6>
            </li>
            <button type="button" class="close" id="closeDetalleTicket" ng-click="closeComentarios()">
                <span aria-hidden="true">&times;</span>
            </button>
        </ul>
        <div class="content-fluid" id="myTabContent">
            <div class="row" id="comentariosTicket" role="tabpanel" aria-labelledby="comentariosTicket-tab" >
                <div id="container-comentarios-ticket">
                    <div class="container-chatter-ffm" ng-repeat="noticia in listadoNoticias track by $index">
                        <div class="content-mensaje-principal">
                            <div class="content-icons-mensaje-principal">
                                    <i class="icon-accion-principal-accion fas fa-reply" ng-click="responderComentarioTicket(noticia.id)"></i>
                                    <i class="icon-accion-principal-accion fas fa-times" ng-click="eliminarComentario(noticia.id, 0)"></i>
                            </div>
                            <div class="content-mensaje-principal-body">
                                <div class="content-foto-imagen-user">
                                    <img class="imagen-mensaje-principal" src="{{noticia.imgCreatedBy}}" alt="">
                                </div>  
                                <div class="content-text-principal">
                                    <h4 class="mensaje-top-principal">{{noticia.createdBy}}
                                        <span class="hora-mensaje-principal"> <span class="dot-hora-mensaje-principal"></span>{{noticia.createdDate}}</span>
            
                                    </h4>
                                    <h5 class="mensaje-bottom-principal">{{noticia.text}}</h5> 
                                </div>
                            </div>
                            <div id="content-subcomentario-{{noticia.id}}" class="content-mensaje-sub-icons" style="display: none;">
                                <textarea id="texto-subcomentario-{{noticia.id}}" class="archivo-text-comentario" rows="3" ></textarea>
                                <div class="icons-buttons-agregar-comment">
                                    <!-- <i class="icono-accion-comentario icon-adjuntar fas fa-images"></i> -->
                                    <span id="textAdjuntar{{noticia.id}}" class="text_select_archivo_sub col-content-text-general"></span>
                                    <input name="fileSubComentarioTicket" type="file" class="box__file inputFile adjuntar-archivo-os" onchange="cambiar(this)" id="fileSubComentarioTicket-{{noticia.id}}" />
                                    <label id="labelAdjuntarSubcomentario{{noticia.id}}" ng-show="!showEliminarSubComTicket" for="fileSubComentarioTicket-{{noticia.id}}"><i class="icono-accion-comentario icon-adjuntar fas fa-paperclip"></i></label>
                                    <label id="labelEliminarAdjuntoSubComentario{{noticia.id}}" ng-show="showEliminarSubComTicket" ng-click="resetFile(noticia.id)"><i class="icono-accion-comentario icon-adjuntar fas fa-trash-alt"></i></label>
                                    <button id="btnEnviarSubComentario{{noticia.id}}" class="btn enviar-comentario" ng-click="enviarComentario(noticia.id)">
                                        <i class="fas fa-paper-plane" style=" margin-right: .5em;"></i>
                                        Enviar
                                    </button>
                                </div>
                                
                            </div>
                            <div class="content-principal-file" ng-if="noticia.media" ng-switch="noticia.media.type">
                                <img ng-switch-when="JPG" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" alt="">
                                <img ng-switch-when="JPEG" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg"  alt="">
                                <img ng-switch-when="PNG" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg"  alt="">
                                <img ng-switch-when="GIF" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg"  alt="">
                                <img ng-switch-when="PDF" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/pdf.png"  alt="">
                                <img ng-switch-when="POWER_POINT_X" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png"  alt="">
                                <img ng-switch-when="PPTX" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png"  alt="">
                                <img ng-switch-default class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/not-found.jpg"  alt="">
                                <div class="principal-text">
                                    <b class="text-nombre-archivo">{{noticia.media.name}}</b>
                                    <a href="{{noticia.media.downloadLink}}" class="text-nombre-archivo-descarga"> descargar</a>
                                </div>
                            </div>
                            <div class="content-mensaje-sub" ng-repeat="subcomentario in noticia.subComentarios track by $index">
                                <div class="content-icons-mensaje-sub">
                                    <i class="icon-accion-principal-accion position-icon-sub fas fa-times" ng-click="eliminarComentario(subcomentario.id, 1)"></i>
                                </div>
                                <div class="content-mensaje-sub-body">
                                    <div class="content-foto-imagen-user">
                                        <img class="imagen-mensaje-principal" src="{{subcomentario.imgCreatedBy}}" alt="">
                                    </div>  
                                    <div class="content-text-principal">
                                        <h4 class="mensaje-top-principal">{{subcomentario.createdBy}}
                                            <span class="hora-mensaje-principal"> <span class="dot-hora-mensaje-principal"></span>{{subcomentario.createdDate}}</span>
                
                                        </h4>
                                        <h5 class="mensaje-bottom-principal">{{subcomentario.text}}</h5> 
                                    </div>
                                </div>
                                <div class="content-principal-file" ng-if="subcomentario.media" ng-switch="subcomentario.media.type">
                                    <img ng-switch-when="JPG" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg" alt="">
                                    <img ng-switch-when="JPEG" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg"  alt="">
                                    <img ng-switch-when="PNG" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg"  alt="">
                                    <img ng-switch-when="GIF" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/imageico.jpg"  alt="">
                                    <img ng-switch-when="PDF" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/pdf.png"  alt="">
                                    <img ng-switch-when="POWER_POINT_X" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png"  alt="">
                                    <img ng-switch-when="PPTX" class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/powerpoint.png"  alt="">
                                    <img ng-switch-default class="principal-file" src="${pageContext.request.contextPath}/resources/img/iconossf/not-found.jpg"  alt="">
                                    <div class="principal-text">
                                        <b class="text-nombre-archivo">{{subcomentario.media.name}}</b>
                                        <a href="{{subcomentario.media.downloadLink}}" class="text-nombre-archivo-descarga"> descargar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
                <div class="content-mensaje-icons-general">
                    <textarea class="archivo-text-comentario" rows="3" ng-model="mensajeGeneral"></textarea>
                    <div class="icons-buttons-agregar-comment">
                        <!-- <i class="icono-accion-comentario icon-adjuntar fas fa-images"></i> -->
                        <span id="textAdjuntoGeneral" class="text_select_archivo"></span>
                        <input name="myFile" type="file" ng-on-change="cambioGeneral()" class="box__file inputFile" id="fileComentariosTicket">
                        <label id="labelAdjuntoComentario" ng-show="!showEliminarFileTicket" for="fileComentariosTicket"><i class="icono-accion-comentario icon-adjuntar fas fa-paperclip"></i></label>
                        <label id="labelEliminarAdjComentario" ng-show="showEliminarFileTicket" class="col-icon-eliminar" ng-click="resetFileGeneral()"><i class="icono-accion-comentario icon-adjuntar fas fa-trash-alt"></i></label>
                        <button class="btn enviar-comentario" ng-click="enviarMesajeGeneral()">
                            <i class="fas fa-paper-plane" style=" margin-right: .5em;"></i>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>