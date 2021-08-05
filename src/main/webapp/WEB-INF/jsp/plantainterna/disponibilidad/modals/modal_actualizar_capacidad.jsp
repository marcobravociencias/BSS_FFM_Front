<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" id="moda-add-disponibilidad" aria-labelledby="" aria-hidden="true">
  <div class="modal-dialog ">

    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
            Agregar disponibilidad<span class=""></span>
        </h5>
        <button
        type="button"
        class="btn-close"
        data-mdb-dismiss="modal"
        aria-label="Close"
        ></button>
      </div>
      <div class="modal-body body-modal-capacidad-mod">
         <div class="container-fluid">
              <div class="row">
                 <div class="col-md-6">
                    <div class="form-control-sm  contentMatu">   
                        <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Matutino</label>
                        <input id="matutino_adddisp" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                        
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-control-sm  contentMatu">   
                        <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Vespertino</label>
                        <input id="vespertino_adddisp" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                     
                    </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                    <div class="form-control-sm  contentMatu">   
                        <label  class="title_campos"><i class=" fa-lg fa fa-calendar"></i>Fecha Inicio</label>                                       
                        <input id="fecha_inicio_adddisp" readonly type="text" class="form-control form-control-sm input-filtro-disponibilidad inputDatePicker1 datepicker" placeholder="Fecha de ingreso">                     
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-control-sm  contentMatu">   
                        <label  class="title_campos"><i class=" fa-lg fa fa-calendar"></i>Fecha Fin</label>                                      
                        <input readonly type="text" id="fecha_fin_adddisp"  class="form-control form-control-sm input-filtro-disponibilidad inputDatePicker2 datepicker" placeholder="Fecha de ingreso" >                     
                    </div>
                  </div>
              </div>  
              <div class="row row-content-bloqueo">
                  <div id="container-noc" class="col-md-6">
                    <div class="form-control-sm  contentMatu">   
                      <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Nocturno</label>
                      <input id="nocturno_adddisp" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                       
                    </div>      
                  </div>
                  <div class="col-md-6">   
                    <div class="form-control-sm  contentMatu">   
                          <label  class="title_campos"><i class=" fa-lg fa fa-lock"></i>Bloqueo</label>  
                          <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" value="true" id="radio_activo_adddisp" name="checkBloque">
                            <label class="custom-control-label" for="radio_activo_adddisp">Activo</label>
                          </div>                          
                          <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" value="false" id="radio_inactivo_adddisp" name="checkBloque">
                            <label class="custom-control-label" for="radio_inactivo_adddisp">Inactivo</label>
                          </div>           
                    </div>            
                  </div>
              </div>
          </div>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn-cerrar-modal btn btn-sm btn-secondary" data-dismiss="modal" ng-click="closeModalAdd()">Cerrar</button>
        <button type="button" ng-click="insertarDisponibilidad()" class="btn-aceptar-modal btn_modificar_disp btn btn-sm "><i class="fa fa-edit" aria-hidden="true"></i> Agregar</button>
      </div>
    </div>
  </div>
</div>


