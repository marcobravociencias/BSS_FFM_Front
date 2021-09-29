<center>
	<h3 class="subtitulosModalDetalle">Reasigna  a cl&uacute;ster</h3>
	<hr style=" border: .5px solid #ccc;">
</center>
<div class="row justify-content-center">
	<div class="col-md-7 ">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="input-group input-group-sm content-seach-group">
							<input id="buscadorGeografiaDetalleOT" type="text" class="form-control buscadorGenericoArbol" placeholder="Buscar geograf&iacute;a" ng-keyup="busquedaGeografiaDetalleOT()"> 
							<span class="fa fa-search iconoBusqueda"></span>
						</div>
					</div>
					<div class="col-md-12 scrollArbolGeografias">
						<div class="container-treegeofria" style="margin-top: 0.5em;">
							<div id="arbolGeografiaDetalleOT" class="proton-demo">
							</div>
						</div>
					</div>
				</div>
				
				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<label for="comment_reasignacluster" class="col-form-label">Comentarios</label>	
							<textarea class="form-control comentario_modal" rows="3" id="comment_reasignacluster"></textarea>
						</div>
	            	</div>
            	</div>
            	<div class="row">
		            <div class="col-md-6">
		                <h6 id="seleccion-reasignacluster"><span style="color: #737373;">Sin selecci&oacute;n de cl&uacute;ster*</span></h6>
		            </div>
					<div class="col-md-6">
						<button id="reasignaotcluster" style="float: right;" type="button" onclick="reasignaOTCluster();" class="btn btn-sm btn-primary" >Reasignar a cl&uacute;ster</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>