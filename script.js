
// Create map and tiles
const mymap = L.map('mapid').setView([0, 0], 1);
const attribution = 
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Create an icon
const myIcon = L.icon({
    iconUrl: 'spaceStation.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

// Display Marker Icon on map
const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);

// Connecting to API
const url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
    const response = await fetch(url);
    const data = await response.json();
    const { latitude, longitude } = data;
    console.log(data);
    
    // L.marker([latitude, longitude]).addTo(map);
    marker.setLatLng([latitude, longitude]);
    mymap.setView([latitude, longitude]);

    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
}

getISS();

setInterval(getISS, 1000);