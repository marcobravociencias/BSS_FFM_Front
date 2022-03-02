<!-- Modal -->
<div class="modal fade" tabindex="-1"  aria-labelledby="exampleModalLabel"
  aria-hidden="true" id="modal-reasigna-ot">
  <div class="modal-dialog" style="min-width: 60% !important; max-width: 60% !important;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Reasigna OT</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style="min-height: 300px; max-height: 300px; overflow: auto;">
        <input type="hidden" id="otSeleccionada" value="" />
        <div class="content-operarios-modal">
          <div class="row">
            <div class="offset-9 col-3">
              <div class="input-group">
                <input type="text" class="form-control form-control-sm input-search-asignadas" id="searchTecnico"
                  placeholder="Buscar T&eacute;cnico"><button ng-click="buscarTecnicoModal('searchTecnico')" style="height: 2.25em;box-shadow: none;" class="btn btn-sm btn-primary waves-effect waves-light ripple-surface btn-total"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </div>
          <div class="row" id="data-tecnico-content" style="margin-left:0.5em;">
            <div class="col-3 fc-cell-text evento-ot-asignada ot-asignada-modal content-ot-oper cardoper-reasigna-{{tecnico.idTecnico}}"
              ng-click="seleccionOperarioReasignar(tecnico.idTecnico, true)" ng-repeat="tecnico in listadoTecnicosAsigna">
              <div class="row">
                <div class="col-2">
                  <img style="border:.3em solid {{tecnico.color}}; width: 4em; height: 4em;margin-top:1em"
                    class="efecto imagen_operario_foto"
                    src="{{(tecnico.urlFotoPerfil != undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil : './resources/img/plantainterna/despacho/tecnicootasignada.png')}}">
                </div>
                <div class="offset-1 col-8 text-justify info-modal-operario">
                  <div class="conteo-content-ots">
                  </div>
                  <div class="row">
                    <h5 title="{{tecnico.nombre}} {{tecnico.apellidoPaterno}} {{tecnico.apellidoMaterno}}"
                      class="big-text nombre_tecnico">
                      {{tecnico.nombre}} {{tecnico.apellidoPaterno}} </h5>
                  </div>
                  <div class="row">
                    <small class="numero_empleado_telefono">
                      <i style="color:#4991e1;" class="fa fa-user"></i>
                      {{tecnico.usuarioFFM}}
                    </small>
                  </div>
                  <div class="row">
                    <small class="numero_empleado_telefono">
                      <i style="color:#4991e1;" class="fa fa-phone"></i>
                      {{tecnico.numContacto}}
                    </small>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" ng-disabled="!isSelectedTec" style="height: 2.6em;"
          class="btn btn-sm btn-primary ripple-surface" ng-click="reasignarTecnico()"><i class="fas fa-people-arrows"
            aria-hidden="true"></i> Reasignar</button>
        <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface" data-mdb-dismiss="modal">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>