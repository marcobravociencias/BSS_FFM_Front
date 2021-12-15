var app = angular.module('gestionUniversalApp', []);

app.controller('gestionUniversalController', ['$scope', 'gestionUniversalService', '$filter', function ($scope, gestionUniversalService, $filter) {

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

    $('#searchTextGeneral').on('keyup', function () {
        pagosTecnicosTable.search(this.value).draw();
    })

    $('#searchGeo').on('keyup', function () {
        $("#jstreeConfig").jstree("search", this.value);
    })


    $scope.consultarTecnicosPagos = function () {
        if (pagosTecnicosTable) {
            pagosTecnicosTable.destroy();
        }
        let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        let arraRow = [];
        $.each(listaUsuarios.result.result.usuarios, function (i, elemento) {
            let row = [];
            let url = imgDefault;
            if (elemento.urlFoto) {
                url = elemento.urlFoto;
            }
            row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="34" height="34" onclick="showImage(' + "'" + url + "'" + ')"/>';
            row[1] = elemento.nombreCompleto;
            row[2] = elemento.noEmpleado;
            row[3] = elemento.usuario;
            row[4] = elemento.geografia;
            row[5] = '<li id="nav-options" class="nav-item dropdown">' +
                '<a  class="nav-link dropdown-toggle"  href="#" id="option-navbar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">' +
                '<i class="fas fa-cogs"></i></a>' +
                '<ul class="dropdown-menu"   aria-labelledby="navbarDropdown">' +
                '<li><a class="dropdown-item">' +
                '<i class="fas fa-money-bill icon-item"></i>Liberar pago</a>' +
                '</li>' +
                '</ul>' +
                '</li>'
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

    showImage = function (url) {
        console.log(url);
        $('#img_tec').attr('src', url);
        $('#modalFotoTecnico').modal('show');
    }

    $scope.consultarTecnicosPagos();


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
        let geografia = listTree.result.geografia;
        if (geografia.length !== 0) {
            geografia.map((e) => {
                let icon = $scope.getIconGeografia(e.nivel);
                e.parent = e.padre == undefined ? "#" : e.padre;
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
                        console.log($node);
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

    $scope.loadArbol();

    $scope.crearNodo = function () {

    }

    $scope.modificarNodo = function () {

    }

    $scope.eliminarNodo = function () {

    }

    $scope.moverNodo = function (data) {

    }
}])