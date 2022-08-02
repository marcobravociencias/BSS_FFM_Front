<div class="modal fade bd-example-modal-lg" style="padding-top: 2em;" id="modal-material-ot" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
          <div class="blue-gradient style_modal_header modal-header modal_header_bg" style="color: #fff;">
                  <h5 class="modal-title" id="exampleModalLabel"> OT: <span class="idotm"></span> T&Eacute;CNICO: <span class="operariom"></span></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="cerrarModalMaterial()">
                      <span aria-hidden="true">&times;</span>
                  </button>
            </div>
            <div class="modal-body materiales">
              <table id="table" class="display table" cellspacing="0" width="100%">
              <thead id="thead_materiales">
                  <tr>
                      <th>DESCRIPCI&Oacute;N</th>
                      <th>SKU</th>
                      <th>CANTIDAD</th>
                      <th>UNIDAD DE MEDIDA</th>
                  </tr>
              </thead>
              <tbody id="contentmateriales"></tbody>
          </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-blue-grey btn_cerrar_modal " data-dismiss="modal" ng-click="cerrarModalMaterial()">Cerrar</button>
            </div>
      </div>
    </div>
  </div>