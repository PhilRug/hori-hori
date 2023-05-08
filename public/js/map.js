//     const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}location=30.333472,-81.470448&size=600,400`;
// const APIKey = 'j60qfJnlksnEkYHlmnduljwpArKoZxZT';

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
    attribution: "Map data © <a href='https://opentopomap.org/'>OpenTopoMap</a> contributors" +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
  }).addTo(map);

  // Add a marker and bind a popup
  var marker = L.marker([51.5, -0.1]).addTo(map);

  var form = document.createElement("form");
  form.innerHTML = `
    <label for="plantName">Plant Name:</label>
    <input type="text" id="plantName" name="plantName" required autocomplete="on" list="plants">
    <datalist id="plants">
      <option value="Kudzu">
      <option value="Japanese Knotweed">
      <option value="Garlic Mustard">
      <option value="Purple Loosestrife">
      <option value="Multiflora Rose">
      <option value="Tree-of-Heaven">
      <option value="Reed Canary Grass">
      <option value="Giant Hogweed">
      <option value="English Ivy">
      <option value="Japanese Honeysuckle">
      <option value="Mile-a-Minute Vine">
      <option value="Japanese Stiltgrass">
  </datalist>
    <br>
    <label for="description">Description:</label>
    <textarea id="description" name="description" required></textarea>
    <br>
    <button type="submit">Submit</button>
`;

  // Bind the form to the marker's popup
  marker.bindPopup(form).openPopup();

  // store the latitude and longitude values in global variables
  latitude = latitude;
  longitude = longitude;

  // add event listener to form submission
  form.addEventListener("submit", event => onPopupSubmit(event, latitude, longitude));
};

// function to handle form submission
async function onPopupSubmit(event, latitude, longitude) {
  //prevent refresh
  event.preventDefault();
  const plantName = document.getElementById("plantName").value;
  const description = document.getElementById("description").value;
  // const lat = marker.getLatLng().lat;
  // const lng = marker.getLatLng().lng;

  console.log(`Plant name: ${plantName}, Description: ${description}, Lat: ${latitude}, Lng: ${longitude}`);

  // Send the form data to the server
  try {
    const response = await fetch('/api/pins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plant: plantName,
        description: description,
        latitude: latitude,
        longitude: longitude
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add pin');
    }

    //SHOW PICTURE TO VERIFY PLANT?
    
    //reset form and close pop up on submit
  event.target.reset();
  
  // FIND A WAY TO REDIRECT TO DASHBOARD, WHERE PINS WILL BE SHOWN

} catch (err) {
  console.error(err);
  alert('Failed to add pin');
}
}

// event listener for when user clicks "Share Location" button
function onShareLocationClick() {
  getUserLocation()
    .then(location => {
      initMap(location);
      console.log("User location:", location);
    })
    .catch(error => {
      console.error("Error getting user location:", error);
    });
};

document.getElementById("share-location-btn").addEventListener("click", onShareLocationClick);
document.getElementById("goBack").addEventListener("click", function() {
  window.location.href = "/dashboard";
});