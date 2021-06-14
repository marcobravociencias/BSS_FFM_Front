<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalVehiculoOperario">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" >Veh&iacute;culo operario</h5>
                <button type="button" class="btn-close"  data-mdb-dismiss="modal" aria-label="Close" ></button>
            </div>
			<div class="modal-body">
				<div class="container">
                    <div class="row">
                        <div class="col-8">

                           

                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Marca</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.Desc_marca"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Fecha registro</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.Fecha_registro"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Holograma</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.Holograma"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Modelo</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.Modelo"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Num. empleado</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.Num_empleadoReg"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Placa</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.Placa"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Tipo</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.Desc_tipo"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Tipo combustible</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.Tipo_combustible"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Nombre usuario</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.Nombre_usuarioreg"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo"># Usuario</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.Num_empleadoReg"></span> </div>
                            </div>
                            
                   
                        </div>
                        <div class="col-4">
                            <div class="container-imagen-vehiculo">
                                <h5 class="title-imgen-vehiculo">Placa</h5>
                                <img src="https://mdbootstrap.com/img/new/standard/city/042.jpg" class="img-fluid shadow-2-strong" alt=""/>
                            </div>
                            <div class="container-imagen-vehiculo">
                                <h5 class="title-imgen-vehiculo">Veh&iacute;culo</h5>
                                <img src="https://mdbootstrap.com/img/new/standard/city/042.jpg" class="img-fluid shadow-2-strong" alt=""/>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn cerrar-modal-btn btn-ligh" data-mdb-dismiss="modal">
                    Cerrar
                </button>
           </div>
        </div>
    </div>
</div>