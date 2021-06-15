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


    app.disponibilidadCalendar($scope);
    $scope.inicialCalendario();

    $scope.inicioDisponibilidad = function () {
        if (!$scope.banderaNocturno) {
            document.getElementById('nocturno_dispo').parentElement.style.display = 'none'
            document.getElementById('theadnocturno').style.display = 'none';
            document.getElementById('theadnocturnoporcentaje').style.display = 'none';
            //document.getElementById('container-nocturno').style.display = 'none';
            //document.getElementById('contenedor-editar-nocturno').style.display = 'none';
        }

        $scope.session_propietario = "1"//$("#propietarioempleadosess").val()

        if ($scope.session_propietario === '16')
            document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione un cluster';
        else
            document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione un distrito';

        let url = window.location.href;
        let accion = url.split('?')[1];
        console.log(accion);
        if (accion != null) {
            intro = introJs();
            intro.setOptions({
                nextLabel: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
                prevLabel: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
                showProgress: true,
                exitOnOverlayClick: false,
                keyboardNavigation: true,
                exitOnEsc: false,
                steps: guidaDisponibilidad
            });
            //intro.goToStepNumber(8);
            intro.start();
            intro.onafterchange(function (element) {
                if ($(element).attr("data-step") == 18) {

                    $("#ref_inserta").click().trigger('click');
                }
                if ($(element).attr("data-step") == 17) {
                    $("#ref_consulta").click().trigger('click');
                }
                if ($(element).attr("data-step") == 27) {
                    $("#ref_modifica").click().trigger('click');
                }
            });
            intro.onexit(function () {
                window.location.href = 'Disponibilidad';
            });
            intro.oncomplete(function () {
                window.location.href = 'Disponibilidad';
            });
        }


        $('#datatable_disponibilidad').DataTable({
            "language": idioma_espanol_not_font
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
                    //modalClusterAgrega,modalClusterConsulta,modalClusterModifica,jstreeagrega,jstreeconsulta,jstreemodifica

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
                            "icons":false

                        }
                        }
                    });

                    $scope.consultarIntervenciones();
                } else {
                    swal.close();
                    //total_loading.finish()  
                    //mostrarMensajeWarning('No se cuenta con registros para los \u00E1rboles');
                }
            } else {
                swal.close();
                //total_loading.finish()  
                //mostrarMensajeErrorAlertAjax(res.mensaje);
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
        if (company === '-1' || tipo_intervencion === '-1' || distrito_cluster === '-1') {
            return false;
        }

        let params = {
            IdCiudad: distrito_cluster,
            IdIntervencion: tipo_intervencion,
            IdCompany: company
        }


        $('#datatable_disponibilidad').dataTable().fnDestroy();

        $('#consulta_disponibilidad').attr('disabled', true);
        $('#consulta_disponibilidad').text("Cargando ...");

        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        disponibilidadService.consultaDisponibilidad(JSON.stringify(params)).then(function success(response) {
            console.log(response.data);
            if (response.data.respuesta) {
                if (response.data.result.result == '0') {
                    arrDisponibilidad = [];
                    $scope.muestraDisponibilidadCalendar(response.data.result);

                    $scope.idCompanyActualizar = company;
                    $scope.idTipoActualizar = tipo_intervencion;
                    $scope.idCiudadActualizar = distrito_cluster;

                    let textoIntervencion = $.trim($("#tipo_select option:selected").text());
                    let textoCiudad = $.trim(response.data.result.Ciudad);

                    $("#disponibilidad_span").text(textoCiudad.substr(0, 1) + "" + (textoCiudad.substr(1, textoCiudad.length - 1)).toLowerCase());
                    $("#intervencion_span").text(textoIntervencion.substr(0, 1) + "" + (textoIntervencion.substr(1, textoIntervencion.length - 1)).toLowerCase());

                    $("#matutino_dispo").text(response.data.result.CapacidadMatutino === "" ? 0 : response.data.result.CapacidadMatutino);
                    $("#vespertino_dispo").text(response.data.result.CapacidadVespertino === "" ? 0 : response.data.result.CapacidadVespertino);

                    let styleHide = ''
                    if (!$scope.banderaNocturno) {
                        styleHide = 'display:none'
                    } else {
                        $('#nocturno_dispo').text(response.data.result.CapacidadNocturno === '' ? 0 : response.data.result.CapacidadNocturno);
                    }

                    $("#total_dispo").text(response.data.result.CapacidadTotal === "" ? 0 : response.data.result.CapacidadTotal);

                    let arrayResult = (response.data.result.Disponibilidad !== undefined && response.data.result.Disponibilidad !== null) ? response.data.result.Disponibilidad.Dia !== undefined ? response.data.result.Disponibilidad.Dia : [] : [];
                    //let arrayResult = [];
                    $('#datatable_disponibilidad tbody').empty();
                    $.each(arrayResult, function (i, elemento) {

                        $("#datatable_disponibilidad").append("<tr>\n\
                                    <td class='fecha_elem'>"+ elemento.Fecha + "</td>\n\
                                        <td class='cantidad_matutino'>"+ elemento.Matutino + "</td>\n\
                                        <td class='cantidad_vespertino'>"+ elemento.Vespertino + "</td>\n\
                                        <td style='"+ styleHide + "' class='cantidad_nocturno'>" + elemento.Nocturno + "</td>\n\
                                        <td>"+ elemento.CapInicioDia + "</td>\n\
                                        <td tag_bloque='"+ elemento.bloqueado + "' class='tipo_bloqueo_disp'>" + (elemento.bloqueado === '0' ? 'DISPONIBLE' : "BLOQUEADO") + "</td>\n\
                                        <td> "+ elemento.PorAgendaM + " %</td>\n\
                                        <td> "+ elemento.PorAgendaV + " %</td>\n\
                                        <td style='"+ styleHide + "'> " + elemento.PorAgendaN + " %</td>\n\
                                        <td> "+ elemento.PorTotalAgendado + " %</td>\n\
                                        <td>\n\
                                        <i class='cursorEfect edit_disponibilidad_btn fa fa-edit'></i> \n\
                        </tr>");
                    });/****/
                    $('#datatable_disponibilidad').DataTable({
                        "language": idioma_espanol_not_font
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
        let nocturnoCantidad;
        let companiaInserta = $.trim(document.getElementById('compania_select').value);
        let tipoIntervencion = $scope.intervencionSelect.ID;
        let vespertinoCant = $.trim(document.getElementById('vespertino_adddisp').value);
        let matutinoCant = $.trim(document.getElementById('matutino_adddisp').value);
        let fechaInicio = $.trim(document.getElementById('fecha_inicio_adddisp').value);
        let fechaFin = $.trim(document.getElementById('fecha_fin_adddisp').value);

        let isValido = true;
        let mensajeError = "";
        let distrito_cluster = '-1';
        let bloqueo = $("input[name='radio-bloqueo-adddisp-individual']:checked").val();
        bloqueo = bloqueo === 'activo' ? '0' : '1';

        let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
        let selected_arbol;

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
        }

        if (isValido) {
            let params = {
                Fecha_Inicio: fechaInicio,
                Fecha_Fin: fechaFin,
                IdCompany: companiaInserta,
                IDCiudad: distrito_cluster,
                Vespertino: vespertinoCant,
                Matutino: matutinoCant,
                Bloqueo: bloqueo,
                Tipo: tipoIntervencion,
                Nocturno: nocturnoCantidad
            };

            swal({ text: 'Espera un momento...', allowOutsideClick: false });
            swal.showLoading();
            disponibilidadService.insertarDisponibilidad(JSON.stringify(params)).then(function success(response) {
                console.log(response.data);
                if (response.data.respuesta) {
                    if (response.data.result.Result === '0') {
                        //removerClasesElementosValidacion(arrayIdsElementosValidacionInsercion)
                        mostrarMensajeExitoAlert('Se agreg\u00F3 correctamente la disponibilidad');
                        $scope.consultaDisponibilidad();
                        $("#moda-add-disponibilidad").modal('hide')
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
            mostrarMensajeWarningValidacion(mensajeError);
            return false;
        }

    }

    $scope.actualizarDisponibilidad = function () {
        let isValido = true;
        let mensajeError = "";

        let matutinoCant = $.trim(document.getElementById('matutino_actualizar').value);
        let vespertinoCant = $.trim(document.getElementById('vespertino_actualizar').value);
        let nocturnoCant = $.trim(document.getElementById('nocturno_actualizar').value);

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
        }

        let params = {
            IdCompany: $scope.idCompanyActualizar,
            Tipo: $scope.idTipoActualizar,
            idEncierro: $scope.idCiudadActualizar,
            FechaInicio: document.getElementById('fecha_actualizar').value,
            FechaFin: document.getElementById('fecha_actualizar').value,
            CAP_M: matutinoCant,
            CAP_V: vespertinoCant,
            CAP_N: cantidadNoct,
            POR_INCREMENTO: bloqueo
        };
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();

        disponibilidadService.actualizarDisponibilidad(JSON.stringify(params)).then(function success(response) {
            console.log(response.data);
            $("#modificar_disponibilidad_modal").modal('hide');
            $('#consulta_disponibilidad').trigger('click');
            $('#datatable_disponibilidad').dataTable().fnDestroy();
            if (response.data.respuesta) {
                if (response.data.result.Result === '0') {
                    $("#tipo_select").trigger('change');
                    mostrarMensajeExitoAlert("Actualizaci\u00F3n correcta");
                    $scope.consultaDisponibilidad();
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

    $scope.consultarIntervenciones = function () {
        disponibilidadService.consultarIntervenciones().then(function success(response) {
            console.log(response.data);
            if (response.data.respuesta) {
                if (response.data.result.result == '0') {
                    if (response.data.result.Intervencion.length > 0) {

                        $scope.arrayIntervencion = response.data.result.Intervencion.filter(intervencion => { return intervencion.Activo === '0' });

                        /*  $.each(response.data.result.Intervencion, function (index, elementoCatalogo) {
                             $scope.arrayIntervencion.push(elementoCatalogo);
                         }); *//*
                       $.each(response.data.result.Intervencion,function(index,elementoCatalogo){
                           if( elementoCatalogo.Activo==='0'){
                               $("#tipo_select_inserta").append("<option tag-nocturno='"+elementoCatalogo.NocturnoActivo+"' value='"+elementoCatalogo.ID+"'>"+elementoCatalogo.Descripcion+"</option>");
                           }
                       });	 

                       $.each(response.data.result.Intervencion,function(index,elementoCatalogo){
                           if( elementoCatalogo.Activo==='0'){
                               $("#tipo_select_modificar").append("<option tag-nocturno='"+elementoCatalogo.NocturnoActivo+"' value='"+elementoCatalogo.ID+"'>"+elementoCatalogo.Descripcion+"</option>");
                           }
                       });	 */
                        swal.close();
                    } else {
                        swal.close();
                        //total_loading.finish();
                        mostrarMensajeErrorAlert('No existen intervenciones actualmente');
                    }
                } else {
                    swal.close();
                    //total_loading.finish();
                    mostrarMensajeErrorAlert(response.data.result.resultdescription);
                }

            } else {
                swal.close();
                //total_loading.finish();
                mostrarMensajeErrorAlert(response.data.resultDescripcion);
            }
        });
    }

    $scope.intervencionSelecion = function () {
        if ($scope.intervencionSelect !== undefined) {
            if ($scope.intervencionSelect.NocturnoActivo !== undefined && $scope.intervencionSelect.NocturnoActivo === 'true') {
                $scope.mostrarDisponibilidadNocturno();
                $scope.consultaDisponibilidad();
            } else {
                $scope.ocultarDisponibilidadNocturno();
                $scope.consultaDisponibilidad();
            }
        }
    }

    $scope.mostrarDisponibilidadNocturno = function () {
        $scope.banderaNocturno = true;
        document.getElementById('nocturno_dispo').parentElement.style.display = 'block'
        document.getElementById('theadnocturno').style.display = 'block'
        document.getElementById('theadnocturnoporcentaje').style.display = 'block'
        document.getElementById('container-nocturno').style.display = 'block'
        document.getElementById('contenedor-editar-nocturno').style.display = 'block'
    }

    $scope.ocultarDisponibilidadNocturno = function () {
        $scope.banderaNocturno = false;
        document.getElementById('nocturno_dispo').parentElement.style.display = 'none'
        document.getElementById('theadnocturno').style.display = 'none'
        document.getElementById('theadnocturnoporcentaje').style.display = 'none'
        document.getElementById('container-nocturno').style.display = 'none'
        document.getElementById('contenedor-editar-nocturno').style.display = 'none'
    }

    $("#modal_cluster_arbol_diponibilidad").on("hidden.bs.modal", function () {
        let selectedElms = $('#jstreeconsulta').jstree("get_selected", true);
        let object_arbol;
        if ($scope.session_propietario === '16') {
            selectedElms.forEach(element => {
                object_arbol = element.original;
                console.log(element)
            });
            //Si el arbol es de cluster
            if (object_arbol !== undefined && object_arbol.Nivel === '5') {
                document.getElementById('arbol_disponibilidad_consulta').placeholder = object_arbol.text;
                $scope.consultaDisponibilidad();
            } else {
                document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione un cluster';
            }
        } else {
            selectedElms.forEach(element => {
                object_arbol = element.original;
                console.log(element)
            });
            //Si el arbol es de distrito
            if (object_arbol !== undefined && object_arbol.Nivel === '3') {
                document.getElementById('arbol_disponibilidad_consulta').placeholder = object_arbol.text;
                $scope.consultaDisponibilidad();
            } else {
                document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione un distrito';
            }
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

    $scope.closeModalAdd = function(){
        $('#moda-add-disponibilidad').modal('hide');
    }

    $scope.closeModalModificar = function(){
        $('#modificar_disponibilidad_modal').modal('hide')
    }

}]);