var app = angular.module('gestionUniversalApp', []);

app.controller('gestionUniversalController', ['$scope', '$q', 'gestionUniversalService', '$filter', function ($scope, $q, gestionUniversalService, $filter) {
    $scope.nGeografia = '';
    $scope.listaGeografia = [];
    let pagosTecnicosTable;
    let pagosLiberarTable;

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

    $('#searchTextGeneral').on('keyup', function () {
        pagosTecnicosTable.search(this.value).draw();
    })

    $('#searchGeo').on('keyup', function () {
        $("#jstreeConfig").jstree("search", this.value);
    })

    $('#searchGeoConsulta').on('keyup', function () {
        $("#jstreeconsulta").jstree("search", this.value);
    })

    $scope.consultarTecnicosPagos = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        let ultimonivel = $scope.obtenerNivelUltimoJerarquia()
        let clusters = $("#jstreeconsulta").jstree("get_selected", true)
            .filter(e => e.original.nivel == ultimonivel)
            .map(e => parseInt(e.id));
        let params = { idGeografia: clusters };
        let arraRow = [];
        gestionUniversalService.consultarTecnico(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result.usuarios != "") {
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
                        row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="34" height="34" onclick="showImage(' + "'" + url + "'" + ')"/>';
                        row[1] = elemento.no_empleado;
                        row[2] = elemento.usuario;
                        row[3] = elemento.nombreCompleto;
                        row[4] = elemento.geografia;
                        row[5] = elemento.fechaActualizacion;
                        row[6] = '<li id="nav-options" class="nav-item dropdown">' +
                            '<a  class="nav-link dropdown-toggle"  href="#" id="option-navbar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">' +
                            '<i class="fas fa-cogs"></i></a>' +
                            '<ul class="dropdown-menu"   aria-labelledby="navbarDropdown">' +
                            '<li onclick="consultarPagos(' + elemento.idUsuario + ')"><a class="dropdown-item">' +
                            '<i class="fas fa-money-bill icon-item" style="color:#737810"></i>Pagos</a>' +
                            '</li>' +
                            '</ul>' +
                            '</li>'
                        arraRow.push(row);
                    })
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

    $scope.obtenerNivelUltimoJerarquia = function () {
        return $scope.listaGeografia.sort(compareGeneric)[0].nivel
    }

    $scope.getInformacionGeneral = function () {
        $q.all([
            gestionUniversalService.consultarConfiguracion({ "moduloAccionesUsuario": "moduloGestionUniversal" }),
            gestionUniversalService.consultarTecnicosGeografia()
        ]).then(function (results) {
            if (results[0].data && results[0].data.respuesta) {
                $scope.nGeografia = results[0].data.result.N_FILTRO_GEOGRAFIA ? Number(results[0].data.result.N_FILTRO_GEOGRAFIA) : null;
            } else {
                toastr.warning(results[0].data.resultDescripcion);
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
                        $('#jstreeconsulta').bind('loaded.jstree', function (e, data) {
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

                    } else {
                        mostrarMensajeWarningValidacion('No existen geografias actualmente')
                    }
                } else {
                    mostrarMensajeErrorAlert(results[1].data.result.mensaje)
                }
            } else {
                mostrarMensajeErrorAlert(results[1].data.resultDescripcion)
            }
        }).catch(err => handleError(err));
    }

    $scope.getInformacionGeneral();
    //$scope.consultarTecnicosPagos();

    consultarPagos = function (tecnico) {
        let params = {
            idOperador: '2'
        }
        gestionUniversalService.consultarPagosLiberar(params).then(function success(response) {
            if (response.data.respuesta) {
                if (response.data.result.pagos) {
                    let arraRow = [];
                    if (pagosLiberarTable) {
                        pagosLiberarTable.destroy();
                    }
                    $.each(response.data.result.pagos, function (i, elemento) {
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
                        row[9] = '<span class="icon-lock fa locked" id="' + elemento.idCveCliente + '" onclick="changeLock('+elemento.idCveCliente+')"></span>'
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
                }
               
            }else{
                toastr.error(response.data.resultDescripcion);
            }
        })

    }

    changeLock = function(pago){
        let id = "#" + pago;
        //console.log(id);
        //console.log( $(id).hasClass("locked"));

    }

    liberarPago = function () {
        let params = {
            idsPagos: [],
            comentarios: ""
        }
        gestionUniversalService.liberarPago(params).then(function success(response) {
            if (response.data.respuesta) {

            }
        })
    }

    $scope.abrirModalGeografiaBuscar = function () {
        $("#modalGeografia").modal('show')
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
                        var tree = $("#jstreeConfig").jstree(true);
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


}])