var app = angular.module('despachoApp', []);
const FECHA_HOY_DATE = new Date()
const MILISEGUNDOS_ALERTAS = (1000 * 60) * 3;
var mapubicacionoperario;
var mapaucotizaciondetalle;
var mapavistageneral;
var tableReporte;
app.controller('despachoController', ['$scope', 'despachoService', 'mainDespachoService', 'mainAlertasService', 'genericService', '$filter', '$q', function ($scope, despachoService, mainDespachoService, mainAlertasService, genericService, $filter, $q) {
    console.log("IniciaControllador");

    let dataTableOtsPendientes;

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
    $scope.listadoTecnicosAsigna = [];
    $scope.isCargaTecnicosDisponibles = false;
    $scope.listadoOtsAsignadas = [];
    $scope.fechaFiltradoCalendar = '';
    $scope.estatusCambio = [];
    $scope.mostrarOtsAsignadas = true;
    $scope.isSelectedOt = false;
    $scope.isSelectedTec = false;
    $scope.listOtsAsiganadasMore = []
    $scope.listOtsAsiganadasMoreTemp = []
    $scope.isCargaOtsPendientes = false;
    $scope.isAsignadasTable = false;


    app.filtrosDespachoPrincipal($scope, mainDespachoService)
    app.mapasControllerDespachoPI($scope, mainDespachoService)
    app.modalDespachoPrincipal($scope, mainDespachoService, $q, genericService)
    app.alertasDespachoPrincipal($scope, mainAlertasService, genericService)
    app.misProyectosDependencias($scope, mainDespachoService)

    angular.element(document).ready(function () {
        $("#filters-content").css("display", "block")
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

        $('#calendar-next-back').datepicker('update', new Date());

        $('#searchGeo').on('keyup', function () {
            $("#jstree-proton-3").jstree("search", this.value);
        })

        $('#buscar-ot-pendiente').on('keyup', function () {
            dataTableOtsPendientes.search(this.value).draw();
        })

        $("#buscar-tecnico").on("keyup", function () {
            $("#buscar-ot-asignada").val('');
            let listTemp = [];
            let valueTemp = this.value.toString().toLowerCase();
            $.each($scope.listadoTecnicosGeneral, function (i, elemento) {
                if (elemento.nombre.toLowerCase().includes(valueTemp) || elemento.apellidoPaterno.toLowerCase().includes(valueTemp) ||
                    elemento.apellidoMaterno.toLowerCase().includes(valueTemp) || elemento.usuarioFFM.toLowerCase().includes(valueTemp)) {
                    listTemp.push(elemento);
                }
            })
            $scope.tablaAsignadasOperarios(listTemp); 
        })

        $("#buscar-ot-asignada").on("keyup", function () {
            $("#buscar-tecnico").val('');
            let listTemp = [];
            let valueTemp = this.value.toString().toLowerCase();
            console.log(valueTemp);
            $.each($scope.listadoTecnicosGeneral, function (i, elemento) {
                let listOtTemp = [];
                let elementoTep = angular.copy(elemento);
                $.each(elemento.listadoOts, function (i, elemento2) {
                    if (elemento2.descipcionTipoOrden.toLowerCase().includes(valueTemp) || elemento2.idOrden.toString().toLowerCase().includes(valueTemp) ||
                        elemento2.descripcionSubtipoOrden.toLowerCase().includes(valueTemp) || elemento2.descripcionGeografia.toLowerCase().includes(valueTemp)) {
                        listOtTemp.push(elemento2);
                    }
                })
                elementoTep.listadoOts = listOtTemp;
                listTemp.push(elementoTep);
            })
            $scope.tablaAsignadasOperarios(listTemp);
        })
        $('.drop-down-filters').on("click.bs.dropdown", function (e) {
            e.stopPropagation();
        });

        $scope.fechaFiltradoCalendar = moment(new Date()).format('DD/MM/YYYY');

    });

    $scope.buscarTecnicoModal = function (id) {
        let valueTemp = $('#' + id).val().toString().toLowerCase();
        $scope.listadoTecnicosAsigna = [];
        $.each($scope.listadoTecnicosGeneral, function (i, elemento) {
            if (elemento.nombre.toLowerCase().includes(valueTemp) || elemento.apellidoPaterno.toLowerCase().includes(valueTemp) ||
                elemento.apellidoMaterno.toLowerCase().includes(valueTemp) || elemento.usuarioFFM.toLowerCase().includes(valueTemp)) {
                $scope.listadoTecnicosAsigna.push(elemento);
            }
        })
    }

    $scope.buscarOtModal = function () {
        let valueTemp = $('#searchOt').val().toString().toLowerCase();
        $scope.listOtsAsiganadasMoreTemp = [];
        $.each($scope.listOtsAsiganadasMore, function (i, elemento) {
            if (elemento.descipcionTipoOrden.toLowerCase().includes(valueTemp) || elemento.idOrden.toString().toLowerCase().includes(valueTemp) ||
                elemento.descripcionSubtipoOrden.toLowerCase().includes(valueTemp) || elemento.descripcionGeografia.toLowerCase().includes(valueTemp)) {
                $scope.listOtsAsiganadasMoreTemp.push(elemento);
            }
        })
    }

    $scope.refrescarBusquedaPE = function (banderaIsPendientes = false) {
        $scope.isCargaOtsPendientes = banderaIsPendientes;
        $scope.isAsignadasTable = false;
        $scope.consultarTecnicosDisponibiles()
        $scope.consultarOrdenesTrabajoAsignadasDespacho()
        $scope.consultarOtsPendientes()
        //  $scope.consultarConteoAlertasPI()
    }

    $scope.selectOtReasignar = function (id) {
        $scope.isSelectedOt = true;
        $(".content-ot-asigna").removeClass('active-asignada');
        $(".cardot-" + id).addClass('active-asignada');
    }

    $scope.reasignarTecnicoModal = function (id) {
        $scope.mostrarOtsAsignadas = false;
    }

    $scope.seleccionOperarioReasignar = function (id, reasignaOt) {
        $scope.isSelectedTec = true;
        $(".content-ot-oper").removeClass('active-asignada');
        if(reasignaOt){
            $(".cardoper-reasigna-" + id).addClass('active-asignada');
        }else{
            $(".cardoper-" + id).addClass('active-asignada');
        }
      
    }

    $scope.regrearAsignaOt = function () {
        $scope.mostrarOtsAsignadas = true;
    }

    $scope.abrirModalGeografia = function () {
        $('#searchGeo').val('');
        $("#jstree-proton-3").jstree("search", '');
        $("#modal-jerarquia-filtro").modal('show');
        setTimeout(function () {
            $("#searchGeo").focus();
        }, 750);
    }

    abrirModalReasignaOt = function (idOt) {
        $("#otSeleccionada").val(idOt);
        $('#searchTecnico').val('');
        $scope.isSelectedTec = false;
        $scope.listadoTecnicosAsigna = $scope.listadoTecnicosGeneral;
        $scope.$apply();
        $(".content-ot-oper").removeClass('active-asignada');
        $(".content-ot-asigna").removeClass('active-asignada');
        $("#modal-reasigna-ot").modal('show');
    }

    abrirModalAsignadasOt = function (id) {
        $('#searchOt').val('');
        $('#searchTecnicoOt').val('');
        let tecnicoTemp = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == parseInt(id))
        $scope.listOtsAsiganadasMore = tecnicoTemp.listadoOts;
        $scope.listOtsAsiganadasMoreTemp = tecnicoTemp.listadoOts;
        $scope.listadoTecnicosAsigna = $scope.listadoTecnicosGeneral;
        $scope.mostrarOtsAsignadas = true;
        $scope.isSelectedOt = false;
        $scope.isSelectedTec = false;
        $scope.$apply();
        $(".ot-asignada-modal").removeClass('active-asignada');
        $("#modalOtsAsignadas").modal('show');
    }

    $scope.reasignarTecnicoOt = function () {
        let ot = document.getElementsByClassName("active-asignada");
        let idOt = ot[0].classList[5].split('-')[1];
        let idTec = ot[1].classList[5].split('-')[1];
        let data_tecnico = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == parseInt(idTec))
        let otInfo =  $scope.listadoOtsAsignadas.find((e) => e.idOrden == parseInt(idOt))
        //otInfo['fechahoraasignacion'] = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss");
        $("#modalOtsAsignadas").modal('hide');
        $scope.reAsignacionObject = {
            'otInfo': otInfo,
            'tecnicoInfo': data_tecnico,
            'comentario': ''
        }
        $("#modalReAsignacionOrdenTrabajo").modal('show')
    }

    $scope.reasignarTecnico = function () {
        let ot = document.getElementsByClassName("active-asignada");
        let idTec = ot[0].classList[5].split('-')[2];
        let idOt = $("#otSeleccionada").val();
        let data_tecnico = $scope.listadoTecnicosGeneral.find((e) => e.idTecnico == parseInt(idTec))
        let otInfo =  $scope.listadoOtsAsignadas.find((e) => e.idOrden == parseInt(idOt))
        console.log(idOt);
        console.log(otInfo);
        //otInfo['fechahoraasignacion'] = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss");
        $("#modal-reasigna-ot").modal('hide');
        $scope.reAsignacionObject = {
            'otInfo': otInfo,
            'tecnicoInfo': data_tecnico,
            'comentario': ''
        }
        $("#modalReAsignacionOrdenTrabajo").modal('show')
        
    }


    $scope.cargarFiltrosGeneric = function () {
        $q.all([
            despachoService.consultarCatalogosTurnosDespachoPI(),
            despachoService.consultarCatalogoTipoOrdenUsuarioDespacho(),
            despachoService.consulCatalogoGeografiaUsuarioDespacho(),
            despachoService.consultarConfiguracionDespachoDespacho({ "moduloAccionesUsuario": "moduloDespacho" }),
            mainDespachoService.consultarCatalogoEstatusDespachoPI()
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
            $scope.estatusCambio = results[4].data.result;

            if ($scope.permisosConfigUser != undefined && $scope.permisosConfigUser.permisos != undefined && $scope.permisosConfigUser.permisos.length > 0) {
                $scope.permisosConfigUser.permisos.map(e => { e.banderaPermiso = true; return e; });
                $scope.accionesUserConfigText = $scope.permisosConfigUser.permisos.map(e => { return e.clave })

            } else {
                $scope.permisosConfigUser = {}
                $scope.accionesUserConfigText = []
                $scope.permisosConfigUser.permisos = []
            }

            if (results[4].data !== undefined) {
                if (results[4].data.respuesta) {
                    if (results[4].data.result) {
                        $scope.filtrosGeneral.estatusdisponibles = $scope.realizarConversionAnidado(results[4].data.result)
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
        let estatusDisponiblesCheck = [];
        estatusDisponiblesCheck = $scope.filtrosGeneral.estatusdisponibles.filter(e=>e.checkedOpcion).map(e=>e.id)   
        let clustersparam = $("#jstree-proton-3").jstree("get_selected", true)
            .filter(e => e.original.nivel == 5)//$scope.nfiltrogeografia)
            .map(e => parseInt(e.id))

        var params = {
            "fechaInicio": $scope.getFechaFormato($('#filtro-fechainicio').val()),
            "fechaFin": $scope.getFechaFormato($('#filtro-fechafin').val()),
            "idSubIntervenciones": envioIntervenciones,
            "idTurnos": turnosdisponiblescopy,
            "idEstatus": estatusDisponiblesCheck,
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
                            $scope.isCargaOtsPendientes = true;
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
                                         <div id="idotpendiente-${otpendiente.idOrden}" class="fc-event ot-pendiente-event efecto ui-draggable ui-draggable-handle">
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
            $scope.isCargaOtsPendientes = true;
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
        $scope.listadoTecnicosGeneral = [];
        $scope.listadoTecnicosAsigna = [];
        $scope.isCargaTecnicosDisponibles = false;
        despachoService.consultarTecnicosDisponibiles().then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.detalleTecnicos) {
                            $scope.isCargaTecnicosDisponibles = true;
                            $scope.listadoTecnicosGeneral = response.data.result.detalleTecnicos;
                            $scope.listadoTecnicosAsigna = response.data.result.detalleTecnicos;
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

    $scope.tablaAsignadasOperarios = function (listaTecnicosGen) {
        //VALIDAR SI NO HAY TECNICOS
        $("#table-ot-asignadas tbody").empty();
        angular.forEach(listaTecnicosGen, function (tecnico, index) {
            let fullName = tecnico.nombre + " " + tecnico.apellidoPaterno + " " + tecnico.apellidoMaterno;
            let templateShowMore = '';
            let htmlCardsAsignadas = '';

            if (tecnico.listadoOts.length > 3) {
                let total = tecnico.listadoOts.length - 3;
                templateShowMore = `<div class="show-more">
                <button class="btn btn-more-cards" onclick="abrirModalAsignadasOt(${tecnico.idTecnico})">${total}+</button>
                </div>`;
            }

            if (tecnico.listadoOts.length) {
                angular.forEach(tecnico.listadoOts, function (asignada, indexAs) {
                    var templateAsignada = `
                    <div class="col-4 fc-event  evento-ot-asignada" style="border-left: 0.5em solid ${asignada.colorOverEstatus}; top: 0px;"><div class="fc-content"><div class="fc-title" style="position: relative;"> 
                    <div class="container-asignada">            
                        <div class="content-text-otasignada">  
                            <div class="izquierda-icon"><i class="elemen-izquierda-asignada icon-otasginada fas fa-bars" onclick="abrirModalInformacion(221902);"></i></div>
                            <h5 class="cliente-asignada">${asignada.descipcionTipoOrden}</h5>
                            <div class="izquierda-icon" title="Reasignar" style="float: right;" onclick="abrirModalReasignaOt(${asignada.idOrden})"><i class="elemen-izquierda-asignada icon-otasginada fas fa-exchange-alt" style="background: #fff; border: none"></i></div>
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
                    <img style="border:.2em solid ${tecnico.color}" onclick="abrirModalFoto('${fullName}','${tecnico.urlFotoPerfil != undefined ? tecnico.urlFotoPerfil : ''}', ' ${tecnico.usuarioFFM}', '${tecnico.numContacto}', '${tecnico.centro}', '${tecnico.descipcionEstatusTecnico}')"  class="efecto imagen_operario_foto"  src="${(tecnico.urlFotoPerfil != undefined && tecnico.urlFotoPerfil ? tecnico.urlFotoPerfil : './resources/img/plantainterna/despacho/tecnicootasignada.png')}"/>
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
                                <span class="icono_operario_accion  fa fa-eye" onclick="abrirCambioEstatusTecnico('${tecnico.idTecnico}');"></span>
                            </div>                  
                            <div class="icon-content-operario tooltip-icon-des">
                                <span class="tooltiptext-icon-des">OTS trabajadas OT</span>
                                <span class="icono_operario_accion fa fa-info-circle" onclick="abrirOtsTrabajadas('${tecnico.idTecnico}');" ></span>
                            </div>
                            <div class="icon-content-operario tooltip-icon-des">
                                <span class="tooltiptext-icon-des">Ubicaci\u00F3n operario</span>
                                <span class="icono_operario_accion fa fa-map"  onclick="abrirUbicacionOperario('${tecnico.idTecnico}');"></span>
                            </div>
                        </div> 
                    </div>
                </div>
                </div>
            </div>
            <div class="col-8" style="width: 70%">
                <div class="row col-12 content-cards" droppable="true" id="content-drop-${tecnico.idTecnico}">
                    ${htmlCardsAsignadas}
                </div>
                    ${templateShowMore}
            </div>`;
            var tableelemetn2 = `
                <tr>
                    <td>  
                        <div class="efecto content-tecnico-asignacion" id="resource" style="#fff">
                            <div class="col-12">
                                <div class="row">
                                ${templateOperador}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`;

            $("#table-ot-asignadas tbody").append(tableelemetn2);
            $("#content-drop-" + tecnico.idTecnico).droppable({
                drop: function (event, ui) {
                    let idTecTemp = event.target.id.split('-')[2];
                    console.log(event);
                    let data_tecnico = listaTecnicosGen.find((e) => e.idTecnico == parseInt(idTecTemp))
                    let otTemp = event.toElement.offsetParent.id.split('-')[1];
                    let otInfo =  $scope.listadoOtsPendientes.find((e) => e.idOrden == parseInt(otTemp))
                    otInfo['fechahoraasignacion'] = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss");
                    $scope.abrirModalAsignacion(otInfo, data_tecnico);
                    $(this).css("border", "1.5px dashed #ddd")
                },
                over: function (event, ui) {
                    $(this).css("border", "2px dashed #7716fa")
                },
                out: function (event, ui) {
                    $(this).css("border", "1.5px dashed #ddd")
                }

            });
        })
    }

    $scope.validarLoadTecnicosOtsAsignadas = function () {

        if ($scope.isCargaTecnicosDisponibles && $scope.isCargaOtsAsignadas) {
            $scope.isAsignadasTable = true;
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
                $scope.tablaAsignadasOperarios($scope.listadoTecnicosGeneral);
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

    $scope.getFechaFormato = function (fecha) {
		let fechaPrueba = fecha.split('/');
		return fechaPrueba[2] + '-' + fechaPrueba[1] + '-' + fechaPrueba[0];
	}

    validarFecha = function(idFechaInicio, idFechaFin) {
		var inicio = document.getElementById(idFechaInicio).value.split('/');
		var fin = document.getElementById(idFechaFin).value.split('/');
      
		var date_inicio = inicio[2] + '-' + inicio[1] + '-' + inicio[0];
		var date_fin = fin[2] + '-' + fin[1] + '-' + fin[0];
		if (date_inicio <= date_fin) {
			return true;
		} else {
			return false;
		}
	}

    function compareGeneric(a,b){
        let niveluno=a.nivel;
        let niveldos=b.nivel;
        if(niveluno>niveldos){ 
            return -1
        }else if( niveluno < niveldos){
            return 1
        } 
        return 0
    }
    $scope.obtenerNivelUltimoJerarquia=function(){
        return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
    }

    consultarReporteDiario = function(){
        let mensaje = '<ul>';
        let isValid = true;
        let numerosOnly = /^[0-9]*$/i;
        $scope.resultReporteDiario = {};

        let statuscopy = [];
        if($scope.filtrosGeneral.estatusdisponibles){
            angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
                statuscopy.push(e.id); 
            })
        }
        
        let intervencioncopy= [];
        if($scope.filtrosGeneral.tipoOrdenes){
            angular.forEach($scope.filtrosGeneral.tipoOrdenes,(e,i)=>{
                intervencioncopy.push(e.id); 
            })
        }
        
        let paramsTemp = {};
        
        

        if(!statuscopy.length){
            mensaje += '<li>Introducir Estatus</li>';
            isValid = false;
        }
    
        if(!intervencioncopy.length){
            mensaje += '<li>Introducir Intervenci\u00F3n</li>';
            isValid = false;
        }

        if(!numerosOnly.test($("#idot-reporte").val())){
            mensaje += '<li>El campo OT debe ser n&uacute;merico</li>';
            isValid = false;
        }

        if($("#tipo_reporte").val() == "" || $("#tipo_reporte").val() == undefined){
            mensaje += '<li>Selecciona Tipo fecha</li>';
            isValid = false;
        } else {
            $scope.repDiario.fechaSeleccionada = $("#tipo_reporte").val()
        }


        swal({ text: 'Cargando registros...', allowOutsideClick: false });
        swal.showLoading();

        setTimeout(function(){
            
            if(!validarFecha('filtro_fecha_inicio_reporte','filtro_fecha_fin_reporte')){
                mensaje += '<li>La fecha final debe ser mayor que la fecha inicio</li>';
                isValid = false;
            }
            let nivelBusquedaArbol= $scope.obtenerNivelUltimoJerarquia()        
            let clustersparam=$("#jstree-proton-3").jstree("get_selected", true)
                                                   .filter(e=>e.original.nivel== nivelBusquedaArbol)
                                                   .map(e=>parseInt(e.id))
            if(clustersparam.length === 0){
                mensaje += '<li>Introducir Geograf&iacute;a</li>';
                isValid = false;
            }

            if(!isValid){
                mensaje += '</ul>';
                swal.close()
                mostrarMensajeWarningValidacion(mensaje);
                return false;
            }else{
                paramsTemp.fechaInicio = $scope.getFechaFormato($scope.repDiario.fechaInicio);
                paramsTemp.fechaFin =  $scope.getFechaFormato($scope.repDiario.fechaFin);
                paramsTemp.tipoIntervencion =  intervencioncopy;
                paramsTemp.estatusOt = statuscopy;
                paramsTemp.fechaSeleccionada =  $scope.repDiario.fechaSeleccionada;
                paramsTemp.elementosPorPagina = 10;
                paramsTemp.pagina = 1;
                paramsTemp.geografias = clustersparam;
    
                if($scope.repDiario.idOrden && $scope.repDiario.idOrden != ""){
                    paramsTemp.idOrden =  $scope.repDiario.idOrden;
                }
    
                if($scope.repDiario.folio && $scope.repDiario.folio != ""){
                    paramsTemp.folio =  $scope.repDiario.folio;
                }
    
                if($scope.repDiario.idCuenta && $scope.repDiario.idCuenta != ""){
                    paramsTemp.idCuenta =  $scope.repDiario.idCuenta;
                }
    
                if(tableReporte){                              
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
                            if(!swal.isVisible() ){
                                
                            }
                        },
                        "dataSrc": function (json) {
                            $scope.resultReporteDiario = json.registrosTotales
                            return json.data;
                        },
                        "error":function(xhr, error, thrown){
                            handleError(xhr)
                        }, 
                        "complete": function () {
                            swal.close()
                        }
                    },
                    "columns": [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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
            
        },1000);
      
    }
    

    downloadExcelReportFile = function(){ 
        //$(".buttons-excel").click();
        let nivelBusquedaArbol= $scope.obtenerNivelUltimoJerarquia()        
        let clustersparam=$("#jstree-proton-3").jstree("get_selected", true)
                                               .filter(e=>e.original.nivel== nivelBusquedaArbol)
                                               .map(e=>parseInt(e.id))

        let statuscopy = [];
        if($scope.filtrosGeneral.estatusdisponibles){
            angular.forEach($scope.filtrosGeneral.estatusdisponibles,(e,i)=>{
                statuscopy.push(e.id); 
            })
        }
        
        let intervencioncopy= [];
        if($scope.filtrosGeneral.tipoOrdenes){
            angular.forEach($scope.filtrosGeneral.tipoOrdenes,(e,i)=>{
                intervencioncopy.push(e.id); 
            })
        }
        console.log($scope.resultReporteDiario)
        console.log($scope.getFechaFormato($('#filtro_fecha_inicio_reporte').val()))
        let paramsR = {
             fechaInicio: $scope.getFechaFormato($('#filtro_fecha_inicio_reporte').val()),
             fechaFin: $scope.getFechaFormato($('#filtro_fecha_fin_reporte').val()),
             tipoIntervencion:  intervencioncopy,
             estatusOt: statuscopy,
             geografias: clustersparam,
             fechaSeleccionada:  $("#tipo_reporte").val(),
             elementosPorPagina: $scope.resultReporteDiario,
             pagina: 1
        }
        swal({ text: 'Cargando registros...', allowOutsideClick: false });
        swal.showLoading();
        mainDespachoService.consultaReporteDiario(paramsR).then((result) =>{
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
