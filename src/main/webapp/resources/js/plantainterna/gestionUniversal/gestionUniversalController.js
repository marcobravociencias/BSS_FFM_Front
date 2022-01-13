var app = angular.module('gestionUniversalApp', []);

app.controller('gestionUniversalController', ['$scope', '$q', 'gestionUniversalService', '$filter', function ($scope, $q, gestionUniversalService, $filter) {
    $scope.nGeografiaPagos = '';
    $scope.nGeografiaContrasenia=''
    $scope.listaGeografia = [];
    $scope.listaPuestos = [];
    $scope.listaTecnicosPagos = [];
    $scope.listaUsuarios = [];
    $scope.idUsuario = '';
    $scope.usuarioFoto = {};
    $scope.isTecnicos = false;
    $scope.tecnicoPagos = {};
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

    showImage = function (id, type) {
        let url = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        let usuario = {};
        if (type == 'tecnico') {
            usuario = $scope.listaTecnicosPagos.find((e) => e.numEmpleado == id);
            usuario.nombreCompleto = usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno;
            usuario.puesto = 'T\u00C9CNICO';
            usuario.noEmpleado = usuario.numEmpleado;
            usuario.usuario = usuario.usuarioFFM;
        } else {
            usuario = $scope.listaUsuarios.find((e) => e.noEmpleado == id);
        }
        if (usuario) {
            if (!usuario.urlFoto) {
                usuario.urlFoto = url;
            }
            $scope.usuarioFoto = usuario;
            $('#img_tec').attr('src', usuario.urlFoto);
            $scope.$apply();
            $('#modalFotoTecnico').modal('show');
        }
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


        let params = { idGeografias: clusters, idEstatusPagos: [1, 2, 3] };
        let arraRow = [];

        if (pagosTecnicosTable) {
            pagosTecnicosTable.destroy();
        }
        gestionUniversalService.consultarPagosLiberar(params).then(function success(response) {
            if (response.data.result) {
                if (response.data.respuesta) {
                    if (response.data.result.usuarios) {
                        $scope.listaTecnicosPagos = response.data.result.usuarios;
                        $.each(response.data.result.usuarios, function (i, elemento) {
                            let row = [];
                            let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';
                            let url = imgDefault;
                            if (elemento.urlFoto) {
                                url = elemento.urlFoto;
                            }
                            let nombreCompleto = elemento.nombre + ' ' + elemento.apellidoPaterno + ' ' + elemento.apellidoMaterno;

                            row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'" + elemento.numEmpleado + "', 'tecnico'" + ')"/>';
                            row[1] = elemento.numEmpleado ? elemento.numEmpleado : '-';
                            row[2] = elemento.usuarioFFM ? elemento.usuarioFFM : '-';
                            row[3] = nombreCompleto;
                            row[4] = elemento.ciudadOrigen ? elemento.ciudadOrigen : '-';
                            row[5] = '<i class="fa fa-check-double icon-item" title="Liberar Pagos" onclick="consultarPagos(' + "'" + elemento.numEmpleado + "'" + ')"></i>';
                            arraRow.push(row);
                        })


                    } else {
                        toastr.error(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error(response.data.resultDescripcion);
                }
            }
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
            if (results[0].data.result && results[0].data.respuesta) {
                let resultConf= results[0].data.result
                if( resultConf.MODULO_ACCIONES_USUARIO && resultConf.MODULO_ACCIONES_USUARIO.llaves){
                    let  llavesResult=results[0].data.result.MODULO_ACCIONES_USUARIO.llaves;                    
                    $scope.nGeografiaPagos = llavesResult.N_FILTRO_GEOGRAFIA_PAGOS_TECNICOS  ? Number( llavesResult.N_FILTRO_GEOGRAFIA_PAGOS_TECNICOS ) : null; 
                    $scope.nGeografiaContrasenia = llavesResult.N_FILTRO_GEOGRAFIA_CAMBIOCONTRASENIA    ? Number(llavesResult.N_FILTRO_GEOGRAFIA_CAMBIOCONTRASENIA) : null;    
                    $scope.nEstatusPagosTecnicos = llavesResult.N_ESTATUS_PAGOS_TECNICOS    ? Number(llavesResult.N_ESTATUS_PAGOS_TECNICOS) : null;                        
                    $scope.permisosConfigUser = resultConf.MODULO_ACCIONES_USUARIO.permisos; 
                }
            } else {
                mostrarMensajeErrorAlert(results[0].data.resultDescripcion)
            }
            if (results[1].data.result && results[1].data.respuesta) {
                if (results[1].data.result) {
                    if (results[1].data.result.geografia || results[1].data.result.geografia.length > 0) {
                        let listGeo = [];
                        if ($scope.nGeografiaPagos) {
                            listGeo = results[1].data.result.geografia.filter(e => { return e.nivel <= $scope.nGeografiaPagos });
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
            if (results[2].data.result && results[2].data.respuesta) {
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
        $scope.tecnicoPagos = $scope.listaTecnicosPagos.find((e) => e.numEmpleado == tecnico)

        if ($scope.tecnicoPagos.pagos.length) {
            let arraRow = [];
            if (pagosLiberarTable) {
                pagosLiberarTable.destroy();
            }
            $.each($scope.tecnicoPagos.pagos, function (i, elemento) {
                let clase = 'init';
                if (elemento.idEstatusPago == 3) {
                    clase = "free";
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
                row[9] = '<div class="icon-status"><span class="fas ' + clase + '" id="' + elemento.folioSistema + '" onclick="changeLock(' + "'" + elemento.folioSistema + "'," + elemento.idEstatusPago + ')"></span></div>'
                if (elemento.idEstatusPago == 2) {
                    row[9] = '<input type="checkbox" onclick="changeCheck(this)" class="form-check-input pagos-selected" id="' + elemento.idPago + '"/>';
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
            $('#modalPagos').modal('show');
        } else {
            toastr.warning('No se encontraron pagos para mostrar');
        }

    }

    changeCheck = function (event) {
        $.each($scope.tecnicoPagos.pagos, function (i, elemento) {
            if ($(event).attr('id') == elemento.idPago) {
                elemento.isChecked = $(event).is(":checked");
            }
        })
    }

    $scope.liberarPago = function () {
        let ids = [];
        $.each($scope.tecnicoPagos.pagos, function (i, elemento) {
            if (elemento.isChecked) {
                ids.push(elemento.idPago);
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
                    toastr.warning('Para liberar los pagos debe ingresar un comentario');
                } else {
                    swal({ text: 'Espera un momento...', allowOutsideClick: false });
                    swal.showLoading();
                    let params = {
                        idsPagos: ids,
                        comentarios: comentario
                    }
                    gestionUniversalService.liberarPago(params).then(function success(response) {
                        if (response.data.respuesta) {
                            $('#modalPagos').modal('hide');
                            $scope.consultarTecnicosPagos();
                            toastr.success('Se han liberado los pagos correctamente');

                        }else{
                            toastr.error(response.data.resultDescripcion);
                        }
                        swal.close();
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
        $("#modalGeografia").modal('show');
        setTimeout(function () {
            $("#searchGeoConsulta").focus();
        }, 750);
    }


    //MODULO CAMBIA CONTRASEÑA

    $scope.abrirModalGeografiaBuscarUsuario = function () {
        $scope.isTecnicos = false;
        $("#modalGeografia").modal('show');
        setTimeout(function () {
            $("#searchGeoConsultaUsuarios").focus();
        }, 750);
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
        if (usuariosCambiaContrasena) {
            usuariosCambiaContrasena.destroy();
        }
        gestionUniversalService.consultarUsuariosPorPuesto(params).then(function success(response) {
            if (response.data.result) {
                if (response.data.respuesta) {
                    if (response.data.result && response.data.result.usuarios) {
                        $scope.listaUsuarios = response.data.result.usuarios;

                        let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';

                        $.each(response.data.result.usuarios, function (i, elemento) {
                            let row = [];
                            let url = imgDefault;
                            if (elemento.urlFoto) {
                                url = elemento.urlFoto;
                            }
                            row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="30" height="30" onclick="showImage(' + "'" + elemento.noEmpleado + "', 'usuario'" + ')"/>';
                            row[1] = elemento.noEmpleado ? elemento.noEmpleado : 'Sin informaci&oacute;n';
                            row[2] = elemento.puesto ? elemento.puesto : 'Sin informaci&oacute;n';
                            row[3] = elemento.usuario ? elemento.usuario : 'Sin informaci&oacute;n';
                            row[4] = elemento.nombreCompleto ? elemento.nombreCompleto : 'Sin informaci&oacute;n';
                            row[5] = elemento.geografia ? elemento.geografia : 'Sin informaci&oacute;n';
                            row[6] = elemento.fechaActualizacion ? elemento.fechaActualizacion : 'Sin informaci&oacute;n';
                            row[7] = '<i class="fa fa-key icon-item" title="Cambiar contrase&ntilde;a" onclick="restablecerContrasena(' + elemento.idUsuario + ')"></i>';
                            arraRow.push(row);
                        })

                    } else {
                        toastr.error(response.data.resultDescripcion);
                    }
                } else {
                    toastr.error(response.data.resultDescripcion);
                }
            }
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
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionUniversalService.restaurarContrasena(params).then(function success(response) {
            swal.close();
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