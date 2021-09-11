<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalOtIntervenciones">
    <div class="modal-dialog content-ot-interveciones-cantidad">
        <div class="modal-content" id="content-cantidad">
            <!--div class="modal-header">
                <h5 class="modal-title">Intervenciones</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div-->
            <div class="modal-body" >
                
                <div class="row" style="padding: 0;">
                    <h5 class="modal-title style_modal_title">INTERVENCION</h5>
                    <div class="col-12 container_table_int ">
                        <table class="table table-hover" cellspacing="0" id="tableOtIntervencion" style="width: 100% !important;">
                            <thead id="head_table_ot_intervencion">
                                <tr>
                                    <th>CANTIDAD</th> 
                                    <th>DESCRIPCI&Oacute;N</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyIntervencion">
                                <tr ng-repeat="item in intervencionesConteo" class="title-table-ot-intervencion">
                                    <td>{{item.cantidad}}</td>
                                    <td>{{item.nombre}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           <!--  <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">Cerrar</button>
            </div> -->
        </div>
    </div>
</div>