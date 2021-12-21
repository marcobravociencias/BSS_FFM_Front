var app = angular.module('gestionUniversalApp', []);

app.controller('gestionUniversalController', ['$scope', '$q', 'gestionUniversalService', '$filter', function ($scope, $q, gestionUniversalService, $filter) {
    $scope.nGeografia = '';
    $scope.listaGeografia = [];
    $scope.listaPuestos = [];
    $scope.idUsuario = '';
    $scope.isTecnicos = false;
    let pagosTecnicosTable;
    let pagosLiberarTable;
    let usuariosCambiaContrasena;

    $('.drop-down-filters').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });

    pagosTecnicosTable = $('#pagosTecnicosTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": false,
        "autoWidth": true,
        "language": idioma_espanol_not_font,
        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
    });


    pagosLiberarTable = $('#pagosLiberarTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": false,
        "autoWidth": true,
        "language": idioma_espanol_not_font,
        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
    });

    usuariosCambiaContrasena = $('#cambiaContrasenaTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "pageLength": 10,
        "info": false,
        "autoWidth": true,
        "language": idioma_espanol_not_font,
        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
    });



    $('#searchTextGeneral').on('keyup', function () {
        pagosTecnicosTable.search(this.value).draw();
    })

    $('#searchTextPagos').on('keyup', function () {
        pagosLiberarTable.search(this.value).draw();
    })

    $('#searchTextUsuario').on('keyup', function () {
        usuariosCambiaContrasena.search(this.value).draw();
    })

    $('#searchGeo').on('keyup', function () {
        $("#jstreeConfig").jstree("search", this.value);
    })

    $('#searchGeoOriginal').on('keyup', function () {
        $("#jstreeConfigOriginal").jstree("search", this.value);
    })

    $('#searchGeoConsulta').on('keyup', function () {
        $("#jstreeConsultaTecnicos").jstree("search", this.value);
    })

    $('#searchGeoConsultaUsuarios').on('keyup', function () {
        $("#jstreeConsultaUsuarios").jstree("search", this.value);
    })

    $scope.seleccionarTodos = function (paramFiltroParent) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = true
        })
    }

    $scope.deseleccionarTodos = function (paramFiltroParent) {
        paramFiltroParent.map(function (e) {
            e.checkedOpcion = false
        })
    }

    showImage = function (url) {
        $('#img_tec').attr('src', url);
        $('#modalFotoTecnico').modal('show');
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

    $scope.consultarTecnicosPagos = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();

        let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
        let clusters = $("#jstreeConsultaTecnicos").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id));

        if (clusters.length == 0) {
            toastr.warning('Selecciona geograf&iacute;a');
            swal.close();
            return false;
        }

        let params = { idGeografia: clusters };
        let arraRow = [];
        gestionUniversalService.consultarTecnico(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result.usuarios) {
                    if (pagosTecnicosTable) {
                        pagosTecnicosTable.destroy();
                    }
                    let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';

                    $.each(response.data.result.usuarios, function (i, elemento) {
                        let row = [];
                        let url = imgDefault;
                        if (elemento.urlFoto) {
                            url = elemento.urlFoto;
                        }
                        row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'" + url + "'" + ')"/>';
                        row[1] = elemento.no_empleado;
                        row[2] = elemento.usuario;
                        row[3] = elemento.nombreCompleto;
                        row[4] = elemento.geografia;
                        row[5] = elemento.fechaActualizacion;
                        row[6] = '<i class="fa fa-check-double icon-item" title="Liberar Pagos" onclick="consultarPagos(' + elemento.idUsuario + ')"></i>';

                        /*
                        row[6] = '<li id="nav-options" class="nav-item dropdown">' +
                            '<a  class="nav-link dropdown-toggle"  href="#" id="option-navbar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">' +
                            '<i class="fas fa-cogs"></i></a>' +
                            '<ul class="dropdown-menu"   aria-labelledby="navbarDropdown">' +
                            '<li onclick="consultarPagos(' + elemento.idUsuario + ')"><a class="dropdown-item">' +
                            '<i class="fas fa-money-bill icon-item" style="color:#737810"></i>Pagos</a>' +
                            '</li>' +
                            '</ul>' +
                            '</li>'
                        */
                        arraRow.push(row);
                    })

                    pagosTecnicosTable = $('#pagosTecnicosTable').DataTable({
                        "paging": true,
                        "lengthChange": false,
                        "ordering": false,
                        "pageLength": 10,
                        "info": false,
                        "data": arraRow,
                        "autoWidth": true,
                        "language": idioma_espanol_not_font,
                        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                    });
                }
            }
            swal.close();
        })
    }

    $scope.obtenerNivelUltimoJerarquia = function () {
        return $scope.listaGeografia.sort(compareGeneric)[0].nivel
    }

    $scope.getInformacionGeneral = function () {
        $q.all([
            gestionUniversalService.consultarConfiguracion({ "moduloAccionesUsuario": "moduloGestionUniversal" }),
            gestionUniversalService.consultarTecnicosGeografia(),
            gestionUniversalService.consultaPuestos()
        ]).then(function (results) {
            if (results[0].data && results[0].data.respuesta) {
                $scope.nGeografia = results[0].data.result.N_FILTRO_GEOGRAFIA ? Number(results[0].data.result.N_FILTRO_GEOGRAFIA) : null;
            } else {
                mostrarMensajeErrorAlert(results[0].data.resultDescripcion)
            }
            if (results[1].data.respuesta) {
                if (results[1].data.result) {
                    if (results[1].data.result.geografia || results[1].data.result.geografia.length > 0) {
                        let listGeo = [];

                        if ($scope.nGeografia) {
                            listGeo = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografia });
                        } else {
                            listGeo = results[1].data.result.geografia;
                        }
                        $scope.listaGeografia = listGeo;
                        $scope.loadArbol();
                        let geografia = listGeo;
                        geografia.map((e) => {
                            e.parent = e.padre == null ? "#" : e.padre;
                            e.text = e.nombre;
                            e.icon = "fa fa-globe";
                            e.state = {
                                opened: true,
                                selected: true,
                            }
                            return e
                        })
                        $('#jstreeConsultaTecnicos').bind('loaded.jstree', function (e, data) {

                            $scope.consultarTecnicosPagos();
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

                        $('#jstreeConsultaUsuarios').bind('loaded.jstree', function (e, data) {

                            $scope.consultarUsuariosContrasena();
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
                        mostrarMensajeWarningValidacion('No existen geografias actualmente')
                    }
                } else {
                    mostrarMensajeErrorAlert(results[1].data.result.mensaje)
                }
            } else {
                mostrarMensajeErrorAlert(results[1].data.resultDescripcion)
            }
            if (results[2].data.respuesta) {
                $scope.listaPuestos = results[2].data.result.puestos;
                $scope.seleccionarTodos($scope.listaPuestos);
            } else {
                mostrarMensajeErrorAlert(results[2].data.resultDescripcion)
            }
        }).catch(err => handleError(err));
    }

    $scope.getInformacionGeneral();
    //$scope.consultarTecnicosPagos();

    consultarPagos = function (tecnico) {
        $scope.idUsuario = tecnico;
        $scope.consultarPagosTecnico();
        $('#modalPagos').modal('show');
    }

    $scope.consultarPagosTecnico = function () {

        let params = {
            idOperador: '2' // $scope.idUsuario
        }

        gestionUniversalService.consultarPagosLiberar(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result.pagos) {
                    let arraRow = [];
                    if (pagosLiberarTable) {
                        pagosLiberarTable.destroy();
                    }
                    $.each(response.data.result.pagos, function (i, elemento) {
                        let clase = 'locked';
                        if (elemento.idEstatusPago == 3) {
                            clase = "locked";
                        } else if (elemento.idEstatusPago == 1) {
                            clase = "init";
                        }
                        let row = [];
                        row[0] = elemento.idCveCliente ? elemento.idCveCliente : '';
                        row[1] = elemento.folioSistema ? elemento.folioSistema : '';
                        row[2] = elemento.monto ? elemento.monto : '';
                        row[3] = elemento.fechaRegistroPago ? elemento.fechaRegistroPago : '';
                        row[4] = elemento.hora ? elemento.hora : '';
                        row[5] = elemento.descEstatusPago ? elemento.descEstatusPago : '';
                        row[6] = elemento.fechaHoraCierreOT ? elemento.fechaHoraCierreOT : '';
                        row[7] = elemento.tipoIntervencion ? elemento.tipoIntervencion : '';
                        row[8] = elemento.subTipoIntervencion ? elemento.subTipoIntervencion : '';
                        row[9] = '<div class="icon-status"><span class="fas ' + clase + '" id="' + elemento.idCveCliente + '" onclick="changeLock(' + elemento.idCveCliente + ', ' + elemento.idEstatusPago + ')"></span></div>'
                        if (elemento.idEstatusPago == 3) {
                            row[9] = '<input type="checkbox" class="form-check-input pagos-selected" id="' + elemento.idCveCliente + '"/>';
                        }
                        arraRow.push(row);
                    })
                    pagosLiberarTable = $('#pagosLiberarTable').DataTable({
                        "paging": true,
                        "lengthChange": false,
                        "ordering": false,
                        "pageLength": 10,
                        "info": false,
                        "data": arraRow,
                        "autoWidth": true,
                        "language": idioma_espanol_not_font,
                        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                    });
                }

            } else {
                toastr.error(response.data.resultDescripcion);
            }
        })
    }

    changeLock = function (pago, status) {
        if (status == 3) {
            let id = "#" + pago;
            if ($(id).hasClass("locked")) {
                $(id).removeClass("locked");
                $(id).addClass("unlocked");
            } else {
                $(id).removeClass("unlocked");
                $(id).addClass("locked");
            }
        }
    }

    $scope.liberarPago = function () {
        let unlocked = document.getElementsByClassName("pagos-selected");
        let ids = [];
        $.each(unlocked, function (i, elemento) {
            if (elemento.attributes.autocompleted) {
                ids.push($(elemento).attr('id'));
            }
        })

        if (ids.length) {
            swal({
                title: "Liberar pago(s)",
                text: "Comentario:",
                type: "info",
                input: "textarea",
                reverseButtons: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Liberar',
                cancelButtonText: "Cancelar",
            }).then(function (comentario) {
                if (comentario == '') {
                    toastr.warning('Para liberar los pagos debe ingresar comentario');
                } else {
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    let params = {
                        idsPagos: ids,
                        comentarios: comentario
                    }
                    gestionUniversalService.liberarPago(params).then(function success(response) {
                        if (response.data.respuesta) {
                            $scope.consultarPagosTecnico();
                        }
                    })
                }
            }).catch(err => {
                toastr.warning('Operaci&oacute;n cancelada');
            });
        } else {
            toastr.warning('Selecciona al menos un pago');
        }
    }

    $scope.abrirModalGeografiaBuscar = function () {
        $scope.isTecnicos = true;
        $("#modalGeografia").modal('show')
    }


    //MODULO CAMBIA CONTRASEÑA

    $scope.abrirModalGeografiaBuscarUsuario = function () {
        $scope.isTecnicos = false;
        $("#modalGeografia").modal('show')
    }

    $scope.consultarUsuariosContrasena = function () {

        let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
        let clusters = $("#jstreeConsultaUsuarios").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id));

        if (clusters.length == 0) {
            toastr.warning('Selecciona geograf&iacute;a');
            return false;
        }

        let puestosCopy = [];
        if ($scope.listaPuestos) {
            angular.forEach($scope.listaPuestos, (e, i) => {
                if (e.checkedOpcion) {
                    puestosCopy.push(e.id);
                }
            })
        }

        if (!puestosCopy.length) {
            toastr.warning('Selecciona al menos un puesto');
            return false;
        }

        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let params = { idsGeografia: clusters, idTipoUsuario: puestosCopy };
        let arraRow = [];
        gestionUniversalService.consultarUsuariosPorPuesto(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result.usuarios) {
                    if (usuariosCambiaContrasena) {
                        usuariosCambiaContrasena.destroy();
                    }
                    let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';

                    $.each(response.data.result.usuarios, function (i, elemento) {
                        let row = [];
                        let url = imgDefault;
                        if (elemento.urlFoto) {
                            url = elemento.urlFoto;
                        }
                        row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'" + url + "'" + ')"/>';
                        row[1] = elemento.noEmpleado;
                        row[2] = elemento.usuario;
                        row[3] = elemento.nombreCompleto;
                        row[4] = elemento.geografia;
                        row[5] = elemento.fechaActualizacion;
                        row[6] = '<i class="fa fa-key icon-item" title="Cambiar contrase&ntilde;a" onclick="restablecerContrasena(' + elemento.idUsuario + ')"></i>';
                        arraRow.push(row);
                    })
                    usuariosCambiaContrasena = $('#cambiaContrasenaTable').DataTable({
                        "paging": true,
                        "lengthChange": false,
                        "ordering": false,
                        "pageLength": 10,
                        "info": false,
                        "data": arraRow,
                        "autoWidth": true,
                        "language": idioma_espanol_not_font,
                        "sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">',
                    });
                }
            }else{
                toastr.error(response.data.resultDescripcion);
            }
            swal.close();
        })
    }


    restablecerContrasena = function (idUser) {
        $scope.idUsuario = idUser;
        $("#newPassword").val('');
        $("#confirmPassword").val('');
        $("#comentariosPassword").val('');
        $("#modalRestablecerContrasena").modal('show');
    }


    $scope.restablecer = function () {

        if ($("#newPassword").val() == '' || $("#comentariosPassword").val() == '') {
            toastr.warning('Todos los campos son obligatorios');
            return false;
        }

        if ($("#newPassword").val() !== $("#confirmPassword").val()) {
            toastr.warning('Las contrase\u00F1as no coinciden');
            return false;
        }

        let params = {
            idUsuario: $scope.idUsuario,
            nuevoPassword: $("#newPassword").val(),
            comentarios: $("#comentariosPassword").val()
        }

        gestionUniversalService.restaurarContrasena(params).then(function success(response) {
            if (response.data.respuesta) {
                $("#modalRestablecerContrasena").modal('hide');
                toastr.success('Contrase\u00F1a restablecida correctamente');
            } else {
                toastr.error(response.data.resultDescripcion);
            }
        })

    }
    //MODULO CONFIGURACION GEOGRAFIA

    $scope.getIconGeografia = function (nivel) {
        let icon = "";
        switch (true) {
            case (nivel == 2):
                icon = "fas fa-map";
                break
            case (nivel == 3):
                icon = "fas fa-map-marked-alt";
                break
            case (nivel == 4):
                icon = "fas fa-map-marker-alt"
                break
            case (nivel == 5):
                icon = "fas fa-map-pin";
                break
            default:
                icon = "fas fa-globe"
                break
        }
        return icon;
    }

    $scope.loadArbol = function () {
        let geografia = $scope.listaGeografia;
        if (geografia.length !== 0) {
            geografia.map((e) => {
                let icon = $scope.getIconGeografia(e.nivel);
                e.parent = e.padre == null ? "#" : e.padre;
                e.text = e.nombre;
                e.icon = icon;
                e.state = {
                    opened: e.nivel == 1 || e.nivel == 2 ? true : false,
                    selected: false,
                }
                return e
            })
            $('#jstreeConfigOriginal').jstree({
                'core': {
                    "check_callback": true,
                    'data': geografia,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons": true
                    }
                },
                plugins: ["contextmenu", "unique", "dnd", "search"],
                "contextmenu": {
                    "items": function ($node) {
                        var tree = $("#jstreeConfigOriginal").jstree(true);
                        return {
                            "Create": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Crear",
                                "icon": "fas fa-plus",
                                "action": function (obj) {
                                    $node = tree.create_node($node);
                                    tree.edit($node);
                                }
                            },
                            "Rename": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Editar",
                                "icon": "fas fa-pen-fancy",
                                "action": function (obj) {
                                    tree.edit($node);
                                }
                            },
                            "Remove": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Borrar",
                                "icon": "fas fa-trash",
                                "action": function (obj) {
                                    swal({
                                        title: "",
                                        text: "\u00BFSeguro que desea eliminar el nodo?",
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: '#007bff',
                                        confirmButtonText: 'Si',
                                        cancelButtonText: 'No'
                                    }).then(function (isConfirm) {
                                        if (isConfirm) {
                                            tree.delete_node($node);
                                        }
                                    }).catch(err => {

                                    });

                                }
                            }
                        };
                    }
                },
                "search": {
                    "case_sensitive": false,
                    "show_only_matches": true
                }
            }).bind('move_node.jstree', function (e, data) {
                console.log(data);
                $scope.moverNodo(data);
            }).on('keyup.jstree', function (e, dta) {
                let text = $('.jstree-rename-input').val();
                console.log(text);
            });
            $('#jstreeConfig').jstree({
                'core': {
                    "check_callback": true,
                    'data': geografia,
                    'themes': {
                        'name': 'proton',
                        'responsive': true,
                        "icons": true
                    }
                },
                plugins: ["contextmenu", "unique", "dnd", "search"],
                "contextmenu": {
                    "items": function ($node) {
                        var tree = $("#jstreeConfigOriginal").jstree(true);
                        return {
                            "Create": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Crear",
                                "icon": "fas fa-plus",
                                "action": function (obj) {
                                    $node = tree.create_node($node);
                                    tree.edit($node);
                                }
                            },
                            "Rename": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Editar",
                                "icon": "fas fa-pen-fancy",
                                "action": function (obj) {
                                    tree.edit($node);
                                }
                            },
                            "Remove": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Borrar",
                                "icon": "fas fa-trash",
                                "action": function (obj) {
                                    swal({
                                        title: "",
                                        text: "\u00BFSeguro que desea eliminar el nodo?",
                                        type: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: '#007bff',
                                        confirmButtonText: 'Si',
                                        cancelButtonText: 'No'
                                    }).then(function (isConfirm) {
                                        if (isConfirm) {
                                            tree.delete_node($node);
                                        }
                                    }).catch(err => {

                                    });

                                }
                            }
                        };
                    }
                },
                "search": {
                    "case_sensitive": false,
                    "show_only_matches": true
                }
            }).bind('move_node.jstree', function (e, data) {
                console.log(data);
                $scope.moverNodo(data);
            }).on('keyup.jstree', function (e, dta) {
                let text = $('.jstree-rename-input').val();
                console.log(text);
            });
        }
    }

    $scope.crearNodo = function () {

    }

    $scope.modificarNodo = function () {

    }

    $scope.eliminarNodo = function () {

    }

    $scope.moverNodo = function (data) {

    }

    $scope.actualizarGeocerca = function () {
        let geografia = [];
        let params = {
            "id": 0,
            "descripcion": "string",
            "nivel": 0,
            "idPadre": 0,
            "ultimoNivel": true,
            "comentarios": "string"
        }


    }


}])