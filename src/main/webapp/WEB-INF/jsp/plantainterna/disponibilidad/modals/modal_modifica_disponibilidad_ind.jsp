<div class="modal bd-example-modal-lg" tabindex="-1" role="dialog" id="modificar_disponibilidad_modal" aria-labelledby="" aria-hidden="true">
  <div class="modal-dialog ">
  
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          Actualizar Disponibilidad<span class=""></span>
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
                    <div class="form-control-sm row contentMatu">   
                        <div class="col-sm-12">
                            <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Matutino</p>
                            <input id="matutino_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                        </div>
                      </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-control-sm row contentVesp">   
                        <div class="col-sm-12">
                            <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Vespertino</p>
                            <input id="vespertino_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                        </div>
                      </div>
                  </div>                  
                  <input type="hidden" name="" id="fecha_actualizar" value="">
              </div>
              <div class="row">
                <div id="contenedor-editar-nocturno" class="col-md-6">
                  <div class="form-control-sm row">   
                      <div class="col-sm-12">
                          <p  class="title_campos"><i class="fa-lg fa fa-sort-numeric-asc"></i>Nocturno</p>
                          <input id="nocturno_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >
                      </div>
                    </div>
                </div>   
                  <div class="col-md-6">  
                      <div class="form-control-sm row">
                        <div class="col-sm-12">     
                          <p  class="title_campos"><i class="fa-lg fa fa-lock "></i>Bloqueo</p>
                          <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" value="true" id="radio_activo_mod" name="radio-bloqueo-mod-individual">
                            <label class="custom-control-label" for="radio_activo_mod">Activo</label>
                          </div>
                          
                          <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" value="false" id="radio_inactivo_mod" name="radio-bloqueo-mod-individual">
                            <label class="custom-control-label" for="radio_inactivo_mod">Inactivo</label>
                          </div>
                       </div>
                      </div>
                    </div>
              </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-cerrar-modal btn btn-sm btn-secondary" data-dismiss="modal" ng-click="closeModalModificar()">Cerrar</button>
        <button type="button" id="boton_modificar_disponibilidad" ng-click="actualizarDisponibilidad()" class="btn-aceptar-modal btn_modificar_disp btn btn-sm "><i class="fa fa-edit" aria-hidden="true"></i> Actualizar d&iacute;a</button>
      </div>
    </div>
  </div>
</div>


