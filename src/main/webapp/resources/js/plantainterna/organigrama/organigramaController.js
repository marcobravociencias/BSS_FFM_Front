var app = angular.module('organigramaApp', []);

app.controller('organigramaController', ['$scope', '$q', '$filter', 'organigramaService', function ($scope, $q, $filter, organigramaService) {
    var regexUrl = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    var windowOrg;
    $scope.listaSubordinados = [];
    $scope.selectedItem = 0;

    document.addEventListener("click", (e) => {
        if (windowOrg !== undefined) {
            windowOrg.close();
        }
    });

    showContent = function (id, type) {
        switch (type) {
            case 1:
                windowOrg = window.open('/FFMCLOUD/moduloDespacho', 'popup', 'width=1300,height=500');
                windowOrg.usuario = id;
                break;

            case 2:
                windowOrg = window.open('/FFMCLOUD/moduloUsuarios', 'popup', 'width=1300,height=500');
                windowOrg.usuario = id;
                break;

            case 3:
                windowOrg = window.open('/FFMCLOUD/moduloGestionTecnicos', 'popup', 'width=1300,height=500');
                windowOrg.usuario = id;
                break;

            default:
                break;
        }
    }

    $scope.consultarOrganigrama = function () {
        swal({ text: 'Espere un momento ...', allowOutsideClick: false });
        swal.showLoading();
        let params = {
            idSupervisor: "156896"
        }


        organigramaService.consultarJerarquiaOrganigrama(params).then(function success(response) {
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        if (response.data.result.subordinados) {
                            $scope.listaSubordinados = response.data.result.subordinados;

                            $scope.nodes = [];
                            $scope.nodes.push({
                                id: $("#empleadohidden").val(),
                                pid: null,
                                Nombre: $("#nombreempleadohidden").val() + ' ' + $("#primerapempleadohidden").val() + ' ' + $("#segundoapempleadohidden").val(),
                                Puesto: $("#puestoempleadohidden").val(),
                                Numero: $("#numempleadohidden").val(),
                                Contacto: $("#contactoempleadohidden").val(),
                                img: $("#fotoempleadohidden").val() ? $("#fotoempleadohidden").val() : './resources/img/generic/defaultPerfil.png'
                            });
                            angular.forEach($scope.listaSubordinados, function (elemento, index) {
                                $scope.nodes.push({
                                    id: elemento.idTecnico,
                                    pid: $("#empleadohidden").val(),
                                    Nombre: elemento.nombre + ' ' + elemento.apellidoPaterno + ' ' + elemento.apellidoMaterno,
                                    Puesto: elemento.descripcionTipoUsuario,
                                    Numero: elemento.numeroEmpleado,
                                    Contacto: elemento.numContacto,
                                    Usuario: elemento.usuarioFfm,
                                    Cambia: 'Cambiar contrase&ntilde;a',
                                    img: regexUrl.test(elemento.urlFotoPerfil) ? elemento.urlFotoPerfil : './resources/img/generic/defaultPerfil.png'
                                });
                            });
                            OrgChart.templates.diva.size = [215, 310];
                            OrgChart.templates.diva.field_1 =
                                '<text data-width="190" text-anchor="start" style="font-size: 14px;" fill="#696a6b" x="10" y="150">{val}</text>';
                            OrgChart.templates.diva.field_0 =
                                '<text data-width="190" text-anchor="middle"  style="font-size: 15px;font-weight:bold;" fill="#000" x="100" y="110">{val}</text>';
                            OrgChart.templates.diva.field_2 =
                                '<text data-width="190" text-anchor="start"  style="font-size: 14px;" fill="#696a6b" x="10" y="180">{val}</text>';
                            OrgChart.templates.diva.field_3 =
                                '<text data-width="190" text-anchor="start"  style="font-size: 14px;" fill="#696a6b" x="10" y="210">{val}</text>';
                            OrgChart.templates.diva.field_4 =
                                '<text data-width="190" text-anchor="start"  style="font-size: 14px;" fill="#696a6b" x="10" y="240">{val}</text>';
                            OrgChart.templates.diva.field_5 =
                                '<text data-width="190" text-anchor="start" onclick="cambiaContrasena()" style="font-size: 14px;cursor:pointer; font-weight:bold" fill="#0c56d0" x="10" y="280">{val}</text>';
                            OrgChart.templates.diva.node =
                                '<rect x="0" y="60" height="250" width="210" fill="#fff" stroke-width="1" stroke="#aeaeae"></rect>' +
                                '<line x1="210" y1="60" x2="0" y2="60" stroke-width="4" stroke="rgb(22, 103, 184)"></line>';
                            OrgChart.templates.diva.img_0 =
                                '<circle cx="105" cy="50" r="42" fill="#fff"></circle><clipPath id="{randId}"><circle cx="105" cy="50" r="35"></circle></clipPath>'
                                + '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="65" y="10" width="80" height="80"></image>';

                            OrgChart.templates.diva.nodeCircleMenuButton = {
                                radius: 18,
                                x: 210,
                                y: 190,
                                color: '#fff',
                                stroke: 'rgb(22, 103, 184)'
                            };

                            OrgChart.SEARCH_PLACEHOLDER = "Buscar"; // the default value is "Search"

                            var chart = new OrgChart(document.getElementById("tree"), {
                                enableSearch: true,
                                orientation: OrgChart.orientation.top,
                                //layout: OrgChart.mixed,
                                template: "diva",
                                scaleInitial: 0.65,
                                nodeCircleMenu: {
                                    addNode: {
                                        icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" y="-12" x="-8" viewBox="0 0 450 550"><path fill="#aeaeae" d="M400 64h-48V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H160V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V160h352v298a6 6 0 0 1-6 6zm-52.849-200.65L198.842 404.519c-4.705 4.667-12.303 4.637-16.971-.068l-75.091-75.699c-4.667-4.705-4.637-12.303.068-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l44.104 44.461 111.072-110.181c4.705-4.667 12.303-4.637 16.971.068l22.536 22.718c4.667 4.705 4.636 12.303-.069 16.97z"/></svg>',
                                        text: "Control asistencia",
                                        color: "#fff"
                                    },
                                    editNode: {
                                        icon: OrgChart.icon.edit(24, 24, '#aeaeae'),
                                        text: "Editar",
                                        color: "white"
                                    },
                                    addClink: {
                                        icon: OrgChart.icon.user(24, 24, '#aeaeae'),
                                        text: "Despacho",
                                        color: '#fff'
                                    }
                                },
                                nodeBinding: {
                                    field_0: "Nombre",
                                    field_1: "Puesto",
                                    field_2: "Numero",
                                    field_3: "Usuario",
                                    field_4: "Contacto",
                                    field_5: "Cambia",
                                    img_0: "img"
                                },
                                nodes: $scope.nodes
                            });
                            chart.on('click', function (sender, args) {
                                $scope.selectedItem = args.node.id;
                                return false;

                            });
                            chart.nodeCircleMenuUI.on('click', function (sender, args) {
                                switch (args.menuItem.text) {
                                    case "Control asistencia": showContent(args.nodeId, 3);
                                        break;
                                    case "Despacho": showContent(args.nodeId, 1);
                                        break;
                                    case "Editar": showContent(args.nodeId, 2);
                                        break;
                                    default:
                                };
                            });


                            swal.close()
                        }
                    } else {
                        swal.close();
                        toastr.info('No se encontraron datos');
                    }
                } else {
                    swal.close();
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                swal.close();
                toastr.error('Ha ocurrido un error en la consulta de los datos');
            }
        }).catch(err => handleError(err));
    }



    $scope.consultarOrganigrama();

    cambiaContrasena = function () {
        $scope.selectedItem = 0;
        $("#newPassword").val('');
        $("#confirmPassword").val('');
        $("#comentariosPassword").val('');
        $("#modalRestablecerContrasena").modal('show');
    }

    $scope.restablecer = function () {
        regex = /^(?=.*[a-z])\S{9,20}$/;
        numero = /(?=.*\d)/;
        allow = /(?=.*[\u0040]|[\u0024]|[\u0021]|[\u0025]|[\u002A]|[\u0023]|[\u003F]|[\u0026])/;
        refuse = /(?=.*[\u0020]|[\u0022]|[\u0027]|[\u0028]|[\u0029]|[\u002B]|[\u002C]|[\u002D]|[\u002E]|[\u002F]|[\u003A]|[\u003B]|[\u003C]|[\u003D]|[\u003E]|[\u007B-\u00FF])/;

        if ($("#newPassword").val() == '' || $("#comentariosPassword").val() == '') {
            toastr.warning('Todos los campos son obligatorios');
            return false;
        }

        if (validateCreed) {
            if (validateCreedMask !== null && validateCreedText !== '') {
                if (!validateCreedMask.test($("#newPasswordUserLogin").val())) {
                    toastr.warning('Formato invalido');
                    return false;
                }
            } else {
                if ($("#newPassword").val().length <= 8 || !regex.test($("#newPassword").val()) || !numero.test($("#newPassword").val())
                    || !allow.test($("#newPassword").val()) || refuse.test($("#newPassword").val())) {
                    toastr.warning('Formato invalido');
                    return false;
                }
            }
        }


        if ($("#newPassword").val() !== $("#confirmPassword").val()) {
            toastr.warning('Las contrase\u00F1as no coinciden');
            return false;
        }

        let params = {
            idUsuario: $scope.selectedItem,
            nuevoPassword: $("#newPassword").val(),
            comentarios: $("#comentariosPassword").val()
        }
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        organigramaService.restaurarContrasena(params).then(function success(response) {
            swal.close();
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $("#modalRestablecerContrasena").modal('hide');
                        toastr.success('Contrase\u00F1a restablecida correctamente');
                    } else {
                        toastr.warning('No se restablecio la contrase\u00F1a');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error al restablecer la contrase\u00F1a');
            }
        })

    }

}])
