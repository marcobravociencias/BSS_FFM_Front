<div class="row col-12">
    <div class="col-2 icons-filter disponible">
        <i class="fas fa-car-side"></i>
        <span class="disponible" style="cursor: pointer">{{countDisponibles > 0 ? countDisponibles + " Disponibles" :
            "Disponibles"}}</span>
    </div>
    <div class="col-2 icons-filter asignado">
        <i class="fas fa-car"></i>
        <span class="asignadoStyle">{{countAsignados > 0 ? countAsignados + " Asignados" : "Asignados"}}</span>
    </div>
    <div class="col-2 icons-filter noDisponible">
        <i class="fas fa-wrench"></i>
        <span class="servicioStyle">{{countNoDisponibles > 0 ? countNoDisponibles + " No Disponibles" : "No
            Disponible"}}</span>
    </div>
    <div class="col-2 offset-1">
        <div class="dropdown">
            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Ciudad" type="text"
                id="filtro-ciudad" class="input-filtro form-control form-control-md" />
            <ul class="dropdown-menu drop-down-filters" id="dropdown-menu-cal-int" aria-labelledby="filtro-ciudad">
                <li style="text-align: center">
                    <button ng-click="seleccionarTodos()" id="todo_filtro" type="button"
                        class="btn btn-indigo btn-sm waves-effect waves-light">
                        Todos
                    </button>
                    <button ng-click="deseleccionarTodos()" id="ninguno_filtro" type="button"
                        class="btn btn-indigo btn-sm waves-effect waves-light">
                        Ninguno
                    </button>
                </li>
                <li class="elemento_menu dropdown-divider"></li>
            </ul>
        </div>
    </div>
    <div class="col-2">
        <div class="dropdown">
            <input readonly data-mdb-toggle="dropdown" aria-expanded="false" placeholder="Distrito" type="text"
                id="filtro-distrito" class="input-filtro form-control form-control-md" />
            <ul class="dropdown-menu drop-down-filters" id="dropdown-menu-cal-int" aria-labelledby="filtro-distrito">
                <li style="text-align: center">
                    <button ng-click="seleccionarTodos()" id="todo_filtro" type="button"
                        class="btn btn-indigo btn-sm waves-effect waves-light">
                        Todos
                    </button>
                    <button ng-click="deseleccionarTodos()" id="ninguno_filtro" type="button"
                        class="btn btn-indigo btn-sm waves-effect waves-light">
                        Ninguno
                    </button>
                </li>
                <li class="elemento_menu dropdown-divider"></li>
            </ul>
        </div>
    </div>
    <div class="col-1">
        <button id="btnBuscar" type="button" class="btn btn-primary btnTotal">
            Buscar
        </button>
    </div>
</div>
<br>
<div class="row col-12">
    <div class="container-fluid contenedor">
        <div class="content-fluid">
            <table id="vehiculoTable" class="display table table-hover " cellspacing="0" width="100%">
                <thead id="thead_table">
                    <tr>
                        <th>Placa</th>
                        <th>Tipo</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>A&ntilde;io</th>
                        <th>Color</th>
                        <th>Combustible</th>
                        <th>N&uacute;m. Serie</th>
                        <th>Geograf&iacute;a</th>
                        <th>Foto placa</th>
                        <th>Foto veh&iacute;culo</th>
                        <th>Estatus</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </div>
    </div>
</div>