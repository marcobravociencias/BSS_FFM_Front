var app = angular.module('gestionNoticiasApp', []);
app.controller('gestionNoticiasController', ['$scope', '$q', '$filter', 'gestionNoticiasService', function ($scope, $q, $filter, gestionNoticiasService) {
	

	$scope.isSeleccionGeografia=false;
	$scope.saveObjCopy={}
	$scope.saveObj={}
	$scope.fileDecargaNotica={}
	$scope.fileDecargaNoticaCopy={}

	$scope.saveObj.tituloPrincipal="principal"
	$scope.saveObj.tituloSecundario="secundario"
	$scope.saveObj.urlLinkExterno="www.google.xom.mx"

	angular.element(document).ready(function () {
        $("#idBody").removeAttr("style");

		$('#fecha-inicio-crearnoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#fecha-inicio-crearnoticia').datepicker('update', new Date());


		$('#fecha-fin-crearnoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#fecha-fin-crearnoticia').datepicker('update', new Date());

		$('#modal-geografia-creacion').on('hidden.bs.modal', function () {
			$scope.isSeleccionGeografia=false;
			let clustersparam=$("#jstre-content-geofrafia").jstree("get_selected", true)
												   .filter(e=>e.original.nivel== $scope.nivelGeografia)
												   .map(e=>parseInt(e.id))
			
			if( clustersparam.length > 0){
				$scope.isSeleccionGeografia=true;
			}
			$scope.$apply()
		});
		$('#modal-geografia-creacion').on('shown.bs.modal', function () {
			$("#searchGeo").focus();
		});
		
    });
    function compareGeneric(a,b){
        let niveluno=a.nivel;
        let niveldos=b.nivel;
        if(niveluno>niveldos){ 
            return -1
        }else if( niveluno < niveldos){
            return 1
        } 
        return 0
    }

	$scope.cambiarTipoDeRegistroNoticia=function(){
		console.log("cambio a ",$scope.inhabilidarCamposRegistro )
		if( $scope.inhabilidarCamposRegistro ){
			$scope.saveObjCopy=angular.copy($scope.saveObj)
			$scope.saveObj={}

			$scope.fileDecargaNoticaCopy=angular.copy($scope.fileDecargaNotica)
			$scope.fileDecargaNotica={}
		}else{
			$scope.fileDecargaNotica=angular.copy($scope.fileDecargaNoticaCopy)
			$scope.fileDecargaNoticaCopy={}

			$scope.saveObj=angular.copy($scope.saveObjCopy)
			$scope.saveObjCopy={}
		}

	}
    $scope.obtenerNivelUltimoJerarquia=function(){
        return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
    }
	$scope.abrirModalGeografiaCreacion=function(){
		$("#modal-geografia-creacion").modal('show')
	}

	$scope.eliminarArchivoDescarga=function(){
		$scope.fileDecargaNotica={}
		$("#cargarArchivoDescarga").val(''); 
	}
	$scope.cargarArchivoDescarga = function (e) {
		console.log("trigger archivo !!! ---")
		$scope.fileDecargaNotica={}
		if (e.target.files[0]) {
			let nombreArchivo = e.target.files[0].name;
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				$scope.fileDecargaNotica = {
					"bucketId": "totalplay-ffm-core-dev.appspot.com",
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
	$scope.triggerArchivoDescarga=function(){
			$("#cargarArchivoDescarga").click();
	}


    $scope.fileCargaArchivoNoticia={}
	$scope.removerImagenCreacion=function(){
		$scope.fileCargaArchivoNoticia={}
		$("#archivoCrearNoticia").val(''); 
	}

	$scope.triggerInputFile=function(){
		$("#archivoCrearNoticia").click();
	}
    $scope.cargarFotoNoticiaRegistro = function (e) {
		$scope.fileCargaArchivoNoticia={}
		if (e.target.files[0]) {
			let nombreArchivo = e.target.files[0].name;
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				$scope.fileCargaArchivoNoticia = {
					"bucketId": "totalplay-ffm-core-dev.appspot.com",
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



	$scope.listaGeografias=[]
	
	$scope.initConsultaMetodo = function() {
		let paramsConfiguracionDespacho ={
			moduloAccionesUsuario: 'moduloNoticias'
		};
		$q.all([
			gestionNoticiasService.consultaGeografias(),
			gestionNoticiasService.consultarConfiguracionDespachoDespacho(paramsConfiguracionDespacho),
	
		]).then(function(results) {
			console.log(results);		
			$scope.listadogeografiacopy=results[0].data.result.geografia
			$scope.nivelGeografia = results[1].data.result.N_FILTRO_GEOGRAFIA ;			
			if(results[0].data.result.geografia.length > 0){
				let listGeografias = [];				
				if(	$scope.nivelGeografia !== undefined){
					$scope.nivelGeografia=parseInt( $scope.nivelGeografia )
					results[0].data.result.geografia.forEach(elemento =>{
						if (elemento.nivel <= 	$scope.nivelGeografia) {
							listGeografias.push(elemento);
							$scope.listaGeografias.push(elemento);
						}
					});
				}else{
					listGeografias = results[0].data.result.geografia;
					$scope.listaGeografias = results[0].data.result.geografia;						
					$scope.nivelGeografia=parseInt( $scope.obtenerNivelUltimoJerarquia() )
				}
				geografia=listGeografias;
				geografia.push({id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state:{opened: true}});
				geografia.map((e)=>{
					e.parent = e.padre == null ? 0 : e.padre;
					e.text= e.nombre;
					e.icon= "fa fa-globe";
					e.state = {
							opened: true,
							selected: false,
						}
					return e
				})       

				$('#jstre-content-geofrafia').bind('loaded.jstree', function(e, data) {
					$(this).jstree("open_all");
				}).jstree({
					'plugins': ['search', 'checkbox', 'wholerow'],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografia,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
			}else{
				toastr.warning('¡No existen geografías actualmente!');
			}
	
		});
	}
	
	$scope.initConsultaMetodo()
	

    $scope.cosultarNoticia = function() {
        $q.all([
    		gestionNoticiasService.consultarNoticiasGeneric()
        ]).then(function(results) {
            console.log(results);
        });
    }
    $scope.cosultarNoticia();

    $scope.registrarNoticia = function() {

		if( !$scope.validarRegistroNoticia() ){

			let arrayDataInicio=document.getElementById('fecha-inicio-crearnoticia').value.split('/');
			let arrayDataFin=document.getElementById('fecha-fin-crearnoticia').value.split('/');

			let formatFechaInicio=arrayDataInicio[2]+"-"+arrayDataInicio[1]+"-"+arrayDataInicio[0]
			let formatFechaFin=arrayDataFin[2]+"-"+arrayDataFin[1]+"-"+arrayDataFin[0]
			
			$scope.saveObj.archivoBanner =$scope.fileCargaArchivoNoticia.archivo ? $scope.fileCargaArchivoNoticia.archivo : '' ;
			$scope.saveObj.nombreBanner = $scope.fileCargaArchivoNoticia.nombre ? $scope.fileCargaArchivoNoticia.nombre : '';

			$scope.saveObj.archivoArchivo = $scope.fileDecargaNotica.archivo ? $scope.fileDecargaNotica.archivo :'';
			$scope.saveObj.nombreArchivo = $scope.fileDecargaNotica.nombre ?  $scope.fileDecargaNotica.nombre:'';
			
			$scope.saveObj.fechaInicio =  $scope.mostrarFechasDefinidas ? '' : formatFechaInicio;
			$scope.saveObj.fechaExpiracion = $scope.mostrarFechasDefinidas ? '' : formatFechaFin;

			$scope.saveObj.permanente = $scope.mostrarFechasDefinidas ? 1 : 0;


			$scope.saveObj.urlLinkExterno=$scope.saveObj.urlLinkExterno ? $scope.saveObj.urlLinkExterno : ''
			$scope.saveObj.tituloSecundario=$scope.saveObj.tituloSecundario ? $scope.saveObj.tituloSecundario : ''
			$scope.saveObj.tituloPrincipal=$scope.saveObj.tituloPrincipal ? $scope.saveObj.tituloPrincipal : ''
			$scope.saveObj.detalle=$scope.saveObj.detalle ? $scope.saveObj.detalle : ''

			let selectedElements=$("#jstre-content-geofrafia").jstree("get_selected", true);
															
			//si se selecciona todo solo enviar 1
			if(selectedElements.length >= $scope.listaGeografias.length ){
				geografiaEnvio=[1]
			}else{
				geografiaEnvio=selectedElements.filter(e=>e.original.nivel== $scope.nivelGeografia)
											.map(e=>parseInt(e.id))
			}

			$scope.saveObj.idGeografias = geografiaEnvio;

			swal({ text: 'Cargando registros...', allowOutsideClick: false });
			swal.showLoading();
	
			gestionNoticiasService.registrarNoticia($scope.saveObj).then((result) => {
				console.log(result);
				swal.close()
				if (result.data !== undefined) {
					if (result.data.respuesta) {
						toastr.success(result.data.result.description);
						$scope.limpiarFormularioCrearNotica()
					} else {
						console.log(result.data.resultDescripcion)
						toastr.warning( result.data.resultDescripcion )
					}
				} else {
					console.log(result.data.resultDescripcion)
					toastr.warning( result.data.resultDescripcion )
				}
			}).catch((err) => handleError(err));
		}
    }
	$scope.limpiarFormularioCrearNotica=function(){
		$scope.saveObj={}		
		$scope.removerImagenCreacion()
		$scope.eliminarArchivoDescarga()	
		$('#fecha-inicio-crearnoticia').datepicker('update', new Date());
		$('#fecha-fin-crearnoticia').datepicker('update', new Date());
	}
    $scope.actualizarNoticia = function() {

        $scope.params = {};
        $scope.params.idNoticia = 90;
        $scope.params.tituloPrincipal = "Titulo Principal";
        $scope.params.tituloSecundario = "Titulo Secundario";
        $scope.params.detalle = "detalle";
        $scope.params.urlLinkExterno = "www.linkexterno.com";
        $scope.params.fechaInicio = "2022-01-03";
        $scope.params.fechaExpiracion = "2022-01-23";
        $scope.params.permanente = 0;
        $scope.params.idActivoNot = 1;
        $scope.params.idActivoCon = 1;
        $scope.params.idGeografias = [1,2,3];
        gestionNoticiasService.actualizarNoticia($scope.params).then((result) => {
            console.log(result);
            if (result.data !== undefined) {
                if (result.data.respuesta) {
                    toastr.success(result.data.result.description);
                } else {
                    console.log(result.data.resultDescripcion)
                    toastr.warning( result.data.resultDescripcion )
                }
            } else {
                console.log(result.data.resultDescripcion)
                toastr.warning( result.data.resultDescripcion )
            }
        }).catch((err) => handleError(err));

    }

	$scope.validarRegistroNoticia=function(){

		let isErrorRegistro=false;
		let textErrorRegistro=""

		if(!$scope.fileCargaArchivoNoticia.archivo){
			textErrorRegistro += '<li>Selecciona una imagen para el banner</li>';
			isErrorRegistro=true
		}

		let clustersparam=$("#jstre-content-geofrafia").jstree("get_selected", true)
												.filter(e=>e.original.nivel== $scope.nivelGeografia)
												.map(e=>parseInt(e.id))
		if( clustersparam <= 0){
			isErrorRegistro=true
			textErrorRegistro += '<li>Selecciona un dato de la geografias</li>';
		}

		if (document.getElementById('fecha-inicio-crearnoticia').value.trim() != "" && document.getElementById('fecha-fin-crearnoticia').value.trim() != "") {
			var inicio = document.getElementById('fecha-inicio-crearnoticia').value.split('/');
			var fin = document.getElementById('fecha-fin-crearnoticia').value.split('/');
			var date_inicio = new Date(inicio[2] + '-' + inicio[1] + '-' + inicio[0]);
			var date_fin = new Date(fin[2] + '-' + fin[1] + '-' + fin[0]);
			if (date_inicio > date_fin) {
				isErrorRegistro=true
				textErrorRegistro += '<li>La fecha inicial no tiene que ser mayor a la final</li>';
			} 
		}

		if(isErrorRegistro)
			toastr.info( textErrorRegistro )
		
		return isErrorRegistro;
	}
}]);