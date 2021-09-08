<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div id="modal-evidencia-busqueda" class="modal fade bd-example-modal-lg">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="width: 930px;">
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-3">
                            <div class="funkyradio" id="contentRadio">
                                <div class="col-md-8 funkyradio-success" style="width: 120px; top: -26px;">
                                    <input type="radio" name="radio" id="radioAceptar" onclick="validarEvidnecia('',1)"/>
                                    <label for="radioAceptar">Aceptar Todas</label>
                                </div>
                                <div class="col-md-8 funkyradio-danger" style="position: absolute; left: 145px;width: 125px; top: -26px;">
                                    <input type="radio" name="radio" id="radioRechazar"onclick="validarEvidnecia('',0)"/>
                                    <label for="radioRechazar">Rechazar Todas</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-9">
                            <div class="col-3 columTotal">
                                <strong>Total evidencia: </strong> <Label id="evidenciaTotal">0</Label>
                            </div>
                            <div class="col-3 columAceptadas"> 
                                <strong>Aceptadas: </strong><Label id="evidenciaAcaptadas"> 0</Label>
                            </div>
                            <div class="col-3 columRechazadas">
                                <strong>Rechazadas: </strong><Label id="evidenciaRechazada"> 0</Label>
                            </div>
                            <div class="col-3 columBtnDescarga">
                                <a id="descargarEvidencia" class="btn btnDescargarActa">Descargar carta aceptaci&oacute;n</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="panel panel-default" style="margin-left: 10px;margin-right: 10px;">
                        <div class="panel-body" style="height: 465px; overflow-y: scroll; overflow-x: hidden;">
                            <div style="margin-bottom: 1em;overflow-x: hidden;overflow-y: hidden;" id="contentEvidencia" class="row justify-content-center">               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="guardarValidacionCheck" class="btn btnGuardarValidacion" ng-click="gardarValidacion()">Guardar</button>
                    <button id="cerrarModalValidacion" class="btn btnGuardarValidacion" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>