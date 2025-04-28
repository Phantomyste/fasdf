// Initialize map
const map = L.map('map').setView([16.0471, 108.2068], 11); // Da Nang coordinates

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load Đà Nẵng commune GeoJSON
fetch('data/danang_communes.geojson')
  .then(res => res.json())
  .then(data => {
    const layer = L.geoJSON(data, {
      style: {
        color: '#3388ff',
        weight: 1,
        fillOpacity: 0.3
      },
      onEachFeature: function (feature, layer) {
        const name = feature.properties.name || "Commune";
        layer.bindPopup(`<strong>${name}</strong>`);
        // Add labels using Leaflet divIcon
        const center = layer.getBounds().getCenter();
        L.marker(center, {
          icon: L.divIcon({
            className: 'label',
            html: name,
            iconSize: [100, 20]
          })
        }).addTo(map);
      }
    }).addTo(map);
  });
