<div class="row">
	<div class="col-md-12">
		<h5>Informaci&oacute;n detalle inspector</h5>
	</div>
</div>

<div id="" class="pl-0 pr-0 custom-slider-main">
	<ul class="nav nav-tabs" id="tabs_info_detalle_inspector_falla" role="tablist">
		<li class="nav-item" style="display: inline-block" ng-repeat="falla in infoDetalleOtPe.detalleInspeccion.fallas track by $index">
			<a class="nav-link {{$index == 0 ? 'active' : ''}}" id="v-tabs-info-detalle-inspector-falla-tab-{{falla.idDetallefalla}}" 
				data-toggle="tab" href="#v-tabs-info-detalle-inspector-falla-{{falla.idDetallefalla}}" role="tab"	
				aria-controls="v-tabs-info-detalle-inspector-falla-tab-{{falla.idDetallefalla}}">Falla {{$index + 1}}</a>
		</li>
	</ul>
</div>

<div id="" class="tab-content">
	<div class="tab-pane fade {{$index == 0 ? 'active show' : ''}}" id="v-tabs-info-detalle-inspector-falla-{{falla.idDetallefalla}}" role="tabpanel" 
		aria-labelledby="v-tabs-info-detalle-inspector-falla-tab-{{falla.idDetallefalla}}"
		ng-repeat="falla in infoDetalleOtPe.detalleInspeccion.fallas">
		<div class="row">
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo">Fecha reporte</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{infoDetalleOtPe.detalleInspeccion.fechaReporte}}" 
								ng-bind="infoDetalleOtPe.detalleInspeccion.fechaReporte || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo">Empleado que reporta</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{infoDetalleOtPe.detalleInspeccion.nombreEmpleadoReporta}}" 
								ng-bind="infoDetalleOtPe.detalleInspeccion.nombreEmpleadoReporta || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo">Descripci&oacute;n falla</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.descripcionFalla}}" ng-bind="falla.descripcionFalla || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo">Descripci&oacute;n detalle falla</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.descripcionDetalleFalla}}" ng-bind="falla.descripcionDetalleFalla || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo">Comentarios</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.comentarios}}" ng-bind="falla.comentarios || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<section class="carouselImgDetalleFalla" aria-label="Gallery">
					<ol class="carousel__viewport">
				    	<li id="carousel-slide-{{falla.idDetallefalla}}-{{$index+1}}"
				        	tabindex="0"
				        	class="carousel__slide" ng-repeat="foto in falla.imagenes track by $index">
				        	<img class="d-block img-fluid imagen-carousel-falla w-100" 
				        		style="width:100% !important; height:100% !important; object-fit: cover;" 
				        		ng-src="{{foto.url}}" onerror="this.src='${pageContext.request.contextPath}/resources/img/generic/not_found.png';" 
				        		alt="Evidencia {{$index+1}}" ng-if="foto.url">
				        	<img class="d-block img-fluid imagen-carousel-falla w-100" 
								style="width:100% !important; height:100% !important; object-fit: cover;" 
								src="${pageContext.request.contextPath}/resources/img/generic/not_found.png" alt="Evidencia {{$index+1}}" ng-if="!foto.url" >
				      		<div class="carousel__snapper">
				        		<a href="#carousel-slide-{{falla.idDetallefalla}}-{{$index}}" ng-click="cambiarIndicadorBtnImg(falla.idDetallefalla,$index)" 
				        			class="carousel__prev" ng-show="$index > 0">Anterior</a>
				        		<a href="#carousel-slide-{{falla.idDetallefalla}}-{{$index+2}}" ng-click="cambiarIndicadorBtnImg(falla.idDetallefalla,$index+2)" 
				        			class="carousel__next" ng-show="!$last">Siguiente</a>
							</div>
						</li>
					</ol>
				  	<aside class="carousel__navigation">
				    	<ol class="carousel__navigation-list">
				      		<li class="carousel__navigation-item" ng-repeat="foto in falla.imagenes track by $index">
				        		<a id="btnIndicadorIndividual{{falla.idDetallefalla}}{{$index+1}}"
				        			href="#carousel-slide-{{falla.idDetallefalla}}-{{$index+1}}" ng-click="cambiarIndicadorBtnImg(falla.idDetallefalla,$index+1)"
				           			class="carousel__navigation-button btnImgPorFalla{{falla.idDetallefalla}} {{$index == 0 ? 'btnControlImgsSinOpacidad' : 'btnControlImgsOpacidad'}}">Imagen {{$index+1}}</a>
				      		</li>
				    	</ol>
					</aside>
				</section>
			</div>
		</div>	
	</div>
</div>