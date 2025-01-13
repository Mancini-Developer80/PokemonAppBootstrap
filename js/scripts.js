// Creating an IIFE to preserve global state
const pokemonRepository = function () {
    // array of Pokemon objects | name - height - types
    let pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
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
        if (typeof pokemon === 'object' &&
            pokemon.hasOwnProperty('name') &&
            pokemon.hasOwnProperty('url')) {
            pokemonList.push(pokemon)
        } else {
            alert('this is not an pokemon object!!')
        }
    };

    function LoadList() {
        showLoadingMessage()
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name : item.name,
                    url: item.url,
                };
                // console.log(pokemon);
                add(pokemon);
            });
            hideLoadingMessage()
        }).catch(function (e) {
            console.error(e)
            hideLoadingMessage()
        })
    };

    function loadDetails(item) {
        showLoadingMessage()
        let url = item.url;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // adding details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage()
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage()
        })
    }

    // to run to get all the pokemon in the List
    function getAll() {
        return pokemonList;
    };

    function filter(property, value) {
        return pokemonList.filter(pokemon => {
            if (property === 'types') {
                return pokemon[property].includes(value);
            } else {
                return pokemon[property] === value;
            }
        });
    };

    function addListItem(pokemon) {
        const pokemonContainer = document.querySelector('.pokemon-app');
        const pokemonList = document.createElement('ul');
        const pokemonItem = document.createElement('li');
        const pokemonName = document.createElement('h2');
        const pokemonUrl = document.createElement('h3');
        const button = document.createElement('button');

        

        button.addEventListener('click', function () {
			showDetails(pokemon);
		})


        pokemonList.classList.add('list-group');
        pokemonItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'flex-column', 'border-bottom', 'p-3', 'w-50');
        button.classList.add('btn', 'btn-primary');
        button.innerText = "Click Here";
        pokemonName.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        pokemonUrl.innerText = pokemon.url;
        

        pokemonItem.appendChild(pokemonName);
        pokemonList.appendChild(pokemonItem)
        pokemonContainer.appendChild(pokemonItem).appendChild(button);

    };

    function showDetails(item) {
        loadDetails(item).then(function () {
            console.log(item);
            const modalTitle = document.getElementById('pokemonTitle');
            const modalHeight = document.getElementById('pokemonHeight');
            const modalImage = document.getElementById('pokemonImage');
            // const modalheader = document.querySelector('.modal-header');
            // const detailTitle = document.createElement('h5');
    
            modalTitle.innerText = item.name[0].toUpperCase() + item.name.slice(1);
            modalHeight.innerText = 'Height: ' + item.height;
            modalImage.setAttribute('src', item.imageUrl);

            console.log(modalTitle);
            console.log(modalHeight);
    
            const pokemonModal = new bootstrap.Modal(document.getElementById('pokemonModal'), {
                keyboard: true
            });
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
        showDetails
    };
}();

// creating a variable containing all the pokemon object in a list
// outputing the Pokemon list running addLIstItem in forEach

pokemonRepository.LoadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
});


