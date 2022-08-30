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
			<a class="nav-link {{$index == 0 ? 'active' : ''}}" id="tab-detencion-falla{{$index + 1}}" 
				data-toggle="tab" href="#detencion-falla{{$index + 1}}" role="tab">Falla {{$index + 1}}</a>
		</li>
	</ul>
</div>

<div id="tab-content-detencion" class="tab-content">
	<div class="tab-pane fade {{$index == 0 ? 'active show' : ''}}" id="detencion-falla{{$index + 1}}" role="tabpanel" 
		aria-labelledby="v-tabs-info-detalle-detencion-falla-tab-{{falla.idOrden}}"
		ng-repeat="falla in infoDetalleOtPe.detalleDetencion" ng-init="parentIndex = $index">
		
		<div class="row">
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid terceros-content">
							<div class="container-text-title-detalle etiquetaCampo">
								<span class="text-tile-terceros">ID orden</span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipEtiqueta">ID orden</span>
							</div>
							<div class="container-text-content-detalle contenedorCampo">
								<span class="text-content-terceros" ng-bind="falla.idOrden || 'Sin dato'"></span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipTxtCampo" ng-bind="falla.idOrden || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid terceros-content">
							<div class="container-text-title-detalle etiquetaCampo">
								<span class="text-tile-terceros">Folio sistema</span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipEtiqueta">Folio sistema</span>
							</div>
							<div class="container-text-content-detalle contenedorCampo">
								<span class="text-content-terceros" ng-bind="falla.folioSistema || 'Sin dato'"></span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipTxtCampo" ng-bind="falla.folioSistema || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid terceros-content">
							<div class="container-text-title-detalle etiquetaCampo">
								<span class="text-tile-terceros">Clave cliente</span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipEtiqueta">Clave cliente</span>
							</div>
							<div class="container-text-content-detalle contenedorCampo">
								<span class="text-content-terceros" ng-bind="falla.claveCliente || 'Sin dato'"></span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipTxtCampo" ng-bind="falla.claveCliente || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid terceros-content">
							<div class="container-text-title-detalle etiquetaCampo">
								<span class="text-tile-terceros">Empleado que reporta</span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipEtiqueta">Empleado que reporta</span>
							</div>
							<div class="container-text-content-detalle contenedorCampo">
								<span class="text-content-terceros" ng-bind="falla.nombreEmpleadoReporta || 'Sin dato'"></span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipTxtCampo" ng-bind="falla.nombreEmpleadoReporta || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid terceros-content">
							<div class="container-text-title-detalle etiquetaCampo">
								<span class="text-tile-terceros">Unidad de negocio</span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipEtiqueta">Unidad de negocio</span>
							</div>
							<div class="container-text-content-detalle contenedorCampo">
								<span class="text-content-terceros" ng-bind="falla.unidadNegocio || 'Sin dato'"></span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipTxtCampo" ng-bind="falla.unidadNegocio || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid terceros-content">
							<div class="container-text-title-detalle etiquetaCampo">
								<span class="text-tile-terceros">Falla reportada</span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipEtiqueta">Falla reportada</span>
							</div>
							<div class="container-text-content-detalle contenedorCampo">
								<span class="text-content-terceros" ng-bind="falla.fallaReportada || 'Sin dato'"></span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipTxtCampo" ng-bind="falla.fallaReportada || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid terceros-content">
							<div class="container-text-title-detalle etiquetaCampo">
								<span class="text-tile-terceros">Subfalla reportada</span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipEtiqueta">Subfalla reportada</span>
							</div>
							<div class="container-text-content-detalle contenedorCampo">
								<span class="text-content-terceros" ng-bind="falla.subFallaReportada || 'Sin dato'"></span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipTxtCampo" ng-bind="falla.subFallaReportada || 'Sin dato'"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="container-fluid terceros-content">
							<div class="container-text-title-detalle etiquetaCampo">
								<span class="text-tile-terceros">Fecha reporte</span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipEtiqueta">Fecha reporte</span>
							</div>
							<div class="container-text-content-detalle contenedorCampo">
								<span class="text-content-terceros" ng-bind="falla.fechaReporte || 'Sin dato'"></span>
								<span ng-show="mostrarTooltipDetencion" class="tooltipTxtCampo" ng-bind="falla.fechaReporte || 'Sin dato'"></span>
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
					<tbody id="cuerpoTablaSplitersFallaDetalleDetencion">
						<tr id="detencionFalla{{$parent.$index + 1}}Spliter{{$index + 1}}"
							ng-repeat="splitter in falla.detalleSplitter track by $index" ng-init="spliterIndex = $index"
							class="splitersFalla{{$parent.$index + 1}} {{$index > 0 ? 'ocultarFilaTablaSplitersFallaDetalleDetencion' : ''}}">
							<td class="filaTablaSplitersFallaDetalleDetencion">
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid terceros-content">
											<div class="container-text-title-detalle etiquetaCampoTabla">
												<span class="text-tile-terceros">ID GSA</span>
												<span ng-show="mostrarTooltipDetencion" class="tooltipEtiquetaTabla">ID GSA</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-terceros" title="{{splitter.idGsa}}" 
												ng-bind="splitter.idGsa || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid terceros-content">
											<div class="container-text-title-detalle etiquetaCampoTabla">
												<span class="text-tile-terceros">N&uacute;mero cuenta</span>
												<span ng-show="mostrarTooltipDetencion" class="tooltipEtiquetaTabla">N&uacute;mero cuenta</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-terceros" title="{{splitter.numeroCuenta}}" 
												ng-bind="splitter.numeroCuenta || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid terceros-content">
											<div class="container-text-title-detalle etiquetaCampoTabla">
												<span class="text-tile-terceros">Estatus</span>
												<span ng-show="mostrarTooltipDetencion" class="tooltipEtiquetaTabla">Estatus</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-terceros" title="{{splitter.estatus}}" 
												ng-bind="splitter.estatus || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid terceros-content">
											<div class="container-text-title-detalle etiquetaCampoTabla">
												<span class="text-tile-terceros">Candado</span>
												<span ng-show="mostrarTooltipDetencion" class="tooltipEtiquetaTabla">Candado</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-terceros" title="{{splitter.candado}}" 
												ng-bind="splitter.candado || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid terceros-content">
											<div class="container-text-title-detalle etiquetaCampoTabla">
												<span class="text-tile-terceros">Puertos asiganados</span>
												<span ng-show="mostrarTooltipDetencion" class="tooltipEtiquetaTabla">Puertos asiganados</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-terceros" title="{{splitter.puertoAsiganado}}" 
												ng-bind="splitter.puertoAsiganado || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid terceros-content">
											<div class="container-text-title-detalle etiquetaCampoTabla">
												<span class="text-tile-terceros">Puertos ocupados</span>
												<span ng-show="mostrarTooltipDetencion" class="tooltipEtiquetaTabla">Puertos ocupados</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-terceros" title="{{splitter.puertosOcupados}}" 
												ng-bind="splitter.puertosOcupados || 'Sin dato'"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="container-fluid terceros-content">
											<div class="container-text-title-detalle etiquetaCampoTabla">
												<span class="text-tile-terceros">Puertos totales</span>
												<span ng-show="mostrarTooltipDetencion" class="tooltipEtiquetaTabla">Puertos totales</span>
											</div>
											<div class="container-text-content-detalle">
												<span class="text-content-terceros" title="{{splitter.puertosTotales}}" 
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
										    	<li id="carousel-slide-falla{{parentIndex+1}}-spliter{{spliterIndex+1}}-{{$index+1}}"
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
										        		<a href="#carousel-slide-falla{{parentIndex+1}}-spliter{{spliterIndex+1}}-{{$index}}" 
										        			ng-click="cambiarIndicadorBtnImg(('falla'+(parentIndex+1)+'spliter'+(spliterIndex+1)),$index)" 
										        			class="carousel__prev" ng-show="$index > 0">Anterior</a>
										        		<a href="#carousel-slide-falla{{parentIndex+1}}-spliter{{spliterIndex+1}}-{{$index+2}}" 
										        			ng-click="cambiarIndicadorBtnImg(('falla'+(parentIndex+1)+'spliter'+(spliterIndex+1)),$index+2)" 
										        			class="carousel__next" ng-show="!$last">Siguiente</a>
													</div>
												</li>
											</ol>
										  	<aside class="carousel__navigation">
										    	<ol class="carousel__navigation-list">
										      		<li class="carousel__navigation-item" ng-repeat="foto in splitter.evidencias track by $index">
										        		<a id="btnIndicadorIndividualfalla{{parentIndex+1}}spliter{{spliterIndex+1}}{{$index+1}}"
										        			href="#carousel-slide-falla{{parentIndex+1}}-spliter{{spliterIndex+1}}-{{$index+1}}" 
										        			ng-click="cambiarIndicadorBtnImg(('falla'+(parentIndex+1)+'spliter'+(spliterIndex+1)),$index+1)"
										           			class="carousel__navigation-button btnImgPorFallafalla{{parentIndex+1}}spliter{{spliterIndex+1}} {{$index == 0 ? 'btnControlImgsSinOpacidad' : 'btnControlImgsOpacidad'}}">Imagen {{$index+1}}</a>
										      		</li>
										    	</ol>
											</aside>
										</section>
									</div>
								</div>
							</td>
						</tr> 
					</tbody>
					<tfoot style="background-color: white;">
						<tr>
							<td colspan="1">
								<div style="width: 100%; text-align: center;">
									<button id="btnPaginadorFalla{{$parent.$index + 1}}Spliter{{$index + 1}}" 
										type="button" ng-click="cambiarPagTablaSpliters(('Falla'+($parent.$index + 1)), ('Spliter'+($index + 1)))" 
										ng-repeat="splitterPag in falla.detalleSplitter track by $index"
										class="btnPaginadorTablaSpliters btnPaginadorTablaSplitersFalla{{$parent.$index + 1}} {{$index == 0 ? 'btnPaginadorTablaSplitersActive' : 'btnPaginadorTablaSplitersNoActive'}}">{{$index+1}}</button>
								</div>
				          	</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
</div>
