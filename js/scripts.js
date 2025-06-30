// Creating an IIFE to preserve global state
const pokemonRepository = (function () {
  // array of Pokemon objects | name - height - types
  let pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  // to run for adding new pokemon object in the list

  function showLoadingMessage() {
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loadingMessage';
    loadingMessage.innerText = 'Loading...';
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
      document.body.removeChild(loadingMessage);
    }
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      pokemon.hasOwnProperty('name') &&
      pokemon.hasOwnProperty('url')
    ) {
      pokemonList.push(pokemon);
    } else {
      alert('this is not an pokemon object!!');
    }
  }

  function LoadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            url: item.url,
          };
          add(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.url;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // adding details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  // to run to get all the pokemon in the List
  function getAll() {
    return pokemonList;
  }

  document
    .getElementById('searchInput')
    .addEventListener('input', function (e) {
      const searchValue = e.target.value;
      const filteredPokemon = filter('name', searchValue);
      // Update the UI with the filteredPokemon list
      updateUI(filteredPokemon);
    });

  function filter(property, value) {
    return pokemonList.filter((pokemon) => {
      if (property === 'types') {
        return pokemon[property].includes(value);
      } else if (property === 'name') {
        return pokemon[property].toLowerCase().includes(value.toLowerCase());
      } else {
        return pokemon[property] === value;
      }
    });
  }
  function updateUI(filteredPokemon) {
    const pokemonContainer = document.querySelector('.pokemon-app');
    pokemonContainer.innerHTML = ''; // Clear the current list

    filteredPokemon.forEach(function (pokemon) {
      addListItem(pokemon);
    });
  }

  function addListItem(pokemon) {
    const pokemonContainer = document.querySelector('.pokemon-app');
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const pokemonName = document.createElement('h2');
    pokemonName.innerText =
      pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.innerText = 'Details';
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    card.appendChild(pokemonName);
    card.appendChild(button);
    pokemonContainer.appendChild(card);
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item);
      const modalTitle = document.getElementById('pokemonTitle');
      const modalHeight = document.getElementById('pokemonHeight');
      const modalImage = document.getElementById('pokemonImage');

      modalTitle.innerText = item.name[0].toUpperCase() + item.name.slice(1);
      modalHeight.innerText = 'Height: ' + item.height;
      modalImage.setAttribute('src', item.imageUrl);

      const pokemonModal = new bootstrap.Modal(
        document.getElementById('pokemonModal'),
        {
          keyboard: true,
        }
      );
      pokemonModal.show();
    });
  }

  return {
    add,
    getAll,
    filter,
    addListItem,
    LoadList,
    loadDetails,
    showDetails,
  };
})();

// creating a variable containing all the pokemon object in a list
// outputing the Pokemon list running addLIstItem in forEach

pokemonRepository.LoadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
