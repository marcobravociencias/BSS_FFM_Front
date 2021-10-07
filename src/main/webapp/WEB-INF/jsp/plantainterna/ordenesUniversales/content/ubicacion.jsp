<div class="col-12 row">
	<div class="col-1"></div>
	<div class="col-10" style="text-align: left;">
		<div class="col-12 contenido-cuenta">
			<strong class="color_titulos_resumen">LATITUD SELECCIONADA:</strong>
			<label class="resumen-detalle-agenda" id="latitud-label"  ng-bind="latitudSelectedMap ? latitudSelectedMap : 'Sin informaci&oacute;n'">Sin direcci&oacute;n capturada</label>
		</div>
		<div class="col-12 contenido-cuenta">
			<strong class="color_titulos_resumen">LONGITUD SELECCIONADA:</strong>
			<label class="resumen-detalle-agenda" id="longitud-label" ng-bind="longitudSelectedMap ? longitudSelectedMap : 'Sin informaci&oacute;n'">Sin direcci&oacute;n capturada</label>
		</div>
	</div>
	<div class="col-1"></div>
</div>
<div class="col-12 row">
	<div class="col-1"></div>
	<div class="col-10">
		<input id="search-input-place" class="controls" type="text"
			placeholder="B&uacute;scar lugar en mapa" style="font-size: 16px;">
		<div id="mapa-ubicacion" style="width: 100%; height: 400px;"></div>
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
			<li class="resumen-detalle-agenda">Ingrese la direcci&oacute;n o Coordenadas (Latitud,Longitud) en el buscador.</li>
			<li class="resumen-detalle-agenda">Arrastre el marcador a la ubicaci&oacute;n a seleccionar.</li>
			<li class="resumen-detalle-agenda">Dar doble click sobre la ubicaci&oacute;n a seleccionar.</li>
			</ul>
		</div>		
	</div>
	<div class="col-1"></div>
</div>