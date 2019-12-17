var breweryRepository = (function($) {    //Start of IIFE
  var repository = [];
  var apiUrl = 'https://api.openbrewerydb.org/breweries';
  var $modalContainer = document.querySelector('#modal-container');
  var $breweryList = document.querySelector('ul');

  //function to add new brewery
  function add(brewery){
    //Must be an 'object' type
  if (typeof brewery !== 'object') {
    return 'Not a valid input'
  }else{
  repository.push(brewery);
  }
}

//Function to pull all Pokemon data
function getAll() {
  return repository;
}

//function to add brewery object
function addListItem(brewery) {
    var $listItem = $('<li></li>');
    $pokemonList.append($listItem);
    var $button = $('<button class="brewery-name">' + brewery.name + '</button>');
    $listItem.append($button);
    $button.on('click', function() {
      showDetails(brewery)
    })
  }

  //Function to load brewery list from API
  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON) {
      return responseJSON;
    }).then(function(json) {
      json.results.forEach(function(item) {
        var brewery = {
          name: item.name,
          detailsUrl: item.website_url
        };
        add(brewery);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  //function to load the brewery details
  function loadDetails(item) {
      var url = item.detailsUrl;
      return $.ajax(url, {dataType: 'json'}).then(function(responseJSON) {
        return responseJSON;
      }).then(function(details) {
        item.websiteUrl = details.website_url;
        item.state = details.state;
        item.city = details.city;
        item.types = Object.keys(details.types);
      }).catch(function(e) {
        console.error(e);
      })
    }

    //Funtion to create reusable modal
  function createReusableModal() {

    var $modal = $('<div class="modal"></div>');
    $modalContainer.append($modal);
    var $modalElement1 = $('<div></div>');
    $modal.append($modalElement1);
    var $modalElement2 = $('<div class="brewery-info"></div>');
    $modal.append($modalElement2);

    var $closeButtonElement = $('<button class="modal-close">Close</button>');
    $modalElement1.append($closeButtonElement);

    var $nameElement = $('<h1></h1>');
    $modalElement2.append($nameElement);
    var $stateElement = $('<p></p>');
    $modalElement2.append($stateElement);
    var $cityElement = $('<p></p>');
    $modalElement2.append($cityElement);
  }

  //Function to hide modal
    function hideModal() {
      //var $modalContainer = document.querySelector('#modal-container');
      $modalContainer.removeClass('is-visible');
    }

    //Function to show details of each Pokemon
    function showDetails(item) {
      breweryRepository.loadDetails(item).then(function() {
        console.log(item);
        return item;
      }).then(function(item) {
        console.log('TCL: showDetails -> item', item);
        showModal(item);
      });
    }

    $modalContainer.on('keydown', function(e) {
      if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    $modalContainer.on('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      var target = e.target;
      console.log('TCL: breweryRepository -> target', target);
      var $modalClose = $('.modal-close');
      if (target === $modalContainer || $modalClose) {
        hideModal();
      }
    })

    return{
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      createReusableModal: createReusableModal,
      showModal: showModal,
      hideModal: hideModal
    };
  })();


  //Creates list of Pokemon with Pokemon's name on the button
  breweryRepository.loadList().then(function() {
    //Create a reusable modal once
    breweryRepository.createReusableModal();
    // Now the data is loaded!
    breweryRepository.getAll().forEach(function(brewery){
      breweryRepository.addListItem(brewery);
    });
  });