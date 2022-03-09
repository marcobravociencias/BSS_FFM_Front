<div class="col-md-12 ">

    <div class="row">      
        <div class="col-6">
            <div class="content-falla content-tipo-folio">
                <p class="title title-bloque-detalle">Tipo de falla</p>
                <div class="container-fluid ticket-content content-select-ticket-detalle content-select-">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">FALLA</span></div>
                    <div class="container-text-content-detalle">
                        <select ng-class="{'error-captura-input': !ticketSoporteDetalle.fallaTicketD && validacionTicketDetalle}" 
                             class="form-control form-control-sm custom-select inputTicket" id="fallaTicketD" name="fallaTicketD" ng-change="loadCategoriaTicketSoporte('detalle')" ng-model="ticketSoporteDetalle.fallaTicketD">
                            <option value="" disabled >NO HAY SELECCI&Oacute;N</option>
                            <option value="{{fallaTicketD.id}}" ng-repeat="fallaTicketD in listFallasTicketDetalle">
                                {{fallaTicketD.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content content-select-ticket-detalle content-select-">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">CATEGOR&Iacute;A</span></div>
                    <div class="container-text-content-detalle">
                        <select  ng-class="{'error-captura-input': !ticketSoporteDetalle.categoriaTicketD && validacionTicketDetalle}" 
                            class="form-control form-control-sm custom-select inputTicket" id="categoriaTicketD" name="categoriaTicketD" ng-change="loadSubcategoriaTicketSoporte('detalle')" ng-model="ticketSoporteDetalle.categoriaTicketD">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{categoriaTicketD.id}}" ng-repeat="categoriaTicketD in listCategoriasTicketDetalle">
                                {{categoriaTicketD.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content content-select-">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">SUBCATEGOR&Iacute;A</span></div>
                    <div class="container-text-content-detalle">
                        <select ng-class="{'error-captura-input': !ticketSoporteDetalle.subcategoriaTicketD && validacionTicketDetalle}" 
                            class="form-control form-controlt form-control-sm custom-select inputTicket" id="subcategoriaTicketD" name="subcategoriaTicketD" ng-model="ticketSoporteDetalle.subcategoriaTicketD">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="{{subcategoriaTicketD.id}}"  ng-repeat="subcategoriaTicketD in listSubcategoriasTicketDetalle">
                                {{subcategoriaTicketD.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="content-checkbox content-dictamen-folio">
                <p class="title title-bloque-detalle">Dictamen de folio</p>
                <div class="container-fluid ticket-content opciones-checkbox-dictamen">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">VISITA NECESARIO</span></div>
                    <div class="container-text-content-detalle form-check form-switch">
                        <input class="form-check-input" type="checkbox">
                    </div>
                </div>
                <div class="container-fluid ticket-content opciones-checkbox-dictamen" ng-repeat="item in accionesDinamicasDetalle track by $index">
                    <div class="container-text-title-detalle titulo-acciones-dinamicas"><span class="text-tile-ticket">{{item.descripcion.toUpperCase()}}</span></div>
                    <div class="container-text-content-detalle form-check form-switch">                        
                        <input ng-if="$index != 1" class="form-check-input" ng-model="item"  type="checkbox">
                        <input ng-if="$index == 1" ng-change="mostrarFormularioNuevoEquipo()" ng-model="item" class="form-check-input" type="checkbox">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="content-principal">
                <!--pre>{{editTicket|json}}</pre-->
                <p class="title title-bloque-detalle">Datos principales - Soporte</p>
                <div class="container-fluid vehiculo-content text-info-ot-text">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">OT</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.idOrden || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Folio</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.idTicket || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. empleado</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.numEmpleadoIng  || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Num. usuario</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.usuarioFfmInge  || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">T&eacute;cnico</span></div>
                    <div class="container-text-content-detalle"> <span class="text-content-vehiculo ng-binding" 
                        ng-bind="editTicket.nombreEmpleadoIng+' '+editTicket.apellidoPaEmpleadoIng+' '+editTicket.apellidoMaEmpleadoIng   || 'Sin dato'">222119</span> </div>
                </div>
              
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo orden</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.descripcionOrden || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Tipo negocio</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.nombreUnidadNegocio || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Regi&oacute;n</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.regionText || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Ciudad</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.ciudadText || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Distrito</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.distritoText || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Zona</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.zonaText || 'Sin dato'">222119</span> </div>
                </div>
                <div class="container-fluid vehiculo-content">
                    <div class="container-text-title-detalle"><span class="text-tile-vehiculo">Cl&uacute;ster</span></div>
                    <div class="container-text-content-detalle"><span class="text-content-vehiculo ng-binding" ng-bind="editTicket.clusterText || 'Sin dato'">222119</span> </div>
                </div>
                
            </div>
        </div>
    </div>    
    <hr>
    <div class="row">
        <div class="col-6">
            <form ng-show="agregarNuevoEquipoContent">
                <div class="form-row">
                    <div class="form-group col-md-2">
                        <label class="label-nuevo-equipo" for="selectTipoEquipoAdd">Tipo</label>
                        <select ng-class="{'error-captura-input': !tipoEquipoCambio  && isEvaluarNuevoEquipo}" ng-model="tipoEquipoCambio" class="input-filtro form-control form-control-sm " id="selectTipoEquipoAdd" >
                            <option value="">Seleccione ...</option>
                            <option value="stb">STB</option>
                            <option value="ont">ONT</option>                
                        </select>
                      </div>
                  <div class="form-group col-md-2">
                    <label class="label-nuevo-equipo" for="noSerieAnteriorEquipo">No. Serie</label>
                    <input ng-class="{'error-captura-input': !viejoEquipo.noSerie && isEvaluarNuevoEquipo}" ng-model="viejoEquipo.noSerie" type="text" class="form-control form-control-sm" id="noSerieAnteriorEquipo" placeholder="">
                  </div>                  
                  <div class="form-group col-md-2">
                    <label class="label-nuevo-equipo" for="noMacViejoEquipo">MAC</label>
                    <input ng-class="{'error-captura-input': !viejoEquipo.mac && isEvaluarNuevoEquipo}" ng-model="viejoEquipo.mac" type="text" class="form-control form-control-sm" id="noMacViejoEquipo" placeholder="">
                  </div>
                  <div class="form-group col-md-2">
                    <label class="label-nuevo-equipo" for="noSerieNuevoEquipo">No. Serie</label>
                    <input ng-class="{'error-captura-input': !nuevoEquipo.noSerie && isEvaluarNuevoEquipo}" ng-model="nuevoEquipo.noSerie" type="text" class="form-control form-control-sm" id="noSerieNuevoEquipo" placeholder="">
                  </div>
                  <div class="form-group col-md-2">
                    <label class="label-nuevo-equipo" for="noMacNuevoEquipo">MAC</label>
                    <input ng-class="{'error-captura-input': !nuevoEquipo.mac && isEvaluarNuevoEquipo}" ng-model="nuevoEquipo.mac" type="text" class="form-control form-control-sm" id="noMacNuevoEquipo" placeholder="">
                  </div>
                  <div class="form-group col-md-2">
                    <button ng-click="agregarRegistroCambioEquipo()" id="agregarnuevoEquivo" type="button" class="btn btn-sm btn-primary btn-lg btn-floating">
                        <i class="fas fa-plus"></i>
                    </button>
                  </div>                 
                </div>           
            </form>
            <table ng-show="agregarNuevoEquipoContent" id="table-cambio-equipo" class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">Tipo </th>
                    <th scope="col">No. serie</th>
                    <th scope="col">MAC</th>
                    <th scope="col">No serie</th>
                    <th scope="col">MAC</th>
                    <th scope="col"></th>

                  </tr>
                </thead>
                <tbody>
                  <tr ng-repeat="itemRegistro in listadoNuevoViejosEquipo track by $index">
                    <td ng-bind="itemRegistro.tipoEquipoCambio" ></td>
                    <td ng-bind="itemRegistro.viejo.noSerie" ></td>
                    <td ng-bind="itemRegistro.viejo.mac" ></td>
                    <td ng-bind="itemRegistro.nuevo.noSerie" ></td>
                    <td ng-bind="itemRegistro.nuevo.mac" ></td>
                    <td>
                        <button ng-click="eliminarRegistro($index)"  type="button" class="eliminar-registro-cambioequipo btn btn-sm btn-primary ">
                            <i class="fas fa-times"></i>
                        </button>
                    </td>
                  </tr>
                  <tr ng-show="listadoNuevoViejosEquipo.length <= 0">
                      <td class="col-listadoregistros" colspan="6">Sin registros</td>
                  </tr>                   
                </tbody>
              </table>
        </div>
        <div class="col-6">
            <div class="content-falla">
                <div class="container-fluid ticket-content content-select-ticket-detalle">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">ESTATUS TICKET</span></div>
                    <div class="container-text-content-detalle">
                        <select ng-class="{'error-captura-input': !ticketSoporteDetalle.estatus && validacionTicketDetalle}" class="form-control form-controlt form-control-sm custom-select" name="estatusTicketDetalle" id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.estatus">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option value="1" selected>ESCALAR</option>
                            <option value="2" selected>CANCELAR</option>
                            <option value="3" selected>COMPLETADA</option>
                            <option value="4" selected>REASIGNAR</option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content content-select-ticket-detalle" ng-show="ticketSoporteDetalle.estatus === '1'">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">ESTADO</span></div>
                    <div class="container-text-content-detalle">
                        <select  ng-class="{'error-captura-input': !ticketSoporteDetalle.estado && validacionTicketDetalle}" class="form-control form-controlt form-control-sm custom-select" name="estatusTicketDetalle" id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.estado" ng-change="motivosSelectDetalle()">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option ng-value="item.id" ng-repeat="item in estadoEscalamientoDetalle">
                                {{item.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content content-select-ticket-detalle" ng-show="ticketSoporteDetalle.estatus === '1'">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">MOTIVO</span></div>
                    <div class="container-text-content-detalle">
                        <select ng-class="{'error-captura-input': !ticketSoporteDetalle.motivo && validacionTicketDetalle}" class="form-control form-controlt form-control-sm custom-select" name="estatusTicketDetalle" id="estatusTicketDetalle" ng-model="ticketSoporteDetalle.motivo">
                            <option value="" disabled selected>NO HAY SELECCI&Oacute;N</option>
                            <option ng-value="item.id" ng-repeat="item in motivoEscalamientoDetalle">
                                {{item.descripcion}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="container-fluid ticket-content">
                    <div class="container-text-title-detalle"><span class="text-tile-ticket">COMENTARIOS</span></div>
                    <div class="container-text-content-detalle">
                        <textarea ng-class="{'error-captura-input': !editTicket.comentariosReporte && validacionTicketDetalle}" ng-model="editTicket.comentariosReporte" class="form-control" ></textarea>
                    </div>
                </div>
                <button ng-click="guardarTicketDetalle()" type="button" class="btn btn-primary btn-editar-cambios ripple-surface">
                    <b >Guardar cambios </b>        
                </button>
                <button ng-click="cerrarDetalleTicket()" type="button" class="btn cerrar-cancelar-btn  btn-ligh" data-mdb-dismiss="modal">
                    Cancelar
                </button>
            </div>
        </div>
    </div>       
 


</div>