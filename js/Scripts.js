var breweryRepository = (function () { /*Pokedex Object Array Placed Inside IIFE*/
 "use strict";
var repository = [ ];

 var apiUrl = 'https://api.openbrewerydb.org/breweries';
 function addListItem(brewery){
        var brewlist = $('.list-group');  /* JQuery List Item & Button Tags Together with CSS-Class Styles Created */
        var listitem = $('<li class="list-group-item"></li>');
        $(brewlist).append(listitem);
        var $btn = $('<button type="button" class="btn btn-outline-light" data-toggle="modal" data-target ="#BreweryModal"></button>');
        $(btn).text(brewery.name);
       $(listitem).append(btn);
        $btn.on('click', function() { /*JQuery Click Button Event Listener Used To Display showDetails Function Properties */
        showDetails(brewery);
    });
  }

 function showDetails(item) {
    breweryRepository.loadList(item).then(function () {
    showModal(item);
    });
  }
function add(name) { /*Add Additional Brewery Attributes To Object Array*/
      repository.push(name);

  }

  function catchAll() { /* Function Used To Return Brewery Object Array*/
      return repository;
  }

  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function (response) { /* Replaced Fectch With Ajax*/
    $.each(response, function(index, item){
        var brewery = {
          name: item.name,
          state: item.state,
          city: item.city,
          website_url: item.website_url
       };
        add(brewery);
      });
    }).catch(function (error) { /*Load Functions Set In Order To Retrieve Data From Pokemon API*/
      console.error(error);
    });
  }
  /*function loadDetails(item) {
    //var url = item.detailsUrl;
    return $.ajax(apiUrl).then(function (details) { /* Replaced Fectch With Ajax*/
        //item.imageUrl = details.sprites.front_default;
      /*  item.city = details.city;
        item.state = details.state;
      item.types = Object.keys(details.types);
    }).catch(function (error) {
          console.error(error);
    });
  }*/

/*Model Definition With Jquery Start*/
/*function showModal(item){

    var modalContainer = $('#modal-container');
      $(modalContainer).text('');
      $(modalContainer).addClass('is-visible');

    var brewmodal = $('<div>');
      $(brewmodal).addClass('modal');
      $(modalContainer).append(brewmodal);

    var $closeModalBtn = $('<button class="modal-close">Close</button>');
      $(brewmodal).append($closeModalBtn);
      $closeModalBtn.click(hideModal);


    var modalTitle = $('<h1>');
      $(modalTitle).text(item.name);
      $(modalTitle).addClass('modal-title');
      $(brewmodal).append(modalTitle);

    /*var modalImg = $('<img>');
      $(modalImg).addClass('brew-img');
      $(modalImg).attr('src',item.imageUrl);
      $(pokemodal).append(modalImg);*/

    /*var brewCity = $('<p>');
      $(brewCity).text('City: ' + item.city);
      $(brewCity).addClass('modal-para');
      $(brewmodal).append(brewCity);

    var brewState = $('<p>');
      $(brewState).text('State: ' + item.state);
      $(brewState).addClass('modal-para');
      $(brewmodal).append(brewState);

    var brewSite = $('<a href = website_url>');
    $(brewSite).text(item.website_url);
    $(brewSite).addClass('modal-para');
    $(brewmodal).append(brewSite);
  }*/

  function showModal(item){
      $("#breweryName").text(item.name);
      $("#brewCity").text('City: ' + item.city);
      $("#brewState").text('State: ' + item.state);
      $("#brewSite").attr(item.website_url);
    }


/*function hideModal() {
    var modalContainer = $('#modal-container');
    $(modalContainer).removeClass('is-visible');
  }

$(window).keydown(function(event) {
    var modalContainer =$('#modal-container');
    if (
      event.key === 'Escape' &&
      $(modalContainer).containsClass('is-visible')
    ) {
      hideModal();
    }
  });

  var modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', function(event) {
    var target = event.target;
    if (target === modalContainer) {
      hideModal();
    }
  });*/
/*Model Definition With Jquery End*/
return {  /*Return All Previous Function In Order To Be Available Outside Of IIFE */
      add: add,
      catchAll: catchAll,
      addListItem: addListItem,
      loadList: loadList,
      //loadDetails: loadDetails,
      showModal: showModal,
      //hideModal: hideModal
  };
})();

breweryRepository.loadList().then(function() {
  "use strict";
  breweryRepository.catchAll().forEach(function(brewery){
    breweryRepository.addListItem(brewery);
  });
});
