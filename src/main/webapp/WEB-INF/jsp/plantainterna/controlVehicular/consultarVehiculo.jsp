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
<div class="row">
    <div class="container-fluid contenedor">
        <div class="content-fluid">
            <table id="vehiculoTable" class="display table table-hover " cellspacing="0" width="100%">
                <thead id="thead_table">
                    <tr>
                        <th>N&uacute;m. Empleado</th>
                        <th>Nombre del Empleado</th>
                        <th>Tipo Veh&iacute;culo</th>
                        <th>Marca</th>
                        <th>Color</th>
                        <th>Placa</th>
                        <th>Tarjeta de Circulaci&oacute;n</th>
                        <th>Clave GPS</th>
                        <th>Ubicaci&oacute;n CDO</th>
                        <th>Distrito</th>
                        <th>Estatus</th>
                        <th>Motivo</th>
                        <th>Fecha</th>
                        <th>Comentario</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                      <!--
                    <tr>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>Tets</td>
                        <td>
                      
                            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul class="navbar-nav">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fa fa-ellipsis-v"></i>
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <a class="dropdown-item" href="#"><i
                                                        class="fa fa-pencil-square-o"></i></a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-trash"></i></a>
                                                <a class="dropdown-item" href="#"><i class="fa fa-history"></i></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        
                        </td>
                    </tr>
                    -->
                </tbody>
            </table>
        </div>
    </div>
</div>