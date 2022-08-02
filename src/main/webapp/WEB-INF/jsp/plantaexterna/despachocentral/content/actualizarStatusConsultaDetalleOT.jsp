<center>
	<h3 class="subtitulosModalDetalle">Actualizar Status</h3>
	<hr style=" border: .5px solid #ccc;">
</center>
<div class="row justify-content-center">
	<div class="col-md-7 ">

    	<input id="id_actualiza_id_ot" type="text" style="display: none;" />
    	<input id="id_actualiza_id_int" type="text" style="display: none;" />
    	<input id="id_actualiza_id_sub" type="text" style="display: none;" />
		<div id="campos_filtrado" class="row campos_filtrado_actualiza">
			<div  class="col-md-12 selectActualizarStatusOT" style="padding-bottom: .9em;">		
			    <label class="title_span">Estado</label>
				<select id="estados_corte" onchange="getMotivosCortes()" id="estadoAE" class="form-control content_text"   data-actions-box="true">
					<option value="-1">Seleccione ...</option>
					<option value="18">CANCELADA</option>
					<option value="14">TERMINADA</option>
				</select>
			</div>
			<div  class="col-md-12 selectActualizarStatusOT" style="padding-bottom: .9em;">
				<label class="title_span">Motivo</label>		   
				<select id="motivos_cortes" class="form-control content_text"  data-actions-box="true" >
					<option value="-1">Seleccione ...</option>
				</select>
			</div>
			<div class="col-md-12" style="padding-bottom: .9em;">
				<div class="form-group">
					  <label class="title_span">Comentario</label>
					  <textarea class="form-control content_text" rows="3" id="comment_actualiza_estado"></textarea>
				</div>
			</div>
			<div class="col-md-12">
				<button id="actualiza_status_btn" style="float: right;" type="button" onclick="cancelaStatosOT();" class="btn btn-sm btn-primary" >Actualizar</button>
			</div>
		</div>
	</div>
</div>