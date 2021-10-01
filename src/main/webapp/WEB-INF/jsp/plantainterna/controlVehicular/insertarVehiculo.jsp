<div class="col-12  box-row">
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
                aria-controls="pills-imagenes" aria-selected="false">Imagenes</a>
        </li>
        <li class="nav-item" role="resumen" onclick="getNameText()">
            <a class="nav-link pills" id="pills-resumen-tab" data-toggle="pill" href="#pills-resumen" role="tab"
                aria-controls="pills-resumen" aria-selected="false">Resumen</a>
        </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane pills-pane fade show active" id="pills-general" role="tabpanel"
            aria-labelledby="pills-general-tab">
            <div class="col-12">
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Placa </label>
                        <input type="text" class="form-control form-control-sm" id="placa" onchange="buscarPlaca()" maxlength="25"
                            ng-model="vehiculo.placa" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Tipo Veh&iacute;culo </label>
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
                        <label>Marca </label>
                        <select class="form-control form-control-sm custom-select" name="marca" id="marca"
                            ng-model="vehiculo.idMarca" ng-change="loadLinea()">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{ marcaVehiculo.idMarca }}" ng-repeat="marcaVehiculo in marcas">
                                {{ marcaVehiculo.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Linea de Veh&iacute;culo </label>
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
                        <label>A&ntilde;o de Veh&iacute;culo </label>
                        <input type="text" class="datepicker year form-control form-control-sm" placeholder="aaaa"
                            id="anio" readonly ng-model="vehiculo.anio" />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;mero de Serie </label>
                        <input type="text" class="form-control form-control-sm" id="numSerie"
                            ng-model="vehiculo.numeroSerie" capitalize autocomplete="off"  maxlength="25"/>
                    </div>
                    <div class="col-3 form-group">
                        <label>Combustible </label>
                        <select class="form-control form-control-sm custom-select" id="combustible"
                            ng-model="vehiculo.combustible">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="GASOLINA">GASOLINA</option>
                            <option value="DIESEL">DIESEL</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>Color </label>
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
                        <div style="width: 1em;float: left;" ng-show="banderaErrorGeografia">
                            <i class="icono-noseleccion fas fa-exclamation-circle me-2" style="margin-left: -.2em;"
                                title="No se encontro el catalogo de Geografia"></i>
                        </div>
                        <label>Geograf&iacute;a </label>
                        <input ng-click="abrirModalGeografia()" readonly type="text" id="arbol_vehiculo_consulta"
                            class="form-control form-control-sm" placeholder="NO HAY SELECCI&Oacute;N" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Ubicaci&oacute;n CDO</label>
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
                        <label>Aseguradora </label>
                        <select class="form-control form-control-sm custom-select" id="aseguradora"
                            ng-model="vehiculo.detalle.idAseguradora">
                            <option value="" selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{seguroVehiculo.idSeguro}}" ng-repeat="seguroVehiculo in data.seguros">
                                {{seguroVehiculo.descripcion}}</option>
                        </select>
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de P&oacute;liza
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numPoliza"  maxlength="25"
                            ng-model="vehiculo.detalle.numeroPoliza" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Fecha Vencimiento P&oacute;liza
                        </label>
                        <input type="text" placeholder="dd/mm/aaaa"
                            class="datepicker datepickerNormal form-control form-control-sm"
                            ng-model="vehiculo.detalle.fechaVencimientoPoliza" readonly id="vencimientoPoliza" />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Tarjeta de Circulaci&oacute;n
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numTarjetaC"  maxlength="25"
                            ng-model="vehiculo.detalle.tarjetaCirculacion" capitalize autocomplete="off" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label style="font-size: 11px !important">Vencimiento Tarjeta de Circulaci&oacute;n<span
                                style="color: red">*</span></label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm"
                            placeholder="dd/mm/aaaa" ng-model="vehiculo.detalle.fechaVencimientoTarjeta"
                            id="vencimientoTarjeta" readonly />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Verificaci&oacute;n
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numVerificacion"  maxlength="25"
                            ng-model="vehiculo.detalle.numeroVerificacion" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Fecha de Verificaci&oacute;n
                        </label>
                        <input type="text" class="datepicker datepickerNormal form-control form-control-sm"
                            placeholder="dd/mm/aaaa" ng-model="vehiculo.detalle.fechaVerificacion" readonly
                            id="fechaVerificacion" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Clave Pensi&oacute;n </label>
                        <input type="text" class="form-control form-control-sm" id="clavePension"  maxlength="25"
                            ng-model="vehiculo.detalle.clavePension" capitalize autocomplete="off" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>N&uacute;m. Tarjeta Gasolina
                        </label>
                        <input type="text" class="form-control form-control-sm" id="numTarjetaG"  maxlength="25"
                            ng-model="vehiculo.detalle.tarjetaGasolina" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label>Clave GPS </label>
                        <input type="text" class="form-control form-control-sm" id="gps"  maxlength="25"
                            ng-model="vehiculo.detalle.claveGps" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Motor </label>
                        <input type="text" class="form-control form-control-sm" id="numMotor"  maxlength="25"
                            ng-model="vehiculo.detalle.numeroMotor" capitalize autocomplete="off" />
                    </div>
                    <div class="col-3 form-group">
                        <label>N&uacute;m. de Chasis </label>
                        <input type="text" class="form-control form-control-sm" id="numChasis"  maxlength="25"
                            ng-model="vehiculo.detalle.numeroChasis" capitalize autocomplete="off" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-3 form-group">
                        <label>Engomado </label>
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
                        <label>Holograma </label>
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
                    <div class="col-3 form-group" ng-if="isEdit">
                        <label>Estatus </label>
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
                            ng-model="vehiculo.detalle.comentarios"></textarea>
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
                    <div class="col-3 form-group">
                        <label>Foto Placa </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="filePlaca" ng-model="filePlaca"
                                ng-on-change="subirArchivo($event, 'fotoPlaca')" accept="image/*" />
                            <label class="custom-file-label" for="filePlaca" id="fotoPlaca">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="vehiculo.urlFotoPlaca || filePlaca" style="text-align: center; margin-top: 20px;">
                            <img alt="Placa" src="" class="imgResumen" id="placaImagenTab"
                                onclick="showImgResumen(this)" />
                        </div>
                        <div ng-if="filePlaca.nombre" class="file-delete" style="text-align: center;">
                            <span class="text-img">{{filePlaca.nombre}} </span><i class="fa fa-trash"
                                onclick="deleteFile('fotoPlaca')"></i>
                        </div>
                    </div>
                    <div class="col-3 form-group">
                        <label>Foto de Veh&iacute;culo </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileFoto" accept="image/*"
                                ng-model="fileFoto" ng-on-change="subirArchivo($event, 'fotoVehiculo')" />
                            <label class="custom-file-label" for="fileFoto" id="fotoVehiculo">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="vehiculo.urlFotoVehiculo || fileVehiculo"
                            style="text-align: center; margin-top: 20px;">
                            <img alt="Vehiculo" src="" class="imgResumen" id="vehiculoImagenTab"
                                onclick="showImgResumen(this)" />
                        </div>
                        <div ng-if="fileVehiculo.nombre" class="file-delete" style="text-align: center;">
                            <span class="text-img">{{fileVehiculo.nombre}} </span><i class="fa fa-trash"
                                onclick="deleteFile('fotoVehiculo')"></i>
                        </div>
                    </div>
                    <div class="col-3 form-group">
                        <label>Tarjeta Circulaci&oacute;n
                        </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileTarjeta" accept="image/*"
                                ng-on-change="subirArchivo($event, 'fotoTarjetaCirculaion')" ng-model="fileTarjeta" />
                            <label class="custom-file-label" for="fileTarjeta" id="fotoTarjetaCirculaion">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="vehiculo.detalle.urlFotoTarjetaCirculacion  || fileCirculacion"
                            style="text-align: center; margin-top: 20px;">
                            <img alt="Tarjeta Circulacion" src="" id="circulacionImagenTab"
                                onclick="showImgResumen(this)" class="imgResumen" />
                        </div>
                        <div ng-if="fileCirculacion.nombre" class="file-delete" style="text-align: center;">
                            <span class="text-img">{{fileCirculacion.nombre}} </span><i class="fa fa-trash"
                                onclick="deleteFile('fotoTarjetaCirculaion')"></i>
                        </div>
                    </div>

                    <div class="col-3 form-group">
                        <label>Tarjeta Gasolina </label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="fileTarjetaGas" accept="image/*"
                                ng-on-change="subirArchivo($event, 'fotoTarjetaGasolina')" ng-model="fileTarjetaGas" />
                            <label class="custom-file-label" for="fileTarjetaGas" id="fotoTarjetaGasolina">Cargar
                                Imagen</label>
                        </div>
                        <div ng-if="vehiculo.detalle.urlFotoTarjetaGasolina || fileGasolina"
                            style="text-align: center; margin-top: 20px;">
                            <img alt="Tarjeta Gasolina" src="" id="gasolinaImagenTab" onclick="showImgResumen(this)"
                                class="imgResumen" />
                        </div>
                        <div ng-if="fileGasolina.nombre" class="file-delete" style="text-align: center;">
                            <span class="text-img">{{fileGasolina.nombre}} </span><i class="fa fa-trash"
                                onclick="deleteFile('fotoTarjetaGasolina')"></i>
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
                        <td class="tableTextTitle">* N&uacute;mero de serie: </td>
                        <td class="tableText">{{vehiculo.numeroSerie ? vehiculo.numeroSerie : 'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Tipo Veh&iacute;culo: </td>
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
                </table>
                <table class="resumeTable">
                    <tr>
                        <td class="tableTextTitle">* Aseguradora: </td>
                        <td class="tableText">{{vehiculoText.aseguradoraText ? vehiculoText.aseguradoraText :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* N&uacute;mero de poliza: </td>
                        <td class="tableText">{{vehiculo.detalle.numeroPoliza ? vehiculo.detalle.numeroPoliza :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Fecha vencimiento poliza: </td>
                        <td class="tableText">{{vehiculoText.fechaVencimientoPoliza ?
                            vehiculoText.fechaVencimientoPoliza :
                            'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* N&uacute;m. Tarjeta de circulaci&oacute;n: </td>
                        <td class="tableText">{{vehiculo.detalle.tarjetaCirculacion ?
                            vehiculo.detalle.tarjetaCirculacion : 'Sin asignar'}}</td>
                        <td class="tableTextTitle">* Vencimiento tarjeta circulaci&oacute;n: </td>
                        <td class="tableText">{{vehiculoText.fechaVencimientoTarjeta ?
                            vehiculoText.fechaVencimientoTarjeta :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* N&uacute;mero de verificaci&oacute;n: </td>
                        <td class="tableText">{{vehiculo.detalle.numeroVerificacion ?
                            vehiculo.detalle.numeroVerificacion : 'Sin asignar'}}</td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Fecha de verificaci&oacute;n: </td>
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
                        <td class="tableTextTitle">* N&uacute;m motor: </td>
                        <td class="tableText">{{vehiculo.detalle.numeroMotor ? vehiculo.detalle.numeroMotor :
                            'Sin asignar'}}</td>
                        <td class="tableTextTitle">* N&uacute;m chasis: </td>
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
                        <td class="tableText" ng-if="vehiculo.estatus">{{vehiculo.estatus ? vehiculo.estatus : 'BAJA'}}
                        </td>
                    </tr>
                    <tr>
                        <td class="tableTextTitle">* Comentarios: </td>
                        <td class="tableText" colspan="5">{{vehiculo.detalle.comentarios ? vehiculo.detalle.comentarios
                            : 'Sin asignar'}}</td>
                    </tr>
                </table>
                <div class="row imagenes">
                    <div class="col-2" ng-if="vehiculo.urlFotoPlaca || filePlaca">
                        <p class="tableTextTitle">* Foto placa</p>
                        <img alt="Placa" src="" class="imgResumen" id="placaImagen" onclick="showImgResumen(this)" />
                    </div>
                    <div class="col-2" ng-if="vehiculo.urlFotoVehiculo || fileVehiculo">
                        <p class="tableTextTitle">* Foto veh&iacute;culo</p>
                        <img alt="Vehiculo" src="" class="imgResumen" id="vehiculoImagen"
                            onclick="showImgResumen(this)" />
                    </div>
                    <div class="col-2" ng-if="vehiculo.detalle.urlFotoTarjetaCirculacion  || fileCirculacion">
                        <p class="tableTextTitle">* Foto tarjeta circulaci&oacute;n</p>
                        <img alt="Tarjeta Circulacion" src="" id="circulacionImagen" onclick="showImgResumen(this)"
                            class="imgResumen" />
                    </div>
                    <div class="col-2" ng-if="vehiculo.detalle.urlFotoTarjetaGasolina || fileGasolina">
                        <p class="tableTextTitle">* Foto tarjeta gasolina</p>
                        <img alt="Tarjeta Gasolina" src="" id="gasolinaImagen" onclick="showImgResumen(this)"
                            class="imgResumen" />
                    </div>
                </div>
                <h5 class="fs-title" style="margin-top: 1em;"> <i class="fas fa-exclamation-circle me-2"
                        style="color: orange;"></i>
                    Verifica la
                    informaci&oacute;n antes de guardar</h5>
            </div>
            <div style="text-align: right; margin: 1em 0 0 0;">
                <input type="button" class="btn btn-primary btnTotal" value="Guardar" onclick="guardarVehiculo()" />
            </div>
        </div>
    </div>
</div>