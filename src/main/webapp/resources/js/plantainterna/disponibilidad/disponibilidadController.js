var app = angular.module('disponibilidadApp', []);

app.controller('disponibilidadController', ['$scope', 'disponibilidadService', 'genericService', function ($scope, disponibilidadService, genericService) {
    $("#li-disponibilidad-navbar").addClass('active')
    $scope.session_propietario;
    let arrayDisp = [];
    $scope.banderaNocturno = false
    $scope.arrayIdsModif = ['matutino_actualizar', 'vespertino_actualizar', 'nocturno_actualizar']
    $scope.arrayIdsElementosValidacionAddDisp = ['matutino_adddisp', 'vespertino_adddisp', 'fecha_inicio_adddisp', 'fecha_fin_adddisp', 'nocturno_adddisp'];
    let arrayIdsElementosValidacionInsercion = ['compania_select_inserta', 'tipo_select_inserta', 'vespertino_inserta', 'vespertino_inserta', 'matutino_inserta', 'fecha_inicio_inserta', 'fecha_fin_inserta', "arbol_disponibilidad_agrega"];
    let arrayIdsElementosValidacionModificar = ['regiones_modificar', 'compania_select_modificar', 'tipo_select_modificar', 'ciudad_select_modificar', 'vespertino_modificar', 'vespertino_modificar', 'matutino_modificar', 'fecha_inicio_modificar', 'fecha_fin_modificar', 'distritos_modificar', "arbol_disponibilidad_modifica"];
    $scope.arrayIntervencion = [];
    $scope.intervencionSelect = undefined;
    $scope.idCompanyActualizar;
    $scope.idTipoActualizar;
    $scope.idCiudadActualizar;
    $scope.geografiaList = [];
    $scope.arrayTitulo = [
        {
            title: 'Fecha Disponibilidad',
            vista: true
        },
        {
            title: 'Matutino',
            vista: true
        },
        {
            title: 'Vespertino',
            vista: true
        },
        {
            title: 'Nocturno',
            vista: false
        },
        {
            title: 'Capacidad d&iacute;a',
            vista: true
        }
        , {
            title: 'Estatus',
            vista: true
        },
        {
            title: 'Editar',
            vista: true
        }
    ];


    app.disponibilidadCalendar($scope);
    $scope.inicialCalendario();

    $scope.inicioDisponibilidad = function () {
        $('.datepicker').datepicker({
            format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true,
			clearBtn: true
        });
        //$('.datepicker').datepicker('update', new Date());
        if (!$scope.banderaNocturno) {
            document.getElementById('nocturno_dispo').parentElement.style.display = 'none'
            //document.getElementById('theadnocturno').style.display = 'none';
            //document.getElementById('theadnocturnoporcentaje').style.display = 'none';
            //document.getElementById('container-nocturno').style.display = 'none';
            //document.getElementById('contenedor-editar-nocturno').style.display = 'none';
        }


        document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione un geografia';


       let contenTheadDetalle = '';
        $scope.arrayTitulo.forEach(function(elemento,index){
            if (elemento.vista) {
                contenTheadDetalle += `<th> ${elemento.title} </th>`;
            }
        });
        $('#theadDispo').append(`<tr> ${contenTheadDetalle} </tr>`); 
        $('#datatable_disponibilidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "recordsTotal": 100,
            "info": false,
            "autoWidth": true,
            "data": [],
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });

        $('#Disponibilidad').addClass('active');
        $("#campos_dinamicos").hide();
        $("#btn_mostrar_nav").hide(500);


        //Función para la barra lateral
        $(".elemento_link").click(function () {
            if ($(this).attr('id') === 'ref_consulta') {
                $("#ref_inserta").removeClass('active');
                $("#ref_modifica").removeClass('active');
                $("#ref_consulta").addClass('active');

                $("#container_inserta_disponbilidad").hide();
                $("#container_modifica_disponbilidad").hide();
                $("#container_consulta_disponbilidad").show('fade');
                $(".titulo_disponibilidad").text("Consulta Disponibilidad");

            } else if ($(this).attr('id') === 'ref_inserta') {
                $("#ref_consulta").removeClass('active');
                $("#ref_modifica").removeClass('active');
                $("#ref_inserta").addClass('active');

                $("#container_consulta_disponbilidad").hide();
                $("#container_modifica_disponbilidad").hide();
                $("#container_inserta_disponbilidad").show('fade');
                $(".titulo_disponibilidad").text("Agregar Disponibilidad");

            } else if ($(this).attr('id') === 'ref_modifica') {
                $("#ref_inserta").removeClass('active');
                $("#ref_consulta").removeClass('active');
                $("#ref_modifica").addClass('active');

                $("#container_consulta_disponbilidad").hide();
                $("#container_inserta_disponbilidad").hide();
                $("#container_modifica_disponbilidad").show('fade');
                $(".titulo_disponibilidad").text("Modificar Disponibilidad");
            }
        });

        //Abre modal para modificar capacidad 
        $(document.body).on("click", ".edit_capacidad_btn", function () {
            $("#modificar_capacidad_modal").modal('show');
        });
    }

    $( document ).ready(function() {
        editarDisponibilidad = function(matutino, vespertino, nocturno, bloqueado, fecha){
            document.getElementById('matutino_actualizar').value = matutino;
            document.getElementById('vespertino_actualizar').value = vespertino;
            if (nocturno !== '') {
                document.getElementById('nocturno_actualizar').value = nocturno;
                document.getElementById('contenedor-editar-nocturno').style.display = 'block'
            } else{
                document.getElementById('contenedor-editar-nocturno').style.display = 'none'
            }
            let fechaA = fecha.split('-');
            document.getElementById('fecha_actualizar').value = fechaA[1]+'-'+fechaA[2]+'-'+fechaA[0]
            if (bloqueado) {
                document.getElementById('radio_activo_mod').checked = true
                document.getElementById('radio_inactivo_mod').checked = false
            } else {
                document.getElementById('radio_inactivo_mod').checked = true
                document.getElementById('radio_activo_mod').checked = false
            }

            $("#modificar_disponibilidad_modal").modal('show');
        }
    });

    $scope.inicioDisponibilidad();

    $scope.consultarIntervenciones = function () {
        genericService.consultarCatalogoIntervenciones().then(function success(response) {
            console.log(response);
            if (response.data.respuesta) {
                if (response.data.result) {
                    $scope.arrayIntervencion = response.data.result.filter(elemento => { return elemento.nivel === 1 });
                    swal.close();
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert('No existen intervenciones actualmente');
                }
            } else {
                swal.close();
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
            }
        });
    }

    $scope.consultarCatalogoArbol = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        genericService.consulCatalogoGeografia().then(function success(response) {
            console.log(response.data)
            if (response.data.respuesta) {
                if (response.data.result) {
                    if (response.data.result.geografia || response.data.result.geografia.length > 0) {
                        $scope.geografiaList = response.data.result.geografia;
                        let geografia = response.data.result.geografia;
                        geografia.map((e)=>{
                            e.parent=e.padre ==undefined ? "#" : e.padre;
                            e.text= e.nombre;
                            e.icon= "fa fa-globe";
                            
                            return e
                        })  
                        
                        $('#jstreeconsulta').bind('loaded.jstree', function(e, data){   
                        }).jstree({
                            'core': {
                                'data': geografia,
                                'themes': {
                                    'name': 'proton',
                                    'responsive': true,
                                    "icons":false        
                                }
                            },
                            plugins : ['search'],
                             "search": {
                                    "case_sensitive": false,
                                    "show_only_matches": true
                                }
                        });
                    } else {
                        mostrarMensajeWarningValidacion('No existen geografias actualmente')
                    }
                    $scope.consultarIntervenciones();
                } else {
                    mostrarMensajeErrorAlert(response.data.result.mensaje)
                    swal.close();
                }
            } else {
                mostrarMensajeErrorAlert(response.data.resultDescripcion)
                swal.close();
            }
        });
    }

    $scope.consultarCatalogoArbol();

    $scope.consultaDisponibilidad = function () {
        let mensaje = '';
        let isValidado = true;
        let company = document.getElementById('compania_select').value;
        let tipo_intervencion = $scope.intervencionSelect !== undefined ? $scope.intervencionSelect.id : 0;
        let distrito_cluster = '-1';


        let ultimonivel=$scope.obtenerNivelUltimoJerarquia()
        let clustersparam=$("#jstreeconsulta").jstree("get_selected", true)
                                               .filter(e=>e.original.nivel== ultimonivel)
                                               .map(e=>parseInt(e.id))

        if (tipo_intervencion === 0) {
            mensaje += 'Seleccione una intervenci&oacute;n \n'
            isValidado = false
        }

        if (clustersparam.length === 0) {
            mensaje += 'Seleccione una geografia'
            isValidado = false
        }

        if (isValidado) {
            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            let params = {
                subtipoIntervencion: tipo_intervencion,
                geografia2: clustersparam[0]
            }
            $('#datatable_disponibilidad').dataTable().fnDestroy();

            $('#consulta_disponibilidad').attr('disabled', true);
            $('#consulta_disponibilidad').text("Cargando ...");
            disponibilidadService.consultaDisponibilidad(JSON.stringify(params)).then(function success(response) {
                console.log(response.data);
                if (response.data.respuesta) {
                    if (response.data.result.dias !== undefined) {
                        arrDisponibilidad = [];
                        $scope.muestraDisponibilidadCalendar(response.data.result);
    
                        $scope.idCompanyActualizar = company;
                        $scope.idTipoActualizar = tipo_intervencion;
                        $scope.idCiudadActualizar = distrito_cluster;
    
                        let textoIntervencion = $.trim($("#tipo_select option:selected").text());
                        let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
                        let selected_arbol;
    
                        selectedElms.forEach(element => {
                            selected_arbol = element.text;
                        });
    
    
                        document.getElementById('disponibilidad_span').innerHTML = selected_arbol;
                        $("#intervencion_span").text(textoIntervencion.substr(0, 1) + "" + (textoIntervencion.substr(1, textoIntervencion.length - 1)).toLowerCase());
    
                        let styleHide = ''
                        if (!$scope.banderaNocturno) {
                            styleHide = 'display:none'
                        } else {
                            $('#nocturno_dispo').text(response.data.result.CapacidadNocturno === '' ? 0 : response.data.result.CapacidadNocturno);
                        }
    
                        $("#total_dispo").text(response.data.result.CapacidadTotal === "" ? 0 : response.data.result.CapacidadTotal);
    
                        let arrayResult = (response.data.result.dias !== undefined && response.data.result.dias !== null) ? response.data.result.dias !== undefined ? response.data.result.dias : [] : [];
                        //let arrayResult = [];
                        $('#datatable_disponibilidad tbody').empty();
                        let arraRow = [];
                        $.each(arrayResult, function (i, elemento) {
                            let array = [];
                            let totalMatutino = 0;
                            let totalVespertino = 0;
                            let totalNocturno = 0;
                            let totalTurnos = 0;
    
                            elemento.turnos.forEach(turno =>{
                                if (turno.idCatTurno === 1) {
                                    totalMatutino = turno.cantidad;
                                    totalTurnos += turno.cantidad;
                                }
                                if (turno.idCatTurno === 2) {
                                    totalVespertino = turno.cantidad;
                                    totalTurnos += turno.cantidad;
                                }
                                if (turno.idCatTurno === 3) {
                                    totalNocturno = turno.cantidad;
                                    totalTurnos += turno.cantidad;
                                }
                            })
    
                            array[0] = elemento.fecha;
                            array[1] = totalMatutino;
                            array[2] = totalVespertino
                            if ($scope.banderaNocturno) {
                                array[3] = totalNocturno;
                                array[4] = totalTurnos;
                                array[5] = elemento.bloqueado ? 'DISPONIBLE' : 'BLOQUEADO';
                                array[6] = '<a onclick="editarDisponibilidad('+totalMatutino+','+totalVespertino+','+totalNocturno+','+elemento.bloqueado+'\,'+'\''+elemento.fecha+'\')"><i class="cursorEfect edit_disponibilidad_btn fa fa-edit"></i></a>'
                            } else {
                                array[3] = totalTurnos;
                                array[4] = elemento.bloqueado ? 'DISPONIBLE' : 'BLOQUEADO';
                                array[5] = '<a onclick="editarDisponibilidad('+totalMatutino+','+totalVespertino+","+'\''+'\''+','+elemento.bloqueado+'\,'+'\''+elemento.fecha+'\')"><i class="cursorEfect edit_disponibilidad_btn fa fa-edit"></i></a>'
                            }
                            arraRow.push(array); 
                        });/****/
                        $('#datatable_disponibilidad').DataTable({
                            "paging": true,
                            "lengthChange": false,
                            "searching": false,
                            "ordering": false,
                            "pageLength": 10,
                            "recordsTotal": 100,
                            "info": false,
                            "autoWidth": true,
                            "data": arraRow,
                            "language": idioma_espanol_not_font,
                            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                        });
    
                        $("#consulta_disponibilidad").attr('disabled', false);
                        $("#consulta_disponibilidad").text("Consultar disponibilidad");
                        swal.close();
                    } else {
                        swal.close();
                        mostrarMensajeErrorAlert(response.data.result.ResultDescription);
                    }
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensaje)
        }
        
    }

   

    $scope.insertarDisponibilidad = function () {
        let nocturnoCantidad = $.trim(document.getElementById('nocturno_adddisp').value);
        let arrayTurno = [];
        let companiaInserta = $.trim(document.getElementById('compania_select').value);
        let tipoIntervencion = $scope.intervencionSelect.id;
        let vespertinoCant = $.trim(document.getElementById('vespertino_adddisp').value);
        let matutinoCant = $.trim(document.getElementById('matutino_adddisp').value);
        let fechaInicio = $.trim(document.getElementById('fecha_inicio_adddisp').value);
        let fechaFin = $.trim(document.getElementById('fecha_fin_adddisp').value);

        let isValido = true;
        let mensajeError = "";
        let bloqueo = $("input[name='checkBloque']:checked").val();
        bloqueo = bloqueo === 'true' ? 1 : 0;
        let ultimonivel=$scope.obtenerNivelUltimoJerarquia()
        let clustersparam=$("#jstreeconsulta").jstree("get_selected", true)
                                               .filter(e=>e.original.nivel== ultimonivel)
                                               .map(e=>parseInt(e.id))
        /*
        
                if ($scope.banderaNocturno) {
                    nocturnoCantidad = $.trim(document.getElementById('nocturno_adddisp').value);
                    if (nocturnoCantidad === '') {
                        mensajeError += "<li>Ingresa una cantidad en Nocturno</li>";
                        isValido = false;
                        addClassInvalid('nocturno_adddisp');
                    } else {
                        addClassValid('nocturno_adddisp');
                    }
                }
                if (matutinoCant === '') {
                    mensajeError += "<li>Ingresa una cantidad en Matutino</li>";
                    isValido = false;
                    addClassInvalid('matutino_adddisp');
                } else {
                    addClassValid('matutino_adddisp');
                }
        
                if (vespertinoCant === '') {
                    mensajeError += "<li>Ingresa una cantidad en vespertino</li>";
                    isValido = false;
                    addClassInvalid('vespertino_adddisp');
                } else {
                    addClassValid('vespertino_adddisp');
                }
        
                let fechaInicioSplit = fechaInicio.split('/');
                let fechaFinSplit = fechaFin.split('/');
                if (new Date(fechaInicioSplit[1] + "/" + fechaInicioSplit[0] + "/" + fechaInicioSplit[2]) >
                    new Date(fechaFinSplit[1] + "/" + fechaFinSplit[0] + "/" + fechaFinSplit[2])) {
                    isValido = false;
                    mensajeError += "<li>La fecha de inicio no puede ser mayor a la de fin</li>";
        
                    addClassInvalid('fecha_inicio_adddisp');
                    addClassInvalid('fecha_fin_adddisp');
                } else {
                    addClassValid('fecha_inicio_adddisp');
                    addClassValid('fecha_fin_adddisp');
                }
        
                if (fechaFin === '') {
                    mensajeError += "<li>Ingresa una fecha de fin correcta</li>";
                    isValido = false;
                    addClassInvalid('fecha_fin_adddisp');
        
                } else {
                    addClassValid('fecha_fin_adddisp');
                }*/
        if (matutinoCant !== '') {
            arrayTurno.push({
                idCatTurno: 1,
                cantidad: matutinoCant
            })
        } else{
            mensajeError += 'Introducir cantidad turno matutino \n'
            isValido = false
        }

        if (vespertinoCant !== '') {
            arrayTurno.push({
                idCatTurno: 2,
                cantidad: vespertinoCant
            })
        } else{
            mensajeError += 'Introducir cantidad turno vespertino <br/>'
            isValido = false
        }

        if ($scope.banderaNocturno) {
            if (nocturnoCantidad !== '') {
                arrayTurno.push({
                    idCatTurno: 3,
                    cantidad: nocturnoCantidad
                })
            } else{
                mensajeError += 'Introducir cantidad turno nocturno <br/>'
                isValido = false
            }
        }



        let fechaInicioSplit = fechaInicio.split('/');
        let fechaFinSplit = fechaFin.split('/');


        let fechaInicioC = fechaInicioSplit[2] + '-' + fechaInicioSplit[1] + '-' + fechaInicioSplit[0]
        let fechaFinC = fechaFinSplit[2] + '-' + fechaFinSplit[1] + '-' + fechaFinSplit[0]
        if (isValido) {

            let params = {
                subtipoIntervencion: tipoIntervencion,
                idGeografia2: clustersparam[0],
                fechaInicio: fechaInicioC.concat('T00:00:00.000+0000'),
                fechaFin: fechaFinC.concat('T00:00:00.000+0000'),
                bloqueado: bloqueo,
                turnos: arrayTurno
            };

            console.log(params);

            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();

            disponibilidadService.insertarDisponibilidad(JSON.stringify(params)).then(function success(response) {
                console.log(response.data);
                if (response.data.respuesta) {
                    //removerClasesElementosValidacion(arrayIdsElementosValidacionInsercion)
                    mostrarMensajeExitoAlert('Se agreg\u00F3 correctamente la disponibilidad');
                    $scope.consultaDisponibilidad();
                    $("#moda-add-disponibilidad").modal('hide')
                    swal.close();
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.resultDescripcion);
                }
            });
        } else {
            mostrarMensajeWarningValidacion(mensajeError);
            return false;
        }

    }

    $scope.actualizarDisponibilidad = function () {
        let isValido = true;
        let mensajeError = "";
        let arrayTurno = [];

        let matutinoCant = $.trim(document.getElementById('matutino_actualizar').value);
        let vespertinoCant = $.trim(document.getElementById('vespertino_actualizar').value);
        let nocturnoCant = $.trim(document.getElementById('nocturno_actualizar').value);
        let fechaInicio = $.trim(document.getElementById('fecha_inicio_adddisp').value);
        let tipoIntervencion = $scope.intervencionSelect.id;
        let bloqueo = $("input[name='radio-bloqueo-mod-individual']:checked").val();
        bloqueo = bloqueo === 'true' ? 1 : 0;
        let ultimonivel=$scope.obtenerNivelUltimoJerarquia()
        let clustersparam=$("#jstreeconsulta").jstree("get_selected", true)
                                               .filter(e=>e.original.nivel== ultimonivel)
                                               .map(e=>parseInt(e.id))

        /*
        if (matutinoCant === '') {
            mensajeError += "<li>Ingresa una cantidad en Matutino</li>";
            isValido = false;
            addClassInvalid('matutino_actualizar');
        } else {
            addClassValid('matutino_actualizar');
        }

        if (vespertinoCant === '') {
            mensajeError += "<li>Ingresa una cantidad en Vespertino</li>";
            isValido = false;
            addClassInvalid('vespertino_actualizar');
        } else {
            addClassValid('vespertino_actualizar');
        }

        if ($scope.banderaNocturno) {
            if (nocturnoCant === '') {
                mensajeError += "<li>Ingresa una cantidad en nocturno</li>";
                isValido = false;
                addClassInvalid('nocturno_actualizar');
            } else {
                addClassValid('nocturno_actualizar');
            }
        }
        var bloqueo = $("input[name='radio-bloqueo-mod-individual']:checked").val();
        bloqueo = bloqueo === 'activo' ? '0' : '1';
        let cantidadNoct = $scope.banderaNocturno ? $("#nocturno_actualizar").val() : '0'

        if (!isValido) {
            mostrarMensajeWarningValidacion(mensajeError);
            return false;
        }*/

        if ($.trim(document.getElementById('matutino_actualizar').value) !== '') {
            arrayTurno.push({
                idCatTurno: 1,
                disponibilidadActual: $.trim(document.getElementById('matutino_actualizar').value)
            })
        }

        if ($.trim(document.getElementById('vespertino_actualizar').value) !== '') {
            arrayTurno.push({
                idCatTurno: 2,
                disponibilidadActual: $.trim(document.getElementById('vespertino_actualizar').value)
            })
        }

        if ($.trim(document.getElementById('nocturno_actualizar').value) !== '') {
            arrayTurno.push({
                idCatTurno: 3,
                disponibilidadActual: $.trim(document.getElementById('nocturno_actualizar').value)
            })
        }

        let fechaInicioSplit = document.getElementById('fecha_actualizar').value.split('-')

        let params = {
            subtipoIntervencion: tipoIntervencion,
            idGeografia2: clustersparam[0],
            fechaInicio: fechaInicioSplit[2] + '-' + fechaInicioSplit[0] + '-' + fechaInicioSplit[1].concat('T00:00:00.000+0000'),
            fechaFin: fechaInicioSplit[2] + '-' + fechaInicioSplit[0] + '-' + fechaInicioSplit[1].concat('T00:00:00.000+0000'),
            bloqueado: bloqueo,
            turnos: arrayTurno
        };
        console.log(params)

        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();

        disponibilidadService.actualizarDisponibilidad(JSON.stringify(params)).then(function success(response) {
            console.log(response.data);
            $("#modificar_disponibilidad_modal").modal('hide');
            $('#consulta_disponibilidad').trigger('click');
            $('#datatable_disponibilidad').dataTable().fnDestroy();
            if (response.data.respuesta) {
                $("#tipo_select").trigger('change');
                mostrarMensajeExitoAlert("Actualizaci\u00F3n correcta");
                $scope.consultaDisponibilidad();
            } else {
                swal.close();
                mostrarMensajeErrorAlert(response.data.resultDescripcion);
            }
        });
    }



    $scope.intervencionSelecion = function () {
        if ($scope.intervencionSelect !== undefined) {
            if ($scope.intervencionSelect.NocturnoActivo !== undefined && $scope.intervencionSelect.NocturnoActivo === 'true') {
                $scope.mostrarDisponibilidadNocturno();
            } else {
                $scope.ocultarDisponibilidadNocturno();
            }
        }
    }

    $scope.mostrarDisponibilidadNocturno = function () {
        $scope.banderaNocturno = true;
        document.getElementById('container-nocturno').style.display = 'block'
        document.getElementById('noctuurno_d').style.display = 'block'
        document.getElementById('container-noc').style.display = 'block'
        //document.getElementById('theadnocturno').style.display = 'block';
        
        $('#datatable_disponibilidad tbody').empty()
        $('#theadDispo').empty();
        //$('#datatable_disponibilidad').empty(),
        $('#datatable_disponibilidad').dataTable().fnDestroy(true);
        $("#container_table_disponibilidad").append('<table id="datatable_disponibilidad" class="table table table-hover table-striped"><thead id="theadDispo"></thead><tbody></tbody></table>');
        $scope.arrayTitulo.map(elemento =>{
            if (elemento.title === 'Nocturno') {
                elemento.vista = true
            }
            return elemento;
        });
        console.log($scope.arrayTitulo);
        let contenTheadDetalle = '';
        $scope.arrayTitulo.forEach(function(elemento,index){
            if (elemento.vista) {
                contenTheadDetalle += `<th> ${elemento.title} </th>`;
            }
        });
        
        $('#theadDispo').append(`<tr> ${contenTheadDetalle} </tr>`);

        $('#datatable_disponibilidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "recordsTotal": 100,
            "info": false,
            "autoWidth": true,
            "data": [],
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });
/*         setTimeout(function()  {
           
        }, 1000); */

    }

    $scope.ocultarDisponibilidadNocturno = function () {
        $scope.banderaNocturno = false;
        document.getElementById('container-nocturno').style.display = 'none'
        document.getElementById('noctuurno_d').style.display = 'none'
        document.getElementById('container-noc').style.display = 'none'
        //document.getElementById('theadnocturno').style.display = 'none';
        
        $('#datatable_disponibilidad tbody').empty()
        $('#theadDispo').empty();
        //$('#datatable_disponibilidad').empty(),
        $('#datatable_disponibilidad').dataTable().fnDestroy(true);
        $("#container_table_disponibilidad").append('<table id="datatable_disponibilidad" class="table table table-hover table-striped"><thead id="theadDispo"></thead><tbody></tbody></table>');
        $scope.arrayTitulo.map(elemento =>{
            if (elemento.title === 'Nocturno') {
                elemento.vista = false
            }
            return elemento;
        });
        console.log($scope.arrayTitulo);
        let contenTheadDetalle = '';
        $scope.arrayTitulo.forEach(function(elemento,index){
            if (elemento.vista) {
                contenTheadDetalle += `<th> ${elemento.title} </th>`;
            }
        });
        
        $('#theadDispo').append(`<tr> ${contenTheadDetalle} </tr>`);

        $('#datatable_disponibilidad').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "pageLength": 10,
            "recordsTotal": 100,
            "info": false,
            "autoWidth": true,
            "data": [],
            "language": idioma_espanol_not_font,
            "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
        });
/*         setTimeout(function() {
           
        }, 1000); */

    }

    $("#modal_cluster_arbol_diponibilidad").on("hidden.bs.modal", function () {
        let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
        if (selectedElms.length > 0) {
            let selected_arbol;

            selectedElms.forEach(element => {
                selected_arbol = element.text;
            });
            document.getElementById('arbol_disponibilidad_consulta').placeholder = selected_arbol
        } else {
            document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione un geografia';
        }
    })

    addClassInvalid = function (elementoId) {
        document.getElementById(elementoId).classList.add('is-invalid');
    }

    addClassValid = function (elementoId) {
        document.getElementById(elementoId).classList.add('is-valid');
    }

    document.getElementById('arbol_disponibilidad_consulta').addEventListener('click', function () {
        $('#modal_cluster_arbol_diponibilidad').modal('show');
    });

    document.getElementById('calendario-tab').addEventListener('click', function () {
        setTimeout(function () {
            $scope.calendarDisp.render();
        }, 1000);
    })

    removerClasesElementosValidacion = function (arrayIdsElementos) {
        arrayIdsElementos.forEach(elementoId => {
            document.getElementById(elementoId).classList.remove('is-invalid');
            document.getElementById(elementoId).classList.remove('is-valid')
        });
    }

    $scope.closeModalAdd = function () {
        $('#moda-add-disponibilidad').modal('hide');
    }

    $scope.closeModalModificar = function () {
        $('#modificar_disponibilidad_modal').modal('hide')
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
        return $scope.geografiaList.sort(compareGeneric)[0].nivel
    }

}]);