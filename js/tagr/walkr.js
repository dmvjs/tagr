define(["tagr/tagr", "tagr/config"], function(tagr, config) {
    var body = document.body,
      allow = config.allowJsonFunctions || false;
    return function walkr(first, second) {
      var element = typeof first !== 'number' ? first : second
        , el = element["__element__"]
        , exclude = ["__contains__", "__element__", "__parent__"]
        , parent = element["__parent__"] || body
        , options = {}
        , key
        , fragment
        ;

      for (key in element) {
        if (element.hasOwnProperty(key)) {
          if (exclude.indexOf(key) === -1) {
            if (element[key]["__function__"]) {
              if (allow) {
                var f = element[key]["__function__"];
                options[key] = (f.substr(0, 8) === "function") ? (new Function("return " + f)()) :
                  (new Function("return " + f));
              }
            } else {
              options[key] = element[key]
            }
          }
        }
      }

      fragment = tagr(el, options);

      if (element["__contains__"] !== undefined) {
        if (Array.isArray(element["__contains__"])) {
          var elements = element["__contains__"];
          Array.prototype.forEach.call(elements, function(ele, ind){
            ele["__parent__"] = fragment;
            walkr(ind, ele)
          })
        } else {
          element["__contains__"]["__parent__"] = fragment;
          walkr(0, element["__contains__"]);
        }
      }

      parent.appendChild(fragment);
    }
  }
);