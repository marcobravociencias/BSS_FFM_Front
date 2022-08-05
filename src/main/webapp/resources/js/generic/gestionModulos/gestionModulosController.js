var app = angular.module('gestionModulosApp', []);

app.controller('gestionModulosController', ['$scope', '$q', '$filter', 'gestionModulosService', function ($scope, $q, $filter, gestionModulosService) {
    var modulosTable;
    var accionesTable;
    $scope.permiso = { nivel: 1 };
    $scope.isCrear = true;
    $scope.isModulo = true;

    modulosTable = $('#modulosTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "pageLength": 5,
        "info": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font
    });

    accionesTable = $('#accionesTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "pageLength": 5,
        "info": false,
        "autoWidth": false,
        "language": idioma_espanol_not_font
    });

    $scope.abrirMdlNuevo = function () {
        $scope.isCrear = true;
        $scope.permiso = {};
        if($scope.isModulo){
            $scope.permiso.tipo = '1';
        }else{
            $scope.permiso.tipo = '2';
            $scope.permiso.modulo = '1';
            $("#permisoModulo").prop("disabled", true);
        }
        $("#permisoTipo").prop("disabled", true);
      

        $("#modalNuevo").modal('show');
      
    }

    abrirMdlEditar = function (id) {
        $scope.isCrear = false;
        $scope.permiso = {};
        $("#modalNuevo").modal('show');
    }

    $scope.getInformation = function () {
        $q.all([
            gestionModulosService.consultarUnidadNegocio(),
            gestionModulosService.consultarPropietarios()
        ]).then(function (results) {
            if (results[0].data !== undefined) {
                if (results[0].data.respuesta) {
                    if (results[0].data.result) {

                    } else {
                        toastr.info('No se encontr\u00F3 catalogo de unidades de negocio');
                    }
                } else {
                    toastr.warning(results[0].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de unidades de negocio');
            }

            if (results[1].data !== undefined) {
                if (results[1].data.respuesta) {
                    if (results[1].data.result) {

                    } else {
                        toastr.info('No se encontr\u00F3 catalogo de propietarios');
                    }
                } else {
                    toastr.warning(results[1].data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta del catalogo de propietarios');
            }

        }).catch(err => handleError(err));
    }

    $scope.getInformation();

    $scope.consultaPermisos = function () {
        swal({ text: 'Espera un momento...', allowOutsideClick: false });
        swal.showLoading();
        gestionModulosService.consultarPermisos().then(function success(response) {
            swal.close();
            let arraRow = [];
            if (response.data !== undefined) {
                if (response.data.respuesta) {
                    if (response.data.result) {
                        $.each(response.data.result.permisos, function (i, elemento) {

                            row[0] = elemento.nombre ? elemento.nombre : 'Sin informaci&oacute;n';
                            row[1] = elemento.clave ? elemento.clave : 'Sin informaci&oacute;n';
                            row[2] = elemento.nivel ? elemento.nivel : 'Sin informaci&oacute;n';
                            row[3] = elemento.nivel == 1 ? 'M&oacute;dulo' : 'Acci&oacute;n';
                            row[4] = elemento.propietario ? elemento.propietario : 'Sin informaci&oacute;n';
                            row[5] = elemento.unidadNegocio ? elemento.unidadNegocio : 'Sin informaci&oacute;n';
                            row[6] = elemento.fechaActualizacion ? elemento.fechaActualizacion : 'Sin informaci&oacute;n';
                            row[7] = elemento.activo ? 'Si' : 'No';
                            row[8] = '<span onclick="abrirMdlEditar(' + elemento.idUsuario + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><i class="fa fa-edit" aria-hidden="true"></i></span>';
                            row[9] = '<span onclick="verDetalle(' + elemento.idUsuario + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><i class="fa fa-bars" aria-hidden="true"></i></span>';
                            row[10] = '<span onclick="eliminarPermiso(' + elemento.idUsuario + ')" class="btn-floating btn-option btn-sm btn-secondary waves-effect waves-light acciones"><i class="fa fa-trash" aria-hidden="true"></i></span>';

                            arraRow.push(row);
                        })
                    } else {
                        toastr.info('No se encontraron permisos');
                    }
                } else {
                    toastr.warning(response.data.resultDescripcion);
                }
            } else {
                toastr.error('Ha ocurrido un error en la consulta de permisos');
            }
            modulosTable = $('#modulosTable').DataTable({
                "paging": true,
                "lengthChange": false,
                "ordering": true,
                "pageLength": 10,
                "info": true,
                "searching": false,
                "bDestroy": true,
                "scrollX": false,
                "data": arraRow,
                "autoWidth": false,
                "language": idioma_espanol_not_font,
                "aoColumnDefs": [
                    { "aTargets": [11], "bSortable": false }
                ]
            });
        })
    }

    //$scope.consultaPermisos();

    $scope.editarPermiso = function () {

    }

    verDetalle = function () {
        $scope.isModulo = false;
        $scope.$apply();
    }

    $scope.changeModulos = function (){
        $scope.isModulo = true;
    }

    eliminarPermiso = function () {

    }

    $scope.guardarPermiso = function () {
        if ($scope.validateForm()) {

        }
    }

    $scope.validateForm = function () {
        let text = "";
        if ($("#permisoTipo").val() === null  || $("#permisoTipo").val() === "" || $("#permisoTipo").val() === undefined) {
            $("#permisoTipo").addClass("input-valid-error");
            text += "<li>Tipo permiso</li>";
        }

        if ($scope.permiso.tipo == 1) {
            if ($("#permisoModulo").val() === null || $("#permisoModulo").val() === "" || $("#permisoModulo").val() === undefined) {
                $("#permisoModulo").addClass("input-valid-error");
                text += "<li>M&oacute;dulo</li>";
            }
        }

        if ($("#permisoNombre").val() === "" || $("#permisoNombre").val() === undefined) {
            $("#permisoNombre").addClass("input-valid-error");
            text += "<li>Nombre</li>";
        }

        if ($("#permisoClave").val() === "" || $("#permisoClave").val() === undefined) {
            $("#permisoClave").addClass("input-valid-error");
            text += "<li>Clave</li>";
        }

        if ($("#permisoColor").val() === "" || $("#permisoColor").val() === undefined) {
            $("#permisoColor").addClass("input-valid-error");
            text += "<li>Color</li>";
        }

        if ($("#permisoColorHover").val() === "" || $("#permisoColorHover").val() === undefined) {
            $("#permisoColorHover").addClass("input-valid-error");
            text += "<li>Color hover</li>";
        }

        if ($("#permisoIcono").val() === "" || $("#permisoIcono").val() === undefined) {
            $("#permisoIcono").addClass("input-valid-error");
            text += "<li>Icono</li>";
        }

        if ($("#permisoPropietario").val() === null || $("#permisoPropietario").val() === "" || $("#permisoPropietario").val() === undefined) {
            $("#permisoPropietario").addClass("input-valid-error");
            text += "<li>Propietario</li>";
        }

        if ($("#permisoNegocio").val() === null || $("#permisoNegocio").val() === "" || $("#permisoNegocio").val() === undefined) {
            $("#permisoNegocio").addClass("input-valid-error");
            text += "<li>Unidad de negocio</li>";
        }

        if (text !== "") {
            let info = "Verifica los siguientes campos: " + text;
            mostrarMensajeWarningValidacion(info);
            return false;
        } else {
            return true;
        }
    }

}]);

