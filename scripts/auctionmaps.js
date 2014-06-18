function initialize() {

	//Initialize the creation of the Google Map and load in the markers for auction houses
	var bounds = new google.maps.LatLngBounds();
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(42.3314, -83.0458)
	};

	
	var map = new google.maps.Map(document.getElementById('map-canvas'),
								  mapOptions);
	
	//auctionMarkers
	// var auctionMarkers = getLocations();
	var auctionMarkers = houses;
	var infoWindow = new google.maps.InfoWindow(), marker, i;
	
	//display auctionMarkers on the map
	for (i=0; i < auctionMarkers.length; i++){
		var position = new google.maps.LatLng(auctionMarkers[i].lon, auctionMarkers[i].lat);
		bounds.extend(position);
		
		var html = "<h>"+auctionMarkers[i].addr+"</h><p><img src=\""+auctionMarkers[i].images[1]+"\" alt=\"something\" /></p>"
		marker = new google.maps.Marker({
			position: position,
			map: map,
			title: auctionMarkers[i].addr,
			html: html
			});
			
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.setContent(this.html);
			infoWindow.open(map, this);
			});
		map.fitBounds(bounds);
		};
		
    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        google.maps.event.removeListener(boundsListener);
    });
		
}

function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
		'callback=initialize';
	document.body.appendChild(script);
}

window.onload = loadScript;