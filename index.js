function runIt() {
  const showCities = (data, inputText) => {
    const search = document.getElementsByClassName('suggestions')[0];

    while (search.firstChild) {
      search.removeChild(search.firstChild);
    }

    // Add new cityCards
    data.map(city => {
      if (
        city.city.toLowerCase().includes(inputText.toLowerCase()) ||
        city.state.toLowerCase().includes(inputText.toLowerCase())
      ) {
        const cityCard = document.createElement('li');
        const cityCardDiv = document.createElement('div');

        // Create highlighted city and state text
        const originalText = city.city + ', ' + city.state;
        const highlightedText = originalText.replace(
          new RegExp(inputText.toLowerCase(), 'gi'),
          `<span class="hl">$&</span>`
        );
        const cityText = document
          .createRange()
          .createContextualFragment(highlightedText);

        cityCardDiv.appendChild(cityText);
        cityCard.appendChild(cityCardDiv);

        const states = document.createElement('span');
        const statesText = document.createTextNode(
          Number(city.population).toLocaleString('en-US')
        );

        states.appendChild(statesText);
        states.classList.add('population');
        cityCard.appendChild(states);
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
