<center>
	<h3 style="margin-top: 0;color:#3c465a">Actualizar Status</h3>
	<hr style=" border: .5px solid #ccc;">
</center>
<div class="row justify-content-center">
	<div class="col-md-7 ">

    	<input id="id_actualiza_id_ot" type="text" style="display: none;" />
    	<input id="id_actualiza_id_int" type="text" style="display: none;" />
    	<input id="id_actualiza_id_sub" type="text" style="display: none;" />
		<div id="campos_filtrado" class="row campos_filtrado_actualiza">
			<div  class="col-md-12">		
			    <label  class="col-form-label"><p class="title_consulta">Estado</p></label><br/>
				<select id="estados_corte" onchange="getMotivosCortes()" id="estadoAE" class=" select_consulta"   data-actions-box="true">
					<option value="-1">Seleccione ...</option>
					<option value="18">CANCELADA</option>
					<option value="14">TERMINADA</option>

				</select>
			</div>
			<div  class="col-md-12" >
				<label for="motivos_cortes" class="col-form-label"><p  class="title_consulta">Motivo</p></label>	<br/>			   
				<select id="motivos_cortes" class=" select_consulta"  data-actions-box="true" >
					<option value="-1">Seleccione ...</option>
				</select>
			</div>
			<div class="col-md-12">
				<div class="form-group">
					  <label for="ciudad_consulta" class="col-form-label"><p  class="title_consulta">Comentario</p></label>	<br/>	
					  <textarea class="form-control comentario_modal" rows="3" id="comment_actualiza_estado"></textarea>
				</div>
			</div>
			<div class="col-md-12">
				<button id="actualiza_status_btn" style="float: right;" type="button" onclick="cancelaStatosOT();" class="btn btn-sm btn-warning btn_fun" >Actualizar</button>
			</div>
		</div>
	</div>
</div>