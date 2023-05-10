const pinMapContainer = document.querySelector('#pin-map');

async function displayMap(pin) {
  try {
    // create map
    const map = L.map(pinMapContainer).setView([pin.latitude, pin.longitude], 17);

    // create tile layer
    const tileLayer = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href=\'https://opentopomap.org/\'>OpenTopoMap</a> contributors' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 30,
    });

    // add tile layer to map
    tileLayer.addTo(map);

    // wait for the tiles to load before adding the marker
    tileLayer.on('load', function () {

      //marker
      const marker = L.marker([pin.latitude, pin.longitude]).addTo(map);

      //popup for marker
      const popupContent = `<h3>${pin.plant}</h3>
    <br>
    <p>${pin.description}</p>
    <br>
    <img src="${pin.image}" style="width: 7rem; height: 9rem" alt="image of ${pin.plant}"/>`;

      const popup = L.popup().setContent(popupContent);

      marker.bindPopup(popup).openPopup();
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const pinId = window.location.pathname.split('/').pop();
  const response = await fetch(`/api/pins/${pinId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const pinResponse = await response.json();
  console.log(pinResponse);
  displayMap(pinResponse);
});

document.getElementById('goBack').addEventListener('click', function() {
  window.location.href = '/dashboard';
});