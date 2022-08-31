<div class="row" ng-show="!verModDireccionOT">
	<div class="col-md-6">
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Nombre cuenta</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.claveCliente}}"
					ng-bind="infoOtDetalle.claveCliente || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">N&uacute;mero exterior</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.numeroExterior}}"
					ng-bind="infoOtDetalle.direccion.numeroExterior || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Entre calles</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.entreCalles}}"
					ng-bind="infoOtDetalle.direccion.entreCalles || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Colonia</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.colonia}}"
					ng-bind="infoOtDetalle.direccion.colonia || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Municipio</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.municipio}}"
					ng-bind="infoOtDetalle.direccion.municipio || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">C&oacute;digo postal</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.codigoPostal}}"
					ng-bind="infoOtDetalle.direccion.codigoPostal || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Longitud</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.longitud}}"
					ng-bind="infoOtDetalle.direccion.longitud || 'Sin dato'"></span>
			</div>
		</div>
	</div>
	<div class="col-md-6">
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Calle</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.calle}}"
					ng-bind="infoOtDetalle.direccion.calle || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">N&uacute;mero interior</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.numeroInterior}}"
					ng-bind="infoOtDetalle.direccion.numeroInterior || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Referencia</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.referencias}}"
					ng-bind="infoOtDetalle.direccion.referencias || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Ciudad</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.ciudad}}"
					ng-bind="infoOtDetalle.direccion.ciudad || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Estado</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.estado}}"
					ng-bind="infoOtDetalle.direccion.estado || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid terceros-content">
			<div class="container-text-title-detalle">
				<span class="text-tile-terceros">Latitud</span>
			</div>
			<div class="container-text-content-detalle">
				<span class="text-content-terceros" title="{{infoOtDetalle.direccion.latitud}}"
					ng-bind="infoOtDetalle.direccion.latitud || 'Sin dato'"></span>
			</div>
		</div>
		<div class="container-fluid">

			<button id="btnEditarDireccionOT" class="btn btn-sm btn-primary disable-terminada"
				ng-click="mostrarVistaModificarDireccion(infoOtDetalle.direccion.latitud, infoOtDetalle.direccion.longitud)">Editar</button>
			<span class="text-terminada" ng-if="keyBloqueoBtn.includes(infoOtDetalle.idEstatus)"><i class="fas fa-exclamation-circle"></i> La acci&oacute;n no esta disponible</span>
		</div>
	</div>
</div>
<div class="row" ng-show="!verModDireccionOT">
	<div class="col-md-12">
		<div id="content-mapa-cambio-direccion"></div>
	</div>
</div>
<div class="row" ng-show="verModDireccionOT">
	<div class="col-md-8">
		<input id="txtBuscadorDireccionMap" class="controls" type="text" placeholder="B&uacute;scar lugar en mapa"
			style="position: absolute !important; left: 0px !important; top: 0px !important;" />
	</div>
	<div class="col-md-8">
		<div id="content-mapa-cambio-direccion-mod"></div>
	</div>
	<div class="col-md-4">
		<div class="row">
			<div class="col-md-12">
				<label class="etiquetaCambioDireccion">Latitud</label>
				<div class="input-group">
					<label class="txtCambioDireccion">{{latitudModDireccionOt}}</label>
				</div>
			</div>
			<div class="col-md-12">
				<label class="etiquetaCambioDireccion">Latitud</label>
				<div class="input-group">
					<label class="txtCambioDireccion">{{longitudModDireccionOt}}</label>
				</div>
			</div>
			<div class="col-md-12">
				<label class="etiquetaCambioDireccion">C&oacute;digo postal</label>
				<div class="input-group">
					<input type="text" class="form-control form-control-sm txtCambioDireccion input-acciones" maxlength="6"
						ng-model="infoOtDetalle.direccion.codigoPostal" id="codigoPostalNum" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
				</div>
			</div>
		</div>
		<div class="row" style="margin-top: 1em;">
			<div class="col-md-2 offset-6">
				<button id="btnRegresarVistaCambioDireccion" class="btn btn-sm btn-primary"
					ng-click="regresarVistaCambioDireccion()">
					<i class="fas fa-arrow-left"></i>
				</button>
			</div>
			<div class="col-md-2 offset-1">
				<button id="btnCambioDireccionOTMod" class="btn btn-sm btn-primary" ng-click="guardarCambioDireccion()">
					<i class="fas fa-save"></i>
				</button>
			</div>
		</div>
	</div>
</div>