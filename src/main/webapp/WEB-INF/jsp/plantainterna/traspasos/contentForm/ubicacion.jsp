<div class="col-12 row">
	<div class="col-1"></div>
	<div class="col-10" style="text-align: left; display: none;" id="content-info-actual">
		<div class="row contenido-cuenta">
			<div class="col-12" style="text-align: left;">
				<strong class="color_titulos_resumen">FACTIBILIDAD SELECCIONADA</strong>
			</div>
		</div>
		<div class="row contenido-cuenta">
			<div class="col-4">
				<strong class="color_titulos">REGI&Oacute;N:</strong>
				<label class="resumen-detalle-agenda" id="latitud-label"
					ng-bind="informacionClienteDetalle.factibilidad.region ? informacionClienteDetalle.factibilidad.region : 'Sin informaci&oacute;n'"></label>
			</div>
			<div class="col-4">
				<strong class="color_titulos">DISTRITO:</strong>
				<label class="resumen-detalle-agenda" id="latitud-label"
					ng-bind="informacionClienteDetalle.factibilidad.distrito ? informacionClienteDetalle.factibilidad.distrito : 'Sin informaci&oacute;n'"></label>
			</div>
			<div class="col-4">
				<strong class="color_titulos">LATITUD:</strong>
				<label class="resumen-detalle-agenda" id="latitud-label"
					ng-bind="latitudSelectedMap ? latitudSelectedMap : 'Sin informaci&oacute;n'"></label>
			</div>
		</div>
		<div class="row contenido-cuenta">
			<div class="col-4">
				<strong class="color_titulos">CIUDAD:</strong>
				<label class="resumen-detalle-agenda" id="longitud-label"
					ng-bind="informacionClienteDetalle.factibilidad.ciudad ? informacionClienteDetalle.factibilidad.ciudad : 'Sin informaci&oacute;n'"></label>
			</div>
			<div class="col-4">
				<strong class="color_titulos">CLUSTER:</strong>
				<label class="resumen-detalle-agenda" id="longitud-label"
					ng-bind="informacionClienteDetalle.factibilidad.cluster ? informacionClienteDetalle.factibilidad.cluster : 'Sin informaci&oacute;n'"></label>
			</div>
			<div class="col-4">
				<strong class="color_titulos">LONGITUD:</strong>
				<label class="resumen-detalle-agenda" id="longitud-label"
					ng-bind="longitudSelectedMap ? longitudSelectedMap : 'Sin informaci&oacute;n'">s</label>
			</div>

		</div>
		<div class="row contenido-cuenta">
			<div class="col-12" style="text-align: right;">
				<strong class="color_titulos_resumen" ng-if="!isFactibilidad"><i class="fa fa-exclamation-circle mr-1"
						style="color: orange;font-size: 1.2em;"></i>No
					has actualizado la
					factibilidad</strong>
				<strong class="color_titulos_resumen" ng-if="isFactibilidad"><i class="fa fa-check-circle mr-1"
						style="color: green;font-size: 1.2em;"></i>Factibilidad actualizada</strong>
			</div>
		</div>
	</div>
	<div class="col-1"></div>
</div>
<div class="col-12 row">
	<div class="col-1"></div>
	<div class="col-10">
		<input id="search-input-place" class="controls" type="text" placeholder="B&uacute;scar lugar en mapa"
			style="font-size: 16px;">
		<div id="mapa-ubicacion" style="width: 100%; height: 400px;"></div>
		<div class="content-info-mapa" id="info-factibilidad" style="display: none;">
			<div style="bottom:0; left:0.5em;" class="card div-contenedor-info-factibilidad">
				<div class="card-header" style="border-bottom: none; text-align: left;font-weight: lighter;">
					<span class="title-tipoot-map-filtros" ng-if="infoFactibilidad.factibilidad !== '0'">
						<i class="far fa-check-circle icon-informacion-fac" style="color: green;"></i>
						Factibilidad
					</span>
					<span class="title-tipoot-map-filtros" ng-if="infoFactibilidad.factibilidad === '0'">
						<i class="fa fa-exclamation-circle icon-informacion-fac" style="color: orange;"></i>
						Factibilidad
					</span>
					<span class="fa fa-angle-down icon-content-info"></span>
				</div>
				<div class="card-body" style="padding: 0; display: block;" 
					id="content-info-body">
					<div style="text-align: left;" class="info_ot_detail" ng-if="infoFactibilidad.factibilidad !== '0'">
						<div class="col-md-12">
							<b class="title_span_detalle"> Regi&oacute;n:</b>
							<span class="ciudad-detalle-cuenta" ng-bind="infoFactibilidad.region ? infoFactibilidad.region : 'Sin informaci&oacute;n'"> </span>
						</div>
						<div class="col-md-12">
							<b class="title_span_detalle"> Ciudad:</b>
							<span class="ciudad-detalle-cuenta" ng-bind="infoFactibilidad.ciudad ? infoFactibilidad.ciudad :  'Sin informaci&oacute;n'"> </span>
						</div>
						<div class="col-md-12">
							<b class="title_span_detalle"> Distrito:</b>
							<span class="ciudad-detalle-cuenta" ng-bind="infoFactibilidad.distrito ? infoFactibilidad.distrito :  'Sin informaci&oacute;n'"> </span>
						</div>
						<div class="col-md-12">
							<b class="title_span_detalle"> Cl&uacute;ster:</b>
							<span class="ciudad-detalle-cuenta" ng-bind="infoFactibilidad.cluster ? infoFactibilidad.cluster :  'Sin informaci&oacute;n'"> </span>
						</div>
						<div class="content-actualizar">
							<hr style="margin: 0.5rem 0;">
							<button title="Actualizar factibilidad" class="btn boton-factibilidad ripple-surface"
								ng-click="actualizaFactibilidadActual()">
								<i class="fa fa-redo"></i>
							</button>
						</div>

					</div>
					<div style="text-align: center;font-size: 0.9em;" class="info_ot_detail" ng-if="infoFactibilidad.factibilidad === '0'">
						<span>No se
							encontr&oacute; factibilidad</br>Selecciona otra ubicaci&oacute;n</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-1"></div>
</div>
<br>
<div class="col-12 row">
	<div class="col-1"></div>
	<div class="col-10">
		<div class="col-12 contenido-cuenta">
			<strong class="color_titulos_resumen">Seleccione la ubicaci&oacute;n de las siguientes formas:</strong>
		</div>
		<div class="col-12 contenido-cuenta">
			<ul style="text-align: left;padding-left: 1em;padding-top: .5em;">
				<li class="resumen-detalle-agenda">Ingrese la direcci&oacute;n o Coordenadas (Latitud,Longitud) en el
					buscador.</li>
				<li class="resumen-detalle-agenda">Arrastre el marcador a la ubicaci&oacute;n a seleccionar.</li>
				<li class="resumen-detalle-agenda">Dar doble click sobre la ubicaci&oacute;n a seleccionar.</li>
			</ul>
		</div>
	</div>
	<div class="col-1"></div>
</div>