<!-- Modal -->
<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" id="modalNuevo">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" ng-if="isCrear">Crear permiso</h5>
                <h5 class="modal-title" id="exampleModalLabel" ng-if="!isCrear">Editar permiso</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-md-6 input-select">
                        <label class="label-input" for="selectTipoEquipoAdd">Tipo</label>
                        <select ng-model="permiso.tipo" class="input-filtro form-control form-control-sm input-modulos"
                            id="permisoTipo">
                            <option value="" disabled selected>Seleccione ...</option>
                            <option value="1">M&oacute;dulo</option>
                            <option value="2">Acci&oacute;n</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6 input-select" ng-show="permiso.tipo == 2">
                        <label class="label-input" for="selectTipoEquipoAdd">M&oacute;dulo</label>
                        <select ng-model="permiso.modulo" class="input-filtro form-control form-control-sm input-modulos"
                            id="permisoModulo">
                            <option value="" disabled selected>Seleccione ...</option>
                            <option value="1">Test</option>
                            <option value="2">Test2</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-6 ">
                        <label class="label-input">Nombre</label>
                        <input ng-model="permiso.nombre" type="text" class="form-control form-control-sm input-modulos"
                            id="permisoNombre">
                    </div>
                    <div class="form-group col-md-6 ">
                        <label class="label-input">Clave</label>
                        <input ng-model="permiso.clave" type="text" class="form-control form-control-sm input-modulos"
                            id="permisoClave">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6 ">
                        <label class="label-input">Color</label>
                        <input ng-model="permiso.color" type="text" class="form-control form-control-sm input-modulos"
                            id="permisoColor">
                    </div>
                    <div class="form-group col-md-6 ">
                        <label class="label-input">Color hover</label>
                        <input ng-model="permiso.colorHover" type="text" class="form-control form-control-sm input-modulos"
                            id="permisoColorHover">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6 ">
                        <label class="label-input">Icono</label>
                        <input ng-model="permiso.icono" type="text" class="form-control form-control-sm input-modulos"
                            id="permisoIcono">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-cerrar-modal btn-secondary ripple-surface"
                    data-dismiss="modal">
                    Cerrar
                </button>
                <button type="button" class="btn btn-primary ripple-surface btnGuardar" ng-if="isCrear" ng-click="guardarPermiso()">Guardar</button>
                <button type="button" class="btn btn-primary ripple-surface btnGuardar" ng-if="!isCrear" ng-click="editarPermiso()">Editar</button>
            </div>
        </div>
    </div>
</div>