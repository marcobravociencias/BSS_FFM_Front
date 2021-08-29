<!-- Modal -->
<div class="modal fade top" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalIconografiaDespacho">
    <div class="modal-dialog modal-frame modal-top">
        <div class="modal-content">
            <div class="modal-header">           
                <div class="container">
                    <div class="row row-paleta-title">
                        <div class="col-6">
                            <h5 class="title-paleta-colores">OT STATUS</h5>
                        </div>
                        <div class="col-6">
                            <h5 class="title-paleta-colores">OPERARIO</h5>
                        </div>
                    </div> 
                </div>                        
                
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" >
                </button>
            </div>
			<div class="modal-body">           
                <div class="container">                                 
                    <div class="row">
                        <div class="col-3">
                            <div class="row">
                                <div class="col-12 col-croptext" ng-repeat="inter in listadoIconografia.estatusIntervencion" >
                                    <span  style="background-color:{{inter.hexaColor}};font-size:.5em;" class="color-badge-paleta badge badge-pill ">&nbsp;</span>
                                    <small title="{{inter.nombre}}" class="text-uppercase descript-paletacolor" style="font-size: .6em;" ng-bind="inter.nombre">  </small>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="row">
                                <div class="col-12 col-croptext" ng-repeat="inter in listadoIconografia.tipoIntervencion" >
                                    <span  style="background-color:{{inter.hexaColor}};font-size:.5em;" class="color-badge-paleta badge badge-pill ">&nbsp;</span>
                                    <small title="{{inter.nombre}}" class="text-uppercase descript-paletacolor" style="font-size: .6em;" ng-bind="inter.nombre">  </small>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="row">
                                <div class="col-12 col-croptext" ng-repeat="inter in listadoIconografia.OTs.Intervenciones.Color" >
                                    <span  style="background-color:{{inter.Value}};font-size:.5em;" class="color-badge-paleta badge badge-pill ">&nbsp;</span>
                                    <small title="{{inter.Descripcion}}" class="text-uppercase descript-paletacolor" style="font-size: .6em;" ng-bind="inter.Descripcion">  </small>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-6 col-croptext" ng-repeat="oper in listadoIconografia.estatusTecnico" >
                                    <span  style="background-color:{{oper.hexaColor}};font-size:.5em;" class="color-badge-paleta badge badge-pill ">&nbsp;</span>
                                    <small title="{{oper.nombre}}" class="text-uppercase descript-paletacolor" style="font-size: .6em;" ng-bind="oper.nombre">  </small>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
        </div>
    </div>
</div>