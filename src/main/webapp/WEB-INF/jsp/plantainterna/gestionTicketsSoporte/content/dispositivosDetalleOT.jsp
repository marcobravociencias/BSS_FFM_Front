<div ng-show="!isDispositivosDetalleOT" style="text-align: center; margin-top: 2em;">
    <span style="font-size: 12px !important;color:grey; font-weight: lighter;">
        <span>
            <i class="fa fa-exclamation-circle warning-nodata"></i>
        </span>
        NO SE ENCONTRARON DATOS
    </span>
</div>
<div ng-show="isDispositivosDetalleOT" class="row">
    <table id="tableDispositivosDetalleOT" class="display table table-hover" cellspacing="0" width="100%">
        <thead id="thead_dispositivo_consulta_ot">
            <tr>
                <th class="detail">
                    <div class="fht-cell" style="width: 20px;"></div>
                </th>
                <th>Dispositivo</th>
                <th>Modelo</th>
                <th>Serie</th>
                <th>Mac</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>