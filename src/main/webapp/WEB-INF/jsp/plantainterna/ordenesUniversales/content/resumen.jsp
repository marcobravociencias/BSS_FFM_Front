<div class="row">
    <div class="col-12 resumen-title-content">
        <span class="resumen-title">INFORMACI&Oacute;N B&Aacute;SICA</span>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">CUENTA:</strong>
        <label class="resumen-detalle-agenda" ng-bind="infoBasica.folio && infoBasica.folio !== '' ? infoBasica.folio : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6  contenido-cuenta">
        <strong class="color_titulos_resumen">TIPO ORDEN:</strong>
        <label class="resumen-detalle-agenda" ng-bind="infoBasica.tipoordentext ? infoBasica.tipoordentext : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">SUTIPO ORDEN:</strong>
        <label class="resumen-detalle-agenda" ng-bind="infoBasica.subtipoordentext ? infoBasica.subtipoordentext : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">CANAL DE VENTAS:</strong>
        <label class="resumen-detalle-agenda" ng-bind="infoBasica.canalVenta ? infoBasica.canalVenta : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">PAQUETE:</strong>
        <label class="resumen-detalle-agenda" ng-bind="infoBasica.paquete ? infoBasica.paquete : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        
        <strong class="color_titulos_resumen">GEOGRAF&Iacute;A:</strong>
        <label class="resumen-detalle-agenda" ng-bind="infoBasica.distrito ? infoBasica.distrito : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">TURNO:</strong>
        <label ng-show="verAplicaDisponbilidad" class="resumen-detalle-agenda"  
            ng-bind="infoBasica.turnotext ? infoBasica.turnotext : 'Sin informaci&oacute;n'" id="turno-resumen"></label>
        <label ng-show="!verAplicaDisponbilidad" class="resumen-detalle-agenda"  
            ng-bind="infoBasica.idTurnoSeleccionAplica == 1 ? 'MATUTINO' : infoBasica.idTurnoSeleccionAplica == 2 ? 'VESPERTINO' : 'Sin informaci&oacute;n'" id="turno-resumen-aplica"></label>

    </div>
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">FECHA:</strong>
        <label ng-show="verAplicaDisponbilidad" class="resumen-detalle-agenda"  
            ng-bind="infoBasica.fechaTurnoText ? infoBasica.fechaTurnoText : 'Sin informaci&oacute;n'" id="fecha-resumen"></label>
       
        <label ng-show="!verAplicaDisponbilidad" class="resumen-detalle-agenda"  
            ng-bind="infoBasica.fechaTurnoTextAplica ? infoBasica.fechaTurnoTextAplica : 'Sin informaci&oacute;n'" id="fecha-resumen-aplica"></label>

    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">        
        <strong class="color_titulos_resumen">ORDEN SERVICIO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="selectedOrdenServicio ? selectedOrdenServicio.os : 'NA'"></label>
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
        <strong class="color_titulos_resumen">NOMBRE CLIENTE:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.nombre ? informacionCliente.nombre +' '+ informacionCliente.apaterno+' '+informacionCliente.amaterno  : 'Sin informaci&oacute;n'"></label>
    </div> 
    <div class="col-6 contenido-cuenta">        
        <strong class="color_titulos_resumen">CALLE:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.calle ? informacionCliente.calle : 'Sin informaci&oacute;n'"></label>
    </div>
</div>

<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">CIUDAD:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.ciudad ? informacionCliente.ciudad : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">COLONIA:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.colonia ? informacionCliente.colonia : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">ESTADO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.estado ? informacionCliente.estado : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">
        <strong class="color_titulos_resumen">MUNICIPIO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.municipio ? informacionCliente.municipio : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-12 contenido-cuenta">        
        <strong class="color_titulos_resumen">ENTRE CALLES:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.entreCalles ? informacionCliente.entreCalles : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-12 contenido-cuenta">        
        <strong class="color_titulos_resumen">REFERENCIAS:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.referencias ? informacionCliente.referencias : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-12 contenido-cuenta">        
        <strong class="color_titulos_resumen">RAZ&Oacute;N SOCIAL:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.razonsocial ? informacionCliente.razonsocial : 'Sin informaci&oacute;n'"></label>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen"> EXT.:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.ext ? informacionCliente.ext : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">T&Eacute;LEFONO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.telefono ? informacionCliente.telefono : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">CELULAR:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.celular ? informacionCliente.celular : 'Sin informaci&oacute;n'"></label>
    </div>
</div> 
<div class="row" style="text-align: left;">
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">N&Uacute;M EXT.:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.numeroExt ? informacionCliente.numeroExt : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">N&Uacute;M INT.:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.numeroInt ? informacionCliente.numeroInt : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-4 contenido-cuenta">        
        <strong class="color_titulos_resumen">C&Oacute;DIGO POSTAL.:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.codigoPostal ? informacionCliente.codigoPostal : 'Sin informaci&oacute;n'"></label>
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
    <div class="col-4 contenido-cuenta">
        <strong class="color_titulos_resumen">CORREO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.correo ? informacionCliente.correo : 'Sin informaci&oacute;n'">Sin direcci&oacute;n capturada</label>
    </div>
</div>
<div class="divider-cuenta " style="border: 0.5px solid #e6e6e6;margin-bottom: 1em; margin-top: .2em;"></div>
<div class="row">
    <div class="col-12 resumen-title-content">
        <span class="resumen-title">INFORMACI&Oacute;N CLIENTE</span>
    </div>
</div>
<div class="row" style="text-align: left;">
    <div class="col-6 contenido-cuenta" >        
        <strong class="color_titulos_resumen">NOMBRE CONTACTO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.nombreContacto ? informacionCliente.nombreContacto : 'Sin informaci&oacute;n'"></label>
    </div>
    <div class="col-6 contenido-cuenta">        
        <strong class="color_titulos_resumen">TEL&Eacute;FONO CONCTACTO:</strong>
        <label class="resumen-detalle-agenda" ng-bind="informacionCliente.telefonoContacto ? informacionCliente.telefonoContacto : 'Sin informaci&oacute;n'"></label>
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
        <span ng-click="guardarOrdenUniversal()" class="step-icon guardar-datos-cuenta"><i class="fa fa-check"></i></span>
    </div>
</div>

