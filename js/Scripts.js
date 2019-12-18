var breweryRepository = (function($) {    //Start of IIFE
  var repository = [];
  var apiUrl = 'https://api.openbrewerydb.org/breweries';
  var $modalContainer = $('#modal-container');
  var $breweryList = $('ul');

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
  var brewerylist = $('.Brewery-list');
    var $listItem = $('<li></li>');
    $breweryList.append($listItem);
    var $button = $('<button class="brewery-name">' + brewery.name + '</button>');
    $listItem.append($button);
    $button.on('click', function() {
      showDetails(brewery)
    })
  }

  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function (item) { /* Replaced Fectch With Ajax*/

    $.each(item.results, function(index, item){
        var brewery = {
          name: item.name,
          detailsUrl: item.url
        };
        add(brewery);
      });
    }).catch(function (error) {
      /*Load Functions Set In Order To Retrieve Data From Brewery API*/
      console.error(error);
    });
  }
  //function to load the brewery details
  function loadDetails(item) {
      var url = item.detailsUrl;
      return $.ajax(url, {dataType: 'json'}).then(function(details) {
        //item.websiteUrl = details.website_url;
        item.state = details.state;
        item.city = details.city;
        //item.types = Object.keys(details.types);
      }).catch(function(e) {
        console.error(e);
      })
    }


    /*Model Definition With Jquery Start*/
  function showModal(item){

      var modalContainer = $('#modal-container');
        $(modalContainer).text('');
        $(modalContainer).addClass('is-visible');

      var brewerymodal = $('<div>');
        $(brewerymodal).addClass('modal');
        $(modalContainer).append(brewerymodal);

      var $closeModalBtn = $('<button class="modal-close">Close</button>');
        $(pokemodal).append($closeModalBtn);
        $closeModalBtn.click(hideModal);


      var modalTitle = $('<h1>');
        $(modalTitle).text(item.name);
        $(modalTitle).addClass('modal-title');
        $(pokemodal).append(modalTitle);

    /*  var modalWebsite = $('<img>');
        $(modalImg).addClass('poke-img');
        $(modalImg).attr('src',item.imageUrl);
        $(pokemodal).append(modalImg); */

      var breweryState = $('<p>');
        $(breweryState).text('State: ' + item.state);
        $(breweryState).addClass('modal-para');
        $(brewerymodal).append(State);

        var breweryCity = $('<p>');
          $(breweryCity).text('City: ' + item.city);
          $(breweryCity).addClass('modal-para');
          $(brewerymodal).append(City);
    }
  //Function to hide modal
    function hideModal() {
      //var $modalContainer = document.querySelector('#modal-container');
      var modalContainer = $('#modal-container');
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
      showModal: showModal,
      hideModal: hideModal
    };
  })();


  //Creates list of Pokemon with Pokemon's name on the button
  breweryRepository.loadList().then(function() {
    //Create a reusable modal once
    breweryRepository.showModal();
    // Now the data is loaded!
    breweryRepository.getAll().forEach(function(brewery){
      breweryRepository.addListItem(brewery);
    });
  });
