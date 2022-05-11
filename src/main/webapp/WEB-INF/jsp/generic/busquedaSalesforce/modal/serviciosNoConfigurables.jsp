<div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="modelNoConfigura" aria-hidden="true">
    <div class="modal-dialog modal-lg cascading-modal" style="min-width: 50% !important; max-width: 55% !important; margin-top: 5%;">
        <div class="modal-content" > 
            <div class="modal-header blue-gradient modal_header_bg" style="color: #fff;">
                <h5 style="font-weight: bold;margin: 0 auto;" class="modal-title header-title">No configurables</h5>
                <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 text-center">
                            <table id="table-resumen-serviciosnoconfig" class="table table-sm">
                                <thead>
                                    <tr>
                                        <th width="15%">Folio </th>
                                        <th width="40%">Servicio</th>
                                        <th width="30%">Etiqueta BRM</th>
                                        <th width="15%">Tipo</th>
                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="detail-trservicio" ng-if="!servicio.servicioConfigurable" ng-repeat="servicio in objetoCotizacion.CotPlanServicios track by $index">
                                  
                                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.CotSitioName}}</span></td>
                                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.CotPlanServicoNServicio}}</span></td>
                                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.DpPlanEtiquetaBRM}}</span></td>
                                        <td class="tr-servicio-ind"><span class="text-serviciotable">{{servicio.Tipo}}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
              
                </div>
            </div>
            <div class="modal-footer" style="display: flex !important;">                                
               
            </div>
        </div>
    </div>
</div>	