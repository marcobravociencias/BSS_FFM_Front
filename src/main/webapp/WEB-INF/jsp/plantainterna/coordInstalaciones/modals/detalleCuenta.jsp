<div class="modal fade bd-example-modal-lg" tabindex="-1" aria-hidden="true" id="detalleCuenta">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header" >
                <div id="headerDt"></div>
				<button
                type="button"
                class="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
                ></button>
			</div>
            <div class="modal-body" style="padding-right:15px;padding-left:0px; max-height: 300px; overflow: auto;">
                <div class="row">
                    <div style="padding-left: 0;" class="col-3" id="navbar_info">
                        <ul class="list-group">
							<li id="info-ot-bandeja" style="display: none;" class="list-group-item efecto itemGeneral active" data-toggle="tab" href="#content-info-ot" >Informaci&oacute;n de la OT</li>
							<li id="historico-bandeja" style="display: none;"  class="list-group-item efecto itemGeneral" data-toggle="tab" href="#content-historico" >Historico</li>
							<li id="detallado-cuenta" class="list-group-item efecto itemGeneral active" data-toggle="tab" href="#content-infocuenta" >Detalle de la cuenta</li>
							<li id="sitio-instalacion" class="list-group-item efecto itemGeneral" data-toggle="tab" href="#content-sitio-instalacion"  >Sitio de Instalaci&oacute;n</li>                    
							<li id="nota-general" class="list-group-item efecto itemGeneral"  data-toggle="tab" href="#content-nota-tintoreria"  >Nota general</li>						     
							<li id="servicios-cuenta" class="list-group-item efecto itemGeneral" data-toggle="tab" href="#content-servicios"  >Servicios</li>
                            <li id="productos-cuenta" class="list-group-item efecto itemGeneral" data-toggle="tab" href="#content-productos"  >Productos</li>
							<li id="promociones-cuenta" class="list-group-item efecto itemGeneral" data-toggle="tab" href="#content-promociones"  >Promociones</li>
						</ul>
                    </div>
                    <div class="col-md-9" id="container-detalle">                    
                        
                    </div>
                    <div class="col-md-9" id="container-sitio" style="display:none">                    
                        
                    </div>
                    <div class="col-md-9" id="container-info" style="display:none">                    
                        <jsp:include page="./infoOts.jsp"></jsp:include>
                    </div>
                    <div class="col-md-9" id="container-historico" style="display:none">                    
                        <jsp:include page="./historico.jsp"></jsp:include>
                    </div>
                    <div class="col-md-9" id="container-nota-general" style="display:none">                    
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6">
                                    <div class="container-text-title-detalle">
                                        <span class="text-tile-vehiculo">Cuenta factura: </span>
                                    </div>
                                    <div class="container-text-content-detalle">
                                        <span class="text-content-vehiculo" ng-bind="infoDetalleCuenta.Num_cuenta_factura"></span>
                                    </div>

                                    <div class="container-text-title-detalle">
                                        <span class="text-tile-vehiculo">Folio cotsitio plan: </span>
                                    </div>
                                    <div class="container-text-content-detalle">
                                        <span class="text-content-vehiculo" ng-bind="infoDetalleCuenta.CotSitio"></span>
                                    </div>

                                    <div class="container-text-title-detalle">
                                        <span class="text-tile-vehiculo">Monto primer pago: </span>
                                    </div>
                                    <div class="container-text-content-detalle">
                                        <span class="text-content-vehiculo">SIN INFO</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="container-text-title-detalle">
                                        <span class="text-tile-vehiculo">Nombre plan: </span>
                                    </div>
                                    <div class="container-text-content-detalle">
                                        <span class="text-content-vehiculo" ng-bind="infoDetalleCuenta.Tiplo_Plan"></span>
                                    </div>

                                    <div class="container-text-title-detalle">
                                        <span class="text-tile-vehiculo">Num dns: </span>
                                    </div>
                                    <div class="container-text-content-detalle">
                                        <span class="text-content-vehiculo">SIN INFO</span>
                                    </div>

                                    <div class="container-text-title-detalle">
                                        <span class="text-tile-vehiculo">Medio de acceso: </span>
                                    </div>
                                    <div class="container-text-content-detalle">
                                        <span class="text-content-vehiculo">SIN INFO</span>
                                    </div>
                                    
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                    <div class="col-md-7">
                                        <jsp:include page="./servicios.jsp"></jsp:include>
                                        <jsp:include page="./productos.jsp"></jsp:include>
                                        <jsp:include page="./promociones.jsp"></jsp:include>
                                    </div>
                                    <div class="col-md-3">
                                        <h5 style="color:#767676; font-size: 1em;font-weight: bold;" class="">Equipos y modelos</h5>	
                                    </div>
                                </div>
                                
                            
                        </div>
                    </div>
                    <div class="col-md-9" id="container-servicios-cuenta" style="display:none">                    
                        <jsp:include page="./servicios.jsp"></jsp:include>
                    </div>
                    <div class="col-md-9" id="container-productos-cuenta" style="display:none">                    
                        <jsp:include page="./productos.jsp"></jsp:include>
                    </div>
                    <div class="col-md-9" id="container-promociones-cuenta" style="display:none">                    
                        <jsp:include page="./promociones.jsp"></jsp:include>
                    </div>
                </div>
				
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary" data-mdb-dismiss="modal">
                    Cerrar
                </button>
              </div>
        </div>
    </div>
</div>