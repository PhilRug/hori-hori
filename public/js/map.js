// function getMapUrl(address) {
//     const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}location=30.333472,-81.470448&size=600,400`;
//     return url;
//   }

// const APIKey = 'j60qfJnlksnEkYHlmnduljwpArKoZxZT';
// const lat = 37.7749; // Example latitude
// const lng = -122.4194; // Example longitude

const mapElement = document.querySelector('#map-element')
let latitude;
let longitude;
//use GeoLocation API from JS to request user's loc
function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      error => {
        reject(error);
      }
    );
  });
};

// initialize map and add marker for user's location
let map;

function initMap({ latitude, longitude }) {
console.log(latitude, longitude)
  const map = L.map("map").setView([latitude, longitude], 17);
console.log(map);
  L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: "Map data © <a href='https://opentopomap.org/'>OpenTopoMap</a> contributors"+
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
  }).addTo(map);
  L.marker([latitude, longitude]).addTo(map);
};

// event listener for when user clicks "Share Location" button
function onShareLocationClick() {
    getUserLocation()
    .then(location => {
      initMap(location);
      console.log("User location:", location);
    })
   .catch (error => {
    console.error("Error getting user location:", error);
  });
};

document.getElementById("share-location-btn").addEventListener("click", onShareLocationClick);
