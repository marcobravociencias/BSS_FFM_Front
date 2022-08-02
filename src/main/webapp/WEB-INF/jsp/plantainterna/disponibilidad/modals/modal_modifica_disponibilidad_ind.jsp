<div class="modal bd-example-modal-lg" tabindex="-1" role="dialog" id="modificar_disponibilidad_modal" aria-labelledby="" aria-hidden="true">
  <div class="modal-dialog ">
  
    <div class="modal-content" style="min-height: 24em;">
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
        <input type="hidden" name="" id="fecha_actualizar" value=""> 
          <div class="container-fluid">
            <div class="row" ng-if="arrayTurnosDisponibilidad.length < 3">
              <div class="col-md-6" ng-if="banderaMatutino">
                 <div class="form-control-sm  contentMatu">   
                     <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Matutino</label>
                     <input id="matutino_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                        
                 </div>
               </div>
               <div class="col-md-6" ng-if="banderaVespertino">
                 <div class="form-control-sm  contentMatu">   
                     <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Vespertino</label>
                     <input id="vespertino_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                     
                 </div>
               </div>
               <div class="col-md-6" ng-if="banderaNocturno">
                 <div class="form-control-sm  contentMatu">   
                   <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Nocturno</label>
                   <input id="nocturno_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                       
                 </div>      
               </div>
           </div>
           <div class="row" ng-if="arrayTurnosDisponibilidad.length == 3">
             <div class="col-md-6">
                <div class="form-control-sm  contentMatu">   
                    <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Matutino</label>
                    <input id="matutino_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                        
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-control-sm  contentMatu">   
                    <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Vespertino</label>
                    <input id="vespertino_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                     
                </div>
              </div>
          </div>
          <div class="row" ng-if="arrayTurnosDisponibilidad.length == 3">
           <div class="col-md-6">
             <div class="form-control-sm  contentMatu">   
               <label  class="title_campos"><i class=" fa-lg fa fa-sort-numeric-asc"></i>Nocturno</label>
               <input id="nocturno_actualizar" type="text" class="form-control form-control-sm input-filtro-disponibilidad"  placeholder="" onkeypress='return event.charCode >= 48 && event.charCode <= 57' maxlength="5" >                       
             </div>      
           </div>
          </div>
             <div class="row">
              <div class="col-md-6">
                <div class="form-control-sm  contentMatu">   
                    <label  class="title_campos"><i class=" fa-lg fa fa-calendar"></i>Fecha Inicio</label>                                       
                    <input id="fecha_inicio_updateDis" readonly type="text" class="form-control form-control-sm input-filtro-disponibilidad inputDatePicker1 datepicker" placeholder="Fecha de ingreso">                     
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-control-sm  contentMatu">   
                    <label  class="title_campos"><i class=" fa-lg fa fa-calendar"></i>Fecha Fin</label>                                      
                    <input readonly type="text" id="fecha_fin_updateDis"  class="form-control form-control-sm input-filtro-disponibilidad inputDatePicker2 datepicker" placeholder="Fecha de ingreso" >                     
                </div>
              </div>
             </div>  
             <div class="row">
  
              <div class="col-md-6">  
                  <div class="form-control-sm row">
                    <div class="col-sm-12">     
                      <p  class="title_campos"><i class="fa-lg fa fa-lock "></i>Estatus</p>
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


