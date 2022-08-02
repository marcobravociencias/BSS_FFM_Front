<center>
	<h3 class="subtitulosModalDetalle">Script <i class="btn btn-sm fas fa-clipboard-check iconoCopiarScript" style="float: right;" ng-click="copiarTextoScript()"></i> </h3>
	<hr style="border: .5px solid #ccc;" />
</center>
<div class="row">
	<div class="col-md-12 scrollScriptDetalleOT">
		<div ng-repeat="script in scriptDetalleOT track by $index">
			<span class="content_text textoScript" ng-bind="script">
			</span>
		</div>
	</div>
</div>

