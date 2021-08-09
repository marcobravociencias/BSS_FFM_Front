var app = angular.module('ordenesUniversalesApp', []);

app.controller('ordenesUniversalesController', ['$scope', 'ordenesUniversalesService', 'genericService', function ($scope, ordenesUniversalesService, genericService) {

    console.log("GG");

    $scope.respaldoCatalogo = [];
    $scope.listaIntervencion = [];
    $scope.listaSubIntervencion = [];
    $scope.listaCanalVenta = [];
    $scope.listaPaquete = [];

    $scope.infoBasica = {};
    $scope.infoBasica.turno = "Turno";
    $scope.informacionCliente = {};

    $scope.consultarCatalogoOrdenesUniversales = function() {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        ordenesUniversalesService.consultarCatalogoOrdenesUniversales(JSON.stringify($scope.params)).then(function success(response) {
            response.data = catalogo;
            console.log(response.data)
            if (response.data.success) {
                if (response.data.result) {
                    $scope.respaldoCatalogo = angular.copy(response.data.result.InfoIntervenciones);
                    $scope.listaIntervencion = response.data.result.InfoIntervenciones.filter(e => e.Nivel === "0");
                    $scope.listaCanalVenta = angular.copy(response.data.result.Info_Canal_Venta);
                    $scope.listaPaquete = angular.copy(response.data.result.Info_Paquete);
                    console.log($scope.listaIntervencion);
                    swal.close();
                } else {
                    mostrarMensajeErrorAlert(response.data.result.mensaje)
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                swal.close();
            }
        }).catch(err => handleError(err));
    }

    $scope.filtrarSubIntervencion = function(intervencion) {
        console.log(intervencion);
        $scope.listaSubIntervencion = $scope.respaldoCatalogo.filter(e => e.Id_padre === intervencion.Id_interv);
    }

    $scope.consultarInformacionFolio = function() {
        if ($scope.infoBasica.folio) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            $scope.params = {};
            ordenesUniversalesService.consultarCuentaAsignadaGenerica(JSON.stringify($scope.params)).then(function success(response) {
                response.data = infoCuenta;
                console.log(response.data)
                if (response.data.success) {
                    if (response.data.result) {
                        $scope.infocuenta = {};
                        $scope.infocuenta = response.data.result.Info_cuenta;
                        $scope.informacionCliente.nombre = $scope.infocuenta.Nombre_Cliente;
                        $scope.informacionCliente.nombreContacto = $scope.infocuenta.Nombre_Contacto;
                        $scope.informacionCliente.calle = $scope.infocuenta.Calle;
                        $scope.informacionCliente.numeroExt = $scope.infocuenta.No_Exterior;
                        $scope.informacionCliente.numeroInt = $scope.infocuenta.No_Interior;
                        $scope.informacionCliente.codigoPostal = $scope.infocuenta.Codigo_Postal;
                        $scope.informacionCliente.estado = $scope.infocuenta.Estado;
                        $scope.informacionCliente.municipio = $scope.infocuenta.Municipio;
                        $scope.informacionCliente.entreCalles = $scope.infocuenta.Entre_Calles;
                        $scope.informacionCliente.referencias = $scope.infocuenta.Referencias;
                        $scope.informacionCliente.telefono = $scope.infocuenta.Telefono;
                        $scope.informacionCliente.celular = $scope.infocuenta.Celular;
                        $scope.informacionCliente.ciudad = $scope.infocuenta.Ciudad;
                        $scope.informacionCliente.colonia = $scope.infocuenta.Colonia;

                        swal.close();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.mensaje)
                        swal.close();
                    }
                } else {
                    mostrarMensajeErrorAlert(response.data.resultDescripcion)
                    swal.close();
                }
            }).catch(err => handleError(err));
        } else {

        }
    }

    $scope.elementTab = 1;
    $("#wizzard-1").addClass("current");
    $scope.mostrarTab = function(element) {
        $scope.elementTab = element;
        $("#wizzard-1").removeClass("current");
        $("#wizzard-2").removeClass("current");
        $("#wizzard-3").removeClass("current");
        $("#wizzard-4").removeClass("current");

        $("#wizzard-"+element).addClass("current");
    }

    $scope.consultaArbol = false;
    $scope.resultArbol = [];
    $scope.listaArbolCiudades = [];
    $scope.mostrarModalArbol = function() {
        
        if (!$scope.consultaArbol) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            $scope.params = {};
            ordenesUniversalesService.getcatsdispacherintegrador(JSON.stringify($scope.params)).then(function success(response) {
                response.data = infoArbol;
                console.log(response.data)
                // (response.data.success) {
                    if (response.data.result === "0") {
                        $scope.listaArbolCiudades = [];
                        $scope.resultArbol = response.data.info[0].General_Arbol.arbol;
                        console.log($scope.resultArbol);
                        //$scope.listaArbolCiudades.push({id: element.ID, text: ID_Description, parent: "#", icon: 'fa fa-globe', state:{opened:false}});
                        angular.forEach($scope.resultArbol, function (element, index) {
                            $scope.consultaArbol = true;
                            $scope.listaArbolCiudades.push(
                                {
                                    id: element.ID,
                                    text: element.ID_Description,
                                    parent: ((element.ID_Padre=='nulo' || element.ID_Padre=='NULO' || element.ID_Padre=='' || element.ID_Padre=='null')?'#':element.ID_Padre),
                                    icon: 'fa fa-globe',
                                    state:{
                                        opened:false
                                    }
                                }
                            );
                        });
                        console.log("Finaliza");
                        console.log($scope.listaArbolCiudades);
                        $('#jstree-distrito').bind('loaded.jstree', function(e, data) {	
                            swal.close()  
                            $("#modal-filtro-arbol").modal('show');
                        }).jstree({ 
                            core : {
                                data :  $scope.listaArbolCiudades,
                                themes: {
                                      name: 'proton',
                                      responsive: true
                                },
                                animation: 100
                            },
                            plugins : [ ]
                        });
                        swal.close();
                    } else {
                        mostrarMensajeErrorAlert(response.data.result.mensaje)
                        swal.close();
                    }
                
            }).catch(err => handleError(err));
        } else {
            $("#modal-filtro-arbol").modal('show');
        }

    }

    $scope.consultarDisponibilidad = function() {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        $scope.params = {};
        $scope.params.IdCiudad = "";
        $scope.params.IdIntervencion = "";
        $scope.params.IdCompany = "2";
        ordenesUniversalesService.getDisponibilidadServicioRest(JSON.stringify($scope.params)).then(function success(response) {
            response.data = responseDisponibilidad;
            console.log(response.data)
            // (response.data.success) {
            if (response.data.success) {
                console.log(response.data.result);
                console.log();
                $scope.muestraDisponibilidadCalendar(response.data.result);
                swal.close();
            } else {
                mostrarMensajeErrorAlert(response.data.result.mensaje)
                swal.close();
            }
            
        }).catch(err => handleError(err));
    }



    // ************************************************* CALENAR
    

    let arregloDisponibilidad = [];
    let calHeight = 600;
    let calendar_disponibilidad;
    $scope.calendarDisp;

    $scope.inicialCalendario = function () {
        calendar_disponibilidad = document.getElementById('calendar_disponibilidad');
        console.log(arregloDisponibilidad);
        $scope.calendarDisp = new FullCalendar.Calendar(calendar_disponibilidad, {
            height: 650,
            width: 650,
            locale: 'es',
            displayEventTime: true,
            selectable: true,
            eventLimit: true,
            editable: true,
            eventDurationEditable: false,
            events: arregloDisponibilidad,
            headerToolbar: {
                start: "",
                center: "title",
                end: "prev today next"
            },
            
            eventAfterAllRender: function () {
                calendarDisp.render();
            },
            eventClick: function (info) {
                console.log(info);
                let eventObject = info.event;

                $scope.infoBasica.turno = eventObject._def.extendedProps.tipo + " / " + eventObject.startStr
                $scope.$apply()
                
            },
            selectable: true,
            select: function (start, end, jsEvent, view) {

                //if (agrega_sess) {
                var stringdateselected = moment(start.start).format().split('T')
                var stringhoydate = moment(new Date()).format('YYYY-MM-DD');

                if (new Date(stringdateselected[0]) >= new Date(stringhoydate)) {

                    /** Valida si no hay ningun evento lo agrega**/
                    var allEvents = arregloDisponibilidad;//$('#calendar_disponibilidad').fullCalendar('clientEvents');
                    var exists = false;
                    $.each(allEvents, function (index, event) {
                        if (stringdateselected[0] === event.start) {
                            exists = true;
                        }
                    });

                    if (!exists) {
                        console.log("tiene eventos")
                        let tipoIntervencion = $scope.intervencionSelect ? $scope.intervencionSelect.id : 0;

                        let ultimonivel=$scope.obtenerNivelUltimoJerarquia()
                        let clustersparam=$("#jstreeconsulta").jstree("get_selected", true)
                                                               .filter(e=>e.original.nivel== ultimonivel)
                                                               .map(e=>parseInt(e.id))
                        

                        if (tipoIntervencion === 0 || clustersparam.length === 0) {
                            mostrarMensajeWarningValidacion("Para agregar disponibilidad debes seleccionar todos los filtros")
                        } else {
                            swal({
                                title: "\u00BFDeseas agregar disponibilidad en este dia ?",
                                type: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'S\u00ED, agregar',
                                cancelButtonText: "Cancelar",
                            }).then(function () {
                                if ($scope.banderaNocturno) {
                                    document.getElementById('container-noc').style.display = 'block'
                                } else {
                                    document.getElementById('container-noc').style.display = 'none'
                                }
                                var format_mex = stringdateselected[0].split("-")
                                $('#fecha_inicio_adddisp').datepicker("setDate", new Date(format_mex[0], format_mex[1], format_mex[2]));
                                $('#fecha_fin_adddisp').datepicker("setDate", new Date(format_mex[0], format_mex[1], format_mex[2]));

                                $("#fecha_inicio_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);
                                $("#fecha_fin_adddisp").val(format_mex[2] + "/" + format_mex[1] + "/" + format_mex[0]);

                                document.getElementById('matutino_adddisp').value = '';
                                document.getElementById('vespertino_adddisp').value = '';
                                document.getElementById('nocturno_adddisp').value = '';
                                document.getElementById('radio_activo_adddisp').checked = false;
                                document.getElementById('radio_inactivo_adddisp').checked = false;
                                $("#moda-add-disponibilidad").modal('show')
                            }).catch(swal.noop);
                        }

                    }
                }
                //}
            }
        });

        $scope.calendarDisp.render();
    }
    $scope.inicialCalendario();

    $scope.muestraDisponibilidadCalendar = function (jsonResponse) {
        console.log("inicia");
        if ($scope.calendarDisp) {
            $scope.calendarDisp.destroy();
        }
        arregloDisponibilidad = [];
        var eventoIndiMatutino={};
        var eventoIndiVespertino={};
        var eventoIndiNocturno={};
        var arrayDisponibilidad = ( jsonResponse.Disponibilidad !== undefined &&  jsonResponse.Disponibilidad.Dia!== undefined) ? jsonResponse.Disponibilidad.Dia: []
        console.log(arrayDisponibilidad);
        $.each(arrayDisponibilidad, function(index, disponibInd){
           
            if(disponibInd.Matutino !== '0'){
                eventoIndiMatutino ={
                    title      : 'Matutino: '+disponibInd.Matutino,
                    tipo       : 'MATUTINO',
                    start      : disponibInd.Fecha,
                    end        : disponibInd.Fecha,
                    id         : index,
                    color      : ((disponibInd.bloqueado) === "0") ? bloq = '#08d85c' : bloq = '#b9bfbc' ,
                    textColor  : 'white',
                    matutino   : disponibInd.Matutino,
                    className: 'matutino-event',
                    defaultDate: moment(),
                    objetodisponibilidad:disponibInd
                }
                arregloDisponibilidad.push(eventoIndiMatutino)
            }

            if(disponibInd.Vespertino !=='0'){
                eventoIndiVespertino ={
                    title      : 'Vespertino: ' +disponibInd.Vespertino,
                    tipo       : 'VESPERTINO',
                    start      : disponibInd.Fecha,
                    end        : disponibInd.Fecha,
                    id         : index,
                    color      : ((disponibInd.bloqueado) === "0") ? bloq = '#08d85c' : bloq = '#b9bfbc' ,
                    textColor  : 'white',
                    vespertino : disponibInd.Vespertino,
                    className: 'vespertino-event',
                    defaultDate: moment(),
                    objetodisponibilidad:disponibInd

                }
                arregloDisponibilidad.push(eventoIndiVespertino)
            }
            
            if(disponibInd.Nocturno !=='0'){
                eventoIndiNocturno ={
                    title      : 'Nocturno: ' +disponibInd.Nocturno,
                    tipo       : 'NOCTURNO',
                    start      : disponibInd.Fecha,
                    end        : disponibInd.Fecha,
                    id         : index,
                    color      : ((disponibInd.bloqueado) === "0") ? bloq = '#08d85c' : bloq = '#b9bfbc' ,
                    textColor  : 'white',
                    nocturno : disponibInd.Nocturno,
                    className: 'nocturno-event',
                    defaultDate: moment(),
                    objetodisponibilidad:disponibInd

                }
                arregloDisponibilidad.push(eventoIndiNocturno)
            }
          
        })


        // ++++++++++++++++++++++++++++++++++++++

     


        $scope.inicialCalendario();
    }



    // ********************************** MAPA



    let map;
    let mapResumen;

    $scope.initMap = function () {
        map = new google.maps.Map(document.getElementById("mapa-ubicacion"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });

        mapResumen = new google.maps.Map(document.getElementById("mapa-resumen"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    }

    $scope.initMap();


    $(document).ready(function(){
        $("#modalArbolFirst").on("hidden.bs.modal", function () {

            var distrito_cluster = '-1';
            var selectedElms = $('#jstreefirst').jstree("get_selected", true);
            var selected_arbol;
            
            $.each(selectedElms,function(index,elem){
                selected_arbol=elem.original;
            });
            if(selected_arbol!== undefined){
                if(session_propietario==='16'){
                    if(selected_arbol !== undefined && selected_arbol.nivel==='5'  ){
                        distrito_cluster=selected_arbol.id;
                    }
                }else{
                    if(selected_arbol !== undefined && selected_arbol.nivel==='3'  ){
                        distrito_cluster=selected_arbol.id;
                    }
                }
            }
            if(  distrito_cluster  === '-1' || $("#Tipo_intervencion").val() === '' ) {
                agregarDisponibilidadCalendario([]);
                $("#distrito-form").val('');
                $("#distrito-form").attr('parentdistritotext','')
                $("#distrito-form").attr('distritotext','')
                $("#distrito-form").attr('iddistrito','')
    
                $("#turno-form").val('')
                $("#turno-form").attr('turno-info','')
                $("#turno-form").attr('fecha-info', '')
            }else{
                var textParent=$('#jstreefirst').jstree(true).get_node( selected_arbol.parent ).text 
                $("#distrito-form").val(textParent+" / "+selected_arbol.text);
                
                $("#distrito-form").attr('parentdistritotext',textParent)
                $("#distrito-form").attr('distritotext',selected_arbol.text)
                $("#distrito-form").attr('iddistrito',distrito_cluster)
    
                consultaDisponibilidadRest(distrito_cluster)	
            }
            if(  distrito_cluster  !== '-1'){
                var textParent=$('#jstreefirst').jstree(true).get_node( selected_arbol.parent ).text 
                $("#distrito-form").val(textParent+" / "+selected_arbol.text);
                
                $("#distrito-form").attr('parentdistritotext',textParent)
                $("#distrito-form").attr('distritotext',selected_arbol.text)
                $("#distrito-form").attr('iddistrito',distrito_cluster)
            }
        });
    });
    
}]);