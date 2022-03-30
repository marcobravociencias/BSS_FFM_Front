<div class="row">
    <div class="col-12 resumen-title-content">
        <span class="resumen-title">INFORMACI&Oacute;N B&Aacute;SICA</span>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">CUENTA:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.folio && informacionClienteDetalle.folio !== '' ? informacionClienteDetalle.folio : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6  contenido-cuenta">
        <strong class="color_titulos_resumen">TIPO ORDEN:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.tipoordentext ? informacionClienteDetalle.tipoordentext : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">SUTIPO ORDEN:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.subtipoordentext ? informacionClienteDetalle.subtipoordentext : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">CANAL DE VENTAS:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.canalVenta ? informacionClienteDetalle.canalVenta : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">PAQUETE:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.paquete ? informacionClienteDetalle.paquete : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        
        <strong class="color_titulos_resumen">GEOGRAF&Iacute;A:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.distrito ? informacionClienteDetalle.distrito : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">TURNO:</strong>
        <label class="resumen-detalle-agenda"  ng-bind="infoBasica.turnotext ? infoBasica.turnotext : 'Sin informaci&oacute;n'" id="turno-resumen"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">FECHA:</strong>
        <label class="resumen-detalle-agenda"  ng-bind="infoBasica.fechaTurnoText ? infoBasica.fechaTurnoText : 'Sin informaci&oacute;n'" id="fecha-resumen"></label>
    </div>
</div>



<div class="divider-cuenta " style="border: 0.5px solid #e6e6e6;margin-bottom: 1em; margin-top: .2em;"></div>

<div class="row">
    <div class="col-12 resumen-title-content">
        <span class="resumen-title">INFORMACI&Oacute;N CLIENTE</span>
    </div>
</div>

<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">FOLIO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.paquete.Nombre_Paquete ? informacionClienteDetalle.paquete.Nombre_Paquete : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">        
        <strong class="color_titulos_resumen">NOMBRE CLIENTE:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.nombre ? informacionClienteDetalle.nombre : 'Sin informaci&oacute;n'"></label>
    </div> 
</div>
<div class="row" style="text-align: left;">
    <div class="col-12 contenido-cuenta" >        
        <strong class="color_titulos_resumen">NOMBRE CONTACTO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.nombreContacto ? informacionClienteDetalle.nombreContacto : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-12 contenido-cuenta">        
        <strong class="color_titulos_resumen">CALLE:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.calle ? informacionClienteDetalle.calle : 'Sin informaci&oacute;n'"></label>
    </div>
</div>

<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">CIUDAD:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.ciudad ? informacionClienteDetalle.ciudad : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">COLONIA:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.colonia ? informacionClienteDetalle.colonia : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">ESTADO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.estado ? informacionClienteDetalle.estado : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">MUNICIPIO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.municipio ? informacionClienteDetalle.municipio : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-12 contenido-cuenta">        
        <strong class="color_titulos_resumen">ENTRE CALLES:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.entreCalles ? informacionClienteDetalle.entreCalles : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-12 contenido-cuenta">        
        <strong class="color_titulos_resumen">REFERENCIAS:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.referencias ? informacionClienteDetalle.referencias : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen"> EXT.:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.ext ? informacionClienteDetalle.ext : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">T&Eacute;LEFONO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.telefono ? informacionClienteDetalle.telefono : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">CELULAR:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.celular ? informacionClienteDetalle.celular : 'Sin informaci&oacute;n'"></label>
    </div>
</div> 
<div class="row" style="text-align: left;">
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">N&Uacute;M EXT.:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.numeroExt ? informacionClienteDetalle.numeroExt : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">N&Uacute;M INT.:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.numeroInt ? informacionClienteDetalle.numeroInt : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">C&Oacute;DIGO POSTAL.:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionClienteDetalle.codigoPostal ? informacionClienteDetalle.codigoPostal : 'Sin informaci&oacute;n'"></label>
    </div>
</div> 
<div class="row" style="text-align: left;">
    <div class="col-4 contenido-cuenta">
        <strong class="color_titulos_resumen">LATITUD:</strong>
        <label class="resumen-detalle-agenda" ng-bind="latitudSelectedMap ? latitudSelectedMap : 'Sin informaci&oacute;n'">Sin direcci&oacute;n capturada</label>
    </div>
    <div class="col-4 contenido-cuenta">
        <strong class="color_titulos_resumen">LONGITUD:</strong>
        <label class="resumen-detalle-agenda" ng-bind="longitudSelectedMap ? longitudSelectedMap : 'Sin informaci&oacute;n'">Sin direcci&oacute;n capturada</label>
    </div>
</div>
<br>
<div class="row">
    <div class="col-12 contenido-cuenta">
        <div id="mapa-resumen" style="width:100%;height:200px; "></div>
    </div>
</div>
<br>
<div class="row">
	<div class="col-10">
		<div id="message-success-resumen"  ng-show="isGuardadoProcess && isGuardadoCreacion" class="alert alert-success" role="alert" ng-bind="mensajeRequestGuardado"></div>
		<div id="message-error-resumen"    ng-show="isGuardadoProcess && !isGuardadoCreacion" class="alert alert-danger" role="alert" ng-bind="mensajeRequestGuardado"></div>
	</div>
	<div class="col-2">
        <span ng-click="agendarOt()" class="step-icon guardar-datos-cuenta"><i class="fa fa-check"></i></span>
    </div>
</div>

