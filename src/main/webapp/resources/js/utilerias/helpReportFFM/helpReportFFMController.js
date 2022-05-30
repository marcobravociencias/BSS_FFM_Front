var app = angular.module('helpReportFFMApp', []);

app.controller('helpReportFFMController', ['$scope', 'genericService', '$q', function ($scope, genericService, $q) {
    $scope.arrayTablaName = []
    $scope.queryArea = ''

    angular.element(document).ready(function () {
		$("#idBody").removeAttr("style");
        $scope.consultarTablas()
	});

    $scope.consultarTablas = function(){
        $scope.arrayTablaName = []
        $scope.queryArea = ''
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
	    swal.showLoading();
        genericService.consultarNombreTablas().then(result =>{
            console.log(result)
            swal.close()
            if (result.data.respuesta) {
                $scope.arrayTablaName = result.data.result
            } else{
                mostrarMensajeWarningValidacion(result.data.resultDescripcion)
            }

        }).catch(err => handleError(err));
    }

    changeSelect = function () {
        let table = document.getElementById('selectTableQ').value
        if (table) {
            $scope.queryArea = "SELECT * FROM ".concat(table)
            $scope.$apply();
            $scope.consultaRequestQuery()
        }
        
    }

    $scope.consultaRequestQuery = function(){
        swal({ html: '<strong>Espera un momento...</strong>', allowOutsideClick: false });
	    swal.showLoading();
        let params = {
            query: $scope.queryArea
        }
        genericService.consultaRequestQuery(params).then(result =>{
            console.log(result)
            swal.close()
            if (result.data.respuesta) {
                $scope.pintarTablaRespuestaQuery(result.data.result)
            } else{
                mostrarMensajeWarningValidacion(result.data.resultDescripcion)
                $('#divTableQuery').append('')
            }

        }).catch(err => handleError(err));
    }

    $scope.pintarTablaRespuestaQuery = function(data){
        $('#divTableQuery').html('')
        let headTable = '<table id="queryTable" class="display table hover" cellspacing="0" width="100%">'
        let footerTable = '</table>'
        let contentTheaBody = ''
        let contentTable = ''
        let contentThead = ''
        let contentTbody = ''
        let bodyTr = ''
        data.elementosColumna.forEach(elemento => {
            contentTheaBody += `<th> ${elemento.alias} </th>`;
        });

        
        JSON.parse(data.elementosResult).forEach(elemento =>{
            let body = ''
            for (let index = 0; index < elemento.length; index++) {               
                 body += `<td> ${elemento[index]} </td>`
            }
            bodyTr += `<tr> ${body} </tr>`
        })

        contentTbody += `<tbody> ${bodyTr} </tbody>`
        contentThead += `<thead id='thead_queryReport'> ${contentTheaBody} </thead>`
        contentTable = headTable + contentThead + contentTbody + footerTable
        $('#divTableQuery').html(contentTable)
    }
}]);