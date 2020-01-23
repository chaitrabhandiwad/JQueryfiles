/*eslint-env jquery*/
var breweryRepository = (function() {
  /*Pokedex Object Array Placed Inside IIFE*/
  'use strict';
  var repository = [];

  var apiUrl = 'https://api.openbrewerydb.org/breweries';
  function addListItem(brewery) {
    var brewlist = $('.list-group'); /* JQuery List Item & Button Tags Together with CSS-Class Styles Created */
    var listitem = $('<li class="list-group-item"></li>');
    $(brewlist).append(listitem);
    var btn = $(
      '<button class="btn btn-dark" data-toggle="modal" data-target="#BreweryModal"></button>'
    );
    $(btn).text(brewery.name);
    $(listitem).append(btn);
    btn.on('click', function() {
      /*JQuery Click Button Event Listener Used To Display showDetails Function Properties */
      showDetails(brewery);
    });
  }

  function showDetails(item) {
    breweryRepository.loadList(item).then(function() {
      showModal(item);
    });
  }
  function add(name) {
    /*Add Additional Brewery Attributes To Object Array*/
    repository.push(name);
  }

  function catchAll() {
    /* Function Used To Return Brewery Object Array*/
    return repository;
  }

  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json' })
      .then(function(response) {
        /* Replaced Fectch With Ajax*/
        $.each(response, function(index, item) {
          var brewery = {
            name: item.name,
            state: item.state,
            city: item.city,
            website_url: item.website_url
          };
          add(brewery);
        });
      })
      .catch(function(error) {
        /*Load Functions Set In Order To Retrieve Data From Pokemon API*/
        console.error(error);
      });
  }

  function showModal(item) {
    $('#breweryName').text(item.name);
    $('#brewCity').text('City: ' + item.city);
    $('#brewState').text('State: ' + item.state);
    $('#brewSite').text(item.website_url);
    $('#brewSite').attr('href', item.website_url);
  }
  /*Model Definition With Jquery End*/
  return {
    /*Return All Previous Function In Order To Be Available Outside Of IIFE */
    add: add,
    catchAll: catchAll,
    addListItem: addListItem,
    loadList: loadList
    //loadDetails: loadDetails,
    //showModal: showModal,
    //hideModal: hideModal
  };
})();

breweryRepository.loadList().then(function() {
  'use strict';
  breweryRepository.catchAll().forEach(function(brewery) {
    breweryRepository.addListItem(brewery);
  });
});
