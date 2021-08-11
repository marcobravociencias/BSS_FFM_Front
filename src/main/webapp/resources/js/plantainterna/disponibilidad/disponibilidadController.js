var app = angular.module('disponibilidadApp', []);

app.controller('disponibilidadController', ['$scope', 'disponibilidadService', 'genericService', function ($scope, disponibilidadService, genericService) {
    $("#li-disponibilidad-navbar").addClass('active')
    $scope.banderaNocturno = false
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

    $( document ).ready(function() {
        $scope.inicialCalendario();
        $scope.inicioDisponibilidad();
        editarDisponibilidad = function(matutino, vespertino, nocturno, bloqueado, fecha){
            document.getElementById('matutino_actualizar').value = matutino;
            document.getElementById('vespertino_actualizar').value = vespertino;
            if (nocturno !== '') {
                document.getElementById('nocturno_actualizar').value = nocturno;
                document.getElementById('contenedor-editar-nocturno').style.display = 'block'
            } else{
                document.getElementById('contenedor-editar-nocturno').style.display = 'none'
            }
            document.getElementById('fecha_actualizar').value = fecha
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
        }

        document.getElementById('arbol_disponibilidad_consulta').placeholder = 'Seleccione ...';
        let contenTheadDetalle = '';
        $scope.arrayTitulo.forEach(function (elemento, index) {
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

        $('#moduloDisponibilidad').addClass('active');
        $("#campos_dinamicos").hide();
        $("#btn_mostrar_nav").hide(500);
    }

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
        }).catch(err => handleError(err));
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
        }).catch(err => handleError(err));
    }

    $scope.consultarCatalogoArbol();

    $scope.consultaDisponibilidad = function () {
        let mensaje = '<ul>';
        let isValidado = true;
        let company = document.getElementById('compania_select').value;
        let tipo_intervencion = $scope.intervencionSelect !== undefined ? $scope.intervencionSelect.id : 0;
        let distrito_cluster = '-1';


        let ultimonivel=$scope.obtenerNivelUltimoJerarquia()
        let clustersparam=$("#jstreeconsulta").jstree("get_selected", true)
                                               .filter(e=>e.original.nivel== ultimonivel)
                                               .map(e=>parseInt(e.id))

        if (tipo_intervencion === 0) {
            mensaje += '<li>Seleccione una intervenci&oacute;n</li>'
            isValidado = false
        }

        if (clustersparam.length === 0) {
            mensaje += '<li>Seleccione una geografia</li>'
            isValidado = false
        }

        if (isValidado) {
            if (!swal.isVisible()) {
                swal({ text: 'Espera un momento...', allowOutsideClick: false });
                swal.showLoading();
            }

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
                        });
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
            }).catch(err => handleError(err));
        } else {
            mensaje += '</ul>'
            mostrarMensajeWarningValidacion(mensaje)
        }
        
    }

    $scope.insertarDisponibilidad = function () {
        let nocturnoCantidad = $.trim(document.getElementById('nocturno_adddisp').value);
        let arrayTurno = [];
        //let companiaInserta = $.trim(document.getElementById('compania_select').value);
        let tipoIntervencion = $scope.intervencionSelect.id;
        let vespertinoCant = $.trim(document.getElementById('vespertino_adddisp').value);
        let matutinoCant = $.trim(document.getElementById('matutino_adddisp').value);
        let fechaInicio = $.trim(document.getElementById('fecha_inicio_adddisp').value);
        let fechaFin = $.trim(document.getElementById('fecha_fin_adddisp').value);

        let isValido = true;
        let mensajeError = "<ul>";
        let bloqueo = $("input[name='checkBloque']:checked").val();
        bloqueo = bloqueo === 'true' ? 1 : bloqueo === 'false'? 0 : undefined;
        let ultimonivel=$scope.obtenerNivelUltimoJerarquia()
        let clustersparam=$("#jstreeconsulta").jstree("get_selected", true)
                                               .filter(e=>e.original.nivel== ultimonivel)
                                               .map(e=>parseInt(e.id))
        if (matutinoCant !== '') {
            arrayTurno.push({
                idCatTurno: 1,
                cantidad: matutinoCant
            })
        } else{
            mensajeError += '<li>Introducir cantidad turno matutino</li>'
            isValido = false
        }

        if (vespertinoCant !== '') {
            arrayTurno.push({
                idCatTurno: 2,
                cantidad: vespertinoCant
            })
        } else{
            mensajeError += '<li>Introducir cantidad turno vespertino</li>'
            isValido = false
        }

       

        let fechaInicioSplit = fechaInicio.split('/');
        let fechaFinSplit = fechaFin.split('/');

        if (fechaInicioSplit[0] == "") {
            mensajeError += '<li>Seleccione fecha inicio.</li>'
            isValido = false
        }
        if (fechaFinSplit[0] == "") {
            mensajeError += '<li>Seleccione fecha fin.</li>'
            isValido = false
        }
        if (bloqueo === undefined) {
            mensajeError += '<li>Seleccione bloqueo.</li>'
            isValido = false
        }

        if (new Date(fechaInicioSplit[1] + "/" + fechaInicioSplit[0] + "/" + fechaInicioSplit[2]) >
            new Date(fechaFinSplit[1] + "/" + fechaFinSplit[0] + "/" + fechaFinSplit[2])) {
            isValido = false;
            mensajeError += "<li>La fecha de inicio no puede ser mayor a la de fin</li>";
        }

        if ($scope.banderaNocturno) {
            if (nocturnoCantidad !== '') {
                arrayTurno.push({
                    idCatTurno: 3,
                    cantidad: nocturnoCantidad
                })
            } else{
                mensajeError += '<li>Introducir cantidad turno nocturno</li>'
                isValido = false
            }
        }
        
        if (isValido) {
            let fechaInicioC = fechaInicioSplit[2] + '-' + fechaInicioSplit[1] + '-' + fechaInicioSplit[0]
            let fechaFinC = fechaFinSplit[2] + '-' + fechaFinSplit[1] + '-' + fechaFinSplit[0]
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
            }).catch(err => handleError(err));
        } else {
            mensajeError += '</ul>'
            mostrarMensajeWarningValidacion(mensajeError);
            return false;
        }

    }

    $scope.actualizarDisponibilidad = function () {
        let isValido = true;
        let mensajeError = "<ul>";
        let arrayTurno = [];

        let matutinoCant = $.trim(document.getElementById('matutino_actualizar').value);
        let vespertinoCant = $.trim(document.getElementById('vespertino_actualizar').value);
        let nocturnoCant = $.trim(document.getElementById('nocturno_actualizar').value);
        let tipoIntervencion = $scope.intervencionSelect.id;
        let bloqueo = $("input[name='radio-bloqueo-mod-individual']:checked").val();
        bloqueo = bloqueo === 'true' ? 1 : 0;
        let ultimonivel=$scope.obtenerNivelUltimoJerarquia()
        let clustersparam=$("#jstreeconsulta").jstree("get_selected", true)
                                               .filter(e=>e.original.nivel== ultimonivel)
                                               .map(e=>parseInt(e.id))

        if (matutinoCant !== '' && matutinoCant !== '0') {
            arrayTurno.push({
                idCatTurno: 1,
                disponibilidadActual: matutinoCant
            })
        } else {
            mensajeError += '<li>Introducir cantidad turno matutino</li>';
            isValido = false;
        }

        if (vespertinoCant !== '' && vespertinoCant !== '0') {
            arrayTurno.push({
                idCatTurno: 2,
                disponibilidadActual: vespertinoCant
            })
        } else{
            mensajeError += '<li>Introducir cantidad turno vespertino</li>';
            isValido = false;
        }

        if ($scope.banderaNocturno) {
            if (nocturnoCant !== '' && nocturnoCant !== '0') {
                arrayTurno.push({
                    idCatTurno: 3,
                    disponibilidadActual: nocturnoCant
                })
            } else{
                mensajeError += '<li>Introducir cantidad turno nocturno</li>';
                isValido = false;
            }
        }
        if (!bloqueo) {
            mensajeError += '<li>Seleccione bloqueo.</li>'
            isValido = false
        }

        if (isValido) {
            let fechaInicioSplit = document.getElementById('fecha_actualizar').value
            let params = {
                subtipoIntervencion: tipoIntervencion,
                idGeografia2: clustersparam[0],
                fechaInicio: fechaInicioSplit.concat('T00:00:00.000+0000'),
                fechaFin: fechaInicioSplit.concat('T00:00:00.000+0000'),
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
            }).catch(err => handleError(err));
        } else {
            mensajeError += '</ul>'
            mostrarMensajeWarningValidacion(mensajeError)
        }


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
        
        $('#datatable_disponibilidad tbody').empty()
        $('#theadDispo').empty();
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
    }

    $scope.ocultarDisponibilidadNocturno = function () {
        $scope.banderaNocturno = false;
        document.getElementById('container-nocturno').style.display = 'none'
        document.getElementById('noctuurno_d').style.display = 'none'
        document.getElementById('container-noc').style.display = 'none'
        
        $('#datatable_disponibilidad tbody').empty()
        $('#theadDispo').empty();
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

    document.getElementById('arbol_disponibilidad_consulta').addEventListener('click', function () {
        $('#modal_cluster_arbol_diponibilidad').modal('show');
    });

    document.getElementById('calendario-tab').addEventListener('click', function () {
        setTimeout(function () {
            $scope.calendarDisp.render();
        }, 1000);
    })

    $scope.closeModalAdd = function () {
        $('#moda-add-disponibilidad').modal('hide');
    }

    $scope.closeModalModificar = function () {
        $('#modificar_disponibilidad_modal').modal('hide')
    }

    compareGeneric = (a,b) =>{
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