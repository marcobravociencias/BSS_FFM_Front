var app = angular.module('gestionNoticiasApp', []);
var dataTableConsultaNoticias;
app.controller('gestionNoticiasController', ['$scope', '$q', '$filter', 'gestionNoticiasService', function ($scope, $q, $filter, gestionNoticiasService) {
	
	app.edicionNoticiaController($scope,gestionNoticiasService)

	$scope.isSeleccionGeografia=false;
	$scope.saveObjCopy={}
	$scope.saveObj={}
	$scope.fileDecargaNotica={}
	$scope.fileDecargaNoticaCopy={}
	
	$scope.noticiasCarrusel = [];
	$scope.verVistaTabla = true;
	$scope.crearNoticiaContent =false;

	$scope.saveObj.tituloPrincipal;
	$scope.saveObj.tituloSecundario;
	$scope.saveObj.urlLinkExterno;

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


		$('#filtro_fecha_inicio_consultanoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#filtro_fecha_inicio_consultanoticia').datepicker('update', new Date());


		$('#filtro_fecha_fin_consultanoticia').datepicker({
			format: 'dd/mm/yyyy',
			autoclose: true,
			language: 'es',
			todayHighlight: true
		});
		$('#filtro_fecha_fin_consultanoticia').datepicker('update', new Date());
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
		$('#modal-geografia-consulta').on('shown.bs.modal', function () {
			$("#searchGeoConsulta").focus();
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
	}
    $scope.obtenerNivelUltimoJerarquia=function(){
        return $scope.listadogeografiacopy.sort(compareGeneric)[0].nivel
    }
	$scope.abrirModalGeografiaCreacion=function(){
		$('#searchGeo').val('');
		$("#jstre-content-geofrafia").jstree("search", '');
		$("#modal-geografia-creacion").modal('show')
	}
	$('#searchGeo').on('keyup', function () {
		$("#jstre-content-geofrafia").jstree("search", this.value);
	})
	$scope.eliminarArchivoDescarga=function(){
		$scope.fileDecargaNotica={}
		$("#cargarArchivoDescarga").val(''); 
	}
	$scope.cargarArchivoDescarga = function (e) {
		$scope.fileDecargaNotica={}
		if (e.target.files[0]) {
			let nombreArchivo = e.target.files[0].name;
			let reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = function () {
				let base64 = reader.result.toString().split(",");
				$scope.fileDecargaNotica = {
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
			var archivoCargado = nombreArchivo.split(".");
			var extensionArchivo = archivoCargado[archivoCargado.length-1].toLowerCase();
			if(extensionArchivo == "png" || extensionArchivo == "jpg" || extensionArchivo == "jpeg" || extensionArchivo == "gif" ||
					extensionArchivo == "tiff" || extensionArchivo == "psd" || extensionArchivo == "bmp" || extensionArchivo == "svg"){
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = function () {
					let base64 = reader.result.toString().split(",");
					$scope.fileCargaArchivoNoticia = {
						"archivo": base64[1],
						"nombre": nombreArchivo
					};				
					$scope.$apply();
				};
				reader.onerror = function (error) {
					console.log('Error: ', error);
				};
			}else{
				swal("Formato no válido", "Asegurate de seleccionar un archivo en formato de imagen.", "warning");
			}
		}
	}



	$scope.listaGeografias=[]
	
	$scope.initConsultaMetodo = function() {
		let paramsConfiguracionDespacho ={
			moduloAccionesUsuario: 'moduloNoticias'
		};
		
		swal({ text: 'Cargando ...', allowOutsideClick: false });
		swal.showLoading();
		$q.all([
			gestionNoticiasService.consultaGeografias(),
			gestionNoticiasService.consultarConfiguracionDespachoDespacho(paramsConfiguracionDespacho),
	
		]).then(function(results) {		
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
				let geografia=angular.copy(listGeografias );
				let geografiaConsulta=angular.copy(listGeografias)
				
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

				geografiaConsulta.push({id: 0, nombre: "TOTALPLAY", nivel: 0, padre: "#", state:{opened: true}});
				geografiaConsulta.map((e)=>{
					e.parent = e.padre == null ? 0 : e.padre;
					e.text= e.nombre;
					e.icon= "fa fa-globe";
					e.state = {
							opened: true,
							selected: true,
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

				$('#jstre-content-geofrafia-edicon').bind('loaded.jstree', function(e, data) {
				}).jstree({
					'plugins': ['search', 'checkbox', 'wholerow'],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaConsulta,
						'themes': {
							'name': 'proton',
							'responsive': true,
							"icons":false        
						}
					}
				});
				$('#jstre-content-geofrafia-consulta').bind('loaded.jstree', function(e, data) {
					$(this).jstree("open_all");
					setTimeout(function(){
						$scope.consultarNoticias();
					},1000)
				}).jstree({
					'plugins': ['search', 'checkbox', 'wholerow'],
					'search': {
						"case_sensitive": false,
						"show_only_matches": true
					},
					'core': {
						'data': geografiaConsulta,
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
	$scope.isHideOverflowNoticias=false
	abrirImagenSize=function(instanciaThis){
		$("#full-image").attr("src", $(instanciaThis).attr("src"));
		$('#image-viewer').show();
		$scope.isHideOverflowNoticias=true
		$scope.$apply()
	}
	$scope.cerrarGestionNotica=function(){
		$('#image-viewer').hide();
		$scope.isHideOverflowNoticias=false
	}
    $scope.consultarNoticias = function() {

		if(!swal.isVisible() ){
			swal({ text: 'Consultando noticias ...', allowOutsideClick: false });
			swal.showLoading();
		}
		
		if(dataTableConsultaNoticias!=undefined){
			dataTableConsultaNoticias.destroy()
			$('#datatable-noticias tbody').empty();
		}	
		$scope.searconsultaDatatableValue=''
        $q.all([
    		gestionNoticiasService.consultarNoticiasGeneric()
        ]).then(function(results) {
			if( results[0].data != undefined){
				if( results[0].data.respuesta  ){
					if( results[0].data.result !=undefined &&    results[0].data.result.noticias	 ){
						$scope.litadoNoticiasTemp=results[0].data.result.noticias
						let arratNoticias=results[0].data.result.noticias;
						$scope.noticiasCarrusel = results[0].data.result.noticias;
						
						angular.forEach( arratNoticias, function(el,index){
							el.fechaInicio=el.fechaInicio.substring( 0, el.fechaInicio.indexOf(" ")  )
							el.fechaExpiracion=el.fechaExpiracion.substring( 0, el.fechaExpiracion.indexOf(" ") )

							let iconPermanente=``;	

							if(el.permanente)
								iconPermanente=`
									<div class="content-success-generic">
										<i class="icono-success-generic fas fa-check"></i>                                        
									</div>`

							let htmlDescarga='';
							if(el.urlArchivo){
								htmlDescarga=`
									<a href="${el.urlArchivo}" download>
										<span class="descarga-archivo"> ${el.nombreArchivo} </span> 
									</a>
								`
							}
						
							let htmlLinkExterno='';
							if(el.urlArchivo){
								htmlLinkExterno=`
									<span onclick="window.open( '${el.urlLinkExterno}', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');" class="consultaLinkExterno"> ${el.urlLinkExterno} </span>
								`
							}
							let tableelemetn=`
							<tr>
								<td> 	<img   onclick="abrirImagenSize(this)"  class="banner-file-noticias hover-overlay" src="${el.urlBanner}">  </td>
								<td> 	${htmlDescarga} </td>
								<td>  	<span class="consultaTituloPrinc"> ${el.tituloPrincipal} </span> </td>
								<td>  	<span class="consultaTituloSecund"> ${el.tituloSecundario} </span> </td>
								<td>  	${htmlLinkExterno} </td>
								<td>  	${iconPermanente} </td>
								<td>  	<span class="consultaFechaNoticia"> ${el.permanente? 'NA' : el.fechaInicio} </span> </td>
								<td>  	<span class="consultaFechaNoticia"> ${el.permanente? 'NA' : el.fechaExpiracion} </span> </td>
								<td>  	<span class="consultaDetalleNoticia"> ${el.detalle} </span> </td>
								<td>  	<button onclick="abrirModalEdicion( ${index} )" type="button" class="btn btn-sm btn-primary btn-editar-noticia ">
											<i class="fas fa-pencil-alt"></i>					
							  			</button> 
								</td>

							</tr>	
							`
							$("#datatable-noticias tbody").append(tableelemetn) 
						})
						
						$scope.initDatatableNoticias()
					}else{
						swal.close()
						$scope.initDatatableNoticias()
						
					}
				}else{
					swal.close()
					$scope.initDatatableNoticias()
						
				}
			}else{
				swal.close()	
				$scope.initDatatableNoticias()					
			}
        });
    }
	$scope.initDatatableNoticias=function(){
			dataTableConsultaNoticias=$('#datatable-noticias').DataTable({
				"paging": true,
				"lengthChange": false,
				"searching": true,
				"ordering": false,
				"pageLength": 10,
				"info": false,
				"autoWidth": true,
				"language": idioma_espanol_not_font,
				"sDom": '<"top"i>rt<"bottom"lp><"bottom"r><"clear">'
			})
			swal.close()	
	}
	$scope.searchDatatableNoticia=function(event){
		if( dataTableConsultaNoticias != undefined )
			dataTableConsultaNoticias.search( $scope.searconsultaDatatableValue ).draw()
	}


	
    $scope.registrarNoticia = function() {

		if( !$scope.validarRegistroNoticia() ){

			if($scope.mostrarFechasDefinidas){
				$('#fecha-inicio-crearnoticia').datepicker('update', new Date());
				$('#fecha-fin-crearnoticia').datepicker('update', new Date());
			}

			let arrayDataInicio=document.getElementById('fecha-inicio-crearnoticia').value.split('/');
			let arrayDataFin=document.getElementById('fecha-fin-crearnoticia').value.split('/');

			let formatFechaInicio=arrayDataInicio[2]+"-"+arrayDataInicio[1]+"-"+arrayDataInicio[0]
			let formatFechaFin=arrayDataFin[2]+"-"+arrayDataFin[1]+"-"+arrayDataFin[0]
			
			$scope.saveObj.archivoBanner =$scope.fileCargaArchivoNoticia.archivo ? $scope.fileCargaArchivoNoticia.archivo : '' ;
			$scope.saveObj.nombreBanner = $scope.fileCargaArchivoNoticia.nombre ? $scope.fileCargaArchivoNoticia.nombre : '';

			$scope.saveObj.archivoArchivo = $scope.fileDecargaNotica.archivo ? $scope.fileDecargaNotica.archivo :'';
			$scope.saveObj.nombreArchivo = $scope.fileDecargaNotica.nombre ?  $scope.fileDecargaNotica.nombre:'';
			
			$scope.saveObj.fechaInicio =   formatFechaInicio;
			$scope.saveObj.fechaExpiracion =  formatFechaFin;

			$scope.saveObj.permanente = $scope.mostrarFechasDefinidas ? 1 : 0;

			$scope.saveObj.urlLinkExterno=$scope.saveObj.urlLinkExterno ? $scope.saveObj.urlLinkExterno : ''
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

			swal({ text: 'Guardando registro...', allowOutsideClick: false });
			swal.showLoading();
	
			gestionNoticiasService.registrarNoticia($scope.saveObj).then((result) => {
				swal.close()
				if (result.data !== undefined) {
					if (result.data.respuesta) {
						toastr.success(result.data.result.description);
						$scope.limpiarFormularioCrearNotica()
					} else {
						toastr.warning( result.data.resultDescripcion )
					}
				} else {
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


	$scope.validarRegistroNoticia=function(){

		let isErrorRegistro=false;
		let textErrorRegistro=""

		if(!$scope.fileCargaArchivoNoticia.archivo){
			textErrorRegistro += '<li>Selecciona una imagen para el banner</li>';
			isErrorRegistro=true
		}

		if(!$scope.saveObj.tituloPrincipal){
			textErrorRegistro += '<li>Captura título principal</li>';
			isErrorRegistro=true
		}

		if(!$scope.saveObj.tituloSecundario){
			textErrorRegistro += '<li>Captura título secundario</li>';
			isErrorRegistro=true
		}
		
		if(!$scope.saveObj.detalle){
			textErrorRegistro += '<li>Captura detalle</li>';
			isErrorRegistro=true
		}

		let clustersparam=$("#jstre-content-geofrafia").jstree("get_selected", true)
												.filter(e=>e.original.nivel== $scope.nivelGeografia)
												.map(e=>parseInt(e.id))
		if( clustersparam <= 0){
			isErrorRegistro=true
			textErrorRegistro += '<li>Selecciona un dato de la geografias</li>';
		}
		if(!$scope.mostrarFechasDefinidas){
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
		}

		if(isErrorRegistro)
			toastr.info( textErrorRegistro )
		
		return isErrorRegistro;
	}
	/** Funciones de consultas   */
	$scope.filtroConsulta={}
	$scope.abrirModalGeografiaConsulta=function(){
		$('#searchGeoConsulta').val('');
		$("#jstre-content-geofrafia-consulta").jstree("search", '');
		$("#modal-geografia-consulta").modal('show')
	}
	    
    $('#searchGeoConsulta').on('keyup', function () {
		$("#jstre-content-geofrafia-consulta").jstree("search", this.value);
	});
    
    $scope.cambiarVistaConsultaNoticias = function() {
    	$scope.verVistaTabla = !$scope.verVistaTabla;
	}
    
    $scope.abrirModalCrearNoticia = function() {
    	$scope.crearNoticiaContent = true;
	}
    
    $scope.masZoomImagenRegistro = function() {
		$("#imgNoticiaRegistro").css("object-fit", "cover");
	}
    
    $scope.menosZoomImagenRegistro = function() {
    	$("#imgNoticiaRegistro").css("object-fit", "contain");
	}
    
    $scope.desplazarDerechaCarruselImgNoticiasRegistro = function() {
    	$('#carruselImgNoticiasRegistro').animate({scrollLeft:'+=100'},150);
	}
    
    $scope.desplazarIzqCarruselImgNoticiasRegistro = function() {
    	$('#carruselImgNoticiasRegistro').animate({scrollLeft:'-=100'},150);
	}
    
    $scope.regresarInicioCarruselImgNoticiasRegistro = function() {
    	$('#carruselImgNoticiasRegistro').animate({scrollLeft:'=0'},150);
	}
    
}]);

