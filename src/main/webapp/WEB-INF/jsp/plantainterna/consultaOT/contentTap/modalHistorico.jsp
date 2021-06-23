<div class="modal-body" style="height: 300px; max-height: 300px; overflow: auto;">
	<div class="row">
		<div ng-repeat="elementHistorico in movimientos" class="col-4">
			<div  class="card-historico card text-center">
				<div class="card-body">
					<i ng-if="elementHistorico.Id_Estatus==1" class="pendiente-historico  fas fa-pause circle-statushistorico"></i>
					<i ng-if="elementHistorico.Id_Estatus==2" class="asignacion-historico fas fa-arrow-right circle-statushistorico"></i>
					<i ng-if="elementHistorico.Id_Estatus==3" class="detencion-historico far fa-hand-paper circle-statushistorico"></i>
					<i ng-if="elementHistorico.Id_Estatus==4" class="terminar-historico fas fa-check circle-statushistorico"></i>
					<i ng-if="elementHistorico.Id_Estatus==5" class="cancelado-historico fas fa-times circle-statushistorico"></i> 

					<div class="container-deschistorico">
						<span class="titlehistorico">Estado</span>
						<span class="content-titlehistorico" ng-bind="elementHistorico.EstatusDescripcion"></span>
					</div>
					<div class="container-deschistorico">
						<span class="titlehistorico">Motivo</span>
						<span class="content-titlehistorico" ng-bind="elementHistorico.MotivoDescripcion"></span>
					</div>
					<div class="container-deschistorico">
						<span class="titlehistorico">Descripci&oacute;n:</span>
						<span class="content-titlehistorico" ng-bind="elementHistorico.Descripcion"></span>
					</div>
				</div>
				<div class="card-footer text-muted">
					<p class="footer-card-historico" ng-bind="elementHistorico.FechaModificacion+' '+elementHistorico.HoraModificacion" ></p>
				</div>
			</div>
		</div>
	</div>
</div>