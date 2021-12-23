<div  ng-show="showOs" class="header-back-title col-4">
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
<div  ng-show="showOs" class="header-back-title col-8">
    <div class="alinear-derecha">
        <div class="textcontainer-header" style="padding: 1em;">
            <!--a class="style-link" href="" ng-click="mostrarDetalleActivarDesdeOs()">
                <span style="font-size: 15px;">Activar</span>
            </a-->
        </div> 
        <div class="iconsf-container">
            <img class="img-os img-header-back" src="${pageContext.request.contextPath}/resources/img/iconossf/os.png" alt="">
        </div>      
        <div class="textcontainer-header">
            <span class="text-title-elementoh">OS:</span>
            <span class="title-regresar-generic"  ng-bind="detalle.nombre"></span>
        </div>   
    </div>          
</div>

<div ng-show="showOs" class="col-12 ">
    <div ng-show="isAbiertoOSNoticias" class="container-noticia-elemento">
        <img id="btnRefresNoticias" style="cursor: pointer;" alt="Refresh" ng-click="objectoConsulta()"  src="${pageContext.request.contextPath}/resources/img/generic/actualizar_icon.svg">
        <span class="cerrarnoticias" ng-click="isAbiertoOSNoticias=false">Ocultar noticias</span>
        <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
        <div ng-if="listadoNoticias.length <= 0" class="container mt-5">
            <h5 class="noinfo-noticias">No se encontr&oacute; informaci&oacute;n</h5>
        </div>
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
                                    <button id="button-subcommet-{{noticia.id}}" type="button" class="btn-close close-enviar-subcomentario" ng-click="responderComentario(noticia.id)" data-mdb-dismiss="modal" aria-label="Close" style="display: none;"></button>
                                    <div id="content-text-e-{{noticia.id}}" class="row content-text-send" style="display: none;">
                                        <div class="col-10">
                                            <input id="texto-comentario-os-{{noticia.id}}" type="text" class="form-control form-control-sm form-send">
                                        </div>
                                        <div class="col-2 col-btn-send">
                                            <button class="btn btn-sm btn-primary btn-send" ng-click="enviarComentario(noticia.id)">Enviar</i></button>
                                        </div>
                                            <div class="col-12 col-adjuntar-archivo" ng-show="showAdjuntar">
                                                <form id="uploadFormSubcomentario-{{noticia.id}}" name="16" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                                                    <div class="box__input">
                                                        <input name="myFileSubOs" type="file" class="box__file inputFile adjuntar-archivo-os" onchange="cambiar(this)" id="fileSubComentarioOs-{{noticia.id}}"/>	
                                                        <label for="fileSubComentarioOs-{{noticia.id}}" id="etiqueta_archivo">
                                                            <span class="text_select_archivo_sub col-content-text-general">Adjuntar archivo</span>
                                                     </div>
                                                </form>
                                            </div>
                                            <div class="col-12 col-adjuntar-arch" ng-show="showAdjuntar">
                                                <span class="eliminar_archivo_sub" ng-show="showEliminarSubOs" ng-click="resetFile(noticia.id)">Eliminar</span>
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
        <div class="divider-noticias" style=" width: 100%;height: 1px; background: gainsboro;"></div>
        <div class="row">
            <div class="col-10 col-content-text-general">
                <input id="text-general-os" type="text" class="form-control form-control-sm form-send-general">
            </div>
            <div class="col-2 col-btn-send-general">
                <button class="btn btn-sm btn-primary btn-send" ng-click="enviarMesajeGeneral()">Enviar</button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <form id="uploadForm" name="13" class="form-horizontal box form_drag_drop" novalidate="novalidate" enctype="multipart/form-data">
                    <div class="box__input">
                        <input name="myFile" type="file" class="box__file inputFile" id="fileOs">	
                        <label for="fileOs" id="etiqueta_archivo">
                            <span class="text_select_archivo col-content-text-general">Adjuntar archivo</span>
                     </div>
                </form>
            </div>
            
        </div>
        <div class="row">
            <div class="col-12">
                <span class="eliminar_archivo" ng-show="showEliminarOs" ng-click="resetFile()">Eliminar</span>
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
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Nombre:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.nombre}}" ng-bind="detalle.nombre"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Propietario:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.propietarioOportunidad}}" ng-bind="detalle.propietarioOportunidad"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estatus:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.estatus}}" ng-bind="detalle.estatus"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Motivo de cancelaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.motivoCancelacion}}" ng-bind="detalle.motivoCancelacion"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Canal de venta:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.canalVenta}}" ng-bind="detalle.canalVenta"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Fecha agendada:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.fechaAgendada}}" ng-bind="detalle.fechaAgendada"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Ts completado:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tscompletado}}" ng-bind="detalle.tscompletado"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Ts confirmado:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tsconfirmado}}" ng-bind="detalle.tsconfirmado"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">OS confirmado:</span></div>
                    <div class="col-6 crop-text-col">
                        <input type="checkbox" disabled readonly ng-model="detalle.osConfirmada" ng-true-value="'true'" ng-false-value="'false'">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Turno:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.turnoAg}}" ng-bind="detalle.turnoAg"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Tipo de orden:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.tipoOrden}}" ng-bind="detalle.tipoOrden"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cot sitio plan:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCotSitioPlan.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href=""class="link-consultardetalle" ng-if="detalle.detalleCotSitioPlan.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCotSitioPlan.id, detalle.detalleCotSitioPlan.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCotSitioPlan.nombre}}" ng-bind="detalle.detalleCotSitioPlan.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cotizaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCotizacion.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href=""class="link-consultardetalle" ng-if="detalle.detalleCotizacion.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCotizacion.id, detalle.detalleCotizacion.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCotizacion.nombre}}" ng-bind="detalle.detalleCotizacion.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cuenta factura:</span></div>
                    <div class="col-6 crop-text-col">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleCuentaFactura.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleCuentaFactura.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleCuentaFactura.id, detalle.detalleCuentaFactura.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleCuentaFactura.nombre}}" ng-bind="detalle.detalleCuentaFactura.nombre"></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Oporturnidad:</span></div>
                    <div class="col-6 crop-text-col" style="overflow: hidden;">
                        <span class="content-first-title-head-answer" ng-if="detalle.detalleOportunidad.nombre === undefined">Sin informaci&oacute;n</span>
                        <a href="" class="link-consultardetalle" ng-if="detalle.detalleOportunidad.nombre !== undefined" ng-click="consultarDetalleObjectosSF(detalle.detalleOportunidad.id, detalle.detalleOportunidad.keyObject)">
                            <span class="content-first-title-head-answer" title="{{detalle.detalleOportunidad.nombre}}" ng-bind="detalle.detalleOportunidad.nombre"></span>
                        </a>
                    </div>
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
                    <div class="col-12 crop-text-col"><span class="content-first-title-head-answer  normal-texto-largo" title="{{detalle.comentariosOs}}" ng-bind="detalle.comentariosOs"></span></div>
                </div>
            </div>
        </div>
    </div>


    <div class="card-header style_card_header_detallepro separador-according">
        <div class="row">
            <div class="col-md-12 colTitulo">
                <p class="mb-0 header-according">Detalle del sitio</p>
            </div>
        </div>
    </div>
    <div class="col-12">
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Cluster:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.cluster}}" ng-bind="detalle.detalleSitio.cluster"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Estado:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.estado}}" ng-bind="detalle.detalleSitio.estado"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Zona:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.zona}}" ng-bind="detalle.detalleSitio.zona"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Plaza:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.plaza}}" ng-bind="detalle.detalleSitio.plaza"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Distrito:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.distrito}}" ng-bind="detalle.detalleSitio.distrito"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Delegaci&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.delegacionMunicipio}}" ng-bind="detalle.detalleSitio.delegacionMunicipio"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Regi&oacute;n:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.region}}" ng-bind="detalle.detalleSitio.region"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Ciudad:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.ciudad}}" ng-bind="detalle.detalleSitio.ciudad"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Codigo postal:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.codigoPostal}}" ng-bind="detalle.detalleSitio.codigoPostal"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Colonia:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.colonia}}" ng-bind="detalle.detalleSitio.colonia"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Calle:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.calle}}" ng-bind="detalle.detalleSitio.calle"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero exterior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.numeroExterior}}" ng-bind="detalle.detalleSitio.numeroExterior"></span></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">N&uacute;mero interior:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.numeroInterior}}" ng-bind="detalle.detalleSitio.numeroInterior"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Latitud:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.latitude}}" ng-bind="detalle.detalleSitio.latitude"></span></div>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12 row style_detalle_todos">
                    <div class="col-6 "><span class="content-first-title-head">Longitud:</span></div>
                    <div class="col-6 crop-text-col"><span class="content-first-title-head-answer" title="{{detalle.detalleSitio.longitude}}" ng-bind="detalle.detalleSitio.longitude"></span></div>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="perfiles.jsp"></jsp:include>
</div>