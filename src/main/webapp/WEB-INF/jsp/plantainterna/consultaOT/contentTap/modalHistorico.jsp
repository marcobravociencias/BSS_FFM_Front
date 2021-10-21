<div class="modal-body">
	<div ng-if="!movimientos.length" style="text-align: center; margin-top: 2em;">
		<span style="font-size: 12px !important;color:grey; font-weight: lighter;" class="timeline__day">
			<span class="timeline__month">
				<i class="fa fa-exclamation-circle warning-nodata"></i>
			</span>
			NO SE ENCONTRARON DATOS
		</span>
	</div>
	<div class="row content-historico-ot"  style="height: 300px; max-height: 300px; overflow: auto;">
		<div class="row" ng-repeat="elementHistorico in movimientos" style="height: fit-content;">
			<div class="col-2 line-time-new">
				<div style="background-color:white;" class="timeline__date">
					<span style="font-size: 15px !important;color:grey;" class="timeline__day">OT</span>
					<span style="font-size: 12px !important;" class="timeline__month">
						<i ng-if="elementHistorico.idEstatusOrden==1" class="pendiente-historico  fas fa-pause circle-statushistorico-histo"></i>
						<i ng-if="elementHistorico.idEstatusOrden==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico-histo"></i>
						<i ng-if="elementHistorico.idEstatusOrden==3" class="detencion-historico far fa-hand-paper circle-statushistorico-histo"></i>
						<i ng-if="elementHistorico.idEstatusOrden==4" class="terminar-historico fas fa-check circle-statushistorico-histo"></i>
						<i ng-if="elementHistorico.idEstatusOrden==5" class="cancelado-historico fas fa-times circle-statushistorico-histo"></i> 
					</span>
				</div>
			</div>

			<div id="content-historial-{{$index}}"  class="col-10" style="display: grid;">
				<div  class="card-historico card text-center historico-alertas-div">
					<div class="card-body">
						<i ng-if="elementHistorico.idEstatusOrden==1" class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
						<i ng-if="elementHistorico.idEstatusOrden==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
						<i ng-if="elementHistorico.idEstatusOrden==3" class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
						<i ng-if="elementHistorico.idEstatusOrden==4" class="terminar-historico fas fa-check circle-statushistorico"></i>
						<i ng-if="elementHistorico.idEstatusOrden==5" class="cancelado-historico fas fa-times circle-statushistorico"></i> 
					   
						<div class="container-deschistorico">
							<span class="titlehistorico">Estatus:</span>
							<span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstatusOrden || 'SIN DATO'"></span>
						</div>
						<div class="container-deschistorico">
							<span class="titlehistorico">Estado:</span>
							<span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstadoOrden || 'SIN DATO'"></span>
						</div>
						<div class="container-deschistorico">
							<span class="titlehistorico">Motivo:</span>
							<span class="content-titlehistorico" ng-bind="elementHistorico.descripcionMotivoOrden  || 'SIN DATO'"></span>
						</div>
						<div class="container-deschistorico">
							<span class="titlehistorico">Despacho:</span>
							<span class="content-titlehistorico" ng-bind="elementHistorico.nombreUsuarioDespacho || 'SIN DATO'"></span>
							<p class="footer-card-historico-alerta" ng-bind="elementHistorico.fecha+' '+elementHistorico.hora" ></p>
						</div>
					</div>
					<div class="card-footer text-muted">
						<div class="container-deschistorico">
							<span class="titlehistorico">Usuario:</span>
							<span class="content-titlehistorico" ng-bind="elementHistorico.nombreUsuario  || 'SIN DATO'"></span>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>