<div class="row">
	<div class="col-sm-4" > 
	 	<label  for="compania_select_modificar"><p class="title_campos"><i id="filtro_compa_bg" class="icono_filtro_bg fa-lg fa fa-building"></i>Compa&ntilde;ia</p></label>			
		<select id="compania_select_modificar" class="form-control" required>
	   	  	<option selected value="-1">Seleccione...</option>	
		 	<option value="2">TotalPlay Empresarial</option>
		</select>							       
	</div>
	<div id="tipo_intervencion" class="col-sm-4" data-step="23" data-intro="Opci&oacute;n tipo de intervenci&oacute;n">
		<label for="tipo_select_modificar"><p class="title_campos"><i id="filtro_int_bg" class="icono_filtro_bg fa-lg fa fa-bookmark"></i>Tipo 	Intervenci&oacute;n</p>
       </label>
      
		<select id="tipo_select_modificar" class="form-control custom-select" required>
       	  	<option value="-1">Seleccione...</option>	
			<option value="48">INSTALACION</option>
		</select>
	</div>	

	<div id="container_arbol_dispomodifica" class="col-sm-4" data-step="15" data-intro="Opci&oacute;n tipo de intervenci&oacute;n">
       <label for="tipo_select" id="text_arbol_modifica"><p class="title_campos"><i class="icon_disp_bg fa-lg fa fa-bookmark"></i>&Aacute;rbol</p></label>		  	<input type="text" readonly id="arbol_disponibilidad_modifica" style="background: white;cursor: pointer" class="form-control"  aria-describedby="emailHelp" placeholder="Seleccione">
	</div>			
</div>
<br/>
<div class="row">
	<div class="col-md-4" > 
        <label for="matutino_modificar" class="col-form-label">
              <p  class="title_campos"><i id="filtro_mat_bg" class="icono_filtro_bg fa-lg fa fa-sort-numeric-asc"></i>Matutino</p>
          </label>
        <input id="matutino_modificar" type="text" class="form-control"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
    </div>
    <div class="col-md-4" >   
        <label for="vespertino_modificar" class="col-form-label">
              <p  class="title_campos"><i id="filtro_vesp_bg" class="icono_filtro_bg fa-lg fa fa-sort-numeric-asc"></i>Vespertino</p>
        </label>
        <input id="vespertino_modificar" type="text" class="form-control"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
    </div>

	<div class="col-md-4" data-step="24" data-intro="Opci&oacute;n estado de la disponibilidad">	
		<div id="contenido_bloqueo_modificar">
			<label class="col-form-label"><p  class="title_campos"><i id="filtro_opc_bg" class="icono_filtro_bg fa-lg fa fa-lock "></i>Bloqueo</p></label>
			<div class="custom-controls-bloqueo">
				<label class="custom-control custom-radio">
					<input id="modificar_radio_active_mod" checked="" name="radio-bloqueo-modificar" value="activo" type="radio" class="custom-control-input">
					<span class="custom-control-indicator"></span>
					<span class="custom-control-description">Activo</span>
				</label>
				<label class="custom-control custom-radio">
					<input id="modificar_radio_inactive_mod" name="radio-bloqueo-modificar" type="radio" value="inactivo" class="custom-control-input">
					<span class="custom-control-indicator"></span>
					<span class="custom-control-description">Inactivo</span>
				</label>
			</div>
		</div>
	</div>
</div>  
<br/>

<div class="row">
	<div class="col-md-4" >
        <label  for="fecha_inicio_modificar" class=" col-form-label"><p  class="title_campos"><i id="filtro_fecha_inicio_icono" class="icono_filtro_bg fa-lg fa fa-calendar"></i>Fecha  Inicio</p></label>
                       
        <input id="fecha_inicio_modificar" readonly type="text" class="form-control inputDatePicker1 datepicker" placeholder="Fecha Inicio" >
    </div>
	<div class="col-md-4"> 
		<div id="fecha_fin_disponibilidad_contenido_modificar">
            <label for="fecha_fin_modificar" class=" col-form-label"><p  class="title_campos"><i id="filtro_fecha_fin_icono" class="icono_filtro_bg fa-lg fa fa-calendar"></i>Fecha Fin </p></label>
                           
            <input id="fecha_fin_modificar" readonly type="text" class="form-control inputDatePicker1 datepicker" placeholder="Fecha Fin" >
        </div>	
	</div>
	<div class="col-md-4" style="margin-top: 1.4em;" >
    	<button id="modificar_disponibilidad" type="button" class="btn btn-primary  " >
			Modificar Disponibilidad
		</button>
	</div>
</div>