
// Your map initialization script
var map = L.map('map').setView([51.22180624444632, 4.417074010439521], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([51.22180624444632, 4.417074010439521]).addTo(map);

