    navigator.geolocation.getCurrentPosition(drawMap);
    navigator.geolocation.getCurrentPosition(save_loc);


    function drawMap(position){
	// alert('Drawing map');
var center = [position.coords.latitude, position.coords.longitude];

// Create the map
var map = L.map('map').setView(center, 3);

// Set up the OSM layer
L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

// add a marker in the given location
L.marker(center).addTo(map);
}

function save_loc(position){
	var lat=position.coords.latitude;
	var longt=position.coords.longitude;
	sessionStorage["lat"]=lat;
	sessionStorage["longt"]=longt;
}

function loc(){
	var lat=sessionStorage.getItem('lat');
	var longt=sessionStorage.getItem('longt');

	var disp=document.getElementById('loc');
	disp.innerHTML="Come here in future again ["+lat+", "+longt+"]";
}
