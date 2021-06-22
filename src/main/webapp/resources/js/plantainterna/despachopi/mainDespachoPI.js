var fechaActual = new Date();

const FECHA_HOY_DATE=new Date()
var permiso_reasigna=true;
var permiso_asigna=true;
var dataTableOtsPendientes;
var fullcalendarAsignadas;
var app = angular.module('despacho',[] );
var triggerOperarioKeyup;

var mapubicacionoperario;
const HEIGTH_PADDING_TABLE=270;
const MILISEGUNDOS_ALERTAS=(1000*60)*3;
function logerror(mensaje){
    console.log('%c '+mensaje, 'background: red; color: white');
}
function logsuccess(mensaje){
    console.log('%c '+mensaje, 'background: green; color: white');
}
function logwarning(mensaje){
    console.log('%c '+mensaje, 'background: orange; color: white');
}
function logprocess(mensaje){
    console.log('%c '+mensaje,'background: #7716fa; color: white' )
}
app.controller('despachoController', ['$scope', 'mainDespachoService', 'mainAlertasService',
                                       function ($scope, mainDespachoService, mainAlertasService) {
    
    app.filtrosDespachoPrincipal($scope,mainDespachoService)
    app.modalDespachoPrincipal($scope,mainDespachoService)
    app.mapasControllerDespachoPI($scope,mainDespachoService)
    app.alertasDespachoPrincipal($scope,mainAlertasService)
    
    $scope.isCargaTecnicosDisponibles=false;
    $scope.isCargaOtsPendientes=false;
    $scope.isCargaOtsAsignadas=false;
    $scope.renderCalendario=false ;
    
    $scope.isConsultarConteoAlertas=false
    
    $scope.filtrosGeneral={}
    $scope.listadoOtsPendientes=[]  
    $scope.listadoTecnicosGeneral=[];                                   
    $scope.listadoOtsAsignadas=[]
    $scope.listadoConteoAlertasTipo=[]
   
    $scope.listadoHistoricoOt=arrayhistorico;
    $scope.listadoHistoricoOt[0].Id_Estatus=1
    $scope.listadoHistoricoOt[1].Id_Estatus=2
    $scope.listadoHistoricoOt[2].Id_Estatus=3
    $scope.listadoHistoricoOt[3].Id_Estatus=4
    $scope.listadoHistoricoOt[4].Id_Estatus=5

    $scope.infoOtDetalle={}

    $scope.abrirModalGeografia=function(){
        $("#modal-jerarquia-filtro").modal('show')
    }

    triggerOperarioKeyup=function(event){
        console.log('triggering')
        if (event.keyCode != 38 && event.keyCode != 40) {
            console.log($scope.buscarTecnicoInput )
            $scope.buscarTecnicoInput= $(".buscar-input-operario").val()          
            $scope.buscarTecnicoCalendar();
        }
    }
   
    $scope.buscarTecnicoInput=''
    $scope.buscarTecnicoCalendar=()=>{    
        $('#calendar').fullCalendar('destroy');    
        let copyoperarios=angular.copy( $scope.listadoTecnicosGeneral )  
        if ( $scope.buscarTecnicoInput && $scope.buscarTecnicoInput.length >= 2 ) {                      
            let filterOperarios = [];
            angular.forEach(copyoperarios,function(tecnico,index){                
                if( tecnico.nombreCompleto.toUpperCase().includes( $scope.buscarTecnicoInput.toUpperCase()  )   ||
                    tecnico.usuarioFFM.toUpperCase().includes(     $scope.buscarTecnicoInput.toUpperCase() )   ){
                    filterOperarios.push(tecnico);
                }
            })   
            copyoperarios=angular.copy(filterOperarios)        
        }     
        $scope.initFullCalendar(copyoperarios)
    }
    angular.element(document).ready(function () {
        $("#li-despacho-navbar").addClass('active')
          
        $('#calendar-next-back').datepicker({
            format : 'dd/mm/yyyy',
            language : 'es',
            todayHighlight : true,
            //startDate : FECHA_HOY_DATE,
            //endDate : moment(FECHA_HOY_DATE).add('days', 2).toDate()
        }).on('changeDate',function(e){   
            console.log("cambiando datos fecha")
            let textCalendar=$('#calendar-next-back').val()
            $scope.fechaFiltradoCalendar= textCalendar;                 
            $scope.$apply()

            $scope.refrescarBusqueda()
        }) ;
        $('#calendar-next-back').datepicker('update',FECHA_HOY_DATE);
        

        $('#filtro-fechainicio' ).val($scope.fechaInicioFiltro )
        $("#filtro-fechafin").val(  $scope.fechaFinFiltro )
        $("#filtro-fechainicio").datepicker({ 
            format: 'dd/mm/yyyy',
            language : 'es',
            todayHighlight : true
        }).on('changeDate',function(e){
            $scope.fechaInicioFiltro=$( '#filtro-fechainicio' ).val()
            $scope.$apply();
        });
        $("#filtro-fechafin").datepicker({ 
            format: 'dd/mm/yyyy',
            language : 'es',
            todayHighlight : true
        }).on('changeDate',function(e){
            $scope.fechaFinFiltro=$( '#filtro-fechafin' ).val()
            $scope.$apply();
        });
        $('.drop-down-filters').on("click.bs.dropdown", function (e) {
            e.stopPropagation();
        });

        $('#fecha-calendarizado').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true,
            startDate :  moment(FECHA_HOY_DATE).add('days', 8).toDate()
        });
        $('#fecha-calendarizado').datepicker('update',   moment(FECHA_HOY_DATE).add('days', 8).toDate() );


        $('.datepicker_reagenda').datepicker({
            format : 'dd/mm/yyyy',
            autoclose : true,
            language : 'es',
            todayHighlight : true,
            startDate : FECHA_HOY_DATE,
            endDate :  moment(FECHA_HOY_DATE).add('days', 7).toDate() ,
        });
        $('.datepicker_reagenda').datepicker('update',FECHA_HOY_DATE);
    });

    $scope.initFullCalendar = function(tecnicosParams){
       console.log( $scope.listadoOtsAsignadas)
        fechaActualFormat = parseInt(fechaActual.getHours())-2 + ':' + fechaActual.getMinutes() + ':00';
        fullcalendarAsignadas=$('#calendar').fullCalendar({
            height: screen.availHeight-250,
            nowIndicator : true,
            defaultDate:moment(FECHA_HOY_DATE).format("YYYY/MM/DD") ,
            slotLabelFormat : 'hh:ss(:mm) a',
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            editable: true,
            eventDurationEditable : false,
            eventOverlap : false,
            droppable: true,
            aspectRatio: 1.3,
            defaultView: 'timelineDay',
            minTime: "00:00:00",
            maxTime: "24:00:00",
            businessHours : {
                start : '00:00',
                end : '24:00',
                dow : [ 1, 2, 3, 4, 5, 6, 0 ]
            },
            scrollTime : fechaActualFormat,
            views: {
                timelineThreeDays: {
                    type: 'timeline',
                    duration: { days: 3 }
                }
            },
            eventResize: function(event, delta, revertFunc) {
            },
            resourceLabelText: 'T\u00E9cnicos',
            resources: tecnicosParams,
            events: $scope.listadoOtsAsignadas,
            drop: function(date, jsEvent, ui, resourceId) {		
                fecha_asignacion = date.format();                
            },
            eventReceive: function(event) {
                console.log(event.objectevent)
                let otinfo=event.objectevent
                otinfo.fechahoraasignacion=fecha_asignacion

                let data_tecnico =$scope.listadoTecnicosGeneral.find((e)=> e.idTecnico== parseInt(event.resourceId))            
                if($scope.validate_time_asignacion(fecha_asignacion)){
                    if($scope.validate_status_tecnico(data_tecnico.idEstatusTecnico)){
                        $scope.abrirModalAsignacion(otinfo, data_tecnico);
                    }else{
                        refresh();
                    }
                }else{
                    refresh();
                }
            },
            eventDrop: function(event) { 
                console.log(event.objectevent)
                let data_tecnico =$scope.listadoTecnicosGeneral.find((e)=> e.idTecnico== parseInt(event.resourceId))
                if($scope.validate_time_asignacion(event.start.format())){
                    if($scope.validate_status_tecnico(data_tecnico.status)){
                        $scope.modal_reasigna_ot(event, data_tecnico);
                    }else{
                        refresh();
                    }
                }else{
                    refresh();
                }
            },
            eventAfterAllRender:function(event){

                $scope.setPixelesTableWrapper()


                $( "th.fc-widget-header div div.fc-cell-content " ).html(`                    
                    <div class="row">
                        <div class="col-8">
                            <div class="input-group input-group-sm content-seach-group  ">
                                <input type="text" class="form-control form-control-sm buscar-input-operario" placeholder="Buscar OT" onkeyup="triggerOperarioKeyup(event);" >
                                <span class="search-icon-operario-busq fa fa-search" id="buscar-operario"></span>
                            </div>
                        </div>
                    </div>   
                    <i class="icon-menu-tecnicosdisp fas fa-align-center"></i>          
                    <select class='filterStatusOP' style="display:none;" id='idSelectStatusCSV' onchange='guardaFiltroOpEstatus(this);'>
                        <option value=0 >Todos</option>
                        <option value=1>En linea</option>
                        <option value=2>En linea: dando seguimiento a una ot</option>
                        <option value=3>En Linea: ots asignadas, ninguna puesta en marcha</option>
                        <option value=4>Descanso, comida o vacaciones</option>
                    </select>
                `);
                //console.log("#termina de pintar")
                $(".buscar-input-operario").val( $scope.buscarTecnicoInput )
                $(".buscar-input-operario").focus()
                logsuccess('Cargo correctamente')
                $scope.isCargaOtsAsignadas=true;
                $scope.$digest()
                

                $('#calendar').fullCalendar('gotoDate', moment($scope.fechaFiltradoCalendar,'DD/MM/YYYY').toDate() );

            }
        });
    }
    $scope.consultarTecnicosDisponibiles=function(){
        $scope.listadoTecnicosGeneral=[]
        $scope.isCargaTecnicosDisponibles=false;
        mainDespachoService.consultarTecnicosDisponibiles().then(function success(response) {                        
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        if( response.data.result.detalleTecnicos ){
                            $scope.isCargaTecnicosDisponibles=true;
                            $scope.listadoTecnicosGeneral=response.data.result.detalleTecnicos
                        }else{
                            toastr.info( 'No se encontraron operarios disponibles' );                
               
                        }
                    }else{                        
                        toastr.info( 'No se encontraron tecnicos ' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de tecnicos' );                
            }
            $scope.isCargaTecnicosDisponibles=true;
            $scope.validarLoadTecnicosOtsAsignadas()
        })
    }

    $scope.consultarConteoAlertasPI=function(){
        var params =  {
            "Fecha_fin":"25/03/2021",
            "Fecha_inicio":"25/02/2021",
            "Id_subIntervencion":"48,35,49,50,51,116,1360,55,111,106,107,112,115,163,164,258,236,291,292,259,157,158,159,204,290,260,146,211,212,261,148,149,300,301,302,262,251,252,253,254,287,288,289,263,303,304,305,306,264,269,298,299,265,150,160,270,286,293,294,295,297,274,144,145,237,307,275,244,271,272,273,308,276,238,277,142,152,278,143,147,151,243",
            "Id_turno":"1,2,3",
            "Id_cluster":"176,596,827,848,592,538,826,847,851,164,597,598,594,825,829,832,852,591,831,528,823,828,824,535,529,175,1,830,846,525,595,593,533,532,850,849",
            "IDSDESPAHCO":"64"
        }
        mainDespachoService.consultarConteoAlertasPI(params).then(function success(response) {
            $scope.listadoConteoAlertasTipo=conteoOtsDespacho.Alertas                                            

            console.log(response);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                        logprocess("############## consultando ")
                       //$scope.listadoOtsPendientes=otspendientes     
                    }
                }
            }
        })
    }
    $scope.validate_time_asignacion = function(fecha){
        var fecha_asigna = new Date(fecha);
        if(fechaActual > fecha_asigna){
            alertify.set('notifier','position', 'top-right',{ delay: 4000 });
            alertify.warning("Horario no permitido, por favor asigne en otra hora.");
            return false;
        }else{
            return true;
        }
    }
    $scope.validate_status_tecnico = function(status){
        var result = true;
        if(status == 3  || status == 5 || status == 6 || status == 7 || status == 8){
            switch(status){
                case 3:
                        alertify.set('notifier','position', 'top-right',{ delay: 4000 });
                        alertify.warning("El t\u00E9cnico se encuentra en d\u00EDa libre.");
                    break;
                case 5:
                        alertify.set('notifier','position', 'top-right',{ delay: 4000 });
                        alertify.warning("El t\u00E9cnico se encuentra de Vacaciones.");
                    break;
                case 6:
                        alertify.set('notifier','position', 'top-right',{ delay: 4000 });
                        alertify.warning("El t\u00E9cnico se encuentra en Almacen.");
                    break;
                case 7:
                        alertify.set('notifier','position', 'top-right',{ delay: 4000 });
                        alertify.warning("El t\u00E9cnico se encuentra Fuera de servicio.");
                    break;
                case 8: 
                        alertify.set('notifier','position', 'top-right',{ delay: 4000 });
                        alertify.warning("El t\u00E9cnico se encuentra como apoyo t\u00E9cnico.");
                    break;
                default:
                        alertify.set('notifier','position', 'top-right',{ delay: 4000 });
                        alertify.error("Error no previsto, por favor intentelo de nuevo.");
                    break;
            }
            result = false;
        }
	    return result;
    }
    $scope.consultarCatalogosDespacho = function() {
        var params = {
            "param1": "6",
            "param2": "1",
            "param3": "3"
        }        
        mainDespachoService.consultarCatalogosPlantaInterna(params).then(function success(response) {
            console.log(response);
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.result === '0') {
                        $scope.filtrosGeneral=response.data.result.info[0];     
                        $scope.filtrosGeneral.General_filtros.filtros.map(function(e){
                            e.checkedOpcion=true
                            e.subfiltros.map(function(j){
                                j.checkedOpcion=true
                            })                            
                            return e
                        })
                        let generalInfo=[];

                        let arbolniveles=$scope.filtrosGeneral.General_Arbol.arbol;
                        let arrayPrimerNivel=arbolniveles.filter(function(el){return el.Nivel==='1' })
                        angular.forEach(arrayPrimerNivel,function(elemento,index){        
                            let elemGeneral={"text":elemento.ID_Description,"children":[]} 
                            let arraySegundoNivel=arbolniveles.filter(function(el){return el.Nivel==='2' && el.ID_Padre === elemento.ID  })

                            angular.forEach(arraySegundoNivel,function(elementoNiveldos,index){     
                                let itemSegundonivel={"text":elementoNiveldos.ID_Description,"children":[]}  
                                elemGeneral.children.push(itemSegundonivel)

                                let arrayTercerNivel=arbolniveles.filter(function(el){return el.Nivel==='3' && el.ID_Padre === elementoNiveldos.ID  })
                                angular.forEach(arrayTercerNivel,function(elementoNivelTres,index){     
                                    itemSegundonivel.children.push({"text":elementoNivelTres.ID_Description })
                                })
                            })
                            generalInfo.push(elemGeneral)
                        })

                        $scope.filtrosGeneral.turnosdisponibles=[{'id':1,'descripcion' :'Matutino'},{'id':2,'descripcion' :'Vespertino'} ]
                        console.log($scope.filtrosGeneral)
                       // $scope.datafiltersArbol.push({"text":"Total play","children":generalInfo})
                       $('#jstree-proton-3').jstree({
                            'plugins': ["wholerow", "checkbox"],
                            'core': {
                            'data': [{"text":"TOTAL PLAY","children":generalInfo}],
                            'themes': {
                                'name': 'proton',
                                'responsive': true,
                                "icons":false

                            }
                            }
                        });
                    
                        //swal.close();
                    } else {
                        //swal.close();
                    }
                } else {
                    //swal.close();
                }
            } else {
                //swal.close();
            }
        }, function error(response) {
            //swal.close()
        });
    }

    $scope.randomIntFromInterval=function() { // min and max included 
        return Math.floor(Math.random() * (8 - 0 + 1) + 0)
    }
    $scope.consultarOtsPendientes = function() {

        
        $scope.listadoOtsPendientes=[]        
        $scope.isCargaOtsPendientes=false;
        var params =  {
            "fechaInicio": "2021-06-08",
            "fechaFin": "2021-06-11",
            "idSubIntervenciones": [              
                1,
                2,
                365,100
            ],
            "idTurnos": [
              1,
              2
            ],  
            "idEstatus": [
              1
            ],
            "idClusters": [
              1,
              2,
              365
            ]
        }
        if(dataTableOtsPendientes)
            dataTableOtsPendientes.destroy()
        
        mainDespachoService.consultarOrdenesPendientesDespacho(params).then(function success(response) {
            console.log(response);
            $("#table-ot-pendientes tbody").empty()
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        if( response.data.result.detalleOrdenes ){
                                                                               
                            $scope.isCargaOtsPendientes=true;
                            $scope.listadoOtsPendientes=response.data.result.detalleOrdenes
                            let indexot=0
                            $scope.listadoOtsPendientes.map((e)=>{
                                indexot++
                                e.claveCliente='02122102131091209'
                                e.colorOrden=arrayColors[$scope.randomIntFromInterval()]
                                e.nombreCliente='Guillermo Palacios Zavala'
                                e.statusOtPendiente='PENDIENTE'
                                e.folioOrden='OS-292812'
                                e.folioOrden='OS-292812'
                                e.telefonoCliente='7771201288'
                                e.isConfirmado=indexot%2==0 ? true : false
                                return e    
                            })
                        
                            let tableelemetn=''
                            angular.forEach($scope.listadoOtsPendientes,function(otpendiente,index){
                                
                                tableelemetn=`
                                <tr>
                                    <td>  
                                        <div id="idotpendiente${otpendiente.idOrden}" class="fc-event  ot-pendiente-event efecto ui-draggable ui-draggable-handle ">
                                            <div class="header-otpendeinte">
                                                <div class="top-title-ot">
                                                    <div class="content-top-element bars-content">
                                                        <i onclick="abrirModalDetalleOtPendiente(${otpendiente.idOrden})" class="icono-ot-pendeinte fa fa-bars"></i>
                                                        <h5  class="title-otpendeinte" >${otpendiente.claveCliente}</h5>
                                                    </div>
                                                    <div style="border:1px solid ${otpendiente.colorOrden}; color:${otpendiente.colorOrden}"  class="content-top-element intervencino-elemn intervencion-title"> 
                                                        ${otpendiente.descipcionTipoOrden}
                                                    </div>
                                                    <div class="content-top-element confirmacion-elemn switchpendiente">
                                                        <input ${otpendiente.isConfirmado ? 'checked':''} onchange="abrirModalConfirmacionDesconfirmacion(this,${otpendiente.idOrden})" class="checkbox-confirmacion" type="checkbox" id="switch-${otpendiente.idOrden}" /><label class="checkbox-confirmacion-label" for="switch-${otpendiente.idOrden}">Toggle</label>
                                                    </div>
                                                </div>
                                                <div class="posiciondos">
                                                    <div class="content-dos-element ">
                                                        <h5  class="title-nombrecliente" ng-bind="otpendiente.nombreCliente"></h5>
                                                    </div>
                                                </div>
                                                <div class="positiontres">
                                                    <div class="content-posiciontres">
                                                        <p class="text-otpendiente-tres">FOLIO:</p>
                                                        <p class="text-otpendiente-tres" >${otpendiente.folioOrden}</p>
                                                    </div>
                                                    <div class="content-posiciontres">
                                                        <p class="text-otpendiente-tres">OT:</p>
                                                        <p class="text-otpendiente-tres" >${otpendiente.idOrden}</p>
                                                    </div>
                                                </div>
                                                <div class="info-content-otpendeinte">
                                                    <div class="line-content-infootpend">
                                                        <b class="title-ciudad">Cita:</b>
                                                        <span class="content-ciudadotpend" >${otpendiente.fechaAgenda}  ${otpendiente.horaAgenda}  </span>

                                                        <b class="title-ciudad">Turno:</b>
                                                        <span class="content-ciudadotpend" >${otpendiente.descripcionTurno}</span>

                                                        <b class="title-ciudad">Geograf&iacute;a.</b>
                                                        <span class="content-ciudadotpend" >${otpendiente.descripcionGeografia}</span>
                                                        
                                                        <span class="content-telefonootpend" >${otpendiente.telefono}</span>
                                                    </div>                                               
                                                </div>
                                                <div class="info-content-otpendeinte">
                                                    <div class="line-content-infootpend">
                                                        <b class="title-ciudad">Dir.</b>
                                                        <span class="content-ciudadotpend">${otpendiente.direccion}</span>
                                                    </div>                                             
                                                </div>
        
                                            </div>
                                            <div class="footer-otpendiente">
                                                <i class="fas fa-phone telefono-icon-pendiente"></i>
                                                <span class="telefono-text-otpendiente" >${otpendiente.telefonoCliente}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>	
                                `
                                $("#table-ot-pendientes tbody").append(tableelemetn) 
                            })
                          
                        }else{                            
                            toastr.info( 'No se encontraron OTS pendientes' );                
                        }
                    }else{                      
                        toastr.warning( 'No se encontraron OTS pendientes' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de OTS pendientes' );                
            }
            $scope.inicializarsTableOtsPendientes()
            $scope.isCargaOtsPendientes=true;

        })
    }
    $scope.setPixelesTableWrapper=function(){
        let pixelescon=$(window).height()-HEIGTH_PADDING_TABLE;
        //$('#table-ot-pendientes_wrapper').attr('style','max-height: '+pixelescon+'px;min-height: '+pixelescon+'px;overflow-x:hidden;overflow-y: scroll;') ;/****/
    }
    $scope.inicializarsTableOtsPendientes=function(){               
        $('.ot-pendiente-event').each(function(index) {	
            let otpendiente=$scope.listadoOtsPendientes[index]   
            $(this).data('event', {
                objectevent: otpendiente ,
                stick: true 			
            });		
            $(this).draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0 ,
                drag: function( event, ui ) {
                    $('#table-ot-pendientes_wrapper').attr('style','') ;
                },
                stop: function( event, ui ) {
                    $scope.setPixelesTableWrapper()
                } 
            });
	    });	

        dataTableOtsPendientes=$('#table-ot-pendientes').DataTable({
            info: false,
            pageLength : 4,
            language: {
                    zeroRecords: "No se encontraron OT\u00B4s",
                    infoEmpty: "No se encontro la OT",
                    infoFiltered: "(OT no encontrada)",
                    paginate: {
                    first:      '<i class="fa fa-fast-backward"></i>',
                    last:       '<i class="fa fa-fast-forward"></i>',
                    next:       ' ',
                    previous:   ' '
                }
            },
            dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
            language : {
                "sProcessing" : "Procesando...",
                "sLengthMenu" : "Mostrar _MENU_ registros",
                "sZeroRecords" : "No se encontraron resultados",
                "sEmptyTable" : "Ning\u00fana OT disponible ",
                "sInfo" : "",
                "sInfoEmpty" : "",
                "sInfoFiltered" : "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix" : "",
                "sSearch" : "Buscar:",
                "sUrl" : "",
                "sInfoThousands" : ",",
                "sLoadingRecords" : "<br/><br/>Cargando...<br/><br/>",
                "oPaginate" : {
                    "sFirst" : "Primero",
                    "sLast" : "\u00daltimo",
                    "sNext" : "Siguiente",
                    "sPrevious" : "Anterior"
                },
                "oAria" : {
                    "sSortAscending" : ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending" : ": Activar para ordenar la columna de manera descendente"
                }
            }
        })
                                      
       let arrayBusqueda=[];
       angular.forEach($scope.listadoOtsPendientes,function(e){
            arrayBusqueda.push( e.idOrden   )
            arrayBusqueda.push( e.claveCliente  )
            arrayBusqueda.push( e.folioOrden  )
       })
       $scope.iniciarTypeAhead( arrayBusqueda )
    }
    $scope.buscarOtPendiente=function(event){
        if (event.which === 13){
            console.log("")   
            $scope.buscarOtPendienteText() 
        }   
        if($("#buscar-ot-pendiente").val().trim() === '')
            $scope.buscarOtPendienteText()
    }
    $scope.buscarOtPendienteText=function(){
        let textbusqeuda= $("#buscar-ot-pendiente").val()
        dataTableOtsPendientes.search(textbusqeuda).draw()   

        setTimeout(function(){
            if(dataTableOtsPendientes.page.info().recordsDisplay <= 0 ){
                $scope.consultarLocalizacionOtDespacho(textbusqeuda)
            }
        },300);
    }

    $scope.iniciarTypeAhead = function(listadoSearch){
        
        $('#buscar-ot-pendiente').typeahead('destroy');
        $('#buscar-ot-pendiente').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
            },
            {
            name: 'OT',
            displayKey: 'value',
            source: $scope.substringMatcher(listadoSearch)
        });
    }
    $scope.substringMatcher=function(strs){
        return function findMatches(q, cb) {
            var matches, substrRegex;
               matches = [];
               substrRegex = new RegExp(q, 'i');
               $.each(strs, function(i, str) {
                 if (substrRegex.test(str)) {
                   matches.push({ value: str });
                 }
               });            
               cb(matches);
        }
    }
   
    $scope.consultarOrdenesTrabajoAsignadasDespacho = function() {
        $scope.isCargaOtsAsignadas=false;
        $scope.listadoOtsAsignadas=[]
    
       // $('#filtro-fechainicio' ).val($scope.fechaInicioFiltro )
       // $("#filtro-fechafin").val(  $scope.fechaFinFiltro )
      
        let dateSeparado=$scope.fechaFiltradoCalendar.split('/')
      
        let formatDateInicio=dateSeparado[2]+'-'+dateSeparado[1]+'-'+dateSeparado[0]


        var params =  {
            "fechaInicio":formatDateInicio,
            "fechaFin":formatDateInicio    
        }
        mainDespachoService.consultarOrdenesaAsignadasDespacho(params).then(function success(response) {     
            console.log(response);            
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        if( response.data.result.detalleOrdenesAsignadas ){
                            $scope.listadoOtsAsignadas=response.data.result.detalleOrdenesAsignadas
                            let i=0
                            $scope.listadoOtsAsignadas.map((e)=>{
                                i++
                                e.unidadNegocio =(i%2== 0) ?1 : 2
                                //e.idTecnico=i
                                e.id=e.idTecnico
                               // e.fechaInicio=formatDateFin
                               // e.fechaFin=formatDateFin
                                //e.horaInicio='15:00';
                                //e.horaFin='18:20';
                                e.colorOrden=arrayColors[$scope.randomIntFromInterval()]
                                e.start=e.fechaInicio+' '+e.horaInicio
                                e.end=e.fechaFin+' '+e.horaFin
                                return e
                            })
                            console.log("##########3----")
                            console.log($scope.listadoOtsAsignadas)
                        }else{                            
                            toastr.info( 'No se encontraron OTS asignadas' );                
                        }
                    }else{                      
                        toastr.warning( 'No se encontraron OTS asignadas' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de OTS pendientes' );                
            }
            $scope.isCargaOtsAsignadas=true;
            $scope.validarLoadTecnicosOtsAsignadas()
        }, function error(response) {
           // swal.close()
        });
    }
    $scope.refrescarBusqueda=function(){ 
        $('#calendar').fullCalendar('destroy');
        //$('#calendar-next-back').datepicker('update',FECHA_HOY_DATE);

        $scope.isCargaOtsPendientes=false;
        $scope.isCargaOtsAsignadas=false;
        $scope.renderCalendario=false  

        $scope.consultarTecnicosDisponibiles()
        $scope.consultarOrdenesTrabajoAsignadasDespacho()
        $scope.consultarOtsPendientes()
        $scope.consultarConteoAlertasPI()
    }
    $scope.validarLoadTecnicosOtsAsignadas=function(){
        if( $scope.isCargaTecnicosDisponibles && $scope.isCargaOtsAsignadas){
            $scope.renderCalendario=true ;
            //Se agregan ots a los tecnicos
            $scope.listadoOtsAsignadas.map((e)=>{
                e.resourceId=e.idTecnico
                return e;
            })
            $scope.listadoTecnicosGeneral.map(function(e){
                e.listadoOts=$scope.listadoOtsAsignadas.filter(function(ot){return ot.idTecnico === e.idTecnico})
                e.cantidadOts=e.listadoOts.length
                e.id=e.idTecnico
                e.nombreCompleto=e.nombre+' '+e.apellidoPaterno+' '+e.apellidoMaterno
                return e; 
            })
            setTimeout(function(){                
                $scope.initFullCalendar( $scope.listadoTecnicosGeneral )
            },500)
        }       
    }
    setInterval(function(){
        console.log("intervalo")
        $scope.consultarConteoAlertasPI()
    }, MILISEGUNDOS_ALERTAS);


    $scope.getCatControlleripoOrdenConfigDespacho=function(){

        mainDespachoService.consultarCatalogoTipoOrdenConfigDespacho().then(function success(response) {     
            console.log(response);            
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        console.log("######")
                        console.log(response.data.result)
                    }else{                      
                        toastr.warning( 'No se encontraron catalogos turnos' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }
        }, function error(response) {
           // swal.close()
        });
    }
    $scope.getCatControlleripoOrdenUsuarioDespacho=function(){

        mainDespachoService.consultarCatalogoTipoOrdenUsuarioDespacho().then(function success(response) {     
            console.log(response);            
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        console.log("######")
                        console.log(response.data.result)
                    }else{                      
                        toastr.warning( 'No se encontraron catalogos turnos' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }
        }, function error(response) {
           // swal.close()
        });
    }
    $scope.getCatControllerrafiaUsuarioDespacho=function(){

        mainDespachoService.consulCatalogoGeografiaUsuarioDespacho().then(function success(response) {     
            console.log(response);            
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        console.log("######")
                        console.log(response.data.result)
                    }else{                      
                        toastr.warning( 'No se encontraron catalogos turnos' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }
        }, function error(response) {
           // swal.close()
        });
    }
    $scope.getCatControllerrafiaGeneralDespacho=function(){

        mainDespachoService.consulCatalogoGeografiaGeneralDespacho().then(function success(response) {     
            console.log(response);            
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        console.log("######")
                        console.log(response.data.result)
                    }else{                      
                        toastr.warning( 'No se encontraron catalogos turnos' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }
        }, function error(response) {
           // swal.close()
        });
    }
    $scope.getCatControllerTurnosDespachoPI=function(){

        mainDespachoService.consultarCatalogosTurnosDespachoPI().then(function success(response) {     
            console.log(response);            
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        console.log("######")
                        console.log(response.data.result)
                    }else{                      
                        toastr.warning( 'No se encontraron catalogos turnos' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }
        }, function error(response) {
           // swal.close()
        });
    }
    $scope.getCatControllerstatusDespachoPI=function(){

        mainDespachoService.consultarCatalogoEstatusDespachoPI().then(function success(response) {     
            console.log(response);            
            if (response.data !== undefined) {
                if(response.data.respuesta ){
                    if(response.data.result ){
                        console.log("######")
                        console.log(response.data.result)
                    }else{                      
                        toastr.warning( 'No se encontraron catalogos turnos' );                
                    }
                }else{
                    toastr.warning( response.data.resultDescripcion );                
                }               
            }else{
                toastr.error( 'Ha ocurrido un error en la consulta de turnos' );                
            }
        }, function error(response) {
           // swal.close()
        });
    }
    $scope.fechaInicioFiltro=moment( FECHA_HOY_DATE ).format('DD/MM/YYYY'); 
    $scope.fechaFinFiltro=moment( FECHA_HOY_DATE ).format('DD/MM/YYYY'); 
    $scope.fechaFiltradoCalendar=moment( FECHA_HOY_DATE ).format('DD/MM/YYYY'); 

    $scope.getCatControllerTurnosDespachoPI()


    $scope.getCatControlleripoOrdenConfigDespacho()
    $scope.getCatControlleripoOrdenUsuarioDespacho()
    $scope.getCatControllerrafiaUsuarioDespacho()
    $scope.getCatControllerrafiaGeneralDespacho()
    $scope.getCatControllerstatusDespachoPI()

    //$scope.consultarCatalogoEstatusTecnico()
    //$scope.consultarConteoAlertasPI()
    //$scope.consultarOrdenesTrabajoAsignadasDespacho()
    //$scope.consultarCatalogosDespacho()
    //$scope.consultarOtsPendientes()
    //$scope.consultarTecnicosDisponibiles()
    //$scope.consultarCatalogosAcciones();

}]);
