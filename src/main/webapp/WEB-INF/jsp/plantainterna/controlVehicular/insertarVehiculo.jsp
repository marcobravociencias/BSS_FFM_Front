<div class="row">
    <form ng-submit="guardarVehiculo()" autocomplete="off">
        <div class="row segment">
            <div class="col-3">
                <span class="title">Datos Generales</span>
            </div>
            <div class="col-8">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Tipo Veh&iacute;culo <span style="color: red">*</span></label>
                        <select class="form-control form-control-sm custom-select" name="tipo" id="tipo"
                            ng-change="loadMarca()" ng-model="tipo">
                            <option value="" selected>-- Seleccione tipo --</option>
                            <option value="{{ tipoVehiculo.idTipoVehiculo }}"
                                ng-repeat="tipoVehiculo in data.tipoVehiculos">
                                {{ tipoVehiculo.tipoVehiculo }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Marca <span style="color: red">*</span></label>
                        <span ng-if="marcas.length == 0" id="msjInterno">Seleccione Tipo Veh&iacute;culo</span>
                        <select ng-if="marcas.length" class="form-control form-control-sm custom-select" name="marca"
                            id="marca" ng-model="marca" ng-change="loadLinea()">
                            <option value="" selected>-- Seleccione marca --</option>
                            <option value="{{ marcaVehiculo.idMarca }}" ng-repeat="marcaVehiculo in marcas">
                                {{ marcaVehiculo.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Linea de Veh&iacute;culo <span style="color: red">*</span></label>
                        <span ng-if="lineas.length == 0" id="msjInterno">Seleccione Marca</span>
                        <select ng-if="lineas.length" class="form-control form-control-sm custom-select" name="linea"
                            id="linea" ng-model="linea">
                            <option value="" selected>-- Seleccione linea --</option>
                            <option value="{{ lineasVehiculo.idMarca }}" ng-repeat="lineasVehiculo in lineas">
                                {{ lineasVehiculo.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>A&ntilde;o de Veh&iacute;culo <span style="color: red">*</span></label>
                        <input type="text" class="datepicker year form-control form-control-sm" id="anio" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Motor <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="numMotor" ng-model="numMotor"
                            capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Chasis <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="numChasis" ng-model="numChasis"
                            capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>Color <span style="color: red">*</span></label>
                        <select class="form-control form-control-sm custom-select" id="color">
                            <option value="" selected>-- Seleccione tipo --</option>
                            <option value="{{colorVehiculo.idColor}}" ng-repeat="colorVehiculo in data.colores">
                                {{colorVehiculo.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Placa <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="placa" ng-model="placas"
                            capitalize />
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="row segment">
            <div class="col-3">
                <span class="title">Documentaci&oacute;n</span>
            </div>
            <div class="col-8">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Aseguradora <span style="color: red">*</span></label>
                        <select class="form-control form-control-sm custom-select" id="aseguradora">
                            <option value="" selected>-- Seleccione tipo --</option>
                            <option value="{{seguroVehiculo.idSeguro}}" ng-repeat="seguroVehiculo in data.seguros">
                                {{seguroVehiculo.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de P&oacute;liza
                            <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="numPoliza" ng-model="numPoliza"
                            capitalize />
                    </div>
                    <div class="col-3 form-group">
                        <label>Fecha Vencimiento P&oacute;liza
                            <span style="color: red">*</span></label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm"
                            id="vencimientoPoliza" />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Tarjeta de Circulaci&oacute;n
                            <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="numTarjetaC" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label style="font-size: 11px !important">Vencimiento Tarjeta de Circulaci&oacute;n<span
                                style="color: red">*</span></label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm"
                            id="vencimientoTarjeta" />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Verificaci&oacute;n
                            <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="numVerificacion" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Fecha de Verificaci&oacute;n
                            <span style="color: red">*</span></label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm"
                            id="fechaVerificacion" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Clave Pensi&oacute;n <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="clavePension" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>N&uacute;m. Tarjeta Gasolina
                            <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="numTarjetaG" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Clave GPS <span style="color: red">*</span></label>
                        <input type="text" class="form-control form-control-sm" id="gps" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Licencia <span style="color: red">*</span></label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileLicencia" ng-model="fileLicencia"
                                ng-on-change="subirArchivo($event, 'textLicencia')" accept="image/*" />
                            <label class="custom-file-label" for="fileLicencia" id="textLicencia">Cargar Imagen</label>
                        </div>
                    </div>
                    <div class="col-3 form-group">
                        <label>Tarjeta Circulaci&oacute;n
                            <span style="color: red">*</span></label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileTarjeta" accept="image/*"
                                ng-on-change="subirArchivo($event, 'textTarjeta')" ng-model="fileTarjeta" />
                            <label class="custom-file-label" for="fileTarjeta" id="textTarjeta">Cargar Imagen</label>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Foto de Veh&iacute;culo <span style="color: red">*</span></label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileFoto" accept="image/*"
                                ng-model="fileFoto" ng-change="subirArchivo($event, 'textFoto')" />
                            <label class="custom-file-label" for="fileFoto" id="textFoto">Cargar Imagen</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="row segment">
            <div class="col-3">
                <span class="title">Otros</span>
            </div>
            <div class="col-8">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Ciudad <span style="color: red">*</span></label>
                        <select class="form-control form-control-sm custom-select" id="ciudad">
                            <option value="" selected>-- Seleccione tipo --</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Distrito <span style="color: red">*</span></label>
                        <select class="form-control form-control-sm custom-select" id="distrito">
                            <option value="" selected>-- Seleccione tipo --</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Ubicaci&oacute;n <span style="color: red">*</span></label>
                        <select class="form-control form-control-sm custom-select" id="ubicacion">
                            <option value="" selected>-- Seleccione tipo --</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="form-label">Rotulado <span style="color: red">*</span></label>
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
                        <label>Estatus <span style="color: red">*</span></label>
                        <select class="form-control form-control-sm custom-select" id="estatus" ng-model="estatus"
                            ng-change="loadMotivo()">
                            <option value="" selected>-- Seleccione estatus --</option>
                            <option value="{{status.idEstatus}}" ng-repeat="status in data.estatus">{{status.nombre}}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Motivo <span style="color: red">*</span></label>
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
                        <label>Comentarios <span style="color: red">*</span></label>
                        <textarea class="form-control form-control-sm" id="comentarios"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="row segment">
            <div class="col-12">
                <button id="btnGuardar" type="submit" class="btn btn-primary btnTotal">
                    Guardar
                </button>
            </div>
        </div>
    </form>
</div>