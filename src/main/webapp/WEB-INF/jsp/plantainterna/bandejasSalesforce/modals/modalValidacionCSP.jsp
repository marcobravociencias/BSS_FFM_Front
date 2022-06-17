<div class="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="modalValidacionCSP" aria-hidden="true" id="modalValidacionCSP">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Validaci&oacute;n CSP</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="col-12">
                    <table id="tableValidacionCSP" class="display table table-hover" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th style="text-align: center !important;">Estatus</th>
                                <th>Descripci&oacute;n</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="field in listFieldsValidacion">
                                <td>
                                    <div class="text-center">
                                        <i class="fas fa-times" style="color: red;"></i>
                                    </div>
                                </td>
                                <td ng-bind="field.info"></td>
                            </tr>
                        </tbody>
                    </table>
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