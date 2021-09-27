<center>
	<h3 class="subtitulosModalDetalle">Script</h3>
	<button id="copy_script" class="btn btn-sm btn-primary fa fa-clipboard" type="button" data-clipboard-demo="" data-clipboard-target="#foo" ng-click="copiarTextoScript()">
	</button>
	<hr style="    border: .5px solid #ccc;" />
</center>
<div class="row">
	<div style="max-height: 300px;overflow:scroll;" class="col-md-12">
		<div ng-repeat="script in scriptDetalleOT track by $index">
			<span class="content_text textoScript" ng-bind="script">
			</span>
		</div>
	</div>
</div>

