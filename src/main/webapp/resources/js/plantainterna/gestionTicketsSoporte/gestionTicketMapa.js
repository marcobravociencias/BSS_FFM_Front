let markerCreacionTickets;
app.ticketControllerMapa=function($scope){
    mapavistageneral = new google.maps.Map(document.getElementById("content-mapa-creacion-ticket"), {
        center: {
            lat: parseFloat('19.335204'),
            lng: parseFloat('-99.197374')
        },
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT,
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT,
        },
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        mapTypeControl: false,
        zoom: 15
    });
    
    $scope.agregarMarkerMapCrearTicket = function(lat, long) {	
        mapavistageneral.setCenter(new google.maps.LatLng( lat , long ));
        mapavistageneral.setZoom(15);
        if(markerCreacionTickets){
            markerCreacionTickets.setMap(null)   
            markerCreacionTickets = undefined;         
        }
    	markerCreacionTickets = new google.maps.Marker({
    		map: mapavistageneral,
    	    draggable: false,
    	    animation: google.maps.Animation.DROP,
    	    title:"Dirección de la OT",
    	    position: {
    	    	lat:parseFloat(lat),
    	        lng: parseFloat(long) 
    	    }
    	});
	}
    
}