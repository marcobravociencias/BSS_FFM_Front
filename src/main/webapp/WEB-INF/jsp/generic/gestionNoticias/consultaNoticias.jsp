<div class="content-fluid">
    <!--div class="row md-form" id="filtros_config">
        <div class="col-2 column-style-consulta">
            <label for="idot" class="label-filter">T&iacute;tulo princ.</label>
            <input type="text" id="idot" placeholder="Ej: Paquete total " ng-model="camposFiltro.idot"  ng-change="limpiarCamposFiltro(1)"
            class="form-control input-filtro-noticias form-control-sm">
        </div>
        <div class="col-1 column-style-consulta columna-filtro-ind">
            <i class="icono-noseleccion fas fa-exclamation-circle me-2" title="No se encontraron catalogo de Geografia" ng-show="banderaErrorGeografia"></i><label for="cluster" class="label-filter">Geograf&iacute;a</label>
            <input ng-click="abrirModalGeografiaConsulta()"  readonly placeholder="Seleccione..." type="text" id="cluster"
            class="input-filtro-noticias form-control form-control-sm">
        </div>
        <div ng-class="{'inactiveFechaConsulta':filtroConsulta.permanente}" class="col-1 columna-filtro-ind" >
            <label for="filtro_fecha_inicio_consultanoticia" class="label-filter">Fecha inicial</label>
            <input ng-disabled="filtroConsulta.permanente" readonly  placeholder="Fecha inicial"  type="text" id="filtro_fecha_inicio_consultanoticia"    class="datepicker input-filtro-noticias form-control form-control-sm"  />
        </div>
        <div ng-class="{'inactiveFechaConsulta':filtroConsulta.permanente}" class="col-1 columna-filtro-ind">
            <label for="filtro_fecha_fin_consultanoticia" class="label-filter">Fecha final</label>
            <input ng-disabled="filtroConsulta.permanente" readonly placeholder="Fecha final" type="text" id="filtro_fecha_fin_consultanoticia" class="datepicker input-filtro-noticias form-control form-control-sm"  />
        </div>
        <div class="col-1 columna-filtro-ind">
            <label for="filtro_fecha_fin_permanente" class="label-filter">Permanente</label>
            <div class="form-check form-switch">
                <input ng-model="filtroConsulta.permanente" class="form-check-input" type="checkbox" role="switch" id="filtro_fecha_fin_permanente" />
                </div>
        </div>
        <div class="col-1 div-btn-busqueda">
        
        </div>
    </div-->
    <div class="content-filtros-consulta">
    	<button ng-if="verVistaTabla" id="btn_vista_imagenes" type="button"  class="btn btn-sm  btn-primary  waves-effect waves-light"  ng-click="cambiarVistaConsultaNoticias()">
            <i class="fas fa-images iconoBtnVistasConsulta"></i>
        </button>
        <button ng-if="!verVistaTabla" id="btn_vista_tabla" type="button"  class="btn btn-sm  btn-primary  waves-effect waves-light"  ng-click="cambiarVistaConsultaNoticias()">
            <i class="fas fa-table iconoBtnVistasConsulta"></i>
        </button>
        <button id="btn_consultar_ordenes" type="button"  class="btn btn-sm  btn-primary  waves-effect waves-light"  ng-click="consultarNoticias()">
            <i class="fas fa-redo"></i>
        </button>
        <div ng-show="verVistaTabla" class="input-group input-group-sm content-seach-group">
            <input id="searchConsultaTables" ng-keyup="searchDatatableNoticia($event)" ng-model="searconsultaDatatableValue"  type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar noticia">
            <span class="fa fa-search iconoBusqueda"></span>
        </div>
        <div ng-show="!verVistaTabla" class="input-group input-group-sm content-seach-group">
            <input id="" ng-keyup="" ng-model="buscarNoticiaCarrusel"  type="text" autocomplete="off" class="form-control buscadorGenerico" placeholder="Buscar noticia">
            <span class="fa fa-search iconoBusqueda"></span>
        </div>
    </div>
   
    <div id="busqueda_noticias" ng-show="verVistaTabla"  style="overflow: auto;">
		<table id="datatable-noticias" class="table table-sm table-hover">
			<thead>
            	<tr>
                	<th>Banner</th>
                    <th>Descarga</th>          
                    <th>T&iacute;tulo princ.</th>
                    <th>T&iacute;tulo secund.</th>
                    <th>Link externo</th>
                    <th>Permanente</th>
                    <th>Inicio</th>
                    <th>Expiraci&oacute;n</th>
                    <th>Detalle</th>
                    <th>Acciones</th>
				</tr>
			</thead>
			<tbody>
            </tbody>    
		</table>
    </div>
    
    <div id="busqueda_noticias_carrusel" ng-show="!verVistaTabla">
    	<div class="row" style="padding: 1em;">
    		<div class="col-md-3" ng-repeat="noticia in noticiasCarrusel | filter:buscarNoticiaCarrusel track by $index"" style="padding-bottom: 2em;">
	    		<div id="card" class="card contenedorCardsConsulta">
					<div class="card-body cuerpoCards">
						<img class="img-consulta-cards" onclick="abrirImagenSize(this)" src="{{noticia.urlBanner}}">
						<div ng-if="noticia.soloImagen == 1" class="content-titulo-principal-consulta-carrusel">
		                	<span class="text-titulo-primario-img-consulta-carrusel" ng-bind="noticia.tituloPrincipal" ></span>
		                </div>
		                <div ng-if="noticia.soloImagen == 1" class="content-titulo-secundario-consulta-carrusel">
							<span class="text-titulo-secundario-img-consulta-carrusel" ng-bind="noticia.tituloSecundario" ></span>
						</div>
					</div>
					<div id="" class="card-footer finCards">               
						<div class="row">    
                            <div ng-if="noticia.permanente != 1" class="fechas-noticia-detalle-consulta">
                                <span class=" fecha-inicio-consulta-tex" ng-bind="noticia.fechaInicio"></span>
                                <span class="text-intermedio-fecha fas fa-long-arrow-alt-right">  </span>
                                <span class=" fecha-fin-consulta-tex" ng-bind="noticia.fechaExpiracion"></span>	
                            </div> 
                            <span class=" text-detalle-consulta" ng-bind="noticia.detalle"></span>                   
                            <a href="{{noticia.urlLinkExterno}}" target="_blank" onclick="window.open(this.href,this.target, 'location=yes,height=570,width=520,scrollbars=yes,status=yes');" class="link-archivo-noticia link-consulta-noticiaexterno" >{{noticia.urlLinkExterno}}</a>                             
                            <div ng-if="noticia.permanente==1 || noticia.urlArchivo" class="divider-consulta-noticia"></div>                                                                                                                         
                            <div ng-show="noticia.permanente == 1" class="parent-icon-permanente">   
                                <div class="wrapper-icon-permanente">
                                    <div class="icon-wrapper-bg-permanente"></div>                     
                                    <i class="fas fa-stopwatch icon-permanente-content"></i>  
                                </div>                                                                               
                            </div>

							<div class="content-descarga-archivo content-descarga-consulta" ng-show="noticia.urlArchivo">
                                <a href="{{noticia.urlArchivo}}">
                                    <i class="iconoDescargaArchivo fas fa-cloud-download-alt"></i>
                                </a>
                                <span class="textoTituloCardsConsulta text-descarga-consulta">{{noticia.nombreArchivo}}</span>                               
							</div>
						</div>                
					</div>
				</div>
    		</div>
    	</div>
    </div>
    
</div>

