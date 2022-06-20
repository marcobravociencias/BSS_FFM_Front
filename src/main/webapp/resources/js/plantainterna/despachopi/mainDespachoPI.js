var fechaActual = new Date();
var generalInfo = []
const FECHA_HOY_DATE = new Date()
var permiso_reasigna = true;
var permiso_asigna = true;
var dataTableOtsPendientes;
var tableReporte;
var fullcalendarAsignadas;
var app = angular.module('despacho', []);
var triggerOperarioKeyup;
var accionDetalleSf;

var mapubicacionoperario;
var mapaucotizaciondetalle;
var mapavistageneral;
const HEIGTH_PADDING_TABLE = 270;
const HEIGTH_FULLCALENDAR = 100
const HEIGTH_FULLCALENDAR_AFTER = 145
var MILISEGUNDOS_ALERTAS = (1000 * 60) * 3;
function logerror(mensaje) {
    console.log('%c ' + mensaje, 'background: red; color: white');
}
function logsuccess(mensaje) {
    console.log('%c ' + mensaje, 'background: green; color: white');
}
function logwarning(mensaje) {
    console.log('%c ' + mensaje, 'background: orange; color: white');
}
function logprocess(mensaje) {
    console.log('%c ' + mensaje, 'background: #7716fa; color: white')
}
app.controller('despachoController', ['$scope', '$q', 'mainDespachoService', 'mainAlertasService', 'genericService', 'busquedaSalesforceService',
    function ($scope, $q, mainDespachoService, mainAlertasService, genericService, busquedaSalesforceService) {


        app.filtrosDespachoPrincipal($scope, mainDespachoService)
        app.mapasControllerDespachoPI($scope, mainDespachoService)
        app.modalDespachoPrincipal($scope, mainDespachoService, $q, genericService)
        app.alertasDespachoPrincipal($scope, mainAlertasService, genericService)
        app.misProyectosDependencias($scope, mainDespachoService)
        app.busquedaSalesforce($scope, busquedaSalesforceService)

        $scope.isCargaTecnicosDisponibles = false;
        $scope.isCargaOtsPendientes = false;
        $scope.isCargaOtsAsignadas = false;
        $scope.renderCalendario = false;

        $scope.accionAsignacionOtPermiso = false
        $scope.accionReAsignacionOtPermiso = false
        $scope.isConsultarConteoAlertas = false
        $scope.accionDetalleSalesforce = false;

        $scope.filtrosGeneral = {}
        $scope.listadoOtsPendientes = []
        $scope.listadoTecnicosGeneral = [];
        $scope.listadoTecnicosGeneralTemp = [];
        $scope.listadoOtsAsignadas = []
        $scope.listadoConteoAlertasTipo = []


        $scope.listadoHistoricoOt = arrayhistorico;
        $scope.listadoHistoricoOt[0].Id_Estatus = 1
        $scope.listadoHistoricoOt[1].Id_Estatus = 2
        $scope.listadoHistoricoOt[2].Id_Estatus = 3
        $scope.listadoHistoricoOt[3].Id_Estatus = 4
        $scope.listadoHistoricoOt[4].Id_Estatus = 5

        $scope.infoOtDetalle = {}
        $scope.listadoIconosConfig = []
        
        $scope.nfiltroestatusDisponbiles = ''
        $scope.nfiltrogeografia = ''
        $scope.nfiltrointervenciones = ''
        $scope.keyBloqueoBtn = [];
        $scope.estatusCambio = [];
        $scope.intervencionesConteo = [];
        $scope.repDiario;
        $scope.resultReporteDiario = 0;
        $scope.arbolIntervenciones = [];

        $('#searchGeo').on('keyup', function () {
            $("#jstree-proton-3").jstree("search", this.value);
        })

        $('#searchGeoAsignadas').on('keyup', function () {
            $("#jstree-proton-asignadas").jstree("search", this.value);
        })

        $scope.abrirModalGeografia = function () {
            $('#searchGeo').val('');
            $("#jstree-proton-3").jstree("search", '');
            $("#modal-jerarquia-filtro").modal('show');
            setTimeout(function () {
                $("#searchGeo").focus();
            }, 750);
        }

        triggerOperarioKeyup = function (event) {
            if (event.keyCode != 38 && event.keyCode != 40) {
                $scope.buscarTecnicoInput = $(".buscar-input-operario").val()
                $scope.buscarTecnicoCalendar();
            }
        }
        $scope.buscarTecnicoInput = ''
        $scope.buscarTecnicoCalendar = () => {
            $('#calendar').fullCalendar('destroy');
            let copyoperarios = angular.copy($scope.listadoTecnicosGeneral)

            if ($scope.buscarTecnicoInput && $scope.buscarTecnicoInput.length >= 2) {
                let filterOperarios = [];
                angular.forEach(copyoperarios, function (tecnico, index) {
                    if (tecnico.nombreCompleto.toUpperCase().includes($scope.buscarTecnicoInput.toUpperCase()) ||
                        tecnico.usuarioFFM.toUpperCase().includes($scope.buscarTecnicoInput.toUpperCase())) {
                        filterOperarios.push(tecnico);
                    }
                })
                copyoperarios = angular.copy(filterOperarios)
            }
            $scope.initFullCalendar(copyoperarios)
        }
        angular.element(document).ready(function () {
            $("#moduloDespacho").addClass('active')
            $("#idBody").removeAttr("style");
            $('#calendar-next-back').datepicker({
                format: 'dd/mm/yyyy',
                language: 'es',
                todayHighlight: true,
                //startDate : FECHA_HOY_DATE,
                //endDate : moment(FECHA_HOY_DATE).add('days', 2).toDate()
            }).on('changeDate', function (e) {
                let textCalendar = $('#calendar-next-back').val()
                $scope.fechaFiltradoCalendar = textCalendar;
                $scope.$apply()

                $scope.refrescarBusqueda(true)
            });
            $('#calendar-next-back').datepicker('update', FECHA_HOY_DATE);


            $('#filtro-fechainicio').val($scope.fechaInicioFiltro)
            $("#filtro-fechafin").val($scope.fechaFinFiltro)
            $("#filtro-fechainicio").datepicker({
                format: 'dd/mm/yyyy',
                language: 'es',
                todayHighlight: true
            }).on('changeDate', function (e) {
                $scope.fechaInicioFiltro = $('#filtro-fechainicio').val()
                $scope.$apply();
            });
            $("#filtro-fechafin").datepicker({
                format: 'dd/mm/yyyy',
                language: 'es',
                todayHighlight: true
            }).on('changeDate', function (e) {
                $scope.fechaFinFiltro = $('#filtro-fechafin').val()
                $scope.$apply();
            });
            $('.drop-down-filters').on("click.bs.dropdown", function (e) {
                e.stopPropagation();
            });

            $('#fecha-reagendamiento').datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true,
                language: 'es',
                todayHighlight: true,
                startDate: moment(FECHA_HOY_DATE).toDate()
            });
            $('#fecha-reagendamiento').datepicker('update', FECHA_HOY_DATE);

            $('#fecha-calendarizado').datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true,
                language: 'es',
                todayHighlight: true,
                startDate: moment(FECHA_HOY_DATE).add('days', 8).toDate()
            });
            $('#fecha-calendarizado').datepicker('update', moment(FECHA_HOY_DATE).add('days', 8).toDate());


            $('.datepicker_reagenda').datepicker({
                format: 'dd/mm/yyyy',
                autoclose: true,
                language: 'es',
                todayHighlight: true,
                startDate: FECHA_HOY_DATE,
                endDate: moment(FECHA_HOY_DATE).add('days', 7).toDate(),
            });
            $('.datepicker_reagenda').datepicker('update', FECHA_HOY_DATE);

            $("#filtro_fecha_inicio_reporte").datepicker({
                format: 'dd/mm/yyyy',
                language: 'es',
                todayHighlight: true
            });
            $("#filtro_fecha_fin_reporte").datepicker({
                format: 'dd/mm/yyyy',
                language: 'es',
                todayHighlight: true
            });
            $("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');


            window.onresize = function (event) {
                $('#calendar').fullCalendar('option', 'contentHeight', $(window).height() - HEIGTH_FULLCALENDAR_AFTER);
            };
        });

        $scope.initFullCalendar = function (tecnicosParams) {
            fechaActualFormat = parseInt(fechaActual.getHours()) - 2 + ':' + fechaActual.getMinutes() + ':00';
            fullcalendarAsignadas = $('#calendar').fullCalendar({
                height: $(window).height() - HEIGTH_FULLCALENDAR,
                nowIndicator: true,
                defaultDate: moment(FECHA_HOY_DATE).format("YYYY/MM/DD"),
                slotLabelFormat: 'hh:ss(:mm) a',
                schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                editable: $scope.accionReAsignacionOtPermiso,
                droppable: true,
                eventDurationEditable: false,
                eventOverlap: false,
                aspectRatio: 1.3,
                defaultView: 'timelineDay',
                minTime: "00:00:00",
                maxTime: "24:00:00",
                businessHours: {
                    start: '00:00',
                    end: '24:00',
                    dow: [1, 2, 3, 4, 5, 6, 0]
                },
                scrollTime: fechaActualFormat,
                views: {
                    timelineThreeDays: {
                        type: 'timeline',
                        duration: { days: 3 }
                    }
                },
                eventResize: function (event, delta, revertFunc) {
                },
                resourceLabelText: 'T\u00E9cnicos',
                resources: tecnicosParams,
                events: $scope.listadoOtsAsignadas,
                drop: function (date, jsEvent, ui, resourceId) {
                    fecha_asignacion = date.format();
                },
                eventReceive: function (event) {
                    let otinfo = event.objectevent
                    otinfo.fechahoraasignacion = fecha_asignacion

                    let data_tecnico = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == parseInt(event.resourceId))
                    if ($scope.validate_time_asignacion(fecha_asignacion)) {
                        if ($scope.validate_status_tecnico(data_tecnico.idEstatusTecnico)) {
                            $scope.abrirModalAsignacion(otinfo, data_tecnico);
                        } else {
                            $scope.refrescarBusqueda();
                        }
                    } else {
                        $scope.refrescarBusqueda();
                    }
                },
                eventDrop: function (event) {
                    fecha_asignacion = event.start.format()
                    event.fechahoraasignacion = fecha_asignacion

                    let data_tecnico = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == parseInt(event.resourceId))
                    if ($scope.validate_time_asignacion(event.start.format())) {
                        if ($scope.validate_status_tecnico(data_tecnico.status)) {
                            $scope.abrirModalReAsignacion(event, data_tecnico);
                        } else {
                            $scope.refrescarBusqueda();
                        }
                    } else {
                        $scope.refrescarBusqueda();
                    }
                },
                eventAfterAllRender: function (event) {

                    $scope.setPixelesTableWrapper()


                    $("th.fc-widget-header div div.fc-cell-content ").html(`                    
                    <div class="row">
                        <div class="col-8">
                            <div class="input-group input-group-sm content-seach-group  ">
                                <input type="text" class="form-control form-control-sm buscar-input-operario input_buscarOperario" placeholder="Buscar operario" onkeyup="triggerOperarioKeyup(event);" >
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
                    $(".buscar-input-operario").val($scope.buscarTecnicoInput)
                    $(".buscar-input-operario").focus()
                    logsuccess('Cargo correctamente')
                    $scope.isCargaOtsAsignadas = true;
                    $scope.$digest()


                    $('#calendar').fullCalendar('gotoDate', moment($scope.fechaFiltradoCalendar, 'DD/MM/YYYY').toDate());

                }
            });
        }
        $scope.consultarTecnicosDisponibiles = function () {
            $scope.listadoTecnicosGeneral = []
            $scope.isCargaTecnicosDisponibles = false;
            mainDespachoService.consultarTecnicosDisponibiles().then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleTecnicos) {
                                $scope.isCargaTecnicosDisponibles = true;
                                $scope.listadoTecnicosGeneral = response.data.result.detalleTecnicos
                            } else {
                                toastr.info('No se encontraron operarios disponibles');

                            }
                        } else {
                            toastr.info('No se encontraron tecnicos ');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de tecnicos');
                }
                $scope.isCargaTecnicosDisponibles = true;
                $scope.validarLoadTecnicosOtsAsignadas()
            }).catch(err => handleError(err))
        }

        $scope.consultarConteoAlertasPI = function () {
            var params = {
                "testing": "-",
            }
            mainDespachoService.consultarConteoAlertasPI(params).then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result.alertas) {
                            $scope.listadoConteoAlertasTipo = response.data.result.alertas
                            //$scope.listadoConteoAlertasTipo=conteoOtsDespacho.Alertas                                            

                        }
                    }
                }
            })
        }

        $scope.validate_time_asignacion = function (fecha) {
            var fecha_asigna = new Date(fecha);
            if (fechaActual > fecha_asigna) {
                toastr.info('Horario no permitido, por favor asigne en otra hora.');
                return false;
            } else {
                return true;
            }
        }
        $scope.validate_status_tecnico = function (status) {
            var result = true;
            if (status == 3 || status == 5 || status == 6 || status == 7 || status == 8) {
                let stringmensaje = ""
                switch (status) {
                    case 3:
                        stringmensaje = "El t\u00E9cnico se encuentra en d\u00EDa libre."
                        break;
                    case 5:
                        stringmensaje = "El t\u00E9cnico se encuentra de Vacaciones."
                        break;
                    case 6:
                        stringmensaje = "El t\u00E9cnico se encuentra en Almacen."
                        break;
                    case 7:
                        stringmensaje = "El t\u00E9cnico se encuentra Fuera de servicio."
                        break;
                    case 8:
                        stringmensaje = "El t\u00E9cnico se encuentra como apoyo t\u00E9cnico."
                        break;
                    default:
                        stringmensaje = "Error no previsto, por favor intentelo de nuevo."
                        break;
                }
                result = false;

                toastr.info(stringmensaje);

            }
            return result;
        }

        $scope.randomIntFromInterval = function () { // min and max included 
            return Math.floor(Math.random() * (8 - 0 + 1) + 0)
        }
        $scope.consultarOtsPendientes = function () {

            /**  $scope.nfiltrogeografia
             $scope.nfiltrointervenciones*/

            $scope.listadoOtsPendientes = []
            $scope.isCargaOtsPendientes = false;
            let turnosdisponiblescopy = $scope.filtrosGeneral.turnosdisponibles.filter(e => e.checkedOpcion).map(e => e.id)

            if ($scope.filtrosGeneral.tipoOrdenes) {
                let intervencionestemp = $scope.filtrosGeneral.tipoOrdenes.filter(e => e.checkedOpcion).map(e => e.id)
            }


            /*   
            let subIntTemp=[]
            angular.forEach($scope.filtrosGeneral.tipoOrdenes,(e,i)=>{
                e.children.filter( f => f.checkedOpcion ).map((k)=>{ 
                    subIntTemp.push(k.id); return k;
                } )   
            })
            envioIntervenciones=subIntTemp;
            */
            envioIntervenciones = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nfiltrointervenciones);

            let estatusDisponiblesCheck = [];
            estatusDisponiblesCheck = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponibles, $scope.nfiltroestatuspendiente);
            /**
            let envioIntervenciones=[]
            if($scope.nfiltrointervenciones){
                if($scope.nfiltrointervenciones==='1'){
                    envioIntervenciones=[].concat(intervencionestemp);
                }else{
                    envioIntervenciones=[].concat(subIntTemp);
                }
            }else{
                envioIntervenciones=[].concat(subIntTemp);
            }**/


            let nivelBusquedaArbol = $scope.obtenerNivelUltimoJerarquia()
            let clustersparam = $("#jstree-proton-3").jstree("get_selected", true)
                .filter(e => e.original.nivel == nivelBusquedaArbol)
                .map(e => parseInt(e.id))

            /**
            let estatusPendientes=[]
            angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
                e.children.filter( f => f.checkedOpcion ).map((k)=>{ estatusPendientes.push(k.id); return k;} )   
            })**/

            var params = {
                "fechaInicio": moment(moment($scope.fechaInicioFiltro, 'DD/MM/YYYY').toDate()).format('YYYY-MM-DD'),
                "fechaFin": moment(moment($scope.fechaFinFiltro, 'DD/MM/YYYY').toDate()).format('YYYY-MM-DD'),
                "idSubIntervenciones": envioIntervenciones,
                "idTurnos": turnosdisponiblescopy,
                "idEstatus": estatusDisponiblesCheck,
                "idClusters": clustersparam
            }


            if (dataTableOtsPendientes)
                dataTableOtsPendientes.destroy()

            mainDespachoService.consultarOrdenesPendientesDespacho(params).then(function success(response) {
                $("#table-ot-pendientes tbody").empty()
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleOrdenes) {

                                $scope.isCargaOtsPendientes = true;
                                $scope.listadoOtsPendientes = response.data.result.detalleOrdenes
                                let indexot = 0
                                $scope.listadoOtsPendientes.map((e) => {
                                    indexot++
                                    e.colorOrden = e.colorOrden != undefined && e.colorOrden ? e.colorOrden : arrayColors[$scope.randomIntFromInterval()]
                                    return e
                                })
                                let tableelemetn = ''
                                let htmlImagenesIconos = ''
                                let banderaConfirmaOt = $scope.permisosConfigUser.permisos.find(e => { return e.clave === 'accionConfirmaOT' })
                                let banderaDesconfirmaOt = $scope.permisosConfigUser.permisos.find(e => { return e.clave === 'accionDesconfirmaOT' })
                                let htmlAsignacionPermiso = '';

                                angular.forEach($scope.listadoOtsPendientes, function (otpendiente, index) {
                                    htmlImagenesIconos = $scope.categoriaIconos(otpendiente)

                                    let stringCheckbox =
                                        `<div class="content-top-element confirmacion-elemn switchpendiente">
                                        <label class="container-checkbox-cus">
                                            <input onchange="abrirModalConfirmacionDesconfirmacion(this,${otpendiente.idOrden})" id="switch-${otpendiente.idOrden}" ${otpendiente.ordenConfirmada ? 'checked' : ''} type="checkbox">
                                            <span class="checkmarkcust"></span>
                                        </label>
                                    </div>`

                                    if (otpendiente.ordenConfirmada) {
                                        if (!banderaDesconfirmaOt) {
                                            stringCheckbox = `<div  title="No tienes permiso para desconfirmar" class="content-top-element confirmacion-elemn switchpendiente">
                                            <label style="cursor: not-allowed" class="container-checkbox-cus">
                                                <input style="cursor: not-allowed" disabled="disabled"  ${otpendiente.ordenConfirmada ? 'checked' : ''} type="checkbox">
                                                <span style="cursor: not-allowed" class="checkmarkcust"></span>
                                            </label>
                                        </div>`
                                        }
                                    } else {
                                        if (!banderaConfirmaOt) {
                                            stringCheckbox =
                                                `<div  title="No tienes permiso para confirmar" class="content-top-element confirmacion-elemn switchpendiente">
                                            <label style="cursor: not-allowed" class="container-checkbox-cus">
                                                <input style="cursor: not-allowed" disabled="disabled"  ${otpendiente.ordenConfirmada ? 'checked' : ''} type="checkbox">
                                                <span style="cursor: not-allowed" class="checkmarkcust"></span>
                                            </label>
                                        </div>`
                                        }
                                    }



                                    if (!$scope.accionAsignacionOtPermiso) {
                                        htmlAsignacionPermiso = `  
                                       <div style="display:none" class="content-asignacion-permiso"> 
                                            <i class="fas fa-lock iconoAsignacionOtPermiso"></i>  No tienes permisos de asignaci\u00F3n 
                                        </div>
                                    `
                                    }

                                    tableelemetn = `
                                <tr> 
                                    <td>  
                                        <div id="idotpendiente${otpendiente.idOrden}" 
                                               tag-id-ot="${otpendiente.idOrden}"  class="fullSizeCard ${(otpendiente.ordenConfirmada && $scope.accionAsignacionOtPermiso) ? 'fc-event' : "fc-event-noasignacion"}  ot-pendiente-event ${otpendiente.ordenConfirmada ? "efecto ui-draggable ui-draggable-handle" : ""} ">
                                            <div class="header-otpendeinte">
                                                <div class="top-title-ot">
                                                    <div class="content-top-element bars-content">
                                                        <i onclick="abrirModalDetalleOtPendiente(${otpendiente.idOrden})" class="icono-ot-pendeinte fa fa-bars"></i>
                                                        <h5  class="title-otpendeinte" >#${otpendiente.claveCliente}</h5>
                                                    </div>
                                                   
                                                    ${stringCheckbox}
                                                </div>
                                                <div class="posiciondos">
                                                    <div class="content-dos-element ">
                                                        <h5  class="title-nombrecliente">${otpendiente.nombreCliente}</h5>
                                                    </div>
                                                </div>
                                                <div class="positiontres">
                                                    <div class="content-posiciontres">
                                                        <p class="text-otpendiente-tres-title">FOLIO: </p>`;
                                                    tableelemetn = tableelemetn + (($scope.accionDetalleSalesforce && otpendiente.folioOrden && otpendiente.folioOrden.substr(0,3) === "OS-") ? `<p class="text-otpendiente-tres link-busqueda-salesforce" onclick="mostrarModalDetalleSf('${otpendiente.folioOrden}', '${otpendiente.idFolioOrden}')">${otpendiente.folioOrden}</p>` : `<p class="text-otpendiente-tres" >${otpendiente.folioOrden}</p>`);
                                                    tableelemetn = tableelemetn + `</div>
                                                    <div class="content-posiciontres">
                                                        <p class="text-otpendiente-tres-title">OT:</p>
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
                                                        
                                                    </div>                                               
                                                </div>
                                                <div class="info-content-otpendeinte">
                                                    <div class="line-content-infootpend">
                                                        <b class="title-ciudad">Dir.</b>
                                                        <span class="content-ciudadotpend">${otpendiente.direccion}</span>
                                                    </div>                                             
                                                </div>
                                                <div class="info-content-otpendeinte ${otpendiente.telefono ? '' : 'ocultarTelefonoOtPendiente'}">
                                                    <div class="line-content-infootpend">
                                                        <i class="fas fa-phone telefono-icon-pendiente"></i>
                                                        <span class="telefono-text-otpendiente" >${otpendiente.telefono}</span>
                                                    </div>                                             
                                                </div>
                                            </div>
                                            <div class="footer-otpendiente ${$scope.accionAsignacionOtPermiso ? "permiso-asignacion" : "not-permiso-asignacion"}">
                                                <div style=" color:${otpendiente.colorOrden}"  class="content-top-element intervencino-elemn intervencion-title"> 
                                                    ${otpendiente.descipcionTipoOrden}
                                                </div>
                                                <div class="content-iconos ${$scope.accionAsignacionOtPermiso ? "elem-asignacion" : "elem-not-asignacion"} "> ${htmlImagenesIconos}</div>   
                                                ${htmlAsignacionPermiso}                                       
                                            </div>
                                          
                                                                               
                                        </div>
                                    </td>
                                </tr>	
                                `
                                    //

                                    $("#table-ot-pendientes tbody").append(tableelemetn)
                                })

                            } else {
                                toastr.info('No se encontraron OTS pendientes');
                            }
                        } else {
                            toastr.warning('No se encontraron OTS pendientes');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de OTS pendientes');
                }
                $scope.inicializarsTableOtsPendientes()
                $scope.isCargaOtsPendientes = true;

            }).catch(err => handleError(err))
        }
        $scope.categoriaIconos = function (ordenTrabajo) {
            let iconosText = '';
            iconosText = '';

            if (ordenTrabajo.informacionAdicional != undefined && ordenTrabajo.informacionAdicional.length > 0) {
                $scope.listadoIconosConfig
                let tipoDato = '';

                angular.forEach(ordenTrabajo.informacionAdicional, function (elem, index) {
                    if (elem.nombre && elem.nombre.toUpperCase() === 'ICONO') {


                        switch (elem.valor) {
                            case 'ZteLogo.svg':
                                iconosText += ` <div class="content-iconos-ot-pendiente">
                                            <img class="iconos-ot-pendiente svg"  src="./resources/img/generic/ZteLogo.svg"/></div>`
                                break;
                            case 'Huawei.svg':
                                iconosText += ` <div class="content-iconos-ot-pendiente">
                                            <img class="iconos-ot-pendiente png" src="./resources/img/generic/Huawei.svg"/></div>`
                                break;
                            default:
                                tipoDato = elem.valor.substring(elem.valor.indexOf(".") + 1, elem.valor.length)
                                let iconoEncontradoConfig = $scope.listadoIconosConfig.find(e => { return e.icon === elem.valor })

                                if (iconoEncontradoConfig != undefined && iconoEncontradoConfig) {
                                    iconoEncontradoConfig = iconoEncontradoConfig.value
                                    switch (tipoDato) {
                                        case 'svg':
                                            iconosText += ` <div class="content-iconos-ot-pendiente">
                                                        <img class="iconos-ot-pendiente svg"  src="data:image/svg+xml;base64,${iconoEncontradoConfig}"/></div>`
                                            break;
                                        case 'png':
                                            iconosText += ` <div class="content-iconos-ot-pendiente">
                                                        <img class="iconos-ot-pendiente png" src="data:image/png;base64,${iconoEncontradoConfig}"/></div>`
                                            break;
                                        case 'jpg':
                                            iconosText += ` <div class="content-iconos-ot-pendiente">
                                                        <img class="iconos-ot-pendiente jpg" src="data:image/jpeg;charset=utf-8;base64,${iconoEncontradoConfig}"/></div>`
                                            break;
                                        case 'jpeg':
                                            iconosText += ` <div class="content-iconos-ot-pendiente">
                                                        <img class="iconos-ot-pendiente jpeg" src="data:image/jpeg;charset=utf-8;base64,${iconoEncontradoConfig}"/></div>`
                                            break;
                                        default:
                                    }
                                }

                        }
                    }


                })
            }
            return iconosText;
        }
        $scope.setPixelesTableWrapper = function () {
            let pixelescon = $(window).height() - HEIGTH_PADDING_TABLE;
            //$('#table-ot-pendientes_wrapper').attr('style','max-height: '+pixelescon+'px;min-height: '+pixelescon+'px;overflow-x:hidden;overflow-y: scroll;') ;/****/
        }
        $scope.inicializarsTableOtsPendientes = function () {
            $('.fc-event.ot-pendiente-event').each(function (index) {
                let idOt=parseInt($(this).attr('tag-id-ot'));
                let otpendiente = $scope.listadoOtsPendientes.find(e=>e.idOrden==idOt)
                $(this).data('event', {
                    objectevent: otpendiente,
                    stick: true
                });
                $(this).draggable({
                    zIndex: 999,
                    revert: true,
                    revertDuration: 0,
                    drag: function (event, ui) {
                        $('#table-ot-pendientes_wrapper').attr('style', '');
                    },
                    stop: function (event, ui) {
                        $scope.setPixelesTableWrapper()
                    }
                });
            });

            let window_height = $(window).height();
    		let elementsPagina;
    		if(window_height <= 670) {
    			elementsPagina = 3;
    		} else {
                elementsPagina = 4;
            }

            dataTableOtsPendientes = $('#table-ot-pendientes').DataTable({
                info: false,
                pageLength: elementsPagina,
                language: {
                    zeroRecords: "No se encontraron OT\u00B4s",
                    infoEmpty: "No se encontro la OT",
                    infoFiltered: "(OT no encontrada)",
                    paginate: {
                        first: '<i class="fa fa-fast-backward"></i>',
                        last: '<i class="fa fa-fast-forward"></i>',
                        next: ' ',
                        previous: ' '
                    }
                },
                dom: '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
                language: {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ning\u00fana OT disponible ",
                    "sInfo": "",
                    "sInfoEmpty": "",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "<br/><br/>Cargando...<br/><br/>",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "\u00daltimo",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            })

            let arrayBusqueda = [];
            angular.forEach($scope.listadoOtsPendientes, function (e) {
                arrayBusqueda.push(e.idOrden)
                arrayBusqueda.push(e.claveCliente)
                arrayBusqueda.push(e.folioOrden)
            })
            $scope.iniciarTypeAhead(arrayBusqueda)
        }
        $scope.buscarOtPendiente = function (event) {
            if (event.which === 13)
                $scope.buscarOtPendienteText()
        }
        $scope.buscarOtPendienteText = function () {
            let textbusqeuda = $("#buscar-ot-pendiente").val()
            dataTableOtsPendientes.search(textbusqeuda).draw()
            if ($("#buscar-ot-pendiente").val().trim() !== '') {
                setTimeout(function () {
                    if (dataTableOtsPendientes.page.info().recordsDisplay <= 0)
                        $scope.consultarLocalizacionOtDespacho(textbusqeuda)

                }, 300);
            }
        }

        $scope.iniciarTypeAhead = function (listadoSearch) {

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
        $scope.substringMatcher = function (strs) {
            return function findMatches(q, cb) {
                var matches, substrRegex;
                matches = [];
                substrRegex = new RegExp(q, 'i');
                $.each(strs, function (i, str) {
                    if (substrRegex.test(str)) {
                        matches.push({ value: str });
                    }
                });
                cb(matches);
            }
        }


        $scope.consultarEstatusTecnicos = function () {
            $scope.isCargaOtsAsignadas = false;
            $scope.listadoOtsAsignadas = []
            let dateSeparado = $scope.fechaFiltradoCalendar.split('/')
            let formatDateInicio = dateSeparado[2] + '-' + dateSeparado[1] + '-' + dateSeparado[0]
            var params = {
                "fechaInicio": formatDateInicio,
                "fechaFin": formatDateInicio
            }
            mainDespachoService.consultarOrdenesaAsignadasDespacho(params).then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleOrdenesAsignadas) {
                                $scope.listadoOtsAsignadas = response.data.result.detalleOrdenesAsignadas
                                let i = 0
                                $scope.listadoOtsAsignadas.map((e) => {
                                    i++
                                    e.unidadNegocio = (i % 2 == 0) ? 1 : 2
                                    //e.idTecnico=i
                                    e.id = e.idTecnico
                                    // e.fechaInicio=formatDateFin
                                    // e.fechaFin=formatDateFin
                                    //e.horaInicio='15:00';
                                    //e.horaFin='18:20';
                                    e.colorOrden = e.colorOrden != undefined && e.colorOrden ? e.colorOrden : arrayColors[$scope.randomIntFromInterval()]
                                    e.start = e.fechaInicio + ' ' + e.horaInicio
                                    e.end = e.fechaFin + ' ' + e.horaFin
                                    return e
                                })
                            } else {
                                toastr.info('No se encontraron OTS asignadas');
                            }
                        } else {
                            toastr.warning('No se encontraron OTS asignadas');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de OTS pendientes');
                }
                $scope.isCargaOtsAsignadas = true;
                $scope.validarLoadTecnicosOtsAsignadas()
            }).catch(err => handleError(err));
        }

        $scope.consultarOrdenesTrabajoAsignadasDespacho = function () {
            $scope.isCargaOtsAsignadas = false;
            $scope.listadoOtsAsignadas = []
            let dateSeparado = $scope.fechaFiltradoCalendar.split('/')
            let formatDateInicio = dateSeparado[2] + '-' + dateSeparado[1] + '-' + dateSeparado[0]
            var params = {
                "fechaInicio": formatDateInicio,
                "fechaFin": formatDateInicio
            }
            mainDespachoService.consultarOrdenesaAsignadasDespacho(params).then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                            if (response.data.result.detalleOrdenesAsignadas) {
                                $scope.listadoOtsAsignadas = response.data.result.detalleOrdenesAsignadas
                                let i = 0
                                $scope.listadoOtsAsignadas.map((e) => {
                                    i++
                                    e.unidadNegocio = (i % 2 == 0) ? 1 : 2
                                    //e.idTecnico=i
                                    e.id = e.idTecnico
                                    // e.fechaInicio=formatDateFin
                                    // e.fechaFin=formatDateFin
                                    //e.horaInicio='15:00';
                                    //e.horaFin='18:20';
                                    e.colorOrden = e.colorOrden != undefined && e.colorOrden ? e.colorOrden : arrayColors[$scope.randomIntFromInterval()]
                                    e.start = e.fechaInicio + ' ' + e.horaInicio
                                    e.end = e.fechaFin + ' ' + e.horaFin
                                    return e
                                })
                            } else {
                                toastr.info('No se encontraron OTS asignadas');
                            }
                        } else {
                            toastr.warning('No se encontraron OTS asignadas');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de OTS pendientes');
                }
                $scope.isCargaOtsAsignadas = true;
                $scope.validarLoadTecnicosOtsAsignadas()
            }).catch(err => handleError(err));
        }
        $scope.refrescarBusqueda = function (banderaIsPendientes = false) {
            $('#calendar').fullCalendar('destroy');
            //$('#calendar-next-back').datepicker('update',FECHA_HOY_DATE);

            $scope.isCargaOtsPendientes = banderaIsPendientes;
            $scope.isCargaOtsAsignadas = false;
            $scope.renderCalendario = false

            $scope.consultarTecnicosDisponibiles()
            $scope.consultarOrdenesTrabajoAsignadasDespacho()

            if (!banderaIsPendientes)
                $scope.consultarOtsPendientes()


            //  $scope.consultarConteoAlertasPI()
        }
        $scope.validarLoadTecnicosOtsAsignadas = function () {
            if ($scope.isCargaTecnicosDisponibles && $scope.isCargaOtsAsignadas) {
                $scope.renderCalendario = true;
                //Se agregan ots a los tecnicos
                $scope.listadoOtsAsignadas.map((e) => {
                    e.resourceId = e.idTecnico
                    return e;
                })
                $scope.listadoTecnicosGeneral.map(function (e) {
                    e.listadoOts = $scope.listadoOtsAsignadas.filter(function (ot) { return ot.idTecnico === e.idTecnico })
                    e.cantidadOts = e.listadoOts.length
                    e.id = e.idTecnico
                    e.nombreCompleto = e.nombre + ' ' + e.apellidoPaterno + ' ' + e.apellidoMaterno
                    return e;
                })
                setTimeout(function () {
                    $scope.initFullCalendar($scope.listadoTecnicosGeneral)
                }, 500)
            }
        }
        


        $scope.getCatControlleripoOrdenUsuarioDespacho = function () {

            mainDespachoService.consultarCatalogoTipoOrdenUsuarioDespacho().then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                        } else {
                            toastr.warning('No se encontraron catalogos turnos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de turnos');
                }
            }).catch(err => handleError(err));
        }


        $scope.getCatControllerrafiaUsuarioDespacho = function () {

            mainDespachoService.consulCatalogoGeografiaUsuarioDespacho().then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                        } else {
                            toastr.warning('No se encontraron catalogos turnos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de turnos');
                }
            }).catch(err => handleError(err));
        }
        /**mainDespachoService.testingServiceEureka().then(function success(response) {
            console.log("#####123")
        }, function error(response) {
             // swal.close()
        });**/
        $scope.getCatControllerstatusDespachoPI = function () {

            mainDespachoService.consultarCatalogoEstatusDespachoPI().then(function success(response) {
                if (response.data !== undefined) {
                    if (response.data.respuesta) {
                        if (response.data.result) {
                        } else {
                            toastr.warning('No se encontraron catalogos turnos');
                        }
                    } else {
                        toastr.warning(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de turnos');
                }
            }).catch(err => handleError(err));
        }
        $scope.fechaInicioFiltro = moment(FECHA_HOY_DATE).format('DD/MM/YYYY');
        $scope.fechaFinFiltro = moment(FECHA_HOY_DATE).format('DD/MM/YYYY');
        $scope.fechaFiltradoCalendar = moment(FECHA_HOY_DATE).format('DD/MM/YYYY');

        $scope.cargarFiltrosGeneric = function () {
            $q.all([
                mainDespachoService.consultarCatalogosTurnosDespachoPI(),
                mainDespachoService.consultarCatalogoTipoOrdenUsuarioDespacho(),
                mainDespachoService.consulCatalogoGeografiaUsuarioDespacho(),
                mainDespachoService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloDespacho" }),
                mainDespachoService.consultarCatalogoEstatusDespachoPI()
            ]).then(function (results) {
                let elementosMapa = angular.copy(results[3].data.result);
                $scope.listadoIconosConfig = []

                let resultConf = results[3].data.result
                if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                    let llavesResult = results[3].data.result.MODULO_ACCIONES_USUARIO.llaves;

                    $scope.nfiltrogeografia = llavesResult.N_FILTRO_GEOGRAFIA
                    $scope.nfiltrointervenciones = llavesResult.N_FILTRO_INTERVENCIONES
                    $scope.nfiltroestatuspendiente = llavesResult.N_ESTATUS_PENDIENTES
                    $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
                    $scope.nfiltroestatusDisponbiles = llavesResult.N_ESTATUS_ARR_ENVIO;
                    $scope.keyBloqueoBtn = llavesResult.KEY_BLOQUEO_OTS ? llavesResult.KEY_BLOQUEO_OTS.split(',').map(function(t){return parseInt(t)}) : [];
                    
                    if( llavesResult.DURACION_CONTEO_ALERTAS !=undefined    ){
                        MILISEGUNDOS_ALERTAS= parseInt( llavesResult.DURACION_CONTEO_ALERTAS ) * 1000
                    }       

                    validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                    validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

                    let arrayDefaultKmzElemts=llavesResult.KEY_DEFAULT_KMZ ? llavesResult.KEY_DEFAULT_KMZ.split(",") : null;
                    GenericMapa.prototype.callPrototypeMapa(resultConf,arrayDefaultKmzElemts)

                    $scope.elementosConfigGeneral = new Map(Object.entries(resultConf))
                    for (const elm in resultConf) {
                        if (elm.toUpperCase().includes("ICONO_")) {
                            $scope.listadoIconosConfig.push({
                                icon: elm.substring(elm.indexOf("_") + 1, elm.length),
                                value: elementosMapa[elm]
                            })
                        }
                    }
                }

                $scope.estatusCambio = results[4].data.result;

                if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
                    $scope.permisosConfigUser.permisos.map(e => { e.banderaPermiso = true; return e; });
                    $scope.accionesUserConfigText = $scope.permisosConfigUser.permisos.map(e => { return e.clave })
                    $scope.accionAsignacionOtPermiso = $scope.permisosConfigUser.permisos.find(e => { return e.clave === 'accionAsignaOT' })
                    $scope.accionDetalleSalesforce = $scope.permisosConfigUser.permisos.find(e => { return e.clave === 'accionDetalleSalesforce' })
                    accionDetalleSf = $scope.accionDetalleSalesforce;
                    $scope.permisoDescargaSeguimientoDiario = ($scope.permisosConfigUser.permisos.filter(e => { return e.clave == "accionDescargaSeguimientoDiario" })[0] != undefined);

                    if ($scope.accionAsignacionOtPermiso != undefined) {
                        $scope.accionAsignacionOtPermiso = $scope.accionAsignacionOtPermiso.banderaPermiso
                    }
                    $scope.accionReAsignacionOtPermiso = $scope.permisosConfigUser.permisos.find(e => { return e.clave === 'accionReasignaOT' })

                } else {
                    $scope.permisosConfigUser = {}
                    $scope.accionesUserConfigText = []
                    $scope.permisosConfigUser.permisos = []
                }


                $scope.iniciarMapaAlertas();

                if (results[4].data !== undefined) {
                    if (results[4].data.respuesta) {
                        if (results[4].data.result) {
                            console.log(results[4].data.result);

                            $scope.respaldoStatusArray = [];
                            $scope.respaldoStatusArray = angular.copy(results[4].data.result);
                            $scope.nfiltroestatuspendiente = $scope.nfiltroestatuspendiente ? $scope.nfiltroestatuspendiente : $scope.obtenerUltimoNivelFiltros($scope.respaldoStatusArray);
                            $scope.filtrosGeneral.estatusdisponibles = []
                            $scope.filtrosGeneral.estatusdisponibles = $scope.conversionAnidadaRecursiva($scope.respaldoStatusArray, 1, $scope.nfiltroestatuspendiente);
                            $scope.filtrosGeneral.estatusConsultaTodos =  angular.copy($scope.filtrosGeneral.estatusdisponibles)
                            //$scope.filtrosGeneral.estatusdisponibles=$scope.realizarConversionAnidado( results[4].data.result)   
                            //Valida estatus con estatus
                            if( $scope.nfiltroestatusDisponbiles != undefined  &&  $scope.nfiltroestatusDisponbiles ){
                                let tempSlice=$scope.nfiltroestatusDisponbiles.split(",").map(e=>parseInt(e));
                                let tempArray=[]
                                angular.forEach( tempSlice , function(  elm , index ){
                                    let elemEstatus=angular.copy( $scope.filtrosGeneral.estatusdisponibles.find( e => e.id == elm ) )
                                    if( !elemEstatus != undefined )
                                        tempArray.push(  elemEstatus )
                                });
                                $scope.filtrosGeneral.estatusdisponibles = tempArray
                            }   
                        } else {
                            toastr.info('No se encontraron catalogo de estatus');
                        }
                    } else {
                        toastr.warning(results[4].data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
                }

                if (results[0].data !== undefined) {
                    if (results[0].data.respuesta) {
                        if (results[0].data.result) {
                            $scope.filtrosGeneral.turnosdisponibles = results[0].data.result
                            $scope.filtrosGeneral.turnosdisponibles.map(e => { e.checkedOpcion = true; return e; })
                        } else {
                            toastr.warning('No se encontraron catalogos turnos');
                        }
                    } else {
                        toastr.warning(results[0].data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de turnos');
                }

                if (results[1].data !== undefined) {
                    if (results[1].data.respuesta) {
                        if (results[1].data.result) {
                            $scope.respaldoTipoOrdenArray = [];
                            $scope.respaldoTipoOrdenArray = angular.copy(results[1].data.result);
                            $scope.arbolIntervenciones = angular.copy($scope.respaldoTipoOrdenArray);
                            $scope.nfiltrointervenciones = $scope.nfiltrointervenciones ? $scope.nfiltrointervenciones : $scope.obtenerUltimoNivelFiltros($scope.respaldoTipoOrdenArray);
                            $scope.filtrosGeneral.tipoOrdenes = $scope.conversionAnidadaRecursiva($scope.respaldoTipoOrdenArray, 1, $scope.nfiltrointervenciones);
                            $scope.intervencionesConteo = $scope.conversionAnidadaRecursiva($scope.respaldoTipoOrdenArray, 1, $scope.nfiltrointervenciones);
                        } else {
                            toastr.warning('No se encontraron  tipo ordenes');
                        }
                    } else {
                        toastr.warning(results[1].data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de tipo ordenes');
                }

                if (results[2].data !== undefined) {
                    if (results[2].data.respuesta) {
                        if (results[2].data.result) {
                            if (results[2].data.result.geografia) {
                                $scope.listadogeografiacopy = results[2].data.result.geografia
                                geografia = results[2].data.result.geografia

                                //necesario para agregar el y arbol 
                                geografia.map((e) => {
                                    e.parent = e.padre == undefined ? "#" : e.padre;
                                    e.text = e.nombre;
                                    e.icon = "fa fa-globe";

                                    e.state = { //Este objeto tu no lo necesitas karen! e.state
                                        opened: false,
                                        selected: true,
                                    }
                                    return e
                                })
                                $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
                                    //$scope.consultarCatalogoEstatusTecnico()
                                    $scope.consultarConteoAlertasPI()
                                    $scope.consultarOrdenesTrabajoAsignadasDespacho()
                                    $scope.consultarOtsPendientes()
                                    $scope.consultarTecnicosDisponibiles()
                                    //$scope.consultarCatalogosAcciones();

                                }).jstree({
                                    'plugins': ["wholerow", "checkbox", "search"],
                                    'core': {
                                        'data': geografia,
                                        'themes': {
                                            'name': 'proton',
                                            'responsive': true,
                                            "icons": false
                                        }
                                    },
                                    "search": {
                                        "case_sensitive": false,
                                        "show_only_matches": true
                                    }
                                });

                            } else {
                                toastr.warning('No se encontraron datos para la geografia');
                            }
                        } else {
                            toastr.warning('No se encontraron datos para la geografia');
                        }
                    } else {
                        toastr.warning(results[2].data.resultDescripcion);
                    }
                } else {
                    toastr.error('Ha ocurrido un error en la consulta de turnos');
                }


                setInterval(function () {
                    $scope.consultarConteoAlertasPI()
                }, MILISEGUNDOS_ALERTAS);
                
            }).catch(err => handleError(err));
        }

        $scope.conversionAnidadaRecursiva = function (array, nivelInit, maxNivel) {
            let arrayReturn = [];
            angular.forEach(array.filter(e => e.nivel === nivelInit), function (elem, index) {
                let elemento = angular.copy(elem);
                elemento.checkedOpcion = true;
                if (nivelInit < maxNivel) {
                    elemento.children = $scope.conversionAnidadaRecursiva(array, nivelInit + 1, maxNivel).filter(e2 => e2.idPadre === elemento.id);
                    elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : [];
                }
                arrayReturn.push(elemento)
            });
            return arrayReturn;
        }

        $scope.obtenerUltimoNivelFiltros = function (array) {
            return Math.max.apply(Math, array.map(function (o) { return o.nivel; }));
        }

        $scope.obtenerElementosSeleccionadosFiltro = function (array, nivel) {
            let arrayReturn = [];
            angular.forEach(array, function (elemento, index) {
                if (elemento.nivel == nivel && elemento.checkedOpcion) {
                    arrayReturn.push(elemento.id);
                } else {
                    arrayReturn = arrayReturn.concat($scope.obtenerElementosSeleccionadosFiltro(elemento.children, nivel));
                }
            });
            return arrayReturn;
        }

        $scope.realizarConversionAnidado = function (array) {
            let arrayCopy = []
            angular.forEach(array.filter(e => e.nivel == 1), function (elemento, index) {
                elemento.checkedOpcion = true;
                elemento.children = array.filter(e => e.nivel == 2 && e.idPadre == elemento.id)
                elemento.children = (elemento.children !== undefined && elemento.children.length > 0) ? elemento.children : []
                elemento.children.map(e => { e.checkedOpcion = true; return e; })
                arrayCopy.push(elemento)
            })
            return arrayCopy;
        }
        function compareGeneric(a, b) {
            let niveluno = a.nivel;
            let niveldos = b.nivel;
            if (niveluno > niveldos) {
                return -1
            } else if (niveluno < niveldos) {
                return 1
            }
            return 0
        }
        $scope.obtenerNivelUltimoJerarquia = function () {
            return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
        }
        $scope.cargarFiltrosGeneric()
        $scope.listadoOtsPendientes = otspendientes
        //$scope.listadoEstatusTecnico=JSONEstatusTecnico     
        //$scope.listadoIconografia=paletaColors.result.Colores    

        $scope.getFechaFormato = function (fecha) {
            let fechaPrueba = fecha.split('/');
            return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
        }

        validarFecha = function (idFechaInicio, idFechaFin) {
            var inicio = document.getElementById(idFechaInicio).value.split('/');
            var fin = document.getElementById(idFechaFin).value.split('/');
            var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
            var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
            if (date_inicio <= date_fin) {
                return true;
            } else {
                return false;
            }
        }

        $scope.limpiarCamposReporte = function (opcion) {
            switch (opcion) {
                case 1:
                    $scope.repDiario.idOrden = "";
                    $scope.repDiario.idCuenta = "";
                    break;
                case 2:
                    $scope.repDiario.folio = "";
                    $scope.repDiario.idCuenta = "";
                    break;
                case 3:
                    $scope.repDiario.folio = "";
                    $scope.repDiario.idOrden = "";
                    break;
                default:
                    break;
            }
        }

        consultarReporteDiario = function () {
            let mensaje = '<ul>';
            let isValid = true;
            let numerosOnly = /^[0-9]*$/i;
            $scope.resultReporteDiario = {};

            let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusConsultaTodos, $scope.nfiltroestatuspendiente);

            let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nfiltrointervenciones);

            let paramsTemp = {};

            if (!statuscopy.length) {
                mensaje += '<li>Introducir Estatus</li>';
                isValid = false;
            }

            if (!intervencioncopy.length) {
                mensaje += '<li>Introducir Intervenci\u00F3n</li>';
                isValid = false;
            }

            if (!numerosOnly.test($("#idot-reporte").val())) {
                mensaje += '<li>El campo OT debe ser n&uacute;merico</li>';
                isValid = false;
            }

            if ($("#tipo_reporte").val() == "" || $("#tipo_reporte").val() == undefined) {
                mensaje += '<li>Selecciona Tipo fecha</li>';
                isValid = false;
            } else {
                $scope.repDiario.fechaSeleccionada = $("#tipo_reporte").val()
            }

            if (!validarFecha('filtro_fecha_inicio_reporte', 'filtro_fecha_fin_reporte')) {
                mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
                isValid = false;
            }

          
            setTimeout(function () {
                let nivelBusquedaArbol = $scope.obtenerNivelUltimoJerarquia()
                let clustersparam = $("#jstree-proton-3").jstree("get_selected", true)
                    .filter(e => e.original.nivel == nivelBusquedaArbol)
                    .map(e => parseInt(e.id))
                if (clustersparam.length === 0) {
                    mensaje += '<li>Introducir Geograf&iacute;a</li>';
                    isValid = false;
                }

                if (!isValid) {
                    mensaje += '</ul>';
                    swal.close()
                    mostrarMensajeWarningValidacion(mensaje);
                    return false;
                } else {
                    swal({ text: 'Cargando registros...', allowOutsideClick: false });
                    swal.showLoading();
        
                    paramsTemp.fechaInicio = $scope.getFechaFormato($scope.repDiario.fechaInicio);
                    paramsTemp.fechaFin = $scope.getFechaFormato($scope.repDiario.fechaFin);
                    paramsTemp.tipoIntervencion = intervencioncopy;
                    paramsTemp.estatusOt = statuscopy;
                    paramsTemp.fechaSeleccionada = $scope.repDiario.fechaSeleccionada;
                    paramsTemp.elementosPorPagina = 10;
                    paramsTemp.pagina = 1;
                    paramsTemp.geografias = clustersparam;

                    if ($scope.repDiario.idOrden && $scope.repDiario.idOrden != "") {
                        paramsTemp.idOrden = $scope.repDiario.idOrden;
                    }

                    if ($scope.repDiario.folio && $scope.repDiario.folio != "") {
                        paramsTemp.folio = $scope.repDiario.folio;
                    }

                    if ($scope.repDiario.idCuenta && $scope.repDiario.idCuenta != "") {
                        paramsTemp.idCuenta = $scope.repDiario.idCuenta;
                    }

                    if (tableReporte) {
                        tableReporte.destroy()
                    }
                    tableReporte = $('#table-reporte').DataTable({
                        "processing": false,
                        "ordering": false,
                        "serverSide": true,
                        "scrollX": false,
                        "paging": true,
                        "lengthChange": false,
                        "searching": false,
                        "ordering": false,
                        "pageLength": 10,
                        "info": false,
                        "ajax": {
                            "url": "req/consultarReporteDiario",
                            "type": "POST",
                            "data": paramsTemp,
                            "beforeSend": function () {
                                if (!swal.isVisible()) {

                                }
                            },
                            "dataSrc": function (json) {
                                $scope.resultReporteDiario = json.registrosTotales
                                return json.data;
                            },
                            "error": function (xhr, error, thrown) {
                                handleError(xhr)
                            },
                            "complete": function () {
                                swal.close()
                            }
                        },
                        "columns": [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        "language": idioma_espanol_not_font,
                        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                        dom: 'Bfrtip',
                        buttons:
                            [{
                                extend: 'excelHtml5',
                                title: 'Reporte Seguimiento Diario',
                                text: 'Exportar Excel'
                            }]
                    });
                }

            }, 500);

        }


        downloadExcelReportFile = function () {
            //$(".buttons-excel").click();
            let mensaje = '<ul>';
            let isValid = true;
            let numerosOnly = /^[0-9]*$/i;

            let statuscopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.estatusdisponibles, $scope.nfiltroestatuspendiente);
            let intervencioncopy = $scope.obtenerElementosSeleccionadosFiltro($scope.filtrosGeneral.tipoOrdenes, $scope.nfiltrointervenciones);


            if (!statuscopy.length) {
                mensaje += '<li>Introducir Estatus</li>';
                isValid = false;
            }

            if (!intervencioncopy.length) {
                mensaje += '<li>Introducir Intervenci\u00F3n</li>';
                isValid = false;
            }

            if (!numerosOnly.test($("#idot-reporte").val())) {
                mensaje += '<li>El campo OT debe ser n&uacute;merico</li>';
                isValid = false;
            }

            if ($("#tipo_reporte").val() == "" || $("#tipo_reporte").val() == undefined) {
                mensaje += '<li>Selecciona Tipo fecha</li>';
                isValid = false;
            } else {
                $scope.repDiario.fechaSeleccionada = $("#tipo_reporte").val()
            }

            if (!validarFecha('filtro_fecha_inicio_reporte', 'filtro_fecha_fin_reporte')) {
                mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
                isValid = false;
            }

            let nivelBusquedaArbol = $scope.obtenerNivelUltimoJerarquia()
            let clustersparam = $("#jstree-proton-3").jstree("get_selected", true)
                .filter(e => e.original.nivel == nivelBusquedaArbol)
                .map(e => parseInt(e.id))


            if (clustersparam.length === 0) {
                mensaje += '<li>Introducir Geograf&iacute;a</li>';
                isValid = false;
            }

            if (!isValid) {
                mensaje += '</ul>';
                swal.close()
                mostrarMensajeWarningValidacion(mensaje);
                return false;
            } else {
                let paramsR = {
                    fechaInicio: $scope.getFechaFormato($('#filtro_fecha_inicio_reporte').val()),
                    fechaFin: $scope.getFechaFormato($('#filtro_fecha_fin_reporte').val()),
                    tipoIntervencion: intervencioncopy,
                    estatusOt: statuscopy,
                    geografias: clustersparam,
                    fechaSeleccionada: $("#tipo_reporte").val(),
                    elementosPorPagina: $scope.resultReporteDiario,
                    pagina: 1
                }

                if ($scope.repDiario.idOrden && $scope.repDiario.idOrden != "") {
                    paramsR.idOrden = $scope.repDiario.idOrden;
                }

                if ($scope.repDiario.folio && $scope.repDiario.folio != "") {
                    paramsR.folio = $scope.repDiario.folio;
                }

                if ($scope.repDiario.idCuenta && $scope.repDiario.idCuenta != "") {
                    paramsR.idCuenta = $scope.repDiario.idCuenta;
                }

                swal({ text: 'Cargando registros...', allowOutsideClick: false });
                swal.showLoading();
                mainDespachoService.consultaReporteDiario(paramsR).then((result) => {
                    console.log(result.data)
                    swal.close()
                    if (result.data.respuesta) {
                        const data = JSON.parse(result.data.result).ordenes
                        console.log(JSON.parse(result.data.result))
                        const fileName = 'Resporte Seguimiento Diario'
                        const exportType = 'xls'

                        window.exportFromJSON({ data, fileName, exportType })
                    } else {
                        mostrarMensajeErrorAlert('Ocurrio un error al generar reporte.')
                    }

                }).catch(err => handleError(err));
            }
        }

        mostrarModalDetalleSf = function(os, idFolio) {
            if (os.substr(0,3) === "OS-") {
                $scope.detalleSalesforceView = false;
                $scope.respaldoHistorial = [];
                $scope.historial = [];
                $scope.consultarDetalleObjectosSF(idFolio, 'OS');
                $("#modalDetalleSalesforce").modal('show');
            } else {
                toastr.warning("No se cuenta con OS");
            }
            

        }

        $scope.cerrarModalDetalleSalesforce = function() {
            $("#modalDetalleSalesforce").modal('hide');
        }

        $scope.respaldoHistorial = [];
        $scope.validacionGenerica = function() {
            if ($scope.historial.length === 1 && $scope.respaldoHistorial.length === 0) {
                $scope.respaldoHistorial = angular.copy($scope.historial);
            }
            if ($scope.historial.length === 0) {
                $scope.mostrarDetalleOs($scope.respaldoHistorial[0].detalle, "OS");
            }

            if ($scope.historial.length === 1) { 
                if ($scope.historial[0].keyObject === 'TK') { 
                    $scope.banderaNoticiasTicket = true; 
                } 
                if ($scope.historial[0].keyObject === 'OP') { 
                    $scope.banderaNoticiasOportunidad = true; 
                } 
                if ($scope.historial[0].keyObject === 'OS') { 
                    $scope.banderaNoticiasOs = true; 
                } 
            } else { 
                $scope.banderaNoticiasTicket = false; 
                $scope.banderaNoticiasOportunidad = false; 
                $scope.banderaNoticiasOs = false; 
            }
            
        }

    }]);

app.directive('doneListadoDependenciaHistorico', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            //console.log("directive done listado de  actividadesss####")
            setTimeout(function () {
                $(".dot-dependencia").remove()
                scope.pintarDependenciasHistorico();
            }, 700)

        }
    };
});
