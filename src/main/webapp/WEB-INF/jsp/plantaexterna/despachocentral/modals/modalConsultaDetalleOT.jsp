<div class="modal fade bd-example-modal-lg" id="modalConsultaDetalleOT" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="min-width: 65% !important; max-width: 65% !important;">
        <div class="modal-content">
            <div class="blue-gradient style_modal_header modal-header modal_header_bg">
                <h5 id="lblTituloModalDetalleOT" style="font-weight: bold;" class="modal-title header-title">Detalle OT</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="cerrarmodalConsultaDetalleOT()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            	<div class="row">
	                <div class="col-md-12">
		                <div>
		                    <ul class="nav nav-tabs" id="pills-tab-mod" role="tablist">
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link active" id="pills-maps-tab" data-toggle="pill" href="#pills-maps" role="tab" aria-controls="#pills-maps" aria-selected="true"><i class="fas fa-map"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-informacion-tab" data-toggle="pill" href="#pills-informacion" role="tab" aria-controls="#pills-informacion" aria-selected="true"><i class="fas fa-bars"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-historico-tab" data-toggle="pill" href="#pills-historico" role="tab" aria-controls="#pills-historico" aria-selected="true"><i class="fas fa-heading"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-chat-tab" data-toggle="pill" href="#pills-chat" role="tab" aria-controls="#pills-chat" aria-selected="true"><i class="fas fa-comments"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-script-tab" data-toggle="pill" href="#pills-script" role="tab" aria-controls="#pills-script" aria-selected="true"><i class="fas fa-copy"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-afectacion-tab" data-toggle="pill" href="#pills-afectacion" role="tab" aria-controls="#pills-afectacion" aria-selected="true"><i class="fa fa-crosshairs"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-actualizarStatus-tab" data-toggle="pill" href="#pills-actualizarStatus" role="tab" aria-controls="#pills-actualizarStatus" aria-selected="true"><i class="fas fa-cogs"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-conceptos-tab" data-toggle="pill" href="#pills-conceptos" role="tab" aria-controls="#pills-conceptos" aria-selected="true"><i class="fa fa-tasks"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-fallas-tab" data-toggle="pill" href="#pills-fallas" role="tab" aria-controls="#pills-fallas" aria-selected="true"><i class="fab fa-deviantart"></i></a>
		                        </li>
		                        <li class="nav-item" role="presentation">
		                            <a class="nav-link" id="pills-reasignarGeografia-tab" data-toggle="pill" href="#pills-reasignarGeografia" role="tab" aria-controls="#pills-reasignarGeografia" aria-selected="true"><i class="fas fa-map"></i></a>
		                        </li>
		                    </ul>
	                    </div>
	                    <div class="tab-content" id="pills-tabContent-mod">
	                        <div class="tab-pane fade show active" id="pills-maps" role="tabpanel" aria-labelledby="pills-maps-tab">
	                            <jsp:include page="./../content/mapsConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                        <div class="tab-pane fade" id="pills-informacion" role="tabpanel" aria-labelledby="pills-informacion-tab">
	                            <jsp:include page="./../content/informacionConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
							<div class="tab-pane fade" id="pills-historico" role="tabpanel" aria-labelledby="pills-historico-tab">
	                            <jsp:include page="./../content/historicoConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                        <div class="tab-pane fade" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
	                            <jsp:include page="./../content/chatConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                        <div class="tab-pane fade" id="pills-script" role="tabpanel" aria-labelledby="pills-script-tab">
	                            <jsp:include page="./../content/scriptConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                        <div class="tab-pane fade" id="pills-afectacion" role="tabpanel" aria-labelledby="pills-afectacion-tab">
	                            <jsp:include page="./../content/afectacionConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                        <div class="tab-pane fade" id="pills-actualizarStatus" role="tabpanel" aria-labelledby="pills-actualizarStatus-tab">
	                            <jsp:include page="./../content/actualizarStatusConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                        <div class="tab-pane fade" id="pills-conceptos" role="tabpanel" aria-labelledby="pills-conceptos-tab">
	                            <jsp:include page="./../content/conceptosConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                        <div class="tab-pane fade" id="pills-fallas" role="tabpanel" aria-labelledby="pills-fallas-tab">
	                            <jsp:include page="./../content/fallasConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                        <div class="tab-pane fade" id="pills-reasignarGeografia" role="tabpanel" aria-labelledby="pills-reasignarGeografia-tab">
	                            <jsp:include page="./../content/reasignarGeografiaConsultaDetalleOT.jsp"></jsp:include> 
	                        </div>
	                    </div>
	                </div>
	        	</div>
            </div>	
            <div class="modal-footer">
                <button id="btnCerrarmodalConsultaDetalleOT" type="button" class="btn btn-sm btn-primary waves-effect waves-light" ng-click="cerrarmodalConsultaDetalleOT()" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>