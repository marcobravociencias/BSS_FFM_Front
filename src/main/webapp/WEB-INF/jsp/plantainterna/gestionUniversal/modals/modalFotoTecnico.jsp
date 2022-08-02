<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalFotoTecnico">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body" style="padding: 0;">
                <div class="row">
                    <img src="" id="img_tec" width="300" height="300" style="object-fit: cover; border-radius: 15px 15px 0px 0px;" />
                </div>
                <div class="container">
                    <div class="row container-card" style="color: black; font-weight: bolder;">
                        <span ng-bind="usuarioFoto.nombreCompleto"></span>
                    </div>
                    <div class="row container-card">
                        <span><strong>N&Uacute;M. EMPLEADO:</strong>{{usuarioFoto.noEmpleado}}</span>
                    </div>
                    <div class="row container-card">
                        <span><strong>USUARIO:</strong>{{usuarioFoto.usuario}}</span>
                    </div>
                    <hr style="margin: 0.5em auto;" />
                    <div class="row container-card" style="font-weight: lighter;">
                        <div class="col-12" style="text-align: end; margin: .5em auto;">
                            <span>{{usuarioFoto.puesto ? usuarioFoto.puesto : 'Sin puesto'}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>