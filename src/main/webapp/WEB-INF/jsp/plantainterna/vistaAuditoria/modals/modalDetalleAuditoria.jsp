<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalDetalleAuditoria" aria-hidden="true" id="modalDetalleAuditoria">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header header-sin-border">
                <h5 class="modal-title header-title-tec" style="color: #7716fa">Detalle de Auditor&iacute;a</h5>
                <button type="button" class="close" data-mdb-dismiss="modal" aria-label="Close" id="closeModalTecnico">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-4">
                                <span class="span-pregunta-detalle">T&eacute;cnico instalador</span>
                                <span class="span-answer-modal">{{auditoriaDetalle.tecnico}}</span>
                            </div>
                            <div class="col-3">
                                <span class="span-pregunta-detalle">Estatus de auditoria</span>
                                <span class="span-answer-modal">{{auditoriaDetalle.estatus}}</span>
                            </div>
                            <div class="col-2">
                                <span class="span-pregunta-detalle">Folio</span>
                                <span class="span-answer-modal" style="color: #7716fa;">{{auditoriaDetalle.folio}}</span>
                            </div>
                            <div class="col-3">
                                <span class="span-pregunta-detalle">Fecha y Hora</span>
                                <span class="span-answer-modal">{{auditoriaDetalle.fecha}}</span>
                            </div>
                        </div>
                    </div>
                    <br>
                    <span class="span-titulo" id="myModalLabel">Puntos de control</span>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <div class="span-pregunta-detalle col-4 offset-8 text-center">
                                    Aprobaci&oacute;n
                                </div>
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">1. Vestido de poste</span>
                                    <div class="row" ng-repeat="pr1 in listPreguntas1" ng-class="{'style-column': pr1.sombra}">
                                        <div class="col-8">
                                            <span class="span-answer-modal">{{pr1.descripcion}}</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr1.aprobacion == 'Bien' || pr1.aprobacion == 'Si'">
                                            <i class="fa fa-check" style="color: #25DB27;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr1.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr1.aprobacion == 'Mal' || pr1.aprobacion == 'No'">
                                            <i class="fa fa-times" style="color: #DB1B1B;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr1.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="span-pregunta-detalle col-4 offset-8 text-center">
                                    Aprobaci&oacute;n
                                </div>
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">5. Roseta Empresarial</span>
                                    <div class="row" ng-repeat="pr5 in listPreguntas5" ng-class="{'style-column': pr5.sombra}">
                                        <div class="col-8">
                                            <span class="span-answer-modal">{{pr5.descripcion}}</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr5.aprobacion == 'Bien' || pr5.aprobacion == 'Si'">
                                            <i class="fa fa-check" style="color: #25DB27;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr5.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr5.aprobacion == 'Mal' || pr5.aprobacion == 'No'">
                                            <i class="fa fa-times" style="color: #DB1B1B;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr5.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                    </div> 
                                </div> 
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">2. Trabajos en Cierre de 2do Nivel</span>
                                    <div class="row" ng-repeat="pr2 in listPreguntas2" ng-class="{'style-column': pr2.sombra}">
                                        <div class="col-8">
                                            <span class="span-answer-modal">{{pr2.descripcion}}</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr2.aprobacion == 'Bien' || pr2.aprobacion == 'Si'">
                                            <i class="fa fa-check" style="color: #25DB27;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr2.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr2.aprobacion == 'Mal' || pr2.aprobacion == 'No'">
                                            <i class="fa fa-times" style="color: #DB1B1B;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr2.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                    </div> 
                                </div> 
                            </div>
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">6. Armado de Conectores</span>
                                    <div class="row" ng-repeat="pr6 in listPreguntas6" ng-class="{'style-column': pr6.sombra}">
                                        <div class="col-8">
                                            <span class="span-answer-modal">{{pr6.descripcion}}</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr6.aprobacion == 'Bien' || pr6.aprobacion == 'Si'">
                                            <i class="fa fa-check" style="color: #25DB27;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr6.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr6.aprobacion == 'Mal' || pr6.aprobacion == 'No'">
                                            <i class="fa fa-times" style="color: #DB1B1B;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr6.evidencia == 'SI'">Ver evidencia</span>
                                        </div>                             
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">3. Trayectoria/ tendido de acometida</span>
                                    <div class="row" ng-repeat="pr3 in listPreguntas3" ng-class="{'style-column': pr3.sombra}">
                                        <div class="col-8">
                                            <span class="span-answer-modal">{{pr3.descripcion}}</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr3.aprobacion == 'Bien' || pr3.aprobacion == 'Si'">
                                            <i class="fa fa-check" style="color: #25DB27;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr3.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr3.aprobacion == 'Mal' || pr3.aprobacion == 'No'">
                                            <i class="fa fa-times" style="color: #DB1B1B;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr3.evidencia == 'SI'">Ver evidencia</span>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">7. Soporte</span>
                                    <div class="row" ng-repeat="pr7 in listPreguntas7" ng-class="{'style-column': pr7.sombra}">
                                        <div class="col-8">
                                            <span class="span-answer-modal">{{pr7.descripcion}}</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr7.aprobacion == 'Bien' || pr7.aprobacion == 'Si'">
                                            <i class="fa fa-check" style="color: #25DB27;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr7.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr7.aprobacion == 'Mal' || pr7.aprobacion == 'No'">
                                            <i class="fa fa-times" style="color: #DB1B1B;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr7.evidencia == 'SI'">Ver evidencia</span>
                                        </div> 
                                    </div> 
                                </div> 
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">4. Ingreso de Acometida a Domicilio</span>
                                    <div class="row" ng-repeat="pr4 in listPreguntas4" ng-class="{'style-column': pr4.sombra}">
                                        <div class="col-8">
                                            <span class="span-answer-modal">{{pr4.descripcion}}</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr4.aprobacion == 'Bien' || pr4.aprobacion == 'Si'">
                                            <i class="fa fa-check" style="color: #25DB27;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr4.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr4.aprobacion == 'Mal' || pr4.aprobacion == 'No'">
                                            <i class="fa fa-times" style="color: #DB1B1B;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr4.evidencia == 'SI'">Ver evidencia</span>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">8. Soporte</span>
                                    <div class="row" ng-repeat="pr8 in listPreguntas8" ng-class="{'style-column': pr8.sombra}">
                                        <div class="col-8">
                                            <span class="span-answer-modal">{{pr8.descripcion}}</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr8.aprobacion == 'Bien' || pr8.aprobacion == 'Si'">
                                            <i class="fa fa-check" style="color: #25DB27;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr8.evidencia == 'SI'">Ver evidencia</span>
                                        </div>
                                        <div class="col-4 text-center" ng-if="pr8.aprobacion == 'Mal' || pr8.aprobacion == 'No'">
                                            <i class="fa fa-times" style="color: #DB1B1B;"></i>&nbsp;
                                            <span class="span-evidencia" ng-click="" ng-show="pr8.evidencia == 'SI'">Ver evidencia</span>
                                        </div>                                   
                                    </div> 
                                </div> 
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">9. Presentaci&oacute;n con cliente</span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">10. Calificaci&oacute;n de satisfacci&oacute;n del cliente del 1 al 5</span>
                                    <div class="col-12">
                                    <div class="row" ng-repeat="cal in listCalificacion">
                                        <div class="col-1 calificacion" ng-class="{'active-calificacion': cal.calificacion == '1'}">
                                            1
                                        </div>
                                        <div class="col-1 calificacion" ng-class="{'active-calificacion': cal.calificacion == '2'}">
                                            2
                                        </div>
                                        <div class="col-1 calificacion" ng-class="{'active-calificacion': cal.calificacion == '3'}">
                                            3
                                        </div>
                                        <div class="col-1 calificacion" ng-class="{'active-calificacion': cal.calificacion == '4'}">
                                            4
                                        </div>
                                        <div class="col-1 calificacion" ng-class="{'active-calificacion': cal.calificacion == '5'}">
                                            5
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">Inventarios de kit de precisi&oacute;n</span>
                                    <div class="offset-7 col-5">
                                        <span class="span-title-modal">Condiciones</span>
                                    </div>
                                    <table style="width: 100%;">
                                        <tr>
                                            <th></th>
                                            <th class="text-center border-table-modal">Cantidad</th>
                                            <th class="text-center border-table-modal">Buena</th>
                                            <th class="text-center border-table-modal">Desgastada</th>
                                            <th class="text-center">Da&ntilde;ada</th>
                                            <th></th>
                                        </tr>
                                        <tr ng-repeat="item in listPreguntas11" ng-class="{'style-column': item.sombra}">
                                            <td class="span-answer-modal">{{item.descripcion}}</td>
                                            <td class="text-center border-table-modal">{{item.cantidad}}</td>
                                            <td class="text-center border-table-modal"><i class="fa fa-times" style="color: #DB1B1B;" ng-if="item.condicion == 'Buena'"></i></td>
                                            <td class="text-center border-table-modal"><i class="fa fa-times" style="color: #DB1B1B;" ng-if="item.condicion == 'Desgastada'"></i></td>
                                            <td class="text-center">
                                                <i class="fa fa-times" style="color: #DB1B1B;" ng-if="item.condicion != 'Buena' && item.condicion != 'Desgastada'">
                                            </td>
                                            <td></i>&nbsp;<span class="span-evidencia" ng-click="consultarEvidenciaImagenes(item)" ng-show="item.evidencia == 'SI'">Ver evidencia</span></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="col-12">
                                    <span class="span-pregunta-detalle">Herramienta b&aacute;sica y equipo de seguridad</span>
                                    <div class="offset-7 col-5">
                                        <span class="span-title-modal">Condiciones</span>
                                    </div>
                                    <table style="width: 100%;">
                                        <tr>
                                            <th></th>
                                            <th class="text-center border-table-modal">Cantidad</th>
                                            <th class="text-center border-table-modal">Buena</th>
                                            <th class="text-center border-table-modal">Desgastada</th>
                                            <th class="text-center">Da&ntilde;ada</th>
                                            <th></th>
                                        </tr>
                                        <tr ng-repeat="item in listPreguntas10" ng-class="{'style-column': item.sombra}">
                                            <td class="span-answer-modal">{{item.descripcion}}</td>
                                            <td class="text-center border-table-modal">{{item.cantidad}}</td>
                                            <td class="text-center border-table-modal"><i class="fa fa-times" style="color: #DB1B1B;" ng-if="item.condicion == 'Buena'"></i></td>
                                            <td class="text-center border-table-modal"><i class="fa fa-times" style="color: #DB1B1B;" ng-if="item.condicion == 'Desgastada'"></i></td>
                                            <td class="text-center">
                                                <i class="fa fa-times" style="color: #DB1B1B;" ng-if="item.condicion != 'Buena' && item.condicion != 'Desgastada'">
                                            </td>
                                            <td></i>&nbsp;<span class="span-evidencia" ng-click="consultarEvidenciaImagenes(item)" ng-show="item.evidencia == 'SI'">Ver evidencia</span></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-tecnico-ticket">
                <button type="button" class="btn btn-cerrar-modal" data-mdb-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>