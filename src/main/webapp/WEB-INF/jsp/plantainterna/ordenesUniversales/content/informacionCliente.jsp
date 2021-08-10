<div class="row ">
    <div class="col-6" style="text-align: left !important;">
        <label class="label-filter active" for="os-cuenta-cliente-sec" style="display: inline; font-size: 1em; text-align: left;">
            CUENTA:<span id="os-cuenta-cliente-sec-text" class="cuenta-second"></span>
            &nbsp;&nbsp;OS:  <span id="folio-os-cliente" class="cuenta-second" placeholder="OS"></span>
        </label>
        <div class="divider-cuenta " style="border: 0.5px  solid #e6e6e6;margin-bottom: 1em; margin-top: .2em;"></div>
    </div>   
    <div class="col-6">
        <i id="borrar-info-os" ng-click="borrarInformacionCliente()" class="refresh-btn fa fa-eraser"></i>
        <i id="refresh-cuenta-os" ng-click="consultarInformacionFolio()" class="refresh-cuenta refresh-btn fa fa-refresh"></i>
    </div>
</div>
<div class="row">
    <div class="col-6">
        <div class="row row-second-step">
            <div class="col-12" style="text-align: left;">
                <label class="label-filter" for="nombre-cliente">Nombre cliente:</label>									
                <input id="nombre-cliente" ng-model="informacionCliente.nombre" type="text" class="form-control mb-2 formulario-campo formulario-texto" placeholder="Nombre del cliente" maxlength="150">
            </div>            
        </div>
        <div class=" row row-second-step">
            <div class="col-12" style="text-align: left;">
                <label class="label-filter" for="nombre-contacto">Nombre Contacto</label>									
                <input id="nombre-contacto" ng-model="informacionCliente.nombreContacto" type="text" class="form-control mb-2 formulario-campo" placeholder="Nombre de contacto " maxlength="150">
            </div>
        </div>
        <div class=" row row-second-step">
            <div class="col-12" style="text-align: left;">
                <label class="label-filter" for="calle-form">Calle</label>
                <input id="calle-form" ng-model="informacionCliente.calle" type="text" class="form-control mb-2 formulario-campo formulario-texto" placeholder="Ej. Privada del sur"  maxlength="150">
            </div>
        </div>
        <div class="row row-second-step">
            <div class="col-4" style="text-align: left;">
                <label class="label-filter" for="num-ext">N&uacute;m. ext.</label>
                <input id="num-ext" ng-model="informacionCliente.numeroExt" type="text" class="form-control mb-2 formulario-campo " placeholder="Ej. 328" maxlength="6">
            </div>
            <div class=" col-4" style="text-align: left;">
                <label class="label-filter" for="num-int">N&uacute;m. int.</label>
                <input id="num-int" ng-model="informacionCliente.numeroInt" type="text" class="form-control mb-2 formulario-campo " placeholder="Ej. 125 Bis" maxlength="6">
            </div>
            <div class=" col-4" style="text-align: left;">
                <label class="label-filter" for="codigopostal-form">C&oacute;digo postal:</label>
                <input id="codigopostal-form" ng-model="informacionCliente.codigoPostal" type="text" class="form-control mb-2 formulario-campo" placeholder="Ej. 65620" maxlength="6" onkeypress='return event.charCode >= 48 && event.charCode <= 57' >
            </div>
        </div>	
        
        <div class=" row row-second-step">
            <div class=" col-12" style="text-align: left;">
                <label  class="label-filter" for="ciudad-form">Comentarios</label>
                <textarea id="comments-form" ng-model="informacionCliente.comentario" class="form-control mb-2 formulario-campo " maxlength="150" rows="2" style="height: auto !important"></textarea>
            </div>
        </div>        
    </div>
    <div class="col-6">
        <div class=" row row-second-step">
            <div class=" col-6" style="text-align: left;">
                <label class="label-filter" for="estado-form">Estado:</label>
                <input id="estado-form" ng-model="informacionCliente.estado" type="text" class="form-control mb-2 formulario-campo " placeholder="Ej. Puebla" maxlength="35">
            </div>
            <div class=" col-6" style="text-align: left;">
                <label class="label-filter" for="municipio-contacto">Municipio:</label>									
                <input id="municipio-contacto" ng-model="informacionCliente.municipio" type="text" class="form-control mb-2 formulario-campo " placeholder="Ej. Cuernavaca " maxlength="35">
            </div>
        </div>
        <div class=" row row-second-step">   
            <div class="col-12" style="text-align: left;">
                <label class="label-filter" for="entrecalle-form">Entre calles:</label>									
                <input id="entrecalle-form" ng-model="informacionCliente.entreCalles" type="text" class="form-control mb-2 formulario-campo " placeholder="">
            </div>                           
        </div>
        <div class=" row row-second-step">   
            <div class="col-12" style="text-align: left;">
                <label class="label-filter" for="referencias-form">Referencias:</label>									
                <input id="referencias-form" ng-model="informacionCliente.referencias" type="text" class="form-control mb-2 formulario-campo " placeholder="">
            </div>                           
        </div>
        <div class=" row row-second-step">   
            <div class="col-2" style="text-align: left;">
                <label class="label-filter" for="extension-form">Ext.:</label>									
                <input id="extension-form" ng-model="informacionCliente.ext" type="text" class="form-control mb-2 formulario-campo " placeholder="Ej. 487  "  maxlength="6" onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
            </div>     
            <div class="col-5" style="text-align: left;">
                <label class="label-filter" for="telefono-form">Tel&eacute;fono:</label>									
                <input id="telefono-form" ng-model="informacionCliente.telefono" type="text" class="form-control mb-2 formulario-campo" placeholder="Ej. 3622573  " maxlength="10" onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
            </div>
            <div class="col-5" style="text-align: left;">
                <label class="label-filter" for="celular-form">Celular:</label>									
                <input id="celular-form" ng-model="informacionCliente.celular" type="text" class="form-control mb-2 formulario-campo" placeholder="Ej. 5528204607 " maxlength="10" onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
            </div>               
        </div>
        <div class=" row row-second-step">
            <div class=" col-6" style="text-align: left;">
                <label class="label-filter" for="ciudad-form">Ciudad</label>
                <input id="ciudad-form" ng-model="informacionCliente.ciudad" type="text" class="form-control mb-2 formulario-campo " placeholder="Ej. Puebla" maxlength="35">
            </div>
            <div class=" col-6" style="text-align: left;">
                <label class="label-filter" for="colonia-form">Colonia</label>									
                <input id="colonia-contacto" ng-model="informacionCliente.colonia" type="text" class="form-control mb-2 formulario-campo " placeholder="Ej. Del valle " maxlength="35">
            </div>
        </div>		
    </div>    
</div>
