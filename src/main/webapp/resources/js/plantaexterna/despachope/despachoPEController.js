var app = angular.module('despachoApp', []);

app.controller('despachoController', ['$scope', 'despachoService', '$filter', '$q', function ($scope, despachoService, $filter, $q) {
    console.log("IniciaControllador");
    let dataTableOtsPendientes;
    const MILISEGUNDOS_ALERTAS = (1000 * 60) * 3;
    $scope.nfiltrogeografia = null;
    $scope.nfiltrointervenciones = null;
    $scope.nfiltroestatuspendiente = null;
    $scope.permisosConfigUser = null;
    $scope.permisosConfigUser = {};
    $scope.accionesUserConfigText = [];
    $scope.permisosConfigUser.permisos = [];
    $scope.filtrosGeneral = {};
    $scope.intervencionesConteo = [];
    $scope.listadoConteoAlertasTipo = [];
    $scope.listadoTecnicosGeneral = [];
    $scope.isCargaTecnicosDisponibles = false;
    $scope.listadoOtsAsignadas = [];
    $scope.fechaFiltradoCalendar = '';

    angular.element(document).ready(function () {
        $('#filtro-fechainicio').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true
        });
        $('#filtro-fechainicio').datepicker('update', new Date());

        $('#filtro-fechafin').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true
        });
        $('#filtro-fechafin').datepicker('update', new Date());

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
        $('#calendar-next-back').datepicker('update', new Date());

        $('#searchGeo').on('keyup', function () {
            $("#jstree-proton-3").jstree("search", this.value);
        })

        $('#buscar-ot-pendiente').on('keyup', function () {
            dataTableOtsPendientes.search(this.value).draw();
        })
        $scope.fechaFiltradoCalendar = "03/02/2022"//moment(new Date()).format('DD/MM/YYYY');
    });


    $scope.abrirModalGeografia = function () {
        $('#searchGeo').val('');
        $("#jstree-proton-3").jstree("search", '');
        $("#modal-jerarquia-filtro").modal('show');
        setTimeout(function () {
            $("#searchGeo").focus();
        }, 750);
    }

    abrirModalReasignaOt = function (){
        $("#modal-reasigna-ot").modal('show');
    }
    $scope.cargarFiltrosGeneric = function () {
        $q.all([
            despachoService.consultarCatalogosTurnosDespachoPI(),
            despachoService.consultarCatalogoTipoOrdenUsuarioDespacho(),
            despachoService.consulCatalogoGeografiaUsuarioDespacho(),
            despachoService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloDespacho" }),
        ]).then(function (results) {
            let elementosMapa = angular.copy(results[3].data.result);
            $scope.listadoIconosConfig = []

            let resultConf = results[3].data.result
            if (resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves) {
                let llavesResult = results[3].data.result.MODULO_ACCIONES_USUARIO.llaves;

                $scope.nfiltrogeografia = llavesResult.N_FILTRO_GEOGRAFIA;
                $scope.nfiltrointervenciones = llavesResult.N_FILTRO_INTERVENCIONES
                $scope.nfiltroestatuspendiente = llavesResult.N_ESTATUS_PENDIENTES
                $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO;
                validateCreed = llavesResult.KEY_VL_CREED_RESU ? llavesResult.KEY_VL_CREED_RESU : false;
                validateCreedMask = llavesResult.KEY_MASCARA_CREED_RESU ? llavesResult.KEY_MASCARA_CREED_RESU : null;

                GenericMapa.prototype.callPrototypeMapa(resultConf)

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


            if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
                $scope.permisosConfigUser.permisos.map(e => { e.banderaPermiso = true; return e; });
                $scope.accionesUserConfigText = $scope.permisosConfigUser.permisos.map(e => { return e.clave })

            } else {
                $scope.permisosConfigUser = {}
                $scope.accionesUserConfigText = []
                $scope.permisosConfigUser.permisos = []
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
                        $scope.filtrosGeneral.tipoOrdenes = $scope.realizarConversionAnidado(results[1].data.result)
                        $scope.intervencionesConteo = $scope.realizarConversionAnidado(results[1].data.result)
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
                                    opened: true,
                                    selected: true,
                                }
                                return e
                            })
                            $('#jstree-proton-3').bind('loaded.jstree', function (e, data) {
                                $scope.consultarConteoAlertasPI();
                                $scope.consultarOtsPendientes();
                                $scope.consultarOrdenesTrabajoAsignadasDespacho();
                                $scope.consultarTecnicosDisponibiles();
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

        }).catch(err => handleError(err));
    }

    $scope.cargarFiltrosGeneric();

    $scope.consultarConteoAlertasPI = function () {
        var params = {
            "testing": "-",
        }
        despachoService.consultarConteoAlertasPI(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result.alertas) {
                        $scope.listadoConteoAlertasTipo = response.data.result.alertas
                    }
                }
            }
        })
    }

    $scope.consultarOtsPendientes = function () {

        $scope.listadoOtsPendientes = []
        $scope.isCargaOtsPendientes = false;
        let turnosdisponiblescopy = $scope.filtrosGeneral.turnosdisponibles.filter(e => e.checkedOpcion).map(e => e.id)

        if ($scope.filtrosGeneral.tipoOrdenes) {
            let intervencionestemp = $scope.filtrosGeneral.tipoOrdenes.filter(e => e.checkedOpcion).map(e => e.id)
        }

        let subIntTemp = []
        angular.forEach($scope.filtrosGeneral.tipoOrdenes, (e, i) => {
            e.children.filter(f => f.checkedOpcion).map((k) => {
                subIntTemp.push(k.id); return k;
            })
        })
        envioIntervenciones = subIntTemp;
        console.log($scope.nfiltrogeografia);
        let clustersparam = $("#jstree-proton-3").jstree("get_selected", true)
            .filter(e => e.original.nivel == 5)//$scope.nfiltrogeografia)
            .map(e => parseInt(e.id))

        var params = {
            "fechaInicio": $scope.getFechaFormato($('#filtro-fechainicio').val()),
            "fechaFin": $scope.getFechaFormato($('#filtro-fechafin').val()),
            "idSubIntervenciones": envioIntervenciones,
            "idTurnos": turnosdisponiblescopy,
            "idEstatus": [$scope.nfiltroestatuspendiente],
            "idClusters": clustersparam
        }

        if (dataTableOtsPendientes)
            dataTableOtsPendientes.destroy()

        despachoService.consultarOrdenesPendientesDespacho(params).then(function success(response) {
            $("#table-ot-pendientes tbody").empty()

            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.detalleOrdenes) {
                            $scope.listadoOtsPendientes = response.data.result.detalleOrdenes

                            //$scope.listadoOtsPendientes = ordenesPendientes.result.detalleOrdenes;
                            let indexot = 0
                            $scope.listadoOtsPendientes.map((e) => {
                                indexot++
                                e.colorOrden = e.colorOrden != undefined && e.colorOrden ? e.colorOrden : arrayColors[$scope.randomIntFromInterval()]
                                //  e.isConfirmado=indexot%2==0 ? true : false
                                return e
                            })
                            let tableelemetn = ''
                            let banderaConfirmaDesconfirma = $scope.permisosConfigUser.permisos.find(e => { return e.clave === 'accionConfirmaOT' })
                            //let banderaAsignacion= $scope.permisosConfigUser.permisos.find(e=>{return e.clave==='accionAsignaOT'})

                            angular.forEach($scope.listadoOtsPendientes, function (otpendiente, index) {
                                tableelemetn = `
                                 <tr>
                                     <td>  
                                         <div id="idotpendiente${otpendiente.idOrden}" class="${otpendiente.ordenConfirmada ? 'fc-event' : "fc-event-noasignacion"} ot-pendiente-event ${otpendiente.ordenConfirmada ? "efecto ui-draggable ui-draggable-handle" : ""} ">
                                             <div class="header-otpendeinte">
                                                 <div class="top-title-ot">
                                                     <div class="content-top-element bars-content">
                                                         <i onclick="abrirModalDetalleOtPendiente(${otpendiente.idOrden})" class="icono-ot-pendeinte fa fa-bars"></i>
                                                         <h5  class="title-otpendeinte" >${otpendiente.descipcionTipoOrden}</h5>
                                                     </div>
                                                    
                                 
                                                 </div>

                                                 <div class="positiontres">
                                                     <div class="content-posiciontres">
                                                         <p class="text-otpendiente-tres-title">Intervenci&oacute;n:</p>
                                                         <p class="text-otpendiente-tres" >${otpendiente.descripcionSubtipoOrden}</p>
                                                     </div>
                                                     <div class="content-posiciontres">
                                                         <p class="text-otpendiente-tres-title">OT:</p>
                                                         <p class="text-otpendiente-tres" >${otpendiente.idOrden}</p>
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
                                                 <div style="color:${otpendiente.colorOrden}"  class="content-top-element intervencino-elemn intervencion-title"> 
                                                    <i class="fa fa-circle"></i>
                                                 </div>
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

        }).catch(err => handleError(err))
    }

    $scope.inicializarsTableOtsPendientes = function () {
        $('.fc-event.ot-pendiente-event').each(function (index) {
            let otpendiente = $scope.listadoOtsPendientes[index]
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
                }
            });
        });

        dataTableOtsPendientes = $('#table-ot-pendientes').DataTable({
            info: false,
            pageLength: 5,
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

    $scope.getFechaFormato = function (fecha) {
        let fechaPrueba = fecha.split('/');
        return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
    }

    $scope.consultarTecnicosDisponibiles = function () {
        $scope.listadoTecnicosGeneral = []
        $scope.isCargaTecnicosDisponibles = false;
        despachoService.consultarTecnicosDisponibiles().then(function success(response) {
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

    $scope.consultarOrdenesTrabajoAsignadasDespacho = function () {
        $scope.isCargaOtsAsignadas = false;
        $scope.listadoOtsAsignadas = []
        let dateSeparado = $scope.fechaFiltradoCalendar.split('/')
        let formatDateInicio = dateSeparado[2] + '-' + dateSeparado[1] + '-' + dateSeparado[0]
        var params = {
            "fechaInicio": formatDateInicio,
            "fechaFin": formatDateInicio
        }
        despachoService.consultarOrdenesaAsignadasDespacho(params).then(function success(response) {
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
    $scope.tablaAsignadasOperarios = function () {
        angular.forEach($scope.listadoTecnicosGeneral, function (tecnico, index) {
            let fullName = tecnico.nombre + " " + tecnico.apellidoPaterno + " " + tecnico.apellidoMaterno;
            let templateShowMore = '';
            let htmlCardsAsignadas = '';

            if (tecnico.listadoOts.length > 3) {
                let total = tecnico.listadoOts.length - 3;
                templateShowMore = `<div class="show-more">
                <button class="btn btn-primary btn-more-cards">${total}+</button>
                </div>`;
            }

            if (tecnico.listadoOts.length) {
                angular.forEach(tecnico.listadoOts, function (asignada, indexAs) {
                    var templateAsignada = `
                    <div class="col-4 fc-event ui-draggable ui-draggable-handle evento-ot-asignada" style="border-left: 0.5em solid ${asignada.colorOverEstatus}; top: 0px;"><div class="fc-content"><div class="fc-title" style="position: relative;"> 
                    <div class="container-asignada">            
                        <div class="content-text-otasignada">  
                            <div class="izquierda-icon"><i class="elemen-izquierda-asignada icon-otasginada fas fa-bars" onclick="abrirModalInformacion(221902);"></i></div>
                            <h5 class="cliente-asignada">${asignada.descipcionTipoOrden}</h5>
                            <div class="izquierda-icon" style="float: right;" onclick="abrirModalReasignaOt()"><i class="elemen-izquierda-asignada icon-otasginada fas fa-exchange-alt" style="background: #fff; border: none"></i></div>
                        </div>
                        <div class="content-text-otasignada">      
                            <div class="izquierda-icon">
                              <i class="fas fa-map-marker-alt  icon-tipoot-operacion"></i>
                            </div>  
                            <b class="os-content-asignada">${asignada.descripcionGeografia}</b>&nbsp;&nbsp;            
                        </div>
                        <div class="content-text-otasignada">       
                            <div class="izquierda-icon">
                              <i class="fas fa-tools  icon-tipoot-operacion" style="color:${asignada.colorOverEstatus}"></i>
                            </div>
                            <b class="orden-content">OT: ${asignada.idOrden}</b>&nbsp;&nbsp;
                        </div>
                        <div class="content-text-otasignada asignada-descripcion">                                 
                            <b class="orden-content" style="font-weight: bold">${asignada.descripcionSubtipoOrden}</b>&nbsp;&nbsp;
                        </div>
                    </div>
                    </div></div><div class="fc-bg"></div></div>`;

                    if (indexAs < 3) {
                        htmlCardsAsignadas += templateAsignada;
                    }
                })
            }
            var templateOperador = `
            <div class="col-4 content-card" style="width: 30%">
                <div class="row">
                <div class="col-2" style="text-align: center;">
                    <img style="border:.2em solid ${tecnico.color}" onclick="abrirModalFoto('${fullName}','${tecnico.urlFotoPerfil}', ' ${tecnico.usuarioFFM}', '${tecnico.numContacto}', '${tecnico.centro}', '${tecnico.descipcionEstatusTecnico}')"  class="efecto imagen_operario_foto"  src="${(tecnico.urlFotoPerfil != undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil : './resources/img/plantainterna/despacho/tecnicootasignada.png')}"/>
                </div>
                <div class="col-10 text-justify">
                    <div class="conteo-content-ots">
                    </div>
                    <div class="barra-color-tecnico" style=" background: ${tecnico.color};"></div>
                    <div class="row col-12">
                        <h5 title="${tecnico.nombre}  ${tecnico.apellidoPaterno}  ${tecnico.apellidoMaterno}" class="big-text nombre_tecnico">${tecnico.nombre}  ${tecnico.apellidoPaterno}  </h5>
                    </div>
                    <div class="row col-12">
                    <small class="numero_empleado_telefono">
                        <i style="color:#4991e1;" class="fa fa-user"></i>
                        ${tecnico.usuarioFFM}
                        <i style="color:#4991e1; margin-left: 5px;" class="fa fa-phone"></i> 
                        ${tecnico.numContacto}
                    </small>
                    </div>
                    <div class="row col-12">
                        <div  class="col-12 content-icons-operario ">
                            <div class="icon-content-operario tooltip-icon-des">
                                <span class="tooltiptext-icon-des">Status operario</span>
                                <span class="icono_operario_accion  fa fa-eye"></span>
                            </div>                  
                            <div class="icon-content-operario tooltip-icon-des">
                                <span class="tooltiptext-icon-des">OTS trabajadas OT</span>
                                <span class="icono_operario_accion fa fa-info-circle" ></span>
                            </div>
                            <div class="icon-content-operario tooltip-icon-des">
                                <span class="tooltiptext-icon-des">Ubicaci\u00F3n operario</span>
                                <span class="icono_operario_accion fa fa-map" ></span>
                            </div>
                        </div> 
                    </div>
                </div>
                </div>
            </div>
            <div class="col-8" style="width: 70%">
                <div class="row col-12 content-cards" draggable="true" onDragOver="eventOver(event)" onDragEnter="eventEnter(event)" onDragLeave="eventLeave(event)" onDrop="eventDrop(event)">
                    ${htmlCardsAsignadas}
                </div>
                    ${templateShowMore}
            </div>`;
            var tableelemetn2 = `
                <tr>
                    <td>  
                        <div class="efecto content-tecnico-asignacion" id="resource">
                            <div class="col-12">
                                <div class="row">
                                ${templateOperador}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`;

            $("#table-ot-asignadas tbody").append(tableelemetn2)
        })
    }

    $scope.validarLoadTecnicosOtsAsignadas = function () {

        if ($scope.isCargaTecnicosDisponibles && $scope.isCargaOtsAsignadas) {
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
                $scope.tablaAsignadasOperarios();
            }, 500)
        }
    }

    setInterval(function () {
        $scope.consultarConteoAlertasPI()
    }, MILISEGUNDOS_ALERTAS);


    
    $scope.buildCardAsignadas = function (listaAsignadas) {
        $('.fc-event.evento-ot-asignada').each(function (index) {
            $(this).data('event', {
                objectevent: listaAsignadas,
                stick: true
            });
            $(this).draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0,
                drag: function (event, ui) {
                    $('.content-cards').attr('style', '');
                }
            });
        });

    }


    eventOver = function (event) {
        console.log(event);
    }

    eventEnter = function (event) {
        console.log(event);
    }

    eventLeave = function (event) {
        console.log(event);
    }

    eventDrop = function (event) {
        console.log(event);
    }


}]);

app.directive('doneOtsPendientes', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            console.log("directive inciializando")
            scope.$parent.initTableOrdenesPendientes()
        }
    };
});