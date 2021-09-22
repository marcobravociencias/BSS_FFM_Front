app.mapsOTController=function($scope){

	var markers_cortes=[];
	var info_windows_cortes=[];
	var markers_sin_cliente=[];
	
//	var zoom_session=$("#zoom_session").val();
//	var latitud_sess=$("#latitud_sess").val();
//	var longitud_ses=$("#longitud_ses").val();
	var zoom_session = 10;
	var latitud_sess = 19.334232;
	var longitud_ses = -99.199183;
	var mapa_corte;
	var map_status_cortes;
	
	var zoom_ot = 12;
	var latitud_ot = 19.334232;
	var longitud_ot = -99.199183;
	
	var map_corte_masivo_modal;
	
	$scope.initMapCorte = function(){
		mapa_corte = new google.maps.Map(document.getElementById('map_corte_masivo'), {
			center : {
				lat:parseFloat(latitud_sess), lng:parseFloat( longitud_ses) 
			},
			zoom : parseInt(zoom_session)
		});
	
		var geoXml = new geoXML3.parser({
			map : mapa_corte,
			singleInfoWindow : true,
			afterParse: cargadoFunction
		});
		
		geoXml.parse('resources/js/plantaexterna/kmlCoberturaTotal/coberturatotalplay.kml');
		map_corte_masivo_modal = new google.maps.Map(document.getElementById('map_corte_masivo_modal'), {
			center : {
				lat:parseFloat(latitud_sess), lng:parseFloat( longitud_ses) 
			},
			zoom : parseInt(zoom_ot)
		});
		var geoXml = new geoXML3.parser({
			map : map_corte_masivo_modal,
			singleInfoWindow : true,
			afterParse: cargadoFunctionModal
		});
		geoXml.parse('resources/js/plantaexterna/kmlCoberturaTotal/coberturatotalplay.kml');
	}
	$scope.initMapCorte();
	
	function cargadoFunction(){
		mapa_corte.setZoom(parseInt(zoom_session));
	}
	
	function cargadoFunctionModal(){
		map_corte_masivo_modal.setZoom(parseInt(zoom_ot));
	}
	
	colocarUbicacionOT = function (){
		
		map_corte_masivo_modal.setCenter(new google.maps.LatLng(latitud_ot, longitud_ot));
		map_corte_masivo_modal = new google.maps.Marker({
			position : {
				lat:parseFloat(latitud_ot), lng:parseFloat( longitud_ot) 
			},
			animation : google.maps.Animation.DROP,
			map : map_corte_masivo_modal,
			icon : "resources/img/maps/pin-pendiente.png"
		});
	}
	
//	
//	
//	function agregarMarkersCortesMasivos(arrayCortesMasivo){
//		console.log("markers cortes " + arrayCortesMasivo);
//		var latitud_last;
//		var longitud_last;
//		var htmls_icon;
//		$.each(arrayCortesMasivo, function(index,corte){
//			latitud_last= parseFloat( corte.latitud );
//			longitud_last= parseFloat( corte.longitud );
//			var marker = new google.maps.Marker({
//				position : {
//					lat : parseFloat(corte.latitud),
//					lng : parseFloat(corte.longitud)
//				},
//				animation : google.maps.Animation.DROP,
//				id_ot_corte: corte.id_ot,
//				map : mapa_corte,
//				icon : {
//					url:"./img/plantaexterna/marcadores/corte_masivo.png",
//					scaledSize: new google.maps.Size(20, 20), 
//				    origin: new google.maps.Point(0,0), 
//				    anchor: new google.maps.Point(0, 0) 
//				}
//			});
//			if(corte.id_status_falla === '2' || corte.id_status_falla === '5' )
//		        marker.setAnimation(google.maps.Animation.BOUNCE);
//	
//			markers_cortes.push(marker);
//		});
//		if( latitud_last !== undefined){
//			mapa_corte.setCenter(new google.maps.LatLng( latitud_last,longitud_last));
//		}
//				
//	}
//	
//	limpiarMarkersCortes=function(callbackEjecucion){
//		$.each(markers_cortes, function(index,elemento){
//			elemento.setMap(null);
//		});
//		markers_cortes = [];
//		callbackEjecucion();
//	}
//	    
//	
//	
//	limpiarAllInfoWindows=function(callbackEjecucion){
//		$.each(info_windows_cortes, function(index,elemento){
//			elemento.close();
//		});
//		callbackEjecucion();
//	}
//	
//	inicializarVariablesModalCorteMasivo=function(){
//		is_contenido_detalle_corte=false;
//		is_contenido_historico_corte=false;
//		is_contenido_chat_corte=false;
//		is_contenido_script_corte=false;
//		is_first_contenido_conceptos_corte=false;
//		is_first_contenido_fallas_corte=false;
//	}
}