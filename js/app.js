requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    tagr: '../tagr'
  }
});

requirejs(['jquery', 'tagr/tagr', 'tagr/parsr'],
  function ($, tagr, parsr) {
    $.ajax({
      url: 'js/mock.json',
      dataType: 'json',
      success: onDataLoaded
    });

    function onDataLoaded(data) {
      $(data).each(parsr);
    }
  }
);