// const APIKey = 'j60qfJnlksnEkYHlmnduljwpArKoZxZT';

// function getMapUrl(address) {
//     const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}location=30.333472,-81.470448&size=600,400`;
//     return url;
//   }

//   //fetch will go here to generate map after user log ins
//  //using JS 
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, showError);
//   } else {
//     alert("Geolocation is not supported by this browser.");
//   }
  
  // navigator.geolocation.getCurrentPosition((position) => {
  //   const { latitude, longitude } = position.coords;
  
  const APIKey = 'j60qfJnlksnEkYHlmnduljwpArKoZxZT';
  const lat = 37.7749; // Example latitude
  const lng = -122.4194; // Example longitude
  
    fetch(`https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${lat},${lng}`)
    .then(response => response.json())
    .then(data => {
      const address = data.results[0].locations[0].street;
      console.log(`User's address: ${address}`);
    })
    .catch(error => console.error(error));
