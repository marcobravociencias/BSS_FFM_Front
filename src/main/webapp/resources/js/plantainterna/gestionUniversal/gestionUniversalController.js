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


    $scope.consultarTecnicosPagos = function(){
        if (pagosTecnicosTable) {
            pagosTecnicosTable.destroy();
        }
        let imgDefault = './resources/img/plantainterna/despacho/tecnicootasignada.png';
        let arraRow = [];
        $.each(listaUsuarios.result.result.usuarios, function (i, elemento) {
            let row = [];
            let url = imgDefault;
            if(elemento.urlFoto){
                url =  elemento.urlFoto;
            }
            row[0] = '<img style="cursor:pointer;border-radius: 25px" src="' + url + '" alt="Foto" width="40" height="40" onclick="showImage('+"'"+url+"'"+')"/>';
            row[1] = elemento.nombreCompleto;
            row[2] = elemento.noEmpleado;
            row[3] = elemento.usuario;
            row[4] = elemento.geografia;
            row[5] ='<li id="nav-options" class="nav-item dropdown">'+
                        '<a  class="nav-link dropdown-toggle"  href="#" id="option-navbar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">'+
                        '<i class="fas fa-cogs"></i></a>'+
                        '<ul class="dropdown-menu"   aria-labelledby="navbarDropdown">'+
                            '<li><a class="dropdown-item">'+
                                '<i class="fas fa-money-bill icon-item"></i>Liberar pago</a>'+
                            '</li>'+
                        '</ul>'+
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

    showImage = function(url){
        console.log(url);
        $('#img_tec').attr('src', url);
        $('#modalFotoTecnico').modal('show');
    }

    $scope.consultarTecnicosPagos();
   
}])