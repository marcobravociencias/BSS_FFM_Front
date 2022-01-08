app.edicionNoticiaController=function($scope,gestionNoticiasService){    
    $scope.editObj={}
    $scope.banderaEdicionImagen=false
    $scope.edicionNoticaContent=false
    $scope.isSeleccionGeografiaEdicion=false
    $scope.banderaArchivoBanner=false;
    $scope.banderaArchivoDescarga=false;
    abrirModalEdicion=function(index){
        $("#jstre-content-geofrafia-edicon").jstree().deselect_all(true);
        $scope.editObj=angular.copy( $scope.litadoNoticiasTemp[index] )
        $scope.editObj.idNoticia=$scope.editObj.id
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
        //Formato de consulta YYYY-MM-DD
        let arrDateInicio=$scope.editObj.fechaInicio.split("-")
        let arrDateFin=$scope.editObj.fechaExpiracion.split("-")

        //Formato de converion a date   MM/DD/YYYY
        var timestampinit = Date.parse(`${arrDateInicio[1]}/${arrDateInicio[2]}/${arrDateInicio[0]}`);
        var timestampfin = Date.parse(`${arrDateFin[1]}/${arrDateFin[2]}/${arrDateFin[0]}`);

        var dateInicio = new Date(timestampinit);
        var dateExpiracion = new Date(timestampfin);
 
        $('#fecha-inicio-editarnoticia').datepicker('update', dateInicio );
        $('#fecha-fin-editarnoticia').datepicker('update', dateExpiracion );

        if( $scope.editObj.idGeografias.length == 1 && ( $scope.editObj.idGeografias[0] == 1 || $scope.editObj.idGeografias[0] == -1 ) ){
            $('#jstre-content-geofrafia-edicon').jstree('select_all')  
            $scope.isSeleccionGeografiaEdicion=true
        }else if($scope.editObj.idGeografias.length >=1){
            $('#jstre-content-geofrafia-edicon').jstree(true).select_node($scope.editObj.idGeografias );
            $scope.isSeleccionGeografiaEdicion=true
        }else{
            $scope.isSeleccionGeografiaEdicion=false
        }

        $scope.mostrarFechasDefinidasEdicion=$scope.editObj.permanente == 1 ? true :false;
        $scope.banderaArchivoBanner=false;
        $scope.banderaArchivoDescarga=false;
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
        $scope.banderaArchivoBanner=true;
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
		}else{
            $scope.$apply();
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
        $scope.banderaArchivoDescarga=true;
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
		}else{
            $scope.$apply();
        }
	}

    $scope.abrirGeografiaEdicion=function(){
		$('#searchGeoEdicion').val('');
		$("#jstre-content-geofrafia-edicon").jstree("search", '');
		$("#modal-geografia-edicion").modal('show')
	}
	    
	$scope.limpiarFormularioEditarNotica=function(){
		$scope.editObj={}		
		$scope.removerImagenEditar()
		$scope.eliminarArchivoDescargaEdicion()		
        $('#fecha-inicio-editarnoticia').datepicker('update', new Date() );
        $('#fecha-fin-editarnoticia').datepicker('update', new Date() );
	}

    $scope.actualizarNoticia = function() {
        if( !$scope.validarEdicionNoticia() ){
         
            if($scope.mostrarFechasDefinidasEdicion){
                $('#fecha-inicio-editarnoticia').datepicker('update', new Date());
                $('#fecha-fin-editarnoticia').datepicker('update', new Date());
            }

            let arrayDataInicio=document.getElementById('fecha-inicio-editarnoticia').value.split('/');
            let arrayDataFin=document.getElementById('fecha-fin-editarnoticia').value.split('/');

            let formatFechaInicio=arrayDataInicio[2]+"-"+arrayDataInicio[1]+"-"+arrayDataInicio[0]
            let formatFechaFin=arrayDataFin[2]+"-"+arrayDataFin[1]+"-"+arrayDataFin[0]
            
            $scope.editObj.archivoBanner =$scope.fileCargaArchivoNoticiaEdit.archivo ? $scope.fileCargaArchivoNoticiaEdit.archivo : '' ;
            $scope.editObj.nombreBanner = $scope.fileCargaArchivoNoticiaEdit.nombre ? $scope.fileCargaArchivoNoticiaEdit.nombre : '';

            $scope.editObj.archivoArchivo = $scope.fileDecargaNoticaEdicion.archivo ? $scope.fileDecargaNoticaEdicion.archivo :'';
            $scope.editObj.nombreArchivo = $scope.fileDecargaNoticaEdicion.nombre ?  $scope.fileDecargaNoticaEdicion.nombre:'';
            
            $scope.editObj.fechaInicio =   formatFechaInicio;
            $scope.editObj.fechaExpiracion =  formatFechaFin;

            $scope.editObj.permanente = $scope.mostrarFechasDefinidasEdicion ? 1 : 0;

            $scope.editObj.urlLinkExterno=$scope.editObj.urlLinkExterno ? $scope.editObj.urlLinkExterno : ''
            $scope.editObj.detalle=$scope.editObj.detalle ? $scope.editObj.detalle : ''

            let selectedElements=$("#jstre-content-geofrafia-edicon").jstree("get_selected", true);
                                                            
            //si se selecciona todo solo enviar 1
            if(selectedElements.length >= $scope.listaGeografias.length ){
                geografiaEnvio=[1]
            }else{
                geografiaEnvio=selectedElements.filter(e=>e.original.nivel== $scope.nivelGeografia)
                                            .map(e=>parseInt(e.id))
            }
            $scope.editObj.idGeografias = geografiaEnvio;
            
            if( !$scope.banderaArchivoBanner ){               
                delete $scope.editObj.archivoBanner
                delete $scope.editObj.nombreBanner
            }

            if( !$scope.banderaArchivoDescarga ){
                delete $scope.editObj.archivoArchivo
                delete $scope.editObj.nombreArchivo
            }

            delete $scope.editObj.urlBanner
            delete $scope.editObj.urlArchivo
            delete $scope.editObj.soloImagen
            delete $scope.editObj.ordenVisual
            delete $scope.editObj.id;

            swal({ text: 'Editando registro...', allowOutsideClick: false });
            swal.showLoading();

            gestionNoticiasService.actualizarNoticia($scope.editObj).then((result) => {             
                console.log(result);
				if (result.data !== undefined) {
					if (result.data.respuesta) {
						toastr.success(result.data.result.description);
                        $scope.limpiarFormularioEditarNotica()
                        $scope.consultarNoticias()
                        $scope.edicionNoticaContent=false
					} else {
						console.log(result.data.resultDescripcion)
						toastr.warning( result.data.resultDescripcion )
           				swal.close()
					}
				} else {
					console.log(result.data.resultDescripcion)
					toastr.warning( result.data.resultDescripcion )
       				swal.close()
				}

            }).catch((err) => handleError(err));
            
        }

    }

	$scope.validarEdicionNoticia=function(){
		let isErrorRegistro=false;
		let textErrorRegistro=""

		if(!$scope.fileCargaArchivoNoticiaEdit.archivo){
			textErrorRegistro += '<li>Selecciona una imagen para el banner</li>';
			isErrorRegistro=true
		}

		if(!$scope.editObj.tituloPrincipal){
			textErrorRegistro += '<li>Captura titulo principal</li>';
			isErrorRegistro=true
		}

		if(!$scope.editObj.tituloSecundario){
			textErrorRegistro += '<li>Captura titulo secundario</li>';
			isErrorRegistro=true
		}

		let clustersparam=$("#jstre-content-geofrafia-edicon").jstree("get_selected", true)
												.filter(e=>e.original.nivel== $scope.nivelGeografia)
												.map(e=>parseInt(e.id))
		if( clustersparam <= 0){
			isErrorRegistro=true
			textErrorRegistro += '<li>Selecciona un dato de la geografias</li>';
		}
		if(!$scope.mostrarFechasDefinidasEdicion){
			if (document.getElementById('fecha-inicio-editarnoticia').value.trim() != "" && document.getElementById('fecha-fin-editarnoticia').value.trim() != "") {
				var inicio = document.getElementById('fecha-inicio-editarnoticia').value.split('/');
				var fin = document.getElementById('fecha-fin-editarnoticia').value.split('/');
				var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
				var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
				if (date_inicio > date_fin) {
					isErrorRegistro=true
					textErrorRegistro += '<li>La fecha inicial no tiene que ser mayor a la final</li>';
				} 
			}	
		}
        
		if(isErrorRegistro)
			toastr.info( textErrorRegistro )
		
		return isErrorRegistro;
	}

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

        $('#searchGeoEdicion').on('keyup', function () {
            $("#jstre-content-geofrafia-edicon").jstree("search", this.value);
        })

        $('#modal-geografia-edicion').on('hidden.bs.modal', function () {
			$scope.isSeleccionGeografiaEdicion=false;
			let clustersparam=$("#jstre-content-geofrafia-edicon").jstree("get_selected", true)
												   .filter(e=>e.original.nivel== $scope.nivelGeografia)
												   .map(e=>parseInt(e.id))
			
			if( clustersparam.length > 0){
				$scope.isSeleccionGeografiaEdicion=true;
			}
			$scope.$apply()
		});

        $('#modal-geografia-edicion').on('shown.bs.modal', function () {
			$("#searchGeoEdicion").focus();
		});

    });
};










