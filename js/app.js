requirejs.config({
  baseUrl: "js/lib",
  paths: {
    tagr: "../tagr"
  }
});

requirejs(["tagr/tagr", "tagr/walkr"],
  function (tagr, walkr) {
    var request = new XMLHttpRequest;
    request.open('GET', 'js/mock.json', true);
    request.send();

    request.onload = function onDataLoaded() {
      var data = JSON.parse(this.response);
      if (Array.isArray(data)) {
        Array.prototype.forEach.call(data, walkr)
      } else {
        walkr(0, data);
      }
    };
  }
);