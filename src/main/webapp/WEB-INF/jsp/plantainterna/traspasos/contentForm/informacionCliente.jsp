<div class="row ">
    <div class="col-6" style="text-align: left !important;">
        <label class="label-filter active" for="os-cuenta-cliente-sec"
            style="display: inline; font-size: 1em; text-align: left;">
            CUENTA:<span id="os-cuenta-cliente-sec-text" class="cuenta-second"
                ng-bind="informacionClienteDetalle.idOrden"></span>
            &nbsp;&nbsp;OS: <span id="folio-os-cliente" class="cuenta-second" placeholder="OS"
                ng-bind="informacionClienteDetalle.folioSistema"></span>
        </label>
        <div class="divider-cuenta " style="border: 0.5px  solid #e6e6e6;margin-bottom: 1em; margin-top: .2em;"></div>
    </div>

</div>
<div class="row">
    <div class="col-6">
        <div class="row row-second-step">
            <div class="col-4" style="text-align: left;">
                <label class="label-filter" for="nombre-cliente">Nombre cliente:</label>
                <input id="nombre-cliente" ng-model="informacionClienteDetalle.nombre" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo formulario-texto">
            </div>
            <div class="col-4" style="text-align: left;">
                <label class="label-filter" for="nombre-cliente">Apellido paterno:</label>
                <input id="apellidopaterno-cliente" ng-model="informacionClienteDetalle.apaterno" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo formulario-texto">
            </div>
            <div class="col-4" style="text-align: left;">
                <label class="label-filter" for="nombre-cliente">Apellido materno:</label>
                <input id="apellidomaterno-cliente" ng-model="informacionClienteDetalle.amaterno" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo formulario-texto">
            </div>
        </div>
        <div class=" row row-second-step">
            <div class="col-12" style="text-align: left;">
                <label class="label-filter" for="calle-form">Calle</label>
                <input id="calle-form" ng-model="informacionClienteDetalle.direccion.calle" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo formulario-texto">
            </div>
        </div>
        <div class="row row-second-step">
            <div class="col-4" style="text-align: left;">
                <label class="label-filter" for="num-ext">N&uacute;m. ext.</label>
                <input id="num-ext" ng-model="informacionClienteDetalle.direccion.numeroExterior" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
            <div class=" col-4" style="text-align: left;">
                <label class="label-filter" for="num-int">N&uacute;m. int.</label>
                <input id="num-int" ng-model="informacionClienteDetalle.direccion.numeroInterior" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
            <div class=" col-4" style="text-align: left;">
                <label class="label-filter" for="codigopostal-form">C&oacute;digo postal:</label>
                <input id="codigopostal-form" ng-model="informacionClienteDetalle.direccion.codigoPostal" disabled
                    type="text" class="form-control form-control-sm mb-1 formulario-campo">
            </div>
        </div>

        <div class=" row row-second-step">
            <div class="col-2" style="text-align: left;">
                <label class="label-filter" for="extension-form">Ext.:</label>
                <input id="extension-form" ng-model="informacionClienteDetalle.direccion.numeroExt" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
            <div class="col-5" style="text-align: left;">
                <label class="label-filter" for="telefono-form">Tel&eacute;fono:</label>
                <input id="telefono-form" ng-model="informacionClienteDetalle.telefonoCliente" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo">
            </div>
            <div class="col-5" style="text-align: left;">
                <label class="label-filter" for="celular-form">Celular:</label>
                <input id="celular-form" ng-model="informacionClienteDetalle.telefonoCliente" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo">
            </div>
        </div>
        <div class=" row row-second-step">
            <div class="col-12" style="text-align: left;">
                <label class="label-filter" for="referencias-form">Referencias:</label>
                <input id="referencias-form" ng-model="informacionClienteDetalle.referencias" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
        </div>
        <div class=" row row-second-step">
            <div class=" col-12" style="text-align: left;">
                <label class="label-filter" for="ciudad-form">Comentarios</label>
                <textarea id="comments-form" ng-model="informacionClienteDetalle.comentario" disabled
                    class="form-control form-control-sm mb-1 formulario-campo " rows="2"
                    style="height: auto !important"></textarea>
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class=" row row-second-step">
            <div class=" col-6" style="text-align: left;">
                <label class="label-filter" for="estado-form">Estado:</label>
                <input id="estado-form" ng-model="informacionClienteDetalle.direccion.estado" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
            <div class=" col-6" style="text-align: left;">
                <label class="label-filter" for="municipio-contacto">Municipio:</label>
                <input id="municipio-contacto" ng-model="informacionClienteDetalle.direccion.municipio" disabled
                    type="text" class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
        </div>
        <div class=" row row-second-step">
            <div class="col-7" style="text-align: left;">
                <label class="label-filter" for="entrecalle-form">Entre calles:</label>
                <input id="entrecalle-form" ng-model="informacionClienteDetalle.direccion.entreCalles" disabled
                    type="text" class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
            <div class=" col-5" style="text-align: left;">
                <label class="label-filter" for="ciudad-form">Ciudad</label>
                <input id="ciudad-form" ng-model="informacionClienteDetalle.direccion.ciudad" type="text" disabled
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
        </div>

        <div class=" row row-second-step">
            
            <div class=" col-6" style="text-align: left;">
                <label class="label-filter" for="colonia-form">Colonia</label>
                <input id="colonia-contacto" ng-model="informacionClienteDetalle.direccion.colonia" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
            <div class=" col-6" style="text-align: left;">
                <label class="label-filter" for="ciudad-form">Correo</label>
                <input id="correo-form" ng-model="informacionClienteDetalle.correo" type="text" disabled
                    name="mailregistro" ng-pattern="emailFormat" required
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
        </div>
        <div class=" row row-second-step">
            <div class=" col-7" style="text-align: left;">
                <label class="label-filter" for="colonia-form">Raz&oacute;n social</label>
                <input id="rfc-form" ng-model="informacionClienteDetalle.razonsocial" type="text" disabled
                    class="form-control form-control-sm mb-1 formulario-campo ">
            </div>
           
            <div class="col-5 columna-filtro-ind-form" style="text-align: left;">
                <label class="label-filter" for="referencias-form">Unidad de negocio:</label>
                <select id="unitNeg-form" ng-model="informacionClienteDetalle.uniNegocio" 
                    class="form-control form-control-sm mb-1 formulario-campo">
                    <option value="">Seleccione...</option>
                    <option value="empresarial">EMPRESARIAL</option>
                    <option  value="residencial">RESIDENCIAL</option>
                </select>
            </div>
        </div>
        <div class="row row-second-step">
            <h5 class="title-ordenuniversal">Datos del contacto</h5>
            <div class="divider-cuenta dividercontacto"></div>
        </div>

        <div class=" row row-second-step">
            <div class="col-8" style="text-align: left;">
                <label class="label-filter" for="nombre-contacto">Nombre Contacto</label>
                <input id="nombre-contacto" ng-model="informacionClienteDetalle.nombreContacto" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo">
            </div>
            <div class="col-4" style="text-align: left;">
                <label class="label-filter" for="nombre-contacto">Tel&eacute;fono</label>
                <input id="telefono-contacto" ng-model="informacionClienteDetalle.telefonoContacto" disabled type="text"
                    class="form-control form-control-sm mb-1 formulario-campo">
            </div>
        </div>
    </div>
</div>