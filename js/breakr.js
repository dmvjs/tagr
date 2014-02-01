var walkr = require("./walkr")
  , request = new XMLHttpRequest
  ;

request.open("GET", "../json/mock.json", true);
request.send();
request.onload = function() {
  breakr(this.response);
};

function breakr(response) {
  var data = JSON.parse(response);
  if (Array.isArray(data)) {
    Array.prototype.forEach.call(data, walkr)
  } else {
    walkr(0, data);
  }
}

module.exports = breakr;

