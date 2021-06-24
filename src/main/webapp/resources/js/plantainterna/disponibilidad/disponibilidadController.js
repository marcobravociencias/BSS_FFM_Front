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

        $(document.body).on("click", ".edit_disponibilidad_btn", function () {
            trElementInstanciaClick = $(this).closest('tr');
            var fechaSplit = $.trim($(trElementInstanciaClick).find('.fecha_elem').text()).split('-');
            $("#matutino_actualizar").val($.trim($(trElementInstanciaClick).find('.cantidad_matutino').text()));
            $("#vespertino_actualizar").val($.trim($(trElementInstanciaClick).find('.cantidad_vespertino').text()));
            $("#fecha_actualizar").val(fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0]);
            if ($scope.banderaNocturno) {
                $('#nocturno_actualizar').val($.trim($(trElementInstanciaClick).find('.cantidad_nocturno').text()));
            }
            $("#modificar_disponibilidad_modal").modal('show');

            var tipo_bloque = $(this).closest('tr').find('.tipo_bloqueo_disp').attr('tag_bloque');
            if (tipo_bloque === "0") {
                $("#radio_activo_mod").trigger('click');
            } else {
                $("#radio_inactivo_mod").trigger('click');
            }
        });
    }

    $scope.inicioDisponibilidad();

    $scope.consultarIntervenciones = function () {
        disponibilidadService.consultarIntervenciones().then(function success(response) {
            console.log(response.data);
            if (response.data.respuesta) {
                if (response.data.result.result == '0') {
                    if (response.data.result.Intervencion.length > 0) {

                        $scope.arrayIntervencion = response.data.result.Intervencion.filter(intervencion => { return intervencion.Activo === '1' });
                        swal.close();
                    } else {
                        swal.close();
                        mostrarMensajeErrorAlert('No existen intervenciones actualmente');
                    }
                } else {
                    swal.close();
                    mostrarMensajeErrorAlert(response.data.result.resultdescription);
                }

            } else {
                swal.close();
                mostrarMensajeErrorAlert(response.data.resultDescripcion);
            }
        });
    }

    $scope.consultarCatalogoArbol = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            param1: '6',
            param2: '1',
            param3: '3'
        }
        genericService.consultarCatalogo(JSON.stringify(params)).then(function success(response) {
            console.log(response.data)
            if (response.data.respuesta) {
                if (response.data.result.result === "0") {
                    let icon_check = '';
                    let data_arbol = [];
                    let texto_descripcion = '';
                    $.each(response.data.result.info[0].General_Arbol.arbol, function (index, elementoArbol) {
                        if (elementoArbol.ID_Padre === "-1")
                            return;

                        switch (elementoArbol.Nivel) {
                            case '0':
                                icon_check = 'fa fa-building';
                                break;
                            case '1':
                                icon_check = 'fa fa-globe';
                                break;
                            case '2':
                                icon_check = 'fa fa-crosshairs';
                                break;
                            case '3':
                                icon_check = 'fa fa-cubes';
                                break;
                            case '4':
                                icon_check = 'fa fa-cube';
                                break;
                        }

                        //pinta todo el arbol
                        data_arbol.push({
                            id: elementoArbol.ID,
                            parent: ((elementoArbol.ID_Padre == 'nulo' || elementoArbol.ID_Padre == 'NULO' || elementoArbol.ID_Padre == '' || elementoArbol.ID_Padre == 'null') ? '#' : elementoArbol.ID_Padre),
                            text: elementoArbol.ID_Description,
                            icon: icon_check,
                            Nivel: elementoArbol.Nivel
                        });
                    });

                    $('#jstreeconsulta').jstree({
                        'plugins': ["wholerow", "checkbox"],
                        'core': {
                            'data': data_arbol,
                            'themes': {
                                'name': 'proton',
                                'responsive': true,
                                "icons": false

                            }
                        }
                    });

                    $scope.consultarIntervenciones();
                } else {
                    swal.close();
                }
            } else {
                swal.close();
            }
        });
    }

    $scope.consultarCatalogoArbol();

    $scope.consultaDisponibilidad = function () {

        let company = document.getElementById('compania_select').value;
        let tipo_intervencion = $scope.intervencionSelect !== undefined ? $scope.intervencionSelect.ID : '-1';
        let distrito_cluster = '-1';


        let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
        let selected_arbol;

        selectedElms.forEach(element => {
            selected_arbol = element.original;
        });

        if (selected_arbol !== undefined) {
            if ($scope.session_propietario === '16') {
                if (selected_arbol !== undefined && selected_arbol.Nivel === '5') {
                    distrito_cluster = selected_arbol.id;
                }
            } else {
                if (selected_arbol !== undefined && selected_arbol.Nivel === '3') {
                    distrito_cluster = selected_arbol.id;
                }
            }
        }

        let params = {
            subtipoIntervencion: 1,
            geografia2: 3
        }


        $('#datatable_disponibilidad').dataTable().fnDestroy();

        $('#consulta_disponibilidad').attr('disabled', true);
        $('#consulta_disponibilidad').text("Cargando ...");

        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
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
                            array[5] = 'BLOQUEADO';
                            array[6] = '<i class="cursorEfect edit_disponibilidad_btn fa fa-edit"></i>'
                        } else {
                            array[3] = totalTurnos;
                            array[4] = 'BLOQUEADO';
                            array[5] = '<i class="cursorEfect edit_disponibilidad_btn fa fa-edit"></i>'
                        }
                        arraRow.push(array); 
                        /*$("#datatable_disponibilidad").append("<tr>\n\
                        <td class='fecha_elem'>"+ elemento.fecha + "</td>\n\
                            <td class='cantidad_matutino'>"+ totalMatutino + "</td>\n\
                            <td class='cantidad_vespertino'>"+ totalVespertino + "</td>\n\
                            <td style='"+ styleHide + "' class='cantidad_nocturno'>" + totalNocturno + "</td>\n\
                            <td>"+ totalTurnos + "</td>\n\
                            <td tag_bloque='"+ elemento.bloqueado + "' class='tipo_bloqueo_disp'>" + (elemento.bloqueado ? 'DISPONIBLE' : "BLOQUEADO") + "</td>\n\
                            <td>\n\
                            <i class='cursorEfect edit_disponibilidad_btn fa fa-edit'></i> \n\
                    </tr>");*/
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
    }

   

    $scope.insertarDisponibilidad = function () {

        console.log("*********************************");
        let nocturnoCantidad = $.trim(document.getElementById('nocturno_adddisp').value);
        let arrayTurno = [];
        let companiaInserta = $.trim(document.getElementById('compania_select').value);
        let tipoIntervencion = $scope.intervencionSelect.ID;
        let vespertinoCant = $.trim(document.getElementById('vespertino_adddisp').value);
        let matutinoCant = $.trim(document.getElementById('matutino_adddisp').value);
        let fechaInicio = $.trim(document.getElementById('fecha_inicio_adddisp').value);
        let fechaFin = $.trim(document.getElementById('fecha_fin_adddisp').value);

        let isValido = true;
        let mensajeError = "";
        let distrito_cluster = '-1';
        let bloqueo = $("input[name='checkBloque']:checked").val();
        bloqueo = bloqueo === 'true' ? 1 : 0;

        let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
        let selected_arbol;
        /*
                $.each(selectedElms, function (index, elem) {
                    selected_arbol = elem.original;
                    console.log(elem)
                });
        
                if (selected_arbol !== undefined) {
                    if ($scope.session_propietario === '16') {
                        if (selected_arbol !== undefined && selected_arbol.Nivel === '5') {
                            distrito_cluster = selected_arbol.id;
                        }
                    } else {
                        if (selected_arbol !== undefined && selected_arbol.Nivel === '3') {
                            distrito_cluster = selected_arbol.id;
                        }
                    }
                }
        
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
        }

        if (vespertinoCant !== '') {
            arrayTurno.push({
                idCatTurno: 2,
                cantidad: vespertinoCant
            })
        }

        if (nocturnoCantidad !== '') {
            arrayTurno.push({
                idCatTurno: 3,
                cantidad: nocturnoCantidad
            })
        }


        let fechaInicioSplit = fechaInicio.split('/');
        let fechaFinSplit = fechaFin.split('/');


        let fechaInicioC = fechaInicioSplit[2] + '-' + fechaInicioSplit[1] + '-' + fechaInicioSplit[0]
        let fechaFinC = fechaFinSplit[2] + '-' + fechaFinSplit[1] + '-' + fechaFinSplit[0]
        isValido = true
        if (isValido) {

            let params = {
                subtipoIntervencion: 1,
                idGeografia2: 3,
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
        let bloqueo = $("input[name='radio-bloqueo-mod-individual']:checked").val();
        bloqueo = bloqueo === 'true' ? 1 : 0;

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
            subtipoIntervencion: 1,
            idGeografia2: 3,
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

}]);