navigator.geolocation.getCurrentPosition(drawMap);
navigator.geolocation.getCurrentPosition(save_loc);

var atualLocation;

function drawMap(position) {
	// alert('Drawing map');

	var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var center = [lat, lon];

    var request = new XMLHttpRequest();
    var method = 'GET';
    var async = false;
	
	// Create the map
	var map = L.map('map').setView(center, 3);

	// Set up the OSM layer
	L.tileLayer(
		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18
	}).addTo(map);

	// add a marker in the given location
	L.marker(center).addTo(map);


	var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true&key=AIzaSyDevqtUNZ-SXOcu_sfgs2iVpXEvTj1bgh0`;

    request.open(method, url, async);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            var result = data.results[0];

            result = result.formatted_address;
            result = result.split(",");
            r_length = result.length;
            country = result[r_length - 1];
            city = result[r_length - 2];

            atualLocation = {
                "country": country,
                'city': city,
                'latitue': lat,
                'longitude': lon,
            };

			console.log(atualLocation)

        }
    };
    request.send();

}

function save_loc(position) {
	var lat = position.coords.latitude;
	var longt = position.coords.longitude;
	sessionStorage["lat"] = lat;
	sessionStorage["longt"] = longt;
}

function loc() {
	var lat = sessionStorage.getItem('lat');
	var longt = sessionStorage.getItem('longt');

	var disp = document.getElementById('loc');
	disp.innerHTML = "Come here in future again [" + lat + ", " + longt + "]";
}
