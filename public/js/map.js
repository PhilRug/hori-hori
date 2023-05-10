//     const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}location=30.333472,-81.470448&size=600,400`;
// const APIKey = 'j60qfJnlksnEkYHlmnduljwpArKoZxZT';

// const mapElement = document.querySelector('#map-element');
// let latitude;
// let longitude;
// let selectedOptionImage;

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
}

// initialize map and add marker for user's location
let map;

function initMap({ latitude, longitude }) {
  console.log(latitude, longitude);
  const map = L.map('map').setView([latitude, longitude], 17);
  console.log(map);
  L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href=\'https://opentopomap.org/\'>OpenTopoMap</a> contributors' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
  }).addTo(map);

  // Add a marker and bind a popup
  var marker = L.marker([latitude, longitude], {
    draggable: true,
  }).addTo(map);

  var form = document.createElement('form');
  form.innerHTML = `
    <label for="plantName">Plant Name:</label>
    <select type="text" id="plantName" name="plantName" required autocomplete="on" list="plants">
    <datalist id="plants">
    <option disabled selected value="">Select an invasive plant species</option>
      <option value="Kudzu" data-image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxvicdpYBWnhzfwJeuSMeMsoDD-qzMoNEvaA&usqp=CAU">Kudzu</option>
      <option value="Japanese Knotweed" data-image="https://upload.wikimedia.org/wikipedia/commons/0/0a/Reynoutria_japonica_in_Brastad_1.jpg">Japanese Knotweed</option>
      <option value="Garlic Mustard" data-image="https://kingcounty.gov/~/media/environment/animalsAndPlants/noxious_weeds/imagesD_G/garlic_mustard_flowering.ashx?la=en">Garlic Mustard</option>
      <option value="Purple Loosestrife" data-image="https://images.squarespace-cdn.com/content/v1/530401e6e4b03a7f5888d9aa/1629311032921-3PAP5YFLJYDHGBB8IEB0/purple+loosestrife+2021+1.jpg">Purple Loosestrife</option>
      <option value="Multiflora Rose" data-image="https://www.nps.gov/cuva/learn/nature/images/20110606-multiflora-rose-NPS-Arrye-Rosser.JPG">Multiflora rose</option>
      <option value="Tree-of-Heaven" data-image="https://www.thespruce.com/thmb/PtdOKZv5SIwf47-WDCnRw48GTSw=/8256x0/filters:no_upscale():max_bytes(150000):strip_icc()/tree-of-heaven-invasive-plant-profile-5184401-hero-a4dfe665b1834698bb29870260729694.jpg">Tree of Heaven</option>
      <option value="Reed Canary Grass" data-image="https://www.riceswcd.org/wp-content/uploads/2020/02/reed-canary-grass.jpg">Reed Canary Grass</option>
      <option value="Giant Hogweed" data-image="https://www.dec.ny.gov/images/lands_forests_images/ghwholeplant2.jpg">Giant Hogweed</option>
      <option value="English Ivy" data-image="https://www.invasive.org/alien/pubs/midatlantic/img/hehe-James_H._Miller.jpg">English Ivy</option>
      <option value="Japanese Honeysuckle" data-image="https://extension.umd.edu/sites/extension.umd.edu/files/styles/optimized/public/2021-01/japanese-honeysuckle.jpg?itok=DdLhi6Qd">Japanese Honeysuckle</option>
      <option value="Mile-a-Minute Vine" data-image="https://nyis.info/wp-content/uploads/images/5273095-PPT_Large.jpg">Mile-a-Minute Vine</option>
      <option value="Japanese Stiltgrass" data-image="https://nyis.info/wp-content/uploads/images/5426567-SMPT.jpg">Japanese Stiltgrass</option>
  </datalist>
    <br>
    <br>
    <label for="description">Description:</label>
    <textarea id="description" name="description" required></textarea>
    <br>
    <img id="plantImage" style="display: none; width: 7rem; height: 9rem;" src="">
    <br>
    <button type="submit">Submit</button>
`;

  // Bind the form to the marker's popup
  marker.bindPopup(form).openPopup();

  setImageFromSelect('plantName', 'plantImage');

  // store the latitude and longitude values in global variables
  latitude = latitude;
  longitude = longitude;

  // add event listener to form submission
  form.addEventListener('submit', event => onPopupSubmit(event, latitude, longitude));
}

function setImageFromSelect(selectId, imageId) {
  const selectElement = document.getElementById(selectId);
  const imageElement = document.getElementById(imageId);

  selectElement.addEventListener('change', function() {
    const selectedOption = selectElement.value;
    const selectedOptionImage = selectElement.options[selectElement.selectedIndex].getAttribute('data-image');

    if (selectElement === '' ) {
      imageElement.style.display = 'none';
    } else {
      imageElement.style.display = 'block';
    }

    imageElement.src = selectedOptionImage;
  });
}

// function to handle form submission
async function onPopupSubmit(event, latitude, longitude) {

  event.preventDefault();
  const plantName = document.getElementById('plantName').value;
  const description = document.getElementById('description').value;
  const plantImage = document.getElementById('plantImage').getAttribute('src');
  //make sure image url is being saved to json so it can regenerate with pins

  console.log(plantImage);
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
        longitude: longitude,
        image: plantImage
      })
    });
    if (response.ok) {
      // Redirect to the dashboard page if the submission is successful
      window.location.href = '/dashboard';
    } else {
      throw new Error('Failed to add pin');
    }

    //reset form and close pop up on submit
    event.target.reset();
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
      console.log('User location:', location);
    })
    .catch(error => {
      console.error('Error getting user location:', error);
    });
}

document.getElementById('share-location-btn').addEventListener('click', onShareLocationClick);
document.getElementById('goBack').addEventListener('click', function() {
  window.location.href = '/dashboard';
});