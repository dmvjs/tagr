requirejs.config({
  baseUrl: "js/lib",
  paths: {
    tagr: "../tagr"
  }
});

requirejs(["jquery", "tagr/tagr", "tagr/walkr"],
  function ($, tagr, walkr) {
    $.ajax({
      url: "js/mock.json",
      dataType: "json",
      success: onDataLoaded
    });

    function onDataLoaded(data) {
      if ($.isArray(data)) {
        $(data).each(walkr);
      } else {
        walkr(0, data);
      }
    }
  }
);