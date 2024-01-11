function runIt() {
  const showCities = (data, inputText) => {
    const search = document.getElementsByClassName('suggestions')[0];

    while (search.firstChild) {
      search.removeChild(search.firstChild);
    }
    // Add new cityCards
    const cities = data.map(city => {
      const allCity = city.city;
      console.log(city);

      if (allCity.toLowerCase().includes(inputText)) {
        const cityCard = document.createElement('li');
        const cityText = document.createTextNode(allCity);
        cityCard.appendChild(cityText);
        search.appendChild(cityCard);
      }
    });
  };

  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  cities = async inputText => {
    const res = await fetch(endpoint);
    const data = await res.json();
    showCities(data, inputText);
  };

  const getInputText = e => {
    const inputFieldText = e.target.value;
    // console.log(inputFieldText);
    cities(inputFieldText.toLowerCase());
  };
  const inputText = document
    .getElementsByClassName('search')[0]
    .addEventListener('input', getInputText);
}
