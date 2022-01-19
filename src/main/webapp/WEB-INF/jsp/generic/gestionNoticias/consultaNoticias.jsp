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
						<img class="" onclick="abrirImagenSize(this)" style="height: 100%; width: 100%; object-fit: cover;" src="{{noticia.urlBanner}}">
						<div class="content-titulo-principal-consulta-carrusel">
		                	<span class="text-titulo-primario-img-consulta-carrusel" ng-bind="noticia.tituloPrincipal" ></span>
		                </div>
		                <div class="content-titulo-secundario-consulta-carrusel">
							<span class="text-titulo-secundario-img-consulta-carrusel" ng-bind="noticia.tituloSecundario" ></span>
						</div>
					</div>
					<div id="" class="card-footer finCards">               
						<div class="row">
							<div class="col-md-12" ng-if="noticia.permanente != 1">
								<label class="textoTituloCardsConsulta">Fecha inicio:&nbsp;</label><span class="textoCardsConsulta" ng-bind="noticia.fechaInicio"></span>		
							</div>
							<div class="col-md-12" ng-if="noticia.permanente != 1">
								<label class="textoTituloCardsConsulta">Fecha fin:&nbsp;</label><span class="textoCardsConsulta" ng-bind="noticia.fechaExpiracion"></span>				
							</div>
							<div class="col-md-12">
								<div class="divTextoDesbordCard">
									<label class="textoTituloCardsConsulta">Detalle:&nbsp;</label><span class="textoCardsConsulta" ng-bind="noticia.detalle"></span>
								</div>
							</div>
							<div class="col-md-12" ng-if="noticia.permanente == 1">
								<span class="textoTituloCardsConsulta">Permanente</span>
								<div class="contentPermanenteConsulta">
									<i class="icono-success-generic fas fa-check"></i>                             
								</div>			
							</div>
							<div class="col-md-12" ng-if="noticia.urlArchivo">
								<span class="textoTituloCardsConsulta">Descargar</span>
								<div class="contenedorIconoDescargaArchivo">
									<a href="{{noticia.urlArchivo}}">
										<i class="iconoDescargaArchivo fas fa-cloud-download-alt"></i>
									</a>
								</div>
							</div>
						</div>                
					</div>
				</div>
    		</div>
    	</div>
    </div>
    
</div>

