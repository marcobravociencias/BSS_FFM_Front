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
}