define(["jquery", "tagr/tagr", "tagr/config"], function($, tagr, config) {
    var $body = $(document.body),
      allow = config.allowJsonFunctions || false;
    return function walkr(index, element) {
      var el = element["__element__"],
        exclude = ["__contains__", "__element__", "__parent__"],
        parent = element["__parent__"] || $body,
        options = {},
        key,
        fragment;

      for (key in element) {
        if (element.hasOwnProperty(key)) {
          if ($.inArray(key, exclude) === -1) {
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

      if (element["__contains__"] !== undefined && element["__contains__"].length) {
        $(element["__contains__"]).each(function (ind, ele) {
          ele["__parent__"] = fragment;
        }).each(walkr);
      }

      parent.append(fragment);
    }
  }
);