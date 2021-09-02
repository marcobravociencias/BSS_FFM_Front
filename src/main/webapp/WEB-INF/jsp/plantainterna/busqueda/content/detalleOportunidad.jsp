


<div  ng-show="showOportunidad" class="header-back-title col-2">
    <div  ng-click="regresarConsulta()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-undo"></span>
    </div>
    <div  ng-click="abrirNoticiasos()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-newspaper-o"></span>
    </div>
    <div  ng-click="regresarHome()" class="container-regresar-button text-center">
        <span class="regresar-elemento fa fa-home"></span>
    </div>
</div>
<div  ng-show="showOportunidad" class="header-back-title col-10">
    <div class="alinear-derecha">
        <div class="iconsf-container">
            <img class="img-oportunidad img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/oportunidad.png" alt="">
        </div>      
        <div class="textcontainer-header">
            <span class="text-title-elementoh">Oportunidad:</span>
            <span class="title-regresar-generic"  ng-bind="detalle.nombre"></span>
        </div>   
    </div>          
</div>

<div  ng-show="showOportunidad" class="col-12 separador-according">
    <div ng-show="isAbiertoOSNoticias" class="container-noticia-elemento">
        <img id="btnRefresNoticias" style="cursor: pointer;" alt="Refresh" ng-click="objectoConsulta()"  src="img/generic/actualizar_icon.svg">
        <span class="cerrarnoticias" ng-click="isAbiertoOSNoticias=false">Ocultar noticias</span>
        <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
        <div ng-if="listadoNoticias.length <= 0" class="container mt-5">
            <h5 class="noinfo-noticias">No se encontr&oacute; informaci&oacute;n</h5>
        </div>
        <div ng-repeat="noticia in listadoNoticias track by $index" class="container-noticias row">
                
                <div class="col-12">
                    <div class="row">
                        <div class="col-12">
                            <div class="image-preview">
                                <img class="img-created-by-comme" src="{{noticia.imgCreatedBy}}" alt="">
                                <div class="div-titelheader-detalle">
                                    <h1 class="titelheader-detalle" ng-bind="noticia.createdBy"></h1>
                                    <h1 class="subtitelheader-detalle" ng-bind="noticia.text"></h1>
                                    <span class="option-mensajes" ng-click="responderComentario(noticia.id)">Responder</span>
                                    <!-- <span class="option-mensajes" ng-click="editarComentario(noticia.id, noticia.text, 0)">Editar</span> -->
                                    <span class="option-mensajes" ng-click="eliminarComentario(noticia.id, 0)">Eliminar</span>
                                    <span class="text-fecha-comentario" ng-bind="noticia.createdDate"></span>
                                    <div id="content-text-enviar-{{noticia.id}}" class="row content-text-send">
                                        <div class="col-10">
                                            <input id="texto-comentario-op-{{noticia.id}}" type="text" class="form-control form-control-sm form-send">
                                        </div>
                                        <div class="col-2 col-btn-send">
                                            <button class="btn btn-sm btn-primary btn-send" ng-click="enviarComentario(noticia.id)"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                        </div>
                                        <div class="col-12 col-adjuntar-archivo" ng-show="showAdjuntar">
                                            <form id="uploadFormSubcomentario-{{noticia.id}}" name="17" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                                                <div class="box__input">
                                                    <input name="myFileSubOs" type="file" class="box__file inputFile adjuntar-archivo-os" onchange="cambiar(this)" id="fileSubComentarioOp-{{noticia.id}}"/>	
                                                    <label for="fileSubComentarioOp-{{noticia.id}}" id="etiqueta_archivo">
                                                        <span class="text_select_archivo_sub col-content-text-general">Adjuntar archivo</span>
                                                 </div>
                                            </form>
                                        </div>
                                        <div class="col-12 col-adjuntar-arch" ng-show="showAdjuntar">
                                            <span class="eliminar_archivo_sub" ng-show="showEliminarSubOp" ng-click="resetFile(noticia.id)">Eliminar</span>
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
                                <img ng-switch-when="JPG"  src="${pageContext.request.contextPath}/img/iconossf/imageico.jpg" class="imagen-adjuntado-noticia" alt="">
                                <img ng-switch-when="JPEG" src="${pageContext.request.contextPath}/img/iconossf/imageico.jpg" class="imagen-adjuntado-noticia" alt="">
                                <img ng-switch-when="PNG"  src="${pageContext.request.contextPath}/img/iconossf/imageico.jpg" class="imagen-adjuntado-noticia" alt="">
                                <img ng-switch-when="GIF"  src="${pageContext.request.contextPath}/img/iconossf/imageico.jpg" class="imagen-adjuntado-noticia" alt="">
                                <img ng-switch-when="PDF"  src="${pageContext.request.contextPath}/img/iconossf/pdf.png" class="" alt="">                                
                                <img ng-switch-when="POWER_POINT_X" src="${pageContext.request.contextPath}/img/iconossf/powerpoint.png" class="" alt="">
                                <img ng-switch-when="PPTX" src="${pageContext.request.contextPath}/img/iconossf/powerpoint.png" class="" alt="">
                                <img ng-switch-default src="${pageContext.request.contextPath}/img/iconossf/not-found.jpg" class="imagen-adjuntado-noticianot" alt="">

                                <div class="title-file-adjuntado">
                                    <h1 class="text-title-adjuntado" ng-bind="noticia.media.name" ></h1>
                                    <a href="{{noticia.media.downloadLink}}" class="text-title-descarga-adjuntado" >Descargar</a>
                                    <a href="{{noticia.media.preview}}" target="_blank" class="text-title-descarga-adjuntado" >Vista previa</a>
                                </div>
                            </div>                                
                            </div>
                        </div>
                    </div>
        
                    <div ng-repeat="comentario in noticia.subComentarios track by comentario.id" class="row container-elementcommes">
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
                                    <div id="content-text-enviar-{{comentario.id}}" class="row content-text-send">
                                        <div class="col-10">
                                            <input id="texto-comentario-op-{{comentario.id}}" type="text" class="form-control form-control-sm form-send">
                                        </div>
                                        <div class="col-2 col-btn-send">
                                            <button class="btn btn-sm btn-primary btn-send" ng-click="enviarComentario(comentario.id)"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-10 offset-1" ng-if="comentario.media">
                        <div class="row content-archivo-comentario">
                            <div class="imagen-adjuntado-comment" ng-switch="comentario.media.type">
                                <img ng-switch-when="JPG"  src="${pageContext.request.contextPath}/img/iconossf/imageico.jpg" class="imagen-comment-owner" alt="">
                                <img ng-switch-when="JPEG" src="${pageContext.request.contextPath}/img/iconossf/imageico.jpg" class="imagen-comment-owner" alt="">
                                <img ng-switch-when="PNG"  src="${pageContext.request.contextPath}/img/iconossf/imageico.jpg" class="imagen-comment-owner" alt="">
                                <img ng-switch-when="GIF"  src="${pageContext.request.contextPath}/img/iconossf/imageico.jpg" class="imagen-comment-owner" alt="">
                                <img ng-switch-when="PDF"  src="${pageContext.request.contextPath}/img/iconossf/pdf.png" class="" alt="">
                                <img ng-switch-when="PPTX" src="${pageContext.request.contextPath}/img/iconossf/powerpoint.png" class="" alt="">
                                <img ng-switch-when="POWER_POINT_X" src="${pageContext.request.contextPath}/img/iconossf/powerpoint.png" class="" alt="">

                                <img ng-switch-default src="${pageContext.request.contextPath}/img/iconossf/not-found.jpg" class="imagen-comment-owner" alt="">

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
        <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
        <div class="row">
            <div class="col-10 col-content-text-general">
                <input id="text-general-oportunidad" type="text" class="form-control form-control-sm form-send-general">
            </div>
            <div class="col-2 col-btn-send-general">
                <button class="btn btn-sm btn-primary btn-send" ng-click="enviarMesajeGeneral()"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <form id="uploadFormOp" name="14" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                    <div class="box__input">
                        <input name="myFile" type="file" class="box__file inputFile" id="fileOportunidad">	
                        <label for="fileOportunidad" id="etiqueta_archivo">
                            <span class="text_select_archivo col-content-text-general">Adjuntar archivo</span>
                     </div>
                </form>
            </div>
            
        </div>
        <div class="row">
            <div class="col-12">
                <span class="eliminar_archivo" ng-show="showEliminarOp" ng-click="resetFile()">Eliminar</span>
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
            <div class="col-4" style="overflow: hidden;">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombre}}" ng-bind="detalle.nombre"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">N&uacute;mero:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.numeroOportunidad}}" ng-bind="detalle.numeroOportunidad"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Etapa:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.etapa}}" ng-bind="detalle.etapa"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Origen prospecto:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.origenProspecto}}" ng-bind="detalle.origenProspecto"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Segmento:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.segmento}}" ng-bind="detalle.segmento"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Segmento facturaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.segmentoFacturacion}}" ng-bind="detalle.segmentoFacturacion"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Tipo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipo}}" ng-bind="detalle.tipo"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Subtipo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.subTipo}}" ng-bind="detalle.subTipo"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Plaza:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.plaza}}" ng-bind="detalle.plaza"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Plazo:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.plazo}}" ng-bind="detalle.plazo"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Monto de facturaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.montoFacturacion}}" ng-bind="detalle.montoFacturacion"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Fecha cierre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaCierre}}" ng-bind="detalle.fechaCierre"></span></div>
                </div>
            </div>
        </div>
    </div>

    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Datos de la cuenta</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col">
                        <a href="" class="link-consultardetalle " ng-click="consultarDetalleObjectosSF(detalle.datosCuenta.id, detalle.datosCuenta.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.datosCuenta.nombre}}" ng-bind="detalle.datosCuenta.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-4"><span class="content-first-title-head">Raz&oacute;n social:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.datosCuenta.razonSocial}}" ng-bind="detalle.datosCuenta.razonSocial"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6"><span class="content-first-title-head">RFC:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.datosCuenta.rfc}}" ng-bind="detalle.datosCuenta.rfc"></span></div>
                </div>
            </div>
            <div class="col-6">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-4"><span class="content-first-title-head">Top 5000:</span></div>
                    <div class="col-6">
                        <input type="checkbox" disabled readonly ng-model="detalle.datosCuenta.top5000" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
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
                        <span class="content-first-title-head-answer" ng-show="detalle.modificadoPor.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.modificadoPor.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.modificadoPor)" title="{{detalle.modificadoPor.nombre}}" ng-bind="detalle.modificadoPor.nombre"></span>
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
                        <span class="content-first-title-head-answer" ng-show="detalle.propietarioCuenta.nombre === undefined">Sin informaci&oacute;n</span>
                        <span class="link-perfiles content-first-title-head-answer" ng-show="detalle.propietarioCuenta.nombre !== undefined" ng-click="mostrarModalDetalleUsuario(detalle.propietarioCuenta)" title="{{detalle.propietarioCuenta.nombre}}" ng-bind="detalle.propietarioCuenta.nombre"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br>
</div>
