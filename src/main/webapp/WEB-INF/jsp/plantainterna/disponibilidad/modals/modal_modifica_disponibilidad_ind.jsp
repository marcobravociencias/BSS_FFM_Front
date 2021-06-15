<div class="modal bd-example-modal-lg" tabindex="-1" role="dialog" id="modificar_disponibilidad_modal" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog ">
    
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Actualizar Disponibilidad<span class=""></span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="closeModalModificar()">
             <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">  
            <br/>
            <div class="container-fluid">
               <div class="row">
                   <div class="col-md-6">
                      <div class="form-control-sm row contentMatu">   
                        <label for="matutino" class="col-md-4 col-form-label">
                            <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Matutino</p>
                        </label>
                          <div class="col-sm-8">
                              <input id="matutino_actualizar" type="text" class="form-control"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                          </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-control-sm row contentVesp">   
                        <label for="vespertino" class="col-md-4 col-form-label">
                            <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Vespertino</p>
                        </label>
                          <div class="col-sm-8">
                              <input id="vespertino_actualizar" type="text" class="form-control"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                          </div>
                        </div>
                    </div>                  
                    <input type="hidden" name="" id="fecha_actualizar" value="">
                </div>
                <div class="row">
                  <div id="contenedor-editar-nocturno" class="col-md-6">
                    <div class="form-control-sm row">   
                      <label for="vespertino" class="col-md-4 col-form-label">
                          <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Nocturno</p>
                      </label>
                        <div class="col-sm-8">
                            <input id="nocturno_actualizar" type="text" class="form-control"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                        </div>
                      </div>
                  </div>   
                    <div class="col-md-6">  
                        <div >
                          <label class="col-form-label"><p  class="title_campos"><i class="fa-lg fa fa-lock "></i>Bloqueo</p></label>
                          <div class="custom-controls-bloqueo">
                            <label class="custom-control custom-radio">
                              <input id="radio_activo_mod" checked="" name="radio-bloqueo-mod-individual" value="activo" type="radio" class="custom-control-input">
                              <span class="custom-control-indicator"></span>
                              <span class="custom-control-description">Activo</span>
                            </label>
                            <label class="custom-control custom-radio">
                              <input id="radio_inactivo_mod" name="radio-bloqueo-mod-individual" type="radio" value="inactivo" class="custom-control-input">
                              <span class="custom-control-indicator"></span>
                              <span class="custom-control-description">Inactivo</span>
                            </label>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" ng-click="closeModalModificar()">Cerrar</button>
          <button type="button" id="boton_modificar_disponibilidad" ng-click="actualizarDisponibilidad()" class="btn_modificar_disp btn btn-sm "><i class="fa fa-edit" aria-hidden="true"></i> Actualizar d&iacute;a</button>
        </div>
      </div>
    </div>
  </div>
  
  
  