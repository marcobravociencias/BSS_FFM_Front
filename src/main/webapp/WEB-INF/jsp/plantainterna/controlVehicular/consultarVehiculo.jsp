<!--
<div class="row col-12">
    <div class="col-2 icons-filter disponible" onclick="filterByStatus(1)">
        <i class="fas fa-car-side"></i>
        <span class="disponible" style="cursor: pointer">{{countDisponibles > 0 ? countDisponibles + " Disponibles" :
            "Disponibles"}}</span>
    </div>
    <div class="col-2 icons-filter asignado" onclick="filterByStatus(2)">
        <i class="fas fa-car"></i>
        <span class="asignadoStyle">{{countAsignados > 0 ? countAsignados + " Asignados" : "Asignados"}}</span>
    </div>
    <div class="col-2 icons-filter noDisponible" onclick="filterByStatus(3)">
        <i class="fas fa-wrench"></i>
        <span class="servicioStyle">{{countNoDisponibles > 0 ? countNoDisponibles + " No Disponibles" : "No
            Disponible"}}</span>
    </div>
    <div class="col-3 offset-2">
        <input readonly placeholder="Seleccione..." type="text" onclick="abrirModalGeografiaBuscar()"
        class="input-filtro-consultaOT form-control form-control-sm">
    </div>
    <div class="col-1">
        <button id="btnBuscar" type="button" class="btn btn-primary btnTotal">
            Buscar
        </button>
    </div>
</div>
-->

<br>
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
                    <th>EDITAR</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>