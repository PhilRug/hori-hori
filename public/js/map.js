const APIKey = 'j60qfJnlksnEkYHlmnduljwpArKoZxZT';

function getMapUrl(address) {
    const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}location=30.333472,-81.470448&size=600,400`;
    return url;
  }

  //fetch will go here to generate map after user log ins