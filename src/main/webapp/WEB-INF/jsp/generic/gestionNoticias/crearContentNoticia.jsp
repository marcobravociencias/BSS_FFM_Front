<div ng-show="crearNoticiaContent" class="content-edicion-noticia" ng-class="{'content-edicion-noticia-full': configPermisoAccionCreaNoticia && !configPermisoAccionConsultaNoticias}">                    
    <div class="content-edicionnoticia">
        <button ng-click="crearNoticiaContent=false" type="button" class="btn-close cerrar-crear-noticia" ng-show="(configPermisoAccionEditaNoticia && configPermisoAccionConsultaNoticias) || (configPermisoAccionCreaNoticia && configPermisoAccionConsultaNoticias)"></button>
		<div class="row">
		    <div class="container-visualiza-noticia col-md-6">
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
		            <div class="container-categorias-app carouselContainer">
	                    <button type="button"  class="btnControlesCarruselRegistro" ng-click="desplazarIzqCarruselImgNoticiasRegistro()" style="margin-right: 8px;">
				            <i class="fas fa-chevron-left"></i>
				        </button>
	                    <div id="carruselImgNoticiasRegistro" class="carruselImgNoticiasRegistro">
	                    	<div class="contenedorImagenCarrusel">
		                    	<div class="container-noticias-visualizador">
					                <div  class="imagen-noticia-previsualizador">                      
					                    <img id="imgNoticiaRegistro" ng-show="fileCargaArchivoNoticia.archivo" class="imagen-visor-creanotica" ng-src="data:image/jpeg;base64,{{fileCargaArchivoNoticia.archivo}}" alt="">
					                    <div ng-show="!inhabilidarCamposRegistro" class="content-titulo-principal">
					                        <span class="text-title titulo-principal" ng-bind="saveObj.tituloPrincipal" ></span>
					                    </div>
					                    <div ng-show="!inhabilidarCamposRegistro" class="content-titulo-secundario">
					                        <span class="text-title titulo-secundario" ng-bind="saveObj.tituloSecundario" ></span>
					                    </div>
					                    <div class="content-icons-image">
					                    	<div class="row">
					                    		<div class="col-md-2" style="margin-left: 0.3em;">
					                    			<div ng-click="triggerInputFile()" class="icon-accion-imagen">
							                            <i  class="fas fa-camera icono-funcion-imagen"></i>
							                        </div>
					                    		</div>
					                    		<div class="col-md-2">
					                    			<div ng-click="removerImagenCreacion()" class="icon-accion-imagen">
							                            <i  class="far fa-trash-alt icono-funcion-imagen"></i>
							                        </div>
					                    		</div>
					                    		<div class="col-md-2 offset-md-2" ng-show="fileCargaArchivoNoticia.archivo">
					                    			<div ng-click="menosZoomImagenRegistro()" class="icon-accion-imagen">
							                            <i class="fas fa-search-minus icono-funcion-imagen"></i>
							                        </div>
					                    		</div>
					                    		<div class="col-md-2" ng-show="fileCargaArchivoNoticia.archivo">
					                    			<div ng-click="masZoomImagenRegistro()" class="icon-accion-imagen">
							                            <i class="fas fa-search-plus icono-funcion-imagen"></i>
							                        </div>
					                    		</div>
					                    	</div>
					                    </div>
					                </div>
					            </div>
	                    	</div>
	                    	<div class="contenedorImagenCarrusel contenedorImgOtraNoticia" ng-repeat="otraNoticia in noticiasCarrusel">
		                    	<div class="container-noticias-visualizador">
			                        <div  class="imagen-noticia-previsualizador">                      
			                            <img class="imagen-visor-creanotica" ng-src="{{otraNoticia.urlBanner}}" alt="">
			                            <div class="content-titulo-principal">
			                                <span class="text-title titulo-principal" ng-bind="otraNoticia.tituloPrincipal" ></span>
			                            </div>
			                            <div class="content-titulo-secundario">
			                                <span class="text-title titulo-secundario" ng-bind="otraNoticia.tituloSecundario" ></span>
			                            </div>
			                        </div>
			                    </div>
	                    	</div>
	                    </div>
	                    <button id="avanzar" type="button"  class="btnControlesCarruselMod" ng-click="desplazarDerechaCarruselImgNoticiasRegistro()">
				            <i class="fas fa-chevron-right"></i>
				        </button>
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
		    <div class="container-datos-crea-noticia col-md-6">
		        <div class="row">
		            <div class="col-12">
		                <div class="container-registro">
		                    <div  ng-show="inhabilidarCamposRegistro" class="capa-inabilitable">
		                    </div>
		                    <div>
		                        <div class="form row  row-input-crea">
		                            <div class="col-12">
		                                <div class="form-check form-switch">
		                                    <input ng-change="cambiarTipoDeRegistroNoticia()" class="form-check-input" type="checkbox" role="switch" ng-model="inhabilidarCamposRegistro" id="inhabilidarCamposRegistro" checked />
		                                    <label class="form-check-label" for="inhabilidarCamposRegistro"> &iquest;Solo imagen? </label>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                    <div>                        
		                        <div class="form row  row-input-crea">
		                            <div class="col-12">
		                                <label class="label-noticiar-creacion form-label" for="tituloPrincipal">T&iacute;tulo principal</label>
		                                <input type="text" ng-model="saveObj.tituloPrincipal" id="tituloPrincipal" class="form-control form-control-sm" ng-click="regresarInicioCarruselImgNoticiasRegistro()" />
		                            </div>                                
		                        </div>                      
		                        <div class="form row  row-input-crea">
		                            <div class="col-12">
		                                <label class="label-noticiar-creacion form-label" for="tituloSecundario">T&iacute;tulo secundario</label>
		                                <input type="text" ng-model="saveObj.tituloSecundario" id="tituloSecundario" class="form-control form-control-sm" ng-click="regresarInicioCarruselImgNoticiasRegistro()" />
		                            </div>                                
		                        </div>  
		                        <div class="form row  row-input-crea">
		                            <div class="col-12">
		                                <label class="label-noticiar-creacion form-label" for="tituloSecundario">Link externo</label>
		                                <input type="text" ng-model="saveObj.urlLinkExterno" placeholder="Ej.:  www.google.com.mx" id="tituloSecundario" class="form-control form-control-sm" ng-click="regresarInicioCarruselImgNoticiasRegistro()" />
		                            </div>                                
		                        </div>
		                        <div class="form row  row-input-crea">
		                            <div class="col-12">
		                                <label class="label-noticiar-creacion form-label" for="detalleCreaNoticia">Detalle</label>
		                                <textarea class="form-control form-control-sm" ng-model="saveObj.detalle" id="detalleCreaNoticia" rows="2" ng-click="regresarInicioCarruselImgNoticiasRegistro()"></textarea>
		                            </div>                                
		                        </div>
		                        <div style="display: none;" class="form  row  row-input-crea">
		                            <div class="col-12">
		                                <label class="label-noticiar-creacion form-label" for="customFile">Seleccionar imagen</label><i ng-show="fileCargaArchivoNoticia.nombre"  ng-click="removerImagenCreacion()" class="far fa-trash-alt"></i>
		                                <input ng-on-change="cargarFotoNoticiaRegistro($event)" type="file" class="form-control form-control-sm" id="archivoCrearNoticia" />
		                            </div>                                 
		                        </div>
		                        <div  class="form  row  row-input-crea">
		                            <div style="display: none;"  class="col-12">
		                                <input ng-on-change="cargarArchivoDescarga($event)" type="file" class="form-control form-control-sm" id="cargarArchivoDescarga" />                                            
		                            </div>    
		                            <div class="col-12">
		                                <div ng-click="triggerArchivoDescarga()" ng-class="{'active-descarga-archivo':fileDecargaNotica.archivo }" class="container-descarga-archivo">
		                                    <div ng-show="!fileDecargaNotica.archivo" class="content-icono-descarga">
		                                        <div class="icono-descarga">
		                                            <i class="fas fa-cloud-upload-alt icono-subida-archivo"></i>
		                                        </div>
		                                    </div>
		                                    <div ng-show="!fileDecargaNotica.archivo" class="content-detalle-archivo">
		                                        <div class="title-nombrearchivo">
		                                            Selecciona un archivo para que se pueda descargar
		                                        </div>
		                                        <div class="detail-archivo">
		                                            PDF,imagenes,Excel,Word
		                                        </div>
		                                    </div>   
		                                    <div  ng-show="fileDecargaNotica.archivo" class="content-icono-descarga">
		                                        <div class="icono-descarga">
		                                            <i class="far fa-file icono-subida-archivo-success"></i>
		                                        </div>
		                                    </div>
		                                    <div  ng-show="fileDecargaNotica.archivo" class="content-detalle-archivo">
		                                        <div class="title-nombrearchivo" ng-bind="fileDecargaNotica.nombre" ></div>
		                                        <!--div class="detail-archivo">
		                                            PDF,imagenes,Excel,Word
		                                        </div-->
		                                        <div ng-click="eliminarArchivoDescarga();$event.stopPropagation();" class="content-delete-descargafile">
		                                            <i class="fas fa-times"></i>
		                                        </div>
		                                    </div>  
		                                </div>
		                            </div>                             
		                        </div>
		                        <div class="form row  row-input-crea">
		                            <div class="col-6">
		                                <div class="form-check form-switch">
		                                    <input  class="form-check-input" type="checkbox" role="switch" ng-model="mostrarFechasDefinidas" id="switchPermanente" checked />
		                                    <label class="form-check-label label-permanente"  for="switchPermanente">Permanente </label>
		                                </div>
		                            </div>
		                            <div class="col-6">
		                                <span class="link-geografia" ng-click="abrirModalGeografiaCreacion()">Geograf&iacute;a</span>                                           
		                                <div  ng-show="!isSeleccionGeografia" ng-click="abrirModalGeografiaCreacion()" class="content-warning-geografia" title="sin seleccion">
		                                    <i class="icono-warning-geografia fas fa-exclamation"></i>
		                                </div>
		                                <div  ng-show="isSeleccionGeografia" ng-click="abrirModalGeografiaCreacion()" class="content-success-geografia">
		                                    <i class="icono-success-geografia fas fa-check"></i>                                        
		                                </div>
		                            </div>
		                        </div>
		                        <div ng-show="!mostrarFechasDefinidas" class="form row row-input-crea">
		                                <div class="col-6">
		                                    <div class="form ">
		                                        <label class="label-noticiar-creacion form-label" for="fecha-inicio-crearnoticia">Fecha inicio</label>
		                                        <input type="text" readonly id="fecha-inicio-crearnoticia" class="form-control form-control-sm" />
		                                        </div>                                                           
		                                </div>
		                                <div class="col-6">
		                                    <div class="form ">
		                                        <label class="label-noticiar-creacion form-label" for="fecha-fin-crearnoticia">Fecha fin</label>
		                                        <input  type="text" readonly id="fecha-fin-crearnoticia" class="form-control form-control-sm" />
		                                        </div>
		                                </div>
		                        </div>
		                        <button ng-click="registrarNoticia()" class="btn btn-primary btn-block">Registrar noticia</button>
		                    </div>   
		                </div>
		            </div>
		        </div>
		    </div>
		    <div class="container-datos-crea-noticia col-sm-6 col-md-4">
		    </div>
		</div>
	</div>
</div>