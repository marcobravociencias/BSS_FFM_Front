<div class="row">
	<div class="col-md-12">
		<h5>Informaci&oacute;n detalle detenci&oacute;n</h5>
	</div>
</div>
<div class="row row-not-result-detalle-pe" ng-show="infoDetalleOtPe.detalleDetencion == undefined || 
						  infoDetalleOtPe.detalleDetencion.length <= 0" >
	<div class="col-md-12">
		<b class="not-result-detallepe">No se encontraron resultados</b>
	</div>
</div>

<div id="" class="pl-0 pr-0 custom-slider-main">
	<ul class="nav nav-tabs" id="tabs_info_detalle_detencion_falla" role="tablist">
		<li class="nav-item" style="display: inline-block" ng-repeat="falla in infoDetalleOtPe.detalleDetencion track by $index">
			<a class="nav-link {{$index == 0 ? 'active' : ''}}" id="v-tabs-info-detalle-detencion-falla-tab-{{falla.idOrden}}" 
				data-toggle="tab" href="#v-tabs-info-detalle-detencion-falla-{{falla.idOrden}}" role="tab"	
				aria-controls="v-tabs-info-detalle-detencion-falla-tab-{{falla.idOrden}}">Falla {{$index + 1}}</a>
		</li>
	</ul>
</div>

<div id="" class="tab-content">
	<div class="tab-pane fade {{$index == 0 ? 'active show' : ''}}" id="v-tabs-info-detalle-detencion-falla-{{falla.idOrden}}" role="tabpanel" 
		aria-labelledby="v-tabs-info-detalle-detencion-falla-tab-{{falla.idOrden}}"
		ng-repeat="falla in infoDetalleOtPe.detalleDetencion">
		
		<div class="row">
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo" title="ID Orden">ID Orden</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.idOrden}}" 
								ng-bind="falla.idOrden || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo" title="Folio sistema">Folio sistema</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.folioSistema}}" 
								ng-bind="falla.folioSistema || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo" title="Clave cliente">Clave cliente</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.claveCliente}}" 
								ng-bind="falla.claveCliente || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo" title="Empleado que reporta">Empleado que reporta</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.nombreEmpleadoReporta}}" 
								ng-bind="falla.nombreEmpleadoReporta || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo" title="Unidad de negocio">Unidad de negocio</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.unidadNegocio}}" 
								ng-bind="falla.unidadNegocio || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo" title="Falla reportada">Falla reportada</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.fallaReportada}}" 
								ng-bind="falla.fallaReportada || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo" title="Subfalla reportada">Subfalla reportada</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.subFallaReportada}}" 
								ng-bind="falla.subFallaReportada || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid vehiculo-content">
							<div class="container-text-title-detalle-pe">
								<span class="text-tile-vehiculo" title="Fecha reporte">Fecha reporte</span>
							</div>
							<div class="container-text-content-detalle">
								<span class="text-content-vehiculo" title="{{falla.fechaReporte}}" 
								ng-bind="falla.fechaReporte || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<hr />
		
		<div class="row" style="margin-top: 1.5em;">
			<div class="col-md-12">
				<h5>Informaci&oacute;n splitter</h5>
			</div>
		</div>
		
		<div class="row" style="margin-bottom: 0.5em;">
			<div class="col-md-12">
				<table id="" >
<!-- 					<thead id="" class="thead-table table-nowrap"> -->
<!-- 						<tr> -->
<!-- 							<th>Splitter</th> -->
<!-- 							<th>Evidencias</th> -->
<!-- 						</tr> -->
<!-- 					</thead> -->
					<tbody id="cuerpoTablaSplitersFallaDetalleDetencion">
						<tr id="filaTablaSplitersFallaDetalleDetencion{{falla.idOrden}}{{splitter.idGsa}}"
							ng-repeat="splitter in falla.detalleSplitter track by $index" 
							class="filasTablaSpliters{{falla.idOrden}} {{$index > 0 ? 'ocultarFilaTablaSplitersFallaDetalleDetencion' : ''}}">
							<td class="filaTablaSplitersFallaDetalleDetencion">
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid vehiculo-content">
											<div class="container-text-title-detalle-pe">
												<span class="text-tile-vehiculo" title="ID GSA">ID GSA</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-vehiculo" title="{{splitter.idGsa}}" 
												ng-bind="splitter.idGsa || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid vehiculo-content">
											<div class="container-text-title-detalle-pe">
												<span class="text-tile-vehiculo" title="N&uacute;mero cuenta">N&uacute;mero cuenta</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-vehiculo" title="{{splitter.numeroCuenta}}" 
												ng-bind="splitter.numeroCuenta || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid vehiculo-content">
											<div class="container-text-title-detalle-pe">
												<span class="text-tile-vehiculo" title="Estatus">Estatus</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-vehiculo" title="{{splitter.estatus}}" 
												ng-bind="splitter.estatusPendiente || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid vehiculo-content">
											<div class="container-text-title-detalle-pe">
												<span class="text-tile-vehiculo" title="Candado">Candado</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-vehiculo" title="{{splitter.candado}}" 
												ng-bind="splitter.candado || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid vehiculo-content">
											<div class="container-text-title-detalle-pe">
												<span class="text-tile-vehiculo" title="Puertos asiganados">Puertos asiganados</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-vehiculo" title="{{splitter.puertoAsiganado}}" 
												ng-bind="splitter.puertoAsiganado || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid vehiculo-content">
											<div class="container-text-title-detalle-pe">
												<span class="text-tile-vehiculo" title="Puertos ocupados">Puertos ocupados</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-vehiculo" title="{{splitter.puertosOcupados}}" 
												ng-bind="splitter.puertosOcupados || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid vehiculo-content">
											<div class="container-text-title-detalle-pe">
												<span class="text-tile-vehiculo" title="Puertos totales">Puertos totales</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-vehiculo" title="{{splitter.puertosTotales}}" 
												ng-bind="splitter.puertosTotales || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
							</td>
							<td class="filaTablaSplitersFallaDetalleDetencion">
								<div class="row">
									<div class="col-md-12">
										<section class="carouselImgDetalleFalla" aria-label="Gallery">
											<ol class="carousel__viewport">
										    	<li id="carousel-slide-{{falla.idOrden}}-{{splitter.idGsa}}-{{$index+1}}"
										        	tabindex="0"
										        	class="carousel__slide" ng-repeat="foto in splitter.evidencias track by $index">
										        	<img class="d-block img-fluid imagen-carousel-falla w-100" 
										        		style="width:100% !important; height:100% !important; object-fit: cover;" 
										        		ng-src="{{foto.url}}" onerror="this.src='${pageContext.request.contextPath}/resources/img/generic/not_found.png';"
										        		alt="Evidencia {{$index+1}}" ng-if="foto.url" >
										        	<img class="d-block img-fluid imagen-carousel-falla w-100" 
										        		style="width:100% !important; height:100% !important; object-fit: cover;" 
										        		src="${pageContext.request.contextPath}/resources/img/generic/not_found.png" alt="Evidencia {{$index+1}}" ng-if="!foto.url" >
										      		<div class="carousel__snapper">
										        		<a href="#carousel-slide-{{falla.idOrden}}-{{splitter.idGsa}}-{{$index}}" 
										        			ng-click="cambiarIndicadorBtnImg((falla.idOrden+''+splitter.idGsa),$index)" 
										        			class="carousel__prev" ng-show="$index > 0">Anterior</a>
										        		<a href="#carousel-slide-{{falla.idOrden}}-{{splitter.idGsa}}-{{$index+2}}" 
										        			ng-click="cambiarIndicadorBtnImg((falla.idOrden+''+splitter.idGsa),$index+2)" 
										        			class="carousel__next" ng-show="!$last">Siguiente</a>
													</div>
												</li>
											</ol>
										  	<aside class="carousel__navigation">
										    	<ol class="carousel__navigation-list">
										      		<li class="carousel__navigation-item" ng-repeat="foto in splitter.evidencias track by $index">
										        		<a id="btnIndicadorIndividual{{falla.idOrden}}{{splitter.idGsa}}{{$index+1}}"
										        			href="#carousel-slide-{{falla.idOrden}}-{{splitter.idGsa}}-{{$index+1}}" 
										        			ng-click="cambiarIndicadorBtnImg((falla.idOrden+''+splitter.idGsa),$index+1)"
										           			class="carousel__navigation-button btnImgPorFalla{{falla.idOrden}}{{splitter.idGsa}} {{$index == 0 ? 'btnControlImgsSinOpacidad' : 'btnControlImgsOpacidad'}}">Imagen {{$index+1}}</a>
										      		</li>
										    	</ol>
											</aside>
										</section>
									</div>
								</div>
							</td>
						</tr> 
					</tbody>
					<tfoot>
						<tr>
							<td colspan="1">
								<!-- Navegar a una p�gina especifica -->
								<!-- ng-disabled="$index == 0" -->
								<div style="width: 100%; text-align: center;">
									<button id="btnPaginadorTablaSpliters{{falla.idOrden}}{{splitterPag.idGsa}}{{$index+1}}" 
										type="button" ng-click="cambiarPagTablaSpliters(falla.idOrden, splitterPag.idGsa, $index+1)" 
										ng-repeat="splitterPag in falla.detalleSplitter track by $index"
										class="btnPaginadorTablaSpliters btnPaginadorTablaSpliters{{falla.idOrden}} {{$index == 0 ? 'btnPaginadorTablaSplitersActive' : 'btnPaginadorTablaSplitersNoActive'}}">{{$index+1}}</button>
								</div>
				          	</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
</div>
