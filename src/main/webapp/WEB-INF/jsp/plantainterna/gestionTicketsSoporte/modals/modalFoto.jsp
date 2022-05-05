<div class="modal fade" tabindex="-1" style="z-index: 9999;background-color: rgba(0, 0, 0, 0.4);" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalFoto">
    <div class="modal-dialog modal-sm" style="margin-top: 5%;">
        <div class="modal-content">
            <div class="modal-body" style="padding: 0;">
                <div class="row">
                    <img src="" id="img_tec" width="300" height="300" style="object-fit: cover; border-radius: 15px 15px 0px 0px;" />
                </div>
                <div class="container" style="font-size: 0.8em; padding: 0.5em;">
                    <div class="row container-card" style="color: black; font-weight: bolder;">
                        <span ng-bind="usuarioFoto.nombreCompleto"></span>
                    </div>
                    <div class="row container-card">
                        <span><strong>N&Uacute;M. EMPLEADO:</strong>{{usuarioFoto.noEmpleado ? usuarioFoto.noEmpleado : 'Sin informaci&oacute;n'}}</span>
                    </div>
                    <div class="row container-card">
                        <span><strong>USUARIO:</strong>{{usuarioFoto.usuario ? usuarioFoto.usuario : 'Sin informaci&oacute;n'}}</span>
                    </div>
                    <hr style="margin: 0.5em auto;" />
                    <div class="row container-card" style="font-weight: lighter;">
                        <div class="col-12" style="text-align: end; margin: .5em auto;">
                            <span>{{usuarioFoto.tipo}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>