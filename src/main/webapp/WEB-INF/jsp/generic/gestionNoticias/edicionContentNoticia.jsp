
<div class="row">
    <div class="container-visualiza-noticia col-4">
        <div class="container-celular-visualizador">
            <div class="container-header-celular">
                <div class="left-header-celular-hora">
                    <span class="text-hora-celular">9:41</span>
                </div>
                <div class="derecha-iconos-celular">
                    <i class="header-icono-celular fas fa-signal"></i>
                    <i class="header-icono-celular fas fa-wifi"></i>
                    <i class="header-icono-celular fas fa-battery-full"></i>
                </div>
            </div>
            <div class="container-bars-title">
                <div class="content-bar-icon">
                    <i class="icono-bars-app-icono fas fa-bars"></i>
                </div>
                <div class="content-title-app">
                    <h5 class="text-title-app"> Ordenes de trabajo</h5>
                </div>
            </div>
            <div class="container-tecnico">
                <div class="content-tecnico-imagen">
                    <img  src="${pageContext.request.contextPath}/resources/img/generic/noticias/img_herzon.png" class="img-tecnico-app" alt="">
                </div>
                <div class="content-tecnico-nombre-completo">
                    <h5 class="text-tecnico-nombre"> Miguel &Aacute;ngel</h5>
                    <h5 class="text-tecnico-apellido"> Campos Pacheco</h5>
                </div>
            </div>
            <div class="container-dia-app">
                <div class="content-text-dia-actual">
                    <i class="icono-calendario-dia-actual far fa-calendar"></i>
                    <span class="text-dia-actual">Martes 18 Mayo </span>
                </div>
            </div>
            <div class="container-noticias-visualizador">
                <div  class="imagen-noticia-previsualizador">                      
                    <img  ng-show="fileCargaArchivoNoticiaEdit.archivo" class="imagen-visor-creanotica" ng-src="data:image/jpeg;base64,{{fileCargaArchivoNoticiaEdit.archivo}}" alt="">
                    <div ng-show="!inhabilidarCamposEdicion" class="content-titulo-principal">
                        <span class="text-title titulo-principal" ng-bind="editObj.tituloPrincipal" ></span>
                    </div>
                    <div ng-show="!inhabilidarCamposEdicion" class="content-titulo-secundario">
                        <span class="text-title titulo-secundario" ng-bind="editObj.tituloSecundario" ></span>
                    </div>

                    <div class="content-icons-image">
                        <div ng-click="triggerInputFileEditar()" class="icon-accion-imagen">
                            <i  class="fas fa-camera icono-funcion-imagen"></i>
                        </div>
                        <div ng-click="removerImagenEditar()" class="icon-accion-imagen">
                            <i  class="far fa-trash-alt icono-funcion-imagen"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-categorias-app row">
                <div class="content-categoria-app col">
                    <div class="content-img-card">
                        <img class="img-icon-categoria" src="${pageContext.request.contextPath}/resources/img/generic/noticias/img_failure_report.png" alt="">
                    </div>
                    <h5 class="text-categoria"> Reportar falla </h5>
                </div>
                <div class="content-categoria-app col">
                    <div class="content-img-card">
                        <img class="img-icon-categoria" src="${pageContext.request.contextPath}/resources/img/generic/noticias/img_pending_payments.png" alt="">
                    </div>
                    <h5 class="text-categoria"> Pagos pendientes</h5>
                </div>  
                <div class="content-categoria-app col">
                    <div class="content-img-card">
                        <img class="img-icon-categoria" src="${pageContext.request.contextPath}/resources/img/generic/noticias/money/png/money.png" alt="">
                    </div>
                    <h5 class="text-categoria">Venta t&eacute;cnico </h5>
                </div>
            </div>
            <div class="container-info-instalacion-app">
                <div class="content-icon-texto-info">
                    <div class="content-icono-resumen-trabajo">
                        <i class="fas fa-tools icono-resumen-trabajo icon-tipotrabajo"></i>
                    </div>
                    <div class="content-text-info-instalacion-app">
                        <h5 class="text-info-instalacion-app text-tipo-servicio">Nueva instalaci&oacute;n</h5>
                    </div>
                </div>                     
                <div class="content-icon-texto-info">
                    <div class="content-icono-resumen-trabajo">
                        <i class="fas fa-map-marker-alt icono-resumen-trabajo"></i>
                    </div>
                    <div class="content-text-info-instalacion-app">
                        <h5 class="text-info-instalacion-app ">Periferico sur 4121,Tlalpan Fuentas de Pedregal 01900 ,CDMX </h5>
                    </div>
                </div>
                <div class="content-icon-texto-info">
                    <div class="content-icono-resumen-trabajo">
                        <i class="far fa-clock icono-resumen-trabajo"></i>
                    </div>
                    <div class="content-text-info-instalacion-app">
                        <h5 class="text-info-instalacion-app ">13:30</h5>
                    </div>
                </div>
                <button class="btn boton-iniciar-ot">
                    Iniciar OT
                </button>
            </div>
        </div>                
    </div>
    <div class="container-datos-crea-noticia col-4">
        <div class="row">
            <div class="col-12">
                <div class="container-registro">
                    
                    <div  ng-show="inhabilidarCamposEdicion" class="capa-inabilitable">
                    </div>
                    <form >
                        <div class="form row  row-input-crea">
                            <div class="col-12">
                                <div class="form-check form-switch">
                                    <input ng-change="cambiarTipoDeEdicionNoticia()" class="form-check-input" type="checkbox" role="switch" ng-model="inhabilidarCamposEdicion" id="inhabilidarCamposEdicion" checked />
                                    <label class="form-check-label" for="inhabilidarCamposEdicion"> &iquest;Solo imagen? </label>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form>
                        
                        <div class="form row  row-input-crea">
                            <div class="col-12">
                                <label class="label-noticiar-creacion form-label" for="tituloPrincipalEditar">T&iacute;tulo principal</label>
                                <input    type="text" ng-model="editObj.tituloPrincipal" id="tituloPrincipalEditar" class="form-control form-control-sm" />
                            </div>                                
                        </div>                      
                        <div class="form row  row-input-crea">
                            <div class="col-12">
                                <label class="label-noticiar-creacion form-label" for="tituloSecundarioEditar">T&iacute;tulo secundario</label>
                                <input   type="text" ng-model="editObj.tituloSecundario" id="tituloSecundarioEditar" class="form-control form-control-sm" />
                            </div>                                
                        </div>
                        <div class="form row  row-input-crea">
                            <div class="col-12">
                                <label class="label-noticiar-creacion form-label" for="tituloSecundarioEditar">Link externo</label>
                                <input   type="text" ng-model="editObj.urlLinkExterno" placeholder="Ej.:  www.google.com.mx" id="tituloSecundarioEditar" class="form-control form-control-sm" />
                            </div>                                
                        </div>
                        <div class="form row  row-input-crea">
                            <div class="col-12">
                                <label class="label-noticiar-creacion form-label" for="detalleCreaNoticia">Detalle</label>
                                <textarea  class="form-control form-control-sm" ng-model="editObj.detalle" id="detalleEditaNoticia" rows="2"></textarea>
                            </div>                                
                        </div>

                        <div style="display: none;" class="form  row  row-input-crea">
                            <div class="col-12">
                                <label class="label-noticiar-creacion form-label" for="archivoEditarNoticia">Seleccionar imagen</label><i ng-show="fileCargaArchivoNoticiaEdit.archivo"  ng-click="removerImagenEditar()" class="far fa-trash-alt"></i>
                                <input ng-on-change="cargarFotoNoticiaEdicion($event)" type="file" class="form-control form-control-sm" id="archivoEditarNoticia" />
                            </div>                                 
                        </div>
                
                        <div  class="form  row  row-input-crea">
                            <div style="display: none;"  class="col-12">
                                <input ng-on-change="cargarArchivoDescargaEdicion($event)" type="file" class="form-control form-control-sm" id="cargarArchivoDescargaEdicion" />                                            
                            </div>    
                            <div class="col-12">
                                <div ng-click="triggerArchivoDescargaEdicion()" ng-class="{'active-descarga-archivo':fileDecargaNoticaEdicion.archivo }" class="container-descarga-archivo">
                                    <div ng-show="!fileDecargaNoticaEdicion.archivo" class="content-icono-descarga">
                                        <div class="icono-descarga">
                                            <i class="fas fa-cloud-upload-alt icono-subida-archivo"></i>
                                        </div>                                        
                                    </div>
                                    <div ng-show="!fileDecargaNoticaEdicion.archivo" class="content-detalle-archivo">
                                        <div class="title-nombrearchivo">
                                            Selecciona un archivo para que se pueda descargar
                                        </div>
                                        <div class="detail-archivo">
                                            PDF,imagenes,Excel,Word
                                        </div>
                                    </div>   
                                    
                                    
                                    <div  ng-show="fileDecargaNoticaEdicion.archivo" class="content-icono-descarga">
                                        <div class="icono-descarga">
                                            <i class="far fa-file icono-subida-archivo-success"></i>
                                        </div>
                                    </div>
                                    <div  ng-show="fileDecargaNoticaEdicion.archivo" class="content-detalle-archivo">
                                        <div class="title-nombrearchivo" ng-bind="fileDecargaNoticaEdicion.archivo" ></div>
                                        <!--div class="detail-archivo">
                                            PDF,imagenes,Excel,Word
                                        </div-->
                                        <div ng-click="eliminarArchivoDescargaEdicion();$event.stopPropagation();" class="content-delete-descargafile">
                                            <i class="fas fa-times"></i>
                                        </div>
                                    </div>  

                                </div>
                            </div>                             
                        </div>
                        <div class="form row  row-input-crea">
                            <div class="col-12">
                                <div class="form-check form-switch">
                                    <input  class="form-check-input" type="checkbox" role="switch" ng-model="mostrarFechasDefinidasEdicion" id="switchPermanente" checked />
                                    <label class="form-check-label label-permanente"  for="switchPermanente"> &iquest;Es permanente? </label>
                                </div>
                            </div>
                        </div>
                        <div ng-show="!mostrarFechasDefinidasEdicion" class="form row row-input-crea">
                                <div class="col-6">
                                    <div class="form ">
                                        <label class="label-noticiar-creacion form-label" for="fecha-inicio-editarnoticia">Fecha inicio</label>
                                        <input type="text" readonly id="fecha-inicio-editarnoticia" class="form-control form-control-sm" />
                                        </div>                                                           
                                </div>
                                <div class="col-6">
                                    <div class="form ">
                                        <label class="label-noticiar-creacion form-label" for="fecha-fin-editarnoticia">Fecha fin</label>
                                        <input  type="text" readonly id="fecha-fin-editarnoticia" class="form-control form-control-sm" />
                                        </div>
                                </div>
                        </div>

                        <div  class="form  row  row-input-crea">
                            <div class="col-12">
                                <span class="link-geografia" ng-click="abrirModalGeografiaCreacion()">Geograf&iacute;a</span>                                           
                                <div  ng-show="!isSeleccionGeografiaEdicion" ng-click="abrirGeografiaEdicion()" class="content-warning-geografia" title="sin seleccion">
                                    <i class="icono-warning-geografia fas fa-exclamation"></i>
                                </div>
                                <div  ng-show="isSeleccionGeografiaEdicion" ng-click="abrirGeografiaEdicion()" class="content-success-geografia">
                                    <i class="icono-success-geografia fas fa-check"></i>                                        
                                </div>

                            </div>
                        </div>
                        <button ng-click="edicionNoticia()" class="btn btn-primary btn-block">Actualizar noticia</button>
                    </form>   
                </div>
                                        
            </div>
        </div>

    </div>
</div>