<div class="row">
    <form ng-submit="guardarVehiculo()" autocomplete="off">
        <div class="row segment">
            <!--
                 <div class="col-3">
                <span class="title">Datos Generales</span>
            </div>
            -->
           
            <div class="col-11">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Tipo Veh&iacute;culo </label>
                        <select class="form-control form-control-sm custom-select" name="tipo" id="tipo"
                            ng-change="loadMarca()" ng-model="vehiculo.idTipo">
                            <option value="" selected>-- Seleccione --</option>
                            <option value="{{ tipoVehiculo.idTipoVehiculo }}"
                                ng-repeat="tipoVehiculo in data.tipoVehiculos">
                                {{ tipoVehiculo.tipoVehiculo }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Marca </label>
                        <span ng-if="marcas.length == 0" id="msjInterno">Seleccione Tipo Veh&iacute;culo</span>
                        <select ng-if="marcas.length" class="form-control form-control-sm custom-select" name="marca"
                            id="marca" ng-model="vehiculo.idMarca" ng-change="loadLinea()">
                            <option value="" selected>-- Seleccione --</option>
                            <option value="{{ marcaVehiculo.idMarca }}" ng-repeat="marcaVehiculo in marcas">
                                {{ marcaVehiculo.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Linea de Veh&iacute;culo </label>
                        <span ng-if="lineas.length == 0" id="msjInterno">Seleccione Marca</span>
                        <select ng-if="lineas.length" class="form-control form-control-sm custom-select" name="linea"
                            id="linea" ng-model="vehiculo.idModelo">
                            <option value="" selected>-- Seleccione --</option>
                            <option value="{{ lineasVehiculo.idMarca }}" ng-repeat="lineasVehiculo in lineas">
                                {{ lineasVehiculo.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>A&ntilde;o de Veh&iacute;culo </label>
                        <input type="text" class="datepicker year form-control form-control-sm" id="anio" readonly
                            ng-model="vehiculo.anio" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>N&uacute;mero de Serie </label>
                        <input type="text" class="form-control form-control-sm" id="numSerie"
                            ng-model="vehiculo.numeroSerie" capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>Combustible </label>
                        <select class="form-control form-control-sm custom-select" id="combustible"
                            ng-model="vehiculo.combustible">
                            <option value="" selected>-- Seleccione --</option>
                            <option value="GASOLINA" selected>Gasolina</option>
                            <option value="DIESEL" selected>Diesel</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Color </label>
                        <select class="form-control form-control-sm custom-select" id="color"
                            ng-model="vehiculo.idColor">
                            <option value="" selected>-- Seleccione --</option>
                            <option value="{{colorVehiculo.idColor}}" ng-repeat="colorVehiculo in data.colores">
                                {{colorVehiculo.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Placa </label>
                        <input type="text" class="form-control form-control-sm" id="placa" ng-model="vehiculo.placa"
                            capitalize />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <div style="width: 1em;float: left;" ng-show="banderaErrorGeografia">
                            <i class="icono-noseleccion fas fa-exclamation-circle me-2" style="margin-left: -.2em;"
                                title="No se encontro el catalogo de Geografia"></i>
                        </div>
                        <label>Geograf&iacute;a </label>
                        <input ng-click="abrirModalGeografia()" readonly type="text" id="arbol_vehiculo_consulta"
                            class="form-control form-control-sm" placeholder="-- Seleccione --" />

                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="row segment">
            <!--
                    <div class="col-3">
                <span class="title">Documentaci&oacute;n</span>
            </div> 
            -->
       
            <div class="col-11">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Aseguradora </label>
                        <select class="form-control form-control-sm custom-select" id="aseguradora"
                            ng-model="vehiculo.detalle.idAseguradora">
                            <option value="" selected>-- Seleccione --</option>
                            <option value="{{seguroVehiculo.idSeguro}}" ng-repeat="seguroVehiculo in data.seguros">
                                {{seguroVehiculo.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de P&oacute;liza
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numPoliza"
                            ng-model="vehiculo.detalle.numeroPoliza" capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>Fecha Vencimiento P&oacute;liza
                        </label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm" readonly
                            id="vencimientoPoliza" />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Tarjeta de Circulaci&oacute;n
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numTarjetaC"
                            ng-model="vehiculo.detalle.tarjetaCirculacion" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label style="font-size: 11px !important">Vencimiento Tarjeta de Circulaci&oacute;n<span
                                style="color: red">*</span></label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm"
                            id="vencimientoTarjeta" readonly />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Verificaci&oacute;n
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numVerificacion"
                            ng-model="vehiculo.detalle.numeroVerificacion" capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>Fecha de Verificaci&oacute;n
                        </label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm" readonly
                            id="fechaVerificacion" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Clave Pensi&oacute;n </label>
                        <input type="text" class="form-control form-control-sm" id="clavePension"
                            ng-model="vehiculo.detalle.clavePension" capitalize />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>N&uacute;m. Tarjeta Gasolina
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numTarjetaG"
                            ng-model="vehiculo.detalle.tarjetaGasolina" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Clave GPS </label>
                        <input type="text" class="form-control form-control-sm" id="gps"
                            ng-model="vehiculo.detalle.claveGps" capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>Foto Placa </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="filePlaca" ng-model="filePlaca"
                                ng-on-change="subirArchivo($event, 'fotoPlaca')" accept="image/*" />
                            <label class="custom-file-label" for="filePlaca" id="fotoPlaca">Cargar Imagen</label>
                        </div>
                    </div>
                    <div class="col-3 form-group">
                        <label>Foto de Veh&iacute;culo </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileFoto" accept="image/*"
                                ng-model="fileFoto"  ng-on-change="subirArchivo($event, 'fotoVehiculo')" />
                            <label class="custom-file-label" for="fileFoto" id="fotoVehiculo">Cargar Imagen</label>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Tarjeta Circulaci&oacute;n
                        </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileTarjeta" accept="image/*"
                                ng-on-change="subirArchivo($event, 'fotoTarjetaCirculaion')" ng-model="fileTarjeta" />
                            <label class="custom-file-label" for="fileTarjeta" id="fotoTarjetaCirculaion">Cargar Imagen</label>
                        </div>
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Motor </label>
                        <input type="text" class="form-control form-control-sm" id="numMotor"
                            ng-model="vehiculo.detalle.numeroMotor" capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Chasis </label>
                        <input type="text" class="form-control form-control-sm" id="numChasis"
                            ng-model="vehiculo.detalle.numeroChasis" capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>Engomado </label>
                        <select class="form-control form-control-sm custom-select" id="engomado"
                            ng-model="vehiculo.detalle.engomado">
                            <option value="" selected>-- Seleccione --</option>
                            <option value="rosa" selected>Rosa</option>
                            <option value="amarillo" selected>Amarillo</option>
                            <option value="rojo" selected>Rojo</option>
                            <option value="verde" selected>Verde</option>
                            <option value="azul" selected>Azul</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Holograma </label>
                        <select class="form-control form-control-sm custom-select" id="holograma"
                            ng-model="vehiculo.detalle.holograma">
                            <option value="" selected>-- Seleccione --</option>
                            <option value="doble cero" selected>Doble cero</option>
                            <option value="cero" selected>Cero</option>
                            <option value="uno" selected>Uno</option>
                            <option value="dos" selected>Dos</option>
                            <option value="foraneo" selected>Foraneo</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Tarjeta Gasolina </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileTarjetaGas" accept="image/*"
                                ng-on-change="subirArchivo($event, 'fotoTarjetaGasolina')" ng-model="fileTarjetaGas" />
                            <label class="custom-file-label" for="fileTarjetaGas" id="fotoTarjetaGasolina">Cargar Imagen</label>
                        </div>
                    </div>
                    <div class="col-3 form-group">
                        <label>Ubicaci&oacute;n CDO</label>
                        <select class="form-control form-control-sm custom-select" id="encierro"
                            ng-model="vehiculo.detalle.idEncierro">
                            <option value="" selected>-- Seleccione --</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="row segment">
            <!--
                 <div class="col-3">
                <span class="title">Otros</span>
            </div>
            -->
           
            <div class="col-11">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="form-label">Rotulado </label>
                        <br />
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="rotulado" id="rotuladoSi" value="si"
                                checked />
                            <label class="form-check-label" for="rotuladoSi"> Si </label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="rotulado" id="rotuladoNo" value="no" />
                            <label class="form-check-label" for="rotuladoNo"> No </label>
                        </div>
                    </div>
                </div>
                <div class="form-row" ng-if="isEdit">
                    <div class="col-3 form-group">
                        <label>Estatus </label>
                        <select class="form-control form-control-sm custom-select" id="estatus"
                            ng-model="vehiculo.idEstatus" ng-change="loadMotivo()">
                            <option value="" selected>-- Seleccione estatus --</option>
                            <option value="{{status.idEstatus}}" ng-repeat="status in data.estatus">{{status.nombre}}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Motivo </label>
                        <span ng-if="motivos.length == 0" id="msjInterno">Seleccione Estatus</span>
                        <select ng-if="motivos.length > 0" class="form-control form-control-sm custom-select"
                            id="motivo">
                            <option value="" selected>-- Seleccione motivo --</option>
                            <option value="mot.idEstatus" ng-repeat="mot in motivos">{{mot.nombre}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-12 form-group">
                        <label>Comentarios </label>
                        <textarea class="form-control form-control-sm" id="comentarios"
                            ng-model="vehiculo.comentarios"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="row segment">
            <div class="col-12">
                <button id="btnGuardar" type="button" class="btn btn-primary btnTotal" onclick="guardarVehiculo()">
                    Guardar
                </button>
            </div>
        </div>
    </form>
</div>