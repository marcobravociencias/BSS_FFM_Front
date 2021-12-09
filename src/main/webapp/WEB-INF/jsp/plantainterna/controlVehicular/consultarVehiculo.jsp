<div class="row">    
    <div class="col-md-2 search-form form-group" style="padding-left: 1.5em;">
        <label style="margin-bottom: 0;">Buscar</label>
        <input placeholder="Buscar" style="border-radius: .5em !important;" type="text" autocomplete="off" class="search-filtro form-control form-control-sm mt-0" 
            id="searchText">
    </div>
    
    <div class="col-md-7 search-form form-group">
        <div class="row">
        	<div class="col-md-12">
        		<ul class="nav nav-tabs" id="tabContadoresVehiculos" role="tablist">
        			<li class="nav-item contenedorContadoresEstadosVehiculos" ng-click="busquedaVehiculosEstado('todos')">
						<label class="nav-link active etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#" role="tab">Todos <i class="fas fa-th-list"></i> <p class="contadoresEstadosVehiculos">{{countTodos}}</p></label>
					</li>
					<li class="nav-item contenedorContadoresEstadosVehiculos" ng-click="busquedaVehiculosEstado('asignado')">
						<label class="nav-link etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#" role="tab">Asignados <i class="fas fa-car"></i> <p class="contadoresEstadosVehiculos">{{countAsignados}}</p></label>
					</li>
			        <li class="nav-item contenedorContadoresEstadosVehiculos" ng-click="busquedaVehiculosEstado('disponible')">
						<label class="nav-link etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#" role="tab">Disponibles <i class="fas fa-car-side"></i> <p class="contadoresEstadosVehiculos">{{countDisponibles}}</p></label>
					</li>
					<li class="nav-item contenedorContadoresEstadosVehiculos" ng-click="busquedaVehiculosEstado('no disponible')">
						<label class="nav-link etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#" role="tab">No disponibles <i class="fas fa-tools"></i> <p class="contadoresEstadosVehiculos">{{countNoDisponibles}}</p></label>
					</li>
					<li class="nav-item contenedorContadoresEstadosVehiculos" ng-click="busquedaVehiculosEstado('baja')">
						<label class="nav-link etiquetaContadoresEstadosVehiculos" data-toggle="tab" href="#" role="tab">Bajas <i class="fas fa-times"></i> <p class="contadoresEstadosVehiculos">{{countBajas}}</p></label>
					</li>
				</ul>
        	</div>
        </div>
    </div>
    
    <div class="col-md-2 search-form">
        <input readonly placeholder="Geograf&iacute;a" type="text" onclick="abrirModalGeografiaBuscar()"
            class="search-filtro form-control form-control-sm" style="border-radius: .5em !important;">
    </div>
    <div class="col-md-1">
        <button id="btnBuscar" type="button" class="btn btn-primary btnTotal" ng-click="getVehiculos()">
            <i class="fa fa-search"></i>
        </button>
    </div>
</div>
<div class="container-fluid contenedor">
    <div class="content-fluid">
        <table id="vehiculoTable" class="display table table-hover" cellspacing="0" width="100%">
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