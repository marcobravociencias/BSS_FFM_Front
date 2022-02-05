<div class="container-fluid" id="container_cambia_contrasena">
    <div class="col-12">
        <div class="row">
            <div class="col-2 form-group columna-filtro-ind-rep">
                <label class="span-consulta"><i class="fas fa-address-card"></i> Puesto</label>
                <div class="dropdown">
                    <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="SELECCIONE..."
                        type="text" id="txtPuesto" class="input-filtro form-control form-control-sm" />
                    <ul class="dropdown-menu drop-down-filters">
                        <li style="text-align: center;">
                            <button ng-click="seleccionarTodos(listaPuestos)" id="todo_filtro" type="button"
                                class="btn btn-indigo btn-sm waves-effect waves-light">Todos</button>
                            <button ng-click="deseleccionarTodos(listaPuestos)" id="ninguno_filtro" type="button"
                                class="btn btn-indigo btn-sm waves-effect waves-light">Ninguno</button>
                        </li>
                        <li class="elemento_menu dropdown-divider"></li>
                        <li ng-repeat="puesto in listaPuestos" class="element-menu-filter">
                            <label class="dropdown-item form-check-inputfiltro">
                                <input id="" class="form-check-input" type="checkbox" ng-change="puestoSeleccion()"
                                    ng-model="puesto.checkedOpcion" ng-checked="puesto.checkedOpcion" />
                                <span for="" class="dropdown-item item-text-filtro" ng-bind="puesto.descripcion"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2 form-group columna-filtro-ind-rep">
                <label class="span-consulta"><i class="fas fa-map-marked"></i> Geograf&iacute;a</label>
                <input readonly placeholder="NO HAY SELECCI&Oacute;N" type="text"
                    ng-click="abrirModalGeografiaBuscarUsuario()" id="inputSearchGeoUsuario"
                    class="input-filtro form-control form-control-sm" style="border-radius: .5em !important;">
            </div>
            <div class="col-md-1 search-form">
                <button id="btnBuscar" type="button" class="btn btn-primary btnTotal"
                    ng-click="consultarUsuariosContrasena(true)" style="margin-top: 2.2em;">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>

    <div class="content-fluid">
        <div class="table-responsive">
            <table id="cambiaContrasenaTable" class="display table" cellspacing="0" width="100%">
                <thead id="thead_table">
                    <tr>
                        <th>FOTO</th>
                        <th>#EMPLEADO</th>
                        <th>PUESTO</th>
                        <th>USUARIO</th>
                        <th>NOMBRE</th>
                        <th>UBICACI&Oacute;N</th>
                        <th>CAMBIAR CONTRASE&Ntilde;A</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>