

<div  ng-show="showTicket" class="header-back-title col-2">
    <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
    <div  ng-click="abrirVentanaNoticias()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-newspaper-o"></span>
    </div>
    <div  ng-click="regresarHome()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-home"></span>
    </div>
</div>
<div  ng-show="showTicket" class="header-back-title col-10">
    <div class="alinear-derecha">
        <div class="iconsf-container">
            <img class="img-tickets img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/tickets.png" alt="">
        </div>      
        <div class="textcontainer-header">
            <span class="text-title-elementoh">Ticket:</span>
            <span class="title-regresar-generic"  ng-bind="detalle.asunto"></span>
        </div>   
    </div>          
</div>


<div ng-show="showTicket"class="col-12 separador-according">
    <div ng-show="isAbiertoOSNoticias" class="container-noticia-elemento">
        <img id="btnRefresNoticias" style="cursor: pointer;" alt="Refresh" ng-click="objectoConsulta()"  src="${pageContext.request.contextPath}/resources/img/generic/actualizar_icon.svg">
        <span class="cerrarnoticias" ng-click="isAbiertoOSNoticias=false">Ocultar noticias</span>
        <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
        <div ng-if="listadoNoticias.length <= 0" class="container mt-5">
            <h5 class="noinfo-noticias">No se encontr&oacute; informaci&oacute;n</h5>
        </div>
        <div class="row" style="max-height: 22.8em; overflow-y: scroll;">
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
                                    <span class="option-mensajes" ng-click="responderComentario(noticia.id)">Responder</span>
                                    <!-- <span class="option-mensajes" ng-click="editarComentario(noticia.id, noticia.text, 0)">Editar</span> -->
                                    <span class="option-mensajes" ng-click="eliminarComentario(noticia.id, 0)">Eliminar</span>
                                    <span class="text-fecha-comentario" ng-bind="noticia.createdDate"></span>
                                    <button id="button-subcommet-ticket-{{noticia.id}}" type="button" class="btn-close close-enviar-subcomentario" ng-click="responderComentario(noticia.id)" aria-label="Close" style="display: none;"></button>
                                    <div id="content-text-{{noticia.id}}" class="row content-text-send" style="display: none;">
                                        <div class="col-10">
                                            <input id="texto-comentario-{{noticia.id}}" type="text" class="form-control form-control-sm form-send">
                                        </div>
                                        <div class="col-2 col-btn-send">
                                            <button class="btn btn-sm btn-primary btn-send" ng-click="enviarComentario(noticia.id)">Enviar</i></button>
                                        </div>
                                            <div class="col-12 col-adjuntar-archivo" ng-show="showAdjuntar">
                                                <form id="uploadFormSubcomentario-{{noticia.id}}" name="16" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                                                    <div class="box__input">
                                                        <input name="myFileSubOs" type="file" class="box__file inputFile adjuntar-archivo-os" onchange="cambiar(this)" id="fileSubComentarioTick-{{noticia.id}}"/>	
                                                        <label for="fileSubComentarioTick-{{noticia.id}}" id="etiqueta_archivo">
                                                            <span class="text_select_archivo_sub col-content-text-general">Adjuntar archivo</span>
                                                     </div>
                                                </form>
                                            </div>
                                            <div class="col-12 col-adjuntar-arch" ng-show="showAdjuntar">
                                                <span class="eliminar_archivo_sub" ng-show="showEliminarSubTick" ng-click="resetFile(noticia.id)">Eliminar</span>
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
                                    <div id="content-text-{{comentario.id}}" class="row content-text-send" style="display: none;">
                                        <div class="col-10">
                                            <input id="texto-comentario-{{comentario.id}}" type="text" class="form-control form-control-sm form-send">
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
                        <input name="myFile" type="file" class="box__file inputFile" id="fileTicket">	
                        <label for="fileTicket" id="etiqueta_archivo">
                            <span class="text_select_archivo col-content-text-general">Adjuntar archivo</span>
                     </div>
                </form>
            </div>
            
        </div>
        <div class="row">
            <div class="col-12" style="top: -1em;">
                <span class="eliminar_archivo" ng-show="showEliminarTicket" ng-click="resetFile()">Eliminar</span>
            </div>
        </div>
    </div>

    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Informaci&oacute;n general</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-2 "><span class="content-first-title-head">Asunto:</span></div>
                    <div class="col-10 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.asunto}}" ng-bind="detalle.asunto"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nivel 1:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nivel1}}" ng-bind="detalle.nivel1"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nivel 2:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nivel2}}" ng-bind="detalle.nivel2"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nivel 3:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nivel3}}" ng-bind="detalle.nivel3"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero de caso:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.caseNumber}}" ng-bind="detalle.caseNumber"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Folio:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.folioSd}}" ng-bind="detalle.folioSd"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha de creaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.createdDate}}" ng-bind="detalle.createdDate"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Primera fecha de agendamiento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.primerFechaAgendamiento}}" ng-bind="detalle.primerFechaAgendamiento"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha agendamiento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaAgendamiento}}" ng-bind="detalle.fechaAgendamiento"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estatus:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.status}}" ng-bind="detalle.status"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Origen:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.origin}}" ng-bind="detalle.origin"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Motivo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.motivo}}" ng-bind="detalle.motivo"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Soluci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.solucionOT}}" ng-bind="detalle.solucionOT"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">OS:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="!detalle.detalleOs.nombre">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleOs.nombre" ng-click="consultarDetalleObjectosSF(detalle.detalleOs.id, detalle.detalleOs.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleOs.nombre}}" ng-bind="detalle.detalleOs.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cuenta factura:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCuentaFactura.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle"  ng-if="detalle.detalleCuentaFactura.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCuentaFactura.id, detalle.detalleCuentaFactura.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCuentaFactura.nombre}}" ng-bind="detalle.detalleCuentaFactura.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
          
        </div>

   
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12"><span class="content-first-title-head">Descripci&oacute;n:</span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12 crop-text-col"><span class="content-first-title-head-answer normal-texto-largo" title="{{detalle.description}}" ng-bind="detalle.description"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12"><span class="content-first-title-head">Comentarios:</span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-12 crop-text-col"><span class="content-first-title-head-answer normal-texto-largo" title="{{detalle.comentariosSd}}" ng-bind="detalle.comentariosSd"></span></div>
                </div>
            </div>
        </div>
    </div>


    <jsp:include page="perfiles.jsp"></jsp:include>

    <br>
</div>