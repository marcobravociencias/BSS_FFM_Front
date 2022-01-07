app.edicionNoticiaController=function($scope,gestionNoticiasService){
    console.log("#####edicion")

	angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");

		$('#fecha-inicio-editarnoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#fecha-inicio-editarnoticia').datepicker('update', new Date());


		$('#fecha-fin-editarnoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#fecha-fin-editarnoticia').datepicker('update', new Date());
    });
    $scope.editObj={}
    $scope.banderaEdicionImagen=false

    $scope.edicionNoticaContent=false
    abrirModalEdicion=function(index){
        $scope.editObj=$scope.litadoNoticiasTemp[index]
        $scope.banderaEdicionImagen=true;
        $scope.edicionNoticaContent=true
        $scope.fileCargaArchivoNoticiaEdit = {
            "archivo":  $scope.editObj.urlBanner,
            "nombre":   $scope.editObj.nombreBanner
        };		        
        $scope.fileDecargaNoticaEdicion = {
            "archivo": $scope.editObj.urlArchivo,
            "nombre":  $scope.editObj.nombreArchivo
        };	

        $scope.$apply()
        console.log("###$scope.",$scope.editObj )
    }

    /** Archivos banner */

    $scope.removerImagenEditar=function(){
		$scope.fileCargaArchivoNoticiaEdit={}
		$("#archivoEditarNoticia").val(''); 
	}
    $scope.triggerInputFileEditar=function(){
		$("#archivoEditarNoticia").click();
	}
    $scope.cargarFotoNoticiaEdicion = function (e) {
        $scope.banderaEdicionImagen=false;
		$scope.fileCargaArchivoNoticiaEdit={}
		if (e.target.files[0]) {
			let nombreArchivo = e.target.files[0].name;
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				$scope.fileCargaArchivoNoticiaEdit = {
					"archivo": base64[1],
					"nombre": nombreArchivo
				};				
				$scope.$apply();
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
	}


    /** Archivos descarga */
    $scope.eliminarArchivoDescargaEdicion=function(){
		$scope.fileDecargaNoticaEdicion={}
		$("#cargarArchivoDescargaEdicion").val(''); 
	}
    $scope.triggerArchivoDescargaEdicion=function(){
        $("#cargarArchivoDescargaEdicion").click();
    }
    $scope.cargarArchivoDescargaEdicion = function (e) {
		console.log("trigger archivo !!! ---")
		$scope.fileDecargaNoticaEdicion={}
		if (e.target.files[0]) {
			let nombreArchivo = e.target.files[0].name;
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				$scope.fileDecargaNoticaEdicion = {
					"archivo": base64[1],
					"nombre": nombreArchivo
				};				
				$scope.$apply();
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
	}

};










