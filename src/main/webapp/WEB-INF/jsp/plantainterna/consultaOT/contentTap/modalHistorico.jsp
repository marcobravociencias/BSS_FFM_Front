<div class="modal-body" style="height: 300px; max-height: 300px; overflow: auto;">
	<div class="row content-historico-ot">
		<div class="row" ng-repeat="elementHistorico in movimientos">
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
			<div  class="card-historico card text-center">
				<div class="card-body">
					<i ng-if="elementHistorico.idEstatusOrden==1" class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
					<i ng-if="elementHistorico.idEstatusOrden==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
					<i ng-if="elementHistorico.idEstatusOrden==3" class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
					<i ng-if="elementHistorico.idEstatusOrden==4" class="terminar-historico fas fa-check circle-statushistorico"></i>
					<i ng-if="elementHistorico.idEstatusOrden==5" class="cancelado-historico fas fa-times circle-statushistorico"></i> 

					<div class="container-deschistorico">
						<span class="titlehistorico">Estado:</span>
						<span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstatusOrden"></span>
					</div>
					<div class="container-deschistorico">
						<span class="titlehistorico">Motivo:</span>
						<span class="content-titlehistorico" ng-bind="elementHistorico.descripcionMotivoOrden"></span>
					</div>
					<div class="container-deschistorico">
						<span class="titlehistorico">Descripci&oacute;n:</span>
						<span class="content-titlehistorico" ng-bind="elementHistorico.descripcionEstadoOrden"></span>
					</div>
				</div>
				<div class="card-footer text-muted">
					<p class="footer-card-historico" ng-bind="elementHistorico.fecha+' '+elementHistorico.hora" ></p>
				</div>
			</div>
		</div>

		</div>
	</div>
</div>