<div ng-show="!detallePagoObj.length" style="text-align: center; margin-top: 2em;">
    <span style="font-size: 12px !important;color:grey; font-weight: lighter;">
        <span>
            <i class="fa fa-exclamation-circle warning-nodata"></i>
        </span>
        NO SE ENCONTRARON DATOS
    </span>
</div>
<div ng-show="detallePagoObj.length" class="row">
    <div style="padding: 0" class="col-12">
        <div class="table-responsive">
            <div class="col-4" style="text-align: center;">
                <div ng-show="!detallePagoObj.isPagosPendientes" class="card-icon icon-primary estatus-container-pagos">
                    <i class="fas fa-check"></i> <span class="sin-pagos-pendientes">
                        Sin pagos pendientes
                    </span>
                </div>
                <div ng-show="detallePagoObj.isPagosPendientes" class="card-icon icon-primary estatus-container-pagos-pendiente">
                    <i class="fas fa-exclamation"></i> <span class="con-pagos-pendientes">
                        Con pagos pendientes
                    </span>
                </div>
            </div>
            <table id="tablePagosDetalleOT" class="display table" cellspacing="0" width="100%">
                <thead id="thead_pagos_ot">
                    <tr>
                        <th>Clave cliente</th>
                        <th>OT</th>
                        <th>Folio</th>
                        <th>Fecha registro</th>
                        <th>Fecha cierre OT</th>
                        <th>Intervenci&oacute;n</th>
                        <th>Sub-intervenci&oacute;n</th>
                        <th>Tiempo</th>
                        <th>Tipo pago</th>
                        <th>Monto</th>
                        <th>Estatus</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>