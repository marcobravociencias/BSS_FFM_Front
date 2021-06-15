<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" id="moda-add-disponibilidad" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog ">
  
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
              Agregar disponibilidad<span class=""></span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="closeModalAdd()">
             <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
           <div class="container-fluid">
                <div class="row">
                   <div class="col-md-6">
                      <div class="form-control-sm row contentMatu">   
                        <label for="matutino_adddisp" class="col-md-4 col-form-label">
                            <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Matutino</p>
                        </label>
                          <div class="col-sm-8">
                              <input id="matutino_adddisp" type="text" class="form-control"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                          </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-control-sm row contentVesp">   
                        <label for="vespertino_adddisp" class="col-md-4 col-form-label">
                            <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Vespertino</p>
                        </label>
                          <div class="col-sm-8">
                              <input id="vespertino_adddisp" type="text" class="form-control"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                          </div>
                        </div>
                    </div>
                </div>
  
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-control-sm row">
                          <label for="fecha_inicio_adddisp" class="col-md-4 col-form-label"><p  class="title_campos"><i class="fa-lg fa fa-calendar"></i>Fecha Inicio</p></label>
                          
                          <div  class="col-sm-8">                 
                            <input id="fecha_inicio_adddisp" readonly type="text" class="form-control inputDatePicker1 datepicker" placeholder="Fecha de ingreso" >
                          </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-control-sm row">
                          <label for="fecha_fin_adddisp" class="col-md-4 col-form-label"><p  class="title_campos"><i class="fa-lg fa fa-calendar"></i>Fecha Fin</p></label>
                          
                          <div id="" class="col-sm-8">                 
                            <input readonly type="text" id="fecha_fin_adddisp"  class="form-control inputDatePicker2 datepicker" placeholder="Fecha de ingreso" >
                          </div>
                        </div>
                    </div>
                </div>  
                <div class="row">
                    <div id="container-nocturno" class="col-md-6">
                      <div class="form-control-sm row">   
                        <label for="nocturno_adddisp" class="col-md-4 col-form-label">
                            <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Nocturno</p>
                        </label>
                          <div class="col-sm-8">
                              <input id="nocturno_adddisp" type="text" class="form-control"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                          </div>
                        </div>
                    </div>
                    <div class="col-md-6">  
  
                        <div class="form-control-sm row">
                           <label class="col-md-4 col-form-label"><p  class="title_campos"><i class="fa-lg fa fa-lock"></i>Bloqueo</p></label>
                          
                          <div class="col-sm-8">                 
                              <div class="custom-controls-bloqueo">
                                <label class="custom-control custom-radio">
                                  <input id="radio_activo_" checked="" name="radio-bloqueo-adddisp-individual" value="activo" type="radio" class="custom-control-input">
                                  <span class="custom-control-indicator"></span>
                                  <span class="custom-control-description">Activo</span>
                                </label>
                                <label class="custom-control custom-radio">
                                  <input id="radio_inactivo_adddisp" name="radio-bloqueo-adddisp-individual" type="radio" value="inactivo" class="custom-control-input">
                                  <span class="custom-control-indicator"></span>
                                  <span class="custom-control-description">Inactivo</span>
                                </label>
                              </div>
                           </div>
                        </div>
  
                      </div>
                </div>
  
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" ng-click="closeModalAdd()">Cerrar</button>
          <button type="button" ng-click="insertarDisponibilidad()" class="btn_modificar_disp btn btn-sm "><i class="fa fa-edit" aria-hidden="true"></i> Agregar</button>
        </div>
      </div>
    </div>
  </div>
  
  
  