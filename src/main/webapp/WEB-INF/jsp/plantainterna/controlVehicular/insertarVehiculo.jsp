<div class="col-12  box-row formulario-vehiculo">
    <ul class="nav nav-pills mb-3" id="pills-tab-vehiculo" role="tablist">
        <li class="nav-item" role="general">
            <a class="nav-link pills active" id="pills-general-tab" data-toggle="pill" href="#pills-general" role="tab"
                aria-controls="pills-general" aria-selected="true">Datos generales</a>
        </li>
        <li class="nav-item" role="documentacion">
            <a class="nav-link pills" id="pills-documentacion-tab" data-toggle="pill" href="#pills-documentacion"
                role="tab" aria-controls="pills-documentacion" aria-selected="false">Documentaci&oacute;n</a>
        </li>
        <li class="nav-item" role="imagenes" ng-click="printImgTab()">
            <a class="nav-link pills" id="pills-imagenes-tab" data-toggle="pill" href="#pills-imagenes" role="tab"
                aria-controls="pills-imagenes" aria-selected="false">Im&aacute;genes</a>
        </li>
        <li class="nav-item" role="resumen" onclick="getNameText()">
            <a class="nav-link pills" id="pills-resumen-tab" data-toggle="pill" href="#pills-resumen" role="tab"
                aria-controls="pills-resumen" aria-selected="false">Resumen</a>
        </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane pills-pane active show" id="pills-general" role="tabpanel"
            aria-labelledby="pills-general-tab">
            <div class="col-12">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Placa </label>
                        <input type="text" class="form-control form-control-sm" id="placa" onchange="buscarPlaca()"
                            maxlength="8" ng-model="vehiculo.placa" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Tipo veh&iacute;culo <i ng-if="!data.tipoVehiculos.length"
                                class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                title="No se encontr&oacute;o el catalogo de tipo veh&iacute;culo"></i></label>
                        <select class="form-control form-control-sm custom-select" name="tipo" id="tipo"
                            ng-change="loadMarca()" ng-model="vehiculo.idTipo">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{ tipoVehiculo.idTipoVehiculo }}"
                                ng-repeat="tipoVehiculo in data.tipoVehiculos">
                                {{ tipoVehiculo.tipoVehiculo }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Marca </label>
                        <select class="form-control form-control-sm custom-select" name="marca" id="marca"
                            ng-model="vehiculo.idMarca" ng-change="loadLinea()">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{ marcaVehiculo.idMarca }}" ng-repeat="marcaVehiculo in marcas">
                                {{ marcaVehiculo.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">L&iacute;nea veh&iacute;culo </label>
                        <select class="form-control form-control-sm custom-select" name="linea" id="linea"
                            ng-model="vehiculo.idModelo">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{ lineasVehiculo.idMarca }}" ng-repeat="lineasVehiculo in lineas">
                                {{ lineasVehiculo.nombre }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">A&ntilde;o veh&iacute;culo </label>
                        <input type="text" class="datepicker year form-control form-control-sm" placeholder="aaaa"
                            id="anio" readonly ng-model="vehiculo.anio" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">N&uacute;mero serie <span
                                style="margin-left: 7em;">{{vehiculo.numeroSerie.length ? vehiculo.numeroSerie.length :
                                0}} - 17</span></label>
                        <input type="text" class="form-control form-control-sm" id="numSerie"
                            ng-model="vehiculo.numeroSerie" capitalize autocomplete="off" maxlength="17" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Combustible </label>
                        <select class="form-control form-control-sm custom-select" id="combustible"
                            ng-model="vehiculo.combustible">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="GASOLINA">GASOLINA</option>
                            <option value="DIESEL">DIESEL</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Color <i ng-if="!data.tipoVehiculos.length"
                                class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                title="No se encontr&oacute;o el catalogo de colores"></i></label>
                        <select class="form-control form-control-sm custom-select" id="color"
                            ng-model="vehiculo.idColor">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{colorVehiculo.idColor}}" ng-repeat="colorVehiculo in data.colores">
                                {{colorVehiculo.descripcion}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Tipo operaci&oacute;n </label>
                        <select class="form-control form-control-sm custom-select" id="operacion"
                            ng-model="vehiculo.idOperacion">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{operacion.id}}" ng-repeat="operacion in data.operaciones">
                                {{operacion.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Tipo cuadrilla </label>
                        <select class="form-control form-control-sm custom-select" id="cuadrilla"
                            ng-model="vehiculo.idTipoCuadrilla">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{cuadrilla.id}}" ng-repeat="cuadrilla in data.cuadrillas">
                                {{cuadrilla.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Empresa </label>
                        <select class="form-control form-control-sm custom-select" id="empresa"
                            ng-model="vehiculo.idEmpresa">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{empresa.id}}" ng-repeat="empresa in data.empresas">
                                {{empresa.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Centro de costos </label>
                        <select class="form-control form-control-sm custom-select" id="centroCostos"
                            ng-model="vehiculo.idCosto">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{costo.id}}" ng-repeat="costo in data.costos">
                                {{costo.descripcion}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Expediente </label>
                        <input type="text" class="form-control form-control-sm" id="expediente" maxlength="15"
                            ng-model="vehiculo.expediente" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Geograf&iacute;a <i ng-if="!geografiaList.length"
                                class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                title="No se encontr&oacute;o el catalogo de geograf&iacute;a"></i></label>
                        <input ng-click="abrirModalGeografia()" readonly type="text" id="arbol_vehiculo_consulta"
                            class="form-control form-control-sm" placeholder="NO HAY SELECCI&Oacute;N" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Ubicaci&oacute;n CDO</label>
                        <select class="form-control form-control-sm custom-select" id="encierro"
                            ng-model="vehiculo.detalle.idEncierro">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{enc.id}}" ng-repeat="enc in data.encierros">
                                {{enc.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>

                <h5 class="fs-title"><i class="fas fa-exclamation-circle me-2" style="color: orange;"></i> Los datos de
                    esta
                    secci&oacute;n son obligatorios</h5>
            </div>
        </div>
        <div class="tab-pane pills-pane fade" id="pills-documentacion" role="tabpanel"
            aria-labelledby="pills-documentacion-tab">
            <div class="col-12">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Aseguradora <i ng-if="!data.seguros.length"
                                class="icono-noseleccion fas fa-exclamation-circle ml-2"
                                title="No se encontr&oacute;o el catalogo de tipo veh&iacute;culo"></i></label>
                        <select class="form-control form-control-sm custom-select" id="aseguradora"
                            ng-model="vehiculo.detalle.idAseguradora">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{seguroVehiculo.idSeguro}}" ng-repeat="seguroVehiculo in data.seguros">
                                {{seguroVehiculo.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">N&uacute;m. p&oacute;liza
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numPoliza" maxlength="25"
                            ng-model="vehiculo.detalle.numeroPoliza" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Fecha vencimiento p&oacute;liza
                        </label>
                        <input type="text" placeholder="dd/mm/aaaa"
                            class="datepicker datepickerNormal form-control form-control-sm"
                            ng-model="vehiculo.detalle.fechaVencimientoPoliza" readonly id="vencimientoPoliza" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">N&uacute;m. tarjeta circulaci&oacute;n
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numTarjetaC" maxlength="25"
                            ng-model="vehiculo.detalle.tarjetaCirculacion" capitalize autocomplete="off" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Vencimiento tarjeta circulaci&oacute;n</label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm"
                            placeholder="dd/mm/aaaa" ng-model="vehiculo.detalle.fechaVencimientoTarjeta"
                            id="vencimientoTarjeta" readonly />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">N&uacute;m. verificaci&oacute;n
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numVerificacion" maxlength="25"
                            ng-model="vehiculo.detalle.numeroVerificacion" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Fecha verificaci&oacute;n
                        </label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm"
                            placeholder="dd/mm/aaaa" ng-model="vehiculo.detalle.fechaVerificacion" readonly
                            id="fechaVerificacion" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Clave pensi&oacute;n </label>
                        <input type="text" class="form-control form-control-sm" id="clavePension" maxlength="25"
                            ng-model="vehiculo.detalle.clavePension" capitalize autocomplete="off" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">N&uacute;m. tarjeta gasolina
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numTarjetaG" maxlength="25"
                            ng-model="vehiculo.detalle.tarjetaGasolina" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Clave GPS </label>
                        <input type="text" class="form-control form-control-sm" id="gps" maxlength="25"
                            ng-model="vehiculo.detalle.claveGps" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">N&uacute;m. motor </label>
                        <input type="text" class="form-control form-control-sm" id="numMotor" maxlength="25"
                            ng-model="vehiculo.detalle.numeroMotor" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">N&uacute;m. chasis </label>
                        <input type="text" class="form-control form-control-sm" id="numChasis" maxlength="25"
                            ng-model="vehiculo.detalle.numeroChasis" capitalize autocomplete="off" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Engomado </label>
                        <select class="form-control form-control-sm custom-select" id="engomado"
                            ng-model="vehiculo.detalle.engomado">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="ROSA">ROSA</option>
                            <option value="AMARILLO">AMARILLO</option>
                            <option value="ROJO">ROJO</option>
                            <option value="VERDE">VERDE</option>
                            <option value="AZUL">AZUL</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Holograma </label>
                        <select class="form-control form-control-sm custom-select" id="holograma"
                            ng-model="vehiculo.detalle.holograma">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="DOBLE CERO">DOBLE CERO</option>
                            <option value="CERO">CERO</option>
                            <option value="UNO">UNO</option>
                            <option value="DOS">DOS</option>
                            <option value="FORANEO">FORANEO</option>
                        </select>
                    </div>
                    <div class="col-3 form-group check-vehiculo">
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
                    <div class="col-3 form-group" ng-if="!isEdit">
                        <label class="label-vehiculo">Comentarios </label> 
                        <textarea class="form-control form-control-sm" id="comentarios" rows="2" style="height: auto !important;"
                            ng-model="vehiculo.detalle.comentarios" maxlength="250"></textarea>
                    </div>
                    <div class="col-3 form-group" ng-if="isEdit">
                        <label class="label-vehiculo">Estatus </label>
                        <select class="form-control form-control-sm custom-select" id="estatus"
                            ng-model="vehiculo.idEstatus" ng-change="loadMotivo()">
                            <option value="{{status.idEstatus}}" ng-repeat="status in data.estatus">
                                {{status.nombre}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-row" ng-if="isEdit">
                    <div class="col-3 form-group">
                        <label class="label-vehiculo">Motivo </label>
                        <span ng-if="motivos.length == 0" id="msjInterno">Seleccione estatus</span>
                        <select ng-if="motivos.length > 0" class="form-control form-control-sm custom-select"
                            ng-model="vehiculo.idMotivo" id="motivo">
                            <option value="" selected>-- Seleccione motivo --</option>
                            <option value="{{mot.idEstatus}}" ng-repeat="mot in motivos">{{mot.nombre}}</option>
                        </select>
                    </div>
                    <div class="col-9 form-group">
                        <label class="label-vehiculo">Comentarios </label> 
                        <textarea class="form-control form-control-sm" id="comentarios"
                            ng-model="vehiculo.detalle.comentarios" maxlength="250"></textarea>
                    </div>
                </div>
                <h5 class="fs-title"><i class="fas fa-exclamation-circle me-2" style="color: orange;"></i> Los datos de
                    esta
                    secci&oacute;n no son obligatorios</h5>
            </div>
        </div>
        <div class="tab-pane pills-pane fade" id="pills-imagenes" role="tabpanel" aria-labelledby="pills-imagenes-tab">
            <div class="col-12">
                <div class="form-row">
                    <div class="col-2 form-group mr-3 ml-3">
                        <label class="label-vehiculo">Foto placa </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="filePlaca" ng-model="filePlaca"
                                ng-on-change="subirArchivo($event, 'fotoPlaca')" accept="image/*" />
                            <label class="custom-file-label" for="filePlaca" id="fotoPlaca">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="(vehiculo.urlFotoPlaca && vehiculo.urlFotoPlaca !== 'delete')  || filePlaca"
                            style="margin-left: 1.5em; margin-top: 20px; width: 10em;">
                            <img alt="Placa" src="" class="imgResumen" id="placaImagenTab"
                                onclick="showImgResumen(this)" />
                        </div>
                        <div ng-if="filePlaca.nombre" class="file-delete" style="margin-left: 1.5em;">
                            <span class="text-img">{{filePlaca.nombre}} </span><i class="fa fa-trash"
                                onclick="deleteFile('fotoPlaca')"></i>
                        </div>
                        <div ng-if="vehiculo.urlFotoPlaca && vehiculo.urlFotoPlaca !== 'delete'  && !filePlaca.nombre"
                            class="file-delete" style="margin-left: 1.5em;"><span class="text-img">placa</span>
                            <i class="fa fa-trash" ng-click="deleteFileUrl('fotoPlaca')"></i>
                        </div>
                    </div>
                    <div class="col-2 form-group mr-3 ml-3">
                        <label class="label-vehiculo">Foto veh&iacute;culo </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileFoto" accept="image/*"
                                ng-model="fileFoto" ng-on-change="subirArchivo($event, 'fotoVehiculo')" />
                            <label class="custom-file-label" for="fileFoto" id="fotoVehiculo">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="(vehiculo.urlFotoVehiculo && vehiculo.urlFotoVehiculo !== 'delete') || fileVehiculo"
                            style="margin-left: 1.5em; margin-top: 20px; width: 10em;">
                            <img alt="Vehiculo" src="" class="imgResumen" id="vehiculoImagenTab"
                                onclick="showImgResumen(this)" />
                        </div>
                        <div ng-if="fileVehiculo.nombre" class="file-delete" style="margin-left: 1.5em;"> <span
                                class="text-img">{{fileVehiculo.nombre}} </span>
                            <i class="fa fa-trash" onclick="deleteFile('fotoVehiculo')"></i>
                        </div>
                        <div ng-if="vehiculo.urlFotoVehiculo && vehiculo.urlFotoVehiculo !== 'delete' &&!fileVehiculo.nombre"
                            class="file-delete" style="margin-left: 1.5em;">
                            <span class="text-img">vehiculo</span>
                            <i class="fa fa-trash" ng-click="deleteFileUrl('fotoVehiculo')"></i>
                        </div>
                    </div>
                    <div class="col-2 form-group mr-3 ml-3">
                        <label class="label-vehiculo">Tarjeta circulaci&oacute;n
                        </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileTarjeta" accept="image/*"
                                ng-on-change="subirArchivo($event, 'fotoTarjetaCirculaion')" ng-model="fileTarjeta" />
                            <label class="custom-file-label" for="fileTarjeta" id="fotoTarjetaCirculaion">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="(vehiculo.detalle.urlFotoTarjetaCirculacion && vehiculo.detalle.urlFotoTarjetaCirculacion !== 'delete') || fileCirculacion"
                            style="margin-left: 1.5em; margin-top: 20px; width: 10em;">
                            <img alt="Tarjeta Circulacion" src="" id="circulacionImagenTab"
                                onclick="showImgResumen(this)" class="imgResumen" />
                        </div>
                        <div ng-if="fileCirculacion.nombre" class="file-delete" style="margin-left: 1.5em;">
                            <span class="text-img">{{fileCirculacion.nombre}} </span><i class="fa fa-trash"
                                onclick="deleteFile('fotoTarjetaCirculaion')"></i>
                        </div>
                        <div ng-if="vehiculo.detalle.urlFotoTarjetaCirculacion && vehiculo.detalle.urlFotoTarjetaCirculacion !== 'delete' && !fileCirculacion.nombre"
                            class="file-delete" style="margin-left: 1.5em;"> <span
                                class="text-img">tarjetaCirculacion</span>
                            <i class="fa fa-trash" ng-click="deleteFileUrl('fotoTarjetaCirculaion')"></i>
                        </div>
                    </div>

                    <div class="col-2 form-group mr-3 ml-3">
                        <label class="label-vehiculo">Tarjeta gasolina </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileTarjetaGas" accept="image/*"
                                ng-on-change="subirArchivo($event, 'fotoTarjetaGasolina')" ng-model="fileTarjetaGas" />
                            <label class="custom-file-label" for="fileTarjetaGas" id="fotoTarjetaGasolina">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="(vehiculo.detalle.urlFotoTarjetaGasolina && vehiculo.detalle.urlFotoTarjetaGasolina !== 'delete') || fileGasolina"
                            style="margin-left: 1.5em; margin-top: 20px; width: 10em;">
                            <img alt="Tarjeta Gasolina" src="" id="gasolinaImagenTab" onclick="showImgResumen(this)"
                                class="imgResumen" />
                        </div>
                        <div ng-if="fileGasolina.nombre" class="file-delete" style="margin-left: 1.5em;">
                            <span class="text-img">{{fileGasolina.nombre}} </span><i class="fa fa-trash"
                                onclick="deleteFile('fotoTarjetaGasolina')"></i>
                        </div>
                        <div ng-if="vehiculo.detalle.urlFotoTarjetaGasolina && vehiculo.detalle.urlFotoTarjetaGasolina !== 'delete' && !fileGasolina.nombre"
                            class="file-delete" style="margin-left: 1.5em;"> <span
                                class="text-img">tarjetaGasolina</span>
                            <i class="fa fa-trash" ng-click="deleteFileUrl('fotoTarjetaGasolina')"></i>
                        </div>
                    </div>
                    <div class="col-2 form-group mr-3 ml-3">
                        <label class="label-vehiculo">Foto licencia </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileFotoLicencia" accept="image/*"
                                ng-on-change="subirArchivo($event, 'fotoLicencia')" ng-model="fileFotoLicencia" />
                            <label class="custom-file-label" for="fileFotoLicencia" id="fotoLicencia">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="(vehiculo.detalle.urlFotoIdentificacion && vehiculo.detalle.urlFotoIdentificacion !== 'delete') || fileLicencia"
                            style="margin-left: 1.5em; margin-top: 20px; width: 10em;">
                            <img alt="Foto licencia" src="" id="licenciaImagenTab" onclick="showImgResumen(this)"
                                class="imgResumen" />
                        </div>
                        <div ng-if="fileLicencia.nombre" class="file-delete" style="margin-left: 1.5em;">
                            <span class="text-img">{{fileLicencia.nombre}} </span><i class="fa fa-trash"
                                onclick="deleteFile('fotoLicencia')"></i>
                        </div>
                        <div ng-if="vehiculo.detalle.urlFotoIdentificacion && vehiculo.detalle.urlFotoIdentificacion !== 'delete' && !fileLicencia.nombre"
                            class="file-delete" style="margin-left: 1.5em;"> <span class="text-img">fotoLicencia</span>
                            <i class="fa fa-trash" ng-click="deleteFileUrl('fotoLicencia')"></i>
                        </div>
                    </div>
                </div>
                <h5 class="fs-title"> <i class="fas fa-exclamation-circle me-2" style="color: orange;"></i> Los datos de
                    esta secci&oacute;n no son obligatorios</h5>
            </div>
        </div>
        <div class="tab-pane pills-pane fade" id="pills-resumen" role="tabpanel" aria-labelledby="pills-resumen-tab">
            <div class="col-12">
                <table class="resumeTable">
                    <tr>
                        <td class="tableTextTitle">* Placa: </td>
                        <td class="tableText">{{vehiculo.placa ? vehiculo.placa : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* A&ntilde;o: </td>
                        <td class="tableText">{{vehiculoText.anio ? vehiculoText.anio : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* N&uacute;m. serie: </td>
                        <td class="tableText">{{vehiculo.numeroSerie ? vehiculo.numeroSerie : 'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Tipo veh&iacute;culo: </td>
                        <td class="tableText">{{vehiculoText.tipoText ? vehiculoText.tipoText : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Marca: </td>
                        <td class="tableText">{{vehiculoText.marcaText ? vehiculoText.marcaText : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Modelo: </td>
                        <td class="tableText">{{vehiculoText.lineaText ? vehiculoText.lineaText : 'Sin asignar'}}</td>

                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Combustible: </td>
                        <td class="tableText">{{vehiculo.combustible ? vehiculo.combustible : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Color: </td>
                        <td class="tableText">{{vehiculoText.colorText ? vehiculoText.colorText : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Geograf&iacute;a: </td>
                        <td class="tableText" colspan="7">{{vehiculoText.geografiaText ? vehiculoText.geografiaText :
                            'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Tipo operaci&oacute;n: </td>
                        <td class="tableText">{{vehiculoText.operacionText ? vehiculoText.operacionText : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Tipo cuadrilla: </td>
                        <td class="tableText">{{vehiculoText.cuadrillaText ? vehiculoText.cuadrillaText : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Empresa: </td>
                        <td class="tableText" colspan="7">{{vehiculoText.empresaText ? vehiculoText.empresaText :
                            'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Centro de costos: </td>
                        <td class="tableText">{{vehiculoText.costoText ? vehiculoText.costoText : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Expediente: </td>
                        <td class="tableText">{{vehiculo.expediente ? vehiculo.expediente : 'Sin asignar'}}</td>
                    </tr>
                </table>
                <table class="resumeTable">
                    <tr>
                        <td class="tableTextTitle">* Aseguradora: </td>
                        <td class="tableText">{{vehiculoText.aseguradoraText ? vehiculoText.aseguradoraText :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* N&uacute;m. poliza: </td>
                        <td class="tableText">{{vehiculo.detalle.numeroPoliza ? vehiculo.detalle.numeroPoliza :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Fecha vencimiento poliza: </td>
                        <td class="tableText">{{vehiculoText.fechaVencimientoPoliza ?
                            vehiculoText.fechaVencimientoPoliza :
                            'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* N&uacute;m. tarjeta de circulaci&oacute;n: </td>
                        <td class="tableText">{{vehiculo.detalle.tarjetaCirculacion ?
                            vehiculo.detalle.tarjetaCirculacion : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Vencimiento tarjeta circulaci&oacute;n: </td>
                        <td class="tableText">{{vehiculoText.fechaVencimientoTarjeta ?
                            vehiculoText.fechaVencimientoTarjeta :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* N&uacute;m. verificaci&oacute;n: </td>
                        <td class="tableText">{{vehiculo.detalle.numeroVerificacion ?
                            vehiculo.detalle.numeroVerificacion : 'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Fecha verificaci&oacute;n: </td>
                        <td class="tableText">{{vehiculoText.fechaVerificacion ?
                            vehiculoText.fechaVerificacion : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Clave pensi&oacute;n: </td>
                        <td class="tableText">{{vehiculo.detalle.clavePension ? vehiculo.detalle.clavePension :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* N&uacute;m. tarjeta gasolina: </td>
                        <td class="tableText">{{vehiculo.detalle.tarjetaGasolina ?
                            vehiculo.detalle.tarjetaGasolina
                            : 'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Clave GPS: </td>
                        <td class="tableText">{{vehiculo.detalle.claveGps ? vehiculo.detalle.claveGps : 'Sin asignar'}}
                        </td>
                        <td class="tableTextTitle">* N&uacute;m. motor: </td>
                        <td class="tableText">{{vehiculo.detalle.numeroMotor ? vehiculo.detalle.numeroMotor :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* N&uacute;m. chasis: </td>
                        <td class="tableText">{{vehiculo.detalle.numeroChasis ? vehiculo.detalle.numeroChasis :
                            'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Engomado: </td>
                        <td class="tableText">{{vehiculo.detalle.engomado ? vehiculo.detalle.engomado : 'Sin asignar'}}
                        </td>
                        <td class="tableTextTitle">* Holograma: </td>
                        <td class="tableText">{{vehiculo.detalle.holograma ? vehiculo.detalle.holograma : 'Sin
                            asignar'}}
                        </td>
                        <td class="tableTextTitle">* Ubicaci&oacute;n CDO: </td>
                        <td class="tableText">{{vehiculoText.encierroText ? vehiculoText.encierroText : 'Sin asignar'}}
                        </td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Rotulado: </td>
                        <td class="tableText">{{vehiculoText.rotulado ? 'Si' : 'No'}}</td>
                        <td class="tableTextTitle" ng-if="vehiculo.estatus">* Estatus: </td>
                        <td class="tableText" ng-if="vehiculo.estatus">{{vehiculoText.estatus ? vehiculoText.estatus :
                            'BAJA'}}</td>
                        <td class="tableTextTitle" ng-if="vehiculo.estatus">* Motivo: </td>
                        <td class="tableText" ng-if="vehiculo.estatus">{{vehiculoText.motivo ? vehiculoText.motivo :
                            'Sin Asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Comentarios: </td>
                        <td class="tableText" colspan="5" style="width: 835px;">{{vehiculo.detalle.comentarios ?
                            vehiculo.detalle.comentarios
                            : 'Sin asignar'}}</td>
                    </tr>
                </table>
                <div class="row imagenes">
                    <div class="col-2"
                        ng-if="(vehiculo.urlFotoPlaca && vehiculo.urlFotoPlaca !== 'delete') || filePlaca">
                        <p class="tableTextTitle">* Foto placa</p>
                        <img alt="Placa" src="" class="imgResumen" id="placaImagen" onclick="showImgResumen(this)" />
                    </div>
                    <div class="col-2"
                        ng-if="(vehiculo.urlFotoVehiculo && vehiculo.urlFotoVehiculo !== 'delete') || fileVehiculo">
                        <p class="tableTextTitle">* Foto veh&iacute;culo</p>
                        <img alt="Vehiculo" src="" class="imgResumen" id="vehiculoImagen"
                            onclick="showImgResumen(this)" />
                    </div>
                    <div class="col-2"
                        ng-if="(vehiculo.detalle.urlFotoTarjetaCirculacion && vehiculo.detalle.urlFotoTarjetaCirculacion !== 'delete') || fileCirculacion">
                        <p class="tableTextTitle">* Foto tarjeta circulaci&oacute;n</p>
                        <img alt="Tarjeta Circulacion" src="" id="circulacionImagen" onclick="showImgResumen(this)"
                            class="imgResumen" />
                    </div>
                    <div class="col-2"
                        ng-if="(vehiculo.detalle.urlFotoTarjetaGasolina && vehiculo.detalle.urlFotoTarjetaGasolina !== 'delete') || fileGasolina">
                        <p class="tableTextTitle">* Foto tarjeta gasolina</p>
                        <img alt="Tarjeta Gasolina" src="" id="gasolinaImagen" onclick="showImgResumen(this)"
                            class="imgResumen" />
                    </div>
                    <div class="col-2"
                        ng-if="(vehiculo.detalle.urlFotoIdentificacion && vehiculo.detalle.urlFotoIdentificacion !== 'delete') || fileLicencia">
                        <p class="tableTextTitle">* Foto licencia</p>
                        <img alt="Foto Licencia" src="" id="licenciaImagen" onclick="showImgResumen(this)"
                            class="imgResumen" />
                    </div>
                </div>
                <h5 class="fs-title" style="margin-top: 1em;"> <i class="fas fa-exclamation-circle me-2"
                        style="color: orange;"></i>
                    Verifica la
                    informaci&oacute;n antes de guardar</h5>
            </div>
            <div style="text-align: right; margin: 1em 0 0 0;">
                <button type="button" class="btn btn-primary ripple-surface btnGuardarVehiculo"
                    onclick="guardarCambios()" style="margin-bottom: 1em;">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</div>