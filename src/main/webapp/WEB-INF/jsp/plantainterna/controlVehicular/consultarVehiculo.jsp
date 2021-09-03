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
<div class="col-12">
    <div class="container-fluid contenedor">
        <div class="content-fluid">
            <table id="vehiculoTable" class="display table table-hover " cellspacing="0" width="100%">
                <thead id="thead_table">
                    <tr>
                        <th>PLACA</th>
                        <th>TIPO</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>A&Ntilde;O</th>
                        <th>COLOR</th>
                        <th>COMBUSTIBLE</th>
                        <th>N&Uacute;M. SERIE</th>
                        <th>GEOGRAF&Iacute;A</th>
                        <th>FOTO PLACA</th>
                        <th>FOTO VEH&Iacute;CULO</th>
                        <th>ESTATUS</th>
                        <th><i class="fa fa-bars" style="color: gray; font-size: 13px;"></i></th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </div>
    </div>
</div>