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
                        <div class="col-6">
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Marca</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.marca"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Modelo</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.modelo"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Color</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.color"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Holograma</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.detalle.holograma"></span> </div>
                            </div>     
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Placa</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.placa"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Engomado</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo" ng-bind="vehiculoOperario.detalle.engomado"></span> </div>
                            </div>  
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">N&uacute;mero de serie</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.numeroSerie"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Tipo</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.tipo"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Tipo combustible</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.combustible"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Tarjeta de circulaci&oacute;n</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.tarjetaCirculacion"></span> </div>
                            </div>                   
                        </div>
                        <div class="col-6">
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Clave GPS</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.claveGps"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Tarjeta gasolina</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.tarjetaGasolina"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">N&uacute;mero poliza</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.numeroPoliza"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">N&uacute;mero chasis</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.numeroChasis"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">N&uacute;mero motor</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.numeroMotor"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Fecha verificaci&oacute;n</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.fechaVerificacion"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Fecha vencimiento tarjeta</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.fechaVencimientoTarjeta"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">N&uacute;mero chasis GPS</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.numeroChasis"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">N&uacute;mero verificaci&oacute;n</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.numeroVerificacion"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Rotulado</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.rotulado?'Si': 'No'"></span> </div>
                            </div>
                            <div class="container-fluid vehiculo-content">
                                <div class="container-text-title"><span class="text-tile-vehiculo">Comentarios</span></div>
                                <div class="container-text-content"><span class="text-content-vehiculo"  ng-bind="vehiculoOperario.detalle.comentarios"></span> </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-6">
                            <div class="container-imagen-vehiculo">
                                <h5 class="title-imgen-vehiculo">Placa</h5>
                                <img src="{{vehiculoOperario.urlFotoPlaca}}" class="img-fluid shadow-2-strong" alt=""/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="container-imagen-vehiculo">
                                <h5 class="title-imgen-vehiculo">Veh&iacute;culo</h5>
                                <img src="{{vehiculoOperario.urlFotoVehiculo}}" class="img-fluid shadow-2-strong" alt=""/>
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